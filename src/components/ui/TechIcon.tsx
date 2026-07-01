import { motion } from 'framer-motion'
import {
  SiDocker,
  SiFirebase,
  SiGit,
  SiLinux,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTelegram,
  SiTypescript,
} from 'react-icons/si'

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  react: SiReact,
  typescript: SiTypescript,
  nodejs: SiNodedotjs,
  python: SiPython,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  tailwind: SiTailwindcss,
  docker: SiDocker,
  git: SiGit,
  firebase: SiFirebase,
  telegram: SiTelegram,
  linux: SiLinux,
}

interface TechIconProps {
  name: string
  icon: string
  index: number
}

/** Tech stack icon tile with hover animation. */
export function TechIcon({ name, icon, index }: TechIconProps) {
  const Icon = iconMap[icon]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.05 }}
      className="glass card-shadow flex flex-col items-center gap-3 rounded-2xl p-6 transition-shadow hover:shadow-accent/10"
      title={name}
    >
      {Icon ? (
        <Icon size={36} className="text-accent" aria-hidden="true" />
      ) : (
        <div className="h-9 w-9 rounded-lg bg-accent/20" />
      )}
      <span className="text-xs font-medium text-muted">{name}</span>
    </motion.div>
  )
}
