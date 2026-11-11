import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * General inspector panel for image lazy loading performance toggles.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Performance settings panel element.
 */
const PerformanceSettingsPanel = ( {
	attributes,
	setAttributes,
	isOpen,
	onToggle,
} ) => (
	<PanelBody
		title={ __( 'Performance Settings', 'gslider-blocks' ) }
		opened={ isOpen }
		onToggle={ onToggle }
		initialOpen={ false }
	>
		<ToggleControl
			label={ __( 'Enable Lazy Loading', 'gslider-blocks' ) }
			help={ __(
				'Delay loading of images until they are in the viewport.',
				'gslider-blocks'
			) }
			checked={ attributes.enableLazyLoad }
			onChange={ ( value ) => setAttributes( { enableLazyLoad: value } ) }
		/>
	</PanelBody>
);

export default PerformanceSettingsPanel;
