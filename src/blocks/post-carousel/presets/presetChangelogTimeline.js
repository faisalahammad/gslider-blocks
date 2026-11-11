import { __ } from '@wordpress/i18n';
import { DEFAULT_POST_CAROUSEL_CONTENT_ORDER } from '../content-order';

export const changelogTimelineStyles = {
	postLayoutMode: 'timeline',
	presetStyle: 'changelog-timeline',
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
		Desktop: 600,
		Tablet: 600,
		Mobile: 600,
	},
	infiniteLoop: false,
	equalHeight: true,
	contentOrder: [ ...DEFAULT_POST_CAROUSEL_CONTENT_ORDER ],
	enableTaxonomyBadgeOverlay: false,
	imageHeight: {
		Desktop: '180',
		Tablet: '160',
		Mobile: '140',
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
	postCardBorderColor: '#e2e8f0',
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
		Desktop: '18',
		Tablet: '17',
		Mobile: '16',
	},
	postTitleFontWeight: '600',
	postTitleLineHeight: {
		Desktop: '1.4',
		Tablet: '1.4',
		Mobile: '1.4',
	},
	postTitleLineHeightUnits: {
		Desktop: 'em',
		Tablet: 'em',
		Mobile: 'em',
	},
	postTitleNormalBackgroundType: 'classic',
	postTitleNormalClassicColor: '#0f172a',
	postTitleHoverClassicColor: '#007cba',
	postTitleDesktopMargin: {
		top: '8',
		right: '0',
		bottom: '8',
		left: '0',
	},
	postExcerptFontSize: {
		Desktop: '14',
		Tablet: '14',
		Mobile: '13',
	},
	postExcerptColor: '#64748b',
	postExcerptLineHeight: {
		Desktop: '1.6',
		Tablet: '1.6',
		Mobile: '1.6',
	},
	postExcerptLineHeightUnits: {
		Desktop: 'em',
		Tablet: 'em',
		Mobile: 'em',
	},
	postExcerptDesktopMargin: {
		top: '0',
		right: '0',
		bottom: '16',
		left: '0',
	},
	authorNameColor: '#1e293b',
	postDateColor: '#64748b',
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
	readMoreButtonColor: '#007cba',
	readMoreButtonColorHover: '#005a87',
	readMoreButtonIconColor: '#007cba',
	readMoreButtonIconColorHover: '#005a87',
	readMoreButtonNormalBackgroundType: 'classic',
	readMoreButtonNormalClassicColor: 'transparent',
	readMoreButtonHoverBackgroundType: 'classic',
	readMoreButtonHoverClassicColor: 'transparent',
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

const ChangelogTimelinePreview = () => (
	<svg
		viewBox="0 0 120 90"
		width="120"
		height="90"
		fill="none"
		aria-hidden="true"
	>
		<line
			x1="6"
			y1="22"
			x2="114"
			y2="22"
			stroke="#cbd5e1"
			strokeWidth="2"
			strokeLinecap="round"
		/>
		{ /* Milestone Node 1 (left) */ }
		<rect x="14" y="8" width="22" height="6" rx="3" fill="#94a3b8" />
		<circle
			cx="25"
			cy="22"
			r="5"
			fill="#ffffff"
			stroke="#94a3b8"
			strokeWidth="2"
		/>
		<rect
			x="8"
			y="34"
			width="34"
			height="48"
			rx="4"
			fill="#f8fafc"
			stroke="#e2e8f0"
			strokeWidth="1"
		/>
		<rect x="12" y="40" width="26" height="4" rx="2" fill="#334155" />
		<rect x="12" y="48" width="22" height="3" rx="1.5" fill="#94a3b8" />
		<rect x="12" y="54" width="18" height="3" rx="1.5" fill="#94a3b8" />
		<rect x="12" y="66" width="14" height="4" rx="2" fill="#007cba" />

		{ /* Milestone Node 2 (center - active) */ }
		<rect x="48" y="6" width="24" height="7" rx="3.5" fill="#007cba" />
		<circle
			cx="60"
			cy="22"
			r="7"
			fill="#007cba"
			stroke="#bae6fd"
			strokeWidth="2.5"
		/>
		<rect
			x="43"
			y="34"
			width="34"
			height="48"
			rx="4"
			fill="#ffffff"
			stroke="#007cba"
			strokeWidth="1.5"
		/>
		<rect x="47" y="40" width="26" height="4" rx="2" fill="#0f172a" />
		<rect x="47" y="48" width="24" height="3" rx="1.5" fill="#64748b" />
		<rect x="47" y="54" width="20" height="3" rx="1.5" fill="#64748b" />
		<rect x="47" y="66" width="16" height="4" rx="2" fill="#007cba" />

		{ /* Milestone Node 3 (right) */ }
		<rect x="84" y="8" width="22" height="6" rx="3" fill="#94a3b8" />
		<circle
			cx="95"
			cy="22"
			r="5"
			fill="#ffffff"
			stroke="#94a3b8"
			strokeWidth="2"
		/>
		<rect
			x="78"
			y="34"
			width="34"
			height="48"
			rx="4"
			fill="#f8fafc"
			stroke="#e2e8f0"
			strokeWidth="1"
		/>
		<rect x="82" y="40" width="26" height="4" rx="2" fill="#334155" />
		<rect x="82" y="48" width="22" height="3" rx="1.5" fill="#94a3b8" />
		<rect x="82" y="54" width="18" height="3" rx="1.5" fill="#94a3b8" />
		<rect x="82" y="66" width="14" height="4" rx="2" fill="#007cba" />
	</svg>
);

const presetChangelogTimeline = {
	value: 'changelog-timeline',
	label: __( 'Changelog Timeline', 'gslider-blocks' ),
	description: __(
		'Horizontal chronological milestone rail with continuous connector stems and date nodes for changelogs and roadmaps.',
		'gslider-blocks'
	),
	preview: <ChangelogTimelinePreview />,
	styles: changelogTimelineStyles,
	attributes: Object.entries( changelogTimelineStyles ).map(
		( [ label, value ] ) => ( { label, value } )
	),
};

export default presetChangelogTimeline;
