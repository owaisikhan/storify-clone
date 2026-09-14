# /en/brands and /en/brands/[slug]

Source: `https://storify-demo.neurolightstudio.com/en/brands`
Routes: `src/app/en/brands/page.tsx`, `src/app/en/brands/[slug]/page.tsx`
Component: `src/components/sites/<site-key>/en-brands/BrandProducts.tsx`

Original heights at 1440×900: index 1858px, Acer detail 1403px.

## Data

13 brands: Acer · Anker · Apple · Dell · Google · Intel · JBL · Lenevo ·
Oneplus · Samsung · Sony · Xbox · Xioami (the target's own spelling).

Seven logos already existed from the homepage brand strip; the other six
(acer, dell, jbl, lenevo, oneplus, xbox) were pulled into
`public/images/brands/`. Lookups use the `brandSlug` already on each product.

Anker and Apple carry a **description** on the target where every other card
shows a product count instead — both shapes are supported.

Counts are derived from our catalogue, not copied. They agree with the target
everywhere except **Sony**, which the target prints as "1 product" while its own
catalogue lists two.

## Index

Breadcrumb → `h1` "Brands" → "Browse products by your favorite brands." → rule →
a five-up card grid: 4/3 logo tile on a near-white panel, name, then the
description or the count, then a "View products →" link.

## Detail

Breadcrumb (home › Brands › name) → a tinted banner holding a 120px bordered
logo card, the "BRANDS" eyebrow, the name, the description where one exists, and
a product-count pill → a toolbar with "N product(s)" and a "Sort by:" select
(Featured, Price Low - High, Price High - Low, Name A - Z) → four-column grid.

No sidebar here — the target's brand page has none, unlike the category page.
