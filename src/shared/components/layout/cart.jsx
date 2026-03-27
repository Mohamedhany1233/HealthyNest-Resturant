"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../../../shared/language-provider";
import { useCartItems } from "../../contexts/CartItemsContext";
import { ShoppingBag, X, Trash2, Plus, Minus } from "lucide-react";
import {
  getIngredientById,
  customizableProducts as allCustomizableProducts,
} from "../../../features/makeYourMeal/data/customizableProducts";

const formatCartForWhatsApp = (
  cartProducts,
  lang,
  currency,
  customizableProducts = [],
) => {
  const isArabic = lang === "ar";
  const lines = [];
  const separator = "------------------------------";

  // Header
  lines.push(isArabic ? "طلب جديد -  هيلثي نيست" : "New Order - Healthy Nest");
  lines.push(separator);
  lines.push("");

  let total = 0;

  cartProducts.forEach((item, index) => {
    const itemNumber = index + 1;
    const qty = item.quantity || 1;
    const price = item.price || 0;
    const itemTotal = price * qty;
    total += itemTotal;

    const itemName = isArabic ? item.nameAr : item.nameEn;

    // Product title
    lines.push(`${itemNumber}. ${itemName}`);
    lines.push("");

    // Details
    lines.push(isArabic ? `   الكمية: ${qty}` : `   Quantity: ${qty}`);

    lines.push(
      isArabic
        ? `   سعر الوحدة: ${price} ${currency}`
        : `   Unit Price: ${price} ${currency}`,
    );

    lines.push(
      isArabic
        ? `   الإجمالي: ${itemTotal} ${currency}`
        : `   Subtotal: ${itemTotal} ${currency}`,
    );

    // Customizable details
    if (item.type === "customizable") {
      lines.push("");
      lines.push(
        isArabic ? "   تفاصيل الاختيارات:" : "   Selected Ingredients:",
      );

      const product = customizableProducts?.find(
        (p) => p.id === item.productId,
      );

      if (product && item.selections) {
        let hasAnySelection = false;

        product.groups?.forEach((group) => {
          const selectedIds = item.selections[group.id] || [];
          if (selectedIds.length === 0) return;

          hasAnySelection = true;

          const groupName = isArabic ? group.titleAr : group.titleEn;

          const options = selectedIds
            .map((id) => {
              const ing = getIngredientById(id);
              return ing ? (isArabic ? ing.nameAr : ing.nameEn) : null;
            })
            .filter(Boolean)
            .join(isArabic ? "، " : ", ");

          lines.push(`   - ${groupName}: ${options}`);
        });

        if (!hasAnySelection) {
          lines.push(
            isArabic
              ? "   - لم يتم اختيار مكونات"
              : "   - No ingredients selected",
          );
        }
      } else if (item.selections) {
        const selectionEntries = Object.entries(item.selections);

        if (selectionEntries.length === 0) {
          lines.push(
            isArabic
              ? "   - لم يتم اختيار مكونات"
              : "   - No ingredients selected",
          );
        } else {
          selectionEntries.forEach(([groupId, selectedIds]) => {
            if (!selectedIds || selectedIds.length === 0) return;

            const options = selectedIds
              .map((id) => {
                const ing = getIngredientById(id);
                return ing ? (isArabic ? ing.nameAr : ing.nameEn) : null;
              })
              .filter(Boolean)
              .join(isArabic ? "، " : ", ");

            lines.push(
              isArabic
                ? `   - مجموعة ${groupId}: ${options}`
                : `   - Group ${groupId}: ${options}`,
            );
          });
        }
      } else {
        lines.push(
          isArabic ? "   - لا توجد اختيارات" : "   - No selections found",
        );
      }
    }

    lines.push("");
    lines.push(separator);
    lines.push("");
  });

  // Total
  lines.push(isArabic ? "الإجمالي النهائي" : "Grand Total");
  lines.push(`${total} ${currency}`);
  lines.push("");

  // Footer
  lines.push(isArabic ? "شكراً لطلبك" : "Thank you for your order");

  const orderMessageSummury = encodeURIComponent(lines.join("\n"));

  return orderMessageSummury;
};

