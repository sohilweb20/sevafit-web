"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { BRAND } from "@/lib/data";
import { Arrow, Eyebrow, Reveal, SplitWords } from "./ui";

const field =
  "peer w-full rounded-xl border border-ink/20 bg-white/80 px-4 pb-2.5 pt-6 text-[15px] text-ink outline-none transition focus:border-ink focus:bg-white focus:shadow-[0_0_0_4px_rgba(11,11,12,.08)]";
const label =
  "pointer-events-none absolute left-4 top-4 origin-left text-sm text-ink/55 transition-all peer-focus:top-2 peer-focus:scale-75 peer-focus:text-ink peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75";

export default function Contact({ product }: { product: { name: string; n: number } | null }) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  // prefill the message when a product enquiry arrives (adjust state during render)
  const [seen, setSeen] = useState(0);
  if (product && product.n !== seen) {
    setSeen(product.n);
    setMessage(`Hello Sevafit team, I would like to know more about: ${product.name}.\n\nQuantity / requirement:`);
    setSent(false);
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Website enquiry from ${f.get("first")} ${f.get("last")}`;
    const body = `${f.get("message")}\n\n— ${f.get("first")} ${f.get("last")}\n${f.get("email")}`;
    window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-sand pt-24 sm:pt-32">
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Contact us</Eyebrow>
          </Reveal>
          <h2 className="mt-6 font-display text-6xl font-medium leading-none text-ink sm:text-8xl">
            <SplitWords text="Send a note." italicWords={["note."]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-sm text-[17px] leading-relaxed text-ink/75">You can save time by contacting us through mail or directly by phone number.</p>
            <p className="mt-6 font-display text-3xl italic text-ink">Happy to serve you !!!!!</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={BRAND.phoneHref} className="rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-ink-3">
                Call now
              </a>
              <a href={`mailto:${BRAND.email}`} className="rounded-full border border-ink/40 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-white">
                Email us
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative rounded-[2rem] bg-cream/60 p-6 shadow-[0_40px_80px_-40px_rgba(60,30,0,.6)] ring-1 ring-white/50 backdrop-blur sm:p-9">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid min-h-[22rem] place-items-center text-center"
                >
                  <div>
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink text-sand">
                      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path d="M5 12l5 5L20 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
                      </svg>
                    </div>
                    <h3 className="mt-6 font-display text-4xl text-ink">Thank you!</h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-ink/70">Your email app should open with your note ready to send. We usually reply within a day.</p>
                    <button onClick={() => setSent(false)} className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink underline underline-offset-4">
                      Send another
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="grid gap-4 sm:grid-cols-2" exit={{ opacity: 0 }}>
                  <div className="relative">
                    <input name="first" required placeholder=" " className={field} />
                    <label className={label}>First Name*</label>
                  </div>
                  <div className="relative">
                    <input name="last" required placeholder=" " className={field} />
                    <label className={label}>Last Name*</label>
                  </div>
                  <div className="relative sm:col-span-2">
                    <input name="email" type="email" required placeholder=" " className={field} />
                    <label className={label}>Email*</label>
                  </div>
                  <div className="relative sm:col-span-2">
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder=" "
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${field} resize-none`}
                    />
                    <label className={label}>Message*</label>
                  </div>
                  <div className="flex items-center justify-between sm:col-span-2">
                    <p className="text-xs text-ink/60">We reply within one business day.</p>
                    <button className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,.7)] transition hover:bg-ink-3">
                      Submit
                      <Arrow className="h-4 w-4 text-sand transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* map */}
      <Reveal className="relative mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(60,30,0,.7)] ring-1 ring-black/20">
          <iframe
            title="Sevafit Hardware location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=New+Hindon+Vihar+Mohan+Nagar+Ghaziabad&output=embed"
            className="h-[26rem] w-full border-0 grayscale-[.35] contrast-[1.05] transition hover:grayscale-0"
          />
        </div>
      </Reveal>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 text-center sm:grid-cols-3 sm:px-8">
        {[
          { h: "Location", t: ["Near Star medical, New Hindon Vihar,", "Neelmani Colony, Mohan Nagar, Ghaziabad,", "Uttar Pradesh, India"] },
          { h: "Contact", t: [`Mob: ${BRAND.phone}`, `Email: ${BRAND.email.toLowerCase()}`] },
          { h: "Availability", t: [BRAND.hours] },
        ].map((c, i) => (
          <Reveal key={c.h} delay={i * 0.1}>
            <h3 className="font-display text-3xl text-ink">{c.h}</h3>
            <div className="mx-auto mt-3 h-px w-10 bg-ink/40" />
            <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
              {c.t.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
