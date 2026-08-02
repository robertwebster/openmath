import katex from "katex";
import type { ReactNode } from "react";

type Segment =
  | { kind: "text"; content: string }
  | { kind: "inline"; content: string }
  | { kind: "display"; content: string };

// Placeholder for escaped dollar signs (\$) so they survive the math parser
const ESC = "¤";

function parseSegments(text: string): Segment[] {
  const safe = text.replace(/\\\$/g, ESC);
  const segments: Segment[] = [];
  // Match $$...$$ before $...$ to avoid partial capture
  const re = /\$\$([\s\S]*?)\$\$|\$([^$\n]+?)\$/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(safe)) !== null) {
    if (m.index > last) {
      segments.push({ kind: "text", content: safe.slice(last, m.index).replaceAll(ESC, "$") });
    }
    if (m[1] !== undefined) {
      segments.push({ kind: "display", content: m[1].trim().replaceAll(ESC, "\\$") });
    } else {
      segments.push({ kind: "inline", content: m[2].replaceAll(ESC, "\\$") });
    }
    last = m.index + m[0].length;
  }
  if (last < safe.length) {
    segments.push({ kind: "text", content: safe.slice(last).replaceAll(ESC, "$") });
  }
  return segments;
}

function render(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex, { displayMode, throwOnError: false, strict: false });
  } catch {
    return tex;
  }
}

function TextWithBreaks({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

/** Render one run of text, resolving any inline/display math inside it. */
function renderSegments(text: string, inline: boolean): ReactNode[] {
  const Block = inline ? "span" : "div";
  return parseSegments(text).map((seg, i) => {
    if (seg.kind === "text") return <TextWithBreaks key={i} text={seg.content} />;
    if (seg.kind === "inline") {
      return <span key={i} dangerouslySetInnerHTML={{ __html: render(seg.content, false) }} />;
    }
    return <Block key={i} dangerouslySetInnerHTML={{ __html: render(seg.content, true) }} />;
  });
}

// ---- Markdown pipe tables ------------------------------------------------
// Content authors write frequency/precedence tables as markdown. Requiring the
// |---|---| delimiter row keeps this from matching absolute-value bars in maths.

type Align = "left" | "center" | "right";
type Block =
  | { kind: "text"; content: string }
  | { kind: "table"; header: string[]; rows: string[][]; align: Align[] };

const ROW_RE = /^\s*\|.*\|\s*$/;
const DELIM_RE = /^\s*\|(?:\s*:?-+:?\s*\|)+\s*$/;

function splitCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/)          // ignore escaped \| inside a cell
    .map((c) => c.replace(/\\\|/g, "|").trim());
}

function parseAlign(delim: string): Align[] {
  return splitCells(delim).map((c) => {
    const l = c.startsWith(":");
    const r = c.endsWith(":");
    return l && r ? "center" : r ? "right" : "left";
  });
}

function splitBlocks(text: string): Block[] {
  const lines = text.split("\n");
  const blocks: Block[] = [];
  let buf: string[] = [];
  const flush = () => {
    // drop blank lines that only separated the table from its surrounding prose
    const content = buf.join("\n").replace(/^\n+/, "").replace(/\n+$/, "");
    if (content) blocks.push({ kind: "text", content });
    buf = [];
  };

  for (let i = 0; i < lines.length; i++) {
    if (ROW_RE.test(lines[i]) && i + 1 < lines.length && DELIM_RE.test(lines[i + 1])) {
      flush();
      const header = splitCells(lines[i]);
      const align = parseAlign(lines[i + 1]);
      const rows: string[][] = [];
      let j = i + 2;
      while (j < lines.length && ROW_RE.test(lines[j])) rows.push(splitCells(lines[j++]));
      blocks.push({ kind: "table", header, rows, align });
      i = j - 1;
    } else {
      buf.push(lines[i]);
    }
  }
  flush();
  return blocks;
}

const alignClass: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function MarkdownTable({ header, rows, align }: Omit<Extract<Block, { kind: "table" }>, "kind">) {
  return (
    // wide tables scroll inside the card rather than stretching the page
    <div className="my-3 overflow-x-auto">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-50">
            {header.map((cell, i) => (
              <th
                key={i}
                className={`border border-slate-200 px-3 py-2 font-medium text-slate-700 ${alignClass[align[i] ?? "left"]}`}
              >
                {renderSegments(cell, true)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`border border-slate-200 px-3 py-2 text-slate-700 ${alignClass[align[c] ?? "left"]}`}
                >
                  {renderSegments(cell, true)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface Props {
  text: string;
  className?: string;
  /**
   * Wrapper element. Defaults to "div"; pass "span" for inline contexts such as
   * headings and radio labels, where a block-level wrapper would be invalid HTML.
   * Tables are only parsed for the block form — inline callers never contain them.
   */
  as?: "div" | "span";
}

export default function MathText({ text, className, as: Wrapper = "div" }: Props) {
  if (Wrapper === "span") {
    return <span className={className}>{renderSegments(text, true)}</span>;
  }

  return (
    <div className={className}>
      {splitBlocks(text).map((block, i) =>
        block.kind === "table" ? (
          <MarkdownTable key={i} header={block.header} rows={block.rows} align={block.align} />
        ) : (
          <div key={i}>{renderSegments(block.content, false)}</div>
        )
      )}
    </div>
  );
}
