"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * "Showing 1 - 32 of 58 products" + page chips.
 * Target markup: mt-10 border-t pt-6, chips are size-8 rounded-button; the
 * active page is bg-foreground/text-background/font-bold, the rest bg-muted,
 * and a disabled arrow drops to opacity-40.
 */
export function Pagination({
  page,
  pageCount,
  from,
  to,
  total,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  from: number;
  to: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const chip =
    "grid size-8 place-items-center rounded-button text-sm font-bold transition-colors";

  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        {total === 0
          ? "No products found"
          : `Showing ${from} - ${to} of ${total} products`}
      </p>

      {pageCount > 1 && (
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Previous"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className={cn(
              chip,
              "bg-muted text-foreground",
              page === 1
                ? "cursor-default opacity-40"
                : "cursor-pointer hover:bg-muted/70",
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: pageCount }).map((_, i) => {
            const n = i + 1;
            const current = n === page;
            return (
              <button
                key={n}
                type="button"
                aria-current={current ? "page" : undefined}
                onClick={() => onPageChange(n)}
                className={cn(
                  chip,
                  "cursor-pointer",
                  current
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground hover:bg-muted/70",
                )}
              >
                {n}
              </button>
            );
          })}

          <button
            type="button"
            aria-label="Next"
            disabled={page === pageCount}
            onClick={() => onPageChange(page + 1)}
            className={cn(
              chip,
              "bg-muted text-foreground",
              page === pageCount
                ? "cursor-default opacity-40"
                : "cursor-pointer hover:bg-muted/70",
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
