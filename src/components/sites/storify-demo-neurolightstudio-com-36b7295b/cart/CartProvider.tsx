"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import { supabase } from "@/lib/supabase/client";

/**
 * Client-side cart, persisted to Supabase.
 *
 * There is no real auth in this clone, so the cart is keyed by an anonymous
 * `cart_id` minted once and kept in localStorage under `storify:cart_id` —
 * each device/browser gets its own durable cart row in `carts`/`cart_items`.
 * Reads/writes go through a small module-level store (mirrored into
 * localStorage under `storify:cart` for an instant first paint) exposed via
 * useSyncExternalStore, so the API callers already use (`useCart()`,
 * `formatMoney()`) is unchanged — only what backs it moved from
 * localStorage-only to Supabase.
 */

export interface CartItem {
  /** stable identity: product slug + the chosen option values */
  key: string;
  slug: string;
  href: string;
  name: string;
  image: string | null;
  /** unit price in dollars; null for "Price on request" items */
  price: number | null;
  priceLabel: string;
  /** e.g. "Color: Titanium · Storage: 256GB" */
  variantLabel: string | null;
  quantity: number;
}

export type CartLine = Omit<CartItem, "quantity"> & { quantity?: number };

interface CartRow {
  item_key: string;
  slug: string;
  href: string;
  name: string;
  image: string | null;
  price: number | null;
  price_label: string;
  variant_label: string | null;
  quantity: number;
}

const STORAGE_KEY = "storify:cart";
const CART_ID_KEY = "storify:cart_id";

const EMPTY: CartItem[] = [];
let items: CartItem[] = EMPTY;
let hydrated = false;
let cartId: string | null = null;
let remoteInitStarted = false;
const listeners = new Set<() => void>();

function parse(raw: string | null): CartItem[] {
  if (!raw) return EMPTY;
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return EMPTY;
    return value.filter(
      (i): i is CartItem =>
        typeof i === "object" &&
        i !== null &&
        typeof (i as CartItem).key === "string" &&
        typeof (i as CartItem).quantity === "number",
    );
  } catch {
    return EMPTY;
  }
}

function rowToItem(row: CartRow): CartItem {
  return {
    key: row.item_key,
    slug: row.slug,
    href: row.href,
    name: row.name,
    image: row.image,
    price: row.price,
    priceLabel: row.price_label,
    variantLabel: row.variant_label,
    quantity: row.quantity,
  };
}

function itemToRow(cart_id: string, item: CartItem): CartRow & { cart_id: string } {
  return {
    cart_id,
    item_key: item.key,
    slug: item.slug,
    href: item.href,
    name: item.name,
    image: item.image,
    price: item.price,
    price_label: item.priceLabel,
    variant_label: item.variantLabel,
    quantity: item.quantity,
  };
}

function emit() {
  for (const listener of listeners) listener();
}

/** updates the local snapshot + localStorage mirror; does not touch Supabase */
function write(next: CartItem[]) {
  items = next;
  hydrated = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* private mode / quota — the cart still works for this session */
  }
  emit();
}

async function getOrCreateCartId(): Promise<string> {
  if (cartId) return cartId;
  try {
    const stored = window.localStorage.getItem(CART_ID_KEY);
    if (stored) {
      cartId = stored;
      return stored;
    }
  } catch {
    /* private mode */
  }
  const { data, error } = await supabase
    .from("carts")
    .insert({})
    .select("id")
    .single();
  if (error || !data) throw error ?? new Error("Failed to create cart");
  cartId = data.id as string;
  try {
    window.localStorage.setItem(CART_ID_KEY, cartId);
  } catch {
    /* private mode — cart still works for this session */
  }
  return cartId;
}

/** loads the remote cart once per page load and reconciles the local snapshot */
function initRemote() {
  if (remoteInitStarted || typeof window === "undefined") return;
  remoteInitStarted = true;
  void (async () => {
    try {
      const id = await getOrCreateCartId();
      const { data, error } = await supabase
        .from("cart_items")
        .select("item_key, slug, href, name, image, price, price_label, variant_label, quantity")
        .eq("cart_id", id)
        .order("created_at", { ascending: true });
      if (!error && data) {
        write(data.map(rowToItem));
      }
    } catch (err) {
      console.error("cart: failed to load from Supabase", err);
    }
  })();
}

async function persistUpsert(item: CartItem) {
  try {
    const id = await getOrCreateCartId();
    const { error } = await supabase
      .from("cart_items")
      .upsert(itemToRow(id, item), { onConflict: "cart_id,item_key" });
    if (error) throw error;
  } catch (err) {
    console.error("cart: failed to save item", err);
  }
}

async function persistRemove(key: string) {
  try {
    const id = await getOrCreateCartId();
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("cart_id", id)
      .eq("item_key", key);
    if (error) throw error;
  } catch (err) {
    console.error("cart: failed to remove item", err);
  }
}

async function persistClear() {
  try {
    const id = await getOrCreateCartId();
    const { error } = await supabase.from("cart_items").delete().eq("cart_id", id);
    if (error) throw error;
  } catch (err) {
    console.error("cart: failed to clear cart", err);
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    items = parse(e.newValue);
    hydrated = true;
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): CartItem[] {
  if (!hydrated) {
    try {
      items = parse(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      items = EMPTY;
    }
    hydrated = true;
  }
  return items;
}

const getServerSnapshot = (): CartItem[] => EMPTY;

interface CartApi {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (line: CartLine) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    initRemote();
  }, []);

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  const add = useCallback((line: CartLine) => {
    const quantity = Math.max(1, line.quantity ?? 1);
    const current = getSnapshot();
    const at = current.findIndex((i) => i.key === line.key);
    let saved: CartItem;
    if (at === -1) {
      saved = { ...line, quantity };
      write([...current, saved]);
    } else {
      saved = { ...current[at], quantity: current[at].quantity + quantity };
      const next = [...current];
      next[at] = saved;
      write(next);
    }
    setOpen(true);
    void persistUpsert(saved);
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    const current = getSnapshot();
    if (quantity < 1) {
      write(current.filter((i) => i.key !== key));
      void persistRemove(key);
      return;
    }
    const next = current.map((i) => (i.key === key ? { ...i, quantity } : i));
    write(next);
    const updated = next.find((i) => i.key === key);
    if (updated) void persistUpsert(updated);
  }, []);

  const remove = useCallback((key: string) => {
    write(getSnapshot().filter((i) => i.key !== key));
    void persistRemove(key);
  }, []);

  const clear = useCallback(() => {
    write([]);
    void persistClear();
  }, []);

  const value = useMemo<CartApi>(
    () => ({
      items: lines,
      count: lines.reduce((n, i) => n + i.quantity, 0),
      subtotal: lines.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0),
      open,
      openCart,
      closeCart,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [lines, open, openCart, closeCart, add, setQuantity, remove, clear],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
