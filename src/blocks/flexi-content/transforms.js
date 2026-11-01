import { createBlock } from '@wordpress/blocks';

/**
 * Builds a transform that wraps the selected source blocks in a Flexi Content slider, one slide per block.
 * Each source block is kept as is inside its slide, so cover background and group styles are not lost.
 *
 * @param {string} name Source block name, e.g. 'core/cover'.
 * @return {Function} Transform callback that takes the attributes and inner blocks of each selected block and returns the Flexi Content block.
 */
const toFlexiContent = ( name ) => ( attributes, innerBlocks ) =>
	createBlock(
		'gslider-blocks/flexi-content',
		{},
		attributes.map( ( blockAttributes, index ) =>
			createBlock( 'gslider-blocks/flexi-content-item', {}, [
				createBlock( name, blockAttributes, innerBlocks[ index ] ),
			] )
		)
	);

const transforms = {
	from: [
		...[ 'core/cover', 'core/group' ].map( ( name ) => ( {
			type: 'block',
			isMultiBlock: true,
			blocks: [ name ],
			transform: toFlexiContent( name ),
		} ) ),
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			// Dynamic and empty galleries have no image blocks, so there is nothing to convert.
			isMatch: ( { dynamicContent }, block ) =>
				! dynamicContent && block?.innerBlocks?.length > 0,
			// Each gallery image becomes its own slide. Image attributes hold url, alt and caption.
			transform: ( { anchor }, innerBlocks ) =>
				createBlock(
					'gslider-blocks/flexi-content',
					{ globalID: anchor || '' },
					innerBlocks.map( ( image ) =>
						createBlock( 'gslider-blocks/flexi-content-item', {}, [
							createBlock( 'core/image', image.attributes ),
						] )
					)
				),
		},
	],
};

export default transforms;
