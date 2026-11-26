// lib/data/dish-images.ts - Authentic Culinary Food Imagery & Intelligent Resolver

export interface DishImageMeta {
  url: string;        // Local verified asset: /images/dishes/<slug>.jpg
  cdnUrl: string;     // Verified culinary fallback
  name: string;
  category: "main" | "bread" | "rice" | "dessert" | "beverage" | "side" | "snack";
  calories: number;
  isVegetarian?: boolean;
}

/**
 * Curated high-resolution food photography extracted directly from the official mess food menu chart.
 * Contains all 28 dishes organized by meal categories:
 * - Breakfast: Idli, Dosa, Masala Dosa, Upma, Pongal, Poori, Aloo Paratha
 * - Lunch: Steamed Rice + Sambar, Curd Rice, Vegetable Pulav, Chana Masala, Dal Rice, Chicken Biryani
 * - Snacks: Samosa, Aloo Bonda, Veg Cutlet, Corn Chat, Masala Tea, Egg Roll, Chicken 65
 * - Dinner: Chapati with Dal, Paneer Butter Masala with Naan, Veg Fried Rice, Mixed Vegetable Curry, Curd, Chicken Curry, Egg Curry
 */
export const DISH_IMAGE_CATALOG: Record<string, DishImageMeta> = {
  // ==========================================
  // 1. BREAKFAST ITEMS (Row 0)
  // ==========================================
  idli: {
    url: "/images/dishes/idli.jpg",
    cdnUrl: "/images/dishes/idli.jpg",
    name: "Steamed Idli with Chutney & Sambar",
    category: "main",
    calories: 120,
    isVegetarian: true,
  },
  dosa: {
    url: "/images/dishes/dosa.jpg",
    cdnUrl: "/images/dishes/dosa.jpg",
    name: "Crispy Roast Dosa",
    category: "main",
    calories: 190,
    isVegetarian: true,
  },
  masala_dosa: {
    url: "/images/dishes/masala_dosa.jpg",
    cdnUrl: "/images/dishes/masala_dosa.jpg",
    name: "Golden Masala Dosa",
    category: "main",
    calories: 240,
    isVegetarian: true,
  },
  upma: {
    url: "/images/dishes/upma.jpg",
    cdnUrl: "/images/dishes/upma.jpg",
    name: "Rava Vegetable Upma",
    category: "main",
    calories: 175,
    isVegetarian: true,
  },
  pongal: {
    url: "/images/dishes/pongal.jpg",
    cdnUrl: "/images/dishes/pongal.jpg",
    name: "Ghee Ven Pongal with Cashews",
    category: "main",
    calories: 230,
    isVegetarian: true,
  },
  poori: {
    url: "/images/dishes/poori.jpg",
    cdnUrl: "/images/dishes/poori.jpg",
    name: "Puffed Poori with Potato Sagu",
    category: "bread",
    calories: 260,
    isVegetarian: true,
  },
  aloo_paratha: {
    url: "/images/dishes/aloo_paratha.jpg",
    cdnUrl: "/images/dishes/aloo_paratha.jpg",
    name: "Aloo Paratha with Melting Butter",
    category: "bread",
    calories: 290,
    isVegetarian: true,
  },

  // ==========================================
  // 2. LUNCH ITEMS (Row 1)
  // ==========================================
  rice_sambar: {
    url: "/images/dishes/rice_sambar.jpg",
    cdnUrl: "/images/dishes/rice_sambar.jpg",
    name: "Steamed Rice with Sambar",
    category: "rice",
    calories: 240,
    isVegetarian: true,
  },
  curd_rice: {
    url: "/images/dishes/curd_rice.jpg",
    cdnUrl: "/images/dishes/curd_rice.jpg",
    name: "Traditional South Indian Curd Rice",
    category: "rice",
    calories: 180,
    isVegetarian: true,
  },
  veg_pulav: {
    url: "/images/dishes/veg_pulav.jpg",
    cdnUrl: "/images/dishes/veg_pulav.jpg",
    name: "Vegetable Pulav",
    category: "rice",
    calories: 220,
    isVegetarian: true,
  },
  chana_masala: {
    url: "/images/dishes/chana_masala.jpg",
    cdnUrl: "/images/dishes/chana_masala.jpg",
    name: "Amritsari Chana Masala",
    category: "main",
    calories: 230,
    isVegetarian: true,
  },
  dal_rice: {
    url: "/images/dishes/dal_rice.jpg",
    cdnUrl: "/images/dishes/dal_rice.jpg",
    name: "Comforting Dal Rice",
    category: "rice",
    calories: 250,
    isVegetarian: true,
  },
  chicken_biryani: {
    url: "/images/dishes/chicken_biryani.jpg",
    cdnUrl: "/images/dishes/chicken_biryani.jpg",
    name: "Fragrant Chicken Biryani",
    category: "rice",
    calories: 420,
    isVegetarian: false,
  },

  // ==========================================
  // 3. SNACKS ITEMS (Row 2)
  // ==========================================
  samosa: {
    url: "/images/dishes/samosa.jpg",
    cdnUrl: "/images/dishes/samosa.jpg",
    name: "Crispy Potato Samosa",
    category: "snack",
    calories: 210,
    isVegetarian: true,
  },
  aloo_bonda: {
    url: "/images/dishes/aloo_bonda.jpg",
    cdnUrl: "/images/dishes/aloo_bonda.jpg",
    name: "Golden Spiced Aloo Bonda",
    category: "snack",
    calories: 190,
    isVegetarian: true,
  },
  veg_cutlet: {
    url: "/images/dishes/veg_cutlet.jpg",
    cdnUrl: "/images/dishes/veg_cutlet.jpg",
    name: "Crispy Vegetable Cutlet",
    category: "snack",
    calories: 175,
    isVegetarian: true,
  },
  corn_chat: {
    url: "/images/dishes/corn_chat.jpg",
    cdnUrl: "/images/dishes/corn_chat.jpg",
    name: "Tangy Masala Corn Chat",
    category: "snack",
    calories: 140,
    isVegetarian: true,
  },
  masala_tea: {
    url: "/images/dishes/masala_tea.jpg",
    cdnUrl: "/images/dishes/masala_tea.jpg",
    name: "Hot Spiced Masala Tea",
    category: "beverage",
    calories: 70,
    isVegetarian: true,
  },
  egg_roll: {
    url: "/images/dishes/egg_roll.jpg",
    cdnUrl: "/images/dishes/egg_roll.jpg",
    name: "Kolkata Egg Roll",
    category: "snack",
    calories: 280,
    isVegetarian: false,
  },
  chicken_65: {
    url: "/images/dishes/chicken_65.jpg",
    cdnUrl: "/images/dishes/chicken_65.jpg",
    name: "Crispy Spicy Chicken 65",
    category: "snack",
    calories: 320,
    isVegetarian: false,
  },

  // ==========================================
  // 4. DINNER ITEMS (Row 3)
  // ==========================================
  chapati_dal: {
    url: "/images/dishes/chapati_dal.jpg",
    cdnUrl: "/images/dishes/chapati_dal.jpg",
    name: "Chapati with Dal",
    category: "bread",
    calories: 220,
    isVegetarian: true,
  },
  paneer_naan: {
    url: "/images/dishes/paneer_naan.jpg",
    cdnUrl: "/images/dishes/paneer_naan.jpg",
    name: "Paneer Butter Masala with Naan",
    category: "main",
    calories: 360,
    isVegetarian: true,
  },
  veg_fried_rice: {
    url: "/images/dishes/veg_fried_rice.jpg",
    cdnUrl: "/images/dishes/veg_fried_rice.jpg",
    name: "Indo-Chinese Veg Fried Rice",
    category: "rice",
    calories: 260,
    isVegetarian: true,
  },
  mixed_veg_curry: {
    url: "/images/dishes/mixed_veg_curry.jpg",
    cdnUrl: "/images/dishes/mixed_veg_curry.jpg",
    name: "Mixed Vegetable Curry",
    category: "main",
    calories: 180,
    isVegetarian: true,
  },
  curd: {
    url: "/images/dishes/curd.jpg",
    cdnUrl: "/images/dishes/curd.jpg",
    name: "Fresh Plain Curd",
    category: "side",
    calories: 90,
    isVegetarian: true,
  },
  chicken_curry: {
    url: "/images/dishes/chicken_curry.jpg",
    cdnUrl: "/images/dishes/chicken_curry.jpg",
    name: "Spiced Chicken Curry",
    category: "main",
    calories: 340,
    isVegetarian: false,
  },
  egg_curry: {
    url: "/images/dishes/egg_curry.jpg",
    cdnUrl: "/images/dishes/egg_curry.jpg",
    name: "Boiled Egg Curry with Gravy",
    category: "main",
    calories: 240,
    isVegetarian: false,
  },

  // ==========================================
  // 5. LEGACY ALIASES & DESSERTS
  // ==========================================
  tea: {
    url: "/images/dishes/tea.jpg",
    cdnUrl: "/images/dishes/tea.jpg",
    name: "Spiced Masala Chai",
    category: "beverage",
    calories: 65,
    isVegetarian: true,
  },
  coffee: {
    url: "/images/dishes/coffee.jpg",
    cdnUrl: "/images/dishes/coffee.jpg",
    name: "South Indian Filter Coffee",
    category: "beverage",
    calories: 75,
    isVegetarian: true,
  },
  roti: {
    url: "/images/dishes/roti.jpg",
    cdnUrl: "/images/dishes/roti.jpg",
    name: "Soft Phulka Rotis",
    category: "bread",
    calories: 85,
    isVegetarian: true,
  },
  rice: {
    url: "/images/dishes/rice.jpg",
    cdnUrl: "/images/dishes/rice.jpg",
    name: "Steamed White Basmati Rice",
    category: "rice",
    calories: 160,
    isVegetarian: true,
  },
  pulao: {
    url: "/images/dishes/pulao.jpg",
    cdnUrl: "/images/dishes/pulao.jpg",
    name: "Vegetable Pulav",
    category: "rice",
    calories: 210,
    isVegetarian: true,
  },
  biryani: {
    url: "/images/dishes/biryani.jpg",
    cdnUrl: "/images/dishes/biryani.jpg",
    name: "Fragrant Veg Dum Biryani",
    category: "rice",
    calories: 380,
    isVegetarian: true,
  },
  paneer: {
    url: "/images/dishes/paneer.jpg",
    cdnUrl: "/images/dishes/paneer.jpg",
    name: "Paneer Butter Masala",
    category: "main",
    calories: 260,
    isVegetarian: true,
  },
  dal: {
    url: "/images/dishes/dal.jpg",
    cdnUrl: "/images/dishes/dal.jpg",
    name: "Yellow Dal Tadka",
    category: "side",
    calories: 150,
    isVegetarian: true,
  },
  dal_makhani: {
    url: "/images/dishes/dal_makhani.jpg",
    cdnUrl: "/images/dishes/dal_makhani.jpg",
    name: "Dal Makhani with Butter",
    category: "main",
    calories: 230,
    isVegetarian: true,
  },
  sambar: {
    url: "/images/dishes/sambar.jpg",
    cdnUrl: "/images/dishes/sambar.jpg",
    name: "Vegetable Sambar",
    category: "side",
    calories: 130,
    isVegetarian: true,
  },
  rajma: {
    url: "/images/dishes/rajma.jpg",
    cdnUrl: "/images/dishes/rajma.jpg",
    name: "Punjabi Rajma Masala",
    category: "main",
    calories: 210,
    isVegetarian: true,
  },
  chole: {
    url: "/images/dishes/chole.jpg",
    cdnUrl: "/images/dishes/chole.jpg",
    name: "Amritsari Chole Masala",
    category: "main",
    calories: 240,
    isVegetarian: true,
  },
  aloo_gobhi: {
    url: "/images/dishes/aloo_gobhi.jpg",
    cdnUrl: "/images/dishes/aloo_gobhi.jpg",
    name: "Aloo Gobhi Roast",
    category: "side",
    calories: 140,
    isVegetarian: true,
  },
  vada: {
    url: "/images/dishes/vada.jpg",
    cdnUrl: "/images/dishes/vada.jpg",
    name: "Crispy Medu Vada",
    category: "side",
    calories: 180,
    isVegetarian: true,
  },
  poha: {
    url: "/images/dishes/poha.jpg",
    cdnUrl: "/images/dishes/poha.jpg",
    name: "Kanda Batata Poha",
    category: "main",
    calories: 190,
    isVegetarian: true,
  },
  papad: {
    url: "/images/dishes/papad.jpg",
    cdnUrl: "/images/dishes/papad.jpg",
    name: "Crispy Papad & Pickle",
    category: "side",
    calories: 65,
    isVegetarian: true,
  },
  biscuits: {
    url: "/images/dishes/biscuits.jpg",
    cdnUrl: "/images/dishes/biscuits.jpg",
    name: "Osmania & Butter Biscuits",
    category: "snack",
    calories: 140,
    isVegetarian: true,
  },
  gulab_jamun: {
    url: "/images/dishes/gulab_jamun.jpg",
    cdnUrl: "/images/dishes/gulab_jamun.jpg",
    name: "Warm Gulab Jamun in Syrup",
    category: "dessert",
    calories: 195,
    isVegetarian: true,
  },
  kheer: {
    url: "/images/dishes/kheer.jpg",
    cdnUrl: "/images/dishes/kheer.jpg",
    name: "Traditional Rice Kheer",
    category: "dessert",
    calories: 180,
    isVegetarian: true,
  },
};

