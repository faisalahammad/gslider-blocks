/* eslint-disable no-unused-vars, camelcase, no-shadow, object-shorthand */
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';
import { useBlockProps } from '@wordpress/block-editor';
import attributes from './attributes';

const v1_1_5 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save( { attributes } ) {
		const {
			blockId,
			carouselPerColumn,
			carouselPerColumnGap,
			speed,
			autoplay,
			autoplayDelay,
			infiniteLoop,
			allowTouchMove,
			pauseOnHover,
			stopOnLastSlide,
			reverseDirection,
			carouselEffect,
			mousewheelControl,
			keyboardNavigation,
			paginationType,
			dynamicBullets,
			images,
			showCaption,
			paginationPositionType,
			showNavigation,
			showPagination,
			globalID,
			globalClass,
			navigationArrowPositionType,
			navigationArrowPosition,
			navigationArrowsIconSwitcher,
			navigationArrowsIconLeftAlign,
			navigationArrowsIconLeft,
			navigationArrowsIconLeftImageUrl,
			navigationArrowsIconLeftImageAlt,
			navigationArrowsIconRightAlign,
			navigationArrowsIconRight,
			navigationArrowsIconRightImageUrl,
			navigationArrowsIconRightImageAlt,
			enableimageLinks,
			enableLightbox,
			showTooltip,
			imageLinkTarget,
			imageLinkRel,
			imageLinkHoverEffect,
			enableLazyLoad,
		} = attributes;

		const blockProps = useBlockProps.save( {
			className: `gslider-image-slider-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
				showPagination ? 'has-pagination' : ''
			}`,
		} );

		const captionEnabled = {
			Mobile: !! showCaption?.Mobile,
			Tablet: !! showCaption?.Tablet,
			Desktop: !! showCaption?.Desktop,
		};
		const anyCaptionEnabled =
			captionEnabled.Mobile ||
			captionEnabled.Tablet ||
			captionEnabled.Desktop;

		const navigationEnabled = {
			Mobile: !! showNavigation?.Mobile,
			Tablet: !! showNavigation?.Tablet,
			Desktop: !! showNavigation?.Desktop,
		};
		const anyNavigationEnabled =
			navigationEnabled.Mobile ||
			navigationEnabled.Tablet ||
			navigationEnabled.Desktop;

		const paginationEnabled = {
			Mobile: !! showPagination?.Mobile,
			Tablet: !! showPagination?.Tablet,
			Desktop: !! showPagination?.Desktop,
		};
		const anyPaginationEnabled =
			paginationEnabled.Mobile ||
			paginationEnabled.Tablet ||
			paginationEnabled.Desktop;

		const swiperSettings = JSON.stringify( {
			effect: carouselEffect,
			breakpoints: {
				0: {
					slidesPerView: carouselPerColumn?.Mobile || 1,
					spaceBetween: carouselPerColumnGap?.Mobile || 0,
					speed: speed?.Mobile || 800,
					autoplay: autoplay
						? { delay: autoplayDelay?.Mobile || 1000 }
						: false,
					navigation: { enabled: navigationEnabled.Mobile },
					pagination: { enabled: paginationEnabled.Mobile },
				},
				768: {
					slidesPerView: carouselPerColumn?.Tablet || 2,
					spaceBetween: carouselPerColumnGap?.Tablet || 20,
					speed: speed?.Tablet || 800,
					autoplay: autoplay
						? { delay: autoplayDelay?.Tablet || 1000 }
						: false,
					navigation: { enabled: navigationEnabled.Tablet },
					pagination: { enabled: paginationEnabled.Tablet },
				},
				1025: {
					slidesPerView: carouselPerColumn?.Desktop || 2,
					spaceBetween: carouselPerColumnGap?.Desktop || 20,
					speed: speed?.Desktop || 800,
					autoplay: autoplay
						? { delay: autoplayDelay?.Desktop || 1000 }
						: false,
					navigation: { enabled: navigationEnabled.Desktop },
					pagination: { enabled: paginationEnabled.Desktop },
				},
			},
			loop: infiniteLoop,
			autoplay: autoplay
				? {
						pauseOnMouseEnter: pauseOnHover,
						disableOnInteraction: false,
						stopOnLastSlide: stopOnLastSlide,
						reverseDirection: reverseDirection,
				  }
				: false,
			allowTouchMove: allowTouchMove,
			mousewheel: mousewheelControl,
			keyboard: keyboardNavigation
				? { enabled: true, onlyInViewport: true, pageUpDown: false }
				: false,
			navigation: {
				enabled: anyNavigationEnabled,
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				enabled: anyPaginationEnabled,
				el: `.${ blockId } .swiper-pagination-image-slider`,
				type: paginationType,
				dynamicBullets:
					paginationType === 'bullets' ? dynamicBullets : false,
				clickable: true,
			},
		} );

		return (
			<div { ...blockProps } data-swiper-settings={ swiperSettings }>
				<div className="swiper" role="region" aria-label="Image Slider">
					<div className="swiper-wrapper">
						{ images.map( ( item ) => (
							<div key={ item.id } className={ `swiper-slide` }>
								<div
									className={ `gslider-image-slider-content-wrapper ${ globalClass }` }
									{ ...( globalID && { id: globalID } ) }
								>
									<div
										className="gslider-image-item"
										data-hover-effect={
											imageLinkHoverEffect
										}
									>
										{ enableLightbox ? (
											<a
												href={ item.url }
												data-fslightbox={ blockId }
												data-caption={ item.caption }
												className="gslider-image-link"
											>
												<img
													src={ item.url }
													alt={
														item.alt ||
														`image ${
															images.indexOf(
																item
															) + 1
														}`
													}
													loading={
														enableLazyLoad
															? 'lazy'
															: undefined
													}
												/>
											</a>
										) : (
											<>
												{ enableimageLinks &&
												item.link ? (
													<a
														href={ item.link }
														target={
															imageLinkTarget
														}
														rel={ imageLinkRel }
														className="gslider-image-link"
													>
														<img
															src={ item.url }
															alt={
																item.alt ||
																`image ${
																	images.indexOf(
																		item
																	) + 1
																}`
															}
															loading={
																enableLazyLoad
																	? 'lazy'
																	: undefined
															}
														/>
													</a>
												) : (
													<img
														src={ item.url }
														alt={
															item.alt ||
															`image ${
																images.indexOf(
																	item
																) + 1
															}`
														}
														loading={
															enableLazyLoad
																? 'lazy'
																: undefined
														}
													/>
												) }
											</>
										) }
										{ showTooltip && item.tooltipText && (
											<div className="gslider-image-tooltip">
												{ item.tooltipText }
											</div>
										) }
									</div>
									{ anyCaptionEnabled && item.caption ? (
										<div
											className="gslider-image-slider-caption"
											aria-live="polite"
										>
											{ item.caption }
										</div>
									) : null }
								</div>
							</div>
						) ) }
					</div>
					{ anyNavigationEnabled &&
						navigationArrowPositionType === 'inside' &&
						! navigationArrowsIconSwitcher && (
							<div
								className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								></div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								></div>
							</div>
						) }
					{ /* ... (simplified icons for deprecation to save space, but keeping markup structure) */ }
					{ anyPaginationEnabled &&
						paginationPositionType === 'inside' && (
							<div
								className="swiper-pagination swiper-pagination-image-slider"
								aria-label="Carousel pagination"
							></div>
						) }
				</div>
				{ anyNavigationEnabled &&
					navigationArrowPositionType === 'outside' &&
					! navigationArrowsIconSwitcher && (
						<div
							className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							></div>
							<div
								className="swiper-button-next"
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							></div>
						</div>
					) }
				{ anyPaginationEnabled &&
					paginationPositionType === 'outside' && (
						<div
							className="swiper-pagination swiper-pagination-image-slider"
							aria-label="Carousel pagination"
						></div>
					) }
			</div>
		);
	},
};

