"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import { articles, articlesCta, articlesHeading } from "@/data/site";

import { RailArrows } from "../shared/RailControls";

/** "Top Articles" — snap rail of blog cards with author row and Read More. */
export function TopArticles() {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-5 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[length:var(--sec-title,1.125rem)] font-bold tracking-[-0.03em] sm:text-[length:var(--sec-title-lg,1.5rem)]">
            <span className="text-foreground/35">Top</span>{" "}
            <span className="bg-gradient-to-r from-foreground to-foreground/35 bg-clip-text text-transparent">
              {articlesHeading.replace("Top ", "")}
            </span>
          </h2>
          <div className="flex items-center gap-4">
            <Link
              href="/en/blog"
              className="hidden items-center gap-2 text-sm font-semibold text-foreground transition-opacity hover:opacity-70 sm:inline-flex"
            >
              {articlesCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <RailArrows targetRef={railRef} />
          </div>
        </div>

        <div
          ref={railRef}
          className="mt-4 flex snap-x gap-3 overflow-x-auto scroll-px-4 scroll-smooth pb-2 no-scrollbar sm:mt-8 sm:gap-5"
        >
          {articles.map((article) => (
            <article
              key={article.href}
              className="flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border bg-card sm:w-[336px]"
            >
              <Link
                href={article.href}
                className="relative block aspect-[16/9] overflow-hidden bg-muted"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="336px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground">
                  <Link href={article.href} className="hover:text-primary">
                    {article.title}
                  </Link>
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                  <div className="flex min-w-0 items-center gap-2">
                    {article.avatar ? (
                      <Image
                        src={article.avatar}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                        {article.author.charAt(0)}
                      </span>
                    )}
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-[13px] font-semibold text-foreground">
                        {article.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {article.date}
                      </span>
                    </span>
                  </div>
                  <Link
                    href={article.href}
                    className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-border px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    Read More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
