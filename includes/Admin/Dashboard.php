<?php
/**
 * Admin Dashboard management for GSlider Blocks.
 *
 * Registers the top-level WordPress admin menu page and
 * the root container for the React SPA dashboard.
 *
 * @package GSlider\Admin
 * @since   1.2.0
 */

namespace GSlider\Admin;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Dashboard::class, false ) ) {

	/**
	 * Manages the GSlider Blocks admin dashboard menu page.
	 *
	 * Registers a top-level admin menu page and outputs the
	 * root HTML mounting container for the React dashboard.
	 *
	 * @since 1.2.0
	 */
	class Dashboard implements Registrable {

		use SingletonTrait;

		/**
		 * The menu slug for the admin dashboard.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		public const MENU_SLUG = 'gslider-blocks';

		/**
		 * Capability required to access the admin dashboard.
		 *
		 * @since 1.2.0
		 *
		 * @var string
		 */
		public const CAPABILITY = 'manage_options';

		/**
		 * Position in the WordPress admin menu.
		 *
		 * Positioned directly below Appearance.
		 *
		 * @since 1.2.0
		 *
		 * @var int
		 */
		public const MENU_POSITION = 61;

		/**
		 * Registers WordPress hooks for the admin dashboard.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register(): void {
			add_action( 'admin_menu', [ $this, 'register_admin_menu' ] );
			add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_dashboard_assets' ] );
			add_filter( 'allowed_block_types_all', [ $this, 'filter_allowed_block_types' ], 10, 2 );
			add_filter( 'register_block_type_args', [ $this, 'hide_disabled_from_inserter' ], 10, 2 );
		}

		/**
		 * Enqueues scripts and styles for the admin dashboard.
		 *
		 * Isolates loading strictly to the GSlider Blocks admin dashboard page
		 * and localizes runtime data for the React Single Page Application.
		 *
		 * @since 1.2.0
		 *
		 * @param string $hook_suffix The current admin screen hook suffix.
		 * @return void
		 */
		public function enqueue_dashboard_assets( string $hook_suffix ): void {
			if ( 'toplevel_page_' . self::MENU_SLUG !== $hook_suffix ) {
				return;
			}

			if ( ! current_user_can( self::CAPABILITY ) ) {
				return;
			}

			$plugin_url = defined( 'GSLIDER_PLUGIN_URL' ) ? GSLIDER_PLUGIN_URL : plugins_url( '/', dirname( __DIR__, 2 ) . '/gslider-blocks.php' );
			$plugin_dir = defined( 'GSLIDER_DIR_PATH' ) ? GSLIDER_DIR_PATH : dirname( __DIR__, 2 ) . '/';
			$version    = defined( 'GSLIDER_VERSION' ) ? GSLIDER_VERSION : '1.2.0';

			$asset_file = $plugin_dir . 'assets/admin/js/dashboard.asset.php';
			$asset      = file_exists( $asset_file )
				? require $asset_file
				: [
					'dependencies' => [ 'wp-element', 'wp-components', 'wp-i18n', 'wp-api-fetch' ],
					'version'      => $version,
				];

			// Enqueue WordPress core component styles.
			wp_enqueue_style( 'wp-components' );

			// Enqueue dashboard compiled stylesheet.
			wp_enqueue_style(
				'gslider-dashboard-style',
				$plugin_url . 'assets/admin/css/dashboard.css',
				[ 'wp-components' ],
				$version
			);

			// Enqueue dashboard React SPA bundle.
			wp_enqueue_script(
				'gslider-dashboard-script',
				$plugin_url . 'assets/admin/js/dashboard.js',
				$asset['dependencies'] ?? [ 'wp-element', 'wp-components', 'wp-i18n', 'wp-api-fetch' ],
				$asset['version'] ?? $version,
				true
			);

			// Register script translations for the dashboard bundle.
			wp_set_script_translations( 'gslider-dashboard-script', 'gslider-blocks', $plugin_dir . 'languages' );

			// Localize runtime configuration data.
			$localized_data = [
				'siteUrl'   => site_url(),
				'adminUrl'  => admin_url(),
				'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
				'restUrl'   => rest_url( 'gslider/v1/' ),
				'nonce'     => wp_create_nonce( 'wp_rest' ),
				'version'   => $version,
				'pluginUrl' => $plugin_url,
				'assetsUrl' => $plugin_url . 'assets/',
			];

			wp_localize_script( 'gslider-dashboard-script', 'GSliderDashboardData', $localized_data );
		}

