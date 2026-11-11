import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	Button,
	SelectControl,
	Dropdown,
	Dashicon,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import {
	FONT_WEIGHT,
	FONT_STYLE,
	TEXT_TRANSFORM,
	TEXT_DECORATION,
	GOOGLE_FONTS,
} from '@Constants';
import Select2 from 'react-select';
import SelectControls from '@Components/select-controls';
import ResponsiveRangeControl from '@Components/responsive-range-control';

// Pure helper: matches the attribute value against the loaded font options.
// The attribute can also hold a value that is not a Google font, e.g. a
// preset font stack, so an unmatched non-empty value is shown as-is
// instead of claiming "Default".
const buildFontSelection = ( options, fontFamilyValue ) => {
	const current = options.find( ( f ) => f.value === fontFamilyValue );

	if ( current ) {
		return {
			selection: current,
			weights: current.weights || [],
		};
	}

	return {
		selection:
			fontFamilyValue && fontFamilyValue !== 'Default'
				? { label: fontFamilyValue, value: fontFamilyValue }
				: {
						label: __( 'Default', 'gslider-blocks' ),
						value: 'Default',
				  },
		weights: [],
	};
};

const ResponsiveTypographyControl = ( {
	fontFamily,
	onChangeFontFamily,
	fontSize,
	onChangeFontSize,
	fontSizeUnits,
	onChangeFontSizeUnit,
	fontWeight,
	onChangeFontWeight,
	fontStyle,
	onChangeFontStyle,
	textTransform,
	onChangeTextTransform,
	textDecoration,
	onChangeTextDecoration,
	lineHeight,
	onChangeLineHeight,
	lineHeightUnits,
	onChangeLineHeightUnit,
	letterSpacing,
	onChangeLetterSpacing,
	letterSpacingUnits,
	onChangeLetterSpacingUnit,
	wordSpacing,
	onChangeWordSpacing,
	wordSpacingUnits,
	onChangeWordSpacingUnit,
	deviceType,
} ) => {
	const [ fontOptions, setFontOptions ] = useState( [] );
	const [ selectedFontFamilyOption, setSelectedFontFamilyOption ] =
		useState( null );
	const [ availableFontWeights, setAvailableFontWeights ] = useState( [] );

	useEffect( () => {
		GOOGLE_FONTS().then( ( fetchedFonts ) => {
			setFontOptions( fetchedFonts );

			const { selection, weights } = buildFontSelection(
				fetchedFonts,
				fontFamily
			);

			setSelectedFontFamilyOption( selection );
			setAvailableFontWeights( weights );
		} );
	}, [] );

	// Re-sync the displayed font when the attribute changes outside the
	// control, e.g. switching presets or resetting typography.
	useEffect( () => {
		if ( ! fontOptions.length ) {
			return;
		}

		const { selection, weights } = buildFontSelection(
			fontOptions,
			fontFamily
		);

		setSelectedFontFamilyOption( selection );
		setAvailableFontWeights( weights );
	}, [ fontFamily, fontOptions ] );

	const handleFontFamilyChange = ( selectedOption ) => {
		setSelectedFontFamilyOption( selectedOption );

		// Store the attribute default so 'Default' never reaches the CSS
		// output and theme font inheritance keeps working.
		const newFontFamily =
			selectedOption?.value && selectedOption.value !== 'Default'
				? selectedOption.value
				: '';
		onChangeFontFamily( newFontFamily );

		setAvailableFontWeights( selectedOption?.weights || [] );
	};

	const fontFamilyOptions = [
		{
			label: __( 'Default', 'gslider-blocks' ),
			value: 'Default',
		},
		...fontOptions,
	];

	const handleFontSizeChange = ( newFontSize ) => {
		onChangeFontSize( newFontSize );
	};

	const handleFontSizeUnitChange = ( newFontSizeUnit ) => {
		onChangeFontSizeUnit( newFontSizeUnit );
	};

	const handleFontWeightChange = ( newFontWeight ) => {
		onChangeFontWeight( newFontWeight );
	};

	const handleFontStyleChange = ( newFontStyle ) => {
		onChangeFontStyle( newFontStyle );
	};

	const handleTextTransformChange = ( newTextTransform ) => {
		onChangeTextTransform( newTextTransform );
	};

	const handleTextDecorationChange = ( newTextDecoration ) => {
		onChangeTextDecoration( newTextDecoration );
	};

	const handleLineHeightChange = ( newLineHeight ) => {
		onChangeLineHeight( newLineHeight );
	};

	const handleLineHeightUnitChange = ( newLineHeightUnit ) => {
		onChangeLineHeightUnit( newLineHeightUnit );
	};

	const handleLetterSpacingChange = ( newLetterSpacing ) => {
		onChangeLetterSpacing( newLetterSpacing );
	};

	const handleLetterSpacingUnitChange = ( newLetterSpacingUnit ) => {
		onChangeLetterSpacingUnit( newLetterSpacingUnit );
	};

	const handleWordSpacingChange = ( newWordSpacing ) => {
		onChangeWordSpacing( newWordSpacing );
	};

	const handleWordSpacingUnitChange = ( newWordSpacingUnit ) => {
		onChangeWordSpacingUnit( newWordSpacingUnit );
	};

	const gsliderSelect2ControlStyles = {
		control: ( base, state ) => ( {
			...base,
			backgroundColor: '#fff',
			borderColor: '#f0f0f0',
			borderWidth: '1px',
			boxShadow: 'none',
			borderRadius: '4px',
			minHeight: '32px', // total height match
			height: '32px',
			outline: 'none',
			'&:hover': {
				borderColor: '#f0f0f0',
			},
		} ),

		valueContainer: ( base ) => ( {
			...base,
			padding: '0 8px',
			height: '32px',
			display: 'flex',
			alignItems: 'center',
		} ),

		indicatorsContainer: ( base ) => ( {
			...base,
			height: '32px',
		} ),

		dropdownIndicator: ( base, state ) => ( {
			...base,
			color: '#1e1e1e',
			transition: 'all 0.2s ease',
			'&:hover': {
				color: '#007cba',
			},

			svg: {
				width: 16,
				height: 16,
				fill: 'currentColor',
			},
		} ),

		input: ( base ) => ( {
			...base,
			color: '#1e1e1e',
			fontSize: '12px',
			padding: 0,
			margin: 0,
			height: '32px',
			lineHeight: 1,
			outline: 'none',
			boxShadow: 'none',
			'&:focus': {
				outline: 'none',
				boxShadow: 'none',
			},
		} ),

		singleValue: ( base ) => ( {
			...base,
			color: '#1e1e1e',
			lineHeight: 1,
		} ),

		menu: ( base ) => ( {
			...base,
			backgroundColor: '#fff',
			border: '1px solid #f0f0f0',
			borderRadius: '4px',
			boxShadow: 'none',
			marginTop: '2px',
			zIndex: 999,
		} ),

		menuList: ( base ) => ( {
			...base,
			paddingTop: 0,
			paddingBottom: 0,
			borderRadius: '4px',
			border: 'none',
			maxHeight: '200px',
			overflowY: 'auto',
			scrollbarWidth: 'thin',
		} ),

		option: ( base, state ) => ( {
			...base,
			backgroundColor: state.isSelected
				? '#f0f0f0'
				: state.isFocused
				? '#f0f0f0'
				: '#fff',
			color: state.isFocused ? '#007cba' : '#1e1e1e',
			fontSize: '12px',
			fontWeight: 400,
			textTransform: 'capitalize',
			lineHeight: 1.3,
			padding: '6px 12px',
			cursor: 'pointer',
			outline: 'none',
		} ),

		placeholder: ( base ) => ( {
			...base,
			color: '#1e1e1e',
			fontSize: '12px',
		} ),
	};

	return (
		<BaseControl
			label={ __( 'Typography', 'gslider-blocks' ) }
			className="gslider-setting-typography"
		>
			<Dropdown
				className="gslider-setting-icon-dropdown"
				contentClassName="gslider-setting-icon-dropdown-content"
				popoverProps={ { placement: 'bottom-start' } }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						variant="primary"
						onClick={ onToggle }
						aria-expanded={ isOpen }
						className="gslider-setting-icon-btn"
					>
						<Dashicon
							icon="edit"
							className="gslider-setting-panel-icon"
						/>
					</Button>
				) }
				renderContent={ () => (
					<div className="gslider-setting-typography-popup">
						<div className="gslider-setting-typography-popup-inner">
							<BaseControl
								label={ __( 'Family', 'gslider-blocks' ) }
								className="gslider-setting-typography-family"
							>
								<Select2
									options={ fontFamilyOptions }
									value={ selectedFontFamilyOption }
									onChange={ handleFontFamilyChange }
									className="gslider-select2-control"
									classNamePrefix="react-select"
									styles={ gsliderSelect2ControlStyles }
									placeholder={ __(
										'Select Font Family',
										'gslider-blocks'
									) }
								/>
							</BaseControl>
							<ResponsiveRangeControl
								label={ __( 'Size', 'gslider-blocks' ) }
								rangeValue={ fontSize }
								onChangeValue={ handleFontSizeChange }
								onUnitChange={ handleFontSizeUnitChange }
								deviceType={ deviceType }
								units={ fontSizeUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 200, step: 1 },
								} }
							/>

							<SelectControls
								label={ __( 'Weight', 'gslider-blocks' ) }
								options={ [
									{
										label: __(
											'Default',
											'gslider-blocks'
										),
										value: 'inherit',
									},
									// Keep a stored weight selectable when the
									// family's weight list does not include it.
									...( availableFontWeights.length > 0 &&
									fontWeight &&
									fontWeight !== 'inherit' &&
									! availableFontWeights.includes(
										fontWeight
									)
										? [
												{
													label: fontWeight,
													value: fontWeight,
												},
										  ]
										: [] ),
									...( availableFontWeights.length > 0
										? availableFontWeights.map(
												( weight ) => ( {
													label: weight,
													value: weight,
												} )
										  )
										: FONT_WEIGHT.filter(
												( item ) =>
													item.value !== 'inherit'
										  ) ),
								] }
								value={ fontWeight }
								onChange={ handleFontWeightChange }
							/>

							<SelectControls
								label={ __( 'Transform', 'gslider-blocks' ) }
								options={ TEXT_TRANSFORM }
								value={ textTransform }
								onChange={ handleTextTransformChange }
							/>
							<SelectControls
								label={ __( 'Style', 'gslider-blocks' ) }
								options={ FONT_STYLE }
								value={ fontStyle }
								onChange={ handleFontStyleChange }
							/>
							<SelectControls
								label={ __( 'Decoration', 'gslider-blocks' ) }
								options={ TEXT_DECORATION }
								value={ textDecoration }
								onChange={ handleTextDecorationChange }
							/>
							<ResponsiveRangeControl
								label={ __( 'Line Height', 'gslider-blocks' ) }
								rangeValue={ lineHeight }
								onChangeValue={ handleLineHeightChange }
								onUnitChange={ handleLineHeightUnitChange }
								deviceType={ deviceType }
								units={ lineHeightUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 200, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __(
									'Letter Spacing',
									'gslider-blocks'
								) }
								rangeValue={ letterSpacing }
								onChangeValue={ handleLetterSpacingChange }
								onUnitChange={ handleLetterSpacingUnitChange }
								deviceType={ deviceType }
								units={ letterSpacingUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: -20, max: 20, step: 0.1 },
									'%': { min: -20, max: 20, step: 0.1 },
									vh: { min: -20, max: 20, step: 0.1 },
									vw: { min: -20, max: 20, step: 0.1 },
									em: { min: -20, max: 20, step: 0.1 },
									rem: { min: -20, max: 20, step: 0.1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Word Spacing', 'gslider-blocks' ) }
								rangeValue={ wordSpacing }
								onChangeValue={ handleWordSpacingChange }
								onUnitChange={ handleWordSpacingUnitChange }
								deviceType={ deviceType }
								units={ wordSpacingUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 200, step: 1 },
								} }
							/>
						</div>
					</div>
				) }
			/>
		</BaseControl>
	);
};

export default ResponsiveTypographyControl;
