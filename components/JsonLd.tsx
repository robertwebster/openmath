import type { JsonLd as JsonLdData } from "@/lib/structured-data";

interface Props {
  data: JsonLdData | JsonLdData[];
}

/**
 * Emits a JSON-LD script tag. A top-level array is valid JSON-LD, so a page can
 * pass several graphs and still get one script.
 *
 * Content comes from our own JSON files rather than user input, but "<" is escaped
 * anyway: an unescaped "</script>" inside any string would end the tag early.
 */
export default function JsonLd({ data }: Props) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
