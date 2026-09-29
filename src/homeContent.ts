import type { SiteLang } from "./detailContent";

export type Lang = SiteLang;

export type Project = {
  slug: string;
  index: string;
  name: string;
  kind: string;
  description: string;
  meta: string[];
  accent: string;
  question?: string;
  state?: string;
  focus?: string;
};

export const copy = {
  it: {
    nav: { work: "Progetti", labs: "AI Lab", faq: "FAQ", people: "Chi siamo", notes: "Research Notes" },
    heroEyebrow: "Enrico Peruffo × Michele Valleri · Bergamo",
    heroTitleA: "Progettiamo sistemi",
    heroTitleB: "intorno al lavoro reale.",
    heroBody:
      "Entriamo nei processi, capiamo dove si perdono tempo e informazioni e costruiamo il sistema digitale necessario: software, automazioni e AI solo quando servono davvero.",
    scroll: "Esplora i progetti",
    manifesto:
      "Non partiamo da una tecnologia da utilizzare. Partiamo da come viene svolto il lavoro: chi fa cosa, dove si ripetono le informazioni, cosa rallenta il processo e quali decisioni devono restare alle persone. Da lì decidiamo cosa costruire.",
    selectedLabel: "01 / Progetti",
    selectedTitle: "Progetti realizzati",
    selectedIntro:
      "Ogni progetto parte da un processo esistente. Il risultato non è uno stack tecnologico: è un modo diverso di lavorare.",
    labsLabel: "02 / AI Lab",
    labsTitle: "Un laboratorio per trasformare ipotesi AI in sistemi verificabili.",
    labsIntro:
      "Qui sviluppiamo e testiamo progetti AI che non nascono da un brief cliente: infrastrutture, prodotti e linee di ricerca costruiti per capire se un'idea può diventare un sistema reale.",
    labsNote:
      "Prototipi, esperimenti e progetti AI in evoluzione · rendiamo pubblica la direzione, non i dettagli che costituiscono il vantaggio tecnico.",
    faqLabel: "03 / FAQ",
    faqTitle: "Domande che vale la pena chiarire.",
    faqIntro:
      "Il punto non è applicare più tecnologia. È capire quale cambiamento serve davvero, cosa conviene costruire e quali limiti mantenere espliciti.",
    peopleLabel: "00 / Chi siamo",
    peopleTitle: "Scopri il team",
    peopleIntro: "",
    enricoRole: "AI & Systems Engineering",
    enricoText:
      "Architetture software, infrastruttura, AI locale, orchestrazione e implementazione tecnica. Porta sistemi complessi da ipotesi a ambienti eseguibili e verificabili.",
    micheleRole: "Product & Process Design",
    micheleText:
      "Analisi dei processi, progettazione del prodotto e trasformazione dei problemi operativi in sistemi costruibili.",
    portraitNote: "Ritratto in arrivo",
    footerTop: "EMPV / Enrico + Michele",
    footerBottom: "Systems · Products · AI · Research",
    language: "EN",
  },
  en: {
    nav: { work: "Projects", labs: "AI Lab", faq: "FAQ", people: "Who we are", notes: "Research Notes" },
    heroEyebrow: "Enrico Peruffo × Michele Valleri · Bergamo",
    heroTitleA: "We design systems",
    heroTitleB: "around real work.",
    heroBody:
      "We step into processes, understand where time and information are lost, then build the digital system that is actually needed — software, automation and AI only when they add real value.",
    scroll: "Explore projects",
    manifesto:
      "We do not start with a technology to deploy. We start with how work is actually done: who does what, where information is repeated, what slows the process down and which decisions should remain human. From there, we decide what to build.",
    selectedLabel: "01 / Projects",
    selectedTitle: "Projects delivered",
    selectedIntro:
      "Every project starts from an existing process. The outcome is not a technology stack: it is a different way of working.",
    labsLabel: "02 / AI Lab",
    labsTitle: "A lab for turning AI hypotheses into verifiable systems.",
    labsIntro:
      "Here we develop and test AI projects that do not start from a client brief: infrastructure, products and research directions built to find out whether an idea can become a real system.",
    labsNote:
      "Evolving AI prototypes, experiments and projects · we make the direction public, not the details that form the technical advantage.",
    faqLabel: "03 / FAQ",
    faqTitle: "Questions worth clarifying.",
    faqIntro:
      "The point is not to apply more technology. It is to understand what change is actually needed, what is worth building and which boundaries should remain explicit.",
    peopleLabel: "00 / Who we are",
    peopleTitle: "Meet the team",
    peopleIntro: "",
    enricoRole: "AI & Systems Engineering",
    enricoText:
      "Software architecture, infrastructure, local AI, orchestration and technical implementation. Turns complex hypotheses into executable and verifiable systems.",
    micheleRole: "Product & Process Design",
    micheleText:
      "Process analysis, product design and the transformation of operational problems into systems that can actually be built.",
    portraitNote: "Portrait coming soon",
    footerTop: "EMPV / Enrico + Michele",
    footerBottom: "Systems · Products · AI · Research",
    language: "IT",
  },
} as const;

