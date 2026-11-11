/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { NORMAL_ACTIVE } from '@Constants';
import SwitcherControl from '@Components/switcher-control';
import ColorControl from '@Components/color-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import {
	spacingKeys,
	BoundTypographyControl,
	BoundColorSwitcherControl,
	BoundBorderGroup,
	BoundSpacingControl,
} from '../sharedControls';

const DOTS_SIZE_FALLBACKS = {
	px: '8',
	'%': '',
	vh: '',
	vw: '',
	em: '0.5',
	rem: '0.5',
};

const PROGRESSBAR_HEIGHT_FALLBACKS = {
	px: '4',
	'%': '',
	vh: '',
	vw: '',
	em: '0.25',
	rem: '0.25',
};

const POSITION_UNIT_BOUNDS = { px: { min: -200, max: 200, step: 1 } };
const SIZE_UNIT_BOUNDS = { px: { min: 0, max: 200, step: 1 } };

/**
 * Style inspector panel for bullets, fraction, and progressbar pagination controls.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Pagination style panel element.
 */
const PaginationStylePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const {
		paginationType,
		paginationPositionType,
		paginationDotsPosition,
		paginationDotsPositionUnits,
		paginationProgressbarPosition,
		paginationProgressbarPositionUnits,
		paginationOutsideOffset,
		paginationOutsideOffsetUnits,
		paginationDotsSwitcher,
		paginationNormalDotsWidth,
		paginationNormalDotsWidthUnits,
		paginationNormalDotsHeight,
		paginationNormalDotsHeightUnits,
		paginationNormalDotsBgColor,
		paginationActiveDotsWidth,
		paginationActiveDotsWidthUnits,
		paginationActiveDotsHeight,
		paginationActiveDotsHeightUnits,
		paginationActiveDotsBgColor,
		paginationProgressbarBGColorSwitcher,
		paginationProgressbarBGColor,
		paginationProgressbarBGActiveColor,
		paginationProgressbarHeight,
		paginationProgressbarHeightUnits,
	} = attributes;

	return (
		<PanelBody
			title={ __( 'Pagination', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			{ ( paginationType === 'bullets' ||
				paginationType === 'fraction' ) && (
				<ResponsiveRangeControl
					label={ __( 'Position', 'gslider-blocks' ) }
					rangeValue={ paginationDotsPosition }
					onChangeValue={ ( value ) =>
						setAttributes( { paginationDotsPosition: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { paginationDotsPositionUnits: value } )
					}
					deviceType={ deviceType }
					units={ paginationDotsPositionUnits }
					resetFallbackValue=""
					unitBounds={ POSITION_UNIT_BOUNDS }
				/>
			) }

			{ paginationType === 'progressbar' && (
				<ResponsiveRangeControl
					label={ __( 'Position', 'gslider-blocks' ) }
					rangeValue={ paginationProgressbarPosition }
					onChangeValue={ ( value ) =>
						setAttributes( {
							paginationProgressbarPosition: value,
						} )
					}
					onUnitChange={ ( value ) =>
						setAttributes( {
							paginationProgressbarPositionUnits: value,
						} )
					}
					deviceType={ deviceType }
					units={ paginationProgressbarPositionUnits }
					resetFallbackValue=""
					unitBounds={ POSITION_UNIT_BOUNDS }
				/>
			) }

			{ paginationPositionType === 'outside' && (
				<ResponsiveRangeControl
					label={ __( 'Outside Offset', 'gslider-blocks' ) }
					rangeValue={ paginationOutsideOffset }
					onChangeValue={ ( value ) =>
						setAttributes( { paginationOutsideOffset: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { paginationOutsideOffsetUnits: value } )
					}
					deviceType={ deviceType }
					units={ paginationOutsideOffsetUnits }
					resetFallbackValue={ { px: '30' } }
					unitBounds={ SIZE_UNIT_BOUNDS }
				/>
			) }

			<BoundSpacingControl
				label={ __( 'Margin', 'gslider-blocks' ) }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				keys={ spacingKeys( 'paginationDots', 'Margin', false ) }
			/>

			{ paginationType === 'bullets' && (
				<>
					<SwitcherControl
						label={ __( 'Bullets Style', 'gslider-blocks' ) }
						options={ NORMAL_ACTIVE }
						value={ paginationDotsSwitcher }
						onChange={ ( value ) =>
							setAttributes( { paginationDotsSwitcher: value } )
						}
					/>

					{ paginationDotsSwitcher === 'normal' && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Width', 'gslider-blocks' ) }
								rangeValue={ paginationNormalDotsWidth }
								onChangeValue={ ( value ) =>
									setAttributes( {
										paginationNormalDotsWidth: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										paginationNormalDotsWidthUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ paginationNormalDotsWidthUnits }
								resetFallbackValue={ DOTS_SIZE_FALLBACKS }
								unitBounds={ SIZE_UNIT_BOUNDS }
							/>

							<ResponsiveRangeControl
								label={ __( 'Height', 'gslider-blocks' ) }
								rangeValue={ paginationNormalDotsHeight }
								onChangeValue={ ( value ) =>
									setAttributes( {
										paginationNormalDotsHeight: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										paginationNormalDotsHeightUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ paginationNormalDotsHeightUnits }
								resetFallbackValue={ DOTS_SIZE_FALLBACKS }
								unitBounds={ SIZE_UNIT_BOUNDS }
							/>

							<ColorControl
								label={ __( 'Color', 'gslider-blocks' ) }
								color={ paginationNormalDotsBgColor }
								onChangeColor={ ( value ) =>
									setAttributes( {
										paginationNormalDotsBgColor: value,
									} )
								}
								defaultColor="#333333"
							/>

							<BoundBorderGroup
								prefix="paginationNormalDots"
								deviceType={ deviceType }
								attributes={ attributes }
								setAttributes={ setAttributes }
								borderWidthKeys={ spacingKeys(
									'paginationNormalDots',
									'Border',
									false
								) }
								borderRadiusKeys={ spacingKeys(
									'paginationNormalDots',
									'BorderRadius',
									false
								) }
							/>
						</>
					) }

					{ paginationDotsSwitcher === 'active' && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Width', 'gslider-blocks' ) }
								rangeValue={ paginationActiveDotsWidth }
								onChangeValue={ ( value ) =>
									setAttributes( {
										paginationActiveDotsWidth: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										paginationActiveDotsWidthUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ paginationActiveDotsWidthUnits }
								resetFallbackValue={ DOTS_SIZE_FALLBACKS }
								unitBounds={ SIZE_UNIT_BOUNDS }
							/>

							<ResponsiveRangeControl
								label={ __( 'Height', 'gslider-blocks' ) }
								rangeValue={ paginationActiveDotsHeight }
								onChangeValue={ ( value ) =>
									setAttributes( {
										paginationActiveDotsHeight: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										paginationActiveDotsHeightUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ paginationActiveDotsHeightUnits }
								resetFallbackValue={ DOTS_SIZE_FALLBACKS }
								unitBounds={ SIZE_UNIT_BOUNDS }
							/>

							<ColorControl
								label={ __( 'Color', 'gslider-blocks' ) }
								color={ paginationActiveDotsBgColor }
								onChangeColor={ ( value ) =>
									setAttributes( {
										paginationActiveDotsBgColor: value,
									} )
								}
							/>

							<BoundBorderGroup
								prefix="paginationActiveDots"
								deviceType={ deviceType }
								attributes={ attributes }
								setAttributes={ setAttributes }
								borderWidthKeys={ spacingKeys(
									'paginationActiveDots',
									'Border',
									false
								) }
								borderRadiusKeys={ spacingKeys(
									'paginationActiveDots',
									'BorderRadius',
									false
								) }
							/>
						</>
					) }
				</>
			) }

			{ paginationType === 'fraction' && (
				<>
					<BoundTypographyControl
						prefix="paginationFraction"
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>

					<BoundColorSwitcherControl
						label={ __( 'Color', 'gslider-blocks' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						switcherKey="paginationFractionColorSwitcher"
						normalKey="paginationFractionColor"
						hoverKey="paginationFractionColorHover"
						defaultColor=""
					/>
				</>
			) }

			{ paginationType === 'progressbar' && (
				<>
					<SwitcherControl
						label={ __( 'Background Color', 'gslider-blocks' ) }
						options={ NORMAL_ACTIVE }
						value={ paginationProgressbarBGColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								paginationProgressbarBGColorSwitcher: value,
							} )
						}
					/>

					{ paginationProgressbarBGColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ paginationProgressbarBGColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									paginationProgressbarBGColor: value,
								} )
							}
							defaultColor=""
						/>
					) }

					{ paginationProgressbarBGColorSwitcher === 'active' && (
						<ColorControl
							label={ __( 'Active Color', 'gslider-blocks' ) }
							color={ paginationProgressbarBGActiveColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									paginationProgressbarBGActiveColor: value,
								} )
							}
							defaultColor=""
						/>
					) }

					<ResponsiveRangeControl
						label={ __( 'Height', 'gslider-blocks' ) }
						rangeValue={ paginationProgressbarHeight }
						onChangeValue={ ( value ) =>
							setAttributes( {
								paginationProgressbarHeight: value,
							} )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								paginationProgressbarHeightUnits: value,
							} )
						}
						deviceType={ deviceType }
						units={ paginationProgressbarHeightUnits }
						resetFallbackValue={ PROGRESSBAR_HEIGHT_FALLBACKS }
						unitBounds={ SIZE_UNIT_BOUNDS }
					/>
				</>
			) }
		</PanelBody>
	);
};

export default PaginationStylePanel;
