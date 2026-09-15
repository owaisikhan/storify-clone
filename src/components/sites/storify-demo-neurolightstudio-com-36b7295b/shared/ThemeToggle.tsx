"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import { THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Light/dark toggle.
 *
 * The whole palette hangs off a single `.dark` class on <html>: globals.css
 * declares `@custom-variant dark (&:is(.dark *))` and swaps the store palette
 * with `.dark .store-surface`, so flipping that one class is the entire job.
 * That class is therefore the source of truth, read through
 * useSyncExternalStore the same way the cart reads its own store — a
 * MutationObserver keeps every mounted toggle in step, whoever flipped it.
 *
 * The icons swap through the `dark:` variant rather than React state, so the
 * button can't render the wrong glyph in the gap before hydration; the
 * subscription exists for the label, which needs the current mode in words.
 *
 * The matching no-flash script lives in app/layout.tsx — it has to run before
 * first paint, which a component cannot do.
 */

/** the visitor's own choice, once made, outranks the OS setting */
function storedChoice(): string | null {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null; // private mode
  }
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Follow the OS, but only until the visitor picks a side themselves. Flipping
  // the class is enough — the observer above turns it into a re-render.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onMedia = () => {
    if (storedChoice()) return;
    document.documentElement.classList.toggle("dark", media.matches);
  };
  media.addEventListener("change", onMedia);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onMedia);
  };
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* private mode — the choice just won't outlive the tab */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center transition-opacity hover:opacity-70",
        className,
      )}
    >
      <Moon className="h-5 w-5 dark:hidden" />
      <Sun className="hidden h-5 w-5 dark:block" />
    </button>
  );
}
