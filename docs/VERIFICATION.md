# Rebuild delivery and verification

## Archive and Git

- Original clean commit: `79ad780`.
- Archive branch: `archive/pre-world-rebuild`.
- Archive tag: `pre-world-rebuild`.
- Both archive refs were pushed before the old application was removed.
- Rebuild branch: `feat/derin-world-rebuild`.
- Main was not merged or rewritten.
- Commit count and final SHA are reported in the delivery message; reproduce with
  `git rev-list --count pre-world-rebuild..HEAD` and `git rev-parse HEAD`.

## Architecture

React 19, strict TypeScript, Vite and React Router. Ten directly addressable routes.
Structured project data drives the map, cases and navigation. Local Space Grotesk,
Manrope and IBM Plex Mono fonts. Source-grounded copy, responsive real photography,
semantic HTML, visible focus and a skip link.

One lazy React Three Fiber Canvas persists across route navigation. The world
controller connects route state, native scroll progress and Ask highlights. The
camera exponentially damps toward predefined viewpoints with small pointer offsets.
Entry observations precede a seven-second architectural formation. No scroll library,
physics engine, postprocessing stack or central hero object is used.

## Environments

- Entry: procedural lowlands, contour terraces, distributed structures, samples and signals.
- PriceUniverse: processing towers, history line, intermittent collection pulses.
- UniRAG: 144 instanced document fragments with two candidate groups and convergence.
- Neural network: illustrative 28×28 input, layered nodes and activation propagation.
- Roam: ranked candidate platforms whose prominence changes.
- Lael: sparse native-presence installation and a small waveform.

Each has an HTML case study and a distinct rendered static alternative. These are
explanatory environments, not live data, trained-model outputs or screenshots of the
original products. The three Lab experiments perform real browser calculations;
all sample data and simplified models are identified.

## Mobile and fallback

At widths ≤900px, with a coarse pointer, reduced motion, ≤2 available logical CPUs,
or an exposed memory budget ≤4GB, the full Canvas is not mounted. WebGL creation
failure and runtime context loss also preserve the static artwork and all content.
Production verification confirmed zero realtime scene-chunk requests on mobile.
Static artwork is original output from this world, compressed to WebP, with distinct
project views. No video, fake joystick or small canvas controls are required.

## Portrait

Selected source: `oluwaisrael/Portfolio/public/images/green.jpeg` (608×1080).
Retained original: `public/images/derin-original.jpeg`.
Displayed: `public/images/derin-portrait-608.webp` with a 400px responsive derivative.
Direct eye contact, even lighting, full silhouette and the Lagos wall made it the
strongest original photo. CSS applies monochrome and a soft lower-edge mask. No face
was generated. See `ASSETS.md` for the complete comparison and content sources.

## Performance

- Low / balanced / high DPR: 1 / 1.25 / 1.5.
- Observation budgets: 240 / 600 / 1,000.
- Landscape instance budgets: 40 / 65 / 90.
- Terrain subdivisions: 50 / 80 / 110.
- Runtime sampling may lower the default after sustained <30 FPS; explicit settings win.
- Instanced architecture, document fragments, infrastructure and neural layers.
- Stable seeded buffers; no per-frame React updates or newly allocated vectors.
- Frame loop pauses in hidden tabs and after opaque reading content covers the world.
- No shadows, postprocessing, external model assets or GPU textures.
- Development measurements at 1440×900 and 1600×1000: 60 FPS, 126 draw calls,
  22,978 triangles, 126 geometries, 0 textures. Measured in local headless Chrome;
  this is not a benchmark of every M1/ordinary laptop or sustained thermal behavior.
- Production application JS: 79.60 kB / 27.68 kB gzip.
- Shared React runtime: 221.88 kB / 69.05 kB gzip.
- Deferred Three/R3F engine: 872.08 kB / 234.51 kB gzip.
- Deferred scene: 16.49 kB / 5.40 kB gzip, plus an 8.40 kB support chunk.
- CSS: 21.93 kB / 5.64 kB gzip.
- Home static artwork: 19.3 kB desktop, 7.8 kB mobile. Project stills: 25–43 kB.
- Vite reports its standard >500 kB warning for the deferred 3D engine. It is not
  preloaded or requested by the mobile/static path.

## Accessibility and preferences

Every project is reachable through ordinary links. Canvas is hidden from assistive
technology and never the only navigation surface. Route changes reset content focus;
initial load preserves the skip-link tab order. Reduced motion uses a still scene,
removes parallax/flight, and disables cosmetic CSS animation. Native scroll remains
functional. Sound is off by default, starts only after a gesture, is visibly mutable,
and pauses while hidden. Sound and explicit graphics preferences are local only.

## Exact verification

- `npm run typecheck` — passed.
- `npm run lint` — passed, no disabled rules or ignored TypeScript errors.
- `npm run format:check` — passed.
- `npm test` — 10/10 tests passed (statistics, retrieval, neural model and data invariants).
- `npm run build` — passed; deferred engine size warning noted above.
- `npm run test:e2e` — 20/20 tests passed, 36.4 seconds in the final full run.
- `node scripts/visual-review.mjs` — completed, zero page errors. Captures at
  1440×900, 1600×1000, 390×844 and 430×932; artifacts in `/tmp/derin-review`.
- `node scripts/production-smoke.mjs` against `npm run preview -- --port 4173` —
  all 10 production routes passed on desktop and mobile; zero console/HTTP errors;
  mobile scene requests: 0.
- `git diff --check` — passed.

Browser coverage includes all direct route reloads, widths 320/375/390/430/768/1024/
1280/1440/1660, no horizontal overflow, coarse pointers, reduced motion, weak hardware,
initial WebGL failure, runtime context loss, keyboard navigation, Ask links, live Lab
controls, sound mute, explicit graphics persistence and single-Canvas route behavior.

## Boundaries

No reference image was attached, so visual work follows the written art direction.
Ask is an authored guide, not a production AI integration. No public Lael implementation
was available; its case describes the supplied direction and building status. No fake
screenshots, employment, metrics or testimonials were added. The branch is delivered to
GitHub without merging main or creating a public deployment. Static-host rewrites are
provided, but no remote hosting configuration was exercised. Safari/Firefox and physical
mobile devices were not available for browser testing.
