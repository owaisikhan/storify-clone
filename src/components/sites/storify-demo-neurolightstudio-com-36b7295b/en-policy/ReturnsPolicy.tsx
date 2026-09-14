import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  FileText,
  Home,
  Info,
  Package,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { returnsPolicy as p } from "@/data/policies";

/**
 * /en/returns — the target's long-form Return and Refund Policy.
 *
 * Section order and copy are verbatim: hero with the return-window card, the
 * five numbered "How a return works" cards, the Eligible / May not qualify
 * columns, the Refund rules grid, the numbered status table beside the
 * "Before sending anything back" aside, and the closing CTA.
 */

const STEP_ICONS = [FileText, ClipboardList, ShieldCheck, Truck, CreditCard];
const RULE_ICONS = [CreditCard, RotateCcw, FileText, Package];

const PRIMARY =
  "inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90";
const GHOST =
  "inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted";

export function ReturnsPolicy() {
  return (
    <>
      <section className="bg-muted/40">
        <div className="container mx-auto px-4">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 py-5 text-sm text-muted-foreground"
          >
            <Link href="/en" className="transition-colors hover:text-foreground">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{p.title}</span>
          </nav>

          <div className="grid gap-8 pb-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <RotateCcw className="h-3.5 w-3.5" />
                {p.eyebrow}
              </span>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {p.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                {p.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/en/login" className={PRIMARY}>
                  View my orders
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/en/track-order" className={GHOST}>
                  Track an order
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
                  <CalendarCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {p.window.label}
                  </p>
                  <p className="text-base font-bold text-foreground">
                    {p.window.value}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-3 border-t border-border pt-4">
                {p.window.notes.map((note, i) => {
                  const Icon = [CheckCircle2, RotateCcw, AlertTriangle][i] ?? Info;
                  return (
                    <li key={note} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      {note}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {p.how.title}
          </h2>
          <p className="mt-2 max-w-3xl text-[15px] text-muted-foreground">
            {p.how.intro}
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {p.how.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div
                  key={step.title}
                  className="rounded-xl border border-border p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-lg bg-muted text-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-bold text-foreground">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {[
              { block: p.eligible, Icon: CheckCircle2, tone: "text-emerald-600 dark:text-emerald-300" },
              { block: p.ineligible, Icon: AlertTriangle, tone: "text-amber-600 dark:text-amber-300" },
            ].map(({ block, Icon, tone }) => (
              <div key={block.title}>
                <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
                  <Icon className={`h-5 w-5 ${tone}`} />
                  {block.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground"
                    >
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${tone}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {p.refundRules.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.refundRules.intro}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {p.refundRules.cards.map((card, i) => {
                const Icon = RULE_ICONS[i];
                return (
                  <div
                    key={card.title}
                    className="rounded-xl border border-border p-5"
                  >
                    <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                      <span className="grid size-7 place-items-center rounded-md bg-muted">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      {card.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {p.statuses.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {p.statuses.intro}
              </p>
              <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
                {p.statuses.rows.map((row, i) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 py-3"
                  >
                    <span className="w-4 shrink-0 text-sm text-muted-foreground">
                      {i + 1}
                    </span>
                    <span className="w-28 shrink-0 text-sm font-semibold text-foreground">
                      {row.label}
                    </span>
                    <span className="min-w-0 flex-1 text-sm text-muted-foreground">
                      {row.body}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-xl border border-border p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Info className="h-4 w-4 text-muted-foreground" />
                {p.beforeSending.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.beforeSending.body}
              </p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-bold text-foreground">
                  {p.beforeSending.helpTitle}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {p.beforeSending.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {p.beforeSending.phone}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-xl border border-border p-6 md:p-8">
            <div className="min-w-0 max-w-2xl">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {p.cta.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.cta.body}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/en/login" className={PRIMARY}>
                My orders
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/en/track-order" className={GHOST}>
                Track order
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
