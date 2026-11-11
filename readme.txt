=== GSlider Blocks ===
Contributors: noruzzaman
Tags: slider, carousel, logo carousel, slideshow, gutenberg
Requires at least: 6.3
Tested up to: 7.1
Stable tag: 1.2.2
Requires PHP: 7.4
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Donate link: https://github.com/noruzzamans/gslider-blocks

Logo Carousel, Image Slider & Testimonial blocks for Gutenberg. 5 transition effects, responsive design & full customization!

== Description ==

The **GSlider Blocks** plugin allows you to easily add customizable and responsive sliders to your WordPress website. Perfect for both beginners and developers, this plugin provides powerful slider blocks for the WordPress block editor (Gutenberg). Customize slider content, transitions, navigation, and more, while enjoying full control over slider styling and functionality.

== Available Blocks ==

**1. Base Slider Block**
Create stunning hero sliders with predefined content elements. Perfect for homepage banners, promotional sliders, and featured content showcases.

* Pre-built slide structure with Title, Subtitle, Description, and Button
* Transition effects: Slide, Fade, Coverflow, Flip, and Creative in slider mode; Slide and Coverflow in carousel mode
* Full background image/color support with overlay options
* Responsive navigation arrows and pagination controls
* Content alignment and positioning controls
* Custom spacing and padding options

**2. Flexi Content Block**
Build completely custom slides using any Gutenberg blocks. Ultimate flexibility for creative slider designs.

* Use ANY WordPress blocks inside slides (images, text, buttons, galleries, etc.)
* Full creative control with InnerBlocks support and quick slide add/duplicate toolbar controls
* Slide effects: Slide, Fade, Coverflow, Flip, and Creative in slider mode; Slide and Coverflow in carousel mode
* Horizontal and Vertical slider directions with responsive height options (Fixed, Auto, Minimum height)
* Continuous Marquee mode with per-device toggle, configurable scroll speed, and pause-on-hover behavior
* Autoplay progress countdown bar with per-device visibility, top/bottom placement, height, and color controls
* Top and bottom SVG shape dividers with 10 presets, color, height units, opacity, flip, and invert options
* Interactive cursor follower navigation supporting icon, image, static text, and directional label modes
* Optional per-device image lightbox (fsLightbox) for Image and Gallery blocks inside slides
* Native Gutenberg block transforms from Core Cover, Group, and Gallery blocks directly into slides
* Loop, autoplay, grab cursor, touch/swipe, keyboard, and mousewheel navigation

**3. Logo Carousel Block**
Display client logos, partner brands, or sponsor images in a beautiful, animated carousel.

* Easy logo management with drag & drop reordering
* Hover effects: Grayscale-to-color, opacity, scale, and lift animations
* Clickable logos with custom URLs and link settings
* Block Transforms: Convert Core Gallery blocks directly into a Logo Carousel while preserving links, alt text, and captions
* Tooltips and captions with full styling options
* Responsive slides per view configuration
* Lazy loading for optimized performance

**4. Image Slider Block**
A versatile carousel for displaying images, brand assets, or partner logos with advanced interactive features.

* Lightbox Support: Responsive per-device toggle (Desktop, Tablet, Mobile) to view images in a full-screen overlay or open custom links when disabled
* Custom Tooltips: Add descriptive hover text with complete styling control (typography, colors, position)
* Clickable Images: Link each image to custom internal or external URLs
* Block Transforms: Convert Core Gallery blocks directly into an Image Slider while keeping alt text, captions, and links
* Caption Support: Display and style image captions for better context
* Responsive Design: Fully customizable columns and spacing for Desktop, Tablet, and Mobile
* Transitions: Slide and Coverflow effects powered by Swiper.js

**5. Testimonial Block**
Showcase customer testimonials, reviews, and feedback in a beautiful, interactive slider or carousel layout with star ratings.

* Author Info: Display author name, designation, and customizable avatar image
* Star Ratings: SVG-based star ratings with fractional support (e.g. 4.5 stars) or custom rating images
* Quote Icon: Choose between SVG icon or custom uploaded image for quote decoration
* Flexible Content Ordering: Drag to reorder content sections (quote, content, rating, author)
* RichText Editing: Edit title, testimonial text, author name, and designation directly in the editor
* Per-slide Background: Individual background color, gradient, and image with overlay and opacity controls
* Responsive Design: Fully customizable columns and spacing for Desktop, Tablet, and Mobile
* Transitions: Slide, Fade, Coverflow, Flip, and Creative in slider mode; Slide and Coverflow in carousel mode

