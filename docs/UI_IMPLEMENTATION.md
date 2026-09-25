# UI implementation notes

## Direction
EMPV is intentionally designed as an editorial technology portfolio rather than a conventional agency/consultancy website.

### Source use
- **shadcn/ui**: composition discipline, restrained primitives, accessible interaction patterns.
- **Tailark**: section rhythm, large marketing/editorial typography and content hierarchy.
- **Magic UI**: continuous marquee / ambient motion as a lightweight enhancement.
- **React Bits**: pointer-reactive visual treatment and experimental motion language.

The current implementation adapts those ideas into project-owned React/CSS rather than importing whole repositories.

## Current visual system
- Base: warm off-white paper + near-black ink, kept visually continuous across sections
- Accent: orange-red is reserved for subtle pointer/hover interaction rather than section fills
- Type: Manrope + DM Mono
- Motion: animated technical grid, scanning lines, viewport reveals and pointer-reactive ambient glow
- Portraits: monochrome abstract placeholders only; replace with real photography later

## Content model
1. Hero / positioning
2. Editorial manifesto
3. Selected Work
4. Labs / R&D
5. People
6. Colophon

## Bilingual behavior
Italian is the default language. English is toggled client-side. Copy lives in `src/App.tsx` until content volume justifies extracting an i18n layer.
