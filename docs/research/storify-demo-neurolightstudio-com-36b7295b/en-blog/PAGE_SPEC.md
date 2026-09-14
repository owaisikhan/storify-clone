# /en/blog and /en/blog/[slug]

Source: `https://storify-demo.neurolightstudio.com/en/blog`
Routes: `src/app/en/blog/page.tsx`, `src/app/en/blog/[slug]/page.tsx`
Components: `src/components/sites/<site-key>/en-blog/`

Original heights at 1440×900: index 2459px, article 5072px.

## Data

The site exposes **no public API for posts** (`/api/blog`, `/api/posts`,
`/api/articles` all 404), so every field was read off its own rendered pages and
written to `src/data/blog.ts`: title, excerpt, category, author + avatar, date,
read time, comment count, hero image, tags, related slugs and the body markup.
Images were downloaded into `public/images/blog/`.

Gotcha worth recording: `main.querySelector("img")` returns the *author avatar*
on posts that have one, so heroes are picked by measured width (862px) instead.

Six posts, all prerendered, `dynamicParams = false`.

## Index

| Block | Spec |
| --- | --- |
| Breadcrumb | home icon › Blog |
| Heading | centred `text-3xl md:text-[2.75rem] font-bold`, "Latest Guides and News" |
| Subtitle | "Stories from Overflow on design, user flows, UI, UX and more from the experts." |
| Chips | All + Accessories + Mobile Phones + Power & Charging, `h-9 rounded-full`, active `bg-[#1e2a36] text-white` |
| Featured | newest post, image left / copy right at `lg`, `aspect-[16/10]` |
| Divider | "Latest Articles" · rule · post count |
| Grid | `sm:grid-cols-2 lg:grid-cols-3` cards: image, title, excerpt, byline, Read More |
| Byline | 40px avatar, or the author's initial in a muted circle (as "Admin User" renders) |

Chips filter client-side; the featured slot follows the filtered list.

## Article

Breadcrumb → category badge → `h1` → excerpt → byline with
"date · read time · N comments" → 16/9 hero → body → `#tag` row →
Related articles → Comments ("Be the first to comment.") → Leave a comment form.

Body is the site's own markup, snapshotted at build time (not user input), and
renders through `.prose-storify` — the same typography the product descriptions
use.

The comment form has no backend: submitting acknowledges locally and says so,
the same seam as checkout's `placeOrder()`.
