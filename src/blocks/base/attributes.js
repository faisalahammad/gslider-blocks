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
	sliderItems: {
		type: 'array',
		default: [
			{
				id: 'item-1',
				subTitle: 'Sub Title',
				title: 'Slider Item 1',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.',
				primaryButtonText: 'Get Started',
				primaryButtonLink: '#',
				primaryButtonTargetLink: true,
				primaryButtonNofollow: false,
				primaryButtonSponsored: false,

				secondaryButtonSwitcher: false,
				secondaryButtonText: 'Get Started',
				secondaryButtonLink: '#',
				secondaryButtonTargetLink: true,
				secondaryButtonNofollow: false,
				secondaryButtonSponsored: false,

				normalItemBackgroundType: 'classic',
				normalItemClassicColor: '#EDEDED',
				normalItemGradientColor: '',
				normalItemCustomGradientSwitcher: false,
				normalItemCustomGradientInputValue: '',

				normalBackgroundImageUrl: {
					Desktop: '',
					Tablet: '',
					Mobile: '',
				},
				normalBackgroundImageAlt: {
					Desktop: '',
					Tablet: '',
					Mobile: '',
				},
				normalBackgroundImageID: {
					Desktop: '',
					Tablet: '',
					Mobile: '',
				},
				normalBackgroundImagePosition: {
					Desktop: { x: 0.5, y: 0.5 },
					Tablet: { x: 0.5, y: 0.5 },
					Mobile: { x: 0.5, y: 0.5 },
				},
				normalBackgroundImageAttachment: {
					Desktop: 'scroll',
					Tablet: 'scroll',
					Mobile: 'scroll',
				},
				normalBackgroundImageRepeat: {
					Desktop: 'no-repeat',
					Tablet: 'no-repeat',
					Mobile: 'no-repeat',
				},
				normalBackgroundImageSize: {
					Desktop: 'cover',
					Tablet: 'cover',
					Mobile: 'cover',
				},

				itemBackgroundOverlaySwitcher: false,
				itemBackgroundOverlayType: 'classic',
				itemBackgroundOverlayClassicColor: '#000',
				itemBackgroundOverlayGradientColor: '',
				itemBackgroundOverlayCustomGradientSwitcher: false,
				itemBackgroundOverlayCustomGradientInputValue: '',
				itemBackgroundOverlayOpacity: 0.5,
			},
			{
				id: 'item-2',

				subTitle: 'Sub Title',
				title: 'Slider Item 2',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.',
				primaryButtonText: 'Get Started',
				primaryButtonLink: '#',
				primaryButtonTargetLink: true,
				primaryButtonNofollow: false,
				primaryButtonSponsored: false,

				secondaryButtonSwitcher: false,
				secondaryButtonText: 'Get Started',
				secondaryButtonLink: '#',
				secondaryButtonTargetLink: true,
				secondaryButtonNofollow: false,
				secondaryButtonSponsored: false,

				normalItemBackgroundType: 'classic',
				normalItemClassicColor: '#EDEDED',
				normalItemGradientColor: '',
				normalItemCustomGradientSwitcher: false,
				normalItemCustomGradientInputValue: '',

				normalBackgroundImageUrl: {
					Desktop: '',
					Tablet: '',
					Mobile: '',
				},
				normalBackgroundImageAlt: {
					Desktop: '',
					Tablet: '',
					Mobile: '',
				},
				normalBackgroundImageID: {
					Desktop: '',
					Tablet: '',
					Mobile: '',
				},
				normalBackgroundImagePosition: {
					Desktop: { x: 0.5, y: 0.5 },
					Tablet: { x: 0.5, y: 0.5 },
					Mobile: { x: 0.5, y: 0.5 },
				},
				normalBackgroundImageAttachment: {
					Desktop: 'scroll',
					Tablet: 'scroll',
					Mobile: 'scroll',
				},
				normalBackgroundImageRepeat: {
					Desktop: 'no-repeat',
					Tablet: 'no-repeat',
					Mobile: 'no-repeat',
				},
				normalBackgroundImageSize: {
					Desktop: 'cover',
					Tablet: 'cover',
					Mobile: 'cover',
				},

				itemBackgroundOverlaySwitcher: false,
				itemBackgroundOverlayType: 'classic',
				itemBackgroundOverlayClassicColor: '#000',
				itemBackgroundOverlayGradientColor: '',
				itemBackgroundOverlayCustomGradientSwitcher: false,
				itemBackgroundOverlayCustomGradientInputValue: '',
				itemBackgroundOverlayOpacity: 0.5,
			},
			{
				id: 'item-3',

				subTitle: 'Sub Title',
				title: 'Slider Item 3',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.',
				primaryButtonText: 'Get Started',
				primaryButtonLink: '#',
				primaryButtonTargetLink: true,
				primaryButtonNofollow: false,
				primaryButtonSponsored: false,

				secondaryButtonSwitcher: false,
				secondaryButtonText: 'Get Started',
				secondaryButtonLink: '#',
				secondaryButtonTargetLink: true,
				secondaryButtonNofollow: false,
				secondaryButtonSponsored: false,

				normalItemBackgroundType: 'classic',
				normalItemClassicColor: '#EDEDED',
				normalItemGradientColor: '',
				normalItemCustomGradientSwitcher: false,
				normalItemCustomGradientInputValue: '',

				normalBackgroundImageUrl: {
					Desktop: '',
					Tablet: '',
					Mobile: '',
				},
				normalBackgroundImageAlt: {
					Desktop: '',
					Tablet: '',
					Mobile: '',
				},
				normalBackgroundImageID: {
					Desktop: '',
					Tablet: '',
					Mobile: '',
				},
				normalBackgroundImagePosition: {
					Desktop: { x: 0.5, y: 0.5 },
					Tablet: { x: 0.5, y: 0.5 },
					Mobile: { x: 0.5, y: 0.5 },
				},
				normalBackgroundImageAttachment: {
					Desktop: 'scroll',
					Tablet: 'scroll',
					Mobile: 'scroll',
				},
				normalBackgroundImageRepeat: {
					Desktop: 'no-repeat',
					Tablet: 'no-repeat',
					Mobile: 'no-repeat',
				},
				normalBackgroundImageSize: {
					Desktop: 'cover',
					Tablet: 'cover',
					Mobile: 'cover',
				},

				itemBackgroundOverlaySwitcher: false,
				itemBackgroundOverlayType: 'classic',
				itemBackgroundOverlayClassicColor: '#000',
				itemBackgroundOverlayGradientColor: '',
				itemBackgroundOverlayCustomGradientSwitcher: false,
				itemBackgroundOverlayCustomGradientInputValue: '',
				itemBackgroundOverlayOpacity: 0.5,
			},
		],
		items: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					default: '',
				},
				subTitle: {
					type: 'string',
					default: 'Sub Title',
				},
				title: {
					type: 'string',
					default: 'Slider Item',
				},
				description: {
					type: 'string',
					default:
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.',
				},
				primaryButtonText: {
					type: 'string',
					default: 'Get Started',
				},
				primaryButtonLink: {
					type: 'string',
					default: '#',
				},
				primaryButtonTargetLink: {
					type: 'boolean',
					default: true,
				},
				primaryButtonNofollow: {
					type: 'boolean',
					default: false,
				},
				primaryButtonSponsored: {
					type: 'boolean',
					default: false,
				},

				secondaryButtonSwitcher: {
					type: 'boolean',
					default: false,
				},
				secondaryButtonText: {
					type: 'string',
					default: 'Get Started',
				},
				secondaryButtonLink: {
					type: 'string',
					default: '#',
				},
				secondaryButtonTargetLink: {
					type: 'boolean',
					default: true,
				},
				secondaryButtonNofollow: {
					type: 'boolean',
					default: false,
				},
				secondaryButtonSponsored: {
					type: 'boolean',
					default: false,
				},

				normalItemBackgroundType: {
					type: 'string',
					default: 'classic',
				},
				normalItemClassicColor: {
					type: 'string',
					default: '',
				},
				normalItemGradientColor: {
					type: 'string',
					default: '',
				},
				normalItemCustomGradientSwitcher: {
					type: 'boolean',
					default: false,
				},
				normalItemCustomGradientInputValue: {
					type: 'string',
					default: '',
				},
				normalBackgroundImageUrl: {
					type: 'object',
					default: {
						Desktop: '',
						Tablet: '',
						Mobile: '',
					},
				},
				normalBackgroundImageAlt: {
					type: 'object',
					default: {
						Desktop: '',
						Tablet: '',
						Mobile: '',
					},
				},
				normalBackgroundImageID: {
					type: 'object',
					default: {
						Desktop: '',
						Tablet: '',
						Mobile: '',
					},
				},
				normalBackgroundImagePosition: {
					type: 'object',
					default: {
						Desktop: { x: 0.5, y: 0.5 },
						Tablet: { x: 0.5, y: 0.5 },
						Mobile: { x: 0.5, y: 0.5 },
					},
				},
				normalBackgroundImageAttachment: {
					type: 'object',
					default: {
						Desktop: 'scroll',
						Tablet: 'scroll',
						Mobile: 'scroll',
					},
				},
				normalBackgroundImageRepeat: {
					type: 'object',
					default: {
						Desktop: 'no-repeat',
						Tablet: 'no-repeat',
						Mobile: 'no-repeat',
					},
				},
				normalBackgroundImageSize: {
					type: 'object',
					default: {
						Desktop: 'cover',
						Tablet: 'cover',
						Mobile: 'cover',
					},
				},

				itemBackgroundOverlaySwitcher: {
					type: 'boolean',
					default: false,
				},

				itemBackgroundOverlayType: {
					type: 'string',
					default: 'classic',
				},
				itemBackgroundOverlayClassicColor: {
					type: 'string',
					default: '',
				},
				itemBackgroundOverlayGradientColor: {
					type: 'string',
					default: '',
				},
				itemBackgroundOverlayCustomGradientSwitcher: {
					type: 'boolean',
					default: false,
				},
				itemBackgroundOverlayCustomGradientInputValue: {
					type: 'string',
					default: '',
				},
				itemBackgroundOverlayOpacity: {
					type: 'number',
					default: 0.5,
				},
			},
		},
	},

	/** Start Slider Settings */
	sliderType: {
		type: 'string',
		default: 'slider',
	},
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
			Desktop: 20,
			Tablet: 20,
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
	slideEffect: {
		type: 'string',
		default: 'slide',
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
	/** End Slider Settings */

	/** Start Show/Hide Elements */
	showSubTitle: {
		type: 'boolean',
		default: true,
	},
	showTitle: {
		type: 'boolean',
		default: true,
	},
	showDescription: {
		type: 'boolean',
		default: true,
	},
	showButton: {
		type: 'boolean',
		default: true,
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
	paginationPositionType: {
		type: 'string',
		default: 'inside',
	},
	/** End Show/Hide Elements */

	/** Layout & Content Setting */
	layoutHeightSwitcher: {
		type: 'string',
		default: 'fixed',
	},
	layoutHeight: {
		type: 'object',
		default: {
			Desktop: '500',
			Tablet: '400',
			Mobile: '300',
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
	contentWidth: {
		type: 'object',
		default: {
			Desktop: '80',
			Tablet: '80',
			Mobile: '80',
		},
	},
	contentWidthUnits: {
		type: 'object',
		default: {
			Desktop: '%',
			Tablet: '%',
			Mobile: '%',
		},
	},
	contentAlignment: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	contentVerticalAlignment: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	contentHorizontalAlignment: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	subTitleHtmlTag: {
		type: 'string',
		default: 'h3',
	},
	titleHtmlTag: {
		type: 'string',
		default: 'h2',
	},
	descriptionHtmlTag: {
		type: 'string',
		default: 'p',
	},
	/** End Layout & Content Setting */

	/** Start Content Padding */
	contentPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	contentPaddingDesktop: {
		type: 'object',
		default: {
			top: '30',
			bottom: '30',
			left: '30',
			right: '30',
		},
	},
	contentPaddingDesktopCssStyle: {
		type: 'string',
		default: '',
	},
	contentPaddingTablet: {
		type: 'object',
		default: {
			top: '20',
			bottom: '20',
			left: '20',
			right: '20',
		},
	},
	contentPaddingTabletCssStyle: {
		type: 'string',
		default: '',
	},
	contentPaddingMobile: {
		type: 'object',
		default: {
			top: '15',
			bottom: '15',
			left: '15',
			right: '15',
		},
	},
	contentPaddingMobileCssStyle: {
		type: 'string',
		default: '',
	},
	contentPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Content Padding */

	/** Start Subtitle Typography */
	subtitleFontFamily: {
		type: 'string',
		default: '',
	},
	subtitleFontSize: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	subtitleFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	subtitleFontWeight: {
		type: 'string',
		default: '',
	},
	subtitleFontStyle: {
		type: 'string',
		default: '',
	},
	subtitleTextTransform: {
		type: 'string',
		default: '',
	},
	subtitleTextDecoration: {
		type: 'string',
		default: '',
	},
	subtitleLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	subtitleLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	subtitleLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	subtitleLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	subtitleWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	subtitleWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Subtitle Typography */

	/** Start Subtitle Color */
	subtitleColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	subtitleColor: {
		type: 'string',
		default: '',
	},
	subtitleColorHover: {
		type: 'string',
		default: '',
	},
	/** End Subtitle Color */

	/** Start Subtitle Margin */
	subtitleMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	subtitleDesktopMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '16',
			left: '0',
			right: '0',
		},
	},
	subtitleDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	subtitleTabletMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '16',
			left: '0',
			right: '0',
		},
	},
	subtitleTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	subtitleMobileMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '16',
			left: '0',
			right: '0',
		},
	},
	subtitleMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	subtitleMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Subtitle Margin */

	/** Start Subtitle Padding */
	subtitlePaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	subtitleDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	subtitleDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	subtitleTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	subtitleTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	subtitleMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	subtitleMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	subtitlePaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Subtitle Padding */

	/** End Subtitle     */

	/** Start Title Typography */
	titleFontFamily: {
		type: 'string',
		default: '',
	},
	titleFontSize: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	titleFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	titleFontWeight: {
		type: 'string',
		default: '',
	},
	titleFontStyle: {
		type: 'string',
		default: '',
	},
	titleTextTransform: {
		type: 'string',
		default: '',
	},
	titleTextDecoration: {
		type: 'string',
		default: '',
	},
	titleLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	titleLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	titleLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	titleLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	titleWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	titleWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Title Typography */

	/** Start Title Color */
	titleColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	titleColor: {
		type: 'string',
		default: '',
	},
	titleColorHover: {
		type: 'string',
		default: '',
	},
	/** End Title Color */

	/** Start Title Margin */
	titleMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	titleDesktopMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '16',
			left: '0',
			right: '0',
		},
	},
	titleDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	titleTabletMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '16',
			left: '0',
			right: '0',
		},
	},
	titleTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	titleMobileMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '16',
			left: '0',
			right: '0',
		},
	},
	titleMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	titleMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Title Margin */

	/** Start Title Padding */
	titlePaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	titleDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	titleDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	titleTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	titleTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	titleMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	titleMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	titlePaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Title Padding */

	/** End Title     */

	/** Start Description Typography */
	descriptionFontFamily: {
		type: 'string',
		default: '',
	},
	descriptionFontSize: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	descriptionFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	descriptionFontWeight: {
		type: 'string',
		default: '',
	},
	descriptionFontStyle: {
		type: 'string',
		default: '',
	},
	descriptionTextTransform: {
		type: 'string',
		default: '',
	},
	descriptionTextDecoration: {
		type: 'string',
		default: '',
	},
	descriptionLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	descriptionLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	descriptionLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	descriptionLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	descriptionWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	descriptionWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Description Typography */

	/** Start Description Color */
	descriptionColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	descriptionColor: {
		type: 'string',
		default: '',
	},
	descriptionColorHover: {
		type: 'string',
		default: '',
	},
	/** End Description Color */

	/** Start Description Margin */
	descriptionMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	descriptionDesktopMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '16',
			left: '0',
			right: '0',
		},
	},
	descriptionDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	descriptionTabletMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '16',
			left: '0',
			right: '0',
		},
	},
	descriptionTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	descriptionMobileMargin: {
		type: 'object',
		default: {
			top: '0',
			bottom: '16',
			left: '0',
			right: '0',
		},
	},
	descriptionMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	descriptionMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Description Margin */

	/** Start Description Padding */
	descriptionPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	descriptionDesktopPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	descriptionDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	descriptionTabletPadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	descriptionTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	descriptionMobilePadding: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	descriptionMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	descriptionPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Description Padding */

	/** End Description     */

	/** Start Primary Button Typography */
	primaryButtonFontFamily: {
		type: 'string',
		default: '',
	},
	primaryButtonFontSize: {
		type: 'object',
		default: {
			Desktop: '16',
			Tablet: '16',
			Mobile: '14',
		},
	},
	primaryButtonFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	primaryButtonFontWeight: {
		type: 'string',
		default: '',
	},
	primaryButtonFontStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonTextTransform: {
		type: 'string',
		default: '',
	},
	primaryButtonTextDecoration: {
		type: 'string',
		default: 'none',
	},
	primaryButtonLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	primaryButtonLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	primaryButtonLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	primaryButtonLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	primaryButtonWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	primaryButtonWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Primary Button Typography */

	/** Start Primary Button Color */
	primaryButtonColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	primaryButtonColor: {
		type: 'string',
		default: '',
	},
	primaryButtonColorHover: {
		type: 'string',
		default: '',
	},
	/** End Primary Button Color */

	/** Start Primary Button Background */
	primaryButtonNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	primaryButtonNormalClassicColor: {
		type: 'string',
		default: '#d2d2d2c7',
	},
	primaryButtonNormalGradientColor: {
		type: 'string',
		default: '',
	},
	primaryButtonNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	primaryButtonNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	primaryButtonHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	primaryButtonHoverClassicColor: {
		type: 'string',
		default: '#787878b8',
	},
	primaryButtonHoverGradientColor: {
		type: 'string',
		default: '',
	},
	primaryButtonHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	primaryButtonHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Primary Button Background */

	/** Start Primary Button Border */
	primaryButtonBorder: {
		type: 'string',
		default: 'none',
	},
	primaryButtonBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	primaryButtonBorderColor: {
		type: 'string',
		default: '',
	},
	primaryButtonBorderHoverColor: {
		type: 'string',
		default: '',
	},
	primaryButtonBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	primaryButtonDesktopBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	primaryButtonDesktopBorderCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonTabletBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	primaryButtonTabletBorderCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonMobileBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	primaryButtonMobileBorderCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Primary Button Border */

	/** Start Primary Button Border Radius */
	primaryButtonBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	primaryButtonDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '4',
			bottom: '4',
			left: '4',
			right: '4',
		},
	},
	primaryButtonDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonTabletBorderRadius: {
		type: 'object',
		default: {
			top: '4',
			bottom: '4',
			left: '4',
			right: '4',
		},
	},
	primaryButtonTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonMobileBorderRadius: {
		type: 'object',
		default: {
			top: '4',
			bottom: '4',
			left: '4',
			right: '4',
		},
	},
	primaryButtonMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Primary Button Border Radius */

	/** Start Primary Button Box Shadow */
	primaryButtonBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	primaryButtonBoxShadowValues: {
		type: 'array',
		default: [],
	},
	primaryButtonBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	primaryButtonBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	primaryButtonBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Primary Button Box Shadow */

	/** Start Primary Button Margin */
	primaryButtonMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	primaryButtonDesktopMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	primaryButtonDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonTabletMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	primaryButtonTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonMobileMargin: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	primaryButtonMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Primary Button Margin */

	/** Start Primary Button Padding */
	primaryButtonPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	primaryButtonDesktopPadding: {
		type: 'object',
		default: {
			top: '12',
			bottom: '12',
			left: '24',
			right: '24',
		},
	},
	primaryButtonDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonTabletPadding: {
		type: 'object',
		default: {
			top: '12',
			bottom: '12',
			left: '24',
			right: '24',
		},
	},
	primaryButtonTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonMobilePadding: {
		type: 'object',
		default: {
			top: '8',
			bottom: '8',
			left: '16',
			right: '16',
		},
	},
	primaryButtonMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	primaryButtonPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Primary Button Padding */

	/** End Primary Button     */

	/** Start Secondary Button Typography */
	secondaryButtonFontFamily: {
		type: 'string',
		default: '',
	},
	secondaryButtonFontSize: {
		type: 'object',
		default: {
			Desktop: '16',
			Tablet: '16',
			Mobile: '14',
		},
	},
	secondaryButtonFontSizeUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	secondaryButtonFontWeight: {
		type: 'string',
		default: '',
	},
	secondaryButtonFontStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonTextTransform: {
		type: 'string',
		default: '',
	},
	secondaryButtonTextDecoration: {
		type: 'string',
		default: 'none',
	},
	secondaryButtonLineHeight: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	secondaryButtonLineHeightUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	secondaryButtonLetterSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	secondaryButtonLetterSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	secondaryButtonWordSpacing: {
		type: 'object',
		default: {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		},
	},
	secondaryButtonWordSpacingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	/** End Secondary Button Typography */

	/** Start Secondary Button Color */
	secondaryButtonColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	secondaryButtonColor: {
		type: 'string',
		default: '',
	},
	secondaryButtonColorHover: {
		type: 'string',
		default: '',
	},
	/** End Secondary Button Color */

	/** Start Secondary Button Background */
	secondaryButtonNormalBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	secondaryButtonNormalClassicColor: {
		type: 'string',
		default: '#d2d2d2c7',
	},
	secondaryButtonNormalGradientColor: {
		type: 'string',
		default: '',
	},
	secondaryButtonNormalCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	secondaryButtonNormalCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	secondaryButtonHoverBackgroundType: {
		type: 'string',
		default: 'classic',
	},
	secondaryButtonHoverClassicColor: {
		type: 'string',
		default: '#787878b8',
	},
	secondaryButtonHoverGradientColor: {
		type: 'string',
		default: '',
	},
	secondaryButtonHoverCustomGradientSwitcher: {
		type: 'boolean',
		default: false,
	},
	secondaryButtonHoverCustomGradientInputValue: {
		type: 'string',
		default: '',
	},
	/** End Secondary Button Background */

	/** Start Secondary Button Border */
	secondaryButtonBorder: {
		type: 'string',
		default: 'none',
	},
	secondaryButtonBorderColorSwitcher: {
		type: 'string',
		default: 'normal',
	},
	secondaryButtonBorderColor: {
		type: 'string',
		default: '',
	},
	secondaryButtonBorderHoverColor: {
		type: 'string',
		default: '',
	},
	secondaryButtonBorderUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	secondaryButtonDesktopBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	secondaryButtonDesktopBorderCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonTabletBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	secondaryButtonTabletBorderCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonMobileBorder: {
		type: 'object',
		default: {
			top: '',
			bottom: '',
			left: '',
			right: '',
		},
	},
	secondaryButtonMobileBorderCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonBorderLink: {
		type: 'boolean',
		default: true,
	},
	/** End Secondary Button Border */

	/** Start Secondary Button Border Radius */
	secondaryButtonBorderRadiusUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	secondaryButtonDesktopBorderRadius: {
		type: 'object',
		default: {
			top: '4',
			bottom: '4',
			left: '4',
			right: '4',
		},
	},
	secondaryButtonDesktopBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonTabletBorderRadius: {
		type: 'object',
		default: {
			top: '4',
			bottom: '4',
			left: '4',
			right: '4',
		},
	},
	secondaryButtonTabletBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonMobileBorderRadius: {
		type: 'object',
		default: {
			top: '4',
			bottom: '4',
			left: '4',
			right: '4',
		},
	},
	secondaryButtonMobileBorderRadiusCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonBorderRadiusLink: {
		type: 'boolean',
		default: true,
	},
	/** End Secondary Button Border Radius */

	/** Start Secondary Button Box Shadow */
	secondaryButtonBoxShadowValuesSwitcher: {
		type: 'string',
		default: 'normal',
	},
	secondaryButtonBoxShadowValues: {
		type: 'array',
		default: [],
	},
	secondaryButtonBoxShadowCssValue: {
		type: 'string',
		default: '',
	},
	secondaryButtonBoxShadowHoverValues: {
		type: 'array',
		default: [],
	},
	secondaryButtonBoxShadowHoverCssValue: {
		type: 'string',
		default: '',
	},
	/** End Secondary Button Box Shadow */

	/** Start Secondary Button Margin */
	secondaryButtonMarginUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	secondaryButtonDesktopMargin: {
		type: 'object',
		default: {
			top: '12',
			bottom: '0',
			left: '12',
			right: '0',
		},
	},
	secondaryButtonDesktopMarginCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonTabletMargin: {
		type: 'object',
		default: {
			top: '12',
			bottom: '0',
			left: '12',
			right: '0',
		},
	},
	secondaryButtonTabletMarginCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonMobileMargin: {
		type: 'object',
		default: {
			top: '12',
			bottom: '0',
			left: '0',
			right: '0',
		},
	},
	secondaryButtonMobileMarginCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonMarginLink: {
		type: 'boolean',
		default: true,
	},
	/** End Secondary Button Margin */

	/** Start Secondary Button Padding */
	secondaryButtonPaddingUnits: {
		type: 'object',
		default: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
	},
	secondaryButtonDesktopPadding: {
		type: 'object',
		default: {
			top: '12',
			bottom: '12',
			left: '24',
			right: '24',
		},
	},
	secondaryButtonDesktopPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonTabletPadding: {
		type: 'object',
		default: {
			top: '12',
			bottom: '12',
			left: '24',
			right: '24',
		},
	},
	secondaryButtonTabletPaddingCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonMobilePadding: {
		type: 'object',
		default: {
			top: '8',
			bottom: '8',
			left: '16',
			right: '16',
		},
	},
	secondaryButtonMobilePaddingCssStyle: {
		type: 'string',
		default: '',
	},
	secondaryButtonPaddingLink: {
		type: 'boolean',
		default: true,
	},
	/** End Secondary Button Padding */

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
