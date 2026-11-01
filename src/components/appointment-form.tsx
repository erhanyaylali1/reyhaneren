"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

// Public by design: EmailJS keys are meant to live in the browser. Abuse is
// limited by the dashboard's allowed-origins setting + the throttle below.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
// Optional: confirmation email to the client. Only sent when they left an
// email address, so EmailJS's built-in auto-reply (which can't skip empty
// recipients) isn't used.
const AUTOREPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;

const services = [
  "Birey Odaklı Aile Danışmanlığı",
  "Çift Terapisi",
  "Aile Terapisi",
  "Kurumsal Danışmanlık",
  "Henüz emin değilim",
] as const;

const formats = [
  { value: "Yüz yüze (Bayraklı, İzmir)", label: "Yüz yüze", hint: "Bayraklı, İzmir" },
  { value: "Online", label: "Online", hint: "Görüntülü görüşme" },
] as const;

type Field = "name" | "phone" | "email" | "service" | "consent";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "error";

// Accepts 05xx…, 5xx…, +90 5xx…, 0232… with any spacing. Returns +90XXXXXXXXXX.
function normalizePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("90") && d.length === 12) d = d.slice(2);
  if (d.startsWith("0") && d.length === 11) d = d.slice(1);
  return /^[2-5]\d{9}$/.test(d) ? `+90${d}` : null;
}

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  if (name.split(/\s+/).filter(Boolean).length < 2)
    errors.name = "Lütfen adınızı ve soyadınızı yazın.";
  if (!normalizePhone(String(data.get("phone") ?? "")))
    errors.phone = "Lütfen geçerli bir telefon numarası yazın, örneğin 0532 123 45 67.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "E-posta adresi geçerli görünmüyor; örneğin ad@ornek.com.";
  if (!data.get("service")) errors.service = "Lütfen bir hizmet seçin.";
  if (!data.get("consent"))
    errors.consent = "Devam etmek için onay kutusunu işaretlemeniz gerekiyor.";
  return errors;
}

const fieldOrder: Field[] = ["name", "phone", "email", "service", "consent"];

const labelClass = "block text-[0.9375rem] font-medium text-ink";
const optionalClass = "font-normal text-ink-muted";
const controlClass =
  "mt-2 block min-h-12 w-full rounded-xl border border-line-strong bg-surface px-4 text-base text-ink transition-colors duration-150 hover:border-ink-muted focus-visible:border-sage-700 focus-visible:outline-offset-0 aria-[invalid=true]:border-clay-700";
const errorClass = "mt-2 flex items-start gap-1.5 text-sm text-clay-700";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={errorClass}>
      <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6.25" />
        <path d="M8 4.75v3.75M8 10.75v.5" strokeLinecap="round" />
      </svg>
      {message}
    </p>
  );
}

