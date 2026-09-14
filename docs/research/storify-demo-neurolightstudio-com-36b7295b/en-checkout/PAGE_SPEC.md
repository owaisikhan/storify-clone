# /en/checkout — Checkout

Source: `https://storify-demo.neurolightstudio.com/en/checkout`
Route: `src/app/en/checkout/page.tsx`
Components: `src/components/sites/<site-key>/en-checkout/`

The target's checkout is session-backed: `POST /api/cart/items` creates a
`cart_session` cookie and the page renders from it. To measure the real page I
created a session with curl (3 × Xiaomi Pad 8 Pro + 1 × Beats Solo 4, subtotal
$2,710) and loaded `/en/checkout` with that cookie. Every measurement below is
from that render — page height 1846px at 1440×900, empty state 600px.

## Layout

One `<form>` filling the page, `lg:grid lg:grid-cols-2` — a true 50/50 split,
not a 2/1 sidebar.

| Block | Spec |
| --- | --- |
| Left column | `px-4 py-8 lg:px-10 lg:py-12 lg:pr-16`, inner `max-w-[480px] mx-auto lg:mx-0 lg:ml-auto`, sections spaced `space-y-8` |
| Right column | `<aside>` `border-t bg-zinc-50 px-4 py-8 lg:border-t-0 lg:px-12 lg:py-12 dark:bg-background`, inner `max-w-[440px]`, `lg:sticky lg:top-[var(--checkout-summary-offset)]` with `lg:max-h-[calc(100dvh-var(--checkout-summary-offset)-1rem)] lg:overflow-y-auto` |
| Stacking | below `lg` the summary drops under the form, separated by `border-t` |

The page keeps the normal storefront chrome (announcement bar, sticky header,
footer) — it is not a stripped checkout shell.

## Left column, in order

1. **Guest header** — `h2.text-xl font-semibold tracking-tight` "Checkout as
   Guest", then "or **Log in** for faster checkout" (`text-sm`, underlined link).
   Section is `space-y-4 border-b pb-6`.
2. **Contact details** — `h3.text-lg font-semibold`; one floating-label email
   field; checkbox "Email me with news and others" (`size-4 rounded-[4px]`).
3. **Fulfillment** — radio card `flex cursor-pointer items-start gap-3 rounded-lg
   border p-3`, selected = `border-primary bg-primary/5`. Single option
   **Delivery / Shipped to your address**, plus the muted note "This cart has
   items from multiple stores, so only delivery is available." (shown when the
   cart spans vendors; with one vendor the target also offers Pickup).
4. **Delivery** — Country combobox (56px, shows "United States"), then
   First/Last name in `grid-cols-2 gap-3`, Street Address, "Apartment, suite,
   etc. (optional)", City/Postal Code in `grid-cols-2 gap-3`, State select
   (50 US states).
5. **Shipping method** — before an address: muted box "Enter your shipping
   address to view available shipping methods." The target then calls a rates
   API; on failure it shows a destructive box with a **Retry** button.
6. **Payment Method** — lock glyph + "All transactions are secure and encrypted.";
   five radio rows (`min-h-12`, divided, each with a trailing glyph): **Card,
   PayPal, Razorpay, Paystack, COD**. Selecting Card expands "Card details":
   Card Number (with VISA/MC/AMEX/DISC marks), Expiry Date + CVV/CVC in two
   columns, Card Holder. COD expands "Pay with cash when your order is
   delivered." COD is the default selection.
7. **Billing Address** — two radio rows, "Same as shipping address" (default,
   selected row tinted) / "Use a different billing address", which reveals the
   same address fields.
8. **Complete order** — `h-12 w-full rounded-[10px] bg-primary text-base
   font-semibold text-white`, `type="submit"`, disabled (50% opacity) until the
   form validates.
9. **Policy links** — Refund policy · Privacy policy · Terms of service,
   `text-xs underline`, centred.

### Inputs (the target's floating-label pattern)

`h-14` (56px), `rounded-[10px]`, `border 1px #ebebeb`, transparent background,
`text-sm`. The `<label>` sits absolutely at `left-3 top-1/2 -translate-y-1/2
text-sm text-muted-foreground` and animates to `top-2 text-xs` on focus or when
filled (`peer-focus` / `peer-[:not(:placeholder-shown)]`, 150ms). Filled inputs
carry `pt-6 pb-1.5`. Placeholders are a single space — the label *is* the
placeholder.

## Order summary (right column)

| Row | Spec |
| --- | --- |
| Header | `h3.text-lg font-semibold` "Order summary" + "Edit cart" link (`text-sm text-muted-foreground underline underline-offset-4`) → `/en/cart` |
| Rows | Subtotal · Shipping · Estimated Tax · Promo code, `text-sm`, label muted / value `text-foreground` |
| Coupon | `h-9 rounded-[10px]` input "Enter coupon code" with a tag glyph + `Apply` button (`h-11 rounded-[10px] border`) |
| Total | `Total` `font-semibold` left, `USD` small + amount `text-2xl font-bold` right |
| Lines | 64px thumbnail on `bg-zinc-100`, name `text-sm font-medium`, `Qty: N` muted `text-xs`, line total `text-sm font-semibold`, and a `size-8 rounded-full` remove button (aria "Remove <name>") that turns `hover:text-destructive` |

Measured totals for the reference cart: Subtotal $2,710.00 · Shipping **Free** ·
Estimated Tax **$216.80** (exactly 8.0%) · Total **USD 2,926.80**.

## Empty state

With an empty cart the page renders only: "Your cart is empty" heading, the
line "Your cart is empty. Add some products before checkout.", and a primary
**Shop Now** button. (The `/en/cart` page uses different copy: "Looks like you
haven't added any items to your cart yet.")

## What this clone does differently

There is no backend here, so:

- The cart is the client-side cart shipped with the drawer; the page reads it
  through `useCart()`.
- **Shipping** is Free (matching the target's "Free shipping on orders over $50"
  banner) and **Estimated Tax** is a flat **8%**, the rate the target returned.
- **Promo code**: `Apply` on an unknown code shows "This code isn't valid."
  No real codes exist on the target to copy.
- **Card fields** are form-only — they are never sent anywhere, and nothing is
  stored. No `autocomplete` on the card fields.
- The rates API, the login link and the policy links have no destinations yet.

## Open decisions (need sign-off before build)

1. **What "Complete order" does.** Proposal: validate, clear the cart, and show
   an inline order-placed panel with a generated order number, in place of the
   form. The alternative is a separate `/en/checkout/success` route.
2. **Whether `/en/cart` ships in this step.** "Edit cart" here and "Edit cart" /
   "View Cart" in the drawer both point at it; without it those links 404. It is
   a small page (breadcrumb, `View Cart` + item count, a 4-column table grouped
   by "Sold by <vendor>", and the same summary card with "Proceed to Checkout" /
   "Continue Shopping").

## Reference captures

`scratchpad/recon/full-en-checkout-desktop.png` · `full-en-checkout-mobile.png` ·
`checkout-card.png` (Card expanded, address filled) · `full-en-cart-desktop.png` ·
`checkout-deep.txt` (225-line annotated DOM with computed styles).
