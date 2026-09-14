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