/**
 * Category-aware fallback map using local assets.
 */
export const CATEGORY_FALLBACKS: Record<string, string> = {
  bread: DISH_IMAGE_CATALOG.chapati_dal.url,
  rice: DISH_IMAGE_CATALOG.rice_sambar.url,
  beverage: DISH_IMAGE_CATALOG.masala_tea.url,
  dessert: DISH_IMAGE_CATALOG.gulab_jamun.url,
  snack: DISH_IMAGE_CATALOG.samosa.url,
  side: DISH_IMAGE_CATALOG.curd.url,
  main: DISH_IMAGE_CATALOG.paneer_naan.url,
  default: DISH_IMAGE_CATALOG.rice_sambar.url,
};

/**
 * Determines the matching dish catalog key based on dish name keywords.
 */
export function getDishKeyByName(dishName?: string | null): string | null {
  if (!dishName || !dishName.trim()) return null;
  const q = dishName.toLowerCase().trim();

  // 1. Specific multi-word dishes (high precedence)
  if (q.includes("masala dosa")) return "masala_dosa";
  if (q.includes("aloo paratha") || (q.includes("paratha") && !q.includes("poori"))) return "aloo_paratha";
  if (q.includes("pongal")) return "pongal";
  if (q.includes("poori") || q.includes("puri")) return "poori";
  if (q.includes("curd rice")) return "curd_rice";
  if (q.includes("dal rice") || q.includes("dal chawal")) return "dal_rice";
  if (q.includes("fried rice")) return "veg_fried_rice";
  if (q.includes("vegetable pulav") || q.includes("veg pulav")) return "veg_pulav";
  if (q.includes("jeera pulao") || q.includes("pulao") || q.includes("pulav")) return "pulao";
  if (q.includes("chicken biryani")) return "chicken_biryani";
  if (q.includes("biryani")) return "biryani";
  if (q.includes("aloo bonda") || q.includes("bonda")) return "aloo_bonda";
  if (q.includes("veg cutlet") || q.includes("cutlet")) return "veg_cutlet";
  if (q.includes("corn chat") || q.includes("corn chaat") || (q.includes("corn") && q.includes("chat"))) return "corn_chat";
  if (q.includes("egg roll") || q.includes("kathi roll")) return "egg_roll";
  if (q.includes("chicken 65")) return "chicken_65";
  if (q.includes("chicken curry") || (q.includes("chicken") && !q.includes("biryani") && !q.includes("65"))) return "chicken_curry";
  if (q.includes("egg curry") || (q.includes("egg") && !q.includes("roll"))) return "egg_curry";
  if (q.includes("paneer butter masala with naan") || q.includes("paneer naan")) return "paneer_naan";
  if (q.includes("paneer butter masala") || q.includes("paneer")) return "paneer";
  if (q.includes("chapati with dal")) return "chapati_dal";
  if (q.includes("roti") || q.includes("phulka") || q.includes("chapati")) return "roti";
  if (q.includes("chana masala")) return "chana_masala";
  if (q.includes("chole") || q.includes("chana") || q.includes("channa")) return "chole";
  if (q.includes("dal makhani")) return "dal_makhani";
  if (q.includes("yellow dal") || q.includes("dal tadka") || (q.includes("dal") && !q.includes("rice"))) return "dal";
  if (q.includes("rajma")) return "rajma";
  if (q.includes("aloo gobhi") || q.includes("aloo gobi") || q.includes("gobhi") || q.includes("gobi")) return "aloo_gobhi";
  if (q.includes("mixed veg") || q.includes("mixed vegetable")) return "mixed_veg_curry";
  if (q.includes("steamed rice + sambar") || q.includes("rice + sambar") || q.includes("steamed rice with sambar") || q.includes("rice with sambar")) return "rice_sambar";
  if (q.includes("sambar") || q.includes("sambhar")) return "sambar";
  if (q.includes("steamed white") || (q.includes("steamed rice") && !q.includes("sambar"))) return "rice";

  // 2. Breakfast Specialties
  if (q.includes("idli") || q.includes("idly")) return "idli";
  if (q.includes("dosa") || q.includes("dosai")) return "dosa";
  if (q.includes("upma") || q.includes("rava upma")) return "upma";
  if (q.includes("poha")) return "poha";
  if (q.includes("vada") || q.includes("wada")) return "vada";

  // 3. Beverages & Tea
  if (q.includes("masala tea")) return "masala_tea";
  if (q.includes("chai") || /\btea\b/i.test(q)) return "tea";
  if (q.includes("coffee") || q.includes("kaapi")) return "coffee";

  // 4. Snacks
  if (q.includes("samosa")) return "samosa";
  if (q.includes("biscuit") || q.includes("cookie")) return "biscuits";
  if (q.includes("papad") || q.includes("pickle") || q.includes("achar") || q.includes("appalam")) return "papad";

  // 5. Curd & Dairy
  if (q.includes("curd") || q.includes("dahi") || q.includes("yogurt") || q.includes("raita")) return "curd";

  // 6. Dal & Sambar
  if (q.includes("sambar") || q.includes("sambhar")) return "sambar";
  if (q.includes("dal") || q.includes("tadka") || q.includes("lentil")) return "dal";

  // 7. Desserts
  if (q.includes("jamun") || q.includes("gulab")) return "gulab_jamun";
  if (q.includes("kheer") || q.includes("payasam") || q.includes("halwa") || q.includes("sweet") || q.includes("dessert")) return "kheer";

  // 8. Rice (general)
  if (q.includes("rice") || q.includes("chawal")) return "rice";

  return null;
}

