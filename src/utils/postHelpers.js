/* eslint-disable no-unused-vars, jsdoc/require-param-type */
import { __, _n, sprintf } from '@wordpress/i18n';

/**
 * Safely extract plain text from HTML or decode HTML entities via DOMParser.
 *
 * @param {string} text Raw text or HTML markup.
 * @return {string} Plain text content.
 */
const extractPlainTextFromHtml = ( text ) => {
	if ( ! text ) {
		return '';
	}
	const rawText = String( text );
	if (
		typeof window === 'undefined' ||
		typeof window.DOMParser !== 'function'
	) {
		return rawText.replace( /<[^>]*>/g, '' );
	}
	const doc = new window.DOMParser().parseFromString( rawText, 'text/html' );
	return doc?.body?.textContent || '';
};

/**
 * Decode HTML entities in text (e.g. converting &amp; to &)
 *
 * @param {string} text Raw text string with HTML entities.
 * @return {string} Decoded plain text string.
 */
export const decodeHtmlEntities = ( text ) => {
	return extractPlainTextFromHtml( text );
};

/**
 * Get featured image URL from embedded post REST API data, supporting fallback sizes.
 *
 * @param {Object} post          Embedded post record from WP REST API.
 * @param {string} preferredSize Preferred image size slug (default 'medium_large').
 * @return {string|null}        Featured image URL or null if not found.
 */
export const getFeaturedImageUrl = ( post, preferredSize = 'medium_large' ) => {
	if (
		post?._embedded &&
		post._embedded[ 'wp:featuredmedia' ] &&
		post._embedded[ 'wp:featuredmedia' ][ 0 ]
	) {
		const media = post._embedded[ 'wp:featuredmedia' ][ 0 ];

		if ( media.media_details && media.media_details.sizes ) {
			const sizes = media.media_details.sizes;
			if ( sizes[ preferredSize ] ) {
				return sizes[ preferredSize ].source_url;
			}
			// Fallbacks
			if ( sizes.large ) {
				return sizes.large.source_url;
			}
			if ( sizes.full ) {
				return sizes.full.source_url;
			}
		}
		return media.source_url;
	}
	return null;
};

/**
 * Get categories array from embedded post REST API data.
 *
 * @param {Object} post Embedded post record from WP REST API.
 * @return {Array}     List of category term objects.
 */
export const getPostCategories = ( post ) => {
	if (
		post?._embedded &&
		post._embedded[ 'wp:term' ] &&
		post._embedded[ 'wp:term' ][ 0 ]
	) {
		return post._embedded[ 'wp:term' ][ 0 ].filter(
			( term ) => term.taxonomy === 'category'
		);
	}
	return [];
};

/**
 * Get cleaned excerpt text from post, stripping HTML and limiting by word count.
 *
 * @param {Object} post      Embedded post record from WP REST API.
 * @param {number} wordLimit Maximum number of words to return.
 * @param          options
 * @return {string}         Truncated plain excerpt text.
 */
export const getExcerpt = ( post, wordLimit = 20, options = {} ) => {
	if ( typeof options !== 'object' || options === null ) {
		options = {};
	}

	const {
		enablePostExcerptLimit = options.enablePostExcerptLimit !== undefined
			? options.enablePostExcerptLimit
			: true,
		postExcerptLimitType = 'words',
		postExcerptLimit = {
			Desktop: String( wordLimit ),
			Tablet: String( wordLimit ),
			Mobile: String( wordLimit ),
		},
		postExcerptLimitSuffix = '...',
		postExcerptSource = 'auto',
		deviceType = 'Desktop',
	} = options;

	let text = '';
	if ( postExcerptSource === 'excerpt' ) {
		text = post?.excerpt?.rendered || '';
	} else if ( postExcerptSource === 'content' ) {
		text = post?.content?.rendered || '';
	} else {
		text = post?.excerpt?.rendered || post?.content?.rendered || '';
	}

	if ( ! text ) {
		return '';
	}

	text = extractPlainTextFromHtml( text ).trim();

	if ( options.enablePostExcerptLimit === false ) {
		return text;
	}

	let limitValue = parseInt(
		postExcerptLimit?.[ deviceType ] || wordLimit,
		10
	);
	if ( isNaN( limitValue ) || limitValue <= 0 ) {
		limitValue = parseInt( wordLimit, 10 ) || 20;
	}

	if ( postExcerptLimitType === 'characters' ) {
		if ( text.length > limitValue ) {
			return text.substring( 0, limitValue ) + postExcerptLimitSuffix;
		}
		return text;
	}
	const words = text.split( /\s+/ );
	if ( words.length > limitValue ) {
		return (
			words.slice( 0, limitValue ).join( ' ' ) + postExcerptLimitSuffix
		);
	}
	return text;
};

/**
 * Get author display name from embedded post REST API data.
 *
 * @param {Object} post Embedded post record from WP REST API.
 * @return {string}    Author name.
 */
export const getAuthorName = ( post ) => {
	if (
		post?._embedded &&
		post._embedded.author &&
		post._embedded.author[ 0 ]
	) {
		return (
			post._embedded.author[ 0 ].name ||
			post._embedded.author[ 0 ].slug ||
			''
		);
	}
	return '';
};

/**
 * Get author avatar URL from embedded post REST API data.
 * WordPress REST API provides avatar_urls with sizes: 24, 48, 96.
 *
 * @param {Object} post          Embedded post record from WP REST API.
 * @param {number} preferredSize Preferred avatar size (24, 48, or 96). Default 96.
 * @return {string}            Avatar image URL or empty string if not available.
 */
