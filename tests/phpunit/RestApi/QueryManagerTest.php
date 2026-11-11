<?php
/**
 * Unit tests for GSlider\RestApi\QueryManager.
 *
 * Verifies that:
 * 1. QueryManager implements Registrable and SingletonTrait, and exists via QueryManager::class.
 * 2. register() and register_filters() hook REST collection params and query filters cleanly.
 * 3. Unauthenticated callers lacking 'edit_posts' cannot inject meta_query or expose meta_value ordering.
 * 4. Authorized callers with 'edit_posts' append clauses on public meta keys while preserving pre-existing meta_query entries.
 * 5. Protected meta keys (_sku, _thumbnail_id, and custom protected keys) are rejected even for authorized users, restoring orderby.
 * 6. meta_compare is normalized to uppercase against the allowlist, EXISTS/NOT EXISTS omit value, invalid operators fall back to '=', and '0' meta_value is preserved.
 *
 * @package GSlider\Tests\RestApi
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

if ( ! function_exists( 'is_protected_meta' ) ) {
	/**
	 * Stub for WordPress is_protected_meta().
	 *
	 * @param string      $meta_key  Metadata key.
	 * @param string|null $meta_type Metadata object type.
	 * @return bool
	 */
	function is_protected_meta( $meta_key, $meta_type = null ) {
		global $gslider_protected_meta_keys;
		$key = (string) $meta_key;
		if ( isset( $gslider_protected_meta_keys ) && is_array( $gslider_protected_meta_keys ) && in_array( $key, $gslider_protected_meta_keys, true ) ) {
			return true;
		}
		return '_' === substr( $key, 0, 1 );
	}
}

if ( ! function_exists( 'get_post_types' ) ) {
	/**
	 * Stub for WordPress get_post_types().
	 *
	 * @param array  $args   Query arguments.
	 * @param string $output Output format ('names' or 'objects').
	 * @return array
	 */
	function get_post_types( $args = [], $output = 'names' ) {
		return [
			'post' => 'post',
			'page' => 'page',
		];
	}
}

set_error_handler(
	static function ( $severity, $message, $file, $line ) {
		if ( ! ( error_reporting() & $severity ) ) {
			return false;
		}
		fwrite( STDERR, "FAIL: PHP warning {$message} in {$file}:{$line}\n" );
		exit( 1 );
	}
);

require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/RestApi/QueryManager.php';

use GSlider\Interfaces\Registrable;
use GSlider\RestApi\QueryManager;

/**
 * Test class for GSlider\RestApi\QueryManager.
 *
 * @package GSlider\Tests\RestApi
 */
class QueryManagerTest {

