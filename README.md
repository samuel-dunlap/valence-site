# Valence — Private Relationship Advisory

Marketing website for [Valence](https://valenceprivate.com), a private relationship advisory firm based in New York City.

## Tech Stack

- **Framework:** Next.js 16 (static export)
- **Language:** TypeScript (strict mode)
- **Styling:** CSS Modules + CSS custom properties
- **Fonts:** Libre Baskerville (headings), IBM Plex Sans (body)
- **Deployment:** GitHub Pages via GitHub Actions

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — service overview and hero |
| `/about` | About — founder bio, track record, and research background |
| `/couples-retreat` | Couples Retreat — multi-day training program details |
| `/partner-search` | Partner Search — matchmaking methodology and process |
| `/inquire` | Inquire — contact information |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Preview

```bash
npm run build        # produces static export in ./out/
npx serve out        # preview locally
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

The site is served through a three-layer stack: **Next.js** (build) -> **GitHub Pages** (hosting) -> **Cloudflare** (CDN/DNS).

### Next.js Static Export

`next.config.ts` sets `output: "export"`, which produces a flat directory of HTML, CSS, JS, and images in `./out/`. There is no server runtime, no SSR, and no API routes. All images use `unoptimized: true` in the Next.js `Image` component because there is no server to optimize images at request time — hero images are pre-optimized to WebP before build.

### GitHub Actions

On every push to `main`, the workflow in `.github/workflows/deploy.yml` runs:

1. `npm ci` — clean install of dependencies
2. `next build` — generates static export in `./out/`
3. Uploads `./out/` as a GitHub Pages artifact
4. Deploys via `actions/deploy-pages@v4`

### GitHub Pages

Hosts the static files at the custom domain `valenceprivate.com`, configured via the `CNAME` file at repo root and the repository's Pages settings. GitHub provides HTTPS for the custom domain.

### Cloudflare (DNS + CDN + Analytics)

The domain's DNS is managed through Cloudflare, which proxies requests to GitHub Pages. This provides:

- **CDN caching** — Cloudflare edge nodes cache static assets in front of GitHub Pages.
- **Cloudflare Web Analytics** — Cloudflare automatically injects its analytics beacon script when proxying requests. This is why the Content-Security-Policy in `_headers` explicitly allows `https://static.cloudflareinsights.com` (script-src) and `https://cloudflareinsights.com` (connect-src).
- **SSL/TLS termination** at the Cloudflare edge.

### `_headers` File Caveat

The `public/_headers` file defines security headers (HSTS, CSP, X-Frame-Options, etc.) and cache-control rules. This file format is natively supported by **Cloudflare Pages** and **Netlify**, but **not** by GitHub Pages. Since the site is deployed to GitHub Pages (not Cloudflare Pages), these headers are only applied if **Cloudflare Transform Rules** or **Page Rules** are configured in the Cloudflare dashboard to enforce them.

### Cache Strategy

The `_headers` file defines a tiered cache policy (applied via Cloudflare):

| Path | Cache Duration | Notes |
|------|---------------|-------|
| `/_next/static/*` | 1 year, immutable | Hashed filenames — safe to cache indefinitely |
| `/images/*` | 1 week | Hero images and logos |
| `/site.webmanifest` | 1 week | PWA manifest |

## SEO

- **Per-page metadata** — Each page exports unique `title`, `description`, and `canonical` URL.
- **OpenGraph + Twitter Card** — Social sharing image at `public/images/og-image.png` (1200x630). Twitter uses `summary_large_image`.
- **JSON-LD structured data** — `ProfessionalService` schema on all pages (root layout) with contact info, founder, and areas served. `Service` schema on Couples Retreat and Partner Search pages.
- **robots.txt** — Allows all crawlers and references `sitemap.xml`.
- **sitemap.xml** — Covers all 5 public pages at `valenceprivate.com`.
