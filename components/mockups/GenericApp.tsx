"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, RefreshCw, Sparkles } from "lucide-react";
import type { Project } from "@/lib/project";
import { Counter, Screen } from "./kit";

/*
  The screen a project gets when it has no hand-built app of its own — anything
  added through the admin panel after this section was written. The three named
  clients each have their own file in this folder with their own design
  language; this is the house fallback, so it is deliberately the most neutral
  of the four and says nothing the Firestore record does not already say.
*/

const glass = (radius: number): React.CSSProperties => ({
  borderRadius: radius,
  background:
    "linear-gradient(157deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0.03) 100%)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.22), 0 14px 34px -18px rgba(0,0,0,0.9)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
});

/* Control points a third of the way toward each neighbour — a straight
   polyline read as a chart of something precise, which is the wrong promise
   for a decorative activity line. */
function sparkPath(values: number[], width: number, height: number): string {
  const step = width / (values.length - 1);
  const pts = values.map((v, i) => ({ x: i * step, y: height - v * height }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${
      p2.x - (p3.x - p1.x) / 6
    } ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const SPARK = [0.25, 0.38, 0.34, 0.55, 0.6, 0.72, 0.68, 0.85];
const SPARK_W = 300;
const SPARK_H = 44;

export function GenericApp({ project, active }: { project: Project; active: boolean }) {
  const accent = project.accentColor || "#f38200";
  const gradientId = `spark-${useId().replace(/:/g, "")}`;
  /* Bumping this re-runs every counter — the refresh button is the one bit of
     state a screen this generic can honestly own. */
  const [pass, setPass] = useState(0);

  const words = project.title.trim().split(/\s+/);

  return (
    <div
      className="w-full h-full flex flex-col text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(120% 62% at 50% -12%, ${accent}4d 0%, ${accent}14 42%, transparent 72%),
          radial-gradient(85% 45% at 108% 104%, ${accent}30 0%, transparent 68%),
          linear-gradient(180deg, #080d14 0%, #05080d 55%, #04060a 100%)
        `,
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      }}
    >
      <Screen className="px-[20px] pt-[12px] pb-[16px]">
        <div className="relative overflow-hidden px-[20px] pt-[20px] pb-[22px]" style={glass(28)}>
          <motion.span
            aria-hidden
            className="absolute -inset-y-8 w-[55%] pointer-events-none"
            style={{ background: `linear-gradient(100deg, transparent, ${accent}26, transparent)`, filter: "blur(14px)" }}
            initial={{ x: "-70%" }}
            animate={{ x: "180%" }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
          />
          <div
            className="relative flex items-center justify-center w-[54px] h-[54px]"
            style={{ ...glass(18), boxShadow: `inset 0 1px 0 rgba(255,255,255,0.28), 0 10px 26px -14px ${accent}cc` }}
          >
            <Sparkles className="w-[24px] h-[24px]" strokeWidth={1.6} style={{ color: accent }} />
          </div>
          <p
            className="relative mt-[18px] text-[10px] font-semibold uppercase"
            style={{ letterSpacing: "0.19em", color: "rgba(255,255,255,0.56)" }}
          >
            {project.category || "Client project"}
          </p>
          <h3 className="relative mt-[7px] text-[30px] font-bold leading-[1.06] tracking-[-0.02em]">
            {words.slice(0, 2).join(" ")}
          </h3>
          <p className="relative mt-[9px] text-[13.5px] leading-[1.4] text-white/65">
            {project.description?.trim() || "Built by Sabka Saathi"}
          </p>
        </div>

        <div className="mt-[12px] px-[16px] pt-[13px] pb-[10px]" style={glass(20)}>
          <div className="flex items-center justify-between">
            <span
              className="text-[9.5px] font-semibold uppercase"
              style={{ letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)" }}
            >
              Engagement
            </span>
            <button
              onClick={() => setPass((p) => p + 1)}
              className="flex items-center gap-[5px] text-[9.5px] font-bold uppercase px-[9px] py-[4px] rounded-full"
              style={{ letterSpacing: "0.12em", color: accent, background: `${accent}1f`, border: `1px solid ${accent}3d` }}
            >
              <RefreshCw className="w-[9px] h-[9px]" strokeWidth={2.6} />
              Refresh
            </button>
          </div>

          <svg className="mt-[9px] w-full h-auto" viewBox={`-6 -8 ${SPARK_W + 20} ${SPARK_H + 16}`} fill="none" aria-hidden>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
                <stop offset="100%" stopColor={accent} stopOpacity="1" />
              </linearGradient>
            </defs>
            <motion.path
              key={pass}
              d={sparkPath(SPARK, SPARK_W, SPARK_H)}
              stroke={`url(#${gradientId})`}
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: active ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <circle cx={SPARK_W} cy={SPARK_H - SPARK[SPARK.length - 1] * SPARK_H} r="8" fill={accent} opacity="0.18" />
            <circle cx={SPARK_W} cy={SPARK_H - SPARK[SPARK.length - 1] * SPARK_H} r="3.4" fill={accent} />
          </svg>
        </div>

        <div className="mt-[12px] flex flex-col gap-[9px]">
          {[
            {
              l: "Mobile ready",
              v: <Counter to={100} run={active} suffix="%" resetKey={pass} />,
              fill: 1,
            },
            {
              l: "Performance score",
              v: <Counter to={98} run={active} resetKey={pass} />,
              fill: 0.98,
            },
            {
              l: "Uptime",
              v: <Counter to={99.9} run={active} decimals={1} suffix="%" resetKey={pass} />,
              fill: 0.999,
            },
          ].map((m, i) => (
            <div key={m.l} className="px-[15px] py-[12px]" style={glass(16)}>
              <div className="flex items-baseline justify-between gap-[10px]">
                <span
                  className="text-[9.5px] font-semibold uppercase truncate"
                  style={{ letterSpacing: "0.17em", color: "rgba(255,255,255,0.55)" }}
                >
                  {m.l}
                </span>
                <span className="text-[12px] font-bold shrink-0 tabular-nums" style={{ color: accent }}>
                  {m.v}
                </span>
              </div>
              <div className="mt-[8px] h-[5px] rounded-full overflow-hidden bg-white/10">
                <motion.div
                  key={pass}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${accent}80, ${accent})`, boxShadow: `0 0 10px ${accent}80` }}
                  initial={{ width: 0 }}
                  animate={{ width: active ? `${m.fill * 100}%` : 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </Screen>

      <div className="shrink-0 px-[20px] pb-[14px] pt-[8px]">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-[8px] text-[12.5px] font-bold py-[13px]"
          style={{
            borderRadius: 15,
            background: `linear-gradient(140deg, ${accent}f2, ${accent}b3)`,
            border: `1px solid ${accent}`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 12px 28px -14px ${accent}`,
            color: "#05080d",
          }}
        >
          Open live site
          <ArrowUpRight className="w-[14px] h-[14px]" strokeWidth={2.6} />
        </a>
      </div>
    </div>
  );
}
