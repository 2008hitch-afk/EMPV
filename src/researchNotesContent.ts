import type { SiteLang } from "./detailContent";

export type ResearchNoteSection = {
  label: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ResearchNote = {
  id: string;
  index: string;
  slugs: Record<SiteLang, string>;
  title: Record<SiteLang, string>;
  dek: Record<SiteLang, string>;
  category: Record<SiteLang, string>;
  tags: Record<SiteLang, string[]>;
  published: string;
  updated?: string;
  readingTime: Record<SiteLang, string>;
  sections: Record<SiteLang, ResearchNoteSection[]>;
  takeaway: Record<SiteLang, string>;
};

export const researchNotes: ResearchNote[] = [
  {
    "id": "gemini-4-argon",
    "index": "006",
    "slugs": {
      "it": "gemini-4-argon-agenti-ai-lavoro-lungo",
      "en": "gemini-4-argon-long-horizon-ai-agents"
    },
    "title": {
      "it": "Gemini 4 Argon: task lunghi, agenti e limiti",
      "en": "Gemini 4 Argon: long-running tasks, agents and limits"
    },
    "dek": {
      "it": "Google ha progettato Argon per attività che richiedono molti passaggi e possono durare a lungo. La parte da osservare è come mantiene stato, usa strumenti e recupera dagli errori mentre il lavoro procede.",
      "en": "Google designed Argon for tasks that require many steps and can run for a long time. The useful question is how well it maintains state, uses tools and recovers from errors as the work progresses."
    },
    "category": {
      "it": "FRONTIER NOTE / AI AGENTS",
      "en": "FRONTIER NOTE / AI AGENTS"
    },
    "tags": {
      "it": [
        "Gemini 4 Argon",
        "AI agents",
        "Long-horizon",
        "Enterprise AI"
      ],
      "en": [
        "Gemini 4 Argon",
        "AI agents",
        "Long-horizon",
        "Enterprise AI"
      ]
    },
    "published": "2026-10-01",
    "readingTime": {
      "it": "7 min",
      "en": "7 min"
    },
    "sections": {
      "it": [
        {
          "label": "01 / Cosa ha annunciato Google",
          "title": "Argon è il nuovo modello Gemini 4 dedicato ai task lunghi e multi-step.",
          "paragraphs": [
            "Google ha annunciato Gemini 4 Argon il 30 settembre 2026. La descrizione ufficiale concentra il modello su software engineering, attività enterprise — inclusi finanza e legal — e cybersecurity difensiva.",
            "Il rollout iniziale è limitato: Argon viene distribuito a un gruppo di cyber defender selezionati attraverso il Fairwind Program mentre Google continua test e guardrail prima di una disponibilità più ampia."
          ]
        },
        {
          "label": "02 / Perché conta",
          "title": "Il punto è capire se il modello regge una sequenza lunga senza perdere stato o accumulare errori.",
          "paragraphs": [
            "Google porta il limite di output di Argon fino a 1 milione di token, rispetto ai 64K precedenti, e descrive il modello come capace di mantenere una singola traiettoria di ragionamento su problemi molto più lunghi del classico prompt-response.",
            "Per un agente questo conta più di un incremento marginale su un benchmark. Un agente utile deve pianificare, leggere stato e strumenti, produrre modifiche, controllare le conseguenze, correggersi e continuare."
          ]
        },
        {
          "label": "03 / Dove lo sta usando Google",
          "title": "Google lo sta testando su data center e codebase interne, dove una risposta sbagliata ha conseguenze misurabili.",
          "paragraphs": [
            "Tra gli esempi pubblicati ci sono agenti che analizzano telemetria dei data center per trovare ottimizzazioni di memoria e attività di migrazione di grandi codebase C/C++ verso Rust, fino a componenti da centinaia di migliaia di linee.",
            "Il modello non lavora da solo: Google descrive test automatici, audit manuale, emulazione e review prima del rollout. Il dato utile è proprio questo contesto, perché permette di capire quanto del risultato dipenda dal modello e quanto dall’infrastruttura che lo circonda."
          ]
        },
        {
          "label": "04 / Enterprise AI",
          "title": "Google sta puntando Argon anche su attività enterprise, non solo sul coding.",
          "paragraphs": [
            "Google dichiara risultati forti su valutazioni di software engineering long-horizon, ricerca finanziaria multi-step, lavoro legale e automazione end-to-end. Sul benchmark AutomationBench di Zapier, per esempio, Google riporta un punteggio di 51,3%.",
            "Google cita anche analisi di grafici, video lunghi e sequenze di documenti. In pratica sta cercando di usare lo stesso modello dentro attività composte da più fonti, strumenti e passaggi, invece che su richieste isolate."
          ]
        },
        {
          "label": "05 / Cybersecurity",
          "title": "Un agente che può eseguire più passaggi può anche fare più danni quando sbaglia.",
          "paragraphs": [
            "Argon è stato addestrato per trovare, validare e correggere vulnerabilità software. Proprio questa capacità spiega il rilascio iniziale ristretto e il lavoro dichiarato da Google su misuse, prompt injection, monitoraggio del disallineamento e isolamento degli ambienti di esecuzione.",
            "È una distinzione utile per qualunque sistema agentico: capacità del modello e autorizzazione operativa sono due cose diverse. Un agente può essere capace di fare qualcosa senza dover avere automaticamente il permesso di farla in produzione."
          ]
        },
        {
          "label": "06 / Benchmark ≠ verdetto",
          "title": "I benchmark non chiudono la discussione.",
          "paragraphs": [
            "Google pubblica risultati molto forti su diversi benchmark, incluso il 77,9% su DeepSWE v1.1 per software engineering long-horizon. Reuters osserva però che Argon resta dietro ai rivali su alcune metriche di coding incluse nello stesso confronto.",
            "Per scegliere un modello servono test sui propri workload, con gli strumenti e i vincoli che avrà in produzione. Vanno misurati errori, latenza, costo e comportamento sui casi limite. La leaderboard serve al massimo a scegliere quali modelli provare."
          ]
        },
        {
          "label": "07 / La lettura EMPV",
          "title": "Argon rende ancora più importante tutto ciò che sta intorno al modello.",
          "paragraphs": [
            "Se Argon reggerà anche nei test indipendenti, la differenza non dipenderà soltanto dal modello. Conteranno memoria, strumenti, permessi, test automatici, logging e gestione degli errori.",
            "Per un'azienda la domanda quindi non è soltanto quale modello usare, ma come inserirlo in un processo in cui sia chiaro cosa può fare, quali dati può toccare e cosa succede quando sbaglia."
          ]
        },
        {
          "label": "08 / Fonti",
          "title": "Fonti usate per questa nota.",
          "paragraphs": [
            "I numeri citati sopra arrivano dall’annuncio di Google; Reuters aggiunge un confronto esterno e segnala che Argon non è primo su tutte le metriche di coding."
          ],
          "bullets": [
            "Google, “Gemini 4 Argon: our next era of frontier intelligence”, 30 settembre 2026 — https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/",
            "Reuters, “Google announces Gemini 4 flagship AI model after months of delays”, 30 settembre 2026 — https://www.reuters.com/legal/litigation/google-announces-gemini-4-flagship-ai-model-after-months-delays-2026-09-30/"
          ]
        }
      ],
      "en": [
        {
          "label": "01 / What Google announced",
          "title": "Argon is Google's new Gemini 4 model for long-running, multi-step tasks.",
          "paragraphs": [
            "Google announced Gemini 4 Argon on September 30, 2026. The official description focuses on real-world software engineering, enterprise knowledge work — including finance and legal — and defensive cybersecurity.",
            "The initial rollout is restricted: Argon is being provided to selected cyber defenders through the Fairwind Program while Google continues testing safeguards before broader availability."
          ]
        },
        {
          "label": "02 / Why it matters",
          "title": "The question is whether the model can survive a long sequence without losing state or compounding errors.",
          "paragraphs": [
            "Google expands Argon's output limit to as much as one million tokens, up from 64K, and describes the model as capable of maintaining a single reasoning trajectory across problems far longer than the usual prompt-response loop.",
            "For agents, that matters more than a marginal benchmark gain. A useful agent needs to plan, read state and tools, make changes, inspect consequences, recover from mistakes and keep going."
          ]
        },
        {
          "label": "03 / Where Google is using it",
          "title": "Google is testing Argon on data centers and internal codebases, where mistakes have measurable consequences.",
          "paragraphs": [
            "Published examples include agents analysing data-center telemetry for memory optimisations and migrating large C/C++ codebases to Rust, including components with hundreds of thousands of lines.",
            "The model is not working alone. Google describes automated tests, manual audits, emulation and review before rollout. That context matters because it shows how much of the outcome depends on the model and how much depends on the surrounding system."
          ]
        },
        {
          "label": "04 / Enterprise AI",
          "title": "Google is targeting enterprise work as well as coding.",
          "paragraphs": [
            "Google reports strong results on long-horizon software engineering, multi-step financial research, legal work and end-to-end automation. On Zapier's AutomationBench, for example, Google reports a score of 51.3%.",
            "Google also cites work across charts, long videos and document sequences. In practice, the model is being pushed into tasks that combine multiple sources, tools and steps rather than isolated requests."
          ]
        },
        {
          "label": "05 / Cybersecurity",
          "title": "An agent that can execute more steps can also cause more damage when it gets something wrong.",
          "paragraphs": [
            "Argon was trained to find, validate and patch software vulnerabilities. That capability helps explain the restricted release and Google's stated work on misuse prevention, prompt injection, misalignment monitoring and isolated execution environments.",
            "The distinction applies to any agentic system: model capability and operational authorization are different things. An agent may be capable of an action without automatically receiving permission to perform it in production."
          ]
        },
        {
          "label": "06 / Benchmark ≠ verdict",
          "title": "Benchmarks do not settle the question.",
          "paragraphs": [
            "Google reports strong benchmark results, including 77.9% on DeepSWE v1.1 for long-horizon software engineering. Reuters notes, however, that Argon remains behind competitors on some coding metrics included in the same comparison.",
            "Model selection requires tests on your own workloads, with the tools and constraints the model will actually face. Errors, latency, cost and edge cases matter more than the average leaderboard position."
          ]
        },
        {
          "label": "07 / The EMPV reading",
          "title": "Argon makes the surrounding system more important, not less.",
          "paragraphs": [
            "If Argon holds up in independent testing, the difference will not come from the model alone. Memory, tools, permissions, automated tests, logging and error handling will matter just as much.",
            "For a company, the question is not only which model to use, but how it is placed inside a process where its permissions, data access and failure handling are explicit."
          ]
        },
        {
          "label": "08 / Sources",
          "title": "Sources used for this note.",
          "paragraphs": [
            "This note separates Google's reported results from external observations and should be read in the context of Argon's still-limited rollout."
          ],
          "bullets": [
            "Google, “Gemini 4 Argon: our next era of frontier intelligence”, September 30, 2026 — https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/",
            "Reuters, “Google announces Gemini 4 flagship AI model after months of delays”, September 30, 2026 — https://www.reuters.com/legal/litigation/google-announces-gemini-4-flagship-ai-model-after-months-delays-2026-09-30/"
          ]
        }
      ]
    },
    "takeaway": {
      "it": "Argon sarà interessante se reggerà task lunghi senza perdere stato o accumulare errori. È questo che andrebbe testato.",
      "en": "Argon will be interesting if it can handle long-running tasks without losing state or compounding errors. That is what should be tested."
    }
  },
  {
    id: "local-llm-evaluation",
    index: "001",
    slugs: {
      it: "valutare-llm-locale-prima-produzione",
      en: "evaluating-local-llms-before-production",
    },
    title: {
      it: "Come valutare un LLM locale prima di usarlo in produzione",
      en: "How to evaluate a local LLM before using it in production",
    },
    dek: {
      it: "Il nome del modello e il benchmark non bastano. Prima di affidare a un modello locale attività operative bisogna testare workload, runtime, vincoli e failure mode.",
      en: "A model name and a benchmark score are not enough. Before a local model receives production tasks, workload, runtime, constraints and failure modes need to be tested together.",
    },
    category: { it: "TECH NOTE / LOCAL AI", en: "TECH NOTE / LOCAL AI" },
    tags: {
      it: ["LLM locale", "Evaluation", "On-premise", "AI privata"],
      en: ["Local LLM", "Evaluation", "On-premise", "Private AI"],
    },
    published: "2026-09-29",
    readingTime: { it: "6 min", en: "6 min" },
    sections: {
      it: [
        {
          label: "01 / Il problema",
          title: "Un benchmark misura una capacità astratta. Un'azienda compra un risultato operativo.",
          paragraphs: [
            "Un modello può ottenere buoni risultati su benchmark pubblici e fallire comunque nel lavoro che gli vogliamo affidare. Un workload aziendale contiene formati, strumenti, dati sporchi, vincoli di latenza, output strutturati e conseguenze operative che il benchmark non rappresenta.",
            "Per questo la domanda utile non è «qual è il modello migliore?», ma «questa combinazione di modello, runtime e workload rispetta il contratto che ci serve?»."
          ],
        },
        {
          label: "02 / Il contratto",
          title: "Prima del test bisogna rendere esplicito cosa significa riuscire.",
          paragraphs: [
            "Il test dovrebbe partire da un contratto osservabile: input ammessi, output atteso, strumenti disponibili, tempo massimo, errori tollerabili e casi che devono fermare il flusso.",
            "Se questi confini non esistono, un risultato apparentemente corretto può diventare una falsa autorizzazione."
          ],
          bullets: [
            "definire il workload prima di scegliere il modello",
            "separare qualità dell'output e capacità di usare strumenti",
            "misurare failure mode, non solo successi",
            "conservare evidenza riproducibile del test"
          ],
        },
        {
          label: "03 / Il test",
          title: "Modello e runtime vanno valutati insieme.",
          paragraphs: [
            "Quantizzazione, context window, prompt format, tool calling, memoria disponibile e librerie del runtime possono cambiare il comportamento del modello. Lo stesso modello può quindi produrre risultati diversi in ambienti diversi.",
            "Un test utile registra configurazione, versione, input, output, tempi e condizioni. In questo modo il risultato può essere ripetuto e confrontato."
          ],
        },
        {
          label: "04 / L'autorizzazione",
          title: "Passare un test non significa ottenere permesso permanente.",
          paragraphs: [
            "Una prova riuscita dimostra una capacità entro condizioni precise. Non dimostra che il modello possa operare senza limiti su input diversi, dati nuovi o strumenti aggiuntivi.",
            "Per workload sensibili conviene separare qualification e authorization: prima dimostrare la capacità, poi autorizzare un perimetro operativo ristretto e osservabile."
          ],
        },
        {
          label: "05 / Cosa cambia",
          title: "La scelta del modello diventa una decisione ingegneristica, non una classifica.",
          paragraphs: [
            "Questo approccio permette anche a modelli più piccoli di essere utili quando soddisfano un contratto specifico, e impedisce di affidare lavoro critico a un modello grande soltanto perché è forte in media.",
            "L'obiettivo non è trovare il modello migliore in assoluto. È sapere cosa può fare, in quale ambiente, con quali prove e con quali limiti."
          ],
        },
      ],
      en: [
        {
          label: "01 / The problem",
          title: "A benchmark measures an abstract capability. A company needs an operational outcome.",
          paragraphs: [
            "A model can perform well on public benchmarks and still fail at the work we want it to perform. Production workloads include formats, tools, messy data, latency constraints, structured outputs and operational consequences that a benchmark does not represent.",
            "The useful question is therefore not “which model is best?”, but “does this model + runtime + workload combination satisfy the contract we need?”"
          ],
        },
        {
          label: "02 / The contract",
          title: "Before testing, success has to be made explicit.",
          paragraphs: [
            "A useful test starts from an observable contract: allowed inputs, expected output, available tools, time limits, acceptable errors and conditions that must stop the flow.",
            "Without those boundaries, an apparently correct result can become a false authorization."
          ],
          bullets: [
            "define the workload before choosing the model",
            "separate output quality from tool-use capability",
            "record failure modes alongside successful cases",
            "keep reproducible evidence of every test"
          ],
        },
        {
          label: "03 / The test",
          title: "Model and runtime need to be evaluated together.",
          paragraphs: [
            "Quantization, context window, prompt format, tool calling, available memory and runtime libraries can change model behaviour. The same model can therefore produce different outcomes in different environments.",
            "A useful test records configuration, version, input, output, timing and conditions so the result can be repeated and compared."
          ],
        },
        {
          label: "04 / Authorization",
          title: "Passing a test is not permanent permission.",
          paragraphs: [
            "A successful test demonstrates a capability under specific conditions. It does not prove that the model can operate without limits on different inputs, new data or additional tools.",
            "For sensitive workloads it is useful to separate qualification from authorization: demonstrate the capability first, then authorize a narrow and observable operating boundary."
          ],
        },
        {
          label: "05 / What changes",
          title: "Model selection becomes an engineering decision, not a leaderboard.",
          paragraphs: [
            "This approach can make smaller models useful when they satisfy a specific contract, while preventing a large model from receiving critical work simply because it performs well on average.",
            "The goal is not to find the best model in general. It is to know what a model can do, in which environment, with what evidence and within which limits."
          ],
        },
      ],
    },
    takeaway: {
      it: "Prima del deployment, qualifica il workload. Il modello viene dopo.",
      en: "Before deployment, qualify the workload. The model comes after.",
    },
  },
  {
    id: "on-premise-vs-cloud",
    index: "002",
    slugs: {
      it: "ai-on-premise-vs-cloud-quando-conviene",
      en: "ai-on-premise-vs-cloud-when-it-makes-sense",
    },
    title: {
      it: "AI on-premise vs cloud: come scegliere",
      en: "On-premise vs cloud AI: how to choose",
    },
    dek: {
      it: "Tenere un modello in azienda non è automaticamente più sicuro, economico o utile. La scelta ha senso quando controllo, latenza, proprietà del dato e workload giustificano l'infrastruttura.",
      en: "Running a model inside the company is not automatically safer, cheaper or more useful. It makes sense when control, latency, data ownership and workload justify the infrastructure.",
    },
    category: { it: "TECH NOTE / AI INFRASTRUCTURE", en: "TECH NOTE / AI INFRASTRUCTURE" },
    tags: {
      it: ["AI on-premise", "Cloud", "Privacy", "Infrastruttura"],
      en: ["On-premise AI", "Cloud", "Privacy", "Infrastructure"],
    },
    published: "2026-09-29",
    readingTime: { it: "6 min", en: "6 min" },
    sections: {
      it: [
        {
          label: "01 / Non è una religione",
          title: "Cloud e on-premise sono strumenti diversi.",
          paragraphs: [
            "Portare l'AI in locale può dare più controllo sul percorso dei dati, sull'ambiente di esecuzione e sulla disponibilità del sistema. Ma introduce anche hardware, aggiornamenti, monitoraggio, sicurezza e capacità operative da gestire.",
            "Il cloud riduce molta di questa complessità e rende facile accedere a modelli molto capaci. In cambio, l'azienda dipende da un servizio esterno e deve progettare con attenzione il trattamento dei dati."
          ],
        },
        {
          label: "02 / Quando il locale ha senso",
          title: "Il locale ha senso quando esiste un vincolo preciso.",
          paragraphs: [
            "Un deployment locale è interessante quando dati o documenti non devono lasciare un perimetro definito, quando la latenza deve essere prevedibile, quando serve operare offline o quando il workload è abbastanza stabile da giustificare un'infrastruttura dedicata."
          ],
          bullets: [
            "dati con requisiti di controllo o segregazione",
            "workload ripetibili e frequenti",
            "necessità di funzionare senza dipendere da Internet",
            "integrazione stretta con sistemi interni",
            "esigenza di fissare modello e runtime"
          ],
        },
        {
          label: "03 / Quando il cloud è migliore",
          title: "Il cloud offre elasticità e accesso rapido a modelli più capaci.",
          paragraphs: [
            "Se i carichi sono irregolari, cambiano spesso o richiedono modelli molto grandi, il cloud può essere la scelta più efficiente. È anche utile durante la fase di scoperta, quando non sappiamo ancora quale workload meriti una infrastruttura dedicata.",
            "L'architettura può anche essere ibrida: non serve scegliere una categoria una volta per tutte."
          ],
        },
        {
          label: "04 / La decisione",
          title: "Prima si definisce il confine del dato, poi si sceglie dove eseguire.",
          paragraphs: [
            "Una decisione utile parte da quattro domande: quali dati entrano, quali dati escono, quale capacità serve e quale livello di dipendenza esterna è accettabile.",
            "Solo dopo ha senso confrontare costi, hardware, API e modelli."
          ],
        },
      ],
      en: [
        {
          label: "01 / Not a religion",
          title: "Cloud and on-premise are different tools.",
          paragraphs: [
            "Running AI locally can provide more control over data paths, the execution environment and system availability. It also introduces hardware, updates, monitoring, security and operational capacity that someone has to manage.",
            "Cloud services remove much of that complexity and make powerful models easy to access. In exchange, the company depends on an external service and needs to design data handling carefully."
          ],
        },
        {
          label: "02 / When local makes sense",
          title: "Local deployment makes sense when there is a specific constraint.",
          paragraphs: [
            "A local deployment becomes interesting when data or documents must stay inside a defined boundary, latency needs to be predictable, offline operation matters or the workload is stable enough to justify dedicated infrastructure."
          ],
          bullets: [
            "data with control or segregation requirements",
            "repeatable and frequent workloads",
            "operation without Internet dependency",
            "tight integration with internal systems",
            "need to pin model and runtime"
          ],
        },
        {
          label: "03 / When cloud is better",
          title: "Cloud offers elasticity and fast access to larger models.",
          paragraphs: [
            "If workloads are irregular, change frequently or need very large models, cloud can be more efficient. It is also useful during discovery, when we do not yet know which workload deserves dedicated infrastructure.",
            "The architecture can also be hybrid; it does not need to fit one category permanently."
          ],
        },
        {
          label: "04 / The decision",
          title: "Define the data boundary first, then decide where execution belongs.",
          paragraphs: [
            "A useful decision starts with four questions: what data enters, what data leaves, what capability is required and what level of external dependency is acceptable.",
            "Only then does it make sense to compare costs, hardware, APIs and models."
          ],
        },
      ],
    },
    takeaway: {
      it: "On-premise è una scelta architetturale dettata da requisiti di controllo, latenza o dipendenza.",
      en: "On-premise is an architectural choice driven by control, latency or dependency requirements.",
    },
  },
  {
    id: "email-to-order",
    index: "003",
    slugs: {
      it: "da-email-a-ordine-senza-rifare-gestionale",
      en: "from-email-to-order-without-replacing-the-erp",
    },
    title: {
      it: "Da email a ordine senza rifare il gestionale",
      en: "From email to order without replacing the ERP",
    },
    dek: {
      it: "Molte automazioni falliscono perché provano a sostituire il sistema centrale. Spesso basta un layer che legge, struttura, valida e prepara il dato prima che entri nel gestionale.",
      en: "Many automation projects fail because they try to replace the core system. Often a layer that reads, structures, validates and prepares data before it enters the ERP is enough.",
    },
    category: { it: "FIELD NOTE / OPERATIONS", en: "FIELD NOTE / OPERATIONS" },
    tags: {
      it: ["Ordini", "Email", "Data entry", "Integrazione"],
      en: ["Orders", "Email", "Data entry", "Integration"],
    },
    published: "2026-09-29",
    readingTime: { it: "5 min", en: "5 min" },
    sections: {
      it: [
        {
          label: "01 / Il pattern",
          title: "Il problema spesso non è il gestionale: è ciò che succede prima.",
          paragraphs: [
            "Un ordine può arrivare come email, PDF, Excel o testo libero. Prima di essere registrato qualcuno deve riconoscere cliente, codici, quantità, date, note e condizioni. Quel lavoro manuale è spesso invisibile nelle mappe di processo.",
            "Sostituire il gestionale per eliminare quel passaggio sarebbe una risposta sproporzionata."
          ],
        },
        {
          label: "02 / Il layer",
          title: "Estrarre, normalizzare, verificare, poi consegnare.",
          paragraphs: [
            "Un layer intermedio può ricevere il documento, estrarre i campi utili, normalizzarli sul modello interno e segnalare ciò che non torna. Il risultato non deve necessariamente diventare subito un ordine: può diventare una proposta pronta per revisione."
          ],
          bullets: [
            "identificazione del cliente",
            "mappatura codici e quantità",
            "controllo dei campi obbligatori",
            "segnalazione di incongruenze",
            "approvazione umana prima della scrittura"
          ],
        },
        {
          label: "03 / L'integrazione",
          title: "La scrittura nel gestionale è l'ultima parte, non la prima.",
          paragraphs: [
            "Se esiste una API affidabile si può integrare direttamente. Se il gestionale espone import strutturati, si può generare il formato richiesto. Se nessuna delle due strade è disponibile, conviene capire quanta parte del lavoro si può comunque preparare senza forzare automazioni fragili.",
            "L'obiettivo è ridurre re-entry e errori, preservando il sistema che già governa contabilità, magazzino o produzione."
          ],
        },
        {
          label: "04 / Dove entra l'AI",
          title: "L'AI serve soprattutto nella parte non strutturata.",
          paragraphs: [
            "Classificazione di email, lettura di testo libero e interpretazione di documenti variabili sono aree in cui un modello può aiutare. Validazioni deterministiche, regole di business e scrittura finale dovrebbero invece restare esplicite quando possibile.",
            "Questo riduce il numero di decisioni affidate a un modello e rende il flusso più controllabile."
          ],
        },
      ],
      en: [
        {
          label: "01 / The pattern",
          title: "The problem is often not the ERP. It is what happens before it.",
          paragraphs: [
            "An order may arrive as email, PDF, spreadsheet or free text. Before it can be recorded, someone has to identify the customer, product codes, quantities, dates, notes and conditions. That manual work is often invisible in process maps.",
            "Replacing the ERP to remove that step would be a disproportionate response."
          ],
        },
        {
          label: "02 / The layer",
          title: "Extract, normalize, verify, then deliver.",
          paragraphs: [
            "An intermediate layer can receive the document, extract useful fields, normalize them into the internal model and flag what does not match. The output does not need to become an order immediately: it can become a proposal ready for review."
          ],
          bullets: [
            "customer identification",
            "mapping product codes and quantities",
            "required-field validation",
            "inconsistency detection",
            "human approval before writing"
          ],
        },
        {
          label: "03 / Integration",
          title: "Writing into the ERP is the last part, not the first.",
          paragraphs: [
            "If a reliable API exists, direct integration is possible. If the ERP exposes structured imports, the required format can be generated. If neither path is available, quantify how much of the work can still be prepared without forcing a fragile automation.",
            "The goal is to reduce re-entry and errors while preserving the system that already governs accounting, inventory or production."
          ],
        },
        {
          label: "04 / Where AI fits",
          title: "AI is most useful in the unstructured part.",
          paragraphs: [
            "Email classification, free-text interpretation and variable document extraction are areas where a model can help. Deterministic validation, business rules and final writes should remain explicit where possible.",
            "That reduces the number of decisions delegated to a model and makes the flow easier to control."
          ],
        },
      ],
    },
    takeaway: {
      it: "Automatizzare non significa sostituire il gestionale. Spesso significa preparargli dati migliori.",
      en: "Automation does not mean replacing the ERP. Often it means feeding it better data.",
    },
  },
  {
    id: "quote-intake",
    index: "004",
    slugs: {
      it: "automatizzare-richieste-preventivo-senza-automatizzare-decisione",
      en: "automating-quote-requests-without-automating-the-decision",
    },
    title: {
      it: "Automatizzare una richiesta di preventivo senza automatizzare la decisione",
      en: "Automating a quote request without automating the decision",
    },
    dek: {
      it: "Il collo di bottiglia non è sempre calcolare un prezzo. Spesso è raccogliere in modo coerente le informazioni necessarie perché una persona possa decidere rapidamente e bene.",
      en: "The bottleneck is not always calculating a price. Often it is collecting the information a person needs to make a fast and well-informed decision.",
    },
    category: { it: "FIELD NOTE / COMMERCIAL OPS", en: "FIELD NOTE / COMMERCIAL OPS" },
    tags: {
      it: ["Preventivi", "Lead qualification", "Human review", "Workflow"],
      en: ["Quoting", "Lead qualification", "Human review", "Workflow"],
    },
    published: "2026-09-29",
    readingTime: { it: "5 min", en: "5 min" },
    sections: {
      it: [
        {
          label: "01 / Il falso obiettivo",
          title: "Un preventivo automatico non è sempre il risultato giusto.",
          paragraphs: [
            "In lavori su commessa, servizi tecnici o progetti con molte variabili, il prezzo dipende da informazioni che emergono durante la conversazione. Automatizzare completamente la quotazione può quindi spostare il problema invece di risolverlo.",
            "Il primo obiettivo può essere più semplice: far arrivare al team una richiesta già leggibile."
          ],
        },
        {
          label: "02 / La raccolta",
          title: "Chiedere soltanto le informazioni che cambiano la valutazione.",
          paragraphs: [
            "Un buon flusso non è un form infinito. Parte dalle poche variabili che determinano il percorso successivo e adatta le domande in base al tipo di richiesta.",
            "Il risultato è un contesto coerente, non una decisione automatica."
          ],
          bullets: [
            "distinguere dati obbligatori e opzionali",
            "adattare le domande al tipo di richiesta",
            "rendere visibili i dati mancanti",
            "conservare la possibilità di aggiungere contesto libero"
          ],
        },
        {
          label: "03 / La qualificazione",
          title: "Strutturare non significa giudicare.",
          paragraphs: [
            "Il sistema può verificare completezza, classificare la richiesta e preparare un riepilogo. Ma se margine, rischio o fattibilità richiedono esperienza, la decisione può restare umana.",
            "Questo confine è utile: l'automazione riduce il lavoro meccanico senza nascondere una scelta commerciale dentro un punteggio opaco."
          ],
        },
        {
          label: "04 / Il risultato",
          title: "Il team parte dal contesto, non dalla ricostruzione.",
          paragraphs: [
            "Il guadagno operativo nasce quando il commerciale o il tecnico apre la richiesta e trova già gli elementi necessari per una prima valutazione. Meno messaggi di chiarimento, meno re-entry e meno informazioni dimenticate.",
            "L'automazione prepara la decisione. Non deve necessariamente prenderla."
          ],
        },
      ],
      en: [
        {
          label: "01 / The false objective",
          title: "An automatic quote is not always the right outcome.",
          paragraphs: [
            "In project-based work, technical services or highly variable jobs, price depends on information that emerges during the conversation. Fully automating the quotation can therefore move the problem rather than solve it.",
            "The first objective can be simpler: make sure the team receives a request that is already understandable."
          ],
        },
        {
          label: "02 / Collection",
          title: "Ask only for information that changes the evaluation.",
          paragraphs: [
            "A good flow is not an endless form. It starts from the few variables that determine the next path and adapts questions to the type of request.",
            "The output is consistent context, not an automatic decision."
          ],
          bullets: [
            "separate required and optional information",
            "adapt questions to the request type",
            "make missing data visible",
            "keep room for free-form context"
          ],
        },
        {
          label: "03 / Qualification",
          title: "Structuring is not the same as judging.",
          paragraphs: [
            "The system can check completeness, classify the request and prepare a summary. But if margin, risk or feasibility require experience, the decision can remain human.",
            "That boundary is useful: automation removes mechanical work without hiding a commercial choice inside an opaque score."
          ],
        },
        {
          label: "04 / The outcome",
          title: "The team starts from context, not reconstruction.",
          paragraphs: [
            "The commercial or technical team should be able to open a request and already have the elements needed for an initial evaluation. That means fewer clarification messages, less re-entry and fewer forgotten details.",
            "Automation prepares the decision. It does not necessarily need to make it."
          ],
        },
      ],
    },
    takeaway: {
      it: "Il miglior punto di automazione può essere prima del preventivo, non nel prezzo.",
      en: "The best automation point may be before the quote, not inside the price.",
    },
  },
  {
    id: "integrate-not-replace",
    index: "005",
    slugs: {
      it: "integrare-gestionale-senza-sostituirlo",
      en: "integrating-an-erp-without-replacing-it",
    },
    title: {
      it: "Quando conviene integrare un gestionale invece di sostituirlo",
      en: "When to integrate an ERP instead of replacing it",
    },
    dek: {
      it: "Un software vecchio o scomodo può comunque contenere regole, dati e dipendenze essenziali. Prima di riscrivere tutto, conviene capire quale parte del lavoro richiede un nuovo layer.",
      en: "An old or awkward system can still contain essential rules, data and dependencies. Before rewriting everything, identify which part of the work needs a new layer.",
    },
    category: { it: "SYSTEMS NOTE / INTEGRATION", en: "SYSTEMS NOTE / INTEGRATION" },
    tags: {
      it: ["Gestionale", "ERP", "Integrazione", "Software su misura"],
      en: ["ERP", "Integration", "Custom software", "Operations"],
    },
    published: "2026-09-29",
    readingTime: { it: "6 min", en: "6 min" },
    sections: {
      it: [
        {
          label: "01 / Il rischio",
          title: "Riscrivere un sistema significa riscrivere anche ciò che non si vede.",
          paragraphs: [
            "Un gestionale può sembrare soltanto un'interfaccia poco moderna, ma spesso contiene anni di dati, regole, esportazioni, abitudini operative e collegamenti con contabilità, magazzino o produzione.",
            "Sostituirlo significa migrare anche queste dipendenze. Il costo non è soltanto sviluppare una nuova UI."
          ],
        },
        {
          label: "02 / Il layer",
          title: "A volte serve un sistema intorno al gestionale, non al posto del gestionale.",
          paragraphs: [
            "Se il problema è il lavoro che avviene prima, dopo o tra più strumenti, un layer operativo può unificare viste, raccogliere dati, orchestrare attività e inviare al gestionale soltanto ciò che deve restare autorevole lì.",
            "In questo modo il sistema esistente conserva il proprio ruolo mentre l'esperienza quotidiana cambia."
          ],
        },
        {
          label: "03 / Cosa verificare",
          title: "L'integrazione va progettata partendo da interfacce e vincoli del software esistente.",
          paragraphs: [
            "Prima di promettere una integrazione bisogna verificare API, formati di import/export, database, webhook, permessi e limiti di licenza. Dove non esiste un punto di integrazione affidabile, bisogna dirlo.",
            "Una automazione fragile che simula click può essere accettabile per un prototipo, ma non dovrebbe diventare invisibilmente infrastruttura critica."
          ],
          bullets: [
            "chi è la fonte autorevole per ogni dato",
            "quali scritture devono essere transazionali",
            "come vengono gestiti errori e duplicati",
            "quali integrazioni sono supportate dal vendor",
            "cosa succede quando uno dei sistemi non è disponibile"
          ],
        },
        {
          label: "04 / La decisione",
          title: "Sostituire solo quando integrare costa più di ciò che si conserva.",
          paragraphs: [
            "Ci sono casi in cui una riscrittura è corretta: tecnologia non più supportata, impossibilità di integrare, vincoli di sicurezza o costi operativi diventati insostenibili.",
            "La decisione dovrebbe arrivare dopo aver mappato il sistema esistente. Il principio resta semplice: conservare ciò che funziona, costruire ciò che manca."
          ],
        },
      ],
      en: [
        {
          label: "01 / The risk",
          title: "Rewriting a system also means rewriting what is not visible.",
          paragraphs: [
            "An ERP may look like an outdated interface, but it often contains years of data, rules, exports, operating habits and links to accounting, inventory or production.",
            "Replacing it means migrating those dependencies as well. The cost is not simply building a new UI."
          ],
        },
        {
          label: "02 / The layer",
          title: "Sometimes the company needs a system around the ERP, not instead of it.",
          paragraphs: [
            "If the problem lives before, after or between multiple tools, an operating layer can unify views, collect data, orchestrate activities and send the ERP only what should remain authoritative there.",
            "The existing system keeps its role while day-to-day work changes."
          ],
        },
        {
          label: "03 / What to verify",
          title: "Integration has to start from the actual capabilities of the existing software.",
          paragraphs: [
            "Before promising an integration, APIs, import/export formats, databases, webhooks, permissions and licensing limits need to be verified. Where no reliable integration point exists, that constraint should be explicit.",
            "A fragile automation that simulates clicks may be acceptable for a prototype, but it should not silently become critical infrastructure."
          ],
          bullets: [
            "which system is authoritative for each data type",
            "which writes need transactional guarantees",
            "how errors and duplicates are handled",
            "which integrations are supported by the vendor",
            "what happens when one system is unavailable"
          ],
        },
        {
          label: "04 / The decision",
          title: "Replace only when integration costs more than preserving the useful parts.",
          paragraphs: [
            "There are cases where a rewrite is correct: unsupported technology, no viable integration path, security constraints or unsustainable operating costs.",
            "That decision should come after mapping the existing system. The principle stays simple: preserve what works, build what is missing."
          ],
        },
      ],
    },
    takeaway: {
      it: "Prima di sostituire un gestionale, separa ciò che è vecchio da ciò che è ancora autorevole.",
      en: "Before replacing an ERP, separate what is old from what is still authoritative.",
    },
  },
];

export function getResearchNoteById(id: string): ResearchNote | undefined {
  return researchNotes.find((note) => note.id === id);
}

export function getResearchNoteBySlug(lang: SiteLang, slug: string): ResearchNote | undefined {
  return researchNotes.find((note) => note.slugs[lang] === slug);
}
