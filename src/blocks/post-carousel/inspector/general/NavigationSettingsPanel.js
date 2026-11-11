/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, BaseControl } from '@wordpress/components';
import {
	ARROW_ICON_ALIGN,
	NAVIGATION_ARROW_POSITION_TYPE,
	NAVIGATION_ARROW_POSITION,
	NAVIGATION_ARROW_DIRECTION,
} from '@Constants';
import SwitcherControl from '@Components/switcher-control';
import Select2Control from '@Components/select2-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import IconPicker from '@Components/icon-picker';
import ImageControl from '@Components/image-control';

const OFFSET_BY_POSITION = {
	'top-left': {
		verticalKey: 'navigationArrowPositionTopOffset',
		verticalUnitsKey: 'navigationArrowPositionTopOffsetUnits',
		verticalLabel: __( 'Top Offset', 'gslider-blocks' ),
		horizontalKey: 'navigationArrowPositionLeftOffset',
		horizontalUnitsKey: 'navigationArrowPositionLeftOffsetUnits',
		horizontalLabel: __( 'Left Offset', 'gslider-blocks' ),
	},
	'top-center': {
		verticalKey: 'navigationArrowPositionTopOffset',
		verticalUnitsKey: 'navigationArrowPositionTopOffsetUnits',
		verticalLabel: __( 'Top Offset', 'gslider-blocks' ),
		horizontalKey: 'navigationArrowPositionLeftOffset',
		horizontalUnitsKey: 'navigationArrowPositionLeftOffsetUnits',
		horizontalLabel: __( 'Left Offset', 'gslider-blocks' ),
	},
	'top-right': {
		verticalKey: 'navigationArrowPositionTopOffset',
		verticalUnitsKey: 'navigationArrowPositionTopOffsetUnits',
		verticalLabel: __( 'Top Offset', 'gslider-blocks' ),
		horizontalKey: 'navigationArrowPositionRightOffset',
		horizontalUnitsKey: 'navigationArrowPositionRightOffsetUnits',
		horizontalLabel: __( 'Right Offset', 'gslider-blocks' ),
	},
	'bottom-left': {
		verticalKey: 'navigationArrowPositionBottomOffset',
		verticalUnitsKey: 'navigationArrowPositionBottomOffsetUnits',
		verticalLabel: __( 'Bottom Offset', 'gslider-blocks' ),
		horizontalKey: 'navigationArrowPositionLeftOffset',
		horizontalUnitsKey: 'navigationArrowPositionLeftOffsetUnits',
		horizontalLabel: __( 'Left Offset', 'gslider-blocks' ),
	},
	'bottom-center': {
		verticalKey: 'navigationArrowPositionBottomOffset',
		verticalUnitsKey: 'navigationArrowPositionBottomOffsetUnits',
		verticalLabel: __( 'Top Offset', 'gslider-blocks' ),
		horizontalKey: 'navigationArrowPositionLeftOffset',
		horizontalUnitsKey: 'navigationArrowPositionLeftOffsetUnits',
		horizontalLabel: __( 'Left Offset', 'gslider-blocks' ),
	},
	'bottom-right': {
		verticalKey: 'navigationArrowPositionBottomOffset',
		verticalUnitsKey: 'navigationArrowPositionBottomOffsetUnits',
		verticalLabel: __( 'Top Offset', 'gslider-blocks' ),
		horizontalKey: 'navigationArrowPositionRightOffset',
		horizontalUnitsKey: 'navigationArrowPositionRightOffsetUnits',
		horizontalLabel: __( 'Right Offset', 'gslider-blocks' ),
	},
};

/**
 * Renders icon or image selector controls for either navigation arrow side.
 *
 * @param {Object}   props               Component properties.
 * @param {string}   props.label         Switcher heading label.
 * @param {string}   props.alignKey      Attribute key for arrow icon vs image switcher.
 * @param {string}   props.iconKey       Attribute key for chosen icon identifier.
 * @param {string}   props.imageUrlKey   Attribute key for custom arrow image URL.
 * @param {string}   props.imageAltKey   Attribute key for custom arrow image alt text.
 * @param {string}   props.imageIdKey    Attribute key for custom arrow attachment ID.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @return {Element} Arrow icon/image selector control group.
 */
const ArrowMediaControl = ( {
	label,
	alignKey,
	iconKey,
	imageUrlKey,
	imageAltKey,
	imageIdKey,
	attributes,
	setAttributes,
} ) => {
	const mode = attributes[ alignKey ];

	return (
		<BaseControl>
			<SwitcherControl
				label={ label }
				options={ ARROW_ICON_ALIGN }
				value={ mode }
				onChange={ ( value ) =>
					setAttributes( { [ alignKey ]: value } )
				}
			/>

			{ mode === 'icon' && (
				<IconPicker
					value={ attributes[ iconKey ] }
					setIconHandler={ ( iconName ) =>
						setAttributes( { [ iconKey ]: iconName } )
					}
				/>
			) }

			{ mode === 'image' && (
				<ImageControl
					imageUrl={ attributes[ imageUrlKey ] }
					setImageUrl={ ( value ) =>
						setAttributes( { [ imageUrlKey ]: value } )
					}
					imageAlt={ attributes[ imageAltKey ] }
					setImageAlt={ ( value ) =>
						setAttributes( { [ imageAltKey ]: value } )
					}
					imageID={ attributes[ imageIdKey ] }
					setImageID={ ( value ) =>
						setAttributes( { [ imageIdKey ]: value } )
					}
					isImageSize={ false }
				/>
			) }
		</BaseControl>
	);
};

