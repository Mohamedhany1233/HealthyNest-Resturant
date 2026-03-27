"use client";

import { createContext, useContext, useState, useCallback } from "react";

const translations = {
  ar: {
    nav: {
      home: "الرئيسية",
      menu: "المنيو",
      make_your_meal: "كون وجبتك",
      about: "من نحن",
      contact: "تواصل معانا",
      order: "اطلب دلوقتي",
    },
    hero: {
      slogan: "منيو كامل من وجبات وسندوتشات وأوبن بوفيه صحي",
      tagline: "شريكك لحياة صحية",
      subtitle:
        "نختار أجود المكونات الطازة ونحضرها بعناية فائقة، عشان تستمتع بأكل صحي ولذيذ كل يوم",
      cta_menu: "اكتشف المنيو",
      cta_whatsapp: "اطلب عبر واتساب",
      stats: {
        meals: "وجبة يومية",
        customers: "عميل سعيد",
        fresh: "مكونات طازة",
      },
    },
    marquee: [
      "شريكك لحياة صحية",
      "وجبات صحية موزونة ومتنوعة تناسب هدفك ونظامك",
    ],
    menu: {
      title: "منيو هيلثي نيست",
      subtitle: "كل وجباتنا محضرة يوميًا من مكونات طازة ومختارة بعناية",
      order: "اطلب دلوقتي",
      currency: "ج.م",
      cal: "سعرة",
      add_to_cart: "اضف الي السلة",
      quantity: "الكمية",
      total: "المجموع",
      added: "تمت الاضافة الي السلة ",
      total_menu: "مجموع المنيو",
      empty_title: "لم يتم العثور علي وجبات",
      empty_subtitle: "جرب اختيار قسم مختلف",
      protein: "بروتين",
      meal: "وجبة",
      cate: "قسم",
      categories: {
        all: "الكل",
        hero: "الوجبات الرئيسية",
        specials: "عروض خاصة",
        protein: "بروتين",
        carb: "كارب",
        vegetables: "خضار",
        wrap: "راب",
        sandwiches: "ساندوتشات",
        breakfast: "فطار",
        burger: "برجر",
        street_food: "مأكولات الشارع",
        soups: "شوربة",
        desserts: "الحلويات",
        smoothies: "سموزي",
        bakery: "مخبز",
        addons: "إضافات",
      },
      footer: "هيلثي بس تيستي 😉💚",
    },
    makeYourMeal: {
      badge: "اصنع وجبتك",
      title: "صمم وجبتك الصحية",
      subtitle: "هيلثي بس تيستي 😉💚",
      back: "العودة",
      customizeNow: "ابدأ التخصيص",
      total: "الإجمالي",
      basePrice: "السعر الأساسي",
      extras: "الإضافات",
      yourSelection: "ملخص طلبك",
      items: "عنصر",
      noExtras: "✨ اختر مكوناتك",
      addToCart: "أضف إلى السلة",
      confirmWhatsApp: "أكد الطلب عبر واتساب",
      footerTagline: "🧑‍🍳 وجبتك، بتصميمك",
      required: "مطلوب",
      max: "حد أقصى",
      maxFormat: "حد أقصى {max}",
      selectedCountFormat: " • {count}/{max}",
    },
    about: {
      title: "مين هيلثي نيست؟؟!",
      subtitle: "قصتنا",
      mission_label: "رسالتنا",
      mission:
        "نؤمن إن الأكل الصحي حق للكل. بنشتغل كل يوم عشان نقدملك وجبات متوازنة غذائيًا وبطعم استثنائي يخليك تستمتع بأكلك من غير ما تتنازل عن صحتك.",
      story:
        "Healthy Nest اتأسس بشغف حقيقي لتغيير ثقافة الأكل في مصر. بدأنا بفكرة بسيطة: إن الأكل الصحي لازم يكون لذيذ ومتاح وسهل. النهارده بنقدم لآلاف العملاء وجبات صحية يوميًا بنفس الحب والعناية.",
      p3: "هدفنا إننا نغير ثقافة الأكل ونخلي الأكل الصحي أسلوب حياة مش مجرد دايت.",
      values_title: "ليه تختار Healthy Nest Food؟",
      value1_title: "اكل طازة دايمًا",
      value1_desc: "كل المكونات طازة يوميًا ومن أجود الموردين المعتمدين",
      value2_title: "عمرك ما هتحس بالدايت",
      value2_desc:
        "بنقدملك وجبات متوازنة غذائيًا بأيد شيفات محترفين بيحبوا شغلهم ",
      value3_title: "توصيل سريع",
      value3_desc: "بنوصلك أكلك طازة في أسرع وقت وبأعلى جودة تغليف",
    },
    contact: {
      title: "تواصل معانا",
      subtitle: "عندك سؤال أو عايز تطلب؟ احنا هنا!",
      whatsapp: "كلمنا واتساب",
      phone: "اتصل بينا",
      phone_number: "201070010209",
      email: "elqoptan337@gmail.com",
      address_label: "العنوان",
      address: "مصر, الشرقية, الزقازيق ",
      hours_label: "مواعيد العمل",
      hours: "من ٩ الصبح لـ ١١ بالليل",
      social: "تابعنا",
    },
    footer: {
      rights: "جميع الحقوق محفوظة",
      tagline: "شريكك لحياة صحية",
      links_title: "روابط سريعة",
      contact_title: "تواصل",
      social_title: "تابعنا",
    },
  },
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      make_your_meal: "Make Your Meal",
      about: "About",
      contact: "Contact",
      order: "Order Now",
      cart: "Cart",
    },
    hero: {
      slogan: "Healthy menu: meals, sandwiches & buffet.",
      tagline: "Your Partner for a Healthy Life",
      subtitle:
        "We select the finest fresh ingredients and prepare them with exceptional care, so you enjoy healthy and delicious food every day",
      cta_menu: "Explore Menu",
      cta_whatsapp: "Order via WhatsApp",
      stats: {
        meals: "Daily Meals",
        customers: "Happy Clients",
        fresh: "Fresh Ingredients",
      },
    },
    marquee: [
      "Your Partner for a Healthy Life",
      "Healthy, balanced, and varied meals that suit your goal and diet",
    ],
    menu: {
      title: "Healthy Nest Menu",
      subtitle:
        "Every meal is freshly prepared daily from handpicked, premium ingredients",
      order: "Order Now",
      currency: "EGP",
      cal: "cal",
      add_to_cart: "Add To Cart",
      quantity: "QUANTITY",
      total: "TOTAL",
      added: "Added To Cart",
      empty_title: "No meals were found",
      total_menu: "Total menu",
      empty_subtitle: "Try choosing a different section",
      protein: "Protein",
      meal: "Meal",
      cate: "Category",
      categories: {
        all: "All",
        hero: "Hero Meals",
        specials: "Specials",
        protein: "Protein",
        carb: "Carb",
        vegetables: "Vegetables",
        wrap: "Wrap",
        sandwiches: "Sandwiches",
        breakfast: "Breakfast",
        burger: "Burger",
        street_food: "Street Food",
        soups: "Soups",
        desserts: "Desserts",
        smoothies: "Smoothies",
        bakery: "Bakery",
        addons: "Addons",
      },
      footer: "Healthy But Tasty 😉💚",
    },
    makeYourMeal: {
      badge: "MAKE YOUR MEAL",
      title: "Design Your Healthy Meal",
      subtitle: "Healthy but tasty 😉💚",
      back: "Back",
      customizeNow: "Customize now",
      total: "Total",
      basePrice: "Base price",
      extras: "Extras",
      yourSelection: "Your selection",
      items: "items",
      noExtras: "✨ Select your ingredients",
      addToCart: "Add to Cart",
      confirmWhatsApp: "Confirm Order via WhatsApp",
      footerTagline: "🧑‍🍳 Your meal, your design",
      required: "Required",
      max: "Max",
      maxFormat: "Max {max}",
      selectedCountFormat: " • {count}/{max}",
    },
    about: {
      title: "About Us",
      subtitle: "Our Story",
      mission_label: "Our Mission",
      mission:
        "We believe healthy food is a right for everyone. We work every day to deliver nutritionally balanced meals with exceptional taste, so you enjoy your food without compromising your health.",
      story:
        "Healthy Nest was founded with a genuine passion to change food culture in Egypt. We started with a simple idea: healthy food should be delicious, accessible, and easy. Today, we serve thousands of customers daily with the same love and care.",
      p3: "Our goal is to make healthy eating a lifestyle, not just a diet.",
      values_title: "Why Choose Healthy Nest?",
      value1_title: "Always Fresh",
      value1_desc:
        "All ingredients are sourced daily from certified premium suppliers",
      value2_title: "You’ll never feel like you’re on a diet.",
      value2_desc:
        "Nutritionally balanced meals crafted by professional chefs who love their work",
      value3_title: "Fast Delivery",
      value3_desc:
        "Fresh food delivered quickly with premium packaging quality",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Have a question or want to order? We're here!",
      whatsapp: "Chat on WhatsApp",
      phone: "Call Us",
      phone_number: "201155111211",
      email: "elqoptan337@gmail.com",
      address_label: "Address",
      address: "Egypt, Sharkia, Zagazig",
      hours_label: "Working Hours",
      hours: "9 AM to 11 PM",
      social: "Follow Us",
    },
    footer: {
      rights: "All Rights Reserved",
      tagline: "Your Partner for a Healthy Life",
      links_title: "Quick Links",
      contact_title: "Contact",
      social_title: "Follow Us",
    },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ar");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
