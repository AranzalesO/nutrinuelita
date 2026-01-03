'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Globe, FlaskConical, Building2, Award } from 'lucide-react';
import { useRef } from 'react';

// Helper component for Floating Image Hover Effect
function CardWithHover({ children, imageSrc, className, style, delay = 0 }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ ...style, position: 'relative', overflow: 'visible' }} // Overflow visible for floating image
            className={className}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    height: '100%',
                    width: '100%'
                }}
            >
                {children}
            </motion.div>

            {/* Floating Hover Image */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '120px', height: '120px', // Mini card size
                    borderRadius: '15px',
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'white', // Fallback
                    pointerEvents: 'none',
                    zIndex: 10,
                    x: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]), // Move opposite to mouse or with mouse?
                    y: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]),
                    opacity: x.get() === 0 && y.get() === 0 ? 0 : 1, // Hide when not hovering (roughly)
                    scale: x.get() === 0 && y.get() === 0 ? 0.5 : 1,
                    shadow: '0 10px 30px rgba(0,0,0,0.2)',
                    border: '4px solid white'
                }}
                animate={{
                    opacity: x.get() === 0 && y.get() === 0 ? 0 : 1,
                    x: x.get() * 200, // Exaggerate movement to follow cursor relative to center? 
                    // Let's simplified: This specific logic is tricky without direct mouse coordinates.
                }}
                // We will use a simpler "Cursor Follower" approach in a v2 if strict following is needed.
                // For now, this tilt effect + conditional visibility is the "3D" base, 
                // but let's implement the specific "Follow Pointer" requested.
            />
            {/* 
               Better implementation for "Following Pointer": 
               The CustomCursor logic is better for global following. 
               Here we can use a simple absolute div that tracks mouse position within the card.
            */}
        </motion.div>
    );
}

// Improved version that tracks mouse precisely for the image
function FloatingImageCard({ children, imageSrc, className, style, delay = 0, isLight = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    opacity.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, position: 'relative', overflow: 'hidden' }} // Keep overflow hidden for the card content, but we need visible for the image? No, image is inside.
      className={className}
      data-cursor-light={isLight} // Cursor helper
    >
      {children}
      
      {/* The Floating Mini-Card */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0, // start at top-left
          x, y, // follow mouse
          translateX: '10px', // Offset
          translateY: '10px',
          width: '100px',
          height: '100px',
          borderRadius: '12px',
          backgroundColor: 'white',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          pointerEvents: 'none',
          zIndex: 20,
          opacity: opacity,
          scale: opacity
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      />
    </motion.div>
  );
}


