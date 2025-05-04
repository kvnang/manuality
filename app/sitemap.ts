import { BASE_URL } from "@/lib/constants";
import { WORKSHEET_DATA } from "@/lib/data";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [`/`, `/contact`];

  const worksheetIDs = Object.keys(WORKSHEET_DATA);

  return [
    ...staticPaths.map((path) => ({
      url: new URL(path, BASE_URL).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    })),
    ...worksheetIDs.map((id) => ({
      url: new URL(`/worksheet/${id}`, BASE_URL).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
