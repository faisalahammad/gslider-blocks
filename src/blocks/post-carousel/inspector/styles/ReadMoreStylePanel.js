/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { NORMAL_HOVER, TEXT_ALIGN, WIDTH_MODE } from '@Constants';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import Select2Control from '@Components/select2-control';
import {
	spacingKeys,
	BoundTypographyControl,
	BoundColorSwitcherControl,
	BoundBackgroundControl,
	BoundBorderGroup,
	BoundBoxShadowControl,
	BoundSpacingControl,
} from '../sharedControls';

const BUTTON_HOVER_ANIMATIONS = [
	{ label: __( 'None', 'gslider-blocks' ), value: 'none' },
	{ label: __( 'Grow', 'gslider-blocks' ), value: 'grow' },
	{ label: __( 'Shrink', 'gslider-blocks' ), value: 'shrink' },
	{ label: __( 'Float Up', 'gslider-blocks' ), value: 'float' },
	{ label: __( 'Shift Right', 'gslider-blocks' ), value: 'shift-right' },
	{
		label: __( 'Shimmer (Shiny Sweep)', 'gslider-blocks' ),
		value: 'shimmer',
	},
	{ label: __( 'Pulse', 'gslider-blocks' ), value: 'pulse' },
];

const ICON_HOVER_ANIMATIONS = [
	{ label: __( 'None', 'gslider-blocks' ), value: 'none' },
	{ label: __( 'Slide Right', 'gslider-blocks' ), value: 'slide-right' },
	{ label: __( 'Slide Left', 'gslider-blocks' ), value: 'slide-left' },
	{ label: __( 'Zoom In', 'gslider-blocks' ), value: 'zoom-in' },
	{ label: __( 'Zoom Out', 'gslider-blocks' ), value: 'zoom-out' },
];

const ICON_SIZE_FALLBACKS = {
	px: '16',
	'%': '5',
	vh: '',
	vw: '',
	em: '1',
	rem: '1',
};

const ICON_WIDTH_FALLBACKS = {
	px: '46',
	'%': '5',
	vh: '',
	vw: '',
	em: '2.875',
	rem: '2.875',
};

const UNIT_BOUNDS_PX_200 = { px: { min: 0, max: 200, step: 1 } };

/**
 * Style inspector panels for Read More button typography, dimensions, animation, colors, and icon.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {string}   props.openPanel     Currently expanded style panel key.
 * @param {Function} props.onTogglePanel Accordion toggle callback for panel key.
 * @return {Element} Read More button and icon style panels.
 */
const ReadMoreStylePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	openPanel,
	onTogglePanel,
} ) => {
	const {
		readMoreButtonWidth,
		readMoreButtonAlign,
		readMoreButtonHoverAnimation,
		readMoreButtonIconSize,
		readMoreButtonIconSizeUnits,
		readMoreButtonIconHoverAnimation,
		readMoreButtonIconWidth,
		readMoreButtonIconWidthUnits,
		readMoreButtonIconHeight,
		readMoreButtonIconHeightUnits,
		readMoreButtonIconGap,
		readMoreButtonIconGapUnits,
		readMoreButtonIconRotationSwitcher,
		readMoreButtonIconRotation,
		readMoreButtonIconHoverRotation,
	} = attributes;

	return (
		<>
			<PanelBody
				title={ __( 'Read More Button', 'gslider-blocks' ) }
				opened={ openPanel === 'read-more-button' }
				onToggle={ () => onTogglePanel( 'read-more-button' ) }
			>
				<BoundTypographyControl
					prefix="readMoreButton"
					deviceType={ deviceType }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>

				<SwitcherControl
					label={ __( 'Button Width', 'gslider-blocks' ) }
					options={ WIDTH_MODE }
					value={ readMoreButtonWidth }
					onChange={ ( value ) =>
						setAttributes( { readMoreButtonWidth: value } )
					}
				/>

				{ readMoreButtonWidth !== 'full' && (
					<ResponsiveAlignmentControl
						label={ __( 'Button Alignment', 'gslider-blocks' ) }
						options={ TEXT_ALIGN }
						alignmentValue={ readMoreButtonAlign }
						setAlignmentValue={ ( value ) =>
							setAttributes( { readMoreButtonAlign: value } )
						}
						deviceType={ deviceType }
						setAttributes={ setAttributes }
					/>
				) }

				<Select2Control
					label={ __( 'Button Hover Animation', 'gslider-blocks' ) }
					options={ BUTTON_HOVER_ANIMATIONS }
					value={ readMoreButtonHoverAnimation }
					onChange={ ( value ) =>
						setAttributes( { readMoreButtonHoverAnimation: value } )
					}
				/>

				<BoundColorSwitcherControl
					label={ __( 'Color', 'gslider-blocks' ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					switcherKey="readMoreButtonColorSwitcher"
					normalKey="readMoreButtonColor"
					hoverKey="readMoreButtonColorHover"
					defaultColor=""
				/>

				<BoundBackgroundControl
					label={ __( 'Background Color', 'gslider-blocks' ) }
					prefix="readMoreButton"
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					passDeviceProps={ false }
					normalClassicDefaultColor="#d2d2d2c7"
					hoverClassicDefaultColor="#787878b8"
				/>

				<BoundBorderGroup
					prefix="readMoreButton"
					deviceType={ deviceType }
					attributes={ attributes }
					setAttributes={ setAttributes }
					borderWidthKeys={ spacingKeys(
						'readMoreButton',
						'Border',
						false
					) }
					borderRadiusKeys={ spacingKeys(
						'readMoreButton',
						'BorderRadius',
						false
					) }
				/>

				<BoundBoxShadowControl
					prefix="readMoreButton"
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>

				<BoundSpacingControl
					label={ __( 'Margin', 'gslider-blocks' ) }
					deviceType={ deviceType }
					attributes={ attributes }
					setAttributes={ setAttributes }
					keys={ spacingKeys( 'readMoreButton', 'Margin', false ) }
				/>

				<BoundSpacingControl
					label={ __( 'Padding', 'gslider-blocks' ) }
					deviceType={ deviceType }
					attributes={ attributes }
					setAttributes={ setAttributes }
					keys={ spacingKeys( 'readMoreButton', 'Padding', false ) }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Read More Button Icon', 'gslider-blocks' ) }
				opened={ openPanel === 'readMoreButtonIcon' }
				onToggle={ () => onTogglePanel( 'readMoreButtonIcon' ) }
			>
				<ResponsiveRangeControl
					label={ __( 'Icon Size', 'gslider-blocks' ) }
					rangeValue={ readMoreButtonIconSize }
					onChangeValue={ ( value ) =>
						setAttributes( { readMoreButtonIconSize: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { readMoreButtonIconSizeUnits: value } )
					}
					deviceType={ deviceType }
					units={ readMoreButtonIconSizeUnits }
					resetFallbackValue={ ICON_SIZE_FALLBACKS }
					unitBounds={ UNIT_BOUNDS_PX_200 }
				/>

				<Select2Control
					label={ __( 'Icon Hover Animation', 'gslider-blocks' ) }
					options={ ICON_HOVER_ANIMATIONS }
					value={ readMoreButtonIconHoverAnimation }
					onChange={ ( value ) =>
						setAttributes( {
							readMoreButtonIconHoverAnimation: value,
						} )
					}
				/>

				<ResponsiveRangeControl
					label={ __( 'Width', 'gslider-blocks' ) }
					rangeValue={ readMoreButtonIconWidth }
					onChangeValue={ ( value ) =>
						setAttributes( { readMoreButtonIconWidth: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { readMoreButtonIconWidthUnits: value } )
					}
					deviceType={ deviceType }
					units={ readMoreButtonIconWidthUnits }
					resetFallbackValue={ ICON_WIDTH_FALLBACKS }
					unitBounds={ UNIT_BOUNDS_PX_200 }
				/>

				<ResponsiveRangeControl
					label={ __( 'Height', 'gslider-blocks' ) }
					rangeValue={ readMoreButtonIconHeight }
					onChangeValue={ ( value ) =>
						setAttributes( { readMoreButtonIconHeight: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( {
							readMoreButtonIconHeightUnits: value,
						} )
					}
					deviceType={ deviceType }
					units={ readMoreButtonIconHeightUnits }
					resetFallbackValue={ ICON_SIZE_FALLBACKS }
					unitBounds={ UNIT_BOUNDS_PX_200 }
				/>

				<ResponsiveRangeControl
					min={ 0 }
					max={ 100 }
					label={ __( 'Gap', 'gslider-blocks' ) }
					rangeValue={ readMoreButtonIconGap }
					onChangeValue={ ( value ) =>
						setAttributes( { readMoreButtonIconGap: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { readMoreButtonIconGapUnits: value } )
					}
					deviceType={ deviceType }
					units={ readMoreButtonIconGapUnits }
					resetFallbackValue={ { px: '8', em: '0.5', rem: '0.5' } }
				/>

				<SwitcherControl
					label={ __( 'Icon Rotation', 'gslider-blocks' ) }
					options={ NORMAL_HOVER }
					value={ readMoreButtonIconRotationSwitcher }
					onChange={ ( value ) =>
						setAttributes( {
							readMoreButtonIconRotationSwitcher: value,
						} )
					}
				/>

				{ readMoreButtonIconRotationSwitcher === 'normal' && (
					<ResponsiveRangeControl
						min={ -360 }
						max={ 360 }
						label={ __( 'Icon Rotation (deg)', 'gslider-blocks' ) }
						rangeValue={ readMoreButtonIconRotation }
						onChangeValue={ ( value ) =>
							setAttributes( {
								readMoreButtonIconRotation: value,
							} )
						}
						deviceType={ deviceType }
						step={ 1 }
						resetFallbackValue="0"
						isRangeUnit={ false }
					/>
				) }

				{ readMoreButtonIconRotationSwitcher === 'hover' && (
					<ResponsiveRangeControl
						min={ -360 }
						max={ 360 }
						label={ __(
							'Icon Hover Rotation (deg)',
							'gslider-blocks'
						) }
						rangeValue={ readMoreButtonIconHoverRotation }
						onChangeValue={ ( value ) =>
							setAttributes( {
								readMoreButtonIconHoverRotation: value,
							} )
						}
						deviceType={ deviceType }
						step={ 1 }
						resetFallbackValue="0"
						isRangeUnit={ false }
					/>
				) }

				<BoundColorSwitcherControl
					label={ __( 'Icon Color', 'gslider-blocks' ) }
					attributes={ attributes }
					setAttributes={ setAttributes }
					switcherKey="readMoreButtonIconColorSwitcher"
					normalKey="readMoreButtonIconColor"
					hoverKey="readMoreButtonIconColorHover"
					defaultColor="#333333"
					hoverHasDefault={ false }
				/>

				<BoundBackgroundControl
					label={ __( 'Background Color', 'gslider-blocks' ) }
					prefix="readMoreButtonIcon"
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					passDeviceProps={ false }
					normalClassicDefaultColor="#d2d2d2c7"
					hoverClassicDefaultColor="#787878b8"
				/>

				<BoundBorderGroup
					prefix="readMoreButtonIcon"
					deviceType={ deviceType }
					attributes={ attributes }
					setAttributes={ setAttributes }
					borderWidthKeys={ spacingKeys(
						'readMoreButtonIcon',
						'Border',
						false
					) }
					borderRadiusKeys={ spacingKeys(
						'readMoreButtonIcon',
						'BorderRadius',
						false
					) }
				/>

				<BoundBoxShadowControl
					prefix="readMoreButtonIcon"
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</PanelBody>
		</>
	);
};

export default ReadMoreStylePanel;
