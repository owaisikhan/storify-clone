"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Check,
  CreditCard,
  Lock,
  ShoppingBag,
  Truck,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";

import { ensureCartId, formatMoney, useCart } from "../cart/CartProvider";
import { Field, SelectField } from "./Field";
import { OrderSummary } from "./OrderSummary";

/**
 * /en/checkout — built from docs/research/<site-key>/en-checkout/PAGE_SPEC.md.
 *
 * Layout, copy and controls follow the target's real (session-backed) checkout,
 * captured by creating a cart session against its API. What the target does on
 * the server, this clone does in the browser:
 *   shipping  → free (its "Free shipping on orders over $50" banner)
 *   tax       → flat 8%, the rate the target returned ($216.80 on $2,710)
 *   coupons   → no real codes exist to copy, so Apply reports an invalid code
 *   card      → form-only; nothing is transmitted or stored (no payment gateway
 *               is wired up, so "Complete order" records the order, it does not
 *               charge a card)
 *
 * `placeOrder` calls the `place_order` Postgres function (see
 * supabase/migrations/0002_orders.sql), which inserts the order and its line
 * items together so a request can't leave a half-written order behind.
 */

const TAX_RATE = 0.08;

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const PAYMENT_METHODS = [
  { value: "card", label: "Card", Icon: CreditCard },
  { value: "paypal", label: "PayPal", Icon: Wallet },
  { value: "razorpay", label: "Razorpay", Icon: Wallet },
  { value: "paystack", label: "Paystack", Icon: Wallet },
  { value: "cod", label: "COD", Icon: Truck },
] as const;

type Payment = (typeof PAYMENT_METHODS)[number]["value"];

const EMPTY_ADDRESS = {
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
  state: "",
};

type Address = typeof EMPTY_ADDRESS;

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-foreground">{children}</h2>;
}

function AddressFields({
  value,
  onChange,
  prefix,
}: {
  value: Address;
  onChange: (next: Address) => void;
  prefix: string;
}) {
  const set = (key: keyof Address) => (v: string) =>
    onChange({ ...value, [key]: v });
  return (
    <div className="space-y-3">
      <SelectField
        label="Country"
        name={`${prefix}Country`}
        value="United States"
        onChange={() => {}}
        options={["United States"]}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="First Name"
          name={`${prefix}FirstName`}
          autoComplete="given-name"
          value={value.firstName}
          onChange={set("firstName")}
        />
        <Field
          label="Last Name"
          name={`${prefix}LastName`}
          autoComplete="family-name"
          value={value.lastName}
          onChange={set("lastName")}
        />
      </div>
      <Field
        label="Street Address"
        name={`${prefix}Address`}
        autoComplete="street-address"
        value={value.address}
        onChange={set("address")}
      />
      <Field
        label="Apartment, suite, etc. (optional)"
        name={`${prefix}Apartment`}
        value={value.apartment}
        onChange={set("apartment")}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="City"
          name={`${prefix}City`}
          autoComplete="address-level2"
          value={value.city}
          onChange={set("city")}
        />
        <Field
          label="Postal Code"
          name={`${prefix}PostalCode`}
          autoComplete="postal-code"
          inputMode="numeric"
          value={value.postalCode}
          onChange={set("postalCode")}
        />
      </div>
      <SelectField
        label="State"
        name={`${prefix}State`}
        value={value.state}
        onChange={set("state")}
        options={STATES}
        placeholder=""
      />
    </div>
  );
}

