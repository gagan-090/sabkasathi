/*
  The one place the business's name, address and phone (NAP) is written down.

  NAP consistency is a ranking input for local search: Google cross-checks the
  address on the site against directories, and a footer that disagrees with the
  schema — or with the page it sits on — dilutes the entity. Before this file,
  the address existed as a "TODO" placeholder in lib/localSeo.ts while
  layout.tsx separately asserted a Patna HQ, so the two disagreed. Everything
  now reads from here.

  Import freely from server components. It is plain data with no dependencies,
  so it is safe in client components too.
*/

export const business = {
  legalName: "Sabka Saathi Digital Services",
  shortName: "Sabka Saathi",

  /* Address, split into the parts schema.org/PostalAddress wants. `full` is
     the single-line form for display; the parts are what structured data and
     directory submissions need to match on. */
  address: {
    street: "Bypass Road, Maharani Puram",
    locality: "Sheikhpura",
    region: "Bihar",
    postalCode: "811105",
    country: "India",
    countryCode: "IN",
    full: "Bypass Road, Maharani Puram, Sheikhpura – 811105, Bihar, India",
    /* Multi-line form for the footer and contact blocks. */
    lines: ["Bypass Road, Maharani Puram", "Sheikhpura – 811105", "Bihar, India"],
  },

  /* Town-centre coordinates for Sheikhpura, not a surveyed rooftop position.
     Precise enough for geo meta tags and a GeoCoordinates node; do not present
     it as a pin-drop on a map. */
  geo: { latitude: "25.1394", longitude: "85.8508" },

  phone: {
    /** Display form. */
    display: "+91 94316 73018",
    /** E.164, for tel: links and schema. */
    e164: "+919431673018",
    /** Bare digits, as the client gives the number out locally. */
    local: "9431673018",
    /** wa.me wants the number with country code and no punctuation. */
    whatsapp: "919431673018",
  },

  email: "helpsabkasaathi@gmail.com",

  hours: {
    /** Human-readable, for the footer and contact blocks. */
    display: "8:00 AM – 9:00 PM, Monday – Sunday",
    short: "8 AM – 9 PM, all days",
    /** schema.org OpeningHoursSpecification form. */
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "21:00",
  },

  gstin: "10LAHPK8872L1Z3",
  founderName: "Ashish Kumar",
  siteUrl: "https://sabkasaathidigitalservices.com",
} as const;

/*
  The default share card, for pages that declare their own `openGraph` block.

  Next.js overwrites metadata fields rather than deep-merging them, so a page
  that sets `openGraph: { title, description, url }` drops the image the root
  app/opengraph-image.tsx would otherwise have contributed — and ships an
  og:image-less page that WhatsApp and LinkedIn preview as a bare text link.
  Spreading this into each such block puts the card back.

  A co-located opengraph-image.tsx (as app/[slug] has) still wins for its own
  segment; this is only the fallback for segments without one.
*/
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Sabka Saathi — Software Development Company in India",
} as const;

/** `tel:` href for the office line. */
export const telHref = `tel:${business.phone.e164}`;

/** `mailto:` href for the office inbox. */
export const mailHref = `mailto:${business.email}`;

/** WhatsApp deep link, optionally prefilled with a message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${business.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/*
  The PostalAddress node. Shared by every schema graph on the site so the
  address is byte-identical everywhere Google reads it.
*/
export const postalAddressSchema = {
  "@type": "PostalAddress",
  streetAddress: business.address.street,
  addressLocality: business.address.locality,
  addressRegion: business.address.region,
  postalCode: business.address.postalCode,
  addressCountry: business.address.countryCode,
} as const;

/*
  Opening hours as one node covering all seven days — the business keeps the
  same hours every day, so seven separate specifications would say the same
  thing at seven times the size.
*/
export const openingHoursSchema = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: business.hours.days,
  opens: business.hours.opens,
  closes: business.hours.closes,
} as const;

export const geoCoordinatesSchema = {
  "@type": "GeoCoordinates",
  latitude: business.geo.latitude,
  longitude: business.geo.longitude,
} as const;
