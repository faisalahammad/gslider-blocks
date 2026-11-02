# Contributing to GSlider Blocks

Thank you for your interest in contributing to **GSlider Blocks**! This project provides modern carousels and sliders for WordPress. 

To maintain stability, security, and world-class code quality, all contributors (human and AI) must adhere strictly to these guidelines.

---

## 🧭 Foundational Standards & Architecture

Before submitting code, please review our core architectural documents:
- 📚 **[Developer Handbook](docs/README.md)** — Documentation index and how-to guides.
- 🏗️ **[Architecture Guide](docs/explanations/architecture.md)** — Architectural principles, patterns, and checklists.
- 📜 **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** — Contributor Covenant v2.1.
- 🛡️ **[SECURITY.md](SECURITY.md)** — Security disclosure process and built-in protections.

---

## 🔒 Protected Core Directory: `src/components/` (Maintainer-Only)

> [!CAUTION]
> **NO ONE EXCEPT `@noruzzamans` IS PERMITTED TO EDIT OR ADD FILES TO `src/components/`.**
> All blocks depend on these 23 foundational components. Any arbitrary edit can break live websites.
> - **Use only:** You are encouraged to **use** these components via `@Components/...` in blocks.
> - **Never alter:** PRs modifying `src/components/` without explicit maintainer pre-approval will **not be merged**. CI labels them `needs: changes` and posts a warning comment.

---

## 💻 Local Development Setup

Choose the environment setup that matches your local workflow:

