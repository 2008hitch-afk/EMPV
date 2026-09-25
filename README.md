# EMPV

Bilingual editorial portfolio for **Enrico Peruffo** and **Michele Valleri**.

## Positioning

EMPV presents people first, then delivered work, then products and R&D. It is intentionally not structured as a generic AI-agency website.

## Current selected work
- Cloeshouse Pet Resort
- Centro Change
- Cube Audio Service

## Labs / R&D
- Pet Operations SaaS
- Local AI Capability Lab
- DeepRAP / Epistemic AI

## Stack
- React 19
- TypeScript
- Vite
- Motion
- Lucide React
- project-owned CSS

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

## Design sources

See `docs/UI_IMPLEMENTATION.md` and `AGENTS.md`.

The site selectively uses patterns and principles associated with shadcn/ui, Tailark, Magic UI and React Bits rather than vendoring entire upstream repositories.

## Status

First creative prototype. Real portraits, final project imagery, final copy review and deployment are intentionally still open.


## Background Lab

Experimental route:

`/background-lab`

The lab compares the same EMPV hero against selectively imported background components from Magic UI and React Bits. It exposes intensity, speed, depth and pointer-interaction controls without changing the default homepage.

Quick homepage comparisons are also available through:

- `?bg=particles`
- `?bg=aero`
- `?bg=beams`
- `?bg=threads`
- `?bg=waves`
- `?bg=galaxy`
- `?bg=orb`

The production/default homepage remains `?bg=none`.
