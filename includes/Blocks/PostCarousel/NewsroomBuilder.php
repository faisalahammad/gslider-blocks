<?php
/**
 * Post Carousel Newsroom Stage Builder.
 *
 * Generates the synchronized vertical headline queue and playlist track
 * for the Newsroom Stage layout archetype (postLayoutMode: 'newsroom').
 *
 * @package GSlider\Blocks\PostCarousel
 * @since   1.2.3
 */

namespace GSlider\Blocks\PostCarousel;

use GSlider\Utils\Helper;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( NewsroomBuilder::class, false ) ) {

    /**
     * Renders Newsroom Stage headline queue tracks and items.
     *
     * @since 1.2.3
     */
    class NewsroomBuilder {

        /**
         * Calculates estimated reading time for a post in minutes.
         *
         * @since 1.2.3
         *
         * @param int $post_id Post ID.
         * @return string Formatted localized reading time string.
         */
        public static function get_reading_time( int $post_id ): string {
            $content = get_post_field( 'post_content', $post_id );
            if ( ! is_string( $content ) || '' === trim( $content ) ) {
                return get_the_date( '', $post_id );
            }

            $minutes = Helper::calculate_reading_time( $content );

            return sprintf(
                /* translators: %d: Estimated reading time in minutes. */
                _n( '%d min read', '%d min read', $minutes, 'gslider-blocks' ),
                $minutes
            );
        }

        /**
         * Renders a single headline queue item slide for the Newsroom Stage.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Post ID.
         * @param array $context Compiled block render context.
         * @param int   $index   0-based slide index.
         * @return string Rendered queue item HTML.
         */
        public static function render_queue_item( int $post_id, array $context, int $index = 0 ): string {
            $title = get_the_title( $post_id );
            if ( '' === trim( $title ) ) {
                $title = __( '(Untitled)', 'gslider-blocks' );
            }

            $active_class = 0 === $index ? ' swiper-slide-thumb-active' : '';

            // Thumbnail markup
            $thumb_html = '';
            if ( has_post_thumbnail( $post_id ) ) {
                $thumb_id   = (int) get_post_thumbnail_id( $post_id );
                $thumb_html = wp_get_attachment_image(
                    $thumb_id,
                    'thumbnail',
                    false,
                    array(
                        'alt'     => the_title_attribute( array( 'echo' => false, 'post' => $post_id ) ),
                        'loading' => 'lazy',
                    )
                );
            } elseif ( ! empty( $context['fallback_thumbnail_url'] ) ) {
                $thumb_html = sprintf(
                    '<img class="gslider-queue-fallback-img" src="%s" alt="%s" loading="lazy" />',
                    esc_url( $context['fallback_thumbnail_url'] ),
                    the_title_attribute( array( 'echo' => false, 'post' => $post_id ) )
                );
            }

            if ( '' === $thumb_html ) {
                $thumb_html = '<svg class="gslider-queue-placeholder-svg" viewBox="0 0 64 48" width="64" height="48" aria-hidden="true" focusable="false"><rect width="64" height="48" fill="#e2e8f0"/><circle cx="32" cy="24" r="8" fill="#94a3b8"/></svg>';
            }

            $meta_text = ! empty( $context['show_reading_time'] ) ? self::get_reading_time( $post_id ) : (string) get_the_date( '', $post_id );

            $output  = '            <div class="swiper-slide gslider-newsroom-queue-item' . esc_attr( $active_class ) . '" role="button" tabindex="0" data-slide-index="' . esc_attr( (string) $index ) . '">' . "\n";
            $output .= '                <div class="gslider-queue-active-indicator" aria-hidden="true"></div>' . "\n";
            $output .= '                <div class="gslider-queue-thumb">' . $thumb_html . '</div>' . "\n";
            $output .= '                <div class="gslider-queue-content">' . "\n";
            $output .= '                    <h4 class="gslider-queue-title">' . esc_html( $title ) . '</h4>' . "\n";
            $output .= '                    <span class="gslider-queue-meta">' . esc_html( $meta_text ) . '</span>' . "\n";
            $output .= '                </div>' . "\n";
            $output .= '            </div>' . "\n";

            return $output;
        }

        /**
         * Renders the complete headline queue track for the Newsroom Stage layout.
         *
         * @since 1.2.3
         *
         * @param array $post_ids Array of rendered post IDs in query order.
         * @param array $context  Compiled block render context.
         * @return string Rendered aside queue HTML string.
         */
        public static function render_queue( array $post_ids, array $context ): string {
            if ( empty( $post_ids ) ) {
                return '';
            }

            $slides_html = '';
            foreach ( $post_ids as $index => $post_id ) {
                $slides_html .= self::render_queue_item( (int) $post_id, $context, (int) $index );
            }

            $output  = '    <aside class="gslider-newsroom-queue swiper" aria-label="' . esc_attr__( 'Story Playlist', 'gslider-blocks' ) . '">' . "\n";
            $output .= '        <div class="swiper-wrapper">' . "\n";
            $output .= $slides_html;
            $output .= '        </div>' . "\n";
            $output .= '    </aside>' . "\n";

            return $output;
        }
    }
}
