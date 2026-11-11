/* eslint-disable react-hooks/exhaustive-deps */
import { useSelect } from '@wordpress/data';

/**
 * Custom hook to fetch post type records using WP Core entity stores.
 *
 * @param {Object} queryArgs Query parameters for the request.
 * @param {string} postType  WordPress post type slug (e.g. 'post', 'page', 'product').
 * @return {Object}          Returns { posts, isLoading }
 */
export const usePostQuery = ( queryArgs = {}, postType = 'post' ) => {
	// Sanitize and filter empty parameters to prevent REST query pollution
	const sanitizedQueryArgs = Object.keys( queryArgs ).reduce(
		( acc, key ) => {
			const val = queryArgs[ key ];
			if ( val !== undefined && val !== null && val !== '' ) {
				if ( Array.isArray( val ) ) {
					if ( val.length > 0 ) {
						acc[ key ] = val;
					}
				} else {
					acc[ key ] = val;
				}
			}
			return acc;
		},
		{}
	);

	return useSelect(
		( select ) => {
			const { getEntityRecords, isResolving } = select( 'core' );

			const query = {
				_embed: true, // Always embed author and media entities
				...sanitizedQueryArgs,
			};

			// Format taxonomy and author filter arrays to integer arrays as expected by core store API
			const idArrayKeys = [
				'exclude',
				'categories',
				'categories_exclude',
				'tags',
				'tags_exclude',
				'author',
				'author_exclude',
			];

			idArrayKeys.forEach( ( key ) => {
				if ( query[ key ] ) {
					if ( typeof query[ key ] === 'string' ) {
						query[ key ] = query[ key ]
							.split( ',' )
							.map( ( id ) => parseInt( id.trim(), 10 ) )
							.filter( ( id ) => ! isNaN( id ) );
					} else if ( Array.isArray( query[ key ] ) ) {
						query[ key ] = query[ key ]
							.map( ( id ) => parseInt( id, 10 ) )
							.filter( ( id ) => ! isNaN( id ) );
					}
				}
			} );

			return {
				posts: getEntityRecords( 'postType', postType, query ),
				isLoading: isResolving( 'core', 'getEntityRecords', [
					'postType',
					postType,
					query,
				] ),
			};
		},
		[ JSON.stringify( sanitizedQueryArgs ), postType ]
	);
};

export default usePostQuery;
