import Image from "next/image";
import type { Project } from "@/data/projects";

function BrowserFrame({ project }: { project: Project }) {
  if (project.visual === "receptionist") {
    return (
      <div className="ui receptionist-ui" aria-hidden="true">
        <aside>
          <div className="ui-brand">AR</div>
          <i />
          <i />
          <i />
        </aside>
        <div className="chat-window">
          <div className="ui-top">
            <span>Reception desk</span>
            <b>Online</b>
          </div>
          <div className="chat-copy">
            <small>AI RECEPTIONIST</small>
            <h4>How can I help today?</h4>
            <p>I can answer questions or help book an appointment.</p>
          </div>
          <div className="quick-actions">
            <span>View services</span>
            <span>Book a time</span>
          </div>
          <div className="chat-input">
            <span>Type or use voice…</span>
            <b>⌁</b>
          </div>
        </div>
        <div className="booking-card">
          <small>APPOINTMENT</small>
          <strong>Tuesday, 2:30 PM</strong>
          <span>Calendar checked</span>
        </div>
      </div>
    );
  }

  if (project.visual === "devlog") {
    return (
      <div className="ui devlog-ui" aria-hidden="true">
        <aside>
          <b>D/</b>
          <i />
          <i />
          <i />
          <i />
        </aside>
        <div className="dashboard">
          <div className="ui-top">
            <span>Good morning, Hammad</span>
            <small>+ NEW LOG</small>
          </div>
          <div className="metric-row">
            <div>
              <small>CURRENT STREAK</small>
              <strong>12 days</strong>
            </div>
            <div>
              <small>LOGS THIS MONTH</small>
              <strong>24</strong>
            </div>
          </div>
          <div className="activity">
            <small>ACTIVITY</small>
            {[45, 70, 38, 82, 62, 92, 74].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (project.visual === "polymath") {
    return (
      <div className="ui learning-ui" aria-hidden="true">
        <div className="learning-head">
          <b>POLYMATH</b>
          <span>Explore courses</span>
          <i />
        </div>
        <div className="lesson-copy">
          <small>LEARN AT YOUR PACE</small>
          <h4>
            Small lessons.
            <br />
            Big curiosity.
          </h4>
          <span>Continue learning →</span>
        </div>
        <div className="course-card">
          <div>3D</div>
          <small>CREATIVE SCIENCE</small>
          <strong>Discover the solar system</strong>
          <span>68% complete</span>
          <i />
        </div>
      </div>
    );
  }

  if (project.visual === "metaviz") {
    return (
      <div className="ui lead-ui" aria-hidden="true">
        <div className="lead-copy">
          <small>MOBILE APP STUDIO</small>
          <h4>
            From idea to
            <br />
            app store.
          </h4>
          <p>Strategy, design and development for useful mobile products.</p>
          <span>Book a discovery call →</span>
        </div>
        <div className="phone">
          <div className="phone-head" />
          <strong>
            Your next
            <br />
            big idea.
          </strong>
          <div className="phone-orb" />
          <small>START A PROJECT</small>
        </div>
        <div className="lead-pill">
          CRM connected <b>✓</b>
        </div>
      </div>
    );
  }

  if (project.visual === "banking") {
    return (
      <div className="ui banking-ui" aria-hidden="true">
        <div className="bank-phone">
          <small>AVAILABLE BALANCE</small>
          <strong>PKR 48,250</strong>
          <div className="bank-actions">
            <i />
            <i />
            <i />
          </div>
          <span>Recent activity</span>
          <p>
            Transfer received <b>+12,000</b>
          </p>
          <p>
            Utility payment <b>−4,850</b>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ui automation-ui" aria-hidden="true">
      <div className="flow-node start">
        <small>TRIGGER</small>
        <strong>New request</strong>
      </div>
      <i />
      <div className="flow-node">
        <small>PROCESS</small>
        <strong>Classify & prepare</strong>
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
      aria-label="Illustrative previews of web application and automation work"
    >
      <div className="hero-browser">
        <div className="browser-bar">
          <i />
          <i />
          <i />
          <span>AI receptionist / demo</span>
        </div>
        <div className="hero-chat">
          <small>AI RECEPTIONIST</small>
          <h3>A calmer way to handle enquiries.</h3>
          <div className="message">I’d like to book a consultation.</div>
          <div className="message reply">
            I found three available times for Tuesday.
          </div>
          <div className="voice-line">
            <span>Website voice input</span>
            <b>••••••••</b>
          </div>
        </div>
      </div>
      <div className="hero-mini-card">
        <small>AUTOMATION FLOW</small>
        <div>
          <i />
          <span />
          <i />
          <span />
          <i />
        </div>
        <strong>Lead → Calendar → Email</strong>
      </div>
      <div className="hero-proof">
        <b>01</b>
        <span>
          Featured build
          <br />
          <strong>Working portfolio demo</strong>
        </span>
      </div>
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
          alt={`${project.name} interface`}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          preload={priority}
          className="project-image"
        />
      ) : (
        <>
          <BrowserFrame project={project} />
          <span className="illustration-label">
            Illustrative interface preview
          </span>
        </>
      )}
    </div>
  );
}
