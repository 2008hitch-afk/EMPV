import { Mail, MessageCircle } from "lucide-react";
import type { SiteLang } from "./detailContent";
import { siteHref, type LegalSlug } from "./seo";
import "./legal.css";

export default function SiteFooter({ lang }: { lang: SiteLang }) {
  const isIt = lang === "it";
  const legalLinks: Array<{ slug: LegalSlug; label: string }> = [
    { slug: "privacy", label: "Privacy Policy" },
    { slug: "cookies", label: "Cookie & Storage" },
    { slug: "legal", label: isIt ? "Note legali" : "Legal notice" },
  ];

  return (
    <footer>
      <div className="footer-mark">EMPV</div>

      <div className="footer-meta">
        <div className="footer-column">
          <strong>EMPV</strong>
          <span>Systems · Products · AI · Research</span>
          <span>{isIt ? "Bergamo, Italia" : "Bergamo, Italy"}</span>
        </div>

        <div className="footer-column">
          <span className="footer-column-label">{isIt ? "Legale" : "Legal"}</span>
          {legalLinks.map((item) => (
            <a key={item.slug} href={siteHref({ kind: "legal", lang, slug: item.slug })}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="footer-column">
          <span className="footer-column-label">{isIt ? "Contatti" : "Contact"}</span>
          <a className="footer-contact-link" href="mailto:empv2626@gmail.com">
            <Mail size={15} strokeWidth={1.5} />
            <span>empv2626@gmail.com</span>
          </a>
          <a
            className="footer-contact-link"
            href="https://wa.me/393472438705"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={15} strokeWidth={1.5} />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="footer-tax">
          <strong>P.IVA 04942220163</strong>
          <span>© 2026 EMPV</span>
        </div>
      </div>
    </footer>
  );
}
