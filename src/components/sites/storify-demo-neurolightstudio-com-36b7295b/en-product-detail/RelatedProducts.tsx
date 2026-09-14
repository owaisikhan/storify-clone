"use client";

import { useRef } from "react";

import type { Product } from "@/types/storify";

import { ProductCard } from "../shared/ProductCard";
import { RailArrows } from "../shared/RailControls";

/** "You May Also Like" — centered two-tone heading, rail arrows, product rail. */
export function RelatedProducts({ products }: { products: Product[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  if (!products.length) return null;

  return (
    <section className="py-10 lg:py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-[length:var(--sec-title,22px)] font-bold tracking-[-0.03em] sm:text-[length:var(--sec-title-lg,28px)]">
          <span className="text-foreground/35">You May Also</span>{" "}
          <span className="bg-gradient-to-r from-foreground to-foreground/35 bg-clip-text text-transparent">
            Like
          </span>
        </h2>

        <div className="mt-6 flex justify-end border-b border-border/70 pb-4">
          <RailArrows targetRef={railRef} />
        </div>

        <div
          ref={railRef}
          className="mt-6 grid auto-cols-[45%] grid-flow-col snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 scroll-smooth pb-2 no-scrollbar sm:auto-cols-[32%] sm:gap-4 lg:auto-cols-[calc((100%-3*1rem)/4)]"
        >
          {products.map((product) => (
            <div key={product.id} className="snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
