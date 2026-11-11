const carouselAttributes = {
	/** Start Carousel Settings */
	carouselPerColumn: {
		type: 'object',
		default: {
			Desktop: 3,
			Tablet: 2,
			Mobile: 1,
		},
	},
	carouselPerColumnGap: {
		type: 'object',
		default: {
			Desktop: 10,
			Tablet: 10,
			Mobile: 10,
		},
	},
	speed: {
		type: 'object',
		default: {
			Desktop: 800,
			Tablet: 800,
			Mobile: 800,
		},
	},
	autoplay: {
		type: 'boolean',
		default: false,
	},
	enableLazyLoad: {
		type: 'boolean',
		default: false,
	},
	autoplayDelay: {
		type: 'object',
		default: {
			Desktop: 1000,
			Tablet: 1000,
			Mobile: 1000,
		},
	},
	infiniteLoop: {
		type: 'boolean',
		default: true,
	},
	allowTouchMove: {
		type: 'boolean',
		default: true,
	},
	pauseOnHover: {
		type: 'boolean',
		default: false,
	},
	stopOnLastSlide: {
		type: 'boolean',
		default: false,
	},
	reverseDirection: {
		type: 'boolean',
		default: false,
	},
	carouselEffect: {
		type: 'string',
		default: 'slide',
	},
	mousewheelControl: {
		type: 'boolean',
		default: false,
	},
	keyboardNavigation: {
		type: 'boolean',
		default: false,
	},
	paginationType: {
		type: 'string',
		default: 'bullets',
	},
	dynamicBullets: {
		type: 'boolean',
		default: false,
	},
	carouselMode: {
		type: 'string',
		default: 'carousel',
	},
	marqueeSpeed: {
		type: 'number',
		default: 6000,
	},
	marqueePauseOnHover: {
		type: 'boolean',
		default: true,
	},
	showAutoplayProgress: {
		type: 'boolean',
		default: false,
	},
	autoplayProgressPosition: {
		type: 'string',
		default: 'top',
	},
	autoplayProgressColor: {
		type: 'string',
		default: '#007cba',
	},
	autoplayProgressHeight: {
		type: 'number',
		default: 4,
	},
	desktopGridColumns: {
		type: 'number',
		default: 3,
	},
	desktopGridGap: {
		type: 'number',
		default: 24,
	},
	/** End Carousel Settings */

	/** Start Navigation Custom Arrows */
	navigationArrowsIconSwitcher: {
		type: 'boolean',
		default: false,
	},

	navigationArrowsIconLeftAlign: {
		type: 'string',
		default: 'icon',
	},

	navigationArrowsIconLeft: {
		type: 'string',
		default: 'arrow-left',
	},

	navigationArrowsIconLeftHtml: {
		type: 'string',
		default: '',
	},

	navigationArrowsIconLeftImageUrl: {
		type: 'string',
		default: '',
	},
	navigationArrowsIconLeftImageAlt: {
		type: 'string',
		default: 'Left Arrow',
	},
	navigationArrowsIconLeftImageID: {
		type: 'string',
		default: '',
	},

	navigationArrowsIconRightAlign: {
		type: 'string',
		default: 'icon',
	},

	navigationArrowsIconRight: {
		type: 'string',
		default: 'arrow-right',
	},

	navigationArrowsIconRightHtml: {
		type: 'string',
		default: '',
	},

	navigationArrowsIconRightImageUrl: {
		type: 'string',
		default: '',
	},
	navigationArrowsIconRightImageAlt: {
		type: 'string',
		default: 'Right Arrow',
	},
	navigationArrowsIconRightImageID: {
		type: 'string',
		default: '',
	},
	/** End Navigation Custom Arrows */

	/** Start Navigation Arrow Size */
	navigationArrowSize: {
		type: 'object',
		default: {
			Desktop: '16',
			Tablet: '16',
			Mobile: '14',
		},
	},
	navigationArrowSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Navigation Arrow Size */

	/** Start Navigation Arrow Color */
	navigationArrowColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	navigationArrowColor: {
		type: 'string',
		default: '#333333',
	},
	navigationArrowColorHover: {
		type: 'string',
		default: '',
	},
	/** End Navigation Arrow Color */

	/** Start Navigation Arrow Background */
	navigationArrowNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	navigationArrowNormalClassicColor: {
		type: 'string',
		default: '#d2d2d2c7',
	},
	navigationArrowNormalGradientColor: {
		type: 'string',
		default: '',
	},
	navigationArrowNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	navigationArrowNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	navigationArrowHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	navigationArrowHoverClassicColor: {
		type: 'string',
		default: '#787878b8',
	},
	navigationArrowHoverGradientColor: {
		type: 'string',
		default: '',
	},
	navigationArrowHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	navigationArrowHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Navigation Arrow Background */

	/** Start Navigation Arrow Width & Height */
	navigationArrowWidth: {
		type: 'object',
		default: {
			Desktop: '46',
			Tablet: '46',
			Mobile: '32',
		},
	},
	navigationArrowWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	navigationArrowHeight: {
		type: 'object',
		default: {
			Desktop: '46',
			Tablet: '46',
			Mobile: '32',
		},
	},
	navigationArrowHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Navigation Arrow Width & Height */

	/** Start Navigation Arrow Border */
	navigationArrowBorder: {
		type: 'string',
		default: 'none',
	},
	navigationArrowBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	navigationArrowBorderColor: {
		type: 'string',
		default: '',
	},
	navigationArrowBorderHoverColor: {
		type: 'string',
		default: '',
	},
	navigationArrowBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	navigationArrowDesktopBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	navigationArrowDesktopBorderCssStyle: {
		type: 'string',
		default: '',
	},
	navigationArrowTabletBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	navigationArrowTabletBorderCssStyle: {
		type: 'string',
		default: '',
	},
	navigationArrowMobileBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	navigationArrowMobileBorderCssStyle: {
		type: 'string',
		default: '',
	},
	navigationArrowBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Navigation Arrow Border */

	/** Start Navigation Arrow Border Radius */
	navigationArrowBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	navigationArrowDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	navigationArrowDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	navigationArrowTabletBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	navigationArrowTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	navigationArrowMobileBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	navigationArrowMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	navigationArrowBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Navigation Arrow Border Radius */

	/** Start Navigation Arrow Box Shadow */
	navigationArrowBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	navigationArrowBoxShadowValues: {
		type: 'array',
		default: [],
	},
	navigationArrowBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	navigationArrowBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	navigationArrowBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Navigation Arrow Box Shadow */

	/** Start Navigation Arrow Position */
	navigationArrowPositionType: {
		type: 'string',
		default: 'outside',
	},

	navigationArrowPosition: {
		type: 'string',
		default: 'center',
	},
	navigationArrowDirection: {
		type: 'string',
		default: 'row',
	},
	navigationArrowPositionTopOffset: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	navigationArrowPositionTopOffsetUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	navigationArrowPositionLeftOffset: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	navigationArrowPositionLeftOffsetUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	navigationArrowPositionRightOffset: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	navigationArrowPositionRightOffsetUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	navigationArrowPositionBottomOffset: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	navigationArrowPositionBottomOffsetUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	navigationArrowGap: {
		type: 'object',
		default: {
			Desktop: '10',
			Tablet: '10',
			Mobile: '10',
		},
	},
	navigationArrowGapUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	navigationArrowPositionOutsidePadding: {
		type: 'object',
		default: {
			Desktop: '30',
			Tablet: '30',
			Mobile: '30',
		},
	},
	navigationArrowPositionOutsidePaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Navigation Arrow Position */

	/** Start Pagination Dots Margin */
	paginationDotsMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationDotsDesktopMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationDotsDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	paginationDotsTabletMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationDotsTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	paginationDotsMobileMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationDotsMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	paginationDotsMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Pagination Dots Margin */

	/** Start Pagination Dots Position */
	paginationDotsPosition: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationDotsPositionUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	paginationProgressbarPosition: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationProgressbarPositionUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	/** End Pagination Dots Position */

	/** Start Pagination Outside Offset */
	paginationOutsideOffset: {
		type: 'object',
		default: {
			Desktop: '30',
			Tablet: '30',
			Mobile: '30',
		},
	},
	paginationOutsideOffsetUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Pagination Outside Offset */

	/** Start Pagination Dots Style */
	paginationDotsSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationNormalDotsBgColor: {
		type: 'string',
		default: '#333333',
	},
	paginationActiveDotsBgColor: {
		type: 'string',
		default: '',
	},
	paginationNormalDotsWidth: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationNormalDotsWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationNormalDotsHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationNormalDotsHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Pagination Dots Style */

	/** Start Pagination Dots Border */
	paginationNormalDotsBorder: {
		type: 'string',
		default: 'none',
	},
	paginationNormalDotsBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationNormalDotsBorderColor: {
		type: 'string',
		default: '',
	},
	paginationNormalDotsBorderHoverColor: {
		type: 'string',
	},

	paginationNormalDotsBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationNormalDotsDesktopBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationNormalDotsDesktopBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationNormalDotsTabletBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationNormalDotsTabletBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationNormalDotsMobileBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationNormalDotsMobileBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationNormalDotsBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Pagination Dots Border */

	/** Start Pagination Dots Border Radius */
	paginationNormalDotsBorderRadius: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationNormalDotsBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationNormalDotsDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	paginationNormalDotsDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	paginationNormalDotsTabletBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	paginationNormalDotsTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	paginationNormalDotsMobileBorderRadius: {
		type: 'object',
		default: {
			top: '50',
			bottom: '50',
			left: '50',
			right: '50',
		},
	},
	paginationNormalDotsMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '50px 50px 50px 50px',
	},
	paginationNormalDotsBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Pagination Dots Border Radius */

	/** Start Active Pagination Dots Width & Height */
	paginationActiveDotsWidth: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationActiveDotsWidthUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationActiveDotsHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationActiveDotsHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Active Pagination Dots Width & Height */

	/** Start Active Pagination Dots Border */
	paginationActiveDotsBorder: {
		type: 'string',
		default: 'none',
	},
	paginationActiveDotsBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationActiveDotsBorderColor: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsBorderHoverColor: {
		type: 'string',
	},

	paginationActiveDotsBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationActiveDotsDesktopBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsDesktopBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsTabletBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsTabletBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsMobileBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsMobileBorderCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Active Pagination Dots Border */

	/** Start Active Pagination Dots Border Radius */
	paginationActiveDotsBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationActiveDotsDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsTabletBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsMobileBorderRadius: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	paginationActiveDotsMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	paginationActiveDotsBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Active Pagination Dots Border Radius */

	/** Start Fraction Typography */
	paginationFractionFontFamily: {
		type: 'string',
		default: '',
	},
	paginationFractionFontSize: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationFractionFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationFractionFontWeight: {
		type: 'string',
		default: '',
	},
	paginationFractionFontStyle: {
		type: 'string',
		default: '',
	},
	paginationFractionTextTransform: {
		type: 'string',
		default: '',
	},
	paginationFractionTextDecoration: {
		type: 'string',
		default: '',
	},
	paginationFractionLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationFractionLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationFractionLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationFractionLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	paginationFractionWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationFractionWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Fraction Typography */

	/** Start Fraction Color */
	paginationFractionColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationFractionColor: {
		type: 'string',
		default: '',
	},
	paginationFractionColorHover: {
		type: 'string',
		default: '',
	},
	/** End Fraction Color */

	/** Start Progressbar */
	paginationProgressbarBGColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	paginationProgressbarBGColor: {
		type: 'string',
		default: '',
	},
	paginationProgressbarBGActiveColor: {
		type: 'string',
	},
	paginationProgressbarHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	paginationProgressbarHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Progressbar */
};

export default carouselAttributes;
