<?php
/**
 * Title: E-commerce Product Showcase Carousel
 * Slug: gslider-blocks/product-showcase-carousel
 * Categories: gslider-blocks, gallery
 * Keywords: product, ecommerce, shop, carousel, slider
 * Description: Responsive 3-column card carousel with space between items and navigation controls.
 *
 * @package GSlider_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$gslider_patterns_base_url = defined( 'GSLIDER_PLUGIN_URL' )
	? trailingslashit( GSLIDER_PLUGIN_URL )
	: ( function_exists( 'plugins_url' ) ? trailingslashit( plugins_url( '/', dirname( __DIR__ ) . '/gslider-blocks.php' ) ) : '' );

$gslider_product_1 = $gslider_patterns_base_url . 'assets/images/patterns/product-1.svg';
$gslider_product_2 = $gslider_patterns_base_url . 'assets/images/patterns/product-2.svg';
$gslider_product_3 = $gslider_patterns_base_url . 'assets/images/patterns/product-3.svg';
$gslider_product_4 = $gslider_patterns_base_url . 'assets/images/patterns/product-4.svg';
$gslider_product_5 = $gslider_patterns_base_url . 'assets/images/patterns/product-5.svg';
$gslider_product_6 = $gslider_patterns_base_url . 'assets/images/patterns/product-6.svg';
?>
<!-- wp:gslider-blocks/image-slider {"images":[{"id":11,"url":"<?php echo esc_url_raw( $gslider_product_1 ); ?>","alt":"Wireless Headphones","caption":"Studio Headphones","link":"#shop"},{"id":12,"url":"<?php echo esc_url_raw( $gslider_product_2 ); ?>","alt":"Minimalist Watch","caption":"Chronograph Classic","link":"#shop"},{"id":13,"url":"<?php echo esc_url_raw( $gslider_product_3 ); ?>","alt":"Action Camera","caption":"Action Camera 4K","link":"#shop"},{"id":14,"url":"<?php echo esc_url_raw( $gslider_product_4 ); ?>","alt":"Luxury Fragrance","caption":"Luxury Fragrance","link":"#shop"},{"id":15,"url":"<?php echo esc_url_raw( $gslider_product_5 ); ?>","alt":"Polarized Sunglasses","caption":"Polarized Sunglasses","link":"#shop"},{"id":16,"url":"<?php echo esc_url_raw( $gslider_product_6 ); ?>","alt":"Wireless Speaker","caption":"Wireless Speaker","link":"#shop"}],"carouselPerColumn":{"Desktop":3,"Tablet":2,"Mobile":1},"carouselPerColumnGap":{"Desktop":20,"Tablet":15,"Mobile":10},"speed":{"Desktop":700,"Tablet":700,"Mobile":700},"showPagination":{"Desktop":true,"Tablet":true,"Mobile":false}} -->
<div class="wp-block-gslider-blocks-image-slider gslider-image-slider-wrapper  inside center has-pagination" data-swiper-settings="{&quot;effect&quot;:&quot;slide&quot;,&quot;breakpoints&quot;:{&quot;0&quot;:{&quot;slidesPerView&quot;:1,&quot;spaceBetween&quot;:10,&quot;speed&quot;:700,&quot;autoplay&quot;:false,&quot;navigation&quot;:{&quot;enabled&quot;:true},&quot;pagination&quot;:{&quot;enabled&quot;:false}},&quot;768&quot;:{&quot;slidesPerView&quot;:2,&quot;spaceBetween&quot;:15,&quot;speed&quot;:700,&quot;autoplay&quot;:false,&quot;navigation&quot;:{&quot;enabled&quot;:true},&quot;pagination&quot;:{&quot;enabled&quot;:true}},&quot;1025&quot;:{&quot;slidesPerView&quot;:3,&quot;spaceBetween&quot;:20,&quot;speed&quot;:700,&quot;autoplay&quot;:false,&quot;navigation&quot;:{&quot;enabled&quot;:true},&quot;pagination&quot;:{&quot;enabled&quot;:true}}},&quot;loop&quot;:true,&quot;autoplay&quot;:false,&quot;allowTouchMove&quot;:true,&quot;mousewheel&quot;:false,&quot;keyboard&quot;:false,&quot;navigation&quot;:{&quot;enabled&quot;:true,&quot;nextEl&quot;:&quot;.swiper-button-next&quot;,&quot;prevEl&quot;:&quot;.swiper-button-prev&quot;},&quot;pagination&quot;:{&quot;enabled&quot;:true,&quot;el&quot;:&quot;.swiper-pagination-image-slider&quot;,&quot;type&quot;:&quot;bullets&quot;,&quot;dynamicBullets&quot;:false,&quot;clickable&quot;:true}}"><div class="swiper" role="region" aria-label="Image Slider"><div class="swiper-wrapper"><div class="swiper-slide"><div class="gslider-image-slider-content-wrapper "><div class="gslider-image-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_product_1 ); ?>" alt="Wireless Headphones"/></div></div></div><div class="swiper-slide"><div class="gslider-image-slider-content-wrapper "><div class="gslider-image-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_product_2 ); ?>" alt="Minimalist Watch"/></div></div></div><div class="swiper-slide"><div class="gslider-image-slider-content-wrapper "><div class="gslider-image-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_product_3 ); ?>" alt="Action Camera"/></div></div></div><div class="swiper-slide"><div class="gslider-image-slider-content-wrapper "><div class="gslider-image-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_product_4 ); ?>" alt="Luxury Fragrance"/></div></div></div><div class="swiper-slide"><div class="gslider-image-slider-content-wrapper "><div class="gslider-image-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_product_5 ); ?>" alt="Polarized Sunglasses"/></div></div></div><div class="swiper-slide"><div class="gslider-image-slider-content-wrapper "><div class="gslider-image-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_product_6 ); ?>" alt="Wireless Speaker"/></div></div></div></div><div class="gslider-navigation-default-icon-wrapper inside center"><div class="swiper-button-prev" role="button" tabindex="0" aria-label="Previous slide"></div><div class="swiper-button-next" role="button" tabindex="0" aria-label="Next slide"></div></div></div><div class="swiper-pagination swiper-pagination-image-slider" aria-label="Carousel pagination"></div></div>
<!-- /wp:gslider-blocks/image-slider -->
