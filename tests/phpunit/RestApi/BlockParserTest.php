<?php
/**
 * Unit tests for GSlider\RestApi\BlockParser.
 *
 * Verifies that:
 * 1. normalize_block() accurately converts Gutenberg block comments and attributes into clean slide arrays.
 * 2. Default schema values are populated when omitted by the editor.
 * 3. Stored attribute overrides (e.g. false booleans, custom objects) are preserved without being overwritten.
 * 4. Image, Logo, Testimonial, and Flexi-Content slide structures are parsed with appropriate fields.
 * 5. blockStyle CSS is strictly sanitized to prevent arbitrary code injection for REST consumers.
 * 6. Flexi Content slides keep their CSS in REST output (slides[].css and <style> in innerHtml).
 * 7. Flexi Content vertical direction reaches swiperConfig and turns off autoHeight.
 * 8. Dynamic observers (observer, observeParents, resizeObserver) are passed in swiperConfig.
 * 9. Flexi Content grabCursor propagates only when enableGrabCursor and allowTouchMove are enabled.
 * 10. Post Carousel defaults, Swiper config, sticky overflow cap, and queried post slides normalize cleanly.
 * 11. Post Carousel preserves enclosing host post context across multiple carousels and restores prior post state.
 * 12. Reusable block (synced pattern) expansion only happens for published, unprotected, or readable wp_block posts.
 *
 * @package GSlider\Tests\RestApi
 */

if ( ! function_exists( 'get_the_title' ) ) {
	/**
	 * Stub for WordPress get_the_title() supporting WP_Post instances and integer IDs.
	 *
	 * @param int|WP_Post $post Post ID or post object.
	 * @return string Post title.
	 */
	function get_the_title( $post = 0 ) {
		if ( is_object( $post ) && isset( $post->post_title ) ) {
			return (string) $post->post_title;
		}
		$post_id = is_int( $post ) ? $post : ( is_numeric( $post ) ? (int) $post : 0 );
		if ( $post_id > 0 && ! empty( $GLOBALS['gslider_test_bp_render_posts'] ) ) {
			foreach ( $GLOBALS['gslider_test_bp_render_posts'] as $candidate ) {
				if ( (int) $candidate->ID === $post_id ) {
					return (string) $candidate->post_title;
				}
			}
		}
		return ! empty( $GLOBALS['gslider_test_bp_current_post'] )
			? (string) $GLOBALS['gslider_test_bp_current_post']->post_title
			: '';
	}
}

if ( ! function_exists( 'parse_blocks' ) ) {
	/**
	 * Stub for WordPress parse_blocks() supporting overridden test block fixtures.
	 *
	 * @param string $content Raw post content containing serialized blocks.
	 * @return array Parsed block structure list.
	 */
	function parse_blocks( $content ) {
		if ( isset( $GLOBALS['gslider_test_bp_parsed_blocks'] ) && is_array( $GLOBALS['gslider_test_bp_parsed_blocks'] ) ) {
			return $GLOBALS['gslider_test_bp_parsed_blocks'];
		}
		if ( false !== strpos( (string) $content, 'wp:gslider-blocks/image-slider' ) ) {
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
		if ( preg_match( '/<!--\s*wp:block\s+(\{.*?\})\s*\/-->/', (string) $content, $matches ) ) {
			$attrs   = [];
			$decoded = json_decode( $matches[1], true );
			if ( is_array( $decoded ) ) {
				$attrs = $decoded;
			}
			return [
				[
					'blockName'   => 'core/block',
					'attrs'       => $attrs,
					'innerBlocks' => [],
				],
			];
		}
		return [];
	}
}

require_once dirname( __DIR__ ) . '/bootstrap.php';

if ( ! function_exists( 'sanitize_text_field' ) ) {
	function sanitize_text_field( $text ) {
		return is_string( $text ) ? trim( wp_strip_all_tags( $text ) ) : $text;
	}
}

if ( ! function_exists( 'sanitize_key' ) ) {
	function sanitize_key( $key ) {
		$key = strtolower( (string) $key );
		return preg_replace( '/[^a-z0-9_\-]/', '', $key );
	}
}

if ( ! function_exists( 'wp_kses_post' ) ) {
	function wp_kses_post( $text ) {
		return (string) $text;
	}
}

if ( ! function_exists( 'render_block' ) ) {
	function render_block( $block ) {
		return '<p>flexi</p>';
	}
}

if ( ! function_exists( 'wp_strip_all_tags' ) ) {
	function wp_strip_all_tags( $text ) {
		return trim( strip_tags( preg_replace( '@<(script|style)[^>]*?>.*?</\\1>@si', '', (string) $text ) ) );
	}
}

set_error_handler(
	static function ( $severity, $message, $file, $line ) {
		fwrite( STDERR, "FAIL: PHP warning {$message} in {$file}:{$line}\n" );
		exit( 1 );
	}
);

require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Classes/SupportSVG.php';
require_once ABSPATH . 'includes/Utils/CssSanitizer.php';
require_once ABSPATH . 'includes/Utils/Helper.php';
require_once ABSPATH . 'includes/Classes/StyleGenerator.php';
require_once ABSPATH . 'includes/Blocks/PostCarousel/NavigationBuilder.php';
require_once ABSPATH . 'includes/Blocks/PostCarousel/CardMarkupBuilder.php';
require_once ABSPATH . 'includes/Blocks/PostCarousel/PostCarouselRenderer.php';
require_once ABSPATH . 'includes/RestApi/BlockParser.php';

$GLOBALS['gslider_test_bp_render_posts']         = [];
$GLOBALS['gslider_test_bp_current_post']         = null;
$GLOBALS['gslider_test_bp_thumbnails']           = [];
$GLOBALS['gslider_test_bp_thumb_urls']           = [];
$GLOBALS['gslider_test_bp_thumb_alts']           = [];
$GLOBALS['gslider_test_bp_excerpts']             = [];
$GLOBALS['gslider_test_bp_categories']           = [];
$GLOBALS['gslider_test_bp_tags']                 = [];
$GLOBALS['gslider_test_bp_sticky_extra']         = 0;
$GLOBALS['gslider_test_bp_queries']              = [];
$GLOBALS['gslider_test_bp_post_types']           = [];
$GLOBALS['gslider_test_bp_related_cats']         = [];
$GLOBALS['gslider_test_bp_related_tags']         = [];
$GLOBALS['gslider_test_bp_parsed_blocks']        = null;
$GLOBALS['gslider_test_bp_setup_postdata_calls'] = [];

if ( ! function_exists( 'sanitize_html_class' ) ) {
	/**
	 * Stub for WordPress sanitize_html_class().
	 *
	 * @param string $classname Raw CSS class token.
	 * @param string $fallback  Fallback class token when sanitized output is empty.
	 * @return string Sanitized CSS class name.
	 */
	function sanitize_html_class( $classname, $fallback = '' ) {
		$sanitized = preg_replace( '|%[a-fA-F0-9][a-fA-F0-9]|', '', (string) $classname );
		$sanitized = preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $sanitized );
		if ( '' === $sanitized && '' !== $fallback ) {
			return sanitize_html_class( $fallback );
		}
		return (string) $sanitized;
	}
}

if ( ! function_exists( 'post_type_exists' ) ) {
	/**
	 * Stub for WordPress post_type_exists().
	 *
	 * @param string $post_type Post type slug.
	 * @return bool True when post type is registered in the test harness.
	 */
	function post_type_exists( $post_type ) {
		return in_array( $post_type, [ 'post', 'page', 'portfolio' ], true );
	}
}

if ( ! function_exists( 'is_post_type_viewable' ) ) {
	/**
	 * Stub for WordPress is_post_type_viewable().
	 *
	 * @param string $post_type Post type slug.
	 * @return bool True when post type is publicly viewable in the test harness.
	 */
	function is_post_type_viewable( $post_type ) {
		return in_array( $post_type, [ 'post', 'page', 'portfolio' ], true );
	}
}

