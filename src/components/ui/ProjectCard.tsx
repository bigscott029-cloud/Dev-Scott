import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

interface ProjectCardProps {
  title: string
  description: string
  status: 'In Development' | 'Completed'
  tags: string[]
  gradient: string
  index: number
}

/** Featured project card with status badge and hover lift. */
export function ProjectCard({
  title,
  description,
  status,
  tags,
  gradient,
  index,
}: ProjectCardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()
  const isDev = status === 'In Development'

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="glass card-shadow group relative overflow-hidden rounded-2xl"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
      <div className="relative p-6 sm:p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-text sm:text-2xl">{title}</h3>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              isDev
                ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30'
                : 'bg-accent-secondary/15 text-accent-secondary ring-1 ring-accent-secondary/30'
            }`}
          >
            {status}
          </span>
        </div>
        <p className="mb-6 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-muted ring-1 ring-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span>View details</span>
          <ExternalLink size={14} aria-hidden="true" />
        </div>
      </div>
    </motion.article>
  )
}
