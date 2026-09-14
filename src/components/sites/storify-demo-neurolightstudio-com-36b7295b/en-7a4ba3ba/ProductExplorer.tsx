"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

import { explorerFilters, explorerHeading } from "@/data/site";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

import { ProductCard } from "../shared/ProductCard";

const PAGE_SIZE = 10;

/**
 * "Find your favorite products." — filter pills over a product grid.
 *
 * INTERACTION MODEL: click-driven filters + scroll-driven pagination. The
 * target renders 10 cards, then appends the next page when the sentinel below
 * the grid enters the viewport (its /api/products calls fire at page 2, 3, …).
 * Grid: grid-cols-2 gap-x-3 gap-y-7 → 3 at sm → 5 at lg.
 */
export function ProductExplorer() {
  const [filter, setFilter] = useState(explorerFilters[0]);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (filter === "All Items") return products;
    return products.filter((product) => product.category === filter);
  }, [filter]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible((count) => Math.min(count + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [filtered.length]);

  return (
    <section className="py-6 lg:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-[length:var(--sec-title,1.125rem)] font-bold tracking-tight text-foreground sm:text-[length:var(--sec-title-lg,1.5rem)]">
          {explorerHeading}
        </h2>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-8 sm:gap-4">
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-button border border-border bg-background px-3.5 text-xs font-semibold text-foreground"
            >
              <span className="max-w-36 truncate">{filter}</span>
              <ChevronDown className="h-3.5 w-3.5 transition-transform" />
            </button>
            <button
              type="button"
              className="inline-flex h-8 shrink-0 items-center rounded-md border border-border bg-background px-3.5 text-xs font-semibold text-foreground shadow-xs"
            >
              <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
              Filter
              <ChevronDown className="ml-1.5 h-3.5 w-3.5" />
            </button>
          </div>

          <div className="hidden flex-wrap items-center gap-2 sm:flex sm:gap-3">
            {explorerFilters.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setFilter(name);
                  setVisible(PAGE_SIZE);
                }}
                className={cn(
                  "rounded-button px-5 py-2 text-sm font-semibold transition",
                  name === filter
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-7 transition-opacity sm:mt-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-10">
          {filtered.slice(0, visible).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No products in this category.
          </p>
        )}

        <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
      </div>
    </section>
  );
}
