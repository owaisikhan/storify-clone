# Behaviors — storify-demo.neurolightstudio.com/en

Findings from the scroll / click / hover / responsive sweep. Each entry records
the trigger, the before/after state, and how the clone implements it.

## Global

- **No smooth-scroll library.** No `.lenis`, no `[data-scroll-container]`,
  `window.Lenis` undefined, `scroll-behavior: auto`. Native scrolling.
- No GSAP, no Framer Motion. Animation is CSS transitions + a small set of
  keyframes (`sl-reveal-*`).
- Rails hide their scrollbars (`[scrollbar-width:none]`,
  `[&::-webkit-scrollbar]:hidden`) — reproduced as `.no-scrollbar`.

## Header — scroll-driven collapse

- **Trigger:** `window.scrollY` past the first header row (~80px).
- **State A (scrollY 0):** height `124px`, page offset `top: 36` (below the
  announcement bar), both rows visible.
- **State B (scrolled):** height `60px`, `top: 0`; the logo/search row collapses.
- **Mechanism:** the row wrapper is a grid whose `grid-template-rows` animates
  `1fr → 0fr` with `opacity 1 → 0`;
  `transition: grid-template-rows, opacity 220ms ease-out; transition-delay: 60ms`.
  The outer wrapper is `sticky top-0 z-50`.
- Clone: `SiteHeader` (`useState` + passive scroll listener, same transition).

## Hero slider — time-driven

- 2 slides, auto-advancing; the track is `display:flex` with
  `transform: translate3d(-N*100%, 0, 0)`.
- Dots bottom-right: active `w-6 bg-foreground`, inactive `w-1.5 bg-foreground/30`
  (hover `/50`), `transition-all duration-300`, hit area padded via
  `before:-inset-x-1 before:-inset-y-4`.
- Slide content enters with `sl-reveal-rise` (`0.6s both`; opacity 0→1,
  translateY 16px→0); disabled under `prefers-reduced-motion`.
- Typography and art placement are **container-query driven** (`.sl-frame` is
  `container: slide/size`); each slide carries `-s` / `-l` / `-p` variable sets
  selected by `min-aspect-ratio: 7/5` and `max-aspect-ratio: 5/7`.

## Top Selling — click-driven tabs

- Three tabs: `Featured`, `New Arrivals`, `On Sale`. **Confirmed by clicking
  each**: every tab returns a different 8-product set (they are not the same
  list). Captured sets are in `src/data/site.ts` (`topSellingBySlug`).
- Active pill: `bg-foreground text-background`; inactive:
  `text-muted-foreground hover:bg-muted/70 hover:text-foreground`.
- Rail: `grid-flow-col`, `snap-x snap-mandatory`, `auto-cols-[45%]` on mobile.

## Product card hover states

On hover-capable pointers (`[@media(hover:hover)]`) three things appear together
over 300ms:

| Element | Resting | Hovered |
| --- | --- | --- |
| Wishlist button (top-right) | `opacity: 0`, `pointer-events: none` | `opacity: 1`, interactive |
| Compare button (below it) | `opacity: 0`, `pointer-events: none` | `opacity: 1`, interactive |
| "Featured" badge (top-left) | `opacity: 0` | `opacity: 1` |
| Action bar (bottom, "Choose options" / "Quick view") | `opacity: 0`, `translate-y-2` | `opacity: 1`, `translate-y-0` |
| Product image | `scale(1)` | `scale(1.05)`, `duration-500` |
| Title | `text-foreground` | `text-primary` |

Discount (`-6%`) and `Pre-order` badges are always visible; "Featured" is not.
Whole card: `active:scale-[0.98]` on touch, suppressed on hover devices.

## Deals — time-driven countdown

- Four boxes (Days / Hours / Mins / Secs) tick every second; measured remaining
  at capture: 10d 21h 40m 27s. Panel gradient
  `linear-gradient(180deg, #181c75 0%, #512c75 100%)`.

## Product explorer — click filters + scroll pagination

- Eight category pills; clicking one refetches and swaps the grid (verified by
  clicking `All Items`, `Accessories`, `Appliances` → 10 / 6 / 3 results).
- Pagination is **scroll-driven, not a button**: `/api/products?page=2,3,…`
  fire as the grid bottom approaches the viewport. Clone uses an
  `IntersectionObserver` with `rootMargin: 200px 0px` over a static 59-product pool.

## Coupon strip

- Click-to-copy on the dashed code chip (`TECH15`); label swaps to a check.

## Rails (categories / vendors / articles / brands)

- Round arrow buttons scroll by ~80% of the rail width, `scroll-smooth`.
- Category arrows: `size-10 bg-muted text-foreground/50`, hidden below `sm`, and
  the leading arrow is `invisible` when the rail is at its start.
- Brand logos: `opacity-80 grayscale` → `opacity-100 grayscale-0` on hover.

## Responsive sweep

| Width | What changes |
| --- | --- |
| 1440 | Full hero mosaic (`cat a b / cat a c`), 5-up product rails, 4-col feature mosaic |
| 1024 | Hero keeps the category rail; feature mosaic `a b c e / a d d e` |
| 768 | Hero drops the category rail → `a b / a c`; promos lose their fixed aspect |
| 640 | Hero `a a / b c`; cards 2-up → 3-up; section titles step up to `--sec-title-lg` |
| 390 | Mobile header (search + location rows), chip category rail, fixed bottom tab bar, single-column stacks |
