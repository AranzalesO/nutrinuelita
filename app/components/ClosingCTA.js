'use client';

import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { VeggieCircle, Sparkle } from "./Graphics";
import { BOOKING_URL } from "./Navbar";
import styles from "./ClosingCTA.module.css";

export default function ClosingCTA() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.panel}
          data-cursor-light="true"
          initial={{ opacity: 0, scale: 0.96, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <VeggieCircle color="rgba(255, 209, 102, 0.55)" size="320px" left="-90px" bottom="-130px" delay={0.2} />
          <VeggieCircle color="rgba(255, 255, 255, 0.18)" size="260px" right="-60px" top="-90px" delay={0.4} />

          <div className={styles.content}>
            <Sparkle size={34} color="var(--color-accent)" delay={0.5} />
            <h2 className={styles.title}>
              Tu cuerpo merece <br />
              <em>comer con amor</em>
            </h2>
            <p className={styles.text}>
              Agenda tu primera consulta y diseñemos un plan que se adapte a tu vida, no al revés.
            </p>
            <div className={styles.actions}>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Agendar mi consulta <span className="btn-arrow"><ArrowRight size={18} /></span>
              </a>
              <a href="https://www.instagram.com/nutrinuelita/" target="_blank" rel="noopener noreferrer" className={styles.ghost}>
                <Instagram size={18} /> Escríbeme por Instagram
              </a>
            </div>
          </div>

          <motion.span
            className={styles.otter}
            aria-hidden="true"
            animate={{ rotate: [-8, 8, -8], y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🦦
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
