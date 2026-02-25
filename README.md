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
