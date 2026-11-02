import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { PostCover } from "@/components/blog/post-cover";
import { PostMeta } from "@/components/blog/post-meta";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ViewCounter } from "@/components/blog/view-counter";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog/queries";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    timeRequired: `PT${post.readingMinutes}M`,
    author: { "@id": `${site.url}/#reyhan-eren` },
    publisher: { "@id": `${site.url}/#clinic` },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
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
          <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage-700 font-serif text-lg text-canvas"
            >
              R
            </span>
            <div>
              <p className="font-medium text-ink">{site.person}</p>
              <PostMeta publishedAt={post.publishedAt} readingMinutes={post.readingMinutes}>
                <ViewCounter slug={post.slug} />
              </PostMeta>
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="mx-auto mt-12 max-w-5xl px-5 sm:px-8">
            <PostCover
              src={post.coverImage}
              alt={post.coverAlt}
              title={post.title}
              priority
              className="aspect-[16/9] w-full rounded-2xl md:rounded-3xl"
            />
          </div>
        )}

        <div
          id="yazi-icerigi"
          className="prose-blog mx-auto mt-12 max-w-3xl px-5 sm:px-8 md:mt-14"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <aside className="mx-auto mt-16 max-w-3xl px-5 sm:px-8">
          <div className="rounded-3xl bg-sage-700 px-7 py-9 text-canvas sm:px-10">
            <p className="font-serif text-2xl leading-snug text-balance sm:text-[1.75rem]">
              Bu konuda birlikte çalışmak ister misiniz?
            </p>
            <p className="mt-3 max-w-lg leading-relaxed text-sage-100">
              Bayraklı’daki ofiste yüz yüze ya da Türkiye’nin her yerinden online
              görüşme için randevu oluşturabilirsiniz.
            </p>
            <Link
              href="/iletisim#randevu"
              className="mt-7 inline-flex min-h-12 items-center rounded-full bg-canvas px-6 font-medium text-ink transition-colors duration-150 hover:bg-surface"
            >
              Randevu Al
            </Link>
          </div>
        </aside>
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
