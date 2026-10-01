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
  socialVersion?: string;
  socialImage?: Partial<Record<SiteLang, string>>;
  sections: Record<SiteLang, ResearchNoteSection[]>;
  takeaway: Record<SiteLang, string>;
};

export const researchNotes: ResearchNote[] = [
  {
    "id": "openai-dots",
    "index": "007",
    "slugs": {
      "it": "openai-dots-agenti-sempre-attivi-computer-cloud",
      "en": "openai-dots-always-on-agents-cloud-computer"
    },
    "title": {
      "it": "OpenAI lancia Dots, agenti sempre attivi con un computer nel cloud",
      "en": "OpenAI launches Dots, always-on agents with their own cloud computer"
    },
    "dek": {
      "it": "I Dots usano GPT-6 Astra, continuano a lavorare tra una conversazione e l'altra e possono agire attraverso app collegate. Sono disponibili su Pro, Business Premium ed Enterprise.",
      "en": "Dots run on GPT-6 Astra, keep working between conversations and can act across connected apps. They are available on Pro, Business Premium and Enterprise."
    },
    "category": {
      "it": "NEWS NOTE / AI AGENTS",
      "en": "NEWS NOTE / AI AGENTS"
    },
    "tags": {
      "it": [
        "OpenAI Dots",
        "GPT-6 Astra",
        "AI agents",
        "ChatGPT"
      ],
      "en": [
        "OpenAI Dots",
        "GPT-6 Astra",
        "AI agents",
        "ChatGPT"
      ]
    },
    "published": "2026-10-01",
    "updated": "2026-10-01",
    "socialVersion": "20261001c",
    "socialImage": {
      "it": "/social/research-notes/openai-dots-it-20261001c.jpg"
    },
    "readingTime": {
      "it": "6 min",
      "en": "6 min"
    },
    "sections": {
      "it": [
        {
          "label": "01 / L'annuncio",
          "title": "Dots è il nuovo sistema di agenti personali di OpenAI.",
          "paragraphs": [
            "[OpenAI](https://chatgpt.com/features/dots/) ha presentato Dots il 29 settembre durante il DevDay 2026. Ogni Dot è un agente personale basato su GPT-6 Astra che può continuare a lavorare dopo la fine di una conversazione, inviare aggiornamenti e chiedere conferma quando serve una decisione.",
            "L'accesso è in rollout su ChatGPT web, mobile e desktop per i piani Pro, Business Premium ed Enterprise nei mercati supportati. Gli utenti Enterprise possono usarlo quando viene abilitato dall'amministratore del workspace."
          ]
        },
        {
          "label": "02 / Come funziona",
          "title": "Ogni Dot lavora su un proprio computer nel cloud.",
          "paragraphs": [
            "Secondo [OpenAI](https://chatgpt.com/features/dots/), il Dot parte dal contesto della memoria ChatGPT, usa Codex e gli strumenti collegati e può continuare un progetto tra una sessione e l'altra. L'utente decide quali app può usare e può cambiare direzione o mettere in pausa il lavoro.",
            "OpenAI mostra esempi che vanno dalla preparazione di una presentazione alla gestione di una migrazione API, fino alla costruzione e al test di piccole modifiche software partendo dal feedback degli utenti. I Dots possono anche comparire in Slack e Microsoft Teams mantenendo il contesto del lavoro iniziato altrove.",
            "[The Verge](https://www.theverge.com/ai-artificial-intelligence/1002033/openai-dots-launch-muse-competitor) riporta che per ora ogni utente può creare un solo Dot; OpenAI prevede di supportarne più di uno in futuro."
          ]
        },
        {
          "label": "03 / Autonomia e permessi",
          "title": "Il Dot può lavorare da solo, ma non tutte le azioni sono automatiche.",
          "paragraphs": [
            "Le autorizzazioni passano dagli stessi plugin usati da ChatGPT, ChatGPT Work e Codex. Nella [documentazione di sicurezza](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs), OpenAI spiega che le Custom Rules possono vietare azioni specifiche, per esempio l'invio di email, o imporre un'approvazione prima di procedere.",
            "Le azioni che possono modificare account o condividere informazioni passano attraverso Auto-review. Operazioni come il cambio password restano a carico dell'utente.",
            "Esiste anche una modalità di ricerca proattiva: il Dot può leggere fonti collegate autorizzate e salvare note private prima che venga fatta una richiesta. Questa modalità, però, non può da sola inviare messaggi, modificare contenuti tramite plugin o controllare browser e computer; per farlo deve passare dalle normali regole di autorizzazione."
          ]
        },
        {
          "label": "04 / Memoria e dati",
          "title": "Dots e ChatGPT condividono parte del contesto.",
          "paragraphs": [
            "La [FAQ di OpenAI](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs) specifica che un Dot può ricevere memoria e conversazioni recenti da ChatGPT e che le conversazioni con il Dot possono a loro volta contribuire alla memoria di ChatGPT. Disattivare Memory interrompe la condivisione futura, ma non elimina automaticamente il contesto già ricevuto dal Dot.",
            "Scollegare un servizio impedisce nuovi accessi, ma non cancella le informazioni che il Dot ha già incorporato nel proprio contesto. Eliminare il Dot cancella il suo contesto, mentre file, thread Codex e conversazioni ChatGPT creati durante il lavoro restano nelle rispettive aree.",
            "Per Business, Enterprise ed Edu, OpenAI dichiara che i dati non vengono usati per addestrare i modelli per impostazione predefinita. Nei piani personali, invece, vale l'impostazione “Improve the model for everyone”."
          ]
        },
        {
          "label": "05 / Cosa può fare oggi",
          "title": "Il caso d'uso è più vicino a un collaboratore persistente che a una singola chat.",
          "paragraphs": [
            "Negli esempi ufficiali, un Dot segue metriche e feedback per aggiornare una presentazione, controlla requisiti di un RFP contro email e documentazione, prepara codice e test durante una migrazione API e continua a monitorare il lavoro finché le dipendenze non vengono eliminate.",
            "Questi sono scenari dimostrativi pubblicati da OpenAI, non benchmark indipendenti. Il punto tecnico è che il Dot combina memoria, strumenti, computer cloud e lavoro asincrono sotto un unico agente, invece di richiedere una nuova conversazione per ogni passaggio."
          ]
        },
        {
          "label": "06 / La parte ancora da dimostrare",
          "title": "Lavorare a lungo senza supervisione resta il test più importante.",
          "paragraphs": [
            "[Reuters](https://www.reuters.com/business/openai-takes-meta-with-always-on-dots-agent-enterprise-ai-push-2026-09-29/) riporta che durante il DevDay alcune demo live hanno avuto problemi: i Dots non sono riusciti più volte a fornire gli aggiornamenti vocali richiesti sul palco. OpenAI ha attribuito i problemi al rollout simultaneo degli aggiornamenti.",
            "Reuters ricorda anche che il lancio arriva mentre cresce l'attenzione sulla sicurezza degli agenti autonomi. OpenAI afferma di aver introdotto regole, approvazioni e controlli proprio per ridurre il rischio che un agente agisca fuori dalle intenzioni dell'utente.",
            "La domanda utile non è quindi se Dots sappia completare una demo, ma quanto spesso riesca a portare avanti task lunghi con app reali, permessi reali e dati reali senza richiedere continui interventi umani."
          ]
        },
        {
          "label": "07 / Disponibilità",
          "title": "Dots non è ancora un prodotto per tutti gli utenti ChatGPT.",
          "paragraphs": [
            "OpenAI lo sta distribuendo su Pro, Business Premium ed Enterprise nei mercati supportati. I minori di 18 anni non possono usarlo al momento, secondo la [documentazione ufficiale](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs).",
            "La pagina ufficiale del prodotto è su [ChatGPT](https://chatgpt.com/features/dots/). Dots non va confuso con domini come dot.com o dots.com, che non sono il sito ufficiale del prodotto OpenAI."
          ]
        }
      ],
      "en": [
        {
          "label": "01 / The announcement",
          "title": "Dots is OpenAI's new personal agent system.",
          "paragraphs": [
            "[OpenAI](https://chatgpt.com/features/dots/) introduced Dots on September 29 at DevDay 2026. Each Dot is a personal agent powered by GPT-6 Astra that can keep working after a conversation ends, send updates and ask for confirmation when a decision is needed.",
            "Access is rolling out across ChatGPT web, mobile and desktop for Pro, Business Premium and Enterprise plans in eligible markets. Enterprise users can use Dots when enabled by their workspace administrator."
          ]
        },
        {
          "label": "02 / How it works",
          "title": "Each Dot works on its own cloud computer.",
          "paragraphs": [
            "According to [OpenAI](https://chatgpt.com/features/dots/), a Dot starts with context from ChatGPT memory, uses Codex and connected tools, and can keep a project moving between sessions. Users decide which apps it can access and can redirect or pause its work.",
            "OpenAI shows examples ranging from presentation updates to API migrations and building and testing small software changes from user feedback. Dots can also appear in Slack and Microsoft Teams while carrying context from work started elsewhere.",
            "[The Verge](https://www.theverge.com/ai-artificial-intelligence/1002033/openai-dots-launch-muse-competitor) reports that users can create only one Dot for now; OpenAI plans to support multiple agents later."
          ]
        },
        {
          "label": "03 / Autonomy and permissions",
          "title": "A Dot can work independently, but not every action is automatic.",
          "paragraphs": [
            "Permissions use the same plugin connections as ChatGPT, ChatGPT Work and Codex. In its [security documentation](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs), OpenAI says Custom Rules can block specific actions, such as sending email, or require approval before proceeding.",
            "Actions that can affect accounts or share information go through Auto-review. Operations such as changing a password remain with the user.",
            "Dots can also perform proactive research by reading authorized connected sources and saving private notes before a request is made. That research mode cannot directly send messages, change content through plugins or control a browser or computer; follow-up actions still use the normal permission rules."
          ]
        },
        {
          "label": "04 / Memory and data",
          "title": "Dots and ChatGPT share part of their context.",
          "paragraphs": [
            "OpenAI's [FAQ](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs) says a Dot can receive memories and recent conversation context from ChatGPT, while Dot conversations can contribute to ChatGPT memory. Turning Memory off stops future sharing but does not automatically delete context the Dot already received.",
            "Disconnecting a service prevents new access but does not erase information already incorporated into the Dot's context. Deleting the Dot removes its own context, while files, Codex threads and ChatGPT conversations created during its work remain in their respective locations.",
            "For Business, Enterprise and Edu, OpenAI says data is not used for model training by default. On personal plans, the “Improve the model for everyone” setting controls whether Dot conversations and work may be used for model improvement."
          ]
        },
        {
          "label": "05 / What it can do today",
          "title": "The use case looks more like a persistent collaborator than a single chat.",
          "paragraphs": [
            "In OpenAI's examples, a Dot tracks metrics and feedback to update a presentation, checks RFP requirements against email and product documentation, prepares code and tests during an API migration, and keeps monitoring the project until dependencies are gone.",
            "These are company demos, not independent benchmarks. The technical shift is that memory, tools, a cloud computer and background work sit under one persistent agent instead of requiring a fresh conversation for each step."
          ]
        },
        {
          "label": "06 / What still needs to be proven",
          "title": "Working for long periods with limited supervision is the more important test.",
          "paragraphs": [
            "[Reuters](https://www.reuters.com/business/openai-takes-meta-with-always-on-dots-agent-enterprise-ai-push-2026-09-29/) reports that some live DevDay demos ran into problems, with Dots repeatedly failing to deliver requested voice updates on stage. OpenAI attributed the glitches to rolling out all the updates at once.",
            "Reuters also notes that the launch comes amid growing scrutiny of autonomous-agent safety. OpenAI says rules, approvals and review systems are designed to reduce the chance that an agent acts outside a user's intent.",
            "The useful question is not whether Dots can complete a polished demo, but how often it can finish long-running tasks across real apps, permissions and data without constant human intervention."
          ]
        },
        {
          "label": "07 / Availability",
          "title": "Dots is not yet available to every ChatGPT user.",
          "paragraphs": [
            "OpenAI is rolling it out to Pro, Business Premium and Enterprise users in eligible markets. Users under 18 cannot use Dots for now, according to the [official documentation](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs).",
            "The official product page is on [ChatGPT](https://chatgpt.com/features/dots/). Dots should not be confused with domains such as dot.com or dots.com, which are not the official OpenAI product site."
          ]
        }
      ]
    },
    "takeaway": {
      "it": "Dots mette insieme memoria, strumenti e un computer cloud in un agente persistente. Il punto da misurare sarà quanto lavoro riesce davvero a portare avanti senza supervisione continua.",
      "en": "Dots combines memory, tools and a cloud computer in one persistent agent. The key measure will be how much work it can actually carry forward without constant supervision."
    }
  },
  {
    "id": "gemini-4-argon",
    "index": "006",
    "slugs": {
      "it": "gemini-4-argon-agenti-ai-lavoro-lungo",
      "en": "gemini-4-argon-long-horizon-ai-agents"
    },
    "title": {
      "it": "Google presenta Gemini 4 Argon, un modello per task AI di lunga durata",
      "en": "Google introduces Gemini 4 Argon for long-running AI tasks"
    },
    "dek": {
      "it": "Argon porta l'output fino a 1 milione di token ed è già usato internamente da Google su coding, data center e cybersecurity. Per ora l'accesso resta limitato.",
      "en": "Argon raises the output limit to one million tokens and is already being used inside Google for coding, data centers and cybersecurity. Access is still limited."
    },
    "category": {
      "it": "NEWS NOTE / AI",
      "en": "NEWS NOTE / AI"
    },
    "tags": {
      "it": [
        "Gemini 4 Argon",
        "Google DeepMind",
        "AI agents",
        "Long-horizon"
      ],
      "en": [
        "Gemini 4 Argon",
        "Google DeepMind",
        "AI agents",
        "Long-horizon"
      ]
    },
    "published": "2026-10-01",
    "updated": "2026-10-01",
    "readingTime": {
      "it": "5 min",
      "en": "5 min"
    },
    "sections": {
      "it": [
        {
          "label": "01 / L'annuncio",
          "title": "Argon è il primo modello della famiglia Gemini 4.",
          "paragraphs": [
            "[Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/) ha annunciato Gemini 4 Argon il 30 settembre. Il modello è pensato per attività che richiedono molti passaggi, con un focus dichiarato su software engineering, ricerca finanziaria, lavoro legale e cybersecurity difensiva.",
            "Il prezzo introduttivo annunciato da Google è di 2 dollari per milione di token in input e 10 dollari per milione di token in output. Terminato il periodo iniziale, i prezzi indicati salgono rispettivamente a 4 e 20 dollari. [Reuters](https://www.reuters.com/legal/litigation/google-announces-gemini-4-flagship-ai-model-after-months-delays-2026-09-30/) segnala che Google non ha ancora dato una data per il rilascio pubblico."
          ]
        },
        {
          "label": "02 / Un milione di token in output",
          "title": "Google ha portato il limite di output da 64K a 1 milione di token.",
          "paragraphs": [
            "È uno dei cambiamenti più concreti rispetto ai modelli precedenti. Un output molto più lungo dà al modello spazio per mantenere una singola traiettoria di lavoro attraverso più passaggi, invece di spezzare continuamente il task in richieste separate.",
            "Questo non significa che un milione di token equivalga automaticamente a un milione di token utili. Per gli agenti conta soprattutto cosa succede lungo la sequenza: se il modello mantiene lo stato, usa correttamente gli strumenti e non accumula errori mentre il task si allunga."
          ]
        },
        {
          "label": "03 / Google lo sta già usando",
          "title": "Gli esempi più interessanti arrivano dai sistemi interni di Google.",
          "paragraphs": [
            "Secondo [Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/), un gruppo di agenti Argon ha analizzato la telemetria dei data center e individuato modifiche che hanno liberato oltre 300 TiB di memoria dopo il rollout. L'azienda stima un risparmio complessivo potenziale tra 500 TiB e 1 PiB.",
            "Google cita anche migrazioni da C/C++ a Rust su codebase che arrivano a oltre 800.000 linee, incluso il kernel Zircon di Fuchsia. In un altro caso Argon ha lavorato su 32.000 linee di codice SIMD di libgav1; Google afferma che il risultato in Rust è 2,7 volte più veloce del port precedente, mantenendo lo stesso output video.",
            "Sono risultati dichiarati da Google, non test indipendenti. La parte utile è che l'azienda descrive anche ciò che sta intorno al modello: test automatici, audit manuale, emulazione e review prima del rilascio delle modifiche."
          ]
        },
        {
          "label": "04 / Enterprise e cybersecurity",
          "title": "Google sta spingendo Argon oltre il coding.",
          "paragraphs": [
            "Il modello viene valutato anche su finanza, legal e automazione di processi. Su [AutomationBench di Zapier](https://zapier.com/benchmarks), che misura l'esecuzione end-to-end di attività attraverso strumenti aziendali, la configurazione Argon High è attualmente indicata al 51,29%.",
            "La cybersecurity è l'altro ambito centrale. Google dice che Argon può trovare, validare e correggere vulnerabilità software. Per questo l'accesso iniziale passa dal [Fairwind Program](https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/), riservato a governi, clienti Google Cloud e partner di cybersecurity selezionati."
          ]
        },
        {
          "label": "05 / I benchmark vanno letti con cautela",
          "title": "Uno dei risultati più pubblicizzati da Google arriva da un benchmark contestato.",
          "paragraphs": [
            "Google dichiara un 77,9% su [DeepSWE v1.1](https://deepswe.datacurve.ai/), un benchmark dedicato a task di software engineering di lunga durata. Ma una [review indipendente di Epoch AI](https://epoch.ai/benchmarks/deepswe/review) ha classificato il benchmark come “Flawed” dopo aver trovato problemi in almeno 23 dei 113 task esaminati.",
            "[Reuters](https://www.reuters.com/legal/litigation/google-announces-gemini-4-flagship-ai-model-after-months-delays-2026-09-30/) nota inoltre che Argon rimane dietro ai concorrenti in due dei quattro benchmark di coding inclusi nel materiale di lancio di Google. Quindi il quadro è meno semplice di quanto suggerisca una singola percentuale."
          ]
        },
        {
          "label": "06 / Cosa manca ancora",
          "title": "Argon deve ancora essere provato fuori dai workflow controllati da Google.",
          "paragraphs": [
            "L'accesso ristretto rende ancora difficile capire come il modello si comporti su task lunghi costruiti da team esterni, con strumenti, dati e failure mode diversi da quelli usati internamente da Google.",
            "Quando l'accesso si allargherà, le misure più utili saranno meno spettacolari dei benchmark: percentuale di task completati, errori accumulati lungo la sequenza, recupero dopo un tool failure, costo per task e numero di interventi umani necessari."
          ]
        }
      ],
      "en": [
        {
          "label": "01 / The announcement",
          "title": "Argon is the first model in the Gemini 4 family.",
          "paragraphs": [
            "[Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/) announced Gemini 4 Argon on September 30. The model is designed for tasks that require many steps, with a stated focus on software engineering, financial research, legal work and defensive cybersecurity.",
            "Google's introductory pricing is $2 per million input tokens and $10 per million output tokens. After the introductory period, the listed prices rise to $4 and $20 respectively. [Reuters](https://www.reuters.com/legal/litigation/google-announces-gemini-4-flagship-ai-model-after-months-delays-2026-09-30/) reports that Google has not given a date for a public release."
          ]
        },
        {
          "label": "02 / One million output tokens",
          "title": "Google raised Argon's output limit from 64K to one million tokens.",
          "paragraphs": [
            "That is one of the most concrete changes from previous models. A much larger output budget gives the model room to keep a single work trajectory going across many steps instead of constantly breaking the task into separate requests.",
            "One million tokens does not automatically mean one million useful tokens. For agents, the important part is what happens along the sequence: whether the model keeps state, uses tools correctly and avoids compounding errors as the task grows."
          ]
        },
        {
          "label": "03 / Google is already using it",
          "title": "The clearest examples come from Google's internal systems.",
          "paragraphs": [
            "According to [Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/), a group of Argon agents analysed data-center telemetry and found changes that freed more than 300 TiB of memory after rollout. The company estimates total potential savings of 500 TiB to 1 PiB.",
            "Google also cites C/C++ to Rust migrations on codebases exceeding 800,000 lines, including Fuchsia's Zircon kernel. In another case, Argon worked on 32,000 lines of SIMD code in libgav1; Google says the resulting Rust implementation runs 2.7 times faster than the previous port while producing identical video output.",
            "These are company-reported results rather than independent tests. The useful detail is that Google also describes the surrounding process: automated tests, manual audits, emulation and review before changes are rolled out."
          ]
        },
        {
          "label": "04 / Enterprise and cybersecurity",
          "title": "Google is pushing Argon beyond coding.",
          "paragraphs": [
            "The model is also being evaluated on finance, legal work and business automation. On [Zapier's AutomationBench](https://zapier.com/benchmarks), which measures end-to-end task execution across business tools, the Argon High configuration is currently listed at 51.29%.",
            "Cybersecurity is the other major focus. Google says Argon can find, validate and patch software vulnerabilities. Initial access therefore runs through the [Fairwind Program](https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/), which is limited to governments, selected Google Cloud customers and cybersecurity partners."
          ]
        },
        {
          "label": "05 / Benchmarks need context",
          "title": "One of Google's headline results comes from a benchmark with known issues.",
          "paragraphs": [
            "Google reports 77.9% on [DeepSWE v1.1](https://deepswe.datacurve.ai/), a benchmark for long-horizon software engineering tasks. But an [independent Epoch AI review](https://epoch.ai/benchmarks/deepswe/review) rated the benchmark “Flawed” after finding problems in at least 23 of the 113 tasks it examined.",
            "[Reuters](https://www.reuters.com/legal/litigation/google-announces-gemini-4-flagship-ai-model-after-months-delays-2026-09-30/) also notes that Argon remains behind competitors on two of the four coding benchmarks included in Google's launch material. The picture is therefore less straightforward than any single score suggests."
          ]
        },
        {
          "label": "06 / What is still missing",
          "title": "Argon still needs to be tested outside workflows controlled by Google.",
          "paragraphs": [
            "Restricted access makes it difficult to know how the model behaves on long-running tasks designed by external teams, with different tools, data and failure modes.",
            "Once access widens, the most useful measurements will be less dramatic than leaderboard scores: completed-task rate, errors accumulated across a sequence, recovery after tool failures, cost per task and the number of human interventions required."
          ]
        }
      ]
    },
    "takeaway": {
      "it": "Per ora Argon resta a disponibilità limitata. Il test decisivo sarà vedere come regge task lunghi costruiti fuori da Google.",
      "en": "For now, Argon remains limited-access. The more useful test will be how it handles long-running tasks built outside Google."
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
