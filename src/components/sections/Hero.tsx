import { motion } from 'framer-motion'
import { Download, Mail, ArrowDown } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useState } from 'react'
import { siteConfig } from '../../config/site'
import { Button } from '../ui/Button'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'
import { useTypewriter } from '../../hooks/useTypewriter'
import { downloadResumePdf } from '../../utils/resumePdf'

/** Hero section with animated background, typewriter subtitle, and CTAs. */
export function Hero() {
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)
  const typedText = useTypewriter([
    'Building scalable software...',
    'Automating workflows...',
    'Deploying growth systems...',
    'Solving business problems...',
  ])
  const years = useAnimatedCounter(siteConfig.yearsExperience)
  const projects = useAnimatedCounter(siteConfig.projectsCount)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await downloadResumePdf()
    } finally {
      setDownloading(false)
    }
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden section-padding pt-32"
      aria-label="Introduction"
    >
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-accent-secondary/15 blur-[100px]"
          animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-accent/10 blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-secondary" />
            Available for opportunities
          </span>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-text sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{siteConfig.title}</span>
          </h1>

          <p className="mx-auto mb-4 max-w-2xl text-lg text-muted sm:text-xl">
            {siteConfig.subtitle}
          </p>

          <p className="mb-10 h-7 font-mono text-sm text-accent-secondary sm:text-base" aria-live="polite">
            <span aria-hidden="true">&gt; </span>
            {typedText}
            <span className="animate-pulse">|</span>
          </p>

          {/* Stats counters */}
          <div className="mb-10 flex items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <span ref={years.ref} className="block text-3xl font-bold text-text sm:text-4xl">
                {years.count}+
              </span>
              <span className="text-xs text-muted sm:text-sm">Years Experience</span>
            </div>
            <div className="h-10 w-px bg-white/10" aria-hidden="true" />
            <div className="text-center">
              <span ref={projects.ref} className="block text-3xl font-bold text-text sm:text-4xl">
                {projects.count}+
              </span>
              <span className="text-xs text-muted sm:text-sm">Projects Built</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={handleDownload} icon={Download} disabled={downloading}>
              {downloading ? 'Generating PDF...' : 'Download Resume'}
            </Button>
            <Button variant="outline" href="#projects">
              View Projects
            </Button>
            <Button variant="ghost" href={siteConfig.github} icon={FaGithub}>
              Github
            </Button>
            <Button variant="ghost" href={siteConfig.linkedin} icon={FaLinkedin}>
              LinkedIn
            </Button>
            <Button variant="ghost" onClick={copyEmail} icon={Mail}>
              {copied ? 'Copied!' : 'Email'}
            </Button>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-accent"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Scroll to about section"
        >
          <ArrowDown size={24} />
        </motion.a>
      </div>
    </section>
  )
}
