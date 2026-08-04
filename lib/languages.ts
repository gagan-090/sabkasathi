/**
 * The languages the chat assistant offers.
 *
 * English plus the 22 scheduled languages of India, then the widely-spoken
 * regional languages a visitor from Bihar, UP, Jharkhand or the North-East is
 * actually likely to pick. Each entry carries its endonym (the name in its own
 * script) because that is what a speaker recognises in a list — the English
 * name is the secondary label.
 *
 * `tier` records how well a general-purpose model writes the language, and the
 * widget uses it to set expectations rather than to hide anything:
 *   "full"    — the model writes it fluently
 *   "partial" — usable, but expect stiffness or occasional English fallback
 * Nothing is removed from the list; a visitor may always pick their own.
 */

export interface Language {
  /** BCP-47 / ISO 639 code where one exists, else a stable slug. */
  code: string;
  /** Name in the language's own script. */
  native: string;
  /** Name in English. */
  english: string;
  /** Script the reply should be written in. */
  script: string;
  tier: "full" | "partial";
  /** Surfaced on the first screen without opening the full list. */
  popular?: boolean;
}

export const LANGUAGES: Language[] = [
  // ── The ones most visitors reach for ─────────────────────────────────────
  { code: "en", native: "English", english: "English", script: "Latin", tier: "full", popular: true },
  { code: "hi-en", native: "Hinglish", english: "Hindi + English mix", script: "Latin", tier: "full", popular: true },
  { code: "hi", native: "हिन्दी", english: "Hindi", script: "Devanagari", tier: "full", popular: true },
  { code: "bn", native: "বাংলা", english: "Bengali", script: "Bengali", tier: "full", popular: true },
  { code: "mr", native: "मराठी", english: "Marathi", script: "Devanagari", tier: "full", popular: true },
  { code: "te", native: "తెలుగు", english: "Telugu", script: "Telugu", tier: "full", popular: true },
  { code: "ta", native: "தமிழ்", english: "Tamil", script: "Tamil", tier: "full", popular: true },
  { code: "gu", native: "ગુજરાતી", english: "Gujarati", script: "Gujarati", tier: "full", popular: true },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada", script: "Kannada", tier: "full", popular: true },
  { code: "ml", native: "മലയാളം", english: "Malayalam", script: "Malayalam", tier: "full", popular: true },
  { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi", script: "Gurmukhi", tier: "full", popular: true },
  { code: "or", native: "ଓଡ଼ିଆ", english: "Odia", script: "Odia", tier: "full", popular: true },

  // ── Remaining scheduled languages ────────────────────────────────────────
  { code: "ur", native: "اردو", english: "Urdu", script: "Nastaliq", tier: "full" },
  { code: "as", native: "অসমীয়া", english: "Assamese", script: "Assamese", tier: "full" },
  { code: "mai", native: "मैथिली", english: "Maithili", script: "Devanagari", tier: "full" },
  { code: "ne", native: "नेपाली", english: "Nepali", script: "Devanagari", tier: "full" },
  { code: "sa", native: "संस्कृतम्", english: "Sanskrit", script: "Devanagari", tier: "full" },
  { code: "kok", native: "कोंकणी", english: "Konkani", script: "Devanagari", tier: "partial" },
  { code: "sd", native: "سنڌي", english: "Sindhi", script: "Arabic", tier: "partial" },
  { code: "ks", native: "کٲشُر", english: "Kashmiri", script: "Perso-Arabic", tier: "partial" },
  { code: "doi", native: "डोगरी", english: "Dogri", script: "Devanagari", tier: "partial" },
  { code: "brx", native: "बड़ो", english: "Bodo", script: "Devanagari", tier: "partial" },
  { code: "mni", native: "মৈতৈলোন্", english: "Manipuri (Meitei)", script: "Bengali/Meitei", tier: "partial" },
  { code: "sat", native: "ᱥᱟᱱᱛᱟᱲᱤ", english: "Santali", script: "Ol Chiki", tier: "partial" },

  // ── Hindi-belt regional languages ────────────────────────────────────────
  { code: "bho", native: "भोजपुरी", english: "Bhojpuri", script: "Devanagari", tier: "full" },
  { code: "mag", native: "मगही", english: "Magahi", script: "Devanagari", tier: "partial" },
  { code: "anp", native: "अंगिका", english: "Angika", script: "Devanagari", tier: "partial" },
  { code: "bjj", native: "बज्जिका", english: "Bajjika", script: "Devanagari", tier: "partial" },
  { code: "awa", native: "अवधी", english: "Awadhi", script: "Devanagari", tier: "partial" },
  { code: "bra", native: "ब्रजभाषा", english: "Braj", script: "Devanagari", tier: "partial" },
  { code: "bns", native: "बुंदेली", english: "Bundeli", script: "Devanagari", tier: "partial" },
  { code: "hne", native: "छत्तीसगढ़ी", english: "Chhattisgarhi", script: "Devanagari", tier: "partial" },
  { code: "bgc", native: "हरियाणवी", english: "Haryanvi", script: "Devanagari", tier: "partial" },
  { code: "raj", native: "राजस्थानी", english: "Rajasthani", script: "Devanagari", tier: "partial" },
  { code: "mwr", native: "मारवाड़ी", english: "Marwari", script: "Devanagari", tier: "partial" },
  { code: "gbm", native: "गढ़वळी", english: "Garhwali", script: "Devanagari", tier: "partial" },
  { code: "kfy", native: "कुमाऊँनी", english: "Kumaoni", script: "Devanagari", tier: "partial" },
  { code: "him", native: "पहाड़ी", english: "Himachali (Pahari)", script: "Devanagari", tier: "partial" },
  { code: "kfr", native: "કચ્છી", english: "Kutchi", script: "Gujarati", tier: "partial" },
  { code: "dcc", native: "دکنی", english: "Deccani", script: "Perso-Arabic", tier: "partial" },

  // ── Jharkhand, Odisha & central India ────────────────────────────────────
  { code: "kho", native: "खोरठा", english: "Khortha", script: "Devanagari", tier: "partial" },
  { code: "kyw", native: "कुड़माली", english: "Kurmali", script: "Devanagari", tier: "partial" },
  { code: "sck", native: "नागपुरी", english: "Nagpuri (Sadri)", script: "Devanagari", tier: "partial" },
  { code: "kru", native: "कुड़ुख़", english: "Kurukh", script: "Devanagari", tier: "partial" },
  { code: "unr", native: "मुंडारी", english: "Mundari", script: "Devanagari", tier: "partial" },
  { code: "hoc", native: "हो", english: "Ho", script: "Devanagari", tier: "partial" },
  { code: "gon", native: "गोंडी", english: "Gondi", script: "Devanagari", tier: "partial" },
  { code: "bhb", native: "भीली", english: "Bhili", script: "Devanagari", tier: "partial" },
  { code: "spv", native: "ସମ୍ବଲପୁରୀ", english: "Sambalpuri (Kosli)", script: "Odia", tier: "partial" },

  // ── South & West ─────────────────────────────────────────────────────────
  { code: "tcy", native: "ತುಳು", english: "Tulu", script: "Kannada", tier: "partial" },
  { code: "kfa", native: "ಕೊಡವ", english: "Kodava", script: "Kannada", tier: "partial" },
  { code: "lmn", native: "लंबाडी", english: "Lambadi (Banjara)", script: "Devanagari", tier: "partial" },

  // ── North-East ───────────────────────────────────────────────────────────
  { code: "kha", native: "Khasi", english: "Khasi", script: "Latin", tier: "partial" },
  { code: "grt", native: "A·chik", english: "Garo", script: "Latin", tier: "partial" },
  { code: "lus", native: "Mizo ṭawng", english: "Mizo", script: "Latin", tier: "partial" },
  { code: "nag", native: "Nagamese", english: "Nagamese", script: "Latin", tier: "partial" },
  { code: "trp", native: "Kokborok", english: "Kokborok", script: "Latin", tier: "partial" },
];

export const POPULAR_LANGUAGES = LANGUAGES.filter((l) => l.popular);

export function findLanguage(code: string | null | undefined): Language | undefined {
  if (!code) return undefined;
  return LANGUAGES.find((l) => l.code === code);
}

/**
 * "Choose your language" in a handful of widely-read scripts, cycled on the
 * picker screen. A visitor who reads none of them still sees the English line,
 * and everyone else sees their own script within a few seconds.
 */
export const PICKER_PROMPTS = [
  "Choose your language",
  "अपनी भाषा चुनें",
  "আপনার ভাষা নির্বাচন করুন",
  "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
  "మీ భాషను ఎంచుకోండి",
  "તમારી ભાષા પસંદ કરો",
  "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
  "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
  "ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ",
  "اپنی زبان منتخب کریں",
];

/** English fallbacks used if the model can't produce openers for a language. */
export const FALLBACK_SUGGESTIONS = [
  "What do you build?",
  "How much does it cost?",
  "How long does it take?",
  "Talk to a human",
];

export const FALLBACK_GREETING =
  "Namaste! I'm Saathi from Sabka Saathi Digital Services. Tell me what you'd like to build — a website, an app, or custom software — and I'll walk you through the options, the timeline and the cost.";
