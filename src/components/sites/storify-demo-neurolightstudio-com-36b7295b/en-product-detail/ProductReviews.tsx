"use client";

import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

/**
 * Real, Supabase-backed reviews for a product: anyone can read them, anyone
 * can add one (no accounts in this clone), nobody can edit or delete one
 * after the fact. The average shown here is computed from these rows, not
 * from the static `rating`/`reviewCount` snapshot captured from the target.
 */

interface Review {
  id: string;
  author_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

function Stars({
  value,
  size = "h-4 w-4",
}: {
  value: number;
  size?: string;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(
            size,
            n <= Math.round(value)
              ? "fill-[#f59e0b] text-[#f59e0b]"
              : "fill-none text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n === 1 ? "" : "s"}`}
          onClick={() => onChange(n)}
          className="cursor-pointer p-0.5"
        >
          <Star
            className={cn(
              "h-6 w-6 transition-colors",
              n <= value
                ? "fill-[#f59e0b] text-[#f59e0b]"
                : "fill-none text-muted-foreground/40 hover:text-muted-foreground",
            )}
          />
        </button>
      ))}
    </div>
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function ProductReviews({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data, error: fetchError } = await supabase
        .from("reviews")
        .select("id, author_name, rating, comment, created_at")
        .eq("product_slug", slug)
        .order("created_at", { ascending: false });
      if (!cancelled) {
        if (fetchError) {
          console.error("reviews: failed to load", fetchError);
          setReviews([]);
        } else {
          setReviews(data ?? []);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const average = useMemo(() => {
    if (!reviews || reviews.length === 0) return null;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  const valid = name.trim().length > 0 && rating > 0 && comment.trim().length > 0;

  const submit = async () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const { data, error: insertError } = await supabase
        .from("reviews")
        .insert({
          product_slug: slug,
          author_name: name.trim(),
          rating,
          comment: comment.trim(),
        })
        .select("id, author_name, rating, comment, created_at")
        .single();
      if (insertError) throw insertError;
      setReviews((prev) => [data, ...(prev ?? [])]);
      setName("");
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("reviews: failed to submit", err);
      setError("We couldn't post your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div>
        {reviews === null ? (
          <p className="text-sm text-muted-foreground">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No reviews yet — be the first to review this product.
          </p>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <Stars value={average ?? 0} size="h-5 w-5" />
              <span className="text-lg font-bold tabular-nums text-foreground">
                {average?.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                based on {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </span>
            </div>
            <ul className="space-y-6">
              {reviews.map((r) => (
                <li key={r.id} className="border-b border-border pb-6 last:border-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {r.author_name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {dateFormatter.format(new Date(r.created_at))}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <Stars value={r.rating} />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {r.comment}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="h-fit rounded-xl border border-border p-5">
        <h3 className="text-sm font-bold text-foreground">Write a review</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Your rating
            </label>
            <StarPicker value={rating} onChange={setRating} />
          </div>
          <div>
            <label htmlFor="review-name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Your name
            </label>
            <input
              id="review-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              className="h-10 w-full rounded-lg border border-border bg-transparent px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="review-comment" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Your review
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={2000}
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <button
            type="button"
            onClick={() => void submit()}
            disabled={!valid || submitting}
            className="h-11 w-full cursor-pointer rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Posting…" : "Submit review"}
          </button>
        </div>
      </div>
    </div>
  );
}
