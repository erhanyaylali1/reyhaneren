import Link from "next/link";
import type { PostSummary } from "@/lib/blog/types";
import { PostCover } from "./post-cover";
import { PostMeta } from "./post-meta";

export function PostCard({ post, featured = false }: { post: PostSummary; featured?: boolean }) {
  return (
    <article
      className={`group relative flex flex-col ${featured ? "gap-8 md:grid md:grid-cols-12 md:items-center md:gap-12" : "gap-5"}`}
    >
      <PostCover
        src={post.coverImage}
        alt={post.coverAlt}
        title={post.title}
        priority={featured}
        className={`aspect-[3/2] w-full rounded-2xl transition-opacity duration-150 group-hover:opacity-90 ${featured ? "md:col-span-7 md:rounded-3xl" : ""}`}
      />
      <div className={featured ? "md:col-span-5" : ""}>
        <PostMeta publishedAt={post.publishedAt} readingMinutes={post.readingMinutes} />
        <h2
          className={`mt-3 font-serif tracking-[-0.01em] text-ink text-balance ${featured ? "text-3xl leading-tight md:text-[2.5rem]" : "text-2xl leading-snug"}`}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="decoration-line-strong underline-offset-4 group-hover:underline after:absolute after:inset-0"
          >
            {post.title}
          </Link>
        </h2>
        <p className={`mt-3 leading-relaxed text-ink-muted text-pretty ${featured ? "text-lg" : ""}`}>
          {post.excerpt}
        </p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-sage-700">
          Devamını oku
          <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
        </p>
      </div>
    </article>
  );
}
