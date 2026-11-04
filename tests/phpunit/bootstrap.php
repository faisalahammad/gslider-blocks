<?php
/**
 * PHPUnit test suite bootstrap for GSlider Blocks.
 *
 * Configures test environment constants, loads Composer PSR-4 autoloader,
 * and provides safe WordPress runtime stubs for standalone CLI and PHPUnit execution.
 *
 * @package GSlider\Tests
 */

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __DIR__, 2 ) . '/' );
}

if ( ! defined( 'GSLIDER_PLUGIN_URL' ) ) {
	define( 'GSLIDER_PLUGIN_URL', 'http://example.org/wp-content/plugins/gslider-blocks/' );
}

if ( ! defined( 'GSLIDER_DIR_PATH' ) ) {
	define( 'GSLIDER_DIR_PATH', dirname( __DIR__, 2 ) . '/' );
}

if ( ! defined( 'GSLIDER_VERSION' ) ) {
	define( 'GSLIDER_VERSION', '1.2.0' );
}

if ( ! defined( 'HOUR_IN_SECONDS' ) ) {
	define( 'HOUR_IN_SECONDS', 3600 );
}

// Global state registries.
global $wp_actions, $wp_filters, $wp_menu_pages, $current_caps, $enqueued_styles, $enqueued_scripts, $localized_scripts, $script_translations, $wp_block_patterns, $wp_pattern_categories, $wp_rest_routes, $wp_transients, $wp_options, $wpdb, $wp_styles, $wp_post_content, $wp_current_action, $wp_mock_posts, $password_clear, $can_read, $registered_rest_fields;
$wp_actions            = [];
$wp_filters            = [];
$wp_menu_pages         = [];
$current_caps          = [];
$enqueued_styles       = [];
$enqueued_scripts      = [];
$localized_scripts     = [];
$script_translations   = [];
$wp_block_patterns     = [];
$wp_pattern_categories = [];
$wp_rest_routes        = [];
$wp_transients         = [];
$wp_options            = [];
$wp_styles             = [];
$wp_post_content       = '';
$wp_current_action     = '';
$wp_mock_posts         = [];
$password_clear        = [];
$can_read              = [];
$registered_rest_fields = [];

if ( ! function_exists( 'add_action' ) ) {
	function add_action( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
		global $wp_actions;
		$wp_actions[ $hook ][] = [
			'callback'      => $callback,
			'priority'      => $priority,
			'accepted_args' => $accepted_args,
		];
	}
}

if ( ! function_exists( 'add_filter' ) ) {
	function add_filter( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
		global $wp_filters;
		$wp_filters[ $hook ][] = [
			'callback'      => $callback,
			'priority'      => $priority,
			'accepted_args' => $accepted_args,
		];
	}
}

if ( ! function_exists( 'apply_filters' ) ) {
	function apply_filters( $tag, $value, ...$args ) {
		global $wp_filters;
		if ( ! empty( $wp_filters[ $tag ] ) ) {
			foreach ( $wp_filters[ $tag ] as $filter ) {
				$value = call_user_func( $filter['callback'], $value, ...$args );
			}
		}
		return $value;
	}
}

if ( ! function_exists( 'remove_all_filters' ) ) {
	function remove_all_filters( $tag ) {
		global $wp_filters;
		unset( $wp_filters[ $tag ] );
		return true;
	}
}

if ( ! function_exists( 'remove_filter' ) ) {
	function remove_filter( $hook, $callback, $priority = 10 ) {
		global $wp_filters;
		if ( ! empty( $wp_filters[ $hook ] ) ) {
			foreach ( $wp_filters[ $hook ] as $index => $filter ) {
				if ( $filter['callback'] === $callback && $filter['priority'] === $priority ) {
					unset( $wp_filters[ $hook ][ $index ] );
				}
			}
		}
		return true;
	}
}


if ( ! function_exists( 'do_action' ) ) {
	function do_action( $tag, ...$args ) {
		// Mock do_action.
	}
}

if ( ! function_exists( 'wp_parse_url' ) ) {
	function wp_parse_url( $url, $component = -1 ) {
		return parse_url( $url, $component );
	}
}

if ( ! function_exists( 'trailingslashit' ) ) {
	function trailingslashit( $string ) {
		return rtrim( $string, '/\\' ) . '/';
	}
}

