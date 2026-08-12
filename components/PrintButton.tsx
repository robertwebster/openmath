"use client";

/**
 * Opens the browser print dialog. A client island so the otherwise
 * server-rendered topic pages can offer a print action.
 */
export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden shrink-0 mt-1 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors"
    >
      {label}
    </button>
  );
}