	/**
	 * Helper assertion for strict boolean conditions.
	 *
	 * @param bool   $condition Evaluated boolean condition.
	 * @param string $message   Assertion message.
	 * @return void
	 */
	public function assert_true( bool $condition, string $message ): void {
		if ( true !== $condition ) {
			fwrite( STDERR, "FAIL: {$message}\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Helper assertion for strict identical comparisons.
	 *
	 * @param mixed  $expected Expected value.
	 * @param mixed  $actual   Actual value.
	 * @param string $message  Assertion message.
	 * @return void
	 */
	public function assert_same( $expected, $actual, string $message ): void {
		if ( $expected !== $actual ) {
			fwrite( STDERR, "FAIL: {$message} (Expected: " . var_export( $expected, true ) . ', Got: ' . var_export( $actual, true ) . ")\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Resets global test state between test cases.
	 *
	 * @return void
	 */
	private function reset_state(): void {
		global $current_caps, $gslider_protected_meta_keys;
		$current_caps                = [];
		$gslider_protected_meta_keys = [];
	}

	/**
	 * Runs all QueryManager unit tests.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider QueryManager Unit Tests ===\n\n";

		$this->test_class_exists_implements_registrable_and_singleton();
		$this->test_register_hooks_and_collection_params();
		$this->test_unauthenticated_caller_denied_meta_query_and_meta_orderby();
		$this->test_authorized_caller_appends_meta_query_preserving_existing();
		$this->test_protected_meta_keys_rejected_even_when_authorized();
		$this->test_meta_compare_normalization_and_meta_value_edge_cases();

		echo "\nAll QueryManager unit tests passed successfully!\n";
	}

	/**
	 * Test 1: QueryManager class exists via ::class, implements Registrable, and uses SingletonTrait.
	 *
	 * @return void
	 */
	public function test_class_exists_implements_registrable_and_singleton(): void {
		$this->reset_state();

		$this->assert_true( class_exists( QueryManager::class, false ), 'QueryManager class exists via QueryManager::class' );

		$manager = QueryManager::getInstance();
		$this->assert_true( $manager instanceof Registrable, 'QueryManager implements Registrable interface' );
		$this->assert_true( $manager === QueryManager::getInstance(), 'QueryManager getInstance() returns the same singleton instance' );
	}

	/**
	 * Test 2: register() and register_filters() wire REST collection params and query filters.
	 *
	 * @return void
	 */
	public function test_register_hooks_and_collection_params(): void {
		global $wp_actions, $wp_filters;
		$this->reset_state();

		$wp_actions = [];
		$wp_filters = [];
		$manager    = QueryManager::getInstance();
		$manager->register();

		$init_hooks = $wp_actions['init'] ?? [];
		$found_init = false;
		foreach ( $init_hooks as $hook ) {
			if ( [ $manager, 'register_filters' ] === $hook['callback'] && 20 === $hook['priority'] ) {
				$found_init = true;
				break;
			}
		}
		$this->assert_true( $found_init, 'register() hooks register_filters onto init at priority 20' );

		$manager->register_filters();
		foreach ( [ 'post', 'page' ] as $post_type ) {
			$param_callbacks = array_column( $wp_filters[ "rest_{$post_type}_collection_params" ] ?? [], 'callback' );
			$query_callbacks = array_column( $wp_filters[ "rest_{$post_type}_query" ] ?? [], 'callback' );

			$this->assert_true( in_array( [ $manager, 'add_custom_query_params' ], $param_callbacks, true ), "register_filters() hooks rest_{$post_type}_collection_params" );
			$this->assert_true( in_array( [ $manager, 'apply_custom_query_params' ], $query_callbacks, true ), "register_filters() hooks rest_{$post_type}_query" );
		}

		$params = $manager->add_custom_query_params( [ 'orderby' => [ 'enum' => [ 'date' ] ] ] );
		$this->assert_same(
			[ 'date', 'rand', 'comment_count', 'meta_value', 'meta_value_num', 'menu_order' ],
			$params['orderby']['enum'],
			'add_custom_query_params() appends supported orderby enum values'
		);
		$this->assert_true( isset( $params['meta_key'], $params['meta_value'], $params['meta_compare'] ), 'add_custom_query_params() registers meta_key, meta_value, and meta_compare params' );
	}

	/**
	 * Test 3: Unauthenticated users cannot add meta_query or order by meta_value/meta_value_num.
	 *
	 * @return void
	 */
	public function test_unauthenticated_caller_denied_meta_query_and_meta_orderby(): void {
		$this->reset_state();
		$manager = QueryManager::getInstance();

		// Case A: Explicit original orderby is preserved; meta_query is not added.
		$request = new WP_REST_Request(
			[
				'orderby'    => 'meta_value',
				'meta_key'   => 'featured_order',
				'meta_value' => '1',
			]
		);
		$result  = $manager->apply_custom_query_params( [ 'orderby' => 'date' ], $request );
		$this->assert_same( 'date', $result['orderby'] ?? null, 'Unauthenticated caller with meta_key and orderby=meta_value retains previous orderby' );
		$this->assert_true( ! isset( $result['meta_query'] ), 'Unauthenticated caller gets no meta_query added' );

		// Case B: Missing original orderby stays unset for orderby=meta_value_num.
		$num_request = new WP_REST_Request(
			[
				'orderby'    => 'meta_value_num',
				'meta_key'   => 'sort_weight',
				'meta_value' => '10',
			]
		);
		$num_result  = $manager->apply_custom_query_params( [], $num_request );
		$this->assert_true( ! array_key_exists( 'orderby', $num_result ), 'Unauthenticated caller with no prior orderby does not receive orderby=meta_value_num' );
		$this->assert_true( ! isset( $num_result['meta_query'] ), 'Unauthenticated caller with meta_value_num gets no meta_query added' );

		// Case C: Pre-existing meta_query is preserved untouched when unauthenticated caller sends meta_key.
		$existing_meta = [
			[
				'key'   => 'internal_flag',
				'value' => '1',
			],
		];
		$preserved     = $manager->apply_custom_query_params(
			[
				'orderby'    => 'title',
				'meta_query' => $existing_meta,
			],
			$request
		);
		$this->assert_same( 'title', $preserved['orderby'], 'Unauthenticated caller does not alter existing orderby' );
		$this->assert_same( $existing_meta, $preserved['meta_query'], 'Unauthenticated caller leaves pre-existing meta_query untouched' );

		// Case D: Pre-populated meta_value / meta_value_num in $args falls back to 'date' for unauthorized callers.
		$prep_value_result = $manager->apply_custom_query_params( [ 'orderby' => 'meta_value' ], $request );
		$this->assert_same( 'date', $prep_value_result['orderby'] ?? null, 'Unauthenticated caller with pre-populated orderby=meta_value falls back to date' );
		$this->assert_true( ! in_array( $prep_value_result['orderby'] ?? null, [ 'meta_value', 'meta_value_num' ], true ), 'Pre-populated orderby=meta_value does not remain meta ordering' );
		$this->assert_true( ! isset( $prep_value_result['meta_query'] ), 'Unauthenticated caller with pre-populated orderby=meta_value gets no meta_query added' );

		$prep_num_result = $manager->apply_custom_query_params( [ 'orderby' => 'meta_value_num' ], $num_request );
		$this->assert_same( 'date', $prep_num_result['orderby'] ?? null, 'Unauthenticated caller with pre-populated orderby=meta_value_num falls back to date' );
		$this->assert_true( ! isset( $prep_num_result['meta_query'] ), 'Unauthenticated caller with pre-populated orderby=meta_value_num gets no meta_query added' );

		$prep_only_result = $manager->apply_custom_query_params( [ 'orderby' => 'meta_value' ], new WP_REST_Request( [] ) );
		$this->assert_same( 'date', $prep_only_result['orderby'] ?? null, 'Pre-populated orderby=meta_value without request meta_key falls back to date for unauthorized caller' );

		// Case E: Non-meta orderby (rand) remains permitted even if meta_key is rejected.
		$rand_request = new WP_REST_Request(
			[
				'orderby'  => 'rand',
				'meta_key' => 'featured_order',
			]
		);
		$rand_result  = $manager->apply_custom_query_params( [ 'orderby' => 'date' ], $rand_request );
		$this->assert_same( 'rand', $rand_result['orderby'], 'Non-meta orderby=rand remains allowed for unauthenticated caller' );
		$this->assert_true( ! isset( $rand_result['meta_query'] ), 'Unauthenticated caller with orderby=rand still gets no meta_query added' );

		// Case F: Request orderby=rand overrides pre-populated meta_value even when meta_key is rejected.
		$rand_override_result = $manager->apply_custom_query_params( [ 'orderby' => 'meta_value' ], $rand_request );
		$this->assert_same( 'rand', $rand_override_result['orderby'], 'Allowed non-meta orderby=rand is not reverted to date when meta_key is rejected' );
	}

	/**
	 * Test 4: Authorized callers with edit_posts append public meta clauses and preserve pre-existing meta_query.
	 *
	 * @return void
	 */
	public function test_authorized_caller_appends_meta_query_preserving_existing(): void {
		global $current_caps;
		$this->reset_state();
		$current_caps['edit_posts'] = true;

		$manager = QueryManager::getInstance();

		$existing_clause = [
			'key'     => 'visibility',
			'compare' => '=',
			'value'   => 'public',
		];

		$request = new WP_REST_Request(
			[
				'orderby'      => 'meta_value',
				'meta_key'     => 'featured_rank',
				'meta_value'   => '5',
				'meta_compare' => '>=',
			]
		);

		$result = $manager->apply_custom_query_params(
			[
				'orderby'    => 'date',
				'meta_query' => [ $existing_clause ],
			],
			$request
		);

		$this->assert_same( 'meta_value', $result['orderby'] ?? null, 'Authorized caller can set orderby=meta_value with valid public meta_key' );
		$this->assert_same(
			[
				$existing_clause,
				[
					'key'     => 'featured_rank',
					'compare' => '>=',
					'value'   => '5',
				],
			],
			$result['meta_query'] ?? null,
			'Authorized caller appends meta clause while preserving pre-existing meta_query'
		);

		// Missing meta_key with orderby=meta_value does not override orderby even when authorized.
		$missing_key_request = new WP_REST_Request(
			[
				'orderby' => 'meta_value',
			]
		);
		$missing_key_result  = $manager->apply_custom_query_params( [ 'orderby' => 'date' ], $missing_key_request );
		$this->assert_same( 'date', $missing_key_result['orderby'] ?? null, 'Authorized caller with orderby=meta_value and missing meta_key keeps original orderby' );

		$prep_missing_key_result = $manager->apply_custom_query_params( [ 'orderby' => 'meta_value' ], $missing_key_request );
		$this->assert_same( 'date', $prep_missing_key_result['orderby'] ?? null, 'Authorized caller with pre-populated orderby=meta_value and missing meta_key falls back to date' );
	}

	/**
	 * Test 5: Protected meta keys are rejected even for users with edit_posts, and orderby is restored.
	 *
	 * @return void
	 */
	public function test_protected_meta_keys_rejected_even_when_authorized(): void {
		global $current_caps, $gslider_protected_meta_keys;
		$this->reset_state();
		$current_caps['edit_posts']  = true;
		$gslider_protected_meta_keys = [ 'custom_secret_meta' ];

		$manager = QueryManager::getInstance();

		foreach ( [ '_sku', '_thumbnail_id', 'custom_secret_meta' ] as $protected_key ) {
			// With pre-existing orderby and meta_query.
			$existing = [ [ 'key' => 'public_tag', 'value' => 'news' ] ];
			$request  = new WP_REST_Request(
				[
					'orderby'    => 'meta_value',
					'meta_key'   => $protected_key,
					'meta_value' => 'secret',
				]
			);
			$result   = $manager->apply_custom_query_params(
				[
					'orderby'    => 'date',
					'meta_query' => $existing,
				],
				$request
			);

			$this->assert_same( 'date', $result['orderby'] ?? null, "Protected key '{$protected_key}' restores previous orderby" );
			$this->assert_same( $existing, $result['meta_query'] ?? null, "Protected key '{$protected_key}' leaves pre-existing meta_query untouched" );

			// With pre-existing orderby=meta_value, falls back to 'date'.
			$prep_protected_result = $manager->apply_custom_query_params( [ 'orderby' => 'meta_value' ], $request );
			$this->assert_same( 'date', $prep_protected_result['orderby'] ?? null, "Protected key '{$protected_key}' with pre-populated orderby=meta_value falls back to date" );
			$this->assert_true( ! in_array( $prep_protected_result['orderby'] ?? null, [ 'meta_value', 'meta_value_num' ], true ), "Protected key '{$protected_key}' does not preserve meta ordering" );

			// Without pre-existing orderby (original was null).
			$no_orderby_request = new WP_REST_Request(
				[
					'orderby'  => 'meta_value_num',
					'meta_key' => $protected_key,
				]
			);
			$no_orderby_result  = $manager->apply_custom_query_params( [], $no_orderby_request );
			$this->assert_true( ! array_key_exists( 'orderby', $no_orderby_result ), "Protected key '{$protected_key}' unsets orderby when none existed originally" );
			$this->assert_true( ! isset( $no_orderby_result['meta_query'] ), "Protected key '{$protected_key}' adds no meta_query" );
		}

		// Whitespace-only meta_key sanitizes to empty and restores orderby.
		$blank_request = new WP_REST_Request(
			[
				'orderby'  => 'meta_value',
				'meta_key' => '   ',
			]
		);
		$blank_result  = $manager->apply_custom_query_params( [ 'orderby' => 'title' ], $blank_request );
		$this->assert_same( 'title', $blank_result['orderby'] ?? null, 'Whitespace-only meta_key restores previous orderby' );
		$this->assert_true( ! isset( $blank_result['meta_query'] ), 'Whitespace-only meta_key adds no meta_query' );
	}

	/**
	 * Test 6: meta_compare allowlist normalization, EXISTS/NOT EXISTS value omission, and '0' meta_value preservation.
	 *
	 * @return void
	 */
	public function test_meta_compare_normalization_and_meta_value_edge_cases(): void {
		global $current_caps;
		$this->reset_state();
		$current_caps['edit_posts'] = true;

		$manager = QueryManager::getInstance();

		// Lowercase 'like' is uppercased.
		$like_result = $manager->apply_custom_query_params(
			[],
			new WP_REST_Request(
				[
					'meta_key'     => 'subtitle',
					'meta_value'   => 'slider',
					'meta_compare' => 'like',
				]
			)
		);
		$this->assert_same(
			[
				[
					'key'     => 'subtitle',
					'compare' => 'LIKE',
					'value'   => 'slider',
				],
			],
			$like_result['meta_query'] ?? null,
			"Lowercase 'like' is normalized to 'LIKE' with value preserved"
		);

		// Lowercase 'not exists' is uppercased and omits 'value'.
		$not_exists_result = $manager->apply_custom_query_params(
			[],
			new WP_REST_Request(
				[
					'meta_key'     => 'subtitle',
					'meta_value'   => 'should_be_omitted',
					'meta_compare' => 'not exists',
				]
			)
		);
		$this->assert_same(
			[
				[
					'key'     => 'subtitle',
					'compare' => 'NOT EXISTS',
				],
			],
			$not_exists_result['meta_query'] ?? null,
			"Lowercase 'not exists' is normalized to 'NOT EXISTS' and omits value"
		);
		$this->assert_true( ! array_key_exists( 'value', $not_exists_result['meta_query'][0] ), "'NOT EXISTS' clause omits 'value' key completely" );

		// Lowercase 'exists' is uppercased and omits 'value'.
		$exists_result = $manager->apply_custom_query_params(
			[],
			new WP_REST_Request(
				[
					'meta_key'     => 'subtitle',
					'meta_value'   => 'ignored',
					'meta_compare' => 'exists',
				]
			)
		);
		$this->assert_same(
			[
				[
					'key'     => 'subtitle',
					'compare' => 'EXISTS',
				],
			],
			$exists_result['meta_query'] ?? null,
			"Lowercase 'exists' is normalized to 'EXISTS' and omits value"
		);

		// Invalid operator falls back to '='.
		$invalid_result = $manager->apply_custom_query_params(
			[],
			new WP_REST_Request(
				[
					'meta_key'     => 'subtitle',
					'meta_value'   => 'abc',
					'meta_compare' => 'INVALID_OP',
				]
			)
		);
		$this->assert_same(
			[
				[
					'key'     => 'subtitle',
					'compare' => '=',
					'value'   => 'abc',
				],
			],
			$invalid_result['meta_query'] ?? null,
			"Invalid compare operator 'INVALID_OP' falls back to '='"
		);

		// '0' meta_value is preserved cleanly.
		$zero_result = $manager->apply_custom_query_params(
			[],
			new WP_REST_Request(
				[
					'meta_key'     => 'stock_count',
					'meta_value'   => '0',
					'meta_compare' => '=',
				]
			)
		);
		$this->assert_same(
			[
				[
					'key'     => 'stock_count',
					'compare' => '=',
					'value'   => '0',
				],
			],
			$zero_result['meta_query'] ?? null,
			"Zero string '0' meta_value is preserved"
		);

		// Omitted meta_value (null) omits 'value' key.
		$null_value_result = $manager->apply_custom_query_params(
			[],
			new WP_REST_Request(
				[
					'meta_key' => 'subtitle',
				]
			)
		);
		$this->assert_same(
			[
				[
					'key'     => 'subtitle',
					'compare' => '=',
				],
			],
			$null_value_result['meta_query'] ?? null,
			'Unset meta_value omits value key cleanly'
		);
	}
}

try {
	( new QueryManagerTest() )->run_all_tests();
} finally {
	restore_error_handler();
}
