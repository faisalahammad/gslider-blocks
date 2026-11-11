/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { BORDER_STYLES, NORMAL_HOVER } from '@Constants';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ColorControl from '@Components/color-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';
import BackgroundControl from '@Components/background-control';
import Select2Control from '@Components/select2-control';

/**
 * Builds standard responsive spacing attribute keys for a given prefix and suffix.
 *
 * @param {string}  prefix      Attribute prefix (e.g. 'postCard', 'postTitle').
 * @param {string}  suffix      Dimension suffix (e.g. 'Margin', 'Padding', 'Border').
 * @param {boolean} suffixFirst Whether the suffix appears before the breakpoint name.
 * @return {Object} Mapped spacing attribute keys.
 */
export const spacingKeys = ( prefix, suffix, suffixFirst = false ) => {
	const units = `${ prefix }${ suffix }Units`;
	const link = `${ prefix }${ suffix }Link`;

	if ( suffixFirst ) {
		return {
			units,
			desktop: `${ prefix }${ suffix }Desktop`,
			desktopCss: `${ prefix }${ suffix }DesktopCssStyle`,
			tablet: `${ prefix }${ suffix }Tablet`,
			tabletCss: `${ prefix }${ suffix }TabletCssStyle`,
			mobile: `${ prefix }${ suffix }Mobile`,
			mobileCss: `${ prefix }${ suffix }MobileCssStyle`,
			link,
		};
	}

	return {
		units,
		desktop: `${ prefix }Desktop${ suffix }`,
		desktopCss: `${ prefix }Desktop${ suffix }CssStyle`,
		tablet: `${ prefix }Tablet${ suffix }`,
		tabletCss: `${ prefix }Tablet${ suffix }CssStyle`,
		mobile: `${ prefix }Mobile${ suffix }`,
		mobileCss: `${ prefix }Mobile${ suffix }CssStyle`,
		link,
	};
};

/**
 * Renders a bound ResponsiveSpacingControl wired to block attributes.
 *
 * @param {Object}   props               Component properties.
 * @param {string}   props.label         Control heading label.
 * @param {string}   props.deviceType    Current responsive viewport.
 * @param {Object}   props.attributes    Block attributes object.
 * @param {Function} props.setAttributes Attribute setter callback.
 * @param {Object}   props.keys          Attribute key map from spacingKeys().
 * @return {Element} Responsive spacing control component.
 */
export const BoundSpacingControl = ( {
	label,
	deviceType,
	attributes,
	setAttributes,
	keys,
} ) => (
	<ResponsiveSpacingControl
		label={ label }
		deviceType={ deviceType }
		onChangeDeviceType={ ( value ) =>
			setAttributes( { deviceType: value } )
		}
		units={ attributes[ keys.units ] }
		onChangeUnits={ ( value ) =>
			setAttributes( { [ keys.units ]: value } )
		}
		desktopSpacing={ attributes[ keys.desktop ] }
		onChangeDesktopSpacing={ ( value ) =>
			setAttributes( { [ keys.desktop ]: value } )
		}
		desktopSpacingStyle={ ( value ) =>
			setAttributes( { [ keys.desktopCss ]: value } )
		}
		tabletSpacing={ attributes[ keys.tablet ] }
		onChangeTabletSpacing={ ( value ) =>
			setAttributes( { [ keys.tablet ]: value } )
		}
		tabletSpacingStyle={ ( value ) =>
			setAttributes( { [ keys.tabletCss ]: value } )
		}
		mobileSpacing={ attributes[ keys.mobile ] }
		onChangeMobileSpacing={ ( value ) =>
			setAttributes( { [ keys.mobile ]: value } )
		}
		mobileSpacingStyle={ ( value ) =>
			setAttributes( { [ keys.mobileCss ]: value } )
		}
		isLinked={ attributes[ keys.link ] }
		onChangeLink={ ( value ) => setAttributes( { [ keys.link ]: value } ) }
	/>
);

/**
 * Renders a bound ResponsiveTypographyControl for an attribute prefix.
 *
 * @param {Object}   props                         Component properties.
 * @param {string}   props.prefix                  Attribute prefix (e.g. 'postTitle').
 * @param {string}   props.deviceType              Current responsive viewport.
 * @param {Object}   props.attributes              Block attributes object.
 * @param {Function} props.setAttributes           Attribute setter callback.
 * @param {boolean}  props.includeDeviceTypeChange Pass onChangeDeviceType handler when needed.
 * @return {Element} Responsive typography control component.
 */
