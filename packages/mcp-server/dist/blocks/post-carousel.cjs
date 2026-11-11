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

// ../../src/blocks/post-carousel/post-carousel-entry.js
var post_carousel_entry_exports = {};
__export(post_carousel_entry_exports, {
  attributes: () => attributes_default,
  deprecated: () => deprecated,
  meta: () => block_default,
  save: () => save,
  styling: () => styling_default
});
module.exports = __toCommonJS(post_carousel_entry_exports);

// ../../src/blocks/post-carousel/block.json
var block_default = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "gslider-blocks/post-carousel",
  version: "1.1.6",
  title: "Post Carousel",
  category: "gslider-blocks",
  description: "Display blog posts in a beautiful carousel slider.",
  keywords: [
    "post",
    "blog",
    "carousel",
    "slider",
    "post carousel",
    "post slider",
    "blog carousel",
    "blog slider",
    "article"
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
    customClassName: false,
    align: ["wide", "full"]
  },
  textdomain: "gslider-blocks",
  editorScript: ["file:./index.js", "gslider-blocks-swiper-script"],
  editorStyle: ["file:./index.css", "gslider-blocks-swiper-style"],
  style: ["file:./style-index.css", "gslider-blocks-swiper-style"],
  viewScript: ["file:./view.js", "gslider-blocks-swiper-script"],
  render: "file:./render.php"
};

// ../../src/components/query-settings-panel/query-attributes.js
var queryAttributes = {
  postType: {
    type: "string",
    default: "post"
  },
  postsPerPage: {
    type: "object",
    default: {
      Desktop: 6,
      Tablet: 6,
      Mobile: 6
    }
  },
  categories: {
    type: "array",
    default: []
  },
  categoryFilterType: {
    type: "string",
    default: "include"
  },
  tags: {
    type: "array",
    default: []
  },
  tagFilterType: {
    type: "string",
    default: "include"
  },
  authors: {
    type: "array",
    default: []
  },
  authorFilterType: {
    type: "string",
    default: "include"
  },
  excludePosts: {
    type: "string",
    default: ""
  },
  offset: {
    type: "object",
    default: {
      Desktop: 0,
      Tablet: 0,
      Mobile: 0
    }
  },
  orderBy: {
    type: "string",
    default: "date"
  },
  order: {
    type: "string",
    default: "desc"
  },
  searchQuery: {
    type: "string",
    default: ""
  },
  stickyPosts: {
    type: "string",
    default: "include"
  },
  taxonomyQuery: {
    type: "object",
    default: {}
  },
  taxonomyFilterTypes: {
    type: "object",
    default: {}
  },
  metaKey: {
    type: "string",
    default: ""
  },
  metaValue: {
    type: "string",
    default: ""
  },
  metaCompare: {
    type: "string",
    default: "="
  },
  dateRange: {
    type: "string",
    default: "any"
  },
  excludeCurrentPost: {
    type: "boolean",
    default: false
  }
};

// ../../src/components/animation-control/animation-attributes.js
var animationAttributes = {
  /** Entrance Animation */
  cardEntranceAnimation: {
    type: "string",
    default: "none"
  },
  cardEntranceAnimationDuration: {
    type: "object",
    default: {
      Desktop: "600",
      Tablet: "600",
      Mobile: "600"
    }
  },
  cardEntranceAnimationDelay: {
    type: "object",
    default: {
      Desktop: "0",
      Tablet: "0",
      Mobile: "0"
    }
  },
  cardEntranceAnimationOffset: {
    type: "object",
    default: {
      Desktop: "15",
      Tablet: "15",
      Mobile: "15"
    }
  },
  cardEntranceAnimationEasing: {
    type: "string",
    default: "ease-out"
  },
  /** Stagger Animation */
  enableStaggerAnimation: {
    type: "boolean",
    default: false
  },
  cardStaggerDelay: {
    type: "object",
    default: {
      Desktop: "100",
      Tablet: "100",
      Mobile: "100"
    }
  },
  /** Card Hover Animation */
  cardHoverAnimation: {
    type: "string",
    default: "none"
  },
  cardHoverAnimationDuration: {
    type: "object",
    default: {
      Desktop: "300",
      Tablet: "300",
      Mobile: "300"
    }
  },
  cardHoverLift: {
    type: "object",
    default: {
      Desktop: "8",
      Tablet: "8",
      Mobile: "8"
    }
  },
  cardHoverScale: {
    type: "object",
    default: {
      Desktop: "1.03",
      Tablet: "1.03",
      Mobile: "1.03"
    }
  },
  cardHoverPopScale: {
    type: "object",
    default: {
      Desktop: "1.06",
      Tablet: "1.06",
      Mobile: "1.06"
    }
  },
  cardHoverShadowColor: {
    type: "string",
    default: "rgba(0, 0, 0, 0.25)"
  },
  cardHoverGlowColor: {
    type: "string",
    default: "rgba(0, 122, 255, 0.5)"
  },
  cardHoverGlowSize: {
    type: "object",
    default: {
      Desktop: "15",
      Tablet: "15",
      Mobile: "15"
    }
  },
  /** 3D Tilt Effect */
  enableCardTilt: {
    type: "boolean",
    default: false
  },
  cardTiltMaxAngle: {
    type: "object",
    default: {
      Desktop: "12",
      Tablet: "12",
      Mobile: "12"
    }
  },
  cardTiltPerspective: {
    type: "object",
    default: {
      Desktop: "800",
      Tablet: "800",
      Mobile: "800"
    }
  },
  cardTiltHoverScale: {
    type: "object",
    default: {
      Desktop: "1.02",
      Tablet: "1.02",
      Mobile: "1.02"
    }
  },
  cardTiltTransitionSpeed: {
    type: "object",
    default: {
      Desktop: "400",
      Tablet: "400",
      Mobile: "400"
    }
  }
};

// ../../src/blocks/post-carousel/attributes/layoutAttributes.js
var layoutAttributes = {
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
  /** Layout & Content Setting */
  postLayoutMode: {
    type: "string",
    default: "classic"
  },
  presetStyle: {
    type: "string",
    default: "classic-card"
  },
  heroHeightDesktop: {
    type: "number",
    default: 520
  },
  heroHeightTablet: {
    type: "number",
    default: 420
  },
  heroHeightMobile: {
    type: "number",
    default: 340
  },
  heroContentAlignment: {
    type: "string",
    default: "bottom-left"
  },
  enableSpotlight: {
    type: "boolean",
    default: false
  },
  spotlightScaleSide: {
    type: "number",
    default: 0.92
  },
  spotlightOpacitySide: {
    type: "number",
    default: 0.65
  },
  newsroomMainWidth: {
    type: "number",
    default: 65
  },
  newsroomQueuePosition: {
    type: "string",
    default: "right"
  },
  horizontalMediaWidth: {
    type: "number",
    default: 45
  },
  horizontalMediaPosition: {
    type: "string",
    default: "left"
  },
  overlayGradientScrim: {
    type: "string",
    default: "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)"
  },
  overlayScrimHeight: {
    type: "number",
    default: 75
  },
  timelineStemColor: {
    type: "string",
    default: "#e2e8f0"
  },
  timelineStemThickness: {
    type: "number",
    default: 2
  },
  timelineDotSize: {
    type: "number",
    default: 16
  },
  timelineDotColor: {
    type: "string",
    default: "#007cba"
  },
  timelineDatePosition: {
    type: "string",
    default: "above"
  },
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
  equalHeight: {
    type: "boolean",
    default: true
  },
  enableCardClickableLink: {
    type: "boolean",
    default: false
  },
  /** End Layout & Content Setting */
  /** Content Order */
  contentOrder: {
    type: "array",
    default: [
      "thumbnail",
      "categories",
      "title",
      "excerpt",
      "meta",
      "readmore"
    ]
  },
  postTaxonomyDisplay: {
    type: "string",
    default: "category"
  },
  taxonomyMaxCount: {
    type: "number",
    default: 2
  },
  enableTaxonomyBadgeOverlay: {
    type: "boolean",
    default: true
  },
  taxonomyBadgeOverlayPosition: {
    type: "string",
    default: "top-left"
  },
  taxonomyBadgeOverlayVisibility: {
    type: "string",
    default: "always"
  },
  taxonomyBadgeOverlayTopOffset: {
    type: "object",
    default: {
      Desktop: "15",
      Tablet: "15",
      Mobile: "12"
    }
  },
  taxonomyBadgeOverlayTopOffsetUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  taxonomyBadgeOverlayLeftOffset: {
    type: "object",
    default: {
      Desktop: "15",
      Tablet: "15",
      Mobile: "12"
    }
  },
  taxonomyBadgeOverlayLeftOffsetUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Content Order */
  /** Query Attributes */
  useRelatedPostsQuery: {
    type: "boolean",
    default: false
  },
  relatedPostsTaxonomy: {
    type: "string",
    default: "category"
  },
  /** Start Element Visibility Toggles */
  showFeaturedImage: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  showPostTitle: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  showExcerpt: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  showTaxonomy: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  showMeta: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  showMetaAuthor: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  showMetaAvatar: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  showMetaDate: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  showReadMoreButton: {
    type: "object",
    default: {
      Desktop: true,
      Tablet: true,
      Mobile: true
    }
  },
  /** End Element Visibility Toggles */
  /** Start Editorial Meta Attributes */
  showReadingTime: {
    type: "boolean",
    default: true
  },
  showCommentCount: {
    type: "boolean",
    default: false
  },
  dateFormat: {
    type: "string",
    default: "default"
  },
  metaSeparator: {
    type: "string",
    default: "bullet"
  }
  /** End Editorial Meta Attributes */
};
var layoutAttributes_default = layoutAttributes;

