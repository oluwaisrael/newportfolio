# Asset and content audit

## Original checkout

Every image outside dependencies/build output was inspected: `assets/neural-brain.png`
and `assets/neural-brain-real.png`. Both are generated anatomical imagery, unsuitable
for the new brief. Original bytes remain in `archive/pre-world-rebuild`. There were
no portraits, screenshots, fonts, environment files or deployment configuration.
The attached request contained text only, with no reference bitmap.

## Public source recovery

Source: https://github.com/oluwaisrael/Portfolio/tree/main/public/images
Downloaded to a temporary audit directory, not copied wholesale into the application.

| Candidate | Resolution / quality | Assessment |
| --- | --- | --- |
| green.jpeg | 608 × 1080, original photo | Selected. Direct eye contact, full silhouette, even light, contextual Lagos wall; works as an editorial installation. |
| derin-cutout.png | 945 × 1680, processed cutout | Same pose; larger dimensions do not add original photo detail. Cutout edges show artifacts. |
| israel.jpeg | 768 × 1024, original photo | Strong clothing and silhouette, but face down and shaded. |
| israel-cutout.png | 1086 × 1448, processed cutout | Expressive gesture, but obscured face and processed edges. |
| me.jpeg | 608 × 1080 | Face down, small subject, busy architecture; less flexible crop. |
| WhatsApp Image 2026-09-14 at 14.26.02.jpeg | 608 × 1080 | Byte-identical duplicate of me.jpeg. |
| image.png, ironman.jpg, spiderman.jpg, spidey.jpg | Character imagery | Excluded: unrelated licensed characters, not personal photos. |

All six plausible portrait files and image.png were opened visually. Character files
were excluded by content/filename. No project screenshots existed in the four public
project trees; planet textures and Roam stock place photography are not screenshots.
Old portfolio videos exist but are not required as dependencies of this world.

Retained original: `public/images/derin-original.jpeg`.
Responsive derivatives: `public/images/derin-portrait-{400,608}.webp`.
Monochrome is applied in CSS, preserving the original photograph unchanged.

## Factual content

Project READMEs inspected from `oluwaisrael/Price-universe`, `rag-course-app`,
`neural-network-from-scratch`, and `roam`. Lael comes from the supplied brief and
`Portfolio/src/data/projects.ts`, explicitly marked as building with no public source.
The contact address `adeotiisrael93@gmail.com` comes from the older portfolio's
`src/data/profile.ts`; the current archived static template used a conflicting address.
No employment, metrics, awards, clients or testimonials have been added.
