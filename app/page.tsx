import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { services } from "@/data/services";
import { certifications } from "@/data/certifications";
import { SectionTitle } from "@/components/section-title";
import { WorkspaceVisual } from "@/components/visuals";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { CvLink, SocialLinks } from "@/components/links";
import { SkillIcon } from "@/components/icon";
import { ContactContent } from "@/components/contact-content";
export const metadata: Metadata = {
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
};
export default function HomePage() {
  return (
    <main id="main-content">
      <section className="wrap hero" aria-label="Introduction">
        <Reveal>
          <div className="status">
            <span className="dot" /> OPEN TO DEVELOPMENT OPPORTUNITIES
          </div>
          <h1>
            Building
            <br />
            <em>what&apos;s next.</em>
          </h1>
          <p>{site.heroIntro}</p>
          <div className="actions">
            <Link className="btn primary" href="/projects">
              Explore my work <span>↗</span>
            </Link>
            <Link className="btn secondary" href="/contact">
              Get in touch <span>↗</span>
            </Link>
            <CvLink />
          </div>
          <div className="hero-foot">
            <span>
              <strong>Developer + builder</strong>Full-stack & AI automation
            </span>
            <span>
              <strong>{site.location}</strong>
              {site.availability}
            </span>
          </div>
          <SocialLinks />
        </Reveal>
        <WorkspaceVisual />
      </section>
      <div className="ticker">
        <div className="wrap">
          {[
            "NEXT.JS",
            "TYPESCRIPT",
            "NODE.JS",
            "POSTGRESQL",
            "N8N",
            "PRODUCT THINKING",
          ].map((tech) => (
            <span key={tech}>
              <b>✳</b> {tech}
            </span>
          ))}
        </div>
      </div>
      <section className="wrap section" id="projects">
        <SectionTitle
          eyebrow="01 / SELECTED WORK"
          title="Proof in the work."
          description="A selection of products and systems across web development, mobile, and automation."
        >
          <Link className="text-link" href="/projects">
            ALL PROJECTS ↗
          </Link>
        </SectionTitle>
        <div className="workgrid">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                number={projects.indexOf(project) + 1}
              />
            ))}
        </div>
      </section>
      <section className="wrap section" id="about">
        <SectionTitle
          eyebrow="02 / ABOUT"
          title={
            <>
              The person behind
              <br />
              the pixels.
            </>
          }
        />
        <div className="aboutgrid">
          <h3>
            Curious about systems.
            <br />
            <em>Committed to craft.</em>
          </h3>
          <div>
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="facts">
              <div className="fact">
                <small>EDUCATION</small>
                <b>{site.education.degree}</b>
              </div>
              <div className="fact">
                <small>GRADUATED</small>
                <b>{site.education.graduated}</b>
              </div>
              <div className="fact">
                <small>EXPERIENCE</small>
                <b>MetaViz Studio</b>
              </div>
              <div className="fact">
                <small>LOCATION</small>
                <b>{site.location}</b>
              </div>
              {site.stats
                .filter((stat) => stat.value)
                .map((stat) => (
                  <div className="fact" key={stat.label}>
                    <small>{stat.label}</small>
                    <b>{stat.value}</b>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <section className="wrap section" id="skills">
        <SectionTitle
          eyebrow="03 / EXPERTISE"
          title="What I work with."
          description="A practical toolkit for building interfaces, APIs, data-backed products, and connected workflows."
        />
        <div className="skillgrid">
          {skills.map((skill) => (
            <div className="skillbox" key={skill.name}>
              <div className="skill-label">
                <span className="num">{skill.label}</span>
                <SkillIcon name={skill.icon} />
              </div>
              <h3>{skill.name}</h3>
              <p>{skill.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap section" id="experience">
        <SectionTitle eyebrow="04 / JOURNEY" title="Experience & education." />
        {experience.map((job) => (
          <div className="experience" key={job.company}>
            <div>
              <span>PROFESSIONAL EXPERIENCE</span>
              <p className="date-note">
                {job.dates || "Employment dates to be added"}
              </p>
            </div>
            <div className="timeline-entry">
              <h3>
                {job.role} · {job.company}
              </h3>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="experience">
          <span>EDUCATION</span>
          <div className="timeline-entry">
            <h3>
              {site.education.degree} · {site.education.shortSchool}
            </h3>
            <p>
              {site.education.school}
              <br />
              Graduated {site.education.graduated}. Built Polymath Kids as a
              final-year project.
            </p>
          </div>
        </div>
      </section>
      <section className="wrap section" id="services">
        <SectionTitle
          eyebrow="05 / SERVICES"
          title="Useful things, built together."
          description="From a focused website to connected business workflows. Let's find the right scope for your idea."
        >
          <Link className="text-link" href="/contact">
            DISCUSS YOUR PROJECT ↗
          </Link>
        </SectionTitle>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="skillbox" key={service.title}>
              <div className="skill-label">
                <span className="num">0{index + 1} / SERVICE</span>
                <SkillIcon name={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap section" id="certifications">
        <SectionTitle
          eyebrow="06 / CREDENTIALS"
          title="Learning in public."
          description="A place for verified certificates. Details and credential links will be added once available."
        />
        <div className="workgrid">
          {certifications.map((certificate, index) => (
            <article className="skillbox certificate" key={certificate.issuer}>
              <div>
                <span className="num">CERTIFICATE / 0{index + 1}</span>
                <h3>{certificate.issuer}</h3>
                <p>{certificate.title || "Certificate title to be added."}</p>
                <p>{certificate.date || "Issue date to be added."}</p>
                {certificate.url ? (
                  <a
                    className="text-link"
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View credential ↗
                  </a>
                ) : (
                  <p>Credential link to be added.</p>
                )}
              </div>
              <Image
                src={
                  certificate.image || "/images/certificates/placeholder.svg"
                }
                alt={
                  certificate.image
                    ? `${certificate.issuer} certificate`
                    : "Certificate image placeholder"
                }
                width={160}
                height={120}
              />
            </article>
          ))}
        </div>
      </section>
      <section className="wrap cta-panel">
        <div>
          <span className="eyebrow">LET&apos;S COLLABORATE</span>
          <h2>
            Have something
            <br />
            worth building?
          </h2>
        </div>
        <Link className="btn" href="/contact">
          Start a conversation ↗
        </Link>
      </section>
      <section className="wrap home-contact" id="contact">
        <SectionTitle
          eyebrow="07 / CONTACT"
          title="Let's talk."
          description="Have a role, a project, or an automation idea in mind? I'd be glad to hear about it."
        />
        <ContactContent />
      </section>
    </main>
  );
}
