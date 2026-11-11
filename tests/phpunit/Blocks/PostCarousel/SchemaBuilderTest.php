<?php
/**
 * Unit tests for GSlider\Blocks\PostCarousel\SchemaBuilder.
 *
 * Verifies Google Carousel SEO JSON-LD generation, default activation,
 * toggle disabling, filter hook customization/suppression, XSS hardening,
 * and WordPress HTML entity handling across PHP 7.4 through 8.5.
 *
 * @package GSlider\Tests\Blocks\PostCarousel
 */

if ( ! function_exists( 'get_permalink' ) ) {
	/**
	 * Stub for WordPress get_permalink().
	 *
	 * @param int $post_id Post ID.
	 * @return string Permalink URL or overridden mock URL.
	 */
	function get_permalink( $post_id = 0 ) {
		$id = (int) $post_id;
		if ( array_key_exists( $id, $GLOBALS['gslider_schema_test_permalinks'] ?? array() ) ) {
			return (string) $GLOBALS['gslider_schema_test_permalinks'][ $id ];
		}
		return 'https://example.org/blog/post-' . $id . '/';
	}
}

if ( ! function_exists( 'get_the_title' ) ) {
	/**
	 * Stub for WordPress get_the_title().
	 *
	 * @param int|WP_Post $post Post ID or object.
	 * @return string Post title.
	 */
	function get_the_title( $post = 0 ) {
		$id = is_object( $post ) && isset( $post->ID ) ? (int) $post->ID : (int) $post;
		return (string) ( $GLOBALS['gslider_schema_test_titles'][ $id ] ?? '' );
	}
}

if ( ! function_exists( 'get_the_date' ) ) {
	/**
	 * Stub for WordPress get_the_date().
	 *
	 * @param string      $format Date format.
	 * @param int|WP_Post $post   Post ID or object.
	 * @return string ISO 8601 published date.
	 */
	function get_the_date( $format = '', $post = null ) {
		unset( $format, $post );
		return '2026-11-01T10:00:00+00:00';
	}
}

if ( ! function_exists( 'get_the_modified_date' ) ) {
	/**
	 * Stub for WordPress get_the_modified_date().
	 *
	 * @param string      $format Date format.
	 * @param int|WP_Post $post   Post ID or object.
	 * @return string|false ISO 8601 modified date or false.
	 */
	function get_the_modified_date( $format = '', $post = null ) {
		unset( $format );
		$id = is_object( $post ) && isset( $post->ID ) ? (int) $post->ID : (int) $post;
		if ( array_key_exists( $id, $GLOBALS['gslider_schema_test_modified'] ?? array() ) ) {
			return $GLOBALS['gslider_schema_test_modified'][ $id ];
		}
		return '2026-11-11T04:15:00+00:00';
	}
}

if ( ! function_exists( 'get_the_author_meta' ) ) {
	/**
	 * Stub for WordPress get_the_author_meta().
	 *
	 * @param string    $field   User meta key.
	 * @param int|false $user_id User ID.
	 * @return string Author field value.
	 */
	function get_the_author_meta( $field = '', $user_id = false ) {
		if ( 'display_name' === $field ) {
			$uid = false !== $user_id ? (int) $user_id : 0;
			return (string) ( $GLOBALS['gslider_schema_test_authors'][ $uid ] ?? '' );
		}
		return '';
	}
}

if ( ! function_exists( 'get_the_post_thumbnail_url' ) ) {
	/**
	 * Stub for WordPress get_the_post_thumbnail_url().
	 *
	 * @param int|WP_Post|null $post Post ID or object.
	 * @param string           $size Image size slug.
	 * @return string|false Featured image URL or false.
	 */
	function get_the_post_thumbnail_url( $post = null, $size = 'post-thumbnail' ) {
		unset( $size );
		$id = is_object( $post ) && isset( $post->ID ) ? (int) $post->ID : (int) $post;
		return $GLOBALS['gslider_schema_test_thumbnails'][ $id ] ?? false;
	}
}

if ( ! function_exists( 'wp_json_encode' ) ) {
	/**
	 * Stub for WordPress wp_json_encode().
	 *
	 * @param mixed $data    Data to encode.
	 * @param int   $options JSON flags.
	 * @param int   $depth   Max recursion depth.
	 * @return string|false Encoded JSON string.
	 */
	function wp_json_encode( $data, $options = 0, $depth = 512 ) {
		return json_encode( $data, $options, $depth );
	}
}

require_once dirname( __DIR__, 2 ) . '/bootstrap.php';

set_error_handler(
	static function ( $severity, $message, $file, $line ) {
		if ( ! ( error_reporting() & $severity ) ) {
			return false;
		}
		fwrite( STDERR, "FAIL: PHP warning {$message} in {$file}:{$line}\n" );
		exit( 1 );
	}
);

