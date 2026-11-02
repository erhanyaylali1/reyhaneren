import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/service-template";
import { serviceContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const content = serviceContent["aile-danismanligi"];

export const metadata: Metadata = pageMetadata({
  title: `${content.metaTitle} | Reyhan Eren`,
  description: content.metaDescription,
  path: "/hizmetler/aile-danismanligi",
});

export default function Page() {
  return <ServiceTemplate content={content} />;
}
