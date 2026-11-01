/* eslint-disable no-unused-vars, jsdoc/require-param, jsdoc/check-tag-names */
/**
 * Logo carousel Slider Block - Style Generation
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
		`.${ blockId }.gslider-logo-carousel-wrapper.has-pagination { margin-bottom: ${ marginBottom }; }`;

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
const generateLogoCarouselStyle = ( attributes ) => {
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

		logos,
		showCaption,

		/** Start Show/Hide Elements */
		paginationPositionType,
		showNavigation,
		showPagination,
		/** End Show/Hide Elements */

		/** Start Logo Link Settings */
		enableLogoLinks,
		showTooltip,
		logoLinkTarget,
		logoLinkRel,
		logoLinkHoverEffect,
		logoLinkHoverOpacity,
		logoLinkHoverScale,
		logoLinkHoverLift,
		logoLinkHoverLiftUnits,
		logoLinkTransitionDuration,
		/** End Logo Link Settings */

		/** Start Layout & Content Setting */
		layoutHeight,
		layoutHeightUnits,
		/** End Layout & Content Setting */

		/** Start Logo Max Width */
		logoMaxWidth,
		logoMaxWidthUnits,
		/** End Logo Max Width */

		/** Start Logo Padding */
		logoPaddingUnits,
		logoPaddingDesktop,
		logoPaddingDesktopCssStyle,
		logoPaddingTablet,
		logoPaddingTabletCssStyle,
		logoPaddingMobile,
		logoPaddingMobileCssStyle,
		logoPaddingLink,
		/** End Logo Padding */

		/** Start Logo Background */
		logoNormalBackgroundType,
		logoNormalClassicColor,
		logoNormalGradientColor,
		logoNormalCustomGradientSwitcher,
		logoNormalCustomGradientInputValue,
		logoNormalBackgroundImageUrl,
		logoNormalBackgroundImagePosition,
		logoNormalBackgroundImageAttachment,
		logoNormalBackgroundImageRepeat,
		logoNormalBackgroundImageSize,
		logoHoverBackgroundType,
		logoHoverClassicColor,
		logoHoverGradientColor,
		logoHoverCustomGradientSwitcher,
		logoHoverCustomGradientInputValue,
		logoHoverBackgroundImageUrl,
		logoHoverBackgroundImagePosition,
		logoHoverBackgroundImageAttachment,
		logoHoverBackgroundImageRepeat,
		logoHoverBackgroundImageSize,
		/** End Logo Background */

		/** Start Logo Border */
		logoBorder,
		logoBorderColorSwitcher,
		logoBorderColor,
		logoBorderHoverColor,
		logoBorderUnits,
		logoBorderDesktop,
		logoBorderDesktopCssStyle,
		logoBorderTablet,
		logoBorderTabletCssStyle,
		logoBorderMobile,
		logoBorderMobileCssStyle,
		logoBorderLink,
		/** End Logo Border */

		/** Start Logo Border Radius */
		logoBorderRadiusUnits,
		logoBorderRadiusDesktop,
		logoBorderRadiusDesktopCssStyle,
		logoBorderRadiusTablet,
		logoBorderRadiusTabletCssStyle,
		logoBorderRadiusMobile,
		logoBorderRadiusMobileCssStyle,
		logoBorderRadiusLink,
		/** End Logo Border Radius */

		/** Start Logo Box Shadow */
		logoBoxShadowValuesSwitcher,
		logoBoxShadowValues,
		logoBoxShadowCssValue,
		logoBoxShadowHoverValues,
		logoBoxShadowHoverCssValue,
		/** End Logo Box Shadow */

		/** Start Logo Caption Typography */
		logoCaptionFontFamily,
		logoCaptionFontSize,
		logoCaptionFontSizeUnits,
		logoCaptionFontWeight,
		logoCaptionFontStyle,
		logoCaptionTextTransform,
		logoCaptionTextDecoration,
		logoCaptionLineHeight,
		logoCaptionLineHeightUnits,
		logoCaptionLetterSpacing,
		logoCaptionLetterSpacingUnits,
		logoCaptionWordSpacing,
		logoCaptionWordSpacingUnits,
		/** End Logo Caption Typography */

		/** Start Logo Caption Color */
		logoCaptionColorSwitcher,
		logoCaptionColor,
		logoCaptionColorHover,
		/** End Logo Caption Color */

		/** Start Logo Caption Background */
		logoCaptionNormalBackgroundType,
		logoCaptionNormalClassicColor,
		logoCaptionNormalGradientColor,
		logoCaptionNormalCustomGradientSwitcher,
		logoCaptionNormalCustomGradientInputValue,
		logoCaptionHoverBackgroundType,
		logoCaptionHoverClassicColor,
		logoCaptionHoverGradientColor,
		logoCaptionHoverCustomGradientSwitcher,
		logoCaptionHoverCustomGradientInputValue,
		/** End Logo Caption Background */

		/** Start Logo Caption Border and color */
		logoCaptionBorder,
		logoCaptionBorderColorSwitcher,
		logoCaptionBorderColor,
		logoCaptionBorderHoverColor,
		/** End Logo Caption Border and color */

		/** Start Logo Caption Border */
		logoCaptionBorderUnits,
		logoCaptionBorderDesktop,
		logoCaptionBorderDesktopCssStyle,
		logoCaptionBorderTablet,
		logoCaptionBorderTabletCssStyle,
		logoCaptionBorderMobile,
		logoCaptionBorderMobileCssStyle,
		logoCaptionBorderLink,
		/** End Logo Caption Border */

		/** Start Logo Caption Border Radius */
		logoCaptionBorderRadiusUnits,
		logoCaptionBorderRadiusDesktop,
		logoCaptionBorderRadiusDesktopCssStyle,
		logoCaptionBorderRadiusTablet,
		logoCaptionBorderRadiusTabletCssStyle,
		logoCaptionBorderRadiusMobile,
		logoCaptionBorderRadiusMobileCssStyle,
		logoCaptionBorderRadiusLink,
		/** End Logo Caption Border Radius */

		/** Start Logo Caption Padding */
		logoCaptionPaddingUnits,
		logoCaptionPaddingDesktop,
		logoCaptionPaddingDesktopCssStyle,
		logoCaptionPaddingTablet,
		logoCaptionPaddingTabletCssStyle,
		logoCaptionPaddingMobile,
		logoCaptionPaddingMobileCssStyle,
		logoCaptionPaddingLink,
		/** End Logo Caption Padding */

		/** Start Logo Tooltip Typography */
		logoTooltipFontFamily,
		logoTooltipFontSize,
		logoTooltipFontSizeUnits,
		logoTooltipFontWeight,
		logoTooltipFontStyle,
		logoTooltipTextTransform,
		logoTooltipTextDecoration,
		logoTooltipLineHeight,
		logoTooltipLineHeightUnits,
		logoTooltipLetterSpacing,
		logoTooltipLetterSpacingUnits,
		logoTooltipWordSpacing,
		logoTooltipWordSpacingUnits,
		/** End Logo Tooltip Typography */

		/** Start Logo Tooltip Color */
		logoTooltipColor,
		logoTooltipBgColor,
		/** End Logo Tooltip Color */

		/** Start Logo Tooltip Border and color */
		logoTooltipBorder,
		logoTooltipBorderColor,
		/** End Logo Tooltip Border and color */

		/** Start Logo Tooltip Border */
		logoTooltipBorderUnits,
		logoTooltipBorderDesktop,
		logoTooltipBorderDesktopCssStyle,
		logoTooltipBorderTablet,
		logoTooltipBorderTabletCssStyle,
		logoTooltipBorderMobile,
		logoTooltipBorderMobileCssStyle,
		logoTooltipBorderLink,
		/** End Logo Tooltip Border */

		/** Start Logo Tooltip Border Radius */
		logoTooltipBorderRadiusUnits,
		logoTooltipBorderRadiusDesktop,
		logoTooltipBorderRadiusDesktopCssStyle,
		logoTooltipBorderRadiusTablet,
		logoTooltipBorderRadiusTabletCssStyle,
		logoTooltipBorderRadiusMobile,
		logoTooltipBorderRadiusMobileCssStyle,
		logoTooltipBorderRadiusLink,
		/** End Logo Tooltip Border Radius */

		/** Start Logo Tooltip Padding */
		logoTooltipPaddingUnits,
		logoTooltipPaddingDesktop,
		logoTooltipPaddingDesktopCssStyle,
		logoTooltipPaddingTablet,
		logoTooltipPaddingTabletCssStyle,
		logoTooltipPaddingMobile,
		logoTooltipPaddingMobileCssStyle,
		logoTooltipPaddingLink,
		/** End Logo Tooltip Padding */

		/** Start Logo Tooltip Position */
		logoTooltipTopPosition,
		logoTooltipTopPositionUnits,
		logoTooltipLeftPosition,
		logoTooltipLeftPositionUnits,
		/** End Logo Tooltip Position */

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
	 * Get logo background normal styles
	 */
	const getLogoBackgroundNormalStyles = ( device ) => {
		const bgType = logoNormalBackgroundType;
		const bgColor = logoNormalClassicColor;
		const bgGradient = logoNormalGradientColor;
		const customGradient = logoNormalCustomGradientInputValue;
		const customGradientEnabled = logoNormalCustomGradientSwitcher;

		const bgImageUrl = logoNormalBackgroundImageUrl?.[ device ];
		const bgImagePosition = logoNormalBackgroundImagePosition?.[ device ];
		const bgAttachment = logoNormalBackgroundImageAttachment?.[ device ];
		const bgRepeat = logoNormalBackgroundImageRepeat?.[ device ];
		const bgSize = logoNormalBackgroundImageSize?.[ device ];

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
	 * Get logo background hover styles
	 */
	const getLogoBackgroundHoverStyles = ( device ) => {
		const bgType = logoHoverBackgroundType;
		const bgColor = logoHoverClassicColor;
		const bgGradient = logoHoverGradientColor;
		const customGradient = logoHoverCustomGradientInputValue;
		const customGradientEnabled = logoHoverCustomGradientSwitcher;

		const bgImageUrl = logoHoverBackgroundImageUrl?.[ device ];
		const bgImagePosition = logoHoverBackgroundImagePosition?.[ device ];
		const bgAttachment = logoHoverBackgroundImageAttachment?.[ device ];
		const bgRepeat = logoHoverBackgroundImageRepeat?.[ device ];
		const bgSize = logoHoverBackgroundImageSize?.[ device ];

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
	const logoBackgroundStyleObjectToString = ( styleObj ) =>
		Object.entries( styleObj )
			.map( ( [ key, value ] ) => `${ key }: ${ value };` )
			.join( ' ' );

	/**
	 * Get logo background styles
	 */
	const logoDesktopBackgroundNormalStyles = logoBackgroundStyleObjectToString(
		getLogoBackgroundNormalStyles( 'Desktop' )
	);
	const logoTabletBackgroundNormalStyles = logoBackgroundStyleObjectToString(
		getLogoBackgroundNormalStyles( 'Tablet' )
	);
	const logoMobileBackgroundNormalStyles = logoBackgroundStyleObjectToString(
		getLogoBackgroundNormalStyles( 'Mobile' )
	);

	const logoDesktopBackgroundHoverStyles = logoBackgroundStyleObjectToString(
		getLogoBackgroundHoverStyles( 'Desktop' )
	);
	const logoTabletBackgroundHoverStyles = logoBackgroundStyleObjectToString(
		getLogoBackgroundHoverStyles( 'Tablet' )
	);
	const logoMobileBackgroundHoverStyles = logoBackgroundStyleObjectToString(
		getLogoBackgroundHoverStyles( 'Mobile' )
	);

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
	const logoCarouselCSS = `
        .${ blockId }.gslider-logo-carousel-wrapper {
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
        .${ blockId }.gslider-logo-carousel-wrapper:hover {
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
        
        .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-content-wrapper {
            ${
				layoutHeight.Desktop
					? `height: ${ layoutHeight.Desktop }${ layoutHeightUnits.Desktop };`
					: 'auto'
			}
            ${
				logoPaddingDesktopCssStyle
					? `padding: ${ logoPaddingDesktopCssStyle };`
					: ''
			}
            ${ logoDesktopBackgroundNormalStyles }
            ${ logoBorder ? `border: ${ logoBorder };` : '' }
			${
				logoBorderDesktopCssStyle
					? `border-width: ${ logoBorderDesktopCssStyle };`
					: ''
			}  
			${
				logoBorderRadiusDesktopCssStyle
					? `border-radius: ${ logoBorderRadiusDesktopCssStyle } !important;`
					: ''
			}
            ${ logoBorderColor ? `border-color: ${ logoBorderColor };` : '' }
            ${
				logoBoxShadowCssValue
					? `box-shadow: ${ logoBoxShadowCssValue } !important;`
					: ''
			}
            display: flex;
            align-items: center;
            justify-content: ${ verticalAlign.Desktop || 'center' };
            transition: background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out;
        }
        .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-content-wrapper:hover {
            ${ logoDesktopBackgroundHoverStyles }
            ${
				logoBorderHoverColor
					? `border-color: ${ logoBorderHoverColor };`
					: ''
			}
            ${
				logoBoxShadowHoverCssValue
					? `box-shadow: ${ logoBoxShadowHoverCssValue } !important;`
					: ''
			}
        }
        .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-content-wrapper img {
            ${
				logoMaxWidth.Desktop
					? `max-width: ${ logoMaxWidth.Desktop }${ logoMaxWidthUnits.Desktop };`
					: ''
			}
            display: block;
            height: auto;
            margin: 0 auto;
        }

        .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-item {
            display: block;
            transition: transform ${
				logoLinkTransitionDuration?.Desktop || 300
			}ms ease, opacity ${
				logoLinkTransitionDuration?.Desktop || 300
			}ms ease, filter ${
				logoLinkTransitionDuration?.Desktop || 300
			}ms ease;
            --hover-opacity: ${ logoLinkHoverOpacity?.Desktop || 0.8 };
            --hover-scale: ${ logoLinkHoverScale?.Desktop || 1.05 };
            --hover-lift: ${ logoLinkHoverLift?.Desktop || 10 }${
				logoLinkHoverLiftUnits?.Desktop || 'px'
			};
            --transition-duration: ${
				logoLinkTransitionDuration?.Desktop || 300
			}ms;
        }

        .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-caption {           
        
            ${
				logoCaptionFontFamily
					? `font-family: ${ logoCaptionFontFamily };`
					: ''
			} 
            ${
				logoCaptionFontSize.Desktop && logoCaptionFontSizeUnits.Desktop
					? `font-size: ${ logoCaptionFontSize.Desktop }${ logoCaptionFontSizeUnits.Desktop };`
					: ''
			}
            ${
				logoCaptionFontWeight
					? `font-weight: ${ logoCaptionFontWeight };`
					: ''
			}
            ${
				logoCaptionFontStyle
					? `font-style: ${ logoCaptionFontStyle };`
					: ''
			}
            ${
				logoCaptionTextTransform
					? `text-transform: ${ logoCaptionTextTransform };`
					: ''
			}
            ${
				logoCaptionTextDecoration
					? `text-decoration: ${ logoCaptionTextDecoration };`
					: ''
			}
            ${
				logoCaptionLineHeight.Desktop &&
				logoCaptionLineHeightUnits.Desktop
					? `line-height: ${ logoCaptionLineHeight.Desktop }${ logoCaptionLineHeightUnits.Desktop };`
					: ''
			}
            ${
				logoCaptionLetterSpacing.Desktop &&
				logoCaptionLetterSpacingUnits.Desktop
					? `letter-spacing: ${ logoCaptionLetterSpacing.Desktop }${ logoCaptionLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				logoCaptionWordSpacing.Desktop &&
				logoCaptionWordSpacingUnits.Desktop
					? `word-spacing: ${ logoCaptionWordSpacing.Desktop }${ logoCaptionWordSpacingUnits.Desktop };`
					: ''
			}

            ${ logoCaptionColor ? `color: ${ logoCaptionColor };` : '' }
            ${
				logoCaptionNormalBackgroundType === 'gradient'
					? `  
                background: ${ resolveGradient(
					logoCaptionNormalCustomGradientSwitcher,
					logoCaptionNormalCustomGradientInputValue,
					logoCaptionNormalGradientColor,
					logoCaptionNormalClassicColor
				) };
            `
					: `
                ${
					logoCaptionNormalClassicColor
						? `background: ${ logoCaptionNormalClassicColor };`
						: ''
				}
            `
			}
            ${
				logoCaptionPaddingDesktopCssStyle
					? `padding: ${ logoCaptionPaddingDesktopCssStyle };`
					: ''
			}
            ${ logoCaptionBorder ? `border: ${ logoCaptionBorder };` : '' }
			${
				logoCaptionBorderDesktopCssStyle
					? `border-width: ${ logoCaptionBorderDesktopCssStyle };`
					: ''
			}  
			${
				logoCaptionBorderRadiusDesktopCssStyle
					? `border-radius: ${ logoCaptionBorderRadiusDesktopCssStyle } !important;`
					: ''
			}
            ${
				logoCaptionBorderColor
					? `border-color: ${ logoCaptionBorderColor };`
					: ''
			}
            transition: color .3s ease-in-out, background-color .3s ease-in-out, border-color .3s ease-in-out;
        }

        .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-caption:hover {
            ${
				logoCaptionColorHover
					? `color: ${ logoCaptionColorHover };`
					: ''
			}
            ${
				logoCaptionHoverBackgroundType === 'gradient'
					? `  
                background: ${ resolveGradient(
					logoCaptionHoverCustomGradientSwitcher,
					logoCaptionHoverCustomGradientInputValue,
					logoCaptionHoverGradientColor,
					logoCaptionHoverClassicColor
				) };
            `
					: `
                ${
					logoCaptionHoverClassicColor
						? `background: ${ logoCaptionHoverClassicColor };`
						: ''
				}
            `
			}
            ${
				logoCaptionBorderHoverColor
					? `border-color: ${ logoCaptionBorderHoverColor };`
					: ''
			}
        }

        .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-tooltip {           
            ${
				logoTooltipFontFamily
					? `font-family: ${ logoTooltipFontFamily };`
					: ''
			} 
            ${
				logoTooltipFontSize.Desktop && logoTooltipFontSizeUnits.Desktop
					? `font-size: ${ logoTooltipFontSize.Desktop }${ logoTooltipFontSizeUnits.Desktop };`
					: ''
			}
            ${
				logoTooltipFontWeight
					? `font-weight: ${ logoTooltipFontWeight };`
					: ''
			}
            ${
				logoTooltipFontStyle
					? `font-style: ${ logoTooltipFontStyle };`
					: ''
			}
            ${
				logoTooltipTextTransform
					? `text-transform: ${ logoTooltipTextTransform };`
					: ''
			}
            ${
				logoTooltipTextDecoration
					? `text-decoration: ${ logoTooltipTextDecoration };`
					: ''
			}
            ${
				logoTooltipLineHeight.Desktop &&
				logoTooltipLineHeightUnits.Desktop
					? `line-height: ${ logoTooltipLineHeight.Desktop }${ logoTooltipLineHeightUnits.Desktop };`
					: ''
			}
            ${
				logoTooltipLetterSpacing.Desktop &&
				logoTooltipLetterSpacingUnits.Desktop
					? `letter-spacing: ${ logoTooltipLetterSpacing.Desktop }${ logoTooltipLetterSpacingUnits.Desktop };`
					: ''
			}
            ${
				logoTooltipWordSpacing.Desktop &&
				logoTooltipWordSpacingUnits.Desktop
					? `word-spacing: ${ logoTooltipWordSpacing.Desktop }${ logoTooltipWordSpacingUnits.Desktop };`
					: ''
			}

            ${ logoTooltipColor ? `color: ${ logoTooltipColor };` : '' }
            ${
				logoTooltipBgColor
					? `background-color: ${ logoTooltipBgColor };`
					: ''
			}
            ${
				logoTooltipPaddingDesktopCssStyle
					? `padding: ${ logoTooltipPaddingDesktopCssStyle };`
					: ''
			}
            ${ logoTooltipBorder ? `border: ${ logoTooltipBorder };` : '' }
			${
				logoTooltipBorderDesktopCssStyle
					? `border-width: ${ logoTooltipBorderDesktopCssStyle };`
					: ''
			}  
			${
				logoTooltipBorderRadiusDesktopCssStyle
					? `border-radius: ${ logoTooltipBorderRadiusDesktopCssStyle } !important;`
					: ''
			}
            ${
				logoTooltipBorderColor
					? `border-color: ${ logoTooltipBorderColor };`
					: ''
			}
            ${
				logoTooltipTopPosition.Desktop &&
				logoTooltipTopPositionUnits.Desktop
					? `top: ${ logoTooltipTopPosition.Desktop }${ logoTooltipTopPositionUnits.Desktop };`
					: ''
			}
            ${
				logoTooltipLeftPosition.Desktop &&
				logoTooltipLeftPositionUnits.Desktop
					? `left: ${ logoTooltipLeftPosition.Desktop }${ logoTooltipLeftPositionUnits.Desktop };`
					: ''
			}
            transition: opacity .3s ease-in-out, visibility .3s ease-in-out, transform .3s ease-in-out;
        }

        .${ blockId }.gslider-logo-carousel-wrapper.outside {
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
            .${ blockId }.gslider-logo-carousel-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${ blockId }.gslider-logo-carousel-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${ blockId }.gslider-logo-carousel-wrapper .swiper-pagination-custom,
            .${ blockId }.gslider-logo-carousel-wrapper .swiper-pagination-fraction {
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
        .${ blockId }.gslider-logo-carousel-wrapper.has-pagination {
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

            .${ blockId }.gslider-logo-carousel-wrapper {
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
            .${ blockId }.gslider-logo-carousel-wrapper:hover { 
                ${ globalTabletBackgroundHoverStyles }
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-content-wrapper {
                ${
					layoutHeight.Tablet
						? `height: ${ layoutHeight.Tablet }${ layoutHeightUnits.Tablet };`
						: 'auto'
				}
                ${
					logoPaddingTabletCssStyle
						? `padding: ${ logoPaddingTabletCssStyle };`
						: ''
				}
                ${ logoTabletBackgroundNormalStyles }
			    ${
					logoBorderTabletCssStyle
						? `border-width: ${ logoBorderTabletCssStyle };`
						: ''
				}  
                ${
					logoBorderRadiusTabletCssStyle
						? `border-radius: ${ logoBorderRadiusTabletCssStyle };`
						: ''
				}
                display: flex;
                align-items: center;
                justify-content: ${ verticalAlign.Tablet || 'center' };
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-content-wrapper:hover {
                ${ logoTabletBackgroundHoverStyles }
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-content-wrapper img {
                ${
					logoMaxWidth.Tablet
						? `max-width: ${ logoMaxWidth.Tablet }${ logoMaxWidthUnits.Tablet };`
						: ''
				}
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-item {
                display: block;
                transition: transform ${
					logoLinkTransitionDuration?.Tablet || 300
				}ms ease, opacity ${
					logoLinkTransitionDuration?.Tablet || 300
				}ms ease, filter ${
					logoLinkTransitionDuration?.Tablet || 300
				}ms ease;
                --hover-opacity: ${ logoLinkHoverOpacity?.Tablet || 0.8 };
                --hover-scale: ${ logoLinkHoverScale?.Tablet || 1.05 };
                --hover-lift: ${ logoLinkHoverLift?.Tablet || 10 }${
					logoLinkHoverLiftUnits?.Tablet || 'px'
				};
                --transition-duration: ${
					logoLinkTransitionDuration?.Tablet || 300
				}ms;
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-caption {
                ${
					logoCaptionFontSize.Tablet &&
					logoCaptionFontSizeUnits.Tablet
						? `font-size: ${ logoCaptionFontSize.Tablet }${ logoCaptionFontSizeUnits.Tablet };`
						: ''
				}
                ${
					logoCaptionLineHeight.Tablet &&
					logoCaptionLineHeightUnits.Tablet
						? `line-height: ${ logoCaptionLineHeight.Tablet }${ logoCaptionLineHeightUnits.Tablet };`
						: ''
				}
                ${
					logoCaptionLetterSpacing.Tablet &&
					logoCaptionLetterSpacingUnits.Tablet
						? `letter-spacing: ${ logoCaptionLetterSpacing.Tablet }${ logoCaptionLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					logoCaptionWordSpacing.Tablet &&
					logoCaptionWordSpacingUnits.Tablet
						? `word-spacing: ${ logoCaptionWordSpacing.Tablet }${ logoCaptionWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					logoCaptionPaddingTabletCssStyle
						? `padding: ${ logoCaptionPaddingTabletCssStyle };`
						: ''
				}
                ${
					logoCaptionBorderTabletCssStyle
						? `border-width: ${ logoCaptionBorderTabletCssStyle };`
						: ''
				}  
                ${
					logoCaptionBorderRadiusTabletCssStyle
						? `border-radius: ${ logoCaptionBorderRadiusTabletCssStyle } !important;`
						: ''
				}
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-tooltip {
                ${
					logoTooltipFontSize.Tablet &&
					logoTooltipFontSizeUnits.Tablet
						? `font-size: ${ logoTooltipFontSize.Tablet }${ logoTooltipFontSizeUnits.Tablet };`
						: ''
				}
                ${
					logoTooltipLineHeight.Tablet &&
					logoTooltipLineHeightUnits.Tablet
						? `line-height: ${ logoTooltipLineHeight.Tablet }${ logoTooltipLineHeightUnits.Tablet };`
						: ''
				}
                ${
					logoTooltipLetterSpacing.Tablet &&
					logoTooltipLetterSpacingUnits.Tablet
						? `letter-spacing: ${ logoTooltipLetterSpacing.Tablet }${ logoTooltipLetterSpacingUnits.Tablet };`
						: ''
				}
                ${
					logoTooltipWordSpacing.Tablet &&
					logoTooltipWordSpacingUnits.Tablet
						? `word-spacing: ${ logoTooltipWordSpacing.Tablet }${ logoTooltipWordSpacingUnits.Tablet };`
						: ''
				}
                ${
					logoTooltipPaddingTabletCssStyle
						? `padding: ${ logoTooltipPaddingTabletCssStyle };`
						: ''
				}
                ${
					logoTooltipBorderTabletCssStyle
						? `border-width: ${ logoTooltipBorderTabletCssStyle };`
						: ''
				}  
                ${
					logoTooltipBorderRadiusTabletCssStyle
						? `border-radius: ${ logoTooltipBorderRadiusTabletCssStyle } !important;`
						: ''
				}
                ${
					logoTooltipTopPosition.Tablet &&
					logoTooltipTopPositionUnits.Tablet
						? `top: ${ logoTooltipTopPosition.Tablet }${ logoTooltipTopPositionUnits.Tablet };`
						: ''
				}
                ${
					logoTooltipLeftPosition.Tablet &&
					logoTooltipLeftPositionUnits.Tablet
						? `left: ${ logoTooltipLeftPosition.Tablet }${ logoTooltipLeftPositionUnits.Tablet };`
						: ''
				}
            }

            .${ blockId }.gslider-logo-carousel-wrapper.outside {
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
                .${ blockId }.gslider-logo-carousel-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${ blockId }.gslider-logo-carousel-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${ blockId }.gslider-logo-carousel-wrapper .swiper-pagination-custom,
                .${ blockId }.gslider-logo-carousel-wrapper .swiper-pagination-fraction {
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

            .${ blockId }.gslider-logo-carousel-wrapper {
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
            .${ blockId }.gslider-logo-carousel-wrapper:hover { 
                ${ globalMobileBackgroundHoverStyles }
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-content-wrapper {
                ${
					layoutHeight.Mobile
						? `height: ${ layoutHeight.Mobile }${ layoutHeightUnits.Mobile };`
						: 'auto'
				}
                ${
					logoPaddingMobileCssStyle
						? `padding: ${ logoPaddingMobileCssStyle };`
						: ''
				}
                ${ logoMobileBackgroundNormalStyles }
                ${
					logoBorderMobileCssStyle
						? `border-width: ${ logoBorderMobileCssStyle };`
						: ''
				}  
                ${
					logoBorderRadiusMobileCssStyle
						? `border-radius: ${ logoBorderRadiusMobileCssStyle };`
						: ''
				}
                display: flex;
                align-items: center;
                justify-content: ${ verticalAlign.Mobile || 'center' };
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-content-wrapper:hover { 
                ${ logoMobileBackgroundHoverStyles }
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-content-wrapper img {
                ${
					logoMaxWidth.Mobile
						? `max-width: ${ logoMaxWidth.Mobile }${ logoMaxWidthUnits.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-item {
                display: block;
                transition: transform ${
					logoLinkTransitionDuration?.Mobile || 300
				}ms ease, opacity ${
					logoLinkTransitionDuration?.Mobile || 300
				}ms ease, filter ${
					logoLinkTransitionDuration?.Mobile || 300
				}ms ease;
                --hover-opacity: ${ logoLinkHoverOpacity?.Mobile || 0.8 };
                --hover-scale: ${ logoLinkHoverScale?.Mobile || 1.05 };
                --hover-lift: ${ logoLinkHoverLift?.Mobile || 10 }${
					logoLinkHoverLiftUnits?.Mobile || 'px'
				};
                --transition-duration: ${
					logoLinkTransitionDuration?.Mobile || 300
				}ms;
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-carousel-caption {
                ${
					logoCaptionFontSize.Mobile &&
					logoCaptionFontSizeUnits.Mobile
						? `font-size: ${ logoCaptionFontSize.Mobile }${ logoCaptionFontSizeUnits.Mobile };`
						: ''
				}
                ${
					logoCaptionLineHeight.Mobile &&
					logoCaptionLineHeightUnits.Mobile
						? `line-height: ${ logoCaptionLineHeight.Mobile }${ logoCaptionLineHeightUnits.Mobile };`
						: ''
				}
                ${
					logoCaptionLetterSpacing.Mobile &&
					logoCaptionLetterSpacingUnits.Mobile
						? `letter-spacing: ${ logoCaptionLetterSpacing.Mobile }${ logoCaptionLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					logoCaptionWordSpacing.Mobile &&
					logoCaptionWordSpacingUnits.Mobile
						? `word-spacing: ${ logoCaptionWordSpacing.Mobile }${ logoCaptionWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					logoCaptionPaddingMobileCssStyle
						? `padding: ${ logoCaptionPaddingMobileCssStyle };`
						: ''
				}
                ${
					logoCaptionBorderMobileCssStyle
						? `border-width: ${ logoCaptionBorderMobileCssStyle };`
						: ''
				}  
                ${
					logoCaptionBorderRadiusMobileCssStyle
						? `border-radius: ${ logoCaptionBorderRadiusMobileCssStyle } !important;`
						: ''
				}
            }

            .${ blockId }.gslider-logo-carousel-wrapper .gslider-logo-tooltip {
                ${
					logoTooltipFontSize.Mobile &&
					logoTooltipFontSizeUnits.Mobile
						? `font-size: ${ logoTooltipFontSize.Mobile }${ logoTooltipFontSizeUnits.Mobile };`
						: ''
				}
                ${
					logoTooltipLineHeight.Mobile &&
					logoTooltipLineHeightUnits.Mobile
						? `line-height: ${ logoTooltipLineHeight.Mobile }${ logoTooltipLineHeightUnits.Mobile };`
						: ''
				}
                ${
					logoTooltipLetterSpacing.Mobile &&
					logoTooltipLetterSpacingUnits.Mobile
						? `letter-spacing: ${ logoTooltipLetterSpacing.Mobile }${ logoTooltipLetterSpacingUnits.Mobile };`
						: ''
				}
                ${
					logoTooltipWordSpacing.Mobile &&
					logoTooltipWordSpacingUnits.Mobile
						? `word-spacing: ${ logoTooltipWordSpacing.Mobile }${ logoTooltipWordSpacingUnits.Mobile };`
						: ''
				}
                ${
					logoTooltipPaddingMobileCssStyle
						? `padding: ${ logoTooltipPaddingMobileCssStyle };`
						: ''
				}
                ${
					logoTooltipBorderMobileCssStyle
						? `border-width: ${ logoTooltipBorderMobileCssStyle };`
						: ''
				}  
                ${
					logoTooltipBorderRadiusMobileCssStyle
						? `border-radius: ${ logoTooltipBorderRadiusMobileCssStyle } !important;`
						: ''
				}
                ${
					logoTooltipTopPosition.Mobile &&
					logoTooltipTopPositionUnits.Mobile
						? `top: ${ logoTooltipTopPosition.Mobile }${ logoTooltipTopPositionUnits.Mobile };`
						: ''
				}
                ${
					logoTooltipLeftPosition.Mobile &&
					logoTooltipLeftPositionUnits.Mobile
						? `left: ${ logoTooltipLeftPosition.Mobile }${ logoTooltipLeftPositionUnits.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-logo-carousel-wrapper.outside {
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
                .${ blockId }.gslider-logo-carousel-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${ blockId }.gslider-logo-carousel-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${ blockId }.gslider-logo-carousel-wrapper .swiper-pagination-custom,
                .${ blockId }.gslider-logo-carousel-wrapper .swiper-pagination-fraction {
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

	return `${ logoCarouselCSS }`.replace( /\s+/g, ' ' ).trim();
};

export default generateLogoCarouselStyle;
