import { createBlock } from '@wordpress/blocks';

/**
 * Wrap a single scalar value into the block's responsive object shape.
 *
 * @param {*} value Value shared across all breakpoints.
 * @return {Object} Responsive object keyed by breakpoint.
 */
const toResponsive = ( value ) => ( {
	Desktop: value,
	Tablet: value,
	Mobile: value,
} );

/**
 * Check whether a responsive boolean is enabled on at least one breakpoint.
 * Core blocks store display toggles as a single boolean, so a multi-breakpoint
 * setting has to collapse to one value when converting back. Visibility flags
 * use "on if visible anywhere" so content never silently disappears, while
 * numeric settings fall back to the Desktop value where "any" makes no sense.
 *
 * @param {Object} value Responsive object keyed by breakpoint.
 * @return {boolean} True when any breakpoint is truthy.
 */
const isAnyBreakpoint = ( value ) =>
	!! value && Object.values( value ).some( Boolean );

/**
 * Keep only positive integer IDs, dropping NaN and garbage values so invalid
 * entries never reach the block attributes or the server-side query.
 *
 * @param {Array} ids Candidate ID list.
 * @return {number[]} Positive integer IDs.
 */
const toPositiveIds = ( ids ) =>
	( Array.isArray( ids ) ? ids : [] ).filter(
		( id ) => Number.isInteger( id ) && id > 0
	);

/**
 * Extract positive term IDs from the `core/latest-posts` categories shape
 * (an array of `{ id }` objects).
 *
 * @param {Array} terms Category objects from the core block.
 * @return {number[]} Plain term ID array as stored by the carousel.
 */
const toTermIds = ( terms ) =>
	toPositiveIds(
		( Array.isArray( terms ) ? terms : [] ).map( ( term ) => term?.id )
	);

/**
 * Parse a core query author value into the carousel's author ID array.
 * Core stores the author as a string, possibly a comma separated list.
 *
 * @param {string} author Author value from `core/query`.
 * @return {number[]} Positive author IDs.
 */
const toAuthorIds = ( author ) =>
	toPositiveIds(
		String( author || '' )
			.split( ',' )
			.map( ( id ) => parseInt( id, 10 ) )
	);

/**
 * Convert the carousel's term ID array back into the `core/latest-posts`
 * categories shape (an array of `{ id }` objects).
 *
 * @param {Array} ids Term IDs stored by the carousel.
 * @return {Object[]} Category objects expected by the core block.
 */
const toLatestPostsCategories = ( ids ) =>
	( Array.isArray( ids ) ? ids : [] ).map( ( id ) => ( { id } ) );

/**
 * Transform that converts a native `core/latest-posts` block into a Post
 * Carousel block, carrying over the query and display toggles.
 *
 * Core stores counts and toggles as scalars while the carousel uses
 * responsive objects, so every mapped value is wrapped with toResponsive().
 * The excerpt length only applies when core is set to show excerpt content;
 * the "full post" mode has no carousel equivalent and falls back to excerpts.
 *
 * @param {Object}  [attributes={}]                      The latest-posts block's own attributes.
 * @param {string}  [attributes.anchor]                  Optional HTML anchor carried over as `globalID`.
 * @param {number}  [attributes.postsToShow]             Number of posts to display.
 * @param {Array}   [attributes.categories]              Category filter as `{ id }` objects.
 * @param {number}  [attributes.selectedAuthor]          Author filter as a single ID.
 * @param {boolean} [attributes.displayPostDate]         Whether the post date shows.
 * @param {boolean} [attributes.displayAuthor]           Whether the author shows.
 * @param {boolean} [attributes.displayFeaturedImage]    Whether the featured image shows.
 * @param {boolean} [attributes.displayPostContent]      Whether post content shows.
 * @param {string}  [attributes.displayPostContentRadio] `excerpt` or `full_post`.
 * @param {number}  [attributes.excerptLength]           Excerpt length in words.
 * @param {string}  [attributes.order]                   Query order, `asc` or `desc`.
 * @param {string}  [attributes.orderBy]                 Query orderby field.
 * @return {Object} The transformed Post Carousel block.
 */
const toPostCarouselFromLatestPosts = ( {
	anchor,
	postsToShow,
	categories,
	selectedAuthor,
	displayPostDate,
	displayAuthor,
	displayFeaturedImage,
	displayPostContent,
	displayPostContentRadio,
	excerptLength,
	order,
	orderBy,
} = {} ) => {
	const showExcerpt = !! displayPostContent;

	const carouselAttributes = {
		globalID: anchor || '',
		postsPerPage: toResponsive(
			Number.isFinite( postsToShow ) && postsToShow > 0 ? postsToShow : 6
		),
		categories: toTermIds( categories ),
		authors: toPositiveIds( [ selectedAuthor ] ),
		showFeaturedImage: toResponsive( !! displayFeaturedImage ),
		showExcerpt: toResponsive( showExcerpt ),
		showMetaAuthor: toResponsive( !! displayAuthor ),
		showMetaDate: toResponsive( !! displayPostDate ),
		order: order || 'desc',
		orderBy: orderBy || 'date',
	};

	if ( showExcerpt && 'excerpt' === displayPostContentRadio ) {
		carouselAttributes.enablePostExcerptLimit = true;
		carouselAttributes.postExcerptLimit = toResponsive(
			String(
				Number.isFinite( excerptLength ) && excerptLength > 0
					? excerptLength
					: 20
			)
		);
	}

	return createBlock( 'gslider-blocks/post-carousel', carouselAttributes );
};

