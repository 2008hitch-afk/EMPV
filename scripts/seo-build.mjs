import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { join } from "node:path";

const manifest = JSON.parse(await readFile(new URL("../src/seo-manifest.json", import.meta.url), "utf8"));
const template = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const siteUrl = `${manifest.siteOrigin}${manifest.basePath}`;

function routePath(route) {
  if (route.kind === "home") return `/${route.lang}/`;
  if (route.kind === "detail") {
    const segment = route.detailKind === "project" ? (route.lang === "it" ? "progetti" : "projects") : "lab";
    return `/${route.lang}/${segment}/${route.slug}/`;
  }
  if (route.slug === "privacy") return `/${route.lang}/privacy/`;
  if (route.slug === "cookies") return `/${route.lang}/cookie-storage/`;
  return route.lang === "it" ? "/it/note-legali/" : "/en/legal-notice/";
}
const canonical = route => `${siteUrl}${routePath(route)}`;
const copyFor = route => route.kind === "home" ? manifest.home[route.lang] : route.kind === "detail" ? manifest.details[route.slug][route.lang] : manifest.legal[route.slug][route.lang];
const esc = s => s.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");

function adaptAssets(html, path) {
  const depth = path.split("/").filter(Boolean).length;
  if (!depth) return html;
  const prefix = "../".repeat(depth);
  return html.replaceAll('src="./assets/', `src="${prefix}assets/`).replaceAll('href="./assets/', `href="${prefix}assets/`);
}

function inject(html, route) {
  const copy = copyFor(route);
  const url = canonical(route);
  const it = canonical({ ...route, lang:"it" });
  const en = canonical({ ...route, lang:"en" });
  const robots = route.kind === "legal" ? "noindex,follow" : "index,follow,max-image-preview:large";
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${route.lang}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(copy.title)}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(copy.description)}" />`);
  html = html.replace("</head>", [
    `    <meta name="robots" content="${robots}" />`,
    `    <link rel="canonical" href="${url}" />`,
    `    <link rel="alternate" hreflang="it" href="${it}" />`,
    `    <link rel="alternate" hreflang="en" href="${en}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${it}" />`,
    `    <meta property="og:title" content="${esc(copy.title)}" />`,
    `    <meta property="og:description" content="${esc(copy.description)}" />`,
    `    <meta property="og:type" content="${route.kind === "detail" ? "article" : "website"}" />`,
    `    <meta property="og:url" content="${url}" />`,
    '    <meta property="og:site_name" content="EMPV" />',
    `    <meta property="og:locale" content="${route.lang === "it" ? "it_IT" : "en_GB"}" />`,
    '    <meta name="twitter:card" content="summary" />',
    `    <meta name="twitter:title" content="${esc(copy.title)}" />`,
    `    <meta name="twitter:description" content="${esc(copy.description)}" />`,
    "  </head>"
  ].join("\n"));
  return adaptAssets(html, routePath(route));
}

const routes=[{kind:"home",lang:"it"},{kind:"home",lang:"en"}];
for (const [slug,item] of Object.entries(manifest.details)) for (const lang of ["it","en"]) routes.push({kind:"detail",lang,detailKind:item.type,slug});
for (const slug of ["privacy","cookies","legal"]) for (const lang of ["it","en"]) routes.push({kind:"legal",lang,slug});

for (const route of routes) {
  const path=routePath(route);
  const dir=join(new URL("../dist/",import.meta.url).pathname,path.replace(/^\//,""));
  await mkdir(dir,{recursive:true});
  await writeFile(join(dir,"index.html"),inject(template,route),"utf8");
}
await writeFile(new URL("../dist/index.html",import.meta.url),inject(template,{kind:"home",lang:"it"}),"utf8");
await copyFile(new URL("../dist/index.html",import.meta.url),new URL("../dist/404.html",import.meta.url));

const indexable=routes.filter(r=>r.kind!=="legal");
const urls=indexable.map(route=>{
  const loc=canonical(route),it=canonical({...route,lang:"it"}),en=canonical({...route,lang:"en"});
  return `  <url>\n    <loc>${loc}</loc>\n    <xhtml:link rel="alternate" hreflang="it" href="${it}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${en}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${it}" />\n  </url>`;
}).join("\n");
await writeFile(new URL("../dist/sitemap.xml",import.meta.url),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,"utf8");
await writeFile(new URL("../dist/robots.txt",import.meta.url),`User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,"utf8");
console.log(`SEO build: generated ${routes.length} localized routes`);
