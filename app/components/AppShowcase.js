'use client';

import { motion } from "framer-motion";
import { Check, Bell, ArrowRight, Home, BookOpen, ShoppingBasket, User } from "lucide-react";
import styles from "./AppShowcase.module.css";

const WAITLIST_HREF = `mailto:nutrinuelita@gmail.com?subject=${encodeURIComponent('Lista de espera · App Nutrinuelita')}&body=${encodeURIComponent('¡Hola! Quiero enterarme cuando la app esté disponible 🦦')}`;

const MEALS = [
  { emoji: '🥣', name: 'Bowl de avena y berries', time: 'Desayuno', done: true, color: '#FDE4EA' },
  { emoji: '🥗', name: 'Ensalada mediterránea', time: 'Almuerzo', done: true, color: '#E7F2DA' },
  { emoji: '🍪', name: 'Galletas de avena', time: 'Snack', done: false, color: '#FFF1C9' },
];

const GROCERIES = ['Espinacas', 'Avena en hojuelas', 'Garbanzos', 'Aguacate', 'Fresas', 'Yogur griego'];

export default function AppShowcase() {
  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.leaf} aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.copy}
          >
            <span className={styles.soon}><Bell size={14} /> Próximamente</span>
            <h2 className={styles.title}>
              Tu nutricionista <br /> <em>en tu bolsillo</em>
            </h2>
            <p className={styles.text}>
              Accede a tus planes, recetas y lista de compras desde mi app exclusiva para pacientes.
              Monitorea tu progreso día a día.
            </p>

            <ul className={styles.features}>
              {['Plan de comidas', 'Chat directo', 'Lista de compras', 'Diario de hábitos'].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <span className={styles.check}><Check size={13} strokeWidth={3} /></span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <a href={WAITLIST_HREF} className={`btn ${styles.cta}`}>
              Quiero enterarme primero <span className="btn-arrow"><ArrowRight size={18} /></span>
            </a>
          </motion.div>

          {/* Phone Mockups */}
          <div className={styles.phones}>
            {/* Phone 2 - skewed behind */}
            <motion.div
              initial={{ y: 100, opacity: 0, rotate: 10 }}
              whileInView={{ y: 40, opacity: 1, rotate: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`${styles.phone} ${styles.phoneBack}`}
            >
              <div className={styles.screen}>
                <p className={styles.screenKicker}>Lista de compras</p>
                <p className={styles.screenTitle}>Semana 3 🛒</p>
                <ul className={styles.groceries}>
                  {GROCERIES.map((g, i) => (
                    <li key={g} className={i < 3 ? styles.groceryDone : ''}>
                      <span className={styles.box}>{i < 3 && <Check size={10} strokeWidth={3} />}</span>{g}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Phone 1 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${styles.phone} ${styles.phoneFront}`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className={styles.screen}
              >
                <div className={styles.notch} />
                <div className={styles.greeting}>
                  <div>
                    <p className={styles.screenKicker}>Martes · Día 12</p>
                    <p className={styles.screenTitle}>¡Hola, Ana! 👋</p>
                  </div>
                  <span className={styles.avatar}>🦦</span>
                </div>

                <div className={styles.progressCard}>
                  <svg viewBox="0 0 64 64" className={styles.ring} aria-hidden="true">
                    <circle cx="32" cy="32" r="26" className={styles.ringTrack} />
                    <motion.circle
                      cx="32" cy="32" r="26"
                      className={styles.ringFill}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 0.68 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                  <div>
                    <p className={styles.progressValue}>68%</p>
                    <p className={styles.progressLabel}>de tu plan de hoy</p>
                  </div>
                </div>

                <p className={styles.sectionLabel}>Comidas de hoy</p>
                <div className={styles.meals}>
                  {MEALS.map((m, i) => (
                    <motion.div
                      key={m.name}
                      className={styles.meal}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.12 }}
                    >
                      <span className={styles.mealIcon} style={{ background: m.color }}>{m.emoji}</span>
                      <span className={styles.mealText}>
                        <span className={styles.mealTime}>{m.time}</span>
                        <span className={styles.mealName}>{m.name}</span>
                      </span>
                      <span className={`${styles.mealCheck} ${m.done ? styles.mealDone : ''}`}>
                        {m.done && <Check size={11} strokeWidth={3} />}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className={styles.tabbar}>
                  <Home size={16} className={styles.tabActive} />
                  <BookOpen size={16} />
                  <ShoppingBasket size={16} />
                  <User size={16} />
                </div>
              </motion.div>
            </motion.div>

            {/* Floating notification */}
            <motion.div
              className={styles.toast}
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 14 }}
            >
              <span className={styles.toastIcon}>💧</span>
              <span>
                <strong>¡Hora de hidratarte!</strong>
                <small>Vas en 5 de 8 vasos</small>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
