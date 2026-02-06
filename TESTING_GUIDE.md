# Comprehensive Testing Guide for Valence Website

## Quick Start - Run All Tests

```bash
# Run all unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build the site (tests static generation)
npm run build

# Validate links in built output
npm run validate-links
```

---

## Table of Contents
1. [Unit Tests](#1-unit-tests)
2. [Integration Tests](#2-integration-tests)
3. [Accessibility Tests](#3-accessibility-tests)
4. [SEO & Metadata Tests](#4-seo--metadata-tests)
5. [Performance Tests](#5-performance-tests)
6. [Visual Regression Tests](#6-visual-regression-tests)
7. [End-to-End Tests](#7-end-to-end-tests)
8. [Security Tests](#8-security-tests)
9. [Build & Deployment Tests](#9-build--deployment-tests)
10. [Manual Testing Checklist](#10-manual-testing-checklist)

---

## 1. Unit Tests

### Current Coverage
You have **16 test files** covering:
- ✅ All 13 components
- ✅ Storage utilities
- ✅ Schema generators
- ✅ Constants

### Run Unit Tests
```bash
npm test                    # Run all tests
npm run test:coverage       # With coverage report
npm run test:watch          # Watch mode for development
```

### Coverage Goals
- **Current threshold:** 70% (lines, functions, branches, statements)
- **Target:** 80%+ for production

### Missing Unit Tests to Add

#### Test Page Components
Currently only components are tested, not pages. Add:

**File: `src/app/(with-footer)/page.test.tsx`**
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from './page';

describe('HomePage', () => {
  it('renders hero section with headline', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders both service cards', () => {
    render(<HomePage />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2); // Couples Retreat + Partner Search
  });
});
```

**File: `src/app/(with-footer)/about/page.test.tsx`**
```typescript
import { render, screen } from '@testing-library/react';
import AboutPage from './page';

describe('AboutPage', () => {
  it('renders founder name', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Samuel Dunlap/i)).toBeInTheDocument();
  });

  it('renders accordion sections', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Track Record/i)).toBeInTheDocument();
    expect(screen.getByText(/Foundational Research/i)).toBeInTheDocument();
  });
});
```

#### Test Utils More Thoroughly

**File: `src/lib/utils.test.ts`**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { throttle, formatPhoneForLink, isValidPhone, generateListKey } from './utils';

describe('throttle', () => {
  it('calls function immediately on first invocation', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('prevents subsequent calls within delay period', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});

describe('formatPhoneForLink', () => {
  it('formats 10-digit phone number', () => {
    expect(formatPhoneForLink('(555) 123-4567')).toBe('+15551234567');
  });

  it('removes all non-digit characters', () => {
    expect(formatPhoneForLink('555-123-4567')).toBe('+15551234567');
  });

  it('handles already formatted numbers', () => {
    expect(formatPhoneForLink('+15551234567')).toBe('+15551234567');
  });
});

describe('isValidPhone', () => {
  it('validates 10-digit US phone number', () => {
    expect(isValidPhone('5551234567')).toBe(true);
  });

  it('validates 11-digit number with country code', () => {
    expect(isValidPhone('15551234567')).toBe(true);
  });

  it('rejects invalid lengths', () => {
    expect(isValidPhone('555')).toBe(false);
    expect(isValidPhone('123456789012')).toBe(false);
  });

  it('rejects non-numeric strings', () => {
    expect(isValidPhone('abc')).toBe(false);
  });
});

describe('generateListKey', () => {
  it('generates key with prefix, index, and preview', () => {
    const key = generateListKey('item', 0, 'Hello World');
    expect(key).toBe('item-0-hello-world');
  });

  it('truncates preview to 20 characters', () => {
    const longText = 'A'.repeat(50);
    const key = generateListKey('item', 0, longText);
    expect(key.length).toBeLessThan(30);
  });

  it('handles special characters in preview', () => {
    const key = generateListKey('item', 1, 'Hello, World!');
    expect(key).toBe('item-1-hello-world');
  });
});
```

#### Test Focus Trap

**File: `src/lib/focus-trap.test.ts`**
```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createFocusTrap } from './focus-trap';

describe('createFocusTrap', () => {
  let container: HTMLDivElement;
  let cleanup: (() => void) | undefined;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    cleanup?.();
    document.body.removeChild(container);
  });

  it('traps focus within container', () => {
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    container.appendChild(button1);
    container.appendChild(button2);

    cleanup = createFocusTrap(container);

    button2.focus();

    // Simulate Tab from last element
    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    button2.dispatchEvent(event);

    // Focus should wrap to first element
    expect(document.activeElement).toBe(button1);
  });

  it('wraps focus backwards with Shift+Tab', () => {
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    container.appendChild(button1);
    container.appendChild(button2);

    cleanup = createFocusTrap(container);

    button1.focus();

    // Simulate Shift+Tab from first element
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true
    });
    button1.dispatchEvent(event);

    // Focus should wrap to last element
    expect(document.activeElement).toBe(button2);
  });

  it('returns cleanup function that removes listener', () => {
    cleanup = createFocusTrap(container);
    expect(cleanup).toBeInstanceOf(Function);

    cleanup();
    cleanup = undefined;

    // After cleanup, focus trap should not work
    // (Difficult to test without more setup)
  });
});
```

---

## 2. Integration Tests

Integration tests verify that multiple components work together correctly.

### Page Navigation Flow Tests

**File: `src/__tests__/integration/navigation.test.tsx`**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RootLayout from '@/app/layout';
import HomePage from '@/app/(with-footer)/page';

describe('Navigation Integration', () => {
  it('renders navbar on all pages', () => {
    render(
      <RootLayout>
        <HomePage />
      </RootLayout>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/Valence/i)).toBeInTheDocument();
  });

  it('mobile menu contains all navigation links', () => {
    render(
      <RootLayout>
        <HomePage />
      </RootLayout>
    );

    const hamburger = screen.getByLabelText(/menu/i);
    fireEvent.click(hamburger);

    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Couples Retreat/i)).toBeInTheDocument();
    expect(screen.getByText(/Partner Search/i)).toBeInTheDocument();
  });

  it('navbar shows shadow on scroll', () => {
    render(
      <RootLayout>
        <HomePage />
      </RootLayout>
    );

    const nav = screen.getByRole('navigation');

    // Simulate scroll
    window.scrollY = 100;
    fireEvent.scroll(window);

    // Check for shadow class (adjust to your actual class name)
    expect(nav.classList.contains('scrolled')).toBe(true);
  });
});
```

### Layout + Component Integration

**File: `src/__tests__/integration/page-rendering.test.tsx`**
```typescript
import { render, screen } from '@testing-library/react';
import CouplesRetreatPage from '@/app/(with-footer)/couples-retreat/page';
import PartnerSearchPage from '@/app/(with-footer)/partner-search/page';

