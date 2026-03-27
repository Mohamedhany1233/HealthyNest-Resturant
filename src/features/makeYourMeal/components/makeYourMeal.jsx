"use client";

import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../../../shared/language-provider";
import {
  customizableProducts,
  getIngredientById,
} from "../../../features/makeYourMeal/data/customizableProducts";
import { useCartItems } from "../../../shared/contexts/CartItemsContext";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ---------- HELPERS ----------
const getIngredientPrice = (id) => {
  const ing = getIngredientById(id);
  return ing ? ing.price : 0;
};

const calculateTotal = (product, selections) => {
  let extra = 0;
  Object.values(selections).forEach((selectedIds) => {
    selectedIds.forEach((id) => {
      extra += getIngredientPrice(id);
    });
  });
  return product.basePrice + extra;
};

const validateSelections = (product, selections, lang, t) => {
  const errors = [];
  product.groups.forEach((group) => {
    const selected = selections[group.id] || [];
    if (group.required && selected.length === 0) {
      errors.push(
        `${lang === "ar" ? group.titleAr : group.titleEn} ${
          t.makeYourMeal.required
        }.`,
      );
    }
    if (group.type === "multi" && group.max && selected.length > group.max) {
      errors.push(
        `${lang === "ar" ? "يمكنك اختيار" : "You can select at most"} ${
          group.max
        } ${lang === "ar" ? "من" : "from"} ${
          lang === "ar" ? group.titleAr : group.titleEn
        }.`,
      );
    }
  });
  return errors;
};

// NEW: normalize selections + signature (to detect duplicates in cart)
const normalizeSelections = (selections) => {
  const sortedKeys = Object.keys(selections || {}).sort();
  const normalized = {};
  for (const k of sortedKeys) {
    const arr = Array.isArray(selections[k]) ? selections[k] : [];
    normalized[k] = [...arr].sort();
  }
  return normalized;
};

const selectionsSignature = (productId, selections) => {
  return JSON.stringify({
    productId,
    selections: normalizeSelections(selections),
  });
};

