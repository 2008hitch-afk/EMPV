import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import sharp from "sharp";

const manifest = JSON.parse(await readFile(new URL("../src/seo-manifest.json", import.meta.url), "utf8"));
const template = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const siteOrigin = process.env.VITE_SITE_ORIGIN ?? manifest.siteOrigin;
const basePath = process.env.VITE_SITE_BASE_PATH ?? manifest.basePath;
const siteUrl = siteOrigin + basePath;
const faviconPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAAEQklEQVR42u3cUUxTVxgH8AOFtiEZFB/I6M06FtkynBEFkukWsEMCKFZcOsgYCHvYssTnLWzZjK6JTN1MXCLbEk1MKAJZbC+3EKG1kwizgIjERcRgItimzCE8CJSWEnf3cOjttVTTyyw22/9LH04/Tu/p/d3v3HPapMSlpqYSxNMjHgQAAhCAAAQgAAEIQAgAAQhAAAIQgAAEIASAAAQgAAEIQAACEAJAAAIQgAAEIAABCEAIAAEIQAACEIAABCAEgCKPBEm974z9IZM9y3Rf+QdjY3fCdj714+nGxl9C+h89+m1lhV546nS6dhXtfvZwPt/S7Ozs6OhtztJps9lp8syZn7Q7C2i74bsT5841rX5vNdVVhw9/TdsOR3/dx5/GVgV9VFWZkPDE9UhJSd6n2yv1OEqlgmHUxcVFjadPnT37s1KpIISwLCd02F+uC/vC8vLgWGZR/2gBlZTqXn9jc8hDKJ/VkZaWVlJcJM5UVOjp6UU+3Fubc+rqPnnw4C+a3FmQ/2X9F4QQu71nbm6eJjdtysrM3Bjyco3mla1bs2l7cXFRKL3YugcdqK0ODhwfX1P9odQj+P1+R//AsWPfCxm9/n2lUuH3+y9e7ApbLIFMsKy6uqxery+GgHy+pYWFBUJIbs62rKw3abKwUMswDCHk4cMZqQccvjEinnEajSZk1uj2lsXFxT1xc9SVrWF+rRPQ8vKyydRO27UHVoqoNlBNrW2/Sj1gyMnzPE8IGRm5OTE5STMMo87LyxU6ZGdvych4lbbdbvfQ0HDMLfPG5hZ6GjrdHpVKlZm5ccf2twkhXq/vwgWz1KPl5mwTl6fL5aLtdtYSdpaJ2yxroe8k6kDW7o6747fEj7Y249M637/vvNLbRwhRKBSVlXqhjjjO8ujRXOSDyuXyd3Zsr6//XMiYTKzPt7QCxHUIJ7+7tEQulxNCZDJZ2Z7g1oFtt0RxH/SvisjYQrcqNdVVKlVKoLJaI78eq5O9vb8fP/GD8HRq6s+BwWu0NpOTX9JqC2w2e37+uxs2rPwu9/rwDafTtU5AJaW6e/cmIu/f13d1YnLytYyM9PSXaWZg4Nr4+N2kpCSpC9nMzOyt0dsWS6fVeinkr6yZo0B05bLZ7OL1izVzUk9z/SqI5/lmY+uhQ18Jmaam88/9enRbLx058g1Ff09boFanF+0qFO5WXd3WmP4sZjK3ezyewGoydbmn57kP4fV6uwNllZiYePLkcWEvarf/Nj+/ENNAHo9H2IOcb2l7/PjvaIwi/tiRl5uztu3PC5hiNAyGBoOhIapDDA4Oud1TDKMWJ6enpx2O/nUFCrusGAwNxuaWF/sFBc/zHNdx8OBn4iTHda6tYP+b3wetnk1Stz/BXTv+d8f/sYIABCAAAQhAAEIACEAAAhCAAAQgAAEIASAAAQhAAAIQgACEABCAAAQgAAEIQABCAAhAAIp6/ANIhnv9mJEtPAAAAABJRU5ErkJggg==";

async function loadTypeScriptModule(relativePath) {
  const source = await readFile(new URL(relativePath, import.meta.url), "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022
    }
  });
  const encoded = Buffer.from(result.outputText, "utf8").toString("base64");
  return import("data:text/javascript;base64," + encoded);
}

const homeContent = await loadTypeScriptModule("../src/homeContent.ts");
const detailContent = await loadTypeScriptModule("../src/detailContent.ts");
const researchContent = await loadTypeScriptModule("../src/researchNotesContent.ts");
const businessCardContent = await loadTypeScriptModule("../src/businessCardData.ts");
const copy = homeContent.copy;
const selected = homeContent.selected;
const faqs = homeContent.faqs;
const labs = homeContent.labs;
const getDetail = detailContent.getDetail;
const researchNotes = researchContent.researchNotes;
const getResearchNoteById = researchContent.getResearchNoteById;
const businessCards = businessCardContent.businessCards;

const socialCardDir = new URL("../dist/social/research-notes/", import.meta.url);

const xml = value => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

function wrapCardTitle(title, maxChars = 27, maxLines = 4) {
  const words = String(title).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? line + " " + word : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    } else {
      line = candidate;
    }
  }
  const consumed = lines.join(" ").split(/\s+/).filter(Boolean).length;
  const remaining = words.slice(consumed);
  if (remaining.length) {
    const last = remaining.join(" ");
    lines.push(last.length > maxChars + 10 ? last.slice(0, maxChars + 7).trimEnd() + "…" : last);
  } else if (line && lines.length < maxLines) {
    lines.push(line);
  }
  return lines.slice(0, maxLines);
}

