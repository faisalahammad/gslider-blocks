import { __ } from '@wordpress/i18n';
import { useState, useEffect, memo } from '@wordpress/element';
import { BaseControl, Button, Dashicon, Tooltip } from '@wordpress/components';

/**
 * PresetSelector — Reusable visual preset picker for all GSlider blocks.
 *
 * Applies attribute overrides on preset selection.
 * Uses optional miniature preview thumbnails or dashicons + text labels.
 *
 * Styles: admin/scss/block-controls/_preset-selector.scss
 *
 * @param {Object}   props
 * @param {string}   props.label              - Control label
 * @param {Array}    props.presets            - Array of { value, label, icon?, preview?, attributes?, isPro?, description?, isDefault? } (preview: optional ReactNode)
 * @param {string}   props.value              - Currently selected preset value
 * @param {Function} props.onChange           - Callback when preset changes (for presetStyle attribute)
 * @param {Function} props.setAttributes      - Block setAttributes function for attribute overrides
 * @param {boolean}  props.isProActive        - Whether Pro plugin is active (unlocks pro presets)
 * @param {number}   props.columns            - Number of columns in grid (default: 2)
 * @param {string}   props.help               - Optional help text
 * @param {string}   props.defaultPresetValue - Default preset value for reset
 * @param            props.currentAttributes
 */