export const BoundTypographyControl = ( {
	prefix,
	deviceType,
	attributes,
	setAttributes,
	includeDeviceTypeChange = false,
} ) => {
	const setAttr = ( suffix ) => ( value ) =>
		setAttributes( { [ `${ prefix }${ suffix }` ]: value } );

	return (
		<ResponsiveTypographyControl
			fontFamily={ attributes[ `${ prefix }FontFamily` ] }
			onChangeFontFamily={ setAttr( 'FontFamily' ) }
			fontSize={ attributes[ `${ prefix }FontSize` ] }
			onChangeFontSize={ setAttr( 'FontSize' ) }
			fontSizeUnits={ attributes[ `${ prefix }FontSizeUnits` ] }
			onChangeFontSizeUnit={ setAttr( 'FontSizeUnits' ) }
			fontWeight={ attributes[ `${ prefix }FontWeight` ] }
			onChangeFontWeight={ setAttr( 'FontWeight' ) }
			fontStyle={ attributes[ `${ prefix }FontStyle` ] }
			onChangeFontStyle={ setAttr( 'FontStyle' ) }
			textTransform={ attributes[ `${ prefix }TextTransform` ] }
			onChangeTextTransform={ setAttr( 'TextTransform' ) }
			textDecoration={ attributes[ `${ prefix }TextDecoration` ] }
			onChangeTextDecoration={ setAttr( 'TextDecoration' ) }
			lineHeight={ attributes[ `${ prefix }LineHeight` ] }
			onChangeLineHeight={ setAttr( 'LineHeight' ) }
			lineHeightUnits={ attributes[ `${ prefix }LineHeightUnits` ] }
			onChangeLineHeightUnit={ setAttr( 'LineHeightUnits' ) }
			letterSpacing={ attributes[ `${ prefix }LetterSpacing` ] }
			onChangeLetterSpacing={ setAttr( 'LetterSpacing' ) }
			letterSpacingUnits={ attributes[ `${ prefix }LetterSpacingUnits` ] }
			onChangeLetterSpacingUnit={ setAttr( 'LetterSpacingUnits' ) }
			wordSpacing={ attributes[ `${ prefix }WordSpacing` ] }
			onChangeWordSpacing={ setAttr( 'WordSpacing' ) }
			wordSpacingUnits={ attributes[ `${ prefix }WordSpacingUnits` ] }
			onChangeWordSpacingUnit={ setAttr( 'WordSpacingUnits' ) }
			deviceType={ deviceType }
			{ ...( includeDeviceTypeChange
				? {
						onChangeDeviceType: ( value ) =>
							setAttributes( { deviceType: value } ),
				  }
				: {} ) }
		/>
	);
};

/**
 * Renders a normal/hover color switcher paired with state-specific ColorControl pickers.
 *
 * @param {Object}   props                 Component properties.
 * @param {string}   props.label           Switcher control label.
 * @param {Object}   props.attributes      Block attributes object.
 * @param {Function} props.setAttributes   Attribute setter callback.
 * @param {string}   props.switcherKey     Attribute key tracking normal vs hover tab.
 * @param {string}   props.normalKey       Attribute key for normal state color.
 * @param {string}   props.hoverKey        Attribute key for hover state color.
 * @param {string}   props.normalLabel     Label for the normal color picker.
 * @param {string}   props.hoverLabel      Label for the hover color picker.
 * @param {string}   props.defaultColor    Optional fallback color string.
 * @param {boolean}  props.hoverHasDefault Whether hover state passes defaultColor.
 * @return {Element} Normal/hover color switcher control group.
 */
