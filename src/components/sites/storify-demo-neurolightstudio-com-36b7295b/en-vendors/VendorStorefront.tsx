"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  Star,
  Store,
  Truck,
} from "lucide-react";

import { ProductCard } from "../shared/ProductCard";
import { RailArrows } from "../shared/RailControls";
import { cn } from "@/lib/utils";
import type { Product, VendorStore } from "@/types/storify";

/**
 * /en/vendors/[slug] — a single store.
 *
 * Measured on the target: a 1408×192 cover, a 90px logo overlapping it, the
 * store name, description and the location / ships chips, Follow + Share on the
 * right, then the Products · About · Shipping & returns · Reviews tabs with a
 * "Store information" sidebar (BASED IN + Copy) and the product grid, and
 * finally a "Similar products from other stores" rail.
 *
 * Follow is local state only and the sidebar's Location/radius control is left
 * out — there is no geo data behind it here, the same call as on /en/products.
 */

type Tab = "products" | "about" | "shipping" | "reviews";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price Low - High" },
  { value: "price-desc", label: "Price High - Low" },
  { value: "name", label: "Name A - Z" },
] as const;

type Sort = (typeof SORTS)[number]["value"];

const sortPrice = (p: Product, dir: 1 | -1) =>
  p.price === null ? Infinity * dir : p.price;

