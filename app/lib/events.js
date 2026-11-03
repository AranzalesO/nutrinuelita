import { events } from "../data/events";

const TIME_ZONE = "America/Bogota";
const CONTACT_EMAIL = "nutrinuelita@gmail.com";

export const TONES = {
  pink: { bg: "#FDE4EA", solid: "#E86A92", ink: "#8E2C4B" },
  sage: { bg: "#E7F2DA", solid: "#7FB069", ink: "#1F4D3A" },
  butter: { bg: "#FFF1C9", solid: "#C88A0A", ink: "#6B4E00" },
  peach: { bg: "#FFE3D8", solid: "#F4845F", ink: "#8A3416" },
};

export function toneOf(event) {
  return TONES[event.tone] || TONES.pink;
}

const byStart = (a, b) => new Date(a.start) - new Date(b.start);

export function getUpcomingEvents(now = new Date()) {
  return events.filter((e) => new Date(e.end || e.start) >= now).sort(byStart);
}

export function getPastEvents(now = new Date()) {
  return events
    .filter((e) => new Date(e.end || e.start) < now)
    .sort((a, b) => byStart(b, a));
}

export function getEventById(id) {
  return events.find((e) => e.id === id);
}

// The event marked `featured`, or else the next one on the calendar
export function getFeaturedEvent(now = new Date()) {
  const upcoming = getUpcomingEvents(now);
  return upcoming.find((e) => e.featured) || upcoming[0] || null;
}

const fmt = (options) => new Intl.DateTimeFormat("es-CO", { timeZone: TIME_ZONE, ...options });

export function dateParts(iso) {
  const d = new Date(iso);
  return {
    day: fmt({ day: "2-digit" }).format(d),
    month: fmt({ month: "short" }).format(d).replace(".", ""),
    weekday: fmt({ weekday: "long" }).format(d),
    year: fmt({ year: "numeric" }).format(d),
    long: fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d),
    short: fmt({ day: "numeric", month: "short", year: "numeric" }).format(d).replace(".", ""),
  };
}

export function timeRange(event) {
  const t = fmt({ hour: "numeric", minute: "2-digit", hour12: true });
  const start = t.format(new Date(event.start));
  return event.end ? `${start} – ${t.format(new Date(event.end))}` : start;
}

export function spotsInfo(event) {
  if (!event.capacity) return null;
  const registered = Math.min(event.registered || 0, event.capacity);
  const left = event.capacity - registered;
  return {
    left,
    pct: Math.round((registered / event.capacity) * 100),
    label: left === 0 ? "Cupos agotados" : left <= 10 ? `¡Últimos ${left} cupos!` : `Quedan ${left} cupos`,
    urgent: left <= 10,
  };
}

export function registrationHref(event) {
  if (event.registrationUrl) return event.registrationUrl;
  const subject = `Inscripción: ${event.title}`;
  const body = `¡Hola Manuela! Quiero inscribirme a "${event.title}" (${dateParts(event.start).short}).\n\nNombre:\nTeléfono:\n`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function talkRequestHref() {
  const subject = "Quiero una charla de NutriNuelita";
  const body =
    "¡Hola Manuela! Me gustaría llevar una charla/taller a:\n\nOrganización:\nTema de interés:\nNúmero aproximado de asistentes:\nFecha tentativa:\n";
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Google Calendar "add event" template link
export function googleCalendarHref(event) {
  const stamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = event.end || new Date(new Date(event.start).getTime() + 60 * 60 * 1000).toISOString();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.title} · NutriNuelita`,
    dates: `${stamp(event.start)}/${stamp(end)}`,
    details: event.summary || "",
    location: [event.location, event.city].filter(Boolean).join(", "),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
