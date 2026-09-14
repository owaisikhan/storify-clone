"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownUp, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

export const SORT_OPTIONS = [
  "Most Popular",
  "Best Rating",
  "Newest",
  "Price Low - High",
  "Price High - Low",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];
export type Density = 2 | 3 | 4;

/**
 * Density switcher — the target renders each option as a dot matrix:
 * 2 cols of 6px dots, 3 cols of 4.5px, 4 cols of 4px. Active dots are
 * bg-foreground, inactive bg-muted-foreground/35.
 */
function DensityButton({
  cols,
  dot,
  active,
  onClick,
}: {
  cols: Density;
  dot: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`View: ${cols}`}
      aria-pressed={active}
      onClick={onClick}
      className="cursor-pointer p-0.5"
    >
      <span
        className="grid gap-[2px]"
        aria-hidden="true"
        style={{ gridTemplateColumns: `repeat(${cols}, max-content)` }}
      >
        {Array.from({ length: cols * cols }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "rounded-[1.5px] transition-colors",
              active ? "bg-foreground" : "bg-muted-foreground/35",
            )}
            style={{ width: dot, height: dot }}
          />
        ))}
      </span>
    </button>
  );
}

function SortMenu({
  value,
  onChange,
  className,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-button border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
      >
        Sort by
        <ArrowDownUp className="h-4 w-4" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-2 w-52 overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-[var(--store-shadow-overlay)]"
        >
          {SORT_OPTIONS.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full cursor-pointer items-center px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                  option === value
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ResultsToolbar({
  density,
  onDensityChange,
  sort,
  onSortChange,
  onOpenFilters,
}: {
  density: Density;
  onDensityChange: (d: Density) => void;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  onOpenFilters: () => void;
}) {
  return (
    <>
      {/* desktop: density switcher + sort */}
      <div className="mb-6 hidden items-center justify-between gap-4 border-b border-border/70 pb-4 lg:flex">
        <div className="flex items-center gap-[18px]">
          <DensityButton
            cols={2}
            dot="6px"
            active={density === 2}
            onClick={() => onDensityChange(2)}
          />
          <DensityButton
            cols={3}
            dot="4.5px"
            active={density === 3}
            onClick={() => onDensityChange(3)}
          />
          <DensityButton
            cols={4}
            dot="4px"
            active={density === 4}
            onClick={() => onDensityChange(4)}
          />
        </div>
        <SortMenu value={sort} onChange={onSortChange} />
      </div>

      {/* mobile: Filters + Sort by side by side */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:hidden">
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-button border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
        <SortMenu value={sort} onChange={onSortChange} />
      </div>
    </>
  );
}
