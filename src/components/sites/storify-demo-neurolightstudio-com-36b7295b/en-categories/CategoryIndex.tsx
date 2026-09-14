"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Home, Search } from "lucide-react";

import { categoryEntries } from "@/data/categories";
import { cn } from "@/lib/utils";

/**
 * /en/categories — "All Categories".
 *
 * Measured on the target: breadcrumb, a two-tone centred heading, a search box
 * (38px tall with a 62px dark submit square), then a four-up grid of image
 * tiles with the label underneath, paginated 12 per page — 15 categories give
 * two pages, as on the target.
 *
 * The search filters the list live here; the target reloads with a query.
 */

const PAGE_SIZE = 12;

export function CategoryIndex() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? categoryEntries.filter((c) => c.label.toLowerCase().includes(q))
      : categoryEntries;
  }, [query]);

  const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const slice = matches.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="container mx-auto px-4 pb-16">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 py-5 text-sm text-muted-foreground"
      >
        <Link href="/en" className="transition-colors hover:text-foreground">
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Categories</span>
      </nav>

      <h1 className="text-center text-3xl font-bold tracking-tight md:text-[2.5rem]">
        <span className="text-muted-foreground">All </span>
        <span className="text-foreground">Categories</span>
      </h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto mt-6 flex h-[38px] w-full max-w-[730px] items-center gap-2 rounded-[10px] border border-border"
      >
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search categories..."
          aria-label="Search categories"
          className="h-[38px] min-w-0 flex-1 bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Search categories"
          className="grid h-[38px] w-[62px] shrink-0 cursor-pointer place-items-center rounded-[10px] bg-foreground text-background transition-opacity hover:opacity-85"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {slice.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {slice.map((c) => (
            <Link
              key={c.slug}
              href={`/en/categories/${c.slug}`}
              className="group flex flex-col gap-3"
            >
              <span className="relative block aspect-square w-full overflow-hidden rounded-xl bg-[#f3f4f6] dark:bg-muted">
                <Image
                  src={c.image}
                  alt={c.label}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 32vw, 24vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="text-base font-bold text-foreground transition-colors group-hover:text-primary">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No categories match “{query}”.
        </p>
      )}

      {pages > 1 && (
        <div className="mt-10 flex items-center justify-end gap-2 border-t border-border pt-6">
          <button
            type="button"
            aria-label="Previous page"
            disabled={current === 1}
            onClick={() => setPage(current - 1)}
            className="grid size-8 cursor-pointer place-items-center rounded-[10px] bg-muted text-foreground transition-colors hover:bg-muted/70 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              aria-current={n === current}
              onClick={() => setPage(n)}
              className={cn(
                "grid size-8 cursor-pointer place-items-center rounded-[10px] text-sm font-bold transition-colors",
                n === current
                  ? "bg-foreground text-background"
                  : "bg-muted text-foreground hover:bg-muted/70",
              )}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            disabled={current === pages}
            onClick={() => setPage(current + 1)}
            className="grid size-8 cursor-pointer place-items-center rounded-[10px] bg-muted text-foreground transition-colors hover:bg-muted/70 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
