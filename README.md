<h1 align="center">GSlider Blocks</h1>

<p align="center">
  <strong>🎠 The Ultimate Gutenberg Carousel Collection</strong><br>
  High-Performance, React & Swiper.js Powered Slider Blocks for Modern WordPress, Headless Stacks & Native MCP AI Workflows
</p>

<p align="center">
  <a href="https://wordpress.org/plugins/gslider-blocks/">
    <img src="https://ps.w.org/gslider-blocks/assets/banner-1544x500.png" width="100%" alt="GSlider Blocks - Gutenberg Carousel Collection">
  </a>
</p>

<p align="center">
  <a href="https://wordpress.org/plugins/gslider-blocks/">
    <img src="https://img.shields.io/wordpress/plugin/installs/gslider-blocks?color=2271b1&label=Active%20Installs&logo=wordpress" alt="Active Installs">
  </a>
  <a href="https://wordpress.org/plugins/gslider-blocks/">
    <img src="https://img.shields.io/wordpress/plugin/rating/gslider-blocks?color=ffb800&label=Rating&logo=wordpress" alt="WordPress.org Rating">
  </a>
  <a href="https://wordpress.org/plugins/gslider-blocks/?preview=1">
    <img src="https://img.shields.io/badge/Live%20Preview-WordPress.org-3858e9?logo=wordpress&logoColor=white" alt="Live Preview on WordPress.org">
  </a>
  <a href="https://github.com/noruzzamans/gslider-blocks/actions/workflows/ci.yml">
    <img src="https://github.com/noruzzamans/gslider-blocks/actions/workflows/ci.yml/badge.svg" alt="CI Build Status">
  </a>
  <a href="https://wordpress.org/plugins/gslider-blocks/">
    <img src="https://img.shields.io/badge/Version-1.2.1-orange.svg" alt="Version">
  </a>
  <a href="https://github.com/noruzzamans/gslider-blocks/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22">
    <img src="https://img.shields.io/github/issues/noruzzamans/gslider-blocks/good%20first%20issue?color=7057ff&label=Good%20First%20Issues" alt="Good First Issues">
  </a>
  <a href="https://github.com/noruzzamans/gslider-blocks/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
  </a>
  <a href="https://wordpress.org/">
    <img src="https://img.shields.io/badge/WordPress-6.3+-blue.svg?logo=wordpress" alt="WordPress 6.3+">
  </a>
  <a href="https://php.net/">
    <img src="https://img.shields.io/badge/PHP-7.4--8.5-purple.svg?logo=php" alt="PHP 7.4-8.5">
  </a>
  <a href="http://www.gnu.org/licenses/gpl-2.0.html">
    <img src="https://img.shields.io/badge/License-GPLv2+-green.svg" alt="License">
  </a>
  <a href="https://swiperjs.com/">
    <img src="https://img.shields.io/badge/Engine-Swiper%2011-red.svg" alt="Swiper 11">
  </a>
  <a href="https://noruzzamans.github.io/gslider-blocks/">
    <img src="https://img.shields.io/badge/Storybook-Live%20Explorer-ff4785.svg?logo=storybook" alt="Storybook Design System">
  </a>
  <a href="docs/how-to-guides/mcp-server-ai-workflows.md">
    <img src="https://img.shields.io/badge/MCP-Ready-9cf.svg?logo=anthropic" alt="MCP Compatible">
  </a>
</p>

<p align="center">
  <a href="https://wordpress.org/plugins/gslider-blocks/?preview=1">🚀 <strong>Live Preview (WordPress.org)</strong></a> •
  <a href="https://noruzzamans.github.io/gslider-blocks/">🎨 <strong>Component Storybook</strong></a> •
  <a href="https://wordpress.org/plugins/gslider-blocks/">🌟 <strong>WordPress.org Plugin</strong></a> •
  <a href="#-support-the-project">⭐ <strong>Support on GitHub</strong></a>
</p>

