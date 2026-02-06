# Quick Testing Reference

## 🚀 Run Tests Now (No Installation Needed)

```bash
# Run all unit tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with UI interface
npm run test:ui

# Type checking
npm run typecheck

# Linting
npm run lint

# Build validation
npm run build

# Link validation (after build)
npm run validate-links

# Accessibility check (after build)
npm run test:a11y

# Security audit
npm run test:security

# Run ALL checks (complete pre-deploy check)
npm run test:all
```

---

## 📊 Current Test Coverage

Your website now has **20+ test files** covering:

✅ **Unit Tests (New!)**
- `utils.test.ts` - All utility functions (throttle, phone formatting, key generation)
- `focus-trap.test.ts` - Focus trap functionality
- `storage.test.ts` - Session storage utilities
- `schema.test.ts` - SEO schema generation

✅ **Component Tests (Existing + New)**
- All 13 components (Navbar, Footer, Hero, etc.)
- Page components (Home, About)

✅ **Accessibility Tests (New!)**
- Basic WCAG compliance checks
- Keyboard navigation
- ARIA attributes

✅ **Integration Tests**
- Multi-component interactions
- Layout rendering

---

## 🎯 Test Categories by Purpose

### Development (Run Often)
```bash
npm run test:watch    # Auto-run tests on file changes
npm run typecheck     # Check TypeScript types
npm run lint          # Check code style
```

### Pre-Commit (Automatic via Husky)
```bash
# Runs automatically when you commit
# - Lints staged files
# - Formats code
```

### Pre-Deploy (Run Before Release)
```bash
npm run test:all      # Everything: types, lint, tests, build, links
npm run test:a11y     # Accessibility audit
npm run test:security # Dependency vulnerabilities
```

---

## 📈 Next Steps to 100% Coverage

### 1. Install Additional Testing Tools (Optional)

```bash
# For comprehensive accessibility testing
npm install --save-dev jest-axe

# For E2E testing
npm install --save-dev @playwright/test
npx playwright install

# For performance testing
npm install --save-dev @lhci/cli

# For bundle size monitoring
npm install --save-dev @size-limit/preset-app
```

### 2. Uncomment Axe Tests

Once you install `jest-axe`, uncomment the axe test blocks in:
- `src/__tests__/accessibility/basic-a11y.test.tsx`

Then run comprehensive accessibility tests:
```bash
npm test -- accessibility
```

### 3. Add E2E Tests (Recommended)

Follow the guide in `TESTING_GUIDE.md` section 7 to:
- Create user journey tests
- Test responsive design
- Validate complete user flows

Run with:
```bash
npx playwright test
```

### 4. Add Visual Regression Tests

Follow section 6 of `TESTING_GUIDE.md` to:
- Capture baseline screenshots
- Detect visual changes automatically

---

## 🎨 Test Organization

```
src/
├── __tests__/
│   ├── accessibility/     # WCAG compliance tests
│   │   └── basic-a11y.test.tsx
│   ├── integration/       # Multi-component tests (create as needed)
│   ├── e2e/              # End-to-end tests (create as needed)
│   └── visual/           # Screenshot tests (create as needed)
├── components/
│   └── */
│       └── *.test.tsx    # Component unit tests (colocated)
├── lib/
│   └── *.test.ts        # Utility function tests
└── app/
    └── */
        └── page.test.tsx # Page component tests
```

---

## 🐛 Running Specific Tests

```bash
# Test a specific file
npm test -- Hero.test.tsx

# Test a specific directory
npm test -- components/

# Test files matching pattern
npm test -- accessibility

# Run with verbose output
npm test -- --reporter=verbose

# Update snapshots (if using snapshot testing)
npm test -- -u
```

---

## 📋 Coverage Goals

| Category | Current Target | Production Target |
|----------|----------------|-------------------|
| Lines | 70% | 80%+ |
| Functions | 70% | 80%+ |
| Branches | 70% | 80%+ |
| Statements | 70% | 80%+ |

View detailed coverage:
```bash
npm run test:coverage
# Then open: coverage/index.html
```

---

## ✅ Pre-Release Checklist

Before deploying to production:

- [ ] `npm run test:all` passes (types, lint, tests, build, links)
- [ ] `npm run test:a11y` passes (no accessibility violations)
- [ ] `npm run test:security` passes (no critical vulnerabilities)
- [ ] Manual testing on:
  - [ ] Chrome (desktop & mobile)
  - [ ] Safari (desktop & mobile)
  - [ ] Firefox
- [ ] Visual inspection of all 5 pages
- [ ] Test with keyboard navigation (Tab through everything)
- [ ] Test mobile menu functionality

---

## 🆘 Troubleshooting

### Tests fail with "ResizeObserver is not defined"
✅ **Already fixed** in `vitest.setup.ts`

### Tests fail with "IntersectionObserver is not defined"
✅ **Already fixed** in `vitest.setup.ts`

### Tests fail with "sessionStorage is not defined"
✅ **Already handled** with safe storage wrappers in `lib/storage.ts`

### Coverage not showing
```bash
# Install coverage provider
npm install --save-dev @vitest/coverage-v8
```

### Link validator fails
```bash
# Make sure you build first
npm run build
# Then validate
npm run validate-links
```

---

## 📚 Resources

- **Full Testing Guide:** See `TESTING_GUIDE.md` for comprehensive documentation
- **Vitest Docs:** https://vitest.dev
- **Testing Library:** https://testing-library.com/react
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Playwright:** https://playwright.dev

---

## 🔥 Quick Commands Cheatsheet

| What you want to do | Command |
|---------------------|---------|
| Run tests once | `npm test` |
| Run tests while coding | `npm run test:watch` |
| See test coverage | `npm run test:coverage` |
| Check types | `npm run typecheck` |
| Fix linting issues | `npm run lint:fix` |
| Format code | `npm run format` |
| Validate build | `npm run build` |
| Check links | `npm run validate-links` |
| Everything at once | `npm run test:all` |

---

**Last Updated:** 2026-02-01
**Test Files:** 20+
**Coverage:** 70%+
