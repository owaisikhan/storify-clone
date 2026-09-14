"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { coupon } from "@/data/site";

/**
 * Dark coupon strip. Background is the power-bank photo at 60% black overlay
 * (background-size cover / position center), copied from the live inline style.
 * INTERACTION MODEL: click-driven — the code chip copies to the clipboard.
 */
export function CouponBanner() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="py-5 lg:py-8">
      <div className="container mx-auto px-4">
        <div
          className="relative overflow-hidden rounded-xl bg-foreground text-background"
          style={{
            backgroundImage: `url("${coupon.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <div className="relative flex flex-col gap-4 p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 sm:py-6">
            <div className="min-w-0 space-y-1">
              <h2 className="text-[length:var(--sec-title,1.5rem)] font-bold tracking-tight sm:text-[length:var(--sec-title-lg,1.875rem)]">
                {coupon.title}
              </h2>
              <p className="text-sm text-white/70">{coupon.subtitle}</p>
            </div>

            <div className="flex w-full shrink-0 flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-11 w-full shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-full border-2 border-dashed border-white/60 bg-transparent px-5 font-mono text-sm font-semibold tracking-widest text-white transition-all hover:bg-white/10 sm:w-auto sm:justify-center"
              >
                <span className="min-w-0 truncate">{coupon.code}</span>
                <span className="flex shrink-0 items-center gap-2">
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="font-sans text-xs font-medium normal-case tracking-normal text-white/70">
                    {copied ? "Copied" : coupon.copyLabel}
                  </span>
                </span>
              </button>
              <Link
                href={coupon.href}
                className="inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-sm font-semibold text-[#111827] transition-all hover:bg-white/90 sm:w-auto"
              >
                {coupon.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
