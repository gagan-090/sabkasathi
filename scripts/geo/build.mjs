/*
  Regenerates lib/geo.ts.

  Inputs:
    - lib/geo.ts itself (the current town universe — 5,892 entries built in an
      earlier pass and already indexed, so nothing here may drop a town)
    - scripts/geo/districts.txt (district → town assignment supplied by the
      business owner)

  Output: lib/geo.ts, with every town filed under a real district.

  Nine states used to carry their towns as one ungrouped `flat: true` list
  because nobody knew which district each town belonged to. The town pages
  under /location/<state>/<district>/<town> need that assignment to exist, so
  this merges the owner's district data in and reports anything left over.

  Run:  node scripts/geo/build.mjs [--check]
        --check prints the diff and writes nothing.
*/

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const GEO_PATH = join(root, "lib", "geo.ts");
const SRC_PATH = join(here, "districts.txt");

/* ── slugs ───────────────────────────────────────────────────────────────── */

/* Must match the slugs already published in lib/geo.ts, so this is the same
   transform the earlier generator used: lowercase, strip anything that is not
   a letter/number, collapse runs to a single hyphen. */
export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[&]/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ── parse the existing lib/geo.ts ───────────────────────────────────────── */

function parseGeo(source) {
  const states = [];
  const stateRe =
    /\{ state: "([^"]+)", slug: "([^"]+)", districts: \[\n([\s\S]*?)\n  \] \},/g;

  let m;
  while ((m = stateRe.exec(source))) {
    const [, state, slug, body] = m;
    const districts = [];
    const districtRe =
      /\{ name: "([^"]+)", slug: "([^"]+)",(?: flat: (true),)? towns: \[([^\]]*)\] \}/g;
    let d;
    while ((d = districtRe.exec(body))) {
      const [, name, dSlug, flat, townsBody] = d;
      const towns = [];
      const townRe = /\{ name: "([^"]+)", slug: "([^"]+)" \}/g;
      let t;
      while ((t = townRe.exec(townsBody))) {
        towns.push({ name: t[1], slug: t[2] });
      }
      districts.push({ name, slug: dSlug, flat: Boolean(flat), towns });
    }
    states.push({ state, slug, districts });
  }
  return states;
}

/* ── parse scripts/geo/districts.txt ─────────────────────────────────────── */

/* A state may appear more than once — the supplementary section at the end of
   districts.txt reopens states to add districts the original list skipped, and
   to file towns that were already in lib/geo.ts but had no district. Repeated
   blocks merge; a repeated district appends to the one already there. */
function parseSource(text) {
  const byState = new Map();
  let current = null;

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    if (line.startsWith("@")) {
      const name = line.slice(1).trim();
      if (!byState.has(name)) byState.set(name, { state: name, districts: [] });
      current = byState.get(name);
      continue;
    }

    const [namePart, townsPart] = line.split("|");
    if (!townsPart) throw new Error(`Malformed district line: ${line}`);
    if (!current) throw new Error(`District line before any @state: ${line}`);

    const name = namePart.trim();
    const towns = townsPart
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const existing = current.districts.find((d) => d.name === name);
    if (existing) existing.towns.push(...towns);
    else current.districts.push({ name, towns });
  }
  return [...byState.values()];
}

/* ── merge ───────────────────────────────────────────────────────────────── */

/*
  A town name in districts.txt may carry a trailing district or state word —
  "Patna Chhattisgarh", "Shahpur Betul" — written there to keep two same-named
  towns apart while transcribing. It is *not* part of the town's name and is
  stripped here.

  Uniqueness is then re-established mechanically: within a state the first town
  to claim a slug keeps the plain one, and any later town of the same name gets
  its district appended (`shahpur`, then `shahpur-kangra`). Doing it this way
  rather than by hand matters because lib/geo.ts already publishes the plain
  slugs — hand-suffixing every occurrence would have minted `adampur-jalandhar`
  as a new URL and orphaned the `adampur` that is already indexed.
*/
function displayName(raw) {
  const cut = raw.indexOf("~");
  return (cut === -1 ? raw : raw.slice(0, cut)).trim();
}

