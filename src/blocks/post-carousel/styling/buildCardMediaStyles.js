/**
 * Post Card and Featured Image CSS builders for the Post Carousel block.
 */

import {
	buildBackgroundStyles,
	buildBadgeOverlayPositionStyles,
	buildPostCardBackgroundStyles,
} from './styleHelpers';

/**
 * Check whether the active layout renders the featured image as a full-bleed
 * background (`position: absolute; inset: 0`) inside the card.
 *
 * @param {string} postLayoutMode Active post layout archetype slug.
 * @return {boolean} True for `overlay` and `hero` layouts.
 */
const isFullBleedImageLayout = ( postLayoutMode ) =>
	postLayoutMode === 'overlay' || postLayoutMode === 'hero';

/**
 * Build image wrapper positioning rules for image hover pseudo-element effects
 * without overriding full-bleed `position: absolute` layouts.
 *
 * @param {string}  blockId            Scoped block identifier.
 * @param {string}  postLayoutMode     Active post layout archetype slug.
 * @param {boolean} withOverflowHidden Whether to append `overflow: hidden;`.
 * @return {string} Scoped CSS rule or empty string when unnecessary.
 */
const getHoverEffectImageWrapperRule = (
	blockId,
	postLayoutMode,
	withOverflowHidden
) => {
	const declarations = [];
	if ( ! isFullBleedImageLayout( postLayoutMode ) ) {
		declarations.push( 'position: relative;' );
	}
	if ( withOverflowHidden ) {
		declarations.push( 'overflow: hidden;' );
	}
	return declarations.length > 0
		? `.${ blockId } .gslider-post-carousel-image { ${ declarations.join(
				' '
		  ) } }`
		: '';
};

/**
 * Build Desktop card hover preset CSS rules.
 *
 * @param {Object} attributes Block attributes.
 * @return {string} CSS string for active hover animation preset.
 */
const buildCardHoverPreset = ( attributes ) => {
	const { blockId, cardHoverAnimation, cardHoverAnimationDuration } =
		attributes;

	switch ( cardHoverAnimation ) {
		case 'lift':
			return `
                .${ blockId } .gslider-post-carousel-card:hover {
                    transform: translateY(var(--card-hover-lift));
                    box-shadow: 0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08) !important;
                }
            `;
		case 'zoom':
			return `
                .${ blockId } .gslider-post-carousel-card:hover {
                    transform: scale(var(--card-hover-scale));
                }
            `;
		case 'lift-zoom':
			return `
                .${ blockId } .gslider-post-carousel-card:hover {
                    transform: translateY(var(--card-hover-lift)) scale(var(--card-hover-scale));
                    box-shadow: 0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08) !important;
                }
            `;
		case 'pop':
			return `
                .${ blockId } .gslider-post-carousel-card:hover {
                    animation: gsliderPop ${
						cardHoverAnimationDuration?.Desktop || 300
					}ms ease-in-out;
                }
            `;
		case 'shadow-depth':
			return `
                .${ blockId } .gslider-post-carousel-card {
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    background-color: var(--wp--preset--color--background, #ffffff);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
                }
                .${ blockId } .gslider-post-carousel-card:hover {
                    transform: translateY(var(--card-hover-lift));
                    box-shadow: 0 20px 25px -5px var(--card-hover-shadow-color), 0 10px 10px -5px var(--card-hover-shadow-color) !important;
                }
            `;
		case 'border-glow':
			return `
                .${ blockId } .gslider-post-carousel-card {
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    background-color: var(--wp--preset--color--background, #ffffff);
                    box-shadow: none;
                }
                .${ blockId } .gslider-post-carousel-card:hover {
                    border-color: var(--card-hover-glow-color) !important;
                    box-shadow: 0 0 var(--card-hover-glow-size) var(--card-hover-glow-color) !important;
                }
            `;
		default:
			return '';
	}
};

/**
 * Build Desktop Post Card CSS rules.
 *
 * @param {Object} attributes Block attributes.
 * @return {string} Desktop CSS string.
 */
