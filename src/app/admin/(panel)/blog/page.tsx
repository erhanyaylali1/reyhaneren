/* eslint-disable @next/next/no-img-element -- thumbnails of arbitrary/data URLs */
import Link from "next/link";
import { DeletePostButton } from "@/components/admin/delete-post-button";
import { Icon } from "@/components/admin/icons";
import { requireAdmin } from "@/lib/auth/dal";
import { listPosts } from "@/lib/blog/store";
import { formatDate, formatNumber } from "@/lib/blog/text";

export const metadata = { title: "Yazılar" };

export default async function AdminPostsPage({ searchParams }: PageProps<"/admin/blog">) {
  await requireAdmin();
  const posts = await listPosts({ includeDrafts: true });
  const saved = (await searchParams).kaydedildi;

  const published = posts.filter((p) => p.status === "published");
  const stats = [
    { label: "Toplam yazı", value: posts.length },
    { label: "Yayında", value: published.length },
    { label: "Taslak", value: posts.length - published.length },
    { label: "Toplam görüntülenme", value: posts.reduce((n, p) => n + p.views, 0) },
  ];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[2.25rem] leading-tight tracking-[-0.01em] text-ink">Yazılar</h1>
          <p className="mt-1 text-ink-muted">Blog yazılarını oluşturun, düzenleyin ve yayınlayın.</p>
        </div>
        <Link
          href="/admin/blog/yeni"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-sage-700 pl-4 pr-5 font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink"
        >
          <Icon name="plus" className="size-4" />
          Yeni yazı
        </Link>
      </div>

      {typeof saved === "string" && (
        <p role="status" className="mt-6 rounded-xl bg-sage-50 px-4 py-3 text-sm text-sage-800">
          “{saved}” kaydedildi.
        </p>
      )}

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface px-5 py-4">
            <dt className="text-sm text-ink-muted">{s.label}</dt>
            <dd className="mt-1 font-serif text-[1.75rem] tabular-nums text-ink">{formatNumber(s.value)}</dd>
          </div>
        ))}
      </dl>

      {posts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="font-serif text-xl text-ink">Henüz yazı yok</p>
          <p className="mt-1 text-ink-muted">İlk yazınızı oluşturarak başlayın.</p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {posts.map((p) => (
            <li key={p.id} className="flex items-center gap-4 px-4 py-4 sm:px-5">
              {p.coverImage ? (
                <img src={p.coverImage} alt="" className="hidden h-14 w-20 shrink-0 rounded-lg bg-sand-100 object-cover sm:block" />
              ) : (
                <span
                  aria-hidden="true"
                  className="hidden h-14 w-20 shrink-0 items-end rounded-lg bg-sage-50 p-2 font-serif text-2xl leading-none italic text-sage-700 sm:flex"
                >
                  {p.title.charAt(0)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/blog/${p.id}`}
                  className="block truncate font-medium text-ink decoration-line-strong underline-offset-4 hover:underline"
                >
                  {p.title}
                </Link>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.status === "published" ? "bg-sage-100 text-sage-800" : "bg-sand-100 text-sand-700"
                    }`}
                  >
                    {p.status === "published" ? "Yayında" : "Taslak"}
                  </span>
                  <span>{formatDate(p.publishedAt ?? p.updatedAt)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.readingMinutes} dk okuma</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Icon name="eye" className="size-3.5" />
                    {formatNumber(p.views)}
                    <span className="sr-only">görüntülenme</span>
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                {p.status === "published" && (
                  <Link
                    href={`/blog/${p.slug}`}
                    target="_blank"
                    title="Sitede gör"
                    aria-label={`“${p.title}” yazısını sitede gör`}
                    className="inline-flex size-9 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-sage-50 hover:text-ink"
                  >
                    <Icon name="external" />
                  </Link>
                )}
                <Link
                  href={`/admin/blog/${p.id}`}
                  title="Düzenle"
                  aria-label={`“${p.title}” yazısını düzenle`}
                  className="inline-flex size-9 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-sage-50 hover:text-ink"
                >
                  <Icon name="edit" />
                </Link>
                <DeletePostButton id={p.id} title={p.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