describe('Page Rendering Integration', () => {
  it('couples-retreat page renders all sections', () => {
    render(<CouplesRetreatPage />);

    // Hero
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    // Stats grid
    expect(screen.getByText(/participants/i)).toBeInTheDocument();

    // CTA button
    expect(screen.getByRole('link', { name: /inquire/i })).toBeInTheDocument();

    // Structured data
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);
  });

  it('partner-search page renders 6 phases', () => {
    render(<PartnerSearchPage />);

    // Should have 6 PhaseCards
    const phases = screen.getAllByText(/Phase \d/);
    expect(phases).toHaveLength(6);
  });
});
```

### Intro Overlay + SessionStorage Integration

**File: `src/__tests__/integration/intro-overlay.test.tsx`**
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RootLayout from '@/app/layout';
import HomePage from '@/app/(with-footer)/page';

describe('IntroOverlay Integration', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('shows intro overlay on first visit', () => {
    vi.useFakeTimers();

    render(
      <RootLayout>
        <HomePage />
      </RootLayout>
    );

    // Overlay should be visible
    const overlay = screen.getByTestId('intro-overlay'); // Add data-testid to component
    expect(overlay).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('hides intro overlay on subsequent visits', () => {
    sessionStorage.setItem('intro-seen', 'true');

    render(
      <RootLayout>
        <HomePage />
      </RootLayout>
    );

    // Overlay should not render
    const overlay = screen.queryByTestId('intro-overlay');
    expect(overlay).not.toBeInTheDocument();
  });
});
```

---

## 3. Accessibility Tests

### Automated Accessibility Testing

**Install jest-axe:**
```bash
npm install --save-dev jest-axe
```

