import Image from "next/image";
import Link from "next/link";
import { Heart, Maximize2, Scale, ShoppingCart, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Product } from "@/types/storify";

/**
 * Product card as rendered by the target site.
 * Exact values from getComputedStyle / inline styles on the live markup:
 *   anchor gap 22px · media+badge stack gap 6px · media radius 6px,
 *   aspect-ratio 8/9, bg #f3f4f6, inner padding 14px
 *   title 13px/tight semibold (sm:14px) · colour label 12px muted (sm:13px)
 *   price 18px bold tabular-nums · compare-at 11px muted line-through (sm:14px)
 */
export function ProductCard({ product }: { product: Product }) {
  const hoverActions = product.priceOnRequest ? 1 : 2;

  return (
    <Link
      href={product.href}
      className="group flex flex-col self-start transition-transform active:scale-[0.98] [@media(hover:hover)]:active:scale-100"
      style={{ gap: "22px" }}
    >
      <div className="flex flex-col" style={{ gap: "6px" }}>
        <div
          className="relative overflow-hidden ring-1 ring-black/5 bg-[#f3f4f6] dark:bg-zinc-800/50 dark:ring-white/10"
          style={{ borderRadius: "6px", aspectRatio: "8 / 9" }}
        >
          <div className="absolute inset-0" style={{ padding: "14px" }}>
            <div className="relative h-full w-full">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 32vw, 25vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : null}
            </div>
          </div>

          {(product.preorder || product.discount || product.featured) && (
            <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
              {product.preorder ? (
                <span className="inline-flex items-center rounded-full bg-blue-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                  Pre-order
                </span>
              ) : product.discount ? (
                <span className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs font-semibold text-destructive shadow-sm ring-1 ring-black/5 dark:bg-muted dark:font-bold dark:text-red-400 dark:ring-white/10">
                  -{product.discount}%
                </span>
              ) : null}
              {product.featured && (
                <div className="flex flex-col items-start gap-1.5 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
                  <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-sm">
                    Featured
                  </span>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            aria-label="Add to wishlist"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground shadow-sm backdrop-blur transition-all duration-300 hover:bg-background hover:text-foreground active:scale-90 sm:right-3 sm:top-3 sm:h-10 sm:w-10 [@media(hover:hover)]:pointer-events-none [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:pointer-events-auto [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:pointer-events-auto [@media(hover:hover)]:group-focus-within:opacity-100"
          >
            <Heart className="h-3.5 w-3.5 transition-all sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            aria-label="Add to comparison"
            className="absolute right-2 top-11 flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground shadow-sm backdrop-blur transition-all duration-300 hover:bg-background hover:text-foreground active:scale-90 sm:right-3 sm:top-16 sm:h-10 sm:w-10 [@media(hover:hover)]:pointer-events-none [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:pointer-events-auto [@media(hover:hover)]:group-hover:opacity-100"
          >
            <Scale className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
          </button>

          <div
            className={cn(
              "absolute inset-x-2 bottom-2 hidden translate-y-2 gap-1.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:hover)]:grid",
              hoverActions === 2 ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {!product.priceOnRequest && (
              <span className="flex h-8 min-w-0 items-center justify-center gap-1 rounded-full bg-foreground px-2 text-[11px] font-semibold leading-none text-background shadow-lg transition-colors hover:bg-foreground/90">
                {product.cta === "Add to Cart" ? (
                  <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
                ) : null}
                <span className="min-w-0 truncate whitespace-nowrap">
                  {product.cta}
                </span>
              </span>
            )}
            <span className="flex h-8 min-w-0 items-center justify-center gap-1 rounded-full border border-border/60 bg-background/95 px-2 text-[11px] font-semibold leading-none text-foreground shadow-lg transition-colors hover:bg-background">
              <Maximize2 className="h-3.5 w-3.5 shrink-0" />
              <span className="min-w-0 truncate whitespace-nowrap">
                Quick view
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col" style={{ gap: "6px" }}>
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1 px-0.5">
            {product.colors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="h-4 w-4 rounded-full border-0 transition-transform hover:scale-110"
                style={{ backgroundColor: color.code }}
              />
            ))}
          </div>
        )}

        <div className="space-y-1 px-0.5">
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-tight text-foreground transition-colors group-hover:text-primary group-focus-within:text-primary sm:text-sm">
            {product.name}
          </h3>
          {product.colorLabel && (
            <p className="text-xs capitalize leading-snug text-muted-foreground sm:text-[13px]">
              {product.colorLabel}
            </p>
          )}
        </div>

        <div className="@container flex items-center justify-between gap-2 px-0.5 pt-1">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span
              className="whitespace-nowrap text-xs font-bold leading-snug tabular-nums text-foreground sm:text-sm"
              style={{ fontSize: "18px" }}
            >
              {product.priceLabel}
            </span>
            {product.compareLabel && (
              <span className="whitespace-nowrap text-[11px] text-muted-foreground line-through sm:text-sm">
                {product.compareLabel}
              </span>
            )}
          </div>
          {product.rating && (
            <div
              className="hidden shrink-0 items-center gap-1 text-sm text-muted-foreground @min-[215px]:flex"
              title={`${product.rating} (${product.reviewCount} reviews)`}
            >
              <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
              <span className="tabular-nums">{product.rating}</span>
            </div>
          )}
        </div>

        {product.preorder && product.shipsLabel && (
          <p className="px-0.5 text-[11px] font-medium text-primary sm:text-xs">
            {product.shipsLabel}
            {product.leftLabel ? (
              <>
                <span className="mx-1 text-muted-foreground">/</span>
                {product.leftLabel}
              </>
            ) : null}
          </p>
        )}
      </div>

      {product.priceOnRequest && (
        <div className="mt-auto flex flex-col" style={{ gap: "6px" }}>
          <span
            className="flex h-10 w-full items-center justify-center gap-1.5 text-xs font-semibold text-foreground transition-colors group-hover:border-foreground/25"
            style={{
              borderRadius: "6px",
              backgroundColor: "transparent",
              border: "1px solid var(--border)",
              fontSize: "12px",
            }}
          >
            <span className="min-w-0 truncate whitespace-nowrap">
              {product.cta}
            </span>
          </span>
        </div>
      )}
    </Link>
  );
}
