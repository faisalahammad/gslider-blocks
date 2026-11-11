<?php
/**
 * Post Carousel Block - Server-Side Render Bootstrap.
 *
 * Delegates attribute validation, query execution, and HTML rendering
 * to the PSR-4 `GSlider\Blocks\PostCarousel\PostCarouselRenderer` service.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content.
 * @var WP_Block $block      Block instance.
 *
 * @package GSlider\Blocks
 * @since   1.0.0
 */

use GSlider\Blocks\PostCarousel\PostCarouselRenderer;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

echo PostCarouselRenderer::render(
    isset( $attributes ) && is_array( $attributes ) ? $attributes : array(),
    isset( $content ) && is_string( $content ) ? $content : '',
    isset( $block ) ? $block : null
);
