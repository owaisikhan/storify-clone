"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Horizontal scroll rail with the round arrow buttons the target uses.
 * `variant="muted"` matches the category rail (size-10, bg-muted),
 * `variant="outline"` matches the Top Selling / Vendors / Articles rails.
 */
export function Rail({
  children,
  className,
  controlsClassName,
  variant = "muted",
  controls,
}: {
  children: ReactNode;
  className?: string;
  controlsClassName?: string;
  variant?: "muted" | "outline";
  controls?: "inline" | "external";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }, []);

  const button = (direction: 1 | -1) => (
    <button
      type="button"
      aria-label={direction === -1 ? "Previous" : "Next"}
      onClick={() => scrollBy(direction)}
      className={cn(
        "shrink-0 place-items-center rounded-full transition-colors",
        variant === "muted"
          ? "hidden size-10 bg-muted text-foreground/50 hover:bg-muted/70 hover:text-foreground sm:grid"
          : "hidden size-9 border border-border text-foreground/60 hover:bg-muted hover:text-foreground sm:grid",
        controlsClassName,
      )}
    >
      {direction === -1 ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </button>
  );

  if (controls === "external") {
    return (
      <>
        <div className="hidden items-center gap-2 sm:flex">
          {button(-1)}
          {button(1)}
        </div>
        <div ref={ref} className={cn("no-scrollbar", className)}>
          {children}
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {button(-1)}
      <div ref={ref} className={cn("no-scrollbar", className)}>
        {children}
      </div>
      {button(1)}
    </div>
  );
}

/** Standalone pair of arrows, for headers that render them beside a title. */
export function RailArrows({
  targetRef,
  variant = "outline",
}: {
  targetRef: React.RefObject<HTMLDivElement | null>;
  variant?: "muted" | "outline";
}) {
  const scrollBy = (direction: 1 | -1) => {
    const el = targetRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="hidden items-center gap-2 sm:flex">
      {([-1, 1] as const).map((direction) => (
        <button
          key={direction}
          type="button"
          aria-label={direction === -1 ? "Previous" : "Next"}
          onClick={() => scrollBy(direction)}
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full transition-colors",
            variant === "muted"
              ? "bg-muted text-foreground/50 hover:bg-muted/70 hover:text-foreground"
              : "border border-border text-foreground/60 hover:bg-muted hover:text-foreground",
          )}
        >
          {direction === -1 ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      ))}
    </div>
  );
}
