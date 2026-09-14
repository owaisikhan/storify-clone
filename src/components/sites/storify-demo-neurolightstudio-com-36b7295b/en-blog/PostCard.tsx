import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogPost } from "@/types/storify";

/**
 * Author byline — a 40px avatar where the target has one, otherwise its
 * initial-in-a-circle fallback (as "Admin User" renders).
 */
export function Byline({
  post,
  meta,
}: {
  post: BlogPost;
  /** the article header shows "date · read time · N comments" */
  meta?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      {post.authorAvatar ? (
        <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-muted">
          <Image
            src={post.authorAvatar}
            alt={post.author}
            fill
            sizes="40px"
            className="object-cover"
          />
        </span>
      ) : (
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
          {post.author.charAt(0)}
        </span>
      )}
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">
          {post.author}
        </span>
        <span className="text-xs text-muted-foreground">
          {meta
            ? `${post.date} · ${post.readTime} · ${post.comments} comments`
            : post.date}
        </span>
      </span>
    </div>
  );
}

export function ReadMore({ href }: { href: string }) {
  return (
    <span className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-border px-4 text-xs font-semibold text-foreground transition-colors group-hover:border-foreground/40">
      Read More
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      <span className="sr-only">: {href}</span>
    </span>
  );
}

/** The featured post: image left, copy right, at lg. */
export function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/en/blog/${post.slug}`}
      className="group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12"
    >
      <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={post.image}
          alt={post.imageAlt ?? post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>
      <span className="flex flex-col gap-5">
        <span className="text-3xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary md:text-[2rem]">
          {post.title}
        </span>
        <span className="text-[15px] leading-relaxed text-muted-foreground">
          {post.excerpt}
        </span>
        <span className="flex flex-wrap items-center justify-between gap-4">
          <Byline post={post} />
          <ReadMore href={`/en/blog/${post.slug}`} />
        </span>
      </span>
    </Link>
  );
}

/** Grid card: image on top, then title, excerpt, byline and Read More. */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/en/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
    >
      <span className="relative block aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={post.image}
          alt={post.imageAlt ?? post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>
      <span className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </span>
        <span className="text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </span>
        <span className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <Byline post={post} />
          <ReadMore href={`/en/blog/${post.slug}`} />
        </span>
      </span>
    </Link>
  );
}
