<?php
/**
 * Post Carousel Card Markup Builder.
 *
 * Builds the inner Swiper slide and article card HTML markup in configured
 * content order while preserving LCP optimization and security escaping.
 *
 * @package GSlider\Blocks\PostCarousel
 * @since   1.2.3
 */

namespace GSlider\Blocks\PostCarousel;

use GSlider\Utils\Helper;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( CardMarkupBuilder::class, false ) ) {

    /**
     * Renders individual Post Carousel slide cards.
     *
     * @since 1.2.3
     */
    class CardMarkupBuilder {

        /**
         * Allowed HTML elements/attributes for taxonomy badge markup.
         *
         * @since 1.2.3
         *
         * @var array<string, array<string, bool>>
         */
        private const TAXONOMY_ALLOWED_HTML = array(
            'div'  => array(
                'class' => true,
            ),
            'span' => array(
                'class'       => true,
                'aria-label'  => true,
                'aria-hidden' => true,
            ),
            'a'    => array(
                'href' => true,
            ),
        );

        /**
         * Renders a complete `.swiper-slide` card element for the active queried post.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID inside the WP_Query loop.
         * @param array $context Compiled block rendering context.
         * @return string Rendered slide card HTML.
         */
        public static function render_card( int $post_id, array $context ): string {
            $taxonomy_markup = self::build_taxonomy_markup( $post_id, $context );
            $excerpt         = self::build_excerpt( $post_id, $context );

            $article_class = 'gslider-post-carousel-card';
            if ( ! empty( $context['equal_height'] ) ) {
                $article_class .= ' has-equal-height';
            }
            if ( ! empty( $context['enable_card_clickable_link'] ) ) {
                $article_class .= ' is-clickable';
            }
            if ( ! empty( $context['has_entrance_animation'] ) ) {
                $article_class .= ' animated ' . esc_attr( (string) $context['card_entrance_animation'] ) . ' gslider-has-entrance-anim';
            }
            if ( ! empty( $context['enable_tilt'] ) ) {
                $article_class .= ' gslider-has-tilt';
            }

            $thumbnail_html             = self::render_thumbnail( $post_id, $taxonomy_markup, $context );
            $has_image                  = '' !== $thumbnail_html;
            $has_all_devices_title_link = ! empty( $context['all_title_enabled'] ) && ! empty( $context['enable_post_title_link'] );

            if ( 'horizontal' === ( $context['post_layout_mode'] ?? 'classic' ) ) {
                $media_pos      = 'right' === ( $context['horizontal_media_position'] ?? 'left' ) ? 'right' : 'left';
                $article_class .= ' media-position-' . $media_pos;
                if ( ! $has_image ) {
                    $article_class .= ' has-no-image';
                }
            } elseif ( 'timeline' === ( $context['post_layout_mode'] ?? 'classic' ) ) {
                $article_class .= ' is-timeline-card';
            }

            $before_thumb_html = '';
            $after_thumb_html  = '';
            $seen_thumbnail    = ( '' === $thumbnail_html );

            $content_order = isset( $context['content_order'] ) && is_array( $context['content_order'] )
                ? $context['content_order']
                : array();

            foreach ( $content_order as $element ) {
                if ( 'thumbnail' === $element ) {
                    $seen_thumbnail = true;
                    continue;
                }

                $chunk = '';
                switch ( $element ) {
                    case 'categories':
                        if ( ( empty( $context['enable_taxonomy_badge_overlay'] ) || ! $has_image ) && '' !== $taxonomy_markup ) {
                            $chunk = wp_kses( $taxonomy_markup, self::TAXONOMY_ALLOWED_HTML );
                        }
                        break;

                    case 'title':
                        $chunk = self::render_title( $post_id, $context );
                        break;

                    case 'excerpt':
                        $chunk = self::render_excerpt( $excerpt, $context );
                        break;

                    case 'meta':
                        $chunk = self::render_meta( $post_id, $context );
                        break;

                    case 'readmore':
                        $chunk = self::render_readmore( $post_id, $context );
                        break;
                }

                if ( '' !== $chunk ) {
                    if ( $seen_thumbnail ) {
                        $after_thumb_html .= $chunk;
                    } else {
                        $before_thumb_html .= $chunk;
                    }
                }
            }

            $layout_mode = $context['post_layout_mode'] ?? 'classic';

            if ( '' === $thumbnail_html ) {
                $elements_html = '            <div class="gslider-post-carousel-body">' . "\n"
                    . $after_thumb_html
                    . '            </div>' . "\n";
            } elseif ( ! in_array( $layout_mode, array( 'classic', 'minimal' ), true ) ) {
                $elements_html = $thumbnail_html
                    . '            <div class="gslider-post-carousel-body">' . "\n"
                    . $before_thumb_html
                    . $after_thumb_html
                    . '            </div>' . "\n";
            } elseif ( '' === $after_thumb_html && '' !== $before_thumb_html ) {
                $elements_html = '            <div class="gslider-post-carousel-body">' . "\n"
                    . $before_thumb_html
                    . '            </div>' . "\n"
                    . $thumbnail_html;
            } else {
                $elements_html = $before_thumb_html
                    . $thumbnail_html
                    . '            <div class="gslider-post-carousel-body">' . "\n"
                    . $after_thumb_html
                    . '            </div>' . "\n";
            }

            if ( ! empty( $context['enable_card_clickable_link'] ) && ! $has_all_devices_title_link ) {
                $elements_html .= '            <a class="gslider-post-carousel-card-link" href="' . esc_url( get_permalink( $post_id ) ) . '" aria-label="' . esc_attr( get_the_title( $post_id ) ) . '"></a>' . "\n";
            }

            if ( 'timeline' === $layout_mode ) {
                $elements_html = self::render_timeline_node( $post_id, $context ) . $elements_html;
            }

            return '<div class="swiper-slide">' . "\n"
                . '    <div class="gslider-post-carousel-content-wrapper">' . "\n"
                . '        <article class="' . esc_attr( $article_class ) . '">' . "\n"
                . $elements_html
                . '        </article>' . "\n"
                . '    </div>' . "\n"
                . '</div>' . "\n";
        }

        /**
         * Builds the reusable category and tag markup for a post card.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Taxonomy HTML markup.
         */
        private static function build_taxonomy_markup( int $post_id, array $context ): string {
            if ( empty( $context['any_taxonomy_enabled'] ) ) {
                return '';
            }

            $categories            = get_the_category( $post_id );
            $post_taxonomy_display = isset( $context['post_taxonomy_display'] ) ? (string) $context['post_taxonomy_display'] : 'category';
            $show_cat              = ( 'category' === $post_taxonomy_display || 'both' === $post_taxonomy_display );
            $show_tag              = ( 'tag' === $post_taxonomy_display || 'both' === $post_taxonomy_display );
            $max_count             = isset( $context['taxonomy_max_count'] ) ? min( 5, max( 1, (int) $context['taxonomy_max_count'] ) ) : 2;

            ob_start();
            if ( $show_cat && ! empty( $categories ) && is_array( $categories ) ) {
                $total_cats   = count( $categories );
                $sliced_cats  = array_slice( $categories, 0, $max_count );
                $cat_overflow = $total_cats - count( $sliced_cats );
                ?>
                <div class="gslider-post-carousel-categories">
                    <?php foreach ( $sliced_cats as $cat ) : ?>
                        <span class="gslider-category-item"><a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>"><?php echo esc_html( $cat->name ); ?></a></span>
                    <?php endforeach; ?>
                    <?php if ( $cat_overflow > 0 ) : ?>
                        <span class="gslider-category-item is-more-badge"><span class="screen-reader-text"><?php echo esc_html( sprintf( /* translators: %d: Number of remaining categories. */ _n( '%d more category', '%d more categories', $cat_overflow, 'gslider-blocks' ), $cat_overflow ) ); ?></span><span aria-hidden="true">+<?php echo esc_html( (string) $cat_overflow ); ?></span></span>
                    <?php endif; ?>
                </div>
                <?php
            }

            if ( $show_tag ) {
                $post_tags = get_the_tags( $post_id );
                if ( ! empty( $post_tags ) && is_array( $post_tags ) ) {
                    $total_tags   = count( $post_tags );
                    $sliced_tags  = array_slice( $post_tags, 0, $max_count );
                    $tag_overflow = $total_tags - count( $sliced_tags );
                    ?>
                    <div class="gslider-post-carousel-tags">
                        <?php foreach ( $sliced_tags as $tag ) : ?>
                            <span class="gslider-tag-item"><a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>"><?php echo esc_html( $tag->name ); ?></a></span>
                        <?php endforeach; ?>
                        <?php if ( $tag_overflow > 0 ) : ?>
                            <span class="gslider-tag-item is-more-badge"><span class="screen-reader-text"><?php echo esc_html( sprintf( /* translators: %d: Number of remaining tags. */ _n( '%d more tag', '%d more tags', $tag_overflow, 'gslider-blocks' ), $tag_overflow ) ); ?></span><span aria-hidden="true">+<?php echo esc_html( (string) $tag_overflow ); ?></span></span>
                        <?php endif; ?>
                    </div>
                    <?php
                }
            }

            return (string) ob_get_clean();
        }

        /**
         * Extracts and truncates the post excerpt according to source and limit settings.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Prepared excerpt string.
         */
        public static function build_excerpt( int $post_id, array $context ): string {
            $source      = isset( $context['post_excerpt_source'] ) ? (string) $context['post_excerpt_source'] : 'auto';
            $raw_excerpt = '';

            if ( 'excerpt' === $source ) {
                if ( has_excerpt( $post_id ) ) {
                    $raw_excerpt = get_the_excerpt( $post_id );
                }
            } elseif ( 'content' === $source ) {
                $raw_excerpt = get_the_content( null, false, $post_id );
            } else {
                $raw_excerpt = get_the_excerpt( $post_id );
            }

            $clean_excerpt = strip_shortcodes( $raw_excerpt );
            $clean_excerpt = wp_strip_all_tags( $clean_excerpt );
            $clean_excerpt = trim( $clean_excerpt );

            if ( empty( $context['enable_post_excerpt_limit'] ) ) {
                return $clean_excerpt;
            }

            $limit_val = isset( $context['post_excerpt_limit']['Desktop'] ) ? intval( $context['post_excerpt_limit']['Desktop'] ) : 20;
            if ( $limit_val <= 0 ) {
                $limit_val = 20;
            }

            $suffix = isset( $context['post_excerpt_limit_suffix'] ) ? (string) $context['post_excerpt_limit_suffix'] : '...';
            if ( 'characters' === ( $context['post_excerpt_limit_type'] ?? 'words' ) ) {
                if ( mb_strlen( $clean_excerpt ) > $limit_val ) {
                    return mb_substr( $clean_excerpt, 0, $limit_val ) . $suffix;
                }
                return $clean_excerpt;
            }

            return wp_trim_words( $clean_excerpt, $limit_val, $suffix );
        }

        /**
         * Renders the card featured thumbnail wrapper and optional taxonomy badge overlay.
         *
         * @since 1.2.3
         *
         * @param int    $post_id         Current post ID.
         * @param string $taxonomy_markup Pre-rendered taxonomy HTML.
         * @param array  $context         Compiled block rendering context.
         * @return string Rendered thumbnail HTML or empty string.
         */
        private static function render_thumbnail( int $post_id, string $taxonomy_markup, array $context ): string {
            if ( empty( $context['any_image_enabled'] ) ) {
                return '';
            }

            $has_post_thumb  = has_post_thumbnail( $post_id );
            $allow_fallback  = ! empty( $context['enable_fallback_thumbnail'] );

            if ( ! $has_post_thumb && ! $allow_fallback ) {
                return '';
            }

            $enable_lazy_load    = ! empty( $context['enable_lazy_load'] );
            $raw_fallback_url    = isset( $context['fallback_thumbnail_url'] ) ? (string) $context['fallback_thumbnail_url'] : '';
            $safe_fallback       = '' !== $raw_fallback_url ? esc_url( $raw_fallback_url ) : '';
            $fallback_id         = isset( $context['fallback_thumbnail_id'] ) ? (int) $context['fallback_thumbnail_id'] : 0;
            $fallback_attachment = ( $fallback_id > 0 && function_exists( 'wp_get_attachment_image' ) )
                ? wp_get_attachment_image(
                    $fallback_id,
                    'medium_large',
                    false,
                    array(
                        'class'   => 'gslider-post-carousel-fallback-img',
                        'loading' => $enable_lazy_load ? 'lazy' : 'eager',
                        'alt'     => get_the_title( $post_id ),
                    )
                )
                : '';

            $img_attributes = array(
                'loading' => $enable_lazy_load ? 'lazy' : 'eager',
                'alt'     => get_the_title( $post_id ),
            );

            ob_start();
            ?>
            <div class="gslider-post-carousel-image">
                <a class="gslider-post-thumb-link" href="<?php the_permalink(); ?>" aria-label="<?php the_title_attribute(); ?>">
                    <?php if ( $has_post_thumb ) : ?>
                        <?php the_post_thumbnail( 'medium_large', $img_attributes ); ?>
                    <?php elseif ( '' !== $fallback_attachment ) : ?>
                        <?php echo wp_kses_post( $fallback_attachment ); ?>
                    <?php elseif ( '' !== $safe_fallback ) : ?>
                        <img class="gslider-post-carousel-fallback-img" src="<?php echo esc_url( $raw_fallback_url ); ?>" alt="<?php echo esc_attr( get_the_title( $post_id ) ); ?>" loading="<?php echo esc_attr( $enable_lazy_load ? 'lazy' : 'eager' ); ?>" />
                    <?php else : ?>
                        <svg class="gslider-post-carousel-placeholder-svg" viewBox="0 0 400 225" width="400" height="225" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
                            <rect width="400" height="225" fill="#f1f5f9" />
                            <rect x="164" y="84" width="72" height="56" rx="8" fill="#cbd5e1" />
                            <circle cx="184" cy="102" r="6" fill="#94a3b8" />
                            <path d="M172 132 L194 110 L210 124 L222 114 L232 132 Z" fill="#94a3b8" />
                        </svg>
                    <?php endif; ?>
                </a>
                <?php if ( ! empty( $context['enable_taxonomy_badge_overlay'] ) && '' !== $taxonomy_markup ) : ?>
                    <div class="gslider-taxonomy-badge-overlay gslider-badge-visibility-<?php echo esc_attr( (string) $context['taxonomy_badge_overlay_visibility'] ); ?> gslider-badge-position-<?php echo esc_attr( (string) $context['taxonomy_badge_overlay_position'] ); ?>">
                        <?php echo wp_kses( $taxonomy_markup, self::TAXONOMY_ALLOWED_HTML ); ?>
                    </div>
                <?php endif; ?>
            </div>
            <?php

            return (string) ob_get_clean();
        }

        /**
         * Renders the card post title wrapper and optional link/divider classes.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Rendered title HTML or empty string.
         */
        private static function render_title( int $post_id, array $context ): string {
            if ( empty( $context['any_title_enabled'] ) ) {
                return '';
            }

            $raw_title      = get_the_title( $post_id );
            $rendered_title = $raw_title;
            $limit_type     = isset( $context['post_title_limit_type'] ) ? (string) $context['post_title_limit_type'] : 'words';
            $limit_suffix   = isset( $context['post_title_limit_suffix'] ) ? (string) $context['post_title_limit_suffix'] : '...';

            if ( ! empty( $context['enable_post_title_limit'] ) ) {
                $limit_val = isset( $context['post_title_limit']['Desktop'] )
                    ? intval( $context['post_title_limit']['Desktop'] )
                    : ( 'words' === $limit_type ? 10 : 50 );

                if ( 'words' === $limit_type ) {
                    $rendered_title = wp_trim_words( $raw_title, $limit_val, $limit_suffix );
                } elseif ( mb_strlen( $raw_title ) > $limit_val ) {
                    $rendered_title = mb_substr( $raw_title, 0, $limit_val ) . $limit_suffix;
                }
            }

            $title_wrapper_class = 'gslider-post-carousel-title-wrapper' . ( ! empty( $context['show_post_title_divider'] ) ? ' has-divider' : '' );
            $title_class         = 'gslider-post-carousel-title' . ( ! empty( $context['enable_post_title_hover_underline_anim'] ) ? ' hover-underline-anim' : '' );
            $tag                 = isset( $context['post_title_html_tag'] ) ? (string) $context['post_title_html_tag'] : 'h3';
            $enable_link         = ! empty( $context['enable_post_title_link'] );
            $target              = ! empty( $context['post_title_link_target'] );

            $rel_attr = $enable_link
                ? self::build_rel_attribute(
                    $target,
                    ! empty( $context['post_title_link_nofollow'] ),
                    ! empty( $context['post_title_link_sponsored'] )
                )
                : '';

            ob_start();
            ?>
            <div class="<?php echo esc_attr( $title_wrapper_class ); ?>">
                <<?php echo esc_attr( $tag ); ?> class="<?php echo esc_attr( $title_class ); ?>">
                    <?php if ( $enable_link ) : ?>
                        <a class="gslider-post-carousel-title-link" href="<?php echo esc_url( get_permalink( $post_id ) ); ?>"<?php echo $target ? ' target="_blank"' : ''; ?><?php echo '' !== $rel_attr ? ' rel="' . esc_attr( $rel_attr ) . '"' : ''; ?>><span class="gslider-post-title-text"><?php echo esc_html( $rendered_title ); ?></span></a>
                    <?php else : ?>
                        <span class="gslider-post-title-text"><?php echo esc_html( $rendered_title ); ?></span>
                    <?php endif; ?>
                </<?php echo esc_attr( $tag ); ?>>
            </div>
            <?php

            return (string) ob_get_clean();
        }

        /**
         * Renders the card post excerpt wrapper when enabled and non-empty.
         *
         * @since 1.2.3
         *
         * @param string $excerpt Prepared post excerpt string.
         * @param array  $context Compiled block rendering context.
         * @return string Rendered excerpt HTML or empty string.
         */
        private static function render_excerpt( string $excerpt, array $context ): string {
            if ( empty( $context['any_excerpt_enabled'] ) || empty( $excerpt ) ) {
                return '';
            }

            $tag = isset( $context['post_excerpt_html_tag'] ) ? (string) $context['post_excerpt_html_tag'] : 'p';

            return '<div class="gslider-post-carousel-excerpt-wrapper">' . "\n"
                . '    <' . esc_attr( $tag ) . ' class="gslider-post-carousel-excerpt">' . esc_html( $excerpt ) . '</' . esc_attr( $tag ) . '>' . "\n"
                . '</div>';
        }

        /**
         * Renders author avatar/name and published date metadata for the card.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Rendered meta HTML or empty string.
         */
        private static function render_meta( int $post_id, array $context ): string {
            if ( empty( $context['any_meta_enabled'] ) ) {
                return '';
            }

            $show_author       = ! empty( $context['any_author_enabled'] );
            $show_date         = ! empty( $context['any_date_enabled'] );
            $show_reading_time = ! empty( $context['show_reading_time'] );
            $show_comment      = ! empty( $context['show_comment_count'] );

            if ( ! $show_author && ! $show_date && ! $show_reading_time && ! $show_comment ) {
                return '';
            }

            $meta_parts = array();

            if ( $show_author ) {
                $author_name = get_the_author();
                if ( '' !== $author_name ) {
                    $avatar_markup = '';
                    if ( ! empty( $context['any_avatar_enabled'] ) ) {
                        $author_id  = get_the_author_meta( 'ID' );
                        $avatar_url = get_avatar_url( $author_id, array( 'size' => 96 ) );
                        if ( $avatar_url ) {
                            $avatar_markup = '<div class="gslider-post-author-avatar-wrapper"><img class="gslider-post-author-avatar" src="' . esc_url( $avatar_url ) . '" alt="' . esc_attr( $author_name ) . '" width="28" height="28" loading="lazy" /></div>';
                        } else {
                            $avatar_markup = '<div class="gslider-post-author-avatar-wrapper"><svg class="gslider-post-author-avatar-placeholder" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>';
                        }
                    }
                    $meta_parts[] = '<div class="gslider-post-author-wrapper">' . $avatar_markup . '<div class="gslider-post-author">' . esc_html( $author_name ) . '</div></div>';
                }
            }

            if ( $show_date ) {
                $date_format = isset( $context['date_format'] ) ? (string) $context['date_format'] : 'default';
                if ( 'relative' === $date_format ) {
                    $post_time = (int) get_post_time( 'U', true, $post_id );
                    $now       = (int) current_time( 'timestamp', true );
                    $formatted = sprintf(
                        /* translators: %s: Human-readable relative time difference. */
                        __( '%s ago', 'gslider-blocks' ),
                        human_time_diff( $post_time, $now )
                    );
                } else {
                    $formatted = (string) get_the_date( '', $post_id );
                }
                $iso_date     = (string) get_the_date( 'c', $post_id );
                $meta_parts[] = '<div class="gslider-post-date-wrapper"><time class="gslider-post-date" datetime="' . esc_attr( $iso_date ) . '">' . esc_html( $formatted ) . '</time></div>';
            }

            if ( $show_reading_time ) {
                $post_content = get_post_field( 'post_content', $post_id );
                $minutes      = Helper::calculate_reading_time( is_string( $post_content ) ? $post_content : '' );
                $reading_str  = sprintf(
                    /* translators: %d: Estimated reading time in minutes. */
                    _n( '%d min read', '%d min read', $minutes, 'gslider-blocks' ),
                    $minutes
                );
                $meta_parts[] = '<div class="gslider-post-reading-time-wrapper"><span class="gslider-post-reading-time">' . esc_html( $reading_str ) . '</span></div>';
            }

            if ( $show_comment ) {
                $comment_count = (int) get_comments_number( $post_id );
                $comments_text = sprintf(
                    /* translators: %s: Number of comments. */
                    _n( '%s comment', '%s comments', $comment_count, 'gslider-blocks' ),
                    number_format_i18n( $comment_count )
                );
                $comments_link = get_comments_link( $post_id );
                $icon_svg      = '<svg class="gslider-meta-icon" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
                $meta_parts[]  = '<div class="gslider-post-comments-wrapper"><span class="gslider-post-comments">' . $icon_svg . '<a class="gslider-post-comments-link" href="' . esc_url( $comments_link ) . '">' . esc_html( $comments_text ) . '</a></span></div>';
            }

            if ( empty( $meta_parts ) ) {
                return '';
            }

            $meta_sep = isset( $context['meta_separator'] ) ? (string) $context['meta_separator'] : 'bullet';
            $sep_map  = array(
                'bullet' => '•',
                'pipe'   => '|',
                'slash'  => '/',
                'dash'   => '—',
                'none'   => '',
            );
            $sep_char = isset( $sep_map[ $meta_sep ] ) ? $sep_map[ $meta_sep ] : '•';
            $sep_html = '' !== $sep_char ? '<span class="gslider-meta-sep" aria-hidden="true">' . esc_html( $sep_char ) . '</span>' : '';

            return '<div class="gslider-post-carousel-meta">' . implode( $sep_html, $meta_parts ) . '</div>';
        }

        /**
         * Renders the card Read More CTA button with sanitized URL, rel, and icon markup.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Rendered Read More HTML or empty string.
         */
        private static function render_readmore( int $post_id, array $context ): string {
            if ( empty( $context['any_read_more_button_enabled'] ) ) {
                return '';
            }

            $read_more_url = ( 'custom' === ( $context['read_more_button_link_type'] ?? 'post' ) )
                ? ( is_string( $context['read_more_button_link'] ?? null ) ? $context['read_more_button_link'] : '#' )
                : get_permalink( $post_id );

            $target   = ! empty( $context['read_more_button_target_link'] );
            $rel_attr = self::build_rel_attribute(
                $target,
                ! empty( $context['read_more_button_nofollow'] ),
                ! empty( $context['read_more_button_sponsored'] )
            );

            $icon_position            = isset( $context['read_more_button_icon_position'] ) ? (string) $context['read_more_button_icon_position'] : 'right';
            $has_read_more_svg_icon   = ! empty( $context['has_read_more_svg_icon'] );
            $has_read_more_image_icon = ! empty( $context['has_read_more_image_icon'] );
            $svg_icon_html            = isset( $context['read_more_svg_icon_html'] ) ? (string) $context['read_more_svg_icon_html'] : '';
            $img_url                  = isset( $context['read_more_button_icon_img_url'] ) ? (string) $context['read_more_button_icon_img_url'] : '';
            $img_alt                  = isset( $context['read_more_button_icon_img_alt'] ) ? (string) $context['read_more_button_icon_img_alt'] : 'Right Arrow';

            $icon_markup = '';
            if ( $has_read_more_svg_icon ) {
                $icon_markup = '<span class="gslider-readmore-icon-wrap">' . $svg_icon_html . '</span>';
            } elseif ( $has_read_more_image_icon ) {
                $icon_markup = '<span class="gslider-readmore-icon-wrap"><img src="' . esc_url( $img_url ) . '" alt="' . esc_attr( $img_alt ) . '" /></span>';
            }

            ob_start();
            ?>
            <div class="gslider-post-carousel-readmore">
                <a class="gslider-post-carousel-readmore-btn" href="<?php echo esc_url( $read_more_url ); ?>"<?php echo $target ? ' target="_blank"' : ''; ?><?php echo '' !== $rel_attr ? ' rel="' . esc_attr( $rel_attr ) . '"' : ''; ?>>
                    <?php if ( '' !== $icon_markup && 'left' === $icon_position ) : ?>
                        <?php echo $icon_markup; ?>
                    <?php endif; ?>
                    <span class="gslider-readmore-text"><?php echo esc_html( (string) $context['read_more_button_text'] ); ?></span>
                    <?php if ( '' !== $icon_markup && 'right' === $icon_position ) : ?>
                        <?php echo $icon_markup; ?>
                    <?php endif; ?>
                </a>
            </div>
            <?php

            return (string) ob_get_clean();
        }

        /**
         * Compiles the space-separated link `rel` attribute string.
         *
         * @since 1.2.3
         *
         * @param bool $target    Whether link opens in a new tab (`_blank`).
         * @param bool $nofollow  Whether `nofollow` should be included.
         * @param bool $sponsored Whether `sponsored` should be included.
         * @return string Space-separated rel tokens or empty string.
         */
        private static function build_rel_attribute( bool $target, bool $nofollow, bool $sponsored ): string {
            $rel_items = array();
            if ( $target ) {
                $rel_items[] = 'noopener';
                $rel_items[] = 'noreferrer';
            }
            if ( $nofollow ) {
                $rel_items[] = 'nofollow';
            }
            if ( $sponsored ) {
                $rel_items[] = 'sponsored';
            }

            return implode( ' ', $rel_items );
        }

        /**
         * Renders the horizontal milestone timeline node header.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Rendered timeline node HTML.
         */
        private static function render_timeline_node( int $post_id, array $context ): string {
            $date_raw       = (string) get_the_date( 'Y-m-d', $post_id );
            $date_formatted = (string) get_the_date( '', $post_id );
            $date_pos       = isset( $context['timeline_date_position'] ) && 'below' === $context['timeline_date_position'] ? 'date-position-below' : 'date-position-above';

            return '            <div class="gslider-timeline-node ' . esc_attr( $date_pos ) . '" aria-hidden="true">' . "\n"
                . '                <div class="gslider-timeline-stem"></div>' . "\n"
                . '                <div class="gslider-timeline-dot">' . "\n"
                . '                    <div class="gslider-timeline-dot-inner"></div>' . "\n"
                . '                </div>' . "\n"
                . '                <time class="gslider-timeline-date" datetime="' . esc_attr( $date_raw ) . '">' . esc_html( $date_formatted ) . '</time>' . "\n"
                . '            </div>' . "\n";
        }
    }
}
