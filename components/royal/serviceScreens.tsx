/* Which real app screen stands in for each of the eight service lines.

   The home page shows these in two places — one phone inside every service
   card, and the three-phone showcase directly under the grid — so the mapping
   lives here rather than in either component. Both read the same trio, which
   is what makes the card and the showcase agree: tap "E-commerce" in the
   showcase and you get the screen you already saw on the E-commerce card.

   `index` is the same string SERVICES uses in data.tsx. It is the join key
   between the two files; adding a service without adding its screens here
   simply leaves that card with no phone rather than breaking the page.

   Every trio is a distinct set. There are six apps and three screens each —
   eighteen screens for twenty-four slots — so the last two services, which
   are not app-shaped to begin with (SEO, marketing), draw one screen from
   three different apps instead. That reads as "many businesses, one service",
   which is closer to what those two actually deliver anyway.

   These are JSX elements, not components, on purpose: they are inert
   descriptors until something renders them, and the showcase only ever
   renders one trio at a time. */

import type { ReactNode } from "react";

import { BusinessApp } from "@/components/mockups/BusinessApp";
import { EducationApp } from "@/components/mockups/EducationApp";
import { FashionApp } from "@/components/mockups/FashionApp";
import { FoodDeliveryApp } from "@/components/mockups/FoodDeliveryApp";
import { GroceryApp } from "@/components/mockups/GroceryApp";
import { HomeServiceApp } from "@/components/mockups/HomeServiceApp";

export type ServiceScreens = {
  /** Matches `Service["index"]` in data.tsx. */
  index: string;
  /** Short label for the showcase tab — the card already carries the title. */
  tab: string;
  /** What the phones are actually showing, named for a non-technical reader. */
  caption: string;
  features: string[];
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
};

export const SERVICE_SCREENS: ServiceScreens[] = [
  {
    index: "01",
    tab: "Websites",
    caption: "A storefront that renders on the server and still feels like an app.",
    features: ["SSR & SEO ready", "Deals of the day", "Payment gateway", "Core Web Vitals green"],
    left: <BusinessApp screen="deals" />,
    center: <BusinessApp screen="home" />,
    right: <BusinessApp screen="product" />,
  },
  {
    index: "02",
    tab: "Mobile apps",
    caption: "One Flutter codebase, both stores, live order state throughout.",
    features: ["One codebase, two stores", "Live order tracking", "Push notifications", "Crash reporting"],
    left: <FoodDeliveryApp screen="restaurant" />,
    center: <FoodDeliveryApp screen="home" />,
    right: <FoodDeliveryApp screen="menu" />,
  },
  {
    index: "03",
    tab: "Custom software",
    caption: "The booking, dispatch and staff side of a service business.",
    features: ["Time-slot booking", "Staff dispatch board", "Role-based access", "Automated reports"],
    left: <HomeServiceApp screen="booking" />,
    center: <HomeServiceApp screen="home" />,
    right: <HomeServiceApp screen="profile" />,
  },
  {
    index: "04",
    tab: "E-commerce",
    caption: "Catalogue, cart and checkout with the stock ledger behind them.",
    features: ["8-minute delivery promise", "Cart & checkout", "UPI and card payments", "Live inventory sync"],
    left: <GroceryApp screen="category" />,
    center: <GroceryApp screen="home" />,
    right: <GroceryApp screen="cart" />,
  },
  {
    index: "05",
    tab: "UI/UX design",
    caption: "The clickable prototype, signed off before any of it was built.",
    features: ["Clickable prototypes", "Shared design system", "Category stories", "Wishlist & cart sync"],
    left: <FashionApp screen="category" />,
    center: <FashionApp screen="home" />,
    right: <FashionApp screen="product" />,
  },
  {
    index: "06",
    tab: "Cloud & DevOps",
    caption: "Live video and thousands of concurrent students, unattended.",
    features: ["Streaming at scale", "CI/CD pipelines", "Uptime monitoring", "Auto-scaling"],
    left: <EducationApp screen="live" />,
    center: <EducationApp screen="home" />,
    right: <EducationApp screen="course" />,
  },
  {
    index: "07",
    tab: "SEO",
    caption: "Three local businesses, each found on its own city search.",
    features: ["Local business pages", "Schema & rich results", "Category landing pages", "Rank tracking"],
    left: <FoodDeliveryApp screen="restaurant" />,
    center: <HomeServiceApp screen="home" />,
    right: <GroceryApp screen="category" />,
  },
  {
    index: "08",
    tab: "Digital marketing",
    caption: "Where the ad spend actually lands — offer, product, enrolment.",
    features: ["Campaign landing pages", "Offer & deal banners", "Funnel analytics", "Retargeting ready"],
    left: <FashionApp screen="product" />,
    center: <BusinessApp screen="deals" />,
    right: <EducationApp screen="course" />,
  },
];

/** Lookup by the `index` string SERVICES cards carry. */
export const SCREENS_BY_INDEX: Record<string, ServiceScreens> = Object.fromEntries(
  SERVICE_SCREENS.map((s) => [s.index, s]),
);