// ../../src/blocks/post-carousel/attributes/carouselAttributes.js
var carouselAttributes = {
  /** Start Carousel Settings */
  carouselPerColumn: {
    type: "object",
    default: {
      Desktop: 3,
      Tablet: 2,
      Mobile: 1
    }
  },
  carouselPerColumnGap: {
    type: "object",
    default: {
      Desktop: 10,
      Tablet: 10,
      Mobile: 10
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
  carouselMode: {
    type: "string",
    default: "carousel"
  },
  marqueeSpeed: {
    type: "number",
    default: 6e3
  },
  marqueePauseOnHover: {
    type: "boolean",
    default: true
  },
  showAutoplayProgress: {
    type: "boolean",
    default: false
  },
  autoplayProgressPosition: {
    type: "string",
    default: "top"
  },
  autoplayProgressColor: {
    type: "string",
    default: "#007cba"
  },
  autoplayProgressHeight: {
    type: "number",
    default: 4
  },
  desktopGridColumns: {
    type: "number",
    default: 3
  },
  desktopGridGap: {
    type: "number",
    default: 24
  },
  /** End Carousel Settings */
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
  navigationArrowsIconLeftHtml: {
    type: "string",
    default: ""
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
  navigationArrowsIconRightHtml: {
    type: "string",
    default: ""
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
    default: "50px 50px 50px 50px"
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
    default: "50px 50px 50px 50px"
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
    default: "50px 50px 50px 50px"
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
      Desktop: "30",
      Tablet: "30",
      Mobile: "30"
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
      Desktop: "",
      Tablet: "",
      Mobile: ""
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
      Desktop: "",
      Tablet: "",
      Mobile: ""
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
    default: "50px 50px 50px 50px"
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
    default: "50px 50px 50px 50px"
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
    default: "50px 50px 50px 50px"
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
  }
  /** End Progressbar */
};
var carouselAttributes_default = carouselAttributes;

// ../../src/blocks/post-carousel/attributes/elementAttributes.js
var elementAttributes = {
  /** Start Post Card Margin */
  postCardMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCardMarginDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardMarginDesktopCssStyle: {
    type: "string",
    default: ""
  },
  postCardMarginTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardMarginTabletCssStyle: {
    type: "string",
    default: ""
  },
  postCardMarginMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardMarginMobileCssStyle: {
    type: "string",
    default: ""
  },
  postCardMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Post Card Margin */
  /** Start Post Card Padding */
  postCardPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCardPaddingDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardPaddingDesktopCssStyle: {
    type: "string",
    default: ""
  },
  postCardPaddingTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardPaddingTabletCssStyle: {
    type: "string",
    default: ""
  },
  postCardPaddingMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardPaddingMobileCssStyle: {
    type: "string",
    default: ""
  },
  postCardPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Post Card Padding */
  /** Start Post Card Background */
  postCardNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  postCardNormalClassicColor: {
    type: "string",
    default: ""
  },
  postCardNormalGradientColor: {
    type: "string",
    default: null
  },
  postCardNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  postCardNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Post Card Background */
  /** Start Post Card Hover Background */
  postCardHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  postCardHoverClassicColor: {
    type: "string",
    default: ""
  },
  postCardHoverGradientColor: {
    type: "string",
    default: null
  },
  postCardHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  postCardHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Post Card Hover Background */
  /** Start Post Card Border */
  postCardBorder: {
    type: "string",
    default: "none"
  },
  postCardBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  postCardBorderColor: {
    type: "string"
  },
  postCardBorderHoverColor: {
    type: "string"
  },
  postCardBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCardBorderDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardBorderDesktopCssStyle: {
    type: "string",
    default: ""
  },
  postCardBorderTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardBorderTabletCssStyle: {
    type: "string",
    default: ""
  },
  postCardBorderMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardBorderMobileCssStyle: {
    type: "string",
    default: ""
  },
  postCardBorderLink: {
    type: "boolean",
    default: true
  },
  postCardBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCardBorderRadiusDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardBorderRadiusDesktopCssStyle: {
    type: "string",
    default: ""
  },
  postCardBorderRadiusTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardBorderRadiusTabletCssStyle: {
    type: "string",
    default: ""
  },
  postCardBorderRadiusMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCardBorderRadiusMobileCssStyle: {
    type: "string",
    default: ""
  },
  postCardBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  postCardBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  postCardBoxShadowValues: {
    type: "array",
    default: []
  },
  postCardBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  postCardBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  postCardBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  },
  /** End Post Card Border */
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
  imageHeight: {
    type: "object",
    default: {
      Desktop: "200",
      Tablet: "",
      Mobile: ""
    }
  },
  imageHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageObjectFit: {
    type: "string",
    default: "cover"
  },
  imageObjectPosition: {
    type: "string",
    default: "center"
  },
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
  /** Start image Margin */
  imageMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageMarginDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageMarginDesktopCssStyle: {
    type: "string",
    default: ""
  },
  imageMarginTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageMarginTabletCssStyle: {
    type: "string",
    default: ""
  },
  imageMarginMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  imageMarginMobileCssStyle: {
    type: "string",
    default: ""
  },
  imageMarginLink: {
    type: "boolean",
    default: true
  },
  /** End image Margin */
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
    type: "string",
    default: ""
  },
  imageBorderHoverColor: {
    type: "string",
    default: ""
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
  /** End image Border */
  /** Start image Border Radius */
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
  /** End image Border Radius */
  /** Start image Box Shadow */
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
  /** End image Box Shadow */
  /** Start Fallback Thumbnail */
  enableFallbackThumbnail: {
    type: "boolean",
    default: true
  },
  fallbackThumbnailUrl: {
    type: "string",
    default: ""
  },
  fallbackThumbnailId: {
    type: "number",
    default: 0
  },
  /** End Fallback Thumbnail */
  /** Start Image Hover Settings */
  imageHoverEffect: {
    type: "string",
    default: "zoom-in"
  },
  imageHoverOpacity: {
    type: "object",
    default: {
      Desktop: 0.8,
      Tablet: 0.8,
      Mobile: 0.8
    }
  },
  imageHoverScale: {
    type: "object",
    default: {
      Desktop: 1.05,
      Tablet: 1.05,
      Mobile: 1.05
    }
  },
  imageHoverLift: {
    type: "object",
    default: {
      Desktop: 10,
      Tablet: 10,
      Mobile: 10
    }
  },
  imageHoverLiftUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  imageTransitionDuration: {
    type: "object",
    default: {
      Desktop: 300,
      Tablet: 300,
      Mobile: 300
    }
  },
  imageHoverBlur: {
    type: "object",
    default: {
      Desktop: 4,
      Tablet: 4,
      Mobile: 4
    }
  },
  imageHoverRotate: {
    type: "object",
    default: {
      Desktop: 3,
      Tablet: 3,
      Mobile: 3
    }
  },
  imageHoverGrayscale: {
    type: "object",
    default: {
      Desktop: 100,
      Tablet: 100,
      Mobile: 100
    }
  },
  imageHoverPan: {
    type: "object",
    default: {
      Desktop: 5,
      Tablet: 5,
      Mobile: 5
    }
  },
  /** End Image Hover Settings */
  postTitleAlign: {
    type: "object",
    default: {
      Desktop: "left",
      Tablet: "left",
      Mobile: "left"
    }
  },
  postTitleHtmlTag: {
    type: "string",
    default: "h3"
  },
  /** Start Post Title Typography */
  postTitleFontFamily: {
    type: "string",
    default: ""
  },
  postTitleFontSize: {
    type: "object",
    default: {
      Desktop: "18",
      Tablet: "18",
      Mobile: "18"
    }
  },
  postTitleFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTitleFontWeight: {
    type: "string",
    default: "600"
  },
  postTitleFontStyle: {
    type: "string",
    default: ""
  },
  postTitleTextTransform: {
    type: "string",
    default: ""
  },
  postTitleTextDecoration: {
    type: "string",
    default: ""
  },
  postTitleLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postTitleLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTitleLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postTitleLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTitleWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postTitleWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Post Title Typography */
  /** Start Post Title Color */
  postTitleNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  postTitleNormalClassicColor: {
    type: "string",
    default: ""
  },
  postTitleNormalGradientColor: {
    type: "string",
    default: null
  },
  postTitleNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  postTitleNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  postTitleHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  postTitleHoverClassicColor: {
    type: "string",
    default: ""
  },
  postTitleHoverGradientColor: {
    type: "string",
    default: null
  },
  postTitleHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  postTitleHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Post Title Color */
  /** Start Post Title Margin */
  postTitleMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTitleDesktopMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "8",
      left: "0",
      right: "0"
    }
  },
  postTitleDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  postTitleTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTitleTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  postTitleMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTitleMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  postTitleMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Post Title Margin */
  /** Start Post Title Padding */
  postTitlePaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTitleDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTitleDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postTitleTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTitleTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postTitleMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTitleMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  postTitlePaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Post Title Padding */
  /** Start Post Title Settings */
  enablePostTitleLimit: {
    type: "boolean",
    default: false
  },
  postTitleLimitType: {
    type: "string",
    default: "words"
  },
  postTitleLimit: {
    type: "object",
    default: {
      Desktop: "10",
      Tablet: "10",
      Mobile: "10"
    }
  },
  postTitleLimitSuffix: {
    type: "string",
    default: "..."
  },
  enablePostTitleLink: {
    type: "boolean",
    default: true
  },
  postTitleLinkTarget: {
    type: "boolean",
    default: false
  },
  postTitleLinkNofollow: {
    type: "boolean",
    default: false
  },
  postTitleLinkSponsored: {
    type: "boolean",
    default: false
  },
  enablePostTitleHoverUnderlineAnim: {
    type: "boolean",
    default: false
  },
  postTitleHoverUnderlineColor: {
    type: "string",
    default: ""
  },
  postTitleHoverUnderlineHeight: {
    type: "object",
    default: {
      Desktop: "2",
      Tablet: "2",
      Mobile: "2"
    }
  },
  postTitleHoverUnderlineBottomOffset: {
    type: "object",
    default: {
      Desktop: "-2",
      Tablet: "-2",
      Mobile: "-2"
    }
  },
  postTitleHoverUnderlineTransitionSpeed: {
    type: "object",
    default: {
      Desktop: "0.3",
      Tablet: "0.3",
      Mobile: "0.3"
    }
  },
  showPostTitleDivider: {
    type: "boolean",
    default: false
  },
  postTitleDividerStyle: {
    type: "string",
    default: "solid"
  },
  postTitleDividerColorSwitcher: {
    type: "string",
    default: "normal"
  },
  postTitleDividerColor: {
    type: "string",
    default: "#333333"
  },
  postTitleDividerHoverColor: {
    type: "string",
    default: ""
  },
  postTitleDividerWidth: {
    type: "object",
    default: {
      Desktop: "50",
      Tablet: "50",
      Mobile: "50"
    }
  },
  postTitleDividerWidthUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTitleDividerHeight: {
    type: "object",
    default: {
      Desktop: "2",
      Tablet: "2",
      Mobile: "2"
    }
  },
  postTitleDividerHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  enablePostTitleDividerHoverExpand: {
    type: "boolean",
    default: false
  },
  /** End Post Title Settings */
  postExcerptAlign: {
    type: "object",
    default: {
      Desktop: "left",
      Tablet: "left",
      Mobile: "left"
    }
  },
  postExcerptHtmlTag: {
    type: "string",
    default: "p"
  },
  enablePostExcerptLimit: {
    type: "boolean",
    default: false
  },
  postExcerptLimitType: {
    type: "string",
    default: "words"
  },
  postExcerptLimit: {
    type: "object",
    default: {
      Desktop: "20",
      Tablet: "20",
      Mobile: "20"
    }
  },
  postExcerptLimitSuffix: {
    type: "string",
    default: "..."
  },
  postExcerptSource: {
    type: "string",
    default: "auto"
  },
  postExcerptLineClamp: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  /** Start Post Excerpt Typography */
  postExcerptFontFamily: {
    type: "string",
    default: ""
  },
  postExcerptFontSize: {
    type: "object",
    default: {
      Desktop: "16",
      Tablet: "16",
      Mobile: "16"
    }
  },
  postExcerptFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postExcerptFontWeight: {
    type: "string",
    default: ""
  },
  postExcerptFontStyle: {
    type: "string",
    default: ""
  },
  postExcerptTextTransform: {
    type: "string",
    default: ""
  },
  postExcerptTextDecoration: {
    type: "string",
    default: ""
  },
  postExcerptLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postExcerptLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postExcerptLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postExcerptLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postExcerptWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postExcerptWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Post Excerpt Typography */
  /** Start Post Excerpt Color */
  postExcerptColorSwitcher: {
    type: "string",
    default: "normal"
  },
  postExcerptColor: {
    type: "string",
    default: ""
  },
  postExcerptColorHover: {
    type: "string",
    default: ""
  },
  /** End Post Excerpt Color */
  /** Start Post Excerpt Margin */
  postExcerptMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postExcerptDesktopMargin: {
    type: "object",
    default: {
      top: "0",
      bottom: "12",
      left: "0",
      right: "0"
    }
  },
  postExcerptDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  postExcerptTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postExcerptTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  postExcerptMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postExcerptMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  postExcerptMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Post Excerpt Margin */
  /** Start Post Excerpt Padding */
  postExcerptPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postExcerptDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postExcerptDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postExcerptTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postExcerptTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postExcerptMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postExcerptMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  postExcerptPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Post Excerpt Padding */
  /** End Post Excerpt Styling */
  postCategoryAlign: {
    type: "object",
    default: {
      Desktop: "left",
      Tablet: "left",
      Mobile: "left"
    }
  },
  /** Start Post Category Typography */
  postCategoryFontFamily: {
    type: "string",
    default: ""
  },
  postCategoryFontSize: {
    type: "object",
    default: {
      Desktop: "13",
      Tablet: "13",
      Mobile: "13"
    }
  },
  postCategoryFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCategoryFontWeight: {
    type: "string",
    default: ""
  },
  postCategoryFontStyle: {
    type: "string",
    default: ""
  },
  postCategoryTextTransform: {
    type: "string",
    default: ""
  },
  postCategoryTextDecoration: {
    type: "string",
    default: ""
  },
  postCategoryLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postCategoryLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCategoryLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postCategoryLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCategoryWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postCategoryWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Post Category Typography */
  /** Start Post Category Color */
  postCategoryColorSwitcher: {
    type: "string",
    default: "normal"
  },
  postCategoryColor: {
    type: "string",
    default: ""
  },
  postCategoryColorHover: {
    type: "string",
    default: ""
  },
  /** End Post Category Color */
  /** Start Post Category Background */
  postCategoryNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  postCategoryNormalClassicColor: {
    type: "string",
    default: ""
  },
  postCategoryNormalGradientColor: {
    type: "string",
    default: null
  },
  postCategoryNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  postCategoryNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  postCategoryHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  postCategoryHoverClassicColor: {
    type: "string",
    default: ""
  },
  postCategoryHoverGradientColor: {
    type: "string",
    default: null
  },
  postCategoryHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  postCategoryHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Post Category Background */
  /** Start Post Category Border */
  postCategoryBorder: {
    type: "string",
    default: "none"
  },
  postCategoryBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  postCategoryBorderColor: {
    type: "string",
    default: ""
  },
  postCategoryBorderHoverColor: {
    type: "string",
    default: ""
  },
  postCategoryBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCategoryBorderDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryBorderDesktopCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryBorderTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryBorderTabletCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryBorderMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryBorderMobileCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryBorderLink: {
    type: "boolean",
    default: true
  },
  /** End Post Category Border */
  /** Start Post Category Border Radius */
  postCategoryBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCategoryBorderRadiusDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryBorderRadiusDesktopCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryBorderRadiusTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryBorderRadiusTabletCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryBorderRadiusMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryBorderRadiusMobileCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Post Category Border Radius */
  /** Start Post Category Box Shadow */
  postCategoryBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  postCategoryBoxShadowValues: {
    type: "array",
    default: []
  },
  postCategoryBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  postCategoryBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  postCategoryBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  },
  /** End Post Category Box Shadow */
  /** Start Post Category Gap */
  postCategoryGap: {
    type: "object",
    default: {
      Desktop: "5",
      Tablet: "5",
      Mobile: "5"
    }
  },
  postCategoryGapUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Post Category Gap */
  /** Start Post Category Spacing (Margin & Padding) */
  postCategoryMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCategoryDesktopMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryMarginLink: {
    type: "boolean",
    default: true
  },
  postCategoryPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCategoryDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Post Category Spacing */
  /** Start Post Category Item Padding */
  postCategoryItemPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postCategoryItemDesktopPadding: {
    type: "object",
    default: {
      top: "4",
      bottom: "4",
      left: "8",
      right: "8"
    }
  },
  postCategoryItemDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryItemTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryItemTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryItemMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postCategoryItemMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  postCategoryItemPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Post Category Item Padding */
  /** End Post Category Styling */
  /** Start Post Tag Styling */
  postTagAlign: {
    type: "object",
    default: {
      Desktop: "left",
      Tablet: "left",
      Mobile: "left"
    }
  },
  /** Start Post Tag Typography */
  postTagFontFamily: {
    type: "string",
    default: ""
  },
  postTagFontSize: {
    type: "object",
    default: {
      Desktop: "13",
      Tablet: "13",
      Mobile: "13"
    }
  },
  postTagFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTagFontWeight: {
    type: "string",
    default: ""
  },
  postTagFontStyle: {
    type: "string",
    default: ""
  },
  postTagTextTransform: {
    type: "string",
    default: ""
  },
  postTagTextDecoration: {
    type: "string",
    default: ""
  },
  postTagLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postTagLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTagLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postTagLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTagWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postTagWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Post Tag Typography */
  /** Start Post Tag Color */
  postTagColorSwitcher: {
    type: "string",
    default: "normal"
  },
  postTagColor: {
    type: "string",
    default: ""
  },
  postTagColorHover: {
    type: "string",
    default: ""
  },
  /** End Post Tag Color */
  /** Start Post Tag Background */
  postTagNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  postTagNormalClassicColor: {
    type: "string",
    default: ""
  },
  postTagNormalGradientColor: {
    type: "string",
    default: null
  },
  postTagNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  postTagNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  postTagHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  postTagHoverClassicColor: {
    type: "string",
    default: ""
  },
  postTagHoverGradientColor: {
    type: "string",
    default: null
  },
  postTagHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  postTagHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Post Tag Background */
  /** Start Post Tag Border */
  postTagBorder: {
    type: "string",
    default: "none"
  },
  postTagBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  postTagBorderColor: {
    type: "string",
    default: ""
  },
  postTagBorderHoverColor: {
    type: "string",
    default: ""
  },
  postTagBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTagBorderDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagBorderDesktopCssStyle: {
    type: "string",
    default: ""
  },
  postTagBorderTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagBorderTabletCssStyle: {
    type: "string",
    default: ""
  },
  postTagBorderMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagBorderMobileCssStyle: {
    type: "string",
    default: ""
  },
  postTagBorderLink: {
    type: "boolean",
    default: true
  },
  /** End Post Tag Border */
  /** Start Post Tag Border Radius */
  postTagBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTagBorderRadiusDesktop: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagBorderRadiusDesktopCssStyle: {
    type: "string",
    default: ""
  },
  postTagBorderRadiusTablet: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagBorderRadiusTabletCssStyle: {
    type: "string",
    default: ""
  },
  postTagBorderRadiusMobile: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagBorderRadiusMobileCssStyle: {
    type: "string",
    default: ""
  },
  postTagBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Post Tag Border Radius */
  /** Start Post Tag Box Shadow */
  postTagBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  postTagBoxShadowValues: {
    type: "array",
    default: []
  },
  postTagBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  postTagBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  postTagBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  },
  /** End Post Tag Box Shadow */
  /** Start Post Tag Gap */
  postTagGap: {
    type: "object",
    default: {
      Desktop: "5",
      Tablet: "5",
      Mobile: "5"
    }
  },
  postTagGapUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Post Tag Gap */
  /** Start Post Tag Spacing (Margin & Padding) */
  postTagMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTagDesktopMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  postTagTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  postTagMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  postTagMarginLink: {
    type: "boolean",
    default: true
  },
  postTagPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTagDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postTagTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postTagMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  postTagPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Post Tag Spacing */
  /** Start Post Tag Item Padding */
  postTagItemPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postTagItemDesktopPadding: {
    type: "object",
    default: {
      top: "4",
      bottom: "4",
      left: "8",
      right: "8"
    }
  },
  postTagItemDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postTagItemTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagItemTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postTagItemMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postTagItemMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  postTagItemPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Post Tag Item Padding */
  /** End Post Tag Styling */
  /** Start Author Image Size */
  authorImageSize: {
    type: "object",
    default: {
      Desktop: "28",
      Tablet: "28",
      Mobile: "28"
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
      top: "0",
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
      top: "0",
      bottom: "0",
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
      top: "0",
      bottom: "0",
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
  /** Start Author Name Typography */
  authorNameFontFamily: {
    type: "string",
    default: ""
  },
  authorNameFontSize: {
    type: "object",
    default: {
      Desktop: "14",
      Tablet: "14",
      Mobile: "14"
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
      top: "0",
      bottom: "0",
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
      bottom: "0",
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
      bottom: "0",
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
  /** Start Post Date Typography */
  postDateFontFamily: {
    type: "string",
    default: ""
  },
  postDateFontSize: {
    type: "object",
    default: {
      Desktop: "14",
      Tablet: "14",
      Mobile: "14"
    }
  },
  postDateFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postDateFontWeight: {
    type: "string",
    default: ""
  },
  postDateFontStyle: {
    type: "string",
    default: ""
  },
  postDateTextTransform: {
    type: "string",
    default: ""
  },
  postDateTextDecoration: {
    type: "string",
    default: ""
  },
  postDateLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postDateLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postDateLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postDateLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postDateWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  postDateWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Post Date Typography */
  /** Start Post Date Color */
  postDateColorSwitcher: {
    type: "string",
    default: "normal"
  },
  postDateColor: {
    type: "string",
    default: ""
  },
  postDateColorHover: {
    type: "string",
    default: ""
  },
  /** End Post Date Color */
  /** Start Post Date Margin */
  postDateMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postDateDesktopMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postDateDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  postDateTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postDateTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  postDateMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postDateMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  postDateMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Post Date Margin */
  /** Start Post Date Padding */
  postDatePaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  postDateDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postDateDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postDateTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postDateTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  postDateMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  postDateMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  postDatePaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Post Date Padding */
  /** End Post Date */
  readMoreButtonText: {
    type: "string",
    default: "Read More"
  },
  readMoreButtonLinkType: {
    type: "string",
    default: "post"
  },
  readMoreButtonLink: {
    type: "string",
    default: "#"
  },
  readMoreButtonTargetLink: {
    type: "boolean",
    default: true
  },
  readMoreButtonNofollow: {
    type: "boolean",
    default: false
  },
  readMoreButtonSponsored: {
    type: "boolean",
    default: false
  },
  /** End Read More Button Settings */
  /** Start Read More Button Icon */
  readMoreButtonIconSwitcher: {
    type: "boolean",
    default: true
  },
  readMoreButtonIconType: {
    type: "string",
    default: "icon"
  },
  readMoreButtonIconPosition: {
    type: "string",
    default: "right"
  },
  readMoreButtonIcon: {
    type: "string",
    default: "arrow-right"
  },
  readMoreButtonIconHtml: {
    type: "string",
    default: ""
  },
  readMoreButtonIconImageUrl: {
    type: "string",
    default: ""
  },
  readMoreButtonIconImageAlt: {
    type: "string",
    default: "Right Arrow"
  },
  readMoreButtonIconImageID: {
    type: "string",
    default: ""
  },
  /** End Read More Button Icon */
  /** Start Read More Button Typography */
  readMoreButtonFontFamily: {
    type: "string",
    default: ""
  },
  readMoreButtonFontSize: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  readMoreButtonFontSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  readMoreButtonFontWeight: {
    type: "string",
    default: ""
  },
  readMoreButtonFontStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonTextTransform: {
    type: "string",
    default: ""
  },
  readMoreButtonTextDecoration: {
    type: "string",
    default: "none"
  },
  readMoreButtonLineHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  readMoreButtonLineHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  readMoreButtonLetterSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  readMoreButtonLetterSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  readMoreButtonWordSpacing: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  readMoreButtonWordSpacingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Read More Button Typography */
  /** Start Read More Button Color */
  readMoreButtonColorSwitcher: {
    type: "string",
    default: "normal"
  },
  readMoreButtonColor: {
    type: "string",
    default: "#111c2d"
  },
  readMoreButtonColorHover: {
    type: "string",
    default: "#FFFFFF"
  },
  /** End Read More Button Color */
  /** Start Read More Button Background */
  readMoreButtonNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  readMoreButtonNormalClassicColor: {
    type: "string",
    default: "#d2d2d2c7"
  },
  readMoreButtonNormalGradientColor: {
    type: "string",
    default: null
  },
  readMoreButtonNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  readMoreButtonNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  readMoreButtonHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  readMoreButtonHoverClassicColor: {
    type: "string",
    default: "#787878b8"
  },
  readMoreButtonHoverGradientColor: {
    type: "string",
    default: null
  },
  readMoreButtonHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  readMoreButtonHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Read More Button Background */
  /** Start Read More Button Border */
  readMoreButtonBorder: {
    type: "string",
    default: "none"
  },
  readMoreButtonBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  readMoreButtonBorderColor: {
    type: "string",
    default: ""
  },
  readMoreButtonBorderHoverColor: {
    type: "string",
    default: ""
  },
  readMoreButtonBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  readMoreButtonDesktopBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonDesktopBorderCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonTabletBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonTabletBorderCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonMobileBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonMobileBorderCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonBorderLink: {
    type: "boolean",
    default: true
  },
  /** End Read More Button Border */
  /** Start Read More Button Border Radius */
  readMoreButtonBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  readMoreButtonDesktopBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonDesktopBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonTabletBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonTabletBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonMobileBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonMobileBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Read More Button Border Radius */
  /** Start Read More Button Box Shadow */
  readMoreButtonBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  readMoreButtonBoxShadowValues: {
    type: "array",
    default: []
  },
  readMoreButtonBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  readMoreButtonBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  readMoreButtonBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  },
  /** End Read More Button Box Shadow */
  /** Start Read More Button Margin */
  readMoreButtonMarginUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  readMoreButtonDesktopMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonDesktopMarginCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonTabletMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonTabletMarginCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonMobileMargin: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonMobileMarginCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonMarginLink: {
    type: "boolean",
    default: true
  },
  /** End Read More Button Margin */
  /** Start Read More Button Padding */
  readMoreButtonPaddingUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  readMoreButtonDesktopPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonDesktopPaddingCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonTabletPadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonTabletPaddingCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonMobilePadding: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonMobilePaddingCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonPaddingLink: {
    type: "boolean",
    default: true
  },
  /** End Read More Button Padding */
  /** Start Read More Button Layout & Alignment */
  readMoreButtonAlign: {
    type: "object",
    default: {
      Desktop: "left",
      Tablet: "left",
      Mobile: "left"
    }
  },
  readMoreButtonWidth: {
    type: "string",
    default: "full"
  },
  readMoreButtonHoverAnimation: {
    type: "string",
    default: "none"
  },
  /** End Read More Button Layout & Alignment */
  /** Start Read More Button Icon Size */
  readMoreButtonIconSize: {
    type: "object",
    default: {
      Desktop: "14",
      Tablet: "14",
      Mobile: "14"
    }
  },
  readMoreButtonIconSizeUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Read More Button Icon Size */
  /** Start Read More Button Icon Width & Height */
  readMoreButtonIconWidth: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  readMoreButtonIconWidthUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  readMoreButtonIconHeight: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  readMoreButtonIconHeightUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Read More Button Icon Width & Height */
  /** Start Read More Button Icon Rotation */
  readMoreButtonIconRotationSwitcher: {
    type: "string",
    default: "normal"
  },
  readMoreButtonIconRotation: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  readMoreButtonIconHoverRotation: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  /** End Read More Button Icon Rotation */
  /** Start Read More Button Icon Hover Animation */
  readMoreButtonIconHoverAnimation: {
    type: "string",
    default: "none"
  },
  /** End Read More Button Icon Hover Animation */
  /** Start Read More Button Icon Gap */
  readMoreButtonIconGap: {
    type: "object",
    default: {
      Desktop: "8",
      Tablet: "8",
      Mobile: "8"
    }
  },
  readMoreButtonIconGapUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  /** End Read More Button Icon Gap */
  /** Start Read More Button Icon Color */
  readMoreButtonIconColorSwitcher: {
    type: "string",
    default: "normal"
  },
  readMoreButtonIconColor: {
    type: "string",
    default: "#111c2d"
  },
  readMoreButtonIconColorHover: {
    type: "string",
    default: "#FFFFFF"
  },
  /** End Read More Button Icon Color */
  /** Start Read More Button Icon Background */
  readMoreButtonIconNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  readMoreButtonIconNormalClassicColor: {
    type: "string",
    default: ""
  },
  readMoreButtonIconNormalGradientColor: {
    type: "string",
    default: null
  },
  readMoreButtonIconNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  readMoreButtonIconNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  readMoreButtonIconHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  readMoreButtonIconHoverClassicColor: {
    type: "string",
    default: ""
  },
  readMoreButtonIconHoverGradientColor: {
    type: "string",
    default: null
  },
  readMoreButtonIconHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  readMoreButtonIconHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  /** End Read More Button Icon Background */
  /** Start Read More Button Icon Border */
  readMoreButtonIconBorder: {
    type: "string",
    default: "none"
  },
  readMoreButtonIconBorderColorSwitcher: {
    type: "string",
    default: "normal"
  },
  readMoreButtonIconBorderColor: {
    type: "string",
    default: ""
  },
  readMoreButtonIconBorderHoverColor: {
    type: "string",
    default: ""
  },
  readMoreButtonIconBorderUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  readMoreButtonIconDesktopBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonIconDesktopBorderCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonIconTabletBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonIconTabletBorderCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonIconMobileBorder: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonIconMobileBorderCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonIconBorderLink: {
    type: "boolean",
    default: true
  },
  /** End Read More Button Icon Border */
  /** Start Read More Button Icon Border Radius */
  readMoreButtonIconBorderRadiusUnits: {
    type: "object",
    default: {
      Desktop: "px",
      Tablet: "px",
      Mobile: "px"
    }
  },
  readMoreButtonIconDesktopBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonIconDesktopBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonIconTabletBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonIconTabletBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonIconMobileBorderRadius: {
    type: "object",
    default: {
      top: "",
      bottom: "",
      left: "",
      right: ""
    }
  },
  readMoreButtonIconMobileBorderRadiusCssStyle: {
    type: "string",
    default: ""
  },
  readMoreButtonIconBorderRadiusLink: {
    type: "boolean",
    default: true
  },
  /** End Read More Button Icon Border Radius */
  /** Start Read More Button Icon Box Shadow */
  readMoreButtonIconBoxShadowValuesSwitcher: {
    type: "string",
    default: "normal"
  },
  readMoreButtonIconBoxShadowValues: {
    type: "array",
    default: []
  },
  readMoreButtonIconBoxShadowCssValue: {
    type: "string",
    default: ""
  },
  readMoreButtonIconBoxShadowHoverValues: {
    type: "array",
    default: []
  },
  readMoreButtonIconBoxShadowHoverCssValue: {
    type: "string",
    default: ""
  }
  /** End Read More Button Icon Box Shadow */
};
var elementAttributes_default = elementAttributes;

// ../../src/blocks/post-carousel/attributes/globalAttributes.js
var globalAttributes = {
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
  },
  /** End Global Border */
  /** Start Global Custom CSS */
  globalCustomCSS: {
    type: "string",
    default: ""
  },
  /** End Global Custom CSS */
  /** Start SEO & Structured Data */
  enableSchemaMarkup: {
    type: "boolean",
    default: true
  }
  /** End SEO & Structured Data */
};
var globalAttributes_default = globalAttributes;

// ../../src/blocks/post-carousel/attributes.js
var attributes = {
  ...layoutAttributes_default,
  ...carouselAttributes_default,
  ...elementAttributes_default,
  ...globalAttributes_default,
  ...queryAttributes,
  ...animationAttributes
};
var attributes_default = attributes;

// ../../src/blocks/post-carousel/save.js
function save() {
  return null;
}

// ../../src/blocks/post-carousel/styling/styleHelpers.js
var styleObjectToString = (styleObj) => Object.entries(styleObj).map(([key, value]) => `${key}: ${value};`).join(" ");
var buildBackgroundStyles = (attributes2, prefix, state = "Normal", { device = "Desktop", withImage = false } = {}) => {
  const bgType = attributes2[`${prefix}${state}BackgroundType`];
  const bgColor = attributes2[`${prefix}${state}ClassicColor`];
  const bgGradient = attributes2[`${prefix}${state}GradientColor`];
  const customGradient = attributes2[`${prefix}${state}CustomGradientInputValue`];
  const customGradientEnabled = attributes2[`${prefix}${state}CustomGradientSwitcher`];
  if (bgType === "gradient") {
    if (customGradientEnabled && customGradient) {
      return styleObjectToString({ background: customGradient });
    }
    if (bgGradient) {
      return styleObjectToString({ background: bgGradient });
    }
    if (bgColor) {
      return styleObjectToString({ background: bgColor });
    }
    return "";
  }
  let styles = bgColor ? { background: bgColor } : {};
  if (withImage) {
    const bgImageUrl = attributes2[`${prefix}${state}BackgroundImageUrl`]?.[device];
    const bgImagePosition = attributes2[`${prefix}${state}BackgroundImagePosition`]?.[device];
    const bgAttachment = attributes2[`${prefix}${state}BackgroundImageAttachment`]?.[device];
    const bgRepeat = attributes2[`${prefix}${state}BackgroundImageRepeat`]?.[device];
    const bgSize = attributes2[`${prefix}${state}BackgroundImageSize`]?.[device];
    if (bgImageUrl) {
      styles = {
        ...styles,
        "background-image": `url(${bgImageUrl})`,
        "background-position": bgImagePosition ? `${bgImagePosition.x * 100}% ${bgImagePosition.y * 100}%` : "50% 50%",
        "background-attachment": bgAttachment || void 0,
        "background-repeat": bgRepeat || void 0,
        "background-size": bgSize || void 0
      };
    }
  }
  return styleObjectToString(styles);
};
var buildPostCardBackgroundStyles = (attributes2, state = "Normal") => {
  const bgType = attributes2[`postCard${state}BackgroundType`];
  const bgColor = attributes2[`postCard${state}ClassicColor`];
  const bgGradient = attributes2[`postCard${state}GradientColor`];
  const customGradient = attributes2[`postCard${state}CustomGradientInputValue`];
  const customGradientEnabled = attributes2[`postCard${state}CustomGradientSwitcher`];
  if (bgType === "gradient") {
    if (customGradientEnabled && customGradient) {
      return `background: ${customGradient} !important;`;
    }
    if (bgGradient) {
      return `background: ${bgGradient} !important;`;
    }
    return "";
  }
  return bgColor ? `background: ${bgColor} !important;` : "";
};
var buildGradientOrClassicBackground = (attributes2, prefix, state = "Normal") => {
  const bgType = attributes2[`${prefix}${state}BackgroundType`];
  const bgColor = attributes2[`${prefix}${state}ClassicColor`];
  const bgGradient = attributes2[`${prefix}${state}GradientColor`];
  const customGradient = attributes2[`${prefix}${state}CustomGradientInputValue`];
  const customGradientEnabled = attributes2[`${prefix}${state}CustomGradientSwitcher`];
  if (bgType === "gradient") {
    let resolved = bgColor;
    if (customGradientEnabled && customGradient) {
      resolved = customGradient;
    } else if (bgGradient) {
      resolved = bgGradient;
    }
    return `background: ${resolved};`;
  }
  return bgColor ? `background: ${bgColor};` : "";
};
var buildTitleColorStyles = (attributes2, state = "Normal") => {
  const bgType = attributes2[`postTitle${state}BackgroundType`];
  const bgColor = attributes2[`postTitle${state}ClassicColor`];
  const bgGradient = attributes2[`postTitle${state}GradientColor`];
  const customGradient = attributes2[`postTitle${state}CustomGradientInputValue`];
  const customGradientEnabled = attributes2[`postTitle${state}CustomGradientSwitcher`];
  if (bgType === "gradient") {
    const grad = customGradientEnabled ? customGradient : bgGradient;
    return grad ? `
                background: ${grad} !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
                display: inline-block;
            ` : "";
  }
  return bgColor ? `
            color: ${bgColor} !important;
            background: none !important;
            -webkit-text-fill-color: initial !important;
        ` : "";
};
var buildTypographyCss = (attributes2, prefix, device = "Desktop", textDecorationImportant = false) => {
  const fontFamily = attributes2[`${prefix}FontFamily`];
  const fontSize = attributes2[`${prefix}FontSize`]?.[device];
  const fontSizeUnit = attributes2[`${prefix}FontSizeUnits`]?.[device];
  const fontWeight = attributes2[`${prefix}FontWeight`];
  const fontStyle = attributes2[`${prefix}FontStyle`];
  const textTransform = attributes2[`${prefix}TextTransform`];
  const textDecoration = attributes2[`${prefix}TextDecoration`];
  const lineHeight = attributes2[`${prefix}LineHeight`]?.[device];
  const lineHeightUnit = attributes2[`${prefix}LineHeightUnits`]?.[device];
  const letterSpacing = attributes2[`${prefix}LetterSpacing`]?.[device];
  const letterSpacingUnit = attributes2[`${prefix}LetterSpacingUnits`]?.[device];
  const wordSpacing = attributes2[`${prefix}WordSpacing`]?.[device];
  const wordSpacingUnit = attributes2[`${prefix}WordSpacingUnits`]?.[device];
  if (device !== "Desktop") {
    return `
			${fontSize && fontSizeUnit ? `font-size: ${fontSize}${fontSizeUnit};` : ""}
			${lineHeight && lineHeightUnit ? `line-height: ${lineHeight}${lineHeightUnit};` : ""}
			${letterSpacing && letterSpacingUnit ? `letter-spacing: ${letterSpacing}${letterSpacingUnit};` : ""}
			${wordSpacing && wordSpacingUnit ? `word-spacing: ${wordSpacing}${wordSpacingUnit};` : ""}
		`;
  }
  const textDecorationSuffix = textDecorationImportant ? " !important" : "";
  return `
		${fontFamily ? `font-family: ${fontFamily};` : ""}
		${fontSize && fontSizeUnit ? `font-size: ${fontSize}${fontSizeUnit};` : ""}
		${fontWeight ? `font-weight: ${fontWeight};` : ""}
		${fontStyle ? `font-style: ${fontStyle};` : ""}
		${textTransform ? `text-transform: ${textTransform};` : ""}
		${textDecoration ? `text-decoration: ${textDecoration}${textDecorationSuffix};` : ""}
		${lineHeight && lineHeightUnit ? `line-height: ${lineHeight}${lineHeightUnit};` : ""}
		${letterSpacing && letterSpacingUnit ? `letter-spacing: ${letterSpacing}${letterSpacingUnit};` : ""}
		${wordSpacing && wordSpacingUnit ? `word-spacing: ${wordSpacing}${wordSpacingUnit};` : ""}
	`;
};
var buildReadMoreIconHoverTransform = (attributes2, device) => {
  const {
    readMoreButtonIconHoverRotation,
    readMoreButtonIconHoverAnimation
  } = attributes2;
  let transform = "";
  if (readMoreButtonIconHoverRotation?.[device]) {
    transform += `rotate(${readMoreButtonIconHoverRotation[device]}deg) `;
  }
  switch (readMoreButtonIconHoverAnimation) {
    case "slide-right":
      transform += "translateX(5px) ";
      break;
    case "slide-left":
      transform += "translateX(-5px) ";
      break;
    case "zoom-in":
      transform += "scale(1.2) ";
      break;
    case "zoom-out":
      transform += "scale(0.8) ";
      break;
    default:
      break;
  }
  return transform.trim();
};
var buildFlexJustify = (align) => {
  if (!align) {
    return "";
  }
  if (align === "left") {
    return "justify-content: flex-start;";
  }
  if (align === "right") {
    return "justify-content: flex-end;";
  }
  return "justify-content: center;";
};
var buildBadgeOverlayPositionStyles = (attributes2, device) => {
  const {
    enableTaxonomyBadgeOverlay,
    taxonomyBadgeOverlayPosition,
    taxonomyBadgeOverlayTopOffset,
    taxonomyBadgeOverlayTopOffsetUnits,
    taxonomyBadgeOverlayLeftOffset,
    taxonomyBadgeOverlayLeftOffsetUnits
  } = attributes2;
  if (!enableTaxonomyBadgeOverlay) {
    return "";
  }
  const fallbackOffset = device === "Mobile" ? 12 : 15;
  const topOffset = taxonomyBadgeOverlayTopOffset?.[device] ?? fallbackOffset;
  const topUnit = taxonomyBadgeOverlayTopOffsetUnits?.[device] ?? "px";
  const topVal = `${topOffset}${topUnit}`;
  const leftOffset = taxonomyBadgeOverlayLeftOffset?.[device] ?? fallbackOffset;
  const leftUnit = taxonomyBadgeOverlayLeftOffsetUnits?.[device] ?? "px";
  const leftVal = `${leftOffset}${leftUnit}`;
  switch (taxonomyBadgeOverlayPosition) {
    case "top-right":
      return `top: ${topVal}; right: ${leftVal}; bottom: auto; left: auto;`;
    case "bottom-left":
      return `bottom: ${topVal}; left: ${leftVal}; top: auto; right: auto;`;
    case "bottom-right":
      return `bottom: ${topVal}; right: ${leftVal}; top: auto; left: auto;`;
    case "top-left":
    default:
      return `top: ${topVal}; left: ${leftVal}; bottom: auto; right: auto;`;
  }
};
var buildNavArrowBorderRadius = (attributes2, device) => {
  const cssStyle = attributes2[`navigationArrow${device}BorderRadiusCssStyle`];
  if (cssStyle) {
    return `border-radius: ${cssStyle};`;
  }
  const obj = attributes2[`navigationArrow${device}BorderRadius`];
  if (obj) {
    return `border-radius: ${obj.top}px ${obj.right}px ${obj.bottom}px ${obj.left}px;`;
  }
  return "border-radius: 50px 50px 50px 50px;";
};

// ../../src/blocks/post-carousel/styling/buildGlobalStyles.js
var buildGlobalDesktop = (attributes2) => {
  const {
    blockId,
    globalMarginDesktopCssStyle,
    globalPaddingDesktopCssStyle,
    globalBorder,
    globalBorderDesktopCssStyle,
    globalBorderRadiusDesktopCssStyle,
    globalBorderColor,
    globalBorderHoverColor,
    globalBoxShadowCssValue,
    globalBoxShadowHoverCssValue,
    globalZIndex
  } = attributes2;
  const bgNormal = buildBackgroundStyles(attributes2, "global", "Normal", {
    device: "Desktop",
    withImage: true
  });
  const bgHover = buildBackgroundStyles(attributes2, "global", "Hover", {
    device: "Desktop",
    withImage: true
  });
  const isEqualHeight = attributes2.equalHeight ?? true;
  return `
        .${blockId}.gslider-post-carousel-wrapper {
            --gslider-autoplay-progress-color: ${attributes2.autoplayProgressColor || "#007cba"};
            --gslider-autoplay-progress-height: ${attributes2.autoplayProgressHeight || 4}px;
            --gslider-desktop-grid-columns: ${attributes2.desktopGridColumns ?? 3};
            --gslider-desktop-grid-gap: ${attributes2.desktopGridGap ?? 24}px;
            ${bgNormal}
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
            transition: all .3s ease-in-out;
        }
        .${blockId}.gslider-post-carousel-wrapper:hover {
            ${bgHover}
            ${globalBorderHoverColor ? `border-color: ${globalBorderHoverColor};` : ""}
            ${globalBoxShadowHoverCssValue ? `box-shadow: ${globalBoxShadowHoverCssValue} !important;` : ""}
        }

        .${blockId} .swiper-slide {
            display: flex;
            align-items: ${isEqualHeight ? "stretch" : "center"};
            justify-content: center;
            ${isEqualHeight ? "height: auto;" : ""}
        }
	`;
};
var buildGlobalResponsive = (attributes2, device) => {
  const { blockId, globalZIndex } = attributes2;
  const margin = attributes2[`globalMargin${device}CssStyle`];
  const padding = attributes2[`globalPadding${device}CssStyle`];
  const borderWidth = attributes2[`globalBorder${device}CssStyle`];
  const borderRadius = attributes2[`globalBorderRadius${device}CssStyle`];
  const bgNormal = buildBackgroundStyles(attributes2, "global", "Normal", {
    device,
    withImage: true
  });
  const bgHover = buildBackgroundStyles(attributes2, "global", "Hover", {
    device,
    withImage: true
  });
  return `
        .${blockId}.gslider-post-carousel-wrapper {
            ${bgNormal}
            ${margin ? `margin: ${margin};` : ""}
            ${padding ? `padding: ${padding};` : ""}
            ${borderWidth ? `border-width: ${borderWidth};` : ""}
            ${borderRadius ? `border-radius: ${borderRadius};` : ""}
            ${globalZIndex[device] ? `z-index: ${globalZIndex[device]};` : ""}
        }
        .${blockId}.gslider-post-carousel-wrapper:hover {
            ${bgHover}
        }
	`;
};
var buildContentWrapperStyles = (attributes2, device) => {
  const {
    blockId,
    layoutHeight,
    layoutHeightUnits,
    verticalAlign,
    equalHeight
  } = attributes2;
  const isEqualHeight = equalHeight ?? true;
  const hasLayoutHeight = Boolean(layoutHeight?.[device]);
  return `
        .${blockId}.gslider-post-carousel-wrapper .gslider-post-carousel-content-wrapper {
            ${hasLayoutHeight ? `height: ${layoutHeight[device]}${layoutHeightUnits[device]};` : ""}
            display: flex;
            align-items: ${isEqualHeight ? "stretch" : "center"};
            justify-content: ${isEqualHeight ? "flex-start" : verticalAlign?.[device] || "center"};
            ${isEqualHeight ? "width: 100%;" : ""}
            ${isEqualHeight && !hasLayoutHeight ? "height: 100%;" : ""}
            ${device === "Desktop" ? "transition: all .3s ease-in-out;" : ""}
        }
	`;
};

// ../../src/blocks/post-carousel/styling/buildCardMediaStyles.js
var isFullBleedImageLayout = (postLayoutMode) => postLayoutMode === "overlay" || postLayoutMode === "hero";
var getHoverEffectImageWrapperRule = (blockId, postLayoutMode, withOverflowHidden) => {
  const declarations = [];
  if (!isFullBleedImageLayout(postLayoutMode)) {
    declarations.push("position: relative;");
  }
  if (withOverflowHidden) {
    declarations.push("overflow: hidden;");
  }
  return declarations.length > 0 ? `.${blockId} .gslider-post-carousel-image { ${declarations.join(
    " "
  )} }` : "";
};
var buildCardHoverPreset = (attributes2) => {
  const { blockId, cardHoverAnimation, cardHoverAnimationDuration } = attributes2;
  switch (cardHoverAnimation) {
    case "lift":
      return `
                .${blockId} .gslider-post-carousel-card:hover {
                    transform: translateY(var(--card-hover-lift));
                    box-shadow: 0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08) !important;
                }
            `;
    case "zoom":
      return `
                .${blockId} .gslider-post-carousel-card:hover {
                    transform: scale(var(--card-hover-scale));
                }
            `;
    case "lift-zoom":
      return `
                .${blockId} .gslider-post-carousel-card:hover {
                    transform: translateY(var(--card-hover-lift)) scale(var(--card-hover-scale));
                    box-shadow: 0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08) !important;
                }
            `;
    case "pop":
      return `
                .${blockId} .gslider-post-carousel-card:hover {
                    animation: gsliderPop ${cardHoverAnimationDuration?.Desktop || 300}ms ease-in-out;
                }
            `;
    case "shadow-depth":
      return `
                .${blockId} .gslider-post-carousel-card {
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    background-color: var(--wp--preset--color--background, #ffffff);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
                }
                .${blockId} .gslider-post-carousel-card:hover {
                    transform: translateY(var(--card-hover-lift));
                    box-shadow: 0 20px 25px -5px var(--card-hover-shadow-color), 0 10px 10px -5px var(--card-hover-shadow-color) !important;
                }
            `;
    case "border-glow":
      return `
                .${blockId} .gslider-post-carousel-card {
                    padding: 15px;
                    border-radius: 8px;
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    background-color: var(--wp--preset--color--background, #ffffff);
                    box-shadow: none;
                }
                .${blockId} .gslider-post-carousel-card:hover {
                    border-color: var(--card-hover-glow-color) !important;
                    box-shadow: 0 0 var(--card-hover-glow-size) var(--card-hover-glow-color) !important;
                }
            `;
    default:
      return "";
  }
};
var buildCardDesktop = (attributes2) => {
  const {
    blockId,
    equalHeight,
    postLayoutMode = "classic",
    heroHeightDesktop = 520,
    heroHeightTablet = 420,
    heroHeightMobile = 340,
    spotlightScaleSide = 0.92,
    spotlightOpacitySide = 0.65,
    newsroomMainWidth = 65,
    horizontalMediaWidth = 45,
    overlayGradientScrim,
    overlayScrimHeight = 75,
    timelineStemColor = "#e2e8f0",
    timelineStemThickness = 2,
    timelineDotSize = 16,
    timelineDotColor = "#007cba",
    postCardMarginDesktopCssStyle,
    postCardPaddingDesktopCssStyle,
    postCardBorder,
    postCardBorderDesktopCssStyle,
    postCardBorderColor,
    postCardBorderHoverColor,
    postCardBorderRadiusDesktopCssStyle,
    postCardBoxShadowCssValue,
    postCardBoxShadowHoverCssValue,
    cardHoverAnimationDuration,
    cardHoverLift,
    cardHoverScale,
    cardHoverPopScale,
    cardHoverShadowColor,
    cardHoverGlowColor,
    cardHoverGlowSize
  } = attributes2;
  const isEqualHeight = equalHeight ?? true;
  const isHorizontalLayout = postLayoutMode === "horizontal";
  const safeMediaWidth = Math.min(
    60,
    Math.max(30, parseInt(horizontalMediaWidth, 10) || 45)
  );
  const safeScrimHeight = Math.min(
    100,
    Math.max(40, parseInt(overlayScrimHeight, 10) || 75)
  );
  const safeHeroHeightDesktop = Math.min(
    1200,
    Math.max(200, parseInt(heroHeightDesktop, 10) || 520)
  );
  const safeHeroHeightTablet = Math.min(
    1200,
    Math.max(200, parseInt(heroHeightTablet, 10) || 420)
  );
  const safeHeroHeightMobile = Math.min(
    1200,
    Math.max(200, parseInt(heroHeightMobile, 10) || 340)
  );
  const safeNewsroomMainWidth = Math.min(
    80,
    Math.max(50, parseInt(newsroomMainWidth, 10) || 65)
  );
  const safeStemThickness = Math.min(
    10,
    Math.max(1, parseInt(timelineStemThickness, 10) || 2)
  );
  const safeDotSize = Math.min(
    48,
    Math.max(8, parseInt(timelineDotSize, 10) || 16)
  );
  const sanitizeTimelineColor = (val, fallback) => {
    if (typeof val !== "string" || val.trim() === "") {
      return fallback;
    }
    const cleaned = val.trim();
    if (/[;{}<>"'\\]|url\(|expression\(/i.test(cleaned)) {
      return fallback;
    }
    return cleaned;
  };
  const safeStemColor = sanitizeTimelineColor(timelineStemColor, "#e2e8f0");
  const safeDotColor = sanitizeTimelineColor(timelineDotColor, "#007cba");
  const rawSpotlightScale = parseFloat(spotlightScaleSide);
  const safeSpotlightScale = Number(
    Math.min(
      0.98,
      Math.max(
        0.8,
        Number.isNaN(rawSpotlightScale) ? 0.92 : rawSpotlightScale
      )
    ).toFixed(2)
  );
  const rawSpotlightOpacity = parseFloat(spotlightOpacitySide);
  const safeSpotlightOpacity = Number(
    Math.min(
      1,
      Math.max(
        0.3,
        Number.isNaN(rawSpotlightOpacity) ? 0.65 : rawSpotlightOpacity
      )
    ).toFixed(2)
  );
  const defaultScrim = "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%)";
  const strippedScrim = typeof overlayGradientScrim === "string" ? overlayGradientScrim.replace(/[;{}<>]/g, "").trim() : "";
  const safeOverlayScrim = strippedScrim !== "" ? strippedScrim : defaultScrim;
  const normalBg = buildPostCardBackgroundStyles(attributes2, "Normal");
  const hoverBg = buildPostCardBackgroundStyles(attributes2, "Hover");
  const duration = cardHoverAnimationDuration?.Desktop || 300;
  return `
        .${blockId}.gslider-post-carousel-wrapper {
            --gslider-hero-height-desktop: ${safeHeroHeightDesktop}px;
            --gslider-hero-height-tablet: ${safeHeroHeightTablet}px;
            --gslider-hero-height-mobile: ${safeHeroHeightMobile}px;
            --gslider-spotlight-scale: ${safeSpotlightScale};
            --gslider-spotlight-opacity: ${safeSpotlightOpacity};
            --gslider-newsroom-main-width: ${safeNewsroomMainWidth}%;
            --gslider-timeline-stem-color: ${safeStemColor};
            --gslider-timeline-stem-thickness: ${safeStemThickness}px;
            --gslider-timeline-dot-size: ${safeDotSize}px;
            --gslider-timeline-dot-color: ${safeDotColor};
        }

        .${blockId} .gslider-post-carousel-card {
            display: ${isHorizontalLayout ? "grid" : "flex"};
            ${!isHorizontalLayout ? "flex-direction: column;" : ""}
            height: ${isEqualHeight ? "100%" : "auto"};
            width: 100%;
            box-sizing: border-box;
            --gslider-media-width: ${safeMediaWidth}%;
            --gslider-overlay-scrim: ${safeOverlayScrim};
            --gslider-overlay-scrim-height: ${safeScrimHeight}%;
            ${normalBg}
            ${postCardMarginDesktopCssStyle ? `margin: ${postCardMarginDesktopCssStyle};` : ""}
            ${postCardPaddingDesktopCssStyle ? `padding: ${postCardPaddingDesktopCssStyle};` : ""}
            ${postCardBorder ? `border-style: ${postCardBorder};` : ""}
            ${postCardBorderDesktopCssStyle ? `border-width: ${postCardBorderDesktopCssStyle};` : ""}
            ${postCardBorderColor ? `border-color: ${postCardBorderColor};` : ""}
            ${postCardBorderRadiusDesktopCssStyle ? `border-radius: ${postCardBorderRadiusDesktopCssStyle} !important;` : ""}
            ${postCardBoxShadowCssValue ? `box-shadow: ${postCardBoxShadowCssValue} !important;` : ""}
            transition: all 0.3s ease, transform ${duration}ms ease-out, box-shadow ${duration}ms ease-out, border-color ${duration}ms ease-out;
            will-change: transform, box-shadow;
            --card-hover-lift: -${cardHoverLift?.Desktop ?? 8}px;
            --card-hover-scale: ${cardHoverScale?.Desktop ?? 1.03};
            --card-hover-pop-scale: ${cardHoverPopScale?.Desktop ?? 1.06};
            --card-hover-shadow-color: ${cardHoverShadowColor || "rgba(0, 0, 0, 0.25)"};
            --card-hover-glow-color: ${cardHoverGlowColor || "rgba(0, 122, 255, 0.5)"};
            --card-hover-glow-size: ${cardHoverGlowSize?.Desktop ?? 15}px;
        }

        .${blockId} .gslider-post-carousel-card:hover {
            ${hoverBg}
            ${postCardBorderHoverColor ? `border-color: ${postCardBorderHoverColor} !important;` : ""}
            ${postCardBoxShadowHoverCssValue ? `box-shadow: ${postCardBoxShadowHoverCssValue} !important;` : ""}
        }

        ${buildCardHoverPreset(attributes2)}
	`;
};
var buildCardResponsive = (attributes2, device) => {
  const {
    blockId,
    cardHoverLift,
    cardHoverScale,
    cardHoverPopScale,
    cardHoverGlowSize,
    cardHoverAnimationDuration
  } = attributes2;
  const margin = attributes2[`postCardMargin${device}CssStyle`];
  const padding = attributes2[`postCardPadding${device}CssStyle`];
  const borderWidth = attributes2[`postCardBorder${device}CssStyle`];
  const borderRadius = attributes2[`postCardBorderRadius${device}CssStyle`];
  const duration = cardHoverAnimationDuration?.[device] || 300;
  return `
        .${blockId} .gslider-post-carousel-card {
            ${margin ? `margin: ${margin};` : ""}
            ${padding ? `padding: ${padding};` : ""}
            ${borderWidth ? `border-width: ${borderWidth};` : ""}
            ${borderRadius ? `border-radius: ${borderRadius} !important;` : ""}
            --card-hover-lift: -${cardHoverLift?.[device] ?? 8}px;
            --card-hover-scale: ${cardHoverScale?.[device] ?? 1.03};
            --card-hover-pop-scale: ${cardHoverPopScale?.[device] ?? 1.06};
            --card-hover-glow-size: ${cardHoverGlowSize?.[device] ?? 15}px;
            transition: transform ${duration}ms ease-out, box-shadow ${duration}ms ease-out, border-color ${duration}ms ease-out;
        }
	`;
};
var buildImageWrapperDesktop = (attributes2) => {
  const {
    blockId,
    postLayoutMode = "classic",
    imageHeight,
    imageHeightUnits,
    imageMarginDesktopCssStyle,
    imagePaddingDesktopCssStyle,
    imageBorder,
    imageBorderDesktopCssStyle,
    imageBorderRadiusDesktopCssStyle,
    imageBorderColor,
    imageBoxShadowCssValue,
    showFeaturedImage,
    imageTransitionDuration,
    enableTaxonomyBadgeOverlay,
    taxonomyBadgeOverlayVisibility,
    taxonomyBadgeOverlayPosition,
    postCategoryGap,
    postCategoryGapUnits,
    imageBorderHoverColor,
    imageBoxShadowHoverCssValue
  } = attributes2;
  const imageBgNormal = buildBackgroundStyles(
    attributes2,
    "image",
    "Normal"
  );
  const imageBgHover = buildBackgroundStyles(attributes2, "image", "Hover");
  const isBadgeHover = taxonomyBadgeOverlayVisibility === "hover";
  const badgeHoverTransformValue = (taxonomyBadgeOverlayPosition || "top-left").startsWith("bottom") ? "translateY(5px)" : "translateY(-5px)";
  const transitionMs = imageTransitionDuration?.Desktop || 300;
  return `
        .${blockId} .gslider-post-carousel-image {
            ${imageBgNormal}
            ${imageHeight.Desktop ? `height: ${imageHeight.Desktop}${imageHeightUnits.Desktop} !important;` : ""}
            ${imageMarginDesktopCssStyle ? `margin: ${imageMarginDesktopCssStyle};` : ""}
            ${imagePaddingDesktopCssStyle ? `padding: ${imagePaddingDesktopCssStyle};` : ""}
            ${imageBorder ? `border: ${imageBorder};` : ""}
            ${imageBorderDesktopCssStyle ? `border-width: ${imageBorderDesktopCssStyle};` : ""}
            ${imageBorderRadiusDesktopCssStyle ? `border-radius: ${imageBorderRadiusDesktopCssStyle} !important;` : ""}
            ${imageBorderColor ? `border-color: ${imageBorderColor};` : ""}
            ${imageBoxShadowCssValue ? `box-shadow: ${imageBoxShadowCssValue} !important;` : ""}
            display: ${showFeaturedImage?.Desktop ? "block" : "none"};
            overflow: hidden;
            transition: all ${transitionMs}ms ease-in-out;
        }

        ${enableTaxonomyBadgeOverlay ? `
        ${!isFullBleedImageLayout(postLayoutMode) ? `.${blockId} .gslider-post-carousel-image {
            position: relative !important;
        }` : ""}
        .${blockId} .gslider-taxonomy-badge-overlay {
            position: absolute !important;
            z-index: 10 !important;
            display: flex !important;
            flex-wrap: wrap !important;
            gap: ${postCategoryGap?.Desktop ?? 5}${postCategoryGapUnits?.Desktop ?? "px"} !important;
            pointer-events: none !important;
            transition: opacity ${transitionMs}ms ease, transform ${transitionMs}ms ease !important;
            ${buildBadgeOverlayPositionStyles(attributes2, "Desktop")}
            ${isBadgeHover ? `opacity: 0 !important; transform: ${badgeHoverTransformValue} !important;` : "opacity: 1 !important; transform: translateY(0) !important;"}
        }
        .${blockId} .gslider-taxonomy-badge-overlay a,
        .${blockId} .gslider-taxonomy-badge-overlay span {
            pointer-events: auto !important;
        }
        ${isBadgeHover ? `
        .${blockId} .gslider-post-carousel-card:hover .gslider-taxonomy-badge-overlay {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        ` : ""}
        ` : ""}

        .${blockId} .gslider-post-carousel-image:hover,
        .${blockId} .gslider-post-carousel-card.is-clickable:hover .gslider-post-carousel-image {
            ${imageBgHover}
            ${imageBorderHoverColor ? `border-color: ${imageBorderHoverColor};` : ""}
            ${imageBoxShadowHoverCssValue ? `box-shadow: ${imageBoxShadowHoverCssValue} !important;` : ""}
        }
	`;
};
var buildBadgeOverlayResponsive = (attributes2, device) => {
  const {
    blockId,
    enableTaxonomyBadgeOverlay,
    postCategoryGap,
    postCategoryGapUnits,
    imageTransitionDuration
  } = attributes2;
  if (!enableTaxonomyBadgeOverlay) {
    return "";
  }
  const duration = imageTransitionDuration?.[device] || 300;
  return `
        .${blockId} .gslider-taxonomy-badge-overlay {
            ${buildBadgeOverlayPositionStyles(attributes2, device)}
            gap: ${postCategoryGap?.[device] ?? 5}${postCategoryGapUnits?.[device] ?? "px"} !important;
            transition: opacity ${duration}ms ease, transform ${duration}ms ease !important;
        }
	`;
};
var buildImageWrapperResponsive = (attributes2, device) => {
  const { blockId, showFeaturedImage, imageHeight, imageHeightUnits } = attributes2;
  const margin = attributes2[`imageMargin${device}CssStyle`];
  const padding = attributes2[`imagePadding${device}CssStyle`];
  const borderWidth = attributes2[`imageBorder${device}CssStyle`];
  const borderRadius = attributes2[`imageBorderRadius${device}CssStyle`];
  return `
        .${blockId} .gslider-post-carousel-image {
            display: ${showFeaturedImage?.[device] ? "block" : "none"};
            ${imageHeight[device] ? `height: ${imageHeight[device]}${imageHeightUnits[device]} !important;` : ""}
            ${margin ? `margin: ${margin};` : ""}
            ${padding ? `padding: ${padding};` : ""}
            ${borderWidth ? `border-width: ${borderWidth};` : ""}
            ${borderRadius ? `border-radius: ${borderRadius} !important;` : ""}
        }
	`;
};
var buildImageTagDesktop = (attributes2) => {
  const {
    blockId,
    postLayoutMode = "classic",
    imageMaxWidth,
    imageMaxWidthUnits,
    imageObjectFit,
    imageObjectPosition,
    imageTransitionDuration,
    imageHoverOpacity,
    imageHoverScale,
    imageHoverLift,
    imageHoverLiftUnits,
    imageHoverBlur,
    imageHoverRotate,
    imageHoverGrayscale,
    imageHoverPan,
    imageHoverEffect
  } = attributes2;
  const isScaleHover = imageHoverEffect === "scale" || imageHoverEffect === "zoom-in" || imageHoverEffect === "both";
  const isGrayscaleHover = imageHoverEffect === "grayscale" || imageHoverEffect === "grayscale-to-color";
  const isBlurClearHover = imageHoverEffect === "blur-to-clear" || imageHoverEffect === "blur-clear";
  return `
        .${blockId} .gslider-post-carousel-image img,
        .${blockId} .gslider-post-carousel-image .gslider-post-carousel-placeholder-svg {
            ${imageMaxWidth.Desktop ? `max-width: ${imageMaxWidth.Desktop}${imageMaxWidthUnits.Desktop} !important;` : ""}
            height: 100% !important;
            ${imageObjectFit ? `object-fit: ${imageObjectFit} !important;` : ""}
            ${imageObjectPosition ? `object-position: ${imageObjectPosition} !important;` : ""}
            display: block;
            width: 100%;
            will-change: transform;
            transition: all ${imageTransitionDuration?.Desktop || 300}ms ease-in-out;
            --hover-opacity: ${imageHoverOpacity?.Desktop || 0.8};
            --hover-scale: ${imageHoverScale?.Desktop || 1.05};
            --hover-lift: ${imageHoverLift?.Desktop || 10}${imageHoverLiftUnits?.Desktop || "px"};
            --hover-blur: ${imageHoverBlur?.Desktop ?? 4}px;
            --hover-rotate: ${imageHoverRotate?.Desktop ?? 3}deg;
            --hover-grayscale: ${imageHoverGrayscale?.Desktop ?? 100}%;
            --hover-pan: ${imageHoverPan?.Desktop ?? 5}%;
            ${isGrayscaleHover ? "filter: grayscale(var(--hover-grayscale));" : ""}
            ${isBlurClearHover ? "filter: blur(var(--hover-blur));" : ""}
            ${imageHoverEffect === "zoom-out" ? "transform: scale(var(--hover-scale));" : ""}
            ${imageHoverEffect === "pan-left" ? "transform-origin: right center;" : ""}
            ${imageHoverEffect === "pan-right" ? "transform-origin: left center;" : ""}
        }

        .${blockId} .gslider-post-carousel-image:hover img,
        .${blockId} .gslider-post-carousel-image:hover .gslider-post-carousel-placeholder-svg,
        .${blockId} .gslider-post-carousel-card.is-clickable:hover .gslider-post-carousel-image img,
        .${blockId} .gslider-post-carousel-card.is-clickable:hover .gslider-post-carousel-image .gslider-post-carousel-placeholder-svg {
            ${imageHoverEffect === "opacity" || imageHoverEffect === "both" ? "opacity: var(--hover-opacity);" : ""}
            ${isScaleHover ? "transform: scale(var(--hover-scale));" : ""}
            ${imageHoverEffect === "zoom-rotate" ? "transform: scale(var(--hover-scale)) rotate(var(--hover-rotate));" : ""}
            ${imageHoverEffect === "zoom-out" ? "transform: scale(1);" : ""}
            ${imageHoverEffect === "move-up" ? "transform: translateY(calc(-1 * var(--hover-lift)));" : ""}
            ${isGrayscaleHover ? "filter: grayscale(0);" : ""}
            ${isBlurClearHover ? "filter: blur(0);" : ""}
            ${imageHoverEffect === "pan-left" ? "transform: scale(var(--hover-scale)) translateX(calc(-1 * var(--hover-pan)));" : ""}
            ${imageHoverEffect === "pan-right" ? "transform: scale(var(--hover-scale)) translateX(var(--hover-pan));" : ""}
        }

        ${imageHoverEffect === "shine-sweep" ? `
            ${getHoverEffectImageWrapperRule(blockId, postLayoutMode, true)}
            .${blockId} .gslider-post-carousel-image::after {
                content: '';
                position: absolute;
                top: 0; left: -100%;
                width: 60%; height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transform: skewX(-20deg);
                pointer-events: none;
                transition: left ${imageTransitionDuration?.Desktop || 600}ms ease;
            }
            .${blockId} .gslider-post-carousel-card:hover .gslider-post-carousel-image::after {
                left: 150%;
            }
        ` : ""}

        ${imageHoverEffect === "overlay-fade" ? `
            ${getHoverEffectImageWrapperRule(
    blockId,
    postLayoutMode,
    false
  )}
            .${blockId} .gslider-post-carousel-image::before {
                content: '';
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.4);
                opacity: 0;
                pointer-events: none;
                transition: opacity ${imageTransitionDuration?.Desktop || 300}ms ease;
                z-index: 1;
            }
            .${blockId} .gslider-post-carousel-card:hover .gslider-post-carousel-image::before {
                opacity: 1;
            }
        ` : ""}

        ${imageHoverEffect === "overlay-slide" ? `
            ${getHoverEffectImageWrapperRule(blockId, postLayoutMode, true)}
            .${blockId} .gslider-post-carousel-image::before {
                content: '';
                position: absolute;
                bottom: -100%; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.4);
                pointer-events: none;
                transition: bottom ${imageTransitionDuration?.Desktop || 300}ms ease;
                z-index: 1;
            }
            .${blockId} .gslider-post-carousel-card:hover .gslider-post-carousel-image::before {
                bottom: 0;
            }
        ` : ""}
	`;
};
var buildImageTagResponsive = (attributes2, device) => {
  const {
    blockId,
    imageMaxWidth,
    imageMaxWidthUnits,
    imageHoverOpacity,
    imageHoverScale,
    imageHoverLift,
    imageHoverLiftUnits,
    imageHoverBlur,
    imageHoverRotate,
    imageHoverGrayscale,
    imageHoverPan
  } = attributes2;
  return `
        .${blockId} .gslider-post-carousel-image img,
        .${blockId} .gslider-post-carousel-image .gslider-post-carousel-placeholder-svg {
            ${imageMaxWidth[device] ? `max-width: ${imageMaxWidth[device]}${imageMaxWidthUnits[device]} !important;` : ""}
            height: 100% !important;
            --hover-opacity: ${imageHoverOpacity?.[device] || 0.8};
            --hover-scale: ${imageHoverScale?.[device] || 1.05};
            --hover-lift: ${imageHoverLift?.[device] || 10}${imageHoverLiftUnits?.[device] || "px"};
            --hover-blur: ${imageHoverBlur?.[device] ?? 4}px;
            --hover-rotate: ${imageHoverRotate?.[device] ?? 3}deg;
            --hover-grayscale: ${imageHoverGrayscale?.[device] ?? 100}%;
            --hover-pan: ${imageHoverPan?.[device] ?? 5}%;
        }
	`;
};

