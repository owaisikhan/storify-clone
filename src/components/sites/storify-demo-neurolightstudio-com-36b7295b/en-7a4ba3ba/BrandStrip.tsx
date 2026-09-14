import Image from "next/image";
import Link from "next/link";

import { brands } from "@/data/site";

/** Grayscale brand rail; logos lift to full colour on hover. */
export function BrandStrip() {
  return (
    <section className="py-4 lg:py-8">
      <div className="container mx-auto px-4">
        <div className="flex snap-x items-center gap-6 overflow-x-auto scroll-px-4 pb-1 no-scrollbar sm:justify-between sm:gap-10">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={`/en/products?brand=${brand.name.toLowerCase()}`}
              title={brand.name}
              className="flex h-11 shrink-0 snap-start items-center justify-center px-1 sm:h-20"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={176}
                height={112}
                sizes="(min-width: 640px) 176px, 112px"
                className="h-full w-auto max-w-full max-h-11 object-contain opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0 sm:max-h-20 dark:opacity-70 dark:brightness-0 dark:invert dark:hover:opacity-100 dark:hover:brightness-100 dark:hover:invert-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
