# Design audit — 2026-10-17

## What is working

- The React, TypeScript, Vite and React Three Fiber foundation is stable. Desktop canvas rendering is capability-gated; touch, reduced-motion and lower-capacity devices receive a static experience.
- The portfolio already has direct routes, a SPA fallback, static artwork fallbacks and Netlify/Vercel configuration.
- The architectural palette, warm pathway and restrained type pairing establish a useful starting vocabulary.
- The three approved case-study data records are accurate in intent and can remain the content source of truth.

## What weakens the current experience

- The arrival scene reads as a procedural game-city: repeated facades, numerous pins, a character, a route and two navigation systems compete for attention. The visitor has to parse the scene before understanding Derin.
- The composition carries legacy project landmarks, so the visual story does not match the current three-project curation.
- Small monospace overlays are visually delicate but do not establish hierarchy. The primary statement is crowded by scenic information.
- The current home page moves from a highly cinematic hero to repeated list/ledger structures. It lacks contrast in pacing and editorial composition.
- The CSS reflects iterative layers: desktop-arrival rules are overwritten repeatedly, while mobile is mainly a sequence of reductions. This makes a coherent light treatment and a genuine mobile art direction difficult.
- The work page inherits spatial-map language without making the cases feel materially distinct. The case-study presentation needs stronger project-specific diagrams and source-grounded evidence.

## Redesign direction

Build an **editorial systems atlas**. Mobile becomes the primary readable experience: warm ivory paper, obsidian type, asymmetrical spreads, one decisive action per chapter and three substantial project dossiers. Desktop keeps the architectural atmosphere, but treats it as a quiet, framed backdrop rather than the interface itself. The three destinations become deliberately shaped landmarks, while conventional navigation and content lead the visitor.

Typography carries hierarchy; amber marks human/founder moments; ice blue is reserved for verified system information. Motion should only clarify movement between work, story and architecture.
