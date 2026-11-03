'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLight, setIsLight] = useState(false);

  // Use MotionValues for performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Only take over the cursor on devices with a real mouse
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => {
      setEnabled(query.matches);
      document.documentElement.classList.toggle('has-custom-cursor', query.matches);
    };
    update();
    query.addEventListener('change', update);
    return () => {
      query.removeEventListener('change', update);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e) => {
      mouseX.set(e.clientX - 12); // Center the heart (24px width / 2)
      mouseY.set(e.clientY - 12);
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      setIsHovering(Boolean(target.closest('a, button, [role="button"], input, select, textarea, label')));
      setIsLight(Boolean(target.closest('[data-cursor-light="true"]')));
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const color = isLight && !isHovering ? '#FFFFFF' : '#E86A92';

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        opacity: isVisible ? 1 : 0,
        filter: 'drop-shadow(0 2px 6px rgba(42, 26, 31, 0.18))'
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 150 : -10 // Slight wiggle on hover
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Heart size={24} fill={color} color={color} strokeWidth={1} />
    </motion.div>
  );
}
