import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailView } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-product-detail/ProductDetailView";
import { ProductTabs } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-product-detail/ProductTabs";
import { RelatedProducts } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-product-detail/RelatedProducts";
import { WideBanner } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/WideBanner";
import { productDetails } from "@/data/product-details";
import { products } from "@/data/products";

/**
 * Clone of https://storify-demo.neurolightstudio.com/en/products/<slug>
 *
 * A handful of products are prerendered at build time; the rest render on
 * demand from the same static snapshot (dynamicParams stays on), so every
 * product link resolves.
 */
const PRERENDERED = [
  "xiaomi-pad-8-pro",
  "iphone-17",
  "beats-solo-4-wireless-headphones",
  "sony-playstation-portal-remote-player-for-ps5-console",
  "macbook-pro-m5-14-inch-24gb1tb-10-core-cpu-10-core-gpu",
  "dji-air-3s-fly-more-combo-with-dji-rc-2-remote-controller",
];

export function generateStaticParams() {
  return PRERENDERED.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Storify" };
  return {
    title: `${product.name} | Storify`,
    description:
      productDetails[slug]?.shortDescription || "Multi-vendor E-commerce Platform",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  const detail = productDetails[slug];
  if (!product || !detail) notFound();

  const related = products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 8);

  return (
    <div className="pb-8">
      <div className="container mx-auto px-4 pt-8">
        <ProductDetailView product={product} detail={detail} />
      </div>

      <ProductTabs slug={slug} description={detail.description} specs={detail.specs} />

      <RelatedProducts products={related} />

      <WideBanner />
    </div>
  );
}
