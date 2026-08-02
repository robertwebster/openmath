# Year 12 NSW Mathematics Extension 2 — Syllabus Map

**Syllabus:** Mathematics Extension 2 11–12 (2024), taught from Term 4 2026
**Stage:** Stage 6 — Mathematics Extension 2 (Year 12 only)
**Structure:** 5 focus areas across 5 areas of study (Proof, Vectors, Complex numbers, Calculus, Mechanics) — the most rigorous Stage 6 course

> ⚠️ **Verification note:** Outcome codes (e.g. `MEX-12-01`) should be confirmed against the official digital curriculum at [curriculum.nsw.edu.au](https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-extension-2-11-12-2024/content). The working outcome `MAO-WM-01` applies to all focus areas. Extension 2 is studied **in addition to** Mathematics Extension 1 — all Extension 1 content is assumed. Extension 2 is a Year 12-only course. First HSC examination under this syllabus is 2027.

---

## Navigation and Quiz Structure

Content is organised into **two navigable tiers** — Topic (= NESA focus area) and Sub-topic. Strand is metadata only.

Three quiz levels exist, all drawing from a **single source of truth** at the sub-topic level:

| Level | What it covers | Use case |
|---|---|---|
| **Sub-topic quiz** | One specific concept | "I need to practise De Moivre's theorem" |
| **Topic quiz** | All sub-topics in a focus area | "Test me on the whole of Complex numbers" |
| **Year 12 Extension 2 quiz** | All focus areas | "I have a trial HSC on everything" |

Topic and Year quizzes are aggregated automatically from sub-topic question banks.

---

## Year 12 Extension 2 Focus Areas

---

### The nature of proof
**NESA outcome:** MEX-12-01 (verify)
**Strand:** Proof

| Sub-topic | Key content |
|---|---|
| Language and methods of proof | Implication, converse, contrapositive, negation, equivalence; quantifiers ($\forall$, $\exists$); counterexamples; the structure of a rigorous argument |
| Proof techniques | Proof by contradiction; proof of existence/uniqueness; proofs involving rational/irrational numbers |
| Proving inequalities | Prove inequalities from definitions; use of $a^2 \ge 0$; AM–GM; inequalities in two or more variables |

**Open Math notes:** Almost entirely `"type": "proof"` — present model solutions for comparison, not auto-marking. The emphasis is on rigour and communication, so worked solutions must be exemplary in their logical structure. Proof by contradiction (e.g. $\sqrt{2}$ irrational) and AM–GM inequalities are the staple patterns. This is the conceptual heart of the course.

---

### Complex numbers
**NESA outcome:** MEX-12-02 (verify)
**Strand:** Complex numbers

| Sub-topic | Key content |
|---|---|
| Arithmetic and Cartesian form | $i^2 = -1$; addition, multiplication, division; conjugate; modulus; the Argand diagram |
| Polar and exponential form | Modulus–argument form $r(\cos\theta + i\sin\theta)$; Euler's form $re^{i\theta}$; multiplication/division as rotation and scaling; De Moivre's theorem |
| Roots and identities | $n$th roots of a complex number and roots of unity; use De Moivre to derive trig identities; powers of complex numbers |
| Curves and regions (loci) | Loci defined by modulus and argument conditions; sketch regions in the Argand plane; equations of lines and circles in complex form |

**Open Math notes:** Cartesian arithmetic and modulus/argument questions are numeric/exact and check cleanly. Loci and roots-of-unity work needs diagram support — flag for image/graphing renderer. De Moivre identity derivations are `"type": "proof"`. Sequence arithmetic → polar/exponential → roots → loci.

---

### Further integration
**NESA outcome:** MEX-12-03 (verify)
**Strand:** Calculus

| Sub-topic | Key content |
|---|---|
| Integration techniques | Integration by parts; partial fractions (including repeated and quadratic factors); the $t = \tan(x/2)$ substitution; trigonometric integrals and powers |
| Recurrence and harder integrals | Reduction formulae; combining techniques; definite integrals requiring a choice of method |

**Open Math notes:** Pure technique at the highest Stage 6 level — questions are numeric/exact but the working carries the value, so worked solutions must be complete and well-motivated (why this technique?). Integration by parts and partial fractions are the two highest-frequency methods. Difficulty 3 questions should require recognising which technique (or combination) applies.

---

### Mechanics
**NESA outcome:** MEX-12-04 (verify)
**Strand:** Mechanics

| Sub-topic | Key content |
|---|---|
| Velocity, acceleration and calculus | Acceleration as $\frac{dv}{dt} = v\frac{dv}{dx} = \frac{d}{dx}(\tfrac{1}{2}v^2)$; motion from a given acceleration; problems combining the forms |
| Simple harmonic motion | $\ddot{x} = -n^2 x$; derive displacement, velocity and period/amplitude; SHM in context |
| Resisted motion and projectiles | Motion with resistance proportional to velocity (and $v^2$); terminal velocity; projectile motion with air resistance |

**Open Math notes:** The most physically applied focus area — heavy on setting up and solving differential equations of motion, so it depends on *Further integration* and Extension 1 calculus. SHM derivations and resisted-motion problems are the signature difficulty 3 content. Clear diagrams of forces are valuable.

---

### Further work with vectors
**NESA outcome:** MEX-12-05 (verify)
**Strand:** Vectors

| Sub-topic | Key content |
|---|---|
| Three-dimensional vectors | Vectors in 3D; components $\mathbf{i}, \mathbf{j}, \mathbf{k}$; magnitude; dot product and angle in 3D |
| Vector equations of lines and curves | Vector equation of a line $\mathbf{r} = \mathbf{a} + \lambda\mathbf{b}$; parametric form; intersection and skew lines; model curves with vectors |
| Geometric proof with vectors | Prove geometric and coordinate-geometry results using vectors (3D); perpendicularity and parallelism |

**Open Math notes:** Extends Extension 1's 2D vectors into 3D and into formal proof. Component and dot-product questions are numeric and check cleanly; the geometric proofs are `"type": "proof"`. Vector equations of lines (including skew lines) are the genuinely new procedural content. Diagram support helps but 3D diagrams are hard — consider an interactive renderer later.

---

## Suggested Build Order

| Priority | Focus area | Rationale |
|---|---|---|
| 1 | The nature of proof | Foundational habits of rigour used everywhere else |
| 2 | Complex numbers | Large, mostly self-contained; high HSC weighting |
| 3 | Further integration | Prerequisite technique for mechanics |
| 4 | Mechanics | Depends on further integration and Ext 1 calculus |
| 5 | Further work with vectors | Extends Ext 1 vectors; combines with proof |

---

## Relationship to Extension 1

- **Mathematics Extension 1** is the assumed foundation — its induction, vectors (2D), and calculus underpin Extension 2's proof, vectors (3D) and mechanics respectively (see `YEAR12_EXTENSION1_SYLLABUS.md`).
- Extension 2 is the terminal course: nothing builds on it within Stage 6. It is the natural last track to build in Open Math, after the Standard 2, Advanced and Extension 1 banks are complete.

---

## Sources

- [NSW Curriculum — Mathematics Extension 2 11–12 (2024), content](https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-extension-2-11-12-2024/content)
- [Mathematics Extension 2 11–12 (2024) — Outcomes](https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-extension-2-11-12-2024/outcomes)
- Focus areas: The nature of proof, Complex numbers, Further integration, Mechanics, Further work with vectors