### Option A: LocalWP (Recommended GUI Workflow)
1. Install [Local](https://localwp.com/) (Mac, Windows, or Linux).
2. Create a fresh WordPress site.
3. Open terminal in the site's plugin directory:
   ```bash
   cd ~/Local\ Sites/<site-name>/app/public/wp-content/plugins/
   git clone https://github.com/noruzzamans/gslider-blocks.git
   cd gslider-blocks
   npm install
   npm run build  # Required: compiles block assets into build/
   npm run start  # Watch mode
   ```
4. Activate **GSlider Blocks** in WordPress Admin → Plugins.

### Option B: Docker via `@wordpress/env` (Zero-Config CLI)
Requirements: [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
```bash
# Clone the repository
git clone https://github.com/noruzzamans/gslider-blocks.git
cd gslider-blocks

# Install dependencies
npm install

# Compile block assets into build/ (build/ is gitignored, required before start)
npm run build

# Start local WordPress environment (runs on port 8888)
npx @wordpress/env start

# Open site in browser: http://localhost:8888
# WP Admin credentials:
# Username: admin
# Password: password
```
To stop the environment:
```bash
npx @wordpress/env stop
```

---

## 🌿 Branching & Development Workflow

1. **Sync with Upstream:** Always ensure your local `main` is up to date:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Structured Branch Naming:** Create a branch following the `<type>/<issue-number>-<kebab-case-description>` convention:
   ```bash
   # Bug Fixes (link issue number if applicable)
   git checkout -b fix/55-swiper-pagination-overlap

   # New Features & Enhancements
   git checkout -b feat/testimonial-carousel-rating-stars

   # Documentation & Specifications
   git checkout -b docs/35-architecture-readme-overhaul

   # Performance & Refactoring
   git checkout -b refactor/dynamic-css-caching-pipeline
   ```
3. **Watch Mode:** Run development bundler:
   ```bash
   npm run start
   ```
4. **Admin Styles (if modifying SCSS):**
   ```bash
   npm run admin:build
   ```

---

## 📋 Pull Request Title & Commit Conventions

All commits and pull requests must follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <short description in present tense>
```

- **Types:** `feat`, `fix`, `docs`, `refactor`, `test`, `ci`, `chore`.
- **Scopes:** `blocks`, `design-system`, `core`, `headless`, `mcp`, `swiper`, `ci-cd`.
- **Examples:**
  - `feat(headless): implement REST API block parser`
  - `fix(swiper): prevent layout jump before slide initialization`
  - `docs(contributing): update AI policy and component lock`

---

## 🎯 Issue-First Policy (No Orphan PRs)

> [!IMPORTANT]
> **No Pull Request will be accepted without an approved issue.**  
> GSlider Blocks strictly enforces an **Issue-First Policy**. Unsolicited or "orphan" pull requests submitted without a corresponding, open GitHub issue will be closed by the maintainer.
>
> **The 3-Step Contribution Flow:**
> 1. **Open an Issue First:** Report the bug or propose your feature via [GitHub Issues](https://github.com/noruzzamans/gslider-blocks/issues) before writing code.
> 2. **Discuss & Get Triage:** Discuss the implementation approach with the maintainer and get assigned.
> 3. **Submit PR with Issue Link:** Reference the approved issue in your PR description:
>    ```markdown
>    ### 🔗 Related Issue
>    Closes #<issue_number>
>    ```
>    This ensures GitHub automatically links and closes the resolved issue upon merge.

---

## 🤖 Use of AI Policy

We welcome AI-assisted contributions from leading AI coding tools (such as Cursor, Claude, GitHub Copilot, OpenAI Codex/ChatGPT, Gemini, Windsurf, Antigravity, etc.) with the following mandatory guardrails:

1. **Human Ownership:** You are 100% responsible for all code submitted. Blind copy-pasting of AI output without testing is prohibited.
2. **Zero Block Invalidation:** Never alter `save.js` markup or attribute defaults of existing blocks without backward-compatible migrations in `deprecated.js`.
3. **Strict Design System:** AI agents must use the 23 approved `@Components/*` controls. Never generate raw `@wordpress/components` inputs.
4. **Zero Hallucinations:** Do not introduce non-existent npm/composer dependencies or WordPress core functions.
5. **No Robotic / Fluff Phrasing:** Write PR descriptions in clear, senior-engineer prose. Avoid generic AI fluff.

---

## 🛡️ Pull Request Quality Checklist

Before submitting a PR, run these checks. The codebase does not pass ESLint or Stylelint yet, so lint only the files you changed and do not add new errors to them:

```bash
# 1. Lint the JavaScript files you changed
npx wp-scripts lint-js src/blocks/<block>/<file>.js

# 2. Lint the SCSS files you changed
npx wp-scripts lint-style src/blocks/<block>/<file>.scss

# 3. Production Build
npm run build

# 4. MCP Server Build (if modified)
npm run mcp:build
```

Ensure your PR satisfies:
- [ ] Did **NOT** modify `src/components/` (or changes were pre-authorized by `@noruzzamans`).
- [ ] Used **ONLY** approved `@Components/*` controls (Zero raw Gutenberg input controls).
- [ ] Tested on existing blocks with **0 block invalidation errors**.
- [ ] Follows WordPress PHP & React coding standards.
- [ ] Verified on PHP 7.4 through PHP 8.5 matrix.
- [ ] PR description starts with `Closes #<issue_number>`.

---

## 👥 Code Review Process

1. **Assignee:** Assign yourself to an issue before starting work.
2. **Reviewer:** All PRs require at least **1 approving review** from `@noruzzamans` to merge.

---

## ⚖️ WordPress.org Review Policy & Conflict of Interest (COI)

> [!WARNING]
> **Strict Policy for Code Contributors: DO NOT review or rate GSlider Blocks on WordPress.org!**  
> Under official [WordPress.org Review Guidelines](https://wordpress.org/support/guidelines/#reviews), any contributor who has submitted code to a plugin or theme is considered to have a **Conflict of Interest (COI)** and is strictly prohibited from leaving reviews or ratings on the WordPress.org directory.
>
> - 🚫 **Zero Exceptions:** Even out of genuine enthusiasm, goodwill, or appreciation, please **DO NOT** post a review on WordPress.org.
> - ⚠️ **Mandatory Reporting:** As the plugin maintainer, I am strictly obligated by WordPress.org community guidelines to report any contributor reviews to the WordPress.org support moderators for immediate removal and archival.
> - ⭐ **Channel Your Support on GitHub:** If you want to show your appreciation and help the project grow, please give a **Star (⭐) on GitHub**, share the repository with fellow developers, or contribute to open issues!
