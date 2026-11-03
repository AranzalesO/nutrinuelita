'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Instagram, Facebook, Linkedin, Mail, ArrowUp } from "lucide-react";
import { SOCIAL } from "../lib/site";
import styles from "./Footer.module.css";

const LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Sobre Mí", href: "/#about" },
  { name: "Servicios", href: "/#services" },
  { name: "Eventos y charlas", href: "/eventos" },
  { name: "Recetas", href: "/recipes" },
  { name: "Blog", href: "/blog" },
];

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark}>🦦</span>
              <span>NutriNuelita</span>
            </Link>
            <p className={styles.tagline}>
              Nutrición divertida y colorida para una vida saludable. Sin restricciones, con mucho sabor.
            </p>
            <a href="mailto:nutrinuelita@gmail.com" className={styles.email}>nutrinuelita@gmail.com</a>
          </div>

          {/* Links Column */}
          <div className={styles.col}>
            <h4>Navegación</h4>
            <ul>
              {LINKS.map((link) => {
                // On the homepage, hash links scroll smoothly instead of reloading
                const href = pathname === '/' && link.href.startsWith('/#') ? link.href.substring(1) : link.href;
                return (
                  <li key={link.name}>
                    <Link href={href}>{link.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal/Social Column */}
          <div className={styles.col}>
            <h4>Sígueme</h4>
            <div className={styles.social}>
              <a href="https://www.instagram.com/nutrinuelita/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/profile.php?id=61584691671024" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn de Manuela Acevedo Álvarez"><Linkedin size={20} /></a>
              <a href="mailto:nutrinuelita@gmail.com" aria-label="Email"><Mail size={20} /></a>
            </div>
            <ul className={styles.legal}>
              <li><Link href="#">Política de Privacidad</Link></li>
              <li><Link href="#">Términos y Condiciones</Link></li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <motion.div
          className={styles.wordmark}
          aria-hidden="true"
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          NutriNuelita
        </motion.div>

        <div className={styles.bottom}>
          <span>© {year} NutriNuelita · Manuela Acevedo Álvarez, Nutricionista Dietista</span>
          <span className={styles.made}>Hecho con <Heart size={14} fill="currentColor" /> en Medellín</span>
          <button
            className={styles.toTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
