/* eslint-disable no-unused-vars, jsdoc/require-param, react-hooks/exhaustive-deps, import/no-unresolved */
import { __ } from '@wordpress/i18n';
import {
	useState,
	useEffect,
	useMemo,
	memo,
	useCallback,
	useRef,
} from '@wordpress/element';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import {
	PanelBody,
	ToggleControl,
	BaseControl,
	Button,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import {
	TEXT_ALIGN,
	ARROW_ICON_ALIGN,
	VERTICAL_ALIGN,
	HORIZONTAL_ALIGN,
	HTML_TAGS,
	NORMAL_HOVER,
	BORDER_STYLES,
	SLIDER_EFFECT_OPTIONS,
	CAROUSEL_EFFECT_OPTIONS,
	SLIDER_TYPE,
	SLIDER_DIRECTION,
	PAGINATION_TYPE,
	NORMAL_ACTIVE,
	NAVIGATION_ARROW_POSITION_TYPE,
	NAVIGATION_ARROW_POSITION,
	NAVIGATION_ARROW_DIRECTION,
	LAYOUT_HEIGHT_SWITCHER,
	PAGINATION_POSITION_TYPE,
	ICON_IMAGE_ALIGN,
} from '@Constants';

import './editor.scss';
import SortableItem from './sortableItem';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ColorControl from '@Components/color-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';
import BackgroundControl from '@Components/background-control';
import LoadGoogleFont from '@Utils/loadGoogleFont';
import ResponsiveBackgroundImageControl from '@Components/responsive-background-image-control';
import ImageControl from '@Components/image-control';
import InspectorControl from '@Components/inspector-controls';

import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import { useDeviceType } from '@Utils/displayType';
import InputControls from '@Components/input-control';
import HtmlTagControl from '@Components/html-tag-control';
import SelectControls from '@Components/select-controls';
import IconPicker from '@Components/icon-picker';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';
import ContentOrderControl from '@Components/content-order-control';
import PresetSelector from '@Components/preset-selector';
import { TESTIMONIAL_PRESETS } from './preset';
import { normalizeContentOrder } from './content-order';

/**
 * Testimonial Slider inspector settings panel.
 *
 * @param {Object}   props                     Component props.
 * @param {Object}   props.attributes          Current block attributes.
 * @param {Function} props.setAttributes       Attribute setter callback.
 * @param {Function} props.handleAddItem       Adds a new testimonial slide.
 * @param {Function} props.handleChangeItem    Updates a testimonial slide.
 * @param {Function} props.handleDuplicateItem Duplicates a testimonial slide.
 * @param {Function} props.handleDragEnd       Persists slide reordering.
 * @param {Function} props.handleDeleteItem    Removes a testimonial slide.
 * @return {Element} Rendered inspector panel.
 */
const Inspector = ( {
	attributes,
	setAttributes,
	handleAddItem,
	handleChangeItem,
	handleDuplicateItem,
	handleDragEnd,
	handleDeleteItem,
} ) => {
	const {
		blockId,
		deviceType,
		sliderItems,
		blockStyle,
		presetStyle,
		authorPlaceholderUrl,
		sliderType,
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
		slideEffect,
		carouselEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,

		/** Start Show/Hide Elements */
		showAuthorName,
		showAuthorDesignation,
		showTestimonialTitle,
		showTestimonialText,
		showAuthorImage,
		showRating,
		showQuoteIcon,
		showNavigation,
		showPagination,
		paginationPositionType,
		/** End Show/Hide Elements */

		/** Start Layout & Content Setting */
		direction,
		contentOrder,
		layoutHeightSwitcher,
		layoutHeight,
		layoutHeightUnits,
		verticalHeight,
		verticalHeightUnits,
		contentWidth,
		contentWidthUnits,
		contentAlignment,
		contentVerticalAlignment,
		contentHorizontalAlignment,
		authorNameHtmlTag,
		authorDesignationHtmlTag,
		testimonialTitleHtmlTag,
		testimonialTextHtmlTag,
		/** End Layout & Content Setting */

		/** Start Content Padding */
		contentPaddingUnits,
		contentPaddingDesktop,
		contentPaddingDesktopCssStyle,
		contentPaddingTablet,
		contentPaddingTabletCssStyle,
		contentPaddingMobile,
		contentPaddingMobileCssStyle,
		contentPaddingLink,
		/** End Content Padding */

		/** Start Author Name Typography, Color, Margin & Padding */
		authorNameFontFamily,
		authorNameFontSize,
		authorNameFontSizeUnits,
		authorNameFontWeight,
		authorNameFontStyle,
		authorNameTextTransform,
		authorNameTextDecoration,
		authorNameLineHeight,
		authorNameLineHeightUnits,
		authorNameLetterSpacing,
		authorNameLetterSpacingUnits,
		authorNameWordSpacing,
		authorNameWordSpacingUnits,

		authorNameColorSwitcher,
		authorNameColor,
		authorNameColorHover,

		authorNameMarginUnits,
		authorNameDesktopMargin,
		authorNameDesktopMarginCssStyle,
		authorNameTabletMargin,
		authorNameTabletMarginCssStyle,
		authorNameMobileMargin,
		authorNameMobileMarginCssStyle,
		authorNameMarginLink,

		authorNamePaddingUnits,
		authorNameDesktopPadding,
		authorNameDesktopPaddingCssStyle,
		authorNameTabletPadding,
		authorNameTabletPaddingCssStyle,
		authorNameMobilePadding,
		authorNameMobilePaddingCssStyle,
		authorNamePaddingLink,
		/** End Author Name Typography, Color, Margin & Padding */

		/** Start Author Designation Typography, Color, Margin & Padding */
		authorDesignationFontFamily,
		authorDesignationFontSize,
		authorDesignationFontSizeUnits,
		authorDesignationFontWeight,
		authorDesignationFontStyle,
		authorDesignationTextTransform,
		authorDesignationTextDecoration,
		authorDesignationLineHeight,
		authorDesignationLineHeightUnits,
		authorDesignationLetterSpacing,
		authorDesignationLetterSpacingUnits,
		authorDesignationWordSpacing,
		authorDesignationWordSpacingUnits,

		authorDesignationColorSwitcher,
		authorDesignationColor,
		authorDesignationColorHover,

		authorDesignationMarginUnits,
		authorDesignationDesktopMargin,
		authorDesignationDesktopMarginCssStyle,
		authorDesignationTabletMargin,
		authorDesignationTabletMarginCssStyle,
		authorDesignationMobileMargin,
		authorDesignationMobileMarginCssStyle,
		authorDesignationMarginLink,

		authorDesignationPaddingUnits,
		authorDesignationDesktopPadding,
		authorDesignationDesktopPaddingCssStyle,
		authorDesignationTabletPadding,
		authorDesignationTabletPaddingCssStyle,
		authorDesignationMobilePadding,
		authorDesignationMobilePaddingCssStyle,
		authorDesignationPaddingLink,
		/** End Author Designation Typography, Color, Margin & Padding */

		/** Start Author Image Style */
		authorImageSize,
		authorImageSizeUnits,

		authorImageBorder,
		authorImageBorderColorSwitcher,
		authorImageBorderColor,
		authorImageBorderHoverColor,
		authorImageBorderWidthUnits,
		authorImageDesktopBorderWidth,
		authorImageDesktopBorderWidthCssStyle,
		authorImageTabletBorderWidth,
		authorImageTabletBorderWidthCssStyle,
		authorImageMobileBorderWidth,
		authorImageMobileBorderWidthCssStyle,
		authorImageBorderWidthLink,

		authorImageBorderRadiusUnits,
		authorImageDesktopBorderRadius,
		authorImageDesktopBorderRadiusCssStyle,
		authorImageTabletBorderRadius,
		authorImageTabletBorderRadiusCssStyle,
		authorImageMobileBorderRadius,
		authorImageMobileBorderRadiusCssStyle,
		authorImageBorderRadiusLink,

		authorImageMarginUnits,
		authorImageDesktopMargin,
		authorImageDesktopMarginCssStyle,
		authorImageTabletMargin,
		authorImageTabletMarginCssStyle,
		authorImageMobileMargin,
		authorImageMobileMarginCssStyle,
		authorImageMarginLink,

		authorImagePaddingUnits,
		authorImageDesktopPadding,
		authorImageDesktopPaddingCssStyle,
		authorImageTabletPadding,
		authorImageTabletPaddingCssStyle,
		authorImageMobilePadding,
		authorImageMobilePaddingCssStyle,
		authorImagePaddingLink,
		/** End Author Image Style */

		/** Start Rating Style */
		ratingStarColorSwitcher,
		ratingStarColor,
		ratingStarHoverColor,
		ratingEmptyStarColorSwitcher,
		ratingEmptyStarColor,
		ratingEmptyStarHoverColor,
		ratingStarSize,
		ratingStarSizeUnits,
		ratingStarGap,
		ratingStarGapUnits,
		ratingNumberGap,
		ratingNumberGapUnits,

		ratingMarginUnits,
		ratingDesktopMargin,
		ratingDesktopMarginCssStyle,
		ratingTabletMargin,
		ratingTabletMarginCssStyle,
		ratingMobileMargin,
		ratingMobileMarginCssStyle,
		ratingMarginLink,

		ratingPaddingUnits,
		ratingDesktopPadding,
		ratingDesktopPaddingCssStyle,
		ratingTabletPadding,
		ratingTabletPaddingCssStyle,
		ratingMobilePadding,
		ratingMobilePaddingCssStyle,
		ratingPaddingLink,

		showRatingNumber,
		ratingNumberColorSwitcher,
		ratingNumberColor,
		ratingNumberHoverColor,
		ratingNumberFontFamily,
		ratingNumberFontSize,
		ratingNumberFontSizeUnits,
		ratingNumberFontWeight,
		ratingNumberFontStyle,
		ratingNumberTextTransform,
		ratingNumberTextDecoration,
		ratingNumberLineHeight,
		ratingNumberLineHeightUnits,
		ratingNumberLetterSpacing,
		ratingNumberLetterSpacingUnits,
		ratingNumberWordSpacing,
		ratingNumberWordSpacingUnits,
		/** End Rating Style */

		/** Start Testimonial Title Typography, Color, Margin & Padding */
		testimonialTitleFontFamily,
		testimonialTitleFontSize,
		testimonialTitleFontSizeUnits,
		testimonialTitleFontWeight,
		testimonialTitleFontStyle,
		testimonialTitleTextTransform,
		testimonialTitleTextDecoration,
		testimonialTitleLineHeight,
		testimonialTitleLineHeightUnits,
		testimonialTitleLetterSpacing,
		testimonialTitleLetterSpacingUnits,
		testimonialTitleWordSpacing,
		testimonialTitleWordSpacingUnits,

		testimonialTitleColorSwitcher,
		testimonialTitleColor,
		testimonialTitleColorHover,

		testimonialTitleMarginUnits,
		testimonialTitleDesktopMargin,
		testimonialTitleDesktopMarginCssStyle,
		testimonialTitleTabletMargin,
		testimonialTitleTabletMarginCssStyle,
		testimonialTitleMobileMargin,
		testimonialTitleMobileMarginCssStyle,
		testimonialTitleMarginLink,

		testimonialTitlePaddingUnits,
		testimonialTitleDesktopPadding,
		testimonialTitleDesktopPaddingCssStyle,
		testimonialTitleTabletPadding,
		testimonialTitleTabletPaddingCssStyle,
		testimonialTitleMobilePadding,
		testimonialTitleMobilePaddingCssStyle,
		testimonialTitlePaddingLink,
		/** End Testimonial Title Typography, Color, Margin & Padding */

		/** Start Testimonial Text Typography, Color, Margin & Padding */
		testimonialTextFontFamily,
		testimonialTextFontSize,
		testimonialTextFontSizeUnits,
		testimonialTextFontWeight,
		testimonialTextFontStyle,
		testimonialTextTextTransform,
		testimonialTextTextDecoration,
		testimonialTextLineHeight,
		testimonialTextLineHeightUnits,
		testimonialTextLetterSpacing,
		testimonialTextLetterSpacingUnits,
		testimonialTextWordSpacing,
		testimonialTextWordSpacingUnits,

		testimonialTextColorSwitcher,
		testimonialTextColor,
		testimonialTextColorHover,

		testimonialTextMarginUnits,
		testimonialTextDesktopMargin,
		testimonialTextDesktopMarginCssStyle,
		testimonialTextTabletMargin,
		testimonialTextTabletMarginCssStyle,
		testimonialTextMobileMargin,
		testimonialTextMobileMarginCssStyle,
		testimonialTextMarginLink,

		testimonialTextPaddingUnits,
		testimonialTextDesktopPadding,
		testimonialTextDesktopPaddingCssStyle,
		testimonialTextTabletPadding,
		testimonialTextTabletPaddingCssStyle,
		testimonialTextMobilePadding,
		testimonialTextMobilePaddingCssStyle,
		testimonialTextPaddingLink,
		/** End Testimonial Text Typography, Color, Margin & Padding */

		/** Start Quote Icon */
		quoteIconAlign,
		quoteIcon,
		quoteImageUrl,
		quoteImageAlt,
		quoteImageID,

		quoteIconSize,
		quoteIconSizeUnits,

		quoteIconColorSwitcher,
		quoteIconColor,
		quoteIconHoverColor,

		quoteIconMarginUnits,
		quoteIconDesktopMargin,
		quoteIconDesktopMarginCssStyle,
		quoteIconTabletMargin,
		quoteIconTabletMarginCssStyle,
		quoteIconMobileMargin,
		quoteIconMobileMarginCssStyle,
		quoteIconMarginLink,

		quoteIconPaddingUnits,
		quoteIconDesktopPadding,
		quoteIconDesktopPaddingCssStyle,
		quoteIconTabletPadding,
		quoteIconTabletPaddingCssStyle,
		quoteIconMobilePadding,
		quoteIconMobilePaddingCssStyle,
		quoteIconPaddingLink,

		quoteIconPositionSwitcher,
		quoteIconPositionTop,
		quoteIconPositionTopUnits,
		quoteIconPositionBottom,
		quoteIconPositionBottomUnits,
		quoteIconPositionLeft,
		quoteIconPositionLeftUnits,
		quoteIconPositionRight,
		quoteIconPositionRightUnits,
		quoteIconZIndex,

		quoteIconNormalBackgroundType,
		quoteIconNormalClassicColor,
		quoteIconNormalGradientColor,
		quoteIconNormalCustomGradientSwitcher,
		quoteIconNormalCustomGradientInputValue,
		quoteIconHoverBackgroundType,
		quoteIconHoverClassicColor,
		quoteIconHoverGradientColor,
		quoteIconHoverCustomGradientSwitcher,
		quoteIconHoverCustomGradientInputValue,

		quoteIconBorder,
		quoteIconBorderColorSwitcher,
		quoteIconBorderColor,
		quoteIconBorderHoverColor,
		quoteIconBorderUnits,
		quoteIconDesktopBorder,
		quoteIconDesktopBorderCssStyle,
		quoteIconTabletBorder,
		quoteIconTabletBorderCssStyle,
		quoteIconMobileBorder,
		quoteIconMobileBorderCssStyle,
		quoteIconBorderLink,

		quoteIconBorderRadiusUnits,
		quoteIconDesktopBorderRadius,
		quoteIconDesktopBorderRadiusCssStyle,
		quoteIconTabletBorderRadius,
		quoteIconTabletBorderRadiusCssStyle,
		quoteIconMobileBorderRadius,
		quoteIconMobileBorderRadiusCssStyle,
		quoteIconBorderRadiusLink,

		quoteIconBoxShadowValuesSwitcher,
		quoteIconBoxShadowValues,
		quoteIconBoxShadowCssValue,
		quoteIconBoxShadowHoverValues,
		quoteIconBoxShadowHoverCssValue,
		quoteIconOpacity,
		quoteIconRotateSwitcher,
		quoteIconRotate,
		quoteIconHoverRotate,
		/** End Quote Icon */

		/** Start Navigation Custom Arrows */
		navigationArrowsIconSwitcher,
		navigationArrowsIconLeftAlign,
		navigationArrowsIconLeft,
		navigationArrowsIconLeftImageUrl,
		navigationArrowsIconLeftImageAlt,
		navigationArrowsIconLeftImageID,

		navigationArrowsIconRightAlign,
		navigationArrowsIconRight,
		navigationArrowsIconRightImageUrl,
		navigationArrowsIconRightImageAlt,
		navigationArrowsIconRightImageID,
		/** End Navigation Custom Arrows */

		/** Start Arrows Style */
		navigationArrowSize,
		navigationArrowSizeUnits,

		/** Start Arrows Color */
		navigationArrowColorSwitcher,
		navigationArrowColor,
		navigationArrowColorHover,
		/** End Arrows Color */

		/** Start Background */
		navigationArrowNormalBackgroundType,
		navigationArrowNormalClassicColor,
		navigationArrowNormalGradientColor,
		navigationArrowNormalCustomGradientSwitcher,
		navigationArrowNormalCustomGradientInputValue,
		navigationArrowHoverBackgroundType,
		navigationArrowHoverClassicColor,
		navigationArrowHoverGradientColor,
		navigationArrowHoverCustomGradientSwitcher,
		navigationArrowHoverCustomGradientInputValue,
		/** End Background */

		/** Start Arrows Dimensions */
		navigationArrowWidth,
		navigationArrowWidthUnits,
		navigationArrowHeight,
		navigationArrowHeightUnits,
		/** End Arrows Dimensions */

		/** Start Border */
		navigationArrowBorder,
		navigationArrowBorderColorSwitcher,
		navigationArrowBorderColor,
		navigationArrowBorderHoverColor,
		navigationArrowBorderUnits,
		navigationArrowDesktopBorder,
		navigationArrowDesktopBorderCssStyle,
		navigationArrowTabletBorder,
		navigationArrowTabletBorderCssStyle,
		navigationArrowMobileBorder,
		navigationArrowMobileBorderCssStyle,
		navigationArrowBorderLink,
		/** End Border */

		/** Start Border Radius */
		navigationArrowBorderRadiusUnits,
		navigationArrowDesktopBorderRadius,
		navigationArrowDesktopBorderRadiusCssStyle,
		navigationArrowTabletBorderRadius,
		navigationArrowTabletBorderRadiusCssStyle,
		navigationArrowMobileBorderRadius,
		navigationArrowMobileBorderRadiusCssStyle,
		navigationArrowBorderRadiusLink,
		/** End Border Radius */

		/** Start Box Shadow */
		navigationArrowBoxShadowValuesSwitcher,
		navigationArrowBoxShadowValues,
		navigationArrowBoxShadowCssValue,
		navigationArrowBoxShadowHoverValues,
		navigationArrowBoxShadowHoverCssValue,
		/** End Box Shadow */

		/** Start Position */
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowDirection,

		navigationArrowPositionTopOffset,
		navigationArrowPositionTopOffsetUnits,
		navigationArrowPositionLeftOffset,
		navigationArrowPositionLeftOffsetUnits,
		navigationArrowPositionRightOffset,
		navigationArrowPositionRightOffsetUnits,
		navigationArrowPositionBottomOffset,
		navigationArrowPositionBottomOffsetUnits,

		navigationArrowGap,
		navigationArrowGapUnits,

		navigationArrowPositionOutsidePadding,
		navigationArrowPositionOutsidePaddingUnits,
		/** End Position */

		/** Start Dots Margin */
		paginationDotsMarginUnits,
		paginationDotsDesktopMargin,
		paginationDotsDesktopMarginCssStyle,
		paginationDotsTabletMargin,
		paginationDotsTabletMarginCssStyle,
		paginationDotsMobileMargin,
		paginationDotsMobileMarginCssStyle,
		paginationDotsMarginLink,
		/** End Dots Margin */

		/** Start Dots Position */
		paginationDotsPosition,
		paginationDotsPositionUnits,
		paginationProgressbarPosition,
		paginationProgressbarPositionUnits,
		/** End Dots Position */

		/** Start Pagination Outside Offset */
		paginationOutsideOffset,
		paginationOutsideOffsetUnits,
		/** End Pagination Outside Offset */

		/** Start Dots Style */
		paginationDotsSwitcher,
		paginationNormalDotsBgColor,
		paginationActiveDotsBgColor,
		paginationNormalDotsWidth,
		paginationNormalDotsWidthUnits,
		paginationNormalDotsHeight,
		paginationNormalDotsHeightUnits,
		/** End Dots Style */

		/** Start Dots Border */
		paginationNormalDotsBorder,
		paginationNormalDotsBorderColorSwitcher,
		paginationNormalDotsBorderColor,
		paginationNormalDotsBorderHoverColor,
		paginationNormalDotsBorderUnits,
		paginationNormalDotsDesktopBorder,
		paginationNormalDotsDesktopBorderCssStyle,
		paginationNormalDotsTabletBorder,
		paginationNormalDotsTabletBorderCssStyle,
		paginationNormalDotsMobileBorder,
		paginationNormalDotsMobileBorderCssStyle,
		paginationNormalDotsBorderLink,
		/** End Dots Border */

		/** Start Dots Border Radius */
		paginationNormalDotsBorderRadius,
		paginationNormalDotsBorderRadiusUnits,
		paginationNormalDotsDesktopBorderRadius,
		paginationNormalDotsDesktopBorderRadiusCssStyle,
		paginationNormalDotsTabletBorderRadius,
		paginationNormalDotsTabletBorderRadiusCssStyle,
		paginationNormalDotsMobileBorderRadius,
		paginationNormalDotsMobileBorderRadiusCssStyle,
		paginationNormalDotsBorderRadiusLink,
		/** End Dots Border Radius */

		/** Start Active Dots */
		paginationActiveDotsWidth,
		paginationActiveDotsWidthUnits,
		paginationActiveDotsHeight,
		paginationActiveDotsHeightUnits,
		/** End Active Dots */

		/** Start Active Dots Border */
		paginationActiveDotsBorder,
		paginationActiveDotsBorderColorSwitcher,
		paginationActiveDotsBorderColor,
		paginationActiveDotsBorderHoverColor,
		/** End Active Dots Border */

		/** Start Active Dots Border */
		paginationActiveDotsBorderUnits,
		paginationActiveDotsDesktopBorder,
		paginationActiveDotsDesktopBorderCssStyle,
		paginationActiveDotsTabletBorder,
		paginationActiveDotsTabletBorderCssStyle,
		paginationActiveDotsMobileBorder,
		paginationActiveDotsMobileBorderCssStyle,
		paginationActiveDotsBorderLink,
		/** End Active Dots Border */

		/** Start Active Dots Border Radius */
		paginationActiveDotsBorderRadiusUnits,
		paginationActiveDotsDesktopBorderRadius,
		paginationActiveDotsDesktopBorderRadiusCssStyle,
		paginationActiveDotsTabletBorderRadius,
		paginationActiveDotsTabletBorderRadiusCssStyle,
		paginationActiveDotsMobileBorderRadius,
		paginationActiveDotsMobileBorderRadiusCssStyle,
		paginationActiveDotsBorderRadiusLink,
		/** End Active Dots Border Radius */

		/** start Fraction Typography and Color */
		paginationFractionFontFamily,
		paginationFractionFontSize,
		paginationFractionFontSizeUnits,
		paginationFractionFontWeight,
		paginationFractionFontStyle,
		paginationFractionTextTransform,
		paginationFractionTextDecoration,
		paginationFractionLineHeight,
		paginationFractionLineHeightUnits,
		paginationFractionLetterSpacing,
		paginationFractionLetterSpacingUnits,
		paginationFractionWordSpacing,
		paginationFractionWordSpacingUnits,
		paginationFractionColorSwitcher,
		paginationFractionColor,
		paginationFractionColorHover,
		/** End Fraction Typography and Color */

		/** start pagination Progressbar Color */
		paginationProgressbarBGColorSwitcher,
		paginationProgressbarBGColor,
		paginationProgressbarBGActiveColor,
		paginationProgressbarHeight,
		paginationProgressbarHeightUnits,
		/** End pagination Progressbar Color */

		/** Global Settings */

		/** Start Global Margin */
		globalMarginUnits,
		globalMarginDesktop,
		globalMarginDesktopCssStyle,
		globalMarginTablet,
		globalMarginTabletCssStyle,
		globalMarginMobile,
		globalMarginMobileCssStyle,
		globalMarginLink,
		/** End Global Margin */

		/** Start Global Padding */
		globalPaddingUnits,
		globalPaddingDesktop,
		globalPaddingDesktopCssStyle,
		globalPaddingTablet,
		globalPaddingTabletCssStyle,
		globalPaddingMobile,
		globalPaddingMobileCssStyle,
		globalPaddingLink,
		/** End Global Padding */

		/** Start Global Z-Index */
		globalZIndex,
		globalID,
		globalClass,
		/** End Global Z-Index */

		/** Start Global Background */
		globalNormalBackgroundType,
		globalNormalClassicColor,
		globalNormalGradientColor,
		globalNormalCustomGradientSwitcher,
		globalNormalCustomGradientInputValue,
		globalNormalBackgroundImageUrl,
		globalNormalBackgroundImagePosition,
		globalNormalBackgroundImageAttachment,
		globalNormalBackgroundImageRepeat,
		globalNormalBackgroundImageSize,

		globalHoverBackgroundType,
		globalHoverClassicColor,
		globalHoverGradientColor,
		globalHoverCustomGradientSwitcher,
		globalHoverCustomGradientInputValue,
		globalHoverBackgroundImageUrl,
		globalHoverBackgroundImagePosition,
		globalHoverBackgroundImageAttachment,
		globalHoverBackgroundImageRepeat,
		globalHoverBackgroundImageSize,
		/** End Global Setting */

		/** Start Global Border */
		globalBorder,
		globalBorderColorSwitcher,
		globalBorderColor,
		globalBorderHoverColor,

		globalBorderUnits,
		globalBorderDesktop,
		globalBorderDesktopCssStyle,
		globalBorderTablet,
		globalBorderTabletCssStyle,
		globalBorderMobile,
		globalBorderMobileCssStyle,
		globalBorderLink,
		/** End Global Border */

		/** Start Global Border Radius */
		globalBorderRadiusUnits,
		globalBorderRadiusDesktop,
		globalBorderRadiusDesktopCssStyle,
		globalBorderRadiusTablet,
		globalBorderRadiusTabletCssStyle,
		globalBorderRadiusMobile,
		globalBorderRadiusMobileCssStyle,
		globalBorderRadiusLink,
		/** End Global Border Radius */

		/** Start Global Box Shadow */
		globalBoxShadowValuesSwitcher,
		globalBoxShadowValues,
		globalBoxShadowCssValue,
		globalBoxShadowHoverValues,
		globalBoxShadowHoverCssValue,
		/** End Global Box Shadow */
	} = attributes;

	const normalizedContentOrder = normalizeContentOrder( contentOrder );

	/** Get Current Device Type */
	const currentDeviceType = useDeviceType();

	/** Set Device Type */
	useEffect( () => {
		setAttributes( { deviceType: currentDeviceType } );
	}, [ currentDeviceType ] );

	const defaultOpenPanels = {
		general: 'show-hide-elements',
		styles: 'content',
		advanced: 'layout',
	};

	const [ openPanels, setOpenPanels ] = useState( defaultOpenPanels );

	const togglePanel = useCallback( ( tabName, panelKey ) => {
		setOpenPanels( ( prev ) => ( {
			...prev,
			[ tabName ]: prev[ tabName ] === panelKey ? null : panelKey,
		} ) );
	}, [] );

	/**
	 * Percentage height cannot resolve against the slider wrapper, so the
	 * vertical height control rejects the % unit. The shared unit control
	 * always writes the clamped value after the unit, so the pending flag
	 * keeps the stored height untouched when % is picked.
	 */
	const skipVerticalHeightUpdateRef = useRef( false );

	const handleVerticalHeightUnitChange = useCallback(
		( value ) => {
			if ( value?.[ deviceType ] === '%' ) {
				skipVerticalHeightUpdateRef.current = true;
				return;
			}
			setAttributes( { verticalHeightUnits: value } );
		},
		[ deviceType, setAttributes ]
	);

	const handleVerticalHeightValueChange = useCallback(
		( value ) => {
			if ( skipVerticalHeightUpdateRef.current ) {
				skipVerticalHeightUpdateRef.current = false;
				return;
			}
			setAttributes( { verticalHeight: value } );
		},
		[ setAttributes ]
	);

	/** Format Spacing */
	const formatSpacingSide = ( value, unit ) =>
		value === '' || value === undefined || value === null
			? '0'
			: `${ value }${ unit }`;

	const spacingFormat = ( spacing, units ) => {
		const hasValue = ( v ) => v !== '' && v !== undefined && v !== null;
		const hasAny =
			hasValue( spacing?.top ) ||
			hasValue( spacing?.right ) ||
			hasValue( spacing?.bottom ) ||
			hasValue( spacing?.left );

		return hasAny
			? `${ formatSpacingSide(
					spacing.top,
					units
			  ) } ${ formatSpacingSide(
					spacing.right,
					units
			  ) } ${ formatSpacingSide(
					spacing.bottom,
					units
			  ) } ${ formatSpacingSide( spacing.left, units ) }`
			: '';
	};

	/** set the css style if have default padding or margin */
	useEffect( () => {
		setAttributes( {
			authorNameDesktopMarginCssStyle: spacingFormat(
				authorNameDesktopMargin,
				authorNameMarginUnits.Desktop
			),
			authorNameTabletMarginCssStyle: spacingFormat(
				authorNameTabletMargin,
				authorNameMarginUnits.Tablet
			),
			authorNameMobileMarginCssStyle: spacingFormat(
				authorNameMobileMargin,
				authorNameMarginUnits.Mobile
			),

			authorDesignationDesktopMarginCssStyle: spacingFormat(
				authorDesignationDesktopMargin,
				authorDesignationMarginUnits.Desktop
			),
			authorDesignationTabletMarginCssStyle: spacingFormat(
				authorDesignationTabletMargin,
				authorDesignationMarginUnits.Tablet
			),
			authorDesignationMobileMarginCssStyle: spacingFormat(
				authorDesignationMobileMargin,
				authorDesignationMarginUnits.Mobile
			),

			testimonialTextDesktopMarginCssStyle: spacingFormat(
				testimonialTextDesktopMargin,
				testimonialTextMarginUnits.Desktop
			),
			testimonialTextTabletMarginCssStyle: spacingFormat(
				testimonialTextTabletMargin,
				testimonialTextMarginUnits.Tablet
			),
			testimonialTextMobileMarginCssStyle: spacingFormat(
				testimonialTextMobileMargin,
				testimonialTextMarginUnits.Mobile
			),

			navigationArrowDesktopBorderRadiusCssStyle: spacingFormat(
				navigationArrowDesktopBorderRadius,
				navigationArrowBorderRadiusUnits.Desktop
			),
			navigationArrowTabletBorderRadiusCssStyle: spacingFormat(
				navigationArrowTabletBorderRadius,
				navigationArrowBorderRadiusUnits.Tablet
			),
			navigationArrowMobileBorderRadiusCssStyle: spacingFormat(
				navigationArrowMobileBorderRadius,
				navigationArrowBorderRadiusUnits.Mobile
			),

			paginationNormalDotsDesktopBorderRadiusCssStyle: spacingFormat(
				paginationNormalDotsDesktopBorderRadius,
				paginationNormalDotsBorderRadiusUnits.Desktop
			),
			paginationNormalDotsTabletBorderRadiusCssStyle: spacingFormat(
				paginationNormalDotsTabletBorderRadius,
				paginationNormalDotsBorderRadiusUnits.Tablet
			),
			paginationNormalDotsMobileBorderRadiusCssStyle: spacingFormat(
				paginationNormalDotsMobileBorderRadius,
				paginationNormalDotsBorderRadiusUnits.Mobile
			),

			authorImageDesktopBorderRadiusCssStyle: spacingFormat(
				authorImageDesktopBorderRadius,
				authorImageBorderRadiusUnits.Desktop
			),
			authorImageTabletBorderRadiusCssStyle: spacingFormat(
				authorImageTabletBorderRadius,
				authorImageBorderRadiusUnits.Tablet
			),
			authorImageMobileBorderRadiusCssStyle: spacingFormat(
				authorImageMobileBorderRadius,
				authorImageBorderRadiusUnits.Mobile
			),

			authorImageDesktopMarginCssStyle: spacingFormat(
				authorImageDesktopMargin,
				authorImageMarginUnits.Desktop
			),
			authorImageTabletMarginCssStyle: spacingFormat(
				authorImageTabletMargin,
				authorImageMarginUnits.Tablet
			),
			authorImageMobileMarginCssStyle: spacingFormat(
				authorImageMobileMargin,
				authorImageMarginUnits.Mobile
			),
		} );
	}, [
		authorNameDesktopMargin,
		authorNameTabletMargin,
		authorNameMobileMargin,

		authorDesignationDesktopMargin,
		authorDesignationTabletMargin,
		authorDesignationMobileMargin,

		testimonialTextDesktopMargin,
		testimonialTextTabletMargin,
		testimonialTextMobileMargin,

		navigationArrowDesktopBorderRadius,
		navigationArrowTabletBorderRadius,
		navigationArrowMobileBorderRadius,
		navigationArrowBorderRadiusUnits,

		paginationNormalDotsDesktopBorderRadius,
		paginationNormalDotsTabletBorderRadius,
		paginationNormalDotsMobileBorderRadius,
		paginationNormalDotsBorderRadiusUnits,

		authorImageDesktopBorderRadius,
		authorImageTabletBorderRadius,
		authorImageMobileBorderRadius,
		authorImageBorderRadiusUnits,

		authorImageDesktopMargin,
		authorImageTabletMargin,
		authorImageMobileMargin,
		authorImageMarginUnits,
	] );
	/** end if have default padding then set the css style */

	/** Load Google Font */
	LoadGoogleFont( authorNameFontFamily );
	LoadGoogleFont( authorDesignationFontFamily );
	LoadGoogleFont( testimonialTextFontFamily );
	LoadGoogleFont( testimonialTitleFontFamily );
	LoadGoogleFont( ratingNumberFontFamily );
	/** End Load Google Font */

	/** Quote Icon Handler */
	const quoteIconHandler = ( IconName ) => {
		setAttributes( { quoteIcon: IconName } );
	};
	/** Navigation Custom Arrows */
	const navigationArrowsIconLeftHandler = ( IconName ) => {
		setAttributes( { navigationArrowsIconLeft: IconName } );
	};
	const navigationArrowsIconRightHandler = ( IconName ) => {
		setAttributes( { navigationArrowsIconRight: IconName } );
	};
	/** End Navigation Custom Arrows */

	/**
	 * Inspector General Controls
	 */
	const generalControls = (
		<>
			{ /* <PanelBody
                title={__("Preset Style", "gslider-blocks")}
                opened={openPanels.general === "preset-style"}
                onToggle={() => togglePanel("general", "preset-style")}
            >
                <PresetSelector
                    label={__("Choose Style", "gslider-blocks")}
                    presets={TESTIMONIAL_PRESETS}
                    value={presetStyle}
                    onChange={(value) => setAttributes({ presetStyle: value })}
                    setAttributes={setAttributes}
                    currentAttributes={attributes}
                />
            </PanelBody> */ }

			<PanelBody
				title={ __( 'Show / Hide Elements', 'gslider-blocks' ) }
				opened={ openPanels.general === 'show-hide-elements' }
				onToggle={ () =>
					togglePanel( 'general', 'show-hide-elements' )
				}
			>
				<ToggleControl
					label={ __( 'Show Testimonial Title', 'gslider-blocks' ) }
					checked={ showTestimonialTitle }
					onChange={ ( value ) =>
						setAttributes( { showTestimonialTitle: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Show Testimonial Text', 'gslider-blocks' ) }
					checked={ showTestimonialText }
					onChange={ ( value ) =>
						setAttributes( { showTestimonialText: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Show Author Name', 'gslider-blocks' ) }
					checked={ showAuthorName }
					onChange={ ( value ) =>
						setAttributes( { showAuthorName: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Show Author Designation', 'gslider-blocks' ) }
					checked={ showAuthorDesignation }
					onChange={ ( value ) =>
						setAttributes( { showAuthorDesignation: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Show Author Image', 'gslider-blocks' ) }
					checked={ showAuthorImage }
					onChange={ ( value ) =>
						setAttributes( { showAuthorImage: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Show Rating', 'gslider-blocks' ) }
					checked={ showRating }
					onChange={ ( value ) =>
						setAttributes( { showRating: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Show Quote Icon', 'gslider-blocks' ) }
					checked={ showQuoteIcon }
					onChange={ ( value ) =>
						setAttributes( { showQuoteIcon: value } )
					}
				/>
				<ResponsiveToggleControl
					label={ __( 'Show Navigation', 'gslider-blocks' ) }
					toggleValue={ showNavigation }
					setToggleValue={ ( value ) =>
						setAttributes( { showNavigation: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
				<ResponsiveToggleControl
					label={ __( 'Show Pagination', 'gslider-blocks' ) }
					toggleValue={ showPagination }
					setToggleValue={ ( value ) =>
						setAttributes( { showPagination: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Slider Items', 'gslider-blocks' ) }
				opened={ openPanels.general === 'slider-items' }
				onToggle={ () => togglePanel( 'general', 'slider-items' ) }
			>
				<div className="gslider-repeat-item-wrapper">
					<DndContext
						collisionDetection={ closestCenter }
						onDragEnd={ handleDragEnd }
					>
						<SortableContext
							items={ sliderItems.map( ( item ) => item.id ) }
						>
							<ul className="dnd-items-wrapper">
								{ sliderItems.map( ( item, index ) => (
									<SortableItem
										key={ item.id }
										id={ item.id }
										item={ item }
										handleChangeItem={ handleChangeItem }
										handleDeleteItem={ handleDeleteItem }
										handleDuplicateItem={
											handleDuplicateItem
										}
										index={ index }
										deviceType={ deviceType }
										authorPlaceholderUrl={
											authorPlaceholderUrl
										}
										setAttributes={ setAttributes }
									/>
								) ) }
							</ul>
						</SortableContext>
					</DndContext>
					<Button
						isPrimary
						onClick={ handleAddItem }
						className="gslider-add-item-btn"
					>
						{ __( 'Add Slide', 'gslider-blocks' ) }
					</Button>
				</div>
			</PanelBody>

			<PanelBody
				title={ __( 'Layout & Content Setting', 'gslider-blocks' ) }
				opened={ openPanels.general === 'layout-content-setting' }
				onToggle={ () =>
					togglePanel( 'general', 'layout-content-setting' )
				}
			>
				<SwitcherControl
					label={ __( 'Slider Direction', 'gslider-blocks' ) }
					options={ SLIDER_DIRECTION }
					value={ direction }
					onChange={ ( value ) =>
						setAttributes( { direction: value } )
					}
				/>

				{ direction === 'vertical' ? (
					<>
						<ResponsiveRangeControl
							label={ __( 'Slider Height', 'gslider-blocks' ) }
							rangeValue={ verticalHeight }
							onChangeValue={ handleVerticalHeightValueChange }
							onUnitChange={ handleVerticalHeightUnitChange }
							deviceType={ deviceType }
							units={ verticalHeightUnits }
							resetFallbackValue={ {
								px: '500',
								vh: '60',
								em: '25',
								rem: '25',
							} }
						/>

						<p>
							{ __(
								'Vertical sliders always use this fixed height. Use px, vh, vw, em or rem. A percent height is not supported.',
								'gslider-blocks'
							) }
						</p>
					</>
				) : (
					<>
						<SwitcherControl
							label={ __(
								'Layout Height Switcher',
								'gslider-blocks'
							) }
							options={ LAYOUT_HEIGHT_SWITCHER }
							value={ layoutHeightSwitcher }
							onChange={ ( value ) =>
								setAttributes( { layoutHeightSwitcher: value } )
							}
						/>

						{ layoutHeightSwitcher === 'fixed' && (
							<ResponsiveRangeControl
								label={ __(
									'Minimum Height',
									'gslider-blocks'
								) }
								rangeValue={ layoutHeight }
								onChangeValue={ ( value ) =>
									setAttributes( { layoutHeight: value } )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										layoutHeightUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ layoutHeightUnits }
								resetFallbackValue={ {
									px:
										{
											Desktop: '420',
											Tablet: '340',
											Mobile: '260',
										}[ deviceType ] || '260',
									'%': '50',
									vh: '50',
									vw: '50',
									em: '20',
									rem: '20',
								} }
							/>
						) }

						{ layoutHeightSwitcher === 'adapt' && (
							<p>
								{ __(
									'Slides adapt their height to the inside content.',
									'gslider-blocks'
								) }
							</p>
						) }
					</>
				) }

				<ResponsiveRangeControl
					label={ __( 'Max Width', 'gslider-blocks' ) }
					rangeValue={ contentWidth }
					onChangeValue={ ( value ) =>
						setAttributes( { contentWidth: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { contentWidthUnits: value } )
					}
					deviceType={ deviceType }
					units={ contentWidthUnits }
					resetFallbackValue={ {
						px: '1200',
						'%': '80',
						vw: '100',
						em: '60',
						rem: '60',
					} }
					unitBounds={ {
						px: { min: 0, max: 3000, step: 1 },
					} }
				/>

				{ ( layoutHeightSwitcher !== 'adapt' ||
					direction === 'vertical' ) && (
					<ResponsiveAlignmentControl
						label={ __( 'Vertical Alignment', 'gslider-blocks' ) }
						options={ VERTICAL_ALIGN }
						alignmentValue={ contentVerticalAlignment }
						setAlignmentValue={ ( value ) =>
							setAttributes( { contentVerticalAlignment: value } )
						}
						deviceType={ deviceType }
						setAttributes={ setAttributes }
						className="gslider-vertical-alignment"
					/>
				) }

				<ResponsiveAlignmentControl
					label={ __( 'Horizontal Alignment', 'gslider-blocks' ) }
					options={ HORIZONTAL_ALIGN }
					alignmentValue={ contentHorizontalAlignment }
					setAlignmentValue={ ( value ) =>
						setAttributes( { contentHorizontalAlignment: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>

				<ResponsiveAlignmentControl
					label={ __( 'Text Alignment', 'gslider-blocks' ) }
					options={ TEXT_ALIGN }
					alignmentValue={ contentAlignment }
					setAlignmentValue={ ( value ) =>
						setAttributes( { contentAlignment: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>

				<HtmlTagControl
					label={ __( 'Testimonial Title Tag', 'gslider-blocks' ) }
					options={ HTML_TAGS }
					value={ testimonialTitleHtmlTag }
					onChange={ ( value ) =>
						setAttributes( { testimonialTitleHtmlTag: value } )
					}
				/>

				<HtmlTagControl
					label={ __( 'Testimonial Text Tag', 'gslider-blocks' ) }
					options={ HTML_TAGS }
					value={ testimonialTextHtmlTag }
					onChange={ ( value ) =>
						setAttributes( { testimonialTextHtmlTag: value } )
					}
				/>

				<HtmlTagControl
					label={ __( 'Author Name Tag', 'gslider-blocks' ) }
					options={ HTML_TAGS }
					value={ authorNameHtmlTag }
					onChange={ ( value ) =>
						setAttributes( { authorNameHtmlTag: value } )
					}
				/>

				<HtmlTagControl
					label={ __( 'Author Designation Tag', 'gslider-blocks' ) }
					options={ HTML_TAGS }
					value={ authorDesignationHtmlTag }
					onChange={ ( value ) =>
						setAttributes( { authorDesignationHtmlTag: value } )
					}
				/>
			</PanelBody>

			{ showQuoteIcon && (
				<PanelBody
					title={ __( 'Quote Icon', 'gslider-blocks' ) }
					opened={ openPanels.general === 'quote-icon' }
					onToggle={ () => togglePanel( 'general', 'quote-icon' ) }
				>
					<SwitcherControl
						label={ __( 'Icon Align', 'gslider-blocks' ) }
						options={ ICON_IMAGE_ALIGN }
						value={ quoteIconAlign }
						onChange={ ( value ) =>
							setAttributes( { quoteIconAlign: value } )
						}
					/>

					{ quoteIconAlign === 'icon' && (
						<IconPicker
							value={ quoteIcon }
							setIconHandler={ quoteIconHandler }
						/>
					) }

					{ quoteIconAlign === 'image' && (
						<ImageControl
							imageUrl={ quoteImageUrl }
							setImageUrl={ ( value ) =>
								setAttributes( { quoteImageUrl: value } )
							}
							imageAlt={ quoteImageAlt }
							setImageAlt={ ( value ) =>
								setAttributes( { quoteImageAlt: value } )
							}
							imageID={ quoteImageID }
							setImageID={ ( value ) =>
								setAttributes( { quoteImageID: value } )
							}
							isImageSize={ false }
						/>
					) }
				</PanelBody>
			) }

			<PanelBody
				title={ __( 'Content Order', 'gslider-blocks' ) }
				opened={ openPanels.general === 'content-order' }
				onToggle={ () => togglePanel( 'general', 'content-order' ) }
			>
				<ContentOrderControl
					label={ __( 'Sections', 'gslider-blocks' ) }
					items={ [
						{
							key: 'quote',
							label: __( 'Quote', 'gslider-blocks' ),
							icon: 'format-quote',
						},
						{
							key: 'content',
							label: __( 'Content', 'gslider-blocks' ),
							icon: 'editor-paragraph',
						},
						{
							key: 'rating',
							label: __( 'Rating', 'gslider-blocks' ),
							icon: 'star-filled',
						},
						{
							key: 'author',
							label: __( 'Author', 'gslider-blocks' ),
							icon: 'admin-users',
						},
					] }
					order={ normalizedContentOrder }
					onChange={ ( newOrder ) =>
						setAttributes( { contentOrder: newOrder } )
					}
					help={ __( 'Drag to reorder sections', 'gslider-blocks' ) }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Slider Type', 'gslider-blocks' ) }
				opened={ openPanels.general === 'slider-type' }
				onToggle={ () => togglePanel( 'general', 'slider-type' ) }
			>
				<SwitcherControl
					label={ __( 'Slider Type', 'gslider-blocks' ) }
					options={ SLIDER_TYPE }
					value={ sliderType }
					onChange={ ( value ) =>
						setAttributes( { sliderType: value } )
					}
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Slider Settings', 'gslider-blocks' ) }
				opened={ openPanels.general === 'slider-settings' }
				onToggle={ () => togglePanel( 'general', 'slider-settings' ) }
			>
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
					label={ __( 'Mousewheel Navigation', 'gslider-blocks' ) }
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
					<ResponsiveRangeControl
						min={ 500 }
						max={ 20000 }
						label={ __( 'Autoplay Delay (ms)', 'gslider-blocks' ) }
						rangeValue={ autoplayDelay }
						onChangeValue={ ( value ) =>
							setAttributes( { autoplayDelay: value } )
						}
						deviceType={ deviceType }
						step={ 100 }
						resetFallbackValue={ '1000' }
						isRangeUnit={ false }
					/>
				) }

				<ResponsiveRangeControl
					min={ 100 }
					max={ 5000 }
					label={ __( 'Transition Speed (ms)', 'gslider-blocks' ) }
					rangeValue={ speed }
					onChangeValue={ ( value ) =>
						setAttributes( { speed: value } )
					}
					deviceType={ deviceType }
					step={ 50 }
					resetFallbackValue={ '800' }
					isRangeUnit={ false }
				/>
			</PanelBody>

			{ sliderType === 'carousel' && (
				<PanelBody
					title={ __( 'Carousel Settings', 'gslider-blocks' ) }
					opened={ openPanels.general === 'carousel-settings' }
					onToggle={ () =>
						togglePanel( 'general', 'carousel-settings' )
					}
				>
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
						resetFallbackValue={
							deviceType === 'Mobile' ? '1' : '2'
						}
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
						resetFallbackValue={
							deviceType === 'Mobile' ? '0' : '20'
						}
						isRangeUnit={ false }
					/>
				</PanelBody>
			) }

			{ sliderType === 'carousel' && (
				<PanelBody
					title={ __( 'Carousel Effect', 'gslider-blocks' ) }
					opened={ openPanels.general === 'carousel-effect' }
					onToggle={ () =>
						togglePanel( 'general', 'carousel-effect' )
					}
				>
					<SelectControls
						label={ __( 'Effect Type', 'gslider-blocks' ) }
						options={ CAROUSEL_EFFECT_OPTIONS }
						value={ carouselEffect }
						onChange={ ( value ) =>
							setAttributes( { carouselEffect: value } )
						}
					/>
				</PanelBody>
			) }

			{ sliderType === 'slider' && (
				<PanelBody
					title={ __( 'Slider Effect', 'gslider-blocks' ) }
					opened={ openPanels.general === 'slider-effect' }
					onToggle={ () => togglePanel( 'general', 'slider-effect' ) }
				>
					<SelectControls
						label={ __( 'Effect Type', 'gslider-blocks' ) }
						options={ SLIDER_EFFECT_OPTIONS }
						value={ slideEffect }
						onChange={ ( value ) =>
							setAttributes( { slideEffect: value } )
						}
					/>
				</PanelBody>
			) }

			{ showNavigation?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Navigation', 'gslider-blocks' ) }
					opened={ openPanels.general === 'navigation' }
					onToggle={ () => togglePanel( 'general', 'navigation' ) }
				>
					<ToggleControl
						label={ __( 'Custom Icon', 'gslider-blocks' ) }
						checked={ navigationArrowsIconSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								navigationArrowsIconSwitcher: value,
							} )
						}
					/>

					{ navigationArrowsIconSwitcher && (
						<>
							<BaseControl>
								<SwitcherControl
									label={ __(
										'Left Icon',
										'gslider-blocks'
									) }
									options={ ARROW_ICON_ALIGN }
									value={ navigationArrowsIconLeftAlign }
									onChange={ ( value ) =>
										setAttributes( {
											navigationArrowsIconLeftAlign:
												value,
										} )
									}
								/>

								{ navigationArrowsIconLeftAlign === 'icon' && (
									<IconPicker
										value={ navigationArrowsIconLeft }
										setIconHandler={
											navigationArrowsIconLeftHandler
										}
									/>
								) }

								{ navigationArrowsIconLeftAlign === 'image' && (
									<ImageControl
										imageUrl={
											navigationArrowsIconLeftImageUrl
										}
										setImageUrl={ ( value ) =>
											setAttributes( {
												navigationArrowsIconLeftImageUrl:
													value,
											} )
										}
										imageAlt={
											navigationArrowsIconLeftImageAlt
										}
										setImageAlt={ ( value ) =>
											setAttributes( {
												navigationArrowsIconLeftImageAlt:
													value,
											} )
										}
										imageID={
											navigationArrowsIconLeftImageID
										}
										setImageID={ ( value ) =>
											setAttributes( {
												navigationArrowsIconLeftImageID:
													value,
											} )
										}
										isImageSize={ false }
									/>
								) }
							</BaseControl>

							<BaseControl>
								<SwitcherControl
									label={ __(
										'Right Icon',
										'gslider-blocks'
									) }
									options={ ARROW_ICON_ALIGN }
									value={ navigationArrowsIconRightAlign }
									onChange={ ( value ) =>
										setAttributes( {
											navigationArrowsIconRightAlign:
												value,
										} )
									}
								/>

								{ navigationArrowsIconRightAlign === 'icon' && (
									<IconPicker
										value={ navigationArrowsIconRight }
										setIconHandler={
											navigationArrowsIconRightHandler
										}
									/>
								) }

								{ navigationArrowsIconRightAlign ===
									'image' && (
									<ImageControl
										imageUrl={
											navigationArrowsIconRightImageUrl
										}
										setImageUrl={ ( value ) =>
											setAttributes( {
												navigationArrowsIconRightImageUrl:
													value,
											} )
										}
										imageAlt={
											navigationArrowsIconRightImageAlt
										}
										setImageAlt={ ( value ) =>
											setAttributes( {
												navigationArrowsIconRightImageAlt:
													value,
											} )
										}
										imageID={
											navigationArrowsIconRightImageID
										}
										setImageID={ ( value ) =>
											setAttributes( {
												navigationArrowsIconRightImageID:
													value,
											} )
										}
										isImageSize={ false }
									/>
								) }
							</BaseControl>
						</>
					) }

					<SwitcherControl
						label={ __( 'Positioning', 'gslider-blocks' ) }
						options={ NAVIGATION_ARROW_POSITION_TYPE }
						value={ navigationArrowPositionType }
						onChange={ ( value ) =>
							setAttributes( {
								navigationArrowPositionType: value,
							} )
						}
					/>

					<SelectControls
						label={ __( 'Position', 'gslider-blocks' ) }
						options={ NAVIGATION_ARROW_POSITION }
						value={ navigationArrowPosition }
						onChange={ ( value ) =>
							setAttributes( { navigationArrowPosition: value } )
						}
					/>

					{ navigationArrowPosition !== 'center' && (
						<SelectControls
							label={ __( 'Arrow Direction', 'gslider-blocks' ) }
							options={ NAVIGATION_ARROW_DIRECTION }
							value={ navigationArrowDirection }
							onChange={ ( value ) =>
								setAttributes( {
									navigationArrowDirection: value,
								} )
							}
						/>
					) }

					{ navigationArrowPosition === 'top-left' && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Top Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionTopOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffset: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionTopOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Left Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionLeftOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionLeftOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }
					{ navigationArrowPosition === 'top-center' && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Top Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionTopOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffset: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionTopOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Left Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionLeftOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionLeftOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }

					{ navigationArrowPosition === 'top-right' && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Top Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionTopOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffset: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionTopOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionTopOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Right Offset', 'gslider-blocks' ) }
								rangeValue={
									navigationArrowPositionRightOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionRightOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionRightOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={
									navigationArrowPositionRightOffsetUnits
								}
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }

					{ navigationArrowPosition === 'bottom-left' && (
						<>
							<ResponsiveRangeControl
								label={ __(
									'Bottom Offset',
									'gslider-blocks'
								) }
								rangeValue={
									navigationArrowPositionBottomOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={
									navigationArrowPositionBottomOffsetUnits
								}
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Left Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionLeftOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionLeftOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }
					{ navigationArrowPosition === 'bottom-center' && (
						<>
							<ResponsiveRangeControl
								label={ __(
									'Bottom Offset',
									'gslider-blocks'
								) }
								rangeValue={
									navigationArrowPositionBottomOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={
									navigationArrowPositionBottomOffsetUnits
								}
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Left Offset', 'gslider-blocks' ) }
								rangeValue={ navigationArrowPositionLeftOffset }
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionLeftOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={ navigationArrowPositionLeftOffsetUnits }
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }

					{ navigationArrowPosition === 'bottom-right' && (
						<>
							<ResponsiveRangeControl
								label={ __(
									'Bottom Offset',
									'gslider-blocks'
								) }
								rangeValue={
									navigationArrowPositionBottomOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionBottomOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={
									navigationArrowPositionBottomOffsetUnits
								}
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
							<ResponsiveRangeControl
								label={ __( 'Right Offset', 'gslider-blocks' ) }
								rangeValue={
									navigationArrowPositionRightOffset
								}
								onChangeValue={ ( value ) =>
									setAttributes( {
										navigationArrowPositionRightOffset:
											value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										navigationArrowPositionRightOffsetUnits:
											value,
									} )
								}
								deviceType={ deviceType }
								units={
									navigationArrowPositionRightOffsetUnits
								}
								resetFallbackValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1000, step: 1 },
								} }
							/>
						</>
					) }

					{ navigationArrowPosition !== 'center' && (
						<ResponsiveRangeControl
							label={ __( 'Gap', 'gslider-blocks' ) }
							rangeValue={ navigationArrowGap }
							onChangeValue={ ( value ) =>
								setAttributes( { navigationArrowGap: value } )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									navigationArrowGapUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ navigationArrowGapUnits }
							resetFallbackValue={ {
								px: '10',
								'%': '2',
								vh: '2',
								vw: '2',
								em: '0.75',
								rem: '0.75',
							} }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>
					) }

					{ navigationArrowPositionType === 'outside' && (
						<ResponsiveRangeControl
							label={ __( 'Padding', 'gslider-blocks' ) }
							rangeValue={ navigationArrowPositionOutsidePadding }
							onChangeValue={ ( value ) =>
								setAttributes( {
									navigationArrowPositionOutsidePadding:
										value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									navigationArrowPositionOutsidePaddingUnits:
										value,
								} )
							}
							deviceType={ deviceType }
							units={ navigationArrowPositionOutsidePaddingUnits }
							resetFallbackValue={ {
								px: deviceType === 'Mobile' ? '56' : '60',
								'%': deviceType === 'Mobile' ? '4.5' : '5',
								vh: deviceType === 'Mobile' ? '4.5' : '5',
								vw: deviceType === 'Mobile' ? '4.5' : '5',
								em: deviceType === 'Mobile' ? '3.5' : '3.75',
								rem: deviceType === 'Mobile' ? '3.5' : '3.75',
							} }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>
					) }
				</PanelBody>
			) }

			{ showPagination?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Pagination', 'gslider-blocks' ) }
					opened={ openPanels.general === 'pagination' }
					onToggle={ () => togglePanel( 'general', 'pagination' ) }
				>
					<SwitcherControl
						label={ __( 'Position', 'gslider-blocks' ) }
						options={ PAGINATION_POSITION_TYPE }
						value={ paginationPositionType }
						onChange={ ( value ) =>
							setAttributes( { paginationPositionType: value } )
						}
					/>

					<SelectControls
						label={ __( 'Type', 'gslider-blocks' ) }
						options={ PAGINATION_TYPE }
						value={ paginationType }
						onChange={ ( value ) =>
							setAttributes( { paginationType: value } )
						}
					/>

					{ paginationType === 'bullets' && (
						<ToggleControl
							label={ __( 'Dynamic Bullets', 'gslider-blocks' ) }
							checked={ dynamicBullets }
							onChange={ ( value ) =>
								setAttributes( { dynamicBullets: value } )
							}
						/>
					) }
				</PanelBody>
			) }
		</>
	);

	/**
	 * Inspector Style Controls
	 */
	const styleControls = (
		<>
			<PanelBody
				title={ __( 'Content', 'gslider-blocks' ) }
				opened={ openPanels.styles === 'content' }
				onToggle={ () => togglePanel( 'styles', 'content' ) }
			>
				<ResponsiveSpacingControl
					label={ __( 'Padding', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ contentPaddingUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { contentPaddingUnits: value } )
					}
					desktopSpacing={ contentPaddingDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { contentPaddingDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( {
							contentPaddingDesktopCssStyle: value,
						} )
					}
					tabletSpacing={ contentPaddingTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { contentPaddingTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { contentPaddingTabletCssStyle: value } )
					}
					mobileSpacing={ contentPaddingMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { contentPaddingMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { contentPaddingMobileCssStyle: value } )
					}
					isLinked={ contentPaddingLink }
					onChangeLink={ ( value ) =>
						setAttributes( { contentPaddingLink: value } )
					}
				/>
			</PanelBody>
			{ showAuthorImage && (
				<PanelBody
					title={ __( 'Author Image', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'authorImage' }
					onToggle={ () => togglePanel( 'styles', 'authorImage' ) }
				>
					<ResponsiveRangeControl
						label={ __( 'Size', 'gslider-blocks' ) }
						rangeValue={ authorImageSize }
						onChangeValue={ ( value ) =>
							setAttributes( { authorImageSize: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( { authorImageSizeUnits: value } )
						}
						deviceType={ deviceType }
						units={ authorImageSizeUnits }
						resetFallbackValue={ {
							px:
								{ Desktop: '80', Tablet: '64', Mobile: '56' }[
									deviceType
								] || '56',
							'%':
								{ Desktop: '5', Tablet: '4', Mobile: '3.5' }[
									deviceType
								] || '3.5',
							vh:
								{ Desktop: '5', Tablet: '4', Mobile: '3.5' }[
									deviceType
								] || '3.5',
							vw:
								{ Desktop: '5', Tablet: '4', Mobile: '3.5' }[
									deviceType
								] || '3.5',
							em:
								{ Desktop: '5', Tablet: '4', Mobile: '3.5' }[
									deviceType
								] || '3.5',
							rem:
								{ Desktop: '5', Tablet: '4', Mobile: '3.5' }[
									deviceType
								] || '3.5',
						} }
						unitBounds={ {
							px: { min: 0, max: 500, step: 1 },
						} }
					/>

					<SelectControls
						label={ __( 'Border Style', 'gslider-blocks' ) }
						options={ BORDER_STYLES }
						value={ authorImageBorder }
						onChange={ ( value ) =>
							setAttributes( { authorImageBorder: value } )
						}
					/>

					{ authorImageBorder !== 'none' && (
						<>
							<SwitcherControl
								label={ __( 'Border Color', 'gslider-blocks' ) }
								options={ NORMAL_HOVER }
								value={ authorImageBorderColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										authorImageBorderColorSwitcher: value,
									} )
								}
							/>

							{ authorImageBorderColorSwitcher === 'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ authorImageBorderColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											authorImageBorderColor: value,
										} )
									}
									defaultColor=""
								/>
							) }

							{ authorImageBorderColorSwitcher === 'hover' && (
								<ColorControl
									label={ __(
										'Hover Color',
										'gslider-blocks'
									) }
									color={ authorImageBorderHoverColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											authorImageBorderHoverColor: value,
										} )
									}
									defaultColor=""
								/>
							) }

							<ResponsiveSpacingControl
								label={ __( 'Border Width', 'gslider-blocks' ) }
								deviceType={ deviceType }
								onChangeDeviceType={ ( value ) =>
									setAttributes( { deviceType: value } )
								}
								units={ authorImageBorderWidthUnits }
								onChangeUnits={ ( value ) =>
									setAttributes( {
										authorImageBorderWidthUnits: value,
									} )
								}
								desktopSpacing={ authorImageDesktopBorderWidth }
								onChangeDesktopSpacing={ ( value ) =>
									setAttributes( {
										authorImageDesktopBorderWidth: value,
									} )
								}
								desktopSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageDesktopBorderWidthCssStyle:
											value,
									} )
								}
								tabletSpacing={ authorImageTabletBorderWidth }
								onChangeTabletSpacing={ ( value ) =>
									setAttributes( {
										authorImageTabletBorderWidth: value,
									} )
								}
								tabletSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageTabletBorderWidthCssStyle:
											value,
									} )
								}
								mobileSpacing={ authorImageMobileBorderWidth }
								onChangeMobileSpacing={ ( value ) =>
									setAttributes( {
										authorImageMobileBorderWidth: value,
									} )
								}
								mobileSpacingStyle={ ( value ) =>
									setAttributes( {
										authorImageMobileBorderWidthCssStyle:
											value,
									} )
								}
								isLinked={ authorImageBorderWidthLink }
								onChangeLink={ ( value ) =>
									setAttributes( {
										authorImageBorderWidthLink: value,
									} )
								}
							/>
						</>
					) }

					<ResponsiveSpacingControl
						label={ __( 'Border Radius', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ authorImageBorderRadiusUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								authorImageBorderRadiusUnits: value,
							} )
						}
						desktopSpacing={ authorImageDesktopBorderRadius }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								authorImageDesktopBorderRadius: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								authorImageDesktopBorderRadiusCssStyle: value,
							} )
						}
						tabletSpacing={ authorImageTabletBorderRadius }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								authorImageTabletBorderRadius: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								authorImageTabletBorderRadiusCssStyle: value,
							} )
						}
						mobileSpacing={ authorImageMobileBorderRadius }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								authorImageMobileBorderRadius: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								authorImageMobileBorderRadiusCssStyle: value,
							} )
						}
						isLinked={ authorImageBorderRadiusLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								authorImageBorderRadiusLink: value,
							} )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ authorImageMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { authorImageMarginUnits: value } )
						}
						desktopSpacing={ authorImageDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { authorImageDesktopMargin: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								authorImageDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ authorImageTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { authorImageTabletMargin: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								authorImageTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ authorImageMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { authorImageMobileMargin: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								authorImageMobileMarginCssStyle: value,
							} )
						}
						isLinked={ authorImageMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( { authorImageMarginLink: value } )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ authorImagePaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { authorImagePaddingUnits: value } )
						}
						desktopSpacing={ authorImageDesktopPadding }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								authorImageDesktopPadding: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								authorImageDesktopPaddingCssStyle: value,
							} )
						}
						tabletSpacing={ authorImageTabletPadding }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { authorImageTabletPadding: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								authorImageTabletPaddingCssStyle: value,
							} )
						}
						mobileSpacing={ authorImageMobilePadding }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { authorImageMobilePadding: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								authorImageMobilePaddingCssStyle: value,
							} )
						}
						isLinked={ authorImagePaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( { authorImagePaddingLink: value } )
						}
					/>
				</PanelBody>
			) }

			{ showAuthorName && (
				<PanelBody
					title={ __( 'Author Name', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'authorName' }
					onToggle={ () => togglePanel( 'styles', 'authorName' ) }
				>
					<ResponsiveTypographyControl
						fontFamily={ authorNameFontFamily }
						onChangeFontFamily={ ( value ) =>
							setAttributes( { authorNameFontFamily: value } )
						}
						fontSize={ authorNameFontSize }
						onChangeFontSize={ ( value ) =>
							setAttributes( { authorNameFontSize: value } )
						}
						fontSizeUnits={ authorNameFontSizeUnits }
						onChangeFontSizeUnit={ ( value ) =>
							setAttributes( { authorNameFontSizeUnits: value } )
						}
						fontWeight={ authorNameFontWeight }
						onChangeFontWeight={ ( value ) =>
							setAttributes( { authorNameFontWeight: value } )
						}
						fontStyle={ authorNameFontStyle }
						onChangeFontStyle={ ( value ) =>
							setAttributes( { authorNameFontStyle: value } )
						}
						textTransform={ authorNameTextTransform }
						onChangeTextTransform={ ( value ) =>
							setAttributes( { authorNameTextTransform: value } )
						}
						textDecoration={ authorNameTextDecoration }
						onChangeTextDecoration={ ( value ) =>
							setAttributes( { authorNameTextDecoration: value } )
						}
						lineHeight={ authorNameLineHeight }
						onChangeLineHeight={ ( value ) =>
							setAttributes( { authorNameLineHeight: value } )
						}
						lineHeightUnits={ authorNameLineHeightUnits }
						onChangeLineHeightUnit={ ( value ) =>
							setAttributes( {
								authorNameLineHeightUnits: value,
							} )
						}
						letterSpacing={ authorNameLetterSpacing }
						onChangeLetterSpacing={ ( value ) =>
							setAttributes( { authorNameLetterSpacing: value } )
						}
						letterSpacingUnits={ authorNameLetterSpacingUnits }
						onChangeLetterSpacingUnit={ ( value ) =>
							setAttributes( {
								authorNameLetterSpacingUnits: value,
							} )
						}
						wordSpacing={ authorNameWordSpacing }
						onChangeWordSpacing={ ( value ) =>
							setAttributes( { authorNameWordSpacing: value } )
						}
						wordSpacingUnits={ authorNameWordSpacingUnits }
						onChangeWordSpacingUnit={ ( value ) =>
							setAttributes( {
								authorNameWordSpacingUnits: value,
							} )
						}
						deviceType={ deviceType }
					/>
					<SwitcherControl
						label={ __( 'Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ authorNameColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( { authorNameColorSwitcher: value } )
						}
					/>

					{ authorNameColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ authorNameColor }
							onChangeColor={ ( value ) =>
								setAttributes( { authorNameColor: value } )
							}
							defaultColor=""
						/>
					) }

					{ authorNameColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ authorNameColorHover }
							onChangeColor={ ( value ) =>
								setAttributes( { authorNameColorHover: value } )
							}
							defaultColor=""
						/>
					) }
					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ authorNameMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { authorNameMarginUnits: value } )
						}
						desktopSpacing={ authorNameDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { authorNameDesktopMargin: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								authorNameDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ authorNameTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { authorNameTabletMargin: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								authorNameTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ authorNameMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { authorNameMobileMargin: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								authorNameMobileMarginCssStyle: value,
							} )
						}
						isLinked={ authorNameMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( { authorNameMarginLink: value } )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ authorNamePaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { authorNamePaddingUnits: value } )
						}
						desktopSpacing={ authorNameDesktopPadding }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { authorNameDesktopPadding: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								authorNameDesktopPaddingCssStyle: value,
							} )
						}
						tabletSpacing={ authorNameTabletPadding }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { authorNameTabletPadding: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								authorNameTabletPaddingCssStyle: value,
							} )
						}
						mobileSpacing={ authorNameMobilePadding }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { authorNameMobilePadding: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								authorNameMobilePaddingCssStyle: value,
							} )
						}
						isLinked={ authorNamePaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( { authorNamePaddingLink: value } )
						}
					/>
				</PanelBody>
			) }

			{ showAuthorDesignation && (
				<PanelBody
					title={ __( 'Author Designation', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'authorDesignation' }
					onToggle={ () =>
						togglePanel( 'styles', 'authorDesignation' )
					}
				>
					<ResponsiveTypographyControl
						fontFamily={ authorDesignationFontFamily }
						onChangeFontFamily={ ( value ) =>
							setAttributes( {
								authorDesignationFontFamily: value,
							} )
						}
						fontSize={ authorDesignationFontSize }
						onChangeFontSize={ ( value ) =>
							setAttributes( {
								authorDesignationFontSize: value,
							} )
						}
						fontSizeUnits={ authorDesignationFontSizeUnits }
						onChangeFontSizeUnit={ ( value ) =>
							setAttributes( {
								authorDesignationFontSizeUnits: value,
							} )
						}
						fontWeight={ authorDesignationFontWeight }
						onChangeFontWeight={ ( value ) =>
							setAttributes( {
								authorDesignationFontWeight: value,
							} )
						}
						fontStyle={ authorDesignationFontStyle }
						onChangeFontStyle={ ( value ) =>
							setAttributes( {
								authorDesignationFontStyle: value,
							} )
						}
						textTransform={ authorDesignationTextTransform }
						onChangeTextTransform={ ( value ) =>
							setAttributes( {
								authorDesignationTextTransform: value,
							} )
						}
						textDecoration={ authorDesignationTextDecoration }
						onChangeTextDecoration={ ( value ) =>
							setAttributes( {
								authorDesignationTextDecoration: value,
							} )
						}
						lineHeight={ authorDesignationLineHeight }
						onChangeLineHeight={ ( value ) =>
							setAttributes( {
								authorDesignationLineHeight: value,
							} )
						}
						lineHeightUnits={ authorDesignationLineHeightUnits }
						onChangeLineHeightUnit={ ( value ) =>
							setAttributes( {
								authorDesignationLineHeightUnits: value,
							} )
						}
						letterSpacing={ authorDesignationLetterSpacing }
						onChangeLetterSpacing={ ( value ) =>
							setAttributes( {
								authorDesignationLetterSpacing: value,
							} )
						}
						letterSpacingUnits={
							authorDesignationLetterSpacingUnits
						}
						onChangeLetterSpacingUnit={ ( value ) =>
							setAttributes( {
								authorDesignationLetterSpacingUnits: value,
							} )
						}
						wordSpacing={ authorDesignationWordSpacing }
						onChangeWordSpacing={ ( value ) =>
							setAttributes( {
								authorDesignationWordSpacing: value,
							} )
						}
						wordSpacingUnits={ authorDesignationWordSpacingUnits }
						onChangeWordSpacingUnit={ ( value ) =>
							setAttributes( {
								authorDesignationWordSpacingUnits: value,
							} )
						}
						deviceType={ deviceType }
					/>
					<SwitcherControl
						label={ __( 'Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ authorDesignationColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								authorDesignationColorSwitcher: value,
							} )
						}
					/>

					{ authorDesignationColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ authorDesignationColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									authorDesignationColor: value,
								} )
							}
							defaultColor=""
						/>
					) }

					{ authorDesignationColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ authorDesignationColorHover }
							onChangeColor={ ( value ) =>
								setAttributes( {
									authorDesignationColorHover: value,
								} )
							}
							defaultColor=""
						/>
					) }
					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ authorDesignationMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								authorDesignationMarginUnits: value,
							} )
						}
						desktopSpacing={ authorDesignationDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								authorDesignationDesktopMargin: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								authorDesignationDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ authorDesignationTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								authorDesignationTabletMargin: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								authorDesignationTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ authorDesignationMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								authorDesignationMobileMargin: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								authorDesignationMobileMarginCssStyle: value,
							} )
						}
						isLinked={ authorDesignationMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								authorDesignationMarginLink: value,
							} )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ authorDesignationPaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								authorDesignationPaddingUnits: value,
							} )
						}
						desktopSpacing={ authorDesignationDesktopPadding }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								authorDesignationDesktopPadding: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								authorDesignationDesktopPaddingCssStyle: value,
							} )
						}
						tabletSpacing={ authorDesignationTabletPadding }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								authorDesignationTabletPadding: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								authorDesignationTabletPaddingCssStyle: value,
							} )
						}
						mobileSpacing={ authorDesignationMobilePadding }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								authorDesignationMobilePadding: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								authorDesignationMobilePaddingCssStyle: value,
							} )
						}
						isLinked={ authorDesignationPaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								authorDesignationPaddingLink: value,
							} )
						}
					/>
				</PanelBody>
			) }

			{ showTestimonialTitle && (
				<PanelBody
					title={ __( 'Testimonial Title', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'testimonialTitle' }
					onToggle={ () =>
						togglePanel( 'styles', 'testimonialTitle' )
					}
				>
					<ResponsiveTypographyControl
						fontFamily={ testimonialTitleFontFamily }
						onChangeFontFamily={ ( value ) =>
							setAttributes( {
								testimonialTitleFontFamily: value,
							} )
						}
						fontSize={ testimonialTitleFontSize }
						onChangeFontSize={ ( value ) =>
							setAttributes( { testimonialTitleFontSize: value } )
						}
						fontSizeUnits={ testimonialTitleFontSizeUnits }
						onChangeFontSizeUnit={ ( value ) =>
							setAttributes( {
								testimonialTitleFontSizeUnits: value,
							} )
						}
						fontWeight={ testimonialTitleFontWeight }
						onChangeFontWeight={ ( value ) =>
							setAttributes( {
								testimonialTitleFontWeight: value,
							} )
						}
						fontStyle={ testimonialTitleFontStyle }
						onChangeFontStyle={ ( value ) =>
							setAttributes( {
								testimonialTitleFontStyle: value,
							} )
						}
						textTransform={ testimonialTitleTextTransform }
						onChangeTextTransform={ ( value ) =>
							setAttributes( {
								testimonialTitleTextTransform: value,
							} )
						}
						textDecoration={ testimonialTitleTextDecoration }
						onChangeTextDecoration={ ( value ) =>
							setAttributes( {
								testimonialTitleTextDecoration: value,
							} )
						}
						lineHeight={ testimonialTitleLineHeight }
						onChangeLineHeight={ ( value ) =>
							setAttributes( {
								testimonialTitleLineHeight: value,
							} )
						}
						lineHeightUnits={ testimonialTitleLineHeightUnits }
						onChangeLineHeightUnit={ ( value ) =>
							setAttributes( {
								testimonialTitleLineHeightUnits: value,
							} )
						}
						letterSpacing={ testimonialTitleLetterSpacing }
						onChangeLetterSpacing={ ( value ) =>
							setAttributes( {
								testimonialTitleLetterSpacing: value,
							} )
						}
						letterSpacingUnits={
							testimonialTitleLetterSpacingUnits
						}
						onChangeLetterSpacingUnit={ ( value ) =>
							setAttributes( {
								testimonialTitleLetterSpacingUnits: value,
							} )
						}
						wordSpacing={ testimonialTitleWordSpacing }
						onChangeWordSpacing={ ( value ) =>
							setAttributes( {
								testimonialTitleWordSpacing: value,
							} )
						}
						wordSpacingUnits={ testimonialTitleWordSpacingUnits }
						onChangeWordSpacingUnit={ ( value ) =>
							setAttributes( {
								testimonialTitleWordSpacingUnits: value,
							} )
						}
						deviceType={ deviceType }
					/>
					<SwitcherControl
						label={ __( 'Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ testimonialTitleColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								testimonialTitleColorSwitcher: value,
							} )
						}
					/>

					{ testimonialTitleColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ testimonialTitleColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									testimonialTitleColor: value,
								} )
							}
							defaultColor=""
						/>
					) }

					{ testimonialTitleColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ testimonialTitleColorHover }
							onChangeColor={ ( value ) =>
								setAttributes( {
									testimonialTitleColorHover: value,
								} )
							}
							defaultColor=""
						/>
					) }
					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ testimonialTitleMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								testimonialTitleMarginUnits: value,
							} )
						}
						desktopSpacing={ testimonialTitleDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								testimonialTitleDesktopMargin: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTitleDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ testimonialTitleTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								testimonialTitleTabletMargin: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTitleTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ testimonialTitleMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								testimonialTitleMobileMargin: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTitleMobileMarginCssStyle: value,
							} )
						}
						isLinked={ testimonialTitleMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								testimonialTitleMarginLink: value,
							} )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ testimonialTitlePaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								testimonialTitlePaddingUnits: value,
							} )
						}
						desktopSpacing={ testimonialTitleDesktopPadding }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								testimonialTitleDesktopPadding: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTitleDesktopPaddingCssStyle: value,
							} )
						}
						tabletSpacing={ testimonialTitleTabletPadding }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								testimonialTitleTabletPadding: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTitleTabletPaddingCssStyle: value,
							} )
						}
						mobileSpacing={ testimonialTitleMobilePadding }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								testimonialTitleMobilePadding: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTitleMobilePaddingCssStyle: value,
							} )
						}
						isLinked={ testimonialTitlePaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								testimonialTitlePaddingLink: value,
							} )
						}
					/>
				</PanelBody>
			) }

			{ showTestimonialText && (
				<PanelBody
					title={ __( 'Testimonial Text', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'testimonial-text' }
					onToggle={ () =>
						togglePanel( 'styles', 'testimonial-text' )
					}
				>
					<ResponsiveTypographyControl
						fontFamily={ testimonialTextFontFamily }
						onChangeFontFamily={ ( value ) =>
							setAttributes( {
								testimonialTextFontFamily: value,
							} )
						}
						fontSize={ testimonialTextFontSize }
						onChangeFontSize={ ( value ) =>
							setAttributes( { testimonialTextFontSize: value } )
						}
						fontSizeUnits={ testimonialTextFontSizeUnits }
						onChangeFontSizeUnit={ ( value ) =>
							setAttributes( {
								testimonialTextFontSizeUnits: value,
							} )
						}
						fontWeight={ testimonialTextFontWeight }
						onChangeFontWeight={ ( value ) =>
							setAttributes( {
								testimonialTextFontWeight: value,
							} )
						}
						fontStyle={ testimonialTextFontStyle }
						onChangeFontStyle={ ( value ) =>
							setAttributes( { testimonialTextFontStyle: value } )
						}
						textTransform={ testimonialTextTextTransform }
						onChangeTextTransform={ ( value ) =>
							setAttributes( {
								testimonialTextTextTransform: value,
							} )
						}
						textDecoration={ testimonialTextTextDecoration }
						onChangeTextDecoration={ ( value ) =>
							setAttributes( {
								testimonialTextTextDecoration: value,
							} )
						}
						lineHeight={ testimonialTextLineHeight }
						onChangeLineHeight={ ( value ) =>
							setAttributes( {
								testimonialTextLineHeight: value,
							} )
						}
						lineHeightUnits={ testimonialTextLineHeightUnits }
						onChangeLineHeightUnit={ ( value ) =>
							setAttributes( {
								testimonialTextLineHeightUnits: value,
							} )
						}
						letterSpacing={ testimonialTextLetterSpacing }
						onChangeLetterSpacing={ ( value ) =>
							setAttributes( {
								testimonialTextLetterSpacing: value,
							} )
						}
						letterSpacingUnits={ testimonialTextLetterSpacingUnits }
						onChangeLetterSpacingUnit={ ( value ) =>
							setAttributes( {
								testimonialTextLetterSpacingUnits: value,
							} )
						}
						wordSpacing={ testimonialTextWordSpacing }
						onChangeWordSpacing={ ( value ) =>
							setAttributes( {
								testimonialTextWordSpacing: value,
							} )
						}
						wordSpacingUnits={ testimonialTextWordSpacingUnits }
						onChangeWordSpacingUnit={ ( value ) =>
							setAttributes( {
								testimonialTextWordSpacingUnits: value,
							} )
						}
						deviceType={ deviceType }
					/>
					<SwitcherControl
						label={ __( 'Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ testimonialTextColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								testimonialTextColorSwitcher: value,
							} )
						}
					/>

					{ testimonialTextColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ testimonialTextColor }
							onChangeColor={ ( value ) =>
								setAttributes( { testimonialTextColor: value } )
							}
							defaultColor=""
						/>
					) }

					{ testimonialTextColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ testimonialTextColorHover }
							onChangeColor={ ( value ) =>
								setAttributes( {
									testimonialTextColorHover: value,
								} )
							}
							defaultColor=""
						/>
					) }
					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ testimonialTextMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								testimonialTextMarginUnits: value,
							} )
						}
						desktopSpacing={ testimonialTextDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								testimonialTextDesktopMargin: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTextDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ testimonialTextTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								testimonialTextTabletMargin: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTextTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ testimonialTextMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								testimonialTextMobileMargin: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTextMobileMarginCssStyle: value,
							} )
						}
						isLinked={ testimonialTextMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								testimonialTextMarginLink: value,
							} )
						}
					/>
					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ testimonialTextPaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								testimonialTextPaddingUnits: value,
							} )
						}
						desktopSpacing={ testimonialTextDesktopPadding }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								testimonialTextDesktopPadding: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTextDesktopPaddingCssStyle: value,
							} )
						}
						tabletSpacing={ testimonialTextTabletPadding }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								testimonialTextTabletPadding: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTextTabletPaddingCssStyle: value,
							} )
						}
						mobileSpacing={ testimonialTextMobilePadding }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								testimonialTextMobilePadding: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								testimonialTextMobilePaddingCssStyle: value,
							} )
						}
						isLinked={ testimonialTextPaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								testimonialTextPaddingLink: value,
							} )
						}
					/>
				</PanelBody>
			) }

			{ showRating && (
				<PanelBody
					title={ __( 'Rating', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'rating' }
					onToggle={ () => togglePanel( 'styles', 'rating' ) }
				>
					<SwitcherControl
						label={ __( 'Star Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ ratingStarColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( { ratingStarColorSwitcher: value } )
						}
					/>

					{ ratingStarColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ ratingStarColor }
							onChangeColor={ ( value ) =>
								setAttributes( { ratingStarColor: value } )
							}
							defaultColor="#ffb700"
						/>
					) }

					{ ratingStarColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ ratingStarHoverColor }
							onChangeColor={ ( value ) =>
								setAttributes( { ratingStarHoverColor: value } )
							}
							defaultColor="#ffb700"
						/>
					) }

					<SwitcherControl
						label={ __( 'Empty Star Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ ratingEmptyStarColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								ratingEmptyStarColorSwitcher: value,
							} )
						}
					/>

					{ ratingEmptyStarColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ ratingEmptyStarColor }
							onChangeColor={ ( value ) =>
								setAttributes( { ratingEmptyStarColor: value } )
							}
							defaultColor="#d4d4d4"
						/>
					) }

					{ ratingEmptyStarColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ ratingEmptyStarHoverColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									ratingEmptyStarHoverColor: value,
								} )
							}
							defaultColor="#d4d4d4"
						/>
					) }
					<ResponsiveRangeControl
						label={ __( 'Star Size', 'gslider-blocks' ) }
						rangeValue={ ratingStarSize }
						onChangeValue={ ( value ) =>
							setAttributes( { ratingStarSize: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( { ratingStarSizeUnits: value } )
						}
						deviceType={ deviceType }
						units={ ratingStarSizeUnits }
						resetFallbackValue={ {
							px: '20',
							'%': '5',
							vh: '5',
							vw: '5',
							em: '1.25',
							rem: '1.25',
						} }
						unitBounds={ {
							px: { min: 0, max: 200, step: 1 },
						} }
					/>
					<ResponsiveRangeControl
						label={ __( 'Star Gap', 'gslider-blocks' ) }
						rangeValue={ ratingStarGap }
						onChangeValue={ ( value ) =>
							setAttributes( { ratingStarGap: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( { ratingStarGapUnits: value } )
						}
						deviceType={ deviceType }
						units={ ratingStarGapUnits }
						resetFallbackValue={ {
							px: '5',
						} }
						unitBounds={ {
							px: { min: 0, max: 100, step: 1 },
						} }
					/>
					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ ratingMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { ratingMarginUnits: value } )
						}
						desktopSpacing={ ratingDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { ratingDesktopMargin: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								ratingDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ ratingTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { ratingTabletMargin: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								ratingTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ ratingMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { ratingMobileMargin: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								ratingMobileMarginCssStyle: value,
							} )
						}
						isLinked={ ratingMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( { ratingMarginLink: value } )
						}
					/>
					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ ratingPaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { ratingPaddingUnits: value } )
						}
						desktopSpacing={ ratingDesktopPadding }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { ratingDesktopPadding: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								ratingDesktopPaddingCssStyle: value,
							} )
						}
						tabletSpacing={ ratingTabletPadding }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { ratingTabletPadding: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								ratingTabletPaddingCssStyle: value,
							} )
						}
						mobileSpacing={ ratingMobilePadding }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { ratingMobilePadding: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								ratingMobilePaddingCssStyle: value,
							} )
						}
						isLinked={ ratingPaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( { ratingPaddingLink: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Show Rating Number', 'gslider-blocks' ) }
						checked={ showRatingNumber }
						onChange={ ( value ) =>
							setAttributes( { showRatingNumber: value } )
						}
					/>

					{ showRatingNumber && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Gap', 'gslider-blocks' ) }
								rangeValue={ ratingNumberGap }
								onChangeValue={ ( value ) =>
									setAttributes( { ratingNumberGap: value } )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										ratingNumberGapUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ ratingNumberGapUnits }
								resetFallbackValue={ {
									px: '10',
								} }
								unitBounds={ {
									px: { min: 0, max: 100, step: 1 },
								} }
							/>
							<ResponsiveTypographyControl
								label={ __( 'Typography', 'gslider-blocks' ) }
								fontFamily={ ratingNumberFontFamily }
								onChangeFontFamily={ ( value ) =>
									setAttributes( {
										ratingNumberFontFamily: value,
									} )
								}
								fontSize={ ratingNumberFontSize }
								onChangeFontSize={ ( value ) =>
									setAttributes( {
										ratingNumberFontSize: value,
									} )
								}
								fontSizeUnits={ ratingNumberFontSizeUnits }
								onChangeFontSizeUnit={ ( value ) =>
									setAttributes( {
										ratingNumberFontSizeUnits: value,
									} )
								}
								fontWeight={ ratingNumberFontWeight }
								onChangeFontWeight={ ( value ) =>
									setAttributes( {
										ratingNumberFontWeight: value,
									} )
								}
								fontStyle={ ratingNumberFontStyle }
								onChangeFontStyle={ ( value ) =>
									setAttributes( {
										ratingNumberFontStyle: value,
									} )
								}
								textTransform={ ratingNumberTextTransform }
								onChangeTextTransform={ ( value ) =>
									setAttributes( {
										ratingNumberTextTransform: value,
									} )
								}
								textDecoration={ ratingNumberTextDecoration }
								onChangeTextDecoration={ ( value ) =>
									setAttributes( {
										ratingNumberTextDecoration: value,
									} )
								}
								lineHeight={ ratingNumberLineHeight }
								onChangeLineHeight={ ( value ) =>
									setAttributes( {
										ratingNumberLineHeight: value,
									} )
								}
								lineHeightUnits={ ratingNumberLineHeightUnits }
								onChangeLineHeightUnit={ ( value ) =>
									setAttributes( {
										ratingNumberLineHeightUnits: value,
									} )
								}
								letterSpacing={ ratingNumberLetterSpacing }
								onChangeLetterSpacing={ ( value ) =>
									setAttributes( {
										ratingNumberLetterSpacing: value,
									} )
								}
								letterSpacingUnits={
									ratingNumberLetterSpacingUnits
								}
								onChangeLetterSpacingUnit={ ( value ) =>
									setAttributes( {
										ratingNumberLetterSpacingUnits: value,
									} )
								}
								wordSpacing={ ratingNumberWordSpacing }
								onChangeWordSpacing={ ( value ) =>
									setAttributes( {
										ratingNumberWordSpacing: value,
									} )
								}
								wordSpacingUnits={
									ratingNumberWordSpacingUnits
								}
								onChangeWordSpacingUnit={ ( value ) =>
									setAttributes( {
										ratingNumberWordSpacingUnits: value,
									} )
								}
								deviceType={ deviceType }
							/>
							<SwitcherControl
								label={ __( 'Color', 'gslider-blocks' ) }
								options={ NORMAL_HOVER }
								value={ ratingNumberColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										ratingNumberColorSwitcher: value,
									} )
								}
							/>

							{ ratingNumberColorSwitcher === 'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ ratingNumberColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											ratingNumberColor: value,
										} )
									}
									defaultColor=""
								/>
							) }

							{ ratingNumberColorSwitcher === 'hover' && (
								<ColorControl
									label={ __(
										'Hover Color',
										'gslider-blocks'
									) }
									color={ ratingNumberHoverColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											ratingNumberHoverColor: value,
										} )
									}
									defaultColor=""
								/>
							) }
						</>
					) }
				</PanelBody>
			) }

			{ showQuoteIcon && (
				<PanelBody
					title={ __( 'Quote Icon', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'quote-icon' }
					onToggle={ () => togglePanel( 'styles', 'quote-icon' ) }
				>
					<ResponsiveRangeControl
						label={ __( 'Icon Size', 'gslider-blocks' ) }
						rangeValue={ quoteIconSize }
						onChangeValue={ ( value ) =>
							setAttributes( { quoteIconSize: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( { quoteIconSizeUnits: value } )
						}
						deviceType={ deviceType }
						units={ quoteIconSizeUnits }
						resetFallbackValue={ {
							px: '60',
							'%': '5',
							vh: '',
							vw: '',
							em: '1',
							rem: '1',
						} }
						unitBounds={ {
							px: { min: 0, max: 200, step: 1 },
						} }
					/>

					{ quoteIconAlign === 'icon' && (
						<>
							<SwitcherControl
								label={ __( 'Icon Color', 'gslider-blocks' ) }
								options={ NORMAL_HOVER }
								value={ quoteIconColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										quoteIconColorSwitcher: value,
									} )
								}
							/>

							{ quoteIconColorSwitcher === 'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ quoteIconColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											quoteIconColor: value,
										} )
									}
									defaultColor=""
								/>
							) }

							{ quoteIconColorSwitcher === 'hover' && (
								<ColorControl
									label={ __(
										'Hover Color',
										'gslider-blocks'
									) }
									color={ quoteIconHoverColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											quoteIconHoverColor: value,
										} )
									}
								/>
							) }
						</>
					) }

					<BackgroundControl
						label={ __( 'Background Color', 'gslider-blocks' ) }
						normalBackgroundType={ quoteIconNormalBackgroundType }
						setNormalBackgroundType={ ( value ) =>
							setAttributes( {
								quoteIconNormalBackgroundType: value,
							} )
						}
						normalClassicColor={ quoteIconNormalClassicColor }
						setNormalClassicColor={ ( value ) =>
							setAttributes( {
								quoteIconNormalClassicColor: value,
							} )
						}
						normalGradientColor={ quoteIconNormalGradientColor }
						setNormalGradientColor={ ( value ) =>
							setAttributes( {
								quoteIconNormalGradientColor: value,
							} )
						}
						normalCustomGradientSwitcher={
							quoteIconNormalCustomGradientSwitcher
						}
						setNormalCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								quoteIconNormalCustomGradientSwitcher: value,
							} )
						}
						normalCustomGradientInputValue={
							quoteIconNormalCustomGradientInputValue
						}
						setNormalCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								quoteIconNormalCustomGradientInputValue: value,
							} )
						}
						hoverBackgroundType={ quoteIconHoverBackgroundType }
						setHoverBackgroundType={ ( value ) =>
							setAttributes( {
								quoteIconHoverBackgroundType: value,
							} )
						}
						hoverClassicColor={ quoteIconHoverClassicColor }
						setHoverClassicColor={ ( value ) =>
							setAttributes( {
								quoteIconHoverClassicColor: value,
							} )
						}
						hoverGradientColor={ quoteIconHoverGradientColor }
						setHoverGradientColor={ ( value ) =>
							setAttributes( {
								quoteIconHoverGradientColor: value,
							} )
						}
						hoverCustomGradientSwitcher={
							quoteIconHoverCustomGradientSwitcher
						}
						setHoverCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								quoteIconHoverCustomGradientSwitcher: value,
							} )
						}
						hoverCustomGradientInputValue={
							quoteIconHoverCustomGradientInputValue
						}
						setHoverCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								quoteIconHoverCustomGradientInputValue: value,
							} )
						}
						isBackgroundImage={ false }
					/>

					<SelectControls
						label={ __( 'Border Style', 'gslider-blocks' ) }
						options={ BORDER_STYLES }
						value={ quoteIconBorder }
						onChange={ ( value ) =>
							setAttributes( { quoteIconBorder: value } )
						}
					/>

					{ quoteIconBorder !== 'none' && (
						<>
							<SwitcherControl
								label={ __( 'Border Color', 'gslider-blocks' ) }
								options={ NORMAL_HOVER }
								value={ quoteIconBorderColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										quoteIconBorderColorSwitcher: value,
									} )
								}
							/>

							{ quoteIconBorderColorSwitcher === 'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ quoteIconBorderColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											quoteIconBorderColor: value,
										} )
									}
								/>
							) }

							{ quoteIconBorderColorSwitcher === 'hover' && (
								<ColorControl
									label={ __(
										'Hover Color',
										'gslider-blocks'
									) }
									color={ quoteIconBorderHoverColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											quoteIconBorderHoverColor: value,
										} )
									}
								/>
							) }

							<ResponsiveSpacingControl
								label={ __( 'Border Width', 'gslider-blocks' ) }
								deviceType={ deviceType }
								onChangeDeviceType={ ( value ) =>
									setAttributes( { deviceType: value } )
								}
								units={ quoteIconBorderUnits }
								onChangeUnits={ ( value ) =>
									setAttributes( {
										quoteIconBorderUnits: value,
									} )
								}
								desktopSpacing={ quoteIconDesktopBorder }
								onChangeDesktopSpacing={ ( value ) =>
									setAttributes( {
										quoteIconDesktopBorder: value,
									} )
								}
								desktopSpacingStyle={ ( value ) =>
									setAttributes( {
										quoteIconDesktopBorderCssStyle: value,
									} )
								}
								tabletSpacing={ quoteIconTabletBorder }
								onChangeTabletSpacing={ ( value ) =>
									setAttributes( {
										quoteIconTabletBorder: value,
									} )
								}
								tabletSpacingStyle={ ( value ) =>
									setAttributes( {
										quoteIconTabletBorderCssStyle: value,
									} )
								}
								mobileSpacing={ quoteIconMobileBorder }
								onChangeMobileSpacing={ ( value ) =>
									setAttributes( {
										quoteIconMobileBorder: value,
									} )
								}
								mobileSpacingStyle={ ( value ) =>
									setAttributes( {
										quoteIconMobileBorderCssStyle: value,
									} )
								}
								isLinked={ quoteIconBorderLink }
								onChangeLink={ ( value ) =>
									setAttributes( {
										quoteIconBorderLink: value,
									} )
								}
							/>
						</>
					) }

					<ResponsiveSpacingControl
						label={ __( 'Border Radius', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ quoteIconBorderRadiusUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								quoteIconBorderRadiusUnits: value,
							} )
						}
						desktopSpacing={ quoteIconDesktopBorderRadius }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								quoteIconDesktopBorderRadius: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								quoteIconDesktopBorderRadiusCssStyle: value,
							} )
						}
						tabletSpacing={ quoteIconTabletBorderRadius }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								quoteIconTabletBorderRadius: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								quoteIconTabletBorderRadiusCssStyle: value,
							} )
						}
						mobileSpacing={ quoteIconMobileBorderRadius }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								quoteIconMobileBorderRadius: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								quoteIconMobileBorderRadiusCssStyle: value,
							} )
						}
						isLinked={ quoteIconBorderRadiusLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								quoteIconBorderRadiusLink: value,
							} )
						}
					/>

					<SwitcherControl
						label={ __( 'Box Shadow', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ quoteIconBoxShadowValuesSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								quoteIconBoxShadowValuesSwitcher: value,
							} )
						}
					/>

					{ quoteIconBoxShadowValuesSwitcher === 'normal' && (
						<BoxShadowSettingsControl
							label={ __( 'Normal Shadow', 'gslider-blocks' ) }
							onBoxShadowChange={ ( value ) =>
								setAttributes( {
									quoteIconBoxShadowValues: value,
								} )
							}
							initialShadowValue={ quoteIconBoxShadowValues }
							onBoxShadowStyleChange={ ( value ) =>
								setAttributes( {
									quoteIconBoxShadowCssValue: value,
								} )
							}
						/>
					) }

					{ quoteIconBoxShadowValuesSwitcher === 'hover' && (
						<BoxShadowSettingsControl
							label={ __( 'Hover Shadow', 'gslider-blocks' ) }
							onBoxShadowChange={ ( value ) =>
								setAttributes( {
									quoteIconBoxShadowHoverValues: value,
								} )
							}
							initialShadowValue={ quoteIconBoxShadowHoverValues }
							onBoxShadowStyleChange={ ( value ) =>
								setAttributes( {
									quoteIconBoxShadowHoverCssValue: value,
								} )
							}
						/>
					) }

					<SwitcherControl
						label={ __( 'Visual Effects', 'gslider-blocks' ) }
						value={ quoteIconRotateSwitcher }
						onChange={ ( value ) =>
							setAttributes( { quoteIconRotateSwitcher: value } )
						}
						options={ [
							{
								label: __( 'Normal', 'gslider-blocks' ),
								value: 'normal',
							},
							{
								label: __( 'Hover', 'gslider-blocks' ),
								value: 'hover',
							},
						] }
					/>

					{ quoteIconRotateSwitcher === 'normal' ? (
						<>
							<ResponsiveRangeControl
								label={ __( 'Opacity', 'gslider-blocks' ) }
								rangeValue={ quoteIconOpacity }
								onChangeValue={ ( value ) =>
									setAttributes( { quoteIconOpacity: value } )
								}
								deviceType={ deviceType }
								resetValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 1, step: 0.1 },
								} }
							/>

							<ResponsiveRangeControl
								label={ __(
									'Rotation (deg)',
									'gslider-blocks'
								) }
								rangeValue={ quoteIconRotate }
								onChangeValue={ ( value ) =>
									setAttributes( { quoteIconRotate: value } )
								}
								deviceType={ deviceType }
								resetValue={ '' }
								unitBounds={ {
									px: { min: 0, max: 360, step: 1 },
								} }
							/>
						</>
					) : (
						<ResponsiveRangeControl
							label={ __(
								'Hover Rotation (deg)',
								'gslider-blocks'
							) }
							rangeValue={ quoteIconHoverRotate }
							onChangeValue={ ( value ) =>
								setAttributes( { quoteIconHoverRotate: value } )
							}
							deviceType={ deviceType }
							resetValue={ '' }
							unitBounds={ {
								px: { min: 0, max: 360, step: 1 },
							} }
						/>
					) }

					<ResponsiveRangeControl
						label={ __( 'Z-Index', 'gslider-blocks' ) }
						rangeValue={ quoteIconZIndex }
						onChangeValue={ ( value ) =>
							setAttributes( { quoteIconZIndex: value } )
						}
						deviceType={ deviceType }
						unitBounds={ {
							px: { min: 0, max: 1000, step: 1 },
						} }
					/>

					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ quoteIconMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { quoteIconMarginUnits: value } )
						}
						desktopSpacing={ quoteIconDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { quoteIconDesktopMargin: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								quoteIconDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ quoteIconTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { quoteIconTabletMargin: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								quoteIconTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ quoteIconMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { quoteIconMobileMargin: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								quoteIconMobileMarginCssStyle: value,
							} )
						}
						isLinked={ quoteIconMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( { quoteIconMarginLink: value } )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ quoteIconPaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { quoteIconPaddingUnits: value } )
						}
						desktopSpacing={ quoteIconDesktopPadding }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( { quoteIconDesktopPadding: value } )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								quoteIconDesktopPaddingCssStyle: value,
							} )
						}
						tabletSpacing={ quoteIconTabletPadding }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { quoteIconTabletPadding: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								quoteIconTabletPaddingCssStyle: value,
							} )
						}
						mobileSpacing={ quoteIconMobilePadding }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { quoteIconMobilePadding: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								quoteIconMobilePaddingCssStyle: value,
							} )
						}
						isLinked={ quoteIconPaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( { quoteIconPaddingLink: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Position', 'gslider-blocks' ) }
						checked={ quoteIconPositionSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								quoteIconPositionSwitcher: value,
							} )
						}
					/>

					{ quoteIconPositionSwitcher && (
						<>
							<ResponsiveRangeControl
								label={ __( 'Top', 'gslider-blocks' ) }
								rangeValue={ quoteIconPositionTop }
								onChangeValue={ ( value ) =>
									setAttributes( {
										quoteIconPositionTop: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										quoteIconPositionTopUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ quoteIconPositionTopUnits }
								resetFallbackValue={ {
									px: '0',
									'%': '0',
									vh: '',
									vw: '',
									em: '0',
									rem: '0',
								} }
								unitBounds={ {
									px: { min: -500, max: 1000, step: 1 },
									'%': { min: -100, max: 100, step: 1 },
								} }
							/>

							<ResponsiveRangeControl
								label={ __( 'Bottom', 'gslider-blocks' ) }
								rangeValue={ quoteIconPositionBottom }
								onChangeValue={ ( value ) =>
									setAttributes( {
										quoteIconPositionBottom: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										quoteIconPositionBottomUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ quoteIconPositionBottomUnits }
								resetFallbackValue={ {
									px: '0',
									'%': '0',
									vh: '',
									vw: '',
									em: '0',
									rem: '0',
								} }
								unitBounds={ {
									px: { min: -500, max: 1000, step: 1 },
									'%': { min: -100, max: 100, step: 1 },
								} }
							/>

							<ResponsiveRangeControl
								label={ __( 'Left', 'gslider-blocks' ) }
								rangeValue={ quoteIconPositionLeft }
								onChangeValue={ ( value ) =>
									setAttributes( {
										quoteIconPositionLeft: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										quoteIconPositionLeftUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ quoteIconPositionLeftUnits }
								resetFallbackValue={ {
									px: '0',
									'%': '0',
									vh: '',
									vw: '',
									em: '0',
									rem: '0',
								} }
								unitBounds={ {
									px: { min: -500, max: 1000, step: 1 },
									'%': { min: -100, max: 100, step: 1 },
								} }
							/>

							<ResponsiveRangeControl
								label={ __( 'Right', 'gslider-blocks' ) }
								rangeValue={ quoteIconPositionRight }
								onChangeValue={ ( value ) =>
									setAttributes( {
										quoteIconPositionRight: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										quoteIconPositionRightUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ quoteIconPositionRightUnits }
								resetFallbackValue={ {
									px: '0',
									'%': '0',
									vh: '',
									vw: '',
									em: '0',
									rem: '0',
								} }
								unitBounds={ {
									px: { min: -500, max: 1000, step: 1 },
									'%': { min: -100, max: 100, step: 1 },
								} }
							/>
						</>
					) }
				</PanelBody>
			) }

			{ showNavigation?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Navigation', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'navigation' }
					onToggle={ () => togglePanel( 'styles', 'navigation' ) }
				>
					<ResponsiveRangeControl
						label={ __( 'Icon Size', 'gslider-blocks' ) }
						rangeValue={ navigationArrowSize }
						onChangeValue={ ( value ) =>
							setAttributes( { navigationArrowSize: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( { navigationArrowSizeUnits: value } )
						}
						deviceType={ deviceType }
						units={ navigationArrowSizeUnits }
						resetFallbackValue={ {
							px: '16',
							'%': deviceType === 'Mobile' ? '4' : '5',
							vh: '',
							vw: '',
							em: '1',
							rem: '1',
						} }
						unitBounds={ {
							px: { min: 0, max: 200, step: 1 },
						} }
					/>

					<ResponsiveRangeControl
						label={ __( 'Width', 'gslider-blocks' ) }
						rangeValue={ navigationArrowWidth }
						onChangeValue={ ( value ) =>
							setAttributes( { navigationArrowWidth: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								navigationArrowWidthUnits: value,
							} )
						}
						deviceType={ deviceType }
						units={ navigationArrowWidthUnits }
						resetFallbackValue={ {
							px: deviceType === 'Mobile' ? '44' : '46',
							'%': deviceType === 'Mobile' ? '4' : '5',
							vh: '',
							vw: '',
							em: deviceType === 'Mobile' ? '2.75' : '2.875',
							rem: deviceType === 'Mobile' ? '2.75' : '2.875',
						} }
						unitBounds={ {
							px: { min: 0, max: 200, step: 1 },
						} }
					/>
					<ResponsiveRangeControl
						label={ __( 'Height', 'gslider-blocks' ) }
						rangeValue={ navigationArrowHeight }
						onChangeValue={ ( value ) =>
							setAttributes( { navigationArrowHeight: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								navigationArrowHeightUnits: value,
							} )
						}
						deviceType={ deviceType }
						units={ navigationArrowHeightUnits }
						resetFallbackValue={ {
							px: deviceType === 'Mobile' ? '44' : '46',
							'%': deviceType === 'Mobile' ? '4' : '5',
							vh: '',
							vw: '',
							em: deviceType === 'Mobile' ? '2.75' : '2.875',
							rem: deviceType === 'Mobile' ? '2.75' : '2.875',
						} }
						unitBounds={ {
							px: { min: 0, max: 200, step: 1 },
						} }
					/>

					<SwitcherControl
						label={ __( 'Icon Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ navigationArrowColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								navigationArrowColorSwitcher: value,
							} )
						}
					/>

					{ navigationArrowColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ navigationArrowColor }
							onChangeColor={ ( value ) =>
								setAttributes( { navigationArrowColor: value } )
							}
							defaultColor="#333333"
						/>
					) }

					{ navigationArrowColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ navigationArrowColorHover }
							onChangeColor={ ( value ) =>
								setAttributes( {
									navigationArrowColorHover: value,
								} )
							}
						/>
					) }

					<BackgroundControl
						label={ __( 'Background Color', 'gslider-blocks' ) }
						normalBackgroundType={
							navigationArrowNormalBackgroundType
						}
						setNormalBackgroundType={ ( value ) =>
							setAttributes( {
								navigationArrowNormalBackgroundType: value,
							} )
						}
						normalClassicColor={ navigationArrowNormalClassicColor }
						setNormalClassicColor={ ( value ) =>
							setAttributes( {
								navigationArrowNormalClassicColor: value,
							} )
						}
						normalGradientColor={
							navigationArrowNormalGradientColor
						}
						setNormalGradientColor={ ( value ) =>
							setAttributes( {
								navigationArrowNormalGradientColor: value,
							} )
						}
						normalCustomGradientSwitcher={
							navigationArrowNormalCustomGradientSwitcher
						}
						setNormalCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								navigationArrowNormalCustomGradientSwitcher:
									value,
							} )
						}
						normalCustomGradientInputValue={
							navigationArrowNormalCustomGradientInputValue
						}
						setNormalCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								navigationArrowNormalCustomGradientInputValue:
									value,
							} )
						}
						normalClassicDefaultColor={ '#d2d2d2c7' }
						hoverBackgroundType={
							navigationArrowHoverBackgroundType
						}
						setHoverBackgroundType={ ( value ) =>
							setAttributes( {
								navigationArrowHoverBackgroundType: value,
							} )
						}
						hoverClassicColor={ navigationArrowHoverClassicColor }
						setHoverClassicColor={ ( value ) =>
							setAttributes( {
								navigationArrowHoverClassicColor: value,
							} )
						}
						hoverGradientColor={ navigationArrowHoverGradientColor }
						setHoverGradientColor={ ( value ) =>
							setAttributes( {
								navigationArrowHoverGradientColor: value,
							} )
						}
						hoverCustomGradientSwitcher={
							navigationArrowHoverCustomGradientSwitcher
						}
						setHoverCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								navigationArrowHoverCustomGradientSwitcher:
									value,
							} )
						}
						hoverCustomGradientInputValue={
							navigationArrowHoverCustomGradientInputValue
						}
						setHoverCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								navigationArrowHoverCustomGradientInputValue:
									value,
							} )
						}
						hoverClassicDefaultColor={ '#787878b8' }
						isBackgroundImage={ false }
					/>

					<SelectControls
						label={ __( 'Border Style', 'gslider-blocks' ) }
						options={ BORDER_STYLES }
						value={ navigationArrowBorder }
						onChange={ ( value ) =>
							setAttributes( { navigationArrowBorder: value } )
						}
					/>

					<SwitcherControl
						label={ __( 'Border Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ navigationArrowBorderColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								navigationArrowBorderColorSwitcher: value,
							} )
						}
					/>

					{ navigationArrowBorderColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ navigationArrowBorderColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									navigationArrowBorderColor: value,
								} )
							}
						/>
					) }

					{ navigationArrowBorderColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ navigationArrowBorderHoverColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									navigationArrowBorderHoverColor: value,
								} )
							}
						/>
					) }

					<ResponsiveSpacingControl
						label={ __( 'Border Width', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ navigationArrowBorderUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								navigationArrowBorderUnits: value,
							} )
						}
						desktopSpacing={ navigationArrowDesktopBorder }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowDesktopBorder: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowDesktopBorderCssStyle: value,
							} )
						}
						tabletSpacing={ navigationArrowTabletBorder }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowTabletBorder: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowTabletBorderCssStyle: value,
							} )
						}
						mobileSpacing={ navigationArrowMobileBorder }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowMobileBorder: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowMobileBorderCssStyle: value,
							} )
						}
						isLinked={ navigationArrowBorderLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								navigationArrowBorderLink: value,
							} )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Border Radius', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ navigationArrowBorderRadiusUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								navigationArrowBorderRadiusUnits: value,
							} )
						}
						desktopSpacing={ navigationArrowDesktopBorderRadius }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowDesktopBorderRadius: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowDesktopBorderRadiusCssStyle:
									value,
							} )
						}
						tabletSpacing={ navigationArrowTabletBorderRadius }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowTabletBorderRadius: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowTabletBorderRadiusCssStyle:
									value,
							} )
						}
						mobileSpacing={ navigationArrowMobileBorderRadius }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								navigationArrowMobileBorderRadius: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								navigationArrowMobileBorderRadiusCssStyle:
									value,
							} )
						}
						isLinked={ navigationArrowBorderRadiusLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								navigationArrowBorderRadiusLink: value,
							} )
						}
					/>

					<SwitcherControl
						label={ __( 'Box Shadow', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ navigationArrowBoxShadowValuesSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								navigationArrowBoxShadowValuesSwitcher: value,
							} )
						}
					/>

					{ navigationArrowBoxShadowValuesSwitcher === 'normal' && (
						<BoxShadowSettingsControl
							label={ __( 'Normal Shadow', 'gslider-blocks' ) }
							onBoxShadowChange={ ( value ) =>
								setAttributes( {
									navigationArrowBoxShadowValues: value,
								} )
							}
							initialShadowValue={
								navigationArrowBoxShadowValues
							}
							onBoxShadowStyleChange={ ( value ) =>
								setAttributes( {
									navigationArrowBoxShadowCssValue: value,
								} )
							}
						/>
					) }

					{ navigationArrowBoxShadowValuesSwitcher === 'hover' && (
						<BoxShadowSettingsControl
							label={ __( 'Hover Shadow', 'gslider-blocks' ) }
							onBoxShadowChange={ ( value ) =>
								setAttributes( {
									navigationArrowBoxShadowHoverValues: value,
								} )
							}
							initialShadowValue={
								navigationArrowBoxShadowHoverValues
							}
							onBoxShadowStyleChange={ ( value ) =>
								setAttributes( {
									navigationArrowBoxShadowHoverCssValue:
										value,
								} )
							}
						/>
					) }
				</PanelBody>
			) }

			{ showPagination?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Pagination', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'pagination' }
					onToggle={ () => togglePanel( 'styles', 'pagination' ) }
				>
					{ ( paginationType === 'bullets' ||
						paginationType === 'fraction' ) && (
						<ResponsiveRangeControl
							label={ __( 'Position', 'gslider-blocks' ) }
							rangeValue={ paginationDotsPosition }
							onChangeValue={ ( value ) =>
								setAttributes( {
									paginationDotsPosition: value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									paginationDotsPositionUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ paginationDotsPositionUnits }
							resetFallbackValue={ '' }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>
					) }

					{ paginationType === 'progressbar' && (
						<ResponsiveRangeControl
							label={ __( 'Position', 'gslider-blocks' ) }
							rangeValue={ paginationProgressbarPosition }
							onChangeValue={ ( value ) =>
								setAttributes( {
									paginationProgressbarPosition: value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									paginationProgressbarPositionUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ paginationProgressbarPositionUnits }
							resetFallbackValue={ '' }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>
					) }

					{ paginationPositionType === 'outside' && (
						<ResponsiveRangeControl
							label={ __( 'Outside Offset', 'gslider-blocks' ) }
							rangeValue={ paginationOutsideOffset }
							onChangeValue={ ( value ) =>
								setAttributes( {
									paginationOutsideOffset: value,
								} )
							}
							onUnitChange={ ( value ) =>
								setAttributes( {
									paginationOutsideOffsetUnits: value,
								} )
							}
							deviceType={ deviceType }
							units={ paginationOutsideOffsetUnits }
							resetFallbackValue={ {
								px: '30',
							} }
							unitBounds={ {
								px: { min: 0, max: 200, step: 1 },
							} }
						/>
					) }

					<ResponsiveSpacingControl
						label={ __( 'Margin', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ paginationDotsMarginUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								paginationDotsMarginUnits: value,
							} )
						}
						desktopSpacing={ paginationDotsDesktopMargin }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								paginationDotsDesktopMargin: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								paginationDotsDesktopMarginCssStyle: value,
							} )
						}
						tabletSpacing={ paginationDotsTabletMargin }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								paginationDotsTabletMargin: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								paginationDotsTabletMarginCssStyle: value,
							} )
						}
						mobileSpacing={ paginationDotsMobileMargin }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								paginationDotsMobileMargin: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								paginationDotsMobileMarginCssStyle: value,
							} )
						}
						isLinked={ paginationDotsMarginLink }
						onChangeLink={ ( value ) =>
							setAttributes( { paginationDotsMarginLink: value } )
						}
					/>

					{ paginationType === 'bullets' && (
						<>
							<SwitcherControl
								label={ __(
									'Bullets Style',
									'gslider-blocks'
								) }
								options={ NORMAL_ACTIVE }
								value={ paginationDotsSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										paginationDotsSwitcher: value,
									} )
								}
							/>
							{ paginationDotsSwitcher === 'normal' && (
								<>
									<ResponsiveRangeControl
										label={ __(
											'Width',
											'gslider-blocks'
										) }
										rangeValue={ paginationNormalDotsWidth }
										onChangeValue={ ( value ) =>
											setAttributes( {
												paginationNormalDotsWidth:
													value,
											} )
										}
										onUnitChange={ ( value ) =>
											setAttributes( {
												paginationNormalDotsWidthUnits:
													value,
											} )
										}
										deviceType={ deviceType }
										units={ paginationNormalDotsWidthUnits }
										resetFallbackValue={ {
											px: '8',
											'%': '',
											vh: '',
											vw: '',
											em: '0.5',
											rem: '0.5',
										} }
										unitBounds={ {
											px: { min: 0, max: 200, step: 1 },
										} }
									/>

									<ResponsiveRangeControl
										label={ __(
											'Height',
											'gslider-blocks'
										) }
										rangeValue={
											paginationNormalDotsHeight
										}
										onChangeValue={ ( value ) =>
											setAttributes( {
												paginationNormalDotsHeight:
													value,
											} )
										}
										onUnitChange={ ( value ) =>
											setAttributes( {
												paginationNormalDotsHeightUnits:
													value,
											} )
										}
										deviceType={ deviceType }
										units={
											paginationNormalDotsHeightUnits
										}
										resetFallbackValue={ {
											px: '8',
											'%': '',
											vh: '',
											vw: '',
											em: '0.5',
											rem: '0.5',
										} }
										unitBounds={ {
											px: { min: 0, max: 200, step: 1 },
										} }
									/>

									<ColorControl
										label={ __(
											'Color',
											'gslider-blocks'
										) }
										color={ paginationNormalDotsBgColor }
										onChangeColor={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBgColor:
													value,
											} )
										}
										defaultColor="#333333"
									/>

									<SelectControls
										label={ __(
											'Border Style',
											'gslider-blocks'
										) }
										options={ BORDER_STYLES }
										value={ paginationNormalDotsBorder }
										onChange={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorder:
													value,
											} )
										}
									/>

									<SwitcherControl
										label={ __(
											'Border Color',
											'gslider-blocks'
										) }
										options={ NORMAL_HOVER }
										value={
											paginationNormalDotsBorderColorSwitcher
										}
										onChange={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorderColorSwitcher:
													value,
											} )
										}
									/>

									{ paginationNormalDotsBorderColorSwitcher ===
										'normal' && (
										<ColorControl
											label={ __(
												'Normal Color',
												'gslider-blocks'
											) }
											color={
												paginationNormalDotsBorderColor
											}
											onChangeColor={ ( value ) =>
												setAttributes( {
													paginationNormalDotsBorderColor:
														value,
												} )
											}
										/>
									) }

									{ paginationNormalDotsBorderColorSwitcher ===
										'hover' && (
										<ColorControl
											label={ __(
												'Hover Color',
												'gslider-blocks'
											) }
											color={
												paginationNormalDotsBorderHoverColor
											}
											onChangeColor={ ( value ) =>
												setAttributes( {
													paginationNormalDotsBorderHoverColor:
														value,
												} )
											}
										/>
									) }

									<ResponsiveSpacingControl
										label={ __(
											'Border Width',
											'gslider-blocks'
										) }
										deviceType={ deviceType }
										onChangeDeviceType={ ( value ) =>
											setAttributes( {
												deviceType: value,
											} )
										}
										units={
											paginationNormalDotsBorderUnits
										}
										onChangeUnits={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorderUnits:
													value,
											} )
										}
										desktopSpacing={
											paginationNormalDotsDesktopBorder
										}
										onChangeDesktopSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsDesktopBorder:
													value,
											} )
										}
										desktopSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsDesktopBorderCssStyle:
													value,
											} )
										}
										tabletSpacing={
											paginationNormalDotsTabletBorder
										}
										onChangeTabletSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsTabletBorder:
													value,
											} )
										}
										tabletSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsTabletBorderCssStyle:
													value,
											} )
										}
										mobileSpacing={
											paginationNormalDotsMobileBorder
										}
										onChangeMobileSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsMobileBorder:
													value,
											} )
										}
										mobileSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsMobileBorderCssStyle:
													value,
											} )
										}
										isLinked={
											paginationNormalDotsBorderLink
										}
										onChangeLink={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorderLink:
													value,
											} )
										}
									/>

									<ResponsiveSpacingControl
										label={ __(
											'Border Radius',
											'gslider-blocks'
										) }
										deviceType={ deviceType }
										onChangeDeviceType={ ( value ) =>
											setAttributes( {
												deviceType: value,
											} )
										}
										units={
											paginationNormalDotsBorderRadiusUnits
										}
										onChangeUnits={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorderRadiusUnits:
													value,
											} )
										}
										desktopSpacing={
											paginationNormalDotsDesktopBorderRadius
										}
										onChangeDesktopSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsDesktopBorderRadius:
													value,
											} )
										}
										desktopSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsDesktopBorderRadiusCssStyle:
													value,
											} )
										}
										tabletSpacing={
											paginationNormalDotsTabletBorderRadius
										}
										onChangeTabletSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsTabletBorderRadius:
													value,
											} )
										}
										tabletSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsTabletBorderRadiusCssStyle:
													value,
											} )
										}
										mobileSpacing={
											paginationNormalDotsMobileBorderRadius
										}
										onChangeMobileSpacing={ ( value ) =>
											setAttributes( {
												paginationNormalDotsMobileBorderRadius:
													value,
											} )
										}
										mobileSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationNormalDotsMobileBorderRadiusCssStyle:
													value,
											} )
										}
										isLinked={
											paginationNormalDotsBorderRadiusLink
										}
										onChangeLink={ ( value ) =>
											setAttributes( {
												paginationNormalDotsBorderRadiusLink:
													value,
											} )
										}
									/>
								</>
							) }

							{ paginationDotsSwitcher === 'active' && (
								<>
									<ResponsiveRangeControl
										label={ __(
											'Width',
											'gslider-blocks'
										) }
										rangeValue={ paginationActiveDotsWidth }
										onChangeValue={ ( value ) =>
											setAttributes( {
												paginationActiveDotsWidth:
													value,
											} )
										}
										onUnitChange={ ( value ) =>
											setAttributes( {
												paginationActiveDotsWidthUnits:
													value,
											} )
										}
										deviceType={ deviceType }
										units={ paginationActiveDotsWidthUnits }
										resetFallbackValue={ {
											px: '8',
											'%': '',
											vh: '',
											vw: '',
											em: '0.5',
											rem: '0.5',
										} }
										unitBounds={ {
											px: { min: 0, max: 200, step: 1 },
										} }
									/>

									<ResponsiveRangeControl
										label={ __(
											'Height',
											'gslider-blocks'
										) }
										rangeValue={
											paginationActiveDotsHeight
										}
										onChangeValue={ ( value ) =>
											setAttributes( {
												paginationActiveDotsHeight:
													value,
											} )
										}
										onUnitChange={ ( value ) =>
											setAttributes( {
												paginationActiveDotsHeightUnits:
													value,
											} )
										}
										deviceType={ deviceType }
										units={
											paginationActiveDotsHeightUnits
										}
										resetFallbackValue={ {
											px: '8',
											'%': '',
											vh: '',
											vw: '',
											em: '0.5',
											rem: '0.5',
										} }
										unitBounds={ {
											px: { min: 0, max: 200, step: 1 },
										} }
									/>

									<ColorControl
										label={ __(
											'Color',
											'gslider-blocks'
										) }
										color={ paginationActiveDotsBgColor }
										onChangeColor={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBgColor:
													value,
											} )
										}
									/>

									<SelectControls
										label={ __(
											'Border Style',
											'gslider-blocks'
										) }
										options={ BORDER_STYLES }
										value={ paginationActiveDotsBorder }
										onChange={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorder:
													value,
											} )
										}
									/>

									<SwitcherControl
										label={ __(
											'Border Color',
											'gslider-blocks'
										) }
										options={ NORMAL_HOVER }
										value={
											paginationActiveDotsBorderColorSwitcher
										}
										onChange={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorderColorSwitcher:
													value,
											} )
										}
									/>

									{ paginationActiveDotsBorderColorSwitcher ===
										'normal' && (
										<ColorControl
											label={ __(
												'Normal Color',
												'gslider-blocks'
											) }
											color={
												paginationActiveDotsBorderColor
											}
											onChangeColor={ ( value ) =>
												setAttributes( {
													paginationActiveDotsBorderColor:
														value,
												} )
											}
										/>
									) }

									{ paginationActiveDotsBorderColorSwitcher ===
										'hover' && (
										<ColorControl
											label={ __(
												'Hover Color',
												'gslider-blocks'
											) }
											color={
												paginationActiveDotsBorderHoverColor
											}
											onChangeColor={ ( value ) =>
												setAttributes( {
													paginationActiveDotsBorderHoverColor:
														value,
												} )
											}
										/>
									) }

									<ResponsiveSpacingControl
										label={ __(
											'Border Width',
											'gslider-blocks'
										) }
										deviceType={ deviceType }
										onChangeDeviceType={ ( value ) =>
											setAttributes( {
												deviceType: value,
											} )
										}
										units={
											paginationActiveDotsBorderUnits
										}
										onChangeUnits={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorderUnits:
													value,
											} )
										}
										desktopSpacing={
											paginationActiveDotsDesktopBorder
										}
										onChangeDesktopSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsDesktopBorder:
													value,
											} )
										}
										desktopSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsDesktopBorderCssStyle:
													value,
											} )
										}
										tabletSpacing={
											paginationActiveDotsTabletBorder
										}
										onChangeTabletSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsTabletBorder:
													value,
											} )
										}
										tabletSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsTabletBorderCssStyle:
													value,
											} )
										}
										mobileSpacing={
											paginationActiveDotsMobileBorder
										}
										onChangeMobileSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsMobileBorder:
													value,
											} )
										}
										mobileSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsMobileBorderCssStyle:
													value,
											} )
										}
										isLinked={
											paginationActiveDotsBorderLink
										}
										onChangeLink={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorderLink:
													value,
											} )
										}
									/>

									<ResponsiveSpacingControl
										label={ __(
											'Border Radius',
											'gslider-blocks'
										) }
										deviceType={ deviceType }
										onChangeDeviceType={ ( value ) =>
											setAttributes( {
												deviceType: value,
											} )
										}
										units={
											paginationActiveDotsBorderRadiusUnits
										}
										onChangeUnits={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorderRadiusUnits:
													value,
											} )
										}
										desktopSpacing={
											paginationActiveDotsDesktopBorderRadius
										}
										onChangeDesktopSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsDesktopBorderRadius:
													value,
											} )
										}
										desktopSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsDesktopBorderRadiusCssStyle:
													value,
											} )
										}
										tabletSpacing={
											paginationActiveDotsTabletBorderRadius
										}
										onChangeTabletSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsTabletBorderRadius:
													value,
											} )
										}
										tabletSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsTabletBorderRadiusCssStyle:
													value,
											} )
										}
										mobileSpacing={
											paginationActiveDotsMobileBorderRadius
										}
										onChangeMobileSpacing={ ( value ) =>
											setAttributes( {
												paginationActiveDotsMobileBorderRadius:
													value,
											} )
										}
										mobileSpacingStyle={ ( value ) =>
											setAttributes( {
												paginationActiveDotsMobileBorderRadiusCssStyle:
													value,
											} )
										}
										isLinked={
											paginationActiveDotsBorderRadiusLink
										}
										onChangeLink={ ( value ) =>
											setAttributes( {
												paginationActiveDotsBorderRadiusLink:
													value,
											} )
										}
									/>
								</>
							) }
						</>
					) }

					{ paginationType === 'fraction' && (
						<>
							<ResponsiveTypographyControl
								fontFamily={ paginationFractionFontFamily }
								onChangeFontFamily={ ( value ) =>
									setAttributes( {
										paginationFractionFontFamily: value,
									} )
								}
								fontSize={ paginationFractionFontSize }
								onChangeFontSize={ ( value ) =>
									setAttributes( {
										paginationFractionFontSize: value,
									} )
								}
								fontSizeUnits={
									paginationFractionFontSizeUnits
								}
								onChangeFontSizeUnit={ ( value ) =>
									setAttributes( {
										paginationFractionFontSizeUnits: value,
									} )
								}
								fontWeight={ paginationFractionFontWeight }
								onChangeFontWeight={ ( value ) =>
									setAttributes( {
										paginationFractionFontWeight: value,
									} )
								}
								fontStyle={ paginationFractionFontStyle }
								onChangeFontStyle={ ( value ) =>
									setAttributes( {
										paginationFractionFontStyle: value,
									} )
								}
								textTransform={
									paginationFractionTextTransform
								}
								onChangeTextTransform={ ( value ) =>
									setAttributes( {
										paginationFractionTextTransform: value,
									} )
								}
								textDecoration={
									paginationFractionTextDecoration
								}
								onChangeTextDecoration={ ( value ) =>
									setAttributes( {
										paginationFractionTextDecoration: value,
									} )
								}
								lineHeight={ paginationFractionLineHeight }
								onChangeLineHeight={ ( value ) =>
									setAttributes( {
										paginationFractionLineHeight: value,
									} )
								}
								lineHeightUnits={
									paginationFractionLineHeightUnits
								}
								onChangeLineHeightUnit={ ( value ) =>
									setAttributes( {
										paginationFractionLineHeightUnits:
											value,
									} )
								}
								letterSpacing={
									paginationFractionLetterSpacing
								}
								onChangeLetterSpacing={ ( value ) =>
									setAttributes( {
										paginationFractionLetterSpacing: value,
									} )
								}
								letterSpacingUnits={
									paginationFractionLetterSpacingUnits
								}
								onChangeLetterSpacingUnit={ ( value ) =>
									setAttributes( {
										paginationFractionLetterSpacingUnits:
											value,
									} )
								}
								wordSpacing={ paginationFractionWordSpacing }
								onChangeWordSpacing={ ( value ) =>
									setAttributes( {
										paginationFractionWordSpacing: value,
									} )
								}
								wordSpacingUnits={
									paginationFractionWordSpacingUnits
								}
								onChangeWordSpacingUnit={ ( value ) =>
									setAttributes( {
										paginationFractionWordSpacingUnits:
											value,
									} )
								}
								deviceType={ deviceType }
							/>

							<SwitcherControl
								label={ __( 'Color', 'gslider-blocks' ) }
								options={ NORMAL_HOVER }
								value={ paginationFractionColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										paginationFractionColorSwitcher: value,
									} )
								}
							/>

							{ paginationFractionColorSwitcher === 'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ paginationFractionColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											paginationFractionColor: value,
										} )
									}
									defaultColor=""
								/>
							) }

							{ paginationFractionColorSwitcher === 'hover' && (
								<ColorControl
									label={ __(
										'Hover Color',
										'gslider-blocks'
									) }
									color={ paginationFractionColorHover }
									onChangeColor={ ( value ) =>
										setAttributes( {
											paginationFractionColorHover: value,
										} )
									}
									defaultColor=""
								/>
							) }
						</>
					) }

					{ paginationType === 'progressbar' && (
						<>
							<SwitcherControl
								label={ __(
									'Background Color',
									'gslider-blocks'
								) }
								options={ NORMAL_ACTIVE }
								value={ paginationProgressbarBGColorSwitcher }
								onChange={ ( value ) =>
									setAttributes( {
										paginationProgressbarBGColorSwitcher:
											value,
									} )
								}
							/>

							{ paginationProgressbarBGColorSwitcher ===
								'normal' && (
								<ColorControl
									label={ __(
										'Normal Color',
										'gslider-blocks'
									) }
									color={ paginationProgressbarBGColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											paginationProgressbarBGColor: value,
										} )
									}
									defaultColor=""
								/>
							) }

							{ paginationProgressbarBGColorSwitcher ===
								'active' && (
								<ColorControl
									label={ __(
										'Active Color',
										'gslider-blocks'
									) }
									color={ paginationProgressbarBGActiveColor }
									onChangeColor={ ( value ) =>
										setAttributes( {
											paginationProgressbarBGActiveColor:
												value,
										} )
									}
									defaultColor=""
								/>
							) }

							<ResponsiveRangeControl
								label={ __( 'Height', 'gslider-blocks' ) }
								rangeValue={ paginationProgressbarHeight }
								onChangeValue={ ( value ) =>
									setAttributes( {
										paginationProgressbarHeight: value,
									} )
								}
								onUnitChange={ ( value ) =>
									setAttributes( {
										paginationProgressbarHeightUnits: value,
									} )
								}
								deviceType={ deviceType }
								units={ paginationProgressbarHeightUnits }
								resetFallbackValue={ {
									px: '4',
									'%': '',
									vh: '',
									vw: '',
									em: '0.25',
									rem: '0.25',
								} }
								unitBounds={ {
									px: { min: 0, max: 200, step: 1 },
								} }
							/>
						</>
					) }
				</PanelBody>
			) }
		</>
	);

	/**
	 * Inspector Advanced Controls
	 */
	const advancedControls = (
		<>
			<PanelBody
				title={ __( 'Layout', 'gslider-blocks' ) }
				opened={ openPanels.advanced === 'layout' }
				onToggle={ () => togglePanel( 'advanced', 'layout' ) }
			>
				<ResponsiveSpacingControl
					label={ __( 'Margin', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ globalMarginUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { globalMarginUnits: value } )
					}
					desktopSpacing={ globalMarginDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { globalMarginDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( { globalMarginDesktopCssStyle: value } )
					}
					tabletSpacing={ globalMarginTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { globalMarginTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { globalMarginTabletCssStyle: value } )
					}
					mobileSpacing={ globalMarginMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { globalMarginMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { globalMarginMobileCssStyle: value } )
					}
					isLinked={ globalMarginLink }
					onChangeLink={ ( value ) =>
						setAttributes( { globalMarginLink: value } )
					}
				/>

				<ResponsiveSpacingControl
					label={ __( 'Padding', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ globalPaddingUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { globalPaddingUnits: value } )
					}
					desktopSpacing={ globalPaddingDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { globalPaddingDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( { globalPaddingDesktopCssStyle: value } )
					}
					tabletSpacing={ globalPaddingTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { globalPaddingTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { globalPaddingTabletCssStyle: value } )
					}
					mobileSpacing={ globalPaddingMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { globalPaddingMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { globalPaddingMobileCssStyle: value } )
					}
					isLinked={ globalPaddingLink }
					onChangeLink={ ( value ) =>
						setAttributes( { globalPaddingLink: value } )
					}
				/>

				<ResponsiveRangeControl
					min={ -999 }
					max={ 9999 }
					label={ __( 'Z Index', 'gslider-blocks' ) }
					rangeValue={ globalZIndex }
					onChangeValue={ ( value ) =>
						setAttributes( { globalZIndex: value } )
					}
					deviceType={ deviceType }
					step={ 1 }
					resetFallbackValue={ '' }
					isRangeUnit={ false }
				/>

				<InputControls
					label={ __( 'CSS ID', 'gslider-blocks' ) }
					value={ globalID }
					onChangeValue={ ( value ) =>
						setAttributes( { globalID: value } )
					}
					helpText={ __(
						'Add an ID to the block wrapper.',
						'gslider-blocks'
					) }
				/>

				<InputControls
					label={ __( 'CSS Classes', 'gslider-blocks' ) }
					value={ globalClass }
					onChangeValue={ ( value ) =>
						setAttributes( { globalClass: value } )
					}
					helpText={ __(
						'Separate with spaces key.',
						'gslider-blocks'
					) }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Background', 'gslider-blocks' ) }
				opened={ openPanels.advanced === 'background' }
				onToggle={ () => togglePanel( 'advanced', 'background' ) }
			>
				<BackgroundControl
					label={ __( 'Background', 'gslider-blocks' ) }
					deviceType={ deviceType }
					normalBackgroundType={ globalNormalBackgroundType }
					setNormalBackgroundType={ ( value ) =>
						setAttributes( { globalNormalBackgroundType: value } )
					}
					normalClassicColor={ globalNormalClassicColor }
					setNormalClassicColor={ ( value ) =>
						setAttributes( { globalNormalClassicColor: value } )
					}
					normalGradientColor={ globalNormalGradientColor }
					setNormalGradientColor={ ( value ) =>
						setAttributes( { globalNormalGradientColor: value } )
					}
					normalCustomGradientSwitcher={
						globalNormalCustomGradientSwitcher
					}
					setNormalCustomGradientSwitcher={ ( value ) =>
						setAttributes( {
							globalNormalCustomGradientSwitcher: value,
						} )
					}
					normalCustomGradientInputValue={
						globalNormalCustomGradientInputValue
					}
					setNormalCustomGradientInputValue={ ( value ) =>
						setAttributes( {
							globalNormalCustomGradientInputValue: value,
						} )
					}
					normalBackgroundImageUrl={ globalNormalBackgroundImageUrl }
					setNormalBackgroundImageUrl={ ( value ) =>
						setAttributes( {
							globalNormalBackgroundImageUrl: value,
						} )
					}
					normalBackgroundImagePosition={
						globalNormalBackgroundImagePosition
					}
					setNormalBackgroundImagePosition={ ( value ) =>
						setAttributes( {
							globalNormalBackgroundImagePosition: value,
						} )
					}
					normalBackgroundImageAttachment={
						globalNormalBackgroundImageAttachment
					}
					setNormalBackgroundImageAttachment={ ( value ) =>
						setAttributes( {
							globalNormalBackgroundImageAttachment: value,
						} )
					}
					normalBackgroundImageRepeat={
						globalNormalBackgroundImageRepeat
					}
					setNormalBackgroundImageRepeat={ ( value ) =>
						setAttributes( {
							globalNormalBackgroundImageRepeat: value,
						} )
					}
					normalBackgroundImageSize={
						globalNormalBackgroundImageSize
					}
					setNormalBackgroundImageSize={ ( value ) =>
						setAttributes( {
							globalNormalBackgroundImageSize: value,
						} )
					}
					hoverBackgroundType={ globalHoverBackgroundType }
					setHoverBackgroundType={ ( value ) =>
						setAttributes( { globalHoverBackgroundType: value } )
					}
					hoverClassicColor={ globalHoverClassicColor }
					setHoverClassicColor={ ( value ) =>
						setAttributes( { globalHoverClassicColor: value } )
					}
					hoverGradientColor={ globalHoverGradientColor }
					setHoverGradientColor={ ( value ) =>
						setAttributes( { globalHoverGradientColor: value } )
					}
					hoverCustomGradientSwitcher={
						globalHoverCustomGradientSwitcher
					}
					setHoverCustomGradientSwitcher={ ( value ) =>
						setAttributes( {
							globalHoverCustomGradientSwitcher: value,
						} )
					}
					hoverCustomGradientInputValue={
						globalHoverCustomGradientInputValue
					}
					setHoverCustomGradientInputValue={ ( value ) =>
						setAttributes( {
							globalHoverCustomGradientInputValue: value,
						} )
					}
					hoverBackgroundImageUrl={ globalHoverBackgroundImageUrl }
					setHoverBackgroundImageUrl={ ( value ) =>
						setAttributes( {
							globalHoverBackgroundImageUrl: value,
						} )
					}
					hoverBackgroundImagePosition={
						globalHoverBackgroundImagePosition
					}
					setHoverBackgroundImagePosition={ ( value ) =>
						setAttributes( {
							globalHoverBackgroundImagePosition: value,
						} )
					}
					hoverBackgroundImageAttachment={
						globalHoverBackgroundImageAttachment
					}
					setHoverBackgroundImageAttachment={ ( value ) =>
						setAttributes( {
							globalHoverBackgroundImageAttachment: value,
						} )
					}
					hoverBackgroundImageRepeat={
						globalHoverBackgroundImageRepeat
					}
					setHoverBackgroundImageRepeat={ ( value ) =>
						setAttributes( {
							globalHoverBackgroundImageRepeat: value,
						} )
					}
					hoverBackgroundImageSize={ globalHoverBackgroundImageSize }
					setHoverBackgroundImageSize={ ( value ) =>
						setAttributes( {
							globalHoverBackgroundImageSize: value,
						} )
					}
					setAttributes={ setAttributes }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Border and Shadow', 'gslider-blocks' ) }
				opened={ openPanels.advanced === 'border-shadow' }
				onToggle={ () => togglePanel( 'advanced', 'border-shadow' ) }
			>
				<SelectControls
					label={ __( 'Border Style', 'gslider-blocks' ) }
					options={ BORDER_STYLES }
					value={ globalBorder }
					onChange={ ( value ) =>
						setAttributes( { globalBorder: value } )
					}
				/>

				<SwitcherControl
					label={ __( 'Border Color', 'gslider-blocks' ) }
					options={ NORMAL_HOVER }
					value={ globalBorderColorSwitcher }
					onChange={ ( value ) =>
						setAttributes( { globalBorderColorSwitcher: value } )
					}
				/>

				{ globalBorderColorSwitcher === 'normal' && (
					<ColorControl
						label={ __( 'Normal Color', 'gslider-blocks' ) }
						color={ globalBorderColor }
						onChangeColor={ ( value ) =>
							setAttributes( { globalBorderColor: value } )
						}
					/>
				) }

				{ globalBorderColorSwitcher === 'hover' && (
					<ColorControl
						label={ __( 'Hover Color', 'gslider-blocks' ) }
						color={ globalBorderHoverColor }
						onChangeColor={ ( value ) =>
							setAttributes( { globalBorderHoverColor: value } )
						}
					/>
				) }

				<ResponsiveSpacingControl
					label={ __( 'Border', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ globalBorderUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { globalBorderUnits: value } )
					}
					desktopSpacing={ globalBorderDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { globalBorderDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( { globalBorderDesktopCssStyle: value } )
					}
					tabletSpacing={ globalBorderTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { globalBorderTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { globalBorderTabletCssStyle: value } )
					}
					mobileSpacing={ globalBorderMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { globalBorderMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { globalBorderMobileCssStyle: value } )
					}
					isLinked={ globalBorderLink }
					onChangeLink={ ( value ) =>
						setAttributes( { globalBorderLink: value } )
					}
				/>

				<ResponsiveSpacingControl
					label={ __( 'Border Radius', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ globalBorderRadiusUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { globalBorderRadiusUnits: value } )
					}
					desktopSpacing={ globalBorderRadiusDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { globalBorderRadiusDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( {
							globalBorderRadiusDesktopCssStyle: value,
						} )
					}
					tabletSpacing={ globalBorderRadiusTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { globalBorderRadiusTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( {
							globalBorderRadiusTabletCssStyle: value,
						} )
					}
					mobileSpacing={ globalBorderRadiusMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { globalBorderRadiusMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( {
							globalBorderRadiusMobileCssStyle: value,
						} )
					}
					isLinked={ globalBorderRadiusLink }
					onChangeLink={ ( value ) =>
						setAttributes( { globalBorderRadiusLink: value } )
					}
				/>

				<SwitcherControl
					label={ __( 'Box Shadow', 'gslider-blocks' ) }
					options={ NORMAL_HOVER }
					value={ globalBoxShadowValuesSwitcher }
					onChange={ ( value ) =>
						setAttributes( {
							globalBoxShadowValuesSwitcher: value,
						} )
					}
				/>

				{ globalBoxShadowValuesSwitcher === 'normal' && (
					<BoxShadowSettingsControl
						label={ __( 'Normal Shadow', 'gslider-blocks' ) }
						onBoxShadowChange={ ( value ) =>
							setAttributes( { globalBoxShadowValues: value } )
						}
						initialShadowValue={ globalBoxShadowValues }
						onBoxShadowStyleChange={ ( value ) =>
							setAttributes( { globalBoxShadowCssValue: value } )
						}
					/>
				) }

				{ globalBoxShadowValuesSwitcher === 'hover' && (
					<BoxShadowSettingsControl
						label={ __( 'Hover Shadow', 'gslider-blocks' ) }
						onBoxShadowChange={ ( value ) =>
							setAttributes( {
								globalBoxShadowHoverValues: value,
							} )
						}
						initialShadowValue={ globalBoxShadowHoverValues }
						onBoxShadowStyleChange={ ( value ) =>
							setAttributes( {
								globalBoxShadowHoverCssValue: value,
							} )
						}
					/>
				) }
			</PanelBody>
		</>
	);

	return (
		<>
			<InspectorControl
				generalControls={ generalControls }
				styleControls={ styleControls }
				advancedControls={ advancedControls }
			/>
		</>
	);
};

export default memo( Inspector );
