'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Globe, FlaskConical, Building2, Award, GraduationCap, Camera, Linkedin, ArrowUpRight } from 'lucide-react';
import { SOCIAL } from '../lib/site';
import styles from './About.module.css';

// Card that reveals a floating photo which follows the pointer
function FloatingImageCard({ children, imageSrc, className, delay = 0, isLight = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 28 });
  const springY = useSpring(y, { stiffness: 300, damping: 28 });
  const scale = useSpring(opacity, { stiffness: 260, damping: 20 });

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.4 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${styles.card} ${className || ''}`}
      data-cursor-light={isLight}
    >
      {children}

      <span className={styles.photoHint} aria-hidden="true"><Camera size={14} /></span>

      {/* The Floating Mini-Card */}
      <motion.div
        aria-hidden="true"
        className={styles.floatingPhoto}
        style={{
          x: springX,
          y: springY,
          opacity,
          scale,
          backgroundImage: `url(${imageSrc})`,
        }}
      />
    </motion.div>
  );
}

const INTERESTS = [
  "Educación Alimentaria y Nutricional",
  "Salud Pública",
  "Salud Global y Planetaria",
  "Política alimentaria",
  "Inocuidad de los alimentos",
  "Exposoma social",
  "Enfermedades cardiometabólicas",
  "Epidemiología y bioestadística",
  "Curso de vida",
  "Escritura académica",
];

const CARDS = [
  {
    tone: 'sage',
    image: '/images/about/global-shaper.jpg',
    icon: Globe,
    kicker: 'Comunidad global',
    title: 'Global Shaper',
    text: 'World Economic Forum · Hub Medellín',
    className: 'span5',
  },
  {
    tone: 'peach',
    image: '/images/about/ces-lab.jpg',
    icon: FlaskConical,
    kicker: 'Innovación',
    title: 'Co-fundadora de Ideaslab',
    text: 'Laboratorio de innovación en Educación Alimentaria y Nutricional · Universidad CES',
    className: 'span5',
  },
  {
    tone: 'butter',
    image: '/images/about/san-rafael.jpg',
    icon: Building2,
    kicker: 'Impacto público',
    title: 'Alcaldía de Medellín',
    text: 'Proyectos con la Alcaldía, y proyectos rurales con la Fundación Aurelio Llano Posada y la E.S.E Hospital San Rafael de Yolombó.',
    className: 'span4',
  },
  {
    tone: 'lilac',
    image: '/images/about/liderazgo.jpg',
    icon: Award,
    kicker: 'Liderazgo público',
    title: 'Referentes',
    text: 'Diplomado Referentes (Universidad EIA – Alcaldía de Medellín) y Diplomado en Salud Pública.',
    className: 'span4',
  },
  {
    tone: 'sky',
    image: '/images/about/medellin.jpg',
    icon: GraduationCap,
    kicker: 'Investigación',
    title: 'Investigadora',
    text: 'Cofundadora y miembro activo del grupo de investigación Exposomas del Imperial College – CES y universidades del exterior.',
    className: 'span4',
  },
];

export default function About() {
  return (
    <section id="about" className={`section-padding ${styles.section}`}>
      <div className="container">
        <div className={styles.head}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">Conoce a Manuela Acevedo Álvarez</span>
            <h2 className={styles.title}>
              Más que una <span style={{ whiteSpace: 'nowrap' }}><span className="serif-accent">nutri</span> 🦦</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="lead">
              Investigación social y clínica con un pie en la consulta y otro en la comunidad.
              Estos son los temas que me apasionan:
            </p>
            <motion.ul
              className={styles.interests}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }}
            >
              {INTERESTS.map((topic) => (
                <motion.li
                  key={topic}
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                  whileHover={{ y: -3, rotate: -2 }}
                >
                  {topic}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <div className={styles.bento}>
          {/* Main Bio Card - Large */}
          <FloatingImageCard
            imageSrc="/images/about/main-bio.jpg"
            isLight={true}
            className={styles.mainCard}
          >
            <div className={styles.mainGlow} aria-hidden="true" />
            <div className={styles.mainGlow2} aria-hidden="true" />

            <div className={styles.bioContent}>
              <div className={styles.portrait}>
                <Image
                  src="/images/about/main-bio.jpg"
                  alt="Retrato de Manuela Acevedo Álvarez, Nutricionista Dietista"
                  fill
                  sizes="170px"
                  style={{ objectFit: 'cover', objectPosition: '50% 15%' }}
                />
              </div>
              <div>
                <span className={styles.mainKicker}>Nutricionista Dietista</span>
                <h3 className={styles.mainTitle}>
                  Nutrición con <em>ciencia</em> y <em>corazón</em>
                </h3>
                <p className={styles.mainText}>
                  Creo firmemente que comer saludable debe ser un placer.
                  Mi enfoque une la evidencia científica con el disfrute de la vida.
                </p>
                <p className={styles.signature}>— Manuela Acevedo Álvarez</p>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer me" className={styles.linkedin}>
                  <Linkedin size={16} /> Ver perfil en LinkedIn <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </FloatingImageCard>

          {CARDS.map(({ tone, image, icon: Icon, kicker, title, text, className }, i) => (
            <FloatingImageCard
              key={title}
              imageSrc={image}
              delay={0.08 * (i + 1)}
              className={`${styles[tone]} ${styles[className]}`}
            >
              <div className={styles.cardTop}>
                <span className={styles.iconBubble}><Icon size={22} strokeWidth={2} /></span>
                <span className={styles.kicker}>{kicker}</span>
              </div>
              <h4 className={styles.cardTitle}>{title}</h4>
              <p className={styles.cardText}>{text}</p>
            </FloatingImageCard>
          ))}
        </div>
      </div>
    </section>
  );
}
