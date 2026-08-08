"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, KeyboardEvent, FocusEvent } from "react";
import { getCourseShortTitle } from "@/lib/courses";
import { searchTopics } from "@/lib/search";
import type { SearchRecord } from "@/lib/types";

interface Props {
  records: SearchRecord[];
}

const MIN_QUERY = 2;
const MAX_VISIBLE = 8;

function badgeFor(record: SearchRecord): string {
  const course = record.c ? getCourseShortTitle(record.y, record.c) : undefined;
  const year = course ? `Year ${record.y} ${course}` : `Year ${record.y}`;
  return record.k === "topic" ? `${year} · Topic` : year;
}

export default function TopicSearch({ records }: Props) {
  const router = useRouter();
  const listId = useId();
  const optionId = (i: number) => `${listId}-option-${i}`;

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const trimmed = query.trim();
  const results = useMemo(
    () => (trimmed.length < MIN_QUERY ? [] : searchTopics(records, trimmed)),
    [records, trimmed]
  );
  const visible = results.slice(0, MAX_VISIBLE);
  const showPanel = open && trimmed.length >= MIN_QUERY;

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      if (showPanel) setOpen(false);
      else setQuery("");
      return;
    }

    if (!showPanel || visible.length === 0) {
      if (e.key === "ArrowDown") setOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % visible.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + visible.length) % visible.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = visible[activeIndex];
      if (target) {
        setOpen(false);
        router.push(target.u);
      }
    }
  }

  // Closes when focus leaves the whole widget — clicking away, or tabbing past the
  // last result — but not when moving between the input and its own result links.
  function handleBlur(e: FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
  }

  return (
    <div className="relative" onBlur={handleBlur}>
      <label htmlFor={`${listId}-input`} className="sr-only">
        Search topics
      </label>
      <input
        id={`${listId}-input`}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showPanel && visible.length > 0 ? optionId(activeIndex) : undefined}
        placeholder="Search topics, e.g. trigonometry, probability..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
      />
      <span aria-hidden="true" className="absolute right-4 top-3.5 text-slate-300 text-lg">
        ⌕
      </span>

      {showPanel && (
        <div className="absolute z-10 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden">
          {visible.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-500">
              No topics match “{trimmed}”. Try a shorter word, or the topic name.
            </p>
          ) : (
            <>
              <ul id={listId} ref={listRef} role="listbox" aria-label="Search results" className="max-h-96 overflow-y-auto">
                {visible.map((record, i) => (
                  <li key={record.u} id={optionId(i)} role="option" aria-selected={i === activeIndex} data-index={i}>
                    <Link
                      href={record.u}
                      tabIndex={-1}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => setOpen(false)}
                      className={`flex items-baseline justify-between gap-3 px-4 py-2.5 transition-colors ${
                        i === activeIndex ? "bg-indigo-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="min-w-0">
                        <span
                          className={`block truncate text-sm font-medium ${
                            i === activeIndex ? "text-indigo-700" : "text-slate-900"
                          }`}
                        >
                          {record.t}
                        </span>
                        {record.p && (
                          <span className="block truncate text-xs text-slate-400">{record.p}</span>
                        )}
                      </span>
                      <span className="shrink-0 text-xs text-slate-400">{badgeFor(record)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length > visible.length && (
                <p className="border-t border-slate-100 px-4 py-2 text-xs text-slate-400">
                  {results.length - visible.length} more — keep typing to narrow it down
                </p>
              )}
            </>
          )}
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {showPanel ? `${results.length} results for ${trimmed}` : ""}
      </p>
    </div>
  );
}
