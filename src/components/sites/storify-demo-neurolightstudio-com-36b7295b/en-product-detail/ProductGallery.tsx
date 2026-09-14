"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, ZoomIn } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Product gallery: square hero on bg-muted with a discount badge top-left,
 * zoom/fullscreen buttons top-right, prev/next arrows, and a thumbnail strip
 * below. The active thumbnail carries a muted fill; the rest are plain.
 */
export function ProductGallery({
  images,
  alt,
  discount,
  active,
  onActiveChange,
}: {
  images: string[];
  alt: string;
  discount: number | null;
  /** controlled by ProductDetailView so colour picks can swap the hero */
  active: number;
  onActiveChange: (index: number) => void;
}) {
  const setActive = (next: number | ((i: number) => number)) =>
    onActiveChange(typeof next === "function" ? next(active) : next);
  const shots = images.length ? images : [];
  const step = (dir: 1 | -1) =>
    setActive((i) => (i + dir + shots.length) % shots.length);

  return (
    <div className="mx-auto w-full max-w-xl lg:max-w-none">
      <div className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
        {shots[active] && (
          <Image
            src={shots[active]}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 46vw"
            className="object-contain p-10"
          />
        )}

        {discount ? (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-md bg-emerald-500 px-2 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        ) : null}

        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          <button
            type="button"
            aria-label="Zoom image"
            className="grid size-9 cursor-pointer place-items-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="View fullscreen"
            className="grid size-9 cursor-pointer place-items-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background"
          >
            <Expand className="h-4 w-4" />
          </button>
        </div>

        {shots.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {shots.length > 1 && (
        <div className="mt-4 flex flex-wrap justify-center gap-5">
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-[110px] w-[155px] shrink-0 cursor-pointer overflow-hidden rounded-lg transition-colors",
                i === active ? "bg-muted ring-1 ring-border" : "bg-muted/40 hover:bg-muted",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="155px"
                className="object-contain p-4"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
