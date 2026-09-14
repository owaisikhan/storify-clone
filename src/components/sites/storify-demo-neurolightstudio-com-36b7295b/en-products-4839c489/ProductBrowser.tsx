"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { categoryEntries } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

import { ProductCard } from "../shared/ProductCard";
import {
  FilterPanel,
  PRICE_CEILING,
  PRICE_FLOOR,
  type FilterState,
} from "./FilterPanel";
import { Pagination } from "./Pagination";
import { ResultsToolbar, type Density, type SortOption } from "./ResultsToolbar";

const PAGE_SIZE = 32;

/** Category list shown in the sidebar, in the target's order. */
const CATEGORY_ORDER = [
  "Accessories",
  "Appliances",
  "Cameras & Smart Home",
  "Gaming",
  "Google",
  "Iphone",
  "Laptops. Tablets & PC",
  "Mobile Phones",
  "Oneplus",
  "PC Parts",
];

const BRAND_ORDER = ["Acer", "Anker", "Apple", "Google", "Samsung", "Sony", "Xioami"];

const EMPTY: FilterState = {
  categories: [],
  brands: [],
  availability: [],
  min: PRICE_FLOOR,
  max: PRICE_CEILING,
};

/**
 * /en/products — "Shop All Products".
 *
 * INTERACTION MODEL: click-driven. Sidebar checkboxes, the price range, the
 * sort menu and the density switcher all filter/reorder the grid client-side
 * over the captured 59-product pool; results paginate at 32 per page, matching
 * the target's "Showing 1 - 32 of 58 products".
 */
export function ProductBrowser() {
  // The header's All Categories menu links here as ?category=<slug>, the way
  // the target does, so the grid opens already filtered to that category.
  const params = useSearchParams();
  const initialCategory = categoryEntries.find(
    (c) => c.slug === params.get("category"),
  )?.label;
  // the header search lands here as ?search=<q>, as it does on the target
  const search = (params.get("search") ?? "").trim();

  const [filters, setFilters] = useState<FilterState>(
    initialCategory ? { ...EMPTY, categories: [initialCategory] } : EMPTY,
  );
  const [sort, setSort] = useState<SortOption>("Most Popular");
  const [density, setDensity] = useState<Density>(4);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const update = (next: FilterState) => {
    setFilters(next);
    setPage(1);
  };

  const results = useMemo(() => {
    // "Price on request" items have no price; keep them out of the price
    // comparison so they sort to the end rather than to the cheap end.
    const priceOf = (p: (typeof products)[number]) => p.price ?? 0;
    const sortPrice = (p: (typeof products)[number], dir: 1 | -1) =>
      p.price ?? (dir === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);

    const needle = search.toLowerCase();
    const filtered = products.filter((p) => {
      if (needle && !p.name.toLowerCase().includes(needle)) return false;
      if (filters.categories.length && !filters.categories.includes(p.category ?? ""))
        return false;
      if (filters.brands.length && !filters.brands.includes(p.brand ?? ""))
        return false;
      if (filters.availability.length === 1) {
        const wantInStock = filters.availability[0] === "In Stock";
        if (p.inStock !== wantInStock) return false;
      }
      const price = priceOf(p);
      if (price < filters.min || price > filters.max) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "Best Rating":
        sorted.sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
        break;
      case "Newest":
        sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "Price Low - High":
        sorted.sort((a, b) => sortPrice(a, 1) - sortPrice(b, 1));
        break;
      case "Price High - Low":
        sorted.sort((a, b) => sortPrice(b, -1) - sortPrice(a, -1));
        break;
      default:
        // "Most Popular" (the target's default, ?sortBy=popular) leads with the
        // rated products — 5.0s, then 4.0s — and keeps API order after that.
        sorted.sort(
          (a, b) =>
            Number(b.rating ?? 0) - Number(a.rating ?? 0) ||
            b.reviewCount - a.reviewCount,
        );
    }
    return sorted;
  }, [filters, sort, search]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PAGE_SIZE;
  const visible = results.slice(start, start + PAGE_SIZE);

  const featured = useMemo(
    () => products.filter((p) => p.featured && p.image).slice(0, 4),
    [],
  );

  const gridClass =
    density === 2
      ? "sm:grid-cols-2 lg:grid-cols-2"
      : density === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-3 lg:grid-cols-4";

  const panel = (
    <FilterPanel
      categories={CATEGORY_ORDER}
      brands={BRAND_ORDER}
      total={results.length}
      value={filters}
      onChange={update}
      featured={featured}
    />
  );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:sticky lg:top-[76px] lg:block lg:self-start">
        {panel}
      </aside>

      <div>
        <ResultsToolbar
          density={density}
          onDensityChange={setDensity}
          sort={sort}
          onSortChange={(s) => {
            setSort(s);
            setPage(1);
          }}
          onOpenFilters={() => setDrawerOpen(true)}
        />

        <div className={cn("grid grid-cols-2 gap-x-4 gap-y-10", gridClass)}>
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {results.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No products match these filters.
          </p>
        )}

        <Pagination
          page={current}
          pageCount={pageCount}
          from={start + 1}
          to={start + visible.length}
          total={results.length}
          onPageChange={(n) => {
            setPage(n);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>

      {/* mobile filter drawer — left sheet with a pinned "Show results" button */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setDrawerOpen(false)}
                className="grid size-8 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4">{panel}</div>
            <div className="border-t border-border p-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="h-12 w-full cursor-pointer rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
