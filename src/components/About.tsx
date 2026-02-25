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

      <div className="grid md:grid-cols-5 gap-12 md:gap-16">
        <div className="md:col-span-3">
          <ScrollReveal delay={0.05}>
            <div className="space-y-4 text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-body)' }}>
              {about.bio.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {about.stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={0.1 + i * 0.05}>
                <div className="glass-card p-5">
                  <div className="text-2xl font-semibold" style={{ color: 'var(--accent)' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
