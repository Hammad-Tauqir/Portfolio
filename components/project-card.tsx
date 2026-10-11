import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Github } from "./social-icons";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./visuals";
export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.demo && (
        <a
          className="text-link"
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={14} aria-hidden="true" /> Live Demo
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
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
    </>
  );
}
export function ProjectCard({
  project,
  number,
}: {
  project: Project;
  number: number;
}) {
  return (
    <article className="workcard">
      <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true">
        <ProjectVisual project={project} />
      </Link>
      <div className="workbody">
        <div className="workmeta">
          <span>
            {String(number).padStart(2, "0")} / {project.categories[0]}
          </span>
          <span
            className={
              project.status === "In Progress" ? "progress-status" : "muted"
            }
          >
            {project.status === "In Progress" ? "In Progress" : project.context}
          </span>
        </div>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>
        <p>{project.summary}</p>
        <div className="tags">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="workarrow">
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`View details for ${project.name}`}
          >
            View case study ↗
          </Link>
          {project.featured && <span className="featured-label">Featured</span>}
        </div>
        {(project.demo || (project.github && !project.privateRepo)) && (
          <div className="project-links">
            <ProjectLinks project={project} />
          </div>
        )}
      </div>
    </article>
  );
}
