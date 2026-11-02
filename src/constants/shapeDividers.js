import { __ } from '@wordpress/i18n';

export const SHAPE_DIVIDER_OPTIONS = [
	{ label: __( 'Wave', 'gslider-blocks' ), value: 'wave-1' },
	{ label: __( 'Double Wave', 'gslider-blocks' ), value: 'wave-2' },
	{ label: __( 'Curve', 'gslider-blocks' ), value: 'curve' },
	{
		label: __( 'Curve Asymmetric', 'gslider-blocks' ),
		value: 'curve-asymmetric',
	},
	{ label: __( 'Tilt', 'gslider-blocks' ), value: 'tilt' },
	{ label: __( 'Triangle', 'gslider-blocks' ), value: 'triangle' },
	{ label: __( 'Arrow', 'gslider-blocks' ), value: 'arrow' },
	{ label: __( 'Mountains', 'gslider-blocks' ), value: 'mountains' },
	{ label: __( 'Zigzag', 'gslider-blocks' ), value: 'zigzag' },
	{ label: __( 'Scallops', 'gslider-blocks' ), value: 'scallops' },
];

export const SHAPE_DIVIDER_POSITION = [
	{ label: __( 'Top', 'gslider-blocks' ), value: 'top' },
	{ label: __( 'Bottom', 'gslider-blocks' ), value: 'bottom' },
];

// Per unit limits, so a % or vh height can't grow past the slider.
export const SHAPE_DIVIDER_HEIGHT_BOUNDS = {
	px: { min: 10, max: 500, step: 1 },
	'%': { min: 1, max: 100, step: 1 },
	vh: { min: 1, max: 100, step: 1 },
	vw: { min: 1, max: 100, step: 1 },
	em: { min: 1, max: 30, step: 0.5 },
	rem: { min: 1, max: 30, step: 0.5 },
};

export const SHAPE_DIVIDER_HEIGHT_FALLBACK = {
	px: '50',
	'%': '10',
	vh: '10',
	vw: '10',
	em: '3',
	rem: '3',
};

// All paths use viewBox "0 0 1000 100" and fill from the top edge.
export const SHAPE_DIVIDER_PATHS = {
	'wave-1': 'M0,0 V40 C150,90 350,90 500,50 C650,10 850,10 1000,60 V0 Z',
	'wave-2': 'M0,0 V50 Q125,100 250,50 T500,50 T750,50 T1000,50 V0 Z',
	curve: 'M0,0 Q500,200 1000,0 Z',
	'curve-asymmetric': 'M0,0 Q300,200 1000,0 Z',
	tilt: 'M0,0 H1000 L0,100 Z',
	triangle: 'M0,0 H1000 L500,100 Z',
	arrow: 'M0,0 H1000 V40 H530 L500,100 L470,40 H0 Z',
	mountains: 'M0,0 H1000 V60 L850,20 L700,70 L520,10 L350,80 L180,30 L0,70 Z',
	zigzag: 'M0,0 H1000 V30 L950,70 L900,30 L850,70 L800,30 L750,70 L700,30 L650,70 L600,30 L550,70 L500,30 L450,70 L400,30 L350,70 L300,30 L250,70 L200,30 L150,70 L100,30 L50,70 L0,30 Z',
	scallops:
		'M0,0 H1000 V50 A62.5,40 0 0 1 875,50 A62.5,40 0 0 1 750,50 A62.5,40 0 0 1 625,50 A62.5,40 0 0 1 500,50 A62.5,40 0 0 1 375,50 A62.5,40 0 0 1 250,50 A62.5,40 0 0 1 125,50 A62.5,40 0 0 1 0,50 Z',
};

// Shared by edit.js and save.js. Unknown shape renders nothing.
export const renderShapeDivider = ( position, shape ) =>
	SHAPE_DIVIDER_PATHS[ shape ] ? (
		<div
			className={ `gslider-shape-divider gslider-shape-divider-${ position }` }
			aria-hidden="true"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1000 100"
				preserveAspectRatio="none"
				focusable="false"
			>
				<path
					className="gslider-shape-divider-fill"
					d={ SHAPE_DIVIDER_PATHS[ shape ] }
				/>
				{ /* Invert needs the opposite area, so the fill still touches the slider edge after the flip. */ }
				<path
					className="gslider-shape-divider-fill-invert"
					fillRule="evenodd"
					d={ `M0,0 H1000 V100 H0 Z ${ SHAPE_DIVIDER_PATHS[ shape ] }` }
				/>
			</svg>
		</div>
	) : null;
