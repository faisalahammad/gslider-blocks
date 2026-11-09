const attributes = {
	blockId: {
		type: 'string',
		default: '',
	},
	deviceType: {
		type: 'string',
		default: 'Desktop',
	},
	blockStyle: {
		type: 'string',
		default: '',
	},
	logos: {
		type: 'array',
		default: [],
		items: {
			type: 'object',
			properties: {
				id: { type: 'number' },
				url: { type: 'string' },
				alt: { type: 'string' },
				link: { type: 'string' },
				caption: { type: 'string' },
				tooltipText: { type: 'string' },
			},
		},
	},

	/** Start Carousel Settings */
	carouselPerColumn: {
		type: 'object',
		default: {
			Desktop: 2,
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
	/** End Carousel Settings */

	showCaption: {
		type: 'object',
		default: {
			Desktop: false,
			Tablet: false,
			Mobile: false,
		},
	},

	/** Start Show/Hide Elements */
	paginationPositionType: {
		type: 'string',
		default: 'outside',
	},
	showNavigation: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	showPagination: {
		type: 'object',
		default: {
			Desktop: true,
			Tablet: true,
			Mobile: true,
		},
	},
	/** End Show/Hide Elements */

	/** Start Logo Link Settings */
	enableLogoLinks: {
		type: 'boolean',
		default: false,
	},
	showTooltip: {
		type: 'boolean',
		default: false,
	},
	logoLinkTarget: {
		type: 'string',
		default: '_blank',
	},
	logoLinkRel: {
		type: 'string',
		default: 'noopener noreferrer',
	},
	logoLinkHoverEffect: {
		type: 'string',
		default: 'none',
	},
	logoLinkHoverOpacity: {
		type: 'object',
		default: {
			Desktop: 0.8,
			Tablet: 0.8,
			Mobile: 0.8,
		},
	},
	logoLinkHoverScale: {
		type: 'object',
		default: {
			Desktop: 1.05,
			Tablet: 1.05,
			Mobile: 1.05,
		},
	},
	logoLinkHoverLift: {
		type: 'object',
		default: {
			Desktop: 10,
			Tablet: 10,
			Mobile: 10,
		},
	},
	logoLinkHoverLiftUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoLinkTransitionDuration: {
		type: 'object',
		default: {
			Desktop: 300,
			Tablet: 300,
			Mobile: 300,
		},
	},
	/** End Logo Link Settings */

	/** Layout & Content Setting */
	layoutHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	layoutHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	verticalAlign: {
		type: 'object',
		default: {
			Desktop: 'center',
			Tablet: 'center',
			Mobile: 'center',
		},
	},
	/** End Layout & Content Setting */

	/** Start Logo Max Width */
	logoMaxWidth: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoMaxWidthUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	/** End Logo Max Width */

	/** Start Logo Padding */
	logoPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoPaddingDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoPaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	logoPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoPaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	logoPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoPaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	logoPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Logo Padding */

	/** Start Logo Background */
	logoNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	logoNormalClassicColor: {
		type: 'string',
		default: '',
	},
	logoNormalGradientColor: {
		type: 'string',
		default: '',
	},
	logoNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	logoNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	logoNormalBackgroundImageUrl: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoNormalBackgroundImagePosition: {
		type: 'object',
		default: {
			Desktop: { x: 0.5, y: 0.5 },
			Tablet: { x: 0.5, y: 0.5 },
			Mobile: { x: 0.5, y: 0.5 },
		},
	},
	logoNormalBackgroundImageAttachment: {
		type: 'object',
		default: {
			Desktop: 'scroll',
			Tablet: 'scroll',
			Mobile: 'scroll',
		},
	},
	logoNormalBackgroundImageRepeat: {
		type: 'object',
		default: {
			Desktop: 'no-repeat',
			Tablet: 'no-repeat',
			Mobile: 'no-repeat',
		},
	},
	logoNormalBackgroundImageSize: {
		type: 'object',
		default: {
			Desktop: 'cover',
			Tablet: 'cover',
			Mobile: 'cover',
		},
	},

	logoHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	logoHoverClassicColor: {
		type: 'string',
		default: '',
	},
	logoHoverGradientColor: {
		type: 'string',
		default: '',
	},
	logoHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	logoHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	logoHoverBackgroundImageUrl: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoHoverBackgroundImagePosition: {
		type: 'object',
		default: {
			Desktop: { x: 0.5, y: 0.5 },
			Tablet: { x: 0.5, y: 0.5 },
			Mobile: { x: 0.5, y: 0.5 },
		},
	},
	logoHoverBackgroundImageAttachment: {
		type: 'object',
		default: {
			Desktop: 'scroll',
			Tablet: 'scroll',
			Mobile: 'scroll',
		},
	},
	logoHoverBackgroundImageRepeat: {
		type: 'object',
		default: {
			Desktop: 'no-repeat',
			Tablet: 'no-repeat',
			Mobile: 'no-repeat',
		},
	},
	logoHoverBackgroundImageSize: {
		type: 'object',
		default: {
			Desktop: 'cover',
			Tablet: 'cover',
			Mobile: 'cover',
		},
	},
	/** End Logo Background */

	/** Start Logo Border */
	logoBorder: {
		type: 'string',
		default: 'none',
	},
	logoBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	logoBorderColor: {
		type: 'string',
	},
	logoBorderHoverColor: {
		type: 'string',
	},
	logoBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	logoBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	logoBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	logoBorderLink: {
		type: 'boolean',
		default: true,
	},
	logoBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	logoBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	logoBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	logoBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	logoBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	logoBoxShadowValues: {
		type: 'array',
		default: [],
	},
	logoBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	logoBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	logoBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Logo Border */

	/** Start Logo Caption Typography */
	logoCaptionFontFamily: {
		type: 'string',
		default: '',
	},
	logoCaptionFontSize: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoCaptionFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoCaptionFontWeight: {
		type: 'string',
		default: '',
	},
	logoCaptionFontStyle: {
		type: 'string',
		default: '',
	},
	logoCaptionTextTransform: {
		type: 'string',
		default: '',
	},
	logoCaptionTextDecoration: {
		type: 'string',
		default: '',
	},
	logoCaptionLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoCaptionLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoCaptionLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoCaptionLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoCaptionWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoCaptionWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Logo Caption Typography */

	/** Start Logo Caption Color */
	logoCaptionColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	logoCaptionColor: {
		type: 'string',
		default: '#ffffff',
	},
	logoCaptionColorHover: {
		type: 'string',
		default: '',
	},
	/** End Logo Caption Color */

	/** Start Logo Caption Background */
	logoCaptionNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	logoCaptionNormalClassicColor: {
		type: 'string',
		default: '#00000075',
	},
	logoCaptionNormalGradientColor: {
		type: 'string',
		default: '',
	},
	logoCaptionNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	logoCaptionNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	logoCaptionHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	logoCaptionHoverClassicColor: {
		type: 'string',
		default: '',
	},
	logoCaptionHoverGradientColor: {
		type: 'string',
		default: '',
	},
	logoCaptionHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	logoCaptionHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Logo Caption Background */

	/** Start Logo Caption Border */
	logoCaptionBorder: {
		type: 'string',
		default: 'none',
	},
	logoCaptionBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	logoCaptionBorderColor: {
		type: 'string',
	},
	logoCaptionBorderHoverColor: {
		type: 'string',
	},
	logoCaptionBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoCaptionBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoCaptionBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	logoCaptionBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoCaptionBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	logoCaptionBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoCaptionBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	logoCaptionBorderLink: {
		type: 'boolean',
		default: true,
	},
	logoCaptionBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoCaptionBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoCaptionBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	logoCaptionBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoCaptionBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	logoCaptionBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoCaptionBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	logoCaptionBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Logo Caption Border */

	/** Start Logo Caption Padding */
	logoCaptionPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoCaptionPaddingDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoCaptionPaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	logoCaptionPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoCaptionPaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	logoCaptionPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoCaptionPaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	logoCaptionPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Logo Caption Padding */

	/** Start Logo Tooltip Typography */
	logoTooltipFontFamily: {
		type: 'string',
		default: '',
	},
	logoTooltipFontSize: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoTooltipFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoTooltipFontWeight: {
		type: 'string',
		default: '',
	},
	logoTooltipFontStyle: {
		type: 'string',
		default: '',
	},
	logoTooltipTextTransform: {
		type: 'string',
		default: '',
	},
	logoTooltipTextDecoration: {
		type: 'string',
		default: '',
	},
	logoTooltipLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoTooltipLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoTooltipLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoTooltipLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoTooltipWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	logoTooltipWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Logo Tooltip Typography */

	/** Start Logo Tooltip Color */
	logoTooltipColor: {
		type: 'string',
		default: '#ffffff',
	},
	logoTooltipBgColor: {
		type: 'string',
		default: '#00000085',
	},
	/** End Logo Tooltip Color */

	/** Start Logo Tooltip Border */
	logoTooltipBorder: {
		type: 'string',
		default: 'none',
	},
	logoTooltipBorderColor: {
		type: 'string',
	},
	logoTooltipBorderHoverColor: {
		type: 'string',
	},
	logoTooltipBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoTooltipBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoTooltipBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	logoTooltipBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoTooltipBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	logoTooltipBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoTooltipBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	logoTooltipBorderLink: {
		type: 'boolean',
		default: true,
	},
	logoTooltipBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoTooltipBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoTooltipBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	logoTooltipBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoTooltipBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	logoTooltipBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoTooltipBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	logoTooltipBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Logo Tooltip Border */

	/** Start Logo Tooltip Padding */
	logoTooltipPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	logoTooltipPaddingDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoTooltipPaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	logoTooltipPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoTooltipPaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	logoTooltipPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	logoTooltipPaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	logoTooltipPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Logo Tooltip Padding */

	/** Start Logo Tooltip Position */
	logoTooltipTopPosition: {
		type: 'object',
		default: {
			Desktop: '50',
			Tablet: '50',
			Mobile: '50',
		},
	},
	logoTooltipTopPositionUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	logoTooltipLeftPosition: {
		type: 'object',
		default: {
			Desktop: '50',
			Tablet: '50',
			Mobile: '50',
		},
	},
	logoTooltipLeftPositionUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	/** End Logo Tooltip Position */

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
		default: '',
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
		default: '',
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
		default: '',
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
		default: 'inside',
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
			Desktop: '60',
			Tablet: '60',
			Mobile: '45',
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
			Desktop: '8',
			Tablet: '8',
			Mobile: '8',
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
			Desktop: '8',
			Tablet: '8',
			Mobile: '8',
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
		default: '',
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
		default: '',
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
		default: '',
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

	/** Start Global Setting */

	/** Start Global Margin */
	globalMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	globalMarginDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalMarginDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	globalMarginTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalMarginTabletCssStyle: {
		type: 'string',
		default: '',
	},
	globalMarginMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalMarginMobileCssStyle: {
		type: 'string',
		default: '',
	},
	globalMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Global Margin */

	/** Start Global Padding */
	globalPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	globalPaddingDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalPaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	globalPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalPaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	globalPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalPaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	globalPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Global Padding */

	/** Start Global Z-Index */
	globalZIndex: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	globalID: {
		type: 'string',
		default: '',
	},
	globalClass: {
		type: 'string',
		default: '',
	},
	/** End Global Z-Index */

	/** Start Global Background */
	globalNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	globalNormalClassicColor: {
		type: 'string',
		default: '',
	},
	globalNormalGradientColor: {
		type: 'string',
		default: '',
	},
	globalNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	globalNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	globalNormalBackgroundImageUrl: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	globalNormalBackgroundImagePosition: {
		type: 'object',
		default: {
			Desktop: { x: 0.5, y: 0.5 },
			Tablet: { x: 0.5, y: 0.5 },
			Mobile: { x: 0.5, y: 0.5 },
		},
	},
	globalNormalBackgroundImageAttachment: {
		type: 'object',
		default: {
			Desktop: 'scroll',
			Tablet: 'scroll',
			Mobile: 'scroll',
		},
	},
	globalNormalBackgroundImageRepeat: {
		type: 'object',
		default: {
			Desktop: 'no-repeat',
			Tablet: 'no-repeat',
			Mobile: 'no-repeat',
		},
	},
	globalNormalBackgroundImageSize: {
		type: 'object',
		default: {
			Desktop: 'cover',
			Tablet: 'cover',
			Mobile: 'cover',
		},
	},

	globalHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	globalHoverClassicColor: {
		type: 'string',
		default: '',
	},
	globalHoverGradientColor: {
		type: 'string',
		default: '',
	},
	globalHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	globalHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	globalHoverBackgroundImageUrl: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	globalHoverBackgroundImagePosition: {
		type: 'object',
		default: {
			Desktop: { x: 0.5, y: 0.5 },
			Tablet: { x: 0.5, y: 0.5 },
			Mobile: { x: 0.5, y: 0.5 },
		},
	},
	globalHoverBackgroundImageAttachment: {
		type: 'object',
		default: {
			Desktop: 'scroll',
			Tablet: 'scroll',
			Mobile: 'scroll',
		},
	},
	globalHoverBackgroundImageRepeat: {
		type: 'object',
		default: {
			Desktop: 'no-repeat',
			Tablet: 'no-repeat',
			Mobile: 'no-repeat',
		},
	},
	globalHoverBackgroundImageSize: {
		type: 'object',
		default: {
			Desktop: 'cover',
			Tablet: 'cover',
			Mobile: 'cover',
		},
	},
	/** End Global Background */

	/** Start Global Border */
	globalBorder: {
		type: 'string',
		default: 'none',
	},
	globalBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	globalBorderColor: {
		type: 'string',
	},
	globalBorderHoverColor: {
		type: 'string',
	},
	globalBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	globalBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderLink: {
		type: 'boolean',
		default: true,
	},
	globalBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	globalBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	globalBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	globalBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	globalBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	globalBoxShadowValues: {
		type: 'array',
		default: [],
	},
	globalBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	globalBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	globalBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Global Border */
};

export default attributes;
