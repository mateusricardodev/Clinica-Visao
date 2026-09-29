import type { MetadataRoute } from "next";
import { cirurgias } from "@/lib/cirurgias";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...cirurgias.map((c) => ({
      url: `${site.url}/cirurgias/${c.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
