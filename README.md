# VibeCoder — Nexus-9 Portfolio

> **A cyberpunk 3D portfolio website for the AI / vibecoding explorer.**
> Built with React, Three.js (R3F), Tailwind CSS v4, and Framer Motion.

## World Concept

**NEXUS-9** — A digital dimension where code becomes reality. A vast cyberspace mainframe where AI consciousness dreams in geometry and light. The visitor enters as a ghost in the machine, exploring artifacts of a future already here. Every pixel is a signal from the edge.

## Features

- **Interactive Hero** — Fullscreen 3D scene with evolving icosahedron, orbit controls, particle clouds, falling code rain, and holographic glitch text.
- **Virtual Gallery** — Six procedurally-generated 3D artifacts (neural networks, quantum bits, cybernetic eye, etc.) in a floating exhibition hall. Hover for info panels, drag to orbit the scene.
- **Cyberpunk Cityscape** — Fixed 3D background with building silhouettes, data streams, searchlights, and mouse-driven parallax particles.
- **Terminal About Page** — Retro hacker terminal with typewriter bio, scrolling AI logs, and interactive keyboard residue effects.
- **Responsive** — Works on mobile with performance optimizations (lower DPR, simplified geometries on small screens).
- **One-Click Deploy** — Ready for Vercel deployment.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 6 |
| 3D Engine | Three.js + @react-three/fiber + @react-three/drei |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion + R3F useFrame |
| Fonts | Orbitron (headings) + JetBrains Mono (code) |
| Deploy | Vercel |

## Quick Start

```bash
npm install
npm run dev
```

## One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cyber-portfolio)

Or manually:

```bash
npm install -g vercel
vercel
```

## Customization Guide

### Changing the Name and Tagline

Edit `src/components/Hero.jsx`:
- `text="VibeCoder"` — replace with your name
- `text="探索 · 生成 · 进化"` — replace with your tagline

### Editing the Bio

Open `src/components/AboutTerminal.jsx` and modify the `bioLines` array. Lines starting with `>` render in cyan.

### Replacing Gallery Artifacts with Real Projects

1. Edit `src/data/artifacts.js` to change titles, descriptions, and colors
2. Replace the procedural 3D components in `src/components/Artifacts.jsx` with real models
3. Update the component mapping in `src/components/Gallery.jsx`

### Changing Colors

The cyberpunk palette is in `src/index.css` under `@theme`:
- `--color-neon-cyan: #00f0ff`
- `--color-neon-pink: #ff00aa`
- `--color-neon-purple: #7000ff`

## Project Structure

```
cyber-portfolio/
├── public/favicon.svg
├── src/
│   ├── components/
│   │   ├── AboutTerminal.jsx
│   │   ├── Artifacts.jsx
│   │   ├── CodeRain.jsx
│   │   ├── CyberBackground.jsx
│   │   ├── Gallery.jsx
│   │   ├── Hero.jsx
│   │   ├── HolographicText.jsx
│   │   └── ProceduralGeometry.jsx
│   ├── data/artifacts.js
│   ├── hooks/useMousePosition.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## License

MIT License © [Simone-techAIGC]
