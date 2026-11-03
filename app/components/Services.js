'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "../data/services";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "./Navbar";
import styles from "./Services.module.css";

export default function Services() {
  // The panel always shows a service: the first one until the visitor hovers another
  const [activeService, setActiveService] = useState(servicesData[0]);
  const ActiveIcon = activeService.icon;

  return (
    <section id="services" className={`section-padding ${styles.section}`}>
      <div className={styles.glow} aria-hidden="true" />

      <div className="container">
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={`eyebrow ${styles.eyebrow}`}>Servicios</span>
            <h2 className={styles.title}>
              Lo que <br /><span className={styles.titleAccent}>hacemos</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.intro}
          >
            Un enfoque integral que va más allá del plato. Educación, ciencia y amor por lo que hacemos,
            para personas, familias, empresas y comunidades.
          </motion.p>
        </div>

        <div className={styles.layout}>
          <div className={styles.list}>
            {servicesData.map((service, index) => {
              const isActive = activeService.id === service.id;
              return (
                <a
                  key={service.id}
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveService(service)}
                  onFocus={() => setActiveService(service)}
                  className={`${styles.itemLink} ${isActive ? styles.active : ''}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={styles.row}
                  >
                    <span className={styles.index}>0{index + 1}</span>

                    <div className={styles.rowBody}>
                      <h3 className={styles.rowTitle}>{service.title}</h3>
                      <p className={styles.rowDesc}>{service.description}</p>
                      {/* Touch devices have no hover: show the details inline */}
                      <ul className={styles.inlineItems}>
                        {service.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>

                    <div className={styles.arrowCell}>
                      <motion.div
                        animate={{
                          rotate: isActive ? 45 : 0,
                          scale: isActive ? 1.15 : 1,
                          backgroundColor: isActive ? '#E86A92' : 'rgba(232, 106, 146, 0)',
                          borderColor: isActive ? '#E86A92' : 'rgba(255, 255, 255, 0.2)'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={styles.arrow}
                      >
                        <ArrowUpRight size={20} />
                      </motion.div>
                    </div>
                  </motion.div>
                </a>
              );
            })}
          </div>

          {/* Dynamic Details Box */}
          <div className={styles.details}>
            <div className={styles.sticky}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, x: 20, rotate: 1.5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: -20, rotate: -1.5 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={styles.card}
                  data-cursor-light="true"
                >
                  <div className={styles.cardDecor} aria-hidden="true" />
                  <div className={styles.cardIcon}><ActiveIcon size={26} /></div>
                  <h3 className={styles.cardTitle}>{activeService.title}</h3>
                  <p className={styles.cardDesc}>{activeService.description}</p>
                  <ul className={styles.cardList}>
                    {activeService.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.07 }}
                      >
                        <span className={styles.check}><Check size={13} strokeWidth={3} /></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={`btn ${styles.cardCta}`}>
                    Agendar esta asesoría <span className="btn-arrow"><ArrowRight size={16} /></span>
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
