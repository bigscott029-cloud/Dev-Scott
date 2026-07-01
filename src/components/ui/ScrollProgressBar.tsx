import { motion } from 'framer-motion'

/** Top-of-page scroll progress indicator. */
export function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] h-[3px] bg-gradient-to-r from-accent via-accent-secondary to-accent"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  )
}
