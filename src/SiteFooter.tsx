import { Mail, MapPin, MessageCircle } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import type { SiteLang } from "./detailContent";
import { siteHref, type LegalSlug } from "./seo";
import "./legal.css";
import "./footer-glass.css";

/**
 * A translucent floating panel over the site's EXISTING background.
 * No graphic scene, overlay backdrop, or additional background is inserted.
 * Pointer tilt and reflection mirror the approved Team card interaction.
 */
export default function SiteFooter({ lang }: { lang: SiteLang }) {
  const isIt = lang === "it";
  const reduceMotion = useReducedMotion();
  const homeHref = siteHref({ kind: "home", lang });

  const legalLinks: Array<{ slug: LegalSlug; label: string }> = [
    { slug: "privacy", label: "Privacy policy" },
    { slug: "cookies", label: isIt ? "Informativa cookie" : "Cookie policy" },
    { slug: "legal", label: isIt ? "Note legali" : "Legal notice" },
  ];

  function onPanelPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || reduceMotion) return;

    const panel = event.currentTarget;
    const rect = panel.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    // Team style, softened for a larger clickable surface (~1.75deg per axis).
    const angle = 1.75;
    panel.style.setProperty("--glass-rx", `${((.5 - y) * 2 * angle).toFixed(2)}deg`);
    panel.style.setProperty("--glass-ry", `${((x - .5) * 2 * angle).toFixed(2)}deg`);
    panel.style.setProperty("--glass-spot-x", `${(x * 100).toFixed(1)}%`);
    panel.style.setProperty("--glass-spot-y", `${(y * 100).toFixed(1)}%`);
    panel.style.setProperty("--glass-mirror-x", `${(x * 100).toFixed(1)}%`);
    panel.style.setProperty("--glass-mirror-y", `${(y * 100).toFixed(1)}%`);
  }

  function onPanelPointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
    const panel = event.currentTarget;
    panel.style.setProperty("--glass-rx", "0deg");
    panel.style.setProperty("--glass-ry", "0deg");
    panel.style.setProperty("--glass-spot-x", "50%");
    panel.style.setProperty("--glass-spot-y", "54%");
    panel.style.setProperty("--glass-mirror-x", "24%");
    panel.style.setProperty("--glass-mirror-y", "8%");
  }

  return (
    <footer className="empv-glass-footer">
      <div
        className="empv-glass-panel"
        onPointerMove={onPanelPointerMove}
        onPointerLeave={onPanelPointerLeave}
        onPointerCancel={onPanelPointerLeave}
      >
        <div className="empv-glass-content">
          <div className="empv-glass-grid">
            <div className="empv-glass-identity">
              <a className="empv-glass-logo" href={homeHref} aria-label="EMPV — home">EMPV</a>
              <p className="empv-glass-tagline">Systems · Products · AI · Research</p>
              <p className="empv-glass-manifesto">
                {isIt ? "La tua azienda. Prima mappata. Poi evoluta." : "Your company. First mapped. Then evolved."}
              </p>

              <div className="empv-glass-socials" aria-label={isIt ? "Social e contatti EMPV" : "EMPV social and contacts"}>
                <a href="https://www.linkedin.com/company/emp26/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn EMPV" title="LinkedIn"><span className="empv-glass-in" aria-hidden="true">in</span></a>
                <a href="https://x.com/EMPV26" target="_blank" rel="noopener noreferrer" aria-label="X EMPV" title="X"><span className="empv-glass-x" aria-hidden="true">𝕏</span></a>
                <a href="https://wa.me/393792438705" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp EMPV" title="WhatsApp"><MessageCircle size={18} strokeWidth={1.65} aria-hidden="true"/></a>
                <a href="mailto:hello@empv.it" aria-label="Email EMPV" title="Email"><Mail size={18} strokeWidth={1.65} aria-hidden="true"/></a>
              </div>
              <p className="empv-glass-location"><MapPin size={15} strokeWidth={1.6} aria-hidden="true"/>{isIt ? "Bergamo, Italia" : "Bergamo, Italy"}</p>
            </div>

            <nav className="empv-glass-links" aria-label={isIt ? "Esplora EMPV" : "Explore EMPV"}>
              <h2>{isIt ? "Esplora" : "Explore"}</h2>
              <a href={`${homeHref}#people`}>{isIt ? "Chi siamo" : "Team"}</a>
              <a href={siteHref({ kind: "sectionIndex", lang, section: "projects" })}>{isIt ? "Progetti" : "Projects"}</a>
              <a href={siteHref({ kind: "sectionIndex", lang, section: "lab" })}>AI Lab</a>
              <a href={siteHref({ kind: "notesIndex", lang })}>Research Notes</a>
            </nav>

            <nav className="empv-glass-links" aria-label={isIt ? "Informazioni legali" : "Legal information"}>
              <h2>{isIt ? "Legale" : "Legal"}</h2>
              {legalLinks.map(item => (
                <a key={item.slug} href={siteHref({ kind: "legal", lang, slug: item.slug })}>{item.label}</a>
              ))}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("empv:open-cookie-settings"))}
              >
                {isIt ? "Impostazioni cookie" : "Cookie settings"}
              </button>
            </nav>

            <div className="empv-glass-links empv-glass-contact">
              <h2>{isIt ? "Contatti" : "Contact"}</h2>
              <a href="mailto:hello@empv.it">hello@empv.it</a>
              <a href="https://wa.me/393792438705" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="https://www.linkedin.com/company/emp26/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://x.com/EMPV26" target="_blank" rel="noopener noreferrer">X / @EMPV26</a>
            </div>
          </div>

          <div className="empv-glass-bottom">
            <div><span>P.IVA 04942220163</span><span>© 2026 EMPV</span></div>
            <strong>{isIt ? "Bergamo, Italia" : "Bergamo, Italy"}</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
