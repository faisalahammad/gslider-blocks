/* eslint-disable no-unused-vars, jsdoc/require-param, react-hooks/exhaustive-deps, import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useCallback, memo } from '@wordpress/element';
import { PanelBody, ToggleControl, BaseControl } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import {
	ARROW_ICON_ALIGN,
	VERTICAL_ALIGN,
	NORMAL_HOVER,
	BORDER_STYLES,
	CAROUSEL_EFFECT_OPTIONS,
	PAGINATION_TYPE,
	NORMAL_ACTIVE,
	NAVIGATION_ARROW_POSITION_TYPE,
	PAGINATION_POSITION_TYPE,
	NAVIGATION_ARROW_POSITION,
	NAVIGATION_ARROW_DIRECTION,
} from '@Constants';

import './editor.scss';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ColorControl from '@Components/color-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';
import BackgroundControl from '@Components/background-control';
import ImageControl from '@Components/image-control';
import InspectorControl from '@Components/inspector-controls';
import LoadGoogleFont from '@Utils/loadGoogleFont';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import { useDeviceType } from '@Utils/displayType';
import InputControls from '@Components/input-control';
import SelectControls from '@Components/select-controls';
import IconPicker from '@Components/icon-picker';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';

const Inspector = ( { attributes, setAttributes } ) => {
	const {
		blockId,
		deviceType,
		blockStyle,
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
		enableLazyLoad,
		verticalAlign,
		carouselEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,

		images,
		showCaption,

		/** Start Show/Hide Elements */
		paginationPositionType,
		showNavigation,
		showPagination,
		/** End Show/Hide Elements */

		/** Start image Link Settings */
		enableimageLinks,
		enableLightbox,
		showTooltip,
		imageLinkTarget,
		imageLinkRel,
		imageLinkHoverEffect,
		imageLinkHoverOpacity,
		imageLinkHoverScale,
		imageLinkHoverLift,
		imageLinkHoverLiftUnits,
		imageLinkTransitionDuration,
		/** End image Link Settings */

		/** Start Layout & Content Setting */
		layoutHeight,
		layoutHeightUnits,
		/** End Layout & Content Setting */

		/** Start image Max Width */
		imageMaxWidth,
		imageMaxWidthUnits,
		/** End image Max Width */

		/** Start image Padding */
		imagePaddingUnits,
		imagePaddingDesktop,
		imagePaddingDesktopCssStyle,
		imagePaddingTablet,
		imagePaddingTabletCssStyle,
		imagePaddingMobile,
		imagePaddingMobileCssStyle,
		imagePaddingLink,
		/** End image Padding */

		/** Start image Background */
		imageNormalBackgroundType,
		imageNormalClassicColor,
		imageNormalGradientColor,
		imageNormalCustomGradientSwitcher,
		imageNormalCustomGradientInputValue,
		imageHoverBackgroundType,
		imageHoverClassicColor,
		imageHoverGradientColor,
		imageHoverCustomGradientSwitcher,
		imageHoverCustomGradientInputValue,
		/** End image Background */

		/** Start image Border */
		imageBorder,
		imageBorderColorSwitcher,
		imageBorderColor,
		imageBorderHoverColor,
		imageBorderUnits,
		imageBorderDesktop,
		imageBorderDesktopCssStyle,
		imageBorderTablet,
		imageBorderTabletCssStyle,
		imageBorderMobile,
		imageBorderMobileCssStyle,
		imageBorderLink,
		/** End image Border */

		/** Start image Border Radius */
		imageBorderRadiusUnits,
		imageBorderRadiusDesktop,
		imageBorderRadiusDesktopCssStyle,
		imageBorderRadiusTablet,
		imageBorderRadiusTabletCssStyle,
		imageBorderRadiusMobile,
		imageBorderRadiusMobileCssStyle,
		imageBorderRadiusLink,
		/** End image Border Radius */

		/** Start image Box Shadow */
		imageBoxShadowValuesSwitcher,
		imageBoxShadowValues,
		imageBoxShadowCssValue,
		imageBoxShadowHoverValues,
		imageBoxShadowHoverCssValue,
		/** End image Box Shadow */

		/** Start image Caption Typography */
		imageCaptionFontFamily,
		imageCaptionFontSize,
		imageCaptionFontSizeUnits,
		imageCaptionFontWeight,
		imageCaptionFontStyle,
		imageCaptionTextTransform,
		imageCaptionTextDecoration,
		imageCaptionLineHeight,
		imageCaptionLineHeightUnits,
		imageCaptionLetterSpacing,
		imageCaptionLetterSpacingUnits,
		imageCaptionWordSpacing,
		imageCaptionWordSpacingUnits,
		/** End image Caption Typography */

		/** Start image Caption Color */
		imageCaptionColorSwitcher,
		imageCaptionColor,
		imageCaptionColorHover,
		/** End image Caption Color */

		/** Start image Caption Background */
		imageCaptionNormalBackgroundType,
		imageCaptionNormalClassicColor,
		imageCaptionNormalGradientColor,
		imageCaptionNormalCustomGradientSwitcher,
		imageCaptionNormalCustomGradientInputValue,
		imageCaptionHoverBackgroundType,
		imageCaptionHoverClassicColor,
		imageCaptionHoverGradientColor,
		imageCaptionHoverCustomGradientSwitcher,
		imageCaptionHoverCustomGradientInputValue,
		/** End image Caption Background */

		/** Start image Caption Border and color */
		imageCaptionBorder,
		imageCaptionBorderColorSwitcher,
		imageCaptionBorderColor,
		imageCaptionBorderHoverColor,
		/** End image Caption Border and color */

		/** Start image Caption Border */
		imageCaptionBorderUnits,
		imageCaptionBorderDesktop,
		imageCaptionBorderDesktopCssStyle,
		imageCaptionBorderTablet,
		imageCaptionBorderTabletCssStyle,
		imageCaptionBorderMobile,
		imageCaptionBorderMobileCssStyle,
		imageCaptionBorderLink,
		/** End image Caption Border */

		/** Start image Caption Border Radius */
		imageCaptionBorderRadiusUnits,
		imageCaptionBorderRadiusDesktop,
		imageCaptionBorderRadiusDesktopCssStyle,
		imageCaptionBorderRadiusTablet,
		imageCaptionBorderRadiusTabletCssStyle,
		imageCaptionBorderRadiusMobile,
		imageCaptionBorderRadiusMobileCssStyle,
		imageCaptionBorderRadiusLink,
		/** End image Caption Border Radius */

		/** Start image Caption Padding */
		imageCaptionPaddingUnits,
		imageCaptionPaddingDesktop,
		imageCaptionPaddingDesktopCssStyle,
		imageCaptionPaddingTablet,
		imageCaptionPaddingTabletCssStyle,
		imageCaptionPaddingMobile,
		imageCaptionPaddingMobileCssStyle,
		imageCaptionPaddingLink,
		/** End image Caption Padding */

		/** Start image Tooltip Typography */
		imageTooltipFontFamily,
		imageTooltipFontSize,
		imageTooltipFontSizeUnits,
		imageTooltipFontWeight,
		imageTooltipFontStyle,
		imageTooltipTextTransform,
		imageTooltipTextDecoration,
		imageTooltipLineHeight,
		imageTooltipLineHeightUnits,
		imageTooltipLetterSpacing,
		imageTooltipLetterSpacingUnits,
		imageTooltipWordSpacing,
		imageTooltipWordSpacingUnits,
		/** End image Tooltip Typography */

		/** Start image Tooltip Color */
		imageTooltipColor,
		imageTooltipBgColor,
		/** End image Tooltip Color */

		/** Start image Tooltip Border and color */
		imageTooltipBorder,
		imageTooltipBorderColor,
		/** End image Tooltip Border and color */

		/** Start image Tooltip Border */
		imageTooltipBorderUnits,
		imageTooltipBorderDesktop,
		imageTooltipBorderDesktopCssStyle,
		imageTooltipBorderTablet,
		imageTooltipBorderTabletCssStyle,
		imageTooltipBorderMobile,
		imageTooltipBorderMobileCssStyle,
		imageTooltipBorderLink,
		/** End image Tooltip Border */

		/** Start image Tooltip Border Radius */
		imageTooltipBorderRadiusUnits,
		imageTooltipBorderRadiusDesktop,
		imageTooltipBorderRadiusDesktopCssStyle,
		imageTooltipBorderRadiusTablet,
		imageTooltipBorderRadiusTabletCssStyle,
		imageTooltipBorderRadiusMobile,
		imageTooltipBorderRadiusMobileCssStyle,
		imageTooltipBorderRadiusLink,
		/** End image Tooltip Border Radius */

		/** Start image Tooltip Padding */
		imageTooltipPaddingUnits,
		imageTooltipPaddingDesktop,
		imageTooltipPaddingDesktopCssStyle,
		imageTooltipPaddingTablet,
		imageTooltipPaddingTabletCssStyle,
		imageTooltipPaddingMobile,
		imageTooltipPaddingMobileCssStyle,
		imageTooltipPaddingLink,
		/** End image Tooltip Padding */

		/** Start image Tooltip Position */
		imageTooltipTopPosition,
		imageTooltipTopPositionUnits,
		imageTooltipLeftPosition,
		imageTooltipLeftPositionUnits,
		/** End image Tooltip Position */

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

	/** Format Spacing */
	const spacingFormat = ( spacing, units ) => {
		return spacing.top || spacing.right || spacing.bottom || spacing.left
			? `${ spacing.top }${ units } ${ spacing.right }${ units } ${ spacing.bottom }${ units } ${ spacing.left }${ units }`
			: '';
	};

	/** set the css style if have default padding */
	useEffect( () => {
		setAttributes( {
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
		} );
	}, [
		navigationArrowDesktopBorderRadius,
		navigationArrowTabletBorderRadius,
		navigationArrowMobileBorderRadius,
		navigationArrowBorderRadiusUnits,

		paginationNormalDotsDesktopBorderRadius,
		paginationNormalDotsTabletBorderRadius,
		paginationNormalDotsMobileBorderRadius,
		paginationNormalDotsBorderRadiusUnits,
	] );
	/** end if have default padding then set the css style */

	/** Navigation Custom Arrows */
	const navigationArrowsIconLeftHandler = ( IconName ) => {
		setAttributes( { navigationArrowsIconLeft: IconName } );
	};
	const navigationArrowsIconRightHandler = ( IconName ) => {
		setAttributes( { navigationArrowsIconRight: IconName } );
	};
	/** End Navigation Custom Arrows */

	/** Start Load Google Font */
	if ( imageCaptionFontFamily !== 'Default' ) {
		LoadGoogleFont( imageCaptionFontFamily );
	}
	if ( imageTooltipFontFamily !== 'Default' ) {
		LoadGoogleFont( imageTooltipFontFamily );
	}
	/** End Load Google Font */

	/**
	 * Inspector General Controls
	 */
	const generalControls = (
		<>
			<PanelBody
				title={ __( 'Show / Hide Elements', 'gslider-blocks' ) }
				opened={ openPanels.general === 'show-hide-elements' }
				onToggle={ () =>
					togglePanel( 'general', 'show-hide-elements' )
				}
			>
				<ResponsiveToggleControl
					label={ __( 'Show Caption', 'gslider-blocks' ) }
					toggleValue={ showCaption }
					setToggleValue={ ( value ) =>
						setAttributes( { showCaption: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
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
				<ToggleControl
					label={ __( 'Enable image Links', 'gslider-blocks' ) }
					help={ __(
						'Allow images to be clickable with custom URLs',
						'gslider-blocks'
					) }
					checked={ enableimageLinks }
					onChange={ ( value ) =>
						setAttributes( { enableimageLinks: value } )
					}
				/>
				<ResponsiveToggleControl
					label={ __( 'Enable Lightbox', 'gslider-blocks' ) }
					toggleValue={ enableLightbox }
					setToggleValue={ ( value ) =>
						setAttributes( { enableLightbox: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
				/>
				<ToggleControl
					label={ __( 'Enable Tooltip', 'gslider-blocks' ) }
					help={ __(
						'Show custom tooltip text when hovering over images',
						'gslider-blocks'
					) }
					checked={ showTooltip }
					onChange={ ( value ) =>
						setAttributes( { showTooltip: value } )
					}
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Layout & Content Setting', 'gslider-blocks' ) }
				opened={ openPanels.general === 'layout-content-setting' }
				onToggle={ () =>
					togglePanel( 'general', 'layout-content-setting' )
				}
			>
				<ResponsiveRangeControl
					label={ __( 'Height', 'gslider-blocks' ) }
					rangeValue={ layoutHeight }
					onChangeValue={ ( value ) =>
						setAttributes( { layoutHeight: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { layoutHeightUnits: value } )
					}
					deviceType={ deviceType }
					units={ layoutHeightUnits }
					resetFallbackValue={ {
						px: '500',
						'%': '50',
						vh: '50',
						vw: '50',
						em: '20',
						rem: '20',
					} }
				/>

				<ResponsiveAlignmentControl
					label={ __( 'Vertical Alignment', 'gslider-blocks' ) }
					options={ VERTICAL_ALIGN }
					alignmentValue={ verticalAlign }
					setAlignmentValue={ ( value ) =>
						setAttributes( { verticalAlign: value } )
					}
					deviceType={ deviceType }
					setAttributes={ setAttributes }
					className="gslider-vertical-alignment"
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Carousel Settings', 'gslider-blocks' ) }
				opened={ openPanels.general === 'carousel-settings' }
				onToggle={ () => togglePanel( 'general', 'carousel-settings' ) }
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
					resetFallbackValue={ '1' }
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
					resetFallbackValue={ '0' }
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

			<PanelBody
				title={ __( 'image Hover Effect', 'gslider-blocks' ) }
				opened={ openPanels.general === 'image-hover-effect' }
				onToggle={ () =>
					togglePanel( 'general', 'image-hover-effect' )
				}
			>
				<SelectControls
					label={ __( 'Hover Effect', 'gslider-blocks' ) }
					options={ [
						{
							label: __( 'None', 'gslider-blocks' ),
							value: 'none',
						},
						{
							label: __( 'Opacity', 'gslider-blocks' ),
							value: 'opacity',
						},
						{
							label: __( 'Scale', 'gslider-blocks' ),
							value: 'scale',
						},
						{
							label: __( 'Move Up', 'gslider-blocks' ),
							value: 'move-up',
						},
						{
							label: __( 'Grayscale to Color', 'gslider-blocks' ),
							value: 'grayscale',
						},
						{
							label: __( 'Opacity & Scale', 'gslider-blocks' ),
							value: 'both',
						},
					] }
					value={ imageLinkHoverEffect }
					onChange={ ( value ) =>
						setAttributes( { imageLinkHoverEffect: value } )
					}
				/>

				{ ( imageLinkHoverEffect === 'opacity' ||
					imageLinkHoverEffect === 'both' ) && (
					<ResponsiveRangeControl
						min={ 0 }
						max={ 1 }
						step={ 0.05 }
						label={ __( 'Hover Opacity', 'gslider-blocks' ) }
						rangeValue={ imageLinkHoverOpacity }
						onChangeValue={ ( value ) =>
							setAttributes( { imageLinkHoverOpacity: value } )
						}
						deviceType={ deviceType }
						resetFallbackValue={ '0.8' }
						isRangeUnit={ false }
					/>
				) }

				{ ( imageLinkHoverEffect === 'scale' ||
					imageLinkHoverEffect === 'both' ) && (
					<ResponsiveRangeControl
						min={ 0.8 }
						max={ 1.5 }
						step={ 0.05 }
						label={ __( 'Hover Scale', 'gslider-blocks' ) }
						rangeValue={ imageLinkHoverScale }
						onChangeValue={ ( value ) =>
							setAttributes( { imageLinkHoverScale: value } )
						}
						deviceType={ deviceType }
						resetFallbackValue={ '1.05' }
						isRangeUnit={ false }
					/>
				) }

				{ imageLinkHoverEffect === 'move-up' && (
					<ResponsiveRangeControl
						label={ __( 'Lift Amount', 'gslider-blocks' ) }
						rangeValue={ imageLinkHoverLift }
						onChangeValue={ ( value ) =>
							setAttributes( { imageLinkHoverLift: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( { imageLinkHoverLiftUnits: value } )
						}
						deviceType={ deviceType }
						units={ imageLinkHoverLiftUnits }
						resetFallbackValue={ {
							px: '10',
							'%': '5',
							em: '1',
							rem: '1',
							vw: '1',
							vh: '1',
						} }
						isRangeUnit={ true }
						unitBounds={ {
							px: { min: 0, max: 200, step: 1 },
							em: { min: 0, max: 10, step: 0.1 },
							rem: { min: 0, max: 10, step: 0.1 },
							'%': { min: 0, max: 100, step: 1 },
						} }
					/>
				) }

				<ResponsiveRangeControl
					min={ 100 }
					max={ 1000 }
					step={ 50 }
					label={ __( 'Transition Duration (ms)', 'gslider-blocks' ) }
					rangeValue={ imageLinkTransitionDuration }
					onChangeValue={ ( value ) =>
						setAttributes( { imageLinkTransitionDuration: value } )
					}
					deviceType={ deviceType }
					resetFallbackValue={ '300' }
					isRangeUnit={ false }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Carousel Effect', 'gslider-blocks' ) }
				opened={ openPanels.general === 'carousel-effect' }
				onToggle={ () => togglePanel( 'general', 'carousel-effect' ) }
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
								px: '60',
								'%': '5',
								vh: '5',
								vw: '5',
								em: '3.75',
								rem: '3.75',
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

			{ enableimageLinks && (
				<PanelBody
					title={ __( 'image Link Settings', 'gslider-blocks' ) }
					opened={ openPanels.general === 'image-link-settings' }
					onToggle={ () =>
						togglePanel( 'general', 'image-link-settings' )
					}
				>
					<SelectControls
						label={ __( 'Link Target', 'gslider-blocks' ) }
						options={ [
							{
								label: __( 'New Tab', 'gslider-blocks' ),
								value: '_blank',
							},
							{
								label: __( 'Same Tab', 'gslider-blocks' ),
								value: '_self',
							},
						] }
						value={ imageLinkTarget }
						onChange={ ( value ) =>
							setAttributes( { imageLinkTarget: value } )
						}
					/>

					<InputControls
						label={ __( 'Link Rel Attribute', 'gslider-blocks' ) }
						helpText={ __(
							'Relationship between current and linked document',
							'gslider-blocks'
						) }
						value={ imageLinkRel }
						onChangeValue={ ( value ) =>
							setAttributes( { imageLinkRel: value } )
						}
					/>
				</PanelBody>
			) }

			<PanelBody
				title={ __( 'Performance Settings', 'gslider-blocks' ) }
				opened={ openPanels.general === 'performance-settings' }
				onToggle={ () =>
					togglePanel( 'general', 'performance-settings' )
				}
				initialOpen={ false }
			>
				<ToggleControl
					label={ __( 'Enable Lazy Loading', 'gslider-blocks' ) }
					help={ __(
						'Delay loading of images until they are in the viewport.',
						'gslider-blocks'
					) }
					checked={ enableLazyLoad }
					onChange={ ( value ) =>
						setAttributes( { enableLazyLoad: value } )
					}
				/>
			</PanelBody>
		</>
	);

	/**
	 * Inspector Style Controls
	 */
	const styleControls = (
		<>
			<PanelBody
				title={ __( 'image', 'gslider-blocks' ) }
				opened={ openPanels.styles === 'content' }
				onToggle={ () => togglePanel( 'styles', 'content' ) }
			>
				<ResponsiveRangeControl
					label={ __( 'Max Width', 'gslider-blocks' ) }
					rangeValue={ imageMaxWidth }
					onChangeValue={ ( value ) =>
						setAttributes( { imageMaxWidth: value } )
					}
					onUnitChange={ ( value ) =>
						setAttributes( { imageMaxWidthUnits: value } )
					}
					deviceType={ deviceType }
					units={ imageMaxWidthUnits }
					resetFallbackValue={ '' }
					unitBounds={ {
						px: { min: 0, max: 1000, step: 1 },
					} }
				/>

				<ResponsiveSpacingControl
					label={ __( 'Padding', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ imagePaddingUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { imagePaddingUnits: value } )
					}
					desktopSpacing={ imagePaddingDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { imagePaddingDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( { imagePaddingDesktopCssStyle: value } )
					}
					tabletSpacing={ imagePaddingTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { imagePaddingTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { imagePaddingTabletCssStyle: value } )
					}
					mobileSpacing={ imagePaddingMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { imagePaddingMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { imagePaddingMobileCssStyle: value } )
					}
					isLinked={ imagePaddingLink }
					onChangeLink={ ( value ) =>
						setAttributes( { imagePaddingLink: value } )
					}
				/>

				<BackgroundControl
					label={ __( 'Background Color', 'gslider-blocks' ) }
					deviceType={ deviceType }
					normalBackgroundType={ imageNormalBackgroundType }
					setNormalBackgroundType={ ( value ) =>
						setAttributes( { imageNormalBackgroundType: value } )
					}
					normalClassicColor={ imageNormalClassicColor }
					setNormalClassicColor={ ( value ) =>
						setAttributes( { imageNormalClassicColor: value } )
					}
					normalGradientColor={ imageNormalGradientColor }
					setNormalGradientColor={ ( value ) =>
						setAttributes( { imageNormalGradientColor: value } )
					}
					normalCustomGradientSwitcher={
						imageNormalCustomGradientSwitcher
					}
					setNormalCustomGradientSwitcher={ ( value ) =>
						setAttributes( {
							imageNormalCustomGradientSwitcher: value,
						} )
					}
					normalCustomGradientInputValue={
						imageNormalCustomGradientInputValue
					}
					setNormalCustomGradientInputValue={ ( value ) =>
						setAttributes( {
							imageNormalCustomGradientInputValue: value,
						} )
					}
					hoverBackgroundType={ imageHoverBackgroundType }
					setHoverBackgroundType={ ( value ) =>
						setAttributes( { imageHoverBackgroundType: value } )
					}
					hoverClassicColor={ imageHoverClassicColor }
					setHoverClassicColor={ ( value ) =>
						setAttributes( { imageHoverClassicColor: value } )
					}
					hoverGradientColor={ imageHoverGradientColor }
					setHoverGradientColor={ ( value ) =>
						setAttributes( { imageHoverGradientColor: value } )
					}
					hoverCustomGradientSwitcher={
						imageHoverCustomGradientSwitcher
					}
					setHoverCustomGradientSwitcher={ ( value ) =>
						setAttributes( {
							imageHoverCustomGradientSwitcher: value,
						} )
					}
					hoverCustomGradientInputValue={
						imageHoverCustomGradientInputValue
					}
					setHoverCustomGradientInputValue={ ( value ) =>
						setAttributes( {
							imageHoverCustomGradientInputValue: value,
						} )
					}
					setAttributes={ setAttributes }
					isBackgroundImage={ false }
				/>

				<SelectControls
					label={ __( 'Border Style', 'gslider-blocks' ) }
					options={ BORDER_STYLES }
					value={ imageBorder }
					onChange={ ( value ) =>
						setAttributes( { imageBorder: value } )
					}
				/>

				<SwitcherControl
					label={ __( 'Border Color', 'gslider-blocks' ) }
					options={ NORMAL_HOVER }
					value={ imageBorderColorSwitcher }
					onChange={ ( value ) =>
						setAttributes( { imageBorderColorSwitcher: value } )
					}
				/>

				{ imageBorderColorSwitcher === 'normal' && (
					<ColorControl
						label={ __( 'Normal Color', 'gslider-blocks' ) }
						color={ imageBorderColor }
						onChangeColor={ ( value ) =>
							setAttributes( { imageBorderColor: value } )
						}
					/>
				) }

				{ imageBorderColorSwitcher === 'hover' && (
					<ColorControl
						label={ __( 'Hover Color', 'gslider-blocks' ) }
						color={ imageBorderHoverColor }
						onChangeColor={ ( value ) =>
							setAttributes( { imageBorderHoverColor: value } )
						}
					/>
				) }

				<ResponsiveSpacingControl
					label={ __( 'Border', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ imageBorderUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { imageBorderUnits: value } )
					}
					desktopSpacing={ imageBorderDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { imageBorderDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( { imageBorderDesktopCssStyle: value } )
					}
					tabletSpacing={ imageBorderTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { imageBorderTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( { imageBorderTabletCssStyle: value } )
					}
					mobileSpacing={ imageBorderMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { imageBorderMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( { imageBorderMobileCssStyle: value } )
					}
					isLinked={ imageBorderLink }
					onChangeLink={ ( value ) =>
						setAttributes( { imageBorderLink: value } )
					}
				/>

				<ResponsiveSpacingControl
					label={ __( 'Border Radius', 'gslider-blocks' ) }
					deviceType={ deviceType }
					onChangeDeviceType={ ( value ) =>
						setAttributes( { deviceType: value } )
					}
					units={ imageBorderRadiusUnits }
					onChangeUnits={ ( value ) =>
						setAttributes( { imageBorderRadiusUnits: value } )
					}
					desktopSpacing={ imageBorderRadiusDesktop }
					onChangeDesktopSpacing={ ( value ) =>
						setAttributes( { imageBorderRadiusDesktop: value } )
					}
					desktopSpacingStyle={ ( value ) =>
						setAttributes( {
							imageBorderRadiusDesktopCssStyle: value,
						} )
					}
					tabletSpacing={ imageBorderRadiusTablet }
					onChangeTabletSpacing={ ( value ) =>
						setAttributes( { imageBorderRadiusTablet: value } )
					}
					tabletSpacingStyle={ ( value ) =>
						setAttributes( {
							imageBorderRadiusTabletCssStyle: value,
						} )
					}
					mobileSpacing={ imageBorderRadiusMobile }
					onChangeMobileSpacing={ ( value ) =>
						setAttributes( { imageBorderRadiusMobile: value } )
					}
					mobileSpacingStyle={ ( value ) =>
						setAttributes( {
							imageBorderRadiusMobileCssStyle: value,
						} )
					}
					isLinked={ imageBorderRadiusLink }
					onChangeLink={ ( value ) =>
						setAttributes( { imageBorderRadiusLink: value } )
					}
				/>

				<SwitcherControl
					label={ __( 'Box Shadow', 'gslider-blocks' ) }
					options={ NORMAL_HOVER }
					value={ imageBoxShadowValuesSwitcher }
					onChange={ ( value ) =>
						setAttributes( { imageBoxShadowValuesSwitcher: value } )
					}
				/>

				{ imageBoxShadowValuesSwitcher === 'normal' && (
					<BoxShadowSettingsControl
						label={ __( 'Normal Shadow', 'gslider-blocks' ) }
						onBoxShadowChange={ ( value ) =>
							setAttributes( { imageBoxShadowValues: value } )
						}
						initialShadowValue={ imageBoxShadowValues }
						onBoxShadowStyleChange={ ( value ) =>
							setAttributes( { imageBoxShadowCssValue: value } )
						}
					/>
				) }

				{ imageBoxShadowValuesSwitcher === 'hover' && (
					<BoxShadowSettingsControl
						label={ __( 'Hover Shadow', 'gslider-blocks' ) }
						onBoxShadowChange={ ( value ) =>
							setAttributes( {
								imageBoxShadowHoverValues: value,
							} )
						}
						initialShadowValue={ imageBoxShadowHoverValues }
						onBoxShadowStyleChange={ ( value ) =>
							setAttributes( {
								imageBoxShadowHoverCssValue: value,
							} )
						}
					/>
				) }
			</PanelBody>

			{ showCaption?.[ deviceType ] && (
				<PanelBody
					title={ __( 'Caption', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'caption' }
					onToggle={ () => togglePanel( 'styles', 'caption' ) }
				>
					<ResponsiveTypographyControl
						fontFamily={ imageCaptionFontFamily }
						onChangeFontFamily={ ( value ) =>
							setAttributes( { imageCaptionFontFamily: value } )
						}
						fontSize={ imageCaptionFontSize }
						onChangeFontSize={ ( value ) =>
							setAttributes( { imageCaptionFontSize: value } )
						}
						fontSizeUnits={ imageCaptionFontSizeUnits }
						onChangeFontSizeUnit={ ( value ) =>
							setAttributes( {
								imageCaptionFontSizeUnits: value,
							} )
						}
						fontWeight={ imageCaptionFontWeight }
						onChangeFontWeight={ ( value ) =>
							setAttributes( { imageCaptionFontWeight: value } )
						}
						fontStyle={ imageCaptionFontStyle }
						onChangeFontStyle={ ( value ) =>
							setAttributes( { imageCaptionFontStyle: value } )
						}
						textTransform={ imageCaptionTextTransform }
						onChangeTextTransform={ ( value ) =>
							setAttributes( {
								imageCaptionTextTransform: value,
							} )
						}
						textDecoration={ imageCaptionTextDecoration }
						onChangeTextDecoration={ ( value ) =>
							setAttributes( {
								imageCaptionTextDecoration: value,
							} )
						}
						lineHeight={ imageCaptionLineHeight }
						onChangeLineHeight={ ( value ) =>
							setAttributes( { imageCaptionLineHeight: value } )
						}
						lineHeightUnits={ imageCaptionLineHeightUnits }
						onChangeLineHeightUnit={ ( value ) =>
							setAttributes( {
								imageCaptionLineHeightUnits: value,
							} )
						}
						letterSpacing={ imageCaptionLetterSpacing }
						onChangeLetterSpacing={ ( value ) =>
							setAttributes( {
								imageCaptionLetterSpacing: value,
							} )
						}
						letterSpacingUnits={ imageCaptionLetterSpacingUnits }
						onChangeLetterSpacingUnit={ ( value ) =>
							setAttributes( {
								imageCaptionLetterSpacingUnits: value,
							} )
						}
						wordSpacing={ imageCaptionWordSpacing }
						onChangeWordSpacing={ ( value ) =>
							setAttributes( { imageCaptionWordSpacing: value } )
						}
						wordSpacingUnits={ imageCaptionWordSpacingUnits }
						onChangeWordSpacingUnit={ ( value ) =>
							setAttributes( {
								imageCaptionWordSpacingUnits: value,
							} )
						}
						deviceType={ deviceType }
					/>

					<SwitcherControl
						label={ __( 'Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ imageCaptionColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								imageCaptionColorSwitcher: value,
							} )
						}
					/>

					{ imageCaptionColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ imageCaptionColor }
							onChangeColor={ ( value ) =>
								setAttributes( { imageCaptionColor: value } )
							}
							defaultColor=""
						/>
					) }

					{ imageCaptionColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ imageCaptionColorHover }
							onChangeColor={ ( value ) =>
								setAttributes( {
									imageCaptionColorHover: value,
								} )
							}
							defaultColor=""
						/>
					) }

					<BackgroundControl
						label={ __( 'Background Color', 'gslider-blocks' ) }
						normalBackgroundType={
							imageCaptionNormalBackgroundType
						}
						setNormalBackgroundType={ ( value ) =>
							setAttributes( {
								imageCaptionNormalBackgroundType: value,
							} )
						}
						normalClassicColor={ imageCaptionNormalClassicColor }
						setNormalClassicColor={ ( value ) =>
							setAttributes( {
								imageCaptionNormalClassicColor: value,
							} )
						}
						normalGradientColor={ imageCaptionNormalGradientColor }
						setNormalGradientColor={ ( value ) =>
							setAttributes( {
								imageCaptionNormalGradientColor: value,
							} )
						}
						normalCustomGradientSwitcher={
							imageCaptionNormalCustomGradientSwitcher
						}
						setNormalCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								imageCaptionNormalCustomGradientSwitcher: value,
							} )
						}
						normalCustomGradientInputValue={
							imageCaptionNormalCustomGradientInputValue
						}
						setNormalCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								imageCaptionNormalCustomGradientInputValue:
									value,
							} )
						}
						normalClassicDefaultColor={ '#00000075' }
						hoverBackgroundType={ imageCaptionHoverBackgroundType }
						setHoverBackgroundType={ ( value ) =>
							setAttributes( {
								imageCaptionHoverBackgroundType: value,
							} )
						}
						hoverClassicColor={ imageCaptionHoverClassicColor }
						setHoverClassicColor={ ( value ) =>
							setAttributes( {
								imageCaptionHoverClassicColor: value,
							} )
						}
						hoverGradientColor={ imageCaptionHoverGradientColor }
						setHoverGradientColor={ ( value ) =>
							setAttributes( {
								imageCaptionHoverGradientColor: value,
							} )
						}
						hoverCustomGradientSwitcher={
							imageCaptionHoverCustomGradientSwitcher
						}
						setHoverCustomGradientSwitcher={ ( value ) =>
							setAttributes( {
								imageCaptionHoverCustomGradientSwitcher: value,
							} )
						}
						hoverCustomGradientInputValue={
							imageCaptionHoverCustomGradientInputValue
						}
						setHoverCustomGradientInputValue={ ( value ) =>
							setAttributes( {
								imageCaptionHoverCustomGradientInputValue:
									value,
							} )
						}
						hoverClassicDefaultColor={ '' }
						isBackgroundImage={ false }
					/>

					<SelectControls
						label={ __( 'Border Style', 'gslider-blocks' ) }
						options={ BORDER_STYLES }
						value={ imageCaptionBorder }
						onChange={ ( value ) =>
							setAttributes( { imageCaptionBorder: value } )
						}
					/>

					<SwitcherControl
						label={ __( 'Border Color', 'gslider-blocks' ) }
						options={ NORMAL_HOVER }
						value={ imageCaptionBorderColorSwitcher }
						onChange={ ( value ) =>
							setAttributes( {
								imageCaptionBorderColorSwitcher: value,
							} )
						}
					/>

					{ imageCaptionBorderColorSwitcher === 'normal' && (
						<ColorControl
							label={ __( 'Normal Color', 'gslider-blocks' ) }
							color={ imageCaptionBorderColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									imageCaptionBorderColor: value,
								} )
							}
						/>
					) }

					{ imageCaptionBorderColorSwitcher === 'hover' && (
						<ColorControl
							label={ __( 'Hover Color', 'gslider-blocks' ) }
							color={ imageCaptionBorderHoverColor }
							onChangeColor={ ( value ) =>
								setAttributes( {
									imageCaptionBorderHoverColor: value,
								} )
							}
						/>
					) }

					<ResponsiveSpacingControl
						label={ __( 'Border', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ imageCaptionBorderUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { imageCaptionBorderUnits: value } )
						}
						desktopSpacing={ imageCaptionBorderDesktop }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								imageCaptionBorderDesktop: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								imageCaptionBorderDesktopCssStyle: value,
							} )
						}
						tabletSpacing={ imageCaptionBorderTablet }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { imageCaptionBorderTablet: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								imageCaptionBorderTabletCssStyle: value,
							} )
						}
						mobileSpacing={ imageCaptionBorderMobile }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { imageCaptionBorderMobile: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								imageCaptionBorderMobileCssStyle: value,
							} )
						}
						isLinked={ imageCaptionBorderLink }
						onChangeLink={ ( value ) =>
							setAttributes( { imageCaptionBorderLink: value } )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Border Radius', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ imageCaptionBorderRadiusUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								imageCaptionBorderRadiusUnits: value,
							} )
						}
						desktopSpacing={ imageCaptionBorderRadiusDesktop }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								imageCaptionBorderRadiusDesktop: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								imageCaptionBorderRadiusDesktopCssStyle: value,
							} )
						}
						tabletSpacing={ imageCaptionBorderRadiusTablet }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								imageCaptionBorderRadiusTablet: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								imageCaptionBorderRadiusTabletCssStyle: value,
							} )
						}
						mobileSpacing={ imageCaptionBorderRadiusMobile }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								imageCaptionBorderRadiusMobile: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								imageCaptionBorderRadiusMobileCssStyle: value,
							} )
						}
						isLinked={ imageCaptionBorderRadiusLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								imageCaptionBorderRadiusLink: value,
							} )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ imageCaptionPaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { imageCaptionPaddingUnits: value } )
						}
						desktopSpacing={ imageCaptionPaddingDesktop }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								imageCaptionPaddingDesktop: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								imageCaptionPaddingDesktopCssStyle: value,
							} )
						}
						tabletSpacing={ imageCaptionPaddingTablet }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								imageCaptionPaddingTablet: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								imageCaptionPaddingTabletCssStyle: value,
							} )
						}
						mobileSpacing={ imageCaptionPaddingMobile }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								imageCaptionPaddingMobile: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								imageCaptionPaddingMobileCssStyle: value,
							} )
						}
						isLinked={ imageCaptionPaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( { imageCaptionPaddingLink: value } )
						}
					/>
				</PanelBody>
			) }

			{ showTooltip && (
				<PanelBody
					title={ __( 'Tooltip', 'gslider-blocks' ) }
					opened={ openPanels.styles === 'tooltip' }
					onToggle={ () => togglePanel( 'styles', 'tooltip' ) }
				>
					<ResponsiveTypographyControl
						fontFamily={ imageTooltipFontFamily }
						onChangeFontFamily={ ( value ) =>
							setAttributes( { imageTooltipFontFamily: value } )
						}
						fontSize={ imageTooltipFontSize }
						onChangeFontSize={ ( value ) =>
							setAttributes( { imageTooltipFontSize: value } )
						}
						fontSizeUnits={ imageTooltipFontSizeUnits }
						onChangeFontSizeUnit={ ( value ) =>
							setAttributes( {
								imageTooltipFontSizeUnits: value,
							} )
						}
						fontWeight={ imageTooltipFontWeight }
						onChangeFontWeight={ ( value ) =>
							setAttributes( { imageTooltipFontWeight: value } )
						}
						fontStyle={ imageTooltipFontStyle }
						onChangeFontStyle={ ( value ) =>
							setAttributes( { imageTooltipFontStyle: value } )
						}
						textTransform={ imageTooltipTextTransform }
						onChangeTextTransform={ ( value ) =>
							setAttributes( {
								imageTooltipTextTransform: value,
							} )
						}
						textDecoration={ imageTooltipTextDecoration }
						onChangeTextDecoration={ ( value ) =>
							setAttributes( {
								imageTooltipTextDecoration: value,
							} )
						}
						lineHeight={ imageTooltipLineHeight }
						onChangeLineHeight={ ( value ) =>
							setAttributes( { imageTooltipLineHeight: value } )
						}
						lineHeightUnits={ imageTooltipLineHeightUnits }
						onChangeLineHeightUnit={ ( value ) =>
							setAttributes( {
								imageTooltipLineHeightUnits: value,
							} )
						}
						letterSpacing={ imageTooltipLetterSpacing }
						onChangeLetterSpacing={ ( value ) =>
							setAttributes( {
								imageTooltipLetterSpacing: value,
							} )
						}
						letterSpacingUnits={ imageTooltipLetterSpacingUnits }
						onChangeLetterSpacingUnit={ ( value ) =>
							setAttributes( {
								imageTooltipLetterSpacingUnits: value,
							} )
						}
						wordSpacing={ imageTooltipWordSpacing }
						onChangeWordSpacing={ ( value ) =>
							setAttributes( { imageTooltipWordSpacing: value } )
						}
						wordSpacingUnits={ imageTooltipWordSpacingUnits }
						onChangeWordSpacingUnit={ ( value ) =>
							setAttributes( {
								imageTooltipWordSpacingUnits: value,
							} )
						}
						deviceType={ deviceType }
					/>

					<ColorControl
						label={ __( 'Text Color', 'gslider-blocks' ) }
						color={ imageTooltipColor }
						onChangeColor={ ( value ) =>
							setAttributes( { imageTooltipColor: value } )
						}
						defaultColor=""
					/>

					<ColorControl
						label={ __( 'Background Color', 'gslider-blocks' ) }
						color={ imageTooltipBgColor }
						onChangeColor={ ( value ) =>
							setAttributes( { imageTooltipBgColor: value } )
						}
						defaultColor=""
					/>

					<SelectControls
						label={ __( 'Border Style', 'gslider-blocks' ) }
						options={ BORDER_STYLES }
						value={ imageTooltipBorder }
						onChange={ ( value ) =>
							setAttributes( { imageTooltipBorder: value } )
						}
					/>

					<ColorControl
						label={ __( 'Border Color', 'gslider-blocks' ) }
						color={ imageTooltipBorderColor }
						onChangeColor={ ( value ) =>
							setAttributes( { imageTooltipBorderColor: value } )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Border', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ imageTooltipBorderUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { imageTooltipBorderUnits: value } )
						}
						desktopSpacing={ imageTooltipBorderDesktop }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								imageTooltipBorderDesktop: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								imageTooltipBorderDesktopCssStyle: value,
							} )
						}
						tabletSpacing={ imageTooltipBorderTablet }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( { imageTooltipBorderTablet: value } )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								imageTooltipBorderTabletCssStyle: value,
							} )
						}
						mobileSpacing={ imageTooltipBorderMobile }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( { imageTooltipBorderMobile: value } )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								imageTooltipBorderMobileCssStyle: value,
							} )
						}
						isLinked={ imageTooltipBorderLink }
						onChangeLink={ ( value ) =>
							setAttributes( { imageTooltipBorderLink: value } )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Border Radius', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ imageTooltipBorderRadiusUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( {
								imageTooltipBorderRadiusUnits: value,
							} )
						}
						desktopSpacing={ imageTooltipBorderRadiusDesktop }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								imageTooltipBorderRadiusDesktop: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								imageTooltipBorderRadiusDesktopCssStyle: value,
							} )
						}
						tabletSpacing={ imageTooltipBorderRadiusTablet }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								imageTooltipBorderRadiusTablet: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								imageTooltipBorderRadiusTabletCssStyle: value,
							} )
						}
						mobileSpacing={ imageTooltipBorderRadiusMobile }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								imageTooltipBorderRadiusMobile: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								imageTooltipBorderRadiusMobileCssStyle: value,
							} )
						}
						isLinked={ imageTooltipBorderRadiusLink }
						onChangeLink={ ( value ) =>
							setAttributes( {
								imageTooltipBorderRadiusLink: value,
							} )
						}
					/>

					<ResponsiveSpacingControl
						label={ __( 'Padding', 'gslider-blocks' ) }
						deviceType={ deviceType }
						onChangeDeviceType={ ( value ) =>
							setAttributes( { deviceType: value } )
						}
						units={ imageTooltipPaddingUnits }
						onChangeUnits={ ( value ) =>
							setAttributes( { imageTooltipPaddingUnits: value } )
						}
						desktopSpacing={ imageTooltipPaddingDesktop }
						onChangeDesktopSpacing={ ( value ) =>
							setAttributes( {
								imageTooltipPaddingDesktop: value,
							} )
						}
						desktopSpacingStyle={ ( value ) =>
							setAttributes( {
								imageTooltipPaddingDesktopCssStyle: value,
							} )
						}
						tabletSpacing={ imageTooltipPaddingTablet }
						onChangeTabletSpacing={ ( value ) =>
							setAttributes( {
								imageTooltipPaddingTablet: value,
							} )
						}
						tabletSpacingStyle={ ( value ) =>
							setAttributes( {
								imageTooltipPaddingTabletCssStyle: value,
							} )
						}
						mobileSpacing={ imageTooltipPaddingMobile }
						onChangeMobileSpacing={ ( value ) =>
							setAttributes( {
								imageTooltipPaddingMobile: value,
							} )
						}
						mobileSpacingStyle={ ( value ) =>
							setAttributes( {
								imageTooltipPaddingMobileCssStyle: value,
							} )
						}
						isLinked={ imageTooltipPaddingLink }
						onChangeLink={ ( value ) =>
							setAttributes( { imageTooltipPaddingLink: value } )
						}
					/>

					<ResponsiveRangeControl
						label={ __( 'Top Position', 'gslider-blocks' ) }
						rangeValue={ imageTooltipTopPosition }
						onChangeValue={ ( value ) =>
							setAttributes( { imageTooltipTopPosition: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								imageTooltipTopPositionUnits: value,
							} )
						}
						deviceType={ deviceType }
						units={ imageTooltipTopPositionUnits }
						resetFallbackValue={ {
							'%': '50',
						} }
						unitBounds={ {
							'%': { min: 0, max: 100, step: 1 },
							px: { min: 0, max: 500, step: 1 },
						} }
					/>

					<ResponsiveRangeControl
						label={ __( 'Left Position', 'gslider-blocks' ) }
						rangeValue={ imageTooltipLeftPosition }
						onChangeValue={ ( value ) =>
							setAttributes( { imageTooltipLeftPosition: value } )
						}
						onUnitChange={ ( value ) =>
							setAttributes( {
								imageTooltipLeftPositionUnits: value,
							} )
						}
						deviceType={ deviceType }
						units={ imageTooltipLeftPositionUnits }
						resetFallbackValue={ {
							'%': '50',
						} }
						unitBounds={ {
							'%': { min: 0, max: 100, step: 1 },
							px: { min: 0, max: 500, step: 1 },
						} }
					/>
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
							px: '46',
							'%': '5',
							vh: '',
							vw: '',
							em: '2.875',
							rem: '2.875',
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
							px: '46',
							'%': '5',
							vh: '',
							vw: '',
							em: '2.875',
							rem: '2.875',
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
								px: { min: -200, max: 200, step: 1 },
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
								px: { min: -200, max: 200, step: 1 },
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
