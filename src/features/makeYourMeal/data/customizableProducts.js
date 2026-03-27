// ==================================================
// INGREDIENTS – fixed + matching images (Pexels CDN)
// ==================================================

const img200 = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop`;

const img600x400 = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`;

export const ingredients = {
  breads: [
    {
      id: "white",
      nameEn: "White",
      nameAr: "أبيض",
      price: 0,
      image: img200("1775043"),
    },
    {
      id: "whole-wheat",
      nameEn: "Whole Wheat",
      nameAr: "قمح كامل",
      price: 2,
      image: img200("166021"),
    },
    {
      id: "sourdough",
      nameEn: "Sourdough",
      nameAr: "خبز حامض",
      price: 3,
      image: img200("30785702"),
    },
  ],

  proteins: [
    {
      id: "chicken",
      nameEn: "Grilled Chicken",
      nameAr: "دجاج مشوي",
      price: 15,
      image: img200("34138804"),
    },
    {
      id: "beef",
      nameEn: "Lean Beef",
      nameAr: "لحم بقري",
      price: 18,
      image: img200("112781"),
    },
    {
      id: "falafel",
      nameEn: "Falafel",
      nameAr: "فلافل",
      price: 10,
      image: img200("6275189"),
    },
    {
      id: "tuna",
      nameEn: "Tuna",
      nameAr: "تونة",
      price: 14,
      image: img200("12001951"),
    },
  ],

  veggies: [
    {
      id: "lettuce",
      nameEn: "Lettuce",
      nameAr: "خس",
      price: 0,
      image: img200("5589058"), // lettuce close-up :contentReference[oaicite:8]{index=8}
    },
    {
      id: "tomato",
      nameEn: "Tomato",
      nameAr: "طماطم",
      price: 0,
      image: img200("1391489"), // tomatoes on vine :contentReference[oaicite:9]{index=9}
    },
    {
      id: "cucumber",
      nameEn: "Cucumber",
      nameAr: "خيار",
      price: 0,
      image: img200("2329440"), // cucumber pile :contentReference[oaicite:10]{index=10}
    },
    {
      id: "onion",
      nameEn: "Onion",
      nameAr: "بصل",
      price: 0,
      image: img200("7890164"), // red onion on white surface :contentReference[oaicite:11]{index=11}
    },
    {
      id: "avocado",
      nameEn: "Avocado",
      nameAr: "أفوكادو",
      price: 5,
      image: img200("557659"), // sliced avocado :contentReference[oaicite:12]{index=12}
    },
    {
      id: "carrot",
      nameEn: "Carrot",
      nameAr: "جزر",
      price: 0,
      image: img200("1306559"), // carrots close-up :contentReference[oaicite:13]{index=13}
    },
  ],

  sauces: [
    {
      id: "mayo",
      nameEn: "Mayonnaise",
      nameAr: "مايونيز",
      price: 0,
      image: img200("15302582"), // mayonnaise in jar :contentReference[oaicite:14]{index=14}
    },
    {
      id: "ketchup",
      nameEn: "Ketchup",
      nameAr: "كاتشب",
      price: 0,
      image: img200("10519486"), // ketchup in bowl :contentReference[oaicite:15]{index=15}
    },
    {
      id: "mustard",
      nameEn: "Mustard",
      nameAr: "خردل",
      price: 0,
      image: img200("4728847"), // mustard sauce in bowl :contentReference[oaicite:16]{index=16}
    },
    {
      id: "garlic",
      nameEn: "Garlic Sauce",
      nameAr: "صلصة ثوم",
      price: 2,
      image: img200("28585431"), // garlic sauce bottle :contentReference[oaicite:17]{index=17}
    },
    {
      id: "bbq",
      nameEn: "BBQ Sauce",
      nameAr: "صلصة باربكيو",
      price: 2,
      image: img200("30682735"), // BBQ bottle among sauces :contentReference[oaicite:18]{index=18}
    },
    {
      id: "vinaigrette",
      nameEn: "Vinaigrette",
      nameAr: "خلية",
      price: 0,
      image: img200("9213857"), // salad dressing being poured :contentReference[oaicite:19]{index=19}
    },
  ],

  extras: [
    {
      id: "cheese",
      nameEn: "Cheese",
      nameAr: "جبنة",
      price: 5,
      image: img200("15754940"), // cheddar slices stack :contentReference[oaicite:20]{index=20}
    },
    {
      id: "egg",
      nameEn: "Egg",
      nameAr: "بيض",
      price: 4,
      image: img200("722223"), // fried egg in pan :contentReference[oaicite:21]{index=21}
    },
    {
      id: "bacon",
      nameEn: "Turkey Bacon",
      nameAr: "بيكون ديك رومي",
      price: 6,
      image: img200("4110366"), // bacon strips (best available generic) :contentReference[oaicite:22]{index=22}
    },
    {
      id: "nuts",
      nameEn: "Walnuts",
      nameAr: "جوز",
      price: 6,
      image: img200("3904510"), // walnuts :contentReference[oaicite:23]{index=23}
    },
  ],
};

