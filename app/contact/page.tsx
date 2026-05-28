import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Open Math",
  description:
    "Get in touch with Open Math. Send a question, report an error, or share feedback.",
};

export default function ContactPage() {
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

        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Contact
        </h1>

        <p className="text-slate-600 leading-relaxed mb-8">
          Found an error in a question, got a topic suggestion, or want to say
          hello? Send us a note. We read everything, and reply when we can.
        </p>

        <p className="text-sm text-slate-500 mb-10">
          If you've spotted a bug in the code or content, you can also{" "}
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

        <ContactForm />

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
