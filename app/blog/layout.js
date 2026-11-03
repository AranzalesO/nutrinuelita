export const metadata = {
  title: {
    absolute: "Blog de nutrición y bienestar | NutriNuelita · Manuela Acevedo",
    template: "%s | NutriNuelita · Manuela Acevedo",
  },
  description:
    "Artículos de nutrición basados en evidencia escritos por Manuela Acevedo Álvarez, Nutricionista Dietista: digestión, sueño, alimentación consciente y hábitos saludables.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog" },
};

export default function BlogLayout({ children }) {
  return children;
}
