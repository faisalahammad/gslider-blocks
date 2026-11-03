/* eslint-disable jsdoc/require-param, jsdoc/check-tag-names */
/**
 * Flexi Content Item Block - Style Generation
 * Returns Dynamic Generated CSS
 */

/**
 * Generate block styles from attributes
 * @param {Object} attributes - Block attributes
 * @returns {string} CSS string
 */
const generateFlexiContentItemStyle = ( attributes ) => {
	const {
		blockId,

		/** Start slider Item Background */
		sliderItemNormalBackgroundType,
		sliderItemNormalClassicColor,
		sliderItemNormalGradientColor,
		sliderItemNormalCustomGradientSwitcher,
		sliderItemNormalCustomGradientInputValue,
		sliderItemNormalBackgroundImageUrl,
		sliderItemNormalBackgroundImagePosition,
		sliderItemNormalBackgroundImageAttachment,
		sliderItemNormalBackgroundImageRepeat,
		sliderItemNormalBackgroundImageSize,

		sliderItemHoverBackgroundType,
		sliderItemHoverClassicColor,
		sliderItemHoverGradientColor,
		sliderItemHoverCustomGradientSwitcher,
		sliderItemHoverCustomGradientInputValue,
		sliderItemHoverBackgroundImageUrl,
		sliderItemHoverBackgroundImagePosition,
		sliderItemHoverBackgroundImageAttachment,
		sliderItemHoverBackgroundImageRepeat,
		sliderItemHoverBackgroundImageSize,
		/** End slider Item Background */
	} = attributes;

	/**
	 * Get slider item background normal styles
	 */
	const getSliderItemBackgroundNormalStyles = ( device ) => {
		const bgType = sliderItemNormalBackgroundType;
		const bgColor = sliderItemNormalClassicColor;
		const bgGradient = sliderItemNormalGradientColor;
		const customGradient = sliderItemNormalCustomGradientInputValue;
		const customGradientEnabled = sliderItemNormalCustomGradientSwitcher;

		const bgImageUrl = sliderItemNormalBackgroundImageUrl?.[ device ];
		const bgImagePosition =
			sliderItemNormalBackgroundImagePosition?.[ device ];
		const bgAttachment =
			sliderItemNormalBackgroundImageAttachment?.[ device ];
		const bgRepeat = sliderItemNormalBackgroundImageRepeat?.[ device ];
		const bgSize = sliderItemNormalBackgroundImageSize?.[ device ];

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
	 * Get slider item background hover styles
	 */
	const getSliderItemBackgroundHoverStyles = ( device ) => {
		const bgType = sliderItemHoverBackgroundType;
		const bgColor = sliderItemHoverClassicColor;
		const bgGradient = sliderItemHoverGradientColor;
		const customGradient = sliderItemHoverCustomGradientInputValue;
		const customGradientEnabled = sliderItemHoverCustomGradientSwitcher;

		const bgImageUrl = sliderItemHoverBackgroundImageUrl?.[ device ];
		const bgImagePosition =
			sliderItemHoverBackgroundImagePosition?.[ device ];
		const bgAttachment =
			sliderItemHoverBackgroundImageAttachment?.[ device ];
		const bgRepeat = sliderItemHoverBackgroundImageRepeat?.[ device ];
		const bgSize = sliderItemHoverBackgroundImageSize?.[ device ];

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
	const sliderItemBackgroundStyleObjectToString = ( styleObj ) =>
		Object.entries( styleObj )
			.map( ( [ key, value ] ) => `${ key }: ${ value };` )
			.join( ' ' );

	/**
	 * Get slider item background styles
	 */
	const sliderItemDesktopBackgroundNormalStyles =
		sliderItemBackgroundStyleObjectToString(
			getSliderItemBackgroundNormalStyles( 'Desktop' )
		);
	const sliderItemTabletBackgroundNormalStyles =
		sliderItemBackgroundStyleObjectToString(
			getSliderItemBackgroundNormalStyles( 'Tablet' )
		);
	const sliderItemMobileBackgroundNormalStyles =
		sliderItemBackgroundStyleObjectToString(
			getSliderItemBackgroundNormalStyles( 'Mobile' )
		);

	const sliderItemDesktopBackgroundHoverStyles =
		sliderItemBackgroundStyleObjectToString(
			getSliderItemBackgroundHoverStyles( 'Desktop' )
		);
	const sliderItemTabletBackgroundHoverStyles =
		sliderItemBackgroundStyleObjectToString(
			getSliderItemBackgroundHoverStyles( 'Tablet' )
		);
	const sliderItemMobileBackgroundHoverStyles =
		sliderItemBackgroundStyleObjectToString(
			getSliderItemBackgroundHoverStyles( 'Mobile' )
		);

	/** Start All Block Style */
	const flexiContentItemCSS = `
        .${ blockId }.flexi-content-item {
            ${ sliderItemDesktopBackgroundNormalStyles }
            box-sizing: border-box;
            position: relative;
            transition: background 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
        }
        .${ blockId }.flexi-content-item:hover {
            ${ sliderItemDesktopBackgroundHoverStyles }
            box-sizing: border-box;
            position: relative;
        }

        @media only screen and (max-width: 1024px) {

            .${ blockId }.flexi-content-item {
                ${ sliderItemTabletBackgroundNormalStyles }
            }
            .${ blockId }.flexi-content-item:hover {
                ${ sliderItemTabletBackgroundHoverStyles }
            }
        }
        
        @media only screen and (max-width: 767px) {

            .${ blockId }.flexi-content-item {
                ${ sliderItemMobileBackgroundNormalStyles }
            }
            .${ blockId }.flexi-content-item:hover {
                ${ sliderItemMobileBackgroundHoverStyles }
            }
        }
    `;
	/** End All Block Style */

	return `${ flexiContentItemCSS }`.replace( /\s+/g, ' ' ).trim();
};

export default generateFlexiContentItemStyle;
