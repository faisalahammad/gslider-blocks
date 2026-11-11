<?php
/**
 * Unit tests for GSlider\Blocks\PostCarousel\CardMarkupBuilder.
 *
 * Verifies excerpt extraction/truncation, contentOrder slotting, card layout
 * archetypes (classic, horizontal, timeline), taxonomy overlay/inline modes
 * & max badge caps, thumbnail fallback precedence, editorial metadata,
 * Read More rel attributes, and XSS escaping across PHP 7.4 through 8.5.
 *
 * @package GSlider\Tests\Blocks\PostCarousel
 */

require_once dirname( __DIR__, 2 ) . '/stubs/wp-kses-escaping.php';

if ( ! function_exists( 'get_permalink' ) ) {
	/**
	 * Stub for WordPress get_permalink().
	 *
	 * @param int $post_id Post ID.
	 * @return string Mocked permalink URL.
	 */
	function get_permalink( $post_id = 0 ) {
		$id = is_object( $post_id ) && isset( $post_id->ID ) ? (int) $post_id->ID : (int) $post_id;
		if ( 0 === $id && isset( $GLOBALS['gslider_card_active_post_id'] ) ) {
			$id = (int) $GLOBALS['gslider_card_active_post_id'];
		}
		if ( array_key_exists( $id, $GLOBALS['gslider_card_test_permalinks'] ?? [] ) ) {
			return (string) $GLOBALS['gslider_card_test_permalinks'][ $id ];
		}
		return 'https://example.org/post-' . $id . '/';
	}
}

