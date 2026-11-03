'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Instagram } from "lucide-react";
import { getUpcomingEvents } from "../lib/events";
import { useNow } from "../lib/useNow";
import styles from "./Navbar.module.css";

export const BOOKING_URL = "https://calendar.app.google/bCFxLUv3dstFdmkT6";

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Sobre Mí", href: "/#about" },
  { name: "Servicios", href: "/#services" },
  { name: "Eventos", href: "/eventos", badge: true },
  { name: "Recetas", href: "/recipes" },
  { name: "Blog", href: "/blog" },
];

// On the homepage, "/#about" becomes "#about" so the browser smooth-scrolls
function resolveHref(href, pathname) {
  return pathname === '/' && href.startsWith('/#') ? href.substring(1) : href;
}

function isActive(href, pathname) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return false;
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const now = useNow();
  // The pulsing dot on "Eventos" only makes sense when something is coming up
  const hasUpcoming = Boolean(now) && getUpcomingEvents(now).length > 0;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    setHidden(!mobileMenuOpen && latest > previous && latest > 150);
    setScrolled(latest > 50);
  });

  // Lock page scroll behind the mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const variants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 }
  };

  return (
    <>
    <motion.header
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className="container">
        <div className={styles.bar}>
          <Link href="/" className={styles.logo} aria-label="NutriNuelita, inicio">
            <motion.span
              className={styles.logoMark}
              whileHover={{ rotate: [0, -14, 10, -6, 0] }}
              transition={{ duration: 0.6 }}
            >
              🦦
            </motion.span>
            <span>NutriNuelita</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="Principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={resolveHref(link.href, pathname)}
                className={`${styles.navLink} ${isActive(link.href, pathname) ? styles.active : ''}`}
              >
                {link.name}
                {link.badge && hasUpcoming && <span className={styles.dot} aria-hidden="true" />}
              </Link>
            ))}
          </nav>

          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-dark ${styles.cta}`}>
            Agendar cita <span className="btn-arrow"><ArrowRight size={16} /></span>
          </a>

          <button
            className={styles.toggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.header>

      {/* Mobile Menu Overlay — rendered outside the (transformed) header so `position: fixed` covers the viewport */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className={styles.mobileNav} aria-label="Menú móvil">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={resolveHref(link.href, pathname)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.mobileLink}
                  >
                    <span className={styles.mobileIndex}>0{i + 1}</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className={styles.mobileFooter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
                Agendar cita <span className="btn-arrow"><ArrowRight size={18} /></span>
              </a>
              <a href="https://www.instagram.com/nutrinuelita/" target="_blank" rel="noopener noreferrer" className={styles.mobileSocial}>
                <Instagram size={18} /> @nutrinuelita
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
