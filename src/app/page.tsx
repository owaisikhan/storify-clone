import { redirect } from "next/navigation";

/**
 * The storefront lives under /en, as on the target — every header, footer and
 * breadcrumb link points there. The bare root redirects into it so both work.
 */
export default function RootPage() {
  redirect("/en");
}