if ( ! function_exists( 'the_permalink' ) ) {
	/**
	 * Stub for WordPress the_permalink().
	 *
	 * @return void
	 */
	function the_permalink() {
		$id = (int) ( $GLOBALS['gslider_card_active_post_id'] ?? 0 );
		echo esc_url( get_permalink( $id ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

if ( ! function_exists( 'get_the_title' ) ) {
	/**
	 * Stub for WordPress get_the_title().
	 *
	 * @param int|WP_Post $post Post ID or object.
	 * @return string Mocked title.
	 */
	function get_the_title( $post = 0 ) {
		$id = is_object( $post ) && isset( $post->ID ) ? (int) $post->ID : (int) $post;
		if ( 0 === $id && isset( $GLOBALS['gslider_card_active_post_id'] ) ) {
			$id = (int) $GLOBALS['gslider_card_active_post_id'];
		}
		return (string) ( $GLOBALS['gslider_card_test_titles'][ $id ] ?? 'Sample Post Title' );
	}
}

if ( ! function_exists( 'the_title_attribute' ) ) {
	/**
	 * Stub for WordPress the_title_attribute().
	 *
	 * @param array|string $args Arguments array or query string.
	 * @return string|void Attribute-escaped title when echo is false.
	 */
	function the_title_attribute( $args = [] ) {
		$id      = is_array( $args ) && isset( $args['post'] ) ? (int) $args['post'] : (int) ( $GLOBALS['gslider_card_active_post_id'] ?? 0 );
		$escaped = htmlspecialchars( get_the_title( $id ), ENT_QUOTES, 'UTF-8' );
		if ( is_array( $args ) && array_key_exists( 'echo', $args ) && ! $args['echo'] ) {
			return $escaped;
		}
		echo $escaped; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

if ( ! function_exists( 'get_the_category' ) ) {
	/**
	 * Stub for WordPress get_the_category().
	 *
	 * @param int $post_id Post ID.
	 * @return array Category objects list.
	 */
	function get_the_category( $post_id = 0 ) {
		return $GLOBALS['gslider_card_test_categories'][ (int) $post_id ] ?? [];
	}
}

if ( ! function_exists( 'get_category_link' ) ) {
	/**
	 * Stub for WordPress get_category_link().
	 *
	 * @param int $term_id Category term ID.
	 * @return string Category archive URL.
	 */
	function get_category_link( $term_id ) {
		return 'https://example.org/category/' . (int) $term_id . '/';
	}
}

if ( ! function_exists( 'get_the_tags' ) ) {
	/**
	 * Stub for WordPress get_the_tags().
	 *
	 * @param int $post_id Post ID.
	 * @return array|false Tag objects list or false.
	 */
	function get_the_tags( $post_id = 0 ) {
		$tags = $GLOBALS['gslider_card_test_tags'][ (int) $post_id ] ?? [];
		return ! empty( $tags ) ? $tags : false;
	}
}

if ( ! function_exists( 'get_tag_link' ) ) {
	/**
	 * Stub for WordPress get_tag_link().
	 *
	 * @param int $term_id Tag term ID.
	 * @return string Tag archive URL.
	 */
	function get_tag_link( $term_id ) {
		return 'https://example.org/tag/' . (int) $term_id . '/';
	}
}

if ( ! function_exists( 'has_excerpt' ) ) {
	/**
	 * Stub for WordPress has_excerpt().
	 *
	 * @param int $post_id Post ID.
	 * @return bool Whether explicit post excerpt exists.
	 */
	function has_excerpt( $post_id = 0 ) {
		return ! empty( $GLOBALS['gslider_card_test_excerpts'][ (int) $post_id ] );
	}
}

if ( ! function_exists( 'get_the_excerpt' ) ) {
	/**
	 * Stub for WordPress get_the_excerpt().
	 *
	 * @param int $post_id Post ID.
	 * @return string Excerpt or fallback auto-excerpt from content.
	 */
	function get_the_excerpt( $post_id = 0 ) {
		$id = (int) $post_id;
		if ( ! empty( $GLOBALS['gslider_card_test_excerpts'][ $id ] ) ) {
			return (string) $GLOBALS['gslider_card_test_excerpts'][ $id ];
		}
		return (string) ( $GLOBALS['gslider_card_test_contents'][ $id ] ?? '' );
	}
}

if ( ! function_exists( 'get_the_content' ) ) {
	/**
	 * Stub for WordPress get_the_content().
	 *
	 * @param string|null $more_link_text Unused.
	 * @param bool        $strip_teaser   Unused.
	 * @param int|null    $post           Post ID.
	 * @return string Post body content.
	 */
	function get_the_content( $more_link_text = null, $strip_teaser = false, $post = null ) {
		unset( $more_link_text, $strip_teaser );
		$id = null !== $post ? (int) $post : (int) ( $GLOBALS['gslider_card_active_post_id'] ?? 0 );
		return (string) ( $GLOBALS['gslider_card_test_contents'][ $id ] ?? '' );
	}
}

if ( ! function_exists( 'wp_trim_words' ) ) {
	/**
	 * Stub for WordPress wp_trim_words().
	 *
	 * @param string $text      Input text.
	 * @param int    $num_words Maximum words.
	 * @param string $more      Suffix appended when truncated.
	 * @return string Trimmed string.
	 */
	function wp_trim_words( $text, $num_words = 55, $more = '...' ) {
		$words = preg_split( '/\s+/', trim( (string) $text ) );
		if ( ! is_array( $words ) || 1 === count( $words ) && '' === $words[0] ) {
			return '';
		}
		if ( count( $words ) > (int) $num_words ) {
			return implode( ' ', array_slice( $words, 0, (int) $num_words ) ) . (string) $more;
		}
		return implode( ' ', $words );
	}
}

if ( ! function_exists( 'has_post_thumbnail' ) ) {
	/**
	 * Stub for WordPress has_post_thumbnail().
	 *
	 * @param int $post_id Post ID.
	 * @return bool Whether post has featured image.
	 */
	function has_post_thumbnail( $post_id = 0 ) {
		return ! empty( $GLOBALS['gslider_card_test_has_thumb'][ (int) $post_id ] );
	}
}

if ( ! function_exists( 'the_post_thumbnail' ) ) {
	/**
	 * Stub for WordPress the_post_thumbnail().
	 *
	 * @param string       $size Image size.
	 * @param array|string $attr HTML attributes.
	 * @return void
	 */
	function the_post_thumbnail( $size = 'post-thumbnail', $attr = [] ) {
		$id      = (int) ( $GLOBALS['gslider_card_active_post_id'] ?? 0 );
		$loading = is_array( $attr ) && isset( $attr['loading'] ) ? (string) $attr['loading'] : 'lazy';
		$alt     = is_array( $attr ) && isset( $attr['alt'] ) ? (string) $attr['alt'] : '';
		echo '<img class="wp-post-image size-' . esc_attr( (string) $size ) . '" src="https://example.org/featured-' . (int) $id . '.jpg" alt="' . esc_attr( $alt ) . '" loading="' . esc_attr( $loading ) . '" />'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}

if ( ! function_exists( 'wp_get_attachment_image' ) ) {
	/**
	 * Stub for WordPress wp_get_attachment_image().
	 *
	 * @param int          $attachment_id Attachment ID.
	 * @param string|array $size          Image size.
	 * @param bool         $icon          Unused.
	 * @param array|string $attr          HTML attributes.
	 * @return string Image markup or empty string.
	 */
	function wp_get_attachment_image( $attachment_id, $size = 'thumbnail', $icon = false, $attr = [] ) {
		unset( $size, $icon );
		$id = (int) $attachment_id;
		if ( $id <= 0 || empty( $GLOBALS['gslider_card_test_attachments'][ $id ] ) ) {
			return '';
		}
		$class   = is_array( $attr ) && isset( $attr['class'] ) ? (string) $attr['class'] : 'attachment-image';
		$loading = is_array( $attr ) && isset( $attr['loading'] ) ? (string) $attr['loading'] : 'lazy';
		$alt     = is_array( $attr ) && isset( $attr['alt'] ) ? (string) $attr['alt'] : '';
		return '<img class="' . esc_attr( $class ) . '" src="' . esc_url( (string) $GLOBALS['gslider_card_test_attachments'][ $id ] ) . '" alt="' . esc_attr( $alt ) . '" loading="' . esc_attr( $loading ) . '" />';
	}
}

if ( ! function_exists( 'get_the_author' ) ) {
	/**
	 * Stub for WordPress get_the_author().
	 *
	 * @return string Author display name.
	 */
	function get_the_author() {
		$id = (int) ( $GLOBALS['gslider_card_active_post_id'] ?? 0 );
		return (string) ( $GLOBALS['gslider_card_test_authors'][ $id ] ?? 'Editorial Author' );
	}
}

if ( ! function_exists( 'get_the_author_meta' ) ) {
	/**
	 * Stub for WordPress get_the_author_meta().
	 *
	 * @param string $field Field name.
	 * @return int|string Author field value.
	 */
	function get_the_author_meta( $field = '' ) {
		if ( 'ID' === $field ) {
			$id = (int) ( $GLOBALS['gslider_card_active_post_id'] ?? 0 );
			return (int) ( $GLOBALS['gslider_card_test_author_ids'][ $id ] ?? 7 );
		}
		return '';
	}
}

if ( ! function_exists( 'get_avatar_url' ) ) {
	/**
	 * Stub for WordPress get_avatar_url().
	 *
	 * @param int   $id_or_email User ID.
	 * @param array $args        Avatar query args.
	 * @return string|false Avatar URL or false.
	 */
	function get_avatar_url( $id_or_email, $args = [] ) {
		unset( $args );
		$uid = (int) $id_or_email;
		if ( array_key_exists( $uid, $GLOBALS['gslider_card_test_avatar_urls'] ?? [] ) ) {
			return $GLOBALS['gslider_card_test_avatar_urls'][ $uid ];
		}
		return 'https://example.org/avatar-' . $uid . '.png';
	}
}

if ( ! function_exists( 'get_the_date' ) ) {
	/**
	 * Stub for WordPress get_the_date().
	 *
	 * @param string      $format Date format.
	 * @param int|WP_Post $post   Post ID.
	 * @return string Formatted date.
	 */
	function get_the_date( $format = '', $post = null ) {
		$id = is_object( $post ) && isset( $post->ID ) ? (int) $post->ID : (int) $post;
		if ( 'c' === $format ) {
			return '2026-11-10T10:00:00+00:00';
		}
		if ( 'Y-m-d' === $format ) {
			return '2026-11-10';
		}
		return (string) ( $GLOBALS['gslider_card_test_dates'][ $id ] ?? 'November 10, 2026' );
	}
}

if ( ! function_exists( 'get_post_field' ) ) {
	/**
	 * Stub for WordPress get_post_field().
	 *
	 * @param string $field Field name.
	 * @param int    $post  Post ID.
	 * @return string Field value.
	 */
	function get_post_field( $field, $post = 0 ) {
		if ( 'post_content' === $field ) {
			return (string) ( $GLOBALS['gslider_card_test_contents'][ (int) $post ] ?? '' );
		}
		return '';
	}
}

if ( ! function_exists( 'get_comments_number' ) ) {
	/**
	 * Stub for WordPress get_comments_number().
	 *
	 * @param int $post_id Post ID.
	 * @return int Comment count.
	 */
	function get_comments_number( $post_id = 0 ) {
		return (int) ( $GLOBALS['gslider_card_test_comment_counts'][ (int) $post_id ] ?? 0 );
	}
}

if ( ! function_exists( 'get_comments_link' ) ) {
	/**
	 * Stub for WordPress get_comments_link().
	 *
	 * @param int $post_id Post ID.
	 * @return string Comments permalink.
	 */
	function get_comments_link( $post_id = 0 ) {
		$id = (int) $post_id;
		return (string) ( $GLOBALS['gslider_card_test_comment_links'][ $id ] ?? 'https://example.org/post-' . $id . '/#comments' );
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
require_once ABSPATH . 'includes/Blocks/PostCarousel/CardMarkupBuilder.php';

use GSlider\Blocks\PostCarousel\CardMarkupBuilder;

/**
 * Test class for GSlider\Blocks\PostCarousel\CardMarkupBuilder.
 *
 * @package GSlider\Tests\Blocks\PostCarousel
 */
class CardMarkupBuilderTest {

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
	 * Resets global test fixtures before each test method.
	 *
	 * @return void
	 */
	private function reset_state(): void {
		$GLOBALS['gslider_card_active_post_id']      = 0;
		$GLOBALS['gslider_card_test_permalinks']     = [];
		$GLOBALS['gslider_card_test_titles']         = [];
		$GLOBALS['gslider_card_test_categories']     = [];
		$GLOBALS['gslider_card_test_tags']           = [];
		$GLOBALS['gslider_card_test_excerpts']       = [];
		$GLOBALS['gslider_card_test_contents']       = [];
		$GLOBALS['gslider_card_test_has_thumb']      = [];
		$GLOBALS['gslider_card_test_attachments']    = [];
		$GLOBALS['gslider_card_test_authors']        = [];
		$GLOBALS['gslider_card_test_author_ids']     = [];
		$GLOBALS['gslider_card_test_avatar_urls']    = [];
		$GLOBALS['gslider_card_test_dates']          = [];
		$GLOBALS['gslider_card_test_comment_counts'] = [];
		$GLOBALS['gslider_card_test_comment_links']  = [];
	}

	/**
	 * Runs all unit test cases for CardMarkupBuilder.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		fwrite( STDOUT, "=== GSlider PostCarousel CardMarkupBuilder Unit Tests ===\n\n" );

		$this->test_class_exists();
		$this->test_build_excerpt_sources_and_limits();
		$this->test_render_card_layout_modes_ordering_and_clickable_links();
		$this->test_render_card_taxonomy_cap_overlay_and_fallback_thumbnails();
		$this->test_render_card_meta_separators_readmore_and_xss_escaping();

		fwrite( STDOUT, "\nAll CardMarkupBuilder unit tests passed successfully!\n" );
	}

	/**
	 * Verifies CardMarkupBuilder class loads cleanly.
	 *
	 * @return void
	 */
	public function test_class_exists(): void {
		$this->assert_true( class_exists( CardMarkupBuilder::class ), 'CardMarkupBuilder class exists' );
	}

	/**
	 * Verifies build_excerpt() sources, shortcode/HTML stripping, and word/character limits.
	 *
	 * @return void
	 */
	public function test_build_excerpt_sources_and_limits(): void {
		$this->reset_state();

		$GLOBALS['gslider_card_test_contents'][10] = '<p>[gallery ids="1,2"]Alpha beta gamma delta epsilon zeta eta</p>';

		// 'excerpt' source returns empty string when explicit excerpt is absent.
		$this->assert_same(
			'',
			CardMarkupBuilder::build_excerpt(
				10,
				[
					'post_excerpt_source'       => 'excerpt',
					'enable_post_excerpt_limit' => true,
				]
			),
			"build_excerpt() returns empty string for source 'excerpt' when post has no explicit excerpt"
		);

		// Explicit excerpt with character limit trims multibyte cleanly.
		$GLOBALS['gslider_card_test_excerpts'][10] = 'Custom concise summary here';
		$this->assert_same(
			'Custom con...',
			CardMarkupBuilder::build_excerpt(
				10,
				[
					'post_excerpt_source'       => 'excerpt',
					'enable_post_excerpt_limit' => true,
					'post_excerpt_limit_type'   => 'characters',
					'post_excerpt_limit'        => [ 'Desktop' => 10 ],
					'post_excerpt_limit_suffix' => '...',
				]
			),
			'build_excerpt() applies character truncation with suffix on explicit excerpt'
		);

		// Content source strips shortcodes and HTML tags, respects word limits and unlimited mode.
		$this->assert_same(
			'Alpha beta gamma...',
			CardMarkupBuilder::build_excerpt(
				10,
				[
					'post_excerpt_source'       => 'content',
					'enable_post_excerpt_limit' => true,
					'post_excerpt_limit_type'   => 'words',
					'post_excerpt_limit'        => [ 'Desktop' => 3 ],
					'post_excerpt_limit_suffix' => '...',
				]
			),
			'build_excerpt() strips HTML/shortcodes and trims words for content source'
		);

		$this->assert_same(
			'Alpha beta gamma delta epsilon zeta eta',
			CardMarkupBuilder::build_excerpt(
				10,
				[
					'post_excerpt_source'       => 'content',
					'enable_post_excerpt_limit' => false,
				]
			),
			'build_excerpt() returns full stripped text when limit is disabled'
		);
	}

	/**
	 * Verifies layout modes (horizontal, timeline), contentOrder, and clickable card links.
	 *
	 * @return void
	 */
	public function test_render_card_layout_modes_ordering_and_clickable_links(): void {
		$this->reset_state();

		$GLOBALS['gslider_card_active_post_id']    = 21;
		$GLOBALS['gslider_card_test_titles'][21]   = 'Timeline Milestone Article';
		$GLOBALS['gslider_card_test_dates'][21]    = 'November 10, 2026';
		$GLOBALS['gslider_card_test_contents'][21] = 'Milestone content summary.';

		// Horizontal layout with missing thumbnail adds has-no-image and media-position-right; adds card-link when title link absent.
		$horizontal_html = CardMarkupBuilder::render_card(
			21,
			[
				'post_layout_mode'           => 'horizontal',
				'horizontal_media_position'  => 'right',
				'enable_fallback_thumbnail'  => false,
				'any_image_enabled'          => true,
				'any_title_enabled'          => true,
				'enable_post_title_link'     => false,
				'all_title_enabled'          => false,
				'enable_card_clickable_link' => true,
				'content_order'              => [ 'thumbnail', 'title', 'excerpt' ],
				'any_excerpt_enabled'        => true,
			]
		);

		$this->assert_true( false !== strpos( $horizontal_html, 'media-position-right' ), 'render_card() adds media-position-right for horizontal layout' );
		$this->assert_true( false !== strpos( $horizontal_html, 'has-no-image' ), 'render_card() adds has-no-image for horizontal layout when image omitted' );
		$this->assert_true( false !== strpos( $horizontal_html, 'is-clickable' ), 'render_card() adds is-clickable when enable_card_clickable_link is true' );
		$this->assert_true( false !== strpos( $horizontal_html, 'class="gslider-post-carousel-card-link"' ), 'render_card() renders standalone card-link when title link is absent' );

		// Timeline layout with all-devices title link suppresses duplicate standalone card-link and prepends timeline node.
		$GLOBALS['gslider_card_test_has_thumb'][21] = true;
		$timeline_html                              = CardMarkupBuilder::render_card(
			21,
			[
				'post_layout_mode'           => 'timeline',
				'timeline_date_position'     => 'below',
				'equal_height'               => true,
				'enable_tilt'                => true,
				'has_entrance_animation'     => true,
				'card_entrance_animation'    => 'fadeInUp',
				'any_image_enabled'          => true,
				'any_title_enabled'          => true,
				'enable_post_title_link'     => true,
				'all_title_enabled'          => true,
				'enable_card_clickable_link' => true,
				'content_order'              => [ 'title', 'thumbnail', 'excerpt' ],
				'any_excerpt_enabled'        => true,
			]
		);

		$this->assert_true( false !== strpos( $timeline_html, 'is-timeline-card' ), 'render_card() adds is-timeline-card in timeline mode' );
		$this->assert_true( false !== strpos( $timeline_html, 'class="gslider-timeline-node date-position-below"' ), 'render_card() renders timeline milestone header below position' );
		$this->assert_true( false !== strpos( $timeline_html, 'has-equal-height' ) && false !== strpos( $timeline_html, 'gslider-has-tilt' ), 'render_card() appends equal-height and tilt classes' );
		$this->assert_true( false === strpos( $timeline_html, 'gslider-post-carousel-card-link' ), 'render_card() omits standalone card-link when title already links across all devices' );
		$this->assert_true(
			strpos( $timeline_html, 'gslider-post-carousel-image' ) < strpos( $timeline_html, 'gslider-post-carousel-body' ),
			'render_card() renders image container before unified body in timeline layout'
		);
	}

	/**
	 * Verifies taxonomy max badge cap/overlay vs inline fallback and thumbnail fallback chain.
	 *
	 * @return void
	 */
	public function test_render_card_taxonomy_cap_overlay_and_fallback_thumbnails(): void {
		$this->reset_state();

		$GLOBALS['gslider_card_active_post_id']     = 31;
		$GLOBALS['gslider_card_test_titles'][31]    = 'Fallback & Taxonomy Card';
		$GLOBALS['gslider_card_test_categories'][31] = [
			(object) [ 'term_id' => 1, 'name' => 'News' ],
			(object) [ 'term_id' => 2, 'name' => 'Tech' ],
			(object) [ 'term_id' => 3, 'name' => 'Design' ],
			(object) [ 'term_id' => 4, 'name' => 'WordPress' ],
			(object) [ 'term_id' => 5, 'name' => 'AI' ],
			(object) [ 'term_id' => 6, 'name' => 'Overflow' ],
			(object) [ 'term_id' => 7, 'name' => 'Extra' ],
		];

		// 1. Attachment fallback ID takes precedence over raw fallback URL, and max badge count clamps at 5 with +2 overflow badge.
		$GLOBALS['gslider_card_test_attachments'][55] = 'https://example.org/attachment-fallback-55.jpg';

		$attachment_html = CardMarkupBuilder::render_card(
			31,
			[
				'any_image_enabled'                 => true,
				'enable_fallback_thumbnail'         => true,
				'fallback_thumbnail_id'             => 55,
				'fallback_thumbnail_url'            => 'https://example.org/url-fallback.jpg',
				'any_taxonomy_enabled'              => true,
				'post_taxonomy_display'             => 'category',
				'taxonomy_max_count'                => 10,
				'enable_taxonomy_badge_overlay'     => true,
				'taxonomy_badge_overlay_visibility' => 'always',
				'taxonomy_badge_overlay_position'   => 'top-left',
				'content_order'                     => [ 'thumbnail', 'categories', 'title' ],
			]
		);

		$this->assert_true(
			false !== strpos( $attachment_html, 'src="https://example.org/attachment-fallback-55.jpg"' ),
			'render_card() prioritizes attachment fallback_thumbnail_id over raw fallback URL'
		);
		$this->assert_true( false !== strpos( $attachment_html, 'class="gslider-taxonomy-badge-overlay gslider-badge-visibility-always gslider-badge-position-top-left"' ), 'render_card() places taxonomy badges in overlay when image is rendered' );
		$this->assert_true( 1 === substr_count( $attachment_html, 'gslider-post-carousel-categories' ), 'render_card() does not duplicate category badges inline when overlay is active' );
		$this->assert_true( false !== strpos( $attachment_html, '2 more categories' ) && false !== strpos( $attachment_html, '>+2<' ), 'render_card() clamps taxonomy_max_count to 5 and outputs +2 overflow badge' );

		// 2. Unsafe javascript: fallback URL resolves to SVG placeholder; disabled image renders taxonomy badges inline.
		$xss_url_html = CardMarkupBuilder::render_card(
			31,
			[
				'any_image_enabled'                 => true,
				'enable_fallback_thumbnail'         => true,
				'fallback_thumbnail_id'             => 0,
				'fallback_thumbnail_url'            => 'javascript:alert(1)',
				'any_taxonomy_enabled'              => true,
				'taxonomy_max_count'                => 2,
				'enable_taxonomy_badge_overlay'     => true,
				'taxonomy_badge_overlay_visibility' => 'always',
				'taxonomy_badge_overlay_position'   => 'top-left',
				'content_order'                     => [ 'thumbnail', 'categories' ],
			]
		);

		$this->assert_true( false === stripos( $xss_url_html, 'javascript:' ), 'render_card() strips javascript: protocol from fallback_thumbnail_url' );
		$this->assert_true( false !== strpos( $xss_url_html, 'class="gslider-post-carousel-placeholder-svg"' ), 'render_card() falls back to placeholder SVG when fallback URL is unsafe' );

		$inline_tax_html = CardMarkupBuilder::render_card(
			31,
			[
				'any_image_enabled'             => false,
				'any_taxonomy_enabled'          => true,
				'taxonomy_max_count'            => 1,
				'enable_taxonomy_badge_overlay' => true,
				'content_order'                 => [ 'thumbnail', 'categories' ],
			]
		);

		$this->assert_true( false === strpos( $inline_tax_html, 'gslider-taxonomy-badge-overlay' ), 'render_card() skips overlay wrapper when no image is rendered' );
		$this->assert_true( false !== strpos( $inline_tax_html, 'gslider-post-carousel-categories' ), 'render_card() promotes categories inline inside body when thumbnail is absent' );
	}

	/**
	 * Verifies meta parts, separators, Read More link attributes, and XSS escaping.
	 *
	 * @return void
	 */
	public function test_render_card_meta_separators_readmore_and_xss_escaping(): void {
		$this->reset_state();

		$GLOBALS['gslider_card_active_post_id']         = 41;
		$GLOBALS['gslider_card_test_titles'][41]        = 'Card <script>xss()</script> Headline';
		$GLOBALS['gslider_card_test_authors'][41]       = '<b>Jane</b>';
		$GLOBALS['gslider_card_test_author_ids'][41]    = 19;
		$GLOBALS['gslider_card_test_avatar_urls'][19]   = false;
		$GLOBALS['gslider_card_test_contents'][41]      = str_repeat( 'word ', 600 );
		$GLOBALS['gslider_card_test_comment_counts'][41] = 1;
		$GLOBALS['gslider_card_test_comment_links'][41] = 'javascript:alert(7)';

		$card_html = CardMarkupBuilder::render_card(
			41,
			[
				'content_order'                => [ 'title', 'meta', 'readmore' ],
				'any_title_enabled'            => true,
				'post_title_html_tag'          => 'h2',
				'enable_post_title_link'       => true,
				'post_title_link_target'       => true,
				'post_title_link_nofollow'     => true,
				'post_title_link_sponsored'    => true,
				'any_meta_enabled'             => true,
				'any_author_enabled'           => true,
				'any_avatar_enabled'           => true,
				'any_date_enabled'             => true,
				'date_format'                  => 'relative',
				'show_reading_time'            => true,
				'show_comment_count'           => true,
				'meta_separator'               => 'pipe',
				'any_read_more_button_enabled' => true,
				'read_more_button_link_type'   => 'custom',
				'read_more_button_link'        => 'https://example.org/docs?a=1&b=2',
				'read_more_button_target_link' => true,
				'read_more_button_nofollow'    => true,
				'read_more_button_sponsored'   => false,
				'read_more_button_text'        => 'Read <Story>',
				'has_read_more_image_icon'     => true,
				'read_more_button_icon_img_url' => 'https://example.org/arrow.svg',
				'read_more_button_icon_img_alt' => 'Go "Right"',
				'read_more_button_icon_position' => 'left',
			]
		);

		$this->assert_true( false !== strpos( $card_html, '<h2 class="gslider-post-carousel-title">' ), 'render_card() uses configured allowed title tag h2' );
		$this->assert_true( false === strpos( $card_html, '<script>xss()</script>' ), 'render_card() escapes script tags in post title' );
		$this->assert_true( false !== strpos( $card_html, 'rel="noopener noreferrer nofollow sponsored"' ), 'render_card() emits full target+nofollow+sponsored rel attributes on title link' );
		$this->assert_true( false !== strpos( $card_html, 'class="gslider-post-author-avatar-placeholder"' ), 'render_card() outputs SVG placeholder when author avatar URL is false' );
		$this->assert_true( false !== strpos( $card_html, '<div class="gslider-post-author">&lt;b&gt;Jane&lt;/b&gt;</div>' ), 'render_card() escapes author display name' );
		$this->assert_true( false !== strpos( $card_html, 'ago</time>' ), 'render_card() formats relative date string when date_format is relative' );
		$this->assert_true( false !== strpos( $card_html, '<span class="gslider-post-reading-time">3 min read</span>' ), 'render_card() renders reading time inside meta' );
		$this->assert_true( false !== strpos( $card_html, '>1 comment</a>' ), 'render_card() uses singular comment label when comment count is 1' );
		$this->assert_true( false === stripos( $card_html, 'javascript:' ), 'render_card() strips javascript: protocol from comment link URL' );
		$this->assert_true( false !== strpos( $card_html, '<span class="gslider-meta-sep" aria-hidden="true">|</span>' ), 'render_card() joins metadata elements with pipe separator' );
		$this->assert_true( false !== strpos( $card_html, 'href="https://example.org/docs?a=1&amp;b=2" target="_blank" rel="noopener noreferrer nofollow"' ), 'render_card() renders escaped custom Read More link and rel tokens' );
		$this->assert_true( false !== strpos( $card_html, '<span class="gslider-readmore-text">Read &lt;Story&gt;</span>' ), 'render_card() escapes Read More button text' );
		$this->assert_true(
			strpos( $card_html, 'class="gslider-readmore-icon-wrap"' ) < strpos( $card_html, 'class="gslider-readmore-text"' ),
			'render_card() places Read More icon before label when icon position is left'
		);
	}
}

try {
	( new CardMarkupBuilderTest() )->run_all_tests();
} finally {
	restore_error_handler();
}
