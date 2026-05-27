# Open Math — Project Structure

A working guide to how the project is organised, why each decision was made, and how to add new content.

---

## Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js (App Router) | Per-topic layout flexibility; static export friendly |
| Hosting | Vercel (hobby tier) | Free, auto-deploys on merge to main |
| Styling | Tailwind CSS | Low overhead, utility-first, easy for contributors |
| Content | MDX + JSON | Human-readable, Git-diffable, AI-generatable |
| Interactivity | React (per topic) | Each topic page owns its own rendering |
| Version control | GitHub (public repo) | Open source, Vercel integration, PR workflow |

---

## Repository Layout

```
open-math/
├── VALUES.md                   # Project values (start here)
├── PROJECT_STRUCTURE.md        # This file
├── README.md                   # Quick start for developers
│
├── content/                    # All curriculum content lives here
│   ├── stage-4/                # Years 7–8
│   │   ├── number-and-algebra/
│   │   │   ├── index.json      # Topic metadata + syllabus reference
│   │   │   ├── questions.json  # Question bank for this topic
│   │   │   └── worked-examples.mdx
│   │   ├── measurement-and-geometry/
│   │   └── statistics-and-probability/
│   └── stage-5/                # Years 9–10
│       ├── number-and-algebra/
│       ├── measurement-and-geometry/
│       └── statistics-and-probability/
│
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (minimal shell)
│   ├── page.tsx                # Homepage — stage/topic navigator
│   ├── [stage]/
│   │   └── [topic]/
│   │       └── page.tsx        # Default topic page (renders content/)
│   └── globals.css
│
├── components/                 # Shared UI components
│   ├── QuestionCard.tsx        # Renders a single question + feedback
│   ├── QuizRunner.tsx          # Steps through a question bank
│   ├── WorkedExample.tsx       # Expandable step-by-step solution
│   ├── TopicNav.tsx            # Sidebar / breadcrumb navigation
│   └── FeedbackBanner.tsx      # Correct / incorrect / hint display
│
├── topics/                     # Per-topic custom renderers (optional)
│   │                           # Only needed when default layout isn't enough
│   ├── geometry-angles/        # e.g. interactive angle explorer
│   └── probability-tree/       # e.g. drag-and-drop probability tree
│
├── lib/
│   ├── curriculum.ts           # Loads and validates content/ tree
│   ├── questions.ts            # Question selection, scoring logic
│   └── session.ts              # Session storage helpers (in-progress state)
│
└── public/
    └── past-papers/            # Static PDFs, organised by year and stage
        ├── stage-4/
        └── stage-5/
```

---

## Content Architecture

### Quiz Levels

There are three quiz levels. Questions are written once — at the sub-topic level — and aggregated upward automatically. There is no separate question bank to maintain at the topic or year level.

| Level | How it works |
|---|---|
| **Sub-topic quiz** | Questions from that sub-topic's `questions.json` only |
| **Topic quiz** | Questions pulled from all sub-topics within the topic, shuffled, balanced across sub-topics |
| **Year quiz** | Questions pulled from all topics within the year, shuffled, balanced across topics |

The `lib/questions.ts` module handles aggregation and balancing. A typical topic quiz draws 2–3 questions per sub-topic; a year quiz draws 1–2 per sub-topic.

---

### Folder structure

Content is organised in a two-tier navigable hierarchy. Strand is a metadata tag, not a folder level.

```
content/
└── year-9/
    ├── index.json                        # Year-level metadata
    ├── trigonometry/
    │   ├── index.json                    # Topic metadata
    │   ├── sin-cos-tan-ratios/
    │   │   ├── index.json                # Sub-topic metadata
    │   │   ├── questions.json            # Question bank (source of truth)
    │   │   └── worked-examples.mdx       # Explained examples
    │   ├── finding-unknown-sides/
    │   │   ├── index.json
    │   │   ├── questions.json
    │   │   └── worked-examples.mdx
    │   └── angles-of-elevation-depression/
    │       ├── index.json
    │       ├── questions.json
    │       └── worked-examples.mdx
    ├── linear-relationships/
    │   └── ...
    └── probability/
        └── ...
```

---

### `index.json` — Year level

```json
{
  "id": "year-9",
  "year": 9,
  "stage": 5,
  "title": "Year 9",
  "description": "NSW Stage 5 Core mathematics"
}
```

### `index.json` — Topic level

```json
{
  "id": "trigonometry",
  "title": "Trigonometry",
  "year": 9,
  "strand": "Measurement and Space",
  "syllabusOutcome": "MA5-XXX-01",
  "description": "Apply trigonometric ratios to find unknown sides and angles in right-angled triangles",
  "customRenderer": null,
  "video": {
    "url": "https://www.youtube.com/watch?v=XXXXX",
    "channel": "Eddie Woo",
    "title": "Introduction to Trigonometry"
  }
}
```

