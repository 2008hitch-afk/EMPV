import { useState } from "react";
import {
  ArrowUpRight,
  ContactRound,
  Globe2,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";
import BackgroundEffect from "./backgrounds/BackgroundEffect";
import {
  businessCards,
  type BusinessPerson,
} from "./businessCardData";
import "./business-card.css";

function assetHref(path: string) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export default function BusinessCard({ person }: { person: BusinessPerson }) {
  const card = businessCards[person];
  const [shareLabel, setShareLabel] = useState("Condividi");

  async function shareCard() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${card.name} — EMPV`,
          text: `${card.name} · ${card.role}`,
          url: card.url,
        });
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(card.url);
        setShareLabel("Link copiato");
        window.setTimeout(() => setShareLabel("Condividi"), 1800);
      }
    } catch {
      // Native share can be cancelled without affecting the card.
    }
  }

  return (
    <div className={`business-card-shell business-card-shell--${person}`}>
      <BackgroundEffect
        name="threads"
        tuning={{ intensity: 0.42, speed: 0.24, depth: 0.6, pointer: true }}
        className="business-card-background"
        galaxyPalette="mist"
      />

      <header className="business-card-topbar">
        <a className="business-card-brand" href={assetHref("it/")} aria-label="EMPV">
          EMPV
        </a>
        <span>Digital business card</span>
      </header>

      <main className="business-card-layout">
        <article className="business-card-panel">
          <div className="business-card-photo-wrap">
            <img
              className="business-card-photo"
              src={assetHref(card.photo)}
              alt={card.name}
              decoding="async"
            />
          </div>

          <div className="business-card-identity">
            <span className="business-card-kicker">EMPV / CONTACT</span>
            <h1>{card.name}</h1>
            <p className="business-card-role">{card.role}</p>
            <p className="business-card-description">{card.description}</p>
          </div>

          <div className="business-card-actions" aria-label="Contatti">
            <a className="business-card-action business-card-action--primary" href={assetHref(card.vcard)}>
              <ContactRound size={19} strokeWidth={1.55} />
              <span>Salva contatto</span>
              <ArrowUpRight size={17} strokeWidth={1.45} />
            </a>

            <a
              className="business-card-action"
              href={card.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={19} strokeWidth={1.55} />
              <span>WhatsApp</span>
              <ArrowUpRight size={17} strokeWidth={1.45} />
            </a>

            <a className="business-card-action" href={`mailto:${card.email}`}>
              <Mail size={19} strokeWidth={1.55} />
              <span>{card.email}</span>
              <ArrowUpRight size={17} strokeWidth={1.45} />
            </a>

            <a
              className="business-card-action"
              href={card.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span className="business-card-linkedin-icon" aria-hidden="true">in</span>
              <span>LinkedIn</span>
              <ArrowUpRight size={17} strokeWidth={1.45} />
            </a>

            <a
              className="business-card-action"
              href={card.website}
              target="_blank"
              rel="noreferrer"
            >
              <Globe2 size={19} strokeWidth={1.55} />
              <span>Visita EMPV</span>
              <ArrowUpRight size={17} strokeWidth={1.45} />
            </a>

            <button className="business-card-action" type="button" onClick={shareCard}>
              <Share2 size={19} strokeWidth={1.55} />
              <span>{shareLabel}</span>
              <ArrowUpRight size={17} strokeWidth={1.45} />
            </button>
          </div>

          <div className="business-card-footer">
            <div>
              <span>EMPV</span>
              <strong>Systems · Products · AI · Research</strong>
            </div>
            <a href={card.website}>empv.it</a>
          </div>
        </article>

        <aside className="business-card-qr-panel" aria-label="QR personale">
          <div className="business-card-qr-frame">
            <img src={assetHref(card.qr)} alt={`QR code per ${card.name}`} />
          </div>
          <div>
            <span>QR personale</span>
            <p>Scansiona per aprire questa e-card su un altro dispositivo.</p>
          </div>
          <small>{card.url.replace("https://", "")}</small>
        </aside>
      </main>
    </div>
  );
}
