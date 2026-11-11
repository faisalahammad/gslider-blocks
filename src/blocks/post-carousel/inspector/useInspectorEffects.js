/* eslint-disable import/no-unresolved */
import { useEffect } from '@wordpress/element';
import LoadGoogleFont from '@Utils/loadGoogleFont';
import generateSvgIcon from '@Utils/generateSvgIcon';
import { useDeviceType } from '@Utils/displayType';

/**
 * Formats responsive spacing object and unit into a CSS shorthand string.
 *
 * @param {Object} spacing Top, right, bottom, and left spacing values.
 * @param {string} units   CSS unit suffix (e.g. 'px', 'rem').
 * @return {string} Formatted shorthand CSS value or empty string.
 */
const spacingFormat = ( spacing, units ) => {
	if ( ! spacing ) {
		return '';
	}
	return spacing.top || spacing.right || spacing.bottom || spacing.left
		? `${ spacing.top }${ units } ${ spacing.right }${ units } ${ spacing.bottom }${ units } ${ spacing.left }${ units }`
		: '';
};

const SPACING_SYNC_SPECS = [
	{
		cssPrefix: 'navigationArrow',
		cssSuffix: 'BorderRadius',
		suffixFirst: false,
		unitsKey: 'navigationArrowBorderRadiusUnits',
	},
	{
		cssPrefix: 'paginationNormalDots',
		cssSuffix: 'BorderRadius',
		suffixFirst: false,
		unitsKey: 'paginationNormalDotsBorderRadiusUnits',
	},
	{
		cssPrefix: 'postTitle',
		cssSuffix: 'Margin',
		suffixFirst: false,
		unitsKey: 'postTitleMarginUnits',
	},
	{
		cssPrefix: 'postExcerpt',
		cssSuffix: 'Margin',
		suffixFirst: false,
		unitsKey: 'postExcerptMarginUnits',
	},
	{
		cssPrefix: 'postExcerpt',
		cssSuffix: 'Padding',
		suffixFirst: false,
		unitsKey: 'postExcerptPaddingUnits',
	},
	{
		cssPrefix: 'postCategory',
		cssSuffix: 'Margin',
		suffixFirst: false,
		unitsKey: 'postCategoryMarginUnits',
	},
	{
		cssPrefix: 'postCategory',
		cssSuffix: 'Padding',
		suffixFirst: false,
		unitsKey: 'postCategoryPaddingUnits',
	},
	{
		cssPrefix: 'postCategoryItem',
		cssSuffix: 'Padding',
		suffixFirst: false,
		unitsKey: 'postCategoryItemPaddingUnits',
	},
	{
		cssPrefix: 'postCategoryBorder',
		cssSuffix: '',
		suffixFirst: true,
		unitsKey: 'postCategoryBorderUnits',
	},
	{
		cssPrefix: 'postCategoryBorderRadius',
		cssSuffix: '',
		suffixFirst: true,
		unitsKey: 'postCategoryBorderRadiusUnits',
	},
	{
		cssPrefix: 'postTag',
		cssSuffix: 'Margin',
		suffixFirst: false,
		unitsKey: 'postTagMarginUnits',
	},
	{
		cssPrefix: 'postTag',
		cssSuffix: 'Padding',
		suffixFirst: false,
		unitsKey: 'postTagPaddingUnits',
	},
	{
		cssPrefix: 'postTagItem',
		cssSuffix: 'Padding',
		suffixFirst: false,
		unitsKey: 'postTagItemPaddingUnits',
	},
	{
		cssPrefix: 'postTagBorder',
		cssSuffix: '',
		suffixFirst: true,
		unitsKey: 'postTagBorderUnits',
	},
	{
		cssPrefix: 'postTagBorderRadius',
		cssSuffix: '',
		suffixFirst: true,
		unitsKey: 'postTagBorderRadiusUnits',
	},
	{
		cssPrefix: 'readMoreButton',
		cssSuffix: 'BorderRadius',
		suffixFirst: false,
		unitsKey: 'readMoreButtonBorderRadiusUnits',
	},
	{
		cssPrefix: 'postCardMargin',
		cssSuffix: '',
		suffixFirst: true,
		unitsKey: 'postCardMarginUnits',
	},
	{
		cssPrefix: 'postCardPadding',
		cssSuffix: '',
		suffixFirst: true,
		unitsKey: 'postCardPaddingUnits',
	},
	{
		cssPrefix: 'postCardBorder',
		cssSuffix: '',
		suffixFirst: true,
		unitsKey: 'postCardBorderUnits',
	},
	{
		cssPrefix: 'postCardBorderRadius',
		cssSuffix: '',
		suffixFirst: true,
		unitsKey: 'postCardBorderRadiusUnits',
	},
];

