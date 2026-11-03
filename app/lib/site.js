// Single source of truth for brand, person and SEO data.
// NEXT_PUBLIC_SITE_URL lets a preview deploy point somewhere else; production uses the real domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nutrinuelita.com").replace(/\/$/, "");

export const SITE_NAME = "Nutrinuelita";

export const PERSON = {
  name: "Manuela Acevedo Álvarez",
  shortName: "Manuela Acevedo",
  nickname: "Nuelita",
  jobTitle: "Nutricionista Dietista",
  email: "nutrinuelita@gmail.com",
  image: "/images/about/main-bio.jpg",
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/nutrinuelita/",
  facebook: "https://www.facebook.com/profile.php?id=61584691671024",
  linkedin: "https://www.linkedin.com/in/manuela-acevedo-%C3%A1lvarez-5a72b428b/",
};

export const BOOKING_URL = "https://calendar.app.google/bCFxLUv3dstFdmkT6";

export const DEFAULT_DESCRIPTION =
  "Manuela Acevedo Álvarez, Nutricionista Dietista en Medellín y creadora de Nutrinuelita. Consulta nutricional personalizada, educación alimentaria, nutrición corporativa, charlas y talleres. Ciencia y amor, sin dietas locas.";

// Compact references for other schema blocks (author, organizer…)
export const personRef = () => ({ "@type": "Person", "@id": `${SITE_URL}/#manuela`, name: PERSON.name, url: SITE_URL, sameAs: [SOCIAL.linkedin, SOCIAL.instagram] });
export const businessRef = () => ({ "@type": "Organization", "@id": `${SITE_URL}/#nutrinuelita`, name: SITE_NAME, url: SITE_URL });

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

// JSON-LD @graph shared by every page: who Manuela is, what Nutrinuelita is, and the website
export function siteJsonLd() {
  const personId = `${SITE_URL}/#manuela`;
  const businessId = `${SITE_URL}/#nutrinuelita`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PERSON.name,
        alternateName: [PERSON.shortName, "Manuela Acevedo Alvarez", PERSON.nickname, "Nutrinuelita"],
        givenName: "Manuela",
        familyName: "Acevedo Álvarez",
        jobTitle: PERSON.jobTitle,
        description:
          "Nutricionista Dietista en Medellín. Investigadora en educación alimentaria y nutricional, salud pública y salud planetaria. Global Shaper del World Economic Forum.",
        image: absoluteUrl(PERSON.image),
        url: SITE_URL,
        email: `mailto:${PERSON.email}`,
        worksFor: { "@id": businessId },
        memberOf: [
          { "@type": "Organization", name: "Global Shapers Community Medellín · World Economic Forum" },
          { "@type": "Organization", name: "Grupo de investigación Exposomas · Imperial College – Universidad CES" },
        ],
        knowsAbout: [
          "Nutrición clínica", "Educación alimentaria y nutricional", "Salud pública", "Salud planetaria",
          "Seguridad alimentaria", "Alimentación consciente", "Nutrición corporativa", "Enfermedades cardiometabólicas",
        ],
        homeLocation: { "@type": "Place", name: "Medellín, Antioquia, Colombia" },
        sameAs: [SOCIAL.linkedin, SOCIAL.instagram, SOCIAL.facebook],
      },
      {
        "@type": ["ProfessionalService", "Organization"],
        "@id": businessId,
        name: SITE_NAME,
        alternateName: ["Nutri Nuelita", "Nutrinuelita · Manuela Acevedo"],
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        image: absoluteUrl(PERSON.image),
        logo: absoluteUrl("/logo.svg"),
        email: PERSON.email,
        founder: { "@id": personId },
        employee: { "@id": personId },
        areaServed: [
          { "@type": "City", name: "Medellín" },
          { "@type": "Country", name: "Colombia" },
        ],
        address: { "@type": "PostalAddress", addressLocality: "Medellín", addressRegion: "Antioquia", addressCountry: "CO" },
        priceRange: "$$",
        sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.linkedin],
        makesOffer: [
          "Consulta nutricional personalizada", "Educación alimentaria", "Nutrición corporativa",
          "Programas digitales de nutrición", "Charlas y talleres de nutrición",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: ["Manuela Acevedo Álvarez · Nutricionista", "Nutri Nuelita"],
        inLanguage: "es-CO",
        publisher: { "@id": businessId },
      },
    ],
  };
}

// Renders a JSON-LD block (works in server components and layouts)
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped to avoid closing the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
