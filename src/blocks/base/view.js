/* global Swiper */
document.addEventListener( 'DOMContentLoaded', () => {
	const initializeSliders = () => {
		// Select all slider containers
		const sliders = document.querySelectorAll( '.gslider-base-wrapper' );

		sliders.forEach( ( sliderContainer ) => {
			try {
				const swiperEl = sliderContainer.querySelector( '.swiper' );
				if (
					! swiperEl ||
					swiperEl.classList.contains( 'swiper-initialized' )
				) {
					return;
				}

				// Get the Swiper settings from the data attribute
				const swiperSettings = sliderContainer.dataset.swiperSettings;

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
						settings.pagination.el = settings.pagination.el.replace(
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
