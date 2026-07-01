import { motion } from 'framer-motion'
import { terminalCommands } from '../../data/portfolio'
import { useTypewriter } from '../../hooks/useTypewriter'

/** Terminal-style section with cycling typed commands. */
export function TerminalSection() {
  const typedText = useTypewriter(terminalCommands, 45, 25, 1800)

  return (
    <section className="section-padding mx-auto max-w-6xl" aria-label="Terminal animation">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl"
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" aria-hidden="true" />
          <span className="ml-3 font-mono text-xs text-muted">dev@portfolio ~ </span>
        </div>

        {/* Terminal body */}
        <div className="p-6 font-mono text-sm sm:p-8 sm:text-base">
          <p className="mb-2 text-accent-secondary">
            <span className="text-accent">$</span> echo &quot;What I do&quot;
          </p>
          <p className="text-muted">
            <span className="text-accent-secondary">&gt;</span>{' '}
            <span aria-live="polite">{typedText}</span>
            <span className="animate-pulse text-accent">▊</span>
          </p>

          <div className="mt-6 space-y-1 text-xs text-muted/60">
            <p>
              <span className="text-accent">$</span> stack --list
            </p>
            <p className="pl-4">React · TypeScript · Python · Node.js · PostgreSQL</p>
            <p className="mt-3">
              <span className="text-accent">$</span> status
            </p>
            <p className="pl-4 text-accent-secondary">● Available for new projects</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
