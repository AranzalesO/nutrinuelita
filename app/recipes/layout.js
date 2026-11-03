export const metadata = {
  title: {
    absolute: "Recetas saludables | Nutrinuelita · Manuela Acevedo",
    template: "%s | Nutrinuelita · Manuela Acevedo",
  },
  description:
    "Recetario saludable de Nutrinuelita: desayunos, almuerzos, cenas, snacks y bebidas fáciles, ricas y balanceadas, creadas por la nutricionista Manuela Acevedo Álvarez.",
  alternates: { canonical: "/recipes" },
  openGraph: { url: "/recipes" },
};

export default function RecipesLayout({ children }) {
  return children;
}
