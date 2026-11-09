import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/service-template";
import { serviceContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const content = serviceContent["cift-terapisi"];

export const metadata: Metadata = pageMetadata({
  title: `${content.metaTitle} | Reyhan Eren`,
  description: content.metaDescription,
  path: "/hizmetler/cift-terapisi",
});

export default function Page() {
  return <ServiceTemplate content={content} />;
}
