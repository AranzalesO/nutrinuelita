'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FeaturedEvent from "./events/FeaturedEvent";
import EventTicket from "./events/EventTicket";
import Memories from "./events/Memories";
import TalkRequest from "./events/TalkRequest";
import EmptyAgenda from "./events/EmptyAgenda";
import { getFeaturedEvent, getUpcomingEvents, getPastEvents } from "../lib/events";
import { useNow } from "../lib/useNow";
import styles from "./events/Events.module.css";

export default function Events() {
  const now = useNow();
  const featured = now && getFeaturedEvent(now);
  const rest = now ? getUpcomingEvents(now).filter((e) => e.id !== featured?.id).slice(0, 3) : [];
  const past = now ? getPastEvents(now).slice(0, 3) : [];

  return (
    <section id="eventos" className={`section-padding ${styles.section}`}>
      <div className="container">
        <div className={styles.head}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">Agenda · Eventos y charlas</span>
            <h2 className={styles.title}>
              Charlas que se <span className="serif-accent">saborean</span>
            </h2>
          </motion.div>
          <motion.div
            className={styles.headAside}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="lead">
              Talleres, conferencias y encuentros en vivo para aprender a comer con ciencia,
              sin culpa y en comunidad.{featured ? ' Reserva tu cupo antes de que se acaben.' : ''}
            </p>
            <Link href={featured || !now ? "/eventos" : "/eventos#memorias"} className={styles.allLink}>
              {featured || !now ? 'Ver toda la agenda' : 'Ver eventos anteriores'} <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {!now ? (
          <div className={styles.placeholder} aria-hidden="true" />
        ) : featured ? (
          <FeaturedEvent event={featured} />
        ) : (
          <EmptyAgenda />
        )}

        {rest.length > 0 && (
          <>
            <div className={styles.subhead}>
              <h3>Próximas fechas</h3>
              <span className={styles.subheadLine} />
            </div>
            <div className={styles.ticketGrid}>
              {rest.map((event, i) => (
                <EventTicket key={event.id} event={event} index={i} />
              ))}
            </div>
          </>
        )}

        <div className={styles.bottomGrid}>
          {past.length > 0 && (
            <div className={styles.memories}>
              <div className={styles.subhead}>
                <h3>Memorias</h3>
                <span className={styles.subheadLine} />
              </div>
              <Memories events={past} />
            </div>
          )}
          <TalkRequest />
        </div>
      </div>
    </section>
  );
}