export function AppointmentForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never see or fill this field.
    if (String(data.get("website") ?? "")) {
      setStatus("success");
      return;
    }

    const found = validate(data);
    setErrors(found);
    const first = fieldOrder.find((f) => found[f]);
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (!configured) {
      console.error(
        "EmailJS yapılandırılmamış: NEXT_PUBLIC_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY eksik.",
      );
      setStatus("error");
      return;
    }

    const clientEmail = String(data.get("email") ?? "").trim();
    const params = {
      name: String(data.get("name")).trim(),
      phone: normalizePhone(String(data.get("phone")))!,
      email: clientEmail || "Belirtilmedi",
      service: String(data.get("service")),
      format: String(data.get("format") ?? "Belirtilmedi"),
      message: String(data.get("message") ?? "").trim() || "—",
    };

    setStatus("sending");
    // Loaded on submit so the EmailJS SDK stays out of the initial bundle.
    const { send } = await import("@emailjs/browser");
    try {
      await send(SERVICE_ID!, TEMPLATE_ID!, params, {
        publicKey: PUBLIC_KEY!,
        blockHeadless: true,
        limitRate: { id: "randevu-formu", throttle: 60_000 },
      });
    } catch (err) {
      console.error("EmailJS gönderim hatası", err);
      setStatus("error");
      return;
    }

    // The request already reached the counsellor; a failed confirmation
    // email must not turn that into an error for the client.
    if (clientEmail && AUTOREPLY_TEMPLATE_ID) {
      try {
        await send(
          SERVICE_ID!,
          AUTOREPLY_TEMPLATE_ID,
          { ...params, to_email: clientEmail },
          { publicKey: PUBLIC_KEY!, blockHeadless: true },
        );
      } catch (err) {
        console.error("EmailJS otomatik yanıt hatası", err);
      }
    }

    form.reset();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-line bg-surface p-8 sm:p-10"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-sage-100 text-sage-700">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 className="mt-6 font-serif text-[1.75rem] leading-tight text-ink">
          Talebiniz bize ulaştı
        </h3>
        <p className="mt-3 max-w-md leading-relaxed text-ink-muted">
          Teşekkür ederiz. Randevunuzu planlamak için en kısa sürede
          bıraktığınız telefon numarasından sizi arayacağız.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-ink"
        >
          Yeni bir talep oluştur
        </button>
      </div>
    );
  }

  const describedBy = (field: Field, hint?: string) =>
    [hint, errors[field] ? `${field}-hata` : null].filter(Boolean).join(" ") || undefined;

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="randevu-baslik"
      className="rounded-3xl border border-line bg-surface p-6 sm:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelClass}>Ad soyad</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={controlClass}
          />
          <FieldError id="name-hata" message={errors.name} />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Telefon</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", "phone-ipucu")}
            className={controlClass}
          />
          <p id="phone-ipucu" className="mt-2 text-sm text-ink-muted">
            Sizi bu numaradan arayacağız.
          </p>
          <FieldError id="phone-hata" message={errors.phone} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            E-posta <span className={optionalClass}>(isteğe bağlı)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={controlClass}
          />
          <FieldError id="email-hata" message={errors.email} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelClass}>Hangi hizmetle ilgileniyorsunuz?</label>
          <div className="relative">
            <select
              id="service"
              name="service"
              required
              defaultValue=""
              aria-invalid={Boolean(errors.service)}
              aria-describedby={describedBy("service")}
              className={`${controlClass} appearance-none pr-11`}
            >
              <option value="" disabled>Bir hizmet seçin</option>
              {services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-4 top-1/2 mt-1 size-4 -translate-y-1/2 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </div>
          <FieldError id="service-hata" message={errors.service} />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={labelClass}>
            Görüşme biçimi <span className={optionalClass}>(isteğe bağlı)</span>
          </legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {formats.map((f) => (
              <label
                key={f.value}
                className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 transition-colors duration-150 hover:border-ink-muted has-[:checked]:border-sage-700 has-[:checked]:bg-sage-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-sage-700"
              >
                <input
                  type="radio"
                  name="format"
                  value={f.value}
                  className="size-4 accent-sage-700 focus-visible:outline-none"
                />
                <span className="text-ink">
                  {f.label}
                  <span className="block text-sm text-ink-muted">{f.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Eklemek istedikleriniz <span className={optionalClass}>(isteğe bağlı)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={1000}
            aria-describedby="message-ipucu"
            className={`${controlClass} min-h-28 resize-y py-3 leading-relaxed`}
          />
          <p id="message-ipucu" className="mt-2 text-sm text-ink-muted">
            Ayrıntıları ilk görüşmede konuşacağız; burada yalnızca kısa bir not
            bırakmanız yeterli.
          </p>
        </div>

        {/* Honeypot — hidden from people and assistive tech. */}
        <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
          <label htmlFor="website">Web siteniz</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              required
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describedBy("consent")}
              className="mt-1 size-5 shrink-0 accent-sage-700"
            />
            <span className="text-[0.9375rem] leading-relaxed text-ink-muted">
              Paylaştığım kişisel verilerin, randevu talebim için benimle
              iletişime geçilmesi amacıyla KVKK kapsamında işlenmesini kabul
              ediyorum.
            </span>
          </label>
          <FieldError id="consent-hata" message={errors.consent} />
        </div>
      </div>

      <div aria-live="polite" className="empty:hidden">
        {status === "error" && (
          <p className="mt-8 rounded-xl bg-clay-100 px-4 py-3 text-[0.9375rem] leading-relaxed text-clay-700">
            Talebiniz şu anda gönderilemedi. Lütfen birazdan tekrar deneyin ya
            da{" "}
            <a href={site.phone.href} className="font-medium underline underline-offset-4">
              {site.phone.display}
            </a>{" "}
            numarasından bizi arayın.
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-sage-700 px-8 text-base font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 active:bg-ink disabled:cursor-wait disabled:bg-sage-700/70"
        >
          {status === "sending" ? "Gönderiliyor…" : "Randevu talebi gönder"}
        </button>
        <p className="text-sm text-ink-muted">
          Bilgileriniz yalnızca randevu için kullanılır.
        </p>
      </div>
    </form>
  );
}
