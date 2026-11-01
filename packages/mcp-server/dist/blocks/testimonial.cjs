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

// ../../src/blocks/testimonial/testimonial-entry.js
var testimonial_entry_exports = {};
__export(testimonial_entry_exports, {
  attributes: () => attributes_default,
  deprecated: () => deprecated_default,
  meta: () => block_default,
  save: () => Save,
  styling: () => styling_default
});
module.exports = __toCommonJS(testimonial_entry_exports);

// ../../src/blocks/testimonial/block.json
var block_default = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "gslider-blocks/testimonial",
  version: "1.2.1",
  title: "Testimonial",
  category: "gslider-blocks",
  description: "Display customer testimonials in slider, carousel, or grid layout with star ratings.",
  keywords: [
    "testimonial",
    "review",
    "quote",
    "rating",
    "stars",
    "feedback",
    "customer review",
    "slider",
    "carousel"
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

// ../../src/blocks/testimonial/content-order.js
var DEFAULT_TESTIMONIAL_CONTENT_ORDER = [
  "quote",
  "content",
  "rating",
  "author"
];
var normalizeContentOrder = (order) => {
  if (!Array.isArray(order) || order.length === 0) {
    return [...DEFAULT_TESTIMONIAL_CONTENT_ORDER];
  }
  const normalizedOrder = order.filter(
    (key, index) => DEFAULT_TESTIMONIAL_CONTENT_ORDER.includes(key) && order.indexOf(key) === index
  );
  if (!normalizedOrder.includes("rating")) {
    const contentIndex = normalizedOrder.indexOf("content");
    const authorIndex = normalizedOrder.indexOf("author");
    let insertIndex = normalizedOrder.length;
    if (contentIndex !== -1) {
      insertIndex = contentIndex + 1;
    } else if (authorIndex !== -1) {
      insertIndex = authorIndex;
    }
    normalizedOrder.splice(insertIndex, 0, "rating");
  }
  DEFAULT_TESTIMONIAL_CONTENT_ORDER.forEach((key) => {
    if (!normalizedOrder.includes(key)) {
      normalizedOrder.push(key);
    }
  });
  return normalizedOrder;
};

// ../../src/blocks/testimonial/attributes.js
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
  presetStyle: {
    type: "string",
    default: "preset-classic"
  },
  authorPlaceholderUrl: {
    type: "string",
    default: ""
  },
  sliderItems: {
    type: "array",
    default: [
      {
        id: "item-1",
        testimonialTitle: "Excellent Testimonial Plugin",
        testimonialText: "This is the best testimonial plugin I have ever used. Highly recommended for any WordPress site!",
        authorName: "Alex Hunter",
        authorDesignation: "Software Engineer, Google",
        authorImage: {
          url: "",
          id: "",
          alt: ""
        },
        ratingIconAlign: "icon",
        ratingNumber: 5,
        ratingImage: {
          url: "",
          id: "",
          alt: ""
        },
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
        testimonialTitle: "Best Experience!",
        testimonialText: "I've tried many solutions, but this one stands out. It's intuitive, powerful, and exactly what I needed.",
        authorName: "Jane Smith",
        authorDesignation: "UX Designer, Google",
        authorImage: {
          url: "",
          id: "",
          alt: ""
        },
        ratingIconAlign: "icon",
        ratingNumber: 5,
        ratingImage: {
          url: "",
          id: "",
          alt: ""
        },
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
        testimonialTitle: "Highly Recommended!",
        testimonialText: "Fantastic results! The implementation was smooth and the performance is top-notch. Truly impressed with the quality.",
        authorName: "Michael Brown",
        authorDesignation: "Senior Software Engineer, Google",
        authorImage: {
          url: "",
          id: "",
          alt: ""
        },
        ratingIconAlign: "icon",
        ratingNumber: 5,
        ratingImage: {
          url: "",
          id: "",
          alt: ""
        },
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
        testimonialTitle: {
          type: "string",
          default: "Excellent Testimonial Plugin"
        },
        testimonialText: {
          type: "string",
          default: "This is the best testimonial plugin I have ever used. Highly recommended for any WordPress site!"
        },
        authorName: {
          type: "string",
          default: "Alex Hunter"
        },
        authorDesignation: {
          type: "string",
          default: "Software Engineer, Google"
        },
        authorImage: {
          type: "object",
          default: {
            url: "",
            id: "",
            alt: ""
          }
        },
        ratingIconAlign: {
          type: "string",
          default: "icon"
        },
        ratingNumber: {
          type: "number",
          default: 5
        },
        ratingImage: {
          type: "object",
          default: {
            url: "",
            id: "",
            alt: ""
          }
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
  showAuthorName: {
    type: "boolean",
    default: true
  },
  showAuthorDesignation: {
    type: "boolean",
    default: true
  },
  showTestimonialTitle: {
    type: "boolean",
    default: true
  },
  showTestimonialText: {
    type: "boolean",
    default: true
  },
  showAuthorImage: {
    type: "boolean",
    default: true
  },
  showRating: {
    type: "boolean",
    default: true
  },
  showQuoteIcon: {
    type: "boolean",
    default: false
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
    default: "outside"
  },
  /** End Show/Hide Elements */
  /** Layout & Content Setting */
  contentOrder: {
    type: "array",
    default: [...DEFAULT_TESTIMONIAL_CONTENT_ORDER]
  },
  layoutHeightSwitcher: {
    type: "string",
    default: "fixed"
  },
  layoutHeight: {
    type: "object",
    default: {
      Desktop: "420",
      Tablet: "340",
      Mobile: "260"
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
      Desktop: "center",
      Tablet: "center",
      Mobile: "center"
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
      Desktop: "center",
      Tablet: "center",
      Mobile: "center"
    }
  },
  testimonialTitleHtmlTag: {
    type: "string",
    default: "h3"
  },
  testimonialTextHtmlTag: {
    type: "string",
    default: "p"
  },
  authorNameHtmlTag: {
    type: "string",
    default: "h4"
  },
  authorDesignationHtmlTag: {
    type: "string",
    default: "h5"
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
  /** Start Author Name Typography */
  authorNameFontFamily: {
    type: "string",
    default: ""
  },
  authorNameFontSize: {
    type: "object",
    default: {
      Desktop: "18",
      Tablet: "18",
      Mobile: "18"
    }
  },
  authorNameFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorNameFontWeight: {
    type: "string",
    default: ""
  },
  authorNameFontStyle: {
    type: "string",
    default: ""
  },
  authorNameTextTransform: {
    type: "string",
    default: ""
  },
  authorNameTextDecoration: {
    type: "string",
    default: ""
  },
  authorNameLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  authorNameLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorNameLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  authorNameLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorNameWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  authorNameWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Author Name Typography */
  /** Start Author Name Color */
  authorNameColorSwitcher: {
    type: "string",
    default: "normal"
  },
  authorNameColor: {
    type: "string",
    default: ""
  },
  authorNameColorHover: {
    type: "string",
    default: ""
  },
  /** End Author Name Color */
  /** Start Author Name Margin */
  authorNameMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorNameDesktopMargin: {
    type: "object",
    default: {
      top: "8",
      bottom: "4",
      left: "0",
      right: "0"
    }
  },
  authorNameDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  authorNameTabletMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "4",
      left: "0",
      right: "0"
    }
  },
  authorNameTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  authorNameMobileMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "4",
      left: "0",
      right: "0"
    }
  },
  authorNameMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  authorNameMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Author Name Margin */
  /** Start Author Name Padding */
  authorNamePaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorNameDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorNameDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  authorNameTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorNameTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  authorNameMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorNameMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  authorNamePaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Author Name Padding */
  /** End Author Name */
  /** Start Author Designation */
  /** Start Author Designation Typography */
  authorDesignationFontFamily: {
    type: "string",
    default: ""
  },
  authorDesignationFontSize: {
    type: "object",
    default: {
      Desktop: "16",
      Tablet: "16",
      Mobile: "16"
    }
  },
  authorDesignationFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorDesignationFontWeight: {
    type: "string",
    default: ""
  },
  authorDesignationFontStyle: {
    type: "string",
    default: ""
  },
  authorDesignationTextTransform: {
    type: "string",
    default: ""
  },
  authorDesignationTextDecoration: {
    type: "string",
    default: ""
  },
  authorDesignationLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  authorDesignationLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorDesignationLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  authorDesignationLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorDesignationWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  authorDesignationWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Author Designation Typography */
  /** Start Author Designation Color */
  authorDesignationColorSwitcher: {
    type: "string",
    default: "normal"
  },
  authorDesignationColor: {
    type: "string",
    default: ""
  },
  authorDesignationColorHover: {
    type: "string",
    default: ""
  },
  /** End Author Designation Color */
  /** Start Author Designation Margin */
  authorDesignationMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorDesignationDesktopMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "0",
      left: "0",
      right: "0"
    }
  },
  authorDesignationDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  authorDesignationTabletMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "0",
      left: "0",
      right: "0"
    }
  },
  authorDesignationTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  authorDesignationMobileMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "0",
      left: "0",
      right: "0"
    }
  },
  authorDesignationMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  authorDesignationMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Author Designation Margin */
  /** Start Author Designation Padding */
  authorDesignationPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorDesignationDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorDesignationDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  authorDesignationTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorDesignationTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  authorDesignationMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorDesignationMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  authorDesignationPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Author Designation Padding */
  /** End Author Designation */
  /** Start Author Image Style */
  /** Start Author Image Size */
  authorImageSize: {
    type: "object",
    default: {
      Desktop: "80",
      Tablet: "64",
      Mobile: "56"
    }
  },
  authorImageSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Author Image Size */
  /** Start Author Image Border */
  authorImageBorder: {
    type: "string",
    default: "none"
  },
  authorImageBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  authorImageBorderColor: {
    type: "string",
    default: ""
  },
  authorImageBorderHoverColor: {
    type: "string",
    default: ""
  },
  authorImageBorderWidthUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorImageDesktopBorderWidth: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorImageDesktopBorderWidthCssStyle: {
    type: "string",
    default: ""
  },
  authorImageTabletBorderWidth: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorImageTabletBorderWidthCssStyle: {
    type: "string",
    default: ""
  },
  authorImageMobileBorderWidth: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorImageMobileBorderWidthCssStyle: {
    type: "string",
    default: ""
  },
  authorImageBorderWidthLink: {
    type: "boolean",
    default: true
  },
  /** End Author Image Border */
  /** Start Author Image Border Radius */
  authorImageBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorImageDesktopBorderRadius: {
    type: "object",
    default: {
      top: "50",
      bottom: "50",
      left: "50",
      right: "50"
    }
  },
  authorImageDesktopBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  authorImageTabletBorderRadius: {
    type: "object",
    default: {
      top: "50",
      bottom: "50",
      left: "50",
      right: "50"
    }
  },
  authorImageTabletBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  authorImageMobileBorderRadius: {
    type: "object",
    default: {
      top: "50",
      bottom: "50",
      left: "50",
      right: "50"
    }
  },
  authorImageMobileBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  authorImageBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Author Image Border Radius */
  /** Start Author Image Margin */
  authorImageMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorImageDesktopMargin: {
    type: "object",
    default: {
      top: "12",
      bottom: "0",
      left: "0",
      right: "0"
    }
  },
  authorImageDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  authorImageTabletMargin: {
    type: "object",
    default: {
      top: "10",
      bottom: "6",
      left: "0",
      right: "0"
    }
  },
  authorImageTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  authorImageMobileMargin: {
    type: "object",
    default: {
      top: "8",
      bottom: "4",
      left: "0",
      right: "0"
    }
  },
  authorImageMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  authorImageMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Author Image Margin */
  /** Start Author Image Padding */
  authorImagePaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  authorImageDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorImageDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  authorImageTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorImageTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  authorImageMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  authorImageMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  authorImagePaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Author Image Padding */
  /** End Author Image Style */
  /** Start Rating Style */
  ratingStarColorSwitcher: {
    type: "string",
    default: "normal"
  },
  ratingStarColor: {
    type: "string",
    default: "#ffb700"
  },
  ratingStarHoverColor: {
    type: "string",
    default: ""
  },
  ratingEmptyStarColorSwitcher: {
    type: "string",
    default: "normal"
  },
  ratingEmptyStarColor: {
    type: "string",
    default: "#d4d4d4"
  },
  ratingEmptyStarHoverColor: {
    type: "string",
    default: ""
  },
  ratingStarSize: {
    type: "object",
    default: {
      Desktop: "20",
      Tablet: "20",
      Mobile: "20"
    }
  },
  ratingStarSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  ratingStarGap: {
    type: "object",
    default: {
      Desktop: "5",
      Tablet: "5",
      Mobile: "5"
    }
  },
  ratingStarGapUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  ratingNumberGap: {
    type: "object",
    default: {
      Desktop: "10",
      Tablet: "10",
      Mobile: "10"
    }
  },
  ratingNumberGapUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** Start Rating Margin */
  ratingMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  ratingDesktopMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  ratingDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  ratingTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  ratingTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  ratingMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  ratingMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  ratingMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Rating Margin */
  /** Start Rating Padding */
  ratingPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  ratingDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  ratingDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  ratingTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  ratingTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  ratingMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  ratingMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  ratingPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Rating Padding */
  /** Start Rating Number Style */
  showRatingNumber: {
    type: "boolean",
    default: false
  },
  ratingNumberColorSwitcher: {
    type: "string",
    default: "normal"
  },
  ratingNumberColor: {
    type: "string",
    default: ""
  },
  ratingNumberHoverColor: {
    type: "string",
    default: ""
  },
  ratingNumberFontFamily: {
    type: "string",
    default: ""
  },
  ratingNumberFontSize: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  ratingNumberFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  ratingNumberFontWeight: {
    type: "string",
    default: ""
  },
  ratingNumberFontStyle: {
    type: "string",
    default: ""
  },
  ratingNumberTextTransform: {
    type: "string",
    default: ""
  },
  ratingNumberTextDecoration: {
    type: "string",
    default: ""
  },
  ratingNumberLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  ratingNumberLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  ratingNumberLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  ratingNumberLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  ratingNumberWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  ratingNumberWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Rating Number Style */
  /** End Rating Style */
  /** Start Testimonial Title */
  /** Start Testimonial Title Typography */
  testimonialTitleFontFamily: {
    type: "string",
    default: ""
  },
  testimonialTitleFontSize: {
    type: "object",
    default: {
      Desktop: "24",
      Tablet: "24",
      Mobile: "24"
    }
  },
  testimonialTitleFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  testimonialTitleFontWeight: {
    type: "string",
    default: ""
  },
  testimonialTitleFontStyle: {
    type: "string",
    default: ""
  },
  testimonialTitleTextTransform: {
    type: "string",
    default: ""
  },
  testimonialTitleTextDecoration: {
    type: "string",
    default: ""
  },
  testimonialTitleLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  testimonialTitleLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  testimonialTitleLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  testimonialTitleLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  testimonialTitleWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  testimonialTitleWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Testimonial Title Typography */
  /** Start Testimonial Title Color */
  testimonialTitleColorSwitcher: {
    type: "string",
    default: "normal"
  },
  testimonialTitleColor: {
    type: "string",
    default: ""
  },
  testimonialTitleColorHover: {
    type: "string",
    default: ""
  },
  /** End Testimonial Title Color */
  /** Start Testimonial Title Margin */
  testimonialTitleMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  testimonialTitleDesktopMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "12",
      left: "0",
      right: "0"
    }
  },
  testimonialTitleDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTitleTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  testimonialTitleTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTitleMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  testimonialTitleMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTitleMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Testimonial Title Margin */
  /** Start Testimonial Title Padding */
  testimonialTitlePaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  testimonialTitleDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  testimonialTitleDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTitleTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  testimonialTitleTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTitleMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  testimonialTitleMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTitlePaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Testimonial Title Padding */
  /** End Testimonial Title */
  /** Start Testimonial Text Typography */
  testimonialTextFontFamily: {
    type: "string",
    default: ""
  },
  testimonialTextFontSize: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  testimonialTextFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  testimonialTextFontWeight: {
    type: "string",
    default: ""
  },
  testimonialTextFontStyle: {
    type: "string",
    default: ""
  },
  testimonialTextTextTransform: {
    type: "string",
    default: ""
  },
  testimonialTextTextDecoration: {
    type: "string",
    default: ""
  },
  testimonialTextLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  testimonialTextLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  testimonialTextLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  testimonialTextLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  testimonialTextWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  testimonialTextWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Testimonial Text Typography */
  /** Start Testimonial Text Color */
  testimonialTextColorSwitcher: {
    type: "string",
    default: "normal"
  },
  testimonialTextColor: {
    type: "string",
    default: ""
  },
  testimonialTextColorHover: {
    type: "string",
    default: ""
  },
  /** End Testimonial Text Color */
  /** Start Testimonial Text Margin */
  testimonialTextMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  testimonialTextDesktopMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  testimonialTextDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTextTabletMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  testimonialTextTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTextMobileMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "16",
      left: "0",
      right: "0"
    }
  },
  testimonialTextMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTextMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Testimonial Text Margin */
  /** Start Testimonial Text Padding */
  testimonialTextPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  testimonialTextDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  testimonialTextDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTextTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  testimonialTextTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTextMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  testimonialTextMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  testimonialTextPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Testimonial Text Padding */
  /** End Testimonial Text */
  /** Start Quote Icon */
  quoteIconAlign: {
    type: "string",
    default: "icon"
  },
  /** Start Quote Icon Settings */
  quoteIcon: {
    type: "string",
    default: "quote-left"
  },
  quoteImageUrl: {
    type: "string",
    default: ""
  },
  quoteImageAlt: {
    type: "string",
    default: ""
  },
  quoteImageID: {
    type: "number",
    default: ""
  },
  /** End Quote Icon Settings */
  /** Start Quote Icon Size */
  quoteIconSize: {
    type: "object",
    default: {
      Desktop: "60",
      Tablet: "",
      Mobile: ""
    }
  },
  quoteIconSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Quote Icon Size */
  /** Start Quote Icon Background */
  quoteIconNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  quoteIconNormalClassicColor: {
    type: "string",
    default: ""
  },
  quoteIconNormalGradientColor: {
    type: "string",
    default: ""
  },
  quoteIconNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  quoteIconNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  quoteIconHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  quoteIconHoverClassicColor: {
    type: "string",
    default: ""
  },
  quoteIconHoverGradientColor: {
    type: "string",
    default: ""
  },
  quoteIconHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  quoteIconHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Quote Icon Background */
  /** Start Quote Icon Color */
  quoteIconColorSwitcher: {
    type: "string",
    default: "normal"
  },
  quoteIconColor: {
    type: "string",
    default: ""
  },
  quoteIconHoverColor: {
    type: "string",
    default: ""
  },
  /** End Quote Icon Color */
  /** Start Quote Icon Border */
  quoteIconBorder: {
    type: "string",
    default: "none"
  },
  quoteIconBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  quoteIconBorderColor: {
    type: "string",
    default: ""
  },
  quoteIconBorderHoverColor: {
    type: "string",
    default: ""
  },
  quoteIconBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  quoteIconDesktopBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconDesktopBorderCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconTabletBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconTabletBorderCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconMobileBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconMobileBorderCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconBorderLink: {
    type: "boolean",
    default: true
  },
  /** End Quote Icon Border */
  /** Start Quote Icon Border Radius */
  quoteIconBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  quoteIconDesktopBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconDesktopBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconTabletBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconTabletBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconMobileBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconMobileBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Quote Icon Border Radius */
  /** Start Quote Icon Box Shadow */
  quoteIconBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  quoteIconBoxShadowValues: {
    type: "array",
    default: []
  },
  quoteIconBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  quoteIconBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  quoteIconBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  },
  /** End Quote Icon Box Shadow */
  /** Start Quote Icon Visual Effects */
  quoteIconOpacity: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  quoteIconRotateSwitcher: {
    type: "string",
    default: "normal"
  },
  quoteIconRotate: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  quoteIconHoverRotate: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  quoteIconZIndex: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  /** End Quote Icon Visual Effects */
  /** Start Quote Icon Margin */
  quoteIconMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  quoteIconDesktopMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Quote Icon Margin */
  /** Start Quote Icon Padding */
  quoteIconPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  quoteIconDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  quoteIconMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  quoteIconPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Quote Icon Padding */
  /** Start Quote Icon Positioning */
  quoteIconPositionSwitcher: {
    type: "boolean",
    default: false
  },
  quoteIconPositionTop: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  quoteIconPositionTopUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  quoteIconPositionBottom: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  quoteIconPositionBottomUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  quoteIconPositionLeft: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  quoteIconPositionLeftUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  quoteIconPositionRight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  quoteIconPositionRightUnits: {
    type: "object",
    default: {
      Desktop: "%",
      Tablet: "%",
      Mobile: "%"
    }
  },
  /** End Quote Icon Positioning */
  /** End Quote Icon */
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
      Mobile: "16"
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
      Mobile: "44"
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
      Mobile: "44"
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
    default: "outside"
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
      Mobile: "56"
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

