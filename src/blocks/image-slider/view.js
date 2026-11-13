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

	// Privacy friendly players, the ID pattern blocks unsafe values in the iframe src
	const EMBED_VIDEOS = {
		youtube: {
			idPattern: /^[\w-]{11}$/,
			getSrc: ( id ) => {
				const origin =
					window.location.origin && window.location.origin !== 'null'
						? `&origin=${ encodeURIComponent(
								window.location.origin
						  ) }`
						: '';
				return `https://www.youtube-nocookie.com/embed/${ id }?enablejsapi=1&autoplay=1&rel=0${ origin }`;
			},
			title: 'YouTube video player',
			origin: 'https://www.youtube-nocookie.com',
			pauseMessage: { event: 'command', func: 'pauseVideo', args: '' },
		},
		vimeo: {
			// Unlisted videos keep their privacy hash as "id/hash"
			idPattern: /^\d+(\/[\da-f]+)?$/,
			getSrc: ( id ) => {
				const [ videoId, hash ] = id.split( '/' );
				return `https://player.vimeo.com/video/${ videoId }?${
					hash ? `h=${ hash }&` : ''
				}dnt=1&autoplay=1`;
			},
			title: 'Vimeo video player',
			origin: 'https://player.vimeo.com',
			pauseMessage: { method: 'pause' },
		},
	};

	/**
	 * Pause the embed videos on slides that left the view, players load only after a play click.
	 *
	 * @param {Object} swiper - Swiper instance of this slider.
	 * @return {boolean} True when a started video is still in view.
	 */
	const pauseEmbedVideos = ( swiper ) => {
		const visibleCount = swiper.slidesPerViewDynamic();
		let hasVisibleVideo = false;

		swiper.slides.forEach( ( slide, index ) => {
			// Carousel mode shows more than one slide, keep those playing
			if (
				index >= swiper.activeIndex &&
				index < swiper.activeIndex + visibleCount
			) {
				if ( slide.querySelector( '.gslider-embed-video iframe' ) ) {
					hasVisibleVideo = true;
				}
				return;
			}

			slide
				.querySelectorAll( '.gslider-embed-video iframe' )
				.forEach( ( iframe ) => {
					// A player can not take a pause command until it has loaded and answered, so remove it and restore facade
					if ( ! iframe.dataset.loaded || ! iframe.dataset.ready ) {
						const box = iframe.parentElement;
						const playBtn = box?.querySelector(
							'.gslider-embed-video-play'
						);
						const posterEl = box?.querySelector(
							'.gslider-embed-video-poster'
						);
						if ( playBtn ) {
							playBtn.hidden = false;
						}
						if ( posterEl ) {
							posterEl.hidden = false;
						}
						iframe.remove();
						return;
					}

					const embed =
						EMBED_VIDEOS[ iframe.parentElement.dataset.embedType ];
					iframe.contentWindow?.postMessage(
						JSON.stringify( embed.pauseMessage ),
						embed.origin
					);
				} );
		} );

		return hasVisibleVideo;
	};

	// Blocked or failed embeds fire load too, so a pending player gets a bounded wake timeout
	const embedWakeTimers = new WeakMap();

	// A player is marked ready only after it answers, so no command is lost on an unstarted iframe
	window.addEventListener( 'message', ( event ) => {
		document
			.querySelectorAll( '.gslider-embed-video iframe[data-pending]' )
			.forEach( ( iframe ) => {
				if ( iframe.contentWindow !== event.source ) {
					return;
				}
				const embed =
					EMBED_VIDEOS[ iframe.parentElement.dataset.embedType ];
				if ( ! embed || event.origin !== embed.origin ) {
					return;
				}
				// Providers post JSON strings, some also send plain objects
				let data = event.data;
				if ( typeof data === 'string' ) {
					try {
						data = JSON.parse( data );
					} catch ( error ) {
						return;
					}
				}
				if ( ! data || typeof data !== 'object' ) {
					return;
				}
				// YouTube answers onReady/initialDelivery, Vimeo answers ready or the ping pong
				if (
					[ 'onReady', 'initialDelivery', 'ready' ].includes(
						data?.event
					) ||
					data?.method === 'ping'
				) {
					clearTimeout( embedWakeTimers.get( iframe ) );
					delete iframe.dataset.pending;
					iframe.dataset.ready = 'true';
				}
			} );
	} );

	/**
	 * Pause players that left the view and resume the slider autoplay once none is visible.
	 * A resize runs the same pass, because a breakpoint can push a video off-screen without changing the active slide.
	 *
	 * @param {Object} swiper - Swiper instance of this slider.
	 */
	const syncEmbedVideos = ( swiper ) => {
		const hasVisibleVideo = pauseEmbedVideos( swiper );

		// Visitor moved away from the video, so start the autoplay a play click stopped
		if ( swiper.el.dataset.embedAutoplayStopped && ! hasVisibleVideo ) {
			delete swiper.el.dataset.embedAutoplayStopped;
			// Autoplay is false on breakpoints where it is turned off
			if ( swiper.params.autoplay ) {
				swiper.autoplay.start();
			}
		}
	};

	/**
	 * Stop autoplay of the slider, so it does not slide away from the playing video.
	 *
	 * @param {HTMLElement} element - Element inside the video box.
	 */
	const stopEmbedAutoplay = ( element ) => {
		const swiperElement = element.closest( '.swiper' );
		if ( swiperElement?.swiper?.autoplay?.running ) {
			swiperElement.swiper.autoplay.stop();
			swiperElement.dataset.embedAutoplayStopped = 'true';
		}
	};

	// A paused player stays in its slide, a click on its own play control only moves focus into the iframe
	window.addEventListener( 'blur', () => {
		// Focus reaches the iframe after the blur event
		setTimeout( () => {
			const { activeElement } = document;
			if (
				activeElement?.tagName === 'IFRAME' &&
				activeElement.closest(
					'.gslider-image-slider-wrapper .gslider-embed-video'
				)
			) {
				stopEmbedAutoplay( activeElement );
			}
		} );
	} );

	// Delegated, so it also works for sliders added later
	document.addEventListener( 'click', ( event ) => {
		const button = event.target.closest(
			'.gslider-image-slider-wrapper .gslider-embed-video-play'
		);
		// Swiper prevents the click that ends a drag
		if ( ! button || event.defaultPrevented ) {
			return;
		}

		const { embedType, embedId } = button.parentElement.dataset;
		const embed = EMBED_VIDEOS[ embedType ];
		if ( ! embed || ! embed.idPattern.test( embedId ) ) {
			return;
		}

		const poster = button.parentElement.querySelector(
			'.gslider-embed-video-poster'
		);
		const iframe = document.createElement( 'iframe' );
		iframe.src = embed.getSrc( embedId );
		iframe.title = embed.title;
		iframe.allow =
			'autoplay; encrypted-media; fullscreen; picture-in-picture';
		iframe.allowFullscreen = true;
		// Blocked, failed or silent embeds never announce readiness, so bring the play button back
		const armWakeTimeout = () => {
			clearTimeout( embedWakeTimers.get( iframe ) );
			embedWakeTimers.set(
				iframe,
				setTimeout( () => {
					if ( ! iframe.dataset.ready && iframe.isConnected ) {
						button.hidden = false;
						if ( poster ) {
							poster.hidden = false;
						}
						if ( iframe.ownerDocument?.activeElement === iframe ) {
							button.focus();
						}
						const swiper = iframe.closest( '.swiper' )?.swiper;
						iframe.remove();
						// Autoplay stopped for this video, so restart the slider now that it is gone
						if ( swiper ) {
							syncEmbedVideos( swiper );
						}
					}
				}, 8000 )
			);
		};

		iframe.addEventListener( 'load', () => {
			iframe.dataset.loaded = 'true';
			iframe.dataset.pending = 'true';
			// Ask the player to start reporting, its first answer means it can take a pause command
			const wake =
				'youtube' === embedType
					? { event: 'listening', id: 'gslider' }
					: { method: 'ping' };
			iframe.contentWindow?.postMessage(
				JSON.stringify( wake ),
				embed.origin
			);
			// A slow load should not eat the time the player gets to answer
			armWakeTimeout();
		} );
		stopEmbedAutoplay( button );
		// Keep the button and poster hidden, they come back when loading is cancelled
		button.hidden = true;
		if ( poster ) {
			poster.hidden = true;
		}
		button.after( iframe );
		iframe.focus();
		armWakeTimeout();
	} );

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

						// Slides without videos keep the plain init, only pause players that exist
						if (
							sliderContainer.querySelector(
								'.gslider-embed-video'
							)
						) {
							settings.on = {
								...settings.on,
								slideChange: syncEmbedVideos,
								resize: syncEmbedVideos,
							};
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
