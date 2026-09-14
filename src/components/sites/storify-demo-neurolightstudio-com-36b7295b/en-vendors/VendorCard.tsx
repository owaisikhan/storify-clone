import Image from "next/image";
import Link from "next/link";
import { Star, Store } from "lucide-react";

import type { VendorStore } from "@/types/storify";

/**
 * Vendor card on /en/vendors: cover strip, then a logo + name row with the
 * rating (only where the store has one) and the product count, then the
 * description clamped to two lines.
 *
 * Stores with no art — "lee jhon moda" on the target — get a muted panel with a
 * store glyph and an initial avatar instead.
 */
export function VendorCard({
  vendor,
  productCount,
}: {
  vendor: VendorStore;
  productCount: number;
}) {
  return (
    <Link
      href={`/en/vendors/${vendor.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
    >
      <span className="relative block aspect-[16/9] w-full overflow-hidden bg-muted">
        {vendor.cover ? (
          <Image
            src={vendor.cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="grid h-full w-full place-items-center text-muted-foreground">
            <Store className="h-8 w-8" />
          </span>
        )}
      </span>

      <span className="flex flex-col gap-3 p-4">
        <span className="flex items-center gap-3">
          <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-sm font-semibold text-muted-foreground ring-1 ring-border">
            {vendor.logo ? (
              <Image
                src={vendor.logo}
                alt={vendor.name}
                fill
                sizes="40px"
                className="object-contain p-1"
              />
            ) : (
              <Store className="h-4 w-4" />
            )}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-bold text-foreground transition-colors group-hover:text-primary">
              {vendor.name}
            </span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              {vendor.rating && (
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
                  <span className="tabular-nums">{vendor.rating}</span>
                  <span>({vendor.reviewCount})</span>
                </span>
              )}
              <span className="tabular-nums">{productCount} products</span>
            </span>
          </span>
        </span>

        <span className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {vendor.description}
        </span>
      </span>
    </Link>
  );
}
