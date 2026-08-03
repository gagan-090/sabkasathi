"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  Check,
  Minus,
  Plus,
  Search,
  ShoppingBag,
} from "lucide-react";
import { Counter, Screen } from "@/components/mockups/kit";
import { tokens, type Tokens } from "./theme";
import type { IndustryScreen } from "./screens";

/*
  Six interaction models the concept screens are built from.

  Each one is a different product, not a different skin: a booking screen
  commits to a slot, a storefront tallies a basket, a portal is read-only status
  for work already in flight. Pairing them with the four looks in theme.ts is
  what keeps a row of five phones from reading as one template — see the note at
  the top of screens.ts.

  Everything is laid out against the 390px virtual viewport described in
  components/mockups/kit.tsx, so sizes here are plain pixel values.
*/

const SANS = "var(--font-dm-sans), system-ui, sans-serif";

/* Concept screens have no business behind them to ring, so every call to
   action lands on our own enquiry form rather than a `tel:` for a number that
   does not exist. */
const CTA_HREF = "/contact";

/* ── shared furniture ─────────────────────────────────────────────────────── */

function Chrome({
  t,
  accent,
  industry,
  aside,
  cta,
  children,
}: {
  t: Tokens;
  accent: string;
  industry: string;
  aside?: React.ReactNode;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: t.bg, color: t.ink, fontFamily: SANS }}
    >
      <div
        className="shrink-0 px-[22px] pt-[10px] pb-[11px]"
        style={{ borderBottom: t.line }}
      >
        <div className="flex items-center gap-[8px]">
          <span
            className="w-[7px] h-[7px] rounded-full shrink-0"
            style={{ background: accent, boxShadow: `0 0 8px ${accent}99` }}
          />
          <p className="text-[10.5px] font-bold uppercase tracking-[0.19em] truncate">
            {industry}
          </p>
          <span className="ml-auto shrink-0">{aside}</span>
        </div>
      </div>

      <Screen className="px-[22px]">{children}</Screen>

      <div
        className="shrink-0 flex gap-[8px] px-[22px] pt-[10px] pb-[12px]"
        style={{ borderTop: t.line }}
      >
        <a
          href={CTA_HREF}
          className="flex-1 flex items-center justify-center gap-[7px] text-[12.5px] font-bold py-[13px]"
          style={{
            borderRadius: Math.max(t.radius, 4),
            background: accent,
            color: t.onAccent,
            boxShadow: `0 14px 30px -16px ${accent}`,
          }}
        >
          {cta}
        </a>
        <a
          href={CTA_HREF}
          className="flex items-center justify-center px-[14px]"
          style={{
            borderRadius: Math.max(t.radius, 4),
            border: `1px solid ${accent}59`,
            color: accent,
          }}
          aria-label="Talk to Sabka Saathi about this screen"
        >
          <ArrowUpRight className="w-[15px] h-[15px]" strokeWidth={2.4} />
        </a>
      </div>
    </div>
  );
}

function Hero({
  s,
  t,
  size = 34,
}: {
  s: IndustryScreen;
  t: Tokens;
  size?: number;
}) {
  return (
    <>
      <p
        className="mt-[16px] text-[9px] font-bold uppercase tracking-[0.24em]"
        style={{ color: s.accent }}
      >
        {s.kicker}
      </p>
      <h2
        className="mt-[9px] leading-[1.04] tracking-[-0.01em]"
        style={{ ...t.display, fontSize: size }}
      >
        {s.headline}
        <br />
        <em style={{ color: s.accent, fontStyle: t.displayItalic ? "italic" : "normal" }}>
          {s.headlineAccent}
        </em>
      </h2>
      <p className="mt-[10px] text-[12px] leading-[1.5]" style={{ color: t.sub }}>
        {s.blurb}
      </p>
    </>
  );
}

