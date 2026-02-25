# James Gannon Portfolio — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dark-themed, scroll-animated single-page portfolio site for James Gannon, deployed to Cloudflare Pages.

**Architecture:** React 18 SPA with Vite bundler. All content centralized in a data file. Framer Motion handles scroll-triggered animations via a reusable `ScrollReveal` wrapper. Contact form POSTs to a Cloudflare Pages Function that sends email via Resend API. Deployed to Cloudflare Pages at `portfolio.policywonk.xyz`.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v3, Framer Motion, Cloudflare Pages Functions, Resend API

**Design doc:** `docs/plans/2026-02-25-portfolio-design.md`

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`

**Step 1: Initialize project with Vite**

```bash
cd /home/claude/websites/james-gannon-portfolio
npm create vite@latest . -- --template react-ts
```

If prompted about existing directory, allow overwrite of package.json only.

**Step 2: Install dependencies**

```bash
cd /home/claude/websites/james-gannon-portfolio
npm install framer-motion
npm install -D tailwindcss @tailwindcss/vite
```

**Step 3: Configure Tailwind**

Replace `src/index.css` with:

```css
@import "tailwindcss";

:root {
  --bg-primary: #0a0a0f;
  --bg-card: #12121a;
  --bg-card-hover: #1a1a25;
  --accent: #2dd4bf;
  --accent-dim: #1a9e8f;
  --text-heading: #f0f0f5;
  --text-body: #94a3b8;
  --text-muted: #64748b;
  --border: #1e293b;
}

@font-face {
  font-family: 'Playfair Display';
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background-color: var(--bg-primary);
  color: var(--text-body);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  color: var(--text-heading);
}

/* Noise texture overlay */
.noise-bg::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

**Step 4: Update `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="James Gannon — Healthcare Technology, Trust Architecture, Internet Governance" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
    <title>James Gannon — Healthcare Technology & Trust Architecture</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 5: Update `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**Step 6: Create minimal `App.tsx`**

```tsx
function App() {
  return (
    <div className="noise-bg min-h-screen">
      <h1 className="text-4xl text-center pt-20" style={{ fontFamily: 'Playfair Display', color: 'var(--text-heading)' }}>
        James Gannon
      </h1>
    </div>
  )
}

export default App
```

**Step 7: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0a0a0f"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#2dd4bf" font-family="serif" font-size="20" font-weight="700">G</text>
</svg>
```

**Step 8: Verify dev server starts**

```bash
cd /home/claude/websites/james-gannon-portfolio && npm run dev -- --host 0.0.0.0 --port 5180
```

Expected: Vite dev server starts, page renders dark background with "James Gannon" heading.

**Step 9: Initialize git and commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git init
echo "node_modules/\ndist/\n.env\n.wrangler/" > .gitignore
git add .
git commit -m "chore: scaffold portfolio with Vite, React, Tailwind, Framer Motion"
```

---

## Task 2: Content Data Layer

**Files:**
- Create: `src/data/content.ts`

**Step 1: Create centralized content file**

All site text lives in one file for easy editing. Create `src/data/content.ts`:

```ts
export const hero = {
  name: 'James Gannon',
  tagline: 'Healthcare Technology · Trust Architecture · Internet Governance',
  subtitle: 'VP of Quality, Trust & Safety at PharmaLedger Association. Building digital trust ecosystems for global healthcare.',
}

export const about = {
  bio: `A healthcare technology leader with over 15 years of experience spanning pharmaceutical quality, cybersecurity, internet governance, and digital trust infrastructure. Currently leading quality, trust, and safety at the PharmaLedger Association — a Swiss not-for-profit building open-source platforms for the global healthcare ecosystem.

Previously directed technology quality compliance at Novartis, co-founded and served as CISO at healthtech startup Lyfegen, and chaired the Board of Public Technical Identifiers (PTI) — the organization responsible for coordinating the Internet's unique identifiers under ICANN.`,
  stats: [
    { label: 'Years in Healthcare Tech', value: '15+' },
    { label: 'Former PTI Board Chair', value: 'ICANN' },
    { label: 'NomCom Chair-Elect', value: '2026' },
    { label: 'Healthtech Co-founder', value: 'Lyfegen' },
  ],
}

