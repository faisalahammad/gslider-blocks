<?php
/**
 * REST API controller for the GSlider Blocks admin dashboard.
 *
 * Provides real-time metrics, system environment information,
 * and block status to authorized administrators.
 *
 * @package GSlider\Admin
 * @since   1.2.0
 */

namespace GSlider\Admin;

use WP_REST_Controller;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;
use WP_Error;
use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( DashboardController::class, false ) ) {

	/**
	 * Controller for the /wp-json/gslider/v1/dashboard endpoint.
	 *
	 * Extends WP_REST_Controller to provide secure, cached system metrics
	 * and block status for the React Single Page Application dashboard.
	 *
	 * @since 1.2.0
	 */
	class DashboardController extends WP_REST_Controller implements Registrable {

		use SingletonTrait;

		/**
		 * Transient key for caching published sliders count.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		public const CACHE_KEY_SLIDER_COUNT = 'gslider_slider_count_cache';

		/**
		 * REST API namespace for GSlider.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		protected $namespace = 'gslider/v1';

		/**
		 * REST API base resource path.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		protected $rest_base = 'dashboard';

		/**
		 * Whether the per-request fallback toggle lock is currently held.
		 *
		 * Used only when no database is reachable for GET_LOCK.
		 *
		 * @since 1.2.3
		 *
		 * @var bool
		 */
		private $toggle_lock_fallback_held = false;

		/**
		 * Registers WordPress hooks for REST API routes and cache invalidation.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register(): void {
			add_action( 'rest_api_init', [ $this, 'register_routes' ] );
			add_action( 'save_post', [ $this, 'flush_slider_count_cache' ] );
			add_action( 'deleted_post', [ $this, 'flush_slider_count_cache' ] );
		}

		/**
		 * Registers REST API routes for the admin dashboard.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register_routes() {
			register_rest_route(
				$this->namespace,
				'/' . $this->rest_base,
				[
					[
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => [ $this, 'get_item' ],
						'permission_callback' => [ $this, 'get_item_permissions_check' ],
						'schema'              => [ $this, 'get_item_schema' ],
					],
				]
			);

			register_rest_route(
				$this->namespace,
				'/' . $this->rest_base . '/toggle-block',
				[
					[
						'methods'             => WP_REST_Server::CREATABLE,
						'callback'            => [ $this, 'toggle_block' ],
						'permission_callback' => [ $this, 'get_item_permissions_check' ],
						'args'                => [
							'slug'    => [
								'description'       => __( 'Block slug or full name.', 'gslider-blocks' ),
								'type'              => 'string',
								'required'          => true,
								'sanitize_callback' => 'sanitize_text_field',
							],
							'enabled' => [
								'description' => __( 'Whether the block is enabled.', 'gslider-blocks' ),
								'type'        => 'boolean',
								'required'    => true,
							],
						],
					],
				]
			);
		}

		/**
		 * Checks whether the current user has permission to access dashboard data.
		 *
		 * Requires the 'manage_options' capability. Returns a WP_Error with
		 * the appropriate authorization status code if permission is denied.
		 *
		 * @since 1.2.0
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return true|WP_Error True if user has manage_options capability, WP_Error otherwise.
		 */
		public function get_item_permissions_check( $request ) {
			if ( ! current_user_can( 'manage_options' ) ) {
				$status_code = function_exists( 'rest_authorization_required_code' )
					? rest_authorization_required_code()
					: 401;

				return new WP_Error(
					'rest_forbidden',
					__( 'Sorry, you are not allowed to view the dashboard metrics.', 'gslider-blocks' ),
					[ 'status' => $status_code ]
				);
			}

			return true;
		}

		/**
		 * Retrieves dashboard data including system metrics and block status.
		 *
		 * @since 1.2.0
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return WP_REST_Response Response object containing dashboard metrics.
		 */
		public function get_item( $request ) {
			$version = defined( 'GSLIDER_VERSION' ) ? GSLIDER_VERSION : '1.1.9';

			$data = [
				'status'        => 'success',
				'version'       => $version,
				'sliders_count' => $this->get_sliders_count(),
				'blocks'        => $this->get_blocks_status(),
				'system'        => $this->get_system_metrics(),
			];

			return rest_ensure_response( $data );
		}

		/**
		 * Toggles the enabled status of a specific slider block.
		 *
		 * Updates the 'gslider_disabled_blocks' option by adding or removing
		 * the block's full name. Automatically ties 'flexi-content-item' to
		 * 'flexi-content' to prevent broken slider dependencies.
		 *
		 * @since 1.2.0
		 *
		 * @param WP_REST_Request $request Full data about the request.
		 * @return WP_REST_Response|WP_Error Response object with updated block status, or an error.
		 */
		public function toggle_block( $request ) {
			$raw_slug = (string) $request->get_param( 'slug' );
			$enabled  = (bool) $request->get_param( 'enabled' );

			$short_slug = str_replace( 'gslider-blocks/', '', $raw_slug );
			$full_slug  = 'gslider-blocks/' . $short_slug;

			// Reject unknown slugs before taking the lock so a bad request
			// can never hold the toggle serialization open, and so the
			// endpoint returns an explicit error instead of writing an
			// arbitrary slug into the option (issue #329 acceptance).
			// flexi-content-item is not listed as its own block, but the
			// endpoint accepted it before validation existed, so keep it valid.
			$known_slugs   = array_column( $this->get_blocks_status(), 'slug' );
			$known_slugs[] = 'flexi-content-item';
			if ( 'all' !== $raw_slug && ! in_array( $short_slug, $known_slugs, true ) ) {
				return new WP_Error(
					'gslider_toggle_invalid_slug',
					__( 'Unknown block slug.', 'gslider-blocks' ),
					[ 'status' => 400 ]
				);
			}

			$lock = $this->acquire_toggle_lock();
			if ( $lock instanceof WP_Error ) {
				return $lock;
			}

			try {
				// get_option() serves the request-local copy of the option that
				// was cached at bootstrap, so it would hide writes made by
				// concurrent requests while this request waited on the lock.
				// Drop the cached copies first — the alloptions/notoptions
				// invalidation core uses when option rows change — so the read
				// inside the lock reflects the stored value, and the write
				// builds on it instead of reverting a concurrent toggle.
				wp_cache_delete( 'alloptions', 'options' );
				wp_cache_delete( 'notoptions', 'options' );
				wp_cache_delete( 'gslider_disabled_blocks', 'options' );
				$disabled_blocks = get_option( 'gslider_disabled_blocks', [] );
				if ( ! is_array( $disabled_blocks ) ) {
					$disabled_blocks = [];
				}

				if ( 'all' === $raw_slug ) {
					if ( $enabled ) {
						$disabled_blocks = [];
					} else {
						$disabled_blocks = [
							'gslider-blocks/base',
							'gslider-blocks/flexi-content',
							'gslider-blocks/flexi-content-item',
							'gslider-blocks/image-slider',
							'gslider-blocks/logo-carousel',
							'gslider-blocks/post-carousel',
							'gslider-blocks/testimonial',
						];
					}
					update_option( 'gslider_disabled_blocks', $disabled_blocks );

					return rest_ensure_response( [
						'status'          => 'success',
						'slug'            => 'all',
						'enabled'         => $enabled,
						'blocks'          => $this->get_blocks_status(),
						'disabled_blocks' => $disabled_blocks,
					] );
				}

				if ( $enabled ) {
					$to_remove = [ $short_slug, $full_slug ];
					if ( 'flexi-content' === $short_slug ) {
						$to_remove[] = 'flexi-content-item';
						$to_remove[] = 'gslider-blocks/flexi-content-item';
					}
					$disabled_blocks = array_diff( $disabled_blocks, $to_remove );
				} else {
					if ( ! in_array( $full_slug, $disabled_blocks, true ) ) {
						$disabled_blocks[] = $full_slug;
					}
					if ( 'flexi-content' === $short_slug && ! in_array( 'gslider-blocks/flexi-content-item', $disabled_blocks, true ) ) {
						$disabled_blocks[] = 'gslider-blocks/flexi-content-item';
					}
				}

				$disabled_blocks = array_values( array_unique( $disabled_blocks ) );
				update_option( 'gslider_disabled_blocks', $disabled_blocks );

				return rest_ensure_response( [
					'status'          => 'success',
					'slug'            => $full_slug,
					'enabled'         => $enabled,
					'blocks'          => $this->get_blocks_status(),
					'disabled_blocks' => $disabled_blocks,
				] );
			} finally {
				$this->release_toggle_lock( $lock );
			}
		}

		/**
		 * Acquires a named database lock so concurrent block toggles serialize
		 * instead of racing on the read-modify-write of the option.
		 *
		 * Uses a MySQL advisory lock for the same isolation goal as the
		 * options-row lock in WP_Upgrader::create_lock(), but scoped to this
		 * toggle so a stuck upgrade lock can never block the dashboard.
		 *
		 * When no database is reachable, or when the storage driver reports
		 * that it does not support advisory locks (GET_LOCK returns NULL),
		 * this falls back to a per-request flag. That flag only serializes
		 * calls inside the current PHP process; it gives no cross-request
		 * protection, so concurrent requests on such hosts can still race.
		 *
		 * @since 1.2.3
		 *
		 * @return string|WP_Error Lock token on success, WP_Error when the lock is held elsewhere.
		 */
		private function acquire_toggle_lock() {
			global $wpdb;

			$has_wpdb = isset( $wpdb ) && is_object( $wpdb ) && method_exists( $wpdb, 'get_var' );

			if ( $has_wpdb ) {
				// Key the lock to the options table so multisite sites sharing
				// one database server never block each other's toggles. The
				// hash keeps the name inside MySQL's 64-character lock-name
				// limit for sites with long table prefixes; a longer name
				// would error GET_LOCK into a NULL and lose the advisory
				// locking entirely.
				$lock_name = $this->get_toggle_lock_name();
				$timeout   = 3;

				// get_var() is required: GET_LOCK() always returns one row, so
				// query() would report success even when the lock was not granted.
				// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Advisory lock; caching does not apply.
				$lock_result = $wpdb->get_var(
					$wpdb->prepare( 'SELECT GET_LOCK(%s, %d)', $lock_name, $timeout )
				);

				// NULL means the driver does not support advisory locks; degrade
				// to the per-request guard, which only serializes within this
				// request (no cross-request guarantee on such hosts).
				if ( '1' === (string) $lock_result ) {
					return 'db';
				}

				if ( null === $lock_result && ! $this->toggle_lock_fallback_held ) {
					$this->toggle_lock_fallback_held = true;
					return 'request';
				}
			} elseif ( ! $this->toggle_lock_fallback_held ) {
				$this->toggle_lock_fallback_held = true;
				return 'request';
			}

			return new WP_Error(
				'gslider_toggle_busy',
				__( 'Another block status update is in progress. Please try again in a moment.', 'gslider-blocks' ),
				[ 'status' => 409 ]
			);
		}

		/**
		 * Builds the advisory lock name shared by GET_LOCK and RELEASE_LOCK.
		 *
		 * @since 1.2.3
		 *
		 * @return string Fixed-length lock name keyed to the options table.
		 */
		private function get_toggle_lock_name(): string {
			global $wpdb;

			return 'gslider_toggle_' . md5( (string) $wpdb->options );
		}

		/**
		 * Releases a lock acquired by acquire_toggle_lock().
		 *
		 * @since 1.2.3
		 *
		 * @param string $token Lock token returned by acquire_toggle_lock().
		 * @return void
		 */
		private function release_toggle_lock( string $token ): void {
			global $wpdb;

			if ( 'db' !== $token ) {
				if ( 'request' === $token ) {
					$this->toggle_lock_fallback_held = false;
				}
				return;
			}

			if ( isset( $wpdb ) && is_object( $wpdb ) && method_exists( $wpdb, 'query' ) ) {
				// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Advisory lock release; caching does not apply.
				$wpdb->query( $wpdb->prepare( 'SELECT RELEASE_LOCK(%s)', $this->get_toggle_lock_name() ) );
			}
		}


		/**
		 * Counts total published sliders across posts and pages with transient caching.
		 *
		 * Queries published posts and pages containing GSlider block markup and
		 * counts each individual slider block instance (image-slider, testimonial,
		 * logo-carousel, flexi-content, post-carousel, base) while excluding child slide items.
		 *
		 * To avoid expensive table scans on high-traffic sites, the count is
		 * cached in a transient and flushed automatically on save_post and deleted_post.
		 *
		 * @since 1.2.0
		 *
		 * @return int Total number of published slider blocks.
		 */
		public function get_sliders_count(): int {
			$cached = get_transient( self::CACHE_KEY_SLIDER_COUNT );
			if ( false !== $cached && is_numeric( $cached ) ) {
				return (int) $cached;
			}

			global $wpdb;
			if ( ! isset( $wpdb ) || ! is_object( $wpdb ) ) {
				return 0;
			}

			$like = '%' . $wpdb->esc_like( 'wp:gslider-blocks/' ) . '%';

			// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Raw query needed for block comment search; cached via transient.
			$posts_content = $wpdb->get_col(
				$wpdb->prepare(
					"SELECT post_content FROM {$wpdb->posts}
					WHERE post_status = 'publish'
					AND post_type IN ('post', 'page')
					AND post_content LIKE %s",
					$like
				)
			);
			// phpcs:enable WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching

			$count = 0;
			if ( is_array( $posts_content ) && ! empty( $posts_content ) ) {
				foreach ( $posts_content as $content ) {
					if ( ! is_string( $content ) || '' === $content ) {
						continue;
					}

					// Count every top-level GSlider slider block instance (excluding child items).
					$matches = null;
					$matched = preg_match_all(
						'/<!--\s+wp:gslider-blocks\/(image-slider|testimonial|logo-carousel|flexi-content|post-carousel|base)(?![-\w])/i',
						$content,
						$matches
					);

					if ( false !== $matched ) {
						$count += (int) $matched;
					}
				}
			}

			$expiration = defined( 'HOUR_IN_SECONDS' ) ? 12 * HOUR_IN_SECONDS : 43200;
			set_transient( self::CACHE_KEY_SLIDER_COUNT, $count, $expiration );

			return $count;
		}

		/**
		 * Flushes the cached slider count transient.
		 *
		 * Hooked to 'save_post' and 'deleted_post' actions.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function flush_slider_count_cache(): void {
			delete_transient( self::CACHE_KEY_SLIDER_COUNT );
		}

		/**
		 * Checks whether a specific block slug is currently enabled.
		 *
		 * Supports both short slug ('image-slider') and full block name
		 * ('gslider-blocks/image-slider') in the disabled blocks array.
		 *
		 * @since 1.2.0
		 *
		 * @param string        $slug            The block slug without prefix.
		 * @param array<string> $disabled_blocks The list of disabled blocks.
		 * @return bool True if block is enabled, false if disabled.
		 */
		public function is_block_enabled( string $slug, array $disabled_blocks ): bool {
			return ! in_array( $slug, $disabled_blocks, true )
				&& ! in_array( 'gslider-blocks/' . $slug, $disabled_blocks, true );
		}

		/**
		 * Retrieves the list of available blocks with their active status.
		 *
		 * @since 1.2.0
		 *
		 * @return array<int, array{slug: string, name: string, enabled: bool}>
		 */
		public function get_blocks_status(): array {
			$disabled_blocks = get_option( 'gslider_disabled_blocks', [] );
			if ( ! is_array( $disabled_blocks ) ) {
				$disabled_blocks = [];
			}

			$all_blocks = [
				[
					'slug'    => 'base',
					'name'    => __( 'Base', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'base', $disabled_blocks ),
				],
				[
					'slug'    => 'flexi-content',
					'name'    => __( 'Flexi Content', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'flexi-content', $disabled_blocks ),
				],
				[
					'slug'    => 'image-slider',
					'name'    => __( 'Image Slider', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'image-slider', $disabled_blocks ),
				],
				[
					'slug'    => 'logo-carousel',
					'name'    => __( 'Logo Carousel', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'logo-carousel', $disabled_blocks ),
				],
				[
					'slug'    => 'post-carousel',
					'name'    => __( 'Post Carousel', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'post-carousel', $disabled_blocks ),
				],
				[
					'slug'    => 'testimonial',
					'name'    => __( 'Testimonial', 'gslider-blocks' ),
					'enabled' => $this->is_block_enabled( 'testimonial', $disabled_blocks ),
				],
			];

			/**
			 * Filters the list of dashboard blocks and their enabled status.
			 *
			 * @since 1.2.0
			 *
			 * @param array $all_blocks List of block status objects.
			 */
			return apply_filters( 'gslider_dashboard_blocks_status', $all_blocks );
		}

		/**
		 * Retrieves server and WordPress environment metrics.
		 *
		 * @since 1.2.0
		 *
		 * @return array{php_version: string, wp_version: string, memory_limit: string}
		 */
		public function get_system_metrics(): array {
			global $wp_version;

			$memory_limit = ini_get( 'memory_limit' );
			if ( ! $memory_limit ) {
				$memory_limit = defined( 'WP_MEMORY_LIMIT' ) ? WP_MEMORY_LIMIT : '256M';
			}

			$current_wp_version = function_exists( 'get_bloginfo' )
				? (string) get_bloginfo( 'version' )
				: ( isset( $wp_version ) ? (string) $wp_version : '6.7.1' );

			return [
				'php_version'  => PHP_VERSION,
				'wp_version'   => $current_wp_version,
				'memory_limit' => (string) $memory_limit,
			];
		}

		/**
		 * Retrieves the item schema for the dashboard endpoint.
		 *
		 * @since 1.2.0
		 *
		 * @return array Item schema definition.
		 */
		public function get_item_schema(): array {
			if ( $this->schema ) {
				return $this->add_additional_fields_schema( $this->schema );
			}

			$this->schema = [
				'$schema'    => 'http://json-schema.org/draft-04/schema#',
				'title'      => 'gslider_dashboard',
				'type'       => 'object',
				'properties' => [
					'status'        => [
						'description' => __( 'Response status.', 'gslider-blocks' ),
						'type'        => 'string',
						'enum'        => [ 'success', 'error' ],
						'readonly'    => true,
					],
					'version'       => [
						'description' => __( 'Plugin version.', 'gslider-blocks' ),
						'type'        => 'string',
						'readonly'    => true,
					],
					'sliders_count' => [
						'description' => __( 'Total number of published sliders across posts and pages.', 'gslider-blocks' ),
						'type'        => 'integer',
						'readonly'    => true,
					],
					'blocks'        => [
						'description' => __( 'List of available blocks with active status.', 'gslider-blocks' ),
						'type'        => 'array',
						'items'       => [
							'type'       => 'object',
							'properties' => [
								'slug'    => [
									'type'     => 'string',
									'readonly' => true,
								],
								'name'    => [
									'type'     => 'string',
									'readonly' => true,
								],
								'enabled' => [
									'type'     => 'boolean',
									'readonly' => true,
								],
							],
						],
						'readonly'    => true,
					],
					'system'        => [
						'description' => __( 'Server and WordPress environment metrics.', 'gslider-blocks' ),
						'type'        => 'object',
						'properties'  => [
							'php_version'  => [
								'type'     => 'string',
								'readonly' => true,
							],
							'wp_version'   => [
								'type'     => 'string',
								'readonly' => true,
							],
							'memory_limit' => [
								'type'     => 'string',
								'readonly' => true,
							],
						],
						'readonly'    => true,
					],
				],
			];

			return $this->add_additional_fields_schema( $this->schema );
		}

	}

}