function cardVisual(noteId) {
  const orange = "#ff5a24";
  const faint = "#d8d6cf";
  if (noteId === "openai-dots") {
    return `
      <g transform="translate(820 82)">
        <circle cx="170" cy="230" r="168" fill="none" stroke="${faint}" stroke-width="1"/>
        <circle cx="170" cy="230" r="112" fill="none" stroke="${faint}" stroke-width="1"/>
        <circle cx="170" cy="230" r="56" fill="none" stroke="${faint}" stroke-width="1"/>
        <circle cx="170" cy="230" r="13" fill="${orange}"/>
        <circle cx="170" cy="62" r="8" fill="#171715"/>
        <circle cx="282" cy="146" r="8" fill="#171715"/>
        <circle cx="58" cy="314" r="8" fill="#171715"/>
        <circle cx="250" cy="360" r="8" fill="#171715"/>
        <path d="M170 62 C252 89 305 158 282 230 C260 300 208 338 250 360" fill="none" stroke="${orange}" stroke-width="2"/>
      </g>`;
  }
  if (noteId === "gemini-4-argon") {
    return `
      <g transform="translate(810 120)" fill="none">
        <path d="M0 110 C115 20 220 25 350 104" stroke="${faint}" stroke-width="2"/>
        <path d="M0 180 C130 82 245 102 350 168" stroke="#171715" stroke-width="2"/>
        <path d="M0 250 C115 170 245 165 350 238" stroke="${orange}" stroke-width="3"/>
        <path d="M0 320 C140 255 240 248 350 304" stroke="${faint}" stroke-width="2"/>
        <circle cx="0" cy="250" r="7" fill="${orange}" stroke="none"/>
        <circle cx="350" cy="238" r="7" fill="${orange}" stroke="none"/>
      </g>`;
  }
  if (noteId === "embeddinggemma-2") {
    return `
      <g transform="translate(812 108)" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <rect x="0" y="20" width="82" height="56" rx="10" stroke="\${faint}" stroke-width="2"/>
        <path d="M16 38 H64 M16 49 H54 M16 60 H60" stroke="#171715" stroke-width="2"/>
        <rect x="0" y="104" width="82" height="56" rx="10" stroke="\${faint}" stroke-width="2"/>
        <path d="M14 145 L31 126 L45 138 L58 122 L70 145 Z" stroke="#171715" stroke-width="2"/>
        <path d="M0 215 H10 L18 194 L27 234 L38 203 L48 225 L58 199 L69 215 H82" stroke="\${faint}" stroke-width="2"/>
        <rect x="0" y="270" width="82" height="56" rx="10" stroke="\${faint}" stroke-width="2"/>
        <path d="M16 282 V314 M66 282 V314" stroke="#171715" stroke-width="2" stroke-dasharray="4 5"/>
        <rect x="25" y="283" width="32" height="30" rx="4" stroke="#171715" stroke-width="2"/>
        <path d="M82 48 C152 48 150 162 214 174" stroke="\${faint}" stroke-width="2"/>
        <path d="M82 132 C150 132 154 167 214 174" stroke="\${faint}" stroke-width="2"/>
        <path d="M82 215 C150 215 154 181 214 174" stroke="\${faint}" stroke-width="2"/>
        <path d="M82 298 C152 298 150 187 214 174" stroke="\${faint}" stroke-width="2"/>
        <circle cx="230" cy="174" r="16" fill="\${orange}" stroke="\${orange}"/>
        <path d="M246 174 H286" stroke="\${orange}" stroke-width="3"/>
        <rect x="300" y="92" width="12" height="164" rx="6" fill="#171715" stroke="none"/>
        <rect x="322" y="121" width="12" height="106" rx="6" fill="\${faint}" stroke="none"/>
        <rect x="344" y="76" width="12" height="196" rx="6" fill="\${orange}" stroke="none"/>
        <rect x="366" y="135" width="12" height="78" rx="6" fill="#171715" stroke="none"/>
        <rect x="388" y="108" width="12" height="132" rx="6" fill="\${faint}" stroke="none"/>
      </g>`;
  }
  if (noteId === "local-llm-evaluation") {
    return `
      <g transform="translate(850 125)">
        ${Array.from({length:5},(_,r)=>Array.from({length:5},(_,c)=>{
          const active=(r===1&&c===3)||(r===3&&c===1)||(r===4&&c===4);
          return '<rect x="'+(c*62)+'" y="'+(r*62)+'" width="42" height="42" rx="8" fill="'+(active?orange:"none")+'" stroke="'+(active?orange:faint)+'" stroke-width="2"/>';
        }).join("")).join("")}
      </g>`;
  }
  if (noteId === "on-premise-vs-cloud") {
    return `
      <g transform="translate(820 130)">
        <rect x="0" y="95" width="145" height="145" rx="18" fill="none" stroke="#171715" stroke-width="2"/>
        <circle cx="72" cy="168" r="18" fill="${orange}"/>
        <path d="M210 205 C205 160 240 132 278 142 C295 100 363 106 370 154 C405 158 424 183 414 211 C406 234 385 246 356 246 H260 C229 246 208 230 210 205Z" fill="none" stroke="${faint}" stroke-width="2"/>
        <path d="M145 168 H210" stroke="${orange}" stroke-width="3" stroke-dasharray="7 7"/>
      </g>`;
  }
  if (noteId === "email-to-order") {
    return `
      <g transform="translate(820 135)">
        <rect x="0" y="65" width="150" height="105" rx="14" fill="none" stroke="#171715" stroke-width="2"/>
        <path d="M0 72 L75 128 L150 72" fill="none" stroke="${faint}" stroke-width="2"/>
        <path d="M176 116 H246" stroke="${orange}" stroke-width="3"/>
        <path d="M232 102 L248 116 L232 130" fill="none" stroke="${orange}" stroke-width="3"/>
        <rect x="275" y="20" width="120" height="56" rx="10" fill="none" stroke="${faint}" stroke-width="2"/>
        <rect x="275" y="100" width="120" height="56" rx="10" fill="none" stroke="${orange}" stroke-width="2"/>
        <rect x="275" y="180" width="120" height="56" rx="10" fill="none" stroke="${faint}" stroke-width="2"/>
      </g>`;
  }
  if (noteId === "quote-intake") {
    return `
      <g transform="translate(835 110)" fill="none" stroke-width="2">
        <circle cx="50" cy="70" r="20" stroke="${faint}"/>
        <circle cx="50" cy="170" r="20" stroke="${faint}"/>
        <circle cx="50" cy="270" r="20" stroke="${faint}"/>
        <path d="M70 70 H190 M70 170 H190 M70 270 H190" stroke="${faint}"/>
        <path d="M190 70 C250 70 250 170 310 170 M190 170 H310 M190 270 C250 270 250 170 310 170" stroke="#171715"/>
        <circle cx="330" cy="170" r="24" fill="${orange}" stroke="${orange}"/>
      </g>`;
  }
  if (noteId === "integrate-not-replace") {
    return `
      <g transform="translate(845 120)">
        <rect x="78" y="88" width="175" height="175" rx="24" fill="none" stroke="#171715" stroke-width="2"/>
        <rect x="0" y="0" width="92" height="62" rx="12" fill="none" stroke="${faint}" stroke-width="2"/>
        <rect x="255" y="18" width="92" height="62" rx="12" fill="none" stroke="${faint}" stroke-width="2"/>
        <rect x="0" y="292" width="92" height="62" rx="12" fill="none" stroke="${faint}" stroke-width="2"/>
        <rect x="255" y="278" width="92" height="62" rx="12" fill="none" stroke="${faint}" stroke-width="2"/>
        <path d="M92 45 C150 45 142 88 165 88 M255 49 C220 49 228 88 210 88 M92 323 C150 323 142 263 165 263 M255 309 C220 309 228 263 210 263" fill="none" stroke="${orange}" stroke-width="2"/>
      </g>`;
  }
  return `
    <g transform="translate(850 135)">
      <circle cx="160" cy="160" r="142" fill="none" stroke="${faint}" stroke-width="2"/>
      <circle cx="160" cy="160" r="86" fill="none" stroke="#171715" stroke-width="2"/>
      <circle cx="160" cy="160" r="14" fill="${orange}"/>
    </g>`;
}


