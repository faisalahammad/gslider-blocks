/* eslint-disable no-unused-vars, jsdoc/require-param */
/**
 * Flexi Content Slider Block - Style Generation
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

const getShapeDividerCss = ( blockId, position, divider, device ) => {
	const { enable, color, height, heightUnits, opacity, flip, invert } =
		divider;
	const selector = `.${ blockId } > .swiper > .gslider-shape-divider-${ position }`;

	// No markup is saved when every device is off, so skip the CSS too.
	if ( ! enable?.Desktop && ! enable?.Tablet && ! enable?.Mobile ) {
		return '';
	}

	if ( ! enable?.[ device ] ) {
		return `${ selector } { display: none; }`;
	}

	const scaleX = flip?.[ device ] ? -1 : 1;
	const isInverted = !! invert?.[ device ];
	// Bottom divider is the top shape flipped vertically only, so Flip means the same on both edges.
	const scaleY = ( isInverted ? -1 : 1 ) * ( position === 'bottom' ? -1 : 1 );
	const opacityValue = opacity?.[ device ];

	return `
		${ selector } {
			display: block;
			transform: scale(${ scaleX }, ${ scaleY });
			${
				height?.[ device ]
					? `height: ${ height[ device ] }${
							heightUnits?.[ device ] || 'px'
					  };`
					: ''
			}
			${
				opacityValue !== undefined && opacityValue !== ''
					? `opacity: ${ opacityValue };`
					: ''
			}
		}
		${ selector } path {
			fill: ${ color || '#ffffff' };
		}
		${ selector } .gslider-shape-divider-fill {
			display: ${ isInverted ? 'none' : 'inline' };
		}
		${ selector } .gslider-shape-divider-fill-invert {
			display: ${ isInverted ? 'inline' : 'none' };
		}
	`;
};

const getHasPaginationCss = (
	blockId,
	showPagination,
	device,
	fallbackDevices,
	offset
) => {
	const rule = ( marginBottom ) =>
		`.${ blockId }.gslider-flexi-content-wrapper.has-pagination { margin-bottom: ${ marginBottom }; }`;

	if ( showPagination?.[ device ] ) {
		return rule( offset );
	}
	if ( fallbackDevices.some( ( d ) => showPagination?.[ d ] ) ) {
		return rule( '0' );
	}
	return '';
};

const getCursorFollowerSizeCss = ( blockId, enabled, size, innerSize ) => {
	if ( ! enabled ) {
		return '';
	}
	let css = '';
	if ( size ) {
		css += `.${ blockId }.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower { width: ${ size }px; height: ${ size }px; }`;
	}
	if ( innerSize ) {
		css += `
        .${ blockId }.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower .gslider-cursor-icon svg { width: ${ innerSize }px; height: ${ innerSize }px; }
        .${ blockId }.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower .gslider-cursor-image { width: ${ innerSize }px; height: ${ innerSize }px; }
        .${ blockId }.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower .gslider-cursor-text { font-size: ${ innerSize }px; }
        `;
	}
	return css;
};

/**
 * Autoplay progress bar color, height and per device visibility.
 */
const getAutoplayProgressCss = ( blockId, enabled, color, height ) => {
	const deviceRule = ( device ) => `
        .${ blockId } > .swiper > .gslider-autoplay-progress {
            ${
				enabled?.[ device ]
					? `display: block; height: ${ height?.[ device ] ?? 3 }px;`
					: 'display: none;'
			}
        }
    `;

	return `
        .${ blockId } > .swiper > .gslider-autoplay-progress {
            position: absolute;
            left: 0;
            z-index: 10;
            width: 100%;
            pointer-events: none;
        }
        .${ blockId } > .swiper > .gslider-autoplay-progress.top {
            top: 0;
        }
        .${ blockId } > .swiper > .gslider-autoplay-progress.bottom {
            bottom: 0;
        }
        .${ blockId } > .swiper > .gslider-autoplay-progress > .gslider-autoplay-progress-fill {
            width: 100%;
            height: 100%;
            transform: scaleX(0);
            transform-origin: left;
            ${ color ? `background-color: ${ color };` : '' }
        }
        ${ deviceRule( 'Desktop' ) }
        @media only screen and (max-width: 1024px) {
            ${ deviceRule( 'Tablet' ) }
        }
        @media only screen and (max-width: 767px) {
            ${ deviceRule( 'Mobile' ) }
        }
        @media (prefers-reduced-motion: reduce) {
            .${ blockId } > .swiper > .gslider-autoplay-progress {
                display: none;
            }
        }
    `;
};

