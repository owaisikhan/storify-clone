export interface ProductColor {
  name: string;
  code: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  href: string;
  category: string | null;
  categorySlug: string | null;
  vendor: string | null;
  brand: string | null;
  brandSlug: string | null;
  /** true when stock remains (or backorders are allowed) */
  inStock: boolean;
  image: string | null;
  images: string[];
  /** null when the product is "Price on request" */
  price: number | null;
  priceLabel: string;
  comparePrice: number | null;
  compareLabel: string | null;
  /** percentage off, e.g. 6 renders as "-6%" */
  discount: number | null;
  colors: ProductColor[];
  colorLabel: string | null;
  rating: string | null;
  reviewCount: number;
  preorder: boolean;
  /** e.g. "Ships Sep 15" — preorder items only */
  shipsLabel: string | null;
  /** e.g. "797 left" — preorder items only */
  leftLabel: string | null;
  featured: boolean;
  stock: number;
  priceOnRequest: boolean;
  cta: string;
  createdAt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface CategoryItem {
  label: string;
  href: string;
  image: string;
}

export interface BrandLogo {
  name: string;
  image: string;
}

export interface HeroSlide {
  title: string;
  subtitle?: string;
  cta: string;
  href: string;
  image: string;
  /** full CSS background value captured from the live slide */
  background: string;
}

export interface PromoTile {
  title: string;
  cta: string;
  href: string;
  image: string;
  background: string;
  textClassName?: string;
}

export interface FeatureTile {
  area: "a" | "b" | "c" | "d" | "e";
  image: string;
  alt: string;
  href: string;
}

export interface DealCard {
  title: string;
  href: string;
  image: string;
  price: string;
  oldPrice: string | null;
  discount: string | null;
}

export interface FeaturedDeal extends DealCard {
  category: string;
  gallery: string[];
  save: string;
}

export interface Vendor {
  name: string;
  href: string;
  description: string;
  cover: string;
  logo: string;
  rating: string;
  sold: string;
  priceTier: string;
}

export interface Article {
  title: string;
  href: string;
  image: string;
  excerpt: string;
  author: string;
  avatar: string | null;
  date: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface ProductOptionValue {
  value: string;
  colorCode: string | null;
}

export interface ProductOption {
  name: string;
  visual: string | null;
  values: ProductOptionValue[];
}

export interface ProductVariant {
  name: string;
  price: number | null;
  priceLabel: string | null;
  comparePrice: number | null;
  compareLabel: string | null;
  stock: number;
  values: { option: string; value: string }[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

/** Everything the detail page needs beyond the shared Product record. */
export interface ProductDetail {
  /** rich-text body as served by the site (static snapshot, rendered as HTML) */
  description: string;
  shortDescription: string;
  images: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  specs: ProductSpec[];
  sku: string | null;
  category: string | null;
  categorySlug: string | null;
  brand: string | null;
  brandSlug: string | null;
  brandLogo: string | null;
  vendor: string | null;
  vendorSlug: string | null;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** the badge on the card / article header; the oldest post carries none */
  category: string | null;
  author: string;
  /** null when the target falls back to an initial avatar */
  authorAvatar: string | null;
  date: string;
  readTime: string;
  comments: number;
  image: string;
  imageAlt: string | null;
  tags: string[];
  /** slugs the target links under "Related articles" */
  related: string[];
  /** the site's own rich-text markup for the post body */
  body: string;
}
