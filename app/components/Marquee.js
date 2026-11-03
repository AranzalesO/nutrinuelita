'use client';

import { motion } from "framer-motion";
import styles from "./Marquee.module.css";

const WORDS = [
  "Sin dietas locas",
  "Educación real",
  "Salud planetaria",
  "Comer con placer",
  "Ciencia + corazón",
  "Hábitos que duran",
];

function Track({ items, duration, reverse }) {
  // Content is duplicated so the loop is seamless at -50%
  const row = [...items, ...items];
  return (
    <motion.div
      className={styles.track}
      animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {row.map((word, i) => (
        <span key={i} className={styles.item}>
          {word}
          <svg className={styles.star} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0 C 13 8, 16 11, 24 12 C 16 13, 13 16, 12 24 C 11 16, 8 13, 0 12 C 8 11, 11 8, 12 0 Z" />
          </svg>
        </span>
      ))}
    </motion.div>
  );
}

export default function Marquee() {
  return (
    <div className={styles.wrap} aria-label={WORDS.join(', ')} role="img">
      <div className={`${styles.band} ${styles.back}`}>
        <Track items={WORDS} duration={40} reverse />
      </div>
      <div className={`${styles.band} ${styles.front}`}>
        <Track items={WORDS} duration={32} />
      </div>
    </div>
  );
}
