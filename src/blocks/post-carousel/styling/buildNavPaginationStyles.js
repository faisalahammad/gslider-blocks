/**
 * Navigation Arrows and Pagination CSS builders for the Post Carousel block.
 */

import {
	buildGradientOrClassicBackground,
	buildNavArrowBorderRadius,
	buildTypographyCss,
} from './styleHelpers';

/**
 * Resolve outside-navigation padding rule for the block wrapper.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS rule string.
 */
const buildOutsideWrapperPadding = ( attributes, device ) => {
	const {
		blockId,
		navigationArrowPosition,
		navigationArrowPositionOutsidePadding,
		navigationArrowPositionOutsidePaddingUnits,
	} = attributes;

	const offsetVal = `${ navigationArrowPositionOutsidePadding[ device ] }${ navigationArrowPositionOutsidePaddingUnits[ device ] }`;
	let paddingRule = '';

	if (
		navigationArrowPosition === 'top-left' ||
		navigationArrowPosition === 'top-center' ||
		navigationArrowPosition === 'top-right'
	) {
		paddingRule = `padding: ${ offsetVal } 0 0;`;
	} else if (
		navigationArrowPosition === 'bottom-left' ||
		navigationArrowPosition === 'bottom-center' ||
		navigationArrowPosition === 'bottom-right'
	) {
		paddingRule = `padding: 0 0 ${ offsetVal };`;
	} else if ( navigationArrowPosition === 'center' ) {
		paddingRule = `padding: 0 ${ offsetVal };`;
	}

	return `
        .${ blockId }.gslider-post-carousel-wrapper.outside {
            ${ paddingRule }
        }
	`;
};

/**
 * Resolve positioning CSS declarations for non-center navigation arrow wrappers.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS coordinate declarations.
 */
const buildNavigationOffsets = ( attributes, device ) => {
	const {
		navigationArrowPosition,
		navigationArrowPositionTopOffset,
		navigationArrowPositionTopOffsetUnits,
		navigationArrowPositionLeftOffset,
		navigationArrowPositionLeftOffsetUnits,
		navigationArrowPositionRightOffset,
		navigationArrowPositionRightOffsetUnits,
		navigationArrowPositionBottomOffset,
		navigationArrowPositionBottomOffsetUnits,
	} = attributes;

	const topVal = navigationArrowPositionTopOffset[ device ]
		? `${ navigationArrowPositionTopOffset[ device ] }${ navigationArrowPositionTopOffsetUnits[ device ] }`
		: '0';
	const leftVal = navigationArrowPositionLeftOffset[ device ]
		? `${ navigationArrowPositionLeftOffset[ device ] }${ navigationArrowPositionLeftOffsetUnits[ device ] }`
		: '0';
	const leftCenterVal = navigationArrowPositionLeftOffset[ device ]
		? `${ navigationArrowPositionLeftOffset[ device ] }${ navigationArrowPositionLeftOffsetUnits[ device ] }`
		: '50%';
	const rightVal = navigationArrowPositionRightOffset[ device ]
		? `${ navigationArrowPositionRightOffset[ device ] }${ navigationArrowPositionRightOffsetUnits[ device ] }`
		: '0';
	const bottomVal = navigationArrowPositionBottomOffset[ device ]
		? `${ navigationArrowPositionBottomOffset[ device ] }${ navigationArrowPositionBottomOffsetUnits[ device ] }`
		: '0';

	switch ( navigationArrowPosition ) {
		case 'top-left':
			return `top: ${ topVal }; left: ${ leftVal };`;
		case 'top-center':
			return `top: ${ topVal }; left: ${ leftCenterVal }; transform: translateX(-50%);`;
		case 'top-right':
			return `top: ${ topVal }; right: ${ rightVal };`;
		case 'bottom-left':
			return `bottom: ${ bottomVal }; left: ${ leftVal };`;
		case 'bottom-center':
			return `bottom: ${ bottomVal }; left: ${ leftCenterVal }; transform: translateX(-50%);`;
		case 'bottom-right':
			return `bottom: ${ bottomVal }; right: ${ rightVal };`;
		default:
			return '';
	}
};

