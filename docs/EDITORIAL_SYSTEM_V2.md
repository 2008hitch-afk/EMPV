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