const formatCustomSelectionsForCart = (
  item,
  lang,
  customizableProducts = [],
) => {
  if (!item?.selections || !item?.productId) return [];

  const isArabic = lang === "ar";
  const sep = isArabic ? "، " : ", ";

  const product = (
    customizableProducts?.length
      ? customizableProducts
      : allCustomizableProducts
  )?.find((p) => p.id === item.productId);

  const lines = [];

  // Prefer product groups titles (best UX)
  if (product?.groups?.length) {
    let hasAny = false;

    product.groups.forEach((group) => {
      const selectedIds = item.selections[group.id] || [];
      if (!selectedIds.length) return;

      hasAny = true;

      const groupName = isArabic ? group.titleAr : group.titleEn;
      const options = selectedIds
        .map((id) => {
          const ing = getIngredientById(id);
          return ing ? (isArabic ? ing.nameAr : ing.nameEn) : null;
        })
        .filter(Boolean)
        .join(sep);

      if (options) lines.push(`${groupName}: ${options}`);
    });

    if (hasAny) return lines;
  }

  // Fallback: if product not found, still show ingredient names by groupId
  Object.entries(item.selections).forEach(([groupId, selectedIds]) => {
    if (!selectedIds || selectedIds.length === 0) return;

    const options = selectedIds
      .map((id) => {
        const ing = getIngredientById(id);
        return ing ? (isArabic ? ing.nameAr : ing.nameEn) : null;
      })
      .filter(Boolean)
      .join(sep);

    if (options) {
      lines.push(
        isArabic
          ? `مجموعة ${groupId}: ${options}`
          : `Group ${groupId}: ${options}`,
      );
    }
  });

  return lines;
};

