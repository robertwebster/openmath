import Link from "next/link";

const years = [
  { year: 7,  stage: "Stage 4", topics: 0,  available: false },
  { year: 8,  stage: "Stage 4", topics: 0,  available: false },
  { year: 9,  stage: "Stage 5", topics: 10, available: true  },
  { year: 10, stage: "Stage 5", topics: 0,  available: false },
  { year: 11, stage: "Stage 6", topics: 0,  available: false },
  { year: 12, stage: "Stage 6", topics: 0,  available: false },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-semibold text-indigo-600 tracking-tight">
              Open Math
            </span>
            <span className="ml-2 text-sm text-slate-400">NSW</span>
          </div>
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

      {/* Hero */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            NSW Maths Practice
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Free practice questions, instant feedback and worked examples,
            aligned to the NSW Mathematics syllabus. No account needed.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search topics, e.g. trigonometry, probability..."
              className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
            />
            <span className="absolute right-4 top-3.5 text-slate-300 text-lg">
              ⌕
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            Topic search coming soon
          </p>
        </div>

        {/* Year selector */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-4 text-center">
            Select your year
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {years.map(({ year, stage, topics, available }) =>
              available ? (
                <Link
                  key={year}
                  href={`/year-${year}`}
                  className="group flex flex-col items-center justify-center bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all"
                >
                  <span className="text-5xl font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                    {year}
                  </span>
                  <span className="mt-2 text-sm font-medium text-slate-600">
                    {stage}
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    {topics} topics
                  </span>
                </Link>
              ) : (
                <div
                  key={year}
                  className="flex flex-col items-center justify-center bg-white border border-slate-100 rounded-2xl p-6 opacity-50 cursor-not-allowed"
                >
                  <span className="text-5xl font-bold text-slate-300">
                    {year}
                  </span>
                  <span className="mt-2 text-sm font-medium text-slate-400">
                    {stage}
                  </span>
                  <span className="mt-1 text-xs text-slate-300">
                    Coming soon
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Values note */}
        <p className="text-center text-xs text-slate-400 mt-10 max-w-md mx-auto leading-relaxed">
          Open Math is free, open source, and has no accounts or tracking.
          Questions are AI-generated and reviewed against the NSW syllabus.{" "}
          <a
            href="https://github.com/robertwebster/openmath"
            className="underline hover:text-slate-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the source.
          </a>
        </p>
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
