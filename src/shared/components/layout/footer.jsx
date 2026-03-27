"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../../shared/language-provider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#04462B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/Logo.png"
              alt="Healthy Nest"
              width={140}
              height={56}
              className="h-20 w-auto mb-5"
            />
            <p className="text-sm leading-relaxed text-white/40 max-w-xs">
              {t.footer.tagline}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-[#EBDB0A]/20 hover:text-[#EBDB0A] transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-[#EBDB0A]/20 hover:text-[#EBDB0A] transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-[#EBDB0A]/20 hover:text-[#EBDB0A] transition-all duration-300"
                aria-label="TikTok"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13v-3.5a6.37 6.37 0 0 0-.88-.07 6.26 6.26 0 0 0 0 12.52 6.27 6.27 0 0 0 6.26-6.27V8.55a8.24 8.24 0 0 0 3.84.96V6.09a4.84 4.84 0 0 1 0 .6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#EBDB0A] mb-5">
              {t.footer.links_title}
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-white/40 hover:text-white transition-colors duration-200"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/menu"
                className="text-sm text-white/40 hover:text-white transition-colors duration-200"
              >
                {t.nav.menu}
              </Link>
              <Link
                href="/about"
                className="text-sm text-white/40 hover:text-white transition-colors duration-200"
              >
                {t.nav.about}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-white/40 hover:text-white transition-colors duration-200"
              >
                {t.nav.contact}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#EBDB0A] mb-5">
              {t.footer.contact_title}
            </h4>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-white/40 text-right" dir="ltr">
                {t.contact.phone_number}
              </span>
              <span className="text-sm text-white/40">{t.contact.email}</span>
              <span className="text-sm text-white/40">{t.contact.address}</span>
              <span className="text-sm text-white/40">{t.contact.hours}</span>
            </div>
          </div>

          {/* Order CTA */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#EBDB0A] mb-5">
              {t.nav.order}
            </h4>
            <p className="text-sm text-white/40 mb-5 leading-relaxed">
              {t.hero.subtitle.substring(0, 60)}...
            </p>
            <a
              href={`https://wa.me/${t.contact.phone_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#EBDB0A] text-[#04462B] px-6 py-3 rounded-full text-sm font-bold hover:bg-[#EBDB0A]/90 transition-all duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.contact.whatsapp}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            {"© "}
            {new Date().getFullYear()} Healthy Nest. {t.footer.rights}
          </p>
          <p className="text-xs text-white/25">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
