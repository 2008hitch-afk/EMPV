import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Languages } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import BackgroundLab from "./BackgroundLab";
import BusinessCard from "./BusinessCard";
import BackgroundEffect, {
  BACKGROUND_OPTIONS,
  DEFAULT_TUNING,
  GALAXY_PALETTES,
  type BackgroundName,
  type BackgroundTuning,
  type GalaxyPalette,
} from "./backgrounds/BackgroundEffect";
import ProjectDetail from "./ProjectDetail";
import LegalPage from "./LegalPage";
import ResearchNotes from "./ResearchNotes";
import SiteFooter from "./SiteFooter";
import { SeoHead, parseCurrentRoute, siteAssetHref, siteHref, type SiteRoute } from "./seo";
import type { SiteLang } from "./detailContent";
import { copy, faqs, labs, selected, type Lang, type Project } from "./homeContent";

function ProjectRow({ project, href, lang }: { project: Project; href: string; lang: Lang }) {
  return (
    <motion.a
      className="project-row"
      href={href}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-row-identity">
        <span className="project-row-kind">{project.kind}</span>
        <h3>{project.name}</h3>
      </div>

      <div className="project-row-content">
        <div className="project-row-description">
          <span>{lang === "it" ? "Cosa abbiamo costruito" : "What we built"}</span>
          <p>{project.description}</p>
        </div>

        <div className="project-row-tags">
          {project.meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <ArrowUpRight className="project-row-arrow" size={22} strokeWidth={1.25} />
    </motion.a>
  );
}

function LabRow({
  project,
  href,
  lang,
}: {
  project: Project;
  href: string;
  lang: Lang;
}) {
  return (
    <motion.a
      className="lab-row lab-register-row"
      href={href}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="lab-index">{project.index}</div>

      <div className="lab-identity">
        <span className="lab-kind">{project.kind}</span>
        <h3>{project.name}</h3>
      </div>

      <div className="lab-content">
        <div className="lab-question">
          <span>{lang === "it" ? "Cosa stiamo testando" : "What we are testing"}</span>
          <strong>{project.question}</strong>
        </div>

        <div className="lab-evidence">
        <div className="lab-state">
          <span>{lang === "it" ? "Stato del repo" : "Repository state"}</span>
          <p>{project.state}</p>
        </div>
        <div className="lab-focus">
          <span>{lang === "it" ? "Focus corrente" : "Current focus"}</span>
          <p>{project.focus}</p>
        </div>
        </div>
      </div>

      <ArrowUpRight className="lab-arrow" size={22} strokeWidth={1.25} />
    </motion.a>
  );
}

function PersonProfile({
  name,
  role,
  text,
  variant,
  photoSrc,
}: {
  name: string;
  role: string;
  text: string;
  variant: "a" | "b";
  photoSrc: string;
}) {
  return (
    <motion.article
      className="person person-editorial"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`person-photo person-photo--${variant} has-photo`}>
        <img
          src={photoSrc}
          alt={name}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="person-index">{variant === "a" ? "01" : "02"}</div>
      <div className="person-editorial-copy">
        <p className="role">{role}</p>
        <h3>{name}</h3>
        <p className="person-description">{text}</p>
      </div>
    </motion.article>
  );
}

const FINAL_SITE_BACKGROUND: BackgroundName = "threads";
const FINAL_SITE_PALETTE: GalaxyPalette = "mist";
const FINAL_SITE_TUNING: BackgroundTuning = {
  intensity: 1,
  speed: 0.5,
  depth: 1,
  pointer: true,
};
const VISUAL_STORAGE_KEY = "empv-visual-preferences";

type StoredVisualPreferences = {
  background?: BackgroundName;
  palette?: GalaxyPalette;
  tuning?: Partial<BackgroundTuning>;
};

const GALAXY_PALETTE_NAMES = [
  "mist",
  "zinc",
  "mauve",
  "olive",
  "taupe",
  "amber",
  "blue",
  "indigo",
] as const;

