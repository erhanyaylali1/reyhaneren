import "server-only";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { sanitizePostHtml } from "./sanitize";
import { makeExcerpt, readingMinutes, slugify } from "./text";
import type { PostInput, PostStatus } from "./types";

// Backend-agnostic rules shared by every store implementation.

export type PreparedPost = {
  baseSlug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  coverAlt: string;
  contentHtml: string;
  readingMinutes: number;
  status: PostStatus;
};

export function preparePost(input: PostInput): PreparedPost {
  const contentHtml = sanitizePostHtml(input.contentHtml);
  return {
    baseSlug: slugify(input.slug || input.title) || "yazi",
    title: input.title.trim(),
    excerpt: input.excerpt.trim() || makeExcerpt(contentHtml),
    coverImage: input.coverImage,
    coverAlt: input.coverAlt.trim(),
    contentHtml,
    readingMinutes: readingMinutes(contentHtml),
    status: input.status,
  };
}

/** First free slug: base, base-2, base-3 … */
export function firstFreeSlug(base: string, taken: Set<string>): string {
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  return slug;
}

export function hashPin(pin: string): string {
  const salt = randomBytes(16);
  return `${salt.toString("hex")}:${scryptSync(pin, salt, 32).toString("hex")}`;
}

export function verifyPin(pin: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(pin, Buffer.from(salt, "hex"), 32);
  return timingSafeEqual(candidate, Buffer.from(hash, "hex"));
}

export const initialPin = () => process.env.ADMIN_PIN ?? "1234";

export const LOGIN_MAX_FAILURES = 5;
export const LOGIN_LOCK_MS = 15 * 60 * 1000;

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
