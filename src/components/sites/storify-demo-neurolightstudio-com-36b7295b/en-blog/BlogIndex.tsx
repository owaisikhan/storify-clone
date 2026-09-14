"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight, Home } from "lucide-react";

import { blogCategories, blogPosts } from "@/data/blog";
import { cn } from "@/lib/utils";

import { FeaturedCard, PostCard } from "./PostCard";

/**
 * /en/blog — "Latest Guides and News".
 *
 * Measured on the target: breadcrumb, centred h1 + subtitle, a row of category
 * chips (All + each category, active chip solid near-black), the newest post as
 * a two-column feature, then a "Latest Articles" rule with the count on the
 * right and a three-column card grid.
 *
 * The chips filter client-side — the target re-renders the list in place too.
 */
export function BlogIndex() {
  const [category, setCategory] = useState<string | null>(null);

  const posts = useMemo(
    () =>
      category === null
        ? blogPosts
        : blogPosts.filter((p) => p.category === category),
    [category],
  );

  const [featured, ...rest] = posts;

  return (
    <div className="container mx-auto px-4 pb-16">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 py-6 text-sm text-muted-foreground"
      >
        <Link href="/en" className="transition-colors hover:text-foreground">
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Blog</span>
      </nav>

      <div className="flex flex-col items-center gap-4 pb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[2.75rem]">
          Latest Guides and News
        </h1>
        <p className="max-w-2xl text-[15px] text-muted-foreground">
          Stories from Overflow on design, user flows, UI, UX and more from the
          experts.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {[null, ...blogCategories].map((c) => {
            const on = category === c;
            return (
              <button
                key={c ?? "all"}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(c)}
                className={cn(
                  "h-9 cursor-pointer rounded-full border px-5 text-sm font-medium transition-colors",
                  on
                    ? "border-[#1e2a36] bg-[#1e2a36] text-white"
                    : "border-border text-foreground hover:border-foreground/40",
                )}
              >
                {c ?? "All"}
              </button>
            );
          })}
        </div>
      </div>

      {featured ? (
        <FeaturedCard post={featured} />
      ) : (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No articles in this category yet.
        </p>
      )}

      {rest.length > 0 && (
        <>
          <div className="mt-16 flex items-center gap-4">
            <span className="text-xs font-semibold text-foreground">
              Latest Articles
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">{posts.length}</span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
