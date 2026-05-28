import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Open Math",
  description:
    "Open Math is a free, open source NSW Mathematics practice site for Years 7 to 12. No accounts, no subscriptions.",
};

export default function AboutPage() {
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

      <main className="flex-1 max-w-2xl mx-auto px-6 py-16 w-full">

        <h1 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">
          About
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">

          <p>
            Open Math is a free maths site built around the NSW syllabus for
            Years 7 to 12. No accounts, no subscriptions, no ads. Just the
            topics you're actually being assessed on, with questions you can
            attempt and get feedback on straight away.
          </p>

          <p>
            Content is written with AI assistance and reviewed by a human
            against the syllabus, and we say so plainly because that's more
            honest than pretending otherwise. The goal isn't to cover everything
            under the sun. It's to help you walk away from a topic feeling a bit
            less stuck than when you started.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 pt-4">
            Why it exists
          </h2>

          <p>
            This started as a personal project. Finding good, free, NSW-specific
            practice material for secondary maths is harder than it should be.
            Most of the decent options cost money. The free ones are either
            too broad to be useful or not aligned closely enough to what's
            actually being taught.
          </p>

          <p>
            Open Math is an attempt to fix that, starting with Year 9, where
            the jump in difficulty catches a lot of students off guard.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 pt-4">
            How it works
          </h2>

          <p>
            Each topic is broken into sub-topics. Each sub-topic has a short
            worked example and a set of practice questions with instant
            feedback. If you get something wrong, you'll see where the working
            went off track, not just that it did.
          </p>

          <p>
            You can practise a single sub-topic, run through a full topic, or
            take a mixed Year quiz if you want to cover more ground. There's no
            account, no progress saved between visits. Just open a topic and
            start.
          </p>

          <h2 className="text-xl font-semibold text-slate-900 pt-4">
            Open source
          </h2>

          <p>
            The code and content are both publicly available on{" "}
            <a
              href="https://github.com/robertwebster/openmath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
            >
              GitHub
            </a>
            . If you find an error in a question or explanation, you can raise
            an issue or open a pull request. If you want to run your own version,
            you can.
          </p>

          <p>
            Open Math is built and maintained by{" "}
            <a
              href="https://1upit.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
            >
              Robert Webster
            </a>{" "}
            at 1up IT. It's a side project, not a product. There's no business
            model behind it.
          </p>

        </div>

        {/* Contact nudge */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            Found an error or want to get in touch?{" "}
            <Link
              href="/contact"
              className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
            >
              Contact us
            </Link>
            {" "}or{" "}
            <a
              href="https://github.com/robertwebster/openmath/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2"
            >
              open an issue on GitHub
            </a>
            .
          </p>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>
            Built by{" "}
            <a
              href="https://1upit.com.au"
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
