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

// ../../src/blocks/flexi-content-item/flexi-content-item-entry.js
var flexi_content_item_entry_exports = {};
__export(flexi_content_item_entry_exports, {
  attributes: () => attributes_default,
  deprecated: () => deprecated,
  meta: () => block_default,
  save: () => Save,
  styling: () => styling_default
});
module.exports = __toCommonJS(flexi_content_item_entry_exports);

// ../../src/blocks/flexi-content-item/block.json
var block_default = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "gslider-blocks/flexi-content-item",
  version: "1.2.1",
  title: "Flexi Content Item",
  category: "gslider-blocks",
  description: "Display any content seamlessly in slide or carousel modes.",
  keywords: [
    "slide",
    "flexi slide",
    "content slide",
    "carousel item"
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
  parent: ["gslider-blocks/flexi-content"],
  textdomain: "gslider-blocks",
  editorScript: "file:./index.js",
  editorStyle: "file:./index.css",
  style: "file:./style-index.css"
};

// ../../src/blocks/flexi-content-item/attributes.js
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
  slideHash: {
    type: "string",
    default: ""
  },
  /** Start slider Item Background */
  sliderItemNormalBackgroundType: {
    type: "string",
    default: "classic"
  },
  sliderItemNormalClassicColor: {
    type: "string",
    default: ""
  },
  sliderItemNormalGradientColor: {
    type: "string",
    default: null
  },
  sliderItemNormalCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  sliderItemNormalCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  sliderItemNormalBackgroundImageUrl: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  sliderItemNormalBackgroundImagePosition: {
    type: "object",
    default: {
      Desktop: { x: 0.5, y: 0.5 },
      Tablet: { x: 0.5, y: 0.5 },
      Mobile: { x: 0.5, y: 0.5 }
    }
  },
  sliderItemNormalBackgroundImageAttachment: {
    type: "object",
    default: {
      Desktop: "scroll",
      Tablet: "scroll",
      Mobile: "scroll"
    }
  },
  sliderItemNormalBackgroundImageRepeat: {
    type: "object",
    default: {
      Desktop: "no-repeat",
      Tablet: "no-repeat",
      Mobile: "no-repeat"
    }
  },
  sliderItemNormalBackgroundImageSize: {
    type: "object",
    default: {
      Desktop: "cover",
      Tablet: "cover",
      Mobile: "cover"
    }
  },
  sliderItemHoverBackgroundType: {
    type: "string",
    default: "classic"
  },
  sliderItemHoverClassicColor: {
    type: "string",
    default: ""
  },
  sliderItemHoverGradientColor: {
    type: "string",
    default: null
  },
  sliderItemHoverCustomGradientSwitcher: {
    type: "boolean",
    default: false
  },
  sliderItemHoverCustomGradientInputValue: {
    type: "string",
    default: ""
  },
  sliderItemHoverBackgroundImageUrl: {
    type: "object",
    default: {
      Desktop: "",
      Tablet: "",
      Mobile: ""
    }
  },
  sliderItemHoverBackgroundImagePosition: {
    type: "object",
    default: {
      Desktop: { x: 0.5, y: 0.5 },
      Tablet: { x: 0.5, y: 0.5 },
      Mobile: { x: 0.5, y: 0.5 }
    }
  },
  sliderItemHoverBackgroundImageAttachment: {
    type: "object",
    default: {
      Desktop: "scroll",
      Tablet: "scroll",
      Mobile: "scroll"
    }
  },
  sliderItemHoverBackgroundImageRepeat: {
    type: "object",
    default: {
      Desktop: "no-repeat",
      Tablet: "no-repeat",
      Mobile: "no-repeat"
    }
  },
  sliderItemHoverBackgroundImageSize: {
    type: "object",
    default: {
      Desktop: "cover",
      Tablet: "cover",
      Mobile: "cover"
    }
  }
  /** End slider Item Background */
};
var attributes_default = attributes;

