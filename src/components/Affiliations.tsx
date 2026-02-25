import { ScrollReveal } from './ScrollReveal'
import { affiliations } from '../data/content'

export function Affiliations() {
  return (
    <section className="px-6 py-24">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {affiliations.map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base font-medium tracking-wide transition-colors duration-300 hover:no-underline"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {org.name}
            </a>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
