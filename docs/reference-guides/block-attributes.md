# Block Attributes & Schema Conventions Reference

This document provides exhaustive reference tables for GSlider Blocks' standardized attribute patterns, schema naming rules, and responsive conventions across all block modules.

---

## 📐 Golden Architectural Conventions

All GSlider blocks adhere to strict naming conventions and schema structures to guarantee compatibility with the dynamic style engine (`styling.js`), responsive editor controls, and headless REST deserialization.

### 1. Mandatory Root Attributes (Every Block)

Every block's `attributes.js` file MUST declare these 7 foundational keys:

| Attribute | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| `blockId` | `string` | `""` | Scoped CSS identifier (`gslider-xxxxxxxx`). Auto-populated by `useBlockIdGenerator`. |
| `deviceType` | `string` | `"Desktop"` | Active editor preview breakpoint (`"Desktop"`, `"Tablet"`, `"Mobile"`). |
| `blockStyle` | `string` | `""` | Sanitized compiled scoped CSS string generated from `styling.js`. |
| `globalID` | `string` | `""` | Optional custom HTML anchor ID applied to the block container. |
| `globalClass` | `string` | `""` | Optional additional custom CSS classes applied to container. |
| `globalCustomCSS` | `string` | `""` | *(Deprecated / Legacy)* Retained strictly for backward compatibility with older block instances. UI controls and active CSS injection have been retired. |
| `zIndex` | `number` | `1` | CSS container stacking context `z-index`. |

---

### 2. Responsive Object Convention

All visual dimensions, font sizes, gaps, and column counts that adapt across viewports are stored as responsive 3-breakpoint objects:

```javascript
{
  type: 'object',
  default: {
    Desktop: 3,
    Tablet: 2,
    Mobile: 1
  }
}
```

Breakpoint mapping:
- **Desktop**: Screens `> 1024px`
- **Tablet**: Screens `<= 1024px` and `> 767px`
- **Mobile**: Screens `<= 767px`

---

## 🎛️ Standardized Reusable Attribute Patterns

### 1. Spacing Pattern (8 Keys per Prefix)

Whenever padding or margin controls are defined for an element (e.g., `container`, `card`, `title`), the schema must declare exactly 8 keys using the element's prefix:

| Key Pattern | Type | Default | Purpose |
| :--- | :---: | :---: | :--- |
| `<prefix>PaddingUnits` | `string` | `"px"` | Unit (`px`, `%`, `em`, `rem`, `vh`, `vw`). |
| `<prefix>PaddingDesktop` | `object` | `{ top: 0, right: 0, bottom: 0, left: 0 }` | Desktop dimensions object. |
| `<prefix>PaddingDesktopCssStyle` | `string` | `"0px 0px 0px 0px"` | Compiled shorthand CSS value. |
| `<prefix>PaddingTablet` | `object` | `{ top: 0, right: 0, bottom: 0, left: 0 }` | Tablet dimensions object. |
| `<prefix>PaddingTabletCssStyle` | `string` | `"0px 0px 0px 0px"` | Compiled shorthand CSS value. |
| `<prefix>PaddingMobile` | `object` | `{ top: 0, right: 0, bottom: 0, left: 0 }` | Mobile dimensions object. |
| `<prefix>PaddingMobileCssStyle` | `string` | `"0px 0px 0px 0px"` | Compiled shorthand CSS value. |
| `<prefix>PaddingLink` | `boolean` | `true` | UI toggle linking all 4 sides uniformly. |

---

### 2. Typography Pattern (13 Keys per Prefix)

Whenever a typography control is added for text elements (e.g., `title`, `subTitle`, `description`), the schema must declare exactly 13 keys:

| Key Pattern | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| `<prefix>FontFamily` | `string` | `""` | Google Font family or system font stack. |
| `<prefix>FontSize` | `object` | `{ Desktop: 24, Tablet: 20, Mobile: 18 }` | Responsive font size object. |
| `<prefix>FontSizeUnits` | `string` | `"px"` | Unit (`px`, `em`, `rem`, `vw`). |
| `<prefix>FontWeight` | `string` | `"600"` | CSS font-weight (`"300"` to `"900"`). |
| `<prefix>FontStyle` | `string` | `"normal"` | `"normal"` or `"italic"`. |
| `<prefix>TextTransform` | `string` | `"none"` | `"none"`, `"uppercase"`, `"lowercase"`, `"capitalize"`. |
| `<prefix>TextDecoration` | `string` | `"none"` | `"none"`, `"underline"`, `"line-through"`. |
| `<prefix>LineHeight` | `object` | `{ Desktop: 1.4, Tablet: 1.4, Mobile: 1.4 }` | Responsive line-height object. |
| `<prefix>LineHeightUnits` | `string` | `"em"` | Unit (`em`, `px`, `%`). |
| `<prefix>LetterSpacing` | `object` | `{ Desktop: 0, Tablet: 0, Mobile: 0 }` | Responsive letter-spacing object. |
| `<prefix>LetterSpacingUnits` | `string` | `"px"` | Unit (`px`, `em`). |
| `<prefix>WordSpacing` | `object` | `{ Desktop: 0, Tablet: 0, Mobile: 0 }` | Responsive word-spacing object. |
| `<prefix>WordSpacingUnits` | `string` | `"px"` | Unit (`px`, `em`). |