/**
 * Build Navigation CSS rules for Desktop or Tablet/Mobile breakpoints.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildNavigationStyles = ( attributes, device ) => {
	const {
		blockId,
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowDirection,
		navigationArrowGap,
		navigationArrowGapUnits,
		navigationArrowColor,
		navigationArrowColorHover,
		navigationArrowBorder,
		navigationArrowBorderColor,
		navigationArrowBorderHoverColor,
		navigationArrowBoxShadowCssValue,
		navigationArrowBoxShadowHoverCssValue,
		navigationArrowWidth,
		navigationArrowWidthUnits,
		navigationArrowHeight,
		navigationArrowHeightUnits,
		navigationArrowSize,
		navigationArrowSizeUnits,
	} = attributes;

	const isDesktop = device === 'Desktop';
	const wrapperSelector = `.${ blockId } .gslider-navigation-default-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition }, .${ blockId } .gslider-navigation-custom-icon-wrapper.${ navigationArrowPositionType }.${ navigationArrowPosition }`;
	const borderWidth =
		attributes[ `navigationArrow${ device }BorderCssStyle` ];
	const borderRadiusRule = buildNavArrowBorderRadius( attributes, device );
	const gapVal = navigationArrowGap[ device ]
		? `${ navigationArrowGap[ device ] }${ navigationArrowGapUnits[ device ] }`
		: '10px';

	const arrowWidth = navigationArrowWidth[ device ]
		? `width: ${ navigationArrowWidth[ device ] }${ navigationArrowWidthUnits[ device ] };`
		: '';
	const arrowHeight = navigationArrowHeight[ device ]
		? `height: ${ navigationArrowHeight[ device ] }${ navigationArrowHeightUnits[ device ] };`
		: '';
	const iconWidth = navigationArrowSize[ device ]
		? `width: ${ navigationArrowSize[ device ] }${ navigationArrowSizeUnits[ device ] };`
		: '';
	const iconHeight = navigationArrowSize[ device ]
		? `height: ${ navigationArrowSize[ device ] }${ navigationArrowSizeUnits[ device ] };`
		: '';
	const iconFontSize = navigationArrowSize[ device ]
		? `font-size: ${ navigationArrowSize[ device ] }${ navigationArrowSizeUnits[ device ] };`
		: '';

	if ( ! isDesktop ) {
		return `
            ${ buildOutsideWrapperPadding( attributes, device ) }

            ${
				navigationArrowPosition && navigationArrowPosition !== 'center'
					? `
                ${ wrapperSelector } {
                    gap: ${ gapVal };
                    ${ buildNavigationOffsets( attributes, device ) }
                }
            `
					: ''
			}

            .${ blockId } .swiper-button-prev,
            .${ blockId } .swiper-button-next {
                ${ borderWidth ? `border-width: ${ borderWidth };` : '' }
                ${ borderRadiusRule }
                ${ arrowWidth }
                ${ arrowHeight }
            }

            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${ iconWidth }
                ${ iconHeight }
            }

            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${ iconWidth }
                ${ iconHeight }
            }

            .${ blockId } .swiper-button-prev:after,
            .${ blockId } .swiper-button-next:after {
                ${ iconFontSize }
            }
		`;
	}

	const bgNormal = buildGradientOrClassicBackground(
		attributes,
		'navigationArrow',
		'Normal'
	);
	const bgHover = buildGradientOrClassicBackground(
		attributes,
		'navigationArrow',
		'Hover'
	);

	return `
        ${ buildOutsideWrapperPadding( attributes, 'Desktop' ) }

        ${ wrapperSelector } {
            z-index: 100 !important;
        }

        ${
			navigationArrowPosition && navigationArrowPosition !== 'center'
				? `
            ${ wrapperSelector } {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: ${ navigationArrowDirection };
                gap: ${ gapVal };
                position: absolute;
                z-index: 100;
                ${ buildNavigationOffsets( attributes, 'Desktop' ) }
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
            ${ bgNormal }
            ${
				navigationArrowBorder
					? `border: ${ navigationArrowBorder };`
					: ''
			}
            ${ borderWidth ? `border-width: ${ borderWidth };` : '' }
            ${ borderRadiusRule }
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
            ${ arrowWidth }
            ${ arrowHeight }
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            line-height: 1;
            cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            transition: all .3s ease-in-out;
        }
        .${ blockId } .swiper-button-prev:focus-visible,
        .${ blockId } .swiper-button-next:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }
        .${ blockId } .swiper-button-prev.swiper-button-disabled,
        .${ blockId } .swiper-button-next.swiper-button-disabled {
            cursor: default;
            opacity: 0.45;
        }
        .${ blockId } .swiper-button-prev:hover,
        .${ blockId } .swiper-button-next:hover {
            ${
				navigationArrowColorHover
					? `color: ${ navigationArrowColorHover };`
					: ''
			}
            ${ bgHover }
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
            ${ iconWidth }
            ${ iconHeight }
        }

        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
        .${ blockId } .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
            ${ iconWidth }
            ${ iconHeight }
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
            ${ iconFontSize }
        }
	`;
};

/**
 * Resolve `.swiper-pagination` position declaration based on pagination type.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS top or bottom declaration.
 */