function readStoredVisualPreferences(): StoredVisualPreferences {
  try {
    const raw = window.localStorage.getItem(VISUAL_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredVisualPreferences;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function isBackgroundName(value: unknown): value is BackgroundName {
  return typeof value === "string" && BACKGROUND_OPTIONS.some((item) => item.id === value);
}

function isGalaxyPalette(value: unknown): value is GalaxyPalette {
  return (
    typeof value === "string" &&
    GALAXY_PALETTE_NAMES.includes(value as GalaxyPalette)
  );
}

function readHomepageBackground(): BackgroundName {
  const value = new URLSearchParams(window.location.search).get("bg");
  if (isBackgroundName(value)) return value;

  const stored = readStoredVisualPreferences().background;
  return isBackgroundName(stored) ? stored : FINAL_SITE_BACKGROUND;
}

function readGalaxyPalette(): GalaxyPalette {
  const params = new URLSearchParams(window.location.search);
  const value = params.get("palette");
  const aliases: Record<string, GalaxyPalette> = {
    steel: "mist",
    sage: "olive",
  };

  if (value && value in aliases) return aliases[value];
  if (isGalaxyPalette(value)) return value;

  const stored = readStoredVisualPreferences().palette;
  return isGalaxyPalette(stored) ? stored : FINAL_SITE_PALETTE;
}

function readBackgroundTuning(): BackgroundTuning {
  const stored = readStoredVisualPreferences().tuning;
  const clamp = (value: unknown, fallback: number) =>
    typeof value === "number" && Number.isFinite(value)
      ? Math.max(0, Math.min(1, value))
      : fallback;

  return {
    intensity: clamp(stored?.intensity, FINAL_SITE_TUNING.intensity),
    speed: clamp(stored?.speed, FINAL_SITE_TUNING.speed),
    depth: clamp(stored?.depth, FINAL_SITE_TUNING.depth),
    pointer:
      typeof stored?.pointer === "boolean"
        ? stored.pointer
        : FINAL_SITE_TUNING.pointer,
  };
}

function persistVisualPreferences(
  background: BackgroundName,
  palette: GalaxyPalette,
  tuning: BackgroundTuning,
) {
  try {
    window.localStorage.setItem(
      VISUAL_STORAGE_KEY,
      JSON.stringify({ background, palette, tuning }),
    );
  } catch {
    // The customizer still works when storage is unavailable.
  }
}

function VisualStudio({
  background,
  onBackgroundChange,
  palette,
  onPaletteChange,
  tuning,
  onTuningChange,
  onReset,
}: {
  background: BackgroundName;
  onBackgroundChange: (background: BackgroundName) => void;
  palette: GalaxyPalette;
  onPaletteChange: (palette: GalaxyPalette) => void;
  tuning: BackgroundTuning;
  onTuningChange: (tuning: BackgroundTuning) => void;
  onReset: () => void;
}) {
  const [open, setOpen] = useState(false);
  const currentBackground =
    BACKGROUND_OPTIONS.find((item) => item.id === background) ?? BACKGROUND_OPTIONS[0];

  const setNumber = (
    key: keyof Omit<BackgroundTuning, "pointer">,
    value: number,
  ) => onTuningChange({ ...tuning, [key]: value });

  return (
    <>
      <button
        className={`visual-studio-toggle ${open ? "is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-controls="visual-studio-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="visual-studio-toggle-dot" aria-hidden="true" />
        {open ? "Close" : "Customize"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            id="visual-studio-panel"
            className="visual-studio-panel"
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="visual-studio-head">
              <div>
                <span>Shape this site</span>
                <strong>Customize</strong>
                <p>Change the graphic, color and movement. The system adapts to your choices.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close customizer">
                ×
              </button>
            </div>

            <section className="visual-studio-section">
              <div className="visual-studio-label">
                <span>01</span>
                <strong>Graphic</strong>
              </div>
              <div className="visual-background-list">
                {BACKGROUND_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={item.id === background ? "is-active" : ""}
                    onClick={() => onBackgroundChange(item.id)}
                    aria-pressed={item.id === background}
                  >
                    <span>{item.label}</span>
                    <small>{item.source}</small>
                  </button>
                ))}
              </div>
            </section>

            <section className="visual-studio-section">
              <div className="visual-studio-label">
                <span>02</span>
                <strong>Palette</strong>
              </div>
              <div className="visual-palette-grid">
                {(Object.keys(GALAXY_PALETTES) as GalaxyPalette[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={item === palette ? "is-active" : ""}
                    onClick={() => onPaletteChange(item)}
                    aria-pressed={item === palette}
                  >
                    <i className={`palette-dot palette-dot-${item}`} aria-hidden="true" />
                    <span>{GALAXY_PALETTES[item].label}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="visual-studio-section">
              <div className="visual-studio-label">
                <span>03</span>
                <strong>Motion</strong>
              </div>
              <div className="visual-motion-controls">
                {([
                  ["intensity", "Presence"],
                  ["speed", "Motion"],
                  ["depth", "Depth"],
                ] as const).map(([key, label]) => (
                  <label key={key}>
                    <span>
                      {label}
                      <b>{Math.round(tuning[key] * 100)}</b>
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round(tuning[key] * 100)}
                      onChange={(event) => setNumber(key, Number(event.target.value) / 100)}
                    />
                  </label>
                ))}

                <button
                  className={`visual-pointer-toggle ${tuning.pointer ? "is-active" : ""}`}
                  type="button"
                  onClick={() => onTuningChange({ ...tuning, pointer: !tuning.pointer })}
                >
                  <span>Follow cursor</span>
                  <strong>{tuning.pointer ? "ON" : "OFF"}</strong>
                </button>

                <button
                  className="visual-reset"
                  type="button"
                  onClick={onReset}
                >
                  Reset to EMPV
                </button>
              </div>
            </section>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function PortfolioApp({
  activeBackground,
  onBackgroundChange,
  backgroundTuning,
  onBackgroundTuningChange,
  galaxyPalette,
  onGalaxyPaletteChange,
  onResetVisuals,
  initialLang,
}: {
  activeBackground: BackgroundName;
  onBackgroundChange: (background: BackgroundName) => void;
  backgroundTuning: BackgroundTuning;
  onBackgroundTuningChange: (tuning: BackgroundTuning) => void;
  galaxyPalette: GalaxyPalette;
  onGalaxyPaletteChange: (palette: GalaxyPalette) => void;
  onResetVisuals: () => void;
  initialLang: SiteLang;
}) {
  const [lang] = useState<Lang>(initialLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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

  useEffect(() => {
    const sections = ["people", "work", "labs", "faq"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.08, 0.2] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleLang = () => {
    const next = lang === "it" ? "en" : "it";
    window.location.href = siteHref({ kind: "home", lang: next });
  };

  return (
    <div className="site-shell">
      <header className="topbar topbar-home">
        <a className="wordmark wordmark-pill" href="#top" aria-label="EMPV home">
          EMPV
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a className={activeSection === "people" ? "is-active" : ""} href="#people">
            <span>{c.nav.people}</span>
          </a>
          <a className={activeSection === "work" ? "is-active" : ""} href="#work">
            <span>{c.nav.work}</span>
          </a>
          <a className={activeSection === "labs" ? "is-active" : ""} href="#labs">
            <span>{c.nav.labs}</span>
          </a>
          <a className={activeSection === "faq" ? "is-active" : ""} href="#faq">
            <span>{c.nav.faq}</span>
          </a>
          <a href={siteHref({ kind: "notesIndex", lang })}>
            <span>{c.nav.notes}</span>
          </a>
        </nav>

        <div className="topbar-actions">
          <button className="lang-switch desktop-lang" type="button" onClick={toggleLang}>
            <Languages size={15} strokeWidth={1.6} />
            {c.language}
          </button>
          <button
            className={`mobile-menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav-panel"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              ["00", "people", c.nav.people],
              ["01", "work", c.nav.work],
              ["02", "labs", c.nav.labs],
              ["03", "faq", c.nav.faq],
            ].map(([index, id, label]) => (
              <a
                key={id}
                className={activeSection === id ? "is-active" : ""}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mobile-nav-index">{index}</span>
                <strong>{label}</strong>
                <ArrowUpRight size={20} strokeWidth={1.35} />
              </a>
            ))}
            <a
              href={siteHref({ kind: "notesIndex", lang })}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-nav-index">04</span>
              <strong>{c.nav.notes}</strong>
              <ArrowUpRight size={20} strokeWidth={1.35} />
            </a>
            <button
              className="mobile-nav-language"
              type="button"
              onClick={() => {
                toggleLang();
                setMenuOpen(false);
              }}
            >
              <Languages size={17} strokeWidth={1.5} />
              <span>{lang === "it" ? "English" : "Italiano"}</span>
              <span>{c.language}</span>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      <VisualStudio
        background={activeBackground}
        onBackgroundChange={onBackgroundChange}
        palette={galaxyPalette}
        onPaletteChange={onGalaxyPaletteChange}
        tuning={backgroundTuning}
        onTuningChange={onBackgroundTuningChange}
        onReset={onResetVisuals}
      />

      <main>
        <section className="hero" id="top">
          {activeBackground !== "none" && (
            <BackgroundEffect
              name={activeBackground}
              tuning={backgroundTuning}
              className="hero-background-effect"
              galaxyPalette={galaxyPalette}
            />
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

        </section>

        <section className="people section-pad" id="people">
          <div className="section-head people-head">
            <div>
              <div className="eyebrow">{c.peopleLabel}</div>
              <h2>{c.peopleTitle}</h2>
            </div>
          </div>

          <div className="people-grid">
            <PersonProfile
              name="Enrico Peruffo"
              role={c.enricoRole}
              text={c.enricoText}
              variant="a"
              photoSrc={siteAssetHref("team/enrico-peruffo.webp")}
            />
            <PersonProfile
              name="Michele Valleri"
              role={c.micheleRole}
              text={c.micheleText}
              variant="b"
              photoSrc={siteAssetHref("team/michele-valleri.webp")}
            />
          </div>
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
              <ProjectRow
                key={project.name}
                project={project}
                lang={lang}
                href={siteHref({ kind: "detail", lang, detailKind: "project", slug: project.slug })}
              />
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
              <LabRow
                key={project.name}
                project={project}
                lang={lang}
                href={siteHref({ kind: "detail", lang, detailKind: "lab", slug: project.slug })}
              />
            ))}
          </div>
          <p className="labs-note">{c.labsNote}</p>
        </section>

        <section className="faq section-pad" id="faq">
          <div className="faq-layout">
            <div className="faq-intro">
              <div className="eyebrow">{c.faqLabel}</div>
              <h2>{c.faqTitle}</h2>
              <p>{c.faqIntro}</p>
            </div>

            <div className="faq-list">
              {faqs[lang].map((item, index) => (
                <details className="faq-item" key={item.question}>
                  <summary>
                    <span className="faq-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="faq-question">{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}

function App() {
  const normalizedPath = window.location.pathname.replace(/\/$/, "");
  const backgroundLabEnabled = import.meta.env.VITE_ENABLE_BACKGROUND_LAB === "true";
  const isBackgroundLab =
    backgroundLabEnabled && normalizedPath.endsWith("/background-lab");
  const route = parseCurrentRoute();
  const initialLang: SiteLang = route.lang;
  const [activeBackground, setActiveBackground] =
    useState<BackgroundName>(readHomepageBackground);
  const [backgroundTuning, setBackgroundTuning] =
    useState<BackgroundTuning>(readBackgroundTuning);
  const [galaxyPalette, setGalaxyPalette] =
    useState<GalaxyPalette>(readGalaxyPalette);
  const visualTheme = activeBackground === "none" ? "default" : "galaxy";

  function updateBackground(next: BackgroundName) {
    setActiveBackground(next);
    persistVisualPreferences(next, galaxyPalette, backgroundTuning);

    const url = new URL(window.location.href);
    if (next === "none") url.searchParams.delete("bg");
    else url.searchParams.set("bg", next);
    url.searchParams.set("palette", galaxyPalette);
    window.history.replaceState({}, "", url);
  }

  function updateGalaxyPalette(next: GalaxyPalette) {
    setGalaxyPalette(next);
    persistVisualPreferences(activeBackground, next, backgroundTuning);

    const url = new URL(window.location.href);
    if (activeBackground === "none") url.searchParams.delete("bg");
    else url.searchParams.set("bg", activeBackground);
    url.searchParams.set("palette", next);
    window.history.replaceState({}, "", url);
  }

  function updateBackgroundTuning(next: BackgroundTuning) {
    setBackgroundTuning(next);
    persistVisualPreferences(activeBackground, galaxyPalette, next);
  }

  function resetVisuals() {
    setActiveBackground(FINAL_SITE_BACKGROUND);
    setGalaxyPalette(FINAL_SITE_PALETTE);
    setBackgroundTuning(FINAL_SITE_TUNING);
    persistVisualPreferences(
      FINAL_SITE_BACKGROUND,
      FINAL_SITE_PALETTE,
      FINAL_SITE_TUNING,
    );

    const url = new URL(window.location.href);
    url.searchParams.delete("bg");
    url.searchParams.delete("palette");
    window.history.replaceState({}, "", url);
  }

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.visualTheme = visualTheme;
    root.dataset.galaxyPalette = galaxyPalette;

    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
      root.style.setProperty("--glow-opacity", "1");
    };

    const onPointerLeave = () => {
      root.style.setProperty("--glow-opacity", "0");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      root.style.setProperty("--glow-opacity", "0");
    };
  }, [visualTheme, galaxyPalette]);

  let page;
  if (isBackgroundLab) {
    page = <BackgroundLab />;
  } else if (route.kind === "businessCard") {
    page = <BusinessCard person={route.person} />;
  } else if (route.kind === "legal") {
    page = <LegalPage slug={route.slug} initialLang={initialLang} />;
  } else if (route.kind === "detail") {
    page = <ProjectDetail slug={route.slug} initialLang={initialLang} />;
  } else if (route.kind === "notesIndex") {
    page = <ResearchNotes initialLang={initialLang} />;
  } else if (route.kind === "note") {
    page = <ResearchNotes initialLang={initialLang} noteId={route.noteId} />;
  } else {
    page = (
      <PortfolioApp
        activeBackground={activeBackground}
        onBackgroundChange={updateBackground}
        backgroundTuning={backgroundTuning}
        onBackgroundTuningChange={updateBackgroundTuning}
        galaxyPalette={galaxyPalette}
        onGalaxyPaletteChange={updateGalaxyPalette}
        onResetVisuals={resetVisuals}
        initialLang={initialLang}
      />
    );
  }

  return (
    <>
      {!isBackgroundLab && <SeoHead route={route as SiteRoute} />}
      <div className="global-pointer-glow" aria-hidden="true" />
      {page}
    </>
  );
}

export default App;
