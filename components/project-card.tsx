import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink, Lock } from "lucide-react";
import { Github } from "./social-icons";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./visuals";

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.slug === "ai-receptionist" && (
        <Link className="text-link primary" href="/#contact">
          Request Demo Access <span aria-hidden="true">→</span>
        </Link>
      )}
      {project.demo && (
        <a
          className="text-link primary"
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={14} aria-hidden="true" /> Visit Live Site
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {project.video && (
        <Link
          className="text-link"
          href={`/projects/${project.slug}#demo-video`}
        >
          Watch Demo
        </Link>
      )}
      {project.github && !project.privateRepo && (
        <a
          className="text-link"
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={14} aria-hidden="true" /> GitHub Repository
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {project.demo && project.slug === "ai-receptionist" && (
        <span className="demo-access">
          <Lock size={12} aria-hidden="true" /> Approved access required.
        </span>
      )}
      {project.demo && project.slug === "design-review-client-feedback" && (
        <span className="demo-access">
          <Lock size={12} aria-hidden="true" /> Sign-in required to view
          projects.
        </span>
      )}
    </>
  );
}

/** Short archive card: the whole card links to the full project page. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="workcard compact-project spot">
      <Link
        className="compact-project-link"
        href={`/projects/${project.slug}`}
        aria-label={`View details for ${project.name}`}
      >
        <div className="card-media">
          <ProjectVisual
            project={project}
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        </div>
        <div className="compact-project-body">
          <div className="workmeta">
            <span>{project.categories[0]}</span>
            {project.status === "In Progress" ? (
              <span className="progress-status">In Progress</span>
            ) : (
              <span className="muted">{project.context}</span>
            )}
          </div>
          <h3>{project.name}</h3>
          <p>{project.teaser || project.summary}</p>
          <div className="tags">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
            {project.stack.length > 3 && (
              <span>+{project.stack.length - 3}</span>
            )}
          </div>
          <span className="compact-details">
            View project <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
      </Link>
      {project.video && (
        <Link className="compact-watch-demo" href={`/projects/${project.slug}#demo-video`}>
          Watch Demo <ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}

/** Large home-page showcase row for featured work. */
export function FeaturedProject({
  project,
  number,
}: {
  project: Project;
  number: number;
}) {
  const href = `/projects/${project.slug}`;
  return (
    <article className="feature spot">
      <Link
        className="feature-media"
        href={href}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="browser-bar">
          <i />
          <i />
          <i />
          <span>{project.slug}</span>
        </div>
        <ProjectVisual
          project={project}
          sizes="(max-width: 900px) 100vw, 55vw"
        />
      </Link>
      <div className="feature-body">
        <div className="feature-meta">
          <span className="feature-num">{String(number).padStart(2, "0")}</span>
          <span>{project.categories.join(" · ")}</span>
          <span>{project.context}</span>
        </div>
        <h3>
          <Link href={href}>{project.name}</Link>
        </h3>
        {project.subtitle && <p className="feature-sub">{project.subtitle}</p>}
        <p>{project.summary}</p>
        <div className="tags">
          {project.stack.slice(0, 6).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="feature-actions">
          <Link className="btn ghost" href={href}>
            View case study <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          {project.video && (
            <Link className="btn ghost" href={`${href}#demo-video`}>
              Watch Demo <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
