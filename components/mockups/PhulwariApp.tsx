"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Baby, CalendarClock, Check, Dumbbell, Heart, MapPin,
  MessageCircle, Music4, Navigation, Phone, Sparkles, Volleyball,
} from "lucide-react";
import { Counter, Screen, tel, useClock, whatsapp } from "./kit";

/*
  Phulwari Mother & Child Activity Centre — phulwari.co.in

  UI direction: "soft play". Everything is a rounded rectangle or a pill,
  nothing has a hard corner, and navigation is a four-tab bar at the thumb.
  This is the friendliest of the three apps on purpose — it is a play centre
  for children from nine months old, and the other two are a consultancy and a
  coaching institute.

  Content — activities, ages, timings, stats, address, number — is read from
  the live site. It is a concept screen for the studio's portfolio, not the
  client's product, but nothing on it is invented.
*/

const PHONE = "6207368839";
const ADDRESS = "M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna – 800001";
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Phulwari Mother & Child Activity Centre, Sri Krishna Nagar, Patna",
)}`;

const ACCENT = "#10b981";

type Group = "Arts" | "Sports" | "Wellness" | "Play";

const ACTIVITIES: { name: string; age: string; group: Group; blurb: string }[] = [
  { name: "Music Classes", age: "3+ yrs", group: "Arts", blurb: "Discover the joy of music" },
  { name: "Dance Classes", age: "3+ yrs", group: "Arts", blurb: "Move, learn & shine" },
  { name: "Art & Craft", age: "3+ yrs", group: "Arts", blurb: "Unleash creativity" },
  { name: "Gymnastics", age: "3+ yrs", group: "Sports", blurb: "Strength, balance & flexibility" },
  { name: "MMA Training", age: "5+ yrs", group: "Sports", blurb: "Self-defence & discipline" },
  { name: "Roller Skating", age: "4+ yrs", group: "Sports", blurb: "Fun on wheels" },
  { name: "Cricket Training", age: "5+ yrs", group: "Sports", blurb: "Teamwork through sport" },
  { name: "Yoga", age: "4+ yrs", group: "Wellness", blurb: "Healthy body, calm mind" },
  { name: "Mother Fitness", age: "All moms", group: "Wellness", blurb: "Stay active & energetic" },
  { name: "Play Zone", age: "9+ months", group: "Play", blurb: "Learn through play" },
  { name: "Mother & Toddler", age: "1.5–4 yrs", group: "Play", blurb: "Bond, learn & grow together" },
];

const GROUPS: ("All" | Group)[] = ["All", "Arts", "Sports", "Wellness", "Play"];

const GROUP_ICON: Record<Group, typeof Music4> = {
  Arts: Music4,
  Sports: Volleyball,
  Wellness: Heart,
  Play: Baby,
};

/* The centre's real timetable. `days` is Sun=0..Sat=6, matching Date#getDay,
   which is what the countdown on the Today tab counts down to. */
const SESSIONS = [
  { name: "Mother & Toddler", time: "10:30 AM", hour: 10, minute: 30, days: [1, 2, 3, 4, 5, 6], note: "Mon–Sat · 10:30–11:30 AM" },
  { name: "Premium Circle", time: "5:00 PM", hour: 17, minute: 0, days: [0, 1, 2, 3, 4, 5, 6], note: "Mon–Sun · 5:00 PM onwards" },
  { name: "Phulwari Core", time: "6:30 PM", hour: 18, minute: 30, days: [0, 3, 4, 5, 6], note: "Wed–Sun · 6:30 PM onwards" },
];

/** Next start time for a session, from `from`, as a timestamp. */
function nextStart(session: (typeof SESSIONS)[number], from: Date): number {
  for (let offset = 0; offset < 8; offset++) {
    const day = new Date(from);
    day.setDate(from.getDate() + offset);
    day.setHours(session.hour, session.minute, 0, 0);
    if (session.days.includes(day.getDay()) && day.getTime() > from.getTime()) return day.getTime();
  }
  return from.getTime();
}

function countdown(ms: number): string {
  const mins = Math.max(0, Math.round(ms / 60000));
  const d = Math.floor(mins / 1440);
  const h = Math.floor((mins % 1440) / 60);
  const m = mins % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/* Soft, thick-edged glass. The large radius and the heavy top highlight are
   the whole personality of this app — they are not shared with the others. */
const soft = (radius = 26): React.CSSProperties => ({
  borderRadius: radius,
  background: "linear-gradient(158deg, rgba(255,255,255,0.13), rgba(255,255,255,0.045))",
  border: "1px solid rgba(255,255,255,0.13)",
  boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.26), 0 16px 34px -20px rgba(0,0,0,0.9)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
});

type Tab = "today" | "play" | "moms" | "visit";

const TABS: { id: Tab; label: string; icon: typeof Sparkles }[] = [
  { id: "today", label: "Today", icon: Sparkles },
  { id: "play", label: "Play", icon: Volleyball },
  { id: "moms", label: "Moms", icon: Heart },
  { id: "visit", label: "Visit", icon: MapPin },
];

export function PhulwariApp({ active }: { active: boolean }) {
  const [tab, setTab] = useState<Tab>("today");
  const [group, setGroup] = useState<"All" | Group>("All");
  const [picked, setPicked] = useState<string[]>([]);

  /* 0 until the component mounts in a browser — reading the clock during
     render would make the server and the client disagree about the countdown
     and break hydration. */
  const now = useClock();

  const next = useMemo(() => {
    if (!now) return null;
    const from = new Date(now);
    return SESSIONS.map((s) => ({ session: s, at: nextStart(s, from) })).sort((a, b) => a.at - b.at)[0];
  }, [now]);

  const shown = group === "All" ? ACTIVITIES : ACTIVITIES.filter((a) => a.group === group);

  const toggle = (name: string) =>
    setPicked((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  return (
    <div
      className="w-full h-full flex flex-col text-white overflow-hidden"
      style={{
        background: `
          radial-gradient(125% 58% at 50% -14%, ${ACCENT}52 0%, ${ACCENT}17 44%, transparent 74%),
          radial-gradient(80% 40% at 105% 102%, ${ACCENT}2b 0%, transparent 66%),
          linear-gradient(180deg, #06110d 0%, #040a08 60%, #030706 100%)
        `,
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      }}
    >
      {/* ── app bar ─────────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center gap-[11px] px-[20px] pt-[10px] pb-[12px]">
        <div
          className="w-[38px] h-[38px] rounded-full flex items-center justify-center"
          style={{ background: `${ACCENT}26`, border: `1px solid ${ACCENT}59` }}
        >
          <Baby className="w-[19px] h-[19px]" style={{ color: ACCENT }} strokeWidth={1.9} />
        </div>
        <div className="min-w-0">
          <p className="text-[16px] font-bold leading-tight">Phulwari</p>
          <p className="text-[10.5px] text-white/50 leading-tight">Kidwaipuri, Patna</p>
        </div>
        <span
          className="ml-auto text-[9.5px] font-bold px-[10px] py-[5px] rounded-full"
          style={{ color: ACCENT, background: `${ACCENT}1f`, border: `1px solid ${ACCENT}3d` }}
        >
          4.9 ★
        </span>
      </div>

      {/* ── today ───────────────────────────────────────────────────────── */}
      {tab === "today" && (
        <Screen className="px-[20px] pb-[16px]">
          <p className="text-[24px] font-bold leading-[1.15] tracking-[-0.02em]">
            Where kids play
            <br />
            <span style={{ color: ACCENT }}>& moms shine.</span>
          </p>
          <p className="mt-[9px] text-[12.5px] leading-[1.5] text-white/60">
            Patna&apos;s own mother &amp; child activity centre — children learn and grow right
            alongside you.
          </p>

          {/* Next session, counting down against the real timetable. */}
          <div className="mt-[16px] px-[18px] py-[16px]" style={soft(26)}>
            <div className="flex items-center gap-[7px]">
              <CalendarClock className="w-[13px] h-[13px]" style={{ color: ACCENT }} />
              <span className="text-[9.5px] font-bold uppercase tracking-[0.17em] text-white/50">
                Next session
              </span>
              <span className="ml-auto flex items-center gap-[5px] text-[9.5px] font-bold" style={{ color: ACCENT }}>
                <motion.span
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ background: ACCENT }}
                  animate={active ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                LIVE
              </span>
            </div>

            <p className="mt-[11px] text-[21px] font-bold leading-tight">
              {next ? next.session.name : "Loading…"}
            </p>
            <p className="text-[11.5px] text-white/55 mt-[3px]">{next ? next.session.note : "—"}</p>

            <div className="mt-[13px] flex items-end gap-[8px]">
              <span className="text-[30px] font-bold leading-none" style={{ color: ACCENT }}>
                {next ? countdown(next.at - now) : "—"}
              </span>
              <span className="text-[11.5px] text-white/45 pb-[4px]">to go</span>
            </div>
          </div>

          {/* KPIs — these count from zero every time this tab is opened. */}
          <div className="mt-[12px] grid grid-cols-3 gap-[9px]">
            {[
              { v: <Counter to={200} run={active} suffix="+" resetKey={tab} />, l: "Families" },
              { v: <Counter to={4.9} run={active} decimals={1} resetKey={tab} />, l: "Rating" },
              { v: <Counter to={11} run={active} suffix="+" resetKey={tab} />, l: "Activities" },
            ].map((k) => (
              <div key={k.l} className="px-[10px] py-[13px] text-center" style={soft(20)}>
                <p className="text-[19px] font-bold leading-none" style={{ color: ACCENT }}>{k.v}</p>
                <p className="mt-[6px] text-[9px] font-semibold uppercase tracking-[0.13em] text-white/45">{k.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-[14px] flex gap-[9px]">
            <a
              href={whatsapp(PHONE, "Hi Phulwari! I'd like to book a demo class.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-[7px] text-[13px] font-bold py-[14px] rounded-full"
              style={{
                background: `linear-gradient(140deg, ${ACCENT}, ${ACCENT}bf)`,
                color: "#04120c",
                boxShadow: `0 14px 30px -14px ${ACCENT}`,
              }}
            >
              <MessageCircle className="w-[14px] h-[14px]" strokeWidth={2.4} />
              Book a demo
            </a>
            <a
              href={tel(PHONE)}
              className="flex items-center justify-center px-[17px] rounded-full"
              style={soft(999)}
              aria-label="Call Phulwari"
            >
              <Phone className="w-[15px] h-[15px]" style={{ color: ACCENT }} strokeWidth={2.2} />
            </a>
          </div>

          <p className="mt-[16px] text-[9.5px] font-bold uppercase tracking-[0.17em] text-white/40">
            Popular right now
          </p>
          <div className="mt-[9px] flex flex-col gap-[8px]">
            {ACTIVITIES.slice(0, 3).map((a) => {
              const Icon = GROUP_ICON[a.group];
              return (
                <button
                  key={a.name}
                  onClick={() => { setTab("play"); setGroup(a.group); }}
                  className="w-full flex items-center gap-[12px] px-[14px] py-[12px] text-left active:scale-[0.985] transition-transform"
                  style={soft(20)}
                >
                  <span
                    className="w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${ACCENT}1f` }}
                  >
                    <Icon className="w-[16px] h-[16px]" style={{ color: ACCENT }} strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold truncate">{a.name}</span>
                    <span className="block text-[10.5px] text-white/45 truncate">{a.blurb}</span>
                  </span>
                  <span className="ml-auto text-[10px] font-semibold text-white/50 shrink-0">{a.age}</span>
                </button>
              );
            })}
          </div>
        </Screen>
      )}

      {/* ── play ────────────────────────────────────────────────────────── */}
      {tab === "play" && (
        <>
          <div className="shrink-0 flex gap-[7px] px-[20px] pb-[11px] overflow-x-auto phone-scroll">
            {GROUPS.map((g) => {
              const on = group === g;
              return (
                <button
                  key={g}
                  onClick={() => setGroup(g)}
                  className="shrink-0 text-[11.5px] font-semibold px-[14px] py-[8px] rounded-full transition-colors"
                  style={
                    on
                      ? { background: ACCENT, color: "#04120c" }
                      : { ...soft(999), color: "rgba(255,255,255,0.7)" }
                  }
                >
                  {g}
                </button>
              );
            })}
          </div>

          <Screen className="px-[20px] pb-[14px]">
            <div className="flex flex-col gap-[9px]">
              {shown.map((a) => {
                const Icon = GROUP_ICON[a.group];
                const on = picked.includes(a.name);
                return (
                  <button
                    key={a.name}
                    onClick={() => toggle(a.name)}
                    className="w-full flex items-center gap-[12px] px-[14px] py-[13px] text-left active:scale-[0.985] transition-all"
                    style={{
                      ...soft(22),
                      ...(on
                        ? {
                            border: `1px solid ${ACCENT}`,
                            boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.26), 0 0 0 1px ${ACCENT}59, 0 16px 30px -20px ${ACCENT}`,
                          }
                        : null),
                    }}
                  >
                    <span
                      className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: on ? ACCENT : `${ACCENT}1f` }}
                    >
                      {on ? (
                        <Check className="w-[17px] h-[17px]" color="#04120c" strokeWidth={3} />
                      ) : (
                        <Icon className="w-[17px] h-[17px]" style={{ color: ACCENT }} strokeWidth={1.9} />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-semibold truncate">{a.name}</span>
                      <span className="block text-[10.5px] text-white/45 truncate">{a.blurb}</span>
                    </span>
                    <span
                      className="text-[9.5px] font-bold px-[9px] py-[4px] rounded-full shrink-0"
                      style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)" }}
                    >
                      {a.age}
                    </span>
                  </button>
                );
              })}
            </div>
          </Screen>

          {/* The selection is the message — tapping through builds the
              WhatsApp enquiry the real site asks people to send. */}
          <div className="shrink-0 px-[20px] pb-[10px] pt-[8px]">
            {picked.length > 0 ? (
              <a
                href={whatsapp(PHONE, `Hi Phulwari! I'm interested in: ${picked.join(", ")}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-[8px] text-[13px] font-bold py-[14px] rounded-full"
                style={{
                  background: `linear-gradient(140deg, ${ACCENT}, ${ACCENT}bf)`,
                  color: "#04120c",
                  boxShadow: `0 14px 30px -14px ${ACCENT}`,
                }}
              >
                <MessageCircle className="w-[14px] h-[14px]" strokeWidth={2.4} />
                Enquire about {picked.length} {picked.length === 1 ? "activity" : "activities"}
              </a>
            ) : (
              <p className="text-center text-[11px] text-white/40 py-[14px]">
                Tap the activities you&apos;re interested in
              </p>
            )}
          </div>
        </>
      )}

      {/* ── moms ────────────────────────────────────────────────────────── */}
      {tab === "moms" && <MomsTab active={active} />}

      {/* ── visit ───────────────────────────────────────────────────────── */}
      {tab === "visit" && (
        <Screen className="px-[20px] pb-[16px]">
          <div className="px-[18px] py-[16px]" style={soft(26)}>
            <MapPin className="w-[18px] h-[18px]" style={{ color: ACCENT }} strokeWidth={2} />
            <p className="mt-[10px] text-[13px] font-semibold leading-[1.45]">{ADDRESS}</p>
            <a
              href={MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[13px] inline-flex items-center gap-[6px] text-[11.5px] font-bold"
              style={{ color: ACCENT }}
            >
              <Navigation className="w-[12px] h-[12px]" strokeWidth={2.4} />
              Get directions
            </a>
          </div>

          <p className="mt-[16px] text-[9.5px] font-bold uppercase tracking-[0.17em] text-white/40">
            Timings
          </p>
          <div className="mt-[9px] flex flex-col gap-[8px]">
            {SESSIONS.map((s) => (
              <div key={s.name} className="flex items-center gap-[10px] px-[14px] py-[12px]" style={soft(20)}>
                <span className="min-w-0">
                  <span className="block text-[12.5px] font-semibold truncate">{s.name}</span>
                  <span className="block text-[10.5px] text-white/45 truncate">{s.note}</span>
                </span>
                <span className="ml-auto text-[12px] font-bold shrink-0" style={{ color: ACCENT }}>
                  {s.time}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-[16px] flex gap-[9px]">
            <a
              href={tel(PHONE)}
              className="flex-1 flex items-center justify-center gap-[7px] text-[12.5px] font-bold py-[13px] rounded-full"
              style={{ background: `linear-gradient(140deg, ${ACCENT}, ${ACCENT}bf)`, color: "#04120c" }}
            >
              <Phone className="w-[13px] h-[13px]" strokeWidth={2.4} />
              Call now
            </a>
            <a
              href={whatsapp(PHONE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-[7px] text-[12.5px] font-semibold py-[13px] rounded-full text-white/85"
              style={soft(999)}
            >
              <MessageCircle className="w-[13px] h-[13px]" strokeWidth={2.2} />
              WhatsApp
            </a>
          </div>
        </Screen>
      )}

      {/* ── tab bar ─────────────────────────────────────────────────────── */}
      <div className="shrink-0 mx-[16px] mb-[12px] mt-[6px] flex p-[6px] gap-[3px]" style={soft(999)}>
        {TABS.map(({ id, label, icon: Icon }) => {
          const on = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="relative flex-1 flex flex-col items-center gap-[3px] py-[9px] rounded-full"
            >
              {on && (
                <motion.span
                  layoutId="phulwari-tab"
                  className="absolute inset-0 rounded-full"
                  style={{ background: `${ACCENT}26`, border: `1px solid ${ACCENT}4d` }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon
                className="relative w-[16px] h-[16px]"
                strokeWidth={on ? 2.3 : 1.8}
                style={{ color: on ? ACCENT : "rgba(255,255,255,0.5)" }}
              />
              <span
                className="relative text-[9px] font-semibold"
                style={{ color: on ? ACCENT : "rgba(255,255,255,0.45)" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* Split out so its counters mount (and therefore run) only when the tab is
   actually opened, instead of counting to themselves behind another screen. */
function MomsTab({ active }: { active: boolean }) {
  return (
    <Screen className="px-[20px] pb-[16px]">
      <div className="relative overflow-hidden px-[18px] py-[18px]" style={soft(26)}>
        <Dumbbell className="w-[20px] h-[20px]" style={{ color: ACCENT }} strokeWidth={2} />
        <p className="mt-[11px] text-[20px] font-bold leading-tight">Mother Fitness Program</p>
        <p className="mt-[7px] text-[12.5px] leading-[1.5] text-white/60">
          Stay active, healthy and energetic while your child plays in the same building. Open to
          all mothers, no fitness background needed.
        </p>
        <span
          className="mt-[13px] inline-block text-[10px] font-bold px-[11px] py-[6px] rounded-full"
          style={{ color: ACCENT, background: `${ACCENT}1f`, border: `1px solid ${ACCENT}3d` }}
        >
          All mothers welcome
        </span>
      </div>

      <div className="mt-[12px] grid grid-cols-2 gap-[9px]">
        <div className="px-[14px] py-[15px]" style={soft(22)}>
          <p className="text-[24px] font-bold leading-none" style={{ color: ACCENT }}>
            <Counter to={5} run={active} suffix="+" />
          </p>
          <p className="mt-[7px] text-[9.5px] font-semibold uppercase tracking-[0.13em] text-white/45">
            Years of excellence
          </p>
        </div>
        <div className="px-[14px] py-[15px]" style={soft(22)}>
          <p className="text-[24px] font-bold leading-none" style={{ color: ACCENT }}>
            <Counter to={100} run={active} suffix="%" />
          </p>
          <p className="mt-[7px] text-[9.5px] font-semibold uppercase tracking-[0.13em] text-white/45">
            Parent satisfaction
          </p>
        </div>
      </div>

      <p className="mt-[16px] text-[9.5px] font-bold uppercase tracking-[0.17em] text-white/40">
        Also for moms
      </p>
      <div className="mt-[9px] flex flex-col gap-[8px]">
        {[
          { name: "Mother & Toddler", note: "1.5–4 yrs · bond, learn & grow together" },
          { name: "Yoga", note: "Healthy body, calm mind" },
          { name: "Premium Circle", note: "5:00 PM onwards · Mon–Sun" },
        ].map((r) => (
          <div key={r.name} className="flex items-center gap-[11px] px-[14px] py-[12px]" style={soft(20)}>
            <Heart className="w-[15px] h-[15px] shrink-0" style={{ color: ACCENT }} strokeWidth={2} />
            <span className="min-w-0">
              <span className="block text-[12.5px] font-semibold truncate">{r.name}</span>
              <span className="block text-[10.5px] text-white/45 truncate">{r.note}</span>
            </span>
          </div>
        ))}
      </div>
    </Screen>
  );
}
