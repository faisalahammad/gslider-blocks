/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';

const TOGGLE_ITEMS = [
	{ key: 'showNavigation', label: __( 'Show Navigation', 'gslider-blocks' ) },
	{ key: 'showPagination', label: __( 'Show Pagination', 'gslider-blocks' ) },
	{
		key: 'showFeaturedImage',
		label: __( 'Show Featured Image', 'gslider-blocks' ),
	},
	{ key: 'showPostTitle', label: __( 'Show Post Title', 'gslider-blocks' ) },
	{ key: 'showExcerpt', label: __( 'Show Excerpt', 'gslider-blocks' ) },
	{ key: 'showMeta', label: __( 'Show Post Meta', 'gslider-blocks' ) },
	{ key: 'showTaxonomy', label: __( 'Show Taxonomy', 'gslider-blocks' ) },
	{
		key: 'showReadMoreButton',
		label: __( 'Show Read More Button', 'gslider-blocks' ),
	},
];

/**
 * Inspector panel for toggling post card and slider element visibility per device.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Show/Hide panel element.
 */
const ShowHidePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => (
	<PanelBody
		title={ __( 'Show / Hide Elements', 'gslider-blocks' ) }
		opened={ isOpen }
		onToggle={ onToggle }
	>
		{ TOGGLE_ITEMS.map( ( { key, label } ) => (
			<ResponsiveToggleControl
				key={ key }
				label={ label }
				toggleValue={ attributes[ key ] }
				setToggleValue={ ( value ) =>
					setAttributes( { [ key ]: value } )
				}
				deviceType={ deviceType }
				setAttributes={ setAttributes }
			/>
		) ) }
	</PanelBody>
);

export default ShowHidePanel;
