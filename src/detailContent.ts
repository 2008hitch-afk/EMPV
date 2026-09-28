export type SiteLang = "it" | "en";

export type DetailBlock = {
  label: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type DetailComparison = {
  leftLabel: string;
  leftTitle: string;
  leftBody: string;
  rightLabel: string;
  rightTitle: string;
  rightBody: string;
};

export type DetailContent = {
  slug: string;
  type: "project" | "lab";
  index: string;
  title: string;
  kicker: string;
  lead: string;
  problemTitle?: string;
  solutionTitle?: string;
  tags: string[];
  statusLabel: string;
  status: string;
  comparison?: DetailComparison;
  blocks: DetailBlock[];
  boundary?: string;
};

const it: Record<string, DetailContent> = {
  infisso: {
    slug: "infisso",
    type: "project",
    index: "01",
    title: "L'Infisso",
    kicker: "Sistema operativo per commesse",
    problemTitle: "Le informazioni della commessa non seguivano la commessa.",
    solutionTitle: "Abbiamo trasformato la commessa nella fonte comune del lavoro.",
    lead:
      "Una commessa passava dal sopralluogo all'ufficio, poi all'officina e infine alla posa. Ma clienti, documenti, misure e stato del lavoro non vivevano nello stesso posto: una parte era nelle cartelle Windows, una parte nel software specialistico e una parte nelle persone che stavano seguendo il lavoro.",
    tags: ["Commesse", "Campo → officina", "Dati condivisi", "Automazioni"],
    statusLabel: "Direzione",
    status: "Un dato raccolto una volta, disponibile alla persona giusta nel momento giusto.",
    comparison: {
      leftLabel: "Prima",
      leftTitle: "Informazioni distribuite",
      leftBody:
        "Clienti e documenti vivevano soprattutto in cartelle Windows, mentre il lavoro operativo attraversava sopralluoghi, amministrazione, officina e un software specialistico separato.",
      rightLabel: "Sistema",
      rightTitle: "Una commessa come fonte comune",
      rightBody:
        "Una piattaforma web centralizza cliente, rilievi, avanzamento, materiali, attività mancanti e automazioni assistite, lasciando il controllo umano sulle azioni esterne.",
    },
    blocks: [
      {
        label: "01 / Perché era un problema",
        title: "Ogni passaggio poteva richiedere di cercare o ricreare informazioni già raccolte.",
        body:
          "Il nodo non era sostituire ogni strumento, ma evitare reinserimenti, passaggi informali e perdita di contesto mentre la stessa commessa passava dal campo all'ufficio, poi all'officina e infine alla posa.",
        bullets: [
          "dati e documenti distribuiti",
          "ruoli diversi che usano porzioni diverse della stessa commessa",
          "software specialistico da preservare e studiare, non da sostituire per principio",
          "integrazioni con macchine e strumenti da verificare prima di prometterle",
        ],
      },
      {
        label: "02 / Come abbiamo ragionato",
        title: "Non sostituire tutto. Creare uno strato operativo condiviso intorno alla commessa.",
        body:
          "Il nuovo sistema diventa lo strato operativo condiviso. Gli strumenti specialistici restano dove hanno senso e vengono collegati solo quando la fattibilità tecnica e il beneficio sono reali.",
      },
      {
        label: "03 / Cosa abbiamo cambiato",
        title: "Campo, ufficio e officina lavorano sulla stessa commessa.",
        body:
          "Il nucleo comprende gestione clienti e commesse, rilievi guidati, viste dedicate ai diversi ruoli, avanzamento e priorità, stato di materiali e accessori, promemoria, checklist e predisposizione assistita di comunicazioni e ordini.",
      },
      {
        label: "04 / Come funziona adesso",
        title: "Il dato viene raccolto una volta e riutilizzato nelle fasi successive.",
        body:
          "È un esempio di ciò che intendiamo per sistema costruito intorno al lavoro reale: prima si ricostruisce il flusso, poi si decide dove centralizzare, dove integrare e dove mantenere una decisione umana.",
      },
    ],
  },

  "centro-change": {
    slug: "centro-change",
    type: "project",
    index: "02",
    title: "Centro Change",
    kicker: "Piattaforma operativa per un centro di psicologia",
    problemTitle: "Il problema non erano le prenotazioni. Era tutto ciò che succedeva tra una prenotazione e l'altra.",
    solutionTitle: "Abbiamo portato quei passaggi dentro un unico flusso operativo.",
    lead:
      "Pazienti, appuntamenti, professionisti, pagamenti e attività amministrative vivevano su più strumenti. La segreteria doveva riportare informazioni da una piattaforma all'altra, controllare manualmente gli stati e ricostruire continuamente cosa fosse successo.",
    tags: ["Operations", "Scheduling", "Ruoli", "Amministrazione"],
    statusLabel: "Obiettivo",
    status: "Ridurre i passaggi manuali senza semplificare ciò che deve restare controllato.",
    comparison: {
      leftLabel: "Prima",
      leftTitle: "Più piattaforme, più passaggi manuali",
      leftBody:
        "Dati e attività erano distribuiti tra più strumenti. La segreteria doveva reimmettere informazioni, verificare stati e ricostruire manualmente una parte importante del lavoro quotidiano.",
      rightLabel: "Sistema",
      rightTitle: "Un'unica identità operativa",
      rightBody:
        "Pazienti, professionisti, appuntamenti, pagamenti, pacchetti e regole di chiusura condividono lo stesso modello, con permessi server-side e viste diverse in base al ruolo.",
    },
    blocks: [
      {
        label: "01 / Perché era un problema",
        title: "La segreteria faceva da ponte manuale tra strumenti che non condividevano lo stesso stato.",
        body:
          "In un centro psicologico non basta mettere tutto nello stesso database. Segreteria, professionisti e direzione devono vedere e modificare cose diverse; le note professionali non possono diventare semplicemente 'dati del centro'.",
      },
      {
        label: "02 / Come abbiamo ragionato",
        title: "Centralizzare il flusso, non appiattire ruoli e responsabilità.",
        body:
          "Il disegno usa identità canoniche per paziente e professionista, contesto di centro, autorizzazioni server-side e audit delle correzioni. L'esperienza quotidiana resta semplice, mentre regole e permessi rimangono nel backend.",
      },
      {
        label: "03 / Cosa abbiamo cambiato",
        title: "Paziente, appuntamento, seduta e stato amministrativo condividono lo stesso flusso.",
        body:
          "Disponibilità, prenotazioni, spostamenti, chiusura delle sedute, stato pagamenti, pacchetti, regola delle 48 ore, promemoria, report e correzioni autorizzate vengono trattati come parti dello stesso sistema operativo.",
      },
      {
        label: "04 / Come funziona adesso",
        title: "L'operatività quotidiana è unificata; regole e permessi restano autorevoli nel backend.",
        body:
          "La direzione tecnica parte da Frappe / ERPNext e Marley Healthcare, estendendoli con un layer dedicato quando regole, sicurezza o workflow non possono essere rappresentati correttamente in modo nativo.",
      },
    ],
  },

  cloeshouse: {
    slug: "cloeshouse",
    type: "project",
    index: "03",
    title: "Cloeshouse Pet Resort",
    kicker: "Booking e operatività sulla stessa piattaforma",
    problemTitle: "Una prenotazione non è semplicemente una data su un calendario.",
    solutionTitle: "Abbiamo progettato booking e operatività come un unico sistema.",
    lead:
      "Ogni prenotazione occupa capacità reale e porta con sé cliente, animale, documenti, caparra, servizi aggiuntivi e attività durante il soggiorno. Se queste informazioni vengono trattate come moduli separati, lo staff deve continuamente riallinearle.",
    tags: ["Hospitality ops", "Booking", "Area cliente", "Daily operations"],
    statusLabel: "Principio",
    status: "Quello che il cliente prenota deve diventare automaticamente lavoro operativo.",
    comparison: {
      leftLabel: "Problema",
      leftTitle: "Booking e operazioni non possono vivere separati",
      leftBody:
        "Una pensione per animali deve coordinare capacità reale, dati del cliente e del cane, arrivi, partenze, servizi aggiuntivi, documenti e stato della caparra. Un semplice form di prenotazione non basta.",
      rightLabel: "Sistema",
      rightTitle: "Un dominio unico dalla richiesta al soggiorno",
      rightBody:
        "Booking, area cliente e back office condividono gli stessi dati. Lo staff vede presenti, arrivi, partenze e attività; il cliente accede alla propria scheda e alle prenotazioni senza duplicare profili.",
    },
    blocks: [
      {
        label: "01 / Perché era un problema",
        title: "La prenotazione genera conseguenze operative che un semplice calendario non rappresenta.",
        body:
          "Disponibilità degli alloggi, ciclo di vita della prenotazione, dati del cane, grooming, accordi, pagamenti e giornata operativa vengono trattati come parti dello stesso prodotto.",
      },
      {
        label: "02 / Come abbiamo ragionato",
        title: "Booking, cliente, animale e soggiorno devono appartenere allo stesso dominio.",
        body:
          "Se lo staff ha già creato cliente, cane e prenotazioni, l'attivazione online recupera quella stessa identità invece di creare un duplicato. Il profilo resta collegato allo storico già presente.",
      },
      {
        label: "03 / Cosa abbiamo cambiato",
        title: "Quello che viene prenotato diventa direttamente informazione operativa per lo staff.",
        body:
          "Il sistema distingue disponibilità per struttura e box dalla vista operativa giornaliera, gestisce arrivi e partenze, grooming, documenti e stato di conferma legato alla caparra.",
      },
      {
        label: "04 / Come funziona adesso",
        title: "Disponibilità, arrivi, partenze, servizi, documenti e caparra restano nello stesso flusso.",
        body:
          "Laravel, componenti di piattaforma dedicati, area amministrativa e integrazione myPOS costituiscono il nucleo tecnico. Le API esposte restano limitate ai flussi che servono davvero al prodotto.",
      },
    ],
  },

  cube: {
    slug: "cube",
    type: "project",
    index: "04",
    title: "Cube Audio Service",
    kicker: "Richieste più strutturate, decisione ancora umana",
    problemTitle: "Cube riceveva richieste, ma prima di valutarle doveva ricostruire cosa il cliente stesse realmente chiedendo.",
    solutionTitle: "Non abbiamo automatizzato il preventivo. Abbiamo automatizzato la raccolta delle informazioni necessarie per farlo bene.",
    lead:
      "Tipo di evento, partecipanti, location, accessibilità, attrezzatura, trasporto, montaggio e assistenza potevano emergere in momenti diversi della conversazione. Prima ancora di quotare il lavoro, Cube doveva ricostruire il contesto.",
    tags: ["Lead flow", "Richiesta guidata", "Website", "Human review"],
    statusLabel: "Scelta",
    status: "Guidare la richiesta senza fingere di poter automatizzare il preventivo.",
    comparison: {
      leftLabel: "Prima",
      leftTitle: "Richieste difficili da confrontare",
      leftBody:
        "Quando le informazioni arrivano in forma libera, chi deve valutare l'evento deve prima ricostruire categoria, luogo, partecipanti, servizi, accessi, logistica e contatti.",
      rightLabel: "Sistema",
      rightTitle: "Un percorso che prepara la valutazione",
      rightBody:
        "Il flusso raccoglie un set compatto di informazioni e adatta alcune domande al tipo di evento. Nessun prezzo pubblico e nessuna quotazione automatica: la decisione finale resta a Cube.",
    },
    blocks: [
      {
        label: "01 / Perché era un problema",
        title: "Ogni richiesta incompleta spostava lavoro di raccolta informazioni sul team Cube.",
        body:
          "Conferenze, matrimoni, DJ set e feste private non richiedono lo stesso tipo di informazione. Un form generico produce lead, ma non necessariamente richieste valutabili.",
      },
      {
        label: "02 / Come abbiamo ragionato",
        title: "Chiedere prima solo ciò che serve davvero per poter valutare l'evento.",
        body:
          "La V1 mantiene poche diramazioni principali e raccoglie ciò che serve per una prima valutazione: tipo di evento, data, luogo, partecipanti, servizi, alimentazione, accessi, logistica e contatti.",
      },
      {
        label: "03 / Cosa abbiamo cambiato",
        title: "La richiesta arriva già strutturata, ma la valutazione resta umana.",
        body:
          "Il riepilogo è indicativo, non vengono mostrati prezzi e ogni richiesta viene valutata direttamente dal team. È una scelta di prodotto, non una mancanza di automazione.",
      },
      {
        label: "04 / Come funziona adesso",
        title: "Il sito raccoglie il contesto; Cube parte da una richiesta già leggibile.",
        body:
          "Il sito e il percorso guidato diventano un unico ingresso commerciale: la persona racconta l'evento, il sistema struttura i dati e Cube riceve un contesto più consistente su cui lavorare.",
      },
    ],
  },

  "system-twin": {
    slug: "system-twin",
    type: "lab",
    index: "A",
    title: "System Twin",
    kicker: "Exploration / systems intelligence",
    lead:
      "Un esperimento su come ricostruire automaticamente un sistema digitale reale in una rappresentazione interrogabile, mantenendo insieme codice, runtime, configurazioni, API, documentazione ed evidenze.",
    tags: ["System understanding", "Evidence", "Architecture"],
    statusLabel: "Stato repo",
    status: "Research / model-definition. Nessuno schema canonico o stack implementativo è ancora congelato.",
    comparison: {
      leftLabel: "Oggi",
      leftTitle: "La conoscenza del sistema è frammentata",
      leftBody:
        "Repository, deploy, telemetria, documenti e API descrivono parti diverse della stessa realtà e spesso non coincidono temporalmente.",
      rightLabel: "Direzione",
      rightTitle: "Un modello semantico con evidenza e tempo",
      rightBody:
        "La ricerca prova a collegare quelle fonti in un modello comune capace di distinguere ciò che è osservato, dichiarato, derivato o inferito.",
    },
    blocks: [
      {
        label: "01 / Cosa stiamo esplorando",
        title: "Un gemello semantico, non un generatore di diagrammi.",
        body:
          "L'obiettivo è rappresentare cosa fa un sistema, cosa ne modifica il comportamento, dove gira, come si muovono i dati e quanto è supportata ogni affermazione.",
      },
      {
        label: "02 / Perché potrebbe contare",
        title: "Comprendere sistemi complessi è ancora un lavoro ad alta intensità umana.",
        body:
          "Debug, audit, migrazioni, incident response e onboarding richiedono spesso di ricostruire manualmente relazioni distribuite tra molte fonti. Un modello ricostruito e interrogabile potrebbe cambiare quel lavoro.",
      },
      {
        label: "03 / Cosa stiamo verificando",
        title: "Identità, provenance, tempo e riconciliazione.",
        body:
          "La ricerca si concentra sul livello che manca tra parser/telemetria già maturi e una rappresentazione causale utilizzabile: identità cross-source, conflitti, versioni, confidence e proiezioni diverse dello stesso modello.",
      },
    ],
    boundary:
      "Il progetto è ancora in fase di ricerca e definizione del modello. Non stiamo pubblicando schema definitivo, implementazione completa o roadmap commerciale.",
  },

  "local-ai": {
    slug: "local-ai",
    type: "lab",
    index: "B",
    title: "Local AI",
    kicker: "Applied R&D / capability evaluation",
    lead:
      "Un laboratorio per capire cosa un modello eseguito localmente sa davvero fare su un workload specifico, usando prove riproducibili e confini operativi espliciti.",
    tags: ["Local models", "Evaluation", "Evidence"],
    statusLabel: "Stato repo",
    status: "Public Core 0.3.1 RC1 · hitch-local-ai==0.3.1 · schema 1.0.1.",
    comparison: {
      leftLabel: "Problema",
      leftTitle: "Il nome del modello non è una garanzia",
      leftBody:
        "Due modelli con punteggi simili possono comportarsi in modo molto diverso su strumenti, vincoli, output strutturati e sequenze operative concrete.",
      rightLabel: "Direzione",
      rightTitle: "Testare il workload prima del deployment",
      rightBody:
        "Il percorso separa discovery, candidato osservato, test, preflight, run limitata, evidenza e confronto, senza trasformare un singolo test in autorizzazione operativa.",
    },
    blocks: [
      {
        label: "01 / Cosa esiste già",
        title: "Un public core versionato e verificabile.",
        body:
          "Il progetto espone package Python, CLI, schemi, job/test pack e contratti di output per descrivere e verificare lavoro AI locale in modo riproducibile.",
      },
      {
        label: "02 / Cosa stiamo cercando",
        title: "Una misura utile per decidere, non una classifica di modelli.",
        body:
          "La domanda non è quale modello sia 'migliore' in assoluto, ma quale combinazione modello + runtime + workload soddisfi un contratto concreto con evidenza sufficiente.",
      },
      {
        label: "03 / Potenziale",
        title: "Qualification layer per AI privata e on-prem.",
        body:
          "Se la tesi regge su domini diversi, il valore potrebbe essere uno strato indipendente tra modelli locali e workload aziendali: testare prima, qualificare separatamente, operare solo entro confini dimostrati.",
      },
    ],
    boundary:
      "La parte pubblica è intenzionalmente separata dallo stato R&D privato, dagli inventari host e dalle ricette operative.",
  },

  "opportunity-engine": {
    slug: "opportunity-engine",
    type: "lab",
    index: "C",
    title: "Opportunity Engine",
    kicker: "Prototype / commercial intelligence",
    lead:
      "Un prototipo di ricerca commerciale che prova a trovare aziende partendo dai loro problemi operativi osservabili, invece di partire da liste e arricchirle dopo.",
    tags: ["Problem discovery", "Research", "Qualification"],
    statusLabel: "Milestone corrente",
    status: "Problem Research → Prospect Research → Qualification.",
    comparison: {
      leftLabel: "Approccio comune",
      leftTitle: "Lista → arricchimento → outreach",
      leftBody:
        "Si parte da un insieme di aziende e si cercano segnali sufficienti per personalizzare il contatto.",
      rightLabel: "Esperimento",
      rightTitle: "Problema → segnali → aziende",
      rightBody:
        "Il sistema ricerca prima pattern operativi, poi individua aziende che mostrano quei segnali e infine prova a qualificarle con fonti tracciabili.",
    },
    blocks: [
      {
        label: "01 / Il workflow",
        title: "Ricerca, qualificazione e controllo umano.",
        body:
          "Il disegno completo va da Problem Research a Prospect Research, Qualification, Contact Discovery, Outreach Draft, Human Gate e Feedback/Learning. L'orchestratore mantiene stato, limiti e routing.",
      },
      {
        label: "02 / Cosa stiamo verificando",
        title: "Se problem-first produce opportunità materialmente migliori.",
        body:
          "Il milestone corrente non è automatizzare le vendite. È dimostrare che Problem Research → Prospect Research → Qualification può produrre pochi prospect migliori di una lista generica.",
      },
      {
        label: "03 / Perché è interessante",
        title: "Un motore commerciale che accumula metodo, non soltanto contatti.",
        body:
          "Evidenze, interpretazioni e ipotesi restano separate; i modelli sono risorse sostituibili dell'orchestratore e le azioni esterne restano dietro un gate umano.",
      },
    ],
    boundary:
      "La logica di ricerca, i provider e l'architettura evolvono ancora rapidamente. Non pubblichiamo i dettagli che costituirebbero il vantaggio operativo del sistema.",
  },

  "vertical-operations": {
    slug: "vertical-operations",
    type: "lab",
    index: "D",
    title: "Vertical Operations",
    kicker: "Product direction / vertical SaaS",
    lead:
      "Una direzione prodotto: sistemi verticali in cui ciò che il cliente compra o prenota genera direttamente il lavoro che lo staff deve svolgere.",
    tags: ["Vertical SaaS", "Operations", "Product"],
    statusLabel: "Primo test",
    status: "Il primo verticale completo è stato costruito attorno alla pet hospitality.",
    comparison: {
      leftLabel: "Software verticale classico",
      leftTitle: "Moduli che convivono",
      leftBody:
        "CRM, booking, pagamenti e task spesso esistono come funzioni separate che richiedono ancora riconciliazione operativa.",
      rightLabel: "Direzione",
      rightTitle: "Una sola catena operativa",
      rightBody:
        "Disponibilità, acquisto/prenotazione, configurazione del servizio e attività dello staff condividono lo stesso dominio e generano lavoro coerente.",
    },
    blocks: [
      {
        label: "01 / La tesi",
        title: "Il prodotto deve modellare il lavoro, non solo registrarlo.",
        body:
          "Quando il cliente acquista un servizio, quel fatto dovrebbe produrre automaticamente disponibilità occupata, attività, responsabilità e stato operativo per il team.",
      },
      {
        label: "02 / Primo verticale",
        title: "Pet resort come banco di prova.",
        body:
          "Il V1 multi-tenant include booking engine, area cliente, team/ruoli, strutture e alloggi, task, soggiorni, grooming, documenti, pagamenti base e reporting operativo.",
      },
      {
        label: "03 / Cosa stiamo cercando",
        title: "Capire quanto del modello sia riutilizzabile.",
        body:
          "La parte interessante non è soltanto il mercato pet: è verificare quali primitive operative possono diventare una base per altri verticali di servizio senza trasformarsi in un gestionale generico.",
      },
    ],
    boundary:
      "Il primo prodotto è funzionalmente completo a livello V1, ma la production readiness e l'estensione ad altri verticali restano fasi separate.",
  },

  "trustworthy-reasoning": {
    slug: "trustworthy-reasoning",
    type: "lab",
    index: "D",
    title: "Trustworthy Reasoning",
    kicker: "Research / epistemic AI",
    lead:
      "Ricerca su sistemi AI che non comprimono automaticamente evidenze contrastanti in una risposta unica, ma mantengono storia, contraddizioni, versioni e ragioni dietro le conclusioni.",
    tags: ["Reasoning", "Evidence", "Trust"],
    statusLabel: "Fase",
    status: "Phase 0 — Call decomposition and research governance. Nessun claim di novelty è considerato validato.",
    comparison: {
      leftLabel: "Problema",
      leftTitle: "Una risposta può nascondere il percorso che l'ha prodotta",
      leftBody:
        "Quando fonti, tempi o contesti sono in conflitto, fondere tutto in una singola rappresentazione può cancellare informazione importante.",
      rightLabel: "Direzione",
      rightTitle: "Ragionamento che porta con sé l'evidenza",
      rightBody:
        "La ricerca esplora grafi versionati, branching epistemico, contraddizioni temporali, belief revision e planning che cerca nuova evidenza quando quella disponibile non basta.",
    },
    blocks: [
      {
        label: "01 / La domanda",
        title: "Come dovrebbe ragionare un sistema quando la realtà non è coerente?",
        body:
          "L'obiettivo è trattare divergenze e aggiornamenti come parte del problema, non come rumore da eliminare prima del ragionamento.",
      },
      {
        label: "02 / La ricerca",
        title: "Evidence graphs, tempo e revisione delle credenze.",
        body:
          "La linea di lavoro combina conoscenza versionata, temporalità, contraddizioni contestuali, merge con prova, astrazione e pianificazione orientata alla ricerca di evidenza.",
      },
      {
        label: "03 / Perché la teniamo nel Lab",
        title: "È una direzione scientifica, non una feature da vendere.",
        body:
          "Prima di parlare di prodotto servono novelty, benchmark e falsificazione. Psicologia ed educazione sono possibili domini di validazione, non la giustificazione automatica del progetto.",
      },
    ],
    boundary:
      "Il progetto è in fase iniziale di ricerca e governance scientifica. Nessun claim di breakthrough o novelty viene presentato come già validato.",
  },
};

const en: Record<string, DetailContent> = {
  infisso: {
    ...it.infisso,
    kicker: "Operating system for job workflows",
    problemTitle: "The information did not move with the job.",
    solutionTitle: "We turned the job itself into the shared source of work.",
    lead:
      "A job moved from site survey to office, then workshop and installation. But customers, documents, measurements and operational status did not live in the same place: some were in Windows folders, some in specialist software and some in the people following the work.",
    statusLabel: "Direction",
    status: "Capture data once, make it available to the right person in the right form.",
    comparison: {
      leftLabel: "Before",
      leftTitle: "Distributed information",
      leftBody:
        "Customers and documents mainly lived in Windows folders, while operational work moved through site surveys, administration, workshop activity and separate specialist software.",
      rightLabel: "System",
      rightTitle: "One job as the shared source",
      rightBody:
        "A web platform centralizes customers, measurements, progress, materials, missing actions and assisted automation while keeping human control over external actions.",
    },
    blocks: [
      { label: "01 / The problem", title: "The same job existed in several places at once.", body: "The challenge was not to replace every tool. It was to reduce re-entry, informal handoffs and loss of context as the same job moved from field work to office, workshop and installation.", bullets: ["distributed data and documents", "different roles using different slices of the same job", "specialist software to preserve and understand", "machine integrations to verify before promising"] },
      { label: "02 / The decision", title: "Build around the process, not around the existing software.", body: "The new platform becomes the shared operational layer. Specialist tools stay where they are useful and are connected only when both technical feasibility and operational value are real." },
      { label: "03 / The system", title: "Field, office and workshop read the same reality.", body: "The core covers customers and jobs, guided measurements, role-specific views, progress and priorities, material status, reminders, checklists and assisted preparation of communications and orders." },
      { label: "04 / What matters to us", title: "Reduce how often information has to be recreated.", body: "This is what we mean by designing around real work: reconstruct the flow first, then decide what to centralize, what to integrate and what should remain a human decision." },
    ],
  },
  "centro-change": {
    ...it["centro-change"],
    kicker: "Operating platform for a psychology center",
    problemTitle: "The problem was not booking. It was everything happening between one appointment and the next.",
    solutionTitle: "We brought those handoffs into one operating flow.",
    lead: "Patients, appointments, professionals, payments and administrative work lived across multiple tools. The secretariat had to re-enter information, manually check status and repeatedly reconstruct what had happened.",
    statusLabel: "Goal",
    status: "Reduce manual handoffs without simplifying what still requires control.",
    comparison: {
      leftLabel: "Before", leftTitle: "Multiple platforms, multiple manual handoffs", leftBody: "Data and activities were split across tools. The secretariat had to re-enter information, check states and manually reconstruct a significant part of daily operations.",
      rightLabel: "System", rightTitle: "One operational identity", rightBody: "Patients, professionals, appointments, settlement, packages and closure rules share one model, with server-side permissions and different views for each role."
    },
    blocks: [
      { label: "01 / The problem", title: "Centralize without losing separation and responsibility.", body: "In a psychology center, putting everything in one database is not enough. Secretariat, professionals and management need different access, and private professional notes cannot simply become generic center data." },
      { label: "02 / The decision", title: "One platform, explicit boundaries.", body: "The design uses canonical patient and professional identities, center context, server-side authorization and audited corrections. Daily UX remains simple while rules and permissions stay authoritative in the backend." },
      { label: "03 / The system", title: "Scheduling, sessions and administration in one flow.", body: "Availability, booking, moving and cancelling sessions, closure, payment status, packages, the 48-hour rule, reminders, reports and authorized corrections are handled as one operating system." },
      { label: "04 / Architecture", title: "Reuse mature foundations, build only the delta.", body: "The technical direction starts from Frappe / ERPNext and Marley Healthcare, extending them with a dedicated layer where business rules, security or workflows cannot be represented correctly using native capabilities alone." }
    ]
  },
  cloeshouse: {
    ...it.cloeshouse,
    kicker: "Booking and operations on one platform",
    problemTitle: "A booking is not simply a date on a calendar.",
    solutionTitle: "We designed booking and operations as one system.",
    lead: "Every booking consumes real capacity and carries customer, animal, document, deposit, add-on service and stay-related work. If those facts live in separate modules, staff must continuously reconcile them.",
    statusLabel: "Principle",
    status: "What the customer books should automatically become operational work.",
    comparison: {
      leftLabel: "Problem", leftTitle: "Booking and operations cannot live separately", leftBody: "A pet resort must coordinate real capacity, customer and dog data, arrivals, departures, add-on services, documents and deposit state. A booking form alone is not enough.",
      rightLabel: "System", rightTitle: "One domain from request to stay", rightBody: "Booking, customer area and back office share the same data. Staff see current guests, arrivals, departures and tasks; customers access their profile and bookings without duplicate identities."
    },
    blocks: [
      { label: "01 / The core", title: "Booking is the beginning, not the end.", body: "Accommodation availability, booking lifecycle, dog data, grooming, agreements, payments and daily operations are treated as parts of the same product." },
      { label: "02 / The customer", title: "One identity even when staff created the record first.", body: "If staff already created the customer, dog and bookings, online activation recovers that identity instead of creating a duplicate. The account remains connected to existing history." },
      { label: "03 / Operations", title: "Staff work from what is actually present and expected.", body: "The system separates accommodation availability from the daily operations view and handles arrivals, departures, grooming, documents and confirmation state tied to the deposit." },
      { label: "04 / Architecture", title: "Web product with domain rules enforced server-side.", body: "Laravel, dedicated platform components, an admin surface and myPOS integration form the technical core. Exposed APIs remain limited to flows the product actually needs." }
    ]
  },
  cube: {
    ...it.cube,
    kicker: "More structured requests, human decision retained",
    problemTitle: "Cube received requests, but had to reconstruct what the customer was actually asking for before evaluating them.",
    solutionTitle: "We did not automate the quote. We automated the information collection needed to prepare it well.",
    lead: "Event type, audience size, venue, access constraints, equipment, transport, setup and technical support could emerge at different moments in the conversation. Before quoting, Cube first had to rebuild the context.",
    statusLabel: "Choice",
    status: "Guide the request without pretending the quote can be automated.",
    comparison: {
      leftLabel: "Before", leftTitle: "Requests were hard to compare", leftBody: "When information arrives in free form, the team must first reconstruct category, venue, participants, services, access constraints, logistics and contacts.",
      rightLabel: "System", rightTitle: "A flow that prepares human evaluation", rightBody: "The flow collects a compact set of information and adapts some questions to event type. No public pricing and no automatic quotation: the final decision stays with Cube."
    },
    blocks: [
      { label: "01 / The problem", title: "Before quoting, the event has to be understood.", body: "Conferences, weddings, DJ sets and private parties do not need the same information. A generic form can create leads without creating requests that are actually easy to evaluate." },
      { label: "02 / The decision", title: "Structure the request without turning it into an endless configurator.", body: "The V1 keeps a small number of main paths and gathers event type, date, location, participants, services, power, access, logistics and contact details." },
      { label: "03 / The boundary", title: "Technology prepares; Cube decides.", body: "The summary is indicative, prices are not public and every request is evaluated directly by the team. That is a product choice, not missing automation." },
      { label: "04 / The outcome", title: "A digital presence that produces more usable requests.", body: "The website and guided flow become one commercial entry point: the customer describes the event, the system structures the data and Cube receives a more consistent context to work from." }
    ]
  },
  "system-twin": {
    ...it["system-twin"],
    kicker: "Exploration / systems intelligence",
    lead: "An experiment in reconstructing a real digital system into an interrogable representation while keeping code, runtime, configuration, APIs, documentation and evidence connected.",
    statusLabel: "Repository state",
    status: "Research / model-definition. No canonical schema or implementation stack is frozen yet.",
    comparison: {
      leftLabel: "Today", leftTitle: "System knowledge is fragmented", leftBody: "Repositories, deployments, telemetry, documentation and APIs describe different parts of the same reality and often refer to different moments in time.",
      rightLabel: "Direction", rightTitle: "A semantic model with evidence and time", rightBody: "The research tries to connect those sources in a shared model that distinguishes what is observed, declared, derived or inferred."
    },
    blocks: [
      { label: "01 / What we are exploring", title: "A semantic twin, not a diagram generator.", body: "The goal is to represent what a system does, what can change its behavior, where it runs, how data moves and how strongly each claim is supported." },
      { label: "02 / Why it may matter", title: "Understanding complex systems is still highly manual work.", body: "Debugging, audits, migrations, incident response and onboarding often require humans to reconstruct relationships scattered across many sources. An evidence-backed model could change that work." },
      { label: "03 / What we are testing", title: "Identity, provenance, time and reconciliation.", body: "The research focuses on the layer between mature parsers/telemetry and a useful causal representation: cross-source identity, conflicts, versions, confidence and multiple projections of one model." }
    ],
    boundary: "The project is still in research and model-definition phase. We are not publishing a final schema, full implementation or commercial roadmap."
  },
  "local-ai": {
    ...it["local-ai"],
    kicker: "Applied R&D / capability evaluation",
    lead: "A lab for understanding what a locally executed model can actually do on a specific workload, using reproducible evidence and explicit operating boundaries.",
    statusLabel: "Repository state",
    status: "Public Core 0.3.1 RC1 · hitch-local-ai==0.3.1 · schema 1.0.1.",
    comparison: {
      leftLabel: "Problem", leftTitle: "The model name is not a guarantee", leftBody: "Two models with similar benchmark scores can behave very differently when tools, constraints, structured outputs and real operational sequences are involved.",
      rightLabel: "Direction", rightTitle: "Test the workload before deployment", rightBody: "The path separates discovery, observed candidate, test, preflight, bounded run, evidence and comparison without turning one successful test into operational authorization."
    },
    blocks: [
      { label: "01 / What exists", title: "A versioned and verifiable public core.", body: "The project exposes a Python package, CLI, schemas, job/test packs and output contracts for describing and verifying local-AI work reproducibly." },
      { label: "02 / What we are looking for", title: "A useful decision measure, not a model leaderboard.", body: "The question is not which model is best in general, but which model + runtime + workload combination satisfies a concrete contract with enough evidence." },
      { label: "03 / Potential", title: "A qualification layer for private and on-prem AI.", body: "If the thesis holds across domains, the value could be an independent layer between local models and enterprise workloads: test first, qualify separately, operate only within demonstrated boundaries." }
    ],
    boundary: "The public surface is intentionally separated from private R&D state, host inventories and operational recipes."
  },
  "opportunity-engine": {
    ...it["opportunity-engine"],
    kicker: "Prototype / commercial intelligence",
    lead: "A commercial research prototype that tries to find companies by starting from observable operational problems instead of starting from lists and enriching them later.",
    statusLabel: "Current milestone",
    status: "Problem Research → Prospect Research → Qualification.",
    comparison: {
      leftLabel: "Common approach", leftTitle: "List → enrichment → outreach", leftBody: "Start with a set of companies and look for enough signals to personalize contact.",
      rightLabel: "Experiment", rightTitle: "Problem → signals → companies", rightBody: "Research operational patterns first, then identify companies showing those signals and finally try to qualify them with traceable sources."
    },
    blocks: [
      { label: "01 / The workflow", title: "Research, qualification and human control.", body: "The full design moves from Problem Research to Prospect Research, Qualification, Contact Discovery, Outreach Draft, Human Gate and Feedback/Learning. The orchestrator owns state, limits and routing." },
      { label: "02 / What we are testing", title: "Whether problem-first produces materially better opportunities.", body: "The current milestone is not autonomous sales. It is proving that Problem Research → Prospect Research → Qualification can produce a small set of prospects that humans judge better than a generic list." },
      { label: "03 / Why it is interesting", title: "A commercial engine that accumulates method, not just contacts.", body: "Evidence, interpretation and hypotheses stay separate; models are replaceable execution resources and external actions remain behind a human gate." }
    ],
    boundary: "Research logic, providers and architecture are still evolving quickly. We do not publish details that would constitute the system's operational advantage."
  },
  "vertical-operations": {
    ...it["vertical-operations"],
    kicker: "Product direction / vertical SaaS",
    lead: "A product direction for vertical operating systems where what customers buy or book directly generates the work staff needs to perform.",
    statusLabel: "First test",
    status: "The first complete vertical has been built around pet hospitality.",
    comparison: {
      leftLabel: "Typical vertical software", leftTitle: "Modules that coexist", leftBody: "CRM, booking, payments and tasks often exist as separate features that still require operational reconciliation.",
      rightLabel: "Direction", rightTitle: "One operational chain", rightBody: "Availability, purchase/booking, service configuration and staff activities share the same domain and generate coherent work."
    },
    blocks: [
      { label: "01 / The thesis", title: "The product should model work, not merely record it.", body: "When a customer buys a service, that fact should automatically generate occupied capacity, tasks, ownership and operational state for the team." },
      { label: "02 / First vertical", title: "Pet resort as a proving ground.", body: "The multi-tenant V1 includes booking engine, customer area, team/roles, facilities and accommodation, tasks, stays, grooming, documents, base payments and operational reporting." },
      { label: "03 / What we are looking for", title: "How much of the operating model is reusable.", body: "The interesting question is not only the pet market: it is which operational primitives can become a foundation for other service verticals without turning into generic management software." }
    ],
    boundary: "The first product is functionally complete at V1 level, while production readiness and expansion into other verticals remain separate phases."
  },
  "trustworthy-reasoning": {
    ...it["trustworthy-reasoning"],
    kicker: "Research / epistemic AI",
    lead: "Research into AI systems that do not automatically compress conflicting evidence into one answer, but preserve history, contradictions, versions and the reasons behind conclusions.",
    statusLabel: "Phase",
    status: "Phase 0 — Call decomposition and research governance. No novelty claim is considered validated.",
    comparison: {
      leftLabel: "Problem", leftTitle: "An answer can hide the path that produced it", leftBody: "When sources, time or context conflict, merging everything into a single representation can erase important information.",
      rightLabel: "Direction", rightTitle: "Reasoning that carries its evidence", rightBody: "The research explores versioned graphs, epistemic branching, temporal contradiction, belief revision and planning that seeks new evidence when what is available is insufficient."
    },
    blocks: [
      { label: "01 / The question", title: "How should a system reason when reality is not consistent?", body: "The aim is to treat disagreement and change as part of the problem, rather than noise to be removed before reasoning starts." },
      { label: "02 / The research", title: "Evidence graphs, time and belief revision.", body: "The work combines versioned knowledge, temporality, contextual contradictions, proof-carrying merge, abstraction and evidence-seeking planning." },
      { label: "03 / Why it stays in the Lab", title: "This is a scientific direction, not a feature to sell.", body: "Before product claims come novelty, benchmarks and falsification. Psychology and education are possible validation domains, not automatic proof of the project." }
    ],
    boundary: "The project is in an early research and scientific-governance phase. No breakthrough or novelty claim is presented as already validated."
  },
};

export const detailContent: Record<SiteLang, Record<string, DetailContent>> = { it, en };

export function getDetail(lang: SiteLang, slug: string): DetailContent | undefined {
  return detailContent[lang][slug];
}
