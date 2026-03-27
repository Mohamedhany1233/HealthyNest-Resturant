"use client";

import { useLanguage } from "../../../shared/language-provider";
import { motion } from "framer-motion";

export default function ContactContent() {
  const { t, lang } = useLanguage();

  const ease = [0.22, 1, 0.36, 1];

  // Parent stagger
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.06 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  const card = {
    hidden: { opacity: 0, y: 12, scale: 0.99 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } },
  };

  return (
    <section className="py-16 sm:py-24">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* Header */}
        <motion.div variants={container} className="text-center mb-16 sm:mb-20">
          <motion.span
            variants={item}
            className="inline-block text-xs font-bold tracking-widest uppercase text-[#64BB36] mb-3"
          >
            {t.hero.slogan}
          </motion.span>

          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 text-balance"
          >
            {t.contact.title}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto"
          >
            {t.contact.subtitle}
          </motion.p>
        </motion.div>

        {/* Main Cards */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
        >
          {/* WhatsApp */}
          <motion.a
            variants={card}
            href="https://wa.me/201070010209"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group relative overflow-hidden bg-[#04462B] text-[#EBDB0A] p-8 rounded-3xl border border-white/10
                       hover:border-white/15 hover:shadow-2xl hover:shadow-black/25 transition-colors"
          >
            {/* subtle accent */}
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#64BB36]/10 blur-2xl" />
            <div className="relative">
              <div className="mb-5 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-[#25D366]"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold mb-2 text-[#EBDB0A]">
                {t.contact.whatsapp}
              </h3>
              <p className="text-sm text-white/55 font-medium" dir="ltr">
                {t.contact.phone_number}
              </p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            variants={card}
            href={`tel:${t.contact.phone_number}`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group relative overflow-hidden bg-[#EBDB0A] text-[#04462B] p-8 rounded-3xl border border-[#04462B]/10
                       hover:border-[#04462B]/20 hover:shadow-2xl hover:shadow-[#EBDB0A]/20 transition-colors"
          >
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#04462B]/8 blur-2xl" />
            <div className="relative">
              <div className="mb-5 w-14 h-14 bg-[#04462B]/10 rounded-2xl flex items-center justify-center">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold mb-2 text-[#04462B]">
                {t.contact.phone}
              </h3>
              <p className="text-sm text-[#04462B]/60 font-medium" dir="ltr">
                {t.contact.phone_number}
              </p>
            </div>
          </motion.a>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              label: "Email",
              value: t.contact.email,
              icon: (
                <>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </>
              ),
            },
            {
              label: t.contact.address_label,
              value: t.contact.address,
              icon: (
                <>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </>
              ),
            },
            {
              label: t.contact.hours_label,
              value: t.contact.hours,
              icon: (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </>
              ),
            },
          ].map((c, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-card p-6 rounded-2xl border border-border/40 text-center hover:border-[#64BB36]/30"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#04462B]/[0.06] text-[#04462B] rounded-xl mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {c.icon}
                </svg>
              </div>

              <p className="text-xs font-bold tracking-wide uppercase text-foreground/40 mb-1">
                {c.label}
              </p>
              <p className="text-sm font-semibold text-foreground">{c.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
