import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Home } from "lucide-react";

import { brandEntries, brandProducts } from "@/data/brands";

export const metadata: Metadata = {
  title: "Brands | Vendrix",
  description: "Browse products by your favorite brands.",
};

/**
 * /en/brands — logo tile, name, then either the brand's description (Anker and
 * Apple carry one on the target) or its product count, and a "View products"
 * link. Counts come from our catalogue via brandSlug.
 */
export default function BrandsPage() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 py-5 text-sm text-muted-foreground"
      >
        <Link href="/en" className="transition-colors hover:text-foreground">
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Brands</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.5rem]">
        Brands
      </h1>
      <p className="mt-2 text-[15px] text-muted-foreground">
        Browse products by your favorite brands.
      </p>

      <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-5">
        {brandEntries.map((brand) => {
          const count = brandProducts(brand.slug).length;
          return (
            <Link
              key={brand.slug}
              href={`/en/brands/${brand.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
            >
              <span className="relative block aspect-[4/3] w-full bg-[#f9fafb] dark:bg-muted">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 640px) 46vw, 20vw"
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-1 flex-col gap-2 p-4">
                <span className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                  {brand.name}
                </span>
                {brand.description ? (
                  <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {brand.description}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    {count} product{count === 1 ? "" : "s"}
                  </span>
                )}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-primary">
                  View products
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
