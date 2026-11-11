/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import {
	spacingKeys,
	BoundBorderGroup,
	BoundSpacingControl,
} from '../sharedControls';

const PX_SIZE_FALLBACKS = { Desktop: '80', Tablet: '64', Mobile: '56' };
const REL_SIZE_FALLBACKS = { Desktop: '5', Tablet: '4', Mobile: '3.5' };

/**
 * Style inspector panel for post author avatar visibility, size, border, and spacing.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Author image style panel element.
 */
const AuthorImageStylePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const { showMetaAvatar, authorImageSize, authorImageSizeUnits } =
		attributes;

	const relDefault = REL_SIZE_FALLBACKS[ deviceType ] || '3.5';
	const sizeFallbacks = {
		px: PX_SIZE_FALLBACKS[ deviceType ] || '56',
		'%': relDefault,
		vh: relDefault,
		vw: relDefault,
		em: relDefault,
		rem: relDefault,
	};

	return (
		<PanelBody
			title={ __( 'Author Image', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ResponsiveToggleControl
				label={ __( 'Show Author Avatar', 'gslider-blocks' ) }
				toggleValue={ showMetaAvatar }
				setToggleValue={ ( value ) =>
					setAttributes( { showMetaAvatar: value } )
				}
				deviceType={ deviceType }
				setAttributes={ setAttributes }
			/>
			{ ( showMetaAvatar?.[ deviceType ] ?? true ) && (
				<>
					<ResponsiveRangeControl
						label={ __( 'Size', 'gslider-blocks' ) }
						rangeValue={ authorImageSize }
						onChangeValue={ ( value ) =>
							setAttributes( { authorImageSize: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( { authorImageSizeUnits: value } )
						}
						deviceType={ deviceType }
						units={ authorImageSizeUnits }
						resetFallbackValue={ sizeFallbacks }
						unitBounds={ { px: { min: 0, max: 500, step: 1 } } }
					/>

					<BoundBorderGroup
						prefix="authorImage"
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
						hideWidthColorOnNone={ true }
						defaultBorderColor=""
						borderWidthKeys={ spacingKeys(
							'authorImage',
							'BorderWidth',
							false
						) }
						borderRadiusKeys={ spacingKeys(
							'authorImage',
							'BorderRadius',
							false
						) }
					/>

					<BoundSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
						keys={ spacingKeys( 'authorImage', 'Margin', false ) }
					/>

					<BoundSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						attributes={ attributes }
						setAttributes={ setAttributes }
						keys={ spacingKeys( 'authorImage', 'Padding', false ) }
					/>
				</>
			) }
		</PanelBody>
	);
};

export default AuthorImageStylePanel;
