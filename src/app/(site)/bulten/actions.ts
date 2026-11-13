"use server";

import { confirmationEmail, isMailConfigured, sendOne } from "@/lib/newsletter/mail";
import {
  findByEmail,
  isToken,
  markConfirmSent,
  unsubscribe as unsubscribeByToken,
  upsertPending,
} from "@/lib/newsletter/store";

export type SubscribeState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string; email?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESEND_AFTER_MS = 10 * 60 * 1000;

export async function subscribe(_: SubscribeState, formData: FormData): Promise<SubscribeState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website") ?? "")) return { status: "ok" };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return { status: "error", message: "Geçerli bir e-posta adresi girin.", email };
  }
  if (formData.get("consent") !== "on") {
    return { status: "error", message: "Devam etmek için onay kutusunu işaretleyin.", email };
  }

  try {
    const existing = await findByEmail(email);
    // Same answer whether or not the address is already on the list, so the
    // form can't be used to find out who is subscribed.
    if (existing?.status === "confirmed") return { status: "ok" };
    if (
      existing?.status === "pending" &&
      existing.confirmSentAt &&
      Date.now() - new Date(existing.confirmSentAt).getTime() < RESEND_AFTER_MS
    ) {
      return { status: "ok" };
    }

    if (!isMailConfigured()) {
      console.warn("[bülten] e-posta gönderimi ayarlı değil; abonelik alınamadı.");
      return { status: "error", message: "Bülten şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.", email };
    }

    const sub = await upsertPending(email);
    await sendOne(confirmationEmail(sub.email, sub.token));
    await markConfirmSent(sub.email);
    return { status: "ok" };
  } catch (err) {
    console.error("[bülten] abonelik hatası", err);
    return { status: "error", message: "Bir sorun oluştu. Lütfen biraz sonra tekrar deneyin.", email };
  }
}

export type UnsubscribeState = { status: "idle" } | { status: "done" } | { status: "error" };

export async function unsubscribe(_: UnsubscribeState, formData: FormData): Promise<UnsubscribeState> {
  const token = formData.get("t");
  if (!isToken(token)) return { status: "error" };
  try {
    return (await unsubscribeByToken(token)) ? { status: "done" } : { status: "error" };
  } catch (err) {
    console.error("[bülten] abonelikten çıkma hatası", err);
    return { status: "error" };
  }
}