const BREAKPOINTS = [ 'Desktop', 'Tablet', 'Mobile' ];

/**
 * Computes formatted CSS strings across Desktop, Tablet, and Mobile for all synced spacing groups.
 *
 * @param {Object} attributes Block attributes object.
 * @return {Object} Map of CSS style attribute updates.
 */
const buildSyncedSpacingAttributes = ( attributes ) => {
	const updates = {};

	SPACING_SYNC_SPECS.forEach(
		( { cssPrefix, cssSuffix, suffixFirst, unitsKey } ) => {
			const units = attributes[ unitsKey ] || {};
			BREAKPOINTS.forEach( ( bp ) => {
				const valueKey = suffixFirst
					? `${ cssPrefix }${ bp }`
					: `${ cssPrefix }${ bp }${ cssSuffix }`;
				const cssKey = `${ valueKey }CssStyle`;
				updates[ cssKey ] = spacingFormat(
					attributes[ valueKey ],
					units[ bp ]
				);
			} );
		}
	);

	return updates;
};

/**
 * Runs Post Carousel Inspector side effects: device sync, Google Fonts, spacing CSS, and SVG HTML.
 *
 * @param {Object}   attributes    Current block attributes.
 * @param {Function} setAttributes Block attribute setter callback.
 * @return {void}
 */
const useInspectorEffects = ( attributes, setAttributes ) => {
	const {
		postTitleFontFamily,
		postExcerptFontFamily,
		postCategoryFontFamily,
		postTagFontFamily,
		authorNameFontFamily,
		postDateFontFamily,
		readMoreButtonFontFamily,
		paginationFractionFontFamily,
		readMoreButtonIcon,
		navigationArrowsIconLeft,
		navigationArrowsIconRight,
	} = attributes;

	const currentDeviceType = useDeviceType();

	useEffect( () => {
		setAttributes( { deviceType: currentDeviceType } );
	}, [ currentDeviceType, setAttributes ] );

	LoadGoogleFont( postTitleFontFamily );
	LoadGoogleFont( postExcerptFontFamily );
	LoadGoogleFont( postCategoryFontFamily );
	LoadGoogleFont( postTagFontFamily );
	LoadGoogleFont( authorNameFontFamily );
	LoadGoogleFont( postDateFontFamily );
	LoadGoogleFont( readMoreButtonFontFamily );
	LoadGoogleFont( paginationFractionFontFamily );

	const spacingDeps = SPACING_SYNC_SPECS.flatMap(
		( { cssPrefix, cssSuffix, suffixFirst, unitsKey } ) => [
			...BREAKPOINTS.map(
				( bp ) =>
					attributes[
						suffixFirst
							? `${ cssPrefix }${ bp }`
							: `${ cssPrefix }${ bp }${ cssSuffix }`
					]
			),
			attributes[ unitsKey ],
		]
	);

	useEffect( () => {
		setAttributes( buildSyncedSpacingAttributes( attributes ) );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, spacingDeps );

	useEffect( () => {
		setAttributes( {
			readMoreButtonIconHtml: generateSvgIcon( readMoreButtonIcon ),
		} );
	}, [ readMoreButtonIcon, setAttributes ] );

	useEffect( () => {
		setAttributes( {
			navigationArrowsIconLeftHtml: generateSvgIcon(
				navigationArrowsIconLeft
			),
		} );
	}, [ navigationArrowsIconLeft, setAttributes ] );

	useEffect( () => {
		setAttributes( {
			navigationArrowsIconRightHtml: generateSvgIcon(
				navigationArrowsIconRight
			),
		} );
	}, [ navigationArrowsIconRight, setAttributes ] );
};

export default useInspectorEffects;
