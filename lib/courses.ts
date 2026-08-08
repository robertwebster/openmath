// Stage 6 (Year 11+) splits each year into courses. These maps are the source of
// truth for which course slugs exist in a year — the [course] pages use them as the
// validity gate, so an unlisted slug 404s.

export const COURSE_TITLES: Record<number, Record<string, string>> = {
  11: {
    standard: "Mathematics Standard",
    advanced: "Mathematics Advanced",
  },
  12: {
    "standard-2": "Mathematics Standard 2",
    advanced: "Mathematics Advanced",
    "extension-1": "Mathematics Extension 1",
    "extension-2": "Mathematics Extension 2",
  },
};

export function getCourseTitle(year: number, course: string): string | undefined {
  return COURSE_TITLES[year]?.[course];
}

/** "Mathematics Extension 1" -> "Extension 1", for tight spaces like search result badges. */
export function getCourseShortTitle(year: number, course: string): string | undefined {
  return getCourseTitle(year, course)?.replace(/^Mathematics /, "");
}
