<?php
/**
 * Unit tests for GSlider\RestApi\BlocksController.
 *
 * Verifies that:
 * 1. BlocksController implements Registrable and SingletonTrait contracts.
 * 2. REST route /wp-json/gslider/v1/blocks/<id> is registered with proper schema and handlers.
 * 3. gslider_blocks REST field is registered across supported post types with schema parity.
 * 4. Permission checks strictly guard password-protected posts, drafts, and non-public post types.
 * 5. get_item() and get_gslider_blocks_field() extract normalized slide payloads.
 *
 * @package GSlider\Tests\RestApi
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

use GSlider\RestApi\BlocksController;
use GSlider\Interfaces\Registrable;

/**
 * Test class for BlocksController.
 */
class BlocksControllerTest {

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		$this->test_class_implements_registrable_and_singleton();
		$this->test_register_hooks();
		$this->test_register_routes();
		$this->test_register_rest_fields_and_schema();
		$this->test_get_item_permissions_check_password_protected_post();
		$this->test_get_item_permissions_check_draft_and_non_public_post_types();
		$this->test_get_item_permissions_check_missing_post();
		$this->test_get_item_returns_blocks_payload();
		$this->test_get_gslider_blocks_field_returns_empty_when_missing_or_locked();

		echo "\nAll 9 BlocksController REST API tests passed successfully!\n";
	}

	/**
	 * Helper to assert boolean condition strictly.
	 *
	 * @param bool   $condition Condition to check.
	 * @param string $message   Failure message.
	 * @return void
	 */
	private function assert_true( bool $condition, string $message ): void {
		if ( ! $condition ) {
			fwrite( STDERR, "FAIL: {$message}\n" );
			exit( 1 );
		}
		echo esc_html( "OK: {$message}\n" );
	}

	/**
	 * Creates a mock WP_Post object for testing.
	 *
	 * @param int    $id       Post ID.
	 * @param string $status   Post status.
	 * @param string $type     Post type.
	 * @param string $password Post password.
	 * @param string $content  Post content.
	 * @return WP_Post
	 */
	private function create_mock_post( int $id, string $status, string $type, string $password = '', string $content = '' ): WP_Post {
		$post                = new WP_Post();
		$post->ID            = $id;
		$post->post_status   = $status;
		$post->post_type     = $type;
		$post->post_password = $password;
		$post->post_title    = 'Slider post ' . $id;
		$post->post_content  = $content;
		return $post;
	}

	/**
	 * Test 1: Verify BlocksController implements Registrable interface and Singleton pattern.
	 *
	 * @return void
	 */
	public function test_class_implements_registrable_and_singleton(): void {
		$controller = BlocksController::getInstance();

		$this->assert_true( $controller instanceof Registrable, 'BlocksController implements Registrable interface' );
		$this->assert_true( $controller instanceof WP_REST_Controller, 'BlocksController extends WP_REST_Controller' );
		$this->assert_true( $controller === BlocksController::getInstance(), 'BlocksController maintains singleton instance identity' );
	}

	/**
	 * Test 2: Verify register() hooks into rest_api_init.
	 *
	 * @return void
	 */
	public function test_register_hooks(): void {
		global $wp_actions;

		$controller = BlocksController::getInstance();
		$controller->register();

		$hooked = false;
		if ( isset( $wp_actions['rest_api_init'] ) ) {
			foreach ( $wp_actions['rest_api_init'] as $action ) {
				if ( [ $controller, 'register_routes' ] === $action['callback'] ) {
					$hooked = true;
					break;
				}
			}
		}

		$this->assert_true( $hooked, 'BlocksController::register() hooks register_routes into rest_api_init' );
	}

	/**
	 * Test 3: Verify register_routes() registers /gslider/v1/blocks/<id>.
	 *
	 * @return void
	 */
	public function test_register_routes(): void {
		global $wp_rest_routes;

		$controller = BlocksController::getInstance();
		$controller->register_routes();

		$route_key = '/blocks/(?P<id>[\d]+)';
		$this->assert_true( isset( $wp_rest_routes['gslider/v1'][$route_key] ), 'Route /gslider/v1/blocks/<id> is registered' );

		$route_data = $wp_rest_routes['gslider/v1'][$route_key][0];
		$this->assert_true( 'GET' === $route_data['methods'], 'Endpoint method is GET' );
		$this->assert_true( is_callable( $route_data['callback'] ), 'Endpoint callback is callable' );
		$this->assert_true( is_callable( $route_data['permission_callback'] ), 'Endpoint permission_callback is callable' );
	}

	/**
	 * Test 4: Verify register_rest_fields() and get_gslider_blocks_schema().
	 *
	 * @return void
	 */
	public function test_register_rest_fields_and_schema(): void {
		global $registered_rest_fields, $wp_filters;

		// Add custom post type via filter.
		add_filter(
			'gslider_rest_field_post_types',
			static function ( $types ) {
				$types[] = 'product';
				return $types;
			}
		);

		$controller = BlocksController::getInstance();
		$controller->register_rest_fields();

		$this->assert_true( ! empty( $registered_rest_fields ), 'gslider_blocks REST field registered' );
		$latest = end( $registered_rest_fields );

		$this->assert_true( [ 'post', 'page', 'product' ] === $latest['object_type'], 'gslider_rest_field_post_types filter adds post types' );
		$this->assert_true( 'gslider_blocks' === $latest['attribute'], 'REST field name is gslider_blocks' );
		$this->assert_true( is_callable( $latest['args']['get_callback'] ), 'get_callback is callable' );

		$schema = $latest['args']['schema'];
		$this->assert_true( is_array( $schema ), 'Schema is an array' );
		$this->assert_true( 'array' === $schema['type'], 'Field schema type is array' );
		$this->assert_true( true === $schema['readonly'], 'Field schema is readonly' );

		$expected_props = [ 'blockId', 'blockName', 'sliderType', 'totalSlides', 'swiperConfig', 'css', 'slides', 'attrs' ];
		$actual_props   = array_keys( $schema['items']['properties'] );
		$this->assert_true( $expected_props === $actual_props, 'Schema properties match expected specification' );

		$route_schema = $controller->get_item_schema();
		$this->assert_true( $route_schema['properties']['blocks'] === $schema, 'Route schema blocks property matches get_gslider_blocks_schema()' );
	}

	/**
	 * Test 5: Permission check denies password-protected posts without credentials.
	 *
	 * @return void
	 */
	public function test_get_item_permissions_check_password_protected_post(): void {
		global $wp_mock_posts, $password_clear;

		$controller = BlocksController::getInstance();

		// Post with password, unauthenticated.
		$wp_mock_posts[10] = $this->create_mock_post( 10, 'publish', 'post', 'secret123' );
		$request           = new WP_REST_Request( [ 'id' => 10 ] );

		$result = $controller->get_item_permissions_check( $request );
		$this->assert_true( $result instanceof WP_Error, 'Password-protected published post is denied without password' );
		$this->assert_true( 'rest_cannot_read_post' === $result->code, 'Password denial returns rest_cannot_read_post code' );
		$this->assert_true( 404 !== ( $result->data['status'] ?? null ), 'Password denial is not a 404 status' );

		$field_result = $controller->get_gslider_blocks_field( [ 'id' => 10 ] );
		$this->assert_true( [] === $field_result, 'Password-protected post field returns empty array' );

		// Now simulate correct password unlock.
		$password_clear[10] = true;
		$allowed            = $controller->get_item_permissions_check( $request );
		$this->assert_true( true === $allowed, 'Correct password allows reading published post' );
	}

	/**
	 * Test 6: Permission checks for draft and non-public post types.
	 *
	 * @return void
	 */
	public function test_get_item_permissions_check_draft_and_non_public_post_types(): void {
		global $wp_mock_posts, $can_read;

		$controller = BlocksController::getInstance();

		// Public published post.
		$wp_mock_posts[11] = $this->create_mock_post( 11, 'publish', 'post' );
		$result            = $controller->get_item_permissions_check( new WP_REST_Request( [ 'id' => 11 ] ) );
		$this->assert_true( true === $result, 'Published public post without password is readable by guests' );

		// Draft post without read_post capability.
		$wp_mock_posts[12] = $this->create_mock_post( 12, 'draft', 'post' );
		$denied_draft      = $controller->get_item_permissions_check( new WP_REST_Request( [ 'id' => 12 ] ) );
		$this->assert_true( $denied_draft instanceof WP_Error && 'rest_cannot_read_post' === $denied_draft->code, 'Draft post without read_post capability is denied' );

		// Draft post with read_post capability.
		$can_read[12]  = true;
		$allowed_draft = $controller->get_item_permissions_check( new WP_REST_Request( [ 'id' => 12 ] ) );
		$this->assert_true( true === $allowed_draft, 'Draft post with read_post capability is allowed' );

		// Non-public post type without capability.
		$wp_mock_posts[13] = $this->create_mock_post( 13, 'publish', 'internal_note' );
		$denied_internal   = $controller->get_item_permissions_check( new WP_REST_Request( [ 'id' => 13 ] ) );
		$this->assert_true( $denied_internal instanceof WP_Error && 'rest_cannot_read_post' === $denied_internal->code, 'Non-public post type is denied to guests' );

		// Non-public post type with capability.
		$can_read[13]    = true;
		$allowed_internal = $controller->get_item_permissions_check( new WP_REST_Request( [ 'id' => 13 ] ) );
		$this->assert_true( true === $allowed_internal, 'Non-public post type is allowed when user has read_post' );
	}

	/**
	 * Test 7: Permission check on non-existent post returns 404 WP_Error.
	 *
	 * @return void
	 */
	public function test_get_item_permissions_check_missing_post(): void {
		$controller = BlocksController::getInstance();
		$result     = $controller->get_item_permissions_check( new WP_REST_Request( [ 'id' => 99 ] ) );

		$this->assert_true( $result instanceof WP_Error, 'Non-existent post returns WP_Error' );
		$this->assert_true( 404 === ( $result->data['status'] ?? null ), 'Non-existent post returns 404 status' );
	}

	/**
	 * Test 8: get_item() returns structured payload for valid post.
	 *
	 * @return void
	 */
	public function test_get_item_returns_blocks_payload(): void {
		global $wp_mock_posts;

		$controller        = BlocksController::getInstance();
		$wp_mock_posts[14] = $this->create_mock_post( 14, 'publish', 'post', '', '<!-- wp:gslider-blocks/image-slider {"blockId":"slider-14"} /-->' );

		$response = $controller->get_item( new WP_REST_Request( [ 'id' => 14 ] ) );
		$this->assert_true( $response instanceof WP_REST_Response, 'get_item() returns WP_REST_Response' );

		$data = $response->get_data();
		$this->assert_true( 14 === $data['post_id'], 'Response post_id matches request' );
		$this->assert_true( isset( $data['blocks'] ) && is_array( $data['blocks'] ), 'Response contains blocks array' );
	}

	/**
	 * Test 9: get_gslider_blocks_field() handles missing post IDs and locked content gracefully.
	 *
	 * @return void
	 */
	public function test_get_gslider_blocks_field_returns_empty_when_missing_or_locked(): void {
		$controller = BlocksController::getInstance();

		$empty_id = $controller->get_gslider_blocks_field( [ 'id' => 0 ] );
		$this->assert_true( [] === $empty_id, 'Missing or zero post ID returns empty array' );

		$missing_post = $controller->get_gslider_blocks_field( [ 'id' => 99 ] );
		$this->assert_true( [] === $missing_post, 'Non-existent post returns empty array' );
	}
}

// Standalone execution entry point.
( new BlocksControllerTest() )->run_all_tests();
