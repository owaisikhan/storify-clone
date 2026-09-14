import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

import { CategoryBrowser } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-categories/CategoryBrowser";
import { categoryEntries, categoryProducts, getCategory } from "@/data/categories";

// All 15 categories prerendered.
export function generateStaticParams() {
  return categoryEntries.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found | Storify" };
  return {
    title: `${category.label} | Storify`,
    description: `Shop ${category.label} on Storify.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

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
        <Link href="/en/categories" className="transition-colors hover:text-foreground">
          Categories
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{category.label}</span>
      </nav>

      <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        Shop by {category.label}
      </h1>

      <CategoryBrowser products={categoryProducts(slug)} />
    </div>
  );
}
