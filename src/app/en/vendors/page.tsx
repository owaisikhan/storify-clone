import type { Metadata } from "next";
import Link from "next/link";

import { VendorCard } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-vendors/VendorCard";
import { vendorProducts, vendorStores } from "@/data/vendors";

export const metadata: Metadata = {
  title: "Vendors | Vendrix",
  description: "Discover every store selling on our marketplace.",
};

export default function VendorsPage() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 py-5 text-sm text-muted-foreground"
      >
        <Link href="/en" className="transition-colors hover:text-foreground">
          Home
        </Link>
        <span>›</span>
        <span className="text-foreground">Vendors</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.5rem]">
        Vendors
      </h1>
      <p className="mt-2 text-[15px] text-muted-foreground">
        Discover every store selling on our marketplace.
      </p>

      <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {vendorStores.map((vendor) => (
          <VendorCard
            key={vendor.slug}
            vendor={vendor}
            productCount={vendorProducts(vendor).length}
          />
        ))}
      </div>
    </div>
  );
}