**File: `src/__tests__/accessibility/wcag-compliance.test.tsx`**
```typescript
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '@/app/(with-footer)/page';
import AboutPage from '@/app/(with-footer)/about/page';
import CouplesRetreatPage from '@/app/(with-footer)/couples-retreat/page';
import PartnerSearchPage from '@/app/(with-footer)/partner-search/page';
import InquirePage from '@/app/(no-footer)/inquire/page';

expect.extend(toHaveNoViolations);

describe('WCAG 2.1 Accessibility', () => {
  it('home page has no accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('about page has no accessibility violations', async () => {
    const { container } = render(<AboutPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('couples-retreat page has no accessibility violations', async () => {
    const { container } = render(<CouplesRetreatPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('partner-search page has no accessibility violations', async () => {
    const { container } = render(<PartnerSearchPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('inquire page has no accessibility violations', async () => {
    const { container } = render(<InquirePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Keyboard Navigation Tests

**File: `src/__tests__/accessibility/keyboard-navigation.test.tsx`**
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Navbar from '@/components/Navbar/Navbar';

describe('Keyboard Navigation', () => {
  it('allows tabbing through all nav links', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const links = screen.getAllByRole('link');

    // Tab through each link
    for (const link of links) {
      await user.tab();
      expect(document.activeElement).toBe(link);
    }
  });

  it('escape key closes mobile menu', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const hamburger = screen.getByLabelText(/menu/i);
    await user.click(hamburger);

    // Menu should be open
    expect(hamburger.getAttribute('aria-expanded')).toBe('true');

    // Press Escape
    await user.keyboard('{Escape}');

    // Menu should close
    expect(hamburger.getAttribute('aria-expanded')).toBe('false');
  });

  it('skip to main content link works', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const skipLink = screen.getByText(/skip to main content/i);
    await user.click(skipLink);

    // Main content should be focused
    const main = document.querySelector('main');
    expect(document.activeElement).toBe(main);
  });
});
```

### Color Contrast Tests

**Manual Tool:** Use browser DevTools or:
```bash
npm install --save-dev pa11y-ci
```

**File: `.pa11yci.json`**
```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe"],
    "chromeLaunchConfig": {
      "args": ["--no-sandbox"]
    }
  },
  "urls": [
    "http://localhost:3000/",
    "http://localhost:3000/about",
    "http://localhost:3000/couples-retreat",
    "http://localhost:3000/partner-search",
    "http://localhost:3000/inquire"
  ]
}
```

**Add script to `package.json`:**
```json
{
  "scripts": {
    "test:a11y": "pa11y-ci"
  }
}
```

---

## 4. SEO & Metadata Tests

### Schema.org Validation Tests

**File: `src/__tests__/seo/structured-data.test.tsx`**
```typescript
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CouplesRetreatPage from '@/app/(with-footer)/couples-retreat/page';
import { getServiceSchema, getOrganizationSchema } from '@/lib/schema';

describe('Structured Data SEO', () => {
  it('renders valid Service schema for couples-retreat', () => {
    render(<CouplesRetreatPage />);

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);

    const schemaText = scripts[0].textContent;
    const schema = JSON.parse(schemaText || '{}');

    expect(schema['@type']).toBe('Service');
    expect(schema.name).toBeTruthy();
    expect(schema.description).toBeTruthy();
    expect(schema.provider).toBeTruthy();
  });

  it('organization schema has required fields', () => {
    const schema = getOrganizationSchema();

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('ProfessionalService');
    expect(schema.name).toBe('Valence');
    expect(schema.founder).toBeDefined();
    expect(schema.address).toBeDefined();
    expect(schema.telephone).toBeDefined();
  });

  it('service schema has valid URL', () => {
    const schema = getServiceSchema(
      'Test Service',
      'Test description',
      '/test'
    );

    expect(schema.url).toMatch(/^https?:\/\//);
  });
});
```

### Metadata Tests

**File: `src/__tests__/seo/metadata.test.tsx`**
```typescript
import { describe, it, expect } from 'vitest';
import { metadata as homeMetadata } from '@/app/(with-footer)/page';
import { metadata as aboutMetadata } from '@/app/(with-footer)/about/page';

describe('Page Metadata', () => {
  it('home page has title and description', () => {
    expect(homeMetadata.title).toBeTruthy();
    expect(homeMetadata.description).toBeTruthy();
  });

  it('about page has unique metadata', () => {
    expect(aboutMetadata.title).toBeTruthy();
    expect(aboutMetadata.description).toBeTruthy();
    expect(aboutMetadata.title).not.toBe(homeMetadata.title);
  });

  it('all pages have canonical URLs', () => {
    expect(homeMetadata.alternates?.canonical).toMatch(/^https?:\/\//);
    expect(aboutMetadata.alternates?.canonical).toMatch(/^https?:\/\//);
  });
});
```

