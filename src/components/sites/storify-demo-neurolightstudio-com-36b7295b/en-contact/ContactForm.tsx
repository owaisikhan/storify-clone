"use client";

import { useState } from "react";
import { Send } from "lucide-react";

/**
 * "Send us a message" — the target's field set exactly: Name / Company and
 * Phone / Email in two columns, then Subject and Message full width, then a
 * full-width primary Send Message button with a paper-plane glyph.
 *
 * No backend here, so submitting acknowledges locally and says so — the same
 * seam as checkout's placeOrder() and the blog comment form.
 */

const FIELD =
  "h-10 w-full rounded-lg border border-border bg-transparent px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  name,
  placeholder,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={FIELD}
      />
    </label>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" autoComplete="name" required />
        <Field label="Company" name="company" placeholder="Company" autoComplete="organization" />
        <Field label="Phone" name="phone" placeholder="Phone" type="tel" autoComplete="tel" />
        <Field label="Email" name="email" placeholder="Email" type="email" autoComplete="email" required />
      </div>

      <Field label="Subject" name="subject" placeholder="Subject" required />

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-foreground">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="How can we help?"
          className="w-full resize-y rounded-lg border border-border bg-transparent p-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <button
        type="submit"
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Send className="h-4 w-4" />
        Send Message
      </button>

      {sent && (
        <p role="status" className="text-center text-xs text-muted-foreground">
          Thanks — messages aren&apos;t delivered yet; that arrives with the
          backend.
        </p>
      )}
    </form>
  );
}
