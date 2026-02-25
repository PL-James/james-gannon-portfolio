import { motion } from 'framer-motion'
import { hero } from '../data/content'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(45,212,191,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(45,212,191,0.05) 0%, transparent 60%)',
          }}
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center"
        style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-heading)' }}
      >
        {hero.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-6 text-lg md:text-xl tracking-wide text-center"
        style={{ color: 'var(--accent)', letterSpacing: '0.15em' }}
      >
        {hero.tagline}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-4 text-base md:text-lg max-w-2xl text-center"
        style={{ color: 'var(--text-body)' }}
      >
        {hero.subtitle}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
          style={{ borderColor: 'var(--text-muted)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ backgroundColor: 'var(--text-muted)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
