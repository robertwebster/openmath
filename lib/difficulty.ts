import type { Difficulty } from "./types";

/** Student-facing wording for the 1–3 difficulty scale. */
export function difficultyLabel(d: Difficulty): string {
  return d === 1 ? "Straightforward" : d === 2 ? "Moderate" : "Challenging";
}
