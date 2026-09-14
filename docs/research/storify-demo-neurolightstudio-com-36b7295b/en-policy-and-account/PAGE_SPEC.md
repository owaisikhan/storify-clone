# Policy, help and account pages

Eleven routes found by a full internal-link audit (16 pages, 132 distinct
hrefs) — every one linked from the header or footer on every page, and all of
them 404ing in the clone until now.

## How they were found

An earlier claim that "every internal link resolves" was wrong. A first check
with `curl` also mis-reported these as 404s on the target: they are
client-rendered, so curl sees the SSR shell's "Page Not Found" while the real
page renders in a browser. Checked properly in Chromium, 11 of the 13 are real
pages on the target; only `/en/careers` and `/en/deals` 404 there too, so those
two stay 404 here.

## Content pages

| Route | Source content |
| --- | --- |
| `/en/terms` · `/en/privacy` · `/en/cookies` · `/en/accessibility` | **Unedited demo stubs on the target** — a heading and one "add your … here" line. Copy kept verbatim; inventing policy text would put words in the store's mouth. |
| `/en/faq` | Three Q&A pairs, captured by opening each accordion item. One open at a time, plus/minus glyph. |
| `/en/returns` | The full long-form policy: hero + return-window card, five numbered "How a return works" cards, Eligible / May not qualify columns, the Refund rules grid, the six-row status table beside the "Before sending anything back" aside, and the closing CTA. All copy verbatim. |

## Interactive pages

| Route | Behaviour |
| --- | --- |
| `/en/login` | "Welcome back / Sign in" with the target's own **published demo credentials** (admin@storify.com / vendor@storify.com) and their "Fill & quick login" buttons, which populate the form. Signing in has no backend and says so. |
| `/en/track-order` | Order number + email/phone + Track. No orders are stored, so it reports that rather than inventing a delivery status. |
| `/en/compare` | Real: search the catalogue, add **up to four** products (the target's own limit, from its empty-state copy), and compare price, compare-at, brand, category, vendor, rating and availability. |
| `/en/account/wishlist` | The target redirects here to sign-in. With no auth, the list is browser-local — same module-store + localStorage + `useSyncExternalStore` shape as the cart — and the product-card hearts now write to it. |
| `/en/become-vendor` | The four-step stepper (Your details → Store & documents → Subscription → Review) with step one's fields exact and password confirmation validated. Later steps need an account, document storage and billing, so Continue says what is missing instead of faking a signup. |

## Remaining 404s

`/en/careers` and `/en/deals` — 404 on the target too, left as-is.
