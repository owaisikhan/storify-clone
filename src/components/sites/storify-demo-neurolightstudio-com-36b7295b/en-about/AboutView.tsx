import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock,
  CreditCard,
  Home,
  LayoutDashboard,
  Mail,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Store,
  Truck,
  Wallet,
} from "lucide-react";

import { products } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * /en/about — "About Vendrix".
 *
 * Copy is the target's, verbatim. Its two counters are live figures ("Counted
 * from live catalogue and order data."), so "Products listed" is derived from
 * our own catalogue rather than hard-coded; "Orders delivered" has no local
 * source, so it keeps the figure captured from the target.
 */

const PRODUCTS_LISTED = products.length;
const ORDERS_DELIVERED = 97;

const SHOPPER_STEPS = [
  {
    Icon: Search,
    title: "Browse everything at once",
    body: "Search across every seller, or shop one store's own page.",
  },
  {
    Icon: ShoppingCart,
    title: "One cart, one checkout",
    body: "Pay once, even when the order comes from three different sellers.",
  },
  {
    Icon: Package,
    title: "Track it to your door",
    body: "Follow each parcel from the seller's shelf to your address.",
  },
];

const SELLER_STEPS = [
  {
    Icon: Store,
    title: "Apply",
    body: "Tell us about your business. Most applications are answered in two working days.",
  },
  {
    Icon: BadgeCheck,
    title: "Get verified",
    body: "Approved sellers get a store page, a dashboard and their own shipping rates.",
  },
  {
    Icon: LayoutDashboard,
    title: "Sell and get paid",
    body: "Payouts on a regular schedule, with every fee itemised.",
  },
];

const TRUST = [
  {
    Icon: CreditCard,
    title: "Secure payment",
    body: "Handled by our payment partners. Card details never touch our servers.",
  },
  {
    Icon: RotateCcw,
    title: "Easy returns",
    body: "Start a return from your order page within 30 days from delivery.",
  },
  {
    Icon: ShieldCheck,
    title: "Verified sellers",
    body: "Business details are checked before the first listing goes live.",
  },
];

const VALUES = [
  {
    Icon: ShieldCheck,
    title: "Verified sellers",
    body: "Checked before the first listing.",
  },
  {
    Icon: Wallet,
    title: "Fair, published fees",
    body: "One commission rate. No surprise deductions.",
  },
  {
    Icon: Truck,
    title: "Local first",
    body: "Sellers near you ship faster and cost less to reach.",
  },
  {
    Icon: RotateCcw,
    title: "Easy returns",
    body: "Time to change your mind on most items.",
  },
];

const REVIEWS = [
  {
    stars: 5,
    title: "I am satisfied for this product",
    body: null,
    author: "Jennifer",
  },
  {
    stars: 5,
    title: "hhhhhhhhhhhhhhhhh",
    body: "hhhhhhhhhhhhhhhhhhhhh",
    author: "Vendrix Admin",
  },
  {
    stars: 4,
    title: "thanks I reccived",
    body: null,
    author: "Vendrix Admin",
  },
];

const CONTACT = [
  {
    Icon: MapPin,
    title: "Head Office",
    body: "123 Main Street, New York, NY 10001",
  },
  { Icon: Mail, title: "Email Us", body: "support@vendrix.com" },
  { Icon: Phone, title: "Call Us", body: "+1 555-0100" },
  {
    Icon: Clock,
    title: "Support Hours",
    body: "Sunday to Thursday, 9:00 AM - 6:00 PM",
  },
];

const PRIMARY_BUTTON =
  "inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90";
const GHOST_BUTTON =
  "inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40";

