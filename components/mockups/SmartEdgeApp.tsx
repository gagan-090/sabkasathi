"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Building2, Check, ChevronRight, Clock, FileCheck2,
  GraduationCap, MessageCircle, Phone, RotateCcw, ShieldCheck,
} from "lucide-react";
import { Counter, Screen, tel, whatsapp } from "./kit";

/*
  Smart Edge Education Consultancy — smartedgeeducationconsultancy.com

  UI direction: "admission console". Where the Phulwari app is all pills and
  soft edges, this one is a working tool — a top segmented control instead of a
  tab bar, 12px corners, hairline rules, uppercase micro-labels and rows that
  read like a table. A consultancy's job is tracking a file through stages, so
  the centre of the app is a stepper you can actually advance.

  Streams, course counts, approvals, offices, hours and the phone number are
  from the live site.
*/

const PHONE = "9576461623";
const ACCENT = "#ef4444";

const APPROVALS = ["UGC", "AICTE", "NCTE", "PCI", "BCI"];

const STREAMS = [
  { name: "Engineering & Technology", courses: 4 },
  { name: "Management & Commerce", courses: 4 },
  { name: "Medical & Allied Sciences", courses: 4 },
  { name: "Agriculture", courses: 6 },
  { name: "Computer Science & IT", courses: 2 },
  { name: "Nursing & Physiotherapy", courses: 3 },
  { name: "Education", courses: 3 },
  { name: "Fashion & Design", courses: 3 },
  { name: "Law", courses: 2 },
  { name: "Pharmacy", courses: 2 },
  { name: "Animation & Journalism", courses: 4 },
  { name: "Government & Skill Courses", courses: 3 },
];

const MODES = [
  { id: "Regular", note: "On-campus, full-time intake" },
  { id: "Distance", note: "UGC-DEB approved distance mode" },
  { id: "Online", note: "Fully online degree programmes" },
];

const STEPS = [
  { name: "Enquiry", note: "Share your marks & preferred stream", icon: MessageCircle },
  { name: "Counselling", note: "Free session with a Smart Edge counsellor", icon: GraduationCap },
  { name: "Documents", note: "Marksheets, ID & photographs verified", icon: FileCheck2 },
  { name: "Admission", note: "Seat confirmed at the approved institution", icon: ShieldCheck },
];

const OFFICES = [
  { city: "Patna", address: "Bhagwat Nagar, Near NRL Petrol Pump, New Bypass, Patna – 800026" },
  { city: "Sheikhpura", address: "Aditya Chowk, MAFO, Sheikhpura – 811102" },
];

/* Flat, low-blur panels with a visible edge — the console look. Corners stay
   at 12–14px everywhere; nothing in this app is a pill. */
const panel = (radius = 14): React.CSSProperties => ({
  borderRadius: radius,
  background: "linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.028))",
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
});

const label = "text-[9px] font-bold uppercase tracking-[0.19em] text-white/40";

type View = "courses" | "track" | "offices";

