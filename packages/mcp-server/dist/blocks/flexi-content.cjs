var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../src/blocks/flexi-content/flexi-content-entry.js
var flexi_content_entry_exports = {};
__export(flexi_content_entry_exports, {
  attributes: () => attributes_default,
  deprecated: () => deprecated_default,
  meta: () => block_default,
  save: () => Save,
  styling: () => styling_default
});
module.exports = __toCommonJS(flexi_content_entry_exports);

// ../../src/blocks/flexi-content/block.json
var block_default = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "gslider-blocks/flexi-content",
  version: "1.2.1",
  title: "Flexi Content",
  category: "gslider-blocks",
  description: "Display any content seamlessly in slide or carousel modes.",
  keywords: [
    "flexi",
    "content slider",
    "custom slider",
    "innerblocks",
    "carousel",
    "slideshow",
    "slider"
  ],
  example: {
    attributes: {
      preview: true
    },
    viewportWidth: 410
  },
  supports: {
    html: false,
    anchor: false,
    align: ["wide", "full"]
  },
  textdomain: "gslider-blocks",
  editorScript: [
    "file:./index.js",
    "gslider-blocks-swiper-script"
  ],
  editorStyle: [
    "file:./index.css",
    "gslider-blocks-swiper-style"
  ],
  style: [
    "file:./style-index.css",
    "gslider-blocks-swiper-style"
  ],
  viewScript: [
    "file:./view.js",
    "gslider-blocks-swiper-script"
  ]
};

// ../../src/blocks/flexi-content/attributes.js
var attributes = {
  blockId: {
    type: "string",
    default: ""
  },
  deviceType: {
    type: "string",
    default: "Desktop"
  },
  blockStyle: {
    type: "string",
    default: ""
  },
  /** Start Slider Settings */
  sliderType: {
    type: "string",
    default: "slider"
  },
  direction: {
    type: "string",
    default: "horizontal"
  },
  carouselPerColumn: {
    type: "object",
    default: {
      Desktop: 2,
      Tablet: 2,
      Mobile: 1
    }
  },
  carouselPerColumnGap: {
    type: "object",
    default: {
      Desktop: 20,
      Tablet: 20,
      Mobile: 0
    }
  },
  speed: {
    type: "object",
    default: {
      Desktop: 800,
      Tablet: 800,
      Mobile: 800
    }
  },
  autoplay: {
    type: "boolean",
    default: false
  },
  autoplayDelay: {
    type: "object",
    default: {
      Desktop: 1e3,
      Tablet: 1e3,
      Mobile: 1e3
    }
  },
  enableAutoplayProgress: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  autoplayProgressPosition: {
    type: "string",
    default: "bottom"
  },
  autoplayProgressColor: {
    type: "string",
    default: "#007cba"
  },
  autoplayProgressHeight: {
    type: "object",
    default: {
      Desktop: 3,
      Tablet: 3,
      Mobile: 3
    }
  },
  infiniteLoop: {
    type: "boolean",
    default: true
  },
  allowTouchMove: {
    type: "boolean",
    default: true
  },
  pauseOnHover: {
    type: "boolean",
    default: false
  },
  stopOnLastSlide: {
    type: "boolean",
    default: false
  },
  reverseDirection: {
    type: "boolean",
    default: false
  },
  slideEffect: {
    type: "string",
    default: "slide"
  },
  carouselEffect: {
    type: "string",
    default: "slide"
  },
  mousewheelControl: {
    type: "boolean",
    default: false
  },
  keyboardNavigation: {
    type: "boolean",
    default: false
  },
  paginationType: {
    type: "string",
    default: "bullets"
  },
  dynamicBullets: {
    type: "boolean",
    default: false
  },
  enableContinuousMarquee: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  marqueeSpeed: {
    type: "object",
    default: {
      Desktop: 5e3,
      Tablet: 5e3,
      Mobile: 5e3
    }
  },
  marqueePauseOnHover: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  /** End Slider Settings */
  /** Start Show/Hide Elements */
  showNavigation: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  showPagination: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  enableSlideLightbox: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  enableCursorFollower: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  cursorFollowerType: {
    type: "string",
    default: "icon"
  },
  cursorFollowerLeftIcon: {
    type: "string",
    default: "arrow-left"
  },
  cursorFollowerRightIcon: {
    type: "string",
    default: "arrow-right"
  },
  cursorFollowerLeftImageUrl: {
    type: "string",
    default: ""
  },
  cursorFollowerLeftImageAlt: {
    type: "string",
    default: "Previous"
  },
  cursorFollowerLeftImageID: {
    type: "string",
    default: ""
  },
  cursorFollowerRightImageUrl: {
    type: "string",
    default: ""
  },
  cursorFollowerRightImageAlt: {
    type: "string",
    default: "Next"
  },
  cursorFollowerRightImageID: {
    type: "string",
    default: ""
  },
  cursorFollowerDirectionalText: {
    type: "boolean",
    default: false
  },
  cursorFollowerText: {
    type: "string",
    default: "DRAG"
  },
  cursorFollowerLeftText: {
    type: "string",
    default: "PREV"
  },
  cursorFollowerRightText: {
    type: "string",
    default: "NEXT"
  },
  cursorFollowerFontWeight: {
    type: "string",
    default: "700"
  },
  cursorFollowerTextTransform: {
    type: "string",
    default: "uppercase"
  },
  cursorFollowerBg: {
    type: "string",
    default: "rgba(0, 0, 0, 0.75)"
  },
  cursorFollowerColor: {
    type: "string",
    default: "#ffffff"
  },
  cursorFollowerSize: {
    type: "object",
    default: {
      Desktop: "48",
      Tablet: "48",
      Mobile: "40"
    }
  },
  cursorFollowerInnerSize: {
    type: "object",
    default: {
      Desktop: "18",
      Tablet: "16",
      Mobile: "14"
    }
  },
  paginationPositionType: {
    type: "string",
    default: "inside"
  },
  /** End Show/Hide Elements */
  /** Layout & Content Setting */
  layoutHeightSwitcher: {
    type: "string",
    default: "fixed"
  },
  layoutHeight: {
    type: "object",
    default: {
      Desktop: "350",
      Tablet: "350",
      Mobile: "350"
    }
  },
  layoutHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  verticalHeight: {
    type: "object",
    default: {
      Desktop: "500",
      Tablet: "420",
      Mobile: "350"
    }
  },
  verticalHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  contentWidth: {
    type: "object",
    default: {
      Desktop: "100",
      Tablet: "100",
      Mobile: "100"
    }
  },
  contentWidthUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  contentAlignment: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  contentVerticalAlignment: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  contentHorizontalAlignment: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  /** End Layout & Content Setting */
  /** Start Content Padding */
  contentPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  contentPaddingDesktop: {
    type: "object",
    default: {
      top: "0",
      bottom: "0",
      left: "0",
      right: "0"
    }
  },
  contentPaddingDesktopCssStyle: {
    type: "string",
    default: ""
  },
  contentPaddingTablet: {
    type: "object",
    default: {
      top: "0",
      bottom: "0",
      left: "0",
      right: "0"
    }
  },
  contentPaddingTabletCssStyle: {
    type: "string",
    default: ""
  },
  contentPaddingMobile: {
    type: "object",
    default: {
      top: "0",
      bottom: "0",
      left: "0",
      right: "0"
    }
  },
  contentPaddingMobileCssStyle: {
    type: "string",
    default: ""
  },
  contentPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Content Padding */
  /** Start Navigation Custom Arrows */
  navigationArrowsIconSwitcher: {
    type: "boolean",
    default: false
  },
  navigationArrowsIconLeftAlign: {
    type: "string",
    default: "icon"
  },
  navigationArrowsIconLeft: {
    type: "string",
    default: "arrow-left"
  },
  navigationArrowsIconLeftImageUrl: {
    type: "string",
    default: ""
  },
  navigationArrowsIconLeftImageAlt: {
    type: "string",
    default: "Left Arrow"
  },
  navigationArrowsIconLeftImageID: {
    type: "string",
    default: ""
  },
  navigationArrowsIconRightAlign: {
    type: "string",
    default: "icon"
  },
  navigationArrowsIconRight: {
    type: "string",
    default: "arrow-right"
  },
  navigationArrowsIconRightImageUrl: {
    type: "string",
    default: ""
  },
  navigationArrowsIconRightImageAlt: {
    type: "string",
    default: "Right Arrow"
  },
  navigationArrowsIconRightImageID: {
    type: "string",
    default: ""
  },
  /** End Navigation Custom Arrows */
  /** Start Navigation Arrow Size */
  navigationArrowSize: {
    type: "object",
    default: {
      Desktop: "16",
      Tablet: "16",
      Mobile: "14"
    }
  },
  navigationArrowSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Navigation Arrow Size */
  /** Start Navigation Arrow Color */
  navigationArrowColorSwitcher: {
    type: "string",
    default: "normal"
  },
  navigationArrowColor: {
    type: "string",
    default: "#333333"
  },
  navigationArrowColorHover: {
    type: "string",
    default: ""
  },
  /** End Navigation Arrow Color */
  /** Start Navigation Arrow Background */
  navigationArrowNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  navigationArrowNormalClassicColor: {
    type: "string",
    default: "#d2d2d2c7"
  },
  navigationArrowNormalGradientColor: {
    type: "string",
    default: null
  },
  navigationArrowNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  navigationArrowNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  navigationArrowHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  navigationArrowHoverClassicColor: {
    type: "string",
    default: "#787878b8"
  },
  navigationArrowHoverGradientColor: {
    type: "string",
    default: null
  },
  navigationArrowHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  navigationArrowHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Navigation Arrow Background */
  /** Start Navigation Arrow Width & Height */
  navigationArrowWidth: {
    type: "object",
    default: {
      Desktop: "46",
      Tablet: "46",
      Mobile: "32"
    }
  },
  navigationArrowWidthUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  navigationArrowHeight: {
    type: "object",
    default: {
      Desktop: "46",
      Tablet: "46",
      Mobile: "32"
    }
  },
  navigationArrowHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Navigation Arrow Width & Height */
  /** Start Navigation Arrow Border */
  navigationArrowBorder: {
    type: "string",
    default: "none"
  },
  navigationArrowBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  navigationArrowBorderColor: {
    type: "string",
    default: ""
  },
  navigationArrowBorderHoverColor: {
    type: "string",
    default: ""
  },
  navigationArrowBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  navigationArrowDesktopBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  navigationArrowDesktopBorderCssStyle: {
    type: "string",
    default: ""
  },
  navigationArrowTabletBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  navigationArrowTabletBorderCssStyle: {
    type: "string",
    default: ""
  },
  navigationArrowMobileBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  navigationArrowMobileBorderCssStyle: {
    type: "string",
    default: ""
  },
  navigationArrowBorderLink: {
    type: "boolean",
    default: true
  },
  /** End Navigation Arrow Border */
  /** Start Navigation Arrow Border Radius */
  navigationArrowBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  navigationArrowDesktopBorderRadius: {
    type: "object",
    default: {
      top: "50",
      bottom: "50",
      left: "50",
      right: "50"
    }
  },
  navigationArrowDesktopBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  navigationArrowTabletBorderRadius: {
    type: "object",
    default: {
      top: "50",
      bottom: "50",
      left: "50",
      right: "50"
    }
  },
  navigationArrowTabletBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  navigationArrowMobileBorderRadius: {
    type: "object",
    default: {
      top: "50",
      bottom: "50",
      left: "50",
      right: "50"
    }
  },
  navigationArrowMobileBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  navigationArrowBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Navigation Arrow Border Radius */
  /** Start Navigation Arrow Box Shadow */
  navigationArrowBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  navigationArrowBoxShadowValues: {
    type: "array",
    default: []
  },
  navigationArrowBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  navigationArrowBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  navigationArrowBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  },
  /** End Navigation Arrow Box Shadow */
  /** Start Navigation Arrow Position */
  navigationArrowPositionType: {
    type: "string",
    default: "inside"
  },
  navigationArrowPosition: {
    type: "string",
    default: "center"
  },
  navigationArrowDirection: {
    type: "string",
    default: "row"
  },
  navigationArrowPositionTopOffset: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  navigationArrowPositionTopOffsetUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  navigationArrowPositionLeftOffset: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  navigationArrowPositionLeftOffsetUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  navigationArrowPositionRightOffset: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  navigationArrowPositionRightOffsetUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  navigationArrowPositionBottomOffset: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  navigationArrowPositionBottomOffsetUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  navigationArrowGap: {
    type: "object",
    default: {
      Desktop: "10",
      Tablet: "10",
      Mobile: "10"
    }
  },
  navigationArrowGapUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  navigationArrowPositionOutsidePadding: {
    type: "object",
    default: {
      Desktop: "60",
      Tablet: "60",
      Mobile: "45"
    }
  },
  navigationArrowPositionOutsidePaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Navigation Arrow Position */
  /** Start Pagination Dots Margin */
  paginationDotsMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  paginationDotsDesktopMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationDotsDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  paginationDotsTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationDotsTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  paginationDotsMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationDotsMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  paginationDotsMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Pagination Dots Margin */
  /** Start Pagination Dots Position */
  paginationDotsPosition: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  paginationDotsPositionUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  paginationProgressbarPosition: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  paginationProgressbarPositionUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  /** End Pagination Dots Position */
  /** Start Pagination Outside Offset */
  paginationOutsideOffset: {
    type: "object",
    default: {
      Desktop: "30",
      Tablet: "30",
      Mobile: "30"
    }
  },
  paginationOutsideOffsetUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Pagination Outside Offset */
  /** Start Pagination Dots Style */
  paginationDotsSwitcher: {
    type: "string",
    default: "normal"
  },
  paginationNormalDotsBgColor: {
    type: "string",
    default: "#333333"
  },
  paginationActiveDotsBgColor: {
    type: "string",
    default: ""
  },
  paginationNormalDotsWidth: {
    type: "object",
    default: {
      Desktop: "8",
      Tablet: "8",
      Mobile: "8"
    }
  },
  paginationNormalDotsWidthUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  paginationNormalDotsHeight: {
    type: "object",
    default: {
      Desktop: "8",
      Tablet: "8",
      Mobile: "8"
    }
  },
  paginationNormalDotsHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Pagination Dots Style */
  /** Start Pagination Dots Border */
  paginationNormalDotsBorder: {
    type: "string",
    default: "none"
  },
  paginationNormalDotsBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  paginationNormalDotsBorderColor: {
    type: "string",
    default: ""
  },
  paginationNormalDotsBorderHoverColor: {
    type: "string"
  },
  paginationNormalDotsBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  paginationNormalDotsDesktopBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationNormalDotsDesktopBorderCssStyle: {
    type: "string",
    default: ""
  },
  paginationNormalDotsTabletBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationNormalDotsTabletBorderCssStyle: {
    type: "string",
    default: ""
  },
  paginationNormalDotsMobileBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationNormalDotsMobileBorderCssStyle: {
    type: "string",
    default: ""
  },
  paginationNormalDotsBorderLink: {
    type: "boolean",
    default: true
  },
  /** End Pagination Dots Border */
  /** Start Pagination Dots Border Radius */
  paginationNormalDotsBorderRadius: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  paginationNormalDotsBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  paginationNormalDotsDesktopBorderRadius: {
    type: "object",
    default: {
      top: "50",
      bottom: "50",
      left: "50",
      right: "50"
    }
  },
  paginationNormalDotsDesktopBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  paginationNormalDotsTabletBorderRadius: {
    type: "object",
    default: {
      top: "50",
      bottom: "50",
      left: "50",
      right: "50"
    }
  },
  paginationNormalDotsTabletBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  paginationNormalDotsMobileBorderRadius: {
    type: "object",
    default: {
      top: "50",
      bottom: "50",
      left: "50",
      right: "50"
    }
  },
  paginationNormalDotsMobileBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  paginationNormalDotsBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Pagination Dots Border Radius */
  /** Start Active Pagination Dots Width & Height */
  paginationActiveDotsWidth: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  paginationActiveDotsWidthUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  paginationActiveDotsHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  paginationActiveDotsHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Active Pagination Dots Width & Height */
  /** Start Active Pagination Dots Border */
  paginationActiveDotsBorder: {
    type: "string",
    default: "none"
  },
  paginationActiveDotsBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  paginationActiveDotsBorderColor: {
    type: "string",
    default: ""
  },
  paginationActiveDotsBorderHoverColor: {
    type: "string"
  },
  paginationActiveDotsBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  paginationActiveDotsDesktopBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationActiveDotsDesktopBorderCssStyle: {
    type: "string",
    default: ""
  },
  paginationActiveDotsTabletBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationActiveDotsTabletBorderCssStyle: {
    type: "string",
    default: ""
  },
  paginationActiveDotsMobileBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationActiveDotsMobileBorderCssStyle: {
    type: "string",
    default: ""
  },
  paginationActiveDotsBorderLink: {
    type: "boolean",
    default: true
  },
  /** End Active Pagination Dots Border */
  /** Start Active Pagination Dots Border Radius */
  paginationActiveDotsBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  paginationActiveDotsDesktopBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationActiveDotsDesktopBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  paginationActiveDotsTabletBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationActiveDotsTabletBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  paginationActiveDotsMobileBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  paginationActiveDotsMobileBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  paginationActiveDotsBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Active Pagination Dots Border Radius */
  /** Start Fraction Typography */
  paginationFractionFontFamily: {
    type: "string",
    default: ""
  },
  paginationFractionFontSize: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  paginationFractionFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  paginationFractionFontWeight: {
    type: "string",
    default: ""
  },
  paginationFractionFontStyle: {
    type: "string",
    default: ""
  },
  paginationFractionTextTransform: {
    type: "string",
    default: ""
  },
  paginationFractionTextDecoration: {
    type: "string",
    default: ""
  },
  paginationFractionLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  paginationFractionLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  paginationFractionLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  paginationFractionLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  paginationFractionWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  paginationFractionWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Fraction Typography */
  /** Start Fraction Color */
  paginationFractionColorSwitcher: {
    type: "string",
    default: "normal"
  },
  paginationFractionColor: {
    type: "string",
    default: ""
  },
  paginationFractionColorHover: {
    type: "string",
    default: ""
  },
  /** End Fraction Color */
  /** Start Progressbar */
  paginationProgressbarBGColorSwitcher: {
    type: "string",
    default: "normal"
  },
  paginationProgressbarBGColor: {
    type: "string",
    default: ""
  },
  paginationProgressbarBGActiveColor: {
    type: "string"
  },
  paginationProgressbarHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  paginationProgressbarHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Progressbar */
  /** Start Shape Dividers */
  enableTopDivider: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  topDividerShape: {
    type: "string",
    default: "wave-1"
  },
  topDividerColor: {
    type: "string",
    default: "#ffffff"
  },
  topDividerHeight: {
    type: "object",
    default: {
      Desktop: "50",
      Tablet: "50",
      Mobile: "50"
    }
  },
  topDividerHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  topDividerOpacity: {
    type: "object",
    default: {
      Desktop: 1,
      Tablet: 1,
      Mobile: 1
    }
  },
  topDividerFlip: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  topDividerInvert: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  enableBottomDivider: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  bottomDividerShape: {
    type: "string",
    default: "wave-1"
  },
  bottomDividerColor: {
    type: "string",
    default: "#ffffff"
  },
  bottomDividerHeight: {
    type: "object",
    default: {
      Desktop: "50",
      Tablet: "50",
      Mobile: "50"
    }
  },
  bottomDividerHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  bottomDividerOpacity: {
    type: "object",
    default: {
      Desktop: 1,
      Tablet: 1,
      Mobile: 1
    }
  },
  bottomDividerFlip: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  bottomDividerInvert: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  /** End Shape Dividers */
  /** Start Global Setting */
  /** Start Global Margin */
  globalMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  globalMarginDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalMarginDesktopCssStyle: {
    type: "string",
    default: ""
  },
  globalMarginTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalMarginTabletCssStyle: {
    type: "string",
    default: ""
  },
  globalMarginMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalMarginMobileCssStyle: {
    type: "string",
    default: ""
  },
  globalMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Global Margin */
  /** Start Global Padding */
  globalPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  globalPaddingDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalPaddingDesktopCssStyle: {
    type: "string",
    default: ""
  },
  globalPaddingTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalPaddingTabletCssStyle: {
    type: "string",
    default: ""
  },
  globalPaddingMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalPaddingMobileCssStyle: {
    type: "string",
    default: ""
  },
  globalPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Global Padding */
  /** Start Global Z-Index */
  globalZIndex: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  globalID: {
    type: "string",
    default: ""
  },
  globalClass: {
    type: "string",
    default: ""
  },
  /** End Global Z-Index */
  /** Start Global Background */
  globalNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  globalNormalClassicColor: {
    type: "string",
    default: ""
  },
  globalNormalGradientColor: {
    type: "string",
    default: null
  },
  globalNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  globalNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  globalNormalBackgroundImageUrl: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  globalNormalBackgroundImagePosition: {
    type: "object",
    default: {
      Desktop: { x: 0.5, y: 0.5 },
      Tablet: { x: 0.5, y: 0.5 },
      Mobile: { x: 0.5, y: 0.5 }
    }
  },
  globalNormalBackgroundImageAttachment: {
    type: "object",
    default: {
      Desktop: "scroll",
      Tablet: "scroll",
      Mobile: "scroll"
    }
  },
  globalNormalBackgroundImageRepeat: {
    type: "object",
    default: {
      Desktop: "no-repeat",
      Tablet: "no-repeat",
      Mobile: "no-repeat"
    }
  },
  globalNormalBackgroundImageSize: {
    type: "object",
    default: {
      Desktop: "cover",
      Tablet: "cover",
      Mobile: "cover"
    }
  },
  globalHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  globalHoverClassicColor: {
    type: "string",
    default: ""
  },
  globalHoverGradientColor: {
    type: "string",
    default: null
  },
  globalHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  globalHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  globalHoverBackgroundImageUrl: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  globalHoverBackgroundImagePosition: {
    type: "object",
    default: {
      Desktop: { x: 0.5, y: 0.5 },
      Tablet: { x: 0.5, y: 0.5 },
      Mobile: { x: 0.5, y: 0.5 }
    }
  },
  globalHoverBackgroundImageAttachment: {
    type: "object",
    default: {
      Desktop: "scroll",
      Tablet: "scroll",
      Mobile: "scroll"
    }
  },
  globalHoverBackgroundImageRepeat: {
    type: "object",
    default: {
      Desktop: "no-repeat",
      Tablet: "no-repeat",
      Mobile: "no-repeat"
    }
  },
  globalHoverBackgroundImageSize: {
    type: "object",
    default: {
      Desktop: "cover",
      Tablet: "cover",
      Mobile: "cover"
    }
  },
  /** End Global Background */
  /** Start Global Border */
  globalBorder: {
    type: "string",
    default: "none"
  },
  globalBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  globalBorderColor: {
    type: "string"
  },
  globalBorderHoverColor: {
    type: "string"
  },
  globalBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  globalBorderDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalBorderDesktopCssStyle: {
    type: "string",
    default: ""
  },
  globalBorderTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalBorderTabletCssStyle: {
    type: "string",
    default: ""
  },
  globalBorderMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalBorderMobileCssStyle: {
    type: "string",
    default: ""
  },
  globalBorderLink: {
    type: "boolean",
    default: true
  },
  globalBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  globalBorderRadiusDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalBorderRadiusDesktopCssStyle: {
    type: "string",
    default: ""
  },
  globalBorderRadiusTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalBorderRadiusTabletCssStyle: {
    type: "string",
    default: ""
  },
  globalBorderRadiusMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  globalBorderRadiusMobileCssStyle: {
    type: "string",
    default: ""
  },
  globalBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  globalBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  globalBoxShadowValues: {
    type: "array",
    default: []
  },
  globalBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  globalBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  globalBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  }
  /** End Global Border */
};
var attributes_default = attributes;

