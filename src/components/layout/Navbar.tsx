import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { ThemeToggle } from '../ui/ThemeToggle'
import { downloadResumePdf } from '../../utils/resumePdf'

interface NavbarProps {
  activeSection: string
  isDark: boolean
  onToggleTheme: () => void
}

/** Fixed navigation with active section highlighting and mobile menu. */
export function Navbar({ activeSection, isDark, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await downloadResumePdf()
    } finally {
      setDownloading(false)
    }
  }

  const navItemClass = (href: string) => {
    const id = href.replace('#', '')
    const isActive = activeSection === id
    return `relative px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-accent' : 'text-muted hover:text-text'
    }`
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <nav
        className="glass mx-auto mt-4 max-w-6xl rounded-2xl px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            className="text-lg font-bold tracking-tight text-text"
            aria-label="Home"
          >
            <span className="text-gradient">Dev</span>
            <span className="text-muted">.</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={navItemClass(link.href)}>
                  {link.label}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-accent"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="hidden items-center gap-1.5 rounded-xl bg-accent/10 px-3 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent/20 sm:flex"
              aria-label="Download resume as PDF"
            >
              <Download size={14} />
              {downloading ? 'Generating...' : 'Resume'}
            </button>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:text-text md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col gap-1 pt-4 pb-2">
                {siteConfig.navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                        activeSection === link.href.replace('#', '')
                          ? 'bg-accent/10 text-accent'
                          : 'text-muted hover:bg-white/5 hover:text-text'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <li className="pt-2">
                  <button
                    onClick={() => {
                      handleDownload()
                      setMobileOpen(false)
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white"
                  >
                    <Download size={16} />
                    Download Resume
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
