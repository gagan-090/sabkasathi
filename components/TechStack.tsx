"use client";

import { useEffect, useRef } from "react";

const styles = `

  .ts-section {
    position: relative; overflow: hidden;
    background: #f2f2f4;
    padding: clamp(5rem,10vw,7rem) 0 clamp(4rem,8vw,6rem);
    font-family: var(--font-dm-sans), sans-serif;
  }

  .ts-grain {
    position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
    /* grain animation removed — was repainting full section every ~0.26s */
  }
  @keyframes tsGrain {
    0%   { background-position:   0px   0px; }
    25%  { background-position: -30px  12px; }
    50%  { background-position:  14px -22px; }
    75%  { background-position: -18px  28px; }
  }

  /* ── Copy ── */
  .ts-inner {
    position: relative; z-index: 2;
    max-width: 1080px; margin: 0 auto;
    padding: 0 clamp(1.25rem,4vw,3rem);
    text-align: center;
    margin-bottom: clamp(2.5rem,5vw,4rem);
  }
  .ts-eyebrow {
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-size: 0.68rem; font-weight: 500;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: rgba(0,0,0,0.36); margin-bottom: 1.2rem;
  }
  .ts-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #f38200;
    box-shadow: 0 0 8px rgba(255, 149, 0, 0.7);
    animation: tsDotPulse 2.4s ease-in-out infinite;
  }
  @keyframes tsDotPulse {
    0%,100% { box-shadow: 0 0 8px rgba(255, 149, 0, .7), 0 0 0 0 rgba(255, 149, 0, .3); }
    50%     { box-shadow: 0 0 14px rgba(255, 149, 0, .9), 0 0 0 5px rgba(255, 149, 0, 0); }
  }
  .ts-h2 {
    font-size: clamp(2rem,4vw,3.2rem); font-weight: 500;
    letter-spacing: -0.025em; line-height: 1.1;
    color: #1d1d1f; margin: 0 0 1rem;
  }
  .ts-h2 em {
    font-style: normal;
    background: linear-gradient(135deg, #ffd200 0%, #d2540a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ts-sub {
    font-size: clamp(0.88rem,1.2vw,1rem);
    color: rgba(29,29,31,0.48); line-height: 1.75;
    max-width: 520px; margin: 0 auto;
  }

  /* ── Marquee wrapper ── */
  .ts-marquee-wrap {
    position: relative; z-index: 2; overflow: hidden;
  }
  .ts-fade-l, .ts-fade-r {
    position: absolute; top: 0; bottom: 0; width: 140px;
    z-index: 10; pointer-events: none;
  }
  .ts-fade-l { left: 0;  background: linear-gradient(to right, #f2f2f4 0%, transparent 100%); }
  .ts-fade-r { right: 0; background: linear-gradient(to left,  #f2f2f4 0%, transparent 100%); }

  /* ── Rows ── */
  .ts-row {
    display: flex; gap: 14px;
    padding: 7px 0;
    width: max-content;
    will-change: transform;
  }
  .ts-row-1 { animation: tsSlideLeft  32s linear infinite; }
  .ts-row-2 { animation: tsSlideRight 38s linear infinite; margin-top: 14px; }
  .ts-row-1:hover,
  .ts-row-2:hover { animation-play-state: paused; }

  @keyframes tsSlideLeft  { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
  @keyframes tsSlideRight { from { transform: translateX(-50%); } to { transform: translateX(0);    } }

  /* ── Chip ── */
  .ts-chip {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 18px 10px 12px;
    background: rgba(255,255,255,0.72);
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 14px;
    white-space: nowrap;
    cursor: default;
    transition: background 0.25s, border-color 0.25s, transform 0.25s;
    user-select: none;
  }
  .ts-chip:hover {
    background: rgba(255,255,255,0.95);
    border-color: rgba(255, 149, 0, 0.30);
    transform: translateY(-2px);
  }
  .ts-chip-icon {
    width: 32px; height: 32px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .ts-chip-name {
    font-size: 0.82rem; font-weight: 500;
    color: rgba(29,29,31,0.72); letter-spacing: 0.01em;
  }

  .ts-divider {
    position: relative; z-index: 2;
    height: 1px;
    margin: clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,3rem) 0;
    background: linear-gradient(90deg, transparent, rgba(255, 149, 0, 0.15), transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    .ts-row-1, .ts-row-2 { animation: none; }
  }
`;

