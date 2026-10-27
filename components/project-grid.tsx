"use client";
import { useState } from "react";
import { categories, projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
export function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const count = (category: (typeof categories)[number]) =>
    category === "All"
      ? projects.length
      : projects.filter((project) => project.categories.includes(category))
          .length;
  const filtered = projects.filter(
    (project) => filter === "All" || project.categories.includes(filter),
  );
  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            key={category}
            className={filter === category ? "selected" : ""}
            type="button"
            aria-pressed={filter === category}
            aria-label={category === "All" ? "All projects" : category}
            onClick={() => setFilter(category)}
          >
            {category === "All" ? "All projects" : category}
            <sup aria-hidden="true">{count(category)}</sup>
          </button>
        ))}
      </div>
      <span className="sr-only" role="status">
        {filtered.length} projects shown
      </span>
      <div className="workgrid case-study-grid" id="project-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
