import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PolicyShell } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-policy/PolicyShell";
import { getStubPolicy } from "@/data/policies";

const SLUG = "privacy";

export function generateMetadata(): Metadata {
  const policy = getStubPolicy(SLUG);
  return { title: `${policy?.title ?? "Storify"} | Storify`, description: policy?.body };
}

/**
 * The target ships this page as an unedited demo stub — a heading and one line
 * of placeholder copy. Kept verbatim rather than invented.
 */
export default function Page() {
  const policy = getStubPolicy(SLUG);
  if (!policy) notFound();
  return (
    <PolicyShell title={policy.title}>
      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
        {policy.body}
      </p>
    </PolicyShell>
  );
}
