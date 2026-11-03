# Nutrinuelita 🦦

Bienvenido a **Nutrinuelita**, una plataforma web moderna y vibrante diseñada para una nutricionista integral en Medellín. Este proyecto destaca por su diseño fresco, animaciones fluidas y enfoque en la experiencia de usuario.

## 🚀 Tecnologías

Este proyecto está construido con un stack moderno enfocado en rendimiento y diseño:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Estilos**: CSS Modules & Variables CSS globales (Sin frameworks de UI pesados).
-   **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
-   **Iconos**: [Lucide React](https://lucide.dev/)
-   **Fuentes**: [Google Fonts](https://fonts.google.com/) — Fraunces (títulos), Plus Jakarta Sans (texto) y Fredoka (logo)

## ✨ Características Principales

-   **Diseño "Veggie"**: Una estética colorida y amigable inspirada en alimentos frescos, con una paleta de colores pasteles y formas orgánicas.
-   **Blog Interactivo**: Sistema de blog con renderizado de contenido HTML, gestión de imágenes de portada y fallback a colores temáticos.
-   **Recetario Digital**:
    -   Búsqueda en tiempo real.
    -   Filtrado por categorías (Desayuno, Almuerzo, Cena, etc.).
    -   Tarjetas de recetas con imágenes y detalles de preparación.
-   **Agenda de Eventos y Charlas** (`/eventos`):
    -   Evento destacado con cuenta regresiva en vivo y barra de cupos.
    -   Tarjetas tipo "boleto" con filtros por tipo (Charlas, Talleres, Webinars, Conferencias).
    -   Página de detalle por evento con agenda, botón de inscripción, "Añadir a Google Calendar" y compartir.
    -   "Memorias" de eventos pasados y formulario para solicitar charlas en empresas o colegios.
-   **Animaciones**: Transiciones suaves al hacer scroll, elementos flotantes y micro-interacciones (respetan la preferencia "reducir movimiento" del sistema).
-   **Performance**: Imágenes optimizadas con `next/image` y carga diferida.

## 🛠️ Instalación y Uso

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/AranzalesO/nutrinuelita.git
    cd nutrinuelita
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Correr el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

4.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

-   `/app`: Rutas y componentes de página (Next.js App Router).
-   `/components`: Componentes reutilizables (Navbar, Hero, Footer, Graphics, etc.).
-   `/data`: Archivos estáticos de datos (posts, recetas).
-   `/public`: Assets estáticos (imágenes).

## 🎨 Personalización

-   **Colores**: Los colores principales están definidos en `app/globals.css` como variables CSS (`--color-primary`, `--color-accent`, etc.).
-   **Contenido**: Puedes editar los archivos en `app/data/` para agregar nuevos posts o recetas sin tocar el código de la UI.

## 📅 Publicar un evento o charla

1.  Abre `app/data/events.js`.
2.  Copia la plantilla comentada que está al inicio del archivo, pégala dentro de `events` y cambia el `id` (será la URL `/eventos/<id>`), título, fechas y textos.
3.  Las fechas van en formato ISO con zona horaria de Colombia: `"2026-11-08T09:00:00-05:00"`.
4.  Guarda y publica. El sitio decide solo si el evento es *próximo* o *pasado* según la fecha de fin.

Campos útiles: `featured: true` (lo destaca en la home con cuenta regresiva), `registrationUrl` (link de Google Forms, Eventbrite, etc.; si no existe, el botón abre un correo de inscripción), `capacity` / `registered` (barra de cupos), `image` y `recap` (texto para "Memorias").

Si no hay eventos próximos, la web muestra automáticamente "Nuevas fechas muy pronto" y las Memorias de los eventos pasados. Escribe el `summary` y el `recap` de los eventos pasados en tiempo pasado.

---

Hecho con 💖 y 🥑 en Medellín.