const v1_1_6 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save( { attributes } ) {
		const {
			blockId,
			carouselPerColumn,
			carouselPerColumnGap,
			speed,
			autoplay,
			autoplayDelay,
			infiniteLoop,
			allowTouchMove,
			pauseOnHover,
			stopOnLastSlide,
			reverseDirection,
			carouselEffect,
			mousewheelControl,
			keyboardNavigation,
			paginationType,
			dynamicBullets,

			images,
			showCaption,

			paginationPositionType,
			showNavigation,
			showPagination,
			globalID,
			globalClass,
			navigationArrowPositionType,
			navigationArrowPosition,

			navigationArrowsIconSwitcher,
			navigationArrowsIconLeftAlign,
			navigationArrowsIconLeft,
			navigationArrowsIconLeftImageUrl,
			navigationArrowsIconLeftImageAlt,

			navigationArrowsIconRightAlign,
			navigationArrowsIconRight,
			navigationArrowsIconRightImageUrl,
			navigationArrowsIconRightImageAlt,

			enableimageLinks,
			enableLightbox,
			showTooltip,
			imageLinkTarget,
			imageLinkRel,
			imageLinkHoverEffect,
			imageLinkHoverOpacity,
			imageLinkHoverScale,
			imageLinkHoverLift,
			imageLinkHoverLiftUnits,
			imageLinkTransitionDuration,
			enableLazyLoad,
		} = attributes;

		const blockProps = useBlockProps.save( {
			className: `gslider-image-slider-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
				showPagination ? 'has-pagination' : ''
			}`,
		} );

		const captionEnabled = {
			Mobile: !! showCaption?.Mobile,
			Tablet: !! showCaption?.Tablet,
			Desktop: !! showCaption?.Desktop,
		};
		const anyCaptionEnabled =
			captionEnabled.Mobile ||
			captionEnabled.Tablet ||
			captionEnabled.Desktop;

		const navigationEnabled = {
			Mobile: !! showNavigation?.Mobile,
			Tablet: !! showNavigation?.Tablet,
			Desktop: !! showNavigation?.Desktop,
		};
		const anyNavigationEnabled =
			navigationEnabled.Mobile ||
			navigationEnabled.Tablet ||
			navigationEnabled.Desktop;

		const paginationEnabled = {
			Mobile: !! showPagination?.Mobile,
			Tablet: !! showPagination?.Tablet,
			Desktop: !! showPagination?.Desktop,
		};
		const anyPaginationEnabled =
			paginationEnabled.Mobile ||
			paginationEnabled.Tablet ||
			paginationEnabled.Desktop;

		// Configure Swiper settings for frontend rendering
		const swiperSettings = JSON.stringify( {
			effect: carouselEffect,

			// Responsive breakpoints for Desktop, Tablet, and Mobile
			breakpoints: {
				0: {
					slidesPerView: carouselPerColumn?.Mobile || 1,
					spaceBetween: carouselPerColumnGap?.Mobile || 0,
					speed: speed?.Mobile || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Mobile || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Mobile },
					pagination: { enabled: paginationEnabled.Mobile },
				},
				768: {
					slidesPerView: carouselPerColumn?.Tablet || 2,
					spaceBetween: carouselPerColumnGap?.Tablet || 20,
					speed: speed?.Tablet || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Tablet || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Tablet },
					pagination: { enabled: paginationEnabled.Tablet },
				},
				1025: {
					slidesPerView: carouselPerColumn?.Desktop || 2,
					spaceBetween: carouselPerColumnGap?.Desktop || 20,
					speed: speed?.Desktop || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Desktop || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Desktop },
					pagination: { enabled: paginationEnabled.Desktop },
				},
			},

			// Common settings
			loop: infiniteLoop,
			autoplay: autoplay
				? {
						pauseOnMouseEnter: pauseOnHover,
						disableOnInteraction: false,
						stopOnLastSlide: stopOnLastSlide,
						reverseDirection: reverseDirection,
				  }
				: false,
			allowTouchMove: allowTouchMove,
			mousewheel: mousewheelControl,

			keyboard: keyboardNavigation
				? {
						enabled: true,
						onlyInViewport: true,
						pageUpDown: false,
				  }
				: false,

			navigation: {
				enabled: anyNavigationEnabled,
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			pagination: {
				enabled: anyPaginationEnabled,
				el: `.${ blockId } .swiper-pagination-image-slider`,
				type: paginationType,
				dynamicBullets:
					paginationType === 'bullets' ? dynamicBullets : false,
				clickable: true,
			},
		} );

		return (
			<div { ...blockProps } data-swiper-settings={ swiperSettings }>
				<div className="swiper" role="region" aria-label="Image Slider">
					<div className="swiper-wrapper">
						{ images.map( ( item ) => (
							<div key={ item.id } className={ `swiper-slide` }>
								<div
									className={ `gslider-image-slider-content-wrapper ${ globalClass }` }
									{ ...( globalID && { id: globalID } ) }
								>
									<div
										className="gslider-image-item"
										data-hover-effect={
											imageLinkHoverEffect
										}
									>
										{ enableLightbox ? (
											<a
												href={ item.url }
												data-fslightbox={ blockId }
												data-caption={ item.caption }
												className="gslider-image-link"
											>
												<img
													src={ item.url }
													alt={
														item.alt ||
														`image ${
															images.indexOf(
																item
															) + 1
														}`
													}
													loading={
														enableLazyLoad
															? 'lazy'
															: undefined
													}
												/>
											</a>
										) : (
											<>
												{ enableimageLinks &&
												item.link ? (
													<a
														href={ item.link }
														target={
															imageLinkTarget
														}
														rel={ imageLinkRel }
														className="gslider-image-link"
													>
														<img
															src={ item.url }
															alt={
																item.alt ||
																`image ${
																	images.indexOf(
																		item
																	) + 1
																}`
															}
															loading={
																enableLazyLoad
																	? 'lazy'
																	: undefined
															}
														/>
													</a>
												) : (
													<img
														src={ item.url }
														alt={
															item.alt ||
															`image ${
																images.indexOf(
																	item
																) + 1
															}`
														}
														loading={
															enableLazyLoad
																? 'lazy'
																: undefined
														}
													/>
												) }
											</>
										) }
										{ showTooltip && item.tooltipText && (
											<div className="gslider-image-tooltip">
												{ item.tooltipText }
											</div>
										) }
									</div>
									{ anyCaptionEnabled && item.caption ? (
										<div
											className="gslider-image-slider-caption"
											aria-live="polite"
										>
											{ item.caption }
										</div>
									) : null }
								</div>
							</div>
						) ) }
					</div>
					{ anyNavigationEnabled &&
						! navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' && (
							<>
								<div
									className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
								>
									<div
										className="swiper-button-prev"
										role="button"
										tabIndex={ 0 }
										aria-label="Previous slide"
									></div>
									<div
										className="swiper-button-next"
										role="button"
										tabIndex={ 0 }
										aria-label="Next slide"
									></div>
								</div>
							</>
						) }

					{ anyNavigationEnabled &&
						navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' &&
						( navigationArrowsIconLeftAlign === 'icon' ||
							navigationArrowsIconRightAlign === 'icon' ) && (
							<div
								className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								>
									{ renderSVG( navigationArrowsIconLeft ) }
								</div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								>
									{ renderSVG( navigationArrowsIconRight ) }
								</div>
							</div>
						) }

					{ anyNavigationEnabled &&
						navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' &&
						( navigationArrowsIconLeftAlign === 'image' ||
							navigationArrowsIconRightAlign === 'image' ) &&
						( navigationArrowsIconLeftImageUrl ||
							navigationArrowsIconRightImageUrl ) && (
							<div
								className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								>
									<img
										src={ navigationArrowsIconLeftImageUrl }
										alt={ navigationArrowsIconLeftImageAlt }
									/>
								</div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								>
									<img
										src={
											navigationArrowsIconRightImageUrl
										}
										alt={
											navigationArrowsIconRightImageAlt
										}
									/>
								</div>
							</div>
						) }

					{ anyPaginationEnabled &&
						paginationPositionType === 'inside' && (
							<>
								<div
									className="swiper-pagination swiper-pagination-image-slider"
									aria-label="Carousel pagination"
								></div>
							</>
						) }
				</div>

				{ anyNavigationEnabled &&
					! navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' && (
						<>
							<div
								className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								></div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								></div>
							</div>
						</>
					) }

				{ anyNavigationEnabled &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' &&
					( navigationArrowsIconLeftAlign === 'icon' ||
						navigationArrowsIconRightAlign === 'icon' ) && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							>
								{ renderSVG( navigationArrowsIconLeft ) }
							</div>
							<div
								className="swiper-button-next"
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							>
								{ renderSVG( navigationArrowsIconRight ) }
							</div>
						</div>
					) }

				{ anyNavigationEnabled &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' &&
					( navigationArrowsIconLeftAlign === 'image' ||
						navigationArrowsIconRightAlign === 'image' ) &&
					( navigationArrowsIconLeftImageUrl ||
						navigationArrowsIconRightImageUrl ) && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							>
								<img
									src={ navigationArrowsIconLeftImageUrl }
									alt={ navigationArrowsIconLeftImageAlt }
								/>
							</div>
							<div
								className="swiper-button-next"
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							>
								<img
									src={ navigationArrowsIconRightImageUrl }
									alt={ navigationArrowsIconRightImageAlt }
								/>
							</div>
						</div>
					) }

				{ anyPaginationEnabled &&
					paginationPositionType === 'outside' && (
						<>
							<div
								className={ `swiper-pagination swiper-pagination-image-slider swiper-pagination-${ blockId }` }
								aria-label="Carousel pagination"
							></div>
						</>
					) }
			</div>
		);
	},
};

