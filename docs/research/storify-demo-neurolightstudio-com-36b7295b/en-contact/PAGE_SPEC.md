# /en/contact — Contact Us

Source: `https://storify-demo.neurolightstudio.com/en/contact`
Route: `src/app/en/contact/page.tsx`
Component: `src/components/sites/<site-key>/en-contact/ContactForm.tsx`

Original height 2186px at 1440×900.

## Layout

1. **Breadcrumb** — Home › Contact Us.
2. **Hero** — a 380px photo band (`/contact-hero-storify.png` on the target,
   downloaded to `public/images/`) under a dark scrim, with the centred
   `Contact Us` title and the intro line over it.
3. **Card**, straddling the hero's bottom edge (`-mt-16`), split 5/7 at `lg`:
   - **Get in Touch** on a muted panel — the blurb, then four rows, each a 40px
     round primary icon beside a bold label and its value: Head Office ·
     Email Us · Call Us · Support Hours.
   - **Send us a message** — Name / Company and Phone / Email in two columns,
     then Subject and Message full width, then a full-width primary
     **Send Message** button with a paper-plane glyph.
4. **Visit Our Store** — heading and blurb on the left, an "Open in Google Maps"
   link on the right, then the embedded map.

Both map URLs are the target's own, kept verbatim:
`https://www.google.com/maps/search/?api=1&query=<address>` for the link and
`https://www.google.com/maps?q=<address>&output=embed` for the 440px iframe.

## Gotcha

The card overlaps a **positioned** hero, so without its own `relative z-10` the
hero paints over it and the "Get in Touch" heading disappears behind the photo.
Caught in review of the first render.

## Simplified here

The form has no backend: submitting acknowledges locally and says so — the same
seam as checkout's `placeOrder()` and the blog comment form. Required fields
(name, email, subject, message) are enforced by the browser first.
