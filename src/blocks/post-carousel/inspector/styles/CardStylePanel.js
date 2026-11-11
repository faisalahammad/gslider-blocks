import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import {
	spacingKeys,
	BoundSpacingControl,
	BoundBackgroundControl,
	BoundBorderGroup,
	BoundBoxShadowControl,
} from '../sharedControls';

/**
 * Style inspector panel for the post card container spacing, background, border, and shadow.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Post card style panel element.
 */
const CardStylePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => (
	<PanelBody
		title={ __( 'Post Card', 'gslider-blocks' ) }
		opened={ isOpen }
		onToggle={ onToggle }
	>
		<BoundSpacingControl
			label={ __( 'Margin', 'gslider-blocks' ) }
			deviceType={ deviceType }
			attributes={ attributes }
			setAttributes={ setAttributes }
			keys={ spacingKeys( 'postCard', 'Margin', true ) }
		/>

		<BoundSpacingControl
			label={ __( 'Padding', 'gslider-blocks' ) }
			deviceType={ deviceType }
			attributes={ attributes }
			setAttributes={ setAttributes }
			keys={ spacingKeys( 'postCard', 'Padding', true ) }
		/>

		<BoundBackgroundControl
			label={ __( 'Background Color', 'gslider-blocks' ) }
			prefix="postCard"
			attributes={ attributes }
			setAttributes={ setAttributes }
			deviceType={ deviceType }
		/>

		<BoundBorderGroup
			prefix="postCard"
			deviceType={ deviceType }
			attributes={ attributes }
			setAttributes={ setAttributes }
			borderWidthKeys={ spacingKeys( 'postCard', 'Border', true ) }
			borderRadiusKeys={ spacingKeys( 'postCard', 'BorderRadius', true ) }
		/>

		<BoundBoxShadowControl
			prefix="postCard"
			attributes={ attributes }
			setAttributes={ setAttributes }
		/>
	</PanelBody>
);

export default CardStylePanel;
