'use client';

import { motion } from "framer-motion";
import { servicesData } from "../data/services";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="section-padding" style={{ backgroundColor: '#2C1A1D', color: '#FFFBF5' }}> 
      {/* Dark background for contrast, similar to the reference dark green but in dark coffee/rose tone */}
      
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '4rem', color: '#E86A92', lineHeight: 1 }}
          >
            Lo que <br/><span style={{ color: '#FFFBF5' }}>Hacemos</span>
          </motion.h2>
          
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             style={{ display: 'flex', alignItems: 'end', paddingBottom: '1rem' }}
          >
             <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '400px' }}>
               Un enfoque integral que va más allá del plato. Educación, ciencia y amor por lo que hacemos.
             </p>
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {servicesData.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{
                display: 'grid',
                gridTemplateColumns: '0.5fr 1.5fr 2fr 1fr',
                alignItems: 'center',
                padding: '3rem 0',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              className="service-row"
            >
              <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                0{index + 1}
              </span>
              
              <h3 style={{ fontSize: '2rem', margin: 0, color: '#FFFBF5' }}>{service.title}</h3>
              
              <p style={{ margin: 0, opacity: 0.7 }}>{service.description}</p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ 
                  width: '50px', height: '50px', 
                  borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                   <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
