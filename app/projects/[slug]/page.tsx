import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { site } from "@/config/site";
import { ProjectVisual } from "@/components/visuals";
import { ProjectLinks } from "@/components/project-card";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.summary,
    ...(site.url
      ? { alternates: { canonical: `${site.url}/projects/${slug}` } }
      : {}),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main-content">
      <section className="wrap case-hero">
        <div>
          <Link className="back" href="/projects">
            ← ALL PROJECTS
          </Link>
          <div className="eyebrow case-eyebrow">
            {String(index + 1).padStart(2, "0")} /{" "}
            {project.categories.join(" + ")} ·{" "}
            {project.status === "In Progress" ? "In progress" : project.context}
          </div>
          <h1>
            {project.name}
            <span className="accent">.</span>
          </h1>
          <p>{project.summary}</p>
          <div className="tags case-tags">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-links">
            <ProjectLinks project={project} />
          </div>
          {project.slug === "ai-receptionist" && (
            <p className="access-note">
              <strong>Approved access required.</strong> This is a website
              assistant with voice input and reply read-aloud—not a telephone
              calling service.
            </p>
          )}
        </div>
        <ProjectVisual project={project} priority />
      </section>
      <div className="wrap case-facts">
        <div>
          <small>PROJECT TYPE</small>
          <strong>
            {project.categories.join(" / ")}
            {project.professional && " · Professional project"}
          </strong>
        </div>
        <div>
          <small>STATUS / CONTEXT</small>
          <strong>
            {project.status} · {project.context}
          </strong>
        </div>
        <div>
          <small>STACK</small>
          <strong>{project.stack.join(" · ")}</strong>
        </div>
      </div>
      <section className="wrap case-body">
        <div>
          <span className="eyebrow">PROJECT BREAKDOWN</span>
          <h2>The thinking behind the build.</h2>
        </div>
        <div>
          <h3>The problem</h3>
          <p>{project.problem}</p>
          <h3>What I implemented</h3>
          <p>{project.solution}</p>
          <h3>
            {project.status === "In Progress"
              ? "Planned features"
              : "Key features"}
          </h3>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <h3>Implementation notes</h3>
          <p>
            {project.challenges ||
              "Detailed implementation notes will be added with the project write-up."}
          </p>
          <h3>What I learned</h3>
          <p>
            {project.learned ||
              "Personal reflections will be added with the complete project write-up."}
          </p>
          <h3>Project visuals</h3>
          {project.screenshots.length ? (
            <div className="screenshots">
              {project.screenshots.map((screenshot) => (
                <Image
                  key={screenshot.src}
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1200}
                  height={750}
                  sizes="(max-width: 760px) 90vw, 60vw"
                />
              ))}
            </div>
          ) : (
            <ProjectVisual project={project} />
          )}
          <p className="placeholder-note">
            {!project.image &&
              "The interface shown is an illustrative preview based on confirmed project features, not a real product screenshot. "}
            {project.privateRepo &&
              "The professional project repository is private. "}
            {!project.demo && "A verified live demo URL has not been provided."}
          </p>
          <Link className="btn secondary" href="/projects">
            ← More projects
          </Link>
        </div>
      </section>
      <nav className="wrap project-pagination" aria-label="Project navigation">
        <Link href={`/projects/${previous.slug}`}>
          <small>← PREVIOUS PROJECT</small>
          <span>{previous.name}</span>
        </Link>
        <Link href={`/projects/${next.slug}`}>
          <small>NEXT PROJECT →</small>
          <span>{next.name}</span>
        </Link>
      </nav>
    </main>
  );
}
