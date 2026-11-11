import { RichText, useBlockProps } from '@wordpress/block-editor';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';
import { normalizeContentOrder } from './content-order';

/**
 * Saves the Testimonial Slider block's static markup and Swiper configuration.
 *
 * @param {Object} props            Save component props.
 * @param {Object} props.attributes Current block attributes.
 * @return {Element} Rendered block save element.
 */
export default function Save( { attributes } ) {
	const {
		blockId,
		authorPlaceholderUrl,
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

		showAuthorName,
		showAuthorDesignation,
		showTestimonialTitle,
		showTestimonialText,
		showAuthorImage,
		showRating,
		showRatingNumber,
		showQuoteIcon,
		quoteIconAlign,
		quoteIcon,
		quoteImageUrl,
		quoteImageAlt,
		showNavigation,
		showPagination,
		paginationPositionType,
		authorNameHtmlTag,
		authorDesignationHtmlTag,
		testimonialTitleHtmlTag,
		testimonialTextHtmlTag,
		globalID,
		globalClass,
		navigationArrowPositionType,
		navigationArrowPosition,

		navigationArrowsIconSwitcher,
		navigationArrowsIconLeftAlign,
		navigationArrowsIconLeft,
		navigationArrowsIconLeftImageUrl,

		navigationArrowsIconRightAlign,
		navigationArrowsIconRight,
		navigationArrowsIconRightImageUrl,

		direction,
		layoutHeightSwitcher,
		contentOrder,
	} = attributes;

	const normalizedContentOrder = normalizeContentOrder( contentOrder );

	const trimmedGlobalClass = globalClass?.trim();

	const blockProps = useBlockProps.save( {
		className: `gslider-testimonial-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination?.Desktop ||
			showPagination?.Tablet ||
			showPagination?.Mobile
				? 'has-pagination'
				: ''
		}${ trimmedGlobalClass ? ` ${ trimmedGlobalClass }` : '' }`,
		...( globalID ? { id: globalID } : {} ),
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

	const swiperSettings = JSON.stringify( {
		effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
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

		...( direction === 'vertical' && { direction: 'vertical' } ),
		// Vertical slides use the fixed height, autoHeight does not work with it
		...( layoutHeightSwitcher === 'adapt' &&
			direction !== 'vertical' && {
				autoHeight: true,
			} ),

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
				? `.${ blockId } .swiper-pagination-testimonial-slider`
				: '.swiper-pagination-testimonial-slider',
			type: paginationType,
			dynamicBullets:
				paginationType === 'bullets' ? dynamicBullets : false,
			clickable: true,
		},

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

	const authorImagePlaceholder = authorPlaceholderUrl;

	const renderRatingIcons = ( item ) => {
		const { ratingNumber, ratingIconAlign } = item;
		const ratingImageUrl = item.ratingImage?.url;
		const ratingImageAlt = item.ratingImage?.alt;
		const rating = Math.max(
			0,
			Math.min( 5, parseFloat( ratingNumber || 0 ) )
		);

		if ( ratingIconAlign === 'none' || rating === 0 ) {
			return null;
		}

		if ( ratingIconAlign === 'image' && ratingImageUrl ) {
			const fullCount = Math.round( rating );
			const icons = [];

			for ( let i = 0; i < fullCount; i++ ) {
				icons.push(
					<div key={ i } className="gslider-testimonial-rating-icon">
						<img src={ ratingImageUrl } alt={ ratingImageAlt } />
					</div>
				);
			}

			return icons;
		}

		if ( ratingIconAlign === 'icon' ) {
			const fullStars = Math.floor( rating );
			const fraction = rating - fullStars;
			const emptyStars = 5 - fullStars - ( fraction > 0 ? 1 : 0 );
			const fullStarPath =
				'M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Z';
			const emptyStarPath =
				'M49.62,18.85a1.9,1.9,0,0,0-1.54-1.29L33.4,15.38,26.84,1.63a1.92,1.92,0,0,0-3.47,0L16.86,15.34,2.13,17.56a1.92,1.92,0,0,0-1.08,3.25L11.73,31.53,9.21,46.73A1.93,1.93,0,0,0,11.1,49a2,2,0,0,0,.92-.23L25.07,41.6l13.11,7.14a1.93,1.93,0,0,0,2.82-2L38.46,31.6l10.7-10.79A1.92,1.92,0,0,0,49.62,18.85ZM37,30.19a1.94,1.94,0,0,0-.53,1.67L39,46.9l-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.5-15a1.94,1.94,0,0,0-.53-1.67L2.57,19.51l14.59-2.19a2,2,0,0,0,1.45-1.08L25.08,2.58,31.6,16.25a2,2,0,0,0,1.45,1.07l14.58,2.19Z';
			const stars = [];

			for ( let i = 0; i < fullStars; i++ ) {
				stars.push(
					<div
						key={ `full-${ i }` }
						className="gslider-testimonial-rating-icon"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 49.23 48.44"
							className="gslider-testimonial-rating-star-svg"
						>
							<path
								d={ fullStarPath }
								transform="translate(-0.39 -0.78)"
							/>
						</svg>
					</div>
				);
			}

			if ( fraction > 0 ) {
				stars.push(
					<div
						key="partial"
						className="gslider-testimonial-rating-icon gslider-testimonial-star-partial-wrap"
					>
						<div className="gslider-testimonial-star-partial-container">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 49.23 48.44"
								className="gslider-testimonial-rating-star-svg"
							>
								<path
									d={ emptyStarPath }
									transform="translate(-0.49 -0.53)"
								/>
							</svg>
							<div
								className="gslider-testimonial-star-partial-fill"
								style={ { width: `${ fraction * 100 }%` } }
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 49.23 48.44"
									className="gslider-testimonial-rating-star-svg"
								>
									<path
										d={ fullStarPath }
										transform="translate(-0.39 -0.78)"
									/>
								</svg>
							</div>
						</div>
					</div>
				);
			}

			for ( let i = 0; i < emptyStars; i++ ) {
				stars.push(
					<div
						key={ `empty-${ i }` }
						className="gslider-testimonial-rating-icon empty"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 49.23 48.44"
							className="gslider-testimonial-rating-star-svg"
						>
							<path
								d={ emptyStarPath }
								transform="translate(-0.49 -0.53)"
							/>
						</svg>
					</div>
				);
			}

			return stars;
		}

		return null;
	};

	return (
		<div { ...blockProps } data-swiper-settings={ swiperSettings }>
			<div className="swiper">
				<div className="swiper-wrapper">
					{ sliderItems.map( ( item ) => {
						const renderGroupMap = {
							quote:
								showQuoteIcon && quoteIconAlign !== 'none' ? (
									<div
										key="quote"
										className="gslider-testimonial-quote-icon-wrapper"
									>
										{ quoteIconAlign === 'icon' &&
											renderSVG( quoteIcon ) }
										{ quoteIconAlign === 'image' &&
											quoteImageUrl && (
												<img
													src={ quoteImageUrl }
													alt={ quoteImageAlt }
												/>
											) }
									</div>
								) : null,

							content: (
								<div
									key="content"
									className="gslider-testimonial-content-group"
								>
									{ showTestimonialTitle &&
										item.testimonialTitle && (
											<div className="gslider-testimonial-title-wrapper">
												<RichText.Content
													tagName={
														testimonialTitleHtmlTag
													}
													className="gslider-testimonial-title"
													value={
														item.testimonialTitle
													}
												/>
											</div>
										) }
									{ showTestimonialText &&
										item.testimonialText && (
											<div className="gslider-testimonial-text-wrapper">
												<RichText.Content
													tagName={
														testimonialTextHtmlTag
													}
													className="gslider-testimonial-text"
													value={
														item.testimonialText
													}
												/>
											</div>
										) }
								</div>
							),

							rating: showRating ? (
								<div
									key="rating"
									className="gslider-testimonial-rating-wrapper"
								>
									<div className="gslider-testimonial-rating-inner">
										<div className="gslider-testimonial-rating-wrap">
											{ renderRatingIcons( item ) }
										</div>
										{ showRatingNumber && (
											<div className="gslider-testimonial-rating-number">
												(
												{ Math.max(
													0,
													Math.min(
														5,
														parseFloat(
															item.ratingNumber ||
																0
														)
													)
												) }
												)
											</div>
										) }
									</div>
								</div>
							) : null,

							author: (
								<div
									key="author"
									className="gslider-author-info-group"
								>
									{ showAuthorImage &&
										( item.authorImage?.url ||
											authorImagePlaceholder ) && (
											<div className="gslider-testimonial-author-image-wrapper">
												<img
													src={
														item.authorImage?.url ||
														authorImagePlaceholder
													}
													alt={
														item.authorImage?.alt ||
														'Author'
													}
													className="gslider-testimonial-author-image"
												/>
											</div>
										) }
									<div className="gslider-author-meta">
										{ showAuthorName && item.authorName && (
											<div className="gslider-testimonial-author-name-wrapper">
												<RichText.Content
													tagName={
														authorNameHtmlTag
													}
													className="gslider-testimonial-author-name"
													value={ item.authorName }
												/>
											</div>
										) }
										{ showAuthorDesignation &&
											item.authorDesignation && (
												<div className="gslider-testimonial-author-designation-wrapper">
													<RichText.Content
														tagName={
															authorDesignationHtmlTag
														}
														className="gslider-testimonial-author-designation"
														value={
															item.authorDesignation
														}
													/>
												</div>
											) }
									</div>
								</div>
							),
						};

						return (
							<div
								key={ item.id }
								className={ `swiper-slide ${
									sliderType === 'slider' ? 'slide-mode' : ''
								}` }
							>
								<div
									className={ `gslider-content-wrapper ${ item.id }` }
								>
									<div className="gslider-content-inner-wrapper">
										{ normalizedContentOrder.map(
											( groupKey ) =>
												renderGroupMap[ groupKey ] ||
												null
										) }
									</div>
								</div>
							</div>
						);
					} ) }
				</div>
				{ anyNavigationEnabled &&
					! navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'inside' && (
						<>
							<div
								className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<button
									type="button"
									className="swiper-button-prev"
									aria-label="Previous slide"
								></button>
								<button
									type="button"
									className="swiper-button-next"
									aria-label="Next slide"
								></button>
							</div>
						</>
					) }

				{ anyNavigationEnabled &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'inside' && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<button
								type="button"
								className="swiper-button-prev"
								aria-label="Previous slide"
							>
								{ navigationArrowsIconLeftAlign === 'image' &&
								navigationArrowsIconLeftImageUrl ? (
									<img
										src={ navigationArrowsIconLeftImageUrl }
										alt=""
										aria-hidden="true"
									/>
								) : (
									<span aria-hidden="true">
										{ renderSVG(
											navigationArrowsIconLeft
										) }
									</span>
								) }
							</button>
							<button
								type="button"
								className="swiper-button-next"
								aria-label="Next slide"
							>
								{ navigationArrowsIconRightAlign === 'image' &&
								navigationArrowsIconRightImageUrl ? (
									<img
										src={
											navigationArrowsIconRightImageUrl
										}
										alt=""
										aria-hidden="true"
									/>
								) : (
									<span aria-hidden="true">
										{ renderSVG(
											navigationArrowsIconRight
										) }
									</span>
								) }
							</button>
						</div>
					) }

				{ anyPaginationEnabled &&
					paginationPositionType === 'inside' && (
						<>
							<div
								className="swiper-pagination swiper-pagination-testimonial-slider"
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
							<button
								type="button"
								className="swiper-button-prev"
								aria-label="Previous slide"
							></button>
							<button
								type="button"
								className="swiper-button-next"
								aria-label="Next slide"
							></button>
						</div>
					</>
				) }

			{ anyNavigationEnabled &&
				navigationArrowsIconSwitcher &&
				navigationArrowPositionType === 'outside' && (
					<div
						className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
					>
						<button
							type="button"
							className="swiper-button-prev"
							aria-label="Previous slide"
						>
							{ navigationArrowsIconLeftAlign === 'image' &&
							navigationArrowsIconLeftImageUrl ? (
								<img
									src={ navigationArrowsIconLeftImageUrl }
									alt=""
									aria-hidden="true"
								/>
							) : (
								<span aria-hidden="true">
									{ renderSVG( navigationArrowsIconLeft ) }
								</span>
							) }
						</button>
						<button
							type="button"
							className="swiper-button-next"
							aria-label="Next slide"
						>
							{ navigationArrowsIconRightAlign === 'image' &&
							navigationArrowsIconRightImageUrl ? (
								<img
									src={ navigationArrowsIconRightImageUrl }
									alt=""
									aria-hidden="true"
								/>
							) : (
								<span aria-hidden="true">
									{ renderSVG( navigationArrowsIconRight ) }
								</span>
							) }
						</button>
					</div>
				) }
			{ anyPaginationEnabled && paginationPositionType === 'outside' && (
				<>
					<div
						className={ `swiper-pagination swiper-pagination-testimonial-slider${
							blockId ? ` swiper-pagination-${ blockId }` : ''
						}` }
						aria-label="Carousel pagination"
					></div>
				</>
			) }
		</div>
	);
}
