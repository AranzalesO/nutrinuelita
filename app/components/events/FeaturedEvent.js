'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarPlus, Clock, ArrowRight, Sparkles } from "lucide-react";
import Countdown from "./Countdown";
import { ModalityIcon, SpotsBar } from "./EventTicket";
import { dateParts, timeRange, toneOf, registrationHref, googleCalendarHref } from "../../lib/events";
import styles from "./Events.module.css";

export default function FeaturedEvent({ event, priority = false }) {
  const tone = toneOf(event);
  const d = dateParts(event.start);
  const external = registrationHref(event).startsWith("http");

  return (
    <motion.article
      className={styles.featured}
      style={{ '--tone-bg': tone.bg, '--tone-solid': tone.solid, '--tone-ink': tone.ink }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left: poster */}
      <div className={styles.poster} data-cursor-light="true">
        {event.image && (
          <motion.div
            className={styles.posterImage}
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={event.image} alt="" fill priority={priority} sizes="(max-width: 960px) 100vw, 480px" style={{ objectFit: 'cover', objectPosition: '50% 20%' }} />
          </motion.div>
        )}
        <div className={styles.posterShade} />

        <motion.span
          className={styles.featuredBadge}
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles size={14} /> Destacado
        </motion.span>

        <div className={styles.posterDate}>
          <span className={styles.posterDay}>{d.day}</span>
          <span className={styles.posterMonth}>{d.month} {d.year}</span>
          <span className={styles.posterWeekday}>{d.weekday}</span>
        </div>
      </div>

      <div className={`${styles.perforation} ${styles.perforationVertical}`} aria-hidden="true" />

      {/* Right: details */}
      <div className={styles.featuredBody}>
        <div className={styles.chips}>
          <span className={styles.chipSolid}>{event.type}</span>
          <span className={styles.chip}><ModalityIcon modality={event.modality} /> {event.modality}</span>
          <span className={styles.chip}>{event.price}</span>
        </div>

        <h3 className={styles.featuredTitle}>{event.title}</h3>
        <p className={styles.featuredSummary}>{event.summary}</p>

        <ul className={styles.featuredMeta}>
          <li><Clock size={16} /> {timeRange(event)}</li>
          <li><ModalityIcon modality={event.modality} size={16} /> {event.location}{event.city && event.city !== 'Online' ? `, ${event.city}` : ''}</li>
        </ul>

        <div className={styles.featuredCountdown}>
          <span className={styles.cdKicker}>Empieza en</span>
          <Countdown to={event.start} />
        </div>

        <SpotsBar event={event} />

        <div className={styles.featuredActions}>
          <a
            href={registrationHref(event)}
            className="btn btn-primary"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            Reservar mi cupo <span className="btn-arrow"><ArrowRight size={18} /></span>
          </a>
          <a href={googleCalendarHref(event)} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} aria-label="Añadir a Google Calendar" title="Añadir a Google Calendar">
            <CalendarPlus size={20} />
          </a>
          <Link href={`/eventos/${event.id}`} className={styles.moreLink}>Ver detalles</Link>
        </div>
      </div>
    </motion.article>
  );
}
