/* eslint-disable jsdoc/require-param-type */
const ALLOWED_ORDER_BY = [
	'date',
	'title',
	'name',
	'id',
	'ID',
	'author',
	'modified',
	'relevance',
	'rand',
	'comment_count',
	'menu_order',
	'meta_value',
	'meta_value_num',
];

const ALLOWED_META_COMPARE = [
	'=',
	'!=',
	'>',
	'>=',
	'<',
	'<=',
	'LIKE',
	'NOT LIKE',
	'EXISTS',
	'NOT EXISTS',
];

/**
 * Build dynamic REST API query arguments from block attributes.
 * Supports categories, tags, authors, custom taxonomies, exclusions, date ranges, sticky posts, and search keywords.
 *
 * @param {Object} attributes            Block attributes.
 * @param {string} deviceType            Current active device type (Desktop, Tablet, Mobile).
 * @param {number} currentPostId         Current editor post ID (to exclude).
 * @param {Array}  taxonomies            List of registered WordPress taxonomies.
 * @param          currentPostCategories
 * @param          currentPostTags
 * @return {Object}             Formed query object for usePostQuery.
 */
export const getPostQueryArgs = (
	attributes,
	deviceType = 'Desktop',
	currentPostId = null,
	taxonomies = [],
	currentPostCategories = [],
	currentPostTags = []
) => {
	const {
		postType = 'post',
		postsPerPage = 6,
		categories = [],
		categoryFilterType = 'include',
		tags = [],
		tagFilterType = 'include',
		authors = [],
		authorFilterType = 'include',
		excludePosts = '',
		offset = 0,
		orderBy = 'date',
		order = 'desc',
		searchQuery = '',
		stickyPosts = 'include',
		taxonomyQuery = {},
		taxonomyFilterTypes = {},
		excludeCurrentPost = false,
		metaKey = '',
		metaValue = '',
		metaCompare = '=',
		dateRange = 'any',
		useRelatedPostsQuery = false,
		relatedPostsTaxonomy = 'category',
	} = attributes;

	// Resolve responsive posts count and offset
	const rawPostsPerPage =
		typeof postsPerPage === 'object'
			? postsPerPage?.[ deviceType ]
			: postsPerPage;
	const parsedPostsPerPage = parseInt( rawPostsPerPage, 10 );
	const activePostsPerPage = Math.min(
		30,
		Math.max(
			1,
			Number.isNaN( parsedPostsPerPage ) ? 6 : parsedPostsPerPage
		)
	);

	const activeOffset =
		typeof offset === 'object'
			? parseInt( offset?.[ deviceType ] ) || 0
			: parseInt( offset ) || 0;

	// Initial base query
	let safeOrderBy = ALLOWED_ORDER_BY.includes( orderBy ) ? orderBy : 'date';
	if ( safeOrderBy === 'name' ) {
		safeOrderBy = 'slug';
	} else if ( safeOrderBy === 'ID' ) {
		safeOrderBy = 'id';
	}
	if (
		[ 'meta_value', 'meta_value_num' ].includes( safeOrderBy ) &&
		( ! metaKey || useRelatedPostsQuery )
	) {
		safeOrderBy = 'date';
	}
	const normalizedOrder =
		typeof order === 'string' ? order.toLowerCase() : '';
	const safeOrder = [ 'asc', 'desc' ].includes( normalizedOrder )
		? normalizedOrder
		: 'desc';

	const queryArgs = {
		per_page: Math.min( 30, Math.max( 1, activePostsPerPage ) ),
		status: 'publish',
		orderby: safeOrderBy,
		order: safeOrder,
	};

	// Apply offset
	const safeOffset = Math.max( 0, Math.min( 100, activeOffset ) );
	if ( safeOffset > 0 ) {
		queryArgs.offset = safeOffset;
	}

	// Exclude posts
	const excludedIds = excludePosts
		? excludePosts
				.split( ',' )
				.map( ( id ) => parseInt( id.trim(), 10 ) )
				.filter( ( id ) => ! isNaN( id ) )
		: [];

	if ( ( excludeCurrentPost || useRelatedPostsQuery ) && currentPostId ) {
		excludedIds.push( currentPostId );
	}

	if ( excludedIds.length > 0 ) {
		queryArgs.exclude = excludedIds;
	}

	if ( useRelatedPostsQuery ) {
		// Apply dynamic related post taxonomy query
		let hasTaxonomyMatch = false;

		if (
			relatedPostsTaxonomy === 'category' ||
			relatedPostsTaxonomy === 'both'
		) {
			if ( currentPostCategories && currentPostCategories.length > 0 ) {
				const catIds = currentPostCategories
					.map( ( id ) => parseInt( id, 10 ) )
					.filter( ( id ) => ! isNaN( id ) );
				if ( catIds.length > 0 ) {
					queryArgs.categories = catIds;
					hasTaxonomyMatch = true;
				}
			}
		}

		if (
			relatedPostsTaxonomy === 'post_tag' ||
			relatedPostsTaxonomy === 'both'
		) {
			if ( currentPostTags && currentPostTags.length > 0 ) {
				const tagIds = currentPostTags
					.map( ( id ) => parseInt( id, 10 ) )
					.filter( ( id ) => ! isNaN( id ) );
				if ( tagIds.length > 0 ) {
					queryArgs.tags = tagIds;
					hasTaxonomyMatch = true;
				}
			}
		}

		if (
			queryArgs.categories &&
			queryArgs.categories.length > 0 &&
			queryArgs.tags &&
			queryArgs.tags.length > 0
		) {
			queryArgs.tax_relation = 'OR';
		}

		// If 'both' was selected but we only have categories, we queried categories.
		// If neither was matched (e.g. no categories/tags on current post), return nothing by setting invalid filter.
		if ( ! hasTaxonomyMatch ) {
			if ( relatedPostsTaxonomy === 'post_tag' ) {
				queryArgs.tags = [ 0 ];
			} else {
				queryArgs.categories = [ 0 ];
			}
		}
	} else {
		// Apply categories filter
		if ( categories && categories.length > 0 ) {
			const catIds = Array.isArray( categories )
				? categories
						.map( ( id ) => parseInt( id, 10 ) )
						.filter( ( id ) => ! isNaN( id ) )
				: String( categories )
						.split( ',' )
						.map( ( id ) => parseInt( id.trim(), 10 ) )
						.filter( ( id ) => ! isNaN( id ) );

			if ( catIds.length > 0 ) {
				if ( categoryFilterType === 'exclude' ) {
					queryArgs.categories_exclude = catIds;
				} else {
					queryArgs.categories = catIds;
				}
			}
		}

		// Apply tags filter
		if ( tags && tags.length > 0 ) {
			const tagIds = Array.isArray( tags )
				? tags
						.map( ( id ) => parseInt( id, 10 ) )
						.filter( ( id ) => ! isNaN( id ) )
				: String( tags )
						.split( ',' )
						.map( ( id ) => parseInt( id.trim(), 10 ) )
						.filter( ( id ) => ! isNaN( id ) );

			if ( tagIds.length > 0 ) {
				if ( tagFilterType === 'exclude' ) {
					queryArgs.tags_exclude = tagIds;
				} else {
					queryArgs.tags = tagIds;
				}
			}
		}

		// Apply authors filter
		if ( authors && authors.length > 0 ) {
			const authorIds = Array.isArray( authors )
				? authors
						.map( ( id ) => parseInt( id, 10 ) )
						.filter( ( id ) => ! isNaN( id ) )
				: String( authors )
						.split( ',' )
						.map( ( id ) => parseInt( id.trim(), 10 ) )
						.filter( ( id ) => ! isNaN( id ) );

			if ( authorIds.length > 0 ) {
				if ( authorFilterType === 'exclude' ) {
					queryArgs.author_exclude = authorIds;
				} else {
					queryArgs.author = authorIds;
				}
			}
		}

		// Dynamic taxonomies mapping for custom post types
		if (
			taxonomyQuery &&
			Object.keys( taxonomyQuery ).length > 0 &&
			taxonomies &&
			taxonomies.length > 0
		) {
			taxonomies.forEach( ( tax ) => {
				if (
					tax.types.includes( postType ) &&
					taxonomyQuery[ tax.slug ] &&
					taxonomyQuery[ tax.slug ].length > 0
				) {
					// Ignore category and post_tag as they are already handled separately
					if ( tax.slug !== 'category' && tax.slug !== 'post_tag' ) {
						const restBase = tax.rest_base || tax.slug;
						const taxIds = Array.isArray(
							taxonomyQuery[ tax.slug ]
						)
							? taxonomyQuery[ tax.slug ]
									.map( ( id ) => parseInt( id, 10 ) )
									.filter( ( id ) => ! isNaN( id ) )
							: String( taxonomyQuery[ tax.slug ] )
									.split( ',' )
									.map( ( id ) => parseInt( id.trim(), 10 ) )
									.filter( ( id ) => ! isNaN( id ) );

						if ( taxIds.length > 0 ) {
							const isExcluded =
								taxonomyFilterTypes &&
								typeof taxonomyFilterTypes === 'object' &&
								! Array.isArray( taxonomyFilterTypes ) &&
								Object.prototype.hasOwnProperty.call(
									taxonomyFilterTypes,
									tax.slug
								) &&
								taxonomyFilterTypes[ tax.slug ] === 'exclude';
							const queryKey = isExcluded
								? `${ restBase }_exclude`
								: restBase;
							queryArgs[ queryKey ] = taxIds;
						}
					}
				}
			} );
		}

		// Relative date range
		if ( dateRange && dateRange !== 'any' ) {
			const now = new Date();
			let afterDate;

			switch ( dateRange ) {
				case 'last_24_hours':
					afterDate = new Date(
						now.getTime() - 24 * 60 * 60 * 1000
					).toISOString();
					break;
				case 'last_7_days':
					afterDate = new Date(
						now.getTime() - 7 * 24 * 60 * 60 * 1000
					).toISOString();
					break;
				case 'last_30_days':
					afterDate = new Date(
						now.getTime() - 30 * 24 * 60 * 60 * 1000
					).toISOString();
					break;
				case 'last_365_days':
					afterDate = new Date(
						now.getTime() - 365 * 24 * 60 * 60 * 1000
					).toISOString();
					break;
				case 'current_month':
					afterDate = new Date(
						now.getFullYear(),
						now.getMonth(),
						1
					).toISOString();
					break;
				case 'current_year':
					afterDate = new Date(
						now.getFullYear(),
						0,
						1
					).toISOString();
					break;
				default:
					break;
			}

			if ( afterDate ) {
				queryArgs.after = afterDate;
			}
		}

		// Custom Fields (Meta query)
		if ( metaKey ) {
			const normalizedCompare =
				typeof metaCompare === 'string'
					? metaCompare.toUpperCase()
					: '=';
			const safeMetaCompare = ALLOWED_META_COMPARE.includes(
				normalizedCompare
			)
				? normalizedCompare
				: '=';

			queryArgs.meta_key = metaKey;
			queryArgs.meta_compare = safeMetaCompare;
			if (
				metaValue !== undefined &&
				metaValue !== null &&
				metaValue !== '' &&
				! [ 'EXISTS', 'NOT EXISTS' ].includes( safeMetaCompare )
			) {
				queryArgs.meta_value = String( metaValue );
			}
		}

		// Search query
		if ( searchQuery ) {
			queryArgs.search = searchQuery;
		}

		// Sticky posts handling
		if ( stickyPosts === 'exclude' ) {
			queryArgs.sticky = false;
		} else if ( stickyPosts === 'only' ) {
			queryArgs.sticky = true;
		}
	}

	return queryArgs;
};

export default getPostQueryArgs;
