'use client';

import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";
import { talkRequestHref } from "../../lib/events";
import styles from "./Events.module.css";

const TOPICS = [
  "Alimentación en el trabajo",
  "Loncheras saludables",
  "Mindful eating",
  "Salud planetaria",
  "Nutrición y salud mental",
  "Seguridad alimentaria",
];

export default function TalkRequest() {
  return (
    <motion.div
      className={styles.talk}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      data-cursor-light="true"
    >
      <motion.div
        className={styles.talkMic}
        animate={{ rotate: [-8, 8, -8], y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Mic size={26} />
      </motion.div>

      <div className={styles.talkCopy}>
        <span className={styles.talkKicker}>Empresas · Colegios · Comunidades</span>
        <h3 className={styles.talkTitle}>
          ¿Una charla para <em>tu gente</em>?
        </h3>
        <p className={styles.talkText}>
          Diseño charlas y talleres a la medida de tu organización: presenciales o virtuales,
          con dinámicas, material descargable y mucha conversación.
        </p>
        <ul className={styles.talkTopics}>
          {TOPICS.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>

      <a href={talkRequestHref()} className={`btn btn-primary ${styles.talkCta}`}>
        Solicitar una charla <span className="btn-arrow"><ArrowRight size={18} /></span>
      </a>
    </motion.div>
  );
}
