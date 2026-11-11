import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';

export { SHAPE_DIVIDER_OPTIONS } from './shapeDividers';

export const STORE_NAME = 'gslider-blocks';

export const UNIT_TYPES = [
	{ label: __( 'px', 'gslider-blocks' ), value: 'px' },
	{ label: __( '%', 'gslider-blocks' ), value: '%' },
	{ label: __( 'em', 'gslider-blocks' ), value: 'em' },
	{ label: __( 'rem', 'gslider-blocks' ), value: 'rem' },
	{ label: __( 'vh', 'gslider-blocks' ), value: 'vh' },
	{ label: __( 'vw', 'gslider-blocks' ), value: 'vw' },
];

export const DEFAULT_UNIT_BOUNDS = {
	px: { min: 0, max: 2000, step: 1 },
	'%': { min: 0, max: 100, step: 1 },
	vh: { min: 0, max: 100, step: 1 },
	vw: { min: 0, max: 100, step: 1 },
	em: { min: 0, max: 100, step: 0.1 },
	rem: { min: 0, max: 100, step: 0.1 },
};

export const NORMAL_HOVER = [
	{ label: __( 'Normal', 'gslider-blocks' ), value: 'normal' },
	{ label: __( 'Hover', 'gslider-blocks' ), value: 'hover' },
];

export const ARROW_ICON_ALIGN = [
	{ label: <Dashicon icon={ 'admin-generic' } />, value: 'icon' },
	{ label: <Dashicon icon={ 'format-image' } />, value: 'image' },
];

export const ICON_TYPE = [
	{ label: __( 'Icon', 'gslider-blocks' ), value: 'icon' },
	{ label: __( 'Image', 'gslider-blocks' ), value: 'image' },
];

export const ICON_POSITION = [
	{ label: __( 'Left', 'gslider-blocks' ), value: 'left' },
	{ label: __( 'Right', 'gslider-blocks' ), value: 'right' },
];

export const ICON_ALIGN = [
	{ label: <Dashicon icon={ 'remove' } />, value: 'none' },
	{ label: <Dashicon icon={ 'admin-generic' } />, value: 'icon' },
];

export const ICON_IMAGE_ALIGN = [
	{ label: __( 'None', 'gslider-blocks' ), value: 'none' },
	{ label: __( 'Icon', 'gslider-blocks' ), value: 'icon' },
	{ label: __( 'Image', 'gslider-blocks' ), value: 'image' },
];

export const TEXT_ALIGN = [
	{ label: <Dashicon icon={ 'editor-alignleft' } />, value: 'left' },
	{
		label: <Dashicon icon={ 'editor-aligncenter' } />,
		value: 'center',
	},
	{ label: <Dashicon icon={ 'editor-alignright' } />, value: 'right' },
];

export const VERTICAL_POSITION_ICONS = {
	top: (
		<svg
			width="24"
			height="24"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M9 9v6h11V9H9zM4 20h1.5V4H4v16z"></path>
		</svg>
	),
	middle: (
		<svg
			width="24"
			height="24"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M12.5 15v5H11v-5H4V9h7V4h1.5v5h7v6h-7Z"></path>
		</svg>
	),
	bottom: (
		<svg
			width="24"
			height="24"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M4 15h11V9H4v6zM18.5 4v16H20V4h-1.5z"></path>
		</svg>
	),
};

export const HORIZONTAL_POSITION_ICONS = {
	left: (
		<svg
			width="24"
			height="24"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M9 9v6h11V9H9zM4 20h1.5V4H4v16z"></path>
		</svg>
	),
	center: (
		<svg
			width="24"
			height="24"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M12.5 15v5H11v-5H4V9h7V4h1.5v5h7v6h-7Z"></path>
		</svg>
	),
	right: (
		<svg
			width="24"
			height="24"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M4 15h11V9H4v6zM18.5 4v16H20V4h-1.5z"></path>
		</svg>
	),
};

export const VERTICAL_ALIGN = [
	{ label: VERTICAL_POSITION_ICONS.top, value: 'flex-start' },
	{ label: VERTICAL_POSITION_ICONS.middle, value: 'center' },
	{ label: VERTICAL_POSITION_ICONS.bottom, value: 'flex-end' },
];

export const VERTICAL_ALIGN_SELF = [
	{ label: VERTICAL_POSITION_ICONS.top, value: 'start' },
	{ label: VERTICAL_POSITION_ICONS.middle, value: 'center' },
	{ label: VERTICAL_POSITION_ICONS.bottom, value: 'end' },
];