if ( ! function_exists( '__return_true' ) ) {
	function __return_true() {
		return true;
	}
}

if ( ! function_exists( '__return_false' ) ) {
	function __return_false() {
		return false;
	}
}

if ( ! function_exists( 'esc_html' ) ) {
	function esc_html( $text ) {
		return $text;
	}
}

if ( ! function_exists( 'esc_html__' ) ) {
	function esc_html__( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( '__' ) ) {
	function __( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( '_e' ) ) {
	function _e( $text, $domain = 'default' ) {
		echo esc_html( $text );
	}
}

if ( ! function_exists( 'esc_attr__' ) ) {
	function esc_attr__( $text, $domain = 'default' ) {
		return $text;
	}
}

if ( ! function_exists( 'esc_url' ) ) {
	function esc_url( $url ) {
		return $url;
	}
}

if ( ! function_exists( 'esc_url_raw' ) ) {
	function esc_url_raw( $url ) {
		return $url;
	}
}

if ( ! function_exists( 'set_url_scheme' ) ) {
	function set_url_scheme( $url, $scheme = null ) {
		return $url;
	}
}

if ( ! function_exists( 'is_admin' ) ) {
	function is_admin() {
		global $is_admin_mock;
		return isset( $is_admin_mock ) ? (bool) $is_admin_mock : true;
	}
}

if ( ! function_exists( 'is_feed' ) ) {
	function is_feed() {
		global $is_feed_mock;
		return isset( $is_feed_mock ) ? (bool) $is_feed_mock : false;
	}
}

if ( ! function_exists( 'site_url' ) ) {
	function site_url( $path = '' ) {
		return 'http://example.org' . ( $path ? '/' . ltrim( $path, '/' ) : '' );
	}
}

if ( ! function_exists( 'admin_url' ) ) {
	function admin_url( $path = '' ) {
		return 'http://example.org/wp-admin/' . ltrim( $path, '/' );
	}
}

if ( ! function_exists( 'rest_url' ) ) {
	function rest_url( $path = '' ) {
		return 'http://example.org/wp-json/' . ltrim( $path, '/' );
	}
}

if ( ! function_exists( 'wp_create_nonce' ) ) {
	function wp_create_nonce( $action = -1 ) {
		return 'mock_nonce_' . $action;
	}
}

if ( ! function_exists( 'current_user_can' ) ) {
	function current_user_can( $capability, ...$args ) {
		global $current_caps, $can_read;
		if ( 'read_post' === $capability && ! empty( $args ) ) {
			$post_id = (int) $args[0];
			return ! empty( $can_read[ $post_id ] ) || ! empty( $current_caps['read_post'] );
		}
		return ! empty( $current_caps[ $capability ] );
	}
}

if ( ! function_exists( 'wp_enqueue_style' ) ) {
	function wp_enqueue_style( $handle, $src = '', $deps = [], $ver = false, $media = 'all' ) {
		global $enqueued_styles;
		$enqueued_styles[ $handle ] = [
			'src'   => $src,
			'deps'  => $deps,
			'ver'   => $ver,
			'media' => $media,
		];
	}
}

if ( ! function_exists( 'wp_enqueue_script' ) ) {
	function wp_enqueue_script( $handle, $src = '', $deps = [], $ver = false, $in_footer = false ) {
		global $enqueued_scripts;
		$enqueued_scripts[ $handle ] = [
			'src'       => $src,
			'deps'      => $deps,
			'ver'       => $ver,
			'in_footer' => $in_footer,
		];
		// Mirror core: enqueueing a script with a source registers it first.
		if ( '' !== $src ) {
			$scripts = wp_scripts();
			if ( ! isset( $scripts->registered[ $handle ] ) ) {
				$scripts->registered[ $handle ] = new _WP_Dependency( $handle, $src, $deps, $ver, $in_footer ? [ 'in_footer' => true ] : false );
			}
		}
	}
}

if ( ! function_exists( 'wp_localize_script' ) ) {
	function wp_localize_script( $handle, $object_name, $l10n ) {
		global $localized_scripts;
		$localized_scripts[ $handle ][ $object_name ] = $l10n;
		return true;
	}
}

if ( ! function_exists( 'wp_set_script_translations' ) ) {
	function wp_set_script_translations( $handle, $domain = 'default', $path = '' ) {
		global $script_translations;
		$scripts = wp_scripts();
		// Mirror core: WP_Scripts::set_translations() returns false for an unregistered handle.
		if ( ! isset( $scripts->registered[ $handle ] ) ) {
			return false;
		}
		$script_translations[ $handle ] = [
			'domain' => $domain,
			'path'   => $path,
		];
		$scripts->registered[ $handle ]->textdomain = $domain;
		return true;
	}
}

if ( ! function_exists( 'add_menu_page' ) ) {
	function add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $callback = '', $icon_url = '', $position = null ) {
		global $wp_menu_pages;
		$wp_menu_pages[] = [
			'page_title' => $page_title,
			'menu_title' => $menu_title,
			'capability' => $capability,
			'menu_slug'  => $menu_slug,
			'callback'   => $callback,
			'icon_url'   => $icon_url,
			'position'   => $position,
		];
		return 'toplevel_page_' . $menu_slug;
	}
}

if ( ! function_exists( 'register_block_pattern_category' ) ) {
	function register_block_pattern_category( $category_name, $category_properties ) {
		global $wp_pattern_categories;
		$wp_pattern_categories[ $category_name ] = $category_properties;
		return true;
	}
}

if ( ! function_exists( 'register_block_pattern' ) ) {
	function register_block_pattern( $pattern_name, $pattern_properties ) {
		global $wp_block_patterns;
		$wp_block_patterns[ $pattern_name ] = $pattern_properties;
		return true;
	}
}

if ( ! function_exists( 'wp_strip_all_tags' ) ) {
	function wp_strip_all_tags( $text, $remove_breaks = false ) {
		$text = preg_replace( '@<(script|style)[^>]*?>.*?</\\1>@si', '', (string) $text );
		$text = strip_tags( $text );
		if ( $remove_breaks ) {
			$text = preg_replace( '/[\r\n\t ]+/', ' ', $text );
		}
		return trim( $text );
	}
}

if ( ! function_exists( 'wp_kses_post' ) ) {
	function wp_kses_post( $text ) {
		return (string) $text;
	}
}

if ( ! function_exists( 'render_block' ) ) {
	function render_block( $block ) {
		if ( isset( $GLOBALS['gslider_render_block_impl'] ) && is_callable( $GLOBALS['gslider_render_block_impl'] ) ) {
			return call_user_func( $GLOBALS['gslider_render_block_impl'], $block );
		}
		return '<p>flexi</p>';
	}
}

if ( ! function_exists( 'wp_get_attachment_metadata' ) ) {
	function wp_get_attachment_metadata( $attachment_id ) {
		global $attachment_metadata_mock;
		return isset( $attachment_metadata_mock[ $attachment_id ] ) ? $attachment_metadata_mock[ $attachment_id ] : false;
	}
}

if ( ! function_exists( 'wp_get_attachment_image_src' ) ) {
	function wp_get_attachment_image_src( $attachment_id, $size = 'thumbnail' ) {
		global $attachment_image_src_mock;
		return isset( $attachment_image_src_mock[ $attachment_id ] ) ? $attachment_image_src_mock[ $attachment_id ] : false;
	}
}

if ( ! function_exists( 'wp_image_src_get_dimensions' ) ) {
	/**
	 * Minimal copy of core wp_image_src_get_dimensions() (WP 5.5+).
	 *
	 * @param string $image_src     Image source path or URL.
	 * @param array  $image_meta    Attachment metadata.
	 * @param int    $attachment_id Attachment ID.
	 * @return array|false
	 */
	function wp_image_src_get_dimensions( $image_src, $image_meta, $attachment_id = 0 ) {
		$image_filename = basename( (string) $image_src );
		if ( isset( $image_meta['file'] ) && basename( $image_meta['file'] ) === $image_filename ) {
			return array( (int) $image_meta['width'], (int) $image_meta['height'] );
		}
		if ( ! empty( $image_meta['sizes'] ) ) {
			foreach ( $image_meta['sizes'] as $image_size_data ) {
				if ( $image_filename === $image_size_data['file'] ) {
					return array( (int) $image_size_data['width'], (int) $image_size_data['height'] );
				}
			}
		}
		return false;
	}
}
if ( ! class_exists( 'WP_REST_Controller' ) ) {
	class WP_REST_Controller {
		protected $namespace;
		protected $rest_base;
		protected $schema;
		public function add_additional_fields_schema( $schema ) {
			return $schema;
		}
	}
}

if ( ! class_exists( 'WP_REST_Server' ) ) {
	class WP_REST_Server {
		const READABLE  = 'GET';
		const CREATABLE = 'POST';
	}
}

if ( ! class_exists( 'WP_REST_Request' ) ) {
	class WP_REST_Request {
		public $params = [];
		public function __construct( $method_or_params = [], $route = '', $attributes = [] ) {
			if ( is_array( $method_or_params ) ) {
				$this->params = $method_or_params;
			}
		}
		public function set_param( $key, $value ) {
			$this->params[ $key ] = $value;
		}
		public function get_param( $key ) {
			return $this->params[ $key ] ?? null;
		}
		public function has_param( $key ) {
			return array_key_exists( $key, $this->params );
		}
	}
}

if ( ! class_exists( 'WP_REST_Response' ) ) {
	class WP_REST_Response {
		public $data;
		public $status;
		public function __construct( $data = null, $status = 200 ) {
			$this->data   = $data;
			$this->status = $status;
		}
		public function get_data() {
			return $this->data;
		}
		public function get_status() {
			return $this->status;
		}
	}
}

if ( ! class_exists( 'WP_Error' ) ) {
	class WP_Error {
		public $code;
		public $message;
		public $data;
		public function __construct( $code = '', $message = '', $data = [] ) {
			$this->code    = $code;
			$this->message = $message;
			$this->data    = $data;
		}
		public function get_error_code() {
			return $this->code;
		}
		public function get_error_message() {
			return $this->message;
		}
		public function get_error_data() {
			return $this->data;
		}
	}
}

if ( ! class_exists( 'MockWPDB' ) ) {
	class MockWPDB {
		public $posts      = 'wp_posts';
		public $last_query = '';
		public $return_col = [];

		public function get_col( $query ) {
			$this->last_query = $query;
			return $this->return_col;
		}

		public function esc_like( $text ) {
			return addcslashes( $text, '_%\\' );
		}

		public function prepare( $query, ...$args ) {
			if ( isset( $args[0] ) && is_array( $args[0] ) && 1 === count( $args ) ) {
				$args = $args[0];
			}
			$query = str_replace( '%s', "'%s'", $query );
			return vsprintf( $query, $args );
		}

		public function get_var( $query ) {
			$this->last_query = $query;
			return count( $this->return_col );
		}
	}
}

if ( ! isset( $wpdb ) || ! ( $wpdb instanceof MockWPDB ) ) {
	$wpdb = new MockWPDB();
}

if ( ! function_exists( 'register_rest_route' ) ) {
	function register_rest_route( $namespace, $route, $args = [] ) {
		global $wp_rest_routes;
		$wp_rest_routes[ $namespace ][ $route ] = $args;
	}
}

if ( ! function_exists( 'rest_authorization_required_code' ) ) {
	function rest_authorization_required_code() {
		return 401;
	}
}

if ( ! function_exists( 'rest_ensure_response' ) ) {
	function rest_ensure_response( $response ) {
		if ( $response instanceof WP_REST_Response ) {
			return $response;
		}
		return new WP_REST_Response( $response );
	}
}

if ( ! function_exists( 'get_transient' ) ) {
	function get_transient( $transient ) {
		global $wp_transients;
		return isset( $wp_transients[ $transient ] ) ? $wp_transients[ $transient ] : false;
	}
}

if ( ! function_exists( 'set_transient' ) ) {
	function set_transient( $transient, $value, $expiration = 0 ) {
		global $wp_transients;
		$wp_transients[ $transient ] = $value;
		return true;
	}
}

if ( ! function_exists( 'delete_transient' ) ) {
	function delete_transient( $transient ) {
		global $wp_transients;
		unset( $wp_transients[ $transient ] );
		return true;
	}
}

if ( ! function_exists( 'get_option' ) ) {
	function get_option( $option, $default = false ) {
		global $wp_options;
		return isset( $wp_options[ $option ] ) ? $wp_options[ $option ] : $default;
	}
}

if ( ! function_exists( 'update_option' ) ) {
	function update_option( $option, $value, $autoload = null ) {
		global $wp_options;
		$wp_options[ $option ] = $value;
		return true;
	}
}

if ( ! function_exists( 'delete_option' ) ) {
	function delete_option( $option ) {
		global $wp_options;
		unset( $wp_options[ $option ] );
		return true;
	}
}

if ( ! function_exists( 'get_bloginfo' ) ) {
	function get_bloginfo( $show = '' ) {
		return '6.7.1';
	}
}

if ( ! function_exists( 'wp_upload_dir' ) ) {
	function wp_upload_dir() {
		return [
			'basedir' => '/tmp/wp-test-uploads',
			'baseurl' => 'https://example.com/wp-content/uploads',
		];
	}
}

if ( ! function_exists( 'wp_mkdir_p' ) ) {
	function wp_mkdir_p( $dir ) {
		return true;
	}
}

if ( ! function_exists( 'sanitize_text_field' ) ) {
	function sanitize_text_field( $str ) {
		return is_string( $str ) ? trim( wp_strip_all_tags( $str ) ) : '';
	}
}

if ( ! function_exists( 'sanitize_key' ) ) {
	function sanitize_key( $key ) {
		return is_string( $key ) ? strtolower( preg_replace( '/[^a-z0-9_\-]/i', '', $key ) ) : '';
	}
}

if ( ! function_exists( 'esc_attr' ) ) {
	function esc_attr( $text ) {
		return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
	}
}

if ( ! function_exists( 'add_query_arg' ) ) {
	function add_query_arg( $args, $url ) {
		// WordPress does not encode values passed as an array, so neither does this stub.
		$pairs = [];
		foreach ( $args as $key => $value ) {
			$pairs[] = is_array( $value )
				? http_build_query( [ $key => $value ] )
				: $key . '=' . $value;
		}
		return $url . '?' . implode( '&', $pairs );
	}
}

if ( ! function_exists( 'wp_register_style' ) ) {
	function wp_register_style( $handle, $src, $deps = [], $ver = false ) {
		global $wp_styles;
		$wp_styles[ $handle ] = [
			'src'  => $src,
			'deps' => $deps,
			'ver'  => $ver,
		];
	}
}

if ( ! function_exists( 'wp_is_json_request' ) ) {
	function wp_is_json_request() {
		global $is_json_mock;
		return ! empty( $is_json_mock );
	}
}

if ( ! function_exists( 'wp_style_is' ) ) {
	function wp_style_is( $handle, $list = 'enqueued' ) {
		global $wp_styles, $enqueued_styles;
		if ( 'registered' === $list ) {
			return isset( $wp_styles[ $handle ] );
		}
		if ( 'enqueued' === $list ) {
			return in_array( $handle, $enqueued_styles, true );
		}
		return false;
	}
}

if ( ! function_exists( 'sanitize_file_name' ) ) {
	function sanitize_file_name( $name ) {
		return preg_replace( '/[^a-zA-Z0-9_\-\.]/', '', (string) $name );
	}
}

if ( ! class_exists( '_WP_Dependency' ) ) {
	class _WP_Dependency {
		public $handle;
		public $src;
		public $deps = [];
		public $ver = false;
		public $args = null;
		public $extra = [];
		public $textdomain;

		public function __construct( $handle, $src, $deps = [], $ver = false, $args = null ) {
			$this->handle = $handle;
			$this->src    = $src;
			$this->deps   = is_array( $deps ) ? $deps : [];
			$this->ver    = $ver;
			$this->args   = $args;
			$this->extra  = is_array( $args ) && isset( $args['strategy'] ) ? [ 'strategy' => $args['strategy'] ] : [];
		}
	}
}

if ( ! class_exists( 'WP_Scripts' ) ) {
	class WP_Scripts {
		public $registered = [];
	}
}

global $wp_scripts_obj;
$wp_scripts_obj = new WP_Scripts();

global $wp_scripts;
$wp_scripts = [];

if ( ! function_exists( 'wp_scripts' ) ) {
	function wp_scripts() {
		global $wp_scripts_obj, $wp_scripts;
		if ( ! ( $wp_scripts_obj instanceof WP_Scripts ) ) {
			$wp_scripts_obj = new WP_Scripts();
		}
		if ( is_array( $wp_scripts ) ) {
			foreach ( $wp_scripts as $h => $data ) {
				if ( ! isset( $wp_scripts_obj->registered[ $h ] ) ) {
					$wp_scripts_obj->registered[ $h ] = new _WP_Dependency(
						$h,
						$data['src'] ?? '',
						$data['deps'] ?? [],
						$data['ver'] ?? false,
						$data['args'] ?? false
					);
				}
			}
		}
		return $wp_scripts_obj;
	}
}

if ( ! function_exists( 'wp_script_is' ) ) {
	function wp_script_is( $handle, $list = 'enqueued' ) {
		global $wp_scripts, $enqueued_scripts;
		if ( 'registered' === $list ) {
			return isset( $wp_scripts[ $handle ] ) || ( function_exists( 'wp_scripts' ) && isset( wp_scripts()->registered[ $handle ] ) );
		}
		if ( 'enqueued' === $list ) {
			return in_array( $handle, $enqueued_scripts, true );
		}
		return false;
	}
}

if ( ! function_exists( 'wp_script_add_data' ) ) {
	function wp_script_add_data( $handle, $key, $value ) {
		global $wp_scripts;
		$scripts = function_exists( 'wp_scripts' ) ? wp_scripts() : null;
		if ( ! isset( $wp_scripts[ $handle ] ) && ( ! $scripts || ! isset( $scripts->registered[ $handle ] ) ) ) {
			return false;
		}
		if ( ! isset( $wp_scripts[ $handle ] ) ) {
			$wp_scripts[ $handle ] = [
				'src'   => '',
				'deps'  => [],
				'ver'   => false,
				'args'  => [],
				'extra' => [],
			];
		}
		if ( ! isset( $wp_scripts[ $handle ]['extra'] ) ) {
			$wp_scripts[ $handle ]['extra'] = [];
		}
		$wp_scripts[ $handle ]['extra'][ $key ] = $value;
		if ( 'strategy' === $key ) {
			if ( ! is_array( $wp_scripts[ $handle ]['args'] ) ) {
				$wp_scripts[ $handle ]['args'] = [];
			}
			$wp_scripts[ $handle ]['args']['strategy'] = $value;
		}
		if ( $scripts && isset( $scripts->registered[ $handle ] ) ) {
			$scripts->registered[ $handle ]->extra[ $key ] = $value;
			if ( 'strategy' === $key ) {
				if ( ! is_array( $scripts->registered[ $handle ]->args ) ) {
					$scripts->registered[ $handle ]->args = [];
				}
				$scripts->registered[ $handle ]->args['strategy'] = $value;
			}
		}
		return true;
	}
}
if ( ! function_exists( 'wp_register_script' ) ) {
	function wp_register_script( $handle, $src, $deps = [], $ver = false, $args = false ) {
		global $wp_scripts;
		$wp_scripts[ $handle ] = [
			'src'   => $src,
			'deps'  => $deps,
			'ver'   => $ver,
			'args'  => $args,
			'extra' => is_array( $args ) && isset( $args['strategy'] ) ? [ 'strategy' => $args['strategy'] ] : [],
		];
		if ( function_exists( 'wp_scripts' ) ) {
			$scripts = wp_scripts();
			$scripts->registered[ $handle ] = new _WP_Dependency( $handle, $src, $deps, $ver, $args );
		}
		return true;
	}
}

if ( ! function_exists( 'register_block_type' ) ) {
	function register_block_type( $file_or_folder, $args = [] ) {
		global $registered_block_types;
		if ( ! is_array( $registered_block_types ) ) {
			$registered_block_types = [];
		}
		$registered_block_types[] = $file_or_folder;

		$json_file = is_string( $file_or_folder ) ? rtrim( $file_or_folder, '/' ) . '/block.json' : '';
		if ( file_exists( $json_file ) ) {
			$data = json_decode( file_get_contents( $json_file ), true );
			if ( ! empty( $data['name'] ) ) {
				$slug   = str_replace( 'gslider-blocks/', '', $data['name'] );
				$handle = 'gslider-blocks-' . $slug . '-view-script';
				wp_register_script( $handle, 'view.js', [], '1.0.0', true );
			}
		}

		return (object) [ 'name' => is_string( $file_or_folder ) ? basename( $file_or_folder ) : 'mock-block' ];
	}
}
if ( ! function_exists( 'get_queried_object_id' ) ) {
	function get_queried_object_id() {
		return 42;
	}
}

if ( ! class_exists( 'WP_Post' ) ) {
	class WP_Post {
		public $ID;
		public $post_status;
		public $post_password;
		public $post_type;
		public $post_title;
		public $post_content;
	}
}

if ( ! function_exists( 'get_post' ) ) {
	function get_post( $id = null ) {
		global $wp_post_content, $wp_mock_posts, $post;
		if ( null === $id && ! empty( $post ) ) {
			return $post;
		}
		$post_id = (int) ( $id instanceof WP_Post ? $id->ID : ( $id ?? 1 ) );
		if ( isset( $wp_mock_posts[ $post_id ] ) ) {
			return $wp_mock_posts[ $post_id ];
		}
		if ( 99 === $post_id ) {
			return null;
		}
		$mock_post               = new WP_Post();
		$mock_post->ID           = $post_id;
		$mock_post->post_status  = 'publish';
		$mock_post->post_type    = 'post';
		$mock_post->post_title   = 'Post ' . $post_id;
		$mock_post->post_content = $wp_post_content ?? '';
		return $mock_post;
	}
}

if ( ! function_exists( 'post_password_required' ) ) {
	function post_password_required( $post ) {
		global $password_clear;
		$post = get_post( $post );
		if ( ! $post instanceof WP_Post || empty( $post->post_password ) ) {
			return false;
		}
		return empty( $password_clear[ (int) $post->ID ] );
	}
}

if ( ! function_exists( 'get_post_type_object' ) ) {
	function get_post_type_object( $type ) {
		$obj         = new stdClass();
		$obj->public = ( 'internal_note' !== $type );
		$obj->cap    = (object) [ 'read_post' => 'read_post' ];
		return $obj;
	}
}

if ( ! function_exists( 'get_the_title' ) ) {
	function get_the_title( $post ) {
		return $post instanceof WP_Post ? $post->post_title : '';
	}
}

if ( ! function_exists( 'register_rest_field' ) ) {
	function register_rest_field( $object_type, $attribute, $args ) {
		global $registered_rest_fields;
		$registered_rest_fields[] = [
			'object_type' => $object_type,
			'attribute'   => $attribute,
			'args'        => $args,
		];
	}
}

if ( ! function_exists( 'doing_action' ) ) {
	function doing_action( $hook ) {
		global $wp_current_action;
		return $wp_current_action === $hook;
	}
}

if ( ! function_exists( 'parse_blocks' ) ) {
	function parse_blocks( $content ) {
		if ( false !== strpos( $content, 'wp:gslider-blocks/image-slider' ) ) {
			return [
				[
					'blockName'   => 'gslider-blocks/image-slider',
					'attrs'       => [
						'blockId'    => 'slider-abc123',
						'blockStyle' => '.slider-abc123 { border-radius: 8px; }',
					],
					'innerBlocks' => [],
				],
			];
		}
		return [];
	}
}

if ( ! function_exists( 'current_time' ) ) {
	function current_time( $type ) {
		return '2026-10-15 18:00:00';
	}
}

// Composer autoloader.
$gslider_autoloader = dirname( __DIR__, 2 ) . '/vendor/autoload.php';
if ( file_exists( $gslider_autoloader ) ) {
	require_once $gslider_autoloader;
}

if ( ! function_exists( 'wp_is_serving_rest_request' ) ) {
	/**
	 * Stub for wp_is_serving_rest_request(), controlled via the global $is_rest_mock.
	 *
	 * @return bool
	 */
	function wp_is_serving_rest_request() {
		global $is_rest_mock;
		return ! empty( $is_rest_mock );
	}
}

if ( ! function_exists( '_doing_it_wrong' ) ) {
	/**
	 * Stub for _doing_it_wrong() used by the bundled HTML API.
	 *
	 * @return void
	 */
	function _doing_it_wrong( $function_name, $message, $version ) {} // phpcs:ignore
}

// WordPress 6.3 HTML API (copied verbatim from wordpress-develop 6.3.0, GPLv2+) so
// StyleGenerator::optimize_lcp_image() is tested against the real WP_HTML_Tag_Processor.
if ( ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
	require_once __DIR__ . '/stubs/html-api/class-wp-html-attribute-token.php';
	require_once __DIR__ . '/stubs/html-api/class-wp-html-span.php';
	require_once __DIR__ . '/stubs/html-api/class-wp-html-text-replacement.php';
	require_once __DIR__ . '/stubs/html-api/class-wp-html-tag-processor.php';
}
