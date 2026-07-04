# Ayush Ranjan Roy — Portfolio (Next.js)

Fast, accessible, SEO-ready personal portfolio. **Next.js 14 (App Router) · Tailwind · zero heavy deps.**

- Single confident accent, one subtle brand glow (no particle stacks), `prefers-reduced-motion` respected
- SSR metadata + JSON-LD `Person`, `next/font` self-hosted fonts, inline-SVG icons
- Content lives in one file: [`lib/content.js`](lib/content.js)

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Deploy (Vercel)
Import the repo, set **Root Directory = `web`**, framework auto-detects **Next.js**. Deploy.

## To finish
- Add your headshot at `public/images/profile.jpg` (falls back to an "AR" monogram if absent).
- Export `public/og.svg` → `public/og.png` (1200×630) for rich link previews.
- Optional: set `FORMSPREE_ID` in `components/Contact.jsx` to enable AJAX contact (otherwise the form opens a prefilled email).
