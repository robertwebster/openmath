# Year 12 NSW Mathematics Advanced — Syllabus Map

**Syllabus:** Mathematics Advanced 11–12 (2024), Year 12 content taught from Term 4 2026
**Stage:** Stage 6 — Mathematics Advanced
**Structure:** 7 focus areas — calculus-heavy, formal, builds directly on Year 11 Advanced

> ⚠️ **Verification note:** Outcome codes (e.g. `MAV-12-01`) should be confirmed against the official digital curriculum at [curriculum.nsw.edu.au](https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-advanced-11-12-2024/content/year-12/). The working outcome `MAO-WM-01` applies to all focus areas. First HSC examination under this syllabus is 2027.

---

## Navigation and Quiz Structure

Content is organised into **two navigable tiers** — Topic (= NESA focus area) and Sub-topic. Strand is metadata only.

Three quiz levels exist, all drawing from a **single source of truth** at the sub-topic level:

| Level | What it covers | Use case |
|---|---|---|
| **Sub-topic quiz** | One specific concept | "I need to practise integration by the reverse chain rule" |
| **Topic quiz** | All sub-topics in a focus area | "Test me on the whole of Integral calculus" |
| **Year 12 Advanced quiz** | All focus areas | "I have a trial HSC on everything" |

Topic and Year quizzes are aggregated automatically from sub-topic question banks.

---

## Year 12 Advanced Focus Areas

---

### Further graph transformations and modelling
**NESA outcomes:** MAV-12-01, MAV-12-02
**Strand:** Functions

| Sub-topic | Key content |
|---|---|
| Transformations of trigonometric functions | Apply reflections, translations and dilations to $y=\sin x$, $y=\cos x$, $y=\tan x$; determine amplitude, period, phase (horizontal) shift, vertical shift, domain and range; solve equations and graphical problems within a specified domain |
| Modelling periodic phenomena | Model real periodic situations (tides, daylight hours, temperature) using transformed trig functions, without calculus; fit amplitude/period/shift to data |
| Logarithmic scales | Recognise when a logarithmic scale is suitable for data over a large range; model and solve problems using decibels (dB), the Richter/seismic scale, stellar magnitude and the pH scale |

**Open Math notes:** The trig-graph work from Year 11 is extended to full $y = a\sin(b(x-c))+d$ modelling. Periodic modelling questions should use authentic datasets. Logarithmic-scale questions are numeric and check cleanly but conceptually demanding — build a dedicated difficulty 2–3 set on dB and Richter comparisons (each whole step = ×10).

---

### Sequences and series
**NESA outcome:** MAV-12-03 (verify)
**Strand:** Algebra / Functions

| Sub-topic | Key content |
|---|---|
| Arithmetic sequences and series | $n$th term $T_n = a + (n-1)d$; sum $S_n = \tfrac{n}{2}(2a+(n-1)d) = \tfrac{n}{2}(a+l)$; applications |
| Geometric sequences and series | $T_n = ar^{n-1}$; sum $S_n = \frac{a(r^n-1)}{r-1}$; limiting sum $S_\infty = \frac{a}{1-r}$ for $|r|<1$ |
| Applications of series | Recurrence relations; growth and decay; financial applications (compound interest as a GP, depreciation) as a bridge to Financial mathematics |

**Open Math notes:** A largely procedural, high-yield focus area — questions check cleanly. The limiting sum condition $|r|<1$ is a common error point and should be tested explicitly. Difficulty 3 questions should require forming the sequence from a worded context before summing.

---

### Differential calculus
**NESA outcome:** MAV-12-04 (verify)
**Strand:** Calculus

| Sub-topic | Key content |
|---|---|
| Differentiating exponential and logarithmic functions | $\frac{d}{dx}e^x = e^x$; $\frac{d}{dx}e^{f(x)} = f'(x)e^{f(x)}$; $\frac{d}{dx}\ln x = \tfrac{1}{x}$; $\frac{d}{dx}\ln f(x) = \frac{f'(x)}{f(x)}$ |
| Differentiating trigonometric functions | $\frac{d}{dx}\sin x = \cos x$; $\frac{d}{dx}\cos x = -\sin x$; $\frac{d}{dx}\tan x = \sec^2 x$; with chain rule |
| Combining the rules | Apply product, quotient and chain rules to exponential, logarithmic and trigonometric functions; second derivative $f''(x)$ |

**Open Math notes:** Extends the Year 11 differentiation rules to the new function families. First make sure the chain/product/quotient rules are fluent (revise with difficulty 1). Difficulty 3 questions should combine two rules (e.g. quotient of $e^x$ and a trig function) — a reliable HSC pattern.

