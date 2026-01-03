'use client';

import { motion } from "framer-motion";
import { Ribbon, VeggieCircle } from "./Graphics";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="hero-content" style={{ maxWidth: '650px' }}>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
          >
             <span style={{ 
               fontFamily: 'var(--font-heading)', 
               color: 'var(--color-primary)', 
               fontSize: '1.5rem',
               marginBottom: '0.5rem',
               display: 'block'
             }}>
               #1 Nutrición Integral en Medellín
             </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            <span style={{ color: 'var(--color-primary)', fontSize: '1.2em', display: 'block', transform: 'rotate(-2deg)' }}>
              Nutrición
            </span>
            <span style={{ fontSize: '1.5em' }}>Con Amor</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-description"
          >
            Disfruta de una vida más saludable con planes ricos en nutrientes, educación real y sin restricciones absurdas.
          </motion.p>

          <motion.div
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a href="#services" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', boxShadow: '0 8px 0px #E0B030' }}>
              Empezar Ahora →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <Ribbon text="100% Personalizado" style={{ top: '20%', right: '25%', transform: 'rotate(15deg)' }} />
      <Ribbon text="Sin Dietas Locas" style={{ bottom: '20%', left: '10%', background: 'var(--color-primary-light)', color: 'white' }} />

      {/* CSS "Food" Shapes - Abstract representations */}
      <VeggieCircle color="#A5D6A7" size="400px" right="-5%" top="10%" delay={0.2} /> {/* Big Green Leaf */}
      <VeggieCircle color="#FFCCBC" size="150px" right="30%" top="5%" delay={0.4} />  {/* Peach */}
      <VeggieCircle color="#FFF59D" size="200px" right="10%" bottom="10%" delay={0.5} /> {/* Lemon */}

      {/* Image Placeholder if user wants real food images later */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="hero-image-container"
      />
    
      <style jsx>{`
        .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            padding-top: 80px;
        }
        .hero-title {
            color: #1A4D2E;
            text-shadow: 2px 2px 0px rgba(232, 245, 233, 1);
            margin-bottom: 1rem;
            line-height: 0.95;
        }
        .hero-description {
            font-size: 1.25rem;
            color: var(--color-text-muted);
            margin-bottom: 2.5rem;
            max-width: 500px;
        }
        .hero-image-container {
            position: absolute;
            right: 5%;
            bottom: -5%;
            width: 500px;
            height: 400px;
            background-image: url('/images/hero/bowl.png');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            z-index: 2;
        }

        @media (max-width: 900px) {
            .hero-section {
                flex-direction: column;
                justify-content: center;
                text-align: center;
                padding-top: 120px;
                padding-bottom: 4rem;
            }
            .hero-content {
                margin: 0 auto;
                z-index: 10;
            }
            .hero-title {
                font-size: 0.8rem; /* Scaled down via ems in children */
            }
            .hero-description {
                margin: 0 auto 2rem auto;
            }
            .hero-image-container {
                position: relative;
                width: 100%;
                max-width: 300px;
                height: 300px;
                right: auto;
                bottom: auto;
                margin: 2rem auto 0 auto;
            }
            /* Hide some decorative elements on mobile to reduce clutter */
            /* We can target them if we passed classNames, but for now they are absolute. 
               Let's rely on overflow hidden, but maybe scale them down? 
               Since they are components, we can't easily select them here without a wrapper.
               However, usually overflow:Hidden on section handles it.
            */
        }
      `}</style>
    </section>
  );
}
