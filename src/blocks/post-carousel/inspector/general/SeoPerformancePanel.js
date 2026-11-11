import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';

/**
 * General inspector panel for Google Carousel SEO structured data (JSON-LD) controls.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} SEO and structured data settings panel element.
 */
const SeoPerformancePanel = ( {
	attributes,
	setAttributes,
	isOpen,
	onToggle,
} ) => (
	<PanelBody
		title={ __( 'SEO & Structured Data', 'gslider-blocks' ) }
		opened={ isOpen }
		onToggle={ onToggle }
		initialOpen={ false }
	>
		<ToggleControl
			__nextHasNoMarginBottom
			label={ __(
				'Output ItemList Structured Data (JSON-LD)',
				'gslider-blocks'
			) }
			help={ __(
				'Generates ItemList and BlogPosting structured data to help search engines recognize carousel content.',
				'gslider-blocks'
			) }
			checked={ attributes.enableSchemaMarkup ?? true }
			onChange={ ( value ) =>
				setAttributes( { enableSchemaMarkup: value } )
			}
		/>
	</PanelBody>
);

export default SeoPerformancePanel;
