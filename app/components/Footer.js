'use client';

import Link from "next/link";
import { Heart, Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <Link href="/" className="logo">
              <span style={{ fontSize: '2rem' }}>🦦</span>
              <span>NutriNuelita</span>
            </Link>
            <p className="tagline">
              Nutrición divertida y colorida para una vida saludable. Sin restricciones, con mucho sabor.
            </p>
          </div>

          {/* Links Column */}
          <div className="footer-col">
            <h4>Navegación</h4>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/#services">Servicios</Link></li>
              <li><Link href="/blog">Blog / Recetas</Link></li>
              <li><Link href="#">Contacto</Link></li>
            </ul>
          </div>

          {/* Legal/Social Column */}
          <div className="footer-col">
            <h4>Sígueme</h4>
            <div className="social-links">
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="mailto:hola@nutrinuelita.com" aria-label="Email"><Mail size={20} /></a>
            </div>
            
             <div className="legal-links">
              <Link href="#">Política de Privacidad</Link>
              <Link href="#">Términos y Condiciones</Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
