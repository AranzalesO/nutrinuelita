export const metadata = {
  title: {
    absolute: "Eventos, charlas y talleres de nutrición | NutriNuelita · Manuela Acevedo",
    template: "%s | NutriNuelita · Manuela Acevedo",
  },
  description:
    "Agenda de charlas, talleres y conferencias de nutrición con Manuela Acevedo Álvarez (NutriNuelita) en Medellín y online. Lleva una charla a tu empresa, colegio o comunidad.",
  alternates: { canonical: "/eventos" },
  openGraph: { url: "/eventos" },
};

export default function EventosLayout({ children }) {
  return children;
}
