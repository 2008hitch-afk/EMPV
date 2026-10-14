import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Languages } from "lucide-react";
import { motion } from "motion/react";
import type { SiteLang } from "./detailContent";
import { processPageContent } from "./processPageContent";
import { siteHref } from "./seo";
import SiteFooter from "./SiteFooter";

export default function ProcessPage({ lang }: { lang: SiteLang }) {
  const copy = processPageContent[lang];
  const homeHref = siteHref({ kind: "home", lang });
  const notesHref = siteHref({ kind: "notesIndex", lang });
  const alternateLang = lang === "it" ? "en" : "it";
  const emailSubject = lang === "it" ? "EMPV — Parliamo di un processo aziendale" : "EMPV — Let's discuss a business workflow";
  const emailHref = "mailto:hello@empv.it?subject=" + encodeURIComponent(emailSubject);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [lang]);

  return (
    <div className="detail-shell process-page">
      <header className="topbar detail-topbar">
        <a className="wordmark" href={homeHref} aria-label="EMPV home">EMPV</a>
        <a className="detail-nav-back" href={notesHref}><ArrowLeft size={15} strokeWidth={1.5} /> Research Notes</a>
        <a className="lang-switch" href={siteHref({ kind: "processPage", lang: alternateLang })} hrefLang={alternateLang} aria-label={lang === "it" ? "View in English" : "Leggi in italiano"}>
          <Languages size={15} strokeWidth={1.6} /> {alternateLang.toUpperCase()}
        </a>
      </header>

      <main>
        <section className="detail-hero process-hero">
          <motion.div className="detail-hero-inner"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <div className="detail-kicker-row">
              <span className="eyebrow">EMPV / {lang === "it" ? "Processi aziendali" : "Business workflows"}</span>
              <span className="detail-index">EMPV / BERGAMO</span>
            </div>
            <div className="detail-title-wrap detail-title-project">
              <p className="detail-kicker">{copy.kicker}</p>
              <h1>{copy.title}</h1>
            </div>
            <div className="detail-hero-bottom">
              <p className="detail-lead">{copy.lead}</p>
              <div className="detail-status"><span>{copy.principleLabel}</span><strong>{copy.principle}</strong></div>
            </div>
            <div className="tags detail-tags">{copy.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </motion.div>
        </section>

        <section className="detail-blocks section-pad research-note-blocks">
          {copy.sections.map((section, index) => (
            <motion.article key={section.label} className="detail-block research-note-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.45, delay: index * 0.025 }}>
              <div className="eyebrow">{section.label}</div>
              <div className="detail-block-main">
                <h2>{section.title}</h2>
                <div className="research-note-copy">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
                {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
              </div>
            </motion.article>
          ))}
        </section>

        <section className="process-related section-pad" aria-labelledby="process-related-title">
          <div className="section-code">EMPV / {copy.relatedLabel}</div>
          <h2 id="process-related-title">{copy.relatedTitle}</h2>
          <p className="process-related-intro">{copy.relatedIntro}</p>
          <div className="process-related-list">
            {copy.resources.map(resource => {
              const href = resource.kind === "note"
                ? siteHref({ kind: "note", lang, noteId: resource.id })
                : siteHref({ kind: "detail", lang, detailKind: "project", slug: resource.id });
              return (
                <a key={resource.id} className="process-related-item" href={href}>
                  <span><strong>{resource.title}</strong><small>{resource.description}</small></span>
                  <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </section>

        <section className="process-contact section-pad" aria-labelledby="process-contact-title">
          <div className="section-code">EMPV / {copy.contactLabel}</div>
          <div className="process-contact-main">
            <h2 id="process-contact-title">{copy.contactTitle}</h2>
            <p>{copy.contactBody}</p>
            <div className="process-contact-actions">
              <a href={emailHref} data-contact-placement="process_page">{copy.emailLabel}<ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></a>
              <a href="https://wa.me/393792438705" data-contact-placement="process_page">{copy.whatsappLabel}<ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="detail-end section-pad">
          <a href={notesHref}><ArrowLeft size={20} strokeWidth={1.4} /><span>{copy.backLabel}</span></a>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
