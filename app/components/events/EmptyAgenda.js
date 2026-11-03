'use client';

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import styles from "./Events.module.css";

// Shown when there are no upcoming events: a "coming soon" ticket instead of an empty list
export default function EmptyAgenda() {
  return (
    <motion.div
      className={styles.soon}
      initial={{ opacity: 0, y: 40, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.soonStub}>
        <motion.span
          className={styles.soonOtter}
          animate={{ rotate: [-8, 8, -8], y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          🦦
        </motion.span>
        <span className={styles.soonStubLabel}>Próximamente</span>
      </div>

      <div className={`${styles.perforation} ${styles.perforationVertical}`} aria-hidden="true" />

      <div className={styles.soonBody}>
        <h3 className={styles.soonTitle}>
          Estamos preparando <em>nuevas fechas</em>
        </h3>
        <p className={styles.soonText}>
          En este momento no hay eventos programados. Sígueme en Instagram para enterarte primero
          cuando abra inscripciones, o lleva una charla a tu empresa, colegio o comunidad.
        </p>
        <div className={styles.soonActions}>
          <a href="https://www.instagram.com/nutrinuelita/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <Instagram size={18} /> Avisarme en Instagram
          </a>
        </div>
      </div>
    </motion.div>
  );
}