function Figures({
  s,
  t,
  active,
  resetKey,
}: {
  s: IndustryScreen;
  t: Tokens;
  active: boolean;
  resetKey: string | number;
}) {
  return (
    <div
      className="mt-[18px] grid grid-cols-3"
      style={{ borderTop: t.line, borderBottom: t.line }}
    >
      {s.stats.map((k, i) => (
        <div
          key={k.label}
          className="py-[13px] text-center"
          style={{ borderLeft: i === 0 ? undefined : t.line }}
        >
          <p
            className="text-[22px] leading-none tabular-nums"
            style={{ ...t.display, color: s.accent }}
          >
            <Counter
              to={k.to}
              run={active}
              decimals={k.decimals ?? 0}
              suffix={k.suffix}
              resetKey={resetKey}
            />
          </p>
          <p
            className="mt-[6px] text-[8px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: t.faint }}
          >
            {k.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/** The tab / filter strip every archetype except booking opens with. */
function Tabs({
  items,
  value,
  onChange,
  t,
  accent,
  layoutId,
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
  t: Tokens;
  accent: string;
  layoutId: string;
}) {
  return (
    <div className="mt-[15px] flex gap-[6px]">
      {items.map((item) => {
        const on = item === value;
        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className="relative flex-1 py-[9px] text-[10px] font-bold transition-colors"
            style={{
              borderRadius: Math.min(t.radius, 999),
              border: `1px solid ${on ? accent : t.dark ? "rgba(255,255,255,0.11)" : "rgba(15,23,42,0.10)"}`,
              color: on ? accent : t.faint,
            }}
          >
            <span className="relative z-10">{item}</span>
            {/* The tint is the shared layout element, so it slides between
                tabs rather than cross-fading. Keeping it off the button's own
                background is what stops the active tab reading double-tinted. */}
            {on && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0"
                style={{
                  borderRadius: Math.min(t.radius, 999),
                  background: `${accent}1f`,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function Label({ t, children }: { t: Tokens; children: React.ReactNode }) {
  return (
    <p
      className="mt-[16px] text-[9px] font-bold uppercase tracking-[0.2em]"
      style={{ color: t.faint }}
    >
      {children}
    </p>
  );
}

const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ── booking ──────────────────────────────────────────────────────────────── */

function Booking({
  s,
  t,
  active,
}: {
  s: Extract<IndustryScreen, { archetype: "booking" }>;
  t: Tokens;
  active: boolean;
}) {
  const [svc, setSvc] = useState(0);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(2);

  const chosen = s.services[svc];

  return (
    <Chrome
      t={t}
      accent={s.accent}
      industry={s.industry}
      aside={
        <span
          className="text-[8px] font-bold uppercase tracking-[0.16em] flex items-center gap-[4px]"
          style={{ color: t.faint }}
        >
          <span
            className="w-[5px] h-[5px] rounded-full"
            style={{ background: s.accent }}
          />
          Open today
        </span>
      }
      cta={`Book · ${s.days[day]} ${s.slots[slot]}`}
    >
      <Hero s={s} t={t} />

      <Label t={t}>Choose a service</Label>
      <div className="mt-[9px] flex flex-col gap-[7px]">
        {s.services.map((service, i) => {
          const on = i === svc;
          return (
            <button
              key={service.n}
              onClick={() => setSvc(i)}
              className="w-full flex items-center gap-[11px] px-[13px] py-[11px] text-left transition-colors"
              style={{
                borderRadius: t.radius,
                border: `1px solid ${on ? s.accent : t.dark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)"}`,
                background: on ? `${s.accent}14` : t.surface,
                ...(on ? {} : t.surfaceExtra),
              }}
            >
              <span
                className="shrink-0 w-[17px] h-[17px] rounded-full flex items-center justify-center"
                style={{
                  border: `1.5px solid ${on ? s.accent : t.faint}`,
                  background: on ? s.accent : "transparent",
                }}
              >
                {on && (
                  <Check
                    className="w-[10px] h-[10px]"
                    strokeWidth={3.4}
                    style={{ color: t.onAccent }}
                  />
                )}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[12.5px] font-bold truncate">
                  {service.n}
                </span>
                <span
                  className="block mt-[2px] text-[10px] truncate"
                  style={{ color: t.faint }}
                >
                  {service.meta}
                </span>
              </span>
              <span
                className="shrink-0 text-[11.5px] font-bold tabular-nums"
                style={{ color: on ? s.accent : t.sub }}
              >
                {service.price}
              </span>
            </button>
          );
        })}
      </div>

      <Label t={t}>Pick a day</Label>
      <div className="mt-[9px] flex gap-[5px]">
        {s.days.map((d, i) => {
          const on = i === day;
          return (
            <button
              key={d}
              onClick={() => setDay(i)}
              className="flex-1 py-[9px] text-[9.5px] font-bold transition-colors"
              style={{
                borderRadius: Math.min(t.radius, 10),
                background: on ? s.accent : t.dark ? "rgba(255,255,255,0.05)" : "#fff",
                border: `1px solid ${on ? s.accent : t.dark ? "rgba(255,255,255,0.09)" : "rgba(15,23,42,0.08)"}`,
                color: on ? t.onAccent : t.sub,
              }}
            >
              {d}
            </button>
          );
        })}
      </div>

      <Label t={t}>Available slots</Label>
      <div className="mt-[9px] grid grid-cols-3 gap-[6px]">
        {s.slots.map((sl, i) => {
          const on = i === slot;
          return (
            <button
              key={sl}
              onClick={() => setSlot(i)}
              className="py-[10px] text-[11px] font-semibold transition-colors"
              style={{
                borderRadius: Math.min(t.radius, 10),
                border: `1px solid ${on ? s.accent : t.dark ? "rgba(255,255,255,0.11)" : "rgba(15,23,42,0.09)"}`,
                background: on ? `${s.accent}1f` : "transparent",
                color: on ? s.accent : t.sub,
              }}
            >
              {sl}
            </button>
          );
        })}
      </div>

      <div
        className="mt-[15px] px-[13px] py-[11px]"
        style={{
          borderRadius: t.radius,
          background: t.surface,
          border: t.surfaceLine,
          ...t.surfaceExtra,
        }}
      >
        <p
          className="text-[8.5px] font-bold uppercase tracking-[0.18em]"
          style={{ color: t.faint }}
        >
          Your booking
        </p>
        <p className="mt-[5px] text-[13px] font-bold leading-[1.35]">
          {chosen.n} · {s.days[day]}, {s.slots[slot]}
        </p>
        <p className="mt-[2px] text-[10.5px]" style={{ color: t.sub }}>
          {chosen.price} · {chosen.meta}
        </p>
      </div>

      <Figures s={s} t={t} active={active} resetKey={svc} />
      <div className="h-[8px]" />
    </Chrome>
  );
}

/* ── storefront ───────────────────────────────────────────────────────────── */

function Storefront({
  s,
  t,
  active,
}: {
  s: Extract<IndustryScreen, { archetype: "storefront" }>;
  t: Tokens;
  active: boolean;
}) {
  const [tab, setTab] = useState(s.tabs[0]);
  const [cart, setCart] = useState<Record<string, number>>({});

  const visible = s.items.filter((i) => i.tab === tab);
  const { count, total } = useMemo(() => {
    let c = 0;
    let sum = 0;
    for (const item of s.items) {
      const q = cart[item.n] ?? 0;
      c += q;
      sum += q * item.price;
    }
    return { count: c, total: sum };
  }, [cart, s.items]);

  const bump = (name: string, by: number) =>
    setCart((prev) => {
      const next = Math.max(0, (prev[name] ?? 0) + by);
      const copy = { ...prev };
      if (next === 0) delete copy[name];
      else copy[name] = next;
      return copy;
    });

  return (
    <Chrome
      t={t}
      accent={s.accent}
      industry={s.industry}
      aside={
        <span
          className="flex items-center gap-[4px] text-[9px] font-bold px-[7px] py-[3px]"
          style={{
            borderRadius: 999,
            color: count ? s.accent : t.faint,
            background: count ? `${s.accent}1f` : "transparent",
            border: `1px solid ${count ? `${s.accent}44` : "transparent"}`,
          }}
        >
          <ShoppingBag className="w-[10px] h-[10px]" strokeWidth={2.4} />
          {count}
        </span>
      }
      cta={total ? `Send list · ${money(total)}` : s.cta}
    >
      <Hero s={s} t={t} size={30} />

      <Tabs
        items={s.tabs}
        value={tab}
        onChange={setTab}
        t={t}
        accent={s.accent}
        layoutId={`store-tab-${s.id}`}
      />

      <div className="mt-[11px] flex flex-col gap-[7px]">
        {visible.map((item) => {
          const q = cart[item.n] ?? 0;
          return (
            <div
              key={item.n}
              className="flex items-center gap-[10px] px-[13px] py-[10px]"
              style={{
                borderRadius: t.radius,
                background: t.surface,
                border: q ? `1px solid ${s.accent}66` : t.surfaceLine,
                ...t.surfaceExtra,
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-bold truncate">{item.n}</p>
                <p className="mt-[2px] text-[9.5px] truncate" style={{ color: t.faint }}>
                  {item.meta}
                </p>
                <p
                  className="mt-[4px] text-[11.5px] font-bold tabular-nums"
                  style={{ color: s.accent }}
                >
                  {money(item.price)}
                  <span
                    className="ml-[3px] text-[9px] font-semibold"
                    style={{ color: t.faint }}
                  >
                    /{item.unit}
                  </span>
                </p>
              </div>

              {q === 0 ? (
                <button
                  onClick={() => bump(item.n, 1)}
                  className="shrink-0 px-[13px] py-[7px] text-[10.5px] font-bold"
                  style={{
                    borderRadius: Math.min(t.radius, 10),
                    border: `1px solid ${s.accent}`,
                    color: s.accent,
                  }}
                >
                  Add
                </button>
              ) : (
                <div
                  className="shrink-0 flex items-center gap-[9px] px-[8px] py-[6px]"
                  style={{
                    borderRadius: Math.min(t.radius, 10),
                    background: s.accent,
                    color: t.onAccent,
                  }}
                >
                  <button onClick={() => bump(item.n, -1)} aria-label={`One less ${item.n}`}>
                    <Minus className="w-[11px] h-[11px]" strokeWidth={3} />
                  </button>
                  <span className="text-[11px] font-black tabular-nums w-[12px] text-center">
                    {q}
                  </span>
                  <button onClick={() => bump(item.n, 1)} aria-label={`One more ${item.n}`}>
                    <Plus className="w-[11px] h-[11px]" strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Figures s={s} t={t} active={active} resetKey={tab} />
      <div className="h-[8px]" />
    </Chrome>
  );
}

/* ── menu ─────────────────────────────────────────────────────────────────── */

function Menu({
  s,
  t,
  active,
}: {
  s: Extract<IndustryScreen, { archetype: "menu" }>;
  t: Tokens;
  active: boolean;
}) {
  const [section, setSection] = useState(s.sections[0]);
  const [cart, setCart] = useState<Record<string, number>>({});

  const visible = s.items.filter((i) => i.section === section);
  const total = useMemo(
    () => s.items.reduce((sum, i) => sum + (cart[i.n] ?? 0) * i.price, 0),
    [cart, s.items],
  );

  const bump = (name: string, by: number) =>
    setCart((prev) => {
      const next = Math.max(0, (prev[name] ?? 0) + by);
      const copy = { ...prev };
      if (next === 0) delete copy[name];
      else copy[name] = next;
      return copy;
    });

  return (
    <Chrome
      t={t}
      accent={s.accent}
      industry={s.industry}
      aside={
        <span
          className="text-[8px] font-bold uppercase tracking-[0.16em]"
          style={{ color: t.faint }}
        >
          {total ? money(total) : "Menu"}
        </span>
      }
      cta={total ? `Place order · ${money(total)}` : s.cta}
    >
      <Hero s={s} t={t} size={32} />

      <Tabs
        items={s.sections}
        value={section}
        onChange={setSection}
        t={t}
        accent={s.accent}
        layoutId={`menu-tab-${s.id}`}
      />

      <div className="mt-[11px] flex flex-col">
        {visible.map((item, i) => {
          const q = cart[item.n] ?? 0;
          return (
            <div
              key={item.n}
              className="flex items-start gap-[10px] py-[12px]"
              style={{ borderTop: i === 0 ? undefined : t.line }}
            >
              {/* The standard Indian veg / non-veg mark. */}
              <span
                className="shrink-0 mt-[3px] w-[11px] h-[11px] flex items-center justify-center"
                style={{
                  border: `1.4px solid ${item.veg ? "#16a34a" : "#b91c1c"}`,
                  borderRadius: 2,
                }}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ background: item.veg ? "#16a34a" : "#b91c1c" }}
                />
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-bold leading-[1.25]">{item.n}</p>
                <p className="mt-[2px] text-[10px]" style={{ color: t.faint }}>
                  {item.meta}
                </p>
                <p className="mt-[4px] text-[12px] font-bold tabular-nums">
                  {money(item.price)}
                </p>
              </div>

              {q === 0 ? (
                <button
                  onClick={() => bump(item.n, 1)}
                  className="shrink-0 mt-[2px] px-[14px] py-[7px] text-[10.5px] font-black uppercase tracking-[0.08em]"
                  style={{
                    borderRadius: Math.min(t.radius, 8),
                    border: `1px solid ${s.accent}`,
                    color: s.accent,
                  }}
                >
                  Add
                </button>
              ) : (
                <div
                  className="shrink-0 mt-[2px] flex items-center gap-[9px] px-[8px] py-[6px]"
                  style={{
                    borderRadius: Math.min(t.radius, 8),
                    background: s.accent,
                    color: t.onAccent,
                  }}
                >
                  <button onClick={() => bump(item.n, -1)} aria-label={`One less ${item.n}`}>
                    <Minus className="w-[11px] h-[11px]" strokeWidth={3} />
                  </button>
                  <span className="text-[11px] font-black tabular-nums w-[12px] text-center">
                    {q}
                  </span>
                  <button onClick={() => bump(item.n, 1)} aria-label={`One more ${item.n}`}>
                    <Plus className="w-[11px] h-[11px]" strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Figures s={s} t={t} active={active} resetKey={section} />
      <div className="h-[8px]" />
    </Chrome>
  );
}

/* ── portal ───────────────────────────────────────────────────────────────── */

function Portal({
  s,
  t,
  active,
}: {
  s: Extract<IndustryScreen, { archetype: "portal" }>;
  t: Tokens;
  active: boolean;
}) {
  const [filter, setFilter] = useState(s.filters[0]);
  const visible = s.rows.filter((r) => r.filter === filter);

  return (
    <Chrome
      t={t}
      accent={s.accent}
      industry={s.industry}
      aside={<Bell className="w-[13px] h-[13px]" strokeWidth={2} style={{ color: t.faint }} />}
      cta={s.cta}
    >
      <Hero s={s} t={t} size={29} />

      {/* Figures sit high here — a status board leads with the number, not
          with the pitch. */}
      <Figures s={s} t={t} active={active} resetKey={filter} />

      <Tabs
        items={s.filters}
        value={filter}
        onChange={setFilter}
        t={t}
        accent={s.accent}
        layoutId={`portal-tab-${s.id}`}
      />

      <div className="mt-[11px] flex flex-col gap-[7px]">
        {visible.map((row) => (
          <motion.div
            key={row.code}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26 }}
            className="px-[13px] py-[11px]"
            style={{
              borderRadius: t.radius,
              background: t.surface,
              border: t.surfaceLine,
              ...t.surfaceExtra,
            }}
          >
            <div className="flex items-center gap-[8px]">
              <span
                className="text-[8.5px] font-black uppercase tracking-[0.1em] px-[6px] py-[3px] tabular-nums"
                style={{
                  borderRadius: 3,
                  color: s.accent,
                  background: `${s.accent}1f`,
                }}
              >
                {row.code}
              </span>
              <span
                className="ml-auto text-[9.5px] font-bold px-[8px] py-[3px]"
                style={{
                  borderRadius: 999,
                  color: s.accent,
                  border: `1px solid ${s.accent}4d`,
                }}
              >
                {row.status}
              </span>
            </div>
            <p className="mt-[8px] text-[12.5px] font-bold leading-[1.3]">{row.title}</p>
            <p className="mt-[3px] text-[10px]" style={{ color: t.faint }}>
              {row.meta}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="h-[10px]" />
    </Chrome>
  );
}

/* ── catalog ──────────────────────────────────────────────────────────────── */

function Catalog({
  s,
  t,
  active,
}: {
  s: Extract<IndustryScreen, { archetype: "catalog" }>;
  t: Tokens;
  active: boolean;
}) {
  const [filter, setFilter] = useState(s.filters[0]);
  const [picked, setPicked] = useState(0);

  const visible = s.listings.filter((l) => l.filter === filter);
  const chosen = visible[Math.min(picked, visible.length - 1)];

  return (
    <Chrome
      t={t}
      accent={s.accent}
      industry={s.industry}
      aside={<Search className="w-[13px] h-[13px]" strokeWidth={2.2} style={{ color: t.faint }} />}
      cta={s.cta}
    >
      <Hero s={s} t={t} size={31} />

      <Tabs
        items={s.filters}
        value={filter}
        onChange={(v) => {
          setFilter(v);
          setPicked(0);
        }}
        t={t}
        accent={s.accent}
        layoutId={`catalog-tab-${s.id}`}
      />

      <div className="mt-[11px] flex flex-col gap-[8px]">
        {visible.map((listing, i) => {
          const on = i === Math.min(picked, visible.length - 1);
          return (
            <button
              key={listing.title}
              onClick={() => setPicked(i)}
              className="w-full text-left px-[13px] py-[12px] transition-colors"
              style={{
                borderRadius: t.radius,
                background: on ? `${s.accent}12` : t.surface,
                border: `1px solid ${on ? s.accent : t.dark ? "rgba(255,255,255,0.09)" : "rgba(15,23,42,0.07)"}`,
                ...(on ? {} : t.surfaceExtra),
              }}
            >
              <div className="flex items-baseline gap-[8px]">
                <span
                  className="text-[8px] font-black uppercase tracking-[0.14em] px-[6px] py-[3px]"
                  style={{
                    borderRadius: 2,
                    color: s.accent,
                    background: `${s.accent}1a`,
                  }}
                >
                  {listing.tag}
                </span>
                <span
                  className="ml-auto text-[13px] font-bold tabular-nums"
                  style={{ ...t.display, color: t.ink }}
                >
                  {listing.price}
                </span>
              </div>
              <p className="mt-[8px] text-[14px] leading-[1.2]" style={t.display}>
                {listing.title}
              </p>
              <p className="mt-[4px] text-[10.5px] leading-[1.45]" style={{ color: t.sub }}>
                {listing.meta}
              </p>
            </button>
          );
        })}
      </div>

      {chosen && (
        <div
          className="mt-[13px] px-[13px] py-[11px]"
          style={{ borderTop: t.line, borderBottom: t.line }}
        >
          <p
            className="text-[8.5px] font-bold uppercase tracking-[0.18em]"
            style={{ color: t.faint }}
          >
            Selected
          </p>
          <p className="mt-[5px] text-[13px] font-bold">{chosen.title}</p>
          <p className="mt-[2px] text-[10.5px]" style={{ color: t.sub }}>
            {chosen.price} · {chosen.tag}
          </p>
        </div>
      )}

      <Figures s={s} t={t} active={active} resetKey={filter} />
      <div className="h-[8px]" />
    </Chrome>
  );
}

/* ── studio ───────────────────────────────────────────────────────────────── */

function Studio({
  s,
  t,
  active,
}: {
  s: Extract<IndustryScreen, { archetype: "studio" }>;
  t: Tokens;
  active: boolean;
}) {
  const [tab, setTab] = useState(s.tabs[0]);
  const visible = s.works.filter((w) => w.tab === tab);

  return (
    <Chrome
      t={t}
      accent={s.accent}
      industry={s.industry}
      aside={
        <span
          className="text-[8px] font-bold uppercase tracking-[0.16em]"
          style={{ color: t.faint }}
        >
          Work
        </span>
      }
      cta={s.cta}
    >
      <Hero s={s} t={t} size={35} />

      <Tabs
        items={s.tabs}
        value={tab}
        onChange={setTab}
        t={t}
        accent={s.accent}
        layoutId={`studio-tab-${s.id}`}
      />

      {/* First item runs full width, the rest pair up. Three works in a plain
          two-column grid always left one dead cell; this fills the row and
          gives the tab a lead piece at the same time. */}
      <div className="mt-[11px] grid grid-cols-2 gap-[8px]">
        {visible.map((work, i) => {
          const lead = i === 0;
          return (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: i * 0.05 }}
              className={lead ? "col-span-2" : undefined}
              style={{
                borderRadius: t.radius,
                overflow: "hidden",
                background: t.surface,
                border: t.surfaceLine,
                ...t.surfaceExtra,
              }}
            >
              {/* A tinted plate carrying the piece's index rather than a stock
                  photo — the screen is about what the work is, and an empty
                  plate just reads as an image that failed to load. */}
              <div
                className="relative w-full flex items-end px-[10px] pb-[6px]"
                style={{
                  height: lead ? 60 : 48,
                  background: `linear-gradient(${132 + i * 26}deg, ${s.accent}5c 0%, ${s.accent}1f 55%, transparent 100%)`,
                  borderBottom: t.line,
                }}
              >
                <span
                  className="leading-none tabular-nums"
                  style={{
                    ...t.display,
                    fontSize: lead ? 30 : 22,
                    color: s.accent,
                    opacity: 0.85,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="px-[10px] pt-[8px] pb-[10px]">
                <p
                  className="font-bold leading-[1.25]"
                  style={{ fontSize: lead ? 13 : 11 }}
                >
                  {work.title}
                </p>
                <p
                  className="mt-[3px] leading-[1.35]"
                  style={{ fontSize: lead ? 10 : 9, color: t.faint }}
                >
                  {work.meta}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Figures s={s} t={t} active={active} resetKey={tab} />
      <div className="h-[8px]" />
    </Chrome>
  );
}

/* ── dispatcher ───────────────────────────────────────────────────────────── */

export function IndustryApp({
  screen,
  active,
}: {
  screen: IndustryScreen;
  active: boolean;
}) {
  const t = tokens(screen.theme, screen.accent);

  switch (screen.archetype) {
    case "booking":
      return <Booking s={screen} t={t} active={active} />;
    case "storefront":
      return <Storefront s={screen} t={t} active={active} />;
    case "menu":
      return <Menu s={screen} t={t} active={active} />;
    case "portal":
      return <Portal s={screen} t={t} active={active} />;
    case "catalog":
      return <Catalog s={screen} t={t} active={active} />;
    case "studio":
      return <Studio s={screen} t={t} active={active} />;
  }
}
