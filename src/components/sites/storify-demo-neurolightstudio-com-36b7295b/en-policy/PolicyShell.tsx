import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

/**
 * Breadcrumb + title wrapper shared by the policy and help pages.
 */
export function PolicyShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 pb-16">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 py-5 text-sm text-muted-foreground"
      >
        <Link href="/en" className="transition-colors hover:text-foreground">
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{title}</span>
      </nav>

      {eyebrow && (
        <p className="text-xs font-medium text-muted-foreground">{eyebrow}</p>
      )}
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h1>

      {children}
    </div>
  );
}
