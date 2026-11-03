import { __ } from '@wordpress/i18n';

export const CREATIVE_PRESET_OPTIONS = [
	{ label: __( 'Classic', 'gslider-blocks' ), value: 'classic' },
	{ label: __( '3D Stack', 'gslider-blocks' ), value: 'stack' },
	{ label: __( 'Dynamic Tilt', 'gslider-blocks' ), value: 'tilt' },
	{ label: __( 'Depth Flip', 'gslider-blocks' ), value: 'depth' },
	{ label: __( 'Minimal Shift', 'gslider-blocks' ), value: 'shift' },
];

// Classic is the old hardcoded effect, keep it unchanged so saved blocks stay valid.
export const CREATIVE_PRESETS = {
	classic: {
		prev: { shadow: true, translate: [ 0, 0, -400 ] },
		next: { translate: [ '100%', 0, 0 ] },
	},
	stack: {
		prev: { shadow: true, translate: [ '-120%', 0, -500 ] },
		next: { shadow: true, translate: [ '120%', 0, -500 ] },
	},
	tilt: {
		prev: {
			shadow: true,
			translate: [ '-20%', 0, -1 ],
			rotate: [ 0, 0, -10 ],
		},
		next: {
			shadow: true,
			translate: [ '100%', 0, 0 ],
			rotate: [ 0, 0, 0 ],
		},
	},
	depth: {
		prev: {
			shadow: true,
			translate: [ 0, 0, -800 ],
			rotate: [ 180, 0, 0 ],
		},
		next: {
			shadow: true,
			translate: [ 0, 0, -800 ],
			rotate: [ -180, 0, 0 ],
		},
	},
	shift: {
		prev: { shadow: false, translate: [ '-20%', 0, -200 ], opacity: 0 },
		next: { shadow: false, translate: [ '100%', 0, 0 ], opacity: 1 },
	},
};

// Own-property check so values like "toString" fall back to classic.
// Vertical sliders move on Y, so swap the X and Y translate values.
export const getCreativePreset = ( preset, direction ) => {
	const config = Object.prototype.hasOwnProperty.call(
		CREATIVE_PRESETS,
		preset
	)
		? CREATIVE_PRESETS[ preset ]
		: CREATIVE_PRESETS.classic;

	if ( direction !== 'vertical' ) {
		return config;
	}

	const toVertical = ( side ) => ( {
		...side,
		translate: [
			side.translate[ 1 ],
			side.translate[ 0 ],
			side.translate[ 2 ],
		],
	} );

	return { prev: toVertical( config.prev ), next: toVertical( config.next ) };
};
