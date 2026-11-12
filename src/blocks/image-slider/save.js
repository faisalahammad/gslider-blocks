import { useBlockProps } from '@wordpress/block-editor';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';

// Same strict ID shapes view.js accepts, a tampered ID renders the plain image instead of a dead facade
const VIDEO_ID_PATTERNS = {
	youtube: /^[\w-]{11}$/,
	vimeo: /^\d+(\/[\da-f]+)?$/,
};

// A slide plays an external video only when a provider ID was parsed and saved
const isExternalVideo = ( item ) =>
	( item.videoSource === 'youtube' || item.videoSource === 'vimeo' ) &&
	!! item.videoExternalId &&
	VIDEO_ID_PATTERNS[ item.videoSource ].test( item.videoExternalId );

export default function Save( { attributes } ) {
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

	const trimmedGlobalClass = globalClass?.trim();

	const blockProps = useBlockProps.save( {
		className: `gslider-image-slider-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination?.Desktop ||
			showPagination?.Tablet ||
			showPagination?.Mobile
				? 'has-pagination'
				: ''
		}${ trimmedGlobalClass ? ` ${ trimmedGlobalClass }` : '' }`,
		...( globalID ? { id: globalID } : {} ),
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

	// Only output the attribute when enabled, so markup of existing blocks stays the same
	const lightboxDevices = [ 'Desktop', 'Tablet', 'Mobile' ]
		.filter( ( device ) => enableLightbox?.[ device ] === true )
		.join( ' ' );

	// Save custom links only when some devices have the lightbox off, so view.js can open them there
	const linkOnLightboxOff =
		enableimageLinks &&
		lightboxDevices &&
		lightboxDevices !== 'Desktop Tablet Mobile';

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
			// Patterns keep blockId empty, so fall back to an unscoped selector.
			el: blockId
				? `.${ blockId } .swiper-pagination-image-slider`
				: '.swiper-pagination-image-slider',
			type: paginationType,
			dynamicBullets:
				paginationType === 'bullets' ? dynamicBullets : false,
			clickable: true,
		},
	} );

	return (
		<div
			{ ...blockProps }
			data-swiper-settings={ swiperSettings }
			{ ...( lightboxDevices && {
				'data-slide-lightbox': lightboxDevices,
			} ) }
		>
			<div className="swiper" role="region" aria-label="Image Slider">
				<div className="swiper-wrapper">
					{ images.map( ( item ) => (
						<div key={ item.id } className={ `swiper-slide` }>
							<div className="gslider-image-slider-content-wrapper">
								<div
									className="gslider-image-item"
									data-hover-effect={ imageLinkHoverEffect }
								>
									{ /* eslint-disable-next-line no-nested-ternary */ }
									{ isExternalVideo( item ) ? (
										<div
											className="gslider-embed-video"
											data-embed-type={ item.videoSource }
											data-embed-id={
												item.videoExternalId
											}
										>
											{ /* Facade only, view.js loads the player iframe on play click */ }
											<img
												className="gslider-embed-video-poster"
												src={ item.url }
												alt={
													item.alt ||
													`video ${
														images.indexOf( item ) +
														1
													}`
												}
												loading={
													enableLazyLoad
														? 'lazy'
														: undefined
												}
											/>
											<button
												type="button"
												className="gslider-embed-video-play"
												aria-label="Play video"
											></button>
										</div>
									) : lightboxDevices ? (
										<a
											href={ item.url }
											data-fslightbox={ blockId }
											data-caption={ item.caption }
											className="gslider-image-link"
											{ ...( linkOnLightboxOff &&
												item.link && {
													'data-image-link':
														item.link,
													'data-image-link-target':
														imageLinkTarget,
													'data-image-link-rel':
														imageLinkRel,
												} ) }
										>
											<img
												src={ item.url }
												alt={
													item.alt ||
													`image ${
														images.indexOf( item ) +
														1
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
											{ enableimageLinks && item.link ? (
												<a
													href={ item.link }
													target={ imageLinkTarget }
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
									src={ navigationArrowsIconRightImageUrl }
									alt={ navigationArrowsIconRightImageAlt }
								/>
							) : (
								renderSVG( navigationArrowsIconRight )
							) }
						</div>
					</div>
				) }

			{ anyPaginationEnabled && paginationPositionType === 'outside' && (
				<>
					<div
						className={ `swiper-pagination swiper-pagination-image-slider${
							blockId ? ` swiper-pagination-${ blockId }` : ''
						}` }
						aria-label="Carousel pagination"
					></div>
				</>
			) }
		</div>
	);
}