export const timeline = [
  {
    year: '2024–Present',
    role: 'Chair-Elect, Nominating Committee',
    org: 'ICANN',
    description: 'Leading the selection process for ICANN Board of Directors positions, shaping global internet governance.',
  },
  {
    year: '2021–Present',
    role: 'VP of Quality, Trust & Safety',
    org: 'PharmaLedger Association',
    description: 'Overseeing compliance, risk management, and safety for open-source healthcare platforms serving the global pharmaceutical ecosystem.',
  },
  {
    year: '2022–2023',
    role: 'Chair, Board of Directors',
    org: 'Public Technical Identifiers (PTI)',
    description: 'Chaired the board overseeing IANA functions — the critical infrastructure coordinating the Internet\'s unique identifiers.',
  },
  {
    year: '2019–2021',
    role: 'Managing Partner & Angel Investor',
    org: 'Quality Accelerator',
    description: 'Invested in and accelerated early-stage healthcare and compliance technology ventures.',
  },
  {
    year: '2018–2020',
    role: 'Co-founder & CISO',
    org: 'Lyfegen',
    description: 'Co-founded a healthtech startup focused on outcome-based healthcare pricing. Led information security and data protection.',
  },
  {
    year: '2015–2018',
    role: 'Director, Technology Quality Compliance',
    org: 'Novartis',
    description: 'Directed technology quality and compliance across pharmaceutical operations at one of the world\'s largest pharmaceutical companies.',
  },
]

export const expertise = [
  {
    title: 'Product Trust & Quality',
    description: 'GxP compliance, Computer Software Assurance (CSA), pharmaceutical quality systems, and validation frameworks for regulated healthcare environments.',
    icon: 'shield',
  },
  {
    title: 'Internet Governance',
    description: 'ICANN policy development, IETF DNS security, IANA stewardship, and multi-stakeholder governance models for critical internet infrastructure.',
    icon: 'globe',
  },
  {
    title: 'Healthcare Technology',
    description: 'Blockchain and DLT in pharma, digital trust ecosystems, electronic product information (ePI), and supply chain traceability.',
    icon: 'heart',
  },
  {
    title: 'Security & Compliance',
    description: 'CISO-level security architecture, threat modeling, risk management, and security operations across healthcare and internet infrastructure.',
    icon: 'lock',
  },
]

export const affiliations = [
  { name: 'PharmaLedger Association', url: 'https://pharmaledger.org' },
  { name: 'ICANN', url: 'https://icann.org' },
  { name: 'Novartis', url: 'https://novartis.com' },
  { name: 'Equideum Health', url: 'https://equideum.health' },
  { name: 'Lyfegen', url: 'https://lyfegen.com' },
  { name: 'BSides Las Vegas', url: 'https://bsideslv.org' },
]

export const socials = {
  linkedin: 'https://linkedin.com/in/jaygannon',
  twitter: 'https://x.com/JJayGannon',
}

export const contact = {
  heading: 'Get in Touch',
  subheading: 'Interested in collaboration, advisory opportunities, or speaking engagements? Drop me a message.',
}
```

**Step 2: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add src/data/content.ts
git commit -m "feat: add centralized content data layer"
```

---

## Task 3: ScrollReveal Component

**Files:**
- Create: `src/components/ScrollReveal.tsx`

**Step 1: Create reusable scroll-animation wrapper**

```tsx
import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**Step 2: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add src/components/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal animation wrapper component"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`

**Step 1: Build hero component**

```tsx
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
```

**Step 2: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add src/components/Hero.tsx
git commit -m "feat: add Hero section with animated entrance and scroll indicator"
```

---

## Task 5: About Section

**Files:**
- Create: `src/components/About.tsx`

**Step 1: Build about component**

```tsx
import { ScrollReveal } from './ScrollReveal'
import { about } from '../data/content'

