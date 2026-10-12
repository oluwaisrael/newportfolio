# Derin — Immersive Portfolio

Static-first personal portfolio for Adeoti Israel (Derin), built around the relationship between statistics, backend engineering, AI/ML and creative technology.

## Run locally

Because this is buildless HTML/CSS/JavaScript, any static server works:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Architecture

- `index.html` keeps the content, navigation and essential project information in the DOM.
- `styles.css` supplies the editorial layout, responsive mobile mode and visual system.
- `app.js` provides the restrained desktop systemscape, hash-routed project case studies, lab interactions and contextual Ask section.
- On coarse-pointer devices and with reduced motion enabled, the canvas is never used for the experience; content remains fully usable as static HTML.

No portrait asset was present in the source workspace, so the first pass intentionally does not invent or generate one.
