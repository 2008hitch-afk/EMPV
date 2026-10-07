import { ArrowLeft, ArrowUpRight, Languages } from "lucide-react";
import { motion } from "motion/react";
import SiteFooter from "./SiteFooter";
import { labs, selected, type Lang, type Project } from "./homeContent";
import { siteHref, type SectionKind } from "./seo";
import type { SiteLang } from "./detailContent";

type SectionIndexProps = {
  section: SectionKind;
  initialLang: SiteLang;
};

function ProjectIndexRow({ project, href, lang }: { project: Project; href: string; lang: Lang }) {
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
          {project.meta.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
      <ArrowUpRight className="project-row-arrow" size={22} strokeWidth={1.25} />
    </motion.a>
  );
}

function LabIndexRow({ project, href, lang }: { project: Project; href: string; lang: Lang }) {
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

export default function SectionIndex({ section, initialLang }: SectionIndexProps) {
  const lang = initialLang as Lang;
  const isProjects = section === "projects";
  const alternateLang: SiteLang = lang === "it" ? "en" : "it";
  const title = isProjects
    ? (lang === "it" ? "Progetti costruiti sui processi reali." : "Projects built around real operating processes.")
    : (lang === "it" ? "AI Lab: ipotesi trasformate in sistemi verificabili." : "AI Lab: turning hypotheses into verifiable systems.");
  const intro = isProjects
    ? (lang === "it"
      ? "Una raccolta dei sistemi realizzati da EMPV partendo da flussi di lavoro, strumenti, ruoli e vincoli già presenti nelle organizzazioni."
      : "A collection of systems built by EMPV around existing workflows, tools, roles and operating constraints.")
    : (lang === "it"
      ? "Linee di ricerca e prototipi sviluppati per capire quali idee AI reggono tecnicamente, operativamente e come prodotto."
      : "Research directions and prototypes used to test which AI ideas hold up technically, operationally and as products.");
  const items = isProjects ? selected[lang] : labs[lang];

  return (
    <div className="detail-shell section-index-shell">
      <header className="topbar detail-topbar">
        <a className="wordmark" href={siteHref({ kind: "home", lang })} aria-label="EMPV home">EMPV</a>
        <a className="detail-nav-back" href={siteHref({ kind: "home", lang })}>
          <ArrowLeft size={15} strokeWidth={1.5} />
          {lang === "it" ? "Torna alla home" : "Back home"}
        </a>
        <a
          className="lang-switch"
          href={siteHref({ kind: "sectionIndex", lang: alternateLang, section })}
          hrefLang={alternateLang}
        >
          <Languages size={15} strokeWidth={1.6} />
          {alternateLang.toUpperCase()}
        </a>
      </header>

      <main>
        <section className="notes-index-hero">
          <motion.div
            className="notes-index-hero-inner"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow">EMPV / {isProjects ? (lang === "it" ? "PROGETTI" : "PROJECTS") : "AI LAB"}</div>
            <h1>{title}</h1>
            <p>{intro}</p>
          </motion.div>
        </section>

        <section className={isProjects ? "work section-pad" : "labs section-pad"}>
          <div className={isProjects ? "project-list" : "lab-list"}>
            {items.map((item) =>
              isProjects ? (
                <ProjectIndexRow
                  key={item.slug}
                  project={item}
                  lang={lang}
                  href={siteHref({ kind: "detail", lang, detailKind: "project", slug: item.slug })}
                />
              ) : (
                <LabIndexRow
                  key={item.slug}
                  project={item}
                  lang={lang}
                  href={siteHref({ kind: "detail", lang, detailKind: "lab", slug: item.slug })}
                />
              ),
            )}
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
