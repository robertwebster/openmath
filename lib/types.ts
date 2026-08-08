export type Difficulty = 1 | 2 | 3;

// "proof" questions are self-assessed — they have no machine-checkable answer,
// so they render a reveal-the-solution flow instead of being marked correct/incorrect.
export type QuestionType = "numeric" | "coordinate" | "fraction" | "multiple-choice" | "proof";

export interface Question {
  id: string;
  subtopic: string;
  topic: string;
  year: number;
  difficulty: Difficulty;
  type: QuestionType;
  stem: string;
  /**
   * Numeric answers are stored as JSON numbers; every other type compares as a string.
   * null for self-assessed "proof" questions, which have no checkable answer.
   */
  answer: string | number | null;
  tolerance?: number;
  options?: string[];
  hint: string;
  explanation: string;
}

export interface WorkedExampleStep {
  step: number;
  instruction: string;
  working: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  difficulty: Difficulty;
  problem: string;
  steps: WorkedExampleStep[];
  answer: string;
}

export interface SubtopicVerifier {
  date: string;
  initials: string;
  notes?: string;
  screenshot?: string;
}

export interface SubtopicMeta {
  id: string;
  title: string;
  topic: string;
  year: number;
  strand: string;
  syllabusOutcome: string;
  description: string;
  verifiers?: SubtopicVerifier[];
}

/**
 * One entry in the homepage search index. Every topic and sub-topic on the site
 * becomes a record, and the whole index is serialised into the homepage payload,
 * so the keys are deliberately short.
 */
export interface SearchRecord {
  /** title */
  t: string;
  /** kind */
  k: "topic" | "subtopic";
  /** year */
  y: number;
  /** course slug — Stage 6 (Year 11+) only */
  c?: string;
  /** parent topic title — sub-topics only */
  p?: string;
  /** strand */
  s: string;
  /** syllabus outcome */
  o: string;
  /** url */
  u: string;
}

export interface TopicMeta {
  id: string;
  title: string;
  year: number;
  stage: string;
  course?: string;
  extension?: boolean;
  strand: string;
  syllabusOutcome: string;
  description: string;
  subtopics: string[];
  video?: {
    url: string;
    channel: string;
    title: string;
  };
}
