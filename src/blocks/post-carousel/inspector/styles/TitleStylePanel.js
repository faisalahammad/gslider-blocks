/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { TEXT_ALIGN, NORMAL_HOVER } from '@Constants';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import InputControls from '@Components/input-control';
import ColorControl from '@Components/color-control';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import Select2Control from '@Components/select2-control';
import {
	spacingKeys,
	BoundTypographyControl,
	BoundBackgroundControl,
	BoundSpacingControl,
} from '../sharedControls';

const LIMIT_TYPE_OPTIONS = [
	{ label: __( 'Words', 'gslider-blocks' ), value: 'words' },
	{ label: __( 'Characters', 'gslider-blocks' ), value: 'characters' },
];

const DIVIDER_STYLE_OPTIONS = [
	{ label: __( 'Solid', 'gslider-blocks' ), value: 'solid' },
	{ label: __( 'Dashed', 'gslider-blocks' ), value: 'dashed' },
	{ label: __( 'Dotted', 'gslider-blocks' ), value: 'dotted' },
	{ label: __( 'Double', 'gslider-blocks' ), value: 'double' },
	{ label: __( 'Gradient', 'gslider-blocks' ), value: 'gradient' },
];

/**
 * Style inspector panel for post title trimming, link attributes, underline animation, typography, color, and divider.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Post title style panel element.
 */
const TitleStylePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const {
		enablePostTitleLimit,
		postTitleLimitType,
		postTitleLimit,
		postTitleLimitSuffix,
		enablePostTitleLink,
		postTitleLinkTarget,
		postTitleLinkNofollow,
		postTitleLinkSponsored,
		enablePostTitleHoverUnderlineAnim,
		postTitleHoverUnderlineColor,
		postTitleHoverUnderlineHeight,
		postTitleHoverUnderlineBottomOffset,
		postTitleHoverUnderlineTransitionSpeed,
		postTitleAlign,
		showPostTitleDivider,
		postTitleDividerStyle,
		postTitleDividerColorSwitcher,
		postTitleDividerColor,
		postTitleDividerHoverColor,
		postTitleDividerWidth,
		postTitleDividerWidthUnits,
		postTitleDividerHeight,
		postTitleDividerHeightUnits,
		enablePostTitleDividerHoverExpand,
	} = attributes;

	return (
		<PanelBody
			title={ __( 'Title', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ToggleControl
				label={ __( 'Limit Title Length', 'gslider-blocks' ) }
				checked={ enablePostTitleLimit }
				onChange={ ( value ) =>
					setAttributes( { enablePostTitleLimit: value } )
				}
			/>

			{ enablePostTitleLimit && (
				<>
					<SwitcherControl
						label={ __( 'Limit Type', 'gslider-blocks' ) }
						options={ LIMIT_TYPE_OPTIONS }
						value={ postTitleLimitType }
						onChange={ ( value ) =>
							setAttributes( { postTitleLimitType: value } )
						}
					/>
					<ResponsiveRangeControl
						min={ 1 }
						max={ postTitleLimitType === 'words' ? 100 : 500 }
						label={
							postTitleLimitType === 'words'
								? __( 'Word Limit', 'gslider-blocks' )
								: __( 'Character Limit', 'gslider-blocks' )
						}
						rangeValue={ postTitleLimit }
						onChangeValue={ ( value ) =>
							setAttributes( { postTitleLimit: value } )
						}
						deviceType={ deviceType }
						step={ 1 }
						resetFallbackValue={
							postTitleLimitType === 'words' ? '10' : '50'
						}
						isRangeUnit={ false }
					/>
					<InputControls
						label={ __( 'Trim Suffix', 'gslider-blocks' ) }
						value={ postTitleLimitSuffix }
						onChangeValue={ ( value ) =>
							setAttributes( { postTitleLimitSuffix: value } )
						}
					/>
				</>
			) }

			<ToggleControl
				label={ __( 'Link Title', 'gslider-blocks' ) }
				checked={ enablePostTitleLink }
				onChange={ ( value ) =>
					setAttributes( { enablePostTitleLink: value } )
				}
			/>

			{ enablePostTitleLink && (
				<>
					<ToggleControl
						label={ __( 'Open in New Tab', 'gslider-blocks' ) }
						checked={ postTitleLinkTarget }
						onChange={ ( value ) =>
							setAttributes( { postTitleLinkTarget: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Add nofollow rel', 'gslider-blocks' ) }
						checked={ postTitleLinkNofollow }
						onChange={ ( value ) =>
							setAttributes( { postTitleLinkNofollow: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Add sponsored rel', 'gslider-blocks' ) }
						checked={ postTitleLinkSponsored }
						onChange={ ( value ) =>
							setAttributes( { postTitleLinkSponsored: value } )
						}
					/>
					<ToggleControl
						label={ __(
							'Underline Hover Animation',
							'gslider-blocks'
						) }
						checked={ enablePostTitleHoverUnderlineAnim }
						onChange={ ( value ) =>
							setAttributes( {
								enablePostTitleHoverUnderlineAnim: value,
							} )
						}
					/>
					{ enablePostTitleHoverUnderlineAnim && (
						<>
							<ColorControl
								label={ __(
									'Underline Hover Color',
									'gslider-blocks'
								) }
								color={ postTitleHoverUnderlineColor }
								onChangeColor={ ( value ) =>
									setAttributes( {
										postTitleHoverUnderlineColor: value,
									} )
								}
								defaultColor=""
							/>
							<ResponsiveRangeControl
								label={ __(
									'Underline Thickness (Height)',
									'gslider-blocks'
								) }
								rangeValue={ postTitleHoverUnderlineHeight }
								onChangeValue={ ( value ) =>
									setAttributes( {
										postTitleHoverUnderlineHeight: value,
									} )
								}
								deviceType={ deviceType }
								isRangeUnit={ false }
								min={ 1 }
								max={ 10 }
								step={ 1 }
								resetFallbackValue="2"
							/>
							<ResponsiveRangeControl
								label={ __(
									'Underline Bottom Offset',
									'gslider-blocks'
								) }
								rangeValue={
									postTitleHoverUnderlineBottomOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										postTitleHoverUnderlineBottomOffset:
											value,
									} )
								}
								deviceType={ deviceType }
								isRangeUnit={ false }
								min={ -20 }
								max={ 20 }
								step={ 1 }
								resetFallbackValue="-2"
							/>
							<ResponsiveRangeControl
								label={ __(
									'Underline Transition Speed (Seconds)',
									'gslider-blocks'
								) }
								rangeValue={
									postTitleHoverUnderlineTransitionSpeed
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										postTitleHoverUnderlineTransitionSpeed:
											value,
									} )
								}
								deviceType={ deviceType }
								isRangeUnit={ false }
								min={ 0.1 }
								max={ 2 }
								step={ 0.1 }
								resetFallbackValue="0.3"
							/>
						</>
					) }
				</>
			) }

			<BoundTypographyControl
				prefix="postTitle"
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<ResponsiveAlignmentControl
				label={ __( 'Alignment', 'gslider-blocks' ) }
				options={ TEXT_ALIGN }
				alignmentValue={ postTitleAlign }
				setAlignmentValue={ ( value ) =>
					setAttributes( { postTitleAlign: value } )
				}
				deviceType={ deviceType }
				setAttributes={ setAttributes }
			/>

			<BoundBackgroundControl
				label={ __( 'Title Color', 'gslider-blocks' ) }
				prefix="postTitle"
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				backgroundTypeLabel={ __( 'Color Type', 'gslider-blocks' ) }
				normalClassicColorLabel={ __( 'Color', 'gslider-blocks' ) }
				hoverClassicColorLabel={ __( 'Hover Color', 'gslider-blocks' ) }
			/>

			<BoundSpacingControl
				label={ __( 'Margin', 'gslider-blocks' ) }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				keys={ spacingKeys( 'postTitle', 'Margin', false ) }
			/>

			<BoundSpacingControl
				label={ __( 'Padding', 'gslider-blocks' ) }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				keys={ spacingKeys( 'postTitle', 'Padding', false ) }
			/>

			<ToggleControl
				label={ __( 'Show Bottom Divider', 'gslider-blocks' ) }
				checked={ showPostTitleDivider }
				onChange={ ( value ) =>
					setAttributes( { showPostTitleDivider: value } )
				}
			/>

			{ showPostTitleDivider && (
				<>
					<Select2Control
						label={ __( 'Divider Style', 'gslider-blocks' ) }
						options={ DIVIDER_STYLE_OPTIONS }
						value={ postTitleDividerStyle }
						onChange={ ( value ) =>
							setAttributes( { postTitleDividerStyle: value } )
						}
					/>
					{ postTitleDividerStyle !== 'gradient' && (
						<>
							<SwitcherControl
								label={ __(
									'Divider Color',
									'gslider-blocks'
								) }
								options={ NORMAL_HOVER }
								value={ postTitleDividerColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										postTitleDividerColorSwitcher: value,
									} )
								}
							/>
							{ postTitleDividerColorSwitcher === 'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ postTitleDividerColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											postTitleDividerColor: value,
										} )
									}
									defaultColor="#333333"
								/>
							) }
							{ postTitleDividerColorSwitcher === 'hover' && (
								<ColorControl
									label={ __(
										'Hover Color',
										'gslider-blocks'
									) }
									color={ postTitleDividerHoverColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											postTitleDividerHoverColor: value,
										} )
									}
									defaultColor=""
								/>
							) }
						</>
					) }
					<ResponsiveRangeControl
						label={ __( 'Divider Width', 'gslider-blocks' ) }
						rangeValue={ postTitleDividerWidth }
						onChangeValue={ ( value ) =>
							setAttributes( { postTitleDividerWidth: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								postTitleDividerWidthUnits: value,
							} )
						}
						deviceType={ deviceType }
						units={ postTitleDividerWidthUnits }
						resetFallbackValue={ { px: '50', '%': '30' } }
					/>
					<ResponsiveRangeControl
						label={ __(
							'Divider Height (Thickness)',
							'gslider-blocks'
						) }
						rangeValue={ postTitleDividerHeight }
						onChangeValue={ ( value ) =>
							setAttributes( { postTitleDividerHeight: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								postTitleDividerHeightUnits: value,
							} )
						}
						deviceType={ deviceType }
						units={ postTitleDividerHeightUnits }
						resetFallbackValue={ { px: '2' } }
					/>
					<ToggleControl
						label={ __(
							'Expand Divider on Hover',
							'gslider-blocks'
						) }
						checked={ enablePostTitleDividerHoverExpand }
						onChange={ ( value ) =>
							setAttributes( {
								enablePostTitleDividerHoverExpand: value,
							} )
						}
					/>
				</>
			) }
		</PanelBody>
	);
};

export default TitleStylePanel;
