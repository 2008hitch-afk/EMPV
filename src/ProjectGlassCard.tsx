import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Lang, Project } from "./homeContent";
import "./project-glass.css";

type CardKind = "project" | "lab";

function CardSymbol({ slug }: { slug: string }) {
  const symbol =
    slug === "psicologia-operations" || slug === "vertical-operations" ? "calendar" :
    slug === "pet-resort-operations" || slug === "local-ai" ? "grid" :
    slug === "richieste-preventivi" || slug === "opportunity-engine" ? "arrows" :
    "nodes";

  return (
    <svg className="empv-card-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      {symbol === "calendar" ? (
        <>
          <rect x="5" y="7" width="22" height="20" rx="3" />
          <path d="M10 4v6M22 4v6M5 14h22M11 19h5M11 23h10" />
        </>
      ) : symbol === "grid" ? (
        <>
          <rect x="5" y="5" width="9" height="9" rx="2" />
          <rect x="18" y="5" width="9" height="9" rx="2" />
          <rect x="5" y="18" width="9" height="9" rx="2" />
          <path d="M19 21h7M22.5 17.5v7" />
        </>
      ) : symbol === "arrows" ? (
        <path d="M4 9h18l-5-5M22 9l-5 5M28 22H10l5-5M10 22l5 5" />
      ) : (
        <>
          <path d="M7 8.5 16 6l9 9-10 11-9-9z" />
          <circle cx="7" cy="8.5" r="2.5" />
          <circle cx="16" cy="6" r="2.5" />
          <circle cx="25" cy="15" r="2.5" />
          <circle cx="15" cy="26" r="2.5" />
          <circle cx="6" cy="17" r="2.5" />
        </>
      )}
    </svg>
  );
}

/**
 * Reusable light Team-inspired glass cards for both homepage and section indexes.
 * The content comes from homeContent, not duplicated display text.
 * The tilt lives on the inner anchor, while motion handles entrance on the wrapper;
 * this prevents entrance transforms from cancelling the interactive tilt.
 */
export default function ProjectGlassCard({
  project,
  href,
  lang,
  kind,
}: {
  project: Project;
  href: string;
  lang: Lang;
  kind: CardKind;
}) {
  const reducedMotion = useReducedMotion();
  const isLab = kind === "lab";

  function onPointerMove(event: ReactPointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse" || reducedMotion) return;

    const surface = event.currentTarget;
    const bounds = surface.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));

    // Mirrors Team's restrained interaction, as approved in Glass preview 12.
    surface.style.setProperty("--pg-tilt-x", `${((0.5 - y) * 7).toFixed(2)}deg`);
    surface.style.setProperty("--pg-tilt-y", `${((x - 0.5) * 7).toFixed(2)}deg`);
    surface.style.setProperty("--pg-glow-x", `${(x * 100).toFixed(1)}%`);
    surface.style.setProperty("--pg-glow-y", `${(y * 100).toFixed(1)}%`);
  }

  function onPointerLeave(event: ReactPointerEvent<HTMLAnchorElement>) {
    const surface = event.currentTarget;
    surface.style.setProperty("--pg-tilt-x", "0deg");
    surface.style.setProperty("--pg-tilt-y", "0deg");
    surface.style.setProperty("--pg-glow-x", "50%");
    surface.style.setProperty("--pg-glow-y", "58%");
  }

  return (
    <motion.div
      className="empv-card-entry"
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        className={`empv-glass-card empv-glass-card--${kind}`}
        href={href}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerCancel={onPointerLeave}
        aria-label={`${project.name} — ${lang === "it" ? "Apri il dettaglio" : "Open details"}`}
      >
        <div className="empv-card-top">
          <span className="empv-card-type">{project.index} / {project.kind}</span>
          <span className="empv-card-disc"><CardSymbol slug={project.slug} /></span>
        </div>

        <h3 className="empv-card-title">{project.name}</h3>

        {isLab ? (
          <>
            <p className="empv-card-question">{project.question}</p>
            <div className="empv-card-meta">
              <div>
                <small>{lang === "it" ? "Stato del repo" : "Repository state"}</small>
                <p>{project.state}</p>
              </div>
              <div>
                <small>{lang === "it" ? "Focus corrente" : "Current focus"}</small>
                <p>{project.focus}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="empv-card-description">{project.description}</p>
            <div className="empv-card-tags">
              {project.meta.map((item) => <span key={item}>{item}</span>)}
            </div>
          </>
        )}

        <div className="empv-card-action">
          <span>
            {isLab
              ? (lang === "it" ? "Esplora la ricerca" : "Explore research")
              : (lang === "it" ? "Scopri il progetto" : "View project")}
          </span>
          <ArrowUpRight size={21} strokeWidth={1.45} aria-hidden="true" />
        </div>
      </a>
    </motion.div>
  );
}
