import { useEffect } from "react";
import manifest from "./seo-manifest.json";
import type { SiteLang } from "./detailContent";

export type LegalSlug = "privacy" | "cookies" | "legal";
export type DetailKind = "project" | "lab";

export type SiteRoute =
  | { kind: "home"; lang: SiteLang }
  | { kind: "detail"; lang: SiteLang; detailKind: DetailKind; slug: string }
  | { kind: "legal"; lang: SiteLang; slug: LegalSlug };

const projectSlugs = new Set(Object.entries(manifest.details).filter(([, v]) => v.type === "project").map(([slug]) => slug));
const labSlugs = new Set(Object.entries(manifest.details).filter(([, v]) => v.type === "lab").map(([slug]) => slug));

export const SITE_URL = `${manifest.siteOrigin}${manifest.basePath}`;

export function routePath(route: SiteRoute): string {
  if (route.kind === "home") return `/${route.lang}/`;
  if (route.kind === "detail") {
    const segment = route.detailKind === "project" ? (route.lang === "it" ? "progetti" : "projects") : "lab";
    return `/${route.lang}/${segment}/${route.slug}/`;
  }
  if (route.slug === "privacy") return `/${route.lang}/privacy/`;
  if (route.slug === "cookies") return `/${route.lang}/cookie-storage/`;
  return route.lang === "it" ? "/it/note-legali/" : "/en/legal-notice/";
}

function runtimeBasePrefix(): string {
  const pathname = window.location.pathname;
  const langMatch = pathname.match(/\/(?:it|en)(?:\/|$)/);
  if (langMatch?.index !== undefined) return pathname.slice(0, langMatch.index + 1);
  if (pathname.endsWith("/index.html")) return pathname.slice(0, -"index.html".length);
  if (pathname.endsWith("/")) return pathname;
  return pathname.slice(0, pathname.lastIndexOf("/") + 1);
}

export function siteHref(route: SiteRoute): string {
  const prefix = runtimeBasePrefix().replace(/\/$/, "");
  return `${prefix}${routePath(route)}`.replace(/\/+/g, "/");
}

export function siteAssetHref(path: string): string {
  const prefix = runtimeBasePrefix().replace(/\/$/, "");
  return `${prefix}/${path.replace(/^\/+/, "")}`.replace(/\/+/g, "/");
}

export function canonicalUrl(route: SiteRoute): string {
  return `${SITE_URL}${routePath(route)}`;
}

export function parseCurrentRoute(): SiteRoute {
  const params = new URLSearchParams(window.location.search);
  const queryLang: SiteLang = params.get("lang") === "en" ? "en" : "it";
  const clean = window.location.pathname.replace(/\/index\.html$/, "/").replace(/\/+$/, "");
  const langMatch = clean.match(/\/(it|en)(?:\/|$)/);

  if (langMatch?.index !== undefined) {
    const lang = langMatch[1] as SiteLang;
    const local = clean.slice(langMatch.index + langMatch[0].length - 1);
    const parts = local.split("/").filter(Boolean);
    if (!parts.length) return { kind: "home", lang };
    if ((parts[0] === "progetti" || parts[0] === "projects") && parts[1] && projectSlugs.has(parts[1])) {
      return { kind: "detail", lang, detailKind: "project", slug: parts[1] };
    }
    if (parts[0] === "lab" && parts[1] && labSlugs.has(parts[1])) {
      return { kind: "detail", lang, detailKind: "lab", slug: parts[1] };
    }
    if (parts[0] === "privacy") return { kind: "legal", lang, slug: "privacy" };
    if (parts[0] === "cookie-storage") return { kind: "legal", lang, slug: "cookies" };
    if (parts[0] === "note-legali" || parts[0] === "legal-notice") return { kind: "legal", lang, slug: "legal" };
    return { kind: "home", lang };
  }

  const project = params.get("project");
  if (project && projectSlugs.has(project)) return { kind: "detail", lang: queryLang, detailKind: "project", slug: project };
  const lab = params.get("lab");
  if (lab && labSlugs.has(lab)) return { kind: "detail", lang: queryLang, detailKind: "lab", slug: lab };
  const legal = params.get("legal");
  if (legal === "privacy" || legal === "cookies" || legal === "legal") return { kind: "legal", lang: queryLang, slug: legal };
  return { kind: "home", lang: queryLang };
}

function copyFor(route: SiteRoute): { title: string; description: string } {
  if (route.kind === "home") return manifest.home[route.lang];
  if (route.kind === "detail") {
    const item = manifest.details[route.slug as keyof typeof manifest.details];
    return item?.[route.lang] ?? manifest.home[route.lang];
  }
  return manifest.legal[route.slug][route.lang];
}

function meta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function link(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) { el = document.createElement("link"); document.head.appendChild(el); }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

export function applySeo(route: SiteRoute) {
  const copy = copyFor(route);
  const canonical = canonicalUrl(route);
  const it = canonicalUrl({ ...route, lang: "it" } as SiteRoute);
  const en = canonicalUrl({ ...route, lang: "en" } as SiteRoute);
  document.documentElement.lang = route.lang;
  document.title = copy.title;

  meta('meta[name="description"]', { name: "description", content: copy.description });
  meta('meta[name="robots"]', { name: "robots", content: route.kind === "legal" ? "noindex,follow" : "index,follow,max-image-preview:large" });
  link('link[rel="canonical"]', { rel: "canonical", href: canonical });
  link('link[rel="alternate"][hreflang="it"]', { rel: "alternate", hreflang: "it", href: it });
  link('link[rel="alternate"][hreflang="en"]', { rel: "alternate", hreflang: "en", href: en });
  link('link[rel="alternate"][hreflang="x-default"]', { rel: "alternate", hreflang: "x-default", href: it });

  meta('meta[property="og:title"]', { property: "og:title", content: copy.title });
  meta('meta[property="og:description"]', { property: "og:description", content: copy.description });
  meta('meta[property="og:type"]', { property: "og:type", content: route.kind === "detail" ? "article" : "website" });
  meta('meta[property="og:url"]', { property: "og:url", content: canonical });
  meta('meta[property="og:site_name"]', { property: "og:site_name", content: "EMPV" });
  meta('meta[property="og:locale"]', { property: "og:locale", content: route.lang === "it" ? "it_IT" : "en_GB" });
  meta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary" });
  meta('meta[name="twitter:title"]', { name: "twitter:title", content: copy.title });
  meta('meta[name="twitter:description"]', { name: "twitter:description", content: copy.description });
}

export function SeoHead({ route }: { route: SiteRoute }) {
  useEffect(() => applySeo(route), [route]);
  return null;
}
