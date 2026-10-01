import { useEffect, useState } from "react";
import SiteFooter from "./SiteFooter";
import { siteHref } from "./seo";
import type { SiteLang } from "./detailContent";

export type LegalPageSlug = "privacy" | "cookies" | "legal";

type LegalSection = {
  title: string;
  body: React.ReactNode;
};

const common = {
  it: {
    updated: "Ultimo aggiornamento: 1 ottobre 2026",
    back: "Torna al sito",
    other: "Altre pagine legali",
  },
  en: {
    updated: "Last updated: 1 October 2026",
    back: "Back to site",
    other: "Other legal pages",
  },
} as const;

function PrivacySections({ lang }: { lang: SiteLang }): LegalSection[] {
  if (lang === "en") {
    return [
      {
        title: "1. Data controller",
        body: (
          <>
            <p>
              The data controller for this website is Valleri Michele, sole proprietorship,
              VAT no. 04942220163, tax domicile at Via G. Marconi 25, Albano
              Sant&apos;Alessandro (BG), Italy.
            </p>
            <p>
              Contact: <a href="mailto:hello@empv.it">hello@empv.it</a> ·
              {" "}<a href="https://wa.me/393792438705" target="_blank" rel="noreferrer">
                +39 379 243 8705
              </a>.
            </p>
          </>
        ),
      },
      {
        title: "2. Data processed when browsing",
        body: (
          <>
            <p>
              The website is currently hosted through GitHub Pages. When the site is
              visited, technical information such as IP address, request date and time,
              browser/device information and requested resources may be processed by the
              hosting provider for service delivery, reliability and security.
            </p>
            <p>
              If the visitor gives analytics consent, EMPV loads Google Analytics 4
              (measurement ID <code>G-TFK8ZN8CDW</code>) to measure visits and selected
              interactions with the website. Without consent, the Google Analytics script
              is not loaded by EMPV. EMPV does not use advertising pixels or profiling
              tools on this website.
            </p>
          </>
        ),
      },
      {
        title: "3. Visual preferences",
        body: (
          <>
            <p>
              The public customizer stores the item <code>empv-visual-preferences</code>
              in the browser&apos;s localStorage. It contains the selected graphic,
              palette and motion settings and is used only to restore the experience
              chosen by the visitor.
            </p>
            <p>
              This information remains on the device until it is overwritten, reset or
              removed through the browser settings. EMPV does not use it to profile the
              visitor or combine it with browsing histories.
            </p>
          </>
        ),
      },
      {
        title: "4. Contacts by email or WhatsApp",
        body: (
          <>
            <p>
              If you voluntarily contact EMPV, the information you provide — for example
              name, contact details, company information and message content — is used to
              respond to the request, evaluate a possible professional relationship and,
              where relevant, take pre-contractual steps requested by you.
            </p>
            <p>
              Email is managed through the provider associated with the official EMPV mailbox. WhatsApp is an external service:
              no WhatsApp widget is loaded on this site and the connection to WhatsApp is
              initiated only when the visitor clicks the relevant link.
            </p>
          </>
        ),
      },
      {
        title: "5. Google Fonts",
        body: (
          <p>
            The current version of the site loads the Manrope typeface through Google
            Fonts. The visitor&apos;s browser therefore connects to Google&apos;s servers
            to obtain the font resources, which may involve processing technical
            information such as the IP address. EMPV does not use this connection for
            analytics or advertising.
          </p>
        ),
      },
      {
        title: "6. Purposes and legal bases",
        body: (
          <ul>
            <li>providing, protecting and technically operating the website;</li>
            <li>remembering visual settings explicitly chosen by the visitor;</li>
            <li>measuring website usage through Google Analytics 4 only after consent;</li>
            <li>responding to enquiries and taking requested pre-contractual steps;</li>
            <li>meeting legal, accounting or defence obligations where applicable.</li>
          </ul>
        ),
      },
      {
        title: "7. Recipients and international transfers",
        body: (
          <p>
            Technical, analytics or communication data may be processed by service
            providers used for hosting, measurement and communications, including GitHub,
            Google only after analytics consent, the email service provider and, only after
            a click on the external link, WhatsApp/Meta. Some providers may process data
            outside the European Economic Area under the safeguards described in their
            applicable privacy documentation.
          </p>
        ),
      },
      {
        title: "8. Retention",
        body: (
          <p>
            Browser preferences remain on the device until deleted or overwritten.
            Communications are kept for the time necessary to handle the request and, if
            a professional relationship follows, for the periods required by applicable
            contractual, accounting and legal obligations. Hosting logs are retained
            according to the hosting provider&apos;s policies.
          </p>
        ),
      },
      {
        title: "9. Your rights",
        body: (
          <>
            <p>
              Where applicable, you may request access, rectification, erasure,
              restriction, portability or object to processing, and you may withdraw
              consent when processing is based on consent.
            </p>
            <p>
              Requests can be sent to <a href="mailto:hello@empv.it">hello@empv.it</a>.
              You also have the right to lodge a complaint with the Italian Data
              Protection Authority.
            </p>
          </>
        ),
      },
      {
        title: "10. Automated decisions",
        body: <p>EMPV does not carry out automated decision-making or profiling through this website.</p>,
      },
    ];
  }

  return [
    {
      title: "1. Titolare del trattamento",
      body: (
        <>
          <p>
            Il titolare del trattamento dei dati relativi a questo sito è Valleri Michele,
            ditta individuale, P.IVA 04942220163, domicilio fiscale in Via G. Marconi 25,
            Albano Sant&apos;Alessandro (BG), Italia.
          </p>
          <p>
            Contatti: <a href="mailto:hello@empv.it">hello@empv.it</a> ·
            {" "}<a href="https://wa.me/393792438705" target="_blank" rel="noreferrer">
              +39 379 243 8705
            </a>.
          </p>
        </>
      ),
    },
    {
      title: "2. Dati trattati durante la navigazione",
      body: (
        <>
          <p>
            Il sito è attualmente ospitato tramite GitHub Pages. Durante la visita possono
            essere trattate dal fornitore di hosting informazioni tecniche quali indirizzo
            IP, data e ora della richiesta, informazioni su browser/dispositivo e risorse
            richieste, per erogazione, affidabilità e sicurezza del servizio.
          </p>
          <p>
            Se il visitatore presta il consenso analytics, EMPV carica Google Analytics 4
            (ID di misurazione <code>G-TFK8ZN8CDW</code>) per misurare visite e alcune
            interazioni con il sito. Senza consenso, lo script di Google Analytics non
            viene caricato da EMPV. Il sito non utilizza pixel pubblicitari o strumenti di
            profilazione.
          </p>
        </>
      ),
    },
    {
      title: "3. Preferenze visuali",
      body: (
        <>
          <p>
            Il configuratore pubblico salva nel localStorage del browser la voce
            <code> empv-visual-preferences</code>, contenente grafica, palette e parametri
            di movimento scelti dall&apos;utente. Serve esclusivamente a ripristinare
            l&apos;esperienza visuale selezionata.
          </p>
          <p>
            Queste informazioni rimangono sul dispositivo finché non vengono sovrascritte,
            reimpostate o eliminate tramite le impostazioni del browser. EMPV non le usa
            per profilare l&apos;utente né le combina con cronologie di navigazione.
          </p>
        </>
      ),
    },
    {
      title: "4. Contatti via email o WhatsApp",
      body: (
        <>
          <p>
            Se contatti volontariamente EMPV, i dati che fornisci — ad esempio nome,
            recapiti, informazioni sull&apos;azienda e contenuto del messaggio — vengono
            utilizzati per rispondere alla richiesta, valutare un possibile rapporto
            professionale e, quando pertinente, svolgere attività precontrattuali richieste
            dall&apos;interessato.
          </p>
          <p>
            La posta elettronica è gestita tramite il fornitore associato alla casella ufficiale EMPV. WhatsApp è un
            servizio esterno: il sito non carica widget WhatsApp e la connessione al
            servizio avviene solo dopo il click volontario sul relativo collegamento.
          </p>
        </>
      ),
    },
    {
      title: "5. Google Fonts",
      body: (
        <p>
          La versione attuale del sito carica il carattere Manrope tramite Google Fonts.
          Il browser del visitatore si collega quindi ai server di Google per ottenere le
          risorse tipografiche e possono essere trattate informazioni tecniche come
          l&apos;indirizzo IP. EMPV non utilizza tale collegamento per analytics o
          pubblicità.
        </p>
      ),
    },
    {
      title: "6. Finalità e basi giuridiche",
      body: (
        <ul>
          <li>erogare, proteggere e far funzionare tecnicamente il sito;</li>
          <li>ricordare le impostazioni visuali richieste dall&apos;utente;</li>
          <li>misurare l&apos;uso del sito tramite Google Analytics 4 solo dopo consenso;</li>
          <li>rispondere ai contatti e svolgere le attività precontrattuali richieste;</li>
          <li>adempiere, quando applicabile, obblighi legali, contabili o di difesa.</li>
        </ul>
      ),
    },
    {
      title: "7. Destinatari e trasferimenti extra SEE",
      body: (
        <p>
          Dati tecnici, analytics o di comunicazione possono essere trattati dai fornitori
          utilizzati per hosting, misurazione e comunicazioni, tra cui GitHub, Google solo
          dopo il consenso analytics, il fornitore del servizio email e, solo dopo il click
          sul collegamento esterno, WhatsApp/Meta. Alcuni fornitori possono trattare dati
          fuori dallo Spazio Economico Europeo secondo le garanzie indicate nelle
          rispettive informative applicabili.
        </p>
      ),
    },
    {
      title: "8. Conservazione",
      body: (
        <p>
          Le preferenze del browser restano sul dispositivo fino alla cancellazione o
          sovrascrittura. Le comunicazioni sono conservate per il tempo necessario a
          gestire la richiesta e, se nasce un rapporto professionale, per i periodi imposti
          dagli obblighi contrattuali, contabili e di legge applicabili. I log di hosting
          seguono i tempi di conservazione previsti dal fornitore.
        </p>
      ),
    },
    {
      title: "9. Diritti dell'interessato",
      body: (
        <>
          <p>
            Nei casi previsti puoi chiedere accesso, rettifica, cancellazione,
            limitazione, portabilità, opposizione al trattamento e revocare il consenso
            quando il trattamento si basa sul consenso.
          </p>
          <p>
            Le richieste possono essere inviate a
            {" "}<a href="mailto:hello@empv.it">hello@empv.it</a>. Resta inoltre
            il diritto di proporre reclamo al Garante per la protezione dei dati personali.
          </p>
        </>
      ),
    },
    {
      title: "10. Decisioni automatizzate",
      body: <p>EMPV non effettua tramite questo sito decisioni automatizzate o profilazione.</p>,
    },
  ];
}

