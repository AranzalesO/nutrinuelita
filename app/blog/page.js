'use client';

import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { posts } from "../data/posts";

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
            marginBottom: '1rem', display: 'block'
          }}>
            Blog & Artículos
          </span>
          <h1 style={{ fontSize: '3.5rem' }}>Bienestar al Día</h1>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {posts.map((post, i) => (
            <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                style={{ cursor: 'pointer' }}
              >
                <div style={{
                  height: '250px',
                  backgroundColor: post.imageColor,
                  borderRadius: '20px',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {post.imageUrl ? (
                    <Image 
                      src={post.imageUrl} 
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      position: 'absolute', bottom: '-20px', right: '-20px',
                      width: '100px', height: '100px',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '50%'
                    }} />
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.6 }}>
                   <span>{post.category}</span>
                   <span>•</span>
                   <span>{post.date}</span>
                </div>
                
                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                  {post.title}
                </h2>
                
                <p style={{ opacity: 0.8, lineHeight: '1.6', color: 'var(--color-text-main)' }}>
                  {post.excerpt}
                </p>
                
                <span style={{ 
                  display: 'inline-block', marginTop: '1rem', 
                  color: 'var(--color-primary)', fontWeight: 'bold' 
                }}>
                  Leer más →
                </span>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
