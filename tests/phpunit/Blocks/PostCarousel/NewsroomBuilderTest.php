<?php
/**
 * Unit tests for GSlider\Blocks\PostCarousel\NewsroomBuilder.
 *
 * Verifies Newsroom Stage reading-time calculation with empty-content date
 * fallback, queue item active indexing, attachment/fallback/placeholder
 * thumbnails, XSS escaping, and empty vs populated playlist wrappers across
 * PHP 7.4 through 8.5.
 *
 * @package GSlider\Tests\Blocks\PostCarousel
 */

require_once dirname( __DIR__, 2 ) . '/stubs/wp-kses-escaping.php';

if ( ! function_exists( 'get_post_field' ) ) {
	/**
	 * Stub for WordPress get_post_field().
	 *
	 * @param string $field Field name.
	 * @param int    $post  Post ID.
	 * @return string Mocked post field value.
	 */
	function get_post_field( $field, $post = 0 ) {
		$id = is_object( $post ) && isset( $post->ID ) ? (int) $post->ID : (int) $post;
		if ( 'post_content' === $field ) {
			return (string) ( $GLOBALS['gslider_newsroom_test_contents'][ $id ] ?? '' );
		}
		return '';
	}
}

if ( ! function_exists( 'get_the_date' ) ) {
	/**
	 * Stub for WordPress get_the_date().
	 *
	 * @param string      $format Date format.
	 * @param int|WP_Post $post   Post ID or object.
	 * @return string Mocked formatted date string.
	 */
	function get_the_date( $format = '', $post = null ) {
		unset( $format );
		$id = is_object( $post ) && isset( $post->ID ) ? (int) $post->ID : (int) $post;
		return (string) ( $GLOBALS['gslider_newsroom_test_dates'][ $id ] ?? 'November 11, 2026' );
	}
}

if ( ! function_exists( 'get_the_title' ) ) {
	/**
	 * Stub for WordPress get_the_title().
	 *
	 * @param int|WP_Post $post Post ID or object.
	 * @return string Mocked raw title.
	 */
	function get_the_title( $post = 0 ) {
		$id = is_object( $post ) && isset( $post->ID ) ? (int) $post->ID : (int) $post;
		return (string) ( $GLOBALS['gslider_newsroom_test_titles'][ $id ] ?? '' );
	}
}

