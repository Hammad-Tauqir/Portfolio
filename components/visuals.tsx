import Image from "next/image";
import type { Project } from "@/data/projects";

/** Illustrative workflow shown for projects that have no real screenshot yet. */
function FlowIllustration() {
  return (
    <div className="ui automation-ui" aria-hidden="true">
      <div className="flow-node start">
        <small>TRIGGER</small>
        <strong>New request</strong>
      </div>
      <i />
      <div className="flow-node">
        <small>PROCESS</small>
        <strong>Classify &amp; prepare</strong>
      </div>
      <i />
      <div className="flow-node end">
        <small>REVIEW</small>
        <strong>Human approval</strong>
      </div>
    </div>
  );
}

export function WorkspaceVisual() {
  return (
    <div
      className="hero-composition"
      aria-label="AI Receptionist project preview"
    >
      <div className="hero-halo" aria-hidden="true" />
      <div className="hero-browser">
        <div className="browser-bar">
          <i />
          <i />
          <i />
          <span>ai-receptionist / demo</span>
        </div>
        <Image
          className="hero-product-image"
          src="/images/projects/ai-receptionist-demo-poster.webp"
          width={1280}
          height={720}
          sizes="(max-width: 1000px) 90vw, 45vw"
          preload
          alt="Frame from the Nova Digital AI Receptionist demo showing a service enquiry"
        />
        <p className="hero-capture-caption">
          Frame from the demo video
        </p>
      </div>
      <div className="hero-chip hero-chip-flow">
        <small>AUTOMATION FLOW</small>
        <div className="flow-dots" aria-hidden="true">
          <i />
          <span />
          <i />
          <span />
          <i />
        </div>
        <strong>Lead → Calendar → Email</strong>
      </div>
      <div className="hero-chip hero-chip-proof">
        <b>01</b>
        <span>
          Featured build
          <strong>AI Receptionist</strong>
        </span>
      </div>
      <div className="hero-chip hero-chip-stack" aria-hidden="true">
        <span>n8n</span>
        <span>OpenAI</span>
        <span>Vercel</span>
      </div>
    </div>
  );
}

export function ProjectVisual({
  project,
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`preview ${project.visual}`}>
      {project.image ? (
        <>
          <Image
            src={project.image}
            alt={project.imageAlt || `${project.name} interface`}
            fill
            sizes={sizes}
            preload={priority}
            className="project-image"
          />
          {project.imageCaption && (
            <span className="illustration-label">{project.imageCaption}</span>
          )}
        </>
      ) : (
        <>
          <FlowIllustration />
          <span className="illustration-label">
            Illustrative interface preview
          </span>
        </>
      )}
    </div>
  );
}
