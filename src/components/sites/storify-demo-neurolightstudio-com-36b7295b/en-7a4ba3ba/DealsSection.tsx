"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

import { deal, dealCards, featuredDeal } from "@/data/site";
import type { DealCard } from "@/types/storify";

/**
 * "Today's Featured Deals".
 *
 * INTERACTION MODEL: time-driven — the Days/Hours/Mins/Secs boxes tick down
 * once per second. Panel background is the captured gradient
 * linear-gradient(180deg, #181c75 0%, #512c75 100%).
 */
function useCountdown(totalSeconds: number) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    const id = window.setInterval(
      () => setRemaining((value) => (value > 0 ? value - 1 : 0)),
      1000,
    );
    return () => window.clearInterval(id);
  }, []);

  return {
    Days: Math.floor(remaining / 86400),
    Hours: Math.floor((remaining % 86400) / 3600),
    Mins: Math.floor((remaining % 3600) / 60),
    Secs: remaining % 60,
  };
}

function SideDeal({ card }: { card: DealCard }) {
  return (
    <Link
      href={card.href}
      className="group relative flex flex-1 overflow-hidden rounded-lg bg-card"
    >
      {card.discount && (
        <span className="absolute left-2 top-2 z-10 rounded-[4px] bg-destructive px-1.5 py-0.5 text-[11px] font-semibold text-white">
          {card.discount}
        </span>
      )}
      <div className="relative w-2/5 shrink-0 bg-muted">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="160px"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground">
          {card.title}
        </h3>
        <p className="flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-bold tabular-nums text-primary">
            {card.price}
          </span>
          {card.oldPrice && (
            <span className="text-[11px] text-muted-foreground line-through">
              {card.oldPrice}
            </span>
          )}
        </p>
        <span className="inline-flex h-8 w-full max-w-[140px] items-center justify-center rounded-[6px] border border-border text-xs font-semibold text-foreground transition-colors group-hover:border-foreground/25">
          View
        </span>
      </div>
    </Link>
  );
}

export function DealsSection() {
  const time = useCountdown(deal.endsInSeconds);
  const units = ["Days", "Hours", "Mins", "Secs"] as const;

  return (
    <section className="py-5 lg:py-8">
      <div className="container mx-auto px-4">
        <div
          className="relative flex flex-col overflow-hidden rounded-2xl px-4 pb-5 pt-7 sm:px-6 sm:pb-6"
          style={{ background: deal.background }}
        >
          <div className="flex flex-col gap-4 pb-6 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0">
              <p className="text-sm text-white/80">{deal.kicker}</p>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[length:var(--sec-title,1.75rem)] font-bold tracking-[-0.03em] sm:text-[length:var(--sec-title-lg,2.25rem)]">
                  {deal.title}
                </h2>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {deal.offBadge}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-sm text-white/70">{deal.endsLabel}</span>
              <div className="flex items-center gap-2">
                {units.map((unit) => (
                  <div
                    key={unit}
                    className="flex w-[68px] flex-col items-center rounded-lg bg-white px-2 py-2 text-[#1b1b1b] sm:w-20"
                  >
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {unit}
                    </span>
                    <span className="text-2xl font-semibold tabular-nums">
                      {String(time[unit]).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={deal.href}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-white/15 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/25"
            >
              {deal.viewAll}
            </Link>
          </div>

          <div className="relative lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
            <div className="flex flex-col gap-3 lg:grid lg:flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)] lg:items-stretch">
              <div className="flex flex-col gap-3">
                {dealCards.slice(0, 2).map((card) => (
                  <SideDeal key={card.href} card={card} />
                ))}
              </div>

              <div className="relative flex flex-col gap-3 rounded-lg bg-card p-4">
                {featuredDeal.discount && (
                  <span className="absolute left-6 top-6 z-10 rounded-[4px] bg-destructive px-1.5 py-0.5 text-[11px] font-semibold text-white">
                    {featuredDeal.discount}
                  </span>
                )}
                <Link
                  href={featuredDeal.href}
                  className="group relative block aspect-[16/9] overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={featuredDeal.image}
                    alt={featuredDeal.title}
                    fill
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="flex items-center justify-center gap-2">
                  {featuredDeal.gallery.map((src, index) => (
                    <span
                      key={src}
                      className="relative h-12 w-12 overflow-hidden rounded-md border border-border bg-muted"
                      aria-hidden={index > 0}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </span>
                  ))}
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {featuredDeal.category}
                </p>
                <Link href={featuredDeal.href}>
                  <h3 className="text-lg font-bold leading-snug text-foreground transition-colors hover:text-primary">
                    {featuredDeal.title}
                  </h3>
                </Link>
                <p className="flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl font-bold tabular-nums text-primary">
                    {featuredDeal.price}
                  </span>
                  {featuredDeal.oldPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {featuredDeal.oldPrice}
                    </span>
                  )}
                </p>
                <p className="text-xs font-semibold text-green-600">
                  {featuredDeal.save}
                </p>
                <button
                  type="button"
                  className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1e2a36] text-sm font-semibold text-white transition-colors hover:bg-[#1e2a36]/90"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {dealCards.slice(2).map((card) => (
                  <SideDeal key={card.href} card={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
