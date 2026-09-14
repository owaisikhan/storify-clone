# /en/vendors and /en/vendors/[slug]

Source: `https://storify-demo.neurolightstudio.com/en/vendors`
Routes: `src/app/en/vendors/page.tsx`, `src/app/en/vendors/[slug]/page.tsx`
Components: `src/components/sites/<site-key>/en-vendors/`

Original heights at 1440×900: index 1376px, store page 2131px.

## Data

Five stores, in the target's own order: lee jhon moda · Smart Haven Electronics ·
Sonic Circuit Audio · Pixel Forge Computing · Nova Mobile Hub.
`/en/vendors/storify` 404s on the target despite Storify being the seller on
most products, so it is not a store page here either.

Cover and logo art already existed in `public/images/` from the homepage Top
Vendors rail. "lee jhon moda" has neither on the target and falls back to a
store glyph on the card and its initial on the store page.

Locations and ship labels came off each store page: los angeles · Chicago ·
Austin (+ "Ships in 2–5 days") · San Francisco (5.0, 1 review, 1 sold) ·
New York.

**Product counts are derived from our catalogue, not copied.** The target's own
numbers disagree with its catalogue — it shows "1 products" for Pixel Forge,
which lists two — so counts here come from `products.filter(p => p.vendor === …)`.
That makes Pixel Forge read 2 where the target reads 1.

## Index

Breadcrumb → `h1` "Vendors" → "Discover every store selling on our marketplace."
→ rule → four-up card grid. Card: 16/9 cover, then a row with a 40px round logo,
the store name, the rating (only where one exists) and "N products", then the
description clamped to two lines.

## Store page

| Block | Spec |
| --- | --- |
| Cover | 192px tall, full width, rounded |
| Logo | 90px, rounded, 4px background-coloured border, overlapping the cover |
| Header | name `text-2xl md:text-3xl font-bold`, description, then chips: rating (`5.0 (1 reviews) · 1 sold`), location, ships label |
| Actions | Follow (primary, toggles to "Following"), message glyph, Share |
| Tabs | Products (count badge) · About · Shipping & returns · Reviews, active `border-primary text-primary` |
| Sidebar | "Store information" — BASED IN, the location, a Copy button; then the store's Categories as checkboxes |
| Toolbar | "N products in this store" + a Sort by menu (Featured, Price Low - High, Price High - Low, Name A - Z) |
| Grid | four columns of the shared `ProductCard` |
| Rail | "Similar products from other stores" — same categories, different seller |

## Simplified here

- **Follow** is local state; there is no account or backend behind it.
- The target's sidebar also carries a **Location / radius** control. There is no
  geo data in this clone, so it is left out rather than rendered inert — the
  same call already made on `/en/products`.
- **Reviews** shows an empty state; the reviews feed is still deferred.
