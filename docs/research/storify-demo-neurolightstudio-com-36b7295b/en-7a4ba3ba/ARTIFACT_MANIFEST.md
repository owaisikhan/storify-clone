# Artifact Manifest

## Assets

| Bucket | Count | Location |
| --- | --- | --- |
| Images downloaded from the target (WebP/PNG/SVG) | 227 files, ~21 MB | `public/images/` |
| Logo | 1 (`logo-bc6d62.svg`) | `public/images/` |
| Favicon | 1 | `public/favicon.ico` |
| Videos | 0 — the page uses none | — |
| Generated / substituted assets | **0** — every asset is the original file | — |

`asset-manifest.json` maps each original remote URL to its local path.

Sources:
- `https://pub-49808a4ecaf04280b0561965cf5a40a4.r2.dev/uploads/**` — product,
  category, vendor, blog and marketing imagery.
- `https://storify-demo.neurolightstudio.com/templates/electronics/*.png` —
  three editorial mosaic tiles.
- `https://storify-demo.neurolightstudio.com/AI Icon.png` — mobile AI-search glyph.

No Atlas Cloud fallback was used or needed.

## Research files

| File | What it is |
| --- | --- |
| `PAGE_TOPOLOGY.md` | section map, output plan, mobile deltas |
| `DESIGN_TOKENS.md` | colours, geometry, typography, per-section gradients |
| `BEHAVIORS.md` | scroll / click / hover / responsive sweep results |
| `COMPONENT_INVENTORY.md` | component list + ProductCard anatomy |
| `TECH_STACK_ANALYSIS.md` | target stack vs. clone stack |
| `VISUAL_QA.md` | side-by-side diff results |
| `sections.json` | measured top/height for every section (desktop) |
| `data2.json`, `rails.json` | raw DOM extraction (content, computed styles) |
| `asset-manifest.json` | remote URL → local path for every downloaded asset |

Screenshots live in
`docs/design-references/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/`
(full-page desktop + mobile, and one crop per section).

## Extraction method

Chrome MCP was not available in this environment, so extraction ran through
**Playwright driving the pre-installed Chromium**. Chromium could not complete
`CONNECT` through the session's egress proxy, so every browser request was
fulfilled via Playwright request interception backed by `curl` — which does go
through the proxy, so all traffic remained subject to the same egress policy.
The extraction scripts are in the session scratchpad, not committed.