export default function MakeYourMeal() {
  const { lang, t } = useLanguage();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selections, setSelections] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
  const { cartItems, setCartItems, setIsOpen } = useCartItems();
  const [added, setAdded] = useState(false);

  const ease = [0.22, 1, 0.36, 1];

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const fadeDown = {
    hidden: { opacity: 0, y: -14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  };

  const fadeDownFast = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.32, ease } },
  };

  const selectedProduct = useMemo(
    () => customizableProducts.find((p) => p.id === selectedProductId) || null,
    [selectedProductId],
  );

  useEffect(() => {
    if (selectedProduct) {
      const initial = {};
      selectedProduct.groups.forEach((group) => {
        initial[group.id] = [];
      });
      setSelections(initial);
      setValidationErrors([]);
      setAdded(false);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (!selectedProduct) return;
    const errors = validateSelections(selectedProduct, selections, lang, t);
    setValidationErrors(errors);
  }, [selectedProduct, selections, lang, t]);

  const totalPrice = useMemo(() => {
    if (!selectedProduct) return 0;
    return calculateTotal(selectedProduct, selections);
  }, [selectedProduct, selections]);

  //  NEW: current signature + already in cart check
  const currentSig = useMemo(() => {
    if (!selectedProduct) return "";
    return selectionsSignature(selectedProduct.id, selections);
  }, [selectedProduct, selections]);

  const alreadyInCart = useMemo(() => {
    if (!selectedProduct) return false;
    return cartItems.some((item) => {
      if (item.type !== "customizable") return false;
      if (item.productId !== selectedProduct.id) return false;
      const itemSig = selectionsSignature(item.productId, item.selections);
      return itemSig === currentSig;
    });
  }, [cartItems, selectedProduct, currentSig]);

  // optional: keep "added" in sync (not required, but harmless)
  useEffect(() => {
    setAdded(alreadyInCart);
  }, [alreadyInCart]);

  // ---------- Handlers ----------
  const handleSingleSelect = (groupId, optionId) => {
    setSelections((prev) => ({ ...prev, [groupId]: [optionId] }));
  };

  const handleMultiSelect = (groupId, optionId, checked) => {
    setSelections((prev) => {
      const current = prev[groupId] || [];
      if (checked) {
        const group = selectedProduct.groups.find((g) => g.id === groupId);
        if (group.max && current.length >= group.max) {
          alert(
            lang === "ar"
              ? `⚠️ يمكنك اختيار ${group.max} كحد أقصى`
              : `⚠️ You can select at most ${group.max}`,
          );
          return prev;
        }
        return { ...prev, [groupId]: [...current, optionId] };
      } else {
        return { ...prev, [groupId]: current.filter((id) => id !== optionId) };
      }
    });
  };

  const isSelected = (groupId, optionId) =>
    (selections[groupId] || []).includes(optionId);

  const resetSelection = () => {
    setSelectedProductId(null);
    setSelections({});
    setAdded(false);
  };

  // ---------- Real Add to Cart ----------
  const handleAddToCart = () => {
    if (validationErrors.length > 0) {
      alert(
        lang === "ar"
          ? "⚠️ من فضلك أكمل جميع الحقول المطلوبة"
          : "⚠️ Please complete all required fields",
      );
      return;
    }

    // ✅ prevent duplicate same selections
    if (alreadyInCart) return;

    const cartItem = {
      id: `${selectedProduct.id}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`,
      productId: selectedProduct.id,
      type: "customizable",
      nameEn: selectedProduct.nameEn,
      nameAr: selectedProduct.nameAr,
      basePrice: selectedProduct.basePrice,
      price: totalPrice,
      quantity: 1,
      image: selectedProduct.image,
      selections: selections,
    };

    setCartItems((prev) => [...prev, cartItem]);
    setIsOpen(true);
    setAdded(true);
  };

  // ---------- WhatsApp ----------
  const formatWhatsAppMessage = () => {
    if (!selectedProduct) return "";

    const isArabic = lang === "ar";
    const lines = [];

    lines.push(
      isArabic ? "طلب وجبة مخصصة - لايت فود" : "Custom Meal Order - Lite Food",
    );
    lines.push("");

    lines.push(
      isArabic
        ? `الوجبة: ${selectedProduct.nameAr}`
        : `Meal: ${selectedProduct.nameEn}`,
    );

    lines.push(
      isArabic
        ? `السعر الأساسي: ${selectedProduct.basePrice} ${t.menu.currency}`
        : `Base price: ${selectedProduct.basePrice} ${t.menu.currency}`,
    );

    lines.push("");
    lines.push(isArabic ? "المكونات:" : "Ingredients:");

    selectedProduct.groups.forEach((group) => {
      const selectedIds = selections[group.id] || [];
      if (selectedIds.length === 0) return;

      const groupName = isArabic ? group.titleAr : group.titleEn;
      const options = selectedIds
        .map((id) => {
          const ing = getIngredientById(id);
          return ing ? (isArabic ? ing.nameAr : ing.nameEn) : "";
        })
        .join("، ");

      lines.push(`   ${groupName}: ${options}`);
    });

    lines.push("");
    lines.push(isArabic ? "الإجمالي:" : "Total:");
    lines.push(`${totalPrice} ${t.menu.currency}`);
    lines.push("");
    lines.push(isArabic ? "شكراً لطلبك" : "Thank you for your order");

    return encodeURIComponent(lines.join("\n"));
  };

  const handleWhatsAppOrder = () => {
    if (validationErrors.length > 0) {
      alert(
        lang === "ar"
          ? "⚠️ من فضلك أكمل جميع الحقول المطلوبة"
          : "⚠️ Please complete all required fields",
      );
      return;
    }

    const message = formatWhatsAppMessage();
    const url = `https://wa.me/${t.contact.phone_number}?text=${message}`;
    window.open(url, "_blank");
  };

  const formatSummary = () => {
    if (!selectedProduct) return [];
    const lines = [];
    selectedProduct.groups.forEach((group) => {
      const selectedIds = selections[group.id] || [];
      if (selectedIds.length === 0) return;
      const groupName = lang === "ar" ? group.titleAr : group.titleEn;
      const names = selectedIds
        .map((id) => {
          const ing = getIngredientById(id);
          return ing ? (lang === "ar" ? ing.nameAr : ing.nameEn) : "";
        })
        .join("، ");
      lines.push(`• ${groupName}: ${names}`);
    });
    return lines;
  };

  const viewKey = selectedProduct ? `view-${selectedProduct.id}` : "view-list";

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div
            variants={fadeDown}
            className="inline-flex items-center gap-2 sm:gap-3 mb-3"
          >
            <div className="w-8 sm:w-10 h-1 bg-gradient-to-r from-transparent to-[#64BB36] rounded-full" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#64BB36]">
              {t.makeYourMeal.badge}
            </span>
            <div className="w-8 sm:w-10 h-1 bg-gradient-to-r from-[#64BB36] to-transparent rounded-full" />
          </motion.div>

          <motion.h1
            variants={fadeDown}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 px-2"
          >
            <span className="bg-gradient-to-r from-[#04462B] to-[#0A5D38] bg-clip-text text-transparent">
              {t.makeYourMeal.title}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeDown}
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4"
          >
            {t.makeYourMeal.subtitle}
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait" initial={false}>
          {/* ============ LIST VIEW ============ */}
          {!selectedProduct ? (
            <motion.div
              key={viewKey}
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.35, ease },
              }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.2, ease } }}
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-5xl mx-auto"
              >
                {customizableProducts.map((product) => (
                  <motion.button
                    type="button"
                    key={product.id}
                    variants={fadeDown}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.18, ease }}
                    onClick={() => setSelectedProductId(product.id)}
                    className="text-left group relative bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#64BB36]/40"
                  >
                    <div className="relative h-44 sm:h-52 lg:h-64 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.image})` }}
                        initial={false}
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.5, ease }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                        <span className="text-base sm:text-lg font-bold text-[#04462B]">
                          {product.basePrice} {t.menu.currency}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                        <span className="text-xl sm:text-2xl">
                          {product.type === "sandwich" ? "🥪" : "🥗"}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-gray-800">
                          {lang === "ar"
                            ? product.nameAr.split(" ").slice(0, 2).join(" ")
                            : product.nameEn.split(" ").slice(0, 2).join(" ")}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 lg:p-6">
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                        {lang === "ar" ? product.nameAr : product.nameEn}
                      </h2>

                      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                        {lang === "ar" ? product.descAr : product.descEn}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-base text-[#64BB36] font-medium group-hover:underline underline-offset-4 transition-all">
                          {t.makeYourMeal.customizeNow} →
                        </span>

                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#64BB36]/10 flex items-center justify-center group-hover:bg-[#64BB36] transition-colors">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-[#04462B] group-hover:text-white transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            /* ============ CUSTOMIZE VIEW ============ */
            <motion.div
              key={viewKey}
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.35, ease },
              }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.2, ease } }}
              className="max-w-7xl mx-auto"
            >
              {/* Top Bar */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex items-center justify-between gap-3 mb-6 sm:mb-8"
              >
                <motion.button
                  variants={fadeDown}
                  onClick={resetSelection}
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all shadow-sm"
                  aria-label={t.makeYourMeal.back}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </motion.button>

                <motion.h2
                  variants={fadeDown}
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 bg-gradient-to-r from-[#04462B] to-[#0A5D38] bg-clip-text text-transparent truncate max-w-[60%] px-2"
                >
                  {lang === "ar"
                    ? selectedProduct.nameAr
                    : selectedProduct.nameEn}
                </motion.h2>

                <div className="w-10 h-10 sm:w-12 sm:h-12 invisible" />
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* ========== INGREDIENT GROUPS ========== */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="lg:col-span-2 space-y-5 sm:space-y-6"
                >
                  {selectedProduct.groups.map((group) => {
                    const selectedCount = selections[group.id]?.length || 0;
                    const hasError = validationErrors.some(
                      (err) =>
                        err.includes(group.titleEn) ||
                        err.includes(group.titleAr),
                    );

                    return (
                      <motion.div
                        key={group.id}
                        variants={fadeDown}
                        id={`group-${group.id}`}
                        className={`
                          bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border transition-all
                          ${
                            hasError
                              ? "border-red-200 bg-red-50/30"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                          }
                        `}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                              {lang === "ar" ? group.titleAr : group.titleEn}
                            </h3>
                            {group.required && (
                              <span
                                className={`
                                  px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full
                                  ${
                                    hasError
                                      ? "bg-red-100 text-red-700"
                                      : "bg-red-50 text-red-600"
                                  }
                                `}
                              >
                                {t.makeYourMeal.required}
                              </span>
                            )}
                          </div>

                          {group.type === "multi" && group.max && (
                            <span className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                              {t.makeYourMeal.maxFormat.replace(
                                "{max}",
                                group.max,
                              )}
                              {selectedCount > 0 &&
                                t.makeYourMeal.selectedCountFormat
                                  .replace("{count}", selectedCount)
                                  .replace("{max}", group.max)}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                          {group.options.map((optionId) => {
                            const ingredient = getIngredientById(optionId);
                            if (!ingredient) return null;
                            const selected = isSelected(group.id, optionId);
                            const isDisabled =
                              group.type === "multi" &&
                              group.max &&
                              selectedCount >= group.max &&
                              !selected;

                            return (
                              <label
                                key={optionId}
                                className={`
                                  relative flex flex-col items-center text-center p-3
                                  rounded-xl border-2 transition-all duration-200
                                  ${
                                    selected
                                      ? "border-[#64BB36] bg-[#64BB36]/5"
                                      : "border-gray-200 bg-white hover:border-gray-300"
                                  }
                                  ${
                                    isDisabled
                                      ? "opacity-40 cursor-not-allowed"
                                      : "cursor-pointer hover:shadow-md"
                                  }
                                `}
                              >
                                <input
                                  type={
                                    group.type === "single"
                                      ? "radio"
                                      : "checkbox"
                                  }
                                  name={group.id}
                                  value={optionId}
                                  checked={selected}
                                  onChange={(e) =>
                                    group.type === "single"
                                      ? handleSingleSelect(group.id, optionId)
                                      : handleMultiSelect(
                                          group.id,
                                          optionId,
                                          e.target.checked,
                                        )
                                  }
                                  disabled={isDisabled}
                                  className="sr-only"
                                />

                                <div className="relative mb-2">
                                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-[3px] border-white shadow-md ring-2 ring-gray-100 transition-all duration-300 group-hover:ring-[#64BB36]/30">
                                    <img
                                      src={ingredient.image}
                                      alt={
                                        lang === "ar"
                                          ? ingredient.nameAr
                                          : ingredient.nameEn
                                      }
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                      loading="lazy"
                                    />
                                  </div>

                                  {selected && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#64BB36] flex items-center justify-center shadow-md">
                                      <svg
                                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={3}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </div>

                                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate w-full">
                                  {lang === "ar"
                                    ? ingredient.nameAr
                                    : ingredient.nameEn}
                                </p>

                                {ingredient.price > 0 && (
                                  <p className="text-[10px] sm:text-xs text-[#64BB36] font-semibold mt-0.5">
                                    +{ingredient.price} {t.menu.currency}
                                  </p>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* ========== SUMMARY & BUTTONS ========== */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="lg:col-span-1"
                >
                  <motion.div
                    variants={fadeDown}
                    className="sticky top-24 bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-lg"
                  >
                    <div className="mb-5 text-center">
                      <span className="text-xs uppercase tracking-wider text-gray-500">
                        {t.makeYourMeal.total}
                      </span>
                      <div className="text-2xl sm:text-3xl font-bold text-[#04462B] mt-1">
                        {totalPrice}{" "}
                        <span className="text-base sm:text-lg font-normal">
                          {t.menu.currency}
                        </span>
                      </div>
                    </div>

                    {validationErrors.length > 0 && (
                      <motion.div
                        variants={fadeDownFast}
                        className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <h4 className="font-medium text-red-800 text-xs sm:text-sm mb-1.5 flex items-center gap-1.5">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {lang === "ar" ? "يرجى إكمال:" : "Please complete:"}
                        </h4>
                        <ul className="text-xs text-red-700 space-y-1">
                          {validationErrors.map((err, idx) => (
                            <li key={idx}>
                              <a
                                href={`#group-${err.split(" ")[0]}`}
                                className="hover:underline"
                                onClick={(e) => {
                                  e.preventDefault();
                                  const groupId = selectedProduct.groups.find(
                                    (g) =>
                                      err.includes(g.titleEn) ||
                                      err.includes(g.titleAr),
                                  )?.id;
                                  if (groupId) {
                                    document
                                      .getElementById(`group-${groupId}`)
                                      ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                      });
                                  }
                                }}
                              >
                                {err}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    <motion.div
                      variants={fadeDownFast}
                      className="bg-gray-50 rounded-lg p-4 mb-4"
                    >
                      <div className="flex justify-between text-gray-600 mb-1.5 text-xs sm:text-sm">
                        <span>{t.makeYourMeal.basePrice}</span>
                        <span className="font-medium">
                          {selectedProduct.basePrice} {t.menu.currency}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600 mb-1.5 text-xs sm:text-sm">
                        <span>{t.makeYourMeal.extras}</span>
                        <span className="font-medium">
                          +{totalPrice - selectedProduct.basePrice}{" "}
                          {t.menu.currency}
                        </span>
                      </div>
                      <div className="h-px bg-gray-200 my-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-900">
                          {t.makeYourMeal.total}
                        </span>
                        <span className="text-lg font-bold text-[#04462B]">
                          {totalPrice} {t.menu.currency}
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fadeDownFast}
                      className="bg-gradient-to-br from-[#04462B]/5 to-[#64BB36]/5 rounded-lg p-4 mb-5 border border-[#64BB36]/10"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-xs sm:text-sm">
                        <span>{t.makeYourMeal.yourSelection}</span>
                        <span className="text-[10px] bg-white text-[#04462B] px-2 py-0.5 rounded-full shadow-sm">
                          {Object.values(selections).reduce(
                            (acc, curr) => acc + curr.length,
                            0,
                          )}{" "}
                          {t.makeYourMeal.items}
                        </span>
                      </h4>

                      {formatSummary().length > 0 ? (
                        <div className="text-xs text-gray-700 space-y-1.5 max-h-40 overflow-y-auto pr-1">
                          {formatSummary().map((line, idx) => (
                            <div
                              key={idx}
                              className="bg-white/80 p-2 rounded-md border border-gray-100"
                            >
                              {line}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500 italic py-2 text-center">
                          {t.makeYourMeal.noExtras}
                        </p>
                      )}
                    </motion.div>

                    {/* UPDATED: disable if validation errors OR already in cart */}
                    <motion.button
                      className={`
                        w-full py-3.5 sm:py-4 rounded-lg font-semibold text-sm sm:text-base text-white
                        transition-all duration-200 active:scale-[0.98] mb-3
                        ${
                          validationErrors.length === 0 && !alreadyInCart
                            ? "bg-gradient-to-r from-[#04462B] to-[#0A5D38] hover:shadow-lg"
                            : "bg-gray-300 cursor-not-allowed"
                        }
                      `}
                      variants={fadeDownFast}
                      onClick={handleAddToCart}
                      disabled={validationErrors.length > 0 || alreadyInCart}
                    >
                      <p className="text-center flex justify-center gap-3">
                        <ShoppingCart />
                        {alreadyInCart
                          ? lang === "ar"
                            ? "تمت الإضافة"
                            : "Added"
                          : t.makeYourMeal.addToCart}
                      </p>
                    </motion.button>

                    <motion.button
                      variants={fadeDownFast}
                      onClick={handleWhatsAppOrder}
                      disabled={validationErrors.length > 0}
                      className={`
                        w-full py-3.5 sm:py-4 rounded-lg font-semibold text-sm sm:text-base text-white
                        transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2
                        ${
                          validationErrors.length === 0
                            ? "bg-green-600 hover:bg-green-700 hover:shadow-lg"
                            : "bg-gray-300 cursor-not-allowed"
                        }
                      `}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 14.06 2.84 16.07 4.05 17.7L2.05 22L6.52 20.1C8.1 21.1 9.93 21.68 11.96 21.68C17.42 21.68 21.88 17.22 21.88 11.76C21.88 6.3 17.5 2 12.04 2Z" />
                      </svg>
                      {t.makeYourMeal.confirmWhatsApp}
                    </motion.button>

                    <motion.p
                      variants={fadeDownFast}
                      className="text-xs text-gray-400 text-center mt-4"
                    >
                      {t.makeYourMeal.footerTagline}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
