"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";

export function useIsActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks() {
  const isActive = useIsActive();
  return (
    <ul className="flex items-center gap-8">
      {navLinks.map((link) => {
        const active = isActive(link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`relative text-[0.9375rem] transition-colors duration-150 hover:text-ink ${
                active
                  ? "text-ink after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:bg-sage-700"
                  : "text-ink-muted"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
