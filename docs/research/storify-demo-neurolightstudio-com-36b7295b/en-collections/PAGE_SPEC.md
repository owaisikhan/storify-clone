# /en/collections and /en/collections/[slug]

Source: `https://storify-demo.neurolightstudio.com/en/collections`
Routes: `src/app/en/collections/page.tsx`, `src/app/en/collections/[slug]/page.tsx`

Original heights at 1440×900: index 4350px, Desk Setup Essentials 1984px.

## Data

Five curated collections, with membership read off each collection page:

| Collection | Members |
| --- | --- |
| Desk Setup Essentials | 5 |
| Smart Watches | 7 |
| Headphones & Audio | 7 |
| Premium Tech | 12 |
| iPhone Lineup | 5 |

All 36 member slugs resolve against our catalogue. Covers were downloaded into
`public/images/collections/`. Only Smart Watches carries a description.

**Counts come from the membership lists, not the target's badges.** Its
"Premium Tech" badge reads 13 while the page itself lists 12.

## Index

Breadcrumb → two-tone heading ("Collections," in foreground, "Browse our curated
collections" muted) → a row of collection cards (cover with a count badge in the
top-right, name, description where one exists) → then **the full catalogue**
below, which is how the target lays the page out.

## Detail

Breadcrumb → `h1` → the description where one exists → the same lightweight
toolbar and grid the brand pages use ("N products" left, "Sort by:" right),
reused rather than duplicated.

## Note on the homepage promos

`collectionRows` in `site.ts` links to `/en/collections/iphones`,
`/en/collections/apple-watches` and `/en/collections/laptops` — slugs captured
from the homepage tiles that do not exist among the five real collections (they
404 on the target too). Left as-is; retargeting them would be a change to the
homepage rather than a clone of it.
