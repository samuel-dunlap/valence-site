# Cloudflare Pages Configuration

This document describes the Cloudflare Pages setup for valenceprivate.com.

## Current Configuration

**Project Name:** valence-site
**Production Branch:** main
**Build Command:** `npm run build`
**Build Output Directory:** `out`
**Node Version:** 20
**Framework Preset:** Next.js (Static HTML Export)

## Custom Domain

- **Domain:** valenceprivate.com
- **DNS:** Managed by Cloudflare
- **SSL/TLS:** Full (strict) - automatic HTTPS
- **Certificate:** Auto-provisioned by Cloudflare

## Security Headers

Security and cache headers are defined in `public/_headers` and **automatically applied** by Cloudflare Pages (no manual configuration needed).

### Verify Headers

```bash
curl -I https://valenceprivate.com
```

**Expected headers:**
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 0
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()...
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'none'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'...
```

### Content Security Policy (CSP)

**Current policy:**
- `default-src 'none'` - Block everything by default
- `script-src 'self' https://static.cloudflareinsights.com` - Only allow scripts from same origin and Cloudflare Analytics (NO unsafe-inline)
- `style-src 'self' 'unsafe-inline'` - Allow CSS Modules (Next.js requirement)
- `img-src 'self' data:` - Images from same origin + data URIs
- `font-src 'self'` - Fonts from same origin
- `connect-src 'self' https://cloudflareinsights.com` - API calls to same origin + Cloudflare Analytics
- `form-action 'self'` - Forms submit to same origin only
- `frame-ancestors 'none'` - Prevent embedding in iframes

### Cache Headers

Defined in `public/_headers`:

| Path | Cache Duration | Rationale |
|------|----------------|-----------|
| `/_next/static/*` | 1 year (immutable) | Hashed filenames, safe to cache indefinitely |
| `/images/*` | 30 days | WebP images, rarely change |
| `/site.webmanifest` | 1 week | PWA manifest, stable |
| `/robots.txt` | 1 hour | May update for SEO changes |
| `/sitemap.xml` | 1 hour | Dynamic sitemap, updates with content |

## Preview Deployments

Every pull request automatically gets a preview URL.

### Preview URL Format
```
https://[SHORT-COMMIT-HASH].valence-site.pages.dev
```

### Preview Features
- Automatically created when PR is opened
- Updated on each push to PR branch
- Shares same build config as production
- Deleted automatically when PR is merged/closed
- Perfect for testing before production

### Finding Preview URLs
1. Go to Cloudflare Dashboard → Pages → valence-site
2. Click "View build" on the deployment
3. Or check PR comments (Cloudflare bot posts preview URL)

## Build Logs

### Viewing Logs
1. Cloudflare Dashboard → Pages → valence-site
2. Click on deployment
3. View "Build logs" tab

### Common Build Issues

**Error: `npm ci` fails**
- Check `package.json` and `package-lock.json` are in sync
- Ensure Node version is 20

**Error: `npm run build` fails**
- Check TypeScript errors locally first: `npm run typecheck`
- Ensure all dependencies installed: `npm ci`
- Check build succeeds locally: `npm run build`

**Error: Build succeeds but site broken**
- Check `out/` directory exists and contains files
- Verify `_headers` file is in `out/` directory
- Check browser console for CSP violations

## Deployment Process

### Automatic Deployment (Main Branch)
1. Developer pushes to `main` branch
2. Cloudflare detects push via GitHub webhook
3. Clones repository
4. Runs `npm ci` (clean install)
5. Runs `npm run build` (static export to `./out/`)
6. Uploads `./out/` directory to Cloudflare CDN
7. Applies `_headers` file rules
8. Updates DNS to point to new deployment
9. Invalidates cache
10. Site live at https://valenceprivate.com

**Deployment time:** ~2-3 minutes

### Manual Deployment
1. Cloudflare Dashboard → Pages → valence-site
2. Click "Create deployment"
3. Select branch
4. Click "Save and Deploy"

## Rollback

If a deployment breaks production:

### Option 1: Rollback via Dashboard (Fastest)
1. Dashboard → Pages → valence-site → Deployments
2. Find previous successful deployment
3. Click "..." → "Rollback to this deployment"
4. Confirm rollback

**Rollback time:** ~30 seconds

### Option 2: Revert Git Commit
```bash
git revert HEAD
git push origin main
# Cloudflare auto-deploys the revert
```

**Rollback time:** ~2-3 minutes (build time)

## Environment Variables

Currently **none required** (static site with no secrets).

### If You Need to Add Environment Variables

1. Dashboard → Pages → valence-site → Settings → Environment variables
2. Click "Add variable"
3. Set variable name and value
4. Choose scope:
   - **Production:** Only production builds
   - **Preview:** Only preview builds
   - **Both:** Both environments
5. Click "Save"
6. Trigger redeploy for changes to take effect