if ( ! function_exists( 'the_title_attribute' ) ) {
	/**
	 * Stub for WordPress the_title_attribute().
	 *
	 * @param string|array $args Arguments array or query string.
	 * @return string|void Escaped title attribute when echo is false.
	 */
	function the_title_attribute( $args = [] ) {
		$post_id = is_array( $args ) && isset( $args['post'] ) ? (int) $args['post'] : 0;
		$escaped = htmlspecialchars( get_the_title( $post_id ), ENT_QUOTES, 'UTF-8' );
		if ( is_array( $args ) && array_key_exists( 'echo', $args ) && ! $args['echo'] ) {
			return $escaped;
		}
		echo $escaped; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

if ( ! function_exists( 'has_post_thumbnail' ) ) {
	/**
	 * Stub for WordPress has_post_thumbnail().
	 *
	 * @param int $post_id Post ID.
	 * @return bool Whether post has a featured image ID configured.
	 */
	function has_post_thumbnail( $post_id = 0 ) {
		$id = (int) $post_id;
		return ! empty( $GLOBALS['gslider_newsroom_test_thumb_ids'][ $id ] );
	}
}

if ( ! function_exists( 'get_post_thumbnail_id' ) ) {
	/**
	 * Stub for WordPress get_post_thumbnail_id().
	 *
	 * @param int $post_id Post ID.
	 * @return int Attachment ID or 0.
	 */
	function get_post_thumbnail_id( $post_id = 0 ) {
		$id = (int) $post_id;
		return (int) ( $GLOBALS['gslider_newsroom_test_thumb_ids'][ $id ] ?? 0 );
	}
}

if ( ! function_exists( 'wp_get_attachment_image' ) ) {
	/**
	 * Stub for WordPress wp_get_attachment_image().
	 *
	 * @param int          $attachment_id Attachment ID.
	 * @param string|array $size          Image size.
	 * @param bool         $icon          Icon flag.
	 * @param string|array $attr          Extra HTML attributes.
	 * @return string Mocked img tag.
	 */
	function wp_get_attachment_image( $attachment_id, $size = 'thumbnail', $icon = false, $attr = '' ) {
		unset( $icon );
		$id      = (int) $attachment_id;
		$alt     = is_array( $attr ) && isset( $attr['alt'] ) ? (string) $attr['alt'] : '';
		$loading = is_array( $attr ) && isset( $attr['loading'] ) ? (string) $attr['loading'] : 'lazy';
		$size    = is_string( $size ) ? $size : 'thumbnail';
		if ( $id <= 0 ) {
			return '';
		}
		return '<img class="attachment-' . htmlspecialchars( $size, ENT_QUOTES, 'UTF-8' ) . '" src="https://example.org/thumb-' . $id . '.jpg" alt="' . htmlspecialchars( $alt, ENT_QUOTES, 'UTF-8' ) . '" loading="' . htmlspecialchars( $loading, ENT_QUOTES, 'UTF-8' ) . '" />';
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

require_once ABSPATH . 'includes/Utils/Helper.php';
require_once ABSPATH . 'includes/Blocks/PostCarousel/NewsroomBuilder.php';

use GSlider\Blocks\PostCarousel\NewsroomBuilder;

/**
 * Test class for GSlider\Blocks\PostCarousel\NewsroomBuilder.
 *
 * @package GSlider\Tests\Blocks\PostCarousel
 */
class NewsroomBuilderTest {

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
	 * Resets mock global fixtures between test methods.
	 *
	 * @return void
	 */
	private function reset_state(): void {
		$GLOBALS['gslider_newsroom_test_contents']  = [];
		$GLOBALS['gslider_newsroom_test_dates']     = [];
		$GLOBALS['gslider_newsroom_test_titles']    = [];
		$GLOBALS['gslider_newsroom_test_thumb_ids'] = [];
	}

	/**
	 * Runs all unit test cases for NewsroomBuilder.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		fwrite( STDOUT, "=== GSlider PostCarousel NewsroomBuilder Unit Tests ===\n\n" );

		$this->test_class_exists();
		$this->test_get_reading_time_and_empty_content_fallback();
		$this->test_render_queue_item_variants_and_xss_escaping();
		$this->test_render_queue_empty_and_playlist_wrapper();

		fwrite( STDOUT, "\nAll NewsroomBuilder unit tests passed successfully!\n" );
	}

	/**
	 * Verifies NewsroomBuilder class loads cleanly.
	 *
	 * @return void
	 */
	public function test_class_exists(): void {
		$this->assert_true( class_exists( NewsroomBuilder::class ), 'NewsroomBuilder class exists' );
	}

	/**
	 * Verifies reading time string calculation and empty-content date fallback.
	 *
	 * @return void
	 */
	public function test_get_reading_time_and_empty_content_fallback(): void {
		$this->reset_state();

		$GLOBALS['gslider_newsroom_test_contents'][101] = str_repeat( 'word ', 800 );
		$GLOBALS['gslider_newsroom_test_contents'][102] = '   ';
		$GLOBALS['gslider_newsroom_test_dates'][102]    = 'October 28, 2026';

		$this->assert_same( '4 min read', NewsroomBuilder::get_reading_time( 101 ), 'get_reading_time() returns formatted reading time for non-empty content' );
		$this->assert_same( 'October 28, 2026', NewsroomBuilder::get_reading_time( 102 ), 'get_reading_time() falls back to post date when content is whitespace-only' );
	}

	/**
	 * Verifies queue item active class, untitled fallback, thumbnail variants, and XSS escaping.
	 *
	 * @return void
	 */
	public function test_render_queue_item_variants_and_xss_escaping(): void {
		$this->reset_state();

		$GLOBALS['gslider_newsroom_test_titles'][201]    = 'Breaking <script>alert(1)</script> News';
		$GLOBALS['gslider_newsroom_test_contents'][201]  = str_repeat( 'word ', 400 );
		$GLOBALS['gslider_newsroom_test_thumb_ids'][201] = 88;

		$active_item = NewsroomBuilder::render_queue_item(
			201,
			[
				'show_reading_time' => true,
			],
			0
		);

		$this->assert_true( false !== strpos( $active_item, 'gslider-newsroom-queue-item swiper-slide-thumb-active' ), 'render_queue_item() marks index 0 as active' );
		$this->assert_true( false !== strpos( $active_item, 'data-slide-index="0"' ), 'render_queue_item() sets data-slide-index attribute' );
		$this->assert_true( false !== strpos( $active_item, 'role="button" tabindex="0"' ), 'render_queue_item() includes keyboard accessibility attributes' );
		$this->assert_true( false !== strpos( $active_item, 'src="https://example.org/thumb-88.jpg"' ), 'render_queue_item() renders attachment thumbnail when featured image exists' );
		$this->assert_true( false === strpos( $active_item, '<script>alert(1)</script>' ), 'render_queue_item() escapes script tags in headline title' );
		$this->assert_true( false !== strpos( $active_item, '<h4 class="gslider-queue-title">Breaking &lt;script&gt;alert(1)&lt;/script&gt; News</h4>' ), 'render_queue_item() escapes queue title with esc_html()' );
		$this->assert_true( false !== strpos( $active_item, '<span class="gslider-queue-meta">2 min read</span>' ), 'render_queue_item() renders reading time when show_reading_time is true' );

		// Blank title + missing featured thumbnail + custom fallback URL + date meta fallback.
		$GLOBALS['gslider_newsroom_test_titles'][202] = '   ';
		$GLOBALS['gslider_newsroom_test_dates'][202]  = 'November 12, 2026 <x>';

		$fallback_img_item = NewsroomBuilder::render_queue_item(
			202,
			[
				'show_reading_time'      => false,
				'fallback_thumbnail_url' => 'https://example.org/fallback-queue.jpg',
			],
			2
		);

		$this->assert_true( false === strpos( $fallback_img_item, 'swiper-slide-thumb-active' ), 'render_queue_item() omits active class on non-zero index' );
		$this->assert_true( false !== strpos( $fallback_img_item, 'data-slide-index="2"' ), 'render_queue_item() outputs index 2 in data-slide-index' );
		$this->assert_true( false !== strpos( $fallback_img_item, '<h4 class="gslider-queue-title">(Untitled)</h4>' ), 'render_queue_item() falls back to (Untitled) for blank title' );
		$this->assert_true( false !== strpos( $fallback_img_item, '<img class="gslider-queue-fallback-img" src="https://example.org/fallback-queue.jpg"' ), 'render_queue_item() renders fallback image when post thumbnail is missing' );
		$this->assert_true( false !== strpos( $fallback_img_item, '<span class="gslider-queue-meta">November 12, 2026 &lt;x&gt;</span>' ), 'render_queue_item() falls back to escaped date when show_reading_time is false' );

		// No thumbnail and no fallback URL renders inline SVG placeholder.
		$placeholder_item = NewsroomBuilder::render_queue_item( 202, [] );
		$this->assert_true( false !== strpos( $placeholder_item, '<svg class="gslider-queue-placeholder-svg"' ), 'render_queue_item() renders SVG placeholder when neither thumbnail nor fallback URL exists' );
	}

	/**
	 * Verifies render_queue() returns empty string for empty list and playlist wrapper for posts.
	 *
	 * @return void
	 */
	public function test_render_queue_empty_and_playlist_wrapper(): void {
		$this->reset_state();

		$this->assert_same( '', NewsroomBuilder::render_queue( [], [] ), 'render_queue() returns empty string for empty post IDs' );

		$GLOBALS['gslider_newsroom_test_titles'][301] = 'Lead Story';
		$GLOBALS['gslider_newsroom_test_titles'][302] = 'Second Story';

		$queue_html = NewsroomBuilder::render_queue( [ 301, 302 ], [ 'show_reading_time' => false ] );

		$this->assert_true( false !== strpos( $queue_html, '<aside class="gslider-newsroom-queue swiper" aria-label="Story Playlist">' ), 'render_queue() wraps queue in accessible aside container' );
		$this->assert_true( false !== strpos( $queue_html, '<div class="swiper-wrapper">' ), 'render_queue() includes swiper-wrapper track' );
		$this->assert_true( 2 === substr_count( $queue_html, 'class="swiper-slide gslider-newsroom-queue-item' ), 'render_queue() renders one slide per post ID' );
		$this->assert_true( 1 === substr_count( $queue_html, 'swiper-slide-thumb-active' ), 'render_queue() marks only the first queue item active' );
	}
}

try {
	( new NewsroomBuilderTest() )->run_all_tests();
} finally {
	restore_error_handler();
}
