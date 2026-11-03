/*
 * ─────────────────────────────────────────────────────────────
 *  AGENDA · Cómo publicar un evento o charla
 * ─────────────────────────────────────────────────────────────
 *  1. Copia la PLANTILLA de abajo (está comentada), pégala dentro de la
 *     lista `events` y quita los // del inicio de cada línea.
 *  2. Cambia el `id` (será la URL: /eventos/<id>) — sin espacios ni tildes.
 *  3. Escribe las fechas en formato ISO con la zona horaria de Colombia:
 *       start: "2026-11-08T09:00:00-05:00"
 *  4. Guarda. El sitio decide solo si el evento es "próximo" o "pasado"
 *     según la fecha de fin, y ordena todo automáticamente.
 *
 *  Mientras no haya eventos próximos, la web muestra "Nuevas fechas muy
 *  pronto" y las Memorias de los eventos pasados.
 *
 *  Campos opcionales:
 *  - registrationUrl: link de inscripción (Google Forms, Eventbrite, Luma…).
 *    Si no lo pones, el botón abre un correo de inscripción a nutrinuelita@gmail.com.
 *  - capacity / registered: muestran la barra de cupos ("Quedan 12 cupos").
 *  - featured: true → aparece destacado con cuenta regresiva en la home.
 *  - image: foto de portada en /public/images/...
 *  - recap: texto para eventos pasados ("Así lo vivimos"), escrito en pasado.
 *
 *  PLANTILLA (evento próximo):
 *
 *  {
 *    id: "nombre-del-evento",
 *    title: "Título del evento",
 *    type: "Charla",              // Charla | Taller | Webinar | Conferencia
 *    modality: "Presencial",      // Presencial | Virtual | Híbrido
 *    start: "2026-12-05T09:00:00-05:00",
 *    end: "2026-12-05T11:00:00-05:00",
 *    location: "Nombre del lugar",
 *    city: "Medellín",            // "Online" si es virtual
 *    price: "Gratis",
 *    capacity: 30,
 *    registered: 0,
 *    featured: true,
 *    tone: "pink",                // pink | sage | butter | peach
 *    registrationUrl: "https://...",
 *    summary: "Una frase que invite a inscribirse.",
 *    description: "Uno o dos párrafos sobre el evento.",
 *    audience: "¿Para quién es?",
 *    agenda: [{ time: "09:00", title: "Bienvenida" }],
 *    takeaways: ["Material descargable"],
 *  },
 * ─────────────────────────────────────────────────────────────
 */

export const EVENT_TYPES = ["Charla", "Taller", "Webinar", "Conferencia"];

export const events = [
  // ── Eventos pasados (aparecen en "Memorias") ──
  {
    id: "global-shapers-feria-sostenible",
    title: "Feria de consumo consciente",
    type: "Charla",
    modality: "Presencial",
    start: "2026-08-15T14:00:00-05:00",
    end: "2026-08-15T18:00:00-05:00",
    location: "Medellín",
    tone: "sage",
    image: "/images/about/global-shaper.jpg",
    summary:
      "Compartimos claves de alimentación sostenible y consumo responsable con la comunidad.",
    recap:
      "Fue una tarde llena de preguntas sobre cómo comer rico cuidando el planeta. Hablamos de compras conscientes, desperdicio de alimentos y de cómo pequeñas decisiones diarias suman.",
  },
  {
    id: "referentes-alcaldia-medellin",
    title: "Liderazgo para la salud pública",
    type: "Conferencia",
    modality: "Presencial",
    start: "2026-06-12T09:00:00-05:00",
    end: "2026-06-12T13:00:00-05:00",
    location: "Alcaldía de Medellín",
    tone: "pink",
    image: "/images/about/medellin.jpg",
    summary: "Participé en el encuentro de jóvenes líderes del programa de la Alcaldía de Medellín.",
    recap:
      "Conversamos sobre seguridad alimentaria y políticas públicas con líderes de la ciudad, y sobre el papel de la nutrición en la salud de las comunidades.",
  },
];