// ../../src/blocks/testimonial/save.js
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

// ../../src/blocks/testimonial/save.js
var import_jsx_runtime2 = require("react/jsx-runtime");
function Save({ attributes: attributes2 }) {
  const {
    blockId,
    authorPlaceholderUrl,
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
    showAuthorName,
    showAuthorDesignation,
    showTestimonialTitle,
    showTestimonialText,
    showAuthorImage,
    showRating,
    showRatingNumber,
    showQuoteIcon,
    quoteIconAlign,
    quoteIcon,
    quoteImageUrl,
    quoteImageAlt,
    showNavigation,
    showPagination,
    paginationPositionType,
    authorNameHtmlTag,
    authorDesignationHtmlTag,
    testimonialTitleHtmlTag,
    testimonialTextHtmlTag,
    globalID,
    globalClass,
    navigationArrowPositionType,
    navigationArrowPosition,
    navigationArrowsIconSwitcher,
    navigationArrowsIconLeftAlign,
    navigationArrowsIconLeft,
    navigationArrowsIconLeftImageUrl,
    navigationArrowsIconRightAlign,
    navigationArrowsIconRight,
    navigationArrowsIconRightImageUrl,
    layoutHeightSwitcher,
    contentOrder
  } = attributes2;
  const normalizedContentOrder = normalizeContentOrder(contentOrder);
  const blockProps = import_block_editor.useBlockProps.save({
    className: `gslider-testimonial-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}`
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
      el: blockId ? `.${blockId} .swiper-pagination-testimonial-slider` : ".swiper-pagination-testimonial-slider",
      type: paginationType,
      dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
      clickable: true
    },
    ...slideEffect === "creative" && {
      creativeEffect: {
        prev: { shadow: true, translate: [0, 0, -400] },
        next: { translate: ["100%", 0, 0] }
      }
    }
  });
  const authorImagePlaceholder = authorPlaceholderUrl;
  const renderRatingIcons = (item) => {
    const { ratingNumber, ratingIconAlign } = item;
    const ratingImageUrl = item.ratingImage?.url;
    const ratingImageAlt = item.ratingImage?.alt;
    const rating = Math.max(
      0,
      Math.min(5, parseFloat(ratingNumber || 0))
    );
    if (ratingIconAlign === "none" || rating === 0) {
      return null;
    }
    if (ratingIconAlign === "image" && ratingImageUrl) {
      const fullCount = Math.round(rating);
      const icons = [];
      for (let i = 0; i < fullCount; i++) {
        icons.push(
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-testimonial-rating-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: ratingImageUrl, alt: ratingImageAlt }) }, i)
        );
      }
      return icons;
    }
    if (ratingIconAlign === "icon") {
      const fullStars = Math.floor(rating);
      const fraction = rating - fullStars;
      const emptyStars = 5 - fullStars - (fraction > 0 ? 1 : 0);
      const fullStarPath = "M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Z";
      const emptyStarPath = "M49.62,18.85a1.9,1.9,0,0,0-1.54-1.29L33.4,15.38,26.84,1.63a1.92,1.92,0,0,0-3.47,0L16.86,15.34,2.13,17.56a1.92,1.92,0,0,0-1.08,3.25L11.73,31.53,9.21,46.73A1.93,1.93,0,0,0,11.1,49a2,2,0,0,0,.92-.23L25.07,41.6l13.11,7.14a1.93,1.93,0,0,0,2.82-2L38.46,31.6l10.7-10.79A1.92,1.92,0,0,0,49.62,18.85ZM37,30.19a1.94,1.94,0,0,0-.53,1.67L39,46.9l-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.5-15a1.94,1.94,0,0,0-.53-1.67L2.57,19.51l14.59-2.19a2,2,0,0,0,1.45-1.08L25.08,2.58,31.6,16.25a2,2,0,0,0,1.45,1.07l14.58,2.19Z";
      const stars = [];
      for (let i = 0; i < fullStars; i++) {
        stars.push(
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              className: "gslider-testimonial-rating-icon",
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 49.23 48.44",
                  className: "gslider-testimonial-rating-star-svg",
                  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "path",
                    {
                      d: fullStarPath,
                      transform: "translate(-0.39 -0.78)"
                    }
                  )
                }
              )
            },
            `full-${i}`
          )
        );
      }
      if (fraction > 0) {
        stars.push(
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              className: "gslider-testimonial-rating-icon gslider-testimonial-star-partial-wrap",
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "gslider-testimonial-star-partial-container", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 49.23 48.44",
                    className: "gslider-testimonial-rating-star-svg",
                    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "path",
                      {
                        d: emptyStarPath,
                        transform: "translate(-0.49 -0.53)"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "div",
                  {
                    className: "gslider-testimonial-star-partial-fill",
                    style: { width: `${fraction * 100}%` },
                    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 49.23 48.44",
                        className: "gslider-testimonial-rating-star-svg",
                        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                          "path",
                          {
                            d: fullStarPath,
                            transform: "translate(-0.39 -0.78)"
                          }
                        )
                      }
                    )
                  }
                )
              ] })
            },
            "partial"
          )
        );
      }
      for (let i = 0; i < emptyStars; i++) {
        stars.push(
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              className: "gslider-testimonial-rating-icon empty",
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 49.23 48.44",
                  className: "gslider-testimonial-rating-star-svg",
                  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "path",
                    {
                      d: emptyStarPath,
                      transform: "translate(-0.49 -0.53)"
                    }
                  )
                }
              )
            },
            `empty-${i}`
          )
        );
      }
      return stars;
    }
    return null;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "swiper", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => {
        const renderGroupMap = {
          quote: showQuoteIcon && quoteIconAlign !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: "gslider-testimonial-quote-icon-wrapper",
              children: [
                quoteIconAlign === "icon" && renderIcon_default(quoteIcon),
                quoteIconAlign === "image" && quoteImageUrl && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "img",
                  {
                    src: quoteImageUrl,
                    alt: quoteImageAlt
                  }
                )
              ]
            },
            "quote"
          ) : null,
          content: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: "gslider-testimonial-content-group",
              children: [
                showTestimonialTitle && item.testimonialTitle && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-testimonial-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  import_block_editor.RichText.Content,
                  {
                    tagName: testimonialTitleHtmlTag,
                    className: "gslider-testimonial-title",
                    value: item.testimonialTitle
                  }
                ) }),
                showTestimonialText && item.testimonialText && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-testimonial-text-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  import_block_editor.RichText.Content,
                  {
                    tagName: testimonialTextHtmlTag,
                    className: "gslider-testimonial-text",
                    value: item.testimonialText
                  }
                ) })
              ]
            },
            "content"
          ),
          rating: showRating ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              className: "gslider-testimonial-rating-wrapper",
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "gslider-testimonial-rating-inner", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-testimonial-rating-wrap", children: renderRatingIcons(item) }),
                showRatingNumber && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "gslider-testimonial-rating-number", children: [
                  "(",
                  Math.max(
                    0,
                    Math.min(
                      5,
                      parseFloat(
                        item.ratingNumber || 0
                      )
                    )
                  ),
                  ")"
                ] })
              ] })
            },
            "rating"
          ) : null,
          author: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: "gslider-author-info-group",
              children: [
                showAuthorImage && (item.authorImage?.url || authorImagePlaceholder) && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-testimonial-author-image-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "img",
                  {
                    src: item.authorImage?.url || authorImagePlaceholder,
                    alt: item.authorImage?.alt || "Author",
                    className: "gslider-testimonial-author-image"
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "gslider-author-meta", children: [
                  showAuthorName && item.authorName && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-testimonial-author-name-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    import_block_editor.RichText.Content,
                    {
                      tagName: authorNameHtmlTag,
                      className: "gslider-testimonial-author-name",
                      value: item.authorName
                    }
                  ) }),
                  showAuthorDesignation && item.authorDesignation && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-testimonial-author-designation-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    import_block_editor.RichText.Content,
                    {
                      tagName: authorDesignationHtmlTag,
                      className: "gslider-testimonial-author-designation",
                      value: item.authorDesignation
                    }
                  ) })
                ] })
              ]
            },
            "author"
          )
        };
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "div",
              {
                className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                ...globalID && { id: globalID },
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "gslider-content-inner-wrapper", children: normalizedContentOrder.map(
                  (groupKey) => renderGroupMap[groupKey] || null
                ) })
              }
            )
          },
          item.id
        );
      }) }),
      anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "div",
        {
          className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-next",
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
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide",
                children: navigationArrowsIconLeftAlign === "image" && navigationArrowsIconLeftImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: "",
                    "aria-hidden": "true"
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                  navigationArrowsIconLeft
                ) })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-next",
                "aria-label": "Next slide",
                children: navigationArrowsIconRightAlign === "image" && navigationArrowsIconRightImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: "",
                    "aria-hidden": "true"
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                  navigationArrowsIconRight
                ) })
              }
            )
          ]
        }
      ),
      anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: "swiper-pagination swiper-pagination-testimonial-slider",
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
            "button",
            {
              type: "button",
              className: "swiper-button-prev",
              "aria-label": "Previous slide"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
              className: "swiper-button-next",
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
            "button",
            {
              type: "button",
              className: "swiper-button-prev",
              "aria-label": "Previous slide",
              children: navigationArrowsIconLeftAlign === "image" && navigationArrowsIconLeftImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "img",
                {
                  src: navigationArrowsIconLeftImageUrl,
                  alt: "",
                  "aria-hidden": "true"
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(navigationArrowsIconLeft) })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
              className: "swiper-button-next",
              "aria-label": "Next slide",
              children: navigationArrowsIconRightAlign === "image" && navigationArrowsIconRightImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "img",
                {
                  src: navigationArrowsIconRightImageUrl,
                  alt: "",
                  "aria-hidden": "true"
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(navigationArrowsIconRight) })
            }
          )
        ]
      }
    ),
    anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        className: `swiper-pagination swiper-pagination-testimonial-slider${blockId ? ` swiper-pagination-${blockId}` : ""}`,
        "aria-label": "Carousel pagination"
      }
    ) })
  ] });
}

