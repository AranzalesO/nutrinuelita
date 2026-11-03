'use client';

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarHeart, Globe, GraduationCap, Award } from "lucide-react";
import { Ribbon, VeggieCircle, Scribble, Sparkle } from "./Graphics";
import { BOOKING_URL } from "./Navbar";
import { getFeaturedEvent, dateParts } from "../lib/events";
import { useNow } from "../lib/useNow";
import styles from "./Hero.module.css";

const EASE = [0.22, 1, 0.36, 1];

// Each line rises out of an invisible mask — the classic editorial reveal
function RevealLine({ children, delay, className }) {
  return (
    <span className={styles.lineMask}>
      <motion.span
        className={`${styles.line} ${className || ''}`}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const CREDENTIALS = [
  { icon: Globe, label: "Global Shaper · WEF" },
  { icon: Award, label: "Referentes · Alcaldía de Medellín" },
  { icon: GraduationCap, label: "Exposomas · Imperial College" },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const now = useNow();
  const nextEvent = now && getFeaturedEvent(now);

  return (
    <section ref={ref} className={styles.hero}>
      {/* Soft background wash */}
      <div className={styles.wash} aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        {/* ───── Copy ───── */}
        <div className={styles.copy}>
          <motion.span
            className={styles.pill}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.pillDot} />
            Nutricionista Dietista · Medellín
          </motion.span>

          <h1 className={styles.title}>
            <RevealLine delay={0.15}>Nutrición</RevealLine>
            <RevealLine delay={0.3} className={styles.titleAccent}>
              con{' '}
              <span className={styles.scribbleWrap}>
                amor
                <Scribble delay={1.1} />
              </span>
              <Sparkle size={28} delay={1.4} style={{ marginLeft: '0.15em', verticalAlign: 'top' }} />
            </RevealLine>
          </h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Disfruta de una vida más saludable con planes ricos en nutrientes, educación real
            y sin restricciones absurdas. Ciencia que se siente bien en el plato.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${styles.mainCta}`}>
              Agenda tu consulta <span className="btn-arrow"><ArrowRight size={18} /></span>
            </a>
            <a href="#services" className={styles.textLink}>
              Ver servicios
              <span className={styles.textLinkLine} />
            </a>
          </motion.div>

          <motion.ul
            className={styles.credentials}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } } }}
          >
            {CREDENTIALS.map(({ icon: Icon, label }) => (
              <motion.li
                key={label}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              >
                <Icon size={15} strokeWidth={2.2} /> {label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ───── Visual ───── */}
        <div className={styles.visual}>
          <motion.div style={{ y: blobY }} className={styles.blobs}>
            <VeggieCircle color="#A5D6A7" size="78%" right="-14%" top="-4%" delay={0.2} />
            <VeggieCircle color="#FFCCBC" size="30%" left="-10%" top="6%" delay={0.4} />
            <VeggieCircle color="#FFF59D" size="38%" right="-8%" bottom="-6%" delay={0.5} />
          </motion.div>

          <motion.div
            className={styles.arch}
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 999px 999px 32px 32px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 999px 999px 32px 32px)' }}
            transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
          >
            <motion.div style={{ y: photoY }} className={styles.archInner}>
              <Image
                src="/images/about/main-bio.jpg"
                alt="Manuela Acevedo, nutricionista de NutriNuelita"
                fill
                priority
                sizes="(max-width: 900px) 80vw, 440px"
                style={{ objectFit: 'cover', objectPosition: '50% 18%' }}
              />
            </motion.div>
          </motion.div>

          {/* Rotating stamp with the illustrated bowl */}
          <motion.div
            className={styles.stamp}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
          >
            <motion.svg viewBox="0 0 200 200" className={styles.stampText} style={{ rotate: badgeRotate }} aria-hidden="true">
              <defs>
                <path id="stampCircle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                style={{ originX: '100px', originY: '100px' }}
              >
                <text>
                  {/* textLength makes the phrase wrap the circle exactly once */}
                  <textPath href="#stampCircle" startOffset="0" textLength="486" lengthAdjust="spacing">
                    NUTRICIÓN CON CIENCIA ✦ Y CORAZÓN ✦
                  </textPath>
                </text>
              </motion.g>
            </motion.svg>
            <motion.div
              className={styles.stampBowl}
              animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image src="/images/hero/bowl.png" alt="" fill sizes="120px" style={{ objectFit: 'contain' }} />
            </motion.div>
          </motion.div>

          {/* Decorative ribbons */}
          <Ribbon text="100% Personalizado" rotate={8} delay={1.1} className={styles.ribbonTop} />
          <Ribbon
            text="Sin Dietas Locas"
            rotate={-6}
            delay={1.3}
            className={styles.ribbonBottom}
            style={{ background: 'var(--color-primary)', color: 'white' }}
          />

          {/* Next event teaser — links the hero to the new agenda */}
          {nextEvent && (
            <motion.div
              className={styles.eventChip}
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.5, ease: EASE }}
            >
              <Link href={`/eventos/${nextEvent.id}`} className={styles.eventChipLink}>
                <span className={styles.eventChipIcon}><CalendarHeart size={18} /></span>
                <span>
                  <span className={styles.eventChipKicker}>Próximo {nextEvent.type.toLowerCase()} · {dateParts(nextEvent.start).day} {dateParts(nextEvent.start).month}</span>
                  <span className={styles.eventChipTitle}>{nextEvent.title}</span>
                </span>
                <ArrowRight size={16} className={styles.eventChipArrow} />
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <motion.a
        href="#about"
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-label="Bajar a la siguiente sección"
      >
        <span className={styles.scrollMouse}>
          <motion.span
            className={styles.scrollWheel}
            animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  );
}
