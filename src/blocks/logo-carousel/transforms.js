import { createBlock } from '@wordpress/blocks';

/**
 * Build a transform that converts a native core/gallery block (partner/sponsor logos)
 * into a Logo Carousel block. Each gallery image becomes one logo carousel entry.
 *
 * Gallery image blocks carry `id`, `url`, `alt`, `caption` and `title` in their
 * attributes. The carousel's logo item schema is
 * `{ id, url, alt, link, caption, tooltipText }`, so we map the known fields and
 * leave `link` and `tooltipText` empty so the editor controls can fill them in.
 *
 * @param {Object} galleryAttributes The gallery's own attributes (columns, linkTo,
 *                                   sizeSlug, etc.). Only schema-compatible fields are
 *                                   carried forward; everything else is discarded.
 * @return {Function} Transform callback for @wordpress/blocks.
 */
const toLogoCarousel =
	( galleryAttributes ) => ( _attributes, innerBlocks ) => {
		const logos = innerBlocks
			// Only accept direct child image blocks; nested images are ignored.
			.filter( ( { name } ) => name === 'core/image' )
			.map( ( { attributes: image } ) => ( {
				id: Number.isInteger( image.id ) ? image.id : 0,
				url: image.url || '',
				alt: image.alt || image.title || '',
				caption: image.caption || '',
				link: '',
				tooltipText: '',
			} ) );

		// Carry over the gallery's layout intent, but only fields the carousel schema
		// can consume. Everything else (linkTo, sizeSlug, columns, order, etc.) is lost
		// by design because the Logo Carousel block manages its own layout.
		const safeAttributes = {
			columns: galleryAttributes.columns,
			linkTo: galleryAttributes.linkTo,
			sizeSlug: galleryAttributes.sizeSlug,
		};

		return createBlock(
			'gslider-blocks/logo-carousel',
			{ ...safeAttributes },
			[]
		).setAttributes( { logos } );
	};

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			// Dynamic and empty galleries have no image blocks to convert.
			isMatch: ( { dynamicContent }, block ) =>
				! dynamicContent && block?.innerBlocks?.length > 0,
			transform: ( attributes, innerBlocks ) =>
				toLogoCarousel( attributes )( attributes, innerBlocks ),
		},
	],
};

export default transforms;
