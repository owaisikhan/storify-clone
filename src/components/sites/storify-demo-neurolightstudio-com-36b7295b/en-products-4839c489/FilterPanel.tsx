"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowRight, Check, Crosshair, MapPin, Minus, Plus, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Product } from "@/types/storify";

/**
 * Filter sidebar for /en/products.
 *
 * Structure copied from the live markup: a `divide-y divide-border/70` stack of
 * collapsible panels. Each panel header is a full-width button, `py-5`, with a
 * 15px/600 label at tracking -0.01em and a minus/plus glyph; bodies are `pb-6`.
 */

export interface FilterState {
  categories: string[];
  brands: string[];
  availability: string[];
  min: number;
  max: number;
}

export const PRICE_FLOOR = 0;
export const PRICE_CEILING = 4500;

function Panel({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between py-5"
      >
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
          {title}
        </span>
        {open ? (
          <Minus className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Plus className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  );
}

/** Checkbox styled like the target's shadcn checkbox (size-3.5, rounded-[3px]). */
function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={onToggle}
        className={cn(
          "grid size-3.5 shrink-0 place-items-center rounded-[3px] border border-muted-foreground/40 outline-none transition-shadow",
          checked && "border-foreground bg-foreground text-background",
        )}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </button>
      <span className="text-[13px] text-foreground/85">{label}</span>
    </label>
  );
}

export function FilterPanel({
  categories,
  brands,
  total,
  value,
  onChange,
  featured,
}: {
  categories: string[];
  brands: string[];
  total: number;
  value: FilterState;
  onChange: (next: FilterState) => void;
  featured: Product[];
}) {
  const toggle = (key: "categories" | "brands" | "availability", item: string) => {
    const list = value[key];
    onChange({
      ...value,
      [key]: list.includes(item)
        ? list.filter((x) => x !== item)
        : [...list, item],
    });
  };

  const money = (n: number) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="divide-y divide-border/70">
      <Panel title="Location">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate text-muted-foreground">All locations</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{total} products</p>
          <button
            type="button"
            className="inline-flex h-8 w-full cursor-pointer items-center justify-start gap-2 rounded-md border bg-background px-3 text-xs font-medium shadow-xs transition-all hover:bg-accent hover:text-accent-foreground"
          >
            <Crosshair className="h-4 w-4" />
            Use my current location
          </button>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              aria-label="Search city…"
              placeholder="Search city…"
              className="h-8 w-full min-w-0 rounded-md border border-input bg-transparent py-1 pl-7 pr-3 text-xs shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2 pt-1">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">Radius</span>
              <span className="text-xs font-semibold text-muted-foreground">
                Everywhere
              </span>
            </div>
            {/* Radius is disabled on the target until a location is chosen. */}
            <span className="relative flex w-full touch-none select-none items-center opacity-50">
              <span className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
                <span className="absolute inset-0 bg-muted-foreground/30" />
              </span>
              <span className="absolute right-0 block size-4 rounded-full border border-muted-foreground/40 bg-background shadow-sm" />
            </span>
            <div
              aria-hidden="true"
              className="flex justify-between px-0.5 text-[10px] text-muted-foreground"
            >
              {["5", "10", "20", "40", "60", "100", "Any"].map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">
              Use your current location to filter by distance.
            </p>
          </div>
        </div>
      </Panel>

      <Panel title="Category">
        <div className="flex flex-col gap-3.5">
          {categories.map((c) => (
            <CheckRow
              key={c}
              label={c}
              checked={value.categories.includes(c)}
              onToggle={() => toggle("categories", c)}
            />
          ))}
          <Link
            href="/en/categories"
            className="inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Panel>

      <Panel title="Availability">
        <div className="flex flex-col gap-3.5">
          {["In Stock", "Out of Stock"].map((a) => (
            <CheckRow
              key={a}
              label={a}
              checked={value.availability.includes(a)}
              onToggle={() => toggle("availability", a)}
            />
          ))}
        </div>
      </Panel>

      <Panel title="Price">
        <div className="flex flex-col gap-[17px]">
          <div className="flex items-center gap-2">
            <span className="flex h-9 min-w-0 flex-1 items-center gap-1 rounded-lg border border-border px-3">
              <span className="text-sm text-muted-foreground">$</span>
              <input
                type="number"
                inputMode="numeric"
                aria-label="Min price"
                min={PRICE_FLOOR}
                max={PRICE_CEILING}
                value={value.min}
                onChange={(e) =>
                  onChange({ ...value, min: Number(e.target.value) || 0 })
                }
                className="w-full min-w-0 bg-transparent text-center text-sm font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </span>
            <span
              className="h-px w-3 shrink-0 bg-muted-foreground/60"
              aria-hidden="true"
            />
            <span className="flex h-9 min-w-0 flex-1 items-center gap-1 rounded-lg border border-border px-3">
              <span className="text-sm text-muted-foreground">$</span>
              <input
                type="number"
                inputMode="numeric"
                aria-label="Max price"
                min={PRICE_FLOOR}
                max={PRICE_CEILING}
                value={value.max}
                onChange={(e) =>
                  onChange({
                    ...value,
                    max: Number(e.target.value) || PRICE_CEILING,
                  })
                }
                className="w-full min-w-0 bg-transparent text-center text-sm font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </span>
          </div>

          {/* Track mirrors the target: 3px bar, foreground range, size-3.5 thumbs */}
          <div className="relative flex h-4 w-full items-center">
            <span className="absolute h-[3px] w-full rounded-full bg-border" />
            <span
              className="absolute h-[3px] rounded-full bg-foreground"
              style={{
                left: `${(value.min / PRICE_CEILING) * 100}%`,
                right: `${100 - (value.max / PRICE_CEILING) * 100}%`,
              }}
            />
            <input
              type="range"
              aria-label="Minimum price"
              min={PRICE_FLOOR}
              max={PRICE_CEILING}
              step={10}
              value={value.min}
              onChange={(e) =>
                onChange({
                  ...value,
                  min: Math.min(Number(e.target.value), value.max),
                })
              }
              className="pointer-events-none absolute h-4 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-foreground"
            />
            <input
              type="range"
              aria-label="Maximum price"
              min={PRICE_FLOOR}
              max={PRICE_CEILING}
              step={10}
              value={value.max}
              onChange={(e) =>
                onChange({
                  ...value,
                  max: Math.max(Number(e.target.value), value.min),
                })
              }
              className="pointer-events-none absolute h-4 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-foreground"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Price:{" "}
            <span className="font-semibold text-foreground">
              {money(value.min)} - {money(value.max)}
            </span>
          </p>
        </div>
      </Panel>

      <Panel title="Brands">
        <div className="flex flex-col gap-3.5">
          {brands.map((brand) => (
            <CheckRow
              key={brand}
              label={brand}
              checked={value.brands.includes(brand)}
              onToggle={() => toggle("brands", brand)}
            />
          ))}
        </div>
      </Panel>

      <Panel title="Featured Products">
        <div className="flex flex-col gap-4">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group flex items-center gap-4"
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#f3f4f6] dark:bg-zinc-800/50">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                  />
                )}
              </span>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="line-clamp-2 text-[13px] font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                  {product.name}
                </span>
                <span className="text-sm font-bold tabular-nums text-foreground">
                  {product.priceLabel}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Panel>
    </div>
  );
}
