# /en/about — About Us

Source: `https://storify-demo.neurolightstudio.com/en/about`
Route: `src/app/en/about/page.tsx`
Component: `src/components/sites/<site-key>/en-about/AboutView.tsx`

Original height 3767px at 1440×900. All copy is the target's, verbatim —
including the demo reviews it shows under "What shoppers say".

## Sections, in order

1. **Hero** on `bg-muted/40` — breadcrumb, "About Storify" eyebrow,
   `h1` "Independent sellers. One checkout you can trust.", the paragraph,
   `Start shopping` + `Sell on Storify`, and a two-row counter card.
2. **Stats** — two bordered cards (Products listed / Orders delivered) and the
   note "Counted from live catalogue and order data. · September 2026".
3. **How Storify works** — "Two sides of one marketplace." then two cards,
   For shoppers and For sellers, each with three numbered steps; the sellers
   card ends with "Become a vendor →". Below, a three-up trust row
   (Secure payment · Easy returns · Verified sellers).
4. **What we stand for** — four-up card: Verified sellers, Fair published fees,
   Local first, Easy returns.
5. **How Storify started** — three paragraphs.
6. **What shoppers say** — three review cards with star rows.
7. **Where to find us** — Head Office, Email Us, Call Us, Support Hours, plus
   a "Contact Us →" link.
8. **Ready when you are** — full-width primary band with both CTAs.

## Counters

The target's two figures are live ("Counted from live catalogue and order
data."), so **Products listed** is derived from our own catalogue
(`products.length`) rather than hard-coded. **Orders delivered** has no local
source, so it keeps the value captured from the target (97).
