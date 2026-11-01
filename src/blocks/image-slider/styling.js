/* eslint-disable no-unused-vars, jsdoc/require-param, jsdoc/check-tag-names */
/**
 * Image Slider Block - Style Generation
 * Returns Dynamic Generated CSS
 */

const resolveGradient = ( customEnabled, customValue, gradient, classic ) => {
	if ( customEnabled && customValue ) {
		return customValue;
	}
	if ( gradient ) {
		return gradient;
	}
	return classic;
};

const getPaginationPositionCss = (
	paginationType,
	progressbarPosition,
	progressbarUnits,
	dotsPosition,
	dotsUnits,
	device
) => {
	if ( paginationType === 'progressbar' ) {
		return progressbarPosition[ device ]
			? `top: ${ progressbarPosition[ device ] }${ progressbarUnits[ device ] } !important;`
			: '';
	}
	return dotsPosition[ device ]
		? `bottom: ${ dotsPosition[ device ] }${ dotsUnits[ device ] } !important;`
		: '';
};

const getResponsiveOutsideOffset = ( offsetObj, unitObj, devices ) => {
	for ( const device of devices ) {
		if ( offsetObj?.[ device ] ) {
			return `${ offsetObj[ device ] }${ unitObj?.[ device ] || 'px' }`;
		}
	}
	return '30px';
};

const getHasPaginationCss = (
	blockId,
	showPagination,
	device,
	fallbackDevices,
	offset
) => {
	const rule = ( marginBottom ) =>
		`.${ blockId }.gslider-image-slider-wrapper.has-pagination { margin-bottom: ${ marginBottom }; }`;

	if ( showPagination?.[ device ] ) {
		return rule( offset );
	}
	if ( fallbackDevices.some( ( d ) => showPagination?.[ d ] ) ) {
		return rule( '0' );
	}
	return '';
};

/**
 * Generate block styles from attributes
 * @param {Object} attributes - Block attributes
 * @returns {string} CSS string
 */
