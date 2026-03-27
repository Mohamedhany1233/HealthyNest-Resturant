"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../../shared/language-provider";
import { menuItems } from "../../menu/data/menu-data";
import { useReveal } from "../../../shared/hooks/use-reveal";

export default function FeaturedSection() {
  const { lang, t } = useLanguage();
  const ref = useReveal();
  const featured = menuItems.slice(0, 3);

  return (
    <section
      className="py-20 sm:py-28 bg-gradient-to-b from-background via-background to-background/95"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-0.5 bg-[#64BB36]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#64BB36]">
                {t.menu.title}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground text-balance leading-tight">
              {lang === "ar" ? "الأكثر طلبًا" : "Most Popular"}
              <span className="block text-lg sm:text-xl font-normal text-muted-foreground mt-3">
                {lang === "ar"
                  ? "الوجبات المفضلة لدى عملائنا"
                  : "Our customers' favorite meals"}
              </span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#04462B]/5 hover:bg-[#04462B]/10 text-foreground/60 hover:text-[#04462B] transition-all duration-300"
          >
            <span className="text-sm font-semibold">
              {lang === "ar" ? "شوف المنيو كامل" : "View Full Menu"}
            </span>
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
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((item, i) => {
            const name = lang === "ar" ? item.nameAr : item.nameEn;
            const desc = lang === "ar" ? item.descAr : item.descEn;

            return (
              <div
                key={item.id}
                className={`reveal reveal-delay-${i + 1} group relative rounded-2xl overflow-hidden bg-white border border-border/40 hover:border-[#64BB36]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#04462B]/5`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent z-10" />
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-[#64BB36] animate-pulse" />
                      <span className="text-xs font-bold text-[#04462B]">
                        {item.calories} {t.menu.cal}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground leading-tight mb-2">
                        {name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {desc}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-xl font-bold text-[#04462B] whitespace-nowrap">
                      {item.price}
                      <span className="text-sm font-medium text-foreground/50 mr-0.5 ml-0.5">
                        {t.menu.currency}
                      </span>
                    </span>
                  </div>

                  {/* Order Button */}
                  <div className="pt-4 mt-4 border-t border-border/30">
                    <a
                      href={`https://wa.me/${t.contact.phone_number}?text=${encodeURIComponent(
                        `${lang === "ar" ? "أهلاً، عايز أطلب" : "Hi, I'd like to order"} ${name} ${lang === "ar" ? "من Lite Food" : "from Lite Food"}`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-3 w-full bg-[#04462B] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#04462B]/90 transition-all duration-300 hover:shadow-md"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-[#25D366] group-hover/btn:scale-110 transition-transform"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>{t.menu.order}</span>
                    </a>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#64BB36] to-[#EBDB0A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>

        {/* Decorative Element */}
        <div className="mt-16 text-center reveal reveal-delay-4">
          <div className="inline-flex items-center gap-4 text-sm text-muted-foreground">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="font-medium">
              {lang === "ar" ? "شهية طيبة!" : "Bon appétit!"}
            </span>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
