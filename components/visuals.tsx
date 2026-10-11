import Image from "next/image";
import { site } from "@/config/site";
import type { Project } from "@/data/projects";
export function WorkspaceVisual() {
  if (site.profileImage)
    return (
      <div className="profile-image">
        <Image
          src={site.profileImage}
          alt={site.name}
          width={600}
          height={650}
          preload
          sizes="(max-width: 760px) 90vw, 45vw"
        />
      </div>
    );
  return (
    <div
      className="art"
      role="img"
      aria-label="Illustrative developer workspace: think, build, improve"
    >
      <div className="halo" />
      <div className="visual">
        <div className="visual-head">
          <i />
          <i />
          <i />
          <span>hammad / workspace</span>
        </div>
        <div className="visual-content">
          <span className="prompt">$ building useful things</span>
          <h3>
            Ideas into
            <br />
            <b>working products.</b>
          </h3>
          <p>
            {"// clean interfaces, connected systems, purposeful automation"}
          </p>
          <div className="mini-grid">
            <div>
              <strong>01</strong>Think
            </div>
            <div>
              <strong>02</strong>Build
            </div>
            <div>
              <strong>03</strong>Improve
            </div>
          </div>
          <div className="code-lines">
            <b>const</b>
            {" approach = {"}
            <br />
            &nbsp; frontEnd: &apos;thoughtful&apos;,
            <br />
            &nbsp; backEnd: &apos;reliable&apos;,
            <br />
            &nbsp; outcome: &apos;useful&apos;
            <br />
            {" };"}
          </div>
        </div>
      </div>
      <div className="floating">● CURRENTLY EXPLORING AI AUTOMATION</div>
    </div>
  );
}
export function ProjectVisual({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <div className={`preview ${project.visual}`}>
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          preload={priority}
          className="project-image"
        />
      ) : (
        <>
          <div className="mock" aria-hidden="true">
            <div className="mockbar">
              <i />
              <i />
              <i />
            </div>
            <div className="mockrow short" />
            <div className="mockrow long" />
            <div className="mockrow" />
            <div className="mockwidgets">
              <i />
              <i />
              <i />
            </div>
            <div className="mockrow long" />
            <div className="mockrow" />
          </div>
          <span className="illustration-label">Illustrative preview</span>
        </>
      )}
    </div>
  );
}
