/* eslint-disable no-unused-vars, no-nested-ternary, jsdoc/require-param */
/**
 * Base Slider Block - Style Generation
 * Returns Dynamic Generated CSS
 */

/**
 * Generate block styles from attributes
 * @param {Object} attributes - Block attributes
 * @return {string} CSS string
 */
const generateBaseSliderStyle = ( attributes ) => {
	const {
		blockId,
		deviceType,
		sliderItems,
		blockStyle,
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
		slideEffect,
		carouselEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,

		/** Start Show/Hide Elements */
		showAuthorName,
		showTestimonialTitle,
		showTestimonialText,
		showNavigation,
		showPagination,
		paginationPositionType,
		/** End Show/Hide Elements */

		/** Start Layout & Content Setting */
		direction,
		layoutHeightSwitcher,
		layoutHeight,
		layoutHeightUnits,
		verticalHeight,
		verticalHeightUnits,
		contentWidth,
		contentWidthUnits,
		contentAlignment,
		contentVerticalAlignment,
		contentHorizontalAlignment,
		authorNameHtmlTag,
		testimonialTitleHtmlTag,
		testimonialTextHtmlTag,
		/** End Layout & Content Setting */

		/** Start Content Padding */
		contentPaddingUnits,
		contentPaddingDesktop,
		contentPaddingDesktopCssStyle,
		contentPaddingTablet,
		contentPaddingTabletCssStyle,
		contentPaddingMobile,
		contentPaddingMobileCssStyle,
		contentPaddingLink,
		/** End Content Padding */

		/** Start Author Name Typography, Color, Margin & Padding */
		authorNameFontFamily,
		authorNameFontSize,
		authorNameFontSizeUnits,
		authorNameFontWeight,
		authorNameFontStyle,
		authorNameTextTransform,
		authorNameTextDecoration,
		authorNameLineHeight,
		authorNameLineHeightUnits,
		authorNameLetterSpacing,
		authorNameLetterSpacingUnits,
		authorNameWordSpacing,
		authorNameWordSpacingUnits,

		authorNameColorSwitcher,
		authorNameColor,
		authorNameColorHover,

		authorNameMarginUnits,
		authorNameDesktopMargin,
		authorNameDesktopMarginCssStyle,
		authorNameTabletMargin,
		authorNameTabletMarginCssStyle,
		authorNameMobileMargin,
		authorNameMobileMarginCssStyle,
		authorNameMarginLink,

		authorNamePaddingUnits,
		authorNameDesktopPadding,
		authorNameDesktopPaddingCssStyle,
		authorNameTabletPadding,
		authorNameTabletPaddingCssStyle,
		authorNameMobilePadding,
		authorNameMobilePaddingCssStyle,
		authorNamePaddingLink,
		/** End Author Name Typography, Color, Margin & Padding */

		/** Start Author Designation Typography, Color, Margin & Padding */
		authorDesignationFontFamily,
		authorDesignationFontSize,
		authorDesignationFontSizeUnits,
		authorDesignationFontWeight,
		authorDesignationFontStyle,
		authorDesignationTextTransform,
		authorDesignationTextDecoration,
		authorDesignationLineHeight,
		authorDesignationLineHeightUnits,
		authorDesignationLetterSpacing,
		authorDesignationLetterSpacingUnits,
		authorDesignationWordSpacing,
		authorDesignationWordSpacingUnits,

		authorDesignationColorSwitcher,
		authorDesignationColor,
		authorDesignationColorHover,

		authorDesignationMarginUnits,
		authorDesignationDesktopMargin,
		authorDesignationDesktopMarginCssStyle,
		authorDesignationTabletMargin,
		authorDesignationTabletMarginCssStyle,
		authorDesignationMobileMargin,
		authorDesignationMobileMarginCssStyle,
		authorDesignationMarginLink,

		authorDesignationPaddingUnits,
		authorDesignationDesktopPadding,
		authorDesignationDesktopPaddingCssStyle,
		authorDesignationTabletPadding,
		authorDesignationTabletPaddingCssStyle,
		authorDesignationMobilePadding,
		authorDesignationMobilePaddingCssStyle,
		authorDesignationPaddingLink,
		/** End Author Designation Typography, Color, Margin & Padding */

		/** Start Testimonial Title Typography, Color, Margin & Padding */
		testimonialTitleFontFamily,
		testimonialTitleFontSize,
		testimonialTitleFontSizeUnits,
		testimonialTitleFontWeight,
		testimonialTitleFontStyle,
		testimonialTitleTextTransform,
		testimonialTitleTextDecoration,
		testimonialTitleLineHeight,
		testimonialTitleLineHeightUnits,
		testimonialTitleLetterSpacing,
		testimonialTitleLetterSpacingUnits,
		testimonialTitleWordSpacing,
		testimonialTitleWordSpacingUnits,

		testimonialTitleColorSwitcher,
		testimonialTitleColor,
		testimonialTitleColorHover,

		testimonialTitleMarginUnits,
		testimonialTitleDesktopMargin,
		testimonialTitleDesktopMarginCssStyle,
		testimonialTitleTabletMargin,
		testimonialTitleTabletMarginCssStyle,
		testimonialTitleMobileMargin,
		testimonialTitleMobileMarginCssStyle,
		testimonialTitleMarginLink,

		testimonialTitlePaddingUnits,
		testimonialTitleDesktopPadding,
		testimonialTitleDesktopPaddingCssStyle,
		testimonialTitleTabletPadding,
		testimonialTitleTabletPaddingCssStyle,
		testimonialTitleMobilePadding,
		testimonialTitleMobilePaddingCssStyle,
		testimonialTitlePaddingLink,
		/** End Testimonial Title Typography, Color, Margin & Padding */

		/** Start Author Image Style */
		authorImageSize,
		authorImageSizeUnits,

		authorImageBorder,
		authorImageBorderColor,
		authorImageBorderHoverColor,

		authorImageDesktopBorderWidthCssStyle,
		authorImageTabletBorderWidthCssStyle,
		authorImageMobileBorderWidthCssStyle,

		authorImageDesktopBorderRadiusCssStyle,
		authorImageTabletBorderRadiusCssStyle,
		authorImageMobileBorderRadiusCssStyle,

		authorImageDesktopMarginCssStyle,
		authorImageTabletMarginCssStyle,
		authorImageMobileMarginCssStyle,

		authorImageDesktopPaddingCssStyle,
		authorImageTabletPaddingCssStyle,
		authorImageMobilePaddingCssStyle,
		/** End Author Image Style */

		/** Start Quote Icon Style */
		quoteIconAlign,
		quoteIcon,
		quoteImageUrl,
		quoteImageAlt,
		quoteImageID,

		quoteIconSize,
		quoteIconSizeUnits,

		quoteIconColorSwitcher,
		quoteIconColor,
		quoteIconHoverColor,

		quoteIconMarginUnits,
		quoteIconDesktopMarginCssStyle,
		quoteIconTabletMarginCssStyle,
		quoteIconMobileMarginCssStyle,

		quoteIconPaddingUnits,
		quoteIconDesktopPaddingCssStyle,
		quoteIconTabletPaddingCssStyle,
		quoteIconMobilePaddingCssStyle,

		quoteIconPositionSwitcher,
		quoteIconPositionTop,
		quoteIconPositionTopUnits,
		quoteIconPositionBottom,
		quoteIconPositionBottomUnits,
		quoteIconPositionLeft,
		quoteIconPositionLeftUnits,
		quoteIconPositionRight,
		quoteIconPositionRightUnits,
		quoteIconZIndex,

		quoteIconNormalBackgroundType,
		quoteIconNormalClassicColor,
		quoteIconNormalGradientColor,
		quoteIconNormalCustomGradientSwitcher,
		quoteIconNormalCustomGradientInputValue,
		quoteIconHoverBackgroundType,
		quoteIconHoverClassicColor,
		quoteIconHoverGradientColor,
		quoteIconHoverCustomGradientSwitcher,
		quoteIconHoverCustomGradientInputValue,

		quoteIconBorder,
		quoteIconBorderColorSwitcher,
		quoteIconBorderColor,
		quoteIconBorderHoverColor,
		quoteIconBorderUnits,
		quoteIconDesktopBorderCssStyle,
		quoteIconTabletBorderCssStyle,
		quoteIconMobileBorderCssStyle,

		quoteIconDesktopBorderRadiusCssStyle,
		quoteIconTabletBorderRadiusCssStyle,
		quoteIconMobileBorderRadiusCssStyle,

		quoteIconBoxShadowCssValue,
		quoteIconBoxShadowHoverCssValue,

		quoteIconOpacity,
		quoteIconRotate,
		quoteIconHoverRotate,
		/** End Quote Icon Style */

		/** Start Testimonial Text Typography, Color, Margin & Padding */
		testimonialTextFontFamily,
		testimonialTextFontSize,
		testimonialTextFontSizeUnits,
		testimonialTextFontWeight,
		testimonialTextFontStyle,
		testimonialTextTextTransform,
		testimonialTextTextDecoration,
		testimonialTextLineHeight,
		testimonialTextLineHeightUnits,
		testimonialTextLetterSpacing,
		testimonialTextLetterSpacingUnits,
		testimonialTextWordSpacing,
		testimonialTextWordSpacingUnits,

		testimonialTextColorSwitcher,
		testimonialTextColor,
		testimonialTextColorHover,

		testimonialTextMarginUnits,
		testimonialTextDesktopMargin,
		testimonialTextDesktopMarginCssStyle,
		testimonialTextTabletMargin,
		testimonialTextTabletMarginCssStyle,
		testimonialTextMobileMargin,
		testimonialTextMobileMarginCssStyle,
		testimonialTextMarginLink,

		testimonialTextPaddingUnits,
		testimonialTextDesktopPadding,
		testimonialTextDesktopPaddingCssStyle,
		testimonialTextTabletPadding,
		testimonialTextTabletPaddingCssStyle,
		testimonialTextMobilePadding,
		testimonialTextMobilePaddingCssStyle,
		testimonialTextPaddingLink,
		/** End Testimonial Text Typography, Color, Margin & Padding */

		/** Start Rating Style */
		ratingStarColor,
		ratingStarHoverColor,
		ratingEmptyStarColor,
		ratingEmptyStarHoverColor,
		ratingStarSize,
		ratingStarSizeUnits,
		ratingStarGap,
		ratingStarGapUnits,
		ratingNumberGap,
		ratingNumberGapUnits,

		ratingDesktopMarginCssStyle,
		ratingTabletMarginCssStyle,
		ratingMobileMarginCssStyle,

		ratingDesktopPaddingCssStyle,
		ratingTabletPaddingCssStyle,
		ratingMobilePaddingCssStyle,
		ratingPaddingLink,

		showRatingNumber,
		ratingNumberColor,
		ratingNumberHoverColor,
		ratingNumberFontFamily,
		ratingNumberFontSize,
		ratingNumberFontSizeUnits,
		ratingNumberFontWeight,
		ratingNumberFontStyle,
		ratingNumberTextTransform,
		ratingNumberTextDecoration,
		ratingNumberLineHeight,
		ratingNumberLineHeightUnits,
		ratingNumberLetterSpacing,
		ratingNumberLetterSpacingUnits,
		ratingNumberWordSpacing,
		ratingNumberWordSpacingUnits,
		/** End Rating Style */

		/** Start Navigation Custom Arrows */
		navigationArrowsIconSwitcher,
		navigationArrowsIconLeftAlign,
		navigationArrowsIconLeft,
		navigationArrowsIconLeftImageUrl,
		navigationArrowsIconLeftImageAlt,
		navigationArrowsIconLeftImageID,

		navigationArrowsIconRightAlign,
		navigationArrowsIconRight,
		navigationArrowsIconRightImageUrl,
		navigationArrowsIconRightImageAlt,
		navigationArrowsIconRightImageID,
		/** End Navigation Custom Arrows */

		/** Start Arrows Style */
		navigationArrowSize,
		navigationArrowSizeUnits,

		/** Start Arrows Color */
		navigationArrowColorSwitcher,
		navigationArrowColor,
		navigationArrowColorHover,
		/** End Arrows Color */

		/** Start Background */
		navigationArrowNormalBackgroundType,
		navigationArrowNormalClassicColor,
		navigationArrowNormalGradientColor,
		navigationArrowNormalCustomGradientSwitcher,
		navigationArrowNormalCustomGradientInputValue,
		navigationArrowHoverBackgroundType,
		navigationArrowHoverClassicColor,
		navigationArrowHoverGradientColor,
		navigationArrowHoverCustomGradientSwitcher,
		navigationArrowHoverCustomGradientInputValue,
		/** End Background */

		/** Start Arrows Dimensions */
		navigationArrowWidth,
		navigationArrowWidthUnits,
		navigationArrowHeight,
		navigationArrowHeightUnits,
		/** End Arrows Dimensions */

		/** Start Border */
		navigationArrowBorder,
		navigationArrowBorderColorSwitcher,
		navigationArrowBorderColor,
		navigationArrowBorderHoverColor,
		navigationArrowBorderUnits,
		navigationArrowDesktopBorder,
		navigationArrowDesktopBorderCssStyle,
		navigationArrowTabletBorder,
		navigationArrowTabletBorderCssStyle,
		navigationArrowMobileBorder,
		navigationArrowMobileBorderCssStyle,
		navigationArrowBorderLink,
		/** End Border */

		/** Start Border Radius */
		navigationArrowBorderRadiusUnits,
		navigationArrowDesktopBorderRadius,
		navigationArrowDesktopBorderRadiusCssStyle,
		navigationArrowTabletBorderRadius,
		navigationArrowTabletBorderRadiusCssStyle,
		navigationArrowMobileBorderRadius,
		navigationArrowMobileBorderRadiusCssStyle,
		navigationArrowBorderRadiusLink,
		/** End Border Radius */

		/** Start Box Shadow */
		navigationArrowBoxShadowValuesSwitcher,
		navigationArrowBoxShadowValues,
		navigationArrowBoxShadowCssValue,
		navigationArrowBoxShadowHoverValues,
		navigationArrowBoxShadowHoverCssValue,
		/** End Box Shadow */

		/** Start Position */
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowDirection,

		navigationArrowPositionTopOffset,
		navigationArrowPositionTopOffsetUnits,
		navigationArrowPositionLeftOffset,
		navigationArrowPositionLeftOffsetUnits,
		navigationArrowPositionRightOffset,
		navigationArrowPositionRightOffsetUnits,
		navigationArrowPositionBottomOffset,
		navigationArrowPositionBottomOffsetUnits,

		navigationArrowGap,
		navigationArrowGapUnits,

		navigationArrowPositionOutsidePadding,
		navigationArrowPositionOutsidePaddingUnits,
		/** End Position */

		/** Start Dots Margin */
		paginationDotsMarginUnits,
		paginationDotsDesktopMargin,
		paginationDotsDesktopMarginCssStyle,
		paginationDotsTabletMargin,
		paginationDotsTabletMarginCssStyle,
		paginationDotsMobileMargin,
		paginationDotsMobileMarginCssStyle,
		paginationDotsMarginLink,
		/** End Dots Margin */

		/** Start Dots Position */
		paginationDotsPosition,
		paginationDotsPositionUnits,
		paginationProgressbarPosition,
		paginationProgressbarPositionUnits,
		/** End Dots Position */

		/** Start Pagination Outside Offset */
		paginationOutsideOffset,
		paginationOutsideOffsetUnits,
		/** End Pagination Outside Offset */

		/** Start Dots Style */
		paginationDotsSwitcher,
		paginationNormalDotsBgColor,
		paginationActiveDotsBgColor,
		paginationNormalDotsWidth,
		paginationNormalDotsWidthUnits,
		paginationNormalDotsHeight,
		paginationNormalDotsHeightUnits,
		/** End Dots Style */

		/** Start Dots Border */
		paginationNormalDotsBorder,
		paginationNormalDotsBorderColorSwitcher,
		paginationNormalDotsBorderColor,
		paginationNormalDotsBorderHoverColor,
		paginationNormalDotsBorderUnits,
		paginationNormalDotsDesktopBorder,
		paginationNormalDotsDesktopBorderCssStyle,
		paginationNormalDotsTabletBorder,
		paginationNormalDotsTabletBorderCssStyle,
		paginationNormalDotsMobileBorder,
		paginationNormalDotsMobileBorderCssStyle,
		paginationNormalDotsBorderLink,
		/** End Dots Border */

		/** Start Dots Border Radius */
		paginationNormalDotsBorderRadius,
		paginationNormalDotsBorderRadiusUnits,
		paginationNormalDotsDesktopBorderRadius,
		paginationNormalDotsDesktopBorderRadiusCssStyle,
		paginationNormalDotsTabletBorderRadius,
		paginationNormalDotsTabletBorderRadiusCssStyle,
		paginationNormalDotsMobileBorderRadius,
		paginationNormalDotsMobileBorderRadiusCssStyle,
		paginationNormalDotsBorderRadiusLink,
		/** End Dots Border Radius */

		/** Start Active Dots */
		paginationActiveDotsWidth,
		paginationActiveDotsWidthUnits,
		paginationActiveDotsHeight,
		paginationActiveDotsHeightUnits,
		/** End Active Dots */

		/** Start Active Dots Border */
		paginationActiveDotsBorder,
		paginationActiveDotsBorderColorSwitcher,
		paginationActiveDotsBorderColor,
		paginationActiveDotsBorderHoverColor,
		/** End Active Dots Border */

		/** Start Active Dots Border */
		paginationActiveDotsBorderUnits,
		paginationActiveDotsDesktopBorder,
		paginationActiveDotsDesktopBorderCssStyle,
		paginationActiveDotsTabletBorder,
		paginationActiveDotsTabletBorderCssStyle,
		paginationActiveDotsMobileBorder,
		paginationActiveDotsMobileBorderCssStyle,
		paginationActiveDotsBorderLink,
		/** End Active Dots Border */

		/** Start Active Dots Border Radius */
		paginationActiveDotsBorderRadiusUnits,
		paginationActiveDotsDesktopBorderRadius,
		paginationActiveDotsDesktopBorderRadiusCssStyle,
		paginationActiveDotsTabletBorderRadius,
		paginationActiveDotsTabletBorderRadiusCssStyle,
		paginationActiveDotsMobileBorderRadius,
		paginationActiveDotsMobileBorderRadiusCssStyle,
		paginationActiveDotsBorderRadiusLink,
		/** End Active Dots Border Radius */

		/** start Fraction Typography and Color */
		paginationFractionFontFamily,
		paginationFractionFontSize,
		paginationFractionFontSizeUnits,
		paginationFractionFontWeight,
		paginationFractionFontStyle,
		paginationFractionTextTransform,
		paginationFractionTextDecoration,
		paginationFractionLineHeight,
		paginationFractionLineHeightUnits,
		paginationFractionLetterSpacing,
		paginationFractionLetterSpacingUnits,
		paginationFractionWordSpacing,
		paginationFractionWordSpacingUnits,
		paginationFractionColorSwitcher,
		paginationFractionColor,
		paginationFractionColorHover,
		/** End Fraction Typography and Color */

		/** start pagination Progressbar Color */
		paginationProgressbarBGColorSwitcher,
		paginationProgressbarBGColor,
		paginationProgressbarBGActiveColor,
		paginationProgressbarHeight,
		paginationProgressbarHeightUnits,
		/** End pagination Progressbar Color */

		/** Global Settings */

		/** Start Global Margin */
		globalMarginUnits,
		globalMarginDesktop,
		globalMarginDesktopCssStyle,
		globalMarginTablet,
		globalMarginTabletCssStyle,
		globalMarginMobile,
		globalMarginMobileCssStyle,
		globalMarginLink,
		/** End Global Margin */

		/** Start Global Padding */
		globalPaddingUnits,
		globalPaddingDesktop,
		globalPaddingDesktopCssStyle,
		globalPaddingTablet,
		globalPaddingTabletCssStyle,
		globalPaddingMobile,
		globalPaddingMobileCssStyle,
		globalPaddingLink,
		/** End Global Padding */

		/** Start Global Z-Index */
		globalZIndex,
		globalID,
		globalClass,
		/** End Global Z-Index */

		/** Start Global Background */
		globalNormalBackgroundType,
		globalNormalClassicColor,
		globalNormalGradientColor,
		globalNormalCustomGradientSwitcher,
		globalNormalCustomGradientInputValue,
		globalNormalBackgroundImageUrl,
		globalNormalBackgroundImagePosition,
		globalNormalBackgroundImageAttachment,
		globalNormalBackgroundImageRepeat,
		globalNormalBackgroundImageSize,

		globalHoverBackgroundType,
		globalHoverClassicColor,
		globalHoverGradientColor,
		globalHoverCustomGradientSwitcher,
		globalHoverCustomGradientInputValue,
		globalHoverBackgroundImageUrl,
		globalHoverBackgroundImagePosition,
		globalHoverBackgroundImageAttachment,
		globalHoverBackgroundImageRepeat,
		globalHoverBackgroundImageSize,
		/** End Global Setting */

		/** Start Global Border */
		globalBorder,
		globalBorderColorSwitcher,
		globalBorderColor,
		globalBorderHoverColor,

		globalBorderUnits,
		globalBorderDesktop,
		globalBorderDesktopCssStyle,
		globalBorderTablet,
		globalBorderTabletCssStyle,
		globalBorderMobile,
		globalBorderMobileCssStyle,
		globalBorderLink,
		/** End Global Border */

		/** Start Global Border Radius */
		globalBorderRadiusUnits,
		globalBorderRadiusDesktop,
		globalBorderRadiusDesktopCssStyle,
		globalBorderRadiusTablet,
		globalBorderRadiusTabletCssStyle,
		globalBorderRadiusMobile,
		globalBorderRadiusMobileCssStyle,
		globalBorderRadiusLink,
		/** End Global Border Radius */

		/** Start Global Box Shadow */
		globalBoxShadowValuesSwitcher,
		globalBoxShadowValues,
		globalBoxShadowCssValue,
		globalBoxShadowHoverValues,
		globalBoxShadowHoverCssValue,
		/** End Global Box Shadow */
	} = attributes;

	/** Start Slider Item Color Style */
	let sliderItemColorStyle = '';
	sliderItems.forEach( ( item ) => {
		const normalItemBackgroundType = item.normalItemBackgroundType;
		const normalItemGradientColor =
			item.normalItemGradientColor || item.normalItemClassicColor;

		if ( normalItemBackgroundType === 'gradient' ) {
			const gradientValue =
				item.normalItemCustomGradientSwitcher &&
				item.normalItemCustomGradientInputValue
					? item.normalItemCustomGradientInputValue
					: normalItemGradientColor;

			if ( gradientValue ) {
				const gradientStyle = `.${ blockId } .gslider-content-wrapper.${ item.id } {
                        background: ${ gradientValue };
                        transition: background .3s ease-in-out, opacity .3s ease-in-out;
                    }`;
				sliderItemColorStyle += gradientStyle;
			}
		} else if ( item.normalBackgroundImageUrl.Desktop ) {
			let backgroundImageStyle = `.${ blockId } .gslider-content-wrapper.${ item.id } {
                    background-image: url(${ item.normalBackgroundImageUrl.Desktop });`;

			if ( item.normalBackgroundImagePosition.Desktop ) {
				const backgroundPosition = `${
					item.normalBackgroundImagePosition.Desktop.x * 100
				}% ${ item.normalBackgroundImagePosition.Desktop.y * 100 }%`;
				backgroundImageStyle += `
                    background-position: ${ backgroundPosition };`;
			}

			if ( item.normalBackgroundImageAttachment.Desktop ) {
				backgroundImageStyle += `
                    background-attachment: ${ item.normalBackgroundImageAttachment.Desktop };`;
			}

			if ( item.normalBackgroundImageRepeat.Desktop ) {
				backgroundImageStyle += `
                    background-repeat: ${ item.normalBackgroundImageRepeat.Desktop };`;
			}

			if ( item.normalBackgroundImageSize.Desktop ) {
				backgroundImageStyle += `
                    background-size: ${ item.normalBackgroundImageSize.Desktop };`;
			}

			backgroundImageStyle += `
                    transition: background .3s ease-in-out, opacity .3s ease-in-out;
                }`;
			sliderItemColorStyle += backgroundImageStyle;
		} else if ( item.normalItemClassicColor ) {
			const classicStyle = `.${ blockId } .gslider-content-wrapper.${ item.id } {
                    background: ${ item.normalItemClassicColor };
                    transition: background-color .3s ease-in-out, opacity .3s ease-in-out;
                }`;
			sliderItemColorStyle += classicStyle;
		}

		if ( item.itemBackgroundOverlaySwitcher ) {
			const overlayColor =
				item.itemBackgroundOverlayType === 'classic'
					? item.itemBackgroundOverlayClassicColor
					: item.itemBackgroundOverlayGradientColor;

			const overlayGradient =
				item.itemBackgroundOverlayCustomGradientSwitcher &&
				item.itemBackgroundOverlayCustomGradientInputValue
					? item.itemBackgroundOverlayCustomGradientInputValue
					: overlayColor;

			const overlayStyle = `.${ blockId } .gslider-content-wrapper.${
				item.id
			}::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: ${ overlayGradient || 'transparent' };
                    opacity: ${ item.itemBackgroundOverlayOpacity };
                    z-index: -1;
                    pointer-events: none;
                    transition: opacity .3s ease-in-out;
                }
                .${ blockId } .gslider-content-wrapper.${ item.id } {
                    position: relative;
                    z-index: 1;
                }`;
			sliderItemColorStyle += overlayStyle;
		}

		// Tablet styles (max-width: 1024px)
		sliderItemColorStyle += `
            @media only screen and (max-width: 1024px) {
                .${ blockId } .gslider-content-wrapper.${ item.id } {`;

		if (
			normalItemBackgroundType === 'gradient' &&
			item.normalItemGradientColor
		) {
			sliderItemColorStyle += `
                    background: ${ item.normalItemGradientColor };`;
		} else if (
			item.normalBackgroundImageUrl.Tablet ||
			item.normalBackgroundImageUrl.Desktop
		) {
			sliderItemColorStyle += `
                    background-image: url(${
						item.normalBackgroundImageUrl.Tablet ||
						item.normalBackgroundImageUrl.Desktop
					});`;
			if (
				item.normalBackgroundImageSize.Tablet ||
				item.normalBackgroundImageSize.Desktop
			) {
				sliderItemColorStyle += `
                    background-size: ${
						item.normalBackgroundImageSize.Tablet ||
						item.normalBackgroundImageSize.Desktop
					};`;
			}
			sliderItemColorStyle += `
                    background-position: center center;
                    background-repeat: no-repeat;`;
		} else if ( item.normalItemClassicColor ) {
			sliderItemColorStyle += `
                    background: ${ item.normalItemClassicColor };`;
		}
		sliderItemColorStyle += `
                }
            }`;

		// Mobile styles (max-width: 767px)
		sliderItemColorStyle += `
            @media only screen and (max-width: 767px) {
                .${ blockId } .gslider-content-wrapper.${ item.id } {`;

		if (
			normalItemBackgroundType === 'gradient' &&
			item.normalItemGradientColor
		) {
			sliderItemColorStyle += `
                    background: ${ item.normalItemGradientColor };`;
		} else if (
			item.normalBackgroundImageUrl.Mobile ||
			item.normalBackgroundImageUrl.Tablet ||
			item.normalBackgroundImageUrl.Desktop
		) {
			sliderItemColorStyle += `
                    background-image: url(${
						item.normalBackgroundImageUrl.Mobile ||
						item.normalBackgroundImageUrl.Tablet ||
						item.normalBackgroundImageUrl.Desktop
					});`;
			if (
				item.normalBackgroundImageSize.Mobile ||
				item.normalBackgroundImageSize.Tablet ||
				item.normalBackgroundImageSize.Desktop
			) {
				sliderItemColorStyle += `
                    background-size: ${
						item.normalBackgroundImageSize.Mobile ||
						item.normalBackgroundImageSize.Tablet ||
						item.normalBackgroundImageSize.Desktop
					};`;
			}
			sliderItemColorStyle += `
                    background-position: center center;
                    background-repeat: no-repeat;`;
		} else if ( item.normalItemClassicColor ) {
			sliderItemColorStyle += `
                    background: ${ item.normalItemClassicColor };`;
		}
		sliderItemColorStyle += `
                }
            }`;
	} );
	/* End Slider Item Color Style */

	/**
	 * Get global background normal styles
	 */
	const getGlobalBackgroundNormalStyles = ( device ) => {
		const bgType = globalNormalBackgroundType;
		const bgColor = globalNormalClassicColor;
		const bgGradient = globalNormalGradientColor;
		const customGradient = globalNormalCustomGradientInputValue;
		const customGradientEnabled = globalNormalCustomGradientSwitcher;

		const bgImageUrl = globalNormalBackgroundImageUrl?.[ device ];
		const bgImagePosition = globalNormalBackgroundImagePosition?.[ device ];
		const bgAttachment = globalNormalBackgroundImageAttachment?.[ device ];
		const bgRepeat = globalNormalBackgroundImageRepeat?.[ device ];
		const bgSize = globalNormalBackgroundImageSize?.[ device ];

		if ( bgType === 'gradient' ) {
			if ( customGradientEnabled && customGradient ) {
				return { background: customGradient };
			} else if ( bgGradient ) {
				return { background: bgGradient };
			} else if ( bgColor ) {
				return { background: bgColor };
			}
			return {};
		}

		let styles = bgColor ? { background: bgColor } : {};

		if ( bgType !== 'gradient' && bgImageUrl ) {
			styles = {
				...styles,
				'background-image': `url(${ bgImageUrl })`,
				'background-position': bgImagePosition
					? `${ bgImagePosition.x * 100 }% ${
							bgImagePosition.y * 100
					  }%`
					: '50% 50%',
				'background-attachment': bgAttachment || undefined,
				'background-repeat': bgRepeat || undefined,
				'background-size': bgSize || undefined,
			};
		}

		return styles;
	};

	/**
	 * Get global background hover styles
	 */
	const getGlobalBackgroundHoverStyles = ( device ) => {
		const bgType = globalHoverBackgroundType;
		const bgColor = globalHoverClassicColor;
		const bgGradient = globalHoverGradientColor;
		const customGradient = globalHoverCustomGradientInputValue;
		const customGradientEnabled = globalHoverCustomGradientSwitcher;

		const bgImageUrl = globalHoverBackgroundImageUrl?.[ device ];
		const bgImagePosition = globalHoverBackgroundImagePosition?.[ device ];
		const bgAttachment = globalHoverBackgroundImageAttachment?.[ device ];
		const bgRepeat = globalHoverBackgroundImageRepeat?.[ device ];
		const bgSize = globalHoverBackgroundImageSize?.[ device ];

		if ( bgType === 'gradient' ) {
			if ( customGradientEnabled && customGradient ) {
				return { background: customGradient };
			} else if ( bgGradient ) {
				return { background: bgGradient };
			} else if ( bgColor ) {
				return { background: bgColor };
			}
			return {};
		}

		let styles = bgColor ? { background: bgColor } : {};

		if ( bgType !== 'gradient' && bgImageUrl ) {
			styles = {
				...styles,
				'background-image': `url(${ bgImageUrl })`,
				'background-position': bgImagePosition
					? `${ bgImagePosition.x * 100 }% ${
							bgImagePosition.y * 100
					  }%`
					: '50% 50%',
				'background-attachment': bgAttachment || undefined,
				'background-repeat': bgRepeat || undefined,
				'background-size': bgSize || undefined,
			};
		}

		return styles;
	};

	/**
	 * Convert object to string
	 */
	const globalBackgroundStyleObjectToString = ( styleObj ) =>
		Object.entries( styleObj )
			.map( ( [ key, value ] ) => `${ key }: ${ value };` )
			.join( ' ' );

	/**
	 * Get global background styles
	 */
	const globalDesktopBackgroundNormalStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundNormalStyles( 'Desktop' )
		);
	const globalTabletBackgroundNormalStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundNormalStyles( 'Tablet' )
		);
	const globalMobileBackgroundNormalStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundNormalStyles( 'Mobile' )
		);

	const globalDesktopBackgroundHoverStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundHoverStyles( 'Desktop' )
		);
	const globalTabletBackgroundHoverStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundHoverStyles( 'Tablet' )
		);
	const globalMobileBackgroundHoverStyles =
		globalBackgroundStyleObjectToString(
			getGlobalBackgroundHoverStyles( 'Mobile' )
		);

	/** Start All Block Style */
	const baseSliderCSS = `
        .${ blockId }.gslider-testimonial-wrapper {
            ${ globalDesktopBackgroundNormalStyles }
            ${
				globalMarginDesktopCssStyle
					? `margin: ${ globalMarginDesktopCssStyle };`
					: ''
			} 
            ${
				globalPaddingDesktopCssStyle
					? `padding: ${ globalPaddingDesktopCssStyle };`
					: ''
			}
            ${ globalBorder ? `border: ${ globalBorder };` : '' }
			${
				globalBorderDesktopCssStyle
					? `border-width: ${ globalBorderDesktopCssStyle };`
					: ''
			}  
			${
				globalBorderRadiusDesktopCssStyle
					? `border-radius: ${ globalBorderRadiusDesktopCssStyle } !important;`
					: ''
			}
            ${
				globalBorderColor ? `border-color: ${ globalBorderColor };` : ''
			}
            ${
				globalBoxShadowCssValue
					? `box-shadow: ${ globalBoxShadowCssValue } !important;`
					: ''
			}
            ${
				globalZIndex.Desktop
					? `z-index: ${ globalZIndex.Desktop };`
					: ''
			}
            box-sizing: border-box;
            position: relative;
        }
        .${ blockId }.gslider-testimonial-wrapper:hover {
            ${ globalDesktopBackgroundHoverStyles }
            ${
				globalBorderHoverColor
					? `border-color: ${ globalBorderHoverColor };`
					: ''
			}
            ${
				globalBoxShadowHoverCssValue
					? `box-shadow: ${ globalBoxShadowHoverCssValue } !important;`
					: ''
			}
        }

        .${ blockId } .swiper-wrapper {
            ${ layoutHeightSwitcher !== 'adapt' ? `height: auto;` : '' }
            ${
				layoutHeight.Desktop && layoutHeightSwitcher === 'fixed'
					? `min-height: ${ layoutHeight.Desktop }${ layoutHeightUnits.Desktop };`
					: 'auto'
			}
        }

        ${
			direction === 'vertical' &&
			Number( verticalHeight?.Desktop || '500' ) > 0 &&
			( verticalHeightUnits?.Desktop || 'px' ) !== '%'
				? `.${ blockId }.gslider-testimonial-wrapper > .swiper {
            height: ${ verticalHeight?.Desktop || '500' }${
				verticalHeightUnits?.Desktop || 'px'
			};
        }`
				: ''
		}

        .${ blockId } .swiper-slide{
            ${
				layoutHeightSwitcher !== 'adapt' && direction !== 'vertical'
					? `height: auto !important;`
					: ''
			}
            ${
				layoutHeight.Desktop &&
				layoutHeightSwitcher === 'fixed' &&
				direction !== 'vertical'
					? `min-height: ${ layoutHeight.Desktop }${ layoutHeightUnits.Desktop };`
					: 'auto'
			}
        }
        
        .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper {
            ${
				layoutHeightSwitcher !== 'adapt' || direction === 'vertical'
					? `height: 100% !important;`
					: ''
			}
            ${
				contentVerticalAlignment?.Desktop
					? `justify-content: ${ contentVerticalAlignment.Desktop };`
					: ''
			}
        }

        .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
            ${
				contentWidth?.Desktop
					? `max-width: ${ contentWidth.Desktop }${ contentWidthUnits?.Desktop };`
					: ''
			}
            ${
				contentAlignment?.Desktop
					? `text-align: ${ contentAlignment.Desktop };`
					: ''
			}
            ${
				contentHorizontalAlignment?.Desktop
					? `align-items: ${
							contentHorizontalAlignment.Desktop === 'left'
								? 'flex-start'
								: contentHorizontalAlignment.Desktop === 'right'
								? 'flex-end'
								: 'center'
					  };`
					: ''
			}

            ${
				contentHorizontalAlignment?.Desktop === 'left'
					? `margin-right: auto; margin-left: 0;`
					: ''
			}
            ${
				contentHorizontalAlignment?.Desktop === 'center'
					? `margin-left: auto; margin-right: auto;`
					: ''
			}
            ${
				contentHorizontalAlignment?.Desktop === 'right'
					? `margin-left: auto; margin-right: 0;`
					: ''
			}
            ${
				contentPaddingDesktopCssStyle
					? `padding: ${ contentPaddingDesktopCssStyle };`
					: ''
			}
        }

        .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-testimonial-content-group,
        .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group {
            ${
				contentHorizontalAlignment?.Desktop
					? `align-items: ${
							contentHorizontalAlignment.Desktop === 'left'
								? 'flex-start'
								: contentHorizontalAlignment.Desktop === 'right'
								? 'flex-end'
								: 'center'
					  };`
					: ''
			}
        }

        .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group .gslider-author-meta {
            ${
				contentAlignment?.Desktop
					? `text-align: ${ contentAlignment.Desktop };`
					: ''
			}
        }

        .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-author-name-wrapper .gslider-testimonial-author-name {
            ${
				authorNameFontFamily
					? `font-family: ${ authorNameFontFamily };`
					: ''
			}
            ${
				authorNameFontSize.Desktop && authorNameFontSizeUnits.Desktop
					? `font-size: ${ authorNameFontSize.Desktop }${ authorNameFontSizeUnits.Desktop };`
					: ''
			}
            ${
				authorNameFontWeight
					? `font-weight: ${ authorNameFontWeight };`
					: ''
			}
            ${
				authorNameFontStyle
					? `font-style: ${ authorNameFontStyle };`
					: ''
			}
            ${
				authorNameTextTransform
					? `text-transform: ${ authorNameTextTransform };`
					: ''
			}
            ${
				authorNameTextDecoration
					? `text-decoration: ${ authorNameTextDecoration };`
					: ''
			}
            ${
				authorNameLineHeight.Desktop &&
				authorNameLineHeightUnits.Desktop
					? `line-height: ${ authorNameLineHeight.Desktop }${ authorNameLineHeightUnits.Desktop };`
					: ''
			}
            ${
				authorNameLetterSpacing.Desktop &&
				authorNameLetterSpacingUnits.Desktop
					? `letter-spacing: ${ authorNameLetterSpacing.Desktop }${ authorNameLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				authorNameWordSpacing.Desktop &&
				authorNameWordSpacingUnits.Desktop
					? `word-spacing: ${ authorNameWordSpacing.Desktop }${ authorNameWordSpacingUnits.Desktop };`
					: ''
			}
            ${ authorNameColor ? `color: ${ authorNameColor };` : '' }
            ${
				authorNameDesktopMarginCssStyle
					? `margin: ${ authorNameDesktopMarginCssStyle };`
					: ''
			} 
            ${
				authorNameDesktopPaddingCssStyle
					? `padding: ${ authorNameDesktopPaddingCssStyle };`
					: ''
			}
            transition: color .3s ease-in-out;
        }
        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-author-name-wrapper .gslider-testimonial-author-name {
            ${ authorNameColorHover ? `color: ${ authorNameColorHover };` : '' }
        }

        .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-author-designation-wrapper .gslider-testimonial-author-designation {
            ${
				authorDesignationFontFamily
					? `font-family: ${ authorDesignationFontFamily };`
					: ''
			}
            ${
				authorDesignationFontSize.Desktop &&
				authorDesignationFontSizeUnits.Desktop
					? `font-size: ${ authorDesignationFontSize.Desktop }${ authorDesignationFontSizeUnits.Desktop };`
					: ''
			}
            ${
				authorDesignationFontWeight
					? `font-weight: ${ authorDesignationFontWeight };`
					: ''
			}
            ${
				authorDesignationFontStyle
					? `font-style: ${ authorDesignationFontStyle };`
					: ''
			}
            ${
				authorDesignationTextTransform
					? `text-transform: ${ authorDesignationTextTransform };`
					: ''
			}
            ${
				authorDesignationTextDecoration
					? `text-decoration: ${ authorDesignationTextDecoration };`
					: ''
			}
            ${
				authorDesignationLineHeight.Desktop &&
				authorDesignationLineHeightUnits.Desktop
					? `line-height: ${ authorDesignationLineHeight.Desktop }${ authorDesignationLineHeightUnits.Desktop };`
					: ''
			}
            ${
				authorDesignationLetterSpacing.Desktop &&
				authorDesignationLetterSpacingUnits.Desktop
					? `letter-spacing: ${ authorDesignationLetterSpacing.Desktop }${ authorDesignationLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				authorDesignationWordSpacing.Desktop &&
				authorDesignationWordSpacingUnits.Desktop
					? `word-spacing: ${ authorDesignationWordSpacing.Desktop }${ authorDesignationWordSpacingUnits.Desktop };`
					: ''
			}
            ${
				authorDesignationColor
					? `color: ${ authorDesignationColor };`
					: ''
			}
            ${
				authorDesignationDesktopMarginCssStyle
					? `margin: ${ authorDesignationDesktopMarginCssStyle };`
					: ''
			} 
            ${
				authorDesignationDesktopPaddingCssStyle
					? `padding: ${ authorDesignationDesktopPaddingCssStyle };`
					: ''
			}
            transition: color .3s ease-in-out;
        }
        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-author-designation-wrapper .gslider-testimonial-author-designation {
            ${
				authorDesignationColorHover
					? `color: ${ authorDesignationColorHover };`
					: ''
			}
        }

        /** Start Author Image Style */
        .${ blockId } .gslider-testimonial-author-image-wrapper .gslider-testimonial-author-image {
            ${
				authorImageSize?.Desktop
					? `width: ${ authorImageSize.Desktop }${
							authorImageSizeUnits?.Desktop || 'px'
					  };`
					: ''
			}
            ${
				authorImageSize?.Desktop
					? `height: ${ authorImageSize.Desktop }${
							authorImageSizeUnits?.Desktop || 'px'
					  };`
					: ''
			}
            ${
				authorImageBorder !== 'none'
					? `border-style: ${ authorImageBorder };`
					: ''
			}
            ${
				authorImageDesktopBorderWidthCssStyle
					? `border-width: ${ authorImageDesktopBorderWidthCssStyle };`
					: ''
			}
            ${
				authorImageBorderColor
					? `border-color: ${ authorImageBorderColor };`
					: ''
			}
            ${
				authorImageDesktopBorderRadiusCssStyle
					? `border-radius: ${ authorImageDesktopBorderRadiusCssStyle };`
					: ''
			}
            ${
				authorImageDesktopMarginCssStyle
					? `margin: ${ authorImageDesktopMarginCssStyle };`
					: ''
			}
            ${
				authorImageDesktopPaddingCssStyle
					? `padding: ${ authorImageDesktopPaddingCssStyle };`
					: ''
			}
            object-fit: cover;
            transition: border-color 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-author-image-wrapper .gslider-testimonial-author-image {
            ${
				authorImageBorderHoverColor
					? `border-color: ${ authorImageBorderHoverColor };`
					: ''
			}
        }
        /** End Author Image Style */

        .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-title-wrapper .gslider-testimonial-title {
            ${
				testimonialTitleFontFamily
					? `font-family: ${ testimonialTitleFontFamily };`
					: ''
			}
            ${
				testimonialTitleFontSize.Desktop &&
				testimonialTitleFontSizeUnits.Desktop
					? `font-size: ${ testimonialTitleFontSize.Desktop }${ testimonialTitleFontSizeUnits.Desktop };`
					: ''
			}
            ${
				testimonialTitleFontWeight
					? `font-weight: ${ testimonialTitleFontWeight };`
					: ''
			}
            ${
				testimonialTitleFontStyle
					? `font-style: ${ testimonialTitleFontStyle };`
					: ''
			}
            ${
				testimonialTitleTextTransform
					? `text-transform: ${ testimonialTitleTextTransform };`
					: ''
			}
            ${
				testimonialTitleTextDecoration
					? `text-decoration: ${ testimonialTitleTextDecoration };`
					: ''
			}
            ${
				testimonialTitleLineHeight.Desktop &&
				testimonialTitleLineHeightUnits.Desktop
					? `line-height: ${ testimonialTitleLineHeight.Desktop }${ testimonialTitleLineHeightUnits.Desktop };`
					: ''
			}
            ${
				testimonialTitleLetterSpacing.Desktop &&
				testimonialTitleLetterSpacingUnits.Desktop
					? `letter-spacing: ${ testimonialTitleLetterSpacing.Desktop }${ testimonialTitleLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				testimonialTitleWordSpacing.Desktop &&
				testimonialTitleWordSpacingUnits.Desktop
					? `word-spacing: ${ testimonialTitleWordSpacing.Desktop }${ testimonialTitleWordSpacingUnits.Desktop };`
					: ''
			}
            ${
				testimonialTitleColor
					? `color: ${ testimonialTitleColor };`
					: ''
			}
            ${
				testimonialTitleDesktopMarginCssStyle
					? `margin: ${ testimonialTitleDesktopMarginCssStyle };`
					: ''
			}
            ${
				testimonialTitleDesktopPaddingCssStyle
					? `padding: ${ testimonialTitleDesktopPaddingCssStyle };`
					: ''
			}
            transition: color .3s ease-in-out;
        }
        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-title-wrapper .gslider-testimonial-title {
            ${
				testimonialTitleColorHover
					? `color: ${ testimonialTitleColorHover };`
					: ''
			}
        }

        .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-text-wrapper .gslider-testimonial-text {
            ${
				testimonialTextFontFamily
					? `font-family: ${ testimonialTextFontFamily };`
					: ''
			}
            ${
				testimonialTextFontSize.Desktop &&
				testimonialTextFontSizeUnits.Desktop
					? `font-size: ${ testimonialTextFontSize.Desktop }${ testimonialTextFontSizeUnits.Desktop };`
					: ''
			}
            ${
				testimonialTextFontWeight
					? `font-weight: ${ testimonialTextFontWeight };`
					: ''
			}
            ${
				testimonialTextFontStyle
					? `font-style: ${ testimonialTextFontStyle };`
					: ''
			}
            ${
				testimonialTextTextTransform
					? `text-transform: ${ testimonialTextTextTransform };`
					: ''
			}
            ${
				testimonialTextTextDecoration
					? `text-decoration: ${ testimonialTextTextDecoration };`
					: ''
			}
            ${
				testimonialTextLineHeight.Desktop &&
				testimonialTextLineHeightUnits.Desktop
					? `line-height: ${ testimonialTextLineHeight.Desktop }${ testimonialTextLineHeightUnits.Desktop };`
					: ''
			}
            ${
				testimonialTextLetterSpacing.Desktop &&
				testimonialTextLetterSpacingUnits.Desktop
					? `letter-spacing: ${ testimonialTextLetterSpacing.Desktop }${ testimonialTextLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				testimonialTextWordSpacing.Desktop &&
				testimonialTextWordSpacingUnits.Desktop
					? `word-spacing: ${ testimonialTextWordSpacing.Desktop }${ testimonialTextWordSpacingUnits.Desktop };`
					: ''
			}
            ${ testimonialTextColor ? `color: ${ testimonialTextColor };` : '' }
            ${
				testimonialTextDesktopMarginCssStyle
					? `margin: ${ testimonialTextDesktopMarginCssStyle };`
					: ''
			} 
            ${
				testimonialTextDesktopPaddingCssStyle
					? `padding: ${ testimonialTextDesktopPaddingCssStyle };`
					: ''
			}
            transition: color .3s ease-in-out;
        }
        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-text-wrapper .gslider-testimonial-text {
            ${
				testimonialTextColorHover
					? `color: ${ testimonialTextColorHover };`
					: ''
			}
        }

        /** Start Quote Icon Style */
        .${ blockId } .gslider-testimonial-quote-icon-wrapper {
            ${
				quoteIconDesktopMarginCssStyle
					? `margin: ${ quoteIconDesktopMarginCssStyle };`
					: ''
			}
            ${
				quoteIconDesktopPaddingCssStyle
					? `padding: ${ quoteIconDesktopPaddingCssStyle };`
					: ''
			}

            ${
				quoteIconNormalBackgroundType === 'gradient'
					? `
                background: ${
					quoteIconNormalCustomGradientSwitcher &&
					quoteIconNormalCustomGradientInputValue
						? quoteIconNormalCustomGradientInputValue
						: quoteIconNormalGradientColor
						? quoteIconNormalGradientColor
						: quoteIconNormalClassicColor
				};
            `
					: `
                ${
					quoteIconNormalClassicColor
						? `background: ${ quoteIconNormalClassicColor };`
						: ''
				}
            `
			}

            ${ quoteIconBorder ? `border-style: ${ quoteIconBorder };` : '' }
            ${
				quoteIconDesktopBorderCssStyle
					? `border-width: ${ quoteIconDesktopBorderCssStyle };`
					: ''
			}
            ${
				quoteIconBorderColor
					? `border-color: ${ quoteIconBorderColor };`
					: ''
			}
            ${
				quoteIconDesktopBorderRadiusCssStyle
					? `border-radius: ${ quoteIconDesktopBorderRadiusCssStyle };`
					: ''
			}
            ${
				quoteIconBoxShadowCssValue
					? `box-shadow: ${ quoteIconBoxShadowCssValue };`
					: ''
			}
            
            ${
				quoteIconOpacity.Desktop
					? `opacity: ${ quoteIconOpacity.Desktop };`
					: ''
			}
            ${
				quoteIconRotate.Desktop
					? `transform: rotate(${ quoteIconRotate.Desktop }deg);`
					: ''
			}
            ${
				quoteIconZIndex.Desktop
					? `z-index: ${ quoteIconZIndex.Desktop };`
					: ''
			}

            ${
				quoteIconPositionSwitcher
					? `
                position: absolute;
                ${
					quoteIconPositionTop.Desktop
						? `top: ${ quoteIconPositionTop.Desktop }${ quoteIconPositionTopUnits.Desktop };`
						: ''
				}
                ${
					quoteIconPositionBottom.Desktop
						? `bottom: ${ quoteIconPositionBottom.Desktop }${ quoteIconPositionBottomUnits.Desktop };`
						: ''
				}
                ${
					quoteIconPositionLeft.Desktop
						? `left: ${ quoteIconPositionLeft.Desktop }${ quoteIconPositionLeftUnits.Desktop };`
						: ''
				}
                ${
					quoteIconPositionRight.Desktop
						? `right: ${ quoteIconPositionRight.Desktop }${ quoteIconPositionRightUnits.Desktop };`
						: ''
				}
            `
					: 'position: relative;'
			}
            transition: background 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
            line-height: 0;
            display: inline-block;
        }

        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-quote-icon-wrapper {
            ${
				quoteIconHoverBackgroundType === 'gradient'
					? `
                background: ${
					quoteIconHoverCustomGradientSwitcher &&
					quoteIconHoverCustomGradientInputValue
						? quoteIconHoverCustomGradientInputValue
						: quoteIconHoverGradientColor
						? quoteIconHoverGradientColor
						: quoteIconHoverClassicColor
				};
            `
					: `
                ${
					quoteIconHoverClassicColor
						? `background: ${ quoteIconHoverClassicColor };`
						: ''
				}
            `
			}
            ${
				quoteIconBorderHoverColor
					? `border-color: ${ quoteIconBorderHoverColor };`
					: ''
			}
            ${
				quoteIconBoxShadowHoverCssValue
					? `box-shadow: ${ quoteIconBoxShadowHoverCssValue };`
					: ''
			}
            ${
				quoteIconHoverRotate.Desktop
					? `transform: rotate(${ quoteIconHoverRotate.Desktop }deg);`
					: ''
			}
        }

        .${ blockId } .gslider-testimonial-quote-icon-wrapper svg,
        .${ blockId } .gslider-testimonial-quote-icon-wrapper img {
            ${
				quoteIconSize.Desktop && quoteIconSizeUnits.Desktop
					? `width: ${ quoteIconSize.Desktop }${ quoteIconSizeUnits.Desktop };`
					: ''
			}
            ${
				quoteIconSize.Desktop && quoteIconSizeUnits.Desktop
					? `height: ${ quoteIconSize.Desktop }${ quoteIconSizeUnits.Desktop };`
					: ''
			}
            transition: fill 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .${ blockId } .gslider-testimonial-quote-icon-wrapper svg {
            ${
				quoteIconAlign === 'icon' && quoteIconColor
					? `fill: ${ quoteIconColor };`
					: ''
			}
        }

        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-quote-icon-wrapper svg {
            ${
				quoteIconAlign === 'icon' && quoteIconHoverColor
					? `fill: ${ quoteIconHoverColor };`
					: ''
			}
        }
        /** End Quote Icon Style */

        /** Start Rating Style */
        .${ blockId } .gslider-testimonial-rating-wrapper {
            ${
				ratingDesktopMarginCssStyle
					? `margin: ${ ratingDesktopMarginCssStyle };`
					: ''
			}
            ${
				ratingDesktopPaddingCssStyle
					? `padding: ${ ratingDesktopPaddingCssStyle };`
					: ''
			}
        }
        .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-inner {
            display: flex;
            align-items: center;
            justify-content: ${
				contentHorizontalAlignment.Desktop === 'left'
					? 'flex-start'
					: contentHorizontalAlignment.Desktop === 'right'
					? 'flex-end'
					: 'center'
			};
            gap: ${ ratingNumberGap.Desktop }${ ratingNumberGapUnits.Desktop };
        }
        .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: ${
				ratingStarGap.Desktop
					? `${ ratingStarGap.Desktop }${
							ratingStarGapUnits?.Desktop || 'px'
					  }`
					: '5px'
			};
        }
        .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon svg {
            ${
				ratingStarSize.Desktop
					? `width: ${ ratingStarSize.Desktop }${ ratingStarSizeUnits.Desktop };`
					: ''
			}
            ${
				ratingStarSize.Desktop
					? `height: ${ ratingStarSize.Desktop }${ ratingStarSizeUnits.Desktop };`
					: ''
			}
            fill: ${ ratingStarColor };
            transition: fill .3s ease-in-out;
        }
        .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon.empty svg,
        .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-star-partial-container > svg {
            fill: ${ ratingEmptyStarColor };
            transition: fill .3s ease-in-out;
        }
        .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-star-partial-fill svg {
            ${
				ratingStarSize.Desktop
					? `min-width: ${ ratingStarSize.Desktop }${ ratingStarSizeUnits.Desktop };`
					: ''
			}
            ${
				ratingStarSize.Desktop
					? `width: ${ ratingStarSize.Desktop }${ ratingStarSizeUnits.Desktop };`
					: ''
			}
        }
        
        /* Star Hover Color */
        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon svg {
            fill: ${ ratingStarHoverColor || ratingStarColor };
        }
        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon.empty svg,
        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-rating-wrapper .gslider-testimonial-star-partial-container > svg {
            fill: ${ ratingEmptyStarHoverColor || ratingEmptyStarColor };
        }
        .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-number {
            ${ ratingNumberColor ? `color: ${ ratingNumberColor };` : '' }
            ${
				ratingNumberFontFamily
					? `font-family: ${ ratingNumberFontFamily };`
					: ''
			}
            ${
				ratingNumberFontSize.Desktop &&
				ratingNumberFontSizeUnits.Desktop
					? `font-size: ${ ratingNumberFontSize.Desktop }${ ratingNumberFontSizeUnits.Desktop };`
					: ''
			}
            ${
				ratingNumberFontWeight
					? `font-weight: ${ ratingNumberFontWeight };`
					: ''
			}
            ${
				ratingNumberFontStyle
					? `font-style: ${ ratingNumberFontStyle };`
					: ''
			}
            ${
				ratingNumberTextTransform
					? `text-transform: ${ ratingNumberTextTransform };`
					: ''
			}
            ${
				ratingNumberTextDecoration
					? `text-decoration: ${ ratingNumberTextDecoration };`
					: ''
			}
            ${
				ratingNumberLineHeight.Desktop &&
				ratingNumberLineHeightUnits.Desktop
					? `line-height: ${ ratingNumberLineHeight.Desktop }${ ratingNumberLineHeightUnits.Desktop };`
					: ''
			}
            ${
				ratingNumberLetterSpacing.Desktop &&
				ratingNumberLetterSpacingUnits.Desktop
					? `letter-spacing: ${ ratingNumberLetterSpacing.Desktop }${ ratingNumberLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				ratingNumberWordSpacing.Desktop &&
				ratingNumberWordSpacingUnits.Desktop
					? `word-spacing: ${ ratingNumberWordSpacing.Desktop }${ ratingNumberWordSpacingUnits.Desktop };`
					: ''
			}
            transition: color .3s ease-in-out;
        }
        /* Rating Number Hover Color */
        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-number {
            ${
				ratingNumberHoverColor
					? `color: ${ ratingNumberHoverColor };`
					: ''
			}
        }
        /** End Rating Style */

        .${ blockId }.gslider-testimonial-wrapper.outside {
            ${
				navigationArrowPosition === 'top-left' ||
				navigationArrowPosition === 'top-center' ||
				navigationArrowPosition === 'top-right'
					? `
                padding: ${ navigationArrowPositionOutsidePadding.Desktop }${ navigationArrowPositionOutsidePaddingUnits.Desktop } 0 0;
            `
					: ''
			}
    
            ${
				navigationArrowPosition === 'bottom-left' ||
				navigationArrowPosition === 'bottom-center' ||
				navigationArrowPosition === 'bottom-right'
					? `
                padding: 0 0 ${ navigationArrowPositionOutsidePadding.Desktop }${ navigationArrowPositionOutsidePaddingUnits.Desktop };
            `
					: ''
			}

            ${
				navigationArrowPosition === 'center' && direction === 'vertical'
					? `
                padding: ${ navigationArrowPositionOutsidePadding.Desktop }${ navigationArrowPositionOutsidePaddingUnits.Desktop } 0;

            `
					: ''
			}

            ${
				navigationArrowPosition === 'center' && direction !== 'vertical'
					? `
                padding: 0 ${ navigationArrowPositionOutsidePadding.Desktop }${ navigationArrowPositionOutsidePaddingUnits.Desktop };

            `
					: ''
			}
        }

        .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition },
        .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } {
            z-index: 100 !important;
        }

        ${
			navigationArrowPosition && navigationArrowPosition !== 'center'
				? `

            .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition },
            .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: ${ navigationArrowDirection };
                gap: ${
					navigationArrowGap.Desktop
						? `${ navigationArrowGap.Desktop }${ navigationArrowGapUnits.Desktop }`
						: '10px'
				};
                position: absolute;
                z-index: 100;
        
                ${
					navigationArrowPosition === 'top-left'
						? `
                    top: ${
						navigationArrowPositionTopOffset.Desktop
							? `${ navigationArrowPositionTopOffset.Desktop }${ navigationArrowPositionTopOffsetUnits.Desktop }`
							: '0'
					};
                    left: ${
						navigationArrowPositionLeftOffset.Desktop
							? `${ navigationArrowPositionLeftOffset.Desktop }${ navigationArrowPositionLeftOffsetUnits.Desktop }`
							: '0'
					};
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'top-center'
						? `
                    top: ${
						navigationArrowPositionTopOffset.Desktop
							? `${ navigationArrowPositionTopOffset.Desktop }${ navigationArrowPositionTopOffsetUnits.Desktop }`
							: '0'
					};
                    left: ${
						navigationArrowPositionLeftOffset.Desktop
							? `${ navigationArrowPositionLeftOffset.Desktop }${ navigationArrowPositionLeftOffsetUnits.Desktop }`
							: '50%'
					};
                    transform: translateX(-50%);
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'top-right'
						? `
                    top: ${
						navigationArrowPositionTopOffset.Desktop
							? `${ navigationArrowPositionTopOffset.Desktop }${ navigationArrowPositionTopOffsetUnits.Desktop }`
							: '0'
					};
                    right: ${
						navigationArrowPositionRightOffset.Desktop
							? `${ navigationArrowPositionRightOffset.Desktop }${ navigationArrowPositionRightOffsetUnits.Desktop }`
							: '0'
					};
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'bottom-left'
						? `
                    bottom: ${
						navigationArrowPositionBottomOffset.Desktop
							? `${ navigationArrowPositionBottomOffset.Desktop }${ navigationArrowPositionBottomOffsetUnits.Desktop }`
							: '0'
					};
                    left: ${
						navigationArrowPositionLeftOffset.Desktop
							? `${ navigationArrowPositionLeftOffset.Desktop }${ navigationArrowPositionLeftOffsetUnits.Desktop }`
							: '0'
					};
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'bottom-center'
						? `
                    bottom: ${
						navigationArrowPositionBottomOffset.Desktop
							? `${ navigationArrowPositionBottomOffset.Desktop }${ navigationArrowPositionBottomOffsetUnits.Desktop }`
							: '0'
					};
                    left: ${
						navigationArrowPositionLeftOffset.Desktop
							? `${ navigationArrowPositionLeftOffset.Desktop }${ navigationArrowPositionLeftOffsetUnits.Desktop }`
							: '50%'
					};
                    transform: translateX(-50%);
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'bottom-right'
						? `
                    bottom: ${
						navigationArrowPositionBottomOffset.Desktop
							? `${ navigationArrowPositionBottomOffset.Desktop }${ navigationArrowPositionBottomOffsetUnits.Desktop }`
							: '0'
					};
                    right: ${
						navigationArrowPositionRightOffset.Desktop
							? `${ navigationArrowPositionRightOffset.Desktop }${ navigationArrowPositionRightOffsetUnits.Desktop }`
							: '0'
					};
                `
						: ''
				}
            }
        
            .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } .swiper-button-prev,
            .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } .swiper-button-next,
            .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } .swiper-button-prev,
            .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } .swiper-button-next {
                position: relative;
                top: auto;
                right: auto;
                bottom: auto;
                left: auto;
                margin: 0 !important;
            }
        `
				: ''
		}

        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev:after,
        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next:after {
            display: none !important;
        }
        
        .${ blockId } .swiper-button-prev,
        .${ blockId } .swiper-button-next {
            ${ navigationArrowColor ? `color: ${ navigationArrowColor };` : '' }
            ${
				navigationArrowNormalBackgroundType === 'gradient'
					? `  
                background: ${
					navigationArrowNormalCustomGradientSwitcher &&
					navigationArrowNormalCustomGradientInputValue
						? navigationArrowNormalCustomGradientInputValue
						: navigationArrowNormalGradientColor
						? navigationArrowNormalGradientColor
						: navigationArrowNormalClassicColor
				};
            `
					: `
                ${
					navigationArrowNormalClassicColor
						? `background: ${ navigationArrowNormalClassicColor };`
						: ''
				}
            `
			}
            ${
				navigationArrowBorder
					? `border: ${ navigationArrowBorder };`
					: ''
			}
			${
				navigationArrowDesktopBorderCssStyle
					? `border-width: ${ navigationArrowDesktopBorderCssStyle };`
					: ''
			}  
			${
				navigationArrowDesktopBorderRadiusCssStyle
					? `border-radius: ${ navigationArrowDesktopBorderRadiusCssStyle };`
					: ''
			}
            ${
				navigationArrowBorderColor
					? `border-color: ${ navigationArrowBorderColor };`
					: ''
			}
            ${
				navigationArrowBoxShadowCssValue
					? `box-shadow: ${ navigationArrowBoxShadowCssValue };`
					: ''
			}
            ${
				navigationArrowWidth.Desktop
					? `width: ${ navigationArrowWidth.Desktop }${ navigationArrowWidthUnits.Desktop };`
					: ''
			}
            ${
				navigationArrowHeight.Desktop
					? `height: ${ navigationArrowHeight.Desktop }${ navigationArrowHeightUnits.Desktop };`
					: ''
			}
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            line-height: 1;
            cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            transition: color .3s ease-in-out, background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out, transform .3s ease-in-out;
        }
        .${ blockId } .swiper-button-prev:focus-visible,
        .${ blockId } .swiper-button-next:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }
        .${ blockId } .swiper-button-prev.swiper-button-disabled,
        .${ blockId } .swiper-button-next.swiper-button-disabled {
            cursor: default;
            opacity: 0.45;
        }
        .${ blockId }.gslider-testimonial-wrapper:hover .swiper-button-prev,
        .${ blockId }.gslider-testimonial-wrapper:hover .swiper-button-next {
            ${
				navigationArrowColorHover
					? `color: ${ navigationArrowColorHover };`
					: ''
			}
            ${
				navigationArrowHoverBackgroundType === 'gradient'
					? `
                background: ${
					navigationArrowHoverCustomGradientSwitcher &&
					navigationArrowHoverCustomGradientInputValue
						? navigationArrowHoverCustomGradientInputValue
						: navigationArrowHoverGradientColor
						? navigationArrowHoverGradientColor
						: navigationArrowHoverClassicColor
				};
            `
					: `
                ${
					navigationArrowHoverClassicColor
						? `background: ${ navigationArrowHoverClassicColor };`
						: ''
				}
            `
			}
            ${
				navigationArrowBorderHoverColor
					? `border-color: ${ navigationArrowBorderHoverColor };`
					: ''
			}
            ${
				navigationArrowBoxShadowHoverCssValue
					? `box-shadow: ${ navigationArrowBoxShadowHoverCssValue };`
					: ''
			}
        }

        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
            ${ navigationArrowColor ? `fill: ${ navigationArrowColor };` : '' }
            ${
				navigationArrowSize.Desktop
					? `width: ${ navigationArrowSize.Desktop }${ navigationArrowSizeUnits.Desktop };`
					: ''
			}
            ${
				navigationArrowSize.Desktop
					? `height: ${ navigationArrowSize.Desktop }${ navigationArrowSizeUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
            ${
				navigationArrowSize.Desktop
					? `width: ${ navigationArrowSize.Desktop }${ navigationArrowSizeUnits.Desktop };`
					: ''
			}
            ${
				navigationArrowSize.Desktop
					? `height: ${ navigationArrowSize.Desktop }${ navigationArrowSizeUnits.Desktop };`
					: ''
			}
        }

        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
        .${ blockId }.gslider-testimonial-wrapper:hover .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
            ${
				navigationArrowColorHover
					? `fill: ${ navigationArrowColorHover };`
					: ''
			}
        }

        .${ blockId } .swiper-button-prev:after,
        .${ blockId } .swiper-button-next:after {
            ${
				navigationArrowSize.Desktop
					? `font-size: ${ navigationArrowSize.Desktop }${ navigationArrowSizeUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination {
            ${
				paginationType === 'progressbar'
					? paginationProgressbarPosition.Desktop
						? `top: ${ paginationProgressbarPosition.Desktop }${ paginationProgressbarPositionUnits.Desktop } !important;`
						: ''
					: paginationDotsPosition.Desktop
					? `bottom: ${ paginationDotsPosition.Desktop }${ paginationDotsPositionUnits.Desktop } !important;`
					: ''
			}
            ${
				paginationDotsDesktopMarginCssStyle
					? `margin: ${ paginationDotsDesktopMarginCssStyle };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-bullet {
            ${
				paginationNormalDotsBgColor
					? `background-color: ${ paginationNormalDotsBgColor };`
					: ''
			}
            ${
				paginationNormalDotsBorder
					? `border: ${ paginationNormalDotsBorder };`
					: ''
			}
			${
				paginationNormalDotsDesktopBorderCssStyle
					? `border-width: ${ paginationNormalDotsDesktopBorderCssStyle };`
					: ''
			}   
			${
				paginationNormalDotsDesktopBorderRadiusCssStyle
					? `border-radius: ${ paginationNormalDotsDesktopBorderRadiusCssStyle };`
					: ''
			}
            ${
				paginationNormalDotsBorderColor
					? `border-color: ${ paginationNormalDotsBorderColor };`
					: ''
			}
            ${
				paginationNormalDotsWidth.Desktop
					? `width: ${ paginationNormalDotsWidth.Desktop }${ paginationNormalDotsWidthUnits.Desktop };`
					: ''
			}
            ${
				paginationNormalDotsHeight.Desktop
					? `height: ${ paginationNormalDotsHeight.Desktop }${ paginationNormalDotsHeightUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-bullet-active {
            ${
				paginationActiveDotsBgColor
					? `background-color: ${ paginationActiveDotsBgColor };`
					: ''
			}
            ${
				paginationActiveDotsBorder
					? `border: ${ paginationActiveDotsBorder };`
					: ''
			}
			${
				paginationActiveDotsDesktopBorderCssStyle
					? `border-width: ${ paginationActiveDotsDesktopBorderCssStyle };`
					: ''
			}   
			${
				paginationActiveDotsDesktopBorderRadiusCssStyle
					? `border-radius: ${ paginationActiveDotsDesktopBorderRadiusCssStyle };`
					: ''
			}
            ${
				paginationActiveDotsBorderColor
					? `border-color: ${ paginationActiveDotsBorderColor };`
					: ''
			}
            ${
				paginationActiveDotsWidth.Desktop
					? `width: ${ paginationActiveDotsWidth.Desktop }${ paginationActiveDotsWidthUnits.Desktop };`
					: ''
			}
            ${
				paginationActiveDotsHeight.Desktop
					? `height: ${ paginationActiveDotsHeight.Desktop }${ paginationActiveDotsHeightUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-bullet:hover {
            ${
				paginationNormalDotsBorderHoverColor
					? `border-color: ${ paginationNormalDotsBorderHoverColor };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-bullet-active:hover {
            ${
				paginationActiveDotsBorderHoverColor
					? `border-color: ${ paginationActiveDotsBorderHoverColor };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-fraction { 
            ${
				paginationFractionFontFamily
					? `font-family: ${ paginationFractionFontFamily };`
					: ''
			}
            ${
				paginationFractionFontSize.Desktop &&
				paginationFractionFontSizeUnits.Desktop
					? `font-size: ${ paginationFractionFontSize.Desktop }${ paginationFractionFontSizeUnits.Desktop };`
					: ''
			}
            ${
				paginationFractionFontWeight
					? `font-weight: ${ paginationFractionFontWeight };`
					: ''
			}
            ${
				paginationFractionFontStyle
					? `font-style: ${ paginationFractionFontStyle };`
					: ''
			}
            ${
				paginationFractionTextTransform
					? `text-transform: ${ paginationFractionTextTransform };`
					: ''
			}
            ${
				paginationFractionTextDecoration
					? `text-decoration: ${ paginationFractionTextDecoration };`
					: ''
			}
            ${
				paginationFractionLineHeight.Desktop &&
				paginationFractionLineHeightUnits.Desktop
					? `line-height: ${ paginationFractionLineHeight.Desktop }${ paginationFractionLineHeightUnits.Desktop };`
					: ''
			}
            ${
				paginationFractionLetterSpacing.Desktop &&
				paginationFractionLetterSpacingUnits.Desktop
					? `letter-spacing: ${ paginationFractionLetterSpacing.Desktop }${ paginationFractionLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				paginationFractionWordSpacing.Desktop &&
				paginationFractionWordSpacingUnits.Desktop
					? `word-spacing: ${ paginationFractionWordSpacing.Desktop }${ paginationFractionWordSpacingUnits.Desktop };`
					: ''
			}
            ${
				paginationFractionColor
					? `color: ${ paginationFractionColor };`
					: ''
			}
            transition: color .3s ease-in-out;
        }

        .${ blockId }.gslider-testimonial-wrapper:hover .swiper-pagination-fraction {
            ${
				paginationFractionColorHover
					? `color: ${ paginationFractionColorHover };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-progressbar {
            ${
				paginationProgressbarBGColor
					? `background-color: ${ paginationProgressbarBGColor };`
					: ''
			}
            ${
				paginationProgressbarHeight.Desktop
					? `height: ${ paginationProgressbarHeight.Desktop }${ paginationProgressbarHeightUnits.Desktop };`
					: ''
			}
        }

        .${ blockId } .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
            ${
				paginationProgressbarBGActiveColor
					? `background-color: ${ paginationProgressbarBGActiveColor };`
					: ''
			}
        }

        ${
			paginationPositionType === 'outside'
				? `
            .${ blockId }.gslider-testimonial-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-custom,
            .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-fraction {
                bottom: -${
					paginationOutsideOffset?.Desktop
						? `${ paginationOutsideOffset.Desktop }${
								paginationOutsideOffsetUnits?.Desktop || 'px'
						  }`
						: '30px'
				} !important;
            }
        `
				: ''
		}

        ${
			paginationPositionType === 'outside' && direction === 'vertical'
				? `
            .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-bullets.swiper-pagination-vertical,
            .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-vertical.swiper-pagination-bullets {
                top: 50%;
                bottom: auto !important;
                left: auto;
                right: -${
					paginationOutsideOffset?.Desktop
						? `${ paginationOutsideOffset.Desktop }${
								paginationOutsideOffsetUnits?.Desktop || 'px'
						  }`
						: '30px'
				} !important;
                transform: translate3d(0, -50%, 0);
            }
        `
				: ''
		}

        ${
			paginationPositionType === 'outside' &&
			showPagination?.Desktop &&
			( direction !== 'vertical' || paginationType !== 'bullets' )
				? `
        .${ blockId }.gslider-testimonial-wrapper.has-pagination {
            margin-bottom: ${
				paginationOutsideOffset?.Desktop
					? `${ paginationOutsideOffset.Desktop }${
							paginationOutsideOffsetUnits?.Desktop || 'px'
					  }`
					: '30px'
			};
        }
        `
				: ''
		}

        ${
			paginationPositionType === 'outside' &&
			showPagination?.Desktop &&
			direction === 'vertical' &&
			paginationType === 'bullets'
				? `
        .${ blockId }.gslider-testimonial-wrapper.has-pagination {
            margin-right: ${
				paginationOutsideOffset?.Desktop
					? `${ paginationOutsideOffset.Desktop }${
							paginationOutsideOffsetUnits?.Desktop || 'px'
					  }`
					: '30px'
			};
        }
        `
				: ''
		}

        @media only screen and (max-width: 1024px) {

            .${ blockId }.gslider-testimonial-wrapper {
                ${ globalTabletBackgroundNormalStyles }
                ${
					globalMarginTabletCssStyle
						? `margin: ${ globalMarginTabletCssStyle };`
						: ''
				} 
                ${
					globalPaddingTabletCssStyle
						? `padding: ${ globalPaddingTabletCssStyle };`
						: ''
				}
                ${
					globalBorderTabletCssStyle
						? `border-width: ${ globalBorderTabletCssStyle };`
						: ''
				}  
                ${
					globalBorderRadiusTabletCssStyle
						? `border-radius: ${ globalBorderRadiusTabletCssStyle } !important;`
						: ''
				}
                ${
					globalZIndex.Tablet
						? `z-index: ${ globalZIndex.Tablet };`
						: ''
				}
            }
            .${ blockId }.gslider-testimonial-wrapper:hover { 
                ${ globalTabletBackgroundHoverStyles }
            }

            .${ blockId } .swiper-wrapper {
                ${
					layoutHeight.Tablet && layoutHeightSwitcher === 'fixed'
						? `min-height: ${ layoutHeight.Tablet }${ layoutHeightUnits.Tablet };`
						: 'auto'
				}
            }

            ${
				direction === 'vertical' &&
				Number( verticalHeight?.Tablet || '420' ) > 0 &&
				( verticalHeightUnits?.Tablet || 'px' ) !== '%'
					? `.${ blockId }.gslider-testimonial-wrapper > .swiper {
                height: ${ verticalHeight?.Tablet || '420' }${
					verticalHeightUnits?.Tablet || 'px'
				};
            }`
					: ''
			}

            .${ blockId } .swiper-slide{
                ${
					layoutHeight.Tablet &&
					layoutHeightSwitcher === 'fixed' &&
					direction !== 'vertical'
						? `min-height: ${ layoutHeight.Tablet }${ layoutHeightUnits.Tablet };`
						: 'auto'
				}
            }
            
            .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper {
                ${
					contentVerticalAlignment?.Tablet
						? `justify-content: ${ contentVerticalAlignment.Tablet };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${
					contentWidth?.Tablet
						? `max-width: ${ contentWidth.Tablet }${ contentWidthUnits?.Tablet };`
						: ''
				}
                ${
					contentAlignment?.Tablet
						? `text-align: ${ contentAlignment.Tablet };`
						: ''
				}
                ${
					contentHorizontalAlignment?.Tablet
						? `align-items: ${
								contentHorizontalAlignment.Tablet === 'left'
									? 'flex-start'
									: contentHorizontalAlignment.Tablet ===
									  'right'
									? 'flex-end'
									: 'center'
						  };`
						: ''
				}

                ${
					contentHorizontalAlignment?.Tablet === 'left'
						? `margin-right: auto; margin-left: 0;`
						: ''
				}
                ${
					contentHorizontalAlignment?.Tablet === 'center'
						? `margin-left: auto; margin-right: auto;`
						: ''
				}
                ${
					contentHorizontalAlignment?.Tablet === 'right'
						? `margin-left: auto; margin-right: 0;`
						: ''
				}
                ${
					contentPaddingTabletCssStyle
						? `padding: ${ contentPaddingTabletCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-testimonial-content-group,
            .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group {
                ${
					contentHorizontalAlignment?.Tablet
						? `align-items: ${
								contentHorizontalAlignment.Tablet === 'left'
									? 'flex-start'
									: contentHorizontalAlignment.Tablet ===
									  'right'
									? 'flex-end'
									: 'center'
						  };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group .gslider-author-meta {
                ${
					contentAlignment?.Tablet
						? `text-align: ${ contentAlignment.Tablet };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-author-name-wrapper .gslider-testimonial-author-name {
                ${
					authorNameFontSize.Tablet && authorNameFontSizeUnits.Tablet
						? `font-size: ${ authorNameFontSize.Tablet }${ authorNameFontSizeUnits.Tablet };`
						: ''
				}
                ${
					authorNameLineHeight.Tablet &&
					authorNameLineHeightUnits.Tablet
						? `line-height: ${ authorNameLineHeight.Tablet }${ authorNameLineHeightUnits.Tablet };`
						: ''
				}
                ${
					authorNameLetterSpacing.Tablet &&
					authorNameLetterSpacingUnits.Tablet
						? `letter-spacing: ${ authorNameLetterSpacing.Tablet }${ authorNameLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					authorNameWordSpacing.Tablet &&
					authorNameWordSpacingUnits.Tablet
						? `word-spacing: ${ authorNameWordSpacing.Tablet }${ authorNameWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					authorNameTabletMarginCssStyle
						? `margin: ${ authorNameTabletMarginCssStyle };`
						: ''
				} 
                ${
					authorNameTabletPaddingCssStyle
						? `padding: ${ authorNameTabletPaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-title-wrapper .gslider-testimonial-title {
                ${
					testimonialTitleFontSize.Tablet &&
					testimonialTitleFontSizeUnits.Tablet
						? `font-size: ${ testimonialTitleFontSize.Tablet }${ testimonialTitleFontSizeUnits.Tablet };`
						: ''
				}
                ${
					testimonialTitleLineHeight.Tablet &&
					testimonialTitleLineHeightUnits.Tablet
						? `line-height: ${ testimonialTitleLineHeight.Tablet }${ testimonialTitleLineHeightUnits.Tablet };`
						: ''
				}
                ${
					testimonialTitleLetterSpacing.Tablet &&
					testimonialTitleLetterSpacingUnits.Tablet
						? `letter-spacing: ${ testimonialTitleLetterSpacing.Tablet }${ testimonialTitleLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					testimonialTitleWordSpacing.Tablet &&
					testimonialTitleWordSpacingUnits.Tablet
						? `word-spacing: ${ testimonialTitleWordSpacing.Tablet }${ testimonialTitleWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					testimonialTitleTabletMarginCssStyle
						? `margin: ${ testimonialTitleTabletMarginCssStyle };`
						: ''
				}
                ${
					testimonialTitleTabletPaddingCssStyle
						? `padding: ${ testimonialTitleTabletPaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-author-designation-wrapper .gslider-testimonial-author-designation {
                ${
					authorDesignationFontSize.Tablet &&
					authorDesignationFontSizeUnits.Tablet
						? `font-size: ${ authorDesignationFontSize.Tablet }${ authorDesignationFontSizeUnits.Tablet };`
						: ''
				}
                ${
					authorDesignationLineHeight.Tablet &&
					authorDesignationLineHeightUnits.Tablet
						? `line-height: ${ authorDesignationLineHeight.Tablet }${ authorDesignationLineHeightUnits.Tablet };`
						: ''
				}
                ${
					authorDesignationLetterSpacing.Tablet &&
					authorDesignationLetterSpacingUnits.Tablet
						? `letter-spacing: ${ authorDesignationLetterSpacing.Tablet }${ authorDesignationLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					authorDesignationWordSpacing.Tablet &&
					authorDesignationWordSpacingUnits.Tablet
						? `word-spacing: ${ authorDesignationWordSpacing.Tablet }${ authorDesignationWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					authorDesignationTabletMarginCssStyle
						? `margin: ${ authorDesignationTabletMarginCssStyle };`
						: ''
				} 
                ${
					authorDesignationTabletPaddingCssStyle
						? `padding: ${ authorDesignationTabletPaddingCssStyle };`
						: ''
				}
            }
            
            /** Start Quote Icon Style */
            .${ blockId } .gslider-testimonial-quote-icon-wrapper {
                ${
					quoteIconTabletMarginCssStyle
						? `margin: ${ quoteIconTabletMarginCssStyle };`
						: ''
				}
                ${
					quoteIconTabletPaddingCssStyle
						? `padding: ${ quoteIconTabletPaddingCssStyle };`
						: ''
				}
                
                ${
					quoteIconTabletBorderCssStyle
						? `border-width: ${ quoteIconTabletBorderCssStyle };`
						: ''
				}
                ${
					quoteIconTabletBorderRadiusCssStyle
						? `border-radius: ${ quoteIconTabletBorderRadiusCssStyle };`
						: ''
				}
                ${
					quoteIconOpacity.Tablet
						? `opacity: ${ quoteIconOpacity.Tablet };`
						: ''
				}
                ${
					quoteIconRotate.Tablet
						? `transform: rotate(${ quoteIconRotate.Tablet }deg);`
						: ''
				}
                ${
					quoteIconZIndex.Tablet
						? `z-index: ${ quoteIconZIndex.Tablet };`
						: ''
				}
                ${
					quoteIconPositionSwitcher
						? `
                    position: absolute;
                    ${
						quoteIconPositionTop.Tablet
							? `top: ${ quoteIconPositionTop.Tablet }${ quoteIconPositionTopUnits.Tablet };`
							: ''
					}
                    ${
						quoteIconPositionBottom.Tablet
							? `bottom: ${ quoteIconPositionBottom.Tablet }${ quoteIconPositionBottomUnits.Tablet };`
							: ''
					}
                    ${
						quoteIconPositionLeft.Tablet
							? `left: ${ quoteIconPositionLeft.Tablet }${ quoteIconPositionLeftUnits.Tablet };`
							: ''
					}
                    ${
						quoteIconPositionRight.Tablet
							? `right: ${ quoteIconPositionRight.Tablet }${ quoteIconPositionRightUnits.Tablet };`
							: ''
					}
                `
						: 'position: relative;'
				}
            }

            ${
				quoteIconHoverRotate.Tablet
					? `
                .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-quote-icon-wrapper {
                    transform: rotate(${ quoteIconHoverRotate.Tablet }deg);
                }
            `
					: ''
			}
            .${ blockId } .gslider-testimonial-quote-icon-wrapper svg,
            .${ blockId } .gslider-testimonial-quote-icon-wrapper img {
                ${
					quoteIconSize.Tablet && quoteIconSizeUnits.Tablet
						? `width: ${ quoteIconSize.Tablet }${ quoteIconSizeUnits.Tablet };`
						: ''
				}
                ${
					quoteIconSize.Tablet && quoteIconSizeUnits.Tablet
						? `height: ${ quoteIconSize.Tablet }${ quoteIconSizeUnits.Tablet };`
						: ''
				}
            }
            /** End Quote Icon Style */

            .${ blockId } .gslider-testimonial-author-image-wrapper .gslider-testimonial-author-image {
                ${
					authorImageSize?.Tablet
						? `width: ${ authorImageSize.Tablet }${
								authorImageSizeUnits?.Tablet || 'px'
						  };`
						: ''
				}
                ${
					authorImageSize?.Tablet
						? `height: ${ authorImageSize.Tablet }${
								authorImageSizeUnits?.Tablet || 'px'
						  };`
						: ''
				}
                ${
					authorImageTabletBorderWidthCssStyle
						? `border-width: ${ authorImageTabletBorderWidthCssStyle };`
						: ''
				}
                ${
					authorImageTabletBorderRadiusCssStyle
						? `border-radius: ${ authorImageTabletBorderRadiusCssStyle };`
						: ''
				}
                ${
					authorImageTabletMarginCssStyle
						? `margin: ${ authorImageTabletMarginCssStyle };`
						: ''
				}
                ${
					authorImageTabletPaddingCssStyle
						? `padding: ${ authorImageTabletPaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-text-wrapper .gslider-testimonial-text {
                ${
					testimonialTextFontSize.Tablet &&
					testimonialTextFontSizeUnits.Tablet
						? `font-size: ${ testimonialTextFontSize.Tablet }${ testimonialTextFontSizeUnits.Tablet };`
						: ''
				}
                ${
					testimonialTextLineHeight.Tablet &&
					testimonialTextLineHeightUnits.Tablet
						? `line-height: ${ testimonialTextLineHeight.Tablet }${ testimonialTextLineHeightUnits.Tablet };`
						: ''
				}
                ${
					testimonialTextLetterSpacing.Tablet &&
					testimonialTextLetterSpacingUnits.Tablet
						? `letter-spacing: ${ testimonialTextLetterSpacing.Tablet }${ testimonialTextLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					testimonialTextWordSpacing.Tablet &&
					testimonialTextWordSpacingUnits.Tablet
						? `word-spacing: ${ testimonialTextWordSpacing.Tablet }${ testimonialTextWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					testimonialTextTabletMarginCssStyle
						? `margin: ${ testimonialTextTabletMarginCssStyle };`
						: ''
				} 
                ${
					testimonialTextTabletPaddingCssStyle
						? `padding: ${ testimonialTextTabletPaddingCssStyle };`
						: ''
				}
            }

            .${ blockId } .gslider-testimonial-rating-wrapper {
                ${
					ratingTabletMarginCssStyle
						? `margin: ${ ratingTabletMarginCssStyle };`
						: ''
				}
                ${
					ratingTabletPaddingCssStyle
						? `padding: ${ ratingTabletPaddingCssStyle };`
						: ''
				}
            }
            .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-inner {
                justify-content: ${
					contentHorizontalAlignment.Tablet === 'left'
						? 'flex-start'
						: contentHorizontalAlignment.Tablet === 'right'
						? 'flex-end'
						: 'center'
				};
                gap: ${
					ratingNumberGap.Tablet
						? `${ ratingNumberGap.Tablet }${ ratingNumberGapUnits.Tablet }`
						: '10px'
				};
            }
            .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-inner .gslider-testimonial-rating-wrap {
                gap: ${
					ratingStarGap.Tablet
						? `${ ratingStarGap.Tablet }${
								ratingStarGapUnits?.Tablet || 'px'
						  }`
						: '5px'
				};
            }
            .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon svg {
                ${
					ratingStarSize.Tablet
						? `width: ${ ratingStarSize.Tablet }${ ratingStarSizeUnits.Tablet };`
						: ''
				}
                ${
					ratingStarSize.Tablet
						? `height: ${ ratingStarSize.Tablet }${ ratingStarSizeUnits.Tablet };`
						: ''
				}
            }
            .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-star-partial-fill svg {
                ${
					ratingStarSize.Tablet
						? `min-width: ${ ratingStarSize.Tablet }${ ratingStarSizeUnits.Tablet };`
						: ''
				}
                ${
					ratingStarSize.Tablet
						? `width: ${ ratingStarSize.Tablet }${ ratingStarSizeUnits.Tablet };`
						: ''
				}
            }
            .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-number {
                ${
					ratingNumberFontSize.Tablet &&
					ratingNumberFontSizeUnits.Tablet
						? `font-size: ${ ratingNumberFontSize.Tablet }${ ratingNumberFontSizeUnits.Tablet };`
						: ''
				}
                ${
					ratingNumberLineHeight.Tablet &&
					ratingNumberLineHeightUnits.Tablet
						? `line-height: ${ ratingNumberLineHeight.Tablet }${ ratingNumberLineHeightUnits.Tablet };`
						: ''
				}
                ${
					ratingNumberLetterSpacing.Tablet &&
					ratingNumberLetterSpacingUnits.Tablet
						? `letter-spacing: ${ ratingNumberLetterSpacing.Tablet }${ ratingNumberLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					ratingNumberWordSpacing.Tablet &&
					ratingNumberWordSpacingUnits.Tablet
						? `word-spacing: ${ ratingNumberWordSpacing.Tablet }${ ratingNumberWordSpacingUnits.Tablet };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper.outside {
                ${
					navigationArrowPosition === 'top-left' ||
					navigationArrowPosition === 'top-center' ||
					navigationArrowPosition === 'top-right'
						? `
                    padding: ${ navigationArrowPositionOutsidePadding.Tablet }${ navigationArrowPositionOutsidePaddingUnits.Tablet } 0 0;
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'bottom-left' ||
					navigationArrowPosition === 'bottom-center' ||
					navigationArrowPosition === 'bottom-right'
						? `
                    padding: 0 0 ${ navigationArrowPositionOutsidePadding.Tablet }${ navigationArrowPositionOutsidePaddingUnits.Tablet };
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'center' &&
					direction === 'vertical'
						? `
                    padding: ${ navigationArrowPositionOutsidePadding.Tablet }${ navigationArrowPositionOutsidePaddingUnits.Tablet } 0;

                `
						: ''
				}

                ${
					navigationArrowPosition === 'center' &&
					direction !== 'vertical'
						? `
                    padding: 0 ${ navigationArrowPositionOutsidePadding.Tablet }${ navigationArrowPositionOutsidePaddingUnits.Tablet };

                `
						: ''
				}
            }

            ${
				navigationArrowPosition && navigationArrowPosition !== 'center'
					? `

                .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition },
                .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } { 
                    gap: ${
						navigationArrowGap.Tablet
							? `${ navigationArrowGap.Tablet }${ navigationArrowGapUnits.Tablet }`
							: '10px'
					};
                    ${
						navigationArrowPosition === 'top-left'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Tablet
								? `${ navigationArrowPositionTopOffset.Tablet }${ navigationArrowPositionTopOffsetUnits.Tablet }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Tablet
								? `${ navigationArrowPositionLeftOffset.Tablet }${ navigationArrowPositionLeftOffsetUnits.Tablet }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'top-center'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Tablet
								? `${ navigationArrowPositionTopOffset.Tablet }${ navigationArrowPositionTopOffsetUnits.Tablet }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Tablet
								? `${ navigationArrowPositionLeftOffset.Tablet }${ navigationArrowPositionLeftOffsetUnits.Tablet }`
								: '50%'
						};
                        transform: translateX(-50%);
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'top-right'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Tablet
								? `${ navigationArrowPositionTopOffset.Tablet }${ navigationArrowPositionTopOffsetUnits.Tablet }`
								: '0'
						};
                        right: ${
							navigationArrowPositionRightOffset.Tablet
								? `${ navigationArrowPositionRightOffset.Tablet }${ navigationArrowPositionRightOffsetUnits.Tablet }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-left'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Tablet
								? `${ navigationArrowPositionBottomOffset.Tablet }${ navigationArrowPositionBottomOffsetUnits.Tablet }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Tablet
								? `${ navigationArrowPositionLeftOffset.Tablet }${ navigationArrowPositionLeftOffsetUnits.Tablet }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-center'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Tablet
								? `${ navigationArrowPositionBottomOffset.Tablet }${ navigationArrowPositionBottomOffsetUnits.Tablet }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Tablet
								? `${ navigationArrowPositionLeftOffset.Tablet }${ navigationArrowPositionLeftOffsetUnits.Tablet }`
								: '50%'
						};
                        transform: translateX(-50%);
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-right'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Tablet
								? `${ navigationArrowPositionBottomOffset.Tablet }${ navigationArrowPositionBottomOffsetUnits.Tablet }`
								: '0'
						};
                        right: ${
							navigationArrowPositionRightOffset.Tablet
								? `${ navigationArrowPositionRightOffset.Tablet }${ navigationArrowPositionRightOffsetUnits.Tablet }`
								: '0'
						};
                    `
							: ''
					}
                }
                    
            `
					: ''
			}

            .${ blockId } .swiper-button-prev,
            .${ blockId } .swiper-button-next {
                ${
					navigationArrowTabletBorderCssStyle
						? `border-width: ${ navigationArrowTabletBorderCssStyle };`
						: ''
				}  
                ${
					navigationArrowTabletBorderRadiusCssStyle
						? `border-radius: ${ navigationArrowTabletBorderRadiusCssStyle };`
						: ''
				}
                ${
					navigationArrowWidth.Tablet
						? `width: ${ navigationArrowWidth.Tablet }${ navigationArrowWidthUnits.Tablet };`
						: ''
				}
                ${
					navigationArrowHeight.Tablet
						? `height: ${ navigationArrowHeight.Tablet }${ navigationArrowHeightUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${
					navigationArrowSize.Tablet
						? `width: ${ navigationArrowSize.Tablet }${ navigationArrowSizeUnits.Tablet };`
						: ''
				}
                ${
					navigationArrowSize.Tablet
						? `height: ${ navigationArrowSize.Tablet }${ navigationArrowSizeUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${
					navigationArrowSize.Tablet
						? `width: ${ navigationArrowSize.Tablet }${ navigationArrowSizeUnits.Tablet };`
						: ''
				}
                ${
					navigationArrowSize.Tablet
						? `height: ${ navigationArrowSize.Tablet }${ navigationArrowSizeUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .swiper-button-prev:after,
            .${ blockId } .swiper-button-next:after {
                ${
					navigationArrowSize.Tablet
						? `font-size: ${ navigationArrowSize.Tablet }${ navigationArrowSizeUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination {
                ${
					paginationType === 'progressbar'
						? paginationProgressbarPosition.Tablet
							? `top: ${ paginationProgressbarPosition.Tablet }${ paginationProgressbarPositionUnits.Tablet } !important;`
							: ''
						: paginationDotsPosition.Tablet
						? `bottom: ${ paginationDotsPosition.Tablet }${ paginationDotsPositionUnits.Tablet } !important;`
						: ''
				}
                ${
					paginationDotsTabletMarginCssStyle
						? `margin: ${ paginationDotsTabletMarginCssStyle };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-bullet {
                ${
					paginationNormalDotsTabletBorderCssStyle
						? `border-width: ${ paginationNormalDotsTabletBorderCssStyle };`
						: ''
				}   
                ${
					paginationNormalDotsTabletBorderRadiusCssStyle
						? `border-radius: ${ paginationNormalDotsTabletBorderRadiusCssStyle };`
						: ''
				}
                ${
					paginationNormalDotsWidth.Tablet
						? `width: ${ paginationNormalDotsWidth.Tablet }${ paginationNormalDotsWidthUnits.Tablet };`
						: ''
				}
                ${
					paginationNormalDotsHeight.Tablet
						? `height: ${ paginationNormalDotsHeight.Tablet }${ paginationNormalDotsHeightUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-bullet-active {
                ${
					paginationActiveDotsTabletBorderCssStyle
						? `border-width: ${ paginationActiveDotsTabletBorderCssStyle };`
						: ''
				}   
                ${
					paginationActiveDotsTabletBorderRadiusCssStyle
						? `border-radius: ${ paginationActiveDotsTabletBorderRadiusCssStyle };`
						: ''
				}
                ${
					paginationActiveDotsWidth.Tablet
						? `width: ${ paginationActiveDotsWidth.Tablet }${ paginationActiveDotsWidthUnits.Tablet };`
						: ''
				}
                ${
					paginationActiveDotsHeight.Tablet
						? `height: ${ paginationActiveDotsHeight.Tablet }${ paginationActiveDotsHeightUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-fraction { 
                ${
					paginationFractionFontSize.Tablet &&
					paginationFractionFontSizeUnits.Tablet
						? `font-size: ${ paginationFractionFontSize.Tablet }${ paginationFractionFontSizeUnits.Tablet };`
						: ''
				}
                ${
					paginationFractionLineHeight.Tablet &&
					paginationFractionLineHeightUnits.Tablet
						? `line-height: ${ paginationFractionLineHeight.Tablet }${ paginationFractionLineHeightUnits.Tablet };`
						: ''
				}
                ${
					paginationFractionLetterSpacing.Tablet &&
					paginationFractionLetterSpacingUnits.Tablet
						? `letter-spacing: ${ paginationFractionLetterSpacing.Tablet }${ paginationFractionLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					paginationFractionWordSpacing.Tablet &&
					paginationFractionWordSpacingUnits.Tablet
						? `word-spacing: ${ paginationFractionWordSpacing.Tablet }${ paginationFractionWordSpacingUnits.Tablet };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-progressbar {
                ${
					paginationProgressbarHeight.Tablet
						? `height: ${ paginationProgressbarHeight.Tablet }${ paginationProgressbarHeightUnits.Tablet };`
						: ''
				}
            }

            ${
				paginationPositionType === 'outside'
					? `   
                .${ blockId }.gslider-testimonial-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-custom,
                .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-fraction {
                    bottom: -${
						paginationOutsideOffset?.Tablet
							? `${ paginationOutsideOffset.Tablet }${
									paginationOutsideOffsetUnits?.Tablet || 'px'
							  }`
							: paginationOutsideOffset?.Desktop
							? `${ paginationOutsideOffset.Desktop }${
									paginationOutsideOffsetUnits?.Desktop ||
									'px'
							  }`
							: '30px'
					} !important;
                }
            `
					: ''
			}

            ${
				paginationPositionType === 'outside' && direction === 'vertical'
					? `
                .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-bullets.swiper-pagination-vertical,
                .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-vertical.swiper-pagination-bullets {
                    top: 50%;
                    bottom: auto !important;
                    left: auto;
                    right: -${
						paginationOutsideOffset?.Tablet
							? `${ paginationOutsideOffset.Tablet }${
									paginationOutsideOffsetUnits?.Tablet || 'px'
							  }`
							: paginationOutsideOffset?.Desktop
							? `${ paginationOutsideOffset.Desktop }${
									paginationOutsideOffsetUnits?.Desktop ||
									'px'
							  }`
							: '30px'
					} !important;
                    transform: translate3d(0, -50%, 0);
                }
            `
					: ''
			}

            ${
				paginationPositionType === 'outside' &&
				( direction !== 'vertical' || paginationType !== 'bullets' )
					? `
                ${
					showPagination?.Tablet
						? `
                    .${ blockId }.gslider-testimonial-wrapper.has-pagination {
                        margin-bottom: ${
							paginationOutsideOffset?.Tablet
								? `${ paginationOutsideOffset.Tablet }${
										paginationOutsideOffsetUnits?.Tablet ||
										'px'
								  }`
								: paginationOutsideOffset?.Desktop
								? `${ paginationOutsideOffset.Desktop }${
										paginationOutsideOffsetUnits?.Desktop ||
										'px'
								  }`
								: '30px'
						};
                    }
                `
						: showPagination?.Desktop
						? `
                    .${ blockId }.gslider-testimonial-wrapper.has-pagination {
                        margin-bottom: 0;
                    }
                `
						: ''
				}
            `
					: ''
			}

            ${
				paginationPositionType === 'outside' &&
				direction === 'vertical' &&
				paginationType === 'bullets'
					? `
                ${
					showPagination?.Tablet
						? `
                    .${ blockId }.gslider-testimonial-wrapper.has-pagination {
                        margin-right: ${
							paginationOutsideOffset?.Tablet
								? `${ paginationOutsideOffset.Tablet }${
										paginationOutsideOffsetUnits?.Tablet ||
										'px'
								  }`
								: paginationOutsideOffset?.Desktop
								? `${ paginationOutsideOffset.Desktop }${
										paginationOutsideOffsetUnits?.Desktop ||
										'px'
								  }`
								: '30px'
						};
                    }
                `
						: showPagination?.Desktop
						? `
                    .${ blockId }.gslider-testimonial-wrapper.has-pagination {
                        margin-right: 0;
                    }
                `
						: ''
				}
            `
					: ''
			}
        }
        
        @media only screen and (max-width: 767px) {

            .${ blockId }.gslider-testimonial-wrapper {
                ${ globalMobileBackgroundNormalStyles }
                ${
					globalMarginMobileCssStyle
						? `margin: ${ globalMarginMobileCssStyle };`
						: ''
				} 
                ${
					globalPaddingMobileCssStyle
						? `padding: ${ globalPaddingMobileCssStyle };`
						: ''
				}
                ${
					globalBorderMobileCssStyle
						? `border-width: ${ globalBorderMobileCssStyle };`
						: ''
				}  
                ${
					globalBorderRadiusMobileCssStyle
						? `border-radius: ${ globalBorderRadiusMobileCssStyle } !important;`
						: ''
				}
                ${
					globalZIndex.Mobile
						? `z-index: ${ globalZIndex.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper:hover { 
                ${ globalMobileBackgroundHoverStyles }
            }

            .${ blockId } .swiper-wrapper {
                ${
					layoutHeight.Mobile && layoutHeightSwitcher === 'fixed'
						? `min-height: ${ layoutHeight.Mobile }${ layoutHeightUnits.Mobile };`
						: 'auto'
				}
            }

            ${
				direction === 'vertical' &&
				Number( verticalHeight?.Mobile || '350' ) > 0 &&
				( verticalHeightUnits?.Mobile || 'px' ) !== '%'
					? `.${ blockId }.gslider-testimonial-wrapper > .swiper {
                height: ${ verticalHeight?.Mobile || '350' }${
					verticalHeightUnits?.Mobile || 'px'
				};
            }`
					: ''
			}

            .${ blockId } .swiper-slide{
                ${
					layoutHeight.Mobile &&
					layoutHeightSwitcher === 'fixed' &&
					direction !== 'vertical'
						? `min-height: ${ layoutHeight.Mobile }${ layoutHeightUnits.Mobile };`
						: 'auto'
				}
            }
            
            .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper {
                ${
					contentVerticalAlignment?.Mobile
						? `justify-content: ${ contentVerticalAlignment.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${
					contentWidth?.Mobile
						? `max-width: ${ contentWidth.Mobile }${ contentWidthUnits?.Mobile };`
						: ''
				}
                ${
					contentAlignment?.Mobile
						? `text-align: ${ contentAlignment.Mobile };`
						: ''
				}
                ${
					contentHorizontalAlignment?.Mobile
						? `align-items: ${
								contentHorizontalAlignment.Mobile === 'left'
									? 'flex-start'
									: contentHorizontalAlignment.Mobile ===
									  'right'
									? 'flex-end'
									: 'center'
						  };`
						: ''
				}

                ${
					contentHorizontalAlignment?.Mobile === 'left'
						? `margin-right: auto; margin-left: 0;`
						: ''
				}
                ${
					contentHorizontalAlignment?.Mobile === 'center'
						? `margin-left: auto; margin-right: auto;`
						: ''
				}
                ${
					contentHorizontalAlignment?.Mobile === 'right'
						? `margin-left: auto; margin-right: 0;`
						: ''
				}
                ${
					contentPaddingMobileCssStyle
						? `padding: ${ contentPaddingMobileCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-testimonial-content-group,
            .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group {
                ${
					contentHorizontalAlignment?.Mobile
						? `align-items: ${
								contentHorizontalAlignment.Mobile === 'left'
									? 'flex-start'
									: contentHorizontalAlignment.Mobile ===
									  'right'
									? 'flex-end'
									: 'center'
						  };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group .gslider-author-meta {
                ${
					contentAlignment?.Mobile
						? `text-align: ${ contentAlignment.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-author-name-wrapper .gslider-testimonial-author-name {
                ${
					authorNameFontSize.Mobile && authorNameFontSizeUnits.Mobile
						? `font-size: ${ authorNameFontSize.Mobile }${ authorNameFontSizeUnits.Mobile };`
						: ''
				}
                ${
					authorNameLineHeight.Mobile &&
					authorNameLineHeightUnits.Mobile
						? `line-height: ${ authorNameLineHeight.Mobile }${ authorNameLineHeightUnits.Mobile };`
						: ''
				}
                ${
					authorNameLetterSpacing.Mobile &&
					authorNameLetterSpacingUnits.Mobile
						? `letter-spacing: ${ authorNameLetterSpacing.Mobile }${ authorNameLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					authorNameWordSpacing.Mobile &&
					authorNameWordSpacingUnits.Mobile
						? `word-spacing: ${ authorNameWordSpacing.Mobile }${ authorNameWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					authorNameMobileMarginCssStyle
						? `margin: ${ authorNameMobileMarginCssStyle };`
						: ''
				} 
                ${
					authorNameMobilePaddingCssStyle
						? `padding: ${ authorNameMobilePaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-title-wrapper .gslider-testimonial-title {
                ${
					testimonialTitleFontSize.Mobile &&
					testimonialTitleFontSizeUnits.Mobile
						? `font-size: ${ testimonialTitleFontSize.Mobile }${ testimonialTitleFontSizeUnits.Mobile };`
						: ''
				}
                ${
					testimonialTitleLineHeight.Mobile &&
					testimonialTitleLineHeightUnits.Mobile
						? `line-height: ${ testimonialTitleLineHeight.Mobile }${ testimonialTitleLineHeightUnits.Mobile };`
						: ''
				}
                ${
					testimonialTitleLetterSpacing.Mobile &&
					testimonialTitleLetterSpacingUnits.Mobile
						? `letter-spacing: ${ testimonialTitleLetterSpacing.Mobile }${ testimonialTitleLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					testimonialTitleWordSpacing.Mobile &&
					testimonialTitleWordSpacingUnits.Mobile
						? `word-spacing: ${ testimonialTitleWordSpacing.Mobile }${ testimonialTitleWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					testimonialTitleMobileMarginCssStyle
						? `margin: ${ testimonialTitleMobileMarginCssStyle };`
						: ''
				}
                ${
					testimonialTitleMobilePaddingCssStyle
						? `padding: ${ testimonialTitleMobilePaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-author-designation-wrapper .gslider-testimonial-author-designation {
                ${
					authorDesignationFontSize.Mobile &&
					authorDesignationFontSizeUnits.Mobile
						? `font-size: ${ authorDesignationFontSize.Mobile }${ authorDesignationFontSizeUnits.Mobile };`
						: ''
				}
                ${
					authorDesignationLineHeight.Mobile &&
					authorDesignationLineHeightUnits.Mobile
						? `line-height: ${ authorDesignationLineHeight.Mobile }${ authorDesignationLineHeightUnits.Mobile };`
						: ''
				}
                ${
					authorDesignationLetterSpacing.Mobile &&
					authorDesignationLetterSpacingUnits.Mobile
						? `letter-spacing: ${ authorDesignationLetterSpacing.Mobile }${ authorDesignationLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					authorDesignationWordSpacing.Mobile &&
					authorDesignationWordSpacingUnits.Mobile
						? `word-spacing: ${ authorDesignationWordSpacing.Mobile }${ authorDesignationWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					authorDesignationMobileMarginCssStyle
						? `margin: ${ authorDesignationMobileMarginCssStyle };`
						: ''
				} 
                ${
					authorDesignationMobilePaddingCssStyle
						? `padding: ${ authorDesignationMobilePaddingCssStyle };`
						: ''
				}
            }
            
            /** Start Quote Icon Style */
            .${ blockId } .gslider-testimonial-quote-icon-wrapper {
                ${
					quoteIconMobileMarginCssStyle
						? `margin: ${ quoteIconMobileMarginCssStyle };`
						: ''
				}
                ${
					quoteIconMobilePaddingCssStyle
						? `padding: ${ quoteIconMobilePaddingCssStyle };`
						: ''
				}

                ${
					quoteIconMobileBorderCssStyle
						? `border-width: ${ quoteIconMobileBorderCssStyle };`
						: ''
				}
                ${
					quoteIconMobileBorderRadiusCssStyle
						? `border-radius: ${ quoteIconMobileBorderRadiusCssStyle };`
						: ''
				}
                ${
					quoteIconOpacity.Mobile
						? `opacity: ${ quoteIconOpacity.Mobile };`
						: ''
				}
                ${
					quoteIconRotate.Mobile
						? `transform: rotate(${ quoteIconRotate.Mobile }deg);`
						: ''
				}
                ${
					quoteIconZIndex.Mobile
						? `z-index: ${ quoteIconZIndex.Mobile };`
						: ''
				}
                ${
					quoteIconPositionSwitcher
						? `
                    position: absolute;
                    ${
						quoteIconPositionTop.Mobile
							? `top: ${ quoteIconPositionTop.Mobile }${ quoteIconPositionTopUnits.Mobile };`
							: ''
					}
                    ${
						quoteIconPositionBottom.Mobile
							? `bottom: ${ quoteIconPositionBottom.Mobile }${ quoteIconPositionBottomUnits.Mobile };`
							: ''
					}
                    ${
						quoteIconPositionLeft.Mobile
							? `left: ${ quoteIconPositionLeft.Mobile }${ quoteIconPositionLeftUnits.Mobile };`
							: ''
					}
                    ${
						quoteIconPositionRight.Mobile
							? `right: ${ quoteIconPositionRight.Mobile }${ quoteIconPositionRightUnits.Mobile };`
							: ''
					}
                `
						: 'position: relative;'
				}
            }

            ${
				quoteIconHoverRotate.Mobile
					? `
                .${ blockId }.gslider-testimonial-wrapper:hover .gslider-testimonial-quote-icon-wrapper {
                    transform: rotate(${ quoteIconHoverRotate.Mobile }deg);
                }
            `
					: ''
			}
            .${ blockId } .gslider-testimonial-quote-icon-wrapper svg,
            .${ blockId } .gslider-testimonial-quote-icon-wrapper img {
                ${
					quoteIconSize.Mobile && quoteIconSizeUnits.Mobile
						? `width: ${ quoteIconSize.Mobile }${ quoteIconSizeUnits.Mobile };`
						: ''
				}
                ${
					quoteIconSize.Mobile && quoteIconSizeUnits.Mobile
						? `height: ${ quoteIconSize.Mobile }${ quoteIconSizeUnits.Mobile };`
						: ''
				}
            }
            /** End Quote Icon Style */

            .${ blockId } .gslider-testimonial-author-image-wrapper .gslider-testimonial-author-image {
                ${
					authorImageSize?.Mobile
						? `width: ${ authorImageSize.Mobile }${
								authorImageSizeUnits?.Mobile || 'px'
						  };`
						: ''
				}
                ${
					authorImageSize?.Mobile
						? `height: ${ authorImageSize.Mobile }${
								authorImageSizeUnits?.Mobile || 'px'
						  };`
						: ''
				}
                ${
					authorImageMobileBorderWidthCssStyle
						? `border-width: ${ authorImageMobileBorderWidthCssStyle };`
						: ''
				}
                ${
					authorImageMobileBorderRadiusCssStyle
						? `border-radius: ${ authorImageMobileBorderRadiusCssStyle };`
						: ''
				}
                ${
					authorImageMobileMarginCssStyle
						? `margin: ${ authorImageMobileMarginCssStyle };`
						: ''
				}
                ${
					authorImageMobilePaddingCssStyle
						? `padding: ${ authorImageMobilePaddingCssStyle };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper .gslider-testimonial-text-wrapper .gslider-testimonial-text {
                ${
					testimonialTextFontSize.Mobile &&
					testimonialTextFontSizeUnits.Mobile
						? `font-size: ${ testimonialTextFontSize.Mobile }${ testimonialTextFontSizeUnits.Mobile };`
						: ''
				}
                ${
					testimonialTextLineHeight.Mobile &&
					testimonialTextLineHeightUnits.Mobile
						? `line-height: ${ testimonialTextLineHeight.Mobile }${ testimonialTextLineHeightUnits.Mobile };`
						: ''
				}
                ${
					testimonialTextLetterSpacing.Mobile &&
					testimonialTextLetterSpacingUnits.Mobile
						? `letter-spacing: ${ testimonialTextLetterSpacing.Mobile }${ testimonialTextLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					testimonialTextWordSpacing.Mobile &&
					testimonialTextWordSpacingUnits.Mobile
						? `word-spacing: ${ testimonialTextWordSpacing.Mobile }${ testimonialTextWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					testimonialTextMobileMarginCssStyle
						? `margin: ${ testimonialTextMobileMarginCssStyle };`
						: ''
				} 
                ${
					testimonialTextMobilePaddingCssStyle
						? `padding: ${ testimonialTextMobilePaddingCssStyle };`
						: ''
				}
            }

            .${ blockId } .gslider-testimonial-rating-wrapper {
                ${
					ratingMobileMarginCssStyle
						? `margin: ${ ratingMobileMarginCssStyle };`
						: ''
				}
                ${
					ratingMobilePaddingCssStyle
						? `padding: ${ ratingMobilePaddingCssStyle };`
						: ''
				}
            }
            .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-inner {
                justify-content: ${
					contentHorizontalAlignment.Mobile === 'left'
						? 'flex-start'
						: contentHorizontalAlignment.Mobile === 'right'
						? 'flex-end'
						: 'center'
				};
                gap: ${
					ratingNumberGap.Mobile
						? `${ ratingNumberGap.Mobile }${ ratingNumberGapUnits.Mobile }`
						: '10px'
				};
            }
            .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-wrap {
                gap: ${
					ratingStarGap.Mobile
						? `${ ratingStarGap.Mobile }${
								ratingStarGapUnits?.Mobile || 'px'
						  }`
						: '5px'
				};
            }
            .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon svg {
                ${
					ratingStarSize.Mobile
						? `width: ${ ratingStarSize.Mobile }${ ratingStarSizeUnits.Mobile };`
						: ''
				}
                ${
					ratingStarSize.Mobile
						? `height: ${ ratingStarSize.Mobile }${ ratingStarSizeUnits.Mobile };`
						: ''
				}
            }
            .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-star-partial-fill svg {
                ${
					ratingStarSize.Mobile
						? `min-width: ${ ratingStarSize.Mobile }${ ratingStarSizeUnits.Mobile };`
						: ''
				}
                ${
					ratingStarSize.Mobile
						? `width: ${ ratingStarSize.Mobile }${ ratingStarSizeUnits.Mobile };`
						: ''
				}
            }
            .${ blockId } .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-number {
                ${
					ratingNumberFontSize.Mobile &&
					ratingNumberFontSizeUnits.Mobile
						? `font-size: ${ ratingNumberFontSize.Mobile }${ ratingNumberFontSizeUnits.Mobile };`
						: ''
				}
                ${
					ratingNumberLineHeight.Mobile &&
					ratingNumberLineHeightUnits.Mobile
						? `line-height: ${ ratingNumberLineHeight.Mobile }${ ratingNumberLineHeightUnits.Mobile };`
						: ''
				}
                ${
					ratingNumberLetterSpacing.Mobile &&
					ratingNumberLetterSpacingUnits.Mobile
						? `letter-spacing: ${ ratingNumberLetterSpacing.Mobile }${ ratingNumberLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					ratingNumberWordSpacing.Mobile &&
					ratingNumberWordSpacingUnits.Mobile
						? `word-spacing: ${ ratingNumberWordSpacing.Mobile }${ ratingNumberWordSpacingUnits.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-testimonial-wrapper.outside {
                ${
					navigationArrowPosition === 'top-left' ||
					navigationArrowPosition === 'top-center' ||
					navigationArrowPosition === 'top-right'
						? `
                    padding: ${ navigationArrowPositionOutsidePadding.Mobile }${ navigationArrowPositionOutsidePaddingUnits.Mobile } 0 0;
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'bottom-left' ||
					navigationArrowPosition === 'bottom-center' ||
					navigationArrowPosition === 'bottom-right'
						? `
                    padding: 0 0 ${ navigationArrowPositionOutsidePadding.Mobile }${ navigationArrowPositionOutsidePaddingUnits.Mobile };
                `
						: ''
				}
        
                ${
					navigationArrowPosition === 'center' &&
					direction === 'vertical'
						? `
                    padding: ${ navigationArrowPositionOutsidePadding.Mobile }${ navigationArrowPositionOutsidePaddingUnits.Mobile } 0;

                `
						: ''
				}

                ${
					navigationArrowPosition === 'center' &&
					direction !== 'vertical'
						? `
                    padding: 0 ${ navigationArrowPositionOutsidePadding.Mobile }${ navigationArrowPositionOutsidePaddingUnits.Mobile };

                `
						: ''
				}
            }

            ${
				navigationArrowPosition && navigationArrowPosition !== 'center'
					? `

                .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition },
                .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } {
                    gap: ${
						navigationArrowGap.Mobile
							? `${ navigationArrowGap.Mobile }${ navigationArrowGapUnits.Mobile }`
							: '10px'
					};
                    ${
						navigationArrowPosition === 'top-left'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Mobile
								? `${ navigationArrowPositionTopOffset.Mobile }${ navigationArrowPositionTopOffsetUnits.Mobile }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Mobile
								? `${ navigationArrowPositionLeftOffset.Mobile }${ navigationArrowPositionLeftOffsetUnits.Mobile }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'top-center'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Mobile
								? `${ navigationArrowPositionTopOffset.Mobile }${ navigationArrowPositionTopOffsetUnits.Mobile }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Mobile
								? `${ navigationArrowPositionLeftOffset.Mobile }${ navigationArrowPositionLeftOffsetUnits.Mobile }`
								: '50%'
						};
                        transform: translateX(-50%);
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'top-right'
							? `
                        top: ${
							navigationArrowPositionTopOffset.Mobile
								? `${ navigationArrowPositionTopOffset.Mobile }${ navigationArrowPositionTopOffsetUnits.Mobile }`
								: '0'
						};
                        right: ${
							navigationArrowPositionRightOffset.Mobile
								? `${ navigationArrowPositionRightOffset.Mobile }${ navigationArrowPositionRightOffsetUnits.Mobile }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-left'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Mobile
								? `${ navigationArrowPositionBottomOffset.Mobile }${ navigationArrowPositionBottomOffsetUnits.Mobile }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Mobile
								? `${ navigationArrowPositionLeftOffset.Mobile }${ navigationArrowPositionLeftOffsetUnits.Mobile }`
								: '0'
						};
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-center'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Mobile
								? `${ navigationArrowPositionBottomOffset.Mobile }${ navigationArrowPositionBottomOffsetUnits.Mobile }`
								: '0'
						};
                        left: ${
							navigationArrowPositionLeftOffset.Mobile
								? `${ navigationArrowPositionLeftOffset.Mobile }${ navigationArrowPositionLeftOffsetUnits.Mobile }`
								: '50%'
						};
                        transform: translateX(-50%);
                    `
							: ''
					}
            
                    ${
						navigationArrowPosition === 'bottom-right'
							? `
                        bottom: ${
							navigationArrowPositionBottomOffset.Mobile
								? `${ navigationArrowPositionBottomOffset.Mobile }${ navigationArrowPositionBottomOffsetUnits.Mobile }`
								: '0'
						};
                        right: ${
							navigationArrowPositionRightOffset.Mobile
								? `${ navigationArrowPositionRightOffset.Mobile }${ navigationArrowPositionRightOffsetUnits.Mobile }`
								: '0'
						};
                    `
							: ''
					}
                }
                    
            `
					: ''
			}

            .${ blockId } .swiper-button-prev,
            .${ blockId } .swiper-button-next {
                ${
					navigationArrowMobileBorderCssStyle
						? `border-width: ${ navigationArrowMobileBorderCssStyle };`
						: ''
				}  
                ${
					navigationArrowMobileBorderRadiusCssStyle
						? `border-radius: ${ navigationArrowMobileBorderRadiusCssStyle };`
						: ''
				}
                ${
					navigationArrowWidth.Mobile
						? `width: ${ navigationArrowWidth.Mobile }${ navigationArrowWidthUnits.Mobile };`
						: ''
				}
                ${
					navigationArrowHeight.Mobile
						? `height: ${ navigationArrowHeight.Mobile }${ navigationArrowHeightUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${
					navigationArrowSize.Mobile
						? `width: ${ navigationArrowSize.Mobile }${ navigationArrowSizeUnits.Mobile };`
						: ''
				}
                ${
					navigationArrowSize.Mobile
						? `height: ${ navigationArrowSize.Mobile }${ navigationArrowSizeUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${
					navigationArrowSize.Mobile
						? `width: ${ navigationArrowSize.Mobile }${ navigationArrowSizeUnits.Mobile };`
						: ''
				}
                ${
					navigationArrowSize.Mobile
						? `height: ${ navigationArrowSize.Mobile }${ navigationArrowSizeUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .swiper-button-prev:after,
            .${ blockId } .swiper-button-next:after {
                ${
					navigationArrowSize.Mobile
						? `font-size: ${ navigationArrowSize.Mobile }${ navigationArrowSizeUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination {
                ${
					paginationType === 'progressbar'
						? paginationProgressbarPosition.Mobile
							? `top: ${ paginationProgressbarPosition.Mobile }${ paginationProgressbarPositionUnits.Mobile } !important;`
							: ''
						: paginationDotsPosition.Mobile
						? `bottom: ${ paginationDotsPosition.Mobile }${ paginationDotsPositionUnits.Mobile } !important;`
						: ''
				}
                ${
					paginationDotsMobileMarginCssStyle
						? `margin: ${ paginationDotsMobileMarginCssStyle };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-bullet {
                ${
					paginationNormalDotsMobileBorderCssStyle
						? `border-width: ${ paginationNormalDotsMobileBorderCssStyle };`
						: ''
				}   
                ${
					paginationNormalDotsMobileBorderRadiusCssStyle
						? `border-radius: ${ paginationNormalDotsMobileBorderRadiusCssStyle };`
						: ''
				}
                ${
					paginationNormalDotsWidth.Mobile
						? `width: ${ paginationNormalDotsWidth.Mobile }${ paginationNormalDotsWidthUnits.Mobile };`
						: ''
				}
                ${
					paginationNormalDotsHeight.Mobile
						? `height: ${ paginationNormalDotsHeight.Mobile }${ paginationNormalDotsHeightUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-bullet-active {
                ${
					paginationActiveDotsMobileBorderCssStyle
						? `border-width: ${ paginationActiveDotsMobileBorderCssStyle };`
						: ''
				}   
                ${
					paginationActiveDotsMobileBorderRadiusCssStyle
						? `border-radius: ${ paginationActiveDotsMobileBorderRadiusCssStyle };`
						: ''
				}
                ${
					paginationActiveDotsWidth.Mobile
						? `width: ${ paginationActiveDotsWidth.Mobile }${ paginationActiveDotsWidthUnits.Mobile };`
						: ''
				}
                ${
					paginationActiveDotsHeight.Mobile
						? `height: ${ paginationActiveDotsHeight.Mobile }${ paginationActiveDotsHeightUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-fraction { 
                ${
					paginationFractionFontSize.Mobile &&
					paginationFractionFontSizeUnits.Mobile
						? `font-size: ${ paginationFractionFontSize.Mobile }${ paginationFractionFontSizeUnits.Mobile };`
						: ''
				}
                ${
					paginationFractionLineHeight.Mobile &&
					paginationFractionLineHeightUnits.Mobile
						? `line-height: ${ paginationFractionLineHeight.Mobile }${ paginationFractionLineHeightUnits.Mobile };`
						: ''
				}
                ${
					paginationFractionLetterSpacing.Mobile &&
					paginationFractionLetterSpacingUnits.Mobile
						? `letter-spacing: ${ paginationFractionLetterSpacing.Mobile }${ paginationFractionLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					paginationFractionWordSpacing.Mobile &&
					paginationFractionWordSpacingUnits.Mobile
						? `word-spacing: ${ paginationFractionWordSpacing.Mobile }${ paginationFractionWordSpacingUnits.Mobile };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-progressbar {
                ${
					paginationProgressbarHeight.Mobile
						? `height: ${ paginationProgressbarHeight.Mobile }${ paginationProgressbarHeightUnits.Mobile };`
						: ''
				}
            }

            ${
				paginationPositionType === 'outside'
					? `   
                .${ blockId }.gslider-testimonial-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-custom,
                .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-fraction {
                    bottom: -${
						paginationOutsideOffset?.Mobile
							? `${ paginationOutsideOffset.Mobile }${
									paginationOutsideOffsetUnits?.Mobile || 'px'
							  }`
							: paginationOutsideOffset?.Tablet
							? `${ paginationOutsideOffset.Tablet }${
									paginationOutsideOffsetUnits?.Tablet || 'px'
							  }`
							: paginationOutsideOffset?.Desktop
							? `${ paginationOutsideOffset.Desktop }${
									paginationOutsideOffsetUnits?.Desktop ||
									'px'
							  }`
							: '30px'
					} !important;
                }
            `
					: ''
			}

            ${
				paginationPositionType === 'outside' && direction === 'vertical'
					? `
                .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-bullets.swiper-pagination-vertical,
                .${ blockId }.gslider-testimonial-wrapper .swiper-pagination-vertical.swiper-pagination-bullets {
                    top: 50%;
                    bottom: auto !important;
                    left: auto;
                    right: -${
						paginationOutsideOffset?.Mobile
							? `${ paginationOutsideOffset.Mobile }${
									paginationOutsideOffsetUnits?.Mobile || 'px'
							  }`
							: paginationOutsideOffset?.Tablet
							? `${ paginationOutsideOffset.Tablet }${
									paginationOutsideOffsetUnits?.Tablet || 'px'
							  }`
							: paginationOutsideOffset?.Desktop
							? `${ paginationOutsideOffset.Desktop }${
									paginationOutsideOffsetUnits?.Desktop ||
									'px'
							  }`
							: '30px'
					} !important;
                    transform: translate3d(0, -50%, 0);
                }
            `
					: ''
			}

            ${
				paginationPositionType === 'outside' &&
				( direction !== 'vertical' || paginationType !== 'bullets' )
					? `
                ${
					showPagination?.Mobile
						? `
                    .${ blockId }.gslider-testimonial-wrapper.has-pagination {
                        margin-bottom: ${
							paginationOutsideOffset?.Mobile
								? `${ paginationOutsideOffset.Mobile }${
										paginationOutsideOffsetUnits?.Mobile ||
										'px'
								  }`
								: paginationOutsideOffset?.Tablet
								? `${ paginationOutsideOffset.Tablet }${
										paginationOutsideOffsetUnits?.Tablet ||
										'px'
								  }`
								: paginationOutsideOffset?.Desktop
								? `${ paginationOutsideOffset.Desktop }${
										paginationOutsideOffsetUnits?.Desktop ||
										'px'
								  }`
								: '30px'
						};
                    }
                `
						: showPagination?.Desktop || showPagination?.Tablet
						? `
                    .${ blockId }.gslider-testimonial-wrapper.has-pagination {
                        margin-bottom: 0;
                    }
                `
						: ''
				}
            `
					: ''
			}

            ${
				paginationPositionType === 'outside' &&
				direction === 'vertical' &&
				paginationType === 'bullets'
					? `
                ${
					showPagination?.Mobile
						? `
                    .${ blockId }.gslider-testimonial-wrapper.has-pagination {
                        margin-right: ${
							paginationOutsideOffset?.Mobile
								? `${ paginationOutsideOffset.Mobile }${
										paginationOutsideOffsetUnits?.Mobile ||
										'px'
								  }`
								: paginationOutsideOffset?.Tablet
								? `${ paginationOutsideOffset.Tablet }${
										paginationOutsideOffsetUnits?.Tablet ||
										'px'
								  }`
								: paginationOutsideOffset?.Desktop
								? `${ paginationOutsideOffset.Desktop }${
										paginationOutsideOffsetUnits?.Desktop ||
										'px'
								  }`
								: '30px'
						};
                    }
                `
						: showPagination?.Desktop || showPagination?.Tablet
						? `
                    .${ blockId }.gslider-testimonial-wrapper.has-pagination {
                        margin-right: 0;
                    }
                `
						: ''
				}
            `
					: ''
			}
        }
    `;
	/** End All Block Style */

	return `${ baseSliderCSS } ${ sliderItemColorStyle }`
		.replace( /\s+/g, ' ' )
		.trim();
};

export default generateBaseSliderStyle;
