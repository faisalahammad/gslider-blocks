import { __ } from '@wordpress/i18n';
import { DEFAULT_POST_CAROUSEL_CONTENT_ORDER } from '../content-order';

export const spotlightCenterStyles = {
	postLayoutMode: 'overlay',
	presetStyle: 'spotlight-center',
	enableSpotlight: true,
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
		'linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.42) 60%, transparent 100%)',
	overlayScrimHeight: 75,
	timelineStemColor: '#e2e8f0',
	timelineStemThickness: 2,
	timelineDotSize: 16,
	timelineDotColor: '#007cba',
	timelineDatePosition: 'above',
	carouselPerColumn: {
		Desktop: 1.6,
		Tablet: 1.3,
		Mobile: 1.1,
	},
	carouselPerColumnGap: {
		Desktop: 24,
		Tablet: 18,
		Mobile: 12,
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

const SpotlightCenterPreview = () => (
	<svg
		viewBox="0 0 120 90"
		width="120"
		height="90"
		fill="none"
		aria-hidden="true"
	>
		<g opacity="0.5">
			<rect x="6" y="18" width="22" height="54" rx="5" fill="#94a3b8" />
			<rect x="92" y="18" width="22" height="54" rx="5" fill="#94a3b8" />
		</g>
		<rect
			x="31"
			y="8"
			width="58"
			height="74"
			rx="7"
			fill="#0f172a"
			stroke="#38bdf8"
			strokeWidth="1.5"
		/>
		<rect
			x="37"
			y="14"
			width="20"
			height="6"
			rx="3"
			fill="#ffffff"
			fillOpacity="0.3"
		/>
		<rect x="37" y="50" width="44" height="5.5" rx="2.75" fill="#ffffff" />
		<rect
			x="37"
			y="59"
			width="38"
			height="3.5"
			rx="1.75"
			fill="#cbd5e1"
			fillOpacity="0.85"
		/>
		<rect x="37" y="68" width="26" height="6" rx="3" fill="#38bdf8" />
	</svg>
);

const presetSpotlightCenter = {
	value: 'spotlight-center',
	label: __( 'Centered Spotlight', 'gslider-blocks' ),
	description: __(
		'Centered focus stage that scales up the active slide with depth shadow while subtly dimming peeking neighbor slides.',
		'gslider-blocks'
	),
	preview: <SpotlightCenterPreview />,
	styles: spotlightCenterStyles,
	attributes: Object.entries( spotlightCenterStyles ).map(
		( [ label, value ] ) => ( { label, value } )
	),
};

export default presetSpotlightCenter;
