# GSlider Blocks - Project Architecture & AI Agent Guide

Welcome to **GSlider Blocks**, an advanced WordPress Gutenberg Carousel and Slider Block plugin built with modern React (Gutenberg Block Editor) and PHP (PSR-4 Singleton architecture).

This document outlines the core architecture, conventions, and links to specialized skills for AI agents and developers working on this codebase.

---

## 🏗️ Architecture Overview

```
gslider-blocks/
├── gslider-blocks.php         # Main plugin bootstrap file (constants, singleton init)
├── composer.json              # PSR-4 Autoloading configuration (`GSlider\` -> `includes/`)
├── package.json               # Build scripts & npm dependencies (@wordpress/scripts)
├── webpack.config.js          # Custom webpack configuration with path aliases
├── webpack.config.admin.js    # Dedicated webpack build for admin styles
├── webpack.zip.js             # Production zip package generator
├── includes/                  # PHP Backend Services (PSR-4, Singleton Pattern)
│   ├── Plugin.php             # Core bootstrap on `plugins_loaded`
│   ├── Assets/                # Asset managers (FrontendAssets, AdminAssets)
│   ├── Classes/               # Service classes (RegistrationBlocks, StyleGenerator, FontLoader, SupportSVG, RegistrationPatterns)
│   ├── RestApi/               # Headless REST API services & compiled attribute defaults
│   ├── Traits/                # Reusable traits (SingletonTrait)
│   └── Utils/                 # Utility services (Telemetry/Appsero)
├── src/                       # Gutenberg React Frontend Source
│   ├── blocks/                # Block modules (base, flexi-content, image-slider, logo-carousel, testimonial)
│   ├── components/            # 23+ Reusable UI controls (Responsive controls, color, typography, etc.)
│   ├── constants/             # Global options, bounds, alignment definitions, font lists
│   ├── store/                 # Redux store for deviceType and editor state
│   └── utils/                 # Helpers (useBlockIdGenerator, getCustomCss, loadGoogleFont, etc.)
├── patterns/                  # Modular Gutenberg Block Pattern templates
├── packages/                  # Monorepo packages
│   └── mcp-server/            # Local Model Context Protocol stdio server for AI tools & template resources
├── admin/                     # Admin SCSS stylesheets
├── assets/                    # Compiled assets, vector SVGs, vendor libraries (Swiper, fsLightbox)
├── build/                     # Compiled Gutenberg blocks output directory
├── tests/                     # Zero-dependency PHP CLI test harness (PHP 7.4-8.5 matrix)
└── scripts/                   # Developer automation and build codegen utilities
```

---

## 🧭 Core Specialized Skills

When developing or modifying code in this repository, reference the dedicated workspace skills located in `.agents/skills/`:

| Skill Name | Purpose & Scope |
| :--- | :--- |
| **[`gslider-contribution-workflow`](.agents/skills/gslider-contribution-workflow/SKILL.md)** | Standardized international open-source workflow: PR title & description standards, Conventional Commits, locked core components policy, Use of AI guidelines, good first issue discovery protocol, and maintainer review flow. |
| **[`gslider-block-development`](.agents/skills/gslider-block-development/SKILL.md)** | Step-by-step procedure for creating new blocks, modifying existing blocks, managing attributes, deprecations, and block lifecycle. |
| **[`gslider-style-engine`](.agents/skills/gslider-style-engine/SKILL.md)** | Dynamic CSS generation pipeline (`styling.js` -> `blockStyle` attribute -> `StyleGenerator.php`), responsive breakpoints (`Desktop`, `Tablet`, `Mobile`), unit parsing, and custom CSS. |
| **[`gslider-swiper-integration`](.agents/skills/gslider-swiper-integration/SKILL.md)** | Swiper.js integration in editor (`edit.js` lifecycle with cleanup) and frontend (`save.js` + `view.js`), handling transitions, pagination, navigation, and autoplay. |
| **[`gslider-ui-controls`](.agents/skills/gslider-ui-controls/SKILL.md)** | Guide to using the 23+ custom React UI controls in `src/components/` (Responsive range/typography/spacing, color pickers, icon picker, etc.). |
| **[`gslider-php-backend`](.agents/skills/gslider-php-backend/SKILL.md)** | Backend architecture, PSR-4 autoloading, WordPress hooks, Singleton pattern, security/sanitization, and dynamic block registration. |
| **[`gslider-qa-and-release`](.agents/skills/gslider-qa-and-release/SKILL.md)** | Quality Assurance, testing, linting, version synchronization, production builds, and distributable zip packaging. |
| **[`gslider-testing-standards`](.agents/skills/gslider-testing-standards/SKILL.md)** | Modern enterprise PHP testing standards, 1-to-1 class-to-test mapping (matching Google Site Kit, WooCommerce, and 10up), and test execution. |