function Step({
  index,
  Icon,
  title,
  body,
}: {
  index: number;
  Icon: typeof Search;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="text-sm font-bold text-foreground">{title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
    </div>
  );
}

export function AboutView() {
  return (
    <>
      <section className="bg-muted/40">
        <div className="container mx-auto px-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 py-6 text-sm text-muted-foreground"
          >
            <Link href="/en" className="transition-colors hover:text-foreground">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">About Us</span>
          </nav>

          <div className="grid gap-10 pb-14 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Store className="h-3.5 w-3.5" />
                About Vendrix
              </span>
              <h1 className="mt-3 max-w-[16ch] text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">
                Independent sellers. One checkout you can trust.
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                Verified independent sellers list their own products and ship to
                you directly. Vendrix handles payment, tracking and returns, so
                ordering from a two-person workshop is as safe as ordering from a
                warehouse.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/en/products" className={PRIMARY_BUTTON}>
                  Start shopping
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/en/vendors" className={GHOST_BUTTON}>
                  Sell on Vendrix
                </Link>
              </div>
            </div>

            <div className="divide-y divide-border rounded-xl border border-border bg-background">
              <p className="flex items-center justify-between px-5 py-4 text-sm">
                <span className="text-muted-foreground">Products listed</span>
                <span className="text-base font-bold tabular-nums text-foreground">
                  {PRODUCTS_LISTED}
                </span>
              </p>
              <p className="flex items-center justify-between px-5 py-4 text-sm">
                <span className="text-muted-foreground">Orders delivered</span>
                <span className="text-base font-bold tabular-nums text-foreground">
                  {ORDERS_DELIVERED}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { value: PRODUCTS_LISTED, label: "Products listed" },
              { value: ORDERS_DELIVERED, label: "Orders delivered" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border px-6 py-5"
              >
                <p className="text-3xl font-bold tabular-nums text-foreground">
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Counted from live catalogue and order data. · September 2026
          </p>
        </div>
      </section>

      <section className="bg-muted/40 py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            How Vendrix works
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Two sides of one marketplace.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-6">
              <p className="text-sm font-bold text-foreground">For shoppers</p>
              <div className="mt-5 space-y-5">
                {SHOPPER_STEPS.map((s, i) => (
                  <Step key={s.title} index={i} {...s} />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-6">
              <p className="text-sm font-bold text-foreground">For sellers</p>
              <div className="mt-5 space-y-5">
                {SELLER_STEPS.map((s, i) => (
                  <Step key={s.title} index={i} {...s} />
                ))}
              </div>
              <Link
                href="/en/vendors"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
              >
                Become a vendor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-6 rounded-xl border border-border bg-background p-6 md:grid-cols-3">
            {TRUST.map(({ Icon, title, body }) => (
              <div key={title} className="flex gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            What we stand for
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">
            Vendrix exists so a one-person workshop can sell on the same terms as
            a warehouse.
          </p>
          <div className="mt-8 grid gap-6 rounded-xl border border-border p-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ Icon, title, body }) => (
              <div key={title} className="flex gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-14">
        <div className="container mx-auto px-4 [&_p]:max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            How Vendrix started
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Vendrix started with a simple observation: good products were sitting
            in small workshops with no way to reach anyone beyond their own
            street.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            So we built the thing those sellers actually needed: a shared
            storefront where each of them keeps their own name, their own prices
            and their own customers, while the hard parts of selling online are
            handled once, for everyone.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Every seller on Vendrix runs their own shop. We keep the lights on.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            What shoppers say
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Pulled automatically from approved reviews rated four stars or
            higher.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div
                key={r.title}
                className="rounded-xl border border-border p-5"
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={cn(
                        "h-4 w-4",
                        n <= r.stars
                          ? "fill-[#f59e0b] text-[#f59e0b]"
                          : "fill-muted text-muted",
                      )}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">
                  {r.title}
                </p>
                {r.body && (
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {r.body}
                  </p>
                )}
                <p className="mt-4 text-xs text-muted-foreground">{r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="container mx-auto px-4">
          <div className="rounded-xl border border-border p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <h2 className="text-xl font-bold text-foreground">
                Where to find us
              </h2>
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-70"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {CONTACT.map(({ Icon, title, body }) => (
                <div key={title} className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{title}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-14 text-center text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Ready when you are
          </h2>
          <p className="mt-2 text-[15px] opacity-90">
            Browse the catalogue, or open a store of your own on Vendrix.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/en/products"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-background px-5 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              Start shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/en/vendors"
              className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Sell on Vendrix
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
