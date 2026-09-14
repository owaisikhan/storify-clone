"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, Mail } from "lucide-react";

import { siteUrl } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Share row, matching the target's real links.
 *
 * Facebook  → facebook.com/sharer/sharer.php?u=<url>
 * X         → twitter.com/intent/tweet?url=<url>&text=<name>
 * WhatsApp  → wa.me/?text=<name> <url>
 * Email     → mailto:?subject=<name>&body=Share this product…\n<url>
 * Copy link → clipboard, then the icon swaps to a check, the aria label
 *             becomes "Link copied" and a toast appears; both revert after ~2s.
 *
 * Each tile is `h-10 w-10 rounded-lg bg-muted` and picks up the network's brand
 * colour on hover (Facebook #1877F2, WhatsApp #25D366, the rest foreground).
 */

const TILE =
  "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground transition-colors hover:bg-muted/70";

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12" />
    </svg>
  );
}
function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.9 2.6h3.3l-7.2 8.3 8.5 11.3h-6.6l-5.2-6.8-6 6.8H2.4l7.7-8.9L2 2.6h6.8l4.7 6.2zm-1.2 17.7h1.8L7.4 4.4H5.4z" />
    </svg>
  );
}
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-2.8.8.8-2.8-.2-.3A8.2 8.2 0 0 1 12 3.8m-3.1 4c-.2 0-.5 0-.7.3-.3.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.2 2.4.9 2.9.8 3.4.7.5 0 1.6-.6 1.8-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3l-1.9-.9c-.3-.1-.5-.2-.7.1l-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-.8-2c-.2-.5-.4-.4-.6-.4z" />
    </svg>
  );
}

export function ShareRow({ name, path }: { name: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const url = `${siteUrl}${path}`;
  const e = encodeURIComponent;

  const links = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`,
      external: true,
      hover: "hover:text-[#1877F2]",
      Icon: FacebookGlyph,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${e(url)}&text=${e(name)}`,
      external: true,
      hover: "hover:text-foreground",
      Icon: XGlyph,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${e(`${name} ${url}`)}`,
      external: true,
      hover: "hover:text-[#25D366]",
      Icon: WhatsAppGlyph,
    },
    {
      label: "Share via email",
      href: `mailto:?subject=${e(name)}&body=${e(
        `Share this product with friends and family\n${url}`,
      )}`,
      external: false,
      hover: "hover:text-foreground",
      Icon: Mail,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 space-y-2.5">
      <p className="text-sm font-semibold text-foreground">Share</p>
      <div className="flex flex-wrap items-center gap-2">
        {links.map(({ label, href, external, hover, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={cn(TILE, hover)}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}

        <button
          type="button"
          aria-label={copied ? "Link copied" : "Copy link"}
          title={copied ? "Link copied" : "Copy link"}
          onClick={copy}
          className={cn(TILE, "cursor-pointer hover:text-foreground")}
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        </button>
      </div>

      {copied && (
        <p
          role="status"
          className="inline-flex items-center rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background"
        >
          Link copied
        </p>
      )}
    </div>
  );
}
