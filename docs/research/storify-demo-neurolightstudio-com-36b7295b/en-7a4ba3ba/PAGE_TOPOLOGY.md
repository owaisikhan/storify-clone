# Page Topology — storify-demo.neurolightstudio.com/en

Captured 2026-09-13 at 1440×900 (desktop) and 390×844 (mobile).
Full-page height: **10,544px** desktop / **17,645px** mobile (before infinite scroll appends).

## Output plan

| Field | Value |
| --- | --- |
| Source URL | `https://storify-demo.neurolightstudio.com/en` |
| `<app-root>` | repository root (`.`) |
| `<site-key>` | `storify-demo-neurolightstudio-com-36b7295b` |
| `<page-key>` | `en-7a4ba3ba` |
| Destination route | `/` (`src/app/page.tsx`) — first clone into an untouched template scaffold |
| Components | `src/components/sites/<site-key>/<page-key>/` |
| Assets | `public/images/` (flat; single-site app) |
| Research | `docs/research/<site-key>/<page-key>/` |
| Screenshots | `docs/design-references/<site-key>/<page-key>/` |

No pre-existing routes, components, or assets were replaced — the repo contained
only the template scaffold (`src/app/page.tsx`, `globals.css`, `layout.tsx`).

## Section order (desktop, top → bottom)

| # | Name | top | height | Component | Interaction model |
| --- | --- | --- | --- | --- | --- |
| — | Announcement bar | 0 | 36 | `SiteHeader` | static (gradient strip) |
| — | Header | 36 | 124 | `SiteHeader` | **scroll-driven** (collapses to 60px, sticky) |
| 1 | Hero mosaic | 160 | 588 | `HeroSection` | **time-driven** carousel + click dots |
| 2 | Brand strip | 748 | 148 | `BrandStrip` | static rail, hover un-greyscales |
| 3 | Shop by Categories | 896 | 348 | `CategoryRail` | click arrows, snap rail |
| 4 | Feature mosaic | 1269 | 516 | `FeatureMosaic` | static, hover zoom |
| 5 | Top Selling | 1810 | 660 | `TopSelling` | **click-driven** tabs + rail |
| 6 | Today's Featured Deals | 2470 | 769 | `DealsSection` | **time-driven** countdown |
| 7 | "Top Collections" heading | 3239 | 100 | `CollectionRows` | static |
| 8 | Collection rows (×3) | 3339 | 1411 | `CollectionRows` | static |
| 9 | MacBook Pro banner | 4749 | 504 | `WideBanner` | static (reveal animation) |
| 10 | Find your favorite products | 5253 | 3107+ | `ProductExplorer` | **click filters + scroll pagination** |
| 11 | Coupon strip | 8360 | 181 | `CouponBanner` | click-to-copy |
| 12 | Top Vendors | 8541 | 525 | `TopVendors` | click arrows, snap rail |
| 13 | Become a Vendor | 9066 | 461 | `BecomeVendor` | static |
| 14 | Top Articles | 9587 | 595 | `TopArticles` | click arrows, snap rail |
| — | Footer | 10181 | 362 | `SiteFooter` | static |

Section 10 grows as the page scrolls — the live site fetches
`/api/products?page=N&limit=10` as the grid nears the viewport bottom.

## Page layout

- Scroll container: the document (no smooth-scroll library — **no Lenis /
  Locomotive**, `scrollBehavior: auto`).
- Wrapper: `div.store-surface[data-store-theme="electronics"][data-container="fixed"]`
  → `header` (sticky) → `main.flex-1` → `footer`.
- Container: `.container mx-auto px-4`, capped by
  `max-width: min(100%, var(--store-page-width /* 1440px */))`.
- Z-index layers: sticky header `z-50`, mobile bottom tab bar `z-40`,
  card badges/overlays local `z-10`.

## Mobile deltas (390px)

- Header collapses to: logo + cart row, pill search field with an "AI search"
  sparkle button, and a "Deliver to / Set location" row on a `bg-foreground/[0.04]` chip.
- Hero categories become bordered pill chips in a snap rail (`data-hero-category-chips`),
  masked to fade at the right edge.
- Hero grid reflows to `"a a" / "b c"` (slider full width, two promos side by side).
- A fixed bottom tab bar appears (`Home · Wishlist · Menu · Account`, `xl:hidden`).

## Deliberately omitted

Two overlays on the live page are demo-site chrome rather than store design, and
are not reproduced:

- the purple floating chat bubble (third-party widget), and
- the "Store Demos — 2 designs to explore" theme switcher tab.
