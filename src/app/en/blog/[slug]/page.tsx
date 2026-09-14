import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/components/sites/storify-demo-neurolightstudio-com-36b7295b/en-blog/ArticleView";
import { blogPosts, getPost } from "@/data/blog";

// Six posts, all prerendered — the whole blog is a build-time snapshot.
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found | Storify" };
  return {
    title: `${post.title} | Storify`,
    description: post.excerpt,
    openGraph: { images: [post.image] },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <ArticleView post={post} />;
}
