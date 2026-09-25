import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, MousePointer2 } from "lucide-react";
import BackgroundEffect, {
  BACKGROUND_OPTIONS,
  DEFAULT_TUNING,
  type BackgroundName,
  type BackgroundTuning,
} from "./backgrounds/BackgroundEffect";
import "./background-lab.css";

function readInitialEffect(): BackgroundName {
  const value = new URLSearchParams(window.location.search).get("bg");
  return BACKGROUND_OPTIONS.some((item) => item.id === value)
    ? (value as BackgroundName)
    : "particles";
}

export default function BackgroundLab() {
  const [effect, setEffect] = useState<BackgroundName>(readInitialEffect);
  const [tuning, setTuning] = useState<BackgroundTuning>(DEFAULT_TUNING);

  const current = useMemo(
    () => BACKGROUND_OPTIONS.find((item) => item.id === effect) ?? BACKGROUND_OPTIONS[0],
    [effect],
  );

  const setNumber = (key: keyof Omit<BackgroundTuning, "pointer">, value: number) =>
    setTuning((previous) => ({ ...previous, [key]: value }));

  const previewHref = effect === "none" ? "../" : `../?bg=${effect}`;

  return (
    <div className="background-lab">
      <header className="lab-topbar">
        <a href="../" className="lab-back">
          <ArrowLeft size={16} />
          EMPV
        </a>
        <div>BACKGROUND LAB / EXPERIMENT</div>
        <a href={previewHref} className="lab-open">
          Open in homepage
          <ArrowUpRight size={15} />
        </a>
      </header>

      <section className="lab-preview">
        <BackgroundEffect name={effect} tuning={tuning} className="lab-background-effect" />

        <div className="lab-preview-grid" aria-hidden="true" />
        <div className="lab-preview-copy">
          <div className="lab-kicker">EMPV / DEPTH TEST / 2026</div>
          <h1>
            <span>Sistemi, prodotti</span>
            <span>e ricerca applicata.</span>
          </h1>
          <p>
            Stessa hero, stesso layout, stesso contenuto. Cambia soltanto lo sfondo
            per capire quale movimento appartiene davvero a EMPV.
          </p>
        </div>
      </section>

      <aside className="lab-panel">
        <div className="lab-panel-head">
          <div>
            <span className="lab-small">Selected background</span>
            <strong>{current.label}</strong>
          </div>
          <span className="lab-source">{current.source}</span>
        </div>

        <div className="lab-effect-list">
          {BACKGROUND_OPTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === effect ? "active" : ""}
              onClick={() => {
                setEffect(item.id);
                const url = new URL(window.location.href);
                url.searchParams.set("bg", item.id);
                window.history.replaceState({}, "", url);
              }}
            >
              <span>{item.label}</span>
              <small>{item.source}</small>
            </button>
          ))}
        </div>

        <div className="lab-controls">
          <label>
            <span>
              Intensity
              <b>{Math.round(tuning.intensity * 100)}</b>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(tuning.intensity * 100)}
              onChange={(event) => setNumber("intensity", Number(event.target.value) / 100)}
            />
          </label>

          <label>
            <span>
              Speed
              <b>{Math.round(tuning.speed * 100)}</b>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(tuning.speed * 100)}
              onChange={(event) => setNumber("speed", Number(event.target.value) / 100)}
            />
          </label>

          <label>
            <span>
              Depth
              <b>{Math.round(tuning.depth * 100)}</b>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(tuning.depth * 100)}
              onChange={(event) => setNumber("depth", Number(event.target.value) / 100)}
            />
          </label>

          <button
            className={`lab-pointer-toggle ${tuning.pointer ? "active" : ""}`}
            type="button"
            onClick={() =>
              setTuning((previous) => ({ ...previous, pointer: !previous.pointer }))
            }
          >
            <MousePointer2 size={15} />
            Pointer interaction
            <span>{tuning.pointer ? "ON" : "OFF"}</span>
          </button>

          <button
            className="lab-reset"
            type="button"
            onClick={() => setTuning(DEFAULT_TUNING)}
          >
            Reset tuning
          </button>
        </div>

        <div className="lab-note">
          <span className="lab-small">Purpose</span>
          <p>
            Questo laboratorio non decide lo stile finale. Serve a confrontare
            gli effetti sullo stesso layout, con palette EMPV monocromatica.
          </p>
        </div>
      </aside>
    </div>
  );
}