export function SmartEdgeApp({ active }: { active: boolean }) {
  const [view, setView] = useState<View>("courses");
  const [mode, setMode] = useState(MODES[0].id);
  const [stream, setStream] = useState<string | null>(null);
  /* How many stages of the application are done — the stepper below is the
     one thing on this screen that holds real state. */
  const [step, setStep] = useState(1);

  const modeNote = MODES.find((m) => m.id === mode)?.note ?? "";
  const progress = Math.round((step / STEPS.length) * 100);

  return (
    <div
      className="w-full h-full flex flex-col text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(105% 48% at 88% -8%, ${ACCENT}3d 0%, transparent 62%),
          radial-gradient(85% 40% at 0% 100%, #2563eb2e 0%, transparent 64%),
          linear-gradient(180deg, #0a0c14 0%, #070910 58%, #05070c 100%)
        `,
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      }}
    >
      {/* ── header ──────────────────────────────────────────────────────── */}
      <div className="shrink-0 px-[18px] pt-[10px]">
        <div className="flex items-center gap-[10px]">
          <div
            className="w-[34px] h-[34px] flex items-center justify-center"
            style={{ borderRadius: 10, background: `${ACCENT}26`, border: `1px solid ${ACCENT}59` }}
          >
            <GraduationCap className="w-[17px] h-[17px]" style={{ color: ACCENT }} strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-[14.5px] font-bold leading-tight truncate">Smart Edge</p>
            <p className="text-[9.5px] uppercase tracking-[0.15em] text-white/40 leading-tight">
              Education Consultancy
            </p>
          </div>
          <a
            href={tel(PHONE)}
            className="ml-auto flex items-center gap-[6px] text-[10.5px] font-bold px-[11px] py-[7px]"
            style={{ borderRadius: 9, color: ACCENT, background: `${ACCENT}1a`, border: `1px solid ${ACCENT}3d` }}
          >
            <Phone className="w-[11px] h-[11px]" strokeWidth={2.6} />
            Call
          </a>
        </div>

        {/* Approvals strip — the site leads with these, so the app does too. */}
        <div className="mt-[11px] flex gap-[5px]">
          {APPROVALS.map((a) => (
            <span
              key={a}
              className="flex-1 text-center text-[9px] font-bold tracking-[0.08em] py-[6px] text-white/60"
              style={{ borderRadius: 7, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {a}
            </span>
          ))}
        </div>

        {/* Segmented control — this app's whole navigation, at the top where a
            desktop tool would put it, not in a thumb bar. */}
        <div className="mt-[12px] flex p-[3px] gap-[2px]" style={{ ...panel(11) }}>
          {(["courses", "track", "offices"] as View[]).map((v) => {
            const on = view === v;
            return (
              <button
                key={v}
                onClick={() => setView(v)}
                className="relative flex-1 py-[8px] text-[11px] font-bold capitalize"
                style={{ borderRadius: 8 }}
              >
                {on && (
                  <motion.span
                    layoutId="smartedge-seg"
                    className="absolute inset-0"
                    style={{ borderRadius: 8, background: ACCENT, boxShadow: `0 8px 20px -10px ${ACCENT}` }}
                    transition={{ type: "spring", stiffness: 480, damping: 38 }}
                  />
                )}
                <span className="relative" style={{ color: on ? "#0b0407" : "rgba(255,255,255,0.55)" }}>
                  {v}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── courses ─────────────────────────────────────────────────────── */}
      {view === "courses" && (
        <>
          <Screen className="px-[18px] pt-[13px] pb-[12px]">
            <div className="grid grid-cols-3 gap-[7px]">
              {/* Re-count whenever the study mode changes, so the tiles read
                  as a query being re-run rather than static decoration. */}
              {[
                { v: <Counter to={5000} run={active} suffix="+" resetKey={mode} />, l: "Guided" },
                { v: <Counter to={200} run={active} suffix="+" resetKey={mode} />, l: "Colleges" },
                { v: <Counter to={95} run={active} suffix="%" resetKey={mode} />, l: "Satisfied" },
              ].map((k) => (
                <div key={k.l} className="px-[9px] py-[11px]" style={panel(12)}>
                  <p className="text-[17px] font-bold leading-none tabular-nums" style={{ color: ACCENT }}>
                    {k.v}
                  </p>
                  <p className="mt-[6px] text-[8.5px] font-bold uppercase tracking-[0.14em] text-white/40">
                    {k.l}
                  </p>
                </div>
              ))}
            </div>

            <p className={`mt-[15px] ${label}`}>Study mode</p>
            <div className="mt-[8px] flex gap-[6px]">
              {MODES.map((m) => {
                const on = mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className="flex-1 text-[11px] font-semibold py-[9px] transition-colors"
                    style={{
                      borderRadius: 10,
                      background: on ? `${ACCENT}1f` : "rgba(255,255,255,0.045)",
                      border: `1px solid ${on ? `${ACCENT}80` : "rgba(255,255,255,0.07)"}`,
                      color: on ? ACCENT : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {m.id}
                  </button>
                );
              })}
            </div>
            <p className="mt-[7px] text-[10.5px] text-white/45">{modeNote}</p>

            <p className={`mt-[15px] ${label}`}>Streams · {STREAMS.length}</p>
            <div className="mt-[8px] flex flex-col gap-[6px]">
              {STREAMS.map((s) => {
                const on = stream === s.name;
                return (
                  <button
                    key={s.name}
                    onClick={() => setStream(on ? null : s.name)}
                    className="w-full flex items-center gap-[10px] pl-[13px] pr-[11px] py-[11px] text-left transition-colors"
                    style={{
                      ...panel(12),
                      /* Selected rows get an accent rail rather than a glow —
                         same signal, console vocabulary. */
                      borderLeft: `2.5px solid ${on ? ACCENT : "transparent"}`,
                      background: on ? `${ACCENT}14` : undefined,
                    }}
                  >
                    <span className="min-w-0 flex-1 text-[12.5px] font-semibold truncate">{s.name}</span>
                    <span className="text-[10px] font-bold tabular-nums text-white/45 shrink-0">
                      {s.courses}
                    </span>
                    <ChevronRight
                      className="w-[13px] h-[13px] shrink-0"
                      style={{ color: on ? ACCENT : "rgba(255,255,255,0.28)" }}
                    />
                  </button>
                );
              })}
            </div>
          </Screen>

          <div className="shrink-0 px-[18px] pb-[12px] pt-[8px]">
            <a
              href={whatsapp(
                PHONE,
                stream
                  ? `Hi Smart Edge! I want ${mode.toLowerCase()} admission guidance for ${stream}.`
                  : `Hi Smart Edge! I'd like free ${mode.toLowerCase()} admission counselling.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-[8px] text-[12.5px] font-bold py-[13px]"
              style={{
                borderRadius: 12,
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}c4)`,
                color: "#12060a",
                boxShadow: `0 14px 28px -14px ${ACCENT}`,
              }}
            >
              {stream ? `Apply — ${stream.split(" ")[0]}` : "Get free counselling"}
              <ArrowRight className="w-[14px] h-[14px]" strokeWidth={2.6} />
            </a>
          </div>
        </>
      )}

      {/* ── track ───────────────────────────────────────────────────────── */}
      {view === "track" && (
        <>
          <Screen className="px-[18px] pt-[13px] pb-[12px]">
            <div className="px-[15px] py-[14px]" style={panel(14)}>
              <div className="flex items-end justify-between">
                <div>
                  <p className={label}>Application</p>
                  <p className="mt-[5px] text-[14px] font-bold">
                    {step >= STEPS.length ? "Admission confirmed" : STEPS[step].name}
                  </p>
                </div>
                <p className="text-[26px] font-bold leading-none tabular-nums" style={{ color: ACCENT }}>
                  {progress}%
                </p>
              </div>
              <div className="mt-[11px] h-[5px] rounded-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}99, ${ACCENT})` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 30 }}
                />
              </div>
            </div>

            <div className="mt-[12px] flex flex-col gap-[7px]">
              {STEPS.map((s, i) => {
                const done = i < step;
                const current = i === step;
                const Icon = s.icon;
                return (
                  <button
                    key={s.name}
                    onClick={() => setStep(i + 1)}
                    className="w-full flex items-start gap-[11px] px-[13px] py-[12px] text-left transition-colors"
                    style={{
                      ...panel(12),
                      borderLeft: `2.5px solid ${done ? ACCENT : current ? `${ACCENT}66` : "transparent"}`,
                      background: current ? `${ACCENT}12` : undefined,
                    }}
                  >
                    <span
                      className="w-[27px] h-[27px] flex items-center justify-center shrink-0 mt-[1px]"
                      style={{
                        borderRadius: 8,
                        background: done ? ACCENT : "rgba(255,255,255,0.07)",
                        border: `1px solid ${done ? ACCENT : "rgba(255,255,255,0.09)"}`,
                      }}
                    >
                      {done ? (
                        <Check className="w-[14px] h-[14px]" color="#12060a" strokeWidth={3} />
                      ) : (
                        <Icon className="w-[13px] h-[13px] text-white/50" strokeWidth={2} />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-[7px]">
                        <span className="text-[12.5px] font-semibold">{s.name}</span>
                        <span className="text-[8.5px] font-bold uppercase tracking-[0.13em] text-white/30">
                          Step {i + 1}
                        </span>
                      </span>
                      <span className="block text-[10.5px] text-white/45 leading-[1.4] mt-[2px]">{s.note}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Screen>

          <div className="shrink-0 flex gap-[8px] px-[18px] pb-[12px] pt-[8px]">
            {step >= STEPS.length ? (
              <a
                href={whatsapp(PHONE, "Hi Smart Edge! My admission steps are complete — what's next?")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-[8px] text-[12.5px] font-bold py-[13px]"
                style={{
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}c4)`,
                  color: "#12060a",
                }}
              >
                <MessageCircle className="w-[14px] h-[14px]" strokeWidth={2.5} />
                Talk to a counsellor
              </a>
            ) : (
              <button
                onClick={() => setStep((s) => Math.min(STEPS.length, s + 1))}
                className="flex-1 flex items-center justify-center gap-[8px] text-[12.5px] font-bold py-[13px]"
                style={{
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}c4)`,
                  color: "#12060a",
                  boxShadow: `0 14px 28px -14px ${ACCENT}`,
                }}
              >
                Complete “{STEPS[step].name}”
                <ArrowRight className="w-[14px] h-[14px]" strokeWidth={2.6} />
              </button>
            )}
            <button
              onClick={() => setStep(1)}
              className="flex items-center justify-center px-[14px] text-white/55"
              style={panel(12)}
              aria-label="Reset application progress"
            >
              <RotateCcw className="w-[14px] h-[14px]" strokeWidth={2.2} />
            </button>
          </div>
        </>
      )}

      {/* ── offices ─────────────────────────────────────────────────────── */}
      {view === "offices" && (
        <Screen className="px-[18px] pt-[13px] pb-[14px]">
          <div className="flex flex-col gap-[8px]">
            {OFFICES.map((o) => (
              <div key={o.city} className="px-[14px] py-[13px]" style={panel(14)}>
                <div className="flex items-center gap-[8px]">
                  <Building2 className="w-[14px] h-[14px]" style={{ color: ACCENT }} strokeWidth={2.2} />
                  <p className="text-[13px] font-bold">{o.city}</p>
                </div>
                <p className="mt-[7px] text-[11px] leading-[1.5] text-white/55">{o.address}</p>
              </div>
            ))}
          </div>

          <div className="mt-[10px] flex items-center gap-[9px] px-[14px] py-[12px]" style={panel(14)}>
            <Clock className="w-[14px] h-[14px] shrink-0" style={{ color: ACCENT }} strokeWidth={2.2} />
            <div className="min-w-0">
              <p className="text-[11.5px] font-semibold">Mon–Sat · 10:00 AM – 6:00 PM</p>
              <p className="text-[10.5px] text-white/45">Sunday by appointment</p>
            </div>
          </div>

          <div className="mt-[12px] flex gap-[8px]">
            <a
              href={tel(PHONE)}
              className="flex-1 flex items-center justify-center gap-[7px] text-[12px] font-bold py-[12px]"
              style={{
                borderRadius: 12,
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}c4)`,
                color: "#12060a",
              }}
            >
              <Phone className="w-[13px] h-[13px]" strokeWidth={2.5} />
              {PHONE}
            </a>
            <a
              href={whatsapp(PHONE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-[15px] text-white/70"
              style={panel(12)}
              aria-label="WhatsApp Smart Edge"
            >
              <MessageCircle className="w-[14px] h-[14px]" strokeWidth={2.2} />
            </a>
          </div>
        </Screen>
      )}
    </div>
  );
}
