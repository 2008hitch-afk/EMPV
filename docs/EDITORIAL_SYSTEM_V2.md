# EMPV — Sistema editoriale v2

## Ambito (ottobre 2026)

Revisioni grafiche approvate per l'homepage **al di sotto** della Hero, l'indice Progetti, i dettagli Progetti e Lab, Research Notes, la pagina Processo, FAQ e contatti.

**La Hero originale è definitiva e non si modifica**, inclusi copy, font, dimensioni, line break, background Scanner/Galaxy, palette, animazioni, interazioni e posizionamenti desktop/mobile.

## Implementazione

- `src/styles.css` contiene lo stile originale del sito e della Hero.
- `src/editorial.css` è lo strato aggiuntivo, caricato dopo lo stile originale in `src/main.tsx`.
- Si mantengono Manrope, la palette corrente e i CSS custom properties già usati da Customize (in particolare `--galaxy-accent`, `--ink`, `--paper`, `--hairline`).
- Le scale tipografiche `--empv-editorial-*` definiscono la gerarchia condivisa. Devono essere adattate ai tipi di pagina e alle lingue IT/EN, non copiate indiscriminatamente.
- Preferire CSS Grid e layout fluidi a nuove dipendenze UI.

## Pulsanti

- CTA capsule per `ContactPrompt`, con icona direzionale separata.
- Al passaggio del mouse la freccia si sposta verso l'alto a destra; il pulsante si solleva in modo lieve.
- Focus visibile; disabilitare trasformazioni se l'utente richiede reduced motion.
- Non intervenire sul link/CTA originale della homepage Hero.

## Team

- Due card scure, una per Enrico e una per Michele, con foto originali (`public/team/enrico-peruffo.webp` e `public/team/michele-valleri.avif`).
- Non visualizzare iniziali, numerazioni `01 / EMPV`, `02 / EMPV` o altri testi sopra il ritratto.
- Glow e bordo derivano dal tema, non da una palette codificata nel componente.
- Tilt massimo circa 3.5° per asse, reagisce soltanto a mouse; ritorno a posizione neutra all'uscita.
- Su touch e per `prefers-reduced-motion` non applicare tilt.
- Navigazione profilo Enrico/Michele, accessibile con tastiera e testi IT/EN.

## Verifiche obbligatorie prima del merge

- `npm install --no-audit --no-fund`
- `npm run build` (TypeScript + Vite + SEO postbuild)
- Pagina /it/ e /en/, alle larghezze 320, 375, 768, 1280 e 1920 px
- Collegamenti a /enrico/, /michele/, elenco Progetti, Research Notes e FAQ
- Customize: almeno Blue, Indigo, Olive, Mauve; controllare che glow segua la palette
- Nessuno spostamento o cambiamento della Hero
- Assenza di overflow orizzontale e rispetto della leggibilità su mobile
- Ricontrollare le due fotografie e i collegamenti reali dopo la pubblicazione

## Pubblicazione

Le modifiche vengono sviluppate su branch dedicato. Prima di fondere in `main`, accertarsi che la CI del pull request sia superata. Il deployment GitHub Pages è attivato dal push/merge su `main`.

## Consolidamento tipografico (ottobre 2026)

Il sistema editoriale è stato consolidato, senza modificare la Hero né il Team già approvati. Le dimensioni non sono più definite separatamente per Progetti, AI Lab, Research Notes e articoli.

### Fonte unica dei valori

In `src/editorial.css`, alla radice `:root`, sono definiti:

| Token | Ruolo | Desktop |
| --- | --- | --- |
| `--empv-type-page-title` | H1 di indici e dettagli | 58–77 px |
| `--empv-type-section-title` | H2 di sezioni principali | 42–62 px |
| `--empv-type-subheading` | H2 degli articoli/progetti | 30–41 px |
| `--empv-type-list-title` | Titolo di Progetti, Lab e Research Notes nelle liste | 28–39 px |
| `--empv-type-lead` | Introduzioni e domande rilevanti | 17–20 px |
| `--empv-type-body` | Paragrafi e liste leggibili | 16–17 px |
| `--empv-type-small` | Didascalie e dettagli tecnici | 14 px |
| `--empv-type-meta` | Micro-label, tag, data e metadata | 12 px |

Le dimensioni effettive sono fluide entro gli intervalli; `@media (max-width:900px)` e `@media (max-width:560px)` risolvono le proporzioni per tablet e mobile. Interlinee e tracking fanno riferimento ai token `--empv-leading-*` e `--empv-tracking-*`. Spaziature verticali condivise: `--empv-space-section`, `--empv-space-row`, `--empv-space-column`.

### Regole semantiche