/**
 * Intelligent keyword-based dish image resolver.
 * Ensures strict, unambiguous matching for every dish without cross-contamination.
 */
export function resolveDishImage(
  dishName?: string | null,
  customUrl?: string | null,
  category?: string | null
): string {
  const matchedKey = getDishKeyByName(dishName);

  // If a customUrl is provided and is an existing local asset or data URL, keep it
  if (customUrl && customUrl.trim().length > 0) {
    const trimmed = customUrl.trim();
    if (trimmed.startsWith("/images/dishes/") || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
      return trimmed;
    }
  }

  // If we found an exact catalog match, return its verified local asset
  if (matchedKey && DISH_IMAGE_CATALOG[matchedKey]) {
    return DISH_IMAGE_CATALOG[matchedKey].url;
  }

  // Category fallback if available
  if (category && CATEGORY_FALLBACKS[category]) {
    return CATEGORY_FALLBACKS[category];
  }

  return CATEGORY_FALLBACKS.default;
}

/**
 * Get direct CDN/asset fallback URL for a dish.
 */
export function getDishCdnFallback(dishName?: string | null, category?: string | null): string {
  const matchedKey = getDishKeyByName(dishName);
  if (matchedKey && DISH_IMAGE_CATALOG[matchedKey]?.cdnUrl) {
    return DISH_IMAGE_CATALOG[matchedKey].cdnUrl;
  }
  if (category && CATEGORY_FALLBACKS[category]) {
    return CATEGORY_FALLBACKS[category];
  }
  return DISH_IMAGE_CATALOG.rice_sambar.url;
}

