/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { TEXT_ALIGN } from '@Constants';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import {
	spacingKeys,
	BoundTypographyControl,
	BoundColorSwitcherControl,
	BoundBackgroundControl,
	BoundBorderGroup,
	BoundBoxShadowControl,
	BoundSpacingControl,
} from '../sharedControls';

/**
 * Shared style inspector panel for post categories and tags taxonomy badges.
 *
 * @param {Object}   props               Component properties.
 * @param {string}   props.title         Panel heading label ('Categories' or 'Tags').
 * @param {string}   props.prefix        Attribute prefix ('postCategory' or 'postTag').
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Taxonomy style panel element.
 */
const TaxonomyStylePanel = ( {
	title,
	prefix,
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const alignKey = `${ prefix }Align`;
	const gapKey = `${ prefix }Gap`;
	const gapUnitsKey = `${ prefix }GapUnits`;

	return (
		<PanelBody title={ title } opened={ isOpen } onToggle={ onToggle }>
			<BoundTypographyControl
				prefix={ prefix }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<ResponsiveAlignmentControl
				label={ __( 'Alignment', 'gslider-blocks' ) }
				options={ TEXT_ALIGN }
				alignmentValue={ attributes[ alignKey ] }
				setAlignmentValue={ ( value ) =>
					setAttributes( { [ alignKey ]: value } )
				}
				deviceType={ deviceType }
				setAttributes={ setAttributes }
			/>

			<BoundColorSwitcherControl
				label={ __( 'Text Color', 'gslider-blocks' ) }
				attributes={ attributes }
				setAttributes={ setAttributes }
				switcherKey={ `${ prefix }ColorSwitcher` }
				normalKey={ `${ prefix }Color` }
				hoverKey={ `${ prefix }ColorHover` }
				defaultColor=""
			/>

			<BoundBackgroundControl
				label={ __( 'Background Color', 'gslider-blocks' ) }
				prefix={ prefix }
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
			/>

			<BoundBorderGroup
				prefix={ prefix }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				hideWidthColorOnNone={ true }
				normalBorderLabel={ __( 'Border Color', 'gslider-blocks' ) }
				borderWidthKeys={ spacingKeys( prefix, 'Border', true ) }
				borderRadiusKeys={ spacingKeys( prefix, 'BorderRadius', true ) }
			/>

			<BoundBoxShadowControl
				prefix={ prefix }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<ResponsiveRangeControl
				min={ 0 }
				max={ 100 }
				label={ __( 'Gap', 'gslider-blocks' ) }
				rangeValue={ attributes[ gapKey ] }
				onChangeValue={ ( value ) =>
					setAttributes( { [ gapKey ]: value } )
				}
				onUnitChange={ ( value ) =>
					setAttributes( { [ gapUnitsKey ]: value } )
				}
				deviceType={ deviceType }
				units={ attributes[ gapUnitsKey ] }
				resetFallbackValue={ {
					px: '5',
					em: '0.5',
					rem: '0.5',
				} }
			/>

			<BoundSpacingControl
				label={ __( 'Margin', 'gslider-blocks' ) }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				keys={ spacingKeys( prefix, 'Margin', false ) }
			/>

			<BoundSpacingControl
				label={ __( 'Padding', 'gslider-blocks' ) }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				keys={ spacingKeys( prefix, 'Padding', false ) }
			/>

			<BoundSpacingControl
				label={ __( 'Item Padding', 'gslider-blocks' ) }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				keys={ spacingKeys( `${ prefix }Item`, 'Padding', false ) }
			/>
		</PanelBody>
	);
};

export default TaxonomyStylePanel;
