"use client";

import Image from "next/image";
import Link from "next/link";

import { categories } from "@/data/site";

import { Rail } from "../shared/RailControls";

/**
 * "Shop by Categories" — circular thumbnails in a snap rail.
 * Heading: 22px bold, tracking -0.03em (sm: 28px); "Shop by" at 35% opacity,
 * "Categories" clipped to a foreground→foreground/35 gradient.
 */
export function CategoryRail() {
  return (
    <section className="py-5 lg:py-8">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-[length:var(--sec-title,22px)] font-bold tracking-[-0.03em] sm:text-[length:var(--sec-title-lg,28px)] lg:mb-[33px]">
          <span className="text-foreground/35">Shop by</span>{" "}
          <span className="bg-gradient-to-r from-foreground to-foreground/35 bg-clip-text text-transparent">
            Categories
          </span>
        </h2>

        <Rail className="flex flex-1 snap-x justify-center-safe gap-5 overflow-x-auto scroll-px-4 scroll-smooth pb-1 sm:gap-8 lg:gap-[38px]">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex w-[84px] shrink-0 snap-start flex-col items-center gap-3 sm:w-[112px] md:w-[132px] lg:w-[152px] lg:gap-[15px]"
            >
              <span className="grid aspect-square w-full place-items-center overflow-hidden rounded-full bg-muted transition-colors group-hover:bg-muted/70">
                <Image
                  src={category.image}
                  alt=""
                  aria-hidden="true"
                  width={152}
                  height={152}
                  sizes="(min-width: 1024px) 152px, (min-width: 768px) 132px, (min-width: 640px) 112px, 84px"
                  className="h-[62%] w-[62%] object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                />
              </span>
              <span className="line-clamp-2 text-center text-[13px] font-bold leading-[1.205] tracking-[-0.02em] text-foreground transition-colors [min-height:2lh] group-hover:text-primary sm:text-[15.66px]">
                {category.label}
              </span>
            </Link>
          ))}
        </Rail>
      </div>
    </section>
  );
}
