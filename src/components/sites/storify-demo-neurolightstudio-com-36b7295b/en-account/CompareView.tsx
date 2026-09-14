"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Scale, Search, X } from "lucide-react";

import { products } from "@/data/products";

import { PolicyShell } from "../en-policy/PolicyShell";
import { COMPARE_MAX, useCompare } from "./CompareProvider";

/**
 * /en/compare — "Compare Products".
 *
 * The target's empty state reads "Nothing to compare yet / Search above to add
 * products — up to four at a time", so the search and the four-slot limit are
 * real here: picking products fills a comparison table drawn from the catalogue
 * snapshot.
 */
export function CompareView() {
  const { slugs: picked, toggle, remove, clear, full } = useCompare();
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => p.name.toLowerCase().includes(q) && !picked.includes(p.slug))
      .slice(0, 6);
  }, [query, picked]);

  const chosen = picked
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is (typeof products)[number] => Boolean(p));

  const ROWS: { label: string; value: (p: (typeof products)[number]) => string }[] = [
    { label: "Price", value: (p) => p.priceLabel },
    { label: "Compare at", value: (p) => p.compareLabel ?? "—" },
    { label: "Brand", value: (p) => p.brand ?? "—" },
    { label: "Category", value: (p) => p.category ?? "—" },
    { label: "Vendor", value: (p) => p.vendor ?? "—" },
    { label: "Rating", value: (p) => (p.rating ? `${p.rating} (${p.reviewCount})` : "—") },
    { label: "Availability", value: (p) => (p.inStock ? "In Stock" : "Out of Stock") },
  ];

  return (
    <PolicyShell title="Compare Products">
      <div className="relative mt-6 max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products to compare"
          disabled={full}
          className="h-11 w-full rounded-lg border border-border bg-transparent pl-9 pr-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
        {matches.length > 0 && (
          <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-border bg-background shadow-lg">
            {matches.map((m) => (
              <li key={m.slug}>
                <button
                  type="button"
                  onClick={() => {
                    toggle(m.slug);
                    setQuery("");
                  }}
                  className="block w-full cursor-pointer px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                >
                  {m.name}
                </button>
              </li>
            ))}
          </ul>
        )}
        {full && (
          <p className="mt-2 text-xs text-muted-foreground">
            Four products is the maximum — remove one to add another.
          </p>
        )}
      </div>

      {chosen.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <Scale className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium text-foreground">
            Nothing to compare yet
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Search above to add products — up to four at a time.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Comparing {chosen.length} of {COMPARE_MAX}
            </p>
            <button
              type="button"
              onClick={clear}
              className="cursor-pointer text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Clear all
            </button>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-32 border-b border-border p-3 text-left align-bottom text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Product
                </th>
                {chosen.map((p) => (
                  <th key={p.slug} className="border-b border-border p-3 text-left align-bottom">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={p.href} className="min-w-0">
                        <span className="relative mb-2 block aspect-square w-full max-w-[140px] overflow-hidden rounded-lg bg-[#f3f4f6] dark:bg-muted">
                          {p.image && (
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="140px"
                              className="object-contain p-2"
                            />
                          )}
                        </span>
                        <span className="line-clamp-2 text-sm font-semibold text-foreground">
                          {p.name}
                        </span>
                      </Link>
                      <button
                        type="button"
                        aria-label={`Remove ${p.name} from comparison`}
                        onClick={() => remove(p.slug)}
                        className="shrink-0 cursor-pointer rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <th className="border-b border-border p-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {row.label}
                  </th>
                  {chosen.map((p) => (
                    <td
                      key={p.slug}
                      className="border-b border-border p-3 text-foreground"
                    >
                      {row.value(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </PolicyShell>
  );
}
