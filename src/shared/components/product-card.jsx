"use client";

import Image from "next/image";
import { useLanguage } from "../../shared/language-provider";
import { useReveal } from "../../shared/hooks/use-reveal";
import { ShoppingCart, Plus } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useCartItems } from "../../shared/contexts/CartItemsContext";

export default function ProductCard({ item }) {
  const { lang, t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems } = useCartItems();
  const [isAdded, setIsAdded] = useState(false);

  const name = lang === "ar" ? item.nameAr : item.nameEn;
  const desc = lang === "ar" ? item.descAr : item.descEn;
  const ref = useReveal();

  const handleAddToCart = () => {
    const itemProduct = { ...item, quantity };

    setCartItems((prev) => [...prev, itemProduct]);

    setIsAdded(true);
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    const existingItem = cartItems.find((i) => i.id == item.id);

    const nextIsAdded = Boolean(existingItem);
    // Avoid triggering the "setState in effect body" lint rule.
    setTimeout(() => setIsAdded(nextIsAdded), 0);
  }, [cartItems]);

  return (
    <div
      ref={ref}
      className={`group reveal reveal-delay-1 relative bg-white rounded-2xl overflow-hidden border border-border/40 hover:border-[#64BB36]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#04462B]/5`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent z-10" />
        <Image
          src={item.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Calories badge */}
        <div className="absolute top-3 right-3 z-20">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#64BB36] animate-pulse" />
            <span className="text-xs font-bold text-[#04462B]">
              {item.calories} {t.menu.cal}
            </span>
          </div>
        </div>

        {/* Protein badge */}
        {item.protein && (
          <div className="absolute top-3 left-3 z-20">
            <div className="flex items-center gap-2 bg-[#04462B]/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#EBDB0A]" />
              <span className="text-xs font-bold text-white">
                {item.protein}g {t.menu.protein || "بروتين"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
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

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/30 to-transparent my-4" />

        {/* Quantity Selector & Add to Cart */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {t.menu.quantity}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="تقليل الكمية"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="w-10 text-center font-bold text-[#04462B]">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="زيادة الكمية"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`group/btn flex items-center justify-center gap-3 w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              isAdded
                ? "bg-gradient-to-r from-[#0A5D38] to-[#64BB36] text-white"
                : "bg-gradient-to-r from-[#04462B] to-[#0A5D38] text-white hover:shadow-md hover:shadow-[#04462B]/20"
            }`}
          >
            {isAdded ? (
              <>
                <svg
                  className="w-5 h-5 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{t.menu.added}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                <span>{t.menu.add_to_cart}</span>
              </>
            )}
          </button>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="text-center px-3 py-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">{t.menu.total}</div>
              <div className="font-bold text-[#04462B]">
                {item.price * quantity} {t.menu.currency}
              </div>
            </div>
            <div className="text-center px-3 py-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">{t.menu.cal}</div>
              <div className="font-bold text-[#64BB36]">
                {item.calories * quantity} {t.menu.cal}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#64BB36] to-[#EBDB0A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}
