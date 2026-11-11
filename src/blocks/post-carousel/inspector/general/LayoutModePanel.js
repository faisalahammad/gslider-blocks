/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import PresetSelector from '@Components/preset-selector';
import SelectControls from '@Components/select-controls';
import SwitcherControl from '@Components/switcher-control';
import GradientColorControl from '@Components/gradient-color-control';
import ColorControl from '@Components/color-control';
import InputControls from '@Components/input-control';
import { POST_CAROUSEL_PRESETS } from '../../preset';

const LAYOUT_MODE_OPTIONS = [
	{ label: __( 'Classic', 'gslider-blocks' ), value: 'classic' },
	{ label: __( 'Overlay', 'gslider-blocks' ), value: 'overlay' },
	{ label: __( 'Horizontal', 'gslider-blocks' ), value: 'horizontal' },
	{ label: __( 'Cinematic Hero', 'gslider-blocks' ), value: 'hero' },
	{
		label: __( 'Minimal Typographic', 'gslider-blocks' ),
		value: 'minimal',
	},
	{
		label: __( 'Newsroom Stage', 'gslider-blocks' ),
		value: 'newsroom',
	},
	{
		label: __( 'Timeline Rail', 'gslider-blocks' ),
		value: 'timeline',
	},
];

const TIMELINE_DATE_POSITION_OPTIONS = [
	{ label: __( 'Above Dot', 'gslider-blocks' ), value: 'above' },
	{ label: __( 'Below Dot', 'gslider-blocks' ), value: 'below' },
];

const NEWSROOM_QUEUE_POSITIONS = [
	{ label: __( 'Right', 'gslider-blocks' ), value: 'right' },
	{ label: __( 'Left', 'gslider-blocks' ), value: 'left' },
];

const HERO_ALIGNMENT_OPTIONS = [
	{ label: __( 'Bottom Left', 'gslider-blocks' ), value: 'bottom-left' },
	{ label: __( 'Center', 'gslider-blocks' ), value: 'center' },
	{ label: __( 'Bottom Center', 'gslider-blocks' ), value: 'bottom-center' },
];

const MEDIA_POSITION_OPTIONS = [
	{ label: __( 'Left', 'gslider-blocks' ), value: 'left' },
	{ label: __( 'Right', 'gslider-blocks' ), value: 'right' },
];

const DEFAULT_OVERLAY_SCRIM =
	'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)';

/**
 * Clamp numeric integer input within inclusive bounds.
 *
 * @param {string|number} raw      Raw input value.
 * @param {number}        min      Minimum allowed value.
 * @param {number}        max      Maximum allowed value.
 * @param {number}        fallback Default fallback value.
 * @return {number} Clamped integer value.
 */
const clampNumber = ( raw, min, max, fallback ) => {
	const parsed = parseInt( raw, 10 );
	if ( Number.isNaN( parsed ) ) {
		return fallback;
	}
	return Math.min( max, Math.max( min, parsed ) );
};

/**
 * Clamp floating-point input within inclusive bounds.
 *
 * @param {string|number} raw      Raw input value.
 * @param {number}        min      Minimum allowed value.
 * @param {number}        max      Maximum allowed value.
 * @param {number}        fallback Default fallback value.
 * @return {number} Clamped two-decimal float value.
 */
const clampFloat = ( raw, min, max, fallback ) => {
	const parsed = parseFloat( raw );
	if ( Number.isNaN( parsed ) ) {
		return fallback;
	}
	return Number( Math.min( max, Math.max( min, parsed ) ).toFixed( 2 ) );
};

/**
 * Inspector panel for curated card layout presets and contextual archetype controls.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Layout & Presets inspector panel.
 */
