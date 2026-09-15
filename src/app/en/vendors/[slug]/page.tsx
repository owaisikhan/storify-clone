import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VendorStorefront } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-vendors/VendorStorefront";
import {
  getVendor,
  similarFromOtherStores,
  vendorProducts,
  vendorStores,
} from "@/data/vendors";

// Five stores, all prerendered.
export function generateStaticParams() {
  return vendorStores.map((v) => ({ slug: v.slug }));
}

export const dynamicParams = false;

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendor(slug);
  if (!vendor) return { title: "Store not found | Vendrix" };
  return {
    title: `${vendor.name} | Vendrix`,
    description: vendor.description,
  };
}

export default async function VendorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vendor = getVendor(slug);
  if (!vendor) notFound();
  return (
    <VendorStorefront
      vendor={vendor}
      products={vendorProducts(vendor)}
      similar={similarFromOtherStores(vendor)}
    />
  );
}
