"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Heart, Star } from "lucide-react";

import { vendors, vendorsHeading } from "@/data/site";

import { RailArrows } from "./RailControls";

/**
 * "Top Vendors" — cover image with the vendor logo overlapping its bottom-left,
 * name + truncated blurb, a 3-cell stat strip (RATING / SOLD / PRICE) and a
 * full-width "Go to Shop" button.
 */
export function TopVendors() {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-5 lg:py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[length:var(--sec-title,1.125rem)] font-bold tracking-tight text-foreground sm:text-[length:var(--sec-title-lg,1.5rem)]">
            {vendorsHeading}
          </h2>
          <RailArrows targetRef={railRef} />
        </div>

        <div
          ref={railRef}
          className="mt-4 flex gap-3 overflow-x-auto scroll-smooth pb-2 no-scrollbar sm:mt-8 sm:gap-5"
        >
          {vendors.map((vendor) => (
            <article
              key={vendor.href}
              className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card sm:w-[330px]"
            >
              <div className="relative">
                <div className="relative m-2 h-[150px] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={vendor.cover}
                    alt=""
                    fill
                    sizes="330px"
                    className="object-cover"
                  />
                </div>
                <span className="absolute -bottom-4 left-3 grid h-12 w-12 place-items-center overflow-hidden rounded-full border-2 border-background bg-background">
                  <Image
                    src={vendor.logo}
                    alt={`${vendor.name} logo`}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4 pt-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-[15px] font-bold text-foreground">
                      <Link href={vendor.href} className="hover:text-primary">
                        {vendor.name}
                      </Link>
                    </h3>
                    <p className="truncate text-xs text-muted-foreground">
                      {vendor.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Add ${vendor.name} to wishlist`}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 divide-x divide-border rounded-lg bg-muted/60">
                  <div className="flex flex-col items-center gap-0.5 py-2">
                    <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                      <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                      {vendor.rating}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Rating
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 py-2">
                    <span className="text-sm font-semibold text-foreground">
                      {vendor.sold}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Sold
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 py-2">
                    <span className="text-sm font-semibold text-foreground">
                      {vendor.priceTier}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Price
                    </span>
                  </div>
                </div>

                <Link
                  href={vendor.href}
                  className="mt-auto inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#1e2a36] text-sm font-semibold text-white transition-colors hover:bg-[#1e2a36]/90"
                >
                  Go to Shop
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
