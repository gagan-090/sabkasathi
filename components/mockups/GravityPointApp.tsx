"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Atom, MessageCircle, Phone, Quote } from "lucide-react";
import { Counter, Screen, tel, whatsapp } from "./kit";

/*
  Gravity Point Tutorial — gravitypointtutorial.com

  UI direction: "editorial". No glass panes and no tab bar — a serif display
  face, hairline rules, generous white space in the dark, and one long scroll
  driven by two selectors. A coaching institute sells a point of view, so the
  screen is closer to a printed prospectus than to a dashboard, which is what
  keeps it distinct from the other two phones in the carousel.

  Batches, subjects, board coverage, the founder, the alumnus quote, the stats
  and the number are from the live site. The week grid is explicitly labelled a
  sample — the institute does not publish a timetable, and the app should not
  imply one.
*/

const PHONE = "7367005777";
const ACCENT = "#ec4899";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const LEVELS = [
  {
    id: "I–V",
    batch: "Junior Wing Cohort",
    classes: "Class 1 – 5",
    focus: "Foundational learning through activity-based concepts.",
    subjects: ["Mathematics", "Science", "Activity"],
    mentored: 140,
  },
  {
    id: "VI–X",
    batch: "Foundation Program",
    classes: "Class 6 – 10",
    focus: "NCERT-led concepts with structured revision and board prep.",
    subjects: ["Mathematics", "Science", "Board Prep"],
    mentored: 240,
  },
  {
    id: "XI–XII",
    batch: "Secondary Special",
    classes: "Class 11 – 12",
    focus: "Advanced physics and numerical problem-solving, in depth.",
    subjects: ["Physics", "Numericals", "Doubt Clearing"],
    mentored: 120,
  },
];

const TIMINGS = ["Morning", "Afternoon", "Evening"];

const serif = { fontFamily: "var(--font-instrument-serif), Georgia, serif" };
const rule = "1px solid rgba(255,255,255,0.11)";

