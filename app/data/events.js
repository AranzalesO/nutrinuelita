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
    start: "2025-10-23T12:00:00-05:00",
    hideTime: true, // no mostramos hora porque no está registrada
    hideHost: true, // sin la tarjeta "Facilitó" en este evento
    location: "Medellín",
    tone: "pink",
    image: "/images/about/medellin.jpg",
    summary:
      "Hablamos de seguridad alimentaria como un derecho: que todas las personas tengan acceso, en todo momento, a alimentos suficientes, nutritivos y culturalmente adecuados para llevar una vida sana.",
    recap: `Abordamos la seguridad alimentaria desde sus cuatro dimensiones: la disponibilidad de alimentos, el acceso físico y económico a ellos, su aprovechamiento biológico (que el cuerpo realmente pueda nutrirse de lo que come) y la estabilidad de todo lo anterior en el tiempo, incluso frente a crisis económicas o climáticas.

Revisamos cómo la inseguridad alimentaria no se limita al hambre: convive con la malnutrición en todas sus formas, desde la desnutrición y las deficiencias de micronutrientes hasta el sobrepeso, la obesidad y las enfermedades cardiometabólicas. Por eso las soluciones no pueden quedarse solo en el plato; también dependen del entorno en el que vivimos, de lo que cuesta comer bien y de la información con la que tomamos decisiones.

Conversamos sobre el papel de las políticas públicas para garantizar este derecho: los programas de alimentación escolar, el fortalecimiento de los circuitos cortos de comercialización con productores locales y campesinos, la reducción de pérdidas y desperdicios de alimentos y la educación alimentaria y nutricional como herramienta para construir sistemas alimentarios más justos, saludables y sostenibles en la ciudad.`,
  },
];
