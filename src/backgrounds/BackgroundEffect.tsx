import { lazy, Suspense } from "react";
import "./background-effects.css";

export type BackgroundName =
  | "none"
  | "particles"
  | "aero"
  | "beams"
  | "threads"
  | "waves"
  | "galaxy"
  | "orb"
  | "silk"
  | "sliced-waves"
  | "side-rays"
  | "light-tunnel"
  | "scanner"
  | "prism"
  | "dither";

export type GalaxyPalette =
  | "mist"
  | "zinc"
  | "mauve"
  | "olive"
  | "taupe"
  | "amber"
  | "blue"
  | "indigo";

export const GALAXY_PALETTES: Record<
  GalaxyPalette,
  { label: string; tint: [number, number, number] }
> = {
  mist: {
    label: "Mist",
    tint: [0.4039, 0.4703, 0.4860],
  },
  zinc: {
    label: "Zinc",
    tint: [0.4430, 0.4429, 0.4838],
  },
  mauve: {
    label: "Mauve",
    tint: [0.4748, 0.4115, 0.4827],
  },
  olive: {
    label: "Olive",
    tint: [0.4860, 0.4859, 0.4035],
  },
  taupe: {
    label: "Taupe",
    tint: [0.4860, 0.4276, 0.4042],
  },
  amber: {
    label: "Amber",
    tint: [0.8838, 0.4434, 0.0],
  },
  blue: {
    label: "Blue",
    tint: [0.1693, 0.4980, 1.0],
  },
  indigo: {
    label: "Indigo",
    tint: [0.3822, 0.3719, 1.0],
  },
};

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
const Silk = lazy(() => import("./Silk"));
const SlicedWaves = lazy(() => import("./SlicedWaves"));
const SideRays = lazy(() => import("./SideRays"));
const LightTunnel = lazy(() => import("./LightTunnel"));
const Scanner = lazy(() => import("./Scanner"));
const Prism = lazy(() => import("./Prism"));
const Dither = lazy(() => import("./Dither"));

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
  {
    id: "silk",
    label: "Silk",
    source: "React Bits",
    note: "Soft illuminated wave field",
  },
  {
    id: "sliced-waves",
    label: "Sliced Waves",
    source: "React Bits",
    note: "Geometric glowing wave bars",
  },
  {
    id: "side-rays",
    label: "Side Rays",
    source: "React Bits",
    note: "Directional volumetric light",
  },
  {
    id: "light-tunnel",
    label: "Light Tunnel",
    source: "React Bits",
    note: "Fibre-optic depth tunnel",
  },
  {
    id: "scanner",
    label: "Scanner",
    source: "React Bits",
    note: "Oscilloscope interference field",
  },
  {
    id: "prism",
    label: "Prism",
    source: "React Bits",
    note: "Volumetric rotating object",
  },
  {
    id: "dither",
    label: "Dither",
    source: "React Bits",
    note: "Dithered procedural waves",
  },
];

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function tintToCss(tint: [number, number, number]) {
  return `rgb(${Math.round(tint[0] * 255)} ${Math.round(tint[1] * 255)} ${Math.round(tint[2] * 255)})`;
}

function tintToRgba(tint: [number, number, number], alpha: number) {
  return `rgba(${Math.round(tint[0] * 255)}, ${Math.round(tint[1] * 255)}, ${Math.round(tint[2] * 255)}, ${alpha})`;
}

function scaleTint(
  tint: [number, number, number],
  scale: number,
): [number, number, number] {
  return tint.map((value) => Math.max(0, Math.min(1, value * scale))) as [
    number,
    number,
    number,
  ];
}

function liftTint(
  tint: [number, number, number],
  amount: number,
): [number, number, number] {
  return tint.map((value) => value + (1 - value) * amount) as [
    number,
    number,
    number,
  ];
}

function tintHue([r, g, b]: [number, number, number]) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min) return 0;
  const delta = max - min;
  let hue = 0;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;
  return ((hue * 60) + 360) % 360;
}

