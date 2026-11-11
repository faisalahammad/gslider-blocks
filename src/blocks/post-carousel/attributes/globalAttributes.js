const globalAttributes = {
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

	/** Start Global Custom CSS */
	globalCustomCSS: {
		type: 'string',
		default: '',
	},
	/** End Global Custom CSS */

	/** Start SEO & Structured Data */
	enableSchemaMarkup: {
		type: 'boolean',
		default: true,
	},
	/** End SEO & Structured Data */
};

export default globalAttributes;
