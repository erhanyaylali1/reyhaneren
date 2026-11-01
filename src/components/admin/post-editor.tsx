"use client";

/* eslint-disable @next/next/no-img-element -- previews of arbitrary/data URLs */

import Link from "next/link";
import { useActionState, useEffect, useMemo, useState } from "react";
import { savePost, type FormState } from "@/app/admin/actions";
import { uploadImageFile } from "@/lib/image";
import { countWords, htmlToText, readingMinutes, slugify } from "@/lib/blog/text";
import type { Post } from "@/lib/blog/types";
import { Icon } from "./icons";
import { RichTextEditor } from "./rich-text-editor";

const label = "text-xs font-medium uppercase tracking-[0.14em] text-ink-muted";
const field =
  "w-full rounded-xl border border-line-strong bg-surface px-3.5 text-[0.9375rem] text-ink placeholder:text-ink-muted/70 transition-colors duration-150 focus-visible:border-sage-700";

export function PostEditor({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePost, undefined);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [cover, setCover] = useState<string | null>(post?.coverImage ?? null);
  const [coverAlt, setCoverAlt] = useState(post?.coverAlt ?? "");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverBusy, setCoverBusy] = useState(false);
  const [coverError, setCoverError] = useState<string | null>(null);
  const [html, setHtml] = useState(post?.contentHtml ?? "");

  const effectiveSlug = slugTouched ? slug : slugify(title);
  const stats = useMemo(
    () => ({ words: countWords(htmlToText(html)), minutes: readingMinutes(html) }),
    [html],
  );

  // Warn before leaving with unsaved changes.
  const [initial] = useState(() => ({ title, excerpt, cover, coverAlt, html, slug: effectiveSlug }));
  const dirty =
    title !== initial.title ||
    excerpt !== initial.excerpt ||
    cover !== initial.cover ||
    coverAlt !== initial.coverAlt ||
    html !== initial.html ||
    effectiveSlug !== initial.slug;
  useEffect(() => {
    if (!dirty || pending) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, pending]);

  const isPublished = post?.status === "published";

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
      <input type="hidden" name="id" value={post?.id ?? ""} />
      <input type="hidden" name="contentHtml" value={html} />
      <input type="hidden" name="coverImage" value={cover ?? ""} />
      <input type="hidden" name="slug" value={effectiveSlug} />

      {/* ─── Main column ─── */}
      <div className="min-w-0">
        <label htmlFor="title" className="sr-only">
          Başlık
        </label>
        <textarea
          id="title"
          name="title"
          required
          maxLength={160}
          rows={1}
          value={title}
          onChange={(e) => setTitle(e.target.value.replace(/\n/g, " "))}
          placeholder="Yazının başlığı"
          className="field-sizing-content w-full resize-none bg-transparent font-serif text-[2.25rem] leading-[1.15] tracking-[-0.02em] text-ink placeholder:text-ink-muted/50 focus-visible:outline-none sm:text-[2.75rem]"
        />

        <div className="mt-6">
          <RichTextEditor initialHtml={post?.contentHtml ?? ""} onChange={setHtml} />
          <p className="mt-3 flex gap-3 text-sm text-ink-muted">
            <span>{stats.words.toLocaleString("tr-TR")} kelime</span>
            <span aria-hidden="true">·</span>
            <span>Ortalama {stats.minutes} dk okuma</span>
          </p>
        </div>
      </div>

      {/* ─── Sidebar ─── */}
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <section className="rounded-2xl border border-line bg-surface p-5">
          <p className={label}>Yayın</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-ink">
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${isPublished ? "bg-sage-700" : "bg-line-strong"}`}
            />
            {post ? (isPublished ? "Yayında" : "Taslak") : "Yeni yazı"}
          </p>

          {state?.error && (
            <p role="alert" className="mt-4 rounded-lg bg-clay-100 px-3 py-2.5 text-sm text-clay-700">
              {state.error}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-2">
            <button
              type="submit"
              name="status"
              value="published"
              disabled={pending || coverBusy}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-sage-700 px-5 font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink disabled:opacity-60"
            >
              {pending ? "Kaydediliyor…" : isPublished ? "Güncelle" : "Yayınla"}
            </button>
            <button
              type="submit"
              name="status"
              value="draft"
              disabled={pending || coverBusy}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-line-strong px-5 font-medium text-ink transition-colors duration-150 hover:border-ink hover:bg-canvas disabled:opacity-60"
            >
              {isPublished ? "Yayından kaldır, taslağa al" : "Taslak olarak kaydet"}
            </button>
            {isPublished && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="mt-1 inline-flex items-center justify-center gap-1.5 text-sm text-ink-muted transition-colors duration-150 hover:text-ink"
              >
                Yazıyı sitede gör <Icon name="external" className="size-3.5" />
              </Link>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-surface p-5">
          <p className={label}>Kapak görseli</p>
          {cover ? (
            <div className="mt-3">
              <img src={cover} alt="" className="aspect-[3/2] w-full rounded-xl bg-sand-100 object-cover" />
              <div className="mt-2 flex gap-2">
                <label className="inline-flex h-9 cursor-pointer items-center rounded-lg px-3 text-sm text-ink-muted transition-colors duration-150 hover:bg-sage-50 hover:text-ink">
                  Değiştir
                  <CoverFileInput
                    onBusy={setCoverBusy}
                    onError={setCoverError}
                    onDone={setCover}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setCover(null)}
                  className="inline-flex h-9 items-center rounded-lg px-3 text-sm text-ink-muted transition-colors duration-150 hover:bg-clay-100 hover:text-clay-700"
                >
                  Kaldır
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <label className="flex aspect-[3/2] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line-strong text-sm text-ink-muted transition-colors duration-150 hover:border-sage-700 hover:text-ink">
                <Icon name="upload" className="size-5" />
                {coverBusy ? "Yükleniyor…" : "Görsel yükle"}
                <span className="text-xs">JPG, PNG, WebP</span>
                <CoverFileInput onBusy={setCoverBusy} onError={setCoverError} onDone={setCover} />
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  aria-label="Kapak görseli bağlantısı"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="ya da görsel bağlantısı"
                  inputMode="url"
                  className={`${field} h-9 text-sm`}
                />
                <button
                  type="button"
                  disabled={!/^https?:\/\/\S+$/.test(coverUrl.trim())}
                  onClick={() => {
                    setCover(coverUrl.trim());
                    setCoverUrl("");
                  }}
                  className="inline-flex h-9 shrink-0 items-center rounded-lg bg-sage-700 px-3 text-sm font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 disabled:opacity-40"
                >
                  Ekle
                </button>
              </div>
            </div>
          )}
          {coverError && <p className="mt-2 text-sm text-clay-700">{coverError}</p>}
          <label htmlFor="coverAlt" className="mt-4 block text-sm text-ink">
            Görsel açıklaması
          </label>
          <input
            id="coverAlt"
            name="coverAlt"
            value={coverAlt}
            onChange={(e) => setCoverAlt(e.target.value)}
            placeholder="Görme engelli okurlar ve Google için"
            className={`${field} mt-1.5 h-10 text-sm`}
          />
        </section>

        <section className="rounded-2xl border border-line bg-surface p-5">
          <label htmlFor="excerpt" className={label}>
            Özet
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={4}
            maxLength={260}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Boş bırakırsanız yazının ilk cümlelerinden oluşturulur."
            className={`${field} mt-3 resize-y py-2.5 text-sm leading-relaxed`}
          />
          <p className="mt-1.5 text-right text-xs tabular-nums text-ink-muted">{excerpt.length}/260</p>

          <label htmlFor="slug-input" className={`${label} mt-4 block`}>
            Sayfa adresi
          </label>
          <div className="mt-3 flex items-center rounded-xl border border-line-strong bg-surface pl-3.5 text-sm focus-within:border-sage-700">
            <span className="shrink-0 text-ink-muted">/blog/</span>
            <input
              id="slug-input"
              value={effectiveSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value) + (e.target.value.endsWith("-") ? "-" : ""));
              }}
              className="h-10 min-w-0 flex-1 bg-transparent pr-3.5 text-ink focus-visible:outline-none"
              placeholder="yazi-adresi"
            />
          </div>
          {isPublished && slug !== post.slug && (
            <p className="mt-1.5 text-xs text-clay-700">
              Adres değişirse eski bağlantılar çalışmaz.
            </p>
          )}
        </section>
      </aside>
    </form>
  );
}

function CoverFileInput({
  onBusy,
  onError,
  onDone,
}: {
  onBusy: (b: boolean) => void;
  onError: (e: string | null) => void;
  onDone: (src: string) => void;
}) {
  return (
    <input
      type="file"
      accept="image/*"
      className="sr-only"
      onChange={async (e) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;
        onBusy(true);
        onError(null);
        try {
          onDone(await uploadImageFile(file));
        } catch (err) {
          onError(err instanceof Error ? err.message : "Görsel yüklenemedi.");
        } finally {
          onBusy(false);
        }
      }}
    />
  );
}