export default function BackgroundEffect({
  name,
  tuning = DEFAULT_TUNING,
  className = "",
  galaxyPalette = "mist",
}: {
  name: BackgroundName;
  tuning?: BackgroundTuning;
  className?: string;
  galaxyPalette?: GalaxyPalette;
}) {
  const intensity = clamp01(tuning.intensity);
  const speed = clamp01(tuning.speed);
  const depth = clamp01(tuning.depth);
  const galaxyColors = GALAXY_PALETTES[galaxyPalette];
  const paletteTint = galaxyColors.tint;
  const darkTint = scaleTint(paletteTint, 0.42);
  const midTint = scaleTint(paletteTint, 0.72);
  const lightTint = liftTint(paletteTint, 0.48);
  const paletteCss = tintToCss(paletteTint);
  const darkCss = tintToCss(darkTint);
  const midCss = tintToCss(midTint);
  const lightCss = tintToCss(lightTint);
  const paletteHue = tintHue(paletteTint);

  if (name === "none") return null;

  return (
    <div
      className={`background-effect effect-${name} ${name === "galaxy" ? `galaxy-palette-${galaxyPalette}` : ""} ${className}`}
      style={{ opacity: name === "galaxy" ? 0.9 : 0.48 + intensity * 0.42 }}
      aria-hidden="true"
    >
      <Suspense fallback={<div className="background-effect-loading" />}>
        {name === "particles" && (
          <Floating3DParticles
            quantity={Math.round(130 + intensity * 430)}
            color={darkCss}
            size={1.1 + intensity * 2.4}
            opacity={0.2 + intensity * 0.38}
            drift={0.04 + speed * 0.32}
            depth={depth}
          />
        )}

        {name === "aero" && (
          <AeroShards
            backgroundColor="#ecebe5"
            shardColor={darkCss}
            accentColor={paletteCss}
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
            lightColor={paletteCss}
            beamColor={darkCss}
            backgroundColor="#ecebe5"
            speed={0.18 + speed * 0.72}
            noiseIntensity={0.65 + intensity * 1.6}
            scale={0.1 + depth * 0.13}
            rotation={-8}
            lightMode={false}
          />
        )}

        {name === "threads" && (
          <Threads
            color={darkTint}
            amplitude={0.35 + intensity * 0.85}
            distance={-0.25 + depth * 0.5}
            enableMouseInteraction={tuning.pointer}
          />
        )}

        {name === "waves" && (
          <Waves
            lineColor={tintToRgba(paletteTint, 0.12 + intensity * 0.22)}
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
            density={0.38 + intensity * 0.82}
            hueShift={0}
            speed={0.15 + speed * 0.55}
            mouseInteraction={tuning.pointer}
            glowIntensity={0.12 + intensity * 0.30}
            saturation={0}
            tint={galaxyColors.tint}
            mouseRepulsion={tuning.pointer}
            twinkleIntensity={0.10 + intensity * 0.22}
            rotationSpeed={0.025 + speed * 0.08}
            repulsionStrength={0.5 + intensity}
            transparent
            lightMode={false}
          />
        )}

        {name === "orb" && (
          <Orb
            hue={paletteHue}
            hoverIntensity={0.08 + intensity * 0.25}
            rotateOnHover={tuning.pointer}
            forceHoverState={false}
            backgroundColor="#ecebe5"
          />
        )}

        {name === "silk" && (
          <Silk
            speed={0.7 + speed * 2.6}
            scale={0.75 + depth * 0.7}
            color={lightCss}
            noiseIntensity={0.45 + intensity * 1.25}
            rotation={-0.12}
            lightMode
          />
        )}

        {name === "sliced-waves" && (
          <SlicedWaves
            color1={darkCss}
            color2={midCss}
            color3={lightCss}
            columns={12}
            rows={7}
            barThickness={0.08 + intensity * 0.08}
            speed={0.08 + speed * 0.52}
            travel={0.45 + depth * 0.5}
            waveSpread={0.7 + depth * 0.45}
            rowOffset={0.72}
            softness={0.08}
            glow={0.06 + intensity * 0.16}
            brightness={0.9 + intensity * 0.35}
            contrast={1.28}
            opacity={0.68 + intensity * 0.3}
            orientation="horizontal"
            alternate
            mouseInteraction={tuning.pointer}
            mouseStrength={0.25 + intensity * 0.55}
            mouseRadius={0.22 + depth * 0.18}
            grain
            grainIntensity={0.02}
            lightMode={false}
          />
        )}

        {name === "side-rays" && (
          <SideRays
            speed={0.25 + speed * 1.1}
            rayColor1={lightCss}
            rayColor2={paletteCss}
            intensity={2.8 + intensity * 3.2}
            spread={1.6 + depth * 1.5}
            origin="top-right"
            tilt={-10}
            saturation={0}
            blend={0.46}
            falloff={1.12}
            opacity={1}
          />
        )}

        {name === "light-tunnel" && (
          <LightTunnel
            cableColor={darkCss}
            pulseColor={paletteCss}
            tunnelColor={lightCss}
            tunnelOpacity={0.1 + intensity * 0.12}
            speed={0.03 + speed * 0.16}
            flowDirection="outward"
            pulseSpeed={0.45 + speed * 1.1}
            pulseLength={0.18}
            pulseBlend={0.75}
            pulseWidth={0.8}
            cableCount={16}
            thickness={0.2 + intensity * 0.18}
            rimWidth={0.1}
            waviness={0.12 + intensity * 0.18}
            sway={0.12 + depth * 0.28}
            size={0.92 + depth * 0.22}
            glow={0.14 + intensity * 0.28}
            fadeNear={0.55}
            fadeFar={2.2}
            brightness={0.72 + intensity * 0.36}
            colorVariance={false}
            grain
            grainIntensity={0.02}
            opacity={0.62 + intensity * 0.28}
            mouseInteraction={tuning.pointer}
            mouseStrength={0.04 + intensity * 0.08}
            lightMode
          />
        )}

        {name === "scanner" && (
          <Scanner
            color1={darkCss}
            color2={paletteCss}
            color3={lightCss}
            speed={0.12 + speed * 0.48}
            sweepSpeed={0.08 + speed * 0.34}
            sweepWidth={1.35}
            sweepFalloff={7}
            scale={1.2 + depth * 0.55}
            frequency={1.7}
            ripple={0.08 + intensity * 0.16}
            bandDensity={9}
            lineSharpness={5.5}
            glow={0.06 + intensity * 0.16}
            scanDirection="vertical"
            colorSpread={0.25}
            brightness={0.7 + intensity * 0.32}
            contrast={1.1}
            softness={1.7}
            vignette={0.2}
            scanline
            grain
            grainIntensity={0.018}
            opacity={0.5 + intensity * 0.38}
            mouseInteraction={tuning.pointer}
            mouseRadius={0.35}
            mouseStrength={0.18 + intensity * 0.22}
          />
        )}

        {name === "prism" && (
          <Prism
            height={3.5}
            baseWidth={5.5}
            animationType={tuning.pointer ? "hover" : "rotate"}
            glow={1}
            offset={{ x: 0, y: 0 }}
            noise={0.5}
            transparent={false}
            scale={3.6}
            hueShift={paletteHue}
            colorFrequency={1}
            hoverStrength={2}
            inertia={0.05}
            bloom={1}
            suspendWhenOffscreen={false}
            timeScale={0.5}
            lightMode={false}
          />
        )}

        {name === "dither" && (
          <Dither
            waveSpeed={0.01 + speed * 0.06}
            waveFrequency={1.8 + depth * 1.7}
            waveAmplitude={0.15 + intensity * 0.3}
            waveColor={darkTint}
            backgroundColor={[0.92, 0.915, 0.89]}
            colorNum={4}
            pixelSize={2}
            disableAnimation={speed < 0.02}
            enableMouseInteraction={tuning.pointer}
            mouseRadius={0.35 + depth * 0.45}
          />
        )}
      </Suspense>
    </div>
  );
}
