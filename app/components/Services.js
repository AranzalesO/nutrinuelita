'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "../data/services";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  const [hoveredService, setHoveredService] = useState(null);
  
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

        {/* Info Box that follows/appears */}
        <div style={{ position: 'relative', minHeight: '600px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {servicesData.map((service, index) => (
              <a 
                key={service.id}
                href="https://calendar.google.com/calendar/u/0/r" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredService(service)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '0.5fr 3fr 1fr',
                    alignItems: 'center',
                    padding: '3rem 0',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    color: hoveredService?.id === service.id ? '#E86A92' : '#FFFBF5',
                    transition: 'color 0.3s'
                  }}
                  className="service-row"
                >
                  <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                    0{index + 1}
                  </span>
                  
                  <div>
                     <h3 style={{ fontSize: '2rem', margin: 0, color: '#FFB6C1' }}>{service.title}</h3>
                     <p style={{ margin: 0, opacity: 0.7, fontSize: '1rem', color: '#FFFBF5' }}>{service.description}</p>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <motion.div 
                      animate={{ 
                        rotate: hoveredService?.id === service.id ? 45 : 0, 
                        scale: hoveredService?.id === service.id ? 1.2 : 1,
                        backgroundColor: hoveredService?.id === service.id ? '#E86A92' : 'transparent',
                        borderColor: hoveredService?.id === service.id ? '#E86A92' : 'rgba(255,255,255,0.2)'
                      }}
                      style={{ 
                        width: '50px', height: '50px', 
                        borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: hoveredService?.id === service.id ? 'white' : 'white'
                      }}>
                       <ArrowUpRight size={20} />
                    </motion.div>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>

          {/* Dynamic Details Box */}
          <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              {hoveredService && (
                <motion.div
                  key={hoveredService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'sticky',
                    top: '2rem',
                    backgroundColor: '#E86A92',
                    padding: '3rem',
                    borderRadius: '30px',
                    color: 'white',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}
                >
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#FFFBF5' }}>
                    {hoveredService.title}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {hoveredService.items.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ 
                          marginBottom: '1rem', 
                          fontSize: '1.2rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem' 
                        }}
                      >
                         <span style={{ fontSize: '1.5rem' }}>•</span> {item}
                      </motion.li>
                    ))}
                  </ul>
                  {/* <div style={{ marginTop: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowUpRight size={24} />
                    Clic para agendar
                  </div> */}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Default State / Placeholder when not hovering */}
            {!hoveredService && (
               <div style={{ 
                 position: 'sticky', top: '2rem', 
                 display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
                 opacity: 0.1, color: '#E86A92'
               }}>
                  <div style={{ fontSize: '10rem', fontWeight: 'bold' }}>INFO</div>
               </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
