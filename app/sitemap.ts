import type { MetadataRoute } from "next";
import { COURSE_TITLES } from "@/lib/courses";
import { buildSearchIndex, CONTENT_YEARS } from "@/lib/search-index";
import { SITE_URL } from "@/lib/site";

// lastModified is deliberately omitted. Content mtimes do not survive a git
// checkout, so anything we could put here would be the deploy date rather than
// the date the page changed — a signal Google is better off not being given.
// changeFrequency is omitted for the same reason: Google ignores it.

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number) => ({
    url: `${SITE_URL}${path}`,
    priority,
  });

  const staticPages = [entry("/", 1), entry("/about", 0.3), entry("/contact", 0.3)];

  const yearPages = CONTENT_YEARS.map((year) => entry(`/year-${year}`, 0.8));

  const coursePages = Object.entries(COURSE_TITLES).flatMap(([year, courses]) =>
    Object.keys(courses).map((course) => entry(`/year-${year}/${course}`, 0.8))
  );

  // The same walk that backs the homepage search, so topics and sub-topics can
  // never drift out of the sitemap.
  const contentPages = buildSearchIndex().map((record) =>
    entry(record.u, record.k === "topic" ? 0.7 : 0.6)
  );

  return [...staticPages, ...yearPages, ...coursePages, ...contentPages];
}