== Key Features ==

* **Multiple Transition Effects:** Slide, Fade, Coverflow, Flip, and Creative (Base Slider, Flexi Content, and Testimonial in slider mode); Slide and Coverflow in carousel mode and for Image Slider and Logo Carousel
* **Fully Responsive:** Separate settings for Desktop, Tablet, and Mobile
* **Navigation Controls:** Customizable arrows (icons or images), pagination (bullets, fraction, progressbar), autoplay progress bar, and interactive cursor follower navigation
* **Advanced Layouts & Transforms:** Continuous marquee ticker mode, vertical direction, SVG shape dividers, and one-click Core Gallery, Cover, and Group block transforms
* **Performance Optimized:** Built with Swiper.js for smooth, hardware-accelerated animations
* **Accessibility Ready:** Keyboard navigation, ARIA labels, and touch support
* **Custom Styling:** Full control over colors, typography, spacing, borders, and shadows
* **Google Fonts:** Built-in typography options with Google Fonts integration

== Support ==

If you have any questions, please email us at **[gsliderblocks@gmail.com](mailto:gsliderblocks@gmail.com)**

== Installation ==

There are no prerequisites for installing **GSlider Blocks**. You can follow the steps below to complete the installation.

= Automatic Installation =
1.  Go to `Plugins > Add New` screen from your WordPress website dashboard.
2.  Search for `GSlider Blocks`.
3.  Install and activate the plugin, that's it!

== Frequently Asked Questions ==

= Does the plugin come for free? =

Yes, it's completely free.

= Can I customize the appearance of each slide individually? =

Yes, each slide can be customized independently with different content, backgrounds, and styling options.

= Does GSlider Blocks work with any WordPress theme? =

Yes, GSlider Blocks is designed to work with any WordPress theme that supports the block editor.

= What is the difference between Base Slider and Flexi Content? =

Base Slider has pre-built content elements (title, subtitle, description, button) for quick setup. Flexi Content allows you to use any Gutenberg blocks inside slides for complete creative freedom.

= Why do my slides show overlapping content with Creative, Coverflow, or Flip effects? =

These are 3D transition effects where slides are stacked in layers. If your slides have transparent backgrounds, content from slides behind will show through. To fix this, add a background color or background image to each slide in your slider settings.

= Where can I explore the design system and UI components? =

You can inspect all 23 isolated Gutenberg block controls, responsive breakpoints, and design tokens in our interactive Storybook explorer:
https://noruzzamans.github.io/gslider-blocks/

== Source Code & Build Instructions ==

The uncompiled, human-readable source code (blocks, React components, scripts, build config) is publicly available at https://github.com/noruzzamans/gslider-blocks. The `build/` directory in this plugin is generated from that source.

To build and compile the production assets from source:
0. Clone the repository: `git clone https://github.com/noruzzamans/gslider-blocks`
1. Install dependencies: `npm install` and `composer install`
2. Compile production assets: `npm run build`

== Contributing & Community ==

GSlider Blocks is 100% open-source software! We warmly welcome community contributions, bug reports, and feedback:

* GitHub Repository: https://github.com/noruzzamans/gslider-blocks
* Contribution Guide: https://github.com/noruzzamans/gslider-blocks/blob/main/CONTRIBUTING.md
* Browse Good First Issues: https://github.com/noruzzamans/gslider-blocks/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22
* Interactive Component Storybook: https://noruzzamans.github.io/gslider-blocks/

== AI Assistant & Developer Tooling ==

GSlider Blocks provides an official, zero-cloud-cost Model Context Protocol (MCP) server for modern AI coding assistants (Claude Desktop, Cursor IDE, Antigravity, VS Code / Cline).

Developers and designers can inspect block schemas, generate validated slider markup, and load starter design templates locally:

* Official NPM Package: https://www.npmjs.com/package/@gslider/mcp-server
* Instant NPX Runner: `npx -y @gslider/mcp-server`
* MCP Developer Documentation: https://github.com/noruzzamans/gslider-blocks/tree/main/packages/mcp-server

