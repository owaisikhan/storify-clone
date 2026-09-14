"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Product } from "@/types/storify";

import { ProductCard } from "../shared/ProductCard";

/**
 * Brand page grid. The target's toolbar here is minimal — "N product(s)" on the
 * left and a "Sort by:" select on the right, no sidebar — so this is a lighter
 * component than the category browser.
 */

const SORTS = [
  "Featured",
  "Price Low - High",
  "Price High - Low",
  "Name A - Z",
] as const;

type Sort = (typeof SORTS)[number];

const sortPrice = (p: Product, dir: 1 | -1) =>
  p.price === null ? Infinity * dir : p.price;

export function BrandProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("Featured");
  const [open, setOpen] = useState(false);

  const shown = useMemo(() => {
    const copy = [...products];
    if (sort === "Price Low - High") copy.sort((a, b) => sortPrice(a, 1) - sortPrice(b, 1));
    if (sort === "Price High - Low") copy.sort((a, b) => sortPrice(b, -1) - sortPrice(a, -1));
    if (sort === "Name A - Z") copy.sort((a, b) => a.name.localeCompare(b.name));
    return copy;
  }, [products, sort]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 py-5">
        <p className="text-sm text-muted-foreground">
          {shown.length} product{shown.length === 1 ? "" : "s"}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="relative">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-44 cursor-pointer items-center justify-between rounded-lg border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {sort}
              <ChevronDown className="h-4 w-4 opacity-60" />
            </button>
            {open && (
              <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-border bg-background shadow-lg">
                {SORTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSort(s);
                      setOpen(false);
                    }}
                    className={cn(
                      "block w-full cursor-pointer px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted",
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
      </div>

      {shown.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-border py-16 text-center text-sm text-muted-foreground">
          No products from this brand yet.
        </p>
      )}
    </>
  );
}
