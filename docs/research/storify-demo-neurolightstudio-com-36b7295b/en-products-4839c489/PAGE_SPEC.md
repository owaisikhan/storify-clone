# /en/products — "Shop All Products"

Source: https://storify-demo.neurolightstudio.com/en/products
Destination route: `src/app/en/products/page.tsx` → `/en/products`
Components: `src/components/sites/<site-key>/en-products-4839c489/`

## Layout

Desktop 4536px tall (clone: 4646px). Page grid `grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]`.

| Element | Spec |
| --- | --- |
| Breadcrumb | `Home › Products`, `mb-4`, `text-sm text-muted-foreground`, chevron `size-3.5` |
| H1 | "Shop **All Products**" — `mb-8 text-center text-[26px] font-normal tracking-[-0.03em] sm:mb-10 sm:text-[34px]`; the second span is `bg-linear-to-r from-foreground to-foreground/35 bg-clip-text font-bold text-transparent` |
| Toolbar | `mb-6 hidden items-center justify-between gap-4 border-b border-border/70 pb-4 lg:flex` |
| Sidebar | `260px`, `lg:sticky lg:self-start`, panels in a `divide-y divide-border/70` stack |
| Panel header | full-width button, `py-5`, label `text-[15px] font-semibold tracking-[-0.01em]`, minus/plus glyph |
| Panel body | `pb-6` |
| Checkbox | `size-3.5 rounded-[3px] border-muted-foreground/40`, checked → `border-foreground bg-foreground text-background` |
| Checkbox label | `text-[13px] text-foreground/85`, row gap `3.5` |
| Grid | 32 per page, `grid-cols-2 gap-x-4 gap-y-10` + density classes |
| Pagination | `mt-10 border-t pt-6`; chips `size-8 rounded-button`, active `bg-foreground text-background font-bold`, rest `bg-muted`, disabled arrow `opacity-40` |

## Density switcher

Three dot-matrix buttons (`aria-label="View: 2|3|4"`), default **4**:

| Option | Dots | Dot size | Columns (lg) |
| --- | --- | --- | --- |
| View: 2 | 2×2 | 6px | 2 |
| View: 3 | 3×3 | 4.5px | 3 |
| View: 4 | 4×4 | 4px | 4 |

Active dots `bg-foreground`, inactive `bg-muted-foreground/35`, `rounded-[1.5px]`, `gap-[2px]`.

## Sort options

`Most Popular` (default, `?sortBy=popular`) · `Best Rating` · `Newest` · `Price Low - High` · `Price High - Low`.

"Most Popular" leads with the rated products (5.0s then 4.0s) and keeps API order after that. Price sorts push "Price on request" items to the end rather than treating them as $0.

## Filter panels

1. **Location** — "All locations", live product count, "Use my current location", "Search city…" input, radius slider (5·10·20·40·60·100·Any, label "Everywhere"). Disabled on the target until a location is chosen; **rendered but inert here** — the snapshot carries no geo data.
2. **Category** — 10 checkboxes + "View All →" linking `/en/categories`.
3. **Availability** — In Stock / Out of Stock.
4. **Price** — two `$` number inputs (h-9, `rounded-lg border`), dual-handle range (3px track, `size-3.5` thumbs), caption "Price: **$0 - $4,500**".
5. **Brands** — Acer, Anker, Apple, Google, Samsung, Sony, Xioami.
6. **Featured Products** — 4 mini cards (`group flex items-center gap-4`), 56px thumb + name + price.

## Mobile (390px)

No sidebar. **Filters** and **Sort by** as two equal buttons. Filters opens a left drawer with the same accordion and a pinned blue "Show results" button. Grid drops to 2 columns.

## Data

Everything runs client-side over the 59-product snapshot in `src/data/products.ts`.
`brand`, `brandSlug` and `inStock` were added to the product records to drive the
Brands and Availability filters.

## Card

The grid card is **identical** to the homepage `ProductCard` (same classes, 8/9
media, 22px stack gap, hover-gated wishlist/compare/action bar), so the component
is reused unchanged — no variant was needed.
