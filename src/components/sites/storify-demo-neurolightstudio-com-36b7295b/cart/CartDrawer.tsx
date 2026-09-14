"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { formatMoney, useCart } from "./CartProvider";

/**
 * Cart drawer.
 *
 * The chrome below is copied from the target's own sheet, measured on the live
 * site (it opens even without a session, so the empty state is verbatim):
 *   role="dialog" · fixed z-[90] inset-y-0 right-0 h-full border-l
 *   w-[min(92vw,420px)] sm:max-w-sm · flex flex-col p-0 gap-0
 *   slide-in-from-right, 500ms opening / 300ms closing
 *   header: px-6 py-5 border-b, title "Shopping Cart" text-xl font-semibold
 *   close: rounded-full p-1 hover:bg-muted transition-colors -mr-1
 *   body:  flex-1 overflow-y-auto
 *   empty: h-64 px-6 centred — "Your cart is empty" (text-lg font-medium mb-2),
 *          "Add items to your cart to see them here" (text-sm muted mb-4),
 *          then a primary "Start Shopping" link
 *   body scroll is locked while open
 *
 * The populated list, the totals block and the checkout row are ours: the
 * target's add-to-cart requires a session and returns "An error occurred"
 * anonymously, so there was no populated cart to measure.
 */

export function CartDrawer() {
  const { items, count, subtotal, open, closeCart, setQuantity, remove } =
    useCart();
  const [notice, setNotice] = useState(false);

  // The sheet stays mounted and parked off-canvas so opening and closing are
  // both real transitions (500ms in / 300ms out, as the target measures).
  // Lock the page behind it and close on Escape, as the target does.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeCart]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[90] overflow-hidden",
        open ? "" : "pointer-events-none",
      )}
      aria-hidden={open ? undefined : true}
    >
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Shopping Cart"
        className={cn(
          "absolute inset-y-0 right-0 flex h-full w-[min(92vw,420px)] flex-col gap-0 border-l border-border bg-background p-0 shadow-lg transition-transform ease-in-out sm:max-w-sm",
          open ? "translate-x-0 duration-500" : "translate-x-full duration-300",
        )}
      >
        <div className="flex items-center justify-between gap-1.5 border-b border-border px-6 py-5">
          <h2 className="text-xl font-semibold text-foreground">
            Shopping Cart
            {count > 0 && (
              <span className="ml-2 align-middle text-sm font-medium text-muted-foreground">
                ({count})
              </span>
            )}
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="-mr-1 cursor-pointer rounded-full p-1 text-foreground transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center px-6">
              <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-lg font-medium text-foreground">
                Your cart is empty
              </p>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Add items to your cart to see them here
              </p>
              <Link
                href="/en/products"
                onClick={closeCart}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 px-6 py-4">
                  <Link
                    href={item.href}
                    onClick={closeCart}
                    className="relative size-20 shrink-0 overflow-hidden rounded-md bg-[#f3f4f6] dark:bg-muted"
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1.5"
                      />
                    )}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={item.href}
                        onClick={closeCart}
                        className="line-clamp-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => remove(item.key)}
                        className="-mr-1 -mt-1 cursor-pointer rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {item.variantLabel && (
                      <p className="truncate text-xs text-muted-foreground">
                        {item.variantLabel}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between gap-2">
                      <div className="flex h-9 items-center rounded-lg border border-border">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() =>
                            setQuantity(item.key, item.quantity - 1)
                          }
                          className="grid size-8 cursor-pointer place-items-center text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold tabular-nums text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() =>
                            setQuantity(item.key, item.quantity + 1)
                          }
                          className="grid size-8 cursor-pointer place-items-center text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold tabular-nums text-foreground">
                        {item.price === null
                          ? item.priceLabel
                          : formatMoney(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="shrink-0 border-t border-border px-6 py-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-base font-bold tabular-nums text-foreground">
                {formatMoney(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            {/* No /en/checkout route exists yet, so this stays inert rather
                than linking into a 404. */}
            <button
              type="button"
              onClick={() => setNotice(true)}
              className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Checkout
            </button>
            {notice && (
              <p role="status" className="mt-2 text-center text-xs text-muted-foreground">
                Checkout isn&apos;t built yet — it is the next page on the list.
              </p>
            )}
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 h-10 w-full cursor-pointer rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
