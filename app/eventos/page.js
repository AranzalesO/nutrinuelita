'use client';

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Navbar from "../components/Navbar";
import FeaturedEvent from "../components/events/FeaturedEvent";
import EventTicket from "../components/events/EventTicket";
import TalkRequest from "../components/events/TalkRequest";
import EmptyAgenda from "../components/events/EmptyAgenda";
import { Sparkle } from "../components/Graphics";
import { EVENT_TYPES } from "../data/events";
import { getUpcomingEvents, getPastEvents, getFeaturedEvent } from "../lib/events";
import styles from "../components/events/Events.module.css";
import { useNow } from "../lib/useNow";
import page from "./eventos.module.css";

const FILTERS = ["Todos", ...EVENT_TYPES];
const PLURAL = { Charla: "Charlas", Taller: "Talleres", Webinar: "Webinars", Conferencia: "Conferencias" };
const plural = (type) => PLURAL[type] || `${type}s`;

export default function EventosPage() {
  const [filter, setFilter] = useState("Todos");
  const now = useNow();
  const upcoming = now ? getUpcomingEvents(now) : [];
  const past = now ? getPastEvents(now) : [];
  const featured = now && getFeaturedEvent(now);

  const matches = (e) => filter === "Todos" || e.type === filter;
  const list = upcoming.filter((e) => e.id !== featured?.id).filter(matches);
  const showFeatured = featured && matches(featured);

  return (
    <main className={page.main}>
      <Navbar />

      <header className={`container ${page.hero}`}>
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Agenda NutriNuelita
        </motion.span>
        <motion.h1
          className={page.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Eventos <span className="serif-accent">&</span> charlas
          <Sparkle size={30} delay={0.8} style={{ marginLeft: '0.2em', verticalAlign: 'top' }} />
        </motion.h1>
        <motion.p
          className="lead"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ maxWidth: 560 }}
        >
          Talleres vivenciales, conferencias y charlas en vivo para aprender a comer con ciencia,
          sin culpa y en comunidad.
        </motion.p>

        <motion.div
          className={page.stats}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          {upcoming.length > 0 ? (
            <span><strong>{upcoming.length}</strong> {upcoming.length === 1 ? 'próximo' : 'próximos'}</span>
          ) : (
            <span>Nuevas fechas muy pronto</span>
          )}
          <span className={page.statDot} />
          <span><strong>{now ? past.length : '–'}</strong> {past.length === 1 ? 'realizado' : 'realizados'}</span>
        </motion.div>
      </header>

      <div className="container">
        {/* Filter pills with a shared sliding highlight — only useful when there is something to filter */}
        {upcoming.length > 0 && (
        <LayoutGroup>
          <div className={page.filters} role="tablist" aria-label="Filtrar por tipo de evento">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`${page.filter} ${filter === f ? page.filterActive : ''}`}
              >
                {filter === f && (
                  <motion.span layoutId="filterPill" className={page.filterPill} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className={page.filterLabel}>{f === 'Todos' ? f : plural(f)}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        )}

        {!now && <div className={styles.placeholder} aria-hidden="true" />}
        {now && upcoming.length === 0 && <EmptyAgenda />}
        {showFeatured && <FeaturedEvent event={featured} priority />}

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {list.length > 0 ? (
              <>
                <div className={styles.subhead}>
                  <h3>Próximas fechas</h3>
                  <span className={styles.subheadLine} />
                </div>
                <div className={styles.ticketGrid}>
                  {list.map((event, i) => <EventTicket key={event.id} event={event} index={i} />)}
                </div>
              </>
            ) : now && upcoming.length > 0 && !showFeatured && (
              <div className={`${styles.empty} ${page.empty}`}>
                <p>Por ahora no hay {plural(filter).toLowerCase()} en agenda. ¡Síguenos en Instagram para enterarte primero! 🦦</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {past.length > 0 && (
          <section id="memorias" className={page.past}>
            <div className={styles.subhead}>
              <h3>Memorias</h3>
              <span className={styles.subheadLine} />
            </div>
            <div className={styles.ticketGrid}>
              {past.map((event, i) => <EventTicket key={event.id} event={event} index={i} past />)}
            </div>
          </section>
        )}

        <div className={page.talkWrap}>
          <TalkRequest />
        </div>
      </div>
    </main>
  );
}
