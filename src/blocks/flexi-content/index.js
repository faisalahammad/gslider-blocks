import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import attributes from './attributes.js';
import Icon from './icon';
import deprecated from './deprecated';
import transforms from './transforms';

registerBlockType( metadata.name, {
	attributes,
	edit: Edit,
	save,
	icon: Icon,
	deprecated,
	transforms,
} );
