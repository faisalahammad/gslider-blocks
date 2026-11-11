/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { HTML_TAGS, TEXT_ALIGN } from '@Constants';
import HtmlTagControl from '@Components/html-tag-control';
import Select2Control from '@Components/select2-control';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import InputControls from '@Components/input-control';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import {
	spacingKeys,
	BoundTypographyControl,
	BoundColorSwitcherControl,
	BoundSpacingControl,
} from '../sharedControls';

const EXCERPT_SOURCE_OPTIONS = [
	{ label: __( 'Auto Fallback', 'gslider-blocks' ), value: 'auto' },
	{
		label: __( 'Manual Excerpt Only', 'gslider-blocks' ),
		value: 'excerpt',
	},
	{ label: __( 'Post Content Only', 'gslider-blocks' ), value: 'content' },
];

const LIMIT_TYPE_OPTIONS = [
	{ label: __( 'Words', 'gslider-blocks' ), value: 'words' },
	{ label: __( 'Characters', 'gslider-blocks' ), value: 'characters' },
];

/**
 * Style inspector panel for post excerpt tag, source, length limit, clamp, typography, and spacing.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Excerpt style panel element.
 */
const ExcerptStylePanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const {
		postExcerptHtmlTag,
		postExcerptSource,
		enablePostExcerptLimit,
		postExcerptLimitType,
		postExcerptLimit,
		postExcerptLimitSuffix,
		postExcerptLineClamp,
		postExcerptAlign,
	} = attributes;

	return (
		<PanelBody
			title={ __( 'Excerpt', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<HtmlTagControl
				label={ __( 'Html Tag', 'gslider-blocks' ) }
				options={ HTML_TAGS }
				value={ postExcerptHtmlTag }
				onChange={ ( value ) =>
					setAttributes( { postExcerptHtmlTag: value } )
				}
			/>

			<Select2Control
				label={ __( 'Excerpt Source', 'gslider-blocks' ) }
				options={ EXCERPT_SOURCE_OPTIONS }
				value={ postExcerptSource }
				onChange={ ( value ) =>
					setAttributes( { postExcerptSource: value } )
				}
			/>

			<ToggleControl
				label={ __( 'Limit Excerpt Length', 'gslider-blocks' ) }
				checked={ enablePostExcerptLimit }
				onChange={ ( value ) =>
					setAttributes( { enablePostExcerptLimit: value } )
				}
			/>

			{ enablePostExcerptLimit && (
				<>
					<SwitcherControl
						label={ __( 'Limit Type', 'gslider-blocks' ) }
						options={ LIMIT_TYPE_OPTIONS }
						value={ postExcerptLimitType }
						onChange={ ( value ) =>
							setAttributes( { postExcerptLimitType: value } )
						}
					/>
					<ResponsiveRangeControl
						min={ 1 }
						max={ postExcerptLimitType === 'words' ? 200 : 1000 }
						label={
							postExcerptLimitType === 'words'
								? __( 'Word Limit', 'gslider-blocks' )
								: __( 'Character Limit', 'gslider-blocks' )
						}
						rangeValue={ postExcerptLimit }
						onChangeValue={ ( value ) =>
							setAttributes( { postExcerptLimit: value } )
						}
						deviceType={ deviceType }
						step={ 1 }
						resetFallbackValue={
							postExcerptLimitType === 'words' ? '20' : '100'
						}
						isRangeUnit={ false }
					/>
					<InputControls
						label={ __( 'Trim Suffix', 'gslider-blocks' ) }
						value={ postExcerptLimitSuffix }
						onChangeValue={ ( value ) =>
							setAttributes( { postExcerptLimitSuffix: value } )
						}
					/>
				</>
			) }

			<ResponsiveRangeControl
				min={ 1 }
				max={ 10 }
				label={ __( 'Line Clamp (CSS Lines Limit)', 'gslider-blocks' ) }
				rangeValue={ postExcerptLineClamp }
				onChangeValue={ ( value ) =>
					setAttributes( { postExcerptLineClamp: value } )
				}
				deviceType={ deviceType }
				step={ 1 }
				resetFallbackValue=""
				isRangeUnit={ false }
			/>

			<BoundTypographyControl
				prefix="postExcerpt"
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<ResponsiveAlignmentControl
				label={ __( 'Alignment', 'gslider-blocks' ) }
				options={ TEXT_ALIGN }
				alignmentValue={ postExcerptAlign }
				setAlignmentValue={ ( value ) =>
					setAttributes( { postExcerptAlign: value } )
				}
				deviceType={ deviceType }
				setAttributes={ setAttributes }
			/>

			<BoundColorSwitcherControl
				label={ __( 'Color', 'gslider-blocks' ) }
				attributes={ attributes }
				setAttributes={ setAttributes }
				switcherKey="postExcerptColorSwitcher"
				normalKey="postExcerptColor"
				hoverKey="postExcerptColorHover"
				defaultColor=""
			/>

			<BoundSpacingControl
				label={ __( 'Margin', 'gslider-blocks' ) }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				keys={ spacingKeys( 'postExcerpt', 'Margin', false ) }
			/>

			<BoundSpacingControl
				label={ __( 'Padding', 'gslider-blocks' ) }
				deviceType={ deviceType }
				attributes={ attributes }
				setAttributes={ setAttributes }
				keys={ spacingKeys( 'postExcerpt', 'Padding', false ) }
			/>
		</PanelBody>
	);
};

export default ExcerptStylePanel;
