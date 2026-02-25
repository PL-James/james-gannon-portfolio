import { motion } from 'framer-motion'
import { hero } from '../data/content'

const badges = [
  { text: 'VP of Product', size: 'lg' },
  { text: 'GAMP 5 Author', size: 'md' },
  { text: 'ICANN NomCom Chair-Elect', size: 'sm' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6">
      {/* Gradient mesh background */}
      <div className="gradient-mesh">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-5 gap-12 items-center relative z-10">
        {/* Left: Name + tagline */}
        <div className="md:col-span-3">
          <motion.h1
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight"
            style={{ color: 'var(--text-heading)' }}
          >
            {hero.name}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="accent-line mt-6 mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base tracking-widest uppercase"
            style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}
          >
            {hero.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: 'var(--text-body)' }}
          >
            {hero.subtitle}
          </motion.p>
        </div>

        {/* Right: Floating credential badges */}
        <div className="md:col-span-2 relative h-64 md:h-96 hidden md:block">
          {badges.map((badge, i) => {
            const positions = [
              { top: '8%', right: '5%', className: 'float-badge' },
              { top: '42%', right: '18%', className: 'float-badge-alt' },
              { top: '68%', right: '0%', className: 'float-badge-slow' },
            ]
            const sizes = { lg: 'text-sm px-5 py-3', md: 'text-xs px-4 py-2.5', sm: 'text-xs px-4 py-2' }
            const pos = positions[i]
            return (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute glass-card ${sizes[badge.size as keyof typeof sizes]} ${pos.className} font-medium`}
                style={{
                  top: pos.top,
                  right: pos.right,
                  color: 'var(--text-heading)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ color: 'var(--accent)', marginRight: '8px' }}>&#9672;</span>
                {badge.text}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'var(--text-muted)' }}
        >
          <div className="w-0.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--text-muted)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
