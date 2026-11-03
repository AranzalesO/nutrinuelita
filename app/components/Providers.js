'use client';

import { MotionConfig } from "framer-motion";

// Keeps every animation, but lets visitors with "reduce motion" enabled
// get the calm version (transforms are skipped, opacity fades remain).
export default function Providers({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
