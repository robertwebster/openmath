"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadKatexFonts } from "@/lib/katex-fonts";

/**
 * Fetches the KaTeX fonts in the background on any page that contains maths,
 * so printing with Ctrl+P (which bypasses our print buttons) doesn't race the
 * font download. Pages without maths download nothing. See lib/katex-fonts.ts.
 *
 * Lives in the root layout, which survives client-side navigation, so it
 * re-checks on every route change rather than only on first load.
 */
export default function KatexFontWarmup() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.querySelector(".katex")) return;
    // Wait for idle so this doesn't compete with the page's first render.
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => loadKatexFonts());
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => loadKatexFonts(), 1000);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
