<?php
/**
 * Unit tests for GSlider\Admin\Dashboard.
 *
 * Verifies that:
 * 1. Dashboard implements Registrable interface and SingletonTrait.
 * 2. Menu slug, capability, and position constants match specifications.
 * 3. register() hooks into WordPress 'admin_menu' and 'admin_enqueue_scripts'.
 * 4. add_menu_page is called with valid title, capability, icon, and position.
 * 5. Menu icon is a base64-encoded SVG data URI.
 * 6. render_dashboard_page enforces capability checks and renders root container.
 * 7. Plugin services array contains Dashboard::class.
 * 8. Assets enqueueing is isolated to the dashboard screen hook with capability checks.
 * 9. Assets localization provides all required runtime config keys.
 * 10. Compiled dashboard CSS and JS bundles exist and contain verified selectors and components.
 * 11. Script translations are registered for the dashboard handle with the plugin text domain.
 * 12. register() hooks the register_block_type_args filter for inserter hiding.
 * 13. filter_allowed_block_types keeps boolean true unchanged with disabled blocks.
 * 14. filter_allowed_block_types removes disabled blocks from explicit allow lists.
 * 15. hide_disabled_from_inserter sets supports.inserter false only for disabled blocks.
 * 16. Disabled block names are normalized, deduped, and validated.
 *
 * @package GSlider\Tests\Admin
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

use GSlider\Admin\Dashboard;
use GSlider\Interfaces\Registrable;

/**
 * Test class for GSlider\Admin\Dashboard.
 */
class DashboardTest {

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		$this->test_class_implements_registrable_and_singleton();
		$this->test_constants_match_specifications();
		$this->test_register_hooks_admin_menu_and_enqueue_scripts();
		$this->test_register_admin_menu_parameters();
		$this->test_menu_icon_is_valid_svg_data_uri();
		$this->test_render_dashboard_page_capability_check();
		$this->test_plugin_services_contains_dashboard_class();
		$this->test_enqueue_dashboard_assets_hook_suffix_and_capability_isolation();
		$this->test_enqueue_dashboard_assets_and_localization();
		$this->test_compiled_dashboard_stylesheet();
		$this->test_compiled_dashboard_header_component();
		$this->test_compiled_dashboard_tabs_navigation();
		$this->test_compiled_overview_tab_and_rest_integration();
		$this->test_compiled_blocks_manager_tab();
		$this->test_streamlined_two_tab_navigation();
		$this->test_enqueue_registers_script_translations();
		$this->test_register_hooks_register_block_type_args_filter();
		$this->test_filter_allowed_block_types_true_stays_true();
		$this->test_filter_allowed_block_types_array_removes_disabled();
		$this->test_hide_disabled_from_inserter_sets_supports();
		$this->test_get_disabled_block_names_normalization();