**Example use cases:**
- API keys (e.g., analytics, CMS)
- Feature flags
- Build-time configuration

**Security:**
- Never commit `.env` files to Git
- Use Cloudflare dashboard for sensitive values
- Use different values for preview vs production

## Analytics

Cloudflare Web Analytics is enabled and automatically injected.

### Accessing Analytics
1. Dashboard → Pages → valence-site → Analytics
2. View traffic, page views, unique visitors
3. Filter by date range

### Analytics Impact on CSP
- CSP allows `https://static.cloudflareinsights.com` for analytics beacon script
- CSP allows `https://cloudflareinsights.com` for analytics data endpoint
- Analytics script is injected automatically, no code changes needed

## DNS Configuration

### Current Setup
- **Domain:** valenceprivate.com
- **Proxy status:** Proxied (orange cloud)
- **SSL/TLS mode:** Full (strict)

### DNS Records (Managed by Cloudflare)
```
CNAME valenceprivate.com → [cloudflare-pages-url]
```

Cloudflare automatically configures this when you add a custom domain to Pages.

### Changing DNS
1. Dashboard → DNS → Records
2. Modify as needed
3. Keep proxy enabled (orange cloud) for CDN benefits

## Performance Optimization

### Current Optimizations
- ✅ Brotli compression (automatic)
- ✅ HTTP/2 and HTTP/3 (automatic)
- ✅ Global CDN with 200+ edge locations
- ✅ Automatic image optimization (via WebP)
- ✅ Aggressive caching for static assets
- ✅ Minification (Next.js build process)

### Build Output Size
- **Target:** < 3MB total
- **Current:** ~2.9MB
- **Monitored by:** CI bundle analysis job

### Cache Hit Ratio
Check in Dashboard → Analytics → Performance to see cache effectiveness.

**Target:** > 90% cache hit ratio

## Monitoring & Alerts

### Automated Health Checks
GitHub Actions workflow runs every 6 hours:
- Checks site is reachable (HTTP 200)
- Verifies security headers present
- Checks all critical pages load
- Validates CSP configuration
- Monitors cache headers

**Workflow:** `.github/workflows/post-deploy-check.yml`

### Manual Health Check
```bash
# Site reachability
curl -I https://valenceprivate.com

# Security headers
curl -I https://valenceprivate.com | grep -E "X-Frame|Content-Security|Strict-Transport"

# All pages load
for page in / /about /couples-retreat /partner-search /inquire; do
  echo "Checking $page"
  curl -s -o /dev/null -w "%{http_code}\n" "https://valenceprivate.com$page"
done
```

## Troubleshooting

### Headers Not Appearing
**Possible causes:**
1. `_headers` file not in `out/` directory after build
2. Syntax error in `_headers` file
3. Cloudflare Pages not applying file (check build logs)

**Solutions:**
```bash
# Verify _headers in build output
npm run build
ls -la out/_headers

# Check file syntax
cat public/_headers

# Force rebuild
# Dashboard → Pages → valence-site → "Retry deployment"
```

### CSP Violations
**Symptoms:** Browser console shows CSP errors

**Debug:**
1. Open DevTools → Console
2. Look for CSP violation messages
3. Check what resources are being blocked
4. Update CSP in `public/_headers` if needed
5. Redeploy

**Common violations:**
- Third-party scripts (analytics, tracking)
- Inline styles/scripts
- External fonts or images

### Site Slow to Load
**Debug checklist:**
1. Check Cloudflare Analytics → Performance
2. Verify cache hit ratio > 90%
3. Check build output size < 3MB
4. Use Chrome DevTools → Network → Waterfall
5. Run Lighthouse audit

**Common issues:**
- Large JavaScript bundles
- Unoptimized images
- Too many network requests
- Cache headers not working

### Build Failures
See [Build Logs](#build-logs) section above.

## Cost

Cloudflare Pages Free Plan:
- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ 500 builds per month
- ✅ 1 concurrent build
- ✅ Unlimited sites

**Current usage:** Well within free tier limits.

## Migration Notes

### Migrated From
- **Previous:** GitHub Pages
- **Migration date:** [Date of Cloudflare Pages setup]
- **Reason:** Native `_headers` file support for better security header management

### Benefits of Migration
1. ✅ `_headers` file automatically applied (no manual Cloudflare Transform Rules)
2. ✅ Better preview deployments for PRs
3. ✅ Single platform for hosting + CDN + headers
4. ✅ Simpler architecture and maintenance

### Breaking Changes
- None - same URLs, same content, better infrastructure

## Support

**Cloudflare Documentation:**
- https://developers.cloudflare.com/pages/

**Cloudflare Support:**
- Community: https://community.cloudflare.com/
- Enterprise: Dashboard → Support

**Project-Specific:**
- Check DEVELOPMENT.md for dev workflow
- Check README.md for project overview
- Review `.claude/plans/` for architectural decisions
