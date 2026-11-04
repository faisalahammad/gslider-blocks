/* eslint-disable no-unused-vars, jsdoc/require-param, jsdoc/check-line-alignment, jsdoc/check-alignment, react-hooks/exhaustive-deps */
import { __ } from '@wordpress/i18n';
import { useEffect, memo } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import InspectorControl from '@Components/inspector-controls';
import BackgroundControl from '@Components/background-control';
import { useDeviceType } from '@Utils/displayType';
import './editor.scss';

const Inspector = ( { attributes, setAttributes } ) => {
	const {
		blockId,
		deviceType,
		blockStyle,

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

	/** Get Current Device Type */
	const currentDeviceType = useDeviceType();

	/** Set Device Type */
	useEffect( () => {
		setAttributes( { deviceType: currentDeviceType } );
	}, [ currentDeviceType ] );

	/**
	 * Inspector General Controls
	 */
	const generalControls = (
		<>
			<PanelBody title={ __( 'General', 'gslider-blocks' ) } initialOpen>
				<p>
					{ __(
						'No settings available. Move to Style Tab',
						'gslider-blocks'
					) }
				</p>
			</PanelBody>
		</>
	);

	/**
	 * Inspector Style Controls
	 */
	const styleControls = (
		<>
			<PanelBody title={ __( 'Background', 'gslider-blocks' ) }>
				<BackgroundControl
					label={ __( 'Background', 'gslider-blocks' ) }
					deviceType={ deviceType }
					normalBackgroundType={ sliderItemNormalBackgroundType }
					setNormalBackgroundType={ ( value ) =>
						setAttributes( {
							sliderItemNormalBackgroundType: value,
						} )
					}
					normalClassicColor={ sliderItemNormalClassicColor }
					setNormalClassicColor={ ( value ) =>
						setAttributes( { sliderItemNormalClassicColor: value } )
					}
					normalGradientColor={ sliderItemNormalGradientColor }
					setNormalGradientColor={ ( value ) =>
						setAttributes( {
							sliderItemNormalGradientColor: value,
						} )
					}
					normalCustomGradientSwitcher={
						sliderItemNormalCustomGradientSwitcher
					}
					setNormalCustomGradientSwitcher={ ( value ) =>
						setAttributes( {
							sliderItemNormalCustomGradientSwitcher: value,
						} )
					}
					normalCustomGradientInputValue={
						sliderItemNormalCustomGradientInputValue
					}
					setNormalCustomGradientInputValue={ ( value ) =>
						setAttributes( {
							sliderItemNormalCustomGradientInputValue: value,
						} )
					}
					normalBackgroundImageUrl={
						sliderItemNormalBackgroundImageUrl
					}
					setNormalBackgroundImageUrl={ ( value ) =>
						setAttributes( {
							sliderItemNormalBackgroundImageUrl: value,
						} )
					}
					normalBackgroundImagePosition={
						sliderItemNormalBackgroundImagePosition
					}
					setNormalBackgroundImagePosition={ ( value ) =>
						setAttributes( {
							sliderItemNormalBackgroundImagePosition: value,
						} )
					}
					normalBackgroundImageAttachment={
						sliderItemNormalBackgroundImageAttachment
					}
					setNormalBackgroundImageAttachment={ ( value ) =>
						setAttributes( {
							sliderItemNormalBackgroundImageAttachment: value,
						} )
					}
					normalBackgroundImageRepeat={
						sliderItemNormalBackgroundImageRepeat
					}
					setNormalBackgroundImageRepeat={ ( value ) =>
						setAttributes( {
							sliderItemNormalBackgroundImageRepeat: value,
						} )
					}
					normalBackgroundImageSize={
						sliderItemNormalBackgroundImageSize
					}
					setNormalBackgroundImageSize={ ( value ) =>
						setAttributes( {
							sliderItemNormalBackgroundImageSize: value,
						} )
					}
					hoverBackgroundType={ sliderItemHoverBackgroundType }
					setHoverBackgroundType={ ( value ) =>
						setAttributes( {
							sliderItemHoverBackgroundType: value,
						} )
					}
					hoverClassicColor={ sliderItemHoverClassicColor }
					setHoverClassicColor={ ( value ) =>
						setAttributes( { sliderItemHoverClassicColor: value } )
					}
					hoverGradientColor={ sliderItemHoverGradientColor }
					setHoverGradientColor={ ( value ) =>
						setAttributes( { sliderItemHoverGradientColor: value } )
					}
					hoverCustomGradientSwitcher={
						sliderItemHoverCustomGradientSwitcher
					}
					setHoverCustomGradientSwitcher={ ( value ) =>
						setAttributes( {
							sliderItemHoverCustomGradientSwitcher: value,
						} )
					}
					hoverCustomGradientInputValue={
						sliderItemHoverCustomGradientInputValue
					}
					setHoverCustomGradientInputValue={ ( value ) =>
						setAttributes( {
							sliderItemHoverCustomGradientInputValue: value,
						} )
					}
					hoverBackgroundImageUrl={
						sliderItemHoverBackgroundImageUrl
					}
					setHoverBackgroundImageUrl={ ( value ) =>
						setAttributes( {
							sliderItemHoverBackgroundImageUrl: value,
						} )
					}
					hoverBackgroundImagePosition={
						sliderItemHoverBackgroundImagePosition
					}
					setHoverBackgroundImagePosition={ ( value ) =>
						setAttributes( {
							sliderItemHoverBackgroundImagePosition: value,
						} )
					}
					hoverBackgroundImageAttachment={
						sliderItemHoverBackgroundImageAttachment
					}
					setHoverBackgroundImageAttachment={ ( value ) =>
						setAttributes( {
							sliderItemHoverBackgroundImageAttachment: value,
						} )
					}
					hoverBackgroundImageRepeat={
						sliderItemHoverBackgroundImageRepeat
					}
					setHoverBackgroundImageRepeat={ ( value ) =>
						setAttributes( {
							sliderItemHoverBackgroundImageRepeat: value,
						} )
					}
					hoverBackgroundImageSize={
						sliderItemHoverBackgroundImageSize
					}
					setHoverBackgroundImageSize={ ( value ) =>
						setAttributes( {
							sliderItemHoverBackgroundImageSize: value,
						} )
					}
					setAttributes={ setAttributes }
				/>
			</PanelBody>
		</>
	);

	/**
	 * Inspector Advanced Controls
	 */
	const advancedControls = (
		<>
			<PanelBody title={ __( 'Layout', 'gslider-blocks' ) } initialOpen>
				{ /* Add advanced settings here */ }
			</PanelBody>
		</>
	);

	return (
		<>
			<InspectorControl
				generalControls={ null }
				styleControls={ styleControls }
				advancedControls={ null }
			/>
		</>
	);
};

export default memo( Inspector );