export function VendorStorefront({
  vendor,
  products,
  similar,
}: {
  vendor: VendorStore;
  products: Product[];
  similar: Product[];
}) {
  const [tab, setTab] = useState<Tab>("products");
  const [following, setFollowing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sort, setSort] = useState<Sort>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const railRef = useRef<HTMLDivElement>(null);

  const allCategories = useMemo(
    () =>
      [...new Set(products.map((p) => p.category).filter((c): c is string => Boolean(c)))],
    [products],
  );

  const shown = useMemo(() => {
    const list = categories.length
      ? products.filter((p) => p.category && categories.includes(p.category))
      : products;
    const copy = [...list];
    if (sort === "price-asc") copy.sort((a, b) => sortPrice(a, 1) - sortPrice(b, 1));
    if (sort === "price-desc") copy.sort((a, b) => sortPrice(b, -1) - sortPrice(a, -1));
    if (sort === "name") copy.sort((a, b) => a.name.localeCompare(b.name));
    return copy;
  }, [products, categories, sort]);

  const copyLocation = async () => {
    try {
      await navigator.clipboard.writeText(vendor.location);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TABS: { value: Tab; label: string; badge?: number }[] = [
    { value: "products", label: "Products", badge: products.length },
    { value: "about", label: "About" },
    { value: "shipping", label: "Shipping & returns" },
    { value: "reviews", label: "Reviews" },
  ];

  return (
    <>
      <div className="container mx-auto px-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 py-5 text-sm text-muted-foreground"
        >
          <Link href="/en" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>›</span>
          <span className="text-foreground">{vendor.name}</span>
        </nav>

        <div className="relative h-[192px] w-full overflow-hidden rounded-xl bg-muted">
          {vendor.cover && (
            <Image
              src={vendor.cover}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="relative -mt-9 flex flex-wrap items-start gap-4 px-2">
          <span className="relative grid size-[90px] shrink-0 place-items-center overflow-hidden rounded-2xl border-4 border-background bg-muted text-xl font-bold text-muted-foreground">
            {vendor.logo ? (
              <Image
                src={vendor.logo}
                alt={vendor.name}
                fill
                sizes="90px"
                className="object-contain p-2"
              />
            ) : (
              vendor.name.charAt(0).toUpperCase()
            )}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 max-w-3xl">
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {vendor.name}
            </h1>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {vendor.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {vendor.rating && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs text-foreground">
                  <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                  <span className="font-semibold tabular-nums">{vendor.rating}</span>
                  <span className="text-muted-foreground">
                    ({vendor.reviewCount} reviews) · {vendor.sold} sold
                  </span>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {vendor.location}
              </span>
              {vendor.shipsLabel && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                  <Truck className="h-3.5 w-3.5" />
                  {vendor.shipsLabel}
                </span>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-pressed={following}
              onClick={() => setFollowing((v) => !v)}
              className={cn(
                "inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors",
                following
                  ? "border border-border text-foreground hover:bg-muted"
                  : "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              <Heart
                className={cn("h-4 w-4", following && "fill-current text-primary")}
              />
              {following ? "Following" : "Follow"}
            </button>
            <button
              type="button"
              aria-label="Message store"
              className="grid size-10 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={copyLocation}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              aria-current={tab === t.value}
              onClick={() => setTab(t.value)}
              className={cn(
                "-mb-px flex cursor-pointer items-center gap-2 border-b-2 pb-3 text-sm transition-colors",
                tab === t.value
                  ? "border-primary font-semibold text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
              {t.badge ? (
                <span className="rounded-full bg-muted px-1.5 text-[11px] tabular-nums text-muted-foreground">
                  {t.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6">
            <div>
              <p className="text-sm font-bold text-foreground">
                Store information
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                Based in
              </p>
              <p className="mt-1 text-sm text-foreground">{vendor.location}</p>
              <button
                type="button"
                onClick={copyLocation}
                className="mt-3 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {allCategories.length > 0 && (
              <div className="border-t border-border pt-5">
                <p className="text-sm font-bold text-foreground">Categories</p>
                <div className="mt-3 space-y-2">
                  {allCategories.map((c) => (
                    <label
                      key={c}
                      className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground"
                    >
                      <input
                        type="checkbox"
                        checked={categories.includes(c)}
                        onChange={() =>
                          setCategories((list) =>
                            list.includes(c)
                              ? list.filter((x) => x !== c)
                              : [...list, c],
                          )
                        }
                        className="size-4 cursor-pointer accent-primary"
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <div className="min-w-0">
            {tab === "products" && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">
                    {shown.length} products in this store
                  </p>
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
                      <div className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-lg border border-border bg-background shadow-lg">
                        {SORTS.map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => {
                              setSort(s.value);
                              setSortOpen(false);
                            }}
                            className={cn(
                              "block w-full cursor-pointer px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                              sort === s.value
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
                </div>

                {shown.length > 0 ? (
                  <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {shown.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                ) : (
                  <p className="mt-10 rounded-xl border border-border py-16 text-center text-sm text-muted-foreground">
                    This store has no products listed yet.
                  </p>
                )}
              </>
            )}

            {tab === "about" && (
              <div className="max-w-2xl space-y-4">
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {vendor.description}
                </p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Store className="h-4 w-4" />
                  {vendor.name} sells {products.length} product
                  {products.length === 1 ? "" : "s"} on Storify from{" "}
                  {vendor.location}.
                </p>
              </div>
            )}

            {tab === "shipping" && (
              <div className="max-w-2xl space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  {vendor.shipsLabel
                    ? `${vendor.shipsLabel} from ${vendor.location}.`
                    : `Orders ship from ${vendor.location}.`}
                </p>
                <p>
                  Return within 30 days in original condition for a full refund.
                  Start a return from your order page.
                </p>
              </div>
            )}

            {tab === "reviews" && (
              <p className="rounded-xl border border-border py-16 text-center text-sm text-muted-foreground">
                {vendor.reviewCount > 0
                  ? `${vendor.reviewCount} review${vendor.reviewCount === 1 ? "" : "s"} — the reviews feed isn't wired up yet.`
                  : "No reviews for this store yet."}
              </p>
            )}
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="container mx-auto border-t border-border px-4 py-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Similar products from other stores
            </h2>
            <RailArrows targetRef={railRef} />
          </div>
          <div
            ref={railRef}
            className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
          >
            {similar.map((p) => (
              <div
                key={p.id}
                className="w-[calc(50%-0.75rem)] shrink-0 snap-start lg:w-[calc(25%-1.125rem)]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
