"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { categoryEntries } from "@/data/categories";
import { aiIcon } from "@/data/site";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Header search, measured on the target at 1440×900.
 *
 * Typing calls its API as `?search=<q>&limit=6` and drops a suggestion panel:
 * `absolute top-full z-50 mt-2 overflow-hidden rounded-2xl border bg-background
 * shadow-lg left-0 right-0` at 746×355, rows 728×56 carrying a thumbnail and
 * linking straight to the product, with a footer line
 * `Press Enter to view all results for "<q>"`.
 *
 * The "All Categories" chip opens a 240×279 scope menu (radius 6px, z-50)
 * listing All Categories plus the nine categories that carry products.
 *
 * Enter navigates to /en/products?search=<q> — the scope is appended as
 * &category=<slug> so the products page opens filtered both ways.
 *
 * The catalogue is a local snapshot here, so the same query runs in memory
 * instead of over the network; the limit of six and the ordering by name match.
 */

const SCOPE_SLUGS = [
  "accessories",
  "appliances",
  "cameras-smart-home",
  "gaming",
  "laptops-tablets-pc",
  "mobile-phones",
  "pc-parts",
  "tv-audio",
  "wearable-technology",
];

const LIMIT = 6;

export function SearchBox({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  const scopes = useMemo(
    () =>
      SCOPE_SLUGS.map((slug) => categoryEntries.find((c) => c.slug === slug)).filter(
        (c): c is (typeof categoryEntries)[number] => Boolean(c),
      ),
    [],
  );
  const scopeLabel =
    scopes.find((s) => s.slug === scope)?.label ?? "All Categories";

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => {
        if (scope && p.categorySlug !== scope) return false;
        return p.name.toLowerCase().includes(q);
      })
      .slice(0, LIMIT);
  }, [query, scope]);

  // close both popovers on outside click or Escape
  useEffect(() => {
    if (!open && !scopeOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) {
        setOpen(false);
        setScopeOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setScopeOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, scopeOpen]);

  const submit = () => {
    const q = query.trim();
    if (!q) return;
    const params = new URLSearchParams({ search: q });
    if (scope) params.set("category", scope);
    setOpen(false);
    router.push(`/en/products?${params.toString()}`);
  };

  const suggestions = open && query.trim().length > 0;

  return (
    <div ref={wrapper} className="relative min-w-0 flex-1">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        role="search"
      >
        {variant === "desktop" ? (
          <div
            className="flex items-center gap-2 pl-4 pr-1.5"
            style={{
              height: "44px",
              borderRadius: "10px",
              border: "1px solid #f3f3f3",
              backgroundColor: "#F3F3F3",
              color: "#111827",
            }}
          >
            <input
              type="search"
              role="combobox"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              aria-label="Search products"
              aria-expanded={suggestions}
              aria-controls={listId}
              placeholder="Search products..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-80"
              style={{ fontWeight: 400, color: "#111827" }}
            />
            <div className="relative flex shrink-0 items-center border-l border-current/20 pl-2">
              <button
                type="button"
                aria-label={`Categories: ${scopeLabel}`}
                aria-expanded={scopeOpen}
                onClick={() => {
                  setScopeOpen((v) => !v);
                  setOpen(false);
                }}
                className="flex max-w-36 cursor-pointer items-center gap-1 rounded-sm px-1 py-1 text-xs font-medium opacity-80 outline-none"
              >
                <span className="truncate">{scopeLabel}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {scopeOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+10px)] z-50 max-h-[279px] w-60 overflow-y-auto rounded-md border border-border bg-background p-1 text-foreground shadow-md"
                >
                  {[{ slug: null, label: "All Categories" }, ...scopes].map((s) => (
                    <button
                      key={s.slug ?? "all"}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setScope(s.slug);
                        setScopeOpen(false);
                      }}
                      className={cn(
                        "flex h-9 w-full cursor-pointer items-center rounded-sm px-2 text-left text-sm transition-colors hover:bg-muted",
                        (s.slug ?? null) === scope
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              aria-label="Search products..."
              className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full transition-opacity hover:opacity-70"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              aria-label="Search products"
              placeholder="Search products..."
              className="h-10 w-full rounded-full border border-[#dddddd] bg-transparent pl-11 pr-12 text-sm outline-none placeholder:opacity-70 dark:border-white/15"
            />
            <button
              type="button"
              aria-label="AI search"
              className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-fuchsia-500 transition-colors hover:text-fuchsia-600"
            >
              <Image src={aiIcon} alt="" width={24} height={24} />
            </button>
          </div>
        )}
      </form>

      {suggestions && (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-lg"
        >
          {matches.length > 0 ? (
            <>
              <ul className="max-h-[300px] overflow-y-auto py-1">
                {matches.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={p.href}
                      role="option"
                      aria-selected={false}
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                      }}
                      className="flex h-14 items-center gap-3 px-3 transition-colors hover:bg-muted"
                    >
                      <span className="relative size-10 shrink-0 overflow-hidden rounded-md bg-[#f3f4f6] dark:bg-muted">
                        {p.image && (
                          <Image
                            src={p.image}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-contain p-1"
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                        {p.name}
                      </span>
                      <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                        {p.priceLabel}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={submit}
                className="w-full cursor-pointer border-t border-border px-4 py-3 text-left text-xs text-muted-foreground transition-colors hover:bg-muted"
              >
                Press Enter to view all results for &quot;{query.trim()}&quot;
              </button>
            </>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">
              No products match &quot;{query.trim()}&quot;
              {scope ? ` in ${scopeLabel}` : ""}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