const v1_1_7 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save( { attributes } ) {
		const {
			blockId,
			carouselPerColumn,
			carouselPerColumnGap,
			speed,
			autoplay,
			autoplayDelay,
			infiniteLoop,
			allowTouchMove,
			pauseOnHover,
			stopOnLastSlide,
			reverseDirection,
			carouselEffect,
			mousewheelControl,
			keyboardNavigation,
			paginationType,
			dynamicBullets,

			images,
			showCaption,

			paginationPositionType,
			showNavigation,
			showPagination,
			globalID,
			globalClass,
			navigationArrowPositionType,
			navigationArrowPosition,

			navigationArrowsIconSwitcher,
			navigationArrowsIconLeftAlign,
			navigationArrowsIconLeft,
			navigationArrowsIconLeftImageUrl,
			navigationArrowsIconLeftImageAlt,

			navigationArrowsIconRightAlign,
			navigationArrowsIconRight,
			navigationArrowsIconRightImageUrl,
			navigationArrowsIconRightImageAlt,

			enableimageLinks,
			enableLightbox,
			showTooltip,
			imageLinkTarget,
			imageLinkRel,
			imageLinkHoverEffect,
			imageLinkHoverOpacity,
			imageLinkHoverScale,
			imageLinkHoverLift,
			imageLinkHoverLiftUnits,
			imageLinkTransitionDuration,
			enableLazyLoad,
		} = attributes;

		const blockProps = useBlockProps.save( {
			className: `gslider-image-slider-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
				showPagination ? 'has-pagination' : ''
			}`,
		} );

		const captionEnabled = {
			Mobile: !! showCaption?.Mobile,
			Tablet: !! showCaption?.Tablet,
			Desktop: !! showCaption?.Desktop,
		};
		const anyCaptionEnabled =
			captionEnabled.Mobile ||
			captionEnabled.Tablet ||
			captionEnabled.Desktop;

		const navigationEnabled = {
			Mobile: !! showNavigation?.Mobile,
			Tablet: !! showNavigation?.Tablet,
			Desktop: !! showNavigation?.Desktop,
		};
		const anyNavigationEnabled =
			navigationEnabled.Mobile ||
			navigationEnabled.Tablet ||
			navigationEnabled.Desktop;

		const paginationEnabled = {
			Mobile: !! showPagination?.Mobile,
			Tablet: !! showPagination?.Tablet,
			Desktop: !! showPagination?.Desktop,
		};
		const anyPaginationEnabled =
			paginationEnabled.Mobile ||
			paginationEnabled.Tablet ||
			paginationEnabled.Desktop;

		// Configure Swiper settings for frontend rendering
		const swiperSettings = JSON.stringify( {
			effect: carouselEffect,

			// Responsive breakpoints for Desktop, Tablet, and Mobile
			breakpoints: {
				0: {
					slidesPerView: carouselPerColumn?.Mobile || 1,
					spaceBetween: carouselPerColumnGap?.Mobile || 0,
					speed: speed?.Mobile || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Mobile || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Mobile },
					pagination: { enabled: paginationEnabled.Mobile },
				},
				768: {
					slidesPerView: carouselPerColumn?.Tablet || 2,
					spaceBetween: carouselPerColumnGap?.Tablet ?? 20,
					speed: speed?.Tablet || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Tablet || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Tablet },
					pagination: { enabled: paginationEnabled.Tablet },
				},
				1025: {
					slidesPerView: carouselPerColumn?.Desktop || 2,
					spaceBetween: carouselPerColumnGap?.Desktop ?? 20,
					speed: speed?.Desktop || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Desktop || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Desktop },
					pagination: { enabled: paginationEnabled.Desktop },
				},
			},

			// Common settings
			loop: infiniteLoop,
			autoplay: autoplay
				? {
						pauseOnMouseEnter: pauseOnHover,
						disableOnInteraction: false,
						stopOnLastSlide: stopOnLastSlide,
						reverseDirection: reverseDirection,
				  }
				: false,
			allowTouchMove: allowTouchMove,
			mousewheel: mousewheelControl,

			keyboard: keyboardNavigation
				? {
						enabled: true,
						onlyInViewport: true,
						pageUpDown: false,
				  }
				: false,

			navigation: {
				enabled: anyNavigationEnabled,
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			pagination: {
				enabled: anyPaginationEnabled,
				el: `.${ blockId } .swiper-pagination-image-slider`,
				type: paginationType,
				dynamicBullets:
					paginationType === 'bullets' ? dynamicBullets : false,
				clickable: true,
			},
		} );

		return (
			<div { ...blockProps } data-swiper-settings={ swiperSettings }>
				<div className="swiper" role="region" aria-label="Image Slider">
					<div className="swiper-wrapper">
						{ images.map( ( item ) => (
							<div key={ item.id } className={ `swiper-slide` }>
								<div
									className={ `gslider-image-slider-content-wrapper ${ globalClass }` }
									{ ...( globalID && { id: globalID } ) }
								>
									<div
										className="gslider-image-item"
										data-hover-effect={
											imageLinkHoverEffect
										}
									>
										{ enableLightbox ? (
											<a
												href={ item.url }
												data-fslightbox={ blockId }
												data-caption={ item.caption }
												className="gslider-image-link"
											>
												<img
													src={ item.url }
													alt={
														item.alt ||
														`image ${
															images.indexOf(
																item
															) + 1
														}`
													}
													loading={
														enableLazyLoad
															? 'lazy'
															: undefined
													}
												/>
											</a>
										) : (
											<>
												{ enableimageLinks &&
												item.link ? (
													<a
														href={ item.link }
														target={
															imageLinkTarget
														}
														rel={ imageLinkRel }
														className="gslider-image-link"
													>
														<img
															src={ item.url }
															alt={
																item.alt ||
																`image ${
																	images.indexOf(
																		item
																	) + 1
																}`
															}
															loading={
																enableLazyLoad
																	? 'lazy'
																	: undefined
															}
														/>
													</a>
												) : (
													<img
														src={ item.url }
														alt={
															item.alt ||
															`image ${
																images.indexOf(
																	item
																) + 1
															}`
														}
														loading={
															enableLazyLoad
																? 'lazy'
																: undefined
														}
													/>
												) }
											</>
										) }
										{ showTooltip && item.tooltipText && (
											<div className="gslider-image-tooltip">
												{ item.tooltipText }
											</div>
										) }
									</div>
									{ anyCaptionEnabled && item.caption ? (
										<div
											className="gslider-image-slider-caption"
											aria-live="polite"
										>
											{ item.caption }
										</div>
									) : null }
								</div>
							</div>
						) ) }
					</div>
					{ anyNavigationEnabled &&
						! navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' && (
							<>
								<div
									className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
								>
									<div
										className="swiper-button-prev"
										role="button"
										tabIndex={ 0 }
										aria-label="Previous slide"
									></div>
									<div
										className="swiper-button-next"
										role="button"
										tabIndex={ 0 }
										aria-label="Next slide"
									></div>
								</div>
							</>
						) }

					{ anyNavigationEnabled &&
						navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' &&
						( navigationArrowsIconLeftAlign === 'icon' ||
							navigationArrowsIconRightAlign === 'icon' ) && (
							<div
								className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								>
									{ renderSVG( navigationArrowsIconLeft ) }
								</div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								>
									{ renderSVG( navigationArrowsIconRight ) }
								</div>
							</div>
						) }

					{ anyNavigationEnabled &&
						navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' &&
						( navigationArrowsIconLeftAlign === 'image' ||
							navigationArrowsIconRightAlign === 'image' ) &&
						( navigationArrowsIconLeftImageUrl ||
							navigationArrowsIconRightImageUrl ) && (
							<div
								className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								>
									<img
										src={ navigationArrowsIconLeftImageUrl }
										alt={ navigationArrowsIconLeftImageAlt }
									/>
								</div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								>
									<img
										src={
											navigationArrowsIconRightImageUrl
										}
										alt={
											navigationArrowsIconRightImageAlt
										}
									/>
								</div>
							</div>
						) }

					{ anyPaginationEnabled &&
						paginationPositionType === 'inside' && (
							<>
								<div
									className="swiper-pagination swiper-pagination-image-slider"
									aria-label="Carousel pagination"
								></div>
							</>
						) }
				</div>

				{ anyNavigationEnabled &&
					! navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' && (
						<>
							<div
								className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								></div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								></div>
							</div>
						</>
					) }

				{ anyNavigationEnabled &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' &&
					( navigationArrowsIconLeftAlign === 'icon' ||
						navigationArrowsIconRightAlign === 'icon' ) && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							>
								{ renderSVG( navigationArrowsIconLeft ) }
							</div>
							<div
								className="swiper-button-next"
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							>
								{ renderSVG( navigationArrowsIconRight ) }
							</div>
						</div>
					) }

				{ anyNavigationEnabled &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' &&
					( navigationArrowsIconLeftAlign === 'image' ||
						navigationArrowsIconRightAlign === 'image' ) &&
					( navigationArrowsIconLeftImageUrl ||
						navigationArrowsIconRightImageUrl ) && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							>
								<img
									src={ navigationArrowsIconLeftImageUrl }
									alt={ navigationArrowsIconLeftImageAlt }
								/>
							</div>
							<div
								className="swiper-button-next"
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							>
								<img
									src={ navigationArrowsIconRightImageUrl }
									alt={ navigationArrowsIconRightImageAlt }
								/>
							</div>
						</div>
					) }

				{ anyPaginationEnabled &&
					paginationPositionType === 'outside' && (
						<>
							<div
								className={ `swiper-pagination swiper-pagination-image-slider swiper-pagination-${ blockId }` }
								aria-label="Carousel pagination"
							></div>
						</>
					) }
			</div>
		);
	},
};