/* districts.txt spells states the way people write them; lib/geo.ts slugs were
   fixed months ago and are in the sitemap. Map across rather than renaming
   either side. */
const STATE_SLUG_ALIASES = {
  "jammu-and-kashmir": "jammu-kashmir",
  "andaman-and-nicobar-islands": "andaman-nicobar",
};

function merge({ geo, source, report }) {
  const sourceByState = new Map(
    source.map((s) => {
      const slug = slugify(s.state);
      return [STATE_SLUG_ALIASES[slug] ?? slug, s];
    })
  );
  const out = [];

  for (const state of geo) {
    const src = sourceByState.get(state.slug);
    if (!src) {
      out.push(state);
      continue;
    }

    /* Every town the state already publishes, by slug. Nothing here may be
       lost — these slugs are already in the sitemap. */
    const existing = new Map();
    for (const d of state.districts) {
      for (const t of d.towns) if (!existing.has(t.slug)) existing.set(t.slug, t);
    }

    const claimed = new Set();
    const districts = [];

    for (const d of src.districts) {
      const dSlug = slugify(d.name);
      const towns = [];
      for (const raw of d.towns) {
        const name = displayName(raw);
        const base = slugify(name);
        /* Same name, different town: fall back to name-district. Only the
           second and later claimants are suffixed, so the slug already in the
           sitemap keeps pointing at the same place. */
        const slug = claimed.has(base) ? `${base}-${dSlug}` : base;
        if (claimed.has(slug)) continue; // genuine duplicate line — drop it
        claimed.add(slug);
        towns.push({ name, slug });
      }
      if (towns.length) districts.push({ name: displayName(d.name), slug: dSlug, towns });
    }

    /* Towns that were already published but which the owner's data does not
       place in any district. They keep their existing district when the state
       had one; a state that was flat has nowhere to put them, so they are
       reported and left in a flat group — visible on the state hub as before,
       but without a town page, because inventing a district for them would
       put a factual error on a public page. */
    const leftovers = [];
    for (const [slug, town] of existing) {
      if (!claimed.has(slug)) leftovers.push(town);
    }

    if (leftovers.length) {
      const wasFlat = state.districts.every((d) => d.flat);
      if (wasFlat) {
        districts.push({
          name: state.state,
          slug: state.slug,
          flat: true,
          towns: leftovers,
        });
      } else {
        /* Keep them under the district they already had. */
        for (const d of state.districts) {
          const keep = d.towns.filter((t) => leftovers.some((l) => l.slug === t.slug));
          if (!keep.length) continue;
          const target = districts.find((x) => x.slug === d.slug);
          if (target) target.towns.push(...keep);
          else districts.push({ name: d.name, slug: d.slug, flat: d.flat, towns: keep });
        }
      }
    }

    const added = [...claimed].filter((s) => !existing.has(s)).length;
    report.push({
      state: state.state,
      before: existing.size,
      after: districts.reduce((n, d) => n + d.towns.length, 0),
      districts: districts.filter((d) => !d.flat).length,
      added,
      unplaced: leftovers.length,
    });

    out.push({ state: state.state, slug: state.slug, districts });
  }
  return out;
}

/* ── emit ────────────────────────────────────────────────────────────────── */