if ( ! function_exists( 'get_the_ID' ) ) {
	/**
	 * Stub for WordPress get_the_ID().
	 *
	 * @return int Active loop post ID, falling back to `$GLOBALS['post']`, or `0`.
	 */
	function get_the_ID() {
		if ( ! empty( $GLOBALS['gslider_test_bp_current_post'] ) && isset( $GLOBALS['gslider_test_bp_current_post']->ID ) ) {
			return (int) $GLOBALS['gslider_test_bp_current_post']->ID;
		}
		if ( isset( $GLOBALS['post'] ) && $GLOBALS['post'] instanceof WP_Post ) {
			return (int) $GLOBALS['post']->ID;
		}
		return 0;
	}
}

if ( ! function_exists( 'get_post_type' ) ) {
	/**
	 * Stub for WordPress get_post_type().
	 *
	 * @param int|WP_Post|null $post Post ID or object.
	 * @return string|false Resolved post type slug, or `'post'` fallback.
	 */
	function get_post_type( $post = null ) {
		$post_id = $post instanceof WP_Post ? (int) $post->ID : (int) $post;
		if ( $post_id > 0 && isset( $GLOBALS['gslider_test_bp_post_types'][ $post_id ] ) ) {
			return (string) $GLOBALS['gslider_test_bp_post_types'][ $post_id ];
		}
		return 'post';
	}
}

if ( ! function_exists( 'wp_get_post_categories' ) ) {
	/**
	 * Stub for WordPress wp_get_post_categories().
	 *
	 * @param int   $post_id Post ID.
	 * @param array $args    Optional term query arguments.
	 * @return int[] Assigned category term IDs.
	 */
	function wp_get_post_categories( $post_id = 0, $args = [] ) {
		unset( $args );
		return $GLOBALS['gslider_test_bp_related_cats'][ (int) $post_id ] ?? [];
	}
}

if ( ! function_exists( 'wp_get_post_terms' ) ) {
	/**
	 * Stub for WordPress wp_get_post_terms().
	 *
	 * @param int    $post_id  Post ID.
	 * @param string $taxonomy Taxonomy slug.
	 * @param array  $args     Optional term query arguments.
	 * @return int[] Assigned taxonomy term IDs.
	 */
	function wp_get_post_terms( $post_id = 0, $taxonomy = 'post_tag', $args = [] ) {
		unset( $taxonomy, $args );
		return $GLOBALS['gslider_test_bp_related_tags'][ (int) $post_id ] ?? [];
	}
}

if ( ! function_exists( 'is_wp_error' ) ) {
	/**
	 * Stub for WordPress is_wp_error().
	 *
	 * @param mixed $thing Candidate value.
	 * @return bool True when `$thing` is a `WP_Error` instance.
	 */
	function is_wp_error( $thing ) {
		return $thing instanceof WP_Error;
	}
}

if ( ! function_exists( 'has_excerpt' ) ) {
	/**
	 * Stub for WordPress has_excerpt().
	 *
	 * @param int|WP_Post $post Post ID or object.
	 * @return bool True when explicit excerpt exists in the test map.
	 */
	function has_excerpt( $post = 0 ) {
		return ! empty( $GLOBALS['gslider_test_bp_excerpts'][ (int) $post ] );
	}
}

if ( ! function_exists( 'get_the_excerpt' ) ) {
	/**
	 * Stub for WordPress get_the_excerpt().
	 *
	 * @param int|WP_Post|null $post Optional post ID or object.
	 * @return string Explicit or fallback post content string.
	 */
	function get_the_excerpt( $post = null ) {
		$id = is_int( $post ) ? $post : get_the_ID();
		if ( ! empty( $GLOBALS['gslider_test_bp_excerpts'][ $id ] ) ) {
			return (string) $GLOBALS['gslider_test_bp_excerpts'][ $id ];
		}
		return $GLOBALS['gslider_test_bp_current_post'] ? (string) $GLOBALS['gslider_test_bp_current_post']->post_content : '';
	}
}

if ( ! function_exists( 'get_the_content' ) ) {
	/**
	 * Stub for WordPress get_the_content().
	 *
	 * @param string|null      $more_link_text Optional read-more link text.
	 * @param bool             $strip_teaser   Whether to strip teaser text.
	 * @param int|WP_Post|null $post           Optional post ID or object.
	 * @return string Active post content string.
	 */
	function get_the_content( $more_link_text = null, $strip_teaser = false, $post = null ) {
		unset( $more_link_text, $strip_teaser, $post );
		return $GLOBALS['gslider_test_bp_current_post'] ? (string) $GLOBALS['gslider_test_bp_current_post']->post_content : '';
	}
}

if ( ! function_exists( 'strip_shortcodes' ) ) {
	/**
	 * Stub for WordPress strip_shortcodes().
	 *
	 * @param string $content Raw post content.
	 * @return string Content with bracketed shortcodes removed.
	 */
	function strip_shortcodes( $content ) {
		return (string) preg_replace( '/\[[^\]]+\]/', '', (string) $content );
	}
}

if ( ! function_exists( 'wp_trim_words' ) ) {
	/**
	 * Stub for WordPress wp_trim_words().
	 *
	 * @param string      $text      Input text.
	 * @param int         $num_words Maximum word count.
	 * @param string|null $more      Trailing truncation indicator.
	 * @return string Trimmed text string.
	 */
	function wp_trim_words( $text, $num_words = 55, $more = null ) {
		if ( null === $more ) {
			$more = '&hellip;';
		}
		$words = preg_split( '/[\n\r\t ]+/', trim( (string) $text ), $num_words + 1, PREG_SPLIT_NO_EMPTY );
		if ( count( $words ) > $num_words ) {
			array_pop( $words );
			return implode( ' ', $words ) . $more;
		}
		return implode( ' ', $words );
	}
}

if ( ! function_exists( 'get_permalink' ) ) {
	/**
	 * Stub for WordPress get_permalink().
	 *
	 * @param int|WP_Post $post Post ID or object.
	 * @return string Canonical mock permalink URL.
	 */
	function get_permalink( $post = 0 ) {
		$id = $post ? (int) $post : get_the_ID();
		return 'https://example.org/post-' . $id . '/';
	}
}

if ( ! function_exists( 'get_the_date' ) ) {
	/**
	 * Stub for WordPress get_the_date().
	 *
	 * @param string           $format Optional date format.
	 * @param int|WP_Post|null $post   Optional post ID or object.
	 * @return string Formatted date label.
	 */
	function get_the_date( $format = '', $post = null ) {
		unset( $format, $post );
		return 'November 10, 2026';
	}
}

if ( ! function_exists( 'has_post_thumbnail' ) ) {
	/**
	 * Stub for WordPress has_post_thumbnail().
	 *
	 * @param int|WP_Post|null $post Optional post ID or object.
	 * @return bool True when a featured thumbnail ID exists for the post.
	 */
	function has_post_thumbnail( $post = null ) {
		$id = is_int( $post ) ? $post : get_the_ID();
		return ! empty( $GLOBALS['gslider_test_bp_thumbnails'][ $id ] );
	}
}

if ( ! function_exists( 'get_post_thumbnail_id' ) ) {
	/**
	 * Stub for WordPress get_post_thumbnail_id().
	 *
	 * @param int|WP_Post|null $post Optional post ID or object.
	 * @return int Attachment ID or `0`.
	 */
	function get_post_thumbnail_id( $post = null ) {
		$id = is_int( $post ) ? $post : get_the_ID();
		return (int) ( $GLOBALS['gslider_test_bp_thumbnails'][ $id ] ?? 0 );
	}
}

if ( ! function_exists( 'get_the_post_thumbnail_url' ) ) {
	/**
	 * Stub for WordPress get_the_post_thumbnail_url().
	 *
	 * @param int|WP_Post|null $post Optional post ID or object.
	 * @param string           $size Requested image size slug.
	 * @return string Thumbnail URL or empty string.
	 */
	function get_the_post_thumbnail_url( $post = null, $size = 'post-thumbnail' ) {
		unset( $size );
		$id = is_int( $post ) ? $post : get_the_ID();
		return $GLOBALS['gslider_test_bp_thumb_urls'][ $id ] ?? '';
	}
}

