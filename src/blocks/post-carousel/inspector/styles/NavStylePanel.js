/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import {
	spacingKeys,
	BoundColorSwitcherControl,
	BoundBackgroundControl,
	BoundBorderGroup,
	BoundBoxShadowControl,
} from '../sharedControls';

const SIZE_FALLBACKS = {
	px: '16',
	'%': '5',
	vh: '',
	vw: '',
	em: '1',
	rem: '1',
};

const DIMENSION_FALLBACKS = {
	px: '46',
	'%': '5',
	vh: '',
	vw: '',
	em: '2.875',
	rem: '2.875',
};

const UNIT_BOUNDS_PX_200 = { px: { min: 0, max: 200, step: 1 } };

/**
 * Style inspector panel for navigation arrow size, dimensions, colors, border, and shadow.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Navigation style panel element.
 */
const NavStylePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const {
		navigationArrowSize,
		navigationArrowSizeUnits,
		navigationArrowWidth,
		navigationArrowWidthUnits,
		navigationArrowHeight,
		navigationArrowHeightUnits,
	} = attributes;

	return (
		<PanelBody
			title={ __( 'Navigation', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ResponsiveRangeControl
				label={ __( 'Icon Size', 'gslider-blocks' ) }
				rangeValue={ navigationArrowSize }
				onChangeValue={ ( value ) =>
					setAttributes( { navigationArrowSize: value } )
				}
				onUnitChange={ ( value ) =>
					setAttributes( { navigationArrowSizeUnits: value } )
				}
				deviceType={ deviceType }
				units={ navigationArrowSizeUnits }
				resetFallbackValue={ SIZE_FALLBACKS }
				unitBounds={ UNIT_BOUNDS_PX_200 }
			/>

			<ResponsiveRangeControl
				label={ __( 'Width', 'gslider-blocks' ) }
				rangeValue={ navigationArrowWidth }
				onChangeValue={ ( value ) =>
					setAttributes( { navigationArrowWidth: value } )
				}
				onUnitChange={ ( value ) =>
					setAttributes( { navigationArrowWidthUnits: value } )
				}
				deviceType={ deviceType }
				units={ navigationArrowWidthUnits }
				resetFallbackValue={ DIMENSION_FALLBACKS }
				unitBounds={ UNIT_BOUNDS_PX_200 }
			/>

			<ResponsiveRangeControl
				label={ __( 'Height', 'gslider-blocks' ) }
				rangeValue={ navigationArrowHeight }
				onChangeValue={ ( value ) =>
					setAttributes( { navigationArrowHeight: value } )
				}
				onUnitChange={ ( value ) =>
					setAttributes( { navigationArrowHeightUnits: value } )
				}
				deviceType={ deviceType }
				units={ navigationArrowHeightUnits }
				resetFallbackValue={ DIMENSION_FALLBACKS }
				unitBounds={ UNIT_BOUNDS_PX_200 }
			/>

			<BoundColorSwitcherControl
				label={ __( 'Icon Color', 'gslider-blocks' ) }
				attributes={ attributes }
				setAttributes={ setAttributes }
				switcherKey="navigationArrowColorSwitcher"
				normalKey="navigationArrowColor"
				hoverKey="navigationArrowColorHover"
				defaultColor="#333333"
				hoverHasDefault={ false }
			/>

			<BoundBackgroundControl
				label={ __( 'Background Color', 'gslider-blocks' ) }
				prefix="navigationArrow"
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				passDeviceProps={ false }
				normalClassicDefaultColor="#d2d2d2c7"
				hoverClassicDefaultColor="#787878b8"
			/>

			<BoundBorderGroup
				prefix="navigationArrow"
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				borderWidthKeys={ spacingKeys(
					'navigationArrow',
					'Border',
					false
				) }
				borderRadiusKeys={ spacingKeys(
					'navigationArrow',
					'BorderRadius',
					false
				) }
			/>

			<BoundBoxShadowControl
				prefix="navigationArrow"
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</PanelBody>
	);
};

export default NavStylePanel;
