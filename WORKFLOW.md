# Development & Deployment Workflow

This guide shows you how to develop and deploy changes quickly and confidently.

## The Problem This Solves

**Old workflow:** Make change → commit → push → wait for Cloudflare → check live site → deal with cache → repeat

**New workflow:** Make change → see instantly in browser → verify with tests → deploy once when done

---

## Daily Development Workflow

### 1. Start Local Development Server

```bash
npm run dev
```

- Opens at [http://localhost:3000](http://localhost:3000)
- **Hot reload** - Changes appear instantly as you save files
- **No caching issues** - Always fresh
- **No deployment wait** - Instant feedback

**Leave this running while you work.**

### 2. Make Changes & Verify

- Edit files in your code editor
- Save the file
- Switch to browser at `localhost:3000`
- Changes appear automatically (no refresh needed)

**This gives you instant feedback on:**
- Visual changes (CSS, layout, components)
- Functional changes (JavaScript logic, interactions)
- New features
- Bug fixes

### 3. Run Tests (Before Deploying)

When you're happy with changes locally:

```bash
npm run test:all
```

This runs:
- TypeScript type checking
- Linting
- Unit tests with coverage
- Production build
- Link validation

**If tests pass** → Safe to deploy
**If tests fail** → Fix issues locally, verify in `localhost:3000`, run tests again

### 4. Deploy to Production

#### Option A: Full Deploy (Recommended)

```bash
./deploy.sh
```

This script:
1. Shows what will be deployed
2. Asks for commit message
3. Runs full test suite
4. Commits changes
5. Pushes to GitHub
6. Cloudflare Pages auto-deploys

**Use this for:** All deployments (ensures quality)

#### Option B: Quick Deploy

```bash
./quick-deploy.sh
```

Skips local testing (CI will still test). Only use when:
- You already ran `npm run test:all` manually
- Making trivial changes (typos, copy edits)
- Time-sensitive updates

---

## When to Use Each Command

| Task | Command | When |
|------|---------|------|
| See changes instantly | `npm run dev` | Every development session |
| Run specific tests | `npm run test:watch` | While writing new features |
| Verify before deploy | `npm run test:all` | Before every deployment |
| Deploy with confidence | `./deploy.sh` | Ready to go live (recommended) |
| Quick push | `./quick-deploy.sh` | Trivial changes, already tested |

---

## Checking Production Deployment

After deploying:

1. **Monitor Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to Pages → valence-site
   - Watch deployment progress (~2-3 minutes)

2. **View Live Site**
   - Wait for Cloudflare deployment to complete
   - Visit [https://valenceprivate.com](https://valenceprivate.com)
   - **Hard refresh to bypass cache:** `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)

3. **If Changes Don't Appear**
   - Wait another minute (CDN propagation)
   - Try incognito/private window: `Cmd + Shift + N`
   - Check Cloudflare deployment succeeded
   - Verify correct branch was pushed

---

## Cache Busting Tips

If you're seeing old content on production:

1. **Hard Refresh:** `Cmd + Shift + R` (clears page cache)
2. **Incognito Mode:** `Cmd + Shift + N` (fresh browser state)
3. **Clear Browser Cache:** Chrome → Settings → Privacy → Clear browsing data
4. **Wait 5 minutes:** Cloudflare CDN cache propagation

**Remember:** These cache issues only affect production. Local dev (`npm run dev`) never has caching problems.

---

## Typical Development Session

```bash
# Morning: Start dev server
npm run dev

# Work: Make changes, see them instantly at localhost:3000
# (edit files, save, browser auto-updates)

# Afternoon: Made several improvements, ready to deploy
npm run test:all          # Verify everything works

# If tests pass:
./deploy.sh               # Deploy to production

# Wait 2-3 minutes, then check:
# https://valenceprivate.com (Cmd+Shift+R to hard refresh)
```

---

## Emergency Rollback

If you deployed something broken:

```bash
git revert HEAD           # Undo last commit
git push origin main      # Deploy previous version
```

Cloudflare will redeploy the previous working version.

---

## Pro Tips

1. **Always develop locally first** - Never deploy to "see if it works"
2. **Trust your local dev server** - It matches production (static export)
3. **Run tests before deploying** - Catch issues before users see them
4. **Use hard refresh on production** - Cache can hide new deployments
5. **Check Cloudflare dashboard** - Confirms deployment succeeded

---

## Troubleshooting

### "npm run dev" fails

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Tests fail but code looks fine locally

- Tests are more strict than dev mode
- Read the error message carefully
- Fix the issue, verify in `localhost:3000`, run tests again

### Deployment succeeded but changes don't appear

1. Check you pushed to correct branch (`git branch`)
2. Hard refresh browser (`Cmd + Shift + R`)
3. Check Cloudflare dashboard for deployment status
4. Wait 5 minutes for CDN propagation
5. Try incognito mode

### Can't run deploy.sh

```bash
chmod +x deploy.sh quick-deploy.sh
./deploy.sh
```

---

## Questions?

- **How do I undo a deployment?** Use `git revert HEAD && git push`
- **Can I test production build locally?** Yes: `npm run build && npx serve out`
- **Do I need to run tests every time?** Yes for `./deploy.sh`, optional for `./quick-deploy.sh` (CI tests anyway)
- **Why use local dev instead of deploying?** Instant feedback (seconds vs minutes), no caching, no deployment costs

---

**Remember:** Develop locally → Test locally → Deploy confidently
