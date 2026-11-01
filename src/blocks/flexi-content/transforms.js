import { createBlock } from '@wordpress/blocks';

/**
 * Builds a transform that wraps the source block in a Flexi Content slider.
 * The source block is kept as is inside slide 1, so cover background and group styles are not lost.
 *
 * @param {string} name Source block name, e.g. 'core/cover'.
 * @return {Function} Transform callback that takes the source attributes and inner blocks and returns the Flexi Content block.
 */
const toFlexiContent = ( name ) => ( attributes, innerBlocks ) =>
	createBlock( 'gslider-blocks/flexi-content', {}, [
		createBlock( 'gslider-blocks/flexi-content-item', {}, [
			createBlock( name, attributes, innerBlocks ),
		] ),
	] );

const transforms = {
	from: [ 'core/cover', 'core/group' ].map( ( name ) => ( {
		type: 'block',
		blocks: [ name ],
		transform: toFlexiContent( name ),
	} ) ),
};

export default transforms;