// ../../src/blocks/flexi-content/save.js
var import_block_editor = require("@wordpress/block-editor");

// ../../src/components/icon-picker/components/icon-picker/controls/renderIcon.js
var import_i18n = require("@wordpress/i18n");

// ../../src/components/icon-picker/components/icon-picker/controls/parseIcon.js
function parseSVG(svg) {
  svg = svg.replace("far ", "");
  svg = svg.replace("fas ", "");
  svg = svg.replace("fab ", "");
  svg = svg.replace("fa-", "");
  svg = svg.replace("fa ", "");
  return svg;
}
var parseIcon_default = parseSVG;

// ../../src/components/icon-picker/components/icon-picker/controls/renderIcon.js
var import_jsx_runtime = require("react/jsx-runtime");
var getIconsUrl = () => {
  if (typeof window !== "undefined" && window.GSliderBlocksData) {
    if (window.GSliderBlocksData.iconsUrl) {
      return window.GSliderBlocksData.iconsUrl;
    }
    if (window.GSliderBlocksData.pluginUrl) {
      return window.GSliderBlocksData.pluginUrl + "assets/icon-library/font-awesome.json";
    }
  }
  return "/wp-content/plugins/gslider-blocks/assets/icon-library/font-awesome.json";
};
var getDataFromLocalStorage = () => {
  let data = localStorage.getItem("iconData");
  data = data ? JSON.parse(data) : null;
  return data;
};
var fetchFromJson = async () => {
  try {
    const iconsUrl = getIconsUrl();
    const response = await fetch(iconsUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    localStorage.setItem("iconData", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(
      (0, import_i18n.__)("Error fetching icon data:", "gslider-blocks"),
      error
    );
    return null;
  }
};
function generateSvg(svgArgData) {
  const svgData = svgArgData.svg.solid;
  const width = svgData.width;
  const height = svgData.height;
  const viewBox = svgData.viewBox;
  const elements = svgData.elements;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}">
`;
  elements.forEach((element) => {
    const type = element.type;
    const attributes2 = element.attributes;
    svg += `<${type}`;
    for (const attr in attributes2) {
      if (attributes2.hasOwnProperty(attr)) {
        svg += ` ${attr}="${attributes2[attr]}"`;
      }
    }
    svg += " />\n";
  });
  svg += "</svg>";
  return svg;
}
function renderSVG(svg, setAttributes = false, extraProps = {}) {
  svg = parseIcon_default(svg);
  let data = getDataFromLocalStorage();
  if (!data) {
    fetchFromJson().then((fetchedData) => {
      data = fetchedData;
    });
  }
  const svgIcon = data;
  if (!svgIcon) {
    return;
  }
  let fontAwesome;
  fontAwesome = svgIcon[svg];
  if (!fontAwesome) {
    return null;
  }
  const fontAwesomeSvg = fontAwesome.svg?.brands ? fontAwesome.svg.brands : fontAwesome.svg.solid;
  const viewBox = `0 0 ${fontAwesomeSvg.width} ${fontAwesomeSvg.height}`;
  const path = fontAwesomeSvg.path;
  let align = null;
  if (fontAwesome.hasOwnProperty("custom_icons") && fontAwesome.custom_icons) {
    return generateSvg(fontAwesome);
  }
  switch (svg) {
    case "align-center":
      align = {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M4 2H14V0H4V2ZM0 7H18V5H0V7ZM4 12H14V10H4V12Z"
      };
      break;
    case "align-left":
      align = {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10 2H0V0H10V2ZM18 7H0V5H18V7ZM10 12H0V10H10V12Z"
      };
      break;
    case "align-right":
      align = {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8 2H18V0H8V2ZM0 7H18V5H0V7ZM8 12H18V10H8V12Z"
      };
      break;
    case "align-justify":
      align = {
        d: "M0 0H18V2H0V0ZM0 5.00001H18V7.00001H0V5.00001ZM0 10H18V12H0V10Z"
      };
      break;
  }
  if (align) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "svg",
      {
        width: "18",
        height: "12",
        viewBox: "0 0 18 12",
        xmlns: "http://www.w3.org/2000/svg",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { ...align })
      }
    );
  }
  return !setAttributes || "not_set" === setAttributes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      xmlns: "https://www.w3.org/2000/svg",
      viewBox,
      ...extraProps,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: path })
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      width: "20",
      height: "20",
      xmlns: "https://www.w3.org/2000/svg",
      viewBox,
      ...extraProps,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: path })
    }
  );
}
var renderIcon_default = renderSVG;

// ../../src/constants/shapeDividers.js
var import_i18n2 = require("@wordpress/i18n");
var import_jsx_runtime2 = require("react/jsx-runtime");
var SHAPE_DIVIDER_OPTIONS = [
  { label: (0, import_i18n2.__)("Wave", "gslider-blocks"), value: "wave-1" },
  { label: (0, import_i18n2.__)("Double Wave", "gslider-blocks"), value: "wave-2" },
  { label: (0, import_i18n2.__)("Curve", "gslider-blocks"), value: "curve" },
  {
    label: (0, import_i18n2.__)("Curve Asymmetric", "gslider-blocks"),
    value: "curve-asymmetric"
  },
  { label: (0, import_i18n2.__)("Tilt", "gslider-blocks"), value: "tilt" },
  { label: (0, import_i18n2.__)("Triangle", "gslider-blocks"), value: "triangle" },
  { label: (0, import_i18n2.__)("Arrow", "gslider-blocks"), value: "arrow" },
  { label: (0, import_i18n2.__)("Mountains", "gslider-blocks"), value: "mountains" },
  { label: (0, import_i18n2.__)("Zigzag", "gslider-blocks"), value: "zigzag" },
  { label: (0, import_i18n2.__)("Scallops", "gslider-blocks"), value: "scallops" }
];
var SHAPE_DIVIDER_POSITION = [
  { label: (0, import_i18n2.__)("Top", "gslider-blocks"), value: "top" },
  { label: (0, import_i18n2.__)("Bottom", "gslider-blocks"), value: "bottom" }
];
var SHAPE_DIVIDER_PATHS = {
  "wave-1": "M0,0 V40 C150,90 350,90 500,50 C650,10 850,10 1000,60 V0 Z",
  "wave-2": "M0,0 V50 Q125,100 250,50 T500,50 T750,50 T1000,50 V0 Z",
  curve: "M0,0 Q500,200 1000,0 Z",
  "curve-asymmetric": "M0,0 Q300,200 1000,0 Z",
  tilt: "M0,0 H1000 L0,100 Z",
  triangle: "M0,0 H1000 L500,100 Z",
  arrow: "M0,0 H1000 V40 H530 L500,100 L470,40 H0 Z",
  mountains: "M0,0 H1000 V60 L850,20 L700,70 L520,10 L350,80 L180,30 L0,70 Z",
  zigzag: "M0,0 H1000 V30 L950,70 L900,30 L850,70 L800,30 L750,70 L700,30 L650,70 L600,30 L550,70 L500,30 L450,70 L400,30 L350,70 L300,30 L250,70 L200,30 L150,70 L100,30 L50,70 L0,30 Z",
  scallops: "M0,0 H1000 V50 A62.5,40 0 0 1 875,50 A62.5,40 0 0 1 750,50 A62.5,40 0 0 1 625,50 A62.5,40 0 0 1 500,50 A62.5,40 0 0 1 375,50 A62.5,40 0 0 1 250,50 A62.5,40 0 0 1 125,50 A62.5,40 0 0 1 0,50 Z"
};
var renderShapeDivider = (position, shape) => SHAPE_DIVIDER_PATHS[shape] ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "div",
  {
    className: `gslider-shape-divider gslider-shape-divider-${position}`,
    "aria-hidden": "true",
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1000 100",
        preserveAspectRatio: "none",
        focusable: "false",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              className: "gslider-shape-divider-fill",
              d: SHAPE_DIVIDER_PATHS[shape]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              className: "gslider-shape-divider-fill-invert",
              fillRule: "evenodd",
              d: `M0,0 H1000 V100 H0 Z ${SHAPE_DIVIDER_PATHS[shape]}`
            }
          )
        ]
      }
    )
  }
) : null;

// ../../src/blocks/flexi-content/save.js
var import_jsx_runtime3 = require("react/jsx-runtime");
function Save({ attributes: attributes2 }) {
  const {
    blockId,
    sliderType,
    carouselPerColumn,
    carouselPerColumnGap,
    speed,
    autoplay,
    autoplayDelay,
    enableAutoplayProgress,
    autoplayProgressPosition,
    infiniteLoop,
    allowTouchMove,
    pauseOnHover,
    stopOnLastSlide,
    reverseDirection,
    direction,
    carouselEffect,
    slideEffect,
    mousewheelControl,
    keyboardNavigation,
    paginationType,
    dynamicBullets,
    enableContinuousMarquee,
    marqueeSpeed,
    marqueePauseOnHover,
    showNavigation,
    showPagination,
    paginationPositionType,
    globalID,
    globalClass,
    navigationArrowPositionType,
    navigationArrowPosition,
    navigationArrowsIconSwitcher,
    navigationArrowsIconLeftAlign,
    navigationArrowsIconLeft,
    navigationArrowsIconLeftImageUrl,
    navigationArrowsIconLeftImageAlt,
    navigationArrowsIconRightAlign,
    navigationArrowsIconRight,
    navigationArrowsIconRightImageUrl,
    navigationArrowsIconRightImageAlt,
    layoutHeightSwitcher,
    enableTopDivider,
    topDividerShape,
    enableBottomDivider,
    bottomDividerShape,
    enableSlideLightbox,
    enableCursorFollower,
    cursorFollowerType,
    cursorFollowerLeftIcon,
    cursorFollowerRightIcon,
    cursorFollowerLeftImageUrl,
    cursorFollowerLeftImageAlt,
    cursorFollowerRightImageUrl,
    cursorFollowerRightImageAlt,
    cursorFollowerDirectionalText,
    cursorFollowerText,
    cursorFollowerLeftText,
    cursorFollowerRightText
  } = attributes2;
  const marqueeEnabled = {
    Mobile: !!enableContinuousMarquee?.Mobile,
    Tablet: !!enableContinuousMarquee?.Tablet,
    Desktop: !!enableContinuousMarquee?.Desktop
  };
  const anyMarqueeEnabled = marqueeEnabled.Mobile || marqueeEnabled.Tablet || marqueeEnabled.Desktop;
  const marqueeClasses = ["Desktop", "Tablet", "Mobile"].filter((device) => marqueeEnabled[device]).flatMap((device) => {
    const slug = device.toLowerCase();
    return marqueePauseOnHover?.[device] === false ? [`gslider-marquee-${slug}`] : [
      `gslider-marquee-${slug}`,
      `gslider-marquee-pause-${slug}`
    ];
  }).join(" ");
  const blockProps = import_block_editor.useBlockProps.save({
    className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}${marqueeClasses ? ` ${marqueeClasses}` : ""}`
  });
  const innerBlocksProps = import_block_editor.useInnerBlocksProps.save({
    className: "swiper-wrapper gslider-swiper-wrapper"
  });
  const getBreakpointAutoplay = (device) => {
    if (marqueeEnabled[device]) {
      return {
        delay: 0,
        waitForTransition: true,
        pauseOnMouseEnter: false,
        disableOnInteraction: false,
        reverseDirection
      };
    }
    return autoplay ? { delay: autoplayDelay?.[device] || 1e3 } : false;
  };
  const sliderEffect = sliderType === "carousel" ? carouselEffect : slideEffect;
  const navigationEnabled = {
    Mobile: !!showNavigation?.Mobile,
    Tablet: !!showNavigation?.Tablet,
    Desktop: !!showNavigation?.Desktop
  };
  const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
  const paginationEnabled = {
    Mobile: !!showPagination?.Mobile,
    Tablet: !!showPagination?.Tablet,
    Desktop: !!showPagination?.Desktop
  };
  const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
  const showAutoplayProgress = autoplay && (enableAutoplayProgress?.Desktop || enableAutoplayProgress?.Tablet || enableAutoplayProgress?.Mobile);
  const anyTopDivider = enableTopDivider?.Desktop || enableTopDivider?.Tablet || enableTopDivider?.Mobile;
  const anyBottomDivider = enableBottomDivider?.Desktop || enableBottomDivider?.Tablet || enableBottomDivider?.Mobile;
  const lightboxDevices = ["Desktop", "Tablet", "Mobile"].filter((device) => enableSlideLightbox?.[device] === true).join(" ");
  const cursorFollowerDevices = ["Desktop", "Tablet", "Mobile"].filter((device) => enableCursorFollower?.[device] === true).join(" ");
  const swiperSettings = JSON.stringify({
    // Marquee needs the slide effect, other effects can not move in a line
    effect: anyMarqueeEnabled ? "slide" : sliderEffect,
    // Responsive breakpoints for Desktop, Tablet, and Mobile
    breakpoints: {
      0: {
        ...sliderType === "carousel" && {
          slidesPerView: carouselPerColumn?.Mobile || 1,
          spaceBetween: carouselPerColumnGap?.Mobile || 0
        },
        speed: marqueeEnabled.Mobile ? marqueeSpeed?.Mobile || 5e3 : speed?.Mobile || 800,
        autoplay: getBreakpointAutoplay("Mobile"),
        navigation: { enabled: navigationEnabled.Mobile },
        pagination: { enabled: paginationEnabled.Mobile }
      },
      768: {
        ...sliderType === "carousel" && {
          slidesPerView: carouselPerColumn?.Tablet || 2,
          spaceBetween: carouselPerColumnGap?.Tablet ?? 20
        },
        speed: marqueeEnabled.Tablet ? marqueeSpeed?.Tablet || 5e3 : speed?.Tablet || 800,
        autoplay: getBreakpointAutoplay("Tablet"),
        navigation: { enabled: navigationEnabled.Tablet },
        pagination: { enabled: paginationEnabled.Tablet }
      },
      1025: {
        ...sliderType === "carousel" && {
          slidesPerView: carouselPerColumn?.Desktop || 2,
          spaceBetween: carouselPerColumnGap?.Desktop ?? 20
        },
        speed: marqueeEnabled.Desktop ? marqueeSpeed?.Desktop || 5e3 : speed?.Desktop || 800,
        autoplay: getBreakpointAutoplay("Desktop"),
        navigation: { enabled: navigationEnabled.Desktop },
        pagination: { enabled: paginationEnabled.Desktop }
      }
    },
    ...direction === "vertical" && { direction: "vertical" },
    // Vertical slides use the fixed height, autoHeight does not work with it
    ...layoutHeightSwitcher === "adapt" && direction !== "vertical" && {
      autoHeight: true
    },
    // Common settings
    loop: anyMarqueeEnabled || infiniteLoop,
    autoplay: autoplay || anyMarqueeEnabled ? {
      pauseOnMouseEnter: anyMarqueeEnabled ? false : pauseOnHover,
      disableOnInteraction: false,
      stopOnLastSlide,
      reverseDirection
    } : false,
    allowTouchMove,
    mousewheel: mousewheelControl,
    keyboard: keyboardNavigation ? {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: false
    } : false,
    navigation: {
      enabled: anyNavigationEnabled,
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      enabled: anyPaginationEnabled,
      el: `.${blockId} .swiper-pagination-flexi-content`,
      type: paginationType,
      dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
      clickable: true
    },
    // Creative effect settings if needed
    ...slideEffect === "creative" && {
      creativeEffect: {
        prev: { shadow: true, translate: [0, 0, -400] },
        next: {
          translate: direction === "vertical" ? [0, "100%", 0] : ["100%", 0, 0]
        }
      }
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      ...blockProps,
      "data-swiper-settings": swiperSettings,
      ...lightboxDevices && {
        "data-slide-lightbox": lightboxDevices
      },
      ...cursorFollowerDevices && {
        "data-cursor-follower": cursorFollowerDevices
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `swiper ${globalClass}`,
            ...globalID && { id: globalID },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ...innerBlocksProps }),
              cursorFollowerDevices && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-cursor-follower", "aria-hidden": "true", children: [
                (!cursorFollowerType || cursorFollowerType === "icon") && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-cursor-icon gslider-cursor-left", children: renderIcon_default(
                    cursorFollowerLeftIcon || "arrow-left"
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-cursor-icon gslider-cursor-right", children: renderIcon_default(
                    cursorFollowerRightIcon || "arrow-right"
                  ) })
                ] }),
                cursorFollowerType === "image" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                  cursorFollowerLeftImageUrl && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-cursor-image gslider-cursor-left", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: cursorFollowerLeftImageUrl,
                      alt: cursorFollowerLeftImageAlt || "Previous"
                    }
                  ) }),
                  cursorFollowerRightImageUrl && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-cursor-image gslider-cursor-right", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: cursorFollowerRightImageUrl,
                      alt: cursorFollowerRightImageAlt || "Next"
                    }
                  ) })
                ] }),
                cursorFollowerType === "text" && (cursorFollowerDirectionalText ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "gslider-cursor-text gslider-cursor-left", children: cursorFollowerLeftText || "PREV" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "gslider-cursor-text gslider-cursor-right", children: cursorFollowerRightText || "NEXT" })
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "gslider-cursor-text", children: cursorFollowerText || "DRAG" }))
              ] }),
              showAutoplayProgress && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: `gslider-autoplay-progress ${autoplayProgressPosition}`,
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-autoplay-progress-fill" })
                }
              ),
              anyTopDivider && renderShapeDivider("top", topDividerShape),
              anyBottomDivider && renderShapeDivider("bottom", bottomDividerShape),
              anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "div",
                {
                  className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "div",
                      {
                        className: "swiper-button-prev",
                        role: "button",
                        tabIndex: 0,
                        "aria-label": "Previous slide"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "div",
                      {
                        className: "swiper-button-next",
                        role: "button",
                        tabIndex: 0,
                        "aria-label": "Next slide"
                      }
                    )
                  ]
                }
              ) }),
              anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "div",
                {
                  className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "div",
                      {
                        className: "swiper-button-prev",
                        role: "button",
                        tabIndex: 0,
                        "aria-label": "Previous slide",
                        children: navigationArrowsIconLeftAlign === "image" && navigationArrowsIconLeftImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: navigationArrowsIconLeftImageUrl,
                            alt: navigationArrowsIconLeftImageAlt
                          }
                        ) : renderIcon_default(navigationArrowsIconLeft)
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "div",
                      {
                        className: "swiper-button-next",
                        role: "button",
                        tabIndex: 0,
                        "aria-label": "Next slide",
                        children: navigationArrowsIconRightAlign === "image" && navigationArrowsIconRightImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: navigationArrowsIconRightImageUrl,
                            alt: navigationArrowsIconRightImageAlt
                          }
                        ) : renderIcon_default(navigationArrowsIconRight)
                      }
                    )
                  ]
                }
              ),
              anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-pagination swiper-pagination-flexi-content",
                  "aria-label": "Carousel pagination"
                }
              ) })
            ]
          }
        ),
        anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-prev",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Previous slide"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-next",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Next slide"
                }
              )
            ]
          }
        ) }),
        anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-prev",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Previous slide",
                  children: navigationArrowsIconLeftAlign === "image" && navigationArrowsIconLeftImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: navigationArrowsIconLeftImageAlt
                    }
                  ) : renderIcon_default(navigationArrowsIconLeft)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-next",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Next slide",
                  children: navigationArrowsIconRightAlign === "image" && navigationArrowsIconRightImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconRightImageUrl,
                      alt: navigationArrowsIconRightImageAlt
                    }
                  ) : renderIcon_default(navigationArrowsIconRight)
                }
              )
            ]
          }
        ),
        anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-pagination swiper-pagination-flexi-content swiper-pagination-${blockId}`,
            "aria-label": "Carousel pagination"
          }
        ) })
      ]
    }
  );
}

// ../../src/blocks/flexi-content/styling.js
var resolveGradient = (customEnabled, customValue, gradient, classic) => {
  if (customEnabled && customValue) {
    return customValue;
  }
  if (gradient) {
    return gradient;
  }
  return classic;
};
var getPaginationPositionCss = (paginationType, progressbarPosition, progressbarUnits, dotsPosition, dotsUnits, device) => {
  if (paginationType === "progressbar") {
    return progressbarPosition[device] ? `top: ${progressbarPosition[device]}${progressbarUnits[device]} !important;` : "";
  }
  return dotsPosition[device] ? `bottom: ${dotsPosition[device]}${dotsUnits[device]} !important;` : "";
};
var getResponsiveOutsideOffset = (offsetObj, unitObj, devices) => {
  for (const device of devices) {
    if (offsetObj?.[device]) {
      return `${offsetObj[device]}${unitObj?.[device] || "px"}`;
    }
  }
  return "30px";
};
var getShapeDividerCss = (blockId, position, divider, device) => {
  const { enable, color, height, heightUnits, opacity, flip, invert } = divider;
  const selector = `.${blockId} > .swiper > .gslider-shape-divider-${position}`;
  if (!enable?.Desktop && !enable?.Tablet && !enable?.Mobile) {
    return "";
  }
  if (!enable?.[device]) {
    return `${selector} { display: none; }`;
  }
  const scaleX = flip?.[device] ? -1 : 1;
  const isInverted = !!invert?.[device];
  const scaleY = (isInverted ? -1 : 1) * (position === "bottom" ? -1 : 1);
  const opacityValue = opacity?.[device];
  return `
		${selector} {
			display: block;
			transform: scale(${scaleX}, ${scaleY});
			${height?.[device] ? `height: ${height[device]}${heightUnits?.[device] || "px"};` : ""}
			${opacityValue !== void 0 && opacityValue !== "" ? `opacity: ${opacityValue};` : ""}
		}
		${selector} path {
			fill: ${color || "#ffffff"};
		}
		${selector} .gslider-shape-divider-fill {
			display: ${isInverted ? "none" : "inline"};
		}
		${selector} .gslider-shape-divider-fill-invert {
			display: ${isInverted ? "inline" : "none"};
		}
	`;
};
var getHasPaginationCss = (blockId, showPagination, device, fallbackDevices, offset) => {
  const rule = (marginBottom) => `.${blockId}.gslider-flexi-content-wrapper.has-pagination { margin-bottom: ${marginBottom}; }`;
  if (showPagination?.[device]) {
    return rule(offset);
  }
  if (fallbackDevices.some((d) => showPagination?.[d])) {
    return rule("0");
  }
  return "";
};
var getCursorFollowerSizeCss = (blockId, enabled, size, innerSize) => {
  if (!enabled) {
    return "";
  }
  let css = "";
  if (size) {
    css += `.${blockId}.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower { width: ${size}px; height: ${size}px; }`;
  }
  if (innerSize) {
    css += `
        .${blockId}.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower .gslider-cursor-icon svg { width: ${innerSize}px; height: ${innerSize}px; }
        .${blockId}.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower .gslider-cursor-image { width: ${innerSize}px; height: ${innerSize}px; }
        .${blockId}.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower .gslider-cursor-text { font-size: ${innerSize}px; }
        `;
  }
  return css;
};
var getAutoplayProgressCss = (blockId, enabled, color, height) => {
  const deviceRule = (device) => `
        .${blockId} > .swiper > .gslider-autoplay-progress {
            ${enabled?.[device] ? `display: block; height: ${height?.[device] ?? 3}px;` : "display: none;"}
        }
    `;
  return `
        .${blockId} > .swiper > .gslider-autoplay-progress {
            position: absolute;
            left: 0;
            z-index: 10;
            width: 100%;
            pointer-events: none;
        }
        .${blockId} > .swiper > .gslider-autoplay-progress.top {
            top: 0;
        }
        .${blockId} > .swiper > .gslider-autoplay-progress.bottom {
            bottom: 0;
        }
        .${blockId} > .swiper > .gslider-autoplay-progress > .gslider-autoplay-progress-fill {
            width: 100%;
            height: 100%;
            transform: scaleX(0);
            transform-origin: left;
            ${color ? `background-color: ${color};` : ""}
        }
        ${deviceRule("Desktop")}
        @media only screen and (max-width: 1024px) {
            ${deviceRule("Tablet")}
        }
        @media only screen and (max-width: 767px) {
            ${deviceRule("Mobile")}
        }
        @media (prefers-reduced-motion: reduce) {
            .${blockId} > .swiper > .gslider-autoplay-progress {
                display: none;
            }
        }
    `;
};
var generateFlexiContentStyle = (attributes2) => {
  const {
    blockId,
    deviceType,
    blockStyle,
    sliderType,
    carouselPerColumn,
    carouselPerColumnGap,
    speed,
    autoplay,
    autoplayDelay,
    enableAutoplayProgress,
    autoplayProgressColor,
    autoplayProgressHeight,
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
    showNavigation,
    showPagination,
    paginationPositionType,
    /** End Show/Hide Elements */
    /** Start Layout & Content Setting */
    layoutHeightSwitcher,
    layoutHeight,
    layoutHeightUnits,
    verticalHeight,
    verticalHeightUnits,
    direction,
    contentWidth,
    contentWidthUnits,
    contentAlignment,
    contentVerticalAlignment,
    contentHorizontalAlignment,
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
    enableCursorFollower,
    cursorFollowerBg,
    cursorFollowerColor,
    cursorFollowerSize,
    cursorFollowerInnerSize,
    cursorFollowerFontWeight,
    cursorFollowerTextTransform,
    /** Start Shape Dividers */
    enableTopDivider,
    topDividerColor,
    topDividerHeight,
    topDividerHeightUnits,
    topDividerOpacity,
    topDividerFlip,
    topDividerInvert,
    enableBottomDivider,
    bottomDividerColor,
    bottomDividerHeight,
    bottomDividerHeightUnits,
    bottomDividerOpacity,
    bottomDividerFlip,
    bottomDividerInvert
    /** End Shape Dividers */
  } = attributes2;
  const topDivider = {
    enable: enableTopDivider,
    color: topDividerColor,
    height: topDividerHeight,
    heightUnits: topDividerHeightUnits,
    opacity: topDividerOpacity,
    flip: topDividerFlip,
    invert: topDividerInvert
  };
  const bottomDivider = {
    enable: enableBottomDivider,
    color: bottomDividerColor,
    height: bottomDividerHeight,
    heightUnits: bottomDividerHeightUnits,
    opacity: bottomDividerOpacity,
    flip: bottomDividerFlip,
    invert: bottomDividerInvert
  };
  const hasCursorFollower = Object.values(enableCursorFollower || {}).some(
    Boolean
  );
  const getGlobalBackgroundNormalStyles = (device) => {
    const bgType = globalNormalBackgroundType;
    const bgColor = globalNormalClassicColor;
    const bgGradient = globalNormalGradientColor;
    const customGradient = globalNormalCustomGradientInputValue;
    const customGradientEnabled = globalNormalCustomGradientSwitcher;
    const bgImageUrl = globalNormalBackgroundImageUrl?.[device];
    const bgImagePosition = globalNormalBackgroundImagePosition?.[device];
    const bgAttachment = globalNormalBackgroundImageAttachment?.[device];
    const bgRepeat = globalNormalBackgroundImageRepeat?.[device];
    const bgSize = globalNormalBackgroundImageSize?.[device];
    if (bgType === "gradient") {
      if (customGradientEnabled && customGradient) {
        return { background: customGradient };
      } else if (bgGradient) {
        return { background: bgGradient };
      } else if (bgColor) {
        return { background: bgColor };
      }
      return {};
    }
    let styles = bgColor ? { background: bgColor } : {};
    if (bgType !== "gradient" && bgImageUrl) {
      styles = {
        ...styles,
        "background-image": `url(${bgImageUrl})`,
        "background-position": bgImagePosition ? `${bgImagePosition.x * 100}% ${bgImagePosition.y * 100}%` : "50% 50%",
        "background-attachment": bgAttachment || void 0,
        "background-repeat": bgRepeat || void 0,
        "background-size": bgSize || void 0
      };
    }
    return styles;
  };
  const getGlobalBackgroundHoverStyles = (device) => {
    const bgType = globalHoverBackgroundType;
    const bgColor = globalHoverClassicColor;
    const bgGradient = globalHoverGradientColor;
    const customGradient = globalHoverCustomGradientInputValue;
    const customGradientEnabled = globalHoverCustomGradientSwitcher;
    const bgImageUrl = globalHoverBackgroundImageUrl?.[device];
    const bgImagePosition = globalHoverBackgroundImagePosition?.[device];
    const bgAttachment = globalHoverBackgroundImageAttachment?.[device];
    const bgRepeat = globalHoverBackgroundImageRepeat?.[device];
    const bgSize = globalHoverBackgroundImageSize?.[device];
    if (bgType === "gradient") {
      if (customGradientEnabled && customGradient) {
        return { background: customGradient };
      } else if (bgGradient) {
        return { background: bgGradient };
      } else if (bgColor) {
        return { background: bgColor };
      }
      return {};
    }
    let styles = bgColor ? { background: bgColor } : {};
    if (bgType !== "gradient" && bgImageUrl) {
      styles = {
        ...styles,
        "background-image": `url(${bgImageUrl})`,
        "background-position": bgImagePosition ? `${bgImagePosition.x * 100}% ${bgImagePosition.y * 100}%` : "50% 50%",
        "background-attachment": bgAttachment || void 0,
        "background-repeat": bgRepeat || void 0,
        "background-size": bgSize || void 0
      };
    }
    return styles;
  };
  const globalBackgroundStyleObjectToString = (styleObj) => Object.entries(styleObj).map(([key, value]) => `${key}: ${value};`).join(" ");
  const globalDesktopBackgroundNormalStyles = globalBackgroundStyleObjectToString(
    getGlobalBackgroundNormalStyles("Desktop")
  );
  const globalTabletBackgroundNormalStyles = globalBackgroundStyleObjectToString(
    getGlobalBackgroundNormalStyles("Tablet")
  );
  const globalMobileBackgroundNormalStyles = globalBackgroundStyleObjectToString(
    getGlobalBackgroundNormalStyles("Mobile")
  );
  const globalDesktopBackgroundHoverStyles = globalBackgroundStyleObjectToString(
    getGlobalBackgroundHoverStyles("Desktop")
  );
  const globalTabletBackgroundHoverStyles = globalBackgroundStyleObjectToString(
    getGlobalBackgroundHoverStyles("Tablet")
  );
  const globalMobileBackgroundHoverStyles = globalBackgroundStyleObjectToString(
    getGlobalBackgroundHoverStyles("Mobile")
  );
  const flexiContentCSS = `
        .${blockId}.gslider-flexi-content-wrapper {
            ${globalDesktopBackgroundNormalStyles}
            ${globalMarginDesktopCssStyle ? `margin: ${globalMarginDesktopCssStyle};` : ""} 
            ${globalPaddingDesktopCssStyle ? `padding: ${globalPaddingDesktopCssStyle};` : ""}
            ${globalBorder ? `border: ${globalBorder};` : ""}
			${globalBorderDesktopCssStyle ? `border-width: ${globalBorderDesktopCssStyle};` : ""}  
			${globalBorderRadiusDesktopCssStyle ? `border-radius: ${globalBorderRadiusDesktopCssStyle} !important;` : ""}
            ${globalBorderColor ? `border-color: ${globalBorderColor};` : ""}
            ${globalBoxShadowCssValue ? `box-shadow: ${globalBoxShadowCssValue} !important;` : ""}
            ${globalZIndex.Desktop ? `z-index: ${globalZIndex.Desktop};` : ""}
            box-sizing: border-box;
            position: relative;
        }
        .${blockId}.gslider-flexi-content-wrapper:hover {
            ${globalDesktopBackgroundHoverStyles}
            ${globalBorderHoverColor ? `border-color: ${globalBorderHoverColor};` : ""}
            ${globalBoxShadowHoverCssValue ? `box-shadow: ${globalBoxShadowHoverCssValue} !important;` : ""}
        }

        .${blockId} .swiper-wrapper.gslider-swiper-wrapper {
            ${layoutHeightSwitcher !== "adapt" ? `height: auto;` : ""}
            ${layoutHeight.Desktop && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Desktop}${layoutHeightUnits.Desktop};` : "auto"}
        }

        ${direction === "vertical" && Number(verticalHeight?.Desktop || layoutHeight.Desktop) > 0 && (verticalHeightUnits?.Desktop || layoutHeightUnits.Desktop) !== "%" ? `.${blockId}.gslider-flexi-content-wrapper > .swiper {
            height: ${verticalHeight?.Desktop || layoutHeight.Desktop}${verticalHeightUnits?.Desktop || layoutHeightUnits.Desktop || "px"};
        }` : ""}

        .${blockId} .swiper-slide{
            ${layoutHeightSwitcher !== "adapt" && direction !== "vertical" ? `height: auto !important;` : ""}
            ${layoutHeight.Desktop && layoutHeightSwitcher === "fixed" && direction !== "vertical" ? `min-height: ${layoutHeight.Desktop}${layoutHeightUnits.Desktop};` : "auto"}
        }
        
        .${blockId}.gslider-flexi-content-wrapper .gslider-content-wrapper {
            ${layoutHeightSwitcher !== "adapt" || direction === "vertical" ? `height: 100% !important;` : ""}
            ${contentVerticalAlignment?.Desktop ? `justify-content: ${contentVerticalAlignment.Desktop};` : ""}
        }

        .${blockId}.gslider-flexi-content-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
            ${contentWidth?.Desktop ? `max-width: ${contentWidth.Desktop}${contentWidthUnits?.Desktop};` : ""}
            ${contentAlignment?.Desktop ? `text-align: ${contentAlignment.Desktop};` : ""}

            ${contentHorizontalAlignment?.Desktop === "left" ? `margin-right: auto; margin-left: 0;` : ""}
            ${contentHorizontalAlignment?.Desktop === "center" ? `margin-left: auto; margin-right: auto;` : ""}
            ${contentHorizontalAlignment?.Desktop === "right" ? `margin-left: auto; margin-right: 0;` : ""}
            ${contentPaddingDesktopCssStyle ? `padding: ${contentPaddingDesktopCssStyle};` : ""}
        }

        .${blockId}.gslider-flexi-content-wrapper.outside {
            ${navigationArrowPosition === "top-left" || navigationArrowPosition === "top-center" || navigationArrowPosition === "top-right" ? `
                padding: ${navigationArrowPositionOutsidePadding.Desktop}${navigationArrowPositionOutsidePaddingUnits.Desktop} 0 0;
            ` : ""}
    
            ${navigationArrowPosition === "bottom-left" || navigationArrowPosition === "bottom-center" || navigationArrowPosition === "bottom-right" ? `
                padding: 0 0 ${navigationArrowPositionOutsidePadding.Desktop}${navigationArrowPositionOutsidePaddingUnits.Desktop};
            ` : ""}

            ${navigationArrowPosition === "center" ? `
                padding: 0 ${navigationArrowPositionOutsidePadding.Desktop}${navigationArrowPositionOutsidePaddingUnits.Desktop};

            ` : ""}
        }

        .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
        .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} {
            z-index: 100 !important;
        }

        ${navigationArrowPosition && navigationArrowPosition !== "center" ? `

            .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
            .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: ${navigationArrowDirection};
                gap: ${navigationArrowGap.Desktop ? `${navigationArrowGap.Desktop}${navigationArrowGapUnits.Desktop}` : "10px"};
                position: absolute;
                z-index: 100;
        
                ${navigationArrowPosition === "top-left" ? `
                    top: ${navigationArrowPositionTopOffset.Desktop ? `${navigationArrowPositionTopOffset.Desktop}${navigationArrowPositionTopOffsetUnits.Desktop}` : "0"};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : "0"};
                ` : ""}
        
                ${navigationArrowPosition === "top-center" ? `
                    top: ${navigationArrowPositionTopOffset.Desktop ? `${navigationArrowPositionTopOffset.Desktop}${navigationArrowPositionTopOffsetUnits.Desktop}` : "0"};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : "50%"};
                    transform: translateX(-50%);
                ` : ""}
        
                ${navigationArrowPosition === "top-right" ? `
                    top: ${navigationArrowPositionTopOffset.Desktop ? `${navigationArrowPositionTopOffset.Desktop}${navigationArrowPositionTopOffsetUnits.Desktop}` : "0"};
                    right: ${navigationArrowPositionRightOffset.Desktop ? `${navigationArrowPositionRightOffset.Desktop}${navigationArrowPositionRightOffsetUnits.Desktop}` : "0"};
                ` : ""}
        
                ${navigationArrowPosition === "bottom-left" ? `
                    bottom: ${navigationArrowPositionBottomOffset.Desktop ? `${navigationArrowPositionBottomOffset.Desktop}${navigationArrowPositionBottomOffsetUnits.Desktop}` : "0"};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : "0"};
                ` : ""}
        
                ${navigationArrowPosition === "bottom-center" ? `
                    bottom: ${navigationArrowPositionBottomOffset.Desktop ? `${navigationArrowPositionBottomOffset.Desktop}${navigationArrowPositionBottomOffsetUnits.Desktop}` : "0"};
                    left: ${navigationArrowPositionLeftOffset.Desktop ? `${navigationArrowPositionLeftOffset.Desktop}${navigationArrowPositionLeftOffsetUnits.Desktop}` : "50%"};
                    transform: translateX(-50%);
                ` : ""}
        
                ${navigationArrowPosition === "bottom-right" ? `
                    bottom: ${navigationArrowPositionBottomOffset.Desktop ? `${navigationArrowPositionBottomOffset.Desktop}${navigationArrowPositionBottomOffsetUnits.Desktop}` : "0"};
                    right: ${navigationArrowPositionRightOffset.Desktop ? `${navigationArrowPositionRightOffset.Desktop}${navigationArrowPositionRightOffsetUnits.Desktop}` : "0"};
                ` : ""}
            }
        
            .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-prev,
            .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-next,
            .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-prev,
            .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} .swiper-button-next {
                position: relative;
                top: auto;
                right: auto;
                bottom: auto;
                left: auto;
                margin: 0 !important;
            }
        ` : ""}

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev:after,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next:after {
            display: none !important;
        }
        
        .${blockId} .swiper-button-prev,
        .${blockId} .swiper-button-next {
            ${navigationArrowColor ? `color: ${navigationArrowColor};` : ""}
            ${navigationArrowNormalBackgroundType === "gradient" ? `  
                background: ${resolveGradient(
    navigationArrowNormalCustomGradientSwitcher,
    navigationArrowNormalCustomGradientInputValue,
    navigationArrowNormalGradientColor,
    navigationArrowNormalClassicColor
  )};
            ` : `
                ${navigationArrowNormalClassicColor ? `background: ${navigationArrowNormalClassicColor};` : ""}
            `}
            ${navigationArrowBorder ? `border: ${navigationArrowBorder};` : ""}
			${navigationArrowDesktopBorderCssStyle ? `border-width: ${navigationArrowDesktopBorderCssStyle};` : ""}  
			${navigationArrowDesktopBorderRadiusCssStyle ? `border-radius: ${navigationArrowDesktopBorderRadiusCssStyle};` : ""}
            ${navigationArrowBorderColor ? `border-color: ${navigationArrowBorderColor};` : ""}
            ${navigationArrowBoxShadowCssValue ? `box-shadow: ${navigationArrowBoxShadowCssValue};` : ""}
            ${navigationArrowWidth.Desktop ? `width: ${navigationArrowWidth.Desktop}${navigationArrowWidthUnits.Desktop};` : ""}
            ${navigationArrowHeight.Desktop ? `height: ${navigationArrowHeight.Desktop}${navigationArrowHeightUnits.Desktop};` : ""}
            transition: color .3s ease-in-out, background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out, transform .3s ease-in-out;
        }
        .${blockId} .swiper-button-prev:focus-visible,
        .${blockId} .swiper-button-next:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }
        .${blockId} .swiper-button-prev:hover,
        .${blockId} .swiper-button-next:hover {
            ${navigationArrowColorHover ? `color: ${navigationArrowColorHover};` : ""}
            ${navigationArrowHoverBackgroundType === "gradient" ? `
                background: ${resolveGradient(
    navigationArrowHoverCustomGradientSwitcher,
    navigationArrowHoverCustomGradientInputValue,
    navigationArrowHoverGradientColor,
    navigationArrowHoverClassicColor
  )};
            ` : `
                ${navigationArrowHoverClassicColor ? `background: ${navigationArrowHoverClassicColor};` : ""}
            `}
            ${navigationArrowBorderHoverColor ? `border-color: ${navigationArrowBorderHoverColor};` : ""}
            ${navigationArrowBoxShadowHoverCssValue ? `box-shadow: ${navigationArrowBoxShadowHoverCssValue};` : ""}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
            ${navigationArrowColor ? `fill: ${navigationArrowColor};` : ""}
            ${navigationArrowSize.Desktop ? `width: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ""}
            ${navigationArrowSize.Desktop ? `height: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ""}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
            ${navigationArrowSize.Desktop ? `width: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ""}
            ${navigationArrowSize.Desktop ? `height: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ""}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev:hover svg,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next:hover svg {
            ${navigationArrowColorHover ? `fill: ${navigationArrowColorHover};` : ""}
        }

        .${blockId} .swiper-button-prev:after,
        .${blockId} .swiper-button-next:after {
            ${navigationArrowSize.Desktop ? `font-size: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ""}
        }

        .${blockId} .swiper-pagination {
            ${getPaginationPositionCss(
    paginationType,
    paginationProgressbarPosition,
    paginationProgressbarPositionUnits,
    paginationDotsPosition,
    paginationDotsPositionUnits,
    "Desktop"
  )}
            ${paginationDotsDesktopMarginCssStyle ? `margin: ${paginationDotsDesktopMarginCssStyle};` : ""}
        }

        .${blockId} .swiper-pagination-bullet {
            ${paginationNormalDotsBgColor ? `background-color: ${paginationNormalDotsBgColor};` : ""}
            ${paginationNormalDotsBorder ? `border: ${paginationNormalDotsBorder};` : ""}
			${paginationNormalDotsDesktopBorderCssStyle ? `border-width: ${paginationNormalDotsDesktopBorderCssStyle};` : ""}   
			${paginationNormalDotsDesktopBorderRadiusCssStyle ? `border-radius: ${paginationNormalDotsDesktopBorderRadiusCssStyle};` : ""}
            ${paginationNormalDotsBorderColor ? `border-color: ${paginationNormalDotsBorderColor};` : ""}
            ${paginationNormalDotsWidth.Desktop ? `width: ${paginationNormalDotsWidth.Desktop}${paginationNormalDotsWidthUnits.Desktop};` : ""}
            ${paginationNormalDotsHeight.Desktop ? `height: ${paginationNormalDotsHeight.Desktop}${paginationNormalDotsHeightUnits.Desktop};` : ""}
        }

        .${blockId} .swiper-pagination-bullet-active {
            ${paginationActiveDotsBgColor ? `background-color: ${paginationActiveDotsBgColor};` : ""}
            ${paginationActiveDotsBorder ? `border: ${paginationActiveDotsBorder};` : ""}
			${paginationActiveDotsDesktopBorderCssStyle ? `border-width: ${paginationActiveDotsDesktopBorderCssStyle};` : ""}   
			${paginationActiveDotsDesktopBorderRadiusCssStyle ? `border-radius: ${paginationActiveDotsDesktopBorderRadiusCssStyle};` : ""}
            ${paginationActiveDotsBorderColor ? `border-color: ${paginationActiveDotsBorderColor};` : ""}
            ${paginationActiveDotsWidth.Desktop ? `width: ${paginationActiveDotsWidth.Desktop}${paginationActiveDotsWidthUnits.Desktop};` : ""}
            ${paginationActiveDotsHeight.Desktop ? `height: ${paginationActiveDotsHeight.Desktop}${paginationActiveDotsHeightUnits.Desktop};` : ""}
        }

        .${blockId} .swiper-pagination-bullet:hover {
            ${paginationNormalDotsBorderHoverColor ? `border-color: ${paginationNormalDotsBorderHoverColor};` : ""}
        }

        .${blockId} .swiper-pagination-bullet-active:hover {
            ${paginationActiveDotsBorderHoverColor ? `border-color: ${paginationActiveDotsBorderHoverColor};` : ""}
        }

        .${blockId} .swiper-pagination-fraction { 
            ${paginationFractionFontFamily ? `font-family: ${paginationFractionFontFamily};` : ""}
            ${paginationFractionFontSize.Desktop && paginationFractionFontSizeUnits.Desktop ? `font-size: ${paginationFractionFontSize.Desktop}${paginationFractionFontSizeUnits.Desktop};` : ""}
            ${paginationFractionFontWeight ? `font-weight: ${paginationFractionFontWeight};` : ""}
            ${paginationFractionFontStyle ? `font-style: ${paginationFractionFontStyle};` : ""}
            ${paginationFractionTextTransform ? `text-transform: ${paginationFractionTextTransform};` : ""}
            ${paginationFractionTextDecoration ? `text-decoration: ${paginationFractionTextDecoration};` : ""}
            ${paginationFractionLineHeight.Desktop && paginationFractionLineHeightUnits.Desktop ? `line-height: ${paginationFractionLineHeight.Desktop}${paginationFractionLineHeightUnits.Desktop};` : ""}
            ${paginationFractionLetterSpacing.Desktop && paginationFractionLetterSpacingUnits.Desktop ? `letter-spacing: ${paginationFractionLetterSpacing.Desktop}${paginationFractionLetterSpacingUnits.Desktop};` : ""}
            ${paginationFractionWordSpacing.Desktop && paginationFractionWordSpacingUnits.Desktop ? `word-spacing: ${paginationFractionWordSpacing.Desktop}${paginationFractionWordSpacingUnits.Desktop};` : ""}
            ${paginationFractionColor ? `color: ${paginationFractionColor};` : ""}
            transition: color .3s ease-in-out;
        }

        .${blockId} .swiper-pagination-fraction:hover {
            ${paginationFractionColorHover ? `color: ${paginationFractionColorHover};` : ""}
        }

        .${blockId} .swiper-pagination-progressbar {
            ${paginationProgressbarBGColor ? `background-color: ${paginationProgressbarBGColor};` : ""}
            ${paginationProgressbarHeight.Desktop ? `height: ${paginationProgressbarHeight.Desktop}${paginationProgressbarHeightUnits.Desktop};` : ""}
        }

        .${blockId} .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
            ${paginationProgressbarBGActiveColor ? `background-color: ${paginationProgressbarBGActiveColor};` : ""}
        }

        ${paginationPositionType === "outside" ? `   
            .${blockId}.gslider-flexi-content-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${blockId}.gslider-flexi-content-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${blockId}.gslider-flexi-content-wrapper .swiper-pagination-custom,
            .${blockId}.gslider-flexi-content-wrapper .swiper-pagination-fraction {
                bottom: -${paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"} !important;
            }
        ` : ""}

        ${paginationPositionType === "outside" && showPagination?.Desktop ? `
        .${blockId}.gslider-flexi-content-wrapper.has-pagination {
            margin-bottom: ${paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"};
        }
        ` : ""}


        ${hasCursorFollower ? `.${blockId}.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower {
            ${cursorFollowerBg ? `background: ${cursorFollowerBg};` : ""}
            ${cursorFollowerColor ? `color: ${cursorFollowerColor};` : ""}
        }
        .${blockId}.gslider-flexi-content-wrapper > .swiper > .gslider-cursor-follower .gslider-cursor-text {
            ${cursorFollowerFontWeight ? `font-weight: ${cursorFollowerFontWeight};` : ""}
            ${cursorFollowerTextTransform && cursorFollowerTextTransform !== "inherit" ? `text-transform: ${cursorFollowerTextTransform};` : ""}
        }` : ""}
        ${getCursorFollowerSizeCss(
    blockId,
    hasCursorFollower,
    cursorFollowerSize?.Desktop,
    cursorFollowerInnerSize?.Desktop
  )}
        ${getShapeDividerCss(blockId, "top", topDivider, "Desktop")}
        ${getShapeDividerCss(blockId, "bottom", bottomDivider, "Desktop")}

        @media only screen and (max-width: 1024px) {

            ${getCursorFollowerSizeCss(
    blockId,
    hasCursorFollower,
    cursorFollowerSize?.Tablet,
    cursorFollowerInnerSize?.Tablet
  )}

            .${blockId}.gslider-flexi-content-wrapper {
                ${globalTabletBackgroundNormalStyles}
                ${globalMarginTabletCssStyle ? `margin: ${globalMarginTabletCssStyle};` : ""} 
                ${globalPaddingTabletCssStyle ? `padding: ${globalPaddingTabletCssStyle};` : ""}
                ${globalBorderTabletCssStyle ? `border-width: ${globalBorderTabletCssStyle};` : ""}  
                ${globalBorderRadiusTabletCssStyle ? `border-radius: ${globalBorderRadiusTabletCssStyle};` : ""}
                ${globalZIndex.Tablet ? `z-index: ${globalZIndex.Tablet};` : ""}
            }
            .${blockId}.gslider-flexi-content-wrapper:hover { 
                ${globalTabletBackgroundHoverStyles}
            }

            .${blockId} .swiper-wrapper.gslider-swiper-wrapper {
                ${layoutHeightSwitcher !== "adapt" ? `height: auto;` : ""}
                ${layoutHeight.Tablet && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Tablet}${layoutHeightUnits.Tablet};` : "auto"}
            }

            ${direction === "vertical" && Number(verticalHeight?.Tablet || layoutHeight.Tablet) > 0 && (verticalHeightUnits?.Tablet || layoutHeightUnits.Tablet) !== "%" ? `.${blockId}.gslider-flexi-content-wrapper > .swiper {
                height: ${verticalHeight?.Tablet || layoutHeight.Tablet}${verticalHeightUnits?.Tablet || layoutHeightUnits.Tablet || "px"};
            }` : ""}

            .${blockId} .swiper-slide{
                ${layoutHeightSwitcher !== "adapt" && direction !== "vertical" ? `height: auto !important;` : ""}
                ${layoutHeight.Tablet && layoutHeightSwitcher === "fixed" && direction !== "vertical" ? `min-height: ${layoutHeight.Tablet}${layoutHeightUnits.Tablet};` : "auto"}
            }
            
            .${blockId}.gslider-flexi-content-wrapper .gslider-content-wrapper {
                ${layoutHeightSwitcher !== "adapt" || direction === "vertical" ? `height: 100% !important;` : ""}
                ${contentVerticalAlignment?.Tablet ? `justify-content: ${contentVerticalAlignment.Tablet};` : ""}
            }

            .${blockId}.gslider-flexi-content-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${contentWidth?.Tablet ? `max-width: ${contentWidth.Tablet}${contentWidthUnits?.Tablet};` : ""}
                ${contentAlignment?.Tablet ? `text-align: ${contentAlignment.Tablet};` : ""}

                ${contentHorizontalAlignment?.Tablet === "left" ? `margin-right: auto; margin-left: 0;` : ""}
                ${contentHorizontalAlignment?.Tablet === "center" ? `margin-left: auto; margin-right: auto;` : ""}
                ${contentHorizontalAlignment?.Tablet === "right" ? `margin-left: auto; margin-right: 0;` : ""}
                ${contentPaddingTabletCssStyle ? `padding: ${contentPaddingTabletCssStyle};` : ""}
            }

            .${blockId}.gslider-flexi-content-wrapper.outside {
                ${navigationArrowPosition === "top-left" || navigationArrowPosition === "top-center" || navigationArrowPosition === "top-right" ? `
                    padding: ${navigationArrowPositionOutsidePadding.Tablet}${navigationArrowPositionOutsidePaddingUnits.Tablet} 0 0;
                ` : ""}
        
                ${navigationArrowPosition === "bottom-left" || navigationArrowPosition === "bottom-center" || navigationArrowPosition === "bottom-right" ? `
                    padding: 0 0 ${navigationArrowPositionOutsidePadding.Tablet}${navigationArrowPositionOutsidePaddingUnits.Tablet};
                ` : ""}
        
                ${navigationArrowPosition === "center" ? `
                    padding: 0 ${navigationArrowPositionOutsidePadding.Tablet}${navigationArrowPositionOutsidePaddingUnits.Tablet};

                ` : ""}
            }

            ${navigationArrowPosition && navigationArrowPosition !== "center" ? `

                .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
                .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} { 
                    gap: ${navigationArrowGap.Tablet ? `${navigationArrowGap.Tablet}${navigationArrowGapUnits.Tablet}` : "10px"};
                    ${navigationArrowPosition === "top-left" ? `
                        top: ${navigationArrowPositionTopOffset.Tablet ? `${navigationArrowPositionTopOffset.Tablet}${navigationArrowPositionTopOffsetUnits.Tablet}` : "0"};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : "0"};
                    ` : ""}
            
                    ${navigationArrowPosition === "top-center" ? `
                        top: ${navigationArrowPositionTopOffset.Tablet ? `${navigationArrowPositionTopOffset.Tablet}${navigationArrowPositionTopOffsetUnits.Tablet}` : "0"};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : "50%"};
                        transform: translateX(-50%);
                    ` : ""}
            
                    ${navigationArrowPosition === "top-right" ? `
                        top: ${navigationArrowPositionTopOffset.Tablet ? `${navigationArrowPositionTopOffset.Tablet}${navigationArrowPositionTopOffsetUnits.Tablet}` : "0"};
                        right: ${navigationArrowPositionRightOffset.Tablet ? `${navigationArrowPositionRightOffset.Tablet}${navigationArrowPositionRightOffsetUnits.Tablet}` : "0"};
                    ` : ""}
            
                    ${navigationArrowPosition === "bottom-left" ? `
                        bottom: ${navigationArrowPositionBottomOffset.Tablet ? `${navigationArrowPositionBottomOffset.Tablet}${navigationArrowPositionBottomOffsetUnits.Tablet}` : "0"};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : "0"};
                    ` : ""}
            
                    ${navigationArrowPosition === "bottom-center" ? `
                        bottom: ${navigationArrowPositionBottomOffset.Tablet ? `${navigationArrowPositionBottomOffset.Tablet}${navigationArrowPositionBottomOffsetUnits.Tablet}` : "0"};
                        left: ${navigationArrowPositionLeftOffset.Tablet ? `${navigationArrowPositionLeftOffset.Tablet}${navigationArrowPositionLeftOffsetUnits.Tablet}` : "50%"};
                        transform: translateX(-50%);
                    ` : ""}
            
                    ${navigationArrowPosition === "bottom-right" ? `
                        bottom: ${navigationArrowPositionBottomOffset.Tablet ? `${navigationArrowPositionBottomOffset.Tablet}${navigationArrowPositionBottomOffsetUnits.Tablet}` : "0"};
                        right: ${navigationArrowPositionRightOffset.Tablet ? `${navigationArrowPositionRightOffset.Tablet}${navigationArrowPositionRightOffsetUnits.Tablet}` : "0"};
                    ` : ""}
                }
                    
            ` : ""}

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${navigationArrowTabletBorderCssStyle ? `border-width: ${navigationArrowTabletBorderCssStyle};` : ""}  
                ${navigationArrowTabletBorderRadiusCssStyle ? `border-radius: ${navigationArrowTabletBorderRadiusCssStyle};` : ""}
                ${navigationArrowWidth.Tablet ? `width: ${navigationArrowWidth.Tablet}${navigationArrowWidthUnits.Tablet};` : ""}
                ${navigationArrowHeight.Tablet ? `height: ${navigationArrowHeight.Tablet}${navigationArrowHeightUnits.Tablet};` : ""}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${navigationArrowSize.Tablet ? `width: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ""}
                ${navigationArrowSize.Tablet ? `height: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ""}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${navigationArrowSize.Tablet ? `width: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ""}
                ${navigationArrowSize.Tablet ? `height: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ""}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${navigationArrowSize.Tablet ? `font-size: ${navigationArrowSize.Tablet}${navigationArrowSizeUnits.Tablet};` : ""}
            }

            .${blockId} .swiper-pagination {
                ${getPaginationPositionCss(
    paginationType,
    paginationProgressbarPosition,
    paginationProgressbarPositionUnits,
    paginationDotsPosition,
    paginationDotsPositionUnits,
    "Tablet"
  )}
                ${paginationDotsTabletMarginCssStyle ? `margin: ${paginationDotsTabletMarginCssStyle};` : ""}
            }

            .${blockId} .swiper-pagination-bullet {
                ${paginationNormalDotsTabletBorderCssStyle ? `border-width: ${paginationNormalDotsTabletBorderCssStyle};` : ""}   
                ${paginationNormalDotsTabletBorderRadiusCssStyle ? `border-radius: ${paginationNormalDotsTabletBorderRadiusCssStyle};` : ""}
                ${paginationNormalDotsWidth.Tablet ? `width: ${paginationNormalDotsWidth.Tablet}${paginationNormalDotsWidthUnits.Tablet};` : ""}
                ${paginationNormalDotsHeight.Tablet ? `height: ${paginationNormalDotsHeight.Tablet}${paginationNormalDotsHeightUnits.Tablet};` : ""}
            }

            .${blockId} .swiper-pagination-bullet-active {
                ${paginationActiveDotsTabletBorderCssStyle ? `border-width: ${paginationActiveDotsTabletBorderCssStyle};` : ""}   
                ${paginationActiveDotsTabletBorderRadiusCssStyle ? `border-radius: ${paginationActiveDotsTabletBorderRadiusCssStyle};` : ""}
                ${paginationActiveDotsWidth.Tablet ? `width: ${paginationActiveDotsWidth.Tablet}${paginationActiveDotsWidthUnits.Tablet};` : ""}
                ${paginationActiveDotsHeight.Tablet ? `height: ${paginationActiveDotsHeight.Tablet}${paginationActiveDotsHeightUnits.Tablet};` : ""}
            }

            .${blockId} .swiper-pagination-fraction { 
                ${paginationFractionFontSize.Tablet && paginationFractionFontSizeUnits.Tablet ? `font-size: ${paginationFractionFontSize.Tablet}${paginationFractionFontSizeUnits.Tablet};` : ""}
                ${paginationFractionLineHeight.Tablet && paginationFractionLineHeightUnits.Tablet ? `line-height: ${paginationFractionLineHeight.Tablet}${paginationFractionLineHeightUnits.Tablet};` : ""}
                ${paginationFractionLetterSpacing.Tablet && paginationFractionLetterSpacingUnits.Tablet ? `letter-spacing: ${paginationFractionLetterSpacing.Tablet}${paginationFractionLetterSpacingUnits.Tablet};` : ""}
                ${paginationFractionWordSpacing.Tablet && paginationFractionWordSpacingUnits.Tablet ? `word-spacing: ${paginationFractionWordSpacing.Tablet}${paginationFractionWordSpacingUnits.Tablet};` : ""}
            }

            .${blockId} .swiper-pagination-progressbar {
                ${paginationProgressbarHeight.Tablet ? `height: ${paginationProgressbarHeight.Tablet}${paginationProgressbarHeightUnits.Tablet};` : ""}
            }

            ${paginationPositionType === "outside" ? `   
                .${blockId}.gslider-flexi-content-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${blockId}.gslider-flexi-content-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${blockId}.gslider-flexi-content-wrapper .swiper-pagination-custom,
                .${blockId}.gslider-flexi-content-wrapper .swiper-pagination-fraction {
                    bottom: -${getResponsiveOutsideOffset(
    paginationOutsideOffset,
    paginationOutsideOffsetUnits,
    ["Tablet", "Desktop"]
  )} !important;
                }
            ` : ""}

            ${paginationPositionType === "outside" ? `
                ${getHasPaginationCss(
    blockId,
    showPagination,
    "Tablet",
    ["Desktop"],
    getResponsiveOutsideOffset(
      paginationOutsideOffset,
      paginationOutsideOffsetUnits,
      ["Tablet", "Desktop"]
    )
  )}
            ` : ""}
            ${getShapeDividerCss(blockId, "top", topDivider, "Tablet")}
            ${getShapeDividerCss(
    blockId,
    "bottom",
    bottomDivider,
    "Tablet"
  )}
        }
        
        @media only screen and (max-width: 767px) {

            ${getCursorFollowerSizeCss(
    blockId,
    hasCursorFollower,
    cursorFollowerSize?.Mobile,
    cursorFollowerInnerSize?.Mobile
  )}

            .${blockId}.gslider-flexi-content-wrapper {
                ${globalMobileBackgroundNormalStyles}
                ${globalMarginMobileCssStyle ? `margin: ${globalMarginMobileCssStyle};` : ""} 
                ${globalPaddingMobileCssStyle ? `padding: ${globalPaddingMobileCssStyle};` : ""}
                ${globalBorderMobileCssStyle ? `border-width: ${globalBorderMobileCssStyle};` : ""}  
                ${globalBorderRadiusMobileCssStyle ? `border-radius: ${globalBorderRadiusMobileCssStyle};` : ""}
                ${globalZIndex.Mobile ? `z-index: ${globalZIndex.Mobile};` : ""}
            }
            .${blockId}.gslider-flexi-content-wrapper:hover { 
                ${globalMobileBackgroundHoverStyles}
            }

            .${blockId} .swiper-wrapper.gslider-swiper-wrapper {
                ${layoutHeightSwitcher !== "adapt" ? `height: auto;` : ""}
                ${layoutHeight.Mobile && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Mobile}${layoutHeightUnits.Mobile};` : "auto"}
            }

            ${direction === "vertical" && Number(verticalHeight?.Mobile || layoutHeight.Mobile) > 0 && (verticalHeightUnits?.Mobile || layoutHeightUnits.Mobile) !== "%" ? `.${blockId}.gslider-flexi-content-wrapper > .swiper {
                height: ${verticalHeight?.Mobile || layoutHeight.Mobile}${verticalHeightUnits?.Mobile || layoutHeightUnits.Mobile || "px"};
            }` : ""}

            .${blockId} .swiper-slide{
                ${layoutHeightSwitcher !== "adapt" && direction !== "vertical" ? `height: auto !important;` : ""}
                ${layoutHeight.Mobile && layoutHeightSwitcher === "fixed" && direction !== "vertical" ? `min-height: ${layoutHeight.Mobile}${layoutHeightUnits.Mobile};` : "auto"}
            }
            
            .${blockId}.gslider-flexi-content-wrapper .gslider-content-wrapper {
                ${layoutHeightSwitcher !== "adapt" || direction === "vertical" ? `height: 100% !important;` : ""}
                ${contentVerticalAlignment?.Mobile ? `justify-content: ${contentVerticalAlignment.Mobile};` : ""}
            }

            .${blockId}.gslider-flexi-content-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${contentWidth?.Mobile ? `max-width: ${contentWidth.Mobile}${contentWidthUnits?.Mobile};` : ""}
                ${contentAlignment?.Mobile ? `text-align: ${contentAlignment.Mobile};` : ""}

                ${contentHorizontalAlignment?.Mobile === "left" ? `margin-right: auto; margin-left: 0;` : ""}
                ${contentHorizontalAlignment?.Mobile === "center" ? `margin-left: auto; margin-right: auto;` : ""}
                ${contentHorizontalAlignment?.Mobile === "right" ? `margin-left: auto; margin-right: 0;` : ""}
                ${contentPaddingMobileCssStyle ? `padding: ${contentPaddingMobileCssStyle};` : ""}
            }

            .${blockId}.gslider-flexi-content-wrapper.outside {
                ${navigationArrowPosition === "top-left" || navigationArrowPosition === "top-center" || navigationArrowPosition === "top-right" ? `
                    padding: ${navigationArrowPositionOutsidePadding.Mobile}${navigationArrowPositionOutsidePaddingUnits.Mobile} 0 0;
                ` : ""}
        
                ${navigationArrowPosition === "bottom-left" || navigationArrowPosition === "bottom-center" || navigationArrowPosition === "bottom-right" ? `
                    padding: 0 0 ${navigationArrowPositionOutsidePadding.Mobile}${navigationArrowPositionOutsidePaddingUnits.Mobile};
                ` : ""}
        
                ${navigationArrowPosition === "center" ? `
                    padding: 0 ${navigationArrowPositionOutsidePadding.Mobile}${navigationArrowPositionOutsidePaddingUnits.Mobile};

                ` : ""}
            }

            ${navigationArrowPosition && navigationArrowPosition !== "center" ? `

                .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
                .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} {
                    gap: ${navigationArrowGap.Mobile ? `${navigationArrowGap.Mobile}${navigationArrowGapUnits.Mobile}` : "10px"};
                    ${navigationArrowPosition === "top-left" ? `
                        top: ${navigationArrowPositionTopOffset.Mobile ? `${navigationArrowPositionTopOffset.Mobile}${navigationArrowPositionTopOffsetUnits.Mobile}` : "0"};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : "0"};
                    ` : ""}
            
                    ${navigationArrowPosition === "top-center" ? `
                        top: ${navigationArrowPositionTopOffset.Mobile ? `${navigationArrowPositionTopOffset.Mobile}${navigationArrowPositionTopOffsetUnits.Mobile}` : "0"};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : "50%"};
                        transform: translateX(-50%);
                    ` : ""}
            
                    ${navigationArrowPosition === "top-right" ? `
                        top: ${navigationArrowPositionTopOffset.Mobile ? `${navigationArrowPositionTopOffset.Mobile}${navigationArrowPositionTopOffsetUnits.Mobile}` : "0"};
                        right: ${navigationArrowPositionRightOffset.Mobile ? `${navigationArrowPositionRightOffset.Mobile}${navigationArrowPositionRightOffsetUnits.Mobile}` : "0"};
                    ` : ""}
            
                    ${navigationArrowPosition === "bottom-left" ? `
                        bottom: ${navigationArrowPositionBottomOffset.Mobile ? `${navigationArrowPositionBottomOffset.Mobile}${navigationArrowPositionBottomOffsetUnits.Mobile}` : "0"};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : "0"};
                    ` : ""}
            
                    ${navigationArrowPosition === "bottom-center" ? `
                        bottom: ${navigationArrowPositionBottomOffset.Mobile ? `${navigationArrowPositionBottomOffset.Mobile}${navigationArrowPositionBottomOffsetUnits.Mobile}` : "0"};
                        left: ${navigationArrowPositionLeftOffset.Mobile ? `${navigationArrowPositionLeftOffset.Mobile}${navigationArrowPositionLeftOffsetUnits.Mobile}` : "50%"};
                        transform: translateX(-50%);
                    ` : ""}
            
                    ${navigationArrowPosition === "bottom-right" ? `
                        bottom: ${navigationArrowPositionBottomOffset.Mobile ? `${navigationArrowPositionBottomOffset.Mobile}${navigationArrowPositionBottomOffsetUnits.Mobile}` : "0"};
                        right: ${navigationArrowPositionRightOffset.Mobile ? `${navigationArrowPositionRightOffset.Mobile}${navigationArrowPositionRightOffsetUnits.Mobile}` : "0"};
                    ` : ""}
                }
                    
            ` : ""}

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${navigationArrowMobileBorderCssStyle ? `border-width: ${navigationArrowMobileBorderCssStyle};` : ""}  
                ${navigationArrowMobileBorderRadiusCssStyle ? `border-radius: ${navigationArrowMobileBorderRadiusCssStyle};` : ""}
                ${navigationArrowWidth.Mobile ? `width: ${navigationArrowWidth.Mobile}${navigationArrowWidthUnits.Mobile};` : ""}
                ${navigationArrowHeight.Mobile ? `height: ${navigationArrowHeight.Mobile}${navigationArrowHeightUnits.Mobile};` : ""}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${navigationArrowSize.Mobile ? `width: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ""}
                ${navigationArrowSize.Mobile ? `height: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ""}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${navigationArrowSize.Mobile ? `width: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ""}
                ${navigationArrowSize.Mobile ? `height: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ""}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${navigationArrowSize.Mobile ? `font-size: ${navigationArrowSize.Mobile}${navigationArrowSizeUnits.Mobile};` : ""}
            }

            .${blockId} .swiper-pagination {
                ${getPaginationPositionCss(
    paginationType,
    paginationProgressbarPosition,
    paginationProgressbarPositionUnits,
    paginationDotsPosition,
    paginationDotsPositionUnits,
    "Mobile"
  )}
                ${paginationDotsMobileMarginCssStyle ? `margin: ${paginationDotsMobileMarginCssStyle};` : ""}
            }

            .${blockId} .swiper-pagination-bullet {
                ${paginationNormalDotsMobileBorderCssStyle ? `border-width: ${paginationNormalDotsMobileBorderCssStyle};` : ""}   
                ${paginationNormalDotsMobileBorderRadiusCssStyle ? `border-radius: ${paginationNormalDotsMobileBorderRadiusCssStyle};` : ""}
                ${paginationNormalDotsWidth.Mobile ? `width: ${paginationNormalDotsWidth.Mobile}${paginationNormalDotsWidthUnits.Mobile};` : ""}
                ${paginationNormalDotsHeight.Mobile ? `height: ${paginationNormalDotsHeight.Mobile}${paginationNormalDotsHeightUnits.Mobile};` : ""}
            }

            .${blockId} .swiper-pagination-bullet-active {
                ${paginationActiveDotsMobileBorderCssStyle ? `border-width: ${paginationActiveDotsMobileBorderCssStyle};` : ""}   
                ${paginationActiveDotsMobileBorderRadiusCssStyle ? `border-radius: ${paginationActiveDotsMobileBorderRadiusCssStyle};` : ""}
                ${paginationActiveDotsWidth.Mobile ? `width: ${paginationActiveDotsWidth.Mobile}${paginationActiveDotsWidthUnits.Mobile};` : ""}
                ${paginationActiveDotsHeight.Mobile ? `height: ${paginationActiveDotsHeight.Mobile}${paginationActiveDotsHeightUnits.Mobile};` : ""}
            }

            .${blockId} .swiper-pagination-fraction { 
                ${paginationFractionFontSize.Mobile && paginationFractionFontSizeUnits.Mobile ? `font-size: ${paginationFractionFontSize.Mobile}${paginationFractionFontSizeUnits.Mobile};` : ""}
                ${paginationFractionLineHeight.Mobile && paginationFractionLineHeightUnits.Mobile ? `line-height: ${paginationFractionLineHeight.Mobile}${paginationFractionLineHeightUnits.Mobile};` : ""}
                ${paginationFractionLetterSpacing.Mobile && paginationFractionLetterSpacingUnits.Mobile ? `letter-spacing: ${paginationFractionLetterSpacing.Mobile}${paginationFractionLetterSpacingUnits.Mobile};` : ""}
                ${paginationFractionWordSpacing.Mobile && paginationFractionWordSpacingUnits.Mobile ? `word-spacing: ${paginationFractionWordSpacing.Mobile}${paginationFractionWordSpacingUnits.Mobile};` : ""}
            }

            .${blockId} .swiper-pagination-progressbar {
                ${paginationProgressbarHeight.Mobile ? `height: ${paginationProgressbarHeight.Mobile}${paginationProgressbarHeightUnits.Mobile};` : ""}
            }

            ${paginationPositionType === "outside" ? `   
                .${blockId}.gslider-flexi-content-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${blockId}.gslider-flexi-content-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${blockId}.gslider-flexi-content-wrapper .swiper-pagination-custom,
                .${blockId}.gslider-flexi-content-wrapper .swiper-pagination-fraction {
                    bottom: -${getResponsiveOutsideOffset(
    paginationOutsideOffset,
    paginationOutsideOffsetUnits,
    ["Mobile", "Tablet", "Desktop"]
  )} !important;
                }
            ` : ""}

            ${paginationPositionType === "outside" ? `
                ${getHasPaginationCss(
    blockId,
    showPagination,
    "Mobile",
    ["Desktop", "Tablet"],
    getResponsiveOutsideOffset(
      paginationOutsideOffset,
      paginationOutsideOffsetUnits,
      ["Mobile", "Tablet", "Desktop"]
    )
  )}
            ` : ""}
            ${getShapeDividerCss(blockId, "top", topDivider, "Mobile")}
            ${getShapeDividerCss(
    blockId,
    "bottom",
    bottomDivider,
    "Mobile"
  )}
        }
    `;
  const autoplayProgressCSS = autoplay && (enableAutoplayProgress?.Desktop || enableAutoplayProgress?.Tablet || enableAutoplayProgress?.Mobile) ? getAutoplayProgressCss(
    blockId,
    enableAutoplayProgress,
    autoplayProgressColor,
    autoplayProgressHeight
  ) : "";
  return `${flexiContentCSS}${autoplayProgressCSS}`.replace(/\s+/g, " ").trim();
};
var styling_default = generateFlexiContentStyle;

// ../../src/blocks/flexi-content/deprecated.js
var import_block_editor2 = require("@wordpress/block-editor");
var import_jsx_runtime4 = require("react/jsx-runtime");
var v1_0_7 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
      deviceType,
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
      carouselEffect,
      slideEffect,
      mousewheelControl,
      paginationType,
      dynamicBullets,
      showNavigation,
      showPagination,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
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
      navigationArrowsIconRightImageID
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
    });
    const innerBlocksProps = import_block_editor2.useInnerBlocksProps.save({
      className: "swiper-wrapper gslider-swiper-wrapper"
    });
    const swiperSettings = JSON.stringify({
      effect: sliderType === "carousel" ? carouselEffect : slideEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0
          },
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false
        },
        768: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet || 20
          },
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false
        },
        1025: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Desktop || 2,
            spaceBetween: carouselPerColumnGap?.Desktop || 20
          },
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false
        }
      },
      // Common settings
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      navigation: showNavigation ? {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      } : false,
      pagination: showPagination ? {
        el: ".swiper-pagination",
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      } : false,
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      },
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...innerBlocksProps }),
        showNavigation && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "div",
          {
            className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "div",
                {
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "div",
                {
                  className: "swiper-button-next",
                  "aria-label": "Next slide"
                }
              )
            ]
          }
        ) }),
        navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "div",
          {
            className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
            ]
          }
        ),
        navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "div",
          {
            className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "img",
                {
                  src: navigationArrowsIconLeftImageUrl,
                  alt: navigationArrowsIconLeftImageAlt
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "img",
                {
                  src: navigationArrowsIconRightImageUrl,
                  alt: navigationArrowsIconRightImageAlt
                }
              ) })
            ]
          }
        ),
        showPagination && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-pagination" }) }) })
      ] }),
      showNavigation && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
          ]
        }
      ),
      navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "img",
              {
                src: navigationArrowsIconLeftImageUrl,
                alt: navigationArrowsIconLeftImageAlt
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "img",
              {
                src: navigationArrowsIconRightImageUrl,
                alt: navigationArrowsIconRightImageAlt
              }
            ) })
          ]
        }
      )
    ] });
  }
};
var v1_0_8 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      carouselEffect,
      slideEffect,
      mousewheelControl,
      paginationType,
      dynamicBullets,
      showNavigation,
      showPagination,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
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
      layoutHeightSwitcher
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
    });
    const innerBlocksProps = import_block_editor2.useInnerBlocksProps.save({
      className: "swiper-wrapper gslider-swiper-wrapper"
    });
    const navigationEnabled = {
      Mobile: !!showNavigation?.Mobile,
      Tablet: !!showNavigation?.Tablet,
      Desktop: !!showNavigation?.Desktop
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    const paginationEnabled = {
      Mobile: !!showPagination?.Mobile,
      Tablet: !!showPagination?.Tablet,
      Desktop: !!showPagination?.Desktop
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    const swiperSettings = JSON.stringify({
      effect: sliderType === "carousel" ? carouselEffect : slideEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0
          },
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet || 20
          },
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Desktop || 2,
            spaceBetween: carouselPerColumnGap?.Desktop || 20
          },
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
        }
      },
      ...layoutHeightSwitcher === "auto" && {
        autoHeight: true
      },
      // Common settings
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      navigation: {
        enabled: anyNavigationEnabled,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        enabled: anyPaginationEnabled,
        el: ".swiper-pagination",
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `swiper ${globalClass}`,
          ...globalID && { id: globalID },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...innerBlocksProps }),
            anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      "aria-label": "Previous slide"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      "aria-label": "Next slide"
                    }
                  )
                ]
              }
            ) }),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
                ]
              }
            ),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: navigationArrowsIconLeftImageAlt
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconRightImageUrl,
                      alt: navigationArrowsIconRightImageAlt
                    }
                  ) })
                ]
              }
            ),
            anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-pagination" }) }) })
          ]
        }
      ),
      anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "img",
              {
                src: navigationArrowsIconLeftImageUrl,
                alt: navigationArrowsIconLeftImageAlt
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "img",
              {
                src: navigationArrowsIconRightImageUrl,
                alt: navigationArrowsIconRightImageAlt
              }
            ) })
          ]
        }
      )
    ] });
  }
};
var v1_0_9 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      carouselEffect,
      slideEffect,
      mousewheelControl,
      paginationType,
      dynamicBullets,
      showNavigation,
      showPagination,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
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
      layoutHeightSwitcher
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
    });
    const innerBlocksProps = import_block_editor2.useInnerBlocksProps.save({
      className: "swiper-wrapper gslider-swiper-wrapper"
    });
    const navigationEnabled = {
      Mobile: !!showNavigation?.Mobile,
      Tablet: !!showNavigation?.Tablet,
      Desktop: !!showNavigation?.Desktop
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    const paginationEnabled = {
      Mobile: !!showPagination?.Mobile,
      Tablet: !!showPagination?.Tablet,
      Desktop: !!showPagination?.Desktop
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    const swiperSettings = JSON.stringify({
      effect: sliderType === "carousel" ? carouselEffect : slideEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0
          },
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet || 20
          },
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Desktop || 2,
            spaceBetween: carouselPerColumnGap?.Desktop || 20
          },
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
        }
      },
      ...layoutHeightSwitcher === "auto" && {
        autoHeight: true
      },
      // Common settings
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      navigation: {
        enabled: anyNavigationEnabled,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        enabled: anyPaginationEnabled,
        el: ".swiper-pagination",
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `swiper ${globalClass}`,
          ...globalID && { id: globalID },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...innerBlocksProps }),
            anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      "aria-label": "Previous slide"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      "aria-label": "Next slide"
                    }
                  )
                ]
              }
            ) }),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
                ]
              }
            ),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: navigationArrowsIconLeftImageAlt
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconRightImageUrl,
                      alt: navigationArrowsIconRightImageAlt
                    }
                  ) })
                ]
              }
            ),
            anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-pagination" }) }) })
          ]
        }
      ),
      anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "img",
              {
                src: navigationArrowsIconLeftImageUrl,
                alt: navigationArrowsIconLeftImageAlt
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "img",
              {
                src: navigationArrowsIconRightImageUrl,
                alt: navigationArrowsIconRightImageAlt
              }
            ) })
          ]
        }
      )
    ] });
  }
};
var v1_0_10 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      carouselEffect,
      slideEffect,
      mousewheelControl,
      paginationType,
      dynamicBullets,
      showNavigation,
      showPagination,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
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
      layoutHeightSwitcher
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
    });
    const innerBlocksProps = import_block_editor2.useInnerBlocksProps.save({
      className: "swiper-wrapper gslider-swiper-wrapper"
    });
    const navigationEnabled = {
      Mobile: !!showNavigation?.Mobile,
      Tablet: !!showNavigation?.Tablet,
      Desktop: !!showNavigation?.Desktop
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    const paginationEnabled = {
      Mobile: !!showPagination?.Mobile,
      Tablet: !!showPagination?.Tablet,
      Desktop: !!showPagination?.Desktop
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    const swiperSettings = JSON.stringify({
      effect: sliderType === "carousel" ? carouselEffect : slideEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0
          },
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet || 20
          },
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Desktop || 2,
            spaceBetween: carouselPerColumnGap?.Desktop || 20
          },
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
        }
      },
      ...layoutHeightSwitcher === "adapt" && {
        autoHeight: true
      },
      // Common settings
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      navigation: {
        enabled: anyNavigationEnabled,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        enabled: anyPaginationEnabled,
        el: ".swiper-pagination",
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `swiper ${globalClass}`,
          ...globalID && { id: globalID },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...innerBlocksProps }),
            anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide"
                    }
                  )
                ]
              }
            ) }),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: renderIcon_default(navigationArrowsIconLeft)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: renderIcon_default(navigationArrowsIconRight)
                    }
                  )
                ]
              }
            ),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconLeftImageUrl,
                          alt: navigationArrowsIconLeftImageAlt
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconRightImageUrl,
                          alt: navigationArrowsIconRightImageAlt
                        }
                      )
                    }
                  )
                ]
              }
            ),
            anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-pagination" }) }) })
          ]
        }
      ),
      anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: renderIcon_default(navigationArrowsIconLeft)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: renderIcon_default(navigationArrowsIconRight)
              }
            )
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: navigationArrowsIconLeftImageAlt
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: navigationArrowsIconRightImageAlt
                  }
                )
              }
            )
          ]
        }
      )
    ] });
  }
};
var v1_1_1 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      carouselEffect,
      slideEffect,
      mousewheelControl,
      paginationType,
      dynamicBullets,
      showNavigation,
      showPagination,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
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
      layoutHeightSwitcher
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
    });
    const innerBlocksProps = import_block_editor2.useInnerBlocksProps.save({
      className: "swiper-wrapper gslider-swiper-wrapper"
    });
    const navigationEnabled = {
      Mobile: !!showNavigation?.Mobile,
      Tablet: !!showNavigation?.Tablet,
      Desktop: !!showNavigation?.Desktop
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    const paginationEnabled = {
      Mobile: !!showPagination?.Mobile,
      Tablet: !!showPagination?.Tablet,
      Desktop: !!showPagination?.Desktop
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    const swiperSettings = JSON.stringify({
      effect: sliderType === "carousel" ? carouselEffect : slideEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0
          },
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet || 20
          },
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Desktop || 2,
            spaceBetween: carouselPerColumnGap?.Desktop || 20
          },
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
        }
      },
      ...layoutHeightSwitcher === "adapt" && {
        autoHeight: true
      },
      // Common settings
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      navigation: {
        enabled: anyNavigationEnabled,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        enabled: anyPaginationEnabled,
        el: ".swiper-pagination",
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `swiper ${globalClass}`,
          ...globalID && { id: globalID },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...innerBlocksProps }),
            anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide"
                    }
                  )
                ]
              }
            ) }),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: renderIcon_default(navigationArrowsIconLeft)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: renderIcon_default(navigationArrowsIconRight)
                    }
                  )
                ]
              }
            ),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconLeftImageUrl,
                          alt: navigationArrowsIconLeftImageAlt
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconRightImageUrl,
                          alt: navigationArrowsIconRightImageAlt
                        }
                      )
                    }
                  )
                ]
              }
            ),
            anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-pagination" }) }) })
          ]
        }
      ),
      anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: renderIcon_default(navigationArrowsIconLeft)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: renderIcon_default(navigationArrowsIconRight)
              }
            )
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: navigationArrowsIconLeftImageAlt
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: navigationArrowsIconRightImageAlt
                  }
                )
              }
            )
          ]
        }
      )
    ] });
  }
};
var v1_1_2 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      carouselEffect,
      slideEffect,
      mousewheelControl,
      keyboardNavigation,
      paginationType,
      dynamicBullets,
      showNavigation,
      showPagination,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
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
      layoutHeightSwitcher
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
    });
    const innerBlocksProps = import_block_editor2.useInnerBlocksProps.save({
      className: "swiper-wrapper gslider-swiper-wrapper"
    });
    const navigationEnabled = {
      Mobile: !!showNavigation?.Mobile,
      Tablet: !!showNavigation?.Tablet,
      Desktop: !!showNavigation?.Desktop
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    const paginationEnabled = {
      Mobile: !!showPagination?.Mobile,
      Tablet: !!showPagination?.Tablet,
      Desktop: !!showPagination?.Desktop
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    const swiperSettings = JSON.stringify({
      effect: sliderType === "carousel" ? carouselEffect : slideEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0
          },
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet || 20
          },
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Desktop || 2,
            spaceBetween: carouselPerColumnGap?.Desktop || 20
          },
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
        }
      },
      ...layoutHeightSwitcher === "adapt" && {
        autoHeight: true
      },
      // Common settings
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      keyboard: keyboardNavigation ? {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: false
      } : false,
      navigation: {
        enabled: anyNavigationEnabled,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        enabled: anyPaginationEnabled,
        el: ".swiper-pagination",
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `swiper ${globalClass}`,
          ...globalID && { id: globalID },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...innerBlocksProps }),
            anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide"
                    }
                  )
                ]
              }
            ) }),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: renderIcon_default(navigationArrowsIconLeft)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: renderIcon_default(navigationArrowsIconRight)
                    }
                  )
                ]
              }
            ),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconLeftImageUrl,
                          alt: navigationArrowsIconLeftImageAlt
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconRightImageUrl,
                          alt: navigationArrowsIconRightImageAlt
                        }
                      )
                    }
                  )
                ]
              }
            ),
            anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-pagination" }) }) })
          ]
        }
      ),
      anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: renderIcon_default(navigationArrowsIconLeft)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: renderIcon_default(navigationArrowsIconRight)
              }
            )
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: navigationArrowsIconLeftImageAlt
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: navigationArrowsIconRightImageAlt
                  }
                )
              }
            )
          ]
        }
      )
    ] });
  }
};
var v1_1_5 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      carouselEffect,
      slideEffect,
      mousewheelControl,
      keyboardNavigation,
      paginationType,
      dynamicBullets,
      showNavigation,
      showPagination,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
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
      layoutHeightSwitcher
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
    });
    const innerBlocksProps = import_block_editor2.useInnerBlocksProps.save({
      className: "swiper-wrapper gslider-swiper-wrapper"
    });
    const navigationEnabled = {
      Mobile: !!showNavigation?.Mobile,
      Tablet: !!showNavigation?.Tablet,
      Desktop: !!showNavigation?.Desktop
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    const paginationEnabled = {
      Mobile: !!showPagination?.Mobile,
      Tablet: !!showPagination?.Tablet,
      Desktop: !!showPagination?.Desktop
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    const swiperSettings = JSON.stringify({
      effect: sliderType === "carousel" ? carouselEffect : slideEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0
          },
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet || 20
          },
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Desktop || 2,
            spaceBetween: carouselPerColumnGap?.Desktop || 20
          },
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
        }
      },
      ...layoutHeightSwitcher === "adapt" && {
        autoHeight: true
      },
      // Common settings
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      keyboard: keyboardNavigation ? {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: false
      } : false,
      navigation: {
        enabled: anyNavigationEnabled,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        enabled: anyPaginationEnabled,
        el: ".swiper-pagination",
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `swiper ${globalClass}`,
          ...globalID && { id: globalID },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...innerBlocksProps }),
            anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide"
                    }
                  )
                ]
              }
            ) }),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: renderIcon_default(navigationArrowsIconLeft)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: renderIcon_default(navigationArrowsIconRight)
                    }
                  )
                ]
              }
            ),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconLeftImageUrl,
                          alt: navigationArrowsIconLeftImageAlt
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconRightImageUrl,
                          alt: navigationArrowsIconRightImageAlt
                        }
                      )
                    }
                  )
                ]
              }
            ),
            anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "swiper-pagination" }) }) })
          ]
        }
      ),
      anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: renderIcon_default(navigationArrowsIconLeft)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: renderIcon_default(navigationArrowsIconRight)
              }
            )
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: navigationArrowsIconLeftImageAlt
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: navigationArrowsIconRightImageAlt
                  }
                )
              }
            )
          ]
        }
      )
    ] });
  }
};
var v1_1_6 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      carouselEffect,
      slideEffect,
      mousewheelControl,
      keyboardNavigation,
      paginationType,
      dynamicBullets,
      showNavigation,
      showPagination,
      paginationPositionType,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
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
      layoutHeightSwitcher
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? "has-pagination" : ""}`
    });
    const innerBlocksProps = import_block_editor2.useInnerBlocksProps.save({
      className: "swiper-wrapper gslider-swiper-wrapper"
    });
    const navigationEnabled = {
      Mobile: !!showNavigation?.Mobile,
      Tablet: !!showNavigation?.Tablet,
      Desktop: !!showNavigation?.Desktop
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    const paginationEnabled = {
      Mobile: !!showPagination?.Mobile,
      Tablet: !!showPagination?.Tablet,
      Desktop: !!showPagination?.Desktop
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    const swiperSettings = JSON.stringify({
      effect: sliderType === "carousel" ? carouselEffect : slideEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0
          },
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet || 20
          },
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Desktop || 2,
            spaceBetween: carouselPerColumnGap?.Desktop || 20
          },
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
        }
      },
      ...layoutHeightSwitcher === "adapt" && {
        autoHeight: true
      },
      // Common settings
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      keyboard: keyboardNavigation ? {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: false
      } : false,
      navigation: {
        enabled: anyNavigationEnabled,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        enabled: anyPaginationEnabled,
        el: `.${blockId} .swiper-pagination-flexi-content`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `swiper ${globalClass}`,
          ...globalID && { id: globalID },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...innerBlocksProps }),
            anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide"
                    }
                  )
                ]
              }
            ) }),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: renderIcon_default(navigationArrowsIconLeft)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: renderIcon_default(navigationArrowsIconRight)
                    }
                  )
                ]
              }
            ),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconLeftImageUrl,
                          alt: navigationArrowsIconLeftImageAlt
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconRightImageUrl,
                          alt: navigationArrowsIconRightImageAlt
                        }
                      )
                    }
                  )
                ]
              }
            ),
            anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-pagination swiper-pagination-flexi-content",
                "aria-label": "Carousel pagination"
              }
            ) })
          ]
        }
      ),
      anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: renderIcon_default(navigationArrowsIconLeft)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: renderIcon_default(navigationArrowsIconRight)
              }
            )
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: navigationArrowsIconLeftImageAlt
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: navigationArrowsIconRightImageAlt
                  }
                )
              }
            )
          ]
        }
      ),
      anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          className: `swiper-pagination swiper-pagination-flexi-content swiper-pagination-${blockId}`,
          "aria-label": "Carousel pagination"
        }
      ) })
    ] });
  }
};
var v1_1_7 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      carouselEffect,
      slideEffect,
      mousewheelControl,
      keyboardNavigation,
      paginationType,
      dynamicBullets,
      showNavigation,
      showPagination,
      paginationPositionType,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
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
      layoutHeightSwitcher
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? "has-pagination" : ""}`
    });
    const innerBlocksProps = import_block_editor2.useInnerBlocksProps.save({
      className: "swiper-wrapper gslider-swiper-wrapper"
    });
    const navigationEnabled = {
      Mobile: !!showNavigation?.Mobile,
      Tablet: !!showNavigation?.Tablet,
      Desktop: !!showNavigation?.Desktop
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    const paginationEnabled = {
      Mobile: !!showPagination?.Mobile,
      Tablet: !!showPagination?.Tablet,
      Desktop: !!showPagination?.Desktop
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    const swiperSettings = JSON.stringify({
      effect: sliderType === "carousel" ? carouselEffect : slideEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0
          },
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet ?? 20
          },
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Desktop || 2,
            spaceBetween: carouselPerColumnGap?.Desktop ?? 20
          },
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
        }
      },
      ...layoutHeightSwitcher === "adapt" && {
        autoHeight: true
      },
      // Common settings
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      keyboard: keyboardNavigation ? {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: false
      } : false,
      navigation: {
        enabled: anyNavigationEnabled,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        enabled: anyPaginationEnabled,
        el: `.${blockId} .swiper-pagination-flexi-content`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `swiper ${globalClass}`,
          ...globalID && { id: globalID },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...innerBlocksProps }),
            anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide"
                    }
                  )
                ]
              }
            ) }),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: renderIcon_default(navigationArrowsIconLeft)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: renderIcon_default(navigationArrowsIconRight)
                    }
                  )
                ]
              }
            ),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconLeftImageUrl,
                          alt: navigationArrowsIconLeftImageAlt
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconRightImageUrl,
                          alt: navigationArrowsIconRightImageAlt
                        }
                      )
                    }
                  )
                ]
              }
            ),
            anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-pagination swiper-pagination-flexi-content",
                "aria-label": "Carousel pagination"
              }
            ) })
          ]
        }
      ),
      anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: renderIcon_default(navigationArrowsIconLeft)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: renderIcon_default(navigationArrowsIconRight)
              }
            )
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: navigationArrowsIconLeftImageAlt
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: navigationArrowsIconRightImageAlt
                  }
                )
              }
            )
          ]
        }
      ),
      anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          className: `swiper-pagination swiper-pagination-flexi-content swiper-pagination-${blockId}`,
          "aria-label": "Carousel pagination"
        }
      ) })
    ] });
  }
};
var v1_2_0 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      carouselEffect,
      slideEffect,
      mousewheelControl,
      keyboardNavigation,
      paginationType,
      dynamicBullets,
      showNavigation,
      showPagination,
      paginationPositionType,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
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
      layoutHeightSwitcher
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}`
    });
    const innerBlocksProps = import_block_editor2.useInnerBlocksProps.save({
      className: "swiper-wrapper gslider-swiper-wrapper"
    });
    const navigationEnabled = {
      Mobile: !!showNavigation?.Mobile,
      Tablet: !!showNavigation?.Tablet,
      Desktop: !!showNavigation?.Desktop
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    const paginationEnabled = {
      Mobile: !!showPagination?.Mobile,
      Tablet: !!showPagination?.Tablet,
      Desktop: !!showPagination?.Desktop
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    const swiperSettings = JSON.stringify({
      effect: sliderType === "carousel" ? carouselEffect : slideEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Mobile || 1,
            spaceBetween: carouselPerColumnGap?.Mobile || 0
          },
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Tablet || 2,
            spaceBetween: carouselPerColumnGap?.Tablet ?? 20
          },
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          ...sliderType === "carousel" && {
            slidesPerView: carouselPerColumn?.Desktop || 2,
            spaceBetween: carouselPerColumnGap?.Desktop ?? 20
          },
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
        }
      },
      ...layoutHeightSwitcher === "adapt" && {
        autoHeight: true
      },
      // Common settings
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      keyboard: keyboardNavigation ? {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: false
      } : false,
      navigation: {
        enabled: anyNavigationEnabled,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        enabled: anyPaginationEnabled,
        el: `.${blockId} .swiper-pagination-flexi-content`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      // Creative effect settings if needed
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `swiper ${globalClass}`,
          ...globalID && { id: globalID },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ...innerBlocksProps }),
            anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide"
                    }
                  )
                ]
              }
            ) }),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: renderIcon_default(navigationArrowsIconLeft)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: renderIcon_default(navigationArrowsIconRight)
                    }
                  )
                ]
              }
            ),
            anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-prev",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Previous slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconLeftImageUrl,
                          alt: navigationArrowsIconLeftImageAlt
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: "swiper-button-next",
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Next slide",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: navigationArrowsIconRightImageUrl,
                          alt: navigationArrowsIconRightImageAlt
                        }
                      )
                    }
                  )
                ]
              }
            ),
            anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-pagination swiper-pagination-flexi-content",
                "aria-label": "Carousel pagination"
              }
            ) })
          ]
        }
      ),
      anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: renderIcon_default(navigationArrowsIconLeft)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: renderIcon_default(navigationArrowsIconRight)
              }
            )
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                role: "button",
                tabIndex: 0,
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: navigationArrowsIconLeftImageAlt
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: navigationArrowsIconRightImageAlt
                  }
                )
              }
            )
          ]
        }
      ),
      anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          className: `swiper-pagination swiper-pagination-flexi-content swiper-pagination-${blockId}`,
          "aria-label": "Carousel pagination"
        }
      ) })
    ] });
  }
};
var deprecated_default = [
  v1_2_0,
  v1_1_7,
  v1_1_6,
  v1_0_7,
  v1_0_8,
  v1_0_9,
  v1_0_10,
  v1_1_1,
  v1_1_2,
  v1_1_5
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attributes,
  deprecated,
  meta,
  save,
  styling
});
