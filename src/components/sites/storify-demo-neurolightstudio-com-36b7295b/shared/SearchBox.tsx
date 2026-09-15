"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search } from "lucide-react";

import { categoryEntries } from "@/data/categories";
import { aiIcon } from "@/data/site";
import { products } from "@/data/products";

/**
 * Header search, measured on the target at 1440×900.
 *
 * Typing calls its API as `?search=<q>&limit=6` and drops a suggestion panel:
 * `absolute top-full z-50 mt-2 overflow-hidden rounded-2xl border bg-background
 * shadow-lg left-0 right-0` at 746×355, rows 728×56 carrying a thumbnail and
 * linking straight to the product, with a footer line
 * `Press Enter to view all results for "<q>"`.
 *
 * The "All Categories" chip opens a 240×279 menu (radius 6px, z-50) listing
 * All Categories plus the nine categories that carry products — verified live
 * against the target: clicking an item navigates straight to
 * /en/categories/<slug> (or /en/categories for "All Categories") regardless
 * of what's typed in the search box, and the chip's own label never changes
 * from "All Categories". It's a category-navigation shortcut parked next to
 * the search input, not a search scope — there is no combined
 * "search within category" state to carry into the query.
 *
 * Enter navigates to /en/products?search=<q>.
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

/**
 * The desktop search sits inside the header's `min-h-0 overflow-hidden` collapse
 * wrapper, which clips any popover rendered inside it to the 64px row. Both
 * panels are therefore portalled to the body and positioned from the trigger's
 * rect, re-measured on scroll and resize.
 */
function useAnchor(ref: React.RefObject<HTMLElement | null>, open: boolean) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const measure = () => setRect(ref.current?.getBoundingClientRect() ?? null);
    const raf = requestAnimationFrame(measure);
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
    };
  }, [open, ref]);

  return rect;
}

function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}


export function SearchBox({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLButtonElement>(null);

  const scopes = useMemo(
    () =>
      SCOPE_SLUGS.map((slug) => categoryEntries.find((c) => c.slug === slug)).filter(
        (c): c is (typeof categoryEntries)[number] => Boolean(c),
      ),
    [],
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, LIMIT);
  }, [query]);

  // close both popovers on outside click or Escape
  useEffect(() => {
    if (!open && !scopeOpen) return;
    const onDown = (e: MouseEvent) => {
      const node = e.target as HTMLElement | null;
      if (node?.closest("[data-searchbox-panel]")) return;
      if (!wrapper.current?.contains(node)) {
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
    setOpen(false);
    router.push(`/en/products?${new URLSearchParams({ search: q }).toString()}`);
  };

  const suggestions = open && query.trim().length > 0;
  const fieldRect = useAnchor(fieldRef, suggestions);
  const chipRect = useAnchor(chipRef, scopeOpen);

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
            ref={fieldRef}
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
                ref={chipRef}
                type="button"
                aria-label="Browse categories"
                aria-expanded={scopeOpen}
                onClick={() => {
                  setScopeOpen((v) => !v);
                  setOpen(false);
                }}
                className="flex max-w-36 cursor-pointer items-center gap-1 rounded-sm px-1 py-1 text-xs font-medium opacity-80 outline-none"
              >
                <span className="truncate">All Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {scopeOpen && chipRect && (
                <Portal>
                <div
                  role="menu"
                  data-searchbox-panel=""
                  style={{
                    position: "fixed",
                    top: chipRect.bottom + 10,
                    left: Math.max(8, chipRect.right - 240),
                    width: 240,
                  }}
                  className="z-[100] max-h-[279px] overflow-y-auto rounded-md border border-border bg-background p-1 text-foreground shadow-md"
                >
                  {[{ slug: null, label: "All Categories" }, ...scopes].map((s) => (
                    <button
                      key={s.slug ?? "all"}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setScopeOpen(false);
                        router.push(s.slug ? `/en/categories/${s.slug}` : "/en/categories");
                      }}
                      className="flex h-9 w-full cursor-pointer items-center rounded-sm px-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                </Portal>
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
          <div ref={fieldRef} className="relative">
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

      {suggestions && fieldRect && (
        <Portal>
        <div
          id={listId}
          role="listbox"
          data-searchbox-panel=""
          style={{
            position: "fixed",
            top: fieldRect.bottom + 8,
            left: fieldRect.left,
            width: fieldRect.width,
          }}
          className="z-[100] overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-lg"
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
              No products match &quot;{query.trim()}&quot;.
            </p>
          )}
        </div>
        </Portal>
      )}
    </div>
  );
}
