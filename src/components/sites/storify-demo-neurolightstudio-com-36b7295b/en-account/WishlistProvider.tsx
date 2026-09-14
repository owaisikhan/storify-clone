"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

/**
 * Wishlist. The target gates /en/account/wishlist behind sign-in, which this
 * clone has no way to reproduce, so the list lives in the browser — the same
 * module-store + localStorage + useSyncExternalStore shape as the cart.
 */

const KEY = "storify:wishlist";
const EMPTY: string[] = [];
let slugs: string[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function parse(raw: string | null): string[] {
  if (!raw) return EMPTY;
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((s): s is string => typeof s === "string") : EMPTY;
  } catch {
    return EMPTY;
  }
}

const emit = () => listeners.forEach((l) => l());

function write(next: string[]) {
  slugs = next;
  hydrated = true;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
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

interface WishlistApi {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const Ctx = createContext<WishlistApi | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const list = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    const current = getSnapshot();
    write(
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    );
  }, []);

  const remove = useCallback((slug: string) => {
    write(getSnapshot().filter((s) => s !== slug));
  }, []);

  const value = useMemo<WishlistApi>(
    () => ({
      slugs: list,
      has: (slug) => list.includes(slug),
      toggle,
      remove,
      clear: () => write([]),
    }),
    [list, toggle, remove],
  );

  return <Ctx value={value}>{children}</Ctx>;
}

export function useWishlist(): WishlistApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
