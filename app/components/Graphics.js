'use client';
import { motion } from "framer-motion";

export function Ribbon({ text, style }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: -5 }}
      transition={{ delay: 0.5, type: "spring" }}
      style={{
        position: 'absolute',
        background: 'var(--color-accent)',
        padding: '0.5rem 2rem',
        borderRadius: '4px',
        fontWeight: 'bold',
        color: 'var(--color-text-main)',
        fontSize: '1rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        zIndex: 10,
        ...style
      }}
    >
      {text}
      {/* CSS stitching effect */}
      <div style={{
        position: 'absolute', top: '4px', left: '4px', right: '4px', bottom: '4px',
        border: '1px dashed rgba(255,255,255,0.6)', borderRadius: '2px', pointerEvents: 'none'
      }} />
    </motion.div>
  );
}

export function VeggieCircle({ color, size, right, top, delay }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay, duration: 0.8, type: "spring" }}
      style={{
        position: 'absolute',
        right: right,
        top: top,
        width: size,
        height: size,
        backgroundColor: color || '#E8F5E9',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', // Organic shape
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
        {/* Inner detail to look like food/plate */}
        <div style={{
            width: '80%', height: '80%', 
            borderRadius: 'inherit',
            background: 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(5px)'
        }} />
    </motion.div>
  );
}
