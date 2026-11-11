/**
 * Shared CSS builder helpers for the Post Carousel block.
 */

/**
 * Convert an attribute style map into a CSS declaration string.
 *
 * @param {Object} styleObj Key-value CSS property map.
 * @return {string} Serialized CSS declaration list.
 */
export const styleObjectToString = ( styleObj ) =>
	Object.entries( styleObj )
		.map( ( [ key, value ] ) => `${ key }: ${ value };` )
		.join( ' ' );

/**
 * Build background style declarations for classic or gradient modes, optionally with responsive background images.
 *
 * @param {Object}  attributes          Block attributes.
 * @param {string}  prefix              Attribute prefix (e.g. 'global', 'image', 'postCategory', 'postTag').
 * @param {string}  state               State suffix ('Normal' or 'Hover').
 * @param {Object}  [options]           Optional flags.
 * @param {string}  [options.device]    Responsive breakpoint ('Desktop', 'Tablet', 'Mobile').
 * @param {boolean} [options.withImage] Include background-image rules when not gradient.
 * @return {string} CSS declaration string.
 */
export const buildBackgroundStyles = (
	attributes,
	prefix,
	state = 'Normal',
	{ device = 'Desktop', withImage = false } = {}
) => {
	const bgType = attributes[ `${ prefix }${ state }BackgroundType` ];
	const bgColor = attributes[ `${ prefix }${ state }ClassicColor` ];
	const bgGradient = attributes[ `${ prefix }${ state }GradientColor` ];
	const customGradient =
		attributes[ `${ prefix }${ state }CustomGradientInputValue` ];
	const customGradientEnabled =
		attributes[ `${ prefix }${ state }CustomGradientSwitcher` ];

	if ( bgType === 'gradient' ) {
		if ( customGradientEnabled && customGradient ) {
			return styleObjectToString( { background: customGradient } );
		}
		if ( bgGradient ) {
			return styleObjectToString( { background: bgGradient } );
		}
		if ( bgColor ) {
			return styleObjectToString( { background: bgColor } );
		}
		return '';
	}

	let styles = bgColor ? { background: bgColor } : {};

	if ( withImage ) {
		const bgImageUrl =
			attributes[ `${ prefix }${ state }BackgroundImageUrl` ]?.[ device ];
		const bgImagePosition =
			attributes[ `${ prefix }${ state }BackgroundImagePosition` ]?.[
				device
			];
		const bgAttachment =
			attributes[ `${ prefix }${ state }BackgroundImageAttachment` ]?.[
				device
			];
		const bgRepeat =
			attributes[ `${ prefix }${ state }BackgroundImageRepeat` ]?.[
				device
			];
		const bgSize =
			attributes[ `${ prefix }${ state }BackgroundImageSize` ]?.[
				device
			];

		if ( bgImageUrl ) {
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
	}

	return styleObjectToString( styles );
};

/**
 * Build important background CSS for Post Card (no classic fallback inside gradient branch).
 *
 * @param {Object} attributes Block attributes.
 * @param {string} state      State suffix ('Normal' or 'Hover').
 * @return {string} CSS declaration string.
 */
export const buildPostCardBackgroundStyles = (
	attributes,
	state = 'Normal'
) => {
	const bgType = attributes[ `postCard${ state }BackgroundType` ];
	const bgColor = attributes[ `postCard${ state }ClassicColor` ];
	const bgGradient = attributes[ `postCard${ state }GradientColor` ];
	const customGradient =
		attributes[ `postCard${ state }CustomGradientInputValue` ];
	const customGradientEnabled =
		attributes[ `postCard${ state }CustomGradientSwitcher` ];

	if ( bgType === 'gradient' ) {
		if ( customGradientEnabled && customGradient ) {
			return `background: ${ customGradient } !important;`;
		}
		if ( bgGradient ) {
			return `background: ${ bgGradient } !important;`;
		}
		return '';
	}

	return bgColor ? `background: ${ bgColor } !important;` : '';
};

/**
 * Build inline classic/gradient background declaration used by buttons and navigation arrows.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} prefix     Attribute prefix.
 * @param {string} state      State suffix ('Normal' or 'Hover').
 * @return {string} CSS declaration string.
 */
export const buildGradientOrClassicBackground = (
	attributes,
	prefix,
	state = 'Normal'
) => {
	const bgType = attributes[ `${ prefix }${ state }BackgroundType` ];
	const bgColor = attributes[ `${ prefix }${ state }ClassicColor` ];
	const bgGradient = attributes[ `${ prefix }${ state }GradientColor` ];
	const customGradient =
		attributes[ `${ prefix }${ state }CustomGradientInputValue` ];
	const customGradientEnabled =
		attributes[ `${ prefix }${ state }CustomGradientSwitcher` ];

	if ( bgType === 'gradient' ) {
		let resolved = bgColor;
		if ( customGradientEnabled && customGradient ) {
			resolved = customGradient;
		} else if ( bgGradient ) {
			resolved = bgGradient;
		}
		return `background: ${ resolved };`;
	}

	return bgColor ? `background: ${ bgColor };` : '';
};

/**
 * Build gradient-text or solid-color CSS declarations for the Post Title.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} state      State suffix ('Normal' or 'Hover').
 * @return {string} CSS declaration string.
 */
export const buildTitleColorStyles = ( attributes, state = 'Normal' ) => {
	const bgType = attributes[ `postTitle${ state }BackgroundType` ];
	const bgColor = attributes[ `postTitle${ state }ClassicColor` ];
	const bgGradient = attributes[ `postTitle${ state }GradientColor` ];
	const customGradient =
		attributes[ `postTitle${ state }CustomGradientInputValue` ];
	const customGradientEnabled =
		attributes[ `postTitle${ state }CustomGradientSwitcher` ];

	if ( bgType === 'gradient' ) {
		const grad = customGradientEnabled ? customGradient : bgGradient;
		return grad
			? `
                background: ${ grad } !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                display: inline-block;
            `
			: '';
	}

	return bgColor
		? `
            color: ${ bgColor } !important;
            background: none !important;
            -webkit-text-fill-color: initial !important;
        `
		: '';
};

/**
 * Resolve responsive typography CSS declarations for a given attribute prefix.
 *
 * @param {Object}  attributes                      Block attributes.
 * @param {string}  prefix                          Typography attribute prefix.
 * @param {string}  [device='Desktop']              Target device breakpoint.
 * @param {boolean} [textDecorationImportant=false] Append !important to text-decoration.
 * @return {string} CSS declaration string.
 */
export const buildTypographyCss = (
	attributes,
	prefix,
	device = 'Desktop',
	textDecorationImportant = false
) => {
	const fontFamily = attributes[ `${ prefix }FontFamily` ];
	const fontSize = attributes[ `${ prefix }FontSize` ]?.[ device ];
	const fontSizeUnit = attributes[ `${ prefix }FontSizeUnits` ]?.[ device ];
	const fontWeight = attributes[ `${ prefix }FontWeight` ];
	const fontStyle = attributes[ `${ prefix }FontStyle` ];
	const textTransform = attributes[ `${ prefix }TextTransform` ];
	const textDecoration = attributes[ `${ prefix }TextDecoration` ];
	const lineHeight = attributes[ `${ prefix }LineHeight` ]?.[ device ];
	const lineHeightUnit =
		attributes[ `${ prefix }LineHeightUnits` ]?.[ device ];
	const letterSpacing = attributes[ `${ prefix }LetterSpacing` ]?.[ device ];
	const letterSpacingUnit =
		attributes[ `${ prefix }LetterSpacingUnits` ]?.[ device ];
	const wordSpacing = attributes[ `${ prefix }WordSpacing` ]?.[ device ];
	const wordSpacingUnit =
		attributes[ `${ prefix }WordSpacingUnits` ]?.[ device ];

	if ( device !== 'Desktop' ) {
		return `
			${
				fontSize && fontSizeUnit
					? `font-size: ${ fontSize }${ fontSizeUnit };`
					: ''
			}
			${
				lineHeight && lineHeightUnit
					? `line-height: ${ lineHeight }${ lineHeightUnit };`
					: ''
			}
			${
				letterSpacing && letterSpacingUnit
					? `letter-spacing: ${ letterSpacing }${ letterSpacingUnit };`
					: ''
			}
			${
				wordSpacing && wordSpacingUnit
					? `word-spacing: ${ wordSpacing }${ wordSpacingUnit };`
					: ''
			}
		`;
	}

	const textDecorationSuffix = textDecorationImportant ? ' !important' : '';

	return `
		${ fontFamily ? `font-family: ${ fontFamily };` : '' }
		${
			fontSize && fontSizeUnit
				? `font-size: ${ fontSize }${ fontSizeUnit };`
				: ''
		}
		${ fontWeight ? `font-weight: ${ fontWeight };` : '' }
		${ fontStyle ? `font-style: ${ fontStyle };` : '' }
		${ textTransform ? `text-transform: ${ textTransform };` : '' }
		${
			textDecoration
				? `text-decoration: ${ textDecoration }${ textDecorationSuffix };`
				: ''
		}
		${
			lineHeight && lineHeightUnit
				? `line-height: ${ lineHeight }${ lineHeightUnit };`
				: ''
		}
		${
			letterSpacing && letterSpacingUnit
				? `letter-spacing: ${ letterSpacing }${ letterSpacingUnit };`
				: ''
		}
		${
			wordSpacing && wordSpacingUnit
				? `word-spacing: ${ wordSpacing }${ wordSpacingUnit };`
				: ''
		}
	`;
};

/**
 * Compute hover CSS transform string for the Read More button icon wrapper.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} Trimmed CSS transform value or empty string.
 */
export const buildReadMoreIconHoverTransform = ( attributes, device ) => {
	const {
		readMoreButtonIconHoverRotation,
		readMoreButtonIconHoverAnimation,
	} = attributes;
	let transform = '';

	if ( readMoreButtonIconHoverRotation?.[ device ] ) {
		transform += `rotate(${ readMoreButtonIconHoverRotation[ device ] }deg) `;
	}

	switch ( readMoreButtonIconHoverAnimation ) {
		case 'slide-right':
			transform += 'translateX(5px) ';
			break;
		case 'slide-left':
			transform += 'translateX(-5px) ';
			break;
		case 'zoom-in':
			transform += 'scale(1.2) ';
			break;
		case 'zoom-out':
			transform += 'scale(0.8) ';
			break;
		default:
			break;
	}

	return transform.trim();
};

/**
 * Convert left/center/right alignment keyword into flexbox justify-content value.
 *
 * @param {string} align Alignment keyword.
 * @return {string} Flexbox justify-content declaration or empty string.
 */
export const buildFlexJustify = ( align ) => {
	if ( ! align ) {
		return '';
	}
	if ( align === 'left' ) {
		return 'justify-content: flex-start;';
	}
	if ( align === 'right' ) {
		return 'justify-content: flex-end;';
	}
	return 'justify-content: center;';
};

/**
 * Build positioning rules for the taxonomy badge overlay across breakpoints.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS position declarations.
 */
export const buildBadgeOverlayPositionStyles = ( attributes, device ) => {
	const {
		enableTaxonomyBadgeOverlay,
		taxonomyBadgeOverlayPosition,
		taxonomyBadgeOverlayTopOffset,
		taxonomyBadgeOverlayTopOffsetUnits,
		taxonomyBadgeOverlayLeftOffset,
		taxonomyBadgeOverlayLeftOffsetUnits,
	} = attributes;

	if ( ! enableTaxonomyBadgeOverlay ) {
		return '';
	}

	const fallbackOffset = device === 'Mobile' ? 12 : 15;
	const topOffset =
		taxonomyBadgeOverlayTopOffset?.[ device ] ?? fallbackOffset;
	const topUnit = taxonomyBadgeOverlayTopOffsetUnits?.[ device ] ?? 'px';
	const topVal = `${ topOffset }${ topUnit }`;

	const leftOffset =
		taxonomyBadgeOverlayLeftOffset?.[ device ] ?? fallbackOffset;
	const leftUnit = taxonomyBadgeOverlayLeftOffsetUnits?.[ device ] ?? 'px';
	const leftVal = `${ leftOffset }${ leftUnit }`;

	switch ( taxonomyBadgeOverlayPosition ) {
		case 'top-right':
			return `top: ${ topVal }; right: ${ leftVal }; bottom: auto; left: auto;`;
		case 'bottom-left':
			return `bottom: ${ topVal }; left: ${ leftVal }; top: auto; right: auto;`;
		case 'bottom-right':
			return `bottom: ${ topVal }; right: ${ leftVal }; top: auto; left: auto;`;
		case 'top-left':
		default:
			return `top: ${ topVal }; left: ${ leftVal }; bottom: auto; right: auto;`;
	}
};

/**
 * Build border-radius CSS declaration for navigation arrow buttons.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target device breakpoint.
 * @return {string} CSS border-radius declaration.
 */
export const buildNavArrowBorderRadius = ( attributes, device ) => {
	const cssStyle =
		attributes[ `navigationArrow${ device }BorderRadiusCssStyle` ];
	if ( cssStyle ) {
		return `border-radius: ${ cssStyle };`;
	}

	const obj = attributes[ `navigationArrow${ device }BorderRadius` ];
	if ( obj ) {
		return `border-radius: ${ obj.top }px ${ obj.right }px ${ obj.bottom }px ${ obj.left }px;`;
	}

	return 'border-radius: 50px 50px 50px 50px;';
};
