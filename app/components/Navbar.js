'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
               { name: "Sobre Mí", href: "/#about" },
               { name: "Servicios", href: "/#services" },
               { name: "Recetas", href: "/recipes" },
               { name: "Blog", href: "/blog" },
             ].map((link) => {
               const isActive = pathname === link.href;
               // If we are on the homepage and the link is a hash link (e.g. /#about), 
               // use just the hash (#about) to enable smooth scrolling.
               // Otherwise use the full path.
               let href = link.href;
               if (pathname === '/' && link.href.startsWith('/#')) {
                 href = link.href.substring(1); // removes the leading slash, leaving #about
               }

               return (
               <Link 
                 key={link.name} 
                 href={href}
                 style={{ 
                   fontWeight: '600', 
                   fontSize: '0.95rem',
                   position: 'relative'
                 }}
                 className="nav-link"
               >
                 {link.name}
               </Link>
             )})}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none', // Hidden by default, shown via CSS
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-primary)',
              zIndex: 60
            }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* CTA Desktop */}
          <a href="https://calendar.app.google/bCFxLUv3dstFdmkT6" target="_blank" className="btn btn-primary desktop-cta" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
            Agendar Cita
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '80px', // Below header
              left: 0,
              right: 0,
              backgroundColor: '#FFFBF5',
              padding: '2rem',
              borderBottom: '2px solid var(--color-primary-light)',
              zIndex: 49,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
               {[
                 { name: "Inicio", href: "/" },
                 { name: "Sobre Mí", href: "/#about" },
                 { name: "Servicios", href: "/#services" },
                 { name: "Recetas", href: "/recipes" },
                 { name: "Blog", href: "/blog" },
               ].map((link) => {
                 let href = link.href;
                 if (pathname === '/' && link.href.startsWith('/#')) {
                   href = link.href.substring(1); 
                 }
                 return (
                   <Link 
                     key={link.name} 
                     href={href}
                     onClick={() => setMobileMenuOpen(false)}
                     style={{ 
                       fontWeight: '700', 
                       fontSize: '1.2rem',
                       color: 'var(--color-text-main)'
                     }}
                   >
                     {link.name}
                   </Link>
                 )
               })}
               <a href="https://calendar.app.google/bCFxLUv3dstFdmkT6" target="_blank" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                 Agendar Cita
               </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
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
        @media (max-width: 900px) {
          .desktop-nav, .desktop-cta { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.header>
  );
}
