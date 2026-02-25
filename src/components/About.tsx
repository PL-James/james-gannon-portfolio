import { ScrollReveal } from './ScrollReveal'
import { about } from '../data/content'

export function About() {
  return (
    <section className="px-6 py-32 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 gradient-heading">
          About
        </h2>
      </ScrollReveal>

      <div className="space-y-12">
        {/* Bio text */}
        <ScrollReveal delay={0.05}>
          <div className="max-w-3xl space-y-4 text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-body)' }}>
            {about.bio.split('\n\n').slice(0, -1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ScrollReveal>

        {/* Pull quote */}
        <ScrollReveal delay={0.1}>
          <div className="pull-quote max-w-2xl my-12">
            {about.bio.split('\n\n').slice(-1)[0]}
          </div>
        </ScrollReveal>

        {/* Stats bar — overlaps visually via negative margin */}
        <ScrollReveal delay={0.15}>
          <div className="glass-card -mx-2 md:mx-0 mt-8">
            <div className="stats-bar">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold" style={{ color: 'var(--accent)' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
