<?php
/**
 * Unit tests for GSlider\Admin\DashboardController.
 *
 * Verifies that:
 * 1. DashboardController implements Registrable interface, extends WP_REST_Controller, and implements SingletonTrait.
 * 2. register() hooks into rest_api_init, save_post, and deleted_post.
 * 3. register_routes() configures the /gslider/v1/dashboard endpoint with GET method and callbacks.
 * 4. get_item_permissions_check() enforces 'manage_options' capability.
 * 5. get_sliders_count() counts published slider blocks, executes proper SQL query, and utilizes transient caching.
 * 6. get_blocks_status() returns core blocks in alphabetical order and respects disabled block settings.
 * 7. get_system_metrics() provides accurate PHP version, WP version, and memory limit.
 * 8. get_item() returns complete structured JSON payload.
 * 9. get_item_schema() provides valid JSON schema definition.
 * 10. Plugin::$services array contains DashboardController::class.
 * 11. toggle_block() serializes on an advisory lock, reads the stored option
 *     (not a stale request-local cache) inside the critical section, rejects
 *     contention with 409, rejects unknown slugs with 400, guards the
 *     unsupported-driver per-request fallback, and wraps the 'all' toggle
 *     in a lock pair (#329).
 *
 * @package GSlider\Tests\Admin
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

use GSlider\Admin\DashboardController;
use GSlider\Interfaces\Registrable;
use GSlider\Plugin;

/**
 * Test class for GSlider\Admin\DashboardController.
 */
class DashboardControllerTest {

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		$this->test_class_interface_and_singleton();
		$this->test_hook_registration();
		$this->test_route_registration();
		$this->test_permissions_check();
		$this->test_sliders_count_query_and_transient_caching();
		$this->test_block_status_listing_and_disabling();
		$this->test_system_metrics_payload();
		$this->test_endpoint_response_payload_structure();
		$this->test_toggle_block_action();
		$this->test_toggle_block_sequential_updates_persist();
		$this->test_toggle_block_lock_unavailable_rejects_without_writing();
		$this->test_toggle_block_reads_fresh_option_after_stale_cache();
		$this->test_toggle_block_unsupported_driver_fallback_is_guarded();
		$this->test_toggle_block_rejects_unknown_slug();
		$this->test_toggle_all_runs_inside_lock_pair();
		$this->test_rest_schema_definition();
		$this->test_plugin_service_registration();

