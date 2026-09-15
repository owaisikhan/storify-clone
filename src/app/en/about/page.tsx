import type { Metadata } from "next";

import { AboutView } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-about/AboutView";

export const metadata: Metadata = {
  title: "About Us | Vendrix",
  description:
    "Verified independent sellers list their own products and ship to you directly. Vendrix handles payment, tracking and returns.",
};

export default function AboutPage() {
  return <AboutView />;
}