/**
 * General inspector panel for navigation arrow icons, positioning, offsets, and gap.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Navigation settings panel element.
 */
const NavigationSettingsPanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const {
		navigationArrowsIconSwitcher,
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowDirection,
		navigationArrowGap,
		navigationArrowGapUnits,
		navigationArrowPositionOutsidePadding,
		navigationArrowPositionOutsidePaddingUnits,
	} = attributes;

	const offsetConfig = OFFSET_BY_POSITION[ navigationArrowPosition ];

	return (
		<PanelBody
			title={ __( 'Navigation', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ToggleControl
				label={ __( 'Custom Icon', 'gslider-blocks' ) }
				checked={ navigationArrowsIconSwitcher }
				onChange={ ( value ) =>
					setAttributes( { navigationArrowsIconSwitcher: value } )
				}
			/>

			{ navigationArrowsIconSwitcher && (
				<>
					<ArrowMediaControl
						label={ __( 'Left Icon', 'gslider-blocks' ) }
						alignKey="navigationArrowsIconLeftAlign"
						iconKey="navigationArrowsIconLeft"
						imageUrlKey="navigationArrowsIconLeftImageUrl"
						imageAltKey="navigationArrowsIconLeftImageAlt"
						imageIdKey="navigationArrowsIconLeftImageID"
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					<ArrowMediaControl
						label={ __( 'Right Icon', 'gslider-blocks' ) }
						alignKey="navigationArrowsIconRightAlign"
						iconKey="navigationArrowsIconRight"
						imageUrlKey="navigationArrowsIconRightImageUrl"
						imageAltKey="navigationArrowsIconRightImageAlt"
						imageIdKey="navigationArrowsIconRightImageID"
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</>
			) }

			<SwitcherControl
				label={ __( 'Positioning', 'gslider-blocks' ) }
				options={ NAVIGATION_ARROW_POSITION_TYPE }
				value={ navigationArrowPositionType }
				onChange={ ( value ) =>
					setAttributes( { navigationArrowPositionType: value } )
				}
			/>

			<Select2Control
				label={ __( 'Position', 'gslider-blocks' ) }
				options={ NAVIGATION_ARROW_POSITION }
				value={ navigationArrowPosition }
				onChange={ ( value ) =>
					setAttributes( { navigationArrowPosition: value } )
				}
			/>

			{ navigationArrowPosition !== 'center' && (
				<Select2Control
					label={ __( 'Arrow Direction', 'gslider-blocks' ) }
					options={ NAVIGATION_ARROW_DIRECTION }
					value={ navigationArrowDirection }
					onChange={ ( value ) =>
						setAttributes( { navigationArrowDirection: value } )
					}
				/>
			) }

			{ offsetConfig && (
				<>
					<ResponsiveRangeControl
						label={ offsetConfig.verticalLabel }
						rangeValue={ attributes[ offsetConfig.verticalKey ] }
						onChangeValue={ ( value ) =>
							setAttributes( {
								[ offsetConfig.verticalKey ]: value,
							} )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								[ offsetConfig.verticalUnitsKey ]: value,
							} )
						}
						deviceType={ deviceType }
						units={ attributes[ offsetConfig.verticalUnitsKey ] }
						resetFallbackValue={ '' }
						unitBounds={ {
							px: { min: 0, max: 1000, step: 1 },
						} }
					/>
					<ResponsiveRangeControl
						label={ offsetConfig.horizontalLabel }
						rangeValue={ attributes[ offsetConfig.horizontalKey ] }
						onChangeValue={ ( value ) =>
							setAttributes( {
								[ offsetConfig.horizontalKey ]: value,
							} )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								[ offsetConfig.horizontalUnitsKey ]: value,
							} )
						}
						deviceType={ deviceType }
						units={ attributes[ offsetConfig.horizontalUnitsKey ] }
						resetFallbackValue={ '' }
						unitBounds={ {
							px: { min: 0, max: 1000, step: 1 },
						} }
					/>
				</>
			) }

			{ navigationArrowPosition !== 'center' && (
				<ResponsiveRangeControl
					label={ __( 'Gap', 'gslider-blocks' ) }
					rangeValue={ navigationArrowGap }
					onChangeValue={ ( value ) =>
						setAttributes( { navigationArrowGap: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { navigationArrowGapUnits: value } )
					}
					deviceType={ deviceType }
					units={ navigationArrowGapUnits }
					resetFallbackValue={ {
						px: '10',
						'%': '2',
						vh: '2',
						vw: '2',
						em: '0.75',
						rem: '0.75',
					} }
					unitBounds={ {
						px: { min: 0, max: 200, step: 1 },
					} }
				/>
			) }

			{ navigationArrowPositionType === 'outside' && (
				<ResponsiveRangeControl
					label={ __( 'Padding', 'gslider-blocks' ) }
					rangeValue={ navigationArrowPositionOutsidePadding }
					onChangeValue={ ( value ) =>
						setAttributes( {
							navigationArrowPositionOutsidePadding: value,
						} )
					}
					onUnitChange={ ( value ) =>
						setAttributes( {
							navigationArrowPositionOutsidePaddingUnits: value,
						} )
					}
					deviceType={ deviceType }
					units={ navigationArrowPositionOutsidePaddingUnits }
					resetFallbackValue={ {
						px: '60',
						'%': '5',
						vh: '5',
						vw: '5',
						em: '3.75',
						rem: '3.75',
					} }
					unitBounds={ {
						px: { min: 0, max: 200, step: 1 },
					} }
				/>
			) }
		</PanelBody>
	);
};

export default NavigationSettingsPanel;