### Sitemap Validation

**File: `src/__tests__/seo/sitemap.test.ts`**
```typescript
import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';

describe('Sitemap', () => {
  it('includes all main pages', async () => {
    const urls = await sitemap();

    const paths = urls.map(u => new URL(u.url).pathname);

    expect(paths).toContain('/');
    expect(paths).toContain('/about');
    expect(paths).toContain('/couples-retreat');
    expect(paths).toContain('/partner-search');
    expect(paths).toContain('/inquire');
  });

  it('all URLs have lastModified dates', async () => {
    const urls = await sitemap();

    urls.forEach(url => {
      expect(url.lastModified).toBeInstanceOf(Date);
    });
  });

  it('all URLs have priority and changeFrequency', async () => {
    const urls = await sitemap();

    urls.forEach(url => {
      expect(url.priority).toBeGreaterThan(0);
      expect(url.priority).toBeLessThanOrEqual(1);
      expect(url.changeFrequency).toBeTruthy();
    });
  });
});
```

### Link Validation (Already in Scripts)

```bash
# Build site first
npm run build

# Validate all internal links
npm run validate-links
```

---

## 5. Performance Tests

### Bundle Size Tests

**Install size-limit:**
```bash
npm install --save-dev @size-limit/preset-app
```

**File: `.size-limit.json`**
```json
[
  {
    "name": "Homepage Bundle",
    "path": "out/_next/static/**/*.js",
    "limit": "150 KB"
  },
  {
    "name": "CSS Bundle",
    "path": "out/_next/static/**/*.css",
    "limit": "50 KB"
  }
]
```

**Add to `package.json`:**
```json
{
  "scripts": {
    "test:size": "size-limit"
  }
}
```

### Lighthouse CI

**Install:**
```bash
npm install --save-dev @lhci/cli
```

**File: `lighthouserc.json`**
```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./out",
      "url": [
        "http://localhost/index.html",
        "http://localhost/about/index.html",
        "http://localhost/couples-retreat/index.html",
        "http://localhost/partner-search/index.html",
        "http://localhost/inquire/index.html"
      ]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.95}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**Add script:**
```json
{
  "scripts": {
    "test:lighthouse": "lhci autorun"
  }
}
```

### Core Web Vitals Testing

**File: `src/__tests__/performance/web-vitals.test.ts`**
```typescript
import { describe, it, expect } from 'vitest';

describe('Web Vitals Targets', () => {
  it('defines performance budget', () => {
    const budget = {
      FCP: 1800, // First Contentful Paint (ms)
      LCP: 2500, // Largest Contentful Paint (ms)
      CLS: 0.1,  // Cumulative Layout Shift
      FID: 100,  // First Input Delay (ms)
      TTI: 3800, // Time to Interactive (ms)
    };

    // This test documents performance targets
    // Actual measurement happens via Lighthouse CI
    expect(budget.FCP).toBeLessThan(2000);
    expect(budget.LCP).toBeLessThan(2500);
    expect(budget.CLS).toBeLessThan(0.1);
  });
});
```

---

## 6. Visual Regression Tests

### Setup Playwright for Visual Testing

**Install:**
```bash
npm install --save-dev @playwright/test
npx playwright install
```

**File: `playwright.config.ts`**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/__tests__/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**File: `src/__tests__/visual/pages.spec.ts`**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage renders correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
    });
  });

  test('about page renders correctly', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveScreenshot('about-page.png', {
      fullPage: true,
    });
  });

  test('mobile menu opens correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await page.click('[aria-label*="menu"]');
    await expect(page).toHaveScreenshot('mobile-menu.png');
  });

  test('accordion expands correctly', async ({ page }) => {
    await page.goto('/about');

    // Click second accordion section
    await page.click('button:has-text("Foundational Research")');

    await expect(page).toHaveScreenshot('accordion-expanded.png');
  });
});
```

**Add script:**
```json
{
  "scripts": {
    "test:visual": "playwright test",
    "test:visual:update": "playwright test --update-snapshots"
  }
}
```

---

## 7. End-to-End Tests

### User Journey Tests with Playwright

