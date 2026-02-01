# Development Guide

## Setup

```bash
git clone https://github.com/samuel-dunlap/valence-site.git
cd valence-site
npm install
npm run dev
```

Open http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Production build (outputs to `./out/`)
- `npm run start` - Start production server (not typically used with static export)
- `npm run typecheck` - TypeScript type checking without emit
- `npm run lint` - Check for linting errors
- `npm run lint:fix` - Auto-fix linting errors
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check formatting without modifying files
- `npm run test` - Run unit tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Generate test coverage report
- `npm run test:links` - Check for broken links (builds first)
- `npm run test:a11y` - Run accessibility tests with axe (builds first)
- `npm run validate` - Run all checks (typecheck + lint + format)

## Pre-commit Hooks

Husky runs lint-staged before each commit:
- Auto-formats TypeScript/TSX files with Prettier
- Runs ESLint with auto-fix
- Formats JSON, Markdown, and CSS files
- Blocks commit if linting errors remain

To bypass hooks (not recommended):
```bash
git commit --no-verify
```

## Project Structure

```
valence-site/
├── .github/workflows/         # GitHub Actions CI/CD
│   ├── ci.yml                 # Pull request validation
│   └── post-deploy-check.yml  # Production health checks
├── public/                    # Static assets
│   ├── images/                # Optimized WebP images
│   ├── schema/                # JSON-LD structured data
│   ├── _headers               # Security and cache headers
│   ├── robots.txt             # Crawler directives
│   └── sitemap.xml            # SEO sitemap
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (with-footer)/     # Layout group with footer
│   │   ├── (no-footer)/       # Layout group without footer
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable React components
│   │   ├── __tests__/         # Component tests
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── ...
│   ├── lib/                   # Utilities and constants
│   │   ├── __tests__/         # Utility tests
│   │   └── constants.ts
│   └── styles/                # Global styles
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
├── vitest.config.ts           # Vitest test configuration
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies and scripts
```

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, static export)
- **Language:** TypeScript (strict mode)
- **Styling:** CSS Modules
- **Fonts:** Libre Baskerville, IBM Plex Sans (via next/font)
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint (Next.js + TypeScript rules)
- **Formatting:** Prettier
- **Pre-commit:** Husky + lint-staged
- **Deployment:** Cloudflare Pages
- **Node Version:** 20

## Testing

### Writing Tests

Add tests in `__tests__` folders next to the components/utilities being tested:

```typescript
// src/components/__tests__/MyComponent.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests once
npm run test

# Watch mode (re-runs on file changes)
npm run test:watch

# UI mode (visual test runner)
npm run test:ui

# Coverage report
npm run test:coverage
```

## Code Quality

### Before Pushing

Always run validation before creating a PR:
```bash
npm run validate
```

This runs:
1. TypeScript type checking
2. ESLint (code quality)
3. Prettier (formatting check)

### CI Checks

Pull requests trigger these checks in parallel:
- ✅ Lint & Format Check
- ✅ TypeScript Type Check
- ✅ Unit Tests
- ✅ Build Validation
- ✅ Bundle Size Analysis

All must pass before merging.

## Deployment

### Production
1. Push to `main` branch
2. Cloudflare Pages auto-detects push
3. Runs `npm ci && npm run build`
4. Deploys `./out/` to production
5. Site live at https://valenceprivate.com

### Preview Deployments
- Every PR gets automatic preview URL
- Format: `https://[commit-hash].valence-site.pages.dev`
- Updated on each push to PR branch
- Deleted when PR closed/merged

## Troubleshooting

### Build fails locally but works in CI
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Pre-commit hook not running
```bash
# Reinstall Husky hooks
npx husky init
chmod +x .husky/pre-commit
```

### Tests fail with module resolution errors
```bash
# Clear Vitest cache
npx vitest --clearCache

# Ensure Node version matches CI (v20)
node -v
```

### TypeScript errors in IDE but not CLI
```bash
# Restart TypeScript server in VS Code
# Command Palette (Cmd+Shift+P) → "TypeScript: Restart TS Server"

# Or restart your IDE
```

### Build succeeds but site broken
```bash
# Test production build locally
npm run build
cd out
python3 -m http.server 8000
# Open http://localhost:8000
```

## Image Optimization

All images should be:
- **Format:** WebP (smaller file size, better quality)
- **Optimization:** Use Sharp or similar tools before adding to repo
- **Location:** `public/images/`
- **Naming:** Descriptive, lowercase, hyphens (e.g., `home-hero.webp`)

To convert and optimize images:
```bash
# Install sharp-cli
npm install -g sharp-cli

# Convert to WebP with 80% quality
sharp -i input.jpg -o output.webp -f webp -q 80
```

## SEO & Structured Data

JSON-LD schemas are stored in `public/schema/` and loaded via external `<script>` tags. This approach:
- Strengthens CSP (no inline scripts)
- Makes schemas easy to validate and update
- Keeps component code clean

Update schemas when:
- Business information changes
- Service offerings change
- SEO requirements evolve

Validate with: https://search.google.com/test/rich-results

## Environment Variables

Currently none required (static site).

If you need to add environment variables:
1. Add to Cloudflare Pages dashboard (Settings → Environment variables)
2. Set scope (Production / Preview)
3. Redeploy for changes to take effect
4. Never commit `.env` files with secrets

## Performance Monitoring

### Build Output Size
CI reports build size on every PR. Target: < 3MB total.

### Bundle Analysis
CI shows top 10 largest JavaScript files. Investigate if any single file > 500KB.

### Lighthouse CI (future)
Consider adding Lighthouse CI for automated performance/accessibility audits.

## Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes (pre-commit hooks will auto-format)
3. Run `npm run validate` before pushing
4. Push and create PR
5. Wait for CI checks to pass
6. Request review
7. Merge to `main` (squash and merge preferred)

## Support

For questions or issues:
- Check this guide first
- Review the [plan file](/.claude/plans/) for architectural decisions
- Check GitHub Issues
- Contact repository maintainer
