import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Vendrix",
  description:
    "Have a question about an order, product, vendor, or account? Our team is ready to help.",
};

const ADDRESS = "123 Main Street, New York, NY 10001";
const MAPS_QUERY = encodeURIComponent(ADDRESS);

const DETAILS = [
  { Icon: MapPin, title: "Head Office", body: ADDRESS },
  { Icon: Mail, title: "Email Us", body: "support@vendrix.com" },
  { Icon: Phone, title: "Call Us", body: "+1 555-0100" },
  {
    Icon: Clock,
    title: "Support Hours",
    body: "Sunday to Thursday, 9:00 AM - 6:00 PM",
  },
];

/**
 * /en/contact — a 380px photo hero with the title and intro over it, a card
 * that straddles the hero's bottom edge holding "Get in Touch" (the four
 * detail rows with round primary icons) beside "Send us a message", then
 * "Visit Our Store" with the embedded Google map and the "Open in Google Maps"
 * link — the target's own maps URLs, kept verbatim.
 */
export default function ContactPage() {
  return (
    <>
      <div className="container mx-auto px-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 py-5 text-sm text-muted-foreground"
        >
          <Link href="/en" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>›</span>
          <span className="text-foreground">Contact Us</span>
        </nav>
      </div>

      <div className="relative h-[380px] w-full overflow-hidden">
        <Image
          src="/images/contact-hero-storify.png"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] text-white/90 md:text-base">
            Have a question about an order, product, vendor, or account? Our team
            is ready to help you find the right answer.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* the card overlaps the hero, as on the target */}
        {/* overlaps the hero; needs its own stacking context or the
            positioned hero paints over it */}
        <div className="relative z-10 -mt-16 grid overflow-hidden rounded-xl border border-border bg-background shadow-[0_8px_30px_rgba(15,23,42,0.08)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="border-b border-border bg-muted/40 p-8 lg:border-b-0 lg:border-r">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Get in Touch
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Reach us through the details below, or send a message and we will
              get back to you as soon as possible.
            </p>

            <div className="mt-6 space-y-5">
              {DETAILS.map(({ Icon, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Share the details and our support team will route your message to
              the right person.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Visit Our Store
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Use the map below to find our office location and plan your
                visit.
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-muted">
            <iframe
              title={`Map of ${ADDRESS}`}
              src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[440px] w-full border-0"
            />
          </div>
        </div>
      </div>
    </>
  );
}