---

## ⚡ Development & Build Workflows

### Essential NPM Scripts
- `npm run start` : Watch mode for block development (`wp-scripts start`)
- `npm run build` : Production build of blocks (`wp-scripts build`)
- `npm run admin` : Watch mode for admin SCSS (`webpack --config webpack.config.admin.js --watch`)
- `npm run admin:build` : Production build of admin assets
- `npm run format` : Format code according to WordPress coding standards
- `npm run lint:js` : Lint JavaScript code
- `npm run lint:css` : Lint CSS/SCSS code
- `npm run zip` : Generate distributable plugin zip archive
- `npm run mcp:build` : Build local MCP TypeScript server and schemas
- `npm run mcp:test` : Run MCP schema drift test
- `npm run defaults:generate` : Regenerate REST PHP defaults from block schemas

---

## 📐 Golden Architectural Rules

1. **Strict Block Directory Structure**: Every block in `src/blocks/<slug>/` MUST contain:
   - `block.json`, `index.js`, `attributes.js`, `edit.js`, `save.js`, `styling.js`, `view.js`, `inspector.js`, `style.scss`, `editor.scss`, `deprecated.js`, `icon.js`.
2. **Standardized Attribute Schemas**: Every `attributes.js` file must strictly follow the existing blocks' attribute conventions:
   - **Spacing**: 8-key pattern (`<prefix>PaddingUnits`, `<prefix>PaddingDesktop`, `<prefix>PaddingDesktopCssStyle`, `<prefix>PaddingTablet`, `<prefix>PaddingTabletCssStyle`, `<prefix>PaddingMobile`, `<prefix>PaddingMobileCssStyle`, `<prefix>PaddingLink`).
   - **Typography**: 13-key pattern (`<prefix>FontFamily`, `<prefix>FontSize`, `<prefix>FontSizeUnits`, `<prefix>FontWeight`, `<prefix>FontStyle`, `<prefix>TextTransform`, `<prefix>TextDecoration`, `<prefix>LineHeight`, `<prefix>LineHeightUnits`, `<prefix>LetterSpacing`, `<prefix>LetterSpacingUnits`, `<prefix>WordSpacing`, `<prefix>WordSpacingUnits`).
   - **Colors**: `<prefix>ColorSwitcher`, `<prefix>Color`, `<prefix>ColorHover`.
   - **Mandatory Defaults**: `blockId`, `deviceType`, `blockStyle`, `globalID`, `globalClass`, `globalCustomCSS`, `zIndex`.
3. **Dynamic CSS Generation**: Never write hardcoded inline CSS in `save.js`. Dynamic styles MUST be generated via `styling.js`, saved into the `blockStyle` attribute, and rendered via `StyleGenerator.php`.
4. **Unique Block ID**: Always call `useBlockIdGenerator` in `edit.js` to ensure unique scoping (`gslider-xxxxxxxx`) for styling and Swiper instances.
5. **Responsive-First Architecture**: All visual and layout attributes must support responsive objects: `{ Desktop: value, Tablet: value, Mobile: value }`.
6. **No Direct DOM Mutations Outside Swiper**: Let React manage the editor DOM; Swiper is initialized using container refs in `useEffect` and cleaned up with `swiper.destroy(true, true)` on changes.
7. **WordPress Security Standards**: In PHP, always sanitize inputs (`sanitize_text_field`, `sanitize_key`), escape outputs (`esc_html__`, `esc_attr__`, `esc_url`), verify nonces, and use `WP_Filesystem` for disk operations.
8. **Protected Component Directory & Strict Design System**:
   - `src/components/` is strictly locked: **NO ONE EXCEPT `@noruzzamans` IS ALLOWED TO EDIT OR ADD FILES TO `src/components/`**. Any external PR or AI modifying `src/components/` will be rejected to protect 2,000+ live sites.
   - Blocks MUST exclusively use the 23 approved `@Components/*` controls. Raw `@wordpress/components` input controls are forbidden.
