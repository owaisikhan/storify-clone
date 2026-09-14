"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { PolicyShell } from "../en-policy/PolicyShell";

/**
 * /en/become-vendor — "Start Selling Today".
 *
 * The target runs a four-step wizard: Your details → Store & documents →
 * Subscription → Review. Step one's fields are reproduced exactly; the later
 * steps need an account, a document upload target and a billing plan, none of
 * which exist here, so Continue validates step one and then says what is
 * missing rather than faking a signup.
 */

const STEPS = ["Your details", "Store & documents", "Subscription", "Review"];

const FIELD =
  "h-11 w-full rounded-lg border border-border bg-transparent px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";

export function BecomeVendorView() {
  const [submitted, setSubmitted] = useState(false);
  const [mismatch, setMismatch] = useState(false);

  return (
    <PolicyShell title="Become a Vendor">
      <div className="mt-2 max-w-2xl">
        <h2 className="text-xl font-semibold text-foreground">
          Start Selling Today
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Join thousands of successful sellers
        </p>
      </div>

      <ol className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                "grid size-7 place-items-center rounded-full text-xs font-bold",
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                "text-sm",
                i === 0 ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const bad = data.get("password") !== data.get("confirmPassword");
          setMismatch(bad);
          setSubmitted(!bad);
        }}
        className="mt-8 max-w-2xl space-y-4"
      >
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">
            Full Name <span className="text-destructive">*</span>
          </span>
          <input name="name" required placeholder="Enter your full name" className={FIELD} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">
            Email <span className="text-destructive">*</span>
          </span>
          <input name="email" type="email" required placeholder="Enter your email" className={FIELD} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">
              Password <span className="text-destructive">*</span>
            </span>
            <input name="password" type="password" required placeholder="Enter password" className={FIELD} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">
              Confirm Password <span className="text-destructive">*</span>
            </span>
            <input name="confirmPassword" type="password" required placeholder="Confirm password" className={FIELD} />
          </label>
        </div>

        {mismatch && (
          <p role="alert" className="text-xs text-destructive">
            Passwords do not match.
          </p>
        )}

        <button
          type="submit"
          className="h-11 w-full cursor-pointer rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continue
        </button>

        {submitted && (
          <p
            role="status"
            className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
            Step one is complete. Store &amp; documents, Subscription and Review
            need an account, a document store and billing — they arrive with the
            backend.
          </p>
        )}

        <p className="pt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/en/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </PolicyShell>
  );
}
