import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';
import { renderShapeDivider } from '@Constants/shapeDividers';

export default function Save( { attributes } ) {
	const {
		blockId,
		sliderType,
		carouselPerColumn,
		carouselPerColumnGap,
		speed,
		autoplay,
		autoplayDelay,
		enableAutoplayProgress,
		autoplayProgressPosition,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		direction,
		carouselEffect,
		slideEffect,
		mousewheelControl,
		keyboardNavigation,
		enableHashNavigation,
		paginationType,
		dynamicBullets,
		enableContinuousMarquee,
		marqueeSpeed,
		marqueePauseOnHover,

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

		enableTopDivider,
		topDividerShape,
		enableBottomDivider,
		bottomDividerShape,
		enableSlideLightbox,
		enableCursorFollower,
		cursorFollowerType,
		cursorFollowerLeftIcon,
		cursorFollowerRightIcon,
		cursorFollowerLeftImageUrl,
		cursorFollowerLeftImageAlt,
		cursorFollowerRightImageUrl,
		cursorFollowerRightImageAlt,
		cursorFollowerDirectionalText,
		cursorFollowerText,
		cursorFollowerLeftText,
		cursorFollowerRightText,
	} = attributes;

	const marqueeEnabled = {
		Mobile: !! enableContinuousMarquee?.Mobile,
		Tablet: !! enableContinuousMarquee?.Tablet,
		Desktop: !! enableContinuousMarquee?.Desktop,
	};
	const anyMarqueeEnabled =
		marqueeEnabled.Mobile ||
		marqueeEnabled.Tablet ||
		marqueeEnabled.Desktop;

	// Only output marquee classes when enabled, so markup of existing blocks stays the same
	const marqueeClasses = [ 'Desktop', 'Tablet', 'Mobile' ]
		.filter( ( device ) => marqueeEnabled[ device ] )
		.flatMap( ( device ) => {
			const slug = device.toLowerCase();
			return marqueePauseOnHover?.[ device ] === false
				? [ `gslider-marquee-${ slug }` ]
				: [
						`gslider-marquee-${ slug }`,
						`gslider-marquee-pause-${ slug }`,
				  ];
		} )
		.join( ' ' );

	const blockProps = useBlockProps.save( {
		className: `gslider-flexi-content-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination?.Desktop ||
			showPagination?.Tablet ||
			showPagination?.Mobile
				? 'has-pagination'
				: ''
		}${ marqueeClasses ? ` ${ marqueeClasses }` : '' }`,
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'swiper-wrapper gslider-swiper-wrapper',
	} );

	/**
	 * Get the autoplay settings of a breakpoint.
	 * Marquee lists all options, Swiper drops the defaults when it switches from autoplay false.
	 *
	 * @param {string} device - Desktop, Tablet or Mobile.
	 * @return {Object|boolean} Autoplay settings.
	 */
	const getBreakpointAutoplay = ( device ) => {
		if ( marqueeEnabled[ device ] ) {
			return {
				delay: 0,
				waitForTransition: true,
				pauseOnMouseEnter: false,
				disableOnInteraction: false,
				reverseDirection,
			};
		}
		return autoplay ? { delay: autoplayDelay?.[ device ] || 1000 } : false;
	};

	const sliderEffect =
		sliderType === 'carousel' ? carouselEffect : slideEffect;

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

	// Only output the progress bar when enabled, so markup of existing blocks stays the same
	const showAutoplayProgress =
		autoplay &&
		( enableAutoplayProgress?.Desktop ||
			enableAutoplayProgress?.Tablet ||
			enableAutoplayProgress?.Mobile );
	// Per device show/hide is handled in styling.js.
	const anyTopDivider =
		enableTopDivider?.Desktop ||
		enableTopDivider?.Tablet ||
		enableTopDivider?.Mobile;
	const anyBottomDivider =
		enableBottomDivider?.Desktop ||
		enableBottomDivider?.Tablet ||
		enableBottomDivider?.Mobile;

	// Only output the attribute when enabled, so markup of existing blocks stays the same
	const lightboxDevices = [ 'Desktop', 'Tablet', 'Mobile' ]
		.filter( ( device ) => enableSlideLightbox?.[ device ] === true )
		.join( ' ' );
	const cursorFollowerDevices = [ 'Desktop', 'Tablet', 'Mobile' ]
		.filter( ( device ) => enableCursorFollower?.[ device ] === true )
		.join( ' ' );

	// Configure Swiper settings for frontend rendering
	const swiperSettings = JSON.stringify( {
		// Marquee needs the slide effect, other effects can not move in a line
		effect: anyMarqueeEnabled ? 'slide' : sliderEffect,

		// Responsive breakpoints for Desktop, Tablet, and Mobile
		breakpoints: {
			0: {
				...( sliderType === 'carousel' && {
					slidesPerView: carouselPerColumn?.Mobile || 1,
					spaceBetween: carouselPerColumnGap?.Mobile || 0,
				} ),
				speed: marqueeEnabled.Mobile
					? marqueeSpeed?.Mobile || 5000
					: speed?.Mobile || 800,
				autoplay: getBreakpointAutoplay( 'Mobile' ),
				navigation: { enabled: navigationEnabled.Mobile },
				pagination: { enabled: paginationEnabled.Mobile },
			},
			768: {
				...( sliderType === 'carousel' && {
					slidesPerView: carouselPerColumn?.Tablet || 2,
					spaceBetween: carouselPerColumnGap?.Tablet ?? 20,
				} ),
				speed: marqueeEnabled.Tablet
					? marqueeSpeed?.Tablet || 5000
					: speed?.Tablet || 800,
				autoplay: getBreakpointAutoplay( 'Tablet' ),
				navigation: { enabled: navigationEnabled.Tablet },
				pagination: { enabled: paginationEnabled.Tablet },
			},
			1025: {
				...( sliderType === 'carousel' && {
					slidesPerView: carouselPerColumn?.Desktop || 2,
					spaceBetween: carouselPerColumnGap?.Desktop ?? 20,
				} ),
				speed: marqueeEnabled.Desktop
					? marqueeSpeed?.Desktop || 5000
					: speed?.Desktop || 800,
				autoplay: getBreakpointAutoplay( 'Desktop' ),
				navigation: { enabled: navigationEnabled.Desktop },
				pagination: { enabled: paginationEnabled.Desktop },
			},
		},

		...( direction === 'vertical' && { direction: 'vertical' } ),
		// Vertical slides use the fixed height, autoHeight does not work with it
		...( layoutHeightSwitcher === 'adapt' &&
			direction !== 'vertical' && {
				autoHeight: true,
			} ),

		// Common settings
		loop: anyMarqueeEnabled || infiniteLoop,
		autoplay:
			autoplay || anyMarqueeEnabled
				? {
						pauseOnMouseEnter: anyMarqueeEnabled
							? false
							: pauseOnHover,
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

		// replaceState keeps autoplay from filling the browser history
		...( enableHashNavigation && {
			hashNavigation: { watchState: true, replaceState: true },
		} ),

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
				next: {
					translate:
						direction === 'vertical'
							? [ 0, '100%', 0 ]
							: [ '100%', 0, 0 ],
				},
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
			{ ...( cursorFollowerDevices && {
				'data-cursor-follower': cursorFollowerDevices,
			} ) }
		>
			<div
				className={ `swiper ${ globalClass }` }
				{ ...( globalID && { id: globalID } ) }
			>
				<div { ...innerBlocksProps } />

				{ cursorFollowerDevices && (
					<div className="gslider-cursor-follower" aria-hidden="true">
						{ ( ! cursorFollowerType ||
							cursorFollowerType === 'icon' ) && (
							<>
								<div className="gslider-cursor-icon gslider-cursor-left">
									{ renderSVG(
										cursorFollowerLeftIcon || 'arrow-left'
									) }
								</div>
								<div className="gslider-cursor-icon gslider-cursor-right">
									{ renderSVG(
										cursorFollowerRightIcon || 'arrow-right'
									) }
								</div>
							</>
						) }
						{ cursorFollowerType === 'image' && (
							<>
								{ cursorFollowerLeftImageUrl && (
									<div className="gslider-cursor-image gslider-cursor-left">
										<img
											src={ cursorFollowerLeftImageUrl }
											alt={
												cursorFollowerLeftImageAlt ||
												'Previous'
											}
										/>
									</div>
								) }
								{ cursorFollowerRightImageUrl && (
									<div className="gslider-cursor-image gslider-cursor-right">
										<img
											src={ cursorFollowerRightImageUrl }
											alt={
												cursorFollowerRightImageAlt ||
												'Next'
											}
										/>
									</div>
								) }
							</>
						) }
						{ cursorFollowerType === 'text' &&
							( cursorFollowerDirectionalText ? (
								<>
									<span className="gslider-cursor-text gslider-cursor-left">
										{ cursorFollowerLeftText || 'PREV' }
									</span>
									<span className="gslider-cursor-text gslider-cursor-right">
										{ cursorFollowerRightText || 'NEXT' }
									</span>
								</>
							) : (
								<span className="gslider-cursor-text">
									{ cursorFollowerText || 'DRAG' }
								</span>
							) ) }
					</div>
				) }

				{ showAutoplayProgress && (
					<div
						className={ `gslider-autoplay-progress ${ autoplayProgressPosition }` }
						aria-hidden="true"
					>
						<div className="gslider-autoplay-progress-fill"></div>
					</div>
				) }
				{ anyTopDivider &&
					renderShapeDivider( 'top', topDividerShape ) }
				{ anyBottomDivider &&
					renderShapeDivider( 'bottom', bottomDividerShape ) }

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
