"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

// Base of the counsellor's WhatsApp link, without the prefilled ?text=.
// Blog "share on WhatsApp" links (wa.me/?text=…) don't match, so they aren't
// counted as contact attempts.
const WHATSAPP_BASE = site.whatsapp.href.split("?")[0];

// Which part of the page the click came from, to compare CTAs.
function areaOf(el: Element): string {
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return "content";
}

/**
 * One delegated listener for every phone / WhatsApp / email link on the site,
 * including links written inside blog posts — no per-link wiring needed.
 */
export function ContactTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const params = { click_area: areaOf(link) };

      if (href.startsWith("tel:")) trackEvent("phone_click", params);
      else if (href.startsWith(WHATSAPP_BASE)) trackEvent("whatsapp_click", params);
      else if (href.startsWith("mailto:")) trackEvent("email_click", params);
    }
    // Capture phase: runs even if a component stops propagation.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
