import Image from "next/image";
import Link from "next/link";

import { becomeVendor } from "@/data/site";

/** Vendor recruitment panel — dotted radial-gradient field over bg-muted/40. */
export function BecomeVendor() {
  return (
    <section className="py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg border bg-muted/40 bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="relative flex flex-col items-center gap-6 p-6 text-center sm:p-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:text-left">
            <div className="max-w-xl space-y-4">
              <h2 className="text-2xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-3xl lg:text-4xl">
                {becomeVendor.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {becomeVendor.body}
              </p>
              <Link
                href={becomeVendor.href}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#1e2a36] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1e2a36]/90"
              >
                {becomeVendor.cta}
              </Link>
            </div>

            <div className="relative aspect-[16/9] w-full">
              <Image
                src={becomeVendor.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 600px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
