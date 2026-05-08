# Valence Site -- Claude Code Instructions

## Project

Next.js 16 static site for Valence (private relationship advisory). Deployed to Cloudflare Pages via `output: "export"`.

## Design System

### Do / Don't

| Category       | DO                                                         | DON'T                       |
| -------------- | ---------------------------------------------------------- | --------------------------- |
| Font size      | `font-size: var(--fs-body)`                                | `font-size: 1rem`           |
| Color          | `color: var(--color-navy)` or `var(--color-text)`          | `color: #002042`            |
| Spacing        | `gap: var(--space)` or `gap: var(--space-section)`         | `gap: 32px`                 |
| Max-width      | `max-width: var(--content-medium)`                         | `max-width: 600px`          |
| Border width   | `border: var(--border) solid`                              | `border: 1px solid`         |
| Border radius  | `border-radius: var(--radius)`                             | `border-radius: 16px`       |
| Line height    | `line-height: var(--lh-body)` or `var(--lh-heading)`       | `line-height: 1.7`          |
| Z-index        | `z-index: var(--z-navbar)`                                 | `z-index: 100`              |
| Transition     | `transition: opacity var(--transition-fast)`               | `transition: opacity 200ms` |
| Button padding | `padding: var(--button-padding-y) var(--button-padding-x)` | `padding: 0.5em 1.25em`     |
| Letter spacing | `letter-spacing: var(--ls)`                                | `letter-spacing: 0.02em`    |
| Paragraph gaps | `.text + .text { margin-top: var(--space) }`               | `<br />` between elements   |

### Colors: 2-color palette (navy + warm white)

- `--color-navy` (#002042), `--color-warm-white` (#faf9f7)
- `--color-bg` and `--color-text` swap in dark mode
- `--color-border` derived via rgba
- No other colors without explicit approval

### Typography: 3-size system

- Every font-size MUST use `--fs-heading`, `--fs-subheading`, or `--fs-body`
- All text: Libre Baskerville (weights 400, 700)

### Spacing: 2 tiers only

- `--space` (1rem): element-level gaps (between paragraphs, buttons, list items)
- `--space-section` (3rem): section-level gaps (between major content blocks)
- `--content-padding`: horizontal page gutters (responsive clamp)

### Content Widths

- `--max-width` (1200px): page containers
- `--text-max-width` (720px): prose blocks
- `--content-narrow` (480px): single images
- `--content-medium` (600px): accent images, dividers
- `--content-wide` (900px): wide grids

### Borders & Radii

- Single border width: `var(--border)` (1px)
- Single radius: `var(--radius)` (8px)

### Transitions

- `--transition-fast` (200ms): hover effects
- `--transition-slow` (400ms): accordion, fade-in, overlays

### Responsive

- Single breakpoint: `@media (max-width: 767px)`

## New Section Checklist

```css
.section {
  padding: var(--space-section) var(--content-padding);
  max-width: var(--max-width);
  margin: 0 auto;
}
```

## New Component Checklist

- Font sizes from `--fs-*`
- Colors from `--color-*` or `inherit`/`currentColor`
- Spacing from `--space` or `--space-section`
- Borders: `var(--border)`, radius: `var(--radius)`
- Z-index from `--z-*`
- Transitions from `--transition-fast` or `--transition-slow`

## Known Exceptions (Do Not "Fix")

- IntroOverlay animation values (600ms, cubic-beziers) are choreography-specific
- `padding-left: 1.25em` on lists is a typographic convention
- Navbar tokens (e.g. `--navbar-padding-top`) are component-specific pixel values

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
