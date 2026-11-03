'use client';

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Events.module.css";

function split(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    días: Math.floor(total / 86400),
    horas: Math.floor((total % 86400) / 3600),
    min: Math.floor((total % 3600) / 60),
    seg: total % 60,
  };
}

// Each number slides up when it changes, like a split-flap board
function Unit({ value, label }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className={styles.cdUnit}>
      <div className={styles.cdValue}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={styles.cdLabel}>{label}</span>
    </div>
  );
}

export default function Countdown({ to, light = false }) {
  // Rendered only after mount so server and client markup always match
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(to).getTime();
  const parts = now ? split(target - now) : { días: 0, horas: 0, min: 0, seg: 0 };
  const live = now && target - now <= 0;

  if (live) {
    return <div className={styles.cdLive}><span className={styles.liveDot} /> ¡Está pasando ahora!</div>;
  }

  return (
    <div className={`${styles.countdown} ${light ? styles.cdLight : ''}`} aria-label="Tiempo restante para el evento" role="timer">
      {Object.entries(parts).map(([label, value]) => (
        <Unit key={label} value={now ? value : '--'} label={label} />
      ))}
    </div>
  );
}
