import { motion } from 'framer-motion'
import { hero } from '../data/content'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="gradient-mesh">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Glow behind name */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '200px',
          background: 'radial-gradient(ellipse, rgba(0,221,179,0.06) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-center relative z-10"
        style={{ color: 'var(--text-heading)' }}
      >
        {hero.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 text-sm md:text-base tracking-widest uppercase text-center relative z-10"
        style={{ color: 'var(--accent)', letterSpacing: '0.2em' }}
      >
        {hero.tagline}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 text-base md:text-lg max-w-2xl text-center leading-relaxed relative z-10"
        style={{ color: 'var(--text-body)' }}
      >
        {hero.subtitle}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10"
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
