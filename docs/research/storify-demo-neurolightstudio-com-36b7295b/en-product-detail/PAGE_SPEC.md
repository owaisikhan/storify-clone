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

### Gallery behaviour (measured, not approximated)

| Control | Behaviour |
| --- | --- |
| Image frame | `h-[38vh] max-h-[360px]` → `sm:h-[42vh] max-h-[400px]` → `md:h-[44vh]` → `lg:aspect-square lg:h-auto lg:max-h-[calc(100svh - var(--storefront-header-height,7rem) - 14rem)]`, bg `#f0f0f0` |
| Image | is itself a `<button>` — `cursor-zoom-in`, aria "Open product gallery fullscreen"; clicking it opens the viewer |
| Hover | `scale-100 group-hover:scale-[1.025]`, `transition-transform duration-500 ease-out`, `motion-reduce:transition-none` — a 2.5% lift (verified: 680px → 697px on the target, 676px → 692.9px here) |
| Magnifier | toggles zoom; aria flips "Enable image zoom" ↔ "Disable image zoom" |
| Zoomed | image becomes `scale-[1.9]`, hover-scale drops, and `transform-origin` tracks the pointer as **origin% = clamp(0, 100, (pointer% − 50) × 1.9 + 50)** — the factor equals the scale, so the frame stays covered. Verified against the target: pointer at 25%,25% → `2.5% 2.5%`; at 75%,70% → `97.5% 87.8623%` (identical) |
| Expand | aria "Open fullscreen image viewer" — same viewer as clicking the image |
| Viewer | centered square dialog, `w-[90vw] max-h-[90vh] max-w-[90vh] sm:max-w-3xl`, body `overflow: hidden`, buttons "Close media viewer" / "Previous fullscreen media" / "Next fullscreen media" / "Open fullscreen image N", arrow keys page, Escape closes |
| Main arrows | aria "Show previous media" / "Show next media", `h-10 w-10` round, `left-3` / `right-3` |
| Thumbnails | `aspect-4/3 w-[calc(25%-0.75rem)]`, aria "Show image N" — four across |

### Share row (measured)

Tiles are `h-10 w-10 rounded-lg bg-muted`, `gap-2`, under a
`text-sm font-semibold` "Share" label; each picks up its network's colour on
hover (Facebook `#1877F2`, WhatsApp `#25D366`, the rest `foreground`).

| Control | Target behaviour |
| --- | --- |
| Facebook | `<a target="_blank" rel="noopener noreferrer">` → `facebook.com/sharer/sharer.php?u=<url>` |
| X | → `twitter.com/intent/tweet?url=<url>&text=<product name>` |
| WhatsApp | → `wa.me/?text=<product name> <url>` |
| Email | `mailto:?subject=<name>&body=Share this product with friends and family\n<url>` (no target) |
| Copy link | `<button>`; writes the URL to the clipboard, icon `Link2` → `Check`, aria "Copy link" → "Link copied", toast "Link copied", both reverting after ~2s |

The shared URL is this clone's own canonical URL, built from `siteUrl` in
`src/data/site.ts` (override with `NEXT_PUBLIC_SITE_URL`). It is computed the
same way on server and client so the anchors hydrate without a mismatch.

**Inert (visual only):** Add to Cart, Buy Now.

## Not built yet

**Reviews** — deferred by request. The original has a Reviews tab, an average
score with "Write a review!", Rating/Sort-by selects, review cards with photos
and a "Showing 1 - N of N reviews" footer. Data is available at
`/api/reviews?productId=<id>` (the reference product has one 4★ review with an
image, by Storify Admin). The Reviews tab is omitted entirely until then.
