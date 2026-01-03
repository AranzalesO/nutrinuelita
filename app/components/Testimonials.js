'use client';

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ana María G.",
    role: "Paciente de Nutrición Integral",
    text: "Mi relación con la comida cambió totalmente. No es solo una dieta, es entender qué necesita mi cuerpo. ¡Me siento con más energía que nunca!",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos R.",
    role: "Líder de Bienestar Corporativo",
    text: "Las charlas en nuestra empresa fueron un éxito. El equipo aprendió tips prácticos para mejorar su productividad y salud. Muy recomendado.",
    rating: 5
  },
  {
    id: 3,
    name: "Valentina M.",
    role: "Participante de Taller",
    text: "Me encantó el taller de alimentación consciente. Aprendí a disfrutar cada bocado sin culpa. La energía de Nuelita es contagiosa.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FFFBF5', overflow: 'hidden' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
            Historias de <span style={{ color: 'var(--color-primary)' }}>Transformación</span>
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
            Lo que dicen quienes han confiado en este proceso.
          </p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                position: 'relative'
              }}
            >
              <Quote 
                size={40} 
                style={{ 
                  position: 'absolute', 
                  top: '1.5rem', 
                  right: '1.5rem', 
                  opacity: 0.1, 
                  color: 'var(--color-primary)' 
                }} 
              />
              
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={16} fill="#FFD166" color="#FFD166" />
                ))}
              </div>

              <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                "{t.text}"
              </p>

              <div>
                <h4 style={{ margin: 0, color: 'var(--color-text-main)' }}>{t.name}</h4>
                <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
