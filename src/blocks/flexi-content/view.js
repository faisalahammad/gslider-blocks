/* global Swiper, requestAnimationFrame, refreshFsLightbox, DOMMatrix */
document.addEventListener( 'DOMContentLoaded', () => {
	const IMAGE_URL_PATTERN = /\.(avif|bmp|gif|jpe?g|png|svg|webp)(\?.*)?$/i;
	// Counter keeps gallery names unique when sliders are added later
	let lightboxCount = 0;

	/**
	 * Get the largest image source from srcset, fallback to src.
	 * Lazy load plugins keep the real sources in data-src and data-srcset.
	 *
	 * @param {HTMLImageElement} img - Slide image.
	 * @return {string} Image URL.
	 */
	const getLargestImageUrl = ( img ) => {
		let largest = { url: img.dataset.src || img.src, width: 0 };

		// URLs have no spaces, so each candidate is "url width", commas inside CDN URLs stay intact
		const srcset = img.dataset.srcset || img.getAttribute( 'srcset' ) || '';
		for ( const [ , url, width ] of srcset.matchAll(
			/,?(\S+)\s+(\d+)w/g
		) ) {
			if ( Number( width ) > largest.width ) {
				largest = { url, width: Number( width ) };
			}
		}

		return largest.url;
	};

	/**
	 * Get the current device, using the same breakpoints as the Swiper settings in save.js.
	 *
	 * @return {string} Desktop, Tablet or Mobile.
	 */
	const getCurrentDevice = () => {
		if ( window.innerWidth >= 1025 ) {
			return 'Desktop';
		}
		return window.innerWidth >= 768 ? 'Tablet' : 'Mobile';
	};

	// Swiper breakpoint keys from save.js
	const BREAKPOINT_DEVICES = { 0: 'Mobile', 768: 'Tablet', 1025: 'Desktop' };

	/**
	 * Check a marquee class of the slider for a device.
	 *
	 * @param {HTMLElement} sliderContainer - Slider wrapper element.
	 * @param {string}      device          - Desktop, Tablet or Mobile.
	 * @param {string}      type            - marquee or marquee-pause.
	 * @return {boolean} True when the class is set.
	 */
	const hasMarqueeClass = ( sliderContainer, device, type = 'marquee' ) =>
		sliderContainer.classList.contains(
			`gslider-${ type }-${ device.toLowerCase() }`
		);

	/**
	 * Keep marquee autoplay in sync with breakpoints and pause it on hover.
	 * Swiper hover pause waits until the slide ends, so we stop the wrapper where it is.
	 *
	 * @param {HTMLElement} sliderContainer - Slider wrapper element.
	 * @param {Object}      swiper          - Swiper instance of this slider.
	 */
	const initializeMarquee = ( sliderContainer, swiper ) => {
		let frozen = null;
		let onResumeEnd = null;

		// swiper.translate and the transform are mirrored in RTL, setTranslate mirrors again
		const getSign = () =>
			swiper.isHorizontal() && swiper.rtlTranslate ? -1 : 1;

		/**
		 * Get the current wrapper position, Swiper only knows where the slide ends.
		 *
		 * @return {number} Translate in the same form as swiper.translate.
		 */
		const getCurrentTranslate = () => {
			const { m41, m42 } = new DOMMatrix(
				window.getComputedStyle( swiper.wrapperEl ).transform
			);
			return ( swiper.isHorizontal() ? m41 : m42 ) * getSign();
		};

		// Stop a running resume transition where it is
		const cancelResume = () => {
			if ( ! onResumeEnd ) {
				return;
			}
			swiper.wrapperEl.removeEventListener(
				'transitionend',
				onResumeEnd
			);
			onResumeEnd = null;
			const current = getCurrentTranslate();
			swiper.setTransition( 0 );
			swiper.setTranslate( current );
		};

		// Autoplay is false on breakpoints without marquee or autoplay
		const startAutoplay = () => {
			if ( ! swiper.destroyed && swiper.params.autoplay ) {
				swiper.autoplay.start();
			}
		};

		// Swiper does not start or stop autoplay when the breakpoint changes
		swiper.on( 'breakpoint', () => {
			// Swiper drops the common options when it switches from autoplay false, so build them again
			const breakpointAutoplay =
				swiper.params.breakpoints?.[ swiper.currentBreakpoint ]
					?.autoplay;
			if ( breakpointAutoplay ) {
				swiper.params.autoplay = {
					...swiper.originalParams.autoplay,
					...breakpointAutoplay,
				};
			}

			if ( ! swiper.params.autoplay ) {
				swiper.autoplay.stop();
				// A normal slider should not rest between slides, finish the slide at once
				if ( frozen || onResumeEnd ) {
					const target = frozen
						? frozen.target
						: swiper.translate * getSign();
					cancelResume();
					swiper.setTransition( 0 );
					swiper.setTranslate( target );
					// The stopped transition sends no transitionend, loop mode does not slide while animating
					swiper.animating = false;
				}
				frozen = null;
			} else if ( ! swiper.autoplay.running && ! frozen ) {
				swiper.autoplay.start();
			}
		} );

		sliderContainer.addEventListener( 'pointerenter', ( event ) => {
			if (
				event.pointerType !== 'mouse' ||
				! ( swiper.autoplay.running || onResumeEnd ) ||
				! hasMarqueeClass(
					sliderContainer,
					getCurrentDevice(),
					'marquee-pause'
				)
			) {
				return;
			}

			// A pending resume already moves to the slide end, so read it first
			const target = swiper.translate * getSign();
			cancelResume();
			const current = getCurrentTranslate();
			const step =
				Math.abs( swiper.slidesGrid[ 1 ] - swiper.slidesGrid[ 0 ] ) ||
				swiper.width;

			swiper.autoplay.stop();
			swiper.setTransition( 0 );
			swiper.setTranslate( current );
			// The stopped transition sends no transitionend, loop mode does not slide while animating
			swiper.animating = false;
			frozen = {
				target,
				remaining:
					Math.min( 1, Math.abs( target - current ) / step ) *
					swiper.params.speed,
			};
		} );

		// Navigation while paused moves to a new slide, so resume from there and not the old target
		swiper.on( 'slideChangeTransitionStart', () => {
			if ( frozen ) {
				frozen = { target: swiper.translate * getSign(), remaining: 0 };
			}
		} );

		sliderContainer.addEventListener( 'pointerleave', () => {
			if ( ! frozen ) {
				return;
			}

			const { target, remaining } = frozen;
			frozen = null;

			if ( remaining < 1 ) {
				swiper.setTranslate( target );
				// Loop mode does not slide during a navigation transition, so wait for it
				if ( ! swiper.animating ) {
					startAutoplay();
					return;
				}
			}

			// Finish the stopped slide or the navigation, then autoplay goes on
			onResumeEnd = ( event ) => {
				if ( event.target !== swiper.wrapperEl ) {
					return;
				}
				swiper.wrapperEl.removeEventListener(
					'transitionend',
					onResumeEnd
				);
				onResumeEnd = null;
				startAutoplay();
			};
			swiper.wrapperEl.addEventListener( 'transitionend', onResumeEnd );
			if ( remaining >= 1 ) {
				swiper.setTransition( remaining );
				swiper.setTranslate( target );
			}
		} );
	};

	/**
	 * Bind image block images in the slides to fsLightbox.
	 * Clicks are blocked on devices where the lightbox is off.
	 *
	 * @param {HTMLElement} sliderContainer - Slider wrapper element.
	 * @param {HTMLElement} swiperElement   - Swiper element of this slider.
	 */
	const initializeSlideLightbox = ( sliderContainer, swiperElement ) => {
		const devices = sliderContainer.dataset.slideLightbox.split( ' ' );
		const group = `gslider-flexi-content-${ ++lightboxCount }`;

		sliderContainer
			.querySelectorAll( '.swiper-slide .wp-block-image img' )
			.forEach( ( img ) => {
				// Images of any nested slider belong to it, core "Expand on click" has its own lightbox
				if (
					img.closest( '.swiper' ) !== swiperElement ||
					img.closest( '[data-wp-interactive="core/image"]' )
				) {
					return;
				}

				let link = img.closest( 'a' );
				const isCreatedLink = ! link;

				if ( link ) {
					// Keep user links to pages, only reuse links to image files
					if (
						! IMAGE_URL_PATTERN.test(
							link.getAttribute( 'href' ) || ''
						)
					) {
						return;
					}
				} else {
					link = document.createElement( 'a' );
					link.href = getLargestImageUrl( img );
					// Wrap the whole picture, the img must stay its child to use the sources
					const target =
						img.parentElement.tagName === 'PICTURE'
							? img.parentElement
							: img;
					target.parentNode.insertBefore( link, target );
					link.appendChild( target );
				}

				link.setAttribute( 'data-fslightbox', group );
				// Skip the fsLightbox type check request, it fails for cross origin images
				link.setAttribute( 'data-type', 'image' );

				// Capture on the link runs after Swiper drag check on .swiper, before the fsLightbox onclick
				link.addEventListener(
					'click',
					( event ) => {
						if ( devices.includes( getCurrentDevice() ) ) {
							return;
						}

						event.stopImmediatePropagation();
						// Links added by us have no real target, existing links keep working
						if ( isCreatedLink ) {
							event.preventDefault();
						}
					},
					true
				);
			} );
	};

	/**
	 * Add a bubble that follows the mouse over the slider.
	 * Click on the left half goes to the previous slide, right half to the next one.
	 *
	 * @param {HTMLElement} sliderContainer - Slider wrapper element.
	 * @param {HTMLElement} swiperElement   - Swiper element of this slider.
	 * @param {Object}      swiper          - Swiper instance of this slider.
	 */
	const initializeCursorFollower = (
		sliderContainer,
		swiperElement,
		swiper
	) => {
		// Touch screens have no mouse to follow, keep the normal swipe there
		if ( window.matchMedia( '(pointer: coarse)' ).matches ) {
			return;
		}

		const devices = sliderContainer.dataset.cursorFollower.split( ' ' );
		// Clicks on these keep their own action, the follower hides over them
		const interactiveSelector =
			'a, button, input, select, textarea, label, summary, iframe, video, [role="button"], [role="link"], [role="tab"], [role="checkbox"], [role="switch"], [role="menuitem"], [role="option"], [role="slider"], [contenteditable]:not([contenteditable="false"]), .swiper-pagination';

		let follower = swiperElement.querySelector(
			':scope > .gslider-cursor-follower'
		);
		if ( ! follower ) {
			follower = document.createElement( 'div' );
			follower.className = 'gslider-cursor-follower';
			follower.setAttribute( 'aria-hidden', 'true' );
			swiperElement.appendChild( follower );
		}

		let pointer = null;
		let pointerType = '';
		let frame = 0;

		// Nested sliders and buttons inside slides handle the pointer themselves
		const isFreeArea = ( target ) =>
			!! target &&
			target.closest( '.swiper' ) === swiperElement &&
			! target.closest( interactiveSelector );

		const isLeftHalf = ( clientX ) => {
			const rect = swiperElement.getBoundingClientRect();
			return clientX - rect.left < rect.width / 2;
		};

		const render = () => {
			frame = 0;
			// Look up the element again, the slide under a still mouse can change
			const active =
				pointer &&
				devices.includes( getCurrentDevice() ) &&
				isFreeArea(
					document.elementFromPoint(
						pointer.clientX,
						pointer.clientY
					)
				);

			swiperElement.classList.toggle( 'gslider-cursor-active', active );
			if ( ! active ) {
				return;
			}

			const rect = swiperElement.getBoundingClientRect();
			const x = pointer.clientX - rect.left;
			follower.classList.toggle(
				'is-left',
				isLeftHalf( pointer.clientX ) !== Boolean( swiper.rtlTranslate )
			);
			follower.style.transform = `translate3d(${ x }px, ${
				pointer.clientY - rect.top
			}px, 0) translate(-50%, -50%)`;
		};

		const scheduleRender = () => {
			if ( ! frame ) {
				frame = requestAnimationFrame( render );
			}
		};

		// Touch laptops have a fine primary pointer, so check each finger or pen too
		swiperElement.addEventListener(
			'pointerdown',
			( event ) => {
				pointerType = event.pointerType;
			},
			true
		);

		swiperElement.addEventListener( 'pointermove', ( event ) => {
			pointer = event.pointerType === 'mouse' ? event : null;
			scheduleRender();
		} );

		swiperElement.addEventListener( 'pointerleave', () => {
			pointer = null;
			scheduleRender();
		} );

		swiper.on( 'slideChangeTransitionEnd', scheduleRender );

		swiperElement.addEventListener( 'click', ( event ) => {
			// allowClick is false right after a drag, the drag already moved the slide
			if (
				pointerType !== 'mouse' ||
				! swiper.allowClick ||
				! devices.includes( getCurrentDevice() ) ||
				! isFreeArea( event.target )
			) {
				return;
			}

			// In RTL the previous slide is on the right side
			if (
				isLeftHalf( event.clientX ) !== Boolean( swiper.rtlTranslate )
			) {
				swiper.slidePrev();
			} else {
				swiper.slideNext();
			}
		} );
	};

	const initializeSliders = () => {
		// Select all slider containers
		const sliders = document.querySelectorAll(
			'.gslider-flexi-content-wrapper'
		);

		// Bind and refresh before Swiper init, loop mode reorders the slides in the DOM
		const lightboxSliders = [ ...sliders ].filter( ( sliderContainer ) => {
			const swiperElement = sliderContainer.querySelector( '.swiper' );
			return (
				sliderContainer.dataset.slideLightbox &&
				swiperElement &&
				! swiperElement.classList.contains( 'swiper-initialized' )
			);
		} );
		lightboxSliders.forEach( ( sliderContainer ) =>
			initializeSlideLightbox(
				sliderContainer,
				sliderContainer.querySelector( '.swiper' )
			)
		);
		// One refresh builds the galleries of all sliders
		if (
			lightboxSliders.length &&
			typeof refreshFsLightbox === 'function'
		) {
			refreshFsLightbox();
		}

		sliders.forEach( ( sliderContainer ) => {
			try {
				const swiperElement =
					sliderContainer.querySelector( '.swiper' );
				if (
					! swiperElement ||
					swiperElement.classList.contains( 'swiper-initialized' )
				) {
					return;
				}

				// Get the Swiper settings from the data attribute
				const swiperSettings = sliderContainer.dataset.swiperSettings;

				if ( swiperSettings ) {
					const settings = JSON.parse( swiperSettings );

					// Fix for fade effect: disable initial transition to prevent right-to-left glitch on page load
					if ( settings.effect === 'fade' ) {
						const wrapper =
							swiperElement?.querySelector( '.swiper-wrapper' );
						const slides =
							swiperElement?.querySelectorAll( '.swiper-slide' );

						// Temporarily disable transition on wrapper AND all slides before Swiper initializes
						if ( wrapper ) {
							wrapper.style.transition = 'none';
						}
						if ( slides ) {
							slides.forEach( ( slide ) => {
								slide.style.transition = 'none';
							} );
						}

						// Add init callback to restore transitions after initial positioning
						settings.on = {
							...settings.on,
							init() {
								// Use requestAnimationFrame to ensure DOM has updated
								requestAnimationFrame( () => {
									requestAnimationFrame( () => {
										if ( wrapper ) {
											wrapper.style.transition = '';
										}
										if ( slides ) {
											slides.forEach( ( slide ) => {
												slide.style.transition = '';
											} );
										}
									} );
								} );
							},
						};
					}

					if (
						settings.navigation &&
						typeof settings.navigation === 'object'
					) {
						const nextEl = sliderContainer.querySelector(
							'.swiper-button-next'
						);
						const prevEl = sliderContainer.querySelector(
							'.swiper-button-prev'
						);
						if ( nextEl ) {
							settings.navigation.nextEl = nextEl;
						}
						if ( prevEl ) {
							settings.navigation.prevEl = prevEl;
						}
					}

					const hasMarquee = Object.values( BREAKPOINT_DEVICES ).some(
						( device ) => hasMarqueeClass( sliderContainer, device )
					);

					// Moving content is turned off for users who ask for less motion
					if (
						hasMarquee &&
						window.matchMedia( '(prefers-reduced-motion: reduce)' )
							.matches
					) {
						Object.entries( settings.breakpoints || {} ).forEach(
							( [ width, params ] ) => {
								if (
									hasMarqueeClass(
										sliderContainer,
										BREAKPOINT_DEVICES[ width ] || ''
									)
								) {
									// No autoplay and no long animation on navigation
									params.autoplay = false;
									params.speed = 0;
								}
							}
						);
					}

					// Initialize Swiper with parsed settings
					const swiper = new Swiper( swiperElement, settings );

					if ( sliderContainer.dataset.cursorFollower ) {
						initializeCursorFollower(
							sliderContainer,
							swiperElement,
							swiper
						);
					}

					const progressFill = swiperElement.querySelector(
						':scope > .gslider-autoplay-progress > .gslider-autoplay-progress-fill'
					);
					if ( progressFill ) {
						// Progress goes from 1 to 0 while the delay runs out
						swiper.on(
							'autoplayTimeLeft',
							( s, timeLeft, progress ) => {
								progressFill.style.transform = `scaleX(${
									1 - progress
								})`;
							}
						);
					}

					if ( hasMarquee ) {
						initializeMarquee( sliderContainer, swiper );
					}
				}
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( 'Error initializing slider:', error );
			}
		} );
	};

	// Initialize sliders on page load
	initializeSliders();

	// Re-initialize sliders when new blocks are added (useful for dynamic content)
	if ( window.wp && window.wp.hooks ) {
		window.wp.hooks.addAction( 'blocks.blockRendered', 'gslider', () => {
			initializeSliders();
		} );
	}
} );
