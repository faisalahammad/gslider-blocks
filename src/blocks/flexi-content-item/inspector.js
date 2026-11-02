/* eslint-disable no-unused-vars, jsdoc/require-param, jsdoc/check-line-alignment, jsdoc/check-alignment, react-hooks/exhaustive-deps, import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { useEffect, memo } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import InspectorControl from '@Components/inspector-controls';
import BackgroundControl from '@Components/background-control';
import SwitcherControl from '@Components/switcher-control';
import InputControls from '@Components/input-control';
import { EMBED_VIDEO_TYPE } from '@Constants';
import { useDeviceType } from '@Utils/displayType';
import './editor.scss';

/** Only a strict ID match is stored, so the ID is safe to put in an embed URL later */
/** The provider host must start the URL, so a provider name inside another URL does not match */
const VIDEO_ID_PATTERNS = {
	youtube:
		/^(?:(?:https?:)?\/\/)?(?:[\w-]+\.)*(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})(?![\w-])/i,
	/** A showcase, album, channel or group name and the private link hash are not the video ID */
	vimeo: /^(?:(?:https?:)?\/\/)?(?:[\w-]+\.)*vimeo\.com\/(?:(?:showcase|album|channels|groups)\/[^/?#]+\/|(?!(?:showcase|album|channels|groups)\/|\d+\/)[^/?#]+\/)*(\d+)(?:[/?#]|$)/i,
};

const getVideoId = ( type, url ) =>
	( url || '' ).trim().match( VIDEO_ID_PATTERNS[ type ] )?.[ 1 ] || '';

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

		/** Start Embed Video */
		embedVideoType,
		embedVideoUrl,
		embedVideoId,
		/** End Embed Video */
	} = attributes;

	/** Get Current Device Type */
	const currentDeviceType = useDeviceType();

	/** Set Device Type */
	useEffect( () => {
		setAttributes( { deviceType: currentDeviceType } );
	}, [ currentDeviceType ] );

	/** Keep the stored video ID in sync with the URL and provider */
	const handleVideoUrlChange = ( value ) => {
		setAttributes( {
			embedVideoUrl: value,
			embedVideoId: getVideoId( embedVideoType, value ),
		} );
	};

	/**
	 * Inspector General Controls
	 */
	const generalControls = (
		<>
			<PanelBody title={ __( 'Video', 'gslider-blocks' ) } initialOpen>
				<SwitcherControl
					label={ __( 'Embed Provider', 'gslider-blocks' ) }
					options={ EMBED_VIDEO_TYPE }
					value={ embedVideoType }
					onChange={ ( value ) =>
						setAttributes( {
							embedVideoType: value,
							embedVideoId: getVideoId( value, embedVideoUrl ),
						} )
					}
				/>
				<InputControls
					label={ __( 'Video URL', 'gslider-blocks' ) }
					value={ embedVideoUrl }
					onChangeValue={ handleVideoUrlChange }
					helpText={
						embedVideoUrl && ! embedVideoId
							? __(
									'Could not find a video ID in this URL.',
									'gslider-blocks'
							  )
							: ''
					}
				/>
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
				generalControls={ generalControls }
				styleControls={ styleControls }
				advancedControls={ null }
			/>
		</>
	);
};

export default memo( Inspector );