function CookieSections({ lang }: { lang: SiteLang }): LegalSection[] {
  if (lang === "en") {
    return [
      {
        title: "1. Google Analytics 4",
        body: (
          <>
            <p>
              EMPV uses Google Analytics 4 only after the visitor has accepted analytics
              through the consent banner. The measurement ID is
              {" "}<code>G-TFK8ZN8CDW</code>.
            </p>
            <p>
              Until consent is given, EMPV does not load the Google Analytics script.
              Advertising storage and advertising-personalization signals are not enabled
              by this implementation.
            </p>
          </>
        ),
      },
      {
        title: "2. What is measured after consent",
        body: (
          <>
            <p>
              Analytics may measure page views and selected interactions, including clicks
              on WhatsApp, email, LinkedIn, X, Research Notes, the team section and article
              sharing actions. Google Analytics may also process technical information
              about the browser, device and visit in order to provide measurement reports.
            </p>
            <p>
              Google Analytics may set first-party measurement cookies such as
              {" "}<code>_ga</code> and <code>_ga_*</code> after consent.
            </p>
          </>
        ),
      },
      {
        title: "3. Local storage used by EMPV",
        body: (
          <>
            <p>
              The site uses browser localStorage for the visual customizer under
              {" "}<code>empv-visual-preferences</code> and to remember the analytics
              choice under <code>empv-analytics-consent</code>.
            </p>
            <p>
              These local entries are used to restore the visitor&apos;s choices and are
              not used by EMPV for advertising profiling.
            </p>
          </>
        ),
      },
      {
        title: "4. Changing or withdrawing consent",
        body: (
          <p>
            The analytics choice can be changed at any time through “Cookie settings” in
            the website footer. Rejecting or withdrawing consent prevents further
            analytics collection by this implementation and the site attempts to remove
            first-party Google Analytics cookies that it can access.
          </p>
        ),
      },
      {
        title: "5. Third-party services",
        body: (
          <p>
            Google Analytics is a Google service. Hosting, fonts and communication links
            may also involve connections to external providers as described in the Privacy
            Policy. External services opened by the visitor are governed by their own
            privacy and cookie information.
          </p>
        ),
      },
    ];
  }

  return [
    {
      title: "1. Google Analytics 4",
      body: (
        <>
          <p>
            EMPV utilizza Google Analytics 4 solo dopo che il visitatore ha accettato gli
            analytics tramite il banner di consenso. L&apos;ID di misurazione è
            {" "}<code>G-TFK8ZN8CDW</code>.
          </p>
          <p>
            Fino al consenso EMPV non carica lo script di Google Analytics. Questa
            implementazione non abilita lo storage pubblicitario né i segnali di
            personalizzazione pubblicitaria.
          </p>
        </>
      ),
    },
    {
      title: "2. Cosa viene misurato dopo il consenso",
      body: (
        <>
          <p>
            Gli analytics possono misurare visualizzazioni di pagina e alcune interazioni,
            tra cui click su WhatsApp, email, LinkedIn, X, Research Notes, sezione team e
            azioni di condivisione degli articoli. Google Analytics può inoltre trattare
            informazioni tecniche relative a browser, dispositivo e visita per produrre i
            report di misurazione.
          </p>
          <p>
            Dopo il consenso Google Analytics può impostare cookie di misurazione di prima
            parte come <code>_ga</code> e <code>_ga_*</code>.
          </p>
        </>
      ),
    },
    {
      title: "3. Archiviazione locale utilizzata da EMPV",
      body: (
        <>
          <p>
            Il sito usa il localStorage del browser per il configuratore visuale nella voce
            {" "}<code>empv-visual-preferences</code> e per ricordare la scelta analytics
            nella voce <code>empv-analytics-consent</code>.
          </p>
          <p>
            Queste voci locali servono a ripristinare le scelte del visitatore e non sono
            utilizzate da EMPV per profilazione pubblicitaria.
          </p>
        </>
      ),
    },
    {
      title: "4. Modificare o revocare il consenso",
      body: (
        <p>
          La scelta analytics può essere modificata in qualsiasi momento tramite
          “Impostazioni cookie” nel footer del sito. Il rifiuto o la revoca impediscono a
          questa implementazione di effettuare ulteriori raccolte analytics e il sito prova
          a eliminare i cookie Google Analytics di prima parte a cui può accedere.
        </p>
      ),
    },
    {
      title: "5. Servizi di terze parti",
      body: (
        <p>
          Google Analytics è un servizio di Google. Hosting, font e collegamenti di
          comunicazione possono inoltre comportare connessioni a fornitori esterni come
          descritto nella Privacy Policy. I servizi esterni aperti volontariamente dal
          visitatore sono soggetti alle rispettive informative privacy e cookie.
        </p>
      ),
    },
  ];
}

