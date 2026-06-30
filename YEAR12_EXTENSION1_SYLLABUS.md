# Year 12 NSW Mathematics Extension 1 — Syllabus Map

**Syllabus:** Mathematics Extension 1 11–12 (2024), Year 12 content taught from Term 4 2026
**Stage:** Stage 6 — Mathematics Extension 1
**Structure:** 6 focus areas across 4 areas of study (Proof, Trigonometric functions, Vectors, Calculus, Statistical Analysis) — sits on top of Mathematics Advanced

> ⚠️ **Verification note:** Outcome codes (e.g. `ME-12-01`) should be confirmed against the official digital curriculum at [curriculum.nsw.edu.au](https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-extension-1-11-12-2024/content). The working outcome `MAO-WM-01` applies to all focus areas. Extension 1 is studied **in addition to** Mathematics Advanced — Advanced content is assumed throughout. First HSC examination under this syllabus is 2027.

---

## Navigation and Quiz Structure

Content is organised into **two navigable tiers** — Topic (= NESA focus area) and Sub-topic. Strand is metadata only.

Three quiz levels exist, all drawing from a **single source of truth** at the sub-topic level:

| Level | What it covers | Use case |
|---|---|---|
| **Sub-topic quiz** | One specific concept | "I need to practise proof by induction" |
| **Topic quiz** | All sub-topics in a focus area | "Test me on the whole of Vectors" |
| **Year 12 Extension 1 quiz** | All focus areas | "I have a trial HSC on everything" |

Topic and Year quizzes are aggregated automatically from sub-topic question banks.

---

## Year 12 Extension 1 Focus Areas

---

### Proof by mathematical induction
**NESA outcome:** ME-12-01 (verify)
**Strand:** Proof

| Sub-topic | Key content |
|---|---|
| Mathematical induction | The principle of induction (base case, assumption, inductive step); prove divisibility results; prove summation/series identities; structure and communicate an induction proof |
| Applications and harder induction | Induction with inequalities; induction in geometric/recursive contexts; recognise when induction is the appropriate technique |

**Open Math notes:** This is `"type": "proof"` content — present a model solution for the student to compare against rather than auto-marking. Emphasise the *structure* (state the proposition, prove base case, assume for $n=k$, prove for $n=k+1$, conclude). Divisibility and summation proofs are the two staple difficulty 2 patterns; inequality induction is difficulty 3.

---

### Inverse trigonometric functions
**NESA outcome:** ME-12-02 (verify)
**Strand:** Trigonometric functions

| Sub-topic | Key content |
|---|---|
| Inverse trig functions | Define $\sin^{-1}x$, $\cos^{-1}x$, $\tan^{-1}x$ with restricted domains and ranges; graph the inverse functions; evaluate exact values |
| Properties and calculus | Symmetry and key properties; derivatives $\frac{d}{dx}\sin^{-1}x = \frac{1}{\sqrt{1-x^2}}$ etc.; integrals giving inverse-trig results; solve related problems |

**Open Math notes:** The domain/range restriction is the central idea and a common error point — test it explicitly with conceptual items. The calculus of inverse trig connects to *Further calculus skills*; sequence this before the integration focus areas so those standard integrals are available. Most evaluation questions are numeric/exact and check cleanly.

---

### Introduction to vectors
**NESA outcome:** ME-12-03 (verify)
**Strand:** Vectors

| Sub-topic | Key content |
|---|---|
| Vector concepts | Vectors as directed quantities; component and magnitude–direction form; addition, subtraction, scalar multiplication; unit vectors $\mathbf{i}, \mathbf{j}$; magnitude and direction |
| Dot product and geometry | Scalar (dot) product; angle between vectors; parallel and perpendicular vectors; projections; prove geometric results using vectors |
| Projectile motion | Model projectile motion with vectors; horizontal and vertical components; time of flight, range, maximum height; equations of motion |

