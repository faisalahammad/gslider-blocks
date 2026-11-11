<?php
/**
 * Dynamic CSS generator for GSlider Blocks.
 *
 * Collects block styles during rendering, applies strict CSS sanitization
 * to prevent arbitrary CSS injection, enforces block-level scoping, and
 * outputs safe scoped styles inline.
 *
 * @package GSlider\Classes
 * @since   1.0.0
 */

namespace GSlider\Classes;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;
use GSlider\Utils\CssSanitizer;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( StyleGenerator::class, false ) ) {

    /**
     * Generates and manages safe dynamic CSS for GSlider blocks.
     *
     * Collects styles from rendered blocks, sanitizes them to ensure
     * all rules are scoped to the block ID and free of arbitrary code,
     * and injects them via WordPress core inline style APIs.
     *
     * @since 1.0.0
     */
    class StyleGenerator implements Registrable {

        use SingletonTrait;

        /**
         * Collected and sanitized block styles keyed by block ID.
         *
         * @since 1.0.0
         *
         * @var string[]
         */
        private static $styles = [];

        /**
         * Track block IDs whose style tags have already been rendered on the current request.
         *
         * Prevents duplicate <style> tags for the same block ID (e.g. in query loops or synced patterns).
         *
         * @since 1.2.0
         *
         * @var array<string, bool>
         */
        private static $printed = [];

        /**
         * Track whether the LCP image priority has been applied to the first slide on the page.
         *
         * @since 1.2.0
         *
         * @var bool
         */
        private static $lcp_optimized = false;

        /**
         * Depth counter for headless renders that must keep inline styles inside REST responses.
         *
         * @since 1.2.0
         *
         * @var int
         */
        private static $headless_depth = 0;

        /**
         * Registers hooks for style collection, sanitization, and rendering.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function register(): void {
            add_filter( 'render_block', [ $this, 'collect_and_render_dynamic_styles' ], 10, 2 );
            add_action( 'wp_footer', [ $this, 'print_footer_styles' ], 20 );
            add_action( 'wp_enqueue_scripts', [ $this, 'register_style_handle' ], 20 );
        }

        /**
         * Registers the dynamic style handle for WordPress enqueue system.
         *
         * @since 1.2.0
         *
         * @return void
         */
        public function register_style_handle(): void {
            if ( ! wp_style_is( 'gslider-blocks-dynamic-styles', 'registered' ) ) {
                wp_register_style( 'gslider-blocks-dynamic-styles', false, [], GSLIDER_VERSION );
                wp_enqueue_style( 'gslider-blocks-dynamic-styles' );
            }
        }

        /**
         * Collects, sanitizes, and renders dynamic styles for GSlider blocks.
         *
         * Extracts the blockStyle attribute from each GSlider block,
         * strictly validates that all CSS rules are scoped to the block ID,
         * strips dangerous properties/protocols, and injects safe scoped CSS.
         *
         * @since 1.0.0
         *
         * @param string $block_content The block content being rendered.
         * @param array  $block         The full block data including attributes.
         * @return string The block content with safe scoped styles.
         */
        public function collect_and_render_dynamic_styles( $block_content, $block ) {
            if ( ! is_array( $block ) || empty( $block['blockName'] ) ) {
                return $block_content;
            }

            // Never print styles or touch markup inside RSS/Atom feeds (#312).
            if ( function_exists( 'is_feed' ) && is_feed() ) {
                return $block_content;
            }

            $headless = self::$headless_depth > 0;

            // Generic REST responses (e.g. content.rendered) get no inline CSS (#312), except
            // the plugin's own headless renders (BlockParser), which need per-slide CSS.
            if ( ! $headless && self::is_rest_request() ) {
                return $block_content;
            }

            if ( false === strpos( $block['blockName'], 'gslider-blocks/' ) ) {
                return $block_content;
            }

            if ( ! $headless ) {
                // Apply LCP image priority to the first slide image on the page (frontend only).
                $block_content = $this->optimize_lcp_image( $block_content );

                // Ensure explicit width and height attributes on slide images to eliminate CLS (#391).
                $block_content = $this->ensure_image_dimensions( $block_content, $block );
            }

            if ( empty( $block['attrs']['blockStyle'] ) ) {
                return $block_content;
            }

            $raw_id   = isset( $block['attrs']['blockId'] ) && is_string( $block['attrs']['blockId'] )
                ? $block['attrs']['blockId']
                : '';
            $block_id = sanitize_key( $raw_id );

            // Refuse CSS when the stored ID is empty, too short, or not a GSlider ID.
            if ( ! self::is_valid_block_id( $block_id ) ) {
                return $block_content;
            }

            $raw_style = is_string( $block['attrs']['blockStyle'] ) ? $block['attrs']['blockStyle'] : '';

            // Strictly sanitize CSS to prevent arbitrary CSS injection.
            $clean_style = $this->sanitize_css( $raw_style, $block_id );

            if ( empty( $clean_style ) ) {
                return $block_content;
            }

            self::$styles[ $block_id ] = $clean_style;

            // Headless slide HTML is consumed piece by piece, so every slide keeps its own style tag.
            // On normal pages, render the <style> tag only once per unique block ID per request.
            if ( ! $headless ) {
                if ( ! empty( self::$printed[ $block_id ] ) ) {
                    return $block_content;
                }
                self::$printed[ $block_id ] = true;
            }

            $nonce      = $this->get_csp_nonce();
            $nonce_attr = ! empty( $nonce ) ? ' nonce="' . esc_attr( $nonce ) . '"' : '';
            $style_tag  = '<style id="gslider-style-' . esc_attr( $block_id ) . '"' . $nonce_attr . '>' . $clean_style . '</style>';

            return $style_tag . $block_content;
        }

        /**
         * Renders a block for the plugin's headless REST output while keeping its inline styles.
         *
         * Used by BlockParser::normalize_flexi_content() so /gslider/v1 consumers still receive
         * per-slide CSS even though generic REST responses are stripped of inline styles.
         *
         * @since 1.2.0
         *
         * @param array $block Parsed block array.
         * @return string Rendered block HTML including scoped <style> tags.
         */
        public static function render_block_with_styles( array $block ): string {
            self::$headless_depth++;

            try {
                $html = render_block( $block );
            } finally {
                self::$headless_depth--;
            }

            return is_string( $html ) ? $html : '';
        }

        /**
         * Determines whether the current request is a WordPress REST API request.
         *
         * Deliberately does not use wp_is_json_request(), which is also true for
         * front-end AJAX loaders that send a JSON Accept header.
         *
         * @since 1.2.0
         *
         * @return bool True when serving a REST API request.
         */
        private static function is_rest_request(): bool {
            if ( function_exists( 'wp_is_serving_rest_request' ) ) {
                return (bool) wp_is_serving_rest_request();
            }

            return defined( 'REST_REQUEST' ) && REST_REQUEST;
        }

        /**
         * Prioritizes the first real slide image of the first GSlider slider on the page for LCP.
         *
         * Uses WP_HTML_Tag_Processor so attribute values are never rewritten as raw text.
         * Sets fetchpriority="high" and decoding="async", and switches loading="lazy" to
         * loading="eager" exclusively on the first slide (index === 0). Images outside a
         * slide, UI icons (rating/readmore/navigation), author avatars, and secondary
         * slides are skipped so they retain lazy loading.
         *
         * @since 1.2.0
         *
         * @param string $block_content The block HTML content.
         * @return string Optimized block HTML content, or the original HTML when nothing applies.
         */
        public function optimize_lcp_image( string $block_content ): string {
            if ( self::$lcp_optimized || '' === $block_content ) {
                return $block_content;
            }

            // Only run on frontend page loads (skip admin, REST requests, and feeds).
            if ( is_admin() || self::is_rest_request() || ( function_exists( 'is_feed' ) && is_feed() ) ) {
                return $block_content;
            }

            if ( false === stripos( $block_content, '<img' ) || false === strpos( $block_content, 'swiper-slide' ) ) {
                return $block_content;
            }

            if ( ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
                return $block_content;
            }

            /**
             * Filters whether to optimize the first slider image for LCP on the frontend.
             *
             * Return false to disable automatic fetchpriority="high", loading="eager"
             * and decoding="async" on the first slide image.
             *
             * @since 1.2.0
             *
             * @param bool   $optimize      Whether to optimize the LCP image. Default true.
             * @param string $block_content The block HTML content.
             */
            if ( ! apply_filters( 'gslider_lcp_optimize', true, $block_content ) ) {
                return $block_content;
            }

            $processor             = new \WP_HTML_Tag_Processor( $block_content );
            $has_slide             = false;
            $in_slide              = false;
            $slide_index           = -1;
            $after_ignored_wrapper = false;
            $optimized             = false;

            while ( $processor->next_tag() ) {
                if ( $processor->is_tag_closer() ) {
                    continue;
                }

                $classes = $processor->get_attribute( 'class' );
                $classes = is_string( $classes ) ? ' ' . preg_replace( '/\s+/', ' ', $classes ) . ' ' : '';

                if ( 'IMG' !== $processor->get_tag() ) {
                    if ( false !== strpos( $classes, ' swiper-slide ' ) ) {
                        $has_slide   = true;
                        $in_slide    = true;
                        ++$slide_index;
                    } elseif (
                        false !== strpos( $classes, ' gslider-navigation-custom-icon-wrapper ' ) ||
                        false !== strpos( $classes, ' gslider-navigation-default-icon-wrapper ' ) ||
                        false !== strpos( $classes, ' swiper-pagination ' ) ||
                        false !== strpos( $classes, ' gslider-nav ' )
                    ) {
                        $in_slide = false;
                    }

                    // Ignored inner icon/avatar wrappers hold a non-LCP <img> as their next tag.
                    $after_ignored_wrapper = (
                        false !== strpos( $classes, 'rating-icon' ) ||
                        false !== strpos( $classes, ' gslider-post-author-avatar-wrapper ' ) ||
                        false !== strpos( $classes, ' gslider-readmore-icon-wrap ' )
                    );
                    continue;
                }

                if (
                    ! $in_slide ||
                    0 !== $slide_index ||
                    $after_ignored_wrapper ||
                    false !== strpos( $classes, 'rating' ) ||
                    false !== strpos( $classes, ' gslider-post-author-avatar ' ) ||
                    false !== strpos( $classes, ' nav-icon ' )
                ) {
                    $after_ignored_wrapper = false;
                    continue;
                }

                if ( null === $processor->get_attribute( 'fetchpriority' ) ) {
                    $processor->set_attribute( 'fetchpriority', 'high' );
                }
                if ( null === $processor->get_attribute( 'decoding' ) ) {
                    $processor->set_attribute( 'decoding', 'async' );
                }

                $loading = $processor->get_attribute( 'loading' );
                if ( is_string( $loading ) && 'lazy' === strtolower( $loading ) ) {
                    $processor->set_attribute( 'loading', 'eager' );
                }

                $optimized = true;
                break;
            }

            if ( ! $has_slide ) {
                return $block_content;
            }

            // The first slider on the page has been handled (with or without an image).
            self::$lcp_optimized = true;

            return $optimized ? $processor->get_updated_html() : $block_content;
        }

        /**
         * Ensures explicit width and height HTML attributes on slide images to eliminate CLS (#391).
         *
         * Uses WP_HTML_Tag_Processor (no regex) and only touches <img> tags inside
         * .swiper-slide whose src points to the same file as a block image/logo/author/rating item.
         * Dimensions come from the attachment size that matches the URL (full or an
         * intermediate size), so cropped sizes keep their real aspect ratio.
         *
         * @since 1.2.0
         *
         * @param string $block_content The block HTML content.
         * @param array  $block         The block data and attributes.
         * @return string Updated block HTML with width/height attributes on slide images.
         */
        public function ensure_image_dimensions( string $block_content, array $block ): string {
            if ( '' === $block_content || empty( $block['attrs'] ) || ! is_array( $block['attrs'] ) ) {
                return $block_content;
            }

            if ( is_admin() || self::is_rest_request() || ( function_exists( 'is_feed' ) && is_feed() ) ) {
                return $block_content;
            }

            if ( false === stripos( $block_content, '<img' ) || ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
                return $block_content;
            }

            $items = [];
            if ( ! empty( $block['attrs']['images'] ) && is_array( $block['attrs']['images'] ) ) {
                $items = $block['attrs']['images'];
            } elseif ( ! empty( $block['attrs']['logos'] ) && is_array( $block['attrs']['logos'] ) ) {
                $items = $block['attrs']['logos'];
            } elseif ( ! empty( $block['attrs']['sliderItems'] ) && is_array( $block['attrs']['sliderItems'] ) ) {
                foreach ( $block['attrs']['sliderItems'] as $slide ) {
                    if ( ! empty( $slide['authorImage'] ) && is_array( $slide['authorImage'] ) ) {
                        $items[] = $slide['authorImage'];
                    }
                    if ( ! empty( $slide['ratingImage'] ) && is_array( $slide['ratingImage'] ) ) {
                        $items[] = $slide['ratingImage'];
                    }
                }
                if ( ! empty( $block['attrs']['quoteImageUrl'] ) && ! empty( $block['attrs']['quoteImageID'] ) ) {
                    $items[] = [
                        'id'  => $block['attrs']['quoteImageID'],
                        'url' => $block['attrs']['quoteImageUrl'],
                    ];
                }
            }

            // Map normalized URL path => attachment ID.
            $lookup = [];
            foreach ( $items as $item ) {
                if ( ! is_array( $item ) || empty( $item['id'] ) || ! is_numeric( $item['id'] ) || (int) $item['id'] <= 0 ) {
                    continue;
                }
                if ( empty( $item['url'] ) || ! is_string( $item['url'] ) ) {
                    continue;
                }
                $key = self::normalize_image_url( $item['url'] );
                if ( '' !== $key && ! isset( $lookup[ $key ] ) ) {
                    $lookup[ $key ] = (int) $item['id'];
                }
            }

            if ( empty( $lookup ) ) {
                return $block_content;
            }

            $processor = new \WP_HTML_Tag_Processor( $block_content );
            $in_slide  = false;
            $changed   = false;

            while ( $processor->next_tag() ) {
                if ( $processor->is_tag_closer() ) {
                    continue;
                }

                if ( 'IMG' !== $processor->get_tag() ) {
                    $classes = $processor->get_attribute( 'class' );
                    if ( is_string( $classes ) && false !== strpos( ' ' . preg_replace( '/\s+/', ' ', $classes ) . ' ', ' swiper-slide ' ) ) {
                        $in_slide = true;
                    }
                    continue;
                }

                if ( ! $in_slide ) {
                    continue;
                }

                $has_width  = null !== $processor->get_attribute( 'width' );
                $has_height = null !== $processor->get_attribute( 'height' );
                if ( $has_width && $has_height ) {
                    continue;
                }

                $src = $processor->get_attribute( 'src' );
                if ( ! is_string( $src ) || '' === $src ) {
                    continue;
                }

                $key = self::normalize_image_url( $src );
                if ( ! isset( $lookup[ $key ] ) ) {
                    continue;
                }

                $dimensions = self::get_image_dimensions_for_src( $src, $lookup[ $key ] );
                if ( null === $dimensions ) {
                    continue;
                }

                // Only add what is missing; never overwrite author values.
                if ( ! $has_width ) {
                    $processor->set_attribute( 'width', (string) $dimensions[0] );
                }
                if ( ! $has_height ) {
                    $processor->set_attribute( 'height', (string) $dimensions[1] );
                }
                $changed = true;
            }

            return $changed ? $processor->get_updated_html() : $block_content;
        }

        /**
         * Normalizes an image URL to "host/path" (no scheme, query or fragment) for matching.
         *
         * @since 1.2.0
         *
         * @param string $url Image URL.
         * @return string Normalized key, or '' when the URL has no path.
         */
        private static function normalize_image_url( string $url ): string {
            $url   = html_entity_decode( trim( $url ), ENT_QUOTES );
            $parts = wp_parse_url( $url );
            if ( ! is_array( $parts ) || empty( $parts['path'] ) ) {
                return '';
            }
            $host = isset( $parts['host'] ) ? strtolower( $parts['host'] ) : '';
            return $host . '/' . ltrim( $parts['path'], '/' );
        }

        /**
         * Returns [ width, height ] for the attachment size that the src points to.
         *
         * Uses wp_image_src_get_dimensions() (WP 5.5+) which matches the file name
         * against the full image and every intermediate size. Falls back to the
         * full-size metadata only when the src file name is the original file.
         *
         * @since 1.2.0
         *
         * @param string $src           Image src from the markup.
         * @param int    $attachment_id Attachment ID.
         * @return int[]|null Width and height, or null when unknown.
         */
        private static function get_image_dimensions_for_src( string $src, int $attachment_id ): ?array {
            if ( ! function_exists( 'wp_get_attachment_metadata' ) ) {
                return null;
            }
            $meta = wp_get_attachment_metadata( $attachment_id );
            if ( ! is_array( $meta ) ) {
                return null;
            }

            $path = wp_parse_url( $src, PHP_URL_PATH );
            if ( ! is_string( $path ) || '' === $path ) {
                return null;
            }
            $src_path = $path;

            if ( function_exists( 'wp_image_src_get_dimensions' ) ) {
                $dims = wp_image_src_get_dimensions( $src_path, $meta, $attachment_id );
                if ( is_array( $dims ) && ! empty( $dims[0] ) && ! empty( $dims[1] ) ) {
                    return [ (int) $dims[0], (int) $dims[1] ];
                }
                return null;
            }

            // Fallback: match file names ourselves.
            $file = basename( $src_path );
            if ( ! empty( $meta['file'] ) && is_string( $meta['file'] ) && basename( $meta['file'] ) === $file
                && ! empty( $meta['width'] ) && ! empty( $meta['height'] ) ) {
                return [ (int) $meta['width'], (int) $meta['height'] ];
            }
            if ( ! empty( $meta['sizes'] ) && is_array( $meta['sizes'] ) ) {
                foreach ( $meta['sizes'] as $size ) {
                    if ( is_array( $size ) && isset( $size['file'] ) && $size['file'] === $file
                        && ! empty( $size['width'] ) && ! empty( $size['height'] ) ) {
                        return [ (int) $size['width'], (int) $size['height'] ];
                    }
                }
            }
            return null;
        }

        /**
         * Backward-compatible alias for collect_dynamic_styles.
         *
         * @since 1.0.0
         *
         * @param string $block_content The block content being rendered.
         * @param array  $block         The full block data including attributes.
         * @return string The block content with safe scoped styles.
         */
        public function collect_dynamic_styles( $block_content, $block ) {
            return $this->collect_and_render_dynamic_styles( $block_content, $block );
        }

        /**
         * Strictly sanitizes CSS rules to prevent arbitrary CSS injection.
         *
         * Enforces:
         * 1. Removal of all HTML/XML tags.
         * 2. Removal of comments to avoid filter bypasses.
         * 3. Blocking of dangerous protocols (javascript, data, expression, behavior, -moz-binding, vbscript).
         * 4. Stripping of risky at-rules (@import, @charset, @namespace, etc.).
         * 5. Sanitization of url() values to only allow safe HTTP/HTTPS image URLs.
         * 6. Scoping: every selector MUST start at the block class (not merely mention the ID).
         *
         * @since 1.2.0
         *
         * @param string $css      The raw CSS string to sanitize.
         * @param string $block_id The unique block identifier to enforce scoping against.
         * @return string The sanitized and minified CSS string.
         */
        public function sanitize_css( $css, $block_id ): string {
            if ( empty( $css ) || ! is_string( $css ) ) {
                return '';
            }

            if ( ! is_string( $block_id ) || ! self::is_valid_block_id( $block_id ) ) {
                return '';
            }

            // Layer 1: Run comprehensive CssSanitizer to strip nested exploit patterns.
            $css = CssSanitizer::sanitize( $css );
            if ( empty( $css ) ) {
                return '';
            }

            // 1. Strip all HTML/XML tags.
            $css = wp_strip_all_tags( $css );

            // 2. Strip comments to prevent comment-based filter bypasses.
            $css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );

            // 3. Block and strip dangerous CSS functions, protocols, and keywords.
            $dangerous_patterns = [
                '/javascript\s*:/i',
                '/expression\s*\(/i',
                '/behavior\s*:/i',
                '/-moz-binding\s*:/i',
                '/vbscript\s*:/i',
                '/@import\b[^;]*;?/i',
                '/@charset\b[^;]*;?/i',
                '/@namespace\b[^;]*;?/i',
                '/<\/?(?:script|style|iframe|object|embed)[^>]*>/i',
                '/data\s*:\s*text\/html/i',
            ];
            $css = preg_replace( $dangerous_patterns, '', $css );

            // 4. Sanitize and validate url(...) values: only allow safe image URLs.
            $css = preg_replace_callback( '/url\s*\(\s*([\'"]?)(.*?)\1\s*\)/i', function( $matches ) {
                $url = trim( $matches[2] );
                // If it contains quotes, parentheses, semicolons, or dangerous protocols, reject it.
                if ( preg_match( '/[\'"\(\);\s]/', $url ) || preg_match( '/^(javascript|data|vbscript):/i', $url ) ) {
                    return 'none';
                }
                $clean_url = esc_url_raw( $url );
                return empty( $clean_url ) ? 'none' : "url('{$clean_url}')";
            }, $css );

            // 5. Enforce Block Scoping:
            // Extract media queries and normal rules, ensuring EVERY selector starts at $block_id.
            $media_output = '';

            // Handle media queries.
            $media_regex = '/@media[^{]+\{(?:[^{}]*\{[^{}]*\})+[^{}]*\}/i';
            if ( preg_match_all( $media_regex, $css, $media_matches, PREG_SET_ORDER ) ) {
                foreach ( $media_matches as $match ) {
                    $media_full   = $match[0];
                    $open_pos     = strpos( $media_full, '{' );
                    $media_header = trim( substr( $media_full, 0, $open_pos ) );
                    $media_inner  = trim( substr( $media_full, $open_pos + 1, -1 ) );

                    $sanitized_inner = $this->filter_rules_by_scope( $media_inner, $block_id );
                    if ( ! empty( $sanitized_inner ) ) {
                        $media_output .= $media_header . ' { ' . $sanitized_inner . " }\n";
                    }
                    $css = str_replace( $media_full, '', $css );
                }
            }

            $output = '';

            // Output standard rules before @media blocks to preserve Desktop -> Tablet -> Mobile cascade (#709).
            $sanitized_normal = $this->filter_rules_by_scope( $css, $block_id );
            if ( ! empty( $sanitized_normal ) ) {
                $output .= $sanitized_normal . "\n";
            }

            if ( ! empty( $media_output ) ) {
                $output .= $media_output;
            }

            return $this->minify_css( $output );
        }

        /**
         * Whether a sanitized block ID matches the editor generator format.
         *
         * IDs are `{prefix}-{clientId.slice(0, 8)}` with prefixes `gslider`,
         * `gslider-image-slider`, `gslider-logo-carousel`, `gslider-flexi-content`,
         * and `gslider-flexi-content-item`.
         *
         * @since 1.2.2
         *
         * @param string $block_id Sanitized block identifier.
         * @return bool True when the ID is a non-empty GSlider block class.
         */
        public static function is_valid_block_id( string $block_id ): bool {
            return 1 === preg_match( '/^g[a-z0-9-]{5,}$/', $block_id );
        }

        /**
         * Whether a CSS selector is anchored to the block wrapper and cannot escape it.
         *
         * @since 1.2.2
         *
         * @param string $sel      Trimmed CSS selector.
         * @param string $block_id Validated block identifier.
         * @return bool True when the selector starts at the block class with a boundary.
         */
        private static function is_scoped_selector( string $sel, string $block_id ): bool {
            $root = '.' . $block_id;

            // Must start with the block class and be followed by a non-identifier boundary.
            if ( 1 !== preg_match( '/^' . preg_quote( $root, '/' ) . '(?![a-z0-9_-])/i', $sel ) ) {
                return false;
            }

            // Relational / negation pseudo-classes and sibling combinators can style outside the block.
            if ( 1 === preg_match( '/:(has|not|is|where|host|root)\s*\(|[~+]|\\\\/i', $sel ) ) {
                return false;
            }

            return true;
        }

        /**
         * Filters CSS rules so that only selectors anchored to the block wrapper are retained.
         *
         * Drops selectors that merely mention the ID (e.g. inside :has() / :not()),
         * collide with a longer class name, or use sibling combinators after the root.
         *
         * @since 1.2.0
         *
         * @param string $css      CSS rules chunk.
         * @param string $block_id Block identifier to match against.
         * @return string Filtered CSS rules.
         */
        private function filter_rules_by_scope( $css, $block_id ): string {
            $rules       = explode( '}', $css );
            $valid_rules = [];

            foreach ( $rules as $rule ) {
                $rule = trim( $rule );
                if ( empty( $rule ) ) {
                    continue;
                }

                $parts = explode( '{', $rule );
                if ( count( $parts ) < 2 ) {
                    continue;
                }

                $selectors_str = trim( $parts[0] );
                $props_str     = trim( $parts[1] );

                if ( empty( $selectors_str ) || empty( $props_str ) ) {
                    continue;
                }

                $selectors       = explode( ',', $selectors_str );
                $valid_selectors = [];

                foreach ( $selectors as $sel ) {
                    $sel = trim( $sel );
                    if ( self::is_scoped_selector( $sel, $block_id ) ) {
                        $valid_selectors[] = $sel;
                    }
                }

                if ( ! empty( $valid_selectors ) ) {
                    $valid_rules[] = implode( ', ', $valid_selectors ) . ' { ' . $props_str . ' }';
                }
            }

            return implode( ' ', $valid_rules );
        }

        /**
         * Resets collected styles and optimization flags in memory (primarily for unit testing).
         *
         * @since 1.2.0
         *
         * @return void
         */
        public static function reset_styles(): void {
            self::$styles        = [];
            self::$printed       = [];
            self::$lcp_optimized = false;
        }

        /**
         * Gets collected styles array (primarily for unit testing).
         *
         * @since 1.2.0
         *
         * @return string[]
         */
        public static function get_collected_styles(): array {
            return self::$styles;
        }

        /**
         * Retrieves the Content Security Policy (CSP) nonce if configured (#314, #391).
         *
         * Checks the 'gslider_style_nonce', 'gslider_csp_nonce', and third-party 'wp_csp_nonce' filters.
         *
         * Compatibility Note:
         * 'wp_csp_nonce' is widely used by popular security plugins, but is NOT a standard WordPress core filter.
         *
         * CSP Level 3 Consideration:
         * Injecting nonces onto dynamic <style> tags allows sites to comply
         * with strict 'style-src' policies without 'unsafe-inline'. However, any block using inline HTML
         * style="" attributes (such as the star rating width percentage in Testimonial blocks) still requires
         * 'style-src-attr' (e.g. 'unsafe-inline' or attribute hash) unless rewritten.
         *
         * @since 1.2.0
         *
         * @return string The sanitized CSP nonce string, or empty string if not set.
         */
        public function get_csp_nonce(): string {
            $nonce = apply_filters( 'gslider_style_nonce', '' );
            if ( empty( $nonce ) ) {
                $nonce = apply_filters( 'gslider_csp_nonce', '' );
            }
            if ( empty( $nonce ) ) {
                // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Third-party security plugin compatibility filter.
                $nonce = apply_filters( 'wp_csp_nonce', '' );
            }
            return is_string( $nonce ) ? sanitize_text_field( $nonce ) : '';
        }

        /**
         * Prints any collected dynamic styles in wp_footer as fallback.
         *
         * If styles remain collected and CSP nonce is present, injects nonce attribute.
         *
         * @since 1.0.0
         *
         * @return void
         */
        public function print_footer_styles(): void {
            if ( empty( self::$styles ) ) {
                return;
            }

            // Only output dynamic styles that have not already been rendered inline.
            $unprinted_styles = array_diff_key( self::$styles, self::$printed );
            if ( ! empty( $unprinted_styles ) ) {
                $combined_css = implode( "\n", $unprinted_styles );
                $clean_css    = wp_strip_all_tags( $combined_css );
                if ( ! empty( $clean_css ) ) {
                    $nonce = $this->get_csp_nonce();
                    if ( ! empty( $nonce ) ) {
                        printf(
                            "<style id=\"gslider-blocks-footer-styles\" nonce=\"%s\">\n%s\n</style>\n",
                            esc_attr( $nonce ),
                            // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Dynamic CSS is sanitized via CssSanitizer and strip_all_tags; escaping would break CSS selectors and rules.
                            $clean_css
                        );
                    } else {
                        printf(
                            "<style id=\"gslider-blocks-footer-styles\">\n%s\n</style>\n",
                            // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Dynamic CSS is sanitized via CssSanitizer and strip_all_tags; escaping would break CSS selectors and rules.
                            $clean_css
                        );
                    }
                }
            }

            self::$styles = [];
        }

        /**
         * Minifies a CSS string.
         *
         * Removes comments, unnecessary whitespace, and trailing
         * semicolons before closing braces.
         *
         * @since 1.0.0
         *
         * @param string $css The raw CSS string to minify.
         * @return string The minified CSS string.
         */
        private function minify_css( $css ): string {
            if ( empty( $css ) ) {
                return '';
            }

            $css = wp_strip_all_tags( $css );
            $css = preg_replace( '!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css );
            $css = preg_replace( '/\s*([:,;{}])\s*/', '$1', $css );
            $css = preg_replace( '/;}/', '}', $css );

            return trim( $css );
        }
    }
}
