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
    nav: { work: "Lavori", labs: "Labs / R&D", people: "Chi siamo" },
    heroEyebrow: "Portfolio indipendente · Bergamo, IT",
    heroTitleA: "Sistemi, prodotti",
    heroTitleB: "e ricerca applicata.",
    heroBody:
      "EMPV è il portfolio di Enrico Peruffo e Michele Valleri. Progettiamo e costruiamo software, automazioni e sistemi AI partendo dal problema, non dalla tecnologia.",
    scroll: "Scorri per esplorare",
    manifesto:
      "Ci interessa ciò che succede tra un problema reale e un sistema che funziona. Analizziamo il lavoro, scegliamo gli strumenti giusti e costruiamo solo ciò che serve.",
    selectedLabel: "01 / Selected work",
    selectedTitle: "Lavori selezionati",
    selectedIntro:
      "Progetti costruiti attorno a flussi reali, persone reali e vincoli operativi reali.",
    labsLabel: "02 / Labs & R&D",
    labsTitle: "Costruiamo anche ciò che ancora non esiste.",
    labsIntro:
      "Prodotti proprietari, infrastruttura AI locale e ricerca sperimentale: il laboratorio dove testiamo idee prima che diventino sistemi.",
    peopleLabel: "03 / People",
    peopleTitle: "Due prospettive. Un unico modo di costruire.",
    enricoRole: "AI & Systems Engineer",
    enricoText:
      "Architetture software, AI locale, orchestrazione, infrastruttura e sistemi tecnici. Trasforma idee complesse in ambienti eseguibili e verificabili.",
    micheleRole: "Product, Process & AI Specialist",
    micheleText:
      "Analisi dei processi, product architecture, workflow e applicazione dell’AI al lavoro reale. Trasforma problemi poco definiti in sistemi costruibili.",
    portraitNote: "Ritratto in arrivo",
    footerTop: "EMPV / Enrico + Michele",
    footerBottom: "Software · Systems · AI · Product · Research",
    language: "EN",
    projectKind: "Progetto",
  },
  en: {
    nav: { work: "Work", labs: "Labs / R&D", people: "People" },
    heroEyebrow: "Independent portfolio · Bergamo, IT",
    heroTitleA: "Systems, products",
    heroTitleB: "and applied research.",
    heroBody:
      "EMPV is the portfolio of Enrico Peruffo and Michele Valleri. We design and build software, automation and AI systems starting from the problem — not the technology.",
    scroll: "Scroll to explore",
    manifesto:
      "We care about what happens between a real problem and a system that works. We study the work, choose the right tools and build only what is needed.",
    selectedLabel: "01 / Selected work",
    selectedTitle: "Selected work",
    selectedIntro:
      "Projects shaped around real workflows, real people and real operational constraints.",
    labsLabel: "02 / Labs & R&D",
    labsTitle: "We also build what does not exist yet.",
    labsIntro:
      "Proprietary products, local AI infrastructure and experimental research: the lab where ideas are tested before they become systems.",
    peopleLabel: "03 / People",
    peopleTitle: "Two perspectives. One way of building.",
    enricoRole: "AI & Systems Engineer",
    enricoText:
      "Software architecture, local AI, orchestration, infrastructure and technical systems. Turns complex ideas into executable, verifiable environments.",
    micheleRole: "Product, Process & AI Specialist",
    micheleText:
      "Process analysis, product architecture, workflows and applied AI. Turns loosely defined problems into systems that can actually be built.",
    portraitNote: "Portrait coming soon",
    footerTop: "EMPV / Enrico + Michele",
    footerBottom: "Software · Systems · AI · Product · Research",
    language: "IT",
    projectKind: "Project",
  },
} as const;