export const buildCardDesktop = ( attributes ) => {
	const {
		blockId,
		equalHeight,
		postLayoutMode = 'classic',
		heroHeightDesktop = 520,
		heroHeightTablet = 420,
		heroHeightMobile = 340,
		spotlightScaleSide = 0.92,
		spotlightOpacitySide = 0.65,
		newsroomMainWidth = 65,
		horizontalMediaWidth = 45,
		overlayGradientScrim,
		overlayScrimHeight = 75,
		timelineStemColor = '#e2e8f0',
		timelineStemThickness = 2,
		timelineDotSize = 16,
		timelineDotColor = '#007cba',
		postCardMarginDesktopCssStyle,
		postCardPaddingDesktopCssStyle,
		postCardBorder,
		postCardBorderDesktopCssStyle,
		postCardBorderColor,
		postCardBorderHoverColor,
		postCardBorderRadiusDesktopCssStyle,
		postCardBoxShadowCssValue,
		postCardBoxShadowHoverCssValue,
		cardHoverAnimationDuration,
		cardHoverLift,
		cardHoverScale,
		cardHoverPopScale,
		cardHoverShadowColor,
		cardHoverGlowColor,
		cardHoverGlowSize,
	} = attributes;

	const isEqualHeight = equalHeight ?? true;
	const isHorizontalLayout = postLayoutMode === 'horizontal';
	const safeMediaWidth = Math.min(
		60,
		Math.max( 30, parseInt( horizontalMediaWidth, 10 ) || 45 )
	);
	const safeScrimHeight = Math.min(
		100,
		Math.max( 40, parseInt( overlayScrimHeight, 10 ) || 75 )
	);
	const safeHeroHeightDesktop = Math.min(
		1200,
		Math.max( 200, parseInt( heroHeightDesktop, 10 ) || 520 )
	);
	const safeHeroHeightTablet = Math.min(
		1200,
		Math.max( 200, parseInt( heroHeightTablet, 10 ) || 420 )
	);
	const safeHeroHeightMobile = Math.min(
		1200,
		Math.max( 200, parseInt( heroHeightMobile, 10 ) || 340 )
	);
	const safeNewsroomMainWidth = Math.min(
		80,
		Math.max( 50, parseInt( newsroomMainWidth, 10 ) || 65 )
	);
	const safeStemThickness = Math.min(
		10,
		Math.max( 1, parseInt( timelineStemThickness, 10 ) || 2 )
	);
	const safeDotSize = Math.min(
		48,
		Math.max( 8, parseInt( timelineDotSize, 10 ) || 16 )
	);
	const sanitizeTimelineColor = ( val, fallback ) => {
		if ( typeof val !== 'string' || val.trim() === '' ) {
			return fallback;
		}
		const cleaned = val.trim();
		if ( /[;{}<>"'\\]|url\(|expression\(/i.test( cleaned ) ) {
			return fallback;
		}
		return cleaned;
	};
	const safeStemColor = sanitizeTimelineColor( timelineStemColor, '#e2e8f0' );
	const safeDotColor = sanitizeTimelineColor( timelineDotColor, '#007cba' );
	const rawSpotlightScale = parseFloat( spotlightScaleSide );
	const safeSpotlightScale = Number(
		Math.min(
			0.98,
			Math.max(
				0.8,
				Number.isNaN( rawSpotlightScale ) ? 0.92 : rawSpotlightScale
			)
		).toFixed( 2 )
	);
	const rawSpotlightOpacity = parseFloat( spotlightOpacitySide );
	const safeSpotlightOpacity = Number(
		Math.min(
			1.0,
			Math.max(
				0.3,
				Number.isNaN( rawSpotlightOpacity ) ? 0.65 : rawSpotlightOpacity
			)
		).toFixed( 2 )
	);
	const defaultScrim =
		'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)';
	const strippedScrim =
		typeof overlayGradientScrim === 'string'
			? overlayGradientScrim.replace( /[;{}<>]/g, '' ).trim()
			: '';
	const safeOverlayScrim =
		strippedScrim !== '' ? strippedScrim : defaultScrim;
	const normalBg = buildPostCardBackgroundStyles( attributes, 'Normal' );
	const hoverBg = buildPostCardBackgroundStyles( attributes, 'Hover' );
	const duration = cardHoverAnimationDuration?.Desktop || 300;

	return `
        .${ blockId }.gslider-post-carousel-wrapper {
            --gslider-hero-height-desktop: ${ safeHeroHeightDesktop }px;
            --gslider-hero-height-tablet: ${ safeHeroHeightTablet }px;
            --gslider-hero-height-mobile: ${ safeHeroHeightMobile }px;
            --gslider-spotlight-scale: ${ safeSpotlightScale };
            --gslider-spotlight-opacity: ${ safeSpotlightOpacity };
            --gslider-newsroom-main-width: ${ safeNewsroomMainWidth }%;
            --gslider-timeline-stem-color: ${ safeStemColor };
            --gslider-timeline-stem-thickness: ${ safeStemThickness }px;
            --gslider-timeline-dot-size: ${ safeDotSize }px;
            --gslider-timeline-dot-color: ${ safeDotColor };
        }

        .${ blockId } .gslider-post-carousel-card {
            display: ${ isHorizontalLayout ? 'grid' : 'flex' };
            ${ ! isHorizontalLayout ? 'flex-direction: column;' : '' }
            height: ${ isEqualHeight ? '100%' : 'auto' };
            width: 100%;
            box-sizing: border-box;
            --gslider-media-width: ${ safeMediaWidth }%;
            --gslider-overlay-scrim: ${ safeOverlayScrim };
            --gslider-overlay-scrim-height: ${ safeScrimHeight }%;
            ${ normalBg }
            ${
				postCardMarginDesktopCssStyle
					? `margin: ${ postCardMarginDesktopCssStyle };`
					: ''
			}
            ${
				postCardPaddingDesktopCssStyle
					? `padding: ${ postCardPaddingDesktopCssStyle };`
					: ''
			}
            ${ postCardBorder ? `border-style: ${ postCardBorder };` : '' }
            ${
				postCardBorderDesktopCssStyle
					? `border-width: ${ postCardBorderDesktopCssStyle };`
					: ''
			}
            ${
				postCardBorderColor
					? `border-color: ${ postCardBorderColor };`
					: ''
			}
            ${
				postCardBorderRadiusDesktopCssStyle
					? `border-radius: ${ postCardBorderRadiusDesktopCssStyle } !important;`
					: ''
			}
            ${
				postCardBoxShadowCssValue
					? `box-shadow: ${ postCardBoxShadowCssValue } !important;`
					: ''
			}
            transition: all 0.3s ease, transform ${ duration }ms ease-out, box-shadow ${ duration }ms ease-out, border-color ${ duration }ms ease-out;
            will-change: transform, box-shadow;
            --card-hover-lift: -${ cardHoverLift?.Desktop ?? 8 }px;
            --card-hover-scale: ${ cardHoverScale?.Desktop ?? 1.03 };
            --card-hover-pop-scale: ${ cardHoverPopScale?.Desktop ?? 1.06 };
            --card-hover-shadow-color: ${
				cardHoverShadowColor || 'rgba(0, 0, 0, 0.25)'
			};
            --card-hover-glow-color: ${
				cardHoverGlowColor || 'rgba(0, 122, 255, 0.5)'
			};
            --card-hover-glow-size: ${ cardHoverGlowSize?.Desktop ?? 15 }px;
        }

        .${ blockId } .gslider-post-carousel-card:hover {
            ${ hoverBg }
            ${
				postCardBorderHoverColor
					? `border-color: ${ postCardBorderHoverColor } !important;`
					: ''
			}
            ${
				postCardBoxShadowHoverCssValue
					? `box-shadow: ${ postCardBoxShadowHoverCssValue } !important;`
					: ''
			}
        }

        ${ buildCardHoverPreset( attributes ) }
	`;
};

/**
 * Build responsive Post Card CSS rules for Tablet or Mobile breakpoints.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint ('Tablet' or 'Mobile').
 * @return {string} Responsive CSS string.
 */
export const buildCardResponsive = ( attributes, device ) => {
	const {
		blockId,
		cardHoverLift,
		cardHoverScale,
		cardHoverPopScale,
		cardHoverGlowSize,
		cardHoverAnimationDuration,
	} = attributes;

	const margin = attributes[ `postCardMargin${ device }CssStyle` ];
	const padding = attributes[ `postCardPadding${ device }CssStyle` ];
	const borderWidth = attributes[ `postCardBorder${ device }CssStyle` ];
	const borderRadius =
		attributes[ `postCardBorderRadius${ device }CssStyle` ];
	const duration = cardHoverAnimationDuration?.[ device ] || 300;

	return `
        .${ blockId } .gslider-post-carousel-card {
            ${ margin ? `margin: ${ margin };` : '' }
            ${ padding ? `padding: ${ padding };` : '' }
            ${ borderWidth ? `border-width: ${ borderWidth };` : '' }
            ${
				borderRadius
					? `border-radius: ${ borderRadius } !important;`
					: ''
			}
            --card-hover-lift: -${ cardHoverLift?.[ device ] ?? 8 }px;
            --card-hover-scale: ${ cardHoverScale?.[ device ] ?? 1.03 };
            --card-hover-pop-scale: ${ cardHoverPopScale?.[ device ] ?? 1.06 };
            --card-hover-glow-size: ${ cardHoverGlowSize?.[ device ] ?? 15 }px;
            transition: transform ${ duration }ms ease-out, box-shadow ${ duration }ms ease-out, border-color ${ duration }ms ease-out;
        }
	`;
};

/**
 * Build Desktop featured image container, badge overlay, and hover rules.
 *
 * @param {Object} attributes Block attributes.
 * @return {string} Desktop CSS string.
 */
export const buildImageWrapperDesktop = ( attributes ) => {
	const {
		blockId,
		postLayoutMode = 'classic',
		imageHeight,
		imageHeightUnits,
		imageMarginDesktopCssStyle,
		imagePaddingDesktopCssStyle,
		imageBorder,
		imageBorderDesktopCssStyle,
		imageBorderRadiusDesktopCssStyle,
		imageBorderColor,
		imageBoxShadowCssValue,
		showFeaturedImage,
		imageTransitionDuration,
		enableTaxonomyBadgeOverlay,
		taxonomyBadgeOverlayVisibility,
		taxonomyBadgeOverlayPosition,
		postCategoryGap,
		postCategoryGapUnits,
		imageBorderHoverColor,
		imageBoxShadowHoverCssValue,
	} = attributes;

	const imageBgNormal = buildBackgroundStyles(
		attributes,
		'image',
		'Normal'
	);
	const imageBgHover = buildBackgroundStyles( attributes, 'image', 'Hover' );
	const isBadgeHover = taxonomyBadgeOverlayVisibility === 'hover';
	const badgeHoverTransformValue = (
		taxonomyBadgeOverlayPosition || 'top-left'
	).startsWith( 'bottom' )
		? 'translateY(5px)'
		: 'translateY(-5px)';
	const transitionMs = imageTransitionDuration?.Desktop || 300;

	return `
        .${ blockId } .gslider-post-carousel-image {
            ${ imageBgNormal }
            ${
				imageHeight.Desktop
					? `height: ${ imageHeight.Desktop }${ imageHeightUnits.Desktop } !important;`
					: ''
			}
            ${
				imageMarginDesktopCssStyle
					? `margin: ${ imageMarginDesktopCssStyle };`
					: ''
			}
            ${
				imagePaddingDesktopCssStyle
					? `padding: ${ imagePaddingDesktopCssStyle };`
					: ''
			}
            ${ imageBorder ? `border: ${ imageBorder };` : '' }
            ${
				imageBorderDesktopCssStyle
					? `border-width: ${ imageBorderDesktopCssStyle };`
					: ''
			}
            ${
				imageBorderRadiusDesktopCssStyle
					? `border-radius: ${ imageBorderRadiusDesktopCssStyle } !important;`
					: ''
			}
            ${ imageBorderColor ? `border-color: ${ imageBorderColor };` : '' }
            ${
				imageBoxShadowCssValue
					? `box-shadow: ${ imageBoxShadowCssValue } !important;`
					: ''
			}
            display: ${ showFeaturedImage?.Desktop ? 'block' : 'none' };
            overflow: hidden;
            transition: all ${ transitionMs }ms ease-in-out;
        }

        ${
			enableTaxonomyBadgeOverlay
				? `
        ${
			! isFullBleedImageLayout( postLayoutMode )
				? `.${ blockId } .gslider-post-carousel-image {
            position: relative !important;
        }`
				: ''
		}
        .${ blockId } .gslider-taxonomy-badge-overlay {
            position: absolute !important;
            z-index: 10 !important;
            display: flex !important;
            flex-wrap: wrap !important;
            gap: ${ postCategoryGap?.Desktop ?? 5 }${
				postCategoryGapUnits?.Desktop ?? 'px'
			} !important;
            pointer-events: none !important;
            transition: opacity ${ transitionMs }ms ease, transform ${ transitionMs }ms ease !important;
            ${ buildBadgeOverlayPositionStyles( attributes, 'Desktop' ) }
            ${
				isBadgeHover
					? `opacity: 0 !important; transform: ${ badgeHoverTransformValue } !important;`
					: 'opacity: 1 !important; transform: translateY(0) !important;'
			}
        }
        .${ blockId } .gslider-taxonomy-badge-overlay a,
        .${ blockId } .gslider-taxonomy-badge-overlay span {
            pointer-events: auto !important;
        }
        ${
			isBadgeHover
				? `
        .${ blockId } .gslider-post-carousel-card:hover .gslider-taxonomy-badge-overlay {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        `
				: ''
		}
        `
				: ''
		}

        .${ blockId } .gslider-post-carousel-image:hover,
        .${ blockId } .gslider-post-carousel-card.is-clickable:hover .gslider-post-carousel-image {
            ${ imageBgHover }
            ${
				imageBorderHoverColor
					? `border-color: ${ imageBorderHoverColor };`
					: ''
			}
            ${
				imageBoxShadowHoverCssValue
					? `box-shadow: ${ imageBoxShadowHoverCssValue } !important;`
					: ''
			}
        }
	`;
};

/**
 * Build responsive badge overlay rules for Tablet or Mobile breakpoints.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint ('Tablet' or 'Mobile').
 * @return {string} Responsive CSS string.
 */
export const buildBadgeOverlayResponsive = ( attributes, device ) => {
	const {
		blockId,
		enableTaxonomyBadgeOverlay,
		postCategoryGap,
		postCategoryGapUnits,
		imageTransitionDuration,
	} = attributes;

	if ( ! enableTaxonomyBadgeOverlay ) {
		return '';
	}

	const duration = imageTransitionDuration?.[ device ] || 300;

	return `
        .${ blockId } .gslider-taxonomy-badge-overlay {
            ${ buildBadgeOverlayPositionStyles( attributes, device ) }
            gap: ${ postCategoryGap?.[ device ] ?? 5 }${
				postCategoryGapUnits?.[ device ] ?? 'px'
			} !important;
            transition: opacity ${ duration }ms ease, transform ${ duration }ms ease !important;
        }
	`;
};

/**
 * Build responsive featured image container rules for Tablet or Mobile breakpoints.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint ('Tablet' or 'Mobile').
 * @return {string} Responsive CSS string.
 */
export const buildImageWrapperResponsive = ( attributes, device ) => {
	const { blockId, showFeaturedImage, imageHeight, imageHeightUnits } =
		attributes;
	const margin = attributes[ `imageMargin${ device }CssStyle` ];
	const padding = attributes[ `imagePadding${ device }CssStyle` ];
	const borderWidth = attributes[ `imageBorder${ device }CssStyle` ];
	const borderRadius = attributes[ `imageBorderRadius${ device }CssStyle` ];

	return `
        .${ blockId } .gslider-post-carousel-image {
            display: ${ showFeaturedImage?.[ device ] ? 'block' : 'none' };
            ${
				imageHeight[ device ]
					? `height: ${ imageHeight[ device ] }${ imageHeightUnits[ device ] } !important;`
					: ''
			}
            ${ margin ? `margin: ${ margin };` : '' }
            ${ padding ? `padding: ${ padding };` : '' }
            ${ borderWidth ? `border-width: ${ borderWidth };` : '' }
            ${
				borderRadius
					? `border-radius: ${ borderRadius } !important;`
					: ''
			}
        }
	`;
};

/**
 * Build Desktop featured image tag rules and hover effect pseudo-elements.
 *
 * @param {Object} attributes Block attributes.
 * @return {string} Desktop CSS string.
 */
export const buildImageTagDesktop = ( attributes ) => {
	const {
		blockId,
		postLayoutMode = 'classic',
		imageMaxWidth,
		imageMaxWidthUnits,
		imageObjectFit,
		imageObjectPosition,
		imageTransitionDuration,
		imageHoverOpacity,
		imageHoverScale,
		imageHoverLift,
		imageHoverLiftUnits,
		imageHoverBlur,
		imageHoverRotate,
		imageHoverGrayscale,
		imageHoverPan,
		imageHoverEffect,
	} = attributes;

	const isScaleHover =
		imageHoverEffect === 'scale' ||
		imageHoverEffect === 'zoom-in' ||
		imageHoverEffect === 'both';
	const isGrayscaleHover =
		imageHoverEffect === 'grayscale' ||
		imageHoverEffect === 'grayscale-to-color';
	const isBlurClearHover =
		imageHoverEffect === 'blur-to-clear' ||
		imageHoverEffect === 'blur-clear';

	return `
        .${ blockId } .gslider-post-carousel-image img,
        .${ blockId } .gslider-post-carousel-image .gslider-post-carousel-placeholder-svg {
            ${
				imageMaxWidth.Desktop
					? `max-width: ${ imageMaxWidth.Desktop }${ imageMaxWidthUnits.Desktop } !important;`
					: ''
			}
            height: 100% !important;
            ${
				imageObjectFit
					? `object-fit: ${ imageObjectFit } !important;`
					: ''
			}
            ${
				imageObjectPosition
					? `object-position: ${ imageObjectPosition } !important;`
					: ''
			}
            display: block;
            width: 100%;
            will-change: transform;
            transition: all ${
				imageTransitionDuration?.Desktop || 300
			}ms ease-in-out;
            --hover-opacity: ${ imageHoverOpacity?.Desktop || 0.8 };
            --hover-scale: ${ imageHoverScale?.Desktop || 1.05 };
            --hover-lift: ${ imageHoverLift?.Desktop || 10 }${
				imageHoverLiftUnits?.Desktop || 'px'
			};
            --hover-blur: ${ imageHoverBlur?.Desktop ?? 4 }px;
            --hover-rotate: ${ imageHoverRotate?.Desktop ?? 3 }deg;
            --hover-grayscale: ${ imageHoverGrayscale?.Desktop ?? 100 }%;
            --hover-pan: ${ imageHoverPan?.Desktop ?? 5 }%;
            ${
				isGrayscaleHover
					? 'filter: grayscale(var(--hover-grayscale));'
					: ''
			}
            ${ isBlurClearHover ? 'filter: blur(var(--hover-blur));' : '' }
            ${
				imageHoverEffect === 'zoom-out'
					? 'transform: scale(var(--hover-scale));'
					: ''
			}
            ${
				imageHoverEffect === 'pan-left'
					? 'transform-origin: right center;'
					: ''
			}
            ${
				imageHoverEffect === 'pan-right'
					? 'transform-origin: left center;'
					: ''
			}
        }

        .${ blockId } .gslider-post-carousel-image:hover img,
        .${ blockId } .gslider-post-carousel-image:hover .gslider-post-carousel-placeholder-svg,
        .${ blockId } .gslider-post-carousel-card.is-clickable:hover .gslider-post-carousel-image img,
        .${ blockId } .gslider-post-carousel-card.is-clickable:hover .gslider-post-carousel-image .gslider-post-carousel-placeholder-svg {
            ${
				imageHoverEffect === 'opacity' || imageHoverEffect === 'both'
					? 'opacity: var(--hover-opacity);'
					: ''
			}
            ${ isScaleHover ? 'transform: scale(var(--hover-scale));' : '' }
            ${
				imageHoverEffect === 'zoom-rotate'
					? 'transform: scale(var(--hover-scale)) rotate(var(--hover-rotate));'
					: ''
			}
            ${ imageHoverEffect === 'zoom-out' ? 'transform: scale(1);' : '' }
            ${
				imageHoverEffect === 'move-up'
					? 'transform: translateY(calc(-1 * var(--hover-lift)));'
					: ''
			}
            ${ isGrayscaleHover ? 'filter: grayscale(0);' : '' }
            ${ isBlurClearHover ? 'filter: blur(0);' : '' }
            ${
				imageHoverEffect === 'pan-left'
					? 'transform: scale(var(--hover-scale)) translateX(calc(-1 * var(--hover-pan)));'
					: ''
			}
            ${
				imageHoverEffect === 'pan-right'
					? 'transform: scale(var(--hover-scale)) translateX(var(--hover-pan));'
					: ''
			}
        }

        ${
			imageHoverEffect === 'shine-sweep'
				? `
            ${ getHoverEffectImageWrapperRule( blockId, postLayoutMode, true ) }
            .${ blockId } .gslider-post-carousel-image::after {
                content: '';
                position: absolute;
                top: 0; left: -100%;
                width: 60%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transform: skewX(-20deg);
                pointer-events: none;
                transition: left ${
					imageTransitionDuration?.Desktop || 600
				}ms ease;
            }
            .${ blockId } .gslider-post-carousel-card:hover .gslider-post-carousel-image::after {
                left: 150%;
            }
        `
				: ''
		}

        ${
			imageHoverEffect === 'overlay-fade'
				? `
            ${ getHoverEffectImageWrapperRule(
				blockId,
				postLayoutMode,
				false
			) }
            .${ blockId } .gslider-post-carousel-image::before {
                content: '';
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.4);
                opacity: 0;
                pointer-events: none;
                transition: opacity ${
					imageTransitionDuration?.Desktop || 300
				}ms ease;
                z-index: 1;
            }
            .${ blockId } .gslider-post-carousel-card:hover .gslider-post-carousel-image::before {
                opacity: 1;
            }
        `
				: ''
		}

        ${
			imageHoverEffect === 'overlay-slide'
				? `
            ${ getHoverEffectImageWrapperRule( blockId, postLayoutMode, true ) }
            .${ blockId } .gslider-post-carousel-image::before {
                content: '';
                position: absolute;
                bottom: -100%; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.4);
                pointer-events: none;
                transition: bottom ${
					imageTransitionDuration?.Desktop || 300
				}ms ease;
                z-index: 1;
            }
            .${ blockId } .gslider-post-carousel-card:hover .gslider-post-carousel-image::before {
                bottom: 0;
            }
        `
				: ''
		}
	`;
};

