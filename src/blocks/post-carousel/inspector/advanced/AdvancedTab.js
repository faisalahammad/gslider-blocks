/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import InputControls from '@Components/input-control';
import {
	spacingKeys,
	BoundSpacingControl,
	BoundBackgroundControl,
	BoundBorderGroup,
	BoundBoxShadowControl,
} from '../sharedControls';

/**
 * Renders the Advanced inspector tab for wrapper layout, background, border, and box shadow.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {string}   props.openPanel     Currently expanded advanced panel key.
 * @param {Function} props.onTogglePanel Accordion toggle callback for panel key.
 * @return {Element} Advanced inspector tab content.
 */
const AdvancedTab = ( {
	attributes,
	setAttributes,
	deviceType,
	openPanel,
	onTogglePanel,
} ) => {
	const { globalZIndex, globalID, globalClass } = attributes;

	return (
		<>
			<PanelBody
				title={ __( 'Layout', 'gslider-blocks' ) }
				opened={ openPanel === 'layout' }
				onToggle={ () => onTogglePanel( 'layout' ) }
			>
				<BoundSpacingControl
					label={ __( 'Margin', 'gslider-blocks' ) }
					deviceType={ deviceType }
					attributes={ attributes }
					setAttributes={ setAttributes }
					keys={ spacingKeys( 'global', 'Margin', true ) }
				/>

				<BoundSpacingControl
					label={ __( 'Padding', 'gslider-blocks' ) }
					deviceType={ deviceType }
					attributes={ attributes }
					setAttributes={ setAttributes }
					keys={ spacingKeys( 'global', 'Padding', true ) }
				/>

				<ResponsiveRangeControl
					min={ -999 }
					max={ 9999 }
					label={ __( 'Z Index', 'gslider-blocks' ) }
					rangeValue={ globalZIndex }
					onChangeValue={ ( value ) =>
						setAttributes( { globalZIndex: value } )
					}
					deviceType={ deviceType }
					step={ 1 }
					resetFallbackValue=""
					isRangeUnit={ false }
				/>

				<InputControls
					label={ __( 'CSS ID', 'gslider-blocks' ) }
					value={ globalID }
					onChangeValue={ ( value ) =>
						setAttributes( { globalID: value } )
					}
					helpText={ __(
						'Add an ID to the block wrapper.',
						'gslider-blocks'
					) }
				/>

				<InputControls
					label={ __( 'CSS Classes', 'gslider-blocks' ) }
					value={ globalClass }
					onChangeValue={ ( value ) =>
						setAttributes( { globalClass: value } )
					}
					helpText={ __(
						'Separate with spaces key.',
						'gslider-blocks'
					) }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Background', 'gslider-blocks' ) }
				opened={ openPanel === 'background' }
				onToggle={ () => onTogglePanel( 'background' ) }
			>
				<BoundBackgroundControl
					label={ __( 'Background', 'gslider-blocks' ) }
					prefix="global"
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					passDeviceProps={ true }
					includeImageProps={ true }
					includeIsBackgroundImage={ false }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Border and Shadow', 'gslider-blocks' ) }
				opened={ openPanel === 'border-shadow' }
				onToggle={ () => onTogglePanel( 'border-shadow' ) }
			>
				<BoundBorderGroup
					prefix="global"
					deviceType={ deviceType }
					attributes={ attributes }
					setAttributes={ setAttributes }
					borderWidthLabel={ __( 'Border', 'gslider-blocks' ) }
					borderWidthKeys={ spacingKeys( 'global', 'Border', true ) }
					borderRadiusKeys={ spacingKeys(
						'global',
						'BorderRadius',
						true
					) }
				/>

				<BoundBoxShadowControl
					prefix="global"
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</PanelBody>
		</>
	);
};

export default AdvancedTab;
