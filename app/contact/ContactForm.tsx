"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, surname, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }

      setStatus("sent");
      setFirstName("");
      setSurname("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="text-emerald-900 font-medium mb-1">Message sent.</p>
        <p className="text-emerald-800 text-sm">
          Thanks for getting in touch. We'll reply when we can.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-emerald-900 underline underline-offset-2 hover:text-emerald-700"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1.5">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={status === "sending"}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="surname" className="block text-sm font-medium text-slate-700 mb-1.5">
            Surname
          </label>
          <input
            id="surname"
            name="surname"
            type="text"
            required
            autoComplete="family-name"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            disabled={status === "sending"}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "sending"}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "sending"}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 resize-y"
        />
      </div>

      {status === "error" && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          {errorMessage || "Something went wrong."} Try again, or{" "}
          <a
            href="https://github.com/robertwebster/openmath/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-rose-900"
          >
            open an issue on GitHub
          </a>
          .
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>
        <span className="text-xs text-slate-400">
          We'll only use your email to reply.
        </span>
      </div>
    </form>
  );
}
