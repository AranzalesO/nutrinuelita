'use client';

import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const recipes = [
  { id: 1, title: "Smoothie Verde Detox", category: "Bebidas", color: "#A5D6A7" },
  { id: 2, title: "Bowl de Avena y Berries", category: "Desayuno", color: "#F48FB1" },
  { id: 3, title: "Ensalada Mediterránea", category: "Almuerzo", color: "#FFF59D" },
  { id: 4, title: "Galletas de Almendra", category: "Snack", color: "#FFCCBC" },
  { id: 5, title: "Tostadas de Aguacate", category: "Desayuno", color: "#C5E1A5" },
  { id: 6, title: "Cena Ligera de Pollo", category: "Cena", color: "#FFAB91" },
];

export default function Blog() {
  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '150px', paddingBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span style={{ 
            fontFamily: 'var(--font-heading)', 
            color: 'var(--color-primary)', 
            fontSize: '1.2rem',
            display: 'block', marginBottom: '1rem'
          }}>
            Cocina Saludable
          </span>
          <h1 style={{ marginBottom: '2rem', fontSize: '3.5rem' }}>Recetas & Tips</h1>
          
          {/* Search Bar */}
          <div style={{ 
            maxWidth: '500px', margin: '0 auto', 
            position: 'relative'
          }}>
            <input 
              type="text" 
              placeholder="Buscar recetas (ej. Desayuno, Vegano...)"
              style={{
                width: '100%', padding: '1rem 1.5rem', borderRadius: '50px',
                border: '2px solid rgba(0,0,0,0.1)', fontSize: '1rem',
                backgroundColor: 'white',
                outline: 'none'
              }}
            />
            <button style={{ 
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
              background: 'var(--color-primary)', border: 'none', borderRadius: '50%',
              width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', cursor: 'pointer'
            }}>
              <Search size={18} />
            </button>
          </div>
        </motion.div>

        {/* Categories Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {['Todas', 'Desayunos', 'Almuerzos', 'Cenas', 'Snacks', 'Bebidas'].map((cat, i) => (
             <button key={cat} style={{
               padding: '0.5rem 1.5rem',
               borderRadius: '30px',
               border: i === 0 ? 'none' : '1px solid #ddd',
               backgroundColor: i === 0 ? 'var(--color-text-main)' : 'transparent',
               color: i === 0 ? 'white' : 'var(--color-text-main)',
               cursor: 'pointer',
               fontFamily: 'var(--font-heading)'
             }}>
               {cat}
             </button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {recipes.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{ cursor: 'pointer' }}
              whileHover={{ y: -10 }}
            >
              <div style={{ 
                height: '350px', 
                backgroundColor: recipe.color, 
                borderRadius: '20px', 
                position: 'relative',
                marginBottom: '1rem',
                overflow: 'hidden'
              }}>
                {/* CSS composition representing food */}
                <div style={{
                  position: 'absolute', bottom: '-20px', right: '-20px',
                  width: '150px', height: '150px',
                  background: 'rgba(255,255,255,0.4)',
                  borderRadius: '50%'
                }} />
                
                <span style={{ 
                  position: 'absolute', top: '20px', left: '20px', 
                  background: 'white', padding: '0.3rem 0.8rem', 
                  borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold'
                }}>
                  {recipe.category}
                </span>
              </div>
              <h3 style={{ fontSize: '1.5rem' }}>{recipe.title}</h3>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                <span>15 min</span>
                <span>•</span>
                <span>Fácil</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
