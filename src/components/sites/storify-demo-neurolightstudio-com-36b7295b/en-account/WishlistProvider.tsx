"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import { supabase } from "@/lib/supabase/client";

/**
 * Wishlist, persisted to Supabase. The target gates /en/account/wishlist
 * behind sign-in, which this clone has no way to reproduce, so instead each
 * device gets its own wishlist: a `device_id` minted with crypto.randomUUID()
 * on first use and kept in localStorage under `storify:wishlist_device_id`,
 * with rows in `wishlist_items` keyed by (device_id, slug). Reads/writes go
 * through the same module-store + localStorage-mirror + useSyncExternalStore
 * shape as the cart, so `useWishlist()` is unchanged for callers.
 */

const KEY = "storify:wishlist";
const DEVICE_ID_KEY = "storify:wishlist_device_id";

const EMPTY: string[] = [];
let slugs: string[] = EMPTY;
let hydrated = false;
let deviceId: string | null = null;
let remoteInitStarted = false;
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

function getDeviceId(): string {
  if (deviceId) return deviceId;
  try {
    const stored = window.localStorage.getItem(DEVICE_ID_KEY);
    if (stored) {
      deviceId = stored;
      return stored;
    }
  } catch {
    /* private mode */
  }
  deviceId = crypto.randomUUID();
  try {
    window.localStorage.setItem(DEVICE_ID_KEY, deviceId);
  } catch {
    /* private mode — wishlist still works for this session */
  }
  return deviceId;
}

function initRemote() {
  if (remoteInitStarted || typeof window === "undefined") return;
  remoteInitStarted = true;
  void (async () => {
    try {
      const { data, error } = await supabase
        .from("wishlist_items")
        .select("slug")
        .eq("device_id", getDeviceId());
      if (!error && data) {
        write(data.map((row) => row.slug as string));
      }
    } catch (err) {
      console.error("wishlist: failed to load from Supabase", err);
    }
  })();
}

async function persistAdd(slug: string) {
  try {
    const { error } = await supabase
      .from("wishlist_items")
      .upsert({ device_id: getDeviceId(), slug }, { onConflict: "device_id,slug" });
    if (error) throw error;
  } catch (err) {
    console.error("wishlist: failed to save item", err);
  }
}

async function persistRemove(slug: string) {
  try {
    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("device_id", getDeviceId())
      .eq("slug", slug);
    if (error) throw error;
  } catch (err) {
    console.error("wishlist: failed to remove item", err);
  }
}

async function persistClear() {
  try {
    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("device_id", getDeviceId());
    if (error) throw error;
  } catch (err) {
    console.error("wishlist: failed to clear wishlist", err);
  }
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

  useEffect(() => {
    initRemote();
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = getSnapshot();
    if (current.includes(slug)) {
      write(current.filter((s) => s !== slug));
      void persistRemove(slug);
    } else {
      write([...current, slug]);
      void persistAdd(slug);
    }
  }, []);

  const remove = useCallback((slug: string) => {
    write(getSnapshot().filter((s) => s !== slug));
    void persistRemove(slug);
  }, []);

  const clear = useCallback(() => {
    write([]);
    void persistClear();
  }, []);

  const value = useMemo<WishlistApi>(
    () => ({
      slugs: list,
      has: (slug) => list.includes(slug),
      toggle,
      remove,
      clear,
    }),
    [list, toggle, remove, clear],
  );

  return <Ctx value={value}>{children}</Ctx>;
}

export function useWishlist(): WishlistApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