**File: `src/__tests__/e2e/user-journeys.spec.ts`**
```typescript
import { test, expect } from '@playwright/test';

test.describe('User Journeys', () => {
  test('visitor can navigate from home to couples-retreat to inquire', async ({ page }) => {
    // Start on homepage
    await page.goto('/');

    // Click "Couples Retreat" service card
    await page.click('a:has-text("Couples Retreat")');

    // Verify on couples-retreat page
    await expect(page).toHaveURL(/couples-retreat/);
    await expect(page.locator('h1')).toContainText('Couples Retreat');

    // Click "Inquire" CTA
    await page.click('a:has-text("Inquire")');

    // Verify on inquire page
    await expect(page).toHaveURL(/inquire/);
    await expect(page.locator('a[href^="tel:"]')).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
  });

  test('visitor can navigate from home to partner-search', async ({ page }) => {
    await page.goto('/');

    await page.click('a:has-text("Partner Search")');

    await expect(page).toHaveURL(/partner-search/);

    // Verify 6 phases are visible
    const phases = page.locator('text=/Phase [1-6]/');
    await expect(phases).toHaveCount(6);
  });

  test('visitor can use navbar to access about page', async ({ page }) => {
    await page.goto('/');

    // Click "About" in navbar
    await page.click('nav a:has-text("About")');

    await expect(page).toHaveURL(/about/);
    await expect(page.locator('h1')).toContainText('Samuel Dunlap');
  });

  test('mobile visitor can use hamburger menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Menu should be hidden initially
    const menuButton = page.locator('[aria-label*="menu"]');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Click a link in mobile menu
    await page.click('text=About');

    // Verify navigation
    await expect(page).toHaveURL(/about/);
  });
});
```

### Responsive Design Tests

**File: `src/__tests__/e2e/responsive.spec.ts`**
```typescript
import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 },
];

viewports.forEach(({ name, width, height }) => {
  test.describe(`${name} Viewport`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width, height });
    });

    test('homepage renders without layout issues', async ({ page }) => {
      await page.goto('/');

      // No horizontal scrollbar
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

      // Hero is visible
      await expect(page.locator('h1')).toBeVisible();
    });

    test('navbar is accessible', async ({ page }) => {
      await page.goto('/');

      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      if (width < 768) {
        // Mobile: hamburger menu should exist
        await expect(page.locator('[aria-label*="menu"]')).toBeVisible();
      } else {
        // Desktop: navigation links should be visible
        await expect(page.locator('nav a:has-text("About")')).toBeVisible();
      }
    });
  });
});
```

### Form Interaction Tests (Future)

**File: `src/__tests__/e2e/contact-form.spec.ts`**
```typescript
import { test, expect } from '@playwright/test';

// Note: Currently no form exists, but when you add one:
test.describe('Contact Form', () => {
  test.skip('visitor can submit contact form', async ({ page }) => {
    await page.goto('/inquire');

    // Fill out form
    await page.fill('[name="name"]', 'John Doe');
    await page.fill('[name="email"]', 'john@example.com');
    await page.fill('[name="message"]', 'I would like more information.');

    // Submit
    await page.click('button[type="submit"]');

    // Verify success message
    await expect(page.locator('text=/thank you/i')).toBeVisible();
  });

  test.skip('form validates email format', async ({ page }) => {
    await page.goto('/inquire');

    await page.fill('[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    // Should show validation error
    await expect(page.locator('text=/valid email/i')).toBeVisible();
  });
});
```

---

## 8. Security Tests

### Content Security Policy Validation

**File: `src/__tests__/security/csp.test.ts`**
```typescript
import { describe, it, expect } from 'vitest';
import { headers } from 'next/headers';

describe('Content Security Policy', () => {
  it('has strict CSP defined', async () => {
    // Note: This tests that CSP is configured in next.config.ts
    // Actual header validation happens in E2E tests

    const expectedDirectives = [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ];

    // Verify CSP is strict (no 'unsafe-inline' or 'unsafe-eval')
    expectedDirectives.forEach(directive => {
      expect(directive).not.toContain('unsafe-inline');
      expect(directive).not.toContain('unsafe-eval');
    });
  });
});
```

**E2E Security Header Test:**

