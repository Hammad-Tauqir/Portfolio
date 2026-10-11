import type { Metadata } from "next";
import { site } from "@/config/site";
import { ProjectGrid } from "@/components/project-grid";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore full-stack applications, frontend experiences, mobile projects and AI automation workflows by Hammad Tauqir.",
  openGraph: {
    title: "Projects | Hammad Tauqir",
    description: "Explore the thinking and technology behind each project.",
  },
  ...(site.url ? { alternates: { canonical: `${site.url}/projects` } } : {}),
};
export default function ProjectsPage() {
  return (
    <main id="main-content">
      <section className="wrap page-head">
        <span className="eyebrow">SELECTED PROJECTS / THE COLLECTION</span>
        <h1>
          Work that speaks
          <br />
          for itself<span className="accent">.</span>
        </h1>
        <p>
          From product interfaces and full-stack applications to emerging
          automation workflows. Explore the thinking and technology behind each
          piece.
        </p>
      </section>
      <section className="wrap all-projects" aria-label="Projects">
        <ProjectGrid />
      </section>
    </main>
  );
}