export const selected: Record<Lang, Project[]> = {
  it: [
    {
      index: "01",
      slug: "commesse-posa",
      name: "Sistema operativo per commesse e posa",
      kind: "Caso reale / Serramenti",
      description:
        "Da informazioni distribuite tra cartelle, ufficio, officina e sopralluoghi a un unico sistema che accompagna la commessa dal rilievo alla posa.",
      meta: ["Commesse", "Campo → officina", "Dati condivisi", "Automazioni"],
      accent: "commessa",
    },
    {
      index: "02",
      slug: "psicologia-operations",
      name: "Gestione operativa per uno studio psicologico",
      kind: "Caso reale / Psicologia",
      description:
        "Un unico sistema per coordinare pazienti, professionisti, appuntamenti, sedute e amministrazione, rispettando ruoli e responsabilità differenti.",
      meta: ["Operations", "Scheduling", "Ruoli", "Amministrazione"],
      accent: "psychology",
    },
    {
      index: "03",
      slug: "pet-resort-operations",
      name: "Piattaforma operativa per una struttura pet",
      kind: "Caso reale / Pet hospitality",
      description:
        "Prenotazione cliente e lavoro quotidiano dello staff nello stesso sistema: soggiorni, disponibilità, attività, grooming, documenti e pagamenti.",
      meta: ["Hospitality ops", "Booking", "Area cliente", "Daily operations"],
      accent: "pet",
    },
    {
      index: "04",
      slug: "richieste-preventivi",
      name: "Sistema di qualificazione richieste e preventivi",
      kind: "Caso reale / Audio & eventi",
      description:
        "Da richieste libere e difficili da valutare a un percorso guidato che raccoglie le informazioni necessarie prima della preparazione del preventivo.",
      meta: ["Lead flow", "Richiesta guidata", "Website", "Human review"],
      accent: "events",
    },
  ],
  en: [
    {
      index: "01",
      slug: "commesse-posa",
      name: "Job and installation operating system",
      kind: "Real case / Windows & doors",
      description:
        "From information split across folders, office, workshop and site surveys to one system that follows each job from measurement to installation.",
      meta: ["Jobs", "Field → workshop", "Shared data", "Automation"],
      accent: "commessa",
    },
    {
      index: "02",
      slug: "psicologia-operations",
      name: "Operations platform for a psychology practice",
      kind: "Real case / Psychology",
      description:
        "One operating system for patients, professionals, appointments, sessions and administration, while preserving distinct roles and responsibilities.",
      meta: ["Operations", "Scheduling", "Roles", "Administration"],
      accent: "psychology",
    },
    {
      index: "03",
      slug: "pet-resort-operations",
      name: "Operations platform for a pet facility",
      kind: "Real case / Pet hospitality",
      description:
        "Customer booking and staff operations in the same system: stays, availability, tasks, grooming, documents and payments.",
      meta: ["Hospitality ops", "Booking", "Customer area", "Daily operations"],
      accent: "pet",
    },
    {
      index: "04",
      slug: "richieste-preventivi",
      name: "Request qualification and quoting system",
      kind: "Real case / Audio & events",
      description:
        "From unstructured requests that were hard to evaluate to a guided flow that collects the information needed before preparing a quote.",
      meta: ["Lead flow", "Guided request", "Website", "Human review"],
      accent: "events",
    },
  ],
};


