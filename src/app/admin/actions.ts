"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/dal";
import { SESSION_COOKIE, SESSION_TTL_MS, createSessionToken } from "@/lib/auth/session";
import { POSTS_TAG } from "@/lib/blog/queries";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/lib/blog/prepare";
import {
  checkPin,
  clearLoginFailures,
  getLoginLock,
  getSessionVersion,
  insertPost,
  recordFailedLogin,
  removePost,
  setPin,
  updatePost,
  uploadImage as storeImage,
} from "@/lib/blog/store";
import { countImagesMissingAlt, htmlToText } from "@/lib/blog/text";
import type { PostStatus } from "@/lib/blog/types";
import { notifySubscribers } from "@/lib/newsletter/notify";
import { remove as removeSubscriber } from "@/lib/newsletter/store";

export type FormState = { error?: string; ok?: string } | undefined;

// ─── Brute-force guard ──────────────────────────────────────────────────────
// A 4-digit PIN has only 10 000 combinations, so failed attempts are counted
// per IP in the database and the IP is locked for 15 minutes after 5 misses.

async function clientKey() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
}

async function setSessionCookie(version: number) {
  (await cookies()).set(SESSION_COOKIE, await createSessionToken(version), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

const isPin = (v: unknown): v is string => typeof v === "string" && /^\d{4}$/.test(v);

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const key = await clientKey();
  const lockedUntil = await getLoginLock(key);
  if (lockedUntil) {
    const min = Math.ceil((lockedUntil.getTime() - Date.now()) / 60000);
    return { error: `Çok fazla hatalı deneme. ${min} dakika sonra tekrar deneyin.` };
  }

  const pin = formData.get("pin");
  if (!isPin(pin) || !(await checkPin(pin))) {
    const { remaining, locked } = await recordFailedLogin(key);
    return {
      error: locked
        ? "Çok fazla hatalı deneme. 15 dakika sonra tekrar deneyin."
        : `PIN hatalı. ${remaining} deneme hakkınız kaldı.`,
    };
  }

  await clearLoginFailures(key);
  await setSessionCookie(await getSessionVersion());
  redirect("/admin/blog");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin");
}

// ─── Posts ──────────────────────────────────────────────────────────────────

export async function savePost(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const str = (k: string) => String(formData.get(k) ?? "");
  const id = str("id");
  const title = str("title").trim();
  const contentHtml = str("contentHtml");
  const status: PostStatus = str("status") === "published" ? "published" : "draft";

  if (!title) return { error: "Başlık boş olamaz." };
  if (title.length > 160) return { error: "Başlık en fazla 160 karakter olabilir." };
  if (status === "published" && !htmlToText(contentHtml) && !/<(img|iframe)/.test(contentHtml)) {
    return { error: "Boş bir yazı yayınlanamaz. İçerik ekleyin ya da taslak olarak kaydedin." };
  }

  // Alt text is mandatory for anything that goes public (accessibility + image SEO).
  // Drafts may be saved incomplete.
  if (status === "published") {
    if (str("coverImage") && !str("coverAlt").trim()) {
      return { error: "Kapak görseli için açıklama (alt metin) girin. Yayınlamak için zorunludur." };
    }
    const missing = countImagesMissingAlt(contentHtml);
    if (missing > 0) {
      return {
        error: `Yazıdaki ${missing} görselin açıklaması (alt metin) eksik. Görsele tıklayıp “Alt metin” alanını doldurun ya da taslak olarak kaydedin.`,
      };
    }
  }

  const input = {
    title,
    slug: str("slug"),
    excerpt: str("excerpt"),
    coverImage: str("coverImage") || null,
    coverAlt: str("coverAlt"),
    contentHtml,
    status,
  };

  const post = id ? await updatePost(id, input) : await insertPost(input);
  if (!post) return { error: "Yazı bulunamadı. Silinmiş olabilir." };

  updateTag(POSTS_TAG);

  // First publish → e-mail confirmed subscribers (no-op for drafts and for
  // posts that were already sent).
  const mail = await notifySubscribers(post).catch((err) => {
    console.error("[bülten]", err);
    return { kind: "failed" } as const;
  });
  const params = new URLSearchParams({ kaydedildi: post.title });
  if (mail.kind === "sent") params.set("bulten", `${mail.sent}/${mail.total}`);
  if (mail.kind === "failed" || mail.kind === "not-configured") params.set("bulten", mail.kind);
  redirect(`/admin/blog?${params}`);
}

export async function deletePost(id: string) {
  await requireAdmin();
  await removePost(id);
  updateTag(POSTS_TAG);
}

// ─── Newsletter ─────────────────────────────────────────────────────────────

export async function deleteSubscriber(email: string) {
  await requireAdmin();
  if (typeof email !== "string" || !email.includes("@")) return;
  await removeSubscriber(email.toLowerCase());
  revalidatePath("/admin/bulten");
}

// ─── Images ─────────────────────────────────────────────────────────────────

export async function uploadImage(
  formData: FormData,
): Promise<{ url: string } | { error: string }> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Dosya bulunamadı." };
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: "Yalnızca JPG, PNG, WebP veya GIF yükleyebilirsiniz." };
  }
  if (file.size > MAX_IMAGE_BYTES) return { error: "Görsel en fazla 5 MB olabilir." };
  try {
    return { url: await storeImage(file) };
  } catch (err) {
    console.error(err);
    return { error: "Görsel yüklenemedi. Lütfen tekrar deneyin." };
  }
}

// ─── Settings ───────────────────────────────────────────────────────────────

export async function changePin(_: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const current = formData.get("current");
  const next = formData.get("next");
  const confirm = formData.get("confirm");

  if (!isPin(current) || !(await checkPin(current))) return { error: "Mevcut PIN hatalı." };
  if (!isPin(next)) return { error: "Yeni PIN 4 haneli bir sayı olmalı." };
  if (next !== confirm) return { error: "Yeni PIN ile tekrarı eşleşmiyor." };
  if (next === current) return { error: "Yeni PIN eskisiyle aynı olamaz." };

  // Re-issue this device's cookie; every other device is signed out.
  await setSessionCookie(await setPin(next));
  return { ok: "PIN güncellendi. Diğer cihazlardaki oturumlar kapatıldı." };
}
