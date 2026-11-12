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
	images: {
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
				/** Old slides have no video keys, which means the same as 'html5' */
				videoSource: { type: 'string' },
				videoExternalUrl: { type: 'string' },
				videoExternalId: { type: 'string' },
			},
		},
	},

	/** Start Carousel Settings */
	carouselPerColumn: {
		type: 'object',
		default: {
			Desktop: 1,
			Tablet: 1,
			Mobile: 1,
		},
	},
	carouselPerColumnGap: {
		type: 'object',
		default: {
			Desktop: 0,
			Tablet: 0,
			Mobile: 0,
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

	/** Start image Link Settings */
	enableimageLinks: {
		type: 'boolean',
		default: false,
	},
	enableLightbox: {
		type: 'object',
		default: {
			Desktop: false,
			Tablet: false,
			Mobile: false,
		},
	},
	showTooltip: {
		type: 'boolean',
		default: false,
	},
	imageLinkTarget: {
		type: 'string',
		default: '_blank',
	},
	imageLinkRel: {
		type: 'string',
		default: 'noopener noreferrer',
	},
	imageLinkHoverEffect: {
		type: 'string',
		default: 'none',
	},
	imageLinkHoverOpacity: {
		type: 'object',
		default: {
			Desktop: 0.8,
			Tablet: 0.8,
			Mobile: 0.8,
		},
	},
	imageLinkHoverScale: {
		type: 'object',
		default: {
			Desktop: 1.05,
			Tablet: 1.05,
			Mobile: 1.05,
		},
	},
	imageLinkHoverLift: {
		type: 'object',
		default: {
			Desktop: 10,
			Tablet: 10,
			Mobile: 10,
		},
	},
	imageLinkHoverLiftUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageLinkTransitionDuration: {
		type: 'object',
		default: {
			Desktop: 300,
			Tablet: 300,
			Mobile: 300,
		},
	},
	/** End image Link Settings */

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

	/** Start image Max Width */
	imageMaxWidth: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	imageMaxWidthUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	/** End image Max Width */

	/** Start image Padding */
	imagePaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imagePaddingDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imagePaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imagePaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imagePaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imagePaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imagePaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imagePaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End image Padding */

	/** Start image Background */
	imageNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	imageNormalClassicColor: {
		type: 'string',
		default: '',
	},
	imageNormalGradientColor: {
		type: 'string',
		default: '',
	},
	imageNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	imageNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},

	imageHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	imageHoverClassicColor: {
		type: 'string',
		default: '',
	},
	imageHoverGradientColor: {
		type: 'string',
		default: '',
	},
	imageHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	imageHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End image Background */

	/** Start image Border */
	imageBorder: {
		type: 'string',
		default: 'none',
	},
	imageBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	imageBorderColor: {
		type: 'string',
	},
	imageBorderHoverColor: {
		type: 'string',
	},
	imageBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderLink: {
		type: 'boolean',
		default: true,
	},
	imageBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	imageBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	imageBoxShadowValues: {
		type: 'array',
		default: [],
	},
	imageBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	imageBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	imageBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End image Border */

	/** Start image Caption Typography */
	imageCaptionFontFamily: {
		type: 'string',
		default: '',
	},
	imageCaptionFontSize: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	imageCaptionFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageCaptionFontWeight: {
		type: 'string',
		default: '',
	},
	imageCaptionFontStyle: {
		type: 'string',
		default: '',
	},
	imageCaptionTextTransform: {
		type: 'string',
		default: '',
	},
	imageCaptionTextDecoration: {
		type: 'string',
		default: '',
	},
	imageCaptionLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	imageCaptionLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageCaptionLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	imageCaptionLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageCaptionWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	imageCaptionWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End image Caption Typography */

	/** Start image Caption Color */
	imageCaptionColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	imageCaptionColor: {
		type: 'string',
		default: '#ffffff',
	},
	imageCaptionColorHover: {
		type: 'string',
		default: '',
	},
	/** End image Caption Color */

	/** Start image Caption Background */
	imageCaptionNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	imageCaptionNormalClassicColor: {
		type: 'string',
		default: '#00000075',
	},
	imageCaptionNormalGradientColor: {
		type: 'string',
		default: '',
	},
	imageCaptionNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	imageCaptionNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	imageCaptionHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	imageCaptionHoverClassicColor: {
		type: 'string',
		default: '',
	},
	imageCaptionHoverGradientColor: {
		type: 'string',
		default: '',
	},
	imageCaptionHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	imageCaptionHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End image Caption Background */

	/** Start image Caption Border */
	imageCaptionBorder: {
		type: 'string',
		default: 'none',
	},
	imageCaptionBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	imageCaptionBorderColor: {
		type: 'string',
	},
	imageCaptionBorderHoverColor: {
		type: 'string',
	},
	imageCaptionBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageCaptionBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageCaptionBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageCaptionBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageCaptionBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageCaptionBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageCaptionBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageCaptionBorderLink: {
		type: 'boolean',
		default: true,
	},
	imageCaptionBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageCaptionBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageCaptionBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageCaptionBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageCaptionBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageCaptionBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageCaptionBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageCaptionBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End image Caption Border */

	/** Start image Caption Padding */
	imageCaptionPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageCaptionPaddingDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageCaptionPaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageCaptionPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageCaptionPaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageCaptionPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageCaptionPaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageCaptionPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End image Caption Padding */

	/** Start image Tooltip Typography */
	imageTooltipFontFamily: {
		type: 'string',
		default: '',
	},
	imageTooltipFontSize: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	imageTooltipFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageTooltipFontWeight: {
		type: 'string',
		default: '',
	},
	imageTooltipFontStyle: {
		type: 'string',
		default: '',
	},
	imageTooltipTextTransform: {
		type: 'string',
		default: '',
	},
	imageTooltipTextDecoration: {
		type: 'string',
		default: '',
	},
	imageTooltipLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	imageTooltipLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageTooltipLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	imageTooltipLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageTooltipWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	imageTooltipWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End image Tooltip Typography */

	/** Start image Tooltip Color */
	imageTooltipColor: {
		type: 'string',
		default: '#ffffff',
	},
	imageTooltipBgColor: {
		type: 'string',
		default: '#00000085',
	},
	/** End image Tooltip Color */

	/** Start image Tooltip Border */
	imageTooltipBorder: {
		type: 'string',
		default: 'none',
	},
	imageTooltipBorderColor: {
		type: 'string',
	},
	imageTooltipBorderHoverColor: {
		type: 'string',
	},
	imageTooltipBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageTooltipBorderDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageTooltipBorderDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageTooltipBorderTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageTooltipBorderTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageTooltipBorderMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageTooltipBorderMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageTooltipBorderLink: {
		type: 'boolean',
		default: true,
	},
	imageTooltipBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageTooltipBorderRadiusDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageTooltipBorderRadiusDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageTooltipBorderRadiusTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageTooltipBorderRadiusTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageTooltipBorderRadiusMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageTooltipBorderRadiusMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageTooltipBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End image Tooltip Border */

	/** Start image Tooltip Padding */
	imageTooltipPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	imageTooltipPaddingDesktop: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageTooltipPaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	imageTooltipPaddingTablet: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageTooltipPaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	imageTooltipPaddingMobile: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	imageTooltipPaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	imageTooltipPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End image Tooltip Padding */

	/** Start image Tooltip Position */
	imageTooltipTopPosition: {
		type: 'object',
		default: {
			Desktop: '50',
			Tablet: '50',
			Mobile: '50',
		},
	},
	imageTooltipTopPositionUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	imageTooltipLeftPosition: {
		type: 'object',
		default: {
			Desktop: '50',
			Tablet: '50',
			Mobile: '50',
		},
	},
	imageTooltipLeftPositionUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	/** End image Tooltip Position */

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
