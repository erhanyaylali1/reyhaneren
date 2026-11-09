"use client";

import { useActionState } from "react";
import { changePin, type FormState } from "@/app/admin/actions";

const fields = [
  { name: "current", label: "Mevcut PIN" },
  { name: "next", label: "Yeni PIN" },
  { name: "confirm", label: "Yeni PIN (tekrar)" },
] as const;

export function ChangePinForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changePin, undefined);
  return (
    <form action={action} key={state?.ok} className="space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="block text-sm text-ink">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type="password"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            required
            autoComplete={f.name === "current" ? "current-password" : "new-password"}
            className="mt-1.5 h-11 w-40 rounded-xl border border-line-strong bg-canvas px-3.5 font-serif text-xl tracking-[0.4em] text-ink transition-colors duration-150 focus-visible:border-sage-700"
          />
        </div>
      ))}
      <p aria-live="polite" className="min-h-5 text-sm">
        {state?.error && <span className="text-clay-700">{state.error}</span>}
        {state?.ok && <span className="text-sage-700">{state.ok}</span>}
      </p>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center rounded-full bg-sage-700 px-6 font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 disabled:opacity-60"
      >
        {pending ? "Kaydediliyor…" : "PIN’i güncelle"}
      </button>
    </form>
  );
}
