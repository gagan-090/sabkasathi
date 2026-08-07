import { ImageResponse } from "next/og";
import { getContentBySlug, getPagesList } from "@/lib/localSeo";

// Dynamic Open Graph image per city×service page (1200×630). Replaces the
// single shared /logo.png card so every page gets a distinct, branded social /
// AI-preview image. satori (next/og) supports flexbox + a subset of CSS only —
// no grid — and uses a built-in default font, so no font fetching is needed.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sabka Saathi — Software Development Company in India";

/* Generated on first request, then cached — not prerendered.

   This used to return getPagesList(), which was 242 cities × 8 services when
   it was written. The catalog has since grown to 33 services, so it had
   quietly become 7,986 build-time PNG renders: ~16,000 files in the output
   bundle for images that are only ever fetched when someone shares a link.
   The output bundle has a size ceiling, and blowing past it is what dropped
   public/ from a deploy — see the note in app/opengraph-image.tsx. */
export function generateStaticParams() {
  return [];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getContentBySlug(slug);
  const service = data?.serviceName ?? "Software Development";
  const city = data?.cityName ?? "India";
  const state = data?.state ?? "";

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
            {service}
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "78px",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            Company in {city}
          </div>
          {state ? (
            <div
              style={{
                display: "flex",
                color: "#c2cbd8",
                fontSize: "30px",
                marginTop: "20px",
              }}
            >
              {state}, India · Remote-first delivery
            </div>
          ) : null}
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