function approvedDotsSocialCardSvg(note, lang) {
  const title = note.title[lang];
  const lines = wrapCardTitle(title, lang === "it" ? 24 : 25, 4);
  const titleMarkup = lines.map((line, i) =>
    '<text x="70" y="' + (250 + i * 62) + '" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="600" letter-spacing="-2.6" fill="#151515">' + xml(line) + '</text>'
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="dotsGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ff5a24" stop-opacity="0.20"/>
        <stop offset="50%" stop-color="#ff5a24" stop-opacity="0.07"/>
        <stop offset="100%" stop-color="#ff5a24" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="paperFade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f4f1eb"/>
        <stop offset="100%" stop-color="#ecebe5"/>
      </linearGradient>
      <filter id="softShadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#171715" flood-opacity="0.10"/>
      </filter>
    </defs>

    <rect width="1200" height="630" fill="url(#paperFade)"/>
    <ellipse cx="950" cy="320" rx="310" ry="280" fill="url(#dotsGlow)"/>

    <line x1="70" y1="103" x2="1130" y2="103" stroke="#cbc8c0" stroke-width="1"/>
    <line x1="70" y1="562" x2="1130" y2="562" stroke="#cbc8c0" stroke-width="1"/>

    <text x="70" y="72" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="2.0" fill="#151515">EMPV</text>
    <text x="140" y="72" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="600" fill="#ff5a24">/</text>
    <text x="166" y="72" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="500" letter-spacing="3.0" fill="#272725">RESEARCH NOTES</text>

    <text x="1050" y="72" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="600" letter-spacing="2.1" fill="#272725">NOTE</text>
    <text x="1070" y="72" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" fill="#ff5a24">/</text>
    <text x="1130" y="72" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" letter-spacing="2.0" fill="#272725">${xml(note.index)}</text>

    <text x="70" y="184" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" letter-spacing="2.1" fill="#3b3a36">${xml(note.category[lang].replace(" / ", "  /  "))}</text>
    ${titleMarkup}

    <text x="70" y="598" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="500" letter-spacing="3.0" fill="#272725">empv.it</text>
    <text x="1130" y="598" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="500" letter-spacing="2.2" fill="#55534d">${xml(note.published)}</text>

    <!-- restrained EMPV system orbit -->
    <path d="M710 355 C755 185 1010 160 1125 295 C1168 346 1142 416 1067 438 C967 468 789 449 717 396"
      fill="none" stroke="#ff6a37" stroke-width="1.2" stroke-opacity="0.68"/>
    <path d="M765 474 C840 504 1008 510 1100 458"
      fill="none" stroke="#ff6a37" stroke-width="1" stroke-opacity="0.52" stroke-dasharray="5 7"/>
    <circle cx="720" cy="386" r="6" fill="#ff5a24"/>
    <circle cx="1112" cy="312" r="6" fill="#ff5a24"/>
    <circle cx="1018" cy="491" r="6" fill="#ff5a24"/>

    <!-- cloud -->
    <g opacity="0.96">
      <circle cx="902" cy="340" r="78" fill="#f9f6f0"/>
      <circle cx="975" cy="315" r="104" fill="#f9f6f0"/>
      <circle cx="1050" cy="354" r="70" fill="#f9f6f0"/>
      <rect x="860" y="338" width="235" height="85" rx="42" fill="#f9f6f0"/>
    </g>

    <!-- upper flying Dot -->
    <g transform="translate(965 160)" filter="url(#softShadow)">
      <circle cx="0" cy="0" r="66" fill="#f7f3ec" stroke="#d8d4cc" stroke-width="1.5"/>
      <rect x="-43" y="-28" width="86" height="57" rx="27" fill="#171715"/>
      <path d="M-22 2 Q-14 -8 -6 2" fill="none" stroke="#ff934f" stroke-width="4" stroke-linecap="round"/>
      <path d="M9 2 Q17 -8 25 2" fill="none" stroke="#ff934f" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="-58" cy="25" rx="20" ry="30" fill="#f7f3ec" stroke="#d8d4cc"/>
      <ellipse cx="58" cy="23" rx="20" ry="30" fill="#f7f3ec" stroke="#d8d4cc"/>
      <line x1="31" y1="-58" x2="42" y2="-82" stroke="#272725" stroke-width="2"/>
      <circle cx="44" cy="-87" r="9" fill="#ff5a24"/>
    </g>

    <!-- floating document -->
    <g transform="translate(1082 196) rotate(8)" filter="url(#softShadow)">
      <rect x="-48" y="-35" width="96" height="70" rx="10" fill="#eee9df" stroke="#ddd7cd"/>
      <rect x="-30" y="-18" width="48" height="5" rx="2.5" fill="#c8c2b8"/>
      <rect x="-30" y="-6" width="38" height="5" rx="2.5" fill="#c8c2b8"/>
      <rect x="-30" y="6" width="44" height="5" rx="2.5" fill="#c8c2b8"/>
      <circle cx="28" cy="18" r="6" fill="#ff5a24"/>
    </g>

    <!-- lower left Dot with laptop -->
    <g transform="translate(820 410)" filter="url(#softShadow)">
      <ellipse cx="0" cy="48" rx="98" ry="25" fill="#e7e2d9"/>
      <circle cx="0" cy="0" r="61" fill="#f7f3ec" stroke="#d8d4cc" stroke-width="1.5"/>
      <rect x="-40" y="-25" width="80" height="52" rx="25" fill="#171715"/>
      <ellipse cx="-15" cy="2" rx="5" ry="10" fill="#ff934f"/>
      <ellipse cx="15" cy="2" rx="5" ry="10" fill="#ff934f"/>
      <line x1="25" y1="-54" x2="33" y2="-72" stroke="#272725" stroke-width="2"/>
      <circle cx="35" cy="-77" r="8" fill="#ff5a24"/>
      <ellipse cx="-48" cy="20" rx="18" ry="26" fill="#f7f3ec" stroke="#d8d4cc"/>
      <ellipse cx="47" cy="19" rx="18" ry="26" fill="#f7f3ec" stroke="#d8d4cc"/>
      <g transform="translate(-10 48)">
        <path d="M-70 -22 H45 L58 31 H-58 Z" fill="#232321"/>
        <rect x="-63" y="-17" width="101" height="44" rx="4" fill="#2e2e2b"/>
        <circle cx="-12" cy="5" r="6" fill="none" stroke="#ff7a3f" stroke-width="2"/>
        <path d="M-58 31 H72 L61 39 H-68 Z" fill="#1c1c1b"/>
      </g>
    </g>

    <!-- lower right Dot with checklist -->
    <g transform="translate(1038 414)" filter="url(#softShadow)">
      <ellipse cx="0" cy="50" rx="94" ry="24" fill="#e7e2d9"/>
      <circle cx="0" cy="0" r="58" fill="#f7f3ec" stroke="#d8d4cc" stroke-width="1.5"/>
      <rect x="-39" y="-24" width="78" height="50" rx="24" fill="#171715"/>
      <ellipse cx="-14" cy="2" rx="5" ry="10" fill="#ff934f"/>
      <ellipse cx="14" cy="2" rx="5" ry="10" fill="#ff934f"/>
      <ellipse cx="-45" cy="22" rx="17" ry="25" fill="#f7f3ec" stroke="#d8d4cc"/>
      <ellipse cx="45" cy="22" rx="17" ry="25" fill="#f7f3ec" stroke="#d8d4cc"/>
      <g transform="translate(59 25) rotate(-8)">
        <rect x="-30" y="-39" width="100" height="86" rx="10" fill="#eee9df" stroke="#d9d3c9"/>
        <rect x="-16" y="-22" width="14" height="14" rx="3" fill="#ff6a37"/>
        <path d="M-12 -15 l4 4 7 -9" fill="none" stroke="#fffaf5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="10" y="-20" width="42" height="4" rx="2" fill="#bfb9af"/>
        <rect x="-16" y="4" width="14" height="14" rx="3" fill="none" stroke="#bbb5ab"/>
        <rect x="10" y="7" width="48" height="4" rx="2" fill="#bfb9af"/>
      </g>
    </g>

    <!-- tiny data panel -->
    <g transform="translate(780 265) rotate(5)" opacity="0.95">
      <rect x="-34" y="-26" width="68" height="52" rx="8" fill="#eee9df" stroke="#ddd7cd"/>
      <rect x="-20" y="4" width="7" height="12" rx="2" fill="#d1cbc1"/>
      <rect x="-7" y="-3" width="7" height="19" rx="2" fill="#e6b294"/>
      <rect x="6" y="-10" width="7" height="26" rx="2" fill="#ff7a3f"/>
    </g>
  </svg>`;
}

function socialCardSvg(note, lang) {
  if (note.id === "openai-dots") return approvedDotsSocialCardSvg(note, lang);
  const title = note.title[lang];
  const lines = wrapCardTitle(title);
  const titleSize = lines.length >= 4 ? 49 : lines.length === 3 ? 54 : 60;
  const lineHeight = Math.round(titleSize * 1.04);
  const titleY = 230;
  const titleMarkup = lines.map((line, i) =>
    '<text x="70" y="' + (titleY + i * lineHeight) + '" font-family="Arial, Helvetica, sans-serif" font-size="' + titleSize + '" font-weight="600" letter-spacing="-2.1" fill="#171715">' + xml(line) + '</text>'
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#f0efe9"/>
    <circle cx="1070" cy="66" r="280" fill="#ff5a24" opacity="0.055"/>
    <circle cx="1020" cy="580" r="260" fill="#ff5a24" opacity="0.032"/>
    <line x1="70" y1="112" x2="1130" y2="112" stroke="#d8d6cf"/>
    <text x="70" y="78" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="1.7" fill="#171715">EMPV / RESEARCH NOTES</text>
    <text x="1130" y="78" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="1.5" fill="#696862">NOTE / ${xml(note.index)}</text>
    <text x="70" y="174" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="1.1" fill="#ff5a24">${xml(note.category[lang])}</text>
    ${titleMarkup}
    <text x="70" y="566" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="600" fill="#171715">empv.it</text>
    <text x="1130" y="566" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="500" fill="#696862">${xml(note.published)}</text>
    ${cardVisual(note.id)}
  </svg>`;
}

async function generateResearchNoteCards() {
  await mkdir(socialCardDir, { recursive: true });
  for (const note of researchNotes) {
    for (const lang of ["it", "en"]) {
      const svg = socialCardSvg(note, lang);
      const socialPath = researchNoteSocialImage(note, lang);
      const filename = socialPath.split("/").pop();
      const target = fileURLToPath(new URL(filename, socialCardDir));
      const output = sharp(Buffer.from(svg));
      if (/\.jpe?g$/i.test(filename)) {
        await output.jpeg({ quality: 90, chromaSubsampling: "4:4:4", progressive: true }).toFile(target);
      } else {
        await output.png({ quality: 92, compressionLevel: 9 }).toFile(target);
      }
    }
  }
}

await generateResearchNoteCards();


function routePath(route) {
  if (route.kind === "home") return "/" + route.lang + "/";
  if (route.kind === "businessCard") return "/" + route.person + "/";
  if (route.kind === "detail") {
    const segment = route.detailKind === "project" ? (route.lang === "it" ? "progetti" : "projects") : "lab";
    return "/" + route.lang + "/" + segment + "/" + route.slug + "/";
  }
  if (route.kind === "sectionIndex") {
    const segment = route.section === "projects" ? (route.lang === "it" ? "progetti" : "projects") : "lab";
    return "/" + route.lang + "/" + segment + "/";
  }
  if (route.kind === "notesIndex") return "/" + route.lang + "/research-notes/";
  if (route.kind === "note") {
    const note = getResearchNoteById(route.noteId);
    const slug = note ? note.slugs[route.lang] : route.noteId;
    return "/" + route.lang + "/research-notes/" + slug + "/";
  }
  if (route.slug === "privacy") return "/" + route.lang + "/privacy/";
  if (route.slug === "cookies") return "/" + route.lang + "/cookie-storage/";
  return route.lang === "it" ? "/it/note-legali/" : "/en/legal-notice/";
}

const canonical = route => siteUrl + routePath(route);

function researchNoteSocialVersion(note) {
  return note.socialVersion || String(note.updated || note.published).replaceAll("-", "");
}

function researchNoteSocialImage(note, lang) {
  const custom = note.socialImage?.[lang];
  if (custom) return custom.startsWith("/") ? custom : "/" + custom;
  return "/social/research-notes/" + note.id + "-" + lang + "-" + researchNoteSocialVersion(note) + ".png";
}
const copyFor = route => route.kind === "home"
  ? manifest.home[route.lang]
  : route.kind === "businessCard"
    ? {
        title: businessCards[route.person].name + " — " + businessCards[route.person].role + " | EMPV",
        description: businessCards[route.person].name + ", " + businessCards[route.person].role + " at EMPV. Contatti, WhatsApp, email, LinkedIn e vCard in un'unica pagina."
      }
  : route.kind === "detail"
    ? manifest.details[route.slug][route.lang]
    : route.kind === "sectionIndex"
      ? manifest.sections[route.section][route.lang]
    : route.kind === "notesIndex"
      ? manifest.researchNotes.index[route.lang]
      : route.kind === "note"
        ? manifest.researchNotes.notes[route.noteId][route.lang]
        : manifest.legal[route.slug][route.lang];

const esc = value => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");


const inlineMarkup = value => {
  const source = String(value ?? "");
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let html = "";
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(source)) !== null) {
    html += esc(source.slice(lastIndex, match.index));
    html += '<a href="' + esc(match[2]) + '" target="_blank" rel="noreferrer noopener">' + esc(match[1]) + '</a>';
    lastIndex = pattern.lastIndex;
  }

  return html + esc(source.slice(lastIndex));
};

