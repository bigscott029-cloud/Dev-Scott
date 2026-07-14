# Big Scott Portfolio

A premium engineering portfolio for Eluem Chike (Big Scott), built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Structure

- Home: positioning, proof metrics, selected work, and capability overview
- Projects: four resume-backed public case studies
- About Me: summary, education, experience, stack, skills, and contact

## Project Images

Drop screenshots and diagrams into:

- `public/projects/campushub/`
- `public/projects/telegram-automation-platform/`
- `public/projects/adb-hydra/`
- `public/projects/valuxchange/`

Then update the matching `images` block inside `src/App.tsx`.

Example:

```ts
images: {
  hero: '/projects/campushub/hero.png',
  gallery: [
    {
      label: 'Product Screen',
      src: '/projects/campushub/product-screen.png',
      note: 'Main product interface.',
    },
  ],
}
```

## Resume Download

The Download Resume buttons serve the original PDF at:

```txt
public/big-scott-resume.pdf
```

Replace that file to update the public resume.

## Contact Form

The contact form submits without redirecting through FormSubmit's AJAX endpoint:

```txt
https://formsubmit.co/ajax/chikeeluem171@gmail.com
```

On first use, FormSubmit may send an activation email to confirm the address. After that, client messages submit in-page and show a success popup.

## Auto-Updating Metrics

Experience years are calculated from `EXPERIENCE_START_YEAR` in `src/App.tsx`.

Project timelines use each project's `started` year and render as `YYYY - Present` automatically when the current year has moved beyond the start year.

## Scanning Beam Effect

The military-style scan is made from:

- `SiteBackground()` in `src/App.tsx`
- `.scan-beam` in `src/index.css`

Framer Motion animates a thin gradient strip from above the viewport to below it:

```tsx
<motion.div
  className="scan-beam"
  animate={{ y: ['-18vh', '118vh'] }}
  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
/>
```

The CSS gives the strip its glowing tactical feel with layered gradients, opacity, and `mix-blend-mode: screen`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production Build

```bash
npm run build
```

## Deploy

This is a Vite app. It can be hosted on Vercel, Netlify, Render static sites, or GitHub Pages with the right base path configuration.

## GitHub Repo

Recommended new repo name:

```txt
Dev-BigScott
```

If GitHub CLI is authenticated, create and push with:

```bash
gh repo create Dev-BigScott --public --source=. --remote=bigscott --push
```
