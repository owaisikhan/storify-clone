import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";

import { ProductBrowser } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-products-4839c489/ProductBrowser";

export const metadata: Metadata = {
  title: "Storify",
  description: "Shop all products on Storify.",
};

/**
 * Clone of https://storify-demo.neurolightstudio.com/en/products
 * Header and footer come from the root layout.
 */
export default function ProductsPage() {
  return (
    <div className="pb-8">
      <div className="container mx-auto px-4 pt-8">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
            <li className="inline-flex items-center gap-1.5">
              <Link
                href="/"
                className="block max-w-[40vw] truncate transition-colors hover:text-foreground sm:max-w-[14rem]"
              >
                Home
              </Link>
            </li>
            <li role="presentation" aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="font-normal text-foreground">Products</span>
            </li>
          </ol>
        </nav>

        <h1 className="mb-8 text-center text-[26px] font-normal tracking-[-0.03em] text-foreground sm:mb-10 sm:text-[34px]">
          Shop{" "}
          <span className="bg-linear-to-r from-foreground to-foreground/35 bg-clip-text font-bold text-transparent">
            All Products
          </span>
        </h1>

        {/* useSearchParams needs a Suspense boundary in a static route */}
        <Suspense fallback={null}>
          <ProductBrowser />
        </Suspense>
      </div>
    </div>
  );
}
