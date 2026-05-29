import fs from "fs";
import path from "path";
import type { Question, WorkedExample, SubtopicMeta, TopicMeta } from "./types";

function readJson<T>(...segments: string[]): T {
  const filePath = path.join(process.cwd(), "content", ...segments);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export function getTopicMeta(year: number, topicId: string): TopicMeta {
  return readJson<TopicMeta>(`year-${year}`, topicId, "index.json");
}

export function getSubtopicMeta(year: number, topicId: string, subtopicId: string): SubtopicMeta {
  return readJson<SubtopicMeta>(`year-${year}`, topicId, subtopicId, "index.json");
}

export function getQuestions(year: number, topicId: string, subtopicId: string): Question[] {
  return readJson<Question[]>(`year-${year}`, topicId, subtopicId, "questions.json");
}

export function getWorkedExamples(year: number, topicId: string, subtopicId: string): WorkedExample[] {
  return readJson<WorkedExample[]>(`year-${year}`, topicId, subtopicId, "worked-examples.json");
}
