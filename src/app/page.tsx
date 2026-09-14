import type { Metadata } from "next";

import { BecomeVendor } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/BecomeVendor";
import { BrandStrip } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/BrandStrip";
import { CategoryRail } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/CategoryRail";
import { CollectionRows } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/CollectionRows";
import { CouponBanner } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/CouponBanner";
import { DealsSection } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/DealsSection";
import { FeatureMosaic } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/FeatureMosaic";
import { HeroSection } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/HeroSection";
import { ProductExplorer } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/ProductExplorer";
import { SiteFooter } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/SiteFooter";
import { SiteHeader } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/SiteHeader";
import { TopArticles } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/TopArticles";
import { TopSelling } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/TopSelling";
import { TopVendors } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/TopVendors";
import { WideBanner } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-7a4ba3ba/WideBanner";

export const metadata: Metadata = {
  title: "Storify",
  description: "Multi-vendor E-commerce Platform",
};

/**
 * Clone of https://storify-demo.neurolightstudio.com/en
 * Section order mirrors the source page top to bottom.
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      <div
        className="store-surface flex min-h-screen flex-col bg-background"
        data-store-theme="electronics"
        data-container="fixed"
      >
        <SiteHeader />

        <main className="flex-1">
          <HeroSection />
          <BrandStrip />
          <CategoryRail />
          <FeatureMosaic />
          <TopSelling />
          <DealsSection />
          <CollectionRows />
          <WideBanner />
          <ProductExplorer />
          <CouponBanner />
          <TopVendors />
          <BecomeVendor />
          <TopArticles />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