/**
 * Transform that converts a native `core/query` (Query Loop) block into a
 * Post Carousel block, mapping the query parameters onto the carousel's
 * own query engine.
 *
 * The carousel runs a self-contained WP_Query, so an inherited Query Loop
 * stops following the archive context after conversion. Taxonomy filters
 * map to the dedicated categories and tags attributes when they are
 * category or tag terms; any other taxonomy goes into taxonomyQuery.
 *
 * @param {Object} [attributes={}]     The query block's own attributes.
 * @param {string} [attributes.anchor] Optional HTML anchor carried over as `globalID`.
 * @param {Object} [attributes.query]  Query parameters of the Query Loop.
 * @return {Object} The transformed Post Carousel block.
 */
const toPostCarouselFromQuery = ( { anchor, query } = {} ) => {
	const {
		perPage,
		offset,
		postType,
		order,
		orderBy,
		author,
		search,
		exclude,
		sticky,
		excludeCurrent,
		taxQuery,
	} = query || {};

	const categories = toPositiveIds( taxQuery?.category );
	const tags = toPositiveIds( taxQuery?.post_tag );

	// Every taxonomy beyond category and tag keeps its include filter in the
	// generic taxonomyQuery map consumed by the renderer's tax_query builder.
	const taxonomyQuery = {};
	const taxonomyFilterTypes = {};
	if ( taxQuery && 'object' === typeof taxQuery ) {
		Object.keys( taxQuery ).forEach( ( taxSlug ) => {
			if ( 'category' === taxSlug || 'post_tag' === taxSlug ) {
				return;
			}
			const termIds = toPositiveIds( taxQuery[ taxSlug ] );
			if ( termIds.length > 0 ) {
				taxonomyQuery[ taxSlug ] = termIds;
				taxonomyFilterTypes[ taxSlug ] = 'include';
			}
		} );
	}

	const carouselAttributes = {
		globalID: anchor || '',
		postType: postType || 'post',
		postsPerPage: toResponsive(
			Number.isFinite( perPage ) && perPage > 0 ? perPage : 6
		),
		offset: toResponsive(
			Number.isFinite( offset ) && offset > 0 ? offset : 0
		),
		categories,
		tags,
		taxonomyQuery,
		taxonomyFilterTypes,
		authors: toAuthorIds( author ),
		excludePosts: toPositiveIds( exclude ).join( ',' ),
		excludeCurrentPost: true === excludeCurrent,
		searchQuery: search || '',
		stickyPosts:
			'exclude' === sticky || 'only' === sticky ? sticky : 'include',
		order: order || 'desc',
		orderBy: orderBy || 'date',
	};

	return createBlock( 'gslider-blocks/post-carousel', carouselAttributes );
};

/**
 * Transform that converts the Post Carousel block back into a native
 * `core/latest-posts` block. Carousel-only settings (presets, tags, custom
 * post types, offset) have no core equivalent and are dropped.
 *
 * @param {Object}  [attributes={}]                     The carousel's own attributes.
 * @param {string}  [attributes.globalID]               Custom anchor ID carried over as `anchor`.
 * @param {Object}  [attributes.postsPerPage]           Responsive post count.
 * @param {Array}   [attributes.categories]             Term ID filter array.
 * @param {Array}   [attributes.authors]                Author ID filter array.
 * @param {Object}  [attributes.showFeaturedImage]      Responsive featured image toggle.
 * @param {Object}  [attributes.showExcerpt]            Responsive excerpt toggle.
 * @param {Object}  [attributes.showMetaAuthor]         Responsive author toggle.
 * @param {Object}  [attributes.showMetaDate]           Responsive date toggle.
 * @param {boolean} [attributes.enablePostExcerptLimit] Whether the excerpt word limit applies.
 * @param {Object}  [attributes.postExcerptLimit]       Responsive excerpt word limit.
 * @param {string}  [attributes.order]                  Query order, `asc` or `desc`.
 * @param {string}  [attributes.orderBy]                Query orderby field.
 * @return {Object} The transformed `core/latest-posts` block.
 */
const toLatestPosts = ( {
	globalID,
	postsPerPage,
	categories,
	authors,
	showFeaturedImage,
	showExcerpt,
	showMetaAuthor,
	showMetaDate,
	enablePostExcerptLimit,
	postExcerptLimit,
	order,
	orderBy,
} = {} ) => {
	const coreAttributes = {
		postsToShow:
			Number.isFinite( postsPerPage?.Desktop ) && postsPerPage.Desktop > 0
				? postsPerPage.Desktop
				: 5,
		displayFeaturedImage: isAnyBreakpoint( showFeaturedImage ),
		displayPostContent: isAnyBreakpoint( showExcerpt ),
		displayPostContentRadio: 'excerpt',
		displayAuthor: isAnyBreakpoint( showMetaAuthor ),
		displayPostDate: isAnyBreakpoint( showMetaDate ),
		categories: toLatestPostsCategories( categories ),
		order: order || 'desc',
		orderBy: orderBy || 'date',
	};

	const validAuthors = toPositiveIds( authors );
	if ( validAuthors.length > 0 ) {
		coreAttributes.selectedAuthor = validAuthors[ 0 ];
	}

	if ( enablePostExcerptLimit ) {
		const limit = parseInt( postExcerptLimit?.Desktop, 10 );
		coreAttributes.excerptLength =
			Number.isFinite( limit ) && limit > 0 ? limit : 55;
	}

	if ( globalID ) {
		coreAttributes.anchor = globalID;
	}

	return createBlock( 'core/latest-posts', coreAttributes );
};

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/latest-posts' ],
			transform: toPostCarouselFromLatestPosts,
		},
		{
			type: 'block',
			blocks: [ 'core/query' ],
			transform: toPostCarouselFromQuery,
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/latest-posts' ],
			transform: toLatestPosts,
		},
	],
};

export default transforms;
