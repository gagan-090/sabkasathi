import { INDUSTRY_ROWS, type RowEntry } from "./screens";
import { extraScreens } from "./extraScreens";

/*
  Every screen, flat and keyed by id.

  IndustriesSection now puts a phone inside each of its 55 industry cards, so
  the lookup it needs is card → screen, not category → five screens. The
  category grouping in screens.ts stays as the place the screens are authored
  and read; this is the index built from it.

  Kept in its own file to avoid a cycle: extraScreens.ts imports RowEntry from
  screens.ts as a type only, and the value-level dependency runs one way,
  screens → extras → here.
*/

const all: RowEntry[] = [
  // INDUSTRY_ROWS.All is a selection of entries that appear in the eight real
  // category arrays too, so the flat map is deduplicated by id below.
  ...Object.entries(INDUSTRY_ROWS)
    .filter(([category]) => category !== "All")
    .flatMap(([, entries]) => entries),
  ...extraScreens,
];

export const SCREEN_BY_ID: Record<string, RowEntry> = Object.fromEntries(
  all.map((entry) => [entry.id, entry]),
);

export const ALL_SCREEN_IDS = Object.keys(SCREEN_BY_ID);

/* Two screens are built but not currently on a card: `lab` (Diagnostic Lab) and
   `cloudkitchen` (delivery-first kitchen). Their sectors already have a card
   each — Medical & Healthcare took `dental`, Food & Restaurant took
   `restaurant` — so they sit here as the alternates to reach for if either card
   is ever split in two. */
