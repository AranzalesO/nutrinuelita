'use client';

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function AppShowcase() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FFFBF5' }}>
      <div className="container">
        <div style={{ 
          backgroundColor: '#C5E1A5', /* Light Green from reference */
          borderRadius: '40px',
          padding: '4rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             style={{ zIndex: 2 }}
          >
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#33691E' }}>
              Tu Nutricionista <br/> en tu Bolsillo
            </h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', opacity: 0.9, color: '#33691E' }}>
              Accede a tus planes, recetas y lista de compras desde mi app exclusiva para pacientes.
              Monitorea tu progreso día a día.
            </p>
            
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
              {['Plan de Comidas', 'Chat Directo', 'Lista de Compras', 'Diario de Hábitos'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1B5E20' }}>
                   <div style={{ background: 'white', borderRadius: '50%', padding: '2px' }}><Check size={14} /></div>
                   {item}
                </li>
              ))}
            </ul>

            <button className="btn" style={{ backgroundColor: '#33691E', color: 'white', padding: '1rem 2rem' }}>
              Conocer la App (Próximamente) →
            </button>
          </motion.div>
          
          {/* Abstract Phone Mockups using CSS */}
          <div style={{ position: 'relative', height: '400px' }}>
            {/* Phone 1 */}
            <motion.div
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               style={{ 
                 position: 'absolute', top: '0', left: '10%',
                 width: '240px', height: '480px',
                 backgroundColor: 'white',
                 borderRadius: '30px',
                 border: '8px solid white',
                 boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                 overflow: 'hidden',
                 zIndex: 2
               }}
            >
               {/* Screen Content */}
               <div style={{ background: '#E8F5E9', height: '100%', padding: '1.5rem' }}>
                  <div style={{ width: '60px', height: '60px', background: '#A5D6A7', borderRadius: '50%', marginBottom: '1rem' }} />
                  <div style={{ height: '20px', width: '80%', background: '#C8E6C9', borderRadius: '10px', marginBottom: '0.5rem' }} />
                  <div style={{ height: '20px', width: '60%', background: '#C8E6C9', borderRadius: '10px', marginBottom: '2rem' }} />
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ height: '80px', background: 'white', borderRadius: '15px' }} />
                      <div style={{ height: '80px', background: 'white', borderRadius: '15px' }} />
                      <div style={{ height: '80px', background: 'white', borderRadius: '15px' }} />
                      <div style={{ height: '80px', background: 'white', borderRadius: '15px' }} />
                  </div>
               </div>
            </motion.div>

             {/* Phone 2 - skewed behind */}
             <motion.div
               initial={{ y: 100, opacity: 0, rotate: 10 }}
               whileInView={{ y: 40, opacity: 1, rotate: 10 }}
               transition={{ duration: 0.8 }}
               style={{ 
                 position: 'absolute', top: '20px', right: '0%',
                 width: '240px', height: '480px',
                 backgroundColor: '#F1F8E9',
                 borderRadius: '30px',
                 boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
                 zIndex: 1
               }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