/**
 * Generate block styles from attributes
 * @param {Object} attributes - Block attributes
 * @return {string} CSS string
 */
const generateFlexiContentStyle = ( attributes ) => {
	const {
		blockId,
		deviceType,
		blockStyle,
		sliderType,
		carouselPerColumn,
		carouselPerColumnGap,
		speed,
		autoplay,
		autoplayDelay,
		enableAutoplayProgress,
		autoplayProgressColor,
		autoplayProgressHeight,
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
		showNavigation,
		showPagination,
		paginationPositionType,
		/** End Show/Hide Elements */

		/** Start Layout & Content Setting */
		layoutHeightSwitcher,
		layoutHeight,
		layoutHeightUnits,
		verticalHeight,
		verticalHeightUnits,
		direction,
		contentWidth,
		contentWidthUnits,
		contentAlignment,
		contentVerticalAlignment,
		contentHorizontalAlignment,
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

		enableCursorFollower,
		cursorFollowerBg,
		cursorFollowerColor,
		cursorFollowerSize,
		cursorFollowerInnerSize,
		cursorFollowerFontWeight,
		cursorFollowerTextTransform,
		/** Start Shape Dividers */
		enableTopDivider,
		topDividerColor,
		topDividerHeight,
		topDividerHeightUnits,
		topDividerOpacity,
		topDividerFlip,
		topDividerInvert,
		enableBottomDivider,
		bottomDividerColor,
		bottomDividerHeight,
		bottomDividerHeightUnits,
		bottomDividerOpacity,
		bottomDividerFlip,
		bottomDividerInvert,
		/** End Shape Dividers */
	} = attributes;

	const topDivider = {
		enable: enableTopDivider,
		color: topDividerColor,
		height: topDividerHeight,
		heightUnits: topDividerHeightUnits,
		opacity: topDividerOpacity,
		flip: topDividerFlip,
		invert: topDividerInvert,
	};
	const bottomDivider = {
		enable: enableBottomDivider,
		color: bottomDividerColor,
		height: bottomDividerHeight,
		heightUnits: bottomDividerHeightUnits,
		opacity: bottomDividerOpacity,
		flip: bottomDividerFlip,
		invert: bottomDividerInvert,
	};

	// Skip the follower rules on blocks that do not use it
	const hasCursorFollower = Object.values( enableCursorFollower || {} ).some(
		Boolean
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
	const flexiContentCSS = `
        .${ blockId }.gslider-flexi-content-wrapper {
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
        .${ blockId }.gslider-flexi-content-wrapper:hover {
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

        .${ blockId } .swiper-wrapper.gslider-swiper-wrapper {
            ${ layoutHeightSwitcher !== 'adapt' ? `height: auto;` : '' }
            ${
				layoutHeight.Desktop && layoutHeightSwitcher === 'fixed'
					? `min-height: ${ layoutHeight.Desktop }${ layoutHeightUnits.Desktop };`
					: 'auto'
			}
        }

        ${
			direction === 'vertical' &&
			Number( verticalHeight?.Desktop || layoutHeight.Desktop ) > 0 &&
			( verticalHeightUnits?.Desktop || layoutHeightUnits.Desktop ) !==
				'%'
				? `.${ blockId }.gslider-flexi-content-wrapper > .swiper {
            height: ${ verticalHeight?.Desktop || layoutHeight.Desktop }${
				verticalHeightUnits?.Desktop ||
				layoutHeightUnits.Desktop ||
				'px'
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
        
        .${ blockId }.gslider-flexi-content-wrapper .gslider-content-wrapper {
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

        .${ blockId }.gslider-flexi-content-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
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

        .${ blockId }.gslider-flexi-content-wrapper.outside {
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
        .${ blockId } .swiper-button-prev:focus-visible,
        .${ blockId } .swiper-button-next:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
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
            .${ blockId }.gslider-flexi-content-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${ blockId }.gslider-flexi-content-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${ blockId }.gslider-flexi-content-wrapper .swiper-pagination-custom,
            .${ blockId }.gslider-flexi-content-wrapper .swiper-pagination-fraction {
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
        .${ blockId }.gslider-flexi-content-wrapper.has-pagination {
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
			hasCursorFollower
				? `.${ blockId }.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower {
            ${ cursorFollowerBg ? `background: ${ cursorFollowerBg };` : '' }
            ${ cursorFollowerColor ? `color: ${ cursorFollowerColor };` : '' }
        }
        .${ blockId }.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower .gslider-cursor-text {
            ${
				cursorFollowerFontWeight
					? `font-weight: ${ cursorFollowerFontWeight };`
					: ''
			}
            ${
				cursorFollowerTextTransform &&
				cursorFollowerTextTransform !== 'inherit'
					? `text-transform: ${ cursorFollowerTextTransform };`
					: ''
			}
        }`
				: ''
		}
        ${ getCursorFollowerSizeCss(
			blockId,
			hasCursorFollower,
			cursorFollowerSize?.Desktop,
			cursorFollowerInnerSize?.Desktop
		) }
        ${ getShapeDividerCss( blockId, 'top', topDivider, 'Desktop' ) }
        ${ getShapeDividerCss( blockId, 'bottom', bottomDivider, 'Desktop' ) }

        @media only screen and (max-width: 1024px) {

            ${ getCursorFollowerSizeCss(
				blockId,
				hasCursorFollower,
				cursorFollowerSize?.Tablet,
				cursorFollowerInnerSize?.Tablet
			) }

            .${ blockId }.gslider-flexi-content-wrapper {
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
            .${ blockId }.gslider-flexi-content-wrapper:hover { 
                ${ globalTabletBackgroundHoverStyles }
            }

            .${ blockId } .swiper-wrapper.gslider-swiper-wrapper {
                ${ layoutHeightSwitcher !== 'adapt' ? `height: auto;` : '' }
                ${
					layoutHeight.Tablet && layoutHeightSwitcher === 'fixed'
						? `min-height: ${ layoutHeight.Tablet }${ layoutHeightUnits.Tablet };`
						: 'auto'
				}
            }

            ${
				direction === 'vertical' &&
				Number( verticalHeight?.Tablet || layoutHeight.Tablet ) > 0 &&
				( verticalHeightUnits?.Tablet || layoutHeightUnits.Tablet ) !==
					'%'
					? `.${ blockId }.gslider-flexi-content-wrapper > .swiper {
                height: ${ verticalHeight?.Tablet || layoutHeight.Tablet }${
					verticalHeightUnits?.Tablet ||
					layoutHeightUnits.Tablet ||
					'px'
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
					layoutHeight.Tablet &&
					layoutHeightSwitcher === 'fixed' &&
					direction !== 'vertical'
						? `min-height: ${ layoutHeight.Tablet }${ layoutHeightUnits.Tablet };`
						: 'auto'
				}
            }
            
            .${ blockId }.gslider-flexi-content-wrapper .gslider-content-wrapper {
                ${
					layoutHeightSwitcher !== 'adapt' || direction === 'vertical'
						? `height: 100% !important;`
						: ''
				}
                ${
					contentVerticalAlignment?.Tablet
						? `justify-content: ${ contentVerticalAlignment.Tablet };`
						: ''
				}
            }

            .${ blockId }.gslider-flexi-content-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
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

            .${ blockId }.gslider-flexi-content-wrapper.outside {
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
                .${ blockId }.gslider-flexi-content-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${ blockId }.gslider-flexi-content-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${ blockId }.gslider-flexi-content-wrapper .swiper-pagination-custom,
                .${ blockId }.gslider-flexi-content-wrapper .swiper-pagination-fraction {
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
            ${ getShapeDividerCss( blockId, 'top', topDivider, 'Tablet' ) }
            ${ getShapeDividerCss(
				blockId,
				'bottom',
				bottomDivider,
				'Tablet'
			) }
        }
        
        @media only screen and (max-width: 767px) {

            ${ getCursorFollowerSizeCss(
				blockId,
				hasCursorFollower,
				cursorFollowerSize?.Mobile,
				cursorFollowerInnerSize?.Mobile
			) }

            .${ blockId }.gslider-flexi-content-wrapper {
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
            .${ blockId }.gslider-flexi-content-wrapper:hover { 
                ${ globalMobileBackgroundHoverStyles }
            }

            .${ blockId } .swiper-wrapper.gslider-swiper-wrapper {
                ${ layoutHeightSwitcher !== 'adapt' ? `height: auto;` : '' }
                ${
					layoutHeight.Mobile && layoutHeightSwitcher === 'fixed'
						? `min-height: ${ layoutHeight.Mobile }${ layoutHeightUnits.Mobile };`
						: 'auto'
				}
            }

            ${
				direction === 'vertical' &&
				Number( verticalHeight?.Mobile || layoutHeight.Mobile ) > 0 &&
				( verticalHeightUnits?.Mobile || layoutHeightUnits.Mobile ) !==
					'%'
					? `.${ blockId }.gslider-flexi-content-wrapper > .swiper {
                height: ${ verticalHeight?.Mobile || layoutHeight.Mobile }${
					verticalHeightUnits?.Mobile ||
					layoutHeightUnits.Mobile ||
					'px'
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
					layoutHeight.Mobile &&
					layoutHeightSwitcher === 'fixed' &&
					direction !== 'vertical'
						? `min-height: ${ layoutHeight.Mobile }${ layoutHeightUnits.Mobile };`
						: 'auto'
				}
            }
            
            .${ blockId }.gslider-flexi-content-wrapper .gslider-content-wrapper {
                ${
					layoutHeightSwitcher !== 'adapt' || direction === 'vertical'
						? `height: 100% !important;`
						: ''
				}
                ${
					contentVerticalAlignment?.Mobile
						? `justify-content: ${ contentVerticalAlignment.Mobile };`
						: ''
				}
            }

            .${ blockId }.gslider-flexi-content-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
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

            .${ blockId }.gslider-flexi-content-wrapper.outside {
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
                .${ blockId }.gslider-flexi-content-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${ blockId }.gslider-flexi-content-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${ blockId }.gslider-flexi-content-wrapper .swiper-pagination-custom,
                .${ blockId }.gslider-flexi-content-wrapper .swiper-pagination-fraction {
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
            ${ getShapeDividerCss( blockId, 'top', topDivider, 'Mobile' ) }
            ${ getShapeDividerCss(
				blockId,
				'bottom',
				bottomDivider,
				'Mobile'
			) }
        }
    `;
	/** End All Block Style */

	const autoplayProgressCSS =
		autoplay &&
		( enableAutoplayProgress?.Desktop ||
			enableAutoplayProgress?.Tablet ||
			enableAutoplayProgress?.Mobile )
			? getAutoplayProgressCss(
					blockId,
					enableAutoplayProgress,
					autoplayProgressColor,
					autoplayProgressHeight
			  )
			: '';

	return `${ flexiContentCSS }${ autoplayProgressCSS }`
		.replace( /\s+/g, ' ' )
		.trim();
};

export default generateFlexiContentStyle;