const LayoutModePanel = ( { attributes, setAttributes, isOpen, onToggle } ) => {
	const {
		presetStyle = 'classic-card',
		postLayoutMode = 'classic',
		heroHeightDesktop = 520,
		heroHeightTablet = 420,
		heroHeightMobile = 340,
		heroContentAlignment = 'bottom-left',
		enableSpotlight = false,
		spotlightScaleSide = 0.92,
		spotlightOpacitySide = 0.65,
		newsroomMainWidth = 65,
		newsroomQueuePosition = 'right',
		horizontalMediaWidth = 45,
		horizontalMediaPosition = 'left',
		overlayGradientScrim = DEFAULT_OVERLAY_SCRIM,
		overlayScrimHeight = 75,
		timelineStemColor = '#e2e8f0',
		timelineStemThickness = 2,
		timelineDotSize = 16,
		timelineDotColor = '#007cba',
		timelineDatePosition = 'above',
	} = attributes;

	const [ isCustomScrim, setIsCustomScrim ] = useState( false );
	const [ scrimHeightDraft, setScrimHeightDraft ] = useState(
		String( overlayScrimHeight )
	);
	const [ mediaWidthDraft, setMediaWidthDraft ] = useState(
		String( horizontalMediaWidth )
	);
	const [ heroDesktopDraft, setHeroDesktopDraft ] = useState(
		String( heroHeightDesktop )
	);
	const [ heroTabletDraft, setHeroTabletDraft ] = useState(
		String( heroHeightTablet )
	);
	const [ heroMobileDraft, setHeroMobileDraft ] = useState(
		String( heroHeightMobile )
	);
	const [ spotlightScaleDraft, setSpotlightScaleDraft ] = useState(
		Number( spotlightScaleSide ).toFixed( 2 )
	);
	const [ spotlightOpacityDraft, setSpotlightOpacityDraft ] = useState(
		Number( spotlightOpacitySide ).toFixed( 2 )
	);
	const [ newsroomWidthDraft, setNewsroomWidthDraft ] = useState(
		String( newsroomMainWidth )
	);
	const [ timelineThicknessDraft, setTimelineThicknessDraft ] = useState(
		String( timelineStemThickness )
	);
	const [ timelineDotSizeDraft, setTimelineDotSizeDraft ] = useState(
		String( timelineDotSize )
	);

	useEffect( () => {
		setScrimHeightDraft( ( prev ) =>
			parseInt( prev, 10 ) === overlayScrimHeight
				? prev
				: String( overlayScrimHeight )
		);
	}, [ overlayScrimHeight ] );

	useEffect( () => {
		setMediaWidthDraft( ( prev ) =>
			parseInt( prev, 10 ) === horizontalMediaWidth
				? prev
				: String( horizontalMediaWidth )
		);
	}, [ horizontalMediaWidth ] );

	useEffect( () => {
		setHeroDesktopDraft( ( prev ) =>
			parseInt( prev, 10 ) === heroHeightDesktop
				? prev
				: String( heroHeightDesktop )
		);
	}, [ heroHeightDesktop ] );

	useEffect( () => {
		setHeroTabletDraft( ( prev ) =>
			parseInt( prev, 10 ) === heroHeightTablet
				? prev
				: String( heroHeightTablet )
		);
	}, [ heroHeightTablet ] );

	useEffect( () => {
		setHeroMobileDraft( ( prev ) =>
			parseInt( prev, 10 ) === heroHeightMobile
				? prev
				: String( heroHeightMobile )
		);
	}, [ heroHeightMobile ] );

	useEffect( () => {
		setSpotlightScaleDraft( ( prev ) =>
			Math.abs( parseFloat( prev ) - spotlightScaleSide ) < 0.0001
				? prev
				: Number( spotlightScaleSide ).toFixed( 2 )
		);
	}, [ spotlightScaleSide ] );

	useEffect( () => {
		setSpotlightOpacityDraft( ( prev ) =>
			Math.abs( parseFloat( prev ) - spotlightOpacitySide ) < 0.0001
				? prev
				: Number( spotlightOpacitySide ).toFixed( 2 )
		);
	}, [ spotlightOpacitySide ] );

	useEffect( () => {
		setNewsroomWidthDraft( ( prev ) =>
			parseInt( prev, 10 ) === newsroomMainWidth
				? prev
				: String( newsroomMainWidth )
		);
	}, [ newsroomMainWidth ] );

	useEffect( () => {
		setTimelineThicknessDraft( ( prev ) =>
			parseInt( prev, 10 ) === timelineStemThickness
				? prev
				: String( timelineStemThickness )
		);
	}, [ timelineStemThickness ] );

	useEffect( () => {
		setTimelineDotSizeDraft( ( prev ) =>
			parseInt( prev, 10 ) === timelineDotSize
				? prev
				: String( timelineDotSize )
		);
	}, [ timelineDotSize ] );

	const handleScrimHeightChange = ( raw ) => {
		setScrimHeightDraft( raw );
		const parsed = parseInt( raw, 10 );
		if ( ! Number.isNaN( parsed ) && parsed >= 40 && parsed <= 100 ) {
			setAttributes( { overlayScrimHeight: parsed } );
		}
	};

	const commitScrimHeight = () => {
		const clamped = clampNumber( scrimHeightDraft, 40, 100, 75 );
		setScrimHeightDraft( String( clamped ) );
		if ( clamped !== overlayScrimHeight ) {
			setAttributes( { overlayScrimHeight: clamped } );
		}
	};

	const handleMediaWidthChange = ( raw ) => {
		setMediaWidthDraft( raw );
		const parsed = parseInt( raw, 10 );
		if ( ! Number.isNaN( parsed ) && parsed >= 30 && parsed <= 60 ) {
			setAttributes( { horizontalMediaWidth: parsed } );
		}
	};

	const commitMediaWidth = () => {
		const clamped = clampNumber( mediaWidthDraft, 30, 60, 45 );
		setMediaWidthDraft( String( clamped ) );
		if ( clamped !== horizontalMediaWidth ) {
			setAttributes( { horizontalMediaWidth: clamped } );
		}
	};

	const handleHeroHeightChange = ( raw, setter, key ) => {
		setter( raw );
		const parsed = parseInt( raw, 10 );
		if ( ! Number.isNaN( parsed ) && parsed >= 200 && parsed <= 1200 ) {
			setAttributes( { [ key ]: parsed } );
		}
	};

	const commitHeroHeight = ( draft, setter, key, fallback, currentVal ) => {
		const clamped = clampNumber( draft, 200, 1200, fallback );
		setter( String( clamped ) );
		if ( clamped !== currentVal ) {
			setAttributes( { [ key ]: clamped } );
		}
	};

	const handleSpotlightScaleChange = ( raw ) => {
		setSpotlightScaleDraft( raw );
		const parsed = parseFloat( raw );
		if ( ! Number.isNaN( parsed ) && parsed >= 0.8 && parsed <= 0.98 ) {
			setAttributes( {
				spotlightScaleSide: Number( parsed.toFixed( 2 ) ),
			} );
		}
	};

	const commitSpotlightScale = () => {
		const clamped = clampFloat( spotlightScaleDraft, 0.8, 0.98, 0.92 );
		setSpotlightScaleDraft( clamped.toFixed( 2 ) );
		if ( Math.abs( clamped - spotlightScaleSide ) >= 0.0001 ) {
			setAttributes( { spotlightScaleSide: clamped } );
		}
	};

	const handleSpotlightOpacityChange = ( raw ) => {
		setSpotlightOpacityDraft( raw );
		const parsed = parseFloat( raw );
		if ( ! Number.isNaN( parsed ) && parsed >= 0.3 && parsed <= 1.0 ) {
			setAttributes( {
				spotlightOpacitySide: Number( parsed.toFixed( 2 ) ),
			} );
		}
	};

	const commitSpotlightOpacity = () => {
		const clamped = clampFloat( spotlightOpacityDraft, 0.3, 1.0, 0.65 );
		setSpotlightOpacityDraft( clamped.toFixed( 2 ) );
		if ( Math.abs( clamped - spotlightOpacitySide ) >= 0.0001 ) {
			setAttributes( { spotlightOpacitySide: clamped } );
		}
	};

	return (
		<PanelBody
			title={ __( 'Layout & Presets', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<PresetSelector
				label={ __( 'Card Preset', 'gslider-blocks' ) }
				presets={ POST_CAROUSEL_PRESETS }
				value={ presetStyle }
				onChange={ ( value ) =>
					setAttributes( { presetStyle: value } )
				}
				setAttributes={ setAttributes }
				currentAttributes={ attributes }
				columns={ 3 }
				defaultPresetValue="classic-card"
			/>

			<SelectControls
				label={ __( 'Layout Archetype', 'gslider-blocks' ) }
				options={ LAYOUT_MODE_OPTIONS }
				value={ postLayoutMode }
				onChange={ ( value ) =>
					setAttributes( { postLayoutMode: value } )
				}
			/>

			{ postLayoutMode === 'hero' && (
				<>
					<SelectControls
						label={ __(
							'Hero Content Alignment',
							'gslider-blocks'
						) }
						options={ HERO_ALIGNMENT_OPTIONS }
						value={ heroContentAlignment }
						onChange={ ( value ) =>
							setAttributes( { heroContentAlignment: value } )
						}
					/>

					<div
						onBlur={ () =>
							commitHeroHeight(
								heroDesktopDraft,
								setHeroDesktopDraft,
								'heroHeightDesktop',
								520,
								heroHeightDesktop
							)
						}
					>
						<InputControls
							label={ __(
								'Hero Min Height Desktop (px)',
								'gslider-blocks'
							) }
							value={ heroDesktopDraft }
							onChangeValue={ ( raw ) =>
								handleHeroHeightChange(
									raw,
									setHeroDesktopDraft,
									'heroHeightDesktop'
								)
							}
							helpText={ __(
								'Minimum hero stage height on desktop (200–1200px).',
								'gslider-blocks'
							) }
						/>
					</div>

					<div
						onBlur={ () =>
							commitHeroHeight(
								heroTabletDraft,
								setHeroTabletDraft,
								'heroHeightTablet',
								420,
								heroHeightTablet
							)
						}
					>
						<InputControls
							label={ __(
								'Hero Min Height Tablet (px)',
								'gslider-blocks'
							) }
							value={ heroTabletDraft }
							onChangeValue={ ( raw ) =>
								handleHeroHeightChange(
									raw,
									setHeroTabletDraft,
									'heroHeightTablet'
								)
							}
							helpText={ __(
								'Minimum hero stage height on tablet (200–1200px).',
								'gslider-blocks'
							) }
						/>
					</div>

					<div
						onBlur={ () =>
							commitHeroHeight(
								heroMobileDraft,
								setHeroMobileDraft,
								'heroHeightMobile',
								340,
								heroHeightMobile
							)
						}
					>
						<InputControls
							label={ __(
								'Hero Min Height Mobile (px)',
								'gslider-blocks'
							) }
							value={ heroMobileDraft }
							onChangeValue={ ( raw ) =>
								handleHeroHeightChange(
									raw,
									setHeroMobileDraft,
									'heroHeightMobile'
								)
							}
							helpText={ __(
								'Minimum hero stage height on mobile (200–1200px).',
								'gslider-blocks'
							) }
						/>
					</div>
				</>
			) }

			{ postLayoutMode === 'overlay' && (
				<>
					<GradientColorControl
						label={ __(
							'Overlay Gradient Scrim',
							'gslider-blocks'
						) }
						globalCustomGradientSwitcher={ isCustomScrim }
						setGlobalCustomGradientSwitcher={ setIsCustomScrim }
						globalCustomGradientInputValue={ overlayGradientScrim }
						setGlobalCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								overlayGradientScrim:
									value || DEFAULT_OVERLAY_SCRIM,
							} )
						}
						globalGradientColor={ overlayGradientScrim }
						setGlobalGradientColor={ ( value ) =>
							setAttributes( {
								overlayGradientScrim:
									value || DEFAULT_OVERLAY_SCRIM,
							} )
						}
					/>

					<div onBlur={ commitScrimHeight }>
						<InputControls
							label={ __( 'Scrim Height (%)', 'gslider-blocks' ) }
							value={ scrimHeightDraft }
							onChangeValue={ handleScrimHeightChange }
							helpText={ __(
								'Gradient scrim minimum height percentage (40–100%).',
								'gslider-blocks'
							) }
						/>
					</div>
				</>
			) }

			{ postLayoutMode === 'horizontal' && (
				<>
					<SwitcherControl
						label={ __( 'Media Position', 'gslider-blocks' ) }
						options={ MEDIA_POSITION_OPTIONS }
						value={ horizontalMediaPosition }
						onChange={ ( value ) =>
							setAttributes( { horizontalMediaPosition: value } )
						}
					/>

					<div onBlur={ commitMediaWidth }>
						<InputControls
							label={ __(
								'Media Column Width (%)',
								'gslider-blocks'
							) }
							value={ mediaWidthDraft }
							onChangeValue={ handleMediaWidthChange }
							helpText={ __(
								'Image column width percentage on desktop/tablet (30–60%).',
								'gslider-blocks'
							) }
						/>
					</div>
				</>
			) }

			{ postLayoutMode === 'newsroom' && (
				<>
					<div
						onBlur={ () => {
							const clamped = clampNumber(
								newsroomWidthDraft,
								50,
								80,
								65
							);
							setNewsroomWidthDraft( String( clamped ) );
							if ( clamped !== newsroomMainWidth ) {
								setAttributes( {
									newsroomMainWidth: clamped,
								} );
							}
						} }
					>
						<InputControls
							label={ __(
								'Main Stage Width (%)',
								'gslider-blocks'
							) }
							value={ newsroomWidthDraft }
							onChangeValue={ ( raw ) => {
								setNewsroomWidthDraft( raw );
								const parsed = parseInt( raw, 10 );
								if (
									! Number.isNaN( parsed ) &&
									parsed >= 50 &&
									parsed <= 80
								) {
									setAttributes( {
										newsroomMainWidth: parsed,
									} );
								}
							} }
							helpText={ __(
								'Width of the primary story slider on desktop (50–80%).',
								'gslider-blocks'
							) }
						/>
					</div>

					<SelectControls
						label={ __(
							'Headline Queue Position',
							'gslider-blocks'
						) }
						options={ NEWSROOM_QUEUE_POSITIONS }
						value={ newsroomQueuePosition }
						onChange={ ( value ) =>
							setAttributes( {
								newsroomQueuePosition: value,
							} )
						}
					/>
				</>
			) }

			{ postLayoutMode === 'timeline' && (
				<>
					<SwitcherControl
						label={ __( 'Date Position', 'gslider-blocks' ) }
						options={ TIMELINE_DATE_POSITION_OPTIONS }
						value={ timelineDatePosition }
						onChange={ ( value ) =>
							setAttributes( { timelineDatePosition: value } )
						}
					/>

					<div
						onBlur={ () => {
							const clamped = clampNumber(
								timelineThicknessDraft,
								1,
								10,
								2
							);
							setTimelineThicknessDraft( String( clamped ) );
							if ( clamped !== timelineStemThickness ) {
								setAttributes( {
									timelineStemThickness: clamped,
								} );
							}
						} }
					>
						<InputControls
							label={ __(
								'Stem Thickness (px)',
								'gslider-blocks'
							) }
							value={ timelineThicknessDraft }
							onChangeValue={ ( raw ) => {
								setTimelineThicknessDraft( raw );
								const parsed = parseInt( raw, 10 );
								if (
									! Number.isNaN( parsed ) &&
									parsed >= 1 &&
									parsed <= 10
								) {
									setAttributes( {
										timelineStemThickness: parsed,
									} );
								}
							} }
							helpText={ __(
								'Horizontal rail stem line thickness (1–10px).',
								'gslider-blocks'
							) }
						/>
					</div>

					<div
						onBlur={ () => {
							const clamped = clampNumber(
								timelineDotSizeDraft,
								8,
								48,
								16
							);
							setTimelineDotSizeDraft( String( clamped ) );
							if ( clamped !== timelineDotSize ) {
								setAttributes( {
									timelineDotSize: clamped,
								} );
							}
						} }
					>
						<InputControls
							label={ __(
								'Milestone Dot Size (px)',
								'gslider-blocks'
							) }
							value={ timelineDotSizeDraft }
							onChangeValue={ ( raw ) => {
								setTimelineDotSizeDraft( raw );
								const parsed = parseInt( raw, 10 );
								if (
									! Number.isNaN( parsed ) &&
									parsed >= 8 &&
									parsed <= 48
								) {
									setAttributes( {
										timelineDotSize: parsed,
									} );
								}
							} }
							helpText={ __(
								'Milestone circular node diameter (8–48px).',
								'gslider-blocks'
							) }
						/>
					</div>

					<ColorControl
						label={ __( 'Stem Color', 'gslider-blocks' ) }
						color={ timelineStemColor }
						defaultColor="#e2e8f0"
						onChangeColor={ ( value ) =>
							setAttributes( { timelineStemColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Milestone Dot Color', 'gslider-blocks' ) }
						color={ timelineDotColor }
						defaultColor="#007cba"
						onChangeColor={ ( value ) =>
							setAttributes( { timelineDotColor: value } )
						}
					/>
				</>
			) }

			{ ( ( postLayoutMode !== 'hero' &&
				postLayoutMode !== 'newsroom' &&
				postLayoutMode !== 'timeline' ) ||
				enableSpotlight ) && (
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Spotlight Focus Stage', 'gslider-blocks' ) }
					help={ __(
						'Emphasize the centered slide while scaling and dimming neighbor slides.',
						'gslider-blocks'
					) }
					checked={ Boolean( enableSpotlight ) }
					onChange={ ( value ) =>
						setAttributes( { enableSpotlight: value } )
					}
				/>
			) }

			{ enableSpotlight && (
				<>
					<div onBlur={ commitSpotlightScale }>
						<InputControls
							label={ __( 'Side Slide Scale', 'gslider-blocks' ) }
							value={ spotlightScaleDraft }
							onChangeValue={ handleSpotlightScaleChange }
							helpText={ __(
								'Scale factor for adjacent slides (0.80–0.98).',
								'gslider-blocks'
							) }
						/>
					</div>

					<div onBlur={ commitSpotlightOpacity }>
						<InputControls
							label={ __(
								'Side Slide Opacity',
								'gslider-blocks'
							) }
							value={ spotlightOpacityDraft }
							onChangeValue={ handleSpotlightOpacityChange }
							helpText={ __(
								'Opacity level for adjacent slides (0.30–1.00).',
								'gslider-blocks'
							) }
						/>
					</div>
				</>
			) }
		</PanelBody>
	);
};

export default LayoutModePanel;
