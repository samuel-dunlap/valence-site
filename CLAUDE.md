# Valence Site -- Claude Code Instructions

## Project

Next.js 16 static site for Valence (private relationship advisory). Deployed to Cloudflare Pages via `output: "export"`.

## Design System (see DESIGN_SYSTEM.md for full spec)

### Do / Don't

| Category        | DO                                                                              | DON'T                                              |
| --------------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| Font size       | `font-size: var(--fs-body)`                                                     | `font-size: 1rem`                                  |
| Color           | `color: var(--color-navy)`                                                      | `color: #002042`                                   |
| Spacing         | `gap: var(--space-md)`                                                          | `gap: 32px`                                        |
| Max-width       | `max-width: var(--content-medium)`                                              | `max-width: 600px`                                 |
| Border width    | `border: var(--border-thin) solid`                                              | `border: 1px solid`                                |
| Border radius   | `border-radius: var(--radius-image)`                                            | `border-radius: 16px`                              |
| Line height     | `line-height: var(--lh-body)`                                                   | `line-height: 1.7`                                 |
| Z-index         | `z-index: var(--z-navbar)`                                                      | `z-index: 100`                                     |
| Transition      | `transition: opacity var(--transition-slow)`                                    | `transition: opacity 400ms ease`                   |
| Button padding  | `padding: var(--button-padding-y) var(--button-padding-x)`                      | `padding: 0.5em 1.25em`                            |
| Letter spacing  | `letter-spacing: var(--ls-tight)`                                               | `letter-spacing: 0.02em`                           |
| Visited links   | `color: var(--color-visited-light)`                                             | `color: #4a2d3a`                                   |
| Paragraph gaps  | `.text + .text { margin-top: var(--space-md) }`                                 | `<br />` between elements                          |
| Navy sections   | Inner wrapper with `max-width` + `margin: 0 auto`                               | Padding-only on navySection                        |
| List item gap   | `gap: var(--space-xs)`                                                          | Other gap values for bullet lists                  |
| List style      | Inherit from global `ul, ol` rule                                               | `list-style: disc` in component CSS                |
| Text decoration | Inherit from global `a` rule                                                    | `text-decoration: none` in components              |
| Burgundy rule   | `border-top: var(--border-rule) solid var(--color-burgundy)` as section divider | Decorative rule without content-separation purpose |

### Colors: Strict 3-color palette

- `--color-navy` (#002042), `--color-warm-white` (#faf9f7), `--color-burgundy` (#6b1c23)
- No new colors without explicit approval

### Typography: Strict 3-size system

- Every font-size MUST use `--fs-heading`, `--fs-subheading`, or `--fs-body`
- Headings: Libre Baskerville (weight 400 only, never bold)
- Body: IBM Plex Sans

### Heading Color Rules (Strict)

- **h1, h2:** `--color-navy` or `--color-warm-white` ONLY. Never burgundy.
- **h3:** `--color-burgundy` ONLY. Never navy or white.

### Spacing

- Always use `--space-xs` through `--space-2xl` for layout spacing
- Use `--section-padding` for vertical section padding
- Use `--content-padding` for horizontal page gutters

### Content Widths

- `--max-width` (1200px): page containers
- `--text-max-width` (720px): prose blocks
- `--content-narrow` (480px): single images
- `--content-medium` (600px): accent images, dividers
- `--content-wide` (900px): wide grids

### Borders

- Decorative rules: `var(--border-rule) solid var(--color-burgundy)`
- Link underlines: `var(--border-link) solid transparent`
- Structural: `var(--border-thin) solid ...`
- Images: `border-radius: var(--radius-image)`

### Z-Index Layers

- `--z-base` (0) → `--z-content` (1) → `--z-navbar` (100) → `--z-overlay` (200) → `--z-intro` (9999)

### Transitions

- `--transition-fast` (200ms): hover effects
- `--transition-base` (300ms): overlays, visibility
- `--transition-slow` (400ms): accordion, fade-in

### Responsive

- Single breakpoint: `@media (max-width: 767px)`
- No other breakpoints

## Cross-Page Consistency Checklist

When modifying any page, verify:

- Equivalent elements (headings, bullet lists, paragraphs) use the same spacing across all pages
- Navy sections use two-element structure (outer bg + inner max-width wrapper)
- No standalone `<br />` tags between elements (only inside elements for aesthetic breaks)
- Section padding uses `--section-padding`, not `--space-md` or other values
- All `letter-spacing` uses `--ls-*` tokens
- No redundant `list-style: disc` or `text-decoration: none` (handled globally)
- Page headers include a burgundy rule divider between subtitle and body content

## New Section Checklist

When adding a new page section:

```css
.section {
  padding: var(--section-padding) var(--content-padding);
  max-width: var(--max-width);
  margin: 0 auto;
}
```

## New Component Checklist

- Font sizes from `--fs-*`
- Colors from `--color-*` or `inherit`/`currentColor`
- Spacing from `--space-*`
- Borders from `--border-*`
- Z-index from `--z-*`
- Transitions from `--transition-*`

## Known Exceptions (Do Not "Fix")

- Navbar pixel values (28px, 24px, etc.) are intentionally hardcoded for visual alignment
- Footer `.text` font-size `0.8125rem` is an accepted fine-print exception
- IntroOverlay animation values (600ms, cubic-beziers) are choreography-specific
- Touch targets (44px) are WCAG requirements
- `padding-left: 1.25em` on lists is a typographic convention

## Linting

- ESLint: `npm run lint`
- Stylelint: `npm run lint:css` (enforces design token usage)
- Prettier: `npm run format:check`
- Full validation: `npm run validate`

## File Conventions

- CSS Modules for all component/page styles
- Shared styles in `src/styles/`
- Constants in `src/lib/constants.ts`
- All design tokens in `src/app/globals.css` `:root` block
