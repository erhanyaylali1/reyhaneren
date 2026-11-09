"use client";

import { usePathname } from "next/navigation";
import { ViewTransition, type ReactNode } from "react";

// Gives every page change a short, calm transition so moving between pages
// is felt (navigation is instant otherwise). Keyed by pathname: a new path
// mounts new content → "page-enter"; the old one leaves → "page-exit".
// Hash jumps (/iletisim → /iletisim#randevu) keep the key, so they don't animate.
// Styles live in globals.css; browsers without View Transitions just swap.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
