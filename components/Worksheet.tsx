import MathText from "@/components/MathText";
import { difficultyLabel } from "@/lib/difficulty";
import { SITE_URL } from "@/lib/site";
import type { Difficulty, WorksheetSection } from "@/lib/types";

/**
 * A printable sheet of question stems and blank working space — no worked
 * examples, no explanations, no answers. Rendered into the page and shown only
 * by print CSS, so there is no second content format to maintain.
 *
 * `className` is how the caller controls visibility (typically
 * "hidden print:block").
 */
interface Props {
  title: string;
  /** Strand · syllabus outcome, printed under the title. */
  subtitle: string;
  /** Site path this sheet came from, printed at the foot so it can be found again. */
  path: string;
  sections: WorksheetSection[];
  className?: string;
}

/** Blank space left for working, scaled to how much the question likely needs. */
const WORKING_SPACE: Record<Difficulty, string> = {
  1: "h-28",
  2: "h-44",
  3: "h-60",
};

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default function Worksheet({ title, subtitle, path, sections, className }: Props) {
  // Questions are numbered continuously across the whole sheet, not per section.
  let counter = 0;
  const numbered = sections.map((section) => ({
    title: section.title,
    questions: section.questions.map((question) => ({ question, number: ++counter })),
  }));

  // A single-section sheet is a sub-topic — its title is already the sheet title.
  const showSectionHeadings = numbered.length > 1;

  return (
    <div className={className}>
      <div className="max-w-4xl mx-auto px-6 text-slate-900">

        {/* Sheet header */}
        <div className="border-b border-slate-300 pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Open Math
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>

        <div className="mt-6 mb-10 grid grid-cols-2 gap-10 text-sm text-slate-600">
          <div className="border-b border-slate-400 pb-1">Name:</div>
          <div className="border-b border-slate-400 pb-1">Date:</div>
        </div>

        {/* Questions */}
        {numbered.map((section) => (
          <section key={section.title} className="mb-8">
            {showSectionHeadings && (
              <h2 className="break-after-avoid mb-5 border-b border-slate-200 pb-1 text-sm font-semibold uppercase tracking-widest text-slate-500">
                {section.title}
              </h2>
            )}

            {section.questions.map(({ question, number }) => (
              <div key={question.id} className="break-inside-avoid mb-6">
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-sm font-semibold">Q{number}</span>
                  <span className="text-xs text-slate-400">
                    {difficultyLabel(question.difficulty)}
                  </span>
                </div>

                <MathText text={question.stem} className="text-sm leading-relaxed" />

                {question.options && (
                  <ol className="mt-3 space-y-1.5">
                    {question.options.map((option, oi) => (
                      <li key={option} className="flex gap-2 text-sm">
                        <span className="text-slate-500">{OPTION_LABELS[oi] ?? oi + 1}.</span>
                        <MathText as="span" text={option} />
                      </li>
                    ))}
                  </ol>
                )}

                {/* Working space */}
                <div className={`${WORKING_SPACE[question.difficulty]} border-b border-slate-200`} />
              </div>
            ))}
          </section>
        ))}

        <p className="mt-4 border-t border-slate-300 pt-3 text-xs text-slate-400">
          Worked solutions and answers at {SITE_URL.replace(/^https?:\/\//, "")}
          {path}
        </p>

      </div>
    </div>
  );
}
