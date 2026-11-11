import { __ } from '@wordpress/i18n';
import { DEFAULT_POST_CAROUSEL_CONTENT_ORDER } from '../content-order';

export const newsroomStageStyles = {
	postLayoutMode: 'newsroom',
	presetStyle: 'newsroom-stage',
	newsroomMainWidth: 65,
	newsroomQueuePosition: 'right',
	enableSpotlight: false,
	spotlightScaleSide: 0.92,
	spotlightOpacitySide: 0.65,
	heroHeightDesktop: 520,
	heroHeightTablet: 420,
	heroHeightMobile: 340,
	heroContentAlignment: 'bottom-left',
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
		Desktop: 1,
		Tablet: 1,
		Mobile: 1,
	},
	carouselPerColumnGap: {
		Desktop: 0,
		Tablet: 0,
		Mobile: 0,
	},
	carouselEffect: 'slide',
	speed: {
		Desktop: 600,
		Tablet: 600,
		Mobile: 600,
	},
	infiniteLoop: true,
	equalHeight: true,
	contentOrder: [ ...DEFAULT_POST_CAROUSEL_CONTENT_ORDER ],
	enableTaxonomyBadgeOverlay: true,
	imageHeight: {
		Desktop: '380',
		Tablet: '320',
		Mobile: '220',
	},
	postCardNormalBackgroundType: 'classic',
	postCardNormalClassicColor: '#ffffff',
	postCardPaddingDesktop: {
		top: '20',
		right: '20',
		bottom: '20',
		left: '20',
	},
	postCardBorder: 'solid',
	postCardBorderDesktop: {
		top: '1',
		right: '1',
		bottom: '1',
		left: '1',
	},
	postCardBorderColor: '#e5e7eb',
	postCardBorderRadiusDesktop: {
		top: '12',
		right: '12',
		bottom: '12',
		left: '12',
	},
	postCardBoxShadowCssValue: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
	postCardBoxShadowHoverCssValue: '',
	postTitleFontFamily: '',
	postTitleFontSize: {
		Desktop: '24',
		Tablet: '20',
		Mobile: '18',
	},
	postTitleFontWeight: '700',
	postTitleLineHeight: {
		Desktop: '1.25',
		Tablet: '1.25',
		Mobile: '1.25',
	},
	postTitleLineHeightUnits: {
		Desktop: 'em',
		Tablet: 'em',
		Mobile: 'em',
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
	postCategoryColor: '',
	postCategoryColorHover: '',
	postCategoryFontSize: {
		Desktop: '12',
		Tablet: '12',
		Mobile: '12',
	},
	postCategoryFontWeight: '600',
	postCategoryTextTransform: '',
	postCategoryLetterSpacing: {
		Desktop: '',
		Tablet: '',
		Mobile: '',
	},
	readMoreButtonWidth: 'auto',
	readMoreButtonColor: '#ffffff',
	readMoreButtonColorHover: '#ffffff',
	readMoreButtonIconColor: '#ffffff',
	readMoreButtonIconColorHover: '#ffffff',
	readMoreButtonNormalBackgroundType: 'classic',
	readMoreButtonNormalClassicColor: '#007cba',
	readMoreButtonHoverBackgroundType: 'classic',
	readMoreButtonHoverClassicColor: '#005a87',
	readMoreButtonTextDecoration: 'none',
	readMoreButtonDesktopPadding: {
		top: '10',
		right: '20',
		bottom: '10',
		left: '20',
	},
	readMoreButtonDesktopBorderRadius: {
		top: '6',
		right: '6',
		bottom: '6',
		left: '6',
	},
	readMoreButtonBoxShadowCssValue: '',
	readMoreButtonBoxShadowHoverCssValue: '',
	readMoreButtonHoverAnimation: 'none',
};

