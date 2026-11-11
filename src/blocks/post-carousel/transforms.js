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
 * Highest post count the carousel queries. The same cap is applied by the
 * PHP renderer and the editor query helper, so converted blocks keep
 * displaying the exact count the carousel renders.
 *
 * @type {number}
 */
const MAX_POSTS_PER_PAGE = 30;

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
			Number.isFinite( postsToShow ) && postsToShow > 0
				? Math.min( postsToShow, MAX_POSTS_PER_PAGE )
				: 6
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
 * Normalize the `core/query` taxQuery attribute into per taxonomy term lists.
 *
 * WordPress 7.0 nests terms under include and exclude maps while older Query
 * Loops store taxonomy slugs at the top level, and core reads both shapes in
 * build_query_vars_from_query_block(). Include terms win when a taxonomy
 * appears in both lists because the carousel stores a single filter type per
 * taxonomy.
 *
 * @param {Object} taxQuery Raw taxQuery value from the query block.
 * @return {Object} Picker per taxonomy slug plus the union slug list.
 */
const toTaxonomyFilters = ( taxQuery ) => {
	const rawTaxQuery =
		taxQuery && 'object' === typeof taxQuery ? taxQuery : {};
	const isNested = Object.keys( rawTaxQuery ).every(
		( key ) => 'include' === key || 'exclude' === key
	);
	const includeTerms = isNested ? rawTaxQuery.include || {} : rawTaxQuery;
	const excludeTerms = isNested ? rawTaxQuery.exclude || {} : {};

	const pickTerms = ( taxSlug ) => {
		const included = toPositiveIds( includeTerms[ taxSlug ] );
		if ( included.length > 0 ) {
			return { ids: included, type: 'include' };
		}
		const excluded = toPositiveIds( excludeTerms[ taxSlug ] );
		if ( excluded.length > 0 ) {
			return { ids: excluded, type: 'exclude' };
		}
		return { ids: [], type: 'include' };
	};

	const taxonomies = [
		...new Set( [
			...Object.keys( includeTerms ),
			...Object.keys( excludeTerms ),
		] ),
	];

	return { pickTerms, taxonomies };
};

/**
 * Transform that converts a native `core/query` (Query Loop) block into a
 * Post Carousel block, mapping the query parameters onto the carousel's
 * own query engine.
 *
 * The carousel runs a self-contained WP_Query, so an inherited Query Loop
 * stops following the archive context after conversion. Taxonomy filters
 * map to the dedicated categories and tags attributes when they are
 * category or tag terms, carrying an include or exclude filter type; any
 * other taxonomy goes into taxonomyQuery.
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

	const { pickTerms, taxonomies } = toTaxonomyFilters( taxQuery );
	const category = pickTerms( 'category' );
	const postTag = pickTerms( 'post_tag' );

	// Every taxonomy beyond category and tag keeps its filter in the generic
	// taxonomyQuery map consumed by the renderer's tax_query builder.
	const taxonomyQuery = {};
	const taxonomyFilterTypes = {};
	taxonomies.forEach( ( taxSlug ) => {
		if ( 'category' === taxSlug || 'post_tag' === taxSlug ) {
			return;
		}
		const { ids, type } = pickTerms( taxSlug );
		if ( ids.length > 0 ) {
			taxonomyQuery[ taxSlug ] = ids;
			taxonomyFilterTypes[ taxSlug ] = type;
		}
	} );

	const carouselAttributes = {
		globalID: anchor || '',
		postType: postType || 'post',
		postsPerPage: toResponsive(
			Number.isFinite( perPage ) && perPage > 0
				? Math.min( perPage, MAX_POSTS_PER_PAGE )
				: 6
		),
		offset: toResponsive(
			Number.isFinite( offset ) && offset > 0 ? offset : 0
		),
		categories: category.ids,
		categoryFilterType: category.type,
		tags: postTag.ids,
		tagFilterType: postTag.type,
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
 * post types, offset) have no core equivalent and are dropped. Author
 * filters shrink the same way: an exclude filter is dropped and a multi
 * author filter falls back to its first author because core accepts a
 * single include-only author.
 *
 * @param {Object}  [attributes={}]                     The carousel's own attributes.
 * @param {string}  [attributes.globalID]               Custom anchor ID carried over as `anchor`.
 * @param {Object}  [attributes.postsPerPage]           Responsive post count.
 * @param {Array}   [attributes.categories]             Term ID filter array.
 * @param {string}  [attributes.categoryFilterType]     `include` or `exclude` category filter.
 * @param {Array}   [attributes.authors]                Author ID filter array.
 * @param {string}  [attributes.authorFilterType]       `include` or `exclude` author filter.
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
	categoryFilterType,
	authors,
	authorFilterType,
	showFeaturedImage,
	showExcerpt,
	showMetaAuthor,
	showMetaDate,
	enablePostExcerptLimit,
	postExcerptLimit,
	order,
	orderBy,
} = {} ) => {
	// postsPerPage values can arrive as numeric strings, for example from the
	// shared query panel's reset fallback, so parse like the excerpt limit.
	const desktopCount = parseInt( postsPerPage?.Desktop, 10 );

	const coreAttributes = {
		postsToShow:
			Number.isFinite( desktopCount ) && desktopCount > 0
				? desktopCount
				: 5,
		displayFeaturedImage: isAnyBreakpoint( showFeaturedImage ),
		displayPostContent: isAnyBreakpoint( showExcerpt ),
		displayPostContentRadio: 'excerpt',
		displayAuthor: isAnyBreakpoint( showMetaAuthor ),
		displayPostDate: isAnyBreakpoint( showMetaDate ),
		// core/latest-posts can only include terms, so an exclude filter is
		// dropped rather than silently flipped into an include.
		categories:
			'exclude' === categoryFilterType
				? []
				: toLatestPostsCategories( categories ),
		order: order || 'desc',
		orderBy: orderBy || 'date',
	};

	// core/latest-posts accepts a single include-only author, so an exclude
	// filter is dropped rather than silently flipped into an include, and a
	// multi author filter falls back to the first author.
	const validAuthors = toPositiveIds( authors );
	if ( validAuthors.length > 0 && 'exclude' !== authorFilterType ) {
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
			// core/latest-posts only queries posts, so hide the transform
			// when the carousel filters a custom post type.
			isMatch: ( { postType } ) => ! postType || 'post' === postType,
			transform: toLatestPosts,
		},
	],
};

export default transforms;
