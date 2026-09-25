import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Languages } from "lucide-react";
import { motion } from "motion/react";
import { getDetail, type SiteLang } from "./detailContent";

type DetailPageProps = {
  slug: string;
  initialLang?: SiteLang;
};

function updateLangInUrl(lang: SiteLang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);
}

export default function ProjectDetail({ slug, initialLang = "it" }: DetailPageProps) {
  const [lang, setLang] = useState<SiteLang>(initialLang);

  const detail = useMemo(() => getDetail(lang, slug), [lang, slug]);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [lang, slug]);

  if (!detail) {
    return (
      <div className="detail-shell">
        <header className="topbar detail-topbar">
          <a className="wordmark" href="./" aria-label="EMPV home">
            EMPV<span className="wordmark-dot">•</span>
          </a>
        </header>
        <main className="detail-not-found">
          <div className="eyebrow">EMPV / 404</div>
          <h1>{lang === "it" ? "Progetto non trovato." : "Project not found."}</h1>
          <a className="detail-back-link" href="./">
            <ArrowLeft size={18} strokeWidth={1.4} />
            {lang === "it" ? "Torna alla home" : "Back home"}
          </a>
        </main>
      </div>
    );
  }

  const backLabel =
    detail.type === "project"
      ? lang === "it"
        ? "Torna ai progetti"
        : "Back to projects"
      : lang === "it"
        ? "Torna a In sviluppo"
        : "Back to In development";

  const backHref = detail.type === "project" ? "./#work" : "./#labs";

  function toggleLang() {
    setLang((current) => {
      const next = current === "it" ? "en" : "it";
      updateLangInUrl(next);
      return next;
    });
  }

  return (
    <div className="detail-shell">
      <header className="topbar detail-topbar">
        <a className="wordmark" href="./" aria-label="EMPV home">
          EMPV<span className="wordmark-dot">•</span>
        </a>

        <a className="detail-nav-back" href={backHref}>
          <ArrowLeft size={15} strokeWidth={1.5} />
          {backLabel}
        </a>

        <button className="lang-switch" type="button" onClick={toggleLang}>
          <Languages size={15} strokeWidth={1.6} />
          {lang === "it" ? "EN" : "IT"}
        </button>
      </header>

      <main>
        <section className="detail-hero">
          <div className="detail-grid-bg" aria-hidden="true" />
          <div className="detail-hero-index" aria-hidden="true">
            {detail.index}
          </div>

          <motion.div
            className="detail-hero-inner"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="detail-kicker-row">
              <span className="eyebrow">
                EMPV / {detail.type === "project" ? (lang === "it" ? "Progetto" : "Project") : "R&D"}
              </span>
              <span className="detail-index">{detail.index}</span>
            </div>

            <div className={`detail-title-wrap ${detail.type === "project" ? "detail-title-project" : ""}`}>
              <p className="detail-kicker">{detail.kicker}</p>
              {detail.type === "project" && (
                <p className="detail-project-name">{detail.title}</p>
              )}
              <h1>{detail.type === "project" ? detail.problemTitle ?? detail.title : detail.title}</h1>
            </div>

            <div className="detail-hero-bottom">
              <p className="detail-lead">{detail.lead}</p>

              <div className="detail-status">
                <span>
                  {detail.type === "project"
                    ? lang === "it"
                      ? "Cosa abbiamo cambiato"
                      : "What we changed"
                    : detail.statusLabel}
                </span>
                <strong>
                  {detail.type === "project"
                    ? detail.solutionTitle ?? detail.status
                    : detail.status}
                </strong>
              </div>
            </div>

            <div className="tags detail-tags">
              {detail.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </section>

        {detail.comparison && (
          <section className="detail-comparison section-pad">
            <article>
              <div className="eyebrow">{detail.comparison.leftLabel}</div>
              <h2>{detail.comparison.leftTitle}</h2>
              <p>{detail.comparison.leftBody}</p>
            </article>
            <div className="detail-transition" aria-hidden="true">
              <ArrowUpRight size={30} strokeWidth={1.2} />
            </div>
            <article>
              <div className="eyebrow">{detail.comparison.rightLabel}</div>
              <h2>{detail.comparison.rightTitle}</h2>
              <p>{detail.comparison.rightBody}</p>
            </article>
          </section>
        )}

        <section className="detail-blocks section-pad">
          {detail.blocks.map((block, index) => (
            <motion.article
              className="detail-block"
              key={block.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.65, delay: index * 0.04 }}
            >
              <div className="eyebrow">{block.label}</div>
              <div className="detail-block-main">
                <h2>{block.title}</h2>
                <p>{block.body}</p>
                {block.bullets && (
                  <ul>
                    {block.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </section>

        {detail.boundary && (
          <section className="detail-boundary section-pad">
            <div className="section-code">EMPV / NOTE</div>
            <p>{detail.boundary}</p>
          </section>
        )}

        <section className="detail-end section-pad">
          <a href={backHref}>
            <ArrowLeft size={20} strokeWidth={1.4} />
            <span>{backLabel}</span>
          </a>
        </section>
      </main>

      <footer className="detail-footer">
        <div className="footer-mark">EMPV</div>
        <div className="footer-meta">
          <div>Enrico + Michele</div>
          <div>Systems · Products · AI · Research</div>
          <div>© 2026</div>
        </div>
      </footer>
    </div>
  );
}
