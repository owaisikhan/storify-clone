"use client";

import { useState } from "react";

import type { Product, ProductDetail } from "@/types/storify";

import { BuyBox } from "./BuyBox";
import { ProductGallery } from "./ProductGallery";

/**
 * Holds the gallery's active image so a colour pick in the buy box can swap
 * the hero shot, the way the target does.
 */
export function ProductDetailView({
  product,
  detail,
}: {
  product: Product;
  detail: ProductDetail;
}) {
  const [active, setActive] = useState(0);
  const images = detail.images.length
    ? detail.images
    : product.image
      ? [product.image]
      : [];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      <ProductGallery
        images={images}
        alt={product.name}
        discount={product.discount}
        active={Math.min(active, Math.max(0, images.length - 1))}
        onActiveChange={setActive}
      />
      <BuyBox product={product} detail={detail} onImageChange={setActive} />
    </div>
  );
}
