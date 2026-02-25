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

  return (
    <section id="contact" className="px-6 py-32 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-5 gap-12 md:gap-20">
        {/* Left: info + socials */}
        <div className="md:col-span-2">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 gradient-heading">
              {contact.heading}
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-body)' }}>
              {contact.subheading}
            </p>

            <div className="flex items-center gap-5">
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
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
                className="social-icon"
                aria-label="X (Twitter)"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right: form */}
        <div className="md:col-span-3">
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                  className="glass-input w-full px-4 py-3 rounded-lg text-sm"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="glass-input w-full px-4 py-3 rounded-lg text-sm"
                />
              </div>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Your message..."
                className="glass-input w-full px-4 py-3 rounded-lg text-sm resize-none"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-glow px-8 py-3 rounded-lg text-sm font-medium"
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
        </div>
      </div>
    </section>
  )
}
