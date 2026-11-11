import { __ } from '@wordpress/i18n';

/**
 * Query Settings Constants
 * Reusable across all post-based blocks (Post Carousel, Post Grid, Post List, etc.)
 */

export const INCLUDE_EXCLUDE_OPTIONS = [
	{ label: __( 'Include', 'gslider-blocks' ), value: 'include' },
	{ label: __( 'Exclude', 'gslider-blocks' ), value: 'exclude' },
];

export const ORDER_BY_OPTIONS = [
	{ value: 'date', label: __( 'Date', 'gslider-blocks' ) },
	{ value: 'title', label: __( 'Title', 'gslider-blocks' ) },
	{ value: 'name', label: __( 'Post Slug', 'gslider-blocks' ) },
	{ value: 'id', label: __( 'Post ID', 'gslider-blocks' ) },
	{ value: 'author', label: __( 'Author', 'gslider-blocks' ) },
	{ value: 'modified', label: __( 'Last Modified', 'gslider-blocks' ) },
	{ value: 'relevance', label: __( 'Relevance', 'gslider-blocks' ) },
	{ value: 'rand', label: __( 'Random', 'gslider-blocks' ) },
	{ value: 'comment_count', label: __( 'Comment Count', 'gslider-blocks' ) },
	{ value: 'menu_order', label: __( 'Menu Order', 'gslider-blocks' ) },
	{ value: 'meta_value', label: __( 'Meta Value', 'gslider-blocks' ) },
	{
		value: 'meta_value_num',
		label: __( 'Meta Value (Numeric)', 'gslider-blocks' ),
	},
];

export const SORT_ORDER_OPTIONS = [
	{ value: 'desc', label: __( 'DESC', 'gslider-blocks' ) },
	{ value: 'asc', label: __( 'ASC', 'gslider-blocks' ) },
];

export const STICKY_POSTS_OPTIONS = [
	{ value: 'include', label: __( 'Include Sticky Posts', 'gslider-blocks' ) },
	{ value: 'exclude', label: __( 'Exclude Sticky Posts', 'gslider-blocks' ) },
	{ value: 'only', label: __( 'Show Only Sticky Posts', 'gslider-blocks' ) },
];

export const DATE_RANGE_OPTIONS = [
	{ value: 'any', label: __( 'Any Time', 'gslider-blocks' ) },
	{ value: 'last_24_hours', label: __( 'Last 24 Hours', 'gslider-blocks' ) },
	{ value: 'last_7_days', label: __( 'Last 7 Days', 'gslider-blocks' ) },
	{ value: 'last_30_days', label: __( 'Last 30 Days', 'gslider-blocks' ) },
	{ value: 'last_365_days', label: __( 'Last Year', 'gslider-blocks' ) },
	{ value: 'current_month', label: __( 'Current Month', 'gslider-blocks' ) },
	{ value: 'current_year', label: __( 'Current Year', 'gslider-blocks' ) },
];

export const META_COMPARE_OPTIONS = [
	{ value: '=', label: __( 'Equals (=)', 'gslider-blocks' ) },
	{ value: '!=', label: __( 'Not Equals (!=)', 'gslider-blocks' ) },
	{ value: '>', label: __( 'Greater Than (>)', 'gslider-blocks' ) },
	{ value: '>=', label: __( 'Greater or Equal (>=)', 'gslider-blocks' ) },
	{ value: '<', label: __( 'Less Than (<)', 'gslider-blocks' ) },
	{ value: '<=', label: __( 'Less or Equal (<=)', 'gslider-blocks' ) },
	{ value: 'LIKE', label: __( 'Like', 'gslider-blocks' ) },
	{ value: 'NOT LIKE', label: __( 'Not Like', 'gslider-blocks' ) },
	{ value: 'EXISTS', label: __( 'Exists', 'gslider-blocks' ) },
	{ value: 'NOT EXISTS', label: __( 'Not Exists', 'gslider-blocks' ) },
];
