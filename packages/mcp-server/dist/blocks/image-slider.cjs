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

// ../../src/blocks/image-slider/image-slider-entry.js
var image_slider_entry_exports = {};
__export(image_slider_entry_exports, {
  attributes: () => attributes_default,
  deprecated: () => deprecated_default,
  meta: () => block_default,
  save: () => Save,
  styling: () => styling_default
});
module.exports = __toCommonJS(image_slider_entry_exports);

// ../../src/blocks/image-slider/block.json
var block_default = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "gslider-blocks/image-slider",
  version: "1.2.1",
  title: "Image Slider",
  category: "gslider-blocks",
  description: "Versatile image slider with captions, lightbox, and advanced interactive effects.",
  keywords: [
    "image",
    "images",
    "client image",
    "brand",
    "brand image",
    "partner",
    "carousel",
    "slider",
    "image slider"
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
    align: [
      "wide",
      "full"
    ]
  },
  textdomain: "gslider-blocks",
  editorScript: [
    "file:./index.js",
    "gslider-blocks-swiper-script",
    "gslider-blocks-fslightbox-script"
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
    "gslider-blocks-swiper-script",
    "gslider-blocks-fslightbox-script"
  ]
};

// ../../src/blocks/image-slider/attributes.js
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
  images: {
    type: "array",
    default: [],
    items: {
      type: "object",
      properties: {
        id: { type: "number" },
        url: { type: "string" },
        alt: { type: "string" },
        link: { type: "string" },
        caption: { type: "string" },
        tooltipText: { type: "string" }
      }
    }
  },
  /** Start Carousel Settings */
  carouselPerColumn: {
    type: "object",
    default: {
      Desktop: 1,
      Tablet: 1,
      Mobile: 1
    }
  },
  carouselPerColumnGap: {
    type: "object",
    default: {
      Desktop: 0,
      Tablet: 0,
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
  enableLazyLoad: {
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
  /** End Carousel Settings */
  showCaption: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  /** Start Show/Hide Elements */
  paginationPositionType: {
    type: "string",
    default: "outside"
  },
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
  /** End Show/Hide Elements */
  /** Start image Link Settings */
  enableimageLinks: {
    type: "boolean",
    default: false
  },
  enableLightbox: {
    type: "object",
    default: {
      Desktop: false,
      Tablet: false,
      Mobile: false
    }
  },
  showTooltip: {
    type: "boolean",
    default: false
  },
  imageLinkTarget: {
    type: "string",
    default: "_blank"
  },
  imageLinkRel: {
    type: "string",
    default: "noopener noreferrer"
  },
  imageLinkHoverEffect: {
    type: "string",
    default: "none"
  },
  imageLinkHoverOpacity: {
    type: "object",
    default: {
      Desktop: 0.8,
      Tablet: 0.8,
      Mobile: 0.8
    }
  },
  imageLinkHoverScale: {
    type: "object",
    default: {
      Desktop: 1.05,
      Tablet: 1.05,
      Mobile: 1.05
    }
  },
  imageLinkHoverLift: {
    type: "object",
    default: {
      Desktop: 10,
      Tablet: 10,
      Mobile: 10
    }
  },
  imageLinkHoverLiftUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageLinkTransitionDuration: {
    type: "object",
    default: {
      Desktop: 300,
      Tablet: 300,
      Mobile: 300
    }
  },
  /** End image Link Settings */
  /** Layout & Content Setting */
  layoutHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
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
  verticalAlign: {
    type: "object",
    default: {
      Desktop: "center",
      Tablet: "center",
      Mobile: "center"
    }
  },
  /** End Layout & Content Setting */
  /** Start image Max Width */
  imageMaxWidth: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  imageMaxWidthUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  /** End image Max Width */
  /** Start image Padding */
  imagePaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imagePaddingDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imagePaddingDesktopCssStyle: {
    type: "string",
    default: ""
  },
  imagePaddingTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imagePaddingTabletCssStyle: {
    type: "string",
    default: ""
  },
  imagePaddingMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imagePaddingMobileCssStyle: {
    type: "string",
    default: ""
  },
  imagePaddingLink: {
    type: "boolean",
    default: true
  },
  /** End image Padding */
  /** Start image Background */
  imageNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  imageNormalClassicColor: {
    type: "string",
    default: ""
  },
  imageNormalGradientColor: {
    type: "string",
    default: null
  },
  imageNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  imageNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  imageHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  imageHoverClassicColor: {
    type: "string",
    default: ""
  },
  imageHoverGradientColor: {
    type: "string",
    default: null
  },
  imageHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  imageHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End image Background */
  /** Start image Border */
  imageBorder: {
    type: "string",
    default: "none"
  },
  imageBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  imageBorderColor: {
    type: "string"
  },
  imageBorderHoverColor: {
    type: "string"
  },
  imageBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageBorderDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageBorderDesktopCssStyle: {
    type: "string",
    default: ""
  },
  imageBorderTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageBorderTabletCssStyle: {
    type: "string",
    default: ""
  },
  imageBorderMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageBorderMobileCssStyle: {
    type: "string",
    default: ""
  },
  imageBorderLink: {
    type: "boolean",
    default: true
  },
  imageBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageBorderRadiusDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageBorderRadiusDesktopCssStyle: {
    type: "string",
    default: ""
  },
  imageBorderRadiusTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageBorderRadiusTabletCssStyle: {
    type: "string",
    default: ""
  },
  imageBorderRadiusMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageBorderRadiusMobileCssStyle: {
    type: "string",
    default: ""
  },
  imageBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  imageBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  imageBoxShadowValues: {
    type: "array",
    default: []
  },
  imageBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  imageBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  imageBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  },
  /** End image Border */
  /** Start image Caption Typography */
  imageCaptionFontFamily: {
    type: "string",
    default: ""
  },
  imageCaptionFontSize: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  imageCaptionFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageCaptionFontWeight: {
    type: "string",
    default: ""
  },
  imageCaptionFontStyle: {
    type: "string",
    default: ""
  },
  imageCaptionTextTransform: {
    type: "string",
    default: ""
  },
  imageCaptionTextDecoration: {
    type: "string",
    default: ""
  },
  imageCaptionLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  imageCaptionLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageCaptionLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  imageCaptionLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageCaptionWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  imageCaptionWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End image Caption Typography */
  /** Start image Caption Color */
  imageCaptionColorSwitcher: {
    type: "string",
    default: "normal"
  },
  imageCaptionColor: {
    type: "string",
    default: "#ffffff"
  },
  imageCaptionColorHover: {
    type: "string",
    default: ""
  },
  /** End image Caption Color */
  /** Start image Caption Background */
  imageCaptionNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  imageCaptionNormalClassicColor: {
    type: "string",
    default: "#00000075"
  },
  imageCaptionNormalGradientColor: {
    type: "string",
    default: null
  },
  imageCaptionNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  imageCaptionNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  imageCaptionHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  imageCaptionHoverClassicColor: {
    type: "string",
    default: ""
  },
  imageCaptionHoverGradientColor: {
    type: "string",
    default: null
  },
  imageCaptionHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  imageCaptionHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End image Caption Background */
  /** Start image Caption Border */
  imageCaptionBorder: {
    type: "string",
    default: "none"
  },
  imageCaptionBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  imageCaptionBorderColor: {
    type: "string"
  },
  imageCaptionBorderHoverColor: {
    type: "string"
  },
  imageCaptionBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageCaptionBorderDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageCaptionBorderDesktopCssStyle: {
    type: "string",
    default: ""
  },
  imageCaptionBorderTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageCaptionBorderTabletCssStyle: {
    type: "string",
    default: ""
  },
  imageCaptionBorderMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageCaptionBorderMobileCssStyle: {
    type: "string",
    default: ""
  },
  imageCaptionBorderLink: {
    type: "boolean",
    default: true
  },
  imageCaptionBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageCaptionBorderRadiusDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageCaptionBorderRadiusDesktopCssStyle: {
    type: "string",
    default: ""
  },
  imageCaptionBorderRadiusTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageCaptionBorderRadiusTabletCssStyle: {
    type: "string",
    default: ""
  },
  imageCaptionBorderRadiusMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageCaptionBorderRadiusMobileCssStyle: {
    type: "string",
    default: ""
  },
  imageCaptionBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End image Caption Border */
  /** Start image Caption Padding */
  imageCaptionPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageCaptionPaddingDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageCaptionPaddingDesktopCssStyle: {
    type: "string",
    default: ""
  },
  imageCaptionPaddingTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageCaptionPaddingTabletCssStyle: {
    type: "string",
    default: ""
  },
  imageCaptionPaddingMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageCaptionPaddingMobileCssStyle: {
    type: "string",
    default: ""
  },
  imageCaptionPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End image Caption Padding */
  /** Start image Tooltip Typography */
  imageTooltipFontFamily: {
    type: "string",
    default: ""
  },
  imageTooltipFontSize: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  imageTooltipFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageTooltipFontWeight: {
    type: "string",
    default: ""
  },
  imageTooltipFontStyle: {
    type: "string",
    default: ""
  },
  imageTooltipTextTransform: {
    type: "string",
    default: ""
  },
  imageTooltipTextDecoration: {
    type: "string",
    default: ""
  },
  imageTooltipLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  imageTooltipLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageTooltipLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  imageTooltipLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageTooltipWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  imageTooltipWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End image Tooltip Typography */
  /** Start image Tooltip Color */
  imageTooltipColor: {
    type: "string",
    default: "#ffffff"
  },
  imageTooltipBgColor: {
    type: "string",
    default: "#00000085"
  },
  /** End image Tooltip Color */
  /** Start image Tooltip Border */
  imageTooltipBorder: {
    type: "string",
    default: "none"
  },
  imageTooltipBorderColor: {
    type: "string"
  },
  imageTooltipBorderHoverColor: {
    type: "string"
  },
  imageTooltipBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageTooltipBorderDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageTooltipBorderDesktopCssStyle: {
    type: "string",
    default: ""
  },
  imageTooltipBorderTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageTooltipBorderTabletCssStyle: {
    type: "string",
    default: ""
  },
  imageTooltipBorderMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageTooltipBorderMobileCssStyle: {
    type: "string",
    default: ""
  },
  imageTooltipBorderLink: {
    type: "boolean",
    default: true
  },
  imageTooltipBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageTooltipBorderRadiusDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageTooltipBorderRadiusDesktopCssStyle: {
    type: "string",
    default: ""
  },
  imageTooltipBorderRadiusTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageTooltipBorderRadiusTabletCssStyle: {
    type: "string",
    default: ""
  },
  imageTooltipBorderRadiusMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageTooltipBorderRadiusMobileCssStyle: {
    type: "string",
    default: ""
  },
  imageTooltipBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End image Tooltip Border */
  /** Start image Tooltip Padding */
  imageTooltipPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageTooltipPaddingDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageTooltipPaddingDesktopCssStyle: {
    type: "string",
    default: ""
  },
  imageTooltipPaddingTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageTooltipPaddingTabletCssStyle: {
    type: "string",
    default: ""
  },
  imageTooltipPaddingMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageTooltipPaddingMobileCssStyle: {
    type: "string",
    default: ""
  },
  imageTooltipPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End image Tooltip Padding */
  /** Start image Tooltip Position */
  imageTooltipTopPosition: {
    type: "object",
    default: {
      Desktop: "50",
      Tablet: "50",
      Mobile: "50"
    }
  },
  imageTooltipTopPositionUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  imageTooltipLeftPosition: {
    type: "object",
    default: {
      Desktop: "50",
      Tablet: "50",
      Mobile: "50"
    }
  },
  imageTooltipLeftPositionUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  /** End image Tooltip Position */
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

// ../../src/blocks/image-slider/save.js
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

// ../../src/blocks/image-slider/save.js
var import_jsx_runtime2 = require("react/jsx-runtime");
function Save({ attributes: attributes2 }) {
  const {
    blockId,
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
    mousewheelControl,
    keyboardNavigation,
    paginationType,
    dynamicBullets,
    images,
    showCaption,
    paginationPositionType,
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
    navigationArrowsIconRightAlign,
    navigationArrowsIconRight,
    navigationArrowsIconRightImageUrl,
    navigationArrowsIconRightImageAlt,
    enableimageLinks,
    enableLightbox,
    showTooltip,
    imageLinkTarget,
    imageLinkRel,
    imageLinkHoverEffect,
    enableLazyLoad
  } = attributes2;
  const blockProps = import_block_editor.useBlockProps.save({
    className: `gslider-image-slider-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}`
  });
  const captionEnabled = {
    Mobile: !!showCaption?.Mobile,
    Tablet: !!showCaption?.Tablet,
    Desktop: !!showCaption?.Desktop
  };
  const anyCaptionEnabled = captionEnabled.Mobile || captionEnabled.Tablet || captionEnabled.Desktop;
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
  const lightboxDevices = ["Desktop", "Tablet", "Mobile"].filter((device) => enableLightbox?.[device] === true).join(" ");
  const linkOnLightboxOff = enableimageLinks && lightboxDevices && lightboxDevices !== "Desktop Tablet Mobile";
  const swiperSettings = JSON.stringify({
    effect: carouselEffect,
    // Responsive breakpoints for Desktop, Tablet, and Mobile
    breakpoints: {
      0: {
        slidesPerView: carouselPerColumn?.Mobile || 1,
        spaceBetween: carouselPerColumnGap?.Mobile || 0,
        speed: speed?.Mobile || 800,
        autoplay: autoplay ? {
          delay: autoplayDelay?.Mobile || 1e3
        } : false,
        navigation: { enabled: navigationEnabled.Mobile },
        pagination: { enabled: paginationEnabled.Mobile }
      },
      768: {
        slidesPerView: carouselPerColumn?.Tablet || 2,
        spaceBetween: carouselPerColumnGap?.Tablet ?? 20,
        speed: speed?.Tablet || 800,
        autoplay: autoplay ? {
          delay: autoplayDelay?.Tablet || 1e3
        } : false,
        navigation: { enabled: navigationEnabled.Tablet },
        pagination: { enabled: paginationEnabled.Tablet }
      },
      1025: {
        slidesPerView: carouselPerColumn?.Desktop || 2,
        spaceBetween: carouselPerColumnGap?.Desktop ?? 20,
        speed: speed?.Desktop || 800,
        autoplay: autoplay ? {
          delay: autoplayDelay?.Desktop || 1e3
        } : false,
        navigation: { enabled: navigationEnabled.Desktop },
        pagination: { enabled: paginationEnabled.Desktop }
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
      // Patterns keep blockId empty, so fall back to an unscoped selector.
      el: blockId ? `.${blockId} .swiper-pagination-image-slider` : ".swiper-pagination-image-slider",
      type: paginationType,
      dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
      clickable: true
    }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      ...blockProps,
      "data-swiper-settings": swiperSettings,
      ...lightboxDevices && {
        "data-slide-lightbox": lightboxDevices
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "swiper", role: "region", "aria-label": "Image Slider", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "swiper-wrapper", children: images.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `swiper-slide`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: `gslider-image-slider-content-wrapper ${globalClass}`,
              ...globalID && { id: globalID },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                  "div",
                  {
                    className: "gslider-image-item",
                    "data-hover-effect": imageLinkHoverEffect,
                    children: [
                      lightboxDevices ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "a",
                        {
                          href: item.url,
                          "data-fslightbox": blockId,
                          "data-caption": item.caption,
                          className: "gslider-image-link",
                          ...linkOnLightboxOff && item.link && {
                            "data-image-link": item.link,
                            "data-image-link-target": imageLinkTarget,
                            "data-image-link-rel": imageLinkRel
                          },
                          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                            "img",
                            {
                              src: item.url,
                              alt: item.alt || `image ${images.indexOf(item) + 1}`,
                              loading: enableLazyLoad ? "lazy" : void 0
                            }
                          )
                        }
                      ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: enableimageLinks && item.link ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "a",
                        {
                          href: item.link,
                          target: imageLinkTarget,
                          rel: imageLinkRel,
                          className: "gslider-image-link",
                          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                            "img",
                            {
                              src: item.url,
                              alt: item.alt || `image ${images.indexOf(
                                item
                              ) + 1}`,
                              loading: enableLazyLoad ? "lazy" : void 0
                            }
                          )
                        }
                      ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "img",
                        {
                          src: item.url,
                          alt: item.alt || `image ${images.indexOf(
                            item
                          ) + 1}`,
                          loading: enableLazyLoad ? "lazy" : void 0
                        }
                      ) }),
                      showTooltip && item.tooltipText && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-image-tooltip", children: item.tooltipText })
                    ]
                  }
                ),
                anyCaptionEnabled && item.caption ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "div",
                  {
                    className: "gslider-image-slider-caption",
                    "aria-live": "polite",
                    children: item.caption
                  }
                ) : null
              ]
            }
          ) }, item.id)) }),
          anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "div",
                  {
                    className: "swiper-button-prev",
                    role: "button",
                    tabIndex: 0,
                    "aria-label": "Previous slide"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
          anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "div",
                  {
                    className: "swiper-button-prev",
                    role: "button",
                    tabIndex: 0,
                    "aria-label": "Previous slide",
                    children: navigationArrowsIconLeftAlign === "image" && navigationArrowsIconLeftImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "img",
                      {
                        src: navigationArrowsIconLeftImageUrl,
                        alt: navigationArrowsIconLeftImageAlt
                      }
                    ) : renderIcon_default(navigationArrowsIconLeft)
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "div",
                  {
                    className: "swiper-button-next",
                    role: "button",
                    tabIndex: 0,
                    "aria-label": "Next slide",
                    children: navigationArrowsIconRightAlign === "image" && navigationArrowsIconRightImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
          anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              className: "swiper-pagination swiper-pagination-image-slider",
              "aria-label": "Carousel pagination"
            }
          ) })
        ] }),
        anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "div",
                {
                  className: "swiper-button-prev",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Previous slide"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
        anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "div",
                {
                  className: "swiper-button-prev",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Previous slide",
                  children: navigationArrowsIconLeftAlign === "image" && navigationArrowsIconLeftImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: navigationArrowsIconLeftImageAlt
                    }
                  ) : renderIcon_default(navigationArrowsIconLeft)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "div",
                {
                  className: "swiper-button-next",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Next slide",
                  children: navigationArrowsIconRightAlign === "image" && navigationArrowsIconRightImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
        anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: `swiper-pagination swiper-pagination-image-slider${blockId ? ` swiper-pagination-${blockId}` : ""}`,
            "aria-label": "Carousel pagination"
          }
        ) })
      ]
    }
  );
}

