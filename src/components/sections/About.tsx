import { motion } from 'framer-motion'
import { Code2, Zap, Layers } from 'lucide-react'
import { aboutSummary } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'
import { useInView } from '../../hooks/useInView'

const highlights = [
  { icon: Code2, label: 'Full-Stack Development', desc: 'End-to-end web applications' },
  { icon: Zap, label: 'Automation Systems', desc: 'Python & workflow automation' },
  { icon: Layers, label: 'Product Thinking', desc: 'Business-focused solutions' },
]

/** About section with professional summary and highlight cards. */
export function About() {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <section id="about" className="section-padding mx-auto max-w-6xl" aria-labelledby="about-heading">
      <SectionHeading
        label="About"
        title="Crafting Digital Solutions"
        description="Turning complex problems into elegant, scalable software."
      />

      <div ref={ref} className="grid gap-8 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass card-shadow rounded-2xl p-8 lg:col-span-3"
        >
          <h3 id="about-heading" className="mb-4 text-xl font-bold text-text">
            Professional Summary
          </h3>
          <div className="space-y-4 text-muted leading-relaxed">
            {aboutSummary.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          {highlights.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              whileHover={{ x: 4 }}
              className="glass card-shadow flex items-start gap-4 rounded-2xl p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon size={20} aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-semibold text-text">{label}</h4>
                <p className="text-sm text-muted">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
