import { products } from "./products";
import type { Product } from "@/types/storify";

/**
 * All 15 categories the target lists on /en/categories (12 on page one, three
 * on page two). Nine reuse the artwork already downloaded for the homepage
 * rail; the other six were pulled into public/images/categories/.
 */
export interface CategoryEntry {
  slug: string;
  label: string;
  image: string;
}

export const categoryEntries: CategoryEntry[] = [
  {
    "slug": "accessories",
    "label": "Accessories",
    "image": "/images/chatgpt-image-aug-29-2026-05-26-03-pm-16bd80.webp"
  },
  {
    "slug": "appliances",
    "label": "Appliances",
    "image": "/images/chatgpt-image-aug-20-2026-11-54-56-am-443411.webp"
  },
  {
    "slug": "cameras-smart-home",
    "label": "Cameras & Smart Home",
    "image": "/images/chatgpt-image-aug-19-2026-11-12-01-am-63ada5.webp"
  },
  {
    "slug": "gaming",
    "label": "Gaming",
    "image": "/images/chatgpt-image-aug-20-2026-12-43-23-pm-883ba8.webp"
  },
  {
    "slug": "google",
    "label": "Google",
    "image": "/images/categories/google.webp"
  },
  {
    "slug": "iphone",
    "label": "Iphone",
    "image": "/images/categories/iphone.webp"
  },
  {
    "slug": "laptops-tablets-pc",
    "label": "Laptops. Tablets & PC",
    "image": "/images/chatgpt-image-aug-19-2026-04-49-49-pm-7fdcfb.webp"
  },
  {
    "slug": "mobile-phones",
    "label": "Mobile Phones",
    "image": "/images/chatgpt-image-aug-28-2026-08-44-21-am-4a0483.webp"
  },
  {
    "slug": "oneplus",
    "label": "Oneplus",
    "image": "/images/categories/oneplus.webp"
  },
  {
    "slug": "pc-parts",
    "label": "PC Parts",
    "image": "/images/chatgpt-image-aug-19-2026-01-01-29-pm-bab208.webp"
  },
  {
    "slug": "phones",
    "label": "Phones",
    "image": "/images/categories/phones.webp"
  },
  {
    "slug": "samsung",
    "label": "Samsung",
    "image": "/images/categories/samsung.webp"
  },
  {
    "slug": "tv-audio",
    "label": "TV & Audio",
    "image": "/images/chatgpt-image-aug-19-2026-09-56-38-pm-79b664.webp"
  },
  {
    "slug": "wearable-technology",
    "label": "Wearable Technology",
    "image": "/images/chatgpt-image-aug-20-2026-12-27-56-pm-b2a892.webp"
  },
  {
    "slug": "xiaomi",
    "label": "Xiaomi",
    "image": "/images/categories/xiaomi.webp"
  }
];

export const getCategory = (slug: string) =>
  categoryEntries.find((c) => c.slug === slug) ?? null;

/**
 * Parent → direct children, read off the target's own category tree
 * (GET /api/categories returns `parentId`/`children`/`path` per node).
 *
 * The catalogue files every product against one leaf category, so the parents
 * carry no products of their own: "Mobile Phones" has productCount 0 while its
 * descendants hold 12 between them. The target resolves a parent to all of its
 * descendants — /api/products?category=mobile-phones returns those 12 — so
 * anything filtering by category has to do the same, or the parent rows in the
 * header menu and the sidebar come back empty.
 */
const CATEGORY_CHILDREN: Record<string, string[]> = {
  "mobile-phones": ["phones"],
  phones: ["google", "iphone", "oneplus", "samsung", "xiaomi"],
};

/** A category's own slug plus every slug beneath it. */
export function categorySlugTree(slug: string): string[] {
  const out: string[] = [];
  const walk = (s: string) => {
    if (out.includes(s)) return;
    out.push(s);
    for (const child of CATEGORY_CHILDREN[s] ?? []) walk(child);
  };
  walk(slug);
  return out;
}

export const categoryProducts = (slug: string): Product[] => {
  const slugs = new Set(categorySlugTree(slug));
  return products.filter((p) => p.categorySlug !== null && slugs.has(p.categorySlug));
};
