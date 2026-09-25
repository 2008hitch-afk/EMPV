import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowDownRight, ArrowUpRight, Languages } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import BackgroundLab from "./BackgroundLab";
import BackgroundEffect, { BACKGROUND_OPTIONS, type BackgroundName } from "./backgrounds/BackgroundEffect";

type Lang = "it" | "en";

type Project = {
  index: string;
  name: string;
  kind: string;
  description: string;
  meta: string[];
  accent: string;
};

const copy = {
  it: {
    nav: { work: "Progetti", labs: "In sviluppo", people: "Enrico + Michele" },
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
    labsLabel: "02 / In sviluppo",
    labsTitle: "Alcune domande meritano di diventare progetti.",
    labsIntro:
      "Non tutto nasce da un brief cliente. Esploriamo prodotti, infrastrutture e linee di ricerca che potrebbero diventare sistemi autonomi.",
    labsNote:
      "Esperimenti, prototipi e direzioni di ricerca selezionate · alcuni dettagli restano intenzionalmente non pubblici.",
    peopleLabel: "03 / People",
    peopleTitle: "Enrico + Michele",
    peopleIntro:
      "I progetti nascono nel punto in cui progettazione del processo e costruzione tecnica si incontrano.",
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
    nav: { work: "Projects", labs: "In development", people: "Enrico + Michele" },
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
    labsLabel: "02 / In development",
    labsTitle: "Some questions are worth turning into projects.",
    labsIntro:
      "Not everything starts from a client brief. We explore products, infrastructure and research directions that may become standalone systems.",
    labsNote:
      "Selected experiments, prototypes and research directions · some details intentionally remain undisclosed.",
    peopleLabel: "03 / People",
    peopleTitle: "Enrico + Michele",
    peopleIntro:
      "Projects take shape where process design and technical execution meet.",
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

const selected: Record<Lang, Project[]> = {
  it: [
    {
      index: "01",
      name: "L'Infisso",
      kind: "Progetto cliente",
      description:
        "Da informazioni distribuite tra cartelle, ufficio, officina e sopralluoghi a un unico sistema che accompagna la commessa dal rilievo alla posa.",
      meta: ["Commesse", "Campo → officina", "Dati condivisi", "Automazioni"],
      accent: "infisso",
    },
    {
      index: "02",
      name: "Centro Change",
      kind: "Progetto cliente",
      description:
        "Un unico sistema per coordinare pazienti, professionisti, appuntamenti, sedute e amministrazione, rispettando ruoli e responsabilità differenti.",
      meta: ["Operations", "Scheduling", "Ruoli", "Amministrazione"],
      accent: "change",
    },
    {
      index: "03",
      name: "Cloeshouse Pet Resort",
      kind: "Progetto cliente",
      description:
        "Prenotazione cliente e lavoro quotidiano dello staff nello stesso sistema: soggiorni, disponibilità, attività, grooming, documenti e pagamenti.",
      meta: ["Hospitality ops", "Booking", "Area cliente", "Daily operations"],
      accent: "kennel",
    },
    {
      index: "04",
      name: "Cube Audio Service",
      kind: "Progetto cliente",
      description:
        "Da richieste libere e difficili da valutare a un percorso guidato che raccoglie le informazioni necessarie prima che Cube prepari il preventivo.",
      meta: ["Lead flow", "Richiesta guidata", "Website", "Human review"],
      accent: "cube",
    },
  ],
  en: [
    {
      index: "01",
      name: "L'Infisso",
      kind: "Client project",
      description:
        "From information split across folders, office, workshop and site surveys to one system that follows each job from measurement to installation.",
      meta: ["Jobs", "Field → workshop", "Shared data", "Automation"],
      accent: "infisso",
    },
    {
      index: "02",
      name: "Centro Change",
      kind: "Client project",
      description:
        "One operating system for patients, professionals, appointments, sessions and administration, while preserving distinct roles and responsibilities.",
      meta: ["Operations", "Scheduling", "Roles", "Administration"],
      accent: "change",
    },
    {
      index: "03",
      name: "Cloeshouse Pet Resort",
      kind: "Client project",
      description:
        "Customer booking and staff operations in the same system: stays, availability, tasks, grooming, documents and payments.",
      meta: ["Hospitality ops", "Booking", "Customer area", "Daily operations"],
      accent: "kennel",
    },
    {
      index: "04",
      name: "Cube Audio Service",
      kind: "Client project",
      description:
        "From unstructured requests that were hard to evaluate to a guided flow that collects the information Cube needs before preparing a quote.",
      meta: ["Lead flow", "Guided request", "Website", "Human review"],
      accent: "cube",
    },
  ],
};

const labs: Record<Lang, Project[]> = {
  it: [
    {
      index: "A",
      name: "System Twin",
      kind: "Exploration",
      description:
        "Sistemi capaci di ricostruire e spiegare automaticamente come funziona davvero un software complesso a partire dalle evidenze che produce.",
      meta: ["System understanding", "Evidence", "Architecture"],
      accent: "twin",
    },
    {
      index: "B",
      name: "Local AI",
      kind: "Applied R&D",
      description:
        "Un laboratorio per misurare quali compiti un modello AI locale sa realmente svolgere, con prove riproducibili invece di benchmark generici.",
      meta: ["Local models", "Evaluation", "Evidence"],
      accent: "local",
    },
    {
      index: "C",
      name: "Opportunity Engine",
      kind: "Prototype",
      description:
        "Una macchina di ricerca commerciale che parte dai problemi operativi osservabili e cerca aziende che mostrano quei segnali, invece di partire da liste di prospect.",
      meta: ["Problem discovery", "Research", "Qualification"],
      accent: "opportunity",
    },
    {
      index: "D",
      name: "Vertical Operations",
      kind: "Product direction",
      description:
        "Sistemi operativi verticali che collegano acquisto del cliente, configurazione del servizio e lavoro quotidiano dello staff nello stesso prodotto.",
      meta: ["Vertical SaaS", "Operations", "Product"],
      accent: "vertical",
    },
    {
      index: "E",
      name: "Trustworthy Reasoning",
      kind: "Research",
      description:
        "Ricerca su AI che mantiene evidenze, versioni, contraddizioni e incertezza invece di nasconderle dietro una singola risposta.",
      meta: ["Reasoning", "Evidence", "Trust"],
      accent: "reasoning",
    },
  ],
  en: [
    {
      index: "A",
      name: "System Twin",
      kind: "Exploration",
      description:
        "Systems that can reconstruct and explain how complex software actually works from the evidence it produces.",
      meta: ["System understanding", "Evidence", "Architecture"],
      accent: "twin",
    },
    {
      index: "B",
      name: "Local AI",
      kind: "Applied R&D",
      description:
        "A lab for measuring which tasks a local AI model can actually perform, using reproducible evidence instead of generic benchmarks.",
      meta: ["Local models", "Evaluation", "Evidence"],
      accent: "local",
    },
    {
      index: "C",
      name: "Opportunity Engine",
      kind: "Prototype",
      description:
        "A commercial research machine that starts from observable operational problems and looks for companies showing those signals instead of starting from prospect lists.",
      meta: ["Problem discovery", "Research", "Qualification"],
      accent: "opportunity",
    },
    {
      index: "D",
      name: "Vertical Operations",
      kind: "Product direction",
      description:
        "Vertical operating systems connecting what customers buy, how the service is configured and the daily work generated for staff.",
      meta: ["Vertical SaaS", "Operations", "Product"],
      accent: "vertical",
    },
    {
      index: "E",
      name: "Trustworthy Reasoning",
      kind: "Research",
      description:
        "Research into AI systems that preserve evidence, versions, contradictions and uncertainty instead of hiding them behind a single answer.",
      meta: ["Reasoning", "Evidence", "Trust"],
      accent: "reasoning",
    },
  ],
};

function ProjectVisual({ accent, index }: { accent: string; index: string }) {
  return (
    <div className={`project-visual visual-${accent}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-orbit orbit-a" />
      <div className="visual-orbit orbit-b" />
      <div className="visual-core">{index}</div>
      <div className="visual-coordinate">EMPV / {accent.toUpperCase()} / 26</div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  function onMove(event: MouseEvent<HTMLElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    });
  }

  return (
    <motion.article
      className="project-card"
      onMouseMove={onMove}
      style={
        {
          "--spot-x": `${spot.x}%`,
          "--spot-y": `${spot.y}%`,
        } as CSSProperties
      }
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProjectVisual accent={project.accent} index={project.index} />
      <div className="project-copy">
        <div className="project-topline">
          <span>{project.index}</span>
          <span>{project.kind}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      <ArrowUpRight className="project-arrow" size={26} strokeWidth={1.4} />
    </motion.article>
  );
}

function PortraitPlaceholder({
  initials,
  name,
  role,
  text,
  note,
  variant,
}: {
  initials: string;
  name: string;
  role: string;
  text: string;
  note: string;
  variant: "a" | "b";
}) {
  return (
    <motion.article
      className="person"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`portrait portrait-${variant}`}>
        <div className="portrait-noise" />
        <div className="portrait-ring ring-1" />
        <div className="portrait-ring ring-2" />
        <div className="portrait-initials">{initials}</div>
        <span>{note}</span>
      </div>
      <div className="person-copy">
        <div className="person-index">{variant === "a" ? "E / 01" : "M / 02"}</div>
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <p>{text}</p>
      </div>
    </motion.article>
  );
}

function readHomepageBackground(): BackgroundName {
  const value = new URLSearchParams(window.location.search).get("bg");
  return BACKGROUND_OPTIONS.some((item) => item.id === value)
    ? (value as BackgroundName)
    : "none";
}

function PortfolioApp() {
  const [lang, setLang] = useState<Lang>("it");
  const activeBackground = useMemo(readHomepageBackground, []);
  const reduceMotion = useReducedMotion();
  const c = copy[lang];
  const projectList = useMemo(() => selected[lang], [lang]);
  const labList = useMemo(() => labs[lang], [lang]);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.35]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((current) => (current === "it" ? "en" : "it"));

  const onPagePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY}px`);
    event.currentTarget.style.setProperty("--glow-opacity", "1");
  };

  const onPagePointerLeave = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--glow-opacity", "0");
  };

  return (
    <div
      className="site-shell"
      onMouseMove={onPagePointerMove}
      onMouseLeave={onPagePointerLeave}
    >
      <div className="global-pointer-glow" aria-hidden="true" />
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="EMPV home">
          EMPV<span className="wordmark-dot">•</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">{c.nav.work}</a>
          <a href="#labs">{c.nav.labs}</a>
          <a href="#people">{c.nav.people}</a>
        </nav>
        <button className="lang-switch" type="button" onClick={toggleLang}>
          <Languages size={15} strokeWidth={1.6} />
          {c.language}
        </button>
      </header>

      <main>
        <section className="hero" id="top">
          {activeBackground === "none" ? (
            <div className="tech-field" aria-hidden="true">
              <div className="scan scan-a" />
              <div className="scan scan-b" />
              <div className="signal-dot dot-a" />
              <div className="signal-dot dot-b" />
              <div className="signal-dot dot-c" />
            </div>
          ) : (
            <BackgroundEffect name={activeBackground} className="hero-background-effect" />
          )}

          <motion.div className="hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
            <div className="eyebrow">{c.heroEyebrow}</div>
            <h1>
              <span>{c.heroTitleA}</span>
              <span className="outline">{c.heroTitleB}</span>
            </h1>
            <div className="hero-bottom">
              <p>{c.heroBody}</p>
              <a href="#work" className="scroll-cue">
                {c.scroll}
                <ArrowDownRight size={20} strokeWidth={1.3} />
              </a>
            </div>
          </motion.div>

          <div className="hero-code" aria-hidden="true">
            <span>45.6983° N</span>
            <span>09.6773° E</span>
            <span>SYS / PROD / AI</span>
          </div>
        </section>

        <section className="manifesto section-pad">
          <div className="section-code">EMPV / 00</div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
          >
            {c.manifesto}
          </motion.p>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-head">
            <div>
              <div className="eyebrow">{c.selectedLabel}</div>
              <h2>{c.selectedTitle}</h2>
            </div>
            <p>{c.selectedIntro}</p>
          </div>
          <div className="project-list">
            {projectList.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>

        <section className="labs section-pad" id="labs">
          <div className="section-head labs-head">
            <div>
              <div className="eyebrow">{c.labsLabel}</div>
              <h2>{c.labsTitle}</h2>
            </div>
            <p>{c.labsIntro}</p>
          </div>

          <div className="lab-list">
            {labList.map((project) => (
              <motion.article
                className="lab-row"
                key={project.name}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.65 }}
              >
                <div className="lab-index">{project.index}</div>
                <div className="lab-main">
                  <span>{project.kind}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="lab-tags">
                  {project.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <ArrowUpRight className="lab-arrow" size={24} strokeWidth={1.3} />
              </motion.article>
            ))}
          </div>
          <p className="labs-note">{c.labsNote}</p>
        </section>

        <section className="people section-pad" id="people">
          <div className="section-head people-head">
            <div>
              <div className="eyebrow">{c.peopleLabel}</div>
              <h2>{c.peopleTitle}</h2>
            </div>
            <p>{c.peopleIntro}</p>
          </div>

          <div className="people-grid">
            <PortraitPlaceholder
              initials="EP"
              name="Enrico Peruffo"
              role={c.enricoRole}
              text={c.enricoText}
              note={c.portraitNote}
              variant="a"
            />
            <PortraitPlaceholder
              initials="MV"
              name="Michele Valleri"
              role={c.micheleRole}
              text={c.micheleText}
              note={c.portraitNote}
              variant="b"
            />
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-mark">EMPV</div>
        <div className="footer-meta">
          <div>{c.footerTop}</div>
          <div>{c.footerBottom}</div>
          <div>© 2026</div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const normalizedPath = window.location.pathname.replace(/\/$/, "");
  const isBackgroundLab = normalizedPath.endsWith("/background-lab");

  return isBackgroundLab ? <BackgroundLab /> : <PortfolioApp />;
}

export default App;