require_once ABSPATH . 'includes/Blocks/PostCarousel/SchemaBuilder.php';

use GSlider\Blocks\PostCarousel\SchemaBuilder;

/**
 * Test class for GSlider\Blocks\PostCarousel\SchemaBuilder.
 *
 * @package GSlider\Tests\Blocks\PostCarousel
 */
class SchemaBuilderTest {

	/**
	 * Asserts that a condition evaluates strictly to true.
	 *
	 * @param bool   $condition Evaluated boolean condition.
	 * @param string $message   Assertion description.
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
	 * Asserts strict identity (`===`) between expected and actual values.
	 *
	 * @param mixed  $expected Expected value.
	 * @param mixed  $actual   Actual value.
	 * @param string $message  Assertion description.
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
	 * Resets mock global registries between test methods.
	 *
	 * @return void
	 */
	private function reset_state(): void {
		$GLOBALS['gslider_schema_test_permalinks'] = array();
		$GLOBALS['gslider_schema_test_titles']     = array();
		$GLOBALS['gslider_schema_test_modified']   = array();
		$GLOBALS['gslider_schema_test_authors']    = array();
		$GLOBALS['gslider_schema_test_thumbnails'] = array();
		$GLOBALS['wp_mock_posts']                  = array();
		remove_all_filters( 'gslider_post_carousel_schema_data' );
	}

	/**
	 * Runs all unit test cases for SchemaBuilder.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider PostCarousel SchemaBuilder Unit Tests ===\n\n";

		$this->test_build_returns_empty_for_empty_posts_or_disabled_toggle();
		$this->test_build_generates_valid_item_list_and_blog_posting_schema();
		$this->test_build_applies_filter_hook_for_suppression_and_customization();
		$this->test_build_hardens_xss_entities_and_malicious_urls();
		$this->test_build_skips_invalid_entries_and_resolves_numeric_post_ids();

		echo "\nAll SchemaBuilder unit tests passed successfully!\n";
	}

	/**
	 * Test 1: Empty post arrays and disabled `enableSchemaMarkup` return empty string.
	 *
	 * @return void
	 */
	public function test_build_returns_empty_for_empty_posts_or_disabled_toggle(): void {
		$this->reset_state();

		$this->assert_true( class_exists( SchemaBuilder::class, false ), 'SchemaBuilder class exists cleanly' );
		$this->assert_same( '', SchemaBuilder::build( array(), array(), null ), 'Empty posts returns empty string' );

		$post              = new WP_Post();
		$post->ID          = 11;
		$post->post_author = 5;

		$GLOBALS['gslider_schema_test_titles'][11]  = 'Valid Post';
		$GLOBALS['gslider_schema_test_authors'][5]  = 'Author Five';

		$this->assert_same(
			'',
			SchemaBuilder::build( array( $post ), array( 'enableSchemaMarkup' => false ), null ),
			'Explicit false disables schema output'
		);
		$this->assert_same(
			'',
			SchemaBuilder::build( array( $post ), array( 'enableSchemaMarkup' => 'false' ), null ),
			'String false disables schema output'
		);
		$this->assert_same(
			'',
			SchemaBuilder::build( array( $post ), array( 'enableSchemaMarkup' => 0 ), null ),
			'Zero disables schema output'
		);
		$this->assert_true( SchemaBuilder::is_schema_enabled( array() ), 'Omitted attribute defaults schema enabled to true' );
		$this->assert_true( SchemaBuilder::is_schema_enabled( array( 'enableSchemaMarkup' => null ) ), 'Null attribute falls back to true' );
	}

