import type { Metadata } from "next";

import { BlogIndex } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-blog/BlogIndex";

export const metadata: Metadata = {
  title: "Blog | Vendrix",
  description:
    "Stories from Overflow on design, user flows, UI, UX and more from the experts.",
};

export default function BlogPage() {
  return <BlogIndex />;
}
