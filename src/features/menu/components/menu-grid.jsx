"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "../../../shared/language-provider";
import ProductCard from "../../../shared/components/product-card";
import { Filter, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "../data/menu-data";

export default function MenuGrid() {
  const { t, lang } = useLanguage();
  const [categoriesKeys, setCategoriesKeys] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const dropdown = {
    hidden: { height: 0, opacity: 0 },
    show: { height: "auto", opacity: 1, transition: { duration: 0.22, ease } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.18, ease } },
  };

  // Filter items by category
  const categoryFilteredItems =
    activeCategory === "All" ||
    activeCategory === "الكل" ||
    activeCategory === ""
      ? menuItems
      : menuItems.filter(
          (item) =>
            item.category === activeCategory ||
            item.categoryAr === activeCategory,
        );

  // Filter items by search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return categoryFilteredItems;

    const query = searchQuery.toLowerCase().trim();

    return categoryFilteredItems.filter((item) => {
      // Search in English fields
      if (lang === "en") {
        return (
          (item.name && item.name.toLowerCase().includes(query)) ||
          (item.description &&
            item.description.toLowerCase().includes(query)) ||
          (item.category && item.category.toLowerCase().includes(query))
        );
      }

      // Search in Arabic fields
      if (lang === "ar") {
        return (
          (item.nameAr && item.nameAr.includes(query)) ||
          (item.descriptionAr && item.descriptionAr.includes(query)) ||
          (item.categoryAr && item.categoryAr.includes(query))
        );
      }

      return false;
    });
  }, [categoryFilteredItems, searchQuery, lang]);

  useEffect(() => {
    if (showMobileFilters) setShowMobileFilters(false);
  }, [activeCategory]);

  const categories = t.menu.categories;

  useEffect(() => {
    if (lang === "ar") {
      setActiveCategory("الكل");
      setSelectedCategory("all");
    } else {
      setActiveCategory("All");
      setSelectedCategory("all");
    }
    setSearchQuery("");
  }, [lang]);

  useEffect(() => {
    setCategoriesKeys(Object.keys(categories));
  }, [categories]);

  const handleSearchChange = (e) => {
    if (searchQuery.length < 32) setSearchQuery(e.target.value);
  };

  const clearSearch = () => setSearchQuery("");

  const gridKey = `${lang}-${activeCategory}-${searchQuery}`;

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-gray-50">
      <div className="md:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-10 sm:mb-16"
        >
          <motion.div
            variants={fadeDown}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-10 h-1 bg-gradient-to-r from-transparent to-[#64BB36]" />
            <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#64BB36]">
              {t.hero.slogan}
            </span>
            <div className="w-10 h-1 bg-gradient-to-r from-[#64BB36] to-transparent" />
          </motion.div>

          <motion.h1
            variants={fadeDown}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-[#04462B] to-[#0A5D38] bg-clip-text text-transparent">
              {t.menu.title}
            </span>
            <motion.span
              variants={fadeDown}
              className="block text-xl sm:text-2xl font-normal text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              {t.menu.subtitle}
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            id="menu-categories"
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <motion.div
              variants={fadeDown}
              className="sticky top-24 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <Filter className="w-5 h-5 text-[#04462B]" />
                <h2 className="text-xl font-bold text-gray-900">
                  {lang === "ar" ? "جميع الاقسام" : "All Categories"}
                </h2>
                <span className="ml-auto text-sm font-medium bg-[#04462B]/10 text-[#04462B] px-3 py-1 rounded-full">
                  {categoriesKeys.length}
                </span>
              </div>

              {/* Search in Sidebar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={
                      lang === "ar" ? "ابحث عن وجبة..." : "Search for a meal..."
                    }
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-3 pl-10 pr-10 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64BB36] focus:border-transparent text-right"
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {categoriesKeys.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(categories[cat]);
                      setSelectedCategory(cat);
                    }}
                    className={`group w-full text-right px-4 py-3 rounded-xl transition-all duration-200 ${
                      categories[cat] === activeCategory
                        ? "bg-gradient-to-r from-[#04462B] to-[#0A5D38] text-white shadow-md"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {categories[cat]}
                      </span>
                      {categories[cat] === activeCategory && (
                        <div className="w-2 h-2 rounded-full bg-[#EBDB0A]" />
                      )}
                    </div>
                    {categories[cat] !== activeCategory && (
                      <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-[#64BB36] to-transparent transition-all duration-300 mt-2" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-[#04462B]/5 to-[#64BB36]/5 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 text-center">
                    <span className="font-bold text-[#04462B]">
                      {menuItems.length}
                    </span>
                    {lang === "en" ? " Meal available" : " وجبة متاحة"}
                  </p>
                  {searchQuery && (
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      {lang === "ar"
                        ? `تم العثور على ${filteredItems.length} نتيجة للبحث`
                        : `Found ${filteredItems.length} search results`}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1"
          >
            {/* Mobile Search */}
            <motion.div variants={fadeDown} className="lg:hidden mb-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    lang === "ar" ? "ابحث عن وجبة..." : "Search for a meal..."
                  }
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 pl-10 pr-10 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64BB36] focus:border-transparent shadow-sm text-right"
                  dir={lang === "ar" ? "rtl" : "ltr"}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Mobile Filter Toggle */}
            <motion.div variants={fadeDown} className="lg:hidden mb-6">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="w-full bg-white border border-gray-300 rounded-xl p-4 flex items-center justify-between hover:border-[#64BB36] transition-all"
              >
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-[#04462B]" />
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 text-sm">
                      {lang === "ar" ? "تصفية حسب الفئة" : "Filter by Category"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {activeCategory}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium bg-[#04462B]/10 text-[#04462B] px-2 py-1 rounded-full">
                    {categoriesKeys.length}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      showMobileFilters ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {showMobileFilters && (
                  <motion.div
                    variants={dropdown}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="mt-3 bg-white border border-gray-300 rounded-xl p-4 shadow-lg overflow-hidden"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-80 overflow-y-auto">
                      {categoriesKeys.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(categories[cat]);
                            setSelectedCategory(cat);
                            setShowMobileFilters(false);
                          }}
                          className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                            activeCategory === t.menu.categories[cat]
                              ? "bg-[#04462B] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <span>{categories[cat]}</span>
                          {activeCategory === t.menu.categories[cat] && (
                            <div className="w-2 h-2 rounded-full bg-[#EBDB0A]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Category Header */}
            <motion.div variants={fadeDown} className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {searchQuery
                      ? lang === "ar"
                        ? `نتائج البحث عن: "${searchQuery}"`
                        : `Search Results for: "${searchQuery}"`
                      : categories[selectedCategory]}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {filteredItems.length}{" "}
                    {lang === "en" ? "Meal available" : "وجبة متاحة"}
                    {searchQuery && (
                      <span className="text-sm text-gray-500">
                        {lang === "ar" ? " في البحث" : " in search"}
                      </span>
                    )}
                  </p>
                </div>

                {/* Desktop Search */}
                <div className="hidden lg:block w-80">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={
                        lang === "ar"
                          ? "ابحث عن وجبة..."
                          : "Search for a meal..."
                      }
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full px-4 py-3 pl-10 pr-10 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#64BB36] focus:border-transparent shadow-sm"
                      dir={lang === "ar" ? "rtl" : "ltr"}
                    />
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#64BB36] to-[#04462B] rounded-full"
                  initial={false}
                  animate={{
                    width: `${(filteredItems.length / menuItems.length) * 100}%`,
                  }}
                  transition={{ duration: 0.35, ease }}
                />
              </div>
            </motion.div>

            {/* Products Grid (stagger + fadeDown) */}
            <AnimatePresence mode="wait" initial={false}>
              {filteredItems.length > 0 ? (
                <motion.div
                  key={gridKey}
                  variants={container}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                >
                  {filteredItems.map((item) => (
                    <motion.div key={item.id} variants={fadeDown}>
                      <ProductCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={`empty-${gridKey}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="text-center py-20 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border-2 border-dashed border-gray-300"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#04462B]/10 to-[#64BB36]/10">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-[#04462B]"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {searchQuery
                        ? lang === "ar"
                          ? "لا توجد نتائج للبحث"
                          : "No search results found"
                        : t.menu.empty_title}
                    </h3>

                    <p className="text-gray-600 mb-6">
                      {searchQuery
                        ? lang === "ar"
                          ? `لم نتمكن من العثور على أي وجبات مطابقة لـ "${searchQuery}". حاول استخدام مصطلحات بحث مختلفة.`
                          : `We couldn't find any meals matching "${searchQuery}". Try using different search terms.`
                        : t.menu.empty_subtitle}
                    </p>

                    <div className="flex gap-3 justify-center flex-wrap">
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-all"
                        >
                          {lang === "ar" ? "مسح البحث" : "Clear Search"}
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setActiveCategory(lang === "ar" ? "الكل" : "All");
                          setSelectedCategory("all");
                          setSearchQuery("");
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-[#04462B] to-[#0A5D38] text-white font-semibold rounded-full hover:shadow-lg transition-all"
                      >
                        {lang === "ar" ? "عرض جميع الوجبات" : "Show All Meals"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Stats */}
            <motion.div
              variants={fadeDown}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-right">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {t.menu.total_menu}
                  </h4>
                  <div className="flex items-center justify-center sm:justify-start gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#04462B]">
                        {menuItems.length}
                      </div>
                      <div className="text-sm text-gray-600">{t.menu.meal}</div>
                    </div>
                    <div className="h-8 w-px bg-gray-300" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#64BB36]">
                        {categoriesKeys.length}
                      </div>
                      <div className="text-sm text-gray-600">{t.menu.cate}</div>
                    </div>
                    <div className="h-8 w-px bg-gray-300" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#EBDB0A]">
                        16+
                      </div>
                      <div className="text-sm text-gray-600">
                        {t.menu.protein}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                  <span className="text-sm text-gray-600 font-medium">
                    {t.menu.footer}
                  </span>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
