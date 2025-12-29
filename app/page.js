'use client';

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import AppShowcase from "./components/AppShowcase";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <AppShowcase />
    </main>
  );
}
