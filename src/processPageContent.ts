import type { SiteLang } from "./detailContent";

export type ProcessPageSection = {
  label: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ProcessPageContent = {
  kicker: string;
  title: string;
  lead: string;
  principleLabel: string;
  principle: string;
  tags: string[];
  sections: ProcessPageSection[];
  relatedLabel: string;
  relatedTitle: string;
  relatedIntro: string;
  resources: { kind: "note" | "project"; id: string; title: string; description: string }[];
  contactLabel: string;
  contactTitle: string;
  contactBody: string;
  emailLabel: string;
  whatsappLabel: string;
  backLabel: string;
};

export const processPageContent: Record<SiteLang, ProcessPageContent> = {
  it: {
    kicker: "Automazione dei processi aziendali · Bergamo",
    title: "Prima di automatizzare, capiamo dove si perde il lavoro.",
    lead: "Una richiesta arriva via email. Qualcuno la ricopia in Excel, un'altra persona apre il gestionale e un terzo collega cerca il documento aggiornato. Il problema non è quasi mai un singolo software: sono i passaggi che non si parlano.",
    principleLabel: "Il punto di partenza",
    principle: "Capire il percorso di un'informazione prima di decidere quale parte del lavoro automatizzare.",
    tags: ["Processi aziendali", "Integrazioni", "Software su misura", "AI quando serve"],
    sections: [
      {
        label: "01 / Dove guardare",
        title: "Il tempo si perde spesso tra uno strumento e l'altro.",
        paragraphs: [
          "Nelle aziende che lavorano su commessa o gestiscono molte richieste, lo stesso dato può attraversare caselle email, fogli di calcolo, gestionali e messaggi. Ogni passaggio può richiedere una verifica, un reinserimento o una telefonata per ricostruire il contesto.",
          "Prima di parlare di automazione, seguiamo una pratica dall'inizio alla fine: chi la riceve, dove vengono raccolte le informazioni, chi può cambiarle e quando si considera conclusa. È qui che emergono le attività ripetute e le decisioni che non possono essere delegate."
        ]
      },
      {
        label: "02 / Come interveniamo",
        title: "Mappare il processo serve a non automatizzare l'errore.",
        paragraphs: [
          "Mettiamo a confronto il flusso attuale (AS-IS) con quello possibile (TO-BE). Identifichiamo gli strumenti da conservare, i dati da condividere e i punti in cui una persona deve confermare ciò che il sistema ha preparato.",
          "Un intervento può essere un'integrazione, una piccola applicazione interna, una regola deterministica oppure una funzione AI. Non scegliamo l'AI per principio: la utilizziamo soltanto quando aggiunge una capacità utile e verificabile."
        ],
        bullets: [
          "Una sola fonte autorevole per ogni dato importante",
          "Passaggi automatici dove le regole sono chiare",
          "Verifiche e autorizzazioni umane dove servono",
          "Stati e responsabilità comprensibili al team"
        ]
      },
      {
        label: "03 / Cosa non serve rifare",
        title: "Il gestionale esistente può rimanere al centro.",
        paragraphs: [
          "Sostituire un ERP non è sempre la soluzione al problema. Se il software già gestisce correttamente ordini, fatture o magazzino, può essere più sensato collegargli il pezzo mancante: raccolta delle richieste, controllo dei documenti, preparazione dei dati o avanzamento delle attività.",
          "L'integrazione va verificata prima di essere promessa. API disponibili, esportazioni, permessi e qualità dei dati determinano quello che si può fare davvero. Dove non esiste un'interfaccia affidabile, lo segnaliamo e valutiamo alternative."
        ]
      },
      {
        label: "04 / Situazioni concrete",
        title: "Preventivi, ordini e commesse sono punti di partenza diversi.",
        paragraphs: [
          "Una richiesta di preventivo incompleta può diventare un percorso guidato che raccoglie prima i dati necessari, lasciando la valutazione commerciale a chi ne ha la responsabilità.",
          "Un ordine ricevuto per email può essere interpretato e preparato per il gestionale, ma deve esistere una verifica quando quantità, codici o condizioni non sono univoci. In una commessa, invece, la priorità può essere far seguire misure, documenti e aggiornamenti al lavoro, dal sopralluogo fino alla posa.",
          "Questi esempi illustrano problemi e approcci diversi, non risultati standard promessi a qualsiasi azienda."
        ]
      },
      {
        label: "05 / Come misuriamo",
        title: "Una modifica ha senso se cambia qualcosa nel lavoro quotidiano.",
        paragraphs: [
          "Prima dell'intervento scegliamo una misura comprensibile: quanti reinserimenti richiede una pratica, quanto tempo passa tra richiesta e presa in carico, quante verifiche manuali sono necessarie o quante informazioni mancano alla prima raccolta.",
          "Confrontiamo lo stesso processo prima e dopo, tenendo conto delle eccezioni. Non promettiamo percentuali di risparmio senza una base reale. Se il risultato non è misurabile o il cambiamento complica il lavoro, va rivisto."
        ]
      }
    ],
    relatedLabel: "Approfondimenti e progetti",
    relatedTitle: "Tre esempi per entrare nel dettaglio.",
    relatedIntro: "Nelle Research Notes affrontiamo le scelte tecniche. Nei progetti mostriamo come un problema operativo può essere ricostruito e affrontato.",
    resources: [
      { kind: "note", id: "quote-intake", title: "Richieste di preventivo", description: "Raccogliere informazioni senza automatizzare la decisione." },
      { kind: "note", id: "email-to-order", title: "Da email a ordine", description: "Preparare i dati senza sostituire il gestionale." },
      { kind: "project", id: "commesse-posa", title: "Commesse e posa", description: "Collegare sopralluogo, ufficio e officina." }
    ],
    contactLabel: "Da dove partire",
    contactTitle: "Quale passaggio richiede oggi più lavoro manuale?",
    contactBody: "Basta descriverci una situazione concreta: da dove arriva la richiesta, quali strumenti attraversa e chi deve intervenire. Valutiamo insieme se abbia senso modificare il processo e con quale priorità.",
    emailLabel: "Scrivici",
    whatsappLabel: "WhatsApp",
    backLabel: "Torna alle Research Notes"
  },
  en: {
    kicker: "Business process automation · Bergamo",
    title: "Before automating, find out where the work gets lost.",
    lead: "A request arrives by email. Someone copies it into a spreadsheet, another person opens the ERP, and a colleague looks for the latest document. The problem is rarely one piece of software. It is the handoffs between tools and people.",
    principleLabel: "Where we start",
    principle: "Follow the information through the entire workflow before deciding which part should be automated.",
    tags: ["Business workflows", "Integrations", "Custom software", "AI when useful"],
    sections: [
      {
        label: "01 / Observe",
        title: "Time is often lost between tools.",
        paragraphs: [
          "In companies that manage projects or a large volume of requests, the same information may travel through email inboxes, spreadsheets, ERPs and messages. Each handoff can mean another check, another manual entry or another call to reconstruct what happened.",
          "Before choosing an automation, we follow one real case from start to finish: who receives it, where information is stored, who is allowed to change it and when the work is complete. That reveals both repeated tasks and decisions that must stay with people."
        ]
      },
      {
        label: "02 / Design",
        title: "Mapping the workflow prevents us from automating the wrong thing.",
        paragraphs: [
          "We compare the current workflow (AS-IS) with a possible future one (TO-BE). We identify which tools to keep, which data must be shared and where a person needs to approve what the system has prepared.",
          "The answer may be an integration, a small internal web application, a deterministic rule or an AI capability. We do not introduce AI by default. It has to solve a specific, testable problem."
        ],
        bullets: [
          "One authoritative source for important records",
          "Automation where the rules are clear",
          "Human review and authorization where necessary",
          "States and responsibilities the team can understand"
        ]
      },
      {
        label: "03 / Keep what works",
        title: "Your existing ERP may remain the source of truth.",
        paragraphs: [
          "Replacing an ERP is not always the answer. If it already handles orders, invoicing or inventory well, it may be better to connect the missing layer: request intake, document checks, data preparation or work tracking.",
          "Integration feasibility must be checked rather than assumed. Available APIs, exports, permissions and data quality determine what can actually be built. If no reliable interface exists, we make that limitation clear."
        ]
      },
      {
        label: "04 / Practical situations",
        title: "Quotes, orders and jobs present different starting points.",
        paragraphs: [
          "An incomplete quote request can become a guided intake flow, collecting the necessary information while keeping the commercial assessment with the responsible person.",
          "An order received by email can be interpreted and prepared for the ERP, but quantities, product codes and ambiguous conditions may still need review. For project-based work, the larger problem may be making documents and updates follow the job from site survey to installation.",
          "These are examples of approaches, not promised results for every business."
        ]
      },
      {
        label: "05 / Measure",
        title: "The change should be visible in day-to-day work.",
        paragraphs: [
          "Before implementation, we agree on a measure people can understand: repeated data entries per request, elapsed time until a case is taken up, manual checks or the information missing at first contact.",
          "We compare the same workflow before and after, including exceptions. We do not claim savings percentages without a measured baseline. If a change makes the work more complicated, it needs revision."
        ]
      }
    ],
    relatedLabel: "Further reading and projects",
    relatedTitle: "Three ways to explore the details.",
    relatedIntro: "Our Research Notes cover technical decisions. Our project pages show how real operational problems can be understood and addressed.",
    resources: [
      { kind: "note", id: "quote-intake", title: "Quote requests", description: "Collect information without automating commercial judgment." },
      { kind: "note", id: "email-to-order", title: "From email to order", description: "Prepare data without replacing the ERP." },
      { kind: "project", id: "commesse-posa", title: "Jobs and installation", description: "Connect site surveys, office and workshop." }
    ],
    contactLabel: "A place to begin",
    contactTitle: "Which handoff takes the most manual work today?",
    contactBody: "Describe one specific situation: where a request starts, which tools it passes through and who needs to act. We can then discuss whether a change makes sense and where to start.",
    emailLabel: "Email us",
    whatsappLabel: "WhatsApp",
    backLabel: "Back to Research Notes"
  }
};
