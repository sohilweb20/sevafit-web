"use client";

import { MotionConfig } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import { Quality, Process } from "@/components/Quality";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [enquiry, setEnquiry] = useState<{ name: string; n: number } | null>(null);

  const onEnquire = (name: string) => {
    setEnquiry((e) => ({ name, n: (e?.n ?? 0) + 1 }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products onEnquire={onEnquire} />
        <Quality />
        <Process />
        <Team />
        <Contact product={enquiry} />
      </main>
      <Footer />
    </MotionConfig>
  );
}
