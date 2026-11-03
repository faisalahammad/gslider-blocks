/* global Swiper, refreshFsLightbox */
document.addEventListener( 'DOMContentLoaded', () => {
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

	/**
	 * Block lightbox clicks on devices where the lightbox is off,
	 * and open the custom image link there when one is saved (left or middle click).
	 *
	 * @param {HTMLElement} sliderContainer - Slider wrapper element.
	 */
	const initializeLightboxDevices = ( sliderContainer ) => {
		if (
			! sliderContainer.dataset.slideLightbox ||
			sliderContainer.dataset.lightboxInitialized === 'true'
		) {
			return;
		}
		sliderContainer.dataset.lightboxInitialized = 'true';

		const devices = sliderContainer.dataset.slideLightbox.split( ' ' );

		const openImageLink = ( event ) => {
			// auxclick also fires for the right button, only handle middle click
			if ( event.type === 'auxclick' && event.button !== 1 ) {
				return;
			}

			const link = event.target.closest( '[data-fslightbox]' );
			if ( ! link || devices.includes( getCurrentDevice() ) ) {
				return;
			}

			const swiper = sliderContainer.querySelector( '.swiper' )?.swiper;
			event.stopImmediatePropagation();
			// The link points to the image file, so do not open it either
			event.preventDefault();
			if ( swiper && ! swiper.allowClick ) {
				return;
			}

			const { imageLink, imageLinkTarget, imageLinkRel } = link.dataset;
			if ( ! imageLink ) {
				return;
			}

			// data-* values skip the KSES protocol check, so never open javascript: or data: URLs
			let url;
			try {
				url = new URL( imageLink, document.baseURI );
			} catch ( error ) {
				return;
			}
			if (
				! [ 'http:', 'https:', 'mailto:', 'tel:' ].includes(
					url.protocol
				)
			) {
				return;
			}

			// Middle click and Ctrl or Cmd click open a new tab, like on a normal link
			const target =
				event.type === 'auxclick' || event.ctrlKey || event.metaKey
					? '_blank'
					: imageLinkTarget || '_self';
			// rel is case insensitive and split on any ASCII whitespace
			const rels = ( imageLinkRel || '' )
				.toLowerCase()
				.split( /[\t\n\f\r ]+/ );
			// Unlike a target="_blank" link, window.open does not imply noopener
			if ( target === '_blank' ) {
				rels.push( 'noopener' );
			}

			// window.open takes noopener and noreferrer as features, not as rel
			const features = [ 'noopener', 'noreferrer' ]
				.filter( ( rel ) => rels.includes( rel ) )
				.join( ',' );
			window.open( url.href, target, features );
		};

		// Capture on the wrapper runs before the fsLightbox onclick on the link
		sliderContainer.addEventListener( 'click', openImageLink, true );
		sliderContainer.addEventListener( 'auxclick', openImageLink, true );
	};

	const initializeSliders = () => {
		// Select all slider containers
		const sliders = document.querySelectorAll(
			'.gslider-image-slider-wrapper'
		);

		sliders.forEach( ( sliderContainer ) => {
			try {
				const swiperEl = sliderContainer.querySelector( '.swiper' );
				if (
					swiperEl &&
					! swiperEl.classList.contains( 'swiper-initialized' )
				) {
					// Get the Swiper settings from the data attribute
					const swiperSettings =
						sliderContainer.dataset.swiperSettings;

					if ( swiperSettings ) {
						const settings = JSON.parse( swiperSettings );

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

						// Resolve pagination inside this wrapper: an unscoped selector
						// matches every id-less slider of the same type on the page.
						if (
							settings.pagination &&
							typeof settings.pagination.el === 'string'
						) {
							// Content saved with an empty blockId holds ". .swiper-pagination-…".
							settings.pagination.el =
								settings.pagination.el.replace(
									/^\. (?=\.)/,
									''
								);
							const paginationEl = sliderContainer.querySelector(
								settings.pagination.el
							);
							if ( paginationEl ) {
								settings.pagination.el = paginationEl;
							}
						}

						// Initialize Swiper with parsed settings
						new Swiper( swiperEl, settings );

						// Refresh fsLightbox to detect new slides
						if ( typeof refreshFsLightbox === 'function' ) {
							refreshFsLightbox();
						}
					}
				}

				initializeLightboxDevices( sliderContainer );

				// Initialize hover effects for image links
				initializeImageLinkHoverEffects( sliderContainer );
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( 'Error initializing slider:', error );
			}
		} );
	};

	/**
	 * Initialize hover effects for image links
	 *
	 * @param {HTMLElement} container - Slider wrapper element.
	 */
	const initializeImageLinkHoverEffects = ( container ) => {
		const imageItems = container.querySelectorAll( '.gslider-image-item' );

		imageItems.forEach( ( item ) => {
			if ( item.dataset.hoverInitialized === 'true' ) {
				return;
			}
			item.dataset.hoverInitialized = 'true';

			const hoverEffect = item.dataset.hoverEffect;
			const hoverOpacity = parseFloat( item.dataset.hoverOpacity ) || 0.8;
			const hoverScale = parseFloat( item.dataset.hoverScale ) || 1.05;
			const hoverLift = parseFloat( item.dataset.hoverLift ) || 10;
			const hoverLiftUnit = item.dataset.hoverLiftUnit || 'px';

			if ( hoverEffect && hoverEffect !== 'none' ) {
				item.addEventListener( 'mouseenter', function () {
					if ( hoverEffect === 'opacity' || hoverEffect === 'both' ) {
						this.style.opacity = hoverOpacity;
					}
					if ( hoverEffect === 'scale' || hoverEffect === 'both' ) {
						this.style.transform = `scale(${ hoverScale })`;
					}
					if ( hoverEffect === 'move-up' ) {
						this.style.transform = `translateY(-${ hoverLift }${ hoverLiftUnit })`;
					}
				} );

				item.addEventListener( 'mouseleave', function () {
					this.style.opacity = 1;
					this.style.transform = 'scale(1) translateY(0)';
				} );
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