/* ── Inline SVG icons ── */
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23 23 20.46" width="28" height="28" fill="none" stroke="#38bdf8" strokeWidth="1.2">
    <circle cx="0" cy="0" r="2.05" fill="#38bdf8" />
    <ellipse rx="11" ry="4.2" />
    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
  </svg>
);
const NextjsIcon = () => (
  <svg viewBox="0 0 180 180" width="28" height="28">
    <circle cx="90" cy="90" r="90" fill="#0f172a" />
    <path d="M149.5 157.5L69.1 54H54v72h15.2V71.9l70.7 90.7c3.3-2.9 6.3-6 9.6-9.1zM110.8 54h15.2v72h-15.2z" fill="#fff" />
  </svg>
);
const NodejsIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#10b981">
    <path d="M12 2L4.5 6.3v9.4L12 22l7.5-4.3v-9.4L12 2zm-1.1 14.8l-3.3-1.9v-3.8l3.3 1.9v3.8zm0-5.7L7.6 9.2l3.3-1.9 3.3 1.9-3.3 1.9zm4.5 3.8l-3.3 1.9v-3.8l3.3-1.9v3.8z" />
  </svg>
);
const ExpressIcon = () => (
  <svg viewBox="0 0 64 64" width="28" height="28">
    <text x="32" y="42" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="26" fill="#334155">ex</text>
  </svg>
);
const MongodbIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#10b981">
    <path d="M12 1.5s-5.5 6-5.5 12c0 4 2.5 6.5 5.5 9 3-2.5 5.5-5 5.5-9 0-6-5.5-12-5.5-12zm0 18c-1.5-1.5-3.5-4-3.5-6 0-4 3.5-8.5 3.5-8.5s3.5 4.5 3.5 8.5c0 2-2 4.5-3.5 6z" />
  </svg>
);
const MysqlIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);
const FirebaseIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#f38200">
    <path d="M3.89 15.75L9.9 2.05c.18-.4.76-.4.94 0l1.7 3.88 4.7-4.47c.33-.3.86-.17.96.25l2.9 13.91c.07.36-.08.73-.38.92L12.5 22.1c-.3.2-.7.2-1 0L3.89 17.1c-.34-.23-.49-.66-.37-1.05l.37-.3z" />
  </svg>
);
const SupabaseIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#10b981">
    <path d="M21.36 11.23l-8.62 9.58c-.5.56-1.44.2-1.44-.55v-6.38H4.64c-.7 0-1.12-.76-.78-1.37l8.62-9.58c.5-.56 1.44-.2 1.44.55v6.38h6.66c.7 0 1.12.76.78 1.37z" />
  </svg>
);
const FlutterIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#0ea5e9">
    <path d="M13.55 0L1.7 11.85l3.55 3.55 15.4-15.4H13.55zM20.65 11.85L13.55 4.75 7.05 11.25l3.55 3.55 10.05-10.05v.1zM20.65 23.7L13.55 16.6l-3.55 3.55 3.55 3.55h7.1z" />
  </svg>
);
const ReactNativeIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#8b5cf6" strokeWidth="1.6" strokeLinecap="round">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <circle cx="12" cy="10" r="0.9" fill="#8b5cf6" stroke="none" />
    <ellipse cx="12" cy="10" rx="4" ry="1.5" strokeWidth="0.8" transform="rotate(30 12 10)" />
    <ellipse cx="12" cy="10" rx="4" ry="1.5" strokeWidth="0.8" transform="rotate(90 12 10)" />
    <ellipse cx="12" cy="10" rx="4" ry="1.5" strokeWidth="0.8" transform="rotate(150 12 10)" />
  </svg>
);
const AwsIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#f38200">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
  </svg>
);
const DockerIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#0284c7">
    <path d="M13.96 10.08h-2.43V7.65h2.43v2.43zm0 2.91h-2.43v-2.43h2.43v2.43zm-2.91-2.91H8.62V7.65h2.43v2.43zm0 2.91H8.62v-2.43h2.43v2.43zm-2.91 0H5.71v-2.43h2.42v2.43zm-2.91 0H2.8v-2.43h2.42v2.43zm8.73-5.82h-2.43V4.74h2.43v2.43zm2.91 2.91h-2.43V7.65h2.43v2.43zm0 2.91h-2.43v-2.43h2.43v2.43zm2.91 0h-2.43v-2.43h2.43v2.43z" />
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#1e293b">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12.02c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0022 12.02C22 6.48 17.52 2 12 2z" />
  </svg>
);
const TypescriptIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#2563eb">
    <path d="M22.3 0H1.7C.76 0 0 .76 0 1.7v20.6C0 23.24.76 24 1.7 24h20.6c.94 0 1.7-.76 1.7-1.7V1.7c0-.94-.76-1.7-1.7-1.7zM11.3 16.7c0 1.4-.4 2.5-1.2 3.2-.8.7-2 1-3.6 1-1.3 0-2.3-.3-3.1-.8l.8-1.9c.7.4 1.4.6 2.1.6.9 0 1.5-.2 1.9-.6.4-.4.6-.9.6-1.6V8.5h2.5v8.2zm9 4c-.7.5-1.7.8-2.9.8-1.6 0-2.8-.5-3.6-1.5-.8-1-1.2-2.4-1.2-4.2 0-1.9.4-3.4 1.3-4.4.9-1 2.1-1.5 3.7-1.5 1.1 0 2 .2 2.6.5l-.6 1.9c-.5-.2-1.1-.4-1.8-.4-1 0-1.7.3-2.2.9-.5.6-.7 1.6-.7 2.9 0 1.3.2 2.3.7 2.9.5.6 1.1.9 2.1.9.7 0 1.3-.2 1.8-.4l.6 1.5z" />
  </svg>
);
const JavascriptIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28">
    <rect width="24" height="24" rx="3" fill="#ffd200" />
    <text x="22" y="20.5" textAnchor="end" fontFamily="sans-serif" fontWeight="900" fontSize="11" fill="#18181b">JS</text>
  </svg>
);
const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#38bdf8">
    <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.57.89 2.29 1.62C13.67 10.62 15.03 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.57-.89-2.29-1.62C16.34 6.18 14.98 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.57.89 2.29 1.62 1.18 1.2 2.54 2.58 5.51 2.58 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.57-.89-2.29-1.62C10.34 13.38 8.98 12 6 12z" />
  </svg>
);
const VercelIcon = () => (
  <svg viewBox="0 0 76 65" width="26" height="22" fill="#0f172a">
    <path d="M37.5 0L75 65H0L37.5 0Z" />
  </svg>
);
const FigmaIcon = () => (
  <svg viewBox="0 0 120 180" width="18" height="28">
    <path d="M30 0a30 30 0 0 0-30 30 30 30 0 0 0 30 30h30V30a30 30 0 0 0-30-30z" fill="#F24E1E" />
    <path d="M90 0a30 30 0 0 0-30 30 30 30 0 0 0 30 30 30 30 0 0 0 30-30 30 30 0 0 0-30-30z" fill="#FF7262" />
    <path d="M30 60a30 30 0 0 0-30 30 30 30 0 0 0 30 30h30V90a30 30 0 0 0-30-30z" fill="#A259FF" />
    <path d="M90 60a30 30 0 0 0-30 30 30 30 0 0 0 30 30 30 30 0 0 0 30-30V90a30 30 0 0 0-30-30z" fill="#1ABC9C" />
    <path d="M30 120a30 30 0 0 0-30 30 30 30 0 0 0 30 30 30 30 0 0 0 30-30v-30H30z" fill="#18A0FB" />
  </svg>
);
const PythonIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28">
    <path d="M12.12 1.05c-1.58 0-2.97.13-3.66.42-1.74.72-1.77 2.25-1.77 3.52v2.17h5.68V8.1h-5.68c-2.48 0-4.22 1.4-4.22 4.14 0 2.76 1.42 4.14 3.9 4.14h1.9v-2.52c0-2.3 1.83-4.14 4.12-4.14h5.68V7.15c0-2.75-1.74-4.14-4.22-4.14l-1.71-.03c-.6-.02-1.2-.02-1.74 0zm3.84 2.1c.42 0 .75.33.75.75s-.33.75-.75.75-.75-.33-.75-.75.33-.75.75-.75z" fill="#3776AB" />
    <path d="M11.88 22.95c1.58 0 2.97-.13 3.66-.42 1.74-.72 1.77-2.25 1.77-3.52v-2.17h-5.68v-.93h5.68c2.48 0 4.22-1.4 4.22-4.14 0-2.76-1.42-4.14-3.9-4.14h-1.9v2.52c0 2.3-1.83 4.14-4.12 4.14H6.04v2.58c0 2.75 1.74 4.14 4.22 4.14l1.71.03c.6.02 1.2.02 1.74 0zM8.04 19.8c-.42 0-.75-.33-.75-.75s.33-.75.75-.75.75.33.75.75-.33.75-.75.75z" fill="#FFE052" />
  </svg>
);
const TensorflowIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28">
    <path d="M11.9 2.5L3.6 7.3v9.5l8.3 4.8V2.5z" fill="#FF6F00" />
    <path d="M12.1 2.5v19.1l8.3-4.8V7.3L12.1 2.5z" fill="#FFA000" />
    <path d="M12 7.7l-4.5 2.6V15.5l4.5-2.6V7.7z" fill="#fff" opacity="0.85" />
  </svg>
);
const KubernetesIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28">
    <path d="M12.07.2L2.3 5.25v11.3l9.77 5.25 9.77-5.25V5.25L12.07.2zm0 3.7l6.6 3.55v7.1l-6.6 3.55-6.6-3.55v-7.1l6.6-3.55z" fill="#326CE5" />
  </svg>
);
const GoIcon = () => (
  <svg viewBox="0 0 40 40" width="28" height="28">
    <text x="20" y="28" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="18" fill="#00acd7">GO</text>
  </svg>
);
const SwiftIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="#FA7323">
    <path d="M21.2 16.5c-2.4-2.4-5.3-3.6-8.5-3.6 2.5-.9 4.8-2.6 6.3-5-2.4.9-5.1 1.2-7.8.6 1.8-1.1 3.2-2.8 3.9-4.8-2.9 1.8-6 2.5-9.3 1.9 1.2-1.3 2-3 2-4.9-4.2 3.3-8.8 4.7-13.8 4.1 2.3 2.1 5.3 3.3 8.6 3.5-2.6.9-5 2.6-6.5 5 2.5-.9 5.2-1.2 8-.6-1.9 1.2-3.4 3-4.1 5.1 3.1-1.9 6.4-2.7 9.8-2.1-1.3 1.4-2.2 3.2-2.2 5.2 4.5-3.5 9.4-5 14.7-4.4z" />
  </svg>
);

