import { Fredoka, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Providers from "./components/Providers";

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
  title: {
    default: "NutriNuelita · Nutrición integral con ciencia y amor en Medellín",
    template: "%s · NutriNuelita",
  },
  description:
    "Manuela Acevedo, Nutricionista Dietista en Medellín. Consulta personalizada, educación alimentaria, nutrición corporativa, charlas y talleres. Sin dietas locas.",
  keywords: [
    "nutricionista Medellín",
    "nutrición integral",
    "educación alimentaria",
    "charlas de nutrición",
    "talleres de nutrición",
    "nutrición corporativa",
  ],
  openGraph: {
    title: "NutriNuelita · Nutrición con amor",
    description:
      "Planes personalizados, educación real y charlas que transforman tu relación con la comida.",
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦦</text></svg>',
  },
};

export const viewport = {
  themeColor: "#FFFBF5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${fredoka.variable} ${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <Providers>
          <CustomCursor />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
