"use client";

import Image from "next/image";
import { BRAND } from "@/lib/data";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "./ui";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="grain-dark absolute inset-0" />
      <div className="absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-ember/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <a href="#home" className="flex items-center gap-4">
              <Image src="/img/logo.jpg" alt="Sevafit logo" width={64} height={64} className="h-14 w-14 rounded-lg object-cover ring-1 ring-white/10" />
              <span className="font-display text-4xl sm:text-5xl">Sevafit Hardware</span>
            </a>
            <div className="mt-6 flex gap-3">
              {[FacebookIcon, InstagramIcon].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-sand hover:text-ink">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <ul className="space-y-4 text-[15px]">
            <li className="flex items-center gap-3">
              <PinIcon className="h-5 w-5 text-sand" /> {BRAND.base}
            </li>
            <li>
              <a href={BRAND.phoneHref} className="flex items-center gap-3 transition hover:text-sand">
                <PhoneIcon className="h-5 w-5 text-sand" /> {BRAND.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 transition hover:text-sand">
                <MailIcon className="h-5 w-5 text-sand" /> {BRAND.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/50 md:flex-row md:items-center">
          <p className="max-w-3xl">
            © 2026 Sevafit Hardwares. All Rights Reserved. A Brand of GT Gold Enterprises, Aligarh, Uttar Pradesh, India. All product names, images, logos and website content are the property of Sevafit Hardwares. Unauthorized use or reproduction is prohibited.
          </p>
          <a href="#home" className="shrink-0 rounded-full border border-white/20 px-5 py-2 font-semibold uppercase tracking-wider text-white/80 transition hover:bg-white hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
