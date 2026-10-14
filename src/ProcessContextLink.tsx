import type { SiteLang } from "./detailContent";
import { siteHref } from "./seo";

export default function ProcessContextLink({ lang, source }: { lang: SiteLang; source: "note" | "project" }) {
  const label = lang === "it" ? "Un passo in più" : "A broader view";
  const lead = source === "project"
    ? (lang === "it"
      ? "La continuità tra sopralluogo, ufficio e produzione è un esempio di un problema più ampio."
      : "Continuity between fieldwork, office and workshop is one example of a broader workflow problem.")
    : (lang === "it"
      ? "Quando questo passaggio coinvolge più strumenti e persone, il singolo automatismo non basta sempre."
      : "When this step involves multiple tools and people, a single automation is not always enough.");
  const anchor = lang === "it" ? "Come affrontiamo l'automazione dei processi aziendali" : "How we approach business process automation";
  return (
    <aside className="process-context-link section-pad" aria-label={label}>
      <span className="section-code">EMPV / {label}</span>
      <p>{lead} <a href={siteHref({ kind: "processPage", lang })}>{anchor} →</a></p>
    </aside>
  );
}
