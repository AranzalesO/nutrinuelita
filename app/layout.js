import { Fredoka } from "next/font/google"; 
import "./globals.css";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

const fredoka = Fredoka({ 
  subsets: ["latin"], 
  variable: "--font-fredoka",
  // No weights specified to use variable font defaults
});

export const metadata = {
  title: "NutriNuelita - Nutrición Integral y Bienestar 🦦",
  description: "Nutricionista integral en Medellín. Planes personalizados, educación nutricional y bienestar corporativo.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦦</text></svg>',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${fredoka.variable} ${fredoka.className}`}>
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