		/**
		 * Registers the top-level admin menu page.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function register_admin_menu(): void {
			add_menu_page(
				esc_html__( 'GSlider Blocks - Modern Slider & Carousel Studio', 'gslider-blocks' ),
				esc_html__( 'GSlider Blocks', 'gslider-blocks' ),
				self::CAPABILITY,
				self::MENU_SLUG,
				[ $this, 'render_dashboard_page' ],
				$this->get_menu_icon(),
				self::MENU_POSITION
			);
		}

		/**
		 * Returns the base64-encoded SVG icon for the admin menu.
		 *
		 * @since 1.2.0
		 *
		 * @return string Data URI of the SVG icon.
		 */
		public function get_menu_icon(): string {
			$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">'
				. '<rect x="4.5" y="3.5" width="11" height="11" rx="1.5" fill="#a7aaad" fill-opacity="0.25" stroke="#a7aaad" stroke-width="1.5"/>'
				. '<path d="M1.5 5.5V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H3" stroke="#a7aaad" stroke-width="1.5" stroke-linecap="round"/>'
				. '<path d="M18.5 5.5V12.5C18.5 13.0523 18.0523 13.5 17.5 13.5H17" stroke="#a7aaad" stroke-width="1.5" stroke-linecap="round"/>'
				. '<circle cx="7" cy="17" r="0.8" fill="#a7aaad"/>'
				. '<circle cx="10" cy="17" r="1" fill="#a7aaad"/>'
				. '<circle cx="13" cy="17" r="0.8" fill="#a7aaad"/>'
				. '</svg>';

			return 'data:image/svg+xml;base64,' . base64_encode( $svg );
		}

		/**
		 * Filters the allowed block types in the Gutenberg block editor.
		 *
		 * Hides disabled GSlider blocks from explicit allow lists. When
		 * everything is allowed (true), the value is returned unchanged so
		 * JS-only third-party blocks stay available. Disabled GSlider blocks
		 * are hidden from the inserter via register_block_type_args instead,
		 * which never unregisters them and keeps existing content valid.
		 *
		 * @since 1.2.0
		 *
		 * @param bool|string[] $allowed_block_types Array of block type slugs, or boolean to enable/disable all.
		 * @param mixed         $block_editor_context The current block editor context.
		 * @return bool|string[] Filtered list of allowed block types.
		 */
		public function filter_allowed_block_types( $allowed_block_types, $block_editor_context = null ) {
			$disabled_names = $this->get_disabled_block_names();
			if ( empty( $disabled_names ) ) {
				return $allowed_block_types;
			}

			// When all blocks are allowed (default WordPress behavior: $allowed_block_types === true).
			if ( true === $allowed_block_types ) {
				return $allowed_block_types;
			}

			// When $allowed_block_types is an explicit array of allowed block names.
			if ( is_array( $allowed_block_types ) ) {
				return array_values( array_diff( $allowed_block_types, $disabled_names ) );
			}

			return $allowed_block_types;
		}

		/**
		 * Hides disabled GSlider blocks from the inserter at registration time.
		 *
		 * Setting the inserter support to false keeps the block type registered,
		 * so existing published content renders without block invalidation
		 * errors while the block no longer appears in the inserter. GSlider's
		 * client-side registrations pass no supports key, so server-side
		 * supports (including inserter) reach the editor.
		 *
		 * @since 1.2.2
		 *
		 * @param array  $args       Array of arguments for registering a block type.
		 * @param string $block_type Block type name including namespace.
		 * @return array Filtered registration arguments.
		 */
		public function hide_disabled_from_inserter( array $args, string $block_type ): array {
			$disabled_names = $this->get_disabled_block_names();
			if ( empty( $disabled_names ) ) {
				return $args;
			}

			if ( ! in_array( $block_type, $disabled_names, true ) ) {
				return $args;
			}

			if ( ! isset( $args['supports'] ) || ! is_array( $args['supports'] ) ) {
				$args['supports'] = [];
			}

			$args['supports']['inserter'] = false;

			return $args;
		}

		/**
		 * Normalizes the disabled blocks option into full block names.
		 *
		 * @since 1.2.2
		 *
		 * @return string[] Full gslider-blocks/ names of disabled blocks.
		 */
		private function get_disabled_block_names(): array {
			$disabled_blocks = get_option( 'gslider_disabled_blocks', [] );
			if ( empty( $disabled_blocks ) || ! is_array( $disabled_blocks ) ) {
				return [];
			}

			$disabled_names = [];
			foreach ( $disabled_blocks as $block ) {
				if ( ! is_string( $block ) || '' === $block ) {
					continue;
				}
				$name = ( 0 === strpos( $block, 'gslider-blocks/' ) ) ? $block : 'gslider-blocks/' . $block;
				$disabled_names[] = $name;
				// If flexi-content is disabled, also disable child item.
				if ( 'gslider-blocks/flexi-content' === $name ) {
					$disabled_names[] = 'gslider-blocks/flexi-content-item';
				}
			}

			return array_values( array_unique( $disabled_names ) );
		}

		/**
		 * Renders the admin dashboard mounting container.
		 *
		 * Checks user permissions and outputs the root DOM container
		 * where the React SPA admin dashboard mounts.
		 *
		 * @since 1.2.0
		 *
		 * @return void
		 */
		public function render_dashboard_page(): void {
			if ( ! current_user_can( self::CAPABILITY ) ) {
				return;
			}

			echo '<div class="wrap gslider-admin-wrap">'
				. '<div id="gslider-admin-dashboard" class="gslider-admin-dashboard-root">'
				. '<!-- React SPA mounts here -->'
				. '</div>'
				. '</div>';
		}
	}
}
