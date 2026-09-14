import { products } from "./products";
import type { Product, VendorStore } from "@/types/storify";

/**
 * Vendor stores, captured from the target's /en/vendors and each store page.
 * Cover/logo art is the same set already downloaded for the homepage rail;
 * "lee jhon moda" has neither on the target and falls back to its initial.
 *
 * The target's own product counts disagree with its catalogue in places (it
 * shows "1 products" for Pixel Forge, which lists two), so counts here are
 * derived from our snapshot instead of being copied.
 */
export const vendorStores: VendorStore[] = [
  {
    slug: "lee-jhon-moda",
    name: "lee jhon moda",
    description: "test hello tesrt tes tes tes",
    cover: null,
    logo: null,
    location: "los angeles",
    shipsLabel: null,
    rating: null,
    reviewCount: 0,
    sold: 0,
  },
  {
    slug: "smart-haven-electronics",
    name: "Smart Haven Electronics",
    description:
      "Smart Haven Electronics brings practical smart-home devices, wearable technology and entertainment electronics together in one convenient store.",
    cover: "/images/banner-c45661.webp",
    logo: "/images/logo-f8e685.webp",
    location: "Chicago, United States",
    shipsLabel: null,
    rating: null,
    reviewCount: 0,
    sold: 0,
  },
  {
    slug: "sonic-circuit-audio",
    name: "Sonic Circuit Audio",
    description:
      "Sonic Circuit Audio supplies quality headphones, speakers, microphones and home audio equipment for music, gaming and professional use.",
    cover: "/images/banner-bc0ca8.webp",
    logo: "/images/logo-00e5dc.webp",
    location: "Austin, United States",
    shipsLabel: "Ships in 2–5 days",
    rating: null,
    reviewCount: 0,
    sold: 0,
  },
  {
    slug: "pixel-forge-computing",
    name: "Pixel Forge Computing",
    description:
      "Pixel Forge Computing provides laptops, desktop components, gaming accessories and reliable computing equipment for work and entertainment.",
    cover: "/images/banner-ce6783.webp",
    logo: "/images/logo-04c399.webp",
    location: "San Francisco, United States",
    shipsLabel: null,
    rating: "5.0",
    reviewCount: 1,
    sold: 1,
  },
  {
    slug: "nova-mobile-hub",
    name: "Nova Mobile Hub",
    description:
      "Nova Mobile Hub offers the latest smartphones, tablets, mobile accessories and dependable charging solutions from popular technology brands.",
    cover: "/images/banner-84de0d.webp",
    logo: "/images/profile-358e53.webp",
    location: "New York, United States",
    shipsLabel: null,
    rating: null,
    reviewCount: 0,
    sold: 0,
  },
];

export const getVendor = (slug: string) =>
  vendorStores.find((v) => v.slug === slug) ?? null;

export const vendorProducts = (vendor: VendorStore): Product[] =>
  products.filter((p) => p.vendor === vendor.name);

/** Same category, but sold by anyone else — the target's "Similar products". */
export const similarFromOtherStores = (
  vendor: VendorStore,
  limit = 8,
): Product[] => {
  const categories = new Set(
    vendorProducts(vendor)
      .map((p) => p.category)
      .filter((c): c is string => Boolean(c)),
  );
  return products
    .filter((p) => p.vendor !== vendor.name && p.category && categories.has(p.category))
    .slice(0, limit);
};
