import type { Metadata } from "next";

import { CheckoutView } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout | Storify",
  description: "Complete your Storify order.",
  robots: { index: false, follow: false },
};

/**
 * /en/checkout — the cart lives in the browser, so the page itself is static
 * and the whole checkout renders client-side from useCart().
 */
export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <CheckoutView />
    </div>
  );
}
