# Component Inventory

All components live in
`src/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/`.

| Component | Client? | Covers | Notes |
| --- | --- | --- | --- |
| `SiteHeader` | ✅ | announcement bar, desktop header (2 rows), mobile header, bottom tab bar | scroll-collapse 124→60px, sticky `z-50` |
| `HeroSection` | ✅ | hero mosaic: category rail, slider, 2 promo tiles | autoplay 6s, dot navigation |
| `Slide` | — | `SlideArt` / `SlideContent` / `SlideHeading` / `SlideButton` + `slideTextStyle` | container-query slide primitives shared by hero, collections, banner |
| `BrandStrip` | — | 7 greyscale brand logos | hover restores colour |
| `CategoryRail` | ✅ | "Shop by Categories" circular rail | arrows via `Rail` |
| `FeatureMosaic` | — | 5-tile editorial mosaic | `hs-grid--feature` |
| `TopSelling` | ✅ | tabbed product rail | 3 tab states, arrows |
| `DealsSection` | ✅ | deals panel: countdown, 1 featured + 4 side cards | 1s interval countdown |
| `CollectionRows` | — | "Top Collections" heading + 3 rows (promo + 4 cards) | 3rd promo is image-only |
| `WideBanner` | — | MacBook Pro banner | slide primitives |
| `ProductExplorer` | ✅ | filter pills + product grid | IntersectionObserver pagination |
| `CouponBanner` | ✅ | dark coupon strip | clipboard copy |
| `TopVendors` | ✅ | vendor cards rail | cover + overlapping logo + stat strip |
| `BecomeVendor` | — | vendor recruitment panel | dotted radial background |
| `TopArticles` | ✅ | blog card rail | author row, Read More |
| `SiteFooter` | — | brand column + 4 link columns + copyright | |
| `ProductCard` | — | shared product card | badges, swatches, price, rating, preorder line, hover actions |
| `RailControls` | ✅ | `Rail` + `RailArrows` | shared horizontal-rail scrolling |

## ProductCard anatomy (the most reused piece)

```
a.group (gap 22px)
├─ media  (radius 6px, aspect 8/9, bg #f3f4f6, padding 14px)
│  ├─ next/image  (object-contain, group-hover:scale-105, 500ms)
│  ├─ badge stack (absolute left-3 top-3)
│  │  ├─ "Pre-order" (bg-blue-600) | "-N%" (white chip, text-destructive)
│  │  └─ "Featured"  (bg-primary)  ← hover-revealed only
│  ├─ wishlist button (right-2 top-2)   ← hover-revealed
│  ├─ compare button  (right-2 top-11)  ← hover-revealed
│  └─ action bar (inset-x-2 bottom-2)   ← hover-revealed, 1 or 2 columns
└─ info (gap 6px)
   ├─ colour swatches (h-4 w-4 rounded-full, title = colour name)
   ├─ h3 title (line-clamp-2) + colour label (capitalize, muted)
   ├─ price row (@container): 18px bold + line-through compare + ★ rating
   ├─ preorder line: "Ships Sep 15 / 797 left" (primary, 11px)
   └─ "Request a quote" button — price-on-request products only
```

## Data layer

| File | Contents |
| --- | --- |
| `src/data/products.ts` | 59 products from the live API (`priceRange.min`, `compareAtPriceRange.min`, colour options, preorder release/limit, rating, local image paths) |
| `src/data/site.ts` | nav, categories, hero slides/promos, brands, feature tiles, per-tab product slugs, deals, collection rows, banner, coupon, vendors, articles, footer |
| `src/types/storify.ts` | `Product`, `HeroSlide`, `PromoTile`, `DealCard`, `Vendor`, `Article`, … |
