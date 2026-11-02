<?php
/**
 * Title: Full-Width Hero Slider
 * Slug: gslider-blocks/full-width-hero-slider
 * Categories: gslider-blocks, header, featured
 * Keywords: slider, hero, carousel, banner, image
 * Description: High-impact full-width slider with responsive layout, auto-play, navigation arrows, and bullet pagination.
 *
 * @package GSlider_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$gslider_patterns_base_url = defined( 'GSLIDER_PLUGIN_URL' )
	? trailingslashit( GSLIDER_PLUGIN_URL )
	: ( function_exists( 'plugins_url' ) ? trailingslashit( plugins_url( '/', dirname( __DIR__ ) . '/gslider-blocks.php' ) ) : '' );

$gslider_hero_1 = $gslider_patterns_base_url . 'assets/images/patterns/hero-slide-1.svg';
$gslider_hero_2 = $gslider_patterns_base_url . 'assets/images/patterns/hero-slide-2.svg';
$gslider_hero_3 = $gslider_patterns_base_url . 'assets/images/patterns/hero-slide-3.svg';
$gslider_hero_4 = $gslider_patterns_base_url . 'assets/images/patterns/hero-slide-4.svg';
?>
<!-- wp:gslider-blocks/image-slider {"images":[{"id":1,"url":"<?php echo esc_url_raw( $gslider_hero_1 ); ?>","alt":"Digital Transformation Banner","caption":"Build Modern Digital Experiences","link":"#get-started"},{"id":2,"url":"<?php echo esc_url_raw( $gslider_hero_2 ); ?>","alt":"Creative Architecture","caption":"Design Without Limitations","link":"#explore"},{"id":3,"url":"<?php echo esc_url_raw( $gslider_hero_3 ); ?>","alt":"Tropical Paradise Coast","caption":"Discover Inspiring Destinations","link":"#discover"},{"id":4,"url":"<?php echo esc_url_raw( $gslider_hero_4 ); ?>","alt":"Future Technology \u0026 Space","caption":"Empowering Next-Gen Innovation","link":"#innovate"}],"autoplay":true,"autoplayDelay":{"Desktop":4000,"Tablet":4000,"Mobile":4000}} -->
<div class="wp-block-gslider-blocks-image-slider gslider-image-slider-wrapper  inside center has-pagination" data-swiper-settings="{&quot;effect&quot;:&quot;slide&quot;,&quot;breakpoints&quot;:{&quot;0&quot;:{&quot;slidesPerView&quot;:1,&quot;spaceBetween&quot;:0,&quot;speed&quot;:800,&quot;autoplay&quot;:{&quot;delay&quot;:4000},&quot;navigation&quot;:{&quot;enabled&quot;:true},&quot;pagination&quot;:{&quot;enabled&quot;:true}},&quot;768&quot;:{&quot;slidesPerView&quot;:1,&quot;spaceBetween&quot;:0,&quot;speed&quot;:800,&quot;autoplay&quot;:{&quot;delay&quot;:4000},&quot;navigation&quot;:{&quot;enabled&quot;:true},&quot;pagination&quot;:{&quot;enabled&quot;:true}},&quot;1025&quot;:{&quot;slidesPerView&quot;:1,&quot;spaceBetween&quot;:0,&quot;speed&quot;:800,&quot;autoplay&quot;:{&quot;delay&quot;:4000},&quot;navigation&quot;:{&quot;enabled&quot;:true},&quot;pagination&quot;:{&quot;enabled&quot;:true}}},&quot;loop&quot;:true,&quot;autoplay&quot;:{&quot;pauseOnMouseEnter&quot;:false,&quot;disableOnInteraction&quot;:false,&quot;stopOnLastSlide&quot;:false,&quot;reverseDirection&quot;:false},&quot;allowTouchMove&quot;:true,&quot;mousewheel&quot;:false,&quot;keyboard&quot;:false,&quot;navigation&quot;:{&quot;enabled&quot;:true,&quot;nextEl&quot;:&quot;.swiper-button-next&quot;,&quot;prevEl&quot;:&quot;.swiper-button-prev&quot;},&quot;pagination&quot;:{&quot;enabled&quot;:true,&quot;el&quot;:&quot;.swiper-pagination-image-slider&quot;,&quot;type&quot;:&quot;bullets&quot;,&quot;dynamicBullets&quot;:false,&quot;clickable&quot;:true}}"><div class="swiper" role="region" aria-label="Image Slider"><div class="swiper-wrapper"><div class="swiper-slide"><div class="gslider-image-slider-content-wrapper "><div class="gslider-image-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_hero_1 ); ?>" alt="Digital Transformation Banner"/></div></div></div><div class="swiper-slide"><div class="gslider-image-slider-content-wrapper "><div class="gslider-image-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_hero_2 ); ?>" alt="Creative Architecture"/></div></div></div><div class="swiper-slide"><div class="gslider-image-slider-content-wrapper "><div class="gslider-image-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_hero_3 ); ?>" alt="Tropical Paradise Coast"/></div></div></div><div class="swiper-slide"><div class="gslider-image-slider-content-wrapper "><div class="gslider-image-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_hero_4 ); ?>" alt="Future Technology &amp; Space"/></div></div></div></div><div class="gslider-navigation-default-icon-wrapper inside center"><div class="swiper-button-prev" role="button" tabindex="0" aria-label="Previous slide"></div><div class="swiper-button-next" role="button" tabindex="0" aria-label="Next slide"></div></div></div><div class="swiper-pagination swiper-pagination-image-slider" aria-label="Carousel pagination"></div></div>
<!-- /wp:gslider-blocks/image-slider -->