// ---------- LOOKUP HELPER ----------
export const getIngredientById = (id) => {
  for (const cat of Object.values(ingredients)) {
    const found = cat.find((i) => i.id === id);
    if (found) return found;
  }
  return null;
};

// ---------- CUSTOMIZABLE PRODUCTS ----------
export const customizableProducts = [
  {
    id: "custom-sandwich",
    type: "sandwich",
    nameEn: "Build Your Sandwich",
    nameAr: "اصنع ساندويتشك",
    descEn:
      "Start with our fresh bread, pick your protein, then load it with veggies, sauces and extras.",
    descAr:
      "ابدأ بخبزنا الطازج، اختر البروتين، ثم أضف الخضار، الصلصات والإضافات.",
    basePrice: 25,
    image: img600x400("133578"), // sandwich close-up :contentReference[oaicite:24]{index=24}
    groups: [
      {
        id: "bread",
        titleEn: "Bread",
        titleAr: "الخبز",
        type: "single",
        required: true,
        options: ["white", "whole-wheat", "sourdough"],
      },
      {
        id: "protein",
        titleEn: "Protein",
        titleAr: "البروتين",
        type: "single",
        required: true,
        options: ["chicken", "beef", "falafel", "tuna"],
      },
      {
        id: "veggies",
        titleEn: "Veggies",
        titleAr: "الخضار",
        type: "multi",
        required: false,
        max: 3,
        options: ["lettuce", "tomato", "cucumber", "onion", "avocado"],
      },
      {
        id: "sauces",
        titleEn: "Sauces",
        titleAr: "الصلصات",
        type: "multi",
        required: false,
        max: 2,
        options: ["mayo", "ketchup", "mustard", "garlic", "bbq"],
      },
      {
        id: "extras",
        titleEn: "Extras",
        titleAr: "إضافات",
        type: "multi",
        required: false,
        max: 2,
        options: ["cheese", "egg", "bacon"],
      },
    ],
  },
  {
    id: "custom-salad",
    type: "salad",
    nameEn: "Build Your Salad",
    nameAr: "اصنع سلطتك",
    descEn:
      "Choose your protein, pile on the veggies, and finish with sauces and crunchy extras.",
    descAr: "اختر البروتين، كوِّم الخضار، وأضف الصلصات والإضافات المقرمشة.",
    basePrice: 20,
    image: img600x400("5639361"), // salad with dressing :contentReference[oaicite:25]{index=25}
    groups: [
      {
        id: "protein",
        titleEn: "Protein",
        titleAr: "البروتين",
        type: "single",
        required: true,
        options: ["chicken", "beef", "falafel", "tuna"],
      },
      {
        id: "veggies",
        titleEn: "Veggies",
        titleAr: "الخضار",
        type: "multi",
        required: false,
        max: 5,
        options: [
          "lettuce",
          "tomato",
          "cucumber",
          "onion",
          "carrot",
          "avocado",
        ],
      },
      {
        id: "sauces",
        titleEn: "Sauces",
        titleAr: "الصلصات",
        type: "multi",
        required: false,
        max: 2,
        options: ["mayo", "vinaigrette", "mustard", "garlic"],
      },
      {
        id: "extras",
        titleEn: "Extras",
        titleAr: "إضافات",
        type: "multi",
        required: false,
        max: 2,
        options: ["cheese", "egg", "nuts"],
      },
    ],
  },
];
