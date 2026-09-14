import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Building blocks for the target's container-query driven slides.
 * Every value below (`--sl-*`, `--fs-*`, `--wt-*`) is copied from the inline
 * styles on the live markup; see globals.css for the matching .sl-* rules.
 */

export type SlideVars = CSSProperties & Record<`--${string}`, string>;

/**
 * The target sets these four properties inline on every `.sl-text` element so
 * they beat the storefront's `:is(h1,h2,h3){font-weight:...}` rule. Mirror that
 * exactly — relying on the class alone loses the slide's own weight/colour.
 */
const slideTextStyle: CSSProperties = {
  fontSize: "max(9px, calc(var(--fs) * var(--sl-scale, 1)))",
  fontWeight: "var(--wt)" as CSSProperties["fontWeight"],
  fontStyle: "var(--it)",
  color: "var(--co)",
  lineHeight: 1.2,
  width: "var(--wd)",
  maxWidth: "100%",
};

export { slideTextStyle };

export function SlideArt({
  src,
  alt,
  vars,
  sizes = "(max-width: 640px) 60vw, 40vw",
}: {
  src: string;
  alt: string;
  vars: SlideVars;
  sizes?: string;
}) {
  return (
    <div className="sl-art absolute inset-0" style={vars}>
      <div className="sl-art-box relative">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={800}
          sizes={sizes}
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}

export function SlideContent({
  vars,
  children,
  reveal = "sl-reveal-rise",
}: {
  vars: SlideVars;
  children: ReactNode;
  reveal?: "sl-reveal-rise" | "sl-reveal-fade" | null;
}) {
  return (
    <div className="sl-content absolute inset-0" style={vars}>
      <div className={cn("sl-stack min-w-0", reveal)}>{children}</div>
    </div>
  );
}

export function SlideHeading({
  vars,
  children,
  as: Tag = "h2",
}: {
  vars: SlideVars;
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className="sl-text whitespace-pre-line" style={{ ...vars, ...slideTextStyle }}>
      {children}
    </Tag>
  );
}

export function SlideButton({
  vars,
  children,
  variant = "solid",
  background,
}: {
  vars: SlideVars;
  children: ReactNode;
  variant?: "solid" | "outline";
  background?: string;
}) {
  return (
    <span
      className="sl-text inline-flex h-auto shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-opacity hover:opacity-90"
      style={{
        ...vars,
        ...slideTextStyle,
        backgroundColor: variant === "solid" ? background ?? "rgb(31, 41, 55)" : "transparent",
        border: variant === "solid" ? "none" : "1px solid currentcolor",
        width: "var(--wd)",
        padding: "0.7em 1.6em",
      }}
    >
      <span>{children}</span>
    </span>
  );
}
