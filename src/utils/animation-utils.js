/* global IntersectionObserver */
/* eslint-disable jsdoc/require-returns-description, jsdoc/empty-tags */
/**
 * Animation Utils — Reusable Frontend JavaScript
 *
 * Import this in any block's view.js to enable animations.
 *
 * @example
 * import { initEntranceAnimations, initCardTilt, applyStaggerDelays } from '@Utils/animation-utils';
 *
 * document.querySelectorAll('.my-wrapper').forEach( wrapper => {
 *     initEntranceAnimations( wrapper );
 *     applyStaggerDelays( wrapper );
 *     initCardTilt( wrapper );
 * });
 *
 * @package
 */

/**
 * Check whether the user has requested reduced motion in system/browser settings.
 *
 * @return {boolean} True when prefers-reduced-motion: reduce matches.
 */
export function prefersReducedMotion() {
	return (
		typeof window !== 'undefined' &&
		typeof window.matchMedia === 'function' &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
	);
}

/**
 * Subscribe to changes in the user's reduced-motion preference.
 *
 * @param {Function} callback Invoked with the updated reduced-motion boolean.
 * @return {Function} Unsubscribe cleanup callback.
 */
export function onReducedMotionChange( callback ) {
	if (
		typeof window === 'undefined' ||
		typeof window.matchMedia !== 'function' ||
		typeof callback !== 'function'
	) {
		return () => {};
	}

	const mediaQuery = window.matchMedia( '(prefers-reduced-motion: reduce)' );
	const handleChange = ( event ) => callback( Boolean( event.matches ) );

	if ( typeof mediaQuery.addEventListener === 'function' ) {
		mediaQuery.addEventListener( 'change', handleChange );
		return () => mediaQuery.removeEventListener( 'change', handleChange );
	}

	if ( typeof mediaQuery.addListener === 'function' ) {
		mediaQuery.addListener( handleChange );
		return () => mediaQuery.removeListener( handleChange );
	}

	return () => {};
}

/**
 * Apply reduced-motion overrides to a Swiper settings object before init.
 *
 * @param {Object} settings Mutable Swiper configuration object.
 */
export function applyReducedMotionSwiperSettings( settings ) {
	if ( ! settings || ! prefersReducedMotion() ) {
		return;
	}

	settings.autoplay = false;
	settings.speed = 0;
	if ( settings.breakpoints ) {
		Object.values( settings.breakpoints ).forEach( ( bpSettings ) => {
			bpSettings.autoplay = false;
			bpSettings.speed = 0;
		} );
	}
}

const trackedReducedMotionSliders = new Map();
let isReducedMotionListenerBound = false;

/**
 * Register a frontend carousel container so live prefers-reduced-motion changes
 * stop or restore active Swiper instances without requiring a reload.
 *
 * @param {HTMLElement} sliderContainer Carousel wrapper element.
 * @param {Function}    SwiperClass     Global Swiper constructor.
 */
export function registerReducedMotionSwiper( sliderContainer, SwiperClass ) {
	if ( ! sliderContainer || ! SwiperClass ) {
		return;
	}

	trackedReducedMotionSliders.set( sliderContainer, SwiperClass );

	if ( isReducedMotionListenerBound ) {
		return;
	}

	isReducedMotionListenerBound = true;
	onReducedMotionChange( ( reduceMotion ) => {
		trackedReducedMotionSliders.forEach( ( Ctor, container ) => {
			if ( ! container.isConnected ) {
				trackedReducedMotionSliders.delete( container );
				return;
			}

			const swiperEl = container.querySelector( '.swiper' );
			const swiper = swiperEl && swiperEl.swiper;
			if ( ! swiper || swiper.destroyed ) {
				return;
			}

			if ( reduceMotion ) {
				if ( swiper.autoplay && swiper.autoplay.running ) {
					swiper.autoplay.stop();
				}
				swiper.params.speed = 0;
				if (
					swiper.params.autoplay &&
					typeof swiper.params.autoplay === 'object'
				) {
					swiper.params.autoplay = {
						...swiper.params.autoplay,
						enabled: false,
					};
				} else {
					swiper.params.autoplay = false;
				}
				if ( swiper.params.breakpoints ) {
					Object.values( swiper.params.breakpoints ).forEach(
						( bpSettings ) => {
							bpSettings.autoplay = false;
							bpSettings.speed = 0;
						}
					);
				}
				swiper.update();
				return;
			}

			const rawSettings = container.dataset.swiperSettings;
			if ( ! rawSettings ) {
				return;
			}

			let restoredSettings;
			try {
				restoredSettings = JSON.parse( rawSettings );
			} catch ( e ) {
				// Ignore malformed serialized settings on dynamic media-query change.
				return;
			}

			const activeIndex = swiper.params.loop
				? swiper.realIndex
				: swiper.activeIndex;
			swiper.destroy( true, true );
			const nextSwiper = new Ctor( swiperEl, restoredSettings );
			if ( typeof activeIndex === 'number' && activeIndex > 0 ) {
				if ( nextSwiper.params.loop ) {
					nextSwiper.slideToLoop( activeIndex, 0, false );
				} else {
					nextSwiper.slideTo( activeIndex, 0, false );
				}
			}
		} );
	} );
}