export function CheckoutView() {
  const { items, subtotal, clear } = useCart();

  const [email, setEmail] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<Address>(EMPTY_ADDRESS);
  const [payment, setPayment] = useState<Payment>("cod");
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", holder: "" });
  const [billingSame, setBillingSame] = useState(true);
  const [billingAddress, setBillingAddress] = useState<Address>(EMPTY_ADDRESS);
  const [placed, setPlaced] = useState<{ id: string; total: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [placeError, setPlaceError] = useState<string | null>(null);

  const shipping = 0;
  const tax = useMemo(() => Math.round(subtotal * TAX_RATE * 100) / 100, [subtotal]);
  const total = subtotal + shipping + tax;

  const addressComplete = (a: Address) =>
    Boolean(a.firstName && a.lastName && a.address && a.city && a.postalCode && a.state);

  const valid =
    items.length > 0 &&
    /.+@.+\..+/.test(email) &&
    addressComplete(shippingAddress) &&
    (billingSame || addressComplete(billingAddress)) &&
    (payment !== "card" ||
      Boolean(card.number && card.expiry && card.cvc && card.holder));

  const placeOrder = async () => {
    setSubmitting(true);
    setPlaceError(null);
    try {
      const cartId = await ensureCartId();
      const { data, error } = await supabase.rpc("place_order", {
        p_cart_id: cartId,
        p_email: email,
        p_marketing_opt_in: marketing,
        p_payment_method: payment,
        p_shipping: shippingAddress,
        p_billing_same: billingSame,
        p_billing: billingSame ? {} : billingAddress,
        p_subtotal: subtotal,
        p_shipping_cost: shipping,
        p_tax: tax,
        p_total: total,
        p_items: items,
      });
      if (error) throw error;
      const row = data?.[0] as { order_id: string; order_number: string } | undefined;
      if (!row) throw new Error("Order was not returned");
      setPlaced({ id: row.order_number, total });
      clear();
    } catch (err) {
      console.error("checkout: failed to place order", err);
      setPlaceError("We couldn't place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (placed) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <span className="mb-5 grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
          <Check className="h-7 w-7" />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Order placed
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks — your order{" "}
          <span className="font-semibold text-foreground">{placed.id}</span> is
          confirmed. A receipt is on its way to{" "}
          <span className="font-semibold text-foreground">{email}</span>.
        </p>
        <p className="mt-4 text-lg font-bold tabular-nums text-foreground">
          {formatMoney(placed.total)}
        </p>
        <p className="mt-6 max-w-md text-xs text-muted-foreground">
          Your order was recorded. No card was actually charged — this clone
          has no payment gateway wired up.
        </p>
        <Link
          href="/en/products"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-[10px] bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your cart is empty. Add some products before checkout.
        </p>
        <Link
          href="/en/products"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-[10px] bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid && !submitting) void placeOrder();
      }}
      className="mx-auto lg:grid lg:grid-cols-2"
    >
      <div className="px-4 py-8 lg:px-10 lg:py-12 lg:pr-16">
        <div className="mx-auto max-w-[480px] space-y-8 lg:mx-0 lg:ml-auto">
          <section className="space-y-4 border-b border-border pb-6">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                Checkout as Guest
              </h1>
              <p className="text-sm text-muted-foreground">
                or{" "}
                <Link
                  href="/en/login"
                  className="text-foreground underline underline-offset-4"
                >
                  Log in
                </Link>{" "}
                for faster checkout
              </p>
            </div>

            <h2 className="text-lg font-semibold text-foreground">
              Contact details
            </h2>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={setEmail}
            />
            <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="size-4 cursor-pointer rounded-[4px] border-border accent-primary"
              />
              Email me with news and others
            </label>
          </section>

          <section className="space-y-3">
            <SectionTitle>Fulfillment</SectionTitle>
            <div className="flex cursor-default items-start gap-3 rounded-lg border border-primary bg-primary/5 p-3">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border-[5px] border-primary" />
              <span className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  Delivery
                </span>
                <span className="text-xs text-muted-foreground">
                  Shipped to your address
                </span>
              </span>
            </div>
            <p className="rounded-lg bg-muted px-3 py-2.5 text-sm text-muted-foreground">
              This cart has items from multiple stores, so only delivery is
              available.
            </p>
          </section>

          <section className="space-y-3">
            <SectionTitle>Delivery</SectionTitle>
            <AddressFields
              value={shippingAddress}
              onChange={setShippingAddress}
              prefix="shipping"
            />
          </section>

          <div className="h-px w-full bg-border" />

          <section className="space-y-3">
            <SectionTitle>Shipping method</SectionTitle>
            {addressComplete(shippingAddress) ? (
              <div className="flex items-center justify-between rounded-lg border border-primary bg-primary/5 px-3 py-3 text-sm">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <Truck className="h-4 w-4" />
                  Standard delivery · 4–7 days
                </span>
                <span className="font-semibold text-foreground">Free</span>
              </div>
            ) : (
              <p className="rounded-lg bg-muted px-3 py-2.5 text-sm text-muted-foreground">
                Enter your shipping address to view available shipping methods.
              </p>
            )}
          </section>

          <section className="space-y-4">
            <div className="space-y-1">
              <SectionTitle>Payment Method</SectionTitle>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                All transactions are secure and encrypted.
              </p>
            </div>

            <div className="divide-y divide-border rounded-lg border border-border">
              {PAYMENT_METHODS.map(({ value, label, Icon }) => (
                <div key={value}>
                  <label className="flex min-h-12 cursor-pointer items-center gap-3 px-3 text-sm font-medium text-foreground">
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={payment === value}
                      onChange={() => setPayment(value)}
                      className="size-4 cursor-pointer accent-primary"
                    />
                    <span className="flex-1">{label}</span>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </label>

                  {payment === value && value === "card" && (
                    <div className="space-y-3 px-3 pb-4">
                      <p className="text-sm font-semibold text-foreground">
                        Card details
                      </p>
                      <Field
                        label="Card Number"
                        name="cardNumber"
                        inputMode="numeric"
                        maxLength={19}
                        value={card.number}
                        onChange={(v) => setCard((c) => ({ ...c, number: v }))}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Field
                          label="Expiry Date"
                          name="cardExpiry"
                          maxLength={5}
                          value={card.expiry}
                          onChange={(v) => setCard((c) => ({ ...c, expiry: v }))}
                        />
                        <Field
                          label="CVV/CVC"
                          name="cardCvc"
                          inputMode="numeric"
                          maxLength={4}
                          value={card.cvc}
                          onChange={(v) => setCard((c) => ({ ...c, cvc: v }))}
                        />
                      </div>
                      <Field
                        label="Card Holder"
                        name="cardHolder"
                        value={card.holder}
                        onChange={(v) => setCard((c) => ({ ...c, holder: v }))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Card details are not sent anywhere or stored.
                      </p>
                    </div>
                  )}

                  {payment === value && value === "cod" && (
                    <p className="px-3 pb-3 text-center text-sm text-muted-foreground">
                      Pay with cash when your order is delivered.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <SectionTitle>Billing Address</SectionTitle>
            <div className="divide-y divide-border rounded-lg border border-border">
              <label
                className={cn(
                  "flex min-h-12 cursor-pointer items-center gap-3 px-3 text-sm text-foreground transition-colors",
                  billingSame && "bg-primary/15",
                )}
              >
                <input
                  type="radio"
                  name="billing"
                  value="same"
                  checked={billingSame}
                  onChange={() => setBillingSame(true)}
                  className="size-4 cursor-pointer accent-primary"
                />
                Same as shipping address
              </label>
              <label
                className={cn(
                  "flex min-h-12 cursor-pointer items-center gap-3 px-3 text-sm text-foreground transition-colors",
                  !billingSame && "bg-primary/15",
                )}
              >
                <input
                  type="radio"
                  name="billing"
                  value="different"
                  checked={!billingSame}
                  onChange={() => setBillingSame(false)}
                  className="size-4 cursor-pointer accent-primary"
                />
                Use a different billing address
              </label>
            </div>
            {!billingSame && (
              <AddressFields
                value={billingAddress}
                onChange={setBillingAddress}
                prefix="billing"
              />
            )}
          </section>

          {placeError && (
            <p className="text-sm text-red-600 dark:text-red-400">{placeError}</p>
          )}

          <button
            type="submit"
            disabled={!valid || submitting}
            className="h-12 w-full cursor-pointer rounded-[10px] bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Placing order…" : "Complete order"}
          </button>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
            <span className="underline underline-offset-4">Refund policy</span>
            <span className="underline underline-offset-4">Privacy policy</span>
            <span className="underline underline-offset-4">Terms of service</span>
          </div>
        </div>
      </div>

      <aside className="border-t border-border bg-zinc-50 px-4 py-8 lg:border-t-0 lg:px-12 lg:py-12 dark:bg-background">
        <div className="mx-auto max-w-[440px] lg:sticky lg:top-6 lg:mx-0">
          <OrderSummary shipping={shipping} tax={tax} total={total} />
        </div>
      </aside>
    </form>
  );
}
