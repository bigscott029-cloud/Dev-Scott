import { projects } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../ui/ProjectCard'

/** Featured projects showcase grid. */
export function FeaturedProjects() {
  return (
    <section id="projects" className="section-padding mx-auto max-w-6xl" aria-label="Featured projects">
      <SectionHeading
        label="Featured Projects"
        title="Selected Work"
        description="Projects that showcase automation, full-stack development, and product thinking."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} {...project} index={i} />
        ))}
      </div>
    </section>
  )
}
