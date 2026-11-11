/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import SelectControls from '@Components/select-controls';
import ColorControl from '@Components/color-control';

const CAROUSEL_MODE_OPTIONS = [
	{ label: __( 'Standard Carousel', 'gslider-blocks' ), value: 'carousel' },
	{
		label: __(
			'Marquee Ticker (Continuous Smooth Glide)',
			'gslider-blocks'
		),
		value: 'marquee',
	},
	{
		label: __( 'Desktop Grid / Mobile Carousel', 'gslider-blocks' ),
		value: 'mobile-only',
	},
];

const AUTOPLAY_PROGRESS_POSITION_OPTIONS = [
	{ label: __( 'Top', 'gslider-blocks' ), value: 'top' },
	{ label: __( 'Bottom', 'gslider-blocks' ), value: 'bottom' },
];

/**
 * Inspector panel for Swiper columns, gap, interaction, loop, autoplay, and transition speed.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Carousel settings panel element.
 */
const CarouselSettingsPanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const {
		carouselMode,
		carouselPerColumn,
		carouselPerColumnGap,
		speed,
		autoplay,
		autoplayDelay,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		mousewheelControl,
		keyboardNavigation,
		marqueeSpeed,
		marqueePauseOnHover,
		showAutoplayProgress,
		autoplayProgressPosition,
		autoplayProgressColor,
		autoplayProgressHeight,
		desktopGridColumns,
		desktopGridGap,
	} = attributes;

	const activeMode = carouselMode || 'carousel';

	return (
		<PanelBody
			title={ __( 'Carousel Settings', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<SelectControls
				label={ __( 'Carousel Mode', 'gslider-blocks' ) }
				options={ CAROUSEL_MODE_OPTIONS }
				value={ activeMode }
				onChange={ ( value ) =>
					setAttributes( { carouselMode: value } )
				}
			/>

			{ activeMode === 'marquee' && (
				<>
					<ResponsiveRangeControl
						min={ 1 }
						max={ 12 }
						label={ __( 'Number of Columns', 'gslider-blocks' ) }
						rangeValue={ carouselPerColumn }
						onChangeValue={ ( value ) =>
							setAttributes( { carouselPerColumn: value } )
						}
						deviceType={ deviceType }
						step={ 1 }
						resetFallbackValue={ '3' }
						isRangeUnit={ false }
					/>
					<ResponsiveRangeControl
						min={ 0 }
						max={ 200 }
						label={ __( 'Column Gap (px)', 'gslider-blocks' ) }
						rangeValue={ carouselPerColumnGap }
						onChangeValue={ ( value ) =>
							setAttributes( { carouselPerColumnGap: value } )
						}
						deviceType={ deviceType }
						step={ 1 }
						resetFallbackValue={ '20' }
						isRangeUnit={ false }
					/>
					<RangeControl
						label={ __( 'Marquee Speed (ms)', 'gslider-blocks' ) }
						value={ marqueeSpeed ?? 6000 }
						min={ 500 }
						max={ 30000 }
						step={ 500 }
						onChange={ ( value ) =>
							setAttributes( { marqueeSpeed: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Pause on Hover', 'gslider-blocks' ) }
						checked={ marqueePauseOnHover ?? true }
						onChange={ ( value ) =>
							setAttributes( { marqueePauseOnHover: value } )
						}
					/>
				</>
			) }

			{ activeMode === 'mobile-only' && (
				<>
					<RangeControl
						label={ __( 'Desktop Grid Columns', 'gslider-blocks' ) }
						value={ desktopGridColumns ?? 3 }
						min={ 1 }
						max={ 6 }
						step={ 1 }
						onChange={ ( value ) =>
							setAttributes( { desktopGridColumns: value } )
						}
					/>
					<RangeControl
						label={ __(
							'Desktop Grid Gap (px)',
							'gslider-blocks'
						) }
						value={ desktopGridGap ?? 24 }
						min={ 0 }
						max={ 100 }
						step={ 1 }
						onChange={ ( value ) =>
							setAttributes( { desktopGridGap: value } )
						}
					/>
					<ResponsiveRangeControl
						min={ 1 }
						max={ 12 }
						label={ __(
							'Mobile/Tablet Columns',
							'gslider-blocks'
						) }
						rangeValue={ carouselPerColumn }
						onChangeValue={ ( value ) =>
							setAttributes( { carouselPerColumn: value } )
						}
						deviceType={ deviceType }
						step={ 1 }
						resetFallbackValue={ '2' }
						isRangeUnit={ false }
					/>
					<ResponsiveRangeControl
						min={ 0 }
						max={ 200 }
						label={ __(
							'Mobile/Tablet Gap (px)',
							'gslider-blocks'
						) }
						rangeValue={ carouselPerColumnGap }
						onChangeValue={ ( value ) =>
							setAttributes( { carouselPerColumnGap: value } )
						}
						deviceType={ deviceType }
						step={ 1 }
						resetFallbackValue={ '10' }
						isRangeUnit={ false }
					/>
					<ToggleControl
						label={ __( 'Infinite Loop', 'gslider-blocks' ) }
						checked={ infiniteLoop }
						onChange={ ( value ) =>
							setAttributes( { infiniteLoop: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Touch Swipe Control', 'gslider-blocks' ) }
						checked={ allowTouchMove }
						onChange={ ( value ) =>
							setAttributes( { allowTouchMove: value } )
						}
					/>
				</>
			) }

			{ activeMode === 'carousel' && (
				<>
					<ResponsiveRangeControl
						min={ 1 }
						max={ 12 }
						label={ __( 'Number of Columns', 'gslider-blocks' ) }
						rangeValue={ carouselPerColumn }
						onChangeValue={ ( value ) =>
							setAttributes( { carouselPerColumn: value } )
						}
						deviceType={ deviceType }
						step={ attributes.enableSpotlight ? 0.1 : 1 }
						resetFallbackValue={ '2' }
						isRangeUnit={ false }
					/>
					<ResponsiveRangeControl
						min={ 0 }
						max={ 200 }
						label={ __( 'Column Gap (px)', 'gslider-blocks' ) }
						rangeValue={ carouselPerColumnGap }
						onChangeValue={ ( value ) =>
							setAttributes( { carouselPerColumnGap: value } )
						}
						deviceType={ deviceType }
						step={ 1 }
						resetFallbackValue={ '' }
						isRangeUnit={ false }
					/>
					<ToggleControl
						label={ __( 'Infinite Loop', 'gslider-blocks' ) }
						checked={ infiniteLoop }
						onChange={ ( value ) =>
							setAttributes( { infiniteLoop: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Touch Swipe Control', 'gslider-blocks' ) }
						checked={ allowTouchMove }
						onChange={ ( value ) =>
							setAttributes( { allowTouchMove: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Pause on Hover', 'gslider-blocks' ) }
						checked={ pauseOnHover }
						onChange={ ( value ) =>
							setAttributes( { pauseOnHover: value } )
						}
					/>
					<ToggleControl
						label={ __(
							'Stop Autoplay at Last Slide',
							'gslider-blocks'
						) }
						checked={ stopOnLastSlide }
						onChange={ ( value ) => {
							setAttributes( { stopOnLastSlide: value } );
							if ( value ) {
								setAttributes( { infiniteLoop: false } );
								setAttributes( { autoplay: true } );
							}
						} }
					/>
					<ToggleControl
						label={ __(
							'Reverse Autoplay Direction',
							'gslider-blocks'
						) }
						checked={ reverseDirection }
						onChange={ ( value ) => {
							setAttributes( { reverseDirection: value } );
							if ( value ) {
								setAttributes( { autoplay: true } );
							}
						} }
					/>
					<ToggleControl
						label={ __(
							'Mousewheel Navigation',
							'gslider-blocks'
						) }
						checked={ mousewheelControl }
						onChange={ ( value ) =>
							setAttributes( { mousewheelControl: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Keyboard Navigation', 'gslider-blocks' ) }
						checked={ keyboardNavigation }
						onChange={ ( value ) =>
							setAttributes( { keyboardNavigation: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Autoplay', 'gslider-blocks' ) }
						checked={ autoplay }
						onChange={ ( value ) =>
							setAttributes( { autoplay: value } )
						}
					/>
					{ autoplay && (
						<>
							<ResponsiveRangeControl
								min={ 500 }
								max={ 20000 }
								label={ __(
									'Autoplay Delay (ms)',
									'gslider-blocks'
								) }
								rangeValue={ autoplayDelay }
								onChangeValue={ ( value ) =>
									setAttributes( { autoplayDelay: value } )
								}
								deviceType={ deviceType }
								step={ 100 }
								resetFallbackValue={ '1000' }
								isRangeUnit={ false }
							/>
							<ToggleControl
								label={ __(
									'Show Autoplay Progress Line',
									'gslider-blocks'
								) }
								checked={ showAutoplayProgress }
								onChange={ ( value ) =>
									setAttributes( {
										showAutoplayProgress: value,
									} )
								}
							/>
							{ showAutoplayProgress && (
								<>
									<SelectControls
										label={ __(
											'Progress Line Position',
											'gslider-blocks'
										) }
										options={
											AUTOPLAY_PROGRESS_POSITION_OPTIONS
										}
										value={
											autoplayProgressPosition || 'top'
										}
										onChange={ ( value ) =>
											setAttributes( {
												autoplayProgressPosition: value,
											} )
										}
									/>
									<ColorControl
										label={ __(
											'Progress Line Color',
											'gslider-blocks'
										) }
										color={
											autoplayProgressColor || '#007cba'
										}
										onChangeColor={ ( value ) =>
											setAttributes( {
												autoplayProgressColor: value,
											} )
										}
										defaultColor="#007cba"
									/>
									<RangeControl
										label={ __(
											'Progress Line Height (px)',
											'gslider-blocks'
										) }
										value={ autoplayProgressHeight ?? 4 }
										min={ 1 }
										max={ 30 }
										step={ 1 }
										onChange={ ( value ) =>
											setAttributes( {
												autoplayProgressHeight: value,
											} )
										}
									/>
								</>
							) }
						</>
					) }
					<ResponsiveRangeControl
						min={ 100 }
						max={ 5000 }
						label={ __(
							'Transition Speed (ms)',
							'gslider-blocks'
						) }
						rangeValue={ speed }
						onChangeValue={ ( value ) =>
							setAttributes( { speed: value } )
						}
						deviceType={ deviceType }
						step={ 50 }
						resetFallbackValue={ '800' }
						isRangeUnit={ false }
					/>
				</>
			) }
		</PanelBody>
	);
};

export default CarouselSettingsPanel;