const selected: Record<Lang, Project[]> = {
  it: [
    {
      index: "01",
      name: "Cloeshouse Pet Resort",
      kind: "Client work",
      description:
        "Sistema digitale end-to-end per prenotazioni, area cliente, operatività giornaliera, grooming, documenti e flussi di pagamento.",
      meta: ["Product system", "Laravel", "Booking", "Operations"],
      accent: "kennel",
    },
    {
      index: "02",
      name: "Centro Change",
      kind: "Client work",
      description:
        "Piattaforma operativa per un centro di psicologia: ruoli, prenotazioni, sedute, pagamenti, indisponibilità e conteggi mensili.",
      meta: ["Workflow", "Frappe", "Roles", "Operations"],
      accent: "change",
    },
    {
      index: "03",
      name: "Cube Audio Service",
      kind: "Client work",
      description:
        "Presenza digitale e sistema di richiesta strutturato per un service audio, con architettura pronta al deploy e gestione lead senza database.",
      meta: ["Website", "Laravel", "Lead flow", "Deployment"],
      accent: "cube",
    },
  ],
  en: [
    {
      index: "01",
      name: "Cloeshouse Pet Resort",
      kind: "Client work",
      description:
        "An end-to-end digital system for booking, customer area, daily operations, grooming, documents and payment flows.",
      meta: ["Product system", "Laravel", "Booking", "Operations"],
      accent: "kennel",
    },
    {
      index: "02",
      name: "Centro Change",
      kind: "Client work",
      description:
        "An operating platform for a psychology center: roles, appointments, sessions, payments, availability and monthly reconciliation.",
      meta: ["Workflow", "Frappe", "Roles", "Operations"],
      accent: "change",
    },
    {
      index: "03",
      name: "Cube Audio Service",
      kind: "Client work",
      description:
        "Digital presence and structured request system for an audio service company, with deploy-ready architecture and database-free lead handling.",
      meta: ["Website", "Laravel", "Lead flow", "Deployment"],
      accent: "cube",
    },
  ],
};

const labs: Record<Lang, Project[]> = {
  it: [
    {
      index: "A",
      name: "Pet Operations SaaS",
      kind: "Product",
      description:
        "Gestionale multi-tenant per strutture pet: booking engine, area cliente, task, soggiorni, configurazione commerciale e reporting operativo.",
      meta: ["SaaS", "Multi-tenant", "Operations", "Product"],
      accent: "saas",
    },
    {
      index: "B",
      name: "Local AI Capability Lab",
      kind: "Open R&D",
      description:
        "Framework per descrivere, testare e validare workload AI locali con evidenze riproducibili, confini operativi espliciti e qualificazione verificabile.",
      meta: ["Local AI", "Evaluation", "Evidence", "Open source"],
      accent: "local",
    },
    {
      index: "C",
      name: "DeepRAP / Epistemic AI",
      kind: "Research",
      description:
        "Ricerca su evidence graphs, branching epistemico, contraddizioni temporali, belief revision e planning verificabile per sistemi cognitive AI.",
      meta: ["Research", "Knowledge graphs", "Reasoning", "Trust"],
      accent: "deep",
    },
  ],
  en: [
    {
      index: "A",
      name: "Pet Operations SaaS",
      kind: "Product",
      description:
        "A multi-tenant operating platform for pet facilities: booking engine, customer area, tasks, stays, commercial configuration and operational reporting.",
      meta: ["SaaS", "Multi-tenant", "Operations", "Product"],
      accent: "saas",
    },
    {
      index: "B",
      name: "Local AI Capability Lab",
      kind: "Open R&D",
      description:
        "A framework to describe, test and validate local-AI workloads through reproducible evidence, explicit operational boundaries and verifiable qualification.",
      meta: ["Local AI", "Evaluation", "Evidence", "Open source"],
      accent: "local",
    },
    {
      index: "C",
      name: "DeepRAP / Epistemic AI",
      kind: "Research",
      description:
        "Research into evidence graphs, epistemic branching, temporal contradiction, belief revision and verifiable planning for cognitive AI systems.",
      meta: ["Research", "Knowledge graphs", "Reasoning", "Trust"],
      accent: "deep",
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
    : "galaxy";
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
          <div className="labs-intro">
            <div className="eyebrow">{c.labsLabel}</div>
            <h2>{c.labsTitle}</h2>
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
        </section>

        <section className="people section-pad" id="people">
          <div className="section-head people-head">
            <div>
              <div className="eyebrow">{c.peopleLabel}</div>
              <h2>{c.peopleTitle}</h2>
            </div>
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