const buildPaginationPositionRule = ( attributes, device ) => {
	const {
		paginationType,
		paginationProgressbarPosition,
		paginationProgressbarPositionUnits,
		paginationDotsPosition,
		paginationDotsPositionUnits,
	} = attributes;

	if ( paginationType === 'progressbar' ) {
		return paginationProgressbarPosition[ device ]
			? `top: ${ paginationProgressbarPosition[ device ] }${ paginationProgressbarPositionUnits[ device ] } !important;`
			: '';
	}

	return paginationDotsPosition[ device ]
		? `bottom: ${ paginationDotsPosition[ device ] }${ paginationDotsPositionUnits[ device ] } !important;`
		: '';
};

/**
 * Build Pagination CSS rules for Desktop or Tablet/Mobile breakpoints.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildPaginationStyles = ( attributes, device ) => {
	const {
		blockId,
		paginationPositionType,
		paginationOutsideOffset,
		paginationOutsideOffsetUnits,
		paginationNormalDotsBgColor,
		paginationNormalDotsBorder,
		paginationNormalDotsBorderColor,
		paginationNormalDotsWidth,
		paginationNormalDotsWidthUnits,
		paginationNormalDotsHeight,
		paginationNormalDotsHeightUnits,
		paginationActiveDotsBgColor,
		paginationActiveDotsBorder,
		paginationActiveDotsBorderColor,
		paginationActiveDotsWidth,
		paginationActiveDotsWidthUnits,
		paginationActiveDotsHeight,
		paginationActiveDotsHeightUnits,
		paginationFractionColor,
		paginationFractionColorHover,
		paginationProgressbarBGColor,
		paginationProgressbarBGActiveColor,
		paginationProgressbarHeight,
		paginationProgressbarHeightUnits,
	} = attributes;

	const isDesktop = device === 'Desktop';
	const dotsMargin = attributes[ `paginationDots${ device }MarginCssStyle` ];
	const normalBorderWidth =
		attributes[ `paginationNormalDots${ device }BorderCssStyle` ];
	const normalBorderRadius =
		attributes[ `paginationNormalDots${ device }BorderRadiusCssStyle` ];
	const activeBorderWidth =
		attributes[ `paginationActiveDots${ device }BorderCssStyle` ];
	const activeBorderRadius =
		attributes[ `paginationActiveDots${ device }BorderRadiusCssStyle` ];
	const outsideOffset = paginationOutsideOffset[ device ]
		? `${ paginationOutsideOffset[ device ] }${ paginationOutsideOffsetUnits[ device ] }`
		: '30px';

	const outsideBulletsRule = `
        .${ blockId }.gslider-post-carousel-wrapper .swiper-horizontal>.swiper-pagination-bullets,
        .${ blockId }.gslider-post-carousel-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
        .${ blockId }.gslider-post-carousel-wrapper .swiper-pagination-custom,
        .${ blockId }.gslider-post-carousel-wrapper .swiper-pagination-fraction {
            bottom: -${ outsideOffset } !important;
        }
	`;

	const hasPaginationRule = `
        .${ blockId }.gslider-post-carousel-wrapper.has-pagination {
            margin-bottom: ${ outsideOffset };
        }
	`;

	if ( ! isDesktop ) {
		return `
            .${ blockId } .swiper-pagination {
                ${ buildPaginationPositionRule( attributes, device ) }
                ${ dotsMargin ? `margin: ${ dotsMargin };` : '' }
            }

            .${ blockId } .swiper-pagination-bullet {
                ${
					normalBorderWidth
						? `border-width: ${ normalBorderWidth };`
						: ''
				}
                ${
					normalBorderRadius
						? `border-radius: ${ normalBorderRadius };`
						: ''
				}
                ${
					paginationNormalDotsWidth[ device ]
						? `width: ${ paginationNormalDotsWidth[ device ] }${ paginationNormalDotsWidthUnits[ device ] };`
						: ''
				}
                ${
					paginationNormalDotsHeight[ device ]
						? `height: ${ paginationNormalDotsHeight[ device ] }${ paginationNormalDotsHeightUnits[ device ] };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-bullet-active {
                ${
					activeBorderWidth
						? `border-width: ${ activeBorderWidth };`
						: ''
				}
                ${
					activeBorderRadius
						? `border-radius: ${ activeBorderRadius };`
						: ''
				}
                ${
					paginationActiveDotsWidth[ device ]
						? `width: ${ paginationActiveDotsWidth[ device ] }${ paginationActiveDotsWidthUnits[ device ] };`
						: ''
				}
                ${
					paginationActiveDotsHeight[ device ]
						? `height: ${ paginationActiveDotsHeight[ device ] }${ paginationActiveDotsHeightUnits[ device ] };`
						: ''
				}
            }

            .${ blockId } .swiper-pagination-fraction {
                ${ buildTypographyCss(
					attributes,
					'paginationFraction',
					device
				) }
            }

            .${ blockId } .swiper-pagination-progressbar {
                ${
					paginationProgressbarHeight[ device ]
						? `height: ${ paginationProgressbarHeight[ device ] }${ paginationProgressbarHeightUnits[ device ] };`
						: ''
				}
            }

            ${
				paginationPositionType === 'outside'
					? `
                ${ outsideBulletsRule }
                ${ hasPaginationRule }
            `
					: ''
			}
		`;
	}

	return `
        .${ blockId } .swiper-pagination {
            ${ buildPaginationPositionRule( attributes, 'Desktop' ) }
            ${ dotsMargin ? `margin: ${ dotsMargin };` : '' }
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
				normalBorderWidth ? `border-width: ${ normalBorderWidth };` : ''
			}
            ${
				normalBorderRadius
					? `border-radius: ${ normalBorderRadius };`
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
				activeBorderWidth ? `border-width: ${ activeBorderWidth };` : ''
			}
            ${
				activeBorderRadius
					? `border-radius: ${ activeBorderRadius };`
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

        .${ blockId } .swiper-pagination-fraction {
            ${ buildTypographyCss(
				attributes,
				'paginationFraction',
				'Desktop'
			) }
            ${
				paginationFractionColor
					? `color: ${ paginationFractionColor };`
					: ''
			}
            transition: all .3s ease-in-out;
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

        ${ paginationPositionType === 'outside' ? outsideBulletsRule : '' }

        ${ hasPaginationRule }
	`;
};
