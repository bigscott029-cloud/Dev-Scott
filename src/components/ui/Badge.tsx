import { motion } from 'framer-motion'

interface BadgeProps {
  label: string
  index: number
}

/** Premium specialization badge with staggered reveal. */
export function Badge({ label, index }: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="glass inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-text ring-1 ring-white/10 transition-shadow hover:ring-accent/30 hover:shadow-lg hover:shadow-accent/10"
    >
      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent-secondary" aria-hidden="true" />
      {label}
    </motion.span>
  )
}