const jsonForHtml = value => JSON.stringify(value).replaceAll("<", "\\u003c");
const withBase = path => (basePath + path).replace(/\/+/g, "/") || "/";
const hrefFor = route => withBase(routePath(route));

function adaptAssets(html, path) {
  const depth = path.split("/").filter(Boolean).length;
  if (!depth) return html;
  const prefix = "../".repeat(depth);
  return html
    .replaceAll('src="./assets/', 'src="' + prefix + 'assets/')
    .replaceAll('href="./assets/', 'href="' + prefix + 'assets/');
}

function homeMarkup(lang) {
  const c = copy[lang];
  const projects = selected[lang].map(project =>
    '<article><h3><a href="' +
    hrefFor({ kind: "detail", lang, detailKind: "project", slug: project.slug }) +
    '">' + esc(project.name) + '</a></h3><p>' + esc(project.description) +
    '</p><p>' + project.meta.map(esc).join(" · ") + '</p></article>'
  ).join("");

  const labItems = labs[lang].map(project =>
    '<article><h3><a href="' +
    hrefFor({ kind: "detail", lang, detailKind: "lab", slug: project.slug }) +
    '">' + esc(project.name) + '</a></h3><p>' + esc(project.description) +
    '</p><p><strong>' + (lang === "it" ? "Domanda: " : "Question: ") +
    '</strong>' + esc(project.question) + '</p><p>' + esc(project.state) + '</p></article>'
  ).join("");

  const faqItems = faqs[lang].map(item =>
    '<details><summary>' + esc(item.question) + '</summary><p>' + esc(item.answer) + '</p></details>'
  ).join("");

  return [
    '<div class="site-shell" data-prerendered="true">',
    '<header class="topbar topbar-home"><a class="wordmark wordmark-pill" href="#top" aria-label="EMPV home">EMPV</a><nav class="desktop-nav" aria-label="Primary navigation">',
    '<a href="#people"><span>', esc(c.nav.people), '</span></a>',
    '<a href="', esc(hrefFor({ kind: "sectionIndex", lang, section: "projects" })), '"><span>', esc(c.nav.work), '</span></a>',
    '<a href="', esc(hrefFor({ kind: "sectionIndex", lang, section: "lab" })), '"><span>', esc(c.nav.labs), '</span></a>',
    '<a href="#faq"><span>', esc(c.nav.faq), '</span></a>',
    '<a href="', esc(hrefFor({ kind: "notesIndex", lang })), '"><span>', esc(c.nav.notes), '</span></a>',
    '</nav></header>',
    '<main>',
    '<section class="hero" id="top"><div class="hero-inner">',
    '<div class="eyebrow">', esc(c.heroEyebrow), '</div>',
    '<h1><span>', esc(c.heroTitleA), '</span> <span class="outline">', esc(c.heroTitleB), '</span></h1>',
    '<div class="hero-bottom"><p>', esc(c.heroBody), '</p></div>',
    '</div></section>',
    '<section class="people section-pad" id="people"><div class="section-head"><div><div class="eyebrow">', esc(c.peopleLabel), '</div><h2>', esc(c.peopleTitle), '</h2></div></div>',
    '<div class="people-grid">',
    '<article class="person person-editorial"><div class="person-editorial-copy"><p class="role">', esc(c.enricoRole), '</p><h3><a class="person-profile-link" href="', esc(hrefFor({ kind: "businessCard", lang: "it", person: "enrico" })), '">Enrico Peruffo</a></h3><p class="person-description">', esc(c.enricoText), '</p></div></article>',
    '<article class="person person-editorial"><div class="person-editorial-copy"><p class="role">', esc(c.micheleRole), '</p><h3><a class="person-profile-link" href="', esc(hrefFor({ kind: "businessCard", lang: "it", person: "michele" })), '">Michele Valleri</a></h3><p class="person-description">', esc(c.micheleText), '</p></div></article>',
    '</div></section>',
    '<section class="work section-pad" id="work"><div class="section-head"><div><div class="eyebrow">', esc(c.selectedLabel), '</div><h2>', esc(c.selectedTitle), '</h2></div><p>', esc(c.selectedIntro), '</p></div>',
    '<div class="project-list">', projects, '</div></section>',
    '<section class="labs section-pad" id="labs"><div class="section-head labs-head"><div><div class="eyebrow">', esc(c.labsLabel), '</div><h2>', esc(c.labsTitle), '</h2></div><p>', esc(c.labsIntro), '</p></div>',
    '<div class="lab-list">', labItems, '</div><p class="labs-note">', esc(c.labsNote), '</p></section>',
    '<section class="faq section-pad" id="faq"><div class="faq-layout"><div class="faq-intro"><div class="eyebrow">', esc(c.faqLabel), '</div><h2>', esc(c.faqTitle), '</h2><p>', esc(c.faqIntro), '</p></div>',
    '<div class="faq-list">', faqItems, '</div></div></section>',
    '</main>',
    '<footer><div class="footer-mark">EMPV</div><div class="footer-meta"><div class="footer-column footer-identity"><strong>EMPV</strong><span>Systems · Products · AI · Research</span><span>',
    lang === "it" ? "Bergamo, Italia" : "Bergamo, Italy",
    '</span><span>© 2026 EMPV</span></div><div class="footer-column"><a href="mailto:hello@empv.it">hello@empv.it</a><a href="https://wa.me/393792438705">WhatsApp</a><a href="https://www.linkedin.com/company/emp26/">LinkedIn</a><a href="https://x.com/EMPV26">X / @EMPV26</a></div></div></footer>',
    '</div>'
  ].join("");
}

