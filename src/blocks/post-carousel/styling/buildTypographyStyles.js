/**
 * Post Title and Excerpt CSS builders for the Post Carousel block.
 */

import { buildTitleColorStyles, buildTypographyCss } from './styleHelpers';

/**
 * Resolve margin-right value for the Post Title divider from alignment.
 *
 * @param {string} align Title alignment keyword.
 * @return {string} Margin value ('0' or 'auto').
 */
const getDividerMarginRight = ( align ) => {
	if ( align === 'center' ) {
		return 'auto';
	}
	return align === 'right' ? '0' : 'auto';
};

/**
 * Build Post Title hover underline animation CSS rules.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
const buildTitleUnderlineAnim = ( attributes, device ) => {
	const {
		blockId,
		enablePostTitleHoverUnderlineAnim,
		postTitleHoverUnderlineBottomOffset,
		postTitleHoverUnderlineHeight,
		postTitleHoverUnderlineColor,
		postTitleNormalClassicColor,
		postTitleHoverUnderlineTransitionSpeed,
	} = attributes;

	if ( ! enablePostTitleHoverUnderlineAnim ) {
		return '';
	}

	const bottomOffset =
		postTitleHoverUnderlineBottomOffset?.[ device ] || '-2';
	const height = postTitleHoverUnderlineHeight?.[ device ] || '2';
	const speed = postTitleHoverUnderlineTransitionSpeed?.[ device ] || '0.3';

	if ( device !== 'Desktop' ) {
		return `
            .${ blockId } .gslider-post-carousel-title .gslider-post-title-text::after {
                bottom: ${ bottomOffset }px !important;
                height: ${ height }px !important;
                transition: transform ${ speed }s ease-in-out !important;
            }
		`;
	}

	return `
        .${ blockId } .gslider-post-carousel-title .gslider-post-title-text {
            position: relative !important;
            display: inline-block;
        }
        .${ blockId } .gslider-post-carousel-title a {
            text-decoration: none !important;
        }
        .${ blockId } .gslider-post-carousel-title .gslider-post-title-text::after {
            content: '' !important;
            position: absolute !important;
            left: 0 !important;
            bottom: ${ bottomOffset }px !important;
            width: 100% !important;
            height: ${ height }px !important;
            background-color: ${
				postTitleHoverUnderlineColor ||
				postTitleNormalClassicColor ||
				'#333'
			} !important;
            transform: scaleX(0) !important;
            transform-origin: left !important;
            transition: transform ${ speed }s ease-in-out !important;
            pointer-events: none;
        }
        .${ blockId } .gslider-post-carousel-card:hover .gslider-post-carousel-title .gslider-post-title-text::after {
            transform: scaleX(1) !important;
        }
	`;
};

/**
 * Build Post Title divider pseudo-element CSS rules.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
const buildTitleDivider = ( attributes, device ) => {
	const {
		blockId,
		showPostTitleDivider,
		postTitleAlign,
		postTitleDividerWidth,
		postTitleDividerWidthUnits,
		postTitleDividerHeight,
		postTitleDividerHeightUnits,
		postTitleDividerStyle,
		postTitleDividerColor,
		postTitleDividerHoverColor,
		postTitleNormalCustomGradientSwitcher,
		postTitleNormalCustomGradientInputValue,
		postTitleNormalGradientColor,
		enablePostTitleDividerHoverExpand,
	} = attributes;

	if ( ! showPostTitleDivider ) {
		return '';
	}

	const align = postTitleAlign[ device ];
	const marginLeft = align === 'center' ? 'auto' : '0';
	const marginRight = getDividerMarginRight( align );
	const widthVal = `${ postTitleDividerWidth[ device ] }${ postTitleDividerWidthUnits[ device ] }`;
	const heightVal = `${ postTitleDividerHeight[ device ] }${ postTitleDividerHeightUnits[ device ] }`;

	if ( device !== 'Desktop' ) {
		const sizeRule =
			postTitleDividerStyle === 'gradient'
				? `height: ${ heightVal } !important;`
				: `border-bottom-width: ${ heightVal } !important;`;

		return `
            .${ blockId } .gslider-post-carousel-title-wrapper.has-divider::after {
                margin-left: ${ marginLeft } !important;
                margin-right: ${ marginRight } !important;
                width: ${ widthVal } !important;
                ${ sizeRule }
            }
		`;
	}

	const dividerBackground = postTitleNormalCustomGradientSwitcher
		? postTitleNormalCustomGradientInputValue
		: postTitleNormalGradientColor || 'linear-gradient(90deg, #333, #666)';

	const dividerStyleCss =
		postTitleDividerStyle === 'gradient'
			? `
                height: ${ heightVal } !important;
                background: ${ dividerBackground } !important;
                border: none !important;
            `
			: `border-bottom: ${ heightVal } ${ postTitleDividerStyle } ${ postTitleDividerColor } !important;`;

	return `
        .${ blockId } .gslider-post-carousel-title-wrapper.has-divider::after {
            content: '' !important;
            display: block !important;
            margin-top: 10px !important;
            margin-left: ${ marginLeft } !important;
            margin-right: ${ marginRight } !important;
            width: ${ widthVal } !important;
            height: 0 !important;
            ${ dividerStyleCss }
            transition: all 0.3s ease-in-out !important;
        }
        .${ blockId } .gslider-post-carousel-card:hover .gslider-post-carousel-title-wrapper.has-divider::after {
            ${
				postTitleDividerHoverColor &&
				postTitleDividerStyle !== 'gradient'
					? `border-color: ${ postTitleDividerHoverColor } !important;`
					: ''
			}
            ${
				enablePostTitleDividerHoverExpand
					? 'width: 100% !important;'
					: ''
			}
        }
	`;
};

/**
 * Build Post Title CSS rules for Desktop or Tablet/Mobile breakpoints.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildTitleStyles = ( attributes, device ) => {
	const { blockId, postTitleAlign } = attributes;
	const margin = attributes[ `postTitle${ device }MarginCssStyle` ];
	const padding = attributes[ `postTitle${ device }PaddingCssStyle` ];
	const isDesktop = device === 'Desktop';
	const normalColor = isDesktop
		? buildTitleColorStyles( attributes, 'Normal' )
		: '';
	const hoverColor = isDesktop
		? buildTitleColorStyles( attributes, 'Hover' )
		: '';

	return `
        .${ blockId } .gslider-post-carousel-title-wrapper .gslider-post-carousel-title {
            ${
				postTitleAlign?.[ device ]
					? `text-align: ${ postTitleAlign[ device ] };`
					: ''
			}
            ${ buildTypographyCss( attributes, 'postTitle', device ) }
            ${ normalColor }
            ${ margin ? `margin: ${ margin };` : '' }
            ${ padding ? `padding: ${ padding };` : '' }
            ${ isDesktop ? 'transition: all .3s ease-in-out;' : '' }
        }

        ${
			isDesktop
				? `
            .${ blockId } .gslider-post-carousel-title-wrapper .gslider-post-carousel-title a {
                ${ normalColor }
                transition: all .3s ease-in-out;
            }

            .${ blockId } .gslider-post-carousel-title-wrapper .gslider-post-carousel-title a:hover {
                ${ hoverColor }
            }
        `
				: ''
		}

        ${ buildTitleUnderlineAnim( attributes, device ) }
        ${ buildTitleDivider( attributes, device ) }
	`;
};

/**
 * Build Post Excerpt CSS rules for Desktop or Tablet/Mobile breakpoints.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildExcerptStyles = ( attributes, device ) => {
	const {
		blockId,
		postExcerptAlign,
		postExcerptColor,
		postExcerptColorHover,
		postExcerptLineClamp,
	} = attributes;

	const isDesktop = device === 'Desktop';
	const margin = attributes[ `postExcerpt${ device }MarginCssStyle` ];
	const padding = attributes[ `postExcerpt${ device }PaddingCssStyle` ];
	const lineClamp = postExcerptLineClamp?.[ device ]
		? `
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: ${ postExcerptLineClamp[ device ] };
        `
		: '';

	return `
        .${ blockId } .gslider-post-carousel-excerpt-wrapper .gslider-post-carousel-excerpt {
            ${
				postExcerptAlign?.[ device ]
					? `text-align: ${ postExcerptAlign[ device ] };`
					: ''
			}
            ${ buildTypographyCss( attributes, 'postExcerpt', device ) }
            ${
				isDesktop && postExcerptColor
					? `color: ${ postExcerptColor };`
					: ''
			}
            ${ margin ? `margin: ${ margin };` : '' }
            ${ padding ? `padding: ${ padding };` : '' }
            ${ lineClamp }
            ${ isDesktop ? 'transition: all .3s ease-in-out;' : '' }
        }

        ${
			isDesktop
				? `
            .${ blockId } .gslider-post-carousel-excerpt-wrapper .gslider-post-carousel-excerpt:hover {
                ${
					postExcerptColorHover
						? `color: ${ postExcerptColorHover };`
						: ''
				}
            }
        `
				: ''
		}
	`;
};
