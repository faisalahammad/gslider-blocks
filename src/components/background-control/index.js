import { __ } from '@wordpress/i18n';
import {
	Button,
	ButtonGroup,
	BaseControl,
	TabPanel,
} from '@wordpress/components';

import ResponsiveBackgroundImageControl from '@Components/responsive-background-image-control';
import GradientColorControl from '@Components/gradient-color-control';
import ColorControl from '@Components/color-control';

const BackgroundControl = ( {
	label,
	deviceType,

	backgroundTypeLabel = __( 'Background Type', 'gslider-blocks' ),
	normalClassicColorLabel = __( 'Color', 'gslider-blocks' ),
	hoverClassicColorLabel = __( 'Background Color', 'gslider-blocks' ),

	normalBackgroundType,
	setNormalBackgroundType,
	normalClassicColor,
	setNormalClassicColor,
	normalGradientColor = null,
	setNormalGradientColor,
	normalCustomGradientSwitcher,
	setNormalCustomGradientSwitcher,
	normalCustomGradientInputValue,
	setNormalCustomGradientInputValue,
	normalBackgroundImageUrl,
	setNormalBackgroundImageUrl,
	normalBackgroundImageAlt,
	setNormalBackgroundImageAlt,
	normalBackgroundImageID,
	setNormalBackgroundImageID,
	normalBackgroundImagePosition = { x: 0.5, y: 0.5 },
	setNormalBackgroundImagePosition,
	normalBackgroundImageAttachment = 'scroll',
	setNormalBackgroundImageAttachment,
	normalBackgroundImageRepeat = 'no-repeat',
	setNormalBackgroundImageRepeat,
	normalBackgroundImageSize = 'cover',
	setNormalBackgroundImageSize,
	normalClassicDefaultColor = '',

	hoverBackgroundType,
	setHoverBackgroundType,
	hoverClassicColor,
	setHoverClassicColor,
	hoverGradientColor = null,
	setHoverGradientColor,
	hoverCustomGradientSwitcher,
	setHoverCustomGradientSwitcher,
	hoverCustomGradientInputValue,
	setHoverCustomGradientInputValue,
	hoverBackgroundImageUrl,
	setHoverBackgroundImageUrl,
	hoverBackgroundImageAlt,
	setHoverBackgroundImageAlt,
	hoverBackgroundImageID,
	setHoverBackgroundImageID,
	hoverBackgroundImagePosition = { x: 0.5, y: 0.5 },
	setHoverBackgroundImagePosition,
	hoverBackgroundImageAttachment = 'scroll',
	setHoverBackgroundImageAttachment,
	hoverBackgroundImageRepeat = 'no-repeat',
	setHoverBackgroundImageRepeat,
	hoverBackgroundImageSize = 'cover',
	setHoverBackgroundImageSize,
	hoverClassicDefaultColor = '',
	setAttributes,

	isBackgroundImage = true,
	isHover = true,
} ) => {
	const BACKGROUND_TYPES = [
		{ label: __( 'Classic', 'gslider-blocks' ), value: 'classic' },
		{ label: __( 'Gradient', 'gslider-blocks' ), value: 'gradient' },
	];

	const renderNormalControls = () => (
		<>
			<BaseControl>
				<BaseControl.VisualLabel>
					{ backgroundTypeLabel }
				</BaseControl.VisualLabel>
				<ButtonGroup
					aria-label={ backgroundTypeLabel }
					className="gslider-setting-switcher-panel-btn"
				>
					{ BACKGROUND_TYPES.map( ( item ) => (
						<Button
							key={ item.value }
							onClick={ () =>
								setNormalBackgroundType( item.value )
							}
							className={ `gslider-setting-switcher-panel-btn-switcher ${
								normalBackgroundType === item.value
									? 'active'
									: ''
							}` }
						>
							{ item.label }
						</Button>
					) ) }
				</ButtonGroup>
			</BaseControl>

			{ normalBackgroundType === 'classic' && (
				<>
					<ColorControl
						label={ normalClassicColorLabel }
						color={ normalClassicColor }
						onChangeColor={ ( value ) =>
							setNormalClassicColor( value )
						}
						defaultColor={ normalClassicDefaultColor }
					/>

					{ isBackgroundImage && (
						<ResponsiveBackgroundImageControl
							label={ __( 'Image', 'gslider-blocks' ) }
							deviceType={ deviceType }
							globalBackgroundImageUrl={
								normalBackgroundImageUrl
							}
							setGlobalBackgroundImageUrl={ ( value ) =>
								setNormalBackgroundImageUrl( value )
							}
							globalBackgroundImageAlt={
								normalBackgroundImageAlt
							}
							setGlobalBackgroundImageAlt={ ( value ) =>
								setNormalBackgroundImageAlt( value )
							}
							globalBackgroundImageID={ normalBackgroundImageID }
							setGlobalBackgroundImageID={ ( value ) =>
								setNormalBackgroundImageID( value )
							}
							globalBackgroundImagePosition={
								normalBackgroundImagePosition
							}
							setGlobalBackgroundImagePosition={ ( value ) =>
								setNormalBackgroundImagePosition( value )
							}
							globalBackgroundImageAttachment={
								normalBackgroundImageAttachment
							}
							setGlobalBackgroundImageAttachment={ ( value ) =>
								setNormalBackgroundImageAttachment( value )
							}
							globalBackgroundImageRepeat={
								normalBackgroundImageRepeat
							}
							setGlobalBackgroundImageRepeat={ ( value ) =>
								setNormalBackgroundImageRepeat( value )
							}
							globalBackgroundImageSize={
								normalBackgroundImageSize
							}
							setGlobalBackgroundImageSize={ ( value ) =>
								setNormalBackgroundImageSize( value )
							}
							setAttributes={ setAttributes }
						/>
					) }
				</>
			) }

			{ normalBackgroundType === 'gradient' && (
				<GradientColorControl
					globalCustomGradientSwitcher={
						normalCustomGradientSwitcher
					}
					setGlobalCustomGradientSwitcher={ ( value ) =>
						setNormalCustomGradientSwitcher( value )
					}
					globalCustomGradientInputValue={
						normalCustomGradientInputValue
					}
					setGlobalCustomGradientInputValue={ ( value ) =>
						setNormalCustomGradientInputValue( value )
					}
					globalGradientColor={ normalGradientColor }
					setGlobalGradientColor={ ( value ) =>
						setNormalGradientColor( value )
					}
				/>
			) }
		</>
	);

	const renderHoverControls = () => (
		<>
			<BaseControl>
				<BaseControl.VisualLabel>
					{ backgroundTypeLabel }
				</BaseControl.VisualLabel>
				<ButtonGroup
					aria-label={ backgroundTypeLabel }
					className="gslider-setting-switcher-panel-btn"
				>
					{ BACKGROUND_TYPES.map( ( item ) => (
						<Button
							key={ item.value }
							onClick={ () =>
								setHoverBackgroundType( item.value )
							}
							className={ `gslider-setting-switcher-panel-btn-switcher ${
								hoverBackgroundType === item.value
									? 'active'
									: ''
							}` }
						>
							{ item.label }
						</Button>
					) ) }
				</ButtonGroup>
			</BaseControl>

			{ hoverBackgroundType === 'classic' && (
				<>
					<ColorControl
						label={ hoverClassicColorLabel }
						color={ hoverClassicColor }
						onChangeColor={ ( value ) =>
							setHoverClassicColor( value )
						}
						defaultColor={ hoverClassicDefaultColor }
					/>

					{ isBackgroundImage && (
						<ResponsiveBackgroundImageControl
							label={ __( 'Background Image', 'gslider-blocks' ) }
							deviceType={ deviceType }
							globalBackgroundImageUrl={ hoverBackgroundImageUrl }
							setGlobalBackgroundImageUrl={ ( value ) =>
								setHoverBackgroundImageUrl( value )
							}
							globalBackgroundImageAlt={ hoverBackgroundImageAlt }
							setGlobalBackgroundImageAlt={ ( value ) =>
								setHoverBackgroundImageAlt( value )
							}
							globalBackgroundImageID={ hoverBackgroundImageID }
							setGlobalBackgroundImageID={ ( value ) =>
								setHoverBackgroundImageID( value )
							}
							globalBackgroundImagePosition={
								hoverBackgroundImagePosition
							}
							setGlobalBackgroundImagePosition={ ( value ) =>
								setHoverBackgroundImagePosition( value )
							}
							globalBackgroundImageAttachment={
								hoverBackgroundImageAttachment
							}
							setGlobalBackgroundImageAttachment={ ( value ) =>
								setHoverBackgroundImageAttachment( value )
							}
							globalBackgroundImageRepeat={
								hoverBackgroundImageRepeat
							}
							setGlobalBackgroundImageRepeat={ ( value ) =>
								setHoverBackgroundImageRepeat( value )
							}
							globalBackgroundImageSize={
								hoverBackgroundImageSize
							}
							setGlobalBackgroundImageSize={ ( value ) =>
								setHoverBackgroundImageSize( value )
							}
							setAttributes={ setAttributes }
						/>
					) }
				</>
			) }

			{ hoverBackgroundType === 'gradient' && (
				<GradientColorControl
					globalCustomGradientSwitcher={ hoverCustomGradientSwitcher }
					setGlobalCustomGradientSwitcher={ ( value ) =>
						setHoverCustomGradientSwitcher( value )
					}
					globalCustomGradientInputValue={
						hoverCustomGradientInputValue
					}
					setGlobalCustomGradientInputValue={ ( value ) =>
						setHoverCustomGradientInputValue( value )
					}
					globalGradientColor={ hoverGradientColor }
					setGlobalGradientColor={ ( value ) =>
						setHoverGradientColor( value )
					}
				/>
			) }
		</>
	);

	return (
		<>
			<BaseControl>
				{ label && (
					<BaseControl.VisualLabel>{ label }</BaseControl.VisualLabel>
				) }
				{ isHover ? (
					<TabPanel
						className="gslider-bg-tab-panel"
						activeClass="active-tab"
						tabs={ [
							{
								name: 'normal',
								title: __( 'Normal', 'gslider-blocks' ),
								className: 'gslider-bg-tab',
							},
							{
								name: 'hover',
								title: __( 'Hover', 'gslider-blocks' ),
								className: 'gslider-bg-tab',
							},
						] }
					>
						{ ( tab ) => (
							<div
								className={ `gslider-tab-panel-wrapper ${ tab.name }` }
							>
								{ tab.name === 'normal' &&
									renderNormalControls() }
								{ tab.name === 'hover' &&
									renderHoverControls() }
							</div>
						) }
					</TabPanel>
				) : (
					<div className="gslider-tab-panel-wrapper normal">
						{ renderNormalControls() }
					</div>
				) }
			</BaseControl>
		</>
	);
};

export default BackgroundControl;