function detailMarkup(route) {
  const detail = getDetail(route.lang, route.slug);
  if (!detail) return "";
  const isIt = route.lang === "it";
  const homeHref = hrefFor({ kind: "home", lang: route.lang });
  const backHref = hrefFor({
    kind: "sectionIndex",
    lang: route.lang,
    section: detail.type === "project" ? "projects" : "lab"
  });
  const backLabel = detail.type === "project"
    ? (isIt ? "Torna ai progetti" : "Back to projects")
    : "AI Lab";
  const alternateLang = isIt ? "en" : "it";
  const alternateHref = hrefFor({
    kind: "detail",
    lang: alternateLang,
    detailKind: detail.type,
    slug: route.slug
  });
  const mainTitle = detail.type === "project" ? (detail.problemTitle || detail.title) : detail.title;
  const statusLabel = detail.type === "project"
    ? (isIt ? "Cosa abbiamo cambiato" : "What we changed")
    : detail.statusLabel;
  const statusText = detail.type === "project"
    ? (detail.solutionTitle || detail.status)
    : detail.status;

  const comparison = detail.comparison
    ? '<section class="detail-comparison section-pad"><article><div class="eyebrow">' +
      esc(detail.comparison.leftLabel) + '</div><h2>' + esc(detail.comparison.leftTitle) +
      '</h2><p>' + esc(detail.comparison.leftBody) +
      '</p></article><article><div class="eyebrow">' + esc(detail.comparison.rightLabel) +
      '</div><h2>' + esc(detail.comparison.rightTitle) + '</h2><p>' +
      esc(detail.comparison.rightBody) + '</p></article></section>'
    : "";

  const blocks = detail.blocks.map(block =>
    '<article class="detail-block"><div class="eyebrow">' + esc(block.label) +
    '</div><div class="detail-block-main"><h2>' + esc(block.title) + '</h2><p>' +
    esc(block.body) + '</p>' +
    (block.bullets ? '<ul>' + block.bullets.map(item => '<li>' + esc(item) + '</li>').join("") + '</ul>' : "") +
    '</div></article>'
  ).join("");

  return [
    '<div class="detail-shell" data-prerendered="true">',
    '<header class="topbar detail-topbar">',
    '<a class="wordmark" href="', esc(homeHref), '" aria-label="EMPV home">EMPV</a>',
    '<a class="detail-nav-back" href="', esc(backHref), '">', esc(backLabel), '</a>',
    '<a class="lang-switch" href="', esc(alternateHref), '" hreflang="', alternateLang, '">', alternateLang.toUpperCase(), '</a>',
    '</header>',
    '<main>',
    '<section class="detail-hero"><div class="detail-hero-inner">',
    '<div class="detail-kicker-row"><span class="eyebrow">EMPV / ',
    detail.type === "project" ? (isIt ? "Progetto" : "Project") : "AI Lab",
    '</span><span class="detail-index">', esc(detail.index), '</span></div>',
    '<div class="detail-title-wrap"><p class="detail-kicker">', esc(detail.kicker), '</p>',
    detail.type === "project" ? '<p class="detail-project-name">' + esc(detail.title) + '</p>' : "",
    '<h1>', esc(mainTitle), '</h1></div>',
    '<div class="detail-hero-bottom"><p class="detail-lead">', esc(detail.lead),
    '</p><div class="detail-status"><span>', esc(statusLabel), '</span><strong>',
    esc(statusText), '</strong></div></div>',
    '<div class="tags detail-tags">', detail.tags.map(tag => '<span>' + esc(tag) + '</span>').join(""), '</div>',
    '</div></section>',
    comparison,
    '<section class="detail-blocks section-pad">', blocks, '</section>',
    detail.boundary ? '<section class="detail-boundary section-pad"><div class="section-code">EMPV / NOTE</div><p>' + esc(detail.boundary) + '</p></section>' : "",
    '<section class="detail-end section-pad"><a href="', esc(backHref), '"><span>', esc(backLabel), '</span></a></section>',
    '</main></div>'
  ].join("");
}


function sectionIndexMarkup(route) {
  const lang = route.lang;
  const isProjects = route.section === "projects";
  const title = isProjects
    ? (lang === "it" ? "Progetti costruiti sui processi reali." : "Projects built around real operating processes.")
    : (lang === "it" ? "AI Lab: ipotesi trasformate in sistemi verificabili." : "AI Lab: turning hypotheses into verifiable systems.");
  const intro = isProjects
    ? (lang === "it"
      ? "Una raccolta dei sistemi realizzati da EMPV partendo da flussi di lavoro, strumenti, ruoli e vincoli già presenti nelle organizzazioni."
      : "A collection of systems built by EMPV around existing workflows, tools, roles and operating constraints.")
    : (lang === "it"
      ? "Linee di ricerca e prototipi sviluppati per capire quali idee AI reggono tecnicamente, operativamente e come prodotto."
      : "Research directions and prototypes used to test which AI ideas hold up technically, operationally and as products.");
  const alternateLang = lang === "it" ? "en" : "it";
  const items = isProjects ? selected[lang] : labs[lang];
  const rows = items.map(item => {
    if (isProjects) {
      return '<a class="project-row" href="' +
        esc(hrefFor({ kind: "detail", lang, detailKind: "project", slug: item.slug })) +
        '"><div class="project-row-identity"><span class="project-row-kind">' + esc(item.kind) +
        '</span><h3>' + esc(item.name) + '</h3></div><div class="project-row-content"><div class="project-row-description"><span>' +
        (lang === "it" ? "Cosa abbiamo costruito" : "What we built") + '</span><p>' + esc(item.description) +
        '</p></div><div class="project-row-tags">' + item.meta.map(meta => '<span>' + esc(meta) + '</span>').join("") +
        '</div></div></a>';
    }
    return '<a class="lab-row lab-register-row" href="' +
      esc(hrefFor({ kind: "detail", lang, detailKind: "lab", slug: item.slug })) +
      '"><div class="lab-index">' + esc(item.index) + '</div><div class="lab-identity"><span class="lab-kind">' +
      esc(item.kind) + '</span><h3>' + esc(item.name) + '</h3></div><div class="lab-content"><div class="lab-question"><span>' +
      (lang === "it" ? "Cosa stiamo testando" : "What we are testing") + '</span><strong>' + esc(item.question) +
      '</strong></div><div class="lab-evidence"><div class="lab-state"><span>' +
      (lang === "it" ? "Stato del repo" : "Repository state") + '</span><p>' + esc(item.state) +
      '</p></div><div class="lab-focus"><span>' + (lang === "it" ? "Focus corrente" : "Current focus") +
      '</span><p>' + esc(item.focus) + '</p></div></div></div></a>';
  }).join("");

  return [
    '<div class="detail-shell section-index-shell" data-prerendered="true">',
    '<header class="topbar detail-topbar">',
    '<a class="wordmark" href="', esc(hrefFor({ kind: "home", lang })), '" aria-label="EMPV home">EMPV</a>',
    '<a class="detail-nav-back" href="', esc(hrefFor({ kind: "home", lang })), '">',
    lang === "it" ? "Torna alla home" : "Back home",
    '</a>',
    '<a class="lang-switch" href="', esc(hrefFor({ kind: "sectionIndex", lang: alternateLang, section: route.section })), '" hreflang="', alternateLang, '">', alternateLang.toUpperCase(), '</a>',
    '</header><main>',
    '<section class="notes-index-hero"><div class="notes-index-hero-inner">',
    '<div class="eyebrow">EMPV / ', isProjects ? (lang === "it" ? "PROGETTI" : "PROJECTS") : "AI LAB", '</div>',
    '<h1>', esc(title), '</h1><p>', esc(intro), '</p>',
    '</div></section>',
    '<section class="', isProjects ? "work" : "labs", ' section-pad"><div class="', isProjects ? "project-list" : "lab-list", '">',
    rows,
    '</div></section></main>',
    '<footer><div class="footer-mark">EMPV</div><div class="footer-meta"><div class="footer-column footer-identity"><strong>EMPV</strong><span>Systems · Products · AI · Research</span><span>',
    lang === "it" ? "Bergamo, Italia" : "Bergamo, Italy",
    '</span><span>© 2026 EMPV</span></div><div class="footer-column"><a href="mailto:hello@empv.it">hello@empv.it</a><a href="https://wa.me/393792438705">WhatsApp</a><a href="https://www.linkedin.com/company/emp26/">LinkedIn</a><a href="https://x.com/EMPV26">X / @EMPV26</a></div></div></footer>',
    '</div>'
  ].join("");
}


