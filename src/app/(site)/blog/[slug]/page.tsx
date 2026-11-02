import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { AuthorBox } from "@/components/blog/author-box";
import { PostCover } from "@/components/blog/post-cover";
import { PostMeta } from "@/components/blog/post-meta";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { RelatedServices } from "@/components/blog/related-services";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ViewCounter } from "@/components/blog/view-counter";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog/queries";
import { optimizeContentImages } from "@/lib/blog/render";
import { site } from "@/lib/site";

// Known posts are prerendered; posts published later render on first visit
// and are then cached like the rest.
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "__yok__" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return { title: "Sayfa bulunamadı" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [site.person],
      ...(post.coverImage?.startsWith("http") && { images: [post.coverImage] }),
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const others = (await getPublishedPosts()).filter((p) => p.id !== post.id).slice(0, 3);
  const url = `${site.url}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    timeRequired: `PT${post.readingMinutes}M`,
    author: {
      "@type": "Person",
      "@id": `${site.url}/#reyhan-eren`,
      name: site.person,
      jobTitle: "Aile Danışmanı",
      url: `${site.url}/hakkimda`,
    },
    ...(post.coverImage && { image: post.coverImage }),
    publisher: { "@id": `${site.url}/#clinic` },
    mainEntityOfPage: url,
    inLanguage: "tr-TR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ReadingProgress targetId="yazi-icerigi" />
      <article className="pb-20 pt-10 md:pb-28 md:pt-16">
        <header className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] text-ink-muted transition-colors duration-150 hover:text-ink"
          >
            <span aria-hidden="true">←</span> Tüm yazılar
          </Link>
          <h1 className="mt-6 font-serif text-[2.25rem] leading-[1.1] tracking-[-0.02em] text-ink text-balance sm:text-5xl md:text-[3.25rem]">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted text-pretty md:text-xl">
            {post.excerpt}
          </p>
          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
            <Image
              src="/reyhan-eren-avatar.jpg"
              width={256}
              height={256}
              alt=""
              sizes="44px"
              className="size-11 shrink-0 rounded-full bg-sand-100 object-cover"
            />
            <div>
              <Link
                href="/hakkimda"
                className="font-medium text-ink decoration-line-strong underline-offset-4 hover:underline relative after:absolute after:-inset-x-1 after:-inset-y-3.5 after:content-['']"
              >
                {site.person}
              </Link>
              <PostMeta publishedAt={post.publishedAt} readingMinutes={post.readingMinutes}>
                <ViewCounter slug={post.slug} />
              </PostMeta>
            </div>
            </div>
            <div className="-mx-3 sm:-mr-2 sm:ml-0">
              <ShareButtons url={url} title={post.title} variant="compact" />
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="mx-auto mt-12 max-w-5xl px-5 sm:px-8">
            <PostCover
              src={post.coverImage}
              alt={post.coverAlt}
              title={post.title}
              eager
              sizes="(min-width: 1024px) 960px, 100vw"
              className="aspect-[16/9] w-full rounded-2xl md:rounded-3xl"
            />
          </div>
        )}

        <div
          id="yazi-icerigi"
          className="prose-blog mx-auto mt-12 max-w-3xl px-5 sm:px-8 md:mt-14"
          dangerouslySetInnerHTML={{ __html: optimizeContentImages(post.contentHtml) }}
        />

        <div className="mx-auto mt-14 max-w-3xl px-5 sm:px-8">
          <div className="flex flex-col gap-4 border-y border-line py-6">
            <p className="font-serif text-xl text-ink">Bu yazıyı paylaşın</p>
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-16 px-5 sm:px-8">
          <AuthorBox />
          <RelatedServices />
        </div>
      </article>

      {others.length > 0 && (
        <section aria-labelledby="diger-yazilar" className="border-t border-line bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
            <h2 id="diger-yazilar" className="font-serif text-3xl text-ink">
              Diğer yazılar
            </h2>
            <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
