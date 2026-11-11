import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import attributes from './attributes.js';
import icon from './icon';
import transforms from './transforms';

registerBlockType( metadata.name, {
	attributes,
	edit: Edit,
	save,
	icon,
	transforms,
} );