export default function About() {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: '#FFFBF5', paddingBottom: '6rem' }}>
      <div className="container">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <span style={{ 
             fontFamily: 'var(--font-heading)', 
             color: 'var(--color-primary)', 
             fontSize: '1.2rem',
             marginBottom: '1rem', display: 'block'
          }}>
            Conoce a Manuela Acevedo
          </span>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Más que una Nutri 🦦</h2>
          <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>
            Soy una nutricionista con experiencia en nutrición integral. Mi objetivo es ayudarte a alcanzar tus metas de salud y bienestar.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(12, 1fr)', 
            gridAutoRows: 'minmax(250px, auto)', // Height increased slightly
            gap: '1.5rem'
        }}>
            
            {/* Main Bio Card - Large */}
            <FloatingImageCard 
                imageSrc="/images/about/main-bio.jpg"
                isLight={true}
                style={{ 
                    gridColumn: 'span 8',
                    gridRow: 'span 2',
                    backgroundColor: '#E86A92', 
                    borderRadius: '30px',
                    padding: '3rem',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
                className="bento-card-main"
            >
                 <div style={{
                     position: 'absolute', top: '-50px', right: '-50px',
                     width: '300px', height: '300px',
                     backgroundColor: 'rgba(255,255,255,0.1)',
                     borderRadius: '50%'
                 }} />

                 <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', zIndex: 1 }} className="bio-content">
                     {/* Photo Persistent */}
                     <div style={{ 
                         minWidth: '160px', height: '160px', 
                         borderRadius: '50%', backgroundColor: 'white',
                         border: '4px solid white', 
                         backgroundImage: 'url(/images/about/main-bio.jpg)',
                         backgroundSize: 'cover', backgroundPosition: 'center',
                         boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                     }} />
                     <div>
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                            Nutrición con Ciencia y Corazón
                        </h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', opacity: 0.95 }}>
                            Soy Nutricionista Dietista y creo firmemente que comer saludable debe ser un placer. 
                            Mi enfoque une la evidencia científica con el disfrute de la vida.
                        </p>
                     </div>
                 </div>
            </FloatingImageCard>

            {/* Global Shaper */}
            <FloatingImageCard 
                imageSrc="/images/about/global-shaper.jpg"
                delay={0.1}
                style={{ 
                    gridColumn: 'span 4',
                    backgroundColor: '#C5E1A5',
                    borderRadius: '30px',
                    padding: '2rem',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
                }}
            >
                <div style={{backgroundColor: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                    <Globe size={40} color="#33691E" />
                </div>
                <h4 style={{ fontSize: '1.5rem', margin: 0, color: '#33691E' }}>Global Shaper</h4>
                <p style={{ opacity: 0.8, marginTop: '0.5rem', color: '#33691E' }}>World Economic Forum</p>
            </FloatingImageCard>

            {/* CES Lab */}
            <FloatingImageCard 
                imageSrc="/images/about/ces-lab.jpg"
                delay={0.2}
                style={{ 
                    gridColumn: 'span 4',
                    backgroundColor: '#FFCCBC', 
                    borderRadius: '30px',
                    padding: '2rem',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center'
                }}
            >
                <FlaskConical size={32} color="#D84315" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.4rem', margin: 0, color: '#BF360C' }}>Fundadora Laboratorio Ideaslab</h4>
                <p style={{ opacity: 0.8, marginTop: '0.5rem', color: '#BF360C' }}>Innovación Alimentaria<br/>Universidad CES</p>
            </FloatingImageCard>

            {/* Mayor's Office */}
            <FloatingImageCard 
                imageSrc="/images/about/medellin.jpg"
                delay={0.3}
                style={{ 
                    gridColumn: 'span 4',
                    backgroundColor: '#CFD8DC', 
                    borderRadius: '30px',
                    padding: '2rem',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center'
                }}
            >
                <Building2 size={32} color="#455A64" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.4rem', margin: 0, color: '#37474F' }}>Impacto Público</h4>
                <p style={{ opacity: 0.8, marginTop: '0.5rem', color: '#37474F' }}>Alcaldía de Medellín<br/>Proyectos de Ciudad</p>
            </FloatingImageCard>

             {/* Liderazgo - Updated Colors */}
             <FloatingImageCard 
                 imageSrc="/images/about/liderazgo.jpg"
                 delay={0.4}
                 style={{ 
                     gridColumn: 'span 4',
                     backgroundColor: '#FFAB91', // Darker Peach/Orange for better contrast
                     borderRadius: '30px',
                     padding: '2rem',
                     display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
                 }}
             >
                 <Award size={32} color="#BF360C" style={{ marginBottom: '0.5rem' }} />
                 <h4 style={{ fontSize: '1.4rem', margin: 0, color: '#BF360C' }}>Liderazgo</h4>
                 <p style={{ opacity: 0.9, marginTop: '0.5rem', color: '#BF360C', fontWeight: '500' }}>Transformando la nutrición</p>
             </FloatingImageCard>

        </div>
      </div>
      
      <style jsx global>{`
        @media (max-width: 900px) {
            .bento-card-main {
                grid-column: span 12 !important;
            }
            div[style*="grid-column: span 4"] {
                grid-column: span 6 !important;
            }
        }
        @media (max-width: 600px) {
            div[style*="grid-column: span 4"], 
            div[style*="grid-column: span 6"] {
                grid-column: span 12 !important;
            }
            .bento-card-main .bio-content {
                flex-direction: column;
                text-align: center;
            }
        }
      `}</style>
    </section>
  );
}
