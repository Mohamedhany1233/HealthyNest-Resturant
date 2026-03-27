"use client";

import Image from "next/image";
import { useLanguage } from "../../../shared/language-provider";
import { motion } from "framer-motion";

export default function AboutContent() {
  const { t, lang } = useLanguage();

  const values = [
    {
      title: t.about.value1_title,
      desc: t.about.value1_desc,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z" />
          <path d="M12 7v8" />
          <path d="M9.17 12.83 12 10l2.83 2.83" />
        </svg>
      ),
    },
    {
      title: t.about.value2_title,
      desc: t.about.value2_desc,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      title: t.about.value3_title,
      desc: t.about.value3_desc,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  const section = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerWrap = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-background via-background to-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            variants={section}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-0.5 bg-[#64BB36]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#64BB36]">
              {t.hero.slogan}
            </span>
            <div className="w-8 h-0.5 bg-[#64BB36]" />
          </motion.div>

          <motion.h1
            variants={section}
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance`}
          >
            {t.about.title}
            <span
              className={`block text-lg sm:text-xl font-normal text-muted-foreground mt-8`}
            >
              {t.about.subtitle}
            </span>
          </motion.h1>
        </motion.div>

        {/* Story Section */}
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 sm:mb-32"
        >
          {/* Image */}
          <motion.div
            variants={section}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#04462B]/10 to-transparent z-10" />

              <motion.div
                initial={{ scale: 1.02 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/hero-bg.jpg"
                  alt="Lite Food kitchen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>

              {/* Floating badge */}
              <motion.div
                variants={section}
                className="absolute bottom-0 -right-0 bg-gradient-to-r from-[#EBDB0A] to-[#F0E464] rounded p-4 shadow-xl shadow-[#EBDB0A]/30"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#04462B]">+2K</p>
                  <p className="text-xs font-semibold text-[#04462B]/70 mt-1">
                    {t.hero.stats.customers}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={staggerWrap} className="order-1 lg:order-2">
            <motion.h2
              variants={section}
              className="text-2xl sm:text-3xl font-bold text-foreground mb-6 leading-tight"
            >
              {t.about.mission_label}
            </motion.h2>

            <motion.div variants={staggerWrap} className="flex flex-col gap-6">
              <motion.p
                variants={section}
                className="text-base text-muted-foreground leading-relaxed"
              >
                {t.about.mission}
              </motion.p>

              <motion.p
                variants={section}
                className="text-base text-muted-foreground leading-relaxed"
              >
                {t.about.story}
              </motion.p>

              {/* Highlight Box */}
              <motion.div
                variants={section}
                className="mt-4 p-6 bg-gradient-to-r from-[#04462B]/5 to-[#0A5D38]/5 rounded-xl border-l-4 border-[#64BB36]"
              >
                <p className="text-base font-semibold text-foreground leading-relaxed">
                  {t.about.p3}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={section} className="text-center mb-14">
            <div className="inline-block mb-4">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#64BB36]">
                {t.about.values_title || "Our Values"}
              </span>
            </div>

            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {t.about.value2_desc}
            </p>
          </motion.div>

          <motion.div
            variants={staggerWrap}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={card}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group relative bg-white p-8 rounded-2xl border border-border/40 hover:border-[#64BB36]/30 hover:shadow-lg hover:shadow-[#04462B]/5"
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#04462B] to-[#0A5D38] flex items-center justify-center text-[#EBDB0A]"
                  >
                    {value.icon}
                  </motion.div>

                  <div className="absolute -inset-2 bg-gradient-to-br from-[#64BB36]/20 to-transparent rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>

                {/* Bottom Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#64BB36] to-transparent origin-center"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative Footer */}
        <motion.div
          variants={section}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-20 pt-8 border-t border-border/30 text-center"
        >
          <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            <span className="font-medium">
              {t.about.footer || "Committed to healthy living"}
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
