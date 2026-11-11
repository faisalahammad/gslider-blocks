/**
 * Global wrapper and content-wrapper CSS builders for the Post Carousel block.
 */

import { buildBackgroundStyles } from './styleHelpers';

/**
 * Build desktop wrapper, wrapper:hover, and .swiper-slide CSS rules.
 *
 * @param {Object} attributes Block attributes.
 * @return {string} Desktop CSS string.
 */
export const buildGlobalDesktop = ( attributes ) => {
	const {
		blockId,
		globalMarginDesktopCssStyle,
		globalPaddingDesktopCssStyle,
		globalBorder,
		globalBorderDesktopCssStyle,
		globalBorderRadiusDesktopCssStyle,
		globalBorderColor,
		globalBorderHoverColor,
		globalBoxShadowCssValue,
		globalBoxShadowHoverCssValue,
		globalZIndex,
	} = attributes;

	const bgNormal = buildBackgroundStyles( attributes, 'global', 'Normal', {
		device: 'Desktop',
		withImage: true,
	} );
	const bgHover = buildBackgroundStyles( attributes, 'global', 'Hover', {
		device: 'Desktop',
		withImage: true,
	} );

	const isEqualHeight = attributes.equalHeight ?? true;

	return `
        .${ blockId }.gslider-post-carousel-wrapper {
            --gslider-autoplay-progress-color: ${
				attributes.autoplayProgressColor || '#007cba'
			};
            --gslider-autoplay-progress-height: ${
				attributes.autoplayProgressHeight || 4
			}px;
            --gslider-desktop-grid-columns: ${
				attributes.desktopGridColumns ?? 3
			};
            --gslider-desktop-grid-gap: ${ attributes.desktopGridGap ?? 24 }px;
            ${ bgNormal }
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
            transition: all .3s ease-in-out;
        }
        .${ blockId }.gslider-post-carousel-wrapper:hover {
            ${ bgHover }
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
            align-items: ${ isEqualHeight ? 'stretch' : 'center' };
            justify-content: center;
            ${ isEqualHeight ? 'height: auto;' : '' }
        }
	`;
};

/**
 * Build responsive wrapper CSS rules for Tablet or Mobile breakpoints.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint ('Tablet' or 'Mobile').
 * @return {string} Responsive CSS string.
 */
export const buildGlobalResponsive = ( attributes, device ) => {
	const { blockId, globalZIndex } = attributes;
	const margin = attributes[ `globalMargin${ device }CssStyle` ];
	const padding = attributes[ `globalPadding${ device }CssStyle` ];
	const borderWidth = attributes[ `globalBorder${ device }CssStyle` ];
	const borderRadius = attributes[ `globalBorderRadius${ device }CssStyle` ];

	const bgNormal = buildBackgroundStyles( attributes, 'global', 'Normal', {
		device,
		withImage: true,
	} );
	const bgHover = buildBackgroundStyles( attributes, 'global', 'Hover', {
		device,
		withImage: true,
	} );

	return `
        .${ blockId }.gslider-post-carousel-wrapper {
            ${ bgNormal }
            ${ margin ? `margin: ${ margin };` : '' }
            ${ padding ? `padding: ${ padding };` : '' }
            ${ borderWidth ? `border-width: ${ borderWidth };` : '' }
            ${ borderRadius ? `border-radius: ${ borderRadius };` : '' }
            ${
				globalZIndex[ device ]
					? `z-index: ${ globalZIndex[ device ] };`
					: ''
			}
        }
        .${ blockId }.gslider-post-carousel-wrapper:hover {
            ${ bgHover }
        }
	`;
};

/**
 * Build .gslider-post-carousel-content-wrapper CSS rules for any breakpoint.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildContentWrapperStyles = ( attributes, device ) => {
	const {
		blockId,
		layoutHeight,
		layoutHeightUnits,
		verticalAlign,
		equalHeight,
	} = attributes;
	const isEqualHeight = equalHeight ?? true;
	const hasLayoutHeight = Boolean( layoutHeight?.[ device ] );

	return `
        .${ blockId }.gslider-post-carousel-wrapper .gslider-post-carousel-content-wrapper {
            ${
				hasLayoutHeight
					? `height: ${ layoutHeight[ device ] }${ layoutHeightUnits[ device ] };`
					: ''
			}
            display: flex;
            align-items: ${ isEqualHeight ? 'stretch' : 'center' };
            justify-content: ${
				isEqualHeight
					? 'flex-start'
					: verticalAlign?.[ device ] || 'center'
			};
            ${ isEqualHeight ? 'width: 100%;' : '' }
            ${ isEqualHeight && ! hasLayoutHeight ? 'height: 100%;' : '' }
            ${ device === 'Desktop' ? 'transition: all .3s ease-in-out;' : '' }
        }
	`;
};
