"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../../shared/language-provider";

import { useEffect, useState } from "react";

export default function Hero() {
  const { lang, t } = useLanguage();
  const isArabic = lang === "ar";

  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    const targets = [500, 2000, 100];
    const duration = 1600;
    const delayMs = 800;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    let rafId = null;
    let startTime = null;

    const animate = (now) => {
      if (startTime === null) startTime = now;

      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);

      setCounts([targets[0] * eased, targets[1] * eased, targets[2] * eased]);

      if (t < 1) rafId = requestAnimationFrame(animate);
    };

    const delay = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, delayMs);

    return () => {
      clearTimeout(delay);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const stats = [
    { value: "+500", label: t.hero.stats.meals },
    { value: "+2K", label: t.hero.stats.customers },
    { value: "100%", label: t.hero.stats.fresh },
  ];

  return (
    <>
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#04462B]">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover opacity-15"
            priority
            loading="eager"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#04462B]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04462B]/60 via-transparent to-[#04462B]" />
        </div>

        {/* Ambient glow */}
        <div className="absolute top-[15%] right-[8%] w-[320px] h-[320px] bg-[#64BB36]/8 rounded-full blur-[100px] animate-pulse-soft" />
        <div
          className="absolute bottom-[15%] left-[5%] w-[400px] h-[400px] bg-[#EBDB0A]/5 rounded-full blur-[120px] animate-pulse-soft"
          style={{ animationDelay: "2s" }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center pt-24 pb-16">
          {/* Logo */}
          <div className="mb-8 animate-hero-fade-up hero-delay-1">
            <Image
              src="/images/Logo.png"
              alt="Lite Food"
              width={280}
              height={140}
              className="mx-auto animate-float"
              style={{ width: "auto", height: "auto", maxWidth: "200px" }}
              priority
            />
          </div>

          {/* Slogan badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#EBDB0A]/10 border border-[#EBDB0A]/15 rounded-full px-5 py-2 mb-8 animate-hero-fade-up hero-delay-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EBDB0A]" />
            <span className="text-[13px] font-semibold text-[#EBDB0A] tracking-wide">
              {t.hero.slogan}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-extrabold text-white leading-[1.1] mb-6 animate-hero-fade-up hero-delay-3 text-balance">
            {t.hero.tagline}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto mb-12 animate-hero-fade-up hero-delay-4 leading-relaxed text-pretty">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-hero-fade-up hero-delay-5">
            <Link
              href="/menu"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#EBDB0A] text-[#04462B] px-8 py-3.5 rounded-full text-[15px] font-bold hover:bg-[#EBDB0A]/90 transition-all duration-300 hover:shadow-2xl hover:shadow-[#EBDB0A]/20"
            >
              {t.hero.cta_menu}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <a
              href={`https://wa.me/${t.contact.phone_number}?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B%D8%8C%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B7%D9%84%D8%A8%20%D9%85%D9%86%20Healthy%20Nest`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white/70 border border-white/15 px-8 py-3.5 rounded-full text-[15px] font-bold hover:bg-white/[0.06] hover:border-white/25 hover:text-white transition-all duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#25D366]"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.hero.cta_whatsapp}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 z-1 mb-[20px] sm:mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto animate-hero-fade-up hero-delay-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center ${
                  i === 1 ? "border-x border-white/[0.08]" : ""
                }`}
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-[#EBDB0A]">
                  {i === 0 && <>+{Math.floor(counts[0])}</>}
                  {i === 1 && <>+{Math.floor(counts[1])}</>}
                  {i === 2 && <>{Math.floor(counts[2])}%</>}
                </p>

                <p className="text-[11px] sm:text-xs text-white/35 mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-hero-fade-up hero-delay-6">
          <div className="w-[22px] h-[34px] rounded-full border-[1.5px] border-white/40 flex items-start justify-center pt-2">
            <div className="w-[3px] h-[6px] rounded-full bg-white/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#EBDB0A] overflow-hidden py-3">
        <div
          className="animate-marquee whitespace-nowrap flex items-center"
          aria-hidden="true"
          dir={isArabic ? "ltr" : ""}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="inline-flex items-center gap-4 mx-4">
              {t.marquee.map((m, i) => (
                <div
                  key={i}
                  className="text-[13px] flex gap-6 items-center font-bold text-[#04462B] tracking-wider uppercase"
                >
                  {m}
                  <span className="w-1 h-1 rounded-full bg-[#04462B]" />
                </div>
              ))}
            </div>
          ))}
          <span className="w-1 h-1 rounded-full bg-[#04462B]" />
        </div>
      </div>
    </>
  );
}
