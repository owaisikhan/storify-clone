import type { Metadata } from "next";

import { LoginView } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-account/LoginView";

export const metadata: Metadata = {
  title: "Sign in | Vendrix",
  description: "Sign in to your Vendrix account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginView />;
}