function LegalNoticeSections({ lang }: { lang: SiteLang }): LegalSection[] {
  if (lang === "en") {
    return [
      {
        title: "Website operator",
        body: (
          <>
            <p>
              EMPV is a brand/project operated by Valleri Michele, sole proprietorship,
              VAT no. 04942220163.
            </p>
            <p>
              Tax domicile: Via G. Marconi 25, Albano Sant&apos;Alessandro (BG), Italy.
              Activity: computer programming.
            </p>
            <p>
              Email: <a href="mailto:hello@empv.it">hello@empv.it</a> ·
              WhatsApp/phone: <a href="https://wa.me/393792438705" target="_blank" rel="noreferrer">
                +39 379 243 8705
              </a>.
            </p>
          </>
        ),
      },
      {
        title: "Content and case studies",
        body: (
          <p>
            The website presents projects, experiments and professional capabilities for
            informational purposes. Some client case studies are deliberately anonymised:
            sectors, problems and solutions are described without publicly identifying
            the customer.
          </p>
        ),
      },
      {
        title: "No online contracting",
        body: (
          <p>
            Unless expressly stated otherwise, the website does not constitute a binding
            offer, does not provide online checkout and does not by itself conclude a
            professional contract. Scope, responsibilities, pricing and deliverables are
            defined separately with the relevant counterparty.
          </p>
        ),
      },
      {
        title: "Intellectual property",
        body: (
          <p>
            Texts, visual identity, original interfaces, project descriptions and other
            original website materials are protected under the applicable intellectual
            property rules. Third-party names, trademarks and technologies remain the
            property of their respective owners.
          </p>
        ),
      },
      {
        title: "External links",
        body: (
          <p>
            Links to external services — including WhatsApp, GitHub or other third-party
            resources — lead to environments operated independently by their respective
            providers. Their terms and privacy policies apply after the visitor follows
            the link.
          </p>
        ),
      },
      {
        title: "Updates",
        body: (
          <p>
            EMPV may update website content and these legal pages to reflect changes in
            services, infrastructure or applicable requirements. The update date shown
            at the top identifies the current published version.
          </p>
        ),
      },
    ];
  }

  return [
    {
      title: "Gestore del sito",
      body: (
        <>
          <p>
            EMPV è un brand/progetto gestito da Valleri Michele, ditta individuale,
            P.IVA 04942220163.
          </p>
          <p>
            Domicilio fiscale: Via G. Marconi 25, Albano Sant&apos;Alessandro (BG),
            Italia. Attività: programmazione informatica.
          </p>
          <p>
            Email: <a href="mailto:hello@empv.it">hello@empv.it</a> ·
            WhatsApp/telefono: <a href="https://wa.me/393792438705" target="_blank" rel="noreferrer">
              +39 379 243 8705
            </a>.
          </p>
        </>
      ),
    },
    {
      title: "Contenuti e casi reali",
      body: (
        <p>
          Il sito presenta progetti, sperimentazioni e competenze professionali con
          finalità informativa. Alcuni case study cliente sono intenzionalmente
          anonimizzati: vengono descritti settore, problema e soluzione senza identificare
          pubblicamente il committente.
        </p>
      ),
    },
    {
      title: "Nessuna conclusione del contratto online",
      body: (
        <p>
          Salvo indicazione espressa, il sito non costituisce un&apos;offerta vincolante,
          non prevede checkout e non conclude da solo un contratto professionale. Ambito,
          responsabilità, corrispettivi e deliverable vengono definiti separatamente con
          la controparte interessata.
        </p>
      ),
    },
    {
      title: "Proprietà intellettuale",
      body: (
        <p>
          Testi, identità visuale, interfacce originali, descrizioni dei progetti e altri
          materiali originali del sito sono tutelati secondo la normativa applicabile.
          Nomi, marchi e tecnologie di terzi restano di proprietà dei rispettivi titolari.
        </p>
      ),
    },
    {
      title: "Collegamenti esterni",
      body: (
        <p>
          I collegamenti verso servizi esterni — tra cui WhatsApp, GitHub o altre risorse
          di terze parti — conducono ad ambienti gestiti autonomamente dai rispettivi
          fornitori. Dopo il click si applicano termini e informative dei relativi
          servizi.
        </p>
      ),
    },
    {
      title: "Aggiornamenti",
      body: (
        <p>
          EMPV può aggiornare contenuti del sito e pagine legali per riflettere modifiche
          ai servizi, all&apos;infrastruttura o ai requisiti applicabili. La data riportata
          in alto identifica la versione pubblicata corrente.
        </p>
      ),
    },
  ];
}

