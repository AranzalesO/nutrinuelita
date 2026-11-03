'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { dateParts } from "../../lib/events";
import styles from "./Events.module.css";

const TILTS = [-6, 4, -2, 5, -4];

// Past events as a scattered stack of polaroids
export default function Memories({ events }) {
  const withPhotos = events.filter((e) => e.image);
  if (!withPhotos.length) return null;

  return (
    <div className={styles.polaroids}>
      {withPhotos.map((event, i) => (
        <motion.div
          key={event.id}
          className={styles.polaroidWrap}
          initial={{ opacity: 0, y: 60, rotate: 0 }}
          whileInView={{ opacity: 1, y: 0, rotate: TILTS[i % TILTS.length] }}
          whileHover={{ rotate: 0, y: -12, scale: 1.04, zIndex: 5 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: i * 0.12 }}
        >
          <Link href={`/eventos/${event.id}`} className={styles.polaroid}>
            <span className={styles.tape} aria-hidden="true" />
            <div className={styles.polaroidPhoto}>
              <Image src={event.image} alt={event.title} fill sizes="300px" style={{ objectFit: 'cover' }} />
            </div>
            <span className={styles.polaroidCaption}>{event.title}</span>
            <span className={styles.polaroidDate}>{dateParts(event.start).short}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
