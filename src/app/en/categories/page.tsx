import type { Metadata } from "next";

import { CategoryIndex } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-categories/CategoryIndex";

export const metadata: Metadata = {
  title: "All Categories | Storify",
  description: "Browse every product category on Storify.",
};

export default function CategoriesPage() {
  return <CategoryIndex />;
}