/**
 * Get the current breakpoint key based on window width.
 * Matches WordPress editor breakpoints: Tablet ≤ 1024, Mobile ≤ 768.
 *
 * @return {'Desktop'|'Tablet'|'Mobile'}
 */
function getCurrentBreakpoint() {
	const width = window.innerWidth;
	if ( width <= 767 ) {
		return 'Mobile';
	}
	if ( width <= 1024 ) {
		return 'Tablet';
	}
	return 'Desktop';
}

/**
 * Resolve a responsive value that may be a plain number OR a
 * { Desktop, Tablet, Mobile } object.  Falls back to `fallback`.
 *
 * @param {number|object} value    Raw parsed JSON value.
 * @param {number}        fallback Default if unresolvable.
 * @return {number}
 */
function resolveResponsive( value, fallback ) {
	if ( value === null || value === undefined ) {
		return fallback;
	}
	if ( typeof value === 'object' ) {
		const bp = getCurrentBreakpoint();
		// Walk up breakpoints if current is not set
		if ( bp === 'Mobile' ) {
			return parseFloat(
				value.Mobile ?? value.Tablet ?? value.Desktop ?? fallback
			);
		}
		if ( bp === 'Tablet' ) {
			return parseFloat( value.Tablet ?? value.Desktop ?? fallback );
		}
		return parseFloat( value.Desktop ?? fallback );
	}
	return parseFloat( value ) || fallback;
}

/**
 * Initialize scroll-triggered entrance animations using IntersectionObserver.
 *
 * Reads config from wrapper's data-animation-settings JSON attribute:
 *  - duration  {number|object} ms — animation duration (responsive)
 *  - delay     {number|object} ms — base delay before animation (responsive)
 *  - offset    {number|object} %  — how far into viewport to trigger (responsive)
 *  - easing    {string}            — CSS timing function
 *
 * @param {HTMLElement} wrapper The block wrapper element.
 */
export function initEntranceAnimations( wrapper ) {
	if ( prefersReducedMotion() ) {
		return;
	}

	const cards = wrapper.querySelectorAll( '.gslider-has-entrance-anim' );
	if ( ! cards.length ) {
		return;
	}

	let settings = {};
	try {
		const raw = wrapper.dataset.animationSettings;
		if ( raw ) {
			settings = JSON.parse( raw );
		}
	} catch ( e ) {}

	const duration = resolveResponsive( settings.duration, 600 );
	const delay = resolveResponsive( settings.delay, 0 );
	const offset =
		Math.min(
			Math.max( resolveResponsive( settings.offset, 15 ), 0 ),
			50
		) / 100;
	const easing = settings.easing || 'ease-out';

	cards.forEach( ( card ) => {
		// Set custom duration & easing via CSS variable
		card.style.setProperty( '--animate-duration', duration + 'ms' );
		card.style.animationTimingFunction = easing;
		if ( delay > 0 ) {
			const current = parseFloat( card.style.animationDelay ) || 0;
			card.style.animationDelay = current + delay + 'ms';
		}
		// Hide until animation triggers (prevent FOUC)
		card.style.visibility = 'hidden';
	} );

	const observer = new IntersectionObserver(
		( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					entry.target.style.visibility = 'visible';
					observer.unobserve( entry.target ); // fire-and-forget
				}
			} );
		},
		{ threshold: offset }
	);

	cards.forEach( ( card ) => observer.observe( card ) );
}