export function GravityPointApp({ active }: { active: boolean }) {
  const [levelIndex, setLevelIndex] = useState(1);
  const [day, setDay] = useState("Mon");
  const [timing, setTiming] = useState(TIMINGS[2]);

  const level = LEVELS[levelIndex];

  const dayIndex = DAYS.indexOf(day);
  const daySubject = level.subjects[dayIndex % level.subjects.length];

  const enquiry = `Hi Gravity Point! I'd like to enrol for ${level.batch} (${level.classes}), preferably ${timing.toLowerCase()} batch.`;

  return (
    <div
      className="w-full h-full flex flex-col text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(100% 44% at 82% -6%, ${ACCENT}42 0%, transparent 60%),
          radial-gradient(90% 38% at 6% 104%, ${ACCENT}24 0%, transparent 62%),
          linear-gradient(180deg, #0b0710 0%, #07050c 55%, #050308 100%)
        `,
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      }}
    >
      {/* ── masthead ────────────────────────────────────────────────────── */}
      <div className="shrink-0 px-[22px] pt-[10px] pb-[11px]" style={{ borderBottom: rule }}>
        <div className="flex items-center gap-[9px]">
          <Atom className="w-[16px] h-[16px]" style={{ color: ACCENT }} strokeWidth={1.8} />
          <p className="text-[12px] font-bold uppercase tracking-[0.3em]">Gravity Point</p>
          <span className="ml-auto text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Since 2016
          </span>
        </div>
      </div>

      <Screen className="px-[22px]">
        {/* ── headline ──────────────────────────────────────────────────── */}
        <p className="mt-[18px] text-[9px] font-bold uppercase tracking-[0.26em]" style={{ color: ACCENT }}>
          Premier concept coaching
        </p>
        <h2 className="mt-[10px] text-[38px] leading-[1.02] tracking-[-0.01em]" style={serif}>
          Building strong
          <br />
          concepts,
          <br />
          <em style={{ color: ACCENT }}>shaping futures.</em>
        </h2>
        <p className="mt-[12px] text-[11.5px] uppercase tracking-[0.16em] text-white/45">
          CBSE · ICSE · NCERT-based
        </p>

        {/* ── level selector ────────────────────────────────────────────── */}
        <div className="mt-[20px] flex" style={{ borderTop: rule, borderBottom: rule }}>
          {LEVELS.map((l, i) => {
            const on = i === levelIndex;
            return (
              <button
                key={l.id}
                onClick={() => setLevelIndex(i)}
                className="relative flex-1 py-[13px] text-center"
                style={{ borderLeft: i === 0 ? undefined : rule }}
              >
                <span
                  className="block text-[19px] leading-none"
                  style={{ ...serif, color: on ? ACCENT : "rgba(255,255,255,0.5)" }}
                >
                  {l.id}
                </span>
                <span
                  className="block mt-[5px] text-[8.5px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: on ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)" }}
                >
                  Class
                </span>
                {on && (
                  <motion.span
                    layoutId="gravity-level"
                    className="absolute left-0 right-0 bottom-[-1px] h-[2px]"
                    style={{ background: ACCENT }}
                    transition={{ type: "spring", stiffness: 480, damping: 38 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── selected batch ────────────────────────────────────────────── */}
        <motion.div key={level.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
          <p className="mt-[18px] text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">
            {level.classes}
          </p>
          <h3 className="mt-[7px] text-[27px] leading-[1.1]" style={serif}>
            {level.batch}
          </h3>
          <p className="mt-[9px] text-[12.5px] leading-[1.55] text-white/60">{level.focus}</p>

          <div className="mt-[13px] flex flex-wrap gap-[6px]">
            {level.subjects.map((s) => (
              <span
                key={s}
                className="text-[10.5px] font-semibold px-[11px] py-[6px]"
                style={{ border: `1px solid ${ACCENT}59`, color: ACCENT, borderRadius: 4 }}
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── figures ───────────────────────────────────────────────────── */}
        <div className="mt-[20px] grid grid-cols-3" style={{ borderTop: rule, borderBottom: rule }}>
          {[
            /* Re-counts on every level change, so switching batch feels like
               the page recomputing rather than swapping text. */
            { v: <Counter to={10} run={active} suffix="+" resetKey={levelIndex} />, l: "Years" },
            {
              v: <Counter to={level.mentored} run={active} suffix="+" resetKey={levelIndex} />,
              l: "Mentored",
            },
            { v: <Counter to={100} run={active} suffix="%" resetKey={levelIndex} />, l: "Concepts" },
          ].map((k, i) => (
            <div key={k.l} className="py-[14px] text-center" style={{ borderLeft: i === 0 ? undefined : rule }}>
              <p className="text-[25px] leading-none tabular-nums" style={{ ...serif, color: ACCENT }}>
                {k.v}
              </p>
              <p className="mt-[6px] text-[8.5px] font-semibold uppercase tracking-[0.16em] text-white/35">
                {k.l}
              </p>
            </div>
          ))}
        </div>

        {/* ── sample week ───────────────────────────────────────────────── */}
        <div className="mt-[18px] flex items-baseline justify-between">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">Sample week</p>
          <p className="text-[9px] uppercase tracking-[0.14em] text-white/25">Indicative</p>
        </div>
        <div className="mt-[9px] flex gap-[5px]">
          {DAYS.map((d) => {
            const on = d === day;
            return (
              <button
                key={d}
                onClick={() => setDay(d)}
                className="flex-1 py-[9px] text-[10px] font-bold transition-colors"
                style={{
                  borderRadius: 4,
                  background: on ? ACCENT : "rgba(255,255,255,0.05)",
                  border: `1px solid ${on ? ACCENT : "rgba(255,255,255,0.09)"}`,
                  color: on ? "#12040b" : "rgba(255,255,255,0.55)",
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
        <div className="mt-[9px] flex items-baseline gap-[9px] pb-[13px]" style={{ borderBottom: rule }}>
          <span className="text-[22px] leading-none" style={{ ...serif, color: ACCENT }}>
            {daySubject}
          </span>
          <span className="text-[10.5px] text-white/40">with dedicated doubt clearing</span>
        </div>

        {/* ── preferred timing — feeds the enquiry below ────────────────── */}
        <p className="mt-[16px] text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">
          Preferred timing
        </p>
        <div className="mt-[9px] flex gap-[6px]">
          {TIMINGS.map((t) => {
            const on = timing === t;
            return (
              <button
                key={t}
                onClick={() => setTiming(t)}
                className="flex-1 py-[10px] text-[11px] font-semibold transition-colors"
                style={{
                  borderRadius: 4,
                  border: `1px solid ${on ? ACCENT : "rgba(255,255,255,0.11)"}`,
                  background: on ? `${ACCENT}1f` : "transparent",
                  color: on ? ACCENT : "rgba(255,255,255,0.55)",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* ── quote ─────────────────────────────────────────────────────── */}
        <div className="mt-[20px] pl-[14px]" style={{ borderLeft: `2px solid ${ACCENT}` }}>
          <Quote className="w-[14px] h-[14px]" style={{ color: ACCENT }} strokeWidth={2} />
          <p className="mt-[8px] text-[17px] leading-[1.32]" style={serif}>
            “The concept-based teaching at Gravity Point changed how I study.”
          </p>
          <p className="mt-[8px] text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/35">
            Rahul Verma · Class 12 alumnus
          </p>
        </div>

        <p className="mt-[18px] text-[11px] leading-[1.6] text-white/40 pb-[6px]">
          Saurav Singh · Founder &amp; Principal Educator
          <br />
          Opposite Adarsh Thana, Station Road, Dallu More, Sheikhpura – 811105
        </p>
      </Screen>

      {/* ── enrol bar ───────────────────────────────────────────────────── */}
      <div className="shrink-0 flex gap-[8px] px-[22px] pt-[10px] pb-[12px]" style={{ borderTop: rule }}>
        <a
          href={whatsapp(PHONE, enquiry)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-[8px] text-[12.5px] font-bold py-[13px]"
          style={{
            borderRadius: 4,
            background: ACCENT,
            color: "#12040b",
            boxShadow: `0 14px 30px -16px ${ACCENT}`,
          }}
        >
          <MessageCircle className="w-[14px] h-[14px]" strokeWidth={2.5} />
          Enrol — {level.id}
        </a>
        <a
          href={tel(PHONE)}
          className="flex items-center justify-center px-[15px]"
          style={{ borderRadius: 4, border: `1px solid ${ACCENT}59`, color: ACCENT }}
          aria-label="Call Gravity Point Tutorial"
        >
          <Phone className="w-[14px] h-[14px]" strokeWidth={2.4} />
        </a>
      </div>
    </div>
  );
}
