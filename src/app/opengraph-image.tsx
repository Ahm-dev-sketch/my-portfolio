import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";
import { translations } from "@/data/translations";

export const alt = translations.en.meta.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const meta = translations.en.meta;

/* Satori has no access to the self-hosted next/font files, so the
   OG card uses a system serif/sans pairing. Palette + composition
   match the site so it never looks orphaned. */
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS =
  "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const INK = "#241A17";
const INK_SOFT = "#5C4A43";
const MUTED = "#8A776D";
const HAIRLINE = "#E4D9CA";
const CLAY = "#A85A44";
const PAPER = "#FAF6EF";
const PAPER_DEEP = "#F2EAE0";

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
          backgroundColor: PAPER,
          color: INK,
          padding: "64px 80px",
          fontFamily: SANS,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontFamily: SANS,
          }}
        >
          <span style={{ color: CLAY }}>Portfolio · 2026</span>
          <span style={{ color: MUTED }}>
            Central Tapanuli, North Sumatra
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 92,
                lineHeight: 1,
                letterSpacing: -3,
                color: INK,
                maxWidth: 760,
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                marginTop: 30,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 1,
                  backgroundColor: CLAY,
                }}
              />
              <div
                style={{
                  fontSize: 24,
                  lineHeight: 1.4,
                  color: INK_SOFT,
                  maxWidth: 660,
                }}
              >
                {profile.headline.en.split("|")[0]}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 236,
              borderRadius: "100px 100px 24px 24px",
              border: `1px solid ${HAIRLINE}`,
              backgroundColor: PAPER_DEEP,
              color: CLAY,
              fontFamily: SERIF,
              fontSize: 64,
              letterSpacing: 3,
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
            borderTop: `1px solid ${HAIRLINE}`,
            paddingTop: 30,
            fontSize: 21,
            color: MUTED,
          }}
        >
          <span style={{ color: INK_SOFT }}>{meta.ogTitle}</span>
          <span style={{ color: CLAY }}>linkedin.com/in/mutiah-ulfa-</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