	/**
	 * Test 2: Valid Schema.org ItemList + BlogPosting payload with optional thumbnail image.
	 *
	 * @return void
	 */
	public function test_build_generates_valid_item_list_and_blog_posting_schema(): void {
		$this->reset_state();

		$post_with_image              = new WP_Post();
		$post_with_image->ID          = 201;
		$post_with_image->post_author = 12;

		$post_without_image              = new WP_Post();
		$post_without_image->ID          = 202;
		$post_without_image->post_author = 13;

		$GLOBALS['gslider_schema_test_titles']     = array(
			201 => 'WordPress Block Patterns Guide',
			202 => 'Headless Carousel Architecture',
		);
		$GLOBALS['gslider_schema_test_authors']    = array(
			12 => 'Noruzzaman Rubel',
			13 => 'Sarah Connor',
		);
		$GLOBALS['gslider_schema_test_thumbnails'] = array(
			201 => 'https://example.org/uploads/patterns-guide.webp',
			202 => false,
		);
		$GLOBALS['gslider_schema_test_modified']   = array(
			202 => false,
		);

		$html = SchemaBuilder::build( array( $post_with_image, $post_without_image ), array(), null );
		$this->assert_true( 0 === strpos( $html, '<script type="application/ld+json">' ), 'Output begins with <script type="application/ld+json">' );

		preg_match( '/^<script type="application\/ld\+json">(.+)<\/script>$/', $html, $matches );
		$this->assert_true( ! empty( $matches[1] ), 'Output extracts single JSON-LD body cleanly' );

		$payload = json_decode( $matches[1], true );
		$this->assert_same( 'https://schema.org', $payload['@context'] ?? null, 'Schema context matches https://schema.org' );
		$this->assert_same( 'ItemList', $payload['@type'] ?? null, 'Schema type matches ItemList' );
		$this->assert_same( 2, count( $payload['itemListElement'] ?? array() ), 'Two posts map to two ListItem entries' );

		$first = $payload['itemListElement'][0];
		$this->assert_same( 'ListItem', $first['@type'] ?? null, 'First item type is ListItem' );
		$this->assert_same( 1, $first['position'] ?? null, 'First ListItem has position 1' );
		$this->assert_same( 'BlogPosting', $first['item']['@type'] ?? null, 'Nested item is BlogPosting' );
		$this->assert_same( 'https://example.org/blog/post-201/#gslider-blogposting', $first['item']['@id'] ?? null, 'First @id uses #gslider-blogposting fragment to prevent WebPage node collision' );
		$this->assert_same( 'https://example.org/blog/post-201/', $first['item']['url'] ?? null, 'First url matches post permalink' );
		$this->assert_same( 'WordPress Block Patterns Guide', $first['item']['headline'] ?? null, 'First headline matches post title' );
		$this->assert_same( '2026-11-01T10:00:00+00:00', $first['item']['datePublished'] ?? null, 'First datePublished uses ISO 8601' );
		$this->assert_same( '2026-11-11T04:15:00+00:00', $first['item']['dateModified'] ?? null, 'First dateModified uses ISO 8601' );
		$this->assert_same( array( '@type' => 'Person', 'name' => 'Noruzzaman Rubel' ), $first['item']['author'] ?? null, 'First author resolves Person object' );
		$this->assert_same( 'https://example.org/uploads/patterns-guide.webp', $first['item']['image'] ?? null, 'First item includes featured image URL' );

		$second = $payload['itemListElement'][1];
		$this->assert_same( 2, $second['position'] ?? null, 'Second ListItem has position 2' );
		$this->assert_true( ! array_key_exists( 'image', $second['item'] ), 'Post without featured image omits image property' );
		$this->assert_same( '2026-11-01T10:00:00+00:00', $second['item']['dateModified'] ?? null, 'Empty modified date falls back to datePublished' );
	}

	/**
	 * Test 3: `gslider_post_carousel_schema_data` filter allows customization and suppression.
	 *
	 * @return void
	 */
	public function test_build_applies_filter_hook_for_suppression_and_customization(): void {
		$this->reset_state();

		$post              = new WP_Post();
		$post->ID          = 301;
		$post->post_author = 15;

		$GLOBALS['gslider_schema_test_titles'][301]  = 'Filterable Post';
		$GLOBALS['gslider_schema_test_authors'][15] = 'Author Fifteen';

		$mock_query         = new stdClass();
		$mock_query->marker = 'carousel_query_301';
		$captured_attrs     = null;
		$captured_query     = null;

		add_filter(
			'gslider_post_carousel_schema_data',
			static function ( $data, $attributes, $query ) use ( &$captured_attrs, &$captured_query ) {
				$captured_attrs               = $attributes;
				$captured_query               = $query;
				$data['itemListElement'][0]['item']['@type'] = 'Article';
				return $data;
			},
			10,
			3
		);

		$attrs = array( 'enableSchemaMarkup' => true, 'presetStyle' => 'newsroom-stage' );
		$html  = SchemaBuilder::build( array( $post ), $attrs, $mock_query );

		$this->assert_same( $attrs, $captured_attrs, 'Filter receives original block attributes' );
		$this->assert_same( $mock_query, $captured_query, 'Filter receives WP_Query instance' );
		$this->assert_true( false !== strpos( $html, '"@type":"Article"' ), 'Filter can override BlogPosting to Article' );

		remove_all_filters( 'gslider_post_carousel_schema_data' );
		add_filter( 'gslider_post_carousel_schema_data', '__return_false' );
		$this->assert_same( '', SchemaBuilder::build( array( $post ), $attrs, $mock_query ), 'Returning false suppresses output' );

		remove_all_filters( 'gslider_post_carousel_schema_data' );
		add_filter( 'gslider_post_carousel_schema_data', static function () { return 'invalid'; } );
		$this->assert_same( '', SchemaBuilder::build( array( $post ), $attrs, $mock_query ), 'Returning non-array suppresses output' );
	}

