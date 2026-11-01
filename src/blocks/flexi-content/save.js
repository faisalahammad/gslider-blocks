import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';

export default function Save( { attributes } ) {
	const {
		blockId,
		sliderType,
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
		slideEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,

		showNavigation,
		showPagination,
		paginationPositionType,

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

		layoutHeightSwitcher,
		enableSlideLightbox,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `gslider-flexi-content-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination?.Desktop ||
			showPagination?.Tablet ||
			showPagination?.Mobile
				? 'has-pagination'
				: ''
		}`,
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'swiper-wrapper gslider-swiper-wrapper',
	} );

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
		.filter( ( device ) => enableSlideLightbox?.[ device ] === true )
		.join( ' ' );

	// Configure Swiper settings for frontend rendering
	const swiperSettings = JSON.stringify( {
		effect: sliderType === 'carousel' ? carouselEffect : slideEffect,

		// Responsive breakpoints for Desktop, Tablet, and Mobile
		breakpoints: {
			0: {
				...( sliderType === 'carousel' && {
					slidesPerView: carouselPerColumn?.Mobile || 1,
					spaceBetween: carouselPerColumnGap?.Mobile || 0,
				} ),
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
				...( sliderType === 'carousel' && {
					slidesPerView: carouselPerColumn?.Tablet || 2,
					spaceBetween: carouselPerColumnGap?.Tablet ?? 20,
				} ),
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
				...( sliderType === 'carousel' && {
					slidesPerView: carouselPerColumn?.Desktop || 2,
					spaceBetween: carouselPerColumnGap?.Desktop ?? 20,
				} ),
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

		...( layoutHeightSwitcher === 'adapt' && {
			autoHeight: true,
		} ),

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
			el: `.${ blockId } .swiper-pagination-flexi-content`,
			type: paginationType,
			dynamicBullets:
				paginationType === 'bullets' ? dynamicBullets : false,
			clickable: true,
		},

		// Creative effect settings if needed
		...( slideEffect === 'creative' && {
			creativeEffect: {
				prev: { shadow: true, translate: [ 0, 0, -400 ] },
				next: { translate: [ '100%', 0, 0 ] },
			},
		} ),
	} );

	return (
		<div
			{ ...blockProps }
			data-swiper-settings={ swiperSettings }
			{ ...( lightboxDevices && {
				'data-slide-lightbox': lightboxDevices,
			} ) }
		>
			<div
				className={ `swiper ${ globalClass }` }
				{ ...( globalID && { id: globalID } ) }
			>
				<div { ...innerBlocksProps } />

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
								className="swiper-pagination swiper-pagination-flexi-content"
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
						className={ `swiper-pagination swiper-pagination-flexi-content swiper-pagination-${ blockId }` }
						aria-label="Carousel pagination"
					></div>
				</>
			) }
		</div>
	);
}