export const BoundColorSwitcherControl = ( {
	label,
	attributes,
	setAttributes,
	switcherKey,
	normalKey,
	hoverKey,
	normalLabel = __( 'Normal Color', 'gslider-blocks' ),
	hoverLabel = __( 'Hover Color', 'gslider-blocks' ),
	defaultColor,
	hoverHasDefault = true,
} ) => {
	const mode = attributes[ switcherKey ];

	return (
		<>
			<SwitcherControl
				label={ label }
				options={ NORMAL_HOVER }
				value={ mode }
				onChange={ ( value ) =>
					setAttributes( { [ switcherKey ]: value } )
				}
			/>

			{ mode === 'normal' && (
				<ColorControl
					label={ normalLabel }
					color={ attributes[ normalKey ] }
					onChangeColor={ ( value ) =>
						setAttributes( { [ normalKey ]: value } )
					}
					{ ...( defaultColor !== undefined
						? { defaultColor }
						: {} ) }
				/>
			) }

			{ mode === 'hover' && (
				<ColorControl
					label={ hoverLabel }
					color={ attributes[ hoverKey ] }
					onChangeColor={ ( value ) =>
						setAttributes( { [ hoverKey ]: value } )
					}
					{ ...( hoverHasDefault && defaultColor !== undefined
						? { defaultColor }
						: {} ) }
				/>
			) }
		</>
	);
};

/**
 * Renders a bound BackgroundControl supporting optional background images and label overrides.
 *
 * @param {Object}   props                           Component properties.
 * @param {string}   props.label                     Control heading label.
 * @param {string}   props.prefix                    Attribute prefix (e.g. 'postCard', 'global').
 * @param {Object}   props.attributes                Block attributes object.
 * @param {Function} props.setAttributes             Attribute setter callback.
 * @param {string}   props.deviceType                Current responsive viewport.
 * @param {boolean}  props.passDeviceProps           Whether to forward deviceType and setAttributes props.
 * @param {boolean}  props.includeImageProps         Whether to wire background image attributes.
 * @param {boolean}  props.includeIsBackgroundImage  Whether to pass isBackgroundImage={ false }.
 * @param {string}   props.backgroundTypeLabel       Optional background type label override.
 * @param {string}   props.normalClassicColorLabel   Optional normal color label override.
 * @param {string}   props.hoverClassicColorLabel    Optional hover color label override.
 * @param {string}   props.normalClassicDefaultColor Optional normal default swatch color.
 * @param {string}   props.hoverClassicDefaultColor  Optional hover default swatch color.
 * @return {Element} Background control component.
 */