---

### Integral calculus
**NESA outcome:** MAV-12-05 (verify)
**Strand:** Calculus

| Sub-topic | Key content |
|---|---|
| Anti-differentiation | The indefinite integral as the reverse of differentiation; $\int x^n\,dx = \frac{x^{n+1}}{n+1}+C$ ($n\neq-1$); integrate $e^{ax+b}$, $\frac{1}{x}$, $\sin$, $\cos$, $\sec^2$; reverse chain rule |
| The definite integral | Evaluate definite integrals; the area under a curve; the fundamental theorem of calculus; signed area |
| Areas and the trapezoidal rule | Area between a curve and an axis; area between two curves; approximate area using the trapezoidal rule |

**Open Math notes:** The single largest new focus area. Anti-differentiation must be secure before definite integrals and area. Signed area (regions below the axis) is the classic trap — test explicitly. Difficulty 3 questions should require finding the area between two curves after solving for intersection points.

---

### Applications of calculus
**NESA outcome:** MAV-12-06 (verify)
**Strand:** Calculus

| Sub-topic | Key content |
|---|---|
| Curve sketching | Stationary points and their nature (first/second derivative tests); concavity and points of inflection; increasing/decreasing intervals; sketch from $f'(x)$ and $f''(x)$ |
| Optimisation | Maxima and minima in practical problems; form the function, differentiate, justify the optimum |
| Rates of change and motion | Interpret $\frac{dy}{dx}$ as a rate; displacement, velocity ($\frac{dx}{dt}$) and acceleration; integrate a rate to recover the quantity |

**Open Math notes:** Brings differentiation and integration together. Optimisation word problems are a perennial HSC structure and the highest-value difficulty 3 set. Motion questions require care with the displacement/velocity/acceleration chain and with distance vs displacement. Curve sketching benefits from a graphing renderer.

---

### Random variables
**NESA outcome:** MAV-12-07 (verify)
**Strand:** Statistics and Probability

| Sub-topic | Key content |
|---|---|
| Continuous random variables | Probability density functions; probability as area under a pdf; mean, median and mode of a continuous distribution; uniform and other simple pdfs |
| The normal distribution | Properties of the normal curve; the empirical (68–95–99.7%) rule; z-scores; probabilities and proportions; compare values across distributions |

**Open Math notes:** The normal-distribution content overlaps conceptually with Standard 2 but is treated more formally (pdf, area interpretation). z-score and empirical-rule questions check cleanly. Continuous-pdf questions can require a definite integral, linking back to Integral calculus — a good difficulty 3 cross-topic item.

---

### Financial mathematics
**NESA outcome:** MAV-12-08 (verify)
**Strand:** Algebra / Functions

| Sub-topic | Key content |
|---|---|
| Annuities and superannuation | Future and present value of an annuity using series; recurrence relations; superannuation accumulation |
| Loans and investments | Reducing-balance loans; repayment calculations; compare investment and loan scenarios using geometric series |

**Open Math notes:** Sits directly on top of Sequences and series — sequence it last so the GP machinery is already fluent. Most questions are numeric and check cleanly but multi-step; provide a structured worked solution. Difficulty 3 questions should derive a repayment from a reducing-balance recurrence.

---

## Suggested Build Order

| Priority | Focus area | Rationale |
|---|---|---|
| 1 | Differential calculus | Prerequisite for integral calculus and applications |
| 2 | Integral calculus | Core HSC weighting; depends on differentiation |
| 3 | Applications of calculus | Brings both calculus strands together |
| 4 | Sequences and series | Self-contained; prerequisite for financial mathematics |
| 5 | Financial mathematics | Depends on sequences and series |
| 6 | Further graph transformations and modelling | Extends Year 11 functions; good consolidation |
| 7 | Random variables | Mostly self-contained; light calculus link |

---

## Relationship to Standard 2 and Extension 1

- **Mathematics Standard 2** covers the normal distribution, bivariate-style data, trigonometry and financial maths but **without calculus** and at an applied level (see `YEAR12_STANDARD2_SYLLABUS.md`).
- **Mathematics Extension 1** assumes all Advanced content and adds further calculus skills, applications, vectors, induction and the binomial distribution (see `YEAR12_EXTENSION1_SYLLABUS.md`). Advanced is the prerequisite spine for both Extension courses.

---

## Sources

- [NSW Curriculum — Mathematics Advanced 11–12 (2024), Year 12 content](https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-advanced-11-12-2024/content/year-12/)
- Focus areas (from NESA Year 12 content page): Further graph transformations and modelling, Sequences and series, Differential calculus, Integral calculus, Applications of calculus, Random variables, Financial mathematics
