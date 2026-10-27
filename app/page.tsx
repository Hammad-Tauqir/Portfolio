import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  MapPin,
} from "lucide-react";
import { site } from "@/config/site";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { WorkspaceVisual } from "@/components/visuals";
import { Reveal } from "@/components/reveal";
import { ContactContent } from "@/components/contact-content";
import { FeaturedProject } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { SkillIcon } from "@/components/icon";
import { Github } from "@/components/social-icons";

export const metadata: Metadata = {
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
};

const featured = projects.filter((project) => project.featured);
const technologies = [...new Set(skills.flatMap((skill) => skill.items))];
const stats = [
  {
    value: projects.filter((project) => project.status === "Completed").length,
    label: "Completed builds",
  },
  { value: technologies.length, label: "Technologies in my toolkit" },
  {
    value: site.education.graduated.split(" ").pop(),
    label: `CS graduate · ${site.education.shortSchool}`,
  },
];

export default function HomePage() {
  const job = experience[0];
  return (
    <main id="main-content">
      <section className="wrap hero" aria-label="Introduction">
        <div className="hero-copy">
          <Reveal>
            <p className="status-badge">
              <span className="pulse" aria-hidden="true" />
              {site.availability} · {site.location}
            </p>
            <h1>
              I build websites and{" "}
              <em className="gradient-text">automations</em> that make business
              easier.
            </h1>
            <p className="hero-intro">{site.heroIntro}</p>
            <div className="actions">
              <Link className="btn primary" href="/projects">
                View projects <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link className="btn secondary" href="#contact">
                Contact me
              </Link>
              {site.github && (
                <a
                  className="icon-btn"
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                >
                  <Github size={18} />
                </a>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="hero-visual">
          <WorkspaceVisual />
        </Reveal>
      </section>

      <div className="marquee" aria-label="Technologies I work with">
        <div className="marquee-track">
          {[...technologies, ...technologies].map((tech, index) => (
            <span key={index} aria-hidden={index >= technologies.length}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <section className="wrap section" id="work">
        <Reveal>
          <SectionTitle
            eyebrow="01 / SELECTED WORK"
            title={
              <>
                Projects I&apos;m{" "}
                <span className="gradient-text">proud of.</span>
              </>
            }
            description="From AI assistants and developer tools to education platforms and team products — a few builds that show how I think and ship."
          />
        </Reveal>
        <div className="feature-list">
          {featured.map((project) => (
            <Reveal key={project.slug}>
              <FeaturedProject
                project={project}
                number={projects.indexOf(project) + 1}
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="section-more">
          <Link className="btn secondary" href="/projects">
            Browse all {projects.length} projects{" "}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      <section className="wrap section" id="services">
        <Reveal>
          <SectionTitle
            eyebrow="02 / WHAT I CAN BUILD"
            title={
              <>
                Practical digital work,{" "}
                <span className="gradient-text">end to end.</span>
              </>
            }
            description="Clear scope, thoughtful implementation, and systems that fit how the business actually works."
          />
        </Reveal>
        <div className="service-list">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08}>
              <article className="service-card spot">
                <span className="service-icon">
                  <SkillIcon name={service.icon} />
                </span>
                <span className="service-num">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section" id="about">
        <Reveal>
          <SectionTitle
            eyebrow="03 / ABOUT"
            title={
              <>
                A developer who cares about the{" "}
                <span className="gradient-text">whole experience.</span>
              </>
            }
          />
        </Reveal>
        <div className="bento">
          <Reveal className="bento-about">
            <div className="bento-card spot">
              <div className="avatar" aria-hidden="true">
                HT
              </div>
              {site.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal className="bento-edu" delay={0.08}>
            <div className="bento-card spot">
              <span className="bento-icon">
                <GraduationCap size={20} aria-hidden="true" />
              </span>
              <small>EDUCATION</small>
              <strong>{site.education.degree}</strong>
              <span>{site.education.school}</span>
              <span className="bento-pill">
                Graduated {site.education.graduated}
              </span>
            </div>
          </Reveal>
          <Reveal className="bento-place" delay={0.12}>
            <div className="bento-card spot">
              <span className="bento-icon">
                <MapPin size={20} aria-hidden="true" />
              </span>
              <small>BASED IN</small>
              <strong>{site.location}</strong>
              <span className="status-inline">
                <span className="pulse" aria-hidden="true" />
                {site.availability}
              </span>
            </div>
          </Reveal>
          <Reveal className="bento-job" delay={0.16}>
            <div className="bento-card spot">
              <span className="bento-icon">
                <Briefcase size={20} aria-hidden="true" />
              </span>
              <small>EXPERIENCE</small>
              <strong>{job.role}</strong>
              <span>
                {job.company}
                {job.dates && ` · ${job.dates}`}
              </span>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap section" id="skills">
        <Reveal>
          <SectionTitle
            eyebrow="04 / CAPABILITIES"
            title={
              <>
                A useful, <span className="gradient-text">modern toolkit.</span>
              </>
            }
            description="The languages, frameworks, and services I reach for to take an idea from interface to deployment."
          />
        </Reveal>
        <div className="skill-groups">
          {skills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 0.06}>
              <div className="skill-card spot">
                <div className="skill-head">
                  <span className="bento-icon">
                    <SkillIcon name={skill.icon} />
                  </span>
                  <small>{skill.label}</small>
                </div>
                <h3>{skill.name}</h3>
                <ul className="chips">
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section" id="contact">
        <div className="contact-panel">
          <Reveal className="contact-intro">
            <span className="eyebrow">05 / START A CONVERSATION</span>
            <h2>
              Have a useful idea?{" "}
              <span className="gradient-text">Let’s build it well.</span>
            </h2>
            <p>
              Tell me about the website, business tool, or automation you have
              in mind.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactContent />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
