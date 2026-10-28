# Shahed Al Rina — Portfolio

Next.js 16 + React Three Fiber portfolio with a 3D "crystal blossom" hero, light/dark themes and a fully responsive layout.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Edit content
The site is bilingual — English (`/en`) and Arabic (`/ar`, right-to-left).
- **`data/content.ts`** — bio, skills, experience, courses and project stories, in both languages.
- **`data/ui.ts`** — buttons, section titles and other interface text, in both languages.

Visiting `/` redirects to the visitor's last chosen language, otherwise their browser language (`proxy.ts`).

## Structure
- `components/three/BlossomScene.tsx` — the 3D flower (petal rings that bloom open, iridescent glass material, pearl heart, orbiting pearls, sparkles). Colors per theme are in `PALETTES`.
- `components/Hero.tsx` — hero; the 3D canvas is lazy-loaded (client only) and pauses when off-screen.
- `components/Sections.tsx` — About (letter + stamp), Skills (garden beds), Journey (scroll-drawn thread), Work (tilt postcards), Learning, Contact.
- `components/Intro.tsx` — the welcome screen shown on every visit (about 2.6s, skippable; not replayed when switching language). Its timing is `DURATION`; the hero's entrance animations wait for it.
- `components/ThemeToggle.tsx` — theme switch with a circular reveal (View Transitions API).
- `app/globals.css` — design tokens for both themes at the top (`:root` and `.dark`).

## Deploy
Push to GitHub and import on Vercel (zero config).
