import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";
import { translations } from "@/data/translations";

export const alt = translations.en.meta.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const meta = translations.en.meta;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F7F8F5",
          color: "#17231F",
          padding: "72px 80px",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#245B49",
          }}
        >
          <span>Portfolio · 2026</span>
          <span style={{ color: "#65736D" }}>Pekanbaru, Indonesia</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontSize: 78,
                lineHeight: 1.02,
                letterSpacing: -3,
                fontWeight: 600,
                maxWidth: 780,
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 27,
                lineHeight: 1.45,
                color: "#65736D",
                maxWidth: 720,
              }}
            >
              {profile.headline.en}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 196,
              height: 196,
              borderRadius: 10,
              border: "1px solid #D4E3D8",
              backgroundColor: "#E4EEE7",
              color: "#184534",
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            {profile.monogram}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #DFE6E0",
            paddingTop: 28,
            fontSize: 22,
            color: "#65736D",
          }}
        >
          <span style={{ color: "#17231F" }}>{meta.ogTitle}</span>
          <span>linkedin.com/in/mutiah-ulfa-</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
