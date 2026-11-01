import { RichText, useBlockProps } from '@wordpress/block-editor';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';

export default function Save( { attributes } ) {
	const {
		blockId,
		sliderItems,
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

		showSubTitle,
		showTitle,
		showDescription,
		showButton,
		showNavigation,
		showPagination,
		paginationPositionType,
		subTitleHtmlTag,
		titleHtmlTag,
		descriptionHtmlTag,
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
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `gslider-base-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination?.Desktop ||
			showPagination?.Tablet ||
			showPagination?.Mobile
				? 'has-pagination'
				: ''
		}`,
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
			// Patterns keep blockId empty, so fall back to an unscoped selector.
			el: blockId
				? `.${ blockId } .swiper-pagination-base-slider`
				: '.swiper-pagination-base-slider',
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
		<div { ...blockProps } data-swiper-settings={ swiperSettings }>
			<div className="swiper">
				<div className="swiper-wrapper">
					{ sliderItems.map( ( item ) => (
						<div
							key={ item.id }
							className={ `swiper-slide ${
								sliderType === 'slider' ? 'slide-mode' : ''
							}` }
						>
							<div
								className={ `gslider-content-wrapper ${ item.id } ${ globalClass }` }
								{ ...( globalID && { id: globalID } ) }
							>
								<div className="gslider-content-inner-wrapper">
									<div className="gslider-list-item">
										<div className="gslider-list-content">
											{ showSubTitle && item.subTitle && (
												<div className="gslider-subtitle-wrapper">
													<RichText.Content
														tagName={
															subTitleHtmlTag
														}
														className="gslider-subtitle"
														value={ item.subTitle }
													/>
												</div>
											) }
											{ showTitle && item.title && (
												<div className="gslider-title-wrapper">
													<RichText.Content
														tagName={ titleHtmlTag }
														className="gslider-title"
														value={ item.title }
													/>
												</div>
											) }
											{ showDescription &&
												item.description && (
													<div className="gslider-description-wrapper">
														<RichText.Content
															tagName={
																descriptionHtmlTag
															}
															className="gslider-description"
															value={
																item.description
															}
														/>
													</div>
												) }
											{ showButton && (
												<div className="gslider-btn-wrapper">
													<div className="gslider-btn-inner-wrapper">
														<>
															{ item.primaryButtonLink ? (
																// eslint-disable-next-line react/jsx-no-target-blank
																<a
																	className="gslider-btn primary-btn"
																	href={
																		item.primaryButtonLink
																	}
																	target={
																		item.primaryButtonTargetLink
																			? '_blank'
																			: undefined
																	}
																	rel={ [
																		item.primaryButtonNofollow &&
																			'nofollow',
																		item.primaryButtonSponsored &&
																			'sponsored',
																		item.primaryButtonTargetLink &&
																			'noopener noreferrer',
																	]
																		.filter(
																			Boolean
																		)
																		.join(
																			' '
																		) }
																>
																	<RichText.Content
																		value={
																			item.primaryButtonText
																		}
																	/>
																</a>
															) : (
																<RichText.Content
																	value={
																		item.primaryButtonText
																	}
																	className="gslider-btn primary-btn"
																/>
															) }

															{ item.secondaryButtonSwitcher &&
																( item.secondaryButtonLink ? (
																	// eslint-disable-next-line react/jsx-no-target-blank
																	<a
																		className="gslider-btn secondary-btn"
																		href={
																			item.secondaryButtonLink
																		}
																		target={
																			item.secondaryButtonTargetLink
																				? '_blank'
																				: undefined
																		}
																		rel={ [
																			item.secondaryButtonNofollow &&
																				'nofollow',
																			item.secondaryButtonSponsored &&
																				'sponsored',
																			item.secondaryButtonTargetLink &&
																				'noopener noreferrer',
																		]
																			.filter(
																				Boolean
																			)
																			.join(
																				' '
																			) }
																	>
																		<RichText.Content
																			value={
																				item.secondaryButtonText
																			}
																		/>
																	</a>
																) : (
																	<RichText.Content
																		value={
																			item.secondaryButtonText
																		}
																		className="gslider-btn secondary-btn"
																	/>
																) ) }
														</>
													</div>
												</div>
											) }
										</div>
									</div>
								</div>
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
								className="swiper-pagination swiper-pagination-base-slider"
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
						className={ `swiper-pagination swiper-pagination-base-slider${
							blockId ? ` swiper-pagination-${ blockId }` : ''
						}` }
						aria-label="Carousel pagination"
					></div>
				</>
			) }
		</div>
	);
}
