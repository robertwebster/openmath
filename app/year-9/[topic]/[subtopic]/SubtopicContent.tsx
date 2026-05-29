"use client";

import { useState } from "react";
import type { Question, WorkedExample, SubtopicMeta } from "@/lib/types";

interface Props {
  subtopic: SubtopicMeta;
  questions: Question[];
  workedExamples: WorkedExample[];
}

interface QuestionState {
  value: string;
  denominator: string;
  selected: string;
  submitted: boolean;
  correct: boolean;
  showExplanation: boolean;
}

interface ExampleState {
  expanded: boolean;
  stepsRevealed: number;
}

function checkAnswer(q: Question, state: QuestionState): boolean {
  switch (q.type) {
    case "numeric": {
      const student = parseFloat(state.value);
      const correct = parseFloat(q.answer);
      if (isNaN(student)) return false;
      return Math.abs(student - correct) <= (q.tolerance ?? 0);
    }
    case "coordinate": {
      return state.value.replace(/\s/g, "") === q.answer.replace(/\s/g, "");
    }
    case "fraction": {
      return `${state.value}/${state.denominator}` === q.answer;
    }
    case "multiple-choice": {
      return state.selected === q.answer;
    }
  }
}

function difficultyLabel(d: 1 | 2 | 3): string {
  return d === 1 ? "Straightforward" : d === 2 ? "Moderate" : "Challenging";
}

