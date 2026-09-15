"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  ChevronDown,
  Heart,
  MapPin,
  Menu as MenuIcon,
  Moon,
  Package,
  Rss,
  House,
  ShoppingCart,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useCart } from "../cart/CartProvider";
import { useCompare } from "../en-account/CompareProvider";
import { CategoriesMenu, CollectionsMenu } from "./NavMenus";
import { SearchBox } from "./SearchBox";
import {
  announcement,
  announcementGradient,
  logo,
  primaryNav,
  utilityNav,
} from "@/data/site";

/**
 * Sticky storefront header.
 *
 * INTERACTION MODEL: scroll-driven.
 * At scrollY 0 the header is 124px tall (64px search row + 40px nav row +
 * padding). Past the first row the search row collapses via
 * grid-template-rows 1fr -> 0fr (220ms ease-out, 60ms delay) leaving a 60px
 * sticky bar. Measured on the live page: 124px -> 60px, top 36 -> 0.
 */
const bottomNav = [
  { label: "Home", href: "/en", icon: House, active: true },
  { label: "Wishlist", href: "/en/account/wishlist", icon: Heart, active: false },
  { label: "Menu", href: "/en/products", icon: MenuIcon, active: false },
  { label: "Account", href: "/en/login", icon: User, active: false },
];

