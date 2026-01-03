'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ChefHat, Tag } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { recipes } from '../../data/recipes';

export default function RecipePost() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>Receta no encontrada 🥑</h2>
        <Link href="/recipes" style={{ marginTop: '1rem', color: 'var(--color-primary)' }}>Volver al Recetario</Link>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />
      
      {/* Hero Header with color */}
      <div style={{ 
        backgroundColor: recipe.color, 
        padding: '150px 0 4rem',
        borderBottomLeftRadius: '60px',
        borderBottomRightRadius: '60px',
        marginBottom: '4rem'
      }}>
        <div className="container">
          <Link href="/recipes" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
            marginBottom: '2rem', color: 'var(--color-text-main)', opacity: 0.7 
          }}>
            <ArrowLeft size={20} /> Volver
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--color-text-main)' }}
          >
            {recipe.title}
          </motion.h1>
          
          <div style={{ display: 'flex', gap: '2rem', opacity: 0.8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Tag size={18} /> {recipe.category}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} /> {recipe.duration}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ChefHat size={18} /> {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '900px' }}>
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           style={{ marginBottom: '4rem' }}
        >
          <p style={{ fontSize: '1.5rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            {recipe.description}
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem' }}>
          {/* Ingredients */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ 
              backgroundColor: 'white', 
              padding: '2rem', 
              borderRadius: '20px',
              height: 'fit-content'
            }}
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--color-primary-dark)' }}>
              Ingredientes
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recipe.ingredients.map((ing, i) => (
                <li key={i} style={{ 
                  marginBottom: '1rem', 
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: 'var(--color-primary)' }}>•</span> {ing}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Instructions */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
             <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--color-primary-dark)' }}>
              Preparación
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {recipe.instructions.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{
                    minWidth: '40px', height: '40px',
                    backgroundColor: recipe.color,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 'bold',
                    color: 'var(--color-text-main)'
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ flex: 1, paddingTop: '0.5rem', lineHeight: '1.6' }}>{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