export const HORIZONTAL_ALIGN = [
	{ label: HORIZONTAL_POSITION_ICONS.left, value: 'left' },
	{ label: HORIZONTAL_POSITION_ICONS.center, value: 'center' },
	{ label: HORIZONTAL_POSITION_ICONS.right, value: 'right' },
];

export const HTML_TAGS = [
	{ label: __( 'H1', 'gslider-blocks' ), value: 'h1' },
	{ label: __( 'H2', 'gslider-blocks' ), value: 'h2' },
	{ label: __( 'H3', 'gslider-blocks' ), value: 'h3' },
	{ label: __( 'H4', 'gslider-blocks' ), value: 'h4' },
	{ label: __( 'H5', 'gslider-blocks' ), value: 'h5' },
	{ label: __( 'H6', 'gslider-blocks' ), value: 'h6' },
	{ label: __( 'P', 'gslider-blocks' ), value: 'p' },
	{ label: __( 'Span', 'gslider-blocks' ), value: 'span' },
];

export const BORDER_STYLES = [
	{ label: __( 'None', 'gslider-blocks' ), value: 'none' },
	{ label: __( 'Solid', 'gslider-blocks' ), value: 'solid' },
	{ label: __( 'Dashed', 'gslider-blocks' ), value: 'dashed' },
	{ label: __( 'Dotted', 'gslider-blocks' ), value: 'dotted' },
	{ label: __( 'Double', 'gslider-blocks' ), value: 'double' },
	{ label: __( 'Groove', 'gslider-blocks' ), value: 'groove' },
	{ label: __( 'Outset', 'gslider-blocks' ), value: 'outset' },
	{ label: __( 'Ridge', 'gslider-blocks' ), value: 'ridge' },
];

export const SLIDER_EFFECT_OPTIONS = [
	{ label: __( 'Slide', 'gslider-blocks' ), value: 'slide' },
	{ label: __( 'Fade', 'gslider-blocks' ), value: 'fade' },
	{ label: __( 'Coverflow', 'gslider-blocks' ), value: 'coverflow' },
	{ label: __( 'Flip', 'gslider-blocks' ), value: 'flip' },
	{ label: __( 'Creative', 'gslider-blocks' ), value: 'creative' },
];

export const CAROUSEL_EFFECT_OPTIONS = [
	{ label: __( 'Slide', 'gslider-blocks' ), value: 'slide' },
	{ label: __( 'Coverflow', 'gslider-blocks' ), value: 'coverflow' },
];

export const SLIDER_TYPE = [
	{ label: __( 'Slider', 'gslider-blocks' ), value: 'slider' },
	{ label: __( 'Carousel', 'gslider-blocks' ), value: 'carousel' },
];
export const SLIDER_DIRECTION = [
	{ label: __( 'Horizontal', 'gslider-blocks' ), value: 'horizontal' },
	{ label: __( 'Vertical', 'gslider-blocks' ), value: 'vertical' },
];

export const PAGINATION_TYPE = [
	{ label: __( 'Bullets', 'gslider-blocks' ), value: 'bullets' },
	{ label: __( 'Fraction', 'gslider-blocks' ), value: 'fraction' },
	{ label: __( 'Progress Bar', 'gslider-blocks' ), value: 'progressbar' },
];

export const NAVIGATION_ARROW_POSITION_TYPE = [
	{ label: __( 'Inside', 'gslider-blocks' ), value: 'inside' },
	{ label: __( 'Outside', 'gslider-blocks' ), value: 'outside' },
];
export const PAGINATION_POSITION_TYPE = [
	{ label: __( 'Inside', 'gslider-blocks' ), value: 'inside' },
	{ label: __( 'Outside', 'gslider-blocks' ), value: 'outside' },
];

export const NAVIGATION_ARROW_POSITION = [
	{ label: __( 'Center Center', 'gslider-blocks' ), value: 'center' },
	{ label: __( 'Top Left', 'gslider-blocks' ), value: 'top-left' },
	{ label: __( 'Top Center', 'gslider-blocks' ), value: 'top-center' },
	{ label: __( 'Top Right', 'gslider-blocks' ), value: 'top-right' },
	{ label: __( 'Bottom Left', 'gslider-blocks' ), value: 'bottom-left' },
	{ label: __( 'Bottom Center', 'gslider-blocks' ), value: 'bottom-center' },
	{ label: __( 'Bottom Right', 'gslider-blocks' ), value: 'bottom-right' },
];
export const NAVIGATION_ARROW_DIRECTION = [
	{ label: __( 'Row', 'gslider-blocks' ), value: 'row' },
	{ label: __( 'Column', 'gslider-blocks' ), value: 'column' },
	{ label: __( 'Row Reverse', 'gslider-blocks' ), value: 'row-reverse' },
	{
		label: __( 'Column Reverse', 'gslider-blocks' ),
		value: 'column-reverse',
	},
];

