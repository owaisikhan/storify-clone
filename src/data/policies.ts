/**
 * Content for the target's policy and help pages, captured from its own
 * rendered pages.
 *
 * Four of them (terms, privacy, cookies, accessibility) are unedited demo stubs
 * on the target — a heading and a single "add your … here" line. Their copy is
 * kept verbatim rather than invented, since inventing policy text would put
 * words in the store's mouth.
 */

export interface StubPolicy {
  slug: string;
  title: string;
  /** the single line of body copy the target ships */
  body: string;
}

export const stubPolicies: StubPolicy[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    body: "Add your store's terms of service here.",
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    body: "Add your privacy policy details here.",
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    body: "Describe the cookies your site uses and why.",
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    body: "Share your accessibility standards and support contact details.",
  },
];

export const getStubPolicy = (slug: string) =>
  stubPolicies.find((p) => p.slug === slug) ?? null;

export const faq = {
  title: "Frequently Asked Questions",
  intro:
    "Find quick answers to common questions about shopping, shipping, and returns.",
  items: [
    {
      q: "How long does shipping take?",
      a: "Standard shipping usually takes 3-7 business days depending on your location.",
    },
    {
      q: "What is your return policy?",
      a: "You can return eligible items within 30 days of delivery. Items must be unused and in original packaging.",
    },
    {
      q: "How can I track my order?",
      a: "Once your order ships, you will receive a tracking link by email and in your account order history.",
    },
  ],
};

export const returnsPolicy = {
  eyebrow: "Returns and refunds",
  title: "Return and Refund Policy",
  intro:
    "We want every Vendrix order to feel clear after checkout. This page explains when items can be returned, how refund reviews work, and what happens after an approved return reaches us.",
  window: {
    label: "Return window",
    value: "30 days from delivery",
    notes: [
      "Eligible delivered items can be returned after review.",
      "Refunds are issued after approval and inspection.",
      "Final sale, digital, and unsafe-to-resell items may be excluded.",
    ],
  },
  how: {
    title: "How a return works",
    intro:
      "Returns and refunds are separate steps. A return request handles eligibility, shipment, and inspection. A refund sends or records the money after the return is approved.",
    steps: [
      {
        title: "Open your order",
        body: "Go to your account order history or track your order using the order number and checkout contact details.",
      },
      {
        title: "Choose eligible items",
        body: "Select the item quantity you want to return and share the reason, notes, and photos when needed.",
      },
      {
        title: "Wait for review",
        body: "Our team, and the vendor when applicable, reviews the request against the return window and item condition.",
      },
      {
        title: "Send the item back",
        body: "After approval, follow the return instructions. Keep your carrier receipt until the return is closed.",
      },
      {
        title: "Inspection and refund",
        body: "Once received and inspected, eligible refunds are issued to the original payment method or recorded manually.",
      },
    ],
  },
  eligible: {
    title: "Eligible returns",
    items: [
      "Delivered physical products requested within 30 days of delivery.",
      "Items in unused, clean, and resaleable condition unless they arrived damaged or defective.",
      "Items with original packaging, tags, accessories, and included documents.",
      "Partial quantities from an order, as long as they have not already been returned or refunded.",
    ],
  },
  ineligible: {
    title: "Items that may not qualify",
    items: [
      "Digital goods, services, downloadable products, and gift cards.",
      "Final sale, clearance, customized, or personalized products.",
      "Perishable, hygiene-sensitive, intimate, or opened sealed goods when not defective.",
      "Items damaged by misuse, missing parts, or returned outside the approved window.",
    ],
  },
  refundRules: {
    title: "Refund rules",
    intro:
      "Refunds are capped at the remaining refundable order balance. Shipping, taxes, discounts, and fees may be adjusted based on the approved items and the condition received.",
    cards: [
      {
        title: "Original payment method",
        body: "Card, PayPal, Razorpay, and Paystack refunds are sent back through the original payment provider when possible.",
      },
      {
        title: "Partial refunds",
        body: "If only part of an order is returned, the refund may include the item amount, eligible tax, and selected fees.",
      },
      {
        title: "Manual refunds",
        body: "COD, cash, POS, and manual payments may be handled outside the payment gateway and recorded by the store team.",
      },
      {
        title: "Inventory review",
        body: "Refunds and inventory are separate decisions. Items are restocked only after inspection confirms they can be resold.",
      },
    ],
  },
  statuses: {
    title: "Return request statuses",
    intro:
      "These are the typical states you may see as the return moves from request review to refund completion.",
    rows: [
      { label: "Requested", body: "Your return request has been submitted for review." },
      { label: "Approved", body: "The return is accepted and return instructions are provided." },
      { label: "In transit", body: "The returned item is on its way back to the store or vendor." },
      { label: "Received", body: "The returned item has arrived and is waiting for inspection." },
      { label: "Refund pending", body: "The approved refund is being prepared or sent to the payment provider." },
      { label: "Refunded", body: "The refund has been issued or manually recorded." },
    ],
  },
  beforeSending: {
    title: "Before sending anything back",
    body: "Please wait for approval and return instructions. Items sent back without approval can take longer to identify and may not qualify for refund processing.",
    helpTitle: "Need help?",
    email: "support@vendrix.com",
    phone: "+1 555-0100",
  },
  cta: {
    title: "Ready to review an order?",
    body: "Start from your order history if you have an account. If you checked out without signing in, use the tracking page with your order number and checkout email or phone.",
  },
};