/**
 * Build responsive featured image tag rules for Tablet or Mobile breakpoints.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint ('Tablet' or 'Mobile').
 * @return {string} Responsive CSS string.
 */
export const buildImageTagResponsive = ( attributes, device ) => {
	const {
		blockId,
		imageMaxWidth,
		imageMaxWidthUnits,
		imageHoverOpacity,
		imageHoverScale,
		imageHoverLift,
		imageHoverLiftUnits,
		imageHoverBlur,
		imageHoverRotate,
		imageHoverGrayscale,
		imageHoverPan,
	} = attributes;

	return `
        .${ blockId } .gslider-post-carousel-image img,
        .${ blockId } .gslider-post-carousel-image .gslider-post-carousel-placeholder-svg {
            ${
				imageMaxWidth[ device ]
					? `max-width: ${ imageMaxWidth[ device ] }${ imageMaxWidthUnits[ device ] } !important;`
					: ''
			}
            height: 100% !important;
            --hover-opacity: ${ imageHoverOpacity?.[ device ] || 0.8 };
            --hover-scale: ${ imageHoverScale?.[ device ] || 1.05 };
            --hover-lift: ${ imageHoverLift?.[ device ] || 10 }${
				imageHoverLiftUnits?.[ device ] || 'px'
			};
            --hover-blur: ${ imageHoverBlur?.[ device ] ?? 4 }px;
            --hover-rotate: ${ imageHoverRotate?.[ device ] ?? 3 }deg;
            --hover-grayscale: ${ imageHoverGrayscale?.[ device ] ?? 100 }%;
            --hover-pan: ${ imageHoverPan?.[ device ] ?? 5 }%;
        }
	`;
};
