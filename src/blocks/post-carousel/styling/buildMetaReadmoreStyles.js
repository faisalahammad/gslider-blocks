/**
 * Element visibility, Taxonomies, Author Meta, Date, and Read More CSS builders.
 */

import {
	buildBackgroundStyles,
	buildFlexJustify,
	buildGradientOrClassicBackground,
	buildReadMoreIconHoverTransform,
	buildTypographyCss,
} from './styleHelpers';

/**
 * Build responsive show/hide display rules for card elements.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildElementVisibilityStyles = ( attributes, device ) => {
	const {
		blockId,
		showPostTitle,
		showExcerpt,
		showMeta,
		showMetaAuthor,
		showMetaAvatar,
		showMetaDate,
	} = attributes;

	return `
        .${ blockId } .gslider-post-carousel-title-wrapper {
            display: ${ showPostTitle?.[ device ] ? 'block' : 'none' };
        }

        .${ blockId } .gslider-post-carousel-excerpt-wrapper {
            display: ${ showExcerpt?.[ device ] ? 'block' : 'none' };
        }

        .${ blockId } .gslider-post-carousel-meta {
            display: ${ showMeta?.[ device ] ? 'flex' : 'none' };
        }

        .${ blockId } .gslider-post-carousel-meta .gslider-post-author-wrapper {
            display: ${ showMetaAuthor?.[ device ] ?? true ? 'flex' : 'none' };
        }

        .${ blockId } .gslider-post-carousel-meta .gslider-post-author-wrapper .gslider-post-author-avatar-wrapper {
            display: ${ showMetaAvatar?.[ device ] ?? true ? 'flex' : 'none' };
        }

        .${ blockId } .gslider-post-carousel-meta .gslider-post-date-wrapper {
            display: ${ showMetaDate?.[ device ] ?? true ? 'flex' : 'none' };
        }
	`;
};

/**
 * Build shared CSS rules for taxonomy badge containers and chips (categories or tags).
 *
 * @param {Object} attributes Block attributes.
 * @param {string} prefix     Attribute prefix ('postCategory' or 'postTag').
 * @param {string} className  Target container class ('gslider-post-carousel-categories' or 'gslider-post-carousel-tags').
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildTaxonomyStyles = (
	attributes,
	prefix,
	className,
	device
) => {
	const { blockId, showTaxonomy } = attributes;
	const isDesktop = device === 'Desktop';
	const align = attributes[ `${ prefix }Align` ]?.[ device ];
	const gap = attributes[ `${ prefix }Gap` ]?.[ device ];
	const gapUnit = attributes[ `${ prefix }GapUnits` ]?.[ device ];
	const margin = attributes[ `${ prefix }${ device }MarginCssStyle` ];
	const padding = attributes[ `${ prefix }${ device }PaddingCssStyle` ];
	const itemPadding =
		attributes[ `${ prefix }Item${ device }PaddingCssStyle` ];
	const borderWidth = attributes[ `${ prefix }Border${ device }CssStyle` ];
	const borderRadius =
		attributes[ `${ prefix }BorderRadius${ device }CssStyle` ];

	if ( ! isDesktop ) {
		return `
            .${ blockId } .${ className } {
                display: ${ showTaxonomy?.[ device ] ? 'flex' : 'none' };
                ${ buildFlexJustify( align ) }
                ${ gap ? `gap: ${ gap }${ gapUnit };` : '' }
                ${ margin ? `margin: ${ margin };` : '' }
                ${ padding ? `padding: ${ padding };` : '' }
            }

            .${ blockId } .${ className } span {
                ${ buildTypographyCss( attributes, prefix, device ) }
                ${ itemPadding ? `padding: ${ itemPadding };` : '' }
                ${ borderWidth ? `border-width: ${ borderWidth };` : '' }
                ${
					borderRadius
						? `border-radius: ${ borderRadius } !important;`
						: ''
				}
            }
		`;
	}

	const bgNormal = buildBackgroundStyles( attributes, prefix, 'Normal' );
	const bgHover = buildBackgroundStyles( attributes, prefix, 'Hover' );
	const color = attributes[ `${ prefix }Color` ];
	const colorHover = attributes[ `${ prefix }ColorHover` ];
	const border = attributes[ `${ prefix }Border` ];
	const borderColor = attributes[ `${ prefix }BorderColor` ];
	const borderHoverColor = attributes[ `${ prefix }BorderHoverColor` ];
	const boxShadow = attributes[ `${ prefix }BoxShadowCssValue` ];
	const boxShadowHover = attributes[ `${ prefix }BoxShadowHoverCssValue` ];

	return `
        .${ blockId } .${ className } {
            display: ${ showTaxonomy?.Desktop ? 'flex' : 'none' };
            flex-wrap: wrap;
            ${ buildFlexJustify( align ) }
            ${ gap ? `gap: ${ gap }${ gapUnit };` : '' }
            ${ margin ? `margin: ${ margin };` : '' }
            ${ padding ? `padding: ${ padding };` : '' }
        }

        .${ blockId } .${ className } span {
            ${ bgNormal }
            ${ color ? `color: ${ color };` : '' }
            ${ buildTypographyCss( attributes, prefix, 'Desktop' ) }
            ${ itemPadding ? `padding: ${ itemPadding };` : '' }
            ${ border ? `border: ${ border };` : '' }
            ${ borderWidth ? `border-width: ${ borderWidth };` : '' }
            ${
				borderRadius
					? `border-radius: ${ borderRadius } !important;`
					: ''
			}
            ${ borderColor ? `border-color: ${ borderColor };` : '' }
            ${ boxShadow ? `box-shadow: ${ boxShadow } !important;` : '' }
            display: inline-flex;
            align-items: center;
            transition: all .3s ease-in-out;
        }

        .${ blockId } .${ className } span:hover {
            ${ bgHover }
            ${ colorHover ? `color: ${ colorHover };` : '' }
            ${ borderHoverColor ? `border-color: ${ borderHoverColor };` : '' }
            ${
				boxShadowHover
					? `box-shadow: ${ boxShadowHover } !important;`
					: ''
			}
        }

        .${ blockId } .${ className } span a {
            ${ color ? `color: ${ color };` : '' }
            transition: all .3s ease-in-out;
            text-decoration: none;
        }

        .${ blockId } .${ className } span:hover a {
            ${ colorHover ? `color: ${ colorHover };` : '' }
        }
	`;
};

/**
 * Build Author Avatar image CSS rules.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildAuthorImageStyles = ( attributes, device ) => {
	const {
		blockId,
		authorImageSize,
		authorImageSizeUnits,
		authorImageBorder,
		authorImageBorderColor,
		authorImageBorderHoverColor,
	} = attributes;

	const isDesktop = device === 'Desktop';
	const size = authorImageSize?.[ device ];
	const sizeUnit = authorImageSizeUnits?.[ device ] || 'px';
	const borderWidth =
		attributes[ `authorImage${ device }BorderWidthCssStyle` ];
	const borderRadius =
		attributes[ `authorImage${ device }BorderRadiusCssStyle` ];
	const margin = attributes[ `authorImage${ device }MarginCssStyle` ];
	const padding = attributes[ `authorImage${ device }PaddingCssStyle` ];

	if ( ! isDesktop ) {
		return `
            .${ blockId } .gslider-post-carousel-meta .gslider-post-author-wrapper .gslider-post-author-avatar-wrapper {
                ${ size ? `width: ${ size }${ sizeUnit };` : '' }
                ${ size ? `height: ${ size }${ sizeUnit };` : '' }
                ${ borderWidth ? `border-width: ${ borderWidth };` : '' }
                ${ borderRadius ? `border-radius: ${ borderRadius };` : '' }
                ${ margin ? `margin: ${ margin };` : '' }
                ${ padding ? `padding: ${ padding };` : '' }
            }
		`;
	}

	return `
        .${ blockId } .gslider-post-carousel-meta .gslider-post-author-wrapper .gslider-post-author-avatar-wrapper {
            ${ size ? `width: ${ size }${ sizeUnit };` : '' }
            ${ size ? `height: ${ size }${ sizeUnit };` : '' }
            ${
				authorImageBorder !== 'none'
					? `border-style: ${ authorImageBorder };`
					: ''
			}
            ${ borderWidth ? `border-width: ${ borderWidth };` : '' }
            ${
				authorImageBorderColor
					? `border-color: ${ authorImageBorderColor };`
					: ''
			}
            ${ borderRadius ? `border-radius: ${ borderRadius };` : '' }
            ${ margin ? `margin: ${ margin };` : '' }
            ${ padding ? `padding: ${ padding };` : '' }
            overflow: hidden;
            transition: all 0.3s ease-in-out;
        }
        .${ blockId } .gslider-post-carousel-meta .gslider-post-author-wrapper .gslider-post-author-avatar {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .${ blockId } .gslider-post-carousel-meta .gslider-post-author-wrapper:hover .gslider-post-author-avatar-wrapper {
            ${
				authorImageBorderHoverColor
					? `border-color: ${ authorImageBorderHoverColor };`
					: ''
			}
        }
	`;
};

/**
 * Build Author Name CSS rules.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildAuthorNameStyles = ( attributes, device ) => {
	const { blockId, authorNameColor, authorNameColorHover } = attributes;
	const isDesktop = device === 'Desktop';
	const margin = attributes[ `authorName${ device }MarginCssStyle` ];
	const padding = attributes[ `authorName${ device }PaddingCssStyle` ];

	return `
        .${ blockId } .gslider-post-carousel-meta .gslider-post-author-wrapper .gslider-post-author {
            ${ buildTypographyCss( attributes, 'authorName', device ) }
            ${
				isDesktop && authorNameColor
					? `color: ${ authorNameColor };`
					: ''
			}
            ${ margin ? `margin: ${ margin };` : '' }
            ${ padding ? `padding: ${ padding };` : '' }
            ${ isDesktop ? 'transition: all 0.3s ease-in-out;' : '' }
        }
        ${
			isDesktop
				? `
            .${ blockId } .gslider-post-carousel-meta .gslider-post-author-wrapper:hover .gslider-post-author {
                ${
					authorNameColorHover
						? `color: ${ authorNameColorHover };`
						: ''
				}
            }
        `
				: ''
		}
	`;
};

/**
 * Build Post Date CSS rules.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildPostDateStyles = ( attributes, device ) => {
	const { blockId, postDateColor, postDateColorHover } = attributes;
	const isDesktop = device === 'Desktop';
	const margin = attributes[ `postDate${ device }MarginCssStyle` ];
	const padding = attributes[ `postDate${ device }PaddingCssStyle` ];

	return `
        .${ blockId } .gslider-post-carousel-meta .gslider-post-date-wrapper {
            ${ margin ? `margin: ${ margin };` : '' }
            ${ padding ? `padding: ${ padding };` : '' }
            ${ isDesktop ? 'transition: all 0.3s ease-in-out;' : '' }
        }
        .${ blockId } .gslider-post-carousel-meta .gslider-post-date-wrapper .gslider-post-date {
            ${ buildTypographyCss( attributes, 'postDate', device ) }
            ${ isDesktop && postDateColor ? `color: ${ postDateColor };` : '' }
            ${ isDesktop ? 'transition: all 0.3s ease-in-out;' : '' }
        }
        ${
			isDesktop && postDateColorHover
				? `
            .${ blockId } .gslider-post-carousel-meta .gslider-post-date-wrapper:hover .gslider-post-date {
                color: ${ postDateColorHover };
            }
        `
				: ''
		}
	`;
};

/**
 * Resolve Read More button hover transform/animation declaration on Desktop.
 *
 * @param {string} animation Active hover animation key.
 * @return {string} CSS rule declaration.
 */
