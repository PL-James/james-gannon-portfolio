# James Gannon Portfolio Site — Design Document

**Date:** 2026-02-25
**Status:** Approved
**Deploy target:** Cloudflare Pages at `portfolio.policywonk.xyz`

## Overview

Single-page personal portfolio site for James Gannon. Dark theme, executive/polished tone, scroll-animated sections. Primary audience: industry peers and recruiters. Goal: establish credibility and career narrative.

## Research Summary

**James Gannon** — Dublin, Ireland

- **Current:** VP of Quality, Trust & Safety at PharmaLedger Association (Swiss not-for-profit healthcare tech ecosystem)
- **Current:** Chair-Elect, 2026 ICANN Nominating Committee
- **Previous:** Director of Technology Quality Compliance at Novartis; CISO & Co-founder at Lyfegen; Managing Partner & Angel Investor at Quality Accelerator
- **Board/Advisory:** Former Chair of PTI Board (2022-2023); Advisor at Equideum Health; GNSO Council member (2020-2022)
- **Technical:** IETF DNS directorate reviewer; IANA stewardship transition contributor; SSR2 Review Team member; BSides Las Vegas Sr. Staff
- **Themes:** Healthcare + trust infrastructure, internet governance, security, open-source ecosystems, blockchain/DLT in pharma

## Visual Language

- **Background:** Near-black (#0a0a0f) with subtle noise texture
- **Primary accent:** Deep teal/cyan (#2dd4bf range) — healthcare + tech signal
- **Text:** Off-white (#f0f0f5) headings, muted gray (#94a3b8) body
- **Typography:** Inter (body), Playfair Display or Cormorant (serif section headings)
- **Spacing:** Generous whitespace, 120-160px section padding
- **Animations:** Framer Motion scroll-triggered — fade-up on entry, stagger for lists, subtle parallax on hero. 0.6-0.8s duration, ease-out curves.

## Page Sections

### 1. Hero
- Full viewport height
- "James Gannon" large serif, animated entrance
- Tagline: "Healthcare Technology · Trust Architecture · Internet Governance"
- Subtle animated gradient/mesh background (dark, slow-moving)
- Scroll indicator at bottom

### 2. About
- 2-column layout: narrative bio (left), key stats (right)
- Stats: "15+ years in healthcare tech" / "PTI Board Chair" / "ICANN NomCom Chair-Elect" / "Co-founder, Lyfegen"
- Fade-in on scroll

### 3. Career Timeline
- Vertical timeline, alternating left/right
- Milestones: Novartis → Lyfegen → Quality Accelerator → PharmaLedger → ICANN NomCom
- Each: role title, org, year range, one-line description
- Stagger-animated on scroll

### 4. Expertise Areas
- 4-card grid:
  1. Product Trust & Quality — GxP, CSV/CSA, healthcare quality systems
  2. Internet Governance — ICANN, IETF, DNS security, IANA stewardship
  3. Healthcare Technology — Blockchain in pharma, digital trust ecosystems, ePI
  4. Security & Compliance — CISO experience, BSides, threat modeling, risk management
- Cards stagger-animate in

### 5. Affiliations
- Logo bar: PharmaLedger, ICANN, Novartis, Equideum Health, Lyfegen, BSides
- Muted/grayscale, brighten on hover

### 6. Contact
- Form: Name, Email, Message
- Cloudflare Pages Function → Resend API → james@policywonk.xyz
- Social links: LinkedIn + X icons

### 7. Footer
- Minimal: "James Gannon" + year + social icons

## Technical Architecture

```
websites/james-gannon-portfolio/
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Timeline.tsx
│   │   ├── Expertise.tsx
│   │   ├── Affiliations.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollReveal.tsx
│   ├── data/
│   │   └── content.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── functions/
│   └── api/
│       └── contact.ts
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

**Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
**Contact form backend:** Cloudflare Pages Function with Resend API
**Deployment:** Cloudflare Pages, custom domain `portfolio.policywonk.xyz`

## Contact Form Backend

- Cloudflare Pages Function at `/api/contact`
- Validates: name, email, message (required, email format)
- Sends via Resend API to james@policywonk.xyz
- Returns JSON success/error response