interface TechItem {
  id: string;
  name: string;
  Icon: React.ComponentType;
}

const TECH_LIST: TechItem[] = [
  { id: "react",       name: "React",        Icon: ReactIcon       },
  { id: "nextjs",      name: "Next.js",      Icon: NextjsIcon      },
  { id: "nodejs",      name: "Node.js",      Icon: NodejsIcon      },
  { id: "express",     name: "Express",      Icon: ExpressIcon     },
  { id: "mongodb",     name: "MongoDB",      Icon: MongodbIcon     },
  { id: "mysql",       name: "MySQL",        Icon: MysqlIcon       },
  { id: "firebase",    name: "Firebase",     Icon: FirebaseIcon    },
  { id: "supabase",    name: "Supabase",     Icon: SupabaseIcon    },
  { id: "flutter",     name: "Flutter",      Icon: FlutterIcon     },
  { id: "reactnative", name: "React Native", Icon: ReactNativeIcon },
  { id: "aws",         name: "AWS",          Icon: AwsIcon         },
  { id: "docker",      name: "Docker",       Icon: DockerIcon      },
  { id: "github",      name: "GitHub",       Icon: GithubIcon      },
  { id: "typescript",  name: "TypeScript",   Icon: TypescriptIcon  },
  { id: "javascript",  name: "JavaScript",   Icon: JavascriptIcon  },
  { id: "tailwind",    name: "Tailwind CSS", Icon: TailwindIcon    },
  { id: "vercel",      name: "Vercel",       Icon: VercelIcon      },
  { id: "figma",       name: "Figma",        Icon: FigmaIcon       },
  { id: "python",      name: "Python",       Icon: PythonIcon      },
  { id: "tensorflow",  name: "TensorFlow",   Icon: TensorflowIcon  },
  { id: "kubernetes",  name: "Kubernetes",   Icon: KubernetesIcon  },
  { id: "go",          name: "Go",           Icon: GoIcon          },
  { id: "swift",       name: "Swift",        Icon: SwiftIcon       },
];

