import type { Metadata } from "next";

import { LoginView } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-account/LoginView";

export const metadata: Metadata = {
  title: "Sign in | Storify",
  description: "Sign in to your Storify account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginView />;
}
