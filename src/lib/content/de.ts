export const SCENE_LABELS = [
  "Start",
  "Markt",
  "Über uns",
  "Produkte",
  "Karriere",
  "Struktur",
  "Verdienst",
] as const;

export const content = {
  meta: {
    title: "VN Partner System 2026",
    description:
      "Ihre Karriere im zukunftssicheren Modulhaus-Vertrieb. Transparente Provisionen, 5 Karrierestufen, modulares Bauen made in Germany.",
    siteUrl: "https://vn-modulhaus.de",
  },
  company: {
    name: "VN International Company Group GmbH",
    address: "Ziegeleistraße 16, 74613 Öhringen",
    phone: "+49 7941 643 99 82",
    email: "info@vn-modulhaus.de",
    website: "vn-modulhaus.de",
    ceo: "Valerii Shcherbakov",
    founded: 2024,
    quote: "Wir bauen keine Häuser. Wir schaffen Zuhause.",
  },
  cover: {
    badge: "VN International Company Group GmbH",
    title: "VN Partner",
    titleAccent: "System",
    subtitle: "Ihre Karriere im zukunftssicheren Modulhaus-Vertrieb",
    pills: ["Juni 2026", "Partner-Programm", "Makler & Investoren"],
    floatingYears: ["2026"],
    cta: "Weiter",
  },
  market: {
    badge: "Marktanalyse",
    source: "Quelle: Destatis, Pestel Institut, BBSR 2025/2026",
    title: "Der deutsche Immobilienmarkt",
    titleAccent: "im Wandel",
    chartTitle: "Fertigstellungen (Tsd.) vs. Baukosten-Index",
    chartLegend: {
      housing: "Wohnungen",
      index: "Baukosten-Index",
    },
    chartData: [
      { year: "2009", fertigstellungen: 159, baukostenIndex: 95 },
      { year: "2012", fertigstellungen: 201, baukostenIndex: 108 },
      { year: "2016", fertigstellungen: 291, baukostenIndex: 122 },
      { year: "2020", fertigstellungen: 306, baukostenIndex: 140 },
      { year: "2024", fertigstellungen: 252, baukostenIndex: 168 },
      { year: "2025", fertigstellungen: 207, baukostenIndex: 175 },
    ],
    costComparison: {
      title: "Konventionelle Neubaukosten",
      from: { value: "1.233 €", year: "2005", unit: "pro m²" },
      to: { value: "2.611 €", year: "2024", unit: "pro m²" },
      footnote: "Großstädte Ø Q4/2024: 4.473 €/m² · +48 % seit 2020",
    },
    chartInsight: {
      title: "Die Lösung",
      text: "Modulares Bauen ist bis zu 30 % günstiger als konventioneller Neubau und bis zu 60 % schneller realisierbar — bei gleichbleibend hoher Qualität.",
    },
    kpisGrid: [
      {
        value: "1,4 Mio.",
        label: "Wohnungsdefizit",
        sub: "Deutschland Ende 2024 — dramatischer Mangel",
        accent: "dark" as const,
        trend: { direction: "down" as const, label: "Akuter Bedarf" },
      },
      {
        value: "206.600",
        label: "Fertigstellungen 2025",
        sub: "Weit unter dem Bedarf von 400.000/Jahr",
        accent: "accent" as const,
        trend: { direction: "down" as const, label: "−18 % ggü. Vorjahr" },
      },
      {
        value: "4.473 €",
        label: "Ø Neubaukosten / m²",
        sub: "Großstädte Q4/2024 — konventioneller Neubau",
        accent: "dark" as const,
        trend: { direction: "up" as const, label: "+48 % seit 2020" },
      },
      {
        value: "47,2 %",
        label: "Wohneigentumsquote",
        sub: "Niedrigste in der EU — 52,8 % Mieterquote",
        accent: "accent" as const,
        trend: { direction: "down" as const, label: "Struktureller Druck" },
      },
    ],
    highlights: [
      {
        title: "Baukosten-Explosion",
        text: "Die Baukosten haben sich seit 2005 mehr als verdoppelt — von 1.233 €/m² auf 2.611 €/m² (2024). Gleichzeitig stieg die Nachfrage dramatisch.",
      },
      {
        title: "Leerstandsquote: Nur 2,2 %",
        text: "Unter der 3-%-Schwelle eines funktionierenden Markts. In den Top-7-Städten liegt sie unter 2 %.",
      },
    ],
    conclusions: [
      {
        tag: "PROBLEM 01",
        title: "Konventionelles Bauen",
        text: "Zu teuer, zu langsam: +112 % Baukosten seit 2005, 27 Monate von Genehmigung bis Fertigstellung",
        highlight: false,
      },
      {
        tag: "PROBLEM 02",
        title: "Unterversorgung",
        text: "1,4 Mio. fehlende Wohnungen bei nur 2,2 % Leerstand — der Markt kann den Bedarf nicht decken",
        highlight: false,
      },
      {
        tag: "LÖSUNG",
        title: "Modulares Bauen",
        text: "Schneller, kosteneffizienter, planbar — die Zukunft des Wohnungsbaus. Made in Germany.",
        highlight: true,
      },
    ],
  },
  about: {
    badge: "Über Uns",
    title: "Wer ist",
    titleAccent: "VN-Modulhaus?",
    blocks: [
      {
        id: "founding",
        title: "VN International Company Group GmbH",
        text: "Gegründet 2024, Ziegeleistraße 16, 74613 Öhringen. Geschäftsführer: Valerii Shcherbakov.",
        quote: "Wir bauen keine Häuser. Wir schaffen Zuhause.",
      },
      {
        id: "values",
        title: "Unsere Werte & Vorteile",
        text: "Flexibilität, Ästhetik und Zuverlässigkeit. Bauzeit nur 90–120 Tage, KfW 55–40 Standards, schlüsselfertig inkl. Lieferung und Montage. Kontrollierte Werksfertigung.",
      },
      {
        id: "models",
        title: "28+ Modelle",
        text: "",
        lines: [
          "Von 22 m² (Verde) bis 440 m² (Anker MFH) — für jede Lebenssituation.",
          "Drei Ausbaustufen:",
          "BASIS ab 1.965 €/m² · COMFORT ab 2.210 €/m² · KOMPLETT ab 2.487 €/m²",
        ],
      },
    ],
    timeline: [
      { id: "founding", step: 1, label: "2024", sublabel: "Gründung Öhringen" },
      { id: "values", step: 2, label: "Werksfertigung", sublabel: "90–120 Tage" },
      { id: "models", step: "★", label: "VN Partner", sublabel: "System", active: true },
    ],
    stats: [
      { value: "90–120", label: "Tage Bauzeit" },
      { value: "28+", label: "Modelle" },
      { value: "KfW 55", label: "Standard" },
    ],
  },
  products: {
    badge: "Portfolio",
    title: "Unsere",
    titleAccent: "Produktvielfalt",
    subtitle: "Für jede Zielgruppe die passende Lösung",
    items: [
      {
        id: "small",
        num: "01",
        title: "Modulhäuser bis 45 m²",
        description:
          "10 Modelle: Verde, Igloo, Aqua, Bushome, Boreal... Perfekt für Singles, Paare und als Feriendomizil.",
        tag: "Ab 22,5 m² — 10 Modelle",
        image: "/assets/houses/category-small-3d.png",
        models: ["Verde", "Igloo", "Aqua", "Bushome", "Boreal", "Cube", "Nest", "Warm", "Glory", "Sylph"],
      },
      {
        id: "medium",
        num: "02",
        title: "Modulhäuser 50–85 m²",
        description:
          "11 Modelle: LakeView, Isos, Timber, Ligna... Ideal für Familien und Mehrgenerationenwohnen.",
        tag: "58–83 m² — 11 Modelle",
        image: "/assets/houses/category-medium-3d.png",
        models: ["LakeView", "Isos", "Timber", "Ligna", "Fjord", "Vespera", "Communicate", "Thermis", "Tores", "Niapol", "Winegg"],
      },
      {
        id: "large",
        num: "03",
        title: "Modulhäuser über 90 m²",
        description:
          "7 Modelle: Fenix (107 m²), Lando, Hafen, Anker (440 m² MFH). Für Bauträger und Investoren.",
        tag: "89–440 m² — 7 Modelle",
        image: "/assets/houses/category-large-3d.png",
        models: ["Fenix", "Lando", "Hafen", "Anker MFH", "Lando Kerafront", "Hafen Kerafront", "Anker Putz"],
      },
      {
        id: "camping",
        num: "04",
        title: "Camping-Module",
        description:
          "Bezugsfertige Glamping-Module mit Terrasse, Sanitär und Ruhebereich. Plug-and-play für Campingplätze und Tourismus.",
        tag: "Glamping & Tourismus",
        image: "/assets/houses/category-camping-3d.png",
        models: ["Glamping Pod", "Camping Deluxe", "Tourism Module", "Wellness Cube"],
      },
    ],
  },
  career: {
    badge: "Karriere",
    title: "Das VN Partner System:",
    titleAccent: "Wachsen Sie mit uns",
    footer: [
      { label: "Empfehler:", text: "10 €/m² einmalig für eine einfache Kundenempfehlung (ohne Systemteilnahme)." },
      { label: "Akkumulation:", text: "Laufzeit für die Anrechnung der m² — 1 Jahr." },
      { label: "Vertragsoptionen:", text: "VNPS (§ 84 HGB) = max. 230 €/m² | VNPSEx (§ 93 HGB) = max. 180 €/m²." },
    ],
    nextTierHint: "Noch {sqm} m² bis {metal}",
  },
  structure: {
    badge: "§84 HGB",
    title: "Handelsvertretervertrag:",
    titleAccent: "Strukturaufbau & Karriereplan",
    subtitle: "VN Vertriebsnetzwerk",
    principles: [
      { title: "Leistung wird belohnt", text: "Ihre Provision wächst mit Ihrem Verkaufserfolg und Ihrer Struktur." },
      { title: "Transparenz & Fairness", text: "Klare Metallstufen, nachvollziehbare Differenzprovision." },
      { title: "Nachhaltiger Strukturaufbau", text: "Langfristiges Wachstum durch direkte Partnerführung." },
      { title: "Differenzprovision", text: "Verdienen Sie an jedem m² Ihres Teams — die Differenz zwischen Ihrer und der Partnerstufe." },
    ],
    diff: {
      title: "Differenzprovision",
      yourTier: "Ihre Stufe",
      partnerTier: "Stufe Ihres Partners",
      formula: "Ihre Rate − Partner Rate",
      perSqm: "€/m² Differenz",
    },
    example: {
      title: "Berechnungsbeispiel",
      scenario: "Teamleiter Gold (160 €) · Verkaufsberater Silber (110 €) · 1.200 m²",
      total: "Gesamt nach Ihrer Rate",
      partnerShare: "Anteil Partner",
      diff: "Differenzprovision",
    },
    rules: [
      "Nur bei realisierten, fakturierten Verkäufen",
      "Monatliche Auszahlung mit regulärer Provision",
      "Nur direkt geführte Partner (Direktlinie)",
      "Keine Provision auf Partner gleicher oder höherer Stufe",
    ],
  },
  earnings: {
    badge: "Rechenbeispiel",
    title: "Ihr",
    titleAccent: "Potenzial — in Zahlen",
    contractOptions: [
      { law: "§ 84 HGB", max: "max. 230 €/m²" },
      { law: "§ 93 HGB", max: "bis 180 €/m²" },
    ],
    disclaimer: "Beispielrechnung, unverbindlich · VN International Company Group GmbH",
  },
} as const;

export type Content = typeof content;