9. **Codebase-First & Surgical Diffs**:
   - Always inspect existing traits, interfaces, and classes before making changes to prevent duplicating patterns already provided (e.g. `SingletonTrait`).
   - PR diffs must remain atomic and surgical: change only the exact lines requested by the issue with zero unprompted methods or speculative boilerplate.
10. **Admin Dashboard Centralized Design Tokens**:
    - Never hardcode font families or color palette directly in admin dashboard SCSS.
    - All dashboard design tokens MUST be imported from `admin/scss/dashboard/_variables.scss` (`@use 'variables' as *;`) keeping each module (`block-controls` and `dashboard`) clean and self-contained with its own scoped variables.
11. **Directory Architecture & Subsystem Conventions**:
    - `patterns/`: Houses curated, lightweight Gutenberg Block Pattern templates (`patterns/*.php`).
      - **Lifecycle Rule**: Bundled starter patterns register unconditionally on the WordPress `init` hook across all contexts (Admin, REST, Frontend/FSE).
      - **Remote Library Rule**: The future remote pattern library (500+ patterns) must NEVER download, fetch, or register on `init`. Remote patterns must be fetched on-demand strictly via REST API requests and cached with transients.
      - **Localization Rule**: All bundled pattern metadata must have an explicit entry in `RegistrationPatterns::get_pattern_translations()` with literal strings for `title`, `description`, and `keywords` for `make-pot` compatibility.
      - **Asset Rule**: Bundled patterns must never hotlink external third-party images (GDPR compliance); use local, lightweight vector SVGs in `assets/images/patterns/`.
      - **Escaping Rule**: Use `esc_url_raw()` inside Gutenberg block delimiter JSON comments (`<!-- wp:... -->`) and `esc_url()` inside HTML tag attributes (`<img src="...">`).
    - `packages/mcp-server/`: Local Model Context Protocol (MCP) server for AI tool introspection.
      - Communicates over local `stdio` (zero cloud cost).
      - Exposes tools (`gslider_ping`, `gslider_list_blocks`, `gslider_get_block_schema`) and template resources (`gslider://templates/*`).
      - Compiled output in `packages/mcp-server/dist/` is intentionally tracked in git for zero-build external AI execution.
      - Always run `npm test` inside `packages/mcp-server` to verify zero schema drift when updating block attributes.
    - `includes/RestApi/`: Decoupled Headless REST API serialization layer.
      - `BlocksController.php`: Registers `/wp-json/gslider/v1/blocks/<id>` and exposes the `gslider_blocks` field on core post/page endpoints.
      - `BlockParser.php`: Normalizes stored Gutenberg block attributes against defaults so decoupled frontend consumers receive complete Swiper configurations.
      - `includes/RestApi/defaults/`: Generated PHP defaults compiled from block schemas via `npm run defaults:generate`.
    - `tests/`: Zero-dependency PHP CLI test harness.
      - Fast standalone unit tests executable via `for f in tests/*.php; do php "$f"; done`.
      - Tested on GitHub Actions across a PHP 7.4 through 8.5 matrix on every PR.
    - `scripts/`: Internal developer automation utilities.
      - `scripts/generate-block-defaults.js`: Reads block schemas and compiles PHP attribute defaults for headless REST parsing.
12. **Branch Preservation Rule (Zero Branch Deletion)**:
    - Feature, bugfix, and chore branches MUST NEVER be deleted after PR merge (neither locally nor remotely).
    - NEVER run `git branch -d`, `git branch -D`, `git push origin --delete`, or use `--delete-branch` flags in `gh pr merge`.
    - All merged branches must be permanently preserved to maintain historical integrity and traceability.


