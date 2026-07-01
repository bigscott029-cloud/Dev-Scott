import { motion } from 'framer-motion'
import { Briefcase, CheckCircle2 } from 'lucide-react'
import { experience } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'

/** Work experience timeline section. */
export function Experience() {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <section id="experience" className="section-padding mx-auto max-w-6xl" aria-label="Work experience">
      <SectionHeading
        label="Experience"
        title="Professional Journey"
        description="Building products and systems that drive real business value."
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="glass card-shadow relative overflow-hidden rounded-2xl p-8 sm:p-10"
      >
        {/* Accent line */}
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-accent to-accent-secondary" aria-hidden="true" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Briefcase size={22} aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text sm:text-2xl">{experience.role}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{experience.period}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Responsibilities
          </h4>
          <ul className="grid gap-3 sm:grid-cols-2">
            {experience.responsibilities.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="flex items-start gap-3 text-sm text-muted"
              >
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-secondary" aria-hidden="true" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
