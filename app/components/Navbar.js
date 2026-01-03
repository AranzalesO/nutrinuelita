'use client';

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const variants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 }
  };

  return (
    <motion.header
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? '1rem 0' : '2rem 0',
        transition: 'padding 0.3s ease'
      }}
    >
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          padding: '0.8rem 2rem',
          borderRadius: '50px',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.3s ease'
        }}>
          {/* Logo */}
          <Link href="/" style={{ 
            fontSize: '1.5rem', 
            fontFamily: 'var(--font-heading)', 
            fontWeight: '800', 
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '2rem' }}>🦦</span>
            NutriNuelita
          </Link>

          {/* Nav Links */}
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
             {[
               { name: "Inicio", href: "/" },
               { name: "Servicios", href: "/#services" },
               { name: "Blog / Recetas", href: "/blog" },
             ].map((link) => (
               <Link 
                 key={link.name} 
                 href={link.href}
                 style={{ 
                   fontWeight: '600', 
                   fontSize: '0.95rem',
                   position: 'relative'
                 }}
                 className="nav-link"
               >
                 {link.name}
               </Link>
             ))}
          </nav>

          {/* CTA */}
          <a href="https://calendar.google.com" target="_blank" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
            Agendar Cita
          </a>
        </div>
      </div>
      
      {/* Styles for hover underline */}
      <style jsx global>{`
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: var(--color-accent);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
