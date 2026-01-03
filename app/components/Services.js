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
        <div className="services-header">
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
        <div className="services-layout">
          
          <div className="services-list" style={{ display: 'flex', flexDirection: 'column' }}>
            {servicesData.map((service, index) => (
              <a 
                key={service.id}
                href="https://calendar.app.google/bCFxLUv3dstFdmkT6" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredService(service)}
                onMouseLeave={() => setHoveredService(null)}
                className="service-item-link"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
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
          <div className="services-details">
            <AnimatePresence mode="wait">
              {hoveredService && (
                <motion.div
                  key={hoveredService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: '#E86A92',
                    padding: '3rem',
                    borderRadius: '30px',
                    color: 'white',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}
                  className="sticky-card"
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
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Default State / Placeholder when not hovering */}
            {!hoveredService && (
               <div className="details-placeholder" style={{ 
                 display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',
                 opacity: 0.1, color: '#E86A92'
               }}>
                  <div style={{ fontSize: '10rem', fontWeight: 'bold' }}>INFO</div>
               </div>
            )}
          </div>

        </div>
      </div>

      <style jsx>{`
        .services-header {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            margin-bottom: 4rem;
        }
        .services-layout {
            position: relative;
            min-height: 600px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
        }
        .service-row {
            display: grid;
            grid-template-columns: 0.5fr 3fr 1fr;
            align-items: center;
            padding: 3rem 0;
            border-top: 1px solid rgba(255,255,255,0.1);
            cursor: pointer;
            color: #FFFBF5;
            transition: color 0.3s;
        }
        .sticky-card {
            position: sticky;
            top: 2rem;
        }
        .details-placeholder {
            position: sticky;
            top: 2rem;
        }

        @media (max-width: 900px) {
            .services-header {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }
            .services-layout {
                grid-template-columns: 1fr;
                display: flex;
                flex-direction: column-reverse; /* Details on top/bottom? Or just stack normal. Let's stack details below list or create a modal. Actually, on mobile, hover doesn't exist. We should probably force the "Details" to show when clicking or just make them static. 
                For now, let's just stack them. But "Hover" won't trigger. 
                We need a "Click" fallback or just always show details. 
                Ideally, mobile users should just click to go to the link? 
                The current implementation links to Google Calendar directly. 
                So the hover is just extra info. 
                Let's hide the details column on mobile for V1 if it's just extra info, 
                OR we show the details inline (accordion style) which requires code change.
                
                For this quick optimization: Let's keep the column layout but stacked. 
                Users can tap roughly. 
                */
                display: block; 
            }
            .services-details {
                display: none; /* Hiding details on mobile for now as interaction is hover-based and link is primary action */
            }
            .service-row {
                grid-template-columns: 0.5fr 4fr 1fr;
                padding: 2rem 0;
            }
        }
      `}</style>
    </section>
  );
}
