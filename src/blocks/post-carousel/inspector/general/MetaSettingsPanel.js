/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import SelectControls from '@Components/select-controls';

const META_SEPARATOR_OPTIONS = [
	{ label: __( 'Bullet ( • )', 'gslider-blocks' ), value: 'bullet' },
	{ label: __( 'Pipe ( | )', 'gslider-blocks' ), value: 'pipe' },
	{ label: __( 'Slash ( / )', 'gslider-blocks' ), value: 'slash' },
	{ label: __( 'Dash ( — )', 'gslider-blocks' ), value: 'dash' },
	{ label: __( 'None', 'gslider-blocks' ), value: 'none' },
];

const DATE_FORMAT_OPTIONS = [
	{ label: __( 'Standard Date', 'gslider-blocks' ), value: 'default' },
	{
		label: __( 'Relative Time (e.g. 2 hours ago)', 'gslider-blocks' ),
		value: 'relative',
	},
];

/**
 * Inspector panel for editorial metadata settings: reading time, comment count, relative date, and separators.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Meta settings panel element.
 */
const MetaSettingsPanel = ( {
	attributes,
	setAttributes,
	isOpen,
	onToggle,
} ) => {
	const { showReadingTime, showCommentCount, dateFormat, metaSeparator } =
		attributes;

	return (
		<PanelBody
			title={ __( 'Editorial Meta Settings', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ToggleControl
				label={ __( 'Show Estimated Reading Time', 'gslider-blocks' ) }
				checked={ showReadingTime ?? true }
				onChange={ ( value ) =>
					setAttributes( { showReadingTime: value } )
				}
			/>

			<ToggleControl
				label={ __( 'Show Comment Count', 'gslider-blocks' ) }
				checked={ Boolean( showCommentCount ) }
				onChange={ ( value ) =>
					setAttributes( { showCommentCount: value } )
				}
			/>

			<SelectControls
				label={ __( 'Date Format', 'gslider-blocks' ) }
				options={ DATE_FORMAT_OPTIONS }
				value={ dateFormat || 'default' }
				onChange={ ( value ) => setAttributes( { dateFormat: value } ) }
			/>

			<SelectControls
				label={ __( 'Meta Separator', 'gslider-blocks' ) }
				options={ META_SEPARATOR_OPTIONS }
				value={ metaSeparator || 'bullet' }
				onChange={ ( value ) =>
					setAttributes( { metaSeparator: value } )
				}
			/>
		</PanelBody>
	);
};

export default MetaSettingsPanel;
