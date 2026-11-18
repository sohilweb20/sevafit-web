"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { STATS } from "@/lib/data";
import { CountUp, Reveal, SplitWords } from "./ui";

export function Quality() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-28 sm:py-40">
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[15%] opacity-40">
        <Image src="/img/range.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      <div className="grain-dark absolute inset-0" />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <h2 className="font-display text-6xl font-medium leading-none text-white sm:text-8xl lg:text-[9rem]">
          <SplitWords text="Quality" /> <SplitWords text="Matters" delay={0.15} italicWords={["Matters"]} />
        </h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            We Manufacture Quality Hardware. We Import Quality Hardware. Our Prices Are Flexible. Our vibe Is New. We Grow Fast.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12} className="px-2 py-10 sm:py-14">
              <div className="font-display text-5xl font-medium text-metal sm:text-7xl">
                {s.static ? s.suffix : <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />}
              </div>
              <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60 sm:text-xs">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = ["Check", "Order", "Pay"];
  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-ink">Less is more</span>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 font-display text-6xl text-sand-deep sm:text-8xl">
          {steps.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-6"
            >
              <span className="transition-colors hover:text-ink">{s}</span>
              {i < steps.length - 1 && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.18 }}
                  className="text-ink/30"
                >
                  &gt;
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
