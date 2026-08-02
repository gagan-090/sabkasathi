"use client";

import type { Project } from "@/lib/project";
import { GenericApp } from "./GenericApp";
import { GravityPointApp } from "./GravityPointApp";
import { PhulwariApp } from "./PhulwariApp";
import { SmartEdgeApp } from "./SmartEdgeApp";

/*
  Picks the app that runs inside a phone frame in PortfolioShowcase.

  These used to be <iframe>s of the clients' live sites: three third-party
  pages booting inside our home page, each with its own fonts, analytics and
  hero images, and a "Loading Demo…" spinner on every card until they did.
  Each one is now a real React app built from that client's own content — and
  each is a different app, with its own navigation model, shape language and
  type, because three phones running the same template is a template, not a
  portfolio.

  Keying on hostname rather than the Firestore document id means renaming or
  re-adding a project in the admin panel keeps its app.
*/

const REGISTRY: Record<string, (props: { active: boolean }) => React.JSX.Element> = {
  "phulwari.co.in": PhulwariApp,
  "smartedgeeducationconsultancy.com": SmartEdgeApp,
  "gravitypointtutorial.com": GravityPointApp,
};

/** `https://www.phulwari.co.in/` → `phulwari.co.in`. Invalid URLs give "". */
function hostKey(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function AppScreen({
  project,
  /** False until the card has been scrolled into the carousel — holds the
      counters and intro animations until someone can see them run. */
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const App = REGISTRY[hostKey(project.url)];
  return App ? <App active={active} /> : <GenericApp project={project} active={active} />;
}
