import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Languages } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import SiteFooter from "./SiteFooter";
import { getResearchNoteById, researchNotes } from "./researchNotesContent";
import { siteHref } from "./seo";
import type { SiteLang } from "./detailContent";

type ResearchNotesProps = {
  initialLang: SiteLang;
  noteId?: string;
};

function formatDate(value: string, lang: SiteLang) {
  return new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value + "T12:00:00Z"));
}

function NotesTopbar({
  lang,
  noteId,
}: {
  lang: SiteLang;
  noteId?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const homeHref = siteHref({ kind: "home", lang });
  const notesHref = siteHref({ kind: "notesIndex", lang });

  const toggleLang = () => {
    const next = lang === "it" ? "en" : "it";
    window.location.href = noteId
      ? siteHref({ kind: "note", lang: next, noteId })
      : siteHref({ kind: "notesIndex", lang: next });
  };

  const navItems = [
    ["00", "people", lang === "it" ? "Chi siamo" : "Who we are"],
    ["01", "work", lang === "it" ? "Progetti" : "Projects"],
    ["02", "labs", "AI Lab"],
    ["03", "faq", "FAQ"],
  ] as const;

  return (
    <>
      <header className="topbar topbar-home notes-topbar">
        <a className="wordmark wordmark-pill" href={homeHref} aria-label="EMPV home">
          EMPV
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([, id, label]) => (
            <a key={id} href={`${homeHref}#${id}`}>
              <span>{label}</span>
            </a>
          ))}
          <a className="is-active" href={notesHref}>
            <span>Research Notes</span>
          </a>
        </nav>

        <div className="topbar-actions">
          <button className="lang-switch desktop-lang" type="button" onClick={toggleLang}>
            <Languages size={15} strokeWidth={1.6} />
            {lang === "it" ? "EN" : "IT"}
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
            className="mobile-nav-panel notes-mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {navItems.map(([index, id, label]) => (
              <a
                key={id}
                href={`${homeHref}#${id}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mobile-nav-index">{index}</span>
                <strong>{label}</strong>
                <ArrowUpRight size={20} strokeWidth={1.35} />
              </a>
            ))}
            <a className="is-active" href={notesHref} onClick={() => setMenuOpen(false)}>
              <span className="mobile-nav-index">04</span>
              <strong>Research Notes</strong>
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
              <span>{lang === "it" ? "EN" : "IT"}</span>
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function ResearchNotesIndex({ lang }: { lang: SiteLang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [lang]);

  return (
    <div className="detail-shell notes-shell">
      <NotesTopbar lang={lang} />

      <main>
        <section className="notes-index-hero">
          <motion.div
            className="notes-index-hero-inner"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow">EMPV / RESEARCH NOTES</div>
            <h1>
              {lang === "it"
                ? "Note su sistemi, AI e operazioni."
                : "Notes on systems, AI and operations."}
            </h1>
            <p>
              {lang === "it"
                ? "Appunti tecnici e operativi su ciò che costruiamo, testiamo e impariamo: architetture, automazioni, AI locale, integrazioni e decisioni di prodotto."
                : "Technical and operational notes on what we build, test and learn: architectures, automation, local AI, integrations and product decisions."}
            </p>
          </motion.div>
        </section>

        <section className="notes-index-list section-pad" aria-label="Research Notes">
          <div className="research-note-list">
            {researchNotes.map((note, index) => (
              <motion.a
                key={note.id}
                className="research-note-row"
                href={siteHref({ kind: "note", lang, noteId: note.id })}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="research-note-index">NOTE / {note.index}</span>

                <div className="research-note-main">
                  <span className="research-note-category">{note.category[lang]}</span>
                  <h2>{note.title[lang]}</h2>
                  <p>{note.dek[lang]}</p>
                  <div className="research-note-meta">
                    <span>{formatDate(note.published, lang)}</span>
                    <span>{note.readingTime[lang]}</span>
                    {note.tags[lang].slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <ArrowUpRight className="research-note-arrow" size={22} strokeWidth={1.25} />
              </motion.a>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}

function ResearchNoteArticle({ lang, noteId }: { lang: SiteLang; noteId: string }) {
  const note = getResearchNoteById(noteId);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [lang, noteId]);

  if (!note) {
    return (
      <div className="detail-shell">
        <NotesTopbar lang={lang} />
        <main className="detail-not-found">
          <div className="eyebrow">EMPV / RESEARCH NOTES / 404</div>
          <h1>{lang === "it" ? "Nota non trovata." : "Note not found."}</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="detail-shell notes-shell">
      <NotesTopbar lang={lang} noteId={noteId} />

      <main>
        <section className="detail-hero research-note-hero">
          <div className="detail-hero-index" aria-hidden="true">
            {note.index}
          </div>

          <motion.div
            className="detail-hero-inner"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="detail-kicker-row">
              <span className="eyebrow">EMPV / RESEARCH NOTES</span>
              <span className="detail-index">NOTE / {note.index}</span>
            </div>

            <div className="detail-title-wrap detail-title-project research-note-title">
              <p className="detail-kicker">{note.category[lang]}</p>
              <h1>{note.title[lang]}</h1>
            </div>

            <div className="detail-hero-bottom">
              <p className="detail-lead">{note.dek[lang]}</p>

              <div className="detail-status">
                <span>{lang === "it" ? "Pubblicata" : "Published"}</span>
                <strong>
                  {formatDate(note.published, lang)} · {note.readingTime[lang]}
                </strong>
              </div>
            </div>

            <div className="tags detail-tags">
              {note.tags[lang].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="detail-blocks section-pad research-note-blocks">
          {note.sections[lang].map((section, index) => (
            <motion.article
              className="detail-block research-note-block"
              key={section.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.65, delay: index * 0.04 }}
            >
              <div className="eyebrow">{section.label}</div>
              <div className="detail-block-main">
                <h2>{section.title}</h2>
                <div className="research-note-copy">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </section>

        <section className="detail-boundary section-pad research-note-takeaway">
          <div className="section-code">EMPV / TAKEAWAY</div>
          <p>{note.takeaway[lang]}</p>
        </section>

        <section className="detail-end section-pad">
          <a href={siteHref({ kind: "notesIndex", lang })}>
            <ArrowLeft size={20} strokeWidth={1.4} />
            <span>Research Notes</span>
          </a>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}

export default function ResearchNotes({ initialLang, noteId }: ResearchNotesProps) {
  return noteId
    ? <ResearchNoteArticle lang={initialLang} noteId={noteId} />
    : <ResearchNotesIndex lang={initialLang} />;
}
