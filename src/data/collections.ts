import { products } from "./products";
import type { Product } from "@/types/storify";

/**
 * The five collections the target curates, with the exact membership read off
 * each collection page. Covers were downloaded into public/images/collections/.
 * Only "Smart Watches" carries a description on the target.
 *
 * Counts come from these lists rather than the target's badges: its "Premium
 * Tech" badge says 13 while the page itself lists 12.
 */
export interface CollectionEntry {
  slug: string;
  name: string;
  description: string | null;
  cover: string;
  /** product slugs, in the order the target lists them */
  products: string[];
}

export const collectionEntries: CollectionEntry[] = [
  {
    "slug": "desk-setup-essentials",
    "name": "Desk Setup Essentials",
    "description": null,
    "cover": "/images/collections/desk-setup-essentials.webp",
    "products": [
      "ipad-mini-7",
      "acer-nitro-lite-nl-16-71g-578s-intel-i5-13420h-nvidia-rtx-3050-with-6gb-graphics-16-gaming-laptop",
      "macbook-pro-m5-14-inch-24gb1tb-10-core-cpu-10-core-gpu",
      "hp-victus-15-fa2104tx-intel-core-i7-13620h-nvidia-geforce-rtx-4050-with-6gb-graphics-156-fhd-gaming",
      "macbook-air-m5-15-inch"
    ]
  },
  {
    "slug": "smart-watches",
    "name": "Smart Watches",
    "description": "Discover our premium Smart Watches collection, thoughtfully curated to offer a wide range of features including health monitoring, seamless smartphone integration, customizable watch faces, and durable designs.",
    "cover": "/images/collections/smart-watches.webp",
    "products": [
      "google-pixel-watch",
      "galaxy-watch9",
      "huawei-watch-fit-2-active",
      "apple-watch-ultra-2-with-ocean-band-gps-cellular",
      "cmf-by-nothing-watch-pro-2-bt-calling-smart-watch",
      "galaxy-watch7",
      "apple-watch-se-3"
    ]
  },
  {
    "slug": "headphones-audio",
    "name": "Headphones & Audio",
    "description": null,
    "cover": "/images/collections/headphones-audio.webp",
    "products": [
      "beats-solo-4-wireless-headphones",
      "skullcandy-slyr-wired-overear-gaming-headphone",
      "amazon-echo-dot-max-smart-speaker",
      "anker-soundcore-liberty-5-anc-tws-earbuds",
      "airpods-pro-3",
      "jbl-flip-7-portable-wireless-speaker",
      "anker-soundcore-space-q45-noise-cancelling-headphones"
    ]
  },
  {
    "slug": "premium-tech",
    "name": "Premium Tech",
    "description": null,
    "cover": "/images/collections/premium-tech.webp",
    "products": [
      "ipad-mini-7",
      "dji-air-3s-fly-more-combo-with-dji-rc-2-remote-controller",
      "xiaomi-pad-8-pro",
      "galaxy-s25-5g",
      "macbook-pro-m5-14-inch-24gb1tb-10-core-cpu-10-core-gpu",
      "ipad-pro-m5-2025",
      "macbook-air-m5-15-inch",
      "poco-f8-ultra-5g",
      "sony-playstation-5-slim-gaming-console",
      "iphone-17",
      "iphone-16-pro-max",
      "iphone-17-pro-max"
    ]
  },
  {
    "slug": "iphone-lineup",
    "name": "iPhone Lineup",
    "description": null,
    "cover": "/images/collections/iphone-lineup.webp",
    "products": [
      "iphone-15",
      "iphone-17",
      "iphone-16-pro-max",
      "iphone-17-pro-max",
      "ipad-air-m4-2026"
    ]
  }
];

export const getCollection = (slug: string) =>
  collectionEntries.find((c) => c.slug === slug) ?? null;

export const collectionProducts = (entry: CollectionEntry): Product[] =>
  entry.products
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
