import type { Metadata } from "next";

import { WishlistView } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-account/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist | Storify",
  description: "Products you have saved.",
  robots: { index: false, follow: false },
};

export default function WishlistPage() {
  return <WishlistView />;
}