function Chip({ name, Icon }: { name: string; Icon: React.ComponentType }) {
  return (
    <div className="ts-chip">
      <div className="ts-chip-icon">
        <Icon />
      </div>
      <span className="ts-chip-name">{name}</span>
    </div>
  );
}

const half = Math.ceil(TECH_LIST.length / 2);
const ROW_1 = TECH_LIST.slice(0, half);
const ROW_2 = TECH_LIST.slice(half);

export function TechStack() {
  return (
    <section className="ts-section" id="technology">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="ts-grain" aria-hidden="true" />

      {/* Copy */}
      <div className="ts-inner">
        <p className="ts-eyebrow">
          <span className="ts-dot" />
          Our stack
        </p>
        <h2 className="ts-h2">
          Technology we <em>use</em>
        </h2>
        <p className="ts-sub">
          Enterprise-grade tools for web apps, mobile, DevOps, AI, and beyond —
          handpicked for performance and scale.
        </p>
      </div>

      {/* Marquee */}
      <div className="ts-marquee-wrap">
        <div className="ts-fade-l" aria-hidden="true" />
        <div className="ts-fade-r" aria-hidden="true" />

        {/* Row 1 — slides left */}
        <div className="ts-row ts-row-1" aria-label="Technology row 1">
          {[...ROW_1, ...ROW_1].map((t, i) => (
            <Chip key={`r1-${t.id}-${i}`} name={t.name} Icon={t.Icon} />
          ))}
        </div>

        {/* Row 2 — slides right */}
        <div className="ts-row ts-row-2" aria-label="Technology row 2">
          {[...ROW_2, ...ROW_2].map((t, i) => (
            <Chip key={`r2-${t.id}-${i}`} name={t.name} Icon={t.Icon} />
          ))}
        </div>
      </div>

      <div className="ts-divider" aria-hidden="true" />
    </section>
  );
}