// ../../src/blocks/image-slider/styling.js
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
var getHasPaginationCss = (blockId, showPagination, device, fallbackDevices, offset) => {
  const rule = (marginBottom) => `.${blockId}.gslider-image-slider-wrapper.has-pagination { margin-bottom: ${marginBottom}; }`;
  if (showPagination?.[device]) {
    return rule(offset);
  }
  if (fallbackDevices.some((d) => showPagination?.[d])) {
    return rule("0");
  }
  return "";
};
var generateImageSliderStyle = (attributes2) => {
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
    globalBoxShadowHoverCssValue
    /** End Global Box Shadow */
  } = attributes2;
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
  const imageSliderCSS = `
        .${blockId}.gslider-image-slider-wrapper {
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
            transition: background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out;
        }
        .${blockId}.gslider-image-slider-wrapper:hover {
            ${globalDesktopBackgroundHoverStyles}
            ${globalBorderHoverColor ? `border-color: ${globalBorderHoverColor};` : ""}
            ${globalBoxShadowHoverCssValue ? `box-shadow: ${globalBoxShadowHoverCssValue} !important;` : ""}
        }

        .${blockId} .swiper-slide {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper {
            ${layoutHeight.Desktop ? `height: ${layoutHeight.Desktop}${layoutHeightUnits.Desktop};` : "auto"}
            ${imagePaddingDesktopCssStyle ? `padding: ${imagePaddingDesktopCssStyle};` : ""}
            ${imageBorder ? `border: ${imageBorder};` : ""}
			${imageBorderDesktopCssStyle ? `border-width: ${imageBorderDesktopCssStyle};` : ""}  
			${imageBorderRadiusDesktopCssStyle ? `border-radius: ${imageBorderRadiusDesktopCssStyle} !important;` : ""}
            ${imageBorderColor ? `border-color: ${imageBorderColor};` : ""}
            ${imageBoxShadowCssValue ? `box-shadow: ${imageBoxShadowCssValue} !important;` : ""}
            display: flex;
            align-items: center;
            justify-content: ${verticalAlign.Desktop || "center"};
            transition: background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out;
        }
        .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper:hover {
            ${imageBorderHoverColor ? `border-color: ${imageBorderHoverColor};` : ""}
            ${imageBoxShadowHoverCssValue ? `box-shadow: ${imageBoxShadowHoverCssValue} !important;` : ""}
        }
        .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper img {
            ${imageMaxWidth.Desktop ? `max-width: ${imageMaxWidth.Desktop}${imageMaxWidthUnits.Desktop};` : ""}
            display: block;
            height: auto;
            margin: 0 auto;
        }

        .${blockId}.gslider-image-slider-wrapper .gslider-image-item {
            display: block;
            transition: transform ${imageLinkTransitionDuration?.Desktop || 300}ms ease, opacity ${imageLinkTransitionDuration?.Desktop || 300}ms ease, filter ${imageLinkTransitionDuration?.Desktop || 300}ms ease;
            --hover-opacity: ${imageLinkHoverOpacity?.Desktop || 0.8};
            --hover-scale: ${imageLinkHoverScale?.Desktop || 1.05};
            --hover-lift: ${imageLinkHoverLift?.Desktop || 10}${imageLinkHoverLiftUnits?.Desktop || "px"};
            --transition-duration: ${imageLinkTransitionDuration?.Desktop || 300}ms;
        }
        .${blockId}.gslider-image-slider-wrapper .gslider-image-item:hover {
            ${imageLinkHoverEffect === "opacity" || imageLinkHoverEffect === "both" ? "opacity: var(--hover-opacity);" : ""}
            ${imageLinkHoverEffect === "scale" || imageLinkHoverEffect === "both" ? "transform: scale(var(--hover-scale));" : ""}
            ${imageLinkHoverEffect === "move-up" ? "transform: translateY(calc(-1 * var(--hover-lift)));" : ""}
        }

        .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-caption {           
        
            ${imageCaptionFontFamily ? `font-family: ${imageCaptionFontFamily};` : ""} 
            ${imageCaptionFontSize.Desktop && imageCaptionFontSizeUnits.Desktop ? `font-size: ${imageCaptionFontSize.Desktop}${imageCaptionFontSizeUnits.Desktop};` : ""}
            ${imageCaptionFontWeight ? `font-weight: ${imageCaptionFontWeight};` : ""}
            ${imageCaptionFontStyle ? `font-style: ${imageCaptionFontStyle};` : ""}
            ${imageCaptionTextTransform ? `text-transform: ${imageCaptionTextTransform};` : ""}
            ${imageCaptionTextDecoration ? `text-decoration: ${imageCaptionTextDecoration};` : ""}
            ${imageCaptionLineHeight.Desktop && imageCaptionLineHeightUnits.Desktop ? `line-height: ${imageCaptionLineHeight.Desktop}${imageCaptionLineHeightUnits.Desktop};` : ""}
            ${imageCaptionLetterSpacing.Desktop && imageCaptionLetterSpacingUnits.Desktop ? `letter-spacing: ${imageCaptionLetterSpacing.Desktop}${imageCaptionLetterSpacingUnits.Desktop};` : ""}
            ${imageCaptionWordSpacing.Desktop && imageCaptionWordSpacingUnits.Desktop ? `word-spacing: ${imageCaptionWordSpacing.Desktop}${imageCaptionWordSpacingUnits.Desktop};` : ""}

            ${imageCaptionColor ? `color: ${imageCaptionColor};` : ""}
            ${imageCaptionNormalBackgroundType === "gradient" ? `  
                background: ${resolveGradient(
    imageCaptionNormalCustomGradientSwitcher,
    imageCaptionNormalCustomGradientInputValue,
    imageCaptionNormalGradientColor,
    imageCaptionNormalClassicColor
  )};
            ` : `
                ${imageCaptionNormalClassicColor ? `background: ${imageCaptionNormalClassicColor};` : ""}
            `}
            ${imageCaptionPaddingDesktopCssStyle ? `padding: ${imageCaptionPaddingDesktopCssStyle};` : ""}
            ${imageCaptionBorder ? `border: ${imageCaptionBorder};` : ""}
			${imageCaptionBorderDesktopCssStyle ? `border-width: ${imageCaptionBorderDesktopCssStyle};` : ""}  
			${imageCaptionBorderRadiusDesktopCssStyle ? `border-radius: ${imageCaptionBorderRadiusDesktopCssStyle} !important;` : ""}
            ${imageCaptionBorderColor ? `border-color: ${imageCaptionBorderColor};` : ""}
            transition: color .3s ease-in-out, background-color .3s ease-in-out, border-color .3s ease-in-out;
        }

        .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-caption:hover {
            ${imageCaptionColorHover ? `color: ${imageCaptionColorHover};` : ""}
            ${imageCaptionHoverBackgroundType === "gradient" ? `  
                background: ${resolveGradient(
    imageCaptionHoverCustomGradientSwitcher,
    imageCaptionHoverCustomGradientInputValue,
    imageCaptionHoverGradientColor,
    imageCaptionHoverClassicColor
  )};
            ` : `
                ${imageCaptionHoverClassicColor ? `background: ${imageCaptionHoverClassicColor};` : ""}
            `}
            ${imageCaptionBorderHoverColor ? `border-color: ${imageCaptionBorderHoverColor};` : ""}
        }

        .${blockId}.gslider-image-slider-wrapper .gslider-image-tooltip {           
            ${imageTooltipFontFamily ? `font-family: ${imageTooltipFontFamily};` : ""} 
            ${imageTooltipFontSize.Desktop && imageTooltipFontSizeUnits.Desktop ? `font-size: ${imageTooltipFontSize.Desktop}${imageTooltipFontSizeUnits.Desktop};` : ""}
            ${imageTooltipFontWeight ? `font-weight: ${imageTooltipFontWeight};` : ""}
            ${imageTooltipFontStyle ? `font-style: ${imageTooltipFontStyle};` : ""}
            ${imageTooltipTextTransform ? `text-transform: ${imageTooltipTextTransform};` : ""}
            ${imageTooltipTextDecoration ? `text-decoration: ${imageTooltipTextDecoration};` : ""}
            ${imageTooltipLineHeight.Desktop && imageTooltipLineHeightUnits.Desktop ? `line-height: ${imageTooltipLineHeight.Desktop}${imageTooltipLineHeightUnits.Desktop};` : ""}
            ${imageTooltipLetterSpacing.Desktop && imageTooltipLetterSpacingUnits.Desktop ? `letter-spacing: ${imageTooltipLetterSpacing.Desktop}${imageTooltipLetterSpacingUnits.Desktop};` : ""}
            ${imageTooltipWordSpacing.Desktop && imageTooltipWordSpacingUnits.Desktop ? `word-spacing: ${imageTooltipWordSpacing.Desktop}${imageTooltipWordSpacingUnits.Desktop};` : ""}

            ${imageTooltipColor ? `color: ${imageTooltipColor};` : ""}
            ${imageTooltipBgColor ? `background-color: ${imageTooltipBgColor};` : ""}
            ${imageTooltipPaddingDesktopCssStyle ? `padding: ${imageTooltipPaddingDesktopCssStyle};` : ""}
            ${imageTooltipBorder ? `border: ${imageTooltipBorder};` : ""}
			${imageTooltipBorderDesktopCssStyle ? `border-width: ${imageTooltipBorderDesktopCssStyle};` : ""}  
			${imageTooltipBorderRadiusDesktopCssStyle ? `border-radius: ${imageTooltipBorderRadiusDesktopCssStyle} !important;` : ""}
            ${imageTooltipBorderColor ? `border-color: ${imageTooltipBorderColor};` : ""}
            ${imageTooltipTopPosition.Desktop && imageTooltipTopPositionUnits.Desktop ? `top: ${imageTooltipTopPosition.Desktop}${imageTooltipTopPositionUnits.Desktop};` : ""}
            ${imageTooltipLeftPosition.Desktop && imageTooltipLeftPositionUnits.Desktop ? `left: ${imageTooltipLeftPosition.Desktop}${imageTooltipLeftPositionUnits.Desktop};` : ""}
            transition: opacity .3s ease-in-out, visibility .3s ease-in-out, transform .3s ease-in-out;
        }

        .${blockId}.gslider-image-slider-wrapper.outside {
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

        ${navigationArrowPosition && navigationArrowPosition !== "center" ? `
            .${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition},
            .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition} {
                z-index: 100 !important;
            }

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
            .${blockId}.gslider-image-slider-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${blockId}.gslider-image-slider-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${blockId}.gslider-image-slider-wrapper .swiper-pagination-custom,
            .${blockId}.gslider-image-slider-wrapper .swiper-pagination-fraction {
                bottom: -${paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"} !important;
            }
        ` : ""}

        ${paginationPositionType === "outside" && showPagination?.Desktop ? `
        .${blockId}.gslider-image-slider-wrapper.has-pagination {
            margin-bottom: ${paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"};
        }
        ` : ""}

        @media only screen and (max-width: 1024px) {

            .${blockId}.gslider-image-slider-wrapper {
                ${globalTabletBackgroundNormalStyles}
                ${globalMarginTabletCssStyle ? `margin: ${globalMarginTabletCssStyle};` : ""} 
                ${globalPaddingTabletCssStyle ? `padding: ${globalPaddingTabletCssStyle};` : ""}
                ${globalBorderTabletCssStyle ? `border-width: ${globalBorderTabletCssStyle};` : ""}  
                ${globalBorderRadiusTabletCssStyle ? `border-radius: ${globalBorderRadiusTabletCssStyle};` : ""}
                ${globalZIndex.Tablet ? `z-index: ${globalZIndex.Tablet};` : ""}
            }
            .${blockId}.gslider-image-slider-wrapper:hover { 
                ${globalTabletBackgroundHoverStyles}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper {
                ${layoutHeight.Tablet ? `height: ${layoutHeight.Tablet}${layoutHeightUnits.Tablet};` : "auto"}
                ${imagePaddingTabletCssStyle ? `padding: ${imagePaddingTabletCssStyle};` : ""}
			    ${imageBorderTabletCssStyle ? `border-width: ${imageBorderTabletCssStyle};` : ""}  
                ${imageBorderRadiusTabletCssStyle ? `border-radius: ${imageBorderRadiusTabletCssStyle};` : ""}
                display: flex;
                align-items: center;
                justify-content: ${verticalAlign.Tablet || "center"};
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper img {
                ${imageMaxWidth.Tablet ? `max-width: ${imageMaxWidth.Tablet}${imageMaxWidthUnits.Tablet};` : ""}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-item {
                display: block;
                transition: transform ${imageLinkTransitionDuration?.Tablet || 300}ms ease, opacity ${imageLinkTransitionDuration?.Tablet || 300}ms ease, filter ${imageLinkTransitionDuration?.Tablet || 300}ms ease;
                --hover-opacity: ${imageLinkHoverOpacity?.Tablet || 0.8};
                --hover-scale: ${imageLinkHoverScale?.Tablet || 1.05};
                --hover-lift: ${imageLinkHoverLift?.Tablet || 10}${imageLinkHoverLiftUnits?.Tablet || "px"};
                --transition-duration: ${imageLinkTransitionDuration?.Tablet || 300}ms;
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-caption {
                ${imageCaptionFontSize.Tablet && imageCaptionFontSizeUnits.Tablet ? `font-size: ${imageCaptionFontSize.Tablet}${imageCaptionFontSizeUnits.Tablet};` : ""}
                ${imageCaptionLineHeight.Tablet && imageCaptionLineHeightUnits.Tablet ? `line-height: ${imageCaptionLineHeight.Tablet}${imageCaptionLineHeightUnits.Tablet};` : ""}
                ${imageCaptionLetterSpacing.Tablet && imageCaptionLetterSpacingUnits.Tablet ? `letter-spacing: ${imageCaptionLetterSpacing.Tablet}${imageCaptionLetterSpacingUnits.Tablet};` : ""}
                ${imageCaptionWordSpacing.Tablet && imageCaptionWordSpacingUnits.Tablet ? `word-spacing: ${imageCaptionWordSpacing.Tablet}${imageCaptionWordSpacingUnits.Tablet};` : ""}
                ${imageCaptionPaddingTabletCssStyle ? `padding: ${imageCaptionPaddingTabletCssStyle};` : ""}
                ${imageCaptionBorderTabletCssStyle ? `border-width: ${imageCaptionBorderTabletCssStyle};` : ""}  
                ${imageCaptionBorderRadiusTabletCssStyle ? `border-radius: ${imageCaptionBorderRadiusTabletCssStyle} !important;` : ""}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-tooltip {
                ${imageTooltipFontSize.Tablet && imageTooltipFontSizeUnits.Tablet ? `font-size: ${imageTooltipFontSize.Tablet}${imageTooltipFontSizeUnits.Tablet};` : ""}
                ${imageTooltipLineHeight.Tablet && imageTooltipLineHeightUnits.Tablet ? `line-height: ${imageTooltipLineHeight.Tablet}${imageTooltipLineHeightUnits.Tablet};` : ""}
                ${imageTooltipLetterSpacing.Tablet && imageTooltipLetterSpacingUnits.Tablet ? `letter-spacing: ${imageTooltipLetterSpacing.Tablet}${imageTooltipLetterSpacingUnits.Tablet};` : ""}
                ${imageTooltipWordSpacing.Tablet && imageTooltipWordSpacingUnits.Tablet ? `word-spacing: ${imageTooltipWordSpacing.Tablet}${imageTooltipWordSpacingUnits.Tablet};` : ""}
                ${imageTooltipPaddingTabletCssStyle ? `padding: ${imageTooltipPaddingTabletCssStyle};` : ""}
                ${imageTooltipBorderTabletCssStyle ? `border-width: ${imageTooltipBorderTabletCssStyle};` : ""}  
                ${imageTooltipBorderRadiusTabletCssStyle ? `border-radius: ${imageTooltipBorderRadiusTabletCssStyle} !important;` : ""}
                ${imageTooltipTopPosition.Tablet && imageTooltipTopPositionUnits.Tablet ? `top: ${imageTooltipTopPosition.Tablet}${imageTooltipTopPositionUnits.Tablet};` : ""}
                ${imageTooltipLeftPosition.Tablet && imageTooltipLeftPositionUnits.Tablet ? `left: ${imageTooltipLeftPosition.Tablet}${imageTooltipLeftPositionUnits.Tablet};` : ""}
            }

            .${blockId}.gslider-image-slider-wrapper.outside {
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
                .${blockId}.gslider-image-slider-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${blockId}.gslider-image-slider-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${blockId}.gslider-image-slider-wrapper .swiper-pagination-custom,
                .${blockId}.gslider-image-slider-wrapper .swiper-pagination-fraction {
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
        }
        
        @media only screen and (max-width: 767px) {

            .${blockId}.gslider-image-slider-wrapper {
                ${globalMobileBackgroundNormalStyles}
                ${globalMarginMobileCssStyle ? `margin: ${globalMarginMobileCssStyle};` : ""} 
                ${globalPaddingMobileCssStyle ? `padding: ${globalPaddingMobileCssStyle};` : ""}
                ${globalBorderMobileCssStyle ? `border-width: ${globalBorderMobileCssStyle};` : ""}  
                ${globalBorderRadiusMobileCssStyle ? `border-radius: ${globalBorderRadiusMobileCssStyle};` : ""}
                ${globalZIndex.Mobile ? `z-index: ${globalZIndex.Mobile};` : ""}
            }
            .${blockId}.gslider-image-slider-wrapper:hover { 
                ${globalMobileBackgroundHoverStyles}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper {
                ${layoutHeight.Mobile ? `height: ${layoutHeight.Mobile}${layoutHeightUnits.Mobile};` : "auto"}
                ${imagePaddingMobileCssStyle ? `padding: ${imagePaddingMobileCssStyle};` : ""}
                ${imageBorderMobileCssStyle ? `border-width: ${imageBorderMobileCssStyle};` : ""}  
                ${imageBorderRadiusMobileCssStyle ? `border-radius: ${imageBorderRadiusMobileCssStyle};` : ""}
                display: flex;
                align-items: center;
                justify-content: ${verticalAlign.Mobile || "center"};
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-content-wrapper img {
                ${imageMaxWidth.Mobile ? `max-width: ${imageMaxWidth.Mobile}${imageMaxWidthUnits.Mobile};` : ""}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-item {
                display: block;
                transition: transform ${imageLinkTransitionDuration?.Mobile || 300}ms ease, opacity ${imageLinkTransitionDuration?.Mobile || 300}ms ease, filter ${imageLinkTransitionDuration?.Mobile || 300}ms ease;
                --hover-opacity: ${imageLinkHoverOpacity?.Mobile || 0.8};
                --hover-scale: ${imageLinkHoverScale?.Mobile || 1.05};
                --hover-lift: ${imageLinkHoverLift?.Mobile || 10}${imageLinkHoverLiftUnits?.Mobile || "px"};
                --transition-duration: ${imageLinkTransitionDuration?.Mobile || 300}ms;
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-slider-caption {
                ${imageCaptionFontSize.Mobile && imageCaptionFontSizeUnits.Mobile ? `font-size: ${imageCaptionFontSize.Mobile}${imageCaptionFontSizeUnits.Mobile};` : ""}
                ${imageCaptionLineHeight.Mobile && imageCaptionLineHeightUnits.Mobile ? `line-height: ${imageCaptionLineHeight.Mobile}${imageCaptionLineHeightUnits.Mobile};` : ""}
                ${imageCaptionLetterSpacing.Mobile && imageCaptionLetterSpacingUnits.Mobile ? `letter-spacing: ${imageCaptionLetterSpacing.Mobile}${imageCaptionLetterSpacingUnits.Mobile};` : ""}
                ${imageCaptionWordSpacing.Mobile && imageCaptionWordSpacingUnits.Mobile ? `word-spacing: ${imageCaptionWordSpacing.Mobile}${imageCaptionWordSpacingUnits.Mobile};` : ""}
                ${imageCaptionPaddingMobileCssStyle ? `padding: ${imageCaptionPaddingMobileCssStyle};` : ""}
                ${imageCaptionBorderMobileCssStyle ? `border-width: ${imageCaptionBorderMobileCssStyle};` : ""}  
                ${imageCaptionBorderRadiusMobileCssStyle ? `border-radius: ${imageCaptionBorderRadiusMobileCssStyle} !important;` : ""}
            }

            .${blockId}.gslider-image-slider-wrapper .gslider-image-tooltip {
                ${imageTooltipFontSize.Mobile && imageTooltipFontSizeUnits.Mobile ? `font-size: ${imageTooltipFontSize.Mobile}${imageTooltipFontSizeUnits.Mobile};` : ""}
                ${imageTooltipLineHeight.Mobile && imageTooltipLineHeightUnits.Mobile ? `line-height: ${imageTooltipLineHeight.Mobile}${imageTooltipLineHeightUnits.Mobile};` : ""}
                ${imageTooltipLetterSpacing.Mobile && imageTooltipLetterSpacingUnits.Mobile ? `letter-spacing: ${imageTooltipLetterSpacing.Mobile}${imageTooltipLetterSpacingUnits.Mobile};` : ""}
                ${imageTooltipWordSpacing.Mobile && imageTooltipWordSpacingUnits.Mobile ? `word-spacing: ${imageTooltipWordSpacing.Mobile}${imageTooltipWordSpacingUnits.Mobile};` : ""}
                ${imageTooltipPaddingMobileCssStyle ? `padding: ${imageTooltipPaddingMobileCssStyle};` : ""}
                ${imageTooltipBorderMobileCssStyle ? `border-width: ${imageTooltipBorderMobileCssStyle};` : ""}  
                ${imageTooltipBorderRadiusMobileCssStyle ? `border-radius: ${imageTooltipBorderRadiusMobileCssStyle} !important;` : ""}
                ${imageTooltipTopPosition.Mobile && imageTooltipTopPositionUnits.Mobile ? `top: ${imageTooltipTopPosition.Mobile}${imageTooltipTopPositionUnits.Mobile};` : ""}
                ${imageTooltipLeftPosition.Mobile && imageTooltipLeftPositionUnits.Mobile ? `left: ${imageTooltipLeftPosition.Mobile}${imageTooltipLeftPositionUnits.Mobile};` : ""}
            }

            .${blockId}.gslider-image-slider-wrapper.outside {
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
                .${blockId}.gslider-image-slider-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${blockId}.gslider-image-slider-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${blockId}.gslider-image-slider-wrapper .swiper-pagination-custom,
                .${blockId}.gslider-image-slider-wrapper .swiper-pagination-fraction {
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
        }
    `;
  return `${imageSliderCSS}`.replace(/\s+/g, " ").trim();
};
var styling_default = generateImageSliderStyle;

// ../../src/blocks/image-slider/deprecated.js
var import_block_editor2 = require("@wordpress/block-editor");
var import_jsx_runtime3 = require("react/jsx-runtime");
var legacyAttributes = {
  ...attributes_default,
  enableLightbox: {
    type: "boolean",
    default: false
  }
};
var migrateLightbox = (attributes2) => {
  const enabled = attributes2.enableLightbox === true;
  return {
    ...attributes2,
    enableLightbox: {
      Desktop: enabled,
      Tablet: enabled,
      Mobile: enabled
    }
  };
};
var v1_1_5 = {
  attributes: legacyAttributes,
  migrate: migrateLightbox,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      mousewheelControl,
      keyboardNavigation,
      paginationType,
      dynamicBullets,
      images,
      showCaption,
      paginationPositionType,
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
      navigationArrowsIconRightAlign,
      navigationArrowsIconRight,
      navigationArrowsIconRightImageUrl,
      navigationArrowsIconRightImageAlt,
      enableimageLinks,
      enableLightbox,
      showTooltip,
      imageLinkTarget,
      imageLinkRel,
      imageLinkHoverEffect,
      enableLazyLoad
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-image-slider-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? "has-pagination" : ""}`
    });
    const captionEnabled = {
      Mobile: !!showCaption?.Mobile,
      Tablet: !!showCaption?.Tablet,
      Desktop: !!showCaption?.Desktop
    };
    const anyCaptionEnabled = captionEnabled.Mobile || captionEnabled.Tablet || captionEnabled.Desktop;
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
      effect: carouselEffect,
      breakpoints: {
        0: {
          slidesPerView: carouselPerColumn?.Mobile || 1,
          spaceBetween: carouselPerColumnGap?.Mobile || 0,
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? { delay: autoplayDelay?.Mobile || 1e3 } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          slidesPerView: carouselPerColumn?.Tablet || 2,
          spaceBetween: carouselPerColumnGap?.Tablet || 20,
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? { delay: autoplayDelay?.Tablet || 1e3 } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          slidesPerView: carouselPerColumn?.Desktop || 2,
          spaceBetween: carouselPerColumnGap?.Desktop || 20,
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? { delay: autoplayDelay?.Desktop || 1e3 } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
        }
      },
      loop: infiniteLoop,
      autoplay: autoplay ? {
        pauseOnMouseEnter: pauseOnHover,
        disableOnInteraction: false,
        stopOnLastSlide,
        reverseDirection
      } : false,
      allowTouchMove,
      mousewheel: mousewheelControl,
      keyboard: keyboardNavigation ? { enabled: true, onlyInViewport: true, pageUpDown: false } : false,
      navigation: {
        enabled: anyNavigationEnabled,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        enabled: anyPaginationEnabled,
        el: `.${blockId} .swiper-pagination-image-slider`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", role: "region", "aria-label": "Image Slider", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: images.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `swiper-slide`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-image-slider-content-wrapper ${globalClass}`,
            ...globalID && { id: globalID },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "div",
                {
                  className: "gslider-image-item",
                  "data-hover-effect": imageLinkHoverEffect,
                  children: [
                    enableLightbox ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        href: item.url,
                        "data-fslightbox": blockId,
                        "data-caption": item.caption,
                        className: "gslider-image-link",
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: item.url,
                            alt: item.alt || `image ${images.indexOf(
                              item
                            ) + 1}`,
                            loading: enableLazyLoad ? "lazy" : void 0
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: enableimageLinks && item.link ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        href: item.link,
                        target: imageLinkTarget,
                        rel: imageLinkRel,
                        className: "gslider-image-link",
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: item.url,
                            alt: item.alt || `image ${images.indexOf(
                              item
                            ) + 1}`,
                            loading: enableLazyLoad ? "lazy" : void 0
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "img",
                      {
                        src: item.url,
                        alt: item.alt || `image ${images.indexOf(
                          item
                        ) + 1}`,
                        loading: enableLazyLoad ? "lazy" : void 0
                      }
                    ) }),
                    showTooltip && item.tooltipText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-image-tooltip", children: item.tooltipText })
                  ]
                }
              ),
              anyCaptionEnabled && item.caption ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "gslider-image-slider-caption",
                  "aria-live": "polite",
                  children: item.caption
                }
              ) : null
            ]
          }
        ) }, item.id)) }),
        anyNavigationEnabled && navigationArrowPositionType === "inside" && !navigationArrowsIconSwitcher && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
        ),
        anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: "swiper-pagination swiper-pagination-image-slider",
            "aria-label": "Carousel pagination"
          }
        )
      ] }),
      anyNavigationEnabled && navigationArrowPositionType === "outside" && !navigationArrowsIconSwitcher && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
      ),
      anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: "swiper-pagination swiper-pagination-image-slider",
          "aria-label": "Carousel pagination"
        }
      )
    ] });
  }
};
var v1_1_6 = {
  attributes: legacyAttributes,
  migrate: migrateLightbox,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      mousewheelControl,
      keyboardNavigation,
      paginationType,
      dynamicBullets,
      images,
      showCaption,
      paginationPositionType,
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
      navigationArrowsIconRightAlign,
      navigationArrowsIconRight,
      navigationArrowsIconRightImageUrl,
      navigationArrowsIconRightImageAlt,
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
      enableLazyLoad
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-image-slider-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? "has-pagination" : ""}`
    });
    const captionEnabled = {
      Mobile: !!showCaption?.Mobile,
      Tablet: !!showCaption?.Tablet,
      Desktop: !!showCaption?.Desktop
    };
    const anyCaptionEnabled = captionEnabled.Mobile || captionEnabled.Tablet || captionEnabled.Desktop;
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
      effect: carouselEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          slidesPerView: carouselPerColumn?.Mobile || 1,
          spaceBetween: carouselPerColumnGap?.Mobile || 0,
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          slidesPerView: carouselPerColumn?.Tablet || 2,
          spaceBetween: carouselPerColumnGap?.Tablet || 20,
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          slidesPerView: carouselPerColumn?.Desktop || 2,
          spaceBetween: carouselPerColumnGap?.Desktop || 20,
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
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
        el: `.${blockId} .swiper-pagination-image-slider`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", role: "region", "aria-label": "Image Slider", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: images.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `swiper-slide`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-image-slider-content-wrapper ${globalClass}`,
            ...globalID && { id: globalID },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "div",
                {
                  className: "gslider-image-item",
                  "data-hover-effect": imageLinkHoverEffect,
                  children: [
                    enableLightbox ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        href: item.url,
                        "data-fslightbox": blockId,
                        "data-caption": item.caption,
                        className: "gslider-image-link",
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: item.url,
                            alt: item.alt || `image ${images.indexOf(
                              item
                            ) + 1}`,
                            loading: enableLazyLoad ? "lazy" : void 0
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: enableimageLinks && item.link ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        href: item.link,
                        target: imageLinkTarget,
                        rel: imageLinkRel,
                        className: "gslider-image-link",
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: item.url,
                            alt: item.alt || `image ${images.indexOf(
                              item
                            ) + 1}`,
                            loading: enableLazyLoad ? "lazy" : void 0
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "img",
                      {
                        src: item.url,
                        alt: item.alt || `image ${images.indexOf(
                          item
                        ) + 1}`,
                        loading: enableLazyLoad ? "lazy" : void 0
                      }
                    ) }),
                    showTooltip && item.tooltipText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-image-tooltip", children: item.tooltipText })
                  ]
                }
              ),
              anyCaptionEnabled && item.caption ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "gslider-image-slider-caption",
                  "aria-live": "polite",
                  children: item.caption
                }
              ) : null
            ]
          }
        ) }, item.id)) }),
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
        anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                  children: renderIcon_default(navigationArrowsIconLeft)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: navigationArrowsIconLeftImageAlt
                    }
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-next",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Next slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: "swiper-pagination swiper-pagination-image-slider",
            "aria-label": "Carousel pagination"
          }
        ) })
      ] }),
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
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                children: renderIcon_default(navigationArrowsIconLeft)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: navigationArrowsIconLeftImageAlt
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: `swiper-pagination swiper-pagination-image-slider swiper-pagination-${blockId}`,
          "aria-label": "Carousel pagination"
        }
      ) })
    ] });
  }
};
var v1_1_7 = {
  attributes: legacyAttributes,
  migrate: migrateLightbox,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      mousewheelControl,
      keyboardNavigation,
      paginationType,
      dynamicBullets,
      images,
      showCaption,
      paginationPositionType,
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
      navigationArrowsIconRightAlign,
      navigationArrowsIconRight,
      navigationArrowsIconRightImageUrl,
      navigationArrowsIconRightImageAlt,
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
      enableLazyLoad
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-image-slider-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? "has-pagination" : ""}`
    });
    const captionEnabled = {
      Mobile: !!showCaption?.Mobile,
      Tablet: !!showCaption?.Tablet,
      Desktop: !!showCaption?.Desktop
    };
    const anyCaptionEnabled = captionEnabled.Mobile || captionEnabled.Tablet || captionEnabled.Desktop;
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
      effect: carouselEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          slidesPerView: carouselPerColumn?.Mobile || 1,
          spaceBetween: carouselPerColumnGap?.Mobile || 0,
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          slidesPerView: carouselPerColumn?.Tablet || 2,
          spaceBetween: carouselPerColumnGap?.Tablet ?? 20,
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          slidesPerView: carouselPerColumn?.Desktop || 2,
          spaceBetween: carouselPerColumnGap?.Desktop ?? 20,
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
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
        el: `.${blockId} .swiper-pagination-image-slider`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", role: "region", "aria-label": "Image Slider", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: images.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `swiper-slide`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-image-slider-content-wrapper ${globalClass}`,
            ...globalID && { id: globalID },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "div",
                {
                  className: "gslider-image-item",
                  "data-hover-effect": imageLinkHoverEffect,
                  children: [
                    enableLightbox ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        href: item.url,
                        "data-fslightbox": blockId,
                        "data-caption": item.caption,
                        className: "gslider-image-link",
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: item.url,
                            alt: item.alt || `image ${images.indexOf(
                              item
                            ) + 1}`,
                            loading: enableLazyLoad ? "lazy" : void 0
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: enableimageLinks && item.link ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        href: item.link,
                        target: imageLinkTarget,
                        rel: imageLinkRel,
                        className: "gslider-image-link",
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: item.url,
                            alt: item.alt || `image ${images.indexOf(
                              item
                            ) + 1}`,
                            loading: enableLazyLoad ? "lazy" : void 0
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "img",
                      {
                        src: item.url,
                        alt: item.alt || `image ${images.indexOf(
                          item
                        ) + 1}`,
                        loading: enableLazyLoad ? "lazy" : void 0
                      }
                    ) }),
                    showTooltip && item.tooltipText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-image-tooltip", children: item.tooltipText })
                  ]
                }
              ),
              anyCaptionEnabled && item.caption ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "gslider-image-slider-caption",
                  "aria-live": "polite",
                  children: item.caption
                }
              ) : null
            ]
          }
        ) }, item.id)) }),
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
        anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                  children: renderIcon_default(navigationArrowsIconLeft)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: navigationArrowsIconLeftImageAlt
                    }
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-next",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Next slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: "swiper-pagination swiper-pagination-image-slider",
            "aria-label": "Carousel pagination"
          }
        ) })
      ] }),
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
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                children: renderIcon_default(navigationArrowsIconLeft)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: navigationArrowsIconLeftImageAlt
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: `swiper-pagination swiper-pagination-image-slider swiper-pagination-${blockId}`,
          "aria-label": "Carousel pagination"
        }
      ) })
    ] });
  }
};
var v1_2_0 = {
  attributes: legacyAttributes,
  migrate: migrateLightbox,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      mousewheelControl,
      keyboardNavigation,
      paginationType,
      dynamicBullets,
      images,
      showCaption,
      paginationPositionType,
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
      navigationArrowsIconRightAlign,
      navigationArrowsIconRight,
      navigationArrowsIconRightImageUrl,
      navigationArrowsIconRightImageAlt,
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
      enableLazyLoad
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-image-slider-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}`
    });
    const captionEnabled = {
      Mobile: !!showCaption?.Mobile,
      Tablet: !!showCaption?.Tablet,
      Desktop: !!showCaption?.Desktop
    };
    const anyCaptionEnabled = captionEnabled.Mobile || captionEnabled.Tablet || captionEnabled.Desktop;
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
      effect: carouselEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          slidesPerView: carouselPerColumn?.Mobile || 1,
          spaceBetween: carouselPerColumnGap?.Mobile || 0,
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          slidesPerView: carouselPerColumn?.Tablet || 2,
          spaceBetween: carouselPerColumnGap?.Tablet ?? 20,
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          slidesPerView: carouselPerColumn?.Desktop || 2,
          spaceBetween: carouselPerColumnGap?.Desktop ?? 20,
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
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
        el: `.${blockId} .swiper-pagination-image-slider`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", role: "region", "aria-label": "Image Slider", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: images.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `swiper-slide`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-image-slider-content-wrapper ${globalClass}`,
            ...globalID && { id: globalID },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "div",
                {
                  className: "gslider-image-item",
                  "data-hover-effect": imageLinkHoverEffect,
                  children: [
                    enableLightbox ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        href: item.url,
                        "data-fslightbox": blockId,
                        "data-caption": item.caption,
                        className: "gslider-image-link",
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: item.url,
                            alt: item.alt || `image ${images.indexOf(
                              item
                            ) + 1}`,
                            loading: enableLazyLoad ? "lazy" : void 0
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: enableimageLinks && item.link ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        href: item.link,
                        target: imageLinkTarget,
                        rel: imageLinkRel,
                        className: "gslider-image-link",
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: item.url,
                            alt: item.alt || `image ${images.indexOf(
                              item
                            ) + 1}`,
                            loading: enableLazyLoad ? "lazy" : void 0
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "img",
                      {
                        src: item.url,
                        alt: item.alt || `image ${images.indexOf(
                          item
                        ) + 1}`,
                        loading: enableLazyLoad ? "lazy" : void 0
                      }
                    ) }),
                    showTooltip && item.tooltipText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-image-tooltip", children: item.tooltipText })
                  ]
                }
              ),
              anyCaptionEnabled && item.caption ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "gslider-image-slider-caption",
                  "aria-live": "polite",
                  children: item.caption
                }
              ) : null
            ]
          }
        ) }, item.id)) }),
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
        anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                  children: renderIcon_default(navigationArrowsIconLeft)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: navigationArrowsIconLeftImageAlt
                    }
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-next",
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Next slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: "swiper-pagination swiper-pagination-image-slider",
            "aria-label": "Carousel pagination"
          }
        ) })
      ] }),
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
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                children: renderIcon_default(navigationArrowsIconLeft)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: navigationArrowsIconLeftImageAlt
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "swiper-button-next",
                role: "button",
                tabIndex: 0,
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: `swiper-pagination swiper-pagination-image-slider swiper-pagination-${blockId}`,
          "aria-label": "Carousel pagination"
        }
      ) })
    ] });
  }
};
var v1_2_1 = {
  attributes: legacyAttributes,
  migrate: migrateLightbox,
  // A slider with no images saves the same markup, so it stays valid and would lose the old value
  isEligible: (attributes2, innerBlocks, { blockNode }) => typeof blockNode?.attrs?.enableLightbox === "boolean",
  supports: {
    html: false,
    anchor: false,
    align: ["wide", "full"]
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
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
      mousewheelControl,
      keyboardNavigation,
      paginationType,
      dynamicBullets,
      images,
      showCaption,
      paginationPositionType,
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
      navigationArrowsIconRightAlign,
      navigationArrowsIconRight,
      navigationArrowsIconRightImageUrl,
      navigationArrowsIconRightImageAlt,
      enableimageLinks,
      enableLightbox,
      showTooltip,
      imageLinkTarget,
      imageLinkRel,
      imageLinkHoverEffect,
      enableLazyLoad
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-image-slider-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}`
    });
    const captionEnabled = {
      Mobile: !!showCaption?.Mobile,
      Tablet: !!showCaption?.Tablet,
      Desktop: !!showCaption?.Desktop
    };
    const anyCaptionEnabled = captionEnabled.Mobile || captionEnabled.Tablet || captionEnabled.Desktop;
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
      effect: carouselEffect,
      // Responsive breakpoints for Desktop, Tablet, and Mobile
      breakpoints: {
        0: {
          slidesPerView: carouselPerColumn?.Mobile || 1,
          spaceBetween: carouselPerColumnGap?.Mobile || 0,
          speed: speed?.Mobile || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Mobile || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Mobile },
          pagination: { enabled: paginationEnabled.Mobile }
        },
        768: {
          slidesPerView: carouselPerColumn?.Tablet || 2,
          spaceBetween: carouselPerColumnGap?.Tablet ?? 20,
          speed: speed?.Tablet || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Tablet || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Tablet },
          pagination: { enabled: paginationEnabled.Tablet }
        },
        1025: {
          slidesPerView: carouselPerColumn?.Desktop || 2,
          spaceBetween: carouselPerColumnGap?.Desktop ?? 20,
          speed: speed?.Desktop || 800,
          autoplay: autoplay ? {
            delay: autoplayDelay?.Desktop || 1e3
          } : false,
          navigation: { enabled: navigationEnabled.Desktop },
          pagination: { enabled: paginationEnabled.Desktop }
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
        el: `.${blockId} .swiper-pagination-image-slider`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", role: "region", "aria-label": "Image Slider", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: images.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `swiper-slide`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-image-slider-content-wrapper ${globalClass}`,
            ...globalID && { id: globalID },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                "div",
                {
                  className: "gslider-image-item",
                  "data-hover-effect": imageLinkHoverEffect,
                  children: [
                    enableLightbox ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        href: item.url,
                        "data-fslightbox": blockId,
                        "data-caption": item.caption,
                        className: "gslider-image-link",
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: item.url,
                            alt: item.alt || `image ${images.indexOf(
                              item
                            ) + 1}`,
                            loading: enableLazyLoad ? "lazy" : void 0
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: enableimageLinks && item.link ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        href: item.link,
                        target: imageLinkTarget,
                        rel: imageLinkRel,
                        className: "gslider-image-link",
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          "img",
                          {
                            src: item.url,
                            alt: item.alt || `image ${images.indexOf(
                              item
                            ) + 1}`,
                            loading: enableLazyLoad ? "lazy" : void 0
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "img",
                      {
                        src: item.url,
                        alt: item.alt || `image ${images.indexOf(
                          item
                        ) + 1}`,
                        loading: enableLazyLoad ? "lazy" : void 0
                      }
                    ) }),
                    showTooltip && item.tooltipText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-image-tooltip", children: item.tooltipText })
                  ]
                }
              ),
              anyCaptionEnabled && item.caption ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "gslider-image-slider-caption",
                  "aria-live": "polite",
                  children: item.caption
                }
              ) : null
            ]
          }
        ) }, item.id)) }),
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
            className: "swiper-pagination swiper-pagination-image-slider",
            "aria-label": "Carousel pagination"
          }
        ) })
      ] }),
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
          className: `swiper-pagination swiper-pagination-image-slider swiper-pagination-${blockId}`,
          "aria-label": "Carousel pagination"
        }
      ) })
    ] });
  }
};
var deprecated_default = [v1_2_1, v1_2_0, v1_1_7, v1_1_6, v1_1_5];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attributes,
  deprecated,
  meta,
  save,
  styling
});
