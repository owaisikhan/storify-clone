# Tech Stack Analysis

| Concern | Target site | This clone |
| --- | --- | --- |
| Framework | Next.js App Router (RSC payload, `/_next/static/chunks/*`) | Next.js 16 App Router |
| UI library | shadcn/ui + Radix primitives (`data-slot="button"`, `data-slot="popover-trigger"`) | shadcn/ui conventions, plain elements where no popover is needed |
| CSS | Tailwind v4 (utility classes in the served markup, `@theme`-style tokens) | Tailwind v4 |
| Icons | Lucide (`class="lucide lucide-heart"`) | `lucide-react` |
| Fonts | Inter (body + headings), Geist Mono (coupon code); many other families preloaded but unused on this page | `next/font/google` Inter + Geist Mono |
| Images | Next Image optimiser (`/_next/image?url=…&w=…&q=75`) over Cloudflare R2 (`pub-49808a4ecaf04280b0561965cf5a40a4.r2.dev`), WebP | `next/image` over local `/public/images` copies |
| Data | REST: `/api/products`, `/api/categories`, `/api/collections`, `/api/brands` (JSON, `{success, data}`) | Static snapshot in `src/data/*.ts` |
| State | Server components + client islands | Same (client islands for the interactive sections) |
| Animation | CSS transitions + `sl-reveal-*` keyframes; **no** GSAP / Framer Motion | Same CSS approach |
| Scrolling | Native; **no** Lenis / Locomotive | Native |
| i18n | Locale prefix `/en`, translation bundle in the RSC payload | English only; links keep the `/en` prefix |
| Theming | `.store-surface[data-store-theme="electronics"]` maps `--store-l-*` / `--store-d-*` onto the shadcn tokens | Same mapping, reproduced in `globals.css` |

## Notable implementation details reproduced

1. **Container-query slides.** `.sl-frame { container: slide/size }` with
   `-s` / `-l` / `-p` variable sets chosen by aspect ratio. Art position,
   padding and type scale all resolve from `cqw` units, so slides keep their
   composition at any size. Copied verbatim into `globals.css`.
2. **Named-area mosaics.** `.hs-grid--leftCategoryBar3` and `.hs-grid--feature`
   with their base / `md` / `lg` templates, including the per-area
   `aspect-ratio` rules that only apply below `lg`.
3. **Inline slide typography.** The target sets `font-size/weight/style/color`
   inline on every `.sl-text` element so they beat
   `.store-surface :is(h1,h2,h3){font-weight:700}`. Reproducing this matters —
   without it the hero headline renders bold instead of its intended weight 300.
4. **Cascade-layer ordering.** `.store-surface .container { max-width: … }` must
   sit **outside** `@layer components`, otherwise Tailwind's `container`
   utility (later layer) wins and the page narrows to 1248px instead of 1440px.

## Out of scope (per the skill's defaults)

Real backend, auth, cart/checkout, search, i18n routing, and the product/vendor/
blog detail routes. Links to those paths are kept intact but resolve to 404 in
this single-page clone.