// ../../src/blocks/post-carousel/styling/buildNavPaginationStyles.js
var buildOutsideWrapperPadding = (attributes2, device) => {
  const {
    blockId,
    navigationArrowPosition,
    navigationArrowPositionOutsidePadding,
    navigationArrowPositionOutsidePaddingUnits
  } = attributes2;
  const offsetVal = `${navigationArrowPositionOutsidePadding[device]}${navigationArrowPositionOutsidePaddingUnits[device]}`;
  let paddingRule = "";
  if (navigationArrowPosition === "top-left" || navigationArrowPosition === "top-center" || navigationArrowPosition === "top-right") {
    paddingRule = `padding: ${offsetVal} 0 0;`;
  } else if (navigationArrowPosition === "bottom-left" || navigationArrowPosition === "bottom-center" || navigationArrowPosition === "bottom-right") {
    paddingRule = `padding: 0 0 ${offsetVal};`;
  } else if (navigationArrowPosition === "center") {
    paddingRule = `padding: 0 ${offsetVal};`;
  }
  return `
        .${blockId}.gslider-post-carousel-wrapper.outside {
            ${paddingRule}
        }
	`;
};
var buildNavigationOffsets = (attributes2, device) => {
  const {
    navigationArrowPosition,
    navigationArrowPositionTopOffset,
    navigationArrowPositionTopOffsetUnits,
    navigationArrowPositionLeftOffset,
    navigationArrowPositionLeftOffsetUnits,
    navigationArrowPositionRightOffset,
    navigationArrowPositionRightOffsetUnits,
    navigationArrowPositionBottomOffset,
    navigationArrowPositionBottomOffsetUnits
  } = attributes2;
  const topVal = navigationArrowPositionTopOffset[device] ? `${navigationArrowPositionTopOffset[device]}${navigationArrowPositionTopOffsetUnits[device]}` : "0";
  const leftVal = navigationArrowPositionLeftOffset[device] ? `${navigationArrowPositionLeftOffset[device]}${navigationArrowPositionLeftOffsetUnits[device]}` : "0";
  const leftCenterVal = navigationArrowPositionLeftOffset[device] ? `${navigationArrowPositionLeftOffset[device]}${navigationArrowPositionLeftOffsetUnits[device]}` : "50%";
  const rightVal = navigationArrowPositionRightOffset[device] ? `${navigationArrowPositionRightOffset[device]}${navigationArrowPositionRightOffsetUnits[device]}` : "0";
  const bottomVal = navigationArrowPositionBottomOffset[device] ? `${navigationArrowPositionBottomOffset[device]}${navigationArrowPositionBottomOffsetUnits[device]}` : "0";
  switch (navigationArrowPosition) {
    case "top-left":
      return `top: ${topVal}; left: ${leftVal};`;
    case "top-center":
      return `top: ${topVal}; left: ${leftCenterVal}; transform: translateX(-50%);`;
    case "top-right":
      return `top: ${topVal}; right: ${rightVal};`;
    case "bottom-left":
      return `bottom: ${bottomVal}; left: ${leftVal};`;
    case "bottom-center":
      return `bottom: ${bottomVal}; left: ${leftCenterVal}; transform: translateX(-50%);`;
    case "bottom-right":
      return `bottom: ${bottomVal}; right: ${rightVal};`;
    default:
      return "";
  }
};
var buildNavigationStyles = (attributes2, device) => {
  const {
    blockId,
    navigationArrowPositionType,
    navigationArrowPosition,
    navigationArrowDirection,
    navigationArrowGap,
    navigationArrowGapUnits,
    navigationArrowColor,
    navigationArrowColorHover,
    navigationArrowBorder,
    navigationArrowBorderColor,
    navigationArrowBorderHoverColor,
    navigationArrowBoxShadowCssValue,
    navigationArrowBoxShadowHoverCssValue,
    navigationArrowWidth,
    navigationArrowWidthUnits,
    navigationArrowHeight,
    navigationArrowHeightUnits,
    navigationArrowSize,
    navigationArrowSizeUnits
  } = attributes2;
  const isDesktop = device === "Desktop";
  const wrapperSelector = `.${blockId} .gslider-navigation-default-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition}, .${blockId} .gslider-navigation-custom-icon-wrapper.${navigationArrowPositionType}.${navigationArrowPosition}`;
  const borderWidth = attributes2[`navigationArrow${device}BorderCssStyle`];
  const borderRadiusRule = buildNavArrowBorderRadius(attributes2, device);
  const gapVal = navigationArrowGap[device] ? `${navigationArrowGap[device]}${navigationArrowGapUnits[device]}` : "10px";
  const arrowWidth = navigationArrowWidth[device] ? `width: ${navigationArrowWidth[device]}${navigationArrowWidthUnits[device]};` : "";
  const arrowHeight = navigationArrowHeight[device] ? `height: ${navigationArrowHeight[device]}${navigationArrowHeightUnits[device]};` : "";
  const iconWidth = navigationArrowSize[device] ? `width: ${navigationArrowSize[device]}${navigationArrowSizeUnits[device]};` : "";
  const iconHeight = navigationArrowSize[device] ? `height: ${navigationArrowSize[device]}${navigationArrowSizeUnits[device]};` : "";
  const iconFontSize = navigationArrowSize[device] ? `font-size: ${navigationArrowSize[device]}${navigationArrowSizeUnits[device]};` : "";
  if (!isDesktop) {
    return `
            ${buildOutsideWrapperPadding(attributes2, device)}

            ${navigationArrowPosition && navigationArrowPosition !== "center" ? `
                ${wrapperSelector} {
                    gap: ${gapVal};
                    ${buildNavigationOffsets(attributes2, device)}
                }
            ` : ""}

            .${blockId} .swiper-button-prev,
            .${blockId} .swiper-button-next {
                ${borderWidth ? `border-width: ${borderWidth};` : ""}
                ${borderRadiusRule}
                ${arrowWidth}
                ${arrowHeight}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
                ${iconWidth}
                ${iconHeight}
            }

            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
            .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
                ${iconWidth}
                ${iconHeight}
            }

            .${blockId} .swiper-button-prev:after,
            .${blockId} .swiper-button-next:after {
                ${iconFontSize}
            }
		`;
  }
  const bgNormal = buildGradientOrClassicBackground(
    attributes2,
    "navigationArrow",
    "Normal"
  );
  const bgHover = buildGradientOrClassicBackground(
    attributes2,
    "navigationArrow",
    "Hover"
  );
  return `
        ${buildOutsideWrapperPadding(attributes2, "Desktop")}

        ${wrapperSelector} {
            z-index: 100 !important;
        }

        ${navigationArrowPosition && navigationArrowPosition !== "center" ? `
            ${wrapperSelector} {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: ${navigationArrowDirection};
                gap: ${gapVal};
                position: absolute;
                z-index: 100;
                ${buildNavigationOffsets(attributes2, "Desktop")}
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
            ${bgNormal}
            ${navigationArrowBorder ? `border: ${navigationArrowBorder};` : ""}
            ${borderWidth ? `border-width: ${borderWidth};` : ""}
            ${borderRadiusRule}
            ${navigationArrowBorderColor ? `border-color: ${navigationArrowBorderColor};` : ""}
            ${navigationArrowBoxShadowCssValue ? `box-shadow: ${navigationArrowBoxShadowCssValue};` : ""}
            ${arrowWidth}
            ${arrowHeight}
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            line-height: 1;
            cursor: pointer;
            appearance: none;
            -webkit-appearance: none;
            transition: all .3s ease-in-out;
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
        .${blockId} .swiper-button-prev:hover,
        .${blockId} .swiper-button-next:hover {
            ${navigationArrowColorHover ? `color: ${navigationArrowColorHover};` : ""}
            ${bgHover}
            ${navigationArrowBorderHoverColor ? `border-color: ${navigationArrowBorderHoverColor};` : ""}
            ${navigationArrowBoxShadowHoverCssValue ? `box-shadow: ${navigationArrowBoxShadowHoverCssValue};` : ""}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev svg,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next svg {
            ${navigationArrowColor ? `fill: ${navigationArrowColor};` : ""}
            ${iconWidth}
            ${iconHeight}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev img,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next img {
            ${iconWidth}
            ${iconHeight}
        }

        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-prev:hover svg,
        .${blockId} .gslider-navigation-custom-icon-wrapper .swiper-button-next:hover svg {
            ${navigationArrowColorHover ? `fill: ${navigationArrowColorHover};` : ""}
        }

        .${blockId} .swiper-button-prev:after,
        .${blockId} .swiper-button-next:after {
            ${iconFontSize}
        }
	`;
};
var buildPaginationPositionRule = (attributes2, device) => {
  const {
    paginationType,
    paginationProgressbarPosition,
    paginationProgressbarPositionUnits,
    paginationDotsPosition,
    paginationDotsPositionUnits
  } = attributes2;
  if (paginationType === "progressbar") {
    return paginationProgressbarPosition[device] ? `top: ${paginationProgressbarPosition[device]}${paginationProgressbarPositionUnits[device]} !important;` : "";
  }
  return paginationDotsPosition[device] ? `bottom: ${paginationDotsPosition[device]}${paginationDotsPositionUnits[device]} !important;` : "";
};
var buildPaginationStyles = (attributes2, device) => {
  const {
    blockId,
    paginationPositionType,
    paginationOutsideOffset,
    paginationOutsideOffsetUnits,
    paginationNormalDotsBgColor,
    paginationNormalDotsBorder,
    paginationNormalDotsBorderColor,
    paginationNormalDotsWidth,
    paginationNormalDotsWidthUnits,
    paginationNormalDotsHeight,
    paginationNormalDotsHeightUnits,
    paginationActiveDotsBgColor,
    paginationActiveDotsBorder,
    paginationActiveDotsBorderColor,
    paginationActiveDotsWidth,
    paginationActiveDotsWidthUnits,
    paginationActiveDotsHeight,
    paginationActiveDotsHeightUnits,
    paginationFractionColor,
    paginationFractionColorHover,
    paginationProgressbarBGColor,
    paginationProgressbarBGActiveColor,
    paginationProgressbarHeight,
    paginationProgressbarHeightUnits
  } = attributes2;
  const isDesktop = device === "Desktop";
  const dotsMargin = attributes2[`paginationDots${device}MarginCssStyle`];
  const normalBorderWidth = attributes2[`paginationNormalDots${device}BorderCssStyle`];
  const normalBorderRadius = attributes2[`paginationNormalDots${device}BorderRadiusCssStyle`];
  const activeBorderWidth = attributes2[`paginationActiveDots${device}BorderCssStyle`];
  const activeBorderRadius = attributes2[`paginationActiveDots${device}BorderRadiusCssStyle`];
  const outsideOffset = paginationOutsideOffset[device] ? `${paginationOutsideOffset[device]}${paginationOutsideOffsetUnits[device]}` : "30px";
  const outsideBulletsRule = `
        .${blockId}.gslider-post-carousel-wrapper .swiper-horizontal>.swiper-pagination-bullets,
        .${blockId}.gslider-post-carousel-wrapper .swiper-pagination-bullets.swiper-pagination-horizontal,
        .${blockId}.gslider-post-carousel-wrapper .swiper-pagination-custom,
        .${blockId}.gslider-post-carousel-wrapper .swiper-pagination-fraction {
            bottom: -${outsideOffset} !important;
        }
	`;
  const hasPaginationRule = `
        .${blockId}.gslider-post-carousel-wrapper.has-pagination {
            margin-bottom: ${outsideOffset};
        }
	`;
  if (!isDesktop) {
    return `
            .${blockId} .swiper-pagination {
                ${buildPaginationPositionRule(attributes2, device)}
                ${dotsMargin ? `margin: ${dotsMargin};` : ""}
            }

            .${blockId} .swiper-pagination-bullet {
                ${normalBorderWidth ? `border-width: ${normalBorderWidth};` : ""}
                ${normalBorderRadius ? `border-radius: ${normalBorderRadius};` : ""}
                ${paginationNormalDotsWidth[device] ? `width: ${paginationNormalDotsWidth[device]}${paginationNormalDotsWidthUnits[device]};` : ""}
                ${paginationNormalDotsHeight[device] ? `height: ${paginationNormalDotsHeight[device]}${paginationNormalDotsHeightUnits[device]};` : ""}
            }

            .${blockId} .swiper-pagination-bullet-active {
                ${activeBorderWidth ? `border-width: ${activeBorderWidth};` : ""}
                ${activeBorderRadius ? `border-radius: ${activeBorderRadius};` : ""}
                ${paginationActiveDotsWidth[device] ? `width: ${paginationActiveDotsWidth[device]}${paginationActiveDotsWidthUnits[device]};` : ""}
                ${paginationActiveDotsHeight[device] ? `height: ${paginationActiveDotsHeight[device]}${paginationActiveDotsHeightUnits[device]};` : ""}
            }

            .${blockId} .swiper-pagination-fraction {
                ${buildTypographyCss(
      attributes2,
      "paginationFraction",
      device
    )}
            }

            .${blockId} .swiper-pagination-progressbar {
                ${paginationProgressbarHeight[device] ? `height: ${paginationProgressbarHeight[device]}${paginationProgressbarHeightUnits[device]};` : ""}
            }

            ${paginationPositionType === "outside" ? `
                ${outsideBulletsRule}
                ${hasPaginationRule}
            ` : ""}
		`;
  }
  return `
        .${blockId} .swiper-pagination {
            ${buildPaginationPositionRule(attributes2, "Desktop")}
            ${dotsMargin ? `margin: ${dotsMargin};` : ""}
        }

        .${blockId} .swiper-pagination-bullet {
            ${paginationNormalDotsBgColor ? `background-color: ${paginationNormalDotsBgColor};` : ""}
            ${paginationNormalDotsBorder ? `border: ${paginationNormalDotsBorder};` : ""}
            ${normalBorderWidth ? `border-width: ${normalBorderWidth};` : ""}
            ${normalBorderRadius ? `border-radius: ${normalBorderRadius};` : ""}
            ${paginationNormalDotsBorderColor ? `border-color: ${paginationNormalDotsBorderColor};` : ""}
            ${paginationNormalDotsWidth.Desktop ? `width: ${paginationNormalDotsWidth.Desktop}${paginationNormalDotsWidthUnits.Desktop};` : ""}
            ${paginationNormalDotsHeight.Desktop ? `height: ${paginationNormalDotsHeight.Desktop}${paginationNormalDotsHeightUnits.Desktop};` : ""}
        }

        .${blockId} .swiper-pagination-bullet-active {
            ${paginationActiveDotsBgColor ? `background-color: ${paginationActiveDotsBgColor};` : ""}
            ${paginationActiveDotsBorder ? `border: ${paginationActiveDotsBorder};` : ""}
            ${activeBorderWidth ? `border-width: ${activeBorderWidth};` : ""}
            ${activeBorderRadius ? `border-radius: ${activeBorderRadius};` : ""}
            ${paginationActiveDotsBorderColor ? `border-color: ${paginationActiveDotsBorderColor};` : ""}
            ${paginationActiveDotsWidth.Desktop ? `width: ${paginationActiveDotsWidth.Desktop}${paginationActiveDotsWidthUnits.Desktop};` : ""}
            ${paginationActiveDotsHeight.Desktop ? `height: ${paginationActiveDotsHeight.Desktop}${paginationActiveDotsHeightUnits.Desktop};` : ""}
        }

        .${blockId} .swiper-pagination-fraction {
            ${buildTypographyCss(
    attributes2,
    "paginationFraction",
    "Desktop"
  )}
            ${paginationFractionColor ? `color: ${paginationFractionColor};` : ""}
            transition: all .3s ease-in-out;
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

        ${paginationPositionType === "outside" ? outsideBulletsRule : ""}

        ${hasPaginationRule}
	`;
};

// ../../src/blocks/post-carousel/styling/buildTypographyStyles.js
var getDividerMarginRight = (align) => {
  if (align === "center") {
    return "auto";
  }
  return align === "right" ? "0" : "auto";
};
var buildTitleUnderlineAnim = (attributes2, device) => {
  const {
    blockId,
    enablePostTitleHoverUnderlineAnim,
    postTitleHoverUnderlineBottomOffset,
    postTitleHoverUnderlineHeight,
    postTitleHoverUnderlineColor,
    postTitleNormalClassicColor,
    postTitleHoverUnderlineTransitionSpeed
  } = attributes2;
  if (!enablePostTitleHoverUnderlineAnim) {
    return "";
  }
  const bottomOffset = postTitleHoverUnderlineBottomOffset?.[device] || "-2";
  const height = postTitleHoverUnderlineHeight?.[device] || "2";
  const speed = postTitleHoverUnderlineTransitionSpeed?.[device] || "0.3";
  if (device !== "Desktop") {
    return `
            .${blockId} .gslider-post-carousel-title .gslider-post-title-text::after {
                bottom: ${bottomOffset}px !important;
                height: ${height}px !important;
                transition: transform ${speed}s ease-in-out !important;
            }
		`;
  }
  return `
        .${blockId} .gslider-post-carousel-title .gslider-post-title-text {
            position: relative !important;
            display: inline-block;
        }
        .${blockId} .gslider-post-carousel-title a {
            text-decoration: none !important;
        }
        .${blockId} .gslider-post-carousel-title .gslider-post-title-text::after {
            content: '' !important;
            position: absolute !important;
            left: 0 !important;
            bottom: ${bottomOffset}px !important;
            width: 100% !important;
            height: ${height}px !important;
            background-color: ${postTitleHoverUnderlineColor || postTitleNormalClassicColor || "#333"} !important;
            transform: scaleX(0) !important;
            transform-origin: left !important;
            transition: transform ${speed}s ease-in-out !important;
            pointer-events: none;
        }
        .${blockId} .gslider-post-carousel-card:hover .gslider-post-carousel-title .gslider-post-title-text::after {
            transform: scaleX(1) !important;
        }
	`;
};
var buildTitleDivider = (attributes2, device) => {
  const {
    blockId,
    showPostTitleDivider,
    postTitleAlign,
    postTitleDividerWidth,
    postTitleDividerWidthUnits,
    postTitleDividerHeight,
    postTitleDividerHeightUnits,
    postTitleDividerStyle,
    postTitleDividerColor,
    postTitleDividerHoverColor,
    postTitleNormalCustomGradientSwitcher,
    postTitleNormalCustomGradientInputValue,
    postTitleNormalGradientColor,
    enablePostTitleDividerHoverExpand
  } = attributes2;
  if (!showPostTitleDivider) {
    return "";
  }
  const align = postTitleAlign[device];
  const marginLeft = align === "center" ? "auto" : "0";
  const marginRight = getDividerMarginRight(align);
  const widthVal = `${postTitleDividerWidth[device]}${postTitleDividerWidthUnits[device]}`;
  const heightVal = `${postTitleDividerHeight[device]}${postTitleDividerHeightUnits[device]}`;
  if (device !== "Desktop") {
    const sizeRule = postTitleDividerStyle === "gradient" ? `height: ${heightVal} !important;` : `border-bottom-width: ${heightVal} !important;`;
    return `
            .${blockId} .gslider-post-carousel-title-wrapper.has-divider::after {
                margin-left: ${marginLeft} !important;
                margin-right: ${marginRight} !important;
                width: ${widthVal} !important;
                ${sizeRule}
            }
		`;
  }
  const dividerBackground = postTitleNormalCustomGradientSwitcher ? postTitleNormalCustomGradientInputValue : postTitleNormalGradientColor || "linear-gradient(90deg, #333, #666)";
  const dividerStyleCss = postTitleDividerStyle === "gradient" ? `
                height: ${heightVal} !important;
                background: ${dividerBackground} !important;
                border: none !important;
            ` : `border-bottom: ${heightVal} ${postTitleDividerStyle} ${postTitleDividerColor} !important;`;
  return `
        .${blockId} .gslider-post-carousel-title-wrapper.has-divider::after {
            content: '' !important;
            display: block !important;
            margin-top: 10px !important;
            margin-left: ${marginLeft} !important;
            margin-right: ${marginRight} !important;
            width: ${widthVal} !important;
            height: 0 !important;
            ${dividerStyleCss}
            transition: all 0.3s ease-in-out !important;
        }
        .${blockId} .gslider-post-carousel-card:hover .gslider-post-carousel-title-wrapper.has-divider::after {
            ${postTitleDividerHoverColor && postTitleDividerStyle !== "gradient" ? `border-color: ${postTitleDividerHoverColor} !important;` : ""}
            ${enablePostTitleDividerHoverExpand ? "width: 100% !important;" : ""}
        }
	`;
};
var buildTitleStyles = (attributes2, device) => {
  const { blockId, postTitleAlign } = attributes2;
  const margin = attributes2[`postTitle${device}MarginCssStyle`];
  const padding = attributes2[`postTitle${device}PaddingCssStyle`];
  const isDesktop = device === "Desktop";
  const normalColor = isDesktop ? buildTitleColorStyles(attributes2, "Normal") : "";
  const hoverColor = isDesktop ? buildTitleColorStyles(attributes2, "Hover") : "";
  return `
        .${blockId} .gslider-post-carousel-title-wrapper .gslider-post-carousel-title {
            ${postTitleAlign?.[device] ? `text-align: ${postTitleAlign[device]};` : ""}
            ${buildTypographyCss(attributes2, "postTitle", device)}
            ${normalColor}
            ${margin ? `margin: ${margin};` : ""}
            ${padding ? `padding: ${padding};` : ""}
            ${isDesktop ? "transition: all .3s ease-in-out;" : ""}
        }

        ${isDesktop ? `
            .${blockId} .gslider-post-carousel-title-wrapper .gslider-post-carousel-title a {
                ${normalColor}
                transition: all .3s ease-in-out;
            }

            .${blockId} .gslider-post-carousel-title-wrapper .gslider-post-carousel-title a:hover {
                ${hoverColor}
            }
        ` : ""}

        ${buildTitleUnderlineAnim(attributes2, device)}
        ${buildTitleDivider(attributes2, device)}
	`;
};
var buildExcerptStyles = (attributes2, device) => {
  const {
    blockId,
    postExcerptAlign,
    postExcerptColor,
    postExcerptColorHover,
    postExcerptLineClamp
  } = attributes2;
  const isDesktop = device === "Desktop";
  const margin = attributes2[`postExcerpt${device}MarginCssStyle`];
  const padding = attributes2[`postExcerpt${device}PaddingCssStyle`];
  const lineClamp = postExcerptLineClamp?.[device] ? `
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: ${postExcerptLineClamp[device]};
        ` : "";
  return `
        .${blockId} .gslider-post-carousel-excerpt-wrapper .gslider-post-carousel-excerpt {
            ${postExcerptAlign?.[device] ? `text-align: ${postExcerptAlign[device]};` : ""}
            ${buildTypographyCss(attributes2, "postExcerpt", device)}
            ${isDesktop && postExcerptColor ? `color: ${postExcerptColor};` : ""}
            ${margin ? `margin: ${margin};` : ""}
            ${padding ? `padding: ${padding};` : ""}
            ${lineClamp}
            ${isDesktop ? "transition: all .3s ease-in-out;" : ""}
        }

        ${isDesktop ? `
            .${blockId} .gslider-post-carousel-excerpt-wrapper .gslider-post-carousel-excerpt:hover {
                ${postExcerptColorHover ? `color: ${postExcerptColorHover};` : ""}
            }
        ` : ""}
	`;
};

// ../../src/blocks/post-carousel/styling/buildMetaReadmoreStyles.js
var buildElementVisibilityStyles = (attributes2, device) => {
  const {
    blockId,
    showPostTitle,
    showExcerpt,
    showMeta,
    showMetaAuthor,
    showMetaAvatar,
    showMetaDate
  } = attributes2;
  return `
        .${blockId} .gslider-post-carousel-title-wrapper {
            display: ${showPostTitle?.[device] ? "block" : "none"};
        }

        .${blockId} .gslider-post-carousel-excerpt-wrapper {
            display: ${showExcerpt?.[device] ? "block" : "none"};
        }

        .${blockId} .gslider-post-carousel-meta {
            display: ${showMeta?.[device] ? "flex" : "none"};
        }

        .${blockId} .gslider-post-carousel-meta .gslider-post-author-wrapper {
            display: ${showMetaAuthor?.[device] ?? true ? "flex" : "none"};
        }

        .${blockId} .gslider-post-carousel-meta .gslider-post-author-wrapper .gslider-post-author-avatar-wrapper {
            display: ${showMetaAvatar?.[device] ?? true ? "flex" : "none"};
        }

        .${blockId} .gslider-post-carousel-meta .gslider-post-date-wrapper {
            display: ${showMetaDate?.[device] ?? true ? "flex" : "none"};
        }
	`;
};
var buildTaxonomyStyles = (attributes2, prefix, className, device) => {
  const { blockId, showTaxonomy } = attributes2;
  const isDesktop = device === "Desktop";
  const align = attributes2[`${prefix}Align`]?.[device];
  const gap = attributes2[`${prefix}Gap`]?.[device];
  const gapUnit = attributes2[`${prefix}GapUnits`]?.[device];
  const margin = attributes2[`${prefix}${device}MarginCssStyle`];
  const padding = attributes2[`${prefix}${device}PaddingCssStyle`];
  const itemPadding = attributes2[`${prefix}Item${device}PaddingCssStyle`];
  const borderWidth = attributes2[`${prefix}Border${device}CssStyle`];
  const borderRadius = attributes2[`${prefix}BorderRadius${device}CssStyle`];
  if (!isDesktop) {
    return `
            .${blockId} .${className} {
                display: ${showTaxonomy?.[device] ? "flex" : "none"};
                ${buildFlexJustify(align)}
                ${gap ? `gap: ${gap}${gapUnit};` : ""}
                ${margin ? `margin: ${margin};` : ""}
                ${padding ? `padding: ${padding};` : ""}
            }

            .${blockId} .${className} span {
                ${buildTypographyCss(attributes2, prefix, device)}
                ${itemPadding ? `padding: ${itemPadding};` : ""}
                ${borderWidth ? `border-width: ${borderWidth};` : ""}
                ${borderRadius ? `border-radius: ${borderRadius} !important;` : ""}
            }
		`;
  }
  const bgNormal = buildBackgroundStyles(attributes2, prefix, "Normal");
  const bgHover = buildBackgroundStyles(attributes2, prefix, "Hover");
  const color = attributes2[`${prefix}Color`];
  const colorHover = attributes2[`${prefix}ColorHover`];
  const border = attributes2[`${prefix}Border`];
  const borderColor = attributes2[`${prefix}BorderColor`];
  const borderHoverColor = attributes2[`${prefix}BorderHoverColor`];
  const boxShadow = attributes2[`${prefix}BoxShadowCssValue`];
  const boxShadowHover = attributes2[`${prefix}BoxShadowHoverCssValue`];
  return `
        .${blockId} .${className} {
            display: ${showTaxonomy?.Desktop ? "flex" : "none"};
            flex-wrap: wrap;
            ${buildFlexJustify(align)}
            ${gap ? `gap: ${gap}${gapUnit};` : ""}
            ${margin ? `margin: ${margin};` : ""}
            ${padding ? `padding: ${padding};` : ""}
        }

        .${blockId} .${className} span {
            ${bgNormal}
            ${color ? `color: ${color};` : ""}
            ${buildTypographyCss(attributes2, prefix, "Desktop")}
            ${itemPadding ? `padding: ${itemPadding};` : ""}
            ${border ? `border: ${border};` : ""}
            ${borderWidth ? `border-width: ${borderWidth};` : ""}
            ${borderRadius ? `border-radius: ${borderRadius} !important;` : ""}
            ${borderColor ? `border-color: ${borderColor};` : ""}
            ${boxShadow ? `box-shadow: ${boxShadow} !important;` : ""}
            display: inline-flex;
            align-items: center;
            transition: all .3s ease-in-out;
        }

        .${blockId} .${className} span:hover {
            ${bgHover}
            ${colorHover ? `color: ${colorHover};` : ""}
            ${borderHoverColor ? `border-color: ${borderHoverColor};` : ""}
            ${boxShadowHover ? `box-shadow: ${boxShadowHover} !important;` : ""}
        }

        .${blockId} .${className} span a {
            ${color ? `color: ${color};` : ""}
            transition: all .3s ease-in-out;
            text-decoration: none;
        }

        .${blockId} .${className} span:hover a {
            ${colorHover ? `color: ${colorHover};` : ""}
        }
	`;
};
var buildAuthorImageStyles = (attributes2, device) => {
  const {
    blockId,
    authorImageSize,
    authorImageSizeUnits,
    authorImageBorder,
    authorImageBorderColor,
    authorImageBorderHoverColor
  } = attributes2;
  const isDesktop = device === "Desktop";
  const size = authorImageSize?.[device];
  const sizeUnit = authorImageSizeUnits?.[device] || "px";
  const borderWidth = attributes2[`authorImage${device}BorderWidthCssStyle`];
  const borderRadius = attributes2[`authorImage${device}BorderRadiusCssStyle`];
  const margin = attributes2[`authorImage${device}MarginCssStyle`];
  const padding = attributes2[`authorImage${device}PaddingCssStyle`];
  if (!isDesktop) {
    return `
            .${blockId} .gslider-post-carousel-meta .gslider-post-author-wrapper .gslider-post-author-avatar-wrapper {
                ${size ? `width: ${size}${sizeUnit};` : ""}
                ${size ? `height: ${size}${sizeUnit};` : ""}
                ${borderWidth ? `border-width: ${borderWidth};` : ""}
                ${borderRadius ? `border-radius: ${borderRadius};` : ""}
                ${margin ? `margin: ${margin};` : ""}
                ${padding ? `padding: ${padding};` : ""}
            }
		`;
  }
  return `
        .${blockId} .gslider-post-carousel-meta .gslider-post-author-wrapper .gslider-post-author-avatar-wrapper {
            ${size ? `width: ${size}${sizeUnit};` : ""}
            ${size ? `height: ${size}${sizeUnit};` : ""}
            ${authorImageBorder !== "none" ? `border-style: ${authorImageBorder};` : ""}
            ${borderWidth ? `border-width: ${borderWidth};` : ""}
            ${authorImageBorderColor ? `border-color: ${authorImageBorderColor};` : ""}
            ${borderRadius ? `border-radius: ${borderRadius};` : ""}
            ${margin ? `margin: ${margin};` : ""}
            ${padding ? `padding: ${padding};` : ""}
            overflow: hidden;
            transition: all 0.3s ease-in-out;
        }
        .${blockId} .gslider-post-carousel-meta .gslider-post-author-wrapper .gslider-post-author-avatar {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .${blockId} .gslider-post-carousel-meta .gslider-post-author-wrapper:hover .gslider-post-author-avatar-wrapper {
            ${authorImageBorderHoverColor ? `border-color: ${authorImageBorderHoverColor};` : ""}
        }
	`;
};
var buildAuthorNameStyles = (attributes2, device) => {
  const { blockId, authorNameColor, authorNameColorHover } = attributes2;
  const isDesktop = device === "Desktop";
  const margin = attributes2[`authorName${device}MarginCssStyle`];
  const padding = attributes2[`authorName${device}PaddingCssStyle`];
  return `
        .${blockId} .gslider-post-carousel-meta .gslider-post-author-wrapper .gslider-post-author {
            ${buildTypographyCss(attributes2, "authorName", device)}
            ${isDesktop && authorNameColor ? `color: ${authorNameColor};` : ""}
            ${margin ? `margin: ${margin};` : ""}
            ${padding ? `padding: ${padding};` : ""}
            ${isDesktop ? "transition: all 0.3s ease-in-out;" : ""}
        }
        ${isDesktop ? `
            .${blockId} .gslider-post-carousel-meta .gslider-post-author-wrapper:hover .gslider-post-author {
                ${authorNameColorHover ? `color: ${authorNameColorHover};` : ""}
            }
        ` : ""}
	`;
};
var buildPostDateStyles = (attributes2, device) => {
  const { blockId, postDateColor, postDateColorHover } = attributes2;
  const isDesktop = device === "Desktop";
  const margin = attributes2[`postDate${device}MarginCssStyle`];
  const padding = attributes2[`postDate${device}PaddingCssStyle`];
  return `
        .${blockId} .gslider-post-carousel-meta .gslider-post-date-wrapper {
            ${margin ? `margin: ${margin};` : ""}
            ${padding ? `padding: ${padding};` : ""}
            ${isDesktop ? "transition: all 0.3s ease-in-out;" : ""}
        }
        .${blockId} .gslider-post-carousel-meta .gslider-post-date-wrapper .gslider-post-date {
            ${buildTypographyCss(attributes2, "postDate", device)}
            ${isDesktop && postDateColor ? `color: ${postDateColor};` : ""}
            ${isDesktop ? "transition: all 0.3s ease-in-out;" : ""}
        }
        ${isDesktop && postDateColorHover ? `
            .${blockId} .gslider-post-carousel-meta .gslider-post-date-wrapper:hover .gslider-post-date {
                color: ${postDateColorHover};
            }
        ` : ""}
	`;
};
var buildReadMoreHoverAnimRule = (animation) => {
  switch (animation) {
    case "grow":
      return "transform: scale(1.05);";
    case "shrink":
      return "transform: scale(0.95);";
    case "float":
      return "transform: translateY(-5px);";
    case "shift-right":
      return "transform: translateX(6px);";
    case "pulse":
      return "animation: gsliderPulse 1s infinite ease-in-out;";
    default:
      return "";
  }
};
var buildReadMoreStyles = (attributes2, device) => {
  const {
    blockId,
    showReadMoreButton,
    readMoreButtonAlign,
    readMoreButtonColor,
    readMoreButtonColorHover,
    readMoreButtonBorder,
    readMoreButtonBorderColor,
    readMoreButtonBorderHoverColor,
    readMoreButtonBoxShadowCssValue,
    readMoreButtonBoxShadowHoverCssValue,
    readMoreButtonWidth,
    readMoreButtonHoverAnimation,
    readMoreButtonIconGap,
    readMoreButtonIconGapUnits,
    readMoreButtonIconWidth,
    readMoreButtonIconWidthUnits,
    readMoreButtonIconHeight,
    readMoreButtonIconHeightUnits,
    readMoreButtonIconSize,
    readMoreButtonIconSizeUnits,
    readMoreButtonIconBorder,
    readMoreButtonIconBorderColor,
    readMoreButtonIconBorderHoverColor,
    readMoreButtonIconBoxShadowCssValue,
    readMoreButtonIconBoxShadowHoverCssValue,
    readMoreButtonIconRotation,
    readMoreButtonIconColor,
    readMoreButtonIconColorHover
  } = attributes2;
  const isDesktop = device === "Desktop";
  const btnMargin = attributes2[`readMoreButton${device}MarginCssStyle`];
  const btnBorderWidth = attributes2[`readMoreButton${device}BorderCssStyle`];
  const btnBorderRadius = attributes2[`readMoreButton${device}BorderRadiusCssStyle`];
  const btnPadding = attributes2[`readMoreButton${device}PaddingCssStyle`];
  const iconBorderWidth = attributes2[`readMoreButtonIcon${device}BorderCssStyle`];
  const iconBorderRadius = attributes2[`readMoreButtonIcon${device}BorderRadiusCssStyle`];
  const iconGap = readMoreButtonIconGap?.[device] ? `gap: ${readMoreButtonIconGap[device]}${readMoreButtonIconGapUnits[device]};` : "";
  const iconWidth = readMoreButtonIconWidth[device] ? `width: ${readMoreButtonIconWidth[device]}${readMoreButtonIconWidthUnits[device]};` : "";
  const iconHeight = readMoreButtonIconHeight[device] ? `height: ${readMoreButtonIconHeight[device]}${readMoreButtonIconHeightUnits[device]};` : "";
  const iconSizeWidth = readMoreButtonIconSize[device] ? `width: ${readMoreButtonIconSize[device]}${readMoreButtonIconSizeUnits[device]};` : "";
  const iconSizeHeight = readMoreButtonIconSize[device] ? `height: ${readMoreButtonIconSize[device]}${readMoreButtonIconSizeUnits[device]};` : "";
  const iconRotation = readMoreButtonIconRotation?.[device] ? `transform: rotate(${readMoreButtonIconRotation[device]}deg);` : "";
  const hoverTransform = buildReadMoreIconHoverTransform(
    attributes2,
    device
  );
  if (!isDesktop) {
    return `
            .${blockId} .gslider-post-carousel-readmore {
                display: ${showReadMoreButton?.[device] ? "block" : "none"};
                ${btnMargin ? `margin: ${btnMargin};` : ""}
                ${readMoreButtonAlign?.[device] ? `text-align: ${readMoreButtonAlign[device]};` : ""}
            }

            .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn {
                ${buildTypographyCss(attributes2, "readMoreButton", device)}
                ${btnBorderWidth ? `border-width: ${btnBorderWidth};` : ""}
                ${btnBorderRadius ? `border-radius: ${btnBorderRadius};` : ""}
                ${btnPadding ? `padding: ${btnPadding};` : ""}
                ${iconGap}
            }

            .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap {
                ${iconWidth}
                ${iconHeight}
                ${iconBorderWidth ? `border-width: ${iconBorderWidth};` : ""}
                ${iconBorderRadius ? `border-radius: ${iconBorderRadius};` : ""}
                ${iconRotation}
            }

            .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:hover .gslider-readmore-icon-wrap {
                ${hoverTransform ? `transform: ${hoverTransform};` : ""}
            }

            .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap svg {
                ${iconSizeWidth}
                ${iconSizeHeight}
            }

            .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap img {
                ${iconSizeWidth}
                ${iconSizeHeight}
            }
		`;
  }
  const btnBgNormal = buildGradientOrClassicBackground(
    attributes2,
    "readMoreButton",
    "Normal"
  );
  const btnBgHover = buildGradientOrClassicBackground(
    attributes2,
    "readMoreButton",
    "Hover"
  );
  const iconBgNormal = buildGradientOrClassicBackground(
    attributes2,
    "readMoreButtonIcon",
    "Normal"
  );
  const iconBgHover = buildGradientOrClassicBackground(
    attributes2,
    "readMoreButtonIcon",
    "Hover"
  );
  return `
        .${blockId} .gslider-post-carousel-readmore {
            display: ${showReadMoreButton?.Desktop ? "block" : "none"};
            ${btnMargin ? `margin: ${btnMargin};` : ""}
            ${readMoreButtonAlign?.Desktop ? `text-align: ${readMoreButtonAlign.Desktop};` : ""}
        }

        .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn {
            ${buildTypographyCss(
    attributes2,
    "readMoreButton",
    "Desktop",
    true
  )}
            ${readMoreButtonColor ? `color: ${readMoreButtonColor};` : ""}
            ${btnBgNormal}
            ${readMoreButtonBorder ? `border: ${readMoreButtonBorder};` : ""}
            ${readMoreButtonBorderColor ? `border-color: ${readMoreButtonBorderColor};` : ""}
            ${btnBorderWidth ? `border-width: ${btnBorderWidth};` : ""}
            ${btnBorderRadius ? `border-radius: ${btnBorderRadius};` : ""}
            ${readMoreButtonBoxShadowCssValue ? `box-shadow: ${readMoreButtonBoxShadowCssValue};` : ""}
            ${btnPadding ? `padding: ${btnPadding};` : ""}
            ${readMoreButtonWidth === "full" ? "display: flex; width: 100%;" : "display: inline-flex;"}
            align-items: center;
            justify-content: center;
            ${iconGap}
            position: relative;
            overflow: hidden;
            transition: all .3s ease-in-out;
        }

        .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:hover {
            ${readMoreButtonColorHover ? `color: ${readMoreButtonColorHover};` : ""}
            ${btnBgHover}
            ${readMoreButtonBorderHoverColor ? `border-color: ${readMoreButtonBorderHoverColor};` : ""}
            ${readMoreButtonBoxShadowHoverCssValue ? `box-shadow: ${readMoreButtonBoxShadowHoverCssValue};` : ""}
            ${buildReadMoreHoverAnimRule(readMoreButtonHoverAnimation)}
        }

        ${readMoreButtonHoverAnimation === "shimmer" ? `
        .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: none;
        }
        .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:hover::after {
            left: 100%;
            transition: all 0.6s ease-in-out;
        }
        ` : ""}

        .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:focus {
            outline: none;
            box-shadow: none;
        }

        .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            ${iconWidth}
            ${iconHeight}
            ${readMoreButtonIconBorder ? `border: ${readMoreButtonIconBorder};` : ""}
            ${readMoreButtonIconBorderColor ? `border-color: ${readMoreButtonIconBorderColor};` : ""}
            ${iconBorderWidth ? `border-width: ${iconBorderWidth};` : ""}
            ${iconBorderRadius ? `border-radius: ${iconBorderRadius};` : ""}
            ${readMoreButtonIconBoxShadowCssValue ? `box-shadow: ${readMoreButtonIconBoxShadowCssValue};` : ""}
            ${iconBgNormal}
            ${iconRotation}
            transition: all .3s ease-in-out;
        }

        .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:hover .gslider-readmore-icon-wrap {
            ${readMoreButtonIconBorderHoverColor ? `border-color: ${readMoreButtonIconBorderHoverColor};` : ""}
            ${readMoreButtonIconBoxShadowHoverCssValue ? `box-shadow: ${readMoreButtonIconBoxShadowHoverCssValue};` : ""}
            ${iconBgHover}
            ${hoverTransform ? `transform: ${hoverTransform};` : ""}
        }

        .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap svg {
            ${readMoreButtonIconColor ? `fill: ${readMoreButtonIconColor};` : ""}
            ${readMoreButtonIconColor ? `stroke: ${readMoreButtonIconColor};` : ""}
            ${iconSizeWidth}
            ${iconSizeHeight}
            transition: all .3s ease-in-out;
        }

        .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn:hover .gslider-readmore-icon-wrap svg {
            ${readMoreButtonIconColorHover ? `fill: ${readMoreButtonIconColorHover};` : ""}
            ${readMoreButtonIconColorHover ? `stroke: ${readMoreButtonIconColorHover};` : ""}
        }

        .${blockId} .gslider-post-carousel-readmore a.gslider-post-carousel-readmore-btn .gslider-readmore-icon-wrap img {
            ${iconSizeWidth}
            ${iconSizeHeight}
            transition: all .3s ease-in-out;
        }
	`;
};

// ../../src/blocks/post-carousel/styling.js
var buildResponsiveBreakpoint = (attributes2, device, maxWidth) => `
    @media only screen and (max-width: ${maxWidth}) {
        ${buildGlobalResponsive(attributes2, device)}
        ${buildCardResponsive(attributes2, device)}
        ${buildContentWrapperStyles(attributes2, device)}
        ${buildNavigationStyles(attributes2, device)}
        ${buildPaginationStyles(attributes2, device)}
        ${buildTitleStyles(attributes2, device)}
        ${buildExcerptStyles(attributes2, device)}
        ${buildBadgeOverlayResponsive(attributes2, device)}
        ${buildImageWrapperResponsive(attributes2, device)}
        ${buildElementVisibilityStyles(attributes2, device)}
        ${buildTaxonomyStyles(
  attributes2,
  "postCategory",
  "gslider-post-carousel-categories",
  device
)}
        ${buildTaxonomyStyles(
  attributes2,
  "postTag",
  "gslider-post-carousel-tags",
  device
)}
        ${buildImageTagResponsive(attributes2, device)}
        ${buildAuthorImageStyles(attributes2, device)}
        ${buildAuthorNameStyles(attributes2, device)}
        ${buildPostDateStyles(attributes2, device)}
        ${buildReadMoreStyles(attributes2, device)}
    }
`;
var generatePostCarouselStyle = (attributes2) => {
  const postCarouselCSS = `
        ${buildGlobalDesktop(attributes2)}
        ${buildCardDesktop(attributes2)}
        ${buildContentWrapperStyles(attributes2, "Desktop")}
        ${buildNavigationStyles(attributes2, "Desktop")}
        ${buildPaginationStyles(attributes2, "Desktop")}
        ${buildTitleStyles(attributes2, "Desktop")}
        ${buildExcerptStyles(attributes2, "Desktop")}
        ${buildImageWrapperDesktop(attributes2)}
        ${buildElementVisibilityStyles(attributes2, "Desktop")}
        ${buildTaxonomyStyles(
    attributes2,
    "postCategory",
    "gslider-post-carousel-categories",
    "Desktop"
  )}
        ${buildTaxonomyStyles(
    attributes2,
    "postTag",
    "gslider-post-carousel-tags",
    "Desktop"
  )}
        ${buildImageTagDesktop(attributes2)}
        ${buildAuthorImageStyles(attributes2, "Desktop")}
        ${buildAuthorNameStyles(attributes2, "Desktop")}
        ${buildPostDateStyles(attributes2, "Desktop")}
        ${buildReadMoreStyles(attributes2, "Desktop")}
        ${buildResponsiveBreakpoint(attributes2, "Tablet", "1024px")}
        ${buildResponsiveBreakpoint(attributes2, "Mobile", "767px")}
	`;
  return postCarouselCSS.replace(/\s+/g, " ").trim();
};
var styling_default = generatePostCarouselStyle;

// ../../src/blocks/post-carousel/post-carousel-entry.js
var deprecated = [];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attributes,
  deprecated,
  meta,
  save,
  styling
});
