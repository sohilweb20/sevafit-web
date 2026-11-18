"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/data";
import { FacebookIcon, InstagramIcon } from "./ui";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-ink/80 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)]" : "bg-ink"
        }`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${scrolled ? "h-16" : "h-20"}`}>
          <a href="#home" className="flex items-center gap-3">
            <Image src="/img/logo.jpg" alt="Sevafit logo" width={44} height={44} className="h-10 w-10 rounded-md object-cover ring-1 ring-white/10" />
            <span className="font-display text-2xl font-medium tracking-tight text-white sm:text-[1.7rem]">Sevafit Hardware</span>
          </a>

          <nav className="relative hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative px-4 py-2 text-[13px] font-medium transition-colors ${active === n.id ? "text-white" : "text-white/55 hover:text-white"}`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden rounded-full bg-sand px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink transition hover:bg-sand-soft hover:shadow-[0_0_30px_-4px_#e3a96f] sm:inline-block"
            >
              Contact
            </a>
            <a href="#" aria-label="Facebook" className="hidden text-white/70 transition hover:text-sand sm:block">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="hidden text-white/70 transition hover:text-sand sm:block">
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-white/10 lg:hidden"
            >
              <span className={`absolute h-0.5 w-5 bg-white transition ${open ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-0.5 w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-0.5 w-5 bg-white transition ${open ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-gradient-to-r from-ember via-gold to-sand" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 border-t border-white/10 bg-ink/95 p-6 backdrop-blur-xl lg:hidden"
          >
            {NAV.map((n, i) => (
              <motion.a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="block border-b border-white/10 py-4 font-display text-3xl text-white"
              >
                {n.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
