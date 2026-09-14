import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartDrawer } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/cart/CartDrawer";
import { CartProvider } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/cart/CartProvider";
import { SiteFooter } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/shared/SiteFooter";
import { SiteHeader } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/shared/SiteHeader";

// Target site loads Inter as its body/heading family and Geist Mono for the
// coupon code chip (computed font-family: inter, "inter Fallback").
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Storify",
  description: "Multi-vendor E-commerce Platform",
};

/**
 * Root layout. The storefront chrome (announcement bar, sticky header, footer)
 * lives here inside the .store-surface wrapper, so every route inherits it —
 * mirroring the target, where the same chrome wraps every page.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="min-h-screen">
          <div
            className="store-surface flex min-h-screen flex-col bg-background"
            data-store-theme="electronics"
            data-container="fixed"
          >
            <CartProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <CartDrawer />
            </CartProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
