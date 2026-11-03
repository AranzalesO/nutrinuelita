import { events } from "../../data/events";
import { getEventById } from "../../lib/events";
import { SITE_URL, personRef, businessRef, PERSON, absoluteUrl, JsonLd } from "../../lib/site";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export function generateMetadata({ params }) {
  const event = getEventById(params.id);
  if (!event) return { title: "Evento no encontrado", robots: { index: false } };
  const path = `/eventos/${event.id}`;
  return {
    title: event.title,
    description: event.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${event.title} · ${PERSON.shortName}`,
      description: event.summary,
      ...(event.image ? { images: [{ url: event.image }] } : {}),
    },
  };
}

const ATTENDANCE = {
  Presencial: "https://schema.org/OfflineEventAttendanceMode",
  Virtual: "https://schema.org/OnlineEventAttendanceMode",
  Híbrido: "https://schema.org/MixedEventAttendanceMode",
};

export default function EventLayout({ children, params }) {
  const event = getEventById(params.id);
  if (!event) return children;

  const isOnline = event.modality === "Virtual";
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.recap || event.description || event.summary,
    startDate: event.hideTime ? event.start.slice(0, 10) : event.start,
    ...(event.end && !event.hideTime ? { endDate: event.end } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: ATTENDANCE[event.modality] || ATTENDANCE.Presencial,
    location: isOnline
      ? { "@type": "VirtualLocation", url: absoluteUrl(`/eventos/${event.id}`) }
      : {
          "@type": "Place",
          name: event.location,
          address: { "@type": "PostalAddress", addressLocality: event.city || "Medellín", addressCountry: "CO" },
        },
    ...(event.image ? { image: [absoluteUrl(event.image)] } : {}),
    organizer: businessRef(),
    performer: personRef(),
    url: absoluteUrl(`/eventos/${event.id}`),
  };

  return (
    <>
      <JsonLd data={data} />
      {children}
    </>
  );
}
