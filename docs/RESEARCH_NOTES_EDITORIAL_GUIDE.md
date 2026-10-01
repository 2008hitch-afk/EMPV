# EMPV Research Notes — Editorial & Visual Guide

This file defines the default editorial and visual standard for EMPV Research Notes.

It applies to:
- Research Note articles in Italian and English;
- social-preview / Open Graph images;
- copy used when sharing Research Notes on LinkedIn, X and other social platforms;
- future work that extends or modifies the Research Notes system.

## 1. Editorial principle

EMPV Research Notes should read like concise technical/editorial reporting, not marketing copy.

Default structure:

**fact -> source -> context -> limitation**

Prefer:
- descriptive, factual headlines;
- a concrete dek/subtitle;
- the news or technical fact in the first lines;
- short paragraphs;
- explicit attribution such as “Google says…”, “OpenAI says…”, “Reuters reports…”;
- concrete numbers when available;
- inline links on the person, company, product, benchmark or source being mentioned;
- clear distinction between company claims, demonstrations and independent evidence;
- relevant caveats inside the article, not hidden at the end.

Avoid:
- generic AI hype;
- “AI slop” phrasing;
- abstract thesis-first copy;
- “the real signal”, “the shift is…”, “game changer”, “revolutionary”, “the future is…”, “the leap is…”;
- repeated authority words such as “real”, “verified”, “controlled” when they do not add information;
- obligatory motivational conclusions;
- dumping raw URLs in a sources section when the source can be linked naturally in the text.

## 2. Tone

The tone is:
- factual;
- technical enough to be useful;
- readable;
- restrained;
- specific;
- evidence-led.

Do not write as if EMPV must always have a strong opinion on the announcement.

When evidence is limited, say what is known and what still needs to be demonstrated.

## 3. Internal links

Use internal links when they genuinely help the reader continue on a related EMPV topic.

Examples:
- local AI article -> Local AI Lab;
- on-premise/cloud article -> local LLM evaluation;
- agent article -> relevant EMPV agent/system work.

Do not force links only for SEO. Links must make semantic and editorial sense.

## 4. Social preview principle

Social cards must look like an extension of the EMPV website, not like generic AI artwork.

The default visual language is:
- warm light EMPV background;
- near-black typography;
- restrained orange EMPV accent / halo;
- strong whitespace;
- editorial grid;
- minimal system-like micrographics;
- clear hierarchy;
- 1200 x 630 social-card format.

Every card should normally include:
- `EMPV / RESEARCH NOTES`;
- `NOTE / XXX`;
- category;
- article title;
- `empv.it`;
- publication date.

## 5. Product identity before invented imagery

**Core rule:** when the subject of a Research Note has a strong, recognizable visual identity, start from that identity and integrate it into the EMPV visual system.

Examples of usable subject-specific elements:
- mascots;
- product objects;
- distinctive interface fragments;
- recognizable symbols;
- characteristic product shapes or visual motifs.

The subject-specific visual should remain secondary to EMPV's editorial hierarchy and should not turn the card into an advertisement for the subject.

### If a strong visual identity exists

Use:

**subject visual identity + EMPV layout/palette**

### If no strong visual identity exists

Use:

**EMPV layout + restrained system/technical abstraction**

Do not invent a generic “AI image” merely to fill the right side of the card.

## 6. Anti-AI-slop visual rule

Avoid:
- generic robots;
- glowing brains;
- random circuits;
- cyberpunk/neon scenes;
- fake humans;
- generic futuristic dashboards;
- floating 3D icons without editorial meaning;
- visual complexity added only to make the image feel “AI”;
- stock-like startup imagery.

A visual element must either:
1. be recognizably connected to the subject; or
2. communicate a concrete system/technical idea.

Otherwise, remove it.

## 7. Dots reference

The approved social card for **OpenAI Dots — NOTE / 007** is the reference implementation for this rule.

Its intended characteristics are:
- EMPV typography and page-like composition;
- EMPV warm neutral palette with restrained orange;
- recognizable assistant/mascot characters as the subject-specific visual;
- characters integrated into the EMPV layout rather than dominating it;
- minimal orbit/system lines only as supporting structure;
- no generic AI visual filler.

Future product-led Research Note cards should follow this logic rather than copying the exact Dots composition.

## 8. Visual quality test

Before approving a Research Note social card, answer all three:

1. **Is the subject recognizable without relying on generic AI imagery?**
2. **Does the card still look like EMPV?**
3. **Would we keep this visual if the words “AI” and “technology” were removed from the prompt?**

If the answer to any of these is “no”, revise the card.

## 9. Consistency vs variation

Keep approximately:
- **80–85% EMPV identity** consistent across Research Notes;
- **15–20% subject-specific variation**.

The layout system, hierarchy and palette create continuity.
The subject visual creates differentiation.

Do not create a completely new design language for every article.

## 10. Social copy

Social copy should give a concrete reason to open the article.

Prefer:
- 1–3 short paragraphs;
- one useful fact or distinction;
- restrained language;
- at most one functional emoji when useful (for example ↓ or 👇);
- zero to two relevant hashtags on X, only when they add discoverability.

Avoid:
- emoji chains;
- long hashtag blocks;
- “🚀 AI revolution” language;
- clickbait;
- repeating the headline without adding context.

## 11. Implementation rule

Research Notes should keep social metadata in the static/prerendered HTML:
- `og:image`;
- `og:image:width=1200`;
- `og:image:height=630`;
- `twitter:card=summary_large_image`;
- `twitter:image`.

Use versioned social-image/share URLs when a card is replaced so social platforms do not keep serving a stale cached preview.

The canonical article URL must remain clean and unchanged.
