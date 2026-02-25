import { ScrollReveal } from './ScrollReveal'
import { timeline } from '../data/content'

export function Timeline() {
  return (
    <section className="px-6 py-32 max-w-4xl mx-auto">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 gradient-heading">
          Career
        </h2>
      </ScrollReveal>

      <div className="relative">
        {/* Vertical line with gradient */}
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ background: 'linear-gradient(180deg, var(--accent-dim), var(--border), transparent)' }}
        />

        {timeline.map((item, i) => (
          <ScrollReveal key={item.org + item.year} delay={i * 0.05}>
            <div className={`relative flex items-start mb-12 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}>
              {/* Pulsing dot */}
              <div
                className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10 timeline-dot"
              />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${
                i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
              }`}>
                <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                  {item.year}
                </span>
                <h3 className="text-lg font-semibold mt-1" style={{ color: 'var(--text-heading)' }}>
                  {item.role}
                </h3>
                <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {item.org}
                </p>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {item.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