<p align="center">
  <a href="#-about--value-proposition">About</a> •
  <a href="#-design-system--component-storybook">Storybook</a> •
  <a href="#-available-blocks">Blocks</a> •
  <a href="#-developer-guides--headless--ai-workflows">Developer Guides</a> •
  <a href="#-quick-installation">Installation</a> •
  <a href="#-contributing--local-development">Contributing</a> •
  <a href="#-support-the-project">Support ⭐</a>
</p>

---

## 📖 About & Value Proposition

**GSlider Blocks** is an enterprise-grade Gutenberg carousel library designed for production WordPress websites. Built with modern React, PSR-4 PHP architecture, and Swiper 11, it delivers fluid hardware-accelerated animations, zero block invalidations, and native Headless/AI support without any jQuery dependencies.

### Why GSlider Blocks?

| Feature | GSlider Blocks | Typical Slider Plugins |
| :--- | :---: | :---: |
| **Gutenberg Native** | ✅ Direct block canvas editing | ❌ Shortcodes or detached builders |
| **Performance & Weight** | ✅ Hardware-accelerated Swiper 11, Zero jQuery | ❌ Heavy jQuery, bloated CSS bundles |
| **Dynamic CSS Pipeline** | ✅ Scoped, deduplicated CSS generated via dynamic style engine instead of `style=""` attributes | ❌ Polluted inline `style=""` attributes |
| **Responsive Architecture** | ✅ Dedicated 3-device controls (Desktop, Tablet, Mobile) | ⚠️ Generic breakpoint guessing |
| **Local AI Integration** | ✅ Model Context Protocol (MCP) server ($0 cloud cost) | ❌ No AI schema support |
| **Headless Ready** | ✅ Dedicated REST API JSON endpoints & serialized blocks | ❌ Shortcode regex parsing needed |
| **Code Stability** | ✅ Backwards-compatible `deprecated.js` migrations | ❌ "Block invalidation" white screens on updates |

---

## 🎨 Design System & Component Storybook

