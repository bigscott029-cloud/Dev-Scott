import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from './Button'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

/** Validated contact form with success/error feedback. */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>()

  const onSubmit = async (_data: ContactFormData) => {
    // Simulate form submission — replace with your backend or email service
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text placeholder:text-muted/60 transition-colors focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-muted">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className={inputClass}
            aria-invalid={!!errors.name}
            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
          />
          {errors.name && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-400" role="alert">
              <AlertCircle size={12} /> {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={inputClass}
            aria-invalid={!!errors.email}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
            })}
          />
          {errors.email && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-400" role="alert">
              <AlertCircle size={12} /> {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-muted">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Project inquiry"
          className={inputClass}
          aria-invalid={!!errors.subject}
          {...register('subject', { required: 'Subject is required' })}
        />
        {errors.subject && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-400" role="alert">
            <AlertCircle size={12} /> {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-muted">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project..."
          className={`${inputClass} resize-none`}
          aria-invalid={!!errors.message}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 10, message: 'At least 10 characters' },
          })}
        />
        {errors.message && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-400" role="alert">
            <AlertCircle size={12} /> {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" icon={Send} disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {submitted && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-accent-secondary"
          role="status"
        >
          <CheckCircle size={16} /> Message sent successfully! I'll get back to you soon.
        </motion.p>
      )}
    </form>
  )
}
