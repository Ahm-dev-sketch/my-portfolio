"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="work" aria-labelledby="work-heading" className="relative bg-white pt-12 sm:pt-16 pb-0 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t.work.eyebrow}
            title={t.work.heading}
            description={t.work.description}
            watermark="Selected Work"
            sparkle
            id="work-heading"
          />
        </Reveal>

        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 md:grid-cols-2">
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

      {/* Smooth Bottom Arch Wave Transition into Cream Education Section */}
      <div className="w-full overflow-hidden leading-none mt-12 sm:mt-16 pointer-events-none">
        <svg
          viewBox="0 0 1200 90"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-16 lg:h-20 text-[#FEF4EA] fill-current block"
        >
          <path d="M0,90 L0,0 C320,80 880,80 1200,0 L1200,90 Z" />
        </svg>
      </div>
    </section>
  );
}

export default ProjectsSection;
