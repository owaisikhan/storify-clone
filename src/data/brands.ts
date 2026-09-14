import { products } from "./products";
import type { Product } from "@/types/storify";

/**
 * The 13 brands the target lists on /en/brands. Seven logos already existed
 * from the homepage brand strip; the other six were pulled into
 * public/images/brands/. Two brands (Anker, Apple) carry a description on the
 * target where the rest show only a product count.
 *
 * Counts are derived from our catalogue via brandSlug rather than copied.
 */
export interface BrandEntry {
  slug: string;
  name: string;
  description: string | null;
  logo: string;
}

export const brandEntries: BrandEntry[] = [
  {
    "slug": "acer",
    "name": "Acer",
    "description": null,
    "logo": "/images/brands/acer.webp"
  },
  {
    "slug": "anker",
    "name": "Anker",
    "description": "Anker is a trusted global brand specializing in high-quality electronic accessories, including chargers, power banks, and cables. Renowned for reliability and innovation, Anker delivers products designed to enhance connectivity and convenience for everyday users and tech enthusiasts alike.",
    "logo": "/images/anker-9579-c39919.webp"
  },
  {
    "slug": "apple",
    "name": "Apple",
    "description": "Apple is a global leader in technology, renowned for its innovative products and seamless user experience. The brand offers premium devices including iPhones, MacBooks, and services designed to empower and inspire users worldwide.",
    "logo": "/images/apple-6176-b3717a.webp"
  },
  {
    "slug": "dell",
    "name": "Dell",
    "description": null,
    "logo": "/images/brands/dell.webp"
  },
  {
    "slug": "google",
    "name": "Google",
    "description": null,
    "logo": "/images/google-4283-89cd28.webp"
  },
  {
    "slug": "intel",
    "name": "Intel",
    "description": null,
    "logo": "/images/intel-01-1053-7be61f.webp"
  },
  {
    "slug": "jbl",
    "name": "JBL",
    "description": null,
    "logo": "/images/brands/jbl.webp"
  },
  {
    "slug": "lenevo",
    "name": "Lenevo",
    "description": null,
    "logo": "/images/brands/lenevo.webp"
  },
  {
    "slug": "oneplus",
    "name": "Oneplus",
    "description": null,
    "logo": "/images/brands/oneplus.webp"
  },
  {
    "slug": "samsung",
    "name": "Samsung",
    "description": null,
    "logo": "/images/samsung-4680-509500.webp"
  },
  {
    "slug": "sony",
    "name": "Sony",
    "description": null,
    "logo": "/images/sony-3098-c3e091.webp"
  },
  {
    "slug": "xbox",
    "name": "Xbox",
    "description": null,
    "logo": "/images/brands/xbox.webp"
  },
  {
    "slug": "xioami",
    "name": "Xioami",
    "description": null,
    "logo": "/images/xiaomi-1934-49986e.webp"
  }
];

export const getBrand = (slug: string) =>
  brandEntries.find((b) => b.slug === slug) ?? null;

export const brandProducts = (slug: string): Product[] =>
  products.filter((p) => p.brandSlug === slug);
