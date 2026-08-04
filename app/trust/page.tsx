import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { TrustContent } from "@/components/TrustContent";
import { RoyalFooter } from "@/components/royal/RoyalFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust, Transparency & Legal | Sabka Saathi",
  description:
    "Learn about Sabka Saathi Digital Services, our founder Ashish Kumar, our privacy policy, terms of service, and commitment to transparency & verified services.",
};

const pageStyles = `

  .tp-main { font-family: var(--font-dm-sans), sans-serif; }

  /* ── page-level liquid blobs ─────────────────────────────── */
  .tp-blob {
    position: absolute; z-index: 0; pointer-events: none;
    filter: blur(70px); will-change: transform, border-radius;
  }
  .tp-blob-a {
    top: 4%; right: -8%; width: 40vw; height: 40vw; max-width: 560px; max-height: 560px;
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.20), rgba(224, 102, 0, 0.14));
    animation: tpMorphA 19s ease-in-out infinite;
  }
  .tp-blob-b {
    top: 38%; left: -10%; width: 32vw; height: 32vw; max-width: 440px; max-height: 440px;
    background: linear-gradient(135deg, rgba(224, 102, 0, 0.12), rgba(255, 210, 0, 0.16));
    animation: tpMorphB 23s ease-in-out infinite;
  }
  @keyframes tpMorphA {
    0%, 100% { border-radius: 42% 58% 65% 35% / 45% 40% 60% 55%; transform: translate(0,0) rotate(0deg); }
    33%      { border-radius: 58% 42% 38% 62% / 60% 55% 45% 40%; transform: translate(-18px, 22px) rotate(7deg); }
    66%      { border-radius: 35% 65% 55% 45% / 40% 60% 38% 62%; transform: translate(14px, -16px) rotate(-5deg); }
  }
  @keyframes tpMorphB {
    0%, 100% { border-radius: 55% 45% 40% 60% / 38% 62% 45% 55%; transform: translate(0,0) rotate(0deg); }
    50%      { border-radius: 38% 62% 58% 42% / 60% 40% 55% 45%; transform: translate(18px, -12px) rotate(9deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .tp-blob-a, .tp-blob-b { animation: none; }
  }

`;

export default function TrustPage() {
  return (
    <div className="flex min-h-screen flex-col selection:bg-orange-100 selection:text-orange-950 bg-[#f2f2f4] tp-main">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <InteractiveBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative z-10 overflow-hidden">
        <div className="tp-blob tp-blob-a" aria-hidden="true" />
        <div className="tp-blob tp-blob-b" aria-hidden="true" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <TrustContent />
        </div>
      </main>

      <RoyalFooter />
    </div>
  );
}