import { __ } from '@wordpress/i18n';
import { DEFAULT_POST_CAROUSEL_CONTENT_ORDER } from '../content-order';

export const minimalTypoStyles = {
	postLayoutMode: 'minimal',
	presetStyle: 'minimal-typo',
	enableSpotlight: false,
	spotlightScaleSide: 0.92,
	spotlightOpacitySide: 0.65,
	heroHeightDesktop: 520,
	heroHeightTablet: 420,
	heroHeightMobile: 340,
	heroContentAlignment: 'bottom-left',
	newsroomMainWidth: 65,
	newsroomQueuePosition: 'right',
	horizontalMediaWidth: 45,
	horizontalMediaPosition: 'left',
	overlayGradientScrim:
		'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)',
	overlayScrimHeight: 75,
	timelineStemColor: '#e2e8f0',
	timelineStemThickness: 2,
	timelineDotSize: 16,
	timelineDotColor: '#007cba',
	timelineDatePosition: 'above',
	carouselPerColumn: {
		Desktop: 3,
		Tablet: 2,
		Mobile: 1,
	},
	carouselPerColumnGap: {
		Desktop: 24,
		Tablet: 20,
		Mobile: 16,
	},
	carouselEffect: 'slide',
	speed: {
		Desktop: 800,
		Tablet: 800,
		Mobile: 800,
	},
	infiniteLoop: true,
	equalHeight: true,
	contentOrder: [ ...DEFAULT_POST_CAROUSEL_CONTENT_ORDER ],
	enableTaxonomyBadgeOverlay: false,
	imageHeight: {
		Desktop: '200',
		Tablet: '',
		Mobile: '',
	},
	postCardNormalBackgroundType: 'classic',
	postCardNormalClassicColor: 'transparent',
	postCardPaddingDesktop: {
		top: '0',
		right: '0',
		bottom: '20',
		left: '0',
	},
	postCardBorder: 'solid',
	postCardBorderDesktop: {
		top: '0',
		right: '0',
		bottom: '1',
		left: '0',
	},
	postCardBorderColor: '#e5e7eb',
	postCardBorderRadiusDesktop: {
		top: '0',
		right: '0',
		bottom: '0',
		left: '0',
	},
	postCardBoxShadowCssValue: 'none',
	postCardBoxShadowHoverCssValue: 'none',
	postTitleFontFamily: 'Georgia, "Times New Roman", serif',
	postTitleFontSize: {
		Desktop: '',
		Tablet: '',
		Mobile: '',
	},
	postTitleFontWeight: '700',
	postTitleLineHeight: {
		Desktop: '',
		Tablet: '',
		Mobile: '',
	},
	postTitleLineHeightUnits: {
		Desktop: 'px',
		Tablet: 'px',
		Mobile: 'px',
	},
	postTitleNormalBackgroundType: 'classic',
	postTitleNormalClassicColor: '#111c2d',
	postTitleHoverClassicColor: '#007cba',
	postTitleDesktopMargin: {
		top: '',
		right: '',
		bottom: '',
		left: '',
	},
	postExcerptFontSize: {
		Desktop: '16',
		Tablet: '16',
		Mobile: '16',
	},
	postExcerptColor: '#475569',
	postExcerptLineHeight: {
		Desktop: '',
		Tablet: '',
		Mobile: '',
	},
	postExcerptLineHeightUnits: {
		Desktop: 'px',
		Tablet: 'px',
		Mobile: 'px',
	},
	postExcerptDesktopMargin: {
		top: '',
		right: '',
		bottom: '',
		left: '',
	},
	authorNameColor: '#1e293b',
	postDateColor: '#64748b',
	postCategoryColor: '#007cba',
	postCategoryColorHover: '#005a87',
	postCategoryFontSize: {
		Desktop: '12',
		Tablet: '12',
		Mobile: '12',
	},
	postCategoryFontWeight: '700',
	postCategoryTextTransform: 'uppercase',
	postCategoryLetterSpacing: {
		Desktop: '1.4',
		Tablet: '1.4',
		Mobile: '1.4',
	},
	readMoreButtonWidth: 'auto',
	readMoreButtonColor: '#111c2d',
	readMoreButtonColorHover: '#007cba',
	readMoreButtonIconColor: '#111c2d',
	readMoreButtonIconColorHover: '#007cba',
	readMoreButtonNormalBackgroundType: 'classic',
	readMoreButtonNormalClassicColor: 'transparent',
	readMoreButtonHoverBackgroundType: 'classic',
	readMoreButtonHoverClassicColor: 'transparent',
	readMoreButtonTextDecoration: 'underline',
	readMoreButtonDesktopPadding: {
		top: '0',
		right: '0',
		bottom: '0',
		left: '0',
	},
	readMoreButtonDesktopBorderRadius: {
		top: '0',
		right: '0',
		bottom: '0',
		left: '0',
	},
	readMoreButtonBoxShadowCssValue: 'none',
	readMoreButtonBoxShadowHoverCssValue: 'none',
	readMoreButtonHoverAnimation: 'none',
};

const MinimalTypoPreview = () => (
	<svg
		viewBox="0 0 120 90"
		width="120"
		height="90"
		fill="none"
		aria-hidden="true"
	>
		<rect
			x="10"
			y="8"
			width="100"
			height="74"
			rx="4"
			fill="#ffffff"
			stroke="#e2e8f0"
			strokeWidth="1"
		/>
		<rect x="18" y="16" width="28" height="4" rx="2" fill="#007cba" />
		<rect x="18" y="26" width="84" height="6" rx="2" fill="#0f172a" />
		<rect x="18" y="35" width="66" height="6" rx="2" fill="#0f172a" />
		<rect x="18" y="47" width="84" height="3.5" rx="1.75" fill="#94a3b8" />
		<rect x="18" y="54" width="70" height="3.5" rx="1.75" fill="#cbd5e1" />
		<rect x="18" y="64" width="26" height="3.5" rx="1.75" fill="#111c2d" />
		<line
			x1="18"
			y1="69.5"
			x2="44"
			y2="69.5"
			stroke="#007cba"
			strokeWidth="1.5"
		/>
		<line
			x1="18"
			y1="77"
			x2="102"
			y2="77"
			stroke="#cbd5e1"
			strokeWidth="1.5"
		/>
	</svg>
);

const presetMinimalTypo = {
	value: 'minimal-typo',
	label: __( 'Minimal Typographic', 'gslider-blocks' ),
	description: __(
		'Clean editorial layout with uppercase eyebrow labels, serif headline contrast, hairline bottom border, and underline link CTA.',
		'gslider-blocks'
	),
	preview: <MinimalTypoPreview />,
	styles: minimalTypoStyles,
	attributes: Object.entries( minimalTypoStyles ).map(
		( [ label, value ] ) => ( { label, value } )
	),
};

export default presetMinimalTypo;
