<?php
/**
 * Title: Partner Brand Logo Carousel
 * Slug: gslider-blocks/partner-brand-logo-carousel
 * Categories: gslider-blocks, clients
 * Keywords: logo, carousel, brand, partners, clients
 * Description: Two-column logo carousel for trusted brands and client showcases, with autoplay off.
 *
 * @package GSlider_Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$gslider_patterns_base_url = defined( 'GSLIDER_PLUGIN_URL' )
	? trailingslashit( GSLIDER_PLUGIN_URL )
	: ( function_exists( 'plugins_url' ) ? trailingslashit( plugins_url( '/', dirname( __DIR__ ) . '/gslider-blocks.php' ) ) : '' );

$gslider_logo_1 = $gslider_patterns_base_url . 'assets/images/patterns/logo-1.svg';
$gslider_logo_2 = $gslider_patterns_base_url . 'assets/images/patterns/logo-2.svg';
$gslider_logo_3 = $gslider_patterns_base_url . 'assets/images/patterns/logo-3.svg';
$gslider_logo_4 = $gslider_patterns_base_url . 'assets/images/patterns/logo-4.svg';
$gslider_logo_5 = $gslider_patterns_base_url . 'assets/images/patterns/logo-5.svg';
$gslider_logo_6 = $gslider_patterns_base_url . 'assets/images/patterns/logo-6.svg';
?>
<!-- wp:gslider-blocks/logo-carousel {"logos":[{"id":101,"url":"<?php echo esc_url_raw( $gslider_logo_1 ); ?>","alt":"Acme Corp","link":"#"},{"id":102,"url":"<?php echo esc_url_raw( $gslider_logo_2 ); ?>","alt":"Pulse","link":"#"},{"id":103,"url":"<?php echo esc_url_raw( $gslider_logo_3 ); ?>","alt":"Nexus","link":"#"},{"id":104,"url":"<?php echo esc_url_raw( $gslider_logo_4 ); ?>","alt":"Apex","link":"#"},{"id":105,"url":"<?php echo esc_url_raw( $gslider_logo_5 ); ?>","alt":"Orbit","link":"#"},{"id":106,"url":"<?php echo esc_url_raw( $gslider_logo_6 ); ?>","alt":"Vortex","link":"#"}],"showPagination":{"Desktop":false,"Tablet":false,"Mobile":false}} -->
<div class="wp-block-gslider-blocks-logo-carousel gslider-logo-carousel-wrapper  inside center" data-swiper-settings="{&quot;effect&quot;:&quot;slide&quot;,&quot;breakpoints&quot;:{&quot;0&quot;:{&quot;slidesPerView&quot;:1,&quot;spaceBetween&quot;:10,&quot;speed&quot;:800,&quot;autoplay&quot;:false,&quot;navigation&quot;:{&quot;enabled&quot;:true},&quot;pagination&quot;:{&quot;enabled&quot;:false}},&quot;768&quot;:{&quot;slidesPerView&quot;:2,&quot;spaceBetween&quot;:10,&quot;speed&quot;:800,&quot;autoplay&quot;:false,&quot;navigation&quot;:{&quot;enabled&quot;:true},&quot;pagination&quot;:{&quot;enabled&quot;:false}},&quot;1025&quot;:{&quot;slidesPerView&quot;:2,&quot;spaceBetween&quot;:10,&quot;speed&quot;:800,&quot;autoplay&quot;:false,&quot;navigation&quot;:{&quot;enabled&quot;:true},&quot;pagination&quot;:{&quot;enabled&quot;:false}}},&quot;loop&quot;:true,&quot;autoplay&quot;:false,&quot;allowTouchMove&quot;:true,&quot;mousewheel&quot;:false,&quot;keyboard&quot;:false,&quot;navigation&quot;:{&quot;enabled&quot;:true,&quot;nextEl&quot;:&quot;.swiper-button-next&quot;,&quot;prevEl&quot;:&quot;.swiper-button-prev&quot;},&quot;pagination&quot;:{&quot;enabled&quot;:false,&quot;el&quot;:&quot;.swiper-pagination-logo-carousel&quot;,&quot;type&quot;:&quot;bullets&quot;,&quot;dynamicBullets&quot;:false,&quot;clickable&quot;:true}}"><div class="swiper" role="region" aria-label="Logo Carousel"><div class="swiper-wrapper"><div class="swiper-slide"><div class="gslider-logo-carousel-content-wrapper "><div class="gslider-logo-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_logo_1 ); ?>" alt="Acme Corp"/></div></div></div><div class="swiper-slide"><div class="gslider-logo-carousel-content-wrapper "><div class="gslider-logo-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_logo_2 ); ?>" alt="Pulse"/></div></div></div><div class="swiper-slide"><div class="gslider-logo-carousel-content-wrapper "><div class="gslider-logo-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_logo_3 ); ?>" alt="Nexus"/></div></div></div><div class="swiper-slide"><div class="gslider-logo-carousel-content-wrapper "><div class="gslider-logo-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_logo_4 ); ?>" alt="Apex"/></div></div></div><div class="swiper-slide"><div class="gslider-logo-carousel-content-wrapper "><div class="gslider-logo-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_logo_5 ); ?>" alt="Orbit"/></div></div></div><div class="swiper-slide"><div class="gslider-logo-carousel-content-wrapper "><div class="gslider-logo-item" data-hover-effect="none"><img src="<?php echo esc_url( $gslider_logo_6 ); ?>" alt="Vortex"/></div></div></div></div><div class="gslider-navigation-default-icon-wrapper inside center"><div class="swiper-button-prev" role="button" tabindex="0" aria-label="Previous slide"></div><div class="swiper-button-next" role="button" tabindex="0" aria-label="Next slide"></div></div></div></div>
<!-- /wp:gslider-blocks/logo-carousel -->