export const NORMAL_ACTIVE = [
	{ label: __( 'Normal', 'gslider-blocks' ), value: 'normal' },
	{ label: __( 'Active', 'gslider-blocks' ), value: 'active' },
];

export const FONT_WEIGHT = [
	{ label: __( 'Default', 'gslider-blocks' ), value: 'inherit' },
	{ label: __( '100', 'gslider-blocks' ), value: '100' },
	{ label: __( '200', 'gslider-blocks' ), value: '200' },
	{ label: __( '300', 'gslider-blocks' ), value: '300' },
	{ label: __( '400', 'gslider-blocks' ), value: '400' },
	{ label: __( '500', 'gslider-blocks' ), value: '500' },
	{ label: __( '600', 'gslider-blocks' ), value: '600' },
	{ label: __( '700', 'gslider-blocks' ), value: '700' },
	{ label: __( '800', 'gslider-blocks' ), value: '800' },
	{ label: __( '900', 'gslider-blocks' ), value: '900' },
];

export const FONT_STYLE = [
	{ label: __( 'Default', 'gslider-blocks' ), value: 'inherit' },
	{ label: __( 'Normal', 'gslider-blocks' ), value: 'normal' },
	{ label: __( 'Italic', 'gslider-blocks' ), value: 'italic' },
	{ label: __( 'Oblique', 'gslider-blocks' ), value: 'oblique' },
];

export const TEXT_TRANSFORM = [
	{ label: __( 'Default', 'gslider-blocks' ), value: 'inherit' },
	{ label: __( 'None', 'gslider-blocks' ), value: 'none' },
	{ label: __( 'Capitalize', 'gslider-blocks' ), value: 'capitalize' },
	{ label: __( 'Uppercase', 'gslider-blocks' ), value: 'uppercase' },
	{ label: __( 'Lowercase', 'gslider-blocks' ), value: 'lowercase' },
];

export const TEXT_DECORATION = [
	{ label: __( 'Default', 'gslider-blocks' ), value: 'inherit' },
	{ label: __( 'None', 'gslider-blocks' ), value: 'none' },
	{ label: __( 'Underline', 'gslider-blocks' ), value: 'underline' },
	{ label: __( 'Overline', 'gslider-blocks' ), value: 'overline' },
	{ label: __( 'Line Through', 'gslider-blocks' ), value: 'line-through' },
];

export const LAYOUT_HEIGHT_SWITCHER = [
	{ label: __( 'Fixed', 'gslider-blocks' ), value: 'fixed' },
	{ label: __( 'Adapt', 'gslider-blocks' ), value: 'adapt' },
];

export const AUTOPLAY_PROGRESS_POSITION = [
	{ label: __( 'Top', 'gslider-blocks' ), value: 'top' },
	{ label: __( 'Bottom', 'gslider-blocks' ), value: 'bottom' },
];

export const WIDTH_MODE = [
	{ label: __( 'Inline', 'gslider-blocks' ), value: 'inline' },
	{ label: __( 'Full Width', 'gslider-blocks' ), value: 'full' },
];

export const OBJECT_FIT_OPTIONS = [
	{ label: __( 'Contain', 'gslider-blocks' ), value: 'contain' },
	{ label: __( 'Cover', 'gslider-blocks' ), value: 'cover' },
	{ label: __( 'Fill', 'gslider-blocks' ), value: 'fill' },
	{ label: __( 'Scale-down', 'gslider-blocks' ), value: 'scale-down' },
];

export const GOOGLE_FONTS = async () => {
	const pluginUrl = window.GSliderBlocksData?.pluginUrl || '';
	const res = await fetch(
		pluginUrl + 'assets/google-fonts/google-fonts.json'
	);
	const data = await res.json();

	return Object.keys( data ).map( ( family ) => ( {
		label: family,
		value: family,
		weights: data[ family ],
	} ) );
};
