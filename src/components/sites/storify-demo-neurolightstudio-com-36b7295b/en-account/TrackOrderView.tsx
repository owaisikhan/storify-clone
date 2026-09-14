"use client";

import { useState } from "react";
import { Package } from "lucide-react";

import { PolicyShell } from "../en-policy/PolicyShell";

/**
 * /en/track-order — "Order Tracking": order number + email/phone, then Track.
 * There is no order backend, so tracking reports that rather than inventing a
 * delivery status.
 */
const FIELD =
  "h-11 w-full rounded-lg border border-border bg-transparent px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";

export function TrackOrderView() {
  const [tried, setTried] = useState(false);

  return (
    <PolicyShell title="Track Order">
      <div className="mt-2 max-w-2xl">
        <h2 className="text-xl font-semibold text-foreground">Order Tracking</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your order number and checkout contact to see the latest delivery
          status.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTried(true);
          }}
          className="mt-6 space-y-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">
              Order number
            </span>
            <input
              name="orderNumber"
              required
              placeholder="ORD-MABC-123456"
              className={FIELD}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">
              Email or phone
            </span>
            <input
              name="contact"
              required
              placeholder="customer@email.com"
              className={FIELD}
            />
          </label>
          <button
            type="submit"
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Package className="h-4 w-4" />
            Track
          </button>
        </form>

        {tried && (
          <p
            role="status"
            className="mt-5 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
          >
            No orders are stored yet, so there is nothing to look up — order
            tracking arrives with the backend.
          </p>
        )}
      </div>
    </PolicyShell>
  );
}
