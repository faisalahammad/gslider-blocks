/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { PAGINATION_POSITION_TYPE, PAGINATION_TYPE } from '@Constants';
import SwitcherControl from '@Components/switcher-control';
import Select2Control from '@Components/select2-control';

/**
 * General inspector panel for pagination placement, type, and dynamic bullets.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Pagination settings panel element.
 */
const PaginationSettingsPanel = ( {
	attributes,
	setAttributes,
	isOpen,
	onToggle,
} ) => {
	const { paginationPositionType, paginationType, dynamicBullets } =
		attributes;

	return (
		<PanelBody
			title={ __( 'Pagination', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<SwitcherControl
				label={ __( 'Position', 'gslider-blocks' ) }
				options={ PAGINATION_POSITION_TYPE }
				value={ paginationPositionType }
				onChange={ ( value ) =>
					setAttributes( { paginationPositionType: value } )
				}
			/>

			<Select2Control
				label={ __( 'Type', 'gslider-blocks' ) }
				options={ PAGINATION_TYPE }
				value={ paginationType }
				onChange={ ( value ) =>
					setAttributes( { paginationType: value } )
				}
			/>

			{ paginationType === 'bullets' && (
				<ToggleControl
					label={ __( 'Dynamic Bullets', 'gslider-blocks' ) }
					checked={ dynamicBullets }
					onChange={ ( value ) =>
						setAttributes( { dynamicBullets: value } )
					}
				/>
			) }
		</PanelBody>
	);
};

export default PaginationSettingsPanel;
