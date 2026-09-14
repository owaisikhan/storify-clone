# Visual QA — clone vs. original

Method: both pages rendered in the same Chromium build at 1440×900 and 390×844,
screenshotted section by section, and compared crop-to-crop. Section geometry
below is `getBoundingClientRect()` on each page.

## Desktop section heights (1440px)

| Section | Original | Clone | Δ |
| --- | ---: | ---: | ---: |
| Header | 124 | 124 | 0 |
| 1 Hero mosaic | 588 | 588 | 0 |
| 2 Brand strip | 148 | 148 | 0 |
| 3 Shop by Categories | 348 | 351 | +3 |
| 4 Feature mosaic | 516 | 516 | 0 |
| 5 Top Selling | 660 | 665 | +5 |
| 6 Deals | 769 | 810 | +41 |
| 7 "Top Collections" heading | 100 | 85 | −15 |
| 8 Collection rows | 1411 | 1411 | 0 |
| 9 MacBook banner | 504 | 504 | 0 |
| 10 Product explorer | 3107* | 4935* | n/a |
| 11 Coupon | 181 | 181 | 0 |
| 12 Top Vendors | 525 | 521 | −4 |
| 13 Become a Vendor | 461 | 512 | +51 |
| 14 Top Articles | 595 | 545 | −50 |
| Footer | 362 | 374 | +12 |

\* Both pages paginate on scroll, so this section's height depends on how far the
capture scrolled — not a meaningful diff.

Total document height: 10,544 (original) vs 12,306 (clone), with the whole
difference coming from section 10's pagination state.

## Fixed during QA

1. **Container width.** `.store-surface .container` sat inside
   `@layer components`, so Tailwind's `container` utility won and the page
   rendered 1248px wide instead of 1440px. Moved the rule out of the layer.
2. **Hero grid.** Replaced approximated columns with the target's exact
   templates (`minmax(220px,1fr) 2.2fr 1fr` at `lg`, plus the base/`md` variants
   and the per-area aspect ratios).
3. **Prices.** Cards were showing the first variant's price (iPad mini 7 at
   $710). The site renders `priceRange.min` / `compareAtPriceRange.min` —
   corrected, so iPad mini 7 is $700 and iPhone 16 Pro Max is $1,000 / $1,200.
4. **Hover-gated card chrome.** Wishlist button and the "Featured" badge were
   always visible; both are hover-revealed on the target. Also restored the
   `@container` context so the ★ rating shows next to the price.
5. **Slide typography.** Heading weight was being overridden to 700 by
   `.store-surface :is(h1,h2,h3)`. The target sets weight/size/colour inline on
   `.sl-text`; doing the same restored the hero's weight-300 headline.
6. **Laptops collection tile.** Its artwork already contains the
   "Laptops / Shop Now" lockup, so the overlaid heading was duplicating it —
   now rendered image-only, as on the target.
7. **Mobile chrome.** Added the fixed bottom tab bar, the "Deliver to /
   Set location" row, the AI-search sparkle button, and the bordered pill
   category chips.
8. **MacBook banner proportions.** Nudged art width and type scale so the
   headline, two-line body and laptop image match the original crop.

## Interaction checks

- Header collapses 124 → 60px and sticks at `top: 0` on scroll. ✅
- Hero autoplays and dots switch slides. ✅
- Top Selling tabs swap to the correct captured product sets. ✅
- Deals countdown ticks every second. ✅
- Product filters swap the grid; scrolling appends the next 10. ✅
- Coupon code copies to the clipboard. ✅
- Rail arrows scroll categories / vendors / articles. ✅
- Card hover reveals wishlist, compare, "Featured" and the action bar. ✅
- No horizontal overflow at 390px (`scrollWidth === clientWidth === 390`). ✅
- No console errors or failed asset requests. The only 404s are RSC prefetches
  for `/en/...` routes that this single-page clone does not implement.

## Known gaps

- Only the homepage is built; product, vendor, blog, category and auth routes
  are out of scope, so their links 404.
- Data is a static snapshot of the site's API (59 products), so the grid cannot
  paginate past that pool and search does nothing.
- Popover menus behind "All Categories", "Collections", the location picker and
  the mobile "Menu"/"Account" tabs render their triggers but not their panels.
- Two live-page overlays are intentionally omitted: the third-party chat bubble
  and the "Store Demos" theme switcher.
- Dark mode tokens are wired up, but the target's moon toggle is presentational
  here — no theme switching is implemented.
