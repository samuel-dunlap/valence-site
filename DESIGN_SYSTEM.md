# Valence Design System

Minimal, high-end aesthetic. Three colors, three type sizes, disciplined spacing scale.
All design tokens are defined as CSS custom properties in `src/app/globals.css`.

---

## Colors (Strict 3-Color Palette)

| Token                | Value     | Usage                                        |
| -------------------- | --------- | -------------------------------------------- |
| `--color-navy`       | `#002042` | Primary text, dark backgrounds, borders      |
| `--color-warm-white` | `#faf9f7` | Page background, light text on dark sections |
| `--color-burgundy`   | `#6b1c23` | Accent: rules, markers, titles, hover states |

### Derivative Colors (Intentional One-Offs)

- `rgba(0, 32, 66, 0.55)` -- Atmosphere image overlay (navy at 55%)
- `rgba(0, 32, 66, 0.12)` -- Navbar scroll shadow (navy at 12%)
- `rgba(107, 28, 35, 0.4)` -- Nav link hover underline (burgundy at 40%)

### Visited Link Colors (Tokenized)

| Token                   | Value     | Usage                              |
| ----------------------- | --------- | ---------------------------------- |
| `--color-visited-light` | `#4a2d3a` | Visited links on light backgrounds |
| `--color-visited-dark`  | `#c8bfb8` | Visited links on dark backgrounds  |

No new colors without explicit approval.

---

## Typography

### Fonts

- **Headings:** Libre Baskerville (weight 400 only -- never bold)
- **Body:** IBM Plex Sans (weights 400 and 700)

### Strict 3-Size Type Scale

No other font-size values permitted. Enforced by Stylelint.

| Token             | Value                              | Usage                                    |
| ----------------- | ---------------------------------- | ---------------------------------------- |
| `--fs-heading`    | `clamp(1.75rem, 3vw, 2.5rem)`      | h1, hero headlines                       |
| `--fs-subheading` | `clamp(1.15rem, 2vw, 1.5rem)`      | h2/h3, section titles, accordion headers |
| `--fs-body`       | `clamp(0.95rem, 1.1vw, 1.0625rem)` | Body text, links, UI labels              |

**Exception:** Footer `.text` uses `0.8125rem` for fine-print (documented in Stylelint overrides).

### Line Heights

| Token          | Value | Usage                                 |
| -------------- | ----- | ------------------------------------- |
| `--lh-tight`   | `1`   | Logos, icons, single-line UI elements |
| `--lh-heading` | `1.3` | All h1-h6 elements                    |
| `--lh-body`    | `1.7` | Body text, paragraphs, lists          |

### Letter Spacing (3-Tier Scale)

| Token        | Value    | Usage                                 |
| ------------ | -------- | ------------------------------------- |
| `--ls-tight` | `0.02em` | Headings, CTA buttons, service cards  |
| `--ls-open`  | `0.05em` | Nav links, display text, 404 link     |
| `--ls-wide`  | `0.35em` | Logo wordmark, brand identity (intro) |

### Heading Color Rules

| Heading Level | Allowed Colors                              |
| ------------- | ------------------------------------------- |
| h1            | `--color-navy` or `--color-warm-white` only |
| h2            | `--color-navy` or `--color-warm-white` only |
| h3            | `--color-burgundy` only                     |

Never use burgundy on h1 or h2. Never use navy or white on h3.

### Font Weight

All text uses `font-weight: 400`. Bold (700) is available for IBM Plex Sans body text but is used sparingly.

---

## Spacing Scale

| Token               | Value                        | px Equiv | Usage                                    |
| ------------------- | ---------------------------- | -------- | ---------------------------------------- |
| `--space-xs`        | `0.5rem`                     | 8px      | List items, tight gaps                   |
| `--space-sm`        | `1rem`                       | 16px     | Default element margins, form fields     |
| `--space-md`        | `2rem`                       | 32px     | Below headings, column gaps, nav gaps    |
| `--space-lg`        | `4rem`                       | 64px     | Major content blocks, hero CTA spacing   |
| `--space-xl`        | `6rem`                       | 96px     | Structural gaps (hero columns, footer)   |
| `--space-2xl`       | `8rem`                       | 128px    | Reserved for very large gaps             |
| `--section-padding` | `clamp(3.5rem, 8vw, 7.5rem)` | ~56-120  | Vertical padding for full-width sections |
| `--content-padding` | `clamp(1.5rem, 5vw, 4rem)`   | ~24-64   | Horizontal page gutters                  |