		echo "\nAll DashboardController REST API tests passed successfully!\n";
	}

	/**
	 * Test 1: Class Interface and Singleton Implementation.
	 *
	 * @return void
	 */
	public function test_class_interface_and_singleton(): void {
		$controller = DashboardController::getInstance();

		if ( ! ( $controller instanceof Registrable ) ) {
			fwrite( STDERR, "FAIL: DashboardController does not implement Registrable\n" );
			exit( 1 );
		}
		echo "OK: DashboardController implements Registrable\n";

		if ( ! ( $controller instanceof WP_REST_Controller ) ) {
			fwrite( STDERR, "FAIL: DashboardController does not extend WP_REST_Controller\n" );
			exit( 1 );
		}
		echo "OK: DashboardController extends WP_REST_Controller\n";

		if ( DashboardController::getInstance() !== $controller ) {
			fwrite( STDERR, "FAIL: DashboardController is not a true singleton\n" );
			exit( 1 );
		}
		echo "OK: DashboardController implements SingletonTrait correctly\n";
	}

	/**
	 * Test 2: Hook Registration in register().
	 *
	 * @return void
	 */
	public function test_hook_registration(): void {
		global $wp_actions;

		$controller = DashboardController::getInstance();
		$controller->register();

		if ( empty( $wp_actions['rest_api_init'] ) ) {
			fwrite( STDERR, "FAIL: DashboardController does not hook into rest_api_init\n" );
			exit( 1 );
		}
		echo "OK: DashboardController hooks into rest_api_init\n";

		if ( empty( $wp_actions['save_post'] ) ) {
			fwrite( STDERR, "FAIL: DashboardController does not hook into save_post\n" );
			exit( 1 );
		}
		echo "OK: DashboardController hooks into save_post\n";

		if ( empty( $wp_actions['deleted_post'] ) ) {
			fwrite( STDERR, "FAIL: DashboardController does not hook into deleted_post\n" );
			exit( 1 );
		}
		echo "OK: DashboardController hooks into deleted_post\n";

		$has_rest_hook = false;
		foreach ( $wp_actions['rest_api_init'] as $action ) {
			if ( is_array( $action['callback'] ) && $action['callback'][0] === $controller && 'register_routes' === $action['callback'][1] ) {
				$has_rest_hook = true;
				break;
			}
		}

		if ( ! $has_rest_hook ) {
			fwrite( STDERR, "FAIL: register_routes callback is not registered on rest_api_init\n" );
			exit( 1 );
		}
		echo "OK: register_routes callback registered on rest_api_init\n";
	}

	/**
	 * Test 3: Route Registration.
	 *
	 * @return void
	 */
	public function test_route_registration(): void {
		global $wp_rest_routes;

		$controller = DashboardController::getInstance();
		$controller->register_routes();

		if ( ! isset( $wp_rest_routes['gslider/v1']['/dashboard'] ) ) {
			fwrite( STDERR, "FAIL: REST route /gslider/v1/dashboard is not registered\n" );
			exit( 1 );
		}
		echo "OK: REST route /gslider/v1/dashboard is registered\n";

		if ( ! isset( $wp_rest_routes['gslider/v1']['/dashboard/toggle-block'] ) ) {
			fwrite( STDERR, "FAIL: REST route /gslider/v1/dashboard/toggle-block is not registered\n" );
			exit( 1 );
		}
		echo "OK: REST route /gslider/v1/dashboard/toggle-block is registered\n";

		$endpoint_config = $wp_rest_routes['gslider/v1']['/dashboard'][0];

		if ( 'GET' !== $endpoint_config['methods'] ) {
			fwrite( STDERR, "FAIL: Endpoint method is not GET\n" );
			exit( 1 );
		}
		echo "OK: Endpoint method is GET\n";

		if ( ! is_callable( $endpoint_config['callback'] ) ) {
			fwrite( STDERR, "FAIL: Endpoint callback is not callable\n" );
			exit( 1 );
		}
		echo "OK: Endpoint callback is callable\n";

		if ( ! is_callable( $endpoint_config['permission_callback'] ) ) {
			fwrite( STDERR, "FAIL: Endpoint permission_callback is not callable\n" );
			exit( 1 );
		}
		echo "OK: Endpoint permission_callback is callable\n";
	}

	/**
	 * Test 4: Permissions Check (manage_options capability).
	 *
	 * @return void
	 */
	public function test_permissions_check(): void {
		global $current_caps;

		$controller = DashboardController::getInstance();
		$request    = new WP_REST_Request();

		// Case A: Unauthorized user (no manage_options).
		$current_caps = [];
		$perm_result  = $controller->get_item_permissions_check( $request );

		if ( ! ( $perm_result instanceof WP_Error ) ) {
			fwrite( STDERR, "FAIL: Unauthorized user did not receive WP_Error\n" );
			exit( 1 );
		}
		echo "OK: Unauthorized user receives WP_Error\n";

		if ( 401 !== $perm_result->get_error_data()['status'] ) {
			fwrite( STDERR, "FAIL: Unauthorized user did not receive 401 status\n" );
			exit( 1 );
		}
		echo "OK: Unauthorized user receives 401 status\n";

		if ( 'rest_forbidden' !== $perm_result->get_error_code() ) {
			fwrite( STDERR, "FAIL: Unauthorized user did not receive rest_forbidden code\n" );
			exit( 1 );
		}
		echo "OK: Unauthorized user receives rest_forbidden code\n";

		// Case B: Authorized user (has manage_options).
		$current_caps['manage_options'] = true;
		$perm_result                    = $controller->get_item_permissions_check( $request );

		if ( true !== $perm_result ) {
			fwrite( STDERR, "FAIL: Authorized administrator did not receive true\n" );
			exit( 1 );
		}
		echo "OK: Authorized administrator receives true for permissions check\n";
	}

	/**
	 * Test 5: Sliders Count Query & Transient Caching.
	 *
	 * @return void
	 */
	public function test_sliders_count_query_and_transient_caching(): void {
		global $wp_transients, $wpdb;

		$controller    = DashboardController::getInstance();
		$wp_transients = [];

		// Mock 2 posts: Post 1 has 2 image sliders and 1 child item; Post 2 has 1 testimonial, 1 base slider, and 1 post carousel.
		// Total actual slider instances = 5 (excluding child items).
		$wpdb->return_col = [
			'<!-- wp:gslider-blocks/image-slider {"blockId":"img-1"} /--> <p>Hello</p> <!-- wp:gslider-blocks/flexi-content-item /--> <!-- wp:gslider-blocks/image-slider {"blockId":"img-2"} /-->',
			'<!-- wp:gslider-blocks/testimonial {"blockId":"testi-1"} /--> <!-- wp:gslider-blocks/base {"blockId":"base-1"} /--> <!-- wp:gslider-blocks/post-carousel {"blockId":"post-1"} /-->',
		];

		// Fetch count when transient is empty (triggers DB query).
		$count = $controller->get_sliders_count();

		if ( 5 !== $count ) {
			fwrite( STDERR, "FAIL: get_sliders_count expected 5, got {$count}\n" );
			exit( 1 );
		}
		echo "OK: get_sliders_count accurately counts total published slider blocks (5 instances across 2 posts)\n";

		if ( false === strpos( $wpdb->last_query, "post_status = 'publish'" ) ) {
			fwrite( STDERR, "FAIL: Query does not filter by publish status\n" );
			exit( 1 );
		}
		echo "OK: Query filters strictly by publish status\n";

		if ( false === strpos( $wpdb->last_query, "post_type IN ('post', 'page')" ) ) {
			fwrite( STDERR, "FAIL: Query does not filter by post and page post_types\n" );
			exit( 1 );
		}
		echo "OK: Query filters strictly by post and page post_types\n";

		if ( false === strpos( $wpdb->last_query, "post_content LIKE '%wp:gslider-blocks/%'" ) ) {
			fwrite( STDERR, "FAIL: Query does not match GSlider block markup\n" );
			exit( 1 );
		}
		echo "OK: Query matches GSlider block markup\n";

		if ( ! isset( $wp_transients['gslider_slider_count_cache'] ) ) {
			fwrite( STDERR, "FAIL: Transient gslider_slider_count_cache not set\n" );
			exit( 1 );
		}
		echo "OK: Slider count is cached in gslider_slider_count_cache transient\n";

		if ( 5 !== $wp_transients['gslider_slider_count_cache'] ) {
			fwrite( STDERR, "FAIL: Transient does not hold correct count value\n" );
			exit( 1 );
		}
		echo "OK: Transient holds correct count value\n";

		// Modify return_col to verify cached value is returned without hitting DB again.
		$wpdb->return_col = [ '<!-- wp:gslider-blocks/base /-->' ];
		$cached_count     = $controller->get_sliders_count();

		if ( 5 !== $cached_count ) {
			fwrite( STDERR, "FAIL: get_sliders_count did not return cached transient value\n" );
			exit( 1 );
		}
		echo "OK: get_sliders_count returns cached transient value without re-querying DB\n";

		// Invalidate cache via flush_slider_count_cache().
		$controller->flush_slider_count_cache();

		if ( isset( $wp_transients['gslider_slider_count_cache'] ) ) {
			fwrite( STDERR, "FAIL: flush_slider_count_cache failed to clear transient\n" );
			exit( 1 );
		}
		echo "OK: flush_slider_count_cache clears the transient\n";

		// Next fetch should retrieve updated value (1 slider).
		$refreshed_count = $controller->get_sliders_count();

		if ( 1 !== $refreshed_count ) {
			fwrite( STDERR, "FAIL: Refreshed fetch expected 1, got {$refreshed_count}\n" );
			exit( 1 );
		}
		echo "OK: Refreshed fetch retrieves updated value after transient flush\n";
	}

	/**
	 * Test 6: Block Status Listing & Disabling Toggle.
	 *
	 * @return void
	 */
	public function test_block_status_listing_and_disabling(): void {
		global $wp_options;

		$controller     = DashboardController::getInstance();
		$wp_options     = [];
		$blocks         = $controller->get_blocks_status();
		$expected_slugs = [ 'base', 'flexi-content', 'image-slider', 'logo-carousel', 'post-carousel', 'testimonial' ];
		$actual_slugs   = array_column( $blocks, 'slug' );

		if ( $expected_slugs !== $actual_slugs ) {
			fwrite( STDERR, "FAIL: Block slugs do not match core specification in alphabetical order\n" );
			exit( 1 );
		}
		echo "OK: Block slugs match core specification in alphabetical order\n";

		foreach ( $blocks as $block ) {
			if ( true !== $block['enabled'] ) {
				fwrite( STDERR, "FAIL: Block {$block['slug']} is not enabled by default\n" );
				exit( 1 );
			}
			if ( empty( $block['name'] ) ) {
				fwrite( STDERR, "FAIL: Block {$block['slug']} has empty human name\n" );
				exit( 1 );
			}
		}
		echo "OK: All blocks are enabled by default with human-readable names\n";

		// Test with disabled blocks using both short slug ('testimonial') and full block name ('gslider-blocks/base').
		$wp_options['gslider_disabled_blocks'] = [ 'testimonial', 'gslider-blocks/base' ];
		$blocks_with_disabled                  = $controller->get_blocks_status();

		foreach ( $blocks_with_disabled as $block ) {
			if ( in_array( $block['slug'], [ 'testimonial', 'base' ], true ) ) {
				if ( false !== $block['enabled'] ) {
					fwrite( STDERR, "FAIL: Disabled block {$block['slug']} is not false\n" );
					exit( 1 );
				}
			} else {
				if ( true !== $block['enabled'] ) {
					fwrite( STDERR, "FAIL: Active block {$block['slug']} is not true\n" );
					exit( 1 );
				}
			}
		}
		echo "OK: Disabled block toggling functions correctly for both short and full slugs\n";
	}

	/**
	 * Test 7: System Metrics Payload.
	 *
	 * @return void
	 */
	public function test_system_metrics_payload(): void {
		$controller = DashboardController::getInstance();
		$system     = $controller->get_system_metrics();

		if ( ! isset( $system['php_version'] ) || PHP_VERSION !== $system['php_version'] ) {
			fwrite( STDERR, "FAIL: System metrics php_version mismatch\n" );
			exit( 1 );
		}
		echo "OK: System metrics contains accurate PHP_VERSION\n";

		if ( ! isset( $system['wp_version'] ) || '6.7.1' !== $system['wp_version'] ) {
			fwrite( STDERR, "FAIL: System metrics wp_version mismatch\n" );
			exit( 1 );
		}
		echo "OK: System metrics contains accurate WP version\n";

		if ( ! isset( $system['memory_limit'] ) || empty( $system['memory_limit'] ) ) {
			fwrite( STDERR, "FAIL: System metrics memory_limit missing\n" );
			exit( 1 );
		}
		echo "OK: System metrics contains valid memory_limit\n";
	}

	/**
	 * Test 8: Full Endpoint Response Payload Structure.
	 *
	 * @return void
	 */
	public function test_endpoint_response_payload_structure(): void {
		global $wp_transients, $wp_options;

		$controller                                  = DashboardController::getInstance();
		$request                                     = new WP_REST_Request();
		$wp_transients['gslider_slider_count_cache'] = 5;
		$wp_options['gslider_disabled_blocks']       = [];

		$response = $controller->get_item( $request );

		if ( ! ( $response instanceof WP_REST_Response ) ) {
			fwrite( STDERR, "FAIL: get_item did not return WP_REST_Response instance\n" );
			exit( 1 );
		}
		echo "OK: get_item returns WP_REST_Response instance\n";

		$data = $response->get_data();

		if ( 'success' !== $data['status'] ) {
			fwrite( STDERR, "FAIL: Response status is not success\n" );
			exit( 1 );
		}
		echo "OK: Response status is success\n";

		if ( GSLIDER_VERSION !== $data['version'] ) {
			fwrite( STDERR, "FAIL: Response version does not match GSLIDER_VERSION\n" );
			exit( 1 );
		}
		echo "OK: Response version matches GSLIDER_VERSION\n";

		if ( 5 !== $data['sliders_count'] ) {
			fwrite( STDERR, "FAIL: Response sliders_count does not match cached value\n" );
			exit( 1 );
		}
		echo "OK: Response sliders_count matches cached value\n";

		if ( ! is_array( $data['blocks'] ) || 6 !== count( $data['blocks'] ) ) {
			fwrite( STDERR, "FAIL: Response blocks array mismatch\n" );
			exit( 1 );
		}
		echo "OK: Response blocks has 6 block items\n";

		if ( ! is_array( $data['system'] ) || 3 !== count( $data['system'] ) ) {
			fwrite( STDERR, "FAIL: Response system array mismatch\n" );
			exit( 1 );
		}
		echo "OK: Response system has 3 metric fields\n";
	}

	/**
	 * Test 8b: Block toggling action and permissions (#319).
	 *
	 * @return void
	 */
	public function test_toggle_block_action(): void {
		global $current_caps, $wp_options;
		$controller = DashboardController::getInstance();

		// 1. Unauthorized toggle attempt fails.
		$current_caps = [];
		$request      = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request->set_param( 'slug', 'image-slider' );
		$request->set_param( 'enabled', false );

		$perm_result = $controller->get_item_permissions_check( $request );
		if ( ! ( $perm_result instanceof WP_Error ) ) {
			fwrite( STDERR, "FAIL: Unauthorized toggle-block did not return WP_Error\n" );
			exit( 1 );
		}
		echo "OK: Unauthorized toggle-block is rejected with WP_Error\n";

		// 2. Authorized toggle of single block (disable image-slider).
		$current_caps['manage_options'] = true;
		delete_option( 'gslider_disabled_blocks' );

		$response = $controller->toggle_block( $request );
		$data     = $response->get_data();

		if ( 'success' !== $data['status'] ) {
			fwrite( STDERR, "FAIL: toggle_block response status is not success\n" );
			exit( 1 );
		}
		if ( ! in_array( 'gslider-blocks/image-slider', $data['disabled_blocks'], true ) ) {
			fwrite( STDERR, "FAIL: image-slider was not added to disabled_blocks\n" );
			exit( 1 );
		}
		if ( ! in_array( 'gslider-blocks/image-slider', (array) get_option( 'gslider_disabled_blocks' ), true ) ) {
			fwrite( STDERR, "FAIL: get_option('gslider_disabled_blocks') did not persist disabled image-slider\n" );
			exit( 1 );
		}
		echo "OK: toggle_block disables single block\n";

		// 3. Re-enable block.
		$request_enable = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request_enable->set_param( 'slug', 'image-slider' );
		$request_enable->set_param( 'enabled', true );

		$response_enable = $controller->toggle_block( $request_enable );
		$data_enable     = $response_enable->get_data();
		if ( in_array( 'gslider-blocks/image-slider', $data_enable['disabled_blocks'], true ) ) {
			fwrite( STDERR, "FAIL: image-slider was not removed from disabled_blocks\n" );
			exit( 1 );
		}
		if ( in_array( 'gslider-blocks/image-slider', (array) get_option( 'gslider_disabled_blocks' ), true ) ) {
			fwrite( STDERR, "FAIL: get_option('gslider_disabled_blocks') still contains re-enabled image-slider\n" );
			exit( 1 );
		}
		echo "OK: toggle_block re-enables single block\n";

		// 4. Toggle flexi-content automatically handles flexi-content-item.
		$request_flexi = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request_flexi->set_param( 'slug', 'flexi-content' );
		$request_flexi->set_param( 'enabled', false );

		$response_flexi = $controller->toggle_block( $request_flexi );
		$data_flexi     = $response_flexi->get_data();
		if ( ! in_array( 'gslider-blocks/flexi-content-item', $data_flexi['disabled_blocks'], true ) ) {
			fwrite( STDERR, "FAIL: flexi-content-item was not automatically disabled with flexi-content\n" );
			exit( 1 );
		}
		if ( ! in_array( 'gslider-blocks/flexi-content-item', (array) get_option( 'gslider_disabled_blocks' ), true ) ) {
			fwrite( STDERR, "FAIL: get_option('gslider_disabled_blocks') does not contain cascaded flexi-content-item\n" );
			exit( 1 );
		}
		echo "OK: Disabling flexi-content also disables flexi-content-item child dependency\n";

		// 5. Toggle 'all' disables all blocks.
		$request_all_off = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request_all_off->set_param( 'slug', 'all' );
		$request_all_off->set_param( 'enabled', false );

		$response_all_off = $controller->toggle_block( $request_all_off );
		$data_all_off     = $response_all_off->get_data();
		$expected_all_disabled = [
			'gslider-blocks/base',
			'gslider-blocks/flexi-content',
			'gslider-blocks/flexi-content-item',
			'gslider-blocks/image-slider',
			'gslider-blocks/logo-carousel',
			'gslider-blocks/post-carousel',
			'gslider-blocks/testimonial',
		];
		if ( $expected_all_disabled !== $data_all_off['disabled_blocks'] ) {
			fwrite( STDERR, "FAIL: toggle 'all' off expected exact 7 disabled slugs, got: " . json_encode( $data_all_off['disabled_blocks'] ) . "\n" );
			exit( 1 );
		}
		if ( $expected_all_disabled !== get_option( 'gslider_disabled_blocks' ) ) {
			fwrite( STDERR, "FAIL: get_option('gslider_disabled_blocks') did not match expected all disabled slugs\n" );
			exit( 1 );
		}
		echo "OK: Toggling all off disables all blocks\n";

		// 6. Toggle 'all' enables all blocks.
		$request_all_on = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request_all_on->set_param( 'slug', 'all' );
		$request_all_on->set_param( 'enabled', true );

		$response_all_on = $controller->toggle_block( $request_all_on );
		$data_all_on     = $response_all_on->get_data();
		if ( ! empty( $data_all_on['disabled_blocks'] ) ) {
			fwrite( STDERR, "FAIL: toggle 'all' on did not empty disabled_blocks\n" );
			exit( 1 );
		}
		if ( ! empty( get_option( 'gslider_disabled_blocks' ) ) ) {
			fwrite( STDERR, "FAIL: get_option('gslider_disabled_blocks') is not empty after toggle all on\n" );
			exit( 1 );
		}
		echo "OK: Toggling all on enables all blocks\n";

		delete_option( 'gslider_disabled_blocks' );
	}

	/**
	 * Test 8c: Sequential toggles of different slugs both persist (#329).
	 *
	 * Sequential stand-in for the race the lock now serializes: each toggle
	 * re-reads the option inside the lock, so the second toggle builds on the
	 * first one's write instead of dropping it. Also verifies the lock is
	 * acquired before each write and released after every exit path.
	 *
	 * @return void
	 */
	public function test_toggle_block_sequential_updates_persist(): void {
		global $current_caps, $wp_options;
		$controller = DashboardController::getInstance();

		$current_caps['manage_options'] = true;
		$wp_options['gslider_disabled_blocks'] = [];
		$GLOBALS['wpdb']->query_log = [];

		// First request disables base (same unlocked read both requests used to share).
		$request_base = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request_base->set_param( 'slug', 'base' );
		$request_base->set_param( 'enabled', false );
		$response_base = $controller->toggle_block( $request_base );
		$data_base     = $response_base->get_data();

		if ( ! in_array( 'gslider-blocks/base', $data_base['disabled_blocks'], true ) ) {
			fwrite( STDERR, "FAIL: first toggle did not disable base, expected slug in: " . json_encode( $data_base['disabled_blocks'] ) . "\n" );
			exit( 1 );
		}

		// Second request disables testimonial; must still see base disabled.
		$request_testimonial = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request_testimonial->set_param( 'slug', 'testimonial' );
		$request_testimonial->set_param( 'enabled', false );
		$response_testimonial = $controller->toggle_block( $request_testimonial );
		$data_testimonial     = $response_testimonial->get_data();

		if ( ! in_array( 'gslider-blocks/base', $data_testimonial['disabled_blocks'], true ) ) {
			fwrite( STDERR, "FAIL: second toggle lost the first toggle's change, expected gslider-blocks/base in: " . json_encode( $data_testimonial['disabled_blocks'] ) . "\n" );
			exit( 1 );
		}
		if ( ! in_array( 'gslider-blocks/testimonial', $data_testimonial['disabled_blocks'], true ) ) {
			fwrite( STDERR, "FAIL: second toggle did not disable testimonial, expected slug in: " . json_encode( $data_testimonial['disabled_blocks'] ) . "\n" );
			exit( 1 );
		}
		if ( ! in_array( 'gslider-blocks/base', (array) get_option( 'gslider_disabled_blocks' ), true ) ) {
			fwrite( STDERR, "FAIL: persisted option lost the first toggle's change, expected gslider-blocks/base in: " . json_encode( get_option( 'gslider_disabled_blocks' ) ) . "\n" );
			exit( 1 );
		}

		// Each toggle acquires the lock before writing and releases after: the
		// query log for the second toggle must contain GET_LOCK and end with
		// RELEASE_LOCK.
		$query_log = $GLOBALS['wpdb']->query_log;
		$lock_queries = array_filter(
			(array) $query_log,
			static function ( $q ) {
				return (bool) preg_match( '/GET_LOCK|RELEASE_LOCK/i', (string) $q );
			}
		);
		$lock_sequence = array_values( $lock_queries );
		$lock_count = count( $lock_sequence );
		if ( $lock_count < 4 ) {
			fwrite( STDERR, "FAIL: expected at least 2 acquire/release lock pairs, got: " . $lock_count . "\n" );
			exit( 1 );
		}
		if ( 0 !== $lock_count % 2 || ! preg_match( '/GET_LOCK/i', $lock_sequence[ $lock_count - 2 ] ) || ! preg_match( '/RELEASE_LOCK/i', $lock_sequence[ $lock_count - 1 ] ) ) {
			fwrite( STDERR, "FAIL: toggle lock acquire/release did not alternate as pairs; log: " . json_encode( $lock_sequence ) . "\n" );
			exit( 1 );
		}

		echo "OK: Sequential toggles of two slugs both persist\n";

		$wp_options['gslider_disabled_blocks'] = [];
	}

	/**
	 * Test 8d: Toggle rejected when the lock is held elsewhere (#329).
	 *
	 * @return void
	 */
	public function test_toggle_block_lock_unavailable_rejects_without_writing(): void {
		global $current_caps, $wp_options, $gslider_mock_lock_available;
		$controller = DashboardController::getInstance();

		$current_caps['manage_options']    = true;
		$wp_options['gslider_disabled_blocks'] = [ 'gslider-blocks/testimonial' ];
		$gslider_mock_lock_available       = 0;

		$request = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request->set_param( 'slug', 'base' );
		$request->set_param( 'enabled', false );

		$response = $controller->toggle_block( $request );

		if ( ! ( $response instanceof WP_Error ) ) {
			fwrite( STDERR, "FAIL: lock-unavailable toggle did not return WP_Error, got: " . get_class( $response ) . "\n" );
			exit( 1 );
		}
		if ( 'gslider_toggle_busy' !== $response->get_error_code() ) {
			fwrite( STDERR, "FAIL: lock-unavailable error code is not gslider_toggle_busy, got: " . $response->get_error_code() . "\n" );
			exit( 1 );
		}
		$error_data = $response->get_error_data();
		if ( ! isset( $error_data['status'] ) || 409 !== $error_data['status'] ) {
			fwrite( STDERR, "FAIL: lock-unavailable error status is not 409, got: " . ( isset( $error_data['status'] ) ? $error_data['status'] : 'none' ) . "\n" );
			exit( 1 );
		}
		if ( [ 'gslider-blocks/testimonial' ] !== $wp_options['gslider_disabled_blocks'] ) {
			fwrite( STDERR, "FAIL: rejected toggle modified the disabled blocks option, expected: " . json_encode( [ 'gslider-blocks/testimonial' ] ) . ", got: " . json_encode( $wp_options['gslider_disabled_blocks'] ) . "\n" );
			exit( 1 );
		}

		echo "OK: Toggle with lock held elsewhere returns 409 and leaves option untouched\n";

		$gslider_mock_lock_available = null;
		$wp_options['gslider_disabled_blocks'] = [];
	}

	/**
	 * Test 8e: Toggle inside the lock reads the stored option, not a stale
	 * request-local cache (#329).
	 *
	 * get_option() serves the request's cached copy while this request waits
	 * on the lock, so the toggle must drop the cached copies first. Seeds a
	 * cached value that is older than the stored value and asserts the
	 * toggle builds on the newer stored value.
	 *
	 * @return void
	 */
	public function test_toggle_block_reads_fresh_option_after_stale_cache(): void {
		global $current_caps, $wp_options, $wp_option_cache;
		$controller = DashboardController::getInstance();

		$current_caps['manage_options'] = true;

		// Simulate the race: this request cached the option at bootstrap
		// (empty array), then a concurrent request disabled testimonial
		// and wrote it to the database while this request waited.
		$wp_options['gslider_disabled_blocks'] = [ 'gslider-blocks/testimonial' ];
		$wp_option_cache['alloptions']         = [ 'gslider_disabled_blocks' => [] ];

		$request = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request->set_param( 'slug', 'base' );
		$request->set_param( 'enabled', false );

		$response = $controller->toggle_block( $request );
		$data     = $response->get_data();

		$expected = [ 'gslider-blocks/testimonial', 'gslider-blocks/base' ];
		if ( $expected !== $data['disabled_blocks'] ) {
			fwrite( STDERR, "FAIL: stale-cache toggle lost a concurrent write, expected: " . json_encode( $expected ) . ", got: " . json_encode( $data['disabled_blocks'] ) . "\n" );
			exit( 1 );
		}
		if ( $expected !== $wp_options['gslider_disabled_blocks'] ) {
			fwrite( STDERR, "FAIL: persisted option lost a concurrent write, expected: " . json_encode( $expected ) . ", got: " . json_encode( $wp_options['gslider_disabled_blocks'] ) . "\n" );
			exit( 1 );
		}
		echo "OK: Toggle inside the lock sees the stored option, not the stale cache\n";

		unset( $wp_option_cache['alloptions'] );
		$wp_options['gslider_disabled_blocks'] = [];
	}

	/**
	 * Test 8f: Unsafe per-request fallback (GET_LOCK unsupported) lets one
	 * toggle through and rejects the next (#329).
	 *
	 * The fallback only serializes inside one PHP process and gives no
	 * cross-request guarantee; this pins the documented behavior: first
	 * call acquires the 'request' token, the second concurrent call within
	 * the same request gets 409, and release resets the flag.
	 *
	 * @return void
	 */
	public function test_toggle_block_unsupported_driver_fallback_is_guarded(): void {
		global $current_caps, $wp_options, $gslider_mock_lock_available;
		$controller = DashboardController::getInstance();

		$current_caps['manage_options']        = true;
		$wp_options['gslider_disabled_blocks'] = [];
		$gslider_mock_lock_available           = 'unsupported_driver';

		$request = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request->set_param( 'slug', 'base' );
		$request->set_param( 'enabled', false );

		// First toggle: fallback admits exactly one toggle per request.
		$response_first = $controller->toggle_block( $request );
		if ( ! ( $response_first instanceof WP_REST_Response ) ) {
			fwrite( STDERR, "FAIL: fallback toggle did not succeed, got: " . ( is_wp_error( $response_first ) ? $response_first->get_error_code() : get_class( $response_first ) ) . "\n" );
			exit( 1 );
		}
		if ( ! in_array( 'gslider-blocks/base', $response_first->get_data()['disabled_blocks'], true ) ) {
			fwrite( STDERR, "FAIL: fallback toggle did not disable base, got: " . json_encode( $response_first->get_data()['disabled_blocks'] ) . "\n" );
			exit( 1 );
		}
		echo "OK: Unsupported driver fallback admits the first toggle\n";

		// Second acquisition while the per-request guard is held: simulate
		// the overlapping call by acquiring the lock directly. The guard
		// must reject the nested acquisition with 409 instead of letting
		// both through.
		$acquire = new ReflectionMethod( $controller, 'acquire_toggle_lock' );
		if ( PHP_VERSION_ID < 80100 ) {
			$acquire->setAccessible( true );
		}
		$held_token = $acquire->invoke( $controller );
		if ( 'request' !== $held_token ) {
			fwrite( STDERR, "FAIL: fallback acquire returned token other than 'request', got: " . var_export( $held_token, true ) . "\n" );
			exit( 1 );
		}

		$request_second = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request_second->set_param( 'slug', 'testimonial' );
		$request_second->set_param( 'enabled', false );

		$response_second = $controller->toggle_block( $request_second );
		if ( ! ( $response_second instanceof WP_Error ) ) {
			fwrite( STDERR, "FAIL: guarded second toggle did not return WP_Error, got: " . get_class( $response_second ) . "\n" );
			exit( 1 );
		}
		if ( 'gslider_toggle_busy' !== $response_second->get_error_code() ) {
			fwrite( STDERR, "FAIL: guarded second toggle error code is not gslider_toggle_busy, got: " . $response_second->get_error_code() . "\n" );
			exit( 1 );
		}
		$second_error_data = $response_second->get_error_data();
		if ( ! isset( $second_error_data['status'] ) || 409 !== $second_error_data['status'] ) {
			fwrite( STDERR, "FAIL: guarded second toggle status is not 409, got: " . ( isset( $second_error_data['status'] ) ? $second_error_data['status'] : 'none' ) . "\n" );
			exit( 1 );
		}
		echo "OK: Second acquisition under held fallback guard is rejected with 409\n";

		// release_toggle_lock('request') resets the flag, so the next
		// acquisition is admitted again.
		$release = new ReflectionMethod( $controller, 'release_toggle_lock' );
		if ( PHP_VERSION_ID < 80100 ) {
			$release->setAccessible( true );
		}
		$release->invoke( $controller, $held_token );

		$token_after_release = $acquire->invoke( $controller );
		if ( 'request' !== $token_after_release ) {
			fwrite( STDERR, "FAIL: release_toggle_lock did not reset the fallback flag, got: " . var_export( $token_after_release, true ) . "\n" );
			exit( 1 );
		}
		echo "OK: release_toggle_lock resets the fallback guard flag\n";

		// Release the re-acquired token so the singleton's fallback flag is
		// clean for any later test in the same process.
		$release->invoke( $controller, $token_after_release );

		$gslider_mock_lock_available = null;
		$wp_options['gslider_disabled_blocks'] = [];
	}

	/**
	 * Test 8g: Invalid slug is rejected before the lock (#329 acceptance).
	 *
	 * @return void
	 */
	public function test_toggle_block_rejects_unknown_slug(): void {
		global $current_caps, $wp_options;
		$controller = DashboardController::getInstance();

		$current_caps['manage_options']        = true;
		$wp_options['gslider_disabled_blocks'] = [];

		$request = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request->set_param( 'slug', 'not-a-block' );
		$request->set_param( 'enabled', false );

		$response = $controller->toggle_block( $request );

		if ( ! ( $response instanceof WP_Error ) ) {
			fwrite( STDERR, "FAIL: invalid slug toggle did not return WP_Error, got: " . get_class( $response ) . "\n" );
			exit( 1 );
		}
		if ( 'gslider_toggle_invalid_slug' !== $response->get_error_code() ) {
			fwrite( STDERR, "FAIL: invalid slug error code is not gslider_toggle_invalid_slug, got: " . $response->get_error_code() . "\n" );
			exit( 1 );
		}
		$error_data = $response->get_error_data();
		if ( ! isset( $error_data['status'] ) || 400 !== $error_data['status'] ) {
			fwrite( STDERR, "FAIL: invalid slug status is not 400, got: " . ( isset( $error_data['status'] ) ? $error_data['status'] : 'none' ) . "\n" );
			exit( 1 );
		}
		if ( [] !== $wp_options['gslider_disabled_blocks'] ) {
			fwrite( STDERR, "FAIL: invalid slug toggle modified the option, got: " . json_encode( $wp_options['gslider_disabled_blocks'] ) . "\n" );
			exit( 1 );
		}
		echo "OK: Unknown slug returns 400 and leaves the option untouched\n";

		// flexi-content-item has no own row in get_blocks_status() but stays a valid slug.
		$request = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request->set_param( 'slug', 'flexi-content-item' );
		$request->set_param( 'enabled', false );

		$response = $controller->toggle_block( $request );

		if ( $response instanceof WP_Error ) {
			fwrite( STDERR, "FAIL: flexi-content-item toggle expected success, got WP_Error: " . $response->get_error_code() . "\n" );
			exit( 1 );
		}
		if ( ! in_array( 'gslider-blocks/flexi-content-item', $wp_options['gslider_disabled_blocks'], true ) ) {
			fwrite( STDERR, "FAIL: gslider-blocks/flexi-content-item expected in disabled blocks, got: " . json_encode( $wp_options['gslider_disabled_blocks'] ) . "\n" );
			exit( 1 );
		}
		echo "OK: flexi-content-item slug is still accepted\n";

		$wp_options['gslider_disabled_blocks'] = [];
	}

	/**
	 * Test 8h: Toggle 'all' under the lock disables every current block and
	 * the GET_LOCK/RELEASE_LOCK pair wraps the write (#329).
	 *
	 * @return void
	 */
	public function test_toggle_all_runs_inside_lock_pair(): void {
		global $current_caps, $wp_options;
		$controller = DashboardController::getInstance();

		$current_caps['manage_options']        = true;
		$wp_options['gslider_disabled_blocks'] = [];
		$GLOBALS['wpdb']->query_log            = [];

		$request = new WP_REST_Request( 'POST', '/gslider/v1/dashboard/toggle-block' );
		$request->set_param( 'slug', 'all' );
		$request->set_param( 'enabled', false );

		$response = $controller->toggle_block( $request );
		$data     = $response->get_data();

		$expected = [
			'gslider-blocks/base',
			'gslider-blocks/flexi-content',
			'gslider-blocks/flexi-content-item',
			'gslider-blocks/image-slider',
			'gslider-blocks/logo-carousel',
			'gslider-blocks/post-carousel',
			'gslider-blocks/testimonial',
		];
		if ( $expected !== $data['disabled_blocks'] ) {
			fwrite( STDERR, "FAIL: toggle 'all' under lock expected 7 slugs, got: " . json_encode( $data['disabled_blocks'] ) . "\n" );
			exit( 1 );
		}

		$lock_queries = array_values(
			array_filter(
				(array) $GLOBALS['wpdb']->query_log,
				static function ( $q ) {
					return (bool) preg_match( '/GET_LOCK|RELEASE_LOCK/i', (string) $q );
				}
			)
		);
		if ( 2 !== count( $lock_queries ) || ! preg_match( '/GET_LOCK/i', $lock_queries[0] ) || ! preg_match( '/RELEASE_LOCK/i', $lock_queries[1] ) ) {
			fwrite( STDERR, "FAIL: toggle 'all' lock pair malformed, log: " . json_encode( $lock_queries ) . "\n" );
			exit( 1 );
		}
		echo "OK: Toggle 'all' persists all slugs inside one lock pair\n";

		$wp_options['gslider_disabled_blocks'] = [];
	}

	/**
	 * Test 9: REST Schema Definition.
	 *
	 * @return void
	 */
	public function test_rest_schema_definition(): void {
		$controller = DashboardController::getInstance();
		$schema     = $controller->get_item_schema();

		if ( 'gslider_dashboard' !== $schema['title'] ) {
			fwrite( STDERR, "FAIL: Schema title is not gslider_dashboard\n" );
			exit( 1 );
		}
		echo "OK: Schema title is gslider_dashboard\n";

		if ( 'object' !== $schema['type'] ) {
			fwrite( STDERR, "FAIL: Schema type is not object\n" );
			exit( 1 );
		}
		echo "OK: Schema type is object\n";

		$required_props = [ 'status', 'version', 'sliders_count', 'blocks', 'system' ];
		foreach ( $required_props as $prop ) {
			if ( ! isset( $schema['properties'][ $prop ] ) ) {
				fwrite( STDERR, "FAIL: Schema missing property {$prop}\n" );
				exit( 1 );
			}
		}
		echo "OK: Schema defines all required dashboard response properties\n";
	}

	/**
	 * Test 10: Plugin Service Registration.
	 *
	 * @return void
	 */
	public function test_plugin_service_registration(): void {
		$plugin_reflection = new ReflectionClass( Plugin::class );
		$services_property = $plugin_reflection->getProperty( 'services' );

		if ( PHP_VERSION_ID < 80100 ) {
			$services_property->setAccessible( true );
		}

		$plugin_instance = Plugin::getInstance();
		$services_list   = $services_property->getValue( $plugin_instance );

		if ( ! in_array( DashboardController::class, $services_list, true ) ) {
			fwrite( STDERR, "FAIL: Plugin::\$services array does not contain DashboardController::class\n" );
			exit( 1 );
		}
		echo "OK: Plugin::\$services array contains DashboardController::class\n";
	}
}

// Standalone execution entry point.
( new DashboardControllerTest() )->run_all_tests();
