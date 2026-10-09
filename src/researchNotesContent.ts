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
    "id": "mistral-large-4",
    "index": "010",
    "slugs": {
      "it": "mistral-large-4-modello-europeo-open-weight-preview",
      "en": "mistral-large-4-european-open-weight-model-preview"
    },
    "title": {
      "it": "Mistral Large 4: il modello europeo da un trilione di parametri",
      "en": "Mistral Large 4: a trillion-parameter European model in preview"
    },
    "dek": {
      "it": "Mistral presenta un modello multimodale Mixture-of-Experts addestrato su infrastruttura europea. La preview API è disponibile, ma i pesi sono previsti per fine ottobre. I test indipendenti mostrano punti di forza nel cyber e costi da valutare.",
      "en": "Mistral unveils a multimodal Mixture-of-Experts model trained on European infrastructure. The preview API is available, while weights are planned for late October. Independent tests find strengths in cyber and cost trade-offs."
    },
    "category": {
      "it": "NEWS NOTE / OPEN MODELS",
      "en": "NEWS NOTE / OPEN MODELS"
    },
    "tags": {
      "it": [
        "Mistral Large 4",
        "Open-weight AI",
        "Mixture-of-Experts",
        "Sovranità AI"
      ],
      "en": [
        "Mistral Large 4",
        "Open-weight AI",
        "Mixture-of-Experts",
        "AI sovereignty"
      ]
    },
    "published": "2026-10-09",
    "updated": "2026-10-09",
    "readingTime": {
      "it": "6 min",
      "en": "6 min"
    },
    "sections": {
      "it": [
        {
          "label": "01 / L'annuncio",
          "title": "Per ora è una preview via API. I pesi non sono ancora scaricabili.",
          "paragraphs": [
            "Il [6 ottobre 2026](https://mistral.ai/news/mistral-large-4/) Mistral ha presentato Mistral Large 4 (ML4), nome informale «Le Chonk», aprendo l'accesso pubblico in anteprima tramite Mistral Studio. È il modello più grande dell'azienda francese, pensato per coding, workflow agentici e analisi multimodale.",
            "La distinzione sulla disponibilità conta: al 9 ottobre si può usare la [preview API](https://docs.mistral.ai/models/mistral-large-4-0), mentre [Mistral](https://mistral.ai/news/mistral-large-4/) annuncia i pesi per la fine del mese. Non è quindi corretto descrivere ML4 come un modello già scaricabile e installabile in produzione."
          ]
        },
        {
          "label": "02 / Architettura",
          "title": "Un trilione di parametri totali non significa usarli tutti per ogni token.",
          "paragraphs": [
            "La [documentazione tecnica](https://docs.mistral.ai/models/mistral-large-4-0) descrive un modello multimodale con architettura granular Mixture-of-Experts (MoE) da circa 1,05 trilioni di parametri e un encoder visivo da 1,6 miliardi. La pagina tecnica di Mistral indica 52 miliardi di parametri attivi, mentre [Artificial Analysis](https://artificialanalysis.ai/articles/mistral-large-4-france-ai) ne riporta 49 miliardi. Le due cifre circolano nei materiali pubblici; senza dettagli finali dell'architettura, è prudente non usarle come se fossero direttamente intercambiabili.",
            "Il routing MoE attiva soltanto un sottoinsieme degli esperti per generare ciascun token. L'infrastruttura deve comunque gestire un modello complessivo nell'ordine del trilione di parametri: il dato sugli esperti attivi non equivale al footprint di un modello denso da 49 o 52 miliardi.",
            "Mistral dichiara supporto multilingue su oltre 160 lingue. La model card indica una finestra di contesto fino a 1 milione di token, mentre [Artificial Analysis](https://artificialanalysis.ai/models/mistral-large-4) rileva circa 524.000 token per la configurazione API valutata. La dimensione effettivamente disponibile dipende dall'endpoint e va controllata prima di progettare applicazioni a contesto lungo."
          ]
        },
        {
          "label": "03 / Prestazioni",
          "title": "I risultati migliori riguardano alcuni workload, non l'intera classifica dei modelli.",
          "paragraphs": [
            "Nel [materiale di lancio](https://mistral.ai/news/mistral-large-4/) Mistral riporta il 61,7% su DeepSWE v1.1, il 28,3% su Terminal-Bench 4.0 e il 59,9% su AutomationBench, relativo a workflow che coinvolgono più applicazioni. Su Cybench dichiara di risolvere il 93% delle prove. Sono numeri presentati dal produttore: harness, configurazioni e condizioni di confronto vanno esaminati prima di trasferirli a una valutazione aziendale.",
            "Nella [valutazione indipendente di Artificial Analysis](https://artificialanalysis.ai/articles/mistral-large-4-france-ai), la preview ottiene 38 punti nell'Intelligence Index e 50 nel Cyber Index. La stessa fonte segnala però anche un costo per task: 1,13 dollari con il listino standard nel proprio Intelligence Index, contro 0,25 dollari per GLM-5.3-Flash e 0,27 per DeepSeek V4.1 Flash, modelli con punteggi vicini. Lo sconto iniziale dimezza temporaneamente il costo di ML4 a 0,57 dollari per task. Si tratta di misure su quel benchmark, non di una stima generale per ogni workload.",
            "Nel confronto vanno considerate anche le policy dei modelli: in alcuni test di cybersecurity un modello può rifiutare l'operazione richiesta. [Mistral](https://mistral.ai/news/mistral-large-4/) sottolinea proprio questo aspetto e sta conducendo test con partner di cybersecurity e autorità selezionate. Le metriche misurano sia capacità tecniche sia comportamento del sistema in uno specifico ambiente di valutazione."
          ]
        },
        {
          "label": "04 / Infrastruttura europea",
          "title": "L'addestramento europeo è documentato; l'autonomia operativa dipenderà anche dai pesi e dal deployment.",
          "paragraphs": [
            "Secondo [Mistral](https://mistral.ai/news/mistral-large-4/), ML4 è stato addestrato da zero usando 3.800 GPU NVIDIA Grace Blackwell nei data center europei dell'azienda. Anche la preview è servita dalla stessa infrastruttura. Si tratta di una scelta industriale concreta: training e inferenza non dipendono, per questa versione, dall'accesso a un servizio API statunitense.",
            "Per un'impresa, però, «sovranità AI» può indicare cose diverse: dove transitano i dati, chi gestisce l'inferenza, chi controlla i log, chi può interrompere il servizio, e se sia possibile spostare il modello. L'arrivo dei pesi aggiungerebbe un'opzione di deployment autonomo, ma non renderebbe automaticamente semplice eseguire un MoE di queste dimensioni su hardware aziendale.",
            "Abbiamo affrontato lo stesso confine operativo nella nota su [AI on-premise e cloud](https://empv.it/it/research-notes/ai-on-premise-vs-cloud-quando-conviene/): il luogo di esecuzione è una scelta che discende dai dati, dai vincoli di integrazione e dalla capacità di gestire il sistema."
          ]
        },
        {
          "label": "05 / Adozione aziendale",
          "title": "Il test più utile riguarda un processo intero, non una risposta isolata.",
          "paragraphs": [
            "Le capacità dichiarate per documenti, immagini, uso di strumenti e ragionamento possono essere interessanti in workflow come analisi di documentazione tecnica, supporto a incident response o preparazione di dossier a partire da fonti eterogenee. Ma il modello è solo uno dei componenti: permessi, ricerca delle fonti, API, revisione umana e controllo delle azioni restano fuori dal checkpoint.",
            "Un test riproducibile dovrebbe usare documenti e task del proprio dominio, definire in anticipo che cosa significa completare il lavoro, registrare errori e interventi umani, e misurare costo e latenza end-to-end. È il criterio già descritto nella nostra nota su [come valutare un LLM locale prima della produzione](https://empv.it/it/research-notes/valutare-llm-locale-prima-produzione/).",
            "Per esempio, in un flusso di analisi di documenti industriali non basta che ML4 descriva correttamente un disegno. Bisogna controllare se identifica la revisione giusta, cita il documento di origine, evita informazioni non autorizzate e segnala quando un dettaglio non è leggibile."
          ]
        },
        {
          "label": "06 / Le verifiche aperte",
          "title": "La versione scaricabile dovrà chiarire licenza, requisiti e riproducibilità dei test.",
          "paragraphs": [
            "Mistral ha annunciato che pubblicherà insieme ai pesi ulteriori informazioni su architettura, benchmark e post-training. Alla data di questa nota, i dettagli definitivi della licenza e il comportamento di una configurazione self-hosted non possono ancora essere valutati sul checkpoint pubblico, perché quel checkpoint non è stato rilasciato.",
            "Il prossimo passaggio utile è quindi verificare il rilascio effettivo, i requisiti di memoria e acceleratori, il supporto dei runtime, le condizioni di licenza e la distanza fra prestazioni della preview API e deployment autonomo. La [valutazione preliminare di Artificial Analysis](https://artificialanalysis.ai/models/mistral-large-4) è un riferimento per l'API di oggi, non una garanzia per qualunque implementazione futura.",
            "ML4 mostra che un laboratorio europeo può progettare, addestrare e servire un modello di questa scala sulla propria infrastruttura. Quanto di questo controllo possa essere trasferito alle aziende diventerà più chiaro solo dopo il rilascio dei pesi."
          ]
        }
      ],
      "en": [
        {
          "label": "01 / The announcement",
          "title": "For now, it is an API preview. The weights cannot yet be downloaded.",
          "paragraphs": [
            "On [October 6, 2026](https://mistral.ai/news/mistral-large-4/), Mistral unveiled Mistral Large 4 (ML4), informally nicknamed “Le Chonk”, and opened a public preview through Mistral Studio. It is the French company's largest model yet, aimed at coding, agentic workflows and multimodal analysis.",
            "Availability matters: as of October 9, developers can use the [preview API](https://docs.mistral.ai/models/mistral-large-4-0), while [Mistral](https://mistral.ai/news/mistral-large-4/) says weights are due at the end of October. It would be premature to describe ML4 as already downloadable for production deployment."
          ]
        },
        {
          "label": "02 / Architecture",
          "title": "One trillion total parameters does not mean activating them all for each token.",
          "paragraphs": [
            "The [technical documentation](https://docs.mistral.ai/models/mistral-large-4-0) describes a multimodal granular Mixture-of-Experts (MoE) model with around 1.05 trillion total parameters and a 1.6-billion-parameter vision encoder. Mistral's model page lists 52 billion active parameters, while [Artificial Analysis](https://artificialanalysis.ai/articles/mistral-large-4-france-ai) reports 49 billion. Both figures appear in public launch materials; until final architecture details arrive, they should not be treated as directly interchangeable.",
            "MoE routing activates only a subset of experts for each generated token. Infrastructure still needs to host a model with roughly a trillion total parameters: the active-parameter count is not the memory footprint of a conventional dense 49- or 52-billion-parameter model.",
            "Mistral says the training covers more than 160 languages. Its model page advertises a context window of up to one million tokens, while [Artificial Analysis](https://artificialanalysis.ai/models/mistral-large-4) lists approximately 524,000 tokens for the API configuration it evaluated. Effective limits depend on the endpoint and should be checked before building a long-context application."
          ]
        },
        {
          "label": "03 / Performance",
          "title": "The strongest results concern specific workloads, not every model benchmark.",
          "paragraphs": [
            "In its [launch announcement](https://mistral.ai/news/mistral-large-4/), Mistral reports 61.7% on DeepSWE v1.1, 28.3% on Terminal-Bench 4.0 and 59.9% on AutomationBench, which measures multi-application workflows. It also reports solving 93% of Cybench challenges. These are vendor-presented results: harnesses, settings and comparison conditions matter before applying them to an enterprise evaluation.",
            "In [Artificial Analysis's independent evaluation](https://artificialanalysis.ai/articles/mistral-large-4-france-ai), the preview scores 38 on its Intelligence Index and 50 on its Cyber Index. The same source also highlights cost per task: $1.13 at standard API rates on its Intelligence Index, against $0.25 for GLM-5.3-Flash and $0.27 for DeepSeek V4.1 Flash, which have nearby intelligence scores. A temporary launch discount halves the ML4 figure to $0.57 per task. These are benchmark-specific costs, not estimates for all workloads.",
            "Model policy also affects some cybersecurity tests: a model can refuse the requested action. [Mistral](https://mistral.ai/news/mistral-large-4/) highlights this constraint and is red-teaming ML4 with selected cybersecurity partners and government authorities. Benchmark scores reflect both technical capability and system behavior in a particular evaluation environment."
          ]
        },
        {
          "label": "04 / European infrastructure",
          "title": "European training is documented. Operational autonomy depends on weights and deployment.",
          "paragraphs": [
            "According to [Mistral](https://mistral.ai/news/mistral-large-4/), ML4 was trained from scratch on 3,800 NVIDIA Grace Blackwell GPUs in the company's European data centers. The public preview is served from that same infrastructure. This is a concrete infrastructure decision: for this version, model training and inference do not depend on consuming a US vendor's model API.",
            "For an enterprise, however, “AI sovereignty” can refer to different boundaries: data location, inference operations, log custody, service continuity and portability. Releasing the weights would introduce a self-deployment option, but it would not make a model of this size straightforward to run on ordinary enterprise hardware.",
            "The same decision boundary appears in our note on [on-premise versus cloud AI](https://empv.it/en/research-notes/on-premise-vs-cloud-when-it-makes-sense/): deployment location should follow data requirements, integration constraints and the team's ability to operate the system."
          ]
        },
        {
          "label": "05 / Enterprise evaluation",
          "title": "A useful test covers an entire workflow, not an isolated answer.",
          "paragraphs": [
            "Mistral's claimed capabilities across documents, images, tools and reasoning could be relevant to technical-document analysis, incident response support or preparing dossiers from mixed sources. The model is only one component, though: authorization, retrieval, APIs, human review and action controls sit outside its checkpoint.",
            "A reproducible trial should use domain-specific documents and tasks, define successful completion in advance, log failures and human interventions, and measure end-to-end cost and latency. We outlined this approach in our note on [evaluating a local LLM before production](https://empv.it/en/research-notes/evaluating-local-llms-before-production/).",
            "For example, when analysing industrial documents, correctly describing an engineering drawing is not enough. The system must identify the right revision, cite its source, avoid exposing unauthorized information and flag details that cannot be read reliably."
          ]
        },
        {
          "label": "06 / What is not yet established",
          "title": "Downloadable weights still need to clarify licensing, deployment requirements and reproducibility.",
          "paragraphs": [
            "Mistral says it will publish more architecture details, benchmark results and post-training information with the weights. At the date of this note, final license terms and self-hosted behavior cannot be evaluated against a public checkpoint because that checkpoint has not been released.",
            "The next meaningful checks are whether the weights arrive, how much accelerator memory they require, which runtimes support them, what license applies and how self-hosted performance compares with the preview API. [Artificial Analysis's early evaluation](https://artificialanalysis.ai/models/mistral-large-4) describes the current API, not every possible future deployment.",
            "ML4 demonstrates that a European lab can design, train and serve a model at this scale on its own infrastructure. The degree to which enterprises can inherit that control will be clearer after the weights are released."
          ]
        }
      ]
    },
    "takeaway": {
      "it": "Mistral Large 4 è un risultato industriale europeo significativo, oggi accessibile in preview API. Le prove mostrano punti di forza nel cyber, ma costi, requisiti e autonomia di un deployment privato andranno verificati dopo il rilascio dei pesi.",
      "en": "Mistral Large 4 is a significant European infrastructure milestone, available today through an API preview. Cyber results stand out, but private-deployment cost, hardware needs and autonomy still need testing after the weights ship."
    },
    "socialVersion": "20261009b"
  },

  {
    "id": "embeddinggemma-2",
    "index": "009",
    "slugs": {
      "it": "embeddinggemma-2-retrieval-multimodale-locale",
      "en": "embeddinggemma-2-local-multimodal-retrieval"
    },
    "title": {
      "it": "EmbeddingGemma 2 porta il retrieval multimodale in locale",
      "en": "EmbeddingGemma 2 brings multimodal retrieval on-device"
    },
    "dek": {
      "it": "Google DeepMind unifica testo, codice, immagini, video e audio in uno spazio vettoriale da 768 dimensioni. Il modello da 740M è modulare e pensato per hardware consumer; corpus, memoria e costo dell'indice restano le variabili da testare.",
      "en": "Google DeepMind maps text, code, images, video and audio into a shared 768-dimensional vector space. The 740M model is modular and designed for consumer hardware; corpus quality, memory and index cost still need to be tested."
    },
    "category": {
      "it": "TECH NOTE / LOCAL AI",
      "en": "TECH NOTE / LOCAL AI"
    },
    "tags": {
      "it": [
        "EmbeddingGemma 2",
        "Multimodal retrieval",
        "RAG",
        "Local AI"
      ],
      "en": [
        "EmbeddingGemma 2",
        "Multimodal retrieval",
        "RAG",
        "Local AI"
      ]
    },
    "published": "2026-10-07",
    "updated": "2026-10-07",
    "socialVersion": "20261007a",
    "readingTime": {
      "it": "7 min",
      "en": "7 min"
    },
    "sections": {
      "it": [
        {
          "label": "01 / Il modello",
          "title": "Un embedding model per testo, codice, immagini, video e audio.",
          "paragraphs": [
            "[Google DeepMind](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/) ha pubblicato EmbeddingGemma 2 il 6 ottobre 2026. La [model card ufficiale](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2) descrive un modello da 740 milioni di parametri che mappa testo e codice, immagini, video e audio — anche combinati nello stesso input — in uno spazio vettoriale condiviso da 768 dimensioni. I [pesi sono disponibili su Hugging Face](https://huggingface.co/google/embeddinggemma-2).",
            "Non è un modello generativo. Produce rappresentazioni numeriche confrontabili per ricerca semantica, retrieval-augmented generation (RAG), classificazione, clustering e misure di similarità. Il cambiamento rispetto alla prima EmbeddingGemma è soprattutto l'estensione dal testo a un indice realmente multimodale."
          ]
        },
        {
          "label": "02 / Un unico indice",
          "title": "Una query testuale può recuperare contenuti che non sono testo.",
          "paragraphs": [
            "Poiché le modalità finiscono nello stesso spazio vettoriale, una query testuale può essere confrontata direttamente con l'embedding di un'immagine, di un segmento audio o di frame video. Google indica una context window di 8.192 token e, con le impostazioni descritte al lancio, fino a circa 5,5 minuti di audio, 29 immagini o 58 frame video quando viene usata una sola modalità.",
            "Per un archivio aziendale il pattern è concreto: manuali, PDF visuali, screenshot, fotografie tecniche, registrazioni, video e documentazione testuale possono condividere lo stesso livello di retrieval. Questo non elimina segmentazione, metadata, permessi o controllo degli accessi; riduce però la necessità di costruire una pipeline di rappresentazione completamente separata per ogni formato."
          ]
        },
        {
          "label": "03 / Il footprint",
          "title": "Le modalità non usate possono essere escluse dal deployment.",
          "paragraphs": [
            "La [model card](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2) separa un componente text-only da 270M parametri, un encoder vision da 170M e un encoder audio da 300M. La configurazione testo+immagini arriva a 440M, testo+audio a 570M e quella completa a 740M.",
            "Nel [post di lancio](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/), Google riporta che con quantizzazione su Pixel 11 Pro i pesi text-only richiedono circa 191 MB di RAM attiva e la configurazione multimodale completa circa 567 MB. Sono misure del produttore, non benchmark indipendenti, ma mostrano il target del progetto: retrieval su laptop, smartphone ed edge device, non soltanto attraverso una API cloud.",
            "Questo si collega direttamente alla scelta tra [AI locale e cloud](https://empv.it/it/research-notes/ai-on-premise-vs-cloud-quando-conviene/): eseguire l'embedding vicino al corpus può ridurre dipendenze esterne e trasferimenti di dati, ma file, vector database, permessi e pipeline di indicizzazione restano componenti da proteggere."
          ]
        },
        {
          "label": "04 / La dimensione dell'indice",
          "title": "Da 768 a 256 dimensioni: meno storage, con un trade-off misurabile.",
          "paragraphs": [
            "EmbeddingGemma 2 usa Matryoshka Representation Learning. Il vettore nativo da 768 dimensioni può essere troncato a 512, 256 o 128 dimensioni e poi normalizzato nuovamente. Passare da 768 a 256 dimensioni riduce a un terzo lo spazio occupato da ogni vettore; 128 dimensioni portano la riduzione a 6 volte.",
            "Nei risultati pubblicati da Google, MTEB multilingual passa da 61,36 a 60,41 a 256d, MTEB Code da 78,68 a 76,18 e MMEB v2 complessivo da 59,01 a 56,24. A 128d MMEB v2 scende invece a 45,65, e la stessa documentazione raccomanda di validare questa configurazione con particolare attenzione per workload multimodali.",
            "C'è anche un failure mode operativo poco visibile: la [documentazione tecnica](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2) raccomanda `bfloat16` o `float32` e sconsiglia `float16`, perché il modello può produrre NaN o embedding degradati senza generare necessariamente un errore esplicito. Configurazione numerica e dimensionalità fanno quindi parte del test, non sono dettagli del runtime."
          ]
        },
        {
          "label": "05 / I benchmark",
          "title": "Sul testo il miglioramento è minimo. Sul codice è molto più evidente.",
          "paragraphs": [
            "La [valutazione pubblicata da Google](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2) mette EmbeddingGemma 2 a 61,36 su MTEB multilingual contro 61,15 della prima EmbeddingGemma. Sul testo, quindi, il salto dichiarato è piccolo.",
            "Su MTEB Code il punteggio passa invece da 68,76 a 78,68. Se il risultato si trasferisce a repository reali, il caso d'uso diventa interessante per semantic code search, retrieval per coding agent e navigazione di codebase locali. Per immagini, documenti visuali, video e audio non esiste un confronto diretto con EmbeddingGemma 1, perché quelle modalità non erano supportate.",
            "Al lancio, la maggior parte dei numeri dettagliati arriva ancora da Google. La model card dichiara supporto per oltre 100 lingue ma avverte anche che la qualità può non essere uniforme tra lingue. Per un corpus italiano o tecnico, i benchmark pubblici non sostituiscono una valutazione sul proprio materiale."
          ]
        },
        {
          "label": "06 / Il modello dell'indice",
          "title": "Con gli embedding il lock-in resta nel database anche dopo la chiamata.",
          "paragraphs": [
            "La model card indica licenza Apache 2.0 e specifica anche che i deployment devono aderire alla Gemma Prohibited Use Policy. La disponibilità dei pesi ha una conseguenza particolare per gli embedding: i vettori prodotti oggi possono restare in un database per anni, e cambiare modello significa normalmente ricalcolare il corpus.",
            "[Simon Willison](https://simonwillison.net/2026/Oct/6/hn-49983751/) ha evidenziato questo punto commentando il lancio: anche chi preferisce usare un servizio hosted può voler scegliere un modello con pesi disponibili, così da poterlo eseguire altrove se il provider smette di offrirlo.",
            "Per un sistema aziendale il modello di embedding va quindi trattato come parte dello schema dell'indice, insieme a dimensionalità, strategia di chunking e metadata. Sostituirlo assomiglia più a una migrazione dati che al cambio di una API stateless."
          ]
        },
        {
          "label": "07 / Il test aziendale",
          "title": "La domanda utile è se recupera gli elementi corretti nel corpus reale.",
          "paragraphs": [
            "EmbeddingGemma 2 rende plausibile un retrieval multimodale locale con un footprint contenuto, ma il test dovrebbe partire da un corpus rappresentativo: documenti italiani, PDF con layout reali, immagini, screenshot, registrazioni, video e codice a seconda del sistema da indicizzare. Servono poi query per cui sia già noto quali elementi dovrebbero essere recuperati.",
            "A quel punto si possono confrontare configurazione text-only e multimodale, 768 contro 256 dimensioni, recall, latenza, memoria e dimensione dell'indice. È lo stesso principio usato nella nostra nota su [come valutare un LLM locale prima della produzione](https://empv.it/it/research-notes/valutare-llm-locale-prima-produzione/): modello, runtime e workload vanno misurati insieme.",
            "Il vantaggio del locale non è semplicemente evitare il cloud. È poter mettere modello, corpus e indice dentro un confine operativo definito e sapere, con test riproducibili, quale qualità di retrieval quel sistema mantiene nel tempo."
          ]
        }
      ],
      "en": [
        {
          "label": "01 / The model",
          "title": "One embedding model for text, code, images, video and audio.",
          "paragraphs": [
            "[Google DeepMind](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/) released EmbeddingGemma 2 on October 6, 2026. The [official model card](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2) describes a 740-million-parameter model that maps text and code, images, video and audio — including combinations in the same input — into a shared 768-dimensional vector space. The [weights are available on Hugging Face](https://huggingface.co/google/embeddinggemma-2).",
            "It is not a generative model. It produces comparable numerical representations for semantic search, retrieval-augmented generation (RAG), classification, clustering and similarity. The main change from the first EmbeddingGemma is the move from text embeddings to a natively multimodal index."
          ]
        },
        {
          "label": "02 / One index",
          "title": "A text query can retrieve content that is not text.",
          "paragraphs": [
            "Because the modalities share one vector space, a text query can be compared directly with an image embedding, an audio segment or video frames. Google lists an 8,192-token context window and, under the launch configuration, up to roughly 5.5 minutes of audio, 29 images or 58 video frames when using a single modality.",
            "For an enterprise knowledge archive, the pattern is concrete: manuals, visual PDFs, screenshots, technical photographs, recordings, videos and text documentation can share the same retrieval layer. This does not remove segmentation, metadata, permissions or access control, but it can reduce the need to maintain a completely separate representation pipeline for every format."
          ]
        },
        {
          "label": "03 / The footprint",
          "title": "Unused modalities can be left out of the deployment.",
          "paragraphs": [
            "The [model card](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2) separates a 270M text-only component, a 170M vision encoder and a 300M audio encoder. Text plus images uses 440M parameters, text plus audio 570M, and the complete configuration 740M.",
            "In the [launch post](https://blog.google/innovation-and-ai/technology/developers-tools/embeddinggemma-2/), Google reports that with quantization on a Pixel 11 Pro the text-only weights require roughly 191 MB of active RAM and the complete multimodal model roughly 567 MB. These are vendor-reported measurements rather than independent benchmarks, but they show the intended target: retrieval on laptops, phones and edge devices rather than exclusively through a cloud API.",
            "This connects directly to the choice between [local and cloud AI](https://empv.it/en/research-notes/on-premise-vs-cloud-when-it-makes-sense/): generating embeddings close to the corpus can reduce external dependencies and data transfers, but files, vector databases, permissions and indexing pipelines still need their own security boundary."
          ]
        },
        {
          "label": "04 / Index size",
          "title": "From 768 to 256 dimensions: less storage with a measurable trade-off.",
          "paragraphs": [
            "EmbeddingGemma 2 uses Matryoshka Representation Learning. Its native 768-dimensional vectors can be truncated to 512, 256 or 128 dimensions and then re-normalized. Moving from 768 to 256 dimensions cuts storage per vector to one third; 128 dimensions gives a 6x reduction.",
            "In Google's published results, multilingual MTEB moves from 61.36 to 60.41 at 256d, MTEB Code from 78.68 to 76.18 and overall MMEB v2 from 59.01 to 56.24. At 128d, MMEB v2 drops to 45.65, and the documentation itself recommends careful validation for multimodal workloads.",
            "There is also a less visible runtime failure mode: the [technical documentation](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2) recommends `bfloat16` or `float32` and advises against `float16`, because the model can return NaNs or silently degraded embeddings without necessarily raising an explicit error. Numerical precision and vector dimensionality are therefore part of the evaluation, not incidental runtime settings."
          ]
        },
        {
          "label": "05 / Benchmarks",
          "title": "The text improvement is small. The code result moves much more.",
          "paragraphs": [
            "The [evaluation published by Google](https://ai.google.dev/gemma/docs/embeddinggemma/model_card_2) places EmbeddingGemma 2 at 61.36 on multilingual MTEB versus 61.15 for the first EmbeddingGemma. On text, the reported improvement is minimal.",
            "On MTEB Code, the score rises from 68.76 to 78.68. If that result transfers to real repositories, the model could be useful for semantic code search, retrieval for coding agents and local codebase navigation. There is no direct EmbeddingGemma 1 comparison for images, visual documents, video or audio because the previous model did not support those modalities.",
            "At launch, most detailed evaluation numbers still come from Google. The model card says the model supports more than 100 languages while also warning that quality may not be uniform across them. For an Italian or domain-specific corpus, public benchmarks do not replace workload-specific evaluation."
          ]
        },
        {
          "label": "06 / The model behind the index",
          "title": "Embedding lock-in stays in the database after the API request is over.",
          "paragraphs": [
            "The model card lists an Apache 2.0 license and also states that deployments must comply with the Gemma Prohibited Use Policy. Weight availability has a specific consequence for embeddings: vectors generated today may stay in a database for years, and switching to an incompatible model will normally require re-embedding the corpus.",
            "[Simon Willison](https://simonwillison.net/2026/Oct/6/hn-49983751/) highlighted this when commenting on the release: even teams that prefer a hosted service may want a model whose weights remain available, so the same model can be run elsewhere if a provider stops serving it.",
            "For an enterprise system, the embedding model should therefore be treated as part of the index schema alongside vector dimensionality, chunking strategy and metadata. Replacing it can look more like a data migration than switching a stateless API."
          ]
        },
        {
          "label": "07 / The enterprise test",
          "title": "The useful question is whether it retrieves the right items from the real corpus.",
          "paragraphs": [
            "EmbeddingGemma 2 makes compact local multimodal retrieval plausible, but the evaluation should start with a representative corpus: real documents, PDFs with actual layouts, images, screenshots, recordings, video and code depending on the system being indexed. The test also needs queries for which the expected relevant items are already known.",
            "That makes it possible to compare text-only and multimodal configurations, 768 versus 256 dimensions, recall, latency, memory use and index size. It is the same principle from our note on [evaluating a local LLM before production](https://empv.it/en/research-notes/evaluating-local-llms-before-production/): model, runtime and workload need to be measured together.",
            "The advantage of local execution is not simply avoiding the cloud. It is the ability to place model, corpus and index inside a defined operating boundary and measure, with reproducible tests, what retrieval quality the whole system can sustain over time."
          ]
        }
      ]
    },
    "takeaway": {
      "it": "EmbeddingGemma 2 può mettere testo, codice e media nello stesso spazio vettoriale su hardware locale. La scelta utile parte dal corpus, dalle query reali e dal costo di mantenere l'indice nel tempo.",
      "en": "EmbeddingGemma 2 can place text, code and media inside one vector space on local hardware. The useful decision starts with the corpus, real queries and the long-term cost of maintaining the index."
    }
  },
  {
    "id": "thinkingbox-agent-reliability",
    "index": "008",
    "slugs": {
      "it": "thinkingbox-valutare-agenti-stato-finale-sistemi",
      "en": "thinkingbox-evaluating-agents-by-final-system-state"
    },
    "title": {
      "it": "ThinkingBox misura gli agenti sullo stato finale dei sistemi",
      "en": "ThinkingBox evaluates agents by the final state of the system"
    },
    "dek": {
      "it": "Il benchmark di Microsoft e Hugging Face esegue 507 workflow aziendali più volte e controlla database ed effetti prodotti. Un agente può terminare senza errori e dichiarare il task concluso lasciando comunque il sistema nello stato sbagliato.",
      "en": "The Microsoft and Hugging Face benchmark repeatedly runs 507 business workflows and checks databases and resulting side effects. An agent can finish without an error and report completion while still leaving the system in the wrong state."
    },
    "category": {
      "it": "TECH NOTE / AI AGENTS",
      "en": "TECH NOTE / AI AGENTS"
    },
    "tags": {
      "it": [
        "ThinkingBox",
        "AI agents",
        "MCP",
        "Agent evaluation"
      ],
      "en": [
        "ThinkingBox",
        "AI agents",
        "MCP",
        "Agent evaluation"
      ]
    },
    "published": "2026-10-06",
    "updated": "2026-10-06",
    "readingTime": {
      "it": "7 min",
      "en": "7 min"
    },
    "sections": {
      "it": [
        {
          "label": "01 / Il benchmark",
          "title": "ThinkingBox verifica cosa resta nel sistema dopo che l'agente ha finito.",
          "paragraphs": [
            "Il 3 ottobre Microsoft e Hugging Face hanno pubblicato una nuova presentazione di [ThinkingBox](https://huggingface.co/blog/microsoft/thinkingbox), un ambiente e benchmark per valutare agenti che lavorano su workflow aziendali con stato persistente. Il relativo [paper](https://arxiv.org/abs/2608.19741), aggiornato il 1° ottobre, descrive 507 task in scenari come retail, assicurazioni auto, viaggi, neobank e supporto IT/HR.",
            "Ogni task parte da uno stato iniziale definito, mette a disposizione strumenti compatibili con Model Context Protocol (MCP) e termina con check eseguibili sullo stato del backend. L'obiettivo non è stabilire se la risposta dell'agente sembra corretta, ma se database e modifiche prodotte corrispondono davvero al risultato richiesto."
          ]
        },
        {
          "label": "02 / Un tool call non è un risultato",
          "title": "Una sequenza di azioni plausibili può comunque lasciare il record sbagliato.",
          "paragraphs": [
            "L'esempio usato dagli autori riguarda un ticket di assistenza per una consegna bloccata. L'agente consulta ordine, tracking, profilo cliente e policy, apre il ticket e poi lo chiude come risolto. Il flusso appare ordinato, ma il corriere mantiene un'eccezione aperta: lo stato corretto del ticket avrebbe dovuto essere \"hold\", non \"solved\".",
            "ThinkingBox tratta quindi la traiettoria dell'agente come una dichiarazione e lo stato finale come evidenza. Nei task con effetti strutturati, giudici deterministici confrontano ciò che è cambiato con lo stato atteso e rifiutano valori errati, azioni mancanti o modifiche aggiuntive non richieste."
          ]
        },
        {
          "label": "03 / Affidabilità",
          "title": "Riuscire una volta e riuscire sempre sono due metriche diverse.",
          "paragraphs": [
            "I 507 task vengono ripetuti 20 volte da uno stato pulito. Il benchmark distingue il successo medio di una singola esecuzione, la capacità di risolvere un task almeno una volta e il numero di task completati correttamente in tutte e 20 le prove.",
            "Questa distinzione cambia la lettura dei risultati. Nel report, Claude Opus 5.5 ottiene il 67,16% di pass@1 ma completa 241 task su 507 in tutte le 20 esecuzioni, il 47,53%. Kimi-K3 raggiunge almeno una volta 476 task su 507, ma ne completa solo 68 in tutte le 20 prove. Il benchmark non misura soltanto cosa un modello sa fare: misura quanto spesso lo stesso workflow resta corretto quando viene ripetuto."
          ]
        },
        {
          "label": "04 / I fallimenti silenziosi",
          "title": "Molti errori non producono un segnale di errore utilizzabile dal sistema.",
          "paragraphs": [
            "In un'analisi comune a 12 modelli, gli autori riportano 121.680 trial validi. Di questi, 79.853 falliscono i check eseguibili. Il 67,24% dei fallimenti termina comunque normalmente, include almeno un'azione che modifica lo stato e non presenta un errore finale del tool.",
            "Tra quei fallimenti, i check trovano valori di campo errati nel 77,61% dei casi, effetti aggiuntivi non richiesti nel 43,30% e azioni necessarie mancanti nel 25,36%; le categorie possono sovrapporsi. Un monitor che guarda soltanto eccezioni, tool call formalmente valide o il testo finale dell'agente può quindi classificare come riuscito un lavoro che il sistema di record mostra come incompleto o sbagliato."
          ]
        },
        {
          "label": "05 / Implicazioni operative",
          "title": "Per un agente che scrive nei sistemi aziendali, il criterio di successo deve vivere fuori dall'agente.",
          "paragraphs": [
            "Il punto utile per chi costruisce automazioni è separare l'esecuzione dalla verifica. Se un agente aggiorna CRM, ticketing, ordini o anagrafiche, il risultato può essere controllato leggendo lo stato autorevole dopo l'azione e confrontandolo con condizioni esplicite, invece di accettare come prova il messaggio finale del modello.",
            "Gli autori suggeriscono anche di classificare gli errori di tool e sistema per applicare retry mirati, ridurre la superficie di strumenti al necessario e mantenere approvazione umana sulle modifiche difficili da invertire. ThinkingBox rende queste scelte misurabili perché ogni tentativo parte da uno stato isolato e restituisce effetti osservabili."
          ]
        },
        {
          "label": "06 / Cosa dimostra e cosa no",
          "title": "È un benchmark riproducibile, ma i workflow pubblici restano ricostruzioni sintetiche.",
          "paragraphs": [
            "I 507 task modellano pattern aziendali, ma il post specifica che ogni workflow pubblico è una ricostruzione sintetica e non contiene clienti reali. Inoltre 477 task sono giudicati sullo stato, mentre 30 aggiungono una rubrica binaria sulla risposta quando un requisito non può essere espresso con un semplice valore nel database.",
            "Il vantaggio è che ambiente, dataset e controlli sono ispezionabili. Il [framework ThinkingBox](https://github.com/microsoft/thinkingbox) è open source, il [benchmark v1.0](https://github.com/microsoft/thinkingbox-data/releases/tag/thinkingbox-bench-v1.0) è pubblicato separatamente e l'integrazione con [OpenEnv](https://huggingface.co/docs/openenv/environments/thinkingbox) permette di eseguire episodi e ottenere un esito pass/fail.",
            "Per un'azienda questo non sostituisce una valutazione sui propri processi. Offre però un criterio concreto da trasferire nei test interni: definire prima lo stato finale corretto, poi verificare se l'agente lo raggiunge in modo ripetibile."
          ]
        }
      ],
      "en": [
        {
          "label": "01 / The benchmark",
          "title": "ThinkingBox checks what remains in the system after the agent finishes.",
          "paragraphs": [
            "On October 3, Microsoft and Hugging Face published a new overview of [ThinkingBox](https://huggingface.co/blog/microsoft/thinkingbox), an environment and benchmark for evaluating agents that work on stateful business workflows. The accompanying [paper](https://arxiv.org/abs/2608.19741), revised on October 1, describes 507 tasks across retail, auto insurance, travel, neobank and IT/HR support scenarios.",
            "Each task starts from a defined initial state, exposes Model Context Protocol (MCP)-compatible tools and ends with executable checks over the backend state. The goal is not to decide whether the agent's answer sounds correct, but whether the database and resulting side effects actually match the requested outcome."
          ]
        },
        {
          "label": "02 / A tool call is not an outcome",
          "title": "A plausible sequence of actions can still leave the wrong record behind.",
          "paragraphs": [
            "The authors use a support ticket for a delayed delivery as an example. The agent checks the order, tracking, customer profile and policy, opens a ticket and then closes it as resolved. The sequence looks orderly, but the carrier still has an open exception: the correct ticket state should have been \"hold\", not \"solved\".",
            "ThinkingBox therefore treats the agent trajectory as a claim and the terminal state as evidence. For tasks with structured effects, deterministic judges compare what changed with the required end state and reject wrong values, missing actions or unintended extra changes."
          ]
        },
        {
          "label": "03 / Reliability",
          "title": "Succeeding once and succeeding every time are different metrics.",
          "paragraphs": [
            "The 507 tasks are repeated 20 times from a clean state. The benchmark separates average single-run success, whether a task can be solved at least once, and how many tasks are completed correctly in all 20 recorded attempts.",
            "That distinction changes how the results read. In the report, Claude Opus 5.5 reaches 67.16% pass@1 but completes 241 of 507 tasks in all 20 runs, or 47.53%. Kimi-K3 solves 476 of 507 tasks at least once but only 68 in all 20 attempts. The benchmark is not only asking what a model can do; it measures how often the same workflow stays correct when repeated."
          ]
        },
        {
          "label": "04 / Silent failures",
          "title": "Many failures do not produce an error signal that the surrounding system can rely on.",
          "paragraphs": [
            "In a common-set analysis across 12 models, the authors report 121,680 valid trials. Of those, 79,853 fail the executable checks. Yet 67.24% of the failures still terminate cleanly, include at least one state-changing action and report no final tool error.",
            "Within those failures, executable checks find wrong field values in 77.61%, unintended extra effects in 43.30% and missing required effects in 25.36%; the categories overlap. A monitor that only watches exceptions, formally valid tool calls or the agent's final text can therefore mark work as successful even when the system of record shows an incomplete or incorrect outcome."
          ]
        },
        {
          "label": "05 / Operational implications",
          "title": "For agents that write to business systems, the success criterion should live outside the agent.",
          "paragraphs": [
            "The practical design lesson is to separate execution from verification. If an agent updates a CRM, ticketing system, order record or customer master, the outcome can be checked by reading the authoritative state after the action and comparing it with explicit conditions, rather than treating the model's final message as proof.",
            "The authors also suggest classifying tool and system errors so retries target recoverable failures, reducing the tool surface to what the workflow needs, and keeping human approval for changes that are difficult to reverse. ThinkingBox makes these choices measurable because each attempt starts in isolation and exposes the effects it produced."
          ]
        },
        {
          "label": "06 / What it shows and what it does not",
          "title": "It is a reproducible benchmark, but the public workflows are still synthetic reconstructions.",
          "paragraphs": [
            "The 507 tasks model enterprise patterns, but the post states that every public workflow is a synthetic reconstruction and does not contain real customers. In addition, 477 tasks are graded on state alone, while 30 add a narrow binary response rubric where a requirement cannot be expressed as a simple database value.",
            "The advantage is that the environment, data and checks are inspectable. The [ThinkingBox framework](https://github.com/microsoft/thinkingbox) is open source, the [v1.0 benchmark](https://github.com/microsoft/thinkingbox-data/releases/tag/thinkingbox-bench-v1.0) is released separately, and its [OpenEnv integration](https://huggingface.co/docs/openenv/environments/thinkingbox) can run episodes and return a pass/fail result.",
            "For a company, this does not replace evaluation on its own processes. It does provide a concrete criterion to bring into internal tests: define the correct final state first, then verify whether the agent reaches it repeatedly."
          ]
        }
      ]
    },
    "takeaway": {
      "it": "Se un agente modifica sistemi aziendali, \"fatto\" non è una prova: il risultato va letto nello stato finale del sistema e verificato più di una volta.",
      "en": "If an agent changes business systems, \"done\" is not evidence: the result should be read from the final system state and verified more than once."
    }
  },
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
