import { motion } from 'framer-motion'
import { TrendingUp, BarChart3, Users, Megaphone, Target, LineChart } from 'lucide-react'
import { marketingSkills } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

const icons = [TrendingUp, Megaphone, BarChart3, Users, Target, LineChart]

/** Marketing and growth capabilities section. */
export function Marketing() {
  return (
    <section id="marketing" className="section-padding mx-auto max-w-6xl" aria-label="Marketing and growth">
      <SectionHeading
        label="Marketing & Growth"
        title="Digital Growth & Marketing"
        description="Combining technical skills with growth strategy to build products that scale."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {marketingSkills.map((skill, i) => {
          const Icon = icons[i % icons.length]
          return (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass card-shadow group flex items-center gap-4 rounded-2xl p-5 transition-shadow hover:shadow-accent-secondary/5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-secondary/10 text-accent-secondary transition-colors group-hover:bg-accent-secondary/20">
                <Icon size={20} aria-hidden="true" />
              </div>
              <span className="font-medium text-text">{skill}</span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
