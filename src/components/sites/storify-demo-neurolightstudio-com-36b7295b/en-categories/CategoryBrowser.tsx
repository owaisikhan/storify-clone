"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Product } from "@/types/storify";

import { ProductCard } from "../shared/ProductCard";
import { PRICE_CEILING, PRICE_FLOOR } from "../en-products-4839c489/FilterPanel";

/**
 * /en/categories/[slug] — "Shop by <Category>".
 *
 * The target's sidebar here is narrower than the one on /en/products: no
 * Categories block (the page is already scoped) and no Collections — just
 * Availability, Price and Brands, over a grid with a Sort by menu. Price bounds
 * and the money format come from the products page's FilterPanel so the two
 * pages agree.
 *
 * As on /en/products, the Location/radius control is left out: there is no geo
 * data behind it in this clone.
 */

const SORTS = [
  "Most Popular",
  "Best Rating",
  "Newest",
  "Price Low - High",
  "Price High - Low",
] as const;

type Sort = (typeof SORTS)[number];

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const sortPrice = (p: Product, dir: 1 | -1) =>
  p.price === null ? Infinity * dir : p.price;

export function CategoryBrowser({ products }: { products: Product[] }) {
  const [availability, setAvailability] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [min, setMin] = useState(PRICE_FLOOR);
  const [max, setMax] = useState(PRICE_CEILING);
  const [sort, setSort] = useState<Sort>("Most Popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const allBrands = useMemo(
    () =>
      [...new Set(products.map((p) => p.brand).filter((b): b is string => Boolean(b)))].sort(),
    [products],
  );

  const priceCap = useMemo(
    () => Math.max(...products.map((p) => p.price ?? 0), PRICE_FLOOR),
    [products],
  );

  const shown = useMemo(() => {
    const list = products.filter((p) => {
      if (availability.length) {
        const label = p.inStock ? "In Stock" : "Out of Stock";
        if (!availability.includes(label)) return false;
      }
      if (brands.length && (!p.brand || !brands.includes(p.brand))) return false;
      if (p.price !== null && (p.price < min || p.price > max)) return false;
      return true;
    });
    const copy = [...list];
    if (sort === "Price Low - High") copy.sort((a, b) => sortPrice(a, 1) - sortPrice(b, 1));
    if (sort === "Price High - Low") copy.sort((a, b) => sortPrice(b, -1) - sortPrice(a, -1));
    if (sort === "Best Rating")
      copy.sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
    if (sort === "Newest")
      copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return copy;
  }, [products, availability, brands, min, max, sort]);

  const toggle = (
    value: string,
    list: string[],
    set: (next: string[]) => void,
  ) => set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const sidebar = (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold text-foreground">Availability</p>
        <div className="mt-3 space-y-2">
          {["In Stock", "Out of Stock"].map((label) => (
            <label
              key={label}
              className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
            >
              <input
                type="checkbox"
                checked={availability.includes(label)}
                onChange={() => toggle(label, availability, setAvailability)}
                className="size-4 cursor-pointer accent-primary"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-5">
        <p className="text-sm font-bold text-foreground">Price</p>
        <div className="mt-3 flex items-center gap-2">
          <label className="flex h-10 flex-1 items-center gap-1 rounded-lg border border-border px-2 text-sm">
            <span className="text-muted-foreground">$</span>
            <input
              type="number"
              aria-label="Minimum price"
              value={min}
              min={PRICE_FLOOR}
              onChange={(e) => setMin(Number(e.target.value) || PRICE_FLOOR)}
              className="w-full min-w-0 bg-transparent outline-none"
            />
          </label>
          <label className="flex h-10 flex-1 items-center gap-1 rounded-lg border border-border px-2 text-sm">
            <span className="text-muted-foreground">$</span>
            <input
              type="number"
              aria-label="Maximum price"
              value={max}
              onChange={(e) => setMax(Number(e.target.value) || PRICE_CEILING)}
              className="w-full min-w-0 bg-transparent outline-none"
            />
          </label>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Price: {money(PRICE_FLOOR)} - {money(priceCap)}
        </p>
      </div>

      {allBrands.length > 0 && (
        <div className="border-t border-border pt-5">
          <p className="text-sm font-bold text-foreground">Brands</p>
          <div className="mt-3 space-y-2">
            {allBrands.map((b) => (
              <label
                key={b}
                className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
              >
                <input
                  type="checkbox"
                  checked={brands.includes(b)}
                  onChange={() => toggle(b, brands, setBrands)}
                  className="size-4 cursor-pointer accent-primary"
                />
                {b}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">{sidebar}</aside>

      <div className="min-w-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-foreground lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <p className="text-sm text-muted-foreground">
              {shown.length} product{shown.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((v) => !v)}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Sort by
              <ChevronDown className="h-4 w-4" />
            </button>
            {sortOpen && (
              <div className="absolute right-0 z-20 mt-1 w-52 overflow-hidden rounded-lg border border-border bg-background shadow-lg">
                {SORTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSort(s);
                      setSortOpen(false);
                    }}
                    className={cn(
                      "block w-full cursor-pointer px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                      sort === s
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {shown.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {shown.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-border py-16 text-center text-sm text-muted-foreground">
            No products match these filters.
          </p>
        )}
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-label="Filters"
            className="absolute inset-y-0 left-0 w-[min(88vw,320px)] overflow-y-auto bg-background p-5 shadow-lg"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="text-base font-semibold text-foreground">Filters</p>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
                className="cursor-pointer rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}
    </div>
  );
}
