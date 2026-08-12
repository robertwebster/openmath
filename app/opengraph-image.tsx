import { ImageResponse } from "next/og";

export const alt = "Open Math — free NSW Mathematics practice for Years 7 to 12";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (what ImageResponse renders with) supports a flexbox subset only: every
// div needs an explicit display, and there is no grid. Colours are the site's
// Tailwind palette — indigo-600 accent on slate text.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="88" height="88" viewBox="0 0 512 512">
            <rect width="512" height="512" rx="64" fill="#4F46E5" />
            <path
              d="M92 265H162L222 367L318 109H420"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="54"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
            />
          </svg>
          <div
            style={{
              display: "flex",
              marginLeft: "24px",
              fontSize: "40px",
              fontWeight: 600,
              color: "#4F46E5",
            }}
          >
            Open Math
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: "82px", fontWeight: 700, color: "#0F172A" }}>
            NSW Maths Practice
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              fontSize: "34px",
              color: "#64748B",
            }}
          >
            Free questions, instant feedback and worked examples for Years 7–12.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "26px", color: "#94A3B8" }}>
          openmath.au · No accounts · Open source
        </div>
      </div>
    ),
    size
  );
}
