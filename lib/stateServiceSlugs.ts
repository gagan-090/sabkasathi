/*
  Which services get a "<service> company in <state>" page, in its own module
  so both lib/stateServiceSeo.ts (which builds the pages) and lib/stateSeo.ts
  (whose hub links point at them) can read it without importing each other —
  stateServiceSeo already imports PROFILES from stateSeo, so the reverse import
  would be a cycle.

  Not all 33 services are here on purpose. A state-level page for "HRMS payroll
  software in Sikkim" answers a query nobody types, and a thin page is a cost
  rather than free inventory. This is the set with real state-level search:
  the core eight, plus the platform-specific and business-system lines.
*/
export const STATE_SERVICE_SLUGS = [
  "website-development",
  "mobile-app-development",
  "software-development",
  "ui-ux-design",
  "seo-services",
  "digital-marketing",
  "ecommerce-development",
  "cloud-devops",
  "flutter-app-development",
  "android-app-development",
  "ios-app-development",
  "erp-development",
  "crm-development",
  "custom-software-development",
  "it-services",
] as const;

export const isStateServiceSlug = (slug: string): boolean =>
  (STATE_SERVICE_SLUGS as readonly string[]).includes(slug);
