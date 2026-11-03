'use client';
import { motion } from "framer-motion";

export function Ribbon({ text, style, className, delay = 0.5, rotate = -5 }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: rotate - 10 }}
      animate={{ scale: 1, rotate }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.08, rotate: rotate + 4 }}
      className={className}
      style={{
        position: 'absolute',
        background: 'var(--color-accent)',
        padding: '0.55rem 1.4rem',
        borderRadius: '6px',
        fontFamily: 'var(--font-brand)',
        fontWeight: 600,
        color: 'var(--color-text-main)',
        fontSize: '1rem',
        whiteSpace: 'nowrap',
        boxShadow: '0 10px 24px -8px rgba(42, 26, 31, 0.3)',
        zIndex: 10,
        ...style
      }}
    >
      {text}
      {/* CSS stitching effect */}
      <div style={{
        position: 'absolute', top: '4px', left: '4px', right: '4px', bottom: '4px',
        border: '1px dashed rgba(255,255,255,0.7)', borderRadius: '3px', pointerEvents: 'none'
      }} />
    </motion.div>
  );
}

export function VeggieCircle({ color, size, right, left, top, bottom, delay = 0, float = true, className }) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      style={{
        position: 'absolute',
        right, left, top, bottom,
        width: size,
        height: size,
        zIndex: 0,
      }}
    >
      {/* Slow organic "breathing" so the blobs feel alive */}
      <motion.div
        animate={float ? {
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          rotate: [0, 8, 0],
        } : undefined}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: color || '#E8F5E9',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', // Organic shape
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Inner detail to look like food/plate */}
        <div style={{
          width: '80%', height: '80%',
          borderRadius: 'inherit',
          background: 'rgba(255,255,255,0.35)',
        }} />
      </motion.div>
    </motion.div>
  );
}

// Hand-drawn underline that "writes itself" under a word
export function Scribble({ color = 'var(--color-accent)', delay = 0.9, style }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      style={{ position: 'absolute', left: '-2%', bottom: '-0.12em', width: '104%', height: '0.32em', overflow: 'visible', ...style }}
    >
      <motion.path
        d="M3 15 C 60 4, 120 4, 170 11 S 260 20, 297 7"
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

// Four-point sparkle used as a decorative glyph
export function Sparkle({ size = 22, color = 'var(--color-primary)', style, delay = 0 }) {
  return (
    <motion.svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: [0, 1.2, 1], rotate: 0 }}
      transition={{ delay, duration: 0.7 }}
    >
      <motion.path
        d="M12 0 C 13 8, 16 11, 24 12 C 16 13, 13 16, 12 24 C 11 16, 8 13, 0 12 C 8 11, 11 8, 12 0 Z"
        fill={color}
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.7 }}
        style={{ originX: '50%', originY: '50%' }}
      />
    </motion.svg>
  );
}
