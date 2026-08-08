import fs from "fs";
import path from "path";
import {
  getTopicMeta,
  getSubtopicMeta,
  getCourseTopicMeta,
  getCourseSubtopicMeta,
} from "./content";
import { COURSE_TITLES } from "./courses";
import type { SearchRecord } from "./types";

// Server-only: walks content/ with fs. Never import this from a client component —
// pass the built index down as a prop instead.

const STAGE_45_YEARS = [7, 8, 9, 10];
const STAGE_6_YEARS = [11, 12];

/** Sub-directories of `dir` that contain an index.json, sorted. Missing dir -> []. */
function contentDirs(...segments: string[]): string[] {
  const base = path.join(process.cwd(), "content", ...segments);
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(base, d.name, "index.json")))
    .map((d) => d.name)
    .sort();
}

let cached: SearchRecord[] | null = null;

/**
 * Every topic and sub-topic on the site as a flat, searchable list.
 *
 * Content is static at deploy time, so the ~339 synchronous file reads are memoised
 * for the life of the server process.
 */
export function buildSearchIndex(): SearchRecord[] {
  if (cached) return cached;

  const records: SearchRecord[] = [];

  const addTopic = (
    year: number,
    topicId: string,
    course: string | undefined,
    // Years 7-10 and Stage 6 read through different content.ts helpers, so the
    // caller supplies the pair that matches its path shape.
    readTopic: () => ReturnType<typeof getTopicMeta>,
    readSubtopic: (subId: string) => ReturnType<typeof getSubtopicMeta>
  ) => {
    const topic = readTopic();
    const base = course ? `/year-${year}/${course}/${topicId}` : `/year-${year}/${topicId}`;

    records.push({
      t: topic.title,
      k: "topic",
      y: year,
      ...(course ? { c: course } : {}),
      s: topic.strand,
      o: topic.syllabusOutcome,
      u: base,
    });

    const subIds = course
      ? contentDirs(`year-${year}`, course, topicId)
      : contentDirs(`year-${year}`, topicId);

    for (const subId of subIds) {
      const sub = readSubtopic(subId);
      records.push({
        t: sub.title,
        k: "subtopic",
        y: year,
        ...(course ? { c: course } : {}),
        p: topic.title,
        s: sub.strand,
        o: sub.syllabusOutcome,
        u: `${base}/${subId}`,
      });
    }
  };

  for (const year of STAGE_45_YEARS) {
    for (const topicId of contentDirs(`year-${year}`)) {
      addTopic(
        year,
        topicId,
        undefined,
        () => getTopicMeta(year, topicId),
        (subId) => getSubtopicMeta(year, topicId, subId)
      );
    }
  }

  for (const year of STAGE_6_YEARS) {
    // Drive off the course map rather than the directory listing: it is the same
    // gate the [course] pages use, so search can never surface an unroutable course.
    for (const course of Object.keys(COURSE_TITLES[year] ?? {})) {
      for (const topicId of contentDirs(`year-${year}`, course)) {
        addTopic(
          year,
          topicId,
          course,
          () => getCourseTopicMeta(year, course, topicId),
          (subId) => getCourseSubtopicMeta(year, course, topicId, subId)
        );
      }
    }
  }

  cached = records;
  return records;
}
