import type { Metadata } from "next";

import { TrackOrderView } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-account/TrackOrderView";

export const metadata: Metadata = {
  title: "Track Order | Storify",
  description:
    "Enter your order number and checkout contact to see the latest delivery status.",
};

export default function TrackOrderPage() {
  return <TrackOrderView />;
}
