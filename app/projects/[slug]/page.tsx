import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { site } from "@/config/site";
import { ProjectVisual } from "@/components/visuals";
import { ProjectLinks } from "@/components/project-card";
import { AiReceptionistCaseStudy } from "@/components/ai-receptionist-case-study";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.subtitle
      ? `${project.name} — ${project.subtitle}`
      : project.name,
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
        <span className="page-glow" aria-hidden="true" />
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
            <span className="gradient-text">.</span>
          </h1>
          {project.subtitle && (
            <p className="case-subtitle">{project.subtitle}</p>
          )}
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
        <div className="case-visual">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span>
              {project.demo
                ? project.demo.replace(/^https?:\/\//, "").replace(/\/$/, "")
                : project.slug}
            </span>
          </div>
          <ProjectVisual project={project} priority />
        </div>
      </section>
      {project.video && (
        <section className="wrap case-demo" id="demo-video" aria-labelledby="demo-video-title">
          <h2 id="demo-video-title">Watch the demo</h2>
          <video
            aria-label={`${project.name} demo video`}
            controls
            playsInline
            preload="metadata"
            poster={project.videoPoster || project.image}
            width={1920}
            height={1080}
          >
            <source src={project.video} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </section>
      )}
      <div
        className={`wrap case-facts ${project.slug === "ai-receptionist" ? "case-facts-detailed" : ""}`}
      >
        <div>
          <small>PROJECT TYPE</small>
          <strong>
            {project.slug === "ai-receptionist"
              ? "Personal portfolio demo"
              : (project.projectType ?? project.categories.join(" / "))}
            {project.professional &&
              !project.projectType &&
              " · Professional project"}
          </strong>
        </div>
        <div>
          <small>
            {project.slug === "ai-receptionist"
              ? "MY ROLE"
              : "STATUS / CONTEXT"}
          </small>
          <strong>
            {project.slug === "ai-receptionist"
              ? "Full-Stack Development & Automation"
              : (project.statusLabel ??
                `${project.status} · ${project.context}`)}
          </strong>
        </div>
        <div>
          <small>
            {project.slug === "ai-receptionist" ? "CORE TECHNOLOGIES" : "STACK"}
          </small>
          <strong>{project.stack.join(" · ")}</strong>
        </div>
        {project.slug === "ai-receptionist" && (
          <div>
            <small>DEMO ACCESS</small>
            <strong>Invite-only</strong>
          </div>
        )}
      </div>
      <section className="wrap case-body">
        <aside className="case-aside">
          <span className="eyebrow">PROJECT BREAKDOWN</span>
          <h2>
            The thinking behind the{" "}
            <span className="gradient-text">build.</span>
          </h2>
          <p>
            {project.categories.join(" · ")} ·{" "}
            {project.status === "In Progress" ? "In progress" : project.context}
          </p>
        </aside>
        <div className="case-content">
          {project.slug === "ai-receptionist" ? (
            <AiReceptionistCaseStudy />
          ) : (
            <>
              <h3>The problem</h3>
              <p>{project.problem}</p>
              {project.role && (
                <>
                  <h3>My role</h3>
                  <p>{project.role}</p>
                </>
              )}
              <h3>
                {project.professional
                  ? "My contribution"
                  : project.status === "In Progress"
                    ? "Proposed approach"
                    : "What I built"}
              </h3>
              <p>{project.solution}</p>
              <h3>
                {project.role
                  ? "Main contributions"
                  : project.status === "In Progress"
                    ? "Planned features"
                    : "Key features"}
              </h3>
              <ul>
                {project.features.map((feature) => (
                  <li
                    key={typeof feature === "string" ? feature : feature.title}
                  >
                    {typeof feature === "string" ? (
                      feature
                    ) : (
                      <>
                        <strong>{feature.title}.</strong> {feature.description}
                      </>
                    )}
                  </li>
                ))}
              </ul>
              {project.technicalHighlights && (
                <>
                  <h3>Technical highlights</h3>
                  <ul>
                    {project.technicalHighlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </>
              )}
              {project.existingIntegrations && (
                <>
                  <h3>Existing site integrations</h3>
                  <p>{project.existingIntegrations}</p>
                </>
              )}
              {project.outcome && (
                <>
                  <h3>Outcome</h3>
                  <p>{project.outcome}</p>
                </>
              )}
              {project.attribution && (
                <p className="case-attribution">{project.attribution}</p>
              )}
            </>
          )}
          <h3>
            {project.screenshots.length
              ? "Screenshots"
              : project.slug === "concept-science-academy"
                ? "Academy branding"
                : "Interface preview"}
          </h3>
          {project.screenshots.length ? (
            <div className="screenshots">
              {project.screenshots.map((screenshot) => (
                <Image
                  key={screenshot.src}
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width || 1200}
                  height={screenshot.height || 750}
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
            {project.slug === "ai-receptionist" &&
              "Existing local QA screenshot of the actual interface with the backend disconnected and example greeting only. It does not demonstrate a live booking."}
          </p>
          <Link className="btn secondary" href="/projects">
            ← More projects
          </Link>
        </div>
      </section>
      <nav className="wrap project-pagination" aria-label="Project navigation">
        <Link href={`/projects/${previous.slug}`}>
          <small>← PREVIOUS</small>
          <span>{previous.name}</span>
        </Link>
        <Link href={`/projects/${next.slug}`}>
          <small>NEXT →</small>
          <span>{next.name}</span>
        </Link>
      </nav>
    </main>
  );
}
