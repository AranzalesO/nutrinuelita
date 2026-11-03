import { Fredoka, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Providers from "./components/Providers";
import { SITE_URL, SITE_NAME, PERSON, SOCIAL, DEFAULT_DESCRIPTION, siteJsonLd, JsonLd } from "./lib/site";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Manuela Acevedo Álvarez · Nutricionista Dietista en Medellín | NutriNuelita",
    template: "%s | NutriNuelita · Manuela Acevedo",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON.name, url: SOCIAL.linkedin }],
  creator: PERSON.name,
  publisher: SITE_NAME,
  keywords: [
    "Manuela Acevedo Álvarez",
    "Manuela Acevedo",
    "Manuela Acevedo nutricionista",
    "NutriNuelita",
    "Nutri Nuelita",
    "nutricionista Medellín",
    "nutricionista dietista Medellín",
    "nutrición integral Medellín",
    "educación alimentaria",
    "charlas de nutrición",
    "talleres de nutrición",
    "nutrición corporativa",
    "seguridad alimentaria",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: SITE_NAME,
    title: "Manuela Acevedo Álvarez · Nutricionista Dietista | NutriNuelita",
    description:
      "Nutrición con ciencia y amor en Medellín. Planes personalizados, educación real y charlas que transforman tu relación con la comida.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Manuela Acevedo Álvarez · Nutricionista Dietista en Medellín · NutriNuelita" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuela Acevedo Álvarez · NutriNuelita",
    description: "Nutricionista Dietista en Medellín. Nutrición con ciencia y amor, sin dietas locas.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "health",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦦</text></svg>',
    apple: "/logo.svg",
  },
  // Paste the Google Search Console HTML-tag code here if you verify with a meta tag instead of DNS
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
};

export const viewport = {
  themeColor: "#FFFBF5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${fredoka.variable} ${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <JsonLd data={siteJsonLd()} />
        <Providers>
          <CustomCursor />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
