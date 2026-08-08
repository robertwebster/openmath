import type { SearchRecord } from "./types";

// Client-safe: this file is bundled into the browser, so it must never import fs
// or anything from lib/content.ts.

function tokenise(text: string): string[] {
  return text.toLowerCase().split(/[^a-z0-9]+/i).filter(Boolean);
}

interface Haystack {
  title: string[];
  parent: string[];
  outcome: string[];
  strand: string[];
  /** Title as one lowercase run, for "does the whole query prefix the title" checks. */
  titleFlat: string;
}

// Records are stable objects from the server payload, so their tokens only need
// computing once no matter how many keystrokes come through.
const haystacks = new WeakMap<SearchRecord, Haystack>();

function haystackFor(record: SearchRecord): Haystack {
  let h = haystacks.get(record);
  if (!h) {
    h = {
      title: tokenise(record.t),
      parent: record.p ? tokenise(record.p) : [],
      outcome: tokenise(record.o),
      strand: tokenise(record.s),
      titleFlat: record.t.toLowerCase(),
    };
    haystacks.set(record, h);
  }
  return h;
}

function prefixes(tokens: string[], query: string): boolean {
  return tokens.some((t) => t.startsWith(query));
}

/**
 * Scores one record, or returns 0 when it isn't a match.
 *
 * Every query token has to prefix-match somewhere — "trig rat" finds "Trigonometric
 * ratios" but "trig zzz" finds nothing. Where a token matched decides the ranking:
 * the title counts for far more than the strand it happens to sit under.
 */
function score(record: SearchRecord, queryTokens: string[], rawQuery: string): number {
  const h = haystackFor(record);
  let total = 0;

  for (const qt of queryTokens) {
    if (prefixes(h.title, qt)) {
      total += 100;
      if (h.title.includes(qt)) total += 20;
    } else if (prefixes(h.parent, qt)) {
      total += 30;
    } else if (prefixes(h.outcome, qt)) {
      total += 20;
    } else if (prefixes(h.strand, qt)) {
      total += 10;
    } else {
      return 0;
    }
  }

  // "trigo" should put "Trigonometry" above "Non-right-angled trigonometry".
  if (h.titleFlat.startsWith(rawQuery)) total += 500;

  return total;
}

/**
 * Searches the topic/sub-topic index. Returns every match, best first — callers
 * decide how many to show.
 */
export function searchTopics(
  records: SearchRecord[],
  query: string,
  limit?: number
): SearchRecord[] {
  const raw = query.trim().toLowerCase();
  const queryTokens = tokenise(raw);
  if (queryTokens.length === 0) return [];

  const hits: { record: SearchRecord; score: number }[] = [];
  for (const record of records) {
    const s = score(record, queryTokens, raw);
    if (s > 0) hits.push({ record, score: s });
  }

  hits.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Topics before their own sub-topics, juniors before seniors, then stable A-Z.
    if (a.record.k !== b.record.k) return a.record.k === "topic" ? -1 : 1;
    if (a.record.y !== b.record.y) return a.record.y - b.record.y;
    return a.record.t.localeCompare(b.record.t);
  });

  const ordered = hits.map((h) => h.record);
  return limit === undefined ? ordered : ordered.slice(0, limit);
}
