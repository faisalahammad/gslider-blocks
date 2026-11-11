import { useEffect } from '@wordpress/element';

const IGNORED_FONT_VALUES = new Set( [
	'default',
	'inherit',
	'initial',
	'unset',
	'serif',
	'sans-serif',
	'monospace',
	'cursive',
	'fantasy',
	'system-ui',
	'ui-sans-serif',
	'ui-serif',
	'ui-monospace',
] );

const GOOGLE_FONT_WEIGHTS =
	'100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';

/**
 * Validate and encode a Google Font family name for stylesheet loading.
 *
 * Skips empty values, CSS generic keywords, and composite CSS font stacks
 * (such as `Georgia, "Times New Roman", serif`) to match PHP `FontLoader`.
 *
 * @param {string} font Raw font-family attribute value.
 * @return {string} URL-encoded family segment, or empty string when skipped.
 */
export const normalizeGoogleFontFamily = ( font ) => {
	if ( typeof font !== 'string' ) {
		return '';
	}

	const trimmed = font.trim();
	if (
		! trimmed ||
		IGNORED_FONT_VALUES.has( trimmed.toLowerCase() ) ||
		! /^[A-Za-z0-9 ]+$/.test( trimmed )
	) {
		return '';
	}

	return trimmed.replace( /\s+/g, '+' );
};

const LoadGoogleFont = ( font ) => {
	useEffect( () => {
		const encodedFont = normalizeGoogleFontFamily( font );
		if ( ! encodedFont ) {
			return undefined;
		}

		const fontUrl = `https://fonts.googleapis.com/css?family=${ encodedFont }:${ GOOGLE_FONT_WEIGHTS }`;

		// Add font to the main document
		const linkElement = document.createElement( 'link' );
		linkElement.rel = 'stylesheet';
		linkElement.href = fontUrl;
		document.head.appendChild( linkElement );

		// Track iframe link node directly so cleanup never relies on CSS selector escaping.
		let iframeLinkElement = null;
		const iframe = document.querySelector( 'iframe[name="editor-canvas"]' );
		if ( iframe ) {
			try {
				const iframeDoc =
					iframe.contentDocument || iframe.contentWindow?.document;
				if ( iframeDoc?.head ) {
					iframeLinkElement = iframeDoc.createElement( 'link' );
					iframeLinkElement.rel = 'stylesheet';
					iframeLinkElement.href = fontUrl;
					iframeDoc.head.appendChild( iframeLinkElement );
				}
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( 'Failed to access iframe document:', error );
			}
		}

		// Cleanup: Remove the link elements on unmount or font change
		return () => {
			linkElement.remove();
			if ( iframeLinkElement ) {
				iframeLinkElement.remove();
			}
		};
	}, [ font ] );

	return null;
};

export default LoadGoogleFont;