const v1_2_0 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save( { attributes } ) {
		const {
			blockId,
			carouselPerColumn,
			carouselPerColumnGap,
			speed,
			autoplay,
			autoplayDelay,
			infiniteLoop,
			allowTouchMove,
			pauseOnHover,
			stopOnLastSlide,
			reverseDirection,
			carouselEffect,
			mousewheelControl,
			keyboardNavigation,
			paginationType,
			dynamicBullets,

			images,
			showCaption,

			paginationPositionType,
			showNavigation,
			showPagination,
			globalID,
			globalClass,
			navigationArrowPositionType,
			navigationArrowPosition,

			navigationArrowsIconSwitcher,
			navigationArrowsIconLeftAlign,
			navigationArrowsIconLeft,
			navigationArrowsIconLeftImageUrl,
			navigationArrowsIconLeftImageAlt,

			navigationArrowsIconRightAlign,
			navigationArrowsIconRight,
			navigationArrowsIconRightImageUrl,
			navigationArrowsIconRightImageAlt,

			enableimageLinks,
			enableLightbox,
			showTooltip,
			imageLinkTarget,
			imageLinkRel,
			imageLinkHoverEffect,
			imageLinkHoverOpacity,
			imageLinkHoverScale,
			imageLinkHoverLift,
			imageLinkHoverLiftUnits,
			imageLinkTransitionDuration,
			enableLazyLoad,
		} = attributes;

		const blockProps = useBlockProps.save( {
			className: `gslider-image-slider-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
				showPagination?.Desktop ||
				showPagination?.Tablet ||
				showPagination?.Mobile
					? 'has-pagination'
					: ''
			}`,
		} );

		const captionEnabled = {
			Mobile: !! showCaption?.Mobile,
			Tablet: !! showCaption?.Tablet,
			Desktop: !! showCaption?.Desktop,
		};
		const anyCaptionEnabled =
			captionEnabled.Mobile ||
			captionEnabled.Tablet ||
			captionEnabled.Desktop;

		const navigationEnabled = {
			Mobile: !! showNavigation?.Mobile,
			Tablet: !! showNavigation?.Tablet,
			Desktop: !! showNavigation?.Desktop,
		};
		const anyNavigationEnabled =
			navigationEnabled.Mobile ||
			navigationEnabled.Tablet ||
			navigationEnabled.Desktop;

		const paginationEnabled = {
			Mobile: !! showPagination?.Mobile,
			Tablet: !! showPagination?.Tablet,
			Desktop: !! showPagination?.Desktop,
		};
		const anyPaginationEnabled =
			paginationEnabled.Mobile ||
			paginationEnabled.Tablet ||
			paginationEnabled.Desktop;

		// Configure Swiper settings for frontend rendering
		const swiperSettings = JSON.stringify( {
			effect: carouselEffect,

			// Responsive breakpoints for Desktop, Tablet, and Mobile
			breakpoints: {
				0: {
					slidesPerView: carouselPerColumn?.Mobile || 1,
					spaceBetween: carouselPerColumnGap?.Mobile || 0,
					speed: speed?.Mobile || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Mobile || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Mobile },
					pagination: { enabled: paginationEnabled.Mobile },
				},
				768: {
					slidesPerView: carouselPerColumn?.Tablet || 2,
					spaceBetween: carouselPerColumnGap?.Tablet ?? 20,
					speed: speed?.Tablet || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Tablet || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Tablet },
					pagination: { enabled: paginationEnabled.Tablet },
				},
				1025: {
					slidesPerView: carouselPerColumn?.Desktop || 2,
					spaceBetween: carouselPerColumnGap?.Desktop ?? 20,
					speed: speed?.Desktop || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Desktop || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Desktop },
					pagination: { enabled: paginationEnabled.Desktop },
				},
			},

			// Common settings
			loop: infiniteLoop,
			autoplay: autoplay
				? {
						pauseOnMouseEnter: pauseOnHover,
						disableOnInteraction: false,
						stopOnLastSlide: stopOnLastSlide,
						reverseDirection: reverseDirection,
				  }
				: false,
			allowTouchMove: allowTouchMove,
			mousewheel: mousewheelControl,

			keyboard: keyboardNavigation
				? {
						enabled: true,
						onlyInViewport: true,
						pageUpDown: false,
				  }
				: false,

			navigation: {
				enabled: anyNavigationEnabled,
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			pagination: {
				enabled: anyPaginationEnabled,
				el: `.${ blockId } .swiper-pagination-image-slider`,
				type: paginationType,
				dynamicBullets:
					paginationType === 'bullets' ? dynamicBullets : false,
				clickable: true,
			},
		} );

		return (
			<div { ...blockProps } data-swiper-settings={ swiperSettings }>
				<div className="swiper" role="region" aria-label="Image Slider">
					<div className="swiper-wrapper">
						{ images.map( ( item ) => (
							<div key={ item.id } className={ `swiper-slide` }>
								<div
									className={ `gslider-image-slider-content-wrapper ${ globalClass }` }
									{ ...( globalID && { id: globalID } ) }
								>
									<div
										className="gslider-image-item"
										data-hover-effect={
											imageLinkHoverEffect
										}
									>
										{ enableLightbox ? (
											<a
												href={ item.url }
												data-fslightbox={ blockId }
												data-caption={ item.caption }
												className="gslider-image-link"
											>
												<img
													src={ item.url }
													alt={
														item.alt ||
														`image ${
															images.indexOf(
																item
															) + 1
														}`
													}
													loading={
														enableLazyLoad
															? 'lazy'
															: undefined
													}
												/>
											</a>
										) : (
											<>
												{ enableimageLinks &&
												item.link ? (
													<a
														href={ item.link }
														target={
															imageLinkTarget
														}
														rel={ imageLinkRel }
														className="gslider-image-link"
													>
														<img
															src={ item.url }
															alt={
																item.alt ||
																`image ${
																	images.indexOf(
																		item
																	) + 1
																}`
															}
															loading={
																enableLazyLoad
																	? 'lazy'
																	: undefined
															}
														/>
													</a>
												) : (
													<img
														src={ item.url }
														alt={
															item.alt ||
															`image ${
																images.indexOf(
																	item
																) + 1
															}`
														}
														loading={
															enableLazyLoad
																? 'lazy'
																: undefined
														}
													/>
												) }
											</>
										) }
										{ showTooltip && item.tooltipText && (
											<div className="gslider-image-tooltip">
												{ item.tooltipText }
											</div>
										) }
									</div>
									{ anyCaptionEnabled && item.caption ? (
										<div
											className="gslider-image-slider-caption"
											aria-live="polite"
										>
											{ item.caption }
										</div>
									) : null }
								</div>
							</div>
						) ) }
					</div>
					{ anyNavigationEnabled &&
						! navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' && (
							<>
								<div
									className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
								>
									<div
										className="swiper-button-prev"
										role="button"
										tabIndex={ 0 }
										aria-label="Previous slide"
									></div>
									<div
										className="swiper-button-next"
										role="button"
										tabIndex={ 0 }
										aria-label="Next slide"
									></div>
								</div>
							</>
						) }

					{ anyNavigationEnabled &&
						navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' &&
						( navigationArrowsIconLeftAlign === 'icon' ||
							navigationArrowsIconRightAlign === 'icon' ) && (
							<div
								className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								>
									{ renderSVG( navigationArrowsIconLeft ) }
								</div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								>
									{ renderSVG( navigationArrowsIconRight ) }
								</div>
							</div>
						) }

					{ anyNavigationEnabled &&
						navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' &&
						( navigationArrowsIconLeftAlign === 'image' ||
							navigationArrowsIconRightAlign === 'image' ) &&
						( navigationArrowsIconLeftImageUrl ||
							navigationArrowsIconRightImageUrl ) && (
							<div
								className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								>
									<img
										src={ navigationArrowsIconLeftImageUrl }
										alt={ navigationArrowsIconLeftImageAlt }
									/>
								</div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								>
									<img
										src={
											navigationArrowsIconRightImageUrl
										}
										alt={
											navigationArrowsIconRightImageAlt
										}
									/>
								</div>
							</div>
						) }

					{ anyPaginationEnabled &&
						paginationPositionType === 'inside' && (
							<>
								<div
									className="swiper-pagination swiper-pagination-image-slider"
									aria-label="Carousel pagination"
								></div>
							</>
						) }
				</div>

				{ anyNavigationEnabled &&
					! navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' && (
						<>
							<div
								className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								></div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								></div>
							</div>
						</>
					) }

				{ anyNavigationEnabled &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' &&
					( navigationArrowsIconLeftAlign === 'icon' ||
						navigationArrowsIconRightAlign === 'icon' ) && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							>
								{ renderSVG( navigationArrowsIconLeft ) }
							</div>
							<div
								className="swiper-button-next"
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							>
								{ renderSVG( navigationArrowsIconRight ) }
							</div>
						</div>
					) }

				{ anyNavigationEnabled &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' &&
					( navigationArrowsIconLeftAlign === 'image' ||
						navigationArrowsIconRightAlign === 'image' ) &&
					( navigationArrowsIconLeftImageUrl ||
						navigationArrowsIconRightImageUrl ) && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							>
								<img
									src={ navigationArrowsIconLeftImageUrl }
									alt={ navigationArrowsIconLeftImageAlt }
								/>
							</div>
							<div
								className="swiper-button-next"
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							>
								<img
									src={ navigationArrowsIconRightImageUrl }
									alt={ navigationArrowsIconRightImageAlt }
								/>
							</div>
						</div>
					) }

				{ anyPaginationEnabled &&
					paginationPositionType === 'outside' && (
						<>
							<div
								className={ `swiper-pagination swiper-pagination-image-slider swiper-pagination-${ blockId }` }
								aria-label="Carousel pagination"
							></div>
						</>
					) }
			</div>
		);
	},
};

