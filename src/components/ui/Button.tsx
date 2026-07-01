import { motion } from 'framer-motion'
import type { ComponentType, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

type IconComponent = ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>

interface ButtonProps {
  variant?: ButtonVariant
  icon?: IconComponent
  href?: string
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/25 hover:shadow-accent/40',
  secondary:
    'bg-accent-secondary/15 text-accent-secondary border border-accent-secondary/30 hover:bg-accent-secondary/25',
  ghost: 'bg-transparent text-muted hover:text-text hover:bg-white/5',
  outline:
    'bg-transparent border border-white/10 text-text hover:border-accent/50 hover:bg-accent/5',
}

/** Reusable button with optional link behavior and hover animation. */
export function Button({
  variant = 'primary',
  icon: Icon,
  href,
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={classes}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {Icon && <Icon size={16} aria-hidden={true} />}
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {Icon && <Icon size={16} aria-hidden={true} />}
      {children}
    </motion.button>
  )
}
