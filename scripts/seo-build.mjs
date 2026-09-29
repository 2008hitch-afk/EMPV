import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { join } from "node:path";
import ts from "typescript";

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
const copy = homeContent.copy;
const selected = homeContent.selected;
const faqs = homeContent.faqs;
const labs = homeContent.labs;
const getDetail = detailContent.getDetail;

function routePath(route) {
  if (route.kind === "home") return "/" + route.lang + "/";
  if (route.kind === "detail") {
    const segment = route.detailKind === "project" ? (route.lang === "it" ? "progetti" : "projects") : "lab";
    return "/" + route.lang + "/" + segment + "/" + route.slug + "/";
  }
  if (route.slug === "privacy") return "/" + route.lang + "/privacy/";
  if (route.slug === "cookies") return "/" + route.lang + "/cookie-storage/";
  return route.lang === "it" ? "/it/note-legali/" : "/en/legal-notice/";
}

const canonical = route => siteUrl + routePath(route);
const copyFor = route => route.kind === "home"
  ? manifest.home[route.lang]
  : route.kind === "detail"
    ? manifest.details[route.slug][route.lang]
    : manifest.legal[route.slug][route.lang];

const esc = value => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

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
    '<main>',
    '<section class="hero" id="top"><div class="hero-inner">',
    '<div class="eyebrow">', esc(c.heroEyebrow), '</div>',
    '<h1><span>', esc(c.heroTitleA), '</span> <span class="outline">', esc(c.heroTitleB), '</span></h1>',
    '<div class="hero-bottom"><p>', esc(c.heroBody), '</p></div>',
    '</div></section>',
    '<section class="people section-pad" id="people"><div class="section-head"><div><div class="eyebrow">', esc(c.peopleLabel), '</div><h2>', esc(c.peopleTitle), '</h2></div></div>',
    '<div class="people-grid">',
    '<article class="person person-editorial"><div class="person-editorial-copy"><p class="role">', esc(c.enricoRole), '</p><h3>Enrico Peruffo</h3><p class="person-description">', esc(c.enricoText), '</p></div></article>',
    '<article class="person person-editorial"><div class="person-editorial-copy"><p class="role">', esc(c.micheleRole), '</p><h3>Michele Valleri</h3><p class="person-description">', esc(c.micheleText), '</p></div></article>',
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
    '</span><span>© 2026 EMPV</span></div><div class="footer-column"><a href="mailto:hello@empv.it">hello@empv.it</a><a href="https://wa.me/393792438705">WhatsApp</a><a href="https://www.linkedin.com/company/emp26/">LinkedIn</a></div></div></footer>',
    '</div>'
  ].join("");
}

function detailMarkup(route) {
  const detail = getDetail(route.lang, route.slug);
  if (!detail) return "";
  const isIt = route.lang === "it";
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
    '<div class="detail-shell" data-prerendered="true"><main>',
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
  if (route.kind === "detail") return detailMarkup(route);
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
      sameAs: ["https://www.linkedin.com/company/emp26/"],
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

  const head = [
    '    <meta name="robots" content="' + robots + '" />',
    '    <link rel="canonical" href="' + url + '" />',
    '    <link rel="alternate" hreflang="it" href="' + it + '" />',
    '    <link rel="alternate" hreflang="en" href="' + en + '" />',
    '    <link rel="alternate" hreflang="x-default" href="' + it + '" />',
    '    <link rel="describedby" href="' + siteUrl + '/llms.txt" type="text/markdown" />',
    '    <meta property="og:title" content="' + esc(pageCopy.title) + '" />',
    '    <meta property="og:description" content="' + esc(pageCopy.description) + '" />',
    '    <meta property="og:type" content="' + (route.kind === "detail" ? "article" : "website") + '" />',
    '    <meta property="og:url" content="' + url + '" />',
    '    <meta property="og:site_name" content="EMPV" />',
    '    <meta property="og:locale" content="' + (route.lang === "it" ? "it_IT" : "en_GB") + '" />',
    '    <meta name="twitter:card" content="summary" />',
    '    <meta name="twitter:title" content="' + esc(pageCopy.title) + '" />',
    '    <meta name="twitter:description" content="' + esc(pageCopy.description) + '" />',
    '    <script type="application/ld+json">' + jsonForHtml(structuredData(route)) + '</script>',
    '  </head>'
  ].join("\n");

  html = html.replace("</head>", head);
  html = html.replace('<div id="root"></div>', '<div id="root">' + staticMarkup(route) + '</div>');
  return adaptAssets(html, routePath(route));
}

const routes = [{ kind: "home", lang: "it" }, { kind: "home", lang: "en" }];
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
const urls = indexable.map(route => {
  const loc = canonical(route);
  const it = canonical({ ...route, lang: "it" });
  const en = canonical({ ...route, lang: "en" });
  return '  <url>\n    <loc>' + loc + '</loc>\n' +
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
  "> EMPV is the bilingual portfolio of Enrico Peruffo and Michele Valleri in Bergamo, Italy. It documents systems, products, automation, AI and applied research built around real operational processes.",
  "",
  "EMPV starts from how work is actually performed: people, handoffs, tools, data, constraints and decisions. The public site separates delivered projects from AI Lab research and keeps claims evidence-led.",
  "",
  "## Primary",
  "",
  "- [EMPV — Italiano](" + siteUrl + "/it/): Progetti, team, AI Lab e FAQ in italiano.",
  "- [EMPV — English](" + siteUrl + "/en/): Projects, team, AI Lab and FAQ in English.",
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

llmsLines.push(
  "",
  "## People",
  "",
  "- Enrico Peruffo — AI & Systems Engineering.",
  "- Michele Valleri — Product & Process Design.",
  "",
  "## Contact",
  "",
  "- [LinkedIn](https://www.linkedin.com/company/emp26/): EMPV company profile.",
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