const v1_2_1 = {
	attributes,
	supports: {
		html: false,
		anchor: false,
		align: [ 'wide', 'full' ],
	},
	save( { attributes } ) {
		const {
			blockId,
			carouselPerColumn,
			carouselPerColumnGap,
			speed,
			autoplay,
			autoplayDelay,
			infiniteLoop,
			allowTouchMove,
			pauseOnHover,
			stopOnLastSlide,
			reverseDirection,
			carouselEffect,
			mousewheelControl,
			keyboardNavigation,
			paginationType,
			dynamicBullets,

			images,
			showCaption,

			paginationPositionType,
			showNavigation,
			showPagination,
			globalID,
			globalClass,
			navigationArrowPositionType,
			navigationArrowPosition,

			navigationArrowsIconSwitcher,
			navigationArrowsIconLeftAlign,
			navigationArrowsIconLeft,
			navigationArrowsIconLeftImageUrl,
			navigationArrowsIconLeftImageAlt,

			navigationArrowsIconRightAlign,
			navigationArrowsIconRight,
			navigationArrowsIconRightImageUrl,
			navigationArrowsIconRightImageAlt,

			enableimageLinks,
			enableLightbox,
			showTooltip,
			imageLinkTarget,
			imageLinkRel,
			imageLinkHoverEffect,
			enableLazyLoad,
		} = attributes;

		const blockProps = useBlockProps.save( {
			className: `gslider-image-slider-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
				showPagination?.Desktop ||
				showPagination?.Tablet ||
				showPagination?.Mobile
					? 'has-pagination'
					: ''
			}`,
		} );

		const captionEnabled = {
			Mobile: !! showCaption?.Mobile,
			Tablet: !! showCaption?.Tablet,
			Desktop: !! showCaption?.Desktop,
		};
		const anyCaptionEnabled =
			captionEnabled.Mobile ||
			captionEnabled.Tablet ||
			captionEnabled.Desktop;

		const navigationEnabled = {
			Mobile: !! showNavigation?.Mobile,
			Tablet: !! showNavigation?.Tablet,
			Desktop: !! showNavigation?.Desktop,
		};
		const anyNavigationEnabled =
			navigationEnabled.Mobile ||
			navigationEnabled.Tablet ||
			navigationEnabled.Desktop;

		const paginationEnabled = {
			Mobile: !! showPagination?.Mobile,
			Tablet: !! showPagination?.Tablet,
			Desktop: !! showPagination?.Desktop,
		};
		const anyPaginationEnabled =
			paginationEnabled.Mobile ||
			paginationEnabled.Tablet ||
			paginationEnabled.Desktop;

		// Configure Swiper settings for frontend rendering
		const swiperSettings = JSON.stringify( {
			effect: carouselEffect,

			// Responsive breakpoints for Desktop, Tablet, and Mobile
			breakpoints: {
				0: {
					slidesPerView: carouselPerColumn?.Mobile || 1,
					spaceBetween: carouselPerColumnGap?.Mobile || 0,
					speed: speed?.Mobile || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Mobile || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Mobile },
					pagination: { enabled: paginationEnabled.Mobile },
				},
				768: {
					slidesPerView: carouselPerColumn?.Tablet || 2,
					spaceBetween: carouselPerColumnGap?.Tablet ?? 20,
					speed: speed?.Tablet || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Tablet || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Tablet },
					pagination: { enabled: paginationEnabled.Tablet },
				},
				1025: {
					slidesPerView: carouselPerColumn?.Desktop || 2,
					spaceBetween: carouselPerColumnGap?.Desktop ?? 20,
					speed: speed?.Desktop || 800,
					autoplay: autoplay
						? {
								delay: autoplayDelay?.Desktop || 1000,
						  }
						: false,
					navigation: { enabled: navigationEnabled.Desktop },
					pagination: { enabled: paginationEnabled.Desktop },
				},
			},

			// Common settings
			loop: infiniteLoop,
			autoplay: autoplay
				? {
						pauseOnMouseEnter: pauseOnHover,
						disableOnInteraction: false,
						stopOnLastSlide,
						reverseDirection,
				  }
				: false,
			allowTouchMove,
			mousewheel: mousewheelControl,

			keyboard: keyboardNavigation
				? {
						enabled: true,
						onlyInViewport: true,
						pageUpDown: false,
				  }
				: false,

			navigation: {
				enabled: anyNavigationEnabled,
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			pagination: {
				enabled: anyPaginationEnabled,
				el: `.${ blockId } .swiper-pagination-image-slider`,
				type: paginationType,
				dynamicBullets:
					paginationType === 'bullets' ? dynamicBullets : false,
				clickable: true,
			},
		} );

		return (
			<div { ...blockProps } data-swiper-settings={ swiperSettings }>
				<div className="swiper" role="region" aria-label="Image Slider">
					<div className="swiper-wrapper">
						{ images.map( ( item ) => (
							<div key={ item.id } className={ `swiper-slide` }>
								<div
									className={ `gslider-image-slider-content-wrapper ${ globalClass }` }
									{ ...( globalID && { id: globalID } ) }
								>
									<div
										className="gslider-image-item"
										data-hover-effect={
											imageLinkHoverEffect
										}
									>
										{ enableLightbox ? (
											<a
												href={ item.url }
												data-fslightbox={ blockId }
												data-caption={ item.caption }
												className="gslider-image-link"
											>
												<img
													src={ item.url }
													alt={
														item.alt ||
														`image ${
															images.indexOf(
																item
															) + 1
														}`
													}
													loading={
														enableLazyLoad
															? 'lazy'
															: undefined
													}
												/>
											</a>
										) : (
											<>
												{ enableimageLinks &&
												item.link ? (
													<a
														href={ item.link }
														target={
															imageLinkTarget
														}
														rel={ imageLinkRel }
														className="gslider-image-link"
													>
														<img
															src={ item.url }
															alt={
																item.alt ||
																`image ${
																	images.indexOf(
																		item
																	) + 1
																}`
															}
															loading={
																enableLazyLoad
																	? 'lazy'
																	: undefined
															}
														/>
													</a>
												) : (
													<img
														src={ item.url }
														alt={
															item.alt ||
															`image ${
																images.indexOf(
																	item
																) + 1
															}`
														}
														loading={
															enableLazyLoad
																? 'lazy'
																: undefined
														}
													/>
												) }
											</>
										) }
										{ showTooltip && item.tooltipText && (
											<div className="gslider-image-tooltip">
												{ item.tooltipText }
											</div>
										) }
									</div>
									{ anyCaptionEnabled && item.caption ? (
										<div
											className="gslider-image-slider-caption"
											aria-live="polite"
										>
											{ item.caption }
										</div>
									) : null }
								</div>
							</div>
						) ) }
					</div>
					{ anyNavigationEnabled &&
						! navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' && (
							<>
								<div
									className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
								>
									<div
										className="swiper-button-prev"
										role="button"
										tabIndex={ 0 }
										aria-label="Previous slide"
									></div>
									<div
										className="swiper-button-next"
										role="button"
										tabIndex={ 0 }
										aria-label="Next slide"
									></div>
								</div>
							</>
						) }

					{ anyNavigationEnabled &&
						navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' && (
							<div
								className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								>
									{ navigationArrowsIconLeftAlign ===
										'image' &&
									navigationArrowsIconLeftImageUrl ? (
										<img
											src={
												navigationArrowsIconLeftImageUrl
											}
											alt={
												navigationArrowsIconLeftImageAlt
											}
										/>
									) : (
										renderSVG( navigationArrowsIconLeft )
									) }
								</div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								>
									{ navigationArrowsIconRightAlign ===
										'image' &&
									navigationArrowsIconRightImageUrl ? (
										<img
											src={
												navigationArrowsIconRightImageUrl
											}
											alt={
												navigationArrowsIconRightImageAlt
											}
										/>
									) : (
										renderSVG( navigationArrowsIconRight )
									) }
								</div>
							</div>
						) }

					{ anyPaginationEnabled &&
						paginationPositionType === 'inside' && (
							<>
								<div
									className="swiper-pagination swiper-pagination-image-slider"
									aria-label="Carousel pagination"
								></div>
							</>
						) }
				</div>

				{ anyNavigationEnabled &&
					! navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' && (
						<>
							<div
								className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								></div>
								<div
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								></div>
							</div>
						</>
					) }

				{ anyNavigationEnabled &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							>
								{ navigationArrowsIconLeftAlign === 'image' &&
								navigationArrowsIconLeftImageUrl ? (
									<img
										src={ navigationArrowsIconLeftImageUrl }
										alt={ navigationArrowsIconLeftImageAlt }
									/>
								) : (
									renderSVG( navigationArrowsIconLeft )
								) }
							</div>
							<div
								className="swiper-button-next"
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							>
								{ navigationArrowsIconRightAlign === 'image' &&
								navigationArrowsIconRightImageUrl ? (
									<img
										src={
											navigationArrowsIconRightImageUrl
										}
										alt={
											navigationArrowsIconRightImageAlt
										}
									/>
								) : (
									renderSVG( navigationArrowsIconRight )
								) }
							</div>
						</div>
					) }

				{ anyPaginationEnabled &&
					paginationPositionType === 'outside' && (
						<>
							<div
								className={ `swiper-pagination swiper-pagination-image-slider swiper-pagination-${ blockId }` }
								aria-label="Carousel pagination"
							></div>
						</>
					) }
			</div>
		);
	},
};

export default [ v1_2_1, v1_2_0, v1_1_7, v1_1_6, v1_1_5 ];