// ../../src/blocks/flexi-content-item/save.js
var import_block_editor = require("@wordpress/block-editor");
var import_jsx_runtime = require("react/jsx-runtime");
function Save({ attributes: attributes2 }) {
  const { blockId, slideHash } = attributes2;
  const blockProps = import_block_editor.useBlockProps.save({
    className: `flexi-content-item swiper-slide ${blockId}`,
    ...slideHash && { "data-hash": slideHash }
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...blockProps, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gslider-content-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "gslider-content-inner-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_block_editor.InnerBlocks.Content, {}) }) }) });
}

// ../../src/blocks/flexi-content-item/styling.js
var generateFlexiContentItemStyle = (attributes2) => {
  const {
    blockId,
    /** Start slider Item Background */
    sliderItemNormalBackgroundType,
    sliderItemNormalClassicColor,
    sliderItemNormalGradientColor,
    sliderItemNormalCustomGradientSwitcher,
    sliderItemNormalCustomGradientInputValue,
    sliderItemNormalBackgroundImageUrl,
    sliderItemNormalBackgroundImagePosition,
    sliderItemNormalBackgroundImageAttachment,
    sliderItemNormalBackgroundImageRepeat,
    sliderItemNormalBackgroundImageSize,
    sliderItemHoverBackgroundType,
    sliderItemHoverClassicColor,
    sliderItemHoverGradientColor,
    sliderItemHoverCustomGradientSwitcher,
    sliderItemHoverCustomGradientInputValue,
    sliderItemHoverBackgroundImageUrl,
    sliderItemHoverBackgroundImagePosition,
    sliderItemHoverBackgroundImageAttachment,
    sliderItemHoverBackgroundImageRepeat,
    sliderItemHoverBackgroundImageSize
    /** End slider Item Background */
  } = attributes2;
  const getSliderItemBackgroundNormalStyles = (device) => {
    const bgType = sliderItemNormalBackgroundType;
    const bgColor = sliderItemNormalClassicColor;
    const bgGradient = sliderItemNormalGradientColor;
    const customGradient = sliderItemNormalCustomGradientInputValue;
    const customGradientEnabled = sliderItemNormalCustomGradientSwitcher;
    const bgImageUrl = sliderItemNormalBackgroundImageUrl?.[device];
    const bgImagePosition = sliderItemNormalBackgroundImagePosition?.[device];
    const bgAttachment = sliderItemNormalBackgroundImageAttachment?.[device];
    const bgRepeat = sliderItemNormalBackgroundImageRepeat?.[device];
    const bgSize = sliderItemNormalBackgroundImageSize?.[device];
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
  const getSliderItemBackgroundHoverStyles = (device) => {
    const bgType = sliderItemHoverBackgroundType;
    const bgColor = sliderItemHoverClassicColor;
    const bgGradient = sliderItemHoverGradientColor;
    const customGradient = sliderItemHoverCustomGradientInputValue;
    const customGradientEnabled = sliderItemHoverCustomGradientSwitcher;
    const bgImageUrl = sliderItemHoverBackgroundImageUrl?.[device];
    const bgImagePosition = sliderItemHoverBackgroundImagePosition?.[device];
    const bgAttachment = sliderItemHoverBackgroundImageAttachment?.[device];
    const bgRepeat = sliderItemHoverBackgroundImageRepeat?.[device];
    const bgSize = sliderItemHoverBackgroundImageSize?.[device];
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
  const sliderItemBackgroundStyleObjectToString = (styleObj) => Object.entries(styleObj).map(([key, value]) => `${key}: ${value};`).join(" ");
  const sliderItemDesktopBackgroundNormalStyles = sliderItemBackgroundStyleObjectToString(
    getSliderItemBackgroundNormalStyles("Desktop")
  );
  const sliderItemTabletBackgroundNormalStyles = sliderItemBackgroundStyleObjectToString(
    getSliderItemBackgroundNormalStyles("Tablet")
  );
  const sliderItemMobileBackgroundNormalStyles = sliderItemBackgroundStyleObjectToString(
    getSliderItemBackgroundNormalStyles("Mobile")
  );
  const sliderItemDesktopBackgroundHoverStyles = sliderItemBackgroundStyleObjectToString(
    getSliderItemBackgroundHoverStyles("Desktop")
  );
  const sliderItemTabletBackgroundHoverStyles = sliderItemBackgroundStyleObjectToString(
    getSliderItemBackgroundHoverStyles("Tablet")
  );
  const sliderItemMobileBackgroundHoverStyles = sliderItemBackgroundStyleObjectToString(
    getSliderItemBackgroundHoverStyles("Mobile")
  );
  const flexiContentItemCSS = `
        .${blockId}.flexi-content-item {
            ${sliderItemDesktopBackgroundNormalStyles}
            box-sizing: border-box;
            position: relative;
            transition: background 0.3s ease, background-color 0.3s ease;
        }
        .${blockId}.flexi-content-item:hover {
            ${sliderItemDesktopBackgroundHoverStyles}
            box-sizing: border-box;
            position: relative;
        }

        @media only screen and (max-width: 1024px) {

            .${blockId}.flexi-content-item {
                ${sliderItemTabletBackgroundNormalStyles}
            }
            .${blockId}.flexi-content-item:hover {
                ${sliderItemTabletBackgroundHoverStyles}
            }
        }
        
        @media only screen and (max-width: 767px) {

            .${blockId}.flexi-content-item {
                ${sliderItemMobileBackgroundNormalStyles}
            }
            .${blockId}.flexi-content-item:hover {
                ${sliderItemMobileBackgroundHoverStyles}
            }
        }
    `;
  return `${flexiContentItemCSS}`.replace(/\s+/g, " ").trim();
};
var styling_default = generateFlexiContentItemStyle;

// ../../src/blocks/flexi-content-item/flexi-content-item-entry.js
var deprecated = [];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  attributes,
  deprecated,
  meta,
  save,
  styling
});