function notesIndexMarkup(lang) {
  const intro = lang === "it"
    ? "Appunti tecnici e operativi su ciò che costruiamo, testiamo e impariamo: architetture, automazioni, AI locale, integrazioni e decisioni di prodotto."
    : "Technical and operational notes on what we build, test and learn: architectures, automation, local AI, integrations and product decisions.";
  const title = lang === "it"
    ? "Note su sistemi, AI e operazioni."
    : "Notes on systems, AI and operations.";

  const rows = researchNotes.map(note =>
    '<article><div class="eyebrow">NOTE / ' + esc(note.index) + ' · ' + esc(note.category[lang]) +
    '</div><h2><a href="' + hrefFor({ kind: "note", lang, noteId: note.id }) + '">' +
    esc(note.title[lang]) + '</a></h2><p>' + esc(note.dek[lang]) + '</p><p>' +
    esc(note.tags[lang].join(" · ")) + '</p></article>'
  ).join("");

  return [
    '<div class="detail-shell notes-shell" data-prerendered="true">',
    '<header class="topbar detail-topbar">',
    '<a class="wordmark" href="', esc(hrefFor({ kind: "home", lang })), '" aria-label="EMPV home">EMPV</a>',
    '<a class="detail-nav-back" href="', esc(hrefFor({ kind: "home", lang })), '">',
    lang === "it" ? "Torna alla home" : "Back home",
    '</a></header><main>',
    '<section class="notes-index-hero"><div class="notes-index-hero-inner">',
    '<div class="eyebrow">EMPV / RESEARCH NOTES</div><h1>', esc(title), '</h1><p>', esc(intro), '</p>',
    '</div></section><section class="notes-index-list section-pad"><div class="research-note-list">',
    rows,
    '</div></section></main></div>'
  ].join("");
}


function shareMarkup(route, note) {
  const url = canonical(route);
  const lang = route.lang;
  const title = note.title[lang] + " — EMPV Research Notes";
  const version = researchNoteSocialVersion(note);
  const sharedUrl = url + "?share=" + version;
  const linkedIn = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(sharedUrl);
  const x = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(sharedUrl);
  const whatsapp = "https://wa.me/?text=" + encodeURIComponent(title + " " + sharedUrl);

  return [
    '<section class="research-note-share section-pad" aria-label="', lang === "it" ? "Condividi questa Research Note" : "Share this Research Note", '">',
    '<div class="section-code">EMPV / ', lang === "it" ? "CONDIVIDI" : "SHARE", '</div>',
    '<div class="research-note-share-inner"><p>', lang === "it" ? "Condividi questa Research Note." : "Share this Research Note.", '</p>',
    '<div class="research-note-share-actions">',
    '<a class="research-note-share-primary" href="', esc(sharedUrl), '">', lang === "it" ? "Condividi" : "Share", '</a>',
    '<a href="', esc(linkedIn), '" target="_blank" rel="noreferrer noopener">LinkedIn</a>',
    '<a href="', esc(x), '" target="_blank" rel="noreferrer noopener">X</a>',
    '<a href="', esc(whatsapp), '" target="_blank" rel="noreferrer noopener">WhatsApp</a>',
    '<a href="', esc(sharedUrl), '">', lang === "it" ? "Copia link" : "Copy link", '</a>',
    '</div></div></section>'
  ].join("");
}

function noteMarkup(route) {
  const note = getResearchNoteById(route.noteId);
  if (!note) return "";
  const lang = route.lang;
  const alternateLang = lang === "it" ? "en" : "it";
  const blocks = note.sections[lang].map(section =>
    '<article class="detail-block research-note-block"><div class="eyebrow">' + esc(section.label) +
    '</div><div class="detail-block-main"><h2>' + esc(section.title) + '</h2><div class="research-note-copy">' +
    section.paragraphs.map(paragraph => '<p>' + inlineMarkup(paragraph) + '</p>').join("") + '</div>' +
    (section.bullets ? '<ul>' + section.bullets.map(item => '<li>' + inlineMarkup(item) + '</li>').join("") + '</ul>' : "") +
    '</div></article>'
  ).join("");

  return [
    '<div class="detail-shell notes-shell" data-prerendered="true">',
    '<header class="topbar detail-topbar">',
    '<a class="wordmark" href="', esc(hrefFor({ kind: "home", lang })), '" aria-label="EMPV home">EMPV</a>',
    '<a class="detail-nav-back" href="', esc(hrefFor({ kind: "notesIndex", lang })), '">Research Notes</a>',
    '<a class="lang-switch" href="', esc(hrefFor({ kind: "note", lang: alternateLang, noteId: note.id })), '" hreflang="', alternateLang, '">', alternateLang.toUpperCase(), '</a>',
    '</header><main>',
    '<section class="detail-hero research-note-hero"><div class="detail-hero-inner">',
    '<div class="detail-kicker-row"><span class="eyebrow">EMPV / RESEARCH NOTES</span><span class="detail-index">NOTE / ', esc(note.index), '</span></div>',
    '<div class="detail-title-wrap detail-title-project research-note-title"><p class="detail-kicker">', esc(note.category[lang]), '</p><h1>', esc(note.title[lang]), '</h1></div>',
    '<div class="detail-hero-bottom"><p class="detail-lead">', esc(note.dek[lang]), '</p><div class="detail-status"><span>',
    lang === "it" ? "Pubblicata" : "Published",
    '</span><strong>', esc(note.published), ' · ', esc(note.readingTime[lang]), '</strong></div></div>',
    '<div class="tags detail-tags">', note.tags[lang].map(tag => '<span>' + esc(tag) + '</span>').join(""), '</div>',
    '</div></section>',
    '<section class="detail-blocks section-pad research-note-blocks">', blocks, '</section>',
    '<section class="detail-boundary section-pad research-note-takeaway"><div class="section-code">EMPV / TAKEAWAY</div><p>', esc(note.takeaway[lang]), '</p></section>',
    shareMarkup(route, note),
    '<section class="detail-end section-pad"><a href="', esc(hrefFor({ kind: "notesIndex", lang })), '"><span>Research Notes</span></a></section>',
    '</main></div>'
  ].join("");
}

function businessCardMarkup(route) {
  const card = businessCards[route.person];
  const asset = path => withBase("/" + (path.startsWith("/") ? path.slice(1) : path));
  return [
    '<div class="business-card-shell business-card-shell--', esc(route.person), '" data-prerendered="true">',
    '<header class="business-card-topbar"><a class="business-card-brand" href="', esc(withBase("/it/")), '">EMPV</a><span>Digital business card</span></header>',
    '<main class="business-card-layout"><article class="business-card-panel">',
    '<div class="business-card-photo-wrap"><img class="business-card-photo" src="', esc(asset(card.photo)), '" alt="', esc(card.name), '" /></div>',
    '<div class="business-card-identity"><span class="business-card-kicker">EMPV / CONTACT</span><h1>', esc(card.name), '</h1><p class="business-card-role">', esc(card.role), '</p><p class="business-card-description">', esc(card.description), '</p></div>',
    '<div class="business-card-actions">',
    '<a class="business-card-action business-card-action--primary" href="', esc(asset(card.vcard)), '"><span>Salva contatto</span></a>',
    '<a class="business-card-action" href="', esc(card.whatsapp), '"><span>WhatsApp</span></a>',
    '<a class="business-card-action" href="mailto:', esc(card.email), '"><span>', esc(card.email), '</span></a>',
    '<a class="business-card-action" href="', esc(card.linkedin), '"><span>LinkedIn</span></a>',
    '<a class="business-card-action" href="', esc(card.x), '"><span>X / @EMPV26</span></a>',
    '<a class="business-card-action" href="', esc(card.website), '"><span>Visita EMPV</span></a>',
    '</div>',
    '<div class="business-card-footer"><div><span>EMPV</span><strong>Systems · Products · AI · Research</strong></div><a href="', esc(card.website), '">empv.it</a></div>',
    '</article><aside class="business-card-qr-panel"><div class="business-card-qr-frame"><img src="', esc(asset(card.qr)), '" alt="QR code per ', esc(card.name), '" /></div><div><span>QR personale</span><p>Scansiona per aprire questa e-card su un altro dispositivo.</p></div><small>', esc(card.url.replace("https://", "")), '</small></aside>',
    '</main></div>'
  ].join("");
}

function legalMarkup(route) {
  const pageCopy = copyFor(route);
  return '<div class="detail-shell" data-prerendered="true"><main class="detail-not-found"><div class="eyebrow">EMPV</div><h1>' +
    esc(pageCopy.title.replace(/\s*\|\s*EMPV$/, "")) + '</h1><p>' +
    esc(pageCopy.description) + '</p></main></div>';
}

function staticMarkup(route) {
  if (route.kind === "home") return homeMarkup(route.lang);
  if (route.kind === "businessCard") return businessCardMarkup(route);
  if (route.kind === "detail") return detailMarkup(route);
  if (route.kind === "sectionIndex") return sectionIndexMarkup(route);
  if (route.kind === "notesIndex") return notesIndexMarkup(route.lang);
  if (route.kind === "note") return noteMarkup(route);
  return legalMarkup(route);
}