export const faqs: Record<Lang, { question: string; answer: string }[]> = {
  it: [
    {
      question: "Che tipo di problemi affrontate?",
      answer:
        "Situazioni in cui il lavoro dipende da passaggi manuali, informazioni disperse, strumenti che non comunicano o decisioni che richiedono troppo contesto ricostruito ogni volta. Prima di proporre una soluzione cerchiamo di capire dove nasce davvero l'attrito operativo.",
    },
    {
      question: "Partite sempre dall'AI?",
      answer:
        "No. L'AI è una possibilità, non il punto di partenza. Se un problema si risolve meglio con software tradizionale, integrazioni o automazioni deterministiche, preferiamo la soluzione più semplice. Usiamo AI quando cambia realmente ciò che il sistema può fare.",
    },
    {
      question: "Costruite tutto da zero?",
      answer:
        "Quasi mai per principio. Valutiamo prima ciò che esiste già, preserviamo gli strumenti specialistici che funzionano e costruiamo il layer mancante. Il valore non è riscrivere tutto: è far funzionare meglio il sistema complessivo.",
    },
    {
      question: "Potete lavorare con dati che devono restare in azienda?",
      answer:
        "Sì. Quando privacy, proprietà del dato, latenza o controllo lo richiedono, progettiamo anche architetture locali o on-premise e flussi in cui i dati non devono uscire dall'organizzazione. Il cloud resta uno strumento, non un requisito.",
    },
    {
      question: "Come inizia un progetto?",
      answer:
        "Ricostruiamo il processo reale: persone, passaggi, strumenti, dati, vincoli e decisioni. Poi individuiamo il cambiamento più piccolo capace di eliminare un attrito importante, lo rendiamo verificabile e solo dopo estendiamo il sistema.",
    },
    {
      question: "I progetti dell'AI Lab possono diventare startup?",
      answer:
        "Alcuni sì. Il Lab serve proprio a separare un'idea interessante da una tesi che regge tecnicamente e come prodotto. Quando una direzione dimostra abbastanza valore può evolvere in prodotto autonomo, spin-off o nuova iniziativa.",
    },
    {
      question: "Siete aperti a partnership o investimenti?",
      answer:
        "Su alcune direzioni selezionate sì, soprattutto quando la controparte porta capitale, distribuzione, dati, competenza di dominio o capacità di validazione scientifica e industriale. Nel sito mostriamo la tesi e il problema; i dettagli che costituiscono vantaggio operativo restano non pubblici.",
    },
  ],
  en: [
    {
      question: "What kind of problems do you work on?",
      answer:
        "Situations where work depends on manual handoffs, scattered information, disconnected tools or decisions that require people to reconstruct context over and over. Before proposing a solution, we identify where the operational friction actually starts.",
    },
    {
      question: "Do you always start with AI?",
      answer:
        "No. AI is an option, not the starting point. If traditional software, integrations or deterministic automation solve the problem better, we prefer the simpler system. We use AI when it materially changes what the product can do.",
    },
    {
      question: "Do you build everything from scratch?",
      answer:
        "Almost never by principle. We first assess what already works, preserve mature specialist tools and build the missing layer around them. The value is not rewriting everything; it is making the overall system work better.",
    },
    {
      question: "Can you work with data that needs to stay inside the company?",
      answer:
        "Yes. When privacy, data ownership, latency or control justify it, we design local or on-premise architectures and workflows where data does not need to leave the organization. Cloud remains a tool, not a requirement.",
    },
    {
      question: "How does a project start?",
      answer:
        "We reconstruct the real process: people, handoffs, tools, data, constraints and decisions. Then we identify the smallest change capable of removing a meaningful friction, make it verifiable and only then expand the system.",
    },
    {
      question: "Can AI Lab projects become startups?",
      answer:
        "Some can. The Lab exists to separate an interesting idea from a technical and product thesis that actually holds. When a direction demonstrates enough value, it can evolve into a standalone product, spin-off or new venture.",
    },
    {
      question: "Are you open to partnerships or investment?",
      answer:
        "For selected directions, yes — especially when the counterpart brings capital, distribution, data, domain expertise or scientific and industrial validation. The site shows the thesis and the problem; details that form part of the operational advantage remain private.",
    },
  ],
};