export function SiteHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const { count, openCart } = useCart();
  const compare = useCompare();

  // Collapsing removes the ~64px search row from the flow, which nudges the
  // scroll position back below a single threshold and re-expands the header —
  // an endless bounce. Two thresholds with a gap wider than that shift (collapse
  // past 140, expand only back under 40) break the loop.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCollapsed((was) => (was ? y > 40 : y > 140));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="contents">
      <div
        className="block w-full px-4 py-2 leading-5"
        style={{
          backgroundImage: announcementGradient,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <span
          className="inline-flex items-center justify-center gap-1.5"
          style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}
        >
          <span className="truncate">{announcement}</span>
        </span>
      </div>

      <div className="sticky top-0 z-50 w-full">
        <header
          className="w-full bg-background shadow-[0_2px_10px_rgba(15,23,42,0.06)] [&_button]:cursor-pointer dark:shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
          style={
            {
              "--background": "#ffffff",
              "--foreground": "#111827",
              "--muted-foreground": "#111827",
            } as React.CSSProperties
          }
        >
          {/* desktop */}
          <div className="hidden lg:block">
            <div
              className="grid transition-[grid-template-rows,opacity] duration-[220ms] ease-out motion-reduce:transition-none"
              style={{
                gridTemplateRows: collapsed ? "0fr" : "1fr",
                opacity: collapsed ? 0 : 1,
                transitionDelay: "60ms, 60ms",
              }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="container mx-auto px-4">
                  <div
                    className="py-2 transition-[min-height] duration-200 ease-out"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "minmax(auto, 1fr) minmax(auto, 4.5fr) minmax(auto, 1fr)",
                      alignItems: "center",
                      columnGap: "24px",
                      minHeight: "64px",
                    }}
                  >
                    <div className="flex flex-row flex-nowrap items-center justify-start gap-4">
                      <Link href="/en" className="flex shrink-0 items-center gap-2">
                        <span
                          className="relative block transition-[width] duration-200 ease-out"
                          style={{ width: "130px" }}
                        >
                          <Image
                            src={logo}
                            alt="Vendrix"
                            width={130}
                            height={33}
                            className="h-auto w-full object-contain object-left"
                          />
                        </span>
                      </Link>
                    </div>

                    <div className="flex flex-row flex-nowrap items-center justify-center gap-4">
                      <button
                        type="button"
                        aria-label="Choose your location"
                        className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-left leading-tight text-current transition-opacity hover:opacity-75"
                      >
                        <MapPin className="h-5 w-5" />
                        <span className="flex min-w-0 flex-col">
                          <span className="text-[11px] opacity-70">Deliver to</span>
                          <span className="max-w-[10rem] truncate text-[13px] font-semibold">
                            Set location
                          </span>
                        </span>
                      </button>

                      <SearchBox />
                    </div>

                    <div className="flex flex-row flex-nowrap items-center justify-end gap-5">
                      <div className="flex shrink-0 items-center gap-4">
                        <button
                          type="button"
                          aria-label="Switch to dark mode"
                          className="relative flex shrink-0 items-center transition-opacity hover:opacity-70"
                        >
                          <Moon className="h-5 w-5" />
                        </button>
                        <Link
                          href="/en/account/wishlist"
                          aria-label="Wishlist"
                          className="relative flex shrink-0 items-center transition-opacity hover:opacity-70"
                        >
                          <Heart className="h-5 w-5" />
                        </Link>
                        <Link
                          href="/en/compare"
                          aria-label={
                            compare.count
                              ? `Compare (${compare.count})`
                              : "Compare"
                          }
                          className="relative flex shrink-0 items-center transition-opacity hover:opacity-70"
                        >
                          <ArrowLeftRight className="h-5 w-5" />
                          {compare.count > 0 && (
                            <span className="absolute -right-2 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
                              {compare.count}
                            </span>
                          )}
                        </Link>
                      </div>
                      <div className="shrink-0">
                        <button
                          type="button"
                          className="flex items-center gap-2 text-left leading-none"
                        >
                          <User className="h-5 w-5" />
                          <span className="flex flex-col gap-[3px]">
                            <span className="text-[11px] font-medium opacity-60">
                              Welcome
                            </span>
                            <span className="inline-flex items-center gap-0.5 whitespace-nowrap text-[12px] font-semibold leading-none">
                              <span className="leading-none">Login / Register</span>
                              <ChevronDown className="h-3.5 w-3.5" />
                            </span>
                          </span>
                        </button>
                      </div>
                      <div className="flex shrink-0 items-center gap-4">
                        <button
                          type="button"
                          aria-label="Open cart"
                          onClick={openCart}
                          className="relative flex flex-col items-center gap-1 transition-opacity hover:opacity-70"
                        >
                          <ShoppingCart className="h-6 w-6" />
                          {count > 0 && (
                            <span className="absolute -right-2 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
                              {count > 99 ? "99+" : count}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* nav row — stays visible when the search row collapses */}
            <div
              style={{
                backgroundColor: "#ffffff",
                color: "#111827",
              }}
            >
              <div className="container mx-auto px-4">
                <div
                  className="py-2"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(auto, 1fr) minmax(auto, 1fr)",
                    alignItems: "center",
                    columnGap: "24px",
                    minHeight: "40px",
                  }}
                >
                  <div className="flex flex-row flex-nowrap items-center justify-start gap-4">
                    <div
                      className="min-w-0 flex-1"
                      style={{
                        height: "44px",
                        borderRadius: "10px",
                        backgroundColor: "#366FFF",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      <CategoriesMenu />
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 500 }}>
                      <CollectionsMenu />
                    </span>
                    <nav
                      className="flex min-w-0 flex-1 items-center overflow-hidden"
                      style={{
                        gap: "24px",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {primaryNav.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap opacity-90 transition-opacity hover:opacity-75"
                        >
                          <span>{link.label}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="flex flex-row flex-nowrap items-center justify-end gap-4">
                    <nav
                      className="flex min-w-0 flex-1 items-center justify-end overflow-hidden"
                      style={{
                        gap: "28px",
                        color: "#6b7280",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {utilityNav.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap opacity-90 transition-opacity hover:opacity-75"
                        >
                          {link.label === "Track Order" && (
                            <Package className="h-4 w-4" />
                          )}
                          {link.label === "Blog" && <Rss className="h-4 w-4" />}
                          <span style={{ color: "#6b7280" }}>{link.label}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* mobile */}
          <div className="container mx-auto px-4 lg:hidden">
            <div className="flex items-center justify-between gap-4 py-3">
              <Link href="/en" className="flex min-w-0 shrink-0 items-center gap-2">
                <span
                  className="relative block h-8 overflow-hidden"
                  style={{ width: "112px" }}
                >
                  <Image
                    src={logo}
                    alt="Vendrix"
                    width={144}
                    height={32}
                    className="h-8 w-full object-contain object-left"
                  />
                </span>
              </Link>
              <div className="flex shrink-0 items-center gap-4 text-foreground/90">
                <Link
                  href="/en/compare"
                  aria-label={
                    compare.count ? `Compare (${compare.count})` : "Compare"
                  }
                  className="relative flex flex-col items-center gap-1 transition-opacity hover:opacity-70"
                >
                  <ArrowLeftRight className="h-6 w-6" />
                  {compare.count > 0 && (
                    <span className="absolute -right-2 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
                      {compare.count}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  aria-label="Open cart"
                  onClick={openCart}
                  className="relative flex flex-col items-center gap-1 transition-opacity hover:opacity-70"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {count > 0 && (
                    <span className="absolute -right-2 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </button>
              </div>
            </div>
            <div className="pb-3">
              <SearchBox variant="mobile" />
            </div>
            <div className="-mt-1 pb-2">
              <button
                type="button"
                aria-label="Choose your location"
                className="flex w-full shrink-0 items-center gap-1.5 rounded-lg bg-foreground/[0.04] px-3 py-1.5 text-left leading-tight text-current transition-opacity hover:opacity-75"
              >
                <MapPin className="h-5 w-5" />
                <span className="flex min-w-0 flex-col">
                  <span className="text-[11px] opacity-70">Deliver to</span>
                  <span className="max-w-[10rem] truncate text-[13px] font-semibold">
                    Set location
                  </span>
                </span>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* mobile bottom tab bar (xl:hidden on the target) */}
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur xl:hidden"
      >
        <ul className="flex items-stretch">
          {bottomNav.map((item) => (
            <li key={item.label} className="flex-1">
              <Link
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 px-1 pb-1.5 pt-2 text-[10px] font-semibold leading-none transition-colors",
                  item.active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="relative grid h-6 w-6 place-items-center">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="max-w-full truncate">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