== Third-Party Libraries ==

This plugin bundles and uses the following open-source third-party libraries:
* **Swiper.js** (v11.x)
  - Source: https://swiperjs.com/
  - Repository: https://github.com/nolimits4web/swiper
  - License: MIT License (https://github.com/nolimits4web/swiper/blob/master/LICENSE)
* **fslightbox** (v3.7.4, free/basic version)
  - Source: https://fslightbox.com/ (npm: https://www.npmjs.com/package/fslightbox)
  - License: MIT License (https://github.com/banthagroup/fslightbox/blob/master/LICENSE)
* **Font Awesome Free SVG Icons** (v6.x)
  - Source: https://fontawesome.com/
  - License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
* **Appsero Client** (v2.0.7)
  - Source: https://github.com/Appsero/client
  - License: MIT License (https://github.com/Appsero/client/blob/develop/composer.json)

== External Services ==

This plugin may connect to or load resources from external third-party services in the following scenarios:

1. **Google Fonts API**
   - **Service URL:** `https://fonts.googleapis.com`
   - **Purpose:** Dynamically loads Google Web Fonts selected by the user in the block typography settings to render custom slider fonts.
   - **Data Sent:** Only standard HTTP request headers (font family, weight variants, user agent) are sent by the browser. No personal identifiable user information is sent or stored.
   - **Terms & Privacy:**
     - Terms of Service: https://developers.google.com/fonts/terms
     - Privacy Policy: https://policies.google.com/privacy

2. **Appsero Telemetry & Diagnostics (Opt-in)**
   - **Service URL:** `https://api.appsero.com`
   - **Purpose:** Used for plugin diagnostics, crash analytics, and feature usage to help improve the plugin.
   - **Consent:** Telemetry is strictly opt-in and requires explicit user consent upon activation. Users can decline or deactivate tracking at any time.
   - **Terms & Privacy:**
     - Terms & Privacy Policy: https://appsero.com/privacy-policy/

== Screenshots ==

== Changelog ==

= 1.2.3 – November 10, 2026 =
* Blocks Manager: Fixed concurrent toggles losing each other's changes. Updates now run behind a database lock (where the database supports it) and re-read the stored value first.
* Blocks Manager: Toggle errors now show the real failure reason for each block.
* Blocks Manager: A failed dashboard load now shows an error with a retry button instead of showing every block as enabled.
* Props: @faisalahammad, @noruzzaman.

= 1.2.2 – November 9, 2026 =
* Flexi Content: Added continuous smooth marquee ticker mode with per-device toggle, configurable scroll speed, pause-on-hover behavior, and reduced-motion support.
* Flexi Content: Added vertical slider direction with dedicated fixed height controls, top/bottom arrow alignment, and Y-axis creative transitions.
* Flexi Content: Added customizable autoplay progress countdown line indicator with per-device visibility, top/bottom positioning, height, and color controls.
* Flexi Content: Added interactive cursor follower navigation with icon, image, static text, and directional label modes plus full styling controls on the frontend.
* Flexi Content: Added top and bottom SVG shape dividers with 10 presets and per-device visibility, height units, color, opacity, flip, and invert controls.
* Flexi Content: Added optional per-device image lightbox (fsLightbox) for Image and Gallery blocks inside slides while preserving custom page links.
* Flexi Content: Added desktop grab cursor toggle for drag navigation and toolbar controls to add or duplicate slides directly in the editor.
* Block Transforms: Added native Gutenberg transforms from Core Gallery to Image Slider, Logo Carousel, and Flexi Content (excluding dynamic/bound galleries), plus Cover and Group multi-block transforms to Flexi Content.
* Image Slider: Upgraded Lightbox control to a responsive per-device toggle (Desktop, Tablet, Mobile) and supported opening custom image links safely when lightbox is disabled.
* Image Slider: Fixed normal and hover image wrapper background color output on the frontend.
* Security: Enforced strict wrapper-scoped CSS selector validation in StyleGenerator so arbitrary or unscoped selectors cannot bypass block containment.
* Style Engine: Emitted @media rules after Desktop CSS so Tablet and Mobile styles override Desktop properly, and honored Tablet/Mobile border-radius across all blocks.
* Style Engine: Fixed invalid unlinked responsive spacing CSS declarations across viewports.
* Block Fixes: Applied Global ID and Global Class cleanly once on outer slider wrappers, regenerated colliding blockId values immediately upon block or slide duplication, and guarded empty blockId pagination selectors.
* Swiper & Patterns: Enabled Swiper dynamic observers for Flexi Content sliders inside tabs and modals, scoped Swiper CSS overrides per slider, and regenerated all bundled block patterns to match current markup.
* Accessibility & i18n: Restored keyboard focus outlines in slider stylesheets per WCAG 2.4.7 and wrapped Gutenberg editor aria-label strings with i18n translations across all blocks.
* Admin Dashboard: Made dashboard React views translatable with WP-CLI makepot support, achieved WCAG AA contrast compliance, fixed ARIA/keyboard/toast live-region accessibility, enabled retry handling, and added dynamic module counts.
* Maintenance & QA: Expanded PSR-4 unit tests (SupportSVG, FontLoader), hardened WPCS test escaping and sanitization, cleaned up JSDoc tags and nested ternaries, and added the root GPLv2 LICENSE file.
* Props: Heartfelt thanks to all community contributors who helped shape this release: @faisalahammad, @harryhawwy69, @Ptraaah, @Ankitavasudev, @barkya28, @pralav-25, @riteshyadav33302111-cell.

= 1.2.1 – November 1, 2026 =
* Performance: Optimized Largest Contentful Paint (LCP) with high-priority slide image preloading and deferred non-critical script execution.
* Performance: Accelerated slider transitions with GPU-enforced CSS hardware acceleration and pre-initialized slide flex rows to eliminate Cumulative Layout Shift (CLS).
* Security: Implemented strict Content Security Policy (CSP) nonce filters for inline styles and scripts, hardening compliance with enterprise security headers.
* Accessibility: Restored visible keyboard focus rings on navigation arrows per WCAG 2.4.7 guidelines.
* Accessibility: Added support for prefers-reduced-motion media queries and enabled keyboard focus tooltips on :focus-within.
* Accessibility: Enhanced screen reader ARIA labels across pagination containers and sortable slider controls.
* Swiper Engine: Fixed active slide desynchronization in infinite loop mode by switching from activeIndex to realIndex for duplicate slides.
* Block Fixes: Corrected rating star gap units and desktop fallback handling in Testimonial Slider.
* Block Fixes: Resolved tablet background hover styling in Logo Carousel and localized button placeholders in Base Slider.
* Block Fixes: Restored core Additional CSS classes (customClassName) support on frontend wrapper in Image Slider and all blocks.
* Admin & Architecture: Cleaned up obsolete dashboard endpoints and hardened REST API routing.
* MCP AI Ecosystem: Officially published @gslider/mcp-server on NPM with zero-install npx support, model context protocol tools, and GitHub Actions trusted publishing.
* Maintenance: Cleaned up unused imports, dead variables, and refined code documentation across block components.
* Props: Heartfelt thanks to all community contributors and WordPress.org forum reporters who helped shape this release: @huzaifaalmesbah, @hmbashar, @Nethsara14, @Pushkar-Shahi, @rejaulalomkhan, @Zhiyilang, @blank-0007, @p00jitha, @Aaqibhafeezkhan, @Sinkleberg, @dbdefault, @ect2000, @irfat-ifti, @madhavidayma21, @mahender9390, @tu-lasizzzz, @devmuhib, @ateliercommodore, @jrevillini.

= 1.2.0 – October 19, 2026 =
* Storybook Design System: Integrated 23 isolated Gutenberg UI controls with live interactive explorer (https://noruzzamans.github.io/gslider-blocks/).
* Accessibility: Integrated @storybook/addon-a11y with automated WCAG 2.1 AA accessibility auditing across all inspector controls.
* Architecture: Native Gutenberg block patterns, PSR-4 singleton architecture, and decoupled headless REST API serialization (/wp-json/gslider/v1/blocks/<id>).
* Admin Dashboard: Streamlined modern admin dashboard with live metrics, quickstart guide, and block toggles.
* MCP AI Integration: Built-in local Model Context Protocol server for AI coding assistants.
* Security: Eliminated dynamic CSS file generation in wp-content/uploads/ in favor of safe, block-scoped inline styles rendered via wp_add_inline_style().
* Security: Implemented strict CSS sanitization and selector scoping to prevent arbitrary CSS injection, rejecting disallowed selectors and dangerous CSS rules.
* Security: Fully cleaned up legacy custom CSS attributes and removed unused code editor dependencies across all blocks.
* Security: Bundled Font Awesome icon library locally within the plugin, completely removing runtime remote asset fetching from external repositories.
* Documentation: Fixed 404 broken URLs in readme.txt for Appsero license and privacy policy links to valid endpoints.

= 1.1.9 – October 14, 2026 =
* Security: Removed custom CSS input editor and arbitrary code insertion across all blocks to strictly comply with WordPress.org security guidelines.
* Security: Sanitized dynamic CSS output via `wp_strip_all_tags()` and strict protocol/tag filtering in StyleGenerator.
* Compatibility: Removed deprecated `libxml_disable_entity_loader()` calls in SVG validator in favor of secure `LIBXML_NONET` flag.
* Compatibility: Fixed PHP parse issues on earlier PHP versions by removing private class constants, void return types, and trailing function-call commas.
* Compatibility: Updated minimum declared PHP version to PHP 7.4.
* Library Update: Upgraded `appsero/client` from v2.0.4 to v2.0.7.
* Documentation: Added dedicated sections for source repository, build instructions, third-party libraries, and external services disclosure.

= 1.1.8 – August 20, 2026 =
* Compliance: Updated and refactored codebase to fully adhere to all WordPress.org Plugin Directory Guidelines and Security Standards.
* Security: Hardened SVG upload validation with robust XXE injection protection and case-insensitive XSS attribute scanning.
* Security: Enhanced input sanitization, data validation, and output escaping across all blocks and controls.
* Optimization: Optimized code structure and resolved all errors/warnings per WordPress Plugin Check (PCP) requirements.
* Fix: Restored PHP 7.x compatibility (replaced PHP 8.0+ `str_contains()` with `strpos()`).
* Fix: Wrapped all `error_log()` calls in `WP_DEBUG` checks per WordPress development standards.
* Fix: Removed deprecated `load_plugin_textdomain()` call (auto-loaded by WordPress.org since WP 4.6).
* Optimization: Cleaned up redundant admin assets and optimized script loading for better performance.


= 1.1.7 – May 10, 2026 =
- Added Testimonial Slider block with Swiper.js integration
- Author Info: Display author name, designation, and customizable avatar image
- Star Rating: SVG-based star ratings with fractional support (e.g. 4.5 stars)
- Custom Rating Images: Upload custom SVG or image for rating icons
- Quote Icon: Choose between SVG icon or custom image for quote decoration
- Flexible Content Ordering: Drag to reorder content sections (quote, content, rating, author)
- RichText Editing: Edit title, testimonial text, author name, and designation directly in the editor
- Per-slide Background: Individual background color, gradient, and image with overlay and opacity controls
- Responsive Design: Fully customizable columns and spacing for Desktop, Tablet, and Mobile
- Transitions: Slide, Fade, Coverflow, Flip, and Creative in slider mode; Slide and Coverflow in carousel mode

= 1.1.6 – February 9, 2026 = 
**New Block: Image Slider**
- Added Image Slider block with Swiper.js integration
- Lightbox Support: View images in a stunning full-screen overlay
- Custom Tooltips: Add descriptive hover text with complete styling control (typography, colors, position)
- Clickable Images: Link each image to custom internal or external URLs
- Caption Support: Display and style image captions for better context
- Responsive Design: Fully customizable columns and spacing for Desktop, Tablet, and Mobile
- Transitions: Slide and Coverflow effects powered by Swiper.js

= 1.1.5 – December 30, 2025 = 
**Fixed: Fade effect initial load glitch**
- Resolved an issue where the first slide would briefly animate from right to left when using the fade effect on page load
- Improved slider initialization to disable transitions during initial positioning
- Fix applies to both wrapper and individual slide elements for consistent behavior

= 1.1.4 – December 19, 2025 = 
**New: SVG Icons support for toolbar actions**
- Icons are now consistent across Logo Carousel and Image Slider blocks
- Improved code maintainability with single-source icon management

= 1.1.3 – December 16, 2025 = 
**New Block: Logo Carousel**
- Added fully-featured Logo Carousel block with Swiper.js integration
- Logo Management: Add, remove, duplicate, and reorder logos with drag & drop
- Advanced Carousel Controls: Autoplay, infinite loop, navigation arrows, pagination (bullets/fraction/progressbar)
- Responsive Settings: Configure slides per view, spacing, and speed for Desktop, Tablet, and Mobile
- Logo Styling: Customizable hover effects including grayscale-to-color transition, opacity, scale, and lift animations
- Logo Links: Enable clickable logos with custom URLs, target, and rel attributes
- Tooltips: Add custom tooltip text with full styling controls (typography, colors, positioning, spacing, borders)
- Captions: Display logo captions with complete styling options
- Responsive Visibility: Show/hide individual logos on specific devices
- Vertical Alignment: Control logo positioning (top, middle, bottom) within slides
- Performance: Built-in lazy loading support for optimized page speed
- Navigation: Customizable arrow icons/images with flexible positioning (inside/outside)
- Accessibility: Keyboard navigation, mousewheel control, and ARIA labels
- Google Fonts: Full support for custom typography with Google Fonts integration

= 1.1.2 – December 04, 2025 = 
- **Added**: keyboard Navigation control

= 1.1.1 – November 15, 2025 = 
- **Fixed**: Minor CSS issues

= 1.1.0 – October 11, 2025 =
- **Fixed**: Fixed-height mode now uses the tallest (max-content) slide to set a uniform slider and background-image height across all Flexi Content items, resolving the navigation “bottom jump”.

= 1.0.10 – October 02, 2025 =
- **Added**: Accessibility improvements — navigation arrows.
- **Fixed**: Height unit support (px, %, vh, vw, em, rem) and range validation for min/height.
- **Fixed**: Auto-height alignment issue causing content/navigation jump.

= 1.0.9 – September 29, 2025 =
- **Added**: Minimum height option for all blocks  
- **Fixed**: Minor CSS issues  

= 1.0.8 – September 20, 2025 =
- **Added**: Auto height option for all blocks  
- **Added**: Responsive support for navigation and pagination  
- **Fixed**: Minor CSS issues  
- **Enhanced**: Settings layout design

= 1.0.7 – July 27, 2025 =
- **Added**: Base Slider Content Padding Options
- **New**: Introduced **"Flexi Content"** block support inside sliders using `gslider-blocks/flexi-content-item` with dynamic InnerBlocks integration.

= 1.0.6 – July 16, 2025 =
- **Fixed**: Resolved deprecated code issues to ensure compatibility with the latest standards.
- **Fixed**: Corrected navigation padding issues for improved layout consistency.

= 1.0.5 – July 07, 2025 =
Fixed navigation position issues

= 1.0.4 July 02 2025 =
Added: Custom Navigation Icon option for sliders.
Users can now set custom left and right navigation icons from the Navigation settings for improved design flexibility.

Added: Support for custom icon images or SVG uploads.
Users can upload their own image files or SVG icons as navigation arrows to better match their site branding and design systems.

= 1.0.3 June 27 2025 =
Enhancements:

Updated the Navigation settings panel for greater layout flexibility.

Added Position Type toggle with options: Inside and Outside.

Introduced Arrow Direction dropdown (e.g., Row, Column) for custom navigation layout.

New Offset Controls: Added adjustable Top, Right, Bottom, and Left Offset sliders with support for both % and px units.

Added Gap setting to control spacing between navigation elements, with unit selection and reset capability.

Added Padding control to define spacing around the entire navigation component.

UI Improvements:

Enhanced slider responsiveness and alignment for a smoother user experience.

Grouped controls more logically to improve usability and clarity.

= 1.0.2 June 21 2025 =
New Features:
Element Toggles: Added options to show/hide Subtitle, Title, Description, Button, Navigation, and Pagination directly from the General tab.

Style Sections: New grouped style controls for each element (Title, Subtitle, Button, etc.) for easier customization.

Advanced Options: Added Layout, Background, Border & Shadow, and Custom CSS sections under the Advanced tab.

Improvements:
Unified Control Panel: Settings are now context-aware and cleaner, combining all slider options into one organized panel.

Better UX: Enhanced slider item management and updated tab structure (General, Style, Advanced) for smoother workflow.

Replaced the old Z-index-only Advanced tab with full design control options.

Retired the basic layout for a modern, component-based settings UI.

= 1.0.0 =
Initial release
