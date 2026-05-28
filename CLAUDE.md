# Open Math — AI Assistant Context

This is the Open Math project: a free, open source NSW Mathematics practice platform for Years 7–10 students.

## Key documents

- `VALUES.md` — Project values. Read this first.
- `PROJECT_STRUCTURE.md` — Architecture, content schema, folder layout, quiz aggregation logic.
- `YEAR9_SYLLABUS.md` — Full Year 9 topic and sub-topic map with Open Math build notes.

## Important: Next.js version

This project uses **Next.js 16** (App Router). APIs and conventions may differ from training data — check `node_modules/next/dist/docs/` if unsure about a specific API.

## Content structure

Questions live at the sub-topic level only (`content/year-9/[topic]/[subtopic]/questions.json`). Topic and Year quizzes are aggregated from sub-topic question banks — do not create separate question banks at higher levels.

## Stack

Next.js 16 · TypeScript · Tailwind CSS · Vercel (hobby)