if ( ! function_exists( 'get_post_meta' ) ) {
	/**
	 * Stub for WordPress get_post_meta().
	 *
	 * @param int    $post_id Attachment or post ID.
	 * @param string $key     Meta key.
	 * @param bool   $single  Whether to return a single value.
	 * @return string Mock attachment alt text.
	 */
	function get_post_meta( $post_id, $key = '', $single = false ) {
		unset( $key, $single );
		return $GLOBALS['gslider_test_bp_thumb_alts'][ $post_id ] ?? '';
	}
}

if ( ! function_exists( 'get_the_author_meta' ) ) {
	/**
	 * Stub for WordPress get_the_author_meta().
	 *
	 * @param string $field Requested author field.
	 * @return int Mock author ID.
	 */
	function get_the_author_meta( $field = '' ) {
		unset( $field );
		return 14;
	}
}

if ( ! function_exists( 'get_the_author' ) ) {
	/**
	 * Stub for WordPress get_the_author().
	 *
	 * @return string Mock author display name.
	 */
	function get_the_author() {
		return 'Alex Writer';
	}
}

if ( ! function_exists( 'get_avatar_url' ) ) {
	/**
	 * Stub for WordPress get_avatar_url().
	 *
	 * @param mixed      $id_or_email Author ID, email, or user object.
	 * @param array|null $args        Optional avatar options.
	 * @return string Mock avatar URL.
	 */
	function get_avatar_url( $id_or_email, $args = null ) {
		unset( $args );
		return 'https://example.org/avatar-' . intval( $id_or_email ) . '.png';
	}
}

if ( ! function_exists( 'get_the_category' ) ) {
	/**
	 * Stub for WordPress get_the_category().
	 *
	 * @param int|false $id Post ID.
	 * @return array Category term objects.
	 */
	function get_the_category( $id = false ) {
		return $GLOBALS['gslider_test_bp_categories'][ $id ] ?? [];
	}
}

if ( ! function_exists( 'get_category_link' ) ) {
	/**
	 * Stub for WordPress get_category_link().
	 *
	 * @param int $term_id Category term ID.
	 * @return string Mock category archive URL.
	 */
	function get_category_link( $term_id ) {
		return 'https://example.org/category/' . intval( $term_id ) . '/';
	}
}

if ( ! function_exists( 'get_the_tags' ) ) {
	/**
	 * Stub for WordPress get_the_tags().
	 *
	 * @param int $post_id Post ID.
	 * @return array Tag term objects.
	 */
	function get_the_tags( $post_id = 0 ) {
		return $GLOBALS['gslider_test_bp_tags'][ $post_id ] ?? [];
	}
}

if ( ! function_exists( 'get_tag_link' ) ) {
	/**
	 * Stub for WordPress get_tag_link().
	 *
	 * @param int $term_id Tag term ID.
	 * @return string Mock tag archive URL.
	 */
	function get_tag_link( $term_id ) {
		return 'https://example.org/tag/' . intval( $term_id ) . '/';
	}
}

if ( ! function_exists( 'setup_postdata' ) ) {
	/**
	 * Stub for WordPress setup_postdata().
	 *
	 * @param WP_Post|object|int $post Post object or ID to register as active template data.
	 * @return bool True when postdata was populated.
	 */
	function setup_postdata( $post ) {
		if ( $post instanceof WP_Post ) {
			$GLOBALS['gslider_test_bp_current_post']         = $post;
			$GLOBALS['gslider_test_bp_setup_postdata_calls'][] = (int) $post->ID;
			return true;
		}
		return false;
	}
}

if ( ! function_exists( 'wp_reset_postdata' ) ) {
	/**
	 * Stub for WordPress wp_reset_postdata() simulating REST context without main query post.
	 *
	 * @return void
	 */
	function wp_reset_postdata() {
		$GLOBALS['gslider_test_bp_current_post'] = null;
		$GLOBALS['post']                         = null;
	}
}

if ( ! class_exists( 'WP_Query' ) ) {
	/**
	 * Lightweight WP_Query stub for testing BlockParser Post Carousel queries.
	 *
	 * @package GSlider\Tests\RestApi
	 */
	class WP_Query {

		/**
		 * Queried post objects.
		 *
		 * @var WP_Post[]
		 */
		public $posts = [];

		/**
		 * Total post count in the simulated result set.
		 *
		 * @var int
		 */
		public $post_count = 0;

		/**
		 * Zero-based index of the active loop item.
		 *
		 * @var int
		 */
		public $current_post = -1;

		/**
		 * Initializes the mock query and records received WP_Query arguments.
		 *
		 * @param array $args WP_Query arguments compiled by PostCarouselRenderer.
		 */
		public function __construct( $args = [] ) {
			$GLOBALS['gslider_test_bp_queries'][] = $args;
			$pool                                 = $GLOBALS['gslider_test_bp_render_posts'];
			$limit                                = isset( $args['posts_per_page'] ) ? intval( $args['posts_per_page'] ) : 6;
			$extra                                = intval( $GLOBALS['gslider_test_bp_sticky_extra'] );
			$this->posts                          = array_slice( $pool, 0, $limit + $extra );
			$this->post_count                     = count( $this->posts );
		}

		/**
		 * Checks whether additional queried posts remain in the loop.
		 *
		 * @return bool True when more posts remain.
		 */
		public function have_posts(): bool {
			return ( $this->current_post + 1 ) < $this->post_count;
		}

		/**
		 * Advances the loop pointer and populates the active loop and global post state.
		 *
		 * @return void
		 */
		public function the_post(): void {
			++$this->current_post;
			$post                                    = $this->posts[ $this->current_post ];
			$GLOBALS['gslider_test_bp_current_post'] = $post;
			$GLOBALS['post']                         = $post;
		}
	}
}

use GSlider\RestApi\BlockParser;
use GSlider\Utils\CssSanitizer;

/**
 * Test class for BlockParser.
 */
class BlockParserTest {

