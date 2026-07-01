import { techStack } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { TechIcon } from '../ui/TechIcon'

/** Tech stack icon grid. */
export function TechStack() {
  return (
    <section id="stack" className="section-padding mx-auto max-w-6xl" aria-label="Technology stack">
      <SectionHeading
        label="Tech Stack"
        title="Tools & Technologies"
        description="The technologies I use to bring ideas to life."
      />

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {techStack.map((tech, i) => (
          <TechIcon key={tech.name} name={tech.name} icon={tech.icon} index={i} />
        ))}
      </div>
    </section>
  )
}
