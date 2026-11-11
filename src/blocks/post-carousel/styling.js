/**
 * Post Carousel Block - Style Generation
 * Composes modular CSS section builders across responsive breakpoints.
 */

import {
	buildContentWrapperStyles,
	buildGlobalDesktop,
	buildGlobalResponsive,
} from './styling/buildGlobalStyles';
import {
	buildBadgeOverlayResponsive,
	buildCardDesktop,
	buildCardResponsive,
	buildImageTagDesktop,
	buildImageTagResponsive,
	buildImageWrapperDesktop,
	buildImageWrapperResponsive,
} from './styling/buildCardMediaStyles';
import {
	buildNavigationStyles,
	buildPaginationStyles,
} from './styling/buildNavPaginationStyles';
import {
	buildExcerptStyles,
	buildTitleStyles,
} from './styling/buildTypographyStyles';
import {
	buildAuthorImageStyles,
	buildAuthorNameStyles,
	buildElementVisibilityStyles,
	buildPostDateStyles,
	buildReadMoreStyles,
	buildTaxonomyStyles,
} from './styling/buildMetaReadmoreStyles';

/**
 * Build responsive breakpoint block rules for Tablet or Mobile.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} device     Target breakpoint ('Tablet' or 'Mobile').
 * @param {string} maxWidth   CSS max-width threshold (e.g. '1024px' or '767px').
 * @return {string} Media query CSS block.
 */
const buildResponsiveBreakpoint = ( attributes, device, maxWidth ) => `
    @media only screen and (max-width: ${ maxWidth }) {
        ${ buildGlobalResponsive( attributes, device ) }
        ${ buildCardResponsive( attributes, device ) }
        ${ buildContentWrapperStyles( attributes, device ) }
        ${ buildNavigationStyles( attributes, device ) }
        ${ buildPaginationStyles( attributes, device ) }
        ${ buildTitleStyles( attributes, device ) }
        ${ buildExcerptStyles( attributes, device ) }
        ${ buildBadgeOverlayResponsive( attributes, device ) }
        ${ buildImageWrapperResponsive( attributes, device ) }
        ${ buildElementVisibilityStyles( attributes, device ) }
        ${ buildTaxonomyStyles(
			attributes,
			'postCategory',
			'gslider-post-carousel-categories',
			device
		) }
        ${ buildTaxonomyStyles(
			attributes,
			'postTag',
			'gslider-post-carousel-tags',
			device
		) }
        ${ buildImageTagResponsive( attributes, device ) }
        ${ buildAuthorImageStyles( attributes, device ) }
        ${ buildAuthorNameStyles( attributes, device ) }
        ${ buildPostDateStyles( attributes, device ) }
        ${ buildReadMoreStyles( attributes, device ) }
    }
`;

/**
 * Generate block styles from attributes.
 *
 * @param {Object} attributes Block attributes.
 * @return {string} Minified CSS string.
 */
const generatePostCarouselStyle = ( attributes ) => {
	const postCarouselCSS = `
        ${ buildGlobalDesktop( attributes ) }
        ${ buildCardDesktop( attributes ) }
        ${ buildContentWrapperStyles( attributes, 'Desktop' ) }
        ${ buildNavigationStyles( attributes, 'Desktop' ) }
        ${ buildPaginationStyles( attributes, 'Desktop' ) }
        ${ buildTitleStyles( attributes, 'Desktop' ) }
        ${ buildExcerptStyles( attributes, 'Desktop' ) }
        ${ buildImageWrapperDesktop( attributes ) }
        ${ buildElementVisibilityStyles( attributes, 'Desktop' ) }
        ${ buildTaxonomyStyles(
			attributes,
			'postCategory',
			'gslider-post-carousel-categories',
			'Desktop'
		) }
        ${ buildTaxonomyStyles(
			attributes,
			'postTag',
			'gslider-post-carousel-tags',
			'Desktop'
		) }
        ${ buildImageTagDesktop( attributes ) }
        ${ buildAuthorImageStyles( attributes, 'Desktop' ) }
        ${ buildAuthorNameStyles( attributes, 'Desktop' ) }
        ${ buildPostDateStyles( attributes, 'Desktop' ) }
        ${ buildReadMoreStyles( attributes, 'Desktop' ) }
        ${ buildResponsiveBreakpoint( attributes, 'Tablet', '1024px' ) }
        ${ buildResponsiveBreakpoint( attributes, 'Mobile', '767px' ) }
	`;

	return postCarouselCSS.replace( /\s+/g, ' ' ).trim();
};

export default generatePostCarouselStyle;
