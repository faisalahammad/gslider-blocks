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

const EMBED_VIDEO_ID_PATTERNS = {
	// watch?v=, youtu.be/, shorts/, embed/ and live/ links
	youtube:
		/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/,
	// vimeo.com/123, vimeo.com/channels/name/123 and player.vimeo.com/video/123 links, unlisted ones add a hash as /hash or ?h=hash
	vimeo: /vimeo\.com\/(?:[^?#]*?\/)??(\d+)(?:\/([\da-f]+))?(?=[?#]|\/?$)(?:[^#]*[?&]h=([\da-f]+))?/,
};

/**
 * Get the video ID from a YouTube or Vimeo URL.
 *
 * @param {string} type - Embed provider, youtube or vimeo.
 * @param {string} url  - Video URL.
 * @return {string} Video ID, "id/hash" for unlisted Vimeo videos, empty when the URL does not match.
 */
const getEmbedVideoId = ( type, url ) =>
	url
		?.match( EMBED_VIDEO_ID_PATTERNS[ type ] )
		?.slice( 1 )
		.filter( Boolean )
		.join( '/' ) || '';

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

		/** Start slider Item Embed Video */
		embedVideoType,
		embedVideoUrl,
		/** End slider Item Embed Video */
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
			<PanelBody
				title={ __( 'Embed Video', 'gslider-blocks' ) }
				initialOpen
			>
				<SwitcherControl
					label={ __( 'Embed Provider', 'gslider-blocks' ) }
					options={ EMBED_VIDEO_TYPE }
					value={ embedVideoType }
					onChange={ ( value ) =>
						setAttributes( {
							embedVideoType: value,
							embedVideoId: getEmbedVideoId(
								value,
								embedVideoUrl
							),
						} )
					}
				/>
				<InputControls
					label={ __( 'Video URL', 'gslider-blocks' ) }
					value={ embedVideoUrl }
					helpText={
						embedVideoType === 'vimeo'
							? 'https://vimeo.com/...'
							: 'https://www.youtube.com/watch?v=...'
					}
					onChangeValue={ ( value ) =>
						setAttributes( {
							embedVideoUrl: value,
							embedVideoId: getEmbedVideoId(
								embedVideoType,
								value
							),
						} )
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
