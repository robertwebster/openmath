export type Difficulty = 1 | 2 | 3;

export type QuestionType = "numeric" | "coordinate" | "fraction" | "multiple-choice";

export interface Question {
  id: string;
  subtopic: string;
  topic: string;
  year: number;
  difficulty: Difficulty;
  type: QuestionType;
  stem: string;
  answer: string;
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

export interface TopicMeta {
  id: string;
  title: string;
  year: number;
  stage: string;
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
