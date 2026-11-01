import { createBlock } from '@wordpress/blocks';

// Keep the source block as is inside slide 1, so cover background and group styles are not lost.
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