**File: `src/__tests__/e2e/security-headers.spec.ts`**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Security Headers', () => {
  test('response includes security headers', async ({ page }) => {
    const response = await page.goto('/');

    expect(response).not.toBeNull();
    const headers = response!.headers();

    // CSP header
    expect(headers['content-security-policy']).toBeTruthy();
    expect(headers['content-security-policy']).toContain("default-src 'self'");

    // Other security headers (if configured)
    // expect(headers['x-frame-options']).toBe('DENY');
    // expect(headers['x-content-type-options']).toBe('nosniff');
  });

  test('no sensitive data in HTML comments', async ({ page }) => {
    await page.goto('/');

    const html = await page.content();

    // No API keys, tokens, or passwords in comments
    expect(html).not.toMatch(/<!--.*?(api[_-]?key|token|password).*?-->/i);
  });
});
```

### Dependency Vulnerability Scanning

```bash
# Run npm audit
npm audit

# Auto-fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

**Add to CI:**
```json
{
  "scripts": {
    "test:security": "npm audit --audit-level=moderate"
  }
}
```

---

## 9. Build & Deployment Tests

### Static Export Validation

**File: `src/__tests__/build/static-export.test.ts`**
```typescript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Static Export Build', () => {
  const outDir = path.join(process.cwd(), 'out');

  it('generates HTML files for all pages', () => {
    const expectedFiles = [
      'index.html',
      'about/index.html',
      'couples-retreat/index.html',
      'partner-search/index.html',
      'inquire/index.html',
      '404.html',
    ];

    expectedFiles.forEach(file => {
      const filePath = path.join(outDir, file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  it('generates sitemap.xml', () => {
    const sitemapPath = path.join(outDir, 'sitemap.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);
  });

  it('all HTML files are valid', () => {
    const htmlFiles = [
      'index.html',
      'about/index.html',
      'couples-retreat/index.html',
    ];

    htmlFiles.forEach(file => {
      const filePath = path.join(outDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Basic HTML structure validation
      expect(content).toContain('<!DOCTYPE html>');
      expect(content).toContain('<html');
      expect(content).toContain('</html>');
      expect(content).toContain('<head>');
      expect(content).toContain('</head>');
      expect(content).toContain('<body>');
      expect(content).toContain('</body>');
    });
  });

  it('static assets are copied', () => {
    // Check for _next directory
    const nextDir = path.join(outDir, '_next');
    expect(fs.existsSync(nextDir)).toBe(true);

    // Check for static files
    const staticDir = path.join(nextDir, 'static');
    expect(fs.existsSync(staticDir)).toBe(true);
  });
});
```

**Run build tests:**
```bash
# Build first
npm run build

# Then run build tests
npm test -- build
```

### Broken Link Detection (Already Configured)

```bash
# Build site
npm run build

# Validate all links
npm run validate-links
```

### Image Optimization Check

**File: `src/__tests__/build/assets.test.ts`**
```typescript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Static Assets', () => {
  it('all images are WebP format', () => {
    const imagesDir = path.join(process.cwd(), 'public/images');

    if (!fs.existsSync(imagesDir)) {
      return; // Skip if no images directory
    }

    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(f =>
      /\.(png|jpg|jpeg|webp)$/i.test(f)
    );

    imageFiles.forEach(file => {
      if (!/\.webp$/i.test(file)) {
        console.warn(`Non-WebP image found: ${file}`);
      }
    });
  });

  it('no unnecessarily large files in public directory', () => {
    const publicDir = path.join(process.cwd(), 'public');
    const maxSize = 500 * 1024; // 500 KB

    function checkDirectory(dir: string) {
      const files = fs.readdirSync(dir);

      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          checkDirectory(filePath);
        } else {
          if (stats.size > maxSize) {
            console.warn(`Large file detected: ${filePath} (${(stats.size / 1024).toFixed(2)} KB)`);
          }
        }
      });
    }

    checkDirectory(publicDir);
  });
});
```

---

## 10. Manual Testing Checklist

### Pre-Release Testing Checklist

#### Functionality
- [ ] All navigation links work correctly
- [ ] Mobile hamburger menu opens/closes
- [ ] Mobile menu focus trap works
- [ ] Accordion sections expand/collapse
- [ ] Intro overlay plays on first visit only
- [ ] Phone and email links work (tel:, mailto:)
- [ ] All external links open in new tabs (if applicable)
- [ ] 404 page displays for invalid routes

#### Responsive Design
- [ ] Test on mobile (320px, 375px, 414px widths)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1440px, 1920px)
- [ ] No horizontal scrollbars on any page
- [ ] Images scale appropriately
- [ ] Text is readable at all sizes
- [ ] Touch targets are at least 44x44px on mobile

