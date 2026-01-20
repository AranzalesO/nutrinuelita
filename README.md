# NutriNuelita 🦦

Bienvenido a **NutriNuelita**, una plataforma web moderna y vibrante diseñada para una nutricionista integral en Medellín. Este proyecto destaca por su diseño fresco, animaciones fluidas y enfoque en la experiencia de usuario.

## 🚀 Tecnologías

Este proyecto está construido con un stack moderno enfocado en rendimiento y diseño:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Estilos**: CSS Modules & Variables CSS globales (Sin frameworks de UI pesados).
-   **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
-   **Iconos**: [Lucide React](https://lucide.dev/)
-   **Fuentes**: [Google Fonts](https://fonts.google.com/) (Fredoka)

## ✨ Características Principales

-   **Diseño "Veggie"**: Una estética colorida y amigable inspirada en alimentos frescos, con una paleta de colores pasteles y formas orgánicas.
-   **Blog Interactivo**: Sistema de blog con renderizado de contenido HTML, gestión de imágenes de portada y fallback a colores temáticos.
-   **Recetario Digital**:
    -   Búsqueda en tiempo real.
    -   Filtrado por categorías (Desayuno, Almuerzo, Cena, etc.).
    -   Tarjetas de recetas con imágenes y detalles de preparación.
-   **Animaciones**: Transiciones suaves al hacer scroll, elementos flotantes y micro-interacciones.
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

---

Hecho con 💖 y 🥑 en Medellín.
