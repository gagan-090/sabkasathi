import { ImageResponse } from "next/og";

// Branded default Open Graph image (1200×630) for the homepage and any route
// without its own opengraph-image. Replaces the shared /logo.png card.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sabka Saathi — Software Development Company in India";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0b0f17 0%, #1a1206 55%, #7a2f06 100%)",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #f38200, #d2540a)",
            }}
          />
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "32px",
              fontWeight: 700,
            }}
          >
            Sabka Saathi
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#f38200",
              fontSize: "28px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            Software Development Company
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "82px",
              fontWeight: 800,
              lineHeight: 1.04,
            }}
          >
            Building software for India
          </div>
          <div
            style={{
              display: "flex",
              color: "#c2cbd8",
              fontSize: "30px",
              marginTop: "20px",
            }}
          >
            Custom web, mobile, SaaS &amp; CRM · Remote-first, nationwide
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", color: "#8c9aac", fontSize: "24px" }}>
            sabkasaathidigitalservices.com
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 700,
              background: "rgba(255, 149, 0, 0.15)",
              border: "1px solid rgba(255, 149, 0, 0.5)",
              borderRadius: "999px",
              padding: "10px 26px",
            }}
          >
            Web · App · SaaS · CRM
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
