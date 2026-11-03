'use client';

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Events from "./components/Events";
import AppShowcase from "./components/AppShowcase";
import Testimonials from "./components/Testimonials";
import ClosingCTA from "./components/ClosingCTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Events />
      <AppShowcase />
      <Testimonials />
      <ClosingCTA />
    </main>
  );
}
