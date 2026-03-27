"use client";

import Image from "next/image";
import { useLanguage } from "../../../shared/language-provider";
import { useReveal } from "../../../shared/hooks/use-reveal";

export default function CtaSection() {
  const { lang, t } = useLanguage();
  const ref = useReveal();

  return (
    <section className="py-20 sm:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
          {/* BG image */}
          <div className="absolute inset-0">
            <Image
              src="/images/fresh-ingredients.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#04462B]/90" />
          </div>

          <div className="relative z-10 px-6 sm:px-12 md:px-20 py-16 sm:py-20 text-center">
            <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-[#64BB36] mb-4">
              {t.hero.slogan}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-white mb-5 text-balance leading-tight max-w-2xl mx-auto">
              {lang === "ar"
                ? "جاهز تبدأ حياة صحية؟"
                : "Ready to Start a Healthy Life?"}
            </h2>
            <p className="text-base text-white/45 max-w-lg mx-auto mb-10 leading-relaxed">
              {lang === "ar"
                ? "اطلب دلوقتي من Healthy Nest واستمتع بأكل صحي ولذيذ يوصلك لحد باب بيتك"
                : "Order now from Healthy Nest and enjoy healthy, delicious food delivered to your door"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={`https://wa.me/${t.contact.phone_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#EBDB0A] text-[#04462B] px-8 py-3.5 rounded-full text-[15px] font-bold hover:bg-[#EBDB0A]/90 transition-all duration-300 hover:shadow-2xl hover:shadow-[#EBDB0A]/20"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.nav.order}
              </a>
              <a
                href="tel:01234567890"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white/60 border border-white/10 px-8 py-3.5 rounded-full text-[15px] font-bold hover:bg-white/[0.06] hover:border-white/20 hover:text-white transition-all duration-300"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {t.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
