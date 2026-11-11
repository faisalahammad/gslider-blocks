/* eslint-disable jsdoc/require-returns-description */
export const DEFAULT_POST_CAROUSEL_CONTENT_ORDER = [
	'thumbnail',
	'categories',
	'title',
	'excerpt',
	'meta',
	'readmore',
];

/**
 * Normalize saved contentOrder array while ensuring all default items
 * are present and duplicate keys are filtered out.
 *
 * @param {string[]} order
 * @return {string[]}
 */
export const normalizeContentOrder = ( order ) => {
	if ( ! Array.isArray( order ) || order.length === 0 ) {
		return [ ...DEFAULT_POST_CAROUSEL_CONTENT_ORDER ];
	}

	const normalizedOrder = order.filter(
		( key, index ) =>
			DEFAULT_POST_CAROUSEL_CONTENT_ORDER.includes( key ) &&
			order.indexOf( key ) === index
	);

	DEFAULT_POST_CAROUSEL_CONTENT_ORDER.forEach( ( key ) => {
		if ( ! normalizedOrder.includes( key ) ) {
			normalizedOrder.push( key );
		}
	} );

	return normalizedOrder;
};
