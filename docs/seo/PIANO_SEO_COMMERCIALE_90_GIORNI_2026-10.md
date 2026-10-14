# EMPV — Piano SEO commerciale e Research Notes (90 giorni)

**Data:** 14 ottobre 2026  
**Finestra:** 14 ottobre 2026 – 12 gennaio 2027  
**Stato:** PROPOSTA, in attesa di revisione editoriale e dell'approvazione delle pagine da pubblicare  
**Responsabilità:** team EMPV. Nessuna modifica automatica al sito ufficiale.

## 0. Obiettivo reale

Far arrivare da Google richieste qualificate da PMI e team con problemi operativi concreti: richieste di preventivo via email, commesse, reinserimenti tra Excel e gestionali, dati frammentati, esigenze di AI locale.

Non ottimizzare principalmente per il traffico su notizie AI. EMPV deve essere trovata quando qualcuno cerca una soluzione e può scegliere un fornitore.

Principio editoriale: **prima processo e vincoli; poi soluzione e tecnologia; misurazione senza promesse o numeri inventati.**

## 1. Baseline verificata (dati comunicati dal proprietario in Search Console / Analytics il 14-10-2026)

| KPI | Baseline e limiti |
|---|---|
| Search Console Web ultimi 28 gg | **57 impressioni / 1 clic / CTR 1,8% / posizione media 8,7** |
| Unico clic segnalato | Query branded `empv`; non prova domanda non-branded |
| Copertura | **28 URL indicizzate, 24 non indicizzate**; tra queste 19 `Rilevata, attualmente non indicizzata`, 1 scansionata non indicizzata, 4 noindex |
| Sitemap | **48 URL** nel controllo pubblico precedente; non sovrapporre il conteggio sitemap al totale URL note a Google |
| GSC pagine con segnali | Home IT/EN, nota ERP EN, indice Research Notes, progetto richieste preventivo |
| GA4 | `contact_click` presente in Realtime dopo test; i clic di prova non sono lead; la marcatura come evento chiave e le dimensioni `channel` / `placement` vanno verificate dall'amministratore GA4 |
| Performance mobile | Scanner WebGL restaurato per scelta grafica del team; punteggio Lighthouse mobile più basso accettato. Non ridisegnare lo sfondo in questa iniziativa |

Campione ridotto; nessuna previsione affidabile di ranking o domanda dalle sole 57 impressioni. L'elenco delle query GSC è parziale per soglie/privacy e non è un keyword planner.

### Separare i KPI
1. **SEO**: impressioni e clic *non branded* (28 gg), URL indicizzate, query e pagine che crescono.
2. **Interesse**: clic di contatto GA4 (solo dopo consenso), attribuiti a `channel` e `placement`, filtrando i test interni.
3. **Business**: messaggi realmente ricevuti, richieste pertinenti, call fissate, opportunità commerciali. Annotare manualmente la provenienza quando il contatto lo dichiara.

**Obiettivo operativo per il ciclo:** arrivare ad almeno una conversazione commerciale qualificata attribuibile alla ricerca organica. È un target di lavoro, non un risultato previsto/garantito. Valutare la crescita rispetto alla baseline dopo 28, 56 e 90 giorni.

## 2. Ricerca keyword: cluster candidati, NON volumi misurati

| Cluster | Seed query da verificare | Intento | Pagina bersaglio | Priorità |
|---|---|---|---|---|
| Processi aziendali / Bergamo | `automazione processi aziendali Bergamo`; `software su misura PMI Bergamo`; `digitalizzare processi aziendali` | Commerciale | Nuova pagina servizio A | P0 |
| Preventivi e richieste | `automatizzare richieste preventivo email`; `gestione richieste preventivo B2B`; `software preventivi su misura` | Problema + soluzione | Note `quote-intake` + caso `richieste-preventivi` | P0 |
| Gestionale e ordini | `integrare gestionale esistente`; `da email a ordine gestionale`; `automazione inserimento ordini` | Problema + soluzione | Note `email-to-order` / `integrate-not-replace` | P0 |
| Commesse / produzione / cantiere | `software gestione commesse su misura`; `gestione commesse posa`; `commesse tra ufficio e produzione` | Problema operativo | Caso `commesse-posa` + guida nuova | P1 |
| AI locale / on-premise | `AI on premise PMI`; `AI locale in azienda`; `intelligenza artificiale privata aziende` | Soluzione e valutazione | Pagina servizio B + nota `on-premise-vs-cloud` + Lab locale | P1 |
| News AI | Nuovi modelli, Dots, benchmark | Informativo | Research Notes news esistenti | P3 |

