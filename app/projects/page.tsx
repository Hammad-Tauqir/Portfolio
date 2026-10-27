import type { Metadata } from "next";
import { site } from "@/config/site";
import { ProjectGrid } from "@/components/project-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore full-stack applications, business websites, and automation work by Hammad Tauqir.",
  ...(site.url ? { alternates: { canonical: `${site.url}/projects` } } : {}),
};

export default function ProjectsPage() {
  return (
    <main id="main-content">
      <section className="wrap page-head">
        <span className="page-glow" aria-hidden="true" />
        <span className="eyebrow">PROJECTS / SELECTED BUILDS</span>
        <h1>
          Explore the
          <br />
          <span className="gradient-text">projects.</span>
        </h1>
        <p>
          Browse the work below. Open any project for the problem, what I built,
          technologies, and available screenshots or demos.
        </p>
      </section>
      <section className="wrap all-projects" aria-label="Projects">
        <ProjectGrid />
      </section>
    </main>
  );
}