const buildReadMoreHoverAnimRule = ( animation ) => {
	switch ( animation ) {
		case 'grow':
			return 'transform: scale(1.05);';
		case 'shrink':
			return 'transform: scale(0.95);';
		case 'float':
			return 'transform: translateY(-5px);';
		case 'shift-right':
			return 'transform: translateX(6px);';
		case 'pulse':
			return 'animation: gsliderPulse 1s infinite ease-in-out;';
		default:
			return '';
	}
};

/**
 * Build Read More Button and Icon CSS rules.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS string.
 */
export const buildReadMoreStyles = ( attributes, device ) => {
	const {
		blockId,
		showReadMoreButton,
		readMoreButtonAlign,
		readMoreButtonColor,
		readMoreButtonColorHover,
		readMoreButtonBorder,
		readMoreButtonBorderColor,
		readMoreButtonBorderHoverColor,
		readMoreButtonBoxShadowCssValue,
		readMoreButtonBoxShadowHoverCssValue,
		readMoreButtonWidth,
		readMoreButtonHoverAnimation,
		readMoreButtonIconGap,
		readMoreButtonIconGapUnits,
		readMoreButtonIconWidth,
		readMoreButtonIconWidthUnits,
		readMoreButtonIconHeight,
		readMoreButtonIconHeightUnits,
		readMoreButtonIconSize,
		readMoreButtonIconSizeUnits,
		readMoreButtonIconBorder,
		readMoreButtonIconBorderColor,
		readMoreButtonIconBorderHoverColor,
		readMoreButtonIconBoxShadowCssValue,
		readMoreButtonIconBoxShadowHoverCssValue,
		readMoreButtonIconRotation,
		readMoreButtonIconColor,
		readMoreButtonIconColorHover,
	} = attributes;

	const isDesktop = device === 'Desktop';
	const btnMargin = attributes[ `readMoreButton${ device }MarginCssStyle` ];
	const btnBorderWidth =
		attributes[ `readMoreButton${ device }BorderCssStyle` ];
	const btnBorderRadius =
		attributes[ `readMoreButton${ device }BorderRadiusCssStyle` ];
	const btnPadding = attributes[ `readMoreButton${ device }PaddingCssStyle` ];

	const iconBorderWidth =
		attributes[ `readMoreButtonIcon${ device }BorderCssStyle` ];
	const iconBorderRadius =
		attributes[ `readMoreButtonIcon${ device }BorderRadiusCssStyle` ];
	const iconGap = readMoreButtonIconGap?.[ device ]
		? `gap: ${ readMoreButtonIconGap[ device ] }${ readMoreButtonIconGapUnits[ device ] };`
		: '';
	const iconWidth = readMoreButtonIconWidth[ device ]
		? `width: ${ readMoreButtonIconWidth[ device ] }${ readMoreButtonIconWidthUnits[ device ] };`
		: '';
	const iconHeight = readMoreButtonIconHeight[ device ]
		? `height: ${ readMoreButtonIconHeight[ device ] }${ readMoreButtonIconHeightUnits[ device ] };`
		: '';
	const iconSizeWidth = readMoreButtonIconSize[ device ]
		? `width: ${ readMoreButtonIconSize[ device ] }${ readMoreButtonIconSizeUnits[ device ] };`
		: '';
	const iconSizeHeight = readMoreButtonIconSize[ device ]
		? `height: ${ readMoreButtonIconSize[ device ] }${ readMoreButtonIconSizeUnits[ device ] };`
		: '';
	const iconRotation = readMoreButtonIconRotation?.[ device ]
		? `transform: rotate(${ readMoreButtonIconRotation[ device ] }deg);`
		: '';
	const hoverTransform = buildReadMoreIconHoverTransform(
		attributes,
		device
	);

	if ( ! isDesktop ) {
		return `
            .${ blockId } .gslider-post-carousel-readmore {
                display: ${ showReadMoreButton?.[ device ] ? 'block' : 'none' };
                ${ btnMargin ? `margin: ${ btnMargin };` : '' }
                ${
					readMoreButtonAlign?.[ device ]
						? `text-align: ${ readMoreButtonAlign[ device ] };`
						: ''
				}
            }

            .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn {
                ${ buildTypographyCss( attributes, 'readMoreButton', device ) }
                ${ btnBorderWidth ? `border-width: ${ btnBorderWidth };` : '' }
                ${
					btnBorderRadius
						? `border-radius: ${ btnBorderRadius };`
						: ''
				}
                ${ btnPadding ? `padding: ${ btnPadding };` : '' }
                ${ iconGap }
            }

            .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap {
                ${ iconWidth }
                ${ iconHeight }
                ${
					iconBorderWidth ? `border-width: ${ iconBorderWidth };` : ''
				}
                ${
					iconBorderRadius
						? `border-radius: ${ iconBorderRadius };`
						: ''
				}
                ${ iconRotation }
            }

            .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:hover .gslider-readmore-icon-wrap {
                ${ hoverTransform ? `transform: ${ hoverTransform };` : '' }
            }

            .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap svg {
                ${ iconSizeWidth }
                ${ iconSizeHeight }
            }

            .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap img {
                ${ iconSizeWidth }
                ${ iconSizeHeight }
            }
		`;
	}

	const btnBgNormal = buildGradientOrClassicBackground(
		attributes,
		'readMoreButton',
		'Normal'
	);
	const btnBgHover = buildGradientOrClassicBackground(
		attributes,
		'readMoreButton',
		'Hover'
	);
	const iconBgNormal = buildGradientOrClassicBackground(
		attributes,
		'readMoreButtonIcon',
		'Normal'
	);
	const iconBgHover = buildGradientOrClassicBackground(
		attributes,
		'readMoreButtonIcon',
		'Hover'
	);

	return `
        .${ blockId } .gslider-post-carousel-readmore {
            display: ${ showReadMoreButton?.Desktop ? 'block' : 'none' };
            ${ btnMargin ? `margin: ${ btnMargin };` : '' }
            ${
				readMoreButtonAlign?.Desktop
					? `text-align: ${ readMoreButtonAlign.Desktop };`
					: ''
			}
        }

        .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn {
            ${ buildTypographyCss(
				attributes,
				'readMoreButton',
				'Desktop',
				true
			) }
            ${ readMoreButtonColor ? `color: ${ readMoreButtonColor };` : '' }
            ${ btnBgNormal }
            ${
				readMoreButtonBorder ? `border: ${ readMoreButtonBorder };` : ''
			}
            ${
				readMoreButtonBorderColor
					? `border-color: ${ readMoreButtonBorderColor };`
					: ''
			}
            ${ btnBorderWidth ? `border-width: ${ btnBorderWidth };` : '' }
            ${ btnBorderRadius ? `border-radius: ${ btnBorderRadius };` : '' }
            ${
				readMoreButtonBoxShadowCssValue
					? `box-shadow: ${ readMoreButtonBoxShadowCssValue };`
					: ''
			}
            ${ btnPadding ? `padding: ${ btnPadding };` : '' }
            ${
				readMoreButtonWidth === 'full'
					? 'display: flex; width: 100%;'
					: 'display: inline-flex;'
			}
            align-items: center;
            justify-content: center;
            ${ iconGap }
            position: relative;
            overflow: hidden;
            transition: all .3s ease-in-out;
        }

        .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:hover {
            ${
				readMoreButtonColorHover
					? `color: ${ readMoreButtonColorHover };`
					: ''
			}
            ${ btnBgHover }
            ${
				readMoreButtonBorderHoverColor
					? `border-color: ${ readMoreButtonBorderHoverColor };`
					: ''
			}
            ${
				readMoreButtonBoxShadowHoverCssValue
					? `box-shadow: ${ readMoreButtonBoxShadowHoverCssValue };`
					: ''
			}
            ${ buildReadMoreHoverAnimRule( readMoreButtonHoverAnimation ) }
        }

        ${
			readMoreButtonHoverAnimation === 'shimmer'
				? `
        .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: none;
        }
        .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:hover::after {
            left: 100%;
            transition: all 0.6s ease-in-out;
        }
        `
				: ''
		}

        .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:focus {
            outline: none;
            box-shadow: none;
        }

        .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            ${ iconWidth }
            ${ iconHeight }
            ${
				readMoreButtonIconBorder
					? `border: ${ readMoreButtonIconBorder };`
					: ''
			}
            ${
				readMoreButtonIconBorderColor
					? `border-color: ${ readMoreButtonIconBorderColor };`
					: ''
			}
            ${ iconBorderWidth ? `border-width: ${ iconBorderWidth };` : '' }
            ${ iconBorderRadius ? `border-radius: ${ iconBorderRadius };` : '' }
            ${
				readMoreButtonIconBoxShadowCssValue
					? `box-shadow: ${ readMoreButtonIconBoxShadowCssValue };`
					: ''
			}
            ${ iconBgNormal }
            ${ iconRotation }
            transition: all .3s ease-in-out;
        }

        .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:hover .gslider-readmore-icon-wrap {
            ${
				readMoreButtonIconBorderHoverColor
					? `border-color: ${ readMoreButtonIconBorderHoverColor };`
					: ''
			}
            ${
				readMoreButtonIconBoxShadowHoverCssValue
					? `box-shadow: ${ readMoreButtonIconBoxShadowHoverCssValue };`
					: ''
			}
            ${ iconBgHover }
            ${ hoverTransform ? `transform: ${ hoverTransform };` : '' }
        }

        .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap svg {
            ${
				readMoreButtonIconColor
					? `fill: ${ readMoreButtonIconColor };`
					: ''
			}
            ${
				readMoreButtonIconColor
					? `stroke: ${ readMoreButtonIconColor };`
					: ''
			}
            ${ iconSizeWidth }
            ${ iconSizeHeight }
            transition: all .3s ease-in-out;
        }

        .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:hover .gslider-readmore-icon-wrap svg {
            ${
				readMoreButtonIconColorHover
					? `fill: ${ readMoreButtonIconColorHover };`
					: ''
			}
            ${
				readMoreButtonIconColorHover
					? `stroke: ${ readMoreButtonIconColorHover };`
					: ''
			}
        }

        .${ blockId } .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap img {
            ${ iconSizeWidth }
            ${ iconSizeHeight }
            transition: all .3s ease-in-out;
        }
	`;
};