Le query sono **ipotesi ricavate da servizi, pagine concorrenti e temi EMPV**, non misurazioni del volume o della difficoltà. Nella prossima lettura di Search Console associare le impressioni reali a questi cluster. Non produrre pagine quasi identiche con varianti geografiche (doorway pages).

## 3. Evidenza SERP e differenziazione

Ricognizione pubblica qualitativa del 14 ottobre 2026 (risultati possono variare per utente, posizione, giorno).

- [GTCode — gestionali su misura PMI](https://www.gtcode.dev/servizi/software-gestionale-su-misura): pagina verticale con Excel, preventivi, commesse e CTA.
- [Kosynk — servizi](https://kosynk.com/servizi): pagine separate per software e gestionali, automazione e web app.
- [RoboBot Studio](https://www.robobotstudio.com/): ingresso per problemi concreti e check-up.
- [Sivaf](https://www.sivaf.it/): posizionamento verticale software AI per PMI manifatturiere.
- [Dimensione 4](https://www.dimensione4.it/): promessa di software su misura e automazioni.
- Sul tema on-premise, risultati con guide esplicite su costi, dati e cloud come [FT Support](https://www.ftsupport.it/guide/ai-cloud-o-on-premise/) e [AI Locale](https://ailocale.it/blog/ai-on-premise-vs-cloud-pmi/).
- Sul tema preventivi competono guide e use case, tra cui [Giallo Studio](https://giallostudio.it/blog/automazione-preventivi-con-ai) e [Quoto / Talykon](https://talykon.com/use-case/preventivi-da-email).

**Non imitare la promessa di demo gratuite o ROI numerici non verificati.** Differenziare EMPV tramite:
- mappatura del processo AS-IS e degli strumenti esistenti;
- progettazione TO-BE e limiti espliciti (approvazione umana, ruoli, stato autorevole);
- preferenza per integrare invece di sostituire quando ha senso;
- casi concreti, evidenze e misure validate;
- AI opzionale, non necessaria per ogni intervento.

## 4. Audit del contenuto esistente — NON duplicare

Il repo `2008hitch-afk/EMPV` include già:
- Nota `email-to-order` — "Da email a ordine senza rifare il gestionale".
- Nota `quote-intake` — "Automatizzare richieste di preventivo senza automatizzare la decisione".
- Nota `integrate-not-replace` — "Integrare un gestionale invece di sostituirlo".
- Nota `on-premise-vs-cloud` — "AI on-premise vs cloud: quando conviene".
- Nota `local-llm-evaluation` — valutazione LLM locale.
- Quattro casi progetto: `commesse-posa`, `psicologia-operations`, `pet-resort-operations`, `richieste-preventivi`.
- Local AI Capability Lab.

Le Research Notes sono già bilingui; il sistema supporta metadata e pagine statiche generate. **Non creare un secondo articolo sugli stessi identici intenti.** Migliorare i contenuti esistenti con esempi, differenziazione e link interni.

Attualmente le `SiteRoute` implementate sono: home, business card, dettaglio, indice progetti/lab, Research Notes (indice/articolo), legali. **Non esiste una route dedicata alle pagine servizio**: prima del rilascio serviranno route, layout, prerender statico, SEO manifest, sitemap e alternates/hreflang.

## 5. Due pagine servizio da preparare

### A — P0: Automazione dei processi aziendali
- **Proposta URL IT:** `/it/automazione-processi-aziendali/` (slug da definire dopo audit routing).
- **SEO title indicativo:** `Automazione processi aziendali a Bergamo | EMPV`.
- **H1 editoriale:** `Colleghiamo i passaggi di lavoro che oggi restano separati.`
- **Intento:** azienda che usa email, Excel, gestionale, PDF e WhatsApp come parti scollegate del processo.
- **Struttura:** per chi è utile; segnali osservabili; AS-IS / TO-BE; integrazioni preservate; casi reali (richieste, commesse); cosa misurare; contatto.
- **Prove interne:** pagine `/it/progetti/commesse-posa/`, `/it/progetti/richieste-preventivi/` e note esistenti.
- **CTA:** `Parliamo del processo che oggi richiede più lavoro manuale`.
- **Vincoli:** nessun "riduciamo del X%" se non misurato; non presentare un POC come cliente consegnato senza evidenza.

### B — P1: AI locale e on-premise
- **Proposta URL IT:** `/it/ai-on-premise-pmi/`.
- **SEO title indicativo:** `AI locale e on-premise per PMI: quando ha senso | EMPV`.
- **H1 editoriale:** `AI nei tuoi sistemi, quando i dati o i vincoli lo richiedono.`
- **Struttura:** requisiti (dati, costi a regime, latency, workload, governance); cloud vs locale vs ibrido; gestione manutenzione; benchmark reali/limiti; quali casi non convengono; contatto.
- **Collegamenti:** nota `on-premise-vs-cloud`, nota `local-llm-evaluation`, Lab `/it/lab/local-ai/`.
- **Regola:** non dichiarare conformità GDPR automatica né "mai un dato fuori" senza architettura specifica verificata; chiarire anche responsabilità operativa e TCO.

**Versioni EN:** aggiungerle solo con localizzazione editoriale accurata, senza traduzioni automatiche non revisionate. Pubblicare `hreflang` esclusivamente se entrambe le pagine equivalenti esistono; altrimenti solo canonical IT.

## 6. Piano editoriale Research Notes, in ordine

| Priorità | Contenuto | Intervento | Perché | Link principali |
|---|---|---|---|---|
| P0 | `email-to-order` | Aggiornare, non duplicare | Domanda su integrazione operativa con gestionale esistente | Pagina A + progetto commesse |
| P0 | `quote-intake` | Aggiornare, non duplicare | Casi di richieste incomplete, ruoli e revisione | Pagina A + progetto richieste-preventivi |
| P1 | `integrate-not-replace` | Aggiungere checklist concreta e trade-off | Differenziazione vs "rifacciamo il gestionale" | Pagina A |
| P1 | **Nuova**: "Prima di automatizzare un processo: sei domande da chiarire" | Articolo originale | Template replicabile per valutazione e avvio call | Pagina A + note esistenti |
| P1 | **Nuova**: "Dal sopralluogo alla posa: dove si perde il contesto della commessa" | Articolo originale, con esempio autorizzato | Intento operativo verticale; link al caso | Commesse-posa + pagina A |
| P2 | `on-premise-vs-cloud` | Aggiornare, non duplicare | Scelta basata su vincoli e costi, non hype | Pagina B + Local AI |
| P2 | **Nuova**: "Quanto pesa una doppia registrazione? Un metodo per misurarlo" | Guida originale con formula e campi compilabili | Mostrare valore senza inventare ROI | Pagina A / progetto pertinente |
| P3 | Novità nuovi modelli | Pubblicare solo con nesso operativo testato o verificabile | Reputazione tecnica; non principale driver commerciale | Lab / altre note |

Una Research Note nuova deve includere: un problema e destinatario specifici, un esempio originale verificabile (anche scenario etichettato come illustrativo), limiti ed eccezioni, link a fonti primarie quando si affermano fatti esterni, uno o due collegamenti contestuali a progetti/servizi e un invito al contatto sobrio. Mai "AI slop" o metriche inventate.

## 7. Internal linking — intervento prioritario

Proposta grafo navigabile (anchor descrittive, non link forzati):

`Home → Pagina A → [Commesse-posa, Richieste-preventivi, email-to-order, quote-intake]`
`email-to-order → [integrate-not-replace, Pagina A, Commesse-posa]`
`quote-intake → [Richieste-preventivi, Pagina A]`
`Commesse-posa → [Pagina A, nuova guida sulla commessa]`
`Pagina B → [on-premise-vs-cloud, local-llm-evaluation, Lab local-ai]`

Link di ritorno dai casi alle pagine servizio. Verificare no link rotti, URL canoniche IT/EN corrette, anchor coerenti col contenuto. Non aumentare in modo indiscriminato link nel footer.

## 8. Roadmap 90 giorni

### Giorni 1–30 (14 ott – 12 nov): fondamenta commerciali
- [ ] Esportare GSC 28 giorni: query, pagine, paesi, dispositivi; annotare baseline/brand.
- [ ] Ricontrollare il 21–28 ottobre stato delle 19 URL rilevate non indicizzate e le tre richieste manuali già inviate; evitare continue richieste.
- [ ] Verificare in GA4 `contact_click` come evento chiave e registrare dimensioni evento `channel` e `placement`; non confondere clic di prova con lead.
- [ ] Aggiornare `email-to-order` e `quote-intake` con collegamenti e materiali originali, previa revisione editoriale.
- [ ] Progettare e validare pagina servizio A, aggiungendo supporto a route, prerender, hreflang (quando esiste EN), SEO metadata e sitemap.
- [ ] Test SEO tecnico, accessibilità, mobile e screenshot prima del merge; zero regressioni visuali.

### Giorni 31–60 (13 nov – 12 dic): costruire una risorsa di riferimento
- [ ] Pubblicare (previa approvazione) nota nuova "Prima di automatizzare un processo".
- [ ] Pubblicare/rafforzare spiegazione commesse con prove autorizzate; approfondire il caso esistente senza claim non verificati.
- [ ] Preparare pagina servizio B, usando test locali riproducibili e confronto costi/limiti, non slogan.
- [ ] Revisione e linking della nota `on-premise-vs-cloud`.
- [ ] Raccogliere i primi trend GSC per URL e query non-branded a 28 gg; aggiornare i titoli solo sulla base dei dati.

### Giorni 61–90 (13 dic – 12 gen): misurare e correggere
- [ ] Pubblicare (se ci sono evidenze utili) guida sulla misurazione di attività manuali e reinserimenti.
- [ ] Controllare qualità e collegamenti delle nuove landing nelle versioni linguistiche realmente pubblicate.
- [ ] Confronto delle finestre GSC/GA4 a 28 e 90 gg con annotazioni dei lanci.
- [ ] Segnare richieste ricevute, call pertinenti, argomento, provenienza dichiarata e riscontro commerciale.
- [ ] Ridurre o cambiare priorità degli argomenti senza impressioni/rilevanza anziché aggiungere contenuti per volume.
- [ ] Nuovo piano trimestrale basato sulle query e contatti effettivi.

**Cadenza proposta:** 1 release sostanziale ogni 2 settimane; nel mezzo aggiornamenti di qualità/linking. Non pubblicare 10 articoli per inseguire un calendario.

## 9. Gate editoriali e tecnici

Prima della pubblicazione:
1. Distinguere caso consegnato, progetto in costruzione, prototipo Lab e scenario illustrativo.
2. Confermare privacy/autorizzazione se si descrivono clienti reali; anonimizzare i dati.
3. Se si citano risultati, includere periodo, base di confronto e metodo di misura.
4. Nessuna qualifica professionale impropria, testimonianza sintetica inventata o "case study" creato dal nulla.
5. SEO: pagina utile anche senza Google, heading chiari, alt se necessario, canonical, hreflang corretto, dati strutturati solo reali, sitemap e link crawlable.
6. QA: build, anteprima mobile/desktop, controllo contenuti IT/EN, GA4 consensuale, CTA funzionanti.
7. Una persona del team approva testo e rilascio.

Le raccomandazioni sono allineate ai principi ufficiali Google sulle [pagine utili per persone](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) e sulle [Search Essentials](https://developers.google.com/search/docs/essentials), non a scorciatoie SEO.

## 10. Decisioni richieste ai founder

- [ ] Confermare **priorità Pagina A** (processi aziendali/Bergamo) prima della Pagina B (AI locale).
- [ ] Confermare case study, numeri e dettagli pubblicabili: commesse / preventivi / centro psicologia.
- [ ] Approvare outline e testo IT delle landing, poi valutare EN.
- [ ] Confermare che i materiali Research Notes restino in linea con policy "no AI slop": citazioni con link, verificabilità, sobrietà.
- [ ] Decidere chi registra manualmente i contatti commerciali arrivati via email / WhatsApp e da dove.

**Questa PR è solo documentazione strategica.** Non sono implementate nuove URL o articoli nel sito live.
