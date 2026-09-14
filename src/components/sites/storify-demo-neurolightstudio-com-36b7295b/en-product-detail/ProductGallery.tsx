"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X, ZoomIn, ZoomOut } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Product gallery — behaviour measured on the target, not approximated.
 *
 * Frame: h-[38vh]/max-h-[360px] on mobile, growing to a square at lg capped at
 * calc(100svh − header − 14rem). Background #f0f0f0.
 *
 * INTERACTION MODEL: click-driven, with a pointer-tracking zoom.
 *  - The image itself is a button (cursor: zoom-in, aria "Open product gallery
 *    fullscreen") — clicking it opens the fullscreen viewer.
 *  - Idle it carries `scale-100 group-hover:scale-[1.025]` with
 *    `transition-transform duration-500 ease-out`: a subtle 2.5% lift on hover.
 *  - The magnifier toggles zoom ("Enable image zoom" / "Disable image zoom").
 *    Zoomed, the image is `scale-[1.9]` and its transform-origin follows the
 *    pointer as origin% = clamp(0, 100, (pointer% − 50) × 1.9 + 50) — the
 *    factor equals the scale, which keeps the frame covered edge to edge.
 *  - The expand button ("Open fullscreen image viewer") opens the same viewer:
 *    a centered square dialog (90vw, max 90vh, sm:max-w-3xl) over a locked
 *    body, with close, prev/next and a thumbnail strip. Arrow keys page through
 *    it and Escape closes it.
 */

const ZOOM_SCALE = 1.9;
const clamp = (n: number) => Math.min(100, Math.max(0, n));

const ROUND_BUTTON =
  "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background";
const ARROW_BUTTON =
  "inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background";

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
  active: number;
  onActiveChange: (index: number) => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [viewerOpen, setViewerOpen] = useState(false);
  const frameRef = useRef<HTMLButtonElement>(null);

  const count = images.length;
  const step = useCallback(
    (dir: 1 | -1) => onActiveChange((active + dir + count) % count),
    [active, count, onActiveChange],
  );

  // Pointer-tracked transform-origin, only while zoom is enabled.
  const track = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!zoomed) return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(
      `${clamp((px - 50) * ZOOM_SCALE + 50)}% ${clamp((py - 50) * ZOOM_SCALE + 50)}%`,
    );
  };

  // Viewer: lock the body and wire arrow/Escape keys, as the target does.
  useEffect(() => {
    if (!viewerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerOpen(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [viewerOpen, step]);

  if (!count) return null;

  return (
    <div className="mx-auto w-full max-w-xl space-y-4 sm:space-y-5 lg:max-w-none">
      <div className="relative overflow-hidden rounded-lg bg-[#f0f0f0] dark:bg-muted">
        <div className="relative h-[38vh] max-h-[360px] w-full sm:h-[42vh] sm:max-h-[400px] md:h-[44vh] md:max-h-[400px] lg:aspect-square lg:h-auto lg:max-h-[calc(100svh-var(--storefront-header-height,7rem)-14rem)]">
          <button
            ref={frameRef}
            type="button"
            aria-label="Open product gallery fullscreen"
            onClick={() => setViewerOpen(true)}
            onMouseMove={track}
            onMouseLeave={() => zoomed && setOrigin("50% 50%")}
            className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2"
          >
            <Image
              src={images[active]}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 46vw"
              style={{ transformOrigin: origin }}
              className={cn(
                "object-contain p-4 transition-transform duration-500 ease-out motion-reduce:transition-none sm:p-8",
                zoomed ? "scale-[1.9]" : "scale-100 group-hover:scale-[1.025]",
              )}
            />
          </button>
        </div>

        {discount ? (
          <span className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center rounded-md bg-emerald-500 px-2 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        ) : null}

        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          <button
            type="button"
            aria-label={zoomed ? "Disable image zoom" : "Enable image zoom"}
            aria-pressed={zoomed}
            onClick={() => {
              setZoomed((v) => !v);
              setOrigin("50% 50%");
            }}
            className={ROUND_BUTTON}
          >
            {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          </button>
          <button
            type="button"
            aria-label="Open fullscreen image viewer"
            onClick={() => setViewerOpen(true)}
            className={ROUND_BUTTON}
          >
            <Expand className="h-4 w-4" />
          </button>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Show previous media"
              onClick={() => step(-1)}
              className={cn(ARROW_BUTTON, "absolute left-3 top-1/2 z-10")}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Show next media"
              onClick={() => step(1)}
              className={cn(ARROW_BUTTON, "absolute right-3 top-1/2 z-10")}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex flex-wrap gap-4">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              onClick={() => onActiveChange(i)}
              className={cn(
                "group relative aspect-4/3 w-[calc(25%-0.75rem)] cursor-pointer overflow-hidden rounded-md ring-offset-background transition-colors duration-200",
                i === active
                  ? "bg-[#e4e4e4] dark:bg-muted"
                  : "bg-[#f0f0f0] hover:bg-[#e9e9e9] dark:bg-muted/60",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="140px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}

      {viewerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setViewerOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} media viewer`}
            className="relative z-10 grid aspect-square h-auto max-h-[90vh] w-[90vw] max-w-[90vh] grid-rows-[1fr_auto] gap-0 overflow-hidden rounded-lg border border-border/60 bg-background p-0 shadow-lg sm:max-w-3xl"
          >
            <button
              type="button"
              aria-label="Close media viewer"
              onClick={() => setViewerOpen(false)}
              className={cn(ROUND_BUTTON, "absolute right-3 top-3 z-20")}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative min-h-0 bg-[#f0f0f0] dark:bg-muted">
              <Image
                src={images[active]}
                alt={alt}
                fill
                sizes="90vw"
                className="object-contain p-8"
              />

              {count > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous fullscreen media"
                    onClick={() => step(-1)}
                    className={cn(ARROW_BUTTON, "absolute left-4 top-1/2 z-10")}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next fullscreen media"
                    onClick={() => step(1)}
                    className={cn(ARROW_BUTTON, "absolute right-4 top-1/2 z-10")}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {count > 1 && (
              <div className="flex shrink-0 items-center justify-center gap-3 bg-background p-4">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`Open fullscreen image ${i + 1}`}
                    aria-current={i === active}
                    onClick={() => onActiveChange(i)}
                    className={cn(
                      "relative size-16 cursor-pointer overflow-hidden rounded-md transition-colors",
                      i === active
                        ? "bg-[#e4e4e4] ring-1 ring-border dark:bg-muted"
                        : "bg-[#f5f5f5] hover:bg-[#ececec] dark:bg-muted/60",
                    )}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-1.5"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
