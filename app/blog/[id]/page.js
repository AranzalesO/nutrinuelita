'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { posts } from '../../data/posts';

export default function BlogPost() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>Artículo no encontrado 🗞️</h2>
        <Link href="/blog" style={{ marginTop: '1rem', color: 'var(--color-primary)' }}>Volver al Blog</Link>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '150px', maxWidth: '800px' }}>
         <Link href="/blog" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
            marginBottom: '2rem', color: 'var(--color-text-main)', opacity: 0.7 
          }}>
            <ArrowLeft size={20} /> Volver
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span style={{ 
              backgroundColor: post.imageColor, padding: '0.3rem 0.8rem', 
              borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold',
              marginBottom: '1rem', display: 'inline-block'
            }}>
              {post.category}
            </span>
            
            <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
              {post.title}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.6, marginBottom: '3rem' }}>
              <Calendar size={18} /> {post.date}
            </div>
            
            <div style={{ 
              height: '400px', backgroundColor: post.imageColor, borderRadius: '30px', marginBottom: '3rem',
              position: 'relative', overflow: 'hidden'
            }}>
               {/* Decorative Circle or Image */ }
               {post.imageUrl ? (
                 <img 
                   src={post.imageUrl} 
                   alt={post.title}
                   style={{
                     width: '100%',
                     height: '100%',
                     objectFit: 'cover'
                   }}
                 />
               ) : (
                 <div style={{
                    position: 'absolute', bottom: '-50px', right: '-50px',
                    width: '200px', height: '200px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%'
                 }} />
               )}
            </div>
            
            <div className="blog-content" style={{ fontSize: '1.2rem', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.div>
      </div>
    </main>
  );
}
