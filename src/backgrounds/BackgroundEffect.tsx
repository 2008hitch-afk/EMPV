import { lazy, Suspense } from "react";

export type BackgroundName =
  | "none"
  | "particles"
  | "aero"
  | "beams"
  | "threads"
  | "waves"
  | "galaxy"
  | "orb";

export type BackgroundTuning = {
  intensity: number;
  speed: number;
  depth: number;
  pointer: boolean;
};

const Floating3DParticles = lazy(() =>
  import("./Floating3DParticles").then((m) => ({ default: m.Floating3DParticles })),
);
const AeroShards = lazy(() => import("./AeroShards"));
const Beams = lazy(() => import("./Beams"));
const Threads = lazy(() => import("./Threads"));
const Waves = lazy(() => import("./Waves"));
const Galaxy = lazy(() => import("./Galaxy"));
const Orb = lazy(() => import("./Orb"));

export const DEFAULT_TUNING: BackgroundTuning = {
  intensity: 0.42,
  speed: 0.32,
  depth: 0.62,
  pointer: true,
};

export const BACKGROUND_OPTIONS: Array<{
  id: BackgroundName;
  label: string;
  source: string;
  note: string;
}> = [
  { id: "none", label: "None", source: "EMPV", note: "Current baseline" },
  {
    id: "particles",
    label: "Floating 3D Particles",
    source: "Magic UI",
    note: "Pseudo-3D particle field",
  },
  {
    id: "aero",
    label: "Aero Shards",
    source: "React Bits",
    note: "GPU foil-shard sculpture",
  },
  {
    id: "beams",
    label: "Beams",
    source: "React Bits",
    note: "Crossing 3D ribbons",
  },
  {
    id: "threads",
    label: "Threads",
    source: "React Bits",
    note: "Soft procedural line field",
  },
  {
    id: "waves",
    label: "Waves",
    source: "React Bits",
    note: "Interactive layered lines",
  },
  {
    id: "galaxy",
    label: "Galaxy",
    source: "React Bits",
    note: "Parallax star field",
  },
  {
    id: "orb",
    label: "Orb",
    source: "React Bits",
    note: "Shader object test",
  },
];

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export default function BackgroundEffect({
  name,
  tuning = DEFAULT_TUNING,
  className = "",
}: {
  name: BackgroundName;
  tuning?: BackgroundTuning;
  className?: string;
}) {
  const intensity = clamp01(tuning.intensity);
  const speed = clamp01(tuning.speed);
  const depth = clamp01(tuning.depth);

  if (name === "none") return null;

  return (
    <div
      className={`background-effect effect-${name} ${className}`}
      style={{ opacity: 0.26 + intensity * 0.5 }}
      aria-hidden="true"
    >
      <Suspense fallback={<div className="background-effect-loading" />}>
        {name === "particles" && (
          <Floating3DParticles
            quantity={Math.round(130 + intensity * 430)}
            color="#11110f"
            size={0.8 + intensity * 1.8}
            opacity={0.08 + intensity * 0.2}
            drift={0.04 + speed * 0.32}
            depth={depth}
          />
        )}

        {name === "aero" && (
          <AeroShards
            backgroundColor="#ecebe5"
            shardColor="#161614"
            accentColor="#8d8b83"
            placement="full"
            flow="stream"
            material="satin"
            detail="balanced"
            effect="none"
            scale={0.86}
            spread={0.85 + depth * 0.3}
            depth={0.55 + depth * 0.75}
            speed={0.12 + speed * 0.52}
            spin={0.35}
            interaction={tuning.pointer ? "repel" : "none"}
            density={0.5 + intensity * 0.8}
            shardSize={0.72}
            stretch={0.9}
            turbulence={0.4 + intensity * 0.35}
            glow={0.16}
            edgeSoftness={2.4}
            bloom={0.08}
            grain={0.015}
            chromaticAberration={0}
            interactionRadius={1.1}
            interactionStrength={0.16 + intensity * 0.16}
            rippleIntensity={0.3}
            holdToGather={false}
          />
        )}

        {name === "beams" && (
          <Beams
            beamWidth={1.4}
            beamHeight={16}
            beamNumber={Math.round(7 + intensity * 7)}
            lightColor="#ffffff"
            beamColor="#242420"
            backgroundColor="#ecebe5"
            speed={0.18 + speed * 0.72}
            noiseIntensity={0.4 + intensity * 1.2}
            scale={0.1 + depth * 0.13}
            rotation={-8}
            lightMode
          />
        )}

        {name === "threads" && (
          <Threads
            color={[0.07, 0.07, 0.065]}
            amplitude={0.35 + intensity * 0.85}
            distance={-0.25 + depth * 0.5}
            enableMouseInteraction={tuning.pointer}
          />
        )}

        {name === "waves" && (
          <Waves
            lineColor={`rgba(17,17,15,${0.12 + intensity * 0.22})`}
            backgroundColor="transparent"
            waveSpeedX={0.002 + speed * 0.012}
            waveSpeedY={0.001 + speed * 0.006}
            waveAmpX={8 + intensity * 25}
            waveAmpY={5 + depth * 18}
            xGap={15}
            yGap={34}
            friction={0.93}
            tension={0.004}
            maxCursorMove={tuning.pointer ? 55 : 0}
          />
        )}

        {name === "galaxy" && (
          <Galaxy
            starSpeed={0.12 + speed * 0.35}
            density={0.25 + intensity * 0.62}
            hueShift={0}
            speed={0.15 + speed * 0.55}
            mouseInteraction={tuning.pointer}
            glowIntensity={0.08 + intensity * 0.22}
            saturation={0}
            mouseRepulsion={tuning.pointer}
            twinkleIntensity={0.08 + intensity * 0.18}
            rotationSpeed={0.025 + speed * 0.08}
            repulsionStrength={0.5 + intensity}
            transparent
            lightMode
          />
        )}

        {name === "orb" && (
          <Orb
            hue={0}
            hoverIntensity={0.08 + intensity * 0.25}
            rotateOnHover={tuning.pointer}
            forceHoverState={false}
            backgroundColor="#ecebe5"
          />
        )}
      </Suspense>
    </div>
  );
}
