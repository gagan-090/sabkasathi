import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { TrustContent } from "@/components/TrustContent";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust, Transparency & Legal | Sabka Saathi",
  description:
    "Learn about Sabka Saathi Digital Services, our founder Ashish Kumar, our privacy policy, terms of service, and commitment to transparency & verified services.",
};

const footerStyles = `

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

  /* ── footer ──────────────────────────────────────────────── */
  .tp-footer {
    position: relative; overflow: hidden;
    background: #15151a;
  }
  .tp-footer-grain {
    position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }
  .tp-footer-blob {
    position: absolute; z-index: 0; pointer-events: none; filter: blur(90px); opacity: 0.5;
    top: -10%; right: 4%; width: 34vw; height: 34vw; max-width: 460px; max-height: 460px;
    background: linear-gradient(135deg, rgba(255, 210, 0, 0.18), rgba(224, 102, 0, 0.14));
    animation: tpMorphA 24s ease-in-out infinite;
  }

  .tp-brand {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 600;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #ffffff 0%, #ffe3d2 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .tp-col-label {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.66rem;
    background: linear-gradient(135deg, #ffd200, #d2540a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    display: inline-flex; align-items: center; gap: 0.5rem;
  }
  .tp-col-label::before {
    content: ''; width: 5px; height: 5px; border-radius: 50%;
    background: #f38200; box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
    -webkit-text-fill-color: initial;
  }

  .tp-link {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400; font-size: 0.92rem;
    color: rgba(255,255,255,0.62); text-decoration: none;
    transition: color 0.3s ease, transform 0.3s cubic-bezier(0.25,1,0.5,1);
    display: inline-block;
  }
  .tp-link:hover { color: #fff; transform: translateX(5px); }

  .tp-hub-name {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500; font-size: 0.92rem;
    color: rgba(255,255,255,0.78); text-decoration: none;
    transition: color 0.3s ease;
  }
  .tp-hub-name:hover { color: #ffd200; }
  .tp-hub-sub {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400; font-size: 0.74rem;
    color: rgba(255,255,255,0.32);
  }

  .tp-icon-btn {
    height: 3.4rem; width: 3.4rem; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.62);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10);
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    transition: transform 0.38s cubic-bezier(0.25,1,0.5,1), box-shadow 0.38s ease, border-color 0.3s ease, background 0.3s ease, color 0.3s ease;
    text-decoration: none;
  }
  .tp-icon-btn:hover {
    transform: translateY(-3px) scale(1.04);
    background: linear-gradient(135deg, #ffd200, #d2540a);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 8px 26px rgba(224, 102, 0, 0.34);
  }

  .tp-desc {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 400;
    color: rgba(255,255,255,0.48); line-height: 1.7;
  }

  .tp-gstin {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500; letter-spacing: 0.02em;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.56);
  }

  .tp-bottom-text {
    font-family: var(--font-dm-sans), sans-serif; font-weight: 500;
    letter-spacing: 0.16em; color: rgba(255,255,255,0.30);
  }
`;

export default function TrustPage() {
  return (
    <div className="flex min-h-screen flex-col selection:bg-orange-100 selection:text-orange-950 bg-[#f2f2f4] tp-main">
      <style dangerouslySetInnerHTML={{ __html: footerStyles }} />
      <InteractiveBackground />
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative z-10 overflow-hidden">
        <div className="tp-blob tp-blob-a" aria-hidden="true" />
        <div className="tp-blob tp-blob-b" aria-hidden="true" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <TrustContent />
        </div>
      </main>

      {/* Footer — liquid theme */}
      <footer className="tp-footer py-24 text-white relative z-10 border-t border-white/5 mt-0">
        <div className="tp-footer-grain" aria-hidden="true" />
        <div className="tp-footer-blob" aria-hidden="true" />

        <div className="container mx-auto px-4 max-w-7xl relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-5 text-center md:text-left">
              <h3 className="tp-brand text-3xl mb-6 tracking-tight uppercase">SABKA SAATHI</h3>
              <p className="tp-desc max-w-sm mb-10 text-base mx-auto md:mx-0">
                Premium software development agency specializing in Next.js, CRM automation, and high-fidelity digital transformation.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="tel:+919431673018" className="tp-icon-btn" aria-label="Call us">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6.6 10.8C8 13.6 10.4 16 13.2 17.4L15.4 15.2C15.7 14.9 16.1 14.8 16.5 14.95C17.7 15.35 19 15.55 20.3 15.55C20.9 15.55 21.4 16.05 21.4 16.65V20.3C21.4 20.9 20.9 21.4 20.3 21.4C10.7 21.4 2.6 13.3 2.6 3.7C2.6 3.1 3.1 2.6 3.7 2.6H7.35C7.95 2.6 8.45 3.1 8.45 3.7C8.45 5 8.65 6.3 9.05 7.5C9.2 7.9 9.1 8.3 8.8 8.6L6.6 10.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="mailto:helpsabkasaathi@gmail.com" className="tp-icon-btn" aria-label="Email us">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3.5 6L12 12.5L20.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="md:col-span-3 text-center md:text-left">
              <h4 className="tp-col-label mb-8">Platform</h4>
              <ul className="space-y-5">
                <li><Link href="/" className="tp-link">Home</Link></li>
                <li><Link href="/#expertise" className="tp-link">Expertise</Link></li>
                <li><Link href="/#how-it-works" className="tp-link">Process</Link></li>
                <li><Link href="/trust" className="tp-link">Legal &amp; Trust</Link></li>
              </ul>
            </div>

            <div className="md:col-span-4 text-center md:text-left">
              <h4 className="tp-col-label mb-8">Regional Hubs</h4>
              <ul className="space-y-6">
                <li className="flex flex-col gap-1">
                  <Link href="/location/bihar" className="tp-hub-name">Bihar Development Center</Link>
                  <span className="tp-hub-sub">Patna, Sheikhpura</span>
                </li>
                <li className="flex flex-col gap-1">
                  <Link href="/location/gujarat" className="tp-hub-name">Gujarat Business Hub</Link>
                  <span className="tp-hub-sub">Ahmedabad, Bhavnagar</span>
                </li>
                <li className="flex flex-col gap-1">
                  <Link href="/location/maharashtra" className="tp-hub-name">Maharashtra Tech Pivot</Link>
                  <span className="tp-hub-sub">Pune, Mumbai</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="tp-bottom-text text-[10px] uppercase">© 2026 SABKA SAATHI DIGITAL SERVICES. ALL RIGHTS RESERVED.</p>
            <p className="tp-gstin px-4 py-2 rounded-lg text-xs">GSTIN: 10LAHPK8872L1Z3</p>
          </div>
        </div>
      </footer>
    </div>
  );
}