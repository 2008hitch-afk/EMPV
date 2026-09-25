# EMPV agent instructions

EMPV is a bilingual editorial/creative/technology portfolio for Enrico Peruffo and Michele Valleri.

## Product direction
- EMPV is a portfolio, not an AI agency website.
- People first, then selected work, then Labs / R&D.
- Keep copy concise, specific and evidence-led.
- Avoid generic AI hype, generic SaaS visuals, conversion-funnel language and excessive CTAs.
- Current public portfolio names may be shown explicitly.
- Portrait blocks are temporary placeholders until real photography is supplied.

## UI source routing
Approved reference sources:
1. shadcn/ui — https://github.com/shadcn-ui/ui
2. Tailark — https://tailark.com/
3. Magic UI — https://github.com/magicuidesign/magicui
4. React Bits — https://github.com/DavidHDev/react-bits

Use them as selective sources of components/patterns. Do not clone entire upstream repositories by default. Prefer the smallest dependency surface that delivers the intended result.

## Visual principles
- editorial hierarchy
- oversized typography
- technical motion used sparingly
- strong whitespace and grids
- responsive by default
- accessibility and reduced-motion support
- no fake portraits of Enrico or Michele

## Stack
React + TypeScript + Vite. Motion is used for progressive animation. Keep the site static-first unless a future requirement justifies backend infrastructure.