export default function CartSidebar({ customizableProducts = [] }) {
  const { lang, t } = useLanguage();
  const { cartItems, setCartItems, isOpen, setIsOpen, setOrderMessage } =
    useCartItems();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;

  // ---------- Cart Actions ----------
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    if (cartItems.length === 0) return;
    setCartItems([]);
  };

  // handling url WhatsApp Link
  useEffect(() => {
    if (cartItems.length > 0) {
      const currency = t.menu.currency;
      const message = formatCartForWhatsApp(
        cartItems,
        lang,
        currency,
        customizableProducts || [],
      );

      const url = `https://wa.me/${t.contact.phone_number}?text=${message}`;

      setOrderMessage(url);
    } else {
      setOrderMessage("");
    }
  }, [cartItems]);

  // ---------- WhatsApp Order ----------
  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);

    const currency = t.menu.currency;
    const message = formatCartForWhatsApp(
      cartItems,
      lang,
      currency,
      customizableProducts || [],
    );

    const url = `https://wa.me/${t.contact.phone_number}?text=${message}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setIsCheckingOut(false);
      setIsOpen(false);
    }, 500);
  };

  const isRTL = lang === "ar";
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Backdrop - with transition */}
      <div
        className={`
          fixed inset-0 bg-black/30 z-50
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar - always mounted, transition by transform */}
      <div
        className={`
          fixed top-0 ${isRTL ? "left-0" : "right-0"} 
          h-full w-full sm:w-96 md:w-100 lg:w-112
          bg-white shadow-xl z-50 
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : isRTL
                ? "-translate-x-full"
                : "translate-x-full"
          }
        `}
      >
        {/* ---------- Header ---------- */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-[#04462B]" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#64BB36] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {isRTL ? "سلتك" : "Your Cart"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label={isRTL ? "تفريغ السلة" : "Clear cart"}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={isRTL ? "إغلاق" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ---------- Cart Items ---------- */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isRTL ? "سلتك فاضية" : "Your cart is empty"}
              </h3>
              <p className="text-sm text-gray-500 mb-6 max-w-xs">
                {isRTL
                  ? "أضف وجبات لذيذة من القائمة وارجع تاني"
                  : "Add delicious meals from our menu and come back"}
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-[#04462B] text-white text-sm font-medium rounded-lg hover:bg-[#0A5D38] transition-colors"
              >
                {isRTL ? "تصفح المنيو" : "Browse Menu"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const customLines =
                  item.type === "customizable"
                    ? formatCustomSelectionsForCart(
                        item,
                        lang,
                        customizableProducts,
                      )
                    : [];

                return (
                  <div
                    key={item.id}
                    className="flex gap-3 py-3 border-b border-gray-100 last:border-0"
                  >
                    {/* Product image */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={isRTL ? item.nameAr : item.nameEn}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {isRTL ? item.nameAr : item.nameEn}
                          </h4>

                          {item.type === "customizable" && (
                            <>
                              <span className="inline-block mt-1 px-2 py-0.5 bg-[#64BB36]/10 text-[#04462B] text-xs rounded-full">
                                {isRTL ? "مخصص" : "Custom"}
                              </span>

                              {/* ✅ NEW: selections under name */}
                              {customLines.length > 0 ? (
                                <div className="mt-2 space-y-1">
                                  {customLines.map((line, idx) => (
                                    <p
                                      key={idx}
                                      className="text-[12px] text-gray-500 leading-relaxed line-clamp-2"
                                    >
                                      • {line}
                                    </p>
                                  ))}
                                </div>
                              ) : (
                                <p className="mt-2 text-[12px] text-gray-400 italic">
                                  {isRTL ? "لا توجد اختيارات" : "No selections"}
                                </p>
                              )}
                            </>
                          )}
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                          aria-label={isRTL ? "حذف" : "Remove"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price and quantity */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                            aria-label={isRTL ? "إنقاص" : "Decrease"}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                            aria-label={isRTL ? "زيادة" : "Increase"}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-[#04462B]">
                            {item.price * item.quantity}
                          </span>
                          <span className="text-xs text-gray-500 mr-1">
                            {t.menu.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ---------- Footer - Checkout ---------- */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/50">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="text-gray-600">
                {isRTL ? "المجموع الفرعي" : "Subtotal"}
              </span>
              <span className="font-medium text-gray-900">
                {subtotal} {t.menu?.currency}
              </span>
            </div>

            {/* Delivery fee */}
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="text-gray-600">
                {isRTL ? "التوصيل" : "Delivery"}
              </span>
              <span className="font-medium text-gray-900">
                {deliveryFee} {t.menu.currency}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="text-base font-semibold text-gray-900">
                {isRTL ? "الإجمالي" : "Total"}
              </span>
              <div className="text-right">
                <span className="text-xl font-bold text-[#04462B]">
                  {total}
                </span>
                <span className="text-sm text-gray-500 mr-1">
                  {t.menu.currency}
                </span>
              </div>
            </div>

            {/* WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppOrder}
              disabled={isCheckingOut}
              className={`
                w-full mt-5 py-3.5 px-4 rounded-lg font-medium text-white
                flex items-center justify-center gap-2
                transition-all duration-200
                ${
                  isCheckingOut
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#25D366] hover:bg-[#128C7E]"
                }
              `}
            >
              {isCheckingOut ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isRTL ? "جاري التجهيز..." : "Processing..."}</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 14.06 2.84 16.07 4.05 17.7L2.05 22L6.52 20.1C8.1 21.1 9.93 21.68 11.96 21.68C17.42 21.68 21.88 17.22 21.88 11.76C21.88 6.3 17.5 2 12.04 2ZM12.04 20.15C10.2 20.15 8.4 19.59 6.9 18.58L6.56 18.36L4.02 19.33L5 16.88L4.76 16.54C3.6 14.94 3 13.05 3 11.11C3 6.55 6.7 2.85 12.04 2.85C17.38 2.85 21.08 6.55 21.08 11.91C21.08 17.27 17.42 20.15 12.04 20.15Z" />
                  </svg>
                  <span>
                    {isRTL
                      ? "أكد الطلب عبر واتساب"
                      : "Confirm Order via WhatsApp"}
                  </span>
                </>
              )}
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              {isRTL
                ? "سيتم تحويلك إلى واتساب لإتمام الطلب"
                : "You'll be redirected to WhatsApp to complete your order"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