/**
 * Apply staggered animation delays to cards.
 * Call this BEFORE initEntranceAnimations so delays stack correctly.
 *
 * Reads from wrapper's data-stagger-delay attribute (number or JSON object in ms).
 *
 * @param {HTMLElement} wrapper The block wrapper element.
 */
export function applyStaggerDelays( wrapper ) {
	if ( prefersReducedMotion() || wrapper.dataset.staggerEnabled !== '1' ) {
		return;
	}

	const rawDelay = wrapper.dataset.staggerDelay;
	let staggerMs;
	try {
		const parsed = JSON.parse( rawDelay );
		staggerMs = resolveResponsive( parsed, 100 );
	} catch ( e ) {
		staggerMs = parseInt( rawDelay ) || 100;
	}

	const cards = wrapper.querySelectorAll( '.gslider-has-entrance-anim' );

	cards.forEach( ( card, index ) => {
		const current = parseFloat( card.style.animationDelay ) || 0;
		card.style.animationDelay = current + index * staggerMs + 'ms';
	} );
}

/**
 * Initialize 3D tilt effect on hover.
 * Reads responsive values from wrapper's data-tilt-* attributes.
 * Automatically re-evaluates on window resize to match breakpoint.
 *
 * @param {HTMLElement} wrapper The block wrapper element.
 */
export function initCardTilt( wrapper ) {
	if ( prefersReducedMotion() ) {
		return;
	}

	const cards = wrapper.querySelectorAll( '.gslider-has-tilt' );
	if ( ! cards.length ) {
		return;
	}

	function getTiltSettings() {
		let maxAngle, perspective, scale, speed;
		try {
			maxAngle = resolveResponsive(
				JSON.parse( wrapper.dataset.tiltMax ),
				12
			);
			perspective = resolveResponsive(
				JSON.parse( wrapper.dataset.tiltPerspective ),
				800
			);
			scale = resolveResponsive(
				JSON.parse( wrapper.dataset.tiltScale ),
				1.02
			);
			speed = resolveResponsive(
				JSON.parse( wrapper.dataset.tiltSpeed ),
				400
			);
		} catch ( e ) {
			maxAngle = parseFloat( wrapper.dataset.tiltMax ) || 12;
			perspective = parseFloat( wrapper.dataset.tiltPerspective ) || 800;
			scale = parseFloat( wrapper.dataset.tiltScale ) || 1.02;
			speed = parseInt( wrapper.dataset.tiltSpeed ) || 400;
		}
		return { maxAngle, perspective, scale, speed };
	}

	cards.forEach( ( card ) => {
		card.style.transformStyle = 'preserve-3d';
		card.style.willChange = 'transform';

		let rect = null;

		const updateRect = () => {
			rect = card.getBoundingClientRect();
		};

		card.addEventListener( 'mouseenter', updateRect );
		window.addEventListener( 'resize', updateRect );

		card.addEventListener( 'mousemove', ( e ) => {
			if ( prefersReducedMotion() ) {
				card.style.transform = '';
				return;
			}
			const { maxAngle, perspective, scale, speed } = getTiltSettings();
			card.style.transition = `transform ${ speed }ms ease`;

			if ( ! rect ) {
				rect = card.getBoundingClientRect();
			}
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			const rotateX = ( ( y - centerY ) / centerY ) * -maxAngle;
			const rotateY = ( ( x - centerX ) / centerX ) * maxAngle;

			card.style.transform = `perspective(${ perspective }px) rotateX(${ rotateX }deg) rotateY(${ rotateY }deg) scale3d(${ scale },${ scale },${ scale })`;
		} );

		card.addEventListener( 'mouseleave', () => {
			if ( prefersReducedMotion() ) {
				card.style.transform = '';
				return;
			}
			const { perspective, speed } = getTiltSettings();
			card.style.transition = `transform ${ speed }ms ease`;
			card.style.transform = `perspective(${ perspective }px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
		} );
	} );
}
