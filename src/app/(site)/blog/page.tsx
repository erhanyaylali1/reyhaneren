import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PostCard } from "@/components/blog/post-card";
import { getPublishedPosts } from "@/lib/blog/queries";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Aile, İlişkiler ve Çift Terapisi Üzerine Yazılar | Reyhan Eren",
  description:
    "Aile Danışmanı Reyhan Eren’den ilişkiler, ebeveynlik, iletişim ve çift terapisi üzerine yazılar.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 md:pb-32 md:pt-20">
      <header className="max-w-2xl">
        <p className="flex items-center gap-2.5 text-sm font-medium text-ink-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-sage-700" />
          Blog
        </p>
        <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.08] tracking-[-0.02em] text-ink text-balance sm:text-5xl">
          İlişkiler, aile ve
          <span className="italic text-sage-700"> kendimiz üzerine</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted text-pretty">
          Danışmanlık odasında en sık karşılaştığım sorular, gündelik hayata
          taşınabilecek küçük adımlar ve ilişkileri anlamaya dair notlar.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-16 rounded-2xl border border-line bg-surface px-6 py-12 text-center text-ink-muted">
          Yakında burada yeni yazılar olacak.
        </p>
      ) : (
        <>
          <div className="mt-14 border-t border-line pt-14 md:mt-20 md:pt-16">
            <PostCard post={featured} featured />
          </div>
          {rest.length > 0 && (
            <div className="mt-16 grid gap-x-10 gap-y-16 border-t border-line pt-14 sm:grid-cols-2 md:mt-20 md:pt-16 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
