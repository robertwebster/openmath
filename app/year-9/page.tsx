import Link from "next/link";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { getTopicMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Year 9 | Open Math",
  description: "Year 9 NSW Mathematics practice topics — free, no account needed.",
};

// Curriculum order — topics appear in this sequence; any unlisted topics append alphabetically
const TOPIC_ORDER = [
  "index-laws",
  "equations",
  "linear-relationships",
  "pythagoras",
  "trigonometry",
  "surface-area-and-volume",
  "geometrical-properties",
  "financial-mathematics",
  "statistics-and-data",
  "probability",
  "simultaneous-equations",
];

function getTopicIds(): string[] {
  const base = path.join(process.cwd(), "content", "year-9");
  const dirs = fs
    .readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(base, d.name, "index.json")))
    .map((d) => d.name);
  return [
    ...TOPIC_ORDER.filter((id) => dirs.includes(id)),
    ...dirs.filter((id) => !TOPIC_ORDER.includes(id)).sort(),
  ];
}

export default function Year9Page() {
  const topics = getTopicIds().map((id) => getTopicMeta(9, id));

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
          <span className="text-slate-600">Year 9</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Year 9</h1>
        <p className="text-slate-500 mb-10">Stage 5 · NSW Mathematics syllabus</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/year-9/${topic.id}`}
              className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {topic.title}
                </h2>
                {topic.extension && (
                  <span className="shrink-0 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full px-2.5 py-0.5">
                    Extension topic
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{topic.description}</p>
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
