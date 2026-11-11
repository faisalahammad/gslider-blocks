# REST API Schemas & Endpoints Reference

This document provides exhaustive technical specifications, JSON schema definitions, and authentication requirements for GSlider Blocks' decoupled REST API endpoints.

---

## 🧭 Endpoints Overview

| Endpoint | Method | Capabilities / Auth | Purpose |
| :--- | :---: | :--- | :--- |
| `/wp-json/gslider/v1/blocks/{id}` | `GET` | Public for published posts; `read_post` for drafts/private | Fetches all parsed sliders for a single post/page. |
| `/wp-json/wp/v2/pages/{id}` | `GET` | Core WordPress permissions | Core page endpoint with embedded `gslider_blocks` field. |
| `/wp-json/wp/v2/posts/{id}` | `GET` | Core WordPress permissions | Core post endpoint with embedded `gslider_blocks` field. |

---

## 📌 Endpoint: `GET /wp-json/gslider/v1/blocks/{id}`

### URL Parameters

| Parameter | Type | Required | Description | Validation |
| :--- | :---: | :---: | :--- | :--- |
| `id` | `integer` | **Yes** | WordPress post, page, or custom post type ID. | Must be numeric and `> 0`. Sanitized via `absint`. |

---

### Permissions & Authentication Matrix

| Post Status | Post Type | Authentication Required? | Capability Required | Error Response |
| :--- | :--- | :---: | :--- | :--- |
| `publish` | Public (`post`, `page`) | **No** | None (Public access) | N/A |
| `publish` (password-protected) | Any | **Yes** (Cookie) | Valid password cookie | `403 rest_cannot_read_post` |
| `draft`, `pending`, `auto-draft` | Any | **Yes** (JWT/App Password) | `read_post` | `401 rest_cannot_read_post` |
| `private` | Any | **Yes** (JWT/App Password) | `read_post` | `401 rest_cannot_read_post` |
| Non-existent ID | Any | N/A | None | `404 rest_post_invalid_id` |

---

### Response JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "gslider_blocks",
  "type": "object",
  "properties": {
    "post_id": {
      "type": "integer",
      "description": "The ID of the queried post.",
      "readonly": true
    },
    "post_title": {
      "type": "string",
      "description": "The title of the queried post.",
      "readonly": true
    },
    "total_sliders": {
      "type": "integer",
      "description": "The total number of GSlider blocks on this post.",
      "readonly": true
    },
    "blocks": {
      "type": "array",
      "description": "List of parsed GSlider blocks.",
      "readonly": true,
      "items": {
        "type": "object",
        "properties": {
          "blockId": {
            "type": "string",
            "description": "Unique scoped CSS identifier (e.g., 'gslider-a1b2c3d4')."
          },
          "blockName": {
            "type": "string",
            "description": "Canonical Gutenberg block name (e.g., 'gslider-blocks/image-slider')."
          },
          "sliderType": {
            "type": "string",
            "description": "Slider layout mode ('slider' or 'carousel')."
          },
          "totalSlides": {
            "type": "integer",
            "description": "Total count of slides in this block instance."
          },
          "swiperConfig": {
            "type": "object",
            "description": "Pre-parsed Swiper.js options ready for frontend initialization."
          },
          "css": {
            "type": "string",
            "description": "Sanitized scoped CSS string compiled from styling.js."
          },
          "slides": {
            "type": "array",
            "description": "Normalized slide items array (images, titles, descriptions, etc.). For Flexi Content, items include 'id', 'blockName', 'innerHtml', 'css' (the slide's own CSS plus its nested blocks' CSS), and 'innerBlocks'."
          },
          "attrs": {
            "type": "object",
            "description": "Complete block attributes dictionary with default values backfilled."
          }
        }
      }
    }
  }
}
```

---

### `swiperConfig` Specification Table

Every block instance returned in `blocks[i].swiperConfig` contains server-compiled Swiper.js options:

| Property | Type | Default | Description |
| :--- | :---: | :---: | :--- |
| `loop` | `boolean` | `true` | Enables continuous loop mode (`infiniteLoop`). |
| `speed` | `integer` | `800` | Transition duration in milliseconds (`speed.Desktop`). |
| `slidesPerView` | `number \| string` | `1` (or `'auto'`) | Number of visible slides per view (only present in `'carousel'` mode). |
| `spaceBetween` | `integer` | `20` | Gap between slides in pixels (`carouselGap.Desktop`). |
| `effect` | `string` | `'slide'` | Swiper transition effect (`slide`, `fade`, `coverflow`, `flip`, `cube`, `cards`, `creative`). |
| `autoplay` | `object \| false` | `false` | Autoplay configuration object (`{ delay, disableOnInteraction: false }`) or `false`. |
| `navigation` | `boolean` | `true` | Whether previous/next arrow navigation is enabled. |
| `pagination` | `object \| false` | `{ clickable: true, type: 'bullets' }` | Pagination bullet/fraction config, or `false` if disabled. |
| `allowTouchMove` | `boolean` | `true` | Allows dragging and touch swipe interactions. |
| `keyboard` | `object \| false` | `{ enabled: true, onlyInViewport: true, pageUpDown: false }` | Keyboard arrow navigation config. |
| `autoHeight` | `boolean` | `false` | Whether slider automatically adapts its container height. |

---

### `slides` Specification Table (Flexi Content REST Output)

For block-based sliders such as `gslider-blocks/flexi-content`, each element in `blocks[i].slides` represents an individual slide container with the following properties:

| Property | Type | Description |
| :--- | :---: | :--- |
| `id` | `string` | Slide identifier: the slide's sanitized block ID, or a `slide-<N>` fallback (e.g. `'slide-1'`) when no block ID is set. Not guaranteed to be unique. |
| `blockName` | `string` | Canonical block name of the slide item (e.g. `'gslider-blocks/flexi-content-item'`). |
| `isSlideHidden` | `boolean` | Whether the slide is drafted as hidden through the item's "Hide Slide (Draft)" toggle. Hidden slides stay in this array so consumers can filter them by this flag. |
| `innerHtml` | `string` | Fully rendered HTML markup of the slide. For backward compatibility, the slide's scoped `<style>` tags are also retained inside `innerHtml`. |
| `css` | `string` | The slide's own scoped CSS plus its nested blocks' CSS. Headless consumers can apply this CSS directly without having to parse `innerHtml`. |
| `innerBlocks` | `array` | Nested Gutenberg block nodes contained within this slide. |

---

## 📌 Core Field: `gslider_blocks`

When fetching standard WordPress post or page endpoints:

```http
GET /wp-json/wp/v2/posts/123
GET /wp-json/wp/v2/pages/123
```

The response includes the `gslider_blocks` field containing the exact same `blocks` array as documented above:

```json
{
  "id": 123,
  "slug": "sample-page",
  "status": "publish",
  "title": { "rendered": "Sample Page" },
  "gslider_blocks": [
    {
      "blockId": "gslider-1a2b3c4d",
      "blockName": "gslider-blocks/base",
      "sliderType": "slider",
      "totalSlides": 3,
      "swiperConfig": { ... },
      "css": "...",
      "slides": [ ... ],
      "attrs": { ... }
    }
  ]
}
```

> [!NOTE]
> If a post contains zero GSlider blocks or is password-protected without a valid cookie, `gslider_blocks` returns an empty array (`[]`).
