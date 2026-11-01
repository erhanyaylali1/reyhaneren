"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { login, type FormState } from "@/app/admin/actions";

const LENGTH = 4;

export function PinForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, undefined);
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  // After a wrong PIN: clear (during render, per React docs) and refocus.
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state?.error) setDigits(Array(LENGTH).fill(""));
  }
  useEffect(() => {
    if (state?.error) inputs.current[0]?.focus();
  }, [state]);

  const fill = (start: number, value: string) => {
    const chars = value.replace(/\D/g, "").slice(0, LENGTH - start).split("");
    if (!chars.length) return;
    const next = [...digits];
    chars.forEach((c, i) => (next[start + i] = c));
    setDigits(next);
    const target = Math.min(start + chars.length, LENGTH - 1);
    inputs.current[target]?.focus();
    if (next.every(Boolean)) {
      // Let React commit the hidden input value, then submit.
      requestAnimationFrame(() => formRef.current?.requestSubmit());
    }
  };

  return (
    <form ref={formRef} action={action} className="mt-8">
      <input type="hidden" name="pin" value={digits.join("")} />
      <fieldset disabled={pending}>
        <legend className="sr-only">4 haneli PIN</legend>
        <div className="flex justify-center gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={d}
              autoFocus={i === 0}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              pattern="\d*"
              type="password"
              maxLength={LENGTH}
              aria-label={`PIN ${i + 1}. hane`}
              aria-invalid={Boolean(state?.error)}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                if (e.target.value === "") {
                  const next = [...digits];
                  next[i] = "";
                  setDigits(next);
                } else fill(i, e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !d && i > 0) {
                  const next = [...digits];
                  next[i - 1] = "";
                  setDigits(next);
                  inputs.current[i - 1]?.focus();
                  e.preventDefault();
                }
                if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
                if (e.key === "ArrowRight" && i < LENGTH - 1) inputs.current[i + 1]?.focus();
              }}
              onPaste={(e) => {
                e.preventDefault();
                fill(i, e.clipboardData.getData("text"));
              }}
              className="size-14 rounded-xl border border-line-strong bg-canvas text-center font-serif text-2xl text-ink caret-sage-700 transition-colors duration-150 focus-visible:border-sage-700 focus-visible:outline-none aria-invalid:border-clay-700 disabled:opacity-60 sm:size-16"
            />
          ))}
        </div>
      </fieldset>
      <p aria-live="polite" className="mt-5 min-h-5 text-center text-sm">
        {pending ? (
          <span className="text-ink-muted">Kontrol ediliyor…</span>
        ) : state?.error ? (
          <span className="text-clay-700">{state.error}</span>
        ) : null}
      </p>
    </form>
  );
}
