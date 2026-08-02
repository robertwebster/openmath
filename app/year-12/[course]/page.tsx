import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { getCourseTopicMeta } from "@/lib/content";
import MathText from "@/components/MathText";

interface Props {
  params: Promise<{ course: string }>;
}

const COURSE_TITLES: Record<string, string> = {
  "standard-2": "Mathematics Standard 2",
  advanced: "Mathematics Advanced",
  "extension-1": "Mathematics Extension 1",
  "extension-2": "Mathematics Extension 2",
};

// Curriculum order per course; any unlisted topics append alphabetically
const TOPIC_ORDER: Record<string, string[]> = {
  "standard-2": [
    "types-of-relationships",
    "non-right-angled-trigonometry",
    "rates-and-ratios",
    "investments-and-loans",
    "annuities",
    "bivariate-data-analysis",
    "the-normal-distribution",
    "network-flow",
    "critical-path-analysis",
  ],
  advanced: [
    "further-graph-transformations-and-modelling",
    "sequences-and-series",
    "differential-calculus",
    "integral-calculus",
    "applications-of-calculus",
    "random-variables",
    "financial-mathematics",
  ],
  "extension-1": [
    "proof-by-mathematical-induction",
    "inverse-trigonometric-functions",
    "introduction-to-vectors",
    "further-calculus-skills",
    "further-applications-of-calculus",
    "the-binomial-distribution",
  ],
  "extension-2": [
    "the-nature-of-proof",
    "complex-numbers",
    "further-integration",
    "mechanics",
    "further-work-with-vectors",
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { course } = await params;
  const title = COURSE_TITLES[course];
  if (!title) return { title: "Year 12 | Open Math" };
  return {
    title: `${title} | Year 12 | Open Math`,
    description: `Year 12 ${title} practice topics — free, no account needed.`,
  };
}

function getTopicIds(course: string): string[] {
  const base = path.join(process.cwd(), "content", "year-12", course);
  const dirs = fs
    .readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(base, d.name, "index.json")))
    .map((d) => d.name);
  const order = TOPIC_ORDER[course] ?? [];
  return [
    ...order.filter((id) => dirs.includes(id)),
    ...dirs.filter((id) => !order.includes(id)).sort(),
  ];
}

export default async function CoursePage({ params }: Props) {
  const { course } = await params;
  const courseTitle = COURSE_TITLES[course];
  if (!courseTitle) notFound();

  const topics = getTopicIds(course).map((id) => getCourseTopicMeta(12, course, id));

  return (
    <div className="flex flex-col min-h-full">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
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
        <nav className="text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-slate-600 transition-colors">Open Math</Link>
          <span className="mx-2">›</span>
          <Link href="/year-12" className="hover:text-slate-600 transition-colors">Year 12</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">{courseTitle}</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">{courseTitle}</h1>
        <p className="text-slate-500 mb-10">Year 12 · Stage 6 · NSW Mathematics syllabus</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/year-12/${course}/${topic.id}`}
              className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all"
            >
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2">
                {topic.title}
              </h2>
              <MathText text={topic.description} className="text-sm text-slate-500 leading-relaxed mb-4" />
              <p className="text-xs text-slate-400">
                {topic.subtopics.length} sub-topic{topic.subtopics.length !== 1 ? "s" : ""}
              </p>
            </Link>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
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
