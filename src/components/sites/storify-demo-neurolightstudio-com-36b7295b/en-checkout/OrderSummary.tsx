"use client";

import Image from "next/image";
import { useState } from "react";
import { Tag, Trash2 } from "lucide-react";

import { formatMoney, useCart } from "../cart/CartProvider";

/**
 * Right-hand order summary, measured on the target:
 *   aside bg-zinc-50, inner max-w-[440px], lg:sticky
 *   "Order summary" h3.text-lg font-semibold + "Edit cart" underlined link
 *   Subtotal / Shipping / Estimated Tax / Promo code rows at text-sm
 *   coupon input h-9 with a tag glyph + Apply button
 *   Total: label font-semibold, "USD" small, amount text-2xl font-bold
 *   line: 64px thumb, name text-sm font-medium, "Qty: N", line total,
 *         size-8 rounded-full remove button (aria "Remove <name>")
 *
 * "Edit cart" opens the cart drawer rather than linking to /en/cart — the
 * drawer is the cart in this clone.
 */

export function OrderSummary({
  shipping,
  tax,
  total,
}: {
  shipping: number;
  tax: number;
  total: number;
}) {
  const { items, subtotal, remove, openCart } = useCart();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Order summary</h3>
        <button
          type="button"
          onClick={openCart}
          className="cursor-pointer text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Edit cart
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="tabular-nums text-foreground">
            {formatMoney(subtotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">
            {shipping === 0 ? "Free" : formatMoney(shipping)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span className="tabular-nums text-foreground">
            {formatMoney(tax)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Promo code</span>
          <span className="text-muted-foreground">Enter code</span>
        </div>
        <div className="flex items-start gap-2 pt-1">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setCodeError(false);
              }}
              placeholder="Enter coupon code"
              aria-label="Coupon code"
              className="h-9 w-full rounded-[10px] border border-border bg-transparent pl-9 pr-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="button"
            onClick={() => setCodeError(code.trim().length > 0)}
            disabled={!code.trim()}
            className="h-11 cursor-pointer rounded-[10px] border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Apply
          </button>
        </div>
        {codeError && (
          <p role="status" className="text-xs text-destructive">
            This code isn&apos;t valid.
          </p>
        )}
      </div>

      <div className="h-px w-full bg-border" />

      <div className="flex items-baseline justify-between">
        <span className="font-semibold text-foreground">Total</span>
        <span className="flex items-baseline gap-1.5">
          <span className="text-xs text-muted-foreground">USD</span>
          <span className="text-2xl font-bold tabular-nums text-foreground">
            {formatMoney(total).replace("$", "")}
          </span>
        </span>
      </div>

      <div className="h-px w-full bg-border" />

      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.key} className="flex gap-3">
            <span className="relative size-16 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-muted">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
                {item.price === null
                  ? item.priceLabel
                  : formatMoney(item.price * item.quantity)}
              </p>
            </div>
            <button
              type="button"
              aria-label={`Remove ${item.name}`}
              onClick={() => remove(item.key)}
              className="-mr-1 mt-0.5 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-zinc-200 hover:text-destructive dark:hover:bg-muted"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
