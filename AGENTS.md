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

## Research Notes editorial standard
For any work involving Research Notes, article copy, source/link treatment, social copy, Open Graph cards or social-preview visuals, **follow `docs/RESEARCH_NOTES_EDITORIAL_GUIDE.md`**.

In particular:
- avoid generic AI hype and AI-slop copy or imagery;
- use factual, source-led editorial writing;
- when a subject has a recognizable visual identity, integrate that identity into the EMPV visual system instead of inventing generic AI artwork;
- keep the Dots NOTE / 007 social card as the reference logic for product-led Research Note covers;
- preserve EMPV hierarchy, palette and visual consistency across cards.

## Stack
React + TypeScript + Vite. Motion is used for progressive animation. Keep the site static-first unless a future requirement justifies backend infrastructure.
