"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { scrollToTop } from "./scroll-to-top";

// Logo link: navigates home from other pages; on the home page itself it
// scrolls back to the top (a same-page Link would otherwise do nothing).
export function HomeLink({ className, children }: { className?: string; children: ReactNode }) {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      data-home-link
      className={className}
      onClick={(e) => {
        if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        scrollToTop();
      }}
    >
      {children}
    </Link>
  );
}
