"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../../../shared/language-provider";
import { useCartItems } from "../../../shared/contexts/CartItemsContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems, setIsOpen } = useCartItems();
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname();
  const cartItemsCount = 1;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setTimeout(() => setMobileOpen(false), 0);
  }, [pathname]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
    { href: "/makeYourMeal", label: t.nav.make_your_meal },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = useCallback(
    (href) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname],
  );

  const isHomePath = pathname == "/";
  const isArabic = lang == "ar";

  function handleOpenCart() {
    setIsOpen(true);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  ${
          scrolled
            ? "bg-background/20 backdrop-blur-2xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div>
          <div className="flex justify-between m-auto w-[96%] lg:w-[70%] p-3">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/Logo.png"
                alt="Healthy Nest"
                width={120}
                height={48}
                className="h-9  w-90 drop-shadow-lg"
                style={{ width: "auto", height: "auto", maxHeight: "44px" }}
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative ${!scrolled && isHomePath ? "text-white" : "text-black"} px-4 py-2 text-[13px] font-semibold rounded-full transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-[#04462B] bg-[#04462B]/[0.06]"
                      : "text-foreground/50 hover:text-emerald-700 hover:bg-foreground/[0.03]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart Icon - Desktop */}
              <button
                className={`relative p-2 rounded-full transition-all duration-300 ${
                  !scrolled && isHomePath
                    ? "text-white hover:bg-white/20"
                    : "text-black hover:bg-gray-100"
                }`}
                aria-label="Shopping cart"
                onClick={handleOpenCart}
              >
                <ShoppingCart strokeWidth={2.5} className={`w-5 h-5`} />

                {/* Cart Items Count Badge */}
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#04462B] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount > 9 ? "9+" : cartItems.length}
                  </span>
                )}
              </button>

              <button
                onClick={toggleLang}
                className={`flex items-center ${!scrolled && isHomePath ? "text-white hover:bg-white" : "text-black hover:bg-[#04462B] hover:text-white"} gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest text-foreground/50 hover:text-foreground transition-all duration-300 uppercase border border-transparent hover:border-border`}
                aria-label="Toggle language"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-50"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {lang === "ar" ? "EN" : "AR"}
              </button>

              <a
                href={`https://wa.me/${t.contact.phone_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-[#04462B] text-[#EBDB0A] px-5 py-2 rounded-full text-[13px] font-bold hover:bg-[#04462B]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#04462B]/10"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-[#25D366]"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.nav.order}
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                dir={isArabic ? "ltr" : "rtl"}
                className={`${!scrolled && isHomePath ? "text-white" : "text-black"} md:hidden p-2 rounded-xl hover:bg-foreground/[0.04] transition-colors`}
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-5 ${!scrolled && isHomePath ? "bg-white" : "bg-foreground/70"} rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                  />
                  <span
                    className={`block h-0.5 ${!scrolled && isHomePath ? "bg-white" : "bg-foreground/70"} rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 w-0" : "w-3.5 opacity-100"}`}
                  />
                  <span
                    className={`block h-0.5 w-5 ${!scrolled && isHomePath ? "bg-white" : "bg-foreground/70"} rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Nav Panel */}
      <div
        className={`fixed top-0 bottom-0 z-40 w-[280px] bg-background shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          lang === "ar"
            ? `right-0 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`
            : `left-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-[#04462B] bg-[#04462B]/[0.06]"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
            <a
              href="https://wa.me/201155111211"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#04462B] text-[#EBDB0A] py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-300 hover:bg-[#04462B]/90"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#25D366]"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.nav.order}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
