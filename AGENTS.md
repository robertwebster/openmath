# Open Math — Agent Rules

## Next.js version warning

This project uses **Next.js 16** (App Router). This version has breaking changes — APIs, conventions, and file structure may differ from your training data. Check `node_modules/next/dist/docs/` before writing any Next.js-specific code.

## Content rules

- Questions are written **only at the sub-topic level** — never create question banks at the topic or year level
- Every question must include `subtopic`, `topic`, and `year` tags for aggregation
- All content must reference a NSW Mathematics K–10 (2022) syllabus outcome

## Code rules

- TypeScript strictly — no `any` types
- Tailwind CSS for all styling — no inline styles, no separate CSS files
- Components go in `components/` — custom topic renderers go in `topics/`
- Content goes in `content/year-X/topic/subtopic/` — never mix content and code
