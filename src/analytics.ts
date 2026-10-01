export const GA_MEASUREMENT_ID = "G-TFK8ZN8CDW";

export type AnalyticsConsent = "granted" | "denied";

const CONSENT_STORAGE_KEY = "empv-analytics-consent";
const CONSENT_VERSION = 1;

type StoredConsent = {
  version: number;
  analytics: AnalyticsConsent;
  updatedAt: string;
};

type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsEnabled = false;
let clickTrackingBound = false;

function setGaDisabled(disabled: boolean) {
  (window as unknown as Record<string, unknown>)[
    `ga-disable-${GA_MEASUREMENT_ID}`
  ] = disabled;
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer.push(args);
    });
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed?.version !== CONSENT_VERSION) return null;
    return parsed.analytics === "granted" || parsed.analytics === "denied"
      ? parsed.analytics
      : null;
  } catch {
    return null;
  }
}

export function writeAnalyticsConsent(choice: AnalyticsConsent) {
  try {
    const value: StoredConsent = {
      version: CONSENT_VERSION,
      analytics: choice,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Consent still applies for the current page if browser storage is unavailable.
  }
}

function clearGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((part) => part.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  const domains = ["", window.location.hostname, `.${window.location.hostname}`];

  cookieNames.forEach((name) => {
    domains.forEach((domain) => {
      const domainPart = domain ? `; domain=${domain}` : "";
      document.cookie =
        `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`;
    });
  });
}

export function trackAnalyticsEvent(
  eventName: string,
  params: AnalyticsParams = {},
) {
  if (!analyticsEnabled || !window.gtag) return;

  window.gtag("event", eventName, {
    page_path: window.location.pathname,
    page_title: document.title,
    ...params,
  });
}

function bindClickTracking() {
  if (clickTrackingBound) return;
  clickTrackingBound = true;

  document.addEventListener("click", (event) => {
    if (!analyticsEnabled) return;

    const element = event.target instanceof Element ? event.target.closest("a") : null;
    if (!(element instanceof HTMLAnchorElement)) return;

    if (element.closest(".research-note-share")) return;

    const rawHref = element.getAttribute("href") || "";
    if (!rawHref) return;

    if (rawHref.startsWith("mailto:")) {
      trackAnalyticsEvent("contact_click", { channel: "email" });
      return;
    }

    if (rawHref.startsWith("tel:")) {
      trackAnalyticsEvent("contact_click", { channel: "phone" });
      return;
    }

    let url: URL;
    try {
      url = new URL(element.href, window.location.href);
    } catch {
      return;
    }

    const host = url.hostname.toLowerCase();

    if (host === "wa.me" || host.endsWith(".wa.me")) {
      trackAnalyticsEvent("contact_click", { channel: "whatsapp" });
      return;
    }

    if (host === "linkedin.com" || host.endsWith(".linkedin.com")) {
      trackAnalyticsEvent("social_click", { network: "linkedin" });
      return;
    }

    if (
      host === "x.com" ||
      host.endsWith(".x.com") ||
      host === "twitter.com" ||
      host.endsWith(".twitter.com")
    ) {
      trackAnalyticsEvent("social_click", { network: "x" });
      return;
    }

    if (url.origin !== window.location.origin) return;

    if (url.hash === "#people") {
      trackAnalyticsEvent("navigation_click", { destination: "team" });
      return;
    }

    if (url.pathname.includes("/research-notes/")) {
      trackAnalyticsEvent("navigation_click", {
        destination: "research_notes",
      });
    }
  });
}

export function enableAnalytics() {
  if (analyticsEnabled) return;

  analyticsEnabled = true;
  setGaDisabled(false);
  ensureGtag();

  window.gtag?.("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (!document.querySelector(`script[data-empv-ga4="${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(GA_MEASUREMENT_ID);
    script.dataset.empvGa4 = GA_MEASUREMENT_ID;
    document.head.appendChild(script);
  }

  window.gtag?.("js", new Date());
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  bindClickTracking();
}

export function disableAnalytics() {
  analyticsEnabled = false;
  setGaDisabled(true);

  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  clearGoogleAnalyticsCookies();
}