---

### 3. Color & Hover Pattern (3 Keys per Prefix)

| Key Pattern | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| `<prefix>ColorSwitcher` | `string` | `"normal"` | Active UI state (`"normal"` vs `"hover"`). |
| `<prefix>Color` | `string` | `""` | Normal CSS color (`#hex`, `rgba()`, `var()`). |
| `<prefix>ColorHover` | `string` | `""` | Hover state CSS color. |

---

## 🎠 Swiper Engine Attributes Reference

These attributes configure the carousel runtime across editor and frontend:

| Attribute | Type | Default | Allowed Values / Description |
| :--- | :---: | :---: | :--- |
| `sliderType` | `string` | `"slider"` | `"slider"` (1 slide full focus) or `"carousel"` (multi-column grid). |
| `carouselEffect` | `string` | `"slide"` | `"slide"`, `"fade"`, `"coverflow"`, `"flip"`, `"cube"`, `"cards"`, `"creative"`. |
| `carouselPerColumn` | `object` | `{ Desktop: 3, Tablet: 2, Mobile: 1 }` | Responsive visible slides per view. |
| `carouselGap` | `object` | `{ Desktop: 20, Tablet: 20, Mobile: 0 }` | Responsive space between slides in px. |
| `speed` | `object` | `{ Desktop: 800, Tablet: 800, Mobile: 800 }` | Transition duration in milliseconds. |
| `infiniteLoop` | `boolean` | `true` | Continuous infinite loop navigation. |
| `autoplay` | `boolean` | `false` | Automatic slide advancement. |
| `autoplaySpeed` | `object` | `{ Desktop: 3000, Tablet: 3000, Mobile: 3000 }` | Delay between transitions in ms. |
| `autoplayPauseOnHover` | `boolean` | `true` | Pauses autoplay when mouse hovers over slider. |
| `navigation` | `boolean` | `true` | Enables previous / next arrow buttons. |
| `pagination` | `boolean` | `true` | Enables pagination indicators. |
| `paginationType` | `string` | `"bullets"` | `"bullets"`, `"fraction"`, `"progressbar"`. |
| `allowTouchMove` | `boolean` | `true` | Enables touch swipe and mouse drag. |
| `keyboardControl` | `boolean` | `true` | Enables left/right keyboard arrow navigation. |

---

## 📦 Block-Specific Slide Items Schemas

### 1. Base Slider (`gslider-blocks/base`)
Items stored in `sliderItems` array attribute:
- `id` (*integer*): Unique slide ID.
- `title` (*string*): Headline text.
- `subTitle` (*string*): Tagline / category text.
- `description` (*string*): Paragraph content.
- `primaryButtonText` (*string*): Primary CTA button label.
- `primaryButtonLink` (*string*): CTA button target URL.
- `secondaryButtonText` (*string*): Secondary button label.

### 2. Image Slider (`gslider-blocks/image-slider`)
Items stored in `images` array attribute:
- `id` (*integer*): WordPress media attachment ID.
- `url` (*string*): Media file URL.
- `alt` (*string*): Accessibility image alt text.
- `caption` (*string*): Visible slide caption.
- `link` (*string*): Optional click-through URL.
- `lightbox` (*boolean*): Enables full-screen popup view.

### 3. Logo Carousel (`gslider-blocks/logo-carousel`)
Items stored in `logos` array attribute:
- `id` (*integer*): Media attachment ID.
- `url` (*string*): Logo image URL.
- `alt` (*string*): Partner / brand name.
- `link` (*string*): Partner website URL.
- `hoverEffect` (*string*): `"grayscale"`, `"opacity"`, `"scale"`, `"move-up"`.

### 4. Testimonial Carousel (`gslider-blocks/testimonial`)
Items stored in `sliderItems` array attribute:
- `id` (*string*): Slide ID.
- `testimonialTitle` (*string*): Review title.
- `testimonialText` (*string*): Review quote text.
- `authorName` (*string*): Reviewer's full name.
- `authorDesignation` (*string*): Designation or company.
- `authorImage` (*object*): Author photo `{ url, id, alt }`.
- `companyLogo` (*object*): Optional company logo `{ url, id, alt }`. Shown when `showCompanyLogo` is on for the device.
- `ratingIconAlign` (*string*): `"icon"`, `"image"`, or `"none"`.
- `ratingNumber` (*number*): Star rating (`0` to `5`, supports half stars).
- `ratingImage` (*object*): Custom rating image `{ url, id, alt }`.

### 5. Flexi Content (`gslider-blocks/flexi-content`)
Dynamic slide container:
- Does not use an array attribute for slide content.
- Slides are nested Gutenberg inner blocks of type `gslider-blocks/flexi-content-item`.
- Each `flexi-content-item` slide can host arbitrary core or third-party blocks (Heading, Paragraph, Button, Image, Video, Form).
