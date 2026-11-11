/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { CAROUSEL_EFFECT_OPTIONS } from '@Constants';
import Select2Control from '@Components/select2-control';

/**
 * Inspector panel for selecting the Swiper slide transition effect.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Carousel effect panel element.
 */
const CarouselEffectPanel = ( {
	attributes,
	setAttributes,
	isOpen,
	onToggle,
} ) => (
	<PanelBody
		title={ __( 'Carousel Effect', 'gslider-blocks' ) }
		opened={ isOpen }
		onToggle={ onToggle }
	>
		<Select2Control
			label={ __( 'Effect Type', 'gslider-blocks' ) }
			options={ CAROUSEL_EFFECT_OPTIONS }
			value={ attributes.carouselEffect }
			onChange={ ( value ) => setAttributes( { carouselEffect: value } ) }
		/>
	</PanelBody>
);

export default CarouselEffectPanel;
