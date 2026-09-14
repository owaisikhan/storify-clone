import type { Metadata } from "next";

import { BecomeVendorView } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-account/BecomeVendorView";

export const metadata: Metadata = {
  title: "Become a Vendor | Storify",
  description: "Join thousands of successful sellers on Storify.",
};

export default function BecomeVendorPage() {
  return <BecomeVendorView />;
}