Never hardcode px or rem for spacing. Always use these tokens.

---

## Content Widths

| Token              | Value    | Usage                                   |
| ------------------ | -------- | --------------------------------------- |
| `--content-narrow` | `480px`  | Single photos, bio images               |
| `--content-medium` | `600px`  | Accent images, dividers, error messages |
| `--text-max-width` | `720px`  | Prose/text blocks                       |
| `--content-wide`   | `900px`  | Wide content grids (e.g. phase grid)    |
| `--max-width`      | `1200px` | Page container max-width                |

---

## Borders & Radii

| Token            | Value   | Usage                                           |
| ---------------- | ------- | ----------------------------------------------- |
| `--border-thin`  | `1px`   | Structural borders (navbar, buttons, skip link) |
| `--border-rule`  | `2px`   | Decorative horizontal rules (burgundy)          |
| `--border-link`  | `1.5px` | Underline accent on nav/footer links            |
| `--radius-image` | `16px`  | All content/accent images                       |

### Border Patterns

- **Decorative rule:** `var(--border-rule) solid var(--color-burgundy)`
- **Link underline:** `var(--border-link) solid transparent` (reveals color on hover)
- **Structural:** `var(--border-thin) solid ...`
- **Small radii:** 4px (error button), 6px (footer logo) -- intentionally hardcoded for UI elements

### Burgundy Rule Usage

The burgundy decorative rule (`border-top: var(--border-rule) solid var(--color-burgundy)`) serves as a **visual divider between content sections**:

| Context         | Placement                                             | Example                                         |
| --------------- | ----------------------------------------------------- | ----------------------------------------------- |
| Page headers    | Below the subtitle, above body content                | Couples Retreat, Partner Search, About, Inquire |
| Section headers | Above the section title (via SectionHeader component) | "The Unique Value", "Our Method"                |

**Rules:**

- Always use `var(--border-rule) solid var(--color-burgundy)` -- never hardcode values
- Page header dividers: `max-width: var(--content-medium)`
- SectionHeader dividers: full width of parent container
- Never use the rule purely for decoration without a content-separation purpose

---

## Button / CTA

| Token                | Value    | Usage                     |
| -------------------- | -------- | ------------------------- |
| `--button-padding-y` | `0.5em`  | Vertical button padding   |
| `--button-padding-x` | `1.25em` | Horizontal button padding |

Buttons use `em` units intentionally so they scale with font-size.

### Button Pattern

```css
padding: var(--button-padding-y) var(--button-padding-x);
border: var(--border-thin) solid currentColor;
font-size: var(--fs-body);
letter-spacing: var(--ls-tight);
transition:
  background-color var(--transition-fast),
  color var(--transition-fast);
```

---

## Z-Index Layers

| Token             | Value  | Usage                          |
| ----------------- | ------ | ------------------------------ |
| `--z-base`        | `0`    | Background textures            |
| `--z-content`     | `1`    | Main content, section wrappers |
| `--z-navbar`      | `100`  | Sticky navigation              |
| `--z-overlay`     | `200`  | Mobile nav overlay, skip link  |
| `--z-intro-cover` | `9998` | Pre-hydration cover            |
| `--z-intro`       | `9999` | Intro animation overlay        |

---

## Transitions

| Token               | Value        | Usage                                        |
| ------------------- | ------------ | -------------------------------------------- |
| `--transition-fast` | `200ms ease` | Hover effects, micro-interactions            |
| `--transition-base` | `300ms ease` | Overlays, visibility changes                 |
| `--transition-slow` | `400ms ease` | Accordion expand/collapse, fade-in, wordmark |

---

## Responsive Breakpoint

**Single breakpoint:** `@media (max-width: 767px)`

All responsive styles use this one breakpoint. The design is two-tier: desktop (>= 768px) and mobile.

CSS custom properties cannot be used in `@media` queries, so this value is hardcoded. Stylelint enforces `prefix` notation (i.e. `max-width: 767px`).

---

## Texture

Both `body::after` and `.navySection::after` apply a fractalNoise SVG texture overlay:

