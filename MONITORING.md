# Error Tracking & Analytics Setup

This guide covers setting up error tracking with Sentry and enabling Cloudflare Analytics for your website.

---

## 🔍 Sentry Error Tracking

Sentry captures JavaScript errors, performance issues, and user sessions to help you debug production issues.

### 1. Create a Sentry Account

1. Go to [sentry.io](https://sentry.io) and sign up for a free account
2. Create a new project:
   - **Platform:** Next.js
   - **Project Name:** valence-site (or your preferred name)
   - **Team:** Default or create a new team

### 2. Get Your DSN (Data Source Name)

After creating your project:

1. Navigate to **Settings** → **Projects** → **valence-site** → **Client Keys (DSN)**
2. Copy the **DSN** value - it looks like:
   ```
   https://abc123def456@o123456.ingest.sentry.io/7890123
   ```

### 3. Configure Environment Variables

1. Create a `.env.local` file in the project root (copy from `.env.local.example`):

   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Sentry DSN:

   ```env
   NEXT_PUBLIC_SENTRY_DSN=https://your-actual-dsn@sentry.io/your-project-id
   NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
   ```

3. **Important:** `.env.local` is already in `.gitignore` and should **never** be committed to git

### 4. Configure Cloudflare Pages Environment Variables

For production deployment:

1. Go to your Cloudflare Dashboard
2. Navigate to **Pages** → **valence-site** → **Settings** → **Environment variables**
3. Click **Add variable** for **Production**:
   - **Variable name:** `NEXT_PUBLIC_SENTRY_DSN`
   - **Value:** Your Sentry DSN (paste the full URL)
4. Add another variable:
   - **Variable name:** `NEXT_PUBLIC_SENTRY_ENVIRONMENT`
   - **Value:** `production`
5. Click **Save**

### 5. Install Dependencies & Test Locally

```bash
# Install Sentry package
npm install

# Run development server
npm run dev

# Open browser and check console - Sentry should initialize
# You should see: "Sentry initialized" in browser console (only if DSN is set)

# Test error tracking by triggering the ErrorBoundary
# (temporarily throw an error in a component to test)
```

### 6. Deploy & Verify

```bash
# Deploy to production
npm run build
git add .
git commit -m "Add Sentry error tracking"
git push origin main

# Wait 2-3 minutes for Cloudflare Pages deployment

# Verify Sentry is working:
# 1. Visit https://valenceprivate.com
# 2. Open browser DevTools → Network tab
# 3. Look for requests to *.ingest.sentry.io
```

### 7. Sentry Dashboard Features

Once configured, you can:

- **View Errors:** See all JavaScript errors with stack traces
- **User Context:** See which users encountered errors
- **Performance Monitoring:** Track page load times and API calls
- **Session Replay:** Watch user sessions to see what led to errors
- **Alerts:** Get email/Slack notifications for new errors

**Sentry Dashboard:** [sentry.io/organizations/your-org/issues/](https://sentry.io)

---

## 📊 Cloudflare Analytics

Cloudflare Analytics provides privacy-friendly website analytics without cookies or tracking scripts.

### 1. Enable Web Analytics

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain: **valenceprivate.com**
3. Navigate to **Analytics & Logs** → **Web Analytics**
4. Toggle **Enable Web Analytics** to ON

**That's it!** Cloudflare automatically injects the analytics beacon into your pages.

### 2. Verify Analytics Are Working

1. Visit your website: [https://valenceprivate.com](https://valenceprivate.com)
2. Open browser DevTools → **Network** tab
3. Look for requests to `static.cloudflareinsights.com` - this is the analytics beacon
4. In Cloudflare Dashboard → **Analytics & Logs**, you should see data within 5-10 minutes

### 3. What Cloudflare Analytics Tracks

- **Page Views:** Total visits and unique visitors
- **Traffic Sources:** Where visitors come from (referrers, direct, search)
- **Top Pages:** Most visited pages on your site
- **Devices:** Desktop vs. mobile breakdown
- **Countries:** Geographic distribution of visitors
- **Performance:** Page load times and Core Web Vitals

### 4. Privacy & Compliance

- **No cookies:** Cloudflare Analytics doesn't use cookies or local storage
- **Privacy-friendly:** No personal data collected, GDPR/CCPA compliant
- **No consent banner needed:** Unlike Google Analytics
- **Client-side:** Works with static exports (no server required)

### 5. Your CSP Headers

Your Content Security Policy is already configured to allow Cloudflare Analytics:

```
script-src 'self' https://static.cloudflareinsights.com
connect-src 'self' https://cloudflareinsights.com
```

No code changes needed!

---

## 🧪 Testing Error Tracking

### Test Sentry Integration

Create a test error to verify Sentry is capturing issues:

1. Add a test button to any page (temporarily):

   ```tsx
   <button onClick={() => { throw new Error("Test Sentry error"); }}>
     Test Error Tracking
   </button>
   ```

2. Click the button in production
3. Check your Sentry dashboard - the error should appear within seconds
4. Remove the test button

### Monitor Production Errors

Check your Sentry dashboard regularly:

- **First week:** Daily checks for any unexpected errors
- **After launch:** Weekly reviews of error trends
- **Set up alerts:** Email notifications for critical errors

---

## 🔒 Security Notes

### Sentry DSN is Public (This is OK)

- The `NEXT_PUBLIC_SENTRY_DSN` is intentionally public (embedded in client-side JavaScript)
- It's safe to expose - it only allows **sending** errors, not reading them
- Sentry has rate limiting to prevent abuse

### CSP Updates

Your CSP now allows:

- `https://browser.sentry-cdn.com` - Sentry SDK
- `https://*.ingest.sentry.io` - Error reporting endpoint

These are required for error tracking and are safe to whitelist.

---

## 📈 Recommended Configuration

### Sentry Settings to Configure

1. **Alert Rules** (Settings → Alerts):
   - Create alert for "New Issue" → Email notification
   - Create alert for "Issue frequency spike" → Slack notification (if using)

2. **Release Tracking** (optional):
   - Tag errors with git commit SHA for easier debugging
   - See which errors were introduced in which deployment

3. **Performance Thresholds**:
   - Current: 10% transaction sampling (`tracesSampleRate: 0.1`)
   - Increase if you need more performance data (increases quota usage)

### Cloudflare Analytics Settings

1. **Custom Events** (optional):
   - Track button clicks, form submissions, etc.
   - Requires adding custom beacon events

2. **Filters**:
   - Filter out bot traffic for cleaner metrics
   - Exclude your own IP for accurate visitor counts

---

## 📊 Cost & Quotas

### Sentry Free Tier

- **5,000 errors/month** - plenty for a small site
- **10,000 performance transactions/month**
- **500 session replays/month**
- **30-day data retention**

**Upgrade if:** You exceed free tier limits (unlikely for this site)

### Cloudflare Analytics

- **100% Free** - no limits, no quotas
- Included with all Cloudflare plans (even free)

---

## 🚨 Troubleshooting

### Sentry Not Capturing Errors

1. **Check environment variables:**
   ```bash
   # In browser console:
   console.log('DSN configured:', !!process.env.NEXT_PUBLIC_SENTRY_DSN)
   ```

2. **Check CSP headers:**
   ```bash
   curl -I https://valenceprivate.com | grep Content-Security-Policy
   # Should include: https://browser.sentry-cdn.com and https://*.ingest.sentry.io
   ```

3. **Check network requests:**
   - Open DevTools → Network
   - Filter by "sentry"
   - Should see requests to `ingest.sentry.io`

### Cloudflare Analytics Not Showing Data

1. **Wait 10-15 minutes** after enabling for data to appear
2. **Check beacon is loading:**
   - DevTools → Network → Filter "cloudflareinsights"
   - Should see `beacon.min.js` loaded
3. **Verify CSP allows it:**
   ```bash
   curl -I https://valenceprivate.com | grep Content-Security-Policy
   # Should include: https://static.cloudflareinsights.com
   ```

---

## 📚 Additional Resources

- **Sentry Docs:** [docs.sentry.io/platforms/javascript/guides/nextjs/](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- **Cloudflare Analytics:** [developers.cloudflare.com/analytics/web-analytics/](https://developers.cloudflare.com/analytics/web-analytics/)
- **Next.js Instrumentation:** [nextjs.org/docs/app/building-your-application/optimizing/instrumentation](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation)

---

## ✅ Post-Setup Checklist

- [ ] Sentry account created
- [ ] Sentry DSN added to `.env.local` (local development)
- [ ] Sentry DSN added to Cloudflare Pages environment variables (production)
- [ ] Dependencies installed (`npm install`)
- [ ] Test error captured in Sentry dashboard
- [ ] Cloudflare Analytics enabled in dashboard
- [ ] Analytics beacon loading on production site
- [ ] Alert rules configured in Sentry
- [ ] First week monitoring plan established

**You're all set!** Your website now has production-grade error tracking and analytics.
