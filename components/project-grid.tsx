"use client";
import { useState } from "react";
import { categories, projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
export function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
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
            onClick={() => setFilter(category)}
          >
            {category === "All" ? "All work" : category}
          </button>
        ))}
      </div>
      <span className="sr-only" role="status">
        {filtered.length} projects shown
      </span>
      <div className="workgrid" id="project-grid">
        {filtered.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            number={projects.indexOf(project) + 1}
          />
        ))}
      </div>
    </>
  );
}
