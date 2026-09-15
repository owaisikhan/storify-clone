import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { ProductCard } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/shared/ProductCard";
import { collectionEntries } from "@/data/collections";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Collections | Vendrix",
  description: "Browse our curated collections.",
};

/**
 * /en/collections — a two-tone heading, a row of collection cards (cover with a
 * count badge, name, and the description where one exists), then the full
 * catalogue below, exactly as the target lays it out.
 */
export default function CollectionsPage() {
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
        <span className="text-foreground">Collections</span>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        <span className="text-foreground">Collections, </span>
        <span className="text-muted-foreground">
          Browse our curated collections
        </span>
      </h1>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {collectionEntries.map((c) => (
          <Link
            key={c.slug}
            href={`/en/collections/${c.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
          >
            <span className="relative block aspect-[16/10] w-full overflow-hidden bg-muted">
              <Image
                src={c.cover}
                alt={c.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white">
                {c.products.length} products
              </span>
            </span>
            <span className="flex flex-col gap-1.5 p-4">
              <span className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                {c.name}
              </span>
              {c.description && (
                <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {c.description}
                </span>
              )}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
