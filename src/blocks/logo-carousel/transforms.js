import { createBlock } from '@wordpress/blocks';

/**
 * Convert a rich-text caption (HTML markup) to plain text. The carousel stores
 * and renders captions as plain strings, so formatting tags must not leak in.
 *
 * @param {string|*} value The caption value from a core/image block.
 * @return {string} Plain text without HTML tags or entities.
 */
const toPlainText = ( value ) => {
	if ( ! value ) {
		return '';
	}
	const doc = new window.DOMParser().parseFromString(
		String( value ),
		'text/html'
	);
	return doc.body.textContent || '';
};

/**
 * Transform that converts a native core/gallery block (partner/sponsor logos)
 * into a Logo Carousel block. Each gallery image becomes one logo carousel entry.
 *
 * Gallery image blocks carry `id`, `url`, `alt`, `caption`, `href` in their
 * attributes. The carousel's logo item schema is
 * `{ id, url, alt, link, caption, tooltipText }`, so we map the known fields and
 * leave `tooltipText` empty so the editor controls can fill it in.
 *
 * @param {Object} attributes  The gallery's own attributes. Not consumed: the
 *                             Logo Carousel block manages its own layout.
 * @param {Array}  innerBlocks The gallery's child blocks (core/image entries).
 * @return {Object} The transformed Logo Carousel block.
 */
const toLogoCarousel = ( attributes, innerBlocks ) => {
	// Every entry needs a distinct ID: the editor uses it for React keys and to
	// edit or delete logos one by one. Images without a media ID, or reusing a
	// media item already in the gallery, get a negative fallback ID.
	const usedIds = new Set();
	let nextFallbackId = 0;

	const logos = innerBlocks
		// Only accept direct child image blocks; nested images are ignored.
		.filter( ( { name } ) => name === 'core/image' )
		.map( ( { attributes: image } ) => {
			let id;
			if ( Number.isInteger( image.id ) && ! usedIds.has( image.id ) ) {
				id = image.id;
			} else {
				id = --nextFallbackId;
			}
			usedIds.add( id );

			return {
				id,
				url: image.url || '',
				alt: image.alt || image.title || '',
				caption: toPlainText( image.caption ),
				link: image.href || '',
				tooltipText: '',
			};
		} );

	return createBlock( 'gslider-blocks/logo-carousel', {
		logos,
		enableLogoLinks: logos.some( ( logo ) => !! logo.link ),
		showCaption: {
			Desktop: logos.some( ( logo ) => !! logo.caption ),
			Tablet: logos.some( ( logo ) => !! logo.caption ),
			Mobile: logos.some( ( logo ) => !! logo.caption ),
		},
	} );
};

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			// Dynamic and empty galleries have nothing to convert; galleries with
			// no direct image child would produce an empty carousel.
			isMatch: ( { dynamicContent }, block ) =>
				! dynamicContent &&
				block?.innerBlocks?.some(
					( { name } ) => name === 'core/image'
				),
			transform: toLogoCarousel,
		},
	],
};

export default transforms;