		echo "All Admin Dashboard tests passed successfully!\n";
	}

	/**
	 * Test 1 & 2: Class exists, implements Registrable, and is a true singleton.
	 *
	 * @return void
	 */
	public function test_class_implements_registrable_and_singleton(): void {
		$dashboard = Dashboard::getInstance();
		if ( ! ( $dashboard instanceof Registrable ) ) {
			fwrite( STDERR, "FAIL: Dashboard does not implement Registrable\n" );
			exit( 1 );
		}
		echo "OK: Dashboard implements Registrable\n";

		if ( Dashboard::getInstance() !== $dashboard ) {
			fwrite( STDERR, "FAIL: Dashboard is not a true singleton\n" );
			exit( 1 );
		}
		echo "OK: Dashboard implements SingletonTrait correctly\n";
	}

	/**
	 * Test 3: Constants match specifications.
	 *
	 * @return void
	 */
	public function test_constants_match_specifications(): void {
		if ( Dashboard::MENU_SLUG !== 'gslider-blocks' ) {
			fwrite( STDERR, "FAIL: Expected MENU_SLUG 'gslider-blocks', got " . Dashboard::MENU_SLUG . "\n" );
			exit( 1 );
		}
		if ( Dashboard::CAPABILITY !== 'manage_options' ) {
			fwrite( STDERR, "FAIL: Expected CAPABILITY 'manage_options', got " . Dashboard::CAPABILITY . "\n" );
			exit( 1 );
		}
		if ( Dashboard::MENU_POSITION !== 61 ) {
			fwrite( STDERR, "FAIL: Expected MENU_POSITION 61, got " . Dashboard::MENU_POSITION . "\n" );
			exit( 1 );
		}
		echo "OK: Dashboard constants verified (slug, capability, position)\n";
	}

	/**
	 * Test 4 & 10: Hook registration for admin_menu and admin_enqueue_scripts.
	 *
	 * @return void
	 */
	public function test_register_hooks_admin_menu_and_enqueue_scripts(): void {
		global $wp_actions;
		$dashboard = Dashboard::getInstance();
		$dashboard->register();

		$has_admin_menu_hook = false;
		foreach ( $wp_actions['admin_menu'] ?? [] as $hook_entry ) {
			if ( is_array( $hook_entry['callback'] ) && $hook_entry['callback'][0] === $dashboard && $hook_entry['callback'][1] === 'register_admin_menu' ) {
				$has_admin_menu_hook = true;
				break;
			}
		}
		if ( ! $has_admin_menu_hook ) {
			fwrite( STDERR, "FAIL: Dashboard register() did not hook into admin_menu\n" );
			exit( 1 );
		}
		echo "OK: Dashboard hooks into admin_menu\n";

		$has_enqueue_hook = false;
		foreach ( $wp_actions['admin_enqueue_scripts'] ?? [] as $hook_entry ) {
			if ( is_array( $hook_entry['callback'] ) && $hook_entry['callback'][0] === $dashboard && $hook_entry['callback'][1] === 'enqueue_dashboard_assets' ) {
				$has_enqueue_hook = true;
				break;
			}
		}
		if ( ! $has_enqueue_hook ) {
			fwrite( STDERR, "FAIL: Dashboard register() did not hook into admin_enqueue_scripts\n" );
			exit( 1 );
		}
		echo "OK: Dashboard hooks into admin_enqueue_scripts\n";
	}

	/**
	 * Test 5: add_menu_page call parameters.
	 *
	 * @return void
	 */
	public function test_register_admin_menu_parameters(): void {
		global $wp_menu_pages;
		$dashboard = Dashboard::getInstance();
		$dashboard->register_admin_menu();

		if ( empty( $wp_menu_pages ) ) {
			fwrite( STDERR, "FAIL: add_menu_page was not called\n" );
			exit( 1 );
		}
		$menu = end( $wp_menu_pages );
		if ( $menu['menu_slug'] !== 'gslider-blocks' ) {
			fwrite( STDERR, "FAIL: Unexpected menu slug {$menu['menu_slug']}\n" );
			exit( 1 );
		}
		if ( $menu['capability'] !== 'manage_options' ) {
			fwrite( STDERR, "FAIL: Unexpected capability {$menu['capability']}\n" );
			exit( 1 );
		}
		if ( $menu['position'] !== 61 ) {
			fwrite( STDERR, "FAIL: Unexpected position {$menu['position']}\n" );
			exit( 1 );
		}
		if ( ! is_callable( $menu['callback'] ) ) {
			fwrite( STDERR, "FAIL: Menu callback is not callable\n" );
			exit( 1 );
		}
		echo "OK: add_menu_page parameters match specification\n";
	}

	/**
	 * Test 6: SVG Icon format.
	 *
	 * @return void
	 */
	public function test_menu_icon_is_valid_svg_data_uri(): void {
		$dashboard = Dashboard::getInstance();
		$icon      = $dashboard->get_menu_icon();
		if ( strpos( $icon, 'data:image/svg+xml;base64,' ) !== 0 ) {
			fwrite( STDERR, "FAIL: Icon is not a base64 SVG data URI\n" );
			exit( 1 );
		}
		$decoded_svg = base64_decode( substr( $icon, strlen( 'data:image/svg+xml;base64,' ) ) );
		if ( strpos( $decoded_svg, '<svg' ) === false || strpos( $decoded_svg, '</svg>' ) === false ) {
			fwrite( STDERR, "FAIL: Decoded SVG is invalid XML\n" );
			exit( 1 );
		}
		echo "OK: Menu icon is valid base64-encoded SVG data URI\n";
	}

	/**
	 * Test 7 & 8: Capability check and root container markup.
	 *
	 * @return void
	 */
	public function test_render_dashboard_page_capability_check(): void {
		global $current_caps;
		$dashboard = Dashboard::getInstance();

		$current_caps = []; // No caps.
		ob_start();
		$dashboard->render_dashboard_page();
		$unauthorized_output = ob_get_clean();
		if ( ! empty( $unauthorized_output ) ) {
			fwrite( STDERR, "FAIL: Unauthorized user received output\n" );
			exit( 1 );
		}
		echo "OK: Unauthorized users receive zero output\n";

		$current_caps['manage_options'] = true;
		ob_start();
		$dashboard->render_dashboard_page();
		$authorized_output = ob_get_clean();
		if ( strpos( $authorized_output, 'id="gslider-admin-dashboard"' ) === false ) {
			fwrite( STDERR, "FAIL: Output missing id='gslider-admin-dashboard'\n" );
			exit( 1 );
		}
		if ( strpos( $authorized_output, 'class="wrap gslider-admin-wrap"' ) === false ) {
			fwrite( STDERR, "FAIL: Output missing class='wrap gslider-admin-wrap'\n" );
			exit( 1 );
		}
		echo "OK: Authorized user receives correct root mounting container\n";
	}

	/**
	 * Test 9: Plugin services array contains Dashboard::class.
	 *
	 * @return void
	 */
	public function test_plugin_services_contains_dashboard_class(): void {
		$plugin_reflection = new ReflectionClass( 'GSlider\Plugin' );
		$services_prop     = $plugin_reflection->getProperty( 'services' );
		if ( PHP_VERSION_ID < 80100 ) {
			$services_prop->setAccessible( true );
		}
		$plugin_instance = \GSlider\Plugin::getInstance();
		$services        = $services_prop->getValue( $plugin_instance );
		if ( ! in_array( Dashboard::class, $services, true ) ) {
			fwrite( STDERR, "FAIL: Dashboard::class is not in Plugin::services array\n" );
			exit( 1 );
		}
		echo "OK: Plugin services array contains Dashboard::class\n";
	}

	/**
	 * Test 11 & 12: Screen hook suffix isolation and capability check on enqueue.
	 *
	 * @return void
	 */
	public function test_enqueue_dashboard_assets_hook_suffix_and_capability_isolation(): void {
		global $current_caps, $enqueued_styles, $enqueued_scripts, $localized_scripts;
		$dashboard = Dashboard::getInstance();

		$enqueued_styles   = [];
		$enqueued_scripts  = [];
		$localized_scripts = [];
		$current_caps['manage_options'] = true;

		$dashboard->enqueue_dashboard_assets( 'edit.php' );
		$dashboard->enqueue_dashboard_assets( 'settings_page_general' );

		if ( ! empty( $enqueued_styles ) || ! empty( $enqueued_scripts ) || ! empty( $localized_scripts ) ) {
			fwrite( STDERR, "FAIL: Assets were enqueued on non-dashboard screen hook\n" );
			exit( 1 );
		}
		echo "OK: Non-matching screen hooks do not enqueue any assets\n";

		$current_caps = [];
		$dashboard->enqueue_dashboard_assets( 'toplevel_page_gslider-blocks' );

		if ( ! empty( $enqueued_styles ) || ! empty( $enqueued_scripts ) || ! empty( $localized_scripts ) ) {
			fwrite( STDERR, "FAIL: Assets were enqueued for unauthorized user\n" );
			exit( 1 );
		}
		echo "OK: Unauthorized users cannot trigger asset enqueueing on dashboard hook\n";
	}

	/**
	 * Test 13 & 14: Asset enqueueing on matching hook suffix and data localization.
	 *
	 * @return void
	 */
	public function test_enqueue_dashboard_assets_and_localization(): void {
		global $current_caps, $enqueued_styles, $enqueued_scripts, $localized_scripts;
		$dashboard = Dashboard::getInstance();

		$current_caps['manage_options'] = true;
		$dashboard->enqueue_dashboard_assets( 'toplevel_page_gslider-blocks' );

		if ( ! isset( $enqueued_styles['wp-components'] ) ) {
			fwrite( STDERR, "FAIL: wp-components style not enqueued\n" );
			exit( 1 );
		}
		if ( ! isset( $enqueued_styles['gslider-dashboard-style'] ) ) {
			fwrite( STDERR, "FAIL: gslider-dashboard-style not enqueued\n" );
			exit( 1 );
		}
		$style = $enqueued_styles['gslider-dashboard-style'];
		if ( $style['src'] !== 'http://example.org/wp-content/plugins/gslider-blocks/assets/admin/css/dashboard.css' ) {
			fwrite( STDERR, "FAIL: gslider-dashboard-style src mismatch\n" );
			exit( 1 );
		}
		if ( $style['deps'] !== [ 'wp-components' ] ) {
			fwrite( STDERR, "FAIL: gslider-dashboard-style dependencies mismatch\n" );
			exit( 1 );
		}
		if ( $style['ver'] !== GSLIDER_VERSION ) {
			fwrite( STDERR, "FAIL: gslider-dashboard-style version mismatch\n" );
			exit( 1 );
		}

		if ( ! isset( $enqueued_scripts['gslider-dashboard-script'] ) ) {
			fwrite( STDERR, "FAIL: gslider-dashboard-script not enqueued\n" );
			exit( 1 );
		}
		$script = $enqueued_scripts['gslider-dashboard-script'];
		if ( $script['src'] !== 'http://example.org/wp-content/plugins/gslider-blocks/assets/admin/js/dashboard.js' ) {
			fwrite( STDERR, "FAIL: gslider-dashboard-script src mismatch\n" );
			exit( 1 );
		}
		if ( empty( $script['in_footer'] ) ) {
			fwrite( STDERR, "FAIL: gslider-dashboard-script not enqueued in footer\n" );
			exit( 1 );
		}
		echo "OK: Dashboard style and script enqueued with correct attributes and dependencies\n";

		if ( ! isset( $localized_scripts['gslider-dashboard-script']['GSliderDashboardData'] ) ) {
			fwrite( STDERR, "FAIL: GSliderDashboardData not localized on gslider-dashboard-script\n" );
			exit( 1 );
		}
		$l10n          = $localized_scripts['gslider-dashboard-script']['GSliderDashboardData'];
		$expected_keys = [ 'siteUrl', 'adminUrl', 'ajaxUrl', 'restUrl', 'nonce', 'version', 'pluginUrl', 'assetsUrl' ];
		foreach ( $expected_keys as $key ) {
			if ( ! array_key_exists( $key, $l10n ) ) {
				fwrite( STDERR, "FAIL: GSliderDashboardData missing key '$key'\n" );
				exit( 1 );
			}
		}
		if ( $l10n['siteUrl'] !== 'http://example.org' ) {
			fwrite( STDERR, "FAIL: Unexpected siteUrl {$l10n['siteUrl']}\n" );
			exit( 1 );
		}
		if ( $l10n['adminUrl'] !== 'http://example.org/wp-admin/' ) {
			fwrite( STDERR, "FAIL: Unexpected adminUrl {$l10n['adminUrl']}\n" );
			exit( 1 );
		}
		if ( $l10n['ajaxUrl'] !== 'http://example.org/wp-admin/admin-ajax.php' ) {
			fwrite( STDERR, "FAIL: Unexpected ajaxUrl {$l10n['ajaxUrl']}\n" );
			exit( 1 );
		}
		if ( $l10n['restUrl'] !== 'http://example.org/wp-json/gslider/v1/' ) {
			fwrite( STDERR, "FAIL: Unexpected restUrl {$l10n['restUrl']}\n" );
			exit( 1 );
		}
		if ( $l10n['nonce'] !== 'mock_nonce_wp_rest' ) {
			fwrite( STDERR, "FAIL: Unexpected nonce {$l10n['nonce']}\n" );
			exit( 1 );
		}
		if ( $l10n['version'] !== GSLIDER_VERSION ) {
			fwrite( STDERR, "FAIL: Unexpected version {$l10n['version']}\n" );
			exit( 1 );
		}
		if ( $l10n['pluginUrl'] !== 'http://example.org/wp-content/plugins/gslider-blocks/' ) {
			fwrite( STDERR, "FAIL: Unexpected pluginUrl {$l10n['pluginUrl']}\n" );
			exit( 1 );
		}
		if ( $l10n['assetsUrl'] !== 'http://example.org/wp-content/plugins/gslider-blocks/assets/' ) {
			fwrite( STDERR, "FAIL: Unexpected assetsUrl {$l10n['assetsUrl']}\n" );
			exit( 1 );
		}
		echo "OK: GSliderDashboardData localized correctly with all 8 runtime configuration keys\n";
	}

	/**
	 * Test 15: Compiled dashboard stylesheet exists and contains scoped layout rules.
	 *
	 * @return void
	 */
	public function test_compiled_dashboard_stylesheet(): void {
		$dashboard_css_file = GSLIDER_DIR_PATH . 'assets/admin/css/dashboard.css';
		if ( ! file_exists( $dashboard_css_file ) ) {
			fwrite( STDERR, "FAIL: Compiled assets/admin/css/dashboard.css not found\n" );
			exit( 1 );
		}
		$dashboard_css_content = file_get_contents( $dashboard_css_file );
		if ( strpos( $dashboard_css_content, 'body.toplevel_page_gslider-blocks' ) === false ) {
			fwrite( STDERR, "FAIL: dashboard.css missing scoped body.toplevel_page_gslider-blocks rule\n" );
			exit( 1 );
		}
		if ( strpos( $dashboard_css_content, '.gslider-dashboard-wrap' ) === false ) {
			fwrite( STDERR, "FAIL: dashboard.css missing .gslider-dashboard-wrap class\n" );
			exit( 1 );
		}
		if ( strpos( $dashboard_css_content, 'prefers-reduced-motion' ) === false ) {
			fwrite( STDERR, "FAIL: dashboard.css missing prefers-reduced-motion accessibility media query\n" );
			exit( 1 );
		}
		echo "OK: Compiled dashboard stylesheet verified (scoped selector, layout classes, reduced-motion)\n";
	}

	/**
	 * Test 16: Compiled dashboard header component and styles verification.
	 *
	 * @return void
	 */
	public function test_compiled_dashboard_header_component(): void {
		$dashboard_css_file    = GSLIDER_DIR_PATH . 'assets/admin/css/dashboard.css';
		$dashboard_css_content = file_get_contents( $dashboard_css_file );

		$required_header_classes = [
			'.gslider-dashboard-header',
			'.gslider-dashboard-brand',
			'.gslider-dashboard-logo',
			'.gslider-dashboard-title',
			'.gslider-dashboard-version-pill',
			'.gslider-dashboard-actions',
			'.gslider-dashboard-btn',
		];
		foreach ( $required_header_classes as $class_name ) {
			if ( strpos( $dashboard_css_content, $class_name ) === false ) {
				fwrite( STDERR, "FAIL: dashboard.css missing header class '$class_name'\n" );
				exit( 1 );
			}
		}
		$dashboard_js_file = GSLIDER_DIR_PATH . 'assets/admin/js/dashboard.js';
		if ( ! file_exists( $dashboard_js_file ) ) {
			fwrite( STDERR, "FAIL: Compiled assets/admin/js/dashboard.js not found\n" );
			exit( 1 );
		}
		$dashboard_js_content = file_get_contents( $dashboard_js_file );
		if ( strpos( $dashboard_js_content, 'https://github.com/noruzzamans/gslider-blocks#readme' ) === false ) {
			fwrite( STDERR, "FAIL: dashboard.js missing documentation URL\n" );
			exit( 1 );
		}
		if ( strpos( $dashboard_js_content, 'https://wordpress.org/support/plugin/gslider-blocks/' ) === false ) {
			fwrite( STDERR, "FAIL: dashboard.js missing support forum URL\n" );
			exit( 1 );
		}
		echo "OK: Header component styles and resource URLs verified in compiled assets\n";
	}

	/**
	 * Test 17: Compiled dashboard tabs navigation styles and state logic verification.
	 *
	 * @return void
	 */
	public function test_compiled_dashboard_tabs_navigation(): void {
		$dashboard_css_file    = GSLIDER_DIR_PATH . 'assets/admin/css/dashboard.css';
		$dashboard_js_file     = GSLIDER_DIR_PATH . 'assets/admin/js/dashboard.js';
		$dashboard_css_content = file_get_contents( $dashboard_css_file );
		$dashboard_js_content  = file_get_contents( $dashboard_js_file );

		$required_nav_classes = [
			'.gslider-dashboard-nav',
			'.gslider-dashboard-tabs',
			'.gslider-dashboard-tab',
			'.gslider-dashboard-tab-icon',
			'.gslider-dashboard-tab-label',
			'.gslider-dashboard-tab-badge',
			'.is-active',
		];
		foreach ( $required_nav_classes as $class_name ) {
			if ( strpos( $dashboard_css_content, $class_name ) === false ) {
				fwrite( STDERR, "FAIL: dashboard.css missing navigation class '$class_name'\n" );
				exit( 1 );
			}
		}

		$required_tabs = [ 'overview', 'blocks' ];
		foreach ( $required_tabs as $tab_id ) {
			if ( strpos( $dashboard_js_content, $tab_id ) === false ) {
				fwrite( STDERR, "FAIL: dashboard.js missing tab identifier '$tab_id'\n" );
				exit( 1 );
			}
		}

		if ( strpos( $dashboard_js_content, 'hashchange' ) === false ) {
			fwrite( STDERR, "FAIL: dashboard.js missing hashchange event listener\n" );
			exit( 1 );
		}
		echo "OK: Navigation tabs component styles and URL hash sync logic verified in compiled assets\n";
	}

	/**
	 * Test 18: Compiled Overview tab, metric cards, and quickstart guide verification.
	 *
	 * @return void
	 */
	public function test_compiled_overview_tab_and_rest_integration(): void {
		$dashboard_css_file    = GSLIDER_DIR_PATH . 'assets/admin/css/dashboard.css';
		$dashboard_js_file     = GSLIDER_DIR_PATH . 'assets/admin/js/dashboard.js';
		$dashboard_css_content = file_get_contents( $dashboard_css_file );
		$dashboard_js_content  = file_get_contents( $dashboard_js_file );

		$required_card_classes = [
			'.gslider-dashboard-hero',
			'.gslider-dashboard-hero-title',
			'.gslider-dashboard-btn-primary',
			'.gslider-dashboard-metrics-grid',
			'.gslider-dashboard-metric-card',
			'.gslider-dashboard-metric-value',
			'.gslider-dashboard-quickstart',
			'.gslider-dashboard-steps-grid',
			'.gslider-dashboard-step-item',
			'.gslider-dashboard-skeleton',
		];
		foreach ( $required_card_classes as $class_name ) {
			if ( strpos( $dashboard_css_content, $class_name ) === false ) {
				fwrite( STDERR, "FAIL: dashboard.css missing card class '$class_name'\n" );
				exit( 1 );
			}
		}

		$required_overview_strings = [
			'/gslider/v1/dashboard',
			'post-new.php?post_type=page',
			'Sliders',
			'On published posts and pages',
			'Active Core Blocks',
			'Modern Architecture',
			'Create Your First Slider in 3 Simple Steps',
			'Pure Swiper.js + React runtime',
		];
		foreach ( $required_overview_strings as $str ) {
			if ( strpos( $dashboard_js_content, $str ) === false ) {
				fwrite( STDERR, "FAIL: dashboard.js missing overview string '$str'\n" );
				exit( 1 );
			}
		}

		$asset_php_file = GSLIDER_DIR_PATH . 'assets/admin/js/dashboard.asset.php';
		$asset_data     = require $asset_php_file;
		if ( ! in_array( 'wp-api-fetch', $asset_data['dependencies'], true ) ) {
			fwrite( STDERR, "FAIL: dashboard.asset.php missing 'wp-api-fetch' dependency\n" );
			exit( 1 );
		}
		echo "OK: Overview tab hero, live metric cards, quickstart guide, and REST API integration verified\n";
	}

	/**
	 * Test 19: Compiled Blocks Manager tab, iOS toggle switches, and REST sync verification.
	 *
	 * @return void
	 */
	public function test_compiled_blocks_manager_tab(): void {
		$dashboard_css_file    = GSLIDER_DIR_PATH . 'assets/admin/css/dashboard.css';
		$dashboard_js_file     = GSLIDER_DIR_PATH . 'assets/admin/js/dashboard.js';
		$dashboard_css_content = file_get_contents( $dashboard_css_file );
		$dashboard_js_content  = file_get_contents( $dashboard_js_file );

		$required_block_classes = [
			'.gslider-toggle-switch',
			'.gslider-toggle-track',
			'.gslider-toggle-thumb',
			'.gslider-dashboard-blocks-header',
			'.gslider-dashboard-blocks-title',
			'.gslider-dashboard-blocks-badge',
			'.gslider-dashboard-blocks-grid',
			'.gslider-dashboard-block-card',
			'.gslider-dashboard-block-icon',
			'.gslider-dashboard-block-status-tag',
			'.gslider-dashboard-toast',
		];
		foreach ( $required_block_classes as $class_name ) {
			if ( strpos( $dashboard_css_content, $class_name ) === false ) {
				fwrite( STDERR, "FAIL: dashboard.css missing block manager class '$class_name'\n" );
				exit( 1 );
			}
		}

		$required_block_strings = [
			'/gslider/v1/dashboard/toggle-block',
			'Core Slider Blocks',
			'Base Slider',
			'Flexi Content Slider',
			'Image Slider',
			'Logo Carousel',
			'Post Carousel',
			'Testimonial Slider',
			'Active',
			'Disabled',
		];
		foreach ( $required_block_strings as $str ) {
			if ( strpos( $dashboard_js_content, $str ) === false ) {
				fwrite( STDERR, "FAIL: dashboard.js missing block manager string '$str'\n" );
				exit( 1 );
			}
		}
		echo "OK: Blocks Manager tab, iOS toggle switches, and REST endpoint integration verified\n";
	}

	/**
	 * Test 20: Streamlined 2-Tab Navigation Verification.
	 *
	 * @return void
	 */
	public function test_streamlined_two_tab_navigation(): void {
		$dashboard_js_file    = GSLIDER_DIR_PATH . 'assets/admin/js/dashboard.js';
		$dashboard_js_content = file_get_contents( $dashboard_js_file );

		$required_nav_strings = [
			'Overview',
			'Blocks',
		];
		foreach ( $required_nav_strings as $str ) {
			if ( strpos( $dashboard_js_content, $str ) === false ) {
				fwrite( STDERR, "FAIL: dashboard.js missing navigation string '$str'\n" );
				exit( 1 );
			}
		}
		echo "OK: Streamlined 2-tab navigation verified (Overview, Blocks)\n";
	}

	/**
	 * Test 21: Script translations registered for the dashboard script handle.
	 *
	 * @return void
	 */
	public function test_enqueue_registers_script_translations(): void {
		global $current_caps, $enqueued_scripts, $script_translations;
		$dashboard = Dashboard::getInstance();

		$enqueued_scripts    = [];
		$script_translations = [];
		$GLOBALS['wp_scripts_obj'] = new WP_Scripts();
		$current_caps['manage_options'] = true;
		$dashboard->enqueue_dashboard_assets( 'toplevel_page_gslider-blocks' );

		if ( ! isset( $script_translations['gslider-dashboard-script'] ) ) {
			fwrite( STDERR, "FAIL: wp_set_script_translations was not called for gslider-dashboard-script\n" );
			exit( 1 );
		}
		$registration = $script_translations['gslider-dashboard-script'];
		if ( $registration['domain'] !== 'gslider-blocks' ) {
			fwrite( STDERR, "FAIL: Unexpected script translations domain {$registration['domain']}\n" );
			exit( 1 );
		}
		if ( $registration['path'] !== GSLIDER_DIR_PATH . 'languages' ) {
			fwrite( STDERR, "FAIL: Unexpected script translations path {$registration['path']}\n" );
			exit( 1 );
		}
		$registered = wp_scripts()->registered['gslider-dashboard-script'] ?? null;
		if ( null === $registered || $registered->textdomain !== 'gslider-blocks' ) {
			fwrite( STDERR, "FAIL: wp_scripts()->registered['gslider-dashboard-script']->textdomain is not 'gslider-blocks'\n" );
			exit( 1 );
		}
		echo "OK: Script translations registered for gslider-dashboard-script (domain gslider-blocks, languages path)\n";
	}

	/**
	 * Test 12: register() hooks the register_block_type_args filter.
	 *
	 * @return void
	 */
	public function test_register_hooks_register_block_type_args_filter(): void {
		global $wp_filters;
		$dashboard = Dashboard::getInstance();
		$dashboard->register();

		if ( empty( $wp_filters['register_block_type_args'] ) ) {
			fwrite( STDERR, "FAIL: Dashboard register() did not hook into register_block_type_args\n" );
			exit( 1 );
		}

		$has_filter = false;
		foreach ( $wp_filters['register_block_type_args'] as $filter ) {
			if ( is_array( $filter['callback'] ) && $filter['callback'][0] === $dashboard && 'hide_disabled_from_inserter' === $filter['callback'][1] ) {
				$has_filter = true;
				break;
			}
		}
		if ( ! $has_filter ) {
			fwrite( STDERR, "FAIL: hide_disabled_from_inserter not registered on register_block_type_args\n" );
			exit( 1 );
		}
		echo "OK: Dashboard hooks hide_disabled_from_inserter into register_block_type_args\n";
	}

	/**
	 * Test 13: Boolean true input stays true even with disabled blocks,
	 * so JS-only third-party blocks are not hidden site-wide.
	 *
	 * @return void
	 */
	public function test_filter_allowed_block_types_true_stays_true(): void {
		global $wp_options;
		$dashboard  = Dashboard::getInstance();
		$wp_options['gslider_disabled_blocks'] = [ 'testimonial' ];

		$result = $dashboard->filter_allowed_block_types( true, null );

		if ( true !== $result ) {
			fwrite( STDERR, "FAIL: filter_allowed_block_types(true) should return true, got: " . var_export( $result, true ) . "\n" );
			exit( 1 );
		}
		echo "OK: filter_allowed_block_types keeps true unchanged with disabled blocks\n";

		unset( $wp_options['gslider_disabled_blocks'] );
	}

	/**
	 * Test 14: Explicit allow lists have disabled GSlider blocks removed.
	 *
	 * @return void
	 */
	public function test_filter_allowed_block_types_array_removes_disabled(): void {
		global $wp_options;
		$dashboard = Dashboard::getInstance();

		$wp_options['gslider_disabled_blocks'] = [ 'logo-carousel', 'gslider-blocks/flexi-content' ];
		$allowed  = [ 'core/paragraph', 'gslider-blocks/logo-carousel', 'gslider-blocks/flexi-content', 'gslider-blocks/flexi-content-item', 'core/heading' ];

		$result = $dashboard->filter_allowed_block_types( $allowed, null );
		$expected = [ 'core/paragraph', 'core/heading' ];

		if ( $result !== $expected ) {
			fwrite( STDERR, "FAIL: Expected " . json_encode( $expected ) . ', got: ' . json_encode( $result ) . "\n" );
			exit( 1 );
		}
		echo "OK: filter_allowed_block_types removes disabled blocks from explicit arrays\n";

		// Short slugs normalize and flexi-content cascades to its item.
		$wp_options['gslider_disabled_blocks'] = [ 'flexi-content' ];
		$result = $dashboard->filter_allowed_block_types( [ 'gslider-blocks/flexi-content-item' ], null );
		if ( [] !== $result ) {
			fwrite( STDERR, "FAIL: flexi-content disabling should cascade to flexi-content-item, got: " . json_encode( $result ) . "\n" );
			exit( 1 );
		}
		echo "OK: flexi-content disabling cascades to flexi-content-item in allow lists\n";

		// Empty option leaves the list untouched.
		unset( $wp_options['gslider_disabled_blocks'] );
		$result = $dashboard->filter_allowed_block_types( [ 'core/paragraph' ], null );
		if ( [ 'core/paragraph' ] !== $result ) {
			fwrite( STDERR, "FAIL: Empty disabled option should return list unchanged, expected ['core/paragraph'], got: " . json_encode( $result ) . "\n" );
			exit( 1 );
		}
		echo "OK: filter_allowed_block_types returns list unchanged when nothing is disabled\n";
	}

	/**
	 * Test 15: hide_disabled_from_inserter sets supports.inserter false only
	 * for disabled GSlider blocks.
	 *
	 * @return void
	 */
	public function test_hide_disabled_from_inserter_sets_supports(): void {
		global $wp_options;
		$dashboard = Dashboard::getInstance();

		$wp_options['gslider_disabled_blocks'] = [ 'testimonial' ];
		$args = $dashboard->hide_disabled_from_inserter( [ 'supports' => [ 'anchor' => true ] ], 'gslider-blocks/testimonial' );
		if ( false !== ( $args['supports']['inserter'] ?? null ) || true !== ( $args['supports']['anchor'] ?? null ) ) {
			fwrite( STDERR, "FAIL: Expected supports.inserter=false and anchor=true for disabled block, got: " . json_encode( $args ) . "\n" );
			exit( 1 );
		}
		echo "OK: hide_disabled_from_inserter sets inserter=false on disabled block\n";

		// Missing supports key gets created.
		$args = $dashboard->hide_disabled_from_inserter( [], 'gslider-blocks/testimonial' );
		if ( false !== ( $args['supports']['inserter'] ?? null ) ) {
			fwrite( STDERR, "FAIL: Expected supports.inserter=false when supports key is missing, got: " . json_encode( $args ) . "\n" );
			exit( 1 );
		}
		echo "OK: hide_disabled_from_inserter initializes missing supports\n";

		// Enabled blocks pass through untouched.
		$args = [ 'supports' => [ 'inserter' => true ] ];
		$args = $dashboard->hide_disabled_from_inserter( $args, 'core/paragraph' );
		if ( true !== ( $args['supports']['inserter'] ?? null ) ) {
			fwrite( STDERR, "FAIL: Non-disabled blocks must pass through unchanged with inserter=true, got: " . json_encode( $args ) . "\n" );
			exit( 1 );
		}
		echo "OK: hide_disabled_from_inserter leaves other blocks untouched\n";

		// Flexi Content cascade covers the child item block.
		$wp_options['gslider_disabled_blocks'] = [ 'flexi-content' ];
		$args = $dashboard->hide_disabled_from_inserter( [], 'gslider-blocks/flexi-content-item' );
		if ( false !== ( $args['supports']['inserter'] ?? null ) ) {
			fwrite( STDERR, "FAIL: flexi-content disabling should hide flexi-content-item from inserter, got: " . json_encode( $args ) . "\n" );
			exit( 1 );
		}
		echo "OK: hide_disabled_from_inserter cascades flexi-content to flexi-content-item\n";

		// Nothing disabled: args unchanged.
		unset( $wp_options['gslider_disabled_blocks'] );
		$args = [ 'supports' => [ 'inserter' => true ] ];
		$args = $dashboard->hide_disabled_from_inserter( $args, 'gslider-blocks/testimonial' );
		if ( true !== ( $args['supports']['inserter'] ?? null ) ) {
			fwrite( STDERR, "FAIL: Empty disabled option must not change args, expected inserter=true, got: " . json_encode( $args ) . "\n" );
			exit( 1 );
		}
		echo "OK: hide_disabled_from_inserter no-ops when nothing is disabled\n";
	}

	/**
	 * Test 16: get_disabled_block_names normalizes slugs, dedupes, and skips
	 * invalid entries.
	 *
	 * @return void
	 */
	public function test_get_disabled_block_names_normalization(): void {
		global $wp_options;
		$dashboard = Dashboard::getInstance();

		$wp_options['gslider_disabled_blocks'] = [ 'testimonial', 'gslider-blocks/testimonial', '', 123, null, 'logo-carousel' ];

		$ref = new ReflectionMethod( Dashboard::class, 'get_disabled_block_names' );
		if ( PHP_VERSION_ID < 80100 ) {
			$ref->setAccessible( true );
		}
		$names = $ref->invoke( $dashboard );

		$expected = [ 'gslider-blocks/testimonial', 'gslider-blocks/logo-carousel' ];
		if ( $expected !== $names ) {
			fwrite( STDERR, "FAIL: Expected " . json_encode( $expected ) . ', got: ' . json_encode( $names ) . "\n" );
			exit( 1 );
		}
		echo "OK: get_disabled_block_names normalizes, dedupes, and skips invalid entries\n";

		// Non-array or empty option returns empty list.
		$wp_options['gslider_disabled_blocks'] = 'bad';
		if ( [] !== $ref->invoke( $dashboard ) ) {
			fwrite( STDERR, "FAIL: Expected [] for non-array option, got: " . json_encode( $ref->invoke( $dashboard ) ) . "\n" );
			exit( 1 );
		}
		unset( $wp_options['gslider_disabled_blocks'] );
		if ( [] !== $ref->invoke( $dashboard ) ) {
			fwrite( STDERR, "FAIL: Expected [] for missing option, got: " . json_encode( $ref->invoke( $dashboard ) ) . "\n" );
			exit( 1 );
		}
		echo "OK: get_disabled_block_names handles non-array and missing options\n";
	}
}

// Standalone execution entrypoint
( new DashboardTest() )->run_all_tests();