export default function SubtopicContent({ subtopic, questions, workedExamples }: Props) {
  const [questionStates, setQuestionStates] = useState<QuestionState[]>(
    questions.map(() => ({
      value: "",
      denominator: "",
      selected: "",
      submitted: false,
      correct: false,
      showExplanation: false,
    }))
  );

  const [exampleStates, setExampleStates] = useState<ExampleState[]>(
    workedExamples.map(() => ({ expanded: false, stepsRevealed: 0 }))
  );

  const [showAll, setShowAll] = useState(false);

  function updateQuestion(index: number, patch: Partial<QuestionState>) {
    setQuestionStates((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...patch } : s))
    );
  }

  function handleSubmit(index: number) {
    const q = questions[index];
    const state = questionStates[index];
    const correct = checkAnswer(q, state);
    updateQuestion(index, { submitted: true, correct, showExplanation: true });
  }

  function handleReset(index: number) {
    updateQuestion(index, {
      value: "",
      denominator: "",
      selected: "",
      submitted: false,
      correct: false,
      showExplanation: false,
    });
  }

  function handleShowAll() {
    setShowAll(true);
    setQuestionStates((prev) =>
      prev.map((s) => ({ ...s, showExplanation: true }))
    );
  }

  function toggleExample(index: number) {
    setExampleStates((prev) =>
      prev.map((s, i) =>
        i === index ? { expanded: !s.expanded, stepsRevealed: s.expanded ? 0 : 0 } : s
      )
    );
  }

  function nextStep(index: number) {
    setExampleStates((prev) =>
      prev.map((s, i) =>
        i === index ? { ...s, stepsRevealed: s.stepsRevealed + 1 } : s
      )
    );
  }

  return (
    <div>
      {/* Page title */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{subtopic.title}</h1>
        <button
          onClick={() => window.print()}
          className="print:hidden shrink-0 mt-1 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          Print
        </button>
      </div>
      <p className="text-slate-500 leading-relaxed mb-12 max-w-2xl">{subtopic.description}</p>

      {/* Worked examples */}
      {workedExamples.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Worked examples</h2>
          <div className="space-y-4">
            {workedExamples.map((ex, ei) => {
              const es = exampleStates[ei];
              return (
                <div key={ex.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-6 py-4 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-slate-900">{ex.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{difficultyLabel(ex.difficulty)}</p>
                    </div>
                    <button
                      onClick={() => toggleExample(ei)}
                      className="print:hidden shrink-0 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      {es.expanded ? "Hide" : "Show steps"}
                    </button>
                  </div>

                  {/* Problem statement — always visible */}
                  <div className="px-6 pb-4 border-t border-slate-100 pt-4">
                    <p className="text-sm text-slate-500 font-medium mb-1">Problem</p>
                    <pre className="text-sm text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">{ex.problem}</pre>
                  </div>

                  {/* Steps */}
                  <div className={es.expanded ? "block" : "hidden print:block"}>
                    <div className="px-6 pb-6 space-y-4">
                      {ex.steps.map((step, si) => (
                        <div
                          key={step.step}
                          className={si < es.stepsRevealed ? "block print:block" : "hidden print:block"}
                        >
                          <div className="flex gap-3">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center mt-0.5">
                              {step.step}
                            </span>
                            <div>
                              <p className="text-sm text-slate-700 mb-2">{step.instruction}</p>
                              <pre className="text-sm font-mono text-slate-800 bg-slate-50 rounded-lg px-4 py-3 whitespace-pre-wrap leading-relaxed">
                                {step.working}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Next step / answer */}
                      {es.expanded && es.stepsRevealed < ex.steps.length && (
                        <button
                          onClick={() => nextStep(ei)}
                          className="print:hidden ml-9 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors border border-indigo-200 rounded-lg px-4 py-2"
                        >
                          Next step
                        </button>
                      )}

                      {es.stepsRevealed >= ex.steps.length && (
                        <div className="ml-9 print:hidden">
                          <p className="text-sm text-slate-500 font-medium mb-1">Answer</p>
                          <p className="text-sm font-mono text-slate-800">{ex.answer}</p>
                        </div>
                      )}

                      {/* Answer always shown in print */}
                      <div className="hidden print:block ml-9">
                        <p className="text-sm text-slate-500 font-medium mb-1">Answer</p>
                        <p className="text-sm font-mono text-slate-800">{ex.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Practice questions */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Practise</h2>
        <div className="space-y-6">
          {questions.map((q, qi) => {
            const qs = questionStates[qi];
            const showExplanation = qs.showExplanation || showAll;

            return (
              <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-6">
                {/* Question number + difficulty */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-slate-400">Q{qi + 1}</span>
                  <span className="text-xs text-slate-300">·</span>
                  <span className="text-xs text-slate-400">{difficultyLabel(q.difficulty)}</span>
                </div>

                {/* Stem */}
                <pre className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed mb-5 font-sans">{q.stem}</pre>

                {/* Answer input */}
                <div className="print:hidden mb-4">
                  {q.type === "numeric" && (
                    <input
                      type="text"
                      inputMode="decimal"
                      value={qs.value}
                      onChange={(e) => updateQuestion(qi, { value: e.target.value })}
                      disabled={qs.submitted}
                      placeholder="Your answer"
                      className="w-40 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  )}

                  {q.type === "coordinate" && (
                    <input
                      type="text"
                      value={qs.value}
                      onChange={(e) => updateQuestion(qi, { value: e.target.value })}
                      disabled={qs.submitted}
                      placeholder="(x, y)"
                      className="w-40 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-400"
                    />
                  )}

                  {q.type === "fraction" && (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={qs.value}
                        onChange={(e) => updateQuestion(qi, { value: e.target.value })}
                        disabled={qs.submitted}
                        placeholder="Numerator"
                        className="w-28 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <span className="text-slate-400 font-medium">/</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={qs.denominator}
                        onChange={(e) => updateQuestion(qi, { denominator: e.target.value })}
                        disabled={qs.submitted}
                        placeholder="Denominator"
                        className="w-28 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-400"
                      />
                    </div>
                  )}

                  {q.type === "multiple-choice" && q.options && (
                    <div className="space-y-2">
                      {q.options.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`q-${qi}`}
                            value={opt}
                            checked={qs.selected === opt}
                            onChange={() => updateQuestion(qi, { selected: opt })}
                            disabled={qs.submitted}
                            className="accent-indigo-600"
                          />
                          <span className="text-sm text-slate-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit / Try again */}
                {!qs.submitted && (
                  <button
                    onClick={() => handleSubmit(qi)}
                    className="print:hidden text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 transition-colors"
                  >
                    Check answer
                  </button>
                )}

                {qs.submitted && (
                  <button
                    onClick={() => handleReset(qi)}
                    className="print:hidden text-sm font-medium text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg px-4 py-2 transition-colors"
                  >
                    Try again
                  </button>
                )}

                {/* Feedback */}
                {qs.submitted && (
                  <p className={`mt-4 text-sm font-medium ${qs.correct ? "text-green-700" : "text-red-700"}`}>
                    {qs.correct ? "Correct." : "Not quite."}
                  </p>
                )}

                {/* Explanation — always in DOM, shown via state or print */}
                <div className={showExplanation ? "block mt-4" : "hidden print:block"}>
                  <p className="text-xs font-medium text-slate-400 mb-2 print:mt-4">Explanation</p>
                  <pre className="text-sm font-mono text-slate-700 bg-slate-50 rounded-lg px-4 py-3 whitespace-pre-wrap leading-relaxed">
                    {q.explanation}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show all answers */}
        {!showAll && (
          <div className="mt-8 print:hidden">
            <button
              onClick={handleShowAll}
              className="text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-4 py-2 transition-colors"
            >
              Show all answers
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
