'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Fix hydration mismatch
  
  // Use MotionValues for performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 12); // Center the heart (24px width / 2)
      mouseY.set(e.clientY - 12);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
        setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on touch devices or server-side
  if (!isMounted) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        pointerEvents: 'none',
        zIndex: 9999,
        display: isVisible ? 'flex' : 'none',
        mixBlendMode: 'difference' // Cool effect over different backgrounds
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? 150 : -10 // Slight wiggle on hover
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Heart 
        size={24} 
        fill={isHovering ? "#E86A92" : "white"} 
        color={isHovering ? "#E86A92" : "white"}
        strokeWidth={1}
      />
    </motion.div>
  );
}