// ../../src/blocks/testimonial/styling.js
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
    showAuthorName,
    showTestimonialTitle,
    showTestimonialText,
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
    authorNameHtmlTag,
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
    /** Start Author Image Style */
    authorImageSize,
    authorImageSizeUnits,
    authorImageBorder,
    authorImageBorderColor,
    authorImageBorderHoverColor,
    authorImageDesktopBorderWidthCssStyle,
    authorImageTabletBorderWidthCssStyle,
    authorImageMobileBorderWidthCssStyle,
    authorImageDesktopBorderRadiusCssStyle,
    authorImageTabletBorderRadiusCssStyle,
    authorImageMobileBorderRadiusCssStyle,
    authorImageDesktopMarginCssStyle,
    authorImageTabletMarginCssStyle,
    authorImageMobileMarginCssStyle,
    authorImageDesktopPaddingCssStyle,
    authorImageTabletPaddingCssStyle,
    authorImageMobilePaddingCssStyle,
    /** End Author Image Style */
    /** Start Quote Icon Style */
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
    quoteIconDesktopMarginCssStyle,
    quoteIconTabletMarginCssStyle,
    quoteIconMobileMarginCssStyle,
    quoteIconPaddingUnits,
    quoteIconDesktopPaddingCssStyle,
    quoteIconTabletPaddingCssStyle,
    quoteIconMobilePaddingCssStyle,
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
    quoteIconDesktopBorderCssStyle,
    quoteIconTabletBorderCssStyle,
    quoteIconMobileBorderCssStyle,
    quoteIconDesktopBorderRadiusCssStyle,
    quoteIconTabletBorderRadiusCssStyle,
    quoteIconMobileBorderRadiusCssStyle,
    quoteIconBoxShadowCssValue,
    quoteIconBoxShadowHoverCssValue,
    quoteIconOpacity,
    quoteIconRotate,
    quoteIconHoverRotate,
    /** End Quote Icon Style */
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
    /** Start Rating Style */
    ratingStarColor,
    ratingStarHoverColor,
    ratingEmptyStarColor,
    ratingEmptyStarHoverColor,
    ratingStarSize,
    ratingStarSizeUnits,
    ratingStarGap,
    ratingStarGapUnits,
    ratingNumberGap,
    ratingNumberGapUnits,
    ratingDesktopMarginCssStyle,
    ratingTabletMarginCssStyle,
    ratingMobileMarginCssStyle,
    ratingDesktopPaddingCssStyle,
    ratingTabletPaddingCssStyle,
    ratingMobilePaddingCssStyle,
    ratingPaddingLink,
    showRatingNumber,
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
                        transition: background .3s ease-in-out, opacity .3s ease-in-out;
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
                    transition: background .3s ease-in-out, opacity .3s ease-in-out;
                }`;
      sliderItemColorStyle += backgroundImageStyle;
    } else if (item.normalItemClassicColor) {
      const classicStyle = `.${blockId} .gslider-content-wrapper.${item.id} {
                    background: ${item.normalItemClassicColor};
                    transition: background-color .3s ease-in-out, opacity .3s ease-in-out;
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
        .${blockId}.gslider-testimonial-wrapper {
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
        .${blockId}.gslider-testimonial-wrapper:hover {
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
        
        .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper {
            ${layoutHeightSwitcher !== "adapt" ? `height: 100% !important;` : ""}
            ${contentVerticalAlignment?.Desktop ? `justify-content: ${contentVerticalAlignment.Desktop};` : ""}
        }

        .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
            ${contentWidth?.Desktop ? `max-width: ${contentWidth.Desktop}${contentWidthUnits?.Desktop};` : ""}
            ${contentAlignment?.Desktop ? `text-align: ${contentAlignment.Desktop};` : ""}
            ${contentHorizontalAlignment?.Desktop ? `align-items: ${contentHorizontalAlignment.Desktop === "left" ? "flex-start" : contentHorizontalAlignment.Desktop === "right" ? "flex-end" : "center"};` : ""}

            ${contentHorizontalAlignment?.Desktop === "left" ? `margin-right: auto; margin-left: 0;` : ""}
            ${contentHorizontalAlignment?.Desktop === "center" ? `margin-left: auto; margin-right: auto;` : ""}
            ${contentHorizontalAlignment?.Desktop === "right" ? `margin-left: auto; margin-right: 0;` : ""}
            ${contentPaddingDesktopCssStyle ? `padding: ${contentPaddingDesktopCssStyle};` : ""}
        }

        .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-testimonial-content-group,
        .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group {
            ${contentHorizontalAlignment?.Desktop ? `align-items: ${contentHorizontalAlignment.Desktop === "left" ? "flex-start" : contentHorizontalAlignment.Desktop === "right" ? "flex-end" : "center"};` : ""}
        }

        .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group .gslider-author-meta {
            ${contentAlignment?.Desktop ? `text-align: ${contentAlignment.Desktop};` : ""}
        }

        .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-author-name-wrapper .gslider-testimonial-author-name {
            ${authorNameFontFamily ? `font-family: ${authorNameFontFamily};` : ""}
            ${authorNameFontSize.Desktop && authorNameFontSizeUnits.Desktop ? `font-size: ${authorNameFontSize.Desktop}${authorNameFontSizeUnits.Desktop};` : ""}
            ${authorNameFontWeight ? `font-weight: ${authorNameFontWeight};` : ""}
            ${authorNameFontStyle ? `font-style: ${authorNameFontStyle};` : ""}
            ${authorNameTextTransform ? `text-transform: ${authorNameTextTransform};` : ""}
            ${authorNameTextDecoration ? `text-decoration: ${authorNameTextDecoration};` : ""}
            ${authorNameLineHeight.Desktop && authorNameLineHeightUnits.Desktop ? `line-height: ${authorNameLineHeight.Desktop}${authorNameLineHeightUnits.Desktop};` : ""}
            ${authorNameLetterSpacing.Desktop && authorNameLetterSpacingUnits.Desktop ? `letter-spacing: ${authorNameLetterSpacing.Desktop}${authorNameLetterSpacingUnits.Desktop};` : ""}
            ${authorNameWordSpacing.Desktop && authorNameWordSpacingUnits.Desktop ? `word-spacing: ${authorNameWordSpacing.Desktop}${authorNameWordSpacingUnits.Desktop};` : ""}
            ${authorNameColor ? `color: ${authorNameColor};` : ""}
            ${authorNameDesktopMarginCssStyle ? `margin: ${authorNameDesktopMarginCssStyle};` : ""} 
            ${authorNameDesktopPaddingCssStyle ? `padding: ${authorNameDesktopPaddingCssStyle};` : ""}
            transition: color .3s ease-in-out;
        }
        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-author-name-wrapper .gslider-testimonial-author-name {
            ${authorNameColorHover ? `color: ${authorNameColorHover};` : ""}
        }

        .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-author-designation-wrapper .gslider-testimonial-author-designation {
            ${authorDesignationFontFamily ? `font-family: ${authorDesignationFontFamily};` : ""}
            ${authorDesignationFontSize.Desktop && authorDesignationFontSizeUnits.Desktop ? `font-size: ${authorDesignationFontSize.Desktop}${authorDesignationFontSizeUnits.Desktop};` : ""}
            ${authorDesignationFontWeight ? `font-weight: ${authorDesignationFontWeight};` : ""}
            ${authorDesignationFontStyle ? `font-style: ${authorDesignationFontStyle};` : ""}
            ${authorDesignationTextTransform ? `text-transform: ${authorDesignationTextTransform};` : ""}
            ${authorDesignationTextDecoration ? `text-decoration: ${authorDesignationTextDecoration};` : ""}
            ${authorDesignationLineHeight.Desktop && authorDesignationLineHeightUnits.Desktop ? `line-height: ${authorDesignationLineHeight.Desktop}${authorDesignationLineHeightUnits.Desktop};` : ""}
            ${authorDesignationLetterSpacing.Desktop && authorDesignationLetterSpacingUnits.Desktop ? `letter-spacing: ${authorDesignationLetterSpacing.Desktop}${authorDesignationLetterSpacingUnits.Desktop};` : ""}
            ${authorDesignationWordSpacing.Desktop && authorDesignationWordSpacingUnits.Desktop ? `word-spacing: ${authorDesignationWordSpacing.Desktop}${authorDesignationWordSpacingUnits.Desktop};` : ""}
            ${authorDesignationColor ? `color: ${authorDesignationColor};` : ""}
            ${authorDesignationDesktopMarginCssStyle ? `margin: ${authorDesignationDesktopMarginCssStyle};` : ""} 
            ${authorDesignationDesktopPaddingCssStyle ? `padding: ${authorDesignationDesktopPaddingCssStyle};` : ""}
            transition: color .3s ease-in-out;
        }
        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-author-designation-wrapper .gslider-testimonial-author-designation {
            ${authorDesignationColorHover ? `color: ${authorDesignationColorHover};` : ""}
        }

        /** Start Author Image Style */
        .${blockId} .gslider-testimonial-author-image-wrapper .gslider-testimonial-author-image {
            ${authorImageSize?.Desktop ? `width: ${authorImageSize.Desktop}${authorImageSizeUnits?.Desktop || "px"};` : ""}
            ${authorImageSize?.Desktop ? `height: ${authorImageSize.Desktop}${authorImageSizeUnits?.Desktop || "px"};` : ""}
            ${authorImageBorder !== "none" ? `border-style: ${authorImageBorder};` : ""}
            ${authorImageDesktopBorderWidthCssStyle ? `border-width: ${authorImageDesktopBorderWidthCssStyle};` : ""}
            ${authorImageBorderColor ? `border-color: ${authorImageBorderColor};` : ""}
            ${authorImageDesktopBorderRadiusCssStyle ? `border-radius: ${authorImageDesktopBorderRadiusCssStyle};` : ""}
            ${authorImageDesktopMarginCssStyle ? `margin: ${authorImageDesktopMarginCssStyle};` : ""}
            ${authorImageDesktopPaddingCssStyle ? `padding: ${authorImageDesktopPaddingCssStyle};` : ""}
            object-fit: cover;
            transition: border-color 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-author-image-wrapper .gslider-testimonial-author-image {
            ${authorImageBorderHoverColor ? `border-color: ${authorImageBorderHoverColor};` : ""}
        }
        /** End Author Image Style */

        .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-title-wrapper .gslider-testimonial-title {
            ${testimonialTitleFontFamily ? `font-family: ${testimonialTitleFontFamily};` : ""}
            ${testimonialTitleFontSize.Desktop && testimonialTitleFontSizeUnits.Desktop ? `font-size: ${testimonialTitleFontSize.Desktop}${testimonialTitleFontSizeUnits.Desktop};` : ""}
            ${testimonialTitleFontWeight ? `font-weight: ${testimonialTitleFontWeight};` : ""}
            ${testimonialTitleFontStyle ? `font-style: ${testimonialTitleFontStyle};` : ""}
            ${testimonialTitleTextTransform ? `text-transform: ${testimonialTitleTextTransform};` : ""}
            ${testimonialTitleTextDecoration ? `text-decoration: ${testimonialTitleTextDecoration};` : ""}
            ${testimonialTitleLineHeight.Desktop && testimonialTitleLineHeightUnits.Desktop ? `line-height: ${testimonialTitleLineHeight.Desktop}${testimonialTitleLineHeightUnits.Desktop};` : ""}
            ${testimonialTitleLetterSpacing.Desktop && testimonialTitleLetterSpacingUnits.Desktop ? `letter-spacing: ${testimonialTitleLetterSpacing.Desktop}${testimonialTitleLetterSpacingUnits.Desktop};` : ""}
            ${testimonialTitleWordSpacing.Desktop && testimonialTitleWordSpacingUnits.Desktop ? `word-spacing: ${testimonialTitleWordSpacing.Desktop}${testimonialTitleWordSpacingUnits.Desktop};` : ""}
            ${testimonialTitleColor ? `color: ${testimonialTitleColor};` : ""}
            ${testimonialTitleDesktopMarginCssStyle ? `margin: ${testimonialTitleDesktopMarginCssStyle};` : ""}
            ${testimonialTitleDesktopPaddingCssStyle ? `padding: ${testimonialTitleDesktopPaddingCssStyle};` : ""}
            transition: color .3s ease-in-out;
        }
        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-title-wrapper .gslider-testimonial-title {
            ${testimonialTitleColorHover ? `color: ${testimonialTitleColorHover};` : ""}
        }

        .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-text-wrapper .gslider-testimonial-text {
            ${testimonialTextFontFamily ? `font-family: ${testimonialTextFontFamily};` : ""}
            ${testimonialTextFontSize.Desktop && testimonialTextFontSizeUnits.Desktop ? `font-size: ${testimonialTextFontSize.Desktop}${testimonialTextFontSizeUnits.Desktop};` : ""}
            ${testimonialTextFontWeight ? `font-weight: ${testimonialTextFontWeight};` : ""}
            ${testimonialTextFontStyle ? `font-style: ${testimonialTextFontStyle};` : ""}
            ${testimonialTextTextTransform ? `text-transform: ${testimonialTextTextTransform};` : ""}
            ${testimonialTextTextDecoration ? `text-decoration: ${testimonialTextTextDecoration};` : ""}
            ${testimonialTextLineHeight.Desktop && testimonialTextLineHeightUnits.Desktop ? `line-height: ${testimonialTextLineHeight.Desktop}${testimonialTextLineHeightUnits.Desktop};` : ""}
            ${testimonialTextLetterSpacing.Desktop && testimonialTextLetterSpacingUnits.Desktop ? `letter-spacing: ${testimonialTextLetterSpacing.Desktop}${testimonialTextLetterSpacingUnits.Desktop};` : ""}
            ${testimonialTextWordSpacing.Desktop && testimonialTextWordSpacingUnits.Desktop ? `word-spacing: ${testimonialTextWordSpacing.Desktop}${testimonialTextWordSpacingUnits.Desktop};` : ""}
            ${testimonialTextColor ? `color: ${testimonialTextColor};` : ""}
            ${testimonialTextDesktopMarginCssStyle ? `margin: ${testimonialTextDesktopMarginCssStyle};` : ""} 
            ${testimonialTextDesktopPaddingCssStyle ? `padding: ${testimonialTextDesktopPaddingCssStyle};` : ""}
            transition: color .3s ease-in-out;
        }
        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-text-wrapper .gslider-testimonial-text {
            ${testimonialTextColorHover ? `color: ${testimonialTextColorHover};` : ""}
        }

        /** Start Quote Icon Style */
        .${blockId} .gslider-testimonial-quote-icon-wrapper {
            ${quoteIconDesktopMarginCssStyle ? `margin: ${quoteIconDesktopMarginCssStyle};` : ""}
            ${quoteIconDesktopPaddingCssStyle ? `padding: ${quoteIconDesktopPaddingCssStyle};` : ""}

            ${quoteIconNormalBackgroundType === "gradient" ? `
                background: ${quoteIconNormalCustomGradientSwitcher && quoteIconNormalCustomGradientInputValue ? quoteIconNormalCustomGradientInputValue : quoteIconNormalGradientColor ? quoteIconNormalGradientColor : quoteIconNormalClassicColor};
            ` : `
                ${quoteIconNormalClassicColor ? `background: ${quoteIconNormalClassicColor};` : ""}
            `}

            ${quoteIconBorder ? `border-style: ${quoteIconBorder};` : ""}
            ${quoteIconDesktopBorderCssStyle ? `border-width: ${quoteIconDesktopBorderCssStyle};` : ""}
            ${quoteIconBorderColor ? `border-color: ${quoteIconBorderColor};` : ""}
            ${quoteIconDesktopBorderRadiusCssStyle ? `border-radius: ${quoteIconDesktopBorderRadiusCssStyle};` : ""}
            ${quoteIconBoxShadowCssValue ? `box-shadow: ${quoteIconBoxShadowCssValue};` : ""}
            
            ${quoteIconOpacity.Desktop ? `opacity: ${quoteIconOpacity.Desktop};` : ""}
            ${quoteIconRotate.Desktop ? `transform: rotate(${quoteIconRotate.Desktop}deg);` : ""}
            ${quoteIconZIndex.Desktop ? `z-index: ${quoteIconZIndex.Desktop};` : ""}

            ${quoteIconPositionSwitcher ? `
                position: absolute;
                ${quoteIconPositionTop.Desktop ? `top: ${quoteIconPositionTop.Desktop}${quoteIconPositionTopUnits.Desktop};` : ""}
                ${quoteIconPositionBottom.Desktop ? `bottom: ${quoteIconPositionBottom.Desktop}${quoteIconPositionBottomUnits.Desktop};` : ""}
                ${quoteIconPositionLeft.Desktop ? `left: ${quoteIconPositionLeft.Desktop}${quoteIconPositionLeftUnits.Desktop};` : ""}
                ${quoteIconPositionRight.Desktop ? `right: ${quoteIconPositionRight.Desktop}${quoteIconPositionRightUnits.Desktop};` : ""}
            ` : "position: relative;"}
            transition: background 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
            line-height: 0;
            display: inline-block;
        }

        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-quote-icon-wrapper {
            ${quoteIconHoverBackgroundType === "gradient" ? `
                background: ${quoteIconHoverCustomGradientSwitcher && quoteIconHoverCustomGradientInputValue ? quoteIconHoverCustomGradientInputValue : quoteIconHoverGradientColor ? quoteIconHoverGradientColor : quoteIconHoverClassicColor};
            ` : `
                ${quoteIconHoverClassicColor ? `background: ${quoteIconHoverClassicColor};` : ""}
            `}
            ${quoteIconBorderHoverColor ? `border-color: ${quoteIconBorderHoverColor};` : ""}
            ${quoteIconBoxShadowHoverCssValue ? `box-shadow: ${quoteIconBoxShadowHoverCssValue};` : ""}
            ${quoteIconHoverRotate.Desktop ? `transform: rotate(${quoteIconHoverRotate.Desktop}deg);` : ""}
        }

        .${blockId} .gslider-testimonial-quote-icon-wrapper svg,
        .${blockId} .gslider-testimonial-quote-icon-wrapper img {
            ${quoteIconSize.Desktop && quoteIconSizeUnits.Desktop ? `width: ${quoteIconSize.Desktop}${quoteIconSizeUnits.Desktop};` : ""}
            ${quoteIconSize.Desktop && quoteIconSizeUnits.Desktop ? `height: ${quoteIconSize.Desktop}${quoteIconSizeUnits.Desktop};` : ""}
            transition: fill 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }

        .${blockId} .gslider-testimonial-quote-icon-wrapper svg {
            ${quoteIconAlign === "icon" && quoteIconColor ? `fill: ${quoteIconColor};` : ""}
        }

        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-quote-icon-wrapper svg {
            ${quoteIconAlign === "icon" && quoteIconHoverColor ? `fill: ${quoteIconHoverColor};` : ""}
        }
        /** End Quote Icon Style */

        /** Start Rating Style */
        .${blockId} .gslider-testimonial-rating-wrapper {
            ${ratingDesktopMarginCssStyle ? `margin: ${ratingDesktopMarginCssStyle};` : ""}
            ${ratingDesktopPaddingCssStyle ? `padding: ${ratingDesktopPaddingCssStyle};` : ""}
        }
        .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-inner {
            display: flex;
            align-items: center;
            justify-content: ${contentHorizontalAlignment.Desktop === "left" ? "flex-start" : contentHorizontalAlignment.Desktop === "right" ? "flex-end" : "center"};
            gap: ${ratingNumberGap.Desktop}${ratingNumberGapUnits.Desktop};
        }
        .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: ${ratingStarGap.Desktop ? `${ratingStarGap.Desktop}${ratingStarGapUnits?.Desktop || "px"}` : "5px"};
        }
        .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon svg {
            ${ratingStarSize.Desktop ? `width: ${ratingStarSize.Desktop}${ratingStarSizeUnits.Desktop};` : ""}
            ${ratingStarSize.Desktop ? `height: ${ratingStarSize.Desktop}${ratingStarSizeUnits.Desktop};` : ""}
            fill: ${ratingStarColor};
            transition: fill .3s ease-in-out;
        }
        .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon.empty svg,
        .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-star-partial-container > svg {
            fill: ${ratingEmptyStarColor};
            transition: fill .3s ease-in-out;
        }
        .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-star-partial-fill svg {
            ${ratingStarSize.Desktop ? `min-width: ${ratingStarSize.Desktop}${ratingStarSizeUnits.Desktop};` : ""}
            ${ratingStarSize.Desktop ? `width: ${ratingStarSize.Desktop}${ratingStarSizeUnits.Desktop};` : ""}
        }
        
        /* Star Hover Color */
        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon svg {
            fill: ${ratingStarHoverColor || ratingStarColor};
        }
        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon.empty svg,
        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-rating-wrapper .gslider-testimonial-star-partial-container > svg {
            fill: ${ratingEmptyStarHoverColor || ratingEmptyStarColor};
        }
        .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-number {
            ${ratingNumberColor ? `color: ${ratingNumberColor};` : ""}
            ${ratingNumberFontFamily ? `font-family: ${ratingNumberFontFamily};` : ""}
            ${ratingNumberFontSize.Desktop && ratingNumberFontSizeUnits.Desktop ? `font-size: ${ratingNumberFontSize.Desktop}${ratingNumberFontSizeUnits.Desktop};` : ""}
            ${ratingNumberFontWeight ? `font-weight: ${ratingNumberFontWeight};` : ""}
            ${ratingNumberFontStyle ? `font-style: ${ratingNumberFontStyle};` : ""}
            ${ratingNumberTextTransform ? `text-transform: ${ratingNumberTextTransform};` : ""}
            ${ratingNumberTextDecoration ? `text-decoration: ${ratingNumberTextDecoration};` : ""}
            ${ratingNumberLineHeight.Desktop && ratingNumberLineHeightUnits.Desktop ? `line-height: ${ratingNumberLineHeight.Desktop}${ratingNumberLineHeightUnits.Desktop};` : ""}
            ${ratingNumberLetterSpacing.Desktop && ratingNumberLetterSpacingUnits.Desktop ? `letter-spacing: ${ratingNumberLetterSpacing.Desktop}${ratingNumberLetterSpacingUnits.Desktop};` : ""}
            ${ratingNumberWordSpacing.Desktop && ratingNumberWordSpacingUnits.Desktop ? `word-spacing: ${ratingNumberWordSpacing.Desktop}${ratingNumberWordSpacingUnits.Desktop};` : ""}
            transition: color .3s ease-in-out;
        }
        /* Rating Number Hover Color */
        .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-number {
            ${ratingNumberHoverColor ? `color: ${ratingNumberHoverColor};` : ""}
        }
        /** End Rating Style */

        .${blockId}.gslider-testimonial-wrapper.outside {
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
                background: ${navigationArrowNormalCustomGradientSwitcher && navigationArrowNormalCustomGradientInputValue ? navigationArrowNormalCustomGradientInputValue : navigationArrowNormalGradientColor ? navigationArrowNormalGradientColor : navigationArrowNormalClassicColor};
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
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            line-height: 1;
            cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            transition: color .3s ease-in-out, background-color .3s ease-in-out, border-color .3s ease-in-out, box-shadow .3s ease-in-out, transform .3s ease-in-out;
        }
        .${blockId} .swiper-button-prev:focus-visible,
        .${blockId} .swiper-button-next:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }
        .${blockId} .swiper-button-prev.swiper-button-disabled,
        .${blockId} .swiper-button-next.swiper-button-disabled {
            cursor: default;
            opacity: 0.45;
        }
        .${blockId}.gslider-testimonial-wrapper:hover .swiper-button-prev,
        .${blockId}.gslider-testimonial-wrapper:hover .swiper-button-next {
            ${navigationArrowColorHover ? `color: ${navigationArrowColorHover};` : ""}
            ${navigationArrowHoverBackgroundType === "gradient" ? `
                background: ${navigationArrowHoverCustomGradientSwitcher && navigationArrowHoverCustomGradientInputValue ? navigationArrowHoverCustomGradientInputValue : navigationArrowHoverGradientColor ? navigationArrowHoverGradientColor : navigationArrowHoverClassicColor};
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

        .${blockId}.gslider-testimonial-wrapper:hover .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
        .${blockId}.gslider-testimonial-wrapper:hover .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
            ${navigationArrowColorHover ? `fill: ${navigationArrowColorHover};` : ""}
        }

        .${blockId} .swiper-button-prev:after,
        .${blockId} .swiper-button-next:after {
            ${navigationArrowSize.Desktop ? `font-size: ${navigationArrowSize.Desktop}${navigationArrowSizeUnits.Desktop};` : ""}
        }

        .${blockId} .swiper-pagination {
            ${paginationType === "progressbar" ? paginationProgressbarPosition.Desktop ? `top: ${paginationProgressbarPosition.Desktop}${paginationProgressbarPositionUnits.Desktop} !important;` : "" : paginationDotsPosition.Desktop ? `bottom: ${paginationDotsPosition.Desktop}${paginationDotsPositionUnits.Desktop} !important;` : ""}
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

        .${blockId}.gslider-testimonial-wrapper:hover .swiper-pagination-fraction {
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
            .${blockId}.gslider-testimonial-wrapper .swiper-horizontal>.swiper-pagination-bullets,
            .${blockId}.gslider-testimonial-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
            .${blockId}.gslider-testimonial-wrapper .swiper-pagination-custom,
            .${blockId}.gslider-testimonial-wrapper .swiper-pagination-fraction {
                bottom: -${paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"} !important;
            }
        ` : ""}

        ${paginationPositionType === "outside" && showPagination?.Desktop ? `
        .${blockId}.gslider-testimonial-wrapper.has-pagination {
            margin-bottom: ${paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"};
        }
        ` : ""}

        @media only screen and (max-width: 1024px) {

            .${blockId}.gslider-testimonial-wrapper {
                ${globalTabletBackgroundNormalStyles}
                ${globalMarginTabletCssStyle ? `margin: ${globalMarginTabletCssStyle};` : ""} 
                ${globalPaddingTabletCssStyle ? `padding: ${globalPaddingTabletCssStyle};` : ""}
                ${globalBorderTabletCssStyle ? `border-width: ${globalBorderTabletCssStyle};` : ""}  
                ${globalBorderRadiusTabletCssStyle ? `border-radius: ${globalBorderRadiusTabletCssStyle};` : ""}
                ${globalZIndex.Tablet ? `z-index: ${globalZIndex.Tablet};` : ""}
            }
            .${blockId}.gslider-testimonial-wrapper:hover { 
                ${globalTabletBackgroundHoverStyles}
            }

            .${blockId} .swiper-wrapper {
                ${layoutHeight.Tablet && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Tablet}${layoutHeightUnits.Tablet};` : "auto"}
            }

            .${blockId} .swiper-slide{
                ${layoutHeight.Tablet && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Tablet}${layoutHeightUnits.Tablet};` : "auto"}
            }
            
            .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper {
                ${contentVerticalAlignment?.Tablet ? `justify-content: ${contentVerticalAlignment.Tablet};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${contentWidth?.Tablet ? `max-width: ${contentWidth.Tablet}${contentWidthUnits?.Tablet};` : ""}
                ${contentAlignment?.Tablet ? `text-align: ${contentAlignment.Tablet};` : ""}
                ${contentHorizontalAlignment?.Tablet ? `align-items: ${contentHorizontalAlignment.Tablet === "left" ? "flex-start" : contentHorizontalAlignment.Tablet === "right" ? "flex-end" : "center"};` : ""}

                ${contentHorizontalAlignment?.Tablet === "left" ? `margin-right: auto; margin-left: 0;` : ""}
                ${contentHorizontalAlignment?.Tablet === "center" ? `margin-left: auto; margin-right: auto;` : ""}
                ${contentHorizontalAlignment?.Tablet === "right" ? `margin-left: auto; margin-right: 0;` : ""}
                ${contentPaddingTabletCssStyle ? `padding: ${contentPaddingTabletCssStyle};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-testimonial-content-group,
            .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group {
                ${contentHorizontalAlignment?.Tablet ? `align-items: ${contentHorizontalAlignment.Tablet === "left" ? "flex-start" : contentHorizontalAlignment.Tablet === "right" ? "flex-end" : "center"};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group .gslider-author-meta {
                ${contentAlignment?.Tablet ? `text-align: ${contentAlignment.Tablet};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-author-name-wrapper .gslider-testimonial-author-name {
                ${authorNameFontSize.Tablet && authorNameFontSizeUnits.Tablet ? `font-size: ${authorNameFontSize.Tablet}${authorNameFontSizeUnits.Tablet};` : ""}
                ${authorNameLineHeight.Tablet && authorNameLineHeightUnits.Tablet ? `line-height: ${authorNameLineHeight.Tablet}${authorNameLineHeightUnits.Tablet};` : ""}
                ${authorNameLetterSpacing.Tablet && authorNameLetterSpacingUnits.Tablet ? `letter-spacing: ${authorNameLetterSpacing.Tablet}${authorNameLetterSpacingUnits.Tablet};` : ""}
                ${authorNameWordSpacing.Tablet && authorNameWordSpacingUnits.Tablet ? `word-spacing: ${authorNameWordSpacing.Tablet}${authorNameWordSpacingUnits.Tablet};` : ""}
                ${authorNameTabletMarginCssStyle ? `margin: ${authorNameTabletMarginCssStyle};` : ""} 
                ${authorNameTabletPaddingCssStyle ? `padding: ${authorNameTabletPaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-title-wrapper .gslider-testimonial-title {
                ${testimonialTitleFontSize.Tablet && testimonialTitleFontSizeUnits.Tablet ? `font-size: ${testimonialTitleFontSize.Tablet}${testimonialTitleFontSizeUnits.Tablet};` : ""}
                ${testimonialTitleLineHeight.Tablet && testimonialTitleLineHeightUnits.Tablet ? `line-height: ${testimonialTitleLineHeight.Tablet}${testimonialTitleLineHeightUnits.Tablet};` : ""}
                ${testimonialTitleLetterSpacing.Tablet && testimonialTitleLetterSpacingUnits.Tablet ? `letter-spacing: ${testimonialTitleLetterSpacing.Tablet}${testimonialTitleLetterSpacingUnits.Tablet};` : ""}
                ${testimonialTitleWordSpacing.Tablet && testimonialTitleWordSpacingUnits.Tablet ? `word-spacing: ${testimonialTitleWordSpacing.Tablet}${testimonialTitleWordSpacingUnits.Tablet};` : ""}
                ${testimonialTitleTabletMarginCssStyle ? `margin: ${testimonialTitleTabletMarginCssStyle};` : ""}
                ${testimonialTitleTabletPaddingCssStyle ? `padding: ${testimonialTitleTabletPaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-author-designation-wrapper .gslider-testimonial-author-designation {
                ${authorDesignationFontSize.Tablet && authorDesignationFontSizeUnits.Tablet ? `font-size: ${authorDesignationFontSize.Tablet}${authorDesignationFontSizeUnits.Tablet};` : ""}
                ${authorDesignationLineHeight.Tablet && authorDesignationLineHeightUnits.Tablet ? `line-height: ${authorDesignationLineHeight.Tablet}${authorDesignationLineHeightUnits.Tablet};` : ""}
                ${authorDesignationLetterSpacing.Tablet && authorDesignationLetterSpacingUnits.Tablet ? `letter-spacing: ${authorDesignationLetterSpacing.Tablet}${authorDesignationLetterSpacingUnits.Tablet};` : ""}
                ${authorDesignationWordSpacing.Tablet && authorDesignationWordSpacingUnits.Tablet ? `word-spacing: ${authorDesignationWordSpacing.Tablet}${authorDesignationWordSpacingUnits.Tablet};` : ""}
                ${authorDesignationTabletMarginCssStyle ? `margin: ${authorDesignationTabletMarginCssStyle};` : ""} 
                ${authorDesignationTabletPaddingCssStyle ? `padding: ${authorDesignationTabletPaddingCssStyle};` : ""}
            }
            
            /** Start Quote Icon Style */
            .${blockId} .gslider-testimonial-quote-icon-wrapper {
                ${quoteIconTabletMarginCssStyle ? `margin: ${quoteIconTabletMarginCssStyle};` : ""}
                ${quoteIconTabletPaddingCssStyle ? `padding: ${quoteIconTabletPaddingCssStyle};` : ""}
                
                ${quoteIconTabletBorderCssStyle ? `border-width: ${quoteIconTabletBorderCssStyle};` : ""}
                ${quoteIconTabletBorderRadiusCssStyle ? `border-radius: ${quoteIconTabletBorderRadiusCssStyle};` : ""}
                ${quoteIconOpacity.Tablet ? `opacity: ${quoteIconOpacity.Tablet};` : ""}
                ${quoteIconRotate.Tablet ? `transform: rotate(${quoteIconRotate.Tablet}deg);` : ""}
                ${quoteIconZIndex.Tablet ? `z-index: ${quoteIconZIndex.Tablet};` : ""}
                ${quoteIconPositionSwitcher ? `
                    position: absolute;
                    ${quoteIconPositionTop.Tablet ? `top: ${quoteIconPositionTop.Tablet}${quoteIconPositionTopUnits.Tablet};` : ""}
                    ${quoteIconPositionBottom.Tablet ? `bottom: ${quoteIconPositionBottom.Tablet}${quoteIconPositionBottomUnits.Tablet};` : ""}
                    ${quoteIconPositionLeft.Tablet ? `left: ${quoteIconPositionLeft.Tablet}${quoteIconPositionLeftUnits.Tablet};` : ""}
                    ${quoteIconPositionRight.Tablet ? `right: ${quoteIconPositionRight.Tablet}${quoteIconPositionRightUnits.Tablet};` : ""}
                ` : "position: relative;"}
            }

            ${quoteIconHoverRotate.Tablet ? `
                .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-quote-icon-wrapper {
                    transform: rotate(${quoteIconHoverRotate.Tablet}deg);
                }
            ` : ""}
            .${blockId} .gslider-testimonial-quote-icon-wrapper svg,
            .${blockId} .gslider-testimonial-quote-icon-wrapper img {
                ${quoteIconSize.Tablet && quoteIconSizeUnits.Tablet ? `width: ${quoteIconSize.Tablet}${quoteIconSizeUnits.Tablet};` : ""}
                ${quoteIconSize.Tablet && quoteIconSizeUnits.Tablet ? `height: ${quoteIconSize.Tablet}${quoteIconSizeUnits.Tablet};` : ""}
            }
            /** End Quote Icon Style */

            .${blockId} .gslider-testimonial-author-image-wrapper .gslider-testimonial-author-image {
                ${authorImageSize?.Tablet ? `width: ${authorImageSize.Tablet}${authorImageSizeUnits?.Tablet || "px"};` : ""}
                ${authorImageSize?.Tablet ? `height: ${authorImageSize.Tablet}${authorImageSizeUnits?.Tablet || "px"};` : ""}
                ${authorImageTabletBorderWidthCssStyle ? `border-width: ${authorImageTabletBorderWidthCssStyle};` : ""}
                ${authorImageTabletBorderRadiusCssStyle ? `border-radius: ${authorImageTabletBorderRadiusCssStyle};` : ""}
                ${authorImageTabletMarginCssStyle ? `margin: ${authorImageTabletMarginCssStyle};` : ""}
                ${authorImageTabletPaddingCssStyle ? `padding: ${authorImageTabletPaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-text-wrapper .gslider-testimonial-text {
                ${testimonialTextFontSize.Tablet && testimonialTextFontSizeUnits.Tablet ? `font-size: ${testimonialTextFontSize.Tablet}${testimonialTextFontSizeUnits.Tablet};` : ""}
                ${testimonialTextLineHeight.Tablet && testimonialTextLineHeightUnits.Tablet ? `line-height: ${testimonialTextLineHeight.Tablet}${testimonialTextLineHeightUnits.Tablet};` : ""}
                ${testimonialTextLetterSpacing.Tablet && testimonialTextLetterSpacingUnits.Tablet ? `letter-spacing: ${testimonialTextLetterSpacing.Tablet}${testimonialTextLetterSpacingUnits.Tablet};` : ""}
                ${testimonialTextWordSpacing.Tablet && testimonialTextWordSpacingUnits.Tablet ? `word-spacing: ${testimonialTextWordSpacing.Tablet}${testimonialTextWordSpacingUnits.Tablet};` : ""}
                ${testimonialTextTabletMarginCssStyle ? `margin: ${testimonialTextTabletMarginCssStyle};` : ""} 
                ${testimonialTextTabletPaddingCssStyle ? `padding: ${testimonialTextTabletPaddingCssStyle};` : ""}
            }

            .${blockId} .gslider-testimonial-rating-wrapper {
                ${ratingTabletMarginCssStyle ? `margin: ${ratingTabletMarginCssStyle};` : ""}
                ${ratingTabletPaddingCssStyle ? `padding: ${ratingTabletPaddingCssStyle};` : ""}
            }
            .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-inner {
                justify-content: ${contentHorizontalAlignment.Tablet === "left" ? "flex-start" : contentHorizontalAlignment.Tablet === "right" ? "flex-end" : "center"};
                gap: ${ratingNumberGap.Tablet ? `${ratingNumberGap.Tablet}${ratingNumberGapUnits.Tablet}` : "10px"};
            }
            .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-inner .gslider-testimonial-rating-wrap {
                gap: ${ratingStarGap.Tablet ? `${ratingStarGap.Tablet}${ratingStarGapUnits?.Tablet || "px"}` : "5px"};
            }
            .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon svg {
                ${ratingStarSize.Tablet ? `width: ${ratingStarSize.Tablet}${ratingStarSizeUnits.Tablet};` : ""}
                ${ratingStarSize.Tablet ? `height: ${ratingStarSize.Tablet}${ratingStarSizeUnits.Tablet};` : ""}
            }
            .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-star-partial-fill svg {
                ${ratingStarSize.Tablet ? `min-width: ${ratingStarSize.Tablet}${ratingStarSizeUnits.Tablet};` : ""}
                ${ratingStarSize.Tablet ? `width: ${ratingStarSize.Tablet}${ratingStarSizeUnits.Tablet};` : ""}
            }
            .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-number {
                ${ratingNumberFontSize.Tablet && ratingNumberFontSizeUnits.Tablet ? `font-size: ${ratingNumberFontSize.Tablet}${ratingNumberFontSizeUnits.Tablet};` : ""}
                ${ratingNumberLineHeight.Tablet && ratingNumberLineHeightUnits.Tablet ? `line-height: ${ratingNumberLineHeight.Tablet}${ratingNumberLineHeightUnits.Tablet};` : ""}
                ${ratingNumberLetterSpacing.Tablet && ratingNumberLetterSpacingUnits.Tablet ? `letter-spacing: ${ratingNumberLetterSpacing.Tablet}${ratingNumberLetterSpacingUnits.Tablet};` : ""}
                ${ratingNumberWordSpacing.Tablet && ratingNumberWordSpacingUnits.Tablet ? `word-spacing: ${ratingNumberWordSpacing.Tablet}${ratingNumberWordSpacingUnits.Tablet};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper.outside {
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
                ${paginationType === "progressbar" ? paginationProgressbarPosition.Tablet ? `top: ${paginationProgressbarPosition.Tablet}${paginationProgressbarPositionUnits.Tablet} !important;` : "" : paginationDotsPosition.Tablet ? `bottom: ${paginationDotsPosition.Tablet}${paginationDotsPositionUnits.Tablet} !important;` : ""}
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
                .${blockId}.gslider-testimonial-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${blockId}.gslider-testimonial-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${blockId}.gslider-testimonial-wrapper .swiper-pagination-custom,
                .${blockId}.gslider-testimonial-wrapper .swiper-pagination-fraction {
                    bottom: -${paginationOutsideOffset?.Tablet ? `${paginationOutsideOffset.Tablet}${paginationOutsideOffsetUnits?.Tablet || "px"}` : paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"} !important;
                }
            ` : ""}

            ${paginationPositionType === "outside" ? `
                ${showPagination?.Tablet ? `
                    .${blockId}.gslider-testimonial-wrapper.has-pagination {
                        margin-bottom: ${paginationOutsideOffset?.Tablet ? `${paginationOutsideOffset.Tablet}${paginationOutsideOffsetUnits?.Tablet || "px"}` : paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"};
                    }
                ` : showPagination?.Desktop ? `
                    .${blockId}.gslider-testimonial-wrapper.has-pagination {
                        margin-bottom: 0;
                    }
                ` : ""}
            ` : ""}
        }
        
        @media only screen and (max-width: 767px) {

            .${blockId}.gslider-testimonial-wrapper {
                ${globalMobileBackgroundNormalStyles}
                ${globalMarginMobileCssStyle ? `margin: ${globalMarginMobileCssStyle};` : ""} 
                ${globalPaddingMobileCssStyle ? `padding: ${globalPaddingMobileCssStyle};` : ""}
                ${globalBorderMobileCssStyle ? `border-width: ${globalBorderMobileCssStyle};` : ""}  
                ${globalBorderRadiusMobileCssStyle ? `border-radius: ${globalBorderRadiusMobileCssStyle};` : ""}
                ${globalZIndex.Mobile ? `z-index: ${globalZIndex.Mobile};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper:hover { 
                ${globalMobileBackgroundHoverStyles}
            }

            .${blockId} .swiper-wrapper {
                ${layoutHeight.Mobile && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Mobile}${layoutHeightUnits.Mobile};` : "auto"}
            }

            .${blockId} .swiper-slide{
                ${layoutHeight.Mobile && layoutHeightSwitcher === "fixed" ? `min-height: ${layoutHeight.Mobile}${layoutHeightUnits.Mobile};` : "auto"}
            }
            
            .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper {
                ${contentVerticalAlignment?.Mobile ? `justify-content: ${contentVerticalAlignment.Mobile};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper {
                ${contentWidth?.Mobile ? `max-width: ${contentWidth.Mobile}${contentWidthUnits?.Mobile};` : ""}
                ${contentAlignment?.Mobile ? `text-align: ${contentAlignment.Mobile};` : ""}
                ${contentHorizontalAlignment?.Mobile ? `align-items: ${contentHorizontalAlignment.Mobile === "left" ? "flex-start" : contentHorizontalAlignment.Mobile === "right" ? "flex-end" : "center"};` : ""}

                ${contentHorizontalAlignment?.Mobile === "left" ? `margin-right: auto; margin-left: 0;` : ""}
                ${contentHorizontalAlignment?.Mobile === "center" ? `margin-left: auto; margin-right: auto;` : ""}
                ${contentHorizontalAlignment?.Mobile === "right" ? `margin-left: auto; margin-right: 0;` : ""}
                ${contentPaddingMobileCssStyle ? `padding: ${contentPaddingMobileCssStyle};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-testimonial-content-group,
            .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group {
                ${contentHorizontalAlignment?.Mobile ? `align-items: ${contentHorizontalAlignment.Mobile === "left" ? "flex-start" : contentHorizontalAlignment.Mobile === "right" ? "flex-end" : "center"};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-content-wrapper .gslider-content-inner-wrapper .gslider-author-info-group .gslider-author-meta {
                ${contentAlignment?.Mobile ? `text-align: ${contentAlignment.Mobile};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-author-name-wrapper .gslider-testimonial-author-name {
                ${authorNameFontSize.Mobile && authorNameFontSizeUnits.Mobile ? `font-size: ${authorNameFontSize.Mobile}${authorNameFontSizeUnits.Mobile};` : ""}
                ${authorNameLineHeight.Mobile && authorNameLineHeightUnits.Mobile ? `line-height: ${authorNameLineHeight.Mobile}${authorNameLineHeightUnits.Mobile};` : ""}
                ${authorNameLetterSpacing.Mobile && authorNameLetterSpacingUnits.Mobile ? `letter-spacing: ${authorNameLetterSpacing.Mobile}${authorNameLetterSpacingUnits.Mobile};` : ""}
                ${authorNameWordSpacing.Mobile && authorNameWordSpacingUnits.Mobile ? `word-spacing: ${authorNameWordSpacing.Mobile}${authorNameWordSpacingUnits.Mobile};` : ""}
                ${authorNameMobileMarginCssStyle ? `margin: ${authorNameMobileMarginCssStyle};` : ""} 
                ${authorNameMobilePaddingCssStyle ? `padding: ${authorNameMobilePaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-title-wrapper .gslider-testimonial-title {
                ${testimonialTitleFontSize.Mobile && testimonialTitleFontSizeUnits.Mobile ? `font-size: ${testimonialTitleFontSize.Mobile}${testimonialTitleFontSizeUnits.Mobile};` : ""}
                ${testimonialTitleLineHeight.Mobile && testimonialTitleLineHeightUnits.Mobile ? `line-height: ${testimonialTitleLineHeight.Mobile}${testimonialTitleLineHeightUnits.Mobile};` : ""}
                ${testimonialTitleLetterSpacing.Mobile && testimonialTitleLetterSpacingUnits.Mobile ? `letter-spacing: ${testimonialTitleLetterSpacing.Mobile}${testimonialTitleLetterSpacingUnits.Mobile};` : ""}
                ${testimonialTitleWordSpacing.Mobile && testimonialTitleWordSpacingUnits.Mobile ? `word-spacing: ${testimonialTitleWordSpacing.Mobile}${testimonialTitleWordSpacingUnits.Mobile};` : ""}
                ${testimonialTitleMobileMarginCssStyle ? `margin: ${testimonialTitleMobileMarginCssStyle};` : ""}
                ${testimonialTitleMobilePaddingCssStyle ? `padding: ${testimonialTitleMobilePaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-author-designation-wrapper .gslider-testimonial-author-designation {
                ${authorDesignationFontSize.Mobile && authorDesignationFontSizeUnits.Mobile ? `font-size: ${authorDesignationFontSize.Mobile}${authorDesignationFontSizeUnits.Mobile};` : ""}
                ${authorDesignationLineHeight.Mobile && authorDesignationLineHeightUnits.Mobile ? `line-height: ${authorDesignationLineHeight.Mobile}${authorDesignationLineHeightUnits.Mobile};` : ""}
                ${authorDesignationLetterSpacing.Mobile && authorDesignationLetterSpacingUnits.Mobile ? `letter-spacing: ${authorDesignationLetterSpacing.Mobile}${authorDesignationLetterSpacingUnits.Mobile};` : ""}
                ${authorDesignationWordSpacing.Mobile && authorDesignationWordSpacingUnits.Mobile ? `word-spacing: ${authorDesignationWordSpacing.Mobile}${authorDesignationWordSpacingUnits.Mobile};` : ""}
                ${authorDesignationMobileMarginCssStyle ? `margin: ${authorDesignationMobileMarginCssStyle};` : ""} 
                ${authorDesignationMobilePaddingCssStyle ? `padding: ${authorDesignationMobilePaddingCssStyle};` : ""}
            }
            
            /** Start Quote Icon Style */
            .${blockId} .gslider-testimonial-quote-icon-wrapper {
                ${quoteIconMobileMarginCssStyle ? `margin: ${quoteIconMobileMarginCssStyle};` : ""}
                ${quoteIconMobilePaddingCssStyle ? `padding: ${quoteIconMobilePaddingCssStyle};` : ""}

                ${quoteIconMobileBorderCssStyle ? `border-width: ${quoteIconMobileBorderCssStyle};` : ""}
                ${quoteIconMobileBorderRadiusCssStyle ? `border-radius: ${quoteIconMobileBorderRadiusCssStyle};` : ""}
                ${quoteIconOpacity.Mobile ? `opacity: ${quoteIconOpacity.Mobile};` : ""}
                ${quoteIconRotate.Mobile ? `transform: rotate(${quoteIconRotate.Mobile}deg);` : ""}
                ${quoteIconZIndex.Mobile ? `z-index: ${quoteIconZIndex.Mobile};` : ""}
                ${quoteIconPositionSwitcher ? `
                    position: absolute;
                    ${quoteIconPositionTop.Mobile ? `top: ${quoteIconPositionTop.Mobile}${quoteIconPositionTopUnits.Mobile};` : ""}
                    ${quoteIconPositionBottom.Mobile ? `bottom: ${quoteIconPositionBottom.Mobile}${quoteIconPositionBottomUnits.Mobile};` : ""}
                    ${quoteIconPositionLeft.Mobile ? `left: ${quoteIconPositionLeft.Mobile}${quoteIconPositionLeftUnits.Mobile};` : ""}
                    ${quoteIconPositionRight.Mobile ? `right: ${quoteIconPositionRight.Mobile}${quoteIconPositionRightUnits.Mobile};` : ""}
                ` : "position: relative;"}
            }

            ${quoteIconHoverRotate.Mobile ? `
                .${blockId}.gslider-testimonial-wrapper:hover .gslider-testimonial-quote-icon-wrapper {
                    transform: rotate(${quoteIconHoverRotate.Mobile}deg);
                }
            ` : ""}
            .${blockId} .gslider-testimonial-quote-icon-wrapper svg,
            .${blockId} .gslider-testimonial-quote-icon-wrapper img {
                ${quoteIconSize.Mobile && quoteIconSizeUnits.Mobile ? `width: ${quoteIconSize.Mobile}${quoteIconSizeUnits.Mobile};` : ""}
                ${quoteIconSize.Mobile && quoteIconSizeUnits.Mobile ? `height: ${quoteIconSize.Mobile}${quoteIconSizeUnits.Mobile};` : ""}
            }
            /** End Quote Icon Style */

            .${blockId} .gslider-testimonial-author-image-wrapper .gslider-testimonial-author-image {
                ${authorImageSize?.Mobile ? `width: ${authorImageSize.Mobile}${authorImageSizeUnits?.Mobile || "px"};` : ""}
                ${authorImageSize?.Mobile ? `height: ${authorImageSize.Mobile}${authorImageSizeUnits?.Mobile || "px"};` : ""}
                ${authorImageMobileBorderWidthCssStyle ? `border-width: ${authorImageMobileBorderWidthCssStyle};` : ""}
                ${authorImageMobileBorderRadiusCssStyle ? `border-radius: ${authorImageMobileBorderRadiusCssStyle};` : ""}
                ${authorImageMobileMarginCssStyle ? `margin: ${authorImageMobileMarginCssStyle};` : ""}
                ${authorImageMobilePaddingCssStyle ? `padding: ${authorImageMobilePaddingCssStyle};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper .gslider-testimonial-text-wrapper .gslider-testimonial-text {
                ${testimonialTextFontSize.Mobile && testimonialTextFontSizeUnits.Mobile ? `font-size: ${testimonialTextFontSize.Mobile}${testimonialTextFontSizeUnits.Mobile};` : ""}
                ${testimonialTextLineHeight.Mobile && testimonialTextLineHeightUnits.Mobile ? `line-height: ${testimonialTextLineHeight.Mobile}${testimonialTextLineHeightUnits.Mobile};` : ""}
                ${testimonialTextLetterSpacing.Mobile && testimonialTextLetterSpacingUnits.Mobile ? `letter-spacing: ${testimonialTextLetterSpacing.Mobile}${testimonialTextLetterSpacingUnits.Mobile};` : ""}
                ${testimonialTextWordSpacing.Mobile && testimonialTextWordSpacingUnits.Mobile ? `word-spacing: ${testimonialTextWordSpacing.Mobile}${testimonialTextWordSpacingUnits.Mobile};` : ""}
                ${testimonialTextMobileMarginCssStyle ? `margin: ${testimonialTextMobileMarginCssStyle};` : ""} 
                ${testimonialTextMobilePaddingCssStyle ? `padding: ${testimonialTextMobilePaddingCssStyle};` : ""}
            }

            .${blockId} .gslider-testimonial-rating-wrapper {
                ${ratingMobileMarginCssStyle ? `margin: ${ratingMobileMarginCssStyle};` : ""}
                ${ratingMobilePaddingCssStyle ? `padding: ${ratingMobilePaddingCssStyle};` : ""}
            }
            .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-inner {
                justify-content: ${contentHorizontalAlignment.Mobile === "left" ? "flex-start" : contentHorizontalAlignment.Mobile === "right" ? "flex-end" : "center"};
                gap: ${ratingNumberGap.Mobile ? `${ratingNumberGap.Mobile}${ratingNumberGapUnits.Mobile}` : "10px"};
            }
            .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-wrap {
                gap: ${ratingStarGap.Mobile ? `${ratingStarGap.Mobile}${ratingStarGapUnits?.Mobile || "px"}` : "5px"};
            }
            .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-icon svg {
                ${ratingStarSize.Mobile ? `width: ${ratingStarSize.Mobile}${ratingStarSizeUnits.Mobile};` : ""}
                ${ratingStarSize.Mobile ? `height: ${ratingStarSize.Mobile}${ratingStarSizeUnits.Mobile};` : ""}
            }
            .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-star-partial-fill svg {
                ${ratingStarSize.Mobile ? `min-width: ${ratingStarSize.Mobile}${ratingStarSizeUnits.Mobile};` : ""}
                ${ratingStarSize.Mobile ? `width: ${ratingStarSize.Mobile}${ratingStarSizeUnits.Mobile};` : ""}
            }
            .${blockId} .gslider-testimonial-rating-wrapper .gslider-testimonial-rating-number {
                ${ratingNumberFontSize.Mobile && ratingNumberFontSizeUnits.Mobile ? `font-size: ${ratingNumberFontSize.Mobile}${ratingNumberFontSizeUnits.Mobile};` : ""}
                ${ratingNumberLineHeight.Mobile && ratingNumberLineHeightUnits.Mobile ? `line-height: ${ratingNumberLineHeight.Mobile}${ratingNumberLineHeightUnits.Mobile};` : ""}
                ${ratingNumberLetterSpacing.Mobile && ratingNumberLetterSpacingUnits.Mobile ? `letter-spacing: ${ratingNumberLetterSpacing.Mobile}${ratingNumberLetterSpacingUnits.Mobile};` : ""}
                ${ratingNumberWordSpacing.Mobile && ratingNumberWordSpacingUnits.Mobile ? `word-spacing: ${ratingNumberWordSpacing.Mobile}${ratingNumberWordSpacingUnits.Mobile};` : ""}
            }

            .${blockId}.gslider-testimonial-wrapper.outside {
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
                ${paginationType === "progressbar" ? paginationProgressbarPosition.Mobile ? `top: ${paginationProgressbarPosition.Mobile}${paginationProgressbarPositionUnits.Mobile} !important;` : "" : paginationDotsPosition.Mobile ? `bottom: ${paginationDotsPosition.Mobile}${paginationDotsPositionUnits.Mobile} !important;` : ""}
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
                .${blockId}.gslider-testimonial-wrapper .swiper-horizontal>.swiper-pagination-bullets,
                .${blockId}.gslider-testimonial-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
                .${blockId}.gslider-testimonial-wrapper .swiper-pagination-custom,
                .${blockId}.gslider-testimonial-wrapper .swiper-pagination-fraction {
                    bottom: -${paginationOutsideOffset?.Mobile ? `${paginationOutsideOffset.Mobile}${paginationOutsideOffsetUnits?.Mobile || "px"}` : paginationOutsideOffset?.Tablet ? `${paginationOutsideOffset.Tablet}${paginationOutsideOffsetUnits?.Tablet || "px"}` : paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"} !important;
                }
            ` : ""}

            ${paginationPositionType === "outside" ? `
                ${showPagination?.Mobile ? `
                    .${blockId}.gslider-testimonial-wrapper.has-pagination {
                        margin-bottom: ${paginationOutsideOffset?.Mobile ? `${paginationOutsideOffset.Mobile}${paginationOutsideOffsetUnits?.Mobile || "px"}` : paginationOutsideOffset?.Tablet ? `${paginationOutsideOffset.Tablet}${paginationOutsideOffsetUnits?.Tablet || "px"}` : paginationOutsideOffset?.Desktop ? `${paginationOutsideOffset.Desktop}${paginationOutsideOffsetUnits?.Desktop || "px"}` : "30px"};
                    }
                ` : showPagination?.Desktop || showPagination?.Tablet ? `
                    .${blockId}.gslider-testimonial-wrapper.has-pagination {
                        margin-bottom: 0;
                    }
                ` : ""}
            ` : ""}
        }
    `;
  return `${baseSliderCSS} ${sliderItemColorStyle}`.replace(/\s+/g, " ").trim();
};
var styling_default = generateBaseSliderStyle;

// ../../src/blocks/testimonial/deprecated.js
var import_block_editor2 = require("@wordpress/block-editor");
var import_jsx_runtime3 = require("react/jsx-runtime");
var v1_1_6 = {
  attributes: attributes_default,
  supports: {
    html: false,
    className: false
  },
  save({ attributes: attributes2 }) {
    const {
      blockId,
      authorPlaceholderUrl,
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
      showAuthorName,
      showAuthorDesignation,
      showTestimonialTitle,
      showTestimonialText,
      showAuthorImage,
      showRating,
      showRatingNumber,
      showQuoteIcon,
      quoteIconAlign,
      quoteIcon,
      quoteImageUrl,
      quoteImageAlt,
      showNavigation,
      showPagination,
      paginationPositionType,
      authorNameHtmlTag,
      authorDesignationHtmlTag,
      testimonialTitleHtmlTag,
      testimonialTextHtmlTag,
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
      layoutHeightSwitcher,
      contentOrder,
      presetStyle
    } = attributes2;
    const normalizedContentOrder = normalizeContentOrder(contentOrder);
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-testimonial-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? "has-pagination" : ""}`
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
        el: `.${blockId} .swiper-pagination-testimonial-slider`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    const authorImagePlaceholder = authorPlaceholderUrl;
    const renderRatingIcons = (item) => {
      const { ratingNumber, ratingIconAlign } = item;
      const ratingImageUrl = item.ratingImage?.url;
      const ratingImageAlt = item.ratingImage?.alt;
      const rating = Math.max(
        0,
        Math.min(5, parseFloat(ratingNumber || 0))
      );
      if (ratingIconAlign === "none" || rating === 0) {
        return null;
      }
      if (ratingIconAlign === "image" && ratingImageUrl) {
        const fullCount = Math.round(rating);
        const icons = [];
        for (let i = 0; i < fullCount; i++) {
          icons.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: ratingImageUrl,
                    alt: ratingImageAlt
                  }
                )
              },
              i
            )
          );
        }
        return icons;
      }
      if (ratingIconAlign === "icon") {
        const fullStars = Math.floor(rating);
        const fraction = rating - fullStars;
        const emptyStars = 5 - fullStars - (fraction > 0 ? 1 : 0);
        const fullStarPath = "M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Z";
        const emptyStarPath = "M49.62,18.85a1.9,1.9,0,0,0-1.54-1.29L33.4,15.38,26.84,1.63a1.92,1.92,0,0,0-3.47,0L16.86,15.34,2.13,17.56a1.92,1.92,0,0,0-1.08,3.25L11.73,31.53,9.21,46.73A1.93,1.93,0,0,0,11.1,49a2,2,0,0,0,.92-.23L25.07,41.6l13.11,7.14a1.93,1.93,0,0,0,2.82-2L38.46,31.6l10.7-10.79A1.92,1.92,0,0,0,49.62,18.85ZM37,30.19a1.94,1.94,0,0,0-.53,1.67L39,46.9l-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.5-15a1.94,1.94,0,0,0-.53-1.67L2.57,19.51l14.59-2.19a2,2,0,0,0,1.45-1.08L25.08,2.58,31.6,16.25a2,2,0,0,0,1.45,1.07l14.58,2.19Z";
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 49.23 48.44",
                    className: "gslider-testimonial-rating-star-svg",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "path",
                      {
                        d: fullStarPath,
                        transform: "translate(-0.39 -0.78)"
                      }
                    )
                  }
                )
              },
              `full-${i}`
            )
          );
        }
        if (fraction > 0) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon gslider-testimonial-star-partial-wrap",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-star-partial-container", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 49.23 48.44",
                      className: "gslider-testimonial-rating-star-svg",
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "path",
                        {
                          d: emptyStarPath,
                          transform: "translate(-0.49 -0.53)"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "div",
                    {
                      className: "gslider-testimonial-star-partial-fill",
                      style: { width: `${fraction * 100}%` },
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 49.23 48.44",
                          className: "gslider-testimonial-rating-star-svg",
                          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                            "path",
                            {
                              d: fullStarPath,
                              transform: "translate(-0.39 -0.78)"
                            }
                          )
                        }
                      )
                    }
                  )
                ] })
              },
              "partial"
            )
          );
        }
        for (let i = 0; i < emptyStars; i++) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon empty",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 49.23 48.44",
                    className: "gslider-testimonial-rating-star-svg",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "path",
                      {
                        d: emptyStarPath,
                        transform: "translate(-0.49 -0.53)"
                      }
                    )
                  }
                )
              },
              `empty-${i}`
            )
          );
        }
        return stars;
      }
      return null;
    };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => {
          const renderGroupMap = {
            quote: showQuoteIcon && quoteIconAlign !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-testimonial-quote-icon-wrapper",
                children: [
                  quoteIconAlign === "icon" && renderIcon_default(quoteIcon),
                  quoteIconAlign === "image" && quoteImageUrl && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: quoteImageUrl,
                      alt: quoteImageAlt
                    }
                  )
                ]
              },
              "quote"
            ) : null,
            content: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-testimonial-content-group",
                children: [
                  showTestimonialTitle && item.testimonialTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: testimonialTitleHtmlTag,
                      className: "gslider-testimonial-title",
                      value: item.testimonialTitle
                    }
                  ) }),
                  showTestimonialText && item.testimonialText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-text-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: testimonialTextHtmlTag,
                      className: "gslider-testimonial-text",
                      value: item.testimonialText
                    }
                  ) })
                ]
              },
              "content"
            ),
            rating: showRating ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-wrapper",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-rating-inner", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-rating-wrap", children: renderRatingIcons(item) }),
                  showRatingNumber && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-rating-number", children: [
                    "(",
                    Math.max(
                      0,
                      Math.min(
                        5,
                        parseFloat(
                          item.ratingNumber || 0
                        )
                      )
                    ),
                    ")"
                  ] })
                ] })
              },
              "rating"
            ) : null,
            author: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-author-info-group",
                children: [
                  showAuthorImage && (item.authorImage?.url || authorImagePlaceholder) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-image-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: item.authorImage?.url || authorImagePlaceholder,
                      alt: item.authorImage?.alt || "Author",
                      className: "gslider-testimonial-author-image"
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-author-meta", children: [
                    showAuthorName && item.authorName && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-name-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        tagName: authorNameHtmlTag,
                        className: "gslider-testimonial-author-name",
                        value: item.authorName
                      }
                    ) }),
                    showAuthorDesignation && item.authorDesignation && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-designation-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        tagName: authorDesignationHtmlTag,
                        className: "gslider-testimonial-author-designation",
                        value: item.authorDesignation
                      }
                    ) })
                  ] })
                ]
              },
              "author"
            )
          };
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                  ...globalID && { id: globalID },
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: normalizedContentOrder.map(
                    (groupKey) => renderGroupMap[groupKey] || null
                  ) })
                }
              )
            },
            item.id
          );
        }) }),
        anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
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
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                    navigationArrowsIconLeft
                  ) })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-next",
                  "aria-label": "Next slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                    navigationArrowsIconRight
                  ) })
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
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: "",
                      "aria-hidden": "true"
                    }
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-next",
                  "aria-label": "Next slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconRightImageUrl,
                      alt: "",
                      "aria-hidden": "true"
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
            className: "swiper-pagination swiper-pagination-testimonial-slider",
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
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
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
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(navigationArrowsIconLeft) })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-next",
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(navigationArrowsIconRight) })
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
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: "",
                    "aria-hidden": "true"
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-next",
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: "",
                    "aria-hidden": "true"
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
          className: `swiper-pagination swiper-pagination-testimonial-slider swiper-pagination-${blockId}`,
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
      authorPlaceholderUrl,
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
      showAuthorName,
      showAuthorDesignation,
      showTestimonialTitle,
      showTestimonialText,
      showAuthorImage,
      showRating,
      showRatingNumber,
      showQuoteIcon,
      quoteIconAlign,
      quoteIcon,
      quoteImageUrl,
      quoteImageAlt,
      showNavigation,
      showPagination,
      paginationPositionType,
      authorNameHtmlTag,
      authorDesignationHtmlTag,
      testimonialTitleHtmlTag,
      testimonialTextHtmlTag,
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
      layoutHeightSwitcher,
      contentOrder,
      presetStyle
    } = attributes2;
    const normalizedContentOrder = normalizeContentOrder(contentOrder);
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-testimonial-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? "has-pagination" : ""}`
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
        el: `.${blockId} .swiper-pagination-testimonial-slider`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    const authorImagePlaceholder = authorPlaceholderUrl;
    const renderRatingIcons = (item) => {
      const { ratingNumber, ratingIconAlign } = item;
      const ratingImageUrl = item.ratingImage?.url;
      const ratingImageAlt = item.ratingImage?.alt;
      const rating = Math.max(
        0,
        Math.min(5, parseFloat(ratingNumber || 0))
      );
      if (ratingIconAlign === "none" || rating === 0) {
        return null;
      }
      if (ratingIconAlign === "image" && ratingImageUrl) {
        const fullCount = Math.round(rating);
        const icons = [];
        for (let i = 0; i < fullCount; i++) {
          icons.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: ratingImageUrl,
                    alt: ratingImageAlt
                  }
                )
              },
              i
            )
          );
        }
        return icons;
      }
      if (ratingIconAlign === "icon") {
        const fullStars = Math.floor(rating);
        const fraction = rating - fullStars;
        const emptyStars = 5 - fullStars - (fraction > 0 ? 1 : 0);
        const fullStarPath = "M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Z";
        const emptyStarPath = "M49.62,18.85a1.9,1.9,0,0,0-1.54-1.29L33.4,15.38,26.84,1.63a1.92,1.92,0,0,0-3.47,0L16.86,15.34,2.13,17.56a1.92,1.92,0,0,0-1.08,3.25L11.73,31.53,9.21,46.73A1.93,1.93,0,0,0,11.1,49a2,2,0,0,0,.92-.23L25.07,41.6l13.11,7.14a1.93,1.93,0,0,0,2.82-2L38.46,31.6l10.7-10.79A1.92,1.92,0,0,0,49.62,18.85ZM37,30.19a1.94,1.94,0,0,0-.53,1.67L39,46.9l-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.5-15a1.94,1.94,0,0,0-.53-1.67L2.57,19.51l14.59-2.19a2,2,0,0,0,1.45-1.08L25.08,2.58,31.6,16.25a2,2,0,0,0,1.45,1.07l14.58,2.19Z";
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 49.23 48.44",
                    className: "gslider-testimonial-rating-star-svg",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "path",
                      {
                        d: fullStarPath,
                        transform: "translate(-0.39 -0.78)"
                      }
                    )
                  }
                )
              },
              `full-${i}`
            )
          );
        }
        if (fraction > 0) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon gslider-testimonial-star-partial-wrap",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-star-partial-container", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 49.23 48.44",
                      className: "gslider-testimonial-rating-star-svg",
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "path",
                        {
                          d: emptyStarPath,
                          transform: "translate(-0.49 -0.53)"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "div",
                    {
                      className: "gslider-testimonial-star-partial-fill",
                      style: { width: `${fraction * 100}%` },
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 49.23 48.44",
                          className: "gslider-testimonial-rating-star-svg",
                          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                            "path",
                            {
                              d: fullStarPath,
                              transform: "translate(-0.39 -0.78)"
                            }
                          )
                        }
                      )
                    }
                  )
                ] })
              },
              "partial"
            )
          );
        }
        for (let i = 0; i < emptyStars; i++) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon empty",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 49.23 48.44",
                    className: "gslider-testimonial-rating-star-svg",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "path",
                      {
                        d: emptyStarPath,
                        transform: "translate(-0.49 -0.53)"
                      }
                    )
                  }
                )
              },
              `empty-${i}`
            )
          );
        }
        return stars;
      }
      return null;
    };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => {
          const renderGroupMap = {
            quote: showQuoteIcon && quoteIconAlign !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-testimonial-quote-icon-wrapper",
                children: [
                  quoteIconAlign === "icon" && renderIcon_default(quoteIcon),
                  quoteIconAlign === "image" && quoteImageUrl && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: quoteImageUrl,
                      alt: quoteImageAlt
                    }
                  )
                ]
              },
              "quote"
            ) : null,
            content: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-testimonial-content-group",
                children: [
                  showTestimonialTitle && item.testimonialTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: testimonialTitleHtmlTag,
                      className: "gslider-testimonial-title",
                      value: item.testimonialTitle
                    }
                  ) }),
                  showTestimonialText && item.testimonialText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-text-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: testimonialTextHtmlTag,
                      className: "gslider-testimonial-text",
                      value: item.testimonialText
                    }
                  ) })
                ]
              },
              "content"
            ),
            rating: showRating ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-wrapper",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-rating-inner", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-rating-wrap", children: renderRatingIcons(item) }),
                  showRatingNumber && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-rating-number", children: [
                    "(",
                    Math.max(
                      0,
                      Math.min(
                        5,
                        parseFloat(
                          item.ratingNumber || 0
                        )
                      )
                    ),
                    ")"
                  ] })
                ] })
              },
              "rating"
            ) : null,
            author: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-author-info-group",
                children: [
                  showAuthorImage && (item.authorImage?.url || authorImagePlaceholder) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-image-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: item.authorImage?.url || authorImagePlaceholder,
                      alt: item.authorImage?.alt || "Author",
                      className: "gslider-testimonial-author-image"
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-author-meta", children: [
                    showAuthorName && item.authorName && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-name-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        tagName: authorNameHtmlTag,
                        className: "gslider-testimonial-author-name",
                        value: item.authorName
                      }
                    ) }),
                    showAuthorDesignation && item.authorDesignation && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-designation-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        tagName: authorDesignationHtmlTag,
                        className: "gslider-testimonial-author-designation",
                        value: item.authorDesignation
                      }
                    ) })
                  ] })
                ]
              },
              "author"
            )
          };
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                  ...globalID && { id: globalID },
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: normalizedContentOrder.map(
                    (groupKey) => renderGroupMap[groupKey] || null
                  ) })
                }
              )
            },
            item.id
          );
        }) }),
        anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
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
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                    navigationArrowsIconLeft
                  ) })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-next",
                  "aria-label": "Next slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                    navigationArrowsIconRight
                  ) })
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
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: "",
                      "aria-hidden": "true"
                    }
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-next",
                  "aria-label": "Next slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconRightImageUrl,
                      alt: "",
                      "aria-hidden": "true"
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
            className: "swiper-pagination swiper-pagination-testimonial-slider",
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
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
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
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(navigationArrowsIconLeft) })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-next",
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(navigationArrowsIconRight) })
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
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: "",
                    "aria-hidden": "true"
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-next",
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: "",
                    "aria-hidden": "true"
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
          className: `swiper-pagination swiper-pagination-testimonial-slider swiper-pagination-${blockId}`,
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
      authorPlaceholderUrl,
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
      showAuthorName,
      showAuthorDesignation,
      showTestimonialTitle,
      showTestimonialText,
      showAuthorImage,
      showRating,
      showRatingNumber,
      showQuoteIcon,
      quoteIconAlign,
      quoteIcon,
      quoteImageUrl,
      quoteImageAlt,
      showNavigation,
      showPagination,
      paginationPositionType,
      authorNameHtmlTag,
      authorDesignationHtmlTag,
      testimonialTitleHtmlTag,
      testimonialTextHtmlTag,
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
      layoutHeightSwitcher,
      contentOrder,
      presetStyle
    } = attributes2;
    const normalizedContentOrder = normalizeContentOrder(contentOrder);
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-testimonial-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}`
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
        el: `.${blockId} .swiper-pagination-testimonial-slider`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    const authorImagePlaceholder = authorPlaceholderUrl;
    const renderRatingIcons = (item) => {
      const { ratingNumber, ratingIconAlign } = item;
      const ratingImageUrl = item.ratingImage?.url;
      const ratingImageAlt = item.ratingImage?.alt;
      const rating = Math.max(
        0,
        Math.min(5, parseFloat(ratingNumber || 0))
      );
      if (ratingIconAlign === "none" || rating === 0) {
        return null;
      }
      if (ratingIconAlign === "image" && ratingImageUrl) {
        const fullCount = Math.round(rating);
        const icons = [];
        for (let i = 0; i < fullCount; i++) {
          icons.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: ratingImageUrl,
                    alt: ratingImageAlt
                  }
                )
              },
              i
            )
          );
        }
        return icons;
      }
      if (ratingIconAlign === "icon") {
        const fullStars = Math.floor(rating);
        const fraction = rating - fullStars;
        const emptyStars = 5 - fullStars - (fraction > 0 ? 1 : 0);
        const fullStarPath = "M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Z";
        const emptyStarPath = "M49.62,18.85a1.9,1.9,0,0,0-1.54-1.29L33.4,15.38,26.84,1.63a1.92,1.92,0,0,0-3.47,0L16.86,15.34,2.13,17.56a1.92,1.92,0,0,0-1.08,3.25L11.73,31.53,9.21,46.73A1.93,1.93,0,0,0,11.1,49a2,2,0,0,0,.92-.23L25.07,41.6l13.11,7.14a1.93,1.93,0,0,0,2.82-2L38.46,31.6l10.7-10.79A1.92,1.92,0,0,0,49.62,18.85ZM37,30.19a1.94,1.94,0,0,0-.53,1.67L39,46.9l-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.5-15a1.94,1.94,0,0,0-.53-1.67L2.57,19.51l14.59-2.19a2,2,0,0,0,1.45-1.08L25.08,2.58,31.6,16.25a2,2,0,0,0,1.45,1.07l14.58,2.19Z";
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 49.23 48.44",
                    className: "gslider-testimonial-rating-star-svg",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "path",
                      {
                        d: fullStarPath,
                        transform: "translate(-0.39 -0.78)"
                      }
                    )
                  }
                )
              },
              `full-${i}`
            )
          );
        }
        if (fraction > 0) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon gslider-testimonial-star-partial-wrap",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-star-partial-container", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 49.23 48.44",
                      className: "gslider-testimonial-rating-star-svg",
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "path",
                        {
                          d: emptyStarPath,
                          transform: "translate(-0.49 -0.53)"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "div",
                    {
                      className: "gslider-testimonial-star-partial-fill",
                      style: { width: `${fraction * 100}%` },
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 49.23 48.44",
                          className: "gslider-testimonial-rating-star-svg",
                          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                            "path",
                            {
                              d: fullStarPath,
                              transform: "translate(-0.39 -0.78)"
                            }
                          )
                        }
                      )
                    }
                  )
                ] })
              },
              "partial"
            )
          );
        }
        for (let i = 0; i < emptyStars; i++) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon empty",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 49.23 48.44",
                    className: "gslider-testimonial-rating-star-svg",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "path",
                      {
                        d: emptyStarPath,
                        transform: "translate(-0.49 -0.53)"
                      }
                    )
                  }
                )
              },
              `empty-${i}`
            )
          );
        }
        return stars;
      }
      return null;
    };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => {
          const renderGroupMap = {
            quote: showQuoteIcon && quoteIconAlign !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-testimonial-quote-icon-wrapper",
                children: [
                  quoteIconAlign === "icon" && renderIcon_default(quoteIcon),
                  quoteIconAlign === "image" && quoteImageUrl && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: quoteImageUrl,
                      alt: quoteImageAlt
                    }
                  )
                ]
              },
              "quote"
            ) : null,
            content: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-testimonial-content-group",
                children: [
                  showTestimonialTitle && item.testimonialTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: testimonialTitleHtmlTag,
                      className: "gslider-testimonial-title",
                      value: item.testimonialTitle
                    }
                  ) }),
                  showTestimonialText && item.testimonialText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-text-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: testimonialTextHtmlTag,
                      className: "gslider-testimonial-text",
                      value: item.testimonialText
                    }
                  ) })
                ]
              },
              "content"
            ),
            rating: showRating ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-wrapper",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-rating-inner", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-rating-wrap", children: renderRatingIcons(item) }),
                  showRatingNumber && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-rating-number", children: [
                    "(",
                    Math.max(
                      0,
                      Math.min(
                        5,
                        parseFloat(
                          item.ratingNumber || 0
                        )
                      )
                    ),
                    ")"
                  ] })
                ] })
              },
              "rating"
            ) : null,
            author: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-author-info-group",
                children: [
                  showAuthorImage && (item.authorImage?.url || authorImagePlaceholder) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-image-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: item.authorImage?.url || authorImagePlaceholder,
                      alt: item.authorImage?.alt || "Author",
                      className: "gslider-testimonial-author-image"
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-author-meta", children: [
                    showAuthorName && item.authorName && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-name-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        tagName: authorNameHtmlTag,
                        className: "gslider-testimonial-author-name",
                        value: item.authorName
                      }
                    ) }),
                    showAuthorDesignation && item.authorDesignation && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-designation-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        tagName: authorDesignationHtmlTag,
                        className: "gslider-testimonial-author-designation",
                        value: item.authorDesignation
                      }
                    ) })
                  ] })
                ]
              },
              "author"
            )
          };
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                  ...globalID && { id: globalID },
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: normalizedContentOrder.map(
                    (groupKey) => renderGroupMap[groupKey] || null
                  ) })
                }
              )
            },
            item.id
          );
        }) }),
        anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
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
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                    navigationArrowsIconLeft
                  ) })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-next",
                  "aria-label": "Next slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                    navigationArrowsIconRight
                  ) })
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
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: "",
                      "aria-hidden": "true"
                    }
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-next",
                  "aria-label": "Next slide",
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconRightImageUrl,
                      alt: "",
                      "aria-hidden": "true"
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
            className: "swiper-pagination swiper-pagination-testimonial-slider",
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
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
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
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(navigationArrowsIconLeft) })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-next",
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(navigationArrowsIconRight) })
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
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: "",
                    "aria-hidden": "true"
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-next",
                "aria-label": "Next slide",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: "",
                    "aria-hidden": "true"
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
          className: `swiper-pagination swiper-pagination-testimonial-slider swiper-pagination-${blockId}`,
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
      authorPlaceholderUrl,
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
      showAuthorName,
      showAuthorDesignation,
      showTestimonialTitle,
      showTestimonialText,
      showAuthorImage,
      showRating,
      showRatingNumber,
      showQuoteIcon,
      quoteIconAlign,
      quoteIcon,
      quoteImageUrl,
      quoteImageAlt,
      showNavigation,
      showPagination,
      paginationPositionType,
      authorNameHtmlTag,
      authorDesignationHtmlTag,
      testimonialTitleHtmlTag,
      testimonialTextHtmlTag,
      globalID,
      globalClass,
      navigationArrowPositionType,
      navigationArrowPosition,
      navigationArrowsIconSwitcher,
      navigationArrowsIconLeftAlign,
      navigationArrowsIconLeft,
      navigationArrowsIconLeftImageUrl,
      navigationArrowsIconRightAlign,
      navigationArrowsIconRight,
      navigationArrowsIconRightImageUrl,
      layoutHeightSwitcher,
      contentOrder
    } = attributes2;
    const normalizedContentOrder = normalizeContentOrder(contentOrder);
    const blockProps = import_block_editor2.useBlockProps.save({
      className: `gslider-testimonial-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?.Desktop || showPagination?.Tablet || showPagination?.Mobile ? "has-pagination" : ""}`
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
        el: `.${blockId} .swiper-pagination-testimonial-slider`,
        type: paginationType,
        dynamicBullets: paginationType === "bullets" ? dynamicBullets : false,
        clickable: true
      },
      ...slideEffect === "creative" && {
        creativeEffect: {
          prev: { shadow: true, translate: [0, 0, -400] },
          next: { translate: ["100%", 0, 0] }
        }
      }
    });
    const authorImagePlaceholder = authorPlaceholderUrl;
    const renderRatingIcons = (item) => {
      const { ratingNumber, ratingIconAlign } = item;
      const ratingImageUrl = item.ratingImage?.url;
      const ratingImageAlt = item.ratingImage?.alt;
      const rating = Math.max(
        0,
        Math.min(5, parseFloat(ratingNumber || 0))
      );
      if (ratingIconAlign === "none" || rating === 0) {
        return null;
      }
      if (ratingIconAlign === "image" && ratingImageUrl) {
        const fullCount = Math.round(rating);
        const icons = [];
        for (let i = 0; i < fullCount; i++) {
          icons.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: ratingImageUrl,
                    alt: ratingImageAlt
                  }
                )
              },
              i
            )
          );
        }
        return icons;
      }
      if (ratingIconAlign === "icon") {
        const fullStars = Math.floor(rating);
        const fraction = rating - fullStars;
        const emptyStars = 5 - fullStars - (fraction > 0 ? 1 : 0);
        const fullStarPath = "M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Z";
        const emptyStarPath = "M49.62,18.85a1.9,1.9,0,0,0-1.54-1.29L33.4,15.38,26.84,1.63a1.92,1.92,0,0,0-3.47,0L16.86,15.34,2.13,17.56a1.92,1.92,0,0,0-1.08,3.25L11.73,31.53,9.21,46.73A1.93,1.93,0,0,0,11.1,49a2,2,0,0,0,.92-.23L25.07,41.6l13.11,7.14a1.93,1.93,0,0,0,2.82-2L38.46,31.6l10.7-10.79A1.92,1.92,0,0,0,49.62,18.85ZM37,30.19a1.94,1.94,0,0,0-.53,1.67L39,46.9l-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.5-15a1.94,1.94,0,0,0-.53-1.67L2.57,19.51l14.59-2.19a2,2,0,0,0,1.45-1.08L25.08,2.58,31.6,16.25a2,2,0,0,0,1.45,1.07l14.58,2.19Z";
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 49.23 48.44",
                    className: "gslider-testimonial-rating-star-svg",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "path",
                      {
                        d: fullStarPath,
                        transform: "translate(-0.39 -0.78)"
                      }
                    )
                  }
                )
              },
              `full-${i}`
            )
          );
        }
        if (fraction > 0) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon gslider-testimonial-star-partial-wrap",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-star-partial-container", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 49.23 48.44",
                      className: "gslider-testimonial-rating-star-svg",
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "path",
                        {
                          d: emptyStarPath,
                          transform: "translate(-0.49 -0.53)"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "div",
                    {
                      className: "gslider-testimonial-star-partial-fill",
                      style: { width: `${fraction * 100}%` },
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 49.23 48.44",
                          className: "gslider-testimonial-rating-star-svg",
                          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                            "path",
                            {
                              d: fullStarPath,
                              transform: "translate(-0.39 -0.78)"
                            }
                          )
                        }
                      )
                    }
                  )
                ] })
              },
              "partial"
            )
          );
        }
        for (let i = 0; i < emptyStars; i++) {
          stars.push(
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-icon empty",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 49.23 48.44",
                    className: "gslider-testimonial-rating-star-svg",
                    children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      "path",
                      {
                        d: emptyStarPath,
                        transform: "translate(-0.49 -0.53)"
                      }
                    )
                  }
                )
              },
              `empty-${i}`
            )
          );
        }
        return stars;
      }
      return null;
    };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ...blockProps, "data-swiper-settings": swiperSettings, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "swiper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "swiper-wrapper", children: sliderItems.map((item) => {
          const renderGroupMap = {
            quote: showQuoteIcon && quoteIconAlign !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-testimonial-quote-icon-wrapper",
                children: [
                  quoteIconAlign === "icon" && renderIcon_default(quoteIcon),
                  quoteIconAlign === "image" && quoteImageUrl && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: quoteImageUrl,
                      alt: quoteImageAlt
                    }
                  )
                ]
              },
              "quote"
            ) : null,
            content: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-testimonial-content-group",
                children: [
                  showTestimonialTitle && item.testimonialTitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-title-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: testimonialTitleHtmlTag,
                      className: "gslider-testimonial-title",
                      value: item.testimonialTitle
                    }
                  ) }),
                  showTestimonialText && item.testimonialText && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-text-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    import_block_editor2.RichText.Content,
                    {
                      tagName: testimonialTextHtmlTag,
                      className: "gslider-testimonial-text",
                      value: item.testimonialText
                    }
                  ) })
                ]
              },
              "content"
            ),
            rating: showRating ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                className: "gslider-testimonial-rating-wrapper",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-rating-inner", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-rating-wrap", children: renderRatingIcons(item) }),
                  showRatingNumber && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-testimonial-rating-number", children: [
                    "(",
                    Math.max(
                      0,
                      Math.min(
                        5,
                        parseFloat(
                          item.ratingNumber || 0
                        )
                      )
                    ),
                    ")"
                  ] })
                ] })
              },
              "rating"
            ) : null,
            author: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                className: "gslider-author-info-group",
                children: [
                  showAuthorImage && (item.authorImage?.url || authorImagePlaceholder) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-image-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: item.authorImage?.url || authorImagePlaceholder,
                      alt: item.authorImage?.alt || "Author",
                      className: "gslider-testimonial-author-image"
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "gslider-author-meta", children: [
                    showAuthorName && item.authorName && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-name-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        tagName: authorNameHtmlTag,
                        className: "gslider-testimonial-author-name",
                        value: item.authorName
                      }
                    ) }),
                    showAuthorDesignation && item.authorDesignation && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-testimonial-author-designation-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                      import_block_editor2.RichText.Content,
                      {
                        tagName: authorDesignationHtmlTag,
                        className: "gslider-testimonial-author-designation",
                        value: item.authorDesignation
                      }
                    ) })
                  ] })
                ]
              },
              "author"
            )
          };
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              className: `swiper-slide ${sliderType === "slider" ? "slide-mode" : ""}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: `gslider-content-wrapper ${item.id} ${globalClass}`,
                  ...globalID && { id: globalID },
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gslider-content-inner-wrapper", children: normalizedContentOrder.map(
                    (groupKey) => renderGroupMap[groupKey] || null
                  ) })
                }
              )
            },
            item.id
          );
        }) }),
        anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            className: `gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-next",
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
                "button",
                {
                  type: "button",
                  className: "swiper-button-prev",
                  "aria-label": "Previous slide",
                  children: navigationArrowsIconLeftAlign === "image" && navigationArrowsIconLeftImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconLeftImageUrl,
                      alt: "",
                      "aria-hidden": "true"
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                    navigationArrowsIconLeft
                  ) })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "button",
                {
                  type: "button",
                  className: "swiper-button-next",
                  "aria-label": "Next slide",
                  children: navigationArrowsIconRightAlign === "image" && navigationArrowsIconRightImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "img",
                    {
                      src: navigationArrowsIconRightImageUrl,
                      alt: "",
                      "aria-hidden": "true"
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                    navigationArrowsIconRight
                  ) })
                }
              )
            ]
          }
        ),
        anyPaginationEnabled && paginationPositionType === "inside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: "swiper-pagination swiper-pagination-testimonial-slider",
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
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-next",
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
              "button",
              {
                type: "button",
                className: "swiper-button-prev",
                "aria-label": "Previous slide",
                children: navigationArrowsIconLeftAlign === "image" && navigationArrowsIconLeftImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconLeftImageUrl,
                    alt: "",
                    "aria-hidden": "true"
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                  navigationArrowsIconLeft
                ) })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "swiper-button-next",
                "aria-label": "Next slide",
                children: navigationArrowsIconRightAlign === "image" && navigationArrowsIconRightImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "img",
                  {
                    src: navigationArrowsIconRightImageUrl,
                    alt: "",
                    "aria-hidden": "true"
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-hidden": "true", children: renderIcon_default(
                  navigationArrowsIconRight
                ) })
              }
            )
          ]
        }
      ),
      anyPaginationEnabled && paginationPositionType === "outside" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: `swiper-pagination swiper-pagination-testimonial-slider swiper-pagination-${blockId}`,
          "aria-label": "Carousel pagination"
        }
      ) })
    ] });
  }
};
var deprecated_default = [v1_2_1, v1_2_0, v1_1_7, v1_1_6];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attributes,
  deprecated,
  meta,
  save,
  styling
});
