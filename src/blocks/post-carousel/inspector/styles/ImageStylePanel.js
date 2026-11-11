/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import Select2Control from '@Components/select2-control';
import ImageControl from '@Components/image-control';
import {
	spacingKeys,
	BoundSpacingControl,
	BoundBackgroundControl,
	BoundBorderGroup,
	BoundBoxShadowControl,
} from '../sharedControls';

const OBJECT_FIT_OPTIONS = [
	{ label: __( 'Cover', 'gslider-blocks' ), value: 'cover' },
	{ label: __( 'Contain', 'gslider-blocks' ), value: 'contain' },
	{ label: __( 'Fill', 'gslider-blocks' ), value: 'fill' },
	{ label: __( 'None', 'gslider-blocks' ), value: 'none' },
];

const OBJECT_POSITION_OPTIONS = [
	{ label: __( 'Center', 'gslider-blocks' ), value: 'center' },
	{ label: __( 'Top', 'gslider-blocks' ), value: 'top' },
	{ label: __( 'Bottom', 'gslider-blocks' ), value: 'bottom' },
	{ label: __( 'Left', 'gslider-blocks' ), value: 'left' },
	{ label: __( 'Right', 'gslider-blocks' ), value: 'right' },
	{ label: __( 'Left Top', 'gslider-blocks' ), value: 'left top' },
	{ label: __( 'Right Top', 'gslider-blocks' ), value: 'right top' },
	{ label: __( 'Left Bottom', 'gslider-blocks' ), value: 'left bottom' },
	{ label: __( 'Right Bottom', 'gslider-blocks' ), value: 'right bottom' },
];

const HOVER_EFFECT_OPTIONS = [
	{ label: __( 'None', 'gslider-blocks' ), value: 'none' },
	{ label: __( 'Zoom In', 'gslider-blocks' ), value: 'zoom-in' },
	{ label: __( 'Opacity', 'gslider-blocks' ), value: 'opacity' },
	{ label: __( 'Scale', 'gslider-blocks' ), value: 'scale' },
	{ label: __( 'Move Up', 'gslider-blocks' ), value: 'move-up' },
	{ label: __( 'Grayscale to Color', 'gslider-blocks' ), value: 'grayscale' },
	{ label: __( 'Opacity & Scale', 'gslider-blocks' ), value: 'both' },
	{ label: __( 'Shine Sweep', 'gslider-blocks' ), value: 'shine-sweep' },
	{ label: __( 'Overlay Fade', 'gslider-blocks' ), value: 'overlay-fade' },
	{
		label: __( 'Overlay Slide Up', 'gslider-blocks' ),
		value: 'overlay-slide',
	},
	{ label: __( 'Pan Left', 'gslider-blocks' ), value: 'pan-left' },
	{ label: __( 'Pan Right', 'gslider-blocks' ), value: 'pan-right' },
	{ label: __( 'Blur to Clear', 'gslider-blocks' ), value: 'blur-to-clear' },
	{ label: __( 'Zoom Out', 'gslider-blocks' ), value: 'zoom-out' },
	{ label: __( 'Zoom & Rotate', 'gslider-blocks' ), value: 'zoom-rotate' },
];

/**
 * Style inspector panel for featured image dimensions, hover effects, spacing, and border.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Featured image style panel element.
 */
const ImageStylePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const {
		imageMaxWidth,
		imageMaxWidthUnits,
		imageHeight,
		imageHeightUnits,
		imageObjectFit,
		imageObjectPosition,
		enableFallbackThumbnail,
		fallbackThumbnailUrl,
		fallbackThumbnailId,
		imageHoverEffect,
		imageHoverOpacity,
		imageHoverScale,
		imageHoverLift,
		imageHoverLiftUnits,
		imageTransitionDuration,
		imageHoverBlur,
		imageHoverRotate,
		imageHoverGrayscale,
		imageHoverPan,
	} = attributes;

	return (
		<PanelBody
			title={ __( 'Image', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ToggleControl
				label={ __( 'Enable Fallback Thumbnail', 'gslider-blocks' ) }
				checked={ enableFallbackThumbnail ?? true }
				onChange={ ( value ) =>
					setAttributes( { enableFallbackThumbnail: value } )
				}
				help={ __(
					'Show a custom fallback image or inline SVG placeholder when a post has no featured image.',
					'gslider-blocks'
				) }
			/>

			{ ( enableFallbackThumbnail ?? true ) && (
				<ImageControl
					label={ __( 'Custom Fallback Image', 'gslider-blocks' ) }
					imageUrl={ fallbackThumbnailUrl }
					setImageUrl={ ( value ) =>
						setAttributes( {
							fallbackThumbnailUrl: value || '',
						} )
					}
					imageAlt=""
					setImageAlt={ () => {} }
					imageID={ fallbackThumbnailId }
					setImageID={ ( value ) =>
						setAttributes( {
							fallbackThumbnailId: value ? Number( value ) : 0,
						} )
					}
					isImageSize={ false }
					helpText={ __(
						'Leave empty to render the lightweight vector placeholder.',
						'gslider-blocks'
					) }
				/>
			) }

			<ResponsiveRangeControl
				label={ __( 'Max Width', 'gslider-blocks' ) }
				rangeValue={ imageMaxWidth }
				onChangeValue={ ( value ) =>
					setAttributes( { imageMaxWidth: value } )
				}
				onUnitChange={ ( value ) =>
					setAttributes( { imageMaxWidthUnits: value } )
				}
				deviceType={ deviceType }
				units={ imageMaxWidthUnits }
				resetFallbackValue={ '' }
				unitBounds={ { px: { min: 0, max: 1000, step: 1 } } }
			/>

			<ResponsiveRangeControl
				label={ __( 'Height', 'gslider-blocks' ) }
				rangeValue={ imageHeight }
				onChangeValue={ ( value ) =>
					setAttributes( { imageHeight: value } )
				}
				onUnitChange={ ( value ) =>
					setAttributes( { imageHeightUnits: value } )
				}
				deviceType={ deviceType }
				units={ imageHeightUnits }
				resetFallbackValue={ '' }
				unitBounds={ { px: { min: 0, max: 1000, step: 1 } } }
			/>

			<Select2Control
				label={ __( 'Object Fit', 'gslider-blocks' ) }
				options={ OBJECT_FIT_OPTIONS }
				value={ imageObjectFit }
				onChange={ ( value ) =>
					setAttributes( { imageObjectFit: value } )
				}
			/>

			<Select2Control
				label={ __( 'Object Position', 'gslider-blocks' ) }
				options={ OBJECT_POSITION_OPTIONS }
				value={ imageObjectPosition }
				onChange={ ( value ) =>
					setAttributes( { imageObjectPosition: value } )
				}
			/>

			<Select2Control
				label={ __( 'Hover Effect', 'gslider-blocks' ) }
				options={ HOVER_EFFECT_OPTIONS }
				value={ imageHoverEffect }
				onChange={ ( value ) =>
					setAttributes( { imageHoverEffect: value } )
				}
			/>

			{ ( imageHoverEffect === 'opacity' ||
				imageHoverEffect === 'both' ) && (
				<ResponsiveRangeControl
					min={ 0 }
					max={ 1 }
					step={ 0.05 }
					label={ __( 'Hover Opacity', 'gslider-blocks' ) }
					rangeValue={ imageHoverOpacity }
					onChangeValue={ ( value ) =>
						setAttributes( { imageHoverOpacity: value } )
					}
					deviceType={ deviceType }
					resetFallbackValue={ '0.8' }
					isRangeUnit={ false }
				/>
			) }

			{ ( imageHoverEffect === 'scale' ||
				imageHoverEffect === 'zoom-in' ||
				imageHoverEffect === 'both' ||
				imageHoverEffect === 'zoom-out' ||
				imageHoverEffect === 'zoom-rotate' ) && (
				<ResponsiveRangeControl
					min={ 0.8 }
					max={ 1.5 }
					step={ 0.05 }
					label={ __( 'Hover Scale', 'gslider-blocks' ) }
					rangeValue={ imageHoverScale }
					onChangeValue={ ( value ) =>
						setAttributes( { imageHoverScale: value } )
					}
					deviceType={ deviceType }
					resetFallbackValue={ '1.05' }
					isRangeUnit={ false }
				/>
			) }

			{ imageHoverEffect === 'move-up' && (
				<ResponsiveRangeControl
					label={ __( 'Lift Amount', 'gslider-blocks' ) }
					rangeValue={ imageHoverLift }
					onChangeValue={ ( value ) =>
						setAttributes( { imageHoverLift: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { imageHoverLiftUnits: value } )
					}
					deviceType={ deviceType }
					units={ imageHoverLiftUnits }
					resetFallbackValue={ {
						px: '10',
						'%': '5',
						em: '1',
						rem: '1',
						vw: '1',
						vh: '1',
					} }
					isRangeUnit={ true }
					unitBounds={ {
						px: { min: 0, max: 200, step: 1 },
						em: { min: 0, max: 10, step: 0.1 },
						rem: { min: 0, max: 10, step: 0.1 },
						'%': { min: 0, max: 100, step: 1 },
					} }
				/>
			) }

			{ ( imageHoverEffect === 'blur-to-clear' ||
				imageHoverEffect === 'blur-clear' ) && (
				<ResponsiveRangeControl
					min={ 0 }
					max={ 20 }
					step={ 1 }
					label={ __( 'Hover Blur (px)', 'gslider-blocks' ) }
					rangeValue={ imageHoverBlur }
					onChangeValue={ ( value ) =>
						setAttributes( { imageHoverBlur: value } )
					}
					deviceType={ deviceType }
					resetFallbackValue={ '4' }
					isRangeUnit={ false }
				/>
			) }

			{ imageHoverEffect === 'zoom-rotate' && (
				<ResponsiveRangeControl
					min={ -45 }
					max={ 45 }
					step={ 1 }
					label={ __( 'Hover Rotate (°)', 'gslider-blocks' ) }
					rangeValue={ imageHoverRotate }
					onChangeValue={ ( value ) =>
						setAttributes( { imageHoverRotate: value } )
					}
					deviceType={ deviceType }
					resetFallbackValue={ '3' }
					isRangeUnit={ false }
				/>
			) }

			{ ( imageHoverEffect === 'grayscale' ||
				imageHoverEffect === 'grayscale-to-color' ) && (
				<ResponsiveRangeControl
					min={ 0 }
					max={ 100 }
					step={ 5 }
					label={ __( 'Hover Grayscale (%)', 'gslider-blocks' ) }
					rangeValue={ imageHoverGrayscale }
					onChangeValue={ ( value ) =>
						setAttributes( { imageHoverGrayscale: value } )
					}
					deviceType={ deviceType }
					resetFallbackValue={ '100' }
					isRangeUnit={ false }
				/>
			) }

			{ ( imageHoverEffect === 'pan-left' ||
				imageHoverEffect === 'pan-right' ) && (
				<ResponsiveRangeControl
					min={ 0 }
					max={ 30 }
					step={ 1 }
					label={ __( 'Pan Distance (%)', 'gslider-blocks' ) }
					rangeValue={ imageHoverPan }
					onChangeValue={ ( value ) =>
						setAttributes( { imageHoverPan: value } )
					}
					deviceType={ deviceType }
					resetFallbackValue={ '5' }
					isRangeUnit={ false }
				/>
			) }

			<ResponsiveRangeControl
				min={ 100 }
				max={ 1000 }
				step={ 50 }
				label={ __( 'Transition Duration (ms)', 'gslider-blocks' ) }
				rangeValue={ imageTransitionDuration }
				onChangeValue={ ( value ) =>
					setAttributes( { imageTransitionDuration: value } )
				}
				deviceType={ deviceType }
				resetFallbackValue={ '300' }
				isRangeUnit={ false }
			/>

			<BoundSpacingControl
				label={ __( 'Margin', 'gslider-blocks' ) }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				keys={ spacingKeys( 'image', 'Margin', true ) }
			/>

			<BoundSpacingControl
				label={ __( 'Padding', 'gslider-blocks' ) }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				keys={ spacingKeys( 'image', 'Padding', true ) }
			/>

			<BoundBackgroundControl
				label={ __( 'Background Color', 'gslider-blocks' ) }
				prefix="image"
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
			/>

			<BoundBorderGroup
				prefix="image"
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				borderWidthKeys={ spacingKeys( 'image', 'Border', true ) }
				borderRadiusKeys={ spacingKeys(
					'image',
					'BorderRadius',
					true
				) }
			/>

			<BoundBoxShadowControl
				prefix="image"
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</PanelBody>
	);
};

export default ImageStylePanel;
