import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

import { BrandProducts } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-brands/BrandProducts";
import {
  collectionEntries,
  collectionProducts,
  getCollection,
} from "@/data/collections";

// All five collections prerendered.
export function generateStaticParams() {
  return collectionEntries.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection not found | Storify" };
  return {
    title: `${collection.name} | Storify`,
    description:
      collection.description ?? `Shop the ${collection.name} collection on Storify.`,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <div className="container mx-auto px-4 pb-16">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 py-5 text-sm text-muted-foreground"
      >
        <Link href="/en" className="transition-colors hover:text-foreground">
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/en/collections" className="transition-colors hover:text-foreground">
          Collections
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{collection.name}</span>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {collection.name}
      </h1>
      {collection.description && (
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          {collection.description}
        </p>
      )}

      {/* same toolbar + grid the brand pages use: count on the left, Sort by right */}
      <BrandProducts products={collectionProducts(collection)} />
    </div>
  );
}
