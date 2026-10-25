"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="work" aria-labelledby="work-heading" className="border-t border-line">
      <div className="container-page py-16 sm:py-20 md:py-24 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={t.work.eyebrow}
            title={t.work.heading}
            description={t.work.description}
            id="work-heading"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              className="h-full min-w-0"
              delay={0.05 * index}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