const pageMeta = {
  privacy: {
    it: {
      eyebrow: "EMPV / Privacy",
      title: "Privacy Policy",
      lead: "Come vengono trattati i dati quando visiti il sito o decidi di contattarci.",
    },
    en: {
      eyebrow: "EMPV / Privacy",
      title: "Privacy Policy",
      lead: "How data is handled when you visit the website or choose to contact us.",
    },
  },
  cookies: {
    it: {
      eyebrow: "EMPV / Storage",
      title: "Cookie & Storage",
      lead: "Cosa viene salvato nel browser, perché lo facciamo e come puoi cancellarlo.",
    },
    en: {
      eyebrow: "EMPV / Storage",
      title: "Cookie & Storage",
      lead: "What is stored in your browser, why it is used and how you can remove it.",
    },
  },
  legal: {
    it: {
      eyebrow: "EMPV / Legal",
      title: "Note legali",
      lead: "Informazioni sul gestore del sito, sui contenuti pubblicati e sui collegamenti esterni.",
    },
    en: {
      eyebrow: "EMPV / Legal",
      title: "Legal notice",
      lead: "Information about the website operator, published content and external links.",
    },
  },
} as const;

export default function LegalPage({
  slug,
  initialLang,
}: {
  slug: LegalPageSlug;
  initialLang: SiteLang;
}) {
  const [lang, setLang] = useState<SiteLang>(initialLang);
  const meta = pageMeta[slug][lang];
  const labels = common[lang];
  const sections =
    slug === "privacy"
      ? PrivacySections({ lang })
      : slug === "cookies"
        ? CookieSections({ lang })
        : LegalNoticeSections({ lang });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${meta.title} — EMPV`;
  }, [lang, meta.title]);

  const toggleLang = () => {
    const next = lang === "it" ? "en" : "it";
    window.location.href = siteHref({ kind: "legal", lang: next, slug });
  };

  const legalLinks: Array<{ slug: LegalPageSlug; it: string; en: string }> = [
    { slug: "privacy", it: "Privacy", en: "Privacy" },
    { slug: "cookies", it: "Cookie & Storage", en: "Cookie & Storage" },
    { slug: "legal", it: "Note legali", en: "Legal notice" },
  ];

  return (
    <div className="legal-shell">
      <header className="legal-topbar">
        <a className="legal-home" href={siteHref({ kind: "home", lang })} aria-label={labels.back}>
          EMPV
        </a>
        <div className="legal-topbar-title">{meta.eyebrow}</div>
        <button className="legal-lang" type="button" onClick={toggleLang}>
          {lang === "it" ? "EN" : "IT"}
        </button>
      </header>

      <main className="legal-main">
        <div className="legal-eyebrow">{meta.eyebrow}</div>
        <h1>{meta.title}</h1>
        <p className="legal-lead">{meta.lead}</p>
        <div className="legal-updated">{labels.updated}</div>

        <div className="legal-content">
          {sections.map((section) => (
            <section className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              <div className="legal-section-body">{section.body}</div>
            </section>
          ))}
        </div>

        <nav className="legal-nav" aria-label={labels.other}>
          {legalLinks
            .filter((item) => item.slug !== slug)
            .map((item) => (
              <a key={item.slug} href={siteHref({ kind: "legal", lang, slug: item.slug })}>
                {item[lang]}
              </a>
            ))}
        </nav>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
