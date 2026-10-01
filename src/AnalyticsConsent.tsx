import { useEffect, useState } from "react";
import type { SiteLang } from "./detailContent";
import { siteHref } from "./seo";
import {
  clearAnalyticsConsentChoice,
  disableAnalytics,
  enableAnalytics,
  readAnalyticsConsent,
  writeAnalyticsConsent,
  type AnalyticsConsent,
} from "./analytics";
import "./cookie-consent.css";

const OPEN_SETTINGS_EVENT = "empv:open-cookie-settings";

function readInitialState(): { choice: AnalyticsConsent | null; open: boolean } {
  const params = new URLSearchParams(window.location.search);
  const forceReset = params.get("consent") === "reset";

  if (forceReset) {
    clearAnalyticsConsentChoice();
    disableAnalytics();

    params.delete("consent");
    const cleanUrl =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "") +
      window.location.hash;
    window.history.replaceState({}, "", cleanUrl);

    return { choice: null, open: true };
  }

  const choice = readAnalyticsConsent();
  return { choice, open: choice === null };
}

export default function AnalyticsConsent({ lang }: { lang: SiteLang }) {
  const initial = readInitialState();
  const [choice, setChoice] = useState<AnalyticsConsent | null>(initial.choice);
  const [open, setOpen] = useState(initial.open);
  const isIt = lang === "it";

  useEffect(() => {
    if (choice === "granted") enableAnalytics();
    else disableAnalytics();
  }, [choice]);

  useEffect(() => {
    const openSettings = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  const choose = (next: AnalyticsConsent) => {
    writeAnalyticsConsent(next);
    setChoice(next);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <aside
      className="empv-cookie-consent"
      role="dialog"
      aria-label={isIt ? "Preferenze analytics" : "Analytics preferences"}
    >
      <div className="empv-cookie-consent-copy">
        <span className="empv-cookie-consent-kicker">EMPV / PRIVACY</span>
        <strong>
          {isIt ? "Analytics solo se li accetti." : "Analytics only if you accept."}
        </strong>
        <p>
          {isIt
            ? "Usiamo Google Analytics 4 per capire come viene usato il sito e quali contenuti vengono consultati. Senza consenso GA4 non viene caricato. Puoi cambiare scelta in qualsiasi momento."
            : "We use Google Analytics 4 to understand how the site is used and which content is viewed. Without consent GA4 is not loaded. You can change your choice at any time."}
        </p>
        <a href={siteHref({ kind: "legal", lang, slug: "cookies" })}>
          Cookie &amp; Storage
        </a>
      </div>

      <div className="empv-cookie-consent-actions">
        <button type="button" onClick={() => choose("denied")}>
          {isIt ? "Rifiuta" : "Reject"}
        </button>
        <button
          className="is-primary"
          type="button"
          onClick={() => choose("granted")}
        >
          {isIt ? "Accetta analytics" : "Accept analytics"}
        </button>
      </div>
    </aside>
  );
}