export const labs: Record<Lang, Project[]> = {
  it: [
    {
      index: "A",
      slug: "system-twin",
      name: "System Twin",
      kind: "Research / systems intelligence",
      description:
        "Ricostruire sistemi digitali reali in un modello semantico evidence-backed che colleghi codice, configurazioni, API, runtime, telemetria e documentazione.",
      question:
        "Possiamo ricostruire ciò che un sistema fa senza confondere fatti osservati, dichiarazioni, derivazioni e inferenze?",
      state:
        "Research / model-definition · schema e stack non ancora congelati",
      focus:
        "Cross-source identity · evidence · time · reconciliation · projection",
      meta: ["System understanding", "Evidence", "Architecture"],
      accent: "twin",
    },
    {
      index: "B",
      slug: "local-ai",
      name: "Local AI",
      kind: "Applied R&D / local AI",
      description:
        "Un public core per descrivere, validare, eseguire e valutare lavoro AI locale entro confini espliciti.",
      question:
        "Come dimostriamo cosa un modello locale sa fare prima di autorizzarlo a svolgere lavoro reale?",
      state:
        "Public Core 0.3.1 RC1 · schema 1.0.1",
      focus:
        "discover → candidate → TEST → preflight → one-RUN authorization → bounded RUN → evidence → compare",
      meta: ["Local models", "Evaluation", "Evidence"],
      accent: "local",
    },
    {
      index: "C",
      slug: "opportunity-engine",
      name: "Opportunity Engine",
      kind: "MVP / agent orchestration",
      description:
        "Un orchestratore evidence-first che parte da problemi operativi osservabili e li trasforma in ricerca, qualificazione e opportunità commerciali controllate.",
      question:
        "Partire dai problemi invece che da liste di aziende produce prospect che un revisore umano considera materialmente migliori?",
      state:
        "Current milestone: Problem Research → Prospect Research → Qualification",
      focus:
        "Evidence ≠ interpretation ≠ hypothesis · human gate for external actions",
      meta: ["Problem research", "Qualification", "Human gate"],
      accent: "opportunity",
    },
    {
      index: "D",
      slug: "trustworthy-reasoning",
      name: "Trustworthy Reasoning",
      kind: "Research / epistemic AI",
      description:
        "Ricerca di fattibilità su cognitive AI che mantiene evidenza, tempo, versioni e contraddizioni come parte esplicita del ragionamento.",
      question:
        "Possiamo costruire un progetto scientifico difendibile su reasoning, abstraction e planning che preservi la storia dell'evidenza?",
      state:
        "Phase 0 — Call decomposition and research governance",
      focus:
        "No novelty claim validated · evidence graphs · bitemporal knowledge · epistemic branching",
      meta: ["Reasoning", "Evidence", "Trust"],
      accent: "reasoning",
    },
  ],
  en: [
    {
      index: "A",
      slug: "system-twin",
      name: "System Twin",
      kind: "Research / systems intelligence",
      description:
        "Reconstructing real digital systems into an evidence-backed semantic model spanning code, configuration, APIs, runtime, telemetry and documentation.",
      question:
        "Can we reconstruct what a system does without conflating observed facts, declarations, derivations and inferences?",
      state:
        "Research / model-definition · schema and stack not frozen",
      focus:
        "Cross-source identity · evidence · time · reconciliation · projection",
      meta: ["System understanding", "Evidence", "Architecture"],
      accent: "twin",
    },
    {
      index: "B",
      slug: "local-ai",
      name: "Local AI",
      kind: "Applied R&D / local AI",
      description:
        "A public core for describing, validating, executing and evaluating bounded local-AI work.",
      question:
        "How do we prove what a local model can do before authorizing it to perform real work?",
      state:
        "Public Core 0.3.1 RC1 · schema 1.0.1",
      focus:
        "discover → candidate → TEST → preflight → one-RUN authorization → bounded RUN → evidence → compare",
      meta: ["Local models", "Evaluation", "Evidence"],
      accent: "local",
    },
    {
      index: "C",
      slug: "opportunity-engine",
      name: "Opportunity Engine",
      kind: "MVP / agent orchestration",
      description:
        "An evidence-first orchestrator that starts from observable operational problems and turns them into controlled research, qualification and commercial opportunities.",
      question:
        "Does starting from problems instead of company lists produce prospects that human reviewers consider materially better?",
      state:
        "Current milestone: Problem Research → Prospect Research → Qualification",
      focus:
        "Evidence ≠ interpretation ≠ hypothesis · human gate for external actions",
      meta: ["Problem research", "Qualification", "Human gate"],
      accent: "opportunity",
    },
    {
      index: "D",
      slug: "trustworthy-reasoning",
      name: "Trustworthy Reasoning",
      kind: "Research / epistemic AI",
      description:
        "Feasibility research into cognitive AI that keeps evidence, time, versions and contradictions explicit inside the reasoning process.",
      question:
        "Can we build a defensible scientific project around reasoning, abstraction and planning that preserves the history of evidence?",
      state:
        "Phase 0 — Call decomposition and research governance",
      focus:
        "No novelty claim validated · evidence graphs · bitemporal knowledge · epistemic branching",
      meta: ["Reasoning", "Evidence", "Trust"],
      accent: "reasoning",
    },
  ],
};