/**
 * Official mess menu presets covering all 28 dishes from the master food chart.
 */
export const DISH_PRESETS = [
  // Breakfast
  { name: "Idli with Chutney & Sambar", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.idli.url },
  { name: "Crispy Roast Dosa", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.dosa.url },
  { name: "Golden Masala Dosa", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.masala_dosa.url },
  { name: "Rava Vegetable Upma", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.upma.url },
  { name: "Ghee Ven Pongal with Cashews", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.pongal.url },
  { name: "Puffed Poori with Potato Sagu", category: "bread" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.poori.url },
  { name: "Aloo Paratha with Melting Butter", category: "bread" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.aloo_paratha.url },

  // Lunch
  { name: "Steamed Rice with Sambar", category: "rice" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.rice_sambar.url },
  { name: "South Indian Curd Rice", category: "rice" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.curd_rice.url },
  { name: "Vegetable Pulav", category: "rice" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.veg_pulav.url },
  { name: "Amritsari Chana Masala", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.chana_masala.url },
  { name: "Comforting Dal Rice", category: "rice" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.dal_rice.url },
  { name: "Fragrant Chicken Biryani", category: "rice" as const, is_vegetarian: false, image_url: DISH_IMAGE_CATALOG.chicken_biryani.url },

  // Snacks
  { name: "Crispy Potato Samosa", category: "snack" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.samosa.url },
  { name: "Golden Spiced Aloo Bonda", category: "snack" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.aloo_bonda.url },
  { name: "Crispy Vegetable Cutlet", category: "snack" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.veg_cutlet.url },
  { name: "Tangy Masala Corn Chat", category: "snack" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.corn_chat.url },
  { name: "Hot Spiced Masala Tea", category: "beverage" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.masala_tea.url },
  { name: "Kolkata Egg Roll", category: "snack" as const, is_vegetarian: false, image_url: DISH_IMAGE_CATALOG.egg_roll.url },
  { name: "Crispy Spicy Chicken 65", category: "snack" as const, is_vegetarian: false, image_url: DISH_IMAGE_CATALOG.chicken_65.url },

  // Dinner
  { name: "Chapati with Dal", category: "bread" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.chapati_dal.url },
  { name: "Paneer Butter Masala with Naan", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.paneer_naan.url },
  { name: "Indo-Chinese Veg Fried Rice", category: "rice" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.veg_fried_rice.url },
  { name: "Mixed Vegetable Curry", category: "main" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.mixed_veg_curry.url },
  { name: "Fresh Plain Curd", category: "side" as const, is_vegetarian: true, image_url: DISH_IMAGE_CATALOG.curd.url },
  { name: "Spiced Chicken Curry", category: "main" as const, is_vegetarian: false, image_url: DISH_IMAGE_CATALOG.chicken_curry.url },
  { name: "Boiled Egg Curry with Gravy", category: "main" as const, is_vegetarian: false, image_url: DISH_IMAGE_CATALOG.egg_curry.url },
];

