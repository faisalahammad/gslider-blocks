import { __ } from '@wordpress/i18n';
import { DEFAULT_POST_CAROUSEL_CONTENT_ORDER } from '../content-order';

export const classicCardStyles = {
	postLayoutMode: 'classic',
	presetStyle: 'classic-card',
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
		Desktop: 10,
		Tablet: 10,
		Mobile: 10,
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
	enableTaxonomyBadgeOverlay: true,
	imageHeight: {
		Desktop: '200',
		Tablet: '',
		Mobile: '',
	},
	postCardNormalBackgroundType: 'classic',
	postCardNormalClassicColor: '',
	postCardPaddingDesktop: {
		top: '',
		right: '',
		bottom: '',
		left: '',
	},
	postCardBorder: 'none',
	postCardBorderDesktop: {
		top: '',
		right: '',
		bottom: '',
		left: '',
	},
	postCardBorderColor: '',
	postCardBorderRadiusDesktop: {
		top: '12',
		right: '12',
		bottom: '12',
		left: '12',
	},
	postCardBoxShadowCssValue: '',
	postCardBoxShadowHoverCssValue: '',
	postTitleFontFamily: '',
	postTitleFontSize: {
		Desktop: '18',
		Tablet: '18',
		Mobile: '18',
	},
	postTitleFontWeight: '600',
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
	postTitleHoverClassicColor: '#000000',
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
	postExcerptColor: '#45464d',
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
	authorNameColor: '#111c2d',
	postDateColor: '#45464d',
	postCategoryColor: '',
	postCategoryColorHover: '',
	postCategoryFontSize: {
		Desktop: '13',
		Tablet: '13',
		Mobile: '13',
	},
	postCategoryFontWeight: '',
	postCategoryTextTransform: '',
	postCategoryLetterSpacing: {
		Desktop: '',
		Tablet: '',
		Mobile: '',
	},
	readMoreButtonWidth: 'full',
	readMoreButtonColor: '#111c2d',
	readMoreButtonColorHover: '#FFFFFF',
	readMoreButtonIconColor: '#111c2d',
	readMoreButtonIconColorHover: '#FFFFFF',
	readMoreButtonNormalBackgroundType: 'classic',
	readMoreButtonNormalClassicColor: '#d2d2d2c7',
	readMoreButtonHoverBackgroundType: 'classic',
	readMoreButtonHoverClassicColor: '#787878b8',
	readMoreButtonTextDecoration: 'none',
	readMoreButtonDesktopPadding: {
		top: '',
		right: '',
		bottom: '',
		left: '',
	},
	readMoreButtonDesktopBorderRadius: {
		top: '',
		right: '',
		bottom: '',
		left: '',
	},
	readMoreButtonBoxShadowCssValue: '',
	readMoreButtonBoxShadowHoverCssValue: '',
	readMoreButtonHoverAnimation: 'none',
};

const ClassicCardPreview = () => (
	<svg
		viewBox="0 0 120 90"
		width="120"
		height="90"
		fill="none"
		aria-hidden="true"
	>
		<rect
			x="10"
			y="6"
			width="100"
			height="78"
			rx="6"
			fill="#ffffff"
			stroke="#cbd5e1"
			strokeWidth="1.5"
		/>
		<rect x="16" y="12" width="88" height="34" rx="4" fill="#dbeafe" />
		<rect x="20" y="16" width="22" height="6" rx="3" fill="#007cba" />
		<rect x="16" y="52" width="76" height="6" rx="3" fill="#334155" />
		<rect x="16" y="62" width="88" height="4" rx="2" fill="#94a3b8" />
		<rect x="16" y="72" width="32" height="6" rx="3" fill="#007cba" />
	</svg>
);

const presetClassicCard = {
	value: 'classic-card',
	label: __( 'Classic Card', 'gslider-blocks' ),
	description: __(
		'Standard 16:9 media top card with floating category badge and bottom-aligned CTA.',
		'gslider-blocks'
	),
	isDefault: true,
	preview: <ClassicCardPreview />,
	styles: classicCardStyles,
	attributes: Object.entries( classicCardStyles ).map(
		( [ label, value ] ) => ( { label, value } )
	),
};

export default presetClassicCard;
