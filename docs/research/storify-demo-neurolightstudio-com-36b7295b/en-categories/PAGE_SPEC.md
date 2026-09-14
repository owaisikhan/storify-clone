# /en/categories and /en/categories/[slug]

Source: `https://storify-demo.neurolightstudio.com/en/categories`
Routes: `src/app/en/categories/page.tsx`, `src/app/en/categories/[slug]/page.tsx`
Components: `src/components/sites/<site-key>/en-categories/`

Original heights at 1440×900: index 2102px, Accessories detail 1655px.

## Data

15 categories — 12 on the target's page one, three more behind `?page=2`
(TV & Audio, Wearable Technology, Xiaomi). Nine already had artwork downloaded
for the homepage rail; the other six (Google, Iphone, Oneplus, Phones, Samsung,
Xiaomi) were pulled into `public/images/categories/`.

`src/data/categories.ts` holds the list and looks products up by
`categorySlug`, which the product snapshot already carries.

## Index

Breadcrumb → two-tone centred "All **Categories**" → a 38px search box with a
62px dark submit square → four-up grid of square image tiles with the label
underneath → pagination at 12 per page (two pages, as on the target).

The search filters live here; the target reloads with a query instead.

## Detail

Breadcrumb (home › Categories › label) → `h1` "Shop by \<Category\>" → a 260px
sidebar and a four-column grid.

The sidebar is narrower than the one on `/en/products` — no Categories block
(the page is already scoped) and no Collections — just **Availability**,
**Price** (min/max) and **Brands**, the brands being the ones present in that
category. `PRICE_FLOOR` / `PRICE_CEILING` are imported from the products page's
FilterPanel so both pages agree. A "Filters" drawer covers mobile.

Toolbar: "N products" on the left, a Sort by menu on the right (Most Popular,
Best Rating, Newest, Price Low - High, Price High - Low).

Verified against the target: Accessories shows **6 products** and the brands
Anker · Apple · Samsung — identical on both.

## Simplified here

The target's sidebar also has a Location/radius control. No geo data exists in
this clone, so it is left out rather than rendered inert — the same call made on
`/en/products` and the vendor pages.
