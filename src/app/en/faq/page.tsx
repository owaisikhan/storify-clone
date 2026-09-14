import type { Metadata } from "next";

import { FaqAccordion } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-policy/FaqAccordion";
import { PolicyShell } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-policy/PolicyShell";
import { faq } from "@/data/policies";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Storify",
  description: faq.intro,
};

export default function FaqPage() {
  return (
    <PolicyShell title={faq.title}>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
        {faq.intro}
      </p>
      <FaqAccordion />
    </PolicyShell>
  );
}
