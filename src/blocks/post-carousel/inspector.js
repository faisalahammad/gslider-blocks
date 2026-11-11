/* eslint-disable import/no-unresolved */
import { useState, memo, useCallback } from '@wordpress/element';
import InspectorControl from '@Components/inspector-controls';
import { normalizeContentOrder } from './content-order';
import useInspectorEffects from './inspector/useInspectorEffects';
import GeneralTab from './inspector/general/GeneralTab';
import StylesTab from './inspector/styles/StylesTab';
import AdvancedTab from './inspector/advanced/AdvancedTab';
import './editor.scss';

const DEFAULT_OPEN_PANELS = {
	general: 'layout-presets',
	styles: 'post-card',
	advanced: 'layout',
};

/**
 * Post Carousel block inspector orchestrating General, Styles, and Advanced sidebar tabs.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @return {Element} Inspector sidebar tabs container.
 */
const Inspector = ( { attributes, setAttributes } ) => {
	const { deviceType, contentOrder } = attributes;

	useInspectorEffects( attributes, setAttributes );

	const normalizedContentOrder = normalizeContentOrder( contentOrder );
	const [ openPanels, setOpenPanels ] = useState( DEFAULT_OPEN_PANELS );

	const togglePanel = useCallback( ( tabName, panelKey ) => {
		setOpenPanels( ( prev ) => ( {
			...prev,
			[ tabName ]: prev[ tabName ] === panelKey ? null : panelKey,
		} ) );
	}, [] );

	return (
		<InspectorControl
			generalControls={
				<GeneralTab
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					normalizedContentOrder={ normalizedContentOrder }
					openPanel={ openPanels.general }
					onTogglePanel={ ( key ) => togglePanel( 'general', key ) }
				/>
			}
			styleControls={
				<StylesTab
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					openPanel={ openPanels.styles }
					onTogglePanel={ ( key ) => togglePanel( 'styles', key ) }
				/>
			}
			advancedControls={
				<AdvancedTab
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					openPanel={ openPanels.advanced }
					onTogglePanel={ ( key ) => togglePanel( 'advanced', key ) }
				/>
			}
		/>
	);
};

export default memo( Inspector );