export function About() {
  return (
    <section className="px-6 py-32 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2
          className="text-3xl md:text-4xl font-bold mb-16"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          About
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-5 gap-12 md:gap-16">
        <div className="md:col-span-3">
          <ScrollReveal delay={0.1}>
            <div className="space-y-4 text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-body)' }}>
              {about.bio.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-6">
            {about.stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={0.2 + i * 0.1}>
                <div
                  className="p-5 rounded-lg border"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
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
```

**Step 2: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add src/components/About.tsx
git commit -m "feat: add About section with bio and stats grid"
```

---

## Task 6: Career Timeline Section

**Files:**
- Create: `src/components/Timeline.tsx`

**Step 1: Build timeline component**

```tsx
import { ScrollReveal } from './ScrollReveal'
import { timeline } from '../data/content'

export function Timeline() {
  return (
    <section className="px-6 py-32 max-w-4xl mx-auto">
      <ScrollReveal>
        <h2
          className="text-3xl md:text-4xl font-bold mb-16"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Career
        </h2>
      </ScrollReveal>

      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{ backgroundColor: 'var(--border)' }}
        />

        {timeline.map((item, i) => (
          <ScrollReveal key={item.org + item.year} delay={i * 0.1}>
            <div className={`relative flex items-start mb-12 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}>
              {/* Dot */}
              <div
                className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10"
                style={{ backgroundColor: 'var(--accent)' }}
              />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${
                i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
              }`}>
                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
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
```

**Step 2: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add src/components/Timeline.tsx
git commit -m "feat: add Career Timeline section with alternating layout"
```

---

## Task 7: Expertise Section

**Files:**
- Create: `src/components/Expertise.tsx`

**Step 1: Build expertise cards**

```tsx
import { ScrollReveal } from './ScrollReveal'
import { expertise } from '../data/content'

const icons: Record<string, JSX.Element> = {
  shield: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  globe: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  heart: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  lock: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
}

export function Expertise() {
  return (
    <section className="px-6 py-32 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2
          className="text-3xl md:text-4xl font-bold mb-16"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Expertise
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {expertise.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.1}>
            <div
              className="p-8 rounded-xl border transition-colors duration-300"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'
                e.currentTarget.style.borderColor = 'var(--accent-dim)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-card)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              <div style={{ color: 'var(--accent)' }}>{icons[item.icon]}</div>
              <h3 className="text-xl font-semibold mt-4" style={{ color: 'var(--text-heading)' }}>
                {item.title}
              </h3>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                {item.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add src/components/Expertise.tsx
git commit -m "feat: add Expertise section with icon cards"
```

---

## Task 8: Affiliations Section

**Files:**
- Create: `src/components/Affiliations.tsx`

**Step 1: Build affiliations bar**

Text-based logos (no image assets needed), grayscale by default, accent on hover.

```tsx
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
```

**Step 2: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add src/components/Affiliations.tsx
git commit -m "feat: add Affiliations section with hover-accent links"
```

---

## Task 9: Contact Section

**Files:**
- Create: `src/components/Contact.tsx`

**Step 1: Build contact form with social links**

```tsx
import { useState, type FormEvent } from 'react'
import { ScrollReveal } from './ScrollReveal'
import { contact, socials } from '../data/content'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    backgroundColor: 'var(--bg-card)',
    borderColor: 'var(--border)',
    color: 'var(--text-heading)',
  }

  return (
    <section id="contact" className="px-6 py-32 max-w-2xl mx-auto">
      <ScrollReveal>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {contact.heading}
        </h2>
        <p className="mb-12" style={{ color: 'var(--text-body)' }}>
          {contact.subheading}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              type="text"
              required
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1"
              style={{ ...inputStyle, '--tw-ring-color': 'var(--accent)' } as React.CSSProperties}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1"
              style={{ ...inputStyle, '--tw-ring-color': 'var(--accent)' } as React.CSSProperties}
            />
          </div>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your message..."
            className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-1 resize-none"
            style={{ ...inputStyle, '--tw-ring-color': 'var(--accent)' } as React.CSSProperties}
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-8 py-3 rounded-lg text-sm font-medium transition-opacity duration-200 disabled:opacity-50"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p className="text-sm" style={{ color: 'var(--accent)' }}>
              Message sent. I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400">
              Something went wrong. Please try again or reach out on LinkedIn.
            </p>
          )}
        </form>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="flex items-center gap-6 mt-12">
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            aria-label="X (Twitter)"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
```

**Step 2: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add src/components/Contact.tsx
git commit -m "feat: add Contact section with form and social links"
```

---

## Task 10: Footer

**Files:**
- Create: `src/components/Footer.tsx`

**Step 1: Build footer**

```tsx
import { socials } from '../data/content'

export function Footer() {
  return (
    <footer
      className="px-6 py-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
    >
      <span>&copy; {new Date().getFullYear()} James Gannon</span>
      <div className="flex items-center gap-4">
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
          LinkedIn
        </a>
        <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">
          X
        </a>
      </div>
    </footer>
  )
}
```

**Step 2: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add src/components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 11: Assemble App

**Files:**
- Modify: `src/App.tsx`

**Step 1: Wire all sections into App**

```tsx
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Timeline } from './components/Timeline'
import { Expertise } from './components/Expertise'
import { Affiliations } from './components/Affiliations'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="noise-bg min-h-screen">
      <Hero />
      <About />
      <Timeline />
      <Expertise />
      <Affiliations />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
```

**Step 2: Verify dev server renders all sections**

```bash
cd /home/claude/websites/james-gannon-portfolio && npm run dev -- --host 0.0.0.0 --port 5180
```

Expected: All 7 sections render, scroll animations fire, dark theme applied.

**Step 3: Fix any TypeScript/build errors**

```bash
cd /home/claude/websites/james-gannon-portfolio && npx tsc --noEmit
```

Expected: No errors.

**Step 4: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add src/App.tsx
git commit -m "feat: assemble all sections in App"
```

---

## Task 12: Contact Form Backend (Cloudflare Pages Function)

**Files:**
- Create: `functions/api/contact.ts`

**Step 1: Create the Pages Function**

```ts
interface Env {
  RESEND_API_KEY: string
}

interface ContactBody {
  name: string
  email: string
  message: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  try {
    const body = (await context.request.json()) as ContactBody

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers,
      })
    }

    if (!isValidEmail(body.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers,
      })
    }

    if (body.message.length > 5000) {
      return new Response(JSON.stringify({ error: 'Message too long' }), {
        status: 400,
        headers,
      })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <no-reply@policywonk.xyz>',
        to: 'james@policywonk.xyz',
        subject: `Portfolio Contact: ${body.name}`,
        text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
        reply_to: body.email,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers,
      })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers })
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers,
    })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
```

**Step 2: Commit**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add functions/api/contact.ts
git commit -m "feat: add Cloudflare Pages Function for contact form (Resend API)"
```

---

## Task 13: Production Build & Deploy

**Files:**
- Modify: `package.json` (verify build script)

**Step 1: Run production build**

```bash
cd /home/claude/websites/james-gannon-portfolio && npm run build
```

Expected: `dist/` folder created with no errors.

**Step 2: Create GitHub repo and push**

```bash
cd /home/claude/websites/james-gannon-portfolio
source /home/claude/.tokens
gh repo create PL-James/james-gannon-portfolio --public --source=. --remote=origin --push
```

**Step 3: Deploy to Cloudflare Pages**

```bash
source /home/claude/.tokens
npx wrangler pages project create james-gannon-portfolio --production-branch=main
npx wrangler pages deploy dist/ --project-name=james-gannon-portfolio
```

**Step 4: Set Resend API key as environment variable**

```bash
source /home/claude/.tokens
npx wrangler pages secret put RESEND_API_KEY --project-name=james-gannon-portfolio <<< "$RESEND_API_KEY"
```

**Step 5: Configure custom domain**

```bash
source /home/claude/.tokens
# Add CNAME record for portfolio.policywonk.xyz -> james-gannon-portfolio.pages.dev
npx wrangler pages deployment list --project-name=james-gannon-portfolio
```

Then add the custom domain via Cloudflare dashboard or API.

**Step 6: Commit any final adjustments**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add -A && git commit -m "chore: production build and deployment config" && git push
```

---

## Task 14: README

**Files:**
- Create: `README.md`

**Step 1: Write project README**

```markdown
# James Gannon — Portfolio

Personal portfolio site. Dark theme, scroll-animated, single-page.

## Tech Stack

- React 18, TypeScript, Vite
- Tailwind CSS, Framer Motion
- Cloudflare Pages + Functions (contact form via Resend)

## Development

```bash
npm install
npm run dev
```

## Deployment

Deployed to Cloudflare Pages at `portfolio.policywonk.xyz`.

```bash
npm run build
npx wrangler pages deploy dist/ --project-name=james-gannon-portfolio
```

Environment variables (set via `wrangler pages secret put`):
- `RESEND_API_KEY` — for contact form email delivery
```

**Step 2: Commit and push**

```bash
cd /home/claude/websites/james-gannon-portfolio
git add README.md
git commit -m "docs: add project README"
git push
```
