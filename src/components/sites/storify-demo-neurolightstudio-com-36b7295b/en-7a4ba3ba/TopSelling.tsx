"use client";

import { useMemo, useRef, useState } from "react";

import { topSellingBySlug, topSellingTabs } from "@/data/site";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

import { ProductCard } from "./ProductCard";
import { RailArrows } from "./RailControls";

/**
 * "Top Selling" — pill tabs over a horizontal product rail.
 *
 * INTERACTION MODEL: click-driven. Each tab swaps the rail contents; the
 * active pill is bg-foreground/text-background, inactive pills are muted.
 * Rail: snap-x snap-mandatory, grid-flow-col, auto-cols 45% (mobile) →
 * 25% at lg, gap 12px (sm 16px).
 */
export function TopSelling() {
  const [tab, setTab] = useState<string>(topSellingTabs[0]);
  const railRef = useRef<HTMLDivElement>(null);

  const bySlug = useMemo(
    () => new Map(products.map((product) => [product.slug, product])),
    [],
  );

  const items = useMemo(
    () =>
      (topSellingBySlug[tab] ?? [])
        .map((slug) => bySlug.get(slug))
        .filter((product) => product !== undefined),
    [tab, bySlug],
  );

  return (
    <section className="py-5 lg:py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-[length:var(--sec-title,22px)] font-bold tracking-[-0.03em] sm:text-[length:var(--sec-title-lg,28px)]">
          <span className="text-foreground/35">Top</span>{" "}
          <span className="bg-gradient-to-r from-foreground to-foreground/35 bg-clip-text text-transparent">
            Selling
          </span>
        </h2>

        <div className="mt-5 flex items-center justify-between gap-3 sm:mt-8">
          <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
            {topSellingTabs.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setTab(name)}
                className={cn(
                  "rounded-button px-5 py-2 text-sm font-semibold transition",
                  name === tab
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {name}
              </button>
            ))}
          </div>
          <RailArrows targetRef={railRef} />
        </div>

        <div
          ref={railRef}
          className="mt-6 grid auto-cols-[45%] grid-flow-col snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 scroll-smooth pb-2 no-scrollbar sm:auto-cols-[32%] sm:gap-4 lg:auto-cols-[calc((100%-4*1rem)/5)]"
        >
          {items.map((product) => (
            <div key={product.id} className="snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
