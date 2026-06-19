# VN Partner System — Interactive Presentation

Interactive Next.js presentation for the VN Partner Program 2026.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Motion (animations)
- Recharts (market slide)
- Lucide React (icons)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3010](http://localhost:3010).

**v2 (dark + gold palette):** [http://localhost:3010/v2](http://localhost:3010/v2)

## Navigation

- **Arrow keys** or **Space** — next scene
- **Arrow Left** — previous scene
- **Bottom dots** — jump to scene
- **Swipe** — horizontal on touch devices

## Deploy to Netlify

1. Push this repository to GitHub.
2. In [Netlify](https://app.netlify.com), choose **Add new site → Import an existing project**.
3. Connect the GitHub repository.
4. Netlify detects Next.js automatically via `netlify.toml`:
   - **Build command:** `npm run build`
   - **Plugin:** `@netlify/plugin-nextjs`
5. Deploy.

No environment variables are required for the live presentation.

## Export slides (local)

Generate PNG slides and a PDF with finished animations:

```bash
npm run export:slides   # PNG + PDF → exports/
npm run export:pdf      # PDF only
```

## Structure

- `src/components/presentation/scenes/` — 7 interactive scenes
- `src/lib/content/de.ts` — German copy
- `src/lib/career-tiers.ts` — commission tiers (50–230 €/m²)
- `public/assets/` — logos and house images
