<?php
/**
 * Post Carousel Navigation & Pagination Builder.
 *
 * Renders accessible Swiper navigation arrows and pagination containers
 * for both inside and outside carousel placements.
 *
 * @package GSlider\Blocks\PostCarousel
 * @since   1.2.3
 */

namespace GSlider\Blocks\PostCarousel;

use GSlider\Classes\SupportSVG;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( NavigationBuilder::class, false ) ) {

    /**
     * Builds navigation arrows and pagination markup for Post Carousel blocks.
     *
     * @since 1.2.3
     */
    class NavigationBuilder {

        /**
         * Renders prev/next navigation controls for the specified placement slot.
         *
         * @since 1.2.3
         *
         * @param string $position Target placement slot ('inside' or 'outside').
         * @param array  $config   Normalized navigation configuration.
         * @return string Rendered HTML markup, or empty string when disabled/not matched.
         */
        public static function render_navigation( string $position, array $config ): string {
            if ( empty( $config['enabled'] ) || ( $config['position_type'] ?? 'outside' ) !== $position ) {
                return '';
            }

            $use_custom_icons    = ! empty( $config['use_custom_icons'] );
            $nav_container_class = $use_custom_icons
                ? 'gslider-navigation-custom-icon-wrapper'
                : 'gslider-navigation-default-icon-wrapper';
            $arrow_position      = isset( $config['arrow_position'] ) ? (string) $config['arrow_position'] : 'center';
            $container_class     = $nav_container_class . ' ' . $position . ' ' . $arrow_position;

            $prev_markup = self::render_arrow_button(
                'swiper-button-prev',
                __( 'Previous slide', 'gslider-blocks' ),
                isset( $config['left'] ) && is_array( $config['left'] ) ? $config['left'] : array(),
                $use_custom_icons
            );
            $next_markup = self::render_arrow_button(
                'swiper-button-next',
                __( 'Next slide', 'gslider-blocks' ),
                isset( $config['right'] ) && is_array( $config['right'] ) ? $config['right'] : array(),
                $use_custom_icons
            );

            return '<div class="' . esc_attr( $container_class ) . '">' . "\n"
                . '    ' . $prev_markup . "\n"
                . '    ' . $next_markup . "\n"
                . '</div>';
        }

        /**
         * Renders the Swiper pagination element for the specified placement slot.
         *
         * @since 1.2.3
         *
         * @param string $position                 Target placement slot ('inside' or 'outside').
         * @param string $block_id                 Sanitized unique block identifier.
         * @param bool   $enabled                  Whether pagination is enabled on any breakpoint.
         * @param string $pagination_position_type Configured pagination placement ('inside' or 'outside').
         * @return string Rendered HTML markup, or empty string when disabled/not matched.
         */
        public static function render_pagination( string $position, string $block_id, bool $enabled, string $pagination_position_type ): string {
            if ( ! $enabled || $pagination_position_type !== $position ) {
                return '';
            }

            $class = 'swiper-pagination swiper-pagination-post-carousel';
            if ( 'outside' === $position ) {
                $class .= ' swiper-pagination-' . $block_id;
            }

            return '<div class="' . esc_attr( $class ) . '" aria-label="' . esc_attr( __( 'Carousel pagination', 'gslider-blocks' ) ) . '"></div>';
        }

        /**
         * Renders a single previous/next arrow control button with optional custom SVG or image icon.
         *
         * @since 1.2.3
         *
         * @param string $direction_class  Button class ('swiper-button-prev' or 'swiper-button-next').
         * @param string $aria_label       Accessible button label.
         * @param array  $arrow_config     Custom icon alignment, SVG HTML, image URL, and alt text.
         * @param bool   $use_custom_icons Whether custom arrow icons are enabled.
         * @return string Rendered arrow button HTML.
         */
        private static function render_arrow_button( string $direction_class, string $aria_label, array $arrow_config, bool $use_custom_icons ): string {
            $inner_html = '';

            if ( $use_custom_icons ) {
                $align     = isset( $arrow_config['align'] ) ? (string) $arrow_config['align'] : 'icon';
                $html      = isset( $arrow_config['html'] ) ? (string) $arrow_config['html'] : '';
                $image_url = isset( $arrow_config['image_url'] ) ? (string) $arrow_config['image_url'] : '';
                $image_alt = isset( $arrow_config['image_alt'] ) ? (string) $arrow_config['image_alt'] : '';

                if ( 'icon' === $align && '' !== $html ) {
                    $inner_html = SupportSVG::sanitize_inline_svg( $html );
                } elseif ( 'image' === $align && '' !== $image_url ) {
                    $inner_html = '<img src="' . esc_url( $image_url ) . '" alt="' . esc_attr( $image_alt ) . '" />';
                }
            }

            return '<div class="' . esc_attr( $direction_class ) . '" role="button" tabindex="0" aria-label="' . esc_attr( $aria_label ) . '">'
                . $inner_html
                . '</div>';
        }
    }
}