function structuredData(route) {
  const pageCopy = copyFor(route);
  const url = canonical(route);
  const orgId = siteUrl + "/#organization";
  const websiteId = siteUrl + "/#website";
  const enricoId = siteUrl + "/#enrico-peruffo";
  const micheleId = siteUrl + "/#michele-valleri";

  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: "EMPV",
      url: siteUrl,
      email: "hello@empv.it",
      telephone: "+39 379 243 8705",
      logo: {
        "@type": "ImageObject",
        "@id": siteUrl + "/#logo",
        url: siteUrl + "/favicon-96x96.png",
        contentUrl: siteUrl + "/favicon-96x96.png",
        width: 96,
        height: 96
      },
      image: { "@id": siteUrl + "/#logo" },
      sameAs: ["https://www.linkedin.com/company/emp26/", "https://x.com/EMPV26"],
      address: { "@type": "PostalAddress", addressLocality: "Bergamo", addressCountry: "IT" },
      member: [{ "@id": enricoId }, { "@id": micheleId }]
    },
    {
      "@type": "Person",
      "@id": enricoId,
      name: "Enrico Peruffo",
      jobTitle: copy[route.lang].enricoRole,
      memberOf: { "@id": orgId }
    },
    {
      "@type": "Person",
      "@id": micheleId,
      name: "Michele Valleri",
      jobTitle: copy[route.lang].micheleRole,
      memberOf: { "@id": orgId }
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "EMPV",
      url: siteUrl,
      inLanguage: ["it", "en"],
      publisher: { "@id": orgId }
    },
    {
      "@type": "WebPage",
      "@id": url + "#webpage",
      url,
      name: pageCopy.title,
      description: pageCopy.description,
      inLanguage: route.lang,
      isPartOf: { "@id": websiteId },
      about: { "@id": orgId }
    }
  ];

  if (route.kind === "businessCard") {
    const card = businessCards[route.person];
    const personId = route.person === "enrico" ? enricoId : micheleId;
    graph.push({
      "@type": "ProfilePage",
      "@id": url + "#profile",
      url,
      name: pageCopy.title,
      description: pageCopy.description,
      inLanguage: route.lang,
      mainEntity: { "@id": personId },
      isPartOf: { "@id": websiteId }
    });
    graph.push({
      "@type": "ContactPoint",
      "@id": url + "#contact",
      contactType: "business",
      email: card.email,
      telephone: card.phone,
      url: card.url
    });
  }

  if (route.kind === "home") {
    graph.push({
      "@type": "FAQPage",
      "@id": url + "#faq",
      mainEntity: faqs[route.lang].map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer }
      }))
    });
  }

  if (route.kind === "detail") {
    const detail = getDetail(route.lang, route.slug);
    if (detail) {
      graph.push({
        "@type": "CreativeWork",
        "@id": url + "#work",
        name: detail.title,
        description: pageCopy.description,
        url,
        inLanguage: route.lang,
        creator: { "@id": orgId },
        keywords: detail.tags,
        isPartOf: { "@id": websiteId }
      });
      const parentSection = detail.type === "project" ? "projects" : "lab";
      const parentName = detail.type === "project"
        ? (route.lang === "it" ? "Progetti" : "Projects")
        : "AI Lab";
      graph.push({
        "@type": "BreadcrumbList",
        "@id": url + "#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "EMPV",
            item: canonical({ kind: "home", lang: route.lang })
          },
          {
            "@type": "ListItem",
            position: 2,
            name: parentName,
            item: canonical({ kind: "sectionIndex", lang: route.lang, section: parentSection })
          },
          {
            "@type": "ListItem",
            position: 3,
            name: detail.title,
            item: url
          }
        ]
      });
    }
  }

  if (route.kind === "sectionIndex") {
    const items = route.section === "projects" ? selected[route.lang] : labs[route.lang];
    const detailKind = route.section === "projects" ? "project" : "lab";
    graph.push({
      "@type": "CollectionPage",
      "@id": url + "#collection",
      name: pageCopy.title,
      description: pageCopy.description,
      url,
      inLanguage: route.lang,
      isPartOf: { "@id": websiteId },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebPage",
            "@id": canonical({ kind: "detail", lang: route.lang, detailKind, slug: item.slug }) + "#webpage",
            name: item.name,
            url: canonical({ kind: "detail", lang: route.lang, detailKind, slug: item.slug })
          }
        }))
      }
    });
  }

  if (route.kind === "notesIndex") {
    graph.push({
      "@type": "CollectionPage",
      "@id": url + "#collection",
      name: pageCopy.title,
      description: pageCopy.description,
      url,
      inLanguage: route.lang,
      isPartOf: { "@id": websiteId },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: researchNotes.map((note, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebPage",
            "@id": canonical({ kind: "note", lang: route.lang, noteId: note.id }) + "#webpage",
            name: note.title[route.lang],
            url: canonical({ kind: "note", lang: route.lang, noteId: note.id })
          }
        }))
      }
    });
  }

  if (route.kind === "note") {
    const note = getResearchNoteById(route.noteId);
    if (note) {
      graph.push({
        "@type": "Article",
        "@id": url + "#article",
        headline: note.title[route.lang],
        description: note.dek[route.lang],
        datePublished: note.published,
        dateModified: note.updated || note.published,
        inLanguage: route.lang,
        keywords: note.tags[route.lang],
        image: {
          "@type": "ImageObject",
          url: siteUrl + researchNoteSocialImage(note, route.lang),
          width: 1200,
          height: 630
        },
        mainEntityOfPage: { "@id": url + "#webpage" },
        author: [{ "@id": enricoId }, { "@id": micheleId }],
        publisher: { "@id": orgId }
      });
    }
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function inject(html, route) {
  const pageCopy = copyFor(route);
  const url = canonical(route);
  const it = canonical({ ...route, lang: "it" });
  const en = canonical({ ...route, lang: "en" });
  const robots = route.kind === "legal" ? "noindex,follow" : "index,follow,max-image-preview:large";
  const card = route.kind === "businessCard" ? businessCards[route.person] : null;
  const note = route.kind === "note" ? getResearchNoteById(route.noteId) : null;
  const shareBase = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
  const shareImage = card
    ? shareBase + "/" + card.photo
    : note
      ? shareBase + researchNoteSocialImage(note, route.lang)
      : null;
  const shareImageType = shareImage?.toLowerCase().endsWith(".jpg") || shareImage?.toLowerCase().endsWith(".jpeg")
    ? "image/jpeg"
    : "image/png";
  const shareImageAlt = card
    ? card.name
    : note
      ? note.title[route.lang]
      : "EMPV";

  html = html
    .replace(/\s*<meta name="robots"[^>]*>/g, "")
    .replace(/\s*<link rel="canonical"[^>]*>/g, "")
    .replace(/\s*<link rel="alternate"[^>]*>/g, "")
    .replace(/\s*<meta property="og:[^>]*>/g, "")
    .replace(/\s*<meta name="twitter:[^>]*>/g, "")
    .replace(/\s*<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, "");

  html = html.replace(/<html lang="[^"]*">/, '<html lang="' + route.lang + '">');
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>' + esc(pageCopy.title) + '</title>');
  html = html.replace(/<meta name="description"[^>]*>/, '<meta name="description" content="' + esc(pageCopy.description) + '" />');

  const headParts = [
    '    <meta name="robots" content="' + robots + '" />',
    '    <link rel="canonical" href="' + url + '" />'
  ];
  if (route.kind !== "businessCard") {
    headParts.push(
      '    <link rel="alternate" hreflang="it" href="' + it + '" />',
      '    <link rel="alternate" hreflang="en" href="' + en + '" />',
      '    <link rel="alternate" hreflang="x-default" href="' + it + '" />'
    );
  }
  headParts.push(
    '    <link rel="describedby" href="' + siteUrl + '/llms.txt" type="text/markdown" />',
    '    <meta property="og:title" content="' + esc(pageCopy.title) + '" />',
    '    <meta property="og:description" content="' + esc(pageCopy.description) + '" />',
    '    <meta property="og:type" content="' + (route.kind === "businessCard" ? "profile" : route.kind === "detail" || route.kind === "note" ? "article" : "website") + '" />',
    '    <meta property="og:url" content="' + url + '" />',
    '    <meta property="og:site_name" content="EMPV" />',
    '    <meta property="og:locale" content="' + (route.lang === "it" ? "it_IT" : "en_GB") + '" />'
  );
  if (shareImage) {
    headParts.push(
      '    <meta property="og:image" content="' + shareImage + '" />',
      '    <meta property="og:image:url" content="' + shareImage + '" />',
      '    <meta property="og:image:secure_url" content="' + shareImage + '" />',
      '    <meta property="og:image:type" content="' + shareImageType + '" />',
      '    <meta property="og:image:width" content="1200" />',
      '    <meta property="og:image:height" content="630" />',
      '    <meta property="og:image:alt" content="' + esc(shareImageAlt) + '" />'
    );
  }
  headParts.push(
    '    <meta name="twitter:card" content="' + (shareImage ? "summary_large_image" : "summary") + '" />',
    '    <meta name="twitter:site" content="@EMPV26" />',
    '    <meta name="twitter:title" content="' + esc(pageCopy.title) + '" />',
    '    <meta name="twitter:description" content="' + esc(pageCopy.description) + '" />'
  );
  if (shareImage) {
    headParts.push(
      '    <meta name="twitter:image" content="' + shareImage + '" />',
      '    <meta name="twitter:image:alt" content="' + esc(shareImageAlt) + '" />'
    );
  }
  headParts.push(
    '    <script type="application/ld+json">' + jsonForHtml(structuredData(route)) + '</script>',
    '  </head>'
  );
  const head = headParts.join("\n");

  html = html.replace("</head>", head);
  html = html.replace('<div id="root"></div>', '<div id="root">' + staticMarkup(route) + '</div>');
  return adaptAssets(html, routePath(route));
}

const routes = [
  { kind: "home", lang: "it" },
  { kind: "home", lang: "en" },
  { kind: "businessCard", lang: "it", person: "enrico" },
  { kind: "businessCard", lang: "it", person: "michele" }
];
for (const lang of ["it", "en"]) {
  routes.push({ kind: "sectionIndex", lang, section: "projects" });
  routes.push({ kind: "sectionIndex", lang, section: "lab" });
  routes.push({ kind: "notesIndex", lang });
}
for (const note of researchNotes) {
  for (const lang of ["it", "en"]) routes.push({ kind: "note", lang, noteId: note.id });
}
for (const [slug, item] of Object.entries(manifest.details)) {
  for (const lang of ["it", "en"]) routes.push({ kind: "detail", lang, detailKind: item.type, slug });
}
for (const slug of ["privacy", "cookies", "legal"]) {
  for (const lang of ["it", "en"]) routes.push({ kind: "legal", lang, slug });
}

for (const route of routes) {
  const path = routePath(route);
  const dir = join(new URL("../dist/", import.meta.url).pathname, path.replace(/^\//, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), inject(template, route), "utf8");
}

await writeFile(new URL("../dist/index.html", import.meta.url), inject(template, { kind: "home", lang: "it" }), "utf8");
await copyFile(new URL("../dist/index.html", import.meta.url), new URL("../dist/404.html", import.meta.url));

const indexable = routes.filter(route => route.kind !== "legal");
const latestResearchNoteDate = researchNotes
  .map(note => note.updated || note.published)
  .filter(Boolean)
  .sort()
  .at(-1);

function sitemapLastmod(route) {
  if (route.kind === "note") {
    const note = getResearchNoteById(route.noteId);
    return note?.updated || note?.published || null;
  }
  if (route.kind === "notesIndex") return latestResearchNoteDate || null;
  return null;
}

const urls = indexable.map(route => {
  const loc = canonical(route);
  const lastmod = sitemapLastmod(route);
  const lastmodLine = lastmod ? '    <lastmod>' + xml(lastmod) + '</lastmod>\n' : '';
  if (route.kind === "businessCard") {
    return '  <url>\n    <loc>' + loc + '</loc>\n' + lastmodLine + '  </url>';
  }
  const it = canonical({ ...route, lang: "it" });
  const en = canonical({ ...route, lang: "en" });
  return '  <url>\n    <loc>' + loc + '</loc>\n' +
    lastmodLine +
    '    <xhtml:link rel="alternate" hreflang="it" href="' + it + '" />\n' +
    '    <xhtml:link rel="alternate" hreflang="en" href="' + en + '" />\n' +
    '    <xhtml:link rel="alternate" hreflang="x-default" href="' + it + '" />\n  </url>';
}).join("\n");

await writeFile(
  new URL("../dist/sitemap.xml", import.meta.url),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls + '\n</urlset>\n',
  "utf8"
);

await writeFile(
  new URL("../dist/robots.txt", import.meta.url),
  [
    "User-agent: OAI-SearchBot",
    "Allow: /",
    "",
    "User-agent: Claude-SearchBot",
    "Allow: /",
    "",
    "User-agent: PerplexityBot",
    "Allow: /",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    "Sitemap: " + siteUrl + "/sitemap.xml",
    ""
  ].join("\n"),
  "utf8"
);

const llmsLines = [
  "# EMPV",
  "",
  "> EMPV is the bilingual portfolio of Enrico Peruffo and Michele Valleri in Bergamo, Italy. It documents systems, products, automation, AI and applied research built around business workflows and operating constraints.",
  "",
  "EMPV starts from people, handoffs, tools, data, constraints and decisions inside a workflow. The public site separates delivered projects from AI Lab research and keeps claims evidence-led.",
  "",
  "## Primary",
  "",
  "- [EMPV — Italiano](" + siteUrl + "/it/): Progetti, team, AI Lab e FAQ in italiano.",
  "- [EMPV — English](" + siteUrl + "/en/): Projects, team, AI Lab and FAQ in English.",
  "- [Progetti — Italiano](" + siteUrl + "/it/progetti/): Indice dei progetti EMPV.",
  "- [Projects — English](" + siteUrl + "/en/projects/): EMPV project index.",
  "- [AI Lab — Italiano](" + siteUrl + "/it/lab/): Indice delle linee di ricerca e dei prototipi AI.",
  "- [AI Lab — English](" + siteUrl + "/en/lab/): AI research and prototype index.",
  "",
  "## Projects"
];

for (const project of selected.it) {
  llmsLines.push("- [" + project.name + "](" + siteUrl + "/it/progetti/" + project.slug + "/): " + project.description);
}
for (const project of selected.en) {
  llmsLines.push("- [" + project.name + "](" + siteUrl + "/en/projects/" + project.slug + "/): " + project.description);
}

llmsLines.push("", "## AI Lab", "");
for (const lab of labs.it) {
  llmsLines.push("- [" + lab.name + " — IT](" + siteUrl + "/it/lab/" + lab.slug + "/): " + lab.description);
}
for (const lab of labs.en) {
  llmsLines.push("- [" + lab.name + " — EN](" + siteUrl + "/en/lab/" + lab.slug + "/): " + lab.description);
}

llmsLines.push("", "## Research Notes", "");
for (const note of researchNotes) {
  llmsLines.push("- [" + note.title.it + " — IT](" + siteUrl + routePath({ kind: "note", lang: "it", noteId: note.id }) + "): " + note.dek.it);
  llmsLines.push("- [" + note.title.en + " — EN](" + siteUrl + routePath({ kind: "note", lang: "en", noteId: note.id }) + "): " + note.dek.en);
}

llmsLines.push(
  "",
  "## People",
  "",
  "- [Enrico Peruffo — AI Systems & Architecture](" + siteUrl + "/enrico/): digital business card and contact details.",
  "- [Michele Valleri — AI Product & Process Design](" + siteUrl + "/michele/): digital business card and contact details.",
  "",
  "## Contact",
  "",
  "- [LinkedIn](https://www.linkedin.com/company/emp26/): EMPV company profile.",
  "- [X](https://x.com/EMPV26): EMPV profile on X.",
  "- Email: hello@empv.it",
  "- WhatsApp: +39 379 243 8705",
  "",
  "## Discovery",
  "",
  "- [Sitemap](" + siteUrl + "/sitemap.xml): Indexable localized pages.",
  "- [Robots](" + siteUrl + "/robots.txt): Crawler access rules.",
  ""
);

await writeFile(
  new URL("../dist/favicon-96x96.png", import.meta.url),
  Buffer.from(faviconPngBase64, "base64")
);

await writeFile(
  new URL("../dist/llms.txt", import.meta.url),
  llmsLines.join("\n"),
  "utf8"
);

console.log("SEO/GEO build: generated " + routes.length + " localized routes with static HTML, JSON-LD and llms.txt");
