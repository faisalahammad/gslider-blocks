/* global Swiper */
/* eslint-disable import/no-unresolved, no-console */
import {
	initEntranceAnimations,
	applyStaggerDelays,
	initCardTilt,
	applyReducedMotionSwiperSettings,
	registerReducedMotionSwiper,
	onReducedMotionChange,
} from '@Utils/animation-utils';

document.addEventListener( 'DOMContentLoaded', () => {
	/**
	 * Initialize every Post Carousel instance on the page idempotently.
	 */
	const initializeSliders = () => {
		// Select all post carousel containers
		const sliders = document.querySelectorAll(
			'.gslider-post-carousel-wrapper'
		);

		sliders.forEach( ( sliderContainer ) => {
			if ( sliderContainer.dataset.swiperInitialized === 'true' ) {
				return;
			}
			sliderContainer.dataset.swiperInitialized = 'true';

			try {
				// Get the Swiper settings from the data attribute
				const swiperSettings = sliderContainer.dataset.swiperSettings;

				if ( swiperSettings ) {
					const settings = JSON.parse( swiperSettings );

					// Disable autoplay and slide transition speed when reduced motion is requested,
					// and sync live preference changes for active instances.
					applyReducedMotionSwiperSettings( settings );

					if (
						sliderContainer.classList.contains(
							'is-layout-newsroom'
						)
					) {
						const queueElement = sliderContainer.querySelector(
							'.gslider-newsroom-queue'
						);
						const mainSliderElement = sliderContainer.querySelector(
							'.gslider-newsroom-main'
						);

						if ( mainSliderElement && queueElement ) {
							const thumbsSwiper = new Swiper( queueElement, {
								slidesPerView: 'auto',
								direction: 'horizontal',
								spaceBetween: 12,
								watchSlidesProgress: true,
								slideToClickedSlide: true,
								breakpoints: {
									768: {
										direction: 'vertical',
										slidesPerView: 4,
									},
								},
							} );

							const newsroomSettings = {
								...settings,
								slidesPerView: 1,
								breakpoints: Object.fromEntries(
									Object.entries(
										settings.breakpoints || {}
									).map( ( [ width, bp ] ) => [
										width,
										{ ...bp, slidesPerView: 1 },
									] )
								),
								watchSlidesProgress: true,
								thumbs: {
									swiper: thumbsSwiper,
								},
							};

							const mainSwiper = new Swiper(
								mainSliderElement,
								newsroomSettings
							);

							// Bind Autoplay Countdown Progress Line for Newsroom layout
							const newsroomProgressFill =
								sliderContainer.querySelector(
									'.gslider-autoplay-progress-fill'
								);
							if ( newsroomProgressFill ) {
								mainSwiper.on(
									'autoplayTimeLeft',
									( s, time, progress ) => {
										newsroomProgressFill.style.transform = `scaleX(${
											1 - progress
										})`;
									}
								);
							}

							queueElement.addEventListener( 'keydown', ( e ) => {
								const item = e.target.closest(
									'.gslider-newsroom-queue-item'
								);
								if (
									item &&
									( e.key === 'Enter' || e.key === ' ' )
								) {
									e.preventDefault();
									const index =
										parseInt(
											item.dataset.slideIndex,
											10
										) || 0;
									if ( mainSwiper.params?.loop ) {
										mainSwiper.slideToLoop( index );
									} else {
										mainSwiper.slideTo( index );
									}
								}
							} );

							onReducedMotionChange( ( reduceMotion ) => {
								if ( ! mainSliderElement.isConnected ) {
									return;
								}
								if ( reduceMotion ) {
									if (
										mainSwiper.autoplay &&
										mainSwiper.autoplay.running
									) {
										mainSwiper.autoplay.stop();
									}
									mainSwiper.params.speed = 0;
								}
							} );
						}
					} else {
						registerReducedMotionSwiper( sliderContainer, Swiper );

						// Initialize Swiper with parsed settings
						const swiper = new Swiper(
							sliderContainer.querySelector( '.swiper' ),
							settings
						);

						// Bind Autoplay Countdown Progress Line
						const progressFill = sliderContainer.querySelector(
							'.gslider-autoplay-progress-fill'
						);
						if ( progressFill && swiper ) {
							swiper.on(
								'autoplayTimeLeft',
								( s, time, progress ) => {
									progressFill.style.transform = `scaleX(${
										1 - progress
									})`;
								}
							);
						}
					}
				}
			} catch ( error ) {
				delete sliderContainer.dataset.swiperInitialized;
				console.error(
					'Error initializing post carousel slider:',
					error
				);
			}

			// Initialize animations (stagger BEFORE entrance so delays stack)
			applyStaggerDelays( sliderContainer );
			initEntranceAnimations( sliderContainer );
			initCardTilt( sliderContainer );
		} );
	};

	// Initialize sliders on page load
	initializeSliders();
} );
