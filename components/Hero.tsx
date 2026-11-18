"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { CATEGORIES } from "@/lib/data";
import { Arrow, Magnetic, SplitWords, ease } from "./ui";

export default function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);

  const { scrollYProgress } = useScroll({ target: stage, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="home" className="relative overflow-hidden bg-sand pt-20">
      <div className="grain absolute inset-0" />
      {/* ambient light */}
      <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-sand-soft/70 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-ember/20 blur-3xl" />
      {/* giant outline wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[26vw] font-semibold leading-none text-transparent opacity-50 [-webkit-text-stroke:1px_rgba(11,11,12,.18)]"
      >
        SEVAFIT
      </div>

      <div ref={stage} className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mb-7 inline-flex items-center gap-3 rounded-full bg-ink/90 py-2 pl-3 pr-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sand"
          >
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            Wholesale &amp; Bulk Enquiries Open
          </motion.div>

          <h1 className="font-display text-[3.2rem] font-medium leading-[0.95] tracking-tight text-ink sm:text-7xl xl:text-[5.6rem]">
            <SplitWords text="Welcome to Sevafit" delay={0.3} />
            <br />
            <SplitWords text="Hardwares." delay={0.55} italicWords={["Hardwares."]} />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-7 text-lg font-semibold text-ink"
          >
            Quality Hardware. Global Sourcing. Reliable Partnerships.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/75"
          >
            Discover a wide range of furniture and hardware products designed to combine style, functionality, and value. We offer furniture handles, cabinet knobs, hinges, sofa legs, aluminium profile handles, locks, and other hardware solutions for retailers, wholesalers, furniture manufacturers, and bulk buyers. Operating under GT GOLD ENTERPRISES, we combine Indian manufacturing with international sourcing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#about"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,.7)] transition hover:bg-ink-3"
              >
                Learn more
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <a href="#products" className="group inline-flex items-center gap-2 px-2 py-4 text-xs font-semibold uppercase tracking-wider text-ink">
              <span className="border-b border-ink/40 pb-0.5 transition-colors group-hover:border-ink">Explore products</span>
            </a>
          </motion.div>
        </motion.div>

        {/* 3D tilt brand card */}
        <motion.div style={{ y: imgY }} className="relative mx-auto w-full max-w-[34rem] [perspective:1200px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => {
              mx.set(0);
              my.set(0);
            }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative aspect-square overflow-hidden rounded-[2rem] shadow-[0_50px_90px_-30px_rgba(40,20,0,.75)] ring-1 ring-black/20"
          >
            <Image src="/img/logo.jpg" alt="Sevafit Hardwares by GT Gold" fill priority sizes="(max-width:1024px) 90vw, 34rem" className="object-cover" />
            <motion.div
              style={{ background: useTransform([glowX, glowY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,235,190,.28), transparent 55%)`) }}
              className="absolute inset-0 mix-blend-soft-light"
            />
          </motion.div>

          {/* floating glass chips */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.9, ease }}
            className="absolute -left-4 bottom-10 sm:-left-12"
          >
            <div className="float-slow rounded-2xl bg-white/70 px-5 py-4 shadow-xl ring-1 ring-white/60 backdrop-blur-xl">
              <div className="font-display text-3xl font-semibold leading-none text-ink">10+</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-ink/60">Product lines</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.9, ease }}
            className="absolute -right-3 top-10 sm:-right-8"
          >
            <div className="float-slow rounded-2xl bg-ink/90 px-5 py-4 text-white shadow-xl ring-1 ring-white/10 backdrop-blur-xl [animation-delay:-3s]">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-sand">Made &amp; Imported</div>
              <div className="mt-1 font-display text-xl">Aligarh → Worldwide</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* category marquee */}
      <div className="marquee relative overflow-hidden border-y border-white/10 bg-ink py-5">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-3xl text-white/90">
              {c}
              <span className="text-metal text-xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
