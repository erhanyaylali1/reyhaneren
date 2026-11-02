import { ViewTransition } from "react";
import { servicePages, type ServiceSlug } from "@/lib/site";

// The service's colour tile. The same tile on /hizmetler and on the service
// page shares a view-transition name, so it glides from the card into the
// page header on navigation. Only one tile per slug may be on screen.
export function ServiceMark({ slug, size = "md" }: { slug: ServiceSlug; size?: "md" | "lg" }) {
  const service = servicePages.find((s) => s.slug === slug)!;
  const dims = size === "lg" ? "size-16 rounded-[1.25rem] text-[2rem]" : "size-12 rounded-2xl text-2xl";
  return (
    <ViewTransition name={`service-mark-${slug}`} share="service-mark" default="none">
      <span
        aria-hidden="true"
        className={`inline-flex shrink-0 items-center justify-center font-serif italic ${dims} ${service.tone}`}
      >
        {service.title.charAt(0)}
      </span>
    </ViewTransition>
  );
}