- Il titolo H1 dei dettagli Progetto, AI Lab, Research Note, Processo e delle pagine indice usa un unico `--empv-type-page-title`.
- Progetti, AI Lab e Research Notes nei rispettivi elenchi usano `--empv-type-list-title`.
- I sottotitoli dei contenuti lunghi usano `--empv-type-subheading`; il corpo testo `--empv-type-body`.
- Negli articoli i punti elenco sono frasi leggibili, non etichette tutte maiuscole da 11 px.
- Metadati e micro-label hanno un minimo di riferimento di 12 px, non 10 px, e restano differenziati per colore.
- Le card Team e i biglietti da visita personali mantengono la propria personalità grafica. La homepage Hero rimane intoccabile.
- IT e EN condividono i CSS: consentire ritorni a capo naturali, senza break obbligati nei titoli delle pagine interne.

### QA di rilascio

Controllare le seguenti tipologie alle larghezze 320, 390, 768, 1440 e 1920 px, in IT e EN:
- /it/ e /en/ (esclusa Hero)
- /it/progetti/ e /en/projects/
- /it/lab/ e /en/lab/
- dettaglio Progetto e AI Lab
- /it/research-notes/ e /en/research-notes/
- articolo Research Notes
- pagina Processo

Verificare in particolare consistenza H1/H2, paragrafi e liste leggibili, eventuale clipping dei titoli, spaziature, link, accessibilità e assenza di overflow orizzontale.

## Footer, informazioni legali e preferenze cookie (ottobre 2026)

- Il footer è intenzionalmente compatto: non reinserire il marchio `EMPV` gigante (`.footer-mark`) in alcuna pagina o nel markup prerenderizzato. Il marchio resta nella colonna anagrafica.
- Mantenere le tre colonne `EMPV`, `Legale/Legal` e `Contatti/Contact`, sia desktop che mobile.
- **Informativa cookie / Cookie policy** è una pagina informativa pubblicata su `/it/cookie-storage/` o `/en/cookie-storage/` e descrive analytics, cookie, localStorage e modalità di revoca. Conservare i percorsi canonici esistenti.
- **Impostazioni cookie / Cookie settings** è un'azione, non una seconda pagina. Emette `empv:open-cookie-settings` e apre `AnalyticsConsent` per rivedere o revocare la scelta sugli analytics.
- Non eliminare una delle due voci solo perché parlano entrambe di cookie; svolgono ruoli differenti. Non alterare la logica GA4/consenso mentre si fanno modifiche grafiche.

## Footer flottante Optical Glass (v11 approvata, ottobre 2026)

- Struttura visiva in `src/SiteFooter.tsx` e `src/footer-glass.css`. L'HTML prerenderizzato delle pagine principali è allineato tramite `footerMarkup(lang)` in `scripts/seo-build.mjs`.
- **Vincolo prioritario:** il footer si sovrappone allo **sfondo esistente EMPV**. Non introdurre lo sfondo grafico/scena a raggi usato esclusivamente nell'anteprima v11, né modificare il background globale o la Hero.
- Il pannello deve restare realmente trasparente anche sul fondo chiaro EMPV (circa 7–10% di tinta), con `backdrop-filter: blur(3px)`, riflesso ottico accentuato e glow derivati da `--galaxy-accent` o `--signal`.
- Lieve tilt su mouse soltanto, coerente con le card Team; touch e `prefers-reduced-motion` senza inclinazione.
- Quattro aree: identità e social, Esplora, Legale, Contatti; dati societari e copyright in basso. Navigazione IT/EN.
- Mantenere `Informativa cookie` come pagina e `Impostazioni cookie` come azione che riapre il pannello reale di consenso tramite `empv:open-cookie-settings`. Privacy e altre informazioni legali rimangono raggiungibili.
- Non usare immagini nuove, librerie UI aggiuntive o uno sfondo specifico per il footer.

## Card Progetti e AI Lab — Glass (preview 12 approvata, ottobre 2026)

- Gli elenchi di Progetti e AI Lab, in homepage e nelle rispettive pagine indice IT/EN, utilizzano **Team · Glass** dell'anteprima HTML 12: superfici chiare semitrasparenti, due colonne desktop, un'unica colonna mobile, glow legato a Customize e lieve tilt 3D con il mouse.
- `src/ProjectGlassCard.tsx` è il componente condiviso per i due tipi; `src/project-glass.css` ne contiene esclusivamente lo stile. Non duplicare markup o stili per homepage e pagine indice.
- `scripts/seo-build.mjs` usa `glassCardMarkup` per rendere le stesse card anche nell'HTML statico prerenderizzato, senza salti visuali.
- Progetti: categoria, icona, titolo, descrizione, tag e invito al dettaglio. AI Lab: categoria, icona, titolo, domanda di ricerca, stato e focus, invito al dettaglio. I testi derivano sempre da `src/homeContent.ts`.
- Su touch e quando l'utente preferisce movimento ridotto, **nessuna inclinazione**; i link devono funzionare tramite mouse, tastiera e touchscreen.
- Non estendere automaticamente questo stile a Research Notes, FAQ, Team, hero o footer: tutti restano nel design già approvato.
- Non introdurre varianti scure o righe editoriali come default: il solo stile approvato per queste nove card è Glass.
- QA: verificare UI a 320, 390, 768, 1440 e 1920 px, entrambe le lingue, homepage/indici, funzionamento card e Customize, assenza di overflow.
