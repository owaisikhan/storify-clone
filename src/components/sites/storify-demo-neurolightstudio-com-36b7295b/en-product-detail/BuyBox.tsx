"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Copy,
  Home,
  Mail,
  Minus,
  Plus,
  RotateCcw,
  Star,
  Truck,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Product, ProductDetail } from "@/types/storify";

/**
 * Right-hand column of the product detail page.
 *
 * INTERACTION MODEL: click-driven. Option pills pick a variant, which updates
 * the price/compare-at pair; the quantity stepper and the Overview/Product
 * Details/FAQ rows are local state. Add to Cart, Buy Now and the share links
 * are presentational — there is no cart or backend in this clone.
 */

function Collapsible({ label, body }: { label: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between py-4 text-left"
      >
        <span className="text-[15px] font-medium text-foreground">{label}</span>
        {open ? (
          <Minus className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Plus className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
      )}
    </div>
  );
}

const SHARE = [
  { label: "Share on Facebook", Icon: FacebookGlyph },
  { label: "Share on X", Icon: XGlyph },
  { label: "Share on WhatsApp", Icon: WhatsAppGlyph },
  { label: "Share via email", Icon: Mail },
  { label: "Copy link", Icon: Copy },
];

/** lucide v1 ships no brand marks, so these three are inlined from the target. */
function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12" />
    </svg>
  );
}
function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.9 2.6h3.3l-7.2 8.3 8.5 11.3h-6.6l-5.2-6.8-6 6.8H2.4l7.7-8.9L2 2.6h6.8l4.7 6.2zm-1.2 17.7h1.8L7.4 4.4H5.4z" />
    </svg>
  );
}
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-2.8.8.8-2.8-.2-.3A8.2 8.2 0 0 1 12 3.8m-3.1 4c-.2 0-.5 0-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.2 2.4.9 2.9.8 3.4.7.5 0 1.6-.6 1.8-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3l-1.9-.9c-.3-.1-.5-.2-.7.1l-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-.8-2c-.2-.5-.4-.4-.6-.4z" />
    </svg>
  );
}

