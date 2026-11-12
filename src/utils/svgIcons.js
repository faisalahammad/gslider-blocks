/**
 * SVG Icons Library
 * Central location for all reusable SVG icons in the plugin
 *
 * Usage:
 * import { IconName } from '@Utils/svgIcons';
 * <Button icon={<IconName />} />
 */

// =============================================================================
// TOOLBAR ACTION ICONS (Flaticon-style bold icons)
// Used in carousel action toolbars for move, delete, duplicate, link actions
// =============================================================================

export const ToolbarMoveLeftIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 512 512"
		fill="currentColor"
	>
		<path d="M340.2 98.4c-12.7-12.7-33.3-12.7-46 0L154.4 238.2c-12.7 12.7-12.7 33.3 0 46l139.8 139.8c12.7 12.7 33.3 12.7 46 0 12.7-12.7 12.7-33.3 0-46L223.4 261.2l116.8-116.8c12.7-12.7 12.7-33.3 0-46z" />
	</svg>
);

export const ToolbarMoveRightIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 512 512"
		fill="currentColor"
	>
		<path d="M171.8 98.4c12.7-12.7 33.3-12.7 46 0l139.8 139.8c12.7 12.7 12.7 33.3 0 46L217.8 424c-12.7 12.7-33.3 12.7-46 0-12.7-12.7-12.7-33.3 0-46l116.8-116.8-116.8-116.8c-12.7-12.7-12.7-33.3 0-46z" />
	</svg>
);

export const ToolbarDeleteIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
	</svg>
);

export const ToolbarDuplicateIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
	</svg>
);

export const ToolbarLinkIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
	</svg>
);

export const ToolbarVideoIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M10 8v8l5-4-5-4zm9-5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm2 16H3V5h18v14z" />
	</svg>
);

// =============================================================================
// ADD MORE ICON CATEGORIES BELOW
// Example: Navigation icons, UI icons, Social icons, etc.
// =============================================================================
