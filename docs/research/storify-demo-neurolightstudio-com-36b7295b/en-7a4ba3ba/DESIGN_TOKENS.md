# Design Tokens — storify-demo.neurolightstudio.com/en

Source: `_next/static/chunks/24nl_lyjzqd18.css` (`:root` / `.dark`) plus the
inline `style` attribute the app renders on its `.store-surface` wrapper.
All values below are verbatim; they live in `src/app/globals.css`.

## Two-layer theming

The site ships shadcn tokens at `:root`, then **overrides them** inside
`.store-surface` from a storefront preset (`data-store-theme="electronics"`).
The storefront layer is what you actually see — e.g. the page background is
`#ffffff`, not the `:root` value `#f5f5f5`.

### Storefront preset (effective, light)

| Token | Value |
| --- | --- |
| `--background` ← `--store-l-background` | `#ffffff` |
| `--card` / `--popover` ← `--store-l-surface` | `#ffffff` |
| `--muted` / `--secondary` ← `--store-l-surface-alt` | `#f4f6f8` |
| `--foreground` ← `--store-l-text` | `#212b36` |
| `--muted-foreground` ← `--store-l-text-muted` | `#637381` |
| `--border` / `--input` ← `--store-l-border` | `#ebebeb` |
| `--primary` / `--ring` ← `--store-l-primary` | `#2065d1` |
| `--primary-foreground` | `#ffffff` |
| `--destructive` ← `--store-l-sale` | `#dc2626` |
| rating star | `#f59e0b` |
| link | `#2065d1` |

Dark counterparts: background `#1a1a1a`, surface `#262626`, surface-alt
`#333333`, text `#fafafa`, muted text `#a3a3a3`, border `#2f2f2f`,
sale `#ef4444`, rating `#fbbf24`.

### Geometry

| Token | Value |
| --- | --- |
| `--radius` | `8px` |
| `--store-radius-card` | `8px` |
| `--store-radius-button` (`.rounded-button`) | `10px` |
| `--store-radius-badge` | `4px` |
| `--store-btn-height` | `44px` |
| `--store-page-width` | `1440px` |
| `--store-page-padding` | `1rem` |
| `--storefront-header-height` | `124px` |

### Typography

- Family: **Inter** (`--font-sans: var(--font-inter)`), Geist Mono for the coupon code.
- Headings: `font-weight: 700`, `letter-spacing: -0.03em` (`--store-heading-*`).
- Section titles: `--sec-title: 22px` → `--sec-title-lg: 28px` at `sm`
  (a few sections use `1.125rem → 1.5rem`).
- Product card: title 13px/tight semibold (14px at `sm`), colour label 12px muted
  (13px at `sm`), price 18px bold `tabular-nums`, compare-at 11px muted line-through.
- Body/base: 16px / 1.5, `letter-spacing: normal`.

### Section-level accents (measured, not tokenised by the site)

| Element | Value |
| --- | --- |
| Announcement bar | `linear-gradient(90deg, #48E4FF 0%, #5570FF 53%, #C053FF 100%)` |
| Header search field | bg `#F3F3F3`, radius 10px, height 44px, text `#949494` |
| "All Categories" button | bg `#366FFF`, radius 10px, 15px/600 white |
| Header nav links | `#6b7280`, 13px/500 |
| Deals panel | `linear-gradient(180deg, #181c75 0%, #512c75 100%)` |
| MacBook banner | `linear-gradient(90deg, #1c2437 0%, #202739 28%, #3a4d7d 100%)` |
| Hero slide 1 | `linear-gradient(0deg, #e5e4e7 0%, #dedfe9 100%)` |
| iPhones promo | `linear-gradient(225deg, #f3f3f3 0%, #e3e6e8 100%)` |
| Apple Watches promo | `linear-gradient(180deg, #c8e4ff 0%, #ecff98 100%)` |
| Product card media | bg `#f3f4f6`, radius 6px, `aspect-ratio 8/9`, inner padding 14px |
| Dark CTA buttons | `#1e2a36` |
| Card shadow | header `0 2px 10px rgba(15,23,42,0.06)`; cards `none` (1px border instead) |

### Breakpoints

Tailwind defaults — `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Layout changes
observed at 640 (card rails 2→3 up), 768 (hero `a b / a c`), 1024 (hero gains the
category rail; feature mosaic goes 4-column), 1280 (mobile tab bar disappears).
