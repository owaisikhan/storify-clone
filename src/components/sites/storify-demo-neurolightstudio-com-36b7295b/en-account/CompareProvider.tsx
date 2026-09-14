"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

/**
 * Comparison list — the same module-store + localStorage + useSyncExternalStore
 * shape as the cart and wishlist.
 *
 * The target caps comparison at four products ("Search above to add products —
 * up to four at a time"), so `add` refuses past MAX.
 */

export const COMPARE_MAX = 4;

const KEY = "storify:compare";
const EMPTY: string[] = [];
let slugs: string[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v)
      ? v.filter((s): s is string => typeof s === "string").slice(0, COMPARE_MAX)
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

const emit = () => listeners.forEach((l) => l());

function write(next: string[]) {
  slugs = next.slice(0, COMPARE_MAX);
  hydrated = true;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    /* private mode — still works for this session */
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    slugs = parse(e.newValue);
    hydrated = true;
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): string[] {
  if (!hydrated) {
    try {
      slugs = parse(window.localStorage.getItem(KEY));
    } catch {
      slugs = EMPTY;
    }
    hydrated = true;
  }
  return slugs;
}

const getServerSnapshot = (): string[] => EMPTY;

interface CompareApi {
  slugs: string[];
  count: number;
  full: boolean;
  has: (slug: string) => boolean;
  /** returns false when the list is already full */
  toggle: (slug: string) => boolean;
  remove: (slug: string) => void;
  clear: () => void;
}

const Ctx = createContext<CompareApi | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const list = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    const current = getSnapshot();
    if (current.includes(slug)) {
      write(current.filter((s) => s !== slug));
      return true;
    }
    if (current.length >= COMPARE_MAX) return false;
    write([...current, slug]);
    return true;
  }, []);

  const value = useMemo<CompareApi>(
    () => ({
      slugs: list,
      count: list.length,
      full: list.length >= COMPARE_MAX,
      has: (slug) => list.includes(slug),
      toggle,
      remove: (slug) => write(getSnapshot().filter((s) => s !== slug)),
      clear: () => write([]),
    }),
    [list, toggle],
  );

  return <Ctx value={value}>{children}</Ctx>;
}

export function useCompare(): CompareApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompare must be used inside <CompareProvider>");
  return ctx;
}
