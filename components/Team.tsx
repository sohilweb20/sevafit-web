"use client";

import { motion } from "framer-motion";
import { TEAM } from "@/lib/data";
import { Eyebrow, FacebookIcon, InstagramIcon, Reveal, SplitWords, XIcon } from "./ui";

export default function Team() {
  return (
    <section id="team" className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>The people</Eyebrow>
        </Reveal>
        <h2 className="mt-6 font-display text-6xl font-medium leading-none text-ink sm:text-8xl">
          <SplitWords text="Our Team" italicWords={["Team"]} />
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-[0_30px_60px_-30px_rgba(60,30,0,.8)]"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sand/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-ember/25" />
              <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-full bg-gradient-to-br from-sand-soft via-sand to-sand-deep ring-4 ring-white/10 transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3">
                <span className="font-display text-5xl font-semibold text-ink">{m.initials}</span>
              </div>
              <h3 className="relative mt-7 text-center font-display text-3xl">{m.name}</h3>
              <p className="relative mt-1 text-center text-xs font-semibold uppercase tracking-[0.25em] text-sand">{m.role}</p>
              <div className="relative mt-6 flex justify-center gap-3 text-white/60">
                {[FacebookIcon, XIcon, InstagramIcon].map((Icon, k) => (
                  <a
                    key={k}
                    href="#"
                    aria-label="Social link"
                    className="grid h-9 w-9 place-items-center rounded-full bg-white/5 transition hover:bg-sand hover:text-ink"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