**Open Math notes:** Vectors are new to most students — build component algebra fluency before geometry/proof. Projectile motion ties vectors to calculus and is a high-weighting application; require students to derive flight time and range rather than quoting formulas. Geometric vector proofs are `"type": "proof"`. Diagram support is valuable throughout.

---

### Further calculus skills
**NESA outcome:** ME-12-04 (verify)
**Strand:** Calculus

| Sub-topic | Key content |
|---|---|
| Integration by substitution | The reverse chain rule and $u$-substitution; definite integrals with substitution (changing limits) |
| Standard integral forms | Integrate to inverse-trig and logarithmic forms; integrals of $\sin^2 x$, $\cos^2 x$ via double-angle; partial-fraction-ready linear cases |

**Open Math notes:** Pure technique — most questions are numeric/exact and check cleanly, but the working is where the learning is, so worked solutions must be thorough. Changing the limits during a definite-integral substitution is the classic error; test it explicitly. Sequence after Inverse trig functions so those standard forms are available.

---

### Further applications of calculus
**NESA outcome:** ME-12-05 (verify)
**Strand:** Calculus

| Sub-topic | Key content |
|---|---|
| Differential equations | Solve $\frac{dy}{dx} = f(x)$ and separable forms; direction fields (qualitative); model with simple differential equations |
| Exponential growth and decay | $\frac{dN}{dt} = k(N - P)$ and related models; Newton's law of cooling; solve and interpret in context |
| Related rates and volumes | Related rates of change; volumes of solids of revolution by integration |

**Open Math notes:** The applied capstone of the calculus strand. Growth/decay and related-rates word problems are the highest-value difficulty 3 sets. Volumes of revolution need a clear diagram. Differential-equation modelling questions should ask for both the solution and an interpretation of a parameter.

---

### The binomial distribution
**NESA outcome:** ME-12-06 (verify)
**Strand:** Statistical Analysis

| Sub-topic | Key content |
|---|---|
| The binomial distribution | Bernoulli trials; $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$; mean $np$ and variance $np(1-p)$; calculate and interpret binomial probabilities |
| Sampling distribution of the mean | The sample proportion/mean as a random variable; normal approximation to the binomial; sampling distribution of $\bar{x}$; estimate and interpret |

**Open Math notes:** Binomial-probability questions are numeric and check cleanly. The sampling-distribution content is conceptually the hardest part — the idea that a statistic is itself a random variable needs careful framing. Difficulty 3 questions should combine a binomial probability with a "at least one"/complement argument or a normal approximation.

---

## Suggested Build Order

| Priority | Focus area | Rationale |
|---|---|---|
| 1 | Inverse trigonometric functions | Provides standard derivatives/integrals used later |
| 2 | Further calculus skills | Core technique; depends on inverse-trig forms |
| 3 | Further applications of calculus | Applies the calculus skills; high weighting |
| 4 | Introduction to vectors | Self-contained; large new strand |
| 5 | Proof by mathematical induction | Self-contained; proof-type content |
| 6 | The binomial distribution | Self-contained; links to Advanced random variables |

---

## Relationship to Advanced and Extension 2

- **Mathematics Advanced** is the assumed foundation — its differentiation, integration and the normal distribution underpin every Extension 1 calculus and statistics topic (see `YEAR12_ADVANCED_SYLLABUS.md`).
- **Mathematics Extension 2** assumes all Extension 1 content and pushes proof, vectors (3D), complex numbers, integration and mechanics much further (see `YEAR12_EXTENSION2_SYLLABUS.md`). Extension 1 induction and vectors are direct prerequisites for Extension 2 proof and mechanics.

---

## Sources

- [NSW Curriculum — Mathematics Extension 1 11–12 (2024), content](https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-extension-1-11-12-2024/content)
- [Mathematics Extension 1 11–12 (2024) — Outcomes](https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-extension-1-11-12-2024/outcomes)
- Focus areas: Proof by mathematical induction, Inverse trigonometric functions, Introduction to vectors, Further calculus skills, Further applications of calculus, The binomial distribution and the sampling distribution of the mean
