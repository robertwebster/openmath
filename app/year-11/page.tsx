import Link from "next/link";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Year 11 | Open Math",
  description: "Year 11 NSW Mathematics practice — Standard and Advanced courses, free, no account needed.",
};

// Stage 6 splits into courses. Listed in display order; descriptions are course-level summaries.
const COURSES = [
  {
    id: "standard",
    title: "Mathematics Standard",
    description: "Practical, real-world mathematics — finance, measurement, statistics and networks.",
  },
  {
    id: "advanced",
    title: "Mathematics Advanced",
    description: "Calculus-based course building functions, trigonometry, calculus and probability for further study.",
  },
];

function countTopics(course: string): number {
  const base = path.join(process.cwd(), "content", "year-11", course);
  if (!fs.existsSync(base)) return 0;
  return fs
    .readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(base, d.name, "index.json"))).length;
}

export default function Year11Page() {
  const courses = COURSES.map((c) => ({ ...c, topics: countTopics(c.id) }));

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
          <span className="text-slate-600">Year 11</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Year 11</h1>
        <p className="text-slate-500 mb-10">Stage 6 · NSW Mathematics syllabus · Choose your course</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/year-11/${course.id}`}
              className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all"
            >
              <h2 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2">
                {course.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{course.description}</p>
              <p className="text-xs text-slate-400">
                {course.topics} topic{course.topics !== 1 ? "s" : ""}
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
