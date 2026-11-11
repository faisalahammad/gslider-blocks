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
 * Style inspector panel for post author name visibility, typography, colors, and spacing.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Author name style panel element.
 */
const AuthorNameStylePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const { showMetaAuthor } = attributes;

	return (
		<PanelBody
			title={ __( 'Author Name', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ResponsiveToggleControl
				label={ __( 'Show Author Name', 'gslider-blocks' ) }
				toggleValue={ showMetaAuthor }
				setToggleValue={ ( value ) =>
					setAttributes( { showMetaAuthor: value } )
				}
				deviceType={ deviceType }
				setAttributes={ setAttributes }
			/>
			{ ( showMetaAuthor?.[ deviceType ] ?? true ) && (
				<>
					<BoundTypographyControl
						prefix="authorName"
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>

					<BoundColorSwitcherControl
						label={ __( 'Color', 'gslider-blocks' ) }
						attributes={ attributes }
						setAttributes={ setAttributes }
						switcherKey="authorNameColorSwitcher"
						normalKey="authorNameColor"
						hoverKey="authorNameColorHover"
						defaultColor=""
					/>

					<BoundSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
						keys={ spacingKeys( 'authorName', 'Margin', false ) }
					/>

					<BoundSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
						keys={ spacingKeys( 'authorName', 'Padding', false ) }
					/>
				</>
			) }
		</PanelBody>
	);
};

export default AuthorNameStylePanel;
