import katex from "katex";

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
      segments.push({ kind: "display", content: m[1].trim() });
    } else {
      segments.push({ kind: "inline", content: m[2] });
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

interface Props {
  text: string;
  className?: string;
}

export default function MathText({ text, className }: Props) {
  const segments = parseSegments(text);
  return (
    <div className={className}>
      {segments.map((seg, i) => {
        if (seg.kind === "text") return <TextWithBreaks key={i} text={seg.content} />;
        if (seg.kind === "inline") {
          return (
            <span key={i} dangerouslySetInnerHTML={{ __html: render(seg.content, false) }} />
          );
        }
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: render(seg.content, true) }} />
        );
      })}
    </div>
  );
}
