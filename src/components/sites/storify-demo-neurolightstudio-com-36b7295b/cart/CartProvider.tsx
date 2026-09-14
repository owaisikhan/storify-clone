"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * Client-side cart.
 *
 * The target's own "Add to Cart" needs a signed-in session — calling it
 * anonymously returns the toast "An error occurred" — so there is no populated
 * cart on the live demo to copy. What IS measured from the target is the drawer
 * chrome and its empty state (see CartDrawer); the line-item design is ours.
 *
 * The lines live in a small module-level store mirrored into localStorage under
 * `storify:cart`, read through useSyncExternalStore so the server render (an
 * empty cart) hydrates cleanly and other tabs stay in sync.
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

const STORAGE_KEY = "storify:cart";

const EMPTY: CartItem[] = [];
let items: CartItem[] = EMPTY;
let hydrated = false;
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

function emit() {
  for (const listener of listeners) listener();
}

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

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);

  const add = useCallback((line: CartLine) => {
    const quantity = Math.max(1, line.quantity ?? 1);
    const current = getSnapshot();
    const at = current.findIndex((i) => i.key === line.key);
    if (at === -1) {
      write([...current, { ...line, quantity }]);
    } else {
      const next = [...current];
      next[at] = { ...next[at], quantity: next[at].quantity + quantity };
      write(next);
    }
    setOpen(true);
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    const current = getSnapshot();
    write(
      quantity < 1
        ? current.filter((i) => i.key !== key)
        : current.map((i) => (i.key === key ? { ...i, quantity } : i)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    write(getSnapshot().filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => write([]), []);

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
