import type { Metadata } from "next";

import { CompareView } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-account/CompareView";

export const metadata: Metadata = {
  title: "Compare Products | Vendrix",
  description: "Compare up to four products side by side.",
};

export default function ComparePage() {
  return <CompareView />;
}