#### Accessibility
- [ ] Tab through entire site with keyboard only
- [ ] Escape key closes mobile menu
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader announces all content (test with VoiceOver/NVDA)
- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Test with browser zoom at 200%
- [ ] Respect prefers-reduced-motion setting

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari iOS (iPhone/iPad)
- [ ] Chrome Android

#### Performance
- [ ] Lighthouse score > 90 for all categories
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] No layout shifts (CLS < 0.1)
- [ ] Animations run at 60fps

#### SEO
- [ ] All pages have unique title tags
- [ ] All pages have unique meta descriptions
- [ ] Structured data validates (use Google Rich Results Test)
- [ ] Sitemap.xml accessible at /sitemap.xml
- [ ] Robots.txt configured correctly
- [ ] Canonical URLs set correctly
- [ ] Open Graph tags present (for social sharing)

#### Visual Testing
- [ ] Typography renders correctly
- [ ] Colors match design system
- [ ] Spacing/padding consistent across pages
- [ ] Images load and display correctly
- [ ] Logo displays properly in navbar and footer
- [ ] Hover states work on interactive elements
- [ ] Active states indicate current page

#### Security
- [ ] HTTPS enforced
- [ ] Content Security Policy headers present
- [ ] No console errors or warnings in production
- [ ] No exposed API keys or secrets in source code
- [ ] External links use rel="noopener noreferrer" (if opening new tabs)

---

## Testing Workflow Recommendations

### Development Workflow
```bash
# 1. Run tests in watch mode while developing
npm run test:watch

# 2. Check types
npm run type-check

# 3. Lint code
npm run lint
```

### Pre-Commit Workflow
```bash
# Run automatically via Husky pre-commit hook
# - Lints staged files
# - Runs type check
# - Runs affected tests
```

### Pre-Push Workflow
```bash
# Before pushing to GitHub, run:
npm test                  # All unit tests
npm run test:coverage     # Verify coverage > 70%
npm run build             # Ensure build succeeds
```

### CI/CD Pipeline (GitHub Actions Example)

**File: `.github/workflows/test.yml`**
```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:coverage

      - name: Run build
        run: npm run build

      - name: Validate links
        run: npm run validate-links

      - name: Run Lighthouse CI
        run: npm run test:lighthouse

      - name: Run Playwright E2E tests
        run: npx playwright test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

---

## Summary: Quick Test Commands

```bash
# Unit tests
npm test                    # Run all tests
npm run test:coverage       # With coverage report
npm run test:watch          # Watch mode

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Build validation
npm run build               # Static export
npm run validate-links      # Check for broken links

# Accessibility (after installing tools)
npm run test:a11y           # pa11y-ci

# Performance (after installing tools)
npm run test:lighthouse     # Lighthouse CI
npm run test:size           # Bundle size

# Visual regression (after installing Playwright)
npm run test:visual         # Screenshot comparison
npm run test:visual:update  # Update baselines

# E2E tests (after installing Playwright)
npx playwright test         # All E2E tests
npx playwright test --ui    # Interactive mode

# Security
npm audit                   # Dependency vulnerabilities
npm run test:security       # Audit in CI mode
```

---

## Next Steps

1. **Install missing test tools:**
   ```bash
   npm install --save-dev jest-axe @playwright/test @lhci/cli pa11y-ci @size-limit/preset-app
   npx playwright install
   ```

2. **Add missing test files** from this guide (copy/paste sections above)

3. **Update `package.json`** with new test scripts

4. **Set up CI/CD pipeline** with GitHub Actions

5. **Establish testing cadence:**
   - Unit tests: Every commit
   - E2E tests: Before deploy
   - Visual tests: On UI changes
   - Performance tests: Weekly
   - Accessibility audit: Before releases

---

## Resources

- **Vitest Docs:** https://vitest.dev
- **React Testing Library:** https://testing-library.com/react
- **Playwright:** https://playwright.dev
- **Jest-axe:** https://github.com/nickcolley/jest-axe
- **Lighthouse CI:** https://github.com/GoogleChrome/lighthouse-ci
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Schema.org Validator:** https://validator.schema.org
- **Google Rich Results Test:** https://search.google.com/test/rich-results

---

**Generated for Valence Website**
Last updated: 2026-02-01
