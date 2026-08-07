import { ImageResponse } from "next/og";
import { ogLogoDataUri } from "@/lib/ogLogo";

/*
  The default share card — what WhatsApp, Facebook, LinkedIn, Slack, X and
  Google's share sheet show when someone posts a link to this site. It covers
  the home page and every route that does not generate its own (the location
  tree, /services, /about …); app/[slug]/opengraph-image.tsx overrides it for
  the service×city pages.

  1200×630 is the size to build for: it is the 1.91:1 ratio every platform
  crops to, and it is comfortably over WhatsApp's ~300×200 floor for showing a
  large preview instead of a thumbnail. The logo is embedded rather than
  linked because satori resolves no network requests here — and it comes from
  lib/ogLogo.ts as a literal string rather than a filesystem read, for a
  reason worth reading before changing it.

  Before this, app/page.tsx and app/layout.tsx both set
  openGraph.images = [{ url: "/logo.png", width: 800, height: 600 }], which
  overrode this file entirely — and /logo.png is actually 452×392. Crawlers
  were handed a small image with dimensions that did not match it, which is
  what makes a preview collapse to a thumbnail or drop out. Those overrides
  are gone; this card is the single source now.
*/

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
          alignItems: "center",
          gap: "64px",
          background:
            "linear-gradient(135deg, #0b0f17 0%, #1a1206 55%, #7a2f06 100%)",
          padding: "72px",
        }}
      >
        {/* The logo, on white so the orange mark keeps its contrast against
            the dark card. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "380px",
            height: "380px",
            flexShrink: 0,
            borderRadius: "48px",
            background: "#ffffff",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ogLogoDataUri} width={300} height={260} alt="" />
        </div>

        {/* Width is pinned rather than left to flex: satori does not shrink a
            text node to fit its parent, so an unconstrained column runs the
            tagline straight off the right edge of the card. 1200 − 144 padding
            − 380 logo − 64 gap = 612. */}
        <div style={{ display: "flex", flexDirection: "column", width: "612px" }}>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            Sabka Saathi
          </div>
          <div
            style={{
              display: "flex",
              color: "#f38200",
              fontSize: "34px",
              fontWeight: 700,
              marginTop: "14px",
            }}
          >
            Digital Services
          </div>
          <div
            style={{
              display: "flex",
              color: "#e2e8f0",
              fontSize: "28px",
              lineHeight: 1.4,
              marginTop: "26px",
            }}
          >
            Websites, mobile apps, custom software &amp; CRM automation for
            businesses across India
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              marginTop: "34px",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: "23px",
                fontWeight: 700,
                background: "rgba(255, 149, 0, 0.16)",
                border: "1px solid rgba(255, 149, 0, 0.5)",
                borderRadius: "999px",
                padding: "10px 24px",
              }}
            >
              GST registered
            </div>
            <div style={{ display: "flex", color: "#94a3b8", fontSize: "23px" }}>
              sabkasaathidigitalservices.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
