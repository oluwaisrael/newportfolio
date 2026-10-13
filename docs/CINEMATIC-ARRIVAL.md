# Cinematic arrival — Phase 1

Branch: `feat/cinematic-arrival`. Scene implementation milestone: `e07ce18`.

## Reference and scope

The requested `references/arrival.png` and `references/world-storyboard.png` were absent from the checkout. Both images attached to the task were visually inspected and used as the composition references; no replacement design reference was invented. The attached arrival image contains no interface, so the supplied written copy and interface requirements determine the HTML overlay. Blender was not installed.

Only the arrival environment was rebuilt. Existing project worlds, data, routes, Ask, Lab, quality selection, sound, visibility suspension, error boundary, and capability-based fallbacks remain in place. No supplied reference image is used as a desktop background. The mobile and reduced-motion stills are captures of this implementation.

## Files and scene architecture

| Files                                                     | Purpose                                                                                                                                                               |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/experience/arrival/ArrivalWorld.tsx`                 | Arrival assembly, materials, district landmarks and pointer navigation, localized haze and entrance light halos.                                                      |
| `src/experience/arrival/geometry.ts`                      | Original merged architectural batches: ribbed central spine, rounded wing towers, buttresses, viaducts, pylons, skyline, entrance lights, pavement joints and verges. |
| `src/experience/arrival/Atmosphere.tsx`                   | Procedural cloud texture baked once at load, environment illumination, directional lights and distance fog.                                                           |
| `src/experience/arrival/WetGround.tsx`                    | Real planar scene reflection, quality-scaled render target, procedural wetness and ripple distortion.                                                                 |
| `src/experience/arrival/Surveyors.tsx`                    | Original small human silhouettes, merged and reused to establish scale.                                                                                               |
| `src/experience/arrival/route.ts`                         | Authored eye/target splines and future destination identifiers.                                                                                                       |
| `src/experience/CameraRig.tsx`                            | Damped spline traversal, subtle pointer parallax, arrival framing and preserved destination cameras.                                                                  |
| `src/experience/ExperienceCanvas.tsx`                     | Initial perspective camera and longer viewing distance.                                                                                                               |
| `src/experience/World.tsx`                                | Selects the arrival world only on the home route.                                                                                                                     |
| `src/experience/WorldLayer.tsx`                           | Arrival-specific fallback styling while preserving the existing canvas lifecycle.                                                                                     |
| `src/experience/RuntimeQuality.tsx`                       | Performance counters include reflection and main passes.                                                                                                              |
| `src/routes/Home.tsx`                                     | Required headline and four-line copy, native-scroll entry, accessible eight-destination index.                                                                        |
| `src/styles/home.css`, `world.css`, `mobile.css`          | Peripheral interface layout, contrast, responsive copy, static arrival artwork.                                                                                       |
| `public/images/arrival-still.webp`, `arrival-mobile.webp` | Static fallbacks captured from the genuine scene.                                                                                                                     |
| `tests/browser/arrival.spec.ts`                           | Native scroll/return at pedestrian height and reduced-motion entry navigation.                                                                                        |
| `scripts/arrival-review.mjs`                              | Repeatable screenshots, quality measurements, static asset generation and mobile canvas check.                                                                        |
| `docs/arrival-captures/`                                  | Captures and measured runtime report.                                                                                                                                 |

The five main architectural material groups use merged geometry instead of a draw call for every louver or panel. Weathering uses an original procedural texture. The material palette combines dark concrete, weathered metal, selective reflective paving and warm entrance slits, with restrained district signals. Clouds are a baked environment texture, not a full-screen reference photograph. Reflections redraw actual scene geometry into a render target.

## Camera and interaction

At 1536 × 960, the starting eye is `[0, 2.8, 52]`, target `[-5, 35, -55]`, with a 62° perspective field of view. The low camera looks toward the monumental structure rather than down onto a map.

Native document scrolling supplies normalized progress to separate `CatmullRomCurve3` eye and target paths. Arc-length sampling and exponential damping keep speed and orientation smooth. The first leg ends at `[0, 3.2, -9]`. Pointer offsets are limited to 0.28 metres horizontally and 0.12 vertically. No wheel handler cancels native scrolling. The entry action scrolls into the approach; reduced-motion and static visitors go straight to the HTML destination index. Future route identifiers include all five projects, About, Lab and Contact; later cinematic legs are intentionally not implemented in this phase.

At 800 pixels of scroll, the captured eye was approximately `[0.99, 2.91, 23.80]`, with route progress 0.463. The browser test also verifies returning to the initial shot. Project district meshes support pointer navigation, with equivalent HTML links in the world index.

## Visual comparison and captures

Actual browser captures were opened and visually inspected against the attached arrival reference at each major refinement. The initial version was too narrow and dark. Subsequent revisions broadened the tower, corrected fog attachment, raised the authored look target, rounded the wing towers, added weathering and bridge detailing, softened entrance illumination, and added human scale cues.

- [Arrival with interface, 1536 × 960](arrival-captures/arrival-ui.png)
- [Geometry without HTML or vignette, 1536 × 960](arrival-captures/arrival-geometry.png)
- [After native scrolling, 1536 × 960](arrival-captures/arrival-scroll.png)
- [Low quality](arrival-captures/arrival-low.png)
- [High quality](arrival-captures/arrival-high.png)
- [Mobile static experience, 390 × 844](arrival-captures/arrival-mobile.png)
- [Runtime measurements](arrival-captures/report.json)

The result reconstructs the principal composition: low viewpoint, dominant central ribbed architecture, flanking bridges, a paved route, distant silhouettes, warm entrance lights and wet reflections. It is not photorealistically equivalent to the reference. The architecture remains more regular and symmetrical; surface wear is less varied; the cloudy sky has no true volumetric scattering; bridge supports and human figures are simplified. Fog and translucent haze approximate atmospheric depth. Lighting does not implement full global illumination or contact-shadow realism. The reflection is a single planar approximation. District color signals are deliberately subtle and partially occluded from the starting view. The desktop screenshot and supplied reference also have different aspect ratios, so framing cannot match every edge simultaneously.

The interface is an implementation of the written brief, not a claim of pixel matching an unavailable UI reference. These remaining visual differences should be evaluated from the captures rather than treated as exact reference parity.

## Performance and accessibility

The local headless Chrome renderer identified itself as `ANGLE Metal Renderer: Apple M1`. At 1536 × 960, short runtime samples measured 60 fps at low, balanced and high settings. The final arrival frame recorded 57 draw calls and 48,110 triangles including reflection rendering, with 38 geometries and six textures. These are short local samples, not a long-duration thermal or battery benchmark, and the MacBook model was not independently verified.

A per-frame procedural cloud shader initially measured approximately 17 fps. Baking those clouds once removed that bottleneck. Reflection targets are 384, 768 and 1024 pixels for low, balanced and high quality; the existing DPR limits and automatic pressure reduction remain active. Rendering pauses when hidden or covered by reading content. Mobile, coarse-pointer, low-capacity and reduced-motion contexts retain the static HTML experience without mounting the full world.

## Verification

- Production TypeScript/Vite build passes. Vite retains its warning about the separately loaded Three.js chunk exceeding 500 kB; mobile does not request this chunk.
- Ten Vitest computation tests pass.
- Twenty-two Playwright browser tests pass, covering the new path and static entry behavior, direct route loads and reloads, responsive overflow, keyboard navigation, mobile/coarse-pointer/reduced-motion/low-capacity fallback, quality persistence, sound, Lab, Ask and WebGL failures.
- Production smoke checks pass on all ten routes in desktop and mobile contexts, with zero console or HTTP errors and no mobile scene-chunk downloads.
- ESLint, Prettier and `git diff --check` pass.
- The visual review reported zero browser console errors and zero mobile canvases.

To reproduce captures, start the dev server, then run:

```sh
node scripts/arrival-review.mjs
```

Set `DERIN_PREVIEW_URL` if using a different local port. Pass `--update-stills` to regenerate arrival fallback images from the actual scene. The capture script requires installed Chrome and local browser-launch permissions.
