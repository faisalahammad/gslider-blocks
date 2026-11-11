/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import ContentOrderControl from '@Components/content-order-control';
import Select2Control from '@Components/select2-control';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';

const CONTENT_ORDER_ITEMS = [
	{
		key: 'thumbnail',
		label: __( 'Featured Image', 'gslider-blocks' ),
		icon: 'format-image',
	},
	{
		key: 'categories',
		label: __( 'Categories', 'gslider-blocks' ),
		icon: 'category',
	},
	{
		key: 'title',
		label: __( 'Title', 'gslider-blocks' ),
		icon: 'editor-textcolor',
	},
	{
		key: 'excerpt',
		label: __( 'Excerpt', 'gslider-blocks' ),
		icon: 'editor-alignleft',
	},
	{
		key: 'meta',
		label: __( 'Author & Date Meta', 'gslider-blocks' ),
		icon: 'admin-users',
	},
	{
		key: 'readmore',
		label: __( 'Read More Link', 'gslider-blocks' ),
		icon: 'admin-links',
	},
];

const TAXONOMY_DISPLAY_OPTIONS = [
	{ label: __( 'Category', 'gslider-blocks' ), value: 'category' },
	{ label: __( 'Tag', 'gslider-blocks' ), value: 'tag' },
	{ label: __( 'Both (Category & Tag)', 'gslider-blocks' ), value: 'both' },
	{ label: __( 'None', 'gslider-blocks' ), value: 'none' },
];

const TAXONOMY_MAX_OPTIONS = [
	{ label: '1', value: 1 },
	{ label: '2', value: 2 },
	{ label: '3', value: 3 },
	{ label: '4', value: 4 },
	{ label: '5', value: 5 },
];

const BADGE_POSITION_OPTIONS = [
	{ label: __( 'Top Left', 'gslider-blocks' ), value: 'top-left' },
	{ label: __( 'Top Right', 'gslider-blocks' ), value: 'top-right' },
	{ label: __( 'Bottom Left', 'gslider-blocks' ), value: 'bottom-left' },
	{ label: __( 'Bottom Right', 'gslider-blocks' ), value: 'bottom-right' },
];

const BADGE_VISIBILITY_OPTIONS = [
	{ label: __( 'Always', 'gslider-blocks' ), value: 'always' },
	{ label: __( 'On Hover', 'gslider-blocks' ), value: 'hover' },
];

const BADGE_OFFSET_FALLBACKS = {
	px: '15',
	'%': '5',
	vh: '5',
	vw: '5',
	em: '1',
	rem: '1',
};

const BADGE_OFFSET_BOUNDS = {
	px: { min: 0, max: 100, step: 1 },
	em: { min: 0, max: 10, step: 0.1 },
	rem: { min: 0, max: 10, step: 0.1 },
	'%': { min: 0, max: 100, step: 1 },
};

/**
 * Inspector panel for card content ordering and taxonomy badge overlay placement.
 *
 * @param {Object}   props                        Component properties.
 * @param {Object}   props.attributes             Current block attributes.
 * @param {Function} props.setAttributes          Block attribute setter callback.
 * @param {string}   props.deviceType             Active responsive viewport.
 * @param {string[]} props.normalizedContentOrder Normalized card element order keys.
 * @param {boolean}  props.isOpen                 Whether panel is expanded.
 * @param {Function} props.onToggle               Panel toggle callback.
 * @return {Element} Content order panel element.
 */
const ContentOrderPanel = ( {
	attributes,
	setAttributes,
	deviceType,
	normalizedContentOrder,
	isOpen,
	onToggle,
} ) => {
	const {
		postTaxonomyDisplay,
		taxonomyMaxCount,
		enableTaxonomyBadgeOverlay,
		taxonomyBadgeOverlayPosition,
		taxonomyBadgeOverlayVisibility,
		taxonomyBadgeOverlayTopOffset,
		taxonomyBadgeOverlayTopOffsetUnits,
		taxonomyBadgeOverlayLeftOffset,
		taxonomyBadgeOverlayLeftOffsetUnits,
	} = attributes;

	return (
		<PanelBody
			title={ __( 'Content Order', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ContentOrderControl
				label={ __( 'Post Elements Order', 'gslider-blocks' ) }
				items={ CONTENT_ORDER_ITEMS }
				order={ normalizedContentOrder }
				onChange={ ( newOrder ) =>
					setAttributes( { contentOrder: newOrder } )
				}
				help={ __(
					'Drag items to reorder inside the post card',
					'gslider-blocks'
				) }
			/>

			<Select2Control
				label={ __( 'Taxonomy to Display', 'gslider-blocks' ) }
				value={ postTaxonomyDisplay }
				options={ TAXONOMY_DISPLAY_OPTIONS }
				onChange={ ( value ) =>
					setAttributes( { postTaxonomyDisplay: value } )
				}
			/>

			{ postTaxonomyDisplay !== 'none' && (
				<>
					<Select2Control
						label={ __(
							'Max Badges to Display',
							'gslider-blocks'
						) }
						value={ taxonomyMaxCount ?? 2 }
						options={ TAXONOMY_MAX_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( {
								taxonomyMaxCount: parseInt( value, 10 ),
							} )
						}
					/>

					<ToggleControl
						label={ __(
							'Overlay Badge on Image',
							'gslider-blocks'
						) }
						checked={ !! enableTaxonomyBadgeOverlay }
						onChange={ ( value ) =>
							setAttributes( {
								enableTaxonomyBadgeOverlay: value,
							} )
						}
					/>

					{ !! enableTaxonomyBadgeOverlay && (
						<>
							<Select2Control
								label={ __(
									'Badge Position',
									'gslider-blocks'
								) }
								value={ taxonomyBadgeOverlayPosition }
								options={ BADGE_POSITION_OPTIONS }
								onChange={ ( value ) =>
									setAttributes( {
										taxonomyBadgeOverlayPosition: value,
									} )
								}
							/>

							<SwitcherControl
								label={ __(
									'Badge Visibility',
									'gslider-blocks'
								) }
								options={ BADGE_VISIBILITY_OPTIONS }
								value={ taxonomyBadgeOverlayVisibility }
								onChange={ ( value ) =>
									setAttributes( {
										taxonomyBadgeOverlayVisibility: value,
									} )
								}
							/>

							<ResponsiveRangeControl
								label={ __(
									'Badge Vertical Offset (Top/Bottom)',
									'gslider-blocks'
								) }
								rangeValue={ taxonomyBadgeOverlayTopOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										taxonomyBadgeOverlayTopOffset: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										taxonomyBadgeOverlayTopOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ taxonomyBadgeOverlayTopOffsetUnits }
								resetFallbackValue={ BADGE_OFFSET_FALLBACKS }
								unitBounds={ BADGE_OFFSET_BOUNDS }
							/>

							<ResponsiveRangeControl
								label={ __(
									'Badge Horizontal Offset (Left/Right)',
									'gslider-blocks'
								) }
								rangeValue={ taxonomyBadgeOverlayLeftOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										taxonomyBadgeOverlayLeftOffset: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										taxonomyBadgeOverlayLeftOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ taxonomyBadgeOverlayLeftOffsetUnits }
								resetFallbackValue={ BADGE_OFFSET_FALLBACKS }
								unitBounds={ BADGE_OFFSET_BOUNDS }
							/>
						</>
					) }
				</>
			) }
		</PanelBody>
	);
};

export default ContentOrderPanel;
