# /en/products/[slug] — Product Detail

Source: `https://storify-demo.neurolightstudio.com/en/products/<slug>`
Route: `src/app/en/products/[slug]/page.tsx`
Components: `src/components/sites/<site-key>/en-product-detail/`

Reference product: **Xiaomi Pad 8 Pro** (colour + storage variants, 6% discount,
4.0 rating). Original heights: 4921px (Xiaomi), 4450px (iPhone 17), 4185px (Beats).

## Prerendering

`generateStaticParams` returns **6 products** for now; `dynamicParams` stays on
so the remaining 53 render on demand from the same static snapshot. Unknown
slugs `notFound()`. Prerendering the full set is a follow-up.

Prerendered: xiaomi-pad-8-pro · iphone-17 · beats-solo-4-wireless-headphones ·
sony-playstation-portal-remote-player-for-ps5-console ·
macbook-pro-m5-14-inch-24gb1tb-10-core-cpu-10-core-gpu ·
dji-air-3s-fly-more-combo-with-dji-rc-2-remote-controller

> **Next 16:** `params` is a `Promise` and must be awaited.

## Layout

| Block | Spec |
| --- | --- |
| Gallery | square hero on `bg-muted`, `object-contain p-10`; emerald `-N%` badge top-left; zoom + fullscreen `size-9` buttons top-right; prev/next `size-10` arrows; thumbnails `h-[110px] w-[155px]`, centered, `gap-5`, active one `bg-muted ring-1 ring-border` |
| Breadcrumb | home icon › category › brand, `text-xs text-muted-foreground` |
| Brand logo | `h-12 w-56`, `object-contain object-left`, links to `/en/brands/<slug>` |
| Title | `text-xl font-semibold tracking-tight md:text-2xl` |
| Rating | 5 stars + `(N)` review count |
| Price | `text-2xl font-bold` + struck compare-at + rose `N% OFF` pill + emerald `In Stock` pill |
| Options | `divide-y` rows, label left / pills right at `lg`; colour pills carry a `size-4` dot; selected = `border-foreground` (filled for non-colour) |
| Actions | quantity stepper (h-12 bordered) + `Add to Cart` (`#1e2a36`) + `Buy Now` (primary) |
| Collapsibles | Overview · Product Details · FAQ, `border-b`, `py-4`, plus/minus glyph |
| Delivery | bordered box: "Standard delivery within 4–7 days" / "Return within 30 days in original condition for a full refund" |
| Share | Facebook · X · WhatsApp · email · copy-link, `size-10 rounded-lg bg-muted` |
| Tabs | centered `Description · Specifications`, active `border-foreground font-semibold` |
| Description | two-tone "Descrip**tion**" heading + rich-text body via `.prose-storify` |
| Specifications | `dl` of label/value rows — only for the 11 products carrying attributes |
| You May Also Like | two-tone heading, rail arrows, up to 8 same-category products via the shared `ProductCard` |
| Footer banner | the homepage `WideBanner`, reused |

lucide v1 ships no brand marks, so the Facebook/X/WhatsApp glyphs are inlined SVG.

## Data

`src/data/product-details.ts` (428KB, generated) keyed by slug:
description HTML, shortDescription, images, options, variants, specs, sku,
category/brand/vendor and the local brand logo. Kept out of `products.ts` so
listing pages don't pull the descriptions in.

Descriptions render through `dangerouslySetInnerHTML`. They are a build-time
static snapshot of the site's own copy — not user input.

## Interactions

Gallery thumbs + prev/next · option pills selecting a real variant (price,
compare-at, discount and stock all follow) · colour picks swapping the hero
image · quantity stepper · the three collapsibles · tab switching · related rail.

**Inert (visual only):** Add to Cart, Buy Now, zoom/fullscreen, share buttons.

## Not built yet

**Reviews** — deferred by request. The original has a Reviews tab, an average
score with "Write a review!", Rating/Sort-by selects, review cards with photos
and a "Showing 1 - N of N reviews" footer. Data is available at
`/api/reviews?productId=<id>` (the reference product has one 4★ review with an
image, by Storify Admin). The Reviews tab is omitted entirely until then.
