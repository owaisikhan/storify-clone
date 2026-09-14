# Visual QA — /en/products/[slug]

Reference: Xiaomi Pad 8 Pro.

| Check | Original | Clone |
| --- | --- | --- |
| Page height | 4921px | 4246px (difference ≈ the skipped Reviews block, 475px) |
| Title | Xiaomi Pad 8 Pro | ✅ |
| Price row | $850.00 · $900.00 · 6% OFF · In Stock | ✅ |
| Option pills | Black/Blue/Green · 12/128GB · 12/256GB · 12/512GB | ✅ all six |
| Thumbnails | 3 | ✅ 3 |
| Description paragraphs | rich text | ✅ 13 paragraphs + subheads |
| Related | You May Also Like | ✅ |
| Broken images | — | 0 |
| Mobile overflow | — | none (390/390) |

## Interactions verified

- Variant switch: `12/512GB` → price moves **$850.00 → $1,000.00** ✅
- Colour switch keeps the matching variant price and swaps the hero image ✅
- Overview collapsible opens ✅
- Route behaviour: prerendered slug 200, on-demand slug (`galaxy-watch9`) 200,
  unknown slug 404 ✅

## Gallery behaviour — verified against the target

| Check | Target | Clone |
| --- | --- | --- |
| Cursor over image | `zoom-in` | ✅ `zoom-in` |
| Hover scale | 680px → 697px (×1.025) | ✅ 676px → 692.9px (×1.025) |
| Zoom toggle aria | "Enable image zoom" ↔ "Disable image zoom" | ✅ |
| Zoomed scale | `scale-[1.9]` | ✅ |
| Origin @ pointer 25%,25% | `2.5% 2.35%` | ✅ `2.5% 2.5%` |
| Origin @ pointer 75%,70% | `97.5% 87.8623%` | ✅ `97.5% 87.8623%` |
| Click image | opens fullscreen viewer | ✅ |
| Viewer buttons | Close / Previous / Next / Open fullscreen image 1-4 | ✅ same 7 |
| Body scroll lock | `overflow: hidden` | ✅, restored on close |
| Keyboard | arrows page, Escape closes | ✅ |

## Known differences

- **Reviews section absent** — deferred by request.
- Height is shorter than the original by roughly the Reviews block.
- Specifications tab appears only for products with attributes (11 of 59), which
  matches the target's behaviour.
