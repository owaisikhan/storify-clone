import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import {
  copyright,
  footerColumns,
  footerContact,
  footerTagline,
  logo,
} from "@/data/site";

/** Footer: brand column + four link columns, then the copyright rule. */
export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30 text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-1">
            <Link href="/en" className="inline-flex items-center">
              <Image
                src={logo}
                alt="Vendrix"
                width={130}
                height={33}
                className="h-auto w-[130px] object-contain object-left"
              />
            </Link>
            <p className="text-sm text-muted-foreground">{footerTagline}</p>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">
                {footerContact.title}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href={`tel:${footerContact.phone.replace(/\s/g, "")}`}>
                    {footerContact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a href={`mailto:${footerContact.email}`}>
                    {footerContact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{footerContact.address}</span>
                </li>
              </ul>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t">
        <div className="container mx-auto px-4 py-5">
          <p className="text-sm text-muted-foreground">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
