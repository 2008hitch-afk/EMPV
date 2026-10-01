# EMPV Research Notes — Writing References

This file is a reference shelf for the tone and editorial craft of EMPV Research Notes.

It does **not** authorize imitation of any publication or writer. Do not copy distinctive wording, sentence structures, headlines, metaphors, or signature expressions. Use these sources to calibrate editorial qualities: clarity, evidence, pacing, specificity, and the relationship between reporting and analysis.

Before drafting a new Research Note, consult 2–3 recent pieces from the most relevant references below when web access is available.

## 1. Simon Willison's Weblog

Use as a reference for:
- concrete technical writing
- writing from direct observation and testing
- explicit links to original material
- saying what is known, what was tried, and what remains uncertain
- informal but precise technical language
- short notes that do not pretend every topic needs a grand conclusion

Especially useful for:
- TECH NOTE
- open-source tools
- LLM / agent experiments
- developer tooling
- model releases with hands-on implications

Do not copy:
- first-person opinions unless EMPV actually holds them
- Simon's personal cadence or characteristic phrases

## 2. Ars Technica

Use as a reference for:
- technical reporting
- distinguishing company claims from independently established facts
- explaining mechanisms before drawing conclusions
- including limitations and caveats near the relevant claim
- readable prose without oversimplifying technical details

Especially useful for:
- NEWS NOTE
- security
- infrastructure
- model / product releases
- enterprise technology

Do not copy:
- newsroom voice mechanically
- article structures simply because Ars used them

## 3. Stratechery

Use as a reference for:
- identifying the underlying system or business logic behind a technology event
- causal analysis
- connecting product decisions, incentives, distribution, and strategy
- building an argument from evidence rather than from slogans

Especially useful for:
- SYSTEMS NOTE
- business implications of AI infrastructure
- platform / ecosystem shifts
- strategic interpretation

Do not force a thesis when the evidence only supports reporting.
Do not imitate Ben Thompson's distinctive rhetorical style or diagrams.

## 4. Interconnects — Nathan Lambert

Use as a reference for:
- technically informed AI commentary
- connecting research details to the broader model/open-source ecosystem
- explicit uncertainty
- writing that can remain slightly raw when the underlying thought is useful
- separating benchmark claims from practical relevance

Especially useful for:
- model releases
- open models
- post-training / evaluation
- frontier AI research
- open-source ecosystem analysis

Do not reproduce the author's personal worldview as EMPV's.
Do not use technical density merely to sound expert.

## 5. The Verge

Use selectively as a reference for:
- readable openings
- quickly establishing why a product or event matters
- explaining complex technology to a broad technical/business audience
- maintaining narrative momentum

Especially useful for:
- product launches
- industry events
- topics that need a more accessible lead

Do not copy:
- provocative framing
- click-oriented headlines
- cultural commentary unless directly relevant to EMPV

# Reference selection by Research Note type

## NEWS NOTE
Default calibration:
- Ars Technica
- The Verge for readability only
- Simon Willison when the topic is developer/AI tooling

Goal:
fact -> source -> mechanism -> limitation -> what remains to be demonstrated

## TECH NOTE
Default calibration:
- Simon Willison
- Ars Technica
- Interconnects when the subject is frontier AI

Goal:
problem -> technical context -> concrete mechanism/test -> tradeoffs -> practical takeaway

## FIELD NOTE
Do not rely heavily on external publication style.

Primary voice should come from EMPV's own operational observations.

Use the references only for clarity and structure.

Goal:
real operational problem -> where friction occurs -> what can be structured/automated -> what should remain explicit or human

## SYSTEMS NOTE
Default calibration:
- Stratechery for causal/system thinking
- Ars Technica for factual discipline
- Simon Willison for technical concreteness

Goal:
system boundary -> dependencies -> tradeoffs -> decision criteria

# Anti-LLM writing test

Before finalizing, review the draft and remove signs of synthetic prose:

- generic opening paragraphs
- repeated "the interesting part is..."
- repeated "not X, but Y" constructions
- symmetrical three-part conclusions
- motivational endings
- unnecessary rhetorical questions
- vague claims such as "this could transform..."
- abstract statements unsupported by a concrete example
- too many one-sentence paragraphs
- unnecessary em dashes
- forced contrarianism
- headings that sound generated rather than editorial

Ask:

1. Could this sentence appear unchanged in 500 other AI blogs?
2. Does every evaluative claim have a reason or source?
3. Did EMPV actually observe/test this, or are we speaking as if we did?
4. Is there a concrete noun, number, mechanism, source, or example where the prose is currently abstract?
5. Does the article stop when the useful information is finished?

If the answer to (1) is yes, rewrite.
If (2) or (3) fails, qualify or remove the claim.
If (4) can be improved, make it more concrete.
If (5) is no, cut the ending.

# Core rule

The references calibrate quality. They do not define EMPV's voice.

EMPV should remain recognizable as EMPV:
factual, restrained, technically curious, operationally grounded, and willing to say when something has not yet been demonstrated.
