import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTopicMeta, getSubtopicMeta } from "@/lib/content";

interface Props {
  params: Promise<{ topic: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  try {
    const meta = getTopicMeta(9, topic);
    return {
      title: `${meta.title} | Year 9 | Open Math`,
      description: meta.description,
    };
  } catch {
    return { title: "Topic | Open Math" };
  }
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;

  let topicMeta;
  try {
    topicMeta = getTopicMeta(9, topic);
  } catch {
    notFound();
  }

  const subtopics = topicMeta.subtopics.map((id) => {
    try {
      return getSubtopicMeta(9, topic, id);
    } catch {
      return null;
    }
  }).filter(Boolean);

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
          <Link href="/year-9" className="hover:text-slate-600 transition-colors">Year 9</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">{topicMeta.title}</span>
        </nav>

        <div className="flex items-start gap-3 mb-3">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{topicMeta.title}</h1>
          {topicMeta.extension && (
            <span className="mt-1.5 shrink-0 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full px-2.5 py-0.5">
              Extension topic
            </span>
          )}
        </div>

        <p className="text-slate-500 leading-relaxed mb-3 max-w-2xl">{topicMeta.description}</p>
        <p className="text-xs text-slate-400 mb-10">
          {topicMeta.strand} · {topicMeta.syllabusOutcome}
        </p>

        {/* Sub-topic cards */}
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-4">Sub-topics</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {subtopics.map((sub) => (
            <Link
              key={sub!.id}
              href={`/year-9/${topic}/${sub!.id}`}
              className="group bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all"
            >
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-2">
                {sub!.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{sub!.description}</p>
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
