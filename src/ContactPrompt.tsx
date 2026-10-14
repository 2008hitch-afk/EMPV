import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import type { SiteLang } from "./detailContent";

/**
 * A minimal B2B contact path, intentionally not a form.
 * GA4 only records clicks when analytics consent was granted.
 */
export default function ContactPrompt({
  lang,
  placement,
}: {
  lang: SiteLang;
  placement: "home_projects" | "projects_index" | "project_detail";
}) {
  const isIt = lang === "it";
  const emailSubject = isIt
    ? "EMPV — Parliamo di un processo aziendale"
    : "EMPV — Let's discuss a business process";

  return (
    <section className="contact-prompt section-pad" aria-labelledby="contact-prompt-heading">
      <div className="contact-prompt-main">
        <div>
          <div className="eyebrow">EMPV / {isIt ? "PARLIAMONE" : "LET'S TALK"}</div>
          <h2 id="contact-prompt-heading">
            {isIt ? "Da quale processo partiamo?" : "Which process should we start with?"}
          </h2>
        </div>
        <p>
          {isIt
            ? "Raccontaci come lavorate oggi e cosa vorreste migliorare. Valutiamo insieme se e come intervenire."
            : "Tell us how your team works today and what you would like to improve. We'll assess together whether and how we can help."}
        </p>
      </div>
      <div className="contact-prompt-actions">
        <a
          className="contact-action contact-action-primary"
          href={`mailto:hello@empv.it?subject=${encodeURIComponent(emailSubject)}`}
          data-contact-placement={placement}
        >
          <Mail size={17} strokeWidth={1.4} aria-hidden="true" />
          <span>{isIt ? "Raccontaci il processo" : "Tell us about the process"}</span>
          <ArrowUpRight size={17} strokeWidth={1.4} aria-hidden="true" />
        </a>
        <a
          className="contact-action contact-action-secondary"
          href="https://wa.me/393792438705"
          target="_blank"
          rel="noreferrer"
          data-contact-placement={placement}
        >
          <MessageCircle size={17} strokeWidth={1.4} aria-hidden="true" />
          <span>{isIt ? "Scrivici su WhatsApp" : "Message us on WhatsApp"}</span>
          <ArrowUpRight size={17} strokeWidth={1.4} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
