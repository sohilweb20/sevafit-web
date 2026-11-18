"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/data";
import { Arrow, Eyebrow, Reveal, SplitWords } from "./ui";

export default function Products({ onEnquire }: { onEnquire: (product: string) => void }) {
  return (
    <section id="products" className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <Eyebrow>Details</Eyebrow>
            </Reveal>
            <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] text-ink sm:text-7xl">
              <SplitWords text="Our Some Best" />
              <br />
              <SplitWords text="Products are...." delay={0.15} italicWords={["Products", "are...."]} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-ink/70">Hover to explore. Tap “Contact to know more” on any product to start an enquiry with it pre-filled.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-ink shadow-[0_30px_60px_-30px_rgba(60,30,0,.7)] ring-1 ring-black/10 transition-transform duration-700 group-hover:-translate-y-2">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink backdrop-blur">
                  {p.tag}
                </span>
                <span className="absolute bottom-4 right-5 font-display text-5xl leading-none text-white/80">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-3xl leading-tight text-ink">{p.name}</h3>
              <button
                onClick={() => onEnquire(p.name)}
                className="group/btn mt-4 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:bg-ink-3 hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,.6)]"
              >
                Contact to know more
                <Arrow className="h-4 w-4 text-sand transition-transform group-hover/btn:translate-x-1" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
