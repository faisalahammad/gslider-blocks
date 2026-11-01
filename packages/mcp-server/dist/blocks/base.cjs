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

// ../../src/blocks/base/base-entry.js
var base_entry_exports = {};
__export(base_entry_exports, {
  attributes: () => attributes_default,
  deprecated: () => deprecated_default,
  meta: () => block_default,
  save: () => Save,
  styling: () => styling_default
});
module.exports = __toCommonJS(base_entry_exports);

// ../../src/blocks/base/block.json
var block_default = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "gslider-blocks/base",
  version: "1.2.1",
  title: "Base",
  category: "gslider-blocks",
  description: "Display fixed content in a sliding or carousel layout.",
  keywords: [
    "slider",
    "carousel",
    "hero",
    "hero slider",
    "banner",
    "slideshow"
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

// ../../src/blocks/base/attributes.js
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
  sliderItems: {
    type: "array",
    default: [
      {
        id: "item-1",
        subTitle: "Sub Title",
        title: "Slider Item 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.",
        primaryButtonText: "Get Started",
        primaryButtonLink: "#",
        primaryButtonTargetLink: true,
        primaryButtonNofollow: false,
        primaryButtonSponsored: false,
        secondaryButtonSwitcher: false,
        secondaryButtonText: "Get Started",
        secondaryButtonLink: "#",
        secondaryButtonTargetLink: true,
        secondaryButtonNofollow: false,
        secondaryButtonSponsored: false,
        normalItemBackgroundType: "classic",
        normalItemClassicColor: "#EDEDED",
        normalItemGradientColor: null,
        normalItemCustomGradientSwitcher: false,
        normalItemCustomGradientInputValue: "",
        normalBackgroundImageUrl: {
          Desktop: "",
          Tablet: "",
          Mobile: ""
        },
        normalBackgroundImageAlt: {
          Desktop: "",
          Tablet: "",
          Mobile: ""
        },
        normalBackgroundImageID: {
          Desktop: "",
          Tablet: "",
          Mobile: ""
        },
        normalBackgroundImagePosition: {
          Desktop: { x: 0.5, y: 0.5 },
          Tablet: { x: 0.5, y: 0.5 },
          Mobile: { x: 0.5, y: 0.5 }
        },
        normalBackgroundImageAttachment: {
          Desktop: "scroll",
          Tablet: "scroll",
          Mobile: "scroll"
        },
        normalBackgroundImageRepeat: {
          Desktop: "no-repeat",
          Tablet: "no-repeat",
          Mobile: "no-repeat"
        },
        normalBackgroundImageSize: {
          Desktop: "cover",
          Tablet: "cover",
          Mobile: "cover"
        },
        itemBackgroundOverlaySwitcher: false,
        itemBackgroundOverlayType: "classic",
        itemBackgroundOverlayClassicColor: "#000",
        itemBackgroundOverlayGradientColor: null,
        itemBackgroundOverlayCustomGradientSwitcher: false,
        itemBackgroundOverlayCustomGradientInputValue: "",
        itemBackgroundOverlayOpacity: 0.5
      },
      {
        id: "item-2",
        subTitle: "Sub Title",
        title: "Slider Item 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.",
        primaryButtonText: "Get Started",
        primaryButtonLink: "#",
        primaryButtonTargetLink: true,
        primaryButtonNofollow: false,
        primaryButtonSponsored: false,
        secondaryButtonSwitcher: false,
        secondaryButtonText: "Get Started",
        secondaryButtonLink: "#",
        secondaryButtonTargetLink: true,
        secondaryButtonNofollow: false,
        secondaryButtonSponsored: false,
        normalItemBackgroundType: "classic",
        normalItemClassicColor: "#EDEDED",
        normalItemGradientColor: null,
        normalItemCustomGradientSwitcher: false,
        normalItemCustomGradientInputValue: "",
        normalBackgroundImageUrl: {
          Desktop: "",
          Tablet: "",
          Mobile: ""
        },
        normalBackgroundImageAlt: {
          Desktop: "",
          Tablet: "",
          Mobile: ""
        },
        normalBackgroundImageID: {
          Desktop: "",
          Tablet: "",
          Mobile: ""
        },
        normalBackgroundImagePosition: {
          Desktop: { x: 0.5, y: 0.5 },
          Tablet: { x: 0.5, y: 0.5 },
          Mobile: { x: 0.5, y: 0.5 }
        },
        normalBackgroundImageAttachment: {
          Desktop: "scroll",
          Tablet: "scroll",
          Mobile: "scroll"
        },
        normalBackgroundImageRepeat: {
          Desktop: "no-repeat",
          Tablet: "no-repeat",
          Mobile: "no-repeat"
        },
        normalBackgroundImageSize: {
          Desktop: "cover",
          Tablet: "cover",
          Mobile: "cover"
        },
        itemBackgroundOverlaySwitcher: false,
        itemBackgroundOverlayType: "classic",
        itemBackgroundOverlayClassicColor: "#000",
        itemBackgroundOverlayGradientColor: null,
        itemBackgroundOverlayCustomGradientSwitcher: false,
        itemBackgroundOverlayCustomGradientInputValue: "",
        itemBackgroundOverlayOpacity: 0.5
      },
      {
        id: "item-3",
        subTitle: "Sub Title",
        title: "Slider Item 3",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.",
        primaryButtonText: "Get Started",
        primaryButtonLink: "#",
        primaryButtonTargetLink: true,
        primaryButtonNofollow: false,
        primaryButtonSponsored: false,
        secondaryButtonSwitcher: false,
        secondaryButtonText: "Get Started",
        secondaryButtonLink: "#",
        secondaryButtonTargetLink: true,
        secondaryButtonNofollow: false,
        secondaryButtonSponsored: false,
        normalItemBackgroundType: "classic",
        normalItemClassicColor: "#EDEDED",
        normalItemGradientColor: null,
        normalItemCustomGradientSwitcher: false,
        normalItemCustomGradientInputValue: "",
        normalBackgroundImageUrl: {
          Desktop: "",
          Tablet: "",
          Mobile: ""
        },
        normalBackgroundImageAlt: {
          Desktop: "",
          Tablet: "",
          Mobile: ""
        },
        normalBackgroundImageID: {
          Desktop: "",
          Tablet: "",
          Mobile: ""
        },
        normalBackgroundImagePosition: {
          Desktop: { x: 0.5, y: 0.5 },
          Tablet: { x: 0.5, y: 0.5 },
          Mobile: { x: 0.5, y: 0.5 }
        },
        normalBackgroundImageAttachment: {
          Desktop: "scroll",
          Tablet: "scroll",
          Mobile: "scroll"
        },
        normalBackgroundImageRepeat: {
          Desktop: "no-repeat",
          Tablet: "no-repeat",
          Mobile: "no-repeat"
        },
        normalBackgroundImageSize: {
          Desktop: "cover",
          Tablet: "cover",
          Mobile: "cover"
        },
        itemBackgroundOverlaySwitcher: false,
        itemBackgroundOverlayType: "classic",
        itemBackgroundOverlayClassicColor: "#000",
        itemBackgroundOverlayGradientColor: null,
        itemBackgroundOverlayCustomGradientSwitcher: false,
        itemBackgroundOverlayCustomGradientInputValue: "",
        itemBackgroundOverlayOpacity: 0.5
      }
    ],
    items: {
      type: "object",
      properties: {
        id: {
          type: "string",
          default: ""
        },
        subTitle: {
          type: "string",
          default: "Sub Title"
        },
        title: {
          type: "string",
          default: "Slider Item"
        },
        description: {
          type: "string",
          default: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum."
        },
        primaryButtonText: {
          type: "string",
          default: "Get Started"
        },
        primaryButtonLink: {
          type: "string",
          default: "#"
        },
        primaryButtonTargetLink: {
          type: "boolean",
          default: true
        },
        primaryButtonNofollow: {
          type: "boolean",
          default: false
        },
        primaryButtonSponsored: {
          type: "boolean",
          default: false
        },
        secondaryButtonSwitcher: {
          type: "boolean",
          default: false
        },
        secondaryButtonText: {
          type: "string",
          default: "Get Started"
        },
        secondaryButtonLink: {
          type: "string",
          default: "#"
        },
        secondaryButtonTargetLink: {
          type: "boolean",
          default: true
        },
        secondaryButtonNofollow: {
          type: "boolean",
          default: false
        },
        secondaryButtonSponsored: {
          type: "boolean",
          default: false
        },
        normalItemBackgroundType: {
          type: "string",
          default: "classic"
        },
        normalItemClassicColor: {
          type: "string",
          default: ""
        },
        normalItemGradientColor: {
          type: "string",
          default: null
        },
        normalItemCustomGradientSwitcher: {
          type: "boolean",
          default: false
        },
        normalItemCustomGradientInputValue: {
          type: "string",
          default: ""
        },
        normalBackgroundImageUrl: {
          type: "object",
          default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
          }
        },
        normalBackgroundImageAlt: {
          type: "object",
          default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
          }
        },
        normalBackgroundImageID: {
          type: "object",
          default: {
            Desktop: "",
            Tablet: "",
            Mobile: ""
          }
        },
        normalBackgroundImagePosition: {
          type: "object",
          default: {
            Desktop: { x: 0.5, y: 0.5 },
            Tablet: { x: 0.5, y: 0.5 },
            Mobile: { x: 0.5, y: 0.5 }
          }
        },
        normalBackgroundImageAttachment: {
          type: "object",
          default: {
            Desktop: "scroll",
            Tablet: "scroll",
            Mobile: "scroll"
          }
        },
        normalBackgroundImageRepeat: {
          type: "object",
          default: {
            Desktop: "no-repeat",
            Tablet: "no-repeat",
            Mobile: "no-repeat"
          }
        },
        normalBackgroundImageSize: {
          type: "object",
          default: {
            Desktop: "cover",
            Tablet: "cover",
            Mobile: "cover"
          }
        },
        itemBackgroundOverlaySwitcher: {
          type: "boolean",
          default: false
        },
        itemBackgroundOverlayType: {
          type: "string",
          default: "classic"
        },
        itemBackgroundOverlayClassicColor: {
          type: "string",
          default: ""
        },
        itemBackgroundOverlayGradientColor: {
          type: "string",
          default: null
        },
        itemBackgroundOverlayCustomGradientSwitcher: {
          type: "boolean",
          default: false
        },
        itemBackgroundOverlayCustomGradientInputValue: {
          type: "string",
          default: ""
        },
        itemBackgroundOverlayOpacity: {
          type: "number",
          default: 0.5
        }
      }
    }
  },
  /** Start Slider Settings */
  sliderType: {
    type: "string",
    default: "slider"
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
  /** End Slider Settings */
  /** Start Show/Hide Elements */
  showSubTitle: {
    type: "boolean",
    default: true
  },
  showTitle: {
    type: "boolean",
    default: true
  },
  showDescription: {
    type: "boolean",
    default: true
  },
  showButton: {
    type: "boolean",
    default: true
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
      Desktop: "500",
      Tablet: "400",
      Mobile: "300"
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
  contentWidth: {
    type: "object",
    default: {
      Desktop: "80",
      Tablet: "80",
      Mobile: "80"
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
  subTitleHtmlTag: {
    type: "string",
    default: "h3"
  },
  titleHtmlTag: {
    type: "string",
    default: "h2"
  },
  descriptionHtmlTag: {
    type: "string",
    default: "p"
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
      top: "30",
      bottom: "30",
      left: "30",
      right: "30"
    }
  },
  contentPaddingDesktopCssStyle: {
    type: "string",
    default: ""
  },
  contentPaddingTablet: {
    type: "object",
    default: {
      top: "20",
      bottom: "20",
      left: "20",
      right: "20"
    }
  },
  contentPaddingTabletCssStyle: {
    type: "string",
    default: ""
  },
  contentPaddingMobile: {
    type: "object",
    default: {
      top: "15",
      bottom: "15",
      left: "15",
      right: "15"
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
  /** Start Subtitle Typography */
  subtitleFontFamily: {
    type: "string",
    default: ""
  },
  subtitleFontSize: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  subtitleFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  subtitleFontWeight: {
    type: "string",
    default: ""
  },
  subtitleFontStyle: {
    type: "string",
    default: ""
  },
  subtitleTextTransform: {
    type: "string",
    default: ""
  },
  subtitleTextDecoration: {
    type: "string",
    default: ""
  },
  subtitleLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  subtitleLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  subtitleLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  subtitleLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  subtitleWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  subtitleWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Subtitle Typography */
  /** Start Subtitle Color */
  subtitleColorSwitcher: {
    type: "string",
    default: "normal"
  },
  subtitleColor: {
    type: "string",
    default: ""
  },
  subtitleColorHover: {
    type: "string",
    default: ""
  },
  /** End Subtitle Color */
  /** Start Subtitle Margin */
  subtitleMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  subtitleDesktopMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  subtitleDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  subtitleTabletMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  subtitleTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  subtitleMobileMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  subtitleMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  subtitleMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Subtitle Margin */
  /** Start Subtitle Padding */
  subtitlePaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  subtitleDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  subtitleDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  subtitleTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  subtitleTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  subtitleMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  subtitleMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  subtitlePaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Subtitle Padding */
  /** End Subtitle     */
  /** Start Title Typography */
  titleFontFamily: {
    type: "string",
    default: ""
  },
  titleFontSize: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  titleFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  titleFontWeight: {
    type: "string",
    default: ""
  },
  titleFontStyle: {
    type: "string",
    default: ""
  },
  titleTextTransform: {
    type: "string",
    default: ""
  },
  titleTextDecoration: {
    type: "string",
    default: ""
  },
  titleLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  titleLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  titleLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  titleLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  titleWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  titleWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Title Typography */
  /** Start Title Color */
  titleColorSwitcher: {
    type: "string",
    default: "normal"
  },
  titleColor: {
    type: "string",
    default: ""
  },
  titleColorHover: {
    type: "string",
    default: ""
  },
  /** End Title Color */
  /** Start Title Margin */
  titleMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  titleDesktopMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  titleDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  titleTabletMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  titleTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  titleMobileMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  titleMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  titleMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Title Margin */
  /** Start Title Padding */
  titlePaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  titleDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  titleDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  titleTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  titleTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  titleMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  titleMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  titlePaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Title Padding */
  /** End Title     */
  /** Start Description Typography */
  descriptionFontFamily: {
    type: "string",
    default: ""
  },
  descriptionFontSize: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  descriptionFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  descriptionFontWeight: {
    type: "string",
    default: ""
  },
  descriptionFontStyle: {
    type: "string",
    default: ""
  },
  descriptionTextTransform: {
    type: "string",
    default: ""
  },
  descriptionTextDecoration: {
    type: "string",
    default: ""
  },
  descriptionLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  descriptionLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  descriptionLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  descriptionLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  descriptionWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  descriptionWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Description Typography */
  /** Start Description Color */
  descriptionColorSwitcher: {
    type: "string",
    default: "normal"
  },
  descriptionColor: {
    type: "string",
    default: ""
  },
  descriptionColorHover: {
    type: "string",
    default: ""
  },
  /** End Description Color */
  /** Start Description Margin */
  descriptionMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  descriptionDesktopMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  descriptionDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  descriptionTabletMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  descriptionTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  descriptionMobileMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  descriptionMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  descriptionMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Description Margin */
  /** Start Description Padding */
  descriptionPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  descriptionDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  descriptionDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  descriptionTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  descriptionTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  descriptionMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  descriptionMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  descriptionPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Description Padding */
  /** End Description     */
  /** Start Primary Button Typography */
  primaryButtonFontFamily: {
    type: "string",
    default: ""
  },
  primaryButtonFontSize: {
    type: "object",
    default: {
      Desktop: "16",
      Tablet: "16",
      Mobile: "14"
    }
  },
  primaryButtonFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  primaryButtonFontWeight: {
    type: "string",
    default: ""
  },
  primaryButtonFontStyle: {
    type: "string",
    default: ""
  },
  primaryButtonTextTransform: {
    type: "string",
    default: ""
  },
  primaryButtonTextDecoration: {
    type: "string",
    default: "none"
  },
  primaryButtonLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  primaryButtonLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  primaryButtonLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  primaryButtonLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  primaryButtonWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  primaryButtonWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Primary Button Typography */
  /** Start Primary Button Color */
  primaryButtonColorSwitcher: {
    type: "string",
    default: "normal"
  },
  primaryButtonColor: {
    type: "string",
    default: ""
  },
  primaryButtonColorHover: {
    type: "string",
    default: ""
  },
  /** End Primary Button Color */
  /** Start Primary Button Background */
  primaryButtonNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  primaryButtonNormalClassicColor: {
    type: "string",
    default: "#d2d2d2c7"
  },
  primaryButtonNormalGradientColor: {
    type: "string",
    default: null
  },
  primaryButtonNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  primaryButtonNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  primaryButtonHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  primaryButtonHoverClassicColor: {
    type: "string",
    default: "#787878b8"
  },
  primaryButtonHoverGradientColor: {
    type: "string",
    default: null
  },
  primaryButtonHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  primaryButtonHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Primary Button Background */
  /** Start Primary Button Border */
  primaryButtonBorder: {
    type: "string",
    default: "none"
  },
  primaryButtonBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  primaryButtonBorderColor: {
    type: "string",
    default: ""
  },
  primaryButtonBorderHoverColor: {
    type: "string",
    default: ""
  },
  primaryButtonBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  primaryButtonDesktopBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  primaryButtonDesktopBorderCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonTabletBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  primaryButtonTabletBorderCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonMobileBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  primaryButtonMobileBorderCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonBorderLink: {
    type: "boolean",
    default: true
  },
  /** End Primary Button Border */
  /** Start Primary Button Border Radius */
  primaryButtonBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  primaryButtonDesktopBorderRadius: {
    type: "object",
    default: {
      top: "4",
      bottom: "4",
      left: "4",
      right: "4"
    }
  },
  primaryButtonDesktopBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonTabletBorderRadius: {
    type: "object",
    default: {
      top: "4",
      bottom: "4",
      left: "4",
      right: "4"
    }
  },
  primaryButtonTabletBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonMobileBorderRadius: {
    type: "object",
    default: {
      top: "4",
      bottom: "4",
      left: "4",
      right: "4"
    }
  },
  primaryButtonMobileBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Primary Button Border Radius */
  /** Start Primary Button Box Shadow */
  primaryButtonBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  primaryButtonBoxShadowValues: {
    type: "array",
    default: []
  },
  primaryButtonBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  primaryButtonBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  primaryButtonBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  },
  /** End Primary Button Box Shadow */
  /** Start Primary Button Margin */
  primaryButtonMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  primaryButtonDesktopMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  primaryButtonDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  primaryButtonTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  primaryButtonMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Primary Button Margin */
  /** Start Primary Button Padding */
  primaryButtonPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  primaryButtonDesktopPadding: {
    type: "object",
    default: {
      top: "12",
      bottom: "12",
      left: "24",
      right: "24"
    }
  },
  primaryButtonDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonTabletPadding: {
    type: "object",
    default: {
      top: "12",
      bottom: "12",
      left: "24",
      right: "24"
    }
  },
  primaryButtonTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonMobilePadding: {
    type: "object",
    default: {
      top: "8",
      bottom: "8",
      left: "16",
      right: "16"
    }
  },
  primaryButtonMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  primaryButtonPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Primary Button Padding */
  /** End Primary Button     */
  /** Start Secondary Button Typography */
  secondaryButtonFontFamily: {
    type: "string",
    default: ""
  },
  secondaryButtonFontSize: {
    type: "object",
    default: {
      Desktop: "16",
      Tablet: "16",
      Mobile: "14"
    }
  },
  secondaryButtonFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  secondaryButtonFontWeight: {
    type: "string",
    default: ""
  },
  secondaryButtonFontStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonTextTransform: {
    type: "string",
    default: ""
  },
  secondaryButtonTextDecoration: {
    type: "string",
    default: "none"
  },
  secondaryButtonLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  secondaryButtonLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  secondaryButtonLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  secondaryButtonLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  secondaryButtonWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  secondaryButtonWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Secondary Button Typography */
  /** Start Secondary Button Color */
  secondaryButtonColorSwitcher: {
    type: "string",
    default: "normal"
  },
  secondaryButtonColor: {
    type: "string",
    default: ""
  },
  secondaryButtonColorHover: {
    type: "string",
    default: ""
  },
  /** End Secondary Button Color */
  /** Start Secondary Button Background */
  secondaryButtonNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  secondaryButtonNormalClassicColor: {
    type: "string",
    default: "#d2d2d2c7"
  },
  secondaryButtonNormalGradientColor: {
    type: "string",
    default: null
  },
  secondaryButtonNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  secondaryButtonNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  secondaryButtonHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  secondaryButtonHoverClassicColor: {
    type: "string",
    default: "#787878b8"
  },
  secondaryButtonHoverGradientColor: {
    type: "string",
    default: null
  },
  secondaryButtonHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  secondaryButtonHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Secondary Button Background */
  /** Start Secondary Button Border */
  secondaryButtonBorder: {
    type: "string",
    default: "none"
  },
  secondaryButtonBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  secondaryButtonBorderColor: {
    type: "string",
    default: ""
  },
  secondaryButtonBorderHoverColor: {
    type: "string",
    default: ""
  },
  secondaryButtonBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  secondaryButtonDesktopBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  secondaryButtonDesktopBorderCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonTabletBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  secondaryButtonTabletBorderCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonMobileBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  secondaryButtonMobileBorderCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonBorderLink: {
    type: "boolean",
    default: true
  },
  /** End Secondary Button Border */
  /** Start Secondary Button Border Radius */
  secondaryButtonBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  secondaryButtonDesktopBorderRadius: {
    type: "object",
    default: {
      top: "4",
      bottom: "4",
      left: "4",
      right: "4"
    }
  },
  secondaryButtonDesktopBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonTabletBorderRadius: {
    type: "object",
    default: {
      top: "4",
      bottom: "4",
      left: "4",
      right: "4"
    }
  },
  secondaryButtonTabletBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonMobileBorderRadius: {
    type: "object",
    default: {
      top: "4",
      bottom: "4",
      left: "4",
      right: "4"
    }
  },
  secondaryButtonMobileBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Secondary Button Border Radius */
  /** Start Secondary Button Box Shadow */
  secondaryButtonBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  secondaryButtonBoxShadowValues: {
    type: "array",
    default: []
  },
  secondaryButtonBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  secondaryButtonBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  secondaryButtonBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  },
  /** End Secondary Button Box Shadow */
  /** Start Secondary Button Margin */
  secondaryButtonMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  secondaryButtonDesktopMargin: {
    type: "object",
    default: {
      top: "12",
      bottom: "0",
      left: "12",
      right: "0"
    }
  },
  secondaryButtonDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonTabletMargin: {
    type: "object",
    default: {
      top: "12",
      bottom: "0",
      left: "12",
      right: "0"
    }
  },
  secondaryButtonTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonMobileMargin: {
    type: "object",
    default: {
      top: "12",
      bottom: "0",
      left: "0",
      right: "0"
    }
  },
  secondaryButtonMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Secondary Button Margin */
  /** Start Secondary Button Padding */
  secondaryButtonPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  secondaryButtonDesktopPadding: {
    type: "object",
    default: {
      top: "12",
      bottom: "12",
      left: "24",
      right: "24"
    }
  },
  secondaryButtonDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonTabletPadding: {
    type: "object",
    default: {
      top: "12",
      bottom: "12",
      left: "24",
      right: "24"
    }
  },
  secondaryButtonTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonMobilePadding: {
    type: "object",
    default: {
      top: "8",
      bottom: "8",
      left: "16",
      right: "16"
    }
  },
  secondaryButtonMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  secondaryButtonPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Secondary Button Padding */
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

// ../../src/blocks/base/save.js
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

// ../../src/blocks/base/save.js
var import_jsx_runtime2 = require("react/jsx-runtime");
function Save({ attributes: attributes2 }) {
  const {
    blockId,
    sliderItems,
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
    showSubTitle,
    showTitle,
    showDescription,
    showButton,
    showNavigation,
    showPagination,
    paginationPositionType,
    subTitleHtmlTag,
    titleHtmlTag,
    descriptionHtmlTag,
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
    layoutHeightSwitcher
  } = attributes2;
  const blockProps = import_block_editor.useBlockProps.save({
    className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}`
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
      // Patterns keep blockId empty, so fall back to an unscoped selector.
      el: blockId ? `.${blockId} .swiper-pagination-base-slider` : ".swiper-pagination-base-slider",
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "swiper", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              className: `gslider-content-wrapper ${item.id} ${globalClass}`,
              ...globalID && { id: globalID },
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "gslider-list-content", children: [
                showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  import_block_editor.RichText.Content,
                  {
                    tagName: subTitleHtmlTag,
                    className: "gslider-subtitle",
                    value: item.subTitle
                  }
                ) }),
                showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  import_block_editor.RichText.Content,
                  {
                    tagName: titleHtmlTag,
                    className: "gslider-title",
                    value: item.title
                  }
                ) }),
                showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  import_block_editor.RichText.Content,
                  {
                    tagName: descriptionHtmlTag,
                    className: "gslider-description",
                    value: item.description
                  }
                ) }),
                showButton && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                  item.primaryButtonLink ? (
                    // eslint-disable-next-line react/jsx-no-target-blank
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                          import_block_editor.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    )
                  ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    import_block_editor.RichText.Content,
                    {
                      value: item.primaryButtonText,
                      className: "gslider-btn primary-btn"
                    }
                  ),
                  item.secondaryButtonSwitcher && (item.secondaryButtonLink ? (
                    // eslint-disable-next-line react/jsx-no-target-blank
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                          import_block_editor.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    )
                  ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    import_block_editor.RichText.Content,
                    {
                      value: item.secondaryButtonText,
                      className: "gslider-btn secondary-btn"
                    }
                  ))
                ] }) }) })
              ] }) }) })
            }
          )
        },
        item.id
      )) }),
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
          className: "swiper-pagination swiper-pagination-base-slider",
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
        className: `swiper-pagination swiper-pagination-base-slider${blockId ? ` swiper-pagination-${blockId}` : ""}`,
        "aria-label": "Carousel pagination"
      }
    ) })
  ] });
}

// ../../src/blocks/base/styling.js
var generateBaseSliderStyle = (attributes2) => {
  const {
    blockId,
    deviceType,
    sliderItems,
    blockStyle,
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
    showSubTitle,
    showTitle,
    showDescription,
    showButton,
    showNavigation,
    showPagination,
    paginationPositionType,
    /** End Show/Hide Elements */
    /** Start Layout & Content Setting */
    layoutHeightSwitcher,
    layoutHeight,
    layoutHeightUnits,
    contentWidth,
    contentWidthUnits,
    contentAlignment,
    contentVerticalAlignment,
    contentHorizontalAlignment,
    subTitleHtmlTag,
    titleHtmlTag,
    descriptionHtmlTag,
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
    /** Start Subtitle Typography, Color, Margin & Padding */
    subtitleFontFamily,
    subtitleFontSize,
    subtitleFontSizeUnits,
    subtitleFontWeight,
    subtitleFontStyle,
    subtitleTextTransform,
    subtitleTextDecoration,
    subtitleLineHeight,
    subtitleLineHeightUnits,
    subtitleLetterSpacing,
    subtitleLetterSpacingUnits,
    subtitleWordSpacing,
    subtitleWordSpacingUnits,
    subtitleColorSwitcher,
    subtitleColor,
    subtitleColorHover,
    subtitleMarginUnits,
    subtitleDesktopMargin,
    subtitleDesktopMarginCssStyle,
    subtitleTabletMargin,
    subtitleTabletMarginCssStyle,
    subtitleMobileMargin,
    subtitleMobileMarginCssStyle,
    subtitleMarginLink,
    subtitlePaddingUnits,
    subtitleDesktopPadding,
    subtitleDesktopPaddingCssStyle,
    subtitleTabletPadding,
    subtitleTabletPaddingCssStyle,
    subtitleMobilePadding,
    subtitleMobilePaddingCssStyle,
    subtitlePaddingLink,
    /** End Subtitle Typography, Color, Margin & Padding */
    /** Start Title Typography, Color, Margin & Padding */
    titleFontFamily,
    titleFontSize,
    titleFontSizeUnits,
    titleFontWeight,
    titleFontStyle,
    titleTextTransform,
    titleTextDecoration,
    titleLineHeight,
    titleLineHeightUnits,
    titleLetterSpacing,
    titleLetterSpacingUnits,
    titleWordSpacing,
    titleWordSpacingUnits,
    titleColorSwitcher,
    titleColor,
    titleColorHover,
    titleMarginUnits,
    titleDesktopMargin,
    titleDesktopMarginCssStyle,
    titleTabletMargin,
    titleTabletMarginCssStyle,
    titleMobileMargin,
    titleMobileMarginCssStyle,
    titleMarginLink,
    titlePaddingUnits,
    titleDesktopPadding,
    titleDesktopPaddingCssStyle,
    titleTabletPadding,
    titleTabletPaddingCssStyle,
    titleMobilePadding,
    titleMobilePaddingCssStyle,
    titlePaddingLink,
    /** End Title Typography, Color, Margin & Padding */
    /** Start Description Typography, Color, Margin & Padding */
    descriptionFontFamily,
    descriptionFontSize,
    descriptionFontSizeUnits,
    descriptionFontWeight,
    descriptionFontStyle,
    descriptionTextTransform,
    descriptionTextDecoration,
    descriptionLineHeight,
    descriptionLineHeightUnits,
    descriptionLetterSpacing,
    descriptionLetterSpacingUnits,
    descriptionWordSpacing,
    descriptionWordSpacingUnits,
    descriptionColorSwitcher,
    descriptionColor,
    descriptionColorHover,
    descriptionMarginUnits,
    descriptionDesktopMargin,
    descriptionDesktopMarginCssStyle,
    descriptionTabletMargin,
    descriptionTabletMarginCssStyle,
    descriptionMobileMargin,
    descriptionMobileMarginCssStyle,
    descriptionMarginLink,
    descriptionPaddingUnits,
    descriptionDesktopPadding,
    descriptionDesktopPaddingCssStyle,
    descriptionTabletPadding,
    descriptionTabletPaddingCssStyle,
    descriptionMobilePadding,
    descriptionMobilePaddingCssStyle,
    descriptionPaddingLink,
    /** End Description Typography, Color, Margin & Padding */
    /** Start Primary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */
    primaryButtonFontFamily,
    primaryButtonFontSize,
    primaryButtonFontSizeUnits,
    primaryButtonFontWeight,
    primaryButtonFontStyle,
    primaryButtonTextTransform,
    primaryButtonTextDecoration,
    primaryButtonLineHeight,
    primaryButtonLineHeightUnits,
    primaryButtonLetterSpacing,
    primaryButtonLetterSpacingUnits,
    primaryButtonWordSpacing,
    primaryButtonWordSpacingUnits,
    primaryButtonColorSwitcher,
    primaryButtonColor,
    primaryButtonColorHover,
    primaryButtonNormalBackgroundType,
    primaryButtonNormalClassicColor,
    primaryButtonNormalGradientColor,
    primaryButtonNormalCustomGradientSwitcher,
    primaryButtonNormalCustomGradientInputValue,
    primaryButtonHoverBackgroundType,
    primaryButtonHoverClassicColor,
    primaryButtonHoverGradientColor,
    primaryButtonHoverCustomGradientSwitcher,
    primaryButtonHoverCustomGradientInputValue,
    primaryButtonBorder,
    primaryButtonBorderColorSwitcher,
    primaryButtonBorderColor,
    primaryButtonBorderHoverColor,
    primaryButtonBorderUnits,
    primaryButtonDesktopBorder,
    primaryButtonDesktopBorderCssStyle,
    primaryButtonTabletBorder,
    primaryButtonTabletBorderCssStyle,
    primaryButtonMobileBorder,
    primaryButtonMobileBorderCssStyle,
    primaryButtonBorderLink,
    primaryButtonBorderRadiusUnits,
    primaryButtonDesktopBorderRadius,
    primaryButtonDesktopBorderRadiusCssStyle,
    primaryButtonTabletBorderRadius,
    primaryButtonTabletBorderRadiusCssStyle,
    primaryButtonMobileBorderRadius,
    primaryButtonMobileBorderRadiusCssStyle,
    primaryButtonBorderRadiusLink,
    primaryButtonBoxShadowValuesSwitcher,
    primaryButtonBoxShadowValues,
    primaryButtonBoxShadowCssValue,
    primaryButtonBoxShadowHoverValues,
    primaryButtonBoxShadowHoverCssValue,
    primaryButtonMarginUnits,
    primaryButtonDesktopMargin,
    primaryButtonDesktopMarginCssStyle,
    primaryButtonTabletMargin,
    primaryButtonTabletMarginCssStyle,
    primaryButtonMobileMargin,
    primaryButtonMobileMarginCssStyle,
    primaryButtonMarginLink,
    primaryButtonPaddingUnits,
    primaryButtonDesktopPadding,
    primaryButtonDesktopPaddingCssStyle,
    primaryButtonTabletPadding,
    primaryButtonTabletPaddingCssStyle,
    primaryButtonMobilePadding,
    primaryButtonMobilePaddingCssStyle,
    primaryButtonPaddingLink,
    /** End Primary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */
    /** Start Secondary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */
    secondaryButtonFontFamily,
    secondaryButtonFontSize,
    secondaryButtonFontSizeUnits,
    secondaryButtonFontWeight,
    secondaryButtonFontStyle,
    secondaryButtonTextTransform,
    secondaryButtonTextDecoration,
    secondaryButtonLineHeight,
    secondaryButtonLineHeightUnits,
    secondaryButtonLetterSpacing,
    secondaryButtonLetterSpacingUnits,
    secondaryButtonWordSpacing,
    secondaryButtonWordSpacingUnits,
    secondaryButtonColorSwitcher,
    secondaryButtonColor,
    secondaryButtonColorHover,
    secondaryButtonNormalBackgroundType,
    secondaryButtonNormalClassicColor,
    secondaryButtonNormalGradientColor,
    secondaryButtonNormalCustomGradientSwitcher,
    secondaryButtonNormalCustomGradientInputValue,
    secondaryButtonHoverBackgroundType,
    secondaryButtonHoverClassicColor,
    secondaryButtonHoverGradientColor,
    secondaryButtonHoverCustomGradientSwitcher,
    secondaryButtonHoverCustomGradientInputValue,
    secondaryButtonBorder,
    secondaryButtonBorderColorSwitcher,
    secondaryButtonBorderColor,
    secondaryButtonBorderHoverColor,
    secondaryButtonBorderUnits,
    secondaryButtonDesktopBorder,
    secondaryButtonDesktopBorderCssStyle,
    secondaryButtonTabletBorder,
    secondaryButtonTabletBorderCssStyle,
    secondaryButtonMobileBorder,
    secondaryButtonMobileBorderCssStyle,
    secondaryButtonBorderLink,
    secondaryButtonBorderRadiusUnits,
    secondaryButtonDesktopBorderRadius,
    secondaryButtonDesktopBorderRadiusCssStyle,
    secondaryButtonTabletBorderRadius,
    secondaryButtonTabletBorderRadiusCssStyle,
    secondaryButtonMobileBorderRadius,
    secondaryButtonMobileBorderRadiusCssStyle,
    secondaryButtonBorderRadiusLink,
    secondaryButtonBoxShadowValuesSwitcher,
    secondaryButtonBoxShadowValues,
    secondaryButtonBoxShadowCssValue,
    secondaryButtonBoxShadowHoverValues,
    secondaryButtonBoxShadowHoverCssValue,
    secondaryButtonMarginUnits,
    secondaryButtonDesktopMargin,
    secondaryButtonDesktopMarginCssStyle,
    secondaryButtonTabletMargin,
    secondaryButtonTabletMarginCssStyle,
    secondaryButtonMobileMargin,
    secondaryButtonMobileMarginCssStyle,
    secondaryButtonMarginLink,
    secondaryButtonPaddingUnits,
    secondaryButtonDesktopPadding,
    secondaryButtonDesktopPaddingCssStyle,
    secondaryButtonTabletPadding,
    secondaryButtonTabletPaddingCssStyle,
    secondaryButtonMobilePadding,
    secondaryButtonMobilePaddingCssStyle,
    secondaryButtonPaddingLink,
    /** End Secondary Button Typography, Color, Background, Border, Border Radius, Box Shadow, Margin & Padding */
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
  let sliderItemColorStyle = "";
  sliderItems.forEach((item) => {
    const normalItemBackgroundType = item.normalItemBackgroundType;
    const normalItemGradientColor = item.normalItemGradientColor || item.normalItemClassicColor;
    if (normalItemBackgroundType === "gradient") {
      const gradientValue = item.normalItemCustomGradientSwitcher && item.normalItemCustomGradientInputValue ? item.normalItemCustomGradientInputValue : normalItemGradientColor;
      if (gradientValue) {
        const gradientStyle = `.${blockId} .gslider-content-wrapper.${item.id} {
                        background: ${gradientValue};
                        transition: background .3s ease-in-out, background-color .3s ease-in-out;
                    }`;
        sliderItemColorStyle += gradientStyle;
      }
    } else if (item.normalBackgroundImageUrl.Desktop) {
      let backgroundImageStyle = `.${blockId} .gslider-content-wrapper.${item.id} {
                    background-image: url(${item.normalBackgroundImageUrl.Desktop});`;
      if (item.normalBackgroundImagePosition.Desktop) {
        const backgroundPosition = `${item.normalBackgroundImagePosition.Desktop.x * 100}% ${item.normalBackgroundImagePosition.Desktop.y * 100}%`;
        backgroundImageStyle += `
                    background-position: ${backgroundPosition};`;
      }
      if (item.normalBackgroundImageAttachment.Desktop) {
        backgroundImageStyle += `
                    background-attachment: ${item.normalBackgroundImageAttachment.Desktop};`;
      }
      if (item.normalBackgroundImageRepeat.Desktop) {
        backgroundImageStyle += `
                    background-repeat: ${item.normalBackgroundImageRepeat.Desktop};`;
      }
      if (item.normalBackgroundImageSize.Desktop) {
        backgroundImageStyle += `
                    background-size: ${item.normalBackgroundImageSize.Desktop};`;
      }
      backgroundImageStyle += `
                    transition: background .3s ease-in-out, background-color .3s ease-in-out;
                }`;
      sliderItemColorStyle += backgroundImageStyle;
    } else if (item.normalItemClassicColor) {
      const classicStyle = `.${blockId} .gslider-content-wrapper.${item.id} {
                    background: ${item.normalItemClassicColor};
                    transition: background .3s ease-in-out, background-color .3s ease-in-out;
                }`;
      sliderItemColorStyle += classicStyle;
    }
    if (item.itemBackgroundOverlaySwitcher) {
      const overlayColor = item.itemBackgroundOverlayType === "classic" ? item.itemBackgroundOverlayClassicColor : item.itemBackgroundOverlayGradientColor;
      const overlayGradient = item.itemBackgroundOverlayCustomGradientSwitcher && item.itemBackgroundOverlayCustomGradientInputValue ? item.itemBackgroundOverlayCustomGradientInputValue : overlayColor;
      const overlayStyle = `.${blockId} .gslider-content-wrapper.${item.id}::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: ${overlayGradient || "transparent"};
                    opacity: ${item.itemBackgroundOverlayOpacity};
                    z-index: -1;
                    pointer-events: none;
                    transition: opacity .3s ease-in-out;
                }
                .${blockId} .gslider-content-wrapper.${item.id} {
                    position: relative;
                    z-index: 1;
                }`;
      sliderItemColorStyle += overlayStyle;
    }
    sliderItemColorStyle += `
            @media only screen and (max-width: 1024px) {
                .${blockId} .gslider-content-wrapper.${item.id} {`;
    if (normalItemBackgroundType === "gradient" && item.normalItemGradientColor) {
      sliderItemColorStyle += `
                    background: ${item.normalItemGradientColor};`;
    } else if (item.normalBackgroundImageUrl.Tablet || item.normalBackgroundImageUrl.Desktop) {
      sliderItemColorStyle += `
                    background-image: url(${item.normalBackgroundImageUrl.Tablet || item.normalBackgroundImageUrl.Desktop});`;
      if (item.normalBackgroundImageSize.Tablet || item.normalBackgroundImageSize.Desktop) {
        sliderItemColorStyle += `
                    background-size: ${item.normalBackgroundImageSize.Tablet || item.normalBackgroundImageSize.Desktop};`;
      }
      sliderItemColorStyle += `
                    background-position: center center;
                    background-repeat: no-repeat;`;
    } else if (item.normalItemClassicColor) {
      sliderItemColorStyle += `
                    background: ${item.normalItemClassicColor};`;
    }
    sliderItemColorStyle += `
                }
            }`;
    sliderItemColorStyle += `
            @media only screen and (max-width: 767px) {
                .${blockId} .gslider-content-wrapper.${item.id} {`;
    if (normalItemBackgroundType === "gradient" && item.normalItemGradientColor) {
      sliderItemColorStyle += `
                    background: ${item.normalItemGradientColor};`;
    } else if (item.normalBackgroundImageUrl.Mobile || item.normalBackgroundImageUrl.Tablet || item.normalBackgroundImageUrl.Desktop) {
      sliderItemColorStyle += `
                    background-image: url(${item.normalBackgroundImageUrl.Mobile || item.normalBackgroundImageUrl.Tablet || item.normalBackgroundImageUrl.Desktop});`;
      if (item.normalBackgroundImageSize.Mobile || item.normalBackgroundImageSize.Tablet || item.normalBackgroundImageSize.Desktop) {
        sliderItemColorStyle += `
                    background-size: ${item.normalBackgroundImageSize.Mobile || item.normalBackgroundImageSize.Tablet || item.normalBackgroundImageSize.Desktop};`;
      }
      sliderItemColorStyle += `
                    background-position: center center;
                    background-repeat: no-repeat;`;
    } else if (item.normalItemClassicColor) {
      sliderItemColorStyle += `
                    background: ${item.normalItemClassicColor};`;
    }
    sliderItemColorStyle += `
                }
            }`;
  });
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
  const baseSliderCSS = `
        .${blockId}.gslider-base-wrapper {
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
        .${blockId}.gslider-base-wrapper:hover {
            ${globalDesktopBackgroundHoverStyles}
            ${globalBorderHoverColor ? `border-color: ${globalBorderHoverColor};` : ""}
            ${globalBoxShadowHoverCssValue ? `box-shadow: ${globalBoxShadowHoverCssValue} !important;` : ""}
        }

        .${blockId} .swiper-wrapper {
            ${layoutHeightSwitcher !== "adapt" ? `height: auto;` : ""}
            ${layoutHeight.Desktop && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Desktop}${layoutHeightUnits.Desktop};` : "auto"}
        }

        .${blockId} .swiper-slide{
            ${layoutHeightSwitcher !== "adapt" ? `height: auto !important;` : ""}
            ${layoutHeight.Desktop && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Desktop}${layoutHeightUnits.Desktop};` : "auto"}
        }
        
        .${blockId}.gslider-base-wrapper .gslider-content-wrapper {
            ${layoutHeightSwitcher !== "adapt" ? `height: 100% !important;` : ""}
            ${contentVerticalAlignment?.Desktop ? `justify-content: ${contentVerticalAlignment.Desktop};` : ""}
        }

        .${blockId}.gslider-base-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
            ${contentWidth?.Desktop ? `max-width: ${contentWidth.Desktop}${contentWidthUnits?.Desktop};` : ""}
            ${contentAlignment?.Desktop ? `text-align: ${contentAlignment.Desktop};` : ""}

            ${contentHorizontalAlignment?.Desktop === "left" ? `margin-right: auto; margin-left: 0;` : ""}
            ${contentHorizontalAlignment?.Desktop === "center" ? `margin-left: auto; margin-right: auto;` : ""}
            ${contentHorizontalAlignment?.Desktop === "right" ? `margin-left: auto; margin-right: 0;` : ""}
            ${contentPaddingDesktopCssStyle ? `padding: ${contentPaddingDesktopCssStyle};` : ""}
        }

        .${blockId}.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle {
            ${subtitleFontFamily ? `font-family: ${subtitleFontFamily};` : ""}
            ${subtitleFontSize.Desktop && subtitleFontSizeUnits.Desktop ? `font-size: ${subtitleFontSize.Desktop}${subtitleFontSizeUnits.Desktop};` : ""}
            ${subtitleFontWeight ? `font-weight: ${subtitleFontWeight};` : ""}
            ${subtitleFontStyle ? `font-style: ${subtitleFontStyle};` : ""}
            ${subtitleTextTransform ? `text-transform: ${subtitleTextTransform};` : ""}
            ${subtitleTextDecoration ? `text-decoration: ${subtitleTextDecoration};` : ""}
            ${subtitleLineHeight.Desktop && subtitleLineHeightUnits.Desktop ? `line-height: ${subtitleLineHeight.Desktop}${subtitleLineHeightUnits.Desktop};` : ""}
            ${subtitleLetterSpacing.Desktop && subtitleLetterSpacingUnits.Desktop ? `letter-spacing: ${subtitleLetterSpacing.Desktop}${subtitleLetterSpacingUnits.Desktop};` : ""}
            ${subtitleWordSpacing.Desktop && subtitleWordSpacingUnits.Desktop ? `word-spacing: ${subtitleWordSpacing.Desktop}${subtitleWordSpacingUnits.Desktop};` : ""}
            ${subtitleColor ? `color: ${subtitleColor};` : ""}
            ${subtitleDesktopMarginCssStyle ? `margin: ${subtitleDesktopMarginCssStyle};` : ""} 
            ${subtitleDesktopPaddingCssStyle ? `padding: ${subtitleDesktopPaddingCssStyle};` : ""}
            transition: color .3s ease-in-out;
        }
        .${blockId}.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle:hover {
            ${subtitleColorHover ? `color: ${subtitleColorHover};` : ""}
        }

        .${blockId}.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
            ${titleFontFamily ? `font-family: ${titleFontFamily};` : ""}
            ${titleFontSize.Desktop && titleFontSizeUnits.Desktop ? `font-size: ${titleFontSize.Desktop}${titleFontSizeUnits.Desktop};` : ""}
            ${titleFontWeight ? `font-weight: ${titleFontWeight};` : ""}
            ${titleFontStyle ? `font-style: ${titleFontStyle};` : ""}
            ${titleTextTransform ? `text-transform: ${titleTextTransform};` : ""}
            ${titleTextDecoration ? `text-decoration: ${titleTextDecoration};` : ""}
            ${titleLineHeight.Desktop && titleLineHeightUnits.Desktop ? `line-height: ${titleLineHeight.Desktop}${titleLineHeightUnits.Desktop};` : ""}
            ${titleLetterSpacing.Desktop && titleLetterSpacingUnits.Desktop ? `letter-spacing: ${titleLetterSpacing.Desktop}${titleLetterSpacingUnits.Desktop};` : ""}
            ${titleWordSpacing.Desktop && titleWordSpacingUnits.Desktop ? `word-spacing: ${titleWordSpacing.Desktop}${titleWordSpacingUnits.Desktop};` : ""}
            ${titleColor ? `color: ${titleColor};` : ""}
            ${titleDesktopMarginCssStyle ? `margin: ${titleDesktopMarginCssStyle};` : ""} 
            ${titleDesktopPaddingCssStyle ? `padding: ${titleDesktopPaddingCssStyle};` : ""}
            transition: color .3s ease-in-out;
        }
        .${blockId}.gslider-base-wrapper .gslider-title-wrapper .gslider-title:hover {
            ${titleColorHover ? `color: ${titleColorHover};` : ""}
        }

        .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
            ${descriptionFontFamily ? `font-family: ${descriptionFontFamily};` : ""}
            ${descriptionFontSize.Desktop && descriptionFontSizeUnits.Desktop ? `font-size: ${descriptionFontSize.Desktop}${descriptionFontSizeUnits.Desktop};` : ""}
            ${descriptionFontWeight ? `font-weight: ${descriptionFontWeight};` : ""}
            ${descriptionFontStyle ? `font-style: ${descriptionFontStyle};` : ""}
            ${descriptionTextTransform ? `text-transform: ${descriptionTextTransform};` : ""}
            ${descriptionTextDecoration ? `text-decoration: ${descriptionTextDecoration};` : ""}
            ${descriptionLineHeight.Desktop && descriptionLineHeightUnits.Desktop ? `line-height: ${descriptionLineHeight.Desktop}${descriptionLineHeightUnits.Desktop};` : ""}
            ${descriptionLetterSpacing.Desktop && descriptionLetterSpacingUnits.Desktop ? `letter-spacing: ${descriptionLetterSpacing.Desktop}${descriptionLetterSpacingUnits.Desktop};` : ""}
            ${descriptionWordSpacing.Desktop && descriptionWordSpacingUnits.Desktop ? `word-spacing: ${descriptionWordSpacing.Desktop}${descriptionWordSpacingUnits.Desktop};` : ""}
            ${descriptionColor ? `color: ${descriptionColor};` : ""}
            ${descriptionDesktopMarginCssStyle ? `margin: ${descriptionDesktopMarginCssStyle};` : ""} 
            ${descriptionDesktopPaddingCssStyle ? `padding: ${descriptionDesktopPaddingCssStyle};` : ""}
            transition: color .3s ease-in-out;
        }
        .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description:hover {
            ${descriptionColorHover ? `color: ${descriptionColorHover};` : ""}
        }

        .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn {
            ${primaryButtonFontFamily ? `font-family: ${primaryButtonFontFamily};` : ""}
            ${primaryButtonFontSize.Desktop && primaryButtonFontSizeUnits.Desktop ? `font-size: ${primaryButtonFontSize.Desktop}${primaryButtonFontSizeUnits.Desktop};` : ""}
            ${primaryButtonFontWeight ? `font-weight: ${primaryButtonFontWeight};` : ""}
            ${primaryButtonFontStyle ? `font-style: ${primaryButtonFontStyle};` : ""}
            ${primaryButtonTextTransform ? `text-transform: ${primaryButtonTextTransform};` : ""}
            ${primaryButtonTextDecoration ? `text-decoration: ${primaryButtonTextDecoration};` : ""}
            ${primaryButtonLineHeight.Desktop && primaryButtonLineHeightUnits.Desktop ? `line-height: ${primaryButtonLineHeight.Desktop}${primaryButtonLineHeightUnits.Desktop};` : ""}
            ${primaryButtonLetterSpacing.Desktop && primaryButtonLetterSpacingUnits.Desktop ? `letter-spacing: ${primaryButtonLetterSpacing.Desktop}${primaryButtonLetterSpacingUnits.Desktop};` : ""}
            ${primaryButtonWordSpacing.Desktop && primaryButtonWordSpacingUnits.Desktop ? `word-spacing: ${primaryButtonWordSpacing.Desktop}${primaryButtonWordSpacingUnits.Desktop};` : ""}
            ${primaryButtonColor ? `color: ${primaryButtonColor};` : ""}
            ${primaryButtonNormalBackgroundType === "gradient" ? `  
                background: ${primaryButtonNormalCustomGradientSwitcher && primaryButtonNormalCustomGradientInputValue ? primaryButtonNormalCustomGradientInputValue : primaryButtonNormalGradientColor || primaryButtonNormalClassicColor};
            ` : `
                ${primaryButtonNormalClassicColor ? `background: ${primaryButtonNormalClassicColor};` : ""}
            `}
            ${primaryButtonBorder ? `border: ${primaryButtonBorder};` : ""}
            ${primaryButtonBorderColor ? `border-color: ${primaryButtonBorderColor};` : ""}
			${primaryButtonDesktopBorderCssStyle ? `border-width: ${primaryButtonDesktopBorderCssStyle};` : ""}  
			${primaryButtonDesktopBorderRadiusCssStyle ? `border-radius: ${primaryButtonDesktopBorderRadiusCssStyle};` : ""}
            ${primaryButtonBoxShadowCssValue ? `box-shadow: ${primaryButtonBoxShadowCssValue};` : ""}
            ${primaryButtonDesktopMarginCssStyle ? `margin: ${primaryButtonDesktopMarginCssStyle};` : ""} 
            ${primaryButtonDesktopPaddingCssStyle ? `padding: ${primaryButtonDesktopPaddingCssStyle};` : ""}
            display: inline-block;
            transition: color .3s ease-in-out, background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out, transform .3s ease-in-out;
        }

        .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn:hover {
            ${primaryButtonColorHover ? `color: ${primaryButtonColorHover};` : ""}
            ${primaryButtonHoverBackgroundType === "gradient" ? `   
                background: ${primaryButtonHoverCustomGradientSwitcher && primaryButtonHoverCustomGradientInputValue ? primaryButtonHoverCustomGradientInputValue : primaryButtonHoverGradientColor || primaryButtonHoverClassicColor};
            ` : `
                ${primaryButtonHoverClassicColor ? `background: ${primaryButtonHoverClassicColor};` : ""}
            `}
            ${primaryButtonBorderHoverColor ? `border-color: ${primaryButtonBorderHoverColor};` : ""}
            ${primaryButtonBoxShadowHoverCssValue ? `box-shadow: ${primaryButtonBoxShadowHoverCssValue};` : ""}
        }

        .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn {
            ${secondaryButtonFontFamily ? `font-family: ${secondaryButtonFontFamily};` : ""}
            ${secondaryButtonFontSize.Desktop && secondaryButtonFontSizeUnits.Desktop ? `font-size: ${secondaryButtonFontSize.Desktop}${secondaryButtonFontSizeUnits.Desktop};` : ""}
            ${secondaryButtonFontWeight ? `font-weight: ${secondaryButtonFontWeight};` : ""}
            ${secondaryButtonFontStyle ? `font-style: ${secondaryButtonFontStyle};` : ""}
            ${secondaryButtonTextTransform ? `text-transform: ${secondaryButtonTextTransform};` : ""}
            ${secondaryButtonTextDecoration ? `text-decoration: ${secondaryButtonTextDecoration};` : ""}
            ${secondaryButtonLineHeight.Desktop && secondaryButtonLineHeightUnits.Desktop ? `line-height: ${secondaryButtonLineHeight.Desktop}${secondaryButtonLineHeightUnits.Desktop};` : ""}
            ${secondaryButtonLetterSpacing.Desktop && secondaryButtonLetterSpacingUnits.Desktop ? `letter-spacing: ${secondaryButtonLetterSpacing.Desktop}${secondaryButtonLetterSpacingUnits.Desktop};` : ""}
            ${secondaryButtonWordSpacing.Desktop && secondaryButtonWordSpacingUnits.Desktop ? `word-spacing: ${secondaryButtonWordSpacing.Desktop}${secondaryButtonWordSpacingUnits.Desktop};` : ""}
            ${secondaryButtonColor ? `color: ${secondaryButtonColor};` : ""}
            ${secondaryButtonNormalBackgroundType === "gradient" ? `  
                background: ${secondaryButtonNormalCustomGradientSwitcher && secondaryButtonNormalCustomGradientInputValue ? secondaryButtonNormalCustomGradientInputValue : secondaryButtonNormalGradientColor || secondaryButtonNormalClassicColor};
            ` : `
                ${secondaryButtonNormalClassicColor ? `background: ${secondaryButtonNormalClassicColor};` : ""}
            `}
            ${secondaryButtonBorder ? `border: ${secondaryButtonBorder};` : ""}
            ${secondaryButtonBorderColor ? `border-color: ${secondaryButtonBorderColor};` : ""}
			${secondaryButtonDesktopBorderCssStyle ? `border-width: ${secondaryButtonDesktopBorderCssStyle};` : ""}  
			${secondaryButtonDesktopBorderRadiusCssStyle ? `border-radius: ${secondaryButtonDesktopBorderRadiusCssStyle};` : ""}
            ${secondaryButtonBoxShadowCssValue ? `box-shadow: ${secondaryButtonBoxShadowCssValue};` : ""}
            ${secondaryButtonDesktopMarginCssStyle ? `margin: ${secondaryButtonDesktopMarginCssStyle};` : ""} 
            ${secondaryButtonDesktopPaddingCssStyle ? `padding: ${secondaryButtonDesktopPaddingCssStyle};` : ""}
            display: inline-block;
            transition: color .3s ease-in-out, background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out, transform .3s ease-in-out;
        }

        .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn:hover {
            ${secondaryButtonColorHover ? `color: ${secondaryButtonColorHover};` : ""}
            ${secondaryButtonHoverBackgroundType === "gradient" ? `   
                background: ${secondaryButtonHoverCustomGradientSwitcher && secondaryButtonHoverCustomGradientInputValue ? secondaryButtonHoverCustomGradientInputValue : secondaryButtonHoverGradientColor || secondaryButtonHoverClassicColor};
            ` : `
                ${secondaryButtonHoverClassicColor ? `background: ${secondaryButtonHoverClassicColor};` : ""}
            `}
            ${secondaryButtonBorderHoverColor ? `border-color: ${secondaryButtonBorderHoverColor};` : ""}
            ${secondaryButtonBoxShadowHoverCssValue ? `box-shadow: ${secondaryButtonBoxShadowHoverCssValue};` : ""}
        }

        .${blockId}.gslider-base-wrapper.outside {
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
                background: ${navigationArrowNormalCustomGradientSwitcher && navigationArrowNormalCustomGradientInputValue ? navigationArrowNormalCustomGradientInputValue : navigationArrowNormalGradientColor || navigationArrowNormalClassicColor};
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
                background: ${navigationArrowHoverCustomGradientSwitcher && navigationArrowHoverCustomGradientInputValue ? navigationArrowHoverCustomGradientInputValue : navigationArrowHoverGradientColor || navigationArrowHoverClassicColor};
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
            ${(() => {
    if (paginationType === "progressbar") {
      return paginationProgressbarPosition.Desktop ? `top: ${paginationProgressbarPosition.Desktop}${paginationProgressbarPositionUnits.Desktop} !important;` : "";
    }
    return paginationDotsPosition.Desktop ? `bottom: ${paginationDotsPosition.Desktop}${paginationDotsPositionUnits.Desktop} !important;` : "";
  })()}
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
            .${blockId}.gslider-base-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${blockId}.gslider-base-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${blockId}.gslider-base-wrapper .swiper-pagination-custom,
            .${blockId}.gslider-base-wrapper .swiper-pagination-fraction {
                bottom: -${paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"} !important;
            }
        ` : ""}

        ${paginationPositionType === "outside" && showPagination?.Desktop ? `
        .${blockId}.gslider-base-wrapper.has-pagination {
            margin-bottom: ${paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"};
        }
        ` : ""}

        @media only screen and (max-width: 1024px) {

            .${blockId}.gslider-base-wrapper {
                ${globalTabletBackgroundNormalStyles}
                ${globalMarginTabletCssStyle ? `margin: ${globalMarginTabletCssStyle};` : ""} 
                ${globalPaddingTabletCssStyle ? `padding: ${globalPaddingTabletCssStyle};` : ""}
                ${globalBorderTabletCssStyle ? `border-width: ${globalBorderTabletCssStyle};` : ""}  
                ${globalBorderRadiusTabletCssStyle ? `border-radius: ${globalBorderRadiusTabletCssStyle};` : ""}
                ${globalZIndex.Tablet ? `z-index: ${globalZIndex.Tablet};` : ""}
            }
            .${blockId}.gslider-base-wrapper:hover { 
                ${globalTabletBackgroundHoverStyles}
            }

            .${blockId} .swiper-wrapper {
                ${layoutHeight.Tablet && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Tablet}${layoutHeightUnits.Tablet};` : "auto"}
            }

            .${blockId} .swiper-slide{
                ${layoutHeight.Tablet && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Tablet}${layoutHeightUnits.Tablet};` : "auto"}
            }
            
            .${blockId}.gslider-base-wrapper .gslider-content-wrapper {
                ${contentVerticalAlignment?.Tablet ? `justify-content: ${contentVerticalAlignment.Tablet};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${contentWidth?.Tablet ? `max-width: ${contentWidth.Tablet}${contentWidthUnits?.Tablet};` : ""}
                ${contentAlignment?.Tablet ? `text-align: ${contentAlignment.Tablet};` : ""}

                ${contentHorizontalAlignment?.Tablet === "left" ? `margin-right: auto; margin-left: 0;` : ""}
                ${contentHorizontalAlignment?.Tablet === "center" ? `margin-left: auto; margin-right: auto;` : ""}
                ${contentHorizontalAlignment?.Tablet === "right" ? `margin-left: auto; margin-right: 0;` : ""}
                ${contentPaddingTabletCssStyle ? `padding: ${contentPaddingTabletCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle {
                ${subtitleFontSize.Tablet && subtitleFontSizeUnits.Tablet ? `font-size: ${subtitleFontSize.Tablet}${subtitleFontSizeUnits.Tablet};` : ""}
                ${subtitleLineHeight.Tablet && subtitleLineHeightUnits.Tablet ? `line-height: ${subtitleLineHeight.Tablet}${subtitleLineHeightUnits.Tablet};` : ""}
                ${subtitleLetterSpacing.Tablet && subtitleLetterSpacingUnits.Tablet ? `letter-spacing: ${subtitleLetterSpacing.Tablet}${subtitleLetterSpacingUnits.Tablet};` : ""}
                ${subtitleWordSpacing.Tablet && subtitleWordSpacingUnits.Tablet ? `word-spacing: ${subtitleWordSpacing.Tablet}${subtitleWordSpacingUnits.Tablet};` : ""}
                ${subtitleTabletMarginCssStyle ? `margin: ${subtitleTabletMarginCssStyle};` : ""} 
                ${subtitleTabletPaddingCssStyle ? `padding: ${subtitleTabletPaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
                ${titleFontSize.Tablet && titleFontSizeUnits.Tablet ? `font-size: ${titleFontSize.Tablet}${titleFontSizeUnits.Tablet};` : ""}
                ${titleLineHeight.Tablet && titleLineHeightUnits.Tablet ? `line-height: ${titleLineHeight.Tablet}${titleLineHeightUnits.Tablet};` : ""}
                ${titleLetterSpacing.Tablet && titleLetterSpacingUnits.Tablet ? `letter-spacing: ${titleLetterSpacing.Tablet}${titleLetterSpacingUnits.Tablet};` : ""}
                ${titleWordSpacing.Tablet && titleWordSpacingUnits.Tablet ? `word-spacing: ${titleWordSpacing.Tablet}${titleWordSpacingUnits.Tablet};` : ""}
                ${titleTabletMarginCssStyle ? `margin: ${titleTabletMarginCssStyle};` : ""} 
                ${titleTabletPaddingCssStyle ? `padding: ${titleTabletPaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
                ${descriptionFontSize.Tablet && descriptionFontSizeUnits.Tablet ? `font-size: ${descriptionFontSize.Tablet}${descriptionFontSizeUnits.Tablet};` : ""}
                ${descriptionLineHeight.Tablet && descriptionLineHeightUnits.Tablet ? `line-height: ${descriptionLineHeight.Tablet}${descriptionLineHeightUnits.Tablet};` : ""}
                ${descriptionLetterSpacing.Tablet && descriptionLetterSpacingUnits.Tablet ? `letter-spacing: ${descriptionLetterSpacing.Tablet}${descriptionLetterSpacingUnits.Tablet};` : ""}
                ${descriptionWordSpacing.Tablet && descriptionWordSpacingUnits.Tablet ? `word-spacing: ${descriptionWordSpacing.Tablet}${descriptionWordSpacingUnits.Tablet};` : ""}
                ${descriptionTabletMarginCssStyle ? `margin: ${descriptionTabletMarginCssStyle};` : ""} 
                ${descriptionTabletPaddingCssStyle ? `padding: ${descriptionTabletPaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn {
                ${primaryButtonFontSize.Tablet && primaryButtonFontSizeUnits.Tablet ? `font-size: ${primaryButtonFontSize.Tablet}${primaryButtonFontSizeUnits.Tablet};` : ""}
                ${primaryButtonLineHeight.Tablet && primaryButtonLineHeightUnits.Tablet ? `line-height: ${primaryButtonLineHeight.Tablet}${primaryButtonLineHeightUnits.Tablet};` : ""}
                ${primaryButtonLetterSpacing.Tablet && primaryButtonLetterSpacingUnits.Tablet ? `letter-spacing: ${primaryButtonLetterSpacing.Tablet}${primaryButtonLetterSpacingUnits.Tablet};` : ""}
                ${primaryButtonWordSpacing.Tablet && primaryButtonWordSpacingUnits.Tablet ? `word-spacing: ${primaryButtonWordSpacing.Tablet}${primaryButtonWordSpacingUnits.Tablet};` : ""}
                ${primaryButtonTabletBorderCssStyle ? `border-width: ${primaryButtonTabletBorderCssStyle};` : ""}  
                ${primaryButtonTabletBorderRadiusCssStyle ? `border-radius: ${primaryButtonTabletBorderRadiusCssStyle};` : ""}
                ${primaryButtonTabletMarginCssStyle ? `margin: ${primaryButtonTabletMarginCssStyle};` : ""} 
                ${primaryButtonTabletPaddingCssStyle ? `padding: ${primaryButtonTabletPaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn {
                ${secondaryButtonFontSize.Tablet && secondaryButtonFontSizeUnits.Tablet ? `font-size: ${secondaryButtonFontSize.Tablet}${secondaryButtonFontSizeUnits.Tablet};` : ""}
                ${secondaryButtonLineHeight.Tablet && secondaryButtonLineHeightUnits.Tablet ? `line-height: ${secondaryButtonLineHeight.Tablet}${secondaryButtonLineHeightUnits.Tablet};` : ""}
                ${secondaryButtonLetterSpacing.Tablet && secondaryButtonLetterSpacingUnits.Tablet ? `letter-spacing: ${secondaryButtonLetterSpacing.Tablet}${secondaryButtonLetterSpacingUnits.Tablet};` : ""}
                ${secondaryButtonWordSpacing.Tablet && secondaryButtonWordSpacingUnits.Tablet ? `word-spacing: ${secondaryButtonWordSpacing.Tablet}${secondaryButtonWordSpacingUnits.Tablet};` : ""}
                ${secondaryButtonTabletBorderCssStyle ? `border-width: ${secondaryButtonTabletBorderCssStyle};` : ""}  
                ${secondaryButtonTabletBorderRadiusCssStyle ? `border-radius: ${secondaryButtonTabletBorderRadiusCssStyle};` : ""}
                ${secondaryButtonTabletMarginCssStyle ? `margin: ${secondaryButtonTabletMarginCssStyle};` : ""} 
                ${secondaryButtonTabletPaddingCssStyle ? `padding: ${secondaryButtonTabletPaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper.outside {
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
                ${(() => {
    if (paginationType === "progressbar") {
      return paginationProgressbarPosition.Tablet ? `top: ${paginationProgressbarPosition.Tablet}${paginationProgressbarPositionUnits.Tablet} !important;` : "";
    }
    return paginationDotsPosition.Tablet ? `bottom: ${paginationDotsPosition.Tablet}${paginationDotsPositionUnits.Tablet} !important;` : "";
  })()}
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
                .${blockId}.gslider-base-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${blockId}.gslider-base-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${blockId}.gslider-base-wrapper .swiper-pagination-custom,
                .${blockId}.gslider-base-wrapper .swiper-pagination-fraction {
                    bottom: -${(() => {
    if (paginationOutsideOffset?.Tablet) {
      return `${paginationOutsideOffset.Tablet}${paginationOutsideOffsetUnits?.Tablet || "px"}`;
    }
    if (paginationOutsideOffset?.Desktop) {
      return `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}`;
    }
    return "30px";
  })()} !important;
                }
            ` : ""}

            ${paginationPositionType === "outside" ? `
                ${(() => {
    if (showPagination?.Tablet) {
      const tabletOffset = (() => {
        if (paginationOutsideOffset?.Tablet) {
          return `${paginationOutsideOffset.Tablet}${paginationOutsideOffsetUnits?.Tablet || "px"}`;
        }
        if (paginationOutsideOffset?.Desktop) {
          return `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}`;
        }
        return "30px";
      })();
      return `
                    .${blockId}.gslider-base-wrapper.has-pagination {
                        margin-bottom: ${tabletOffset};
                    }
                `;
    }
    if (showPagination?.Desktop) {
      return `
                    .${blockId}.gslider-base-wrapper.has-pagination {
                        margin-bottom: 0;
                    }
                `;
    }
    return "";
  })()}
            ` : ""}
        }
        
        @media only screen and (max-width: 767px) {

            .${blockId}.gslider-base-wrapper {
                ${globalMobileBackgroundNormalStyles}
                ${globalMarginMobileCssStyle ? `margin: ${globalMarginMobileCssStyle};` : ""} 
                ${globalPaddingMobileCssStyle ? `padding: ${globalPaddingMobileCssStyle};` : ""}
                ${globalBorderMobileCssStyle ? `border-width: ${globalBorderMobileCssStyle};` : ""}  
                ${globalBorderRadiusMobileCssStyle ? `border-radius: ${globalBorderRadiusMobileCssStyle};` : ""}
                ${globalZIndex.Mobile ? `z-index: ${globalZIndex.Mobile};` : ""}
            }

            .${blockId}.gslider-base-wrapper:hover { 
                ${globalMobileBackgroundHoverStyles}
            }

            .${blockId} .swiper-wrapper {
                ${layoutHeight.Mobile && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Mobile}${layoutHeightUnits.Mobile};` : "auto"}
            }

            .${blockId} .swiper-slide{
                ${layoutHeight.Mobile && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Mobile}${layoutHeightUnits.Mobile};` : "auto"}
            }
            
            .${blockId}.gslider-base-wrapper .gslider-content-wrapper {
                ${contentVerticalAlignment?.Mobile ? `justify-content: ${contentVerticalAlignment.Mobile};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${contentWidth?.Mobile ? `max-width: ${contentWidth.Mobile}${contentWidthUnits?.Mobile};` : ""}
                ${contentAlignment?.Mobile ? `text-align: ${contentAlignment.Mobile};` : ""}

                ${contentHorizontalAlignment?.Mobile === "left" ? `margin-right: auto; margin-left: 0;` : ""}
                ${contentHorizontalAlignment?.Mobile === "center" ? `margin-left: auto; margin-right: auto;` : ""}
                ${contentHorizontalAlignment?.Mobile === "right" ? `margin-left: auto; margin-right: 0;` : ""}
                ${contentPaddingMobileCssStyle ? `padding: ${contentPaddingMobileCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-subtitle-wrapper .gslider-subtitle {
                ${subtitleFontSize.Mobile && subtitleFontSizeUnits.Mobile ? `font-size: ${subtitleFontSize.Mobile}${subtitleFontSizeUnits.Mobile};` : ""}
                ${subtitleLineHeight.Mobile && subtitleLineHeightUnits.Mobile ? `line-height: ${subtitleLineHeight.Mobile}${subtitleLineHeightUnits.Mobile};` : ""}
                ${subtitleLetterSpacing.Mobile && subtitleLetterSpacingUnits.Mobile ? `letter-spacing: ${subtitleLetterSpacing.Mobile}${subtitleLetterSpacingUnits.Mobile};` : ""}
                ${subtitleWordSpacing.Mobile && subtitleWordSpacingUnits.Mobile ? `word-spacing: ${subtitleWordSpacing.Mobile}${subtitleWordSpacingUnits.Mobile};` : ""}
                ${subtitleMobileMarginCssStyle ? `margin: ${subtitleMobileMarginCssStyle};` : ""} 
                ${subtitleMobilePaddingCssStyle ? `padding: ${subtitleMobilePaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-title-wrapper .gslider-title {
                ${titleFontSize.Mobile && titleFontSizeUnits.Mobile ? `font-size: ${titleFontSize.Mobile}${titleFontSizeUnits.Mobile};` : ""}
                ${titleLineHeight.Mobile && titleLineHeightUnits.Mobile ? `line-height: ${titleLineHeight.Mobile}${titleLineHeightUnits.Mobile};` : ""}
                ${titleLetterSpacing.Mobile && titleLetterSpacingUnits.Mobile ? `letter-spacing: ${titleLetterSpacing.Mobile}${titleLetterSpacingUnits.Mobile};` : ""}
                ${titleWordSpacing.Mobile && titleWordSpacingUnits.Mobile ? `word-spacing: ${titleWordSpacing.Mobile}${titleWordSpacingUnits.Mobile};` : ""}
                ${titleMobileMarginCssStyle ? `margin: ${titleMobileMarginCssStyle};` : ""} 
                ${titleMobilePaddingCssStyle ? `padding: ${titleMobilePaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-description-wrapper .gslider-description {
                ${descriptionFontSize.Mobile && descriptionFontSizeUnits.Mobile ? `font-size: ${descriptionFontSize.Mobile}${descriptionFontSizeUnits.Mobile};` : ""}
                ${descriptionLineHeight.Mobile && descriptionLineHeightUnits.Mobile ? `line-height: ${descriptionLineHeight.Mobile}${descriptionLineHeightUnits.Mobile};` : ""}
                ${descriptionLetterSpacing.Mobile && descriptionLetterSpacingUnits.Mobile ? `letter-spacing: ${descriptionLetterSpacing.Mobile}${descriptionLetterSpacingUnits.Mobile};` : ""}
                ${descriptionWordSpacing.Mobile && descriptionWordSpacingUnits.Mobile ? `word-spacing: ${descriptionWordSpacing.Mobile}${descriptionWordSpacingUnits.Mobile};` : ""}
                ${descriptionMobileMarginCssStyle ? `margin: ${descriptionMobileMarginCssStyle};` : ""} 
                ${descriptionMobilePaddingCssStyle ? `padding: ${descriptionMobilePaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.primary-btn {
                ${primaryButtonFontSize.Mobile && primaryButtonFontSizeUnits.Mobile ? `font-size: ${primaryButtonFontSize.Mobile}${primaryButtonFontSizeUnits.Mobile};` : ""}
                ${primaryButtonLineHeight.Mobile && primaryButtonLineHeightUnits.Mobile ? `line-height: ${primaryButtonLineHeight.Mobile}${primaryButtonLineHeightUnits.Mobile};` : ""}
                ${primaryButtonLetterSpacing.Mobile && primaryButtonLetterSpacingUnits.Mobile ? `letter-spacing: ${primaryButtonLetterSpacing.Mobile}${primaryButtonLetterSpacingUnits.Mobile};` : ""}
                ${primaryButtonWordSpacing.Mobile && primaryButtonWordSpacingUnits.Mobile ? `word-spacing: ${primaryButtonWordSpacing.Mobile}${primaryButtonWordSpacingUnits.Mobile};` : ""}
                ${primaryButtonMobileBorderCssStyle ? `border-width: ${primaryButtonMobileBorderCssStyle};` : ""}  
                ${primaryButtonMobileBorderRadiusCssStyle ? `border-radius: ${primaryButtonMobileBorderRadiusCssStyle};` : ""}
                ${primaryButtonMobileMarginCssStyle ? `margin: ${primaryButtonMobileMarginCssStyle};` : ""} 
                ${primaryButtonMobilePaddingCssStyle ? `padding: ${primaryButtonMobilePaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper .gslider-btn-wrapper .gslider-btn-inner-wrapper .gslider-btn.secondary-btn {
                ${secondaryButtonFontSize.Mobile && secondaryButtonFontSizeUnits.Mobile ? `font-size: ${secondaryButtonFontSize.Mobile}${secondaryButtonFontSizeUnits.Mobile};` : ""}
                ${secondaryButtonLineHeight.Mobile && secondaryButtonLineHeightUnits.Mobile ? `line-height: ${secondaryButtonLineHeight.Mobile}${secondaryButtonLineHeightUnits.Mobile};` : ""}
                ${secondaryButtonLetterSpacing.Mobile && secondaryButtonLetterSpacingUnits.Mobile ? `letter-spacing: ${secondaryButtonLetterSpacing.Mobile}${secondaryButtonLetterSpacingUnits.Mobile};` : ""}
                ${secondaryButtonWordSpacing.Mobile && secondaryButtonWordSpacingUnits.Mobile ? `word-spacing: ${secondaryButtonWordSpacing.Mobile}${secondaryButtonWordSpacingUnits.Mobile};` : ""}
                ${secondaryButtonMobileBorderCssStyle ? `border-width: ${secondaryButtonMobileBorderCssStyle};` : ""}  
                ${secondaryButtonMobileBorderRadiusCssStyle ? `border-radius: ${secondaryButtonMobileBorderRadiusCssStyle};` : ""}
                ${secondaryButtonMobileMarginCssStyle ? `margin: ${secondaryButtonMobileMarginCssStyle};` : ""} 
                ${secondaryButtonMobilePaddingCssStyle ? `padding: ${secondaryButtonMobilePaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-base-wrapper.outside {
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
                ${(() => {
    if (paginationType === "progressbar") {
      return paginationProgressbarPosition.Mobile ? `top: ${paginationProgressbarPosition.Mobile}${paginationProgressbarPositionUnits.Mobile} !important;` : "";
    }
    return paginationDotsPosition.Mobile ? `bottom: ${paginationDotsPosition.Mobile}${paginationDotsPositionUnits.Mobile} !important;` : "";
  })()}
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
                .${blockId}.gslider-base-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${blockId}.gslider-base-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${blockId}.gslider-base-wrapper .swiper-pagination-custom,
                .${blockId}.gslider-base-wrapper .swiper-pagination-fraction {
                    bottom: -${(() => {
    if (paginationOutsideOffset?.Mobile) {
      return `${paginationOutsideOffset.Mobile}${paginationOutsideOffsetUnits?.Mobile || "px"}`;
    }
    if (paginationOutsideOffset?.Tablet) {
      return `${paginationOutsideOffset.Tablet}${paginationOutsideOffsetUnits?.Tablet || "px"}`;
    }
    if (paginationOutsideOffset?.Desktop) {
      return `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}`;
    }
    return "30px";
  })()} !important;
                }
            ` : ""}

            ${paginationPositionType === "outside" ? `
                ${(() => {
    if (showPagination?.Mobile) {
      const mobileOffset = (() => {
        if (paginationOutsideOffset?.Mobile) {
          return `${paginationOutsideOffset.Mobile}${paginationOutsideOffsetUnits?.Mobile || "px"}`;
        }
        if (paginationOutsideOffset?.Tablet) {
          return `${paginationOutsideOffset.Tablet}${paginationOutsideOffsetUnits?.Tablet || "px"}`;
        }
        if (paginationOutsideOffset?.Desktop) {
          return `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}`;
        }
        return "30px";
      })();
      return `
                    .${blockId}.gslider-base-wrapper.has-pagination {
                        margin-bottom: ${mobileOffset};
                    }
                `;
    }
    if (showPagination?.Desktop || showPagination?.Tablet) {
      return `
                    .${blockId}.gslider-base-wrapper.has-pagination {
                        margin-bottom: 0;
                    }
                `;
    }
    return "";
  })()}
            ` : ""}
        }
    `;
  return `${baseSliderCSS} ${sliderItemColorStyle}`.replace(/\s+/g, " ").trim();
};
var styling_default = generateBaseSliderStyle;

// ../../src/blocks/base/deprecated.js
var import_block_editor2 = require("@wordpress/block-editor");
var import_jsx_runtime3 = require("react/jsx-runtime");
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
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
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
      }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper gslider-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
        showNavigation && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-next",
                  "aria-label": "Next slide"
                }
              )
            ]
          }
        ) }),
        navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
            ]
          }
        ),
        navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "img",
                {
                  src: navigationArrowsIconLeftImageUrl,
                  alt: navigationArrowsIconLeftImageAlt
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "img",
                {
                  src: navigationArrowsIconRightImageUrl,
                  alt: navigationArrowsIconRightImageAlt
                }
              ) })
            ]
          }
        ),
        showPagination && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-pagination" }) }) })
      ] }),
      showNavigation && !navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "swiper-button-prev",
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "swiper-button-next",
                "aria-label": "Next slide"
              }
            )
          ]
        }
      ) }),
      navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "icon" || navigationArrowsIconRightAlign === "icon") && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
          ]
        }
      ),
      navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "img",
              {
                src: navigationArrowsIconLeftImageUrl,
                alt: navigationArrowsIconLeftImageAlt
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper gslider-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
        anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-next",
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
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
            ]
          }
        ),
        anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "img",
                {
                  src: navigationArrowsIconLeftImageUrl,
                  alt: navigationArrowsIconLeftImageAlt
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "img",
                {
                  src: navigationArrowsIconRightImageUrl,
                  alt: navigationArrowsIconRightImageAlt
                }
              ) })
            ]
          }
        ),
        anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-pagination" }) }) })
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
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "swiper-button-next",
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
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "img",
              {
                src: navigationArrowsIconLeftImageUrl,
                alt: navigationArrowsIconLeftImageAlt
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
        anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: "swiper-button-next",
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
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
            ]
          }
        ),
        anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "img",
                {
                  src: navigationArrowsIconLeftImageUrl,
                  alt: navigationArrowsIconLeftImageAlt
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "img",
                {
                  src: navigationArrowsIconRightImageUrl,
                  alt: navigationArrowsIconRightImageAlt
                }
              ) })
            ]
          }
        ),
        anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-pagination" }) }) })
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
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "swiper-button-next",
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
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: renderIcon_default(navigationArrowsIconLeft) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: renderIcon_default(navigationArrowsIconRight) })
          ]
        }
      ),
      anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === "outside" && (navigationArrowsIconLeftAlign === "image" || navigationArrowsIconRightAlign === "image") && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: `gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-prev", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "img",
              {
                src: navigationArrowsIconLeftImageUrl,
                alt: navigationArrowsIconLeftImageAlt
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-button-next", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
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
        anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-pagination" }) }) })
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
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
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
        anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-pagination" }) }) })
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
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
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
        anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-pagination" }) }) })
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
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
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
        anyPaginationEnabled && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-pagination-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-pagination" }) }) })
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
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      paginationPositionType,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? "has-pagination" : ""}`
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
        el: `.${blockId} .swiper-pagination-base-slider`,
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
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
            className: "swiper-pagination swiper-pagination-base-slider",
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
          className: `swiper-pagination swiper-pagination-base-slider swiper-pagination-${blockId}`,
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
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      paginationPositionType,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? "has-pagination" : ""}`
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
        el: `.${blockId} .swiper-pagination-base-slider`,
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
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
            className: "swiper-pagination swiper-pagination-base-slider",
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
          className: `swiper-pagination swiper-pagination-base-slider swiper-pagination-${blockId}`,
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
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      paginationPositionType,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}`
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
        el: `.${blockId} .swiper-pagination-base-slider`,
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn primary-btn",
                        href: item.primaryButtonLink,
                        target: item.primaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.primaryButtonNofollow && "nofollow",
                          item.primaryButtonSponsored && "sponsored",
                          item.primaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.primaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "a",
                      {
                        className: "gslider-btn secondary-btn",
                        href: item.secondaryButtonLink,
                        target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                        rel: [
                          item.secondaryButtonNofollow && "nofollow",
                          item.secondaryButtonSponsored && "sponsored",
                          item.secondaryButtonTargetLink && "noopener noreferrer"
                        ].filter(
                          Boolean
                        ).join(
                          " "
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                          import_block_editor2.RichText.Content,
                          {
                            value: item.secondaryButtonText
                          }
                        )
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
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
            className: "swiper-pagination swiper-pagination-base-slider",
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
          className: `swiper-pagination swiper-pagination-base-slider swiper-pagination-${blockId}`,
          "aria-label": "Carousel pagination"
        }
      ) })
    ] });
  }
};
var v1_2_1 = {
  attributes: attributes_default,
  supports: {
    html: false,
    anchor: false,
    align: ["wide", "full"]
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
      sliderItems,
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
      showSubTitle,
      showTitle,
      showDescription,
      showButton,
      showNavigation,
      showPagination,
      paginationPositionType,
      subTitleHtmlTag,
      titleHtmlTag,
      descriptionHtmlTag,
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
      layoutHeightSwitcher
    } = attributes2;
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}`
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
        el: `.${blockId} .swiper-pagination-base-slider`,
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
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-list-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-list-content", children: [
                  showSubTitle && item.subTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-subtitle-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: subTitleHtmlTag,
                      className: "gslider-subtitle",
                      value: item.subTitle
                    }
                  ) }),
                  showTitle && item.title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: titleHtmlTag,
                      className: "gslider-title",
                      value: item.title
                    }
                  ) }),
                  showDescription && item.description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-description-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: descriptionHtmlTag,
                      className: "gslider-description",
                      value: item.description
                    }
                  ) }),
                  showButton && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-btn-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    item.primaryButtonLink ? (
                      // eslint-disable-next-line react/jsx-no-target-blank
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "a",
                        {
                          className: "gslider-btn primary-btn",
                          href: item.primaryButtonLink,
                          target: item.primaryButtonTargetLink ? "_blank" : void 0,
                          rel: [
                            item.primaryButtonNofollow && "nofollow",
                            item.primaryButtonSponsored && "sponsored",
                            item.primaryButtonTargetLink && "noopener noreferrer"
                          ].filter(
                            Boolean
                          ).join(
                            " "
                          ),
                          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                            import_block_editor2.RichText.Content,
                            {
                              value: item.primaryButtonText
                            }
                          )
                        }
                      )
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.primaryButtonText,
                        className: "gslider-btn primary-btn"
                      }
                    ),
                    item.secondaryButtonSwitcher && (item.secondaryButtonLink ? (
                      // eslint-disable-next-line react/jsx-no-target-blank
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "a",
                        {
                          className: "gslider-btn secondary-btn",
                          href: item.secondaryButtonLink,
                          target: item.secondaryButtonTargetLink ? "_blank" : void 0,
                          rel: [
                            item.secondaryButtonNofollow && "nofollow",
                            item.secondaryButtonSponsored && "sponsored",
                            item.secondaryButtonTargetLink && "noopener noreferrer"
                          ].filter(
                            Boolean
                          ).join(
                            " "
                          ),
                          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                            import_block_editor2.RichText.Content,
                            {
                              value: item.secondaryButtonText
                            }
                          )
                        }
                      )
                    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        value: item.secondaryButtonText,
                        className: "gslider-btn secondary-btn"
                      }
                    ))
                  ] }) }) })
                ] }) }) })
              }
            )
          },
          item.id
        )) }),
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
            className: "swiper-pagination swiper-pagination-base-slider",
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
          className: `swiper-pagination swiper-pagination-base-slider swiper-pagination-${blockId}`,
          "aria-label": "Carousel pagination"
        }
      ) })
    ] });
  }
};
var deprecated_default = [
  v1_2_1,
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