export const getAuthorAvatarUrl = ( post, preferredSize = 96 ) => {
	if (
		post?._embedded &&
		post._embedded.author &&
		post._embedded.author[ 0 ]
	) {
		const author = post._embedded.author[ 0 ];
		if ( author.avatar_urls ) {
			// Try preferred size, then fallback to largest available
			return (
				author.avatar_urls[ preferredSize ] ||
				author.avatar_urls[ 96 ] ||
				author.avatar_urls[ 48 ] ||
				author.avatar_urls[ 24 ] ||
				''
			);
		}
	}
	return '';
};

/**
 * Get formatted post date using localized date string.
 *
 * @param {Object} post    Post record.
 * @param {string} locale  Locale string (default 'en-US').
 * @param {Object} options DateTimeFormat options.
 * @return {string}       Formatted date string.
 */
export const getFormattedDate = (
	post,
	locale = 'en-US',
	options = { year: 'numeric', month: 'short', day: 'numeric' }
) => {
	if ( ! post?.date ) {
		return '';
	}
	const date = new Date( post.date );
	return date.toLocaleDateString( locale, options );
};

/**
 * Get tags array from embedded post REST API data.
 *
 * @param {Object} post Embedded post record from WP REST API.
 * @return {Array}     List of tag term objects.
 */
export const getPostTags = ( post ) => {
	if (
		post?._embedded &&
		post._embedded[ 'wp:term' ] &&
		post._embedded[ 'wp:term' ][ 1 ]
	) {
		return post._embedded[ 'wp:term' ][ 1 ].filter(
			( term ) => term.taxonomy === 'post_tag'
		);
	}
	return [];
};

/**
 * Calculates estimated reading time in minutes for standard Latin and CJK text.
 *
 * @param {string} content        Raw HTML or plain text content.
 * @param {number} wordsPerMinute Reading speed in words per minute (default 200).
 * @return {number}               Estimated reading minutes (minimum 1).
 */
export const calculateReadingTime = ( content, wordsPerMinute = 200 ) => {
	if ( ! content ) {
		return 1;
	}
	const plainText = extractPlainTextFromHtml( content ).trim();
	if ( ! plainText ) {
		return 1;
	}
	// Multi-byte character counting for CJK scripts (Chinese Hanzi/Kanji, Japanese Kana, Korean Hangul)
	const cjkPattern =
		/[\u4e00-\u9fa5\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]/g;
	const cjkMatches = plainText.match( cjkPattern );
	const cjkCharCount = cjkMatches ? cjkMatches.length : 0;

	const nonCjkText = plainText.replace( cjkPattern, ' ' );
	const words = nonCjkText.split( /\s+/ ).filter( Boolean );
	const wordCount = words.length;

	const cjkWpm = 500;
	const cjkTime = cjkCharCount / cjkWpm;
	const latinTime = wordCount / Math.max( 1, wordsPerMinute );
	const totalTime = cjkTime + latinTime;

	return Math.max( 1, Math.ceil( totalTime ) );
};

/**
 * Returns human-friendly relative time difference string (e.g. "2 hours ago").
 *
 * @param {string} dateString ISO or date string parseable by Date constructor.
 * @return {string}           Human-friendly relative date string.
 */
export const getRelativeDate = ( dateString ) => {
	if ( ! dateString ) {
		return '';
	}
	const date = new Date( dateString );
	if ( Number.isNaN( date.getTime() ) ) {
		return '';
	}
	const now = new Date();
	const diffInSeconds = Math.max(
		0,
		Math.floor( ( now.getTime() - date.getTime() ) / 1000 )
	);

	if ( diffInSeconds < 60 ) {
		return __( 'just now', 'gslider-blocks' );
	}
	const diffInMinutes = Math.floor( diffInSeconds / 60 );
	if ( diffInMinutes < 60 ) {
		return sprintf(
			/* translators: %d: Number of minutes */
			_n( '%d min ago', '%d mins ago', diffInMinutes, 'gslider-blocks' ),
			diffInMinutes
		);
	}
	const diffInHours = Math.floor( diffInMinutes / 60 );
	if ( diffInHours < 24 ) {
		return sprintf(
			/* translators: %d: Number of hours */
			_n( '%d hour ago', '%d hours ago', diffInHours, 'gslider-blocks' ),
			diffInHours
		);
	}
	const diffInDays = Math.floor( diffInHours / 24 );
	if ( diffInDays < 30 ) {
		return sprintf(
			/* translators: %d: Number of days */
			_n( '%d day ago', '%d days ago', diffInDays, 'gslider-blocks' ),
			diffInDays
		);
	}
	const diffInMonths = Math.floor( diffInDays / 30 );
	if ( diffInMonths < 12 ) {
		return sprintf(
			/* translators: %d: Number of months */
			_n(
				'%d month ago',
				'%d months ago',
				diffInMonths,
				'gslider-blocks'
			),
			diffInMonths
		);
	}
	const diffInYears = Math.max( 1, Math.floor( diffInDays / 365 ) );
	return sprintf(
		/* translators: %d: Number of years */
		_n( '%d year ago', '%d years ago', diffInYears, 'gslider-blocks' ),
		diffInYears
	);
};

/**
 * Safely extracts comment count integer from embedded post object.
 *
 * @param {Object} post Post REST API entity.
 * @return {number}     Total comment count.
 */
export const getCommentCount = ( post ) => {
	if ( typeof post?.comments_count === 'number' ) {
		return post.comments_count;
	}
	if ( typeof post?.comment_count === 'number' ) {
		return post.comment_count;
	}
	if (
		post?._embedded &&
		Array.isArray( post._embedded.replies ) &&
		Array.isArray( post._embedded.replies[ 0 ] )
	) {
		return post._embedded.replies[ 0 ].length;
	}
	return 0;
};
