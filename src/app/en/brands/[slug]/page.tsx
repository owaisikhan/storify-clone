import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, Package } from "lucide-react";

import { BrandProducts } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-brands/BrandProducts";
import { brandEntries, brandProducts, getBrand } from "@/data/brands";

// All 13 brands prerendered.
export function generateStaticParams() {
  return brandEntries.map((b) => ({ slug: b.slug }));
}

export const dynamicParams = false;

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "Brand not found | Storify" };
  return {
    title: `${brand.name} | Storify`,
    description: brand.description ?? `Shop ${brand.name} products on Storify.`,
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();
  const items = brandProducts(slug);

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
        <Link href="/en/brands" className="transition-colors hover:text-foreground">
          Brands
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{brand.name}</span>
      </nav>

      {/* brand banner: logo card on a tinted panel, eyebrow, name, count pill */}
      <div className="flex flex-wrap items-center gap-6 rounded-xl bg-gradient-to-r from-[#eef2ff] to-[#f8fafc] p-8 dark:from-muted dark:to-muted/40">
        <span className="relative block size-[120px] shrink-0 overflow-hidden rounded-lg border border-border bg-background">
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            sizes="120px"
            className="object-contain p-4"
          />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">
            Brands
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground md:text-[2.5rem]">
            {brand.name}
          </h1>
          {brand.description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {brand.description}
            </p>
          )}
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground">
            <Package className="h-3.5 w-3.5 text-muted-foreground" />
            {items.length} product{items.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <BrandProducts products={items} />
    </div>
  );
}
