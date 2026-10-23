import type { Metadata } from "next";
import { site } from "@/config/site";
import { ProjectGrid } from "@/components/project-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore full-stack applications, business websites, and AI automation work by Hammad Tauqir.",
  ...(site.url ? { alternates: { canonical: `${site.url}/projects` } } : {}),
};

export default function ProjectsPage() {
  return (
    <main id="main-content">
      <section className="wrap page-head">
        <span className="eyebrow">PROJECT ARCHIVE / SELECTED BUILDS</span>
        <h1>
          Work built around
          <br />
          <span className="accent">real needs.</span>
        </h1>
        <p>
          Full-stack products, conversion-focused web experiences, and
          automation workflows—each with the problem, approach, and
          implementation kept clear.
        </p>
      </section>
      <section className="wrap all-projects" aria-label="Projects">
        <ProjectGrid />
      </section>
    </main>
  );
}