GSlider Blocks features an enterprise **23-component design system** modeled directly after the official [WordPress Gutenberg Storybook](https://wordpress.github.io/gutenberg). Every UI control is completely isolated, WCAG 2.1 AA accessible, responsive-aware (Desktop, Tablet, Mobile), and built strictly for the Gutenberg Inspector sidebar (280px–300px width).

👉 **[Launch Interactive Storybook Explorer](https://noruzzamans.github.io/gslider-blocks/)**

### 🧩 What's inside the Storybook:
* **23 Isolated Controls**: Responsive range, spacing, typography, colors, gradients, background images, elevation/shadows, layout preset selector, accessible drag-and-drop slide content reordering (`@dnd-kit`), and more.
* **Full Inspector Benchmark Composition**: Live simulation of the entire Gutenberg block settings sidebar mounting General, Style, and Advanced tabs in an authentic editor harness.
* **Automated Accessibility Testing (`@storybook/addon-a11y`)**: Live Axe-core accessibility auditing on every component state.
* **Architecture Guidelines & MDX Documentation**: Standardized 8-key spacing, 13-key typography, and 3-key color schemas.

---

## 📦 Available Blocks

| # | Block | Description | Status |
| :-: | :--- | :--- | :-: |
| 1 | 🎯 **Base Slider** | High-impact homepage hero sliders with headings, CTAs & custom backgrounds | ✅ Production |
| 2 | 📝 **Flexi Content** | Full creative freedom: nest any WordPress block inside responsive slides | ✅ Production |
| 3 | 🏢 **Logo Carousel** | Client & partner brand showcases with grayscale hover animations and links | ✅ Production |
| 4 | 🖼️ **Image Slider** | Photography & product carousels with built-in Lightbox and captions | ✅ Production |
| 5 | ⭐ **Testimonial Carousel** | Social proof reviews with fractional star ratings, avatars & quotes | ✅ Production |
| 6 | 👥 **Team Carousel** | Staff & member profiles with bios, social links, and modal popups | 📋 Roadmap |
| 7 | 🎥 **Video Carousel** | Responsive video sliders for YouTube, Vimeo & self-hosted MP4 videos | 📋 Roadmap |
| 8 | 📊 **Stats Carousel** | Animated milestone metric counters and achievement sliders | 📋 Roadmap |
| 9 | 🏆 **Awards Carousel** | Certification badges, client honors & industry recognition sliders | 📋 Roadmap |
| 10 | 📰 **Post Carousel** | Dynamic query slider for WordPress blog posts and Custom Post Types | 📋 Roadmap |

> [!TIP]
> ### ⭐ Love GSlider Blocks? Give it a Star on GitHub!
> If **GSlider Blocks** saves you time, powers your clients' websites, or helps your open-source journey, please consider giving it a **[Star on GitHub](https://github.com/noruzzamans/gslider-blocks)**! It takes only 2 seconds and helps our open-source project gain visibility across the WordPress community.

---

## 📚 Developer Guides & Headless / AI Workflows

Looking to extend GSlider Blocks, connect with AI coding assistants, or build modern decoupled/headless web applications? Check out our dedicated developer guides:

| Guide | Description |
| :--- | :--- |
| 🤖 **[MCP Server & AI Assistant Guide](docs/how-to-guides/mcp-server-ai-workflows.md)** | Connect GSlider to **Claude Desktop**, **Cursor**, **Antigravity**, **ChatGPT**, and **Windsurf** with $0 cloud cost. |
| 🌐 **[Headless WordPress & REST API Guide](docs/how-to-guides/headless-rest-api.md)** | Consume `/wp-json/gslider/v1/blocks/<id>` in **Next.js 14/15 App Router**, **Astro**, and **Remix** with pre-parsed Swiper configs. |
| 🏗️ **[System Architecture Guide](docs/explanations/architecture.md)** | Learn about the PSR-4 Singleton backend, dynamic CSS generation pipeline, and zero-invalidation deprecation system. |
| 🎣 **[PHP Hooks & Filters Reference](docs/reference-guides/php-hooks.md)** | Complete reference of action hooks and filter hooks for customizing slider markup, styles, CSP nonces, and caches. |

---

## 🚀 Quick Installation

Getting started with GSlider Blocks takes less than 30 seconds:

1. In your WordPress Admin Dashboard, navigate to **Plugins ➔ Add New Plugin**.
2. Search for **"GSlider Blocks"**.
3. Click **Install Now** and then **Activate**.
4. Open the Gutenberg block editor, type `/gslider` or click the `+` Block Inserter to add any slider block!

> [!TIP]
> 🌐 **[Live Preview on WordPress.org](https://wordpress.org/plugins/gslider-blocks/?preview=1)** — Official in-browser interactive preview running directly on WordPress.org!
>
> ⚡ **[Launch Gutenberg Editor in Playground](https://playground.wordpress.net/#eyJwcmVmZXJyZWRWZXJzaW9ucyI6eyJwaHAiOiJsYXRlc3QiLCJ3cCI6ImxhdGVzdCJ9LCJsb2dpbiI6dHJ1ZSwibGFuZGluZ1BhZ2UiOiIvd3AtYWRtaW4vcG9zdC1uZXcucGhwP3Bvc3RfdHlwZT1wYWdlIiwic3RlcHMiOlt7InN0ZXAiOiJpbnN0YWxsUGx1Z2luIiwicGx1Z2luRGF0YSI6eyJyZXNvdXJjZSI6IndvcmRwcmVzcy5vcmcvcGx1Z2lucyIsInNsdWciOiJnc2xpZGVyLWJsb2NrcyJ9fV19)** — One-click automated setup with WordPress admin auto-login, GSlider pre-activated, and landing straight in the block editor!
>
> 📖 **[Read Full Quick Start Guide](docs/getting-started/quick-start.md)** for step-by-step block pattern usage, slash commands, and block configuration.

---

## 🤝 Contributing & Local Development

Contributions from both human engineers and AI assistants are welcome! Whether you are building new features, fixing a bug, or polishing documentation:

### 🌟 First-Time Contributors Welcome!
Looking to make your first open-source contribution or build your WordPress / React portfolio? We have curated step-by-step beginner-friendly tasks with ready-to-run commands:
👉 **[Browse Good First Issues](https://github.com/noruzzamans/gslider-blocks/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)**

Every contributor with a merged PR is automatically inducted into our [Contributors](#-contributors) hall of fame and mentioned in our official release notes!

### 📚 Developer Resources & Setup
- 🛠️ **[Local Development Setup Guide](docs/getting-started/local-development.md)**: Setup with LocalWP, Docker (`@wordpress/env`), Composer, and Node.js.
- ⚡ **[NPM & Build Workflow](docs/getting-started/local-development.md#-daily-development-workflow)**: Watch mode (`npm run start`), production builds, and admin asset compilation.
- 🧪 **[Testing & Code Quality Matrix](docs/getting-started/local-development.md#-testing-suite--quality-assurance)**: Standalone PHP CLI unit tests (PHP 7.4–8.5 matrix), schema drift tests, and CI checks.
- 📖 **[CONTRIBUTING.md](CONTRIBUTING.md)**: Forking, branching, PR title conventions, and AI contribution policy.
- 📚 **[Developer Handbook](docs/README.md)**: Central developer documentation map and technical guides.
- 🏗️ **[Architecture Guide](docs/explanations/architecture.md)**: Engineering principles, patterns, and pre-flight developer checklist.
- 📜 **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)**: Contributor Covenant v2.1.
- 🛡️ **[SECURITY.md](SECURITY.md)**: Vulnerability disclosure policy and security protections.

> [!IMPORTANT]
> **Issue-First Policy:** GSlider Blocks strictly requires all pull requests to resolve an approved [GitHub Issue](https://github.com/noruzzamans/gslider-blocks/issues) using `Closes #<issue_number>`. The maintainer closes unsolicited PRs submitted without an issue.

> [!CAUTION]
> **Component Lock Policy:** `src/components/` contains 23 core UI controls and is strictly locked to `@noruzzamans`. PRs modifying `src/components/` without maintainer authorization are flagged by CI with a warning comment and will not be merged.

---

## 📄 License

GSlider Blocks is open-source software licensed under the **GNU General Public License v2.0 or later (GPL-2.0-or-later)**.

```
GSlider Blocks - Gutenberg Carousel Collection for WordPress
Copyright (C) 2025-2026 Noruzzaman

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
```

---

## ⭐ Support the Project

If you find **GSlider Blocks** valuable or use it in your projects, please consider giving it a star on GitHub! It takes just a second and helps the project gain visibility across the WordPress & open-source community, attract more contributors, and motivates ongoing active development.

<p align="center">
  <a href="https://github.com/noruzzamans/gslider-blocks">
    <img src="https://img.shields.io/badge/⭐_Star_on_GitHub-gslider--blocks-yellow?style=for-the-badge&logo=github" alt="Star on GitHub">
  </a>
</p>

- **Star this repository** to bookmark it for future use.
- **Share it** with fellow WordPress developers, agencies, and friends.
- **Contribute** code, docs, or ideas to our open [Good First Issues](https://github.com/noruzzamans/gslider-blocks/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) or [Help Wanted issues](https://github.com/noruzzamans/gslider-blocks/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22).

> [!WARNING]
> **Strict Policy for Code Contributors: DO NOT review or rate GSlider Blocks on WordPress.org!**  
> Under official [WordPress.org Review Guidelines](https://wordpress.org/support/guidelines/#reviews), any contributor who has submitted code to a plugin or theme is considered to have a **Conflict of Interest (COI)** and is strictly prohibited from leaving reviews or ratings on the WordPress.org directory.
>
> - 🚫 **Zero Exceptions:** Even out of genuine enthusiasm, goodwill, or appreciation, please **DO NOT** post a review on WordPress.org.
> - ⚠️ **Mandatory Reporting:** As the plugin maintainer, I am strictly obligated by WordPress.org community guidelines to report any contributor reviews to the WordPress.org support moderators for immediate removal and archival.
> - ⭐ **Channel Your Support on GitHub:** If you want to show your appreciation and help the project grow, please give a **Star (⭐) on GitHub**, share the repository with fellow developers, or contribute to open issues!

---

<a id="contributors"></a>
## 👥 Contributors

Thank you to all the amazing people who contribute to GSlider Blocks!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/noruzzamans"><img src="https://avatars.githubusercontent.com/u/46926901?v=4" width="100px;" alt="Noruzzaman"/><br /><sub><b>Noruzzaman</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/devmuhib009"><img src="https://avatars.githubusercontent.com/u/142894870?v=4" width="100px;" alt="Muhibul Haque"/><br /><sub><b>Muhibul Haque</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dbdefault"><img src="https://avatars.githubusercontent.com/u/246079841?v=4" width="100px;" alt="dbdefault"/><br /><sub><b>dbdefault</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Aaqibhafeezkhan"><img src="https://avatars.githubusercontent.com/u/292322256?v=4" width="100px;" alt="Aaqibhafeez Khan"/><br /><sub><b>Aaqibhafeez Khan</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/blank-0007"><img src="https://avatars.githubusercontent.com/u/285468035?v=4" width="100px;" alt="blank-0007"/><br /><sub><b>blank-0007</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Sinkleberg"><img src="https://avatars.githubusercontent.com/u/1676751?v=4" width="100px;" alt="Sgt_Sinky"/><br /><sub><b>Sgt_Sinky</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://portfolio-website.riseinspirethrive2008.workers.dev/"><img src="https://avatars.githubusercontent.com/u/273587221?v=4" width="100px;" alt="Pushkar Shahi"/><br /><sub><b>Pushkar Shahi</b></sub></a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/p00jitha"><img src="https://avatars.githubusercontent.com/u/129841150?v=4" width="100px;" alt="DASARI PUJITHA"/><br /><sub><b>DASARI PUJITHA</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/huzaifaalmesbah"><img src="https://avatars.githubusercontent.com/u/63150399?v=4" width="100px;" alt="Huzaifa Al Mesbah"/><br /><sub><b>Huzaifa Al Mesbah</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ect2000"><img src="https://avatars.githubusercontent.com/u/107069576?v=4" width="100px;" alt="Emilio Castejón"/><br /><sub><b>Emilio Castejón</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linuxhostlab.com/"><img src="https://avatars.githubusercontent.com/u/7321834?v=4" width="100px;" alt="Md Abul Bashar"/><br /><sub><b>Md Abul Bashar</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://devnethsara.com/"><img src="https://avatars.githubusercontent.com/u/110768660?v=4" width="100px;" alt="Sasindu Nethsara Karanayaka"/><br /><sub><b>Sasindu Nethsara Karanayaka</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/madhavidayma21"><img src="https://avatars.githubusercontent.com/u/98448374?v=4" width="100px;" alt="Madhavi Dayma"/><br /><sub><b>Madhavi Dayma</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Zhiyilang"><img src="https://avatars.githubusercontent.com/u/154107452?v=4" width="100px;" alt="Zhiyilang"/><br /><sub><b>Zhiyilang</b></sub></a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/irfat-ifti"><img src="https://avatars.githubusercontent.com/u/197045488?v=4" width="100px;" alt="Md. Irfat Uddin Ifti"/><br /><sub><b>Md. Irfat Uddin Ifti</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mahender9390"><img src="https://avatars.githubusercontent.com/u/190497135?v=4" width="100px;" alt="Vennapureddy Mahender"/><br /><sub><b>Vennapureddy Mahender</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tu-lasizzzz"><img src="https://avatars.githubusercontent.com/u/172914448?v=4" width="100px;" alt="Tulasi Sahu"/><br /><sub><b>Tulasi Sahu</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rejaulalomkhan"><img src="https://avatars.githubusercontent.com/u/123895004?v=4" width="100px;" alt="Rejaul Alom Khan"/><br /><sub><b>Rejaul Alom Khan</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/apps/dependabot"><img src="https://avatars.githubusercontent.com/in/29110?v=4" width="100px;" alt="dependabot[bot]"/><br /><sub><b>dependabot[bot]</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://amerta.pages.dev/"><img src="https://avatars.githubusercontent.com/u/122882415?v=4" width="100px;" alt="ptraaa"/><br /><sub><b>ptraaa</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://faisalahammad.com/"><img src="https://avatars.githubusercontent.com/u/13257516?v=4" width="100px;" alt="Faisal Ahammad"/><br /><sub><b>Faisal Ahammad</b></sub></a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://pralav-singh-portfolio.vercel.app/"><img src="https://avatars.githubusercontent.com/u/174412353?v=4" width="100px;" alt="Pralav Singh"/><br /><sub><b>Pralav Singh</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shamiulbishal"><img src="https://avatars.githubusercontent.com/u/66864143?v=4" width="100px;" alt="Shamiul Bishal"/><br /><sub><b>Shamiul Bishal</b></sub></a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Contributions of any kind are welcome! See our [Contributing Guide](CONTRIBUTING.md) to get started.

---

## 👨‍💻 Maintainer & Credits

<p align="center">
  <img src="https://avatars.githubusercontent.com/noruzzamans" alt="Noruzzaman" width="90" height="90" style="border-radius: 50%;">
</p>

<p align="center">
  <strong>Noruzzaman</strong><br>
  WordPress Core & Gutenberg Engineer | Open Source Maintainer
</p>

<p align="center">
  <a href="https://github.com/noruzzamans" title="GitHub">
    <img src="https://img.shields.io/badge/--181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://linkedin.com/in/noruzzaman" title="LinkedIn">
    <img src="https://img.shields.io/badge/--0A66C2?style=for-the-badge&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xOSAwaC0xNGMtMi43NjIgMC01IDIuMjM4LTUgNXYxNGMwIDIuNzYyIDIuMjM4IDUgNSA1aDE0YzIuNzYyIDAgNS0yLjIzOCA1LTV2LTE0YzAtMi43NjItMi4yMzgtNS01LTV6bS0xMSAxOWgtM3YtMTBoM3YxMHptLTEuNS0xMS4yNjhjLS45NjYgMC0xLjc1LS43OS0xLjc1LTEuNzY0cy43ODQtMS43NjQgMS43NS0xLjc2NCAxLjc1Ljc5IDEuNzUgMS43NjQtLjc4MyAxLjc2NC0xLjc1IDEuNzY0em0xMy41IDExLjI2OGgtM3YtNS42MDRjMC0zLjM2OC00LTMuMTEzLTQtMHY1LjYwNGgtM3YtMTBoM3YxLjMwOWMxLjM5Ni0yLjU4NiA3LTIuNzc3IDcgMi40NzZ2Ni4yMTV6Ii8+PC9zdmc+" alt="LinkedIn">
  </a>
  <a href="https://x.com/Noruzzamanwp" title="X (Twitter)">
    <img src="https://img.shields.io/badge/--000000?style=for-the-badge&logo=x&logoColor=white" alt="X (Twitter)">
  </a>
  <a href="https://profiles.wordpress.org/noruzzaman/" title="WordPress.org Profile">
    <img src="https://img.shields.io/badge/--21759B?style=for-the-badge&logo=wordpress&logoColor=white" alt="WordPress Profile">
  </a>
  <a href="https://wordpress.org/plugins/gslider-blocks/" title="GSlider Blocks on WordPress.org">
    <img src="https://ps.w.org/gslider-blocks/assets/icon-256x256.png" height="28" alt="GSlider Blocks" style="border-radius: 4px; vertical-align: middle;">
  </a>
</p>

### Special Credits
- [Swiper.js](https://swiperjs.com/) — The modern mobile touch slider library.
- [WordPress Gutenberg](https://github.com/WordPress/gutenberg) — Block editor framework.
- [React](https://reactjs.org/) — Declarative UI component engine.
- [Appsero](https://appsero.com/) — Telemetry and analytics.

---

<p align="center">
  Made with ❤️ for the global WordPress Community
</p>
