import { motion } from 'framer-motion'
import { Mail, Copy, Check } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa'
import { useState } from 'react'
import { siteConfig } from '../../config/site'
import { SectionHeading } from '../ui/SectionHeading'
import { ContactForm } from '../ui/ContactForm'

/** Contact section with form and social links. */
export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socialLinks = [
    { href: siteConfig.github, icon: FaGithub, label: 'GitHub' },
    { href: siteConfig.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
    { href: siteConfig.telegram, icon: FaTelegram, label: 'Telegram' },
  ]

  return (
    <section id="contact" className="section-padding mx-auto max-w-6xl" aria-label="Contact">
      <SectionHeading
        label="Contact"
        title="Let's Work Together"
        description="Have a project in mind? I'd love to hear about it."
      />

      <div className="grid gap-10 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="glass card-shadow rounded-2xl p-8">
            <h3 className="mb-2 text-lg font-bold text-text">Get in Touch</h3>
            <p className="mb-6 text-sm text-muted">
              Open to freelance projects, collaborations, and full-time opportunities.
            </p>

            <button
              onClick={copyEmail}
              className="mb-6 flex w-full items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-left text-sm transition-colors hover:bg-white/10"
              aria-label="Copy email to clipboard"
            >
              <Mail size={18} className="shrink-0 text-accent" />
              <span className="flex-1 truncate text-text">{siteConfig.email}</span>
              {copied ? (
                <Check size={16} className="shrink-0 text-accent-secondary" />
              ) : (
                <Copy size={16} className="shrink-0 text-muted" />
              )}
            </button>

            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-muted transition-all hover:bg-accent/10 hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass card-shadow rounded-2xl p-8 lg:col-span-3"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}