	/**
	 * Helper assertion.
	 *
	 * @param bool   $condition Evaluated condition.
	 * @param string $message   Assertion message.
	 * @return void
	 */
	public function assert_true( $condition, string $message ): void {
		if ( ! $condition ) {
			fwrite( STDERR, "FAIL: {$message}\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Normalizes a block definition via BlockParser.
	 *
	 * @param array  $attrs Attributes array.
	 * @param string $name  Block name.
	 * @return array
	 */
	private function normalize( array $attrs, string $name ): array {
		return BlockParser::normalize_block(
			[
				'blockName' => $name,
				'attrs'     => $attrs,
			]
		);
	}

	/**
	 * Runs all unit test assertions for BlockParser.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider BlockParser Tests ===\n\n";

		$this->test_base_block_slide_parsing();
		$this->test_attribute_defaults_matching_schemas();
		$this->test_stored_overrides_and_preservation();
		$this->test_block_types_normalization();
		$this->test_css_sanitization();
		$this->test_flexi_slide_css_in_rest_output();
		$this->test_flexi_vertical_direction();
		$this->test_swiper_dynamic_observers();
		$this->test_flexi_grab_cursor();
		$this->test_flexi_grab_cursor();
		$this->test_post_carousel_normalization();
		$this->test_post_carousel_host_post_context_and_restoration();
		$this->test_reusable_block_expansion_gating();

		fwrite( STDOUT, "\nAll BlockParser tests passed successfully!\n" );
	}

	/**
	 * Test 1: Base Block Slide Parsing & Normalization.
	 *
	 * @return void
	 */
	public function test_base_block_slide_parsing(): void {
		$one = $this->normalize(
			[
				'blockId'     => 'gslider-base',
				'images'      => [
					[
						'id'  => 9,
						'url' => 'https://example.com/not-a-base-slide.jpg',
					],
				],
				'sliderItems' => [
					[
						'id'                      => 'item-1',
						'subTitle'                => 'Sub Title',
						'title'                   => 'Slider Item 1',
						'description'             => 'First slide copy',
						'primaryButtonText'       => 'Get Started',
						'primaryButtonLink'       => '#',
						'primaryButtonTargetLink' => false,
						'secondaryButtonSwitcher' => true,
						'secondaryButtonText'     => 'Learn more',
						'secondaryButtonLink'     => 'https://example.com/more',
					],
				],
			],
			'gslider-blocks/base'
		);

		$this->assert_true( 'gslider-blocks/base' === $one['blockName'], 'blockName stays gslider-blocks/base' );
		$this->assert_true( 1 === $one['totalSlides'], 'one default item counts as one slide' );
		$this->assert_true( 'Slider Item 1' === $one['slides'][0]['title'], 'slides[0].title is the item title' );
		$this->assert_true( 'item-1' === $one['slides'][0]['id'], 'slide id is copied' );
		$this->assert_true( 'Sub Title' === $one['slides'][0]['subTitle'], 'subTitle is copied' );
		$this->assert_true( 'First slide copy' === $one['slides'][0]['description'], 'description is copied' );
		$this->assert_true( 'Get Started' === $one['slides'][0]['primaryButtonText'], 'primary button text is copied' );
		$this->assert_true( false === $one['slides'][0]['primaryButtonTargetLink'] && is_bool( $one['slides'][0]['primaryButtonTargetLink'] ), 'primaryButtonTargetLink stays boolean false' );
		$this->assert_true( true === $one['slides'][0]['secondaryButtonSwitcher'] && is_bool( $one['slides'][0]['secondaryButtonSwitcher'] ), 'secondaryButtonSwitcher stays boolean true' );
		$this->assert_true( ! isset( $one['slides'][0]['url'], $one['slides'][0]['authorName'], $one['slides'][0]['ratingNumber'] ), 'base slides are not image or testimonial items' );
		$this->assert_true( 'Slider Item 1' === $one['attrs']['sliderItems'][0]['title'], 'raw attrs.sliderItems stays on the payload' );

		$two = $this->normalize(
			[
				'sliderItems' => [
					[ 'id' => 'item-1', 'title' => 'Slider Item 1' ],
					[ 'id' => 'item-2', 'title' => 'Slider Item 2' ],
					'not-an-item',
				],
			],
			'gslider-blocks/base'
		);
		$this->assert_true( 2 === $two['totalSlides'] && 2 === count( $two['slides'] ), 'two slider items return two slides' );
		$this->assert_true( 'Slider Item 2' === $two['slides'][1]['title'], 'the second slide title is copied' );
		$this->assert_true( true === $two['slides'][0]['primaryButtonTargetLink'] && false === $two['slides'][0]['secondaryButtonSwitcher'], 'omitted button flags use the editor defaults as booleans' );

		$untouched = $this->normalize( [ 'blockId' => 'gslider-empty' ], 'gslider-blocks/base' );
		$this->assert_true( 3 === $untouched['totalSlides'] && 3 === count( $untouched['slides'] ), 'missing sliderItems returns the three default slides' );
		$this->assert_true( 'Slider Item 1' === $untouched['slides'][0]['title'] && 'item-3' === $untouched['slides'][2]['id'], 'default base slides keep their default content' );
		$this->assert_true( 'gslider-empty' === $untouched['blockId'] && 'gslider-empty' === $untouched['attrs']['blockId'], 'stored blockId wins over its default' );

		$empty = $this->normalize( [ 'sliderItems' => [] ], 'gslider-blocks/base' );
		$this->assert_true( [] === $empty['slides'] && 0 === $empty['totalSlides'], 'a stored empty sliderItems stays empty' );
	}

	/**
	 * Test 2: Attribute Defaults Matching MCP Schemas.
	 *
	 * @return void
	 */
	public function test_attribute_defaults_matching_schemas(): void {
		$schemas_dir = GSLIDER_DIR_PATH . 'packages/mcp-server/src/core/schemas';
		foreach ( [ 'base', 'testimonial', 'image-slider', 'logo-carousel', 'flexi-content', 'post-carousel' ] as $slug ) {
			$schema_file = "{$schemas_dir}/{$slug}.json";
			if ( ! file_exists( $schema_file ) ) {
				continue;
			}
			$schema   = json_decode( file_get_contents( $schema_file ), true );
			$expected = [];
			foreach ( $schema['attributes'] as $name => $definition ) {
				if ( array_key_exists( 'default', $definition ) ) {
					$expected[ $name ] = $definition['default'];
				}
			}
			$defaults = BlockParser::attribute_defaults( "gslider-blocks/{$slug}" );
			$this->assert_true( $expected === $defaults, "{$slug} defaults match the MCP schema (run npm run defaults:generate if not)" );

			$filled = $this->normalize( [], "gslider-blocks/{$slug}" );
			$this->assert_true( $expected === $filled['attrs'], "an untouched {$slug} block returns every default in attrs" );
		}

		$base_defaults = BlockParser::attribute_defaults( 'gslider-blocks/base' );
		$this->assert_true( true === $base_defaults['showTitle'] || false === $base_defaults['showTitle'], 'base defaults include showTitle' );
	}

	/**
	 * Test 3: Stored Overrides Preservation.
	 *
	 * @return void
	 */
	public function test_stored_overrides_and_preservation(): void {
		$stored = $this->normalize(
			[
				'infiniteLoop'      => false,
				'carouselPerColumn' => [ 'Desktop' => 4 ],
				'showTitle'         => false,
				'blockStyle'        => '',
			],
			'gslider-blocks/base'
		);
		$this->assert_true( false === $stored['attrs']['infiniteLoop'] && false === $stored['attrs']['showTitle'], 'stored false values are not replaced by defaults' );
		$this->assert_true( [ 'Desktop' => 4 ] === $stored['attrs']['carouselPerColumn'], 'a stored object replaces the default object, as in Gutenberg' );
		$this->assert_true( false === $stored['swiperConfig']['loop'], 'swiperConfig still honors stored values' );
	}

	/**
	 * Test 4: Block Types Normalization (Image, Logo, Testimonial, Flexi).
	 *
	 * @return void
	 */
	public function test_block_types_normalization(): void {
		$untouched_testimonial = $this->normalize( [], 'gslider-blocks/testimonial' );
		$this->assert_true( 3 === $untouched_testimonial['totalSlides'], 'an untouched testimonial returns the three default slides' );
		$this->assert_true( 'Alex Hunter' === $untouched_testimonial['slides'][0]['authorName'], 'default testimonial slides keep their default content' );

		$title_units = [ 'Desktop' => 'px', 'Tablet' => 'px', 'Mobile' => 'px' ];
		$this->assert_true( $title_units === $untouched_testimonial['attrs']['testimonialTitleFontSizeUnits'], 'untouched testimonial title font-size units contain only the three devices' );

		$stored_units       = [ 'Desktop' => 'em', 'Tablet' => 'rem', 'Mobile' => 'px', 'em' => 'px', 'rem' => 'px' ];
		$stored_testimonial = $this->normalize(
			[ 'testimonialTitleFontSizeUnits' => $stored_units ],
			'gslider-blocks/testimonial'
		);
		$this->assert_true( $stored_units === $stored_testimonial['attrs']['testimonialTitleFontSizeUnits'], 'stored testimonial units and legacy stray keys remain unchanged' );

		$untouched_image = $this->normalize( [], 'gslider-blocks/image-slider' );
		$this->assert_true( 0 === $untouched_image['totalSlides'] && [] === $untouched_image['attrs']['images'], 'an untouched image slider has no default images' );
		$this->assert_true( [] === BlockParser::attribute_defaults( 'gslider-blocks/unknown' ), 'an unknown block has no defaults' );

		$image = $this->normalize(
			[
				'images' => [
					[
						'id'          => 4,
						'url'         => 'https://example.com/photo.jpg',
						'alt'         => 'Photo',
						'caption'     => 'Caption',
						'link'        => 'https://example.com',
						'tooltipText' => 'Tip',
					],
				],
			],
			'gslider-blocks/image-slider'
		);
		$this->assert_true( 1 === $image['totalSlides'] && 'https://example.com/photo.jpg' === $image['slides'][0]['url'], 'image slides stay url items' );

		$logo = $this->normalize(
			[
				'logos' => [
					[
						'id'  => 5,
						'url' => 'https://example.com/logo.png',
						'alt' => 'Logo',
					],
				],
			],
			'gslider-blocks/logo-carousel'
		);
		$this->assert_true( 'https://example.com/logo.png' === $logo['slides'][0]['url'] && ! isset( $logo['slides'][0]['title'] ), 'logo slides stay logo items' );

		$testimonial = $this->normalize(
			[
				'sliderItems' => [
					[
						'id'              => 't-1',
						'authorName'      => 'Ada',
						'testimonialText' => 'Great',
						'ratingNumber'    => 5,
					],
				],
			],
			'gslider-blocks/testimonial'
		);
		$this->assert_true( 'Ada' === $testimonial['slides'][0]['authorName'] && ! isset( $testimonial['slides'][0]['subTitle'] ), 'testimonial slides keep testimonial fields' );

		$flexi = BlockParser::normalize_block(
			[
				'blockName'   => 'gslider-blocks/flexi-content',
				'attrs'       => [],
				'innerBlocks' => [
					[
						'blockName'   => 'gslider-blocks/flexi-content-item',
						'attrs'       => [ 'blockId' => 'slide-a' ],
						'innerBlocks' => [],
					],
				],
			]
		);
		$this->assert_true( 'gslider-blocks/flexi-content-item' === $flexi['slides'][0]['blockName'] && 1 === $flexi['totalSlides'], 'flexi slides stay child blocks' );
	}

	/**
	 * Test 5: CSS Sanitization for REST consumers.
	 *
	 * @return void
	 */
	public function test_css_sanitization(): void {
		$valid_css = ".gslider-base-1 .swiper{padding:10px 20px !important;background-image:url(https://example.com/a.jpg);background:linear-gradient(90deg, rgba(0,0,0,.5) 0%, #fff 100%);}\n@media (max-width: 767px){.gslider-base-1 .slide{background:url(\"https://example.com/b.png\") center/cover no-repeat;}}";
		$this->assert_true( $valid_css === CssSanitizer::sanitize( $valid_css ), 'valid generated CSS passes through unchanged' );

		$payloads = [
			'.a{color:red}@import url(https://evil.example/a.css);',
			'@IMPORT "https://evil.example/a.css";.a{color:red}',
			'@im@import x;port url(https://evil.example/a.css);.a{color:red}',
			'.a{background:url(javajavascript:script:alert(1));color:red}',
			'@\69mport url(https://evil.example/a.css);.a{color:red}',
			'.a{width:expression(alert(1));color:red}',
			'.a{background:url(JaVaScRiPt :alert(1));color:red}',
			'.a{-moz-binding:url(https://evil.example/x.xml#x);color:red}',
			'.a{behavior:url(x.htc);color:red}',
			'.a{background:url( "data:text/html;base64,PHNjcmlwdD4=");color:red}',
			'.a{color:red}</style><script>alert(1)</script>',
			'.a{color:red}</STYLE ',
		];
		foreach ( $payloads as $payload ) {
			$clean = strtolower( CssSanitizer::sanitize( $payload ) );
			$bad   = preg_match( '/<|@import|@\\\\|expression\s*\(|javascript\s*:|-moz-binding|behavior\s*:|url\s*\(\s*[\'"]?\s*data:/', $clean );
			$this->assert_true( ! $bad && false !== strpos( $clean, 'color:red' ), 'sanitizer neutralizes ' . $payload );
		}
		$this->assert_true( '' === CssSanitizer::sanitize( [ 'x' ] ) && '' === CssSanitizer::sanitize( null ), 'sanitizer rejects non-strings' );

		$styled = $this->normalize(
			[
				'blockId'    => 'gslider-base',
				'blockStyle' => '.gslider-base{color:red}@import url(https://evil.example/a.css);</style><script>alert(1)</script>',
			],
			'gslider-blocks/base'
		);
		$this->assert_true( false !== strpos( $styled['css'], 'color:red' ) && $styled['css'] === $styled['attrs']['blockStyle'], 'REST css and attrs.blockStyle are sanitized' );
		$this->assert_true( false === strpos( strtolower( $styled['css'] ), '@import' ), 'REST css still strips @import' );

		$unscoped = $this->normalize(
			[
				'blockId'    => 'gslider-base',
				'blockStyle' => '.x{color:red}',
			],
			'gslider-blocks/base'
		);
		$this->assert_true( '' === $unscoped['css'] && '' === $unscoped['attrs']['blockStyle'], 'REST css drops selectors that do not start at the block root' );

		$empty_id = $this->normalize(
			[
				'blockId'    => '',
				'blockStyle' => 'body { color: red; }',
			],
			'gslider-blocks/base'
		);
		$this->assert_true( '' === $empty_id['css'], 'REST css is empty when blockId is invalid' );
	}

	/**
	 * Test 6: Flexi Content slide CSS survives a REST request (headless /gslider API).
	 *
	 * @return void
	 */
	public function test_flexi_slide_css_in_rest_output(): void {
		global $is_rest_mock, $is_admin_mock;
		$is_rest_mock  = true;
		$is_admin_mock = false;

		$generator = \GSlider\Classes\StyleGenerator::getInstance();
		\GSlider\Classes\StyleGenerator::reset_styles();
		$GLOBALS['gslider_render_block_impl'] = static function ( $block ) use ( $generator ) {
			return $generator->collect_and_render_dynamic_styles( '<div class="flexi-content-item swiper-slide">Slide</div>', $block );
		};

		$flexi = BlockParser::normalize_block(
			[
				'blockName'   => 'gslider-blocks/flexi-content',
				'attrs'       => [],
				'innerBlocks' => [
					[
						'blockName'   => 'gslider-blocks/flexi-content-item',
						'attrs'       => [
							'blockId'    => 'gslider-flexi-item-a',
							'blockStyle' => '.gslider-flexi-item-a{color:#abcdef}',
						],
						'innerBlocks' => [
							[
								'blockName'   => 'gslider-blocks/flexi-content-item',
								'attrs'       => [
									'blockId'    => 'gslider-flexi-item-b',
									'blockStyle' => '.gslider-flexi-item-b{margin:1px}',
								],
								'innerBlocks' => [],
							],
						],
					],
				],
			]
		);
		unset( $GLOBALS['gslider_render_block_impl'] );
		$is_rest_mock = false;

		$slide = $flexi['slides'][0];
		$this->assert_true( false !== strpos( $slide['css'], '.gslider-flexi-item-a{color:#abcdef}' ) && false !== strpos( $slide['css'], '.gslider-flexi-item-b{margin:1px}' ), 'flexi slides[].css carries own and nested CSS' );
		$this->assert_true( false !== strpos( $slide['innerHtml'], '<style id="gslider-style-gslider-flexi-item-a">' ), 'flexi innerHtml keeps its <style> during REST requests' );
	}

	/**
	 * Test 7: Flexi Content Vertical Direction.
	 *
	 * @return void
	 */
	public function test_flexi_vertical_direction(): void {
		$horizontal = $this->normalize( [ 'layoutHeightSwitcher' => 'adapt' ], 'gslider-blocks/flexi-content' );
		$this->assert_true( ! isset( $horizontal['swiperConfig']['direction'] ), 'default flexi config has no direction key' );
		$this->assert_true( true === $horizontal['swiperConfig']['autoHeight'], 'horizontal adapt height keeps autoHeight' );

		$vertical = $this->normalize(
			[
				'direction'            => 'vertical',
				'layoutHeightSwitcher' => 'adapt',
			],
			'gslider-blocks/flexi-content'
		);
		$this->assert_true( 'vertical' === $vertical['swiperConfig']['direction'], 'vertical flexi config sets direction' );
		$this->assert_true( ! isset( $vertical['swiperConfig']['autoHeight'] ), 'vertical flexi config skips autoHeight' );
	}

	/**
	 * Test 8: Swiper Dynamic Observers for Tabs and Modals.
	 *
	 * Verifies that observer, observeParents, and resizeObserver are enabled
	 * in swiperConfig so sliders recalculate when unhidden in tabs/modals.
	 *
	 * @return void
	 */
	public function test_swiper_dynamic_observers(): void {
		$flexi = $this->normalize( [], 'gslider-blocks/flexi-content' );
		$this->assert_true( true === ( $flexi['swiperConfig']['observer'] ?? false ), 'flexi swiperConfig enables observer' );
		$this->assert_true( true === ( $flexi['swiperConfig']['observeParents'] ?? false ), 'flexi swiperConfig enables observeParents' );
		$this->assert_true( true === ( $flexi['swiperConfig']['resizeObserver'] ?? false ), 'flexi swiperConfig enables resizeObserver' );

		$base = $this->normalize( [], 'gslider-blocks/base' );
		$this->assert_true( ! isset( $base['swiperConfig']['observer'] ), 'base swiperConfig does not include observer' );
		$this->assert_true( ! isset( $base['swiperConfig']['observeParents'] ), 'base swiperConfig does not include observeParents' );
		$this->assert_true( ! isset( $base['swiperConfig']['resizeObserver'] ), 'base swiperConfig does not include resizeObserver' );
	}

	/**
	 * Test 9: Flexi Content grabCursor gating and breakpoint propagation.
	 *
	 * Verifies that grabCursor is emitted only when both enableGrabCursor
	 * and allowTouchMove are enabled, and stays set across all breakpoints.
	 *
	 * @return void
	 */
	public function test_flexi_grab_cursor(): void {
		$default = $this->normalize( [], 'gslider-blocks/flexi-content' );
		$this->assert_true( ! array_key_exists( 'grabCursor', $default['swiperConfig'] ), 'default flexi config omits grabCursor' );
		foreach ( [ 0, 768, 1025 ] as $breakpoint ) {
			$this->assert_true(
				! array_key_exists( 'grabCursor', $default['swiperConfig']['breakpoints'][ $breakpoint ] ),
				"default flexi breakpoint {$breakpoint} omits grabCursor"
			);
		}

		$enabled = $this->normalize(
			[
				'enableGrabCursor' => true,
				'allowTouchMove'   => true,
			],
			'gslider-blocks/flexi-content'
		);
		$this->assert_true( true === ( $enabled['swiperConfig']['grabCursor'] ?? null ), 'flexi config enables top-level grabCursor when allowTouchMove is true' );
		foreach ( [ 0, 768, 1025 ] as $breakpoint ) {
			$this->assert_true(
				true === ( $enabled['swiperConfig']['breakpoints'][ $breakpoint ]['grabCursor'] ?? null ),
				"flexi breakpoint {$breakpoint} keeps grabCursor enabled"
			);
		}

		$touch_disabled = $this->normalize(
			[
				'enableGrabCursor' => true,
				'allowTouchMove'   => false,
			],
			'gslider-blocks/flexi-content'
		);
		$this->assert_true( false === $touch_disabled['swiperConfig']['allowTouchMove'], 'allowTouchMove stays false in swiperConfig' );
		$this->assert_true( ! array_key_exists( 'grabCursor', $touch_disabled['swiperConfig'] ), 'flexi config omits grabCursor when allowTouchMove is false' );
		foreach ( [ 0, 768, 1025 ] as $breakpoint ) {
			$this->assert_true(
				! array_key_exists( 'grabCursor', $touch_disabled['swiperConfig']['breakpoints'][ $breakpoint ] ),
				"flexi breakpoint {$breakpoint} omits grabCursor when allowTouchMove is false"
			);
		}
	}
	/**
	 * Test 10: Post Carousel defaults, Swiper configuration, sticky slice cap, and post slides.
	 *
	 * @return void
	 */
	public function test_post_carousel_normalization(): void {
		$untouched = $this->normalize( [], 'gslider-blocks/post-carousel' );
		$this->assert_true( 'gslider-blocks/post-carousel' === $untouched['blockName'], 'post-carousel blockName stays gslider-blocks/post-carousel' );
		$this->assert_true( 'post-carousel' === $untouched['sliderType'], 'post-carousel sliderType matches block slug' );
		$this->assert_true( [] === $untouched['slides'] && 0 === $untouched['totalSlides'], 'empty post query returns empty slides array' );
		$this->assert_true(
			[
				'Desktop' => 6,
				'Tablet'  => 6,
				'Mobile'  => 6,
			] === $untouched['attrs']['postsPerPage'],
			'post-carousel postsPerPage defaults to responsive 6'
		);
		$this->assert_true( 'slide' === $untouched['swiperConfig']['effect'], 'post-carousel default carouselEffect resolves to slide' );
		$this->assert_true( true === $untouched['swiperConfig']['loop'], 'post-carousel default infiniteLoop is true' );
		$this->assert_true( 1.0 === $untouched['swiperConfig']['breakpoints'][0]['slidesPerView'], 'post-carousel mobile slidesPerView defaults to 1.0' );
		$this->assert_true( 2.0 === $untouched['swiperConfig']['breakpoints'][768]['slidesPerView'], 'post-carousel tablet slidesPerView defaults to 2.0' );
		$this->assert_true( 3.0 === $untouched['swiperConfig']['breakpoints'][1025]['slidesPerView'], 'post-carousel desktop slidesPerView defaults to 3.0' );
		$this->assert_true( 10 === $untouched['swiperConfig']['breakpoints'][1025]['spaceBetween'], 'post-carousel desktop spaceBetween defaults to 10' );
		$this->assert_true( true === ( $untouched['attrs']['enableSchemaMarkup'] ?? null ), 'post-carousel enableSchemaMarkup defaults to true' );

		$override_config = $this->normalize(
			[
				'blockId'           => 'gslider-post-carousel-abc',
				'carouselEffect'    => 'coverflow',
				'carouselPerColumn' => [ 'Desktop' => 4 ],
				'autoplay'          => true,
				'enableCardTilt'    => true,
				'infiniteLoop'      => false,
			],
			'gslider-blocks/post-carousel'
		);
		$this->assert_true( 'coverflow' === $override_config['swiperConfig']['effect'], 'stored carouselEffect override reaches swiperConfig' );
		$this->assert_true( false === $override_config['swiperConfig']['loop'], 'stored infiniteLoop false reaches swiperConfig' );
		$this->assert_true( 4.0 === $override_config['swiperConfig']['breakpoints'][1025]['slidesPerView'], 'stored desktop columns override reaches swiperConfig' );
		$this->assert_true( 1.0 === $override_config['swiperConfig']['breakpoints'][0]['slidesPerView'], 'missing mobile breakpoint still backfills default' );
		$this->assert_true( true === $override_config['swiperConfig']['autoplay']['pauseOnMouseEnter'], 'enableCardTilt enables pauseOnMouseEnter for post-carousel autoplay' );
		$this->assert_true( ! array_key_exists( 'centeredSlides', $override_config['swiperConfig'] ), 'post-carousel omits centeredSlides unless enableSpotlight is true' );

		$spotlight_config = $this->normalize(
			[
				'blockId'           => 'gslider-post-carousel-spotlight',
				'enableSpotlight'   => true,
				'carouselPerColumn' => [
					'Desktop' => 1.6,
					'Tablet'  => 1.3,
					'Mobile'  => 1.1,
				],
			],
			'gslider-blocks/post-carousel'
		);
		$this->assert_true( true === ( $spotlight_config['swiperConfig']['centeredSlides'] ?? null ), 'enableSpotlight adds centeredSlides=true to post-carousel REST swiperConfig' );
		$this->assert_true( 1.6 === $spotlight_config['swiperConfig']['breakpoints'][1025]['slidesPerView'], 'spotlight desktop fractional slidesPerView reaches REST swiperConfig' );
		$this->assert_true( 1.3 === $spotlight_config['swiperConfig']['breakpoints'][768]['slidesPerView'], 'spotlight tablet fractional slidesPerView reaches REST swiperConfig' );
		$this->assert_true( 1.1 === $spotlight_config['swiperConfig']['breakpoints'][0]['slidesPerView'], 'spotlight mobile fractional slidesPerView reaches REST swiperConfig' );

		$post_one               = new WP_Post();
		$post_one->ID           = 301;
		$post_one->post_title   = 'Editorial Launch <script>alert(1)</script>';
		$post_one->post_content = 'Full body content that should be ignored when an explicit excerpt exists.';

		$post_two               = new WP_Post();
		$post_two->ID           = 302;
		$post_two->post_title   = 'Secondary Feature';
		$post_two->post_content = '[gallery] Clean content for automatic excerpt generation across twenty words or fewer.';

		$post_extra               = new WP_Post();
		$post_extra->ID           = 303;
		$post_extra->post_title   = 'Sticky Overflow Post';
		$post_extra->post_content = 'Should be truncated by postsPerPage slice cap.';

		$GLOBALS['gslider_test_bp_render_posts'] = [ $post_one, $post_two, $post_extra ];
		$GLOBALS['gslider_test_bp_excerpts']     = [ 301 => 'Explicit summary line' ];
		$GLOBALS['gslider_test_bp_thumbnails']   = [ 301 => 901 ];
		$GLOBALS['gslider_test_bp_thumb_urls']   = [ 301 => 'https://example.org/uploads/hero-301.jpg' ];
		$GLOBALS['gslider_test_bp_thumb_alts']   = [ 901 => 'Hero Cover Image' ];
		$GLOBALS['gslider_test_bp_categories']   = [
			301 => [ (object) [ 'term_id' => 12, 'name' => 'Releases', 'slug' => 'releases' ] ],
		];
		$GLOBALS['gslider_test_bp_tags']         = [
			301 => [ (object) [ 'term_id' => 24, 'name' => 'Gutenberg', 'slug' => 'gutenberg' ] ],
		];
		$GLOBALS['gslider_test_bp_sticky_extra'] = 1;

		$queried = $this->normalize(
			[
				'blockId'      => 'gslider-post-carousel-live',
				'postsPerPage' => 2,
				'blockStyle'   => '.gslider-post-carousel-live{color:#111}@import url(https://evil.example/a.css);',
			],
			'gslider-blocks/post-carousel'
		);

		$this->assert_true( 2 === $queried['totalSlides'] && 2 === count( $queried['slides'] ), 'post-carousel enforces postsPerPage cap over sticky overflow' );
		$this->assert_true( 301 === $queried['slides'][0]['id'], 'first slide carries queried post ID' );
		$this->assert_true( 'Editorial Launch' === $queried['slides'][0]['title'], 'first slide title is sanitized' );
		$this->assert_true( 'Explicit summary line' === $queried['slides'][0]['excerpt'], 'first slide preserves explicit excerpt' );
		$this->assert_true( 'https://example.org/post-301/' === $queried['slides'][0]['link'], 'first slide includes permalink' );
		$this->assert_true( 'November 10, 2026' === $queried['slides'][0]['date'], 'first slide includes formatted date' );
		$this->assert_true(
			[
				'id'  => 901,
				'url' => 'https://example.org/uploads/hero-301.jpg',
				'alt' => 'Hero Cover Image',
			] === $queried['slides'][0]['featuredImage'],
			'first slide includes structured featuredImage metadata'
		);
		$this->assert_true(
			[
				'id'     => 14,
				'name'   => 'Alex Writer',
				'avatar' => 'https://example.org/avatar-14.png',
			] === $queried['slides'][0]['author'],
			'first slide includes author details'
		);
		$this->assert_true(
			[
				[
					'id'   => 12,
					'name' => 'Releases',
					'slug' => 'releases',
					'link' => 'https://example.org/category/12/',
				],
			] === $queried['slides'][0]['categories'],
			'first slide includes normalized categories'
		);
		$this->assert_true(
			[
				[
					'id'   => 24,
					'name' => 'Gutenberg',
					'slug' => 'gutenberg',
					'link' => 'https://example.org/tag/24/',
				],
			] === $queried['slides'][0]['tags'],
			'first slide includes normalized tags'
		);
		$this->assert_true( null === $queried['slides'][1]['featuredImage'], 'slide without featured thumbnail sets featuredImage to null' );
		$this->assert_true( 'Clean content for automatic excerpt generation across twenty words or fewer.' === $queried['slides'][1]['excerpt'], 'auto excerpt strips shortcodes cleanly' );
		$this->assert_true( false !== strpos( $queried['css'], '.gslider-post-carousel-live{color:#111}' ) && false === strpos( strtolower( $queried['css'] ), '@import' ), 'post-carousel REST css is scoped and sanitized' );
		$this->assert_true( null === $GLOBALS['gslider_test_bp_current_post'], 'wp_reset_postdata() resets post global after query' );

		$GLOBALS['gslider_test_bp_render_posts'] = [];
		$GLOBALS['gslider_test_bp_sticky_extra'] = 0;
	}

	/**
	 * Test 11: Host post propagation and global post/postdata restoration across REST Post Carousel queries.
	 *
	 * @return void
	 */
	public function test_post_carousel_host_post_context_and_restoration(): void {
		$host_post               = new WP_Post();
		$host_post->ID           = 501;
		$host_post->post_type    = 'portfolio';
		$host_post->post_title   = 'Host Portfolio Article';
		$host_post->post_content = '<!-- wp:gslider-blocks/post-carousel /-->';

		$slide_post               = new WP_Post();
		$slide_post->ID           = 601;
		$slide_post->post_title   = 'Related Slide Post';
		$slide_post->post_content = 'Related excerpt copy.';

		$outer_post               = new WP_Post();
		$outer_post->ID           = 777;
		$outer_post->post_type    = 'post';
		$outer_post->post_title   = 'Outer Post State';
		$outer_post->post_content = '';

		$GLOBALS['gslider_test_bp_render_posts']         = [ $slide_post ];
		$GLOBALS['gslider_test_bp_post_types']           = [ 501 => 'portfolio' ];
		$GLOBALS['gslider_test_bp_related_cats']         = [ 501 => [ 12 ] ];
		$GLOBALS['gslider_test_bp_related_tags']         = [ 501 => [ 24 ] ];
		$GLOBALS['gslider_test_bp_queries']              = [];
		$GLOBALS['gslider_test_bp_setup_postdata_calls'] = [];
		$GLOBALS['gslider_test_bp_parsed_blocks']        = [
			[
				'blockName'   => 'gslider-blocks/post-carousel',
				'attrs'       => [
					'blockId'              => 'gslider-related-rest',
					'useRelatedPostsQuery' => true,
					'relatedPostsTaxonomy' => 'both',
				],
				'innerBlocks' => [],
			],
			[
				'blockName'   => 'gslider-blocks/post-carousel',
				'attrs'       => [
					'blockId'            => 'gslider-exclude-rest',
					'excludeCurrentPost' => true,
					'excludePosts'       => '401',
				],
				'innerBlocks' => [],
			],
		];

		$GLOBALS['post']                         = null;
		$GLOBALS['gslider_test_bp_current_post'] = null;

		$parsed = BlockParser::parse_post_blocks( $host_post );

		$this->assert_true( 2 === count( $parsed ), 'parse_post_blocks() normalizes both consecutive Post Carousel blocks' );
		$this->assert_true( 2 === count( $GLOBALS['gslider_test_bp_queries'] ), 'two WP_Query instances executed for two carousels' );
		$this->assert_true(
			'portfolio' === ( $GLOBALS['gslider_test_bp_queries'][0]['post_type'] ?? '' ),
			'related posts REST query resolves host post type even when global $post starts null'
		);
		$this->assert_true(
			'OR' === ( $GLOBALS['gslider_test_bp_queries'][0]['tax_query']['relation'] ?? '' ),
			'related posts REST query includes host post categories and tags'
		);
		$this->assert_true(
			in_array( 501, $GLOBALS['gslider_test_bp_queries'][0]['post__not_in'] ?? [], true ),
			'related posts REST query excludes host post ID'
		);
		$this->assert_true(
			in_array( 501, $GLOBALS['gslider_test_bp_queries'][1]['post__not_in'] ?? [], true )
				&& in_array( 401, $GLOBALS['gslider_test_bp_queries'][1]['post__not_in'] ?? [], true ),
			'second carousel preserves host post context after first carousel loop and excludes host ID'
		);
		$this->assert_true(
			null === $GLOBALS['post'] && null === $GLOBALS['gslider_test_bp_current_post'],
			'parse_post_blocks() restores absent global post state after returning'
		);

		// Numeric host post ID inside an existing outer global post context.
		$GLOBALS['wp_mock_posts'][501]                   = $host_post;
		$GLOBALS['gslider_test_bp_queries']              = [];
		$GLOBALS['gslider_test_bp_setup_postdata_calls'] = [];
		$GLOBALS['post']                                 = $outer_post;
		$GLOBALS['gslider_test_bp_current_post']         = $outer_post;

		BlockParser::parse_post_blocks( 501 );

		$this->assert_true(
			in_array( 501, $GLOBALS['gslider_test_bp_queries'][1]['post__not_in'] ?? [], true )
				&& ! in_array( 777, $GLOBALS['gslider_test_bp_queries'][1]['post__not_in'] ?? [], true ),
			'numeric post ID overrides outer global $post for host-scoped queries'
		);
		$this->assert_true(
			$outer_post === $GLOBALS['post'] && $outer_post === $GLOBALS['gslider_test_bp_current_post'],
			'prior outer global $post and postdata are restored rather than wiped by wp_reset_postdata()'
		);
		$this->assert_true(
			777 === (int) end( $GLOBALS['gslider_test_bp_setup_postdata_calls'] ),
			'setup_postdata() restores template globals for the prior outer post'
		);

		// Direct normalize_block() call with empty query results still preserves prior global post.
		$GLOBALS['gslider_test_bp_render_posts'] = [];
		$GLOBALS['gslider_test_bp_queries']      = [];
		$empty_carousel                          = BlockParser::normalize_block(
			[
				'blockName' => 'gslider-blocks/post-carousel',
				'attrs'     => [
					'excludeCurrentPost' => true,
				],
			],
			501
		);

		$this->assert_true( [] === $empty_carousel['slides'], 'direct normalize_block() returns empty slides when query matches no posts' );
		$this->assert_true(
			in_array( 501, $GLOBALS['gslider_test_bp_queries'][0]['post__not_in'] ?? [], true ),
			'direct normalize_block() carries explicit host post ID into excludeCurrentPost query'
		);
		$this->assert_true(
			$outer_post === $GLOBALS['post'] && $outer_post === $GLOBALS['gslider_test_bp_current_post'],
			'empty query early-return still restores prior outer global $post and postdata'
		);

		$GLOBALS['gslider_test_bp_parsed_blocks']        = null;
		$GLOBALS['gslider_test_bp_render_posts']         = [];
		$GLOBALS['gslider_test_bp_queries']              = [];
		$GLOBALS['gslider_test_bp_post_types']           = [];
		$GLOBALS['gslider_test_bp_related_cats']         = [];
		$GLOBALS['gslider_test_bp_related_tags']         = [];
		$GLOBALS['gslider_test_bp_setup_postdata_calls'] = [];
		unset( $GLOBALS['wp_mock_posts'][501] );
		$GLOBALS['post']                         = null;
		$GLOBALS['gslider_test_bp_current_post'] = null;
	}

	/**
	 * Test 12: Reusable block (synced pattern) expansion is gated by status, password, and capability.
	 *
	 * @return void
	 */
	public function test_reusable_block_expansion_gating(): void {
		global $wp_mock_posts, $can_read, $password_clear;

		$slider_content = '<!-- wp:gslider-blocks/image-slider {"blockId":"slider-ref"} /-->';

		// Published pattern: expanded for everyone (keeps the previous behavior).
		$wp_mock_posts[30] = $this->create_mock_post( 30, 'publish', 'wp_block', '', $slider_content );
		$can_read          = [];
		$password_clear    = [];
		$published         = BlockParser::parse_post_blocks( '<!-- wp:block {"ref":30} /-->' );
		$this->assert_true( 1 === count( $published ), 'Published pattern is expanded anonymously' );

		// Draft pattern: hidden from anonymous users.
		$wp_mock_posts[31] = $this->create_mock_post( 31, 'draft', 'wp_block', '', $slider_content );
		$can_read          = [];
		$draft_anonymous   = BlockParser::parse_post_blocks( '<!-- wp:block {"ref":31} /-->' );
		$this->assert_true( [] === $draft_anonymous, 'Draft pattern is skipped when logged out' );

		// Private pattern: hidden from anonymous users.
		$wp_mock_posts[32] = $this->create_mock_post( 32, 'private', 'wp_block', '', $slider_content );
		$can_read          = [];
		$private_anonymous = BlockParser::parse_post_blocks( '<!-- wp:block {"ref":32} /-->' );
		$this->assert_true( [] === $private_anonymous, 'Private pattern is skipped when logged out' );

		// Password-protected pattern: hidden even when published.
		$wp_mock_posts[33] = $this->create_mock_post( 33, 'publish', 'wp_block', 'secret', $slider_content );
		$can_read          = [];
		$password_clear    = [];
		$password_protected = BlockParser::parse_post_blocks( '<!-- wp:block {"ref":33} /-->' );
		$this->assert_true( [] === $password_protected, 'Password-protected pattern is skipped when locked' );

		// Draft pattern with read_post cap: expanded for users who can read it.
		$can_read         = [ 31 => true ];
		$draft_editor     = BlockParser::parse_post_blocks( '<!-- wp:block {"ref":31} /-->' );
		$this->assert_true( 1 === count( $draft_editor ), 'Draft pattern is expanded for a user who can read it' );

		// Private pattern with read_post cap: expanded for users who can read it.
		$can_read           = [ 32 => true ];
		$private_editor     = BlockParser::parse_post_blocks( '<!-- wp:block {"ref":32} /-->' );
		$this->assert_true( 1 === count( $private_editor ), 'Private pattern is expanded for a user who can read it' );

		// Non-wp_block posts referenced by core/block are never expanded.
		$wp_mock_posts[34] = $this->create_mock_post( 34, 'publish', 'post', '', $slider_content );
		$can_read          = [];
		$wrong_type        = BlockParser::parse_post_blocks( '<!-- wp:block {"ref":34} /-->' );
		$this->assert_true( [] === $wrong_type, 'Non-wp_block post is skipped' );

		// Self-referencing pattern terminates via the ref-cycle guard.
		$wp_mock_posts[35] = $this->create_mock_post( 35, 'publish', 'wp_block', '', '<!-- wp:block {"ref":35} /-->' );
		$can_read          = [];
		$cycle             = BlockParser::parse_post_blocks( '<!-- wp:block {"ref":35} /-->' );
		$this->assert_true( [] === $cycle, 'Self-referencing pattern terminates without infinite loop' );

		$can_read       = [];
		$password_clear = [];
	}

	/**
	 * Creates a mock WP_Post for parsing tests.
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
}

// Standalone execution entrypoint
( new BlockParserTest() )->run_all_tests();
