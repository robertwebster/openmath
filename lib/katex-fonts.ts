/**
 * KaTeX's stylesheet declares its fonts with `font-display: block`, so a glyph
 * whose font hasn't downloaded yet is drawn invisibly rather than in a fallback
 * font. Browsers only fetch a font once visible text needs it, and most printed
 * maths (the worksheet, worked-example steps, explanations) is hidden on screen.
 * Printing before those fonts arrive leaves blank gaps where the maths should be,
 * so we fetch them up front instead of waiting for the print layout to ask.
 */

let loading: Promise<unknown> | null = null;

/** Start downloading every KaTeX font face. Safe to call repeatedly. */
export function loadKatexFonts(): Promise<unknown> {
  if (!loading) {
    const faces = [...document.fonts].filter((face) =>
      face.family.replace(/["']/g, "").startsWith("KaTeX_")
    );
    // allSettled: one failed face shouldn't stop the rest, or block printing
    loading = Promise.allSettled(faces.map((face) => face.load()));
  }
  return loading;
}

// A slow or failed download should never leave the print button dead.
const PRINT_FONT_TIMEOUT_MS = 3000;

/** Resolves once the KaTeX fonts are loaded, or after a short timeout. */
export function katexFontsReady(): Promise<unknown> {
  return Promise.race([
    loadKatexFonts(),
    new Promise((resolve) => setTimeout(resolve, PRINT_FONT_TIMEOUT_MS)),
  ]);
}

/** Open the print dialog once the maths fonts are ready to render. */
export async function printWhenFontsReady(): Promise<void> {
  await katexFontsReady();
  window.print();
}
