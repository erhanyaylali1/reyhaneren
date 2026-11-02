"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { navLinks } from "@/lib/site";
import { useIsActive } from "./nav-links";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const isActive = useIsActive();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // Tapping the page behind the menu closes it.
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-sage-50 active:bg-sage-100"
      >
        <span className="sr-only">{open ? "Menüyü kapat" : "Menüyü aç"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full rounded-b-3xl border-b border-line bg-canvas shadow-[0_24px_48px_-12px_rgb(31_42_37/0.28),0_8px_16px_-8px_rgb(31_42_37/0.12)]"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 pb-6 pt-2">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-line">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="flex min-h-14 items-center justify-between text-lg text-ink"
              >
                {link.label}
                {isActive(link.href) && (
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-sage-700" />
                )}
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <Link
              href="/iletisim#randevu"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-full bg-sage-700 px-6 font-medium text-canvas transition-colors duration-150 hover:bg-sage-800"
            >
              Randevu Al
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
