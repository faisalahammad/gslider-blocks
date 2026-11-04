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

	/** Start slider Item Background */
	sliderItemNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	sliderItemNormalClassicColor: {
		type: 'string',
		default: '',
	},
	sliderItemNormalGradientColor: {
		type: 'string',
		default: null,
	},
	sliderItemNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	sliderItemNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	sliderItemNormalBackgroundImageUrl: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	sliderItemNormalBackgroundImagePosition: {
		type: 'object',
		default: {
			Desktop: { x: 0.5, y: 0.5 },
			Tablet: { x: 0.5, y: 0.5 },
			Mobile: { x: 0.5, y: 0.5 },
		},
	},
	sliderItemNormalBackgroundImageAttachment: {
		type: 'object',
		default: {
			Desktop: 'scroll',
			Tablet: 'scroll',
			Mobile: 'scroll',
		},
	},
	sliderItemNormalBackgroundImageRepeat: {
		type: 'object',
		default: {
			Desktop: 'no-repeat',
			Tablet: 'no-repeat',
			Mobile: 'no-repeat',
		},
	},
	sliderItemNormalBackgroundImageSize: {
		type: 'object',
		default: {
			Desktop: 'cover',
			Tablet: 'cover',
			Mobile: 'cover',
		},
	},

	sliderItemHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	sliderItemHoverClassicColor: {
		type: 'string',
		default: '',
	},
	sliderItemHoverGradientColor: {
		type: 'string',
		default: null,
	},
	sliderItemHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	sliderItemHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	sliderItemHoverBackgroundImageUrl: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	sliderItemHoverBackgroundImagePosition: {
		type: 'object',
		default: {
			Desktop: { x: 0.5, y: 0.5 },
			Tablet: { x: 0.5, y: 0.5 },
			Mobile: { x: 0.5, y: 0.5 },
		},
	},
	sliderItemHoverBackgroundImageAttachment: {
		type: 'object',
		default: {
			Desktop: 'scroll',
			Tablet: 'scroll',
			Mobile: 'scroll',
		},
	},
	sliderItemHoverBackgroundImageRepeat: {
		type: 'object',
		default: {
			Desktop: 'no-repeat',
			Tablet: 'no-repeat',
			Mobile: 'no-repeat',
		},
	},
	sliderItemHoverBackgroundImageSize: {
		type: 'object',
		default: {
			Desktop: 'cover',
			Tablet: 'cover',
			Mobile: 'cover',
		},
	},
	/** End slider Item Background */
};

export default attributes;
