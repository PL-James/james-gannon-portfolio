import { affiliations } from '../data/content'
import { ScrollReveal } from './ScrollReveal'

function AffiliationItem({ name }: { name: string }) {
  return (
    <span
      className="text-sm font-medium tracking-wider uppercase mx-8 md:mx-12 whitespace-nowrap"
      style={{ color: 'var(--text-muted)' }}
    >
      {name}
    </span>
  )
}

export function Affiliations() {
  // Double the items for seamless loop
  const items = [...affiliations, ...affiliations]

  return (
    <section className="py-20 overflow-hidden">
      <ScrollReveal>
        <div className="marquee-track">
          {items.map((org, i) => (
            <AffiliationItem key={`${org.name}-${i}`} name={org.name} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