const NewsroomStagePreview = () => (
	<svg
		viewBox="0 0 120 90"
		width="100%"
		height="100%"
		className="gslider-preset-preview-svg"
		aria-hidden="true"
		focusable="false"
	>
		{ /* Featured Story Main Card (Left) */ }
		<rect
			x="8"
			y="10"
			width="66"
			height="70"
			rx="5"
			fill="#ffffff"
			stroke="#cbd5e1"
			strokeWidth="1"
		/>
		<rect x="12" y="14" width="58" height="34" rx="3" fill="#e0f2fe" />
		<path
			d="M12 40 L28 26 L44 38 L54 28 L70 42 L70 48 L12 48 Z"
			fill="#7dd3fc"
			fillOpacity="0.75"
		/>
		<rect x="16" y="18" width="18" height="5" rx="2.5" fill="#007cba" />
		<rect x="12" y="53" width="50" height="5.5" rx="2" fill="#111c2d" />
		<rect
			x="12"
			y="61"
			width="42"
			height="3.5"
			rx="1.5"
			fill="#64748b"
			fillOpacity="0.8"
		/>
		<rect x="12" y="68" width="20" height="5" rx="2.5" fill="#007cba" />

		{ /* Headline Queue (Right 4 items) */ }
		{ /* Item 1 (Active) */ }
		<rect
			x="78"
			y="10"
			width="34"
			height="15"
			rx="3"
			fill="#f0f7fb"
			stroke="#007cba"
			strokeWidth="1"
		/>
		<rect x="78" y="10" width="2" height="15" rx="1" fill="#007cba" />
		<rect x="83" y="12" width="9" height="11" rx="2" fill="#bae6fd" />
		<rect x="95" y="13" width="14" height="3.5" rx="1" fill="#007cba" />
		<rect
			x="95"
			y="18.5"
			width="10"
			height="2.5"
			rx="1"
			fill="#64748b"
			fillOpacity="0.75"
		/>

		{ /* Item 2 */ }
		<rect
			x="78"
			y="28"
			width="34"
			height="15"
			rx="3"
			fill="#ffffff"
			stroke="#e2e8f0"
			strokeWidth="0.8"
		/>
		<rect x="83" y="30" width="9" height="11" rx="2" fill="#e2e8f0" />
		<rect x="95" y="31" width="14" height="3.5" rx="1" fill="#475569" />
		<rect
			x="95"
			y="36.5"
			width="10"
			height="2.5"
			rx="1"
			fill="#94a3b8"
			fillOpacity="0.75"
		/>

		{ /* Item 3 */ }
		<rect
			x="78"
			y="46"
			width="34"
			height="15"
			rx="3"
			fill="#ffffff"
			stroke="#e2e8f0"
			strokeWidth="0.8"
		/>
		<rect x="83" y="48" width="9" height="11" rx="2" fill="#e2e8f0" />
		<rect x="95" y="49" width="14" height="3.5" rx="1" fill="#475569" />
		<rect
			x="95"
			y="54.5"
			width="10"
			height="2.5"
			rx="1"
			fill="#94a3b8"
			fillOpacity="0.75"
		/>

		{ /* Item 4 */ }
		<rect
			x="78"
			y="64"
			width="34"
			height="15"
			rx="3"
			fill="#ffffff"
			stroke="#e2e8f0"
			strokeWidth="0.8"
		/>
		<rect x="83" y="66" width="9" height="11" rx="2" fill="#e2e8f0" />
		<rect x="95" y="67" width="14" height="3.5" rx="1" fill="#475569" />
		<rect
			x="95"
			y="72.5"
			width="10"
			height="2.5"
			rx="1"
			fill="#94a3b8"
			fillOpacity="0.75"
		/>
	</svg>
);

const presetNewsroomStage = {
	value: 'newsroom-stage',
	label: __( 'Newsroom Stage', 'gslider-blocks' ),
	description: __(
		'Interactive media newsroom stage coordinating a primary featured slider with a synchronized vertical headline playlist via Swiper Thumbs.',
		'gslider-blocks'
	),
	preview: <NewsroomStagePreview />,
	styles: newsroomStageStyles,
	attributes: Object.entries( newsroomStageStyles ).map(
		( [ label, value ] ) => ( { label, value } )
	),
};

export default presetNewsroomStage;
