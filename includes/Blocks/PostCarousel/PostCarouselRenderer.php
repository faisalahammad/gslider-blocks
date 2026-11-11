<?php
/**
 * Post Carousel Block Server-Side Renderer.
 *
 * Parses and validates block attributes, executes WP_Query safely with
 * sticky-post cap enforcement, compiles Swiper data attributes, and delegates
 * card and navigation rendering to dedicated builders.
 *
 * @package GSlider\Blocks\PostCarousel
 * @since   1.2.3
 */

namespace GSlider\Blocks\PostCarousel;

use GSlider\Classes\SupportSVG;
use GSlider\Utils\Helper;
use WP_Query;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( PostCarouselRenderer::class, false ) ) {

    /**
     * Coordinates server-side rendering for the `gslider-blocks/post-carousel` block.
     *
     * @since 1.2.3
     */
    class PostCarouselRenderer {

        /**
         * Allowlisted HTML wrapper tags for title and excerpt elements.
         *
         * @since 1.2.3
         *
         * @var string[]
         */
        private const ALLOWED_HTML_TAGS = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span' );

        /**
         * Allowlisted card layout modes.
         *
         * @since 1.2.3
         *
         * @var string[]
         */
        private const ALLOWED_LAYOUT_MODES = array( 'classic', 'overlay', 'horizontal', 'hero', 'minimal', 'newsroom', 'timeline' );

        /**
         * Allowlisted newsroom headline queue positions.
         *
         * @since 1.2.3
         *
         * @var string[]
         */
        private const ALLOWED_QUEUE_POSITIONS = array( 'right', 'left' );

        /**
         * Allowlisted hero content alignments.
         *
         * @since 1.2.3
         *
         * @var string[]
         */
        private const ALLOWED_HERO_ALIGNMENTS = array( 'bottom-left', 'center', 'bottom-center' );

        /**
         * Allowlisted horizontal media column positions.
         *
         * @since 1.2.3
         *
         * @var string[]
         */
        private const ALLOWED_MEDIA_POSITIONS = array( 'left', 'right' );

        /**
         * Allowlisted WP_Query orderby keys.
         *
         * @since 1.2.3
         *
         * @var string[]
         */
        private const ALLOWED_ORDERBY = array(
            'date',
            'title',
            'name',
            'id',
            'ID',
            'author',
            'modified',
            'relevance',
            'rand',
            'comment_count',
            'menu_order',
            'meta_value',
            'meta_value_num',
        );

        /**
         * Allowlisted SQL meta comparison operators.
         *
         * @since 1.2.3
         *
         * @var string[]
         */
        private const ALLOWED_META_COMPARE = array( '=', '!=', '>', '>=', '<', '<=', 'LIKE', 'NOT LIKE', 'EXISTS', 'NOT EXISTS' );

        /**
         * Default ordered list of card content elements.
         *
         * @since 1.2.3
         *
         * @var string[]
         */
        private const DEFAULT_CONTENT_ORDER = array( 'thumbnail', 'categories', 'title', 'excerpt', 'meta', 'readmore' );

        /**
         * Renders the Post Carousel block HTML for the given block attributes.
         *
         * @since 1.2.3
         *
         * @param array  $attributes Block attributes.
         * @param string $content    Block default content.
         * @param mixed  $block      WP_Block instance or null.
         * @return string Rendered HTML markup, or empty string when no posts match.
         */
        public static function render( array $attributes, string $content = '', $block = null ): string {
            unset( $content, $block );

            $context       = self::build_render_context( $attributes );
            $query_options = self::parse_query_options( $attributes );
            $query_args    = self::build_query_args( $query_options );

            $posts_query = new WP_Query( $query_args );

            // Enforce the 1-30 cap even when WP_Query prepends sticky posts beyond posts_per_page.
            $posts_per_page = $query_options['posts_per_page'];
            if ( is_array( $posts_query->posts ) && count( $posts_query->posts ) > $posts_per_page ) {
                $posts_query->posts      = array_slice( $posts_query->posts, 0, $posts_per_page );
                $posts_query->post_count = count( $posts_query->posts );
            }

            if ( ! $posts_query->have_posts() ) {
                wp_reset_postdata();
                return '';
            }

            $swiper_settings    = self::build_swiper_settings( $attributes, $context );
            $wrapper_attributes = self::build_wrapper_attributes( $context, $swiper_settings );

            $slides_html       = '';
            $rendered_post_ids = array();
            while ( $posts_query->have_posts() ) {
                $posts_query->the_post();
                $post_id             = (int) get_the_ID();
                $rendered_post_ids[] = $post_id;
                $slides_html        .= CardMarkupBuilder::render_card( $post_id, $context );
            }

            wp_reset_postdata();

            $is_marquee         = 'marquee' === ( $context['carousel_mode'] ?? 'carousel' );
            $nav_inside         = ! $is_marquee ? NavigationBuilder::render_navigation( 'inside', $context['navigation'] ) : '';
            $pagination_inside  = ! $is_marquee ? NavigationBuilder::render_pagination( 'inside', $context['block_id'], $context['any_pagination_enabled'], $context['pagination_position_type'] ) : '';
            $nav_outside        = ! $is_marquee ? NavigationBuilder::render_navigation( 'outside', $context['navigation'] ) : '';
            $pagination_outside = ! $is_marquee ? NavigationBuilder::render_pagination( 'outside', $context['block_id'], $context['any_pagination_enabled'], $context['pagination_position_type'] ) : '';

            $is_newsroom_layout = 'newsroom' === $context['post_layout_mode'];
            $main_swiper_class  = $is_newsroom_layout ? 'gslider-newsroom-main swiper' : 'swiper';
            $main_aria_label    = $is_newsroom_layout
                ? __( 'Featured Story', 'gslider-blocks' )
                : __( 'Post Carousel', 'gslider-blocks' );

            $schema_markup = '';
            if ( ! empty( $context['enable_schema_markup'] ) && self::is_frontend_request() ) {
                $rendered_posts = is_array( $posts_query->posts ) ? $posts_query->posts : array();
                $schema_markup  = SchemaBuilder::build( $rendered_posts, $attributes, $posts_query );
            }

            ob_start();
            ?>
<div <?php echo $wrapper_attributes; ?>>
    <div class="<?php echo esc_attr( $main_swiper_class ); ?>" role="region" aria-label="<?php echo esc_attr( $main_aria_label ); ?>">
        <?php if ( ! $is_marquee && ! empty( $context['show_autoplay_progress'] ) && 'top' === $context['autoplay_progress_position'] ) : ?>
            <div class="gslider-autoplay-progress position-top" aria-hidden="true"><span class="gslider-autoplay-progress-fill"></span></div>
        <?php endif; ?>
        <div class="swiper-wrapper">
            <?php echo $slides_html; ?>
        </div>
        <?php if ( ! $is_marquee && ! empty( $context['show_autoplay_progress'] ) && 'bottom' === $context['autoplay_progress_position'] ) : ?>
            <div class="gslider-autoplay-progress position-bottom" aria-hidden="true"><span class="gslider-autoplay-progress-fill"></span></div>
        <?php endif; ?>
        <?php if ( '' !== $nav_inside ) : ?>
            <?php echo $nav_inside; ?>
        <?php endif; ?>
        <?php if ( '' !== $pagination_inside ) : ?>
            <?php echo $pagination_inside; ?>
        <?php endif; ?>
    </div>
    <?php if ( $is_newsroom_layout ) : ?>
        <?php echo NewsroomBuilder::render_queue( $rendered_post_ids, $context ); ?>
    <?php endif; ?>
    <?php if ( '' !== $nav_outside ) : ?>
        <?php echo $nav_outside; ?>
    <?php endif; ?>
    <?php if ( '' !== $pagination_outside ) : ?>
        <?php echo $pagination_outside; ?>
    <?php endif; ?>
</div>
<?php if ( '' !== $schema_markup ) : ?>
    <?php echo $schema_markup; ?>
<?php endif; ?>
            <?php

            return (string) ob_get_clean();
        }

        /**
         * Determines whether the current execution context is a public frontend page render.
         *
         * Excludes admin screens, Gutenberg REST block previews, and syndication feeds.
         *
         * @since 1.2.3
         *
         * @return bool True on frontend page requests.
         */
        private static function is_frontend_request(): bool {
            if ( is_admin() ) {
                return false;
            }

            if ( function_exists( 'wp_is_serving_rest_request' ) && wp_is_serving_rest_request() ) {
                return false;
            }

            if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
                return false;
            }

            if ( function_exists( 'is_feed' ) && is_feed() ) {
                return false;
            }

            return true;
        }

        /**
         * Extracts responsive integer values across Desktop, Tablet, and Mobile breakpoints.
         *
         * @since 1.2.3
         *
         * @param mixed $attr     Scalar value or breakpoint array.
         * @param array $defaults Default integer map keyed by breakpoint.
         * @return array<string, int> Responsive integer map.
         */
        private static function get_responsive_int( $attr, array $defaults ): array {
            if ( ! isset( $attr ) ) {
                return $defaults;
            }
            if ( is_array( $attr ) ) {
                return array(
                    'Desktop' => intval( $attr['Desktop'] ?? $defaults['Desktop'] ),
                    'Tablet'  => intval( $attr['Tablet'] ?? $defaults['Tablet'] ),
                    'Mobile'  => intval( $attr['Mobile'] ?? $defaults['Mobile'] ),
                );
            }
            $val = intval( $attr );
            return array(
                'Desktop' => $val,
                'Tablet'  => $val,
                'Mobile'  => $val,
            );
        }

        /**
         * Extracts responsive float values across Desktop, Tablet, and Mobile breakpoints.
         *
         * @since 1.2.3
         *
         * @param mixed $attr     Scalar value or breakpoint array.
         * @param array $defaults Default float map keyed by breakpoint.
         * @return array<string, float> Responsive float map.
         */
        private static function get_responsive_float( $attr, array $defaults ): array {
            if ( ! isset( $attr ) ) {
                return $defaults;
            }
            if ( is_array( $attr ) ) {
                return array(
                    'Desktop' => floatval( $attr['Desktop'] ?? $defaults['Desktop'] ),
                    'Tablet'  => floatval( $attr['Tablet'] ?? $defaults['Tablet'] ),
                    'Mobile'  => floatval( $attr['Mobile'] ?? $defaults['Mobile'] ),
                );
            }
            $val = floatval( $attr );
            return array(
                'Desktop' => $val,
                'Tablet'  => $val,
                'Mobile'  => $val,
            );
        }

        /**
         * Checks whether a responsive toggle array is truthy on at least one breakpoint.
         *
         * @since 1.2.3
         *
         * @param mixed $toggle Breakpoint toggle map or missing value.
         * @return bool True if enabled on Desktop, Tablet, or Mobile.
         */
        private static function is_any_breakpoint_enabled( $toggle ): bool {
            if ( ! is_array( $toggle ) ) {
                return false;
            }

            return ! empty( $toggle['Desktop'] ) || ! empty( $toggle['Tablet'] ) || ! empty( $toggle['Mobile'] );
        }

        /**
         * Sanitizes a whitespace-delimited list of CSS class names.
         *
         * @since 1.2.3
         *
         * @param mixed $raw_classes Raw `globalClass` attribute value.
         * @return string Space-delimited sanitized class names.
         */
        private static function sanitize_global_classes( $raw_classes ): string {
            if ( ! is_string( $raw_classes ) ) {
                return '';
            }

            $parts = preg_split( '/\s+/', trim( $raw_classes ) );
            if ( ! is_array( $parts ) ) {
                return '';
            }

            return implode( ' ', array_filter( array_map( 'sanitize_html_class', $parts ) ) );
        }

        /**
         * Sanitizes a CSS color value ensuring valid hex/rgba or safe fallback.
         *
         * @since 1.2.3
         *
         * @param mixed  $color    Raw attribute color value.
         * @param string $fallback Fallback color when invalid.
         * @return string Valid color string or fallback.
         */
        private static function sanitize_color_value( $color, string $fallback ): string {
            if ( ! is_string( $color ) || '' === trim( $color ) ) {
                return $fallback;
            }
            $trimmed = trim( $color );
            if ( preg_match( '/^#([A-Fa-f0-9]{3}){1,2}$/', $trimmed ) ) {
                return $trimmed;
            }
            if ( preg_match( '/^rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*(?:,\s*[\d.]+\s*)?\)$/i', $trimmed ) ) {
                return $trimmed;
            }
            if ( preg_match( '/^hsla?\(\s*[\d.]+\s*(?:deg|rad|turn)?\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(?:,\s*[\d.]+%?\s*)?\)$/i', $trimmed ) ) {
                return $trimmed;
            }
            if ( preg_match( '/^var\(--[a-zA-Z0-9_-]+\)$/', $trimmed ) ) {
                return $trimmed;
            }
            return $fallback;
        }

        /**
         * Validates dynamic HTML wrapper tags against the safe structural allowlist.
         *
         * @since 1.2.3
         *
         * @param mixed  $raw_tag  Raw attribute tag string.
         * @param string $fallback Fallback tag when invalid.
         * @return string Safe lowercase HTML tag name.
         */
        private static function validate_html_tag( $raw_tag, string $fallback ): string {
            if ( ! is_string( $raw_tag ) ) {
                return $fallback;
            }

            $sanitized = strtolower( sanitize_key( $raw_tag ) );
            return in_array( $sanitized, self::ALLOWED_HTML_TAGS, true ) ? $sanitized : $fallback;
        }

        /**
         * Resolves a post type slug against registered viewable post types.
         *
         * @since 1.2.3
         *
         * @param string $candidate Raw or retrieved post type slug.
         * @param string $fallback  Fallback post type slug.
         * @return string Validated viewable post type slug.
         */
        private static function resolve_post_type( string $candidate, string $fallback = 'post' ): string {
            $sanitized = sanitize_key( $candidate );
            if ( '' === $sanitized || ! post_type_exists( $sanitized ) || ! is_post_type_viewable( $sanitized ) ) {
                return $fallback;
            }

            return $sanitized;
        }

        /**
         * Normalizes and completes the ordered array of card element keys.
         *
         * @since 1.2.3
         *
         * @param mixed $raw_order Raw `contentOrder` attribute.
         * @return string[] Normalized complete list of card element slugs.
         */
        private static function normalize_content_order( $raw_order ): array {
            $order = is_array( $raw_order ) ? $raw_order : self::DEFAULT_CONTENT_ORDER;
            $order = array_values( array_unique( array_intersect( $order, self::DEFAULT_CONTENT_ORDER ) ) );

            foreach ( self::DEFAULT_CONTENT_ORDER as $key ) {
                if ( ! in_array( $key, $order, true ) ) {
                    $order[] = $key;
                }
            }

            return $order;
        }

        /**
         * Parses and sanitizes query-related attributes with bounded defaults.
         *
         * @since 1.2.3
         *
         * @param array $attributes Raw block attributes.
         * @return array<string, mixed> Sanitized query options map.
         */
        public static function parse_query_options( array $attributes ): array {
            $default_bool_map = array(
                'Desktop' => true,
                'Tablet'  => true,
                'Mobile'  => true,
            );
            unset( $default_bool_map );

            $post_type = self::resolve_post_type(
                isset( $attributes['postType'] ) ? sanitize_text_field( (string) $attributes['postType'] ) : 'post',
                'post'
            );

            $posts_per_page = 6;
            if ( isset( $attributes['postsPerPage'] ) ) {
                if ( is_array( $attributes['postsPerPage'] ) ) {
                    $posts_per_page = isset( $attributes['postsPerPage']['Desktop'] ) ? intval( $attributes['postsPerPage']['Desktop'] ) : 6;
                } else {
                    $posts_per_page = intval( $attributes['postsPerPage'] );
                }
            }
            // Cap the count so a value like -1 cannot load every post.
            $posts_per_page = max( 1, min( 30, $posts_per_page ) );

            $offset = 0;
            if ( isset( $attributes['offset'] ) ) {
                if ( is_array( $attributes['offset'] ) ) {
                    $offset = isset( $attributes['offset']['Desktop'] ) ? intval( $attributes['offset']['Desktop'] ) : 0;
                } else {
                    $offset = intval( $attributes['offset'] );
                }
            }
            $offset = max( 0, min( 100, $offset ) );

            $use_related_posts_query = ! empty( $attributes['useRelatedPostsQuery'] );
            $meta_key                = isset( $attributes['metaKey'] ) ? sanitize_text_field( (string) $attributes['metaKey'] ) : '';
            $meta_value              = isset( $attributes['metaValue'] ) ? sanitize_text_field( (string) $attributes['metaValue'] ) : '';
            $meta_compare            = strtoupper( isset( $attributes['metaCompare'] ) ? sanitize_text_field( (string) $attributes['metaCompare'] ) : '=' );
            if ( ! in_array( $meta_compare, self::ALLOWED_META_COMPARE, true ) ) {
                $meta_compare = '=';
            }

            $orderby = isset( $attributes['orderBy'] ) ? sanitize_text_field( (string) $attributes['orderBy'] ) : 'date';
            if ( ! in_array( $orderby, self::ALLOWED_ORDERBY, true ) ) {
                $orderby = 'date';
            }
            if ( 'id' === $orderby ) {
                $orderby = 'ID';
            }
            if ( in_array( $orderby, array( 'meta_value', 'meta_value_num' ), true ) && ( '' === $meta_key || $use_related_posts_query ) ) {
                $orderby = 'date';
            }

            $order = strtoupper( isset( $attributes['order'] ) ? sanitize_text_field( (string) $attributes['order'] ) : 'desc' );
            if ( ! in_array( $order, array( 'ASC', 'DESC' ), true ) ) {
                $order = 'DESC';
            }

            return array(
                'post_type'               => $post_type,
                'posts_per_page'          => $posts_per_page,
                'categories'              => isset( $attributes['categories'] ) ? array_map( 'intval', (array) $attributes['categories'] ) : array(),
                'category_filter_type'    => isset( $attributes['categoryFilterType'] ) ? sanitize_text_field( (string) $attributes['categoryFilterType'] ) : 'include',
                'tags'                    => isset( $attributes['tags'] ) ? array_map( 'intval', (array) $attributes['tags'] ) : array(),
                'tag_filter_type'         => isset( $attributes['tagFilterType'] ) ? sanitize_text_field( (string) $attributes['tagFilterType'] ) : 'include',
                'authors'                 => isset( $attributes['authors'] ) ? array_map( 'intval', (array) $attributes['authors'] ) : array(),
                'author_filter_type'      => isset( $attributes['authorFilterType'] ) ? sanitize_text_field( (string) $attributes['authorFilterType'] ) : 'include',
                'exclude_posts'           => isset( $attributes['excludePosts'] ) ? sanitize_text_field( (string) $attributes['excludePosts'] ) : '',
                'offset'                  => $offset,
                'orderby'                 => $orderby,
                'order'                   => $order,
                'search_query'            => isset( $attributes['searchQuery'] ) ? sanitize_text_field( (string) $attributes['searchQuery'] ) : '',
                'sticky_posts'            => isset( $attributes['stickyPosts'] ) ? sanitize_text_field( (string) $attributes['stickyPosts'] ) : 'include',
                'taxonomy_query'          => isset( $attributes['taxonomyQuery'] ) && is_array( $attributes['taxonomyQuery'] ) ? $attributes['taxonomyQuery'] : array(),
                'taxonomy_filter_types'   => isset( $attributes['taxonomyFilterTypes'] ) && is_array( $attributes['taxonomyFilterTypes'] ) ? $attributes['taxonomyFilterTypes'] : array(),
                'meta_key'                => $meta_key,
                'meta_value'              => $meta_value,
                'meta_compare'            => $meta_compare,
                'date_range'              => isset( $attributes['dateRange'] ) ? sanitize_text_field( (string) $attributes['dateRange'] ) : 'any',
                'exclude_current_post'    => ! empty( $attributes['excludeCurrentPost'] ),
                'use_related_posts_query' => $use_related_posts_query,
                'related_posts_taxonomy'  => isset( $attributes['relatedPostsTaxonomy'] ) ? sanitize_text_field( (string) $attributes['relatedPostsTaxonomy'] ) : 'category',
            );
        }

        /**
         * Builds the WP_Query arguments array for standard or related-post mode.
         *
         * @since 1.2.3
         *
         * @param array $options      Normalized query options from `parse_query_options()`.
         * @param int   $host_post_id Optional host post ID for REST/headless contexts without global `$post`.
         * @return array<string, mixed> Arguments ready for `WP_Query`.
         */
        public static function build_query_args( array $options, int $host_post_id = 0 ): array {
            if ( ! empty( $options['use_related_posts_query'] ) ) {
                return self::build_related_query_args( $options, $host_post_id );
            }

            return self::build_standard_query_args( $options, $host_post_id );
        }

        /**
         * Builds WP_Query arguments when "Related Posts Query" mode is enabled.
         *
         * @since 1.2.3
         *
         * @param array $options      Normalized query options.
         * @param int   $host_post_id Optional host post ID fallback when `get_the_ID()` is empty.
         * @return array<string, mixed> WP_Query arguments for related posts.
         */
        private static function build_related_query_args( array $options, int $host_post_id = 0 ): array {
            $current_post_id    = $host_post_id > 0 ? $host_post_id : (int) get_the_ID();
            $fallback_post_type = (string) $options['post_type'];
            $raw_post_type      = $current_post_id ? get_post_type( $current_post_id ) : $fallback_post_type;
            $resolved_post_type = is_string( $raw_post_type )
                ? self::resolve_post_type( $raw_post_type, $fallback_post_type )
                : $fallback_post_type;

            $query_args = array(
                'post_type'      => $resolved_post_type,
                'posts_per_page' => $options['posts_per_page'],
                'post_status'    => 'publish',
                'orderby'        => $options['orderby'],
                'order'          => $options['order'],
                'no_found_rows'  => true,
            );

            $related_tax = (string) $options['related_posts_taxonomy'];
            $tax_query   = array();

            if ( $current_post_id ) {
                if ( 'category' === $related_tax || 'both' === $related_tax ) {
                    $current_cats = wp_get_post_categories( $current_post_id );
                    if ( ! empty( $current_cats ) ) {
                        $tax_query[] = array(
                            'taxonomy' => 'category',
                            'field'    => 'term_id',
                            'terms'    => $current_cats,
                            'operator' => 'IN',
                        );
                    }
                }

                if ( 'post_tag' === $related_tax || 'both' === $related_tax ) {
                    $current_tags = wp_get_post_terms( $current_post_id, 'post_tag', array( 'fields' => 'ids' ) );
                    if ( ! empty( $current_tags ) && ! is_wp_error( $current_tags ) ) {
                        $tax_query[] = array(
                            'taxonomy' => 'post_tag',
                            'field'    => 'term_id',
                            'terms'    => $current_tags,
                            'operator' => 'IN',
                        );
                    }
                }

                if ( ! empty( $tax_query ) ) {
                    if ( count( $tax_query ) > 1 ) {
                        $tax_query['relation'] = 'OR';
                    }
                    $query_args['tax_query'] = $tax_query;
                } else {
                    // Force return empty query if no tax matches exist (avoid showing all posts).
                    $query_args['post__in'] = array( 0 );
                }
            }

            $excluded_ids = array();
            if ( $current_post_id ) {
                $excluded_ids[] = $current_post_id;
            }
            if ( '' !== $options['exclude_posts'] ) {
                $additional_excludes = array_map( 'intval', explode( ',', (string) $options['exclude_posts'] ) );
                $excluded_ids        = array_merge( $excluded_ids, $additional_excludes );
            }
            $query_args['post__not_in'] = array_unique( $excluded_ids );

            if ( $options['offset'] > 0 ) {
                $query_args['offset'] = $options['offset'];
            }

            return $query_args;
        }

        /**
         * Builds WP_Query arguments for standard post queries.
         *
         * @since 1.2.3
         *
         * @param array $options      Normalized query options.
         * @param int   $host_post_id Optional host post ID fallback when `get_the_ID()` is empty.
         * @return array<string, mixed> WP_Query arguments for standard queries.
         */
        private static function build_standard_query_args( array $options, int $host_post_id = 0 ): array {
            $query_args = array(
                'post_type'      => $options['post_type'],
                'posts_per_page' => $options['posts_per_page'],
                'post_status'    => 'publish',
                'orderby'        => $options['orderby'],
                'order'          => $options['order'],
                'no_found_rows'  => true,
            );

            $tax_query = Helper::build_tax_query(
                $options['categories'],
                $options['category_filter_type'],
                $options['tags'],
                $options['tag_filter_type'],
                $options['taxonomy_query'],
                $options['taxonomy_filter_types']
            );
            if ( ! empty( $tax_query ) ) {
                $query_args['tax_query'] = $tax_query;
            }

            $author_query = Helper::build_author_query( $options['authors'], $options['author_filter_type'] );
            if ( ! empty( $author_query ) ) {
                $query_args = array_merge( $query_args, $author_query );
            }

            if ( $options['offset'] > 0 ) {
                $query_args['offset'] = $options['offset'];
            }

            $excluded_ids = Helper::build_excluded_posts( $options['exclude_posts'], $options['exclude_current_post'] );
            if ( ! empty( $options['exclude_current_post'] ) && $host_post_id > 0 ) {
                $excluded_ids[] = $host_post_id;
                $excluded_ids   = array_values( array_unique( array_map( 'intval', $excluded_ids ) ) );
            }
            if ( ! empty( $excluded_ids ) ) {
                $query_args['post__not_in'] = $excluded_ids;
            }

            if ( '' !== $options['search_query'] ) {
                $query_args['s'] = $options['search_query'];
            }

            $date_query = Helper::build_date_query( $options['date_range'] );
            if ( ! empty( $date_query ) ) {
                $query_args['date_query'] = $date_query;
            }

            $meta_query = Helper::build_meta_query( $options['meta_key'], $options['meta_value'], $options['meta_compare'] );
            if ( ! empty( $meta_query ) ) {
                $query_args['meta_query'] = $meta_query;
                if ( in_array( $options['orderby'], array( 'meta_value', 'meta_value_num' ), true ) ) {
                    $query_args['meta_key'] = $options['meta_key'];
                }
            }

            if ( 'exclude' === $options['sticky_posts'] ) {
                $sticky_ids = get_option( 'sticky_posts' );
                if ( ! empty( $sticky_ids ) && is_array( $sticky_ids ) ) {
                    $query_args['post__not_in'] = isset( $query_args['post__not_in'] )
                        ? array_merge( $query_args['post__not_in'], $sticky_ids )
                        : $sticky_ids;
                }
            } elseif ( 'only' === $options['sticky_posts'] ) {
                $sticky_ids             = get_option( 'sticky_posts' );
                $query_args['post__in'] = ( ! empty( $sticky_ids ) && is_array( $sticky_ids ) ) ? $sticky_ids : array( 0 );
            }

            return $query_args;
        }

        /**
         * Compiles responsive Swiper configuration payload from block attributes and render context.
         *
         * @since 1.2.3
         *
         * @param array $attributes Raw block attributes.
         * @param array $context    Compiled block rendering context.
         * @return array<string, mixed> Swiper configuration array.
         */
        private static function build_swiper_settings( array $attributes, array $context ): array {
            $carousel_mode = $context['carousel_mode'] ?? 'carousel';
            if ( 'marquee' === $carousel_mode ) {
                $marquee_speed           = isset( $context['marquee_speed'] ) ? (int) $context['marquee_speed'] : 6000;
                $marquee_pause           = ! empty( $context['marquee_pause_on_hover'] );
                $carousel_per_column     = isset( $attributes['carouselPerColumn'] ) && is_array( $attributes['carouselPerColumn'] )
                    ? $attributes['carouselPerColumn']
                    : array( 'Desktop' => 3, 'Tablet' => 2, 'Mobile' => 1 );
                $carousel_per_column_gap = isset( $attributes['carouselPerColumnGap'] ) && is_array( $attributes['carouselPerColumnGap'] )
                    ? $attributes['carouselPerColumnGap']
                    : array( 'Desktop' => 20, 'Tablet' => 20, 'Mobile' => 10 );

                return array(
                    'effect'         => 'slide',
                    'freeMode'       => array(
                        'enabled'  => true,
                        'momentum' => false,
                    ),
                    'loop'           => true,
                    'allowTouchMove' => false,
                    'speed'          => $marquee_speed,
                    'autoplay'       => array(
                        'delay'                => 0,
                        'disableOnInteraction' => false,
                        'pauseOnMouseEnter'    => $marquee_pause,
                    ),
                    'breakpoints'    => array(
                        0    => array(
                            'slidesPerView' => isset( $carousel_per_column['Mobile'] ) ? (int) $carousel_per_column['Mobile'] : 1,
                            'spaceBetween'  => isset( $carousel_per_column_gap['Mobile'] ) ? (int) $carousel_per_column_gap['Mobile'] : 0,
                            'speed'         => $marquee_speed,
                            'autoplay'      => array( 'delay' => 0 ),
                            'navigation'    => array( 'enabled' => false ),
                            'pagination'    => array( 'enabled' => false ),
                        ),
                        768  => array(
                            'slidesPerView' => isset( $carousel_per_column['Tablet'] ) ? (int) $carousel_per_column['Tablet'] : 2,
                            'spaceBetween'  => isset( $carousel_per_column_gap['Tablet'] ) ? (int) $carousel_per_column_gap['Tablet'] : 20,
                            'speed'         => $marquee_speed,
                            'autoplay'      => array( 'delay' => 0 ),
                            'navigation'    => array( 'enabled' => false ),
                            'pagination'    => array( 'enabled' => false ),
                        ),
                        1025 => array(
                            'slidesPerView' => isset( $carousel_per_column['Desktop'] ) ? (int) $carousel_per_column['Desktop'] : 3,
                            'spaceBetween'  => isset( $carousel_per_column_gap['Desktop'] ) ? (int) $carousel_per_column_gap['Desktop'] : 20,
                            'speed'         => $marquee_speed,
                            'autoplay'      => array( 'delay' => 0 ),
                            'navigation'    => array( 'enabled' => false ),
                            'pagination'    => array( 'enabled' => false ),
                        ),
                    ),
                    'navigation'     => array( 'enabled' => false ),
                    'pagination'     => array( 'enabled' => false ),
                );
            }

            $carousel_per_column     = isset( $attributes['carouselPerColumn'] ) && is_array( $attributes['carouselPerColumn'] )
                ? $attributes['carouselPerColumn']
                : array( 'Desktop' => 3, 'Tablet' => 2, 'Mobile' => 1 );
            $carousel_per_column_gap = isset( $attributes['carouselPerColumnGap'] ) && is_array( $attributes['carouselPerColumnGap'] )
                ? $attributes['carouselPerColumnGap']
                : array( 'Desktop' => 10, 'Tablet' => 10, 'Mobile' => 10 );
            $speed                   = isset( $attributes['speed'] ) && is_array( $attributes['speed'] )
                ? $attributes['speed']
                : array( 'Desktop' => 800, 'Tablet' => 800, 'Mobile' => 800 );
            $autoplay                = ! empty( $attributes['autoplay'] );
            $autoplay_delay          = isset( $attributes['autoplayDelay'] ) && is_array( $attributes['autoplayDelay'] )
                ? $attributes['autoplayDelay']
                : array( 'Desktop' => 1000, 'Tablet' => 1000, 'Mobile' => 1000 );
            $infinite_loop           = isset( $attributes['infiniteLoop'] ) ? (bool) $attributes['infiniteLoop'] : true;
            $allow_touch_move        = isset( $attributes['allowTouchMove'] ) ? (bool) $attributes['allowTouchMove'] : true;
            $pause_on_hover          = ! empty( $attributes['pauseOnHover'] );
            $stop_on_last_slide      = ! empty( $attributes['stopOnLastSlide'] );
            $reverse_direction       = ! empty( $attributes['reverseDirection'] );
            $carousel_effect         = isset( $attributes['carouselEffect'] ) ? sanitize_text_field( (string) $attributes['carouselEffect'] ) : 'slide';
            $mousewheel_control      = ! empty( $attributes['mousewheelControl'] );
            $keyboard_navigation     = ! empty( $attributes['keyboardNavigation'] );
            $pagination_type         = isset( $attributes['paginationType'] ) ? sanitize_text_field( (string) $attributes['paginationType'] ) : 'bullets';
            $dynamic_bullets         = ! empty( $attributes['dynamicBullets'] );

            $nav_enabled_data        = $context['navigation_enabled_data'];
            $pagination_enabled_data = $context['pagination_enabled_data'];
            $block_id                = $context['block_id'];
            $is_spotlight            = ! empty( $context['enable_spotlight'] );

            $swiper_config = array(
                'effect'         => $carousel_effect,
                'breakpoints'    => array(
                    0    => array(
                        'slidesPerView' => isset( $carousel_per_column['Mobile'] )
                            ? ( $is_spotlight ? round( max( 1.0, (float) $carousel_per_column['Mobile'] ), 2 ) : (int) $carousel_per_column['Mobile'] )
                            : ( $is_spotlight ? 1.0 : 1 ),
                        'spaceBetween'  => isset( $carousel_per_column_gap['Mobile'] ) ? (int) $carousel_per_column_gap['Mobile'] : 0,
                        'speed'         => isset( $speed['Mobile'] ) ? (int) $speed['Mobile'] : 800,
                        'autoplay'      => $autoplay ? array( 'delay' => isset( $autoplay_delay['Mobile'] ) ? (int) $autoplay_delay['Mobile'] : 1000 ) : false,
                        'navigation'    => array( 'enabled' => $nav_enabled_data['Mobile'] ),
                        'pagination'    => array( 'enabled' => $pagination_enabled_data['Mobile'] ),
                    ),
                    768  => array(
                        'slidesPerView' => isset( $carousel_per_column['Tablet'] )
                            ? ( $is_spotlight ? round( max( 1.0, (float) $carousel_per_column['Tablet'] ), 2 ) : (int) $carousel_per_column['Tablet'] )
                            : ( $is_spotlight ? 2.0 : 2 ),
                        'spaceBetween'  => isset( $carousel_per_column_gap['Tablet'] ) ? (int) $carousel_per_column_gap['Tablet'] : 20,
                        'speed'         => isset( $speed['Tablet'] ) ? (int) $speed['Tablet'] : 800,
                        'autoplay'      => $autoplay ? array( 'delay' => isset( $autoplay_delay['Tablet'] ) ? (int) $autoplay_delay['Tablet'] : 1000 ) : false,
                        'navigation'    => array( 'enabled' => $nav_enabled_data['Tablet'] ),
                        'pagination'    => array( 'enabled' => $pagination_enabled_data['Tablet'] ),
                    ),
                    1025 => array(
                        'slidesPerView' => isset( $carousel_per_column['Desktop'] )
                            ? ( $is_spotlight ? round( max( 1.0, (float) $carousel_per_column['Desktop'] ), 2 ) : (int) $carousel_per_column['Desktop'] )
                            : ( $is_spotlight ? 3.0 : 3 ),
                        'spaceBetween'  => isset( $carousel_per_column_gap['Desktop'] ) ? (int) $carousel_per_column_gap['Desktop'] : 20,
                        'speed'         => isset( $speed['Desktop'] ) ? (int) $speed['Desktop'] : 800,
                        'autoplay'      => $autoplay ? array( 'delay' => isset( $autoplay_delay['Desktop'] ) ? (int) $autoplay_delay['Desktop'] : 1000 ) : false,
                        'navigation'    => array( 'enabled' => $nav_enabled_data['Desktop'] ),
                        'pagination'    => array( 'enabled' => $pagination_enabled_data['Desktop'] ),
                    ),
                ),
                'loop'           => $infinite_loop,
                'autoplay'       => $autoplay ? array(
                    'pauseOnMouseEnter'    => $pause_on_hover || $context['enable_tilt'] || 'none' !== $context['card_hover_animation'],
                    'disableOnInteraction' => false,
                    'stopOnLastSlide'      => $stop_on_last_slide,
                    'reverseDirection'     => $reverse_direction,
                ) : false,
                'allowTouchMove' => $allow_touch_move,
                'mousewheel'     => $mousewheel_control,
                'keyboard'       => $keyboard_navigation ? array(
                    'enabled'        => true,
                    'onlyInViewport' => true,
                    'pageUpDown'     => false,
                ) : false,
                'navigation'     => array(
                    'enabled' => $context['any_navigation_enabled'],
                    'nextEl'  => '.' . $block_id . ' .swiper-button-next',
                    'prevEl'  => '.' . $block_id . ' .swiper-button-prev',
                ),
                'pagination'     => array(
                    'enabled'        => $context['any_pagination_enabled'],
                    'el'             => '.' . $block_id . ' .swiper-pagination-post-carousel',
                    'type'           => $pagination_type,
                    'dynamicBullets' => 'bullets' === $pagination_type ? $dynamic_bullets : false,
                    'clickable'      => true,
                ),
            );

            if ( ! empty( $context['enable_spotlight'] ) ) {
                $swiper_config['centeredSlides'] = true;
            }

            if ( 'mobile-only' === $carousel_mode ) {
                $swiper_config['breakpoints'][1025] = array(
                    'enabled'       => false,
                    'slidesPerView' => isset( $carousel_per_column['Desktop'] ) ? (int) $carousel_per_column['Desktop'] : 3,
                );
            }

            return $swiper_config;
        }

        /**
         * Builds the serialized wrapper attribute string using `get_block_wrapper_attributes()`.
         *
         * @since 1.2.3
         *
         * @param array $context         Compiled block rendering context.
         * @param array $swiper_settings Compiled Swiper configuration.
         * @return string Escaped wrapper attribute string.
         */
        private static function build_wrapper_attributes( array $context, array $swiper_settings ): string {
            $wrapper_classes = array(
                'gslider-post-carousel-wrapper',
                $context['block_id'],
                'is-layout-' . $context['post_layout_mode'],
                'is-preset-' . $context['preset_style'],
                'is-mode-' . $context['carousel_mode'],
                $context['navigation']['position_type'],
                $context['navigation']['arrow_position'],
                $context['global_class'],
            );

            if ( ! empty( $context['show_autoplay_progress'] ) && 'marquee' !== $context['carousel_mode'] ) {
                $wrapper_classes[] = 'has-autoplay-progress';
            }

            if ( 'hero' === $context['post_layout_mode'] ) {
                $wrapper_classes[] = 'hero-align-' . $context['hero_content_alignment'];
            }

            if ( 'newsroom' === $context['post_layout_mode'] ) {
                $wrapper_classes[] = 'queue-position-' . $context['newsroom_queue_position'];
            }

            if ( ! empty( $context['enable_spotlight'] ) ) {
                $wrapper_classes[] = 'is-spotlight';
            }

            if ( 'none' !== $context['card_hover_animation'] ) {
                $wrapper_classes[] = 'gslider-card-hover-' . $context['card_hover_animation'];
            }

            if ( $context['any_pagination_enabled'] ) {
                $wrapper_classes[] = 'has-pagination';
            }

            if ( ! empty( $context['equal_height'] ) ) {
                $wrapper_classes[] = 'has-equal-height';
            }

            $wrapper_data = array(
                'class'                => implode( ' ', array_filter( $wrapper_classes ) ),
                'data-swiper-settings' => wp_json_encode( $swiper_settings ),
            );

            if ( '' !== $context['global_id'] ) {
                $wrapper_data['id'] = $context['global_id'];
            }

            if ( $context['has_entrance_animation'] ) {
                $wrapper_data['data-animation-settings'] = wp_json_encode(
                    array(
                        'duration' => $context['animation_duration'],
                        'delay'    => $context['animation_delay'],
                        'offset'   => $context['animation_offset'],
                        'easing'   => $context['animation_easing'],
                    )
                );
            }

            if ( $context['enable_stagger'] && $context['has_entrance_animation'] ) {
                $wrapper_data['data-stagger-enabled'] = '1';
                $wrapper_data['data-stagger-delay']   = wp_json_encode( $context['stagger_delay'] );
            }

            if ( $context['enable_tilt'] ) {
                $wrapper_data['data-tilt-max']         = wp_json_encode( $context['tilt_max_angle'] );
                $wrapper_data['data-tilt-perspective'] = wp_json_encode( $context['tilt_perspective'] );
                $wrapper_data['data-tilt-scale']       = wp_json_encode( $context['tilt_scale'] );
                $wrapper_data['data-tilt-speed']       = wp_json_encode( $context['tilt_speed'] );
            }

            return get_block_wrapper_attributes( $wrapper_data );
        }

        /**
         * Compiles the normalized rendering context shared across cards, wrapper, and navigation.
         *
         * @since 1.2.3
         *
         * @param array $attributes Raw block attributes.
         * @return array<string, mixed> Normalized rendering context.
         */
        public static function build_render_context( array $attributes ): array {
            $default_show = array(
                'Desktop' => true,
                'Tablet'  => true,
                'Mobile'  => true,
            );

            $show_navigation     = isset( $attributes['showNavigation'] ) ? $attributes['showNavigation'] : $default_show;
            $show_pagination     = isset( $attributes['showPagination'] ) ? $attributes['showPagination'] : $default_show;
            $show_featured_image = isset( $attributes['showFeaturedImage'] ) ? $attributes['showFeaturedImage'] : $default_show;
            $show_post_title     = isset( $attributes['showPostTitle'] ) ? $attributes['showPostTitle'] : $default_show;
            $show_excerpt        = isset( $attributes['showExcerpt'] ) ? $attributes['showExcerpt'] : $default_show;
            $show_meta           = isset( $attributes['showMeta'] ) ? $attributes['showMeta'] : $default_show;
            $show_meta_author    = isset( $attributes['showMetaAuthor'] ) ? $attributes['showMetaAuthor'] : $default_show;
            $show_meta_avatar    = isset( $attributes['showMetaAvatar'] ) ? $attributes['showMetaAvatar'] : $default_show;
            $show_meta_date      = isset( $attributes['showMetaDate'] ) ? $attributes['showMetaDate'] : $default_show;
            $show_taxonomy       = isset( $attributes['showTaxonomy'] ) ? $attributes['showTaxonomy'] : $default_show;
            $show_read_more      = isset( $attributes['showReadMoreButton'] ) ? $attributes['showReadMoreButton'] : $default_show;

            $card_entrance_animation = isset( $attributes['cardEntranceAnimation'] )
                ? sanitize_html_class( (string) $attributes['cardEntranceAnimation'] )
                : 'none';

            $read_more_icon_switcher = isset( $attributes['readMoreButtonIconSwitcher'] ) ? (bool) $attributes['readMoreButtonIconSwitcher'] : true;
            $read_more_icon_type     = isset( $attributes['readMoreButtonIconType'] ) ? sanitize_text_field( (string) $attributes['readMoreButtonIconType'] ) : 'icon';
            $read_more_icon_html_raw = isset( $attributes['readMoreButtonIconHtml'] ) ? $attributes['readMoreButtonIconHtml'] : '';
            $read_more_icon_img_url  = isset( $attributes['readMoreButtonIconImageUrl'] ) ? esc_url_raw( (string) $attributes['readMoreButtonIconImageUrl'] ) : '';
            $read_more_svg_icon_html = ( $read_more_icon_switcher && 'icon' === $read_more_icon_type )
                ? SupportSVG::sanitize_inline_svg( $read_more_icon_html_raw )
                : '';

            $any_navigation_enabled = self::is_any_breakpoint_enabled( $show_navigation );
            $nav_position_type      = isset( $attributes['navigationArrowPositionType'] ) ? sanitize_text_field( (string) $attributes['navigationArrowPositionType'] ) : 'outside';
            $nav_arrow_position     = isset( $attributes['navigationArrowPosition'] ) ? sanitize_text_field( (string) $attributes['navigationArrowPosition'] ) : 'center';

            $raw_layout_mode    = isset( $attributes['postLayoutMode'] ) ? sanitize_key( (string) $attributes['postLayoutMode'] ) : 'classic';
            $post_layout_mode   = in_array( $raw_layout_mode, self::ALLOWED_LAYOUT_MODES, true ) ? $raw_layout_mode : 'classic';
            $preset_style       = isset( $attributes['presetStyle'] ) && '' !== sanitize_html_class( (string) $attributes['presetStyle'] )
                ? sanitize_html_class( (string) $attributes['presetStyle'] )
                : 'classic-card';
            $raw_hero_align     = isset( $attributes['heroContentAlignment'] ) ? sanitize_key( (string) $attributes['heroContentAlignment'] ) : 'bottom-left';
            $hero_content_align = in_array( $raw_hero_align, self::ALLOWED_HERO_ALIGNMENTS, true ) ? $raw_hero_align : 'bottom-left';
            $raw_media_position = isset( $attributes['horizontalMediaPosition'] ) ? sanitize_key( (string) $attributes['horizontalMediaPosition'] ) : 'left';
            $media_position     = in_array( $raw_media_position, self::ALLOWED_MEDIA_POSITIONS, true ) ? $raw_media_position : 'left';
            $raw_queue_position = isset( $attributes['newsroomQueuePosition'] ) ? sanitize_key( (string) $attributes['newsroomQueuePosition'] ) : 'right';
            $queue_position     = in_array( $raw_queue_position, self::ALLOWED_QUEUE_POSITIONS, true ) ? $raw_queue_position : 'right';
            $default_scrim      = 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)';
            $raw_scrim          = isset( $attributes['overlayGradientScrim'] ) && is_string( $attributes['overlayGradientScrim'] )
                ? trim( (string) preg_replace( '/[;{}<>]/', '', $attributes['overlayGradientScrim'] ) )
                : '';

            $raw_meta_sep               = isset( $attributes['metaSeparator'] ) ? sanitize_key( (string) $attributes['metaSeparator'] ) : 'bullet';
            $meta_separator             = in_array( $raw_meta_sep, array( 'bullet', 'pipe', 'slash', 'dash', 'none' ), true ) ? $raw_meta_sep : 'bullet';
            $raw_date_format            = isset( $attributes['dateFormat'] ) ? sanitize_key( (string) $attributes['dateFormat'] ) : 'default';
            $date_format                = in_array( $raw_date_format, array( 'default', 'relative' ), true ) ? $raw_date_format : 'default';
            $taxonomy_max_count         = isset( $attributes['taxonomyMaxCount'] ) ? min( 5, max( 1, intval( $attributes['taxonomyMaxCount'] ) ) ) : 2;
            $show_reading_time          = isset( $attributes['showReadingTime'] ) ? (bool) $attributes['showReadingTime'] : true;
            $show_comment_count         = ! empty( $attributes['showCommentCount'] );

            $raw_mode                   = isset( $attributes['carouselMode'] ) ? sanitize_key( (string) $attributes['carouselMode'] ) : 'carousel';
            $carousel_mode              = in_array( $raw_mode, array( 'carousel', 'marquee', 'mobile-only' ), true ) ? $raw_mode : 'carousel';
            $marquee_speed              = isset( $attributes['marqueeSpeed'] ) ? max( 500, min( 30000, intval( $attributes['marqueeSpeed'] ) ) ) : 6000;
            $marquee_pause_on_hover     = ! isset( $attributes['marqueePauseOnHover'] ) || ! empty( $attributes['marqueePauseOnHover'] );
            $show_autoplay_progress     = ! empty( $attributes['showAutoplayProgress'] );
            $raw_progress_pos           = isset( $attributes['autoplayProgressPosition'] ) ? sanitize_key( (string) $attributes['autoplayProgressPosition'] ) : 'top';
            $autoplay_progress_position = in_array( $raw_progress_pos, array( 'top', 'bottom' ), true ) ? $raw_progress_pos : 'top';
            $autoplay_progress_color    = self::sanitize_color_value( $attributes['autoplayProgressColor'] ?? null, '#007cba' );
            $autoplay_progress_height   = isset( $attributes['autoplayProgressHeight'] ) ? max( 1, min( 30, intval( $attributes['autoplayProgressHeight'] ) ) ) : 4;
            $desktop_grid_columns       = isset( $attributes['desktopGridColumns'] ) ? max( 1, min( 6, intval( $attributes['desktopGridColumns'] ) ) ) : 3;
            $desktop_grid_gap           = isset( $attributes['desktopGridGap'] ) ? max( 0, min( 100, intval( $attributes['desktopGridGap'] ) ) ) : 24;

            return array(
                'block_id'                               => isset( $attributes['blockId'] ) ? sanitize_html_class( (string) $attributes['blockId'] ) : '',
                'global_id'                              => isset( $attributes['globalID'] ) ? sanitize_html_class( (string) $attributes['globalID'] ) : '',
                'global_class'                           => self::sanitize_global_classes( $attributes['globalClass'] ?? '' ),
                'post_layout_mode'                       => $post_layout_mode,
                'preset_style'                           => $preset_style,
                'hero_height_desktop'                    => isset( $attributes['heroHeightDesktop'] ) ? min( 1200, max( 200, intval( $attributes['heroHeightDesktop'] ) ) ) : 520,
                'hero_height_tablet'                     => isset( $attributes['heroHeightTablet'] ) ? min( 1200, max( 200, intval( $attributes['heroHeightTablet'] ) ) ) : 420,
                'hero_height_mobile'                     => isset( $attributes['heroHeightMobile'] ) ? min( 1200, max( 200, intval( $attributes['heroHeightMobile'] ) ) ) : 340,
                'hero_content_alignment'                 => $hero_content_align,
                'enable_spotlight'                       => ! empty( $attributes['enableSpotlight'] ),
                'spotlight_scale_side'                   => isset( $attributes['spotlightScaleSide'] ) ? round( min( 0.98, max( 0.80, floatval( $attributes['spotlightScaleSide'] ) ) ), 2 ) : 0.92,
                'spotlight_opacity_side'                 => isset( $attributes['spotlightOpacitySide'] ) ? round( min( 1.0, max( 0.30, floatval( $attributes['spotlightOpacitySide'] ) ) ), 2 ) : 0.65,
                'horizontal_media_width'                 => isset( $attributes['horizontalMediaWidth'] ) ? min( 60, max( 30, intval( $attributes['horizontalMediaWidth'] ) ) ) : 45,
                'horizontal_media_position'              => $media_position,
                'newsroom_main_width'                    => isset( $attributes['newsroomMainWidth'] ) ? min( 80, max( 50, intval( $attributes['newsroomMainWidth'] ) ) ) : 65,
                'newsroom_queue_position'                => $queue_position,
                'overlay_gradient_scrim'                 => '' !== $raw_scrim ? $raw_scrim : $default_scrim,
                'overlay_scrim_height'                   => isset( $attributes['overlayScrimHeight'] ) ? min( 100, max( 40, intval( $attributes['overlayScrimHeight'] ) ) ) : 75,
                'timeline_stem_color'                    => self::sanitize_color_value( $attributes['timelineStemColor'] ?? null, '#e2e8f0' ),
                'timeline_stem_thickness'                => isset( $attributes['timelineStemThickness'] ) ? min( 10, max( 1, intval( $attributes['timelineStemThickness'] ) ) ) : 2,
                'timeline_dot_size'                      => isset( $attributes['timelineDotSize'] ) ? min( 48, max( 8, intval( $attributes['timelineDotSize'] ) ) ) : 16,
                'timeline_dot_color'                     => self::sanitize_color_value( $attributes['timelineDotColor'] ?? null, '#007cba' ),
                'timeline_date_position'                 => isset( $attributes['timelineDatePosition'] ) && in_array( $attributes['timelineDatePosition'], array( 'above', 'below' ), true ) ? $attributes['timelineDatePosition'] : 'above',
                'equal_height'                           => isset( $attributes['equalHeight'] ) ? (bool) $attributes['equalHeight'] : true,
                'enable_card_clickable_link'             => ! empty( $attributes['enableCardClickableLink'] ),
                'enable_lazy_load'                       => ! empty( $attributes['enableLazyLoad'] ),
                'enable_schema_markup'                   => SchemaBuilder::is_schema_enabled( $attributes ),
                'enable_fallback_thumbnail'              => isset( $attributes['enableFallbackThumbnail'] ) ? (bool) $attributes['enableFallbackThumbnail'] : true,
                'fallback_thumbnail_url'                 => isset( $attributes['fallbackThumbnailUrl'] ) ? esc_url_raw( (string) $attributes['fallbackThumbnailUrl'] ) : '',
                'fallback_thumbnail_id'                  => isset( $attributes['fallbackThumbnailId'] ) ? max( 0, intval( $attributes['fallbackThumbnailId'] ) ) : 0,
                'post_title_html_tag'                    => self::validate_html_tag( $attributes['postTitleHtmlTag'] ?? 'h3', 'h3' ),
                'post_excerpt_html_tag'                  => self::validate_html_tag( $attributes['postExcerptHtmlTag'] ?? 'p', 'p' ),
                'enable_post_excerpt_limit'              => ! empty( $attributes['enablePostExcerptLimit'] ),
                'post_excerpt_limit_type'                => isset( $attributes['postExcerptLimitType'] ) ? sanitize_text_field( (string) $attributes['postExcerptLimitType'] ) : 'words',
                'post_excerpt_limit'                     => self::get_responsive_int( $attributes['postExcerptLimit'] ?? null, array( 'Desktop' => 20, 'Tablet' => 20, 'Mobile' => 20 ) ),
                'post_excerpt_limit_suffix'              => isset( $attributes['postExcerptLimitSuffix'] ) ? sanitize_text_field( (string) $attributes['postExcerptLimitSuffix'] ) : '...',
                'post_excerpt_source'                    => isset( $attributes['postExcerptSource'] ) ? sanitize_text_field( (string) $attributes['postExcerptSource'] ) : 'auto',
                'enable_post_title_limit'                => ! empty( $attributes['enablePostTitleLimit'] ),
                'post_title_limit_type'                  => isset( $attributes['postTitleLimitType'] ) ? sanitize_text_field( (string) $attributes['postTitleLimitType'] ) : 'words',
                'post_title_limit'                       => self::get_responsive_int( $attributes['postTitleLimit'] ?? null, array( 'Desktop' => 10, 'Tablet' => 10, 'Mobile' => 10 ) ),
                'post_title_limit_suffix'                => isset( $attributes['postTitleLimitSuffix'] ) ? sanitize_text_field( (string) $attributes['postTitleLimitSuffix'] ) : '...',
                'enable_post_title_link'                 => isset( $attributes['enablePostTitleLink'] ) ? (bool) $attributes['enablePostTitleLink'] : true,
                'post_title_link_target'                 => ! empty( $attributes['postTitleLinkTarget'] ),
                'post_title_link_nofollow'               => ! empty( $attributes['postTitleLinkNofollow'] ),
                'post_title_link_sponsored'              => ! empty( $attributes['postTitleLinkSponsored'] ),
                'enable_post_title_hover_underline_anim' => ! empty( $attributes['enablePostTitleHoverUnderlineAnim'] ),
                'show_post_title_divider'                => ! empty( $attributes['showPostTitleDivider'] ),
                'card_entrance_animation'                => $card_entrance_animation,
                'has_entrance_animation'                 => 'none' !== $card_entrance_animation,
                'animation_duration'                     => self::get_responsive_int( $attributes['cardEntranceAnimationDuration'] ?? null, array( 'Desktop' => 600, 'Tablet' => 600, 'Mobile' => 600 ) ),
                'animation_delay'                        => self::get_responsive_int( $attributes['cardEntranceAnimationDelay'] ?? null, array( 'Desktop' => 0, 'Tablet' => 0, 'Mobile' => 0 ) ),
                'animation_offset'                       => self::get_responsive_int( $attributes['cardEntranceAnimationOffset'] ?? null, array( 'Desktop' => 15, 'Tablet' => 15, 'Mobile' => 15 ) ),
                'animation_easing'                       => isset( $attributes['cardEntranceAnimationEasing'] ) ? sanitize_text_field( (string) $attributes['cardEntranceAnimationEasing'] ) : 'ease-out',
                'enable_stagger'                         => ! empty( $attributes['enableStaggerAnimation'] ),
                'stagger_delay'                          => self::get_responsive_int( $attributes['cardStaggerDelay'] ?? null, array( 'Desktop' => 100, 'Tablet' => 100, 'Mobile' => 100 ) ),
                'card_hover_animation'                   => isset( $attributes['cardHoverAnimation'] ) ? sanitize_html_class( (string) $attributes['cardHoverAnimation'] ) : 'none',
                'enable_tilt'                            => ! empty( $attributes['enableCardTilt'] ),
                'tilt_max_angle'                         => self::get_responsive_int( $attributes['cardTiltMaxAngle'] ?? null, array( 'Desktop' => 12, 'Tablet' => 12, 'Mobile' => 12 ) ),
                'tilt_perspective'                       => self::get_responsive_int( $attributes['cardTiltPerspective'] ?? null, array( 'Desktop' => 800, 'Tablet' => 800, 'Mobile' => 800 ) ),
                'tilt_scale'                             => self::get_responsive_float( $attributes['cardTiltHoverScale'] ?? null, array( 'Desktop' => 1.02, 'Tablet' => 1.02, 'Mobile' => 1.02 ) ),
                'tilt_speed'                             => self::get_responsive_int( $attributes['cardTiltTransitionSpeed'] ?? null, array( 'Desktop' => 400, 'Tablet' => 400, 'Mobile' => 400 ) ),
                'read_more_button_text'                  => ! empty( $attributes['readMoreButtonText'] ) ? sanitize_text_field( (string) $attributes['readMoreButtonText'] ) : 'Read More',
                'read_more_button_link_type'             => isset( $attributes['readMoreButtonLinkType'] ) ? sanitize_text_field( (string) $attributes['readMoreButtonLinkType'] ) : 'post',
                'read_more_button_link'                  => isset( $attributes['readMoreButtonLink'] ) ? $attributes['readMoreButtonLink'] : '#',
                'read_more_button_target_link'           => isset( $attributes['readMoreButtonTargetLink'] ) ? (bool) $attributes['readMoreButtonTargetLink'] : true,
                'read_more_button_nofollow'              => ! empty( $attributes['readMoreButtonNofollow'] ),
                'read_more_button_sponsored'             => ! empty( $attributes['readMoreButtonSponsored'] ),
                'read_more_button_icon_position'         => isset( $attributes['readMoreButtonIconPosition'] ) ? sanitize_text_field( (string) $attributes['readMoreButtonIconPosition'] ) : 'right',
                'read_more_button_icon_img_url'          => $read_more_icon_img_url,
                'read_more_button_icon_img_alt'          => isset( $attributes['readMoreButtonIconImageAlt'] ) ? sanitize_text_field( (string) $attributes['readMoreButtonIconImageAlt'] ) : 'Right Arrow',
                'read_more_svg_icon_html'                => $read_more_svg_icon_html,
                'has_read_more_svg_icon'                 => '' !== $read_more_svg_icon_html,
                'has_read_more_image_icon'               => $read_more_icon_switcher && 'image' === $read_more_icon_type && '' !== $read_more_icon_img_url,
                'post_taxonomy_display'                  => isset( $attributes['postTaxonomyDisplay'] ) ? (string) $attributes['postTaxonomyDisplay'] : 'category',
                'enable_taxonomy_badge_overlay'          => isset( $attributes['enableTaxonomyBadgeOverlay'] ) ? (bool) $attributes['enableTaxonomyBadgeOverlay'] : true,
                'taxonomy_badge_overlay_position'        => isset( $attributes['taxonomyBadgeOverlayPosition'] ) ? sanitize_text_field( (string) $attributes['taxonomyBadgeOverlayPosition'] ) : 'top-left',
                'taxonomy_badge_overlay_visibility'      => isset( $attributes['taxonomyBadgeOverlayVisibility'] ) ? sanitize_text_field( (string) $attributes['taxonomyBadgeOverlayVisibility'] ) : 'always',
                'show_reading_time'                      => $show_reading_time,
                'show_comment_count'                     => $show_comment_count,
                'date_format'                            => $date_format,
                'taxonomy_max_count'                     => $taxonomy_max_count,
                'meta_separator'                         => $meta_separator,
                'carousel_mode'                          => $carousel_mode,
                'marquee_speed'                          => $marquee_speed,
                'marquee_pause_on_hover'                 => $marquee_pause_on_hover,
                'show_autoplay_progress'                 => $show_autoplay_progress,
                'autoplay_progress_position'             => $autoplay_progress_position,
                'autoplay_progress_color'                => $autoplay_progress_color,
                'autoplay_progress_height'               => $autoplay_progress_height,
                'desktop_grid_columns'                   => $desktop_grid_columns,
                'desktop_grid_gap'                       => $desktop_grid_gap,
                'any_image_enabled'                      => self::is_any_breakpoint_enabled( $show_featured_image ),
                'any_title_enabled'                      => self::is_any_breakpoint_enabled( $show_post_title ),
                'all_title_enabled'                      => ! empty( $show_post_title['Desktop'] ) && ! empty( $show_post_title['Tablet'] ) && ! empty( $show_post_title['Mobile'] ),
                'any_excerpt_enabled'                    => self::is_any_breakpoint_enabled( $show_excerpt ),
                'any_meta_enabled'                       => self::is_any_breakpoint_enabled( $show_meta ),
                'any_author_enabled'                     => self::is_any_breakpoint_enabled( $show_meta_author ),
                'any_avatar_enabled'                     => self::is_any_breakpoint_enabled( $show_meta_avatar ),
                'any_date_enabled'                       => self::is_any_breakpoint_enabled( $show_meta_date ),
                'any_taxonomy_enabled'                   => self::is_any_breakpoint_enabled( $show_taxonomy ),
                'any_navigation_enabled'                 => $any_navigation_enabled,
                'any_pagination_enabled'                 => self::is_any_breakpoint_enabled( $show_pagination ),
                'any_read_more_button_enabled'           => self::is_any_breakpoint_enabled( $show_read_more ),
                'pagination_position_type'               => isset( $attributes['paginationPositionType'] ) ? sanitize_text_field( (string) $attributes['paginationPositionType'] ) : 'outside',
                'content_order'                          => self::normalize_content_order( $attributes['contentOrder'] ?? null ),
                'navigation_enabled_data'                => array(
                    'Mobile'  => ! empty( $show_navigation['Mobile'] ),
                    'Tablet'  => ! empty( $show_navigation['Tablet'] ),
                    'Desktop' => ! empty( $show_navigation['Desktop'] ),
                ),
                'pagination_enabled_data'                => array(
                    'Mobile'  => ! empty( $show_pagination['Mobile'] ),
                    'Tablet'  => ! empty( $show_pagination['Tablet'] ),
                    'Desktop' => ! empty( $show_pagination['Desktop'] ),
                ),
                'navigation'                             => array(
                    'enabled'          => $any_navigation_enabled,
                    'position_type'    => $nav_position_type,
                    'arrow_position'   => $nav_arrow_position,
                    'use_custom_icons' => isset( $attributes['navigationArrowsIconSwitcher'] ) ? (bool) $attributes['navigationArrowsIconSwitcher'] : false,
                    'left'             => array(
                        'align'     => isset( $attributes['navigationArrowsIconLeftAlign'] ) ? sanitize_text_field( (string) $attributes['navigationArrowsIconLeftAlign'] ) : 'icon',
                        'html'      => isset( $attributes['navigationArrowsIconLeftHtml'] ) ? (string) $attributes['navigationArrowsIconLeftHtml'] : '',
                        'image_url' => isset( $attributes['navigationArrowsIconLeftImageUrl'] ) ? esc_url_raw( (string) $attributes['navigationArrowsIconLeftImageUrl'] ) : '',
                        'image_alt' => isset( $attributes['navigationArrowsIconLeftImageAlt'] ) ? sanitize_text_field( (string) $attributes['navigationArrowsIconLeftImageAlt'] ) : 'Left Arrow',
                    ),
                    'right'            => array(
                        'align'     => isset( $attributes['navigationArrowsIconRightAlign'] ) ? sanitize_text_field( (string) $attributes['navigationArrowsIconRightAlign'] ) : 'icon',
                        'html'      => isset( $attributes['navigationArrowsIconRightHtml'] ) ? (string) $attributes['navigationArrowsIconRightHtml'] : '',
                        'image_url' => isset( $attributes['navigationArrowsIconRightImageUrl'] ) ? esc_url_raw( (string) $attributes['navigationArrowsIconRightImageUrl'] ) : '',
                        'image_alt' => isset( $attributes['navigationArrowsIconRightImageAlt'] ) ? sanitize_text_field( (string) $attributes['navigationArrowsIconRightImageAlt'] ) : 'Right Arrow',
                    ),
                ),
            );
        }
    }
}
