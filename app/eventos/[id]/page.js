'use client';

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarPlus, Clock, Share2, Check, CalendarDays, Ticket, Users } from "lucide-react";
import Navbar from "../../components/Navbar";
import Countdown from "../../components/events/Countdown";
import EventTicket, { ModalityIcon, SpotsBar } from "../../components/events/EventTicket";
import {
  getEventById, getUpcomingEvents, dateParts, timeRange, toneOf, registrationHref, googleCalendarHref,
} from "../../lib/events";
import styles from "../../components/events/Events.module.css";
import { useNow } from "../../lib/useNow";
import d from "./detail.module.css";

const EASE = [0.22, 1, 0.36, 1];

function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Share sheet dismissed — nothing to do
    }
  };

  return (
    <button onClick={share} className={d.shareBtn}>
      {copied ? <><Check size={16} /> ¡Link copiado!</> : <><Share2 size={16} /> Compartir</>}
    </button>
  );
}

export default function EventDetail() {
  const { id } = useParams();
  const now = useNow();
  const event = getEventById(id);

  if (!event) {
    return (
      <main className={d.notFound}>
        <Navbar />
        <h1>Evento no encontrado 🦦</h1>
        <Link href="/eventos" className="btn btn-dark">Ver la agenda</Link>
      </main>
    );
  }

  const tone = toneOf(event);
  const date = dateParts(event.start);
  // This route renders per request, so the server clock is a safe fallback before mount
  const isPast = new Date(event.end || event.start) < (now || new Date());
  const external = registrationHref(event).startsWith("http");
  const more = now ? getUpcomingEvents(now).filter((e) => e.id !== event.id).slice(0, 3) : [];

  return (
    <main
      className={d.main}
      style={{ '--tone-bg': tone.bg, '--tone-solid': tone.solid, '--tone-ink': tone.ink }}
    >
      <Navbar />

      <div className={`container ${d.wrap}`}>
        <Link href="/eventos" className={d.back}>
          <ArrowLeft size={18} /> Volver a la agenda
        </Link>

        <div className={d.layout}>
          {/* ───── Main column ───── */}
          <div className={d.content}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className={styles.chips}>
                <span className={styles.chipSolid}>{event.type}</span>
                <span className={styles.chip}><ModalityIcon modality={event.modality} /> {event.modality}</span>
                {isPast && <span className={styles.chip}>Realizado</span>}
              </div>
            </motion.div>

            <motion.h1
              className={d.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              {event.title}
            </motion.h1>

            <motion.p
              className={d.summary}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {event.summary}
            </motion.p>

            {event.image && (
              <motion.div
                className={d.cover}
                initial={{ clipPath: 'inset(0 0 100% 0 round 28px)' }}
                animate={{ clipPath: 'inset(0 0 0% 0 round 28px)' }}
                transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
              >
                <Image src={event.image} alt={event.title} fill priority sizes="(max-width: 960px) 100vw, 720px" style={{ objectFit: 'cover', objectPosition: '50% 25%' }} />
              </motion.div>
            )}

            {(event.description || event.recap) && (
              <section className={d.block}>
                <h2 className={d.blockTitle}>{isPast ? 'Así lo vivimos' : 'Sobre el evento'}</h2>
                <p className={d.text}>{isPast && event.recap ? event.recap : event.description}</p>
                {event.audience && !isPast && (
                  <p className={d.audience}><Users size={18} /> <span><strong>¿Para quién?</strong> {event.audience}</span></p>
                )}
              </section>
            )}

            {event.agenda?.length > 0 && (
              <section className={d.block}>
                <h2 className={d.blockTitle}>{isPast ? 'Así fue la agenda' : 'Agenda'}</h2>
                <ol className={d.timeline}>
                  {event.agenda.map((item, i) => (
                    <motion.li
                      key={item.time + item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, ease: EASE, duration: 0.6 }}
                    >
                      <span className={d.timelineTime}>{item.time}</span>
                      <span className={d.timelineDot} />
                      <span className={d.timelineTitle}>{item.title}</span>
                    </motion.li>
                  ))}
                </ol>
              </section>
            )}

            {event.takeaways?.length > 0 && (
              <section className={d.block}>
                <h2 className={d.blockTitle}>{isPast ? 'Los asistentes se llevaron' : 'Te llevas'}</h2>
                <ul className={d.takeaways}>
                  {event.takeaways.map((t) => (
                    <li key={t}><span className={d.takeCheck}><Check size={14} strokeWidth={3} /></span>{t}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className={`${d.block} ${d.host}`}>
              <div className={d.hostPhoto}>
                <Image src="/images/about/main-bio.jpg" alt="Manuela Acevedo" fill sizes="88px" style={{ objectFit: 'cover', objectPosition: '50% 15%' }} />
              </div>
              <div>
                <span className={d.hostKicker}>{isPast ? 'Facilitó' : 'Facilita'}</span>
                <p className={d.hostName}>Manuela Acevedo</p>
                <p className={d.hostBio}>Nutricionista Dietista · Global Shaper (WEF) · Investigadora del grupo Exposomas, Imperial College – CES.</p>
              </div>
            </section>
          </div>

          {/* ───── Sticky ticket ───── */}
          <motion.aside
            className={d.aside}
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <div className={d.ticket}>
              <div className={d.ticketHead}>
                <span className={d.ticketDay}>{date.day}</span>
                <span>
                  <span className={d.ticketMonth}>{date.month} {date.year}</span>
                  <span className={d.ticketWeekday}>{date.weekday}</span>
                </span>
                <Ticket className={d.ticketIcon} size={26} />
              </div>

              <div className={styles.perforation} aria-hidden="true" />

              <div className={d.ticketBody}>
                <ul className={d.facts}>
                  <li><CalendarDays size={17} /> <span>{date.long}</span></li>
                  <li><Clock size={17} /> <span>{timeRange(event)}</span></li>
                  <li><ModalityIcon modality={event.modality} size={17} /> <span>{event.location}{event.city && event.city !== 'Online' ? `, ${event.city}` : ''}</span></li>
                </ul>

                {!isPast && event.price && (
                  <div className={d.priceRow}>
                    <span>Inversión</span>
                    <strong>{event.price}</strong>
                  </div>
                )}

                {now && !isPast && (
                  <>
                    <div className={d.cd}>
                      <span className={d.cdLabel}>Empieza en</span>
                      <Countdown to={event.start} />
                    </div>
                    <SpotsBar event={event} />
                    <a
                      href={registrationHref(event)}
                      className={`btn btn-primary ${d.reserve}`}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      Reservar mi cupo <span className="btn-arrow"><ArrowRight size={18} /></span>
                    </a>
                  </>
                )}
                {now && isPast && (
                  <Link href="/eventos" className={`btn btn-dark ${d.reserve}`}>
                    Ver la agenda <span className="btn-arrow"><ArrowRight size={18} /></span>
                  </Link>
                )}

                <div className={d.secondary}>
                  {!isPast && (
                    <a href={googleCalendarHref(event)} target="_blank" rel="noopener noreferrer" className={d.shareBtn}>
                      <CalendarPlus size={16} /> Calendario
                    </a>
                  )}
                  <ShareButton title={event.title} />
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        {now && !isPast && (
          <motion.div
            className={d.mobileBar}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 22 }}
          >
            <span className={d.mobileBarInfo}>
              <strong>{event.price}</strong>
              <span>{date.day} {date.month} · {timeRange(event)}</span>
            </span>
            <a
              href={registrationHref(event)}
              className="btn btn-primary"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              Reservar
            </a>
          </motion.div>
        )}

        {more.length > 0 && (
          <section className={d.more}>
            <div className={styles.subhead}>
              <h3>También te puede interesar</h3>
              <span className={styles.subheadLine} />
            </div>
            <div className={styles.ticketGrid}>
              {more.map((e, i) => <EventTicket key={e.id} event={e} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
