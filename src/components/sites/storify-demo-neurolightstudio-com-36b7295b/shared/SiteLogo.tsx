import { cn } from "@/lib/utils";

/**
 * The Vendrix lockup.
 *
 * The captured artwork (logo-bc6d62.svg) drew both the monogram and the whole
 * "Storify" wordmark as vector outlines, so rebranding it meant redrawing
 * rather than editing text. The bag mark is kept — it carries no brand name,
 * only the gradient outline and the blue body — with a "V" in place of the "S".
 * The wordmark is live text in the site's own font (Inter), so it stays crisp
 * at any size and follows the theme instead of being baked in at one colour.
 *
 * Both halves scale from the parent's font-size: set `text-[26px]` (or any
 * size) on the call site and the mark follows.
 */
export function SiteLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.2em] leading-none",
        className,
      )}
    >
      <svg
        viewBox="0 0 33 37"
        fill="none"
        aria-hidden="true"
        className="h-[1.42em] w-auto shrink-0"
      >
        <path
          d="M5.33456 7.63377C5.53519 6.31549 6.76122 5.40555 8.08111 5.59534L27.2117 8.34617C28.3487 8.50966 29.2157 9.44737 29.2896 10.5937L30.6552 31.7639C30.7436 33.1337 29.68 34.3044 28.308 34.3476L4.05519 35.1098C2.5382 35.1574 1.34965 33.8175 1.578 32.317L5.33456 7.63377Z"
          fill="#366FFF"
        />
        <path
          d="M3.80303 7.40086C4.13166 5.24151 6.14008 3.75112 8.30205 4.06199L27.4319 6.81199C29.2942 7.07978 30.714 8.61611 30.8353 10.4936L32.2015 31.6645C32.3459 33.908 30.6038 35.8253 28.3567 35.896L4.10381 36.6587C1.61897 36.7368 -0.327856 34.5412 0.0461923 32.0835L3.80303 7.40086ZM7.86065 7.12938C7.3829 7.06068 6.9392 7.38955 6.8665 7.86668L3.10967 32.5503C3.02717 33.0932 3.45723 33.5781 4.00615 33.561L28.2591 32.7993C28.7557 32.7837 29.1406 32.3595 29.1087 31.8638L27.7435 10.6929C27.7165 10.2782 27.4028 9.93866 26.9915 9.87938L7.86065 7.12938Z"
          fill="url(#vendrix-logo-gradient)"
        />
        <path
          d="M24.521 9.68934L24.3184 10.9644L21.7625 10.598L21.9651 9.32297C22.4631 6.18966 20.7428 3.79539 18.7039 3.50313C16.6651 3.21115 14.2782 5.01661 13.7802 8.14972L13.5776 9.42474L11.0217 9.05837L11.2243 7.78335C11.8688 3.72799 15.2161 0.395319 19.1092 0.953106C23.0023 1.51117 25.1655 5.63385 24.521 9.68934Z"
          fill="#3669FF"
        />
        <path
          d="M9.6 13.5L13.6 13.5L15.8 24L18 13.5L22 13.5L17.6 29.5L14 29.5Z"
          fill="white"
        />
        <path
          d="M23.7021 25.4233C24.6216 24.8566 25.8545 25.1163 26.4561 26.0034C27.0575 26.8904 26.8 28.0685 25.8809 28.6353C24.9614 29.202 23.7276 28.9423 23.126 28.0552C22.5247 27.1681 22.7828 25.99 23.7021 25.4233Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="vendrix-logo-gradient"
            x1="30.7037"
            y1="6.60493"
            x2="6.56507"
            y2="38.3277"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#35FFF5" />
            <stop offset="0.524039" stopColor="#FFC964" />
            <stop offset="1" stopColor="#FF31E0" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-extrabold tracking-[-0.035em] text-[#2C2E32] dark:text-white">
        Vendrix
      </span>
    </span>
  );
}