function emit(states) {
  const header = `/* GENERATED — see scripts/geo/build.mjs. Do not hand-edit town lists;
   edit scripts/geo/districts.txt and re-run the build instead. Server-only:
   importing this into a client component would ship every town name in India
   to the browser. */

export interface GeoTown { name: string; slug: string }
/** \`flat\` marks a single ungrouped town list standing in for a state whose
 *  towns are not yet assigned to districts — a rendering hint, not a district.
 *  Towns in a flat group are listed on the state hub but have no town page,
 *  because a town page's URL needs a district it can be filed under. */
export interface GeoDistrict { name: string; slug: string; towns: GeoTown[]; flat?: boolean }
export interface GeoState { state: string; slug: string; districts: GeoDistrict[] }

export const GEO: GeoState[] = [
`;

  const body = states
    .map((s) => {
      const districts = s.districts
        .map((d) => {
          const towns = d.towns
            .map((t) => `{ name: ${JSON.stringify(t.name)}, slug: ${JSON.stringify(t.slug)} }`)
            .join(", ");
          const flat = d.flat ? " flat: true," : "";
          return `    { name: ${JSON.stringify(d.name)}, slug: ${JSON.stringify(d.slug)},${flat} towns: [${towns}] },`;
        })
        .join("\n");
      return `  { state: ${JSON.stringify(s.state)}, slug: ${JSON.stringify(s.slug)}, districts: [\n${districts}\n  ] },`;
    })
    .join("\n");

  const footer = `
];

export const GEO_BY_STATE: Record<string, GeoState> =
  Object.fromEntries(GEO.map((s) => [s.slug, s]));

/** Every town that has a district, and therefore a page. Flat groups are
 *  excluded: they are listed on their state hub but have no URL of their own. */
export const GEO_PLACED_TOWNS: { state: GeoState; district: GeoDistrict; town: GeoTown }[] =
  GEO.flatMap((state) =>
    state.districts
      .filter((d) => !d.flat)
      .flatMap((district) => district.towns.map((town) => ({ state, district, town })))
  );

export const geoStats = {
  stateCount: GEO.length,
  districtCount: GEO.reduce((n, s) => n + s.districts.filter((d) => !d.flat).length, 0),
  townCount: GEO.reduce((n, s) => n + s.districts.reduce((m, d) => m + d.towns.length, 0), 0),
  placedTownCount: GEO_PLACED_TOWNS.length,
};
`;

  return header + body + footer;
}

/* ── run ─────────────────────────────────────────────────────────────────── */

const geo = parseGeo(readFileSync(GEO_PATH, "utf8"));
const source = parseSource(readFileSync(SRC_PATH, "utf8"));
const report = [];
const merged = merge({ geo, source, report });

const pad = (v, n) => String(v).padStart(n);
console.log("state                          before  after  districts  added  unplaced");
for (const r of report) {
  console.log(
    `${r.state.padEnd(30)}${pad(r.before, 6)}${pad(r.after, 7)}${pad(r.districts, 11)}${pad(r.added, 7)}${pad(r.unplaced, 10)}`
  );
}

const totals = merged.reduce(
  (acc, s) => {
    for (const d of s.districts) {
      if (!d.flat) acc.districts += 1;
      acc.towns += d.towns.length;
      if (d.flat) acc.unplaced += d.towns.length;
    }
    return acc;
  },
  { districts: 0, towns: 0, unplaced: 0 }
);
console.log(
  `\nTOTAL  states=${merged.length}  districts=${totals.districts}  towns=${totals.towns}  with-pages=${totals.towns - totals.unplaced}  flat-only=${totals.unplaced}`
);

if (!process.argv.includes("--check")) {
  writeFileSync(GEO_PATH, emit(merged));
  console.log(`\nwrote ${GEO_PATH}`);
} else {
  console.log("\n--check: nothing written");
}

/* --unplaced: print every town left without a district, so the gaps in
   scripts/geo/districts.txt can be closed by hand. */
if (process.argv.includes("--unplaced")) {
  for (const s of merged) {
    const flat = s.districts.filter((d) => d.flat).flatMap((d) => d.towns);
    if (!flat.length) continue;
    console.log(`\n### ${s.state} (${flat.length})`);
    console.log(flat.map((t) => t.name).join(", "));
  }
}
