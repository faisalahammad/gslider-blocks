<?php
/**
 * Block data normalization and parsing service for GSlider Blocks.
 *
 * Extracts and formats machine-readable slider slide data from
 * Gutenberg block comments and attributes for Headless frontends.
 *
 * @package GSlider\RestApi
 * @since   1.1.9
 */

namespace GSlider\RestApi;

use GSlider\Blocks\PostCarousel\CardMarkupBuilder;
use GSlider\Blocks\PostCarousel\PostCarouselRenderer;
use GSlider\Classes\StyleGenerator;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( BlockParser::class, false ) ) {

	/**
	 * Parses and normalizes GSlider Gutenberg blocks.
	 *
	 * Converts raw block attributes into unified, clean JSON data
	 * structures tailored for Next.js, Astro, and headless consumers.
	 *
	 * @since 1.1.9
	 */
	class BlockParser {

		/**
		 * Attributes extract_swiper_config() reads, filled from attribute_defaults().
		 *
		 * @since 1.1.9
		 *
		 * @var string[]
		 */
		private const SWIPER_ATTRIBUTES = [
			'sliderType',
			'slideEffect',
			'carouselEffect',
			'carouselPerColumn',
			'carouselPerColumnGap',
			'speed',
			'autoplay',
			'autoplayDelay',
			'showNavigation',
			'showPagination',
			'paginationType',
			'dynamicBullets',
			'infiniteLoop',
			'allowTouchMove',
			'enableGrabCursor',
			'mousewheelControl',
			'keyboardNavigation',
			'pauseOnHover',
			'stopOnLastSlide',
			'reverseDirection',
			'direction',
			'layoutHeightSwitcher',
			'enableCardTilt',
			'cardHoverAnimation',
			'enableSpotlight',
		];

		/**
		 * Reusable block IDs currently being expanded, to avoid a ref cycle.
		 *
		 * @since 1.1.9
		 *
		 * @var array<int, bool>
		 */
		private static $reusable_refs = [];

		/**
		 * Attribute defaults keyed by block name, filled as each block's file is loaded.
		 *
		 * @since 1.1.9
		 *
		 * @var array<string, array>
		 */
		private static $attribute_defaults = [];

		/**
		 * Parses all GSlider blocks from a post's content.
		 *
		 * @since 1.1.9
		 *
		 * @param int|string|\WP_Post $post_or_id Post ID, WP_Post instance, or raw post content string.
		 * @return array Array of normalized GSlider block structures.
		 */
		public static function parse_post_blocks( $post_or_id ): array {
			$content   = '';
			$host_post = null;

			if ( $post_or_id instanceof \WP_Post ) {
				$host_post = $post_or_id;
				$content   = $post_or_id->post_content;
			} elseif ( is_numeric( $post_or_id ) ) {
				$post = get_post( (int) $post_or_id );
				if ( ! $post ) {
					return [];
				}
				$host_post = $post;
				$content   = $post->post_content;
			} elseif ( is_string( $post_or_id ) ) {
				$content = $post_or_id;
			}

			if ( empty( $content ) ) {
				return [];
			}

			$host_post_id  = $host_post instanceof \WP_Post ? (int) $host_post->ID : 0;
			$previous_post = $GLOBALS['post'] ?? null;
			$switched_post = false;

			if ( $host_post instanceof \WP_Post ) {
				$GLOBALS['post'] = $host_post;
				if ( function_exists( 'setup_postdata' ) ) {
					setup_postdata( $host_post );
				}
				$switched_post = true;
			}

			try {
				self::$reusable_refs = [];
				$raw_blocks          = parse_blocks( $content );
				return self::extract_and_normalize_blocks( $raw_blocks, $host_post_id );
			} finally {
				if ( $switched_post ) {
					self::restore_post_context( $previous_post );
				}
			}
		}

		/**
		 * Recursively traverses parsed block tree to extract and normalize GSlider blocks.
		 *
		 * Handles top-level blocks and nested blocks (inside groups, columns, etc.).
		 *
		 * @since 1.1.9
		 *
		 * @param array $blocks       Array of parsed block structures from parse_blocks().
		 * @param int   $host_post_id Optional enclosing host post ID for dynamic block queries.
		 * @return array Array of normalized GSlider blocks.
		 */
		public static function extract_and_normalize_blocks( array $blocks, int $host_post_id = 0 ): array {
			$sliders = [];

			foreach ( $blocks as $block ) {
				if ( empty( $block['blockName'] ) ) {
					continue;
				}

				if ( 'core/block' === $block['blockName'] ) {
					$reusable_sliders = self::sliders_from_reusable_block( $block, $host_post_id );
					if ( ! empty( $reusable_sliders ) ) {
						$sliders = array_merge( $sliders, $reusable_sliders );
					}
					continue;
				}

				// Only process top-level GSlider parent blocks (flexi-content-item is handled as a child slide).
				if ( 0 === strpos( $block['blockName'], 'gslider-blocks/' ) && 'gslider-blocks/flexi-content-item' !== $block['blockName'] ) {
					$sliders[] = self::normalize_block( $block, $host_post_id );
				}

				// Recursively inspect inner blocks for nested sliders (e.g. inside core/columns).
				if ( ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
					// If this is flexi-content, its innerBlocks are slides and already handled in normalize_block.
					if ( 'gslider-blocks/flexi-content' !== $block['blockName'] ) {
						$nested_sliders = self::extract_and_normalize_blocks( $block['innerBlocks'], $host_post_id );
						if ( ! empty( $nested_sliders ) ) {
							$sliders = array_merge( $sliders, $nested_sliders );
						}
					}
				}
			}

			return $sliders;
		}

		/**
		 * Loads sliders stored inside a core/block reusable reference.
		 *
		 * The ref's own inner blocks are empty. The slider markup lives on
		 * the wp_block post. Only published and readable patterns are
		 * expanded, matching what core renders on the front end.
		 *
		 * @since 1.1.9
		 *
		 * @param array $block        Parsed core/block.
		 * @param int   $host_post_id Optional enclosing host post ID for dynamic block queries.
		 * @return array Normalized sliders from the referenced content.
		 */
		private static function sliders_from_reusable_block( array $block, int $host_post_id = 0 ): array {
			$ref = isset( $block['attrs']['ref'] ) ? (int) $block['attrs']['ref'] : 0;
			if ( $ref < 1 || ! empty( self::$reusable_refs[ $ref ] ) || ! function_exists( 'get_post' ) ) {
				return [];
			}

			self::$reusable_refs[ $ref ] = true;
			$reusable                    = get_post( $ref );
			$sliders                     = [];

			if ( $reusable instanceof \WP_Post && self::can_expand_reusable( $reusable ) && is_string( $reusable->post_content ) && '' !== $reusable->post_content ) {
				$sliders = self::extract_and_normalize_blocks( parse_blocks( $reusable->post_content ), $host_post_id );
			}

			unset( self::$reusable_refs[ $ref ] );
			return $sliders;
		}

		/**
		 * Checks if a reusable block post may be expanded in REST output.
		 *
		 * Mirrors core's render_block_core_block() gate: the pattern must be
		 * published and unprotected, unless the current user can read it.
		 *
		 * @since 1.2.3
		 *
		 * @param \WP_Post $post Referenced wp_block post.
		 * @return bool
		 */
		private static function can_expand_reusable( \WP_Post $post ): bool {
			if ( 'wp_block' !== $post->post_type ) {
				return false;
			}

			if ( post_password_required( $post ) ) {
				return false;
			}

			if ( 'publish' === $post->post_status ) {
				return true;
			}

			return current_user_can( 'read_post', $post->ID );
		}

		/**
		 * Normalizes a single GSlider block into a clean, uniform object.
		 *
		 * @since 1.1.9
		 *
		 * @param array $block        Raw block data from parse_blocks().
		 * @param int   $host_post_id Optional enclosing host post ID for dynamic block queries.
		 * @return array Normalized block payload.
		 */
		public static function normalize_block( array $block, int $host_post_id = 0 ): array {
			$block_name   = sanitize_text_field( $block['blockName'] ?? '' );
			$attrs        = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : [];
			$attrs        = self::with_attribute_defaults( $block_name, $attrs );
			$inner_blocks = isset( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ? $block['innerBlocks'] : [];
			$block_slug   = str_replace( 'gslider-blocks/', '', $block_name );

			$block_id = isset( $attrs['blockId'] ) ? sanitize_key( $attrs['blockId'] ) : '';
			$slides   = [];

			switch ( $block_name ) {
				case 'gslider-blocks/image-slider':
					$slides = self::normalize_image_slider( $attrs );
					break;

				case 'gslider-blocks/logo-carousel':
					$slides = self::normalize_logo_carousel( $attrs );
					break;

				case 'gslider-blocks/testimonial':
					$slides = self::normalize_testimonial( $attrs );
					break;

				case 'gslider-blocks/base':
					$slides = self::normalize_base( $attrs );
					break;

				case 'gslider-blocks/flexi-content':
					$slides = self::normalize_flexi_content( $inner_blocks );
					break;

				case 'gslider-blocks/post-carousel':
					$slides = self::normalize_post_carousel( $attrs, $host_post_id );
					break;

				default:
					$slides = [];
					break;
			}

			$swiper_config = self::extract_swiper_config( $attrs, $block_name );
			$css           = self::extract_block_styles( $attrs );

			if ( array_key_exists( 'blockStyle', $attrs ) ) {
				$attrs['blockStyle'] = $css;
			}

			$data = [
				'blockId'      => $block_id,
				'blockName'    => $block_name,
				'sliderType'   => $block_slug,
				'totalSlides'  => count( $slides ),
				'swiperConfig' => $swiper_config,
				'css'          => $css,
				'slides'       => $slides,
				'attrs'        => $attrs,
			];

			/**
			 * Filters the normalized block payload for a GSlider block.
			 *
			 * @since 1.1.9
			 *
			 * @param array $data  Normalized block payload.
			 * @param array $block Raw Gutenberg block structure.
			 */
			return apply_filters( 'gslider_normalized_block_data', $data, $block );
		}

		/**
		 * Fills attributes Gutenberg omitted from the block comment with their defaults.
		 *
		 * Stored values win, including 0, false, '' and []. The merge is top-level
		 * only, like Gutenberg: a stored object replaces the whole default object.
		 *
		 * @since 1.1.9
		 *
		 * @param string $block_name Block name, such as gslider-blocks/base.
		 * @param array  $attrs      Attributes from the block comment.
		 * @return array Attributes with every omitted default filled in.
		 */
		public static function with_attribute_defaults( string $block_name, array $attrs ): array {
			return $attrs + self::attribute_defaults( $block_name );
		}

		/**
		 * Default attribute values for a GSlider block.
		 *
		 * Read from includes/RestApi/defaults/<slug>.php, which
		 * `npm run defaults:generate` writes from that block's attributes.js.
		 * Each file is loaded at most once per request.
		 *
		 * @since 1.1.9
		 *
		 * @param string $block_name Block name, such as gslider-blocks/base.
		 * @return array Default attribute values. Empty for an unknown block.
		 */
		public static function attribute_defaults( string $block_name ): array {
			if ( ! array_key_exists( $block_name, self::$attribute_defaults ) ) {
				self::$attribute_defaults[ $block_name ] = self::load_attribute_defaults( $block_name );
			}

			$defaults = self::$attribute_defaults[ $block_name ];

			/**
			 * Filters the default attributes used to fill a GSlider block's REST attrs.
			 *
			 * @since 1.1.9
			 *
			 * @param array  $defaults   Default attribute values.
			 * @param string $block_name Block name.
			 */
			$filtered = apply_filters( 'gslider_block_attribute_defaults', $defaults, $block_name );

			return is_array( $filtered ) ? $filtered : $defaults;
		}

		/**
		 * Loads one block's generated defaults file.
		 *
		 * A block outside the gslider-blocks namespace, or a missing or invalid
		 * file, yields no defaults, so the raw attributes are used unchanged.
		 *
		 * @since 1.1.9
		 *
		 * @param string $block_name Block name.
		 * @return array Default attribute values.
		 */
		private static function load_attribute_defaults( string $block_name ): array {
			$prefix = 'gslider-blocks/';
			if ( 0 !== strpos( $block_name, $prefix ) ) {
				return [];
			}

			$slug = substr( $block_name, strlen( $prefix ) );
			if ( ! preg_match( '/^[a-z0-9-]+$/', $slug ) ) {
				return [];
			}

			$file = __DIR__ . '/defaults/' . $slug . '.php';
			if ( ! is_readable( $file ) ) {
				return [];
			}

			$defaults = include $file;

			return is_array( $defaults ) ? $defaults : [];
		}

		/**
		 * Extracts and normalizes Swiper.js configuration from block attributes.
		 *
		 * Gutenberg omits attributes that are still at their default, so the raw
		 * block comment is merged with that block's attributes.js defaults first.
		 * Stored values win. Image Slider and Logo Carousel have no sliderType
		 * and always use carouselEffect.
		 *
		 * @since 1.1.9
		 *
		 * @param array  $attrs      Block attributes from the block comment.
		 * @param string $block_name Block name, such as gslider-blocks/base.
		 * @return array Swiper.js configuration object.
		 */
		public static function extract_swiper_config( array $attrs, string $block_name = '' ): array {
			$attrs = self::merge_swiper_defaults( $block_name, $attrs );

			$uses_slider_type = in_array(
				$block_name,
				[ 'gslider-blocks/base', 'gslider-blocks/testimonial', 'gslider-blocks/flexi-content' ],
				true
			);
			$carousel_effect  = $attrs['carouselEffect'] ?? 'slide';
			$slide_effect     = $attrs['slideEffect'] ?? 'slide';

			if ( $uses_slider_type ) {
				$slider_type = $attrs['sliderType'] ?? 'slider';
				$effect      = 'carousel' === $slider_type ? $carousel_effect : $slide_effect;
			} else {
				$slider_type = 'carousel';
				$effect      = $carousel_effect;
			}

			$per_column     = is_array( $attrs['carouselPerColumn'] ?? null ) ? $attrs['carouselPerColumn'] : [];
			$gap            = is_array( $attrs['carouselPerColumnGap'] ?? null ) ? $attrs['carouselPerColumnGap'] : [];
			$speed          = is_array( $attrs['speed'] ?? null ) ? $attrs['speed'] : [];
			$autoplay       = ! empty( $attrs['autoplay'] );
			$autoplay_delay = is_array( $attrs['autoplayDelay'] ?? null ) ? $attrs['autoplayDelay'] : [];

			$show_nav  = is_array( $attrs['showNavigation'] ?? null ) ? $attrs['showNavigation'] : [];
			$show_pagi = is_array( $attrs['showPagination'] ?? null ) ? $attrs['showPagination'] : [];

			$nav_mobile  = ! empty( $show_nav['Mobile'] );
			$nav_tablet  = ! empty( $show_nav['Tablet'] );
			$nav_desktop = ! empty( $show_nav['Desktop'] );
			$any_nav     = $nav_mobile || $nav_tablet || $nav_desktop;

			$pagi_mobile  = ! empty( $show_pagi['Mobile'] );
			$pagi_tablet  = ! empty( $show_pagi['Tablet'] );
			$pagi_desktop = ! empty( $show_pagi['Desktop'] );
			$any_pagi     = $pagi_mobile || $pagi_tablet || $pagi_desktop;

			$pagination_type = $attrs['paginationType'] ?? 'bullets';
			$dynamic_bullets = 'bullets' === $pagination_type && ! empty( $attrs['dynamicBullets'] );
			$is_carousel     = 'carousel' === $slider_type;

			$devices     = [
				0    => 'Mobile',
				768  => 'Tablet',
				1025 => 'Desktop',
			];
			$nav_by_device  = [
				'Mobile'  => $nav_mobile,
				'Tablet'  => $nav_tablet,
				'Desktop' => $nav_desktop,
			];
			$pagi_by_device = [
				'Mobile'  => $pagi_mobile,
				'Tablet'  => $pagi_tablet,
				'Desktop' => $pagi_desktop,
			];
			$allow_touch_move = ! isset( $attrs['allowTouchMove'] ) || ! empty( $attrs['allowTouchMove'] );
			$grab_cursor      = ! empty( $attrs['enableGrabCursor'] ) && $allow_touch_move;
			$breakpoints      = [];

			foreach ( $devices as $width => $device ) {
				$breakpoint = [
					'speed'      => (int) ( $speed[ $device ] ?? 800 ),
					'autoplay'   => $autoplay ? [ 'delay' => (int) ( $autoplay_delay[ $device ] ?? 1000 ) ] : false,
					'navigation' => [ 'enabled' => $nav_by_device[ $device ] ],
					'pagination' => [ 'enabled' => $pagi_by_device[ $device ] ],
				];

				if ( $grab_cursor ) {
					$breakpoint['grabCursor'] = true;
				}

				if ( $is_carousel ) {
					$breakpoint = [
						'slidesPerView' => (float) ( $per_column[ $device ] ?? 1 ),
						'spaceBetween'  => (int) ( $gap[ $device ] ?? 0 ),
					] + $breakpoint;
				}

				$breakpoints[ $width ] = $breakpoint;
			}

			$config = [
				'effect'         => $effect,
				'loop'           => ! empty( $attrs['infiniteLoop'] ),
				'allowTouchMove' => $allow_touch_move,
				'mousewheel'     => ! empty( $attrs['mousewheelControl'] ),
				'keyboard'       => ! empty( $attrs['keyboardNavigation'] ) ? [
					'enabled'        => true,
					'onlyInViewport' => true,
					'pageUpDown'     => false,
				] : false,
				'breakpoints'    => $breakpoints,
				'navigation'     => [
					'enabled' => $any_nav,
				],
				'pagination'     => [
					'enabled'        => $any_pagi,
					'type'           => $pagination_type,
					'dynamicBullets' => $dynamic_bullets,
					'clickable'      => true,
				],
			];

			if ( $autoplay ) {
				$pause_on_hover = ! empty( $attrs['pauseOnHover'] );
				if ( 'gslider-blocks/post-carousel' === $block_name ) {
					$card_hover     = isset( $attrs['cardHoverAnimation'] ) && is_string( $attrs['cardHoverAnimation'] ) ? $attrs['cardHoverAnimation'] : 'none';
					$pause_on_hover = $pause_on_hover || ! empty( $attrs['enableCardTilt'] ) || 'none' !== $card_hover;
				}

				$config['autoplay'] = [
					'pauseOnMouseEnter'    => $pause_on_hover,
					'disableOnInteraction' => false,
					'stopOnLastSlide'      => ! empty( $attrs['stopOnLastSlide'] ),
					'reverseDirection'     => ! empty( $attrs['reverseDirection'] ),
				];
			} else {
				$config['autoplay'] = false;
			}

			$is_vertical = 'vertical' === ( $attrs['direction'] ?? 'horizontal' );

			if ( $uses_slider_type && 'creative' === $slide_effect ) {
				$config['creativeEffect'] = [
					'prev' => [
						'shadow'    => true,
						'translate' => [ 0, 0, -400 ],
					],
					'next' => [
						'translate' => $is_vertical ? [ 0, '100%', 0 ] : [ '100%', 0, 0 ],
					],
				];
			}

			if ( $is_vertical ) {
				$config['direction'] = 'vertical';
			}

			// Vertical slides use the fixed height, autoHeight does not work with it.
			if ( ! $is_vertical && isset( $attrs['layoutHeightSwitcher'] ) && 'adapt' === $attrs['layoutHeightSwitcher'] ) {
				$config['autoHeight'] = true;
			}

			if ( 'gslider-blocks/flexi-content' === $block_name ) {
				$config['observer']       = true;
				$config['observeParents'] = true;
				$config['resizeObserver'] = true;
			}

			if ( $grab_cursor ) {
				$config['grabCursor'] = true;
			}

			if ( 'gslider-blocks/post-carousel' === $block_name && ! empty( $attrs['enableSpotlight'] ) ) {
				$config['centeredSlides'] = true;
			}

			return $config;
		}

		/**
		 * Fills omitted Swiper attributes with that block's attributes.js defaults.
		 *
		 * Only the attributes in SWIPER_ATTRIBUTES are filled. A stored value,
		 * including numeric 0 and boolean false, is left as stored. A stored
		 * per-device map that lacks a device gets that device's default.
		 *
		 * @since 1.1.9
		 *
		 * @param string $block_name Block name.
		 * @param array  $attrs      Raw block attributes.
		 * @return array Attributes with missing Swiper defaults filled in.
		 */
		private static function merge_swiper_defaults( string $block_name, array $attrs ): array {
			$defaults = array_intersect_key(
				self::attribute_defaults( $block_name ),
				array_flip( self::SWIPER_ATTRIBUTES )
			);

			foreach ( $defaults as $key => $default ) {
				if ( ! array_key_exists( $key, $attrs ) ) {
					$attrs[ $key ] = $default;
					continue;
				}

				if ( is_array( $default ) && is_array( $attrs[ $key ] ) ) {
					foreach ( $default as $device => $value ) {
						if ( ! array_key_exists( $device, $attrs[ $key ] ) ) {
							$attrs[ $key ][ $device ] = $value;
						}
					}
				}
			}

			return $attrs;
		}

		/**
		 * Extracts the pre-generated blockStyle CSS string from attributes.
		 *
		 * Applies the same block-ID validation and selector scoping as
		 * StyleGenerator so the REST `css` field cannot carry unscoped rules.
		 *
		 * @since 1.1.9
		 *
		 * @param array $attrs Block attributes.
		 * @return string Sanitized, scoped CSS stylesheet string.
		 */
		public static function extract_block_styles( array $attrs ): string {
			if ( empty( $attrs['blockStyle'] ) || ! is_string( $attrs['blockStyle'] ) ) {
				return '';
			}

			$raw_id   = isset( $attrs['blockId'] ) && is_string( $attrs['blockId'] ) ? $attrs['blockId'] : '';
			$block_id = sanitize_key( $raw_id );

			if ( ! StyleGenerator::is_valid_block_id( $block_id ) ) {
				return '';
			}

			return StyleGenerator::getInstance()->sanitize_css( $attrs['blockStyle'], $block_id );
		}

		/**
		 * Normalizes Image Slider slides.
		 *
		 * @since 1.1.9
		 *
		 * @param array $attrs Block attributes.
		 * @return array Normalized array of slides.
		 */
		public static function normalize_image_slider( array $attrs ): array {
			$images = isset( $attrs['images'] ) && is_array( $attrs['images'] ) ? $attrs['images'] : [];
			$slides = [];

			foreach ( $images as $index => $item ) {
				if ( ! is_array( $item ) ) {
					continue;
				}

				// Old slides have no video keys, which means the same as 'html5'
				$video_source = isset( $item['videoSource'] ) && in_array( $item['videoSource'], array( 'html5', 'youtube', 'vimeo' ), true )
					? $item['videoSource']
					: 'html5';

				$slides[] = [
					'id'               => $item['id'] ?? ( $index + 1 ),
					'url'              => esc_url_raw( $item['url'] ?? '' ),
					'alt'              => sanitize_text_field( $item['alt'] ?? '' ),
					'caption'          => sanitize_text_field( $item['caption'] ?? '' ),
					'link'             => esc_url_raw( $item['link'] ?? '' ),
					'tooltipText'      => sanitize_text_field( $item['tooltipText'] ?? '' ),
					'videoSource'      => $video_source,
					'videoExternalUrl' => esc_url_raw( $item['videoExternalUrl'] ?? '' ),
					'videoExternalId'  => sanitize_text_field( $item['videoExternalId'] ?? '' ),
				];
			}

			return $slides;
		}

		/**
		 * Normalizes Logo Carousel slides.
		 *
		 * @since 1.1.9
		 *
		 * @param array $attrs Block attributes.
		 * @return array Normalized array of slides.
		 */
		public static function normalize_logo_carousel( array $attrs ): array {
			$logos  = isset( $attrs['logos'] ) && is_array( $attrs['logos'] ) ? $attrs['logos'] : [];
			$slides = [];

			foreach ( $logos as $index => $item ) {
				if ( ! is_array( $item ) ) {
					continue;
				}

				$slides[] = [
					'id'          => $item['id'] ?? ( $index + 1 ),
					'url'         => esc_url_raw( $item['url'] ?? '' ),
					'alt'         => sanitize_text_field( $item['alt'] ?? '' ),
					'caption'     => sanitize_text_field( $item['caption'] ?? '' ),
					'link'        => esc_url_raw( $item['link'] ?? '' ),
					'tooltipText' => sanitize_text_field( $item['tooltipText'] ?? '' ),
				];
			}

			return $slides;
		}

		/**
		 * Normalizes Testimonial slides.
		 *
		 * @since 1.1.9
		 *
		 * @param array $attrs Block attributes.
		 * @return array Normalized array of slides.
		 */
		public static function normalize_testimonial( array $attrs ): array {
			$items  = isset( $attrs['sliderItems'] ) && is_array( $attrs['sliderItems'] ) ? $attrs['sliderItems'] : [];
			$slides = [];

			foreach ( $items as $index => $item ) {
				if ( ! is_array( $item ) ) {
					continue;
				}

				$author_image_url = '';
				$author_image_alt = '';
				if ( ! empty( $item['authorImage'] ) && is_array( $item['authorImage'] ) ) {
					$author_image_url = esc_url_raw( $item['authorImage']['url'] ?? '' );
					$author_image_alt = sanitize_text_field( $item['authorImage']['alt'] ?? '' );
				}

				$rating = isset( $item['ratingNumber'] ) ? (float) $item['ratingNumber'] : 5.0;

				$slides[] = [
					'id'                => $item['id'] ?? ( $index + 1 ),
					'authorName'        => wp_kses_post( $item['authorName'] ?? '' ),
					'authorDesignation' => wp_kses_post( $item['authorDesignation'] ?? '' ),
					'authorImageUrl'    => $author_image_url,
					'authorImageAlt'    => $author_image_alt,
					'testimonialTitle'  => wp_kses_post( $item['testimonialTitle'] ?? '' ),
					'testimonialText'   => wp_kses_post( $item['testimonialText'] ?? '' ),
					'ratingNumber'      => max( 0.0, min( 5.0, $rating ) ),
				];
			}

			return $slides;
		}

		/**
		 * Normalizes Base block slides from sliderItems.
		 *
		 * @since 1.1.9
		 *
		 * @param array $attrs Block attributes.
		 * @return array Normalized array of slides.
		 */
		public static function normalize_base( array $attrs ): array {
			$items  = isset( $attrs['sliderItems'] ) && is_array( $attrs['sliderItems'] ) ? $attrs['sliderItems'] : [];
			$slides = [];

			foreach ( $items as $index => $item ) {
				if ( ! is_array( $item ) ) {
					continue;
				}

				$slides[] = [
					'id'                        => $item['id'] ?? ( $index + 1 ),
					'subTitle'                  => wp_kses_post( (string) ( $item['subTitle'] ?? '' ) ),
					'title'                     => wp_kses_post( (string) ( $item['title'] ?? '' ) ),
					'description'               => wp_kses_post( (string) ( $item['description'] ?? '' ) ),
					'primaryButtonText'         => wp_kses_post( (string) ( $item['primaryButtonText'] ?? '' ) ),
					'primaryButtonLink'         => esc_url_raw( (string) ( $item['primaryButtonLink'] ?? '' ) ),
					'primaryButtonTargetLink'   => self::base_flag( $item, 'primaryButtonTargetLink', true ),
					'primaryButtonNofollow'     => self::base_flag( $item, 'primaryButtonNofollow', false ),
					'primaryButtonSponsored'    => self::base_flag( $item, 'primaryButtonSponsored', false ),
					'secondaryButtonSwitcher'   => self::base_flag( $item, 'secondaryButtonSwitcher', false ),
					'secondaryButtonText'       => wp_kses_post( (string) ( $item['secondaryButtonText'] ?? '' ) ),
					'secondaryButtonLink'       => esc_url_raw( (string) ( $item['secondaryButtonLink'] ?? '' ) ),
					'secondaryButtonTargetLink' => self::base_flag( $item, 'secondaryButtonTargetLink', true ),
					'secondaryButtonNofollow'   => self::base_flag( $item, 'secondaryButtonNofollow', false ),
					'secondaryButtonSponsored'  => self::base_flag( $item, 'secondaryButtonSponsored', false ),
				];
			}

			return $slides;
		}

		/**
		 * Reads a base-slide button flag without turning it into a string.
		 *
		 * @since 1.1.9
		 *
		 * @param array  $item    Slide item.
		 * @param string $key     Attribute key.
		 * @param bool   $default Value used when the editor omitted the key.
		 * @return bool Boolean flag.
		 */
		private static function base_flag( array $item, string $key, bool $default ): bool {
			if ( ! array_key_exists( $key, $item ) ) {
				return $default;
			}

			return (bool) $item[ $key ];
		}

		/**
		 * Normalizes Flexi Content slides from inner blocks.
		 *
		 * @since 1.1.9
		 *
		 * @param array $inner_blocks Array of child blocks from parse_blocks().
		 * @return array Normalized array of slides.
		 */
		public static function normalize_flexi_content( array $inner_blocks ): array {
			$slides = [];

			foreach ( $inner_blocks as $index => $inner_block ) {
				if ( ! is_array( $inner_block ) ) {
					continue;
				}

				$inner_name  = $inner_block['blockName'] ?? '';
				$inner_attrs = isset( $inner_block['attrs'] ) && is_array( $inner_block['attrs'] ) ? $inner_block['attrs'] : [];
				$slide_id    = isset( $inner_attrs['blockId'] ) ? sanitize_key( $inner_attrs['blockId'] ) : ( 'slide-' . ( $index + 1 ) );

				// Render through StyleGenerator so the slide keeps its scoped <style> tags in REST output.
				$inner_html = class_exists( StyleGenerator::class )
					? StyleGenerator::render_block_with_styles( $inner_block )
					: render_block( $inner_block );

				$slides[] = [
					'id'          => $slide_id,
					'blockName'   => $inner_name,
					'innerHtml'   => $inner_html,
					'css'         => self::collect_inner_block_styles( $inner_block ),
					'innerBlocks' => $inner_block['innerBlocks'] ?? [],
				];
			}

			return $slides;
		}

		/**
		 * Normalizes Post Carousel slides by executing the configured WP_Query.
		 *
		 * Delegates query sanitization and excerpt resolution to PostCarouselRenderer
		 * and CardMarkupBuilder while returning structured JSON-safe post objects
		 * for headless frontends. Preserves and restores any prior global post and
		 * postdata context around each carousel query.
		 *
		 * @since 1.2.3
		 *
		 * @param array $attrs        Block attributes merged with defaults.
		 * @param int   $host_post_id Optional enclosing host post ID for related/exclude queries.
		 * @return array Normalized array of post slide objects.
		 */
		public static function normalize_post_carousel( array $attrs, int $host_post_id = 0 ): array {
			if (
				! class_exists( '\WP_Query' ) ||
				! class_exists( PostCarouselRenderer::class ) ||
				! function_exists( 'post_type_exists' ) ||
				! function_exists( 'is_post_type_viewable' )
			) {
				return [];
			}

			$previous_post = $GLOBALS['post'] ?? null;

			try {
				if ( $host_post_id > 0 && ( ! ( $previous_post instanceof \WP_Post ) || (int) $previous_post->ID !== $host_post_id ) && function_exists( 'get_post' ) ) {
					$host_post = get_post( $host_post_id );
					if ( $host_post instanceof \WP_Post ) {
						$GLOBALS['post'] = $host_post;
						if ( function_exists( 'setup_postdata' ) ) {
							setup_postdata( $host_post );
						}
					}
				}

				$query_options = PostCarouselRenderer::parse_query_options( $attrs );
				$query_args    = PostCarouselRenderer::build_query_args( $query_options, $host_post_id );
				$context       = PostCarouselRenderer::build_render_context( $attrs );
				$posts_query   = new \WP_Query( $query_args );

				// Enforce the 1-30 cap even when WP_Query prepends sticky posts beyond posts_per_page.
				$posts_per_page = (int) $query_options['posts_per_page'];
				if ( is_array( $posts_query->posts ) && count( $posts_query->posts ) > $posts_per_page ) {
					$posts_query->posts      = array_slice( $posts_query->posts, 0, $posts_per_page );
					$posts_query->post_count = count( $posts_query->posts );
				}

				if ( ! $posts_query->have_posts() ) {
					return [];
				}

				$can_build_excerpt = class_exists( CardMarkupBuilder::class )
					&& function_exists( 'has_excerpt' )
					&& function_exists( 'get_the_excerpt' )
					&& function_exists( 'get_the_content' )
					&& function_exists( 'strip_shortcodes' )
					&& function_exists( 'wp_trim_words' );

				$slides = [];

				while ( $posts_query->have_posts() ) {
					$posts_query->the_post();
					$post_id = function_exists( 'get_the_ID' ) ? (int) get_the_ID() : 0;
					if ( $post_id <= 0 ) {
						continue;
					}

					$title = function_exists( 'get_the_title' )
						? sanitize_text_field( (string) get_the_title( $post_id ) )
						: '';

					if ( $can_build_excerpt ) {
						$excerpt = sanitize_text_field( CardMarkupBuilder::build_excerpt( $post_id, $context ) );
					} elseif ( function_exists( 'get_the_excerpt' ) ) {
						$excerpt = sanitize_text_field( (string) get_the_excerpt( $post_id ) );
					} else {
						$excerpt = '';
					}

					$link = function_exists( 'get_permalink' )
						? esc_url_raw( (string) get_permalink( $post_id ) )
						: '';

					$date = function_exists( 'get_the_date' )
						? sanitize_text_field( (string) get_the_date( '', $post_id ) )
						: '';

					$featured_image = null;
					if ( function_exists( 'has_post_thumbnail' ) && has_post_thumbnail( $post_id ) ) {
						$thumb_id  = function_exists( 'get_post_thumbnail_id' ) ? (int) get_post_thumbnail_id( $post_id ) : 0;
						$thumb_url = '';
						if ( function_exists( 'get_the_post_thumbnail_url' ) ) {
							$thumb_url = (string) get_the_post_thumbnail_url( $post_id, 'medium_large' );
						} elseif ( $thumb_id > 0 && function_exists( 'wp_get_attachment_image_src' ) ) {
							$thumb_src = wp_get_attachment_image_src( $thumb_id, 'medium_large' );
							$thumb_url = is_array( $thumb_src ) && ! empty( $thumb_src[0] ) ? (string) $thumb_src[0] : '';
						}

						$thumb_alt = '';
						if ( $thumb_id > 0 && function_exists( 'get_post_meta' ) ) {
							$thumb_alt = (string) get_post_meta( $thumb_id, '_wp_attachment_image_alt', true );
						}

						if ( '' !== $thumb_url ) {
							$featured_image = [
								'id'  => $thumb_id,
								'url' => esc_url_raw( $thumb_url ),
								'alt' => sanitize_text_field( '' !== $thumb_alt ? $thumb_alt : $title ),
							];
						}
					}

					$author_id   = function_exists( 'get_the_author_meta' ) ? (int) get_the_author_meta( 'ID' ) : 0;
					$author_name = function_exists( 'get_the_author' ) ? sanitize_text_field( (string) get_the_author() ) : '';
					$avatar_raw  = ( $author_id > 0 && function_exists( 'get_avatar_url' ) ) ? get_avatar_url( $author_id, [ 'size' => 96 ] ) : '';
					$author      = [
						'id'     => $author_id,
						'name'   => $author_name,
						'avatar' => is_string( $avatar_raw ) && '' !== $avatar_raw ? esc_url_raw( $avatar_raw ) : '',
					];

					$categories = function_exists( 'get_the_category' )
						? self::normalize_post_terms( get_the_category( $post_id ), 'category' )
						: [];
					$tags       = function_exists( 'get_the_tags' )
						? self::normalize_post_terms( get_the_tags( $post_id ), 'post_tag' )
						: [];

					$slides[] = [
						'id'            => $post_id,
						'title'         => $title,
						'excerpt'       => $excerpt,
						'link'          => $link,
						'date'          => $date,
						'featuredImage' => $featured_image,
						'author'        => $author,
						'categories'    => $categories,
						'tags'          => $tags,
					];
				}

				return $slides;
			} finally {
				self::restore_post_context( $previous_post );
			}
		}

		/**
		 * Restores the prior global post object and postdata state after nested queries.
		 *
		 * Calls `wp_reset_postdata()` first and then reinstates `$GLOBALS['post']`
		 * (and its `setup_postdata()` globals when `$previous_post` is a `WP_Post`)
		 * so REST and secondary-loop callers keep their original post context.
		 *
		 * @since 1.2.3
		 *
		 * @param mixed $previous_post Prior `$GLOBALS['post']` value saved before query execution.
		 * @return void
		 */
		private static function restore_post_context( $previous_post ): void {
			if ( function_exists( 'wp_reset_postdata' ) ) {
				wp_reset_postdata();
			}

			if ( $previous_post instanceof \WP_Post ) {
				$GLOBALS['post'] = $previous_post;
				if ( function_exists( 'setup_postdata' ) ) {
					setup_postdata( $previous_post );
				}
				return;
			}

			$GLOBALS['post'] = $previous_post;
		}

		/**
		 * Normalizes taxonomy term objects for a queried Post Carousel slide.
		 *
		 * @since 1.2.3
		 *
		 * @param mixed  $terms    Raw term list returned by WordPress taxonomy APIs.
		 * @param string $taxonomy Taxonomy slug ('category' or 'post_tag').
		 * @return array Normalized taxonomy term arrays.
		 */
		private static function normalize_post_terms( $terms, string $taxonomy ): array {
			if ( ! is_array( $terms ) || empty( $terms ) ) {
				return [];
			}

			$normalized = [];
			foreach ( $terms as $term ) {
				if ( ! is_object( $term ) || ! isset( $term->term_id, $term->name ) ) {
					continue;
				}

				$term_id  = (int) $term->term_id;
				$raw_slug = isset( $term->slug ) ? (string) $term->slug : (string) $term->name;
				$slug     = function_exists( 'sanitize_title' ) ? sanitize_title( $raw_slug ) : sanitize_key( $raw_slug );
				$link     = '';

				if ( 'category' === $taxonomy && function_exists( 'get_category_link' ) ) {
					$link = (string) get_category_link( $term_id );
				} elseif ( 'post_tag' === $taxonomy && function_exists( 'get_tag_link' ) ) {
					$link = (string) get_tag_link( $term_id );
				}

				$normalized[] = [
					'id'   => $term_id,
					'name' => sanitize_text_field( (string) $term->name ),
					'slug' => $slug,
					'link' => esc_url_raw( $link ),
				];
			}

			return $normalized;
		}

		/**
		 * Collects the sanitized blockStyle CSS of a block and all of its nested inner blocks.
		 *
		 * Exposed as slides[].css so headless consumers can apply Flexi Content slide styles
		 * without parsing <style> tags out of innerHtml.
		 *
		 * @since 1.2.0
		 *
		 * @param array $block Parsed block array.
		 * @return string Concatenated sanitized CSS (empty string when none).
		 */
		public static function collect_inner_block_styles( array $block ): string {
			$css   = [];
			$attrs = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : [];
			$own   = self::extract_block_styles( $attrs );

			if ( '' !== $own ) {
				$css[] = $own;
			}

			if ( ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
				foreach ( $block['innerBlocks'] as $child ) {
					if ( is_array( $child ) ) {
						$child_css = self::collect_inner_block_styles( $child );
						if ( '' !== $child_css ) {
							$css[] = $child_css;
						}
					}
				}
			}

			return implode( "\n", $css );
		}

	}

}
