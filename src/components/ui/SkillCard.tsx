import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

interface SkillItem {
  name: string
  level: number
}

interface SkillCardProps {
  category: string
  skills: SkillItem[]
  index: number
}

/** Skill category card with animated progress bars on scroll. */
export function SkillCard({ category, skills, index }: SkillCardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass card-shadow group rounded-2xl p-6 transition-shadow duration-300 hover:shadow-accent/5"
    >
      <h3 className="mb-5 text-lg font-semibold text-text">{category}</h3>
      <ul className="space-y-4">
        {skills.map((skill) => (
          <li key={skill.name}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-muted group-hover:text-text transition-colors">{skill.name}</span>
              <span className="font-mono text-xs text-accent">{skill.level}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
