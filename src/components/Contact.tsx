import { useState, type FormEvent } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { contact, socials } from '../data/content'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    backgroundColor: 'var(--bg-card)',
    borderColor: 'var(--border)',
    color: 'var(--text-heading)',
  }

  return (
    <section id="contact" className="px-6 py-32 max-w-2xl mx-auto">
      <ScrollReveal>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {contact.heading}
        </h2>
        <p className="mb-12" style={{ color: 'var(--text-body)' }}>
          {contact.subheading}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              type="text"
              required
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1"
              style={{ ...inputStyle, '--tw-ring-color': 'var(--accent)' } as React.CSSProperties}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1"
              style={{ ...inputStyle, '--tw-ring-color': 'var(--accent)' } as React.CSSProperties}
            />
          </div>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your message..."
            className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 resize-none"
            style={{ ...inputStyle, '--tw-ring-color': 'var(--accent)' } as React.CSSProperties}
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-8 py-3 rounded-lg text-sm font-medium transition-opacity duration-200 disabled:opacity-50"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p className="text-sm" style={{ color: 'var(--accent)' }}>
              Message sent. I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400">
              Something went wrong. Please try again or reach out on LinkedIn.
            </p>
          )}
        </form>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex items-center gap-6 mt-12">
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            aria-label="X (Twitter)"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
