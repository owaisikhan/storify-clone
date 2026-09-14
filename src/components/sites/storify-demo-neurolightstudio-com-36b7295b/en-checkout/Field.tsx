"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * The target's floating-label field, measured on its checkout:
 * h-14 · rounded-[10px] · 1px #ebebeb · transparent background · text-sm.
 * The placeholder is a single space so `:placeholder-shown` can drive the
 * label, which slides from centred to `top-2 text-xs` over 150ms on focus or
 * once the field holds a value.
 */

export const FIELD_INPUT =
  "peer h-14 w-full rounded-[10px] border border-border bg-transparent px-3 pt-6 pb-1.5 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow,border-color] focus:border-primary focus:ring-2 focus:ring-primary/20";

export const FIELD_LABEL =
  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-150 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs";

export function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  maxLength,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "numeric" | "tel";
  maxLength?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("relative", className)}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder=" "
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className={FIELD_INPUT}
      />
      <label htmlFor={id} className={FIELD_LABEL}>
        {label}
      </label>
    </div>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("relative", className)}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-14 w-full cursor-pointer appearance-none rounded-[10px] border border-border bg-transparent px-3 pt-6 pb-1.5 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow,border-color] focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        {placeholder !== undefined && (
          <option value="">{placeholder}</option>
        )}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute left-3 top-2 z-10 text-xs text-muted-foreground">
        {label}
      </span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
      </svg>
    </div>
  );
}
