import { coreSkills, specializations } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { SkillCard } from '../ui/SkillCard'
import { Badge } from '../ui/Badge'

/** Core skills grid with animated progress bars and specialization badges. */
export function CoreSkills() {
  return (
    <section id="skills" className="section-padding mx-auto max-w-6xl" aria-labelledby="skills-heading">
      <SectionHeading
        label="Core Skills"
        title="Technical Expertise"
        description="A comprehensive toolkit for building modern, scalable applications."
      />

      <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coreSkills.map((group, i) => (
          <SkillCard key={group.category} category={group.category} skills={group.skills} index={i} />
        ))}
      </div>

      <div>
        <h3 id="skills-heading" className="mb-6 text-center text-xl font-bold text-text">
          Specializations
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {specializations.map((spec, i) => (
            <Badge key={spec} label={spec} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