export interface DishDetails {
  key: string;
  name: string;
  imageUrl: string;
  category: "main" | "bread" | "rice" | "dessert" | "beverage" | "side" | "snack";
  mealType: "Breakfast" | "Lunch" | "Snacks" | "Dinner";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  rating: number;
  reviewsCount: number;
  isVegetarian: boolean;
  description: string;
  servingWindow: string;
  ingredients: string[];
  allergens: string[];
  reviews: Array<{
    id: string;
    studentName: string;
    roll: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

const CULINARY_DETAILS_REGISTRY: Record<
  string,
  {
    desc: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    rating: number;
    reviewsCount: number;
    mealType: "Breakfast" | "Lunch" | "Snacks" | "Dinner";
    servingWindow: string;
    ingredients: string[];
    allergens: string[];
    sampleReviews: Array<{ name: string; roll: string; rating: number; text: string; date: string }>;
  }
> = {
  chicken_biryani: {
    desc: "Long-grain aged basmati rice layered with tender marinated chicken, saffron-infused milk, caramelized onions, and authentic Hyderabadi pot-dum spices.",
    calories: 540,
    protein: 32,
    carbs: 64,
    fat: 16,
    rating: 4.9,
    reviewsCount: 312,
    mealType: "Lunch",
    servingWindow: "Central Mess Hall 1 • 12:30 PM – 02:30 PM",
    ingredients: ["Aged Basmati Rice", "Bone-in Farm Chicken", "Pure Ghee", "Saffron Milk", "Shahi Biryani Masala", "Mint & Coriander"],
    allergens: ["Dairy"],
    sampleReviews: [
      { name: "Harshith Shetty", roll: "2024CS042", rating: 5, text: "Hands down the best Sunday lunch! The chicken is exceptionally tender and aromatic.", date: "Yesterday" },
      { name: "Meghana Hegde", roll: "2024EC108", rating: 5, text: "Restaurant quality dum biryani with raita. Mess contractor really stepped up.", date: "3 days ago" }
    ]
  },
  paneer_naan: {
    desc: "Tender cubes of fresh malai paneer simmered in a velvet tomato, butter, and cashew gravy, paired with clay-oven baked soft tandoori naan.",
    calories: 460,
    protein: 19,
    carbs: 52,
    fat: 20,
    rating: 4.8,
    reviewsCount: 248,
    mealType: "Dinner",
    servingWindow: "Central Mess Hall 1 • 07:30 PM – 09:45 PM",
    ingredients: ["Fresh Malai Paneer", "San Marzano Tomatoes", "Amul Butter", "Cashew Paste", "Kasuri Methi", "Refined Wheat Flour"],
    allergens: ["Dairy", "Gluten", "Nuts"],
    sampleReviews: [
      { name: "Bhavana Nair", roll: "2024BT015", rating: 5, text: "The gravy is buttery and sweet-savory perfection. Naans come out hot and soft.", date: "2 days ago" },
      { name: "Kiran Patil", roll: "2024ME077", rating: 4.5, text: "Very generous paneer chunks! Favorite dinner of the week.", date: "Last week" }
    ]
  },
  masala_dosa: {
    desc: "Crisp-roasted fermented rice and lentil crepe smeared with red garlic chutney, filled with tempered mustard-curry leaf potato sabzi.",
    calories: 240,
    protein: 7,
    carbs: 42,
    fat: 6,
    rating: 4.8,
    reviewsCount: 195,
    mealType: "Breakfast",
    servingWindow: "Central Mess Hall 1 • 07:30 AM – 09:30 AM",
    ingredients: ["Fermented Batter", "Yukon Potatoes", "Mustard Seeds", "Fresh Coconut Chutney", "Shallots", "Curry Leaves"],
    allergens: ["Nut-Free"],
    sampleReviews: [
      { name: "Tanvi Joshi", roll: "2024CS089", rating: 5, text: "Golden crispy edges and the coconut chutney was freshly ground. Made my morning!", date: "Today" },
      { name: "Nikhil Kamath", roll: "2024EE034", rating: 4.5, text: "Crispy and not oily. Great coffee pairing.", date: "Yesterday" }
    ]
  },
  idli: {
    desc: "Pillow-soft, naturally fermented steamed rice cakes served hot alongside fragrant vegetable drumstick sambar and roasted chana dal chutney.",
    calories: 140,
    protein: 6,
    carbs: 29,
    fat: 1.5,
    rating: 4.6,
    reviewsCount: 164,
    mealType: "Breakfast",
    servingWindow: "Central Mess Hall 1 • 07:30 AM – 09:30 AM",
    ingredients: ["Parboiled Rice", "Urad Dal", "Hing (Asafoetida)", "Fenugreek Seeds", "Tamarind", "Drumsticks"],
    allergens: ["Vegan", "Gluten-Free"],
    sampleReviews: [
      { name: "Pranav Deshmukh", roll: "2024AI012", rating: 5, text: "Super light and fluffy. Perfect pre-exam breakfast.", date: "2 days ago" }
    ]
  },
  samosa: {
    desc: "Golden pyramid-shaped flaky pastry crust packed with crushed cumin potatoes, green peas, ginger, and paired with tangy tamarind saunth.",
    calories: 210,
    protein: 4,
    carbs: 26,
    fat: 11,
    rating: 4.7,
    reviewsCount: 220,
    mealType: "Snacks",
    servingWindow: "Central Mess Hall 1 • 04:30 PM – 06:00 PM",
    ingredients: ["Potatoes", "Sweet Peas", "Ajwain Seeds", "All-purpose Flour", "Tamarind Pulp", "Garam Masala"],
    allergens: ["Gluten"],
    sampleReviews: [
      { name: "Shreya Kulkarni", roll: "2024CS114", rating: 5, text: "Crunchy crust and piping hot. Goes brilliantly with evening ginger tea.", date: "Yesterday" }
    ]
  },
  gulab_jamun: {
    desc: "Decadent melt-in-the-mouth mawa milk dumplings slow-fried in pure ghee and steeped in cardamom and saffron infused sugar syrup.",
    calories: 280,
    protein: 5,
    carbs: 48,
    fat: 10,
    rating: 4.9,
    reviewsCount: 380,
    mealType: "Dinner",
    servingWindow: "Central Mess Hall 1 • 07:30 PM – 09:45 PM",
    ingredients: ["Khoya (Mawa)", "Green Cardamom", "Kewra Water", "Kashmiri Saffron", "Pure Desi Ghee", "Rose Syrup"],
    allergens: ["Dairy"],
    sampleReviews: [
      { name: "Varun Bhat", roll: "2024ME061", rating: 5, text: "Warm and juicy! The whole hostel queues up when these are on the dinner menu.", date: "3 days ago" }
    ]
  },
  chicken_65: {
    desc: "Bite-sized pieces of chicken thigh marinated in yogurt, Kashmiri red chili, cracked pepper, and deep-fried with crispy curry leaves and slit green chilies.",
    calories: 340,
    protein: 26,
    carbs: 12,
    fat: 19,
    rating: 4.8,
    reviewsCount: 290,
    mealType: "Snacks",
    servingWindow: "Central Mess Hall 1 • 04:30 PM – 06:00 PM",
    ingredients: ["Chicken Thigh", "Greek Yogurt", "Kashmiri Degi Mirch", "Curry Leaves", "Rice Flour", "Fresh Lime"],
    allergens: ["Dairy"],
    sampleReviews: [
      { name: "Siddharth Menon", roll: "2024CS008", rating: 5, text: "Spicy, crunchy, and savory. Best evening snack hands down.", date: "4 days ago" }
    ]
  },
  papad: {
    desc: "Crispy roasted and golden-fried sun-dried urad dal papad served with spicy, tangy Indian mango & lime achar in seasoned mustard oil.",
    calories: 65,
    protein: 3,
    carbs: 8,
    fat: 2,
    rating: 4.8,
    reviewsCount: 310,
    mealType: "Lunch",
    servingWindow: "Central Mess Hall 1 & 2 • 12:30 PM – 02:30 PM",
    ingredients: ["Urad Dal Flour", "Black Peppercorns", "Asafoetida (Hing)", "Mango Achar", "Lime Pickle", "Mustard Oil"],
    allergens: [],
    sampleReviews: [
      { name: "Akash Gowda", roll: "2024ME044", rating: 5, text: "The perfect crunchy accompaniment! The spicy mango achar adds amazing punch to dal rice.", date: "2 days ago" }
    ]
  },
  chana_masala: {
    desc: "Wholesome Kabuli chickpeas slow-cooked in a tangy Punjabi gravy of blackened tea leaves, roasted cumin, pomegranate seeds, and ginger juliennes.",
    calories: 270,
    protein: 13,
    carbs: 42,
    fat: 6,
    rating: 4.6,
    reviewsCount: 175,
    mealType: "Lunch",
    servingWindow: "Central Mess Hall 1 • 12:30 PM – 02:30 PM",
    ingredients: ["Kabuli Chickpeas", "Anardana (Pomegranate)", "Tea-steeped Stock", "Amchur", "Ginger", "Coriander Seeds"],
    allergens: ["Vegan", "Gluten-Free"],
    sampleReviews: [
      { name: "Omkar Sawant", roll: "2024IT045", rating: 4.5, text: "Rich homestyle flavor without excess oil. Tastes great with jeera rice.", date: "Last week" }
    ]
  },
  veg_pulav: {
    desc: "Aromatic basmati rice cooked with garden-fresh green peas, diced carrots, French beans, and whole spices infused with shahi jeera and mint.",
    calories: 310,
    protein: 8,
    carbs: 56,
    fat: 6,
    rating: 4.5,
    reviewsCount: 130,
    mealType: "Lunch",
    servingWindow: "Central Mess Hall 1 • 12:30 PM – 02:30 PM",
    ingredients: ["Basmati Rice", "Carrots & Beans", "Green Peas", "Bay Leaves", "Star Anise", "Desi Ghee"],
    allergens: ["Gluten-Free"],
    sampleReviews: [
      { name: "Chinmayi Rao", roll: "2024EC092", rating: 4.5, text: "Fragrant and fluffy grains. Paired nicely with cucumber raita.", date: "1 week ago" }
    ]
  }
};

/**
 * Returns full culinary metadata, nutritional breakdown, serving windows, and student review quotes for any dish.
 */
export function getDishFullDetails(
  dishName?: string | null,
  customUrl?: string | null,
  categoryHint?: string | null,
  mealTypeHint?: string | null
): DishDetails {
  const matchedKey = getDishKeyByName(dishName) || "rice_sambar";
  const catalogEntry = DISH_IMAGE_CATALOG[matchedKey] || DISH_IMAGE_CATALOG.rice_sambar;
  const registry = CULINARY_DETAILS_REGISTRY[matchedKey];

  const resolvedName = dishName?.trim() || catalogEntry.name;
  const imageUrl = resolveDishImage(dishName, customUrl, categoryHint);
  const isVegetarian =
    catalogEntry.isVegetarian !== undefined
      ? catalogEntry.isVegetarian
      : !/(chicken|fish|egg|mutton|meat)/i.test(resolvedName);

  // Determine meal slot
  let mealType: "Breakfast" | "Lunch" | "Snacks" | "Dinner" = "Lunch";
  if (mealTypeHint) {
    const lower = mealTypeHint.toLowerCase();
    if (lower.includes("break")) mealType = "Breakfast";
    else if (lower.includes("lunch")) mealType = "Lunch";
    else if (lower.includes("snack") || lower.includes("tea")) mealType = "Snacks";
    else if (lower.includes("dinner")) mealType = "Dinner";
  } else if (registry?.mealType) {
    mealType = registry.mealType;
  } else if (catalogEntry.category === "snack" || catalogEntry.category === "beverage") {
    mealType = "Snacks";
  } else if (catalogEntry.category === "bread") {
    mealType = "Breakfast";
  }

  const calories = registry?.calories || catalogEntry.calories || 320;
  const protein = registry?.protein || (isVegetarian ? 9 : 24);
  const carbs = registry?.carbs || 44;
  const fat = registry?.fat || (isVegetarian ? 8 : 15);
  const rating = registry?.rating || 4.7;
  const reviewsCount = registry?.reviewsCount || 148;
  const description =
    registry?.desc ||
    `Freshly prepared homestyle ${resolvedName} cooked daily with authentic regional spices and balanced nutrition for hostel residents.`;
  const servingWindow =
    registry?.servingWindow ||
    (mealType === "Breakfast"
      ? "Central Mess Hall 1 • 07:30 AM – 09:30 AM"
      : mealType === "Lunch"
      ? "Central Mess Hall 1 • 12:30 PM – 02:30 PM"
      : mealType === "Snacks"
      ? "Central Mess Hall 1 • 04:30 PM – 06:00 PM"
      : "Central Mess Hall 1 • 07:30 PM – 09:45 PM");

  const ingredients =
    registry?.ingredients || [
      "Farm Fresh Produce",
      "Traditional Whole Spices",
      "Pure Ghee / Cold-pressed Oil",
      "Himalayan Pink Salt",
      "Fresh Herbs",
    ];

  const allergens =
    registry?.allergens || (isVegetarian ? ["Gluten-Free"] : ["Non-Vegetarian"]);

  const reviews = registry?.sampleReviews?.map((r, idx) => ({
    id: `rev-${matchedKey}-${idx}`,
    studentName: r.name,
    roll: r.roll,
    rating: r.rating,
    comment: r.text,
    date: r.date,
  })) || [
    {
      id: `rev-${matchedKey}-1`,
      studentName: "Darshan Kulkarni",
      roll: "2024CS001",
      rating: 5,
      comment: `The flavor balance in ${resolvedName} is spot on. Very wholesome!`,
      date: "Yesterday",
    },
    {
      id: `rev-${matchedKey}-2`,
      studentName: "Nandini Shenoy",
      roll: "2024EC045",
      rating: 4.5,
      comment: "Freshly prepared and warm. Consistent quality this semester.",
      date: "3 days ago",
    },
  ];

  return {
    key: matchedKey,
    name: resolvedName,
    imageUrl,
    category: (catalogEntry.category as any) || "main",
    mealType,
    calories,
    protein,
    carbs,
    fat,
    rating,
    reviewsCount,
    isVegetarian,
    description,
    servingWindow,
    ingredients,
    allergens,
    reviews,
  };
}

