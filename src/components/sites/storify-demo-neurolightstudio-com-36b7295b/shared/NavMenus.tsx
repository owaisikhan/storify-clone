"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";

import { categoryEntries } from "@/data/categories";
import { collectionEntries } from "@/data/collections";
import { cn } from "@/lib/utils";

/**
 * The header's two dropdowns, measured on the target at 1440×900.
 *
 * All Categories (the blue button): panel 303×419 anchored to the button's left
 * edge, radius 6px, z-50, rows `h-10 … rounded-lg px-3 text-[13.5px]` at 293×40,
 * the nine categories that carry products, then "View All Categories". Its rows
 * link to /en/products?category=<slug>, not to the category pages.
 *
 * Collections (hover on the nav link): panel 750×213 flush under the nav, white,
 * `rounded-t-none rounded-b-md border-0 p-3`, shadow 0 18px 40px
 * rgba(15,23,42,0.12), a `grid gap-1` of 239×72 tiles
 * (`flex items-center gap-3 rounded-lg p-2 hover:bg-muted`) plus "View All".
 *
 * Both open on hover and close on pointer-leave, Escape, or outside click.
 */

/** the target lists only categories that have products in this menu */
const MENU_CATEGORY_SLUGS = [
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

function useDismiss(open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);
}

export function CategoriesMenu() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useDismiss(open, () => setOpen(false));

  const rows = MENU_CATEGORY_SLUGS.map((slug) =>
    categoryEntries.find((c) => c.slug === slug),
  ).filter((c): c is (typeof categoryEntries)[number] => Boolean(c));

  const cancel = () => timer.current && clearTimeout(timer.current);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancel();
        setOpen(true);
      }}
      onMouseLeave={() => {
        cancel();
        timer.current = setTimeout(() => setOpen(false), 140);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-full cursor-pointer items-center gap-3 px-5 text-left transition-opacity hover:opacity-90"
      >
        <Menu className="h-5 w-5" />
        <span className="min-w-0 flex-1 truncate font-semibold">
          All Categories
        </span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-[calc(100%+2px)] z-50 w-[303px] overflow-hidden rounded-md border border-border bg-background p-[5px] text-foreground shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
        >
          {rows.map((c) => (
            <Link
              key={c.slug}
              role="menuitem"
              href={`/en/products?category=${c.slug}`}
              onClick={() => setOpen(false)}
              className="flex h-10 items-center justify-between gap-2 rounded-lg px-3 text-[13.5px] text-foreground transition-colors hover:bg-muted"
            >
              {c.label}
              <ChevronRight className="h-4 w-4 opacity-40" />
            </Link>
          ))}
          <Link
            role="menuitem"
            href="/en/categories"
            onClick={() => setOpen(false)}
            className="mt-1 flex h-10 items-center rounded-lg border-t border-border px-3 text-[13.5px] font-semibold text-primary transition-colors hover:bg-muted"
          >
            View All Categories
          </Link>
        </div>
      )}
    </div>
  );
}

export function CollectionsMenu() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useDismiss(open, () => setOpen(false));

  const cancel = () => timer.current && clearTimeout(timer.current);

  return (
    <div
      className="static"
      onMouseEnter={() => {
        cancel();
        setOpen(true);
      }}
      onMouseLeave={() => {
        cancel();
        timer.current = setTimeout(() => setOpen(false), 140);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-1 whitespace-nowrap transition-opacity hover:opacity-70"
      >
        Collections
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-50 w-[min(92vw,750px)] -translate-x-1/2 rounded-b-md border-0 bg-background p-3 text-foreground shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
        >
          <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {collectionEntries.map((c) => (
              <Link
                key={c.slug}
                role="menuitem"
                href={`/en/collections/${c.slug}`}
                onClick={() => setOpen(false)}
                className="group/tile flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
              >
                <span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={c.cover}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {c.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {c.products.length} products
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <Link
            role="menuitem"
            href="/en/collections"
            onClick={() => setOpen(false)}
            className="mt-1 flex h-10 items-center justify-center gap-1.5 rounded-lg border-t border-border text-sm font-semibold text-primary transition-colors hover:bg-muted"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
