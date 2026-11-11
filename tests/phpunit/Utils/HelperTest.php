<?php
/**
 * Unit tests for GSlider\Utils\Helper.
 *
 * Verifies that:
 * 1. Helper class exists via Helper::class.
 * 2. build_date_query() uses wp_date() site timezone and integer casts for current_month and current_year, while keeping relative ranges intact.
 * 3. build_meta_query() normalizes and allowlists meta_compare, omits value on EXISTS/NOT EXISTS, and preserves '0' while skipping empty ''.
 *
 * @package GSlider\Tests\Utils
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

if ( ! function_exists( 'wp_date' ) ) {
	/**
	 * Stub for WordPress wp_date() controlled by test global map.
	 *
	 * @param string $format Date format string.
	 * @return string
	 */
	function wp_date( $format ) {
		global $gslider_mock_wp_date;
		if ( isset( $gslider_mock_wp_date[ $format ] ) ) {
			return (string) $gslider_mock_wp_date[ $format ];
		}
		fwrite( STDERR, "FAIL: wp_date() stub has no mock for format '{$format}'\n" );
		exit( 1 );
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

require_once ABSPATH . 'includes/Utils/Helper.php';

use GSlider\Utils\Helper;

/**
 * Test class for GSlider\Utils\Helper.
 *
 * @package GSlider\Tests\Utils
 */
class HelperTest {

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
	 * Runs all Helper unit tests.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider Helper Unit Tests ===\n\n";

		$this->test_class_exists();
		$this->test_build_tax_query();
		$this->test_build_author_query();
		$this->test_build_date_query_site_timezone_and_ranges();
		$this->test_build_meta_query();
		$this->test_build_excluded_posts();
		$this->test_calculate_reading_time();

		echo "\nAll Helper unit tests passed successfully!\n";
	}

	/**
	 * Test 1: Helper class exists via Helper::class.
	 *
	 * @return void
	 */
	public function test_class_exists(): void {
		$this->assert_true( class_exists( Helper::class, false ), 'Helper class exists via Helper::class' );
	}

	/**
	 * Test 2: build_date_query() respects wp_date() site timezone across boundaries and returns integers.
	 *
	 * @return void
	 */
	public function test_build_date_query_site_timezone_and_ranges(): void {
		global $gslider_mock_wp_date;

		try {
			// Cross-year/month boundary differing from system clock (e.g. UTC Dec 31 vs site Jan 1 2099).
			$gslider_mock_wp_date = [
				'Y' => '2099',
				'm' => '01',
			];

			$month_query = Helper::build_date_query( 'current_month' );
			$this->assert_same(
				[
					[
						'year'  => 2099,
						'month' => 1,
					],
				],
				$month_query,
				'build_date_query(current_month) returns integer year/month from wp_date() across year boundary'
			);

			$year_query = Helper::build_date_query( 'current_year' );
			$this->assert_same(
				[
					[
						'year' => 2099,
					],
				],
				$year_query,
				'build_date_query(current_year) returns integer year from wp_date() across year boundary'
			);

			// Another explicit site timezone snapshot (2026 / 11).
			$gslider_mock_wp_date = [
				'Y' => '2026',
				'm' => '11',
			];
			$this->assert_same(
				[
					[
						'year'  => 2026,
						'month' => 11,
					],
				],
				Helper::build_date_query( 'current_month' ),
				'build_date_query(current_month) returns 2026/11 integers matching wp_date()'
			);

			$this->assert_same( [], Helper::build_date_query( '' ), 'build_date_query empty returns empty array' );
			$this->assert_same( [], Helper::build_date_query( 'any' ), 'build_date_query(any) returns empty array' );
			$this->assert_same( [ [ 'after' => '24 hours ago' ] ], Helper::build_date_query( 'last_24_hours' ), 'build_date_query(last_24_hours) unchanged' );
			$this->assert_same( [ [ 'after' => '7 days ago' ] ], Helper::build_date_query( 'last_7_days' ), 'build_date_query(last_7_days) unchanged' );
			$this->assert_same( [ [ 'after' => '30 days ago' ] ], Helper::build_date_query( 'last_30_days' ), 'build_date_query(last_30_days) unchanged' );
			$this->assert_same( [ [ 'after' => '1 year ago' ] ], Helper::build_date_query( 'last_365_days' ), 'build_date_query(last_365_days) unchanged' );
		} finally {
			$gslider_mock_wp_date = [];
		}
	}

	/**
	 * Test 3: build_meta_query() allowlists/uppercases compare, omits value on EXISTS/NOT EXISTS, and handles '0' vs ''.
	 *
	 * @return void
	 */
	public function test_build_meta_query(): void {
		$this->assert_same( [], Helper::build_meta_query( '' ), 'build_meta_query() empty key returns empty array' );
		$this->assert_same( [], Helper::build_meta_query( '   ' ), 'build_meta_query() whitespace-only key returns empty array' );

		// Valid allowlisted operators including lowercase normalization.
		$this->assert_same(
			[
				[
					'key'     => 'rating',
					'compare' => 'LIKE',
					'value'   => 'top',
				],
			],
			Helper::build_meta_query( 'rating', 'top', 'like' ),
			"build_meta_query() normalizes lowercase 'like' to 'LIKE'"
		);

		$this->assert_same(
			[
				[
					'key'     => 'rating',
					'compare' => 'NOT LIKE',
					'value'   => 'spam',
				],
			],
			Helper::build_meta_query( 'rating', 'spam', 'not like' ),
			"build_meta_query() normalizes lowercase 'not like' to 'NOT LIKE'"
		);

		// EXISTS and NOT EXISTS omit 'value' even when non-empty value is passed.
		$this->assert_same(
			[
				[
					'key'     => 'badge',
					'compare' => 'EXISTS',
				],
			],
			Helper::build_meta_query( 'badge', 'ignored', 'exists' ),
			"build_meta_query() normalizes 'exists' to 'EXISTS' and omits value"
		);

		$this->assert_same(
			[
				[
					'key'     => 'badge',
					'compare' => 'NOT EXISTS',
				],
			],
			Helper::build_meta_query( 'badge', 'ignored', 'not exists' ),
			"build_meta_query() normalizes 'not exists' to 'NOT EXISTS' and omits value"
		);

		// Invalid operator falls back to '='.
		$this->assert_same(
			[
				[
					'key'     => 'badge',
					'compare' => '=',
					'value'   => 'gold',
				],
			],
			Helper::build_meta_query( 'badge', 'gold', 'REGEXP' ),
			"build_meta_query() falls back invalid operator 'REGEXP' to '='"
		);

		// '0' value is preserved while '' value omits 'value'.
		$this->assert_same(
			[
				[
					'key'     => 'stock',
					'compare' => '=',
					'value'   => '0',
				],
			],
			Helper::build_meta_query( 'stock', '0', '=' ),
			"build_meta_query() preserves '0' meta_value"
		);

		$this->assert_same(
			[
				[
					'key'     => 'stock',
					'compare' => '!=',
				],
			],
			Helper::build_meta_query( 'stock', '', '!=' ),
			"build_meta_query() omits empty string '' meta_value"
		);
	}

	/**
	 * Tests Helper::calculate_reading_time() for Latin, empty, and CJK text.
	 *
	 * @return void
	 */
	public function test_calculate_reading_time(): void {
		// Empty and non-string inputs default to 1 minute minimum.
		$this->assert_same( 1, Helper::calculate_reading_time( '' ), 'calculate_reading_time() returns 1 for empty string' );
		$this->assert_same( 1, Helper::calculate_reading_time( null ), 'calculate_reading_time() returns 1 for null input' );
		$this->assert_same( 1, Helper::calculate_reading_time( '   ' ), 'calculate_reading_time() returns 1 for whitespace-only input' );

		// Short Latin text (< 200 words) returns 1 minute.
		$short_text = str_repeat( 'word ', 50 );
		$this->assert_same( 1, Helper::calculate_reading_time( $short_text ), 'calculate_reading_time() returns 1 for 50 words' );

		// 400 words Latin at 200 wpm returns 2 minutes.
		$medium_text = str_repeat( 'word ', 400 );
		$this->assert_same( 2, Helper::calculate_reading_time( $medium_text ), 'calculate_reading_time() returns 2 for 400 words' );

		// 401 words Latin returns 3 minutes (ceil).
		$longer_text = str_repeat( 'word ', 401 );
		$this->assert_same( 3, Helper::calculate_reading_time( $longer_text ), 'calculate_reading_time() returns 3 for 401 words' );

		// HTML tags and shortcodes are stripped before calculating.
		$html_text = '<p>' . str_repeat( 'word ', 400 ) . '</p>[shortcode foo="bar"]';
		$this->assert_same( 2, Helper::calculate_reading_time( $html_text ), 'calculate_reading_time() strips HTML tags and shortcodes' );

		// CJK multibyte characters at 500 characters per minute.
		// 1000 Chinese characters (repeating 测试中文阅读时间 = 8 chars * 125 = 1000 chars) -> 2 minutes.
		$cjk_text = str_repeat( '测试中文阅读时间', 125 );
		$this->assert_same( 2, Helper::calculate_reading_time( $cjk_text ), 'calculate_reading_time() calculates CJK text at 500 chars/min' );

		// Japanese Hiragana & Katakana (repeating ひらがなカタカナ = 8 chars * 125 = 1000 chars) -> 2 minutes.
		$japanese_text = str_repeat( 'ひらがなカタカナ', 125 );
		$this->assert_same( 2, Helper::calculate_reading_time( $japanese_text ), 'calculate_reading_time() calculates Japanese Kana at 500 chars/min' );

		// Korean Hangul (repeating 한국어텍스트안녕 = 8 chars * 125 = 1000 chars) -> 2 minutes.
		$korean_text = str_repeat( '한국어텍스트안녕', 125 );
		$this->assert_same( 2, Helper::calculate_reading_time( $korean_text ), 'calculate_reading_time() calculates Korean Hangul at 500 chars/min' );

		// Mixed Latin + CJK: 200 English words (1.0 min) + 504 Japanese characters (~1.008 min) = ~2.008 min -> ceil = 3 mins.
		$mixed_text = str_repeat( 'word ', 200 ) . str_repeat( 'ひらがなカタカナ', 63 );
		$this->assert_same( 3, Helper::calculate_reading_time( $mixed_text ), 'calculate_reading_time() calculates mixed Latin and CJK text proportionally' );

		// Issue #742 explicit benchmark cases: 800 English words = 4 min read; 1,500 CJK chars = 3 min read.
		$english_800 = str_repeat( 'word ', 800 );
		$this->assert_same( 4, Helper::calculate_reading_time( $english_800 ), 'calculate_reading_time() returns 4 minutes for 800 English words' );

		$cjk_1500 = str_repeat( 'テスト日本語', 250 );
		$this->assert_same( 1500, mb_strlen( $cjk_1500 ), 'CJK test fixture contains exactly 1500 multibyte characters' );
		$this->assert_same( 3, Helper::calculate_reading_time( $cjk_1500 ), 'calculate_reading_time() returns 3 minutes for 1500 CJK characters' );
	}

	/**
	 * Tests Helper::build_tax_query() for include/exclude filters, custom taxonomies, AND relation, and legacy signatures.
	 *
	 * @return void
	 */
	public function test_build_tax_query(): void {
		// Empty inputs produce empty tax_query array.
		$this->assert_same( [], Helper::build_tax_query(), 'build_tax_query() returns empty array when no taxonomy terms are passed' );

		// Single category include omits unnecessary top-level relation key.
		$this->assert_same(
			[
				[
					'taxonomy' => 'category',
					'field'    => 'term_id',
					'terms'    => [ 12, 18 ],
					'operator' => 'IN',
				],
			],
			Helper::build_tax_query( [ 12, 18 ], 'include' ),
			'build_tax_query() builds single category IN clause cleanly'
		);

		// Categories + tags + custom taxonomies combine with AND relation and respect include/exclude modes.
		$combined = Helper::build_tax_query(
			[ 3 ],
			'exclude',
			[ 7, 8 ],
			'include',
			[
				'genre'  => [ 21, 22 ],
				'empty'  => [],
				'series' => [ 31 ],
			],
			[
				'genre'  => 'exclude',
				'series' => 'include',
			]
		);

		$this->assert_same(
			[
				[
					'taxonomy' => 'category',
					'field'    => 'term_id',
					'terms'    => [ 3 ],
					'operator' => 'NOT IN',
				],
				[
					'taxonomy' => 'post_tag',
					'field'    => 'term_id',
					'terms'    => [ 7, 8 ],
					'operator' => 'IN',
				],
				[
					'taxonomy' => 'genre',
					'field'    => 'term_id',
					'terms'    => [ 21, 22 ],
					'operator' => 'NOT IN',
				],
				[
					'taxonomy' => 'series',
					'field'    => 'term_id',
					'terms'    => [ 31 ],
					'operator' => 'IN',
				],
				'relation' => 'AND',
			],
			$combined,
			'build_tax_query() combines category, tag, and custom taxonomy clauses with AND relation and skips empty taxonomies'
		);

		// Backward-compatible legacy 3-arg array signature: (categories, tags, taxonomies).
		$legacy = Helper::build_tax_query( [ 1 ], [ 2 ], [ 'topic' => [ 9 ] ] );
		$this->assert_same(
			[
				[
					'taxonomy' => 'category',
					'field'    => 'term_id',
					'terms'    => [ 1 ],
					'operator' => 'IN',
				],
				[
					'taxonomy' => 'post_tag',
					'field'    => 'term_id',
					'terms'    => [ 2 ],
					'operator' => 'IN',
				],
				[
					'taxonomy' => 'topic',
					'field'    => 'term_id',
					'terms'    => [ 9 ],
					'operator' => 'IN',
				],
				'relation' => 'AND',
			],
			$legacy,
			'build_tax_query() supports legacy array second-parameter signature'
		);
	}

	/**
	 * Tests Helper::build_author_query() for empty, include, and exclude modes.
	 *
	 * @return void
	 */
	public function test_build_author_query(): void {
		$this->assert_same( [], Helper::build_author_query( [] ), 'build_author_query() returns empty array for empty authors list' );
		$this->assert_same(
			[ 'author__in' => [ 4, 9 ] ],
			Helper::build_author_query( [ 4, 9 ], 'include' ),
			'build_author_query() returns author__in clause for include filter'
		);
		$this->assert_same(
			[ 'author__not_in' => [ 4, 9 ] ],
			Helper::build_author_query( [ 4, 9 ], 'exclude' ),
			'build_author_query() returns author__not_in clause for exclude filter'
		);
	}

	/**
	 * Tests Helper::build_excluded_posts() CSV parsing, deduplication, and current post handling.
	 *
	 * @return void
	 */
	public function test_build_excluded_posts(): void {
		$this->assert_same( [], Helper::build_excluded_posts( '', false ), 'build_excluded_posts() returns empty array when CSV and excludeCurrentPost are empty/false' );

		$parsed = Helper::build_excluded_posts( ' 12, 34, 12, 56 ', false );
		$this->assert_same( [ 12, 34, 56 ], array_values( $parsed ), 'build_excluded_posts() parses CSV integer IDs and deduplicates duplicates' );

		if ( ! function_exists( 'get_the_ID' ) ) {
			/**
			 * Stub for WordPress get_the_ID() inside standalone HelperTest runs.
			 *
			 * @return int Current mocked post ID.
			 */
			function get_the_ID() {
				return (int) ( $GLOBALS['gslider_helper_test_current_id'] ?? 0 );
			}
		}

		$GLOBALS['gslider_helper_test_current_id'] = 99;
		$with_current                              = Helper::build_excluded_posts( '12, 34', true );
		$this->assert_same( [ 12, 34, 99 ], array_values( $with_current ), 'build_excluded_posts() appends current post ID when exclude_current is true' );

		$deduped_current = Helper::build_excluded_posts( '99, 12', true );
		$this->assert_same( [ 99, 12 ], array_values( $deduped_current ), 'build_excluded_posts() does not duplicate current post ID if already excluded' );

		unset( $GLOBALS['gslider_helper_test_current_id'] );
	}
}

try {
	( new HelperTest() )->run_all_tests();
} finally {
	restore_error_handler();
}
