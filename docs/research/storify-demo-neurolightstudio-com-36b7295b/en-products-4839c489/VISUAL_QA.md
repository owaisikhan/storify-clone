# Visual QA — /en/products

| Check | Original | Clone |
| --- | --- | --- |
| Page height (1440px) | 4536px | 4646px |
| H1 | "Shop All Products" | ✅ same, same two-tone treatment |
| Sidebar panels | Location · Category · Availability · Price · Brands · Featured Products | ✅ all six |
| Grid page size | 32 | ✅ 32 |
| Result count | "Showing 1 - 32 of 58 products" | "Showing 1 - 32 of 59 products" |
| Pagination | `‹ 1 2 ›` | ✅ same |
| Broken images | — | 0 |
| Mobile overflow (390px) | — | none (390/390) |

## Interactions verified

- Category filter: "Gaming" → `Showing 1 - 5 of 5 products` ✅
- Density switcher: View 2 → 2 columns, View 3 → 3, View 4 → 4 ✅
- Sort "Price Low - High" → first card is Ugreen CD317 ($20), the cheapest ✅
- Pagination page 2 → `Showing 33 - 59 of 59 products` ✅
- Mobile "Filters" opens the drawer with "Show results" ✅

## Known differences

- **58 vs 59 products.** The live page reports 58; the products API returns 59.
  One item is evidently hidden from the listing server-side. The clone shows the
  full API pool.
- **Location / radius filter is inert.** Rendered faithfully but non-functional —
  the snapshot has no geo data. This was flagged in the spec before building.
- **A few colour swatches render grey.** Where the API omits `colorCode` the card
  falls back to `#d4d4d4`; the live site appears to map some colour names to
  hues in the client.

## Regression check — homepage

After moving the header/footer into the root layout, the homepage re-measured
**identical** to its pre-refactor QA: total height 12306px and every section top
and height unchanged (hero 160/588, collections 3323/1411, footer 11931/374).