export const BoundBackgroundControl = ( {
	label,
	prefix,
	attributes,
	setAttributes,
	deviceType,
	passDeviceProps = true,
	includeImageProps = false,
	includeIsBackgroundImage = true,
	backgroundTypeLabel,
	normalClassicColorLabel,
	hoverClassicColorLabel,
	normalClassicDefaultColor,
	hoverClassicDefaultColor,
} ) => {
	const setAttr = ( suffix ) => ( value ) =>
		setAttributes( { [ `${ prefix }${ suffix }` ]: value } );

	const imageProps = includeImageProps
		? {
				normalBackgroundImageUrl:
					attributes[ `${ prefix }NormalBackgroundImageUrl` ],
				setNormalBackgroundImageUrl: setAttr(
					'NormalBackgroundImageUrl'
				),
				normalBackgroundImagePosition:
					attributes[ `${ prefix }NormalBackgroundImagePosition` ],
				setNormalBackgroundImagePosition: setAttr(
					'NormalBackgroundImagePosition'
				),
				normalBackgroundImageAttachment:
					attributes[ `${ prefix }NormalBackgroundImageAttachment` ],
				setNormalBackgroundImageAttachment: setAttr(
					'NormalBackgroundImageAttachment'
				),
				normalBackgroundImageRepeat:
					attributes[ `${ prefix }NormalBackgroundImageRepeat` ],
				setNormalBackgroundImageRepeat: setAttr(
					'NormalBackgroundImageRepeat'
				),
				normalBackgroundImageSize:
					attributes[ `${ prefix }NormalBackgroundImageSize` ],
				setNormalBackgroundImageSize: setAttr(
					'NormalBackgroundImageSize'
				),
				hoverBackgroundImageUrl:
					attributes[ `${ prefix }HoverBackgroundImageUrl` ],
				setHoverBackgroundImageUrl: setAttr(
					'HoverBackgroundImageUrl'
				),
				hoverBackgroundImagePosition:
					attributes[ `${ prefix }HoverBackgroundImagePosition` ],
				setHoverBackgroundImagePosition: setAttr(
					'HoverBackgroundImagePosition'
				),
				hoverBackgroundImageAttachment:
					attributes[ `${ prefix }HoverBackgroundImageAttachment` ],
				setHoverBackgroundImageAttachment: setAttr(
					'HoverBackgroundImageAttachment'
				),
				hoverBackgroundImageRepeat:
					attributes[ `${ prefix }HoverBackgroundImageRepeat` ],
				setHoverBackgroundImageRepeat: setAttr(
					'HoverBackgroundImageRepeat'
				),
				hoverBackgroundImageSize:
					attributes[ `${ prefix }HoverBackgroundImageSize` ],
				setHoverBackgroundImageSize: setAttr(
					'HoverBackgroundImageSize'
				),
		  }
		: {};

	return (
		<BackgroundControl
			label={ label }
			{ ...( passDeviceProps ? { deviceType, setAttributes } : {} ) }
			{ ...( backgroundTypeLabel ? { backgroundTypeLabel } : {} ) }
			{ ...( normalClassicColorLabel
				? { normalClassicColorLabel }
				: {} ) }
			{ ...( hoverClassicColorLabel ? { hoverClassicColorLabel } : {} ) }
			{ ...( normalClassicDefaultColor
				? { normalClassicDefaultColor }
				: {} ) }
			{ ...( hoverClassicDefaultColor
				? { hoverClassicDefaultColor }
				: {} ) }
			normalBackgroundType={
				attributes[ `${ prefix }NormalBackgroundType` ]
			}
			setNormalBackgroundType={ setAttr( 'NormalBackgroundType' ) }
			normalClassicColor={ attributes[ `${ prefix }NormalClassicColor` ] }
			setNormalClassicColor={ setAttr( 'NormalClassicColor' ) }
			normalGradientColor={
				attributes[ `${ prefix }NormalGradientColor` ]
			}
			setNormalGradientColor={ setAttr( 'NormalGradientColor' ) }
			normalCustomGradientSwitcher={
				attributes[ `${ prefix }NormalCustomGradientSwitcher` ]
			}
			setNormalCustomGradientSwitcher={ setAttr(
				'NormalCustomGradientSwitcher'
			) }
			normalCustomGradientInputValue={
				attributes[ `${ prefix }NormalCustomGradientInputValue` ]
			}
			setNormalCustomGradientInputValue={ setAttr(
				'NormalCustomGradientInputValue'
			) }
			hoverBackgroundType={
				attributes[ `${ prefix }HoverBackgroundType` ]
			}
			setHoverBackgroundType={ setAttr( 'HoverBackgroundType' ) }
			hoverClassicColor={ attributes[ `${ prefix }HoverClassicColor` ] }
			setHoverClassicColor={ setAttr( 'HoverClassicColor' ) }
			hoverGradientColor={ attributes[ `${ prefix }HoverGradientColor` ] }
			setHoverGradientColor={ setAttr( 'HoverGradientColor' ) }
			hoverCustomGradientSwitcher={
				attributes[ `${ prefix }HoverCustomGradientSwitcher` ]
			}
			setHoverCustomGradientSwitcher={ setAttr(
				'HoverCustomGradientSwitcher'
			) }
			hoverCustomGradientInputValue={
				attributes[ `${ prefix }HoverCustomGradientInputValue` ]
			}
			setHoverCustomGradientInputValue={ setAttr(
				'HoverCustomGradientInputValue'
			) }
			{ ...imageProps }
			{ ...( includeIsBackgroundImage
				? { isBackgroundImage: false }
				: {} ) }
		/>
	);
};

/**
 * Renders a bound normal/hover BoxShadowSettingsControl pair.
 *
 * @param {Object}   props               Component properties.
 * @param {string}   props.prefix        Attribute prefix (e.g. 'postCard', 'global').
 * @param {Object}   props.attributes    Block attributes object.
 * @param {Function} props.setAttributes Attribute setter callback.
 * @return {Element} Box shadow control group.
 */
