"use client";

import { useState } from "react";
import { Send } from "lucide-react";

/**
 * The target's "Leave a comment" form (Name, Email, Comment, Post comment).
 * There is no backend here, so submitting acknowledges locally and says so —
 * the same seam as checkout's placeOrder().
 */
export function CommentForm() {
  const [sent, setSent] = useState(false);

  const input =
    "h-11 w-full rounded-lg border border-border bg-transparent px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-xl border border-border p-5"
    >
      <p className="mb-4 text-sm font-semibold text-foreground">
        Leave a comment
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground">Name</span>
          <input name="name" required className={input} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs text-muted-foreground">Email</span>
          <input name="email" type="email" required className={input} />
        </label>
      </div>
      <label className="mt-4 flex flex-col gap-1.5">
        <span className="text-xs text-muted-foreground">Comment</span>
        <textarea
          name="comment"
          required
          rows={4}
          className="w-full resize-y rounded-lg border border-border bg-transparent p-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>
      <button
        type="submit"
        className="mt-4 inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Send className="h-4 w-4" />
        Post comment
      </button>
      {sent && (
        <p role="status" className="mt-3 text-xs text-muted-foreground">
          Thanks — comments aren&apos;t stored yet; they arrive with the backend.
        </p>
      )}
    </form>
  );
}
