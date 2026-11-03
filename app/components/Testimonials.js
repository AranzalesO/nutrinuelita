'use client';

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "Ana María G.",
    role: "Paciente de Nutrición Integral",
    text: "Mi relación con la comida cambió totalmente. No es solo una dieta, es entender qué necesita mi cuerpo. ¡Me siento con más energía que nunca!",
    rating: 5,
    tone: { bg: '#FDE4EA', ink: '#8E2C4B' }
  },
  {
    id: 2,
    name: "Carlos R.",
    role: "Líder de Bienestar Corporativo",
    text: "Las charlas en nuestra empresa fueron un éxito. El equipo aprendió tips prácticos para mejorar su productividad y salud. Muy recomendado.",
    rating: 5,
    tone: { bg: '#E7F2DA', ink: '#1F4D3A' }
  },
  {
    id: 3,
    name: "Valentina M.",
    role: "Participante de Taller",
    text: "Me encantó el taller de alimentación consciente. Aprendí a disfrutar cada bocado sin culpa. La energía de Nuelita es contagiosa.",
    rating: 5,
    tone: { bg: '#FFF1C9', ink: '#5C4300' }
  }
];

const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2);

export default function Testimonials() {
  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-head center"
        >
          <span className="eyebrow">Testimonios</span>
          <h2>
            Historias de <span className="serif-accent">transformación</span>
          </h2>
          <p className="lead">Lo que dicen quienes han confiado en este proceso.</p>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={styles.card}
              style={{ '--t-bg': t.tone.bg, '--t-ink': t.tone.ink }}
            >
              <span className={styles.quoteMark} aria-hidden="true">“</span>

              <div className={styles.stars} aria-label={`${t.rating} de 5 estrellas`}>
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={16} fill="#FFD166" color="#FFD166" />
                ))}
              </div>

              <blockquote className={styles.quote}>{t.text}</blockquote>

              <figcaption className={styles.person}>
                <span className={styles.avatar}>{initials(t.name)}</span>
                <span>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
