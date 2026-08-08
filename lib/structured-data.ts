import { getCourseTitle } from "./courses";
import { SITE_URL } from "./site";

// Schema.org JSON-LD builders. Types are deliberately conservative: LearningResource
// rather than Course, because Google's Course rich result requires provider and
// hasCourseInstance fields (mode, workload, offerings) that a free practice page
// cannot honestly fill, and their absence reports as errors in Search Console.

export type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export interface Crumb {
  name: string;
  /** Site-relative, e.g. "/year-9/trigonometry". Omit for the current page. */
  path?: string;
}

/** Site identity. Homepage only — one canonical definition the rest reference by @id. */
export function siteJsonLd(): JsonLd[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": ORGANIZATION_ID,
      name: "Open Math",
      url: SITE_URL,
      description:
        "Free, open source mathematics practice aligned to the NSW Mathematics syllabus.",
      sameAs: ["https://github.com/robertwebster/openmath"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Open Math",
      url: SITE_URL,
      inLanguage: "en-AU",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ];
}

/**
 * Must mirror the breadcrumb nav rendered on the page — Google treats structured
 * data that disagrees with visible content as spam.
 */
export function breadcrumbJsonLd(trail: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(crumb.path ? { item: `${SITE_URL}${crumb.path}` } : {}),
    })),
  };
}

/** "Year 9", or "Year 12 Mathematics Advanced" for Stage 6. */
export function educationalLevel(year: number, course?: string): string {
  const courseTitle = course ? getCourseTitle(year, course) : undefined;
  return courseTitle ? `Year ${year} ${courseTitle}` : `Year ${year}`;
}

export function learningResourceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  year: number;
  course?: string;
  strand: string;
  syllabusOutcome: string;
  resourceType: "Topic overview" | "Practice problems";
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${SITE_URL}${opts.path}`,
    url: `${SITE_URL}${opts.path}`,
    name: opts.name,
    description: opts.description,
    learningResourceType: opts.resourceType,
    educationalLevel: educationalLevel(opts.year, opts.course),
    inLanguage: "en-AU",
    // VALUES.md 1: no accounts, no paywall. Say so in the markup.
    isAccessibleForFree: true,
    about: { "@type": "Thing", name: opts.strand },
    educationalAlignment: [
      {
        "@type": "AlignmentObject",
        alignmentType: "educationalSubject",
        educationalFramework: "NSW Mathematics Syllabus",
        targetName: opts.syllabusOutcome,
      },
    ],
    provider: { "@id": ORGANIZATION_ID },
  };
}