export const BoundBoxShadowControl = ( {
	prefix,
	attributes,
	setAttributes,
} ) => {
	const switcherKey = `${ prefix }BoxShadowValuesSwitcher`;
	const switcherValue = attributes[ switcherKey ];

	return (
		<>
			<SwitcherControl
				label={ __( 'Box Shadow', 'gslider-blocks' ) }
				options={ NORMAL_HOVER }
				value={ switcherValue }
				onChange={ ( value ) =>
					setAttributes( { [ switcherKey ]: value } )
				}
			/>

			{ switcherValue === 'normal' && (
				<BoxShadowSettingsControl
					label={ __( 'Normal Shadow', 'gslider-blocks' ) }
					onBoxShadowChange={ ( value ) =>
						setAttributes( {
							[ `${ prefix }BoxShadowValues` ]: value,
						} )
					}
					initialShadowValue={
						attributes[ `${ prefix }BoxShadowValues` ]
					}
					onBoxShadowStyleChange={ ( value ) =>
						setAttributes( {
							[ `${ prefix }BoxShadowCssValue` ]: value,
						} )
					}
				/>
			) }

			{ switcherValue === 'hover' && (
				<BoxShadowSettingsControl
					label={ __( 'Hover Shadow', 'gslider-blocks' ) }
					onBoxShadowChange={ ( value ) =>
						setAttributes( {
							[ `${ prefix }BoxShadowHoverValues` ]: value,
						} )
					}
					initialShadowValue={
						attributes[ `${ prefix }BoxShadowHoverValues` ]
					}
					onBoxShadowStyleChange={ ( value ) =>
						setAttributes( {
							[ `${ prefix }BoxShadowHoverCssValue` ]: value,
						} )
					}
				/>
			) }
		</>
	);
};

/**
 * Renders Border Style, Border Color (normal/hover), Border Width, and optional Border Radius controls.
 *
 * @param {Object}   props                      Component properties.
 * @param {string}   props.prefix               Attribute prefix for border fields.
 * @param {string}   props.deviceType           Current responsive viewport.
 * @param {Object}   props.attributes           Block attributes object.
 * @param {Function} props.setAttributes        Attribute setter callback.
 * @param {string}   props.borderWidthLabel     Label for border width control.
 * @param {Object}   props.borderWidthKeys      Mapped keys for border width spacing.
 * @param {Object}   props.borderRadiusKeys     Mapped keys for border radius spacing.
 * @param {boolean}  props.hideWidthColorOnNone Whether to hide color/width when style is 'none'.
 * @param {string}   props.normalBorderLabel    Label override for normal border color picker.
 * @param {string}   props.defaultBorderColor   Optional fallback color for normal border.
 * @return {Element} Border control group.
 */
export const BoundBorderGroup = ( {
	prefix,
	deviceType,
	attributes,
	setAttributes,
	borderWidthLabel = __( 'Border Width', 'gslider-blocks' ),
	borderWidthKeys,
	borderRadiusKeys = null,
	hideWidthColorOnNone = false,
	normalBorderLabel = __( 'Normal Color', 'gslider-blocks' ),
	defaultBorderColor,
} ) => {
	const borderStyle = attributes[ `${ prefix }Border` ];
	const showBorderColorAndWidth =
		! hideWidthColorOnNone || borderStyle !== 'none';

	return (
		<>
			<Select2Control
				label={ __( 'Border Style', 'gslider-blocks' ) }
				options={ BORDER_STYLES }
				value={ borderStyle }
				onChange={ ( value ) =>
					setAttributes( { [ `${ prefix }Border` ]: value } )
				}
			/>

			{ showBorderColorAndWidth && (
				<>
					<BoundColorSwitcherControl
						label={ __( 'Border Color', 'gslider-blocks' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						switcherKey={ `${ prefix }BorderColorSwitcher` }
						normalKey={ `${ prefix }BorderColor` }
						hoverKey={ `${ prefix }BorderHoverColor` }
						normalLabel={ normalBorderLabel }
						defaultColor={ defaultBorderColor }
					/>

					<BoundSpacingControl
						label={ borderWidthLabel }
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
						keys={ borderWidthKeys }
					/>
				</>
			) }

			{ borderRadiusKeys && (
				<BoundSpacingControl
					label={ __( 'Border Radius', 'gslider-blocks' ) }
					deviceType={ deviceType }
					attributes={ attributes }
					setAttributes={ setAttributes }
					keys={ borderRadiusKeys }
				/>
			) }
		</>
	);
};
