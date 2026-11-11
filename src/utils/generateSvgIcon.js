/* eslint-disable import/no-unresolved */
import {
	renderToString,
	isValidElement,
	cloneElement,
} from '@wordpress/element';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';

const generateSvgIcon = ( iconName ) => {
	if ( ! iconName ) {
		return '';
	}

	const el = renderSVG( iconName );
	if ( ! el || ! isValidElement( el ) ) {
		return '';
	}

	const merged = cloneElement( el, {
		xmlns: 'http://www.w3.org/2000/svg',
		'aria-hidden': 'true',
		focusable: 'false',
	} );

	return renderToString( merged );
};

export default generateSvgIcon;
