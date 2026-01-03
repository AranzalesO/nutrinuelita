'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

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
                {[
                  { name: "Inicio", href: "/" },
                  { name: "Sobre Mí", href: "/#about" },
                  { name: "Servicios", href: "/#services" },
                  { name: "Recetas", href: "/recipes" },
                  { name: "Blog", href: "/blog" },
                ].map((link) => {
                  // If we are on the homepage and the link is a hash link (e.g. /#about), 
                  // use just the hash (#about) to enable smooth scrolling.
                  let href = link.href;
                  if (pathname === '/' && link.href.startsWith('/#')) {
                    href = link.href.substring(1); 
                  }
                  
                  return (
                    <li key={link.name}>
                      <Link href={href}>{link.name}</Link>
                    </li>
                  )
                })}
            </ul>
          </div>

          {/* Legal/Social Column */}
          <div className="footer-col">
            <h4>Sígueme</h4>
            <div className="social-links">
              <a href="https://www.instagram.com/nutrinuelita/" target="_blank" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://www.facebook.com/profile.php?id=61584691671024" target="_blank" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="mailto:nutrinuelita@gmail.com" target="_blank" aria-label="Email"><Mail size={20} /></a>
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
