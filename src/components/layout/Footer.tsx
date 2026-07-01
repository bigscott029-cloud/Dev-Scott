import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa'
import { siteConfig } from '../../config/site'

/** Site footer with social links and dynamic year. */
export function Footer() {
  const year = new Date().getFullYear()

  const socialLinks = [
    { href: siteConfig.github, icon: FaGithub, label: 'GitHub' },
    { href: siteConfig.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
    { href: siteConfig.telegram, icon: FaTelegram, label: 'Telegram' },
    { href: `mailto:${siteConfig.email}`, icon: Mail, label: 'Email' },
  ]

  return (
    <footer className="border-t border-white/5 bg-bg-card/50">
      <div className="section-padding mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-text">
              <span className="text-gradient">Dev</span>
              <span className="text-muted">.</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              © {year} Software Engineer. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-muted transition-all hover:bg-accent/10 hover:text-accent"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
