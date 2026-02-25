import { ScrollReveal } from './ScrollReveal'
import { affiliations } from '../data/content'

export function Affiliations() {
  return (
    <section className="px-6 py-24">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {affiliations.map((org, i) => (
            <span key={org.name} className="flex items-center gap-x-10 md:gap-x-14">
              <a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium tracking-wider uppercase social-icon"
                style={{ textDecoration: 'none' }}
              >
                {org.name}
              </a>
              {i < affiliations.length - 1 && (
                <span className="hidden md:inline text-xs" style={{ color: 'var(--text-muted)', opacity: 0.3 }}>|</span>
              )}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
