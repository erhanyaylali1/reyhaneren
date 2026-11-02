import type { Metadata } from "next";
import { ServiceTemplate } from "@/components/service-template";
import { serviceContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const content = serviceContent["kurumsal-danismanlik"];

export const metadata: Metadata = pageMetadata({
  title: `${content.metaTitle} | Reyhan Eren`,
  description: content.metaDescription,
  path: "/hizmetler/kurumsal-danismanlik",
});

export default function Page() {
  return <ServiceTemplate content={content} />;
}