export function BuyBox({
  product,
  detail,
  onImageChange,
}: {
  product: Product;
  detail: ProductDetail;
  onImageChange?: (index: number) => void;
}) {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      detail.options.map((o) => [o.name, o.values[0]?.value ?? ""]),
    ),
  );
  const [qty, setQty] = useState(1);

  // Match the variant whose option values all equal the current selection.
  const variant = useMemo(() => {
    if (!detail.variants.length) return null;
    return (
      detail.variants.find((v) =>
        v.values.every((ov) => selected[ov.option] === ov.value),
      ) ?? null
    );
  }, [detail.variants, selected]);

  const priceLabel = variant?.priceLabel ?? product.priceLabel;
  const compareLabel = variant?.compareLabel ?? product.compareLabel;
  const discount =
    variant?.comparePrice && variant.price
      ? Math.round(
          ((variant.comparePrice - variant.price) / variant.comparePrice) * 100,
        )
      : product.discount;
  const inStock = variant ? variant.stock > 0 : product.inStock;

  const pick = (option: string, value: string, valueIndex: number) => {
    setSelected((s) => ({ ...s, [option]: value }));
    // Colour choices swap the hero image on the target where art exists.
    if (/colou?r/i.test(option) && detail.images[valueIndex]) {
      onImageChange?.(valueIndex);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl lg:max-w-none">
      <div className="flex flex-col gap-2.5 pb-[18px]">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link href="/" aria-label="Home" className="transition-colors hover:text-foreground">
            <Home className="h-3.5 w-3.5" />
          </Link>
          {detail.categorySlug && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                href={`/en/categories/${detail.categorySlug}`}
                className="transition-colors hover:text-foreground"
              >
                {detail.category}
              </Link>
            </>
          )}
          {detail.brandSlug && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                href={`/en/brands/${detail.brandSlug}`}
                className="transition-colors hover:text-foreground"
              >
                {detail.brand}
              </Link>
            </>
          )}
        </nav>

        {detail.brandLogo && detail.brandSlug && (
          <Link
            href={`/en/brands/${detail.brandSlug}`}
            aria-label={detail.brand ?? "Brand"}
            className="flex h-12 w-fit items-center transition-opacity hover:opacity-80"
          >
            <span className="relative h-12 w-56 shrink-0">
              <Image
                src={detail.brandLogo}
                alt={detail.brand ?? ""}
                fill
                sizes="224px"
                className="object-contain object-left"
              />
            </span>
          </Link>
        )}

        <h1 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {product.name}
        </h1>

        {product.rating && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={cn(
                    "h-4 w-4",
                    n <= Math.round(Number(product.rating))
                      ? "fill-[#f59e0b] text-[#f59e0b]"
                      : "fill-muted text-muted",
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2.5 py-[18px]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {priceLabel}
          </span>
          {compareLabel && (
            <span className="text-base font-medium text-muted-foreground line-through">
              {compareLabel}
            </span>
          )}
          {discount ? (
            <span className="inline-flex items-center rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
              {discount}% OFF
            </span>
          ) : null}
          <span
            className={cn(
              "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold",
              inStock
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
                : "bg-muted text-muted-foreground",
            )}
          >
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {detail.options.length > 0 && (
        <div className="flex flex-col gap-2.5 border-t border-border py-[18px]">
          <div className="divide-y divide-border">
            {detail.options.map((option) => (
              <div
                key={option.name}
                className="flex flex-wrap items-center gap-x-4 gap-y-2.5 py-3.5 first:pt-0 last:pb-0 lg:justify-between lg:gap-3"
              >
                <span className="text-[15px] font-medium text-foreground">
                  {option.name}
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {option.values.map((v, i) => {
                    const on = selected[option.name] === v.value;
                    return (
                      <button
                        key={v.value}
                        type="button"
                        aria-pressed={on}
                        onClick={() => pick(option.name, v.value, i)}
                        className={cn(
                          "inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors",
                          on
                            ? v.colorCode
                              ? "border-foreground text-foreground"
                              : "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                        )}
                      >
                        {v.colorCode && (
                          <span
                            className="size-4 shrink-0 rounded-full ring-1 ring-black/10"
                            style={{ backgroundColor: v.colorCode }}
                          />
                        )}
                        {v.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 py-[18px]">
        <div className="flex h-12 items-center rounded-lg border border-border">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid size-11 cursor-pointer place-items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-semibold tabular-nums text-foreground">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="grid size-11 cursor-pointer place-items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          className="h-12 min-w-[180px] flex-1 cursor-pointer rounded-lg bg-[#1e2a36] text-sm font-semibold text-white transition-colors hover:bg-[#1e2a36]/90"
        >
          Add to Cart
        </button>
        <button
          type="button"
          className="h-12 min-w-[180px] flex-1 cursor-pointer rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Buy Now
        </button>
      </div>

      <div className="border-t border-border">
        <Collapsible
          label="Overview"
          body={detail.shortDescription || product.name}
        />
        <Collapsible
          label="Product Details"
          body={[
            detail.sku ? `SKU: ${detail.sku}` : null,
            detail.category ? `Category: ${detail.category}` : null,
            detail.brand ? `Brand: ${detail.brand}` : null,
            detail.vendor ? `Sold by ${detail.vendor}` : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        />
        <Collapsible
          label="FAQ"
          body="Questions about delivery, returns or warranty? Our support team replies within one business day."
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border">
        <p className="flex items-center gap-3 border-b border-border px-4 py-3.5 text-sm text-foreground">
          <Truck className="h-5 w-5 shrink-0 text-muted-foreground" />
          Standard delivery within 4–7 days
        </p>
        <p className="flex items-center gap-3 px-4 py-3.5 text-sm text-foreground">
          <RotateCcw className="h-5 w-5 shrink-0 text-muted-foreground" />
          Return within 30 days in original condition for a full refund
        </p>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-semibold text-foreground">Share</p>
        <div className="flex flex-wrap items-center gap-2.5">
          {SHARE.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="grid size-10 cursor-pointer place-items-center rounded-lg bg-muted text-foreground transition-colors hover:bg-muted/70"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
