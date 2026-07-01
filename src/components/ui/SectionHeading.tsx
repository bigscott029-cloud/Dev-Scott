import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

/** Consistent section header with scroll reveal animation. */
export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-14 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
        {label}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">{description}</p>
      )}
    </motion.div>
  )
}
