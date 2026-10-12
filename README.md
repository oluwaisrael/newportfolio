# Derin / Systems World

An original spatial portfolio for Adeoti Israel: Statistics at the University of
Lagos, backend engineering, AI/ML and creative technology. Desktop uses one
persistent React Three Fiber world. Mobile, coarse pointers, reduced motion,
conservative low-capacity devices and WebGL failure use static scene renders.

## Develop

Node 24 and npm are recommended.

```sh
npm ci
npm run dev
```

The local URL is `http://127.0.0.1:5173`. Content and navigation are ordinary React
DOM; the world enhances them. All fonts are local. No API key or environment secret
is required. Ask is explicitly an authored guide, not a simulated AI backend.

## Verify

```sh
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build
npm run test:e2e
```

Browser tests use installed Google Chrome. CI installs it with
`npx playwright install --with-deps chrome`. Tests cover all ten routes, direct
reloads, nine viewport widths, keyboard focus, graphics preferences, audio,
interactive labs and no-WebGL / no-motion / touch fallbacks.

`node scripts/visual-review.mjs` captures 1440×900, 1600×1000, 390×844 and 430×932
screenshots in `/tmp/derin-review`, records development-only renderer metrics, and
refreshes the shipped static WebP artwork from the actual scene. Run while the dev
server is active and source files are not being edited.

## Structure

- `src/data/projects/`: source-grounded case studies; one shared registry.
- `src/routes/`: arrival, map, cases, About, Lab and Ask.
- `src/experience/WorldController.tsx`: route state, native scroll and guide focus.
- `CameraRig.tsx`: damped fixed viewpoints and restrained pointer parallax.
- `World.tsx`: one landscape; shared terrain, architecture and project worlds.
- `quality.ts`, `RuntimeQuality.tsx`: conservative budgets and frame sampling.
- `src/lab/`: inspectable statistical, retrieval and neural models.
- `src/services/`: authored Ask provider contract and opt-in Web Audio ambience.

## Deploy

`npm run build` emits `dist/`. Serve it as a single-page application with fallback
to `index.html`. `public/_redirects` supports Netlify-compatible hosting and
`vercel.json` supplies route rewrites on Vercel. Vite preview also supports direct
route reloads. GitHub Pages requires a separate SPA routing setup and is not
configured automatically. No production deployment was requested or created.

## Preservation and sources

Original state: `79ad780`, archived as `archive/pre-world-rebuild` and
`pre-world-rebuild`. Rebuild: `feat/derin-world-rebuild`; main remains untouched.
See [asset provenance](docs/ASSETS.md) and [verification report](docs/VERIFICATION.md).

No generated portrait, fake project screenshots, invented employment, client
claims or unverified performance metrics are used. Project environments and lab
models are explanatory simulations, not live production project data.
