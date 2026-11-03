'use client';

import { useEffect, useState } from "react";

// Pages are prerendered at build time, so "today" must come from the visitor's
// browser. Returns null during SSR/first paint, then the current date.
export function useNow() {
  const [now, setNow] = useState(null);
  useEffect(() => setNow(new Date()), []);
  return now;
}
