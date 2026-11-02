# Local Development Environment Setup

This guide walks you through configuring a local development environment for contributing to or extending **GSlider Blocks**.

---

## 🛠️ System Prerequisites

Ensure the following tools are installed on your workstation before starting:

| Tool | Recommended Version | Purpose |
| :--- | :---: | :--- |
| **Node.js** | `>= 18.0.0` (LTS) | JavaScript build pipeline, Gutenberg scripts, Webpack. |
| **npm** | `>= 9.0.0` | Package manager for block frontend and MCP server. |
| **PHP** | `7.4` to `8.5` | Backend WordPress runtime and standalone test suite. |
| **Composer** | `>= 2.0.0` | PSR-4 autoloading class map generation. |
| **Git** | `>= 2.30.0` | Version control. |
| **WordPress Environment** | `>= 6.0` | Local WordPress instance (Local by Flywheel, Docker/`wp-env`, or Valet). |

---

## 🚀 Cloning & Initial Setup

1. Clone the repository into your local WordPress plugins directory (`wp-content/plugins/`):

```bash
cd /path/to/your/local-wordpress/app/public/wp-content/plugins/
git clone https://github.com/noruzzamans/gslider-blocks.git
cd gslider-blocks
```

2. Install root NPM dependencies:

```bash
npm install
```

3. Install Composer dependencies (PSR-4 autoloading):

```bash
composer install
```

4. *(Optional)* Install MCP Server workspace dependencies if developing AI tools:

```bash
cd packages/mcp-server && npm install && cd ../..
```

---

## ⚡ Daily Development Workflow

GSlider Blocks utilizes `@wordpress/scripts` with a custom Webpack configuration supporting aliases (`@Components/*`, `@Utils/*`, `@Store/*`).

### 1. Block Development Watch Mode
Runs Webpack in watch mode with Fast Refresh for Gutenberg block React code:

```bash
npm run start
```

### 2. Admin Dashboard SCSS Watch Mode
Compiles and watches admin dashboard styles (`admin/scss/` ➔ `admin/css/`):

```bash
npm run admin
```

### 3. Production Build
Generates minified, production-ready assets and recompiles headless REST PHP defaults:

```bash
npm run build
npm run admin:build
```

---

## 🧪 Testing Suite & Quality Assurance

All pull requests must pass local tests before submission:

### 1. PHP Unit Tests (Zero-Dependency CLI Harness)
GSlider includes a fast standalone PHP CLI test matrix that runs without requiring a database or external PHPUnit runner:

```bash
for f in tests/*.php; do php "$f"; done
```

Tests verify:
- PSR-4 Singleton services registration (`RegistrationBlocks`, `RegistrationPatterns`, `BlocksController`).
- Dynamic CSS sanitization and XSS security guards.
- Headless REST API parameter validation, schemas, and permissions.
- Swiper default attribute normalization.

### 2. MCP Schema Drift Verification
Verifies that the MCP server's schemas match the React block attributes in `src/blocks/`:

```bash
npm run mcp:test
```

### 3. Code Formatting & Linting

```bash
npm run format      # Format JS/CSS to WordPress Coding Standards
npm run lint:js     # Lint JavaScript and React JSX
npm run lint:css    # Lint SCSS stylesheets
```

---

## 📦 Production Release Packaging

To generate a clean distributable `.zip` archive matching WordPress.org requirements:

```bash
npm run zip
```

This executes `webpack.zip.js`, which strictly whitelists production files and excludes `docs/`, `packages/`, `tests/`, `scripts/`, `admin/scss/`, and raw source directories.

---

## 🔒 Crucial Contributor Rule: Protected Directory

> [!CAUTION]
> **Component Lock Policy:** `src/components/` contains 23 core UI controls and is strictly locked to `@noruzzamans`.
> - You are welcome to **use** these components via `@Components/...` when creating or modifying blocks.
> - **Never modify or add files** to `src/components/`. PRs altering `src/components/` without maintainer authorization are flagged by CI and will be rejected to protect 2,000+ live sites.
