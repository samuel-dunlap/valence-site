# Valence — Private Relationship Advisory

Marketing website for [Valence](https://valenceprivate.com), a private relationship advisory firm based in New York City.

## Tech Stack

- **Framework:** Next.js 16 (static export)
- **Language:** TypeScript (strict mode)
- **Styling:** CSS Modules + CSS custom properties
- **Fonts:** Libre Baskerville (headings), IBM Plex Sans (body)
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint + Prettier
- **Deployment:** Cloudflare Pages

## Pages

| Route              | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `/`                | Home — service overview and hero                           |
| `/about`           | About — founder bio, track record, and research background |
| `/couples-retreat` | Couples Retreat — multi-day training program details       |
| `/partner-search`  | Partner Search — matchmaking methodology and process       |
| `/inquire`         | Inquire — contact information                              |

## Development

```bash
npm install
npm run dev          # Start development server
```

Open [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build → ./out/
npm run typecheck    # TypeScript validation
npm run lint         # Check linting
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format all files
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run validate     # Run all checks (typecheck + lint + format)
```

See [DEVELOPMENT.md](./DEVELOPMENT.md) for complete development guide.

## Build & Preview

```bash
npm run build        # Produces static export in ./out/
npx serve out        # Preview locally
```

## Project Structure

```
src/
  app/                  # Next.js App Router pages
    layout.tsx          # Root layout (fonts, metadata, JSON-LD, navbar, intro)
    globals.css         # Design system (colors, typography, spacing)
    (with-footer)/      # Pages that include the footer
    (no-footer)/        # Pages without footer (Inquire)
  components/           # Reusable UI components
  lib/
    constants.ts        # Site config, nav links, contact info
public/
  images/               # Static images (WebP hero images, logos, favicon)
  _headers              # Security and cache headers (see Cloudflare section)
  robots.txt            # Crawler directives
  sitemap.xml           # Sitemap for search engines
  site.webmanifest      # PWA manifest
```

## Infrastructure & Deployment

The site is deployed to **Cloudflare Pages** and served at `valenceprivate.com`.

### Next.js Static Export

`next.config.ts` sets `output: "export"`, which produces a flat directory of HTML, CSS, JS, and images in `./out/`. There is no server runtime, no SSR, and no API routes. All images use `unoptimized: true` in the Next.js `Image` component because there is no server to optimize images at request time — hero images are pre-optimized to WebP before build.

### Cloudflare Pages Deployment

On every push to `main`:

1. Cloudflare Pages detects the push via GitHub integration
2. Runs `npm ci` — clean install of dependencies
3. Runs `npm run build` — generates static export in `./out/`
4. Deploys `./out/` to production at `valenceprivate.com`
5. Automatically applies security headers from `public/_headers`

**Deployment time:** ~2-3 minutes

**Preview deployments:** Every pull request gets an automatic preview URL for testing.

See [CLOUDFLARE.md](./CLOUDFLARE.md) for complete Cloudflare configuration.

### CI/CD Pipeline

Pull requests trigger `.github/workflows/ci.yml` with these parallel checks:

- ✅ **Lint & Format Check** — ESLint + Prettier
- ✅ **TypeScript Type Check** — `tsc --noEmit`
- ✅ **Unit Tests** — Vitest with React Testing Library
- ✅ **Build Validation** — `npm run build`
- ✅ **Bundle Size Analysis** — Reports build output size

All checks must pass before merging.

### Security Headers

The `public/_headers` file defines security and cache headers. Cloudflare Pages **automatically applies** these headers (no manual configuration needed).

**Security headers:**

- `X-Frame-Options: DENY` — Prevents clickjacking
- `Content-Security-Policy` — Strict CSP with **no `unsafe-inline` for scripts**
- `Strict-Transport-Security` — HSTS with 1-year max-age and preload
- `X-Content-Type-Options: nosniff` — Prevents MIME sniffing
- `Referrer-Policy` — Limits referrer information
- `Permissions-Policy` — Disables unnecessary browser features

**Verify headers:**

```bash
curl -I https://valenceprivate.com | grep "X-Frame-Options"
# Expected: X-Frame-Options: DENY
```

### Cache Strategy

Tiered cache policy defined in `_headers`:

| Path                          | Cache Duration    | Notes                                         |
| ----------------------------- | ----------------- | --------------------------------------------- |
| `/_next/static/*`             | 1 year, immutable | Hashed filenames — safe to cache indefinitely |
| `/images/*`                   | 30 days           | Optimized WebP images                         |
| `/site.webmanifest`           | 1 week            | PWA manifest                                  |
| `/robots.txt`, `/sitemap.xml` | 1 hour            | May update frequently                         |

### Cloudflare Web Analytics

Cloudflare automatically injects its analytics beacon script. The CSP explicitly allows:

- `https://static.cloudflareinsights.com` (script source)
- `https://cloudflareinsights.com` (analytics endpoint)

## SEO & Structured Data

- **Per-page metadata** — Each page exports unique `title`, `description`, and `canonical` URL
- **OpenGraph + Twitter Card** — Social sharing image at `public/images/og-image.png` (1200x630)
- **JSON-LD structured data** — External JSON files in `public/schema/`:
  - `organization.json` — `ProfessionalService` schema (loaded on all pages)
  - `couples-retreat.json` — `Service` schema for retreat offering
  - `partner-search.json` — `Service` schema for matchmaking service
- **robots.txt** — Allows all crawlers and references `sitemap.xml`
- **sitemap.xml** — Dynamic sitemap covering all 5 public pages

**Why external JSON-LD?**

- Strengthens CSP (no inline scripts, eliminates `script-src 'unsafe-inline'`)
- Easy to validate and update schemas
- Keeps component code clean

**Validate:** https://search.google.com/test/rich-results

## Testing

Unit tests use **Vitest** + **React Testing Library**:

```bash
npm run test           # Run tests once
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

Example tests:

- [src/components/**tests**/Navbar.test.tsx](src/components/__tests__/Navbar.test.tsx)
- [src/lib/**tests**/constants.test.ts](src/lib/__tests__/constants.test.ts)

## Code Quality

### Pre-commit Hooks

Husky + lint-staged auto-format code before each commit:

- Runs ESLint with auto-fix
- Formats with Prettier
- Blocks commit if errors remain

### Validation

Before pushing, run:

```bash
npm run validate
```

This runs TypeScript type checking, ESLint, and Prettier checks.

## Documentation

- [README.md](./README.md) (this file) — Project overview
- [DEVELOPMENT.md](./DEVELOPMENT.md) — Complete development guide
- [CLOUDFLARE.md](./CLOUDFLARE.md) — Cloudflare Pages configuration

## License

Private repository. All rights reserved.
