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
 * Check whether an inner block is a `core/image` entry with a usable image URL.
 *
 * @param {Object} block Inner block inside `core/gallery`.
 * @return {boolean} True when the block can be converted into a logo slide.
 */
const isConvertibleImage = ( block ) =>
	block?.name === 'core/image' && !! block?.attributes?.url;

/**
 * Transform that converts a native core/gallery block (partner/sponsor logos)
 * into a Logo Carousel block. Each gallery image becomes one logo carousel entry.
 *
 * Gallery image blocks carry `id`, `url`, `alt`, `caption`, `href` in their
 * attributes. The carousel's logo item schema is
 * `{ id, url, alt, link, caption, tooltipText }`, so we map the known fields and
 * leave `tooltipText` empty so the editor controls can fill it in.
 *
 * @param {Object} [attributes={}]     The gallery's own attributes.
 * @param {string} [attributes.anchor] Optional HTML anchor carried over as `globalID`.
 * @param {Array}  [innerBlocks=[]]    The gallery's child blocks (core/image entries).
 * @return {Object} The transformed Logo Carousel block.
 */
const toLogoCarousel = ( { anchor } = {}, innerBlocks = [] ) => {
	// Every entry needs a distinct positive ID: the editor uses it for React keys
	// and per-item actions, while WP_Query absint() turns negative IDs into real
	// post IDs inside MediaUpload. Start fallback IDs from Date.now() so they
	// stay unique without colliding with WordPress attachment IDs.
	const usedIds = new Set();
	let nextFallbackId = Date.now();

	const logos = innerBlocks
		// Only accept direct child image blocks with an image URL; ignore placeholders and nested blocks.
		.filter( isConvertibleImage )
		.map( ( { attributes: image } ) => {
			let id;
			if (
				Number.isInteger( image.id ) &&
				image.id > 0 &&
				! usedIds.has( image.id )
			) {
				id = image.id;
			} else {
				while ( usedIds.has( nextFallbackId ) ) {
					nextFallbackId++;
				}
				id = nextFallbackId++;
			}
			usedIds.add( id );

			return {
				id,
				url: image.url,
				alt: image.alt || image.title || '',
				caption: toPlainText( image.caption ),
				link: image.href || '',
				tooltipText: '',
			};
		} );

	const hasCaptions = logos.some( ( logo ) => !! logo.caption );

	return createBlock( 'gslider-blocks/logo-carousel', {
		globalID: anchor || '',
		logos,
		enableLogoLinks: logos.some( ( logo ) => !! logo.link ),
		showCaption: {
			Desktop: hasCaptions,
			Tablet: hasCaptions,
			Mobile: hasCaptions,
		},
	} );
};

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			// Dynamic galleries, empty galleries, or galleries without populated images have nothing to convert.
			isMatch: ( { dynamicContent }, block ) =>
				! dynamicContent &&
				block?.innerBlocks?.some( isConvertibleImage ),
			transform: toLogoCarousel,
		},
	],
};

export default transforms;
