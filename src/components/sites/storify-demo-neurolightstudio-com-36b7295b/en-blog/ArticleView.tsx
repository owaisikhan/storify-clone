import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { getPost } from "@/data/blog";
import type { BlogPost } from "@/types/storify";

import { Byline } from "./PostCard";
import { CommentForm } from "./CommentForm";

/**
 * /en/blog/[slug] — article page, matching the target's column:
 * breadcrumb, category badge, h1, excerpt, byline with
 * "date · read time · N comments", a 16/9 hero, the body as rich text, the
 * #tag row, Related articles, then Comments and the comment form.
 *
 * The body is the site's own markup, snapshotted at build time — not user
 * input — and renders through .prose-storify, the same typography the product
 * descriptions use.
 */
export function ArticleView({ post }: { post: BlogPost }) {
  const related = post.related
    .map(getPost)
    .filter((p): p is BlogPost => p !== null);

  return (
    <article>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-[860px] pb-12">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 py-6 text-sm text-muted-foreground"
          >
            <Link href="/en" className="transition-colors hover:text-foreground">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/en/blog"
              className="transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="line-clamp-1 text-foreground">{post.title}</span>
          </nav>

          {post.category && (
            <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              {post.category}
            </span>
          )}

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-[2.5rem]">
            {post.title}
          </h1>

          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="mt-5">
            <Byline post={post} meta />
          </div>

          <div className="relative mt-7 aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={post.image}
              alt={post.imageAlt ?? post.title}
              fill
              sizes="(max-width: 900px) 100vw, 860px"
              className="object-cover"
            />
          </div>

          <div
            className="prose-storify mt-8"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="border-t border-border bg-muted/40 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-[860px]">
              <h2 className="text-lg font-bold text-foreground">
                Related articles
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/en/blog/${r.slug}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background"
                  >
                    <span className="relative block aspect-[16/10] w-full overflow-hidden bg-muted">
                      <Image
                        src={r.image}
                        alt={r.imageAlt ?? r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 280px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="flex flex-col gap-1.5 p-4">
                      <span className="text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {r.title}
                      </span>
                      <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {r.excerpt}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-[860px] space-y-5">
          <div>
            <h2 className="text-lg font-bold text-foreground">Comments</h2>
            <p className="text-xs text-muted-foreground">
              {post.comments} comments
            </p>
          </div>
          <p className="rounded-xl border border-border py-8 text-center text-sm text-muted-foreground">
            Be the first to comment.
          </p>
          <CommentForm />
        </div>
      </div>
    </article>
  );
}
