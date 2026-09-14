"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { faq } from "@/data/policies";

/**
 * The target's FAQ accordion: one item open at a time, plus/minus glyph.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-8 max-w-3xl divide-y divide-border rounded-xl border border-border">
      {faq.items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[15px] font-medium text-foreground">
                {item.q}
              </span>
              {isOpen ? (
                <Minus className="h-4 w-4 shrink-0 text-muted-foreground" />
              ) : (
                <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
