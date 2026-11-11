/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';
import {
	spacingKeys,
	BoundTypographyControl,
	BoundColorSwitcherControl,
	BoundSpacingControl,
} from '../sharedControls';

/**
 * Style inspector panel for post publish date visibility, typography, colors, and spacing.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Post date style panel element.
 */
const PostDateStylePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const { showMetaDate } = attributes;

	return (
		<PanelBody
			title={ __( 'Post Date', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ResponsiveToggleControl
				label={ __( 'Show Date', 'gslider-blocks' ) }
				toggleValue={ showMetaDate }
				setToggleValue={ ( value ) =>
					setAttributes( { showMetaDate: value } )
				}
				deviceType={ deviceType }
				setAttributes={ setAttributes }
			/>
			{ ( showMetaDate?.[ deviceType ] ?? true ) && (
				<>
					<BoundTypographyControl
						prefix="postDate"
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
						includeDeviceTypeChange={ true }
					/>

					<BoundColorSwitcherControl
						label={ __( 'Color', 'gslider-blocks' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						switcherKey="postDateColorSwitcher"
						normalKey="postDateColor"
						hoverKey="postDateColorHover"
						defaultColor=""
					/>

					<BoundSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
						keys={ spacingKeys( 'postDate', 'Margin', false ) }
					/>

					<BoundSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
						keys={ spacingKeys( 'postDate', 'Padding', false ) }
					/>
				</>
			) }
		</PanelBody>
	);
};

export default PostDateStylePanel;