`customRenderer` points to a folder in `topics/` for bespoke UI. `video` is optional — omit if no suitable video exists.

### `index.json` — Sub-topic level

```json
{
  "id": "angles-of-elevation-depression",
  "title": "Angles of Elevation and Depression",
  "topic": "trigonometry",
  "year": 9,
  "strand": "Measurement and Space",
  "syllabusOutcome": "MA5-XXX-01",
  "description": "Solve real-world problems using angles of elevation and depression"
}
```

### `questions.json` — Sub-topic question bank

Questions live here and only here. Topic and year quizzes aggregate from these files.

```json
[
  {
    "id": "trig-elev-q1",
    "subtopic": "angles-of-elevation-depression",
    "topic": "trigonometry",
    "year": 9,
    "difficulty": 1,
    "type": "multiple-choice",
    "stem": "A ladder leans against a wall making an angle of 60° with the ground. If the ladder is 5m long, how high up the wall does it reach?",
    "options": ["2.5 m", "4.33 m", "5.77 m", "3.54 m"],
    "answer": "4.33 m",
    "hint": "The height is the side opposite the 60° angle. Which trig ratio uses opposite and hypotenuse?",
    "explanation": "sin(60°) = opposite/hypotenuse = h/5 → h = 5 × sin(60°) = 5 × 0.866 = 4.33 m"
  }
]
```

**Question types:** `multiple-choice`, `short-answer`, `worked-steps`  
**Difficulty scale:** 1 (straightforward) → 3 (challenging)  
**Tagging:** Every question carries `subtopic`, `topic`, and `year` — this is what powers aggregation into topic and year quizzes.

### `worked-examples.mdx` — Explained examples

MDX allows mixing markdown prose with React components. A worked example can embed the `WorkedExample` component to show/hide steps progressively.

### Video — optional, not primary

Video is not the main way a student is expected to understand a topic on Open Math. The interactive questions and worked examples carry that responsibility.

If a high-quality, relevant video exists for a topic it can be added as a supplementary link — but only if it genuinely adds something the worked examples don't. A video field in `index.json` makes this optional per topic:

```json
{
  "video": {
    "url": "https://www.youtube.com/watch?v=XXXXX",
    "channel": "Eddie Woo",
    "title": "Solving Linear Equations"
  }
}
```

The preferred source is **Eddie Woo's Wootube channel** — an NSW high school maths teacher whose videos are free, well-regarded, and aligned to the NSW curriculum. Other channels can be used if the content is clearly better for a specific topic, but consistency of source is preferred over comprehensiveness. If no good video exists for a topic, the field is simply omitted — a missing video is fine, a mediocre one is not.

---

## Page Flexibility

The default route `app/[stage]/[topic]/page.tsx` renders any topic using the standard QuizRunner layout. This covers most topics.

For topics that need a custom visual experience (geometry, probability trees, number lines etc.), a custom renderer is placed in `topics/[topic-id]/`. The default page detects the `customRenderer` field in `index.json` and dynamically imports that component instead.

This means:
- Simple topics get built quickly with zero custom code
- Visual topics can be as interactive as needed without affecting anything else
- There is no pressure to make everything look the same

---

## Deployment

1. Push to a feature branch
2. Open a PR — Vercel generates a preview URL automatically
3. Merge to `main` — Vercel deploys to production

No build server to manage. No infrastructure cost at hobbyist scale.

---

## Content Pipeline (Adding a New Sub-topic)

1. Create a folder at `content/year-X/topic-name/subtopic-name/`
2. Write `index.json` with sub-topic metadata and syllabus outcome reference
3. Generate `questions.json` using AI against the syllabus outcome as the brief — aim for 10–15 questions with a spread across difficulty 1–3
4. Review questions for accuracy, NSW curriculum alignment, and tone
5. Write `worked-examples.mdx` for 2–3 representative problems with step-by-step solutions
6. The sub-topic automatically appears in the topic quiz and year quiz — no extra wiring needed
7. If the parent topic needs a custom UI, create `topics/topic-name/` with a React component
8. Open a PR — the sub-topic will appear in the navigator automatically once merged

---

## What Is Deliberately Out of Scope

- User accounts or authentication
- Persistent progress tracking (session storage only)
- Gamification, points, badges, leaderboards
- Advertising or sponsorship
- Content outside the NSW K–10 Mathematics syllabus
- A CMS or admin interface (Git is the CMS)
