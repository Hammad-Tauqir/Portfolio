import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { services } from "@/data/services";
import { WorkspaceVisual } from "@/components/visuals";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
};

export default function HomePage() {
  const featured = projects.filter((project) => project.featured);
  return (
    <main id="main-content">
      <section className="wrap hero" aria-label="Introduction">
        <Reveal>
          <p className="kicker">
            <span /> FULL-STACK DEVELOPMENT + AI AUTOMATION
          </p>
          <h1>
            I build websites and <em>AI automations</em> that make business
            easier.
          </h1>
          <p className="hero-intro">{site.heroIntro}</p>
          <div className="actions">
            <Link className="btn primary" href="#work">
              View my work <ArrowDownRight size={17} />
            </Link>
            <Link className="btn secondary" href="#contact">
              Contact me <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="hero-meta">
            <span>
              <small>BASED IN</small>
              {site.location}
            </span>
            <span>
              <small>FOCUS</small>Web products + connected workflows
            </span>
          </div>
        </Reveal>
        <WorkspaceVisual />
      </section>

      <section className="wrap section work-section" id="work">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / SELECTED WORK</span>
            <h2>Products with a purpose.</h2>
          </div>
          <p>
            A few focused builds that show how I think across interface,
            backend, and automation.
          </p>
        </div>
        <div className="workgrid selected-work">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              number={projects.indexOf(project) + 1}
            />
          ))}
        </div>
        <Link className="inline-cta" href="/projects">
          Explore every project <ArrowUpRight size={16} />
        </Link>
      </section>

      <section className="service-band" id="services">
        <div className="wrap section">
          <div className="section-heading inverse">
            <div>
              <span className="eyebrow">02 / WHAT I CAN BUILD</span>
              <h2>
                Practical digital work,
                <br />
                end to end.
              </h2>
            </div>
            <p>
              Clear scope, thoughtful implementation, and systems that fit how
              the business actually works.
            </p>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <article key={service.title}>
                <span>0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section about-section" id="about">
        <div className="about-statement">
          <span className="eyebrow">03 / ABOUT</span>
          <h2>
            A developer who cares about the <em>whole experience.</em>
          </h2>
        </div>
        <div className="about-copy">
          {site.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="credential-grid">
            <div>
              <small>EDUCATION</small>
              <strong>{site.education.degree}</strong>
              <span>
                {site.education.shortSchool} · {site.education.graduated}
              </span>
            </div>
            <div>
              <small>EXPERIENCE</small>
              <strong>{experience[0].role}</strong>
              <span>{experience[0].company}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section skills-section" id="skills">
        <div className="section-heading compact">
          <div>
            <span className="eyebrow">04 / CAPABILITIES</span>
            <h2>A useful, modern toolkit.</h2>
          </div>
        </div>
        <div className="skill-groups">
          {skills.map((skill) => (
            <div key={skill.name}>
              <h3>{skill.name}</h3>
              <p>{skill.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap contact-panel" id="contact">
        <div className="contact-intro">
          <span className="eyebrow">05 / START A CONVERSATION</span>
          <h2>
            Have a useful idea?
            <br />
            <em>Let’s build it well.</em>
          </h2>
          <p>
            Tell me about the website, business tool, or automation you have in
            mind.
          </p>
        </div>
        <ContactContent />
      </section>
    </main>
  );
}
