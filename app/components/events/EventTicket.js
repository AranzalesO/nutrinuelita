'use client';

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Clock, ArrowUpRight, Video, Users } from "lucide-react";
import { dateParts, timeRange, spotsInfo, toneOf } from "../../lib/events";
import styles from "./Events.module.css";

export function ModalityIcon({ modality, size = 14 }) {
  return modality === "Virtual" ? <Video size={size} /> : modality === "Híbrido" ? <Users size={size} /> : <MapPin size={size} />;
}

export function SpotsBar({ event, light = false }) {
  const spots = spotsInfo(event);
  if (!spots) return null;
  return (
    <div className={`${styles.spots} ${light ? styles.spotsLight : ''}`}>
      <div className={styles.spotsTop}>
        <span className={spots.urgent ? styles.spotsUrgent : ''}>{spots.label}</span>
        <span>{spots.pct}% lleno</span>
      </div>
      <div className={styles.spotsTrack}>
        <motion.div
          className={styles.spotsFill}
          initial={{ width: 0 }}
          whileInView={{ width: `${spots.pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>
    </div>
  );
}

// A paper ticket: coloured date stub + perforation + details. Tilts toward the pointer.
export default function EventTicket({ event, index = 0, past = false }) {
  const tone = toneOf(event);
  const d = dateParts(event.start);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900, height: '100%' }}
    >
      <motion.div style={{ rotateX, rotateY, height: '100%' }} onMouseMove={onMove} onMouseLeave={onLeave}>
        <Link
          href={`/eventos/${event.id}`}
          className={`${styles.ticket} ${past ? styles.ticketPast : ''}`}
          style={{ '--tone-bg': tone.bg, '--tone-solid': tone.solid, '--tone-ink': tone.ink }}
        >
          <div className={styles.stub}>
            <div className={styles.stubDate}>
              <span className={styles.stubDay}>{d.day}</span>
              <span className={styles.stubMonth}>{d.month}</span>
            </div>
            <div className={styles.stubMeta}>
              <span className={styles.stubWeekday}>{d.weekday}</span>
              <span className={styles.typeTag}>{event.type}</span>
            </div>
          </div>

          <div className={styles.perforation} aria-hidden="true" />

          <div className={styles.ticketBody}>
            <h3 className={styles.ticketTitle}>{event.title}</h3>
            <ul className={styles.meta}>
              {timeRange(event) && <li><Clock size={14} /> {timeRange(event)}</li>}
              <li><ModalityIcon modality={event.modality} /> {event.modality} · {event.location}</li>
            </ul>
            {!past && <SpotsBar event={event} />}
            <div className={styles.ticketFoot}>
              <span className={styles.price}>{past ? 'Ver memorias' : event.price}</span>
              <span className={styles.ticketGo}><ArrowUpRight size={18} /></span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
