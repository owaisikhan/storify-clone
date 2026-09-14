"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { ProductSpec } from "@/types/storify";

/**
 * Centered tab bar under the buy box: Description · Specifications.
 * (Reviews is deliberately not built yet — see docs/research/…/PAGE_SPEC.md.)
 * The active tab is bold foreground; the bar sits on a full-width bottom rule.
 *
 * `description` is the site's own rich-text body from the captured API — a
 * build-time static snapshot, not user input — so it renders as HTML.
 */
export function ProductTabs({
  description,
  specs,
}: {
  description: string;
  specs: ProductSpec[];
}) {
  const tabs = specs.length ? ["Description", "Specifications"] : ["Description"];
  const [active, setActive] = useState(tabs[0]);

  return (
    <section className="pt-10">
      <div className="border-b border-border">
        <div className="container mx-auto flex items-center justify-center gap-10 px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "-mb-px cursor-pointer border-b-2 pb-4 pt-2 text-sm transition-colors",
                active === tab
                  ? "border-foreground font-semibold text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {active === "Description" ? (
          <>
            <h2 className="mb-6 text-2xl font-bold tracking-[-0.03em] sm:text-[28px]">
              <span className="text-foreground">Descrip</span>
              <span className="text-foreground/35">tion</span>
            </h2>
            <div
              className="prose-storify max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </>
        ) : (
          <>
            <h2 className="mb-6 text-2xl font-bold tracking-[-0.03em] sm:text-[28px]">
              <span className="text-foreground">Specifi</span>
              <span className="text-foreground/35">cations</span>
            </h2>
            <dl className="max-w-3xl divide-y divide-border">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-[220px_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-semibold text-foreground">
                    {spec.label}
                  </dt>
                  <dd className="text-sm text-muted-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>
    </section>
  );
}
