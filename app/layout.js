import { Inter, Fraunces } from "next/font/google"; // Fraunces matches the 'Fresh Feast' soft serif
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"] // Enable soft and wonky axes for playful feel
});

export const metadata = {
  title: "NutriNuelita - Nutrición Integral y Bienestar",
  description: "Nutricionista integral en Medellín. Planes personalizados, educación nutricional y bienestar corporativo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${fraunces.variable}`}>
        {children}
      </body>
    </html>
  );
}
