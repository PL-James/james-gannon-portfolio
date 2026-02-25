import { ScrollReveal } from './ScrollReveal'
import { timeline } from '../data/content'

export function Timeline() {
  return (
    <section className="py-32 overflow-hidden">
      <div className="px-6 max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-semibold mb-16 gradient-heading">
            Career
          </h2>
        </ScrollReveal>
      </div>

      {/* Horizontal scrolling timeline */}
      <ScrollReveal>
        <div className="relative px-6">
          {/* Connecting line */}
          <div
            className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent-dim), var(--border), transparent)' }}
          />

          <div className="timeline-track max-w-6xl mx-auto">
            {timeline.map((item) => (
              <div key={item.org + item.year} className="timeline-card">
                <div className="glass-card p-6 md:p-8 h-full relative">
                  {/* Accent dot at top */}
                  <div
                    className="absolute -top-1.5 left-8 w-3 h-3 rounded-full timeline-dot"
                  />
                  <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold mt-3" style={{ color: 'var(--text-heading)' }}>
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
                    {item.org}
                  </p>
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint for mobile */}
          <div className="md:hidden flex justify-center mt-4">
            <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Swipe to explore &rarr;
            </span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