- **Body:** `mix-blend-mode: multiply`, opacity 0.4
- **Navy sections:** `mix-blend-mode: soft-light`, opacity 0.3

---

## Utility Classes (globals.css)

| Class              | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `.container`       | Max-width wrapper with horizontal gutters       |
| `.textBlock`       | Constrains width to `--text-max-width`          |
| `.navySection`     | Full-width navy background with texture overlay |
| `.atmosphereImage` | Full-bleed responsive image container           |

---

## Standard Section Pattern

Every new page section should follow this structure:

```css
.section {
  padding: var(--section-padding) var(--content-padding);
  max-width: var(--max-width);
  margin: 0 auto;
}
```

For text-heavy sections, constrain content width:

```css
.bodyText {
  max-width: var(--text-max-width);
}
```

### Navy Section Pattern

Full-bleed navy sections need a two-element structure -- outer for background, inner for content constraint:

```css
.navySection {
  padding: var(--section-padding) 0;
}
.navySectionContent {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--content-padding);
}
```

---

## Text Formatting Conventions

### Paragraph Spacing

Use CSS adjacent sibling selectors for paragraph gaps. Never use standalone `<br />` between elements.

```css
.bodyText + .bodyText {
  margin-top: var(--space-md);
}
```

### Line Breaks

- `<br />` is ONLY permitted inside elements for aesthetic line breaks (multi-line headings)
- Never use `<br />` as a standalone spacer between elements
- Use CSS margins or padding for all inter-element spacing

### List Spacing

All bullet lists use `gap: var(--space-xs)` (8px). The global `ul, ol` rule provides `list-style: disc`.

---

## Standard Component Pattern

Every new component should use:

- Font sizes from `--fs-*` (never hardcoded)
- Colors from `--color-*` or `inherit`/`currentColor`
- Spacing from `--space-*`
- Border widths from `--border-*`
- Border radius from `--radius-image` (for images) or hardcoded small values for UI
- Transitions from `--transition-*`
- Z-index from `--z-*`

---

## Intentionally Hardcoded Values

These values are deliberately NOT tokenized:

| Value                                                   | Location                              | Rationale                                                    |
| ------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| Navbar px padding (28px, 24px, 22px, 20px, 18px)        | Navbar.module.css                     | Pixel-tuned for visual alignment of logo-to-nav relationship |
| Touch target 44px                                       | Navbar hamburger/close                | WCAG minimum touch target size                               |
| Icon geometry (24px, 26px, 1.5px lines, 5px gap)        | Navbar hamburger/close                | Physical icon dimensions                                     |
| `padding-left: 1.25em`                                  | Global list rule + components         | Standard typographic list indent                             |
| `padding-bottom: 2px/4px`                               | Nav link, footer link, not-found link | Micro underline offset too small for spacing scale           |
| `border-radius: 4px`                                    | ErrorBoundary button                  | One-off UI element                                           |
| `border-radius: 6px`                                    | Footer logo                           | Small logo rounding distinct from content images             |
| Animation transforms/rotations                          | FadeIn, Accordion, IntroOverlay       | Motion values, not layout spacing                            |
| Navbar `.logo` mobile `letter-spacing: 0`               | Navbar.module.css                     | Reset for mobile mark, not a design value                    |
| Footer `.text` font-size `0.8125rem`                    | Footer.module.css                     | Fine-print exception to the 3-size rule                      |
| IntroOverlay animation durations (600ms, cubic-beziers) | IntroOverlay.module.css               | Choreographed animation sequence                             |
| `0.25em` subtitle spacing                               | Hero.module.css                       | Typographic micro-spacing between lines                      |

---

## Naming Conventions

### CSS Custom Properties

- Colors: `--color-*`
- Font sizes: `--fs-*`
- Font families: `--font-*`
- Line heights: `--lh-*`
- Letter spacing: `--ls-*`
- Spacing: `--space-*`
- Layout widths: `--max-width`, `--text-max-width`, `--content-*`
- Borders: `--border-*`
- Radius: `--radius-*`
- Transitions: `--transition-*`
- Button: `--button-*`
- Z-index: `--z-*`

### File Naming

- Components: `src/components/ComponentName/ComponentName.module.css`
- Pages: `src/app/(group)/route/page.module.css`
- Shared styles: `src/styles/*.module.css`
