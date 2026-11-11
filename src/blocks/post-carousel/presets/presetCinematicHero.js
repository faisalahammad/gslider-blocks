import { __ } from '@wordpress/i18n';
import { DEFAULT_POST_CAROUSEL_CONTENT_ORDER } from '../content-order';

export const cinematicHeroStyles = {
	postLayoutMode: 'hero',
	presetStyle: 'cinematic-hero',
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
		'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.35) 55%, rgba(15, 23, 42, 0.1) 100%)',
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
		top: '16',
		right: '16',
		bottom: '16',
		left: '16',
	},
	postCardBoxShadowCssValue: '',
	postCardBoxShadowHoverCssValue: '',
	postTitleFontFamily: '',
	postTitleFontSize: {
		Desktop: '',
		Tablet: '',
		Mobile: '',
	},
	postTitleFontWeight: '800',
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
	postExcerptColor: 'rgba(255, 255, 255, 0.9)',
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
	postDateColor: 'rgba(255, 255, 255, 0.85)',
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
		top: '12',
		right: '26',
		bottom: '12',
		left: '26',
	},
	readMoreButtonDesktopBorderRadius: {
		top: '999',
		right: '999',
		bottom: '999',
		left: '999',
	},
	readMoreButtonBoxShadowCssValue: '0 8px 20px rgba(0, 124, 186, 0.35)',
	readMoreButtonBoxShadowHoverCssValue: '0 12px 24px rgba(0, 124, 186, 0.45)',
	readMoreButtonHoverAnimation: 'float',
};

const CinematicHeroPreview = () => (
	<svg
		viewBox="0 0 120 90"
		width="120"
		height="90"
		fill="none"
		aria-hidden="true"
	>
		<defs>
			<linearGradient
				id="gsliderPresetHeroScrim"
				x1="60"
				y1="14"
				x2="60"
				y2="82"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0%" stopColor="#1e293b" stopOpacity="0.15" />
				<stop offset="100%" stopColor="#0f172a" stopOpacity="0.88" />
			</linearGradient>
		</defs>
		<rect x="8" y="8" width="104" height="74" rx="7" fill="#bae6fd" />
		<path
			d="M8 62 L38 36 L66 56 L88 40 L112 60 L112 82 L8 82 Z"
			fill="#7dd3fc"
			fillOpacity="0.65"
		/>
		<rect
			x="8"
			y="8"
			width="104"
			height="74"
			rx="7"
			fill="url(#gsliderPresetHeroScrim)"
		/>
		<rect
			x="16"
			y="15"
			width="24"
			height="6"
			rx="3"
			fill="#ffffff"
			fillOpacity="0.32"
		/>
		<rect
			x="16"
			y="41"
			width="66"
			height="33"
			rx="5"
			fill="#0f172a"
			fillOpacity="0.52"
			stroke="#ffffff"
			strokeOpacity="0.22"
			strokeWidth="1"
		/>
		<rect x="22" y="47" width="52" height="6" rx="3" fill="#ffffff" />
		<rect
			x="22"
			y="56"
			width="44"
			height="3.5"
			rx="1.75"
			fill="#e2e8f0"
			fillOpacity="0.85"
		/>
		<rect x="22" y="63" width="24" height="6.5" rx="3.25" fill="#007cba" />
	</svg>
);

const presetCinematicHero = {
	value: 'cinematic-hero',
	label: __( 'Cinematic Hero', 'gslider-blocks' ),
	description: __(
		'Full-width magazine hero stage with responsive height, frosted glass scrim, fluid headline typography, and elevated pill CTA.',
		'gslider-blocks'
	),
	preview: <CinematicHeroPreview />,
	styles: cinematicHeroStyles,
	attributes: Object.entries( cinematicHeroStyles ).map(
		( [ label, value ] ) => ( { label, value } )
	),
};

export default presetCinematicHero;
