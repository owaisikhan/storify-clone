import type { Metadata } from "next";

import { ReturnsPolicy } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-policy/ReturnsPolicy";
import { returnsPolicy } from "@/data/policies";

export const metadata: Metadata = {
  title: "Return and Refund Policy | Storify",
  description: returnsPolicy.intro,
};

export default function ReturnsPage() {
  return <ReturnsPolicy />;
}