const PresetSelector = ( {
	label = '',
	presets = [],
	value,
	onChange,
	setAttributes,
	currentAttributes = {},
	isProActive = false,
	columns = 2,
	help = '',
	defaultPresetValue = null,
} ) => {
	// Keep UI state in sync with saved attribute
	const [ selectedPreset, setSelectedPreset ] = useState( value || '' );
	useEffect( () => {
		setSelectedPreset( value || '' );
	}, [ value ] );

	const buildResponsiveCssStyleUpdates = (
		attributeKey,
		attributeValue,
		attributesSource = {}
	) => {
		if (
			! attributeKey ||
			! attributeValue ||
			typeof attributeValue !== 'object' ||
			Array.isArray( attributeValue )
		) {
			return {};
		}

		const hasBoxValues = [ 'top', 'right', 'bottom', 'left' ].every(
			( key ) => key in attributeValue
		);
		if ( ! hasBoxValues ) {
			return {};
		}

		const deviceMatch = attributeKey.match( /(Desktop|Tablet|Mobile)/ );
		if ( ! deviceMatch ) {
			return {};
		}

		const device = deviceMatch[ 1 ];
		const unitsKey = `${ attributeKey.replace( device, '' ) }Units`;
		const cssStyleKey = `${ attributeKey }CssStyle`;
		const units = attributesSource?.[ unitsKey ]?.[ device ] || 'px';
		const formatSpacingSide = ( v, u ) =>
			v === '' || v === undefined || v === null ? '0' : `${ v }${ u }`;

		const hasAnyValue = Object.values( attributeValue ).some(
			( item ) => item !== '' && item !== undefined && item !== null
		);

		return {
			[ cssStyleKey ]: hasAnyValue
				? `${ formatSpacingSide(
						attributeValue.top,
						units
				  ) } ${ formatSpacingSide(
						attributeValue.right,
						units
				  ) } ${ formatSpacingSide(
						attributeValue.bottom,
						units
				  ) } ${ formatSpacingSide( attributeValue.left, units ) }`
				: '',
		};
	};

	const buildPresetAttributeUpdates = (
		selectedValue,
		attributesSource = {}
	) => {
		const preset = presets?.find( ( p ) => p?.value === selectedValue );
		if ( ! preset?.attributes?.length ) {
			return {};
		}

		const rawUpdates = preset.attributes.reduce( ( acc, item ) => {
			if ( item?.label ) {
				acc[ item.label ] = item.value;
			}
			return acc;
		}, {} );

		const mergedAttributes = { ...attributesSource, ...rawUpdates };

		return preset.attributes.reduce( ( acc, item ) => {
			if ( ! item?.label ) {
				return acc;
			}

			return {
				...acc,
				...buildResponsiveCssStyleUpdates(
					item.label,
					mergedAttributes[ item.label ],
					mergedAttributes
				),
			};
		}, rawUpdates );
	};

	// Resolve default preset value
	const resolveDefaultPresetValue = () => {
		if ( defaultPresetValue ) {
			return defaultPresetValue;
		}
		const flagged = ( presets || [] ).find(
			( p ) => p?.isDefault && p?.value
		);
		if ( flagged?.value ) {
			return flagged.value;
		}
		const first = ( presets || [] ).find( ( p ) => p?.value );
		return first?.value || '';
	};

	// Apply preset — sets class + attribute overrides
	const applyPreset = ( selectedValue ) => {
		// 1. Set the preset class attribute
		if ( onChange ) {
			onChange( selectedValue );
		}
		setSelectedPreset( selectedValue );

		// 2. Apply attribute overrides
		if ( setAttributes ) {
			const presetUpdates = buildPresetAttributeUpdates(
				selectedValue,
				currentAttributes
			);
			if ( Object.keys( presetUpdates ).length ) {
				setAttributes( presetUpdates );
			}
		}
	};

	useEffect( () => {
		if ( ! value || ! setAttributes ) {
			return;
		}

		const preset = presets?.find( ( item ) => item?.value === value );
		if ( ! preset?.attributes?.length ) {
			return;
		}

		const cssStyleUpdates = preset.attributes.reduce( ( acc, item ) => {
			if (
				! item?.label ||
				currentAttributes?.[ item.label ] === undefined
			) {
				return acc;
			}

			const derivedStyle = buildResponsiveCssStyleUpdates(
				item.label,
				currentAttributes[ item.label ],
				currentAttributes
			);
			const nextEntries = Object.entries( derivedStyle ).filter(
				( [ key, cssValue ] ) => currentAttributes?.[ key ] !== cssValue
			);

			if ( ! nextEntries.length ) {
				return acc;
			}

			return {
				...acc,
				...Object.fromEntries( nextEntries ),
			};
		}, {} );

		if ( Object.keys( cssStyleUpdates ).length ) {
			setAttributes( cssStyleUpdates );
		}
	}, [ value, presets, currentAttributes, setAttributes ] );

	// Reset to default preset
	const resetPreset = () => {
		const defVal = resolveDefaultPresetValue();
		if ( defVal ) {
			applyPreset( defVal );
		}
	};

	// Show reset only when current != default
	const defaultValue = resolveDefaultPresetValue();
	const showReset = selectedPreset && selectedPreset !== defaultValue;

	// Build wrapper class with column variant
	const controlClass = [
		'gslider-preset-selector-control',
		columns !== 2 ? `gslider-preset-columns-${ columns }` : '',
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<BaseControl label={ label } help={ help } className={ controlClass }>
			{ showReset && (
				<div
					className="gslider-preset-reset-wrap"
					style={ { textAlign: 'right', marginBottom: '4px' } }
				>
					<button
						type="button"
						className="gslider-preset-reset-button"
						aria-label={ __(
							'Reset to default preset',
							'gslider-blocks'
						) }
						onClick={ resetPreset }
						style={ {
							background: 'none',
							border: 'none',
							cursor: 'pointer',
							padding: '2px',
						} }
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								d="M10.6817 6.23162H14.0101V6.23044M1.98926 13.0956V9.76718M1.98926 9.76718L5.31768 9.76718M1.98926 9.76718L4.10985 11.8892C4.7702 12.5507 5.60824 13.0527 6.57607 13.312C9.51014 14.0982 12.526 12.357 13.3122 9.42292M2.68699 6.57591C3.47317 3.64184 6.48902 1.90064 9.42308 2.68682C10.3909 2.94615 11.229 3.4481 11.8893 4.10969L14.0101 6.23044M14.0101 2.90322V6.23044"
								stroke="#555E72"
							/>
						</svg>
					</button>
				</div>
			) }

			<div className="gslider-preset-selector-grid">
				{ presets.map( ( preset ) => {
					const isActive = selectedPreset === preset.value;
					// Only lock if preset is marked Pro AND Pro is not active
					const isLocked = preset.isPro === true && ! isProActive;

					const wrapperClass = [
						'gslider-preset-card-wrapper',
						isActive ? 'is-active' : '',
						isLocked ? 'is-pro-locked' : '',
					]
						.filter( Boolean )
						.join( ' ' );

					return (
						<Tooltip
							key={ preset.value }
							text={ preset.description || preset.label }
						>
							<div className={ wrapperClass }>
								{ /* Pro Badge — outside button, on wrapper */ }
								{ isLocked && (
									<span className="gslider-preset-pro-badge">
										{ __( 'Pro', 'gslider-blocks' ) }
									</span>
								) }

								{ /* Active Badge — outside button, on wrapper */ }
								{ isActive && ! isLocked && (
									<span
										className="gslider-preset-active-badge"
										aria-hidden="true"
									>
										✓
									</span>
								) }

								<Button
									className={ `gslider-preset-selector-card${
										preset.preview ? ' has-preview' : ''
									}` }
									onClick={ () => {
										if ( ! isLocked ) {
											applyPreset( preset.value );
										}
									} }
									aria-pressed={ isActive }
								>
									{ /* Preview Slot or Dashicon fallback */ }
									{ preset.preview ? (
										<div className="gslider-preset-preview-slot">
											{ preset.preview }
										</div>
									) : (
										preset.icon && (
											<Dashicon icon={ preset.icon } />
										)
									) }

									{ /* Label */ }
									<span className="gslider-preset-selector-label">
										{ preset.label }
									</span>
								</Button>
							</div>
						</Tooltip>
					);
				} ) }
			</div>
		</BaseControl>
	);
};

export default memo( PresetSelector );
