import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCourseTopicMeta, getCourseSubtopicMeta, getCourseQuestions, getCourseWorkedExamples } from "@/lib/content";
import SubtopicContent from "@/components/SubtopicContent";

interface Props {
  params: Promise<{ course: string; topic: string; subtopic: string }>;
}

const COURSE_TITLES: Record<string, string> = {
  standard: "Mathematics Standard",
  advanced: "Mathematics Advanced",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { course, topic, subtopic } = await params;
  try {
    const meta = getCourseSubtopicMeta(11, course, topic, subtopic);
    return {
      title: `${meta.title} | Open Math`,
      description: meta.description,
    };
  } catch {
    return { title: "Sub-topic | Open Math" };
  }
}

export default async function SubtopicPage({ params }: Props) {
  const { course, topic, subtopic } = await params;
  const courseTitle = COURSE_TITLES[course];
  if (!courseTitle) notFound();

  let topicMeta, subtopicMeta, questions, workedExamples;
  try {
    topicMeta = getCourseTopicMeta(11, course, topic);
    subtopicMeta = getCourseSubtopicMeta(11, course, topic, subtopic);
    questions = getCourseQuestions(11, course, topic, subtopic);
    workedExamples = getCourseWorkedExamples(11, course, topic, subtopic);
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-full">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 print:hidden">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-indigo-600 tracking-tight hover:text-indigo-700 transition-colors">
            Open Math
            <span className="ml-2 text-sm text-slate-400 font-normal">NSW</span>
          </Link>
          <a
            href="https://github.com/robertwebster/openmath"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 mb-8 print:hidden">
          <Link href="/" className="hover:text-slate-600 transition-colors">Open Math</Link>
          <span className="mx-2">›</span>
          <Link href="/year-11" className="hover:text-slate-600 transition-colors">Year 11</Link>
          <span className="mx-2">›</span>
          <Link href={`/year-11/${course}`} className="hover:text-slate-600 transition-colors">{courseTitle}</Link>
          <span className="mx-2">›</span>
          <Link href={`/year-11/${course}/${topic}`} className="hover:text-slate-600 transition-colors">{topicMeta.title}</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">{subtopicMeta.title}</span>
        </nav>

        <SubtopicContent
          subtopic={subtopicMeta}
          questions={questions}
          workedExamples={workedExamples}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white print:hidden">
        <div className="max-w-4xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>
            Built by{" "}
            <a
              href="https://1upit.com"
              className="underline hover:text-slate-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Robert Webster
            </a>{" "}
            at 1up IT
          </span>
          <span>Free forever · No accounts · Open source</span>
        </div>
      </footer>

    </div>
  );
}
