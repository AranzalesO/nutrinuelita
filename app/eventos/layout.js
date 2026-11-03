export const metadata = {
  title: {
    absolute: "Eventos, charlas y talleres de nutrición | Nutrinuelita · Manuela Acevedo",
    template: "%s | Nutrinuelita · Manuela Acevedo",
  },
  description:
    "Agenda de charlas, talleres y conferencias de nutrición con Manuela Acevedo Álvarez (Nutrinuelita) en Medellín y online. Lleva una charla a tu empresa, colegio o comunidad.",
  alternates: { canonical: "/eventos" },
  openGraph: { url: "/eventos" },
};

export default function EventosLayout({ children }) {
  return children;
}
