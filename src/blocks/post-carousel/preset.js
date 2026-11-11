import presetClassicCard, {
	classicCardStyles,
} from './presets/presetClassicCard';
import presetModernOverlay, {
	modernOverlayStyles,
} from './presets/presetModernOverlay';
import presetEditorialSplit, {
	editorialSplitStyles,
} from './presets/presetEditorialSplit';
import presetCinematicHero, {
	cinematicHeroStyles,
} from './presets/presetCinematicHero';
import presetMinimalTypo, {
	minimalTypoStyles,
} from './presets/presetMinimalTypo';
import presetSpotlightCenter, {
	spotlightCenterStyles,
} from './presets/presetSpotlightCenter';
import presetNewsroomStage, {
	newsroomStageStyles,
} from './presets/presetNewsroomStage';
import presetChangelogTimeline, {
	changelogTimelineStyles,
} from './presets/presetChangelogTimeline';

/**
 * Post Carousel Block — Preset Styles Data Object
 *
 * Maps preset slugs to their attribute override objects (used by MCP schema extraction).
 */
export const presetStyles = {
	'classic-card': classicCardStyles,
	'modern-overlay': modernOverlayStyles,
	'editorial-split': editorialSplitStyles,
	'cinematic-hero': cinematicHeroStyles,
	'minimal-typo': minimalTypoStyles,
	'spotlight-center': spotlightCenterStyles,
	'newsroom-stage': newsroomStageStyles,
	'changelog-timeline': changelogTimelineStyles,
};

/**
 * Post Carousel Block Presets
 *
 * Consumed by @Components/preset-selector in LayoutModePanel.
 */
export const POST_CAROUSEL_PRESETS = [
	presetClassicCard,
	presetModernOverlay,
	presetEditorialSplit,
	presetCinematicHero,
	presetMinimalTypo,
	presetSpotlightCenter,
	presetNewsroomStage,
	presetChangelogTimeline,
];

export default POST_CAROUSEL_PRESETS;
