/**
 * Canonical production origin. No trailing slash — callers append the path.
 *
 * Used by the root metadataBase, the sitemap and robots.txt, so absolute URLs
 * are only spelled out in one place.
 */
export const SITE_URL = "https://openmath.au";