	/**
	 * Test 4: Plain-text entity decoding, XSS breakout protection, and query URL integrity.
	 *
	 * @return void
	 */
	public function test_build_hardens_xss_entities_and_malicious_urls(): void {
		$this->reset_state();

		$post              = new WP_Post();
		$post->ID          = 401;
		$post->post_author = 20;

		$GLOBALS['gslider_schema_test_titles'][401]     = 'Tom &amp; Jerry&#8217;s &lt;script&gt;alert(1)&lt;/script&gt; Guide';
		$GLOBALS['gslider_schema_test_authors'][20]    = 'Ada &amp; Grace';
		$GLOBALS['gslider_schema_test_permalinks'][401] = 'https://example.org/?p=401&preview=true#comments';
		$GLOBALS['gslider_schema_test_thumbnails'][401] = 'javascript:alert(1)';

		add_filter(
			'gslider_post_carousel_schema_data',
			static function ( $data ) {
				$data['itemListElement'][0]['item']['description'] = '</script><script>alert("xss")</script>';
				return $data;
			}
		);

		$html = SchemaBuilder::build( array( $post ), array(), null );

		// Ensure no unescaped </script> exists anywhere prior to the closing wrapper tag.
		$this->assert_same( 1, substr_count( strtolower( $html ), '</script>' ), 'Exactly one closing </script> tag exists (JSON_HEX_TAG prevents breakout)' );
		$this->assert_true( false !== strpos( $html, '\u003C/script\u003E' ), 'Closing script tag injected via filter is hex-escaped inside JSON' );
		$this->assert_true( false === strpos( $html, '&#038;' ), 'Query string & is preserved literally without HTML entity encoding' );

		preg_match( '/^<script type="application\/ld\+json">(.+)<\/script>$/', $html, $matches );
		$payload = json_decode( $matches[1] ?? '', true );
		$item    = $payload['itemListElement'][0]['item'] ?? array();

		$this->assert_same( 'Tom & Jerry’s  Guide', $item['headline'] ?? null, 'HTML entities decode cleanly and encoded tags strip without corrupting JSON' );
		$this->assert_same( 'Ada & Grace', $item['author']['name'] ?? null, 'Author entities decode cleanly' );
		$this->assert_same( 'https://example.org/?p=401&preview=true#comments', $item['url'] ?? null, 'Permalink keeps unescaped query string &' );
		$this->assert_same( 'https://example.org/?p=401&preview=true#gslider-blogposting', $item['@id'] ?? null, '@id replaces any existing fragment with #gslider-blogposting' );
		$this->assert_true( ! array_key_exists( 'image', $item ), 'Malicious javascript: thumbnail URL is rejected' );
	}

	/**
	 * Test 5: Invalid posts and disallowed permalink schemes are skipped with gapless 1-based positions.
	 *
	 * @return void
	 */
	public function test_build_skips_invalid_entries_and_resolves_numeric_post_ids(): void {
		$this->reset_state();

		$bad_url_post              = new WP_Post();
		$bad_url_post->ID          = 501;
		$bad_url_post->post_author = 1;

		$num_post              = new WP_Post();
		$num_post->ID          = 502;
		$num_post->post_author = 22;

		$GLOBALS['wp_mock_posts'][502]                  = $num_post;
		$GLOBALS['gslider_schema_test_permalinks'][501] = 'data:text/html,<script>alert(1)</script>';
		$GLOBALS['gslider_schema_test_titles'][502]     = 'Numeric ID Post';
		$GLOBALS['gslider_schema_test_authors'][22]    = 'Author 22';

		// Post 503 has post_author 0 -> author key omitted instead of invalid empty name.
		$no_author_post     = new WP_Post();
		$no_author_post->ID = 503;
		$GLOBALS['gslider_schema_test_titles'][503] = 'System Post';

		$html = SchemaBuilder::build( array( null, 'invalid', $bad_url_post, 502, $no_author_post ), array(), null );
		preg_match( '/^<script type="application\/ld\+json">(.+)<\/script>$/', $html, $matches );
		$payload = json_decode( $matches[1] ?? '', true );

		$this->assert_same( 2, count( $payload['itemListElement'] ?? array() ), 'Invalid entries and disallowed URLs are skipped cleanly' );
		$this->assert_same( 1, $payload['itemListElement'][0]['position'] ?? null, 'First valid item starts cleanly at position 1' );
		$this->assert_same( 2, $payload['itemListElement'][1]['position'] ?? null, 'Second valid item gets contiguous position 2' );
		$this->assert_same( 'Author 22', $payload['itemListElement'][0]['item']['author']['name'] ?? null, 'Numeric post ID resolves post_author display name' );
		$this->assert_true( ! array_key_exists( 'author', $payload['itemListElement'][1]['item'] ), 'Zero post_author omits author object instead of empty Person name' );
	}
}

try {
	( new SchemaBuilderTest() )->run_all_tests();
} finally {
	restore_error_handler();
}
