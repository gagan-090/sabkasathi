import type { CSSProperties } from "react";

/*
  Four looks the industry concept screens are drawn in.

  The point of having more than one is that forty phones in a row all speaking
  the same visual language would read as forty renders of one template — which
  is the opposite of what the section is arguing. Pairing a look with an
  archetype (components/industries/archetypes.tsx) gives each category a row
  where no two phones share both, so a dental booking screen and a salon booking
  screen are recognisably different products.

  Every token is a function of the screen's accent, so a look can be pointed at
  any hue without a second palette being hand-picked for it.
*/

export type ThemeName = "midnight" | "glass" | "paper" | "bright";

export interface Tokens {
  /** Full-bleed background for the screen. */
  bg: string;
  ink: string;
  sub: string;
  faint: string;
  /** Hairline used for rules and dividers, as a `border` shorthand. */
  line: string;
  /** Panel fill and its border, for the archetypes that use cards. */
  surface: string;
  surfaceLine: string;
  /** Extra panel styling — the glass look needs a blur, the others don't. */
  surfaceExtra: CSSProperties;
  /** Shape language: sharp and editorial, or soft and app-like. */
  radius: number;
  /** Font for display headlines. */
  display: CSSProperties;
  /** Whether the display face has an italic worth setting the accent line in.
      Instrument Serif does; DM Sans faked-oblique does not. */
  displayItalic: boolean;
  /** Readable text colour on top of a solid accent fill. */
  onAccent: string;
  /** True when the screen is dark, for anything that needs to branch. */
  dark: boolean;
}

const serif: CSSProperties = {
  fontFamily: "var(--font-instrument-serif), Georgia, serif",
};
const sans: CSSProperties = {
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  fontWeight: 700,
  letterSpacing: "-0.02em",
};

export function tokens(theme: ThemeName, accent: string): Tokens {
  switch (theme) {
    /* Dark, serif, hairlines, near-square corners — a printed prospectus
       rather than a dashboard. */
    case "midnight":
      return {
        bg: `
          radial-gradient(100% 44% at 82% -6%, ${accent}3d 0%, transparent 60%),
          radial-gradient(90% 38% at 6% 104%, ${accent}20 0%, transparent 62%),
          linear-gradient(180deg, #0b0910 0%, #07060c 55%, #050408 100%)
        `,
        ink: "#ffffff",
        sub: "rgba(255,255,255,0.60)",
        faint: "rgba(255,255,255,0.34)",
        line: "1px solid rgba(255,255,255,0.11)",
        surface: "rgba(255,255,255,0.04)",
        surfaceLine: "1px solid rgba(255,255,255,0.09)",
        surfaceExtra: {},
        radius: 4,
        display: serif,
        displayItalic: true,
        onAccent: "#0a0710",
        dark: true,
      };

    /* Dark, sans, translucent panes and generous rounding — the most
       conventionally "app" of the four. */
    case "glass":
      return {
        bg: `
          radial-gradient(120% 60% at 50% -12%, ${accent}47 0%, ${accent}12 42%, transparent 72%),
          radial-gradient(85% 45% at 108% 104%, ${accent}2b 0%, transparent 68%),
          linear-gradient(180deg, #080d14 0%, #05080d 55%, #04060a 100%)
        `,
        ink: "#ffffff",
        sub: "rgba(255,255,255,0.64)",
        faint: "rgba(255,255,255,0.44)",
        line: "1px solid rgba(255,255,255,0.10)",
        surface:
          "linear-gradient(157deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 42%, rgba(255,255,255,0.03) 100%)",
        surfaceLine: "1px solid rgba(255,255,255,0.12)",
        surfaceExtra: {
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.22), 0 14px 34px -18px rgba(0,0,0,0.9)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        },
        radius: 18,
        display: sans,
        displayItalic: false,
        onAccent: "#05080d",
        dark: true,
      };

    /* Warm off-white, serif, almost no rounding — catalogues and studios,
       where the product is taste rather than throughput. */
    case "paper":
      return {
        bg: `
          radial-gradient(90% 40% at 88% -8%, ${accent}1c 0%, transparent 62%),
          linear-gradient(180deg, #faf6ef 0%, #f4efe5 60%, #efe9dd 100%)
        `,
        ink: "#1c1917",
        sub: "rgba(28,25,23,0.62)",
        faint: "rgba(28,25,23,0.40)",
        line: "1px solid rgba(28,25,23,0.13)",
        surface: "rgba(255,255,255,0.62)",
        surfaceLine: "1px solid rgba(28,25,23,0.10)",
        surfaceExtra: {},
        radius: 2,
        display: serif,
        displayItalic: true,
        onAccent: "#ffffff",
        dark: false,
      };

    /* Clean light grey with white cards — the look most small-business owners
       already expect from an app. */
    case "bright":
      return {
        bg: `
          radial-gradient(110% 46% at 50% -10%, ${accent}1f 0%, transparent 64%),
          linear-gradient(180deg, #f7f8fa 0%, #f1f3f6 60%, #eceff3 100%)
        `,
        ink: "#0f172a",
        sub: "rgba(15,23,42,0.62)",
        faint: "rgba(15,23,42,0.42)",
        line: "1px solid rgba(15,23,42,0.09)",
        surface: "#ffffff",
        surfaceLine: "1px solid rgba(15,23,42,0.07)",
        surfaceExtra: { boxShadow: "0 8px 22px -16px rgba(15,23,42,0.5)" },
        radius: 16,
        display: sans,
        displayItalic: false,
        onAccent: "#ffffff",
        dark: false,
      };
  }
}
