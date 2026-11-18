"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PILLARS } from "@/lib/data";
import { Eyebrow, Reveal, SplitWords } from "./ui";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* who we are */}
        <div ref={ref} className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <Eyebrow>About us</Eyebrow>
            </Reveal>
            <h2 className="mt-6 font-display text-5xl font-medium leading-none text-ink sm:text-7xl">
              <SplitWords text="Who We Are?" italicWords={["Are?"]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-ink/75">
                Sevafit Hardwares is a hardware brand operating under <strong className="text-ink">GT GOLD ENTERPRISES</strong>, a business engaged in manufacturing, imports, domestic sales, and exports of hardware products. We serve retailers, wholesalers, furniture manufacturers, distributors, and bulk buyers with a diverse range of furniture and hardware solutions.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex items-center gap-5">
                <span className="font-display text-4xl font-semibold tracking-wide text-metal sm:text-5xl">RAW. PURE. REAL.</span>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <h3 className="font-display text-2xl text-ink">Explore Our Products</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">Find hardware solutions for your furniture and business needs, with a variety of designs, finishes, and product options.</p>
              </Reveal>
              <Reveal delay={0.2}>
                <h3 className="font-display text-2xl text-ink">Wholesale &amp; Bulk Enquiries</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">Looking for hardware products for your business? Connect with us to explore our product range and discuss your wholesale requirements.</p>
              </Reveal>
            </div>
          </div>

          <Reveal y={60}>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-4 -z-0 translate-x-4 translate-y-4 rounded-[2rem] border border-ink/20" />
              <div className="relative h-full overflow-hidden rounded-[2rem] shadow-[0_50px_80px_-35px_rgba(60,30,0,.7)]">
                <motion.div style={{ y: imgY }} className="absolute -inset-y-[10%] inset-x-0">
                  <Image src="/img/kitchen.jpg" alt="Kitchen finished with premium handles" fill sizes="(max-width:1024px) 90vw, 40vw" className="object-cover" />
                </motion.div>
              </div>
              <div className="absolute -bottom-6 -left-4 rounded-2xl bg-ink px-6 py-5 text-white shadow-2xl sm:-left-10">
                <div className="font-display text-4xl text-metal">Aligarh</div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-white/60">Manufacturing unit</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* pillars */}
        <div className="mt-28 grid gap-px overflow-hidden rounded-3xl bg-ink/15 ring-1 ring-ink/15 sm:grid-cols-2 lg:grid-cols-6">
          {PILLARS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: "#0b0b0c" }}
              className={`group relative bg-cream p-8 transition-colors duration-500 lg:col-span-2 ${i >= 3 ? "lg:col-span-3" : ""}`}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-5xl text-ink/20 transition-colors group-hover:text-sand/60">0{i + 1}</span>
                <span className="h-2 w-2 rounded-full bg-ember opacity-0 transition group-hover:opacity-100" />
              </div>
              <h3 className="font-display text-3xl text-ink transition-colors group-hover:text-sand">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70 transition-colors group-hover:text-white/70">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
