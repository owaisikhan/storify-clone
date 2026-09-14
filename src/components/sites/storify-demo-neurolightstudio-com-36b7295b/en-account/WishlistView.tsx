"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { products } from "@/data/products";

import { PolicyShell } from "../en-policy/PolicyShell";
import { ProductCard } from "../shared/ProductCard";
import { useWishlist } from "./WishlistProvider";

/**
 * /en/account/wishlist. The target redirects here to sign-in; with no auth in
 * this clone the list is the browser-local one the product-card hearts write to.
 */
export function WishlistView() {
  const { slugs, clear } = useWishlist();
  const items = slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  return (
    <PolicyShell title="Wishlist">
      {items.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium text-foreground">
            Your wishlist is empty
          </p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Tap the heart on any product to save it here. The list lives in this
            browser — accounts arrive with the backend.
          </p>
          <Link
            href="/en/products"
            className="mt-6 inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {items.length} saved item{items.length === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              onClick={clear}
              className="cursor-pointer text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Clear wishlist
            </button>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </PolicyShell>
  );
}