const generateImageSliderStyle = ( attributes ) => {
	const {
		blockId,
		deviceType,
		blockStyle,
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
		enableLazyLoad,
		verticalAlign,
		carouselEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,

		images,
		showCaption,

		/** Start Show/Hide Elements */
		paginationPositionType,
		showNavigation,
		showPagination,
		/** End Show/Hide Elements */

		/** Start image Link Settings */
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
		/** End image Link Settings */

		/** Start Layout & Content Setting */
		layoutHeight,
		layoutHeightUnits,
		/** End Layout & Content Setting */

		/** Start image Max Width */
		imageMaxWidth,
		imageMaxWidthUnits,
		/** End image Max Width */

		/** Start image Padding */
		imagePaddingUnits,
		imagePaddingDesktop,
		imagePaddingDesktopCssStyle,
		imagePaddingTablet,
		imagePaddingTabletCssStyle,
		imagePaddingMobile,
		imagePaddingMobileCssStyle,
		imagePaddingLink,
		/** End image Padding */

		/** Start image Background */
		imageNormalBackgroundType,
		imageNormalClassicColor,
		imageNormalGradientColor,
		imageNormalCustomGradientSwitcher,
		imageNormalCustomGradientInputValue,
		imageHoverBackgroundType,
		imageHoverClassicColor,
		imageHoverGradientColor,
		imageHoverCustomGradientSwitcher,
		imageHoverCustomGradientInputValue,
		/** End image Background */

		/** Start image Border */
		imageBorder,
		imageBorderColorSwitcher,
		imageBorderColor,
		imageBorderHoverColor,
		imageBorderUnits,
		imageBorderDesktop,
		imageBorderDesktopCssStyle,
		imageBorderTablet,
		imageBorderTabletCssStyle,
		imageBorderMobile,
		imageBorderMobileCssStyle,
		imageBorderLink,
		/** End image Border */

		/** Start image Border Radius */
		imageBorderRadiusUnits,
		imageBorderRadiusDesktop,
		imageBorderRadiusDesktopCssStyle,
		imageBorderRadiusTablet,
		imageBorderRadiusTabletCssStyle,
		imageBorderRadiusMobile,
		imageBorderRadiusMobileCssStyle,
		imageBorderRadiusLink,
		/** End image Border Radius */

		/** Start image Box Shadow */
		imageBoxShadowValuesSwitcher,
		imageBoxShadowValues,
		imageBoxShadowCssValue,
		imageBoxShadowHoverValues,
		imageBoxShadowHoverCssValue,
		/** End image Box Shadow */

		/** Start image Caption Typography */
		imageCaptionFontFamily,
		imageCaptionFontSize,
		imageCaptionFontSizeUnits,
		imageCaptionFontWeight,
		imageCaptionFontStyle,
		imageCaptionTextTransform,
		imageCaptionTextDecoration,
		imageCaptionLineHeight,
		imageCaptionLineHeightUnits,
		imageCaptionLetterSpacing,
		imageCaptionLetterSpacingUnits,
		imageCaptionWordSpacing,
		imageCaptionWordSpacingUnits,
		/** End image Caption Typography */

		/** Start image Caption Color */
		imageCaptionColorSwitcher,
		imageCaptionColor,
		imageCaptionColorHover,
		/** End image Caption Color */

		/** Start image Caption Background */
		imageCaptionNormalBackgroundType,
		imageCaptionNormalClassicColor,
		imageCaptionNormalGradientColor,
		imageCaptionNormalCustomGradientSwitcher,
		imageCaptionNormalCustomGradientInputValue,
		imageCaptionHoverBackgroundType,
		imageCaptionHoverClassicColor,
		imageCaptionHoverGradientColor,
		imageCaptionHoverCustomGradientSwitcher,
		imageCaptionHoverCustomGradientInputValue,
		/** End image Caption Background */

		/** Start image Caption Border and color */
		imageCaptionBorder,
		imageCaptionBorderColorSwitcher,
		imageCaptionBorderColor,
		imageCaptionBorderHoverColor,
		/** End image Caption Border and color */

		/** Start image Caption Border */
		imageCaptionBorderUnits,
		imageCaptionBorderDesktop,
		imageCaptionBorderDesktopCssStyle,
		imageCaptionBorderTablet,
		imageCaptionBorderTabletCssStyle,
		imageCaptionBorderMobile,
		imageCaptionBorderMobileCssStyle,
		imageCaptionBorderLink,
		/** End image Caption Border */

		/** Start image Caption Border Radius */
		imageCaptionBorderRadiusUnits,
		imageCaptionBorderRadiusDesktop,
		imageCaptionBorderRadiusDesktopCssStyle,
		imageCaptionBorderRadiusTablet,
		imageCaptionBorderRadiusTabletCssStyle,
		imageCaptionBorderRadiusMobile,
		imageCaptionBorderRadiusMobileCssStyle,
		imageCaptionBorderRadiusLink,
		/** End image Caption Border Radius */

		/** Start image Caption Padding */
		imageCaptionPaddingUnits,
		imageCaptionPaddingDesktop,
		imageCaptionPaddingDesktopCssStyle,
		imageCaptionPaddingTablet,
		imageCaptionPaddingTabletCssStyle,
		imageCaptionPaddingMobile,
		imageCaptionPaddingMobileCssStyle,
		imageCaptionPaddingLink,
		/** End image Caption Padding */

		/** Start image Tooltip Typography */
		imageTooltipFontFamily,
		imageTooltipFontSize,
		imageTooltipFontSizeUnits,
		imageTooltipFontWeight,
		imageTooltipFontStyle,
		imageTooltipTextTransform,
		imageTooltipTextDecoration,
		imageTooltipLineHeight,
		imageTooltipLineHeightUnits,
		imageTooltipLetterSpacing,
		imageTooltipLetterSpacingUnits,
		imageTooltipWordSpacing,
		imageTooltipWordSpacingUnits,
		/** End image Tooltip Typography */

		/** Start image Tooltip Color */
		imageTooltipColor,
		imageTooltipBgColor,
		/** End image Tooltip Color */

		/** Start image Tooltip Border and color */
		imageTooltipBorder,
		imageTooltipBorderColor,
		/** End image Tooltip Border and color */

		/** Start image Tooltip Border */
		imageTooltipBorderUnits,
		imageTooltipBorderDesktop,
		imageTooltipBorderDesktopCssStyle,
		imageTooltipBorderTablet,
		imageTooltipBorderTabletCssStyle,
		imageTooltipBorderMobile,
		imageTooltipBorderMobileCssStyle,
		imageTooltipBorderLink,
		/** End image Tooltip Border */

		/** Start image Tooltip Border Radius */
		imageTooltipBorderRadiusUnits,
		imageTooltipBorderRadiusDesktop,
		imageTooltipBorderRadiusDesktopCssStyle,
		imageTooltipBorderRadiusTablet,
		imageTooltipBorderRadiusTabletCssStyle,
		imageTooltipBorderRadiusMobile,
		imageTooltipBorderRadiusMobileCssStyle,
		imageTooltipBorderRadiusLink,
		/** End image Tooltip Border Radius */

		/** Start image Tooltip Padding */
		imageTooltipPaddingUnits,
		imageTooltipPaddingDesktop,
		imageTooltipPaddingDesktopCssStyle,
		imageTooltipPaddingTablet,
		imageTooltipPaddingTabletCssStyle,
		imageTooltipPaddingMobile,
		imageTooltipPaddingMobileCssStyle,
		imageTooltipPaddingLink,
		/** End image Tooltip Padding */

		/** Start image Tooltip Position */
		imageTooltipTopPosition,
		imageTooltipTopPositionUnits,
		imageTooltipLeftPosition,
		imageTooltipLeftPositionUnits,
		/** End image Tooltip Position */

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
	const imageSliderCSS = `
        .${ blockId }.gslider-image-slider-wrapper {
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
            transition: background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out;
        }
        .${ blockId }.gslider-image-slider-wrapper:hover {
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

        .${ blockId } .swiper-slide {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper {
            ${
				layoutHeight.Desktop
					? `height: ${ layoutHeight.Desktop }${ layoutHeightUnits.Desktop };`
					: 'auto'
			}
            ${
				imagePaddingDesktopCssStyle
					? `padding: ${ imagePaddingDesktopCssStyle };`
					: ''
			}
            ${ imageBorder ? `border: ${ imageBorder };` : '' }
			${
				imageBorderDesktopCssStyle
					? `border-width: ${ imageBorderDesktopCssStyle };`
					: ''
			}  
			${
				imageBorderRadiusDesktopCssStyle
					? `border-radius: ${ imageBorderRadiusDesktopCssStyle } !important;`
					: ''
			}
            ${ imageBorderColor ? `border-color: ${ imageBorderColor };` : '' }
            ${
				imageBoxShadowCssValue
					? `box-shadow: ${ imageBoxShadowCssValue } !important;`
					: ''
			}
            display: flex;
            align-items: center;
            justify-content: ${ verticalAlign.Desktop || 'center' };
            transition: background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out;
        }
        .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper:hover {
            ${
				imageBorderHoverColor
					? `border-color: ${ imageBorderHoverColor };`
					: ''
			}
            ${
				imageBoxShadowHoverCssValue
					? `box-shadow: ${ imageBoxShadowHoverCssValue } !important;`
					: ''
			}
        }
        .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper img {
            ${
				imageMaxWidth.Desktop
					? `max-width: ${ imageMaxWidth.Desktop }${ imageMaxWidthUnits.Desktop };`
					: ''
			}
            display: block;
            height: auto;
            margin: 0 auto;
        }

        .${ blockId }.gslider-image-slider-wrapper .gslider-image-item {
            display: block;
            transition: transform ${
				imageLinkTransitionDuration?.Desktop || 300
			}ms ease, opacity ${
				imageLinkTransitionDuration?.Desktop || 300
			}ms ease, filter ${
				imageLinkTransitionDuration?.Desktop || 300
			}ms ease;
            --hover-opacity: ${ imageLinkHoverOpacity?.Desktop || 0.8 };
            --hover-scale: ${ imageLinkHoverScale?.Desktop || 1.05 };
            --hover-lift: ${ imageLinkHoverLift?.Desktop || 10 }${
				imageLinkHoverLiftUnits?.Desktop || 'px'
			};
            --transition-duration: ${
				imageLinkTransitionDuration?.Desktop || 300
			}ms;
        }
        .${ blockId }.gslider-image-slider-wrapper .gslider-image-item:hover {
            ${
				imageLinkHoverEffect === 'opacity' ||
				imageLinkHoverEffect === 'both'
					? 'opacity: var(--hover-opacity);'
					: ''
			}
            ${
				imageLinkHoverEffect === 'scale' ||
				imageLinkHoverEffect === 'both'
					? 'transform: scale(var(--hover-scale));'
					: ''
			}
            ${
				imageLinkHoverEffect === 'move-up'
					? 'transform: translateY(calc(-1 * var(--hover-lift)));'
					: ''
			}
        }

        .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-caption {           
        
            ${
				imageCaptionFontFamily
					? `font-family: ${ imageCaptionFontFamily };`
					: ''
			} 
            ${
				imageCaptionFontSize.Desktop &&
				imageCaptionFontSizeUnits.Desktop
					? `font-size: ${ imageCaptionFontSize.Desktop }${ imageCaptionFontSizeUnits.Desktop };`
					: ''
			}
            ${
				imageCaptionFontWeight
					? `font-weight: ${ imageCaptionFontWeight };`
					: ''
			}
            ${
				imageCaptionFontStyle
					? `font-style: ${ imageCaptionFontStyle };`
					: ''
			}
            ${
				imageCaptionTextTransform
					? `text-transform: ${ imageCaptionTextTransform };`
					: ''
			}
            ${
				imageCaptionTextDecoration
					? `text-decoration: ${ imageCaptionTextDecoration };`
					: ''
			}
            ${
				imageCaptionLineHeight.Desktop &&
				imageCaptionLineHeightUnits.Desktop
					? `line-height: ${ imageCaptionLineHeight.Desktop }${ imageCaptionLineHeightUnits.Desktop };`
					: ''
			}
            ${
				imageCaptionLetterSpacing.Desktop &&
				imageCaptionLetterSpacingUnits.Desktop
					? `letter-spacing: ${ imageCaptionLetterSpacing.Desktop }${ imageCaptionLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				imageCaptionWordSpacing.Desktop &&
				imageCaptionWordSpacingUnits.Desktop
					? `word-spacing: ${ imageCaptionWordSpacing.Desktop }${ imageCaptionWordSpacingUnits.Desktop };`
					: ''
			}

            ${ imageCaptionColor ? `color: ${ imageCaptionColor };` : '' }
            ${
				imageCaptionNormalBackgroundType === 'gradient'
					? `  
                background: ${ resolveGradient(
					imageCaptionNormalCustomGradientSwitcher,
					imageCaptionNormalCustomGradientInputValue,
					imageCaptionNormalGradientColor,
					imageCaptionNormalClassicColor
				) };
            `
					: `
                ${
					imageCaptionNormalClassicColor
						? `background: ${ imageCaptionNormalClassicColor };`
						: ''
				}
            `
			}
            ${
				imageCaptionPaddingDesktopCssStyle
					? `padding: ${ imageCaptionPaddingDesktopCssStyle };`
					: ''
			}
            ${ imageCaptionBorder ? `border: ${ imageCaptionBorder };` : '' }
			${
				imageCaptionBorderDesktopCssStyle
					? `border-width: ${ imageCaptionBorderDesktopCssStyle };`
					: ''
			}  
			${
				imageCaptionBorderRadiusDesktopCssStyle
					? `border-radius: ${ imageCaptionBorderRadiusDesktopCssStyle } !important;`
					: ''
			}
            ${
				imageCaptionBorderColor
					? `border-color: ${ imageCaptionBorderColor };`
					: ''
			}
            transition: color .3s ease-in-out, background-color .3s ease-in-out, border-color .3s ease-in-out;
        }

        .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-caption:hover {
            ${
				imageCaptionColorHover
					? `color: ${ imageCaptionColorHover };`
					: ''
			}
            ${
				imageCaptionHoverBackgroundType === 'gradient'
					? `  
                background: ${ resolveGradient(
					imageCaptionHoverCustomGradientSwitcher,
					imageCaptionHoverCustomGradientInputValue,
					imageCaptionHoverGradientColor,
					imageCaptionHoverClassicColor
				) };
            `
					: `
                ${
					imageCaptionHoverClassicColor
						? `background: ${ imageCaptionHoverClassicColor };`
						: ''
				}
            `
			}
            ${
				imageCaptionBorderHoverColor
					? `border-color: ${ imageCaptionBorderHoverColor };`
					: ''
			}
        }

        .${ blockId }.gslider-image-slider-wrapper .gslider-image-tooltip {           
            ${
				imageTooltipFontFamily
					? `font-family: ${ imageTooltipFontFamily };`
					: ''
			} 
            ${
				imageTooltipFontSize.Desktop &&
				imageTooltipFontSizeUnits.Desktop
					? `font-size: ${ imageTooltipFontSize.Desktop }${ imageTooltipFontSizeUnits.Desktop };`
					: ''
			}
            ${
				imageTooltipFontWeight
					? `font-weight: ${ imageTooltipFontWeight };`
					: ''
			}
            ${
				imageTooltipFontStyle
					? `font-style: ${ imageTooltipFontStyle };`
					: ''
			}
            ${
				imageTooltipTextTransform
					? `text-transform: ${ imageTooltipTextTransform };`
					: ''
			}
            ${
				imageTooltipTextDecoration
					? `text-decoration: ${ imageTooltipTextDecoration };`
					: ''
			}
            ${
				imageTooltipLineHeight.Desktop &&
				imageTooltipLineHeightUnits.Desktop
					? `line-height: ${ imageTooltipLineHeight.Desktop }${ imageTooltipLineHeightUnits.Desktop };`
					: ''
			}
            ${
				imageTooltipLetterSpacing.Desktop &&
				imageTooltipLetterSpacingUnits.Desktop
					? `letter-spacing: ${ imageTooltipLetterSpacing.Desktop }${ imageTooltipLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				imageTooltipWordSpacing.Desktop &&
				imageTooltipWordSpacingUnits.Desktop
					? `word-spacing: ${ imageTooltipWordSpacing.Desktop }${ imageTooltipWordSpacingUnits.Desktop };`
					: ''
			}

            ${ imageTooltipColor ? `color: ${ imageTooltipColor };` : '' }
            ${
				imageTooltipBgColor
					? `background-color: ${ imageTooltipBgColor };`
					: ''
			}
            ${
				imageTooltipPaddingDesktopCssStyle
					? `padding: ${ imageTooltipPaddingDesktopCssStyle };`
					: ''
			}
            ${ imageTooltipBorder ? `border: ${ imageTooltipBorder };` : '' }
			${
				imageTooltipBorderDesktopCssStyle
					? `border-width: ${ imageTooltipBorderDesktopCssStyle };`
					: ''
			}  
			${
				imageTooltipBorderRadiusDesktopCssStyle
					? `border-radius: ${ imageTooltipBorderRadiusDesktopCssStyle } !important;`
					: ''
			}
            ${
				imageTooltipBorderColor
					? `border-color: ${ imageTooltipBorderColor };`
					: ''
			}
            ${
				imageTooltipTopPosition.Desktop &&
				imageTooltipTopPositionUnits.Desktop
					? `top: ${ imageTooltipTopPosition.Desktop }${ imageTooltipTopPositionUnits.Desktop };`
					: ''
			}
            ${
				imageTooltipLeftPosition.Desktop &&
				imageTooltipLeftPositionUnits.Desktop
					? `left: ${ imageTooltipLeftPosition.Desktop }${ imageTooltipLeftPositionUnits.Desktop };`
					: ''
			}
            transition: opacity .3s ease-in-out, visibility .3s ease-in-out, transform .3s ease-in-out;
        }

        .${ blockId }.gslider-image-slider-wrapper.outside {
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
				navigationArrowPosition === 'center'
					? `
                padding: 0 ${ navigationArrowPositionOutsidePadding.Desktop }${ navigationArrowPositionOutsidePaddingUnits.Desktop };

            `
					: ''
			}
        }

        ${
			navigationArrowPosition && navigationArrowPosition !== 'center'
				? `
            .${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition },
            .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition } {
                z-index: 100 !important;
            }

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
                background: ${ resolveGradient(
					navigationArrowNormalCustomGradientSwitcher,
					navigationArrowNormalCustomGradientInputValue,
					navigationArrowNormalGradientColor,
					navigationArrowNormalClassicColor
				) };
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
            transition: color .3s ease-in-out, background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out, transform .3s ease-in-out;
        }
        .${ blockId } .swiper-button-prev:hover,
        .${ blockId } .swiper-button-next:hover {
            ${
				navigationArrowColorHover
					? `color: ${ navigationArrowColorHover };`
					: ''
			}
            ${
				navigationArrowHoverBackgroundType === 'gradient'
					? `
                background: ${ resolveGradient(
					navigationArrowHoverCustomGradientSwitcher,
					navigationArrowHoverCustomGradientInputValue,
					navigationArrowHoverGradientColor,
					navigationArrowHoverClassicColor
				) };
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

        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev:hover svg,
        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next:hover svg {
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
            ${ getPaginationPositionCss(
				paginationType,
				paginationProgressbarPosition,
				paginationProgressbarPositionUnits,
				paginationDotsPosition,
				paginationDotsPositionUnits,
				'Desktop'
			) }
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

        .${ blockId } .swiper-pagination-fraction:hover {
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
            .${ blockId }.gslider-image-slider-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${ blockId }.gslider-image-slider-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${ blockId }.gslider-image-slider-wrapper .swiper-pagination-custom,
            .${ blockId }.gslider-image-slider-wrapper .swiper-pagination-fraction {
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
			paginationPositionType === 'outside' && showPagination?.Desktop
				? `
        .${ blockId }.gslider-image-slider-wrapper.has-pagination {
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

        @media only screen and (max-width: 1024px) {

            .${ blockId }.gslider-image-slider-wrapper {
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
						? `border-radius: ${ globalBorderRadiusTabletCssStyle };`
						: ''
				}
                ${
					globalZIndex.Tablet
						? `z-index: ${ globalZIndex.Tablet };`
						: ''
				}
            }
            .${ blockId }.gslider-image-slider-wrapper:hover { 
                ${ globalTabletBackgroundHoverStyles }
            }

            .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper {
                ${
					layoutHeight.Tablet
						? `height: ${ layoutHeight.Tablet }${ layoutHeightUnits.Tablet };`
						: 'auto'
				}
                ${
					imagePaddingTabletCssStyle
						? `padding: ${ imagePaddingTabletCssStyle };`
						: ''
				}
			    ${
					imageBorderTabletCssStyle
						? `border-width: ${ imageBorderTabletCssStyle };`
						: ''
				}  
                ${
					imageBorderRadiusTabletCssStyle
						? `border-radius: ${ imageBorderRadiusTabletCssStyle };`
						: ''
				}
                display: flex;
                align-items: center;
                justify-content: ${ verticalAlign.Tablet || 'center' };
            }

            .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper img {
                ${
					imageMaxWidth.Tablet
						? `max-width: ${ imageMaxWidth.Tablet }${ imageMaxWidthUnits.Tablet };`
						: ''
				}
            }

            .${ blockId }.gslider-image-slider-wrapper .gslider-image-item {
                display: block;
                transition: transform ${
					imageLinkTransitionDuration?.Tablet || 300
				}ms ease, opacity ${
					imageLinkTransitionDuration?.Tablet || 300
				}ms ease, filter ${
					imageLinkTransitionDuration?.Tablet || 300
				}ms ease;
                --hover-opacity: ${ imageLinkHoverOpacity?.Tablet || 0.8 };
                --hover-scale: ${ imageLinkHoverScale?.Tablet || 1.05 };
                --hover-lift: ${ imageLinkHoverLift?.Tablet || 10 }${
					imageLinkHoverLiftUnits?.Tablet || 'px'
				};
                --transition-duration: ${
					imageLinkTransitionDuration?.Tablet || 300
				}ms;
            }

            .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-caption {
                ${
					imageCaptionFontSize.Tablet &&
					imageCaptionFontSizeUnits.Tablet
						? `font-size: ${ imageCaptionFontSize.Tablet }${ imageCaptionFontSizeUnits.Tablet };`
						: ''
				}
                ${
					imageCaptionLineHeight.Tablet &&
					imageCaptionLineHeightUnits.Tablet
						? `line-height: ${ imageCaptionLineHeight.Tablet }${ imageCaptionLineHeightUnits.Tablet };`
						: ''
				}
                ${
					imageCaptionLetterSpacing.Tablet &&
					imageCaptionLetterSpacingUnits.Tablet
						? `letter-spacing: ${ imageCaptionLetterSpacing.Tablet }${ imageCaptionLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					imageCaptionWordSpacing.Tablet &&
					imageCaptionWordSpacingUnits.Tablet
						? `word-spacing: ${ imageCaptionWordSpacing.Tablet }${ imageCaptionWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					imageCaptionPaddingTabletCssStyle
						? `padding: ${ imageCaptionPaddingTabletCssStyle };`
						: ''
				}
                ${
					imageCaptionBorderTabletCssStyle
						? `border-width: ${ imageCaptionBorderTabletCssStyle };`
						: ''
				}  
                ${
					imageCaptionBorderRadiusTabletCssStyle
						? `border-radius: ${ imageCaptionBorderRadiusTabletCssStyle } !important;`
						: ''
				}
            }

            .${ blockId }.gslider-image-slider-wrapper .gslider-image-tooltip {
                ${
					imageTooltipFontSize.Tablet &&
					imageTooltipFontSizeUnits.Tablet
						? `font-size: ${ imageTooltipFontSize.Tablet }${ imageTooltipFontSizeUnits.Tablet };`
						: ''
				}
                ${
					imageTooltipLineHeight.Tablet &&
					imageTooltipLineHeightUnits.Tablet
						? `line-height: ${ imageTooltipLineHeight.Tablet }${ imageTooltipLineHeightUnits.Tablet };`
						: ''
				}
                ${
					imageTooltipLetterSpacing.Tablet &&
					imageTooltipLetterSpacingUnits.Tablet
						? `letter-spacing: ${ imageTooltipLetterSpacing.Tablet }${ imageTooltipLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					imageTooltipWordSpacing.Tablet &&
					imageTooltipWordSpacingUnits.Tablet
						? `word-spacing: ${ imageTooltipWordSpacing.Tablet }${ imageTooltipWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					imageTooltipPaddingTabletCssStyle
						? `padding: ${ imageTooltipPaddingTabletCssStyle };`
						: ''
				}
                ${
					imageTooltipBorderTabletCssStyle
						? `border-width: ${ imageTooltipBorderTabletCssStyle };`
						: ''
				}  
                ${
					imageTooltipBorderRadiusTabletCssStyle
						? `border-radius: ${ imageTooltipBorderRadiusTabletCssStyle } !important;`
						: ''
				}
                ${
					imageTooltipTopPosition.Tablet &&
					imageTooltipTopPositionUnits.Tablet
						? `top: ${ imageTooltipTopPosition.Tablet }${ imageTooltipTopPositionUnits.Tablet };`
						: ''
				}
                ${
					imageTooltipLeftPosition.Tablet &&
					imageTooltipLeftPositionUnits.Tablet
						? `left: ${ imageTooltipLeftPosition.Tablet }${ imageTooltipLeftPositionUnits.Tablet };`
						: ''
				}
            }

            .${ blockId }.gslider-image-slider-wrapper.outside {
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
					navigationArrowPosition === 'center'
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
                ${ getPaginationPositionCss(
					paginationType,
					paginationProgressbarPosition,
					paginationProgressbarPositionUnits,
					paginationDotsPosition,
					paginationDotsPositionUnits,
					'Tablet'
				) }
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
                .${ blockId }.gslider-image-slider-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${ blockId }.gslider-image-slider-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${ blockId }.gslider-image-slider-wrapper .swiper-pagination-custom,
                .${ blockId }.gslider-image-slider-wrapper .swiper-pagination-fraction {
                    bottom: -${ getResponsiveOutsideOffset(
						paginationOutsideOffset,
						paginationOutsideOffsetUnits,
						[ 'Tablet', 'Desktop' ]
					) } !important;
                }
            `
					: ''
			}

            ${
				paginationPositionType === 'outside'
					? `
                ${ getHasPaginationCss(
					blockId,
					showPagination,
					'Tablet',
					[ 'Desktop' ],
					getResponsiveOutsideOffset(
						paginationOutsideOffset,
						paginationOutsideOffsetUnits,
						[ 'Tablet', 'Desktop' ]
					)
				) }
            `
					: ''
			}
        }
        
        @media only screen and (max-width: 767px) {

            .${ blockId }.gslider-image-slider-wrapper {
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
						? `border-radius: ${ globalBorderRadiusMobileCssStyle };`
						: ''
				}
                ${
					globalZIndex.Mobile
						? `z-index: ${ globalZIndex.Mobile };`
						: ''
				}
            }
            .${ blockId }.gslider-image-slider-wrapper:hover { 
                ${ globalMobileBackgroundHoverStyles }
            }

            .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper {
                ${
					layoutHeight.Mobile
						? `height: ${ layoutHeight.Mobile }${ layoutHeightUnits.Mobile };`
						: 'auto'
				}
                ${
					imagePaddingMobileCssStyle
						? `padding: ${ imagePaddingMobileCssStyle };`
						: ''
				}
                ${
					imageBorderMobileCssStyle
						? `border-width: ${ imageBorderMobileCssStyle };`
						: ''
				}  
                ${
					imageBorderRadiusMobileCssStyle
						? `border-radius: ${ imageBorderRadiusMobileCssStyle };`
						: ''
				}
                display: flex;
                align-items: center;
                justify-content: ${ verticalAlign.Mobile || 'center' };
            }

            .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper img {
                ${
					imageMaxWidth.Mobile
						? `max-width: ${ imageMaxWidth.Mobile }${ imageMaxWidthUnits.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-image-slider-wrapper .gslider-image-item {
                display: block;
                transition: transform ${
					imageLinkTransitionDuration?.Mobile || 300
				}ms ease, opacity ${
					imageLinkTransitionDuration?.Mobile || 300
				}ms ease, filter ${
					imageLinkTransitionDuration?.Mobile || 300
				}ms ease;
                --hover-opacity: ${ imageLinkHoverOpacity?.Mobile || 0.8 };
                --hover-scale: ${ imageLinkHoverScale?.Mobile || 1.05 };
                --hover-lift: ${ imageLinkHoverLift?.Mobile || 10 }${
					imageLinkHoverLiftUnits?.Mobile || 'px'
				};
                --transition-duration: ${
					imageLinkTransitionDuration?.Mobile || 300
				}ms;
            }

            .${ blockId }.gslider-image-slider-wrapper .gslider-image-slider-caption {
                ${
					imageCaptionFontSize.Mobile &&
					imageCaptionFontSizeUnits.Mobile
						? `font-size: ${ imageCaptionFontSize.Mobile }${ imageCaptionFontSizeUnits.Mobile };`
						: ''
				}
                ${
					imageCaptionLineHeight.Mobile &&
					imageCaptionLineHeightUnits.Mobile
						? `line-height: ${ imageCaptionLineHeight.Mobile }${ imageCaptionLineHeightUnits.Mobile };`
						: ''
				}
                ${
					imageCaptionLetterSpacing.Mobile &&
					imageCaptionLetterSpacingUnits.Mobile
						? `letter-spacing: ${ imageCaptionLetterSpacing.Mobile }${ imageCaptionLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					imageCaptionWordSpacing.Mobile &&
					imageCaptionWordSpacingUnits.Mobile
						? `word-spacing: ${ imageCaptionWordSpacing.Mobile }${ imageCaptionWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					imageCaptionPaddingMobileCssStyle
						? `padding: ${ imageCaptionPaddingMobileCssStyle };`
						: ''
				}
                ${
					imageCaptionBorderMobileCssStyle
						? `border-width: ${ imageCaptionBorderMobileCssStyle };`
						: ''
				}  
                ${
					imageCaptionBorderRadiusMobileCssStyle
						? `border-radius: ${ imageCaptionBorderRadiusMobileCssStyle } !important;`
						: ''
				}
            }

            .${ blockId }.gslider-image-slider-wrapper .gslider-image-tooltip {
                ${
					imageTooltipFontSize.Mobile &&
					imageTooltipFontSizeUnits.Mobile
						? `font-size: ${ imageTooltipFontSize.Mobile }${ imageTooltipFontSizeUnits.Mobile };`
						: ''
				}
                ${
					imageTooltipLineHeight.Mobile &&
					imageTooltipLineHeightUnits.Mobile
						? `line-height: ${ imageTooltipLineHeight.Mobile }${ imageTooltipLineHeightUnits.Mobile };`
						: ''
				}
                ${
					imageTooltipLetterSpacing.Mobile &&
					imageTooltipLetterSpacingUnits.Mobile
						? `letter-spacing: ${ imageTooltipLetterSpacing.Mobile }${ imageTooltipLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					imageTooltipWordSpacing.Mobile &&
					imageTooltipWordSpacingUnits.Mobile
						? `word-spacing: ${ imageTooltipWordSpacing.Mobile }${ imageTooltipWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					imageTooltipPaddingMobileCssStyle
						? `padding: ${ imageTooltipPaddingMobileCssStyle };`
						: ''
				}
                ${
					imageTooltipBorderMobileCssStyle
						? `border-width: ${ imageTooltipBorderMobileCssStyle };`
						: ''
				}  
                ${
					imageTooltipBorderRadiusMobileCssStyle
						? `border-radius: ${ imageTooltipBorderRadiusMobileCssStyle } !important;`
						: ''
				}
                ${
					imageTooltipTopPosition.Mobile &&
					imageTooltipTopPositionUnits.Mobile
						? `top: ${ imageTooltipTopPosition.Mobile }${ imageTooltipTopPositionUnits.Mobile };`
						: ''
				}
                ${
					imageTooltipLeftPosition.Mobile &&
					imageTooltipLeftPositionUnits.Mobile
						? `left: ${ imageTooltipLeftPosition.Mobile }${ imageTooltipLeftPositionUnits.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-image-slider-wrapper.outside {
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
					navigationArrowPosition === 'center'
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
                ${ getPaginationPositionCss(
					paginationType,
					paginationProgressbarPosition,
					paginationProgressbarPositionUnits,
					paginationDotsPosition,
					paginationDotsPositionUnits,
					'Mobile'
				) }
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
                .${ blockId }.gslider-image-slider-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${ blockId }.gslider-image-slider-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${ blockId }.gslider-image-slider-wrapper .swiper-pagination-custom,
                .${ blockId }.gslider-image-slider-wrapper .swiper-pagination-fraction {
                    bottom: -${ getResponsiveOutsideOffset(
						paginationOutsideOffset,
						paginationOutsideOffsetUnits,
						[ 'Mobile', 'Tablet', 'Desktop' ]
					) } !important;
                }
            `
					: ''
			}

            ${
				paginationPositionType === 'outside'
					? `
                ${ getHasPaginationCss(
					blockId,
					showPagination,
					'Mobile',
					[ 'Desktop', 'Tablet' ],
					getResponsiveOutsideOffset(
						paginationOutsideOffset,
						paginationOutsideOffsetUnits,
						[ 'Mobile', 'Tablet', 'Desktop' ]
					)
				) }
            `
					: ''
			}
        }
    `;
	/** End All Block Style */

	return `${ imageSliderCSS }`.replace( /\s+/g, ' ' ).trim();
};

export default generateImageSliderStyle;
