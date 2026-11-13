import "server-only";
import { htmlToText } from "@/lib/blog/text";
import type { Post } from "@/lib/blog/types";
import { site } from "@/lib/site";

/*
  E-mail delivery through Resend (https://resend.com) — plain fetch, no SDK.

  Env:
    RESEND_API_KEY    API key from Resend
    NEWSLETTER_FROM   Sender on a domain verified in Resend,
                      e.g. "Reyhan Eren <bulten@reyhaneren.com.tr>"

  Without these, nothing is sent and the reason is logged (local dev).
*/

const API = "https://api.resend.com";
const BATCH_SIZE = 100; // Resend batch endpoint limit

export function isMailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.NEWSLETTER_FROM);
}

type Email = {
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
};

async function resend(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

const withFrom = (e: Email) => ({ from: process.env.NEWSLETTER_FROM, reply_to: site.email, ...e });

export async function sendOne(email: Email) {
  if (!isMailConfigured()) {
    console.warn(`[bülten] RESEND_API_KEY / NEWSLETTER_FROM yok — "${email.subject}" gönderilmedi.`);
    return false;
  }
  await resend("/emails", withFrom(email));
  return true;
}

/** Sends in batches of 100. Returns how many were accepted by Resend. */
export async function sendMany(emails: Email[]) {
  if (!isMailConfigured()) {
    console.warn(`[bülten] RESEND_API_KEY / NEWSLETTER_FROM yok — ${emails.length} e-posta gönderilmedi.`);
    return 0;
  }
  let sent = 0;
  for (let i = 0; i < emails.length; i += BATCH_SIZE) {
    const chunk = emails.slice(i, i + BATCH_SIZE);
    try {
      await resend("/emails/batch", chunk.map(withFrom));
      sent += chunk.length;
    } catch (err) {
      console.error("[bülten] gönderim hatası", err);
    }
  }
  return sent;
}

// ─── Links ──────────────────────────────────────────────────────────────────

// In `npm run dev` the confirm/unsubscribe/post links point at localhost so
// the whole flow can be tested before deploying. (Images still need a public
// URL — e-mail clients can't load localhost.)
const BASE =
  process.env.NODE_ENV === "development"
    ? (process.env.NEWSLETTER_DEV_URL ?? "http://localhost:3000")
    : site.url;

export const confirmUrl = (token: string) => `${BASE}/bulten/onay?t=${token}`;
export const unsubscribeUrl = (token: string) => `${BASE}/bulten/ayril?t=${token}`;
const oneClickUrl = (token: string) => `${BASE}/api/bulten/ayril?t=${token}`;

/** Lets Gmail/Outlook show their own "Abonelikten çık" button (RFC 8058). */
const unsubscribeHeaders = (token: string) => ({
  "List-Unsubscribe": `<${oneClickUrl(token)}>`,
  "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
});

// ─── Template ───────────────────────────────────────────────────────────────

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const C = {
  canvas: "#f6f2ec",
  surface: "#fbf9f5",
  line: "#e3dcd1",
  ink: "#1f2a25",
  muted: "#55605a",
  sage: "#3f5b4c",
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function layout(opts: { preheader: string; body: string; footer: string }) {
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${esc(site.name)}</title>
</head>
<body style="margin:0;padding:0;background:${C.canvas};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.canvas};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
      <tr><td style="padding:0 4px 20px;font-family:${SERIF};font-size:20px;color:${C.ink};">
        <a href="${site.url}" style="color:${C.ink};text-decoration:none;">${esc(site.person)}</a>
        <span style="font-family:${SANS};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${C.muted};">&nbsp;·&nbsp;${esc(site.title)}</span>
      </td></tr>
      <tr><td style="background:${C.surface};border:1px solid ${C.line};border-radius:20px;overflow:hidden;">
        ${opts.body}
      </td></tr>
      <tr><td style="padding:24px 8px 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.muted};text-align:center;">
        ${opts.footer}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:${C.sage};color:${C.canvas};font-family:${SANS};font-size:15px;font-weight:600;text-decoration:none;padding:13px 26px;border-radius:999px;">${esc(label)}</a>`;

// ─── Confirmation (double opt-in) ───────────────────────────────────────────

export function confirmationEmail(to: string, token: string): Email {
  const url = confirmUrl(token);
  const html = layout({
    preheader: "Aboneliğinizi onaylamak için tek bir tık yeterli.",
    body: `<div style="padding:36px 32px;">
      <h1 style="margin:0;font-family:${SERIF};font-weight:normal;font-size:26px;line-height:1.25;color:${C.ink};">Aboneliğinizi onaylayın</h1>
      <p style="margin:16px 0 0;font-family:${SANS};font-size:16px;line-height:1.65;color:${C.muted};">
        Blog bültenine kaydolmak istediğiniz için teşekkürler. Yeni bir yazı yayımlandığında size haber verebilmem için lütfen e-posta adresinizi onaylayın.
      </p>
      <p style="margin:28px 0 0;">${button(url, "Aboneliğimi onayla")}</p>
      <p style="margin:28px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.muted};">
        Bu isteği siz yapmadıysanız bu e-postayı yok sayabilirsiniz; onaylamadığınız sürece size başka e-posta gönderilmez.
      </p>
    </div>`,
    footer: `${esc(site.name)} · <a href="${site.url}/kvkk-ve-gizlilik" style="color:${C.muted};">KVKK ve Gizlilik</a>`,
  });
  const text = `Aboneliğinizi onaylayın

Blog bültenine kaydolmak istediğiniz için teşekkürler. Onaylamak için:
${url}

Bu isteği siz yapmadıysanız bu e-postayı yok sayabilirsiniz.

${site.name}`;
  return { to, subject: "Bülten aboneliğinizi onaylayın", html, text };
}

// ─── New post ───────────────────────────────────────────────────────────────

function absoluteImage(src: string | null) {
  if (!src || src.startsWith("data:")) return null;
  return src.startsWith("/") ? `${site.url}${src}` : src;
}

function summary(post: Post, max = 280) {
  const base = post.excerpt.trim() || htmlToText(post.contentHtml);
  if (base.length <= max) return base;
  return `${base.slice(0, base.lastIndexOf(" ", max) > 0 ? base.lastIndexOf(" ", max) : max)}…`;
}

export function newPostEmails(post: Post, recipients: { email: string; token: string }[]): Email[] {
  const url = `${BASE}/blog/${post.slug}?utm_source=bulten&utm_medium=email&utm_campaign=yeni-yazi`;
  const image = absoluteImage(post.coverImage);
  const intro = summary(post);

  const body = `${
    image
      ? `<a href="${url}"><img src="${esc(image)}" alt="${esc(post.coverAlt || post.title)}" width="560" style="display:block;width:100%;height:auto;border:0;"></a>`
      : ""
  }
    <div style="padding:32px 32px 36px;">
      <p style="margin:0;font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${C.sage};">Yeni yazı · ${post.readingMinutes} dk okuma</p>
      <h1 style="margin:12px 0 0;font-family:${SERIF};font-weight:normal;font-size:28px;line-height:1.2;color:${C.ink};">
        <a href="${url}" style="color:${C.ink};text-decoration:none;">${esc(post.title)}</a>
      </h1>
      <p style="margin:16px 0 0;font-family:${SANS};font-size:16px;line-height:1.65;color:${C.muted};">${esc(intro)}</p>
      <p style="margin:28px 0 0;">${button(url, "Yazının devamını okuyun")}</p>
    </div>`;

  return recipients.map(({ email, token }) => ({
    to: email,
    subject: post.title,
    html: layout({
      preheader: intro,
      body,
      footer: `Bu e-postayı ${esc(site.name)} blog bültenine abone olduğunuz için alıyorsunuz.<br>
        <a href="${unsubscribeUrl(token)}" style="color:${C.muted};">Abonelikten çık</a> ·
        <a href="${site.url}/kvkk-ve-gizlilik" style="color:${C.muted};">KVKK ve Gizlilik</a>`,
    }),
    text: `Yeni yazı: ${post.title}

${intro}

Devamını okuyun: ${url}

—
Abonelikten çıkmak için: ${unsubscribeUrl(token)}`,
    headers: unsubscribeHeaders(token),
  }));
}
