import { __ } from '@wordpress/i18n';
import { DEFAULT_POST_CAROUSEL_CONTENT_ORDER } from '../content-order';

export const modernOverlayStyles = {
	postLayoutMode: 'overlay',
	presetStyle: 'modern-overlay',
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
	equalHeight: true,
	contentOrder: [ ...DEFAULT_POST_CAROUSEL_CONTENT_ORDER ],
	enableTaxonomyBadgeOverlay: true,
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
	imageHeight: {
		Desktop: '',
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
		top: '14',
		right: '14',
		bottom: '14',
		left: '14',
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
	postTitleNormalClassicColor: '#ffffff',
	postTitleHoverClassicColor: '#e2e8f0',
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
	postExcerptColor: 'rgba(255, 255, 255, 0.88)',
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
	authorNameColor: '#ffffff',
	postDateColor: 'rgba(255, 255, 255, 0.8)',
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

const ModernOverlayPreview = () => (
	<svg
		viewBox="0 0 120 90"
		width="120"
		height="90"
		fill="none"
		aria-hidden="true"
	>
		<defs>
			<linearGradient
				id="gsliderPresetOverlayScrim"
				x1="60"
				y1="26"
				x2="60"
				y2="84"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0%" stopColor="#0f172a" stopOpacity="0.15" />
				<stop offset="100%" stopColor="#0f172a" stopOpacity="0.92" />
			</linearGradient>
		</defs>
		<rect x="10" y="6" width="100" height="78" rx="7" fill="#93c5fd" />
		<rect
			x="10"
			y="6"
			width="100"
			height="78"
			rx="7"
			fill="url(#gsliderPresetOverlayScrim)"
		/>
		<rect
			x="18"
			y="14"
			width="24"
			height="7"
			rx="3.5"
			fill="#ffffff"
			fillOpacity="0.35"
		/>
		<rect x="18" y="48" width="76" height="6" rx="3" fill="#ffffff" />
		<rect
			x="18"
			y="58"
			width="84"
			height="4"
			rx="2"
			fill="#e2e8f0"
			fillOpacity="0.85"
		/>
		<rect x="18" y="68" width="32" height="6" rx="3" fill="#38bdf8" />
	</svg>
);

const presetModernOverlay = {
	value: 'modern-overlay',
	label: __( 'Modern Overlay', 'gslider-blocks' ),
	description: __(
		'Full-bleed media background with bottom dark gradient scrim, frosted glass pills, and crisp white text.',
		'gslider-blocks'
	),
	preview: <ModernOverlayPreview />,
	styles: modernOverlayStyles,
	attributes: Object.entries( modernOverlayStyles ).map(
		( [ label, value ] ) => ( { label, value } )
	),
};

export default presetModernOverlay;
