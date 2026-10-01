import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Check, Copy, Languages, Share2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import SiteFooter from "./SiteFooter";
import { getResearchNoteById, researchNotes } from "./researchNotesContent";
import { siteHref } from "./seo";
import type { SiteLang } from "./detailContent";

type ResearchNotesProps = {
  initialLang: SiteLang;
  noteId?: string;
};


function renderInlineLinks(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    nodes.push(
      <a key={"link-" + key++} href={match[2]} target="_blank" rel="noreferrer noopener">
        {match[1]}
      </a>,
    );
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

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


function ResearchNoteShare({
  lang,
  title,
  url,
  version,
}: {
  lang: SiteLang;
  title: string;
  url: string;
  version: string;
}) {
  const [copied, setCopied] = useState(false);

  const absoluteUrl = typeof window !== "undefined"
    ? new URL(url, window.location.origin).toString()
    : url;
  const sharedUrl = (() => {
    try {
      const next = new URL(absoluteUrl);
      next.searchParams.set("share", version);
      return next.toString();
    } catch {
      return absoluteUrl + (absoluteUrl.includes("?") ? "&" : "?") + "share=" + encodeURIComponent(version);
    }
  })();

  const shareText = lang === "it"
    ? title + " — EMPV Research Notes"
    : title + " — EMPV Research Notes";

  const linkedinHref =
    "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(sharedUrl);
  const xHref =
    "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) +
    "&url=" + encodeURIComponent(sharedUrl);
  const whatsappHref =
    "https://wa.me/?text=" + encodeURIComponent(shareText + " " + sharedUrl);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(sharedUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt(
        lang === "it" ? "Copia questo link" : "Copy this link",
        sharedUrl,
      );
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: sharedUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    await copyLink();
  };

  return (
    <section className="research-note-share section-pad" aria-label={lang === "it" ? "Condividi questa Research Note" : "Share this Research Note"}>
      <div className="section-code">EMPV / {lang === "it" ? "CONDIVIDI" : "SHARE"}</div>
      <div className="research-note-share-inner">
        <p>
          {lang === "it"
            ? "Condividi questa Research Note."
            : "Share this Research Note."}
        </p>
        <div className="research-note-share-actions">
          <button type="button" className="research-note-share-primary" onClick={share}>
            <Share2 size={16} strokeWidth={1.5} />
            <span>{lang === "it" ? "Condividi" : "Share"}</span>
          </button>
          <a href={linkedinHref} target="_blank" rel="noreferrer noopener">LinkedIn</a>
          <a href={xHref} target="_blank" rel="noreferrer noopener">X</a>
          <a href={whatsappHref} target="_blank" rel="noreferrer noopener">WhatsApp</a>
          <button type="button" onClick={copyLink} aria-live="polite">
            {copied ? <Check size={16} strokeWidth={1.5} /> : <Copy size={16} strokeWidth={1.5} />}
            <span>{copied ? (lang === "it" ? "Copiato" : "Copied") : (lang === "it" ? "Copia link" : "Copy link")}</span>
          </button>
        </div>
      </div>
    </section>
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
                    <p key={paragraph}>{renderInlineLinks(paragraph)}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{renderInlineLinks(item)}</li>
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

        <ResearchNoteShare
          lang={lang}
          title={note.title[lang]}
          url={siteHref({ kind: "note", lang, noteId: note.id })}
          version={(note.updated || note.published).replaceAll("-", "")}
        />

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